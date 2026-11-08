import { createHmac, timingSafeEqual } from "node:crypto";
import { sendKeyEmail } from "@/lib/pro/email";
import {
  createLicense,
  findByProviderId,
  markEventSeen,
  setStatus,
  type Plan,
} from "@/lib/pro/licenses";


type PaddleData = {
  id?: string;
  customer_id?: string;
  customer?: { email?: string };
  subscription_id?: string;
  status?: string;
  action?: string;
  custom_data?: { plan?: string };
  items?: { price?: { id?: string }; price_id?: string }[];
  current_billing_period?: { ends_at?: string };
  billing_period?: { ends_at?: string };
  scheduled_change?: { effective_at?: string };
};

function verify(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(";").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i), p.slice(i + 1)];
    }),
  );
  const ts = parts.ts;
  const sig = parts.h1;
  if (!ts || !sig) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${ts}:${raw}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function customerEmail(customerId: string): Promise<string | null> {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) return null;
  const base = process.env.PADDLE_API_URL ?? "https://api.paddle.com";
  const res = await fetch(`${base}/customers/${customerId}`, { headers: { authorization: `Bearer ${apiKey}` } });
  if (!res.ok) return null;
  const body = (await res.json()) as { data?: { email?: string } };
  return body.data?.email ?? null;
}

function planOf(data: PaddleData): { plan: Plan; seats: number } {
  const custom = data?.custom_data?.plan;
  const teamPrices = (process.env.PADDLE_TEAM_PRICE_IDS ?? "").split(",").filter(Boolean);
  const items = (data?.items ?? []) as { price?: { id?: string }; price_id?: string }[];
  const isTeam =
    custom === "team" || items.some((i) => teamPrices.includes(i.price?.id ?? i.price_id ?? ""));
  return isTeam ? { plan: "team", seats: 10 } : { plan: "pro", seats: 1 };
}

export async function POST(req: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Not configured." }, { status: 503 });
  const raw = await req.text();
  if (!verify(raw, req.headers.get("paddle-signature"), secret)) {
    return Response.json({ error: "Invalid signature." }, { status: 401 });
  }
  const event = JSON.parse(raw) as { event_id: string; event_type: string; data: PaddleData };
  if (!markEventSeen(event.event_id)) return Response.json({ ok: true, duplicate: true });

  const data = event.data;
  const subId: string | undefined = data?.subscription_id ?? (event.event_type.startsWith("subscription.") ? data?.id : undefined);
  const periodEnd: string | null = data?.current_billing_period?.ends_at ?? data?.billing_period?.ends_at ?? null;

  switch (event.event_type) {
    case "subscription.created":
    case "subscription.activated": {
      const id = data.id as string;
      if (findByProviderId(id)) break;
      const email = (await customerEmail(data.customer_id ?? "")) ?? data?.customer?.email ?? null;
      if (!email) return Response.json({ error: "Customer email unavailable." }, { status: 500 });
      const { plan, seats } = planOf(data);
      const { key } = createLicense({ email, plan, seats, providerId: id, paidUntil: periodEnd });
      await sendKeyEmail(email, key, plan);
      break;
    }
    case "subscription.updated":
    case "subscription.resumed": {
      const lic = findByProviderId(data.id ?? "");
      if (lic) setStatus(lic.id, data.status === "past_due" ? "past_due" : "active", periodEnd);
      break;
    }
    case "subscription.past_due": {
      const lic = findByProviderId(data.id ?? "");
      if (lic) setStatus(lic.id, "past_due");
      break;
    }
    case "subscription.canceled": {
      const lic = findByProviderId(data.id ?? "");
      const ends = data?.scheduled_change?.effective_at ?? periodEnd ?? new Date().toISOString();
      if (lic) setStatus(lic.id, "canceled", ends);
      break;
    }
    case "transaction.completed": {
      if (subId) {
        const lic = findByProviderId(subId);
        if (lic) setStatus(lic.id, "active", periodEnd ?? undefined);
      }
      break;
    }
    case "adjustment.created":
    case "adjustment.updated": {
      if (data?.action === "refund" && data?.status === "approved" && data?.subscription_id) {
        const lic = findByProviderId(data.subscription_id);
        if (lic) setStatus(lic.id, "refunded");
      }
      break;
    }
    default:
      break;
  }
  return Response.json({ ok: true });
}

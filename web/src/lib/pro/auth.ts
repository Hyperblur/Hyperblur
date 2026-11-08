import { findByKey, isEntitled, recordUse, type License } from "./licenses";

export type AuthResult =
  | { ok: true; license: License }
  | { ok: false; status: 401 | 402 | 429; message: string };

const DAILY_LIMIT = Number(process.env.PRO_DAILY_LIMIT ?? 600);
const IP_LIMIT = Number(process.env.PRO_IP_LIMIT ?? 8);

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0]!.trim() : "unknown";
}

export function keyFrom(req: Request): string | null {
  const bearer = req.headers.get("authorization");
  if (bearer?.toLowerCase().startsWith("bearer ")) return bearer.slice(7).trim();
  const header = req.headers.get("x-hyperblur-key");
  return header ? header.trim() : null;
}

export function authorize(req: Request): AuthResult {
  const key = keyFrom(req);
  if (!key || !key.startsWith("hbp_")) {
    return { ok: false, status: 401, message: "A Hyperblur Pro license key is required. Get one at https://hyperblur.dev/pro" };
  }
  const license = findByKey(key);
  if (!license) return { ok: false, status: 401, message: "This license key is not valid." };
  if (!isEntitled(license)) {
    return { ok: false, status: 402, message: "This license is no longer active. Renew at https://hyperblur.dev/pro" };
  }
  const use = recordUse(license.id, clientIp(req));
  const ipLimit = license.plan === "team" ? IP_LIMIT * 3 : IP_LIMIT;
  if (use.requestsToday > DAILY_LIMIT || use.ipsToday > ipLimit) {
    return { ok: false, status: 429, message: "Too many requests for this key today. Contact support@hyperblur.dev if this is a mistake." };
  }
  return { ok: true, license };
}

"use client";

import Link from "next/link";
import * as React from "react";

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: string) => void };
      Initialize: (options: { token: string; eventCallback?: (e: { name?: string }) => void }) => void;
      Checkout: {
        open: (options: {
          items: { priceId: string; quantity: number }[];
          customData?: Record<string, string>;
          settings?: { successUrl?: string; displayMode?: string; theme?: string };
        }) => void;
      };
    };
  }
}

type Interval = "monthly" | "yearly";

interface Prices {
  proMonthly?: string;
  proYearly?: string;
  teamMonthly?: string;
  teamYearly?: string;
}

interface Props {
  token?: string;
  sandbox?: boolean;
  prices: Prices;
}

const tiers = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "The whole public catalog, under the MIT license.",
    features: ["Every public effect, component and block", "Install with the shadcn CLI", "Public MCP server", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 12, yearly: 9 },
    description: "Templates, cinematic sections and app screens for your own projects.",
    features: [
      "Every Pro template and block",
      "Private registry and MCP access",
      "New Pro items every month",
      "Use in unlimited personal and client projects",
      "Priority support",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: { monthly: 39, yearly: 29 },
    description: "Everything in Pro, shared across a team.",
    features: ["Everything in Pro", "Up to 10 seats", "Shared license key", "Team invoices"],
  },
] as const;

export function ProPricing({ token, sandbox, prices }: Props) {
  const [interval, setInterval] = React.useState<Interval>("yearly");
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!token) return;
    const start = () => {
      if (!window.Paddle) return;
      if (sandbox) window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({ token });
      setReady(true);
    };
    if (window.Paddle) {
      start();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = start;
    document.head.appendChild(script);
  }, [token, sandbox]);

  const priceFor = (plan: "pro" | "team") => {
    if (plan === "pro") return interval === "yearly" ? prices.proYearly : prices.proMonthly;
    return interval === "yearly" ? prices.teamYearly : prices.teamMonthly;
  };

  const buy = (plan: "pro" | "team") => {
    const priceId = priceFor(plan);
    if (!window.Paddle || !priceId) return;
    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: { plan },
      settings: { successUrl: `${window.location.origin}/pro/thanks`, displayMode: "overlay", theme: "dark" },
    });
  };

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pricing</h2>
            <p className="mt-3 text-muted">Cancel any time. 14-day refund on your first payment. Prices in USD.</p>
          </div>
          <div role="group" aria-label="Billing interval" className="inline-flex rounded-full border border-line-2 bg-surface p-1 text-sm">
            {(["monthly", "yearly"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={interval === value}
                onClick={() => setInterval(value)}
                className={`rounded-full px-4 py-1.5 transition-colors ${interval === value ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
              >
                {value === "monthly" ? "Monthly" : "Yearly, save 25%"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => {
            const highlighted = tier.id === "pro";
            const available = tier.id === "free" || (ready && Boolean(priceFor(tier.id)));
            return (
              <article
                key={tier.id}
                className={`flex flex-col rounded-2xl border bg-surface p-6 ${highlighted ? "border-line-2" : "border-line"}`}
              >
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">${tier.price[interval]}</span>
                  <span className="text-sm text-muted">{tier.id === "free" ? "" : interval === "yearly" ? "/ month, billed yearly" : "/ month"}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink/80">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-muted" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.id === "free" ? (
                  <Link href="/effects" className="hb-btn hb-btn-ghost mt-8 justify-center">
                    Browse the catalog
                  </Link>
                ) : token ? (
                  <button
                    type="button"
                    disabled={!available}
                    onClick={() => buy(tier.id)}
                    className={`hb-btn mt-8 justify-center ${highlighted ? "hb-btn-primary" : "hb-btn-ghost"}`}
                  >
                    Subscribe to {tier.name}
                  </button>
                ) : (
                  <a href="#notify" className={`hb-btn mt-8 justify-center ${highlighted ? "hb-btn-primary" : "hb-btn-ghost"}`}>
                    Get notified
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

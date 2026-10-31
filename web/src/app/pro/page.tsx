import type { Metadata } from "next";
import { PricingSection } from "@/registry/hyperblur/pricing-section";

export const metadata: Metadata = {
  title: "Pro",
  description: "Hyperblur Pro adds full page templates, premium blocks and a private registry. Launching soon.",
};

const plans = [
  {
    name: "Free",
    tag: "MIT licensed",
    points: ["Everything in the catalog", "Copy-paste or shadcn CLI", "Public MCP server", "Community support on GitHub"],
  },
  {
    name: "Pro",
    tag: "For individual builders",
    points: ["Full page templates", "Premium blocks", "License key for the private registry and the MCP", "Priority support"],
  },
  {
    name: "Team",
    tag: "For studios and companies",
    points: ["Everything in Pro", "Seats for your whole team", "Shared license keys", "Invoices and a team billing contact"],
  },
];

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "The whole public catalog, under the MIT license.",
    features: ["Every effect and block", "Install with the shadcn CLI", "Public MCP server", "Community support"],
    cta: { label: "Get notified", href: "#notify" },
  },
  {
    name: "Pro",
    price: { monthly: 12, yearly: 9 },
    description: "Templates and premium blocks for your own projects.",
    features: [
      "Full page templates",
      "Premium blocks",
      "License key for the private registry",
      "License key for the MCP server",
      "Priority support",
    ],
    cta: { label: "Get notified", href: "#notify" },
    highlighted: true,
  },
  {
    name: "Team",
    price: { monthly: 39, yearly: 29 },
    description: "Everything in Pro, shared across a team.",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Shared license keys",
      "Seat management",
      "Team invoices",
    ],
    cta: { label: "Get notified", href: "#notify" },
  },
];

export default function ProPage() {
  return (
    <>
      <section className="hb-dots relative border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <span className="inline-flex items-center rounded-full border border-line-2 bg-surface px-3 py-1 text-xs text-muted">
            Launching soon
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Hyperblur Pro</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Hyperblur Pro adds full page templates and premium blocks on top of the free catalog, delivered through a
            private registry that you unlock with a license key. It also comes with priority support when you get stuck.
            Everything that is free today stays free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">What each plan covers</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border bg-surface p-6 ${plan.name === "Pro" ? "border-line-2" : "border-line"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.name === "Pro" ? (
                  <span className="rounded-full bg-blue/15 px-2 py-0.5 text-[11px] font-medium text-blue-soft">
                    New
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted">{plan.tag}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink/80">
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-muted"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-line">
        <PricingSection
          title="Pricing, once Pro launches"
          subtitle="Plans are not on sale yet. These are the tiers we are planning."
          tiers={tiers}
        />
      </div>

      <section id="notify" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Get notified</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            There is no sign-up form. Star the repository or follow the releases and you will see the launch the moment
            it ships.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/Hyperblur/Hyperblur"
              target="_blank"
              rel="noreferrer"
              className="hb-btn hb-btn-primary"
            >
              Star on GitHub
            </a>
            <a
              href="https://github.com/Hyperblur/Hyperblur/releases"
              target="_blank"
              rel="noreferrer"
              className="hb-btn hb-btn-ghost"
            >
              Follow updates
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

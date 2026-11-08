import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PricingSection } from "@/registry/hyperblur/pricing-section";
import { ProItems } from "./pro-items";

export const metadata: Metadata = {
  title: "Pro",
  description:
    "Hyperblur Pro adds full page templates, cinematic sections, app screens and heavy backgrounds, delivered by a private registry and the MCP server.",
};

const checkout = {
  pro: process.env.NEXT_PUBLIC_CHECKOUT_PRO,
  team: process.env.NEXT_PUBLIC_CHECKOUT_TEAM,
};
const open = Boolean(checkout.pro && checkout.team);

const split = [
  {
    name: "Free",
    tag: "Launch pack, MIT licensed, free forever",
    points: [
      "Every effect, component and block already in the catalog",
      "Text, buttons, loaders, hover, micro interactions, forms, modals, charts and more",
      "Copy-paste, the shadcn CLI and the public MCP server",
      "New small pieces keep landing in the free catalog",
    ],
  },
  {
    name: "Pro",
    tag: "New content, built to save you hours",
    points: [
      "Full page templates you can ship with your own copy",
      "Cinematic, scroll-driven heroes and page sections",
      "App screens: dashboards, settings, onboarding and auth flows",
      "Heavy canvas and WebGL backgrounds",
      "Install through the shadcn CLI or let your agent do it with the MCP server",
      "New items every month while your plan is active",
    ],
  },
  {
    name: "Team",
    tag: "For studios and companies",
    points: [
      "Everything in Pro",
      "Up to 10 seats on one subscription",
      "Shared license key",
      "Invoices for your company",
    ],
  },
];

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "The whole public catalog, under the MIT license.",
    features: ["Every public effect, component and block", "Install with the shadcn CLI", "Public MCP server", "Community support"],
    cta: { label: "Browse the catalog", href: "/effects" },
  },
  {
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
    cta: open ? { label: "Subscribe", href: checkout.pro as string } : { label: "Get notified", href: "#notify" },
    highlighted: true,
  },
  {
    name: "Team",
    price: { monthly: 39, yearly: 29 },
    description: "Everything in Pro, shared across a team.",
    features: ["Everything in Pro", "Up to 10 seats", "Shared license key", "Team invoices"],
    cta: open ? { label: "Subscribe", href: checkout.team as string } : { label: "Get notified", href: "#notify" },
  },
];

const steps = [
  {
    title: "1. Subscribe",
    body: "Checkout is handled by Paddle. Right after the first payment you get an email from support@hyperblur.dev with your license key.",
  },
  {
    title: "2. Add the registry once",
    body: "Put the registry in your components.json and export your key as HYPERBLUR_KEY.",
  },
  {
    title: "3. Install like anything else",
    body: "Run npx shadcn@latest add @hyperblur-pro/<item>, or set HYPERBLUR_TOKEN to the same key and ask your agent to add it with the MCP server.",
  },
];

const faq = [
  {
    q: "What happens to the effects that are free today?",
    a: "They stay free and MIT licensed. Pro is new content on top of the catalog, not a paywall around what you already use.",
  },
  {
    q: "What if I cancel?",
    a: "Your access to new Pro content stops at the end of the paid period. Code you already installed stays yours to keep using in your projects.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 14 days of your first payment. See the refund policy for details.",
  },
  {
    q: "Can I use Pro items in client work?",
    a: "Yes. A license covers any number of your own and client projects. You may not resell or republish the Pro source as a library, kit or template pack.",
  },
  {
    q: "How many machines can use one key?",
    a: "A Pro key works on a few machines per day, which is plenty for one person. Team keys allow more. If you hit a limit by mistake, write to support@hyperblur.dev.",
  },
];

const check = (
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
);

const registryConfig = `{
  "registries": {
    "@hyperblur-pro": {
      "url": "https://hyperblur.dev/api/pro/registry/{name}",
      "headers": { "Authorization": "Bearer \${HYPERBLUR_KEY}" }
    }
  }
}`;

export default function ProPage() {
  return (
    <>
      <section className="hb-dots relative border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <span className="inline-flex items-center rounded-full border border-line-2 bg-surface px-3 py-1 text-xs text-muted">
            {open ? "Now open" : "Launching soon"}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Hyperblur Pro</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Full page templates, cinematic sections, app screens and heavy backgrounds, on top of a free catalog that
            stays free. One license key unlocks a private registry that works with the shadcn CLI and with your agent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={open ? "#pricing" : "#notify"} className="hb-btn hb-btn-primary">
              {open ? "See plans" : "Get notified"}
            </a>
            <Link href="/effects" className="hb-btn hb-btn-ghost">
              Browse the free catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Free and Pro, side by side</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          The split is simple: small pieces built around one idea are free. Whole pages, app screens and heavy visuals
          that take hours to build are Pro.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {split.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border bg-surface p-6 ${plan.name === "Pro" ? "border-line-2" : "border-line"}`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tag}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink/80">
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    {check}
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">What is in Pro</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Every item shows its description here. The source opens for subscribers only.
          </p>
          <Suspense fallback={null}>
            <ProItems />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
          <pre className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-4 text-xs leading-6 text-ink/80">
            <code>{registryConfig}</code>
          </pre>
        </div>
      </section>

      <div id="pricing" className="scroll-mt-20 border-t border-line">
        <PricingSection
          title={open ? "Pricing" : "Pricing, once Pro opens"}
          subtitle={open ? "Cancel any time. 14-day refund on your first payment." : "Plans are not on sale yet. These are the tiers we are planning."}
          tiers={tiers}
        />
      </div>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
          <dl className="mt-8 space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="notify" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">{open ? "Stay up to date" : "Get notified"}</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            There is no sign-up form. Star the repository or follow the releases and you will see every new Pro item
            and the launch itself the moment it ships.
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

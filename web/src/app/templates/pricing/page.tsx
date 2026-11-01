import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GradientText } from "@/registry/hyperblur/gradient-text";
import { PricingSection } from "@/registry/hyperblur/pricing-section";
import { FeaturesSection } from "@/registry/hyperblur/features-section";
import { FaqSection } from "@/registry/hyperblur/faq-section";
import { CtaBanner } from "@/registry/hyperblur/cta-banner";

export const metadata: Metadata = {
  title: "Pricing page template",
  description: "A standalone pricing page assembled only from Hyperblur registry blocks.",
};

const product = "Relay";

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "For small crews trying Relay out.",
    features: ["Up to 10 people", "90 days of message history", "1:1 voice and video calls", "5 integrations"],
    cta: { label: "Start free", href: "#start" },
  },
  {
    name: "Team",
    price: { monthly: 8, yearly: 6 },
    description: "For teams that live in Relay all day.",
    features: [
      "Unlimited people",
      "Unlimited message history",
      "Group calls up to 50 people",
      "Unlimited integrations",
      "Priority support",
    ],
    cta: { label: "Start free trial", href: "#start" },
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 18, yearly: 15 },
    description: "For companies that need control and compliance.",
    features: [
      "Everything in Team",
      "SSO and SCIM provisioning",
      "Audit logs and data export",
      "Custom retention rules",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to sales", href: "#contact" },
  },
];

type Cell = boolean | string;

const comparison: { group: string; rows: { name: string; values: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Messaging",
    rows: [
      { name: "People per workspace", values: ["10", "Unlimited", "Unlimited"] },
      { name: "Message history", values: ["90 days", "Unlimited", "Unlimited"] },
      { name: "Threads and reactions", values: [true, true, true] },
      { name: "Scheduled messages", values: [false, true, true] },
    ],
  },
  {
    group: "Calls and files",
    rows: [
      { name: "Voice and video calls", values: ["1:1 only", "Up to 50", "Up to 200"] },
      { name: "Screen sharing", values: [true, true, true] },
      { name: "File storage per person", values: ["2 GB", "20 GB", "100 GB"] },
      { name: "Call recordings", values: [false, true, true] },
    ],
  },
  {
    group: "Security and admin",
    rows: [
      { name: "Two-factor authentication", values: [true, true, true] },
      { name: "SSO and SCIM", values: [false, false, true] },
      { name: "Audit logs", values: [false, false, true] },
      { name: "Custom retention rules", values: [false, false, true] },
      { name: "Support", values: ["Community", "Priority", "Dedicated"] },
    ],
  },
];

const plans = ["Free", "Team", "Enterprise"];

function Mark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mx-auto h-4 w-4 text-blue-soft"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-muted/60">
          &ndash;
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-ink">{value}</span>;
}

const features = [
  {
    icon: (
      <Glyph>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      </Glyph>
    ),
    title: "Threads that stay tidy",
    description: "Reply in context, mute what you do not need and catch up in one pass instead of scrolling for an hour.",
  },
  {
    icon: (
      <Glyph>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
      </Glyph>
    ),
    title: "Works on every device",
    description: "Desktop, web and mobile stay in sync, with offline drafts that send themselves when you reconnect.",
  },
  {
    icon: (
      <Glyph>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </Glyph>
    ),
    title: "Encrypted in transit and at rest",
    description: "Every plan gets the same strong encryption and two-factor sign-in. Security is never a paid add-on.",
  },
  {
    icon: (
      <Glyph>
        <path d="M4 7h9" />
        <path d="M4 17h9" />
        <circle cx="17" cy="7" r="3" />
        <circle cx="17" cy="17" r="3" />
      </Glyph>
    ),
    title: "Search that finds it",
    description: "Look across messages, files and calls at once, with filters for people, channels and dates.",
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes. Upgrades apply immediately and you only pay the difference for the rest of the billing period. Downgrades take effect at the next renewal.",
  },
  {
    question: "How does the free trial work?",
    answer: "Team and Enterprise include a 14 day trial with every feature unlocked. You do not need a card to start, and nothing is charged unless you add one.",
  },
  {
    question: "How is billing calculated?",
    answer: "You pay per active person, per month. Someone counts as active once they send a message or join a call in that billing period.",
  },
  {
    question: "Do you offer a discount for annual billing?",
    answer: "Paying yearly saves about a quarter compared with monthly. Use the toggle above the plans to see both prices side by side.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "All major credit cards, plus invoices and bank transfer on Enterprise. Receipts are emailed to your billing contact automatically.",
  },
  {
    question: "Can I get a refund?",
    answer: "If Relay is not the right fit, write to us within 30 days of a payment and we will refund it in full, no questions asked.",
  },
];

export default function PricingTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Pricing · built from 5 blocks</p>
          <Link href="/effects#blocks" className="hb-btn hb-btn-ghost hb-btn-sm">
            View blocks
          </Link>
        </div>
      </div>

      <header className="bg-[#0a0a0a] px-6 pb-4 pt-20 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-soft">{product} pricing</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
          Simple pricing for teams that <GradientText text="talk a lot" />
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
          Pay per person, switch plans whenever you like, and keep every message you send. No seat minimums and no surprise fees.
        </p>
      </header>

      <div id="plans">
        <PricingSection
          title="Pick the plan that fits your team"
          subtitle="Every plan includes unlimited channels and threads. Save about a quarter when you pay yearly."
          tiers={tiers}
        />
      </div>

      <section className="bg-[#0a0a0a] px-4 pb-24 sm:px-6" aria-labelledby="compare-title">
        <div className="mx-auto max-w-[1080px]">
          <h2 id="compare-title" className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compare plans
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base text-white/60">
            A closer look at what each plan includes.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line-2 bg-surface">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Feature comparison between the Free, Team and Enterprise plans</caption>
              <thead>
                <tr className="border-b border-line-2">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-[40%] bg-surface px-4 py-4 text-xs font-medium uppercase tracking-widest text-muted sm:px-6"
                  >
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan}
                      scope="col"
                      className={`px-3 py-4 text-center text-sm font-semibold sm:px-6 ${
                        plan === "Team" ? "text-blue-soft" : "text-ink"
                      }`}
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((section) => (
                <tbody key={section.group}>
                  <tr className="bg-surface-2">
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="sticky left-0 px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted sm:px-6"
                    >
                      {section.group}
                    </th>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.name} className="border-t border-line">
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-surface px-4 py-3.5 text-left text-sm font-normal text-ink/90 sm:px-6"
                      >
                        {row.name}
                      </th>
                      {row.values.map((value, index) => (
                        <td
                          key={plans[index]}
                          className={`px-3 py-3.5 text-center text-sm sm:px-6 ${
                            plans[index] === "Team" ? "bg-blue/5" : ""
                          }`}
                        >
                          <Mark value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <FeaturesSection
        eyebrow="Included"
        title="Everything in every plan"
        subtitle="The parts of Relay that make a team feel close come standard, whatever you pay."
        features={features}
        columns={2}
      />

      <FaqSection
        title="Billing questions"
        subtitle="The short answers to what teams ask before they upgrade."
        items={faqs}
        contact={{ label: "Contact billing", href: "#contact" }}
      />

      <div id="start">
        <CtaBanner
          title="Bring your team into one place"
          text="Start a free workspace in a minute. Invite everyone, move a conversation over and see how it feels."
          primary={{ label: "Start free", href: "#start" }}
          secondary={{ label: "Talk to sales", href: "#contact" }}
        />
      </div>

      <footer id="contact" className="border-t border-white/10 bg-[#07070a] px-6 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">{product}</p>
            <p className="mt-2 max-w-xs">Team messaging without the noise. A fictional product used to demo Hyperblur blocks.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            <a href="#plans" className="hover:text-white">Plans</a>
            <a href="#start" className="hover:text-white">Get started</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-[1120px] text-xs text-white/40">
          © 2026 {product}. Built with Hyperblur blocks.
        </p>
      </footer>
    </>
  );
}

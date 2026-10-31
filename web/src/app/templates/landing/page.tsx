import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSection } from "@/registry/hyperblur/hero-section";
import { Beams } from "@/registry/hyperblur/beams";
import { Marquee } from "@/registry/hyperblur/marquee";
import { FeaturesSection } from "@/registry/hyperblur/features-section";
import { TestimonialsSection } from "@/registry/hyperblur/testimonials-section";
import { PricingSection } from "@/registry/hyperblur/pricing-section";
import { FaqSection } from "@/registry/hyperblur/faq-section";
import { CtaBanner } from "@/registry/hyperblur/cta-banner";

export const metadata: Metadata = {
  title: "Landing page template",
  description: "A complete landing page assembled only from Hyperblur registry blocks.",
};

const product = "Northwind Analytics";
const logos = ["Lumen", "Foundry", "Parallel", "Quanta", "Helix", "Orbit"];

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

const features = [
  {
    icon: (
      <Glyph>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-8" />
        <path d="M22 20H2" />
      </Glyph>
    ),
    title: "Live dashboards",
    description: "Every metric updates as events arrive, so the numbers on screen are the numbers right now.",
  },
  {
    icon: (
      <Glyph>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </Glyph>
    ),
    title: "Anomaly alerts",
    description: "Northwind learns your normal and pings the right channel when a funnel or a region drifts.",
  },
  {
    icon: (
      <Glyph>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M15.5 14.2c3 0 5.5 2 5.5 5" />
      </Glyph>
    ),
    title: "Shared workspaces",
    description: "Pin a view, leave a comment and hand a question to a teammate without exporting a thing.",
  },
  {
    icon: (
      <Glyph>
        <path d="M8 8l-5 4 5 4" />
        <path d="M16 8l5 4-5 4" />
        <path d="M14 5l-4 14" />
      </Glyph>
    ),
    title: "SQL when you want it",
    description: "Start from a point-and-click report, then open the query behind it and take over.",
  },
  {
    icon: (
      <Glyph>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </Glyph>
    ),
    title: "Private by design",
    description: "Data stays in your region, encrypted at rest, with row-level access and a full audit trail.",
  },
  {
    icon: (
      <Glyph>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </Glyph>
    ),
    title: "Connects to everything",
    description: "Warehouses, billing tools and product events sync in minutes through one typed API.",
  },
];

const testimonials = [
  {
    quote: "We retired three internal dashboards in the first month. Everyone now looks at the same numbers.",
    name: "Maya Okafor",
    role: "Head of Growth",
    company: "Lumen",
  },
  {
    quote: "The anomaly alerts caught a broken checkout in minutes, long before a customer wrote in.",
    name: "Daniel Reyes",
    role: "Engineering Lead",
    company: "Foundry",
  },
  {
    quote: "Our analysts live in SQL and our PMs live in reports. Northwind finally lets both work in one place.",
    name: "Priya Nair",
    role: "Director of Data",
    company: "Parallel",
  },
  {
    quote: "Setup took an afternoon. The weekly review is now twenty minutes shorter and a lot less tense.",
    name: "Tomas Lindgren",
    role: "COO",
    company: "Quanta",
  },
  {
    quote: "Row-level access meant we could open dashboards to every team without a long security review.",
    name: "Aiko Tanaka",
    role: "Security Manager",
    company: "Helix",
  },
];

const tiers = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "For small teams getting a first dashboard live.",
    features: ["3 dashboards", "10k events a month", "7 days of history", "Community support"],
    cta: { label: "Start free", href: "#start" },
  },
  {
    name: "Growth",
    price: { monthly: 29, yearly: 23 },
    description: "For product teams that review numbers every week.",
    features: ["Unlimited dashboards", "5M events a month", "12 months of history", "Anomaly alerts", "Email support"],
    cta: { label: "Start free trial", href: "#start" },
    highlighted: true,
  },
  {
    name: "Scale",
    price: { monthly: 89, yearly: 71 },
    description: "For organizations that need control and volume.",
    features: ["Everything in Growth", "Unlimited events", "SSO and audit logs", "Row-level access", "Dedicated manager"],
    cta: { label: "Talk to sales", href: "#contact" },
  },
];

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Most teams connect a source and publish a first dashboard in under an hour. There is nothing to install.",
  },
  {
    question: "Where does my data live?",
    answer: "In the region you pick at sign-up. It is encrypted at rest and in transit, and you can export or delete it at any time.",
  },
  {
    question: "Can I bring my own warehouse?",
    answer: "Yes. Northwind reads directly from the common warehouses, so you do not have to copy data into a second store.",
  },
  {
    question: "Is there a free plan?",
    answer: "The Starter plan is free for good. Upgrade only when you outgrow its limits, and downgrade whenever you like.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer: "We do. Write to us from your organization address and we will set it up the same day.",
  },
];

export default function LandingTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Landing page · built from 8 blocks</p>
          <Link href="/effects#blocks" className="hb-btn hb-btn-ghost hb-btn-sm">
            View blocks
          </Link>
        </div>
      </div>

      <HeroSection
        eyebrow={`${product} 2.0 is live`}
        title="Know what your product is doing, right now"
        highlight="right now"
        subtitle="Live dashboards, quiet alerts and plain SQL when you need it. One place for every number your team argues about."
        primary={{ label: "Start free", href: "#start" }}
        secondary={{ label: "See pricing", href: "#pricing" }}
        trust={["No credit card", "Set up in an hour", "Free plan forever"]}
      >
        <Beams />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-12 text-left">
          <p className="text-sm text-white/80">{product} · Revenue overview · updated a moment ago</p>
        </div>
      </HeroSection>

      <section className="border-y border-white/10 bg-[#07070a] py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-widest text-white/50">
          Trusted by teams at
        </p>
        <Marquee gap={64} speed={0.7}>
          {logos.map((name) => (
            <span key={name} className="text-2xl font-semibold tracking-tight text-white/45">
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      <FeaturesSection
        eyebrow="Features"
        title={`Everything ${product} does for you`}
        subtitle="A focused set of tools that stay out of the way, so your team spends its time on decisions instead of spreadsheets."
        features={features}
      />

      <TestimonialsSection
        title="Teams stopped arguing about numbers"
        subtitle={`A few words from the people who run on ${product} every day.`}
        testimonials={testimonials}
      />

      <div id="pricing">
        <PricingSection
          title={`Pricing for every stage of ${product}`}
          subtitle="Start free and upgrade when your volume grows. No hidden fees."
          tiers={tiers}
        />
      </div>

      <FaqSection
        title="Questions, answered"
        subtitle={`The short version of what teams ask before they switch to ${product}.`}
        items={faqs}
        contact={{ label: "Contact support", href: "#contact" }}
      />

      <div id="start">
        <CtaBanner
          title={`Give ${product} an afternoon`}
          text="Connect a source, publish a dashboard and see for yourself. Free to start, no card needed."
          primary={{ label: "Start free", href: "#start" }}
          secondary={{ label: "Talk to sales", href: "#contact" }}
        />
      </div>

      <footer id="contact" className="border-t border-white/10 bg-[#07070a] px-6 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">{product}</p>
            <p className="mt-2 max-w-xs">Live analytics for product teams. A fictional product used to demo Hyperblur blocks.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            <a href="#pricing" className="hover:text-white">Pricing</a>
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

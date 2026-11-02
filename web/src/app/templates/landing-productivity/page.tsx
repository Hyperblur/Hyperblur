import type { Metadata } from "next";
import { TestimonialsSection } from "@/registry/hyperblur/testimonials-section";
import { PricingSection } from "@/registry/hyperblur/pricing-section";
import { FaqSection } from "@/registry/hyperblur/faq-section";
import { CtaBanner } from "@/registry/hyperblur/cta-banner";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { css } from "./styles";
import { Logo } from "./icons";
import { Hero } from "./hero";
import { LogoMarquee, StatsBand } from "./proof";
import { Showcase } from "./showcase";
import { Capabilities } from "./bento";
import { Integrations } from "./integrations";

export const metadata: Metadata = {
  title: "Tempo landing template",
  description:
    "A landing page for Tempo, a fictional planning tool for product teams, built from Hyperblur components: live product mockup, tabbed showcase, bento grid, integration beams and pricing.",
};

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

const testimonials = [
  {
    quote: "We used to spend Monday morning updating three tools. Now the roadmap updates itself and planning takes twenty minutes.",
    name: "Priya Raman",
    role: "VP of Product",
    company: "Halcyon",
  },
  {
    quote: "The Git sync is the first one our engineers did not turn off. Cards move when PRs merge, so the board is finally true.",
    name: "Marcus Webb",
    role: "Engineering Manager",
    company: "Corvid",
  },
  {
    quote: "Specs with live issues inside changed how we review. Nobody asks whether a ticket is still open anymore.",
    name: "Aiko Tanaka",
    role: "Staff Product Designer",
    company: "Pinegrove",
  },
  {
    quote: "We moved 14,000 issues over a weekend and kept every comment. Our cycle time dropped by a third in one quarter.",
    name: "Daniel Okafor",
    role: "Head of Engineering",
    company: "Arclight",
  },
  {
    quote: "The standup automation alone saves my team about four hours a week. It posts what changed and who is blocked.",
    name: "Sofia Lindqvist",
    role: "Product Lead",
    company: "Tidalworks",
  },
  {
    quote: "Guest access let us bring our agency into one project without a single security exception.",
    name: "Hannah Cole",
    role: "Director of Operations",
    company: "Kestrel",
  },
];

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "For small teams finding their rhythm.",
    features: ["Up to 10 members", "Unlimited issues and docs", "2 active sprints", "Git and chat integrations", "Community support"],
    cta: { label: "Start for free", href: "#start" },
  },
  {
    name: "Team",
    price: { monthly: 10, yearly: 8 },
    description: "For product teams shipping every week.",
    features: ["Unlimited members", "Roadmaps and timelines", "1,000 automation runs a month", "Cycle analytics", "Guest access"],
    cta: { label: "Start a 14-day trial", href: "#start" },
    highlighted: true,
  },
  {
    name: "Business",
    price: { monthly: 18, yearly: 15 },
    description: "For organizations that need control at scale.",
    features: ["Everything in Team", "Unlimited automation runs", "SAML SSO and SCIM", "Audit log and data residency", "4-hour support response"],
    cta: { label: "Talk to sales", href: "#contact" },
  },
];

const faqs = [
  {
    question: "How long does it take to move from our current tracker?",
    answer: "Most teams import in under an hour. Projects, issues, comments, attachments and history come across, and you can run both tools side by side while you switch.",
  },
  {
    question: "Is Tempo only for software teams?",
    answer: "It started there, but design, marketing and operations teams use the same roadmaps and docs. Custom fields and views adapt to any workflow.",
  },
  {
    question: "What counts as an automation run?",
    answer: "One run is one rule firing once. A rule that triages 30 bugs in a day uses 30 runs. Dry runs and failed runs are free.",
  },
  {
    question: "Can we self-host or choose where data lives?",
    answer: "Business plans can pin data to the US, EU or Australia. Everything is encrypted at rest and in transit, and we are SOC 2 Type II audited every year.",
  },
  {
    question: "Do guests count toward our seat total?",
    answer: "No. Guests are free on every paid plan and only see the projects you invite them to.",
  },
  {
    question: "What happens if we downgrade?",
    answer: "Nothing is deleted. Extra sprints become read-only and automations pause until you upgrade again or trim them back.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Roadmaps", href: "#features" },
      { label: "Sprints", href: "#features" },
      { label: "Docs", href: "#features" },
      { label: "Automations", href: "#automations" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Customers", href: "#customers" },
      { label: "Careers", href: "#careers" },
      { label: "Press kit", href: "#press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "#guides" },
      { label: "API reference", href: "#api" },
      { label: "Templates", href: "#templates" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

function ProductNav() {
  return (
    <div className="relative z-10 px-4 sm:px-6">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 border-b border-white/[0.06]" aria-label="Tempo">
        <a href="#top" className="hbl-pr-logo" aria-label="Tempo home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-[14px] md:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hbl-pr-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="#signin" className="hbl-pr-link hidden text-[14px] sm:inline">
            Sign in
          </a>
          <a href="#start" className="hbl-pr-btn hbl-pr-btn-primary hbl-pr-btn-sm">
            Start free
          </a>
        </div>
      </nav>
    </div>
  );
}

export default function TempoLandingPage() {
  return (
    <div id="top" className="hbl-pr-root">
      <style href="hbl-pr" precedence="default">{css}</style>
      <ProductNav />
      <Hero />
      <LogoMarquee />
      <Showcase />
      <StatsBand />
      <Capabilities />
      <Integrations />
      <FadeInView>
        <TestimonialsSection
          id="customers"
          className="scroll-mt-8"
          title="Teams that stopped chasing status"
          subtitle="Product, design and engineering leads on what changed after their first month in Tempo."
          testimonials={testimonials}
          accent="#ff6b3d"
        />
      </FadeInView>
      <PricingSection
        id="pricing"
        className="scroll-mt-8"
        title="Simple pricing that grows with the team"
        subtitle="Start free. Upgrade when you need roadmaps, automations and analytics. Cancel any time."
        tiers={tiers}
        accent="#ff6b3d"
      />
      <FaqSection
        id="faq"
        title="Questions teams ask before switching"
        subtitle="Still curious? Our product specialists answer within one business day."
        items={faqs}
        contact={{ label: "Talk to a human", href: "#contact" }}
        accent="#ff6b3d"
      />
      <div id="start" className="scroll-mt-8 px-4 sm:px-6">
        <div className="hbl-pr-panel mx-auto max-w-[1200px] overflow-hidden">
          <CtaBanner
            title="Your next sprint can start on Monday"
            text="Import the backlog, invite the team and run planning in Tempo this week. Free for teams up to ten."
            primary={{ label: "Start for free", href: "#start" }}
            secondary={{ label: "Book a demo", href: "#contact" }}
            accent="#ff6b3d"
          />
        </div>
      </div>
      <div id="contact" className="mt-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <FooterColumns
            logo={<Logo />}
            blurb="Roadmaps, sprints, specs and automations for product teams who would rather ship than update status."
            socials={[]}
            columns={footerColumns}
            newsletterTitle="The Tempo changelog, every other Friday"
            legal={[
              { label: "Privacy", href: "#privacy" },
              { label: "Terms", href: "#terms" },
              { label: "Security", href: "#security" },
            ]}
            copyright="© 2026 Tempo Labs, Inc. A fictional product."
            status={{ label: "All systems operational", tone: "ok" }}
            accent="#ff6b3d"
          />
        </div>
      </div>
    </div>
  );
}

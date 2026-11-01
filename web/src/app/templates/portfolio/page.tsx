import type { Metadata } from "next";
import Link from "next/link";
import { DotGrid } from "@/registry/hyperblur/dot-grid";
import { SplitText } from "@/registry/hyperblur/split-text";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { BentoGrid, BentoCard } from "@/registry/hyperblur/bento-grid";
import { GradientText } from "@/registry/hyperblur/gradient-text";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { CountUp } from "@/registry/hyperblur/count-up";
import { TestimonialsSection } from "@/registry/hyperblur/testimonials-section";
import { CtaBanner } from "@/registry/hyperblur/cta-banner";

export const metadata: Metadata = {
  title: "Portfolio template",
  description: "A personal portfolio assembled only from Hyperblur registry blocks.",
};

const name = "Lina Okafor";

const roles = ["Product designer", "Motion tinkerer", "Occasional coder"];

const work = [
  {
    title: "Tidewave banking app",
    description: "A calmer way to see where money goes, redesigned for 2M customers.",
    visual: "Tidewave",
    colors: ["#2f7bff", "#19c3f5", "#7fb3ff"],
    colSpan: 2,
    rowSpan: 2,
  },
  {
    title: "Fernhill recipe studio",
    description: "A cooking tool built around hands covered in flour.",
    visual: "Fernhill",
    colors: ["#34d399", "#a3e635"],
  },
  {
    title: "Orbit design system",
    description: "Tokens, components and docs for a team of forty.",
    visual: "Orbit",
    colors: ["#a78bfa", "#f472b6"],
  },
  {
    title: "Paperlane onboarding",
    description: "Cut time to first invoice from nine minutes to two.",
    visual: "Paperlane",
    colors: ["#fbbf24", "#f87171"],
  },
  {
    title: "Kiln pottery shop",
    description: "A small storefront with a slow, tactile feel.",
    visual: "Kiln",
    colors: ["#fb923c", "#facc15"],
  },
  {
    title: "Motion reel 2026",
    description: "Ninety seconds of interface motion studies.",
    visual: "Reel",
    colors: ["#f472b6", "#2f7bff"],
  },
];

const stats = [
  { to: 9, suffix: "", label: "Years designing" },
  { to: 64, suffix: "+", label: "Projects shipped" },
  { to: 27, suffix: "", label: "Happy clients" },
];

const testimonials = [
  {
    quote: "Lina turned a tangled flow into something our customers describe as effortless. She made the whole team braver.",
    name: "Sofia Marin",
    role: "VP of Product",
    company: "Tidewave",
  },
  {
    quote: "She designs in the browser, prototypes the motion and then hands over code we actually ship. Rare and wonderful.",
    name: "Jonas Weber",
    role: "Engineering Manager",
    company: "Orbit",
  },
  {
    quote: "Our onboarding went from a drop-off point to a selling point. The details are what set her work apart.",
    name: "Hana Ito",
    role: "Founder",
    company: "Paperlane",
  },
];

export default function PortfolioTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Portfolio · built from 10 blocks</p>
          <Link href="/effects#blocks" className="hb-btn hb-btn-ghost hb-btn-sm">
            View blocks
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <DotGrid />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="text-sm text-muted">{name} · Lisbon, Portugal</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            <SplitText text="I design software people enjoy using" by="words" stagger={0.07} trigger="mount" />
          </h1>
          <p className="mt-6 text-lg text-white/70 sm:text-xl">
            Hi, I am a{" "}
            <Typewriter words={roles} className="font-medium text-blue-soft" />
          </p>
          <p className="mt-4 max-w-xl text-base text-muted">
            Nine years of shaping products for fintech, food and tools for makers. Currently open for projects from September.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#work" className="hb-btn hb-btn-primary">
              View work
            </a>
            <a href="#contact" className="hb-btn hb-btn-ghost">
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-line bg-bg px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-blue-soft">Selected work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Six projects I am proud of</h2>
          <p className="mt-3 max-w-xl text-muted">A mix of product design, systems and motion from the past three years.</p>
          <div className="mt-10">
            <BentoGrid columns={3} rowHeight={190}>
              {work.map((item) => (
                <BentoCard
                  key={item.title}
                  colSpan={item.colSpan}
                  rowSpan={item.rowSpan}
                  title={item.title}
                  description={item.description}
                >
                  <div className="flex h-full min-h-24 items-center justify-center bg-white/[0.03] px-3">
                    <GradientText
                      text={item.visual}
                      colors={item.colors}
                      className={`font-semibold tracking-tight ${item.colSpan ? "text-5xl sm:text-6xl" : "text-3xl"}`}
                    />
                  </div>
                </BentoCard>
              ))}
            </BentoGrid>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-line bg-bg px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm text-blue-soft">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Quietly obsessed with details</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              <BlurText
                text="I started in print, fell for interfaces and never looked back. I like clear problems, small teams and prototypes that move. When I am not in Figma you will find me writing a little code, tuning easing curves or throwing pots on weekends."
                stagger={0.04}
              />
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 self-center sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
                <p className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection
        title="Kind words from clients"
        subtitle={`A few notes from people I have worked with, collected by ${name}.`}
        testimonials={testimonials}
        autoScroll={false}
      />

      <div id="start">
        <CtaBanner
          title="Have a product that needs care?"
          text="I take on two projects at a time. Tell me about yours and I will reply within two working days."
          primary={{ label: "Say hello", href: "#contact" }}
          secondary={{ label: "View work", href: "#work" }}
        />
      </div>

      <footer id="contact" className="border-t border-white/10 bg-[#07070a] px-6 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="mt-2 max-w-xs">Product designer based in Lisbon. A fictional portfolio used to demo Hyperblur blocks.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="mailto:hello@linaokafor.example" className="hover:text-white">Email</a>
            <a href="#contact" className="hover:text-white">Dribbble</a>
            <a href="#contact" className="hover:text-white">LinkedIn</a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-[1120px] text-xs text-white/40">
          © 2026 {name}. Built with Hyperblur blocks.
        </p>
      </footer>
    </>
  );
}

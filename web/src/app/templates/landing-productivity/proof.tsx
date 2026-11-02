import type { ReactNode } from "react";
import { Marquee } from "@/registry/hyperblur/marquee";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const brands: { name: string; font: string; glyph: ReactNode }[] = [
  { name: "Halcyon", font: "font-grotesk text-[22px] font-medium tracking-[-0.03em]", glyph: <circle cx="12" cy="12" r="7" /> },
  { name: "corvid", font: "font-mono text-[20px] lowercase", glyph: <path d="M5 17L12 5l7 12z" /> },
  { name: "Pinegrove", font: "font-serif text-[25px] italic", glyph: <path d="M12 4l6 9H6zM12 10l7 10H5z" /> },
  { name: "ARCLIGHT", font: "font-sans text-[17px] font-semibold tracking-[0.18em]", glyph: <path d="M4 18a8 8 0 0 1 16 0" /> },
  { name: "Tidalworks", font: "font-grotesk text-[22px] tracking-[-0.02em]", glyph: <path d="M3 10c3-3 6 3 9 0s6 3 9 0M3 16c3-3 6 3 9 0s6 3 9 0" /> },
  { name: "Kestrel", font: "font-sans text-[22px] font-bold tracking-[-0.04em]", glyph: <path d="M4 12h16M12 4v16" /> },
  { name: "oakline", font: "font-serif text-[25px]", glyph: <rect x="5" y="5" width="14" height="14" rx="4" /> },
  { name: "Northwind", font: "font-grotesk text-[22px] font-medium", glyph: <path d="M12 3v18M5 10l7-7 7 7" /> },
];

const stats = [
  { to: 4200, suffix: "+", decimals: 0, label: "product teams plan in Tempo every week" },
  { to: 38, suffix: "%", decimals: 0, label: "shorter cycle time after the first quarter" },
  { to: 1.6, suffix: "M", decimals: 1, label: "issues shipped through Tempo last month" },
  { to: 99.98, suffix: "%", decimals: 2, label: "uptime over the last twelve months" },
];

const edges = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-white/[0.06] py-12" aria-label="Customers">
      <p className="mb-8 px-4 text-center text-[13px] text-[#8b8b96]">
        Product teams at 4,200 companies run their week on Tempo
      </p>
      <Marquee gap={72} speed={0.6}>
        {brands.map((b) => (
          <span key={b.name} className={`hbl-pr-wordmark ${b.font}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {b.glyph}
            </svg>
            {b.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="px-4 py-24 sm:px-6" aria-labelledby="hbl-pr-stats-title">
      <div className="mx-auto max-w-[1200px]">
        <FadeInView className="mx-auto max-w-[720px] text-center">
          <span className="hbl-pr-eyebrow">By the numbers</span>
          <h2 id="hbl-pr-stats-title" className="hbl-pr-h2">
            Less status chasing. More shipping.
          </h2>
        </FadeInView>
        <div className="hbl-pr-panel mt-14 grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeInView
              key={s.label}
              delay={i * 0.08}
              className={`min-w-0 border-white/[0.07] p-8 ${edges[i]}`}
            >
              <p className="hbl-pr-stat-num">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} duration={1.8} />
              </p>
              <p className="mt-4 max-w-[220px] text-[14px] leading-relaxed text-[#a3a3ae]">{s.label}</p>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

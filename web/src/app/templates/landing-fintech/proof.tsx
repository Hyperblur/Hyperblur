import type { ReactNode } from "react";
import { Marquee } from "@/registry/hyperblur/marquee";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const banks: { name: string; mark: ReactNode }[] = [
  { name: "Aldermoor Bank", mark: <path d="M4 20L12 4l8 16M7.5 14h9" /> },
  { name: "Halden Trust", mark: <path d="M5 4v16M19 4v16M5 12h14" /> },
  { name: "Kestrel Clearing", mark: <path d="M3 14c4-1 7-4 9-9 1 5 4 8 9 9-5 1-8 3-9 6-1-3-4-5-9-6z" /> },
  { name: "Vireo Bank", mark: <path d="M4 5l8 14 8-14" /> },
  { name: "Northgate Savings", mark: <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" /> },
  { name: "Banco Solera", mark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /> },
  { name: "Fjordline", mark: <path d="M3 16c3-4 5-4 7 0s4 4 7 0 3-3 4-2M3 10c3-4 5-4 7 0s4 4 7 0" /> },
  { name: "Sakai Commerce", mark: <path d="M12 3l9 9-9 9-9-9zM12 8l4 4-4 4-4-4z" /> },
];

const stats = [
  { to: 84.2, decimals: 1, prefix: "$", suffix: "B", label: "Processed in the last 12 months" },
  { to: 135, decimals: 0, prefix: "", suffix: "", label: "Currencies accepted at checkout" },
  { to: 0.8, decimals: 1, prefix: "", suffix: "s", label: "Median time for a payout to land" },
  { to: 99.999, decimals: 3, prefix: "", suffix: "%", label: "API uptime over the past year", from: 99 },
];

export function Proof() {
  return (
    <section id="partners" aria-labelledby="hbl-fn-proof-title" className="relative py-16 md:py-20">
      <div className="hbl-fn-wrap">
        <FadeInView>
          <p id="hbl-fn-proof-title" className="text-center text-[14px] text-[#8193ab]">
            Settlement partners and licensed banks behind every Meridian account
          </p>
        </FadeInView>
      </div>
      <div className="mt-8">
        <Marquee speed={0.6} gap={64}>
          {banks.map((b) => (
            <span key={b.name} className="hbl-fn-marquee-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {b.mark}
              </svg>
              {b.name}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="hbl-fn-wrap mt-16 md:mt-20">
        <FadeInView distance={24}>
          <div className="grid gap-px overflow-hidden rounded-[22px] border border-[rgba(148,163,184,0.16)] bg-[rgba(148,163,184,0.16)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="hbl-fn-stat">
                <p className="hbl-fn-stat-value">
                  <CountUp to={s.to} from={s.from ?? 0} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} duration={2} />
                </p>
                <p className="mt-3 text-[14px] leading-snug text-[#94a3b8]">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

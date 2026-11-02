import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Timing } from "./timing";
import { Corners, SectionHead } from "./icons";

const stats = [
  { to: 9.4, decimals: 1, suffix: "s", label: "Median production deploy", sub: "p50 across 2.1M builds" },
  { to: 97.8, decimals: 1, suffix: "%", label: "Remote cache hit rate", sub: "teams with 10+ engineers" },
  { to: 43, decimals: 0, suffix: "x", label: "Faster than cold CI", sub: "184-package monorepo" },
  { to: 0.6, decimals: 1, suffix: "s", label: "Average rollback", sub: "pointer flip, no rebuild" },
];

export function Benchmarks() {
  return (
    <section id="benchmarks" className="hbl-dv-rule relative overflow-hidden py-24 sm:py-32">
      <div className="hbl-dv-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_70%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <FadeInView>
          <SectionHead
            center
            label="Benchmarks"
            title="Measured, not promised."
            body="Numbers from production telemetry in October 2026. The comparison below is the same 184-package monorepo, same commit, same 8-core runner."
          />
        </FadeInView>

        <FadeInView delay={0.1} className="mt-16">
          <div className="grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="relative min-w-0 border-b border-r border-white/10 bg-[#0b0b0c]/80 p-5 sm:p-8">
                <p className="font-mono text-[clamp(32px,5vw,56px)] font-semibold leading-none tracking-[-0.06em] text-[#f4f4f0]">
                  <CountUp to={s.to} decimals={s.decimals} duration={1.8} />
                  <span className="text-[#a3e635]">{s.suffix}</span>
                </p>
                <p className="mt-4 text-[14px] font-medium text-[#f4f4f0]">{s.label}</p>
                <p className="mt-1 font-mono text-[11.5px] text-[#6f6f69]">{s.sub}</p>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView delay={0.1} className="mt-10">
          <div className="relative rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#111112,#0c0c0d)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-10">
            <Corners />
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f6f69]">Deploy to production</p>
                <h3 className="mt-2 font-mono text-[20px] font-semibold tracking-[-0.04em] text-[#f4f4f0] sm:text-[24px]">
                  acme/monorepo · commit 7f3a2c
                </h3>
              </div>
              <p className="font-mono text-[12px] text-[#a3a39b]">
                lower is better · <span className="text-[#a3e635]">-97.7%</span> wall time
              </p>
            </div>
            <Timing />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

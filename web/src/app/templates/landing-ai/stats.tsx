import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const stats = [
  { to: 2.4, decimals: 1, prefix: "", suffix: "M", label: "tasks completed last quarter" },
  { to: 87, decimals: 0, prefix: "", suffix: "%", label: "of tickets resolved with no rework" },
  { to: 11, decimals: 0, prefix: "", suffix: " min", label: "median time to a human decision" },
  { to: 6.1, decimals: 1, prefix: "$", suffix: "M", label: "in duplicate and overbilled invoices caught" },
];

export function Stats() {
  return (
    <section aria-label="Cadence in numbers" className="relative px-5 sm:px-8">
      <div className="hbl-ai-stats mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <FadeInView key={s.label} delay={i * 0.08} className="hbl-ai-stat min-w-0 px-5 py-10 sm:px-8 sm:py-12">
            <p className="hbl-ai-grad-text font-grotesk text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]">
              <CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} duration={1.8} />
            </p>
            <p className="mt-3 text-[14px] leading-snug text-[#9aa0b4]">{s.label}</p>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}

import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const stats = [
  { to: 140, suffix: "+", decimals: 0, label: "Brands and sites launched since 2014" },
  { to: 4.1, suffix: "x", decimals: 1, label: "Average lift in conversion after a relaunch" },
  { to: 96, suffix: "%", decimals: 0, label: "Clients who come back for a second project" },
  { to: 9, suffix: "", decimals: 0, label: "People, two studios, one shared calendar" },
];

export function AgencyStats() {
  return (
    <section aria-label="Studio in numbers" className="border-b hbl-ag-rule">
      <div className="hbl-ag-wrap">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 hbl-ag-rule py-12 pr-4 md:py-20 md:pr-8 ${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 === 1 ? "border-l pl-4 md:pl-8" : ""} ${i === 2 ? "md:border-l md:pl-8" : ""}`}
            >
              <FadeInView delay={i * 0.08}>
                <p className="hbl-ag-numeral text-[clamp(56px,7vw,104px)]">
                  <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} duration={1.8} />
                </p>
                <p className="mt-4 max-w-[22ch] text-sm leading-relaxed hbl-ag-muted">{stat.label}</p>
              </FadeInView>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

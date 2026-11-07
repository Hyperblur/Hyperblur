import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ProgressRings } from "@/registry/hyperblur/progress-rings";
import { InView, SeenFlag } from "./in-view";

const stats = [
  { to: 38, prefix: "+", suffix: "%", decimals: 0, label: "average back squat 1RM after six months" },
  { to: 1212, prefix: "", suffix: "", decimals: 0, label: "PRs rung on the bell in 2025" },
  { to: 6.1, prefix: "−", suffix: " cm", decimals: 1, label: "average waist change in the 12-week block" },
  { to: 87, prefix: "", suffix: "%", decimals: 0, label: "of members still training after a year" },
];

const months = [
  { m: "Jan", v: 72 },
  { m: "Feb", v: 78 },
  { m: "Mar", v: 83 },
  { m: "Apr", v: 87 },
  { m: "May", v: 92 },
  { m: "Jun", v: 96 },
  { m: "Jul", v: 99 },
];

export function FitnessResults() {
  return (
    <section aria-labelledby="hbl-ft-results-title" className="hbl-ft-results py-24 md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="max-w-3xl">
          <p className="hbl-ft-kicker">Results</p>
          <h2 id="hbl-ft-results-title" className="hbl-ft-h2 mt-5">
            We count <span className="hbl-ft-lime">every rep.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed hbl-ft-muted">
            Every lift goes into the member app. Here is what 1,840 people did with it last year.
          </p>
        </FadeInView>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-[20px] border hbl-ft-rule hbl-ft-statgrid sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeInView key={s.label} delay={i * 0.07} className="hbl-ft-stat min-w-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-mono text-[clamp(40px,5vw,60px)] leading-none tracking-[-0.04em] text-[#f1f0e8]">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} duration={1.8} />
                </span>
                <span aria-hidden="true" className="mt-4 block text-[14px] leading-snug hbl-ft-muted">
                  {s.label}
                </span>
              </dd>
            </FadeInView>
          ))}
        </dl>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <FadeInView className="hbl-ft-panelcard min-w-0">
            <p className="hbl-ft-mono-label">12-week block · cohort average</p>
            <h3 className="mt-2 font-grotesk text-2xl font-bold uppercase tracking-[-0.03em]">Goals closed</h3>
            <InView className="mt-6" minHeight={190}>
              <ProgressRings
                size={180}
                thickness={16}
                rings={[
                  { label: "Sessions", value: 41, goal: 48, unit: "classes", color: "#c8ff3d" },
                  { label: "Squat target", value: 92, goal: 100, unit: "%", color: "#ff5a1f" },
                  { label: "Sleep logged", value: 6.8, goal: 8, unit: "h", color: "#f1f0e8" },
                ]}
              />
            </InView>
          </FadeInView>
          <FadeInView delay={0.08} className="hbl-ft-panelcard min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="hbl-ft-mono-label">Member squat 1RM · median, kg</p>
                <h3 className="mt-2 font-grotesk text-2xl font-bold uppercase tracking-[-0.03em]">Up and to the right</h3>
              </div>
              <p className="font-mono text-sm hbl-ft-lime">+27 kg in 7 months</p>
            </div>
            <SeenFlag className="hbl-ft-chart mt-8">
              <div role="img" aria-label="Median squat one rep max rose from 72 kg in January to 99 kg in July" className="hbl-ft-bars">
                {months.map((d, i) => (
                  <div key={d.m} className="hbl-ft-barcol">
                    <span className="hbl-ft-bartrack">
                      <span className="hbl-ft-barval">{d.v}</span>
                      <span
                        className="hbl-ft-bar"
                        data-last={i === months.length - 1 ? "" : undefined}
                        style={{ height: `${Math.round(((d.v - 50) / 60) * 100)}%`, transitionDelay: `${(i * 0.08).toFixed(2)}s` }}
                      />
                    </span>
                    <span className="hbl-ft-barlabel">{d.m}</span>
                  </div>
                ))}
              </div>
            </SeenFlag>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

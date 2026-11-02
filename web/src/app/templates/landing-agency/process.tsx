import type { CSSProperties } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SplitText } from "@/registry/hyperblur/split-text";
import { InView } from "./in-view";

const steps = [
  {
    n: "01",
    title: "Listen",
    when: "Weeks 1 – 2",
    text: "Workshops with your team, interviews with twelve or more customers and a teardown of every competitor you mention.",
  },
  {
    n: "02",
    title: "Define",
    when: "Weeks 3 – 4",
    text: "One page of strategy, a name if you need one, and three territories presented in person. You pick one; we push it.",
  },
  {
    n: "03",
    title: "Make",
    when: "Weeks 5 – 10",
    text: "Identity, site and motion built in weekly sprints. You see real work every Friday, never a deck of promises.",
  },
  {
    n: "04",
    title: "Launch & tend",
    when: "Week 11 onward",
    text: "Launch day on call, guidelines your team can use, then ninety days of care while the brand meets the world.",
  },
];

export function AgencyProcess() {
  return (
    <section id="process" className="border-b hbl-ag-rule py-24 md:py-36">
      <div className="hbl-ag-wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0">
            <p className="hbl-ag-kicker">Process</p>
            <h2 className="mt-6 font-grotesk text-[clamp(44px,7vw,112px)] font-bold uppercase leading-[0.86] tracking-[-0.05em]">
              <span className="sr-only">Eleven weeks, no surprises.</span>
              <span aria-hidden="true">
                <SplitText text="Eleven weeks," by="words" stagger={0.08} distance={40} />
                <br />
                <span className="hbl-ag-serif">no surprises.</span>
              </span>
            </h2>
          </div>
          <p className="max-w-xs leading-relaxed hbl-ag-muted">
            A fixed scope, a fixed fee and a calendar you get on day one. Most identity and website projects ship in under three months.
          </p>
        </div>

        <InView className="relative mt-20" threshold={0.3}>
          <div className="hbl-ag-track hidden md:block" aria-hidden="true">
            <span />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.n} className="relative min-w-0 border-l hbl-ag-rule pl-6 md:border-l-0 md:pl-0 md:pt-10">
                <span
                  className="hbl-ag-step-dot hidden md:block"
                  style={{ "--hbl-ag-d": `${(0.2 + i * 0.55).toFixed(2)}s` } as CSSProperties}
                  aria-hidden="true"
                />
                <FadeInView delay={0.15 + i * 0.15}>
                  <p className="hbl-ag-numeral text-[96px] text-[#ece8df] md:text-[128px]">
                    {step.n}
                  </p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-red">{step.when}</p>
                  <h3 className="mt-2 font-grotesk text-2xl font-bold tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed hbl-ag-muted">{step.text}</p>
                </FadeInView>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}

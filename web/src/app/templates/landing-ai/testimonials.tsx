import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./ui";

const quotes = [
  {
    quote:
      "We closed March four days faster. Cadence matches the boring ninety-five percent and hands my team the five invoices that actually need judgment.",
    name: "Dana Whitfield",
    role: "Controller, Northbeam Logistics",
    initials: "DW",
    metric: "4 days",
    metricLabel: "faster month-end close",
  },
  {
    quote:
      "First response went from six hours to nine minutes and nobody on the team was replaced. They just stopped copy-pasting order numbers between tabs.",
    name: "Marco Ruiz",
    role: "Head of Support, Parcelwise",
    initials: "MR",
    metric: "9 min",
    metricLabel: "median first response",
  },
  {
    quote:
      "New hires used to wait two days for accounts. Now everything is ready before their first coffee, and IT approves the risky bits from Slack.",
    name: "Priya Raman",
    role: "People Operations, Halcyon Health",
    initials: "PR",
    metric: "0 days",
    metricLabel: "waiting for access",
  },
];

export function Testimonials() {
  return (
    <section id="customers" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          eyebrow="Customers"
          title="Teams that got their afternoons back"
          body="Finance, support and people teams use Cadence to clear queues without adding headcount."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <FadeInView key={q.name} delay={i * 0.1} className="min-w-0">
              <TiltCard maxTilt={5} scale={1.015} className="block h-full w-full rounded-[22px]">
                <figure className="hbl-ai-card hbl-ai-quote flex h-full flex-col p-7">
                  <div>
                    <p className="hbl-ai-grad-text font-grotesk text-3xl font-semibold tracking-tight">{q.metric}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#6b7088]">{q.metricLabel}</p>
                  </div>
                  <blockquote className="mt-6 flex-1 text-[15.5px] leading-relaxed text-[#d4d6e6]">
                    <p>{`“${q.quote}”`}</p>
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <span className="hbl-ai-avatar" aria-hidden="true">
                      {q.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-[#eceef6]">{q.name}</span>
                      <span className="block truncate text-[12.5px] text-[#7d8299]">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./icons";

const quotes = [
  {
    quote:
      "Our deploy went from fourteen minutes to fifty-two seconds the week we switched. Nobody batches PRs anymore, they just ship.",
    name: "Priya Raman",
    role: "Staff engineer, Quarrystack",
    metric: "14m 03s → 52s",
    initials: "PR",
  },
  {
    quote:
      "The remote cache paid for the whole team plan in the first month. Our CI bill dropped by 61 percent.",
    name: "Tomás Herrera",
    role: "Platform lead, Kestrel Pay",
    metric: "−61% CI spend",
    initials: "TH",
  },
  {
    quote:
      "We rolled back a broken checkout at 2am in under a second. I typed one command and went back to sleep.",
    name: "Hannah Okoye",
    role: "CTO, Parcelpoint",
    metric: "0.6s rollback",
    initials: "HO",
  },
  {
    quote:
      "Preview URLs on every PR changed how design reviews work. Feedback lands before the code is even merged.",
    name: "Jonas Lindqvist",
    role: "Frontend lead, Tessellate",
    metric: "3,180 previews / mo",
    initials: "JL",
  },
];

export function Testimonials() {
  return (
    <section className="hbl-dv-rule relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <FadeInView>
          <SectionHead label="Teams on Forge" title="Fewer minutes waiting, more releases shipped." />
        </FadeInView>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {quotes.map((q, i) => (
            <FadeInView key={q.name} delay={0.06 * i} className="min-w-0">
              <GlowBorder color="#a3e635" rounded={18} radius={260} className="h-full">
                <figure className="flex h-full flex-col rounded-[18px] bg-[linear-gradient(180deg,#121213,#0d0d0e)] p-7 sm:p-8">
                  <p className="inline-flex w-fit rounded-full border border-[#a3e635]/25 bg-[#a3e635]/[0.07] px-2.5 py-1 font-mono text-[11.5px] text-[#a3e635]">
                    {q.metric}
                  </p>
                  <blockquote className="mt-6 flex-1 text-[17px] leading-relaxed text-[#f4f4f0] sm:text-[18px]">
                    “{q.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#2a2a2c,#121213)] font-mono text-[12px] text-[#f4f4f0]"
                      aria-hidden="true"
                    >
                      {q.initials}
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-medium text-[#f4f4f0]">{q.name}</span>
                      <span className="block font-mono text-[12px] text-[#6f6f69]">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </GlowBorder>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

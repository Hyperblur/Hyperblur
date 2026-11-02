import { CurtainReveal } from "@/registry/hyperblur/curtain-reveal";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { CursorTrail } from "@/registry/hyperblur/cursor-trail";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon } from "./icons";

const details = [
  { label: "New business", value: "Marta Reis", sub: "Founder, replies within 48 hours" },
  { label: "Lisbon", value: "Rua da Boavista 84", sub: "1200-066 Lisboa" },
  { label: "Brooklyn", value: "55 Washington St, #612", sub: "Brooklyn, NY 11201" },
];

export function AgencyContact() {
  return (
    <section id="contact" className="relative overflow-hidden border-b hbl-ag-rule py-24 md:py-40">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(255,79,46,0.22),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="hbl-ag-wrap relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="hbl-ag-kicker">Start a project</p>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">
            <span className="hbl-ag-live" aria-hidden="true" />
            2 of 4 slots open for Q1 2027
          </p>
        </div>

        <h2 className="hbl-ag-cta-title mt-12">
          <CurtainReveal trigger="view" color="#ff4f2e" duration={1} delay={0.1} className="inline-block align-top">
            <span className="block pb-[0.06em] pr-[0.04em]">Let&apos;s make</span>
          </CurtainReveal>
          <br />
          <CurtainReveal trigger="view" color="#ece8df" duration={1} delay={0.35} className="inline-block align-top md:ml-[8%]">
            <span className="block pb-[0.1em] pr-[0.06em]">
              <span className="hbl-ag-serif hbl-ag-red">something</span> loud
            </span>
          </CurtainReveal>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:items-end md:gap-0">
          <FadeInView className="min-w-0 md:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-[#ece8df]/85">
              Tell us what you are launching, when, and what scares you about it. We will send a fixed quote and a calendar within a week.
            </p>
            <div className="mt-10">
              <Magnetic strength={0.3} radius={160}>
                <a href="mailto:hello@atlasandoak.example" className="hbl-ag-mail">
                  hello@atlasandoak.example
                  <ArrowIcon size={20} />
                </a>
              </Magnetic>
            </div>
          </FadeInView>
          <div className="min-w-0 md:col-span-6 md:pl-12">
            <ul className="border-t hbl-ag-rule">
              {details.map((item, i) => (
                <li key={item.label}>
                  <FadeInView delay={0.1 + i * 0.08} className="grid grid-cols-[120px_1fr] gap-4 border-b hbl-ag-rule py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">{item.label}</p>
                    <div className="min-w-0">
                      <p className="font-grotesk font-medium">{item.value}</p>
                      <p className="mt-0.5 text-sm hbl-ag-muted">{item.sub}</p>
                    </div>
                  </FadeInView>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CursorTrail color="#ff4f2e" length={28} size={5} variant="ribbon" />
    </section>
  );
}

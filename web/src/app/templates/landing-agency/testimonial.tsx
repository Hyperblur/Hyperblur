import { SplitText } from "@/registry/hyperblur/split-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

export function AgencyTestimonial() {
  return (
    <section aria-labelledby="hbl-ag-quote-title" className="relative border-b hbl-ag-rule py-24 md:py-40">
      <div className="hbl-ag-wrap grid gap-10 md:grid-cols-12 md:gap-0">
        <div className="min-w-0 md:col-span-3">
          <h2 id="hbl-ag-quote-title" className="hbl-ag-kicker">Client words</h2>
          <p className="mt-8 font-serif text-[180px] leading-[0.6] text-[#ff4f2e]" aria-hidden="true">“</p>
        </div>
        <figure className="min-w-0 md:col-span-9">
          <blockquote className="font-serif text-[clamp(32px,4.6vw,64px)] leading-[1.08] tracking-[-0.02em]">
            <p className="sr-only">They gave a forty-year-old festival the nerve of a startup. Ticket sales rose 38% in the first season, and strangers still stop us to talk about the posters.</p>
            <SplitText
              aria-hidden="true"
              text="They gave a forty-year-old festival the nerve of a startup. Ticket sales rose 38% in the first season, and strangers still stop us to talk about the posters."
              by="words"
              stagger={0.035}
              distance={16}
            />
          </blockquote>
          <figcaption>
            <FadeInView delay={0.4} className="mt-12 flex flex-wrap items-center gap-5 border-t hbl-ag-rule pt-8">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#ece8df] font-grotesk text-lg font-bold text-[#0e0e0e]" aria-hidden="true">
                IS
              </span>
              <div>
                <p className="font-grotesk text-lg font-medium tracking-[-0.02em]">Ingrid Solberg</p>
                <p className="text-sm hbl-ag-muted">Director, Oslo Ceramics Biennale</p>
              </div>
              <p className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">Project 06 · 2026</p>
            </FadeInView>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

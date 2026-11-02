import { Beams } from "@/registry/hyperblur/beams";
import { SplitText } from "@/registry/hyperblur/split-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Icon, icons } from "./ui";

export function Cta() {
  return (
    <section id="cta" className="relative px-5 pb-28 pt-8 sm:px-8 sm:pb-36">
      <div className="hbl-ai-cta relative mx-auto max-w-[1200px] overflow-hidden px-6 py-24 text-center sm:px-12 sm:py-32">
        <Beams color="#8b5cf6" count={7} speed={0.6} angle={20} seed={4} className="opacity-70" />
        <div className="hbl-ai-cta-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-grotesk text-[clamp(2.2rem,5.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#f4f5fb]">
            <SplitText text="Give your back office its evenings back." by="words" stagger={0.06} distance={18} />
          </h2>
          <FadeInView delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#b4b8cc]">
              Start with one queue in read-only mode. Keep a person on every decision that matters. Switch on when the
              numbers convince you.
            </p>
          </FadeInView>
          <FadeInView delay={0.45} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#top" className="hbl-ai-btn hbl-ai-btn-primary">
              Start free trial
              <Icon d={icons.arrow} className="h-4 w-4" />
            </a>
            <a href="#top" className="hbl-ai-btn hbl-ai-btn-ghost">
              Book a 30-minute demo
            </a>
          </FadeInView>
          <p className="mt-6 text-[13px] text-[#8a8fa6]">300 free runs every month. No credit card.</p>
        </div>
      </div>
    </section>
  );
}

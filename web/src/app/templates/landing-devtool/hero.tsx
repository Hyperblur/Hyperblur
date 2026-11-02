import { DecodeText } from "@/registry/hyperblur/decode-text";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { GridFloor } from "@/registry/hyperblur/grid-floor";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Terminal } from "./terminal";
import { ArrowRight } from "./icons";

const glyphs = "01<>/{}[]#=+*$%ABCDEF";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="hbl-dv-lines hbl-dv-fade-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-260px] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(163,230,53,0.16),rgba(163,230,53,0))]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[340px] -z-10 h-[720px] opacity-70" aria-hidden="true">
        <GridFloor color="rgba(163,230,53,0.28)" cell={56} speed={0.6} horizon={0.06} />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <a
            href="#product"
            className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3.5 font-mono text-[12px] text-[#a3a39b] transition-colors hover:border-[#a3e635]/40 hover:text-[#f4f4f0]"
          >
            <span className="rounded-full bg-[#a3e635] px-2 py-0.5 text-[11px] font-semibold text-[#0b0b0c]">v3.2</span>
            <span className="truncate">Remote cache now ships on every plan</span>
            <ArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="hbl-dv-h1 mt-8 text-[#f4f4f0]">
            <span className="sr-only">Ship TypeScript in 9.4 seconds.</span>
            <span aria-hidden="true" className="block [--hb-decode-color:#a3e635]">
              <DecodeText text="Ship TypeScript" glyphs={glyphs} duration={0.9} stagger={0.035} />
            </span>
            <span aria-hidden="true" className="mt-2 block text-[#a3e635] [--hb-decode-color:#f4f4f0]">
              <DecodeText text="in 9.4 seconds." glyphs={glyphs} duration={1.3} stagger={0.045} />
            </span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[16px] leading-relaxed text-[#a3a39b] sm:text-[18px]">
            Forge builds, previews and deploys TypeScript monorepos from one command. A shared remote cache means your team never compiles the same file twice, and every release can be undone in under a second.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a href="#start" className="hbl-dv-btn hbl-dv-btn-acid w-full sm:w-auto">
              Start deploying free
              <ArrowRight />
            </a>
            <div className="flex h-11 w-full items-center gap-2 rounded-full border border-white/10 bg-[#111112] px-5 font-mono text-[13px] text-[#f4f4f0] sm:w-[270px]">
              <span className="text-[#a3e635]" aria-hidden="true">$</span>
              <span className="sr-only">Install with npm i -g @forge/cli</span>
              <Typewriter
                words={["npm i -g @forge/cli", "brew install forge", "pnpm add -g @forge/cli"]}
                typeSpeed={55}
                deleteSpeed={28}
                pause={1800}
                cursor="▍"
                className="min-w-0"
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="mt-5 font-mono text-[11.5px] text-[#6f6f69]">
            Free for 3 seats · No credit card · macOS, Linux, WSL
          </p>
        </div>

        <FadeInView className="relative mt-16 sm:mt-20" distance={40} duration={0.9} delay={0.15}>
          <div
            className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_10%,rgba(163,230,53,0.14),transparent)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1040px]">
            <Terminal />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

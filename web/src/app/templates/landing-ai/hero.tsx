import { Aurora } from "@/registry/hyperblur/aurora";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { ShinyText } from "@/registry/hyperblur/shiny-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Nav } from "./nav";
import { HeroMockup } from "./hero-mockup";
import { Icon, icons } from "./ui";

export function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Aurora colors={["#8b5cf6", "#22d3ee", "#6d28d9", "#0891b2"]} opacity={0.42} blur={110} speed={0.7} />
        <div className="hbl-ai-grid absolute inset-0" />
        <div className="hbl-ai-hero-fade absolute inset-x-0 bottom-0 h-64" />
      </div>
      <Nav />
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:pb-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <FadeInView direction="down" distance={12} duration={0.6}>
            <a href="#approvals" className="hbl-ai-badge hbl-ai-focus">
              <span className="hbl-ai-badge-chip">New</span>
              <ShinyText text="Approval policies for finance teams" color="#a9aec4" shine="#ffffff" speed={3.2} />
              <Icon d={icons.arrow} className="h-3.5 w-3.5 text-[#a9aec4]" />
            </a>
          </FadeInView>
          <h1 className="mt-8 font-grotesk text-[clamp(2.6rem,7.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#f4f5fb]">
            <BlurText text="The back office runs itself." trigger="mount" stagger={0.07} duration={0.8} />
            <br />
            <BlurText text="You just approve." trigger="mount" stagger={0.07} duration={0.8} className="hbl-ai-h1-second" />
          </h1>
          <FadeInView delay={0.5} distance={14} className="mt-7 max-w-2xl">
            <p className="text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-[#a3a8bd]">
              Cadence agents triage support tickets, match invoices to purchase orders and onboard new hires across the
              tools you already use. Anything that moves money or reaches a customer waits for a person to say yes.
            </p>
          </FadeInView>
          <FadeInView delay={0.65} distance={14} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#cta" className="hbl-ai-btn hbl-ai-btn-primary">
              Start free trial
              <Icon d={icons.arrow} className="h-4 w-4" />
            </a>
            <a href="#workflows" className="hbl-ai-btn hbl-ai-btn-ghost">
              <Icon d={icons.play} className="h-3.5 w-3.5 text-[#22d3ee]" />
              Watch a run
            </a>
          </FadeInView>
          <FadeInView delay={0.8} distance={10} className="mt-6">
            <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#7d8299]">
              <span className="inline-flex items-center gap-1.5">
                <Icon d={icons.shield} className="h-3.5 w-3.5" />
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon d={icons.globe} className="h-3.5 w-3.5" />
                US and EU data residency
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon d={icons.lock} className="h-3.5 w-3.5" />
                Never trains on your data
              </span>
            </p>
          </FadeInView>
        </div>
        <FadeInView delay={0.4} distance={40} duration={1} className="relative mx-auto mt-16 max-w-[1120px] sm:mt-20">
          <HeroMockup />
        </FadeInView>
      </div>
    </header>
  );
}

import { ShinyText } from "@/registry/hyperblur/shiny-text";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { ArrowRight } from "./icons";
import { HeroMockup } from "./hero-mockup";

export function Hero() {
  return (
    <section className="relative isolate px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:pb-32" aria-labelledby="hbl-pr-hero-title">
      <div className="hbl-pr-bgwrap" aria-hidden="true">
        <div className="hbl-pr-gridbg" />
        <div className="hbl-pr-blob hbl-pr-blob-a" />
        <div className="hbl-pr-blob hbl-pr-blob-b" />
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <a href="#automations" className="hbl-pr-pill">
          <span className="hbl-pr-badge">New</span>
          <ShinyText text="Automations 2.0 write your standups" color="#b9b9c4" shine="#ffffff" speed={2.6} />
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </a>
        <h1 id="hbl-pr-hero-title" className="hbl-pr-h1 hbl-pr-display mt-8 max-w-[960px]">
          <BlurText text="Plan the roadmap." trigger="mount" stagger={0.09} />{" "}
          <span className="hbl-pr-h1-late hbl-pr-h1-accent">
            <BlurText text="Ship the sprint." trigger="mount" stagger={0.09} />
          </span>
        </h1>
        <p className="hbl-pr-sub mx-auto max-w-[620px]">
          Tempo keeps roadmaps, sprints, specs and automations in one fast workspace, so product teams spend Monday
          building instead of chasing status updates.
        </p>
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a href="#start" className="hbl-pr-btn hbl-pr-btn-primary">
            Start for free
            <ArrowRight />
          </a>
          <a href="#features" className="hbl-pr-btn hbl-pr-btn-ghost">
            Take the 2-minute tour
          </a>
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[#8b8b96]">
          <li>Free for teams up to 10</li>
          <li>SOC 2 Type II</li>
          <li>Import a backlog in 4 minutes</li>
        </ul>
      </div>
      <div className="hbl-pr-enter mx-auto mt-16 max-w-[1200px] sm:mt-20">
        <HeroMockup />
      </div>
    </section>
  );
}

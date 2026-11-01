import type { ReactNode } from "react";
import { FlipCountdown } from "@/registry/hyperblur/flip-countdown";
import { SlideShow } from "@/registry/hyperblur/slide-show";
import { CurtainReveal } from "@/registry/hyperblur/curtain-reveal";
import { MorphTabs } from "@/registry/hyperblur/morph-tabs";
import { PageTransitionDemo } from "@/registry/demos/page-transition-demo";

const photo = (a: string, b: string, c: string) => (
  <div
    className="h-full w-full"
    style={{
      background: `radial-gradient(circle at 70% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0) 42%), linear-gradient(135deg, ${a}, ${b} 55%, ${c})`,
    }}
  />
);

export const transitionsDemos: Record<string, ReactNode> = {
  "flip-countdown": (
    <div className="w-full max-w-sm px-4">
      <FlipCountdown target="2026-12-31T00:00:00Z" size={34} />
    </div>
  ),
  "page-transition": <PageTransitionDemo />,
  "slide-show": (
    <div className="h-36 w-full max-w-xs">
      <SlideShow
        className="rounded-xl"
        autoplay={4500}
        slides={[
          { background: photo("#1b2a6b", "#2f5bd1", "#19c3f5"), title: "Northern light" },
          { background: photo("#5b1b6b", "#c02a8a", "#ff8a5c"), title: "Golden hour" },
          { background: photo("#0b3b34", "#127a5e", "#9be15d"), title: "Deep forest" },
        ]}
      />
    </div>
  ),
  "curtain-reveal": (
    <CurtainReveal
      trigger="hover"
      className="w-72 rounded-2xl"
      label={<span className="font-display text-sm font-bold uppercase tracking-[0.35em]">Reveal</span>}
    >
      <div className="flex h-32 items-center gap-4 border border-white/15 bg-white/5 p-4">
        <div className="h-24 w-24 shrink-0 rounded-xl bg-gradient-to-br from-[#1b2a6b] via-[#2f7bff] to-[#19c3f5] shadow-lg" />
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">New</p>
          <p className="font-display text-xl font-bold uppercase tracking-wide">Aero One</p>
          <p className="mt-1 text-sm text-white/70">$129</p>
        </div>
      </div>
    </CurtainReveal>
  ),
  "morph-tabs": (
    <div className="w-full max-w-xs">
      <MorphTabs
        tabs={[
          { id: "design", label: "Design", content: <p>Quiet surfaces and sharp type.</p> },
          {
            id: "code",
            label: "Code",
            content: <p>Copy one file into your project. No packages to install, no config to maintain.</p>,
          },
          {
            id: "ship",
            label: "Ship",
            content: (
              <p>The panel grows and shrinks to fit its content, so nothing below it jumps around when you switch tabs.</p>
            ),
          },
        ]}
      />
    </div>
  ),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { FooterRevealUnder } from "@/registry/hyperblur/footer-reveal-under";
import { ScrollImageReveal } from "@/registry/hyperblur/scroll-image-reveal";
import { CursorMagneticFilings } from "@/registry/hyperblur/cursor-magnetic-filings";
import { CursorTrailVelocity } from "@/registry/hyperblur/cursor-trail-velocity";
import { HeroStaggerIntroDemo } from "@/registry/demos/hero-stagger-intro-demo";
import { ChartLineGraphDemo } from "@/registry/demos/chart-line-graph-demo";

export const rbDemos: Record<string, ReactNode> = {
  "footer-reveal-under": thumb(<FooterRevealUnder showBackdrop />, { scale: 0.34, width: 960, y: 0 }),
  "scroll-image-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[340px]">
        <ScrollImageReveal
          loop
          aspect="2 / 1"
          eyebrow="Plate 07 / Dawn"
          caption="Salt flats before the heat"
          detail="Uyuni, Bolivia. 05:42, before sunrise."
          duration={1300}
          loopHold={2200}
          radius={16}
        />
      </div>
    </div>
  ),
  "cursor-magnetic-filings": (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0c10]">
      <CursorMagneticFilings color="#7fb3ff" strength={1.05}>
        <div className="absolute left-4 top-3.5 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#7fb3ff] shadow-[0_0_8px_#7fb3ff]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">Dipole 0.8 T</span>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col gap-0.5">
          <span className="font-serif text-3xl italic leading-8 text-white/90">Field lines</span>
          <span className="text-[11px] text-white/45">drag the magnet with your cursor</span>
        </div>
      </CursorMagneticFilings>
    </div>
  ),
  "cursor-trail-velocity": (
    <div className="absolute inset-0 overflow-hidden bg-[#09090d]">
      <CursorTrailVelocity slowHue={200} fastHue={330} size={5}>
        <div className="absolute left-4 top-3.5 flex flex-col gap-0.5">
          <span className="font-grotesk text-xl font-semibold leading-6 tracking-tight text-white/90">Move slow, then fast</span>
          <span className="text-[11px] text-white/45">dots turn into streaks as you speed up</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Slow</span>
          <span className="h-1 flex-1 rounded-full bg-[linear-gradient(90deg,hsl(200,100%,64%),hsl(265,100%,66%),hsl(330,100%,64%))]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Fast</span>
        </div>
      </CursorTrailVelocity>
    </div>
  ),
  "chart-line-graph": <ChartLineGraphDemo />,
  "hero-stagger-intro": <HeroStaggerIntroDemo />,
};

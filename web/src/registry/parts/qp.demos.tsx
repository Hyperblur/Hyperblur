import type { CSSProperties, ReactNode } from "react";
import { BgFerrofluid } from "@/registry/hyperblur/bg-ferrofluid";
import { BgSoftAurora } from "@/registry/hyperblur/bg-soft-aurora";
import { BgRuneRings } from "@/registry/hyperblur/bg-rune-rings";
import { BgGridScan } from "@/registry/hyperblur/bg-grid-scan";
import { BgColorBends } from "@/registry/hyperblur/bg-color-bends";
import { BgPrismBurst } from "@/registry/hyperblur/bg-prism-burst";
import { BgFaultyTerminal } from "@/registry/hyperblur/bg-faulty-terminal";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

export const qpDemos: Record<string, ReactNode> = {
  "bg-ferrofluid": (
    <Scene style={{ background: "#060709" }}>
      <BgFerrofluid size={0.9}>
        <div className="pointer-events-none flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wide text-white/70">Ferro Audio</span>
            <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">Pre-order</span>
          </div>
          <div>
            <p className="m-0 font-serif text-[30px] italic leading-none text-white">Sound you can see</p>
            <span className="mt-1 block text-[11px] text-white/55">A speaker filled with living metal. Ships in March.</span>
          </div>
        </div>
      </BgFerrofluid>
    </Scene>
  ),
  "bg-soft-aurora": (
    <Scene style={{ background: "#07080d" }}>
      <BgSoftAurora motes={34}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="text-[11px] font-medium text-white/60">Evening session · 6 min</span>
          <p className="m-0 text-[24px] font-semibold leading-tight tracking-tight text-white">Breathe in for four</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1 w-8 rounded-full bg-white/85" />
            <span className="h-1 w-8 rounded-full bg-white/25" />
            <span className="h-1 w-8 rounded-full bg-white/25" />
            <span className="h-1 w-8 rounded-full bg-white/25" />
          </div>
        </div>
      </BgSoftAurora>
    </Scene>
  ),
  "bg-rune-rings": (
    <Scene style={{ background: "#05060a" }}>
      <BgRuneRings rings={5}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-1.5 px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a9c8ff]/80">Season 02 · The Sigil</span>
          <p className="m-0 font-display text-[28px] font-bold uppercase leading-none tracking-[0.05em] text-white">Arcane Gate</p>
          <span className="text-[11px] text-white/60">Unlocks for all players on November 14</span>
        </div>
      </BgRuneRings>
    </Scene>
  ),
  "bg-grid-scan": (
    <Scene style={{ background: "#08090c" }}>
      <BgGridScan cellSize={24} />
      <div className="pointer-events-none absolute bottom-4 left-4 w-[210px] rounded-xl border border-white/10 bg-black/75 px-3.5 py-3 font-mono backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span>perimeter scan</span>
          <span className="text-[#7fb3ff]">live</span>
        </div>
        <div className="mt-1 text-[18px] text-white">2,048 hosts</div>
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <span className="text-white/55">anomalies</span>
          <span className="text-[#ff8a8a]">3 flagged</span>
        </div>
      </div>
    </Scene>
  ),
  "bg-color-bends": (
    <Scene style={{ background: "#07070a" }}>
      <BgColorBends bands={6}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-1.5 px-6 text-center">
          <span className="rounded-full bg-black/55 px-2.5 py-0.5 font-grotesk text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">Berlin · May 12 to 14</span>
          <p className="m-0 font-grotesk text-[32px] font-bold leading-none tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">Chromatic 27</p>
          <span className="font-grotesk text-[12px] text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">The color and motion design conference</span>
        </div>
      </BgColorBends>
    </Scene>
  ),
  "bg-prism-burst": (
    <Scene style={{ background: "#050508" }}>
      <BgPrismBurst rays={20} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">
        <div>
          <p className="m-0 text-[20px] font-semibold leading-tight tracking-tight text-white">Spectrum 4 is here</p>
          <span className="text-[11px] text-white/60">Wide gamut color, now on every display.</span>
        </div>
        <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black">See what&apos;s new</span>
      </div>
    </Scene>
  ),
  "bg-faulty-terminal": (
    <Scene style={{ background: "#020604" }}>
      <BgFaultyTerminal fontSize={11} radius={70}>
        <div className="pointer-events-none flex h-full items-center justify-center px-4">
          <div className="w-[230px] rounded-lg border border-[#33ff88]/30 bg-black/80 px-3.5 py-3 font-mono backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[10px] text-[#ff5c7a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c7a]" />
              uplink unstable
            </div>
            <div className="mt-1 text-[16px] text-[#d8ffe6]">Rerouting via relay-07</div>
            <div className="mt-1 text-[10px] text-[#33ff88]/70">packet loss 14% · retry in 00:09</div>
          </div>
        </div>
      </BgFaultyTerminal>
    </Scene>
  ),
};

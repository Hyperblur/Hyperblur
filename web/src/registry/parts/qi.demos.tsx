import type { ReactNode } from "react";
import { CursorTarget } from "@/registry/hyperblur/cursor-target";
import { CursorGhost } from "@/registry/hyperblur/cursor-ghost";
import { CursorSwarm } from "@/registry/hyperblur/cursor-swarm";
import { CursorFluidSplash } from "@/registry/hyperblur/cursor-fluid-splash";
import { CursorRibbons } from "@/registry/hyperblur/cursor-ribbons";
import { CursorMetaballs } from "@/registry/hyperblur/cursor-metaballs";
import { CursorPixelTrail } from "@/registry/hyperblur/cursor-pixel-trail";
import { CursorImageTrail } from "@/registry/hyperblur/cursor-image-trail";
import { CursorCrosshair } from "@/registry/hyperblur/cursor-crosshair";
import { CursorGlareGrid } from "@/registry/hyperblur/cursor-glare-grid";

const stage = "relative h-full w-full text-[#ededed]";

export const qiDemos: Record<string, ReactNode> = {
  "cursor-target": (
    <div className={stage}>
      <CursorTarget className="bg-[#0a0a0a]">
        <div className="flex h-full w-full items-center justify-center px-4">
          <div className="font-grotesk box-border w-full max-w-[300px] rounded-2xl border border-[#262626] bg-[#111111] p-4">
            <div className="flex items-center justify-between">
              <p className="m-0 text-[11px] uppercase tracking-[0.12em] text-[#8f8f8f]">Release 4.2</p>
              <span className="flex items-center gap-1.5 text-[11px] text-[#5fd39a]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5fd39a]" />
                Checks passed
              </span>
            </div>
            <p className="m-0 mt-1 text-lg font-semibold leading-6">Ready to ship to production</p>
            <div className="mt-3 flex items-center gap-2">
              <button type="button" className="rounded-lg border border-[#262626] bg-[#171717] px-3 py-1.5 text-xs text-[#ededed]">
                Preview
              </button>
              <button type="button" className="rounded-lg border border-[#262626] bg-[#171717] px-3 py-1.5 text-xs text-[#ededed]">
                Run checks
              </button>
              <button type="button" className="rounded-lg bg-[#ededed] px-3 py-1.5 text-xs font-semibold text-[#0a0a0a]">
                Deploy
              </button>
            </div>
          </div>
        </div>
      </CursorTarget>
    </div>
  ),
  "cursor-ghost": (
    <div className={stage}>
      <CursorGhost
        className="bg-[#0b0d16]"
        style={{ background: "radial-gradient(70% 90% at 50% 0%, #1a1f36 0%, #0b0d16 70%)" }}
      >
        <div className="flex h-full w-full flex-col items-start justify-end px-6 pb-6">
          <p className="font-mono m-0 text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Chapter 3 · 12 min read</p>
          <p className="font-sans m-0 mt-1 text-[28px] leading-8 text-white">The house on Alder Lane</p>
          <p className="font-sans m-0 mt-1 max-w-[300px] text-[14px] leading-5 text-[#a1a1a1]">
            Nobody had lived there since the winter of 1988, yet the porch light came on every night at nine.
          </p>
        </div>
      </CursorGhost>
    </div>
  ),
  "cursor-swarm": (
    <div className={stage}>
      <CursorSwarm className="bg-[#0a0c12]" color="#9cc4ff" count={40}>
        <div className="font-grotesk flex h-full w-full flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-[#ededed]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5d5d]" />
              Live
            </span>
            <span className="text-[11px] text-[#8f8f8f]">18:42 · Brighton Pier</span>
          </div>
          <div>
            <p className="m-0 text-lg font-semibold leading-6">Starling murmuration</p>
            <div className="mt-1 flex gap-4 text-[11px] text-[#a1a1a1]">
              <span>41,200 birds</span>
              <span>Wind 6 km/h NW</span>
              <span>Sunset 18:51</span>
            </div>
          </div>
        </div>
      </CursorSwarm>
    </div>
  ),
  "cursor-fluid-splash": (
    <div className={stage}>
      <CursorFluidSplash className="bg-[#08080a]" size={24}>
        <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <p className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">Splash Studio</p>
          <p className="m-0 mt-1 text-[30px] font-semibold leading-9 tracking-tight text-white">Paint with motion</p>
          <p className="m-0 mt-1 text-[13px] text-white/60">Move to mix color. Stop to let it settle.</p>
          <span className="mt-3 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#0a0a0a]">Open canvas</span>
        </div>
      </CursorFluidSplash>
    </div>
  ),
  "cursor-ribbons": (
    <div className={stage}>
      <CursorRibbons className="bg-[#09090d]" colors={["#ff5fa2", "#ffb86b", "#7fb3ff", "#b18cff"]}>
        <div className="flex h-full w-full items-end px-5 pb-5">
          <div className="box-border w-full max-w-[320px] rounded-2xl border border-white/10 bg-black/45 p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span
                className="h-11 w-11 shrink-0 rounded-lg"
                style={{ background: "linear-gradient(135deg, #ff5fa2 0%, #ffb86b 55%, #7fb3ff 100%)" }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-sans m-0 truncate text-[20px] leading-6 text-white">Velvet Hours</p>
                <p className="m-0 truncate text-[11px] text-[#a1a1a1]">Mira Sol · Low Tide Sessions</p>
              </div>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[43%] rounded-full bg-white" />
            </div>
            <div className="font-mono mt-1.5 flex justify-between text-[10px] text-[#8f8f8f]">
              <span>1:42</span>
              <span>3:58</span>
            </div>
          </div>
        </div>
      </CursorRibbons>
    </div>
  ),
  "cursor-metaballs": (
    <div className={stage}>
      <CursorMetaballs className="bg-[#0a0a0a]" color="#2f7bff" color2="#c084fc" size={30}>
        <div className="flex h-full w-full items-center justify-between px-5">
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Voice memo</p>
            <p className="m-0 mt-1 text-[17px] font-semibold leading-6">Morning standup</p>
            <p className="font-mono m-0 mt-0.5 text-[24px] leading-8 text-white">00:42</p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-[#ff4d4d]" />
            Recording
          </span>
        </div>
      </CursorMetaballs>
    </div>
  ),
  "cursor-pixel-trail": (
    <div className={stage}>
      <CursorPixelTrail className="bg-[#07070c]" color="#22d3a6" cell={13} steps={7}>
        <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <p className="font-display m-0 text-[30px] font-bold uppercase leading-8 tracking-[0.06em] text-white">Pixel Drift</p>
          <p className="font-mono m-0 mt-1.5 text-[11px] text-[#a1a1a1]">Level 03 · Neon Harbor</p>
          <span className="font-mono mt-3 rounded border border-[#22d3a6]/50 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#22d3a6]">
            Press start
          </span>
        </div>
      </CursorPixelTrail>
    </div>
  ),
  "cursor-image-trail": (
    <div className={stage}>
      <CursorImageTrail className="bg-[#0d0c0b]" size={50} spacing={40}>
        <div className="flex h-full w-full flex-col items-start justify-end px-5 pb-5">
          <p className="font-sans m-0 text-[34px] leading-9 text-[#f3ede4]">Field Notes</p>
          <div className="mt-1 flex gap-3 text-[11px] text-[#a1a1a1]">
            <span>Iceland, spring 2026</span>
            <span>142 frames</span>
            <span>35mm</span>
          </div>
        </div>
      </CursorImageTrail>
    </div>
  ),
  "cursor-crosshair": (
    <div className={stage}>
      <CursorCrosshair className="bg-[#0b0b0d]" snap={16}>
        <div className="font-mono flex h-full w-full items-center justify-center px-4">
          <div className="relative h-[112px] w-[220px] rounded-sm border border-[#2f7bff]/60 bg-[#111114]">
            <span className="absolute -top-5 left-0 text-[10px] text-[#7fb3ff]">Frame 12 · 1440 × 900</span>
            <div className="absolute left-4 top-4 h-3 w-24 rounded-sm bg-[#262626]" />
            <div className="absolute left-4 top-9 h-2 w-36 rounded-sm bg-[#1d1d1f]" />
            <div className="absolute left-4 top-[52px] h-2 w-28 rounded-sm bg-[#1d1d1f]" />
            <div className="absolute bottom-4 left-4 h-6 w-16 rounded bg-[#2f7bff]/80" />
            <span className="absolute bottom-[-18px] right-0 text-[10px] text-[#8f8f8f]">Hero / Title</span>
          </div>
        </div>
      </CursorCrosshair>
    </div>
  ),
  "cursor-glare-grid": (
    <div className={stage}>
      <CursorGlareGrid className="bg-[#0a0a0a]" accent="#7fb3ff" spacing={17}>
        <div className="flex h-full w-full items-end justify-start p-4">
          <div className="rounded-xl border border-white/10 bg-black/70 px-3.5 py-2.5 backdrop-blur-sm">
            <p className="m-0 text-[11px] uppercase tracking-[0.12em] text-[#8f8f8f]">Wind field · North Sea</p>
            <p className="m-0 mt-0.5 text-[18px] font-semibold leading-6">
              14 kn <span className="text-[#7fb3ff]">NW</span>
              <span className="ml-2 text-[12px] font-normal text-[#a1a1a1]">gusts 22 kn</span>
            </p>
          </div>
        </div>
      </CursorGlareGrid>
    </div>
  ),
};

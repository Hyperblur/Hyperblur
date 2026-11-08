import type { CSSProperties, ReactNode } from "react";
import { BgMetaballs } from "@/registry/hyperblur/bg-metaballs";
import { BgFlowField } from "@/registry/hyperblur/bg-flow-field";
import { BgVoronoi } from "@/registry/hyperblur/bg-voronoi";
import { BgDotSwell } from "@/registry/hyperblur/bg-dot-swell";
import { BgGlyphRain } from "@/registry/hyperblur/bg-glyph-rain";
import { BgCircuit } from "@/registry/hyperblur/bg-circuit";
import { BgLiquidChrome } from "@/registry/hyperblur/bg-liquid-chrome";
import { BgCloth } from "@/registry/hyperblur/bg-cloth";
import { BgCrystalFacets } from "@/registry/hyperblur/bg-crystal-facets";
import { BgLightning } from "@/registry/hyperblur/bg-lightning";
import { BgFireflies } from "@/registry/hyperblur/bg-fireflies";
import { BgVortex } from "@/registry/hyperblur/bg-vortex";
import { BgHexPulse } from "@/registry/hyperblur/bg-hex-pulse";
import { BgRadar } from "@/registry/hyperblur/bg-radar";
import { BgHelixThreads } from "@/registry/hyperblur/bg-helix-threads";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

const solid = "pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium text-black shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_6px_18px_rgba(0,0,0,0.35)]";
const ghost = "pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm";

function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const veDemos: Record<string, ReactNode> = {
  "bg-metaballs": (
    <Scene style={{ background: "#07080c" }}>
      <BgMetaballs count={6}>
        <div className="pointer-events-none flex h-full flex-col items-start justify-end gap-2 p-5">
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-0.5 text-[10px] text-white/75 backdrop-blur-sm">Blend 3.0 · Beta</span>
          <p className="m-0 font-grotesk text-[26px] font-semibold leading-[1.02] tracking-tight text-white">Ideas that merge<br />on their own</p>
          <span className={solid}>Open a canvas <Arrow /></span>
        </div>
      </BgMetaballs>
    </Scene>
  ),
  "bg-flow-field": (
    <Scene style={{ background: "#06070b" }}>
      <BgFlowField density={0.9}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-1.5 px-6 text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8ff3dc]/80">Windline API</span>
          <p className="m-0 text-[22px] font-semibold leading-tight tracking-tight text-white">Live wind from 4,200 stations</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className={solid}>Get an API key</span>
            <span className={ghost}>Docs</span>
          </div>
        </div>
      </BgFlowField>
    </Scene>
  ),
  "bg-voronoi": (
    <Scene style={{ background: "#05060a" }}>
      <BgVoronoi cells={18}>
        <div className="pointer-events-none flex h-full flex-col justify-between p-4">
          <span className="w-fit rounded-md border border-white/10 bg-black/55 px-2 py-0.5 font-mono text-[10px] text-[#9cc2ff] backdrop-blur-sm">cellstore · 64 shards healthy</span>
          <div className="flex items-end justify-between gap-3">
            <p className="m-0 text-[24px] font-semibold leading-[1.05] tracking-tight text-white">Sharded<br />by default</p>
            <span className={solid}>Read the docs</span>
          </div>
        </div>
      </BgVoronoi>
    </Scene>
  ),
  "bg-dot-swell": (
    <Scene style={{ background: "#05060a" }}>
      <BgDotSwell rows={34}>
        <div className="pointer-events-none flex h-full flex-col items-center gap-1.5 px-6 pt-6 text-center">
          <p className="m-0 font-grotesk text-[24px] font-medium leading-tight tracking-tight text-white">Sound that moves with you</p>
          <span className="text-[11px] text-white/55">Tidewave Buds · adaptive spatial audio</span>
          <span className={`${solid} mt-1`}>Listen to a sample</span>
        </div>
      </BgDotSwell>
    </Scene>
  ),
  "bg-glyph-rain": (
    <Scene style={{ background: "#04060b" }}>
      <BgGlyphRain variant="hex" fontSize={13}>
        <div className="pointer-events-none flex h-full items-center justify-center px-6">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#04060b]/75 px-5 py-4 text-center backdrop-blur-md">
            <span className="font-mono text-[10px] text-[#7fb3ff]">$ sentinel scan --all</span>
            <p className="m-0 font-mono text-[18px] font-medium tracking-tight text-white">0 threats in 2.1M events</p>
            <span className={solid}>Run a full scan</span>
          </div>
        </div>
      </BgGlyphRain>
    </Scene>
  ),
  "bg-circuit": (
    <Scene style={{ background: "#05070b" }}>
      <BgCircuit pitch={20}>
        <div className="pointer-events-none flex h-full flex-col items-start justify-center gap-2 px-6">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#7fb3ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff] shadow-[0_0_8px_#2f7bff]" />
            38 regions online
          </span>
          <p className="m-0 max-w-[230px] text-[23px] font-semibold leading-[1.08] tracking-tight text-white">Compute that runs where your users are</p>
          <div className="flex items-center gap-2">
            <span className={solid}>Deploy now</span>
            <span className={ghost}>Pricing</span>
          </div>
        </div>
      </BgCircuit>
    </Scene>
  ),
  "bg-liquid-chrome": (
    <Scene>
      <BgLiquidChrome>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">Limited run of 500</span>
          <p className="m-0 font-display text-[32px] font-bold uppercase leading-none tracking-[0.04em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">Mercury 02</p>
          <span className="pointer-events-auto rounded-full bg-black px-3.5 py-1.5 text-[11px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)]">Reserve yours · $349</span>
        </div>
      </BgLiquidChrome>
    </Scene>
  ),
  "bg-cloth": (
    <Scene style={{ background: "#05060a" }}>
      <BgCloth>
        <div className="pointer-events-none flex h-full flex-col justify-end gap-1.5 bg-gradient-to-t from-black/60 via-transparent to-transparent p-5">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">Atelier Nine · AW26</span>
          <div className="flex items-end justify-between gap-3">
            <p className="m-0 font-grotesk text-[24px] font-medium leading-[1.05] tracking-tight text-white">The silk<br />collection</p>
            <span className={solid}>Shop the drop</span>
          </div>
        </div>
      </BgCloth>
    </Scene>
  ),
  "bg-crystal-facets": (
    <Scene style={{ background: "#05060a" }}>
      <BgCrystalFacets facet={64}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="m-0 text-[25px] font-semibold leading-tight tracking-tight text-white">Your keys, cut in glass</p>
          <span className="text-[11px] text-white/60">Facet Vault · hardware wallet with a sapphire display</span>
          <span className={`${solid} mt-0.5`}>See the vault <Arrow /></span>
        </div>
      </BgCrystalFacets>
    </Scene>
  ),
  "bg-lightning": (
    <Scene style={{ background: "#05070d" }}>
      <BgLightning interval={2.4}>
        <div className="pointer-events-none flex h-full flex-col justify-between p-4">
          <span className="flex w-fit items-center gap-1.5 rounded-full border border-[#ffcc66]/30 bg-black/50 px-2.5 py-0.5 text-[10px] text-[#ffd98a] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffcc66]" />
            Severe storm · 12 km northeast
          </span>
          <div>
            <p className="m-0 text-[24px] font-semibold leading-[1.05] tracking-tight text-white">Storm alerts,<br />minutes earlier</p>
            <span className={`${solid} mt-2`}>Turn on alerts</span>
          </div>
        </div>
      </BgLightning>
    </Scene>
  ),
  "bg-fireflies": (
    <Scene style={{ background: "#060912" }}>
      <BgFireflies count={40}>
        <div className="pointer-events-none flex h-full flex-col items-center gap-1.5 px-6 pt-7 text-center">
          <span className="text-[10px] font-medium text-[#ffd98a]/80">Lake Ardent · 14 sites left in July</span>
          <p className="m-0 font-grotesk text-[25px] font-medium leading-tight tracking-tight text-white">Summer nights, booked</p>
          <span className={`${solid} mt-1`}>Find a campsite</span>
        </div>
      </BgFireflies>
    </Scene>
  ),
  "bg-vortex": (
    <Scene style={{ background: "#040409" }}>
      <BgVortex>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="font-mono text-[10px] text-[#9cc2ff]/80">Keynote · Nov 18 · 9:00 PT</span>
          <p className="m-0 text-[27px] font-semibold leading-none tracking-tight text-white">Warp 4.0</p>
          <div className="flex items-center gap-2">
            <span className={solid}>Set a reminder</span>
            <span className={ghost}>Watch the teaser</span>
          </div>
        </div>
      </BgVortex>
    </Scene>
  ),
  "bg-hex-pulse": (
    <Scene style={{ background: "#05070b" }}>
      <BgHexPulse radius={15} interval={1.4}>
        <div className="pointer-events-none flex h-full items-center justify-center px-6">
          <div className="flex w-[250px] flex-col gap-2 rounded-xl border border-white/10 bg-[#070a10]/80 p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/85">Mesh network</span>
              <span className="flex items-center gap-1 text-[10px] text-[#7fb3ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff]" />
                Healthy
              </span>
            </div>
            <p className="m-0 font-grotesk text-[22px] font-medium leading-none tracking-tight text-white">1,284 nodes online</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/45">p95 latency 18 ms</span>
              <span className={solid}>Open console</span>
            </div>
          </div>
        </div>
      </BgHexPulse>
    </Scene>
  ),
  "bg-radar": (
    <Scene style={{ background: "#030806" }}>
      <BgRadar origin={[0.72, 0.56]} targets={10}>
        <div className="pointer-events-none flex h-full flex-col justify-center gap-2 px-5">
          <span className="font-mono text-[10px] text-[#7dffc6]/80">HARBOR CONTROL · LIVE</span>
          <p className="m-0 max-w-[170px] text-[22px] font-semibold leading-[1.08] tracking-tight text-white">18 vessels in range</p>
          <span className={`${solid} w-fit`}>Open fleet map</span>
        </div>
      </BgRadar>
    </Scene>
  ),
  "bg-helix-threads": (
    <Scene style={{ background: "#05060b" }}>
      <BgHelixThreads threads={3}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="m-0 font-grotesk text-[24px] font-medium leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgba(5,6,11,0.9)]">Your genome, read in 48 hours</p>
          <span className="text-[11px] text-white/60">Clinical-grade sequencing from a single sample</span>
          <span className={`${solid} mt-0.5`}>Order a kit · $299</span>
        </div>
      </BgHelixThreads>
    </Scene>
  ),
};

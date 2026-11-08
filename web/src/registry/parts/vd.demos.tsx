import type { CSSProperties, ReactNode } from "react";
import { BgPolarVeil } from "@/registry/hyperblur/bg-polar-veil";
import { BgFlowPaths } from "@/registry/hyperblur/bg-flow-paths";
import { BgContourLines } from "@/registry/hyperblur/bg-contour-lines";
import { BgWarpStars } from "@/registry/hyperblur/bg-warp-stars";
import { BgMeshLattice } from "@/registry/hyperblur/bg-mesh-lattice";
import { BgGrainGradient } from "@/registry/hyperblur/bg-grain-gradient";
import { BgGridBeams } from "@/registry/hyperblur/bg-grid-beams";
import { BgBeaconRings } from "@/registry/hyperblur/bg-beacon-rings";
import { BgWaveLines } from "@/registry/hyperblur/bg-wave-lines";
import { BgBokeh } from "@/registry/hyperblur/bg-bokeh";
import { BgSpotlightGrid } from "@/registry/hyperblur/bg-spotlight-grid";
import { BgGlowOrbs } from "@/registry/hyperblur/bg-glow-orbs";
import { BgHorizonRise } from "@/registry/hyperblur/bg-horizon-rise";
import { BgSoftClouds } from "@/registry/hyperblur/bg-soft-clouds";
import { BgHalftone } from "@/registry/hyperblur/bg-halftone";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

const solid = "rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium text-black shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_6px_18px_-6px_rgba(0,0,0,0.6)]";
const ghost = "rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm";

export const vdDemos: Record<string, ReactNode> = {
  "bg-polar-veil": (
    <Scene style={{ background: "#04060b" }}>
      <BgPolarVeil stars={40}>
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-6 pb-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#9ff5d6]/80">TROMSØ · 69.6° N · KP 6</span>
          <p className="m-0 font-grotesk text-[26px] font-semibold leading-none tracking-tight text-white">Chase the lights</p>
          <span className="text-[11px] text-white/60">Clear skies after 22:00. Small groups, warm suits included.</span>
          <button type="button" className={`${solid} mt-1.5`}>Book a night tour</button>
        </div>
      </BgPolarVeil>
    </Scene>
  ),
  "bg-flow-paths": (
    <Scene style={{ background: "#05070c" }}>
      <BgFlowPaths count={30}>
        <div className="flex h-full flex-col justify-center gap-2 px-6">
          <span className="w-fit rounded-full border border-[#7fb3ff]/30 bg-[#2f7bff]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#a9caff]">Streams 2.0</span>
          <p className="m-0 max-w-[230px] text-[24px] font-semibold leading-[1.08] tracking-tight text-white">Every event, one pipeline</p>
          <div className="mt-1 flex gap-2">
            <button type="button" className={solid}>Start free</button>
            <button type="button" className={ghost}>Read the docs</button>
          </div>
        </div>
      </BgFlowPaths>
    </Scene>
  ),
  "bg-contour-lines": (
    <Scene style={{ background: "#070a10" }}>
      <BgContourLines peaks={2} lines={12}>
        <div className="flex h-full items-end p-3.5">
          <div className="w-[200px] rounded-xl border border-white/10 bg-black/70 px-3.5 py-3 backdrop-blur-md">
            <div className="font-grotesk text-[14px] font-semibold text-white">Kestrel Ridge Loop</div>
            <div className="mt-0.5 flex gap-3 font-mono text-[10px] text-white/55">
              <span><span className="text-white">11.4</span> km</span>
              <span><span className="text-[#7fb3ff]">+860</span> m</span>
              <span>4h 20m</span>
            </div>
            <button type="button" className="mt-2.5 w-full rounded-lg bg-[#2f7bff] py-1.5 text-[11px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]">Download GPX</button>
          </div>
        </div>
      </BgContourLines>
    </Scene>
  ),
  "bg-warp-stars": (
    <Scene style={{ background: "#020308" }}>
      <BgWarpStars stars={360}>
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#a9caff]/80">DAY 1 OF 5 · EDGE FUNCTIONS</span>
          <p className="m-0 font-display text-[30px] font-bold uppercase leading-none tracking-[0.06em] text-white">Launch Week</p>
          <button type="button" className={`${ghost} mt-2`}>Watch the keynote</button>
        </div>
      </BgWarpStars>
    </Scene>
  ),
  "bg-mesh-lattice": (
    <Scene style={{ background: "#06070d" }}>
      <BgMeshLattice>
        <div className="flex h-full flex-col justify-between p-3.5">
          <div className="flex items-center justify-between">
            <span className="rounded-md border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur-sm">hero-mesh.grad</span>
            <span className="font-mono text-[10px] text-white/50">12 points</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="m-0 font-grotesk text-[24px] font-semibold leading-[1.05] tracking-tight text-white">
              Color that
              <br />
              moves with you
            </p>
            <button type="button" className={solid}>Export CSS</button>
          </div>
        </div>
      </BgMeshLattice>
    </Scene>
  ),
  "bg-grain-gradient": (
    <Scene style={{ background: "#0b0a10" }}>
      <BgGrainGradient>
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-white/75">
            <span>ISSUE 12</span>
            <span>WINTER 2026</span>
          </div>
          <div>
            <p className="m-0 font-grotesk text-[34px] font-bold leading-[0.95] tracking-[-0.02em] text-white">Slow mornings</p>
            <div className="mt-2 flex items-center gap-2.5">
              <button type="button" className={solid}>Subscribe · $8/mo</button>
              <span className="text-[10px] text-white/70">Printed in Lisbon</span>
            </div>
          </div>
        </div>
      </BgGrainGradient>
    </Scene>
  ),
  "bg-grid-beams": (
    <Scene style={{ background: "#050608" }}>
      <BgGridBeams cell={30} beams={12}>
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">
            <span className="text-[#7fb3ff]">New</span> · v3.2 is live
          </span>
          <p className="m-0 text-[25px] font-semibold leading-[1.05] tracking-tight text-white">Deploy on every push</p>
          <div className="mt-1 flex gap-2">
            <button type="button" className={solid}>Get started</button>
            <button type="button" className={ghost}>Talk to sales</button>
          </div>
        </div>
      </BgGridBeams>
    </Scene>
  ),
  "bg-beacon-rings": (
    <Scene style={{ background: "#04060b" }}>
      <BgBeaconRings y={34}>
        <div className="flex h-full flex-col items-center justify-end gap-1.5 px-6 pb-4 text-center">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5d5d] shadow-[0_0_8px_#ff5d5d]" />
            Live · 1,284 listening
          </span>
          <p className="m-0 font-grotesk text-[22px] font-semibold leading-none tracking-tight text-white">Late Night Radio</p>
          <button type="button" className={`${solid} mt-1`}>Tune in</button>
        </div>
      </BgBeaconRings>
    </Scene>
  ),
  "bg-wave-lines": (
    <Scene style={{ background: "#060608" }}>
      <BgWaveLines horizon={0.42} lines={34}>
        <div className="flex h-full flex-col items-center gap-1 px-6 pt-5 text-center">
          <span className="text-[10px] font-medium tracking-[0.16em] text-white/55">HALCYON AUDIO</span>
          <p className="m-0 text-[22px] font-semibold leading-tight tracking-tight text-white">Sound, shaped by you</p>
          <button type="button" className={`${solid} mt-1.5`}>Pre-order · $349</button>
        </div>
      </BgWaveLines>
    </Scene>
  ),
  "bg-bokeh": (
    <Scene style={{ background: "#07060a" }}>
      <BgBokeh count={34}>
        <div className="flex h-full flex-col justify-end gap-1 p-4">
          <span className="text-[10px] font-medium text-[#ffd59e]/85">Dec 12 to 22 · Pier 39</span>
          <p className="m-0 text-[28px] font-semibold leading-none tracking-tight text-white">Winter Market</p>
          <div className="mt-2 flex items-center gap-2">
            <button type="button" className={solid}>Get tickets</button>
            <span className="text-[10px] text-white/60">From $12</span>
          </div>
        </div>
      </BgBokeh>
    </Scene>
  ),
  "bg-spotlight-grid": (
    <Scene style={{ background: "#060607" }}>
      <BgSpotlightGrid cell={28} radius={150}>
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="font-mono text-[10px] text-white/45">move your cursor</span>
          <p className="m-0 max-w-[250px] font-grotesk text-[23px] font-semibold leading-[1.08] tracking-tight text-white">Find the signal in the noise</p>
          <button type="button" className={`${solid} mt-1`}>Request access</button>
        </div>
      </BgSpotlightGrid>
    </Scene>
  ),
  "bg-glow-orbs": (
    <Scene style={{ background: "#050509" }}>
      <BgGlowOrbs size={0.85}>
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-tight text-white">Orbit Studio</span>
            <button type="button" className={ghost}>Join the beta</button>
          </div>
          <p className="m-0 text-[13px] font-medium text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">Spatial audio for every room</p>
        </div>
      </BgGlowOrbs>
    </Scene>
  ),
  "bg-horizon-rise": (
    <Scene style={{ background: "#03040a" }}>
      <BgHorizonRise horizon={76} stars={50}>
        <div className="flex h-full flex-col items-center gap-1.5 px-6 pt-6 text-center">
          <span className="text-[10px] font-medium text-white/55">Northstar Analytics</span>
          <p className="m-0 font-grotesk text-[24px] font-semibold leading-[1.05] tracking-tight text-white">A new day for your data</p>
          <button type="button" className={`${solid} mt-1.5`}>Start a free trial</button>
        </div>
      </BgHorizonRise>
    </Scene>
  ),
  "bg-soft-clouds": (
    <Scene style={{ background: "#121733" }}>
      <BgSoftClouds time="dusk">
        <div className="flex h-full flex-col justify-center gap-1.5 px-6">
          <span className="text-[10px] font-medium text-white/75">Drift · sleep sounds</span>
          <p className="m-0 max-w-[220px] text-[24px] font-semibold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_16px_rgba(30,20,60,0.5)]">Fall asleep in twelve minutes</p>
          <button type="button" className="mt-1.5 w-fit rounded-full bg-[#1a1838] px-3.5 py-1.5 text-[11px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(20,10,50,0.8)]">Try 7 days free</button>
        </div>
      </BgSoftClouds>
    </Scene>
  ),
  "bg-halftone": (
    <Scene style={{ background: "#08080a" }}>
      <BgHalftone spacing={8}>
        <div className="flex h-full flex-col justify-between p-4">
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/70">PRINTED MATTER · VOL 3</span>
          <div>
            <p className="m-0 font-mono text-[24px] font-semibold leading-none tracking-tight text-white">Riso Fair 2026</p>
            <div className="mt-2 flex items-center gap-2.5">
              <button type="button" className={solid}>RSVP</button>
              <span className="font-mono text-[10px] text-white/60">Oct 14 · Brooklyn</span>
            </div>
          </div>
        </div>
      </BgHalftone>
    </Scene>
  ),
};

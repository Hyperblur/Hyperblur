import type { CSSProperties, ReactNode } from "react";
import { BgGridDistortion } from "@/registry/hyperblur/bg-grid-distortion";
import { BgMagnetLines } from "@/registry/hyperblur/bg-magnet-lines";
import { BgDotField } from "@/registry/hyperblur/bg-dot-field";
import { BgRippleWater } from "@/registry/hyperblur/bg-ripple-water";
import { BgLiquidEther } from "@/registry/hyperblur/bg-liquid-ether";
import { BgTopography } from "@/registry/hyperblur/bg-topography";
import { BgLightTunnel } from "@/registry/hyperblur/bg-light-tunnel";
import { BgGlitchLetters } from "@/registry/hyperblur/bg-glitch-letters";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{children}</span>;
}

export const qjDemos: Record<string, ReactNode> = {
  "bg-grid-distortion": (
    <Scene style={{ background: "#08090c" }}>
      <BgGridDistortion cellSize={24} radius={90} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_50%,rgba(8,9,12,0)_50%,rgba(8,9,12,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <Tag>Lensing · v2.4</Tag>
        <h3 className="m-0 font-grotesk text-[26px] font-semibold leading-[1.05] tracking-tight text-white">
          See your data
          <br />
          up close
        </h3>
        <span className="text-[12px] text-white/60">Zoom into any metric without losing context.</span>
      </div>
    </Scene>
  ),
  "bg-magnet-lines": (
    <Scene style={{ background: "#0a0a0a" }}>
      <BgMagnetLines spacing={20} length={10} radius={140} />
      <div className="pointer-events-none absolute bottom-4 left-4 w-[200px] rounded-xl border border-white/10 bg-black/70 px-3.5 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Tag>Field strength</Tag>
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff] shadow-[0_0_8px_#2f7bff]" />
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-mono text-[22px] font-medium text-white">0.82</span>
          <span className="font-mono text-[11px] text-white/50">tesla</span>
        </div>
      </div>
    </Scene>
  ),
  "bg-dot-field": (
    <Scene style={{ background: "#0b0b0d" }}>
      <BgDotField spacing={13} size={1.1} radius={80} push={16} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-[250px] rounded-2xl border border-white/10 bg-[#111111]/85 p-4 text-left backdrop-blur-md">
          <span className="text-[11px] font-medium text-[#7fb3ff]">Early access</span>
          <p className="m-0 mt-1 text-[17px] font-semibold leading-snug text-white">Every pixel, in its place.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[11px] text-white/45">you@studio.com</span>
            <span className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-black">Join</span>
          </div>
        </div>
      </div>
    </Scene>
  ),
  "bg-ripple-water": (
    <Scene>
      <BgRippleWater interval={1.1} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
        <p className="m-0 font-sans text-[30px] leading-none text-white">Still waters</p>
        <span className="text-[12px] text-white/65">A breathing app for slow evenings</span>
        <span className="mt-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur-sm">Begin a 5 minute session</span>
      </div>
    </Scene>
  ),
  "bg-liquid-ether": (
    <Scene>
      <BgLiquidEther blobSize={0.5} intensity={0.7} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <Tag>Spring collection</Tag>
        <p className="m-0 font-sans text-[32px] leading-[1] text-white">Colors that move</p>
        <span className="rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium text-black">Shop the palette</span>
      </div>
    </Scene>
  ),
  "bg-topography": (
    <Scene style={{ background: "#0a0d12" }}>
      <BgTopography cellSize={8} scale={120} />
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">
        <div className="font-grotesk text-[14px] font-semibold text-white">Mount Rainier</div>
        <div className="font-mono text-[10px] text-white/55">46.8529° N, 121.7604° W</div>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 flex gap-4 rounded-lg border border-white/10 bg-black/70 px-3 py-2 font-mono text-[10px] text-white/60 backdrop-blur-md">
        <span>
          <span className="block text-[13px] text-white">4,392 m</span>summit
        </span>
        <span>
          <span className="block text-[13px] text-[#7fb3ff]">+1,240 m</span>gain
        </span>
      </div>
    </Scene>
  ),
  "bg-light-tunnel": (
    <Scene style={{ background: "#05050a" }}>
      <BgLightTunnel rings={18} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
        <Tag>Season 03 · Episode 07</Tag>
        <p className="m-0 font-display text-[30px] font-bold uppercase leading-none tracking-[0.04em] text-white">Night Transit</p>
        <span className="text-[12px] text-white/60">Streaming Friday at 22:00</span>
      </div>
    </Scene>
  ),
  "bg-glitch-letters": (
    <Scene style={{ background: "#070708" }}>
      <BgGlitchLetters fontSize={13} radius={90} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,rgba(7,7,8,0.85)_20%,rgba(7,7,8,0)_80%)]" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="font-mono text-[11px] text-[#ff5c8a]">ERR 0x4F · signal lost</span>
        <p className="m-0 font-mono text-[22px] font-medium leading-tight text-white">Reconnecting to node 12</p>
        <span className="font-mono text-[11px] text-white/50">attempt 3 of 5 · 00:14</span>
      </div>
    </Scene>
  ),
};

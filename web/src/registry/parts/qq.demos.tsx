import type { CSSProperties, ReactNode } from "react";
import { BgGalaxy } from "@/registry/hyperblur/bg-galaxy";
import { BgDarkVeil } from "@/registry/hyperblur/bg-dark-veil";
import { BgSilkThreads } from "@/registry/hyperblur/bg-silk-threads";
import { BgLayeredWaves } from "@/registry/hyperblur/bg-layered-waves";
import { BgGridMotion } from "@/registry/hyperblur/bg-grid-motion";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

export const qqDemos: Record<string, ReactNode> = {
  "bg-galaxy": (
    <Scene style={{ background: "#03040a" }}>
      <BgGalaxy stars={3600}>
        <div className="pointer-events-none flex h-full w-full flex-col justify-end p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Field guide · Chapter 4</span>
          <h3 className="m-0 mt-1 font-serif text-[30px] italic leading-none text-white">Two arms, one light</h3>
          <span className="mt-1.5 text-[12px] text-white/60">A slow tour of a barred spiral, 52 million years away.</span>
        </div>
      </BgGalaxy>
    </Scene>
  ),
  "bg-dark-veil": (
    <Scene style={{ background: "#050507" }}>
      <BgDarkVeil tearRadius={56} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-sm">
          Private beta
        </span>
        <h3 className="m-0 font-grotesk text-[26px] font-semibold leading-[1.05] tracking-tight text-white">
          What hides
          <br />
          behind the fog
        </h3>
        <span className="text-[12px] text-white/55">Move to lift the veil.</span>
      </div>
    </Scene>
  ),
  "bg-silk-threads": (
    <Scene style={{ background: "#08080b" }}>
      <BgSilkThreads count={34} amplitude={14} radius={70} push={26} />
      <div className="pointer-events-none absolute inset-0 flex items-center px-5">
        <div className="w-[210px] rounded-2xl border border-white/10 bg-[#0d0d10]/80 p-4 backdrop-blur-md">
          <span className="text-[11px] font-medium text-[#7fb3ff]">Loomwork Studio</span>
          <p className="m-0 mt-1 text-[17px] font-semibold leading-snug text-white">Fabric, woven to order.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-black">Browse cloth</span>
            <span className="text-[11px] text-white/55">212 weaves</span>
          </div>
        </div>
      </div>
    </Scene>
  ),
  "bg-layered-waves": (
    <Scene style={{ background: "#07070d" }}>
      <BgLayeredWaves layers={5} amplitude={10} lift={26} />
      <div className="pointer-events-none absolute left-5 right-5 top-4 flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Swell · Ocean Beach</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-mono text-[28px] font-medium leading-none text-white">1.8</span>
            <span className="font-mono text-[11px] text-white/55">m · 14 s</span>
          </div>
        </div>
        <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] text-[#7fb3ff]">WNW 285°</span>
      </div>
    </Scene>
  ),
  "bg-grid-motion": (
    <Scene style={{ background: "#0a0a0a" }}>
      <BgGridMotion tileSize={52} gap={8}>
        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(55%_60%_at_50%_50%,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0)_100%)] px-6 text-center">
          <span className="text-[11px] font-medium text-white/60">Template gallery</span>
          <h3 className="m-0 font-display text-[26px] font-bold uppercase leading-none tracking-wide text-white">1,200 layouts</h3>
          <span className="text-[12px] text-white/60">Pick one, ship it tonight.</span>
        </div>
      </BgGridMotion>
    </Scene>
  ),
};

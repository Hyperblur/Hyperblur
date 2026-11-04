import type { CSSProperties, ReactNode } from "react";
import { BgWavePattern } from "@/registry/hyperblur/bg-wave-pattern";
import { BgSlats } from "@/registry/hyperblur/bg-slats";
import { BgGhostFibers } from "@/registry/hyperblur/bg-ghost-fibers";
import { BgCrtWarp } from "@/registry/hyperblur/bg-crt-warp";
import { BgAcidSquares } from "@/registry/hyperblur/bg-acid-squares";
import { BgScannerSweep } from "@/registry/hyperblur/bg-scanner-sweep";
import { BgWebThreads } from "@/registry/hyperblur/bg-web-threads";

function Scene({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      {children}
    </div>
  );
}

export const qoDemos: Record<string, ReactNode> = {
  "bg-wave-pattern": (
    <Scene style={{ background: "#0b0b0e" }}>
      <BgWavePattern pattern="diamonds" cellSize={20} amplitude={12} color="rgba(255,255,255,0.08)" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,rgba(11,11,14,0.9)_25%,rgba(11,11,14,0)_85%)]" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
        <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/50">Loom &amp; Line · Autumn 26</span>
        <p className="m-0 font-serif text-[32px] leading-none text-white">Woven in motion</p>
        <span className="text-[12px] text-white/60">Twelve new textiles, cut to order</span>
      </div>
    </Scene>
  ),
  "bg-slats": (
    <Scene style={{ background: "#070708" }}>
      <BgSlats slatWidth={5} gap={3} radius={70} />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-md">
        <div className="h-9 w-9 shrink-0 rounded-md bg-[linear-gradient(135deg,#2f7bff,#0e1a33)]" />
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate font-grotesk text-[13px] font-semibold text-white">Venetian Hours</p>
          <p className="m-0 truncate text-[11px] text-white/55">Mara Quell · Low Tide Sessions</p>
        </div>
        <span className="font-mono text-[10px] text-white/50">2:41</span>
      </div>
    </Scene>
  ),
  "bg-ghost-fibers": (
    <Scene style={{ background: "#06080d" }}>
      <BgGhostFibers count={18} amplitude={0.3} radius={90} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">Now in beta</span>
        <p className="m-0 text-[24px] font-semibold leading-[1.1] tracking-tight text-white">Sync that feels like silk</p>
        <span className="text-[12px] text-white/55">Realtime state for every device you ship</span>
      </div>
    </Scene>
  ),
  "bg-crt-warp": (
    <Scene style={{ background: "#050505" }}>
      <BgCrtWarp />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/75 px-3 py-1.5 text-center">
        <p className="m-0 font-display text-[18px] font-bold uppercase leading-none tracking-[0.12em] text-white">Channel 03</p>
        <p className="m-0 mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Test transmission</p>
      </div>
    </Scene>
  ),
  "bg-acid-squares": (
    <Scene style={{ background: "#050506" }}>
      <BgAcidSquares cellSize={16} interval={1.2} waveSpeed={170} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div className="rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-center backdrop-blur-md">
          <p className="m-0 font-grotesk text-[11px] uppercase tracking-[0.24em] text-[#c6ff00]">Sat 14 Dec · 23:00</p>
          <p className="m-0 mt-1 font-grotesk text-[26px] font-bold leading-none tracking-tight text-white">Warehouse 09</p>
          <p className="m-0 mt-1.5 text-[11px] text-white/55">Okaru, Lune Vega, Pitch Black Club</p>
        </div>
      </div>
    </Scene>
  ),
  "bg-scanner-sweep": (
    <Scene style={{ background: "#08090c" }}>
      <BgScannerSweep cellSize={13} trail={60} />
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-black/75 px-3 py-2 font-mono backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff] shadow-[0_0_6px_#2f7bff]" />
          Scanning
        </div>
        <div className="mt-1 text-[15px] text-white">1,284 / 2,048</div>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/75 px-3 py-2 font-mono text-[10px] text-white/55 backdrop-blur-md">
        <span className="text-[13px] text-[#7fb3ff]">7</span> exposed ports
      </div>
    </Scene>
  ),
  "bg-web-threads": (
    <Scene style={{ background: "#09090b" }}>
      <BgWebThreads spokes={13} rings={7} />
      <div className="pointer-events-none absolute bottom-4 left-4 max-w-[220px] rounded-xl border border-white/10 bg-black/75 px-3.5 py-2.5 backdrop-blur-md">
        <p className="m-0 font-serif text-[22px] italic leading-none text-white">Every thread counts</p>
        <p className="m-0 mt-1 text-[11px] text-white/55">Map how your team really connects</p>
      </div>
    </Scene>
  ),
};

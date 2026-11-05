import type { ReactNode } from "react";
import { CarouselRing3d } from "@/registry/hyperblur/carousel-ring-3d";
import { HudFrame } from "@/registry/hyperblur/hud-frame";
import { HudBootScreen } from "@/registry/hyperblur/hud-boot-screen";
import { HudShelfSlider } from "@/registry/hyperblur/hud-shelf-slider";
import { HudDetailPanel } from "@/registry/hyperblur/hud-detail-panel";
import { HudOrbitBackdrop } from "@/registry/hyperblur/hud-orbit-backdrop";
import { HudToggleSwitch } from "@/registry/hyperblur/hud-toggle-switch";
import { HudFilterChipsDemo } from "@/registry/demos/hud-filter-chips-demo";
import { HudStatusBarDemo } from "@/registry/demos/hud-status-bar-demo";
import { HudSearchFieldDemo } from "@/registry/demos/hud-search-field-demo";

const shelf = [
  { id: "ion-drift", kicker: "EXP 014", title: "Ion Drift", text: "Charged particles bending around the cursor.", tag: "WEBGL" },
  { id: "parallax-atlas", kicker: "EXP 021", title: "Parallax Atlas", text: "A folded map that opens in layered depth.", tag: "CSS 3D" },
  { id: "signal-garden", kicker: "EXP 027", title: "Signal Garden", text: "Stems that sway with the room microphone.", tag: "AUDIO" },
  { id: "night-grid", kicker: "EXP 033", title: "Night Grid", text: "An endless horizon from one fragment shader.", tag: "SHADER" },
  { id: "pulse-lattice", kicker: "EXP 042", title: "Pulse Lattice", text: "A spring mesh that ripples from every click.", tag: "PHYSICS" },
];

const bars = Array.from({ length: 28 }, (_, i) => {
  const v = ((i * 2654435761) >>> 0) % 100;
  return 22 + ((v + i * 9) % 70);
});

const mono = "font-mono text-[9px] uppercase tracking-[0.14em]";

export const hudADemos: Record<string, ReactNode> = {
  "carousel-ring-3d": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <CarouselRing3d items={shelf} height={188} autoplay={3200} label="Vector Lab shelf" />
      </div>
    </div>
  ),
  "hud-frame": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudFrame label="Vector Lab / Render" code="Node 07" status="Live" className="max-w-[320px]">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className={`${mono} text-[#8f8f8f]`}>Frames today</span>
            <span className="font-grotesk text-[30px] font-semibold leading-none tracking-tight text-[#ededed]">48,210</span>
            <span className={`${mono} text-[#ff4d4d]`}>+12.4% vs avg</span>
          </div>
          <svg viewBox="0 0 112 48" className="h-12 w-[112px] shrink-0" aria-hidden="true">
            {bars.map((h, i) => (
              <rect
                key={i}
                x={i * 4}
                y={(48 - h * 0.48).toFixed(2)}
                width="2.4"
                height={(h * 0.48).toFixed(2)}
                fill={i === bars.length - 1 ? "#ff4d4d" : "rgba(255,255,255,.28)"}
              />
            ))}
          </svg>
        </div>
        <div className={`${mono} mt-3 flex justify-between border-t border-white/[0.08] pt-2 text-[#5f5f5f]`}>
          <span>GPU 61%</span>
          <span>Queue 03</span>
          <span>14:02 UTC</span>
        </div>
      </HudFrame>
    </div>
  ),
  "hud-boot-screen": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudBootScreen
        title="Vector Lab"
        subtitle="Boot / Build 2.4.1"
        className="max-w-[300px]"
        rows={[
          { label: "Core" },
          { label: "Shaders", value: "42 / 42" },
          { label: "Audio", value: "48 kHz" },
          { label: "Input" },
        ]}
      />
    </div>
  ),
  "hud-shelf-slider": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[320px] flex-col gap-3 border border-white/[0.12] bg-white/[0.025] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-serif text-[22px] italic leading-none text-[#ededed]">The experiments shelf</span>
          <span className={`${mono} text-[#5f5f5f]`}>2026</span>
        </div>
        <HudShelfSlider
          defaultValue={2}
          labels={["Ion Drift", "Parallax Atlas", "Signal Garden", "Night Grid", "Orbital Type", "Pulse Lattice", "Echo Room", "Field Survey", "Pocket Lathe"]}
        />
      </div>
    </div>
  ),
  "hud-filter-chips": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudFilterChipsDemo />
    </div>
  ),
  "hud-status-bar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudStatusBarDemo />
    </div>
  ),
  "hud-detail-panel": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudDetailPanel
        className="font-display max-w-[330px]"
        kicker="Vector Lab / Shader"
        index="014"
        title="Ion Drift"
        description="Particles bend around a magnetic field."
        meta={[
          { label: "Stack", value: "WebGL" },
          { label: "Licence", value: "MIT" },
          { label: "Status", value: "Live" },
          { label: "Added", value: "10.28" },
        ]}
      />
    </div>
  ),
  "hud-search-field": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudSearchFieldDemo />
    </div>
  ),
  "hud-orbit-backdrop": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HudOrbitBackdrop minHeight={184} className="max-w-[340px] border border-white/[0.1]">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className={`${mono} text-[#ff4d4d]`}>Vector Lab</span>
          <span className="font-serif text-[34px] italic leading-none text-[#ededed]">Experiments in orbit</span>
          <span className={`${mono} text-[#8f8f8f]`}>34 pieces / 6 orbits</span>
        </div>
      </HudOrbitBackdrop>
    </div>
  ),
  "hud-toggle-switch": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[300px] flex-col border border-white/[0.12] bg-white/[0.025] px-4 py-3">
        <div className={`${mono} flex justify-between pb-1 text-[#8f8f8f]`}>
          <span>Settings / Output</span>
          <span className="text-[#5f5f5f]">03</span>
        </div>
        {[
          { name: "Interface sound", label: "Snd", on: true },
          { name: "Ambient loop", label: "Amb", on: false },
          { name: "Haptic feedback", label: "Hpt", on: true },
        ].map((row) => (
          <div key={row.label} className="flex h-[38px] items-center justify-between border-t border-white/[0.07]">
            <span className="font-grotesk text-[13px] text-[#ededed]">{row.name}</span>
            <HudToggleSwitch label={row.label} defaultChecked={row.on} />
          </div>
        ))}
      </div>
    </div>
  ),
};

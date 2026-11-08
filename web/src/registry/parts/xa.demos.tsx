import type { ReactNode } from "react";
import { ButtonMarquee } from "@/registry/hyperblur/button-marquee";
import { ButtonElasticStretch } from "@/registry/hyperblur/button-elastic-stretch";
import { ButtonGoo } from "@/registry/hyperblur/button-goo";
import { ButtonEqualizer } from "@/registry/hyperblur/button-equalizer";
import { ButtonOrbit } from "@/registry/hyperblur/button-orbit";
import { ButtonAurora } from "@/registry/hyperblur/button-aurora";
import { ButtonWaveLetters } from "@/registry/hyperblur/button-wave-letters";
import { ButtonShareExpand } from "@/registry/hyperblur/button-share-expand";
import { ButtonParallaxLayers } from "@/registry/hyperblur/button-parallax-layers";
import { ButtonDotMatrix } from "@/registry/hyperblur/button-dot-matrix";
import { ButtonOdometer } from "@/registry/hyperblur/button-odometer";
import { ButtonTrace } from "@/registry/hyperblur/button-trace";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]";

export const xaDemos: Record<string, ReactNode> = {
  "button-marquee": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-tight">Studio Kiln</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#a1a1a1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff4d]" />2 slots left for Q1
          </span>
        </div>
        <p className="m-0 text-[19px] font-medium leading-[1.15] tracking-tight">
          Brand systems for hardware startups.
        </p>
        <div className="flex items-center justify-between">
          <ButtonMarquee size="sm">Book a call</ButtonMarquee>
          <span className="font-mono text-[10px] text-[#8f8f8f]">30 min · Free</span>
        </div>
      </div>
    </div>
  ),
  "button-elastic-stretch": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 flex-none rounded-xl bg-[radial-gradient(circle_at_30%_25%,#ffd1dc,#ff8fab_45%,#c9184a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-sm font-semibold">Peach Fuzz Hoodie</p>
            <p className="m-0 mt-0.5 text-xs text-[#8f8f8f]">Heavyweight fleece · Unisex</p>
            <div className="mt-1.5 flex gap-1">
              {["S", "M", "L", "XL"].map((s) => (
                <span
                  key={s}
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${s === "M" ? "bg-[#ededed] text-[#0a0a0a]" : "border border-[#262626] text-[#a1a1a1]"}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <span className="self-start text-sm font-semibold">$68</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#8f8f8f]">Grab it and pull</span>
          <ButtonElasticStretch size="sm">Add to cart</ButtonElasticStretch>
        </div>
      </div>
    </div>
  ),
  "button-goo": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-2 py-5 text-center font-sans`}>
        <span className="rounded-full border border-[#2c2546] bg-[#15122a] px-2 py-0.5 font-mono text-[10px] text-[#b9a8ff]">
          Fluxboard 0.9
        </span>
        <p className="m-0 text-[17px] font-semibold tracking-tight">Whiteboards that think in layers</p>
        <p className="m-0 text-[11px] text-[#8f8f8f]">3,412 builders are already waiting</p>
        <div className="mt-3">
          <ButtonGoo size="sm">Join the beta</ButtonGoo>
        </div>
      </div>
    </div>
  ),
  "button-equalizer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-[linear-gradient(135deg,#ff7a45,#7a1f5c_60%,#1b1033)]">
            <div className="absolute inset-x-0 bottom-1.5 text-center font-grotesk text-[8px] font-bold tracking-[0.2em] text-white/80">
              EP
            </div>
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold">Night Drive</p>
            <p className="m-0 mt-0.5 text-xs text-[#8f8f8f]">Analog Hearts · 4 tracks · 2026</p>
          </div>
        </div>
        <ButtonEqualizer duration={30} className="self-start" />
      </div>
    </div>
  ),
  "button-orbit": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-1.5 pb-6 text-center font-grotesk`}>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#a1a1a1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />14 of 14 checks passed
        </div>
        <p className="m-0 text-lg font-semibold tracking-tight">Ready for liftoff</p>
        <p className="m-0 mb-4 text-[11px] text-[#8f8f8f]">atlas-web · production · eu-west-1</p>
        <ButtonOrbit size="sm">Launch project</ButtonOrbit>
      </div>
    </div>
  ),
  "button-aurora": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 bg-[#0b0b10] font-sans`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Palette studio</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">mood: tidepool</span>
        </div>
        <div className="flex h-9 overflow-hidden rounded-lg">
          {["#0e7490", "#22d3ee", "#a5f3fc", "#a855f7", "#f472b6"].map((c) => (
            <div key={c} className="flex flex-1 items-end p-1" style={{ background: c }}>
              <span className="font-mono text-[8px] text-black/60">{c.slice(1)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-1">
          <ButtonAurora size="sm">Generate palette</ButtonAurora>
        </div>
      </div>
    </div>
  ),
  "button-wave-letters": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2 font-grotesk`}>
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold">Pro</span>
          <span className="text-[11px] text-[#8f8f8f]">
            <span className="text-xl font-semibold tracking-tight text-[#ededed]">$12</span> / seat / mo
          </span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-1 p-0 text-xs text-[#a1a1a1]">
          <li>Unlimited projects and version history</li>
          <li>Priority builds on dedicated runners</li>
        </ul>
        <div className="mt-2 flex items-center justify-between">
          <ButtonWaveLetters size="sm" label="Start free trial" />
          <span className="text-[10px] text-[#8f8f8f]">14 days, no card</span>
        </div>
      </div>
    </div>
  ),
  "button-share-expand": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Engineering · 6 min read</span>
        <p className="m-0 text-[17px] font-semibold leading-snug tracking-tight">How we cut CI build times by 63%</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-[#1e3a8a] text-[10px] font-semibold text-[#bfdbfe]">
              MR
            </span>
            <span className="truncate text-xs text-[#a1a1a1]">Maya Rios</span>
          </div>
          <ButtonShareExpand defaultOpen />
        </div>
      </div>
    </div>
  ),
  "button-parallax-layers": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-1.5 text-center font-sans`}>
        <p className="m-0 text-[17px] font-semibold tracking-tight">Driftnote 3.2</p>
        <p className="m-0 mb-3 text-xs text-[#8f8f8f]">Notes that sync in under 50 ms.</p>
        <ButtonParallaxLayers size="sm">Download for macOS</ButtonParallaxLayers>
        <p className="m-0 mt-2 font-mono text-[10px] text-[#6f6f6f]">Also on Windows and Linux</p>
      </div>
    </div>
  ),
  "button-dot-matrix": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 bg-[#060a08] font-mono`}>
        <div className="flex flex-col gap-1 text-[10.5px] leading-snug text-[#7f9a8a]">
          <span>
            <span className="text-[#3dffa2]">✓</span> compiled 214 routes in 2.1s
          </span>
          <span>
            <span className="text-[#3dffa2]">✓</span> 38 tests passed, 0 failed
          </span>
          <span>
            <span className="text-[#ffd166]">●</span> waiting for deploy to 12 regions
          </span>
        </div>
        <ButtonDotMatrix size="sm" className="self-start">Deploy to edge</ButtonDotMatrix>
      </div>
    </div>
  ),
  "button-odometer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[linear-gradient(160deg,#164e63,#0e7490)] font-grotesk text-lg font-bold text-[#cffafe]">
            T
          </div>
          <div className="min-w-0">
            <p className="m-0 text-sm font-semibold">Tidewave</p>
            <p className="m-0 mt-0.5 truncate text-xs text-[#8f8f8f]">Open source session replay</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="rounded-md border border-[#3a2418] bg-[#1a100b] px-2 py-1 text-[10px] font-medium text-[#ffb08f]">
            #2 Product of the day
          </span>
          <ButtonOdometer defaultCount={1284} />
        </div>
      </div>
    </div>
  ),
  "button-trace": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className={`${card} gap-2 font-grotesk`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(127,179,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,179,255,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7fb3ff]">Private alpha · Cohort 04</span>
        <p className="m-0 text-[18px] font-medium leading-tight tracking-tight">Parametric CAD that runs in a browser tab.</p>
        <div className="mt-2 flex items-center gap-3">
          <ButtonTrace size="sm">Request access</ButtonTrace>
          <span className="text-[10px] text-[#8f8f8f]">212 seats left</span>
        </div>
      </div>
    </div>
  ),
};

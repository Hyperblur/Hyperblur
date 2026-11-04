import type { ReactNode } from "react";
import { TextPressure } from "@/registry/hyperblur/text-pressure";
import { TextScrambleHover } from "@/registry/hyperblur/text-scramble-hover";
import { TextWarp } from "@/registry/hyperblur/text-warp";
import { TextFuzzy } from "@/registry/hyperblur/text-fuzzy";
import { TextMaskReveal } from "@/registry/hyperblur/text-mask-reveal";
import { TextHighlightMarker } from "@/registry/hyperblur/text-highlight-marker";
import { TextUnderlineDraw } from "@/registry/hyperblur/text-underline-draw";
import { TextOdometer } from "@/registry/hyperblur/text-odometer";
import { TextFlipWords } from "@/registry/hyperblur/text-flip-words";
import { TextFillScroll } from "@/registry/hyperblur/text-fill-scroll";
import { Text3dExtrude } from "@/registry/hyperblur/text-3d-extrude";
import { TextLiquidGradient } from "@/registry/hyperblur/text-liquid-gradient";

const revenue = ["$48,219.40", "$48,964.10", "$49,305.85", "$51,120.00"];

export const qdDemos: Record<string, ReactNode> = {
  "text-pressure": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>Variable weight</span>
          <span>300 to 900</span>
        </div>
        <TextPressure text="Heavy hands" className="font-sans text-[44px] text-[#ededed]" minWeight={300} maxWeight={900} />
        <p className="font-grotesk m-0 text-[12px] text-[#8f8f8f]">Slide across the letters and feel them push back.</p>
      </div>
    </div>
  ),
  "text-scramble-hover": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-1 rounded-xl border border-[#262626] bg-[#0d0d0d] p-4 font-mono text-left text-[#ededed]">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">vault / access</span>
        </div>
        <TextScrambleHover text="CLEARANCE GRANTED" align="left" radius={70} className="text-[24px] font-semibold" />
        <p className="m-0 text-[11px] text-[#8f8f8f]">operator 0x4f2a / session open for 14m</p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#7fb3ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span>3 of 3 checks passed</span>
        </div>
      </div>
    </div>
  ),
  "text-warp": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col items-center text-center">
        <span className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-[#8f8f8f]">Optics lab / no. 12</span>
        <TextWarp text="Bend the line" className="font-serif text-[56px] italic text-[#ededed]" radius={120} strength={22} />
        <span className="font-grotesk text-[12px] text-[#8f8f8f]">Move a lens across the headline.</span>
      </div>
    </div>
  ),
  "text-fuzzy": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col items-center gap-2 rounded-2xl border border-[#262626] bg-[#0f0f0f] px-4 py-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8f8f8f]">Live / Nov 14</span>
        <TextFuzzy text="Static Bloom" className="font-grotesk text-[40px] font-bold text-[#ededed]" tabIndex={0} />
        <span className="font-grotesk text-[12px] tracking-wide text-[#7fb3ff]">The Warehouse, doors at 8 pm</span>
      </div>
    </div>
  ),
  "text-mask-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col text-left">
        <span className="font-grotesk mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8f8f]">Issue 07 / Design notes</span>
        <TextMaskReveal
          text={"Slow design,\nfor fast teams."}
          loop={3.5}
          className="font-serif text-[42px] leading-[1.02] text-[#ededed]"
        />
        <span className="font-grotesk mt-3 text-[12px] text-[#a1a1a1]">By Mara Lindqvist, 6 min read</span>
      </div>
    </div>
  ),
  "text-highlight-marker": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col text-left">
        <p className="font-sans m-0 text-[21px] font-medium leading-[1.55] text-[#ededed]">
          <TextHighlightMarker
            text="Good copy is short, specific and a little bit surprising."
            marks={["short", "specific", "surprising"]}
            loop={3.5}
          />
        </p>
        <span className="font-mono mt-3 text-[11px] text-[#8f8f8f]">Writing notes, p. 12</span>
      </div>
    </div>
  ),
  "text-underline-draw": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col items-start gap-4">
        <span className="rounded-full border border-[#262626] bg-[#111111] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a1a1a1]">
          v2.4 is out
        </span>
        <TextUnderlineDraw text="Read the changelog" className="font-grotesk text-[34px] font-semibold text-[#ededed]" />
        <div className="flex gap-5 font-sans text-[15px] text-[#c8c8c8]">
          <TextUnderlineDraw text="Pricing" variant="straight" trigger="view" color="#2f7bff" thickness={2} />
          <TextUnderlineDraw text="Docs" variant="straight" trigger="view" color="#ff7a59" thickness={2} />
          <TextUnderlineDraw text="Blog" variant="straight" trigger="view" color="#34d399" thickness={2} />
        </div>
      </div>
    </div>
  ),
  "text-odometer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <span className="font-grotesk text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Revenue today</span>
        <TextOdometer value="$48,219.40" cycle={revenue} className="font-grotesk text-[44px] font-semibold" />
        <div className="flex items-center justify-between text-[11px]">
          <span className="rounded-full bg-[#10281c] px-2 py-0.5 font-medium text-[#34d399]">+12.4% vs yesterday</span>
          <span className="text-[#8f8f8f]">Goal $60,000</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[#1f1f1f]">
          <div className="h-full w-[82%] rounded-full bg-[#2f7bff]" />
        </div>
      </div>
    </div>
  ),
  "text-flip-words": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col items-start gap-3 text-left">
        <span className="rounded-full border border-[#262626] bg-[#111111] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a1a1a1]">
          Studio Northlight
        </span>
        <TextFlipWords
          text="Turn ideas into {}"
          words={["landing pages", "dashboards", "prototypes", "launch posts"]}
          className="font-sans text-[30px] font-semibold tracking-tight text-[#ededed]"
        />
        <span className="font-sans text-[13px] text-[#8f8f8f]">Polished product pages, shipped in days.</span>
      </div>
    </div>
  ),
  "text-fill-scroll": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col gap-2 text-left">
        <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-[#8f8f8f]">Manifesto</span>
        <TextFillScroll
          text="Interfaces should feel like paper: quiet, tactile and a little bit alive."
          idleLoop
          idleDuration={5}
          className="font-serif text-[29px] leading-[1.14]"
        />
      </div>
    </div>
  ),
  "text-3d-extrude": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col items-center text-center">
        <Text3dExtrude text="TURBO" depth={30} className="font-display text-[64px] font-bold" />
        <span className="font-grotesk text-[12px] text-[#8f8f8f]">Tilt the logo with your pointer.</span>
      </div>
    </div>
  ),
  "text-liquid-gradient": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col items-center text-center">
        <TextLiquidGradient text="Liquid light" className="font-serif text-[60px] italic" />
        <span className="font-mono mt-1 text-[11px] uppercase tracking-[0.16em] text-[#8f8f8f]">Aurora palette / 04 blobs</span>
      </div>
    </div>
  ),
};

import type { ReactNode } from "react";
import { TextBlockWipe } from "@/registry/hyperblur/text-block-wipe";
import { TextCipherLock } from "@/registry/hyperblur/text-cipher-lock";
import { TextWeightWave } from "@/registry/hyperblur/text-weight-wave";
import { TextLetterFlip } from "@/registry/hyperblur/text-letter-flip";
import { TextFoilSweep } from "@/registry/hyperblur/text-foil-sweep";
import { TextLineRise } from "@/registry/hyperblur/text-line-rise";
import { TextWeightTrail } from "@/registry/hyperblur/text-weight-trail";
import { TextPathFlow } from "@/registry/hyperblur/text-path-flow";
import { TextMagnetic } from "@/registry/hyperblur/text-magnetic";
import { TextRollWords } from "@/registry/hyperblur/text-roll-words";
import { TextInkDraw } from "@/registry/hyperblur/text-ink-draw";
import { TextRackFocus } from "@/registry/hyperblur/text-rack-focus";
import { TextSwapPill } from "@/registry/hyperblur/text-swap-pill";
import { TextShatter } from "@/registry/hyperblur/text-shatter";

export const viDemos: Record<string, ReactNode> = {
  "text-block-wipe": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>Halden Capital</span>
          <span>Report 04</span>
        </div>
        <TextBlockWipe
          text={"Annual report\nFiscal year 2026"}
          loop={1.8}
          className="font-grotesk text-[30px] font-semibold leading-[1.08] tracking-tight"
        />
        <div className="flex items-center gap-2 text-[11px] text-[#8f8f8f]">
          <span className="h-px flex-1 bg-[#262626]" />
          <span>Published March 14</span>
        </div>
      </div>
    </div>
  ),
  "text-cipher-lock": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-xl border border-[#262626] bg-[#0d0d0d] p-4 text-left font-mono text-[#ededed]">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>vault-eu-west / key 7</span>
          <span className="flex items-center gap-1.5 text-[#34d399]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
            verified
          </span>
        </div>
        <TextCipherLock text="ACCESS GRANTED" loop={2.2} accent="#34d399" className="text-[28px] font-semibold tracking-[0.04em]" />
        <p className="m-0 text-[11px] text-[#8f8f8f]">fingerprint 4F:2A:9C:E1 / session 14m</p>
      </div>
    </div>
  ),
  "text-weight-wave": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>Axis wght</span>
          <span>200 to 900</span>
        </div>
        <TextWeightWave text="Variable" bars className="font-sans text-[54px] leading-[1.05] tracking-tight" />
        <p className="m-0 mt-1 text-[12px] text-[#8f8f8f]">One file, every weight in between.</p>
      </div>
    </div>
  ),
  "text-letter-flip": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col items-start gap-2 text-left text-[#ededed]">
        <span className="rounded-full border border-[#262626] bg-[#111111] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a1a1a1]">
          Studio Northlight
        </span>
        <span className="font-sans text-[15px] text-[#8f8f8f]">We help product teams</span>
        <TextLetterFlip words={["DESIGN", "DEPLOY", "DELIGHT"]} className="font-display text-[44px] font-bold leading-none tracking-[0.04em]" />
      </div>
    </div>
  ),
  "text-foil-sweep": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative box-border flex h-[172px] w-full max-w-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[linear-gradient(140deg,#1a1a1c,#0c0c0d)] p-4 text-left text-[#ededed] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">
          <span>Members</span>
          <span>No. 0418</span>
        </div>
        <TextFoilSweep text="Founders Club" tone="gold" className="font-grotesk text-[34px] font-bold leading-none tracking-tight" />
        <div className="flex items-end justify-between text-[11px] text-[#a1a1a1]">
          <span>Maya Lindqvist</span>
          <span className="font-mono">09 / 28</span>
        </div>
      </div>
    </div>
  ),
  "text-line-rise": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[320px] flex-col gap-3 text-left text-[#ededed]">
        <TextLineRise
          text="Good software disappears. What stays is the feeling that everything was exactly where you expected it."
          loop={2}
          className="font-sans text-[19px] font-medium leading-[1.3] tracking-tight"
        />
        <div className="flex items-center gap-2 text-[11px] text-[#8f8f8f]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f2a44] text-[9px] font-semibold text-[#7fb3ff]">IR</span>
          <span>Iris Romero, Head of Design at Fieldwork</span>
        </div>
      </div>
    </div>
  ),
  "text-weight-trail": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 text-left text-[#ededed]">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Swipe across the line</span>
        <TextWeightTrail text="Move fast, leave a mark" autoPlay className="font-grotesk text-[32px] leading-[1.1] tracking-tight" />
      </div>
    </div>
  ),
  "text-path-flow": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-1 overflow-hidden rounded-2xl border border-[#262626] bg-[#0f1115] px-2 py-3 text-[#ededed]">
        <div className="flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>Spring drop</span>
          <span>Ends Sunday</span>
        </div>
        <TextPathFlow text="Free shipping on orders over $80" amplitude={24} fontSize={32} height={130} className="font-grotesk" />
      </div>
    </div>
  ),
  "text-magnetic": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col items-center gap-3 text-center text-[#ededed]">
        <TextMagnetic text="Pull me closer" autoPlay className="font-sans text-[38px] font-semibold tracking-tight" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Spring 0.12 / damping 0.78</span>
      </div>
    </div>
  ),
  "text-roll-words": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 text-left text-[#ededed]">
        <h3 className="m-0 font-grotesk text-[30px] font-semibold leading-[1.1] tracking-tight">
          <TextRollWords words={["Plan", "Build", "Launch", "Scale"]} className="text-[#7fb3ff]" />
          <br />
          without the busywork
        </h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#ededed] px-3 py-1.5 text-[12px] font-medium text-[#0a0a0a]">Start free</span>
          <span className="text-[12px] text-[#8f8f8f]">No card required</span>
        </div>
      </div>
    </div>
  ),
  "text-ink-draw": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[320px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Agreement 2291 / signed</span>
        <TextInkDraw text="Northwind" loop={1.6} className="font-sans" />
        <div className="flex items-center justify-between border-t border-[#262626] pt-2 text-[11px] text-[#8f8f8f]">
          <span>Lena Okafor, CFO</span>
          <span>Apr 2, 2026</span>
        </div>
      </div>
    </div>
  ),
  "text-rack-focus": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#1f1f1f] bg-[radial-gradient(120%_90%_at_50%_0%,#1a1d24,#0a0a0a)] px-4 py-5 text-left text-[#ededed]">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8f8f8f]">Scene 12 / Take 3</span>
        <TextRackFocus text="Every frame tells the story" focus="frame" loop={1.8} className="font-grotesk text-[30px] font-semibold leading-[1.1] tracking-tight" />
      </div>
    </div>
  ),
  "text-swap-pill": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 text-left text-[#ededed]">
        <TextSwapPill className="block font-sans text-[30px] font-semibold leading-[1.3] tracking-tight" suffix="who ship weekly" />
        <span className="text-[12px] text-[#8f8f8f]">Trusted by 4,200 teams in 38 countries</span>
      </div>
    </div>
  ),
  "text-shatter": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col items-center gap-3 text-center text-[#ededed]">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8f8f8f]">Season 02 / Drop 07</span>
        <TextShatter text="Break the mold" autoPlay className="font-grotesk text-[40px] font-bold tracking-tight" />
        <span className="rounded-full border border-[#262626] bg-[#111111] px-3 py-1 text-[11px] text-[#a1a1a1]">Hover to shatter</span>
      </div>
    </div>
  ),
};

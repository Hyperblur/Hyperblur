import type { ReactNode } from "react";
import { TextShuffleIn } from "@/registry/hyperblur/text-shuffle-in";
import { TextScrollFloat } from "@/registry/hyperblur/text-scroll-float";
import { TextScrollWords } from "@/registry/hyperblur/text-scroll-words";
import { TextCircular } from "@/registry/hyperblur/text-circular";
import { TextAsciiRender } from "@/registry/hyperblur/text-ascii-render";

const card =
  "box-border flex w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] text-left text-[#ededed]";

export const qtDemos: Record<string, ReactNode> = {
  "text-shuffle-in": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className={`${card} relative h-[184px] flex-col justify-between p-4`}
        style={{
          background:
            "radial-gradient(120% 90% at 85% -10%, rgba(47,123,255,0.28) 0%, transparent 55%), radial-gradient(90% 80% at 0% 110%, rgba(64,200,160,0.18) 0%, transparent 60%), #0d0f14",
        }}
      >
        <div className="flex items-center justify-between font-grotesk text-[10px] uppercase tracking-[0.16em] text-[#a1a1a1]">
          <span>Tromso, Norway</span>
          <span>Jun 14 to 16</span>
        </div>
        <TextShuffleIn
          text="Midnight Sun"
          replayEvery={4.5}
          shuffles={5}
          className="font-sans text-[54px] leading-none tracking-tight text-[#f4f1ea]"
        />
        <div className="flex items-center justify-between font-sans text-xs text-[#a1a1a1]">
          <span>Three nights, 28 artists</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-[#ededed]">Tickets</span>
        </div>
      </div>
    </div>
  ),
  "text-scroll-float": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[184px] flex-col justify-between bg-[#111111] p-5 font-grotesk`}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">
          <span>Field Notes</span>
          <span>No. 12</span>
        </div>
        <TextScrollFloat
          lines={["Rise with", "the scroll."]}
          loop
          className="text-[38px] font-bold leading-[1.05] tracking-tight text-[#ededed]"
        />
        <div className="flex items-center gap-2 text-[11px] text-[#a1a1a1]">
          <span className="h-px flex-1 bg-[#262626]" />
          <span>6 min read</span>
        </div>
      </div>
    </div>
  ),
  "text-scroll-words": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[184px] flex-col justify-between bg-[#111111] p-5`}>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          <span>Manifesto</span>
          <span>02 / 07</span>
        </div>
        <TextScrollWords
          text="Every great product starts as a quiet idea, then the small details catch the light one word at a time."
          loop
          className="font-sans text-[22px] leading-[1.28] text-[#f2efe8]"
        />
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-[#262626]">
          <div className="h-full w-2/5 rounded-full bg-[#7fb3ff]" />
        </div>
      </div>
    </div>
  ),
  "text-circular": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[184px] flex-row items-center gap-4 bg-[#111111] p-4`}>
        <TextCircular
          text="Small batch coffee"
          size={150}
          fontSize={13}
          pulseEvery={5}
          className="shrink-0 font-grotesk font-medium uppercase text-[#ededed]"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7fb3ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
            <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
            <path d="M8 3c0 1.2 1 1.6 1 2.8M12 3c0 1.2 1 1.6 1 2.8" />
          </svg>
        </TextCircular>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="font-sans m-0 text-[26px] leading-none">Ember &amp; Oak</p>
          <p className="m-0 font-sans text-xs leading-snug text-[#a1a1a1]">Roasted in Lisbon, shipped within two days of the roast.</p>
          <span className="mt-1 w-fit rounded-full bg-[#ededed] px-3 py-1 font-sans text-[11px] font-medium text-[#0a0a0a]">Shop beans</span>
        </div>
      </div>
    </div>
  ),
  "text-ascii-render": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[184px] flex-col bg-[#0a0a0a]`}>
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-[#1f1f1f] px-3">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-[#8f8f8f]">broadcast.txt</span>
        </div>
        <TextAsciiRender
          text="SIGNAL"
          height={154}
          density={1.25}
          className="font-mono text-[#cfe0ff]"
        />
      </div>
    </div>
  ),
};

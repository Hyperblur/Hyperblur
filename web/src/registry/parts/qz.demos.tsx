import type { ReactNode } from "react";
import { TextScrambleView } from "@/registry/hyperblur/text-scramble-view";
import { TextScrambleCenter } from "@/registry/hyperblur/text-scramble-center";
import { TypewriterHuman } from "@/registry/hyperblur/typewriter-human";
import { TypewriterSwap } from "@/registry/hyperblur/typewriter-swap";
import { TickerVertical } from "@/registry/hyperblur/ticker-vertical";
import { LoaderFillText } from "@/registry/hyperblur/loader-fill-text";
import { LoaderLineReveal } from "@/registry/hyperblur/loader-line-reveal";
import { LoaderJumpingDots } from "@/registry/hyperblur/loader-jumping-dots";
import { LoaderDotsPulse } from "@/registry/hyperblur/loader-dots-pulse";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] text-left text-[#ededed]";

const wire = [
  { tag: "FED", text: "Fed holds rates steady", meta: "09:42" },
  { tag: "OIL", text: "Oil slips below $71 a barrel", meta: "09:38" },
  { tag: "TECH", text: "Nvidia tops revenue forecast", meta: "09:31" },
  { tag: "FX", text: "Euro firms on jobs data", meta: "09:24" },
  { tag: "BOND", text: "Treasury yields edge lower", meta: "09:17" },
  { tag: "GOLD", text: "Gold hits two-week high", meta: "09:05" },
  { tag: "AUTO", text: "Tesla recalls 12k vehicles", meta: "08:58" },
  { tag: "FX", text: "Dollar slips against yen", meta: "08:49" },
];

function Doc() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#8f8f8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 1.75h5.5L13 5.25v9H4z" />
      <path d="M9.5 1.75v3.5H13" />
    </svg>
  );
}

const invoices = [
  { id: "INV-2041", who: "Acme Corp", amount: "$4,200" },
  { id: "INV-2038", who: "Northwind", amount: "$1,840" },
  { id: "INV-2033", who: "Halden & Co", amount: "$960" },
];

export const qzDemos: Record<string, ReactNode> = {
  "text-scramble-view": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2.5 p-4`}>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#8f8f8f]">
          <span>Changelog</span>
          <span>v4.2 / Nov 3</span>
        </div>
        <div className="font-sans">
          <TextScrambleView text="Faster builds, fewer surprises" className="text-[28px] leading-8 text-[#f4f1ea]" />
        </div>
        <p className="m-0 text-xs leading-4 text-[#a1a1a1]">Incremental caching cuts cold starts by 38%.</p>
        <p className="m-0 flex items-center gap-1.5 text-[11px] leading-4 text-[#6b6b6b]">
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" />
            <path d="M2 2.5v3h3" />
          </svg>
          Click the headline to replay
        </p>
      </div>
    </div>
  ),
  "text-scramble-center": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-5 px-4 py-5 font-grotesk`}>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#8f8f8f]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3ecf8e]" />
            Uplink 04
          </span>
          <span>Orbit 412 km</span>
        </div>
        <TextScrambleCenter
          text="SIGNAL ACQUIRED"
          accent="#7fb3ff"
          className="text-center text-[22px] font-bold leading-7 tracking-[0.1em] text-[#ededed]"
        />
        <div className="flex h-5 items-end justify-center gap-1" aria-hidden="true">
          {[5, 9, 14, 8, 17, 11, 6, 15, 10, 7, 13, 5].map((h, i) => (
            <span key={i} className="w-1.5 rounded-sm bg-[#2f7bff]" style={{ height: h, opacity: 0.35 + (h / 17) * 0.65 }} />
          ))}
        </div>
      </div>
    </div>
  ),
  "typewriter-human": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2 p-3`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#3b4a7a] text-[11px] font-semibold text-white">MC</span>
          <div className="min-w-0 leading-4">
            <p className="m-0 text-[10px] uppercase tracking-[0.1em] text-[#8f8f8f]">New message to</p>
            <p className="m-0 truncate text-[13px] font-medium">Maya Chen</p>
          </div>
        </div>
        <div className="min-h-[88px] rounded-lg border border-[#262626] bg-[#0a0a0a] px-3 py-2.5 text-[15px] leading-[22px] text-[#ededed]">
          <TypewriterHuman text="Hey Maya, quick update: staging is green. Shipping the patch after lunch, no rush on your side." />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#6b6b6b]">
          <span>Draft saved</span>
          <span className="rounded-full bg-[#1d1d1d] px-3 py-1 text-[#8f8f8f]">Send</span>
        </div>
      </div>
    </div>
  ),
  "typewriter-swap": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2 p-3`}>
        <div className="flex h-10 items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 font-mono text-[13px]">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#8f8f8f" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap text-[#ededed]">
            <TypewriterSwap
              phrases={["invoices from March 2026", "invoices from last quarter", "invoices from Acme Corp", "invoices overdue by 30 days"]}
              className="whitespace-nowrap"
            />
          </span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0 text-xs">
          {invoices.map((row) => (
            <li key={row.id} className="flex h-8 items-center gap-2.5 rounded-md px-2 text-[#a1a1a1]">
              <Doc />
              <span className="font-mono text-[11px] text-[#ededed]">{row.id}</span>
              <span className="min-w-0 flex-1 truncate">{row.who}</span>
              <span className="tabular-nums">{row.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
  "ticker-vertical": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-1.5 p-2.5`}>
        <div className="flex items-center justify-between px-1 text-[11px] leading-[18px]">
          <span className="flex items-center gap-1.5 font-semibold tracking-[0.04em]">
            <span className="rounded bg-[#ff4d4d] px-1.5 py-px text-[9px] font-bold leading-[14px] text-white">LIVE</span>
            Market wire
          </span>
          <span className="text-[#6b6b6b]">Hover to pause</span>
        </div>
        <TickerVertical items={wire} rows={5} rowHeight={28} speed={22} aria-label="Market headlines" />
      </div>
    </div>
  ),
  "loader-fill-text": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-3 px-4 py-6`}>
        <div className="font-grotesk">
          <LoaderFillText text="Fernhill" size={46} color="#3ecf8e" />
        </div>
        <p className="m-0 font-mono text-[11px] leading-4 text-[#8f8f8f]">Syncing 3 of 8 workspaces</p>
      </div>
    </div>
  ),
  "loader-line-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2 p-4`}>
        <p className="m-0 font-mono text-[10px] uppercase leading-4 tracking-[0.12em] text-[#8f8f8f]">Report / Retention</p>
        <div className="font-sans text-base">
          <LoaderLineReveal title="Q3 Retention Review" rows={2} />
        </div>
      </div>
    </div>
  ),
  "loader-jumping-dots": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-3 px-4 py-5`}>
        <LoaderJumpingDots size={18} height={34} color="#2f7bff" />
        <div className="text-center">
          <p className="m-0 font-display text-[15px] font-semibold uppercase leading-5 tracking-[0.14em]">Loading assets</p>
          <p className="m-0 mt-1 font-mono text-[11px] leading-4 text-[#8f8f8f]">212 of 480 textures</p>
        </div>
      </div>
    </div>
  ),
  "loader-dots-pulse": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2.5 p-3.5`}>
        <div className="flex items-end gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#7a4a3b] text-[10px] font-semibold text-white">SK</span>
          <div className="max-w-[240px] rounded-2xl rounded-bl-md bg-[#1d1d1d] px-3 py-2 text-[13px] leading-[18px]">
            Pulling the retention numbers now, give me a minute.
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#7a4a3b] text-[10px] font-semibold text-white">SK</span>
          <div className="rounded-2xl rounded-bl-md bg-[#1d1d1d] px-3 py-2.5 text-xs text-[#a1a1a1]">
            <LoaderDotsPulse size={6} label="Sam is typing" />
          </div>
        </div>
        <div className="flex h-9 items-center rounded-lg border border-[#262626] bg-[#0a0a0a] px-3 text-xs text-[#6b6b6b]">Reply to Sam</div>
      </div>
    </div>
  ),
};

import type { ReactNode } from "react";
import { ButtonHoldShred } from "@/registry/hyperblur/button-hold-shred";
import { ButtonSlideDelete } from "@/registry/hyperblur/button-slide-delete";
import { ButtonTrashLid } from "@/registry/hyperblur/button-trash-lid";
import { ButtonSafetyCover } from "@/registry/hyperblur/button-safety-cover";
import { ButtonTypeConfirm } from "@/registry/hyperblur/button-type-confirm";
import { ButtonDeleteUndo } from "@/registry/hyperblur/button-delete-undo";
import { ButtonCheckDraw } from "@/registry/hyperblur/button-check-draw";
import { ButtonShiftArm } from "@/registry/hyperblur/button-shift-arm";
import { ButtonCountdownAbort } from "@/registry/hyperblur/button-countdown-abort";
import { ButtonArchiveDiscard } from "@/registry/hyperblur/button-archive-discard";
import { ButtonSwipeDissolve } from "@/registry/hyperblur/button-swipe-dissolve";
import { ButtonIrreversible } from "@/registry/hyperblur/button-irreversible";

const root = "flex h-full w-full items-center justify-center px-4";
const card = "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]";

export const xdDemos: Record<string, ReactNode> = {
  "button-hold-shred": (
    <div className={root}>
      <div className={`${card} gap-3 pb-9 font-sans`}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#2a2a2a] bg-[#161616] font-mono text-[9px] font-semibold text-[#7fb3ff]">CSV</span>
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-[13px] font-medium">payroll-export-oct.csv</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">2.4 MB · contains salary data</p>
          </div>
          <span className="rounded-full border border-[#3a1f20] bg-[#1a0d0e] px-2 py-0.5 text-[10px] text-[#ff9a9e]">Sensitive</span>
        </div>
        <ButtonHoldShred size="sm" className="w-full">Hold to shred file</ButtonHoldShred>
      </div>
    </div>
  ),
  "button-slide-delete": (
    <div className={root}>
      <div className={`${card} items-center gap-3 font-grotesk`}>
        <div className="flex w-full items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1a1a1a] text-[#a1a1a1]">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
              <path d="M11 18.5h2" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[14px] font-semibold tracking-tight">iPhone 15 Pro</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">Lisbon · last active 2 min ago</p>
          </div>
        </div>
        <ButtonSlideDelete label="Slide to remove device" doneLabel="Device removed" />
      </div>
    </div>
  ),
  "button-trash-lid": (
    <div className={root}>
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#b45309] text-[11px] font-bold text-white">JM</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="m-0 text-[13px] font-semibold">Jonas Meyer</p>
              <span className="text-[10px] text-[#737373]">Tue 14:02</span>
            </div>
            <p className="m-0 truncate text-[12px] text-[#a1a1a1]">Your Figma trial ends in 3 days</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#1f1f1f] pt-3">
          <div className="flex gap-1.5 text-[#8f8f8f]">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#262626]">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" /></svg>
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#262626]">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" /></svg>
            </span>
          </div>
          <ButtonTrashLid size="sm" />
        </div>
      </div>
    </div>
  ),
  "button-safety-cover": (
    <div className={root}>
      <div className={`${card} gap-3 pt-6 font-mono`}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#ededed]">billing-api</span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#3a1f20] bg-[#1a0d0e] px-2 py-0.5 text-[10px] text-[#ff9a9e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            production
          </span>
        </div>
        <p className="m-0 font-sans text-[11px] leading-snug text-[#8f8f8f]">Removes 3 services, 12 env vars and the custom domain api.northwind.io.</p>
        <ButtonSafetyCover size="sm" className="w-full font-sans" />
      </div>
    </div>
  ),
  "button-type-confirm": (
    <div className={root}>
      <div className={`${card} gap-2 font-sans`}>
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#2a1214] text-[#ff8a8f]">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4M12 17v.01" /></svg>
          </span>
          <p className="m-0 text-[13px] font-semibold">Delete repository</p>
        </div>
        <ButtonTypeConfirm hint="Removes issues, wikis and 214 releases. Type" />
      </div>
    </div>
  ),
  "button-delete-undo": (
    <div className={root}>
      <div className={`${card} gap-2.5 font-sans`}>
        <div className="flex flex-col gap-1.5">
          {[
            ["Stripe", "Your October invoice is ready"],
            ["Linear", "4 issues assigned to you"],
            ["Notion", "Weekly digest for Product"],
          ].map(([from, subject]) => (
            <div key={from} className="flex items-center gap-2.5 rounded-lg bg-[#151515] px-2.5 py-1.5">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-[4px] bg-[#ef4444] text-white">
                <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <span className="w-12 shrink-0 text-[12px] font-semibold">{from}</span>
              <span className="truncate text-[11px] text-[#8f8f8f]">{subject}</span>
            </div>
          ))}
        </div>
        <ButtonDeleteUndo />
      </div>
    </div>
  ),
  "button-check-draw": (
    <div className={root}>
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-tight">Team members</span>
          <span className="text-[11px] text-[#737373]">8 of 10 seats</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[#1f1f1f] bg-[#141414] p-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#38bdf8] to-[#1d4ed8] text-[12px] font-bold text-white">ML</span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[13px] font-medium">Marcus Lee</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">Editor · joined March</p>
          </div>
          <ButtonCheckDraw size="sm">Remove</ButtonCheckDraw>
        </div>
      </div>
    </div>
  ),
  "button-shift-arm": (
    <div className={root}>
      <div className={`${card} gap-2.5 font-mono`}>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[12px] text-[#ededed]">feature/checkout-v2</span>
          <span className="shrink-0 rounded-full border border-[#2a2a2a] px-2 py-0.5 text-[10px] text-[#a78bfa]">merged</span>
        </div>
        <span className="font-sans text-[11px] text-[#8f8f8f]">47 commits · merged into main 3 days ago</span>
        <ButtonShiftArm size="sm" className="mt-1 w-full font-sans" />
      </div>
    </div>
  ),
  "button-countdown-abort": (
    <div className={root}>
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">Remote actions</span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#8f8f8f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            Online · 82%
          </span>
        </div>
        <ButtonCountdownAbort className="w-full" />
      </div>
    </div>
  ),
  "button-archive-discard": (
    <div className={root}>
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#1f1f1f] px-1.5 py-0.5 font-mono text-[10px] text-[#a1a1a1]">Draft</span>
          <span className="truncate text-[13px] font-semibold">Proposal for Northwind</span>
        </div>
        <p className="m-0 line-clamp-2 text-[12px] leading-relaxed text-[#8f8f8f]">
          Hi Elena, attached is the revised scope with the analytics add-on and the new delivery dates for Q1.
        </p>
        <ButtonArchiveDiscard />
      </div>
    </div>
  ),
  "button-swipe-dissolve": (
    <div className={root}>
      <div className={`${card} gap-2 p-3 font-sans`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[12px] font-semibold">Inbox</span>
          <span className="text-[10px] text-[#737373]">Swipe left to delete</span>
        </div>
        <ButtonSwipeDissolve />
        <ButtonSwipeDissolve title="Daniel Okafor" subtitle="Lunch Thursday? The new ramen place opened" meta="Yesterday" initials="DO" avatarColor="#0ea5e9" />
      </div>
    </div>
  ),
  "button-irreversible": (
    <div className={root}>
      <ButtonIrreversible
        className="font-sans"
        consequences={["4 projects and 1,286 files erased", "Pro plan ends today, no refund"]}
      />
    </div>
  ),
};

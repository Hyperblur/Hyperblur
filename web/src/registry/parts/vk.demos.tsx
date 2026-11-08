import type { ReactNode } from "react";
import { LoaderOrbitSync } from "@/registry/hyperblur/loader-orbit-sync";
import { LoaderFileMorph } from "@/registry/hyperblur/loader-file-morph";
import { LoaderSkeletonFeed } from "@/registry/hyperblur/loader-skeleton-feed";
import { LoaderLiquidProgress } from "@/registry/hyperblur/loader-liquid-progress";
import { LoaderTickRing } from "@/registry/hyperblur/loader-tick-ring";
import { LoaderDotField } from "@/registry/hyperblur/loader-dot-field";
import { LoaderStatusFeed } from "@/registry/hyperblur/loader-status-feed";
import { LoaderGaugeCounter } from "@/registry/hyperblur/loader-gauge-counter";
import { LoaderStackBuild } from "@/registry/hyperblur/loader-stack-build";
import { LoaderDeviceScan } from "@/registry/hyperblur/loader-device-scan";
import { LoaderInfinityTrace } from "@/registry/hyperblur/loader-infinity-trace";
import { LoaderButtonProgress } from "@/registry/hyperblur/loader-button-progress";

const frame = "flex h-full w-full items-center justify-center px-4";
const panel =
  "box-border w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] text-left text-[#ededed] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

function Check({ color = "#3ecf8e" }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export const vkDemos: Record<string, ReactNode> = {
  "loader-orbit-sync": (
    <div className={frame}>
      <div className={`${panel} flex items-center gap-4 p-4 font-sans`}>
        <LoaderOrbitSync size={88} />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Workspace &middot; Northwind</p>
          <p className="m-0 mt-1 text-[15px] font-semibold leading-tight">Syncing your tools</p>
          <div className="mt-3 flex flex-col gap-1.5 text-[11.5px]">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-[#5e6ad2]" />Issues</span>
              <span className="flex items-center gap-1 text-[#8f8f8f]"><Check />412</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-[#2a2a2a] ring-1 ring-inset ring-[#3a3a3a]" />Repositories</span>
              <span className="text-[#7fb3ff]">18 of 31</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-gradient-to-br from-[#f24e1e] to-[#a259ff]" />Design files</span>
              <span className="text-[#5f5f5f]">Queued</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-file-morph": (
    <div className={frame}>
      <div className={`${panel} p-4 font-grotesk`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">Export launch kit</span>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 text-[10px] text-[#a1a1a1]">.zip</span>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <LoaderFileMorph size={60} label="Packing" />
          <div className="min-w-0 flex-1 text-[11.5px] leading-[1.55] text-[#8f8f8f]">
            <p className="m-0 text-[#ededed]">48 files &middot; 312 MB</p>
            <p className="m-0">Press release, 21 images,</p>
            <p className="m-0">2 voice tracks, embed code</p>
            <p className="m-0 mt-1 text-[10.5px] text-[#5f5f5f]">We will email the link to maya@northwind.io</p>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-skeleton-feed": (
    <div className={frame}>
      <div className={`${panel} px-3 pb-1 pt-2.5 font-sans`}>
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="font-semibold text-[#ededed]">Inbox</span>
            <span className="text-[#5f5f5f]">Mentions</span>
            <span className="text-[#5f5f5f]">Archive</span>
          </div>
          <span className="text-[10px] text-[#8f8f8f]">Fetching 24 new</span>
        </div>
        <LoaderSkeletonFeed variant="inbox" rows={3} />
      </div>
    </div>
  ),
  "loader-liquid-progress": (
    <div className={frame}>
      <div className={`${panel} p-4 font-sans`}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-gradient-to-br from-[#1e2a44] to-[#121826] ring-1 ring-inset ring-[#2a3550]">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#7fb3ff" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3.5" width="9" height="9" rx="1.6" />
              <path d="M11 7l3-1.8v5.6L11 9" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-[13px] font-medium">launch-film-final.mov</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">1.8 GB &middot; to Campaigns / Autumn</p>
          </div>
        </div>
        <LoaderLiquidProgress className="mt-4" height={28} />
        <div className="mt-2.5 flex justify-between text-[10.5px] text-[#8f8f8f]">
          <span>12.4 MB/s</span>
          <span>Keep this tab open</span>
        </div>
      </div>
    </div>
  ),
  "loader-tick-ring": (
    <div className={frame}>
      <div className={`${panel} flex items-center gap-4 p-3.5 font-grotesk`}>
        <LoaderTickRing size={118} />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[14px] font-semibold leading-tight">storefront-web</p>
          <p className="m-0 mt-1 truncate font-mono text-[10.5px] text-[#8f8f8f]">main &middot; 8f3c2e1</p>
          <p className="m-0 mt-2.5 text-[11px] leading-[1.5] text-[#a1a1a1]">Fix tax rounding on the cart page</p>
          <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px]">
            <span className="rounded-full bg-[#2f7bff]/15 px-2 py-0.5 text-[#7fb3ff]">Production</span>
            <span className="text-[#5f5f5f]">by Lena Park</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-dot-field": (
    <div className={frame}>
      <div className={`${panel} p-4 font-grotesk`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="m-0 text-[13px] font-semibold">Composing voiceover</p>
            <p className="m-0 mt-0.5 text-[11px] text-[#8f8f8f]">Narrator: Iris, warm &middot; 0:42</p>
          </div>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 text-[10px] text-[#a1a1a1]">EN-US</span>
        </div>
        <div className="mt-4 flex justify-center">
          <LoaderDotField cols={21} rows={5} dot={5} gap={8} />
        </div>
        <p className="m-0 mt-4 truncate text-center text-[11px] text-[#5f5f5f]">&ldquo;Every great trip starts with a single list.&rdquo;</p>
      </div>
    </div>
  ),
  "loader-status-feed": (
    <div className={frame}>
      <div className={`${panel} font-sans`}>
        <div className="flex items-center justify-between border-b border-[#1f1f1f] px-3.5 py-2.5">
          <span className="truncate text-[12.5px] font-semibold">Fix rounding in checkout totals</span>
          <span className="flex flex-none items-center gap-1.5 rounded-full bg-[#2f7bff]/12 px-2 py-0.5 text-[10px] text-[#7fb3ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7fb3ff]" />
            Working
          </span>
        </div>
        <div className="px-3.5 pb-3 pt-2 font-mono">
          <LoaderStatusFeed visible={4} />
        </div>
      </div>
    </div>
  ),
  "loader-gauge-counter": (
    <div className={frame}>
      <div className={`${panel} flex items-center gap-3 p-3.5 font-sans`}>
        <LoaderGaugeCounter size={140} detail="18.4 MB/s" />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Restore</p>
          <p className="m-0 mt-1 text-[14px] font-semibold leading-tight">orders-db snapshot</p>
          <p className="m-0 mt-2 text-[11px] leading-[1.55] text-[#a1a1a1]">Nov 6, 23:00 UTC</p>
          <p className="m-0 text-[11px] leading-[1.55] text-[#a1a1a1]">42.7 GB &middot; eu-west-1</p>
          <p className="m-0 mt-2 text-[10.5px] text-[#5f5f5f]">Writes are paused</p>
        </div>
      </div>
    </div>
  ),
  "loader-stack-build": (
    <div className={frame}>
      <div className={`${panel} flex items-center gap-3 p-3.5 font-mono`}>
        <LoaderStackBuild size={98} />
        <div className="min-w-0 flex-1 text-[10.5px] leading-[1.75]">
          <p className="m-0 mb-1 font-sans text-[13px] font-semibold text-[#ededed]">api:2.14.0</p>
          <p className="m-0 truncate text-[#8f8f8f]">FROM node:22-alpine</p>
          <p className="m-0 truncate text-[#8f8f8f]">COPY package*.json ./</p>
          <p className="m-0 truncate text-[#8f8f8f]">RUN npm ci --omit=dev</p>
          <p className="m-0 truncate text-[#8f8f8f]">COPY . .</p>
          <p className="m-0 truncate text-[#7fb3ff]">RUN npm run build</p>
        </div>
      </div>
    </div>
  ),
  "loader-device-scan": (
    <div className={frame}>
      <div className={`${panel} flex flex-col items-center px-4 pb-3 pt-3.5 font-sans`}>
        <div className="flex w-full items-center justify-between">
          <span className="text-[13px] font-semibold">Add a speaker</span>
          <span className="text-[10.5px] text-[#8f8f8f]">Living room</span>
        </div>
        <LoaderDeviceScan className="mt-2" size={160} devices={4} seed={3} />
        <p className="m-0 mt-1.5 text-[10.5px] text-[#5f5f5f]">Hold the pairing button for 3 seconds</p>
      </div>
    </div>
  ),
  "loader-infinity-trace": (
    <div className={frame}>
      <div className={`${panel} p-4 font-sans`}>
        <div className="flex items-center justify-between text-[11px] text-[#8f8f8f]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5a524]" />
            Live board &middot; Q4 roadmap
          </span>
          <span>3 editors</span>
        </div>
        <div className="mt-3 flex items-center gap-4 rounded-xl border border-[#262626] bg-[#0c0c0c] px-4 py-3">
          <LoaderInfinityTrace size={92} />
          <div className="min-w-0">
            <p className="m-0 text-[13.5px] font-semibold">Reconnecting</p>
            <p className="m-0 mt-0.5 text-[11px] text-[#8f8f8f]">Attempt 3 of 5</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">Your edits are saved locally</p>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-button-progress": (
    <div className={frame}>
      <div className={`${panel} p-4 font-sans`}>
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="m-0 text-[13.5px] font-semibold">Ready to ship v2.14.0</p>
            <p className="m-0 mt-0.5 truncate font-mono text-[10.5px] text-[#8f8f8f]">7 commits &middot; checks passed</p>
          </div>
          <span className="flex flex-none items-center gap-1 rounded-full border border-[#1f3a2c] bg-[#0f1f17] px-2 py-0.5 text-[10px] text-[#3ecf8e]">
            <Check />
            12/12
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] leading-[1.45] text-[#8f8f8f]">
            Target
            <br />
            <span className="text-[#ededed]">Production</span>
          </span>
          <LoaderButtonProgress autoPlay width={196} />
        </div>
      </div>
    </div>
  ),
};

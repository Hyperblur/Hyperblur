import type { ReactNode } from "react";
import { LoaderOrbit } from "@/registry/hyperblur/loader-orbit";
import { LoaderWaveDots } from "@/registry/hyperblur/loader-wave-dots";
import { LoaderEqualizer } from "@/registry/hyperblur/loader-equalizer";
import { LoaderRingGradient } from "@/registry/hyperblur/loader-ring-gradient";
import { LoaderProgressStripes } from "@/registry/hyperblur/loader-progress-stripes";
import { LoaderPercentage } from "@/registry/hyperblur/loader-percentage";
import { LoaderMorphShapes } from "@/registry/hyperblur/loader-morph-shapes";
import { LoaderTyping } from "@/registry/hyperblur/loader-typing";
import { LoaderRadar } from "@/registry/hyperblur/loader-radar";
import { LoaderPulseRings } from "@/registry/hyperblur/loader-pulse-rings";
import { LoaderCube } from "@/registry/hyperblur/loader-cube";
import { LoaderTextScramble } from "@/registry/hyperblur/loader-text-scramble";

const card =
  "box-border flex w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]";

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#3ecf8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2f7bff]" aria-hidden="true" />;
}

export const qcDemos: Record<string, ReactNode> = {
  "loader-orbit": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-4`}>
        <LoaderOrbit size={64} />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-sm font-semibold leading-5">Syncing workspace</p>
          <p className="m-0 mt-0.5 text-xs leading-4 text-[#8f8f8f]">Pulling 3 sources into Northwind</p>
          <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0 text-xs">
            <li className="flex items-center gap-2 text-[#a1a1a1]"><Check />Calendar</li>
            <li className="flex items-center gap-2 text-[#a1a1a1]"><Check />Documents</li>
            <li className="flex items-center gap-2 text-[#ededed]"><Dot />Issues, 214 of 380</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "loader-wave-dots": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col gap-3 font-grotesk`}>
        <div className="flex h-9 items-center gap-2 rounded-lg border border-[#262626] bg-[#0a0a0a] px-3 text-sm">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#8f8f8f" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <span className="truncate">best espresso grinder</span>
        </div>
        <div className="flex gap-1.5 text-[11px] text-[#a1a1a1]">
          <span className="rounded-full border border-[#262626] px-2 py-0.5">Under $200</span>
          <span className="rounded-full border border-[#262626] px-2 py-0.5">Burr</span>
          <span className="rounded-full border border-[#262626] px-2 py-0.5">Electric</span>
        </div>
        <div className="flex justify-center py-1.5">
          <LoaderWaveDots size={72} label="Searching 2,400 reviews" />
        </div>
      </div>
    </div>
  ),
  "loader-equalizer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col gap-3`}>
        <div className="flex items-center gap-3">
          <div
            className="h-16 w-16 shrink-0 rounded-lg"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, #ffb36b 0%, transparent 45%), linear-gradient(145deg, #3b2a6b, #14102b)",
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-sans m-0 truncate text-2xl leading-7">Midnight Drive</p>
            <p className="font-grotesk m-0 text-xs uppercase tracking-[0.08em] text-[#8f8f8f]">Velvet Static</p>
          </div>
          <LoaderEqualizer size={26} />
        </div>
        <div className="font-grotesk flex items-center gap-2 text-[11px] text-[#8f8f8f]">
          <span className="tabular-nums">1:42</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#262626]">
            <div className="h-full w-[38%] rounded-full bg-[#ededed]" />
          </div>
          <span className="tabular-nums">Buffering</span>
        </div>
      </div>
    </div>
  ),
  "loader-ring-gradient": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col items-center gap-2 py-5 font-grotesk`}>
        <LoaderRingGradient size={52} thickness={5} />
        <p className="m-0 mt-1 text-sm font-semibold leading-5">Processing payment</p>
        <p className="m-0 text-xs leading-4 text-[#8f8f8f]">Visa ending 4242 · $128.40</p>
        <p className="m-0 text-[11px] leading-4 text-[#6b6b6b]">Keep this window open</p>
      </div>
    </div>
  ),
  "loader-progress-stripes": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col gap-3`}>
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#262626] bg-[#171717]">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#7fb3ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 1.5h5l3 3v10H4z" />
              <path d="M9 1.5v3h3" />
              <path d="M7 7h2M7 9h2M7 11h2" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-medium leading-5">brand-assets-v3.zip</p>
            <p className="m-0 text-xs leading-4 text-[#8f8f8f]">48.2 MB · Design team</p>
          </div>
        </div>
        <LoaderProgressStripes value={64} label="Uploading, 31 of 48 MB" />
        <div className="flex justify-end">
          <span className="rounded-full border border-[#262626] px-3 py-1 text-xs text-[#a1a1a1]">Cancel</span>
        </div>
      </div>
    </div>
  ),
  "loader-percentage": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-4 font-grotesk`}>
        <LoaderPercentage size={100} thickness={6} />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-sm font-semibold leading-5">Installing update</p>
          <p className="m-0 mt-0.5 text-xs leading-4 text-[#8f8f8f]">Hyperblur Desktop 2.4.0</p>
          <ul className="font-mono m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0 text-[11px]">
            <li className="flex items-center gap-2 text-[#a1a1a1]"><Check />Downloaded</li>
            <li className="flex items-center gap-2 text-[#a1a1a1]"><Check />Verified</li>
            <li className="flex items-center gap-2 text-[#ededed]"><Dot />Installing</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "loader-morph-shapes": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-5`}>
        <div className="shrink-0 px-1">
          <LoaderMorphShapes size={64} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-sans m-0 text-[26px] leading-[1.05]">Building your workspace</p>
          <p className="m-0 mt-1.5 text-xs leading-4 text-[#8f8f8f]">Templates, roles and a sample project.</p>
          <div className="mt-2.5 flex gap-1.5 text-[11px] text-[#a1a1a1]">
            <span className="rounded-full border border-[#262626] px-2 py-0.5">Step 2 of 3</span>
            <span className="rounded-full border border-[#262626] px-2 py-0.5">~10 s</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-typing": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col gap-2.5 text-[13px]`}>
        <div className="flex items-center gap-2 border-b border-[#262626] pb-2 text-xs text-[#8f8f8f]">
          <span className="text-[#ededed]">#design-crit</span>
          <span>· 4 online</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2a2a2a] text-[11px] font-semibold">JK</span>
          <span className="rounded-2xl rounded-bl-md bg-[#1f1f1f] px-3 py-1.5 leading-5">Pushed the new tokens, can you check?</span>
        </div>
        <div className="flex justify-end">
          <span className="rounded-2xl rounded-br-md bg-[#2f7bff] px-3 py-1.5 leading-5 text-white">On it, one sec</span>
        </div>
        <LoaderTyping name="Priya Nair" size={30} />
      </div>
    </div>
  ),
  "loader-radar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-4`}>
        <LoaderRadar size={104} />
        <div className="min-w-0 flex-1">
          <p className="font-mono m-0 text-[11px] uppercase tracking-[0.1em] text-[#7fb3ff]">Scanning nearby</p>
          <ul className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0 text-xs">
            <li className="flex items-center justify-between gap-2"><span className="truncate">Studio Display</span><span className="font-mono text-[11px] text-[#8f8f8f]">-42 dBm</span></li>
            <li className="flex items-center justify-between gap-2"><span className="truncate">Maya&apos;s iPhone</span><span className="font-mono text-[11px] text-[#8f8f8f]">-58 dBm</span></li>
            <li className="flex items-center justify-between gap-2"><span className="truncate">Kitchen speaker</span><span className="font-mono text-[11px] text-[#8f8f8f]">-71 dBm</span></li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "loader-pulse-rings": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <LoaderPulseRings size={96} />
        <p className="font-display m-0 text-sm font-bold uppercase tracking-[0.2em] text-[#ededed]">Finding a match</p>
        <p className="font-mono m-0 text-[11px] text-[#8f8f8f]">Ranked Duo · est. wait 0:25</p>
      </div>
    </div>
  ),
  "loader-cube": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-col items-center gap-3 font-grotesk`}>
        <div className="flex w-full items-center justify-between text-xs">
          <span className="rounded-md border border-[#262626] bg-[#171717] px-2 py-0.5 text-[#a1a1a1]">chair_v2.glb</span>
          <span className="text-[#8f8f8f]">3.4 MB</span>
        </div>
        <LoaderCube size={36} />
        <p className="m-0 text-xs leading-4 text-[#a1a1a1]">Optimizing 128k triangles</p>
      </div>
    </div>
  ),
  "loader-text-scramble": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left">
        <div className="flex items-center gap-1.5 border-b border-[#262626] bg-[#111111] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="font-mono ml-2 text-[11px] text-[#8f8f8f]">~/northwind</span>
        </div>
        <div className="font-mono flex flex-col gap-1 p-3 text-xs leading-5">
          <span className="text-[#ededed]">$ npm run build</span>
          <span className="text-[#8f8f8f]">&gt; next build</span>
          <span className="flex items-center gap-2 text-[#a1a1a1]"><Check />Compiled 42 modules</span>
          <span className="flex items-center gap-2 pt-1">
            <span className="text-[#2f7bff]">&gt;</span>
            <LoaderTextScramble size={18} />
          </span>
        </div>
      </div>
    </div>
  ),
};

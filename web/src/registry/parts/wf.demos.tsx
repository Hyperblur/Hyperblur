import type { ReactNode } from "react";
import { MicroRockerSwitch } from "@/registry/hyperblur/micro-rocker-switch";
import { MicroSlideUnlock } from "@/registry/hyperblur/micro-slide-unlock";
import { MicroSpringStepper } from "@/registry/hyperblur/micro-spring-stepper";
import { MicroVolumeKnob } from "@/registry/hyperblur/micro-volume-knob";
import { MicroReactionPicker } from "@/registry/hyperblur/micro-reaction-picker";
import { MicroCopyChip } from "@/registry/hyperblur/micro-copy-chip";
import { MicroPasswordEye } from "@/registry/hyperblur/micro-password-eye";
import { MicroHorizonToggle } from "@/registry/hyperblur/micro-horizon-toggle";
import { MicroNotifyBell } from "@/registry/hyperblur/micro-notify-bell";
import { MicroQuantityPicker } from "@/registry/hyperblur/micro-quantity-picker";
import { MicroHalfStarRating } from "@/registry/hyperblur/micro-half-star-rating";
import { MicroProgressPill } from "@/registry/hyperblur/micro-progress-pill";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]";

export const wfDemos: Record<string, ReactNode> = {
  "micro-rocker-switch": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#7a7a7a]">Studio rack · bay 2</span>
          <span className="font-mono text-[10.5px] text-[#5c5c5c]">230V</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <MicroRockerSwitch label="Monitor amp" defaultChecked size={46} />
          <MicroRockerSwitch label="Fan" size={46} accent="#7fb3ff" showStatus={false} />
        </div>
      </div>
    </div>
  ),
  "micro-slide-unlock": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[320px] flex-col items-center gap-4 rounded-[28px] border border-[#262626] bg-[radial-gradient(120%_90%_at_50%_0%,#18233a_0%,#0b0b0b_70%)] px-5 py-5 text-[#ededed]">
        <div className="text-center">
          <p className="font-grotesk m-0 text-[34px] font-medium leading-none tracking-[-0.03em]">9:41</p>
          <p className="m-0 mt-1.5 text-[11px] text-[#8f8f8f]">Saturday, November 8</p>
        </div>
        <MicroSlideUnlock />
      </div>
    </div>
  ),
  "micro-spring-stepper": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-grotesk m-0 text-[15px] font-semibold">Table at Osteria Lume</p>
            <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Fri, Nov 14 · 8:30 PM</p>
          </div>
          <span className="rounded-full bg-[#16251a] px-2 py-0.5 text-[10px] font-medium text-[#6fdc8c]">Open</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] leading-4 text-[#6f6f6f]">Drag the pill
            <br />to count faster</span>
          <MicroSpringStepper defaultValue={4} />
        </div>
      </div>
    </div>
  ),
  "micro-volume-knob": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-row items-center gap-4 py-3`}>
        <MicroVolumeKnob size={118} defaultValue={64} label="Master" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="font-mono m-0 text-[10px] uppercase tracking-[0.1em] text-[#6f6f6f]">Now playing</p>
          <p className="font-grotesk m-0 truncate text-[14px] font-semibold">Low Tide Signals</p>
          <p className="m-0 truncate text-[11px] text-[#8f8f8f]">Harbor Lights · 3:42</p>
          <div className="mt-1 flex h-6 items-end gap-[3px]">
            {[9, 14, 20, 12, 22, 16, 8, 18, 11, 6].map((h, i) => (
              <span key={i} className="w-[5px] rounded-sm bg-[#2f7bff]" style={{ height: h, opacity: 0.35 + (i % 4) * 0.15 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "micro-reaction-picker": (
    <div className="flex h-full w-full items-end justify-center px-4 pb-3">
      <div className={`${card} gap-2.5 pt-3`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#ff8a5b,#c4458a)] text-[11px] font-semibold">MR</span>
          <div className="min-w-0">
            <p className="m-0 text-[12.5px] font-semibold">Maya Rios</p>
            <p className="m-0 truncate text-[11px] text-[#8f8f8f]">Shipped the new onboarding flow today.</p>
          </div>
        </div>
        <MicroReactionPicker count={23} idle />
      </div>
    </div>
  ),
  "micro-copy-chip": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div>
          <p className="font-grotesk m-0 text-[16px] font-semibold tracking-[-0.01em]">Install the effect</p>
          <p className="m-0 mt-1 text-[11.5px] text-[#8f8f8f]">One command adds the file to your project.</p>
        </div>
        <MicroCopyChip value="npx shadcn@latest add https://hyperblur.dev/r/aurora.json" />
      </div>
    </div>
  ),
  "micro-password-eye": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <p className="m-0 text-[15px] font-semibold">Welcome back</p>
        <MicroPasswordEye defaultValue="harbor-71-lights" autoComplete="off" hint="Hover the field, the eye follows you." />
      </div>
    </div>
  ),
  "micro-horizon-toggle": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-grotesk m-0 text-[15px] font-semibold">Appearance</p>
            <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Click or drag the sun across the sky.</p>
          </div>
          <MicroHorizonToggle size={46} />
        </div>
        <div className="flex gap-2">
          {["System", "Sunset at 6:12 PM"].map((t) => (
            <span key={t} className="rounded-full border border-[#2a2a2a] px-2.5 py-1 text-[10.5px] text-[#a1a1a1]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
  "micro-notify-bell": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#2f7bff] font-display text-[12px] font-bold">N</span>
            <span className="text-[13px] font-semibold">Northwind</span>
          </div>
          <MicroNotifyBell idle defaultCount={2} size={40} />
        </div>
        <div className="flex flex-col gap-1.5 border-t border-[#1f1f1f] pt-3">
          <p className="m-0 text-[12px] text-[#d6d6d6]">Deploy #482 finished in 41s</p>
          <p className="m-0 text-[11px] text-[#6f6f6f]">Drag the bell sideways to swing it.</p>
        </div>
      </div>
    </div>
  ),
  "micro-quantity-picker": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-row items-center gap-3`}>
        <span className="h-[72px] w-[64px] flex-none rounded-xl bg-[radial-gradient(circle_at_35%_30%,#f3d9b8,#b8835a_60%,#6b4630)]" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div>
            <p className="font-grotesk m-0 truncate text-[14px] font-semibold">Ceramic pour-over</p>
            <p className="m-0 text-[11.5px] text-[#8f8f8f]">Sand glaze · $38</p>
          </div>
          <MicroQuantityPicker defaultValue={0} />
        </div>
      </div>
    </div>
  ),
  "micro-half-star-rating": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div>
          <p className="m-0 text-[14px] font-semibold">How was your stay?</p>
          <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Casa Verde, Lisbon · 3 nights</p>
        </div>
        <MicroHalfStarRating defaultValue={4.5} size={28} />
      </div>
    </div>
  ),
  "micro-progress-pill": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div className="flex items-center justify-between">
          <p className="font-grotesk m-0 text-[14px] font-semibold">Brand assets</p>
          <span className="font-mono text-[10.5px] text-[#6f6f6f]">48.2 MB</span>
        </div>
        <MicroProgressPill autoPlay speed={14} label="Uploading 3 files" />
      </div>
    </div>
  ),
};

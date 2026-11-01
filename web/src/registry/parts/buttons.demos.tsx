import type { ReactNode } from "react";
import { ShimmerButton } from "@/registry/hyperblur/shimmer-button";
import { BorderBeamButton } from "@/registry/hyperblur/border-beam-button";
import { LiquidButton } from "@/registry/hyperblur/liquid-button";
import { IconMorphButton } from "@/registry/hyperblur/icon-morph-button";
import { ConfettiButton } from "@/registry/hyperblur/confetti-button";
import { PayButton } from "@/registry/hyperblur/pay-button";

export const buttonsDemos: Record<string, ReactNode> = {
  "shimmer-button": (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 px-4 text-center">
      <div>
        <div className="font-serif text-3xl leading-none text-white">Ship the quiet parts.</div>
        <div className="mt-2 font-grotesk text-xs text-white/50">Components you copy, own and never update.</div>
      </div>
      <div className="flex items-center gap-4">
        <ShimmerButton size="sm">Start building</ShimmerButton>
        <span className="font-grotesk text-xs text-white/55">Read the docs</span>
      </div>
    </div>
  ),
  "border-beam-button": (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <div>
        <div className="font-grotesk text-[11px] uppercase tracking-widest text-white/45">Team plan</div>
        <div className="mt-1 font-grotesk text-2xl font-medium leading-none text-white">
          $24<span className="text-sm font-normal text-white/50"> / seat</span>
        </div>
        <div className="mt-1.5 font-mono text-[11px] text-white/40">billed monthly</div>
      </div>
      <BorderBeamButton size="sm">Upgrade</BorderBeamButton>
    </div>
  ),
  "liquid-button": (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 px-4 text-center">
      <div>
        <div className="font-serif text-2xl leading-tight text-white">Letters from the lab</div>
        <div className="mt-1.5 font-mono text-[11px] text-white/45">one email a week, no spam</div>
      </div>
      <LiquidButton color="#19c3f5">Join the list</LiquidButton>
    </div>
  ),
  "icon-morph-button": (
    <div className="flex w-full max-w-sm flex-col gap-3 px-4">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
        <div className="font-mono text-xs text-white/85">hyperblur-kit-v2.zip</div>
        <div className="font-mono text-[11px] text-white/40">14.2 MB</div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <IconMorphButton icon="download" size="sm">Download</IconMorphButton>
        <IconMorphButton icon="external" color="#19c3f5" size="sm">Source</IconMorphButton>
      </div>
    </div>
  ),
  "confetti-button": (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <div>
        <div className="font-grotesk text-base font-medium leading-tight text-white">Ship v2.0 release</div>
        <div className="mt-1 font-mono text-[11px] text-white/45">5 of 5 checks passed</div>
      </div>
      <ConfettiButton size="sm" successLabel="Shipped!">Mark done</ConfettiButton>
    </div>
  ),
  "pay-button": (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-serif text-xl leading-none text-white">Aurora Pro</div>
          <div className="mt-1.5 font-mono text-[11px] text-white/45">annual, cancel anytime</div>
        </div>
        <div className="font-grotesk text-lg text-white/85">$29.00</div>
      </div>
      <PayButton amount="$29.00" brand="visa" size="sm" className="w-full" />
    </div>
  ),
};

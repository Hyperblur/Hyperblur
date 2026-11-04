import type { ReactNode } from "react";
import { EdgeGradualBlurDemo } from "@/registry/demos/edge-gradual-blur-demo";
import { CheckboxSpringDemo } from "@/registry/demos/checkbox-spring-demo";
import { MicroStatusMarkDemo } from "@/registry/demos/micro-status-mark-demo";
import { TooltipWarmDemo } from "@/registry/demos/tooltip-warm-demo";
import { BallCrystal } from "@/registry/hyperblur/ball-crystal";
import { LogoLoopBelt } from "@/registry/hyperblur/logo-loop-belt";
import { BorderStarOrbit } from "@/registry/hyperblur/border-star-orbit";
import { RadioJelly } from "@/registry/hyperblur/radio-jelly";

const deliveryOptions = [
  { value: "standard", label: "Standard, free (5 to 7 days)" },
  { value: "express", label: "Express, $6 (2 days)" },
  { value: "pickup", label: "Pick up at the studio" },
];

export const qrDemos: Record<string, ReactNode> = {
  "ball-crystal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border flex w-full max-w-[340px] items-center gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
        <BallCrystal size={132} accent="#7fb3ff" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Prism series</p>
          <p className="m-0 mt-1 text-lg font-semibold leading-6">Aurora Quartz</p>
          <p className="m-0 mt-1 text-xs leading-4 text-[#8f8f8f]">Cut in 80 facets. Turns to follow your cursor.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold">$240</span>
            <span className="rounded-full border border-[#262626] px-2 py-0.5 text-[10px] text-[#a1a1a1]">In stock</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "edge-gradual-blur": <EdgeGradualBlurDemo />,
  "logo-loop-belt": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] py-4 text-left text-[#ededed]">
        <p className="m-0 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Trusted by 2,400 teams</p>
        <LogoLoopBelt speed={36} secondRow hoverSpeed={0.15} fade={44} gap={10} />
      </div>
    </div>
  ),
  "border-star-orbit": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <BorderStarOrbit radius={20} duration={5} starSize={14} className="w-full max-w-[290px] text-left">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Pro plan</span>
          <span className="rounded-full border border-[#2a2a2a] px-2 py-0.5 text-[10px] text-[#a1a1a1]">Most popular</span>
        </div>
        <p className="m-0 mt-2 text-3xl font-semibold tracking-tight">
          $12<span className="text-sm font-normal text-[#8f8f8f]"> / month</span>
        </p>
        <p className="m-0 mt-1 text-xs leading-4 text-[#8f8f8f]">Unlimited projects, priority builds, and a custom domain.</p>
        <button
          type="button"
          className="mt-3 w-full cursor-pointer rounded-full border-0 bg-white py-2 text-[13px] font-semibold text-[#0a0a0a]"
        >
          Start free trial
        </button>
      </BorderStarOrbit>
    </div>
  ),
  "radio-jelly": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] px-3 py-3 text-left text-[#ededed]">
        <p className="m-0 px-2.5 pb-1 text-[11px] uppercase tracking-[0.12em] text-[#8f8f8f]">Delivery</p>
        <RadioJelly options={deliveryOptions} defaultValue="express" accent="#2f7bff" aria-label="Delivery method" />
      </div>
    </div>
  ),
  "checkbox-spring": <CheckboxSpringDemo />,
  "micro-status-mark": <MicroStatusMarkDemo />,
  "tooltip-warm": <TooltipWarmDemo />,
};

import type { ReactNode } from "react";
import { ButtonInkRipple } from "@/registry/hyperblur/button-ink-ripple";
import { ButtonBorderSpin } from "@/registry/hyperblur/button-border-spin";
import { ButtonTiltGlare } from "@/registry/hyperblur/button-tilt-glare";
import { ButtonUnderlineGrow } from "@/registry/hyperblur/button-underline-grow";
import { ButtonBubblesPop } from "@/registry/hyperblur/button-bubbles-pop";
import { ButtonIconSlideExpandDemo } from "@/registry/demos/button-icon-slide-expand-demo";
import { ButtonSplitHalvesDemo } from "@/registry/demos/button-split-halves-demo";
import { ButtonCountdownConfirmDemo } from "@/registry/demos/button-countdown-confirm-demo";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]";

export const yaDemos: Record<string, ReactNode> = {
  "button-ink-ripple": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Pro plan</p>
            <p className="m-0 mt-1.5 text-[26px] font-semibold leading-none tracking-tight">
              $108<span className="text-sm font-normal text-[#8f8f8f]"> / year</span>
            </p>
          </div>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 font-mono text-[10px] text-[#7fb3ff]">Save 25%</span>
        </div>
        <p className="m-0 text-xs leading-snug text-[#a1a1a1]">Unlimited projects, priority builds and team seats.</p>
        <div className="flex gap-2">
          <ButtonInkRipple idle className="flex-1">Start free trial</ButtonInkRipple>
          <ButtonInkRipple variant="outline">Plans</ButtonInkRipple>
        </div>
      </div>
    </div>
  ),
  "button-border-spin": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 border-[#1c1c1f] bg-[#09090a] font-mono`}>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] text-[#8f8f8f]">~/orbit-api</span>
        </div>
        <div className="text-[11px] leading-[1.7] text-[#a1a1a1]">
          <p className="m-0"><span className="text-[#7fb3ff]">$</span> hyperblur build</p>
          <p className="m-0">42 files compiled in 3.1s</p>
          <p className="m-0">edge network ready in 6 regions</p>
        </div>
        <div className="flex justify-center pt-1">
          <ButtonBorderSpin variant="dark">Deploy to production</ButtonBorderSpin>
        </div>
      </div>
    </div>
  ),
  "button-icon-slide-expand": <ButtonIconSlideExpandDemo />,
  "button-split-halves": <ButtonSplitHalvesDemo />,
  "button-countdown-confirm": <ButtonCountdownConfirmDemo />,
  "button-tilt-glare": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center justify-between gap-3 flex-row! border-[#1d2233] bg-[#0b0d14] p-5 font-grotesk`}>
        <div className="min-w-0">
          <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-[#7fb3ff]">Hyperblur Pro</p>
          <p className="m-0 mt-1.5 text-[30px] font-bold leading-none tracking-tight">
            $12<span className="text-sm font-normal text-[#8f8f8f]">/mo</span>
          </p>
          <p className="m-0 mt-2 text-[11px] text-[#a1a1a1]">Every effect and template.</p>
        </div>
        <ButtonTiltGlare size="sm">Unlock Pro</ButtonTiltGlare>
      </div>
    </div>
  ),
  "button-underline-grow": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 p-5 font-sans`}>
        <p className="m-0 text-[26px] leading-none tracking-tight">From the journal</p>
        <p className="m-0 font-sans text-xs leading-snug text-[#a1a1a1]">Release notes, guides and the odd opinion about easing curves.</p>
        <div className="flex flex-col items-start gap-1.5 font-sans">
          <ButtonUnderlineGrow idle>Read the changelog</ButtonUnderlineGrow>
          <ButtonUnderlineGrow variant="plain" idle>Browse the docs</ButtonUnderlineGrow>
          <ButtonUnderlineGrow size="sm">Join the community</ButtonUnderlineGrow>
        </div>
      </div>
    </div>
  ),
  "button-bubbles-pop": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <span
            className="h-12 w-12 flex-none rounded-xl border border-[#262626]"
            style={{ background: "radial-gradient(circle at 30% 25%, #f6f27a 0, #e6d93a 38%, #8a8a1d 100%)" }}
          />
          <div className="min-w-0">
            <p className="m-0 text-[15px] font-semibold leading-tight tracking-tight">Fizz Lemon, 12 pack</p>
            <p className="m-0 mt-0.5 text-xs text-[#a1a1a1]">Sparkling water, 330 ml</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold tracking-tight">$18.00</span>
          <ButtonBubblesPop idle size="sm">Add to cart</ButtonBubblesPop>
        </div>
      </div>
    </div>
  ),
};

import type { ReactNode } from "react";
import { TechReadout } from "@/registry/hyperblur/text-tech-readout";
import { TextEcho } from "@/registry/hyperblur/text-echo";
import { DepthLayers } from "@/registry/hyperblur/text-depth-layers";
import { TextFold } from "@/registry/hyperblur/text-fold";
import { MenuBranchedDemo } from "@/registry/demos/menu-branched-demo";
import { CodeSlotsDemo } from "@/registry/demos/micro-code-slots-demo";
import { SelectGlideDemo } from "@/registry/demos/select-glide-demo";
import { SlideCommitDemo } from "@/registry/demos/micro-slide-commit-demo";

export const qsDemos: Record<string, ReactNode> = {
  "menu-branched": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <MenuBranchedDemo />
    </div>
  ),
  "micro-code-slots": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CodeSlotsDemo />
    </div>
  ),
  "select-glide": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <SelectGlideDemo />
    </div>
  ),
  "micro-slide-commit": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <SlideCommitDemo />
    </div>
  ),
  "text-tech-readout": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border flex max-w-[340px] items-center justify-center rounded-2xl border border-[#262626] px-3 py-3"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #0f1b33 0%, #0a0a0a 70%)" }}
      >
        <TechReadout
          text="ORBIT LOCK"
          size={28}
          meta={["UPLINK / 04", "98.2%", "ALT 412 KM", "T+00:14"]}
          replayEvery={6500}
        />
      </div>
    </div>
  ),
  "text-echo": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex max-w-[340px] flex-col items-center gap-4">
        <TextEcho className="font-grotesk text-[64px] font-bold leading-none tracking-tight text-[#f2f2f2]" distance={7}>
          Delay
        </TextEcho>
        <p className="font-mono m-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Hover to spread the echo</p>
      </div>
    </div>
  ),
  "text-depth-layers": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <DepthLayers className="font-display text-[68px] font-bold tracking-[0.02em]" depth={16} tilt={11}>
          DEPTH
        </DepthLayers>
      </div>
    </div>
  ),
  "text-fold": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex max-w-[340px] flex-col items-center gap-3 text-center text-[#ededed]">
        <p className="font-mono m-0 text-[10px] uppercase tracking-[0.18em] text-[#8f8f8f]">Field notes / No. 12</p>
        <TextFold
          className="font-serif text-[32px] italic"
          lines={["Fold the page.", "Keep the crease.", "Read between lines."]}
          replayEvery={7000}
        />
      </div>
    </div>
  ),
};

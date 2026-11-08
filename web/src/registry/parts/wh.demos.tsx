import type { ReactNode } from "react";
import { MotionStatSequence } from "@/registry/hyperblur/motion-stat-sequence";
import { MotionRadialGridReveal } from "@/registry/hyperblur/motion-radial-grid-reveal";
import { MotionSkewMarquee } from "@/registry/hyperblur/motion-skew-marquee";
import { MotionKaraokeParagraph } from "@/registry/hyperblur/motion-karaoke-paragraph";
import { MotionFlipSequence } from "@/registry/hyperblur/motion-flip-sequence";
import { MotionCutoutReveal } from "@/registry/hyperblur/motion-cutout-reveal";
import { MotionPathDraw } from "@/registry/hyperblur/motion-path-draw";
import { MotionLogoLens } from "@/registry/hyperblur/motion-logo-lens";
import { MotionInkReveal } from "@/registry/hyperblur/motion-ink-reveal";
import { MotionCodeReveal } from "@/registry/hyperblur/motion-code-reveal";

const frame =
  "box-border h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

const stage = "188px";

export const whDemos: Record<string, ReactNode> = {
  "motion-stat-sequence": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionStatSequence height={stage} autoPlay eyebrow="Q3 · Edge network" />
      </div>
    </div>
  ),
  "motion-radial-grid-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} flex items-center p-3 font-sans`}>
        <MotionRadialGridReveal autoPlay columns={8} gap={5} origin={[0.3, 0.4]} />
      </div>
    </div>
  ),
  "motion-skew-marquee": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} flex flex-col justify-center font-sans`}>
        <MotionSkewMarquee autoPlay words={["Identity", "Motion", "Product", "Launch"]} />
      </div>
    </div>
  ),
  "motion-karaoke-paragraph": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionKaraokeParagraph
          height={stage}
          autoPlay
          duration={6}
          eyebrow="Customer story"
          text="We stopped counting releases and started measuring *how it felt to use*. Support tickets fell by half."
          author="Mara Ellison, Tessel"
        />
      </div>
    </div>
  ),
  "motion-flip-sequence": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionFlipSequence height={stage} autoPlay duration={5} />
      </div>
    </div>
  ),
  "motion-cutout-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionCutoutReveal height={stage} autoPlay duration={4} title="Five ridges to the coast" />
      </div>
    </div>
  ),
  "motion-path-draw": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionPathDraw
          height={stage}
          autoPlay
          duration={5}
          title="Weekend repo to 1.0"
          milestones={[
            { date: "Jan", label: "First commit", x: 0.06, y: 0.82 },
            { date: "Apr", label: "Alpha", x: 0.36, y: 0.42 },
            { date: "Jul", label: "Beta", x: 0.64, y: 0.78 },
            { date: "Nov", label: "1.0", x: 0.93, y: 0.36 },
          ]}
        />
      </div>
    </div>
  ),
  "motion-logo-lens": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} flex flex-col justify-center font-sans`}>
        <MotionLogoLens />
      </div>
    </div>
  ),
  "motion-ink-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans`}>
        <MotionInkReveal height={stage} autoPlay duration={4.5} caption="f/2.8 · 1/60s" />
      </div>
    </div>
  ),
  "motion-code-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-mono`}>
        <MotionCodeReveal height={stage} autoPlay duration={6} />
      </div>
    </div>
  ),
};

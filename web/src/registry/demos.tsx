import type { ReactNode } from "react";
import { GlitchText } from "@/registry/hyperblur/glitch-text";
import { MotionBlurText } from "@/registry/hyperblur/motion-blur-text";
import { SpeedLines } from "@/registry/hyperblur/speed-lines";
import { Scanlines } from "@/registry/hyperblur/scanlines";
import { ChromaticHover } from "@/registry/hyperblur/chromatic-hover";
import { PixelReveal } from "@/registry/hyperblur/pixel-reveal";

const display = "font-display text-4xl font-bold uppercase tracking-wide";

export const demos: Record<string, ReactNode> = {
  "glitch-text": <GlitchText text="GLITCH" className={display} />,
  "motion-blur-text": (
    <MotionBlurText text="HYPER" trigger="hover" className={`${display} text-blue`} />
  ),
  "speed-lines": (
    <div className="relative h-full w-full">
      <SpeedLines />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>SPEED</div>
    </div>
  ),
  scanlines: (
    <div className="relative h-full w-full bg-gradient-to-br from-blue/60 to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>CRT</div>
      <Scanlines />
    </div>
  ),
  "chromatic-hover": (
    <ChromaticHover>
      <span className={display}>HOVER ME</span>
    </ChromaticHover>
  ),
  "pixel-reveal": (
    <PixelReveal>
      <span className={`${display} px-4 py-2 text-blue`}>REVEAL</span>
    </PixelReveal>
  ),
};

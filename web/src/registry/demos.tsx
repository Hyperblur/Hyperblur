import type { ReactNode } from "react";
import { GlitchText } from "@/registry/hyperblur/glitch-text";
import { MotionBlurText } from "@/registry/hyperblur/motion-blur-text";
import { SpeedLines } from "@/registry/hyperblur/speed-lines";
import { Scanlines } from "@/registry/hyperblur/scanlines";
import { ChromaticHover } from "@/registry/hyperblur/chromatic-hover";
import { PixelReveal } from "@/registry/hyperblur/pixel-reveal";
import { DecodeText } from "@/registry/hyperblur/decode-text";
import { NeonText } from "@/registry/hyperblur/neon-text";
import { WaveText } from "@/registry/hyperblur/wave-text";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { ShutterReveal } from "@/registry/hyperblur/shutter-reveal";
import { GridFloor } from "@/registry/hyperblur/grid-floor";
import { FilmGrain } from "@/registry/hyperblur/film-grain";
import { VhsOverlay } from "@/registry/hyperblur/vhs-overlay";
import { DotGrid } from "@/registry/hyperblur/dot-grid";
import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { RippleClick } from "@/registry/hyperblur/ripple-click";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Marquee } from "@/registry/hyperblur/marquee";
import { Aurora } from "@/registry/hyperblur/aurora";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { GradientText } from "@/registry/hyperblur/gradient-text";
import { CountUp } from "@/registry/hyperblur/count-up";

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
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
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
  "decode-text": <DecodeText text="DECRYPT" trigger="hover" className={`${display} text-blue`} />,
  "neon-text": <NeonText text="NEON" className={display} />,
  "wave-text": <WaveText text="WAVE" className={display} />,
  magnetic: (
    <Magnetic>
      <span className={`${display} inline-block rounded-md border border-white/20 px-6 py-3`}>PULL</span>
    </Magnetic>
  ),
  "tilt-card": (
    <TiltCard className="rounded-xl">
      <div className={`${display} rounded-xl border border-white/20 bg-white/5 px-8 py-10`}>TILT</div>
    </TiltCard>
  ),
  "shutter-reveal": (
    <ShutterReveal trigger="hover">
      <span className={`${display} px-4 py-2`}>SHUTTER</span>
    </ShutterReveal>
  ),
  "grid-floor": (
    <div className="relative h-full w-full">
      <GridFloor />
      <div className={`${display} absolute inset-0 flex items-start justify-center pt-8`}>GRID</div>
    </div>
  ),
  "film-grain": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>GRAIN</div>
      <FilmGrain opacity={0.3} />
    </div>
  ),
  "vhs-overlay": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>VHS</div>
      <VhsOverlay />
    </div>
  ),
  "dot-grid": (
    <div className="relative h-full w-full">
      <DotGrid />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>DOTS</div>
    </div>
  ),
  "glow-border": (
    <GlowBorder className="bg-white/5">
      <div className={`${display} px-8 py-10`}>GLOW</div>
    </GlowBorder>
  ),
  "ripple-click": (
    <RippleClick className="rounded-full border border-white/20 bg-white/5">
      <span className={`${display} inline-block cursor-pointer select-none px-8 py-3`}>RIPPLE</span>
    </RippleClick>
  ),
  "fade-in-view": (
    <FadeInView direction="up" once={false}>
      <span className={display}>REVEAL</span>
    </FadeInView>
  ),
  marquee: (
    <Marquee className={display} gap={48}>
      <span>FAST</span>
      <span>LOOP</span>
      <span>SMOOTH</span>
      <span>ENDLESS</span>
      <span>SLIDE</span>
    </Marquee>
  ),
  aurora: (
    <div className="relative h-full w-full">
      <Aurora />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>AURORA</div>
    </div>
  ),
  typewriter: <Typewriter words={["DESIGN", "BUILD", "SHIP"]} className={`${display} text-blue`} />,
  "gradient-text": <GradientText text="GRADIENT" className={display} />,
  "count-up": <CountUp to={12480} suffix="+" className={`${display} text-blue`} />,
};

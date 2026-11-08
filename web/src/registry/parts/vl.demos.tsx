import type { ReactNode } from "react";
import { ImageAccordionReel } from "@/registry/hyperblur/image-accordion-reel";
import { ImageAccordionVertical } from "@/registry/hyperblur/image-accordion-vertical";
import { ImageAccordionStagger } from "@/registry/hyperblur/image-accordion-stagger";
import { ParallaxDepthCards } from "@/registry/hyperblur/parallax-depth-cards";
import { ParallaxStickyCaptions } from "@/registry/hyperblur/parallax-sticky-captions";
import { ParallaxFloatingGallery } from "@/registry/hyperblur/parallax-floating-gallery";
import { PromptBoxModes } from "@/registry/hyperblur/prompt-box-modes";
import { PromptVoiceRecorder } from "@/registry/hyperblur/prompt-voice-recorder";
import { PromptSlashCommands } from "@/registry/hyperblur/prompt-slash-commands";
import { CardFoilPass } from "@/registry/hyperblur/card-foil-pass";
import { CardHandFan } from "@/registry/hyperblur/card-hand-fan";
import { CardFlipDeck } from "@/registry/hyperblur/card-flip-deck";

const stage = "flex h-full w-full items-center justify-center px-4";

export const vlDemos: Record<string, ReactNode> = {
  "image-accordion-reel": (
    <div className={stage}>
      <div className="flex w-full max-w-[340px] flex-col gap-2 font-sans">
        <div className="flex items-baseline justify-between px-0.5">
          <span className="text-[13px] font-semibold tracking-tight text-[#ededed]">Winter field guide</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8f8f8f]">5 trips</span>
        </div>
        <ImageAccordionReel height={146} interval={3800} />
      </div>
    </div>
  ),
  "image-accordion-vertical": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <ImageAccordionVertical
          height={176}
          items={[
            { title: "Casa Arco", meta: "Lisbon", description: "A row house opened up with five plaster arches.", colors: ["#e9d8c4", "#c98f6a", "#5b3626"], motif: "arches" },
            { title: "Pavilion Nine", meta: "Oslo", description: "Timber colonnade around a reading room.", colors: ["#cfd9d6", "#6f8f88", "#1f3431"], motif: "columns" },
            { title: "Oculus Studio", meta: "Mexico City", description: "A round skylight tracks the day.", colors: ["#f2cfa8", "#d0603a", "#4a1a10"], motif: "window" },
          ]}
        />
      </div>
    </div>
  ),
  "image-accordion-stagger": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-grotesk">
        <ImageAccordionStagger
          height={180}
          stagger={18}
          items={[
            { title: "Vetiver Noir", notes: "Bergamot, vetiver, smoke", price: "$148", colors: ["#1d2a22", "#6d8f5a", "#d9e8b0"] },
            { title: "Salt & Cedar", notes: "Sea salt, sage, cedar", price: "$140", colors: ["#13232c", "#5f93a8", "#d8f0f4"] },
            { title: "Amber Dusk", notes: "Saffron, labdanum, tonka", price: "$156", colors: ["#2b170d", "#d07a3a", "#ffe0b8"] },
            { title: "Yuzu Rain", notes: "Yuzu, white tea, vetiver", price: "$124", colors: ["#2a2a12", "#d4c24a", "#fff8c4"] },
          ]}
        />
      </div>
    </div>
  ),
  "parallax-depth-cards": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <ParallaxDepthCards
          autoPlay
          height={186}
          range={70}
          duration={7000}
          title="Every metric in one live view."
          subtitle="Revenue, deploys and signups, as they happen."
          cards={[
            { label: "Monthly revenue", value: "$84,210", detail: "+12.4%", tone: "stat", depth: 0.85, x: 3, y: 4, rotate: -4 },
            { label: "Seats", value: "1,284", tone: "chip", depth: 0.35, x: 70, y: 6, rotate: 3 },
            { label: "api-gateway", value: "Deployed", detail: "2m 14s", tone: "note", depth: 1, x: 56, y: 74, rotate: 3 },
            { label: "Churn", value: "1.8%", tone: "chip", depth: 0.3, x: 6, y: 82, rotate: -2 },
          ]}
        />
      </div>
    </div>
  ),
  "parallax-sticky-captions": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <ParallaxStickyCaptions autoPlay height={186} duration={10000} />
      </div>
    </div>
  ),
  "parallax-floating-gallery": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <ParallaxFloatingGallery autoPlay height={186} range={70} duration={9000} eyebrow="Field notes / 48 photos" title="The coast at the edges of the day" cta="Open gallery" />
      </div>
    </div>
  ),
  "prompt-box-modes": (
    <div className={stage}>
      <div className="flex w-full max-w-[340px] flex-col gap-2 font-sans">
        <div className="flex items-center gap-2 px-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ccf7a]" />
          <span className="text-[12px] text-[#a1a1a1]">Atlas workspace / Board prep</span>
        </div>
        <PromptBoxModes defaultValue="Which cohorts drove the churn spike in August?" maxRows={2} />
      </div>
    </div>
  ),
  "prompt-voice-recorder": (
    <div className={stage}>
      <div className="flex w-full max-w-[340px] flex-col gap-2 font-sans">
        <div className="self-start rounded-2xl rounded-bl-md bg-[#18181b] px-3 py-2 text-[12px] leading-snug text-[#d6d6da] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
          Review notes are in. Want me to send a summary to the team?
        </div>
        <PromptVoiceRecorder autoPlay />
      </div>
    </div>
  ),
  "prompt-slash-commands": (
    <div className="flex h-full w-full items-start justify-center px-4 pt-2">
      <div className="w-full max-w-[340px] font-sans">
        <PromptSlashCommands defaultTokens={[{ type: "command", value: "summarize" }]} defaultValue="for the team @rel" />
      </div>
    </div>
  ),
  "card-foil-pass": (
    <div className={stage}>
      <div className="flex w-full max-w-[340px] flex-col items-center gap-2">
        <CardFoilPass className="max-w-[262px]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f6f75]">Tilt to catch the foil, click to flip</span>
      </div>
    </div>
  ),
  "card-hand-fan": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <CardHandFan defaultOpen cardWidth={88} spread={10} />
      </div>
    </div>
  ),
  "card-flip-deck": (
    <div className={stage}>
      <div className="w-full max-w-[300px] font-sans">
        <CardFlipDeck height={112} autoPlay={2800} />
      </div>
    </div>
  ),
};

import type { ReactNode } from "react";
import { ScrollProgressBar } from "@/registry/hyperblur/scroll-progress-bar";
import { ScrollParallaxLayers } from "@/registry/hyperblur/scroll-parallax-layers";
import { ScrollPinSteps } from "@/registry/hyperblur/scroll-pin-steps";
import { ScrollStaggerGrid } from "@/registry/hyperblur/scroll-stagger-grid";
import { ScrollZoomReveal } from "@/registry/hyperblur/scroll-zoom-reveal";
import { ScrollHorizontalTrack } from "@/registry/hyperblur/scroll-horizontal-track";
import { ScrollCounterTicker } from "@/registry/hyperblur/scroll-counter-ticker";
import { ScrollStickyStack } from "@/registry/hyperblur/scroll-sticky-stack";

const frame =
  "box-border h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

export const qmDemos: Record<string, ReactNode> = {
  "scroll-progress-bar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-serif`}>
        <ScrollProgressBar height={188} autoplay accentTo="#a5c8ff">
          <article className="px-4 pb-6 pt-8">
            <p className="font-grotesk m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
              Essay / 7 min read
            </p>
            <h4 className="m-0 mt-1.5 text-[24px] font-normal leading-[26px] text-[#f4f4f4]">
              The quiet craft of slow software
            </h4>
            <p className="m-0 mt-2 text-[13px] leading-[19px] text-[#a1a1a1]">
              Every product has a pace. Some feel like a conversation, others like a queue at the
              post office, and the difference is rarely about speed alone.
            </p>
            <p className="m-0 mt-2.5 text-[13px] leading-[19px] text-[#a1a1a1]">
              A good interface waits for you without making you wait. It keeps your place, answers
              before you finish the question and never asks you to start over.
            </p>
            <p className="m-0 mt-2.5 text-[13px] leading-[19px] text-[#a1a1a1]">
              That patience is designed, one small decision at a time: the empty state that tells
              you what comes next, the undo that is always one tap away.
            </p>
            <p className="m-0 mt-2.5 text-[13px] leading-[19px] text-[#a1a1a1]">
              Teams that build this way ship fewer features and more trust. They measure the
              seconds a person saves, not the minutes they spend.
            </p>
            <p className="m-0 mt-2.5 text-[13px] leading-[19px] text-[#a1a1a1]">
              So the next time something feels calm, look closer. Someone worked hard to make it
              look easy.
            </p>
          </article>
        </ScrollProgressBar>
      </div>
    </div>
  ),
  "scroll-parallax-layers": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-grotesk`}>
        <ScrollParallaxLayers
          height={188}
          autoplay
          sceneHeight={188}
          before={
            <div className="box-border flex h-[140px] flex-col justify-end px-4 pb-4">
              <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                Field notes / Day 4
              </p>
              <p className="font-serif m-0 mt-1 text-[22px] leading-6 text-[#f4f4f4]">
                Leaving the valley before sunrise
              </p>
            </div>
          }
          after={
            <div className="box-border flex h-[120px] flex-col px-4 pt-4">
              <p className="m-0 text-[13px] leading-[19px] text-[#a1a1a1]">
                The last switchback opens onto bare rock and a sky that has not decided what
                colour to be.
              </p>
            </div>
          }
        >
          <div>
            <p className="font-serif m-0 text-[28px] italic leading-8">Above the treeline</p>
            <p className="m-0 mt-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
              2,640 m
            </p>
          </div>
        </ScrollParallaxLayers>
      </div>
    </div>
  ),
  "scroll-pin-steps": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans text-[13px]`}>
        <ScrollPinSteps height={188} autoplay />
      </div>
    </div>
  ),
  "scroll-stagger-grid": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-mono text-[12px]`}>
        <ScrollStaggerGrid
          height={188}
          autoplay
          gap={8}
          distance={48}
          inset={16}
          before={
            <div className="box-border flex h-[190px] flex-col justify-end px-4 pb-5">
              <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                Spring collection
              </p>
              <p className="font-serif m-0 mt-1 text-[26px] leading-7 text-[#f4f4f4]">
                Eight colorways, one weekend
              </p>
            </div>
          }
          after={<div className="h-14" />}
        />
      </div>
    </div>
  ),
  "scroll-zoom-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-serif text-[13px]`}>
        <ScrollZoomReveal
          height={188}
          autoplay
          title="Wide open"
          subtitle="Coastal drives, slowly"
          caption={
            <>
              <span className="font-grotesk block text-[10px] uppercase tracking-[0.14em] text-white/70">
                Highway 1
              </span>
              <span className="block text-[20px] leading-6 text-white">Big Sur at golden hour</span>
            </>
          }
        />
      </div>
    </div>
  ),
  "scroll-horizontal-track": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-grotesk text-[13px]`}>
        <ScrollHorizontalTrack height={188} autoplay />
      </div>
    </div>
  ),
  "scroll-counter-ticker": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-display text-[13px]`}>
        <ScrollCounterTicker height={188} autoplay label="Trees planted this year" />
      </div>
    </div>
  ),
  "scroll-sticky-stack": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-sans text-[13px]`}>
        <ScrollStickyStack height={188} autoplay top={10} gap={12} />
      </div>
    </div>
  ),
};

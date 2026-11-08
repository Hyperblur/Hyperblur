import type { ReactNode } from "react";
import { HoverMagneticIcons } from "@/registry/hyperblur/hover-magnetic-icons";
import { HoverPhotoSnake } from "@/registry/hyperblur/hover-photo-snake";
import { HoverFanStack } from "@/registry/hyperblur/hover-fan-stack";
import { HoverSpotlightList } from "@/registry/hyperblur/hover-spotlight-list";
import { HoverDistortImage } from "@/registry/hyperblur/hover-distort-image";
import { HoverMorphCursor } from "@/registry/hyperblur/hover-morph-cursor";
import { HoverTiltGallery } from "@/registry/hyperblur/hover-tilt-gallery";
import { HoverRevealLens } from "@/registry/hyperblur/hover-reveal-lens";
import { HoverPinBoard } from "@/registry/hyperblur/hover-pin-board";
import { HoverPlayTiles } from "@/registry/hyperblur/hover-play-tiles";
import { HoverDirectionCaption } from "@/registry/hyperblur/hover-direction-caption";
import { HoverExpandRows } from "@/registry/hyperblur/hover-expand-rows";

const wrap = "flex h-full w-full items-center justify-center px-4";

export const wgDemos: Record<string, ReactNode> = {
  "hover-magnetic-icons": (
    <div className={wrap}>
      <div className="box-border w-full max-w-[320px] rounded-[22px] border border-[#262626] bg-[#0f0f0f] font-sans text-[#ededed]">
        <div className="flex items-center justify-between px-4 pt-3 text-[10px] text-[#8f8f8f]">
          <span className="font-semibold text-[#ededed]">9:41</span>
          <span>Home · page 1 of 3</span>
        </div>
        <HoverMagneticIcons radius={110} style={{ padding: "12px 14px 14px" }} />
      </div>
    </div>
  ),
  "hover-photo-snake": (
    <div className="relative h-full w-full bg-[#0a0a0a] text-[#ededed]">
      <HoverPhotoSnake size={50} gap={22}>
        <div className="flex h-full w-full flex-col items-start justify-end gap-1 px-5 pb-4 font-grotesk">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Field notes · 07 cities</span>
          <p className="m-0 text-2xl font-semibold leading-tight tracking-tight">Every place, in order.</p>
        </div>
      </HoverPhotoSnake>
    </div>
  ),
  "hover-fan-stack": (
    <div className={wrap}>
      <div className="box-border w-full max-w-[330px] font-sans text-[#ededed]">
        <div className="flex items-baseline justify-between px-0.5">
          <span className="text-[13px] font-semibold tracking-tight">Your mixes this week</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">5 playlists</span>
        </div>
        <HoverFanStack autoPlay cardWidth={76} spread={9} />
      </div>
    </div>
  ),
  "hover-spotlight-list": (
    <div className={wrap}>
      <div className="box-border w-full max-w-[330px] font-sans">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[12px] font-semibold text-[#ededed]">Services</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">eu-west · 4 running</span>
        </div>
        <HoverSpotlightList items={[
          { title: "Payments webhook", detail: "POST /v2/events · 41ms p95", status: "Healthy", tone: "#4ade80" },
          { title: "Search indexer", detail: "Queue 1,284 jobs", status: "Busy", tone: "#fbbf24" },
          { title: "Email digest", detail: "Next run 18:00 UTC", status: "Paused", tone: "#8f8f8f" },
        ]} />
      </div>
    </div>
  ),
  "hover-distort-image": (
    <div className={wrap}>
      <div className="w-full max-w-[290px] font-grotesk">
        <HoverDistortImage ratio={0.6} />
      </div>
    </div>
  ),
  "hover-morph-cursor": (
    <div className="relative h-full w-full bg-[#0a0a0a] font-sans">
      <HoverMorphCursor />
    </div>
  ),
  "hover-tilt-gallery": (
    <div className={wrap}>
      <div className="box-border w-full max-w-[330px] font-sans">
        <div className="mb-3 flex items-baseline justify-between px-0.5 text-[#ededed]">
          <span className="text-[13px] font-semibold tracking-tight">Spring showcase</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">Room 3 · 5 works</span>
        </div>
        <HoverTiltGallery height={120} />
      </div>
    </div>
  ),
  "hover-reveal-lens": (
    <div className={wrap}>
      <div className="w-full max-w-[300px] font-sans">
        <HoverRevealLens radius={44} />
      </div>
    </div>
  ),
  "hover-pin-board": (
    <div className="relative h-full w-full">
      <HoverPinBoard>
        <div className="flex h-full w-full items-center justify-center px-4">
          <div className="pointer-events-none rounded-2xl border border-[#262626] bg-[#0a0a0a]/85 px-4 py-3 text-center font-grotesk text-[#ededed] backdrop-blur-sm">
            <p className="m-0 text-lg font-semibold leading-tight tracking-tight">Leave a mark</p>
            <p className="m-0 mt-0.5 text-[11px] text-[#a1a1a1]">Pins settle back in a few seconds</p>
          </div>
        </div>
      </HoverPinBoard>
    </div>
  ),
  "hover-play-tiles": (
    <div className={wrap}>
      <div className="w-full max-w-[272px] font-sans">
        <HoverPlayTiles />
      </div>
    </div>
  ),
  "hover-direction-caption": (
    <div className={wrap}>
      <div className="box-border w-full max-w-[330px] font-sans">
        <div className="mb-2 flex items-baseline justify-between px-0.5 text-[#ededed]">
          <span className="text-[13px] font-semibold tracking-tight">Selected projects</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">2023 to 2025</span>
        </div>
        <HoverDirectionCaption ratio={0.86} />
      </div>
    </div>
  ),
  "hover-expand-rows": (
    <div className={wrap}>
      <div className="w-full max-w-[330px] font-grotesk">
        <HoverExpandRows items={[
          { title: "Halden Bank", tag: "Fintech", year: "2025", summary: "Rebuilt onboarding from 11 steps to 4.", stats: [{ label: "Activation", value: "+38%" }, { label: "Drop-off", value: "-52%" }], background: "radial-gradient(circle at 70% 30%, #9fd0ff 0 14%, transparent 15%), linear-gradient(135deg, #1a3a6e, #0a1630)" },
          { title: "Northwind Air", tag: "Travel", year: "2024", summary: "A booking flow that fits on one screen.", stats: [{ label: "Conversion", value: "+21%" }, { label: "Time", value: "1m 40s" }], background: "linear-gradient(180deg, transparent 60%, #f3e6d0 60%), radial-gradient(circle at 30% 40%, #fff 0 10%, transparent 11%), linear-gradient(180deg, #ff9a6a, #ffcf9a)" },
          { title: "Oko Health", tag: "Healthcare", year: "2024", summary: "Clinician dashboard for 300 clinics.", stats: [{ label: "Clinics", value: "312" }, { label: "NPS", value: "71" }], background: "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 12px), linear-gradient(135deg, #1f7a5c, #0b2a22)" },
        ]} />
      </div>
    </div>
  ),
};

import type { ReactNode } from "react";
import { GalleryInfiniteSpiral } from "@/registry/hyperblur/gallery-infinite-spiral";
import { CarouselDepth } from "@/registry/hyperblur/carousel-depth";
import { WheelOptionPickerDemo } from "@/registry/demos/wheel-option-picker-demo";
import { MenuStaggeredDemo } from "@/registry/demos/menu-staggered-demo";
import { NavCardExpandDemo } from "@/registry/demos/nav-card-expand-demo";

export const quDemos: Record<string, ReactNode> = {
  "gallery-infinite-spiral": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-mono relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626]">
        <GalleryInfiniteSpiral />
        <div className="pointer-events-none absolute left-3.5 top-3 z-[200]">
          <p className="font-serif m-0 text-[24px] leading-[1] text-[#ededed]">Field notes</p>
          <p className="m-0 mt-1 text-[9px] uppercase tracking-[0.14em] text-[#8f8f8f]">12 places / 2026</p>
        </div>
      </div>
    </div>
  ),
  "carousel-depth": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626]">
        <CarouselDepth label="Trending destinations" />
      </div>
    </div>
  ),
  "wheel-option-picker": <WheelOptionPickerDemo />,
  "menu-staggered": <MenuStaggeredDemo />,
  "nav-card-expand": <NavCardExpandDemo />,
};

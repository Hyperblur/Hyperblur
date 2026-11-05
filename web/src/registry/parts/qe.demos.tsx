import type { ReactNode } from "react";
import { ImageWipeSlider } from "@/registry/hyperblur/image-wipe-slider";
import { ImageMosaicReveal } from "@/registry/hyperblur/image-mosaic-reveal";
import { ImageLiquidDistort } from "@/registry/hyperblur/image-liquid-distort";
import { ImagePixelateTransition } from "@/registry/hyperblur/image-pixelate-transition";
import { ImageSplitSlide } from "@/registry/hyperblur/image-split-slide";
import { ImageParallaxTilt } from "@/registry/hyperblur/image-parallax-tilt";
import { ImageKenBurns } from "@/registry/hyperblur/image-ken-burns";
import { ImageGalleryExpand } from "@/registry/hyperblur/image-gallery-expand";
import { ImageStackSwipe } from "@/registry/hyperblur/image-stack-swipe";
import { ImageHoverZoomLens } from "@/registry/hyperblur/image-hover-zoom-lens";

export const qeDemos: Record<string, ReactNode> = {
  "image-wipe-slider": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[330px] rounded-2xl border border-[#262626] bg-[#111111] p-2 text-[#ededed]">
        <ImageWipeSlider height={128} style={{ borderRadius: 10 }} />
        <div className="flex items-baseline justify-between px-1.5 pb-1 pt-2">
          <p className="font-sans m-0 text-lg leading-6">Algarve in October</p>
          <span className="font-grotesk text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">4 photos</span>
        </div>
      </div>
    </div>
  ),
  "image-mosaic-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative w-full max-w-[320px]">
        <ImageMosaicReveal aspect="16 / 9" />
        <span className="font-mono pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur">
          Archive / 2026
        </span>
        <p className="font-grotesk pointer-events-none absolute bottom-3 left-3.5 z-10 m-0 text-base font-semibold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
          Autumn Archive
        </p>
      </div>
    </div>
  ),
  "image-liquid-distort": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative w-full max-w-[320px]">
        <ImageLiquidDistort aspect="16 / 9" />
        <p className="font-sans pointer-events-none absolute left-4 top-3 z-10 m-0 text-3xl leading-9 text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
          Tidewater
        </p>
        <span className="font-mono pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur">
          Hover to ripple
        </span>
      </div>
    </div>
  ),
  "image-pixelate-transition": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[320px] overflow-hidden rounded-xl border border-[#262626] bg-[#111111]">
        <div className="font-mono flex h-[26px] items-center gap-1.5 border-b border-[#262626] px-3 text-[10px] text-[#8f8f8f]">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate">viewer.exe / IMG_0412.png</span>
        </div>
        <ImagePixelateTransition height={136} style={{ borderRadius: 0 }} />
      </div>
    </div>
  ),
  "image-split-slide": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative w-full max-w-[320px]">
        <ImageSplitSlide aspect="32 / 17" />
        <div className="pointer-events-none absolute bottom-3.5 left-3.5 z-10 flex flex-col items-start gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">SS26</span>
          <p className="font-grotesk m-0 text-xl font-bold leading-6 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
            Spring drop
          </p>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#0a0a0a]">Shop now</span>
        </div>
      </div>
    </div>
  ),
  "image-parallax-tilt": (
    <div className="flex h-full w-full items-center justify-center gap-3.5 px-4">
      <div className="w-[196px] shrink-0">
        <ImageParallaxTilt aspect="4 / 3" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-[#ededed]">
        <p className="font-sans m-0 text-2xl leading-7">Layered scenes</p>
        <p className="m-0 text-[11px] leading-4 text-[#a1a1a1]">Sky, skyline and street shift at different depths as the card tilts.</p>
        <span className="font-mono w-fit rounded-full border border-[#262626] bg-[#111111] px-2 py-0.5 text-[10px] text-[#8f8f8f]">
          depth 14px
        </span>
      </div>
    </div>
  ),
  "image-ken-burns": (
    <div className="flex h-full w-full items-center justify-center gap-4 px-4">
      <div className="w-[148px] shrink-0">
        <ImageKenBurns height={188} style={{ borderRadius: 18 }} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 text-[#ededed]">
        <span className="font-grotesk text-[10px] font-medium uppercase tracking-[0.14em] text-[#7fb3ff]">Stories</span>
        <p className="font-sans m-0 text-2xl leading-7">Weekend in Lisbon</p>
        <p className="m-0 text-xs leading-4 text-[#a1a1a1]">Four photos, four seconds each. Tap the sides to skip.</p>
        <span className="font-mono text-[10px] text-[#8f8f8f]">0:16 total</span>
      </div>
    </div>
  ),
  "image-gallery-expand": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[330px] flex-col gap-2">
        <div className="flex items-center justify-between text-[#ededed]">
          <p className="m-0 text-xs font-semibold">Selected work</p>
          <span className="font-mono text-[10px] text-[#8f8f8f]">hover a strip</span>
        </div>
        <ImageGalleryExpand height={150} />
      </div>
    </div>
  ),
  "image-stack-swipe": (
    <div className="flex h-full w-full items-center justify-center gap-3.5 px-4">
      <div className="flex w-[96px] shrink-0 flex-col gap-2 text-[#ededed]">
        <p className="font-grotesk m-0 text-base font-semibold leading-5">Swipe to browse</p>
        <p className="m-0 text-[11px] leading-4 text-[#a1a1a1]">Drag the top card or use the arrow keys.</p>
        <span className="font-mono w-fit rounded-md border border-[#262626] bg-[#111111] px-1.5 py-0.5 text-[10px] text-[#8f8f8f]">
          &larr; &rarr;
        </span>
      </div>
      <div className="w-[216px] shrink-0">
        <ImageStackSwipe aspect="4 / 3" />
      </div>
    </div>
  ),
  "image-hover-zoom-lens": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative w-full max-w-[320px]">
        <ImageHoverZoomLens aspect="16 / 9" size={84} />
        <span className="font-grotesk pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          Inspect detail
        </span>
        <span className="font-mono pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur">
          2.4x
        </span>
      </div>
    </div>
  ),
};

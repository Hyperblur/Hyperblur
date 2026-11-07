import type { ReactNode } from "react";
import { CardGlare } from "@/registry/hyperblur/card-glare";
import { CardProfileHolo } from "@/registry/hyperblur/card-profile-holo";
import { CardPixelHover } from "@/registry/hyperblur/card-pixel-hover";
import { CardDecay } from "@/registry/hyperblur/card-decay";
import { CardStickerPeel } from "@/registry/hyperblur/card-sticker-peel";
import { CardBounceStack } from "@/registry/hyperblur/card-bounce-stack";
import { CardChromaGrid } from "@/registry/hyperblur/card-chroma-grid";
import { GalleryAccordion } from "@/registry/hyperblur/gallery-accordion";
import { GalleryDriftWall } from "@/registry/hyperblur/gallery-drift-wall";
import { CardStackDrag } from "@/registry/hyperblur/card-stack-drag";

const stage = "flex h-full w-full items-center justify-center px-4";

export const qkDemos: Record<string, ReactNode> = {
  "card-glare": (
    <div className={stage}>
      <div className="font-grotesk w-[250px]">
        <CardGlare />
      </div>
    </div>
  ),
  "card-profile-holo": (
    <div className={stage}>
      <div className="w-[300px] font-sans">
        <CardProfileHolo />
      </div>
    </div>
  ),
  "card-pixel-hover": (
    <div className={stage}>
      <div className="font-sans w-[300px]">
        <CardPixelHover />
      </div>
    </div>
  ),
  "card-decay": (
    <div className={stage}>
      <div className="font-display w-[300px]">
        <CardDecay />
      </div>
    </div>
  ),
  "card-sticker-peel": (
    <div className={`${stage} gap-4`}>
      <div className="w-[170px] shrink-0">
        <CardStickerPeel />
      </div>
      <div className="font-grotesk min-w-0 text-left text-[#ededed]">
        <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Sticker pack 02</p>
        <p className="m-0 mt-1 text-lg font-semibold leading-tight">Laptop lid, but make it loud</p>
        <p className="m-0 mt-2 text-xs leading-snug text-[#a1a1a1]">Drag the corner to peel. Click to stick it back.</p>
      </div>
    </div>
  ),
  "card-bounce-stack": (
    <div className={stage}>
      <div className="font-sans w-full max-w-[340px]">
        <CardBounceStack />
      </div>
    </div>
  ),
  "card-chroma-grid": (
    <div className={stage}>
      <div className="w-full max-w-[340px] font-sans">
        <CardChromaGrid />
      </div>
    </div>
  ),
  "gallery-accordion": (
    <div className={stage}>
      <div className="font-grotesk w-full max-w-[340px]">
        <GalleryAccordion height={176} />
      </div>
    </div>
  ),
  "gallery-drift-wall": (
    <div className={stage}>
      <div className="font-mono w-full max-w-[340px]">
        <GalleryDriftWall height={180} />
      </div>
    </div>
  ),
  "card-stack-drag": (
    <div className={stage}>
      <div className="font-sans w-[300px]">
        <CardStackDrag />
      </div>
    </div>
  ),
};

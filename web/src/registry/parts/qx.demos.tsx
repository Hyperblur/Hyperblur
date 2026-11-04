import type { ReactNode } from "react";
import { GalleryFilmstrip } from "@/registry/hyperblur/gallery-filmstrip";
import { GalleryRailHang } from "@/registry/hyperblur/gallery-rail-hang";
import { GalleryCoverflowLights } from "@/registry/hyperblur/gallery-coverflow-lights";
import { GalleryScatter } from "@/registry/hyperblur/gallery-scatter";
import { GalleryRunway } from "@/registry/hyperblur/gallery-runway";

const roll = [
  { title: "Erg Chebbi at dawn", caption: "Roll 14, Portra 400" },
  { title: "Cais do Sodré", caption: "Roll 14, pushed one stop" },
  { title: "Moraine Lake", caption: "Roll 15, Ektar 100" },
  { title: "Golden Gai", caption: "Roll 15, CineStill 800T" },
  { title: "Hoh Rainforest", caption: "Roll 16, Gold 200" },
  { title: "Bixby Bridge", caption: "Roll 16, Portra 160" },
];

const looks = [
  { title: "Look 01 Sand linen", caption: "Relaxed shirt in washed linen, $148" },
  { title: "Look 02 Night denim", caption: "Raw selvedge jacket, $220" },
  { title: "Look 03 Glacier knit", caption: "Merino crew in mineral blue, $165" },
  { title: "Look 04 Orchid silk", caption: "Bias-cut slip dress, $240" },
  { title: "Look 05 Fern twill", caption: "Utility overshirt, $180" },
  { title: "Look 06 Coral gauze", caption: "Wrap skirt, $132" },
];

const albums = [
  { title: "Low Tide", caption: "Marlow Keys, 2026" },
  { title: "Harbor Lights", caption: "The Quiet Fleet, 2025" },
  { title: "Blue Hour", caption: "Ines Calder, 2026" },
  { title: "After Midnight", caption: "Neon Saints, 2024" },
  { title: "Evergreen", caption: "Rowan & Field, 2025" },
  { title: "Coral Hour", caption: "Sun Arcade, 2026" },
];

const trip = [
  { title: "Merzouga", caption: "Day 2" },
  { title: "Lisbon", caption: "Day 5" },
  { title: "Banff", caption: "Day 9" },
  { title: "Tokyo", caption: "Day 14" },
  { title: "Olympic NP", caption: "Day 18" },
  { title: "Big Sur", caption: "Day 21" },
];

const collection = [
  { title: "Dune No. 4", caption: "Archival print, 40 x 50 cm" },
  { title: "Harbor, Blue", caption: "Archival print, 50 x 70 cm" },
  { title: "Still Water", caption: "Archival print, 40 x 50 cm" },
  { title: "Night Market", caption: "Archival print, 30 x 40 cm" },
  { title: "Old Growth", caption: "Archival print, 50 x 70 cm" },
  { title: "Coastline II", caption: "Archival print, 40 x 50 cm" },
];

export const qxDemos: Record<string, ReactNode> = {
  "gallery-filmstrip": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <GalleryFilmstrip className="font-mono" images={roll} height={184} speed={0.4} />
      </div>
    </div>
  ),
  "gallery-rail-hang": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <GalleryRailHang className="font-sans" images={looks} height={184} accent="#7fb3ff" />
      </div>
    </div>
  ),
  "gallery-coverflow-lights": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <GalleryCoverflowLights className="font-serif" images={albums} height={184} interval={2800} />
      </div>
    </div>
  ),
  "gallery-scatter": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <GalleryScatter className="font-grotesk" images={trip} height={184} interval={2600} />
      </div>
    </div>
  ),
  "gallery-runway": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <GalleryRunway className="font-sans" images={collection} height={184} />
      </div>
    </div>
  ),
};

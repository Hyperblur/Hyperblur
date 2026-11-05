import type { ReactNode } from "react";
import { GalleryShowcase } from "@/registry/hyperblur/gallery-showcase";
import { GalleryArchive } from "@/registry/hyperblur/gallery-archive";
import { GalleryBackstage } from "@/registry/hyperblur/gallery-backstage";
import { GalleryGridExpand } from "@/registry/hyperblur/gallery-grid-expand";
import { GalleryCoverflow } from "@/registry/hyperblur/gallery-coverflow";

export const qwDemos: Record<string, ReactNode> = {
  "gallery-showcase": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[300px] text-[12px]">
        <GalleryShowcase
          ratio="2.15 / 1"
          thumbHeight={32}
          interval={3600}
          images={[
            { title: "Dune Hour", caption: "Erg Chebbi, the last light before dusk" },
            { title: "Harbor Lights", caption: "Lisbon waterfront after the rain" },
            { title: "Glacier Line", caption: "Jokulsarlon lagoon, early blue" },
            { title: "Pine Ridge", caption: "Fog lifting off the Cascades" },
            { title: "Polar Night", caption: "Aurora over the fjord near Tromso" },
            { title: "Sun Room", caption: "Studio still life, morning light" },
          ]}
        />
      </div>
    </div>
  ),
  "gallery-archive": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-sans w-full max-w-[330px] text-[12px]">
        <GalleryArchive
          previewWidth={118}
          columns={["Year", "Selected work", "Type"]}
          images={[
            { title: "Dune Hour", caption: "Erg Chebbi, Morocco", year: 2024, tag: "Desert" },
            { title: "Harbor Lights", caption: "Lisbon, Portugal", year: 2023, tag: "City" },
            { title: "Glacier Line", caption: "Jokulsarlon, Iceland", year: 2022, tag: "Water" },
            { title: "Pine Ridge", caption: "Cascade Range, Oregon", year: 2021, tag: "Forest" },
            { title: "Polar Night", caption: "Tromso, Norway", year: 2020, tag: "Night" },
          ]}
        />
      </div>
    </div>
  ),
  "gallery-backstage": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-mono w-full max-w-[340px] text-[12px]">
        <GalleryBackstage
          height={184}
          images={[
            { title: "Dune Hour", caption: "NO. 01 / ERG CHEBBI" },
            { title: "Harbor Lights", caption: "NO. 02 / LISBON" },
            { title: "Glacier Line", caption: "NO. 03 / ICELAND" },
            { title: "Pine Ridge", caption: "NO. 04 / OREGON" },
            { title: "Polar Night", caption: "NO. 05 / TROMSO" },
            { title: "Sun Room", caption: "NO. 06 / BROOKLYN" },
          ]}
        />
      </div>
    </div>
  ),
  "gallery-grid-expand": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[320px] text-[12px] text-[#ededed]">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-[13px] font-medium">Location shortlist</span>
          <span className="text-[11px] text-[#8f8f8f]">6 places</span>
        </div>
        <GalleryGridExpand
          gap={6}
          images={[
            { title: "Dune Hour", caption: "Erg Chebbi, Morocco. Ridge access by 4x4, best at sunset." },
            { title: "Harbor Lights", caption: "Lisbon waterfront. Permit needed after 10 p.m." },
            { title: "Glacier Line", caption: "Jokulsarlon, Iceland. Bring drysuits for the lagoon shots." },
            { title: "Pine Ridge", caption: "Cascade Range, Oregon. Fog most mornings in October." },
            { title: "Polar Night", caption: "Tromso, Norway. Aurora window from 9 p.m. to 2 a.m." },
            { title: "Sun Room", caption: "Brooklyn studio. North light, available weekdays." },
          ]}
        />
      </div>
    </div>
  ),
  "gallery-coverflow": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-display w-full max-w-[340px] text-[12px]">
        <GalleryCoverflow
          height={150}
          images={[
            { title: "Dune Hour", caption: "Side A / 4 tracks" },
            { title: "Harbor Lights", caption: "Night drive mix" },
            { title: "Glacier Line", caption: "Ambient, 38 min" },
            { title: "Pine Ridge", caption: "Field recordings" },
            { title: "Polar Night", caption: "Synth sessions" },
            { title: "Sun Room", caption: "Morning acoustic" },
          ]}
        />
      </div>
    </div>
  ),
};

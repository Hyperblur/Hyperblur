import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ShowcaseCursorPreview } from "@/registry/hyperblur/showcase-cursor-preview";
import { ShowcaseCaseRail } from "@/registry/hyperblur/showcase-case-rail";
import { ShowcaseDeviceGallery } from "@/registry/hyperblur/showcase-device-gallery";
import { StepsCircuit } from "@/registry/hyperblur/steps-circuit";
import { StepsStoryTabs } from "@/registry/hyperblur/steps-story-tabs";
import { StepsScrollRuler } from "@/registry/hyperblur/steps-scroll-ruler";
import { DownloadOsHub } from "@/registry/hyperblur/download-os-hub";
import { DownloadVersionTable } from "@/registry/hyperblur/download-version-table";
import { BlogReadingTime } from "@/registry/hyperblur/blog-reading-time";
import { BlogMagazineGrid } from "@/registry/hyperblur/blog-magazine-grid";
import { ShopSpinConfigurator } from "@/registry/hyperblur/shop-spin-configurator";
import { ShopFilterChips } from "@/registry/hyperblur/shop-filter-chips";

export const weDemos: Record<string, ReactNode> = {
  "showcase-cursor-preview": thumb(<ShowcaseCursorPreview defaultActive={1} />),
  "showcase-case-rail": thumb(<ShowcaseCaseRail />),
  "showcase-device-gallery": thumb(<ShowcaseDeviceGallery defaultDevice="tablet" />),
  "steps-circuit": thumb(<StepsCircuit defaultStep={1} />),
  "steps-story-tabs": thumb(<StepsStoryTabs defaultStep={2} />),
  "steps-scroll-ruler": thumb(<StepsScrollRuler autoPlay />),
  "download-os-hub": thumb(<DownloadOsHub platform="macos" />),
  "download-version-table": thumb(<DownloadVersionTable defaultOpenVersion="6.3.0" />),
  "blog-reading-time": thumb(<BlogReadingTime />),
  "blog-magazine-grid": thumb(<BlogMagazineGrid />),
  "shop-spin-configurator": thumb(<ShopSpinConfigurator />),
  "shop-filter-chips": thumb(<ShopFilterChips defaultTags={["Recycled"]} />),
};

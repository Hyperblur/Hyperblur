import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ComparisonTiers } from "@/registry/hyperblur/comparison-tiers";
import { ComparisonScorecard } from "@/registry/hyperblur/comparison-scorecard";
import { ComparisonCalculator } from "@/registry/hyperblur/comparison-calculator";
import { NavTabBar } from "@/registry/hyperblur/nav-tab-bar";
import { NavAppHeader } from "@/registry/hyperblur/nav-app-header";
import { NavSideDock } from "@/registry/hyperblur/nav-side-dock";
import { ShowcaseBentoGallery } from "@/registry/hyperblur/showcase-bento-gallery";
import { ShowcaseBeforeAfter } from "@/registry/hyperblur/showcase-before-after";
import { ShowcaseDeviceTabs } from "@/registry/hyperblur/showcase-device-tabs";
import { DownloadChangelog } from "@/registry/hyperblur/download-changelog";
import { DownloadRequirements } from "@/registry/hyperblur/download-requirements";
import { DownloadQrHandoff } from "@/registry/hyperblur/download-qr-handoff";

const wide = { width: 1120, scale: 0.29 };

export const sectionsYHDemos: Record<string, ReactNode> = {
  "comparison-tiers": thumb(<ComparisonTiers />, { y: 30 }),
  "comparison-scorecard": thumb(<ComparisonScorecard />, { y: 40 }),
  "comparison-calculator": thumb(<ComparisonCalculator />, { y: 30 }),
  "nav-tab-bar": thumb(<NavTabBar />, wide),
  "nav-app-header": thumb(<NavAppHeader defaultMenuOpen />, wide),
  "nav-side-dock": thumb(<NavSideDock />, wide),
  "showcase-bento-gallery": thumb(<ShowcaseBentoGallery />, { y: 30 }),
  "showcase-before-after": thumb(<ShowcaseBeforeAfter />, { y: 30 }),
  "showcase-device-tabs": thumb(<ShowcaseDeviceTabs />, { y: 20 }),
  "download-changelog": thumb(<DownloadChangelog />, { y: 30 }),
  "download-requirements": thumb(<DownloadRequirements />, { y: 30 }),
  "download-qr-handoff": thumb(<DownloadQrHandoff />, { y: 30 }),
};

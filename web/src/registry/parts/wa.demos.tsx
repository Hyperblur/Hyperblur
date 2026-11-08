import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { FeaturesStickySwap } from "@/registry/hyperblur/features-sticky-swap";
import { FeaturesLiveTabs } from "@/registry/hyperblur/features-live-tabs";
import { FeaturesHoverReveal } from "@/registry/hyperblur/features-hover-reveal";
import { FeaturesDiagonalFlow } from "@/registry/hyperblur/features-diagonal-flow";
import { FeaturesMiniUi } from "@/registry/hyperblur/features-mini-ui";
import { FeaturesBeforeAfter } from "@/registry/hyperblur/features-before-after";
import { BentoLiveWidgets } from "@/registry/hyperblur/bento-live-widgets";
import { BentoHeroSatellites } from "@/registry/hyperblur/bento-hero-satellites";
import { BentoHoverExpand } from "@/registry/hyperblur/bento-hover-expand";
import { BentoScanSweep } from "@/registry/hyperblur/bento-scan-sweep";
import { BentoShuffle } from "@/registry/hyperblur/bento-shuffle";
import { BentoTiltedPlane } from "@/registry/hyperblur/bento-tilted-plane";

export const waDemos: Record<string, ReactNode> = {
  "features-sticky-swap": thumb(<FeaturesStickySwap autoPlay />),
  "features-live-tabs": thumb(<FeaturesLiveTabs />),
  "features-hover-reveal": thumb(<FeaturesHoverReveal />),
  "features-diagonal-flow": thumb(<FeaturesDiagonalFlow />),
  "features-mini-ui": thumb(<FeaturesMiniUi />),
  "features-before-after": thumb(<FeaturesBeforeAfter />),
  "bento-live-widgets": thumb(<BentoLiveWidgets />),
  "bento-hero-satellites": thumb(<BentoHeroSatellites />),
  "bento-hover-expand": thumb(<BentoHoverExpand />),
  "bento-scan-sweep": thumb(<BentoScanSweep />),
  "bento-shuffle": thumb(<BentoShuffle />),
  "bento-tilted-plane": thumb(<BentoTiltedPlane autoPlay />),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { FeaturesGridGlow } from "@/registry/hyperblur/features-grid-glow";
import { FeaturesAlternating } from "@/registry/hyperblur/features-alternating";
import { FeaturesTabs } from "@/registry/hyperblur/features-tabs";
import { FeaturesChecklist } from "@/registry/hyperblur/features-checklist";
import { FeaturesOrbit } from "@/registry/hyperblur/features-orbit";
import { StatsCounters } from "@/registry/hyperblur/stats-counters";
import { StatsBarRace } from "@/registry/hyperblur/stats-bar-race";
import { StatsRadial } from "@/registry/hyperblur/stats-radial";
import { StatsTicker } from "@/registry/hyperblur/stats-ticker";

export const sectionsADemos: Record<string, ReactNode> = {
  "features-grid-glow": thumb(<FeaturesGridGlow />, { y: 40 }),
  "features-alternating": thumb(<FeaturesAlternating />, { y: 300 }),
  "features-tabs": thumb(<FeaturesTabs />, { y: 170 }),
  "features-checklist": thumb(<FeaturesChecklist />, { y: 100 }),
  "features-orbit": thumb(<FeaturesOrbit />),
  "stats-counters": thumb(<StatsCounters />, { y: 20 }),
  "stats-bar-race": thumb(<StatsBarRace />, { y: 20 }),
  "stats-radial": thumb(<StatsRadial />, { y: 110 }),
  "stats-ticker": thumb(<StatsTicker />),
};

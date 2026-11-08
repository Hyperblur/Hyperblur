import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroPrism } from "@/registry/hyperblur/hero-prism";
import { HeroGlassOrbs } from "@/registry/hyperblur/hero-glass-orbs";
import { HeroStageLight } from "@/registry/hyperblur/hero-stage-light";
import { HeroKinetic } from "@/registry/hyperblur/hero-kinetic";
import { HeroDevices } from "@/registry/hyperblur/hero-devices";
import { HeroGradientSphere } from "@/registry/hyperblur/hero-gradient-sphere";
import { HeroTerminal } from "@/registry/hyperblur/hero-terminal";
import { HeroCardWall } from "@/registry/hyperblur/hero-card-wall";
import { HeroLiveMetrics } from "@/registry/hyperblur/hero-live-metrics";
import { HeroAuroraLit } from "@/registry/hyperblur/hero-aurora-lit";
import { HeroLightRibbon } from "@/registry/hyperblur/hero-light-ribbon";
import { HeroSwiss } from "@/registry/hyperblur/hero-swiss";

export const vbDemos: Record<string, ReactNode> = {
  "hero-prism": thumb(<HeroPrism headingAs="h2" />, { scale: 0.34 }),
  "hero-glass-orbs": thumb(<HeroGlassOrbs headingAs="h2" />, { scale: 0.34 }),
  "hero-stage-light": thumb(<HeroStageLight headingAs="h2" />, { scale: 0.34 }),
  "hero-kinetic": thumb(<HeroKinetic headingAs="h2" />, { scale: 0.34 }),
  "hero-devices": thumb(<HeroDevices headingAs="h2" />, { scale: 0.34 }),
  "hero-gradient-sphere": thumb(<HeroGradientSphere headingAs="h2" />, { scale: 0.34 }),
  "hero-terminal": thumb(<HeroTerminal headingAs="h2" />, { scale: 0.34 }),
  "hero-card-wall": thumb(<HeroCardWall headingAs="h2" />, { scale: 0.34 }),
  "hero-live-metrics": thumb(<HeroLiveMetrics headingAs="h2" />, { scale: 0.34 }),
  "hero-aurora-lit": thumb(<HeroAuroraLit headingAs="h2" />, { scale: 0.34 }),
  "hero-light-ribbon": thumb(<HeroLightRibbon headingAs="h2" />, { scale: 0.34 }),
  "hero-swiss": thumb(<HeroSwiss headingAs="h2" />, { scale: 0.34 }),
};

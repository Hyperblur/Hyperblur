import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotGalaxy } from "@/registry/hyperblur/hero-dot-galaxy";
import { HeroDotTorus } from "@/registry/hyperblur/hero-dot-torus";
import { HeroDotWave } from "@/registry/hyperblur/hero-dot-wave";

export const hoBDemos: Record<string, ReactNode> = {
  "hero-dot-galaxy": thumb(<HeroDotGalaxy headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-torus": thumb(<HeroDotTorus headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-wave": thumb(<HeroDotWave headingAs="h2" />, { scale: 0.34 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotSaturn } from "@/registry/hyperblur/hero-dot-saturn";
import { HeroDotDna } from "@/registry/hyperblur/hero-dot-dna";
import { HeroDotOrbit } from "@/registry/hyperblur/hero-dot-orbit";

export const hoADemos: Record<string, ReactNode> = {
  "hero-dot-saturn": thumb(<HeroDotSaturn headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-dna": thumb(<HeroDotDna headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-orbit": thumb(<HeroDotOrbit headingAs="h2" />, { scale: 0.34 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroSpotlight } from "@/registry/hyperblur/hero-spotlight";
import { HeroParticles } from "@/registry/hyperblur/hero-particles";
import { HeroBeams } from "@/registry/hyperblur/hero-beams";

export const heroesBDemos: Record<string, ReactNode> = {
  "hero-spotlight": thumb(<HeroSpotlight />),
  "hero-particles": thumb(<HeroParticles />),
  "hero-beams": thumb(<HeroBeams />),
};

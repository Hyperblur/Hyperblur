import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotGlobe } from "@/registry/hyperblur/hero-dot-globe";

export const rcDemos: Record<string, ReactNode> = {
  "hero-dot-globe": thumb(<HeroDotGlobe headingAs="h2" />, { scale: 0.34 }),
};

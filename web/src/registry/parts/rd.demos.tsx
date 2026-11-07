import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotEarth } from "@/registry/hyperblur/hero-dot-earth";

export const rdDemos: Record<string, ReactNode> = {
  "hero-dot-earth": thumb(<HeroDotEarth headingAs="h2" />, { scale: 0.34 }),
};

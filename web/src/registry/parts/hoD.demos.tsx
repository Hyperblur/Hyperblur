import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotWorldmap } from "@/registry/hyperblur/hero-dot-worldmap";

export const hoDDemos: Record<string, ReactNode> = {
  "hero-dot-worldmap": thumb(<HeroDotWorldmap headingAs="h2" />, { scale: 0.34 }),
};

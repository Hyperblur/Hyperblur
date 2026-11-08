import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotBrain } from "@/registry/hyperblur/hero-dot-brain";
import { HeroDotHead } from "@/registry/hyperblur/hero-dot-head";
import { HeroDotHand } from "@/registry/hyperblur/hero-dot-hand";

export const hoEDemos: Record<string, ReactNode> = {
  "hero-dot-brain": thumb(<HeroDotBrain headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-head": thumb(<HeroDotHead headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-hand": thumb(<HeroDotHand headingAs="h2" />, { scale: 0.34 }),
};

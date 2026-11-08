import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroDotText } from "@/registry/hyperblur/hero-dot-text";
import { HeroDotLogo } from "@/registry/hyperblur/hero-dot-logo";
import { HeroDotSilhouette } from "@/registry/hyperblur/hero-dot-silhouette";

export const hoCDemos: Record<string, ReactNode> = {
  "hero-dot-text": thumb(<HeroDotText headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-logo": thumb(<HeroDotLogo headingAs="h2" />, { scale: 0.34 }),
  "hero-dot-silhouette": thumb(<HeroDotSilhouette headingAs="h2" />, { scale: 0.34 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroAurora } from "@/registry/hyperblur/hero-aurora";
import { HeroGrid } from "@/registry/hyperblur/hero-grid";
import { HeroProduct } from "@/registry/hyperblur/hero-product";
import { HeroType } from "@/registry/hyperblur/hero-type";

export const heroesADemos: Record<string, ReactNode> = {
  "hero-aurora": thumb(<HeroAurora headingAs="h2" />, { scale: 0.34 }),
  "hero-grid": thumb(<HeroGrid headingAs="h2" />, { scale: 0.34 }),
  "hero-product": thumb(<HeroProduct headingAs="h2" />, { scale: 0.34 }),
  "hero-type": thumb(<HeroType headingAs="h2" />, { scale: 0.34 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroScrollExpand } from "@/registry/hyperblur/hero-scroll-expand";
import { HeroScrollMorph } from "@/registry/hyperblur/hero-scroll-morph";
import { HeroScrollHorizontal } from "@/registry/hyperblur/hero-scroll-horizontal";
import { HeroScrollLetters } from "@/registry/hyperblur/hero-scroll-letters";
import { HeroScrollCurtain } from "@/registry/hyperblur/hero-scroll-curtain";
import { HeroScrollStack } from "@/registry/hyperblur/hero-scroll-stack";
import { HeroScrollMask } from "@/registry/hyperblur/hero-scroll-mask";
import { HeroScrollRing } from "@/registry/hyperblur/hero-scroll-ring";
import { HeroScrollWipe } from "@/registry/hyperblur/hero-scroll-wipe";
import { HeroScrollTimeline } from "@/registry/hyperblur/hero-scroll-timeline";
import { HeroScrollSplit } from "@/registry/hyperblur/hero-scroll-split";
import { HeroScrollDepth } from "@/registry/hyperblur/hero-scroll-depth";

const stage = "620px";

export const vaDemos: Record<string, ReactNode> = {
  "hero-scroll-expand": thumb(<HeroScrollExpand headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-morph": thumb(<HeroScrollMorph headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-horizontal": thumb(<HeroScrollHorizontal headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-letters": thumb(<HeroScrollLetters headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-curtain": thumb(<HeroScrollCurtain headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-stack": thumb(<HeroScrollStack headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-mask": thumb(<HeroScrollMask headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-ring": thumb(<HeroScrollRing headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-wipe": thumb(<HeroScrollWipe headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-timeline": thumb(<HeroScrollTimeline headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-split": thumb(<HeroScrollSplit headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
  "hero-scroll-depth": thumb(<HeroScrollDepth headingAs="h2" autoPlay height={stage} />, { scale: 0.34 }),
};

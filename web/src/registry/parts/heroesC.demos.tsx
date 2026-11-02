import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HeroEditorial } from "@/registry/hyperblur/hero-editorial";
import { HeroOrbs } from "@/registry/hyperblur/hero-orbs";
import { HeroPrompt } from "@/registry/hyperblur/hero-prompt";

export const heroesCDemos: Record<string, ReactNode> = {
  "hero-editorial": (
    <>
      <div className="absolute inset-0 bg-[#f7f5ef]" />
      {thumb(<HeroEditorial />, { scale: 0.36, y: 0 })}
    </>
  ),
  "hero-orbs": thumb(<HeroOrbs />, { scale: 0.34, y: 0 }),
  "hero-prompt": thumb(<HeroPrompt />, { scale: 0.34, y: 0 }),
};

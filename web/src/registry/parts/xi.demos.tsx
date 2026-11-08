import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { NavbarPrismGlass } from "@/registry/hyperblur/navbar-prism-glass";
import { NavbarMorphUnderline } from "@/registry/hyperblur/navbar-morph-underline";
import { NavbarMagnetic } from "@/registry/hyperblur/navbar-magnetic";
import { NavbarSpotlight } from "@/registry/hyperblur/navbar-spotlight";
import { NavbarMegaPreview } from "@/registry/hyperblur/navbar-mega-preview";
import { NavbarCommand } from "@/registry/hyperblur/navbar-command";
import { NavbarHamburgerMorph } from "@/registry/hyperblur/navbar-hamburger-morph";
import { NavbarBannerStories } from "@/registry/hyperblur/navbar-banner-stories";
import { NavbarSplitLogo } from "@/registry/hyperblur/navbar-split-logo";
import { NavbarScrollShrinkDemo } from "@/registry/demos/navbar-scroll-shrink-demo";

const wide = { width: 1120, scale: 0.29 };

export const xiDemos: Record<string, ReactNode> = {
  "navbar-prism-glass": thumb(<NavbarPrismGlass frost={0.55} />, wide),
  "navbar-morph-underline": thumb(<NavbarMorphUnderline />, wide),
  "navbar-magnetic": thumb(<NavbarMagnetic />, wide),
  "navbar-spotlight": thumb(<NavbarSpotlight idleAt={0.42} />, wide),
  "navbar-scroll-shrink": thumb(<NavbarScrollShrinkDemo />, wide),
  "navbar-mega-preview": thumb(<NavbarMegaPreview defaultOpenId="platform" defaultItem={1} />, wide),
  "navbar-command": thumb(<NavbarCommand defaultOpen defaultQuery="de" />, wide),
  "navbar-hamburger-morph": thumb(<NavbarHamburgerMorph embedded defaultOpen />, wide),
  "navbar-banner-stories": thumb(<NavbarBannerStories />, wide),
  "navbar-split-logo": thumb(<NavbarSplitLogo />, wide),
};

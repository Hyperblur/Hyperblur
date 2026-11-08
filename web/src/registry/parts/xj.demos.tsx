import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { NavbarFloatingCapsule } from "@/registry/hyperblur/navbar-floating-capsule";
import { NavbarVerticalRail } from "@/registry/hyperblur/navbar-vertical-rail";
import { NavbarTabsStretch } from "@/registry/hyperblur/navbar-tabs-stretch";
import { NavbarSearchFirst } from "@/registry/hyperblur/navbar-search-first";
import { NavbarBottomNotch } from "@/registry/hyperblur/navbar-bottom-notch";
import { NavbarCommerceRows } from "@/registry/hyperblur/navbar-commerce-rows";
import { NavbarThemeReveal } from "@/registry/hyperblur/navbar-theme-reveal";
import { NavbarHeroFill } from "@/registry/hyperblur/navbar-hero-fill";
import { NavbarDockStacks } from "@/registry/hyperblur/navbar-dock-stacks";
import { NavbarBreadcrumbSwitcher } from "@/registry/hyperblur/navbar-breadcrumb-switcher";

const wide = { width: 1040, scale: 0.335 };

export const xjDemos: Record<string, ReactNode> = {
  "navbar-floating-capsule": thumb(<NavbarFloatingCapsule merged={false} />, wide),
  "navbar-vertical-rail": thumb(<NavbarVerticalRail defaultActive={1} />, { width: 1120, scale: 0.31 }),
  "navbar-tabs-stretch": thumb(<NavbarTabsStretch />, wide),
  "navbar-search-first": thumb(<NavbarSearchFirst defaultOpen defaultQuery="pay" />, wide),
  "navbar-bottom-notch": thumb(<NavbarBottomNotch defaultValue={1} />, { width: 600, scale: 0.35 }),
  "navbar-commerce-rows": thumb(<NavbarCommerceRows defaultCategory="Women" />, { width: 1100, scale: 0.32 }),
  "navbar-theme-reveal": thumb(<NavbarThemeReveal defaultTheme="light" />, wide),
  "navbar-hero-fill": thumb(<NavbarHeroFill />, wide),
  "navbar-dock-stacks": thumb(<NavbarDockStacks defaultOpenStack={1} />, wide),
  "navbar-breadcrumb-switcher": thumb(<NavbarBreadcrumbSwitcher defaultOpen="project" />, wide),
};

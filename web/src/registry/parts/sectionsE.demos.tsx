import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { NavMegaMenu } from "@/registry/hyperblur/nav-mega-menu";
import { NavFloatingIsland } from "@/registry/hyperblur/nav-floating-island";
import { NavSidebarMobile } from "@/registry/hyperblur/nav-sidebar-mobile";
import { NavAnnounceSplit } from "@/registry/hyperblur/nav-announce-split";
import { FooterMega } from "@/registry/hyperblur/footer-mega";
import { FooterGiantWordmark } from "@/registry/hyperblur/footer-giant-wordmark";
import { FooterCtaSitemap } from "@/registry/hyperblur/footer-cta-sitemap";
import { FooterLinksRail } from "@/registry/hyperblur/footer-links-rail";

const wide = { width: 1120, scale: 0.29 };

export const sectionsEDemos: Record<string, ReactNode> = {
  "nav-mega-menu": thumb(<NavMegaMenu defaultOpenId="product" />, wide),
  "nav-floating-island": thumb(<NavFloatingIsland defaultMenuOpen />, wide),
  "nav-sidebar-mobile": thumb(<NavSidebarMobile defaultOpen />, wide),
  "nav-announce-split": thumb(<NavAnnounceSplit progress={0.42} />, wide),
  "footer-mega": thumb(<FooterMega />, wide),
  "footer-giant-wordmark": thumb(<FooterGiantWordmark />, wide),
  "footer-cta-sitemap": thumb(<FooterCtaSitemap />, wide),
  "footer-links-rail": thumb(<FooterLinksRail />, wide),
};

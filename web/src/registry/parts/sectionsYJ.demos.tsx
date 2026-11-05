import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { NotfoundMaze } from "@/registry/hyperblur/notfound-maze";
import { NotfoundLetter } from "@/registry/hyperblur/notfound-letter";
import { ProofCaseStudies } from "@/registry/hyperblur/proof-case-studies";
import { ProofLiveActivity } from "@/registry/hyperblur/proof-live-activity";
import { HowStepperScreens } from "@/registry/hyperblur/how-stepper-screens";
import { HowDashedPath } from "@/registry/hyperblur/how-dashed-path";
import { BlogNewsletterIssues } from "@/registry/hyperblur/blog-newsletter-issues";
import { BlogCategoryTiles } from "@/registry/hyperblur/blog-category-tiles";
import { ShopReviews } from "@/registry/hyperblur/shop-reviews";
import { ShopCategoryMosaic } from "@/registry/hyperblur/shop-category-mosaic";
import { ShopOrderTracking } from "@/registry/hyperblur/shop-order-tracking";

export const sectionsYJDemos: Record<string, ReactNode> = {
  "notfound-maze": thumb(<NotfoundMaze />),
  "notfound-letter": thumb(<NotfoundLetter />, { y: 40 }),
  "proof-case-studies": thumb(<ProofCaseStudies />),
  "proof-live-activity": thumb(<ProofLiveActivity />),
  "how-stepper-screens": thumb(<HowStepperScreens />, { y: 60 }),
  "how-dashed-path": thumb(<HowDashedPath />),
  "blog-newsletter-issues": thumb(<BlogNewsletterIssues />),
  "blog-category-tiles": thumb(<BlogCategoryTiles />),
  "shop-reviews": thumb(<ShopReviews />),
  "shop-category-mosaic": thumb(<ShopCategoryMosaic />),
  "shop-order-tracking": thumb(<ShopOrderTracking />),
};

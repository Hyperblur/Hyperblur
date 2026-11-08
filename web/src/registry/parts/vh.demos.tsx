import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { PricingToggleBurst } from "@/registry/hyperblur/pricing-toggle-burst";
import { PricingUsageCalculator } from "@/registry/hyperblur/pricing-usage-calculator";
import { PricingSpotlightGrid } from "@/registry/hyperblur/pricing-spotlight-grid";
import { PricingMatrixSticky } from "@/registry/hyperblur/pricing-matrix-sticky";
import { PricingTierCarousel } from "@/registry/hyperblur/pricing-tier-carousel";
import { PricingRibbonHighlight } from "@/registry/hyperblur/pricing-ribbon-highlight";
import { PricingEnterpriseContact } from "@/registry/hyperblur/pricing-enterprise-contact";
import { PricingCreditStack } from "@/registry/hyperblur/pricing-credit-stack";
import { PricingSeatStepper } from "@/registry/hyperblur/pricing-seat-stepper";
import { PricingSinglePlan } from "@/registry/hyperblur/pricing-single-plan";

export const vhDemos: Record<string, ReactNode> = {
  "pricing-toggle-burst": thumb(<PricingToggleBurst defaultPeriod="yearly" />, { y: 110 }),
  "pricing-usage-calculator": thumb(<PricingUsageCalculator />, { y: 120 }),
  "pricing-spotlight-grid": thumb(<PricingSpotlightGrid />, { y: 140 }),
  "pricing-matrix-sticky": thumb(<PricingMatrixSticky />, { y: 30 }),
  "pricing-tier-carousel": thumb(<PricingTierCarousel />, { y: 200 }),
  "pricing-ribbon-highlight": thumb(<PricingRibbonHighlight />, { y: 150 }),
  "pricing-enterprise-contact": thumb(<PricingEnterpriseContact />, { y: 20 }),
  "pricing-credit-stack": thumb(<PricingCreditStack />, { y: 120 }),
  "pricing-seat-stepper": thumb(<PricingSeatStepper />, { y: 110 }),
  "pricing-single-plan": thumb(<PricingSinglePlan />, { y: 60 }),
};

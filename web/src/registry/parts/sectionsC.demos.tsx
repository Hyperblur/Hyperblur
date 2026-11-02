import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { PricingSwitch } from "@/registry/hyperblur/pricing-switch";
import { PricingSlider } from "@/registry/hyperblur/pricing-slider";
import { PricingCompareCards } from "@/registry/hyperblur/pricing-compare-cards";
import { PricingCredits } from "@/registry/hyperblur/pricing-credits";
import { ComparisonTable } from "@/registry/hyperblur/comparison-table";
import { ComparisonVersus } from "@/registry/hyperblur/comparison-versus";
import { ComparisonSlider } from "@/registry/hyperblur/comparison-slider";
import { CtaGradientCard } from "@/registry/hyperblur/cta-gradient-card";
import { CtaMarqueeBand } from "@/registry/hyperblur/cta-marquee-band";
import { CtaSplitLight } from "@/registry/hyperblur/cta-split-light";

export const sectionsCDemos: Record<string, ReactNode> = {
  "pricing-switch": thumb(<PricingSwitch />),
  "pricing-slider": thumb(<PricingSlider />),
  "pricing-compare-cards": thumb(<PricingCompareCards />),
  "pricing-credits": thumb(<PricingCredits />),
  "comparison-table": thumb(<ComparisonTable />),
  "comparison-versus": thumb(<ComparisonVersus />),
  "comparison-slider": thumb(<ComparisonSlider />),
  "cta-gradient-card": thumb(<CtaGradientCard />),
  "cta-marquee-band": thumb(<CtaMarqueeBand />),
  "cta-split-light": thumb(<CtaSplitLight />),
};

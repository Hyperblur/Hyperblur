import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ProofWall } from "@/registry/hyperblur/proof-wall";
import { ProofSpotlightQuote } from "@/registry/hyperblur/proof-spotlight-quote";
import { ProofLogoCloud } from "@/registry/hyperblur/proof-logo-cloud";
import { ProofMetricsQuotes } from "@/registry/hyperblur/proof-metrics-quotes";
import { FaqSearch } from "@/registry/hyperblur/faq-search";
import { FaqTwoColumn } from "@/registry/hyperblur/faq-two-column";
import { FaqCategories } from "@/registry/hyperblur/faq-categories";
import { AboutStory } from "@/registry/hyperblur/about-story";
import { AboutValues } from "@/registry/hyperblur/about-values";

export const sectionsDDemos: Record<string, ReactNode> = {
  "proof-wall": thumb(<ProofWall />),
  "proof-spotlight-quote": thumb(<ProofSpotlightQuote />),
  "proof-logo-cloud": thumb(<ProofLogoCloud />),
  "proof-metrics-quotes": thumb(<ProofMetricsQuotes />),
  "faq-search": thumb(<FaqSearch />),
  "faq-two-column": thumb(<FaqTwoColumn />),
  "faq-categories": thumb(<FaqCategories />),
  "about-story": thumb(<AboutStory />),
  "about-values": thumb(<AboutValues />),
};

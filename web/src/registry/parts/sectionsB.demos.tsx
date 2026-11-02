import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { BentoProduct } from "@/registry/hyperblur/bento-product";
import { BentoMetrics } from "@/registry/hyperblur/bento-metrics";
import { BentoIntegrations } from "@/registry/hyperblur/bento-integrations";
import { BentoTerminal } from "@/registry/hyperblur/bento-terminal";
import { BentoEditorial } from "@/registry/hyperblur/bento-editorial";
import { BentoSpotlight } from "@/registry/hyperblur/bento-spotlight";
import { ShowcaseBrowser } from "@/registry/hyperblur/showcase-browser";
import { ShowcaseDeviceStack } from "@/registry/hyperblur/showcase-device-stack";
import { ShowcaseMarqueeCards } from "@/registry/hyperblur/showcase-marquee-cards";

export const sectionsBDemos: Record<string, ReactNode> = {
  "bento-product": thumb(<BentoProduct />),
  "bento-metrics": thumb(<BentoMetrics />),
  "bento-integrations": thumb(<BentoIntegrations />),
  "bento-terminal": thumb(<BentoTerminal />),
  "bento-editorial": thumb(<BentoEditorial />),
  "bento-spotlight": thumb(<BentoSpotlight />),
  "showcase-browser": thumb(<ShowcaseBrowser />),
  "showcase-device-stack": thumb(<ShowcaseDeviceStack />),
  "showcase-marquee-cards": thumb(<ShowcaseMarqueeCards />),
};

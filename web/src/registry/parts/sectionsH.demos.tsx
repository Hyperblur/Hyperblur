import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { HowStepsLine } from "@/registry/hyperblur/how-steps-line";
import { HowStickyScroll } from "@/registry/hyperblur/how-sticky-scroll";
import { HowTimelineVertical } from "@/registry/hyperblur/how-timeline-vertical";
import { HowFlowDiagram } from "@/registry/hyperblur/how-flow-diagram";
import { DownloadPlatforms } from "@/registry/hyperblur/download-platforms";
import { DownloadAppBadges } from "@/registry/hyperblur/download-app-badges";
import { DownloadInstallTabs } from "@/registry/hyperblur/download-install-tabs";
import { WaitlistCounter } from "@/registry/hyperblur/waitlist-counter";
import { WaitlistLaunchCard } from "@/registry/hyperblur/waitlist-launch-card";

export const sectionsHDemos: Record<string, ReactNode> = {
  "how-steps-line": thumb(<HowStepsLine />),
  "how-sticky-scroll": thumb(<HowStickyScroll />),
  "how-timeline-vertical": thumb(<HowTimelineVertical />),
  "how-flow-diagram": thumb(<HowFlowDiagram />),
  "download-platforms": thumb(<DownloadPlatforms />),
  "download-app-badges": thumb(<DownloadAppBadges />),
  "download-install-tabs": thumb(<DownloadInstallTabs />),
  "waitlist-counter": thumb(<WaitlistCounter />),
  "waitlist-launch-card": thumb(<WaitlistLaunchCard />),
};

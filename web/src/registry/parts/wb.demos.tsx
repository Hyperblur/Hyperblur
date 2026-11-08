import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ProofTiltedWall } from "@/registry/hyperblur/proof-tilted-wall";
import { ProofAvatarOrbit } from "@/registry/hyperblur/proof-avatar-orbit";
import { ProofLogoDock } from "@/registry/hyperblur/proof-logo-dock";
import { ProofVideoGrid } from "@/registry/hyperblur/proof-video-grid";
import { ProofReviewTicker } from "@/registry/hyperblur/proof-review-ticker";
import { StatsOdometer } from "@/registry/hyperblur/stats-odometer";
import { StatsScrubBand } from "@/registry/hyperblur/stats-scrub-band";
import { StatsArcGrid } from "@/registry/hyperblur/stats-arc-grid";
import { StatsVersus } from "@/registry/hyperblur/stats-versus";
import { StatsMilestones } from "@/registry/hyperblur/stats-milestones";

export const wbDemos: Record<string, ReactNode> = {
  "proof-tilted-wall": thumb(<ProofTiltedWall />),
  "proof-avatar-orbit": thumb(<ProofAvatarOrbit />),
  "proof-logo-dock": thumb(<ProofLogoDock />, { y: 20 }),
  "proof-video-grid": thumb(<ProofVideoGrid />),
  "proof-review-ticker": thumb(<ProofReviewTicker />),
  "stats-odometer": thumb(<StatsOdometer />),
  "stats-scrub-band": thumb(<StatsScrubBand />, { y: 20 }),
  "stats-arc-grid": thumb(<StatsArcGrid />),
  "stats-versus": thumb(<StatsVersus />),
  "stats-milestones": thumb(<StatsMilestones />),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AboutTeamFilter } from "@/registry/hyperblur/about-team-filter";
import { AboutTimelineScroll } from "@/registry/hyperblur/about-timeline-scroll";
import { AboutMissionSplit } from "@/registry/hyperblur/about-mission-split";
import { AboutPressWall } from "@/registry/hyperblur/about-press-wall";
import { WaitlistInlinePill } from "@/registry/hyperblur/waitlist-inline-pill";
import { WaitlistReferralBoard } from "@/registry/hyperblur/waitlist-referral-board";
import { WaitlistTeaserUnlock } from "@/registry/hyperblur/waitlist-teaser-unlock";
import { WaitlistCapacityCountdown } from "@/registry/hyperblur/waitlist-capacity-countdown";
import { ProfileSettingsCard } from "@/registry/hyperblur/profile-settings-card";
import { ProfileTeamPresence } from "@/registry/hyperblur/profile-team-presence";
import { ProfileResumeTimeline } from "@/registry/hyperblur/profile-resume-timeline";

export const sectionsYGDemos: Record<string, ReactNode> = {
  "about-team-filter": thumb(<AboutTeamFilter />),
  "about-timeline-scroll": thumb(<AboutTimelineScroll />),
  "about-mission-split": thumb(<AboutMissionSplit />),
  "about-press-wall": thumb(<AboutPressWall />),
  "waitlist-inline-pill": thumb(<WaitlistInlinePill />),
  "waitlist-referral-board": thumb(<WaitlistReferralBoard />),
  "waitlist-teaser-unlock": thumb(<WaitlistTeaserUnlock />),
  "waitlist-capacity-countdown": thumb(<WaitlistCapacityCountdown />),
  "profile-settings-card": thumb(<ProfileSettingsCard />),
  "profile-team-presence": thumb(<ProfileTeamPresence />),
  "profile-resume-timeline": thumb(<ProfileResumeTimeline />),
};

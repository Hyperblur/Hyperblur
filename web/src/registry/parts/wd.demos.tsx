import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ContactRouteMap } from "@/registry/hyperblur/contact-route-map";
import { ContactChannelPicker } from "@/registry/hyperblur/contact-channel-picker";
import { ContactOfficePostcards } from "@/registry/hyperblur/contact-office-postcards";
import { AboutGrowthTimeline } from "@/registry/hyperblur/about-growth-timeline";
import { AboutValuesMotifs } from "@/registry/hyperblur/about-values-motifs";
import { AboutTeamTimezones } from "@/registry/hyperblur/about-team-timezones";
import { WaitlistQueueTicket } from "@/registry/hyperblur/waitlist-queue-ticket";
import { WaitlistReferralLadder } from "@/registry/hyperblur/waitlist-referral-ladder";
import { ProfileCreatorStats } from "@/registry/hyperblur/profile-creator-stats";
import { ProfileDevSkyline } from "@/registry/hyperblur/profile-dev-skyline";
import { NotfoundOrbit } from "@/registry/hyperblur/notfound-orbit";
import { NotfoundTerminalShell } from "@/registry/hyperblur/notfound-terminal-shell";

export const wdDemos: Record<string, ReactNode> = {
  "contact-route-map": thumb(<ContactRouteMap />, { y: 120 }),
  "contact-channel-picker": thumb(<ContactChannelPicker defaultChannel="video" />),
  "contact-office-postcards": thumb(<ContactOfficePostcards />),
  "about-growth-timeline": thumb(<AboutGrowthTimeline />),
  "about-values-motifs": thumb(<AboutValuesMotifs />),
  "about-team-timezones": thumb(<AboutTeamTimezones />),
  "waitlist-queue-ticket": thumb(<WaitlistQueueTicket live={false} />),
  "waitlist-referral-ladder": thumb(<WaitlistReferralLadder defaultJoined defaultReferrals={3} />),
  "profile-creator-stats": thumb(<ProfileCreatorStats />),
  "profile-dev-skyline": thumb(<ProfileDevSkyline />),
  "notfound-orbit": thumb(<NotfoundOrbit />),
  "notfound-terminal-shell": thumb(<NotfoundTerminalShell />),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { CinemaTitleCard } from "@/registry/hyperblur/cinema-title-card";
import { CinemaTrailerSlam } from "@/registry/hyperblur/cinema-trailer-slam";
import { CinemaCreditsRoll } from "@/registry/hyperblur/cinema-credits-roll";
import { CinemaApertureOpen } from "@/registry/hyperblur/cinema-aperture-open";
import { CinemaLightLeak } from "@/registry/hyperblur/cinema-light-leak";
import { CinemaProjectorIntro } from "@/registry/hyperblur/cinema-projector-intro";
import { CinemaDepthFog } from "@/registry/hyperblur/cinema-depth-fog";
import { CinemaSplitReveal } from "@/registry/hyperblur/cinema-split-reveal";
import { CinemaCountdownLeader } from "@/registry/hyperblur/cinema-countdown-leader";
import { CinemaSubtitles } from "@/registry/hyperblur/cinema-subtitles";
import { CinemaDollyZoom } from "@/registry/hyperblur/cinema-dolly-zoom";
import { CinemaChapterSelect } from "@/registry/hyperblur/cinema-chapter-select";
import { CinemaNowShowing } from "@/registry/hyperblur/cinema-now-showing";
import { CinemaMarqueeSign } from "@/registry/hyperblur/cinema-marquee-sign";

export const vcDemos: Record<string, ReactNode> = {
  "cinema-title-card": thumb(<CinemaTitleCard headingAs="h2" />),
  "cinema-trailer-slam": thumb(<CinemaTrailerSlam headingAs="h2" />),
  "cinema-credits-roll": thumb(<CinemaCreditsRoll duration={30} />),
  "cinema-aperture-open": thumb(<CinemaApertureOpen headingAs="h2" />),
  "cinema-light-leak": thumb(<CinemaLightLeak headingAs="h2" />),
  "cinema-projector-intro": thumb(<CinemaProjectorIntro headingAs="h2" />),
  "cinema-depth-fog": thumb(<CinemaDepthFog headingAs="h2" />),
  "cinema-split-reveal": thumb(<CinemaSplitReveal headingAs="h2" />),
  "cinema-countdown-leader": thumb(<CinemaCountdownLeader headingAs="h2" />),
  "cinema-subtitles": thumb(<CinemaSubtitles />),
  "cinema-dolly-zoom": thumb(<CinemaDollyZoom headingAs="h2" />),
  "cinema-chapter-select": thumb(<CinemaChapterSelect />),
  "cinema-now-showing": thumb(<CinemaNowShowing />),
  "cinema-marquee-sign": thumb(<CinemaMarqueeSign />),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { LocalBookingCard } from "@/registry/hyperblur/local-booking-card";
import { LocalMenuBoard } from "@/registry/hyperblur/local-menu-board";
import { LocalHoursMap } from "@/registry/hyperblur/local-hours-map";
import { LocalTeamGrid } from "@/registry/hyperblur/local-team-grid";
import { LocalServicesPriceList } from "@/registry/hyperblur/local-services-price-list";
import { LocalReservationBar } from "@/registry/hyperblur/local-reservation-bar";
import { LocalBeforeAfter } from "@/registry/hyperblur/local-before-after";
import { LocalReviewsWall } from "@/registry/hyperblur/local-reviews-wall";

export const localADemos: Record<string, ReactNode> = {
  "local-booking-card": thumb(<LocalBookingCard />, { y: 20 }),
  "local-menu-board": thumb(<LocalMenuBoard />, { y: 30 }),
  "local-hours-map": thumb(<LocalHoursMap />, { y: 40 }),
  "local-team-grid": thumb(<LocalTeamGrid />, { y: 40 }),
  "local-services-price-list": thumb(<LocalServicesPriceList />, { y: 30 }),
  "local-reservation-bar": thumb(<LocalReservationBar />, { y: 40 }),
  "local-before-after": thumb(<LocalBeforeAfter />, { y: 30 }),
  "local-reviews-wall": thumb(<LocalReviewsWall />, { y: 20 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { NotfoundGlitch } from "@/registry/hyperblur/notfound-glitch";
import { NotfoundAstronaut } from "@/registry/hyperblur/notfound-astronaut";
import { NotfoundSearch } from "@/registry/hyperblur/notfound-search";
import { NotfoundBrokenPlug } from "@/registry/hyperblur/notfound-broken-plug";
import { ProfileHeaderCard } from "@/registry/hyperblur/profile-header-card";
import { ProfileCreatorBio } from "@/registry/hyperblur/profile-creator-bio";
import { ProfileDevCard } from "@/registry/hyperblur/profile-dev-card";

export const sectionsGDemos: Record<string, ReactNode> = {
  "notfound-glitch": thumb(<NotfoundGlitch />, { scale: 0.34, y: 60 }),
  "notfound-astronaut": thumb(<NotfoundAstronaut />, { scale: 0.33, y: 40 }),
  "notfound-search": thumb(<NotfoundSearch />, { scale: 0.34, y: 0 }),
  "notfound-broken-plug": thumb(<NotfoundBrokenPlug />, { scale: 0.32, y: 50 }),
  "profile-header-card": thumb(<ProfileHeaderCard />, { scale: 0.34, y: 30 }),
  "profile-creator-bio": thumb(<ProfileCreatorBio />, { scale: 0.34, y: 20 }),
  "profile-dev-card": thumb(<ProfileDevCard />, { scale: 0.34, y: 20 }),
};

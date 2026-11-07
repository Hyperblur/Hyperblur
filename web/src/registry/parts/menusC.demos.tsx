import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { MenuDietaryFilter } from "@/registry/hyperblur/menu-dietary-filter";
import { MenuSpecialsToday } from "@/registry/hyperblur/menu-specials-today";
import { MenuPhotoCards } from "@/registry/hyperblur/menu-photo-cards";
import { MenuBrunchList } from "@/registry/hyperblur/menu-brunch-list";

export const menusCDemos: Record<string, ReactNode> = {
  "menu-dietary-filter": thumb(<MenuDietaryFilter />, { y: 30 }),
  "menu-specials-today": thumb(<MenuSpecialsToday />, { y: 0 }),
  "menu-photo-cards": thumb(<MenuPhotoCards />, { y: 30 }),
  "menu-brunch-list": thumb(<MenuBrunchList />, { y: 20 }),
};

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { MenuBurgerBoard } from "@/registry/hyperblur/menu-burger-board";
import { MenuPizzaSizes } from "@/registry/hyperblur/menu-pizza-sizes";
import { MenuChalkboard } from "@/registry/hyperblur/menu-chalkboard";
import { MenuComboBuilder } from "@/registry/hyperblur/menu-combo-builder";

export const menusADemos: Record<string, ReactNode> = {
  "menu-burger-board": thumb(<MenuBurgerBoard />, { y: 20 }),
  "menu-pizza-sizes": thumb(<MenuPizzaSizes />, { y: 20 }),
  "menu-chalkboard": thumb(<MenuChalkboard />, { y: 10 }),
  "menu-combo-builder": thumb(<MenuComboBuilder />, { y: 20 }),
};

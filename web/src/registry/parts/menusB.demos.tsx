import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { MenuQrTable } from "@/registry/hyperblur/menu-qr-table";
import { MenuDrinksCafe } from "@/registry/hyperblur/menu-drinks-cafe";
import { MenuTastingCourses } from "@/registry/hyperblur/menu-tasting-courses";
import { MenuDeliveryOrder } from "@/registry/hyperblur/menu-delivery-order";

export const menusBDemos: Record<string, ReactNode> = {
  "menu-qr-table": thumb(<MenuQrTable />, { y: 20 }),
  "menu-drinks-cafe": thumb(<MenuDrinksCafe />, { y: 30 }),
  "menu-tasting-courses": thumb(<MenuTastingCourses />, { y: 30 }),
  "menu-delivery-order": thumb(<MenuDeliveryOrder />, { y: 20 }),
};

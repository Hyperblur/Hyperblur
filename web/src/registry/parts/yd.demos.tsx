import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { DashboardCrypto } from "@/registry/hyperblur/dashboard-crypto";
import { DashboardHr } from "@/registry/hyperblur/dashboard-hr";
import { DashboardSupport } from "@/registry/hyperblur/dashboard-support";
import { DashboardMarketing } from "@/registry/hyperblur/dashboard-marketing";

export const ydDemos: Record<string, ReactNode> = {
  "dashboard-crypto": thumb(<DashboardCrypto />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-hr": thumb(<DashboardHr />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-support": thumb(<DashboardSupport />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-marketing": thumb(<DashboardMarketing />, { scale: 0.3, width: 1100, y: 0 }),
};

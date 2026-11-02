import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AnalyticsDashboard } from "@/registry/hyperblur/analytics-dashboard";
import { SalesDashboard } from "@/registry/hyperblur/sales-dashboard";
import { ProjectDashboard } from "@/registry/hyperblur/project-dashboard";
import { FinanceDashboard } from "@/registry/hyperblur/finance-dashboard";
import { AdminDashboard } from "@/registry/hyperblur/admin-dashboard";
import { OrdersDashboard } from "@/registry/hyperblur/orders-dashboard";

export const dashboardsDemos: Record<string, ReactNode> = {
  "analytics-dashboard": thumb(<AnalyticsDashboard />, { scale: 0.3, width: 1100, y: 0 }),
  "sales-dashboard": thumb(<SalesDashboard />, { scale: 0.3, width: 1100, y: 0 }),
  "project-dashboard": thumb(<ProjectDashboard />, { scale: 0.3, width: 1100, y: 0 }),
  "finance-dashboard": thumb(<FinanceDashboard />, { scale: 0.3, width: 1100, y: 0 }),
  "admin-dashboard": thumb(<AdminDashboard defaultSelected={["noah-fischer", "hana-ito"]} />, { scale: 0.3, width: 1100, y: 0 }),
  "orders-dashboard": thumb(<OrdersDashboard />, { scale: 0.3, width: 1100, y: 0 }),
};

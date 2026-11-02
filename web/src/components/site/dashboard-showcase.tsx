"use client";

import { useState } from "react";
import { AnalyticsDashboard } from "@/registry/hyperblur/analytics-dashboard";
import { SalesDashboard } from "@/registry/hyperblur/sales-dashboard";
import { ProjectDashboard } from "@/registry/hyperblur/project-dashboard";
import { FinanceDashboard } from "@/registry/hyperblur/finance-dashboard";
import { AdminDashboard } from "@/registry/hyperblur/admin-dashboard";
import { OrdersDashboard } from "@/registry/hyperblur/orders-dashboard";

const views = [
  { id: "analytics", label: "Analytics", node: <AnalyticsDashboard /> },
  { id: "sales", label: "Sales", node: <SalesDashboard /> },
  { id: "projects", label: "Projects", node: <ProjectDashboard /> },
  { id: "finance", label: "Finance", node: <FinanceDashboard /> },
  { id: "admin", label: "Admin", node: <AdminDashboard /> },
  { id: "orders", label: "Orders", node: <OrdersDashboard /> },
];

export function DashboardShowcase() {
  const [active, setActive] = useState(views[0].id);
  const current = views.find((v) => v.id === active) ?? views[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Dashboard templates">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={v.id === active}
            onClick={() => setActive(v.id)}
            className={`hb-btn hb-btn-sm ${v.id === active ? "hb-btn-primary" : "hb-btn-ghost"}`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-[#0a0a0a]" key={current.id}>
        {current.node}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ChartStreamgraph } from "@/registry/hyperblur/chart-streamgraph";
import { ChartSankeyFlow } from "@/registry/hyperblur/chart-sankey-flow";
import { ChartTreemap } from "@/registry/hyperblur/chart-treemap";
import { ChartBulletSet } from "@/registry/hyperblur/chart-bullet-set";
import { ListSortableExpand } from "@/registry/hyperblur/list-sortable-expand";
import { ListFeedWindowed } from "@/registry/hyperblur/list-feed-windowed";
import { ListKanbanGrouped } from "@/registry/hyperblur/list-kanban-grouped";
import { ListActivityFilters } from "@/registry/hyperblur/list-activity-filters";
import { DashboardAnalyticsCompact } from "@/registry/hyperblur/dashboard-analytics-compact";
import { DashboardOpsWall } from "@/registry/hyperblur/dashboard-ops-wall";
import { DashboardPipeline } from "@/registry/hyperblur/dashboard-pipeline";
import { DashboardFinancePersonal } from "@/registry/hyperblur/dashboard-finance-personal";

const wrap = "flex h-full w-full items-center justify-center px-4";

export const wiDemos: Record<string, ReactNode> = {
  "chart-streamgraph": (
    <div className={wrap}>
      <div className="w-full max-w-[340px] font-grotesk">
        <div className="mb-1.5 flex items-baseline justify-between text-[11px]">
          <span className="font-medium text-[#ededed]">Sessions by channel</span>
          <span className="text-[#8f8f8f]">Last 14 weeks</span>
        </div>
        <ChartStreamgraph height={132} showLegend={false} />
      </div>
    </div>
  ),
  "chart-sankey-flow": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <div className="mb-1.5 flex items-baseline justify-between text-[11px]">
          <span className="font-medium text-[#ededed]">Trial journeys</span>
          <span className="text-[#8f8f8f]">10,300 signups</span>
        </div>
        <ChartSankeyFlow height={162} nodeGap={6} />
      </div>
    </div>
  ),
  "chart-treemap": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ChartTreemap height={150} />
      </div>
    </div>
  ),
  "chart-bullet-set": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ChartBulletSet
          metrics={[
            { label: "Revenue", value: 1840000, target: 2200000, previous: 1620000, projected: 2310000, ranges: [1500000, 2000000, 2600000], format: "currency" },
            { label: "New customers", value: 412, target: 500, previous: 368, projected: 538, ranges: [350, 450, 600], format: "number" },
            { label: "First response", value: 3.2, target: 2, previous: 4.1, projected: 2.6, ranges: [6, 4, 2.5], inverse: true, format: "hours" },
          ]}
        />
      </div>
    </div>
  ),
  "list-sortable-expand": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ListSortableExpand
          compact
          rows={[
            { id: "a6", name: "Meridian Civic", domain: "meridiancivic.org", plan: "Enterprise", seats: 920, arr: 538000, health: 71, owner: "Jonah Reyes", renewal: "Aug 1, 2027", usage: [70, 72, 71, 69, 72, 74, 73, 71, 74, 76, 75, 77] },
            { id: "a1", name: "Larkspur Health", domain: "larkspur.health", plan: "Enterprise", seats: 640, arr: 412000, health: 92, owner: "Maya Chen", renewal: "Mar 14, 2027", usage: [62, 64, 66, 70, 69, 74, 78, 81, 80, 84, 88, 91] },
            { id: "a2", name: "Tidewater Freight", domain: "tidewater.co", plan: "Scale", seats: 210, arr: 126000, health: 48, owner: "Jonah Reyes", renewal: "Dec 2, 2026", usage: [80, 78, 74, 75, 70, 66, 61, 58, 55, 52, 50, 47], note: "Champion left in September." },
          ]}
        />
      </div>
    </div>
  ),
  "list-feed-windowed": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ListFeedWindowed height={186} rowHeight={48} headerHeight={26} />
      </div>
    </div>
  ),
  "list-kanban-grouped": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ListKanbanGrouped
          groups={[
            { id: "doing", label: "In progress", color: "#2f7bff", limit: 2 },
            { id: "next", label: "Up next", color: "#f5b544" },
          ]}
          defaultCollapsed={["next"]}
          defaultTasks={[
            { id: "t1", title: "Rate limit the export API", group: "doing", tag: "API", tagColor: "#2f7bff", assignee: "Maya Chen", points: 3 },
            { id: "t2", title: "Billing empty states", group: "doing", tag: "Design", tagColor: "#f472b6", assignee: "Leo Marsh", points: 2 },
            { id: "t4", title: "SSO setup guide", group: "next", tag: "Docs", tagColor: "#f5b544", assignee: "Priya Raman", points: 1 },
            { id: "t5", title: "Retry webhooks with backoff", group: "next", tag: "API", tagColor: "#2f7bff", assignee: "Kenji Watanabe", points: 3 },
          ]}
        />
      </div>
    </div>
  ),
  "list-activity-filters": (
    <div className={wrap}>
      <div className="w-full max-w-[340px]">
        <ListActivityFilters maxHeight={86} />
      </div>
    </div>
  ),
  "dashboard-analytics-compact": thumb(<DashboardAnalyticsCompact />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-ops-wall": thumb(<DashboardOpsWall />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-pipeline": thumb(<DashboardPipeline />, { scale: 0.3, width: 1100, y: 0 }),
  "dashboard-finance-personal": thumb(<DashboardFinancePersonal />, { scale: 0.3, width: 1100, y: 0 }),
};

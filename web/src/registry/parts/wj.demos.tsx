import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AppCalendarWeek } from "@/registry/hyperblur/app-calendar-week";
import { AppFileExplorer } from "@/registry/hyperblur/app-file-explorer";
import { AppNotificationGroups } from "@/registry/hyperblur/app-notification-groups";
import { AppAppearanceSettings } from "@/registry/hyperblur/app-appearance-settings";
import { AgentRunLanes } from "@/registry/hyperblur/agent-run-lanes";
import { AgentToolPermission } from "@/registry/hyperblur/agent-tool-permission";
import { AgentMemoryScopes } from "@/registry/hyperblur/agent-memory-scopes";

const permissionFiles = [
  {
    path: "src/billing/prorate.ts",
    hunks: [
      {
        id: "h1",
        header: "@@ -12,6 +12,7 @@ export function prorate(",
        lines: [
          { t: " " as const, s: "  const days = daysBetween(start, end);" },
          { t: "-" as const, s: "  const ratio = days / 30;" },
          { t: "+" as const, s: "  const ratio = days / daysInMonth(start);" },
          { t: "+" as const, s: "  if (ratio <= 0) return 0;" },
        ],
      },
    ],
  },
  {
    path: "src/billing/prorate.test.ts",
    hunks: [
      {
        id: "h2",
        header: "@@ -58,0 +58,3 @@ describe(\"prorate\"",
        lines: [
          { t: "+" as const, s: "  it(\"uses real month length\", () => {" },
          { t: "+" as const, s: "    expect(prorate(29, feb1, feb15)).toBe(14.5);" },
          { t: "+" as const, s: "  });" },
        ],
      },
    ],
  },
];

const notificationGroups = [
  {
    id: "deploys",
    app: "Deploys",
    glyph: "deploy" as const,
    color: "#34c78a",
    bulkAction: "Promote latest",
    items: [
      { id: "d1", title: "harbor-web #812 is ready", body: "Preview built in 48s from fix/checkout-tax.", time: "2m", actions: ["Promote", "Open preview"] },
      { id: "d2", title: "harbor-api #455 is ready", body: "Migration 0042 applied on staging.", time: "14m", actions: ["Promote"] },
      { id: "d3", title: "harbor-web #811 failed", body: "Type error in src/cart/summary.tsx.", time: "31m", actions: ["View logs"] },
    ],
  },
  {
    id: "calendar",
    app: "Calendar",
    glyph: "calendar" as const,
    color: "#f36fb0",
    bulkAction: "Accept all",
    items: [
      { id: "c1", title: "Quarterly planning", body: "Thu, Nov 12 · 10:00 to 11:30 · Room 4B", time: "5h", actions: ["Accept", "Decline"] },
      { id: "c2", title: "Lumen Bank onboarding call", body: "Fri, Nov 13 · 15:00 to 15:45 · Zoom", time: "6h", actions: ["Accept", "Decline"] },
    ],
  },
];

export const wjDemos: Record<string, ReactNode> = {
  "app-calendar-week": thumb(<AppCalendarWeek startHour={8} endHour={18} />, { scale: 0.45, width: 760, y: 0 }),
  "app-file-explorer": thumb(<AppFileExplorer />, { scale: 0.45, width: 760, y: 0 }),
  "app-notification-groups": thumb(<div className="p-3"><AppNotificationGroups groups={notificationGroups} /></div>, { scale: 0.68, width: 444, y: 0 }),
  "app-appearance-settings": thumb(<AppAppearanceSettings defaultValue={{ accent: "#8b5cf6", radius: 12 }} />, { scale: 0.38, width: 900, y: 0 }),
  "agent-run-lanes": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <AgentRunLanes />
      </div>
    </div>
  ),
  "agent-tool-permission": thumb(<div className="p-3"><AgentToolPermission files={permissionFiles} /></div>, { scale: 0.7, width: 474, y: 0 }),
  "agent-memory-scopes": thumb(<div className="p-3"><AgentMemoryScopes defaultScope="chat" budget={130} recalledIds={["f8", "f6"]} /></div>, { scale: 0.76, width: 444, y: 0 }),
};

import type { ReactNode } from "react";
import { Sparkline } from "@/registry/hyperblur/sparkline";
import { StatCard } from "@/registry/hyperblur/stat-card";
import { BarChart } from "@/registry/hyperblur/bar-chart";
import { AreaChart } from "@/registry/hyperblur/area-chart";
import { DonutChart } from "@/registry/hyperblur/donut-chart";
import { DataTableDemo } from "@/registry/demos/data-table-demo";

const revenue = [18, 22, 21, 27, 25, 31, 29, 36, 34, 41, 39, 46, 44, 52, 49, 58];
const requests = [
  120, 132, 128, 141, 150, 138, 162, 171, 160, 178, 190, 184, 201, 196, 214, 208, 226, 219, 238, 247, 241, 256, 262, 270,
];

function Panel({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  return (
    <div className="flex h-44 w-full max-w-[400px] flex-col gap-2 rounded-xl border border-[#262626] bg-[#111111] p-3.5 text-[#ededed]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-grotesk text-[13px] font-medium">{title}</span>
        {meta ? <span className="font-mono text-[11px] text-[#8f8f8f]">{meta}</span> : null}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export const appUiDemos: Record<string, ReactNode> = {
  sparkline: (
    <Panel title="Requests per minute" meta="last 24h">
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono text-2xl font-medium tabular-nums">2,481</span>
        <Sparkline data={requests} height={64} />
      </div>
    </Panel>
  ),
  "stat-card": (
    <StatCard
      className="h-44 w-full max-w-[400px]"
      label="Monthly revenue"
      value={48290}
      prefix="$"
      delta={12.4}
      caption="vs last month"
      data={revenue}
    />
  ),
  "bar-chart": (
    <Panel title="Weekly signups" meta="+18% WoW">
      <BarChart
        height={120}
        data={[
          { label: "Mon", value: 84 },
          { label: "Tue", value: 126 },
          { label: "Wed", value: 112 },
          { label: "Thu", value: 158 },
          { label: "Fri", value: 141 },
          { label: "Sat", value: 62 },
          { label: "Sun", value: 48 },
        ]}
      />
    </Panel>
  ),
  "area-chart": (
    <Panel title="MRR" meta="$42.1k">
      <AreaChart
        height={120}
        data={[
          { label: "Jan", value: 18200 },
          { label: "Feb", value: 21400 },
          { label: "Mar", value: 20800 },
          { label: "Apr", value: 26100 },
          { label: "May", value: 29900 },
          { label: "Jun", value: 28700 },
          { label: "Jul", value: 34200 },
          { label: "Aug", value: 38800 },
          { label: "Sep", value: 42100 },
        ]}
      />
    </Panel>
  ),
  "donut-chart": (
    <Panel title="Traffic sources" meta="30 days">
      <div className="flex h-full items-center">
        <DonutChart
          size={112}
          thickness={14}
          data={[
            { label: "Direct", value: 4200 },
            { label: "Organic", value: 3100, color: "#22c55e" },
            { label: "Referral", value: 1600, color: "#f5b301" },
            { label: "Social", value: 900, color: "#a78bfa" },
          ]}
        />
      </div>
    </Panel>
  ),
  "data-table": <DataTableDemo />,
};

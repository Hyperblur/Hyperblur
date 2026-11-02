import type { ReactNode } from "react";
import { RadarChart } from "@/registry/hyperblur/radar-chart";
import { HeatmapCalendarDemo } from "@/registry/demos/heatmap-calendar-demo";
import { FunnelChart } from "@/registry/hyperblur/funnel-chart";
import { ProgressRings } from "@/registry/hyperblur/progress-rings";
import { RankedBars } from "@/registry/hyperblur/ranked-bars";
import { GaugeMeterDemo } from "@/registry/demos/gauge-meter-demo";
import { MultiLineChartDemo } from "@/registry/demos/multi-line-chart-demo";
import { CandlestickChartDemo } from "@/registry/demos/candlestick-chart-demo";

const card =
  "box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]";

export const chartsDemos: Record<string, ReactNode> = {
  "radar-chart": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} font-grotesk`}>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[13px] font-medium">Skills review</span>
          <span className="rounded-full bg-[#1c1c1c] px-2 py-0.5 text-[10px] text-[#a1a1a1]">Q3 2026</span>
        </div>
        <RadarChart
          height={156}
          legend="right"
          axes={["Design", "Code", "Speed", "Docs", "Review", "Comms"]}
          series={[
            { name: "Maya", values: [88, 74, 62, 81, 69, 92] },
            { name: "Team avg", values: [70, 82, 71, 58, 76, 64] },
          ]}
          max={100}
        />
      </div>
    </div>
  ),
  "heatmap-calendar": <HeatmapCalendarDemo />,
  "funnel-chart": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={card}>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="font-serif text-[21px] italic leading-6">Checkout funnel</span>
          <span className="font-mono text-[11px] text-[#34d399]">3.6% CVR</span>
        </div>
        <FunnelChart
          stageHeight={24}
          stages={[
            { label: "Visits", value: 86400 },
            { label: "Product views", value: 41200 },
            { label: "Add to cart", value: 12900 },
            { label: "Checkout", value: 6480 },
            { label: "Purchased", value: 3120 },
          ]}
        />
      </div>
    </div>
  ),
  "gauge-meter": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <GaugeMeterDemo />
    </div>
  ),
  "multi-line-chart": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <MultiLineChartDemo />
    </div>
  ),
  "progress-rings": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={card}>
        <div className="mb-1 flex items-center justify-between">
          <span className="font-serif text-[20px] italic leading-6">Today</span>
          <span className="text-[11px] text-[#8f8f8f]">Sat, Oct 31</span>
        </div>
        <ProgressRings
          size={128}
          thickness={12}
          rings={[
            { label: "Move", value: 486, goal: 600, unit: "kcal" },
            { label: "Exercise", value: 24, goal: 30, unit: "min" },
            { label: "Stand", value: 9, goal: 12, unit: "h" },
          ]}
        >
          <span className="font-grotesk text-[13px] font-semibold tabular-nums">81%</span>
        </ProgressRings>
      </div>
    </div>
  ),
  "ranked-bars": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex h-[188px] flex-col`}>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-medium">Top countries</span>
          <span className="font-mono text-[11px] text-[#8f8f8f]">48.2k visitors</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-color:#262626_transparent] [scrollbar-width:thin]">
          <RankedBars
            className="[&_.hb-rkb-row]:min-h-[22px]"
            limit={4}
            items={[
              { label: "United States", value: 18420, delta: 6.2 },
              { label: "Germany", value: 9810, delta: -3.4 },
              { label: "United Kingdom", value: 7240, delta: 11.8 },
              { label: "Brazil", value: 5120, delta: 24.5 },
              { label: "Canada", value: 3880, delta: 0 },
              { label: "France", value: 2760, delta: -1.9 },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  "candlestick-chart": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CandlestickChartDemo />
    </div>
  ),
};

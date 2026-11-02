"use client";

import { HeatmapCalendar, sampleActivity } from "@/registry/hyperblur/heatmap-calendar";

const card =
  "box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]";

const commits = sampleActivity("2026-10-31", 22);
const commitTotal = Object.values(commits)
  .reduce((s, v) => s + v, 0)
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function HeatmapCalendarDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={card}>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <span className="text-[19px] font-semibold leading-6 tracking-tight tabular-nums">
            {commitTotal}
            <span className="ml-1.5 text-[12px] font-normal text-[#8f8f8f]">commits</span>
          </span>
          <span className="text-[11px] text-[#8f8f8f]">last 22 weeks</span>
        </div>
        <HeatmapCalendar values={commits} weeks={22} endDate="2026-10-31" unit="commit" showTotal={false} />
      </div>
    </div>
  );
}

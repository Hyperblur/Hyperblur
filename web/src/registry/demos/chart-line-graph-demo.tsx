"use client";

import { ChartLineGraph } from "@/registry/hyperblur/chart-line-graph";

const revenue = [
  { label: "Jan", value: 18200 },
  { label: "Feb", value: 19600 },
  { label: "Mar", value: 19100 },
  { label: "Apr", value: 21800 },
  { label: "May", value: 23400 },
  { label: "Jun", value: 22900 },
  { label: "Jul", value: 26100 },
  { label: "Aug", value: 28700 },
  { label: "Sep", value: 27900 },
  { label: "Oct", value: 31400 },
  { label: "Nov", value: 34200 },
  { label: "Dec", value: 37800 },
];

export function ChartLineGraphDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-1.5 rounded-2xl border border-[#262626] bg-[#111111] px-1 pb-2 pt-3 text-left text-[#ededed]">
        <div className="flex items-start justify-between px-3">
          <div className="flex flex-col">
            <span className="font-grotesk text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">Monthly revenue</span>
            <span className="font-grotesk text-xl font-semibold leading-6 tracking-tight">$37.8k</span>
          </div>
          <span className="mt-0.5 rounded-full bg-[#3ecf8e]/15 px-2 py-0.5 text-[11px] font-semibold text-[#3ecf8e]">+10.5%</span>
        </div>
        <ChartLineGraph
          data={revenue}
          height={92}
          sweep
          format={(v) => `$${(v / 1000).toFixed(1)}k`}
          axisFormat={(v) => `$${v / 1000}k`}
          aria-label="Monthly revenue"
        />
      </div>
    </div>
  );
}

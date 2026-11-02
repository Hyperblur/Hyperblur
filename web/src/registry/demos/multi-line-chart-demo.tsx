"use client";

import * as React from "react";
import { MultiLineChart } from "@/registry/hyperblur/multi-line-chart";

const ranges = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "p50", data: [118, 112, 121, 109, 114, 104, 101] },
      { name: "p95", data: [264, 281, 249, 302, 271, 238, 226] },
      { name: "p99", data: [412, 455, 398, 521, 436, 389, 361] },
    ],
  },
  "30D": {
    labels: ["Oct 3", "Oct 7", "Oct 11", "Oct 15", "Oct 19", "Oct 23", "Oct 27", "Oct 31"],
    series: [
      { name: "p50", data: [131, 126, 122, 117, 119, 111, 108, 104] },
      { name: "p95", data: [310, 294, 288, 271, 279, 252, 243, 231] },
      { name: "p99", data: [498, 521, 467, 449, 471, 418, 402, 377] },
    ],
  },
  "90D": {
    labels: ["Aug 3", "Aug 17", "Aug 31", "Sep 14", "Sep 28", "Oct 12", "Oct 26"],
    series: [
      { name: "p50", data: [162, 154, 149, 138, 127, 118, 106] },
      { name: "p95", data: [388, 366, 351, 322, 296, 274, 238] },
      { name: "p99", data: [640, 598, 575, 531, 482, 451, 389] },
    ],
  },
} as const;

type Range = keyof typeof ranges;

export function MultiLineChartDemo() {
  const [range, setRange] = React.useState<Range>("30D");
  const data = ranges[range];
  return (
    <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium">API latency</span>
        <div role="group" aria-label="Range" className="flex rounded-full border border-[#262626] bg-[#0a0a0a] p-0.5">
          {(Object.keys(ranges) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className="cursor-pointer rounded-full border-0 bg-transparent px-2 py-0.5 font-mono text-[10.5px] text-[#8f8f8f] transition-colors hover:text-[#ededed] focus-visible:outline-2 focus-visible:outline-[#7fb3ff] aria-pressed:bg-[#262626] aria-pressed:text-[#ededed]"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <MultiLineChart
        key={range}
        labels={[...data.labels]}
        series={data.series.map((s) => ({ name: s.name, data: [...s.data] }))}
        height={104}
        legend="top"
        colors={["#7fb3ff", "#8b5cf6", "#fbbf24"]}
        valueFormatter={(n) => `${Math.round(n)}ms`}
      />
    </div>
  );
}

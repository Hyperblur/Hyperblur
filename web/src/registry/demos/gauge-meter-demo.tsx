"use client";

import * as React from "react";
import { GaugeMeter } from "@/registry/hyperblur/gauge-meter";

const zones = [
  { to: 50, color: "#34d399", label: "Healthy" },
  { to: 80, color: "#fbbf24", label: "Busy" },
  { to: 100, color: "#fb7185", label: "Critical" },
];

const presets = [
  { name: "Idle", value: 18 },
  { name: "Normal", value: 54 },
  { name: "Heavy", value: 91 },
];

export function GaugeMeterDemo() {
  const [value, setValue] = React.useState(54);
  return (
    <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left font-grotesk text-[#ededed]">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[13px] font-medium">CPU load</span>
        <span className="font-mono text-[11px] text-[#8f8f8f]">node-04 / eu-west</span>
      </div>
      <div className="flex items-center gap-3">
        <GaugeMeter value={value} unit="%" zones={zones} size={172} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {presets.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setValue(p.value)}
              aria-pressed={value === p.value}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-[#262626] bg-[#171717] px-2.5 py-1.5 text-[12px] text-[#a1a1a1] transition-colors hover:bg-[#1c1c1c] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7fb3ff] aria-pressed:border-[#2f7bff] aria-pressed:text-[#ededed]"
            >
              {p.name}
              <span className="font-mono text-[11px] text-[#8f8f8f]">{p.value}%</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

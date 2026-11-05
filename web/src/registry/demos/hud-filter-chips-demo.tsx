"use client";

import * as React from "react";
import { HudFilterChips } from "@/registry/hyperblur/hud-filter-chips";

const entries = [
  { title: "Ion Drift", kind: "graphics", date: "10.28" },
  { title: "Parallax Atlas", kind: "map", date: "10.21" },
  { title: "Signal Garden", kind: "xr", date: "10.17" },
  { title: "Orbit Kit", kind: "tool", date: "10.09" },
  { title: "Night Grid", kind: "graphics", date: "10.02" },
  { title: "Field Survey", kind: "map", date: "09.26" },
  { title: "Pocket Lathe", kind: "tool", date: "09.18" },
  { title: "Room Scale", kind: "xr", date: "09.11" },
];

export function HudFilterChipsDemo() {
  const [value, setValue] = React.useState<string[]>(["all"]);
  const shown = value.includes("all") ? entries : entries.filter((e) => value.includes(e.kind));
  return (
    <div className="box-border flex w-full max-w-[340px] flex-col gap-2.5 text-[#ededed]">
      <div className="flex items-baseline justify-between">
        <span className="font-grotesk text-[17px] font-semibold tracking-tight">Archive</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8f8f8f]">
          {String(shown.length).padStart(2, "0")} / {String(entries.length).padStart(2, "0")} shown
        </span>
      </div>
      <HudFilterChips
        multiple
        value={value}
        onChange={setValue}
        options={[
          { id: "all", label: "All" },
          { id: "xr", label: "XR" },
          { id: "map", label: "Map" },
          { id: "tool", label: "Tool" },
          { id: "graphics", label: "Gfx" },
        ]}
      />
      <ul className="m-0 flex list-none flex-col p-0">
        {shown.slice(0, 3).map((e) => (
          <li
            key={e.title}
            className="flex h-[25px] items-center justify-between border-b border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.12em]"
          >
            <span className="text-[#ededed]">{e.title}</span>
            <span className="flex gap-3 text-[#5f5f5f]">
              <span>{e.kind}</span>
              <span>{e.date}</span>
            </span>
          </li>
        ))}
        <li className="pt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#5f5f5f]">
          {shown.length > 3 ? `+ ${shown.length - 3} more` : "End of list"}
        </li>
      </ul>
    </div>
  );
}

"use client";

import * as React from "react";
import { NavGooey } from "@/registry/hyperblur/nav-gooey";

const items = [
  { value: "overview", label: "Overview" },
  { value: "runs", label: "Runs" },
  { value: "logs", label: "Logs" },
  { value: "settings", label: "Settings" },
];

const headlines: Record<string, { title: string; note: string }> = {
  overview: { title: "All systems steady", note: "12 services reporting, 0 incidents" },
  runs: { title: "148 runs this week", note: "Median build time 2m 14s" },
  logs: { title: "Live tail is on", note: "Streaming from 4 regions" },
  settings: { title: "Workspace settings", note: "Members, billing and tokens" },
};

export function NavGooeyDemo() {
  const [value, setValue] = React.useState("overview");
  const touched = React.useRef(false);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (touched.current) return;
      setValue((v) => {
        const i = items.findIndex((it) => it.value === v);
        return items[(i + 1) % items.length].value;
      });
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  const head = headlines[value];

  return (
    <div
      className="flex h-full w-full items-center justify-center px-4"
      onPointerDown={() => {
        touched.current = true;
      }}
      onKeyDown={() => {
        touched.current = true;
      }}
    >
      <div className="box-border flex w-full max-w-[340px] flex-col gap-4 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3.5 text-[#ededed]">
        <NavGooey items={items} value={value} onChange={setValue} label="Project sections" style={{ fontSize: 13 }} />
        <div className="px-1.5 pb-1">
          <p className="font-sans m-0 text-[28px] leading-8">{head.title}</p>
          <p className="font-grotesk m-0 mt-1 text-[12px] text-[#8f8f8f]">{head.note}</p>
        </div>
      </div>
    </div>
  );
}

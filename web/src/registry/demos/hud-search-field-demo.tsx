"use client";

import * as React from "react";
import { HudSearchField } from "@/registry/hyperblur/hud-search-field";

const entries = [
  { title: "Ion Drift", tag: "Shader" },
  { title: "Orbit Kit", tag: "Tool" },
  { title: "Orbital Type", tag: "Type" },
  { title: "Parallax Atlas", tag: "Map" },
  { title: "Pulse Lattice", tag: "Physics" },
  { title: "Signal Garden", tag: "Audio" },
  { title: "Night Grid", tag: "Shader" },
];

export function HudSearchFieldDemo() {
  const [query, setQuery] = React.useState("orb");
  const q = query.trim().toLowerCase();
  const hits = q ? entries.filter((e) => `${e.title} ${e.tag}`.toLowerCase().includes(q)) : entries;
  return (
    <div className="box-border flex w-full max-w-[340px] flex-col gap-2.5">
      <HudSearchField value={query} onChange={setQuery} resultCount={hits.length} total={entries.length} />
      <ul className="m-0 flex list-none flex-col p-0">
        {hits.slice(0, 3).map((e, i) => (
          <li
            key={e.title}
            className="flex h-[27px] items-center gap-3 border-b border-white/[0.07] px-1 font-mono text-[10px] uppercase tracking-[0.12em]"
          >
            <span className={i === 0 ? "text-[#ff4d4d]" : "text-[#5f5f5f]"}>{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-[#ededed]">{e.title}</span>
            <span className="text-[#5f5f5f]">{e.tag}</span>
          </li>
        ))}
        {hits.length === 0 ? (
          <li className="flex h-[27px] items-center px-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5f5f5f]">
            No matches
          </li>
        ) : null}
      </ul>
    </div>
  );
}

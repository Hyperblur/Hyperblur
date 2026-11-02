"use client";

import * as React from "react";
import { SidebarTree, type SidebarTreeNode } from "@/registry/hyperblur/sidebar-tree";

const nodes: SidebarTreeNode[] = [
  {
    id: "app",
    name: "app",
    children: [
      { id: "app/layout.tsx", name: "layout.tsx" },
      { id: "app/page.tsx", name: "page.tsx" },
      { id: "app/globals.css", name: "globals.css" },
    ],
  },
  { id: "lib", name: "lib", children: [{ id: "lib/utils.ts", name: "utils.ts" }] },
  { id: "package.json", name: "package.json" },
  { id: "README.md", name: "README.md" },
];

const sources: Record<string, string[]> = {
  "app/layout.tsx": ['import "./globals.css";', "", "export const metadata = {", '  title: "Fernhill",', "};"],
  "app/page.tsx": ['import { Hero } from "./hero";', "", "export function Page() {", "  return <Hero />;", "}"],
  "app/globals.css": [":root {", "  --accent: #2f7bff;", "  color-scheme: dark;", "}"],
  "lib/utils.ts": ["export function clamp(n) {", "  return Math.min(1, n);", "}"],
  "package.json": ["{", '  "name": "fernhill",', '  "private": true,', '  "version": "1.4.0"', "}"],
  "README.md": ["# Fernhill", "", "A storefront for plants.", "", "Run npm run dev to start."],
};

const keywords = new Set(["import", "export", "function", "return", "from", "const"]);

function tint(line: string, key: number) {
  const parts = line.split(/("[^"]*"|\b(?:import|export|function|return|from|const)\b)/);
  return (
    <div key={key} className="min-h-4 whitespace-pre">
      {parts.map((part, i) => {
        if (part.startsWith('"')) return <span key={i} style={{ color: "#98c379" }}>{part}</span>;
        if (keywords.has(part)) return <span key={i} style={{ color: "#c792ea" }}>{part}</span>;
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}

export function SidebarTreeDemo() {
  const [selected, setSelected] = React.useState<string | null>("app/page.tsx");
  const lines = (selected && sources[selected]) || ["Select a file"];
  const name = selected ? selected.split("/").pop() : "";

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex h-[300px] w-full max-w-[348px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left">
        <div className="w-[156px] shrink-0 border-r border-[#1f1f1f]">
          <SidebarTree
            nodes={nodes}
            title=""
            filterable
            rowHeight={26}
            indent={12}
            defaultExpanded={["app"]}
            selected={selected}
            onSelect={(id, node) => {
              if (!node.children) setSelected(id);
            }}
          />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex h-8 items-center border-b border-[#1f1f1f] px-3">
            <span className="font-mono truncate text-[11px] text-[#ededed]">{name}</span>
          </div>
          <div className="font-mono space-y-0.5 px-2.5 py-3 text-[11px] leading-5 text-[#a8a8a8]">{lines.map((line, i) => tint(line, i))}</div>
        </div>
      </div>
    </div>
  );
}

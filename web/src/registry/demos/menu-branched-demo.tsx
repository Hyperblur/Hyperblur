"use client";

import * as React from "react";
import { BranchedMenu, type BranchedMenuItem } from "@/registry/hyperblur/menu-branched";

const items: BranchedMenuItem[] = [
  {
    id: "insert",
    label: "Insert",
    children: [
      { id: "table", label: "Table", hint: "T" },
      {
        id: "embed",
        label: "Embed",
        children: [
          { id: "video", label: "Video", hint: "V" },
          { id: "map", label: "Map", hint: "M" },
        ],
      },
    ],
  },
];

export function MenuBranchedDemo() {
  const [run, setRun] = React.useState(0);
  const paused = React.useRef(false);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setRun((r) => r + 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="w-full max-w-[260px]"
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <BranchedMenu key={run} items={items} defaultExpanded={["insert", "embed"]} label="Insert menu" />
    </div>
  );
}

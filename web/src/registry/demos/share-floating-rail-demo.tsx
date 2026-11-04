"use client";

import * as React from "react";
import { ShareFloatingRail } from "@/registry/hyperblur/share-floating-rail";
import { useQbLoop } from "./qb-loop";

const items = [
  { id: "copy", label: "Copy link", icon: "copy" as const },
  { id: "email", label: "Email", icon: "mail" as const },
  { id: "native", label: "More", icon: "send" as const },
];

export function ShareFloatingRailDemo() {
  const [open, setOpen] = React.useState(false);
  const stop = useQbLoop((n) => setOpen(n % 2 === 0), 2600);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-mono relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <p className="m-0 text-[11px] leading-4 text-[#7fb3ff]">changelog / v2.4.0</p>
        <p className="m-0 mt-1 max-w-[220px] text-base font-semibold leading-5">Faster builds, calmer logs</p>
        <ul className="m-0 mt-3 max-w-[210px] list-none space-y-1.5 p-0 text-[11px] leading-4 text-[#8f8f8f]">
          <li>+ incremental cache</li>
          <li>+ quiet mode for CI</li>
          <li>- removed legacy flags</li>
        </ul>
        <div className="absolute bottom-3 right-3">
          <ShareFloatingRail
            size={34}
            items={items}
            url="https://changelog.example/v2-4-0"
            title="Release v2.4.0"
            open={open}
            onOpenChange={(next) => {
              stop();
              setOpen(next);
            }}
          />
        </div>
      </div>
    </div>
  );
}

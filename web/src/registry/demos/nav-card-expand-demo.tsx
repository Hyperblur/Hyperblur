"use client";

import * as React from "react";
import { NavCardExpand } from "@/registry/hyperblur/nav-card-expand";
import { useQuLoop } from "./qu-loop";

export function NavCardExpandDemo() {
  const [open, setOpen] = React.useState(false);
  const stop = useQuLoop((n) => setOpen(n % 2 === 0), 3400, 1200);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626]"
        style={{
          background:
            "radial-gradient(circle at 20% 110%, rgba(47,123,255,0.28), transparent 55%), linear-gradient(180deg, #131313, #0a0a0a)",
        }}
      >
        <div className="absolute inset-x-0 top-[6px] px-[6px]">
          <NavCardExpand
            open={open}
            onOpenChange={(next) => {
              stop();
              setOpen(next);
            }}
            brand="Northlight"
            note="New: dark mode tokens"
            cta={{ label: "Get started", href: "#start" }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <p className="font-sans m-0 text-[30px] leading-[0.98] text-[#ededed]">
            Ship the interface
            <br />
            your product deserves.
          </p>
          <p className="m-0 mt-1.5 text-[11px] text-[#8f8f8f]">Open components for React and Tailwind.</p>
        </div>
      </div>
    </div>
  );
}

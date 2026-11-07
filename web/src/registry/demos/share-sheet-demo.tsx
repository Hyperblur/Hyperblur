"use client";

import * as React from "react";
import { ShareSheet } from "@/registry/hyperblur/share-sheet";
import { useQbLoop } from "./qb-loop";

export function ShareSheetDemo() {
  const [open, setOpen] = React.useState(true);
  const stop = useQbLoop((n) => setOpen(n % 2 === 1), 2800, 2600);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#0f0f0f]">
        <ShareSheet
          height={190}
          url="https://fernhill.example/journal/repotting"
          title="Repotting a rootbound fern"
          open={open}
          onOpenChange={(next) => {
            stop();
            setOpen(next);
          }}
        >
          {({ setOpen: show }) => (
            <div className="relative h-full text-left text-[#ededed]">
              <div
                className="h-[78px]"
                style={{
                  background:
                    "radial-gradient(circle at 20% 130%, #3f8f52 0%, transparent 55%), radial-gradient(circle at 80% -30%, #7fbf6a 0%, transparent 55%), #16301d",
                }}
              />
              <div className="flex items-start justify-between gap-3 px-4 pt-3">
                <div className="min-w-0">
                  <p className="font-sans m-0 text-xl leading-6">Repotting a rootbound fern</p>
                  <p className="font-grotesk m-0 text-[11px] uppercase leading-4 tracking-[0.08em] text-[#8f8f8f]">
                    Journal / 6 min
                  </p>
                </div>
                <button
                  type="button"
                  className="flex-none cursor-pointer rounded-full border border-[#2e2e2e] bg-[#171717] px-3 py-1.5 text-xs font-semibold text-[#ededed]"
                  onClick={() => {
                    stop();
                    show(true);
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          )}
        </ShareSheet>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { SharePopover } from "@/registry/hyperblur/share-popover";
import { useQbLoop } from "./qb-loop";

export function SharePopoverDemo() {
  const [open, setOpen] = React.useState(false);
  const stop = useQbLoop((n) => setOpen(n % 2 === 0), 3000);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative h-[190px] w-full max-w-[340px]">
        <div className="box-border rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 pt-0.5">
              <p className="m-0 text-[10px] font-medium uppercase leading-3 tracking-[0.12em] text-[#8f8f8f]">
                Field notes / Oct 28
              </p>
              <p className="m-0 mt-1.5 text-[15px] font-semibold leading-5">Why we moved the roadmap into the repo</p>
            </div>
            <SharePopover
              url="https://fieldnotes.example/roadmap-in-the-repo"
              title="Why we moved the roadmap into the repo"
              align="end"
              open={open}
              onOpenChange={(next) => {
                stop();
                setOpen(next);
              }}
            />
          </div>
          <p className="m-0 mt-2 text-xs leading-[18px] text-[#8f8f8f]">
            Planning docs drifted out of date in a week. Pull requests did not.
          </p>
        </div>
      </div>
    </div>
  );
}

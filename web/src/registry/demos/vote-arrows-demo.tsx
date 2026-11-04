"use client";

import * as React from "react";
import { VoteArrows, type Vote } from "@/registry/hyperblur/vote-arrows";
import { useQbLoop } from "./qb-loop";

const cycle: Vote[] = [1, 0, -1, 0];

export function VoteArrowsDemo() {
  const [value, setValue] = React.useState<Vote>(0);
  const stop = useQbLoop((n) => setValue(cycle[n % cycle.length]), 2200);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border flex w-full max-w-[340px] gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
        <VoteArrows
          score={128}
          value={value}
          onVote={(next) => {
            stop();
            setValue(next);
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[11px] leading-4 text-[#8f8f8f]">Idea / tomas.v / 3d ago</p>
          <p className="m-0 mt-0.5 text-[15px] font-semibold leading-5">Bulk-edit labels from the table view</p>
          <p className="m-0 mt-1 text-xs leading-[18px] text-[#a1a1a1]">
            Select a few rows, rename or merge their labels in one pass.
          </p>
          <div className="mt-2 flex gap-1.5">
            {["Tables", "Labels"].map((tag) => (
              <span key={tag} className="rounded-full border border-[#262626] px-2 py-0.5 text-[10px] text-[#a1a1a1]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

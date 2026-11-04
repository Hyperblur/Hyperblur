"use client";

import * as React from "react";
import { TooltipWarm } from "@/registry/hyperblur/tooltip-warm";

const actions = [
  { label: "Water now", d: "M12 3c3 4.2 5 7 5 10a5 5 0 0 1-10 0c0-3 2-5.8 5-10Z" },
  { label: "Move to shade", d: "M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" },
  { label: "Add a note", d: "M5 4h14v12H9l-4 4V4ZM8.5 9h7M8.5 12h4" },
  { label: "Share photo", d: "M12 15V4M8 8l4-4 4 4M5 14v5h14v-5" },
];

export function TooltipWarmDemo() {
  const [hover, setHover] = React.useState<number | null>(null);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCycle((c) => (c + 1) % actions.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border flex w-full max-w-[320px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-4 pt-3 text-left text-[#ededed]">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 shrink-0 rounded-xl"
            style={{ background: "radial-gradient(circle at 30% 100%, #2f6b3f 0%, transparent 60%), radial-gradient(circle at 80% 0%, #6fae6a 0%, transparent 55%), #17261b" }}
          />
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold leading-5">Monstera, living room</p>
            <p className="m-0 text-xs leading-4 text-[#8f8f8f]">Watered 4 days ago</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 pt-7">
          {actions.map((action, i) => (
            <TooltipWarm
              key={action.label}
              content={action.label}
              placement="top"
              delay={150}
              open={hover === i || (hover === null && cycle === i)}
              onOpenChange={(next) => setHover(next ? i : null)}
            >
              <button
                type="button"
                aria-label={action.label}
                className="grid h-10 w-[68px] cursor-pointer place-items-center rounded-xl border border-[#262626] bg-[#171717] text-[#cfcfcf] transition-colors hover:border-[#3a3a3a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffa94d]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={action.d} />
                </svg>
              </button>
            </TooltipWarm>
          ))}
        </div>
      </div>
    </div>
  );
}

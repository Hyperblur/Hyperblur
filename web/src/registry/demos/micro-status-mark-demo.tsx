"use client";

import * as React from "react";
import { MicroStatusMark, type MicroStatus } from "@/registry/hyperblur/micro-status-mark";

const steps = [
  { name: "Install dependencies", final: "success" as MicroStatus, note: "12s" },
  { name: "Run test suite", final: "warning" as MicroStatus, note: "2 flaky" },
  { name: "Deploy to production", final: "error" as MicroStatus, note: "Failed" },
];

function statusAt(tick: number, index: number, final: MicroStatus): MicroStatus {
  const phase = (((tick - index * 2) % 12) + 12) % 12;
  if (phase < 2) return "idle";
  if (phase < 5) return "loading";
  return final;
}

export function MicroStatusMarkDemo() {
  const [tick, setTick] = React.useState(5);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] px-4 py-3 text-left text-[#ededed]">
        <div className="flex items-center justify-between">
          <p className="m-0 text-sm font-semibold">Deploy #482</p>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 font-mono text-[10px] text-[#8f8f8f]">main</span>
        </div>
        <div className="mt-2 flex flex-col">
          {steps.map((step, i) => {
            const status = statusAt(tick, i, step.final);
            return (
              <div
                key={step.name}
                className="flex h-[38px] items-center gap-3"
                style={{ borderTop: i === 0 ? "none" : "1px solid #1f1f1f" }}
              >
                <MicroStatusMark status={status} size={24} label={`${step.name}: ${status}`} />
                <span className="min-w-0 flex-1 truncate text-[13px]">{step.name}</span>
                <span className="font-mono text-[11px] text-[#8f8f8f]">{status === "loading" ? "Running" : status === "idle" ? "Queued" : step.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

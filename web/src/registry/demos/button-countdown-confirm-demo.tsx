"use client";

import * as React from "react";
import { ButtonCountdownConfirm } from "@/registry/hyperblur/button-countdown-confirm";

export function ButtonCountdownConfirmDemo() {
  const [round, setRound] = React.useState(0);
  const paused = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setRound((n) => n + 1);
    }, 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#2a1a1d] bg-[#0f0a0b] p-4 font-sans text-[#ededed]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#ff7b88]">Danger zone</span>
          <span className="font-mono text-[11px] text-[#8f8f8f]">orbit-api</span>
        </div>
        <p className="m-0 text-[13px] leading-snug text-[#a1a1a1]">
          Removes the project, its 14 deployments and every environment variable. This cannot be undone.
        </p>
        <div
          className="flex"
          onPointerEnter={() => {
            paused.current = true;
          }}
          onPointerLeave={() => {
            paused.current = false;
          }}
        >
          <ButtonCountdownConfirm
            key={round}
            size="md"
            defaultArmed
            onConfirm={() => {}}
          >
            Delete project
          </ButtonCountdownConfirm>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { StepperNumber } from "@/registry/hyperblur/stepper-number";

const price = 34;

export function StepperNumberDemo() {
  const [qty, setQty] = useState(2);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 shrink-0 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 30% 110%, #2f6b3f 0%, transparent 60%), radial-gradient(circle at 80% -10%, #5a9a5f 0%, transparent 55%), #17261b",
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-sans m-0 truncate text-lg leading-5">Boston fern in clay</p>
            <p className="font-grotesk m-0 text-xs text-[#8f8f8f]">6 inch pot, ships Tuesday</p>
          </div>
          <span className="font-grotesk text-sm font-semibold">${price}</span>
        </div>
        <div className="flex items-center justify-between">
          <StepperNumber value={qty} onValueChange={setQty} min={1} max={12} size={40} label="Quantity" />
          <div className="text-right">
            <p className="font-grotesk m-0 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">Subtotal</p>
            <p className="font-mono m-0 text-base font-semibold tabular-nums">${price * qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

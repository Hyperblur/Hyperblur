"use client";

import * as React from "react";
import { PayCouponField } from "@/registry/hyperblur/pay-coupon-field";

function money(cents: number) {
  return `$${Math.floor(cents / 100)}.${(cents % 100).toString().padStart(2, "0")}`;
}

export function PayCouponFieldDemo() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const touched = React.useRef(false);
  const [code, setCode] = React.useState("");
  const [applied, setApplied] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const run = async () => {
      while (alive && !touched.current) {
        await wait(1200);
        for (const word of ["SAVE10", "OAKLEAF"]) {
          for (let i = 1; i <= word.length; i += 1) {
            if (!alive || touched.current) return;
            setCode(word.slice(0, i));
            await wait(150);
          }
          await wait(350);
          if (!alive || touched.current) return;
          rootRef.current?.querySelector<HTMLButtonElement>(".hb-qf9-btn")?.click();
          await wait(2900);
          if (!alive || touched.current) return;
          const clear = rootRef.current?.querySelector<HTMLButtonElement>(".hb-qf9-rm");
          if (clear) {
            clear.click();
            await wait(500);
          } else {
            setCode("");
            await wait(400);
          }
        }
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const subtotal = 5400;
  const off = applied ? 540 : 0;

  return (
    <div
      ref={rootRef}
      className="font-mono box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3 text-left text-[#ededed]"
      onPointerDown={() => {
        touched.current = true;
      }}
      onKeyDown={() => {
        touched.current = true;
      }}
    >
      <p className="m-0 mb-2 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">Checkout / Promotions</p>
      <PayCouponField
        value={code}
        onChange={setCode}
        onApply={() => setApplied(true)}
        onRemove={() => setApplied(false)}
      />
      <div className="mt-2 flex items-center justify-between text-xs text-[#a1a1a1]">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-[#a1a1a1]">
        <span>Discount</span>
        <span className={applied ? "text-[#3ddc97]" : ""}>{applied ? `-${money(off)}` : "none"}</span>
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-dashed border-[#333] pt-1.5 text-sm font-semibold">
        <span>Total</span>
        <span>{money(subtotal - off)}</span>
      </div>
    </div>
  );
}

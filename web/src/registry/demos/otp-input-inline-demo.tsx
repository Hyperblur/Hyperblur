"use client";

import { useEffect, useState } from "react";
import { OtpInputInline } from "@/registry/hyperblur/otp-input-inline";

const script = "482915";

export function OtpInputInlineDemo() {
  const [auto, setAuto] = useState(true);
  const [typed, setTyped] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % 10), 650);
    return () => window.clearInterval(id);
  }, [auto]);

  const value = auto ? script.slice(0, Math.min(tick, script.length)) : typed;
  const done = value.length === script.length;

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <p className="font-serif m-0 text-2xl italic leading-7">Check your inbox</p>
        <p className="m-0 text-[13px] leading-5 text-[#8f8f8f]">We sent a 6-digit code to ada@fernhill.co</p>
        <div
          className="mt-4"
          onFocus={() => {
            if (auto) {
              setAuto(false);
              setTyped("");
            }
          }}
        >
          <OtpInputInline value={value} onValueChange={setTyped} length={6} />
        </div>
        <p
          className="font-mono m-0 mt-3 text-center text-[11px]"
          style={{ color: done ? "#5fe39b" : "#8f8f8f", transition: "color 0.2s ease" }}
        >
          {done ? "Code accepted" : "Code expires in 09:42"}
        </p>
      </div>
    </div>
  );
}

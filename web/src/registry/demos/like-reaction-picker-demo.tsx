"use client";

import * as React from "react";
import { LikeReactionPicker, type ReactionId } from "@/registry/hyperblur/like-reaction-picker";
import { useQbLoop } from "./qb-loop";

export function LikeReactionPickerDemo() {
  const [value, setValue] = React.useState<ReactionId | null>(null);
  const [open, setOpen] = React.useState(false);
  const stop = useQbLoop((n) => {
    const step = n % 4;
    if (step === 0) setOpen(true);
    if (step === 1) {
      setValue("love");
      setOpen(false);
    }
    if (step === 2) setOpen(true);
    if (step === 3) {
      setValue(null);
      setOpen(false);
    }
  }, 2200);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-bold text-[#0a0a0a]"
            style={{ background: "linear-gradient(135deg, #ffb454, #ff7a8a)" }}
          >
            NH
          </span>
          <div className="min-w-0">
            <p className="m-0 text-[13px] font-semibold leading-4">Noor Haddad</p>
            <p className="m-0 text-[11px] leading-4 text-[#8f8f8f]">Product designer / 5h</p>
          </div>
        </div>
        <p className="m-0 mt-2 text-[13px] leading-5 text-[#cfcfcf]">
          Shipped the new onboarding today. Three screens became one and nobody noticed.
        </p>
        <div className="mt-2.5 flex items-center gap-4">
          <LikeReactionPicker
            value={value}
            open={open}
            onChange={(next) => {
              stop();
              setValue(next);
            }}
            onOpenChange={(next) => {
              stop();
              setOpen(next);
            }}
          />
          <span className="text-xs font-medium text-[#8f8f8f]">Comment</span>
          <span className="text-xs font-medium text-[#8f8f8f]">Repost</span>
        </div>
      </div>
    </div>
  );
}

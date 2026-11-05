"use client";

import * as React from "react";
import { SitePromoModal } from "@/registry/hyperblur/site-promo-modal";

const tiles = [
  "linear-gradient(160deg, #4f8f55, #17261b)",
  "linear-gradient(160deg, #c98a4b, #3a2616)",
  "linear-gradient(160deg, #7a8fc9, #161b2e)",
];

export function SitePromoModalDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] font-grotesk">
        <SitePromoModal open={open} onOpenChange={setOpen} delay={700} autoFocus={false}>
          <div className="flex h-full flex-col gap-3 p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[20px] italic leading-none text-[#ededed]">Fernhill</span>
              <span className="flex gap-3 text-[11px] text-[#8f8f8f]">
                <span>Plants</span>
                <span>Pots</span>
                <span>Care</span>
              </span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              {tiles.map((bg) => (
                <div key={bg} className="rounded-lg" style={{ background: bg }} />
              ))}
            </div>
          </div>
          {!open ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded-full border border-[#333333] bg-[#151515] px-3 py-1.5 text-[11px] font-semibold text-[#ededed] hover:bg-[#1c1c1c]"
            >
              Show the offer again
            </button>
          ) : null}
        </SitePromoModal>
      </div>
    </div>
  );
}

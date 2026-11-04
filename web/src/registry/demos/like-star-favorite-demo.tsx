"use client";

import * as React from "react";
import { LikeStarFavorite } from "@/registry/hyperblur/like-star-favorite";
import { useQbLoop } from "./qb-loop";

export function LikeStarFavoriteDemo() {
  const [active, setActive] = React.useState(false);
  const stop = useQbLoop((n) => setActive(n % 2 === 0), 3400);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] text-left text-[#ededed]">
        <div
          className="relative h-[92px]"
          style={{
            background:
              "radial-gradient(circle 26px at 50% 78%, #ffd36b 0%, #ff7aa8 70%, transparent 72%), repeating-linear-gradient(180deg, transparent 0 6px, rgba(20, 8, 40, 0.55) 6px 8px) bottom / 100% 36px no-repeat, linear-gradient(180deg, #170a38 0%, #4b1a7a 58%, #c93f84 100%)",
          }}
        >
          <div className="absolute right-2.5 top-2.5">
            <LikeStarFavorite
              size={16}
              toastSide="left"
              active={active}
              onActiveChange={(next) => {
                stop();
                setActive(next);
              }}
            />
          </div>
        </div>
        <div className="px-3.5 pb-3 pt-2.5">
          <p className="font-display m-0 text-lg font-semibold leading-5 tracking-[0.02em]">Night Drive</p>
          <p className="m-0 text-xs leading-4 text-[#8f8f8f]">Kestrel Arcade / 3:42</p>
          <div className="mt-2.5 h-1 rounded-full bg-[#262626]">
            <div className="h-full w-[38%] rounded-full bg-[#ededed]" />
          </div>
        </div>
      </div>
    </div>
  );
}

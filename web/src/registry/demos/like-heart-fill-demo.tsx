"use client";

import * as React from "react";
import { LikeHeartFill } from "@/registry/hyperblur/like-heart-fill";
import { useQbLoop } from "./qb-loop";

export function LikeHeartFillDemo() {
  const [liked, setLiked] = React.useState(false);
  const stop = useQbLoop((n) => setLiked(n % 2 === 0), 3200);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[320px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left text-[#ededed]">
        <div
          className="h-[84px] rounded-xl"
          style={{
            background:
              "radial-gradient(circle 40px at 50% 52%, #f3c97a 0 12px, #d9922f 12px 22px, #8a4a17 22px 32px, #ece6da 32px 36px, transparent 37px), radial-gradient(circle at 15% 0%, #6b3517 0%, transparent 62%), radial-gradient(circle at 90% 110%, #3d2a12 0%, transparent 55%), #1c120c",
          }}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans m-0 truncate text-xl leading-6">Burnt honey tart</p>
            <p className="font-grotesk m-0 text-[11px] uppercase leading-4 tracking-[0.08em] text-[#8f8f8f]">
              Pastry / 45 min
            </p>
          </div>
          <LikeHeartFill
            count={1284}
            size={22}
            liked={liked}
            onLikeChange={(next) => {
              stop();
              setLiked(next);
            }}
          />
        </div>
      </div>
    </div>
  );
}

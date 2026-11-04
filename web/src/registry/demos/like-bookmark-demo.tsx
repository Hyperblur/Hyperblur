"use client";

import * as React from "react";
import { LikeBookmark } from "@/registry/hyperblur/like-bookmark";
import { useQbLoop } from "./qb-loop";

export function LikeBookmarkDemo() {
  const [saved, setSaved] = React.useState(false);
  const stop = useQbLoop((n) => setSaved(n % 2 === 0), 3000);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[330px] rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <p className="font-grotesk m-0 text-[10px] font-medium uppercase leading-3 tracking-[0.14em] text-[#7fb3ff]">
          Essay / 8 min read
        </p>
        <p className="font-serif m-0 mt-1.5 text-[26px] leading-[1.05]">In praise of slow software</p>
        <p className="m-0 mt-2 text-xs leading-[18px] text-[#8f8f8f]">Why great tools feel unhurried.</p>
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <span className="font-serif text-sm italic text-[#a1a1a1]">By Lena Okoro</span>
          <LikeBookmark
            count={1204}
            size={18}
            saved={saved}
            onSavedChange={(next) => {
              stop();
              setSaved(next);
            }}
          />
        </div>
      </div>
    </div>
  );
}

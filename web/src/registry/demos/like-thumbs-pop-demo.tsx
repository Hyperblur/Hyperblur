"use client";

import * as React from "react";
import { LikeThumbsPop } from "@/registry/hyperblur/like-thumbs-pop";
import { useQbLoop } from "./qb-loop";

export function LikeThumbsPopDemo() {
  const [liked, setLiked] = React.useState(false);
  const stop = useQbLoop((n) => setLiked(n % 2 === 0), 3000);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3.5 text-left text-[#ededed]">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-semibold text-[#0a0a0a]"
            style={{ background: "linear-gradient(135deg, #7fb3ff, #a5b4ff)" }}
          >
            PR
          </span>
          <div className="min-w-0">
            <p className="m-0 text-[13px] font-semibold leading-4">Priya Raman</p>
            <p className="m-0 text-[11px] leading-4 text-[#8f8f8f]">Staff engineer / 2h ago</p>
          </div>
        </div>
        <p className="m-0 mt-2 text-[13px] leading-5 text-[#cfcfcf]">
          Moving retries into the queue worker cut our p99 from 4.1s to 380ms. Worth it.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <LikeThumbsPop
            count={48}
            size={18}
            liked={liked}
            onLikeChange={(next) => {
              stop();
              setLiked(next);
            }}
          />
          <span className="text-xs font-medium text-[#8f8f8f]">Reply</span>
          <span className="text-xs font-medium text-[#8f8f8f]">Share</span>
        </div>
      </div>
    </div>
  );
}

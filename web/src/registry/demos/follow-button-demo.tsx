"use client";

import * as React from "react";
import { FollowButton } from "@/registry/hyperblur/follow-button";
import { useQbLoop } from "./qb-loop";

export function FollowButtonDemo() {
  const [following, setFollowing] = React.useState(false);
  const stop = useQbLoop((n) => setFollowing(n % 2 === 0), 2800);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] text-left text-[#ededed]">
        <div
          className="h-[52px]"
          style={{
            background:
              "radial-gradient(circle at 85% -40%, #7fb3ff 0%, transparent 60%), linear-gradient(120deg, #17306f, #2f7bff)",
          }}
        />
        <div className="px-4 pb-3.5">
          <div className="-mt-5 flex items-end justify-between">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#111111] text-sm font-semibold text-[#0a0a0a]"
              style={{ background: "linear-gradient(135deg, #ffd9a8, #ff9bb3)" }}
            >
              MA
            </span>
            <FollowButton
              following={following}
              onFollowChange={(next) => {
                stop();
                setFollowing(next);
              }}
            />
          </div>
          <p className="m-0 mt-2 text-[15px] font-semibold leading-5">Maya Alvarez</p>
          <p className="m-0 text-xs leading-4 text-[#8f8f8f]">@mayamakes / 12.4k followers</p>
        </div>
      </div>
    </div>
  );
}

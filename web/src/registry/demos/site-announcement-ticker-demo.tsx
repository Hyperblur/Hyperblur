"use client";

import * as React from "react";
import { SiteAnnouncementTicker } from "@/registry/hyperblur/site-announcement-ticker";

const items = [
  { tag: "New", text: "Tempo 2.0 is here", href: "#" },
  { tag: "Event", text: "Keynote on Nov 18", href: "#" },
  { tag: "Offer", text: "25% off annual plans", href: "#" },
];

export function SiteAnnouncementTickerDemo() {
  const [shown, setShown] = React.useState(true);
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left">
        {shown ? (
          <SiteAnnouncementTicker
            items={items}
            interval={2600}
            onDismiss={() => {
              timer.current = window.setTimeout(() => setShown(false), 340);
            }}
          />
        ) : (
          <div className="grid h-9 place-items-center border-b border-[#262626] bg-[#111111]">
            <button
              type="button"
              onClick={() => setShown(true)}
              className="cursor-pointer rounded-full border border-[#333333] px-3 py-0.5 text-[11px] font-medium text-[#a1a1a1] hover:text-[#ededed]"
            >
              Show announcements
            </button>
          </div>
        )}
        <div className="flex items-center justify-between px-4 pt-3 text-[11px] text-[#8f8f8f]">
          <span className="font-serif text-[18px] italic leading-none text-[#ededed]">Tempo</span>
          <span className="flex gap-3">
            <span>Product</span>
            <span>Pricing</span>
            <span>Docs</span>
          </span>
        </div>
        <div className="px-4 pt-5">
          <p className="font-serif m-0 text-[26px] leading-[1.02] text-[#ededed]">Plan the week in a minute.</p>
          <p className="m-0 mt-2 text-[12px] text-[#8f8f8f]">One calm place for tasks, notes and focus time.</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-[#ededed] px-3 py-1 text-[11px] font-semibold text-[#0a0a0a]">Start free</span>
            <span className="rounded-full border border-[#333333] px-3 py-1 text-[11px] font-semibold text-[#ededed]">Watch demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

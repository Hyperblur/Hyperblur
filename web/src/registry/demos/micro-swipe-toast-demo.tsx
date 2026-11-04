"use client";

import * as React from "react";
import { MicroSwipeToast } from "@/registry/hyperblur/micro-swipe-toast";

const rows = [
  { name: "Priya Raman", text: "Signed the vendor agreement", tone: "#7a3b8f" },
  { name: "Tomas Berg", text: "Can we move standup to 10?", tone: "#2f6b8f" },
];

export function MicroSwipeToastDemo() {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => setOpen(true), 1500);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-1.5 overflow-hidden rounded-2xl border border-[#262626] bg-[#0d0d0d] p-3 text-left text-[13px] text-[#ededed]">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8f8f8f]">Inbox</span>
          <span className="font-mono text-[11px] text-[#6f6f6f]">12 unread</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="flex h-[34px] items-center gap-2.5 px-1">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white"
              style={{ background: r.tone }}
            >
              {r.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="m-0 truncate text-[12.5px] font-medium">{r.name}</p>
              <p className="m-0 truncate text-[11px] text-[#8f8f8f]">{r.text}</p>
            </div>
          </div>
        ))}
        <div className="h-[56px]">
          <MicroSwipeToast
            open={open}
            onOpenChange={setOpen}
            title="Conversation archived"
            description="Swipe it away, or undo"
          />
        </div>
      </div>
    </div>
  );
}

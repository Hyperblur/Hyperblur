"use client";

import * as React from "react";
import { ToastProvider, useToast } from "@/registry/hyperblur/toast-stack";

const messages = [
  { title: "Published", description: "Spring lookbook is live.", variant: "success" as const },
  { title: "Maya Chen joined", description: "She can now edit this workspace.", variant: "default" as const },
  { title: "Export failed", description: "lookbook.pdf is over 50 MB.", variant: "error" as const },
];

function Trigger() {
  const { toast } = useToast();
  const count = React.useRef(0);
  return (
    <button
      type="button"
      className="hb-btn hb-btn-primary hb-btn-sm cursor-pointer"
      onClick={() => toast(messages[count.current++ % messages.length])}
    >
      Publish changes
    </button>
  );
}

export function ToastStackDemo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ToastProvider inline position="bottom-right" max={2}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-5">
          <div className="flex w-full max-w-[260px] items-center gap-3 rounded-xl border border-white/10 bg-[#111113] p-3 text-left">
            <span
              className="h-9 w-9 shrink-0 rounded-lg"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 30%, #ffb3d6, rgba(255,179,214,0) 70%), linear-gradient(160deg, #c2457a, #3a1240)",
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">Spring lookbook</div>
              <div className="font-mono text-[10px] text-white/45">3 unsaved changes</div>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffd166]" />
          </div>
          <Trigger />
        </div>
      </ToastProvider>
    </div>
  );
}

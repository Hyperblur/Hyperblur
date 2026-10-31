"use client";

import * as React from "react";
import { ToastProvider, useToast } from "@/registry/hyperblur/toast-stack";

const messages = [
  { title: "Saved", description: "Your changes are live.", variant: "success" as const },
  { title: "New message", description: "Ada sent you a file.", variant: "default" as const },
  { title: "Upload failed", description: "Check your connection.", variant: "error" as const },
];

function Trigger() {
  const { toast } = useToast();
  const count = React.useRef(0);
  return (
    <button
      type="button"
      className="font-display cursor-pointer rounded-md border border-white/20 bg-white/5 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
      onClick={() => toast(messages[count.current++ % messages.length])}
    >
      Show toast
    </button>
  );
}

export function ToastStackDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <ToastProvider inline position="bottom-right" max={2}>
        <div className="flex h-full w-full items-center justify-center">
          <Trigger />
        </div>
      </ToastProvider>
    </div>
  );
}

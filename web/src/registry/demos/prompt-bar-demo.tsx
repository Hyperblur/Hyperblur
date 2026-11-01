"use client";

import * as React from "react";
import { PromptBar } from "@/registry/hyperblur/prompt-bar";

export function PromptBarDemo() {
  const [sent, setSent] = React.useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col justify-end px-4 pb-4 pt-3">
      <div className="mx-auto w-full max-w-[400px]">
        <p className="mb-2 min-h-4 truncate px-1 font-sans text-[11px] text-[#8f8f8f]" aria-live="polite">
          {sent}
        </p>
        <PromptBar
          models={["relay-2", "relay-2-mini"]}
          placeholder="Message Relay Assistant"
          onSend={(text, model) => setSent(`Sent to ${model}: ${text}`)}
        />
      </div>
    </div>
  );
}

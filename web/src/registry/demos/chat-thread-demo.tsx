"use client";

import * as React from "react";
import { ChatThread } from "@/registry/hyperblur/chat-thread";

const messages = [
  { id: "m1", role: "user" as const, content: "Did the staging deploy go through?", time: "10:41" },
  {
    id: "m2",
    role: "assistant" as const,
    content: "Yes. **Build 482** is live on staging, all `3` checks passed.",
    time: "10:41",
    streaming: true,
  },
];

export function ChatThreadDemo() {
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setRun((n) => n + 1), 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <ChatThread
          key={run}
          messages={messages}
          userName="Ada Lovelace"
          assistantName="Relay Assistant"
          maxHeight={150}
        />
      </div>
    </div>
  );
}

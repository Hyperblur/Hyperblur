import type { ReactNode } from "react";
import { ThinkingIndicator } from "@/registry/hyperblur/thinking-indicator";
import { ToolCallCard } from "@/registry/hyperblur/tool-call-card";
import { AgentSteps } from "@/registry/hyperblur/agent-steps";
import { StreamingTextDemo } from "@/registry/demos/streaming-text-demo";
import { ChatThreadDemo } from "@/registry/demos/chat-thread-demo";
import { PromptBarDemo } from "@/registry/demos/prompt-bar-demo";

export const agentKitDemos: Record<string, ReactNode> = {
  "streaming-text": <StreamingTextDemo />,
  "chat-thread": <ChatThreadDemo />,
  "tool-call-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <ToolCallCard
          name="search_docs"
          status="done"
          duration={420}
          defaultOpen
          args={{ query: "rollback policy" }}
          result={{ hits: 3, top: "deploys/rollback.md" }}
        />
      </div>
    </div>
  ),
  "thinking-indicator": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[320px] flex-col gap-4 rounded-xl border border-[#262626] bg-[#111111] px-4 py-4">
        <div className="flex items-center gap-2 font-sans text-[11px] font-medium text-[#8f8f8f]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#8b5cf6] text-[9px] font-semibold text-white">RA</span>
          Relay Assistant
        </div>
        <ThinkingIndicator showTimer phrases={["Thinking", "Searching docs", "Writing"]} />
        <ThinkingIndicator variant="dots" phrases={["Reading logs"]} />
      </div>
    </div>
  ),
  "prompt-bar": <PromptBarDemo />,
  "agent-steps": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] rounded-xl border border-[#262626] bg-[#111111] px-4 py-3.5">
        <AgentSteps
          compact
          steps={[
            { id: "s1", title: "Read deploy config", detail: "relay.toml, 3 services", status: "done" },
            { id: "s2", title: "Run staging checks", detail: "Health probes 2 of 3", status: "active" },
            { id: "s3", title: "Promote to production", status: "pending" },
          ]}
        />
      </div>
    </div>
  ),
};

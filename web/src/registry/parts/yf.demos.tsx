import type { ReactNode } from "react";
import { AgentTraceTimeline } from "@/registry/hyperblur/agent-trace-timeline";
import { AgentApprovalCard } from "@/registry/hyperblur/agent-approval-card";
import { AgentMemoryPanel } from "@/registry/hyperblur/agent-memory-panel";
import { AgentModelPicker } from "@/registry/hyperblur/agent-model-picker";
import { AgentFileDiff } from "@/registry/hyperblur/agent-file-diff";
import { AgentComposerAttachments } from "@/registry/hyperblur/agent-composer-attachments";
import { SiteHotspotTour } from "@/registry/hyperblur/site-hotspot-tour";
import { SiteTocScrollspyDemo } from "@/registry/demos/site-toc-scrollspy-demo";
import { SitePromoModalDemo } from "@/registry/demos/site-promo-modal-demo";
import { SiteAnnouncementTickerDemo } from "@/registry/demos/site-announcement-ticker-demo";

const traceSpans = [
  { id: "run", name: "support_agent.run", kind: "agent", start: 0, duration: 4800, depth: 0, status: "ok" as const },
  { id: "search", name: "search_docs", kind: "tool", start: 840, duration: 1320, depth: 1, status: "ok" as const, payload: '{\n  "query": "refund window",\n  "results": 6\n}' },
  { id: "fetch", name: "http.get /policies", kind: "http", start: 900, duration: 980, depth: 2, status: "ok" as const, payload: '{\n  "status": 200\n}' },
  { id: "refund", name: "issue_refund", kind: "tool", start: 2260, duration: 640, depth: 1, status: "error" as const, payload: '{\n  "error": "amount_exceeds_limit"\n}' },
  { id: "reply", name: "write_reply", kind: "model", start: 2980, duration: 1820, depth: 1, status: "running" as const },
];

const memories = [
  { id: "m1", text: "Prefers short answers with code first.", source: "chat, Mar 3", confidence: 0.94 },
  { id: "m2", text: "Deploys to Vercel from the main branch.", source: "repo scan", confidence: 0.81 },
  { id: "m3", text: "Works in the Lisbon time zone.", source: "inferred", confidence: 0.52 },
];

const mockLabel = "block h-[7px] rounded-full bg-[#262626]";

export const yfDemos: Record<string, ReactNode> = {
  "agent-trace-timeline": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <AgentTraceTimeline spans={traceSpans} title="Run 4821, refund request" />
      </div>
    </div>
  ),
  "agent-approval-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-grotesk">
        <AgentApprovalCard timeout={24} resetAfter={2600} />
      </div>
    </div>
  ),
  "agent-memory-panel": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <AgentMemoryPanel defaultItems={memories} title="What I remember" />
      </div>
    </div>
  ),
  "agent-model-picker": (
    <div className="flex h-full w-full items-start justify-center px-4 pt-3">
      <div className="h-[170px] w-full max-w-[340px] font-grotesk">
        <AgentModelPicker label="" defaultOpen defaultValue="aster-flash" listMaxHeight={112} />
      </div>
    </div>
  ),
  "agent-file-diff": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-mono">
        <AgentFileDiff context={1} />
      </div>
    </div>
  ),
  "agent-composer-attachments": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex h-[190px] w-full max-w-[340px] items-end font-sans">
        <AgentComposerAttachments
          defaultValue="/s"
          defaultAttachments={[
            { id: "a1", name: "brief.pdf", size: 238000 },
            { id: "a2", name: "mockup.png", size: 1420000 },
          ]}
        />
      </div>
    </div>
  ),
  "site-toc-scrollspy": <SiteTocScrollspyDemo />,
  "site-promo-modal": <SitePromoModalDemo />,
  "site-hotspot-tour": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] font-sans">
        <SiteHotspotTour>
          <div className="flex h-full flex-col text-left">
            <div className="flex h-[38px] shrink-0 items-center gap-2 border-b border-[#1f1f1f] bg-[#111111] px-3">
              <span className="w-[50px] text-[12px] font-semibold text-[#ededed]">Orbit</span>
              <span className="ml-2 flex h-6 w-[120px] items-center rounded-full border border-[#262626] bg-[#0a0a0a] px-2.5 text-[10px] text-[#6b6b6b]">
                Search
              </span>
              <span className="ml-auto h-5 w-5 rounded-full bg-[linear-gradient(135deg,#7fb3ff,#2f7bff)]" />
            </div>
            <div className="flex min-h-0 flex-1">
              <div className="flex w-[22%] shrink-0 flex-col gap-[14px] border-r border-[#1f1f1f] bg-[#101010] px-3 py-3">
                {["Overview", "Reports", "Alerts", "Projects", "Team"].map((l, i) => (
                  <span key={l} className={`text-[10px] ${i === 0 ? "text-[#ededed]" : "text-[#6b6b6b]"}`}>
                    {l}
                  </span>
                ))}
              </div>
              <div className="min-w-0 flex-1 p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-[#222222] bg-[#161616] p-2">
                    <span className={mockLabel} style={{ width: "50%" }} />
                    <span className="mt-1.5 block text-[15px] font-semibold leading-none text-[#ededed]">12.4k</span>
                  </div>
                  <div className="rounded-lg border border-[#222222] bg-[#161616] p-2">
                    <span className={mockLabel} style={{ width: "40%" }} />
                    <span className="mt-1.5 block text-[15px] font-semibold leading-none text-[#ededed]">3.8%</span>
                  </div>
                </div>
                <svg viewBox="0 0 220 44" className="mt-2 block h-[44px] w-full" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 34 C30 30 40 14 70 18 S120 36 150 20 S200 6 220 10" fill="none" stroke="#2f7bff" strokeWidth="2" />
                  <path d="M0 34 C30 30 40 14 70 18 S120 36 150 20 S200 6 220 10 V44 H0Z" fill="rgba(47,123,255,0.12)" />
                </svg>
              </div>
            </div>
            <span className="absolute bottom-[14px] right-3 grid h-6 w-14 place-items-center rounded-full bg-[#ededed] text-[10px] font-semibold text-[#0a0a0a]">
              Share
            </span>
          </div>
        </SiteHotspotTour>
      </div>
    </div>
  ),
  "site-announcement-ticker": <SiteAnnouncementTickerDemo />,
};

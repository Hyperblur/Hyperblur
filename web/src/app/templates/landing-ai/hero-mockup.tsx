"use client";

import { useState } from "react";
import { ChatThread, type ChatMessage } from "@/registry/hyperblur/chat-thread";
import { ToolCallCard } from "@/registry/hyperblur/tool-call-card";
import { ThinkingIndicator } from "@/registry/hyperblur/thinking-indicator";
import { AgentSteps, type AgentStep } from "@/registry/hyperblur/agent-steps";
import { Icon, LogoMark, icons } from "./ui";

const queues = [
  { label: "Support triage", count: 38, d: icons.chat },
  { label: "Invoice matching", count: 12, d: icons.receipt, active: true },
  { label: "Onboarding", count: 5, d: icons.people },
  { label: "Vendor updates", count: 3, d: icons.ledger },
];

const messages: ChatMessage[] = [
  { id: "m0", role: "system", content: "Run #4821 started from the AP inbox · 09:41" },
  {
    id: "m1",
    role: "user",
    content: "Match the Northbeam invoice to its PO and flag anything that looks off.",
    time: "09:41",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "Matched **NB-20418** to `PO-7731`. 46 of 48 lines agree with the PO and the goods receipt. Two freight lines bill **$4.10/mile** against a contracted $3.40, so I held **$1,240.00** and drafted a note to their AR team.",
    streaming: true,
  },
];

const steps: AgentStep[] = [
  { id: "a", title: "Extract 48 invoice lines", status: "done" },
  { id: "b", title: "Find PO-7731", status: "done" },
  { id: "c", title: "Three-way match", detail: "2 lines over rate card", status: "done" },
  { id: "d", title: "Controller approval", status: "active" },
  { id: "e", title: "Pay $17,180 on Net 30", status: "pending" },
];

type Decision = "pending" | "approved" | "rejected";

export function HeroMockup() {
  const [decision, setDecision] = useState<Decision>("pending");

  const planSteps: AgentStep[] =
    decision === "pending"
      ? steps
      : steps.map((s, i) =>
          i < 3
            ? s
            : i === 3
              ? { ...s, status: decision === "approved" ? "done" : "failed" }
              : { ...s, status: decision === "approved" ? "active" : "pending" },
        );

  return (
    <div className="hbl-ai-float">
      <div className="hbl-ai-under" aria-hidden="true" />
      <div className="hbl-ai-frame">
        <div className="hbl-ai-bar">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="hbl-ai-dot" />
            <i className="hbl-ai-dot" />
            <i className="hbl-ai-dot" />
          </span>
          <span className="hbl-ai-url">
            <Icon d={icons.lock} className="h-3 w-3" />
            app.cadence.so/runs/4821
          </span>
          <span className="hbl-ai-live">Live</span>
        </div>
        <div className="grid lg:grid-cols-[208px_minmax(0,1fr)_272px]">
          <aside className="hidden border-r border-white/[0.06] p-4 lg:block" aria-label="Queues">
            <div className="flex items-center gap-2 px-2 pb-4">
              <LogoMark id="app" size={22} />
              <span className="font-grotesk text-sm font-semibold text-[#eceef6]">Acme Freight</span>
            </div>
            <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b7088]">Queues</p>
            <ul className="space-y-0.5">
              {queues.map((q) => (
                <li key={q.label}>
                  <span className="hbl-ai-queue" data-active={q.active ? "true" : undefined}>
                    <Icon d={q.d} className="h-4 w-4" />
                    <span className="min-w-0 flex-1 truncate">{q.label}</span>
                    <span className="hbl-ai-count">{q.count}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-[11px] text-[#6b7088]">Runs today</p>
              <p className="mt-1 font-grotesk text-xl font-semibold text-[#eceef6]">1,284</p>
              <div className="mt-3 flex h-8 items-end gap-1" aria-hidden="true">
                {[40, 62, 48, 75, 58, 90, 70, 84, 66, 96].map((h, i) => (
                  <span key={i} className="hbl-ai-spark" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </aside>
          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b7088]">Invoice matching</p>
                <p className="mt-1 truncate font-grotesk text-[15px] font-semibold text-[#eceef6]">
                  Northbeam Logistics · NB-20418
                </p>
              </div>
              <span className="hbl-ai-tag">$18,420.00</span>
            </div>
            <ChatThread
              messages={messages}
              userName="Maya Chen"
              assistantName="Cadence"
              color="#7c3aed"
              speed={38}
              maxHeight={248}
            />
            <div className="mt-3">
              <ToolCallCard
                name="erp.match_invoice"
                status="done"
                duration={1840}
                color="#22d3ee"
                args={{ invoice: "NB-20418", po: "PO-7731", tolerance: 0.02 }}
                result={{ matched: 46, flagged: 2, variance: 1240.0 }}
              />
            </div>
            <div className="mt-3 px-1">
              <ThinkingIndicator
                phrases={["Drafting note to Northbeam AR", "Checking rate card v3", "Waiting on Dana"]}
                color="#22d3ee"
                interval={2200}
                className="text-[13px]"
              />
            </div>
          </div>
          <div className="min-w-0 border-t border-white/[0.06] p-4 sm:p-5 lg:border-l lg:border-t-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b7088]">Plan</p>
            <AgentSteps steps={planSteps} color="#8b5cf6" compact className="mt-4 text-[13px]" />
            <div className="hbl-ai-approval mt-5" data-state={decision}>
              <div className="flex items-center gap-2">
                <span className="hbl-ai-approval-icon">
                  <Icon d={icons.shield} className="h-3.5 w-3.5" />
                </span>
                <p className="text-[13px] font-medium text-[#eceef6]">Approval needed</p>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#9aa0b4]">
                Hold $1,240.00 for disputed freight and pay the remaining $17,180.00.
              </p>
              {decision === "pending" ? (
                <div className="mt-3 flex gap-2">
                  <button type="button" className="hbl-ai-mini hbl-ai-mini-yes" onClick={() => setDecision("approved")}>
                    Approve
                  </button>
                  <button type="button" className="hbl-ai-mini" onClick={() => setDecision("rejected")}>
                    Reject
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-between gap-2" role="status">
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#eceef6]">
                    <Icon
                      d={decision === "approved" ? icons.check : icons.x}
                      className={decision === "approved" ? "h-3.5 w-3.5 text-[#22d3ee]" : "h-3.5 w-3.5 text-[#f87171]"}
                      strokeWidth={2.2}
                    />
                    {decision === "approved" ? "Approved by you" : "Rejected, agent notified"}
                  </span>
                  <button type="button" className="hbl-ai-undo" onClick={() => setDecision("pending")}>
                    Undo
                  </button>
                </div>
              )}
              <p className="mt-3 border-t border-white/[0.06] pt-3 text-[11.5px] text-[#6b7088]">
                Policy: variances over $500 need a controller
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

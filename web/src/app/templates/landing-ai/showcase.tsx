"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AgentSteps, type AgentStep } from "@/registry/hyperblur/agent-steps";
import { StreamingText } from "@/registry/hyperblur/streaming-text";
import { ToolCallCard } from "@/registry/hyperblur/tool-call-card";
import { Icon, icons } from "./ui";

interface Workflow {
  id: string;
  label: string;
  icon: string;
  run: string;
  gate: number;
  approver: string;
  steps: AgentStep[];
  tool: { name: string; duration: number; args: Record<string, unknown>; result: Record<string, unknown> };
  reasoning: string;
}

const workflows: Workflow[] = [
  {
    id: "support",
    label: "Support triage",
    icon: icons.chat,
    run: "Ticket #88412 · refund request",
    gate: 3,
    approver: "Marco in #support-leads",
    steps: [
      { id: "s1", title: "Read ticket and order history", detail: "Order #88412 · $642.00 · delivered Oct 28" },
      { id: "s2", title: "Classify intent", detail: "Refund, damaged item · confidence 0.96" },
      { id: "s3", title: "Check refund policy", detail: "Inside 30 days, two photos attached" },
      { id: "s4", title: "Ask for approval", detail: "Over the $500 auto-approve limit" },
      { id: "s5", title: "Refund and reply", detail: "Reply drafted in the team voice" },
    ],
    tool: {
      name: "orders.lookup",
      duration: 412,
      args: { order_id: "88412", include: ["shipments", "payments"] },
      result: { total: 642.0, status: "delivered", days_since: 5, prior_refunds: 0 },
    },
    reasoning:
      "The customer reports a cracked display and attached two photos. Order **#88412** was delivered 5 days ago, inside the 30-day window, with no prior refunds on the account. The refund is **$642.00**, above the $500 auto-approve limit, so I routed it to `#support-leads` and drafted the reply to send once it clears.",
  },
  {
    id: "invoice",
    label: "Invoice matching",
    icon: icons.receipt,
    run: "Invoice NB-20418 · Northbeam Logistics",
    gate: 3,
    approver: "Dana, Controller",
    steps: [
      { id: "i1", title: "Extract invoice lines", detail: "48 lines from NB-20418.pdf" },
      { id: "i2", title: "Find purchase order", detail: "PO-7731 · goods receipt GR-5520" },
      { id: "i3", title: "Three-way match", detail: "46 matched · 2 over rate card" },
      { id: "i4", title: "Ask for approval", detail: "Variance over $500 needs a controller" },
      { id: "i5", title: "Schedule payment", detail: "$17,180.00 on Net 30, $1,240 disputed" },
    ],
    tool: {
      name: "erp.match_invoice",
      duration: 1840,
      args: { invoice: "NB-20418", po: "PO-7731", tolerance: 0.02 },
      result: { matched: 46, flagged: 2, variance: 1240.0 },
    },
    reasoning:
      "Lines 31 and 44 bill freight at **$4.10/mile** against a contracted **$3.40/mile**. Every other line matches the PO and the goods receipt. I will pay the matched $17,180.00 on terms, hold the $1,240.00 difference and send the dispute to `ar@northbeam.co` once Dana confirms.",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    icon: icons.people,
    run: "New hire · Priya Nair, Product Designer",
    gate: 3,
    approver: "IT on-call",
    steps: [
      { id: "o1", title: "Read the signed offer", detail: "Design team · Austin · starts Monday" },
      { id: "o2", title: "Create accounts", detail: "9 of 10 tools from the Design template" },
      { id: "o3", title: "Order equipment", detail: "MacBook Pro 14 and a monitor, arrives Friday" },
      { id: "o4", title: "Ask for admin access", detail: "Figma org admin is outside the template" },
      { id: "o5", title: "Plan the first week", detail: "Buddy, intro calls, payroll forms" },
    ],
    tool: {
      name: "hris.get_employee",
      duration: 236,
      args: { employee_id: "E-2291" },
      result: { name: "Priya Nair", team: "Design", location: "Austin", manager: "Theo Park" },
    },
    reasoning:
      "Priya starts Monday on the Design team in Austin. I created her accounts in 9 tools from the **Design template** and shipped her laptop for Friday delivery. Her offer also lists **Figma org admin**, which is outside the template, so I asked IT on-call instead of granting it myself.",
  },
];

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Panel({ wf, inView }: { wf: Workflow; inView: boolean }) {
  const [index, setIndex] = useState(0);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const limit = approved ? wf.steps.length : wf.gate;
    if (index >= limit) return;
    const t = window.setTimeout(() => setIndex((i) => i + 1), approved ? 900 : 1300);
    return () => window.clearTimeout(t);
  }, [inView, index, approved, wf.gate, wf.steps.length]);

  const waiting = !approved && index === wf.gate;
  const finished = index >= wf.steps.length;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="hbl-ai-card min-w-0 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-[13px] text-[#9aa0b4]">{wf.run}</p>
          <span className="hbl-ai-state" data-state={finished ? "done" : waiting ? "wait" : "run"}>
            {finished ? "Completed" : waiting ? "Needs approval" : "Running"}
          </span>
        </div>
        <AgentSteps steps={wf.steps} activeIndex={index} color="#8b5cf6" className="mt-6 text-[14px]" />
        <div className="hbl-ai-gate mt-6" data-on={waiting ? "true" : undefined}>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#eceef6]">
              {finished ? "All done. Logged to the audit trail." : approved ? "Approved. Finishing the run." : `Waiting for ${wf.approver}`}
            </p>
            <p className="mt-0.5 text-[12px] text-[#7d8299]">
              {finished ? "Decision, evidence and approver saved" : "Try it: you are the approver"}
            </p>
          </div>
          {finished ? (
            <button
              type="button"
              className="hbl-ai-mini"
              onClick={() => {
                setApproved(false);
                setIndex(0);
              }}
            >
              Replay
            </button>
          ) : (
            <button type="button" className="hbl-ai-mini hbl-ai-mini-yes" disabled={!waiting} onClick={() => setApproved(true)}>
              Approve
            </button>
          )}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <div className="hbl-ai-card min-w-0 flex-1 p-6 sm:p-7">
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#7d8299]">
            <Icon d={icons.spark} className="h-3.5 w-3.5 text-[#22d3ee]" />
            Why the agent did this
          </p>
          <StreamingText
            text={wf.reasoning}
            start={inView}
            speed={22}
            color="#22d3ee"
            className="mt-4 min-h-[9.5rem] text-[15px] leading-relaxed text-[#c9cce0]"
          />
        </div>
        <ToolCallCard
          name={wf.tool.name}
          status="done"
          duration={wf.tool.duration}
          args={wf.tool.args}
          result={wf.tool.result}
          color="#22d3ee"
          defaultOpen
        />
      </div>
    </div>
  );
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : workflows.length - 1)) % workflows.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const wf = workflows[active];

  return (
    <div ref={ref} className="mt-14">
      <div role="tablist" aria-label="Workflows" className="hbl-ai-tabs" onKeyDown={onKey}>
        {workflows.map((w, i) => (
          <button
            key={w.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`hbl-ai-tab-${w.id}`}
            aria-selected={i === active}
            aria-controls={`hbl-ai-panel-${w.id}`}
            tabIndex={i === active ? 0 : -1}
            className="hbl-ai-tab"
            onClick={() => setActive(i)}
          >
            <Icon d={w.icon} className="h-4 w-4" />
            {w.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`hbl-ai-panel-${wf.id}`}
        aria-labelledby={`hbl-ai-tab-${wf.id}`}
        className="hbl-ai-tabpanel mt-6"
        key={wf.id}
      >
        <Panel wf={wf} inView={inView} />
      </div>
    </div>
  );
}

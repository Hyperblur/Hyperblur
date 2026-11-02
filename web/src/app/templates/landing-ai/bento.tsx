import { Fragment, type ReactNode } from "react";
import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Check, Icon, SectionHead, icons } from "./ui";

const tickets = [
  { subject: "Refund for order #88412, screen cracked", route: "Refunds", tone: "violet", score: "0.96" },
  { subject: "Locked out after the SSO change", route: "Access", tone: "cyan", score: "0.93" },
  { subject: "Quote for 40 seats on annual billing", route: "Sales", tone: "amber", score: "0.89" },
  { subject: "Where is my replacement charger?", route: "Shipping", tone: "cyan", score: "0.95" },
];

const onboarding = [
  { label: "Accounts in 9 tools", done: true },
  { label: "MacBook Pro shipped to Austin", done: true },
  { label: "Payroll and tax forms", done: true },
  { label: "Figma admin, waiting on IT", done: false },
];

function Card({
  children,
  className = "",
  color,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  color: string;
  delay?: number;
}) {
  return (
    <FadeInView delay={delay} className={`min-w-0 ${className}`}>
      <SpotlightCard color={color} radius={22} size={380} idle={0.25} className="hbl-ai-bento h-full">
        {children}
      </SpotlightCard>
    </FadeInView>
  );
}

function CardText({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="relative">
      <span className="hbl-ai-icon">
        <Icon d={icon} className="h-[18px] w-[18px]" />
      </span>
      <h3 className="mt-5 font-grotesk text-xl font-semibold tracking-tight text-[#f2f3fa]">{title}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#9aa0b4]">{body}</p>
    </div>
  );
}

export function Bento() {
  return (
    <section id="product" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          eyebrow="One platform, every queue"
          title={
            <>
              Agents for the work
              <br className="hidden sm:block" /> nobody hired you to do
            </>
          }
          body="Start from a template, connect your tools and Cadence learns the way your team already handles each case. It does the reading, matching and typing. Your people make the calls."
        />
        <SpotlightGroup className="mt-16 grid gap-4 lg:grid-cols-3">
          <Card color="#8b5cf6" className="lg:col-span-2">
            <div className="grid h-full gap-8 p-7 sm:p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center">
              <CardText
                icon={icons.chat}
                title="Support triage"
                body="Reads every ticket, pulls the order and account history, tags intent and routes it with a confidence score. Easy ones get a drafted reply."
              />
              <ul className="hbl-ai-panel divide-y divide-white/[0.06]">
                {tickets.map((t) => (
                  <li key={t.subject} className="flex items-center gap-3 px-4 py-3">
                    <span className="min-w-0 flex-1 truncate text-[13px] text-[#c9cce0]">{t.subject}</span>
                    <span className="hbl-ai-route" data-tone={t.tone}>
                      {t.route}
                    </span>
                    <span className="hidden w-9 text-right font-mono text-[11px] text-[#6b7088] sm:inline">{t.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card color="#22d3ee" delay={0.08}>
            <div className="flex h-full flex-col gap-8 p-7 sm:p-8">
              <CardText
                icon={icons.receipt}
                title="Invoice matching"
                body="Three-way matches invoices, POs and receipts line by line, and holds only the amounts that disagree."
              />
              <div className="hbl-ai-panel mt-auto p-4">
                <div className="flex items-center">
                  {["Invoice", "PO", "Receipt"].map((doc, i) => (
                    <Fragment key={doc}>
                      <span className="hbl-ai-doc">
                        <Icon d={icons.file} className="h-4 w-4" />
                        <span className="text-[11px]">{doc}</span>
                      </span>
                      {i < 2 ? <span className="hbl-ai-link-line" aria-hidden="true" /> : null}
                    </Fragment>
                  ))}
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="hbl-ai-meter h-full w-[96%] rounded-full" />
                </div>
                <p className="mt-2 flex justify-between text-[12px] text-[#9aa0b4]">
                  <span>46 of 48 lines matched</span>
                  <span className="text-[#22d3ee]">$1,240 held</span>
                </p>
              </div>
            </div>
          </Card>
          <Card color="#22d3ee" delay={0.04}>
            <div className="flex h-full flex-col gap-8 p-7 sm:p-8">
              <CardText
                icon={icons.people}
                title="Employee onboarding"
                body="From signed offer to a ready laptop. Accounts, equipment, payroll and a first-week plan, before day one."
              />
              <div className="hbl-ai-panel mt-auto p-4">
                <div className="flex items-center gap-3">
                  <span className="hbl-ai-avatar" aria-hidden="true">
                    PN
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-[#eceef6]">Priya Nair, Product Designer</p>
                    <p className="text-[12px] text-[#6b7088]">Starts Monday · Austin</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {onboarding.map((o) => (
                    <li key={o.label} className="flex items-center gap-2.5 text-[13px] text-[#c9cce0]">
                      {o.done ? <Check tone="cyan" /> : <span className="hbl-ai-wait" aria-hidden="true" />}
                      <span className={o.done ? "" : "text-[#9aa0b4]"}>{o.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          <Card color="#8b5cf6" delay={0.12} className="lg:col-span-2">
            <div className="grid h-full gap-8 p-7 sm:p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center">
              <CardText
                icon={icons.shield}
                title="A person on every decision that matters"
                body="Set the line once. Refunds over $500, new vendor bank details, admin access: the agent prepares everything, then stops and asks."
              />
              <div className="space-y-2.5">
                {[
                  { rule: "Refund over $500", who: "#support-leads", time: "avg 6 min" },
                  { rule: "Vendor bank details change", who: "2 finance approvers", time: "avg 22 min" },
                  { rule: "Admin access to any tool", who: "IT on-call", time: "avg 9 min" },
                ].map((r) => (
                  <div key={r.rule} className="hbl-ai-panel flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
                    <Icon d={icons.lock} className="h-4 w-4 text-[#a78bfa]" />
                    <span className="min-w-0 flex-1 text-[13px] text-[#eceef6]">{r.rule}</span>
                    <span className="text-[12px] text-[#9aa0b4]">{r.who}</span>
                    <span className="hidden font-mono text-[11px] text-[#6b7088] sm:inline">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SpotlightGroup>
      </div>
    </section>
  );
}

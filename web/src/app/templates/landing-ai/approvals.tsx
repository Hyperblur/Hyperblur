import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Check, Icon, LogoMark, SectionHead, icons } from "./ui";

const fields = [
  { k: "Vendor", v: "Northbeam Logistics" },
  { k: "Invoice", v: "NB-20418" },
  { k: "Hold", v: "$1,240.00" },
  { k: "Reason", v: "Freight above rate card" },
];

const policy = [
  { kw: "when", rest: "refund.amount > 500" },
  { kw: "ask", rest: "#support-leads", indent: true },
  { kw: "wait", rest: "4h, then escalate to @marco", indent: true },
  { kw: "when", rest: "vendor.bank_details changed" },
  { kw: "require", rest: "2 approvers from finance", indent: true },
  { kw: "when", rest: "access.role is admin" },
  { kw: "ask", rest: "it-oncall, never auto-grant", indent: true },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3.5">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-[#c9cce0]">
          <span className="mt-1">
            <Check />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export function Approvals() {
  return (
    <section id="approvals" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-24 lg:gap-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0">
            <SectionHead
              align="left"
              eyebrow="Human in the loop"
              title="Agents propose. People approve."
              body="Approvals arrive where your team already talks, with the evidence attached. One tap to approve, reject or ask the agent a follow-up question."
            />
            <FadeInView delay={0.1}>
              <Bullets
                items={[
                  "Route by amount, customer tier, vendor risk or any field in your data",
                  "Approve from Slack, Teams, email or the Cadence inbox",
                  "Every decision is logged with who, when and the evidence they saw",
                ]}
              />
            </FadeInView>
          </div>
          <FadeInView direction="left" distance={32} className="min-w-0">
            <GlowBorder color="#8b5cf6" rounded={22} radius={280}>
              <div className="hbl-ai-card p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <p className="text-[13px] font-medium text-[#eceef6]"># ap-approvals</p>
                  <p className="text-[12px] text-[#6b7088]">14 members</p>
                </div>
                <div className="mt-5 flex gap-3">
                  <LogoMark id="msg" size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px]">
                      <span className="font-semibold text-[#eceef6]">Cadence</span>
                      <span className="ml-2 rounded border border-white/10 px-1 text-[10px] uppercase tracking-wider text-[#9aa0b4]">
                        App
                      </span>
                      <span className="ml-2 text-[#6b7088]">10:02</span>
                    </p>
                    <p className="mt-1.5 text-[14px] text-[#c9cce0]">
                      A payment hold needs a controller. Two freight lines are above the contracted rate.
                    </p>
                    <dl className="hbl-ai-panel mt-3 grid grid-cols-2 gap-x-4 gap-y-3 p-4">
                      {fields.map((f) => (
                        <div key={f.k} className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-[0.12em] text-[#6b7088]">{f.k}</dt>
                          <dd className="mt-0.5 truncate text-[13px] text-[#eceef6]">{f.v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="hbl-ai-mini hbl-ai-mini-yes">Approve hold</span>
                      <span className="hbl-ai-mini">Ask agent</span>
                      <span className="hbl-ai-mini">Reject</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[12.5px] text-[#9aa0b4]">
                      <span className="hbl-ai-avatar hbl-ai-avatar-sm" aria-hidden="true">
                        DW
                      </span>
                      <span>
                        <span className="text-[#eceef6]">Dana Whitfield</span> approved the hold · 2 min later
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlowBorder>
          </FadeInView>
        </div>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeInView direction="right" distance={32} className="order-2 min-w-0 lg:order-1">
            <TiltCard maxTilt={6} scale={1.01} className="block w-full rounded-[22px]">
              <div className="hbl-ai-card overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <p className="flex items-center gap-2 text-[13px] text-[#c9cce0]">
                    <Icon d={icons.file} className="h-4 w-4 text-[#a78bfa]" />
                    guardrails.cadence
                  </p>
                  <span className="hbl-ai-state" data-state="done">
                    Compiled · 3 rules
                  </span>
                </div>
                <pre className="hbl-ai-code overflow-x-auto p-5 font-mono text-[13px] leading-7">
                  {policy.map((l, i) => (
                    <span key={i} className="block">
                      <span className="hbl-ai-ln">{String(i + 1).padStart(2, "0")}</span>
                      {l.indent ? "    " : ""}
                      <span className={l.kw === "when" ? "text-[#a78bfa]" : "text-[#22d3ee]"}>{l.kw}</span>
                      <span className="text-[#c9cce0]"> {l.rest}</span>
                    </span>
                  ))}
                </pre>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] px-5 py-3.5 text-[12px] text-[#9aa0b4]">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon d={icons.check} className="h-3.5 w-3.5 text-[#22d3ee]" strokeWidth={2.2} />
                    Checked before every action
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon d={icons.clock} className="h-3.5 w-3.5" />
                    Versioned, with rollback
                  </span>
                </div>
              </div>
            </TiltCard>
          </FadeInView>
          <div className="order-1 min-w-0 lg:order-2">
            <SectionHead
              align="left"
              eyebrow="Guardrails"
              title="Policies written like a brief to a new hire"
              body="Describe the limits in plain English or in the policy editor. Cadence turns them into checks that run before every action and blocks anything outside them, even when a prompt asks nicely."
            />
            <FadeInView delay={0.1}>
              <Bullets
                items={[
                  "Spending caps per agent, per workflow and per day",
                  "Read-only mode for new workflows until you trust them",
                  "Test any policy against last month's real cases before it goes live",
                ]}
              />
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}

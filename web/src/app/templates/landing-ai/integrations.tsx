import { AnimatedBeam } from "@/registry/hyperblur/animated-beam";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Icon, LogoMark, SectionHead, icons } from "./ui";

const categories = [
  { label: "Helpdesks", count: 9, d: icons.chat },
  { label: "Email and shared inboxes", count: 6, d: icons.mail },
  { label: "ERPs and ledgers", count: 14, d: icons.ledger },
  { label: "HR and payroll", count: 11, d: icons.people },
  { label: "Chat and approvals", count: 5, d: icons.bolt },
  { label: "Warehouses and databases", count: 8, d: icons.database },
];

function NodeIcon({ d }: { d: string }) {
  return <Icon d={d} className="h-full w-full" strokeWidth={1.8} />;
}

export function Integrations() {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="min-w-0">
          <SectionHead
            align="left"
            eyebrow="Integrations"
            title="Plugs into the stack you already pay for"
            body="53 native connectors, plus REST and webhooks for everything else. Agents read and write through scoped service accounts, so access is as narrow as the job."
          />
          <FadeInView delay={0.1}>
            <ul className="mt-10 grid gap-2.5 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.label} className="hbl-ai-panel flex items-center gap-3 px-4 py-3">
                  <Icon d={c.d} className="h-4 w-4 shrink-0 text-[#a78bfa]" />
                  <span className="min-w-0 flex-1 text-[13.5px] text-[#c9cce0]">{c.label}</span>
                  <span className="font-mono text-[12px] text-[#6b7088]">{c.count}</span>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
        <FadeInView direction="left" distance={28} className="min-w-0">
          <div className="hbl-ai-card hbl-ai-beam-card relative overflow-hidden px-5 py-10 sm:px-12 sm:py-14">
            <div className="hbl-ai-beam-glow pointer-events-none absolute inset-0" aria-hidden="true" />
            <AnimatedBeam
              color="#22d3ee"
              duration={3.2}
              curvature={0.55}
              sources={[
                { icon: <NodeIcon d={icons.chat} />, label: "Helpdesk" },
                { icon: <NodeIcon d={icons.mail} />, label: "AP inbox" },
                { icon: <NodeIcon d={icons.ledger} />, label: "ERP" },
                { icon: <NodeIcon d={icons.people} />, label: "HR system" },
              ]}
              hub={{ icon: <LogoMark id="beam" size={40} />, label: "Cadence" }}
              output={{ icon: <NodeIcon d={icons.shield} />, label: "Approver" }}
              className="relative"
            />
            <div className="relative mt-10 grid grid-cols-3 gap-3 text-center text-[12px] text-[#7d8299]">
              <span>Your tools</span>
              <span className="text-[#eceef6]">Cadence agents</span>
              <span>Your approvers</span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

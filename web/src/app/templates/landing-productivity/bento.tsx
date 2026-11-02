import type { ReactNode } from "react";
import { BentoGrid, BentoCard } from "@/registry/hyperblur/bento-grid";
import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

function Tile({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <SpotlightCard color="#ff6b3d" radius={20} size={380} idle={0.25} className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className="relative px-6 pb-6 pt-2">
        <h3 className="text-[16px] font-medium text-[#f2f2f5]">{title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#a3a3ae]">{text}</p>
      </div>
    </SpotlightCard>
  );
}

function CycleChart() {
  const bars = [42, 55, 48, 62, 58, 71, 66, 78, 74, 86, 81, 92];
  return (
    <div className="flex h-full items-end gap-6 px-6 pt-6">
      <div className="hidden flex-none pb-2 sm:block">
        <p className="hbl-pr-display text-[44px] leading-none tracking-[-0.05em] text-[#f2f2f5]">2.4d</p>
        <p className="mt-2 text-[12px] text-[#8b8b96]">median cycle time</p>
        <p className="mt-1 text-[12px] text-[#7ee2b8]">1.1 days faster than Q2</p>
      </div>
      <div className="flex h-full min-w-0 flex-1 items-end gap-1.5 pb-2" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="hbl-pr-col-grow flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1 ? "linear-gradient(180deg, #ff6b3d, #ff6b3d55)" : "linear-gradient(180deg, #ffffff22, #ffffff08)",
              ["--hbl-pr-d" as string]: `${(i * 0.05).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CommandMenu() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-6 pt-6">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="hbl-pr-key">⌘</span>
        <span className="hbl-pr-key">K</span>
      </div>
      <ul className="w-full max-w-[240px] space-y-1 rounded-xl border border-white/[0.08] bg-[#121216] p-1.5 text-[12px]">
        <li className="flex justify-between rounded-lg bg-[#ff6b3d]/[0.12] px-2.5 py-1.5 text-[#f2f2f5]">
          Create issue <span className="font-mono text-[#8b8b96]">C</span>
        </li>
        <li className="flex justify-between px-2.5 py-1.5 text-[#a3a3ae]">
          Move to sprint <span className="font-mono text-[#6f6f7a]">M</span>
        </li>
        <li className="flex justify-between px-2.5 py-1.5 text-[#a3a3ae]">
          Assign to me <span className="font-mono text-[#6f6f7a]">I</span>
        </li>
      </ul>
    </div>
  );
}

function Presence() {
  return (
    <div className="relative h-full px-6 pt-7" aria-hidden="true">
      <div className="space-y-2.5">
        <span className="block h-2.5 w-3/4 rounded-full bg-white/[0.09]" />
        <span className="block h-2.5 w-full rounded-full bg-white/[0.06]" />
        <span className="block h-2.5 w-5/6 rounded-full bg-white/[0.06]" />
        <span className="block h-2.5 w-2/3 rounded-full bg-[#ffd166]/25" />
        <span className="block h-2.5 w-4/5 rounded-full bg-white/[0.06]" />
      </div>
      <div className="hbl-pr-cursor absolute left-[30%] top-[22%]">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="#ff6b3d">
          <path d="M2 1l11 6-5 1.5L6 14z" />
        </svg>
        <span className="ml-3 rounded-md bg-[#ff6b3d] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a0b05]">Maya</span>
      </div>
      <div className="hbl-pr-cursor hbl-pr-cursor-b absolute left-[58%] top-[52%]">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="#ffd166">
          <path d="M2 1l11 6-5 1.5L6 14z" />
        </svg>
        <span className="ml-3 rounded-md bg-[#ffd166] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a0b05]">Ravi</span>
      </div>
    </div>
  );
}

function GitFlow() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 px-6 pt-6" aria-hidden="true">
      <svg viewBox="0 0 420 80" className="h-auto w-full max-w-[520px]">
        <path d="M10 56 H410" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />
        <path d="M110 56 C140 56 140 20 170 20 H280 C310 20 310 56 340 56" stroke="#ff6b3d" strokeWidth="2" fill="none" />
        <path className="hbl-pr-flow" d="M110 56 C140 56 140 20 170 20 H280 C310 20 310 56 340 56" stroke="#ffd166" strokeWidth="2" fill="none" />
        {[40, 110, 380].map((x) => (
          <circle key={x} cx={x} cy="56" r="6" fill="#121216" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
        ))}
        {[190, 235].map((x) => (
          <circle key={x} cx={x} cy="20" r="6" fill="#121216" stroke="#ff6b3d" strokeWidth="2" />
        ))}
        <circle cx="340" cy="56" r="8" fill="#ff6b3d" />
      </svg>
      <div className="flex flex-wrap gap-2 text-[12px]">
        <span className="hbl-pr-chip">
          <span className="hbl-pr-chip-dot text-[#ff6b3d]" />
          feat/apple-pay-sheet
        </span>
        <span className="hbl-pr-chip">
          <span className="hbl-pr-chip-dot text-[#7ee2b8]" />
          PR #482 merged
        </span>
        <span className="hbl-pr-chip">
          <span className="hbl-pr-chip-dot text-[#ffd166]" />
          TMP-482 moved to Done
        </span>
      </div>
    </div>
  );
}

function Permissions() {
  const rows = [
    { r: "Members", on: true },
    { r: "Guests", on: true },
    { r: "Contractors", on: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-6 pt-6" aria-hidden="true">
      {rows.map((x) => (
        <div key={x.r} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#121216] px-3.5 py-2.5 text-[13px]">
          <span className="text-[#e4e4ea]">{x.r}</span>
          <span className="hbl-pr-switch" data-on={x.on} />
        </div>
      ))}
    </div>
  );
}

function ImportFlow() {
  const steps = [
    { t: "Projects and epics", n: "312", done: true },
    { t: "Issues and comments", n: "12,480", done: true },
    { t: "Attachments", n: "3,906", done: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6 pt-6">
      <div>
        <div className="mb-2 flex justify-between text-[12px]">
          <span className="text-[#f2f2f5]">Importing your backlog</span>
          <span className="font-mono text-[#ffd166]">86%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
          <div className="hbl-pr-bar-grow h-full w-[86%] rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ffd166]" />
        </div>
      </div>
      <ul className="grid gap-2 text-[12px] sm:grid-cols-3">
        {steps.map((s) => (
          <li key={s.t} className="rounded-xl border border-white/[0.07] bg-[#121216] px-3 py-2.5">
            <p className="hbl-pr-display text-[18px] tracking-[-0.03em] text-[#f2f2f5]">{s.n}</p>
            <p className="mt-0.5 text-[#8b8b96]">
              {s.t} {s.done ? <span className="text-[#7ee2b8]">· done</span> : <span className="text-[#ffd166]">· syncing</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32" aria-labelledby="hbl-pr-cap-title">
      <div className="mx-auto max-w-[1200px]">
        <FadeInView className="mx-auto max-w-[720px] text-center">
          <span className="hbl-pr-eyebrow">Built for speed</span>
          <h2 id="hbl-pr-cap-title" className="hbl-pr-h2">
            Fast enough that people actually update it
          </h2>
          <p className="hbl-pr-sub mx-auto max-w-[560px]">
            Every view loads in under 100 ms, works offline and syncs the moment you are back. The details add up.
          </p>
        </FadeInView>
        <FadeInView delay={0.1} className="mt-14">
          <SpotlightGroup>
            <BentoGrid columns={3} rowHeight={300} gap={16} className="hbl-pr-bento">
              <BentoCard colSpan={2}>
                <Tile title="Cycle analytics" text="See where work waits. Cycle time, throughput and scope creep per team, refreshed every hour.">
                  <CycleChart />
                </Tile>
              </BentoCard>
              <BentoCard>
                <Tile title="Keyboard first" text="Every action is two keys away. Your hands never leave the keyboard during planning.">
                  <CommandMenu />
                </Tile>
              </BentoCard>
              <BentoCard>
                <Tile title="Live presence" text="See who is editing a spec, down to the cursor, with no refresh and no conflicts.">
                  <Presence />
                </Tile>
              </BentoCard>
              <BentoCard colSpan={2}>
                <Tile title="Git that moves the board" text="Branches link to issues by name. Open a PR and the card moves; merge it and the card closes.">
                  <GitFlow />
                </Tile>
              </BentoCard>
              <BentoCard>
                <Tile title="Guest access" text="Invite agencies and contractors to one project without opening the whole workspace.">
                  <Permissions />
                </Tile>
              </BentoCard>
              <BentoCard colSpan={2}>
                <Tile title="Switch in an afternoon" text="Bring projects, issues, comments and attachments from your current tracker with history intact.">
                  <ImportFlow />
                </Tile>
              </BentoCard>
            </BentoGrid>
          </SpotlightGroup>
        </FadeInView>
      </div>
    </section>
  );
}

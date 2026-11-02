"use client";

import * as React from "react";
import { CommandPalette, type CommandPaletteItem } from "@/registry/hyperblur/command-palette";
import { SpeedLines } from "@/registry/hyperblur/speed-lines";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Glyph, SectionHead } from "./icons";

const rocket = (
  <Glyph>
    <path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2" />
    <path d="M9 15l-3-3c2-5 6-9 13-9 0 7-4 11-9 13z" />
    <circle cx="14.5" cy="9.5" r="1.5" />
  </Glyph>
);
const undo = (
  <Glyph>
    <path d="M4 9h11a5 5 0 0 1 0 10H9" />
    <path d="M8 5L4 9l4 4" />
  </Glyph>
);
const eye = (
  <Glyph>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Glyph>
);
const db = (
  <Glyph>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
    <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
    <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
  </Glyph>
);
const scroll = (
  <Glyph>
    <path d="M4 6h16M4 12h10M4 18h13" />
  </Glyph>
);
const key = (
  <Glyph>
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l9-9M17 6l3 3" />
  </Glyph>
);

const output: Record<string, string[]> = {
  "deploy-prod": ["forge deploy --prod", "deployed acme-web-7f3a2c in 9.41s"],
  "deploy-preview": ["forge deploy", "preview ready at checkout-v2.acme.forge.run"],
  rollback: ["forge rollback e19b04", "production now serving e19b04, restored in 0.6s"],
  "cache-stats": ["forge cache stats", "97.8% hits this week, 412 CPU hours saved"],
  "cache-purge": ["forge cache purge --pkg=@acme/ui", "purged 312 artifacts for @acme/ui"],
  logs: ["forge logs --follow --env=prod", "streaming from iad1, fra1, hnd1"],
  env: ["forge env pull --env=preview", "3 secrets written to .env.local"],
  inspect: ["forge inspect 7f3a2c", "28 tasks, 1,284 cached, 4.92s build, 3.4 MB"],
};

const items: CommandPaletteItem[] = [
  { id: "deploy-prod", label: "Deploy to production", group: "Deploy", hint: "⌘⏎", icon: rocket },
  { id: "deploy-preview", label: "Create preview for current branch", group: "Deploy", hint: "⌘P", icon: eye },
  { id: "rollback", label: "Roll back production to e19b04", group: "Deploy", hint: "⌘Z", icon: undo },
  { id: "cache-stats", label: "Show remote cache stats", group: "Cache", icon: db },
  { id: "cache-purge", label: "Purge cache for @acme/ui", group: "Cache", icon: db },
  { id: "logs", label: "Follow production logs", group: "Inspect", hint: "⌘L", icon: scroll },
  { id: "env", label: "Pull preview environment variables", group: "Inspect", icon: key },
  { id: "inspect", label: "Inspect deploy 7f3a2c", group: "Inspect", icon: eye },
];

const shortcuts = [
  { keys: ["⌘", "K"], label: "Open the command palette in the dashboard or the TUI" },
  { keys: ["⌘", "⏎"], label: "Promote the selected preview to production" },
  { keys: ["⌘", "Z"], label: "Roll back to the previous release, no rebuild" },
];

export function Commands() {
  const [picked, setPicked] = React.useState("rollback");
  const [count, setCount] = React.useState(0);
  const lines = output[picked];

  return (
    <section className="hbl-dv-rule relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <FadeInView direction="right" className="min-w-0">
          <SectionHead
            label="Workflow"
            title="Every action is one keystroke away."
            body="The same commands live in the CLI, the terminal UI and the dashboard. Fuzzy-search a deploy, a branch or a secret and run it without reaching for the mouse."
          />
          <ul className="mt-10 space-y-4">
            {shortcuts.map((s) => (
              <li key={s.label} className="flex items-center gap-4">
                <span className="flex shrink-0 gap-1">
                  {s.keys.map((k) => (
                    <kbd key={k} className="hbl-dv-kbd">
                      {k}
                    </kbd>
                  ))}
                </span>
                <span className="text-[14.5px] text-[#a3a39b]">{s.label}</span>
              </li>
            ))}
          </ul>
        </FadeInView>

        <FadeInView direction="left" delay={0.1} className="relative min-w-0">
          <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 opacity-80 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,#000,transparent)]" aria-hidden="true">
            <SpeedLines color="#a3e635" count={18} angle={0} speed={0.9} opacity={0.22} />
          </div>
          <div className="relative rounded-[20px] border border-white/10 bg-[#0b0b0c]/70 p-2 shadow-[0_40px_100px_-40px_rgba(163,230,53,0.35)] backdrop-blur">
            <div
              className="hbl-dv-cp"
              onKeyDownCapture={(e) => {
                if (e.key === "Tab") e.stopPropagation();
              }}
            >
              <CommandPalette
                inline
                items={items}
                color="#a3e635"
                placeholder="Type a command, try “roll”"
                onSelect={(id) => {
                  setPicked(id);
                  setCount((c) => c + 1);
                }}
              />
            </div>
            <div className="mt-2 rounded-[14px] border border-white/10 bg-[#0f0f10] px-4 py-3 font-mono text-[12px] leading-relaxed" aria-live="polite">
              <p className="truncate">
                <span className="text-[#a3e635]">❯</span> <span className="text-[#f4f4f0]">{lines[0]}</span>
              </p>
              <p key={`${picked}-${count}`} className="hbl-dv-tl truncate text-[#a3a39b]" data-on="true">
                <span className="text-[#a3e635]">✓</span> {lines[1]}
              </p>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[11.5px] text-[#6f6f69]">Click a command or use the arrow keys and Enter.</p>
        </FadeInView>
      </div>
    </section>
  );
}

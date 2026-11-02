"use client";

import * as React from "react";
import { MorphTabs } from "@/registry/hyperblur/morph-tabs";
import { PageTransition } from "@/registry/hyperblur/page-transition";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { CheckMark } from "./icons";
import { AutomationsMock, DocsMock, RoadmapMock, SprintMock } from "./showcase-mocks";

const views = [
  {
    id: "roadmaps",
    label: "Roadmaps",
    title: "A roadmap that updates itself",
    text: "Initiatives roll up from real issues, so progress bars move when code merges, not when someone remembers to edit a slide.",
    points: ["Quarter, month and week zoom", "Drag to reschedule, dependencies follow", "Share a read-only link with leadership"],
    mock: <RoadmapMock />,
  },
  {
    id: "sprints",
    label: "Sprints",
    title: "Sprints that plan in ten minutes",
    text: "Tempo suggests scope from last cycle's velocity and flags who is over capacity before the sprint starts, not halfway through.",
    points: ["Live burndown and scope change", "Capacity per person and per role", "Unfinished work rolls over in one click"],
    mock: <SprintMock />,
  },
  {
    id: "docs",
    label: "Docs",
    title: "Specs that stay next to the work",
    text: "Write the PRD where the issues live. Mention an issue and its status stays current inside the doc, forever.",
    points: ["Live issue embeds and linked metrics", "Inline comments that become tasks", "Templates for PRDs, RFCs and retros"],
    mock: <DocsMock />,
  },
  {
    id: "automations",
    label: "Automations",
    title: "Rules that do the busywork",
    text: "Route bugs, nudge reviewers and post the standup without a single script. Build a rule in plain words and watch it run.",
    points: ["40 triggers across issues, docs and Git", "Dry-run any rule before it goes live", "Full run history with one-click undo"],
    mock: <AutomationsMock />,
  },
];

export function Showcase() {
  const [tab, setTab] = React.useState(views[0].id);
  const current = views.find((v) => v.id === tab) ?? views[0];

  return (
    <section id="features" className="scroll-mt-8 px-4 py-24 sm:px-6 lg:py-32" aria-labelledby="hbl-pr-features-title">
      <div className="mx-auto max-w-[1200px]">
        <FadeInView className="max-w-[720px]">
          <span className="hbl-pr-eyebrow">One workspace</span>
          <h2 id="hbl-pr-features-title" className="hbl-pr-h2">
            From the big bet to the last pull request
          </h2>
          <p className="hbl-pr-sub max-w-[580px]">
            Four views over the same live data. Change a date on the roadmap and the sprint, the spec and the standup all know.
          </p>
        </FadeInView>
        <div id="automations" className="mt-14 grid scroll-mt-8 items-start gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0">
            <MorphTabs
              value={tab}
              onChange={setTab}
              color="#ff6b3d"
              tabs={views.map((v) => ({
                id: v.id,
                label: v.label,
                content: (
                  <div>
                    <p className="hbl-pr-display text-[22px] tracking-[-0.03em] text-[#f2f2f5]">{v.title}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#a3a3ae]">{v.text}</p>
                    <ul className="mt-5 space-y-3">
                      {v.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[14px] text-[#e4e4ea]">
                          <CheckMark />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </div>
          <div className="hbl-pr-frame min-w-0">
            <div className="hbl-pr-chrome">
              <div className="hbl-pr-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="hbl-pr-url">tempo.app/northwind/{current.id}</div>
            </div>
            <PageTransition routeKey={current.id} variant="blur" duration={0.55} className="min-h-[360px]">
              {current.mock}
            </PageTransition>
          </div>
        </div>
      </div>
    </section>
  );
}

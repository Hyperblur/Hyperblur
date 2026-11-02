"use client";

import * as React from "react";
import { SidebarNav, type SidebarNavGroup } from "@/registry/hyperblur/sidebar-nav";
import { KanbanBoard, type KanbanColumn } from "@/registry/hyperblur/kanban-board";
import { ActivityFeed, type ActivityFeedItem } from "@/registry/hyperblur/activity-feed";
import { StatCard } from "@/registry/hyperblur/stat-card";
import { TabsUnderline } from "@/registry/hyperblur/tabs-underline";
import { Icon, TempoMark } from "./icons";

const groups: SidebarNavGroup[] = [
  {
    items: [
      { id: "inbox", label: "Inbox", badge: 4, icon: <Icon><path d="M4 13l2.5-7h11L20 13v5H4z" /><path d="M4 13h5l1 2h4l1-2h5" /></Icon> },
      { id: "my", label: "My issues", icon: <Icon><circle cx="12" cy="12" r="8" /><path d="M8.5 12l2.5 2.5 4.5-5" /></Icon> },
    ],
  },
  {
    label: "Mobile squad",
    items: [
      { id: "roadmap", label: "Roadmap", icon: <Icon><path d="M4 6h9M4 12h14M4 18h6" /></Icon> },
      { id: "sprint", label: "Sprint 14", badge: 18, icon: <Icon><path d="M13 3L5 14h6l-1 7 8-11h-6z" /></Icon> },
      { id: "docs", label: "Docs", icon: <Icon><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></Icon> },
      { id: "auto", label: "Automations", icon: <Icon><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="4" /></Icon> },
    ],
  },
];

const columns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "c1", title: "Saved cards on file", tag: "Payments", tone: "#ffd166" },
      { id: "c2", title: "Coupon field validation", tag: "Web", tone: "#8b8b96" },
    ],
  },
  {
    id: "doing",
    title: "In progress",
    cards: [
      { id: "c3", title: "Apple Pay sheet", tag: "iOS", tone: "#ff6b3d" },
      { id: "c4", title: "Address autocomplete", tag: "Growth", tone: "#ffd166" },
    ],
  },
  {
    id: "review",
    title: "In review",
    cards: [{ id: "c5", title: "Order summary redesign", tag: "Design", tone: "#ff6b3d" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "c6", title: "Guest checkout crash on iOS 18", tag: "Bug", tone: "#7ee2b8" },
      { id: "c7", title: "Shipping rates API", tag: "Backend", tone: "#8b8b96" },
    ],
  },
];

const feed: ActivityFeedItem[] = [
  { id: "a1", actor: "Maya Chen", action: "moved", target: "Apple Pay sheet", time: "2m" },
  {
    id: "a2",
    actor: "Ravi Patel",
    action: "merged PR #482 into",
    target: "main",
    time: "14m",
    tone: "success",
    detail: "checkout: debounce coupon requests",
  },
  { id: "a3", actor: "Tempo Bot", action: "posted standup to", target: "#mobile", time: "1h", tone: "warning" },
  { id: "a4", actor: "Lena Ortiz", action: "commented on", target: "Address autocomplete", time: "2h" },
  { id: "a5", actor: "Sam Okoye", action: "closed", target: "Guest checkout crash", time: "3h", tone: "success" },
];

const people = [
  { n: "MC", c: "#c2410c" },
  { n: "RP", c: "#7c5c1e" },
  { n: "LO", c: "#3f3f8f" },
];

function Timeline() {
  const rows = [
    { label: "Apple Pay sheet", start: 4, span: 46, tone: "#ff6b3d", done: 0.7 },
    { label: "Address autocomplete", start: 18, span: 40, tone: "#ffd166", done: 0.45 },
    { label: "Order summary", start: 30, span: 36, tone: "#ff6b3d", done: 0.2 },
    { label: "Saved cards", start: 52, span: 42, tone: "#8b8b96", done: 0 },
  ];
  return (
    <div className="relative rounded-xl border border-white/[0.07] bg-[#15151a] p-4">
      <div className="mb-3 grid grid-cols-4 text-[11px] text-[#8b8b96]">
        <span>Mon 3</span>
        <span>Wed 5</span>
        <span>Fri 7</span>
        <span>Tue 11</span>
      </div>
      <div className="relative space-y-3">
        <span className="hbl-pr-today absolute bottom-0 top-0 w-px bg-[#ff6b3d]" style={{ left: "38%" }} aria-hidden="true" />
        {rows.map((r, i) => (
          <div key={r.label} className="relative h-7">
            <div
              className="hbl-pr-bar-grow absolute inset-y-0 flex items-center overflow-hidden rounded-md px-2 text-[11px] text-[#f2f2f5]"
              style={{ left: `${r.start}%`, width: `${r.span}%`, background: `${r.tone}26`, boxShadow: `inset 0 0 0 1px ${r.tone}55`, ["--hbl-pr-d" as string]: `${(i * 0.08).toFixed(2)}s` }}
            >
              <span className="absolute inset-y-0 left-0" style={{ width: `${r.done * 100}%`, background: `${r.tone}40` }} aria-hidden="true" />
              <span className="relative truncate">{r.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocPreview() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#15151a] p-5 text-[13px] leading-relaxed text-[#c9c9d1]">
      <p className="hbl-pr-display text-[20px] tracking-[-0.03em] text-[#f2f2f5]">Checkout revamp: one-page flow</p>
      <p className="mt-1 text-[11px] text-[#8b8b96]">Edited by Lena Ortiz · 3 linked issues</p>
      <p className="mt-4">
        Goal: cut checkout drop-off from 31% to under 20% by moving payment, address and summary onto one screen.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="hbl-pr-chip"><span className="hbl-pr-chip-dot text-[#ff6b3d]" />TMP-482 Apple Pay sheet</span>
        <span className="hbl-pr-chip"><span className="hbl-pr-chip-dot text-[#ffd166]" />TMP-490 Autocomplete</span>
      </div>
      <p className="mt-3">
        Success metric: conversion on mobile web, measured for two weeks after release<span className="hbl-pr-caret" aria-hidden="true" />
      </p>
    </div>
  );
}

function Board() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="min-w-0">
          <StatCard label="Sprint progress" value={68} suffix="%" delta={12} data={[12, 18, 22, 31, 38, 44, 52, 61, 68]} color="#ff6b3d" />
        </div>
        <div className="min-w-0">
          <StatCard label="Issues shipped" value={41} delta={9} data={[4, 9, 12, 18, 21, 27, 33, 36, 41]} color="#ffd166" />
        </div>
        <div className="hidden min-w-0 md:block">
          <StatCard label="On-time rate" value={94} suffix="%" delta={3} data={[86, 88, 87, 90, 89, 92, 93, 92, 94]} color="#ff6b3d" />
        </div>
      </div>
      <KanbanBoard columns={columns} color="#ff6b3d" newCardLabel="Untitled issue" style={{ ["--hb-kb-minw" as string]: "136px" }} />
    </div>
  );
}

export function HeroMockup() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const pressed = React.useRef(false);

  function reduced() {
    return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || pressed.current || reduced()) return;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.setProperty("--hbl-pr-rx", `${(-py * 5).toFixed(2)}deg`);
    tilt.style.setProperty("--hbl-pr-ry", `${(px * 7).toFixed(2)}deg`);
  }

  function handleLeave() {
    const tilt = tiltRef.current;
    if (!tilt) return;
    tilt.style.setProperty("--hbl-pr-rx", "0deg");
    tilt.style.setProperty("--hbl-pr-ry", "0deg");
  }

  function handlePress() {
    const tilt = tiltRef.current;
    if (!tilt) return;
    pressed.current = true;
    tilt.setAttribute("data-press", "");
    tilt.style.setProperty("--hbl-pr-rx", "0deg");
    tilt.style.setProperty("--hbl-pr-ry", "0deg");
    const release = () => {
      pressed.current = false;
      tilt.removeAttribute("data-press");
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  }

  return (
    <div
      ref={stageRef}
      className="hbl-pr-stage"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerDownCapture={handlePress}
    >
      <div className="hbl-pr-halo" aria-hidden="true" />
      <div ref={tiltRef} className="hbl-pr-tilt">
        <div className="hbl-pr-frame text-left">
          <div className="hbl-pr-chrome">
            <div className="hbl-pr-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="hbl-pr-url">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
              </svg>
              tempo.app/northwind/sprint-14
            </div>
            <div className="hidden items-center sm:flex" aria-hidden="true">
              {people.map((p, i) => (
                <span key={p.n} className="hbl-pr-avatar" style={{ background: p.c, marginLeft: i === 0 ? 0 : -6 }}>
                  {p.n}
                </span>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-[208px_minmax(0,1fr)] xl:grid-cols-[208px_minmax(0,1fr)_268px]">
            <div className="hidden lg:block">
              <SidebarNav
                groups={groups}
                defaultActive="sprint"
                width={208}
                color="#ff6b3d"
                brand={
                  <span className="flex items-center gap-2 text-[13px] font-medium">
                    <TempoMark size={20} />
                    Northwind
                  </span>
                }
                footer={
                  <div className="text-[11px] leading-snug text-[#8b8b96]">
                    <div className="mb-1.5 flex justify-between">
                      <span>Cycle 14 of 26</span>
                      <span className="text-[#f2f2f5]">6 days left</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="hbl-pr-bar-grow h-full w-[62%] rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ffd166]" />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="min-w-0 p-4 sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] text-[#8b8b96]">Mobile squad / Sprints</p>
                  <p className="hbl-pr-display truncate text-[18px] tracking-[-0.025em] text-[#f2f2f5]">Sprint 14 · Checkout revamp</p>
                </div>
                <span className="hbl-pr-chip">
                  <span className="hbl-pr-chip-dot text-[#7ee2b8]" />
                  On track
                </span>
              </div>
              <TabsUnderline
                color="#ff6b3d"
                tabs={[
                  { id: "board", label: "Board", count: 18, content: <Board /> },
                  { id: "timeline", label: "Timeline", content: <Timeline /> },
                  { id: "doc", label: "Spec", content: <DocPreview /> },
                ]}
              />
            </div>
            <div className="hidden border-l border-white/[0.08] p-4 xl:block">
              <p className="mb-3 flex items-center justify-between text-[12px] font-medium text-[#f2f2f5]">
                Activity
                <span className="text-[11px] font-normal text-[#8b8b96]">Today</span>
              </p>
              <ActivityFeed items={feed} color="#ff6b3d" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

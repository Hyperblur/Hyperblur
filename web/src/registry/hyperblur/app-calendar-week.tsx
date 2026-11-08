"use client";

import * as React from "react";

export interface AppWeekEvent {
  id: string;
  day: number;
  start: number;
  end: number;
  title: string;
  color?: string;
  location?: string;
}

export interface AppCalendarWeekProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  events?: AppWeekEvent[];
  defaultEvents?: AppWeekEvent[];
  onEventsChange?: (events: AppWeekEvent[]) => void;
  onEventChange?: (event: AppWeekEvent) => void;
  onEventOpen?: (event: AppWeekEvent) => void;
  onCreate?: (event: AppWeekEvent) => void;
  onWeekChange?: (direction: -1 | 0 | 1) => void;
  weekStart?: string;
  dayNames?: string[];
  today?: number;
  nowMinutes?: number;
  startHour?: number;
  endHour?: number;
  hourHeight?: number;
  snap?: number;
  accent?: string;
}

const palette: Record<string, string> = {
  blue: "#4c8dff",
  violet: "#9a7bff",
  emerald: "#34c78a",
  amber: "#f0b24a",
  coral: "#ff7a66",
  cyan: "#3cc6e0",
  pink: "#f36fb0",
};

const sampleEvents: AppWeekEvent[] = [
  { id: "e1", day: 0, start: 540, end: 570, title: "Standup", color: "blue", location: "Huddle" },
  { id: "e2", day: 0, start: 630, end: 720, title: "Design review: Billing v2", color: "violet", location: "Room 4B" },
  { id: "e3", day: 0, start: 810, end: 870, title: "1:1 with Priya", color: "emerald" },
  { id: "e4", day: 1, start: 540, end: 570, title: "Standup", color: "blue", location: "Huddle" },
  { id: "e5", day: 1, start: 600, end: 690, title: "Roadmap sync", color: "amber", location: "Zoom" },
  { id: "e6", day: 1, start: 645, end: 735, title: "Interview: Staff engineer", color: "coral", location: "Room 2A" },
  { id: "e7", day: 1, start: 900, end: 990, title: "Focus: pricing page copy", color: "cyan" },
  { id: "e8", day: 2, start: 540, end: 570, title: "Standup", color: "blue", location: "Huddle" },
  { id: "e9", day: 2, start: 720, end: 780, title: "Lunch with Marco", color: "pink", location: "Pellegrino's" },
  { id: "e10", day: 2, start: 840, end: 960, title: "Sprint planning", color: "violet", location: "Room 4B" },
  { id: "e11", day: 3, start: 540, end: 570, title: "Standup", color: "blue", location: "Huddle" },
  { id: "e12", day: 3, start: 660, end: 720, title: "Customer call: Lumen Bank", color: "emerald", location: "Zoom" },
  { id: "e13", day: 3, start: 930, end: 1020, title: "Release go/no-go", color: "coral" },
  { id: "e14", day: 4, start: 600, end: 660, title: "Analytics office hours", color: "cyan", location: "Room 1C" },
  { id: "e15", day: 4, start: 960, end: 1050, title: "Team demo + drinks", color: "amber", location: "Lounge" },
  { id: "e16", day: 5, start: 600, end: 690, title: "Climbing", color: "pink", location: "Boulder Lab" },
];

const daysIn = (y: number, m: number) => [31, (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function weekDates(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const out: { day: number; month: number; year: number }[] = [];
  let yy = y;
  let mm = m;
  let dd = d;
  for (let i = 0; i < 7; i++) {
    out.push({ day: dd, month: mm, year: yy });
    dd += 1;
    if (dd > daysIn(yy, mm)) {
      dd = 1;
      mm += 1;
      if (mm > 12) {
        mm = 1;
        yy += 1;
      }
    }
  }
  return out;
}

const fmt = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")}`;
};
const hourLabel = (h: number) => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "AM" : "PM"}`;
const tone = (c?: string) => (c && palette[c]) || c || palette.blue;

function layout(events: AppWeekEvent[]) {
  const pos = new Map<string, { lane: number; lanes: number }>();
  for (let day = 0; day < 7; day++) {
    const list = events.filter((e) => e.day === day).sort((a, b) => a.start - b.start || b.end - a.end);
    let cluster: AppWeekEvent[] = [];
    let laneEnds: number[] = [];
    let clusterEnd = -1;
    const flush = () => {
      for (const e of cluster) {
        const p = pos.get(e.id);
        if (p) p.lanes = laneEnds.length;
      }
      cluster = [];
      laneEnds = [];
    };
    for (const e of list) {
      if (e.start >= clusterEnd) flush();
      let lane = laneEnds.findIndex((end) => end <= e.start);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(e.end);
      } else laneEnds[lane] = e.end;
      pos.set(e.id, { lane, lanes: 1 });
      cluster.push(e);
      clusterEnd = Math.max(clusterEnd, e.end);
    }
    flush();
  }
  return pos;
}

const css = `
.hb-wj1 {
  --hb-wj1-a: #2f7bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: inherit;
  font-size: 13px;
  color: #ededed;
  background: linear-gradient(180deg, #121212, #0d0d0d);
  border: 1px solid #262626;
  border-radius: 16px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8);
  overflow: hidden;
  user-select: none;
  container-type: inline-size;
}
.hb-wj1 *, .hb-wj1 *::before, .hb-wj1 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj1-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px 12px; border-bottom: 1px solid #1f1f1f; }
.hb-wj1-title { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -0.015em; }
.hb-wj1-title span { color: #8f8f8f; font-weight: 500; }
.hb-wj1-sub { margin: 2px 0 0; font-size: 11.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wj1-nav { display: flex; align-items: center; gap: 6px; }
.hb-wj1-btn { display: inline-grid; place-items: center; height: 28px; min-width: 28px; padding: 0 10px; font: inherit; font-size: 12px; font-weight: 500; color: #d4d4d4; background: #171717; border: 1px solid #262626; border-radius: 8px; cursor: pointer; transition: background-color .15s ease, border-color .15s ease, color .15s ease; }
.hb-wj1-btn[data-icon="true"] { padding: 0; }
.hb-wj1-btn svg { width: 14px; height: 14px; }
.hb-wj1-btn:hover { background: #1e1e1e; border-color: #333; color: #fff; }
.hb-wj1-btn:focus-visible, .hb-wj1-ev:focus-visible, .hb-wj1-col:focus-visible { outline: 2px solid var(--hb-wj1-a); outline-offset: 1px; }
.hb-wj1-head { display: grid; grid-template-columns: 52px repeat(7, minmax(0, 1fr)); border-bottom: 1px solid #1f1f1f; background: rgba(255,255,255,0.012); }
.hb-wj1-dh { display: flex; align-items: baseline; justify-content: center; gap: 6px; padding: 9px 4px 8px; font-size: 11px; color: #8f8f8f; letter-spacing: 0.02em; text-transform: uppercase; }
.hb-wj1-dh b { display: inline-grid; place-items: center; min-width: 24px; height: 24px; padding: 0 5px; font-size: 13.5px; font-weight: 600; color: #ededed; letter-spacing: -0.01em; text-transform: none; border-radius: 999px; font-variant-numeric: tabular-nums; }
.hb-wj1-dh[data-today="true"] { color: var(--hb-wj1-a); }
.hb-wj1-dh[data-today="true"] b { color: #fff; background: var(--hb-wj1-a); box-shadow: 0 4px 14px -4px var(--hb-wj1-a); }
.hb-wj1-dh[data-weekend="true"] b { color: #a1a1a1; }
.hb-wj1-body { position: relative; display: grid; grid-template-columns: 52px minmax(0, 1fr); }
.hb-wj1-gutter { position: relative; }
.hb-wj1-hl { position: absolute; right: 8px; transform: translateY(-50%); font-size: 10px; color: #6f6f6f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wj1-now-label { position: absolute; right: 4px; transform: translateY(-50%); padding: 1px 5px; font-size: 10px; font-weight: 600; color: #fff; background: #ff5a4f; border-radius: 5px; font-variant-numeric: tabular-nums; }
.hb-wj1-grid { position: relative; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); background-image: repeating-linear-gradient(180deg, #1c1c1c 0 1px, transparent 1px var(--hb-wj1-hh)), repeating-linear-gradient(180deg, transparent 0 calc(var(--hb-wj1-hh) / 2), rgba(255,255,255,0.025) calc(var(--hb-wj1-hh) / 2) calc(var(--hb-wj1-hh) / 2 + 1px), transparent calc(var(--hb-wj1-hh) / 2 + 1px) var(--hb-wj1-hh)); }
.hb-wj1-col { position: relative; border-left: 1px solid #1c1c1c; cursor: copy; }
.hb-wj1-col[data-weekend="true"] { background: repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0 6px, transparent 6px 12px); }
.hb-wj1-col[data-today="true"] { background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wj1-a) 7%, transparent), transparent 70%); }
.hb-wj1-now { position: absolute; left: -1px; right: 0; height: 2px; background: #ff5a4f; z-index: 4; pointer-events: none; box-shadow: 0 0 10px rgba(255,90,79,0.5); }
.hb-wj1-now::before { content: ""; position: absolute; left: -4px; top: -3px; width: 8px; height: 8px; border-radius: 50%; background: #ff5a4f; }
.hb-wj1-ev {
  --c: #4c8dff;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px 7px 6px 9px;
  overflow: hidden;
  font-size: 11.5px;
  line-height: 1.25;
  color: color-mix(in srgb, var(--c) 30%, #ffffff);
  background: linear-gradient(180deg, color-mix(in srgb, var(--c) 24%, #141414), color-mix(in srgb, var(--c) 15%, #121212));
  border: 1px solid color-mix(in srgb, var(--c) 34%, transparent);
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset;
  cursor: grab;
  touch-action: none;
  transition: top .22s cubic-bezier(.2,.8,.2,1), height .22s cubic-bezier(.2,.8,.2,1), left .22s cubic-bezier(.2,.8,.2,1), box-shadow .2s ease, transform .2s ease;
}
.hb-wj1-ev::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--c); }
.hb-wj1-ev:hover { box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 6px 18px -10px var(--c); }
.hb-wj1-ev[data-selected="true"] { border-color: var(--c); box-shadow: 0 0 0 1px var(--c), 0 10px 24px -14px var(--c); z-index: 3; }
.hb-wj1-ev[data-dragging="true"] { z-index: 6; cursor: grabbing; transition: box-shadow .2s ease, transform .2s ease; transform: scale(1.02); box-shadow: 0 0 0 1px var(--c), 0 18px 36px -12px rgba(0,0,0,0.9), 0 8px 28px -14px var(--c); }
.hb-wj1-ev[data-new="true"] { animation: hb-wj1-pop .32s cubic-bezier(.2,1.4,.4,1) both; }
.hb-wj1-et { font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj1-em { font-size: 10.5px; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
.hb-wj1-grip { position: absolute; left: 0; right: 0; bottom: 0; height: 8px; cursor: ns-resize; }
.hb-wj1-grip::after { content: ""; position: absolute; left: 50%; bottom: 2px; width: 16px; height: 3px; margin-left: -8px; border-radius: 3px; background: currentColor; opacity: 0; transition: opacity .15s ease; }
.hb-wj1-ev:hover .hb-wj1-grip::after, .hb-wj1-ev[data-selected="true"] .hb-wj1-grip::after { opacity: 0.55; }
.hb-wj1-tip { position: absolute; z-index: 8; left: 50%; top: -24px; transform: translateX(-50%); padding: 2px 7px; font-size: 10.5px; font-weight: 600; color: #0a0a0a; background: #fff; border-radius: 6px; white-space: nowrap; pointer-events: none; font-variant-numeric: tabular-nums; box-shadow: 0 6px 16px -6px rgba(0,0,0,0.7); }
.hb-wj1-ghost { position: absolute; z-index: 1; border: 1px dashed color-mix(in srgb, var(--c) 60%, transparent); border-radius: 8px; background: color-mix(in srgb, var(--c) 6%, transparent); pointer-events: none; }
.hb-wj1-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-wj1-pop { from { opacity: 0; transform: scale(.9); } to { opacity: 1; transform: none; } }
@container (max-width: 520px) {
  .hb-wj1-dh { flex-direction: column; align-items: center; gap: 2px; font-size: 9.5px; }
  .hb-wj1-em { display: none; }
  .hb-wj1-ev { padding: 3px 4px 4px 6px; font-size: 10.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wj1-ev, .hb-wj1-btn { transition: none; animation: none; }
  .hb-wj1-ev[data-dragging="true"] { transform: none; }
}
`;

type Drag = { id: string; mode: "move" | "resize"; x0: number; y0: number; day0: number; start0: number; end0: number; moved: boolean };

export function AppCalendarWeek({
  events,
  defaultEvents = sampleEvents,
  onEventsChange,
  onEventChange,
  onEventOpen,
  onCreate,
  onWeekChange,
  weekStart = "2026-11-09",
  dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  today = 1,
  nowMinutes = 652,
  startHour = 8,
  endHour = 19,
  hourHeight = 44,
  snap = 15,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: AppCalendarWeekProps) {
  const [inner, setInner] = React.useState(defaultEvents);
  const list = events ?? inner;
  const [selected, setSelected] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<{ id: string; day: number; start: number; end: number } | null>(null);
  const [fresh, setFresh] = React.useState<string | null>(null);
  const [announce, setAnnounce] = React.useState("");
  const drag = React.useRef<Drag | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const counter = React.useRef(0);

  const minT = startHour * 60;
  const maxT = endHour * 60;
  const pxPerMin = hourHeight / 60;
  const dates = React.useMemo(() => weekDates(weekStart), [weekStart]);
  const first = dates[0];
  const last = dates[6];
  const range = first.month === last.month ? `${months[first.month - 1].slice(0, 3)} ${first.day} – ${last.day}` : `${months[first.month - 1].slice(0, 3)} ${first.day} – ${months[last.month - 1].slice(0, 3)} ${last.day}`;

  const shown = React.useMemo(() => (preview ? list.map((e) => (e.id === preview.id ? { ...e, ...preview } : e)) : list), [list, preview]);
  const pos = React.useMemo(() => layout(shown), [shown]);
  const hours = React.useMemo(() => Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i), [startHour, endHour]);

  const commit = (next: AppWeekEvent[], changed?: AppWeekEvent) => {
    if (events === undefined) setInner(next);
    onEventsChange?.(next);
    if (changed) {
      onEventChange?.(changed);
      setAnnounce(`${changed.title} moved to ${dayNames[changed.day]}, ${fmt(changed.start)} to ${fmt(changed.end)}`);
    }
  };

  const update = (id: string, patch: Partial<AppWeekEvent>) => {
    let changed: AppWeekEvent | undefined;
    const next = list.map((e) => {
      if (e.id !== id) return e;
      changed = { ...e, ...patch };
      return changed;
    });
    commit(next, changed);
  };

  const down = (e: React.PointerEvent<HTMLDivElement>, ev: AppWeekEvent, mode: "move" | "resize") => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: ev.id, mode, x0: e.clientX, y0: e.clientY, day0: ev.day, start0: ev.start, end0: ev.end, moved: false };
    setSelected(ev.id);
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 4) return;
    d.moved = true;
    const colW = (gridRef.current?.clientWidth ?? 700) / 7;
    const dMin = Math.round(dy / pxPerMin / snap) * snap;
    if (d.mode === "move") {
      const dur = d.end0 - d.start0;
      const day = Math.min(6, Math.max(0, d.day0 + Math.round(dx / colW)));
      const start = Math.min(maxT - dur, Math.max(minT, d.start0 + dMin));
      setPreview({ id: d.id, day, start, end: start + dur });
    } else {
      const end = Math.min(maxT, Math.max(d.start0 + snap, d.end0 + dMin));
      setPreview({ id: d.id, day: d.day0, start: d.start0, end });
    }
  };

  const up = (ev: AppWeekEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved && preview && preview.id === d.id) {
      if (preview.day !== d.day0 || preview.start !== d.start0 || preview.end !== d.end0) update(d.id, { day: preview.day, start: preview.start, end: preview.end });
    } else if (!d.moved) onEventOpen?.(ev);
    setPreview(null);
  };

  const key = (e: React.KeyboardEvent<HTMLDivElement>, ev: AppWeekEvent) => {
    const dur = ev.end - ev.start;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEventOpen?.(ev);
      return;
    }
    if (e.key === "Escape") {
      setSelected(null);
      return;
    }
    let patch: Partial<AppWeekEvent> | null = null;
    if (e.shiftKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      const end = Math.min(maxT, Math.max(ev.start + snap, ev.end + (e.key === "ArrowDown" ? snap : -snap)));
      patch = { end };
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const start = Math.min(maxT - dur, Math.max(minT, ev.start + (e.key === "ArrowDown" ? snap : -snap)));
      patch = { start, end: start + dur };
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      patch = { day: Math.min(6, Math.max(0, ev.day + (e.key === "ArrowRight" ? 1 : -1))) };
    }
    if (patch) {
      e.preventDefault();
      update(ev.id, patch);
    }
  };

  const create = (e: React.MouseEvent<HTMLDivElement>, day: number) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const raw = minT + (e.clientY - rect.top) / pxPerMin;
    const start = Math.min(maxT - 60, Math.max(minT, Math.floor(raw / 30) * 30));
    counter.current += 1;
    const ev: AppWeekEvent = { id: `new-${counter.current}`, day, start, end: start + 60, title: "New event", color: "blue" };
    commit([...list, ev]);
    setSelected(ev.id);
    setFresh(ev.id);
    onCreate?.(ev);
  };

  const count = list.length;
  const busy = list.reduce((s, e) => s + (e.end - e.start), 0);

  return (
    <div className={["hb-wj1", className].filter(Boolean).join(" ")} style={{ "--hb-wj1-a": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-calendar-week" precedence="default">{css}</style>
      <div className="hb-wj1-top">
        <div>
          <h3 className="hb-wj1-title">
            {months[first.month - 1]} <span>{first.year}</span>
          </h3>
          <p className="hb-wj1-sub">
            {range} · {count} events · {(busy / 60).toFixed(1)} h booked
          </p>
        </div>
        <div className="hb-wj1-nav">
          <button type="button" className="hb-wj1-btn" onClick={() => onWeekChange?.(0)}>
            Today
          </button>
          <button type="button" className="hb-wj1-btn" data-icon="true" aria-label="Previous week" onClick={() => onWeekChange?.(-1)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
          </button>
          <button type="button" className="hb-wj1-btn" data-icon="true" aria-label="Next week" onClick={() => onWeekChange?.(1)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
          </button>
        </div>
      </div>
      <div className="hb-wj1-head">
        <div />
        {dates.map((d, i) => (
          <div key={i} className="hb-wj1-dh" data-today={i === today} data-weekend={i >= 5}>
            {dayNames[i]} <b>{d.day}</b>
          </div>
        ))}
      </div>
      <div className="hb-wj1-body" style={{ height: (maxT - minT) * pxPerMin + 12, paddingTop: 6 }}>
        <div className="hb-wj1-gutter">
          {hours.map((h) => (
            <span key={h} className="hb-wj1-hl" style={{ top: (h * 60 - minT) * pxPerMin }}>
              {h === endHour ? "" : hourLabel(h)}
            </span>
          ))}
          {today >= 0 && today < 7 && nowMinutes > minT && nowMinutes < maxT && (
            <span className="hb-wj1-now-label" style={{ top: (nowMinutes - minT) * pxPerMin }}>
              {fmt(nowMinutes)}
            </span>
          )}
        </div>
        <div ref={gridRef} className="hb-wj1-grid" style={{ "--hb-wj1-hh": `${hourHeight}px`, height: (maxT - minT) * pxPerMin } as React.CSSProperties}>
          {dates.map((_, day) => (
            <div key={day} className="hb-wj1-col" data-today={day === today} data-weekend={day >= 5} onClick={(e) => create(e, day)} role="presentation">
              {day === today && nowMinutes > minT && nowMinutes < maxT && <div className="hb-wj1-now" style={{ top: (nowMinutes - minT) * pxPerMin }} />}
              {preview && (() => {
                const orig = list.find((x) => x.id === preview.id);
                if (!orig || orig.day !== day) return null;
                return <div className="hb-wj1-ghost" style={{ "--c": tone(orig.color), top: (orig.start - minT) * pxPerMin, height: (orig.end - orig.start) * pxPerMin - 2, left: 2, right: 4 } as React.CSSProperties} />;
              })()}
              {shown
                .filter((ev) => ev.day === day)
                .map((ev) => {
                  const p = pos.get(ev.id) ?? { lane: 0, lanes: 1 };
                  const w = 100 / p.lanes;
                  const h = (ev.end - ev.start) * pxPerMin - 2;
                  const dragging = preview?.id === ev.id;
                  return (
                    <div
                      key={ev.id}
                      className="hb-wj1-ev"
                      role="button"
                      tabIndex={0}
                      aria-label={`${ev.title}, ${dayNames[ev.day]} ${fmt(ev.start)} to ${fmt(ev.end)}${ev.location ? `, ${ev.location}` : ""}. Arrow keys move, Shift and arrows resize.`}
                      data-selected={selected === ev.id}
                      data-dragging={dragging}
                      data-new={fresh === ev.id}
                      style={{ "--c": tone(ev.color), top: (ev.start - minT) * pxPerMin, height: h, left: `calc(${(p.lane * w).toFixed(3)}% + 2px)`, width: `calc(${w.toFixed(3)}% - ${p.lanes > 1 ? 3 : 6}px)` } as React.CSSProperties}
                      onPointerDown={(e) => down(e, ev, "move")}
                      onPointerMove={move}
                      onPointerUp={() => up(ev)}
                      onPointerCancel={() => {
                        drag.current = null;
                        setPreview(null);
                      }}
                      onFocus={() => setSelected(ev.id)}
                      onKeyDown={(e) => key(e, ev)}
                    >
                      {dragging && <span className="hb-wj1-tip">{`${dayNames[ev.day]} ${fmt(ev.start)} – ${fmt(ev.end)}`}</span>}
                      <span className="hb-wj1-et">{ev.title}</span>
                      {h > 26 && <span className="hb-wj1-em">{`${fmt(ev.start)} – ${fmt(ev.end)}`}</span>}
                      {h > 52 && ev.location && <span className="hb-wj1-em">{ev.location}</span>}
                      <div className="hb-wj1-grip" onPointerDown={(e) => down(e, ev, "resize")} onPointerMove={move} onPointerUp={() => up(ev)} aria-hidden="true" />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
      <span className="hb-wj1-live" aria-live="polite">{announce}</span>
    </div>
  );
}

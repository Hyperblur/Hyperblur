"use client";

import * as React from "react";

export interface AppCalendarEvent {
  id: string;
  date: string;
  title: string;
  time?: string;
  end?: string;
  color?: string;
  calendar?: string;
  location?: string;
  people?: string[];
}

export interface AppCalendarMonthProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  events?: AppCalendarEvent[];
  today?: string;
  defaultMonth?: string;
  weekStartsOn?: 0 | 1;
  accent?: string;
  onMonthChange?: (month: string) => void;
  onDateSelect?: (date: string) => void;
  onEventOpen?: (event: AppCalendarEvent) => void;
  onCreateEvent?: (date: string) => void;
}

const colors: Record<string, string> = {
  blue: "#2f7bff",
  violet: "#9b6bff",
  emerald: "#22c08a",
  amber: "#f2a93b",
  coral: "#ff6f5e",
  cyan: "#22b8d6",
  pink: "#ec5f9c",
};

const defaultEvents: AppCalendarEvent[] = [
  { id: "e1", date: "2026-11-02", time: "09:30", end: "10:00", title: "Weekly planning", color: "blue", calendar: "Team", location: "Room Atlas", people: ["Maya Okafor", "Lena Park", "Diego Ramos"] },
  { id: "e2", date: "2026-11-03", time: "14:00", end: "15:00", title: "Design critique", color: "violet", calendar: "Design", location: "Video call", people: ["Amara Chen", "Maya Okafor"] },
  { id: "e3", date: "2026-11-04", time: "10:00", end: "10:45", title: "Pricing review", color: "amber", calendar: "Growth", location: "Room Lisbon", people: ["Tom Whitaker", "Lena Park", "Maya Okafor"] },
  { id: "e4", date: "2026-11-04", time: "13:00", end: "14:00", title: "Lunch with Sofia", color: "emerald", calendar: "Personal", location: "Taberna Sal", people: ["Sofia Lind"] },
  { id: "e5", date: "2026-11-04", time: "16:30", end: "17:00", title: "1:1 with Diego", color: "blue", calendar: "Team", location: "Video call", people: ["Diego Ramos"] },
  { id: "e6", date: "2026-11-04", time: "18:00", end: "19:00", title: "Climbing", color: "coral", calendar: "Personal", location: "Bloc Lab" },
  { id: "e7", date: "2026-11-06", time: "11:00", end: "12:00", title: "Customer call: Arcadia", color: "cyan", calendar: "Sales", location: "Video call", people: ["Kenji Mori", "Maya Okafor"] },
  { id: "e8", date: "2026-11-09", time: "09:30", end: "10:00", title: "Weekly planning", color: "blue", calendar: "Team", location: "Room Atlas" },
  { id: "e9", date: "2026-11-11", time: "15:00", end: "16:30", title: "Brand workshop", color: "violet", calendar: "Design", location: "Studio 2", people: ["Sofia Lind", "Amara Chen"] },
  { id: "e10", date: "2026-11-12", title: "v2.15 release", color: "emerald", calendar: "Product" },
  { id: "e11", date: "2026-11-13", time: "19:30", end: "22:00", title: "Team dinner", color: "coral", calendar: "Team", location: "Cervejaria Ramiro" },
  { id: "e12", date: "2026-11-16", time: "09:30", end: "10:00", title: "Weekly planning", color: "blue", calendar: "Team", location: "Room Atlas" },
  { id: "e13", date: "2026-11-18", time: "10:00", end: "17:00", title: "Offsite day one", color: "amber", calendar: "Team", location: "Sintra" },
  { id: "e14", date: "2026-11-19", time: "10:00", end: "15:00", title: "Offsite day two", color: "amber", calendar: "Team", location: "Sintra" },
  { id: "e15", date: "2026-11-20", time: "12:00", end: "13:00", title: "Board update", color: "cyan", calendar: "Company", location: "Video call" },
  { id: "e16", date: "2026-11-23", time: "09:30", end: "10:00", title: "Weekly planning", color: "blue", calendar: "Team" },
  { id: "e17", date: "2026-11-25", time: "14:00", end: "15:00", title: "Hiring panel", color: "pink", calendar: "Hiring", location: "Room Porto" },
  { id: "e18", date: "2026-11-27", title: "Mom's birthday", color: "emerald", calendar: "Personal" },
  { id: "e19", date: "2026-11-30", time: "09:30", end: "10:00", title: "Weekly planning", color: "blue", calendar: "Team" },
  { id: "e20", date: "2026-10-27", time: "11:00", end: "12:00", title: "Roadmap review", color: "violet", calendar: "Product" },
  { id: "e21", date: "2026-10-30", time: "17:00", end: "18:00", title: "Halloween demo day", color: "coral", calendar: "Team" },
  { id: "e22", date: "2026-12-02", time: "10:00", end: "11:00", title: "Q1 kickoff prep", color: "amber", calendar: "Growth" },
  { id: "e23", date: "2026-12-08", time: "14:00", end: "15:00", title: "Design critique", color: "violet", calendar: "Design" },
  { id: "e24", date: "2026-12-18", time: "18:00", end: "23:00", title: "Holiday party", color: "pink", calendar: "Company", location: "LX Factory" },
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const palette = ["#2f7bff", "#9b6bff", "#ff7a59", "#22b07d", "#e0a526", "#e5508a"];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function key(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function parse(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: (m || 1) - 1, d: d || 1 };
}
function daysIn(y: number, m: number) {
  return [31, (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
}
function weekday(y: number, m: number, d: number) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yy = m < 2 ? y - 1 : y;
  return (yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) + t[m] + d) % 7;
}
function shift(s: string, days: number) {
  let { y, m, d } = parse(s);
  d += days;
  while (d < 1) {
    m -= 1;
    if (m < 0) { m = 11; y -= 1; }
    d += daysIn(y, m);
  }
  while (d > daysIn(y, m)) {
    d -= daysIn(y, m);
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return key(y, m, d);
}
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h >>> 0;
}
function fmtTime(t?: string) {
  if (!t) return "All day";
  const [h, mm] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return mm ? `${hh}:${pad(mm)}${suffix}` : `${hh}${suffix}`;
}
function colorOf(c?: string) {
  if (!c) return colors.blue;
  return colors[c] ?? c;
}
function longDate(s: string) {
  const { y, m, d } = parse(s);
  return `${dayNames[weekday(y, m, d)]}, ${monthNames[m].slice(0, 3)} ${d}`;
}

const css = `
.hb-ye3 {
  --hb-ye3-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
}
.hb-ye3 *, .hb-ye3 *::before, .hb-ye3 *::after { box-sizing: border-box; }
.hb-ye3-shell { display: grid; grid-template-columns: 1fr; min-height: 600px; }
.hb-ye3-main { display: flex; flex-direction: column; min-width: 0; padding: 18px; }
.hb-ye3-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 14px; }
.hb-ye3-title { margin: 0 auto 0 0; font-size: 20px; font-weight: 600; letter-spacing: -.015em; }
.hb-ye3-title span { color: #737373; font-weight: 400; }
.hb-ye3-nav { display: flex; align-items: center; gap: 2px; padding: 3px; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; background: #101010; }
.hb-ye3-ib { display: inline-grid; place-items: center; min-width: 30px; height: 28px; margin: 0; padding: 0 9px; border: 0; border-radius: 7px; background: transparent; color: #d4d4d4; font: inherit; font-size: 13px; cursor: pointer; }
.hb-ye3-ib:hover { background: #1c1c1c; color: #fff; }
.hb-ye3-ib svg { width: 16px; height: 16px; }
.hb-ye3-ib:focus-visible, .hb-ye3-day:focus-visible, .hb-ye3-chip:focus-visible, .hb-ye3-btn:focus-visible, .hb-ye3-ag:focus-visible { outline: 2px solid var(--hb-ye3-accent); outline-offset: 1px; }
.hb-ye3-btn { display: inline-flex; align-items: center; gap: 6px; height: 34px; margin: 0; padding: 0 12px; border: 1px solid transparent; border-radius: 9px; background: var(--hb-ye3-accent); color: #fff; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-ye3-btn:hover { filter: brightness(1.1); }
.hb-ye3-btn svg { width: 15px; height: 15px; }
.hb-ye3-btn[data-tone="ghost"] { border-color: #262626; background: #141414; color: #ededed; font-weight: 500; }
.hb-ye3-wk { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border: 1px solid rgba(255,255,255,.08); border-bottom: 0; border-radius: 12px 12px 0 0; background: #0f0f0f; }
.hb-ye3-wk span { padding: 8px 10px; color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; }
.hb-ye3-gridwrap { position: relative; flex: 1; display: flex; min-height: 0; border: 1px solid rgba(255,255,255,.08); border-radius: 0 0 12px 12px; overflow: hidden; }
.hb-ye3-grid { flex: 1; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-auto-rows: minmax(76px, 1fr); }
.hb-ye3-grid[data-dir="1"] { animation: hb-ye3-from-r .38s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye3-grid[data-dir="-1"] { animation: hb-ye3-from-l .38s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye3-cell { position: relative; display: flex; flex-direction: column; gap: 3px; min-width: 0; padding: 6px; border-right: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06); background: #0a0a0a; transition: background-color .15s ease; }
.hb-ye3-cell:nth-child(7n) { border-right: 0; }
.hb-ye3-cell[data-out="true"] { background: #0c0c0c; }
.hb-ye3-cell[data-out="true"] .hb-ye3-day { color: #4a4a4a; }
.hb-ye3-cell[data-weekend="true"] { background: #0c0c0c; }
.hb-ye3-cell[data-selected="true"] { background: color-mix(in srgb, var(--hb-ye3-accent) 7%, #0a0a0a); }
.hb-ye3-cell:hover { background: #101010; }
.hb-ye3-day { align-self: flex-start; display: grid; place-items: center; min-width: 26px; height: 26px; margin: 0; padding: 0 6px; border: 0; border-radius: 999px; background: transparent; color: #a1a1a1; font: inherit; font-size: 12.5px; font-weight: 500; font-variant-numeric: tabular-nums; cursor: pointer; }
.hb-ye3-day:hover { background: #1c1c1c; color: #fff; }
.hb-ye3-cell[data-selected="true"] .hb-ye3-day { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-ye3-accent) 60%, transparent); color: #fff; }
.hb-ye3-cell[data-today="true"] .hb-ye3-day { background: var(--hb-ye3-accent); color: #fff; font-weight: 700; box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ye3-accent) 25%, transparent); }
.hb-ye3-chip { display: flex; align-items: center; gap: 5px; width: 100%; min-width: 0; margin: 0; padding: 2px 6px 2px 5px; border: 0; border-radius: 5px; background: color-mix(in srgb, var(--c) 16%, transparent); color: color-mix(in srgb, var(--c) 55%, #fff); font: inherit; font-size: 11.5px; text-align: left; cursor: pointer; box-shadow: inset 2px 0 0 var(--c); transition: background-color .15s ease, transform .15s ease; }
.hb-ye3-chip:hover { background: color-mix(in srgb, var(--c) 26%, transparent); }
.hb-ye3-chip[aria-expanded="true"] { background: var(--c); color: #fff; }
.hb-ye3-chip b { flex: none; font-weight: 500; opacity: .75; font-variant-numeric: tabular-nums; }
.hb-ye3-chip span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye3-more { padding: 0 6px; color: #8f8f8f; font-size: 11px; }
.hb-ye3-pop { position: absolute; z-index: 5; width: 260px; padding: 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: #171717; box-shadow: 0 22px 50px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05); animation: hb-ye3-pop .18s cubic-bezier(.2,.9,.2,1) both; }
.hb-ye3-pop:focus { outline: none; }
.hb-ye3-pop-head { display: flex; gap: 10px; align-items: flex-start; }
.hb-ye3-pop-bar { width: 4px; align-self: stretch; flex: none; border-radius: 4px; background: var(--c); }
.hb-ye3-pop-title { flex: 1; font-size: 15px; font-weight: 600; line-height: 1.3; }
.hb-ye3-pop-row { display: flex; align-items: center; gap: 8px; margin-top: 9px; color: #a1a1a1; font-size: 12.5px; }
.hb-ye3-pop-row svg { width: 14px; height: 14px; flex: none; color: #737373; }
.hb-ye3-people { display: flex; margin-top: 12px; }
.hb-ye3-av { display: grid; place-items: center; width: 24px; height: 24px; margin-left: -6px; border: 2px solid #171717; border-radius: 999px; color: #fff; font-size: 9.5px; font-weight: 700; }
.hb-ye3-av:first-child { margin-left: 0; }
.hb-ye3-pop-actions { display: flex; gap: 6px; margin-top: 14px; }
.hb-ye3-pop-actions .hb-ye3-btn { height: 30px; flex: 1; justify-content: center; }
.hb-ye3-side { display: none; flex-direction: column; gap: 18px; min-width: 0; padding: 18px; border-left: 1px solid rgba(255,255,255,.08); background: #0d0d0d; }
.hb-ye3-side-h { display: flex; align-items: baseline; justify-content: space-between; }
.hb-ye3-side-day { font-size: 15px; font-weight: 600; }
.hb-ye3-side-n { color: #737373; font-size: 12px; }
.hb-ye3-agenda { display: flex; flex-direction: column; gap: 6px; }
.hb-ye3-ag { display: grid; grid-template-columns: 4px 1fr; gap: 10px; width: 100%; margin: 0; padding: 9px 10px; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; background: #121212; color: inherit; font: inherit; text-align: left; cursor: pointer; animation: hb-ye3-rise .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye3-ag:hover { border-color: rgba(255,255,255,.12); background: #151515; }
.hb-ye3-ag i { border-radius: 4px; background: var(--c); }
.hb-ye3-ag-t { font-size: 13px; font-weight: 500; }
.hb-ye3-ag-m { color: #8f8f8f; font-size: 12px; }
.hb-ye3-none { padding: 14px; border: 1px dashed #262626; border-radius: 10px; color: #737373; font-size: 12.5px; text-align: center; }
.hb-ye3-label { color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-ye3-cals { display: flex; flex-direction: column; gap: 7px; }
.hb-ye3-cal { display: flex; align-items: center; gap: 9px; color: #d4d4d4; font-size: 13px; }
.hb-ye3-cal i { width: 10px; height: 10px; border-radius: 3px; background: var(--c); }
.hb-ye3-cal span { margin-left: auto; color: #737373; font-size: 12px; font-variant-numeric: tabular-nums; }
@keyframes hb-ye3-from-r { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye3-from-l { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye3-pop { from { opacity: 0; transform: var(--t) translateY(4px) scale(.97); } to { opacity: 1; transform: var(--t); } }
@keyframes hb-ye3-rise { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
.hb-ye3-pop { transform: var(--t); }
@container (max-width: 560px) {
  .hb-ye3-chip b, .hb-ye3-wk span { font-size: 10px; }
  .hb-ye3-chip span { display: none; }
  .hb-ye3-chip { height: 6px; padding: 0; }
  .hb-ye3-grid { grid-auto-rows: minmax(58px, 1fr); }
  .hb-ye3-pop { width: 220px; }
}
@container (min-width: 820px) {
  .hb-ye3-shell { grid-template-columns: 1fr 268px; }
  .hb-ye3-side { display: flex; }
  .hb-ye3-main { padding: 20px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye3 *, .hb-ye3 *::before, .hb-ye3 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function AppCalendarMonth({
  events = defaultEvents,
  today = "2026-11-04",
  defaultMonth,
  weekStartsOn = 1,
  accent = "#2f7bff",
  onMonthChange,
  onDateSelect,
  onEventOpen,
  onCreateEvent,
  className,
  style,
  ...rest
}: AppCalendarMonthProps) {
  const start = parse(defaultMonth ? `${defaultMonth}-01` : today);
  const [month, setMonth] = React.useState({ y: start.y, m: start.m });
  const [dir, setDir] = React.useState(0);
  const [selected, setSelected] = React.useState(today);
  const [openEvent, setOpenEvent] = React.useState<string | null>(null);
  const dayRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const chipRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const popRef = React.useRef<HTMLDivElement>(null);
  const pendingFocus = React.useRef<string | null>(null);

  const byDate = React.useMemo(() => {
    const map = new Map<string, AppCalendarEvent[]>();
    for (const e of events) {
      const list = map.get(e.date) ?? [];
      list.push(e);
      map.set(e.date, list);
    }
    for (const list of map.values()) list.sort((a, b) => (a.time ?? "00:00").localeCompare(b.time ?? "00:00"));
    return map;
  }, [events]);

  const cells = React.useMemo(() => {
    const lead = (weekday(month.y, month.m, 1) - weekStartsOn + 7) % 7;
    const total = Math.ceil((lead + daysIn(month.y, month.m)) / 7) * 7;
    const first = shift(key(month.y, month.m, 1), -lead);
    return Array.from({ length: total }, (_, i) => shift(first, i));
  }, [month, weekStartsOn]);

  React.useEffect(() => {
    if (pendingFocus.current) {
      dayRefs.current.get(pendingFocus.current)?.focus();
      pendingFocus.current = null;
    }
  });

  React.useEffect(() => {
    if (!openEvent) return;
    popRef.current?.focus();
    const close = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (popRef.current?.contains(t) || t.closest?.("[data-hb-ye3-chip]")) return;
      setOpenEvent(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [openEvent]);

  const goMonth = (delta: number, focusDate?: string) => {
    let m = month.m + delta;
    let y = month.y;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setDir(delta > 0 ? 1 : -1);
    setMonth({ y, m });
    setOpenEvent(null);
    onMonthChange?.(`${y}-${pad(m + 1)}`);
    if (focusDate) pendingFocus.current = focusDate;
  };

  const goToday = () => {
    const t = parse(today);
    const delta = (t.y - month.y) * 12 + (t.m - month.m);
    if (delta !== 0) {
      setDir(delta > 0 ? 1 : -1);
      setMonth({ y: t.y, m: t.m });
      onMonthChange?.(`${t.y}-${pad(t.m + 1)}`);
    }
    setSelected(today);
    setOpenEvent(null);
  };

  const select = (date: string) => {
    setSelected(date);
    onDateSelect?.(date);
    const p = parse(date);
    if (p.m !== month.m || p.y !== month.y) goMonth((p.y - month.y) * 12 + (p.m - month.m) > 0 ? 1 : -1, date);
  };

  const onDayKey = (e: React.KeyboardEvent, date: string) => {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in step) {
      e.preventDefault();
      const next = shift(date, step[e.key]);
      setSelected(next);
      onDateSelect?.(next);
      const p = parse(next);
      if (p.m !== month.m || p.y !== month.y) goMonth(step[e.key] > 0 ? 1 : -1, next);
      else pendingFocus.current = next;
    } else if (e.key === "PageDown" || e.key === "PageUp") {
      e.preventDefault();
      goMonth(e.key === "PageDown" ? 1 : -1);
    }
  };

  const openChip = (ev: AppCalendarEvent) => {
    setOpenEvent(openEvent === ev.id ? null : ev.id);
    if (openEvent !== ev.id) onEventOpen?.(ev);
  };

  const closePop = () => {
    const id = openEvent;
    setOpenEvent(null);
    if (id) chipRefs.current.get(id)?.focus();
  };

  const rows = cells.length / 7;
  const popIndex = openEvent ? cells.findIndex((c) => byDate.get(c)?.some((e) => e.id === openEvent)) : -1;
  const popEvent = openEvent ? events.find((e) => e.id === openEvent) : undefined;
  let popStyle: React.CSSProperties | undefined;
  if (popIndex >= 0) {
    const col = popIndex % 7;
    const row = Math.floor(popIndex / 7);
    const right = col >= 4;
    const low = row >= rows - 2;
    popStyle = {
      left: right ? `calc(${((col / 7) * 100).toFixed(3)}% - 6px)` : `calc(${(((col + 1) / 7) * 100).toFixed(3)}% + 6px)`,
      top: low ? `calc(${(((row + 1) / rows) * 100).toFixed(3)}% - 6px)` : `calc(${((row / rows) * 100).toFixed(3)}% + 6px)`,
      "--t": `translate(${right ? "-100%" : "0"}, ${low ? "-100%" : "0"})`,
      "--c": colorOf(popEvent?.color),
    } as React.CSSProperties;
  }

  const order = weekStartsOn === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6];
  const dayEvents = byDate.get(selected) ?? [];
  const upcoming = events.filter((e) => e.date > selected).sort((a, b) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? ""))).slice(0, 4);
  const monthPrefix = `${month.y}-${pad(month.m + 1)}`;
  const calCounts = new Map<string, { color: string; n: number }>();
  for (const e of events) {
    if (!e.date.startsWith(monthPrefix)) continue;
    const name = e.calendar ?? "Calendar";
    const c = calCounts.get(name) ?? { color: colorOf(e.color), n: 0 };
    c.n += 1;
    calCounts.set(name, c);
  }

  return (
    <div className={["hb-ye3", className].filter(Boolean).join(" ")} style={{ "--hb-ye3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-calendar-month" precedence="default">{css}</style>
      <div className="hb-ye3-shell">
        <section className="hb-ye3-main" aria-label="Month calendar">
          <div className="hb-ye3-bar">
            <h2 className="hb-ye3-title" aria-live="polite">{monthNames[month.m]} <span>{month.y}</span></h2>
            <button type="button" className="hb-ye3-btn" data-tone="ghost" onClick={goToday}>Today</button>
            <div className="hb-ye3-nav">
              <button type="button" className="hb-ye3-ib" aria-label="Previous month" onClick={() => goMonth(-1)}><Icon d="M15 18l-6-6 6-6" /></button>
              <button type="button" className="hb-ye3-ib" aria-label="Next month" onClick={() => goMonth(1)}><Icon d="M9 6l6 6-6 6" /></button>
            </div>
            <button type="button" className="hb-ye3-btn" onClick={() => onCreateEvent?.(selected)}><Icon d="M12 5v14M5 12h14" />New event</button>
          </div>
          <div className="hb-ye3-wk" aria-hidden="true">
            {order.map((d) => <span key={d}>{dayNames[d].slice(0, 3)}</span>)}
          </div>
          <div className="hb-ye3-gridwrap">
            <div className="hb-ye3-grid" key={monthPrefix} data-dir={dir} role="grid" aria-label={`${monthNames[month.m]} ${month.y}`}>
              {Array.from({ length: rows }, (_, r) => (
                <div role="row" key={r} style={{ display: "contents" }}>
                  {cells.slice(r * 7, r * 7 + 7).map((date) => {
                    const p = parse(date);
                    const list = byDate.get(date) ?? [];
                    const wd = weekday(p.y, p.m, p.d);
                    const shown = list.slice(0, rows > 5 ? 2 : 3);
                    return (
                      <div
                        key={date}
                        role="gridcell"
                        className="hb-ye3-cell"
                        data-out={p.m !== month.m}
                        data-today={date === today}
                        data-selected={date === selected}
                        data-weekend={wd === 0 || wd === 6}
                        aria-selected={date === selected}
                      >
                        <button
                          type="button"
                          className="hb-ye3-day"
                          ref={(el) => { if (el) dayRefs.current.set(date, el); else dayRefs.current.delete(date); }}
                          tabIndex={date === selected ? 0 : -1}
                          aria-label={`${longDate(date)}${list.length ? `, ${list.length} event${list.length > 1 ? "s" : ""}` : ""}`}
                          aria-current={date === today ? "date" : undefined}
                          onClick={() => select(date)}
                          onKeyDown={(e) => onDayKey(e, date)}
                        >
                          {p.d}
                        </button>
                        {shown.map((ev) => (
                          <button
                            key={ev.id}
                            type="button"
                            data-hb-ye3-chip=""
                            ref={(el) => { if (el) chipRefs.current.set(ev.id, el); else chipRefs.current.delete(ev.id); }}
                            className="hb-ye3-chip"
                            style={{ "--c": colorOf(ev.color) } as React.CSSProperties}
                            aria-haspopup="dialog"
                            aria-expanded={openEvent === ev.id}
                            aria-label={`${ev.title}, ${fmtTime(ev.time)}`}
                            onClick={() => openChip(ev)}
                          >
                            {ev.time && <b>{fmtTime(ev.time)}</b>}
                            <span>{ev.title}</span>
                          </button>
                        ))}
                        {list.length > shown.length && <span className="hb-ye3-more">+{list.length - shown.length} more</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {popEvent && popStyle && (
              <div
                ref={popRef}
                className="hb-ye3-pop"
                role="dialog"
                aria-label={popEvent.title}
                tabIndex={-1}
                style={popStyle}
                onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); closePop(); } }}
              >
                <div className="hb-ye3-pop-head">
                  <span className="hb-ye3-pop-bar" />
                  <div className="hb-ye3-pop-title">{popEvent.title}</div>
                  <button type="button" className="hb-ye3-ib" aria-label="Close" onClick={closePop}><Icon d="M6 6l12 12M18 6 6 18" /></button>
                </div>
                <div className="hb-ye3-pop-row"><Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" />{longDate(popEvent.date)} · {popEvent.time ? `${fmtTime(popEvent.time)} to ${fmtTime(popEvent.end)}` : "All day"}</div>
                {popEvent.location && <div className="hb-ye3-pop-row"><Icon d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />{popEvent.location}</div>}
                {popEvent.calendar && <div className="hb-ye3-pop-row"><Icon d="M4 6h16v14H4V6Zm0 4h16M9 3v4m6-4v4" />{popEvent.calendar} calendar</div>}
                {popEvent.people && popEvent.people.length > 0 && (
                  <div className="hb-ye3-people" aria-label={popEvent.people.join(", ")}>
                    {popEvent.people.map((p) => (
                      <span key={p} className="hb-ye3-av" title={p} style={{ background: palette[hash(p) % palette.length] }}>
                        {p.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    ))}
                  </div>
                )}
                <div className="hb-ye3-pop-actions">
                  {popEvent.location === "Video call" && <button type="button" className="hb-ye3-btn">Join call</button>}
                  <button type="button" className="hb-ye3-btn" data-tone="ghost">Edit</button>
                </div>
              </div>
            )}
          </div>
        </section>
        <aside className="hb-ye3-side" aria-label="Agenda">
          <div>
            <div className="hb-ye3-side-h">
              <span className="hb-ye3-side-day">{selected === today ? "Today" : longDate(selected)}</span>
              <span className="hb-ye3-side-n">{dayEvents.length ? `${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : "Free"}</span>
            </div>
            {selected === today && <div className="hb-ye3-side-n" style={{ marginTop: 2 }}>{longDate(today)}</div>}
          </div>
          <div className="hb-ye3-agenda" key={selected}>
            {dayEvents.length === 0 && <div className="hb-ye3-none">Nothing scheduled. Enjoy the focus time.</div>}
            {dayEvents.map((ev, i) => (
              <button key={ev.id} type="button" className="hb-ye3-ag" style={{ "--c": colorOf(ev.color), animationDelay: `${(i * 0.05).toFixed(2)}s` } as React.CSSProperties} onClick={() => { const p = parse(ev.date); if (p.m === month.m && p.y === month.y) setOpenEvent(ev.id); onEventOpen?.(ev); }}>
                <i />
                <span>
                  <span className="hb-ye3-ag-t" style={{ display: "block" }}>{ev.title}</span>
                  <span className="hb-ye3-ag-m">{ev.time ? `${fmtTime(ev.time)} to ${fmtTime(ev.end)}` : "All day"}{ev.location ? ` · ${ev.location}` : ""}</span>
                </span>
              </button>
            ))}
          </div>
          {upcoming.length > 0 && (
            <div className="hb-ye3-agenda">
              <div className="hb-ye3-label">Coming up</div>
              {upcoming.map((ev) => (
                <button key={ev.id} type="button" className="hb-ye3-ag" style={{ "--c": colorOf(ev.color) } as React.CSSProperties} onClick={() => select(ev.date)}>
                  <i />
                  <span>
                    <span className="hb-ye3-ag-t" style={{ display: "block" }}>{ev.title}</span>
                    <span className="hb-ye3-ag-m">{longDate(ev.date)} · {fmtTime(ev.time)}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
          {calCounts.size > 0 && (
            <div className="hb-ye3-cals">
              <div className="hb-ye3-label">This month</div>
              {[...calCounts].slice(0, 5).map(([name, c]) => (
                <div key={name} className="hb-ye3-cal" style={{ "--c": c.color } as React.CSSProperties}><i />{name}<span>{c.n}</span></div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default AppCalendarMonth;

"use client";

import * as React from "react";

export interface OpenNowHours {
  day: number;
  open: string;
  close: string;
}

export type OpenNowStatus = "unknown" | "open" | "closing-soon" | "opening-later" | "closed" | "closed-today";

export interface OpenNowResult {
  status: OpenNowStatus;
  closesAt?: string;
  opensAt?: string;
  opensDay?: number;
  opensInDays?: number;
  minutesUntilClose?: number;
  minutesUntilOpen?: number;
}

export interface OpenNowOptions {
  timeZone?: string;
  closedDates?: string[];
  soonMinutes?: number;
}

export interface OpenNowBadgeLabels {
  checking: string;
  open: string;
  openShort: string;
  until: string;
  closingSoon: string;
  openingAt: string;
  opensShort: string;
  closed: string;
  closedToday: string;
  opens: string;
  tomorrow: string;
  am: string;
  pm: string;
  days: string[];
}

export interface OpenNowBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  hours?: OpenNowHours[];
  closedDates?: string[];
  timeZone?: string;
  now?: Date | string;
  soonMinutes?: number;
  hourCycle?: 12 | 24;
  size?: "sm" | "md" | "lg";
  variant?: "soft" | "outline" | "solid";
  appearance?: "dark" | "light";
  compact?: boolean;
  accent?: string;
  labels?: Partial<OpenNowBadgeLabels>;
  onStatusChange?: (status: OpenNowStatus, result: OpenNowResult) => void;
}

const defaultLabels: OpenNowBadgeLabels = {
  checking: "Checking hours",
  open: "Open now",
  openShort: "Open",
  until: "until {time}",
  closingSoon: "Closing soon",
  openingAt: "Opening at {time}",
  opensShort: "Opens {time}",
  closed: "Closed",
  closedToday: "Closed today",
  opens: "opens {day} {time}",
  tomorrow: "tomorrow",
  am: "am",
  pm: "pm",
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const defaultHours: OpenNowHours[] = [
  { day: 0, open: "10:00", close: "21:00" },
  { day: 2, open: "11:00", close: "22:00" },
  { day: 3, open: "11:00", close: "22:00" },
  { day: 4, open: "11:00", close: "22:00" },
  { day: 5, open: "11:00", close: "01:00" },
  { day: 6, open: "10:00", close: "15:00" },
  { day: 6, open: "17:30", close: "01:00" },
];

function parseTime(value: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 24 || m > 59) return null;
  return h * 60 + m;
}

function toClock(minutes: number) {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function wallClock(date: Date, timeZone?: string) {
  if (!timeZone) {
    return { y: date.getFullYear(), mo: date.getMonth() + 1, d: date.getDate(), minutes: date.getHours() * 60 + date.getMinutes() };
  }
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: get("year"), mo: get("month"), d: get("day"), minutes: (get("hour") % 24) * 60 + get("minute") };
}

export function getOpenStatus(hours: OpenNowHours[], now: Date | string, options: OpenNowOptions = {}): OpenNowResult {
  const date = typeof now === "string" ? new Date(now) : now;
  if (Number.isNaN(date.getTime())) return { status: "unknown" };
  const soon = options.soonMinutes ?? 30;
  const { y, mo, d, minutes } = wallClock(date, options.timeZone);
  const weekday = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  const closed = new Set(options.closedDates ?? []);
  const dateKey = (offset: number) => new Date(Date.UTC(y, mo - 1, d + offset)).toISOString().slice(0, 10);
  const ranges: { start: number; end: number; offset: number }[] = [];
  for (let week = -1; week <= 2; week++) {
    for (const h of hours) {
      const open = parseTime(h.open);
      const rawClose = parseTime(h.close);
      if (open === null || rawClose === null) continue;
      const close = rawClose <= open ? rawClose + 1440 : rawClose;
      const offset = week * 7 + (((h.day % 7) + 7) % 7) - weekday;
      if (offset < -7 || offset > 14 || closed.has(dateKey(offset))) continue;
      ranges.push({ start: offset * 1440 + open, end: offset * 1440 + close, offset });
    }
  }
  ranges.sort((a, b) => a.start - b.start);
  const merged: typeof ranges = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else merged.push({ ...r });
  }
  const current = merged.find((r) => r.start <= minutes && minutes < r.end);
  if (current) {
    const left = current.end - minutes;
    return { status: left <= soon ? "closing-soon" : "open", closesAt: toClock(current.end), minutesUntilClose: left };
  }
  const next = merged.find((r) => r.start > minutes);
  const nextInfo = next
    ? {
        opensAt: toClock(next.start),
        opensInDays: Math.floor(next.start / 1440),
        opensDay: (((weekday + Math.floor(next.start / 1440)) % 7) + 7) % 7,
        minutesUntilOpen: next.start - minutes,
      }
    : {};
  if (next && next.start < 1440) return { status: "opening-later", ...nextInfo };
  const hasToday = !closed.has(dateKey(0)) && hours.some((h) => ((h.day % 7) + 7) % 7 === weekday);
  return { status: hasToday ? "closed" : "closed-today", ...nextInfo };
}

const css = `
.hb-oa3 {
  --hb-oa3-c: #737373;
  --hb-oa3-text: #ededed;
  --hb-oa3-h: 30px;
  --hb-oa3-fs: 13px;
  --hb-oa3-dot: 7px;
  --hb-oa3-px: 12px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  height: var(--hb-oa3-h);
  padding: 0 var(--hb-oa3-px) 0 calc(var(--hb-oa3-px) - 1px);
  border: 1px solid color-mix(in srgb, var(--hb-oa3-c) 30%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-oa3-c) 13%, transparent);
  color: color-mix(in srgb, var(--hb-oa3-c) 70%, var(--hb-oa3-text));
  font-family: inherit;
  font-size: var(--hb-oa3-fs);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
}
.hb-oa3 *, .hb-oa3 *::before, .hb-oa3 *::after { box-sizing: border-box; }
.hb-oa3[data-appearance="light"] { --hb-oa3-text: #16130f; color: color-mix(in srgb, var(--hb-oa3-c) 62%, #16130f); }
.hb-oa3[data-size="sm"] { --hb-oa3-h: 24px; --hb-oa3-fs: 12px; --hb-oa3-dot: 6px; --hb-oa3-px: 9px; gap: 6px; }
.hb-oa3[data-size="lg"] { --hb-oa3-h: 38px; --hb-oa3-fs: 14.5px; --hb-oa3-dot: 8px; --hb-oa3-px: 15px; gap: 10px; }
.hb-oa3[data-variant="outline"] { background: transparent; border-color: color-mix(in srgb, var(--hb-oa3-c) 55%, transparent); color: var(--hb-oa3-text); }
.hb-oa3[data-variant="solid"] { background: var(--hb-oa3-c); border-color: transparent; color: #0a0a0a; }
.hb-oa3[data-status="open"] { --hb-oa3-c: #22c55e; }
.hb-oa3[data-status="closing-soon"] { --hb-oa3-c: #f59e0b; }
.hb-oa3[data-status="opening-later"] { --hb-oa3-c: var(--hb-oa3-accent, #7fb3ff); }
.hb-oa3[data-status="closed"], .hb-oa3[data-status="closed-today"] { --hb-oa3-c: #f87171; }
.hb-oa3-dot { position: relative; flex: none; width: var(--hb-oa3-dot); height: var(--hb-oa3-dot); border-radius: 50%; background: var(--hb-oa3-c); }
.hb-oa3[data-variant="solid"] .hb-oa3-dot { background: #0a0a0a; }
.hb-oa3-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: inherit; opacity: 0; }
.hb-oa3[data-status="open"] .hb-oa3-dot::after { animation: hb-oa3-ring 2.4s cubic-bezier(0.2, 0.7, 0.3, 1) infinite; }
.hb-oa3[data-status="closing-soon"] .hb-oa3-dot::after { animation: hb-oa3-ring 1.2s cubic-bezier(0.2, 0.7, 0.3, 1) infinite; }
.hb-oa3[data-status="closing-soon"] .hb-oa3-dot { animation: hb-oa3-blink 1.2s ease-in-out infinite; }
.hb-oa3[data-status="unknown"] .hb-oa3-dot { animation: hb-oa3-blink 1.4s ease-in-out infinite; }
.hb-oa3-main { font-weight: 600; }
.hb-oa3-sep { opacity: 0.45; }
.hb-oa3-detail { min-width: 0; overflow: hidden; text-overflow: ellipsis; opacity: 0.82; }
.hb-oa3[data-variant="outline"] .hb-oa3-main { color: color-mix(in srgb, var(--hb-oa3-c) 78%, var(--hb-oa3-text)); }
.hb-oa3[data-status="unknown"] .hb-oa3-main { font-weight: 500; opacity: 0.7; }
@keyframes hb-oa3-ring { 0% { opacity: 0.55; transform: scale(1); } 100% { opacity: 0; transform: scale(3.2); } }
@keyframes hb-oa3-blink { 50% { opacity: 0.45; } }
@media (prefers-reduced-motion: reduce) {
  .hb-oa3 { transition: none; }
  .hb-oa3 .hb-oa3-dot, .hb-oa3 .hb-oa3-dot::after { animation: none; }
}
`;

const noopSubscribe = () => () => {};
const subscribeClock = (callback: () => void) => {
  const id = window.setInterval(callback, 15000);
  return () => window.clearInterval(id);
};
const clockSnapshot = () => Math.floor(Date.now() / 60000);
const fixedSnapshot = () => 0;
const serverSnapshot = () => -1;

export function OpenNowBadge({
  hours = defaultHours,
  closedDates,
  timeZone,
  now,
  soonMinutes = 30,
  hourCycle = 12,
  size = "md",
  variant = "soft",
  appearance = "dark",
  compact = false,
  accent = "#7fb3ff",
  labels: labelsProp,
  onStatusChange,
  className = "",
  style,
  ...rest
}: OpenNowBadgeProps) {
  const labels = { ...defaultLabels, ...labelsProp };
  const fixed = now !== undefined;
  const tick = React.useSyncExternalStore(fixed ? noopSubscribe : subscribeClock, fixed ? fixedSnapshot : clockSnapshot, serverSnapshot);
  const nowKey = now instanceof Date ? now.getTime() : now;

  const result = React.useMemo<OpenNowResult>(() => {
    if (tick < 0) return { status: "unknown" };
    const at = nowKey !== undefined ? new Date(nowKey) : new Date(tick * 60000);
    return getOpenStatus(hours, at, { timeZone, closedDates, soonMinutes });
  }, [tick, nowKey, timeZone, closedDates, hours, soonMinutes]);

  const latest = React.useRef(onStatusChange);
  React.useEffect(() => {
    latest.current = onStatusChange;
  }, [onStatusChange]);

  const reported = React.useRef<OpenNowStatus>("unknown");
  React.useEffect(() => {
    if (result.status === "unknown" || result.status === reported.current) return;
    reported.current = result.status;
    latest.current?.(result.status, result);
  }, [result]);

  const time = (clock?: string) => {
    if (!clock) return "";
    const [h, m] = clock.split(":").map(Number);
    if (hourCycle === 24) return clock;
    const h12 = h % 12 || 12;
    return `${m ? `${h12}:${String(m).padStart(2, "0")}` : h12} ${h < 12 ? labels.am : labels.pm}`;
  };
  const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
  const opensLine = () => {
    if (result.opensAt === undefined || result.opensDay === undefined) return "";
    const day = result.opensInDays === 1 ? labels.tomorrow : labels.days[result.opensDay] ?? "";
    return fill(labels.opens, { day, time: time(result.opensAt) }).replace(/\s+/g, " ").trim();
  };

  let main = labels.checking;
  let detail = "";
  switch (result.status) {
    case "open":
      main = compact ? labels.openShort : labels.open;
      detail = compact ? "" : fill(labels.until, { time: time(result.closesAt) });
      break;
    case "closing-soon":
      main = labels.closingSoon;
      detail = compact ? "" : fill(labels.until, { time: time(result.closesAt) });
      break;
    case "opening-later":
      main = fill(compact ? labels.opensShort : labels.openingAt, { time: time(result.opensAt) });
      break;
    case "closed":
      main = labels.closed;
      detail = compact ? "" : opensLine();
      break;
    case "closed-today":
      main = labels.closedToday;
      detail = compact ? "" : opensLine();
      break;
  }

  const vars = { "--hb-oa3-accent": accent, ...style } as React.CSSProperties;

  return (
    <span
      role="status"
      aria-live="polite"
      className={`hb-oa3 ${className}`}
      style={vars}
      data-status={result.status}
      data-size={size}
      data-variant={variant}
      data-appearance={appearance}
      {...rest}
    >
      <style href="hb-open-now-badge" precedence="default">{css}</style>
      <span className="hb-oa3-dot" aria-hidden="true" />
      <span className="hb-oa3-main">{main}</span>
      {detail ? (
        <>
          <span className="hb-oa3-sep" aria-hidden="true">·</span>
          <span className="hb-oa3-detail">{detail}</span>
        </>
      ) : null}
    </span>
  );
}

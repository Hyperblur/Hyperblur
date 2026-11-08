"use client";

import * as React from "react";

export interface InputDatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  defaultMonth?: string;
  today?: string;
  min?: string;
  max?: string;
  disableWeekends?: boolean;
  weekStartsOn?: 0 | 1;
  inline?: boolean;
  layout?: "stack" | "split";
  cellSize?: number;
  accent?: string;
  placeholder?: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDays(y: number, m: number, d: number) {
  const yy = m <= 2 ? y - 1 : y;
  const era = Math.floor(yy / 400);
  const yoe = yy - era * 400;
  const mp = (m + 9) % 12;
  const doy = Math.floor((153 * mp + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

function fromDays(n: number) {
  const z = n + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  return { y: yoe + era * 400 + (m <= 2 ? 1 : 0), m, d };
}

function weekday(n: number) {
  return (((n + 4) % 7) + 7) % 7;
}

function dim(y: number, m: number) {
  return toDays(m === 12 ? y + 1 : y, m === 12 ? 1 : m + 1, 1) - toDays(y, m, 1);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIso(n: number) {
  const { y, m, d } = fromDays(n);
  return `${y}-${pad(m)}-${pad(d)}`;
}

function fromIso(s?: string | null) {
  if (!s) return null;
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!r) return null;
  const y = Number(r[1]);
  const m = Number(r[2]);
  const d = Number(r[3]);
  if (m < 1 || m > 12 || d < 1 || d > dim(y, m)) return null;
  return toDays(y, m, d);
}

function subscribeNone() {
  return () => {};
}

function readToday() {
  return new Intl.DateTimeFormat("en-CA").format();
}

function readNull() {
  return null;
}

function formatLong(n: number) {
  const { y, m, d } = fromDays(n);
  return `${DAYS[weekday(n)]}, ${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
}

function parseLoose(text: string, today: number | null): number | null {
  const t = text
    .trim()
    .toLowerCase()
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^(sun|mon|tue|wed|thu|fri|sat)[a-z]* (?=[a-z]{3,9} \d)/, "");
  if (!t) return null;
  const iso = fromIso(t);
  if (iso !== null) return iso;
  if (today !== null) {
    if (t === "today" || t === "now") return today;
    if (t === "tomorrow" || t === "tmr") return today + 1;
    if (t === "yesterday") return today - 1;
    const rel = /^(?:in |\+)(\d{1,3}) ?(d|day|days|w|week|weeks)$/.exec(t);
    if (rel) return today + Number(rel[1]) * (rel[2].startsWith("w") ? 7 : 1);
    const nx = /^(next |this )?(sun|mon|tue|wed|thu|fri|sat)[a-z]*$/.exec(t);
    if (nx) {
      const target = DAYS.findIndex((x) => x.toLowerCase() === nx[2]);
      const diff = (target - weekday(today) + 7) % 7;
      return today + (diff === 0 ? 7 : diff);
    }
  }
  const ref = today !== null ? fromDays(today) : null;
  const num = /^(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2,4}))?$/.exec(t);
  if (num) {
    const m = Number(num[1]);
    const d = Number(num[2]);
    const y = num[3] ? (num[3].length === 2 ? 2000 + Number(num[3]) : Number(num[3])) : ref?.y;
    if (!y || m < 1 || m > 12 || d < 1 || d > dim(y, m)) return null;
    return toDays(y, m, d);
  }
  const named = /^([a-z]{3,9}) (\d{1,2})(?: (\d{4}))?$|^(\d{1,2}) ([a-z]{3,9})(?: (\d{4}))?$/.exec(t);
  if (named) {
    const mon = named[1] ?? named[5];
    const d = Number(named[2] ?? named[4]);
    const y = Number(named[3] ?? named[6]) || ref?.y;
    const m = MONTHS.findIndex((x) => x.toLowerCase().startsWith(mon.slice(0, 3))) + 1;
    if (!y || m < 1 || d < 1 || d > dim(y, m)) return null;
    return toDays(y, m, d);
  }
  return null;
}

const css = `
.hb-xg3 {
  --hb-xg3-c: #2f7bff;
  --hb-xg3-cell: 36px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg3 *, .hb-xg3 *::before, .hb-xg3 *::after { box-sizing: border-box; }
.hb-xg3-label { display: block; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg3-split { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: start; }
.hb-xg3-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg3-field:hover { border-color: #333; }
.hb-xg3-field:focus-within {
  border-color: var(--hb-xg3-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg3-c) 16%, transparent);
}
.hb-xg3[data-bad="true"] .hb-xg3-field { border-color: #8a3a3c; }
.hb-xg3-in {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0 4px 0 12px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  caret-color: var(--hb-xg3-c);
}
.hb-xg3-in::placeholder { color: #5a5a5a; }
.hb-xg3-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0 4px 0 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-xg3-icon:hover { background: rgba(255, 255, 255, 0.05); color: #ededed; }
.hb-xg3-icon:focus-visible { outline: 2px solid var(--hb-xg3-c); outline-offset: -2px; }
.hb-xg3-icon svg { width: 16px; height: 16px; }
.hb-xg3-preview {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 18px;
  margin-top: 7px;
  font-size: 12px;
  color: #6f6f6f;
}
.hb-xg3-arrow { color: var(--hb-xg3-c); font-weight: 600; }
.hb-xg3-preview strong { font-weight: 500; color: #ededed; animation: hb-xg3-fade 0.25s ease; }
.hb-xg3[data-bad="true"] .hb-xg3-preview { color: #d97a7c; }
.hb-xg3-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
.hb-xg3-chip {
  height: 24px;
  margin: 0;
  padding: 0 9px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #121212;
  color: #a1a1a1;
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg3-chip:hover { border-color: #3a3a3a; color: #ededed; }
.hb-xg3-chip:active { transform: scale(0.95); }
.hb-xg3-chip:focus-visible { outline: 2px solid var(--hb-xg3-c); outline-offset: 2px; }
.hb-xg3-cal {
  width: calc(var(--hb-xg3-cell) * 7 + 18px);
  padding: 9px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: linear-gradient(180deg, #151515, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 40px -20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
.hb-xg3-pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  transform-origin: top left;
  animation: hb-xg3-pop 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg3-stack .hb-xg3-cal { margin-top: 8px; }
.hb-xg3-head { display: flex; align-items: center; justify-content: space-between; height: calc(var(--hb-xg3-cell) * 0.6 + 12px); padding: 0 2px 6px; }
.hb-xg3-title { position: relative; flex: 1; overflow: hidden; font-size: 13px; font-weight: 600; letter-spacing: -0.005em; }
.hb-xg3-title span { display: block; animation: hb-xg3-slide-n 0.32s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xg3[data-dir="prev"] .hb-xg3-title span { animation-name: hb-xg3-slide-p; }
.hb-xg3-title small { font-size: inherit; font-weight: 500; color: #6f6f6f; }
.hb-xg3-nav {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
}
.hb-xg3-nav:hover { background: rgba(255, 255, 255, 0.06); color: #ededed; }
.hb-xg3-nav:focus-visible { outline: 2px solid var(--hb-xg3-c); outline-offset: -1px; }
.hb-xg3-nav svg { width: 12px; height: 12px; }
.hb-xg3-wk, .hb-xg3-grid { display: grid; grid-template-columns: repeat(7, var(--hb-xg3-cell)); }
.hb-xg3-wk span {
  height: calc(var(--hb-xg3-cell) * 0.55 + 4px);
  font-size: 10.5px;
  font-weight: 500;
  color: #6f6f6f;
  text-align: center;
  line-height: calc(var(--hb-xg3-cell) * 0.55);
}
.hb-xg3-grid { animation: hb-xg3-grid-n 0.36s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xg3[data-dir="prev"] .hb-xg3-grid { animation-name: hb-xg3-grid-p; }
.hb-xg3[data-dir="none"] .hb-xg3-grid, .hb-xg3[data-dir="none"] .hb-xg3-title span { animation: none; }
.hb-xg3-day {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--hb-xg3-cell);
  height: var(--hb-xg3-cell);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #d4d4d4;
  font: inherit;
  font-size: calc(var(--hb-xg3-cell) * 0.36 + 0.5px);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}
.hb-xg3-day:hover { background: rgba(255, 255, 255, 0.07); }
.hb-xg3-day:focus-visible { outline: 2px solid var(--hb-xg3-c); outline-offset: -2px; }
.hb-xg3-day[data-out="true"] { color: #4a4a4a; }
.hb-xg3-day[data-wkend="true"] { color: #9a9a9a; }
.hb-xg3-day:disabled { color: #3a3a3a; cursor: not-allowed; background: transparent; text-decoration: line-through; text-decoration-color: #2e2e2e; }
.hb-xg3-day[data-today="true"]::after {
  content: "";
  position: absolute;
  bottom: calc(var(--hb-xg3-cell) * 0.12);
  left: 50%;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--hb-xg3-c);
}
.hb-xg3-day[aria-selected="true"] {
  color: #fff;
  font-weight: 600;
  background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--hb-xg3-c) 70%, #fff), var(--hb-xg3-c) 70%);
  box-shadow: 0 4px 14px -4px color-mix(in srgb, var(--hb-xg3-c) 80%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  animation: hb-xg3-pick 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg3-day[aria-selected="true"]::after { background: #fff; }
.hb-xg3-ph { height: calc(var(--hb-xg3-cell) * 6.6); }
@keyframes hb-xg3-pop { from { opacity: 0; transform: translateY(-6px) scale(0.97); } }
@keyframes hb-xg3-fade { from { opacity: 0; transform: translateY(2px); } }
@keyframes hb-xg3-slide-n { from { opacity: 0; transform: translateY(70%); } }
@keyframes hb-xg3-slide-p { from { opacity: 0; transform: translateY(-70%); } }
@keyframes hb-xg3-grid-n { from { opacity: 0; transform: translateX(18px); } }
@keyframes hb-xg3-grid-p { from { opacity: 0; transform: translateX(-18px); } }
@keyframes hb-xg3-pick { 0% { transform: scale(0.6); } 100% { transform: scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg3 *, .hb-xg3-pop { transition: none !important; animation: none !important; }
}
`;

export function InputDatePicker({
  label = "Date",
  value,
  defaultValue = null,
  onChange,
  defaultMonth,
  today,
  min,
  max,
  disableWeekends = false,
  weekStartsOn = 0,
  inline = false,
  layout = "stack",
  cellSize = 36,
  accent = "#2f7bff",
  placeholder = "Type a date, like next friday",
  className = "",
  style,
  ...rest
}: InputDatePickerProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<HTMLButtonElement>(null);
  const wantFocus = React.useRef(false);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string | null>(defaultValue);
  const current = controlled ? value : inner;
  const selected = fromIso(current);
  const clock = React.useSyncExternalStore(subscribeNone, readToday, readNull);
  const now = fromIso(today) ?? fromIso(clock);
  const initialView = selected ?? fromIso(defaultMonth ? `${defaultMonth}-01`.slice(0, 10) : null);
  const [viewState, setView] = React.useState<{ y: number; m: number } | null>(
    initialView !== null ? { y: fromDays(initialView).y, m: fromDays(initialView).m } : null,
  );
  const view = viewState ?? (now !== null ? { y: fromDays(now).y, m: fromDays(now).m } : null);
  const [cursorState, setCursor] = React.useState<number | null>(selected);
  const cursor = cursorState ?? now;
  const [dir, setDir] = React.useState<"next" | "prev" | "none">("none");
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [typing, setTyping] = React.useState(false);

  const minD = fromIso(min);
  const maxD = fromIso(max);
  const isOff = React.useCallback(
    (n: number) =>
      (minD !== null && n < minD) || (maxD !== null && n > maxD) || (disableWeekends && (weekday(n) === 0 || weekday(n) === 6)),
    [minD, maxD, disableWeekends],
  );

  const parsed = typing ? parseLoose(text, now) : null;
  const bad = typing && text.trim().length > 0 && (parsed === null || isOff(parsed));

  function commit(n: number | null, close = true) {
    if (n !== null && isOff(n)) return;
    const iso = n === null ? null : toIso(n);
    if (!controlled) setInner(iso);
    onChange?.(iso);
    if (n !== null) {
      const { y, m } = fromDays(n);
      jump(y, m);
      setCursor(n);
    }
    setTyping(false);
    setText("");
    if (close && !inline) {
      setOpen(false);
      inputRef.current?.focus();
    }
  }

  function jump(y: number, m: number) {
    if (view && view.y === y && view.m === m) return;
    if (view) setDir(y * 12 + m > view.y * 12 + view.m ? "next" : "prev");
    setView({ y, m });
  }

  function shiftMonth(delta: number) {
    if (!view) return;
    const t = view.y * 12 + (view.m - 1) + delta;
    jump(Math.floor(t / 12), (t % 12) + 1);
  }

  React.useEffect(() => {
    if (!open || inline) return;
    function down(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [open, inline]);

  React.useEffect(() => {
    if (!wantFocus.current) return;
    wantFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
  });

  function moveCursor(next: number) {
    setCursor(next);
    const { y, m } = fromDays(next);
    if (!view || view.y !== y || view.m !== m) jump(y, m);
    wantFocus.current = true;
  }

  function onGridKey(e: React.KeyboardEvent) {
    if (cursor === null) return;
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (map[e.key] !== undefined) {
      e.preventDefault();
      moveCursor(cursor + map[e.key]);
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const c = fromDays(cursor);
      const t = c.y * 12 + (c.m - 1) + (e.key === "PageUp" ? -1 : 1) * (e.shiftKey ? 12 : 1);
      const y = Math.floor(t / 12);
      const m = (t % 12) + 1;
      moveCursor(toDays(y, m, Math.min(c.d, dim(y, m))));
    } else if (e.key === "Home") {
      e.preventDefault();
      moveCursor(cursor - ((weekday(cursor) - weekStartsOn + 7) % 7));
    } else if (e.key === "End") {
      e.preventDefault();
      moveCursor(cursor + (6 - ((weekday(cursor) - weekStartsOn + 7) % 7)));
    } else if (e.key === "Escape" && !inline) {
      e.preventDefault();
      setOpen(false);
      iconRef.current?.focus();
    }
  }

  const quick = now === null ? [] : [
    { label: "Today", n: now },
    { label: "Tomorrow", n: now + 1 },
    { label: "Next Monday", n: now + ((1 - weekday(now) + 7) % 7 || 7) },
    { label: "In 2 weeks", n: now + 14 },
  ];

  let cal: React.ReactNode = null;
  if (view) {
    const first = toDays(view.y, view.m, 1);
    const offset = (weekday(first) - weekStartsOn + 7) % 7;
    const rows = Math.ceil((offset + dim(view.y, view.m)) / 7);
    const start = first - offset;
    const wk = Array.from({ length: 7 }, (_, i) => DAYS[(i + weekStartsOn) % 7]);
    const viewKey = `${view.y}-${view.m}`;
    const inView = cursor !== null && fromDays(cursor).y === view.y && fromDays(cursor).m === view.m;
    const focusDay = inView && cursor !== null ? cursor : selected !== null && fromDays(selected).m === view.m && fromDays(selected).y === view.y ? selected : first;
    cal = (
      <div className="hb-xg3-cal" role={inline ? "group" : "dialog"} aria-label="Choose date">
        <div className="hb-xg3-head">
          <div className="hb-xg3-title" aria-live="polite">
            <span key={viewKey}>
              {MONTHS[view.m - 1]} <small>{view.y}</small>
            </span>
          </div>
          <button type="button" className="hb-xg3-nav" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7.5 2.5L4 6l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="hb-xg3-nav" aria-label="Next month" onClick={() => shiftMonth(1)}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4.5 2.5L8 6 4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hb-xg3-wk" aria-hidden="true">
          {wk.map((d) => (
            <span key={d}>{d.slice(0, 2)}</span>
          ))}
        </div>
        <div className="hb-xg3-grid" key={viewKey} ref={gridRef} role="grid" aria-label={`${MONTHS[view.m - 1]} ${view.y}`} onKeyDown={onGridKey}>
          {Array.from({ length: rows * 7 }, (_, i) => {
            const n = start + i;
            const c = fromDays(n);
            const wd = weekday(n);
            return (
              <button
                key={n}
                type="button"
                role="gridcell"
                className="hb-xg3-day"
                tabIndex={n === focusDay ? 0 : -1}
                data-out={c.m !== view.m}
                data-today={n === now}
                data-wkend={wd === 0 || wd === 6}
                aria-selected={n === selected}
                aria-label={formatLong(n)}
                disabled={isOff(n)}
                onClick={() => commit(n)}
                onFocus={() => setCursor(n)}
              >
                {c.d}
              </button>
            );
          })}
        </div>
      </div>
    );
  } else if (inline) {
    cal = <div className="hb-xg3-cal hb-xg3-ph" aria-hidden="true" />;
  }

  const field = (
    <div>
      {label && (
        <label className="hb-xg3-label" htmlFor={`${id}-in`}>
          {label}
        </label>
      )}
      <div className="hb-xg3-field">
        <input
          ref={inputRef}
          id={`${id}-in`}
          className="hb-xg3-in"
          value={typing ? text : selected !== null ? formatLong(selected) : ""}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={bad}
          aria-label={label ? undefined : "Date"}
          aria-describedby={`${id}-pv`}
          onFocus={(e) => {
            if (!typing) {
              setText(selected !== null ? formatLong(selected) : "");
              setTyping(true);
              requestAnimationFrame(() => e.target.select());
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
            setTyping(true);
            const p = parseLoose(e.target.value, now);
            if (p !== null) {
              const { y, m } = fromDays(p);
              jump(y, m);
              setCursor(p);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!text.trim()) commit(null, false);
              else if (parsed !== null && !isOff(parsed)) commit(parsed, false);
            } else if (e.key === "ArrowDown" && !inline) {
              e.preventDefault();
              setOpen(true);
              wantFocus.current = true;
            } else if (e.key === "Escape") {
              setTyping(false);
              setText("");
              setOpen(false);
            }
          }}
          onBlur={() => {
            if (parsed !== null && !isOff(parsed)) commit(parsed, false);
            else if (!text.trim() && typing) commit(null, false);
            else {
              setTyping(false);
              setText("");
            }
          }}
        />
        {!inline && (
          <button
            ref={iconRef}
            type="button"
            className="hb-xg3-icon"
            aria-label={open ? "Close calendar" : "Open calendar"}
            aria-expanded={open}
            onClick={() => {
              setOpen((o) => !o);
              if (!open) wantFocus.current = true;
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="2.3" y="3.2" width="11.4" height="10.5" rx="2.2" />
              <path d="M2.3 6.6h11.4M5.4 1.8v2.6M10.6 1.8v2.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <div className="hb-xg3-preview" id={`${id}-pv`} aria-live="polite">
        {typing && text.trim() ? (
          parsed !== null && !bad ? (
            <>
              <span className="hb-xg3-arrow">→</span>
              <strong key={parsed}>{formatLong(parsed)}</strong>
              <span>· Enter to set</span>
            </>
          ) : parsed !== null ? (
            "That date isn't available."
          ) : (
            "Try 'tomorrow', 'next fri', 'Dec 3' or '+10d'."
          )
        ) : selected !== null && now !== null ? (
          selected === now ? "That's today." : selected > now ? `In ${selected - now} day${selected - now === 1 ? "" : "s"}` : `${now - selected} day${now - selected === 1 ? "" : "s"} ago`
        ) : (
          "Plain words work too."
        )}
      </div>
      {inline && quick.length > 0 && (
        <div className="hb-xg3-chips">
          {quick.map((q) => (
            <button key={q.label} type="button" className="hb-xg3-chip" onClick={() => commit(q.n, false)} disabled={isOff(q.n)}>
              {q.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const vars = { "--hb-xg3-c": accent, "--hb-xg3-cell": `${cellSize}px`, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-xg3 ${className}`} style={vars} data-dir={dir} data-bad={bad} {...rest}>
      <style href="hb-input-date-picker" precedence="default">{css}</style>
      {inline ? (
        <div className={layout === "split" ? "hb-xg3-split" : "hb-xg3-stack"}>
          {field}
          {cal}
        </div>
      ) : (
        <>
          {field}
          {open && <div className="hb-xg3-pop">{cal}</div>}
        </>
      )}
    </div>
  );
}

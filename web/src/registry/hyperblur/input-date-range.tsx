"use client";

import * as React from "react";

export interface InputDateRangeValue {
  start: string | null;
  end: string | null;
}

export interface InputDateRangePreset {
  label: string;
  start: string;
  end: string;
}

export interface InputDateRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: InputDateRangeValue;
  defaultValue?: InputDateRangeValue;
  onChange?: (value: InputDateRangeValue) => void;
  onApply?: (value: InputDateRangeValue) => void;
  presets?: InputDateRangePreset[];
  months?: 1 | 2;
  today?: string;
  unit?: "days" | "nights";
  inline?: boolean;
  cellSize?: number;
  accent?: string;
  label?: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDays(y: number, m: number, d: number) {
  const yy = m <= 2 ? y - 1 : y;
  const era = Math.floor(yy / 400);
  const yoe = yy - era * 400;
  const mp = (m + 9) % 12;
  const doy = Math.floor((153 * mp + 2) / 5) + d - 1;
  return era * 146097 + yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy - 719468;
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

function toIso(n: number) {
  const { y, m, d } = fromDays(n);
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function fromIso(s?: string | null) {
  if (!s) return null;
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return r ? toDays(Number(r[1]), Number(r[2]), Number(r[3])) : null;
}

function short(n: number, withYear = false) {
  const { y, m, d } = fromDays(n);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}${withYear ? `, ${y}` : ""}`;
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

const css = `
.hb-xg4 {
  --hb-xg4-c: #2f7bff;
  --hb-xg4-cell: 34px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  container-type: inline-size;
}
.hb-xg4 *, .hb-xg4 *::before, .hb-xg4 *::after { box-sizing: border-box; }
.hb-xg4-label { display: block; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg4-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  color: #ededed;
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg4-trigger:hover { border-color: #333; }
.hb-xg4-trigger:focus-visible, .hb-xg4[data-open="true"] .hb-xg4-trigger {
  outline: 0;
  border-color: var(--hb-xg4-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg4-c) 16%, transparent);
}
.hb-xg4-trigger svg { width: 16px; height: 16px; color: #8f8f8f; flex: none; }
.hb-xg4-trigger span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xg4-trigger em { font-style: normal; color: #6f6f6f; }
.hb-xg4-pop { position: absolute; z-index: 30; top: calc(100% + 6px); left: 0; animation: hb-xg4-pop 0.26s cubic-bezier(0.22, 1, 0.36, 1); transform-origin: top left; }
.hb-xg4-panel {
  display: flex;
  gap: 12px;
  width: max-content;
  max-width: 100%;
  padding: 10px;
  border: 1px solid #262626;
  border-radius: 16px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 48px -24px rgba(0, 0, 0, 0.85);
}
.hb-xg4-side { display: flex; flex-direction: column; justify-content: space-between; gap: 10px; min-width: 112px; padding-right: 10px; border-right: 1px solid #1f1f1f; }
.hb-xg4-presets { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-xg4-preset {
  position: relative;
  width: 100%;
  height: calc(var(--hb-xg4-cell) * 0.5 + 9px);
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}
.hb-xg4-preset:hover { background: rgba(255, 255, 255, 0.05); color: #ededed; }
.hb-xg4-preset:focus-visible { outline: 2px solid var(--hb-xg4-c); outline-offset: -2px; }
.hb-xg4-preset[aria-pressed="true"] { color: #fff; background: color-mix(in srgb, var(--hb-xg4-c) 18%, transparent); }
.hb-xg4-preset[aria-pressed="true"]::before { content: ""; position: absolute; left: 0; top: 25%; bottom: 25%; width: 2px; border-radius: 2px; background: var(--hb-xg4-c); }
.hb-xg4-sum { display: flex; flex-direction: column; gap: 6px; }
.hb-xg4-count { font-size: 11px; color: #8f8f8f; }
.hb-xg4-count b { display: block; font-size: 17px; font-weight: 600; line-height: 1.15; color: #ededed; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.hb-xg4-apply {
  height: 28px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xg4-c) 82%, #fff), var(--hb-xg4-c));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 14px -8px var(--hb-xg4-c);
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-xg4-apply:active { transform: scale(0.96); }
.hb-xg4-apply:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-xg4-apply:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xg4-months { position: relative; display: flex; gap: 14px; }
.hb-xg4-month { width: calc(var(--hb-xg4-cell) * 7); }
@container (max-width: 520px) { .hb-xg4-month + .hb-xg4-month { display: none; } }
.hb-xg4-head { position: relative; display: flex; align-items: center; justify-content: center; height: calc(var(--hb-xg4-cell) * 0.6 + 8px); }
.hb-xg4-title { font-size: 12.5px; font-weight: 600; }
.hb-xg4-nav {
  position: absolute;
  top: calc(var(--hb-xg4-cell) * 0.3 + 4px);
  z-index: 1;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: -12px 0 0;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
}
.hb-xg4-nav:hover { background: rgba(255, 255, 255, 0.06); color: #ededed; }
.hb-xg4-nav:focus-visible { outline: 2px solid var(--hb-xg4-c); outline-offset: -1px; }
.hb-xg4-nav svg { width: 12px; height: 12px; }
.hb-xg4-nav[data-side="prev"] { left: 0; }
.hb-xg4-nav[data-side="next"] { right: 0; }
.hb-xg4-wk, .hb-xg4-grid { display: grid; grid-template-columns: repeat(7, var(--hb-xg4-cell)); }
.hb-xg4-wk span { font-size: 10px; font-weight: 500; color: #666; text-align: center; line-height: calc(var(--hb-xg4-cell) * 0.5 + 4px); }
.hb-xg4-grid { row-gap: 2px; touch-action: none; user-select: none; -webkit-user-select: none; }
.hb-xg4-cell { position: relative; height: var(--hb-xg4-cell); }
.hb-xg4-cell::before {
  content: "";
  position: absolute;
  inset: 3px 0;
  background: transparent;
  transition: background 0.16s ease;
}
.hb-xg4-cell[data-in="true"]::before { background: color-mix(in srgb, var(--hb-xg4-c) 16%, transparent); }
.hb-xg4-cell[data-in="true"][data-preview="true"]::before { background: color-mix(in srgb, var(--hb-xg4-c) 9%, transparent); }
.hb-xg4-cell[data-s="true"]::before { left: 50%; }
.hb-xg4-cell[data-e="true"]::before { right: 50%; }
.hb-xg4-cell[data-s="true"][data-e="true"]::before { display: none; }
.hb-xg4-cell[data-rs="true"]::before { border-top-left-radius: 999px; border-bottom-left-radius: 999px; }
.hb-xg4-cell[data-re="true"]::before { border-top-right-radius: 999px; border-bottom-right-radius: 999px; }
.hb-xg4-day {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #d4d4d4;
  font: inherit;
  font-size: calc(var(--hb-xg4-cell) * 0.36);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease, box-shadow 0.2s ease;
}
.hb-xg4-day:hover { background: rgba(255, 255, 255, 0.08); }
.hb-xg4-day:focus-visible { outline: 2px solid var(--hb-xg4-c); outline-offset: -2px; }
.hb-xg4-day[data-today="true"] { box-shadow: inset 0 0 0 1px #3a3a3a; }
.hb-xg4-cell[data-in="true"] .hb-xg4-day { color: #fff; }
.hb-xg4-cell[data-s="true"] .hb-xg4-day, .hb-xg4-cell[data-e="true"] .hb-xg4-day {
  color: #fff;
  font-weight: 600;
  background: var(--hb-xg4-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px -4px var(--hb-xg4-c);
  animation: hb-xg4-pick 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg4-cell[data-preview="true"][data-e="true"] .hb-xg4-day { background: transparent; box-shadow: inset 0 0 0 1.5px var(--hb-xg4-c); animation: none; }
@keyframes hb-xg4-pick { from { transform: scale(0.65); } }
@keyframes hb-xg4-pop { from { opacity: 0; transform: translateY(-6px) scale(0.98); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg4 *, .hb-xg4 *::before, .hb-xg4-pop { transition: none !important; animation: none !important; }
}
`;

export function InputDateRange({
  value,
  defaultValue = { start: null, end: null },
  onChange,
  onApply,
  presets,
  months = 2,
  today,
  unit = "days",
  inline = false,
  cellSize = 34,
  accent = "#2f7bff",
  label = "Date range",
  className = "",
  style,
  ...rest
}: InputDateRangeProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const focusTarget = React.useRef<number | null>(null);
  const clock = React.useSyncExternalStore(subscribeNone, readToday, readNull);
  const now = fromIso(today) ?? fromIso(clock);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<InputDateRangeValue>(defaultValue);
  const range = controlled ? value : inner;
  const s = fromIso(range.start);
  const e = fromIso(range.end);
  const [hover, setHover] = React.useState<number | null>(null);
  const [drag, setDrag] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const anchor = s ?? now;
  const [viewState, setView] = React.useState<number | null>(s !== null ? fromDays(s).y * 12 + fromDays(s).m - 1 : null);
  const view = viewState ?? (anchor !== null ? fromDays(anchor).y * 12 + fromDays(anchor).m - 1 : null);

  function set(next: InputDateRangeValue) {
    if (!controlled) setInner(next);
    onChange?.(next);
  }

  React.useEffect(() => {
    if (drag === null) return;
    function up() {
      setDrag(null);
    }
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [drag]);

  React.useEffect(() => {
    if (!open || inline) return;
    function down(ev: PointerEvent) {
      if (!rootRef.current?.contains(ev.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [open, inline]);

  React.useEffect(() => {
    if (focusTarget.current === null) return;
    const n = focusTarget.current;
    focusTarget.current = null;
    panelRef.current?.querySelector<HTMLButtonElement>(`[data-n="${n}"]`)?.focus();
  });

  const builtIn: InputDateRangePreset[] =
    now === null
      ? []
      : (() => {
          const t = fromDays(now);
          const lmY = t.m === 1 ? t.y - 1 : t.y;
          const lmM = t.m === 1 ? 12 : t.m - 1;
          const q = Math.floor((t.m - 1) / 3) * 3 + 1;
          return [
            { label: "Last 7 days", start: toIso(now - 6), end: toIso(now) },
            { label: "Last 30 days", start: toIso(now - 29), end: toIso(now) },
            { label: "This month", start: toIso(toDays(t.y, t.m, 1)), end: toIso(now) },
            { label: "Last month", start: toIso(toDays(lmY, lmM, 1)), end: toIso(toDays(lmY, lmM, dim(lmY, lmM))) },
            { label: "Quarter to date", start: toIso(toDays(t.y, q, 1)), end: toIso(now) },
          ];
        })();
  const list = presets ?? builtIn;

  function down(n: number, ev: React.PointerEvent<HTMLButtonElement>) {
    if (ev.button !== 0) return;
    if (ev.currentTarget.hasPointerCapture(ev.pointerId)) ev.currentTarget.releasePointerCapture(ev.pointerId);
    if (s !== null && e === null && n !== s) {
      set({ start: toIso(Math.min(s, n)), end: toIso(Math.max(s, n)) });
      return;
    }
    set({ start: toIso(n), end: null });
    setDrag(n);
    setHover(n);
  }

  function enter(n: number) {
    setHover(n);
    if (drag !== null && n !== drag) set({ start: toIso(Math.min(drag, n)), end: toIso(Math.max(drag, n)) });
  }

  function keyPick(n: number) {
    if (s !== null && e === null) set({ start: toIso(Math.min(s, n)), end: toIso(Math.max(s, n)) });
    else set({ start: toIso(n), end: null });
  }

  function onKey(ev: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (map[ev.key] !== undefined) {
      ev.preventDefault();
      const next = n + map[ev.key];
      const nd = fromDays(next);
      const idx = nd.y * 12 + nd.m - 1;
      if (view !== null && (idx < view || idx > view + months - 1)) setView(idx < view ? idx : idx - months + 1);
      setHover(next);
      focusTarget.current = next;
    } else if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      keyPick(n);
    } else if (ev.key === "Escape" && !inline) {
      ev.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  let lo = s;
  let hi = e;
  const previewing = s !== null && e === null && hover !== null && drag === null;
  if (previewing && hover !== null && s !== null) {
    lo = Math.min(s, hover);
    hi = Math.max(s, hover);
  }

  const count = s !== null && e !== null ? e - s + (unit === "days" ? 1 : 0) : null;
  const activePreset = list.find((p) => p.start === range.start && p.end === range.end)?.label;

  function monthGrid(idx: number) {
    const y = Math.floor(idx / 12);
    const m = (idx % 12) + 1;
    const first = toDays(y, m, 1);
    const offset = weekday(first);
    const total = dim(y, m);
    const cells = Math.ceil((offset + total) / 7) * 7;
    const focusDay = s !== null && s >= first && s < first + total ? s : now !== null && now >= first && now < first + total ? now : first;
    return (
      <div className="hb-xg4-month" key={idx}>
        <div className="hb-xg4-head">
          <span className="hb-xg4-title" aria-live="polite">
            {MONTHS[m - 1]} {y}
          </span>
        </div>
        <div className="hb-xg4-wk" aria-hidden="true">
          {WK.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="hb-xg4-grid" role="grid" aria-label={`${MONTHS[m - 1]} ${y}`} onPointerLeave={() => setHover(null)}>
          {Array.from({ length: cells }, (_, i) => {
            const d = i - offset + 1;
            if (d < 1 || d > total) return <div key={i} className="hb-xg4-cell" aria-hidden="true" />;
            const n = first + d - 1;
            const col = i % 7;
            const inside = lo !== null && hi !== null && n >= lo && n <= hi;
            const isStart = n === lo;
            const isEnd = n === (hi ?? lo);
            return (
              <div
                key={i}
                className="hb-xg4-cell"
                role="gridcell"
                aria-selected={inside}
                data-in={inside}
                data-s={inside && isStart}
                data-e={inside && isEnd}
                data-preview={previewing && inside}
                data-rs={col === 0 || d === 1}
                data-re={col === 6 || d === total}
              >
                <button
                  type="button"
                  className="hb-xg4-day"
                  data-n={n}
                  data-today={n === now}
                  tabIndex={n === focusDay ? 0 : -1}
                  aria-label={`${short(n, true)}${n === s ? ", start" : ""}${n === e ? ", end" : ""}`}
                  onPointerDown={(ev) => down(n, ev)}
                  onPointerEnter={() => enter(n)}
                  onFocus={() => setHover(n)}
                  onKeyDown={(ev) => onKey(ev, n)}
                >
                  {d}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const panel = (
    <div className="hb-xg4-panel" ref={panelRef} role={inline ? "group" : "dialog"} aria-label="Choose a date range">
      {list.length > 0 && (
        <div className="hb-xg4-side">
          <ul className="hb-xg4-presets">
            {list.map((p) => (
              <li key={p.label}>
                <button
                  type="button"
                  className="hb-xg4-preset"
                  aria-pressed={activePreset === p.label}
                  onClick={() => {
                    set({ start: p.start, end: p.end });
                    const st = fromIso(p.start);
                    if (st !== null) setView(fromDays(st).y * 12 + fromDays(st).m - 1);
                  }}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="hb-xg4-sum">
            <div className="hb-xg4-count" aria-live="polite">
              <b>{count !== null ? `${count} ${unit === "days" ? (count === 1 ? "day" : "days") : count === 1 ? "night" : "nights"}` : "—"}</b>
              {s !== null && e !== null ? `${short(s)} – ${short(e)}` : s !== null ? "Pick an end date" : "Drag across days"}
            </div>
            <button
              type="button"
              className="hb-xg4-apply"
              disabled={s === null || e === null}
              onClick={() => {
                onApply?.(range);
                if (!inline) {
                  setOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <div className="hb-xg4-months">
        {view !== null && (
          <>
            <button type="button" className="hb-xg4-nav" data-side="prev" aria-label="Previous month" onClick={() => setView(view - 1)}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M7.5 2.5L4 6l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="hb-xg4-nav" data-side="next" aria-label="Next month" onClick={() => setView(view + 1)}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4.5 2.5L8 6 4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {Array.from({ length: months }, (_, k) => monthGrid(view + k))}
          </>
        )}
      </div>
    </div>
  );

  const vars = { "--hb-xg4-c": accent, "--hb-xg4-cell": `${cellSize}px`, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-xg4 ${className}`} style={vars} data-open={open} {...rest}>
      <style href="hb-input-date-range" precedence="default">{css}</style>
      {inline ? (
        panel
      ) : (
        <>
          <label className="hb-xg4-label" htmlFor={`${id}-t`}>
            {label}
          </label>
          <button
            ref={triggerRef}
            id={`${id}-t`}
            type="button"
            className="hb-xg4-trigger"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={(ev) => {
              if (ev.key === "Escape") setOpen(false);
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="2.3" y="3.2" width="11.4" height="10.5" rx="2.2" />
              <path d="M2.3 6.6h11.4M5.4 1.8v2.6M10.6 1.8v2.6" strokeLinecap="round" />
            </svg>
            <span>
              {s !== null && e !== null ? (
                <>
                  {short(s)} <em>–</em> {short(e, true)}
                </>
              ) : (
                <em>Select dates</em>
              )}
            </span>
          </button>
          {open && <div className="hb-xg4-pop">{panel}</div>}
        </>
      )}
    </div>
  );
}

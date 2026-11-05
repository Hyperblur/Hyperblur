"use client";

import * as React from "react";

export interface HudFilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface HudFilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options?: HudFilterOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  allId?: string;
  label?: string;
  accent?: string;
}

const defaultOptions: HudFilterOption[] = [
  { id: "all", label: "All", count: 34 },
  { id: "xr", label: "XR", count: 6 },
  { id: "map", label: "Map", count: 5 },
  { id: "tool", label: "Tool", count: 11 },
  { id: "graphics", label: "Graphics", count: 12 },
];

const css = `
.hb-ua5 {
  --hb-ua5-accent: #ff4d4d;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.hb-ua5 *, .hb-ua5 *::before, .hb-ua5 *::after { box-sizing: border-box; }
.hb-ua5-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 28px;
  margin: 0;
  padding: 0 11px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 0;
  background: rgba(255,255,255,.025);
  color: #a1a1a1;
  font: inherit;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: color .2s ease, border-color .2s ease, background-color .2s ease, box-shadow .25s ease, transform .12s ease;
}
.hb-ua5-chip::before, .hb-ua5-chip::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border: 0 solid rgba(255,255,255,.45);
  pointer-events: none;
  transition: border-color .2s ease, width .2s ease, height .2s ease;
}
.hb-ua5-chip::before { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.hb-ua5-chip::after { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua5-chip:hover { color: #ededed; border-color: rgba(255,255,255,.2); }
.hb-ua5-chip:hover::before, .hb-ua5-chip:hover::after { width: 9px; height: 9px; }
.hb-ua5-chip:active { transform: translateY(1px); }
.hb-ua5-chip:focus-visible { border-color: rgba(255,255,255,.4); color: #ededed; }
.hb-ua5-chip[aria-pressed="true"] {
  color: #fff;
  border-color: color-mix(in srgb, var(--hb-ua5-accent) 65%, transparent);
  background: color-mix(in srgb, var(--hb-ua5-accent) 14%, transparent);
  box-shadow: 0 0 16px -4px color-mix(in srgb, var(--hb-ua5-accent) 70%, transparent), inset 0 0 12px -6px var(--hb-ua5-accent);
}
.hb-ua5-chip[aria-pressed="true"]::before, .hb-ua5-chip[aria-pressed="true"]::after { border-color: var(--hb-ua5-accent); width: 9px; height: 9px; }
.hb-ua5-count { color: #5f5f5f; font-variant-numeric: tabular-nums; transition: color .2s ease; }
.hb-ua5-chip[aria-pressed="true"] .hb-ua5-count { color: var(--hb-ua5-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-ua5-chip, .hb-ua5-chip::before, .hb-ua5-chip::after, .hb-ua5-count { transition: none; }
}
`;

export function HudFilterChips({
  options = defaultOptions,
  value,
  defaultValue,
  onChange,
  multiple = false,
  allId = "all",
  label = "Filter",
  accent = "#ff4d4d",
  className,
  style,
  ...rest
}: HudFilterChipsProps) {
  const hasAll = options.some((o) => o.id === allId);
  const fallback = hasAll ? [allId] : options[0] ? [options[0].id] : [];
  const [inner, setInner] = React.useState<string[]>(() => defaultValue ?? fallback);
  const selected = value ?? inner;
  const [focusIndex, setFocusIndex] = React.useState(() => Math.max(0, options.findIndex((o) => selected.includes(o.id))));
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const set = (next: string[]) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const toggle = (id: string) => {
    if (!multiple) {
      if (selected.length === 1 && selected[0] === id) return;
      set([id]);
      return;
    }
    if (id === allId) {
      set([allId]);
      return;
    }
    const base = selected.filter((s) => s !== allId);
    const next = base.includes(id) ? base.filter((s) => s !== id) : [...base, id];
    set(next.length ? next : fallback);
  };

  const move = (i: number) => {
    const n = options.length;
    const next = ((i % n) + n) % n;
    setFocusIndex(next);
    refs.current[next]?.focus();
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(options.length - 1);
    }
  };

  const tabStop = Math.min(focusIndex, options.length - 1);

  return (
    <div
      role="toolbar"
      aria-label={label}
      className={["hb-ua5", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua5-accent" as string]: accent, ...style }}
      {...rest}
    >
      <style href="hb-hud-filter-chips" precedence="default">{css}</style>
      {options.map((o, i) => (
        <button
          key={o.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          className="hb-ua5-chip"
          aria-pressed={selected.includes(o.id)}
          tabIndex={i === tabStop ? 0 : -1}
          onFocus={() => setFocusIndex(i)}
          onKeyDown={(e) => onKey(e, i)}
          onClick={() => toggle(o.id)}
        >
          {o.label}
          {o.count !== undefined ? <span className="hb-ua5-count">{String(o.count).padStart(2, "0")}</span> : null}
        </button>
      ))}
    </div>
  );
}

export default HudFilterChips;

"use client";

import * as React from "react";

export interface LikeBookmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  saved?: boolean;
  defaultSaved?: boolean;
  onSavedChange?: (saved: boolean, count: number) => void;
  color?: string;
  size?: number;
  label?: string;
  noun?: string;
}

const css = `
.hb-qb5 {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb5 *, .hb-qb5 *::before, .hb-qb5 *::after { box-sizing: border-box; }
.hb-qb5-btn {
  --hb-qb5-bg: #171717;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-qb5-s) * 0.36);
  margin: 0;
  padding: calc(var(--hb-qb5-s) * 0.26) calc(var(--hb-qb5-s) * 0.7) calc(var(--hb-qb5-s) * 0.26) calc(var(--hb-qb5-s) * 0.5);
  border: 1px solid #262626;
  border-radius: calc(var(--hb-qb5-s) * 0.6);
  background: var(--hb-qb5-bg);
  color: #8f8f8f;
  font: inherit;
  font-size: calc(var(--hb-qb5-s) * 0.58);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
}
.hb-qb5-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-qb5-btn:active { transform: scale(0.96); }
.hb-qb5-btn:focus-visible { outline: 2px solid var(--hb-qb5-c); outline-offset: 3px; }
.hb-qb5-btn[aria-pressed="true"] {
  --hb-qb5-bg: color-mix(in srgb, var(--hb-qb5-c) 9%, #171717);
  border-color: color-mix(in srgb, var(--hb-qb5-c) 45%, #262626);
  color: #ededed;
}
.hb-qb5-ico {
  display: inline-flex;
  width: var(--hb-qb5-s);
  height: calc(var(--hb-qb5-s) * 1.25);
  flex: none;
}
.hb-qb5-ico svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.hb-qb5-rib {
  fill: transparent;
  transform: translateY(0);
  transition: fill 0.25s ease, stroke 0.25s ease;
}
.hb-qb5-btn[aria-pressed="true"] .hb-qb5-rib {
  fill: var(--hb-qb5-c);
  stroke: var(--hb-qb5-c);
  transform: translateY(8.5px);
}
.hb-qb5-rib[data-fx="save"] { animation: hb-qb5-drop 0.8s cubic-bezier(0.35, 0.7, 0.4, 1); }
.hb-qb5-rib[data-fx="lift"] { animation: hb-qb5-lift 0.4s ease-out; }
@keyframes hb-qb5-drop {
  0% { transform: translateY(0); }
  50% { transform: translateY(12px); }
  68% { transform: translateY(7px); }
  84% { transform: translateY(9.4px); }
  100% { transform: translateY(8.5px); }
}
@keyframes hb-qb5-lift {
  0% { transform: translateY(8.5px); }
  45% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}
.hb-qb5-tray {
  fill: var(--hb-qb5-bg);
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transition: fill 0.2s ease, stroke 0.25s ease;
}
.hb-qb5-btn[aria-pressed="true"] .hb-qb5-tray { stroke: var(--hb-qb5-c); }
.hb-qb5-tray[data-fx="save"] { animation: hb-qb5-squash 0.8s ease-out; }
@keyframes hb-qb5-squash {
  0%, 44% { transform: scale(1, 1); }
  54% { transform: scale(1.06, 0.88); }
  72% { transform: scale(0.98, 1.04); }
  100% { transform: scale(1, 1); }
}
.hb-qb5-count {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-qb5-roll {
  display: inline-grid;
  overflow: hidden;
  line-height: 1.25;
  margin: -0.125em 0;
}
.hb-qb5-roll > span { grid-area: 1 / 1; display: block; }
.hb-qb5-in { animation: hb-qb5-up-in 0.38s cubic-bezier(0.3, 1.3, 0.5, 1) both; }
.hb-qb5-out { animation: hb-qb5-up-out 0.3s ease-in both; }
.hb-qb5-roll[data-up="false"] .hb-qb5-in { animation-name: hb-qb5-down-in; }
.hb-qb5-roll[data-up="false"] .hb-qb5-out { animation-name: hb-qb5-down-out; }
@keyframes hb-qb5-up-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb5-up-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}
@keyframes hb-qb5-down-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb5-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
.hb-qb5-noun { margin-left: -0.15em; color: #8f8f8f; font-weight: 500; }
.hb-qb5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb5-btn, .hb-qb5-rib, .hb-qb5-tray { transition: none; }
  .hb-qb5-rib[data-fx], .hb-qb5-tray[data-fx] { animation: none; }
  .hb-qb5-out { display: none; }
  .hb-qb5-in { animation: none; }
}
`;

const ribbon = "M8 -3h8a1 1 0 011 1v14l-5-3.6L7 12V-2a1 1 0 011-1z";
const tray = "M2.5 19.5h19v2.4a2.8 2.8 0 01-2.8 2.8H5.3a2.8 2.8 0 01-2.8-2.8z";

interface RollState {
  value: number;
  prev: number;
  id: number;
  live: boolean;
}

function Roll({ value }: { value: number }) {
  const [view, setView] = React.useState<RollState>({ value, prev: value, id: 0, live: false });
  if (view.value !== value) {
    setView({ value, prev: view.value, id: view.id + 1, live: true });
  }
  const to = value.toLocaleString("en-US");
  if (!view.live) {
    return (
      <span className="hb-qb5-count" aria-hidden="true">
        {to}
      </span>
    );
  }
  const from = view.prev.toLocaleString("en-US");
  let p = 0;
  while (p < from.length && p < to.length && from[p] === to[p]) p++;
  return (
    <span className="hb-qb5-count" aria-hidden="true">
      {to.slice(0, p)}
      <span key={view.id} className="hb-qb5-roll" data-up={value > view.prev ? "true" : "false"}>
        <span className="hb-qb5-out">{from.slice(p)}</span>
        <span
          className="hb-qb5-in"
          onAnimationEnd={() => setView((v) => (v.live ? { ...v, live: false } : v))}
        >
          {to.slice(p)}
        </span>
      </span>
    </span>
  );
}

export function LikeBookmark({
  count = 0,
  saved,
  defaultSaved = false,
  onSavedChange,
  color = "#7fb3ff",
  size = 22,
  label = "Save",
  noun = "saved",
  className = "",
  style,
  ...rest
}: LikeBookmarkProps) {
  const controlled = saved !== undefined;
  const [inner, setInner] = React.useState(defaultSaved);
  const current = controlled ? saved : inner;
  const [base] = React.useState(current);
  const [seen, setSeen] = React.useState({ saved: current, pulse: 0 });

  if (seen.saved !== current) {
    setSeen({ saved: current, pulse: seen.pulse + 1 });
  }

  const offset = current === base ? 0 : current ? 1 : -1;
  const total = Math.max(0, count + offset);
  const fx = seen.pulse === 0 ? undefined : current ? "save" : "lift";

  function toggle() {
    const next = !current;
    if (!controlled) setInner(next);
    const nextOffset = next === base ? 0 : next ? 1 : -1;
    onSavedChange?.(next, Math.max(0, count + nextOffset));
  }

  const vars = {
    "--hb-qb5-s": `${size}px`,
    "--hb-qb5-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-qb5 ${className}`} style={vars} {...rest}>
      <style href="hb-like-bookmark" precedence="default">{css}</style>
      <button type="button" className="hb-qb5-btn" aria-pressed={current} aria-label={label} onClick={toggle}>
        <span className="hb-qb5-ico" aria-hidden="true">
          <svg viewBox="0 -4 24 30">
            <path key={`r${seen.pulse}`} className="hb-qb5-rib" data-fx={fx} d={ribbon} />
            <path key={`t${seen.pulse}`} className="hb-qb5-tray" data-fx={fx} d={tray} />
          </svg>
        </span>
        <Roll value={total} />
        {noun && (
          <span className="hb-qb5-noun" aria-hidden="true">
            {noun}
          </span>
        )}
      </button>
      <span className="hb-qb5-sr" role="status" aria-live="polite">
        {`${total.toLocaleString("en-US")} ${noun || "saves"}`}
      </span>
    </span>
  );
}

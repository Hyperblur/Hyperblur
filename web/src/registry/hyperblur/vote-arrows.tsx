"use client";

import * as React from "react";

export type Vote = -1 | 0 | 1;

export interface VoteArrowsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  score?: number;
  value?: Vote;
  defaultValue?: Vote;
  onVote?: (value: Vote, score: number) => void | PromiseLike<unknown>;
  orientation?: "vertical" | "horizontal";
  upColor?: string;
  downColor?: string;
  label?: string;
}

const css = `
.hb-qb7 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #171717;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qb7 *, .hb-qb7 *::before, .hb-qb7 *::after { box-sizing: border-box; }
.hb-qb7[data-o="horizontal"] { flex-direction: row; border-radius: 999px; gap: 4px; padding: 3px; }
.hb-qb7-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #7a7a7a;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.12s ease;
}
.hb-qb7[data-o="horizontal"] .hb-qb7-btn { height: 32px; border-radius: 50%; }
.hb-qb7-btn:hover { background: color-mix(in srgb, var(--hb-qb7-k) 14%, transparent); color: var(--hb-qb7-k); }
.hb-qb7-btn:active { transform: scale(0.9); }
.hb-qb7-btn:focus-visible { outline: 2px solid var(--hb-qb7-k); outline-offset: 1px; }
.hb-qb7-btn[aria-pressed="true"] {
  background: color-mix(in srgb, var(--hb-qb7-k) 18%, transparent);
  color: var(--hb-qb7-k);
}
.hb-qb7-up { --hb-qb7-k: var(--hb-qb7-u); }
.hb-qb7-down { --hb-qb7-k: var(--hb-qb7-d); }
.hb-qb7-arrow {
  display: block;
  width: 20px;
  height: 20px;
}
.hb-qb7-arrow svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linejoin: round;
  transition: fill 0.2s ease;
}
.hb-qb7-btn[aria-pressed="true"] .hb-qb7-arrow svg { fill: currentColor; }
.hb-qb7-arrow[data-pop="up"] { animation: hb-qb7-pop-up 0.5s cubic-bezier(0.3, 1.5, 0.5, 1); }
.hb-qb7-arrow[data-pop="down"] { animation: hb-qb7-pop-down 0.5s cubic-bezier(0.3, 1.5, 0.5, 1); }
@keyframes hb-qb7-pop-up {
  0% { transform: translateY(5px) scale(0.8); }
  45% { transform: translateY(-4px) scale(1.25); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes hb-qb7-pop-down {
  0% { transform: translateY(-5px) scale(0.8); }
  45% { transform: translateY(4px) scale(1.25); }
  100% { transform: translateY(0) scale(1); }
}
.hb-qb7-score {
  display: inline-flex;
  min-width: 2.2em;
  justify-content: center;
  color: var(--hb-qb7-t, #ededed);
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  transition: color 0.25s ease;
}
.hb-qb7-score[data-shake="true"] { animation: hb-qb7-shake 0.4s ease-in-out; }
@keyframes hb-qb7-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  45% { transform: translateX(4px); }
  70% { transform: translateX(-2px); }
}
.hb-qb7-count {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-qb7-roll {
  display: inline-grid;
  overflow: hidden;
  line-height: 1.25;
  margin: -0.125em 0;
}
.hb-qb7-roll > span { grid-area: 1 / 1; display: block; }
.hb-qb7-in { animation: hb-qb7-up-in 0.38s cubic-bezier(0.3, 1.3, 0.5, 1) both; }
.hb-qb7-out { animation: hb-qb7-up-out 0.3s ease-in both; }
.hb-qb7-roll[data-up="false"] .hb-qb7-in { animation-name: hb-qb7-down-in; }
.hb-qb7-roll[data-up="false"] .hb-qb7-out { animation-name: hb-qb7-down-out; }
@keyframes hb-qb7-up-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb7-up-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}
@keyframes hb-qb7-down-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb7-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
.hb-qb7-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb7-btn, .hb-qb7-arrow svg, .hb-qb7-score { transition: none; }
  .hb-qb7-arrow[data-pop], .hb-qb7-score[data-shake] { animation: none; }
  .hb-qb7-out { display: none; }
  .hb-qb7-in { animation: none; }
}
`;

const arrow = "M12 4.4l7.6 8.6h-4.8v6.6H9.2V13H4.4z";

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
      <span className="hb-qb7-count" aria-hidden="true">
        {to}
      </span>
    );
  }
  const from = view.prev.toLocaleString("en-US");
  let p = 0;
  while (p < from.length && p < to.length && from[p] === to[p]) p++;
  return (
    <span className="hb-qb7-count" aria-hidden="true">
      {to.slice(0, p)}
      <span key={view.id} className="hb-qb7-roll" data-up={value > view.prev ? "true" : "false"}>
        <span className="hb-qb7-out">{from.slice(p)}</span>
        <span
          className="hb-qb7-in"
          onAnimationEnd={() => setView((v) => (v.live ? { ...v, live: false } : v))}
        >
          {to.slice(p)}
        </span>
      </span>
    </span>
  );
}

export function VoteArrows({
  score = 0,
  value,
  defaultValue = 0,
  onVote,
  orientation = "vertical",
  upColor = "#ff6a3d",
  downColor = "#7b8cff",
  label = "Vote",
  className = "",
  style,
  ...rest
}: VoteArrowsProps) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<Vote>(defaultValue);
  const current = controlled ? value : inner;
  const [base] = React.useState<Vote>(current);
  const [seen, setSeen] = React.useState({ value: current, pulse: 0 });
  const [shake, setShake] = React.useState(0);

  if (seen.value !== current) {
    setSeen({ value: current, pulse: seen.pulse + 1 });
  }

  const total = score + current - base;

  function vote(dir: 1 | -1) {
    const prev = current;
    const next: Vote = prev === dir ? 0 : dir;
    if (!controlled) setInner(next);
    const result = onVote?.(next, score + next - base);
    if (result && typeof (result as PromiseLike<unknown>).then === "function") {
      (result as PromiseLike<unknown>).then(undefined, () => {
        if (!controlled) setInner(prev);
        setShake((n) => n + 1);
      });
    }
  }

  const tone = current === 1 ? upColor : current === -1 ? downColor : undefined;
  const vars = {
    "--hb-qb7-u": upColor,
    "--hb-qb7-d": downColor,
    "--hb-qb7-t": tone,
    ...style,
  } as React.CSSProperties;

  function pop(dir: 1 | -1) {
    return current === dir && seen.pulse > 0 ? (dir === 1 ? "up" : "down") : undefined;
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={`hb-qb7 ${className}`}
      data-o={orientation}
      style={vars}
      {...rest}
    >
      <style href="hb-vote-arrows" precedence="default">{css}</style>
      <button
        type="button"
        className="hb-qb7-btn hb-qb7-up"
        aria-pressed={current === 1}
        aria-label="Upvote"
        onClick={() => vote(1)}
      >
        <span key={`u${current === 1 ? seen.pulse : 0}`} className="hb-qb7-arrow" data-pop={pop(1)} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d={arrow} />
          </svg>
        </span>
      </button>
      <span key={`s${shake}`} className="hb-qb7-score" data-shake={shake > 0 ? "true" : "false"}>
        <Roll value={total} />
      </span>
      <button
        type="button"
        className="hb-qb7-btn hb-qb7-down"
        aria-pressed={current === -1}
        aria-label="Downvote"
        onClick={() => vote(-1)}
      >
        <span key={`d${current === -1 ? seen.pulse : 0}`} className="hb-qb7-arrow" data-pop={pop(-1)} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d={arrow} transform="rotate(180 12 12)" />
          </svg>
        </span>
      </button>
      <span className="hb-qb7-sr" role="status" aria-live="polite">
        {`Score ${total.toLocaleString("en-US")}`}
      </span>
    </div>
  );
}

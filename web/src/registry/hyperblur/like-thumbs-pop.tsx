"use client";

import * as React from "react";

export interface LikeThumbsPopProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  liked?: boolean;
  defaultLiked?: boolean;
  onLikeChange?: (liked: boolean, count: number) => void;
  color?: string;
  size?: number;
  label?: string;
}

const css = `
.hb-qb2 {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb2 *, .hb-qb2 *::before, .hb-qb2 *::after { box-sizing: border-box; }
.hb-qb2-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-qb2-s) * 0.34);
  margin: 0;
  padding: calc(var(--hb-qb2-s) * 0.3) calc(var(--hb-qb2-s) * 0.62) calc(var(--hb-qb2-s) * 0.3) calc(var(--hb-qb2-s) * 0.5);
  border: 1px solid #262626;
  border-radius: calc(var(--hb-qb2-s) * 0.55);
  background: #171717;
  color: #8f8f8f;
  font: inherit;
  font-size: calc(var(--hb-qb2-s) * 0.6);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
}
.hb-qb2-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-qb2-btn:active { transform: scale(0.96); }
.hb-qb2-btn:focus-visible { outline: 2px solid var(--hb-qb2-c); outline-offset: 3px; }
.hb-qb2-btn[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-qb2-c) 50%, #262626);
  background: color-mix(in srgb, var(--hb-qb2-c) 10%, #171717);
  color: #ededed;
}
.hb-qb2-ico {
  position: relative;
  display: inline-flex;
  width: var(--hb-qb2-s);
  height: var(--hb-qb2-s);
  flex: none;
}
.hb-qb2-hand {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: 22% 88%;
}
.hb-qb2-hand svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
  stroke-linecap: round;
  transition: fill 0.2s ease, stroke 0.2s ease;
}
.hb-qb2-btn[aria-pressed="true"] .hb-qb2-hand svg { fill: var(--hb-qb2-c); stroke: var(--hb-qb2-c); }
.hb-qb2-btn[aria-pressed="true"] .hb-qb2-hand .hb-qb2-cuff { fill: color-mix(in srgb, var(--hb-qb2-c) 55%, #0a0a0a); }
.hb-qb2-hand[data-fx="like"] { animation: hb-qb2-pop 0.8s cubic-bezier(0.3, 1.2, 0.5, 1); }
.hb-qb2-hand[data-fx="unlike"] { animation: hb-qb2-drop 0.35s ease-out; }
@keyframes hb-qb2-pop {
  0% { transform: rotate(0deg) scale(1); }
  26% { transform: rotate(-30deg) translate(-6%, 8%) scale(0.9); }
  56% { transform: rotate(12deg) translate(2%, -10%) scale(1.3); }
  78% { transform: rotate(-4deg) scale(0.97); }
  100% { transform: rotate(0deg) scale(1); }
}
@keyframes hb-qb2-drop {
  0% { transform: rotate(0deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}
.hb-qb2-sparks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hb-qb2-sparks i {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--hb-qb2-s) * 0.3);
  height: 2px;
  margin: -1px 0 0 calc(var(--hb-qb2-s) * -0.15);
  border-radius: 2px;
  background: var(--hb-qb2-c);
  opacity: 0;
  animation: hb-qb2-spark 0.55s ease-out var(--hb-qb2-d) forwards;
}
@keyframes hb-qb2-spark {
  0% { opacity: 0; transform: rotate(var(--hb-qb2-a)) translateX(calc(var(--hb-qb2-s) * 0.55)) scaleX(0.3); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: rotate(var(--hb-qb2-a)) translateX(calc(var(--hb-qb2-s) * 1.05)) scaleX(1); }
}
.hb-qb2-count {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-qb2-roll {
  display: inline-grid;
  overflow: hidden;
  line-height: 1.25;
  margin: -0.125em 0;
}
.hb-qb2-roll > span { grid-area: 1 / 1; display: block; }
.hb-qb2-in { animation: hb-qb2-up-in 0.38s cubic-bezier(0.3, 1.3, 0.5, 1) both; }
.hb-qb2-out { animation: hb-qb2-up-out 0.3s ease-in both; }
.hb-qb2-roll[data-up="false"] .hb-qb2-in { animation-name: hb-qb2-down-in; }
.hb-qb2-roll[data-up="false"] .hb-qb2-out { animation-name: hb-qb2-down-out; }
@keyframes hb-qb2-up-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb2-up-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}
@keyframes hb-qb2-down-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb2-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
.hb-qb2-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb2-btn, .hb-qb2-hand svg { transition: none; }
  .hb-qb2-hand[data-fx] { animation: none; }
  .hb-qb2-sparks { display: none; }
  .hb-qb2-out { display: none; }
  .hb-qb2-in { animation: none; }
}
`;

const cuff = "M3.2 11.2h3.6a.9.9 0 01.9.9v8a.9.9 0 01-.9.9H3.2a.9.9 0 01-.9-.9v-8a.9.9 0 01.9-.9z";
const hand =
  "M9.4 11.4l3-6.6c.5-1.1 1.6-1.7 2.7-1.3 1.1.4 1.7 1.5 1.5 2.7l-.6 3.4h4.2a2 2 0 011.95 2.45l-1.4 6.3a2 2 0 01-1.95 1.55H11.4a2 2 0 01-2-2z";

const SPARKS = [-168, -138, -108, -78, -48, -18].map((a, i) => ({
  a,
  d: 240 + ((i * 53) % 90),
}));

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
      <span className="hb-qb2-count" aria-hidden="true">
        {to}
      </span>
    );
  }
  const from = view.prev.toLocaleString("en-US");
  let p = 0;
  while (p < from.length && p < to.length && from[p] === to[p]) p++;
  return (
    <span className="hb-qb2-count" aria-hidden="true">
      {to.slice(0, p)}
      <span key={view.id} className="hb-qb2-roll" data-up={value > view.prev ? "true" : "false"}>
        <span className="hb-qb2-out">{from.slice(p)}</span>
        <span
          className="hb-qb2-in"
          onAnimationEnd={() => setView((v) => (v.live ? { ...v, live: false } : v))}
        >
          {to.slice(p)}
        </span>
      </span>
    </span>
  );
}

export function LikeThumbsPop({
  count = 0,
  liked,
  defaultLiked = false,
  onLikeChange,
  color = "#2f7bff",
  size = 22,
  label = "Like",
  className = "",
  style,
  ...rest
}: LikeThumbsPopProps) {
  const controlled = liked !== undefined;
  const [inner, setInner] = React.useState(defaultLiked);
  const current = controlled ? liked : inner;
  const [base] = React.useState(current);
  const [seen, setSeen] = React.useState({ liked: current, pulse: 0 });

  if (seen.liked !== current) {
    setSeen({ liked: current, pulse: seen.pulse + 1 });
  }

  const offset = current === base ? 0 : current ? 1 : -1;
  const total = Math.max(0, count + offset);

  function toggle() {
    const next = !current;
    if (!controlled) setInner(next);
    const nextOffset = next === base ? 0 : next ? 1 : -1;
    onLikeChange?.(next, Math.max(0, count + nextOffset));
  }

  const vars = {
    "--hb-qb2-s": `${size}px`,
    "--hb-qb2-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-qb2 ${className}`} style={vars} {...rest}>
      <style href="hb-like-thumbs-pop" precedence="default">{css}</style>
      <button type="button" className="hb-qb2-btn" aria-pressed={current} aria-label={label} onClick={toggle}>
        <span className="hb-qb2-ico" aria-hidden="true">
          <span
            key={`h${seen.pulse}`}
            className="hb-qb2-hand"
            data-fx={seen.pulse === 0 ? undefined : current ? "like" : "unlike"}
          >
            <svg viewBox="0 0 24 24">
              <path className="hb-qb2-cuff" d={cuff} />
              <path d={hand} />
            </svg>
          </span>
          {seen.pulse > 0 && current && (
            <span key={`s${seen.pulse}`} className="hb-qb2-sparks">
              {SPARKS.map((s, i) => (
                <i
                  key={i}
                  style={{ "--hb-qb2-a": `${s.a}deg`, "--hb-qb2-d": `${s.d}ms` } as React.CSSProperties}
                />
              ))}
            </span>
          )}
        </span>
        <Roll value={total} />
      </button>
      <span className="hb-qb2-sr" role="status" aria-live="polite">
        {`${total.toLocaleString("en-US")} ${total === 1 ? "like" : "likes"}`}
      </span>
    </span>
  );
}

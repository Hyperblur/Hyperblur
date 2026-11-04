"use client";

import * as React from "react";

export interface LikeHeartFillProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  liked?: boolean;
  defaultLiked?: boolean;
  onLikeChange?: (liked: boolean, count: number) => void;
  color?: string;
  size?: number;
  label?: string;
}

const css = `
.hb-qb1 {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb1 *, .hb-qb1 *::before, .hb-qb1 *::after { box-sizing: border-box; }
.hb-qb1-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-qb1-s) * 0.3);
  margin: 0;
  padding: calc(var(--hb-qb1-s) * 0.28) calc(var(--hb-qb1-s) * 0.6) calc(var(--hb-qb1-s) * 0.28) calc(var(--hb-qb1-s) * 0.42);
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #8f8f8f;
  font: inherit;
  font-size: calc(var(--hb-qb1-s) * 0.58);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease, transform 0.12s ease;
}
.hb-qb1-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-qb1-btn:active { transform: scale(0.95); }
.hb-qb1-btn:focus-visible { outline: 2px solid var(--hb-qb1-c); outline-offset: 3px; }
.hb-qb1-btn[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-qb1-c) 45%, #262626);
  background: color-mix(in srgb, var(--hb-qb1-c) 9%, #171717);
  color: #ededed;
}
.hb-qb1-ico {
  position: relative;
  display: inline-flex;
  width: var(--hb-qb1-s);
  height: var(--hb-qb1-s);
  flex: none;
}
.hb-qb1-heart {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: 50% 62%;
}
.hb-qb1-btn[aria-pressed="true"] .hb-qb1-heart[data-fx="true"] {
  animation: hb-qb1-beat 0.9s cubic-bezier(0.3, 1.4, 0.5, 1);
}
@keyframes hb-qb1-beat {
  0% { transform: scale(1); }
  22% { transform: scale(0.82); }
  50% { transform: scale(1.22); }
  74% { transform: scale(0.96); }
  100% { transform: scale(1); }
}
.hb-qb1-svg { display: block; width: 100%; height: 100%; overflow: visible; }
.hb-qb1-base { fill: rgba(255, 255, 255, 0.035); stroke: none; }
.hb-qb1-edge {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
  transition: stroke 0.4s ease;
}
.hb-qb1-btn[aria-pressed="true"] .hb-qb1-edge { stroke: var(--hb-qb1-c); }
.hb-qb1-liq {
  transform: translateY(26px);
  transition: transform 0.95s cubic-bezier(0.34, 1.25, 0.5, 1);
}
.hb-qb1-btn[aria-pressed="true"] .hb-qb1-liq { transform: translateY(-1.6px); }
.hb-qb1-w1 { animation: hb-qb1-slide 1.5s linear infinite; }
.hb-qb1-w2 { animation: hb-qb1-slide 2.3s linear infinite reverse; }
.hb-qb1-btn:not([aria-pressed="true"]) .hb-qb1-w1,
.hb-qb1-btn:not([aria-pressed="true"]) .hb-qb1-w2 { animation-play-state: paused; }
@keyframes hb-qb1-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-24px); }
}
.hb-qb1-f1 { fill: var(--hb-qb1-c); }
.hb-qb1-f2 { fill: color-mix(in srgb, var(--hb-qb1-c) 50%, #ffffff); opacity: 0.65; }
.hb-qb1-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--hb-qb1-c);
  opacity: 0;
  pointer-events: none;
  animation: hb-qb1-ring 0.8s ease-out 0.25s forwards;
}
.hb-qb1-ring[data-n="2"] { animation-delay: 0.42s; }
@keyframes hb-qb1-ring {
  0% { opacity: 0.8; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(2.3); }
}
.hb-qb1-count {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-qb1-roll {
  display: inline-grid;
  overflow: hidden;
  line-height: 1.25;
  margin: -0.125em 0;
}
.hb-qb1-roll > span { grid-area: 1 / 1; display: block; }
.hb-qb1-in { animation: hb-qb1-up-in 0.38s cubic-bezier(0.3, 1.3, 0.5, 1) both; }
.hb-qb1-out { animation: hb-qb1-up-out 0.3s ease-in both; }
.hb-qb1-roll[data-up="false"] .hb-qb1-in { animation-name: hb-qb1-down-in; }
.hb-qb1-roll[data-up="false"] .hb-qb1-out { animation-name: hb-qb1-down-out; }
@keyframes hb-qb1-up-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb1-up-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}
@keyframes hb-qb1-down-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-qb1-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
.hb-qb1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb1-btn, .hb-qb1-edge, .hb-qb1-liq { transition: none; }
  .hb-qb1-w1, .hb-qb1-w2 { animation: none; }
  .hb-qb1-btn[aria-pressed="true"] .hb-qb1-heart[data-fx="true"] { animation: none; }
  .hb-qb1-ring { display: none; }
  .hb-qb1-out { display: none; }
  .hb-qb1-in { animation: none; }
}
`;

const heart =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const waveFront = "M0 3Q6 0.2 12 3T24 3T36 3T48 3V32H0Z";
const waveBack = "M0 3.4Q6 6.2 12 3.4T24 3.4T36 3.4T48 3.4V32H0Z";

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
      <span className="hb-qb1-count" aria-hidden="true">
        {to}
      </span>
    );
  }
  const from = view.prev.toLocaleString("en-US");
  let p = 0;
  while (p < from.length && p < to.length && from[p] === to[p]) p++;
  return (
    <span className="hb-qb1-count" aria-hidden="true">
      {to.slice(0, p)}
      <span key={view.id} className="hb-qb1-roll" data-up={value > view.prev ? "true" : "false"}>
        <span className="hb-qb1-out">{from.slice(p)}</span>
        <span
          className="hb-qb1-in"
          onAnimationEnd={() => setView((v) => (v.live ? { ...v, live: false } : v))}
        >
          {to.slice(p)}
        </span>
      </span>
    </span>
  );
}

export function LikeHeartFill({
  count = 0,
  liked,
  defaultLiked = false,
  onLikeChange,
  color = "#ff4d6d",
  size = 28,
  label = "Like",
  className = "",
  style,
  ...rest
}: LikeHeartFillProps) {
  const uid = React.useId();
  const controlled = liked !== undefined;
  const [inner, setInner] = React.useState(defaultLiked);
  const current = controlled ? liked : inner;
  const [base] = React.useState(current);
  const [seen, setSeen] = React.useState({ liked: current, pulse: 0 });

  if (seen.liked !== current) {
    setSeen({ liked: current, pulse: current ? seen.pulse + 1 : seen.pulse });
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
    "--hb-qb1-s": `${size}px`,
    "--hb-qb1-c": color,
    ...style,
  } as React.CSSProperties;

  const clip = `hb-qb1-${uid.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <span className={`hb-qb1 ${className}`} style={vars} {...rest}>
      <style href="hb-like-heart-fill" precedence="default">{css}</style>
      <button type="button" className="hb-qb1-btn" aria-pressed={current} aria-label={label} onClick={toggle}>
        <span className="hb-qb1-ico" aria-hidden="true">
          <span className="hb-qb1-heart" data-fx={seen.pulse > 0 ? "true" : "false"}>
            <svg className="hb-qb1-svg" viewBox="0 0 24 24">
              <defs>
                <clipPath id={clip}>
                  <path d={heart} />
                </clipPath>
              </defs>
              <path className="hb-qb1-base" d={heart} />
              <g clipPath={`url(#${clip})`}>
                <g className="hb-qb1-liq">
                  <g className="hb-qb1-w2">
                    <path className="hb-qb1-f2" d={waveBack} />
                  </g>
                  <g className="hb-qb1-w1">
                    <path className="hb-qb1-f1" d={waveFront} />
                  </g>
                </g>
              </g>
              <path className="hb-qb1-edge" d={heart} />
            </svg>
          </span>
          {seen.pulse > 0 && current && (
            <>
              <span key={`r${seen.pulse}`} className="hb-qb1-ring" />
              <span key={`q${seen.pulse}`} className="hb-qb1-ring" data-n="2" />
            </>
          )}
        </span>
        <Roll value={total} />
      </button>
      <span className="hb-qb1-sr" role="status" aria-live="polite">
        {`${total.toLocaleString("en-US")} ${total === 1 ? "like" : "likes"}`}
      </span>
    </span>
  );
}

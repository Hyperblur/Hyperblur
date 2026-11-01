"use client";

import * as React from "react";

export interface LikeBurstProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "defaultValue"> {
  count?: number;
  liked?: boolean;
  defaultLiked?: boolean;
  onChange?: (liked: boolean, count: number) => void;
  color?: string;
  size?: number;
  label?: string;
}

interface Roll {
  from: string;
  to: string;
  up: boolean;
  id: number;
}

interface View {
  total: number;
  liked: boolean;
  text: string;
  bump: number;
  burst: number;
  roll: Roll | null;
}

const css = `
.hb-lb {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  font-family: inherit;
}
.hb-lb-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-s) * 0.32);
  margin: 0;
  padding: calc(var(--hb-s) * 0.3) calc(var(--hb-s) * 0.55) calc(var(--hb-s) * 0.3) calc(var(--hb-s) * 0.45);
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #8f8f8f;
  font: inherit;
  font-size: calc(var(--hb-s) * 0.6);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
}
.hb-lb-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-lb-btn:active { transform: scale(0.96); }
.hb-lb-btn:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-lb-btn[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-c) 45%, #262626);
  background: color-mix(in srgb, var(--hb-c) 10%, #171717);
  color: #ededed;
}
.hb-lb-ico {
  position: relative;
  display: inline-flex;
  width: var(--hb-s);
  height: var(--hb-s);
  flex: none;
}
.hb-lb-heart {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: 50% 60%;
}
.hb-lb-heart svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linejoin: round;
}
.hb-lb-btn[aria-pressed="true"] .hb-lb-heart svg {
  fill: var(--hb-c);
  stroke: var(--hb-c);
}
.hb-lb-heart[data-pop="like"] { animation: hb-lb-pop 0.55s cubic-bezier(0.3, 1.5, 0.5, 1); }
.hb-lb-heart[data-pop="unlike"] { animation: hb-lb-shrink 0.3s ease-out; }
@keyframes hb-lb-pop {
  0% { transform: scale(0.55); }
  40% { transform: scale(1.38); }
  68% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
@keyframes hb-lb-shrink {
  0% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
.hb-lb-burst {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hb-lb-burst i {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-ps);
  height: var(--hb-ps);
  margin: calc(var(--hb-ps) / -2) 0 0 calc(var(--hb-ps) / -2);
  border-radius: 50%;
  background: var(--hb-pc);
  opacity: 0;
  animation: hb-lb-fly 0.62s cubic-bezier(0.1, 0.7, 0.3, 1) var(--hb-dl) forwards;
}
.hb-lb-burst b {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--hb-c);
  opacity: 0;
  animation: hb-lb-ring 0.5s ease-out forwards;
}
@keyframes hb-lb-fly {
  0% { opacity: 1; transform: translate(0, 0) scale(0.6); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--hb-x), var(--hb-y)) scale(0.2); }
}
@keyframes hb-lb-ring {
  0% { opacity: 0.7; transform: scale(0.4); }
  100% { opacity: 0; transform: scale(1.9); }
}
.hb-lb-count {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-lb-roll {
  display: inline-grid;
  overflow: hidden;
  line-height: 1.25;
  margin: -0.125em 0;
}
.hb-lb-roll > span { grid-area: 1 / 1; display: block; }
.hb-lb-in { animation: hb-lb-up-in 0.38s cubic-bezier(0.3, 1.3, 0.5, 1) both; }
.hb-lb-out { animation: hb-lb-up-out 0.3s ease-in both; }
.hb-lb-roll[data-up="false"] .hb-lb-in { animation-name: hb-lb-down-in; }
.hb-lb-roll[data-up="false"] .hb-lb-out { animation-name: hb-lb-down-out; }
@keyframes hb-lb-up-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-lb-up-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}
@keyframes hb-lb-down-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes hb-lb-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
.hb-lb-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-lb-btn { transition: none; }
  .hb-lb-heart[data-pop] { animation: none; }
  .hb-lb-burst { display: none; }
  .hb-lb-out { display: none; }
  .hb-lb-in { animation: none; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2 + (hash(i) - 0.5) * 0.5;
  const reach = 0.95 + hash(i + 20) * 0.65;
  return {
    x: Math.cos(angle) * reach,
    y: Math.sin(angle) * reach,
    s: 0.12 + hash(i + 40) * 0.1,
    d: Math.round(hash(i + 60) * 60),
    soft: i % 2 === 1,
  };
});

const heart =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export function LikeBurst({
  count = 0,
  liked,
  defaultLiked = false,
  onChange,
  color = "#ff4d6d",
  size = 24,
  label = "Like",
  className = "",
  style,
  ...rest
}: LikeBurstProps) {
  const controlled = liked !== undefined;
  const [inner, setInner] = React.useState(defaultLiked);
  const current = controlled ? liked : inner;
  const [base] = React.useState(current);

  const offset = current === base ? 0 : current ? 1 : -1;
  const total = Math.max(0, count + offset);
  const text = total.toLocaleString("en-US");

  const [view, setView] = React.useState<View>({
    total,
    liked: current,
    text,
    bump: 0,
    burst: 0,
    roll: null,
  });

  if (view.total !== total || view.liked !== current) {
    const bump = view.bump + 1;
    setView({
      total,
      liked: current,
      text,
      bump,
      burst: current && !view.liked ? view.burst + 1 : view.burst,
      roll:
        view.text !== text
          ? { from: view.text, to: text, up: total > view.total, id: bump }
          : view.roll,
    });
  }

  function toggle() {
    const next = !current;
    if (!controlled) setInner(next);
    const nextOffset = next === base ? 0 : next ? 1 : -1;
    onChange?.(next, Math.max(0, count + nextOffset));
  }

  function endRoll() {
    setView((v) => (v.roll ? { ...v, roll: null } : v));
  }

  const roll = view.roll;
  let prefix = view.text;
  let tail: React.ReactNode = null;
  if (roll) {
    let p = 0;
    while (p < roll.from.length && p < roll.to.length && roll.from[p] === roll.to[p]) p++;
    prefix = roll.to.slice(0, p);
    tail = (
      <span key={roll.id} className="hb-lb-roll" data-up={roll.up ? "true" : "false"}>
        <span className="hb-lb-out">{roll.from.slice(p)}</span>
        <span className="hb-lb-in" onAnimationEnd={endRoll}>
          {roll.to.slice(p)}
        </span>
      </span>
    );
  }

  const vars = {
    "--hb-s": `${size}px`,
    "--hb-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-lb ${className}`} style={vars} {...rest}>
      <style href="hb-like-burst" precedence="default">{css}</style>
      <button type="button" className="hb-lb-btn" aria-pressed={current} aria-label={label} onClick={toggle}>
        <span className="hb-lb-ico" aria-hidden="true">
          <span
            key={`h${view.bump}`}
            className="hb-lb-heart"
            data-pop={view.bump > 0 ? (current ? "like" : "unlike") : undefined}
          >
            <svg viewBox="0 0 24 24">
              <path d={heart} />
            </svg>
          </span>
          {view.burst > 0 && (
            <span key={`b${view.burst}`} className="hb-lb-burst">
              <b />
              {PARTICLES.map((p, i) => (
                <i
                  key={i}
                  style={
                    {
                      "--hb-x": `${(p.x * size).toFixed(2)}px`,
                      "--hb-y": `${(p.y * size).toFixed(2)}px`,
                      "--hb-ps": `${(p.s * size).toFixed(2)}px`,
                      "--hb-dl": `${p.d}ms`,
                      "--hb-pc": p.soft ? "color-mix(in srgb, var(--hb-c) 55%, #ffffff)" : "var(--hb-c)",
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          )}
        </span>
        <span className="hb-lb-count" aria-hidden="true">
          {prefix}
          {tail}
        </span>
      </button>
      <span className="hb-lb-sr" role="status" aria-live="polite">
        {`${text} ${total === 1 ? "like" : "likes"}`}
      </span>
    </span>
  );
}

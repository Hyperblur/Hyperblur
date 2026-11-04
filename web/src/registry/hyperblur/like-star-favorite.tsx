"use client";

import * as React from "react";

export interface LikeStarFavoriteProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "defaultValue"> {
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  color?: string;
  size?: number;
  label?: string;
  toast?: string;
  showToast?: boolean;
  toastSide?: "right" | "left" | "top";
}

const css = `
.hb-qb4 {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb4 *, .hb-qb4 *::before, .hb-qb4 *::after { box-sizing: border-box; }
.hb-qb4-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--hb-qb4-s) * 1.7);
  height: calc(var(--hb-qb4-s) * 1.7);
  margin: 0;
  padding: 0;
  border: 1px solid #262626;
  border-radius: 50%;
  background: #171717;
  color: #8f8f8f;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.25s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.3s ease, transform 0.12s ease;
}
.hb-qb4-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-qb4-btn:active { transform: scale(0.92); }
.hb-qb4-btn:focus-visible { outline: 2px solid var(--hb-qb4-c); outline-offset: 3px; }
.hb-qb4-btn[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-qb4-c) 50%, #262626);
  background: color-mix(in srgb, var(--hb-qb4-c) 10%, #171717);
  color: var(--hb-qb4-c);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qb4-c) 12%, transparent);
}
.hb-qb4-star {
  display: block;
  width: var(--hb-qb4-s);
  height: var(--hb-qb4-s);
}
.hb-qb4-star svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
  transition: fill 0.25s ease;
}
.hb-qb4-btn[aria-pressed="true"] .hb-qb4-star svg { fill: var(--hb-qb4-c); }
.hb-qb4-star[data-fx="on"] { animation: hb-qb4-spin 0.75s cubic-bezier(0.25, 1.1, 0.4, 1); }
.hb-qb4-star[data-fx="off"] { animation: hb-qb4-off 0.3s ease-out; }
@keyframes hb-qb4-spin {
  0% { transform: rotate(0deg) scale(0.6); }
  45% { transform: rotate(210deg) scale(1.4); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes hb-qb4-off {
  0% { transform: rotate(0deg) scale(1.18); }
  100% { transform: rotate(-72deg) scale(1); }
}
.hb-qb4-spray {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hb-qb4-bit {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-qb4-w);
  height: var(--hb-qb4-w);
  margin: calc(var(--hb-qb4-w) / -2) 0 0 calc(var(--hb-qb4-w) / -2);
  opacity: 0;
  animation: hb-qb4-fly 0.8s cubic-bezier(0.1, 0.7, 0.3, 1) var(--hb-qb4-d) forwards;
}
.hb-qb4-bit svg { display: block; width: 100%; height: 100%; fill: var(--hb-qb4-k); }
@keyframes hb-qb4-fly {
  0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(0.3); }
  60% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--hb-qb4-x), var(--hb-qb4-y)) rotate(var(--hb-qb4-r)) scale(1); }
}
.hb-qb4-toast {
  position: absolute;
  top: 50%;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px 7px 8px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
  animation: hb-qb4-toast-r 2.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
}
.hb-qb4-toast[data-side="right"] { left: calc(100% + 12px); }
.hb-qb4-toast[data-side="left"] { right: calc(100% + 12px); animation-name: hb-qb4-toast-l; }
.hb-qb4-toast[data-side="top"] { top: auto; bottom: calc(100% + 12px); left: 50%; animation-name: hb-qb4-toast-t; }
.hb-qb4-toast svg {
  width: 14px;
  height: 14px;
  flex: none;
  padding: 2px;
  border-radius: 50%;
  background: var(--hb-qb4-c);
  fill: none;
  stroke: #0a0a0a;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@keyframes hb-qb4-toast-r {
  0% { opacity: 0; transform: translate(-10px, -50%) scale(0.92); }
  10% { opacity: 1; transform: translate(0, -50%) scale(1); }
  86% { opacity: 1; transform: translate(0, -50%) scale(1); }
  100% { opacity: 0; transform: translate(6px, -50%) scale(0.96); }
}
@keyframes hb-qb4-toast-l {
  0% { opacity: 0; transform: translate(10px, -50%) scale(0.92); }
  10% { opacity: 1; transform: translate(0, -50%) scale(1); }
  86% { opacity: 1; transform: translate(0, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-6px, -50%) scale(0.96); }
}
@keyframes hb-qb4-toast-t {
  0% { opacity: 0; transform: translate(-50%, 10px) scale(0.92); }
  10% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  86% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -6px) scale(0.96); }
}
.hb-qb4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb4-btn, .hb-qb4-star svg { transition: none; }
  .hb-qb4-star[data-fx] { animation: none; }
  .hb-qb4-spray { display: none; }
  .hb-qb4-toast { animation: none; opacity: 1; }
  .hb-qb4-toast[data-side="right"], .hb-qb4-toast[data-side="left"] { transform: translateY(-50%); }
  .hb-qb4-toast[data-side="top"] { transform: translateX(-50%); }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

function starPath(cx: number, cy: number, outer: number, inner: number) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    d += `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
  }
  return `${d}Z`;
}

const bigStar = starPath(12, 12.9, 9.6, 4.3);
const bitStar = starPath(12, 12.9, 11, 5);

const BITS = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * Math.PI * 2 + (hash(i) - 0.5) * 0.6;
  const reach = 1.05 + hash(i + 11) * 0.55;
  return {
    x: Math.cos(angle) * reach,
    y: Math.sin(angle) * reach,
    w: 0.26 + hash(i + 23) * 0.2,
    r: Math.round((hash(i + 37) - 0.5) * 420),
    d: Math.round(hash(i + 53) * 90),
    soft: i % 3 === 1,
  };
});

export function LikeStarFavorite({
  active,
  defaultActive = false,
  onActiveChange,
  color = "#ffc83d",
  size = 24,
  label = "Favorite",
  toast = "Added to favorites",
  showToast = true,
  toastSide = "right",
  className = "",
  style,
  ...rest
}: LikeStarFavoriteProps) {
  const controlled = active !== undefined;
  const [inner, setInner] = React.useState(defaultActive);
  const current = controlled ? active : inner;
  const [seen, setSeen] = React.useState({ active: current, pulse: 0 });
  const [shown, setShown] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  if (seen.active !== current) {
    setSeen({ active: current, pulse: seen.pulse + 1 });
  }

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function toggle() {
    const next = !current;
    if (!controlled) setInner(next);
    onActiveChange?.(next);
    window.clearTimeout(timer.current);
    if (next && showToast) {
      setShown(true);
      timer.current = window.setTimeout(() => setShown(false), 2200);
    } else {
      setShown(false);
    }
  }

  const vars = {
    "--hb-qb4-s": `${size}px`,
    "--hb-qb4-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-qb4 ${className}`} style={vars} {...rest}>
      <style href="hb-like-star-favorite" precedence="default">{css}</style>
      <button type="button" className="hb-qb4-btn" aria-pressed={current} aria-label={label} onClick={toggle}>
        <span
          key={`s${seen.pulse}`}
          className="hb-qb4-star"
          data-fx={seen.pulse === 0 ? undefined : current ? "on" : "off"}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <path d={bigStar} />
          </svg>
        </span>
        {seen.pulse > 0 && current && (
          <span key={`p${seen.pulse}`} className="hb-qb4-spray" aria-hidden="true">
            {BITS.map((b, i) => (
              <i
                key={i}
                className="hb-qb4-bit"
                style={
                  {
                    "--hb-qb4-x": `${(b.x * size).toFixed(2)}px`,
                    "--hb-qb4-y": `${(b.y * size).toFixed(2)}px`,
                    "--hb-qb4-w": `${(b.w * size).toFixed(2)}px`,
                    "--hb-qb4-r": `${b.r}deg`,
                    "--hb-qb4-d": `${b.d}ms`,
                    "--hb-qb4-k": b.soft ? "color-mix(in srgb, var(--hb-qb4-c) 45%, #ffffff)" : "var(--hb-qb4-c)",
                  } as React.CSSProperties
                }
              >
                <svg viewBox="0 0 24 24">
                  <path d={bitStar} />
                </svg>
              </i>
            ))}
          </span>
        )}
      </button>
      {shown && (
        <span key={`t${seen.pulse}`} className="hb-qb4-toast" data-side={toastSide} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M3.5 8.5l3 3 6-6.5" />
          </svg>
          {toast}
        </span>
      )}
      <span className="hb-qb4-sr" role="status" aria-live="polite">
        {seen.pulse === 0 ? "" : current ? toast : "Removed from favorites"}
      </span>
    </span>
  );
}

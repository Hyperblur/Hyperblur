"use client";

import * as React from "react";

export interface MicroHalfStarRatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: number;
  accent?: string;
  labels?: string[];
  showValue?: boolean;
  readOnly?: boolean;
  label?: string;
  onChange?: (value: number) => void;
}

const css = `
.hb-wf11 {
  --hb-wf11-c: #ffb547;
  --hb-wf11-s: 30px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  user-select: none;
  -webkit-user-select: none;
}
.hb-wf11 *, .hb-wf11 *::before, .hb-wf11 *::after { box-sizing: border-box; }
.hb-wf11-row {
  position: relative;
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  touch-action: none;
}
.hb-wf11[data-ro="true"] .hb-wf11-row { cursor: default; }
.hb-wf11-row:focus-visible { box-shadow: 0 0 0 2px var(--hb-wf11-c); }
.hb-wf11-st {
  position: relative;
  width: var(--hb-wf11-s);
  height: var(--hb-wf11-s);
  transition: transform 0.25s cubic-bezier(0.3, 1.7, 0.45, 1);
}
.hb-wf11-st svg { position: absolute; left: 0; top: 0; width: var(--hb-wf11-s); height: var(--hb-wf11-s); display: block; }
.hb-wf11-bg path { fill: #1d1d1d; stroke: #333; stroke-width: 1.2; }
.hb-wf11-fl {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--hb-wf11-d);
}
.hb-wf11-fl path { fill: var(--hb-wf11-c); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-wf11-c) 50%, transparent)); }
.hb-wf11-fl .hb-wf11-hi { fill: #fff; opacity: 0.35; filter: none; }
.hb-wf11[data-preview="true"] .hb-wf11-fl { transition-delay: 0s; transition-duration: 0.12s; }
.hb-wf11[data-preview="true"] .hb-wf11-fl path { fill: color-mix(in srgb, var(--hb-wf11-c) 70%, #fff); }
.hb-wf11-st[data-hot="true"] { transform: scale(1.14); }
.hb-wf11-st[data-pop="a"] { animation: hb-wf11-pop 0.55s cubic-bezier(0.2, 1.8, 0.4, 1); }
.hb-wf11-st[data-pop="b"] { animation: hb-wf11-pop2 0.55s cubic-bezier(0.2, 1.8, 0.4, 1); }
@keyframes hb-wf11-pop { 0% { transform: scale(0.7) rotate(-14deg); } 55% { transform: scale(1.3) rotate(6deg); } 100% { transform: none; } }
@keyframes hb-wf11-pop2 { 0% { transform: scale(0.7) rotate(14deg); } 55% { transform: scale(1.3) rotate(-6deg); } 100% { transform: none; } }
.hb-wf11-pt {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-wf11-z);
  height: var(--hb-wf11-z);
  margin: calc(var(--hb-wf11-z) / -2) 0 0 calc(var(--hb-wf11-z) / -2);
  background: var(--hb-wf11-pc);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  pointer-events: none;
  animation: hb-wf11-burst 0.75s cubic-bezier(0.15, 0.7, 0.3, 1) both;
}
.hb-wf11-pt[data-round="true"] { clip-path: circle(50%); }
@keyframes hb-wf11-burst {
  0% { transform: translate(0, 0) scale(0.2) rotate(0deg); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translate(var(--hb-wf11-x), var(--hb-wf11-y)) scale(1) rotate(var(--hb-wf11-r)); opacity: 0; }
}
.hb-wf11-ro { display: flex; flex-direction: column; gap: 3px; min-width: 64px; }
.hb-wf11-v { font-family: var(--font-mono), ui-monospace, monospace; font-size: 18px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-wf11-v small { font-size: 11px; color: #6f6f6f; font-weight: 500; margin-left: 2px; }
.hb-wf11-w { font-size: 11.5px; color: #9a9a9a; line-height: 1; height: 12px; overflow: hidden; }
.hb-wf11-w span { display: block; animation: hb-wf11-w 0.3s cubic-bezier(0.2, 1.3, 0.4, 1); }
@keyframes hb-wf11-w { from { transform: translateY(100%); opacity: 0; } to { transform: none; opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-wf11-st, .hb-wf11-fl { transition: none; }
  .hb-wf11-st[data-pop], .hb-wf11-w span { animation: none; }
  .hb-wf11-pt { display: none; }
}
`;

const star = "M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";
const shine = "M9.6 8.2l1.4-3 .9 1.9z";
const tones = ["#ffb547", "#ffd27a", "#ff8a3d", "#fff1c9"];
const defaultLabels = ["Terrible", "Bad", "Poor", "Below average", "Okay", "Decent", "Good", "Very good", "Great", "Outstanding"];

export function MicroHalfStarRating({
  value,
  defaultValue = 3.5,
  max = 5,
  size = 30,
  accent = "#ffb547",
  labels = defaultLabels,
  showValue = true,
  readOnly = false,
  label = "Rating",
  onChange,
  className = "",
  style,
  ...rest
}: MicroHalfStarRatingProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value ?? inner;
  const [hover, setHover] = React.useState<number | null>(null);
  const [burst, setBurst] = React.useState<{ id: number; at: number } | null>(null);
  const rowRef = React.useRef<HTMLDivElement>(null);
  const shown = hover ?? v;

  React.useEffect(() => {
    if (!burst) return;
    const t = window.setTimeout(() => setBurst(null), 800);
    return () => window.clearTimeout(t);
  }, [burst]);

  const fromX = (clientX: number) => {
    const el = rowRef.current;
    if (!el) return v;
    const r = el.getBoundingClientRect();
    const x = clientX - r.left - 4;
    const unit = size + 4;
    const raw = x / unit;
    const idx = Math.floor(raw);
    const frac = raw - idx;
    const val = idx + (frac < (size / unit) * 0.5 ? 0.5 : 1);
    return Math.max(0.5, Math.min(max, val));
  };

  const commit = (next: number) => {
    if (readOnly) return;
    const c = Math.max(0, Math.min(max, Math.round(next * 2) / 2));
    if (value === undefined) setInner(c);
    onChange?.(c);
    if (c > 0) setBurst((b) => ({ id: (b?.id ?? 0) + 1, at: Math.ceil(c) - 1 }));
  };

  const word = shown > 0 ? labels[Math.min(labels.length - 1, Math.round((shown / max) * labels.length) - 1)] ?? "" : "No rating";

  return (
    <div
      className={`hb-wf11 ${className}`}
      data-preview={hover !== null}
      data-ro={readOnly}
      style={{ ...style, ["--hb-wf11-c" as string]: accent, ["--hb-wf11-s" as string]: `${size}px` }}
      {...rest}
    >
      <style href="hb-micro-half-star-rating" precedence="default">
        {css}
      </style>
      <div
        ref={rowRef}
        className="hb-wf11-row"
        role="slider"
        tabIndex={readOnly ? -1 : 0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={v}
        aria-valuetext={`${v} out of ${max}`}
        aria-readonly={readOnly || undefined}
        onPointerMove={(e) => {
          if (!readOnly && e.pointerType === "mouse") setHover(fromX(e.clientX));
        }}
        onPointerLeave={() => setHover(null)}
        onPointerUp={(e) => {
          if (readOnly) return;
          commit(fromX(e.clientX));
          if (e.pointerType !== "mouse") setHover(null);
        }}
        onKeyDown={(e) => {
          if (readOnly) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            commit(v + 0.5);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            commit(v - 0.5);
          } else if (e.key === "Home") {
            e.preventDefault();
            commit(0.5);
          } else if (e.key === "End") {
            e.preventDefault();
            commit(max);
          } else if (/^[0-9]$/.test(e.key)) {
            commit(Number(e.key));
          }
        }}
      >
        {Array.from({ length: max }, (_, i) => {
          const f = Math.max(0, Math.min(1, shown - i));
          const hot = hover !== null && Math.ceil(hover) - 1 === i;
          return (
            <span
              key={i}
              className="hb-wf11-st"
              data-hot={hot}
              data-pop={burst && burst.at === i ? (burst.id % 2 ? "a" : "b") : undefined}
              style={{ ["--hb-wf11-d" as string]: `${hover !== null ? 0 : i * 55}ms` }}
              aria-hidden="true"
            >
              <svg className="hb-wf11-bg" viewBox="0 0 24 24">
                <path d={star} strokeLinejoin="round" />
              </svg>
              <span className="hb-wf11-fl" style={{ width: `${(f * 100).toFixed(0)}%` }}>
                <svg viewBox="0 0 24 24">
                  <path d={star} strokeLinejoin="round" />
                  <path className="hb-wf11-hi" d={shine} />
                </svg>
              </span>
              {burst && burst.at === i ? (
                <React.Fragment key={burst.id}>
                  {Array.from({ length: 12 }, (_, k) => {
                    const h = Math.imul(k + 1 + burst.id * 17, 2654435761) >>> 0;
                    const ang = (k / 12) * Math.PI * 2 + ((h % 100) / 100 - 0.5) * 0.5;
                    const dist = size * (0.9 + ((h >>> 8) % 100) / 110);
                    return (
                      <span
                        key={k}
                        className="hb-wf11-pt"
                        data-round={k % 3 === 0}
                        style={{
                          ["--hb-wf11-x" as string]: `${(Math.cos(ang) * dist).toFixed(1)}px`,
                          ["--hb-wf11-y" as string]: `${(Math.sin(ang) * dist).toFixed(1)}px`,
                          ["--hb-wf11-r" as string]: `${(h % 360) - 180}deg`,
                          ["--hb-wf11-z" as string]: `${(k % 3 === 0 ? 4 : 6 + ((h >>> 4) % 4)).toFixed(0)}px`,
                          ["--hb-wf11-pc" as string]: k % 4 === 0 ? accent : tones[k % tones.length],
                        }}
                      />
                    );
                  })}
                </React.Fragment>
              ) : null}
            </span>
          );
        })}
      </div>
      {showValue ? (
        <div className="hb-wf11-ro" aria-hidden="true">
          <span className="hb-wf11-v">
            {shown.toFixed(1)}
            <small>/ {max}</small>
          </span>
          <span className="hb-wf11-w">
            <span key={word}>{word}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

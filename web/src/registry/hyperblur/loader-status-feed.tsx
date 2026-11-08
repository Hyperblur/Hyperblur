"use client";

import * as React from "react";

export interface LoaderStatusFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: string[];
  step?: number;
  visible?: number;
  typeSpeed?: number;
  hold?: number;
  color?: string;
  accent?: string;
  label?: string;
}

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x2c1b3c6d) >>> 0;
  x = Math.imul(x ^ (x >>> 12), 0x297a2d39) >>> 0;
  return ((x ^ (x >>> 15)) >>> 0) / 4294967295;
}

const css = `
.hb-vk7 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  --hb-vk7-lh: 24px;
}
.hb-vk7 *, .hb-vk7 *::before, .hb-vk7 *::after { box-sizing: border-box; }
.hb-vk7-win {
  position: relative;
  height: calc(var(--hb-vk7-lh) * var(--hb-vk7-v));
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 calc(var(--hb-vk7-lh) * 0.7));
  mask-image: linear-gradient(180deg, transparent 0, #000 calc(var(--hb-vk7-lh) * 0.7));
}
.hb-vk7-list {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  animation: hb-vk7-scroll 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vk7-row {
  display: flex;
  align-items: center;
  gap: 9px;
  height: var(--hb-vk7-lh);
  min-width: 0;
  font-size: 12.5px;
  line-height: 1;
}
.hb-vk7-ic {
  position: relative;
  flex: none;
  width: 14px;
  height: 14px;
  display: grid;
  place-items: center;
}
.hb-vk7-ic svg { display: block; width: 14px; height: 14px; }
.hb-vk7-spin {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, var(--hb-vk7-c) 25%, transparent);
  border-top-color: var(--hb-vk7-a);
  animation: hb-vk7-rot 700ms linear infinite;
}
.hb-vk7-tx { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-vk7-row[data-done="true"] .hb-vk7-tx { color: #8f8f8f; }
.hb-vk7-tm { flex: none; font-size: 11px; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-vk7-car {
  display: inline-block;
  width: 7px;
  height: 13px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--hb-vk7-a);
  border-radius: 1px;
  animation: hb-vk7-caret 1s steps(1) infinite;
}
.hb-vk7-chk path {
  stroke-dasharray: 14;
  stroke-dashoffset: 0;
  animation: hb-vk7-draw 360ms cubic-bezier(0.65, 0, 0.35, 1);
}
.hb-vk7-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk7-scroll { from { transform: translateY(var(--hb-vk7-lh)); } }
@keyframes hb-vk7-rot { to { transform: rotate(360deg); } }
@keyframes hb-vk7-caret { 50% { opacity: 0; } }
@keyframes hb-vk7-draw { from { stroke-dashoffset: 14; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vk7-list, .hb-vk7-spin, .hb-vk7-car, .hb-vk7-chk path { animation: none; }
}
`;

const defaultSteps = [
  "Reading 14 files in src/checkout",
  "Tracing the failing test",
  "Planning a fix for rounding",
  "Editing cart-total.ts",
  "Running 212 tests",
  "Writing the summary",
];

export function LoaderStatusFeed({
  steps = defaultSteps,
  step,
  visible = 4,
  typeSpeed = 26,
  hold = 700,
  color = "#2f7bff",
  accent = "#7fb3ff",
  label = "Working",
  className = "",
  style,
  ...rest
}: LoaderStatusFeedProps) {
  const list = steps.length ? steps : defaultSteps;
  const controlled = typeof step === "number" && Number.isFinite(step);
  const [auto, setAuto] = React.useState(0);
  const [typed, setTyped] = React.useState({ idx: 0, chars: 0 });
  const [still, setStill] = React.useState(false);
  const idx = Math.max(0, Math.min(list.length - 1, controlled ? Math.floor(step as number) : auto));
  const text = list[idx];
  const chars = still ? text.length : typed.idx === idx ? typed.chars : 0;
  const done = controlled && (step as number) >= list.length;

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    if (still) return;
    let id = 0;
    if (chars < text.length) {
      id = window.setTimeout(() => setTyped({ idx, chars: chars + 1 }), typeSpeed);
    } else if (!controlled) {
      const last = idx >= list.length - 1;
      id = window.setTimeout(() => {
        setAuto(last ? 0 : idx + 1);
        setTyped({ idx: last ? 0 : idx + 1, chars: 0 });
      }, last ? hold * 3 : hold + Math.round(hash(idx) * hold));
    }
    return () => window.clearTimeout(id);
  }, [still, chars, text, idx, controlled, list.length, typeSpeed, hold]);

  const v = Math.max(1, Math.min(10, Math.round(visible)));
  const finished = done || (still && !controlled);
  const end = finished ? list.length - 1 : idx;
  const start = Math.max(0, end - v);
  const rows = [];
  for (let i = start; i <= end; i++) rows.push(i);

  const vars = {
    "--hb-vk7-c": color,
    "--hb-vk7-a": accent,
    "--hb-vk7-v": v,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-status-feed" precedence="default">{css}</style>
      <div className={`hb-vk7 ${className}`} style={vars} {...rest}>
        <span className="hb-vk7-sr" role="status">
          {finished ? `${label}: done` : `${label}: ${text}`}
        </span>
        <div className="hb-vk7-win" aria-hidden="true">
          <div className="hb-vk7-list" key={end}>
            {rows.map((i) => {
              const isDone = finished || i < idx;
              return (
                <div className="hb-vk7-row" data-done={isDone} key={i}>
                  <span className="hb-vk7-ic">
                    {isDone ? (
                      <svg className="hb-vk7-chk" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.25" stroke={color} strokeOpacity="0.35" />
                        <path d="M4.2 7.2l1.9 1.9 3.7-3.9" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="hb-vk7-spin" />
                    )}
                  </span>
                  <span className="hb-vk7-tx">
                    {isDone ? list[i] : list[i].slice(0, chars)}
                    {!isDone ? <span className="hb-vk7-car" /> : null}
                  </span>
                  {isDone ? <span className="hb-vk7-tm">{(0.4 + hash(i + 3) * 2.6).toFixed(1)}s</span> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

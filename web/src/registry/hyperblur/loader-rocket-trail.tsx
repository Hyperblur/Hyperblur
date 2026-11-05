"use client";

import * as React from "react";

export interface LoaderRocketTrailProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const PATH_UNITS = [8, 68, 10, 30, 40, 8, 92, 14];
const TRAIL = [
  { len: 38, alpha: 0.2 },
  { len: 28, alpha: 0.26 },
  { len: 19, alpha: 0.34 },
  { len: 10, alpha: 0.5 },
];

function pathAt(k: number): string {
  const v = PATH_UNITS.map((n) => (n * k).toFixed(2));
  return `M ${v[0]} ${v[1]} C ${v[2]} ${v[3]}, ${v[4]} ${v[5]}, ${v[6]} ${v[7]}`;
}

const css = `
.hb-yb8 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb8 *, .hb-yb8 *::before, .hb-yb8 *::after { box-sizing: border-box; }
.hb-yb8-sky {
  position: relative;
  flex: none;
  width: var(--hb-yb8-s);
  height: calc(var(--hb-yb8-s) * 0.8);
}
.hb-yb8-svg {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-yb8-guide {
  fill: none;
  stroke: var(--hb-yb8-c);
  stroke-width: 0.8;
  stroke-dasharray: 1.5 3.5;
  stroke-linecap: round;
  opacity: 0.22;
}
.hb-yb8-trail {
  animation: hb-yb8-show var(--hb-yb8-d) linear infinite;
}
.hb-yb8-tr {
  fill: none;
  stroke: var(--hb-yb8-c);
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-dasharray: var(--hb-yb8-l) 300;
  stroke-dashoffset: var(--hb-yb8-l);
  animation: hb-yb8-streak var(--hb-yb8-d) linear infinite;
}
.hb-yb8-rk {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(var(--hb-yb8-s) * 0.3);
  height: calc(var(--hb-yb8-s) * 0.12);
  offset-path: var(--hb-yb8-path);
  offset-rotate: auto;
  offset-anchor: 50% 50%;
  offset-distance: 0%;
  opacity: 0;
  animation:
    hb-yb8-fly var(--hb-yb8-d) cubic-bezier(0.45, 0, 0.8, 0.6) infinite,
    hb-yb8-appear var(--hb-yb8-d) linear infinite;
}
.hb-yb8-rk svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-yb8-fl {
  transform-box: fill-box;
  transform-origin: 100% 50%;
  animation: hb-yb8-flick 0.14s ease-in-out infinite alternate;
}
.hb-yb8-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-yb8-fly {
  0% { offset-distance: 0%; }
  72%, 100% { offset-distance: 100%; }
}
@keyframes hb-yb8-appear {
  0% { opacity: 0; }
  3%, 71% { opacity: 1; }
  76%, 100% { opacity: 0; }
}
@keyframes hb-yb8-show {
  0% { opacity: 0; }
  3%, 80% { opacity: 1; }
  93%, 100% { opacity: 0; }
}
@keyframes hb-yb8-streak {
  0% { stroke-dashoffset: var(--hb-yb8-l); animation-timing-function: cubic-bezier(0.45, 0, 0.8, 0.6); }
  72% { stroke-dashoffset: calc(var(--hb-yb8-l) - 100); animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1); }
  92%, 100% { stroke-dashoffset: -100; }
}
@keyframes hb-yb8-flick {
  from { transform: scaleX(0.62); }
  to { transform: scaleX(1.12); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb8-rk { animation: none; opacity: 1; offset-distance: 58%; }
  .hb-yb8-trail { animation: none; }
  .hb-yb8-tr { animation: none; stroke-dashoffset: calc(var(--hb-yb8-l) - 58); }
  .hb-yb8-fl { animation: none; }
}
`;

export function LoaderRocketTrail({
  size = 72,
  color = "#2f7bff",
  accent = "#ff8a4c",
  speed = 2.4,
  label,
  className = "",
  style,
  ...rest
}: LoaderRocketTrailProps) {
  const vars = {
    "--hb-yb8-s": `${size}px`,
    "--hb-yb8-d": `${(speed > 0 ? speed : 2.4).toFixed(3)}s`,
    "--hb-yb8-c": color,
    "--hb-yb8-path": `path("${pathAt(size / 100)}")`,
    ...style,
  } as React.CSSProperties;
  const units = pathAt(1);

  return (
    <span role="status" className={`hb-yb8 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-rocket-trail" precedence="default">{css}</style>
      <span className="hb-yb8-sky" aria-hidden="true">
        <svg className="hb-yb8-svg" viewBox="0 0 100 80" focusable="false">
          <path className="hb-yb8-guide" d={units} />
          <g className="hb-yb8-trail">
            {TRAIL.map((t) => (
              <path
                key={t.len}
                className="hb-yb8-tr"
                d={units}
                pathLength={100}
                opacity={t.alpha}
                style={{ "--hb-yb8-l": t.len } as React.CSSProperties}
              />
            ))}
          </g>
        </svg>
        <span className="hb-yb8-rk">
          <svg viewBox="-8 0 30 12" focusable="false">
            <g className="hb-yb8-fl">
              <path d="M3 6 L-7 3.2 Q-4 6 -7 8.8 Z" fill={accent} />
              <path d="M3 6 L-3.5 4.7 L-3.5 7.3 Z" fill="#fff4d6" />
            </g>
            <path d="M6 3.4 L2 0.2 L10 2.6 Z" fill={accent} />
            <path d="M6 8.6 L2 11.8 L10 9.4 Z" fill={accent} />
            <path d="M3 4.4 C8 1.2 15 2.2 21 6 C15 9.8 8 10.8 3 7.6 Z" fill="#ededed" />
            <path d="M15.5 3.2 C17.5 3.8 19.5 5 21 6 C19.5 7 17.5 8.2 15.5 8.8 C16.6 7.4 16.6 4.6 15.5 3.2 Z" fill={color} />
            <circle cx="11.5" cy="6" r="1.8" fill="#0a0a0a" stroke={color} strokeWidth="0.8" />
          </svg>
        </span>
      </span>
      <span className={label ? "hb-yb8-l" : "hb-yb8-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

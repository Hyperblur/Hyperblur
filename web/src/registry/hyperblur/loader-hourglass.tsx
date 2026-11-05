"use client";

import * as React from "react";

export interface LoaderHourglassProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const GLASS =
  "M10 8 H50 C50 28 34 37 32 45 C34 53 50 62 50 82 H10 C10 62 26 53 28 45 C26 37 10 28 10 8 Z";

const css = `
.hb-yb2 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb2 *, .hb-yb2 *::before, .hb-yb2 *::after { box-sizing: border-box; }
.hb-yb2-svg {
  display: block;
  flex: none;
  width: calc(var(--hb-yb2-s) * 0.6667);
  height: var(--hb-yb2-s);
  overflow: visible;
  transform-origin: 50% 50%;
  animation: hb-yb2-flip var(--hb-yb2-d) linear infinite;
}
.hb-yb2-sand { animation: hb-yb2-fade var(--hb-yb2-d) linear infinite; }
.hb-yb2-top { animation: hb-yb2-down var(--hb-yb2-d) linear infinite; }
.hb-yb2-bot { animation: hb-yb2-up var(--hb-yb2-d) linear infinite; }
.hb-yb2-stream {
  stroke-dasharray: 2 3;
  animation:
    hb-yb2-fall 0.45s linear infinite,
    hb-yb2-pour var(--hb-yb2-d) linear infinite;
}
.hb-yb2-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb2-sr {
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
@keyframes hb-yb2-flip {
  0%, 80% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.6, 0, 0.3, 1); }
  94% { transform: rotate(180deg); }
  94.1%, 100% { transform: rotate(0deg); }
}
@keyframes hb-yb2-fade {
  0%, 84% { opacity: 1; }
  90%, 95% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes hb-yb2-down {
  0% { transform: translateY(0); }
  76%, 94% { transform: translateY(34px); }
  94.1%, 100% { transform: translateY(0); }
}
@keyframes hb-yb2-up {
  0% { transform: translateY(20px); }
  76%, 94% { transform: translateY(0); }
  94.1%, 100% { transform: translateY(20px); }
}
@keyframes hb-yb2-pour {
  0%, 2% { opacity: 0; }
  5%, 72% { opacity: 1; }
  77%, 100% { opacity: 0; }
}
@keyframes hb-yb2-fall {
  to { stroke-dashoffset: -5; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb2-svg, .hb-yb2-sand, .hb-yb2-stream { animation: none; }
  .hb-yb2-top { animation: none; transform: translateY(12px); }
  .hb-yb2-bot { animation: none; transform: translateY(8px); }
  .hb-yb2-stream { opacity: 0; }
}
`;

export function LoaderHourglass({
  size = 56,
  color = "#7fb3ff",
  accent = "#2f7bff",
  speed = 3.6,
  label,
  className = "",
  style,
  ...rest
}: LoaderHourglassProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const vars = {
    "--hb-yb2-s": `${size}px`,
    "--hb-yb2-d": `${(speed > 0 ? speed : 3.6).toFixed(3)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span role="status" className={`hb-yb2 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-hourglass" precedence="default">{css}</style>
      <svg className="hb-yb2-svg" viewBox="0 0 60 90" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${uid}g`}>
            <path d={GLASS} />
          </clipPath>
          <clipPath id={`${uid}t`}>
            <rect x="0" y="0" width="60" height="45" />
          </clipPath>
          <clipPath id={`${uid}b`}>
            <rect x="0" y="45" width="60" height="45" />
          </clipPath>
        </defs>
        <path d={GLASS} fill={accent} fillOpacity="0.07" />
        <g clipPath={`url(#${uid}g)`}>
          <g className="hb-yb2-sand">
            <g clipPath={`url(#${uid}t)`}>
              <rect className="hb-yb2-top" x="8" y="14" width="44" height="36" fill={color} />
            </g>
            <line
              className="hb-yb2-stream"
              x1="30"
              y1="45"
              x2="30"
              y2="84"
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <g clipPath={`url(#${uid}b)`}>
              <rect className="hb-yb2-bot" x="8" y="64" width="44" height="26" fill={color} />
            </g>
          </g>
        </g>
        <path
          d={GLASS}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
        <rect x="5" y="2" width="50" height="6" rx="2.5" fill={accent} />
        <rect x="5" y="82" width="50" height="6" rx="2.5" fill={accent} />
      </svg>
      <span className={label ? "hb-yb2-l" : "hb-yb2-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

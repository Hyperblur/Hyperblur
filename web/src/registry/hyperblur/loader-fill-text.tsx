"use client";

import * as React from "react";

export interface LoaderFillTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text?: string;
  value?: number;
  size?: number;
  color?: string;
  duration?: number;
}

const css = `
@property --hb-zz6-p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes hb-zz6-loop {
  0% { --hb-zz6-p: 0; animation-timing-function: cubic-bezier(0.45, 0.05, 0.35, 1); }
  80% { --hb-zz6-p: 1; animation-timing-function: linear; }
  90% { --hb-zz6-p: 1; animation-timing-function: cubic-bezier(0.6, 0, 0.9, 0.5); }
  100% { --hb-zz6-p: 0; }
}
@keyframes hb-zz6-front {
  from { -webkit-mask-position-x: 0, 0; mask-position-x: 0, 0; }
  to { -webkit-mask-position-x: -2.2em, 0; mask-position-x: -2.2em, 0; }
}
@keyframes hb-zz6-back {
  from { -webkit-mask-position-x: 0, 0; mask-position-x: 0, 0; }
  to { -webkit-mask-position-x: 2.2em, 0; mask-position-x: 2.2em, 0; }
}
.hb-zz6 {
  --hb-zz6-wave: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0 20V10Q25 0 50 10T100 10V20Z'/%3E%3C/svg%3E");
  position: relative;
  box-sizing: border-box;
  display: inline-grid;
  max-width: 100%;
  font-family: inherit;
  font-size: var(--hb-zz6-size, 56px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  transition: --hb-zz6-p 0.7s cubic-bezier(0.3, 0.7, 0.2, 1);
}
.hb-zz6 *, .hb-zz6 *::before, .hb-zz6 *::after { box-sizing: border-box; }
.hb-zz6[data-loop] {
  animation: hb-zz6-loop var(--hb-zz6-dur, 3.6s) infinite;
}
.hb-zz6 > span {
  grid-area: 1 / 1;
  padding: 0.12em 0;
  white-space: nowrap;
}
.hb-zz6-t {
  color: transparent;
  -webkit-text-stroke: 0.028em #3d3d3d;
}
.hb-zz6-f {
  color: transparent;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-zz6-c) 55%, #ffffff) 0%, var(--hb-zz6-c) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-mask-image: var(--hb-zz6-wave), linear-gradient(#000, #000);
  mask-image: var(--hb-zz6-wave), linear-gradient(#000, #000);
  -webkit-mask-repeat: repeat-x, no-repeat;
  mask-repeat: repeat-x, no-repeat;
  -webkit-mask-size: 2.2em 0.2em, 100% 100%;
  mask-size: 2.2em 0.2em, 100% 100%;
  -webkit-mask-position-y: calc(1.1em - 1.25em * var(--hb-zz6-p) + var(--hb-zz6-lift, 0em)), calc(1.3em - 1.25em * var(--hb-zz6-p) + var(--hb-zz6-lift, 0em));
  mask-position-y: calc(1.1em - 1.25em * var(--hb-zz6-p) + var(--hb-zz6-lift, 0em)), calc(1.3em - 1.25em * var(--hb-zz6-p) + var(--hb-zz6-lift, 0em));
  animation: hb-zz6-front 1.5s linear infinite;
}
.hb-zz6-f[data-back] {
  --hb-zz6-lift: -0.08em;
  opacity: 0.42;
  animation: hb-zz6-back 2.3s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz6 { transition: none; }
  .hb-zz6[data-loop] { animation: none; --hb-zz6-p: 0.62; }
  .hb-zz6-f, .hb-zz6-f[data-back] { animation: none; }
}
`;

export function LoaderFillText({
  text = "Loading",
  value,
  size = 56,
  color = "#2f7bff",
  duration = 3.6,
  className = "",
  style,
  ...rest
}: LoaderFillTextProps) {
  const controlled = typeof value === "number";
  const clamped = controlled ? Math.min(100, Math.max(0, value)) : 0;
  const vars = {
    ["--hb-zz6-size" as string]: `${size}px`,
    ["--hb-zz6-c" as string]: color,
    ["--hb-zz6-dur" as string]: `${Math.max(1, duration).toFixed(2)}s`,
    ...(controlled ? { ["--hb-zz6-p" as string]: (clamped / 100).toFixed(3) } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <div
      role={controlled ? "progressbar" : "status"}
      aria-label={text}
      aria-valuemin={controlled ? 0 : undefined}
      aria-valuemax={controlled ? 100 : undefined}
      aria-valuenow={controlled ? Math.round(clamped) : undefined}
      {...rest}
      className={`hb-zz6${className ? ` ${className}` : ""}`}
      style={vars}
      data-loop={controlled ? undefined : ""}
    >
      <style href="hb-loader-fill-text" precedence="default">{css}</style>
      <span className="hb-zz6-t" aria-hidden="true">{text}</span>
      <span className="hb-zz6-f" data-back="" aria-hidden="true">{text}</span>
      <span className="hb-zz6-f" aria-hidden="true">{text}</span>
    </div>
  );
}

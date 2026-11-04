"use client";

import * as React from "react";

export interface LoaderLineRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  title?: string;
  rows?: number;
  value?: number;
  duration?: number;
  color?: string;
}

const css = `
@property --hb-zz7-p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes hb-zz7-loop {
  0% { --hb-zz7-p: 0; opacity: 0; }
  5% { opacity: 1; }
  78% { --hb-zz7-p: 1; }
  92% { opacity: 1; }
  100% { --hb-zz7-p: 1; opacity: 0; }
}
.hb-zz7 {
  --hb-zz7-f: clamp(0, calc(var(--hb-zz7-p) * (var(--hb-zz7-n) + 1) - var(--hb-zz7-n)), 1);
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  transition: --hb-zz7-p 0.8s cubic-bezier(0.3, 0.7, 0.2, 1);
}
.hb-zz7 *, .hb-zz7 *::before, .hb-zz7 *::after { box-sizing: border-box; }
.hb-zz7[data-loop] { animation: hb-zz7-loop var(--hb-zz7-dur, 4.2s) linear infinite; }
.hb-zz7-row {
  --hb-zz7-r: clamp(0, calc(var(--hb-zz7-p) * (var(--hb-zz7-n) + 1) - var(--hb-zz7-i)), 1);
  --hb-zz7-k: clamp(0, calc((var(--hb-zz7-r) - 0.3) / 0.7), 1);
  position: relative;
  padding: 12px 0;
}
.hb-zz7-row[data-title] { padding: 14px 0 16px; }
.hb-zz7-ln {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: #1f1f1f;
}
.hb-zz7-ln::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, var(--hb-zz7-c) 72%, #ffffff 100%);
  box-shadow: 0 0 10px color-mix(in srgb, var(--hb-zz7-c) 70%, transparent);
  transform-origin: left center;
  transform: scaleX(var(--hb-zz7-r));
  opacity: calc(1 - var(--hb-zz7-f) * 0.85);
}
.hb-zz7-ct {
  display: block;
  clip-path: inset(0 calc((1 - var(--hb-zz7-k)) * 100%) 0 0);
  opacity: var(--hb-zz7-k);
  transform: translateY(calc((1 - var(--hb-zz7-k)) * 5px));
}
.hb-zz7-ti {
  display: block;
  margin: 0;
  font-size: 1.6em;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-zz7-b {
  display: block;
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, #1d1d1d, #262626 50%, #1d1d1d);
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz7 { transition: none; }
  .hb-zz7[data-loop] { animation: none; --hb-zz7-p: 1; }
}
`;

const widths = [100, 88, 64, 94, 52, 78];

export function LoaderLineReveal({
  title = "Untitled",
  rows = 3,
  value,
  duration = 4.2,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: LoaderLineRevealProps) {
  const controlled = typeof value === "number";
  const clamped = controlled ? Math.min(100, Math.max(0, value)) : 0;
  const bars = Math.max(0, Math.round(rows));
  const vars = {
    ["--hb-zz7-n" as string]: bars + 1,
    ["--hb-zz7-c" as string]: color,
    ["--hb-zz7-dur" as string]: `${Math.max(1, duration).toFixed(2)}s`,
    ...(controlled ? { ["--hb-zz7-p" as string]: (clamped / 100).toFixed(3) } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <div
      role={controlled ? "progressbar" : "status"}
      aria-label={`Loading ${title}`}
      aria-valuemin={controlled ? 0 : undefined}
      aria-valuemax={controlled ? 100 : undefined}
      aria-valuenow={controlled ? Math.round(clamped) : undefined}
      {...rest}
      className={`hb-zz7${className ? ` ${className}` : ""}`}
      style={vars}
      data-loop={controlled ? undefined : ""}
    >
      <style href="hb-loader-line-reveal" precedence="default">{css}</style>
      <div className="hb-zz7-row" data-title="" style={{ ["--hb-zz7-i" as string]: 0 } as React.CSSProperties}>
        <span className="hb-zz7-ln" aria-hidden="true" />
        <span className="hb-zz7-ct" aria-hidden="true">
          <span className="hb-zz7-ti">{title}</span>
        </span>
      </div>
      {Array.from({ length: bars }, (_, i) => (
        <div key={i} className="hb-zz7-row" style={{ ["--hb-zz7-i" as string]: i + 1 } as React.CSSProperties}>
          <span className="hb-zz7-ln" aria-hidden="true" />
          <span className="hb-zz7-ct" aria-hidden="true">
            <span className="hb-zz7-b" style={{ width: `${widths[i % widths.length]}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

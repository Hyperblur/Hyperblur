"use client";

import * as React from "react";

export interface LoaderDotFieldProps extends React.HTMLAttributes<HTMLSpanElement> {
  cols?: number;
  rows?: number;
  dot?: number;
  gap?: number;
  pattern?: "ripple" | "wave" | "diagonal";
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const css = `
.hb-vk6 {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk6 *, .hb-vk6 *::before, .hb-vk6 *::after { box-sizing: border-box; }
.hb-vk6-grid {
  display: grid;
  grid-template-columns: repeat(var(--hb-vk6-cols), var(--hb-vk6-dot));
  gap: var(--hb-vk6-gap);
}
.hb-vk6-d {
  width: var(--hb-vk6-dot);
  height: var(--hb-vk6-dot);
  border-radius: 50%;
  background: var(--hb-vk6-c);
  opacity: 0.22;
  transform: scale(0.55);
  animation: hb-vk6-pulse var(--hb-vk6-t) cubic-bezier(0.37, 0, 0.63, 1) infinite;
  animation-delay: var(--hb-vk6-delay);
}
.hb-vk6-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk6-pulse {
  0%, 100% { opacity: 0.2; transform: scale(0.5); background: var(--hb-vk6-c); box-shadow: none; }
  45% { opacity: 1; transform: scale(1.2); background: var(--hb-vk6-a); box-shadow: 0 0 calc(var(--hb-vk6-dot) * 1.4) color-mix(in srgb, var(--hb-vk6-a) 60%, transparent); }
  70% { opacity: 0.45; transform: scale(0.8); background: var(--hb-vk6-c); box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk6-d { animation: none; opacity: calc(0.25 + var(--hb-vk6-still) * 0.75); transform: scale(calc(0.55 + var(--hb-vk6-still) * 0.45)); }
}
`;

export function LoaderDotField({
  cols = 13,
  rows = 5,
  dot = 5,
  gap = 7,
  pattern = "ripple",
  color = "#2f7bff",
  accent = "#bcd6ff",
  speed = 1.8,
  label,
  className = "",
  style,
  ...rest
}: LoaderDotFieldProps) {
  const c = Math.max(2, Math.min(32, Math.round(cols)));
  const r = Math.max(1, Math.min(16, Math.round(rows)));
  const t = Math.max(0.5, speed);
  const cx = (c - 1) / 2;
  const cy = (r - 1) / 2;
  const maxD = Math.hypot(cx, cy) || 1;
  const vars = {
    "--hb-vk6-cols": c,
    "--hb-vk6-dot": `${dot}px`,
    "--hb-vk6-gap": `${gap}px`,
    "--hb-vk6-c": color,
    "--hb-vk6-a": accent,
    "--hb-vk6-t": `${t}s`,
    ...style,
  } as React.CSSProperties;

  const cells = Array.from({ length: c * r }, (_, i) => {
    const x = i % c;
    const y = Math.floor(i / c);
    let phase: number;
    if (pattern === "wave") {
      phase = x / c + Math.sin((y / Math.max(1, r - 1)) * Math.PI) * 0.18;
    } else if (pattern === "diagonal") {
      phase = (x + y) / (c + r - 2 || 1);
    } else {
      phase = Math.hypot(x - cx, (y - cy) * 1.4) / (maxD * 1.2);
    }
    const still = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / maxD);
    return { delay: ((phase * 0.9 - 1) * t).toFixed(3), still: still.toFixed(3) };
  });

  return (
    <>
      <style href="hb-loader-dot-field" precedence="default">{css}</style>
      <span role="status" className={`hb-vk6 ${className}`} style={vars} {...rest}>
        <span className="hb-vk6-grid" aria-hidden="true">
          {cells.map((cell, i) => (
            <span
              key={i}
              className="hb-vk6-d"
              style={{ "--hb-vk6-delay": `${cell.delay}s`, "--hb-vk6-still": cell.still } as React.CSSProperties}
            />
          ))}
        </span>
        <span className={label ? "hb-vk6-l" : "hb-vk6-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

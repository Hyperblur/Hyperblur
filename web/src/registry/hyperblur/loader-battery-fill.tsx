"use client";

import * as React from "react";

export interface LoaderBatteryFillProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  segments?: number;
  value?: number;
  label?: string;
}

const css = `
.hb-yb4 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb4 *, .hb-yb4 *::before, .hb-yb4 *::after { box-sizing: border-box; }
.hb-yb4-bat {
  display: flex;
  flex: none;
  align-items: center;
  width: calc(var(--hb-yb4-w) + var(--hb-yb4-w) * 0.07);
  height: calc(var(--hb-yb4-w) * 0.5);
}
.hb-yb4-body {
  position: relative;
  display: flex;
  flex: none;
  align-items: stretch;
  width: var(--hb-yb4-w);
  height: 100%;
  padding: var(--hb-yb4-pd);
  border: var(--hb-yb4-b) solid var(--hb-yb4-a);
  border-radius: calc(var(--hb-yb4-w) * 0.12);
}
.hb-yb4-nub {
  flex: none;
  width: calc(var(--hb-yb4-w) * 0.07);
  height: 38%;
  margin-left: 1px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-yb4-a);
}
.hb-yb4-fill {
  flex: none;
  width: var(--hb-yb4-f, 100%);
  height: 100%;
  overflow: hidden;
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-yb4-segs {
  display: flex;
  gap: var(--hb-yb4-sg);
  width: var(--hb-yb4-iw);
  height: 100%;
}
.hb-yb4-segs i {
  display: block;
  flex: 1;
  border-radius: calc(var(--hb-yb4-w) * 0.035);
  background: linear-gradient(180deg, var(--hb-yb4-a), var(--hb-yb4-c) 70%);
}
.hb-yb4-loop .hb-yb4-fill {
  width: 0;
  transition: none;
  animation:
    hb-yb4-grow var(--hb-yb4-d) steps(var(--hb-yb4-n), end) infinite,
    hb-yb4-out var(--hb-yb4-d) linear infinite;
}
.hb-yb4-loop .hb-yb4-bat {
  animation: hb-yb4-pulse var(--hb-yb4-d) ease-in-out infinite;
}
.hb-yb4-full .hb-yb4-bat {
  animation: hb-yb4-beat 1.8s ease-in-out infinite;
}
.hb-yb4-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb4-sr {
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
@keyframes hb-yb4-grow {
  0% { width: 0; }
  66%, 100% { width: 100%; }
}
@keyframes hb-yb4-out {
  0%, 90% { opacity: 1; }
  98%, 100% { opacity: 0; }
}
@keyframes hb-yb4-pulse {
  0%, 64%, 92%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
  72% { transform: scale(1.06); filter: drop-shadow(0 0 7px var(--hb-yb4-c)); }
  80% { transform: scale(1); filter: drop-shadow(0 0 1px var(--hb-yb4-c)); }
  86% { transform: scale(1.06); filter: drop-shadow(0 0 7px var(--hb-yb4-c)); }
}
@keyframes hb-yb4-beat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
  50% { transform: scale(1.06); filter: drop-shadow(0 0 7px var(--hb-yb4-c)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb4-loop .hb-yb4-fill {
    animation: none;
    width: calc(100% * (var(--hb-yb4-n) - 1) / var(--hb-yb4-n));
  }
  .hb-yb4-loop .hb-yb4-bat, .hb-yb4-full .hb-yb4-bat { animation: none; }
  .hb-yb4-fill { transition: none; }
}
`;

export function LoaderBatteryFill({
  size = 56,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 2.8,
  segments = 4,
  value,
  label,
  className = "",
  style,
  ...rest
}: LoaderBatteryFillProps) {
  const n = Math.max(2, Math.min(8, Math.round(segments)));
  const controlled = typeof value === "number" && Number.isFinite(value);
  const clamped = controlled ? Math.max(0, Math.min(100, value)) : 0;
  const lit = controlled ? Math.round((clamped / 100) * n) : n;
  const border = Math.max(1.5, size * 0.045);
  const pad = Math.max(1.5, size * 0.05);
  const gap = Math.max(1, size * 0.03);

  const vars = {
    "--hb-yb4-w": `${size}px`,
    "--hb-yb4-b": `${border.toFixed(2)}px`,
    "--hb-yb4-pd": `${pad.toFixed(2)}px`,
    "--hb-yb4-sg": `${gap.toFixed(2)}px`,
    "--hb-yb4-iw": `${(size - 2 * border - 2 * pad).toFixed(2)}px`,
    "--hb-yb4-n": n,
    "--hb-yb4-d": `${(speed > 0 ? speed : 2.8).toFixed(3)}s`,
    "--hb-yb4-c": color,
    "--hb-yb4-a": accent,
    "--hb-yb4-f": controlled ? `${((lit / n) * 100).toFixed(2)}%` : undefined,
    ...style,
  } as React.CSSProperties;

  const mode = !controlled ? "hb-yb4-loop" : lit === n ? "hb-yb4-full" : "";
  const percent = controlled ? ` ${Math.round(clamped)}%` : "";

  return (
    <span role="status" className={`hb-yb4 ${mode} ${className}`} style={vars} {...rest}>
      <style href="hb-loader-battery-fill" precedence="default">{css}</style>
      <span className="hb-yb4-bat" aria-hidden="true">
        <span className="hb-yb4-body">
          <span className="hb-yb4-fill">
            <span className="hb-yb4-segs">
              {Array.from({ length: n }, (_, i) => (
                <i key={i} />
              ))}
            </span>
          </span>
        </span>
        <span className="hb-yb4-nub" />
      </span>
      {label ? (
        <>
          <span className="hb-yb4-l">{label}</span>
          {percent ? <span className="hb-yb4-sr">{percent}</span> : null}
        </>
      ) : (
        <span className="hb-yb4-sr">{`Charging${percent}`}</span>
      )}
    </span>
  );
}

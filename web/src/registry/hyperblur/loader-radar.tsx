"use client";

import * as React from "react";

export interface LoaderRadarProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  blips?: number;
  speed?: number;
  label?: string;
}

const css = `
.hb-qc9 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qc9 *, .hb-qc9 *::before, .hb-qc9 *::after { box-sizing: border-box; }
.hb-qc9-g {
  position: relative;
  flex: none;
  width: var(--hb-qc9-s);
  height: var(--hb-qc9-s);
  overflow: hidden;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-qc9-c) 10%, #0a0a0a) 0%, #0a0a0a 100%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-qc9-c) 45%, transparent);
}
.hb-qc9-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--hb-qc9-c) 28%, transparent);
  transform: translate(-50%, -50%);
}
.hb-qc9-ring:nth-child(1) { width: 33%; height: 33%; }
.hb-qc9-ring:nth-child(2) { width: 66%; height: 66%; }
.hb-qc9-cross::before, .hb-qc9-cross::after {
  content: "";
  position: absolute;
  background: color-mix(in srgb, var(--hb-qc9-c) 22%, transparent);
}
.hb-qc9-cross::before { top: 0; bottom: 0; left: 50%; width: 1px; }
.hb-qc9-cross::after { left: 0; right: 0; top: 50%; height: 1px; }
.hb-qc9-sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, transparent 240deg, color-mix(in srgb, var(--hb-qc9-c) 55%, transparent) 359deg, var(--hb-qc9-a) 360deg);
  animation: hb-qc9-spin var(--hb-qc9-t) linear infinite;
}
.hb-qc9-blip {
  position: absolute;
  width: calc(var(--hb-qc9-s) * 0.07);
  height: calc(var(--hb-qc9-s) * 0.07);
  margin: calc(var(--hb-qc9-s) * -0.035) 0 0 calc(var(--hb-qc9-s) * -0.035);
  border-radius: 50%;
  background: var(--hb-qc9-a);
  box-shadow: 0 0 calc(var(--hb-qc9-s) * 0.08) var(--hb-qc9-a);
  opacity: 0;
  animation: hb-qc9-ping var(--hb-qc9-t) ease-out infinite;
  animation-delay: var(--w);
}
.hb-qc9-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--hb-qc9-s) * 0.05);
  height: calc(var(--hb-qc9-s) * 0.05);
  margin: calc(var(--hb-qc9-s) * -0.025) 0 0 calc(var(--hb-qc9-s) * -0.025);
  border-radius: 50%;
  background: var(--hb-qc9-c);
}
.hb-qc9-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc9-sr {
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
@keyframes hb-qc9-spin { to { transform: rotate(360deg); } }
@keyframes hb-qc9-ping {
  0% { opacity: 1; transform: scale(1.6); }
  35% { opacity: 0.85; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc9-sweep { animation-duration: 12s; }
  .hb-qc9-blip { animation: none; opacity: 0.8; }
}
`;

export function LoaderRadar({
  size = 96,
  color = "#2f7bff",
  accent = "#9fc6ff",
  blips = 5,
  speed = 3,
  label,
  className = "",
  style,
  ...rest
}: LoaderRadarProps) {
  const n = Math.max(0, Math.round(blips));
  const vars = {
    "--hb-qc9-s": `${size}px`,
    "--hb-qc9-c": color,
    "--hb-qc9-a": accent,
    "--hb-qc9-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-radar" precedence="default">{css}</style>
      <span role="status" className={`hb-qc9 ${className}`} style={vars} {...rest}>
        <span className="hb-qc9-g" aria-hidden="true">
          <span className="hb-qc9-ring" />
          <span className="hb-qc9-ring" />
          <span className="hb-qc9-cross" />
          <span className="hb-qc9-sweep" />
          {Array.from({ length: n }, (_, i) => {
            const h = Math.imul(i + 11, 2246822519) >>> 0;
            const deg = ((h % 3600) / 10 + i * (360 / Math.max(1, n))) % 360;
            const rad = 0.24 + ((h >>> 12) % 100) / 100 * 0.62;
            const a = (deg * Math.PI) / 180;
            const x = 50 + Math.sin(a) * rad * 50;
            const y = 50 - Math.cos(a) * rad * 50;
            const wait = (deg / 360) * speed;
            return (
              <span
                key={i}
                className="hb-qc9-blip"
                style={
                  {
                    left: `${x.toFixed(2)}%`,
                    top: `${y.toFixed(2)}%`,
                    "--w": `${wait.toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            );
          })}
          <span className="hb-qc9-core" />
        </span>
        <span className={label ? "hb-qc9-l" : "hb-qc9-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

"use client";

import * as React from "react";

export interface LoaderInfinityTraceProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  thickness?: number;
  label?: string;
}

const lemniscate = (() => {
  const pts: string[] = [];
  const steps = 160;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const s = Math.sin(t);
    const d = 1 + s * s;
    const x = 50 + (44 * Math.cos(t)) / d;
    const y = 25 + (44 * s * Math.cos(t)) / d;
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

const css = `
.hb-vk11 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk11 *, .hb-vk11 *::before, .hb-vk11 *::after { box-sizing: border-box; }
.hb-vk11-svg { display: block; width: var(--hb-vk11-s); height: calc(var(--hb-vk11-s) * 0.5); overflow: visible; flex: none; }
.hb-vk11-track { fill: none; stroke: #202020; stroke-linecap: round; }
.hb-vk11-run {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: var(--hb-vk11-len) calc(100 - var(--hb-vk11-len));
  stroke-dashoffset: var(--hb-vk11-o);
  animation: hb-vk11-run var(--hb-vk11-d) cubic-bezier(0.45, 0.1, 0.55, 0.9) infinite;
}
.hb-vk11-glow { filter: blur(2.2px); }
.hb-vk11-head { stroke: #ffffff; filter: drop-shadow(0 0 2px var(--hb-vk11-a)) drop-shadow(0 0 5px var(--hb-vk11-c)); }
.hb-vk11-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk11-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk11-run {
  from { stroke-dashoffset: var(--hb-vk11-o); }
  to { stroke-dashoffset: calc(var(--hb-vk11-o) - 100); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk11-run { animation: none; }
}
`;

export function LoaderInfinityTrace({
  size = 120,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 2.2,
  thickness = 3,
  label,
  className = "",
  style,
  ...rest
}: LoaderInfinityTraceProps) {
  const gid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const w = Math.max(1, thickness) * (100 / Math.max(40, size)) * 1.2;
  const lead = 36;
  const layers = [
    { len: 36, width: w * 2.6, opacity: 0.35, cls: "hb-vk11-glow", stroke: `url(#${gid}g)` },
    { len: 30, width: w, opacity: 0.35, cls: "", stroke: `url(#${gid}g)` },
    { len: 18, width: w, opacity: 0.75, cls: "", stroke: `url(#${gid}g)` },
    { len: 8, width: w, opacity: 1, cls: "", stroke: accent },
    { len: 0.01, width: w * 1.5, opacity: 1, cls: "hb-vk11-head", stroke: "#ffffff" },
  ];
  const vars = {
    "--hb-vk11-s": `${size}px`,
    "--hb-vk11-c": color,
    "--hb-vk11-a": accent,
    "--hb-vk11-d": `${Math.max(0.6, speed)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-infinity-trace" precedence="default">{css}</style>
      <span role="status" className={`hb-vk11 ${className}`} style={vars} {...rest}>
        <svg className="hb-vk11-svg" viewBox="0 0 100 50" aria-hidden="true">
          <defs>
            <linearGradient id={`${gid}g`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} />
              <stop offset="50%" stopColor={accent} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <path className="hb-vk11-track" d={lemniscate} strokeWidth={w.toFixed(2)} />
          {layers.map((l, i) => (
            <path
              key={i}
              className={`hb-vk11-run ${l.cls}`}
              d={lemniscate}
              pathLength={100}
              stroke={l.stroke}
              strokeWidth={l.width.toFixed(2)}
              opacity={l.opacity}
              style={
                {
                  "--hb-vk11-len": l.len,
                  "--hb-vk11-o": (l.len - lead).toFixed(2),
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
        <span className={label ? "hb-vk11-l" : "hb-vk11-sr"}>{label ?? "Reconnecting"}</span>
      </span>
    </>
  );
}

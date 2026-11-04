"use client";

import * as React from "react";

export interface LoaderRingGradientProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  thickness?: number;
  speed?: number;
  label?: string;
}

const css = `
.hb-qc4 {
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
.hb-qc4 *, .hb-qc4 *::before, .hb-qc4 *::after { box-sizing: border-box; }
.hb-qc4-g {
  position: relative;
  flex: none;
  width: var(--hb-qc4-s);
  height: var(--hb-qc4-s);
  animation: hb-qc4-breathe calc(var(--hb-qc4-t) * 1.8) ease-in-out infinite;
}
.hb-qc4-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, var(--hb-qc4-a) 200deg, var(--hb-qc4-c) 360deg);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--hb-qc4-w)), #000 calc(100% - var(--hb-qc4-w) + 0.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--hb-qc4-w)), #000 calc(100% - var(--hb-qc4-w) + 0.5px));
  animation: hb-qc4-spin var(--hb-qc4-t) linear infinite;
}
.hb-qc4-head {
  position: absolute;
  inset: 0;
  animation: hb-qc4-spin var(--hb-qc4-t) linear infinite;
}
.hb-qc4-head::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--hb-qc4-w);
  height: var(--hb-qc4-w);
  margin-left: calc(var(--hb-qc4-w) / -2);
  border-radius: 50%;
  background: var(--hb-qc4-c);
  box-shadow: 0 0 calc(var(--hb-qc4-w) * 3) var(--hb-qc4-c);
}
.hb-qc4-glow {
  position: absolute;
  inset: calc(var(--hb-qc4-w) * -1);
  border-radius: 50%;
  background: radial-gradient(circle, transparent 55%, color-mix(in srgb, var(--hb-qc4-c) 18%, transparent) 72%, transparent 100%);
  animation: hb-qc4-glow calc(var(--hb-qc4-t) * 1.8) ease-in-out infinite;
}
.hb-qc4-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc4-sr {
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
@keyframes hb-qc4-spin { to { transform: rotate(360deg); } }
@keyframes hb-qc4-breathe {
  0%, 100% { transform: scale(0.9); }
  50% { transform: scale(1.04); }
}
@keyframes hb-qc4-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc4-g, .hb-qc4-glow { animation: none; }
  .hb-qc4-ring, .hb-qc4-head { animation-duration: 8s; }
}
`;

export function LoaderRingGradient({
  size = 56,
  color = "#2f7bff",
  accent = "#1a2a52",
  thickness = 5,
  speed = 1.1,
  label,
  className = "",
  style,
  ...rest
}: LoaderRingGradientProps) {
  const vars = {
    "--hb-qc4-s": `${size}px`,
    "--hb-qc4-c": color,
    "--hb-qc4-a": accent,
    "--hb-qc4-w": `${thickness}px`,
    "--hb-qc4-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-ring-gradient" precedence="default">{css}</style>
      <span role="status" className={`hb-qc4 ${className}`} style={vars} {...rest}>
        <span className="hb-qc4-g" aria-hidden="true">
          <span className="hb-qc4-glow" />
          <span className="hb-qc4-ring" />
          <span className="hb-qc4-head" />
        </span>
        <span className={label ? "hb-qc4-l" : "hb-qc4-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

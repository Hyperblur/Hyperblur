"use client";

import * as React from "react";

export interface LoaderMorphShapesProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const COUNT = 18;

function pt(x: number, y: number) {
  return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
}

function circle() {
  const out: string[] = [];
  for (let k = 0; k < COUNT; k++) {
    const a = ((-90 + (k * 360) / COUNT) * Math.PI) / 180;
    out.push(pt(50 + 50 * Math.cos(a), 50 + 50 * Math.sin(a)));
  }
  return `polygon(${out.join(", ")})`;
}

function squircle() {
  const out: string[] = [];
  for (let k = 0; k < COUNT; k++) {
    const a = ((-90 + (k * 360) / COUNT) * Math.PI) / 180;
    const cx = Math.cos(a);
    const sy = Math.sin(a);
    const x = Math.sign(cx) * Math.pow(Math.abs(cx), 0.5);
    const y = Math.sign(sy) * Math.pow(Math.abs(sy), 0.5);
    out.push(pt(50 + 44 * x, 50 + 44 * y));
  }
  return `polygon(${out.join(", ")})`;
}

function triangle() {
  const corners = [-90, 30, 150].map((d) => {
    const a = (d * Math.PI) / 180;
    return [50 + 50 * Math.cos(a), 50 + 50 * Math.sin(a)];
  });
  const per = COUNT / 3;
  const out: string[] = [];
  for (let e = 0; e < 3; e++) {
    const from = corners[e];
    const to = corners[(e + 1) % 3];
    for (let s = 0; s < per; s++) {
      const t = s / per;
      out.push(pt(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t));
    }
  }
  return `polygon(${out.join(", ")})`;
}

const css = `
.hb-qc7 {
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
.hb-qc7 *, .hb-qc7 *::before, .hb-qc7 *::after { box-sizing: border-box; }
.hb-qc7-g {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: var(--hb-qc7-s);
  height: var(--hb-qc7-s);
}
.hb-qc7-shape {
  grid-area: 1 / 1;
  width: 78%;
  height: 78%;
  background: linear-gradient(135deg, var(--hb-qc7-a), var(--hb-qc7-c));
  clip-path: ${circle()};
  animation: hb-qc7-morph var(--hb-qc7-t) ease-in-out infinite;
}
.hb-qc7-shadow {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 60%;
  height: 8%;
  margin-left: -30%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qc7-c) 45%, transparent), transparent);
  animation: hb-qc7-shadow var(--hb-qc7-t) ease-in-out infinite;
}
.hb-qc7-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc7-sr {
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
@keyframes hb-qc7-morph {
  0% { clip-path: ${circle()}; transform: rotate(0deg) scale(1); }
  16% { clip-path: ${circle()}; transform: rotate(0deg) scale(1); }
  33% { clip-path: ${squircle()}; transform: rotate(120deg) scale(0.92); }
  49% { clip-path: ${squircle()}; transform: rotate(120deg) scale(0.92); }
  66% { clip-path: ${triangle()}; transform: rotate(240deg) scale(1.06); }
  82% { clip-path: ${triangle()}; transform: rotate(240deg) scale(1.06); }
  100% { clip-path: ${circle()}; transform: rotate(360deg) scale(1); }
}
@keyframes hb-qc7-shadow {
  0%, 16%, 100% { transform: scaleX(1); opacity: 0.8; }
  33%, 49% { transform: scaleX(0.82); opacity: 0.55; }
  66%, 82% { transform: scaleX(1.12); opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc7-shape, .hb-qc7-shadow { animation: none; }
}
`;

export function LoaderMorphShapes({
  size = 56,
  color = "#2f7bff",
  accent = "#9fc6ff",
  speed = 3.6,
  label,
  className = "",
  style,
  ...rest
}: LoaderMorphShapesProps) {
  const vars = {
    "--hb-qc7-s": `${size}px`,
    "--hb-qc7-c": color,
    "--hb-qc7-a": accent,
    "--hb-qc7-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-morph-shapes" precedence="default">{css}</style>
      <span role="status" className={`hb-qc7 ${className}`} style={vars} {...rest}>
        <span className="hb-qc7-g" aria-hidden="true">
          <span className="hb-qc7-shape" />
          <span className="hb-qc7-shadow" />
        </span>
        <span className={label ? "hb-qc7-l" : "hb-qc7-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

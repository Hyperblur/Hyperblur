"use client";

import * as React from "react";

export type LatticeShape = "grid" | "ring" | "bars";

export interface LatticeLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  speed?: number;
  shape?: LatticeShape;
  columns?: number;
  label?: string;
}

const css = `
.hb-ll {
  position: relative;
  display: inline-block;
  flex: none;
  width: var(--hb-s);
  height: var(--hb-s);
  vertical-align: middle;
}
.hb-ll-grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(var(--hb-n), 1fr);
  grid-template-rows: repeat(var(--hb-n), 1fr);
  place-items: center;
}
.hb-ll-grid > i {
  width: 56%;
  height: 56%;
  border-radius: 50%;
  background: var(--hb-c);
  opacity: 0.3;
  transform: scale(0.4);
  animation: hb-ll-pulse var(--hb-d) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--hb-d) / var(--hb-p));
}
.hb-ll-ring { width: 100%; height: 100%; }
.hb-ll-ring > i {
  position: absolute;
  inset: 0;
  transform: rotate(calc(var(--i) * 45deg));
}
.hb-ll-ring > i > b {
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(var(--hb-s) * 0.18);
  height: calc(var(--hb-s) * 0.18);
  margin-left: calc(var(--hb-s) * -0.09);
  border-radius: 50%;
  background: var(--hb-c);
  opacity: 0.3;
  transform: scale(0.4);
  animation: hb-ll-pulse var(--hb-d) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--hb-d) / var(--hb-p));
}
.hb-ll-bars {
  display: flex;
  align-items: center;
  gap: calc(var(--hb-s) * 0.08);
  width: 100%;
  height: 100%;
}
.hb-ll-bars > i {
  flex: 1;
  height: 100%;
  border-radius: 999px;
  background: var(--hb-c);
  opacity: 0.3;
  transform: scaleY(0.3);
  animation: hb-ll-bar var(--hb-d) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--hb-d) / var(--hb-p));
}
.hb-ll-sr {
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
@keyframes hb-ll-pulse {
  0%, 100% { transform: scale(0.4); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes hb-ll-bar {
  0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
  40% { transform: scaleY(1); opacity: 1; }
}
@keyframes hb-ll-fade {
  0%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ll-grid > i, .hb-ll-ring > i > b, .hb-ll-bars > i {
    transform: none;
    animation-name: hb-ll-fade;
    animation-duration: calc(var(--hb-d) * 2);
  }
}
`;

export function LatticeLoader({
  size = 32,
  color = "#2f7bff",
  speed = 1,
  shape = "grid",
  columns = 3,
  label = "Loading",
  className = "",
  style,
  ...rest
}: LatticeLoaderProps) {
  const n = Math.max(2, Math.min(6, Math.round(columns)));
  const safeSpeed = speed > 0 ? speed : 1;
  const phases = shape === "grid" ? n * 2 - 1 : shape === "ring" ? 8 : 5;

  const vars = {
    "--hb-s": `${size}px`,
    "--hb-c": color,
    "--hb-d": `${(1.2 / safeSpeed).toFixed(3)}s`,
    "--hb-n": n,
    "--hb-p": phases,
    ...style,
  } as React.CSSProperties;

  const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

  let body: React.ReactNode;
  if (shape === "ring") {
    body = (
      <span className="hb-ll-ring" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={at(i)}>
            <b style={at(i)} />
          </i>
        ))}
      </span>
    );
  } else if (shape === "bars") {
    body = (
      <span className="hb-ll-bars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <i key={i} style={at(i)} />
        ))}
      </span>
    );
  } else {
    body = (
      <span className="hb-ll-grid" aria-hidden="true">
        {Array.from({ length: n * n }, (_, i) => (
          <i key={i} style={at((i % n) + Math.floor(i / n))} />
        ))}
      </span>
    );
  }

  return (
    <span role="status" className={`hb-ll ${className}`} style={vars} {...rest}>
      <style href="hb-lattice-loader" precedence="default">{css}</style>
      {body}
      <span className="hb-ll-sr">{label}</span>
    </span>
  );
}

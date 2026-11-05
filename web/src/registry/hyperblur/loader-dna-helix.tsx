"use client";

import * as React from "react";

export interface LoaderDnaHelixProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  rungs?: number;
  label?: string;
}

const css = `
.hb-yb3 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb3 *, .hb-yb3 *::before, .hb-yb3 *::after { box-sizing: border-box; }
.hb-yb3-h {
  display: flex;
  flex: none;
  align-items: stretch;
  gap: var(--hb-yb3-g);
  height: var(--hb-yb3-s);
}
.hb-yb3-r {
  position: relative;
  width: var(--hb-yb3-p);
  height: 100%;
}
.hb-yb3-r i,
.hb-yb3-r u {
  position: absolute;
  left: 0;
  top: calc(50% - var(--hb-yb3-p) / 2);
  display: block;
  width: var(--hb-yb3-p);
  height: var(--hb-yb3-p);
  animation: hb-yb3-y var(--hb-yb3-d) linear infinite;
  animation-delay: calc(var(--hb-yb3-i) * var(--hb-yb3-d) * -0.1);
}
.hb-yb3-r u {
  text-decoration: none;
  animation-delay: calc(var(--hb-yb3-i) * var(--hb-yb3-d) * -0.1 - var(--hb-yb3-d) / 2);
}
.hb-yb3-r i b,
.hb-yb3-r u b {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: hb-yb3-z var(--hb-yb3-d) infinite;
  animation-delay: inherit;
}
.hb-yb3-r i b {
  background: radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.55), transparent 55%), var(--hb-yb3-c);
}
.hb-yb3-r u b {
  background: radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.55), transparent 55%), var(--hb-yb3-a);
}
.hb-yb3-r s {
  position: absolute;
  left: calc(50% - 1px);
  top: calc(50% - var(--hb-yb3-m));
  display: block;
  width: 2px;
  height: calc(var(--hb-yb3-m) * 2);
  border-radius: 1px;
  background: linear-gradient(var(--hb-yb3-c), var(--hb-yb3-a));
  opacity: 0.35;
  transform: scaleY(0);
  animation: hb-yb3-bar calc(var(--hb-yb3-d) / 2) linear infinite;
  animation-delay: calc(var(--hb-yb3-i) * var(--hb-yb3-d) * -0.1);
}
.hb-yb3-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb3-sr {
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
@keyframes hb-yb3-y {
  0% { transform: translateY(0); animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1); }
  25% { transform: translateY(var(--hb-yb3-m)); animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1); }
  75% { transform: translateY(calc(var(--hb-yb3-m) * -1)); animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715); }
  100% { transform: translateY(0); }
}
@keyframes hb-yb3-z {
  0%, 100% { transform: scale(1); opacity: 1; animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1); }
  50% { transform: scale(0.5); opacity: 0.5; animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1); }
}
@keyframes hb-yb3-bar {
  0% { transform: scaleY(0); animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1); }
  50% { transform: scaleY(1); animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715); }
  100% { transform: scaleY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb3-r i, .hb-yb3-r u, .hb-yb3-r i b, .hb-yb3-r u b, .hb-yb3-r s { animation-play-state: paused; }
}
`;

export function LoaderDnaHelix({
  size = 48,
  color = "#2f7bff",
  accent = "#ff6b9a",
  speed = 2.4,
  rungs = 10,
  label,
  className = "",
  style,
  ...rest
}: LoaderDnaHelixProps) {
  const n = Math.max(4, Math.min(20, Math.round(rungs)));
  const dot = Math.max(3, size * 0.14);
  const vars = {
    "--hb-yb3-s": `${size}px`,
    "--hb-yb3-p": `${dot.toFixed(2)}px`,
    "--hb-yb3-g": `${(dot * 0.9).toFixed(2)}px`,
    "--hb-yb3-m": `${((size - dot) / 2).toFixed(2)}px`,
    "--hb-yb3-d": `${(speed > 0 ? speed : 2.4).toFixed(3)}s`,
    "--hb-yb3-c": color,
    "--hb-yb3-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <span role="status" className={`hb-yb3 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-dna-helix" precedence="default">{css}</style>
      <span className="hb-yb3-h" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => {
          const at = { "--hb-yb3-i": i } as React.CSSProperties;
          return (
            <span key={i} className="hb-yb3-r" style={at}>
              <s />
              <i>
                <b />
              </i>
              <u>
                <b />
              </u>
            </span>
          );
        })}
      </span>
      <span className={label ? "hb-yb3-l" : "hb-yb3-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

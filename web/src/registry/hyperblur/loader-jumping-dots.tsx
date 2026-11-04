"use client";

import * as React from "react";

export interface LoaderJumpingDotsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  height?: number;
  color?: string;
  speed?: number;
  label?: string;
}

const css = `
@keyframes hb-zz8-jump {
  0% { transform: translateY(0) scale(1.32, 0.68); animation-timing-function: cubic-bezier(0.3, 0.9, 0.5, 1); }
  9% { transform: translateY(calc(var(--hb-zz8-h) * -0.16)) scale(0.88, 1.17); animation-timing-function: cubic-bezier(0.15, 0.75, 0.35, 1); }
  50% { transform: translateY(calc(var(--hb-zz8-h) * -1)) scale(1, 1); animation-timing-function: cubic-bezier(0.65, 0, 0.9, 0.45); }
  91% { transform: translateY(calc(var(--hb-zz8-h) * -0.08)) scale(0.9, 1.18); animation-timing-function: ease-in; }
  100% { transform: translateY(0) scale(1.32, 0.68); }
}
@keyframes hb-zz8-ground {
  0% { transform: scaleX(1.3); opacity: 0.6; animation-timing-function: cubic-bezier(0.15, 0.75, 0.35, 1); }
  50% { transform: scaleX(0.42); opacity: 0.14; animation-timing-function: cubic-bezier(0.65, 0, 0.9, 0.45); }
  100% { transform: scaleX(1.3); opacity: 0.6; }
}
.hb-zz8 {
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-end;
  gap: calc(var(--hb-zz8-s) * 0.9);
  height: calc(var(--hb-zz8-h) + var(--hb-zz8-s) * 1.4);
  font-family: inherit;
}
.hb-zz8 *, .hb-zz8 *::before, .hb-zz8 *::after { box-sizing: border-box; }
.hb-zz8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.hb-zz8-d {
  position: relative;
  flex: none;
  width: var(--hb-zz8-s);
  height: 100%;
}
.hb-zz8-b {
  position: absolute;
  left: 0;
  bottom: calc(var(--hb-zz8-s) * 0.3);
  width: var(--hb-zz8-s);
  height: var(--hb-zz8-s);
  border-radius: 50%;
  background: radial-gradient(circle at 34% 28%, color-mix(in srgb, var(--hb-zz8-c) 45%, #ffffff), var(--hb-zz8-c) 62%);
  transform-origin: 50% 100%;
  animation: hb-zz8-jump var(--hb-zz8-t) infinite backwards;
  animation-delay: calc(var(--hb-zz8-i) * var(--hb-zz8-t) * 0.15);
}
.hb-zz8-g {
  position: absolute;
  left: 0;
  bottom: 0;
  width: var(--hb-zz8-s);
  height: calc(var(--hb-zz8-s) * 0.26);
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-zz8-c) 55%, transparent);
  filter: blur(1.5px);
  animation: hb-zz8-ground var(--hb-zz8-t) infinite backwards;
  animation-delay: calc(var(--hb-zz8-i) * var(--hb-zz8-t) * 0.15);
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz8-b, .hb-zz8-g { animation: none; }
}
`;

export function LoaderJumpingDots({
  size = 16,
  height = 30,
  color = "#2f7bff",
  speed = 0.9,
  label = "Loading",
  className = "",
  style,
  ...rest
}: LoaderJumpingDotsProps) {
  const vars = {
    ["--hb-zz8-s" as string]: `${size}px`,
    ["--hb-zz8-h" as string]: `${height}px`,
    ["--hb-zz8-c" as string]: color,
    ["--hb-zz8-t" as string]: `${Math.max(0.3, speed).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div role="status" {...rest} className={`hb-zz8${className ? ` ${className}` : ""}`} style={vars}>
      <style href="hb-loader-jumping-dots" precedence="default">{css}</style>
      <span className="hb-zz8-sr">{label}</span>
      {[0, 1, 2].map((i) => (
        <span key={i} className="hb-zz8-d" aria-hidden="true" style={{ ["--hb-zz8-i" as string]: i } as React.CSSProperties}>
          <span className="hb-zz8-g" />
          <span className="hb-zz8-b" />
        </span>
      ))}
    </div>
  );
}

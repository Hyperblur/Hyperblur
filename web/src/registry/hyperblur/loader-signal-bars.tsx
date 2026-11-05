"use client";

import * as React from "react";

export interface LoaderSignalBarsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  bars?: number;
  label?: string;
}

const css = `
.hb-yb5 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb5 *, .hb-yb5 *::before, .hb-yb5 *::after { box-sizing: border-box; }
.hb-yb5-b {
  display: flex;
  flex: none;
  align-items: flex-end;
  gap: calc(var(--hb-yb5-s) * 0.09);
  height: var(--hb-yb5-s);
}
.hb-yb5-b i {
  display: block;
  width: calc(var(--hb-yb5-s) * 0.17);
  height: calc(var(--hb-yb5-h) * 100%);
  min-height: 3px;
  border-radius: calc(var(--hb-yb5-s) * 0.06);
  background: linear-gradient(180deg, var(--hb-yb5-a), var(--hb-yb5-c));
  transform-origin: 50% 100%;
  transform: scaleY(0.3);
  opacity: 0.22;
  animation: hb-yb5-rise var(--hb-yb5-d) cubic-bezier(0.22, 1, 0.36, 1) infinite;
  animation-delay: calc(var(--hb-yb5-i) * var(--hb-yb5-d) * 0.11);
}
.hb-yb5-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb5-sr {
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
@keyframes hb-yb5-rise {
  0% { transform: scaleY(0.3); opacity: 0.22; }
  22%, 66% { transform: scaleY(1); opacity: 1; }
  88%, 100% { transform: scaleY(0.3); opacity: 0.22; }
}
@keyframes hb-yb5-fade {
  0%, 100% { opacity: 0.22; }
  22%, 66% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb5-b i { transform: none; animation-name: hb-yb5-fade; animation-timing-function: ease-in-out; }
}
`;

export function LoaderSignalBars({
  size = 36,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 1.8,
  bars = 4,
  label,
  className = "",
  style,
  ...rest
}: LoaderSignalBarsProps) {
  const n = Math.max(3, Math.min(7, Math.round(bars)));
  const vars = {
    "--hb-yb5-s": `${size}px`,
    "--hb-yb5-d": `${(speed > 0 ? speed : 1.8).toFixed(3)}s`,
    "--hb-yb5-c": color,
    "--hb-yb5-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <span role="status" className={`hb-yb5 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-signal-bars" precedence="default">{css}</style>
      <span className="hb-yb5-b" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => (
          <i
            key={i}
            style={
              {
                "--hb-yb5-i": i,
                "--hb-yb5-h": ((i + 1) / n).toFixed(3),
              } as React.CSSProperties
            }
          />
        ))}
      </span>
      <span className={label ? "hb-yb5-l" : "hb-yb5-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

"use client";

import * as React from "react";

export interface LoaderWaveDotsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  dots?: number;
  speed?: number;
  label?: string;
}

const css = `
.hb-qc2 {
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
.hb-qc2 *, .hb-qc2 *::before, .hb-qc2 *::after { box-sizing: border-box; }
.hb-qc2-g {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
  width: var(--hb-qc2-s);
  height: calc(var(--hb-qc2-s) / (var(--hb-qc2-n) * 2 - 1) * 3);
}
.hb-qc2-g > i {
  flex: none;
  width: calc(var(--hb-qc2-s) / (var(--hb-qc2-n) * 2 - 1));
  height: calc(var(--hb-qc2-s) / (var(--hb-qc2-n) * 2 - 1));
  border-radius: 50%;
  background: var(--hb-qc2-c);
  animation: hb-qc2-wave var(--hb-qc2-t) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--hb-qc2-t) / var(--hb-qc2-n) * -0.9);
}
.hb-qc2-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc2-sr {
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
@keyframes hb-qc2-wave {
  0%, 100% { transform: translateY(70%) scale(0.85); background: var(--hb-qc2-c); opacity: 0.55; }
  50% { transform: translateY(-70%) scale(1.1); background: var(--hb-qc2-a); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc2-g > i { animation: none; opacity: 0.8; }
}
`;

export function LoaderWaveDots({
  size = 72,
  color = "#2f7bff",
  accent = "#9fc6ff",
  dots = 7,
  speed = 1.4,
  label,
  className = "",
  style,
  ...rest
}: LoaderWaveDotsProps) {
  const n = Math.max(2, Math.round(dots));
  const vars = {
    "--hb-qc2-s": `${size}px`,
    "--hb-qc2-c": color,
    "--hb-qc2-a": accent,
    "--hb-qc2-n": n,
    "--hb-qc2-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-wave-dots" precedence="default">{css}</style>
      <span role="status" className={`hb-qc2 ${className}`} style={vars} {...rest}>
        <span className="hb-qc2-g" aria-hidden="true">
          {Array.from({ length: n }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </span>
        <span className={label ? "hb-qc2-l" : "hb-qc2-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

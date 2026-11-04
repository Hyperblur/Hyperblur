"use client";

import * as React from "react";

export interface LoaderEqualizerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  bars?: number;
  label?: string;
}

const css = `
.hb-qc3 {
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
.hb-qc3 *, .hb-qc3 *::before, .hb-qc3 *::after { box-sizing: border-box; }
.hb-qc3-g {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  gap: calc(var(--hb-qc3-s) * 0.1);
  height: var(--hb-qc3-s);
}
.hb-qc3-g > i {
  flex: none;
  width: calc(var(--hb-qc3-s) * 0.14);
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(to top, var(--hb-qc3-c), var(--hb-qc3-a));
  transform: scaleY(0.2);
  animation: hb-qc3-bounce var(--d) ease-in-out infinite;
  animation-delay: var(--w);
}
.hb-qc3-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc3-sr {
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
@keyframes hb-qc3-bounce {
  0%, 100% { transform: scaleY(0.2); }
  28% { transform: scaleY(1); }
  52% { transform: scaleY(0.42); }
  78% { transform: scaleY(0.82); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc3-g > i { animation: none; transform: scaleY(0.6); }
}
`;

export function LoaderEqualizer({
  size = 32,
  color = "#2f7bff",
  accent = "#7fb3ff",
  bars = 5,
  label,
  className = "",
  style,
  ...rest
}: LoaderEqualizerProps) {
  const n = Math.max(2, Math.round(bars));
  const vars = {
    "--hb-qc3-s": `${size}px`,
    "--hb-qc3-c": color,
    "--hb-qc3-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-equalizer" precedence="default">{css}</style>
      <span role="status" className={`hb-qc3 ${className}`} style={vars} {...rest}>
        <span className="hb-qc3-g" aria-hidden="true">
          {Array.from({ length: n }, (_, i) => {
            const h = Math.imul(i + 3, 2654435761) >>> 0;
            const dur = 0.72 + (h % 7) * 0.09;
            const wait = -((h >>> 8) % 10) * 0.11;
            return (
              <i
                key={i}
                style={
                  {
                    "--d": `${dur.toFixed(2)}s`,
                    "--w": `${wait.toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </span>
        <span className={label ? "hb-qc3-l" : "hb-qc3-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}

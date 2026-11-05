"use client";

import * as React from "react";

export interface LoaderBouncingBallsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  tint?: string;
  speed?: number;
  label?: string;
}

const css = `
.hb-yb7 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb7 *, .hb-yb7 *::before, .hb-yb7 *::after { box-sizing: border-box; }
.hb-yb7-row {
  display: flex;
  flex: none;
  align-items: flex-end;
  gap: calc(var(--hb-yb7-s) * 0.22);
  height: var(--hb-yb7-s);
}
.hb-yb7-cell {
  position: relative;
  flex: none;
  width: var(--hb-yb7-p);
  height: 100%;
}
.hb-yb7-sh {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(var(--hb-yb7-p) * 0.26);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  filter: blur(1px);
  transform: scale(1.1);
  animation: hb-yb7-shadow var(--hb-yb7-d) linear infinite;
  animation-delay: calc(var(--hb-yb7-i) * var(--hb-yb7-d) * -0.17);
}
.hb-yb7-up {
  position: absolute;
  left: 0;
  bottom: calc(var(--hb-yb7-p) * 0.1);
  width: 100%;
  height: var(--hb-yb7-p);
  animation: hb-yb7-hop var(--hb-yb7-d) linear infinite;
  animation-delay: calc(var(--hb-yb7-i) * var(--hb-yb7-d) * -0.17);
}
.hb-yb7-ball {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.6), transparent 46%), var(--hb-yb7-k);
  box-shadow: 0 0 calc(var(--hb-yb7-p) * 0.6) -2px var(--hb-yb7-k);
  transform-origin: 50% 100%;
  animation: hb-yb7-squash var(--hb-yb7-d) linear infinite;
  animation-delay: calc(var(--hb-yb7-i) * var(--hb-yb7-d) * -0.17);
}
.hb-yb7-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb7-sr {
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
@keyframes hb-yb7-hop {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.22, 0.6, 0.36, 1); }
  50% { transform: translateY(calc(var(--hb-yb7-h) * -1)); animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0.4); }
}
@keyframes hb-yb7-squash {
  0%, 100% { transform: scale(1.22, 0.78); }
  9% { transform: scale(0.92, 1.1); }
  22%, 78% { transform: scale(1, 1); }
  91% { transform: scale(0.94, 1.08); }
}
@keyframes hb-yb7-shadow {
  0%, 100% { transform: scale(1.12); opacity: 0.55; animation-timing-function: cubic-bezier(0.22, 0.6, 0.36, 1); }
  50% { transform: scale(0.45); opacity: 0.16; animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0.4); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb7-sh, .hb-yb7-up, .hb-yb7-ball { animation-play-state: paused; }
}
`;

export function LoaderBouncingBalls({
  size = 44,
  color = "#2f7bff",
  accent = "#7fb3ff",
  tint = "#ff6b9a",
  speed = 0.9,
  label,
  className = "",
  style,
  ...rest
}: LoaderBouncingBallsProps) {
  const ball = Math.max(6, size * 0.26);
  const vars = {
    "--hb-yb7-s": `${size}px`,
    "--hb-yb7-p": `${ball.toFixed(2)}px`,
    "--hb-yb7-h": `${(size - ball * 1.4).toFixed(2)}px`,
    "--hb-yb7-d": `${(speed > 0 ? speed : 0.9).toFixed(3)}s`,
    ...style,
  } as React.CSSProperties;
  const tones = [color, accent, tint];

  return (
    <span role="status" className={`hb-yb7 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-bouncing-balls" precedence="default">{css}</style>
      <span className="hb-yb7-row" aria-hidden="true">
        {tones.map((tone, i) => {
          const at = { "--hb-yb7-i": i, "--hb-yb7-k": tone } as React.CSSProperties;
          return (
            <span key={i} className="hb-yb7-cell" style={at}>
              <span className="hb-yb7-sh" />
              <span className="hb-yb7-up">
                <span className="hb-yb7-ball" />
              </span>
            </span>
          );
        })}
      </span>
      <span className={label ? "hb-yb7-l" : "hb-yb7-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

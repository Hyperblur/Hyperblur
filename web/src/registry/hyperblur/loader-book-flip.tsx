"use client";

import * as React from "react";

export interface LoaderBookFlipProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  pages?: number;
  label?: string;
}

const css = `
.hb-yb6 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb6 *, .hb-yb6 *::before, .hb-yb6 *::after { box-sizing: border-box; }
.hb-yb6-bk {
  flex: none;
  width: var(--hb-yb6-s);
  height: calc(var(--hb-yb6-s) * 0.7);
  perspective: calc(var(--hb-yb6-s) * 9);
}
.hb-yb6-st {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(22deg);
}
.hb-yb6-cv {
  position: absolute;
  inset: calc(var(--hb-yb6-s) * -0.045);
  border-radius: calc(var(--hb-yb6-s) * 0.06);
  background: linear-gradient(160deg, var(--hb-yb6-c), rgba(0, 0, 0, 0.35)), var(--hb-yb6-c);
  box-shadow: 0 calc(var(--hb-yb6-s) * 0.08) calc(var(--hb-yb6-s) * 0.18) rgba(0, 0, 0, 0.45);
  transform: translateZ(-1px);
}
.hb-yb6-sp {
  position: absolute;
  left: calc(50% - 1px);
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 0, 0, 0.4);
  transform: translateZ(0.2px);
}
.hb-yb6-bs {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), transparent 26%), var(--hb-yb6-a);
  filter: brightness(0.86);
}
.hb-yb6-bs-l { left: 0; border-radius: 3px 0 0 3px; transform: translateZ(0.1px); }
.hb-yb6-bs-r { left: 50%; border-radius: 0 3px 3px 0; transform: translateZ(0.1px); }
.hb-yb6-p {
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.16), transparent 24%), var(--hb-yb6-a);
  transform-origin: 0 50%;
  transform: rotateY(var(--hb-yb6-r, 0deg)) translateZ(var(--hb-yb6-z));
  animation: hb-yb6-flip var(--hb-yb6-d) infinite;
  animation-delay: calc(var(--hb-yb6-i) * var(--hb-yb6-d) * 0.11);
}
.hb-yb6-p::after {
  content: "";
  position: absolute;
  inset: 16% 14% 16% 20%;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0,
    rgba(0, 0, 0, 0.24) 1.5px,
    transparent 1.5px,
    transparent calc(var(--hb-yb6-s) * 0.085)
  );
}
.hb-yb6-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb6-sr {
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
@keyframes hb-yb6-flip {
  0%, 6% {
    transform: rotateY(0deg) translateZ(var(--hb-yb6-z));
    opacity: 1;
    animation-timing-function: cubic-bezier(0.5, 0, 0.25, 1);
  }
  34%, 78% { transform: rotateY(-180deg) translateZ(var(--hb-yb6-z)); opacity: 1; }
  90% { transform: rotateY(-180deg) translateZ(var(--hb-yb6-z)); opacity: 0; }
  90.1% { transform: rotateY(0deg) translateZ(var(--hb-yb6-z)); opacity: 0; }
  100% { transform: rotateY(0deg) translateZ(var(--hb-yb6-z)); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb6-p { animation: none; }
  .hb-yb6-p:nth-of-type(-n + 2) { --hb-yb6-r: -180deg; }
}
`;

export function LoaderBookFlip({
  size = 56,
  color = "#2f7bff",
  accent = "#ece8df",
  speed = 3.2,
  pages = 5,
  label,
  className = "",
  style,
  ...rest
}: LoaderBookFlipProps) {
  const n = Math.max(3, Math.min(8, Math.round(pages)));
  const vars = {
    "--hb-yb6-s": `${size}px`,
    "--hb-yb6-d": `${(speed > 0 ? speed : 3.2).toFixed(3)}s`,
    "--hb-yb6-c": color,
    "--hb-yb6-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <span role="status" className={`hb-yb6 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-book-flip" precedence="default">{css}</style>
      <span className="hb-yb6-bk" aria-hidden="true">
        <span className="hb-yb6-st">
          <b className="hb-yb6-cv" />
          <b className="hb-yb6-bs hb-yb6-bs-l" />
          <b className="hb-yb6-bs hb-yb6-bs-r" />
          <b className="hb-yb6-sp" />
          {Array.from({ length: n }, (_, i) => (
            <i
              key={i}
              className="hb-yb6-p"
              style={
                {
                  "--hb-yb6-i": i,
                  "--hb-yb6-z": `${((n - i) * 0.6).toFixed(2)}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </span>
      <span className={label ? "hb-yb6-l" : "hb-yb6-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}

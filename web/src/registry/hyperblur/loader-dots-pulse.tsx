"use client";

import * as React from "react";

export interface LoaderDotsPulseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const css = `
@keyframes hb-zz9-beat {
  0%, 70%, 100% {
    transform: scale(0.55);
    opacity: 0.28;
    background-color: var(--hb-zz9-c);
    box-shadow: 0 0 0 0 transparent;
  }
  35% {
    transform: scale(1);
    opacity: 1;
    background-color: var(--hb-zz9-a);
    box-shadow: 0 0 calc(var(--hb-zz9-s) * 1.1) color-mix(in srgb, var(--hb-zz9-a) 55%, transparent);
  }
}
.hb-zz9 {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  font-family: inherit;
  color: inherit;
}
.hb-zz9 *, .hb-zz9 *::before, .hb-zz9 *::after { box-sizing: border-box; }
.hb-zz9-sr {
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
.hb-zz9-l { font-size: 0.9375em; line-height: 1.3; white-space: nowrap; }
.hb-zz9-r {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-zz9-s) * 0.6);
}
.hb-zz9-d {
  flex: none;
  width: var(--hb-zz9-s);
  height: var(--hb-zz9-s);
  border-radius: 50%;
  background-color: var(--hb-zz9-c);
  transform: scale(0.55);
  opacity: 0.28;
  animation: hb-zz9-beat var(--hb-zz9-t) ease-in-out infinite;
  animation-delay: calc(var(--hb-zz9-i) * var(--hb-zz9-t) * 0.16);
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz9-d { animation: none; opacity: 0.75; transform: scale(0.8); }
}
`;

export function LoaderDotsPulse({
  size = 10,
  color = "#3a6fcf",
  accent = "#7fb3ff",
  speed = 1.3,
  label,
  className = "",
  style,
  ...rest
}: LoaderDotsPulseProps) {
  const vars = {
    ["--hb-zz9-s" as string]: `${size}px`,
    ["--hb-zz9-c" as string]: color,
    ["--hb-zz9-a" as string]: accent,
    ["--hb-zz9-t" as string]: `${Math.max(0.4, speed).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div role="status" {...rest} className={`hb-zz9${className ? ` ${className}` : ""}`} style={vars}>
      <style href="hb-loader-dots-pulse" precedence="default">{css}</style>
      {label ? null : <span className="hb-zz9-sr">Loading</span>}
      {label ? <span className="hb-zz9-l">{label}</span> : null}
      <span className="hb-zz9-r" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="hb-zz9-d" style={{ ["--hb-zz9-i" as string]: i } as React.CSSProperties} />
        ))}
      </span>
    </div>
  );
}

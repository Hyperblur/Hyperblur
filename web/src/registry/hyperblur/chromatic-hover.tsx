"use client";

import * as React from "react";

export interface ChromaticHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What to wrap. */
  children: React.ReactNode;
  /** Offset of the color fringes in pixels. */
  strength?: number;
  /** Run without hover. */
  always?: boolean;
}

const css = `
@keyframes hb-ch-jitter {
  0%, 100% { filter: drop-shadow(calc(var(--hb-s) * -1) 0 0 rgba(25,195,245,.85)) drop-shadow(var(--hb-s) 0 0 rgba(255,47,160,.85)); }
  33% { filter: drop-shadow(calc(var(--hb-s) * -1.6) 1px 0 rgba(25,195,245,.85)) drop-shadow(calc(var(--hb-s) * .6) -1px 0 rgba(255,47,160,.85)); }
  66% { filter: drop-shadow(calc(var(--hb-s) * -.4) -1px 0 rgba(25,195,245,.85)) drop-shadow(calc(var(--hb-s) * 1.4) 1px 0 rgba(255,47,160,.85)); }
}
.hb-ch { display: inline-block; transition: filter .15s ease; }
.hb-ch:hover, .hb-ch[data-always="true"] { animation: hb-ch-jitter .5s steps(3) infinite; }
@media (prefers-reduced-motion: reduce) { .hb-ch { animation: none !important; } }
`;

export function ChromaticHover({
  children,
  strength = 3,
  always = false,
  className = "",
  style,
  ...rest
}: ChromaticHoverProps) {
  const vars = { "--hb-s": `${strength}px`, ...style } as React.CSSProperties;

  return (
    <div className={`hb-ch ${className}`} style={vars} data-always={always} {...rest}>
      <style href="hb-chromatic-hover" precedence="default">{css}</style>
      {children}
    </div>
  );
}

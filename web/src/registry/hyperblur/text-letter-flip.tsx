"use client";

import * as React from "react";

export interface TextLetterFlipProps extends React.HTMLAttributes<HTMLSpanElement> {
  words?: string[];
  interval?: number;
  duration?: number;
  stagger?: number;
  axis?: "x" | "y";
  pauseOnHover?: boolean;
  paused?: boolean;
}

const css = `
.hb-vi4 {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  font-family: inherit;
  white-space: pre;
  perspective: 6em;
  box-sizing: border-box;
}
.hb-vi4 *, .hb-vi4 *::before, .hb-vi4 *::after { box-sizing: border-box; }
.hb-vi4-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi4-cell {
  position: relative;
  display: inline-grid;
  justify-items: center;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--hb-vi4-r) * 180deg));
  transition: transform var(--hb-vi4-dur) cubic-bezier(.68, -0.32, .26, 1.32);
  transition-delay: calc(var(--hb-vi4-i) * var(--hb-vi4-stagger));
}
.hb-vi4-f {
  grid-area: 1 / 1;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.hb-vi4-b { transform: rotateX(180deg); }
.hb-vi4[data-axis="y"] .hb-vi4-cell { transform: rotateY(calc(var(--hb-vi4-r) * 180deg)); }
.hb-vi4[data-axis="y"] .hb-vi4-b { transform: rotateY(180deg); }
@media (prefers-reduced-motion: reduce) {
  .hb-vi4 .hb-vi4-cell { transition: none; }
}
`;

export function TextLetterFlip({
  words = ["DESIGN", "DEPLOY", "DELIGHT"],
  interval = 2.6,
  duration = 0.8,
  stagger = 0.06,
  axis = "x",
  pauseOnHover = true,
  paused = false,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TextLetterFlipProps) {
  const list = words.length ? words : [""];
  const [index, setIndex] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const width = Math.max(...list.map((w) => Array.from(w).length));
  const halt = paused || (pauseOnHover && hover) || list.length < 2;

  React.useEffect(() => {
    if (halt) return;
    const id = setInterval(() => setIndex((i) => i + 1), interval * 1000);
    return () => clearInterval(id);
  }, [halt, interval]);

  const at = (m: number) => {
    const k = ((m % list.length) + list.length) % list.length;
    return Array.from(list[k]);
  };
  const even = index % 2 === 0 ? at(index) : at(index - 1);
  const odd = index % 2 === 1 ? at(index) : at(index - 1);
  const current = list[((index % list.length) + list.length) % list.length];

  const vars = {
    "--hb-vi4-dur": `${duration}s`,
    "--hb-vi4-stagger": `${stagger}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`hb-vi4 ${className}`}
      style={vars}
      data-axis={axis}
      onMouseEnter={(e) => {
        setHover(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-letter-flip" precedence="default">{css}</style>
      <span className="hb-vi4-sr">{current}</span>
      {Array.from({ length: width }, (_, k) => (
        <span
          key={k}
          aria-hidden="true"
          className="hb-vi4-cell"
          style={{ "--hb-vi4-r": index, "--hb-vi4-i": k } as React.CSSProperties}
        >
          <span className="hb-vi4-f">{even[k] ?? " "}</span>
          <span className="hb-vi4-f hb-vi4-b">{odd[k] ?? " "}</span>
        </span>
      ))}
    </span>
  );
}

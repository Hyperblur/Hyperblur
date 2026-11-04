"use client";

import * as React from "react";

export interface TextOdometerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  cycle?: (string | number)[];
  interval?: number;
  duration?: number;
  stagger?: number;
  animateOnMount?: boolean;
  fade?: boolean;
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const css = `
.hb-qd8 {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  line-height: 1.2;
  white-space: pre;
  font-variant-numeric: tabular-nums;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-qd8 *, .hb-qd8 *::before, .hb-qd8 *::after { box-sizing: border-box; }
.hb-qd8-sr {
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
.hb-qd8-c {
  display: inline-block;
  height: 1.2em;
  overflow: hidden;
}
.hb-qd8[data-fade] .hb-qd8-c {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 0.2em, #000 calc(100% - 0.2em), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 0.2em, #000 calc(100% - 0.2em), transparent 100%);
}
.hb-qd8-s {
  display: flex;
  flex-direction: column;
  transform: translate3d(0, calc(var(--hb-qd8-d) * -10%), 0);
  transition: transform var(--hb-qd8-dur) cubic-bezier(.2, .9, .22, 1);
  transition-delay: calc(var(--hb-qd8-n) * var(--hb-qd8-stagger));
  will-change: transform;
}
.hb-qd8-s > span { display: block; height: 1.2em; text-align: center; }
.hb-qd8-x { display: inline-block; height: 1.2em; }
@media (prefers-reduced-motion: reduce) {
  .hb-qd8-s { transition: none; will-change: auto; }
}
`;

export function TextOdometer({
  value,
  cycle,
  interval = 2.6,
  duration = 1.1,
  stagger = 0.07,
  animateOnMount = true,
  fade = true,
  className = "",
  style,
  ...rest
}: TextOdometerProps) {
  const [armed, setArmed] = React.useState(!animateOnMount);
  const [index, setIndex] = React.useState(0);
  const count = cycle ? cycle.length : 0;

  React.useEffect(() => {
    if (armed) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setArmed(true)));
    return () => cancelAnimationFrame(id);
  }, [armed]);

  React.useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), Math.max(0.6, interval) * 1000);
    return () => clearInterval(id);
  }, [count, interval]);

  const current = String(cycle && count > 0 ? cycle[index % count] : value);
  const shown = armed ? current : current.replace(/[0-9]/g, "0");
  const chars = Array.from(shown);
  const len = chars.length;

  const vars = {
    "--hb-qd8-dur": `${duration}s`,
    "--hb-qd8-stagger": `${stagger}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-qd8 ${className}`} style={vars} data-fade={fade ? "" : undefined} {...rest}>
      <style href="hb-text-odometer" precedence="default">{css}</style>
      <span className="hb-qd8-sr">{current}</span>
      {chars.map((ch, i) => {
        const fromRight = len - 1 - i;
        if (!/[0-9]/.test(ch)) {
          return (
            <span key={`x${fromRight}`} className="hb-qd8-x" aria-hidden="true">
              {ch}
            </span>
          );
        }
        const cell = { "--hb-qd8-d": Number(ch), "--hb-qd8-n": fromRight } as React.CSSProperties;
        return (
          <span key={`d${fromRight}`} className="hb-qd8-c" aria-hidden="true">
            <span className="hb-qd8-s" style={cell}>
              {digits.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

"use client";

import * as React from "react";

export interface TextShatterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  trigger?: "hover" | "click";
  force?: number;
  accent?: string;
  autoPlay?: boolean;
  interval?: number;
  onShatterChange?: (shattered: boolean) => void;
}

const css = `
.hb-vi14 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
  outline: none;
  cursor: default;
}
.hb-vi14 *, .hb-vi14 *::before, .hb-vi14 *::after { box-sizing: border-box; }
.hb-vi14[role="button"] { cursor: pointer; border-radius: 0.12em; }
.hb-vi14:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-vi14-accent); }
.hb-vi14-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi14-w { display: inline-block; white-space: nowrap; }
.hb-vi14-c { position: relative; display: inline-grid; }
.hb-vi14-g {
  grid-area: 1 / 1;
  opacity: 1;
  transition: opacity 0s linear calc(var(--hb-vi14-cb) + 1s);
}
.hb-vi14[data-on] .hb-vi14-g { opacity: 0; transition-delay: var(--hb-vi14-co); }
.hb-vi14-s {
  grid-area: 1 / 1;
  clip-path: var(--hb-vi14-clip);
  opacity: 0;
  transform: translate3d(0, 0, 0) rotate(0deg);
  transition:
    transform 0.9s cubic-bezier(.34, 1.36, .5, 1) var(--hb-vi14-back),
    color 0.6s ease var(--hb-vi14-back),
    opacity 0s linear calc(var(--hb-vi14-cb) + 1s);
}
.hb-vi14[data-on] .hb-vi14-s {
  transform: translate3d(var(--hb-vi14-x), var(--hb-vi14-y), 0) rotate(var(--hb-vi14-r));
  color: color-mix(in oklab, var(--hb-vi14-accent) var(--hb-vi14-tint), currentColor);
  opacity: 0.94;
  transition:
    transform 0.55s cubic-bezier(.12, .8, .2, 1) var(--hb-vi14-co),
    color 0.3s ease var(--hb-vi14-co),
    opacity 0s linear var(--hb-vi14-co);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi14 .hb-vi14-s, .hb-vi14[data-on] .hb-vi14-s { display: none; }
  .hb-vi14 .hb-vi14-g, .hb-vi14[data-on] .hb-vi14-g { opacity: 1; transition: none; }
}
`;

function hash(n: number) {
  let x = (n | 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

function unit(n: number) {
  return (hash(n) % 10000) / 10000;
}

const sides: [number, number, number, number][] = [
  [0, 0, 100, 0],
  [100, 0, 100, 100],
  [100, 100, 0, 100],
  [0, 100, 0, 0],
];

export function TextShatter({
  text,
  trigger = "hover",
  force = 1,
  accent = "#7fb3ff",
  autoPlay = false,
  interval = 2.6,
  onShatterChange,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  ...rest
}: TextShatterProps) {
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);
  const total = React.useMemo(() => Array.from(text).filter((c) => c.trim() !== "").length, [text]);
  const [on, setOn] = React.useState(false);
  const [origin, setOrigin] = React.useState(-1);
  const [hover, setHover] = React.useState(false);

  const set = React.useCallback(
    (v: boolean) => {
      setOn((cur) => {
        if (cur !== v) onShatterChange?.(v);
        return v;
      });
    },
    [onShatterChange],
  );

  React.useEffect(() => {
    if (!autoPlay || hover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => {
      setOrigin(-1);
      set(!on);
    }, (on ? interval * 0.45 : interval) * 1000);
    return () => clearTimeout(id);
  }, [autoPlay, hover, on, interval, set]);

  const vars = { "--hb-vi14-accent": accent, ...style } as React.CSSProperties;
  const center = origin >= 0 ? origin : (total - 1) / 2;
  let n = 0;
  const interactive = trigger === "click";

  return (
    <span
      className={`hb-vi14 ${className}`}
      style={vars}
      data-on={on ? "" : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? on : undefined}
      onMouseEnter={(e) => {
        setHover(true);
        if (trigger === "hover") set(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        if (trigger === "hover") set(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        if (trigger === "hover") set(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (trigger === "hover") set(false);
        onBlur?.(e);
      }}
      onClick={(e) => {
        if (interactive) set(!on);
        onClick?.(e);
      }}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          set(!on);
        }
        onKeyDown?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-shatter" precedence="default">{css}</style>
      {interactive ? null : <span className="hb-vi14-sr">{text}</span>}
      <span aria-hidden={interactive ? undefined : true} aria-label={interactive ? text : undefined} role={interactive ? "img" : undefined}>
        {words.map((word, wi) => {
          if (word.trim() === "") return <React.Fragment key={wi}>{word}</React.Fragment>;
          return (
            <span className="hb-vi14-w" key={wi}>
              {Array.from(word).map((ch, ci) => {
                const i = n++;
                const cx = 32 + unit(i * 11 + 1) * 36;
                const cy = 30 + unit(i * 11 + 2) * 40;
                const dist = Math.abs(i - center);
                return (
                  <span
                    key={ci}
                    className="hb-vi14-c"
                    style={
                      {
                        "--hb-vi14-co": `${(dist * 0.018).toFixed(3)}s`,
                        "--hb-vi14-cb": `${(dist * 0.012).toFixed(3)}s`,
                      } as React.CSSProperties
                    }
                    onMouseEnter={trigger === "hover" && !on ? () => setOrigin(i) : undefined}
                  >
                    <span className="hb-vi14-g">{ch}</span>
                    {sides.map(([x1, y1, x2, y2], s) => {
                      const mx = (x1 + x2) / 2 - cx;
                      const my = (y1 + y2) / 2 - cy;
                      const len = Math.hypot(mx, my) || 1;
                      const push = (0.16 + unit(i * 29 + s * 7) * 0.22) * force;
                      const lift = (unit(i * 31 + s) - 0.5) * 0.12 * force;
                      const rot = (unit(i * 37 + s * 3) - 0.5) * 70 * force;
                      const shard = {
                        "--hb-vi14-clip": `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${cx.toFixed(1)}% ${cy.toFixed(1)}%)`,
                        "--hb-vi14-x": `${((mx / len) * push).toFixed(3)}em`,
                        "--hb-vi14-y": `${((my / len) * push + lift).toFixed(3)}em`,
                        "--hb-vi14-r": `${rot.toFixed(1)}deg`,
                        "--hb-vi14-tint": `${(10 + unit(i * 41 + s) * 50).toFixed(0)}%`,
                        "--hb-vi14-back": `${(dist * 0.012 + s * 0.02).toFixed(3)}s`,
                      } as React.CSSProperties;
                      return (
                        <span key={s} className="hb-vi14-s" style={shard}>
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}

"use client";

import * as React from "react";

export interface RotatingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  words: string[];
  interval?: number;
  stagger?: number;
  loop?: boolean;
  ariaPrefix?: string;
}

const OUT_MS = 500;

const css = `
@keyframes hb-rt-in {
  from { transform: translate3d(0, 130%, 0); opacity: 0; }
  to { transform: translate3d(0, 0, 0); opacity: 1; }
}
@keyframes hb-rt-out {
  from { transform: translate3d(0, 0, 0); opacity: 1; }
  to { transform: translate3d(0, -130%, 0); opacity: 0; }
}
.hb-rt {
  position: relative;
  display: inline-block;
  white-space: pre;
  clip-path: inset(0 -0.5em);
  padding-block: .12em;
  margin-block: -.12em;
}
.hb-rt-size { display: grid; visibility: hidden; }
.hb-rt-size > span { grid-area: 1 / 1; }
.hb-rt-live { position: absolute; inset: .12em 0; }
.hb-rt-word { position: absolute; inset-inline: 0; top: 0; white-space: pre; }
.hb-rt-ch { display: inline-block; }
.hb-rt-in .hb-rt-ch {
  animation: hb-rt-in ${OUT_MS}ms cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-n) * var(--hb-st));
}
.hb-rt-out .hb-rt-ch {
  animation: hb-rt-out ${OUT_MS}ms cubic-bezier(.5, 0, .75, 0) both;
  animation-delay: calc(var(--hb-n) * var(--hb-st));
}
@media (prefers-reduced-motion: reduce) { .hb-rt .hb-rt-ch { animation: none !important; } }
`;

interface State {
  tick: number;
  cur: number;
  prev: number | null;
}

export function RotatingText({
  words,
  interval = 2200,
  stagger = 0.02,
  loop = true,
  ariaPrefix = "",
  className = "",
  style,
  ...rest
}: RotatingTextProps) {
  const [state, setState] = React.useState<State>({ tick: 0, cur: 0, prev: null });
  const key = words.join("\u0001");

  React.useEffect(() => {
    const list = words.length === 0 ? [] : key.split("\u0001");
    if (list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const longest = list.reduce((m, w) => Math.max(m, Array.from(w).length), 0);
    const settle = OUT_MS + Math.max(0, stagger) * 1000 * longest + 40;
    let index = 0;
    let timer = 0;

    const wait = () => {
      if (!loop && index === list.length - 1) return;
      timer = window.setTimeout(advance, interval);
    };

    const advance = () => {
      const from = index;
      index = (index + 1) % list.length;
      setState((s) => ({ tick: s.tick + 1, cur: index, prev: from }));
      timer = window.setTimeout(() => {
        setState((s) => ({ ...s, prev: null }));
        wait();
      }, settle);
    };

    wait();
    return () => window.clearTimeout(timer);
  }, [key, words.length, interval, stagger, loop]);

  const count = words.length;
  const cur = count === 0 ? "" : words[state.cur % count];
  const prev = state.prev !== null && count > 0 ? words[state.prev % count] : null;
  const prefix = ariaPrefix && !ariaPrefix.endsWith(" ") ? `${ariaPrefix} ` : ariaPrefix;

  const vars = { "--hb-st": `${Math.max(0, stagger)}s`, ...style } as React.CSSProperties;

  const letters = (w: string) =>
    Array.from(w).map((ch, i) => (
      <span key={i} className="hb-rt-ch" style={{ "--hb-n": i } as React.CSSProperties}>
        {ch}
      </span>
    ));

  return (
    <span className={`hb-rt ${className}`} style={vars} aria-label={`${prefix}${cur}`} {...rest}>
      <style href="hb-rotating-text" precedence="default">{css}</style>
      <span className="hb-rt-size" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </span>
      <span className="hb-rt-live" aria-hidden="true">
        {prev !== null && (
          <span key={`o${state.tick}`} className="hb-rt-word hb-rt-out">
            {letters(prev)}
          </span>
        )}
        <span key={`i${state.tick}`} className={state.tick > 0 ? "hb-rt-word hb-rt-in" : "hb-rt-word"}>
          {letters(cur)}
        </span>
      </span>
    </span>
  );
}

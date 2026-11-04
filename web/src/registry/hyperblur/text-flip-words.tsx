"use client";

import * as React from "react";

export interface TextFlipWordsProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  words?: string[];
  interval?: number;
  duration?: number;
  accent?: string;
  pauseOnHover?: boolean;
}

const css = `
@keyframes hb-qd9-in {
  from { opacity: 0; transform: rotateX(-90deg) translateY(35%); }
  to { opacity: 1; transform: rotateX(0deg) translateY(0); }
}
@keyframes hb-qd9-out {
  from { opacity: 1; transform: rotateX(0deg) translateY(0); }
  to { opacity: 0; transform: rotateX(90deg) translateY(-35%); }
}
.hb-qd9 {
  position: relative;
  display: inline-block;
  line-height: 1.25;
  font-family: inherit;
  text-wrap: balance;
  box-sizing: border-box;
}
.hb-qd9 *, .hb-qd9 *::before, .hb-qd9 *::after { box-sizing: border-box; }
.hb-qd9-sr {
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
.hb-qd9-slot {
  position: relative;
  display: inline-block;
  height: 1.25em;
  vertical-align: bottom;
  perspective: 640px;
  color: var(--hb-qd9-accent);
  white-space: nowrap;
  transition: width var(--hb-qd9-dur) cubic-bezier(.3, .8, .25, 1);
}
.hb-qd9-in, .hb-qd9-out {
  display: block;
  white-space: nowrap;
  transform-origin: 50% 50%;
  backface-visibility: hidden;
}
.hb-qd9-slot[data-m] .hb-qd9-in, .hb-qd9-out { position: absolute; left: 0; top: 0; }
.hb-qd9-in[data-fresh] { animation: hb-qd9-in var(--hb-qd9-dur) cubic-bezier(.25, .9, .3, 1) both; }
.hb-qd9-out { animation: hb-qd9-out var(--hb-qd9-dur) cubic-bezier(.5, 0, .75, .3) both; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-qd9-slot { transition: none; }
  .hb-qd9-in, .hb-qd9-out { animation: none !important; }
  .hb-qd9-out { display: none; }
}
`;

interface FlipState {
  i: number;
  prev: number | null;
  n: number;
}

export function TextFlipWords({
  text = "Build {} faster",
  words = ["interfaces", "dashboards", "landing pages"],
  interval = 2.4,
  duration = 0.6,
  accent = "#7fb3ff",
  pauseOnHover = true,
  className = "",
  style,
  ...rest
}: TextFlipWordsProps) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const curRef = React.useRef<HTMLSpanElement>(null);
  const [state, setState] = React.useState<FlipState>({ i: 0, prev: null, n: 0 });
  const [width, setWidth] = React.useState<number | null>(null);
  const count = words.length;

  const at = text.indexOf("{}");
  const before = at === -1 ? `${text} ` : text.slice(0, at);
  const after = at === -1 ? "" : text.slice(at + 2);
  const safe = count > 0 ? state.i % count : 0;
  const prevSafe = state.prev !== null && count > 0 ? state.prev % count : null;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || count < 2) return;
    let paused = false;
    const hold = () => {
      paused = pauseOnHover;
    };
    const free = () => {
      paused = false;
    };
    root.addEventListener("pointerenter", hold);
    root.addEventListener("pointerleave", free);
    root.addEventListener("focusin", hold);
    root.addEventListener("focusout", free);
    const id = setInterval(() => {
      if (paused) return;
      setState((s) => ({ i: (s.i + 1) % count, prev: s.i, n: s.n + 1 }));
    }, Math.max(0.8, interval) * 1000);
    return () => {
      clearInterval(id);
      root.removeEventListener("pointerenter", hold);
      root.removeEventListener("pointerleave", free);
      root.removeEventListener("focusin", hold);
      root.removeEventListener("focusout", free);
    };
  }, [count, interval, pauseOnHover]);

  React.useEffect(() => {
    const el = curRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [state.n, words]);

  const vars = {
    "--hb-qd9-accent": accent,
    "--hb-qd9-dur": `${duration}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span ref={rootRef} className={`hb-qd9 ${className}`} style={vars} {...rest}>
      <style href="hb-text-flip-words" precedence="default">{css}</style>
      <span className="hb-qd9-sr">
        {before}
        {words[safe] ?? ""}
        {after}
      </span>
      <span aria-hidden="true">
        {before}
        <span
          className="hb-qd9-slot"
          style={width !== null ? { width } : undefined}
          data-m={width !== null ? "" : undefined}
        >
          <span
            key={`i${state.n}`}
            ref={curRef}
            className="hb-qd9-in"
            data-fresh={state.n > 0 ? "" : undefined}
          >
            {words[safe] ?? ""}
          </span>
          {prevSafe !== null ? (
            <span key={`o${state.n}`} className="hb-qd9-out">
              {words[prevSafe] ?? ""}
            </span>
          ) : null}
        </span>
        {after}
      </span>
    </span>
  );
}

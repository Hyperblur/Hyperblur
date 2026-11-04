"use client";

import * as React from "react";

export interface TextShuffleInProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  shuffles?: number;
  duration?: number;
  stagger?: number;
  trigger?: "view" | "mount";
  hover?: boolean;
  replayEvery?: number;
  charset?: string;
  accent?: string;
}

const css = `
.hb-qt1 {
  --hb-qt1-h: 1.2em;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  font-family: inherit;
  white-space: pre-wrap;
  border-radius: 0.15em;
}
.hb-qt1:focus-visible { outline: 2px solid var(--hb-qt1-ac); outline-offset: 4px; }
.hb-qt1-w { display: inline-block; white-space: nowrap; }
.hb-qt1-c {
  position: relative;
  display: inline-block;
  height: var(--hb-qt1-h);
  line-height: var(--hb-qt1-h);
  vertical-align: top;
  clip-path: inset(0 -0.6em);
}
.hb-qt1-g { visibility: hidden; }
.hb-qt1-s {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: block;
  opacity: 0;
  will-change: transform;
}
.hb-qt1-x {
  display: block;
  height: var(--hb-qt1-h);
  line-height: var(--hb-qt1-h);
  text-align: center;
  color: var(--hb-qt1-ac);
}
.hb-qt1-x:last-child { color: inherit; }
.hb-qt1[data-on="true"] .hb-qt1-s {
  opacity: 1;
  animation: hb-qt1-a var(--hb-qt1-d) cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-qt1-i) * var(--hb-qt1-st));
}
.hb-qt1[data-on="true"][data-run="1"] .hb-qt1-s { animation-name: hb-qt1-b; }
.hb-qt1[data-on="true"][data-run="2"] .hb-qt1-s { animation-name: hb-qt1-c; }
.hb-qt1-sr {
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
@keyframes hb-qt1-a {
  0% { opacity: 0; transform: translate3d(0, 0, 0); }
  14% { opacity: 1; }
  100% { opacity: 1; transform: translate3d(0, var(--hb-qt1-f), 0); }
}
@keyframes hb-qt1-b {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, var(--hb-qt1-f), 0); }
}
@keyframes hb-qt1-c {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, var(--hb-qt1-f), 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qt1 .hb-qt1-s {
    opacity: 1;
    animation: none !important;
    will-change: auto;
    transform: translate3d(0, var(--hb-qt1-f), 0);
  }
}
`;

const FALLBACK_POOL = "abcdefghijklmnopqrstuvwxyz";

function mix(i: number, k: number) {
  let h = Math.imul(i + 1, 2654435761) ^ Math.imul(k + 7, 40503);
  h ^= h >>> 13;
  h = Math.imul(h, 1274126177);
  h ^= h >>> 16;
  return h >>> 0;
}

function build(text: string, count: number, charset?: string) {
  const own = Array.from(new Set(Array.from(charset ?? text).filter((c) => !/\s/.test(c))));
  const pool = own.length > 1 ? own : Array.from(FALLBACK_POOL);
  let n = 0;
  const words = text.split(/(\s+)/).filter((t) => t !== "").map((value) => {
    if (/^\s+$/.test(value)) return { space: true, value, letters: [] as { ch: string; i: number; seq: string[] }[] };
    const letters = Array.from(value).map((ch) => {
      const i = n++;
      const seq: string[] = [];
      for (let k = 0; k < count; k++) {
        let idx = mix(i, k) % pool.length;
        if (pool[idx] === ch) idx = (idx + 1) % pool.length;
        seq.push(pool[idx]);
      }
      seq.push(ch);
      return { ch, i, seq };
    });
    return { space: false, value, letters };
  });
  return words;
}

export function TextShuffleIn({
  text,
  shuffles = 4,
  duration = 0.9,
  stagger = 0.045,
  trigger = "view",
  hover = true,
  replayEvery = 0,
  charset,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onFocus,
  ...rest
}: TextShuffleInProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const visible = React.useRef(true);
  const [on, setOn] = React.useState(false);
  const [run, setRun] = React.useState(0);

  const count = Math.max(1, Math.round(shuffles));

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "mount" || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setOn(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.current = entry.isIntersecting;
          if (entry.isIntersecting) setOn(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const replay = React.useCallback(() => {
    setOn(true);
    setRun((r) => (r === 1 ? 2 : 1));
  }, []);

  React.useEffect(() => {
    if (!(replayEvery > 0)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (visible.current) replay();
    }, replayEvery * 1000);
    return () => window.clearInterval(id);
  }, [replayEvery, replay]);

  const words = build(text, count, charset);

  const vars = {
    "--hb-qt1-d": `${Math.max(0.05, duration).toFixed(3)}s`,
    "--hb-qt1-st": `${Math.max(0, stagger).toFixed(3)}s`,
    "--hb-qt1-f": `${((-count / (count + 1)) * 100).toFixed(3)}%`,
    "--hb-qt1-ac": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      ref={ref}
      className={`hb-qt1 ${className}`}
      style={vars}
      data-on={on}
      data-run={run}
      tabIndex={hover ? 0 : undefined}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (hover) replay();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        if (hover) replay();
      }}
      {...rest}
    >
      <style href="hb-text-shuffle-in" precedence="default">{css}</style>
      <span className="hb-qt1-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) =>
          w.space ? (
            w.value
          ) : (
            <span key={wi} className="hb-qt1-w">
              {w.letters.map((l) => (
                <span key={l.i} className="hb-qt1-c" style={{ "--hb-qt1-i": l.i } as React.CSSProperties}>
                  <span className="hb-qt1-g">{l.ch}</span>
                  <span className="hb-qt1-s">
                    {l.seq.map((c, k) => (
                      <span key={k} className="hb-qt1-x">
                        {c}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
          )
        )}
      </span>
    </span>
  );
}

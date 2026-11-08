"use client";

import * as React from "react";

export interface TextRollWordsProps extends React.HTMLAttributes<HTMLSpanElement> {
  words?: string[];
  interval?: number;
  duration?: number;
  stagger?: number;
  pauseOnHover?: boolean;
  paused?: boolean;
}

const css = `
.hb-vi10 {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  vertical-align: bottom;
  height: 1.18em;
  line-height: 1.18;
  font-family: inherit;
  white-space: pre;
  box-sizing: border-box;
}
.hb-vi10 *, .hb-vi10 *::before, .hb-vi10 *::after { box-sizing: border-box; }
.hb-vi10-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi10-measure {
  position: absolute;
  left: 0; top: 0;
  visibility: hidden;
  pointer-events: none;
  white-space: pre;
}
.hb-vi10-col {
  position: relative;
  display: inline-block;
  height: 1.18em;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 12%, #000 88%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0, #000 12%, #000 88%, transparent 100%);
  transition: width var(--hb-vi10-cd) cubic-bezier(.65, 0, .2, 1);
  transition-delay: var(--hb-vi10-cdl);
}
.hb-vi10-strip {
  display: flex;
  flex-direction: column;
  transform: translate3d(0, calc(var(--hb-vi10-idx) * -1.18em), 0);
  transition: transform var(--hb-vi10-cd) cubic-bezier(.7, -0.12, .22, 1.18);
  transition-delay: var(--hb-vi10-cdl);
  will-change: transform;
}
.hb-vi10-strip > span { display: block; height: 1.18em; }
.hb-vi10[data-snap] .hb-vi10-strip, .hb-vi10[data-snap] .hb-vi10-col { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-vi10 .hb-vi10-strip, .hb-vi10 .hb-vi10-col { transition: none; }
}
`;

function hash(n: number) {
  let x = (n | 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

export function TextRollWords({
  words = ["Ship", "Scale", "Shine"],
  interval = 2.2,
  duration = 0.9,
  stagger = 0.045,
  pauseOnHover = true,
  paused = false,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TextRollWordsProps) {
  const list = words.length ? words : [""];
  const L = list.length;
  const key = list.join("\u0001");
  const chars = React.useMemo(() => key.split("\u0001").map((w) => Array.from(w)), [key]);
  const cols = Math.max(...chars.map((c) => c.length));
  const seq = React.useMemo(() => [...chars, chars[0]], [chars]);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = React.useState<number[][] | null>(null);
  const [idx, setIdx] = React.useState(0);
  const [snap, setSnap] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const halt = paused || (pauseOnHover && hover) || L < 2;
  const total = duration * 1.15 + stagger * cols;

  React.useLayoutEffect(() => {
    const box = measureRef.current;
    if (!box) return;
    const measure = () => {
      const rows = Array.from(box.children) as HTMLElement[];
      const next = rows.map((row) => Array.from(row.children).map((c) => (c as HTMLElement).getBoundingClientRect().width));
      setWidths((prev) => (prev && JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [chars]);

  React.useEffect(() => {
    if (halt) return;
    const id = setTimeout(() => setIdx((i) => i + 1), interval * 1000);
    return () => clearTimeout(id);
  }, [halt, interval, idx]);

  React.useEffect(() => {
    if (idx < L) return;
    const id = setTimeout(() => {
      setSnap(true);
      setIdx(0);
    }, total * 1000 + 40);
    return () => clearTimeout(id);
  }, [idx, L, total]);

  React.useEffect(() => {
    if (!snap) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
    return () => cancelAnimationFrame(id);
  }, [snap]);

  const shown = idx % L;
  const vars = { ...style } as React.CSSProperties;

  return (
    <span
      className={`hb-vi10 ${className}`}
      style={vars}
      data-snap={snap ? "" : undefined}
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
      <style href="hb-text-roll-words" precedence="default">{css}</style>
      <span className="hb-vi10-sr">{list[shown]}</span>
      <span ref={measureRef} className="hb-vi10-measure" aria-hidden="true">
        {chars.map((c, w) => (
          <span key={w} style={{ display: "block" }}>
            {c.map((ch, k) => (
              <span key={k} style={{ display: "inline-block" }}>{ch}</span>
            ))}
          </span>
        ))}
      </span>
      {Array.from({ length: cols }, (_, k) => {
        const d = duration * (0.82 + (hash(k * 97 + 13) % 36) / 100);
        const w = widths ? widths[shown]?.[k] ?? 0 : undefined;
        return (
          <span
            key={k}
            className="hb-vi10-col"
            aria-hidden="true"
            style={
              {
                width: w === undefined ? undefined : `${w.toFixed(2)}px`,
                "--hb-vi10-cd": `${d.toFixed(3)}s`,
                "--hb-vi10-cdl": `${(k * stagger).toFixed(3)}s`,
              } as React.CSSProperties
            }
          >
            <span className="hb-vi10-strip" style={{ "--hb-vi10-idx": idx } as React.CSSProperties}>
              {seq.map((c, r) => (
                <span key={r}>{c[k] ?? " "}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

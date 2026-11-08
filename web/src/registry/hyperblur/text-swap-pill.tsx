"use client";

import * as React from "react";

export interface TextSwapPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  words?: string[];
  colors?: string[];
  prefix?: string;
  suffix?: string;
  interval?: number;
  progress?: boolean;
  pauseOnHover?: boolean;
}

const css = `
@keyframes hb-vi13-out {
  0% { transform: translate3d(0, 0, 0) rotateX(0deg); opacity: 1; }
  100% { transform: translate3d(0, -0.9em, 0) rotateX(55deg); opacity: 0; }
}
@keyframes hb-vi13-in {
  0% { transform: translate3d(0, 0.9em, 0) rotateX(-55deg); opacity: 0; }
  100% { transform: translate3d(0, 0, 0) rotateX(0deg); opacity: 1; }
}
@keyframes hb-vi13-bar {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
.hb-vi13 { position: relative; font-family: inherit; box-sizing: border-box; }
.hb-vi13 *, .hb-vi13 *::before, .hb-vi13 *::after { box-sizing: border-box; }
.hb-vi13-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi13-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: baseline;
  height: 1.32em;
  margin: 0 0.12em;
  padding: 0 0.42em;
  border-radius: 999px;
  overflow: hidden;
  perspective: 4em;
  color: color-mix(in oklab, var(--hb-vi13-c) 38%, #ffffff);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--hb-vi13-c) 26%, transparent), color-mix(in srgb, var(--hb-vi13-c) 12%, transparent));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--hb-vi13-c) 42%, transparent),
    inset 0 1px 0 color-mix(in srgb, #ffffff 18%, transparent),
    0 0.3em 1.1em -0.4em color-mix(in srgb, var(--hb-vi13-c) 70%, transparent);
  transition:
    width 0.62s cubic-bezier(.65, 0, .2, 1),
    color 0.5s ease,
    background 0.5s ease,
    box-shadow 0.5s ease;
  transform: translateY(0.1em);
}
.hb-vi13-stage { position: relative; display: inline-block; height: 1.32em; line-height: 1.32em; }
.hb-vi13-word {
  position: absolute;
  left: 0; top: 0;
  white-space: nowrap;
  transform-origin: 50% 50% -0.4em;
}
.hb-vi13-word[data-state="in"] { position: relative; animation: hb-vi13-in 0.62s cubic-bezier(.2, .9, .25, 1.1) both; }
.hb-vi13-word[data-state="out"] { animation: hb-vi13-out 0.48s cubic-bezier(.6, 0, .8, .3) both; }
.hb-vi13-word[data-state="rest"] { position: relative; }
.hb-vi13-bar {
  position: absolute;
  left: 0.9em; right: 0.9em; bottom: 0.14em;
  height: 1px;
  border-radius: 1px;
  background: color-mix(in srgb, var(--hb-vi13-c) 80%, #ffffff);
  opacity: 0.55;
  transform-origin: 0 50%;
  transform: scaleX(0);
  animation: hb-vi13-bar var(--hb-vi13-int) linear both;
}
.hb-vi13[data-paused] .hb-vi13-bar { animation-play-state: paused; }
.hb-vi13-measure {
  position: absolute;
  left: 0; top: 0;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi13 .hb-vi13-word { animation: none !important; }
  .hb-vi13 .hb-vi13-word[data-state="out"] { display: none; }
  .hb-vi13 .hb-vi13-pill { transition: none; }
  .hb-vi13 .hb-vi13-bar { display: none; }
}
`;

export function TextSwapPill({
  words = ["founders", "designers", "engineers", "agencies"],
  colors = ["#2f7bff", "#f97316", "#22c55e", "#a855f7"],
  prefix = "Built for",
  suffix = "",
  interval = 2.4,
  progress = true,
  pauseOnHover = true,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TextSwapPillProps) {
  const list = words.length ? words : [""];
  const L = list.length;
  const key = list.join("\u0001");
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = React.useState<number[] | null>(null);
  const [index, setIndex] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(false);
  const halt = (pauseOnHover && hover) || L < 2;

  React.useLayoutEffect(() => {
    const box = measureRef.current;
    if (!box) return;
    const measure = () => {
      const next = Array.from(box.children).map((c) => (c as HTMLElement).getBoundingClientRect().width);
      setWidths((p) => (p && p.length === next.length && p.every((v, i) => Math.abs(v - next[i]) < 0.5) ? p : next));
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [key]);

  React.useEffect(() => {
    if (halt) return;
    const id = setTimeout(() => {
      setPrev(index);
      setIndex((index + 1) % L);
    }, interval * 1000);
    return () => clearTimeout(id);
  }, [halt, interval, index, L]);

  React.useEffect(() => {
    if (prev === null) return;
    const id = setTimeout(() => setPrev(null), 520);
    return () => clearTimeout(id);
  }, [prev]);

  const color = colors.length ? colors[index % colors.length] : "#2f7bff";
  const w = widths?.[index];
  const vars = {
    "--hb-vi13-c": color,
    "--hb-vi13-int": `${interval}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`hb-vi13 ${className}`}
      style={vars}
      data-paused={halt ? "" : undefined}
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
      <style href="hb-text-swap-pill" precedence="default">{css}</style>
      <span className="hb-vi13-sr">{[prefix, list.join(", "), suffix].filter(Boolean).join(" ")}</span>
      <span aria-hidden="true">
        {prefix ? <>{prefix} </> : null}
        <span className="hb-vi13-pill" style={w !== undefined ? { width: `calc(${w.toFixed(2)}px + 0.84em)` } : undefined}>
          <span className="hb-vi13-measure">
            {list.map((word, i) => (
              <span key={i} style={{ display: "inline-block", position: "absolute", left: 0, top: 0 }}>{word}</span>
            ))}
          </span>
          <span className="hb-vi13-stage">
            {prev !== null ? (
              <span className="hb-vi13-word" data-state="out" key={`o${prev}-${index}`}>{list[prev]}</span>
            ) : null}
            <span className="hb-vi13-word" data-state={prev !== null ? "in" : "rest"} key={`i${index}`}>{list[index]}</span>
          </span>
          {progress && !halt ? <span className="hb-vi13-bar" key={`b${index}`} /> : null}
        </span>
        {suffix ? <> {suffix}</> : null}
      </span>
    </span>
  );
}

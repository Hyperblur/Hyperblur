"use client";

import * as React from "react";

export interface TextHighlightMarkerProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  marks?: string[];
  colors?: string[];
  coverage?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  loop?: number;
}

const shapes = [
  "polygon(0% 18%, 4% 6%, 22% 12%, 48% 2%, 76% 10%, 100% 0%, 98% 62%, 100% 96%, 72% 88%, 44% 100%, 20% 92%, 3% 98%)",
  "polygon(2% 8%, 30% 0%, 58% 8%, 86% 2%, 100% 14%, 97% 52%, 100% 90%, 74% 100%, 46% 92%, 18% 100%, 0% 86%, 3% 46%)",
  "polygon(0% 4%, 18% 12%, 42% 0%, 68% 10%, 100% 6%, 96% 40%, 100% 100%, 70% 90%, 40% 98%, 12% 88%, 2% 100%)",
];

const angles = [-1.4, 0.9, -0.5, 1.2, -1];

const css = `
.hb-qd6 { display: inline; font-family: inherit; }
.hb-qd6-k {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  isolation: isolate;
}
.hb-qd6-b {
  position: absolute;
  z-index: -1;
  left: -0.16em;
  right: -0.16em;
  top: var(--hb-qd6-top);
  bottom: -0.06em;
  background: var(--hb-qd6-c);
  clip-path: var(--hb-qd6-shape);
  transform: scaleX(0) rotate(var(--hb-qd6-r));
  transform-origin: 0 60%;
  transition: transform var(--hb-qd6-dur) cubic-bezier(.62, .04, .2, 1);
  transition-delay: calc(var(--hb-qd6-delay) + var(--hb-qd6-n) * var(--hb-qd6-stagger));
  pointer-events: none;
}
.hb-qd6[data-active] .hb-qd6-b { transform: scaleX(1) rotate(var(--hb-qd6-r)); }
.hb-qd6[data-reset] .hb-qd6-b { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-qd6 .hb-qd6-b { transition: none; transform: scaleX(1) rotate(var(--hb-qd6-r)); }
}
`;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function TextHighlightMarker({
  text,
  marks = [],
  colors = ["rgba(255, 214, 10, 0.5)", "rgba(255, 92, 168, 0.45)", "rgba(52, 211, 235, 0.42)"],
  coverage = 0.62,
  stagger = 0.5,
  duration = 0.75,
  delay = 0.1,
  once = true,
  loop = 0,
  className = "",
  style,
  ...rest
}: TextHighlightMarkerProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [inView, setInView] = React.useState(false);
  const [phase, setPhase] = React.useState(0);

  const segments = React.useMemo(() => {
    const list = marks.filter(Boolean).sort((a, b) => b.length - a.length);
    if (list.length === 0) return [{ value: text, marked: false }];
    const re = new RegExp(`(${list.map(escapeRegExp).join("|")})`, "gi");
    return text
      .split(re)
      .filter((part) => part !== "")
      .map((value) => ({ value, marked: list.some((m) => m.toLowerCase() === value.toLowerCase()) }));
  }, [text, marks]);

  const markCount = segments.filter((s) => s.marked).length;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  React.useEffect(() => {
    if (!inView || loop <= 0) return;
    const total = (delay + duration + stagger * markCount + loop) * 1000;
    const wait = phase === 1 ? 80 : phase === 2 ? 60 : total;
    const id = setTimeout(() => setPhase((p) => (p + 1) % 3), wait);
    return () => clearTimeout(id);
  }, [inView, loop, phase, delay, duration, stagger, markCount]);

  const vars = {
    "--hb-qd6-dur": `${duration}s`,
    "--hb-qd6-delay": `${delay}s`,
    "--hb-qd6-stagger": `${stagger}s`,
    "--hb-qd6-top": `${((1 - Math.min(1, Math.max(0.15, coverage))) * 100).toFixed(1)}%`,
    ...style,
  } as React.CSSProperties;

  let order = 0;

  return (
    <span
      ref={ref}
      className={`hb-qd6 ${className}`}
      style={vars}
      data-active={inView && phase === 0 ? "" : undefined}
      data-reset={phase === 1 ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-highlight-marker" precedence="default">{css}</style>
      {segments.map((seg, i) => {
        if (!seg.marked) return <React.Fragment key={i}>{seg.value}</React.Fragment>;
        const n = order++;
        const bar = {
          "--hb-qd6-n": n,
          "--hb-qd6-c": colors.length ? colors[n % colors.length] : "rgba(255, 214, 10, 0.5)",
          "--hb-qd6-shape": shapes[n % shapes.length],
          "--hb-qd6-r": `${angles[n % angles.length]}deg`,
        } as React.CSSProperties;
        return (
          <span key={i} className="hb-qd6-k" style={bar}>
            <span className="hb-qd6-b" aria-hidden="true" />
            {seg.value}
          </span>
        );
      })}
    </span>
  );
}

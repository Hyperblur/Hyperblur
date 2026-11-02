"use client";

import * as React from "react";

export interface RippleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  cols?: number;
  shape?: "dot" | "square";
  color?: string;
  gap?: number;
  autoPlay?: boolean;
  interactive?: boolean;
  interval?: number;
}

const css = `
@keyframes hb-rpg-wa {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(calc(var(--hb-rpg-a) * -18%)) scale(calc(1 + var(--hb-rpg-a) * 0.7)); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes hb-rpg-wb {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(calc(var(--hb-rpg-a) * -18%)) scale(calc(1 + var(--hb-rpg-a) * 0.7)); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes hb-rpg-la {
  0% { opacity: 0; }
  25% { opacity: var(--hb-rpg-a); }
  100% { opacity: 0; }
}
@keyframes hb-rpg-lb {
  0% { opacity: 0; }
  25% { opacity: var(--hb-rpg-a); }
  100% { opacity: 0; }
}
.hb-rpg {
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(var(--hb-rpg-cols), minmax(0, 1fr));
  grid-template-rows: repeat(var(--hb-rpg-rows), minmax(0, 1fr));
  gap: var(--hb-rpg-gap);
  width: 100%;
  height: 100%;
  min-height: 120px;
  container-type: size;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
.hb-rpg[data-interactive] { cursor: pointer; }
.hb-rpg-cell {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  pointer-events: none;
}
.hb-rpg-dot {
  position: relative;
  --hb-rpg-cell: min(calc((100cqw - (var(--hb-rpg-cols) - 1) * var(--hb-rpg-gap)) / var(--hb-rpg-cols)), calc((100cqh - (var(--hb-rpg-rows) - 1) * var(--hb-rpg-gap)) / var(--hb-rpg-rows)));
  width: calc(var(--hb-rpg-cell) * 0.8);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-rpg-c) 14%, #19191c);
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(.3, .7, .2, 1);
  animation-fill-mode: both;
  animation-delay: var(--hb-rpg-d);
}
.hb-rpg[data-shape="dot"] .hb-rpg-dot { width: calc(var(--hb-rpg-cell) * 0.55); }
.hb-rpg[data-shape="square"] .hb-rpg-dot { border-radius: 26%; }
.hb-rpg-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in srgb, var(--hb-rpg-c) 70%, #ffffff);
  box-shadow: 0 0 10px 1px var(--hb-rpg-c);
  opacity: 0;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(.3, .7, .2, 1);
  animation-fill-mode: both;
  animation-delay: var(--hb-rpg-d);
}
.hb-rpg[data-wave="a"] .hb-rpg-dot { animation-name: hb-rpg-wa; }
.hb-rpg[data-wave="b"] .hb-rpg-dot { animation-name: hb-rpg-wb; }
.hb-rpg[data-wave="a"] .hb-rpg-dot::after { animation-name: hb-rpg-la; }
.hb-rpg[data-wave="b"] .hb-rpg-dot::after { animation-name: hb-rpg-lb; }
@media (prefers-reduced-motion: reduce) {
  .hb-rpg-dot, .hb-rpg-dot::after { animation: none !important; }
}
`;

interface Wave {
  id: number;
  r: number;
  c: number;
}

export function RippleGrid({
  rows = 12,
  cols = 20,
  shape = "square",
  color = "#2f7bff",
  gap = 4,
  autoPlay = true,
  interactive = true,
  interval = 3.6,
  className = "",
  style,
  onPointerDown,
  onPointerMove,
  ...rest
}: RippleGridProps) {
  const R = Math.max(1, Math.round(rows));
  const C = Math.max(1, Math.round(cols));
  const ref = React.useRef<HTMLDivElement>(null);
  const [wave, setWave] = React.useState<Wave | null>(null);
  const lastRef = React.useRef({ t: 0, cell: -1 });

  const fire = React.useCallback((r: number, c: number) => {
    lastRef.current.t = performance.now();
    setWave((w) => ({ id: (w ? w.id : 0) + 1, r, c }));
  }, []);

  React.useEffect(() => {
    if (!autoPlay) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const every = Math.max(1.2, interval) * 1000;
    const first = window.setTimeout(() => {
      if (!document.hidden && !reduce.matches) fire((R - 1) / 2, (C - 1) / 2);
    }, 500);
    const id = window.setInterval(() => {
      if (document.hidden || reduce.matches) return;
      if (performance.now() - lastRef.current.t < every * 0.8) return;
      fire((R - 1) / 2, (C - 1) / 2);
    }, every);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [autoPlay, interval, R, C, fire]);

  function cellAt(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return null;
    const b = el.getBoundingClientRect();
    if (b.width === 0 || b.height === 0) return null;
    const c = Math.min(C - 1, Math.max(0, Math.floor(((e.clientX - b.left) / b.width) * C)));
    const r = Math.min(R - 1, Math.max(0, Math.floor(((e.clientY - b.top) / b.height) * R)));
    return { r, c };
  }

  function handleDown(e: React.PointerEvent<HTMLDivElement>) {
    onPointerDown?.(e);
    if (!interactive) return;
    const p = cellAt(e);
    if (p) fire(p.r, p.c);
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (!interactive || e.pointerType === "touch") return;
    const p = cellAt(e);
    if (!p) return;
    const cell = p.r * C + p.c;
    if (cell === lastRef.current.cell) return;
    lastRef.current.cell = cell;
    if (performance.now() - lastRef.current.t < 650) return;
    fire(p.r, p.c);
  }

  const maxDist = Math.hypot(Math.max(wave ? wave.r : 0, R - 1 - (wave ? wave.r : 0)), Math.max(wave ? wave.c : 0, C - 1 - (wave ? wave.c : 0))) || 1;

  const cells = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      let cellStyle: React.CSSProperties | undefined;
      if (wave) {
        const dist = Math.hypot(r - wave.r, c - wave.c);
        const amp = Math.max(0.18, 1 - dist / (maxDist * 1.05));
        cellStyle = {
          "--hb-rpg-d": `${Math.round(dist * 42)}ms`,
          "--hb-rpg-a": amp.toFixed(3),
        } as React.CSSProperties;
      }
      cells.push(
        <span key={r * C + c} className="hb-rpg-cell">
          <span className="hb-rpg-dot" style={cellStyle} />
        </span>,
      );
    }
  }

  const vars = {
    "--hb-rpg-rows": R,
    "--hb-rpg-cols": C,
    "--hb-rpg-gap": `${Math.max(0, gap)}px`,
    "--hb-rpg-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-rpg ${className}`}
      style={vars}
      data-shape={shape}
      data-wave={wave ? (wave.id % 2 === 0 ? "a" : "b") : undefined}
      data-interactive={interactive ? "" : undefined}
      aria-hidden="true"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      {...rest}
    >
      <style href="hb-ripple-grid" precedence="default">{css}</style>
      {cells}
    </div>
  );
}

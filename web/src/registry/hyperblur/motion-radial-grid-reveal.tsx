"use client";

import * as React from "react";

export interface MotionRadialGridTile {
  label: string;
  from: string;
  to: string;
}

export interface MotionRadialGridRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tiles?: MotionRadialGridTile[];
  columns?: number;
  origin?: [number, number];
  fade?: number;
  band?: number;
  gap?: number;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  onTileClick?: (index: number, tile: MotionRadialGridTile) => void;
}

const palette: [string, string][] = [
  ["#1d3b8f", "#5b8cff"],
  ["#3a1f6e", "#a07bff"],
  ["#0f4d47", "#3fd2b5"],
  ["#5a2a12", "#ff9a5a"],
  ["#2b2b2b", "#8a8a8a"],
  ["#5b1630", "#ff6f9a"],
  ["#173d1f", "#7fd67a"],
  ["#4a3a10", "#f2c94c"],
];

const names = [
  "Dune", "Harbor", "Ember", "Moss", "Slate", "Coral", "Fern", "Amber",
  "Tide", "Ash", "Plum", "Sage", "Rust", "Mist", "Ink", "Clay",
  "Glow", "Pine", "Opal", "Iris", "Sand", "Bay", "Kelp", "Dusk",
  "Frost", "Nova", "Reed", "Fig", "Loam", "Jade", "Haze", "Flint",
];

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return (x ^ (x >>> 16)) >>> 0;
}

const defaultTiles: MotionRadialGridTile[] = names.map((label, i) => {
  const pair = palette[hash(i) % palette.length];
  return { label, from: pair[0], to: pair[1] };
});

const css = `
.hb-wh2 {
  --hb-wh2-a: #2f7bff;
  --hb-wh2-p: 0;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-wh2 *, .hb-wh2 *::before, .hb-wh2 *::after { box-sizing: border-box; }
.hb-wh2-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-wh2-cols), minmax(0, 1fr));
  gap: var(--hb-wh2-gap);
  isolation: isolate;
}
.hb-wh2-ring {
  position: absolute;
  left: calc(var(--hb-wh2-ox) * 100%);
  top: calc(var(--hb-wh2-oy) * 100%);
  z-index: 2;
  width: calc(var(--hb-wh2-w) * var(--hb-wh2-diag) * 2);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--hb-wh2-a) 70%, #fff);
  box-shadow: 0 0 24px 2px color-mix(in srgb, var(--hb-wh2-a) 45%, transparent), inset 0 0 24px 2px color-mix(in srgb, var(--hb-wh2-a) 30%, transparent);
  transform: translate(-50%, -50%);
  opacity: calc(clamp(0, var(--hb-wh2-p) * 12, 1) * clamp(0, (1 - var(--hb-wh2-p)) * 3.2, 1) * 0.85);
  pointer-events: none;
}
.hb-wh2-tile {
  --hb-wh2-t: clamp(0, calc((var(--hb-wh2-p) * (1 + var(--hb-wh2-band)) - var(--d)) / var(--hb-wh2-band)), 1);
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: clamp(4px, 1.4cqw, 14px);
  overflow: hidden;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
  background: linear-gradient(145deg, var(--to), var(--from) 70%);
  opacity: calc(var(--hb-wh2-t) * (1 - var(--d) * var(--hb-wh2-fade)));
  transform: translate(calc((1 - var(--hb-wh2-t)) * var(--dx) * -18px), calc((1 - var(--hb-wh2-t)) * var(--dy) * -18px)) scale(calc(0.55 + var(--hb-wh2-t) * 0.45));
  filter: blur(calc((1 - var(--hb-wh2-t)) * 6px)) saturate(calc(0.4 + var(--hb-wh2-t) * 0.6));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -18px 30px -16px rgba(0, 0, 0, 0.55);
  transition: box-shadow 0.25s ease;
}
.hb-wh2-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(70% 60% at var(--gx) var(--gy), rgba(255, 255, 255, 0.32), transparent 60%),
    repeating-linear-gradient(var(--ga), rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 7px);
  mix-blend-mode: soft-light;
}
.hb-wh2-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in srgb, var(--hb-wh2-a) 85%, #fff);
  opacity: calc(var(--hb-wh2-t) * (1 - var(--hb-wh2-t)) * 2.6);
  mix-blend-mode: screen;
  pointer-events: none;
}
.hb-wh2-tile:hover { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 -18px 30px -16px rgba(0, 0, 0, 0.55); }
.hb-wh2-tile:focus-visible { outline: 2px solid var(--hb-wh2-a); outline-offset: 2px; }
.hb-wh2-tile[data-origin="true"] { box-shadow: inset 0 0 0 1.5px #fff, 0 0 0 3px color-mix(in srgb, var(--hb-wh2-a) 45%, transparent); }
.hb-wh2-name {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 0.6em 0.5em;
  font-size: clamp(7px, 1.25cqw, 13px);
  font-weight: 600;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}
@container (max-width: 420px) {
  .hb-wh2-name { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh2-tile { transition: none; }
  .hb-wh2-ring { display: none; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function loopAt(ms: number, duration: number) {
  const d = Math.max(1, duration) * 1000;
  const out = d * 0.5;
  const hold = 1500;
  const t = ms % (d + hold + out + 500);
  if (t < d) return 1 - Math.pow(1 - t / d, 2);
  if (t < d + hold) return 1;
  if (t < d + hold + out) return 1 - Math.pow((t - d - hold) / out, 2);
  return 0;
}

function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number) => void,
  progress: number | undefined,
  autoPlay: boolean,
  duration: number,
  restart: number,
) {
  const applyRef = React.useRef(apply);
  React.useLayoutEffect(() => {
    applyRef.current = apply;
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = (p: number) => applyRef.current(clamp01(p));
    if (typeof progress === "number") {
      run(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      run(1);
      return;
    }
    let raf = 0;
    if (autoPlay) {
      let visible = true;
      let last = 0;
      let t = 0;
      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      });
      io.observe(el);
      const loop = (now: number) => {
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (visible) {
          t += dt;
          run(loopAt(t, duration));
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }
    const sc = findScroller(el);
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = sc ? r.top - sc.getBoundingClientRect().top : r.top;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      run((vh - top) / (vh * 0.55 + r.height * 0.45));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const target: HTMLElement | Window = sc ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress, autoPlay, duration, restart]);
}

export function MotionRadialGridReveal({
  tiles = defaultTiles,
  columns = 8,
  origin = [0.5, 0.5],
  fade = 0.45,
  band = 0.35,
  gap = 8,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 3.2,
  onTileClick,
  className,
  style,
  ...rest
}: MotionRadialGridRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [restart, setRestart] = React.useState(0);
  const cols = Math.max(1, Math.round(columns));
  const rows = Math.max(1, Math.ceil(tiles.length / cols));

  const ox = picked === null ? clamp01(origin[0]) : ((picked % cols) + 0.5) / cols;
  const oy = picked === null ? clamp01(origin[1]) : (Math.floor(picked / cols) + 0.5) / rows;
  const fx = Math.max(ox, 1 - ox) * cols;
  const fy = Math.max(oy, 1 - oy) * rows;
  const far = Math.hypot(fx, fy) || 1;

  useProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-wh2-p", p.toFixed(4));
      el.style.setProperty("--hb-wh2-w", (p * (1 + band)).toFixed(4));
    },
    progress,
    autoPlay,
    duration,
    restart,
  );

  return (
    <div
      ref={ref}
      className={["hb-wh2", className].filter(Boolean).join(" ")}
      style={
        {
          "--hb-wh2-a": accent,
          "--hb-wh2-cols": cols,
          "--hb-wh2-gap": `${gap}px`,
          "--hb-wh2-fade": clamp01(fade),
          "--hb-wh2-band": Math.max(0.05, band),
          "--hb-wh2-ox": ox.toFixed(4),
          "--hb-wh2-oy": oy.toFixed(4),
          "--hb-wh2-diag": `${(Math.hypot(Math.max(ox, 1 - ox), Math.max(oy, 1 - oy) * (rows / cols)) * 100).toFixed(2)}cqw`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-radial-grid-reveal" precedence="default">{css}</style>
      <div className="hb-wh2-grid">
        <span className="hb-wh2-ring" aria-hidden="true" />
        {tiles.map((tile, i) => {
          const cx = (i % cols) + 0.5 - ox * cols;
          const cy = Math.floor(i / cols) + 0.5 - oy * rows;
          const len = Math.hypot(cx, cy);
          const d = len / far;
          const h = hash(i + 97);
          return (
            <button
              key={`${tile.label}-${i}`}
              type="button"
              className="hb-wh2-tile"
              data-origin={picked === i ? "true" : "false"}
              aria-label={`${tile.label}, start the reveal from here`}
              onClick={() => {
                setPicked(i);
                setRestart((r) => r + 1);
                onTileClick?.(i, tile);
              }}
              style={
                {
                  "--d": d.toFixed(4),
                  "--dx": len ? (cx / len).toFixed(3) : "0",
                  "--dy": len ? (cy / len).toFixed(3) : "0",
                  "--from": tile.from,
                  "--to": tile.to,
                  "--gx": `${20 + (h % 60)}%`,
                  "--gy": `${15 + ((h >>> 8) % 50)}%`,
                  "--ga": `${(h >>> 16) % 180}deg`,
                } as React.CSSProperties
              }
            >
              <span className="hb-wh2-name">{tile.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

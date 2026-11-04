"use client";

import * as React from "react";

export interface ScrollStaggerTile {
  title: string;
  caption?: string;
  from?: string;
  to?: string;
}

export interface ScrollStaggerGridProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles?: ScrollStaggerTile[];
  columns?: number;
  gap?: number;
  distance?: number;
  inset?: number;
  aspect?: string;
  scroller?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  height?: number | string;
  autoplay?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

type Scroller = React.RefObject<HTMLElement | null> | HTMLElement | null;

interface Frame {
  sc: HTMLElement | null;
  top: number;
  vh: number;
}

const defaultTiles: ScrollStaggerTile[] = [
  { title: "Dune", caption: "#F6C177", from: "#f6c177", to: "#d9573b" },
  { title: "Lagoon", caption: "#5EEAD4", from: "#5eead4", to: "#2563eb" },
  { title: "Orchid", caption: "#E879F9", from: "#e879f9", to: "#6d28d9" },
  { title: "Moss", caption: "#A3E635", from: "#a3e635", to: "#166534" },
  { title: "Ember", caption: "#FB923C", from: "#fb923c", to: "#be123c" },
  { title: "Glacier", caption: "#BAE6FD", from: "#bae6fd", to: "#6366f1" },
  { title: "Cocoa", caption: "#D6A77A", from: "#d6a77a", to: "#5b3a29" },
  { title: "Citrus", caption: "#FDE047", from: "#fde047", to: "#f97316" },
];

const css = `
.hb-qm4 {
  --hb-qm4-q: 0;
  position: relative;
  width: 100%;
  font-family: inherit;
}
.hb-qm4, .hb-qm4 * { box-sizing: border-box; }
.hb-qm4-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm4-vp:focus-visible { outline: 2px solid #2f7bff; outline-offset: -2px; }
.hb-qm4-grid {
  display: grid;
  grid-template-columns: repeat(var(--hb-qm4-cols, 4), minmax(0, 1fr));
  gap: var(--hb-qm4-gap, 10px);
  margin: 0 var(--hb-qm4-inset, 0px);
}
.hb-qm4-tile {
  --hb-qm4-t: clamp(0, calc((var(--hb-qm4-q) - var(--hb-qm4-d)) / 0.4), 1);
  --hb-qm4-e: calc(var(--hb-qm4-t) * (2 - var(--hb-qm4-t)));
  --hb-qm4-x: 0;
  --hb-qm4-y: 0;
  position: relative;
  display: flex;
  align-items: flex-end;
  min-width: 0;
  aspect-ratio: var(--hb-qm4-aspect, 1 / 1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.8em;
  background: linear-gradient(145deg, var(--hb-qm4-f), var(--hb-qm4-s));
  opacity: var(--hb-qm4-e);
  transform: translate3d(
      calc((1 - var(--hb-qm4-e)) * var(--hb-qm4-x) * var(--hb-qm4-dist, 56px)),
      calc((1 - var(--hb-qm4-e)) * var(--hb-qm4-y) * var(--hb-qm4-dist, 56px)),
      0
    )
    scale(calc(0.86 + 0.14 * var(--hb-qm4-e)));
  will-change: transform, opacity;
}
.hb-qm4-tile[data-dir="0"] { --hb-qm4-x: -1; }
.hb-qm4-tile[data-dir="1"] { --hb-qm4-y: 1; }
.hb-qm4-tile[data-dir="2"] { --hb-qm4-x: 1; }
.hb-qm4-tile[data-dir="3"] { --hb-qm4-y: -1; }
.hb-qm4-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(90% 70% at 20% 0%, rgba(255, 255, 255, 0.28), transparent 60%),
    linear-gradient(180deg, transparent 38%, rgba(0, 0, 0, 0.58));
}
.hb-qm4-label {
  position: relative;
  display: grid;
  gap: 0.15em;
  min-width: 0;
  padding: 0.6em 0.7em;
  color: #fff;
  line-height: 1.15;
}
.hb-qm4-name {
  overflow: hidden;
  font-size: 0.82em;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-qm4-cap {
  overflow: hidden;
  font-size: 0.66em;
  letter-spacing: 0.04em;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.72);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qm4-tile { opacity: 1; transform: none; will-change: auto; }
}
`;

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function pick(scroller: Scroller | undefined): HTMLElement | null {
  if (!scroller) return null;
  return "current" in scroller ? scroller.current : scroller;
}

function useScrollFrame(
  rootRef: React.RefObject<HTMLElement | null>,
  viewportRef: React.RefObject<HTMLElement | null>,
  scroller: Scroller | undefined,
  own: boolean,
  onFrame: (frame: Frame) => void,
) {
  const latest = React.useRef(onFrame);

  React.useEffect(() => {
    latest.current = onFrame;
  });

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sc = own ? viewportRef.current : pick(scroller);
    const host: HTMLElement | Window = sc ?? window;
    const run = () => {
      const top = sc ? sc.getBoundingClientRect().top : 0;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      latest.current({ sc, top, vh });
    };
    host.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    const ro = new ResizeObserver(run);
    ro.observe(root);
    if (sc) ro.observe(sc);
    return () => {
      host.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
      ro.disconnect();
    };
  }, [rootRef, viewportRef, scroller, own]);
}

function useAutoScroll(viewportRef: React.RefObject<HTMLElement | null>, active: boolean) {
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el || !active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.45;
      return;
    }
    let raf = 0;
    let last = 0;
    let pos = 0;
    let dir = 1;
    let hold = 700;
    let idle = 0;
    const touch = () => {
      idle = performance.now() + 3200;
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 50);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      if (now < idle) {
        pos = el.scrollTop / max;
        return;
      }
      if (hold > 0) {
        hold -= dt;
        return;
      }
      pos += (dir * dt) / 9000;
      if (pos >= 1) {
        pos = 1;
        dir = -1;
        hold = 900;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
        hold = 900;
      }
      el.scrollTop = pos * max;
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    for (const name of events) el.addEventListener(name, touch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      for (const name of events) el.removeEventListener(name, touch);
    };
  }, [viewportRef, active]);
}

export function ScrollStaggerGrid({
  tiles = defaultTiles,
  columns = 4,
  gap = 10,
  distance = 56,
  inset = 0,
  aspect = "1 / 1",
  scroller,
  height,
  autoplay = false,
  before,
  after,
  className = "",
  style,
  ...rest
}: ScrollStaggerGridProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const own = height !== undefined;
  const cols = Math.max(1, Math.round(columns));
  const count = tiles.length;

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, ({ top, vh }) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    const reach = Math.max(1, Math.min(rect.height, vh * 0.85));
    const q = clamp((top + vh - rect.top) / reach);
    rootRef.current?.style.setProperty("--hb-qm4-q", q.toFixed(4));
  });

  const body = (
    <>
      {before}
      <div ref={gridRef} className="hb-qm4-grid">
        {tiles.map((tile, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const delay = count > 1 ? (i / (count - 1)) * 0.6 : 0;
          return (
            <div
              key={i}
              className="hb-qm4-tile"
              data-dir={(row + col) % 4}
              style={
                {
                  "--hb-qm4-d": delay.toFixed(3),
                  "--hb-qm4-f": tile.from ?? "#2f7bff",
                  "--hb-qm4-s": tile.to ?? "#111111",
                } as React.CSSProperties
              }
            >
              <div className="hb-qm4-label">
                <span className="hb-qm4-name">{tile.title}</span>
                {tile.caption ? <span className="hb-qm4-cap">{tile.caption}</span> : null}
              </div>
            </div>
          );
        })}
      </div>
      {after}
    </>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm4 ${className}`.trim()}
      style={
        {
          "--hb-qm4-cols": cols,
          "--hb-qm4-gap": `${gap}px`,
          "--hb-qm4-dist": `${distance}px`,
          "--hb-qm4-inset": `${inset}px`,
          "--hb-qm4-aspect": aspect,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-stagger-grid" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm4-vp"
          style={{ height }}
          tabIndex={0}
          role="region"
          aria-label="Scrollable content"
        >
          {body}
        </div>
      ) : (
        body
      )}
    </div>
  );
}

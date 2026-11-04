"use client";

import * as React from "react";

export interface DriftTile {
  label?: string;
  color?: string;
  src?: string;
}

export interface GalleryDriftWallProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles?: DriftTile[];
  columns?: number;
  strength?: number;
  height?: number;
  gap?: number;
  idle?: boolean;
}

const css = `
.hb-qk9 {
  --hb-qk9-x: 0;
  --hb-qk9-y: 0;
  position: relative;
  width: 100%;
  height: var(--hb-qk9-h);
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #262626;
  background: #0a0a0a;
  font-family: inherit;
  box-sizing: border-box;
  touch-action: pan-y;
}
.hb-qk9 *, .hb-qk9 *::before, .hb-qk9 *::after { box-sizing: border-box; }
.hb-qk9-wall {
  position: absolute;
  inset: -22% -12%;
  display: flex;
  gap: var(--hb-qk9-gap);
}
.hb-qk9-col {
  position: relative;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  flex-direction: column;
  gap: var(--hb-qk9-gap);
  transform: translate3d(calc(var(--hb-qk9-x) * var(--hb-qk9-d) * 1px), calc(var(--hb-qk9-y) * var(--hb-qk9-d) * 1px), 0) translateY(var(--hb-qk9-o));
  will-change: transform;
}
.hb-qk9-t {
  position: relative;
  flex: var(--hb-qk9-w) 1 0;
  min-height: 0;
  margin: 0;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: var(--hb-qk9-c);
  background-size: cover;
  background-position: center;
  outline: none;
  cursor: pointer;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease, box-shadow 0.45s ease, border-color 0.3s ease;
}
.hb-qk9-art {
  position: absolute;
  inset: 0;
}
.hb-qk9-t[data-v="0"] .hb-qk9-art {
  background:
    radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--hb-qk9-c) 40%, #ffffff) 0 20%, transparent 21%),
    linear-gradient(160deg, var(--hb-qk9-c), color-mix(in srgb, var(--hb-qk9-c) 25%, #050508));
}
.hb-qk9-t[data-v="1"] .hb-qk9-art {
  background:
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.13) 0 6px, transparent 6px 15px),
    linear-gradient(200deg, var(--hb-qk9-c), color-mix(in srgb, var(--hb-qk9-c) 30%, #050508));
}
.hb-qk9-t[data-v="2"] .hb-qk9-art {
  background:
    conic-gradient(from 210deg at 28% 72%, var(--hb-qk9-c), color-mix(in srgb, var(--hb-qk9-c) 55%, #ffffff), color-mix(in srgb, var(--hb-qk9-c) 25%, #050508), var(--hb-qk9-c));
}
.hb-qk9-t[data-v="3"] .hb-qk9-art {
  background:
    radial-gradient(120% 80% at 20% 100%, color-mix(in srgb, var(--hb-qk9-c) 55%, #ffffff), transparent 62%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-qk9-c) 30%, #050508), var(--hb-qk9-c));
}
.hb-qk9-t[data-s="true"] .hb-qk9-art { background: none; }
.hb-qk9-cap {
  position: absolute;
  left: 8px;
  bottom: 7px;
  right: 8px;
  overflow: hidden;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.2;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.hb-qk9-t:hover, .hb-qk9-t:focus-visible, .hb-qk9-t[data-lift="true"] {
  z-index: 5;
  transform: scale(1.12);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 18px 32px -10px rgba(0, 0, 0, 0.9);
}
.hb-qk9-t:hover .hb-qk9-cap, .hb-qk9-t:focus-visible .hb-qk9-cap, .hb-qk9-t[data-lift="true"] .hb-qk9-cap { opacity: 1; transform: none; }
.hb-qk9-wall:has(.hb-qk9-t:hover, .hb-qk9-t:focus-visible) .hb-qk9-t:not(:hover):not(:focus-visible) { opacity: 0.5; }
.hb-qk9-col:has(.hb-qk9-t:hover, .hb-qk9-t:focus-visible, .hb-qk9-t[data-lift="true"]) { z-index: 5; }
.hb-qk9[data-demo="true"] .hb-qk9-t:not([data-lift="true"]) { opacity: 0.55; }
.hb-qk9-t:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qk9-col, .hb-qk9-t, .hb-qk9-cap { transition: none; will-change: auto; }
}
`;

const palette = ["#3b82f6", "#e5603f", "#2fa67c", "#9a6bf0", "#d8a431", "#e0568f", "#38a9c9", "#7d8f3a"];
const names = [
  "Tide pool",
  "Salt flat",
  "Night market",
  "Rooftop 04",
  "Basalt",
  "Cedar light",
  "Harbor fog",
  "Neon alley",
  "Dune line",
  "Glasshouse",
  "Paper lanterns",
  "Slate steps",
  "Marigold",
  "Underpass",
  "Orchard",
  "Ferry wake",
  "Moth light",
  "Concrete bloom",
];

function hash(n: number) {
  let h = Math.imul(n + 1, 2654435761) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

const defaultTiles: DriftTile[] = names.map((label, i) => ({
  label: `No. ${String(i + 1).padStart(2, "0")}  ${label}`,
  color: palette[(i * 3 + Math.floor(i / 6)) % palette.length],
}));

function clampN(n: number) {
  return Math.min(1, Math.max(-1, n));
}

export function GalleryDriftWall({
  tiles = defaultTiles,
  columns = 6,
  strength = 28,
  height = 220,
  gap = 8,
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: GalleryDriftWallProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const st = React.useRef({ tx: 0, ty: 0, x: 0, y: 0, hover: false });
  const user = React.useRef(false);
  const visible = React.useRef(true);
  const [demo, setDemo] = React.useState(-1);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const frame = (ms: number) => {
      const t = ms / 1000;
      if (!s.hover) {
        if (idle) {
          s.tx = Math.sin(t * 0.55);
          s.ty = 0.8 * Math.sin(t * 0.41 + 1.3);
        } else {
          s.tx = 0;
          s.ty = 0;
        }
      }
      s.x += (-s.tx * strength - s.x) * 0.08;
      s.y += (-s.ty * strength * 0.6 - s.y) * 0.08;
      el.style.setProperty("--hb-qk9-x", s.x.toFixed(2));
      el.style.setProperty("--hb-qk9-y", s.y.toFixed(2));
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [strength, idle]);

  React.useEffect(() => {
    if (!idle || tiles.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    const timer = window.setInterval(() => {
      if (user.current || !visible.current) return;
      n += 1;
      setDemo(Math.floor(hash(n + 11) * tiles.length));
    }, 1900);
    return () => window.clearInterval(timer);
  }, [idle, tiles.length]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const s = st.current;
    s.hover = true;
    s.tx = clampN(((e.clientX - r.left) / r.width - 0.5) * 2);
    s.ty = clampN(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const enter = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(e);
    user.current = true;
    setDemo(-1);
  };

  const leave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    st.current.hover = false;
    user.current = false;
  };

  const cancel = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);
    st.current.hover = false;
    user.current = false;
  };

  const cols = Math.max(1, columns);
  const lanes: { tile: DriftTile; index: number }[][] = Array.from({ length: cols }, () => []);
  tiles.forEach((tile, index) => lanes[index % cols].push({ tile, index }));

  return (
    <div
      ref={root}
      className={`hb-qk9 ${className}`}
      data-demo={demo >= 0 ? "true" : "false"}
      style={{ "--hb-qk9-h": `${height}px`, "--hb-qk9-gap": `${gap}px`, ...style } as React.CSSProperties}
      onPointerMove={move}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onPointerCancel={cancel}
      {...rest}
    >
      <style href="hb-gallery-drift-wall" precedence="default">{css}</style>
      <div className="hb-qk9-wall">
        {lanes.map((lane, c) => (
          <div
            className="hb-qk9-col"
            key={c}
            style={
              {
                "--hb-qk9-d": (0.45 + hash(c + 3) * 0.95).toFixed(2),
                "--hb-qk9-o": `${((hash(c + 40) - 0.5) * 14).toFixed(1)}%`,
              } as React.CSSProperties
            }
          >
            {lane.map(({ tile, index }) => (
              <figure
                className="hb-qk9-t"
                key={`${tile.label ?? "tile"}-${index}`}
                tabIndex={0}
                aria-label={tile.label}
                data-v={Math.floor(hash(index + 90) * 4)}
                data-s={tile.src ? "true" : "false"}
                data-lift={demo === index ? "true" : "false"}
                style={
                  {
                    "--hb-qk9-c": tile.color ?? palette[index % palette.length],
                    "--hb-qk9-w": (0.8 + hash(index + 7) * 0.8).toFixed(2),
                    backgroundImage: tile.src ? `url(${JSON.stringify(tile.src)})` : undefined,
                  } as React.CSSProperties
                }
              >
                <span className="hb-qk9-art" aria-hidden="true" />
                {tile.label ? <figcaption className="hb-qk9-cap">{tile.label}</figcaption> : null}
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

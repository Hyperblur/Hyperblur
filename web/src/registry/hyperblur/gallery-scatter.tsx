"use client";

import * as React from "react";

export interface ScatterImage {
  src?: string;
  title: string;
  caption?: string;
}

export interface GalleryScatterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: ScatterImage[];
  onChange?: (index: number) => void;
  tidy?: boolean;
  defaultTidy?: boolean;
  onTidyChange?: (tidy: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
  height?: number | string;
}

type Scene = {
  title: string;
  caption: string;
  sky: [string, string, string];
  sun: string;
  hills: [string, string, string];
};

const scenes: Scene[] = [
  { title: "Dune Sunrise", caption: "Erg Chebbi, 6:12 am", sky: ["#ffd08a", "#ff7a59", "#5b2a6e"], sun: "#fff1c9", hills: ["#c4573f", "#7d2e45", "#3a1631"] },
  { title: "Harbor Lights", caption: "Lisbon waterfront", sky: ["#0d1640", "#2c3f9c", "#7aa7ff"], sun: "#e8f0ff", hills: ["#2a3a8a", "#18205a", "#0a0e2c"] },
  { title: "Glacier Lake", caption: "Moraine Lake, Alberta", sky: ["#d6fbf6", "#5fcfcf", "#0e5a74"], sun: "#ffffff", hills: ["#3e8fa0", "#1f5f73", "#0b2f40"] },
  { title: "Neon Alley", caption: "Shinjuku, 1:40 am", sky: ["#2a0b3f", "#8a1f7a", "#ff4fa3"], sun: "#ffd1ec", hills: ["#5a1460", "#33093f", "#16041f"] },
  { title: "Pine Ridge", caption: "Olympic Peninsula", sky: ["#eef4d8", "#97c27a", "#28563a"], sun: "#fffbe6", hills: ["#4f8a52", "#2c5c3a", "#123222"] },
  { title: "Coral Hour", caption: "Big Sur coastline", sky: ["#ffe6d6", "#ff9f8a", "#c2457a"], sun: "#fff4e8", hills: ["#d0627a", "#8e2f5c", "#46163a"] },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 3266489917) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

const sceneCache = new Map<number, string>();

function sceneUri(i: number) {
  const k = mod(i, scenes.length);
  const hit = sceneCache.get(k);
  if (hit) return hit;
  const sc = scenes[k];
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sc.sky[0]}"/><stop offset="0.55" stop-color="${sc.sky[1]}"/><stop offset="1" stop-color="${sc.sky[2]}"/></linearGradient></defs><rect width="320" height="200" fill="url(#s)"/>`;
  const sx = 60 + (hash(k * 13) % 200);
  const sy = 40 + (hash(k * 17) % 40);
  s += `<circle cx="${sx}" cy="${sy}" r="34" fill="${sc.sun}" opacity="0.18"/><circle cx="${sx}" cy="${sy}" r="18" fill="${sc.sun}" opacity="0.9"/>`;
  for (let l = 0; l < 3; l += 1) {
    const base = 112 + l * 30;
    const amp = 34 - l * 8;
    let d = `M0 200 L0 ${base - (hash(k * 41 + l * 7) % amp)}`;
    for (let j = 1; j <= 8; j += 1) {
      d += ` L${j * 40} ${base - (hash(k * 41 + l * 7 + j * 3) % amp)}`;
    }
    s += `<path d="${d} L320 200Z" fill="${sc.hills[l]}"/>`;
  }
  s += "</svg>";
  const uri = `data:image/svg+xml,${encodeURIComponent(s)}`;
  sceneCache.set(k, uri);
  return uri;
}

const defaults: ScatterImage[] = scenes.map((s) => ({ title: s.title, caption: s.caption }));

function imageUrl(list: ScatterImage[], i: number) {
  const item = list[i];
  return item?.src ? `url(${JSON.stringify(item.src)})` : `url("${sceneUri(i)}")`;
}

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const last = entries[entries.length - 1];
      if (last) setVisible(last.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

type Spot = { x: number; y: number; r: number };

type Layout = { order: number[]; mode: boolean; pos: (Spot | null)[]; cycle: number };

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function scatterSpot(i: number, n: number, seed = 0): Spot {
  const h1 = hash(i * 31 + seed * 977 + 5);
  const h2 = hash(i * 17 + seed * 613 + 11);
  const h3 = hash(i * 53 + seed * 389 + 23);
  const jx = ((h1 % 1000) / 1000 - 0.5) * 0.1;
  const jy = ((h2 % 1000) / 1000 - 0.5) * 0.16;
  return {
    x: clamp(0.14 + ((i + 0.5) / n) * 0.72 + jx, 0.12, 0.88),
    y: clamp((i % 2 === 0 ? 0.37 : 0.58) + jy, 0.26, 0.66),
    r: Number((((h3 % 1000) / 1000 - 0.5) * 26).toFixed(2)),
  };
}

function tidySpot(i: number, n: number, aspect: number): Spot {
  const cols = clamp(Math.round(Math.sqrt(n * aspect * 0.75)), 1, n);
  const rows = Math.ceil(n / cols);
  const c = i % cols;
  const r = Math.floor(i / cols);
  const inRow = r === rows - 1 ? n - cols * (rows - 1) : cols;
  const shift = (cols - inRow) / 2;
  return {
    x: 0.07 + ((c + shift + 0.5) / cols) * 0.86,
    y: 0.05 + ((r + 0.5) / rows) * 0.72,
    r: 0,
  };
}

const css = `
.hb-zx4 {
  --hb-zx4-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: size;
  border: 1px solid #232323;
  border-radius: 14px;
  background:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 1.4px) 0 0 / 16px 16px,
    radial-gradient(120% 90% at 30% 10%, #191a1d 0%, #0c0c0d 70%);
  color: #ededed;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}
.hb-zx4 *, .hb-zx4 *::before, .hb-zx4 *::after { box-sizing: border-box; }
.hb-zx4-print {
  --hb-zx4-w: min(26cqw, 38cqh);
  position: absolute;
  width: var(--hb-zx4-w);
  margin: 0;
  padding: calc(var(--hb-zx4-w) * 0.06) calc(var(--hb-zx4-w) * 0.06) 0;
  border: 0;
  border-radius: 2px;
  background: #f4f1ea;
  color: #2b2b2b;
  font: inherit;
  text-align: left;
  cursor: grab;
  touch-action: none;
  box-shadow: 0 6px 14px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.35);
  transition: left 0.75s cubic-bezier(0.22, 0.8, 0.24, 1), top 0.75s cubic-bezier(0.22, 0.8, 0.24, 1), transform 0.75s cubic-bezier(0.22, 0.8, 0.24, 1), box-shadow 0.3s ease;
  transition-delay: var(--hb-zx4-d, 0s);
  -webkit-tap-highlight-color: transparent;
}
.hb-zx4-print:hover { box-shadow: 0 10px 22px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.35); }
.hb-zx4-print:focus-visible { outline: 2px solid var(--hb-zx4-a); outline-offset: 3px; }
.hb-zx4-print[data-lift="true"] {
  cursor: grabbing;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 22px 40px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.4);
}
.hb-zx4-img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
  pointer-events: none;
}
.hb-zx4-label {
  display: block;
  padding: calc(var(--hb-zx4-w) * 0.05) 1px calc(var(--hb-zx4-w) * 0.07);
  font-size: calc(var(--hb-zx4-w) * 0.105);
  font-weight: 600;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}
.hb-zx4-tape {
  position: absolute;
  left: 50%;
  top: calc(var(--hb-zx4-w) * -0.05);
  width: calc(var(--hb-zx4-w) * 0.34);
  height: calc(var(--hb-zx4-w) * 0.1);
  transform: translateX(-50%) rotate(-3deg);
  background: rgba(240, 232, 200, 0.55);
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  pointer-events: none;
}
.hb-zx4-tidy {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  margin: 0;
  padding: 0 10px 0 8px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  background: rgba(16,16,16,0.82);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #ededed;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}
.hb-zx4-tidy:hover { background: rgba(28,28,28,0.9); border-color: rgba(255,255,255,0.2); }
.hb-zx4-tidy:active { transform: scale(0.96); }
.hb-zx4-tidy:focus-visible { outline: 2px solid var(--hb-zx4-a); outline-offset: 2px; }
.hb-zx4-tidy svg { color: var(--hb-zx4-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-zx4-print, .hb-zx4-print[data-lift="true"], .hb-zx4-tidy { transition: none; }
}
`;

export function GalleryScatter({
  images,
  onChange,
  tidy,
  defaultTidy = false,
  onTidyChange,
  autoPlay = true,
  interval = 3200,
  accent = "#2f7bff",
  height,
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: GalleryScatterProps) {
  const list = images && images.length > 0 ? images : defaults;
  const n = list.length;
  const controlled = tidy !== undefined;
  const [innerTidy, setInnerTidy] = React.useState(defaultTidy);
  const isTidy = controlled ? tidy : innerTidy;
  const [layout, setLayout] = React.useState<Layout>(() => ({
    order: list.map((_, i) => i),
    mode: defaultTidy,
    pos: [],
    cycle: 0,
  }));
  const [aspect, setAspect] = React.useState(16 / 9);
  const [lift, setLift] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<null | { id: number; i: number; sx: number; sy: number; start: Spot; w: number; h: number; moved: boolean }>(null);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef);

  const spot = (i: number): Spot => {
    const custom = layout.mode === isTidy ? layout.pos[i] : null;
    if (custom) return custom;
    return isTidy ? tidySpot(i, n, aspect) : scatterSpot(i, n);
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (el.clientHeight > 0) setAspect(el.clientWidth / el.clientHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!autoPlay || reduced || !visible || paused || isTidy || lift !== null || n < 2) return;
    const id = window.setInterval(() => {
      setLayout((prev) => {
        const order = prev.order.filter((i) => i < n);
        for (let i = 0; i < n; i += 1) if (!order.includes(i)) order.unshift(i);
        const pick = order[0];
        const cycle = prev.cycle + 1;
        const pos = prev.mode === false ? prev.pos.slice() : [];
        pos[pick] = scatterSpot(pick, n, cycle);
        return { order: [...order.slice(1), pick], mode: false, pos, cycle };
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [autoPlay, reduced, visible, paused, isTidy, lift, n, interval]);

  const toFront = (i: number) => {
    setLayout((prev) => {
      const order = prev.order.filter((k) => k !== i && k < n);
      for (let k = 0; k < n; k += 1) if (k !== i && !order.includes(k)) order.unshift(k);
      return { ...prev, order: [...order, i] };
    });
  };

  const place = (i: number, s: Spot) => {
    setLayout((prev) => {
      const pos = prev.mode === isTidy ? prev.pos.slice() : [];
      pos[i] = s;
      return { ...prev, mode: isTidy, pos };
    });
  };

  const toggleTidy = () => {
    const next = !isTidy;
    if (!controlled) setInnerTidy(next);
    setLayout((prev) => ({ ...prev, mode: next, pos: [] }));
    onTidyChange?.(next);
  };

  const down = (e: React.PointerEvent<HTMLButtonElement>, i: number) => {
    if (e.button !== 0) return;
    const root = rootRef.current;
    if (!root) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      id: e.pointerId,
      i,
      sx: e.clientX,
      sy: e.clientY,
      start: spot(i),
      w: root.clientWidth,
      h: root.clientHeight,
      moved: false,
    };
    setLift(i);
    toFront(i);
  };

  const move = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 3) d.moved = true;
    if (!d.moved) return;
    place(d.i, {
      x: clamp(d.start.x + dx / d.w, 0.05, 0.95),
      y: clamp(d.start.y + dy / d.h, 0.08, 0.92),
      r: d.start.r,
    });
  };

  const up = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    setLift(null);
    onChange?.(d.i);
  };

  const key = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const stepSize = e.shiftKey ? 0.08 : 0.03;
    let dx = 0;
    let dy = 0;
    if (e.key === "ArrowLeft") dx = -stepSize;
    else if (e.key === "ArrowRight") dx = stepSize;
    else if (e.key === "ArrowUp") dy = -stepSize;
    else if (e.key === "ArrowDown") dy = stepSize;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toFront(i);
      onChange?.(i);
      return;
    } else return;
    e.preventDefault();
    const s = spot(i);
    toFront(i);
    place(i, { x: clamp(s.x + dx, 0.05, 0.95), y: clamp(s.y + dy, 0.08, 0.92), r: s.r });
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Scattered prints"
      className={className ? `hb-zx4 ${className}` : "hb-zx4"}
      style={{
        ...(height !== undefined ? { height } : { aspectRatio: "16 / 10" }),
        ["--hb-zx4-a" as string]: accent,
        ...style,
      }}
      onPointerEnter={(e) => {
        setPaused(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setPaused(false);
        onPointerLeave?.(e);
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setPaused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
        onBlur?.(e);
      }}
      {...rest}
    >
      <style href="hb-gallery-scatter" precedence="default">
        {css}
      </style>
      {list.map((item, i) => {
        const s = spot(i);
        const z = layout.order.indexOf(i) + 1;
        const lifted = lift === i;
        return (
          <button
            key={i}
            type="button"
            className="hb-zx4-print"
            data-lift={lifted}
            aria-label={`${item.title}${item.caption ? `, ${item.caption}` : ""}. Arrow keys move it.`}
            style={{
              left: `${(s.x * 100).toFixed(2)}%`,
              top: `${(s.y * 100).toFixed(2)}%`,
              zIndex: lifted ? 999 : z,
              transform: `translate(-50%, -50%) rotate(${(lifted ? s.r * 0.4 : s.r).toFixed(2)}deg) scale(${lifted ? 1.07 : 1})`,
              ["--hb-zx4-d" as string]: `${(i * 0.04).toFixed(2)}s`,
            }}
            onPointerDown={(e) => down(e, i)}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={(e) => key(e, i)}
          >
            <span className="hb-zx4-tape" />
            <span className="hb-zx4-img" style={{ backgroundImage: imageUrl(list, i) }} />
            <span className="hb-zx4-label">{item.title}</span>
          </button>
        );
      })}
      <button type="button" className="hb-zx4-tidy" aria-pressed={isTidy} onClick={toggleTidy}>
        {isTidy ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="6" width="9" height="11" rx="1" transform="rotate(-10 8.5 11.5)" />
            <rect x="11" y="7" width="9" height="11" rx="1" transform="rotate(8 15.5 12.5)" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
          </svg>
        )}
        {isTidy ? "Scatter" : "Tidy up"}
      </button>
    </div>
  );
}

export default GalleryScatter;

"use client";

import * as React from "react";

export interface CoverflowLightsImage {
  src?: string;
  title: string;
  caption?: string;
  color?: string;
}

export interface GalleryCoverflowLightsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: CoverflowLightsImage[];
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  glow?: number;
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

const defaults: CoverflowLightsImage[] = scenes.map((s) => ({ title: s.title, caption: s.caption }));

function imageUrl(list: CoverflowLightsImage[], i: number) {
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

const sceneColors = ["#ff7a59", "#4f7cff", "#2fd3c7", "#ff4fa3", "#7cc46a", "#ff8f7a"];

function lightOf(list: CoverflowLightsImage[], i: number) {
  return list[i]?.color ?? sceneColors[mod(i, sceneColors.length)];
}

const css = `
.hb-zx3 {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid #222222;
  border-radius: 14px;
  background: #060606;
  color: #ededed;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
  outline: none;
}
.hb-zx3 *, .hb-zx3 *::before, .hb-zx3 *::after { box-sizing: border-box; }
.hb-zx3:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-zx3-l); }
.hb-zx3-stage {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  container-type: size;
  cursor: grab;
  touch-action: pan-y;
}
.hb-zx3-stage[data-drag="true"] { cursor: grabbing; }
.hb-zx3-glow, .hb-zx3-spill, .hb-zx3-beam {
  position: absolute;
  pointer-events: none;
  background-color: var(--hb-zx3-l);
  transition: background-color 0.9s ease, opacity 0.9s ease;
}
.hb-zx3-glow {
  left: 50%;
  top: 46%;
  width: 70cqw;
  height: 90cqh;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(40px);
  opacity: calc(0.42 * var(--hb-zx3-g));
}
.hb-zx3-spill {
  left: 50%;
  top: 82%;
  width: 80cqw;
  height: 24cqh;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(18px);
  opacity: calc(0.45 * var(--hb-zx3-g));
}
.hb-zx3-beam {
  left: 50%;
  top: 0;
  width: 70cqw;
  height: 60cqh;
  transform: translateX(-50%);
  clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
  -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent);
  mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent);
  filter: blur(6px);
  opacity: calc(0.22 * var(--hb-zx3-g));
}
.hb-zx3-world {
  position: absolute;
  inset: 0;
  perspective: 280cqh;
  perspective-origin: 50% 45%;
  transform-style: preserve-3d;
}
.hb-zx3-card {
  --hb-zx3-c: min(30cqw, 62cqh);
  position: absolute;
  left: 50%;
  top: 45%;
  width: var(--hb-zx3-c);
  aspect-ratio: 1 / 1;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background-color: #111;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.22, 0.8, 0.24, 1), filter 0.6s ease, box-shadow 0.9s ease, opacity var(--hb-zx3-od, 0.35s) ease var(--hb-zx3-dl, 0s);
  will-change: transform;
}
.hb-zx3-card:focus-visible { outline: 2px solid var(--hb-zx3-l); outline-offset: 3px; }
.hb-zx3-card[data-on="true"] { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 0 46px -6px var(--hb-zx3-l), 0 18px 34px rgba(0,0,0,0.6); }
.hb-zx3-refl {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 3px);
  height: 55%;
  border-radius: 8px;
  background: inherit;
  background-size: 100% 182%;
  background-position: bottom;
  transform: scaleY(-1);
  opacity: 0.28;
  -webkit-mask-image: linear-gradient(0deg, rgba(0,0,0,0.9), transparent 75%);
  mask-image: linear-gradient(0deg, rgba(0,0,0,0.9), transparent 75%);
  pointer-events: none;
}
.hb-zx3[data-drag="true"] .hb-zx3-card { transition: box-shadow 0.9s ease; }
.hb-zx3-arrow {
  position: absolute;
  top: 45%;
  z-index: 200;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  background: rgba(14,14,14,0.7);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #ededed;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.hb-zx3-arrow:hover { background: rgba(30,30,30,0.85); border-color: rgba(255,255,255,0.22); }
.hb-zx3-arrow:active { transform: translateY(-50%) scale(0.94); }
.hb-zx3-arrow:focus-visible { outline: 2px solid var(--hb-zx3-l); outline-offset: 2px; }
.hb-zx3-prev { left: 8px; }
.hb-zx3-next { right: 8px; }
.hb-zx3-bar {
  position: relative;
  z-index: 2;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 12px 9px;
}
.hb-zx3-text { min-width: 0; }
.hb-zx3-title { margin: 0; font-size: 13px; font-weight: 600; line-height: 1.2; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: hb-zx3-in 0.5s ease both; }
.hb-zx3-cap { margin: 1px 0 0; font-size: 11px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: hb-zx3-in 0.5s 0.06s ease both; }
.hb-zx3-dots { display: flex; gap: 5px; flex: none; }
.hb-zx3-dot {
  width: 5px;
  height: 5px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #3a3a3a;
  cursor: pointer;
  transition: width 0.3s ease, background-color 0.3s ease;
}
.hb-zx3-dot[data-on="true"] { width: 16px; background: var(--hb-zx3-l); }
.hb-zx3-dot:focus-visible { outline: 2px solid var(--hb-zx3-l); outline-offset: 2px; }
@keyframes hb-zx3-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-zx3-card, .hb-zx3-glow, .hb-zx3-spill, .hb-zx3-beam, .hb-zx3-dot, .hb-zx3-arrow { transition: none; }
  .hb-zx3-title, .hb-zx3-cap { animation: none; }
}
`;

function place(d: number) {
  const ad = Math.abs(d);
  const sg = Math.sign(d);
  const near = Math.min(ad, 1);
  const far = Math.max(0, ad - 1);
  return {
    x: sg * (near * 0.82 + far * 0.4),
    z: -(near * 0.75 + far * 0.3),
    r: -sg * near * 56,
    b: Math.max(0.12, 1 - near * 0.58 - far * 0.2),
    o: Math.max(0, Math.min(1, 2.6 - ad)),
  };
}

export function GalleryCoverflowLights({
  images,
  index,
  defaultIndex = 0,
  onChange,
  autoPlay = true,
  interval = 3200,
  glow = 1,
  height,
  className,
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: GalleryCoverflowLightsProps) {
  const list = images && images.length > 0 ? images : defaults;
  const n = list.length;
  const controlled = index !== undefined;
  const [inner, setInner] = React.useState(() => mod(defaultIndex, n));
  const active = mod(controlled ? index : inner, n);
  const [drag, setDrag] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [unit, setUnit] = React.useState(100);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<null | { id: number; startX: number; moved: boolean }>(null);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef);
  const [tick, setTick] = React.useState(0);

  const go = React.useCallback(
    (next: number) => {
      const i = mod(next, n);
      if (i === active) return;
      if (!controlled) setInner(i);
      onChange?.(i);
    },
    [active, controlled, n, onChange],
  );

  const nextRef = React.useRef(() => {});
  React.useEffect(() => {
    nextRef.current = () => go(active + 1);
  });

  React.useEffect(() => {
    if (!autoPlay || reduced || !visible || paused || dragging || n < 2) return;
    const id = window.setInterval(() => nextRef.current(), interval);
    return () => window.clearInterval(id);
  }, [autoPlay, reduced, visible, paused, dragging, interval, n, tick]);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      setUnit(Math.max(40, Math.min(el.clientWidth * 0.3, el.clientHeight * 0.62)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = (d: number) => {
    go(active + d);
    setTick((t) => t + 1);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(n - 1);
    else return;
    e.preventDefault();
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = { id: e.pointerId, startX: e.clientX, moved: false };
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    if (d.moved) setDrag(-dx / (unit * 0.82));
  };

  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    if (!d.moved) return;
    const dx = e.clientX - d.startX;
    let steps = Math.round(-dx / (unit * 0.82));
    if (steps === 0 && Math.abs(dx) > 28) steps = dx < 0 ? 1 : -1;
    setDragging(false);
    setDrag(0);
    if (steps !== 0) step(steps);
  };

  const pos = active + drag;
  const light = lightOf(list, active);
  const current = list[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cover flow gallery"
      tabIndex={0}
      className={className ? `hb-zx3 ${className}` : "hb-zx3"}
      data-drag={dragging}
      style={{
        ...(height !== undefined ? { height } : { aspectRatio: "16 / 10" }),
        ["--hb-zx3-l" as string]: light,
        ["--hb-zx3-g" as string]: String(glow),
        ...style,
      }}
      onKeyDown={handleKey}
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
      <style href="hb-gallery-coverflow-lights" precedence="default">
        {css}
      </style>
      <div
        ref={stageRef}
        className="hb-zx3-stage"
        data-drag={dragging}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="hb-zx3-beam" />
        <div className="hb-zx3-glow" />
        <div className="hb-zx3-spill" />
        <div className="hb-zx3-world">
          {list.map((item, i) => {
            let d = mod(i - pos + n / 2, n) - n / 2;
            if (n === 1) d = 0;
            const p = place(d);
            const ad = Math.abs(d);
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                className="hb-zx3-card"
                data-on={on}
                tabIndex={-1}
                aria-label={on ? item.title : `Show ${item.title}`}
                aria-hidden={p.o === 0}
                onClick={() => {
                  if (!on) step(mod(i - active + n / 2, n) - n / 2 || 0);
                }}
                style={{
                  backgroundImage: imageUrl(list, i),
                  transform: `translate(-50%, -50%) translate3d(calc(var(--hb-zx3-c) * ${p.x.toFixed(3)}), 0, calc(var(--hb-zx3-c) * ${p.z.toFixed(3)})) rotateY(${p.r.toFixed(2)}deg)`,
                  filter: `brightness(${p.b.toFixed(3)})`,
                  opacity: Number(p.o.toFixed(3)),
                  zIndex: 100 - Math.round(ad * 10),
                  pointerEvents: p.o < 0.2 ? "none" : undefined,
                  ["--hb-zx3-od" as string]: p.o === 0 ? "0.12s" : "0.35s",
                  ["--hb-zx3-dl" as string]: p.o > 0 && ad >= 1.5 ? "0.42s" : "0s",
                }}
              >
                <span className="hb-zx3-refl" />
              </button>
            );
          })}
        </div>
        {n > 1 ? (
          <>
            <button type="button" className="hb-zx3-arrow hb-zx3-prev" aria-label="Previous image" onClick={() => step(-1)} onPointerDown={(e) => e.stopPropagation()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className="hb-zx3-arrow hb-zx3-next" aria-label="Next image" onClick={() => step(1)} onPointerDown={(e) => e.stopPropagation()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
      <div className="hb-zx3-bar">
        <div className="hb-zx3-text" key={active}>
          <p className="hb-zx3-title">{current?.title}</p>
          {current?.caption ? <p className="hb-zx3-cap">{current.caption}</p> : null}
        </div>
        <div className="hb-zx3-dots">
          {list.map((item, i) => (
            <button
              key={i}
              type="button"
              className="hb-zx3-dot"
              data-on={i === active}
              aria-label={`Go to ${item.title}`}
              aria-current={i === active}
              tabIndex={-1}
              onClick={() => step(mod(i - active + n / 2, n) - n / 2 || 0)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryCoverflowLights;

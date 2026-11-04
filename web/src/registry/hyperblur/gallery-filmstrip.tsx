"use client";

import * as React from "react";

export interface FilmstripImage {
  src?: string;
  title: string;
  caption?: string;
}

export interface GalleryFilmstripProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: FilmstripImage[];
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  speed?: number;
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

function clock() {
  return performance.now();
}

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

const defaults: FilmstripImage[] = scenes.map((s) => ({ title: s.title, caption: s.caption }));

function imageUrl(list: FilmstripImage[], i: number) {
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

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

const css = `
.hb-zx1 {
  --hb-zx1-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 8px;
  border: 1px solid #232323;
  border-radius: 14px;
  background: #0c0c0c;
  color: #ededed;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
.hb-zx1 *, .hb-zx1 *::before, .hb-zx1 *::after { box-sizing: border-box; }
.hb-zx1:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-zx1-a); }
.hb-zx1-view {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 9px;
  background: #050505;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
}
.hb-zx1-shot {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.5s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zx1-shot[data-on="true"] { opacity: 1; transform: scale(1); }
.hb-zx1-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
}
.hb-zx1-marks { position: absolute; inset: 8px; pointer-events: none; }
.hb-zx1-marks::before, .hb-zx1-marks::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: rgba(255,255,255,0.55);
  border-style: solid;
}
.hb-zx1-marks::before { left: 0; top: 0; border-width: 1.5px 0 0 1.5px; }
.hb-zx1-marks::after { right: 0; bottom: 0; border-width: 0 1.5px 1.5px 0; }
.hb-zx1-meta {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 9px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
}
.hb-zx1-title { margin: 0; font-size: 13px; font-weight: 600; line-height: 1.2; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-zx1-cap { margin: 2px 0 0; font-size: 11px; color: rgba(237,237,237,0.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-zx1-count {
  flex: none;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  color: rgba(237,237,237,0.75);
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.12);
}
.hb-zx1-strip {
  position: relative;
  flex: 0 0 auto;
  height: clamp(56px, 36%, 104px);
  overflow: hidden;
  border-radius: 6px;
  background: #1a130d;
  cursor: grab;
  touch-action: pan-y;
}
.hb-zx1-strip[data-drag="true"] { cursor: grabbing; }
.hb-zx1-track {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  will-change: transform;
}
.hb-zx1-cell {
  position: relative;
  flex: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2px;
  border-right: 1px solid rgba(0,0,0,0.5);
}
.hb-zx1-holes {
  position: relative;
  flex: none;
  height: 10px;
  background-image: linear-gradient(90deg, transparent 0 30%, #d8d0bf 30% 70%, transparent 70% 100%);
  background-size: var(--hb-zx1-hole) 5px;
  background-repeat: repeat-x;
  background-position: 0 center;
  opacity: 0.85;
}
.hb-zx1-pic {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  border-radius: 2px;
  background-size: cover;
  background-position: center;
  filter: saturate(0.7) brightness(0.62) sepia(0.25);
  transition: filter 0.35s ease;
}
.hb-zx1-cell[data-on="true"] .hb-zx1-pic { filter: none; }
.hb-zx1-num {
  position: absolute;
  left: 3px;
  bottom: 0;
  height: 10px;
  padding: 0 3px;
  display: flex;
  align-items: center;
  background: #1a130d;
  color: #f0a64a;
  font-size: 7px;
  line-height: 1;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.hb-zx1-gate {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  border: 1.5px solid var(--hb-zx1-a);
  border-radius: 4px;
  box-shadow: 0 0 0 999px rgba(0,0,0,0.18), 0 0 14px color-mix(in srgb, var(--hb-zx1-a) 55%, transparent);
  pointer-events: none;
}
.hb-zx1-gate::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -9px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--hb-zx1-a);
}
@media (prefers-reduced-motion: reduce) {
  .hb-zx1-shot, .hb-zx1-pic { transition: none; }
}
`;

type Drag = { id: number; startX: number; lastX: number; lastT: number; moved: boolean };

export function GalleryFilmstrip({
  images,
  index,
  defaultIndex = 0,
  onChange,
  autoPlay = true,
  speed = 0.35,
  accent = "#2f7bff",
  height,
  className,
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: GalleryFilmstripProps) {
  const list = images && images.length > 0 ? images : defaults;
  const n = list.length;
  const controlled = index !== undefined;
  const [inner, setInner] = React.useState(() => mod(defaultIndex, n));
  const active = mod(controlled ? index : inner, n);
  const [dims, setDims] = React.useState({ cw: 0, fw: 64 });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef);
  const [dragging, setDragging] = React.useState(false);
  const st = React.useRef({
    x: mod(defaultIndex, n),
    v: 0,
    target: null as number | null,
    drag: null as Drag | null,
    hover: false,
    focus: false,
    idleAt: 0,
    wheelAt: 0,
    shown: mod(defaultIndex, n),
    cw: 0,
    fw: 64,
    copies: 3,
    n,
  });
  const cb = React.useRef({ controlled, onChange });

  React.useEffect(() => {
    cb.current = { controlled, onChange };
  });

  const copies = dims.cw > 0 ? Math.max(3, 2 * Math.ceil(dims.cw / (n * dims.fw)) + 1) : 3;

  const apply = React.useCallback(() => {
    const s = st.current;
    const track = trackRef.current;
    if (!track) return;
    const mid = Math.floor(s.copies / 2);
    const tx = s.cw / 2 - s.fw / 2 - (mod(s.x, s.n) + mid * s.n) * s.fw;
    track.style.transform = `translate3d(${tx.toFixed(2)}px,0,0)`;
  }, []);

  React.useLayoutEffect(() => {
    st.current.copies = copies;
    st.current.n = n;
    apply();
  }, [copies, n, dims, apply]);

  React.useEffect(() => {
    const el = stripRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const h = el.clientHeight;
      const fw = Math.max(44, Math.round((h - 20) * 1.42 + 4));
      st.current.cw = el.clientWidth;
      st.current.fw = fw;
      setDims({ cw: el.clientWidth, fw });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const s = st.current;
    if (!controlled) return;
    const cur = mod(Math.round(s.x), n);
    if (cur === index) return;
    let d = mod(index - cur, n);
    if (d > n / 2) d -= n;
    s.target = Math.round(s.x) + d;
    s.shown = mod(index, n);
    s.idleAt = clock() + 2500;
  }, [controlled, index, n]);

  React.useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let last = clock();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const s = st.current;
      if (!s.drag) {
        if (s.target !== null) {
          if (reduced) {
            s.x = s.target;
          } else {
            s.x += (s.target - s.x) * (1 - Math.exp(-dt * 9));
          }
          if (Math.abs(s.target - s.x) < 0.002) {
            s.x = s.target;
            s.target = null;
          }
        } else if (autoPlay && !reduced && !s.hover && !s.focus && t > s.idleAt) {
          s.x += speed * dt;
        } else if (t - s.wheelAt > 160 && Math.abs(s.x - Math.round(s.x)) > 0.002) {
          s.target = Math.round(s.x);
        }
      }
      apply();
      const idx = mod(Math.round(s.x), s.n);
      if (idx !== s.shown) {
        s.shown = idx;
        if (!cb.current.controlled) setInner(idx);
        cb.current.onChange?.(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, autoPlay, speed, apply]);

  React.useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontal && !e.shiftKey) return;
      e.preventDefault();
      const s = st.current;
      const d = horizontal ? e.deltaX : e.deltaY;
      s.x += (d / s.fw) * 0.5;
      s.target = null;
      s.wheelAt = clock();
      s.idleAt = s.wheelAt + 2500;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (i: number) => {
    const s = st.current;
    const base = s.target ?? Math.round(s.x);
    let d = mod(i - mod(base, n), n);
    if (d > n / 2) d -= n;
    s.target = base + d;
    s.idleAt = clock() + 3000;
  };

  const step = (d: number) => {
    const s = st.current;
    const base = s.target ?? Math.round(s.x);
    s.target = base + d;
    s.idleAt = clock() + 3000;
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(n - 1);
    else return;
    e.preventDefault();
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = st.current;
    s.drag = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: clock(), moved: false };
    s.target = null;
    s.v = 0;
    setDragging(true);
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    const now = clock();
    const dx = e.clientX - d.lastX;
    const dt = Math.max(0.008, (now - d.lastT) / 1000);
    s.x -= dx / s.fw;
    s.v = s.v * 0.6 + (-dx / s.fw / dt) * 0.4;
    d.lastX = e.clientX;
    d.lastT = now;
    if (Math.abs(e.clientX - d.startX) > 4) d.moved = true;
  };

  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    s.drag = null;
    setDragging(false);
    s.idleAt = clock() + 2500;
    if (d.moved) {
      s.target = Math.round(s.x + Math.max(-3, Math.min(3, s.v * 0.18)));
      return;
    }
    const cell = (e.target as HTMLElement).closest("[data-k]");
    const k = cell ? Number(cell.getAttribute("data-k")) : NaN;
    if (!Number.isNaN(k)) goTo(mod(k, n));
  };

  const hole = (dims.fw - 4) / Math.max(3, Math.round((dims.fw - 4) / 14));
  const cells: React.ReactNode[] = [];
  for (let k = 0; k < copies * n; k += 1) {
    const i = k % n;
    cells.push(
      <div
        key={k}
        className="hb-zx1-cell"
        data-k={i}
        data-on={i === active}
        style={{ width: dims.fw }}
      >
        <div className="hb-zx1-holes" />
        <div className="hb-zx1-pic" style={{ backgroundImage: imageUrl(list, i) }} />
        <div className="hb-zx1-holes" />
        <span className="hb-zx1-num">
          {pad(i + 1)} &#9656; {pad(i + 1)}A
        </span>
      </div>,
    );
  }

  const current = list[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Film strip gallery"
      tabIndex={0}
      className={className ? `hb-zx1 ${className}` : "hb-zx1"}
      style={{
        ...(height !== undefined ? { height } : { aspectRatio: "16 / 10" }),
        ["--hb-zx1-a" as string]: accent,
        ["--hb-zx1-hole" as string]: `${hole.toFixed(2)}px`,
        ...style,
      }}
      onKeyDown={handleKey}
      onPointerEnter={(e) => {
        st.current.hover = true;
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        st.current.hover = false;
        st.current.idleAt = clock() + 1200;
        onPointerLeave?.(e);
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) st.current.focus = true;
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) st.current.focus = false;
        onBlur?.(e);
      }}
      {...rest}
    >
      <style href="hb-gallery-filmstrip" precedence="default">
        {css}
      </style>
      <div className="hb-zx1-view">
        {list.map((item, i) => (
          <div
            key={i}
            className="hb-zx1-shot"
            data-on={i === active}
            style={{ backgroundImage: imageUrl(list, i) }}
            role="img"
            aria-label={item.title}
            aria-hidden={i !== active}
          />
        ))}
        <div className="hb-zx1-vignette" />
        <div className="hb-zx1-marks" />
        <div className="hb-zx1-meta">
          <div style={{ minWidth: 0 }}>
            <p className="hb-zx1-title">{current?.title}</p>
            {current?.caption ? <p className="hb-zx1-cap">{current.caption}</p> : null}
          </div>
          <span className="hb-zx1-count">
            {pad(active + 1)} / {pad(n)}
          </span>
        </div>
      </div>
      <div
        ref={stripRef}
        className="hb-zx1-strip"
        data-drag={dragging}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div ref={trackRef} className="hb-zx1-track">
          {cells}
        </div>
        <div className="hb-zx1-gate" style={{ width: dims.fw + 4 }} />
      </div>
    </div>
  );
}

export default GalleryFilmstrip;

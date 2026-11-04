"use client";

import * as React from "react";

export interface RailHangImage {
  src?: string;
  title: string;
  caption?: string;
}

export interface GalleryRailHangProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: RailHangImage[];
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (index: number | null) => void;
  breeze?: boolean;
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

const defaults: RailHangImage[] = scenes.map((s) => ({ title: s.title, caption: s.caption }));

function imageUrl(list: RailHangImage[], i: number) {
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


const css = `
.hb-zx2 {
  --hb-zx2-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  border: 1px solid #232323;
  border-radius: 14px;
  background: radial-gradient(120% 80% at 50% 0%, #1a1a1d 0%, #0d0d0e 60%, #0a0a0a 100%);
  color: #ededed;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
  cursor: grab;
}
.hb-zx2 *, .hb-zx2 *::before, .hb-zx2 *::after { box-sizing: border-box; }
.hb-zx2[data-drag="true"] { cursor: grabbing; }
.hb-zx2-rail {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(180deg, #d9dbe0 0%, #8b8f98 45%, #4b4e55 100%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.6);
  z-index: 2;
  pointer-events: none;
}
.hb-zx2-rail::before, .hb-zx2-rail::after {
  content: "";
  position: absolute;
  top: -9px;
  width: 6px;
  height: 14px;
  border-radius: 2px;
  background: linear-gradient(90deg, #5b5e66, #a3a7b0, #5b5e66);
}
.hb-zx2-rail::before { left: 6px; }
.hb-zx2-rail::after { right: 6px; }
.hb-zx2-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22%;
  background: linear-gradient(180deg, transparent, rgba(255,255,255,0.025));
  border-top: 1px solid rgba(255,255,255,0.04);
  pointer-events: none;
}
.hb-zx2-track {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  will-change: transform;
}
.hb-zx2-item {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transform-origin: 50% 0;
  will-change: transform;
  transition: opacity 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-zx2-item:focus-visible { outline: none; }
.hb-zx2-item:focus-visible .hb-zx2-print { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-zx2-a), 0 10px 22px rgba(0,0,0,0.55); }
.hb-zx2-item[data-out="true"] { opacity: 0.18; }
.hb-zx2-hanger { display: block; flex: none; overflow: visible; }
.hb-zx2-print {
  position: relative;
  width: 100%;
  margin-top: -2px;
  padding: 4px 4px 0;
  border-radius: 3px;
  background: #f1eee6;
  box-shadow: 0 10px 22px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.4);
  transition: transform 0.25s ease;
}
.hb-zx2-item:hover .hb-zx2-print { transform: translateY(2px); }
.hb-zx2-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 1px;
  background-size: cover;
  background-position: center;
}
.hb-zx2-tag {
  display: block;
  padding: 4px 1px 5px;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.1;
  color: #2a2a2a;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-zx2-pin {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 14px;
  height: 8px;
  transform: translateX(-50%);
  border-radius: 2px;
  background: linear-gradient(180deg, #c9ccd3, #7d818a);
}
.hb-zx2-stage {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  background: rgba(8,8,9,0.78);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  animation: hb-zx2-fade 0.3s ease both;
  cursor: default;
}
.hb-zx2-card {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 100%;
  max-width: 100%;
  animation: hb-zx2-pull 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-zx2-big {
  flex: none;
  height: 100%;
  aspect-ratio: 4 / 5.5;
  padding: 6px 6px 0;
  border-radius: 4px;
  background: #f1eee6;
  box-shadow: 0 24px 50px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
}
.hb-zx2-big .hb-zx2-img { flex: 1 1 0; min-height: 0; aspect-ratio: auto; }
.hb-zx2-big .hb-zx2-tag { font-size: 10px; padding: 5px 1px 6px; }
.hb-zx2-info { min-width: 0; max-width: 200px; }
.hb-zx2-kicker { margin: 0; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--hb-zx2-a); }
.hb-zx2-name { margin: 4px 0 0; font-size: 17px; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
.hb-zx2-cap { margin: 4px 0 0; font-size: 12px; line-height: 1.35; color: #a1a1a1; }
.hb-zx2-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  border: 1px solid #2c2c2c;
  border-radius: 999px;
  background: #151515;
  color: #ededed;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hb-zx2-close:hover { background: #1f1f1f; border-color: #3a3a3a; }
.hb-zx2-close:focus-visible { outline: 2px solid var(--hb-zx2-a); outline-offset: 2px; }
@keyframes hb-zx2-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-zx2-pull {
  from { opacity: 0; transform: translate(var(--hb-zx2-fx), -18%) scale(0.42) rotate(var(--hb-zx2-fr)); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zx2-stage, .hb-zx2-card { animation: none; }
  .hb-zx2-item, .hb-zx2-print, .hb-zx2-close { transition: none; }
}
`;

type Swing = { a: number; w: number; g: number };

export function GalleryRailHang({
  images,
  value,
  defaultValue = null,
  onChange,
  breeze = true,
  accent = "#2f7bff",
  height,
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: GalleryRailHangProps) {
  const list = images && images.length > 0 ? images : defaults;
  const n = list.length;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<number | null>(defaultValue);
  const raw = controlled ? value : inner;
  const sel = raw === null || raw === undefined ? null : mod(raw, n);
  const [origin, setOrigin] = React.useState({ x: 0, r: 0 });
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  const [dragging, setDragging] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const lastFocus = React.useRef<number | null>(null);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef);

  const itemW = box.h > 0 ? Math.max(60, Math.min(170, Math.round(box.h * 0.4))) : 74;
  const gap = Math.round(itemW * 0.22);
  const padX = 18;
  const railTop = 16;
  const contentW = padX * 2 + n * itemW + (n - 1) * gap;

  const st = React.useRef({
    off: 0,
    v: 0,
    vs: 0,
    as: 0,
    prevOff: 0,
    hover: false,
    focus: false,
    open: false,
    idleAt: 0,
    userOff: null as number | null,
    drag: null as null | { id: number; startX: number; lastX: number; lastT: number; moved: boolean; captured: boolean },
    px: null as null | { x: number; t: number; v: number },
    swing: [] as Swing[],
    minOff: 0,
    itemW: 74,
    gap: 16,
    padX: 18,
    suppress: false,
  });

  React.useEffect(() => {
    const s = st.current;
    s.minOff = Math.min(0, box.w - contentW);
    s.itemW = itemW;
    s.gap = gap;
    s.padX = padX;
    s.open = sel !== null;
    while (s.swing.length < n) s.swing.push({ a: 0, w: 0, g: -1 });
    s.swing.length = n;
  });

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let last = clock();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const s = st.current;
      const sec = t / 1000;
      const idle = !s.hover && !s.focus && !s.drag && !s.open && t > s.idleAt;
      if (!s.drag) {
        if (s.userOff !== null) {
          s.off += (s.userOff - s.off) * (1 - Math.exp(-dt * 7));
          if (Math.abs(s.userOff - s.off) < 0.3) s.userOff = null;
        } else if (Math.abs(s.v) > 4) {
          s.off += s.v * dt;
          s.v *= Math.exp(-dt * 4);
        } else if (idle && breeze && !reduced && s.minOff < 0) {
          const target = s.minOff / 2 + (s.minOff / 2) * Math.sin(sec * 0.22);
          s.off += (target - s.off) * (1 - Math.exp(-dt * 0.9));
        }
        if (s.off > 0) s.off += (0 - s.off) * (1 - Math.exp(-dt * 10));
        if (s.off < s.minOff) s.off += (s.minOff - s.off) * (1 - Math.exp(-dt * 10));
        if (s.v !== 0 && (s.off > 0 || s.off < s.minOff)) s.v *= 0.8;
      }
      const vel = dt > 0 ? (s.off - s.prevOff) / dt : 0;
      s.prevOff = s.off;
      const vs = s.vs + (vel - s.vs) * Math.min(1, dt * 14);
      const acc = dt > 0 ? (vs - s.vs) / dt : 0;
      s.vs = vs;
      s.as += (acc - s.as) * Math.min(1, dt * 10);
      const track = trackRef.current;
      if (track) track.style.transform = `translate3d(${s.off.toFixed(2)}px,0,0)`;
      for (let i = 0; i < s.swing.length; i += 1) {
        const sw = s.swing[i];
        if (reduced) {
          sw.a = 0;
          sw.w = 0;
        } else {
          if (idle && breeze) {
            const g = Math.floor((sec - i * 0.12) / 3.4);
            if (g !== sw.g) {
              if (sw.g !== -1) sw.w += 16 + (hash(i * 7 + g) % 14);
              sw.g = g;
            }
          }
          const accel = -30 * sw.a - 2.4 * sw.w - Math.max(-900, Math.min(900, s.as)) * 0.05;
          sw.w += accel * dt;
          sw.w = Math.max(-140, Math.min(140, sw.w));
          sw.a += sw.w * dt;
          sw.a = Math.max(-22, Math.min(22, sw.a));
        }
        const el = itemRefs.current[i];
        if (el) el.style.transform = `rotate(${sw.a.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, breeze]);

  React.useEffect(() => {
    if (sel === null) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [sel]);

  const setSel = (next: number | null) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  const open = (i: number) => {
    const s = st.current;
    if (s.suppress) {
      s.suppress = false;
      return;
    }
    const root = rootRef.current;
    const el = itemRefs.current[i];
    if (root && el) {
      const rr = root.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setOrigin({ x: er.left + er.width / 2 - (rr.left + rr.width / 2), r: s.swing[i]?.a ?? 0 });
    }
    lastFocus.current = i;
    s.idleAt = clock() + 2500;
    setSel(i);
  };

  const close = () => {
    setSel(null);
    st.current.idleAt = clock() + 2500;
    const i = lastFocus.current;
    if (i !== null) itemRefs.current[i]?.focus({ preventScroll: true });
  };

  const center = (i: number) => padX + i * (itemW + gap) + itemW / 2;

  const reveal = (i: number) => {
    const s = st.current;
    const target = Math.max(s.minOff, Math.min(0, box.w / 2 - center(i)));
    s.userOff = target;
    s.v = 0;
    s.idleAt = clock() + 3000;
    const sw = s.swing[i];
    if (sw && !reduced) sw.w += 30;
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || st.current.open) return;
    const s = st.current;
    s.drag = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: clock(), moved: false, captured: false };
    s.userOff = null;
    s.v = 0;
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    const now = clock();
    const d = s.drag;
    if (d && d.id === e.pointerId) {
      const dx = e.clientX - d.lastX;
      const dt = Math.max(0.008, (now - d.lastT) / 1000);
      if (!d.moved && Math.abs(e.clientX - d.startX) > 5) {
        d.moved = true;
        d.captured = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
      }
      if (d.moved) {
        const over = s.off > 0 || s.off < s.minOff;
        s.off += over ? dx * 0.4 : dx;
        s.v = s.v * 0.5 + (dx / dt) * 0.5;
      }
      d.lastX = e.clientX;
      d.lastT = now;
      return;
    }
    if (reduced || s.open) return;
    const root = rootRef.current;
    if (!root) return;
    const rr = root.getBoundingClientRect();
    const x = e.clientX - rr.left;
    const y = e.clientY - rr.top;
    const p = s.px;
    if (p) {
      const dt = Math.max(0.008, (now - p.t) / 1000);
      const v = p.v * 0.5 + ((x - p.x) / dt) * 0.5;
      s.px = { x, t: now, v };
      if (y > railTop) {
        const lx = x - s.off;
        for (let i = 0; i < s.swing.length; i += 1) {
          const c = s.padX + i * (s.itemW + s.gap) + s.itemW / 2;
          if (Math.abs(lx - c) < s.itemW * 0.55) {
            s.swing[i].w += Math.max(-26, Math.min(26, v * 0.016));
          }
        }
      }
    } else {
      s.px = { x, t: now, v: 0 };
    }
  };

  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    s.drag = null;
    s.idleAt = clock() + 2500;
    if (d.moved) {
      s.suppress = true;
      window.setTimeout(() => {
        s.suppress = false;
      }, 0);
      setDragging(false);
    }
  };

  const itemKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = Math.min(n - 1, i + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, i - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    itemRefs.current[next]?.focus({ preventScroll: true });
  };

  const hangerW = Math.round(itemW * 0.8);
  const hangerH = Math.round(itemW * 0.36);
  const current = sel !== null ? list[sel] : null;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Hanging gallery"
      className={className ? `hb-zx2 ${className}` : "hb-zx2"}
      data-drag={dragging}
      style={{
        ...(height !== undefined ? { height } : { aspectRatio: "16 / 9" }),
        ["--hb-zx2-a" as string]: accent,
        ...style,
      }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerEnter={(e) => {
        st.current.hover = true;
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        st.current.hover = false;
        st.current.px = null;
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
      onKeyDown={(e) => {
        if (e.key === "Escape" && sel !== null) {
          e.preventDefault();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-gallery-rail-hang" precedence="default">
        {css}
      </style>
      <div className="hb-zx2-floor" />
      <div className="hb-zx2-rail" style={{ top: railTop - 2 }} />
      <div ref={trackRef} className="hb-zx2-track">
        {list.map((item, i) => (
          <button
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            className="hb-zx2-item"
            data-out={sel === i}
            aria-label={item.caption ? `${item.title}, ${item.caption}` : item.title}
            tabIndex={sel === null ? 0 : -1}
            style={{ left: padX + i * (itemW + gap), top: railTop - 6, width: itemW }}
            onClick={() => open(i)}
            onFocus={(e) => {
              if (e.currentTarget.matches(":focus-visible")) reveal(i);
            }}
            onKeyDown={(e) => itemKey(e, i)}
          >
            <svg
              className="hb-zx2-hanger"
              width={hangerW}
              height={hangerH}
              viewBox="0 0 80 36"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M40 22 V12 C40 9 43 8 45 8 C49 8 50 4 47.5 2 C45 0 40.5 1 40.5 4.5"
                fill="none"
                stroke="#b9bcc4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M40 18 L5 33 Q3 34.5 6 35 L74 35 Q77 34.5 75 33 Z" fill="none" stroke="#9a9ea7" strokeWidth="2.4" strokeLinejoin="round" />
            </svg>
            <span className="hb-zx2-print">
              <span className="hb-zx2-pin" />
              <span className="hb-zx2-img" style={{ backgroundImage: imageUrl(list, i) }} />
              <span className="hb-zx2-tag">{item.title}</span>
            </span>
          </button>
        ))}
      </div>
      {current !== null && sel !== null ? (
        <div
          className="hb-zx2-stage"
          role="dialog"
          aria-modal="false"
          aria-label={current.title}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="hb-zx2-card"
            style={{
              ["--hb-zx2-fx" as string]: `${origin.x.toFixed(1)}px`,
              ["--hb-zx2-fr" as string]: `${origin.r.toFixed(1)}deg`,
            }}
          >
            <div className="hb-zx2-big">
              <span className="hb-zx2-img" style={{ backgroundImage: imageUrl(list, sel) }} />
              <span className="hb-zx2-tag">{current.title}</span>
            </div>
            <div className="hb-zx2-info">
              <p className="hb-zx2-kicker">
                {sel + 1} of {n}
              </p>
              <p className="hb-zx2-name">{current.title}</p>
              {current.caption ? <p className="hb-zx2-cap">{current.caption}</p> : null}
            </div>
          </div>
          <button ref={closeRef} type="button" className="hb-zx2-close" aria-label="Put back" onClick={close}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default GalleryRailHang;

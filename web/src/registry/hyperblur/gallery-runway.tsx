"use client";

import * as React from "react";

export interface RunwayImage {
  src?: string;
  title: string;
  caption?: string;
}

export interface GalleryRunwayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: RunwayImage[];
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (index: number) => void;
  speed?: number;
  playing?: boolean;
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

const defaults: RunwayImage[] = scenes.map((s) => ({ title: s.title, caption: s.caption }));

function imageUrl(list: RunwayImage[], i: number) {
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
.hb-zx5 {
  --hb-zx5-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: size;
  border: 1px solid #222222;
  border-radius: 14px;
  background: linear-gradient(180deg, #08090c 0%, #0b0c10 34%, #060606 100%);
  color: #ededed;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
  outline: none;
}
.hb-zx5 *, .hb-zx5 *::before, .hb-zx5 *::after { box-sizing: border-box; }
.hb-zx5:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-zx5-a); }
.hb-zx5-horizon {
  position: absolute;
  left: 50%;
  top: 34%;
  width: 120cqh;
  height: 26cqh;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--hb-zx5-a);
  opacity: 0.22;
  filter: blur(26px);
  pointer-events: none;
}
.hb-zx5-stage {
  position: absolute;
  inset: 0;
  perspective: 330cqh;
  perspective-origin: 50% 34%;
  transform-style: preserve-3d;
}
.hb-zx5-floor {
  position: absolute;
  left: 50%;
  bottom: 22%;
  width: 150cqh;
  height: 1100cqh;
  transform-origin: 50% 100%;
  transform: translateX(-50%) translateZ(110cqh) rotateX(90deg);
  background-image:
    radial-gradient(circle, #ffffff 0 16%, color-mix(in srgb, var(--hb-zx5-a) 70%, transparent) 26%, transparent 46%),
    radial-gradient(circle, #ffffff 0 16%, color-mix(in srgb, var(--hb-zx5-a) 70%, transparent) 26%, transparent 46%),
    linear-gradient(90deg, transparent 49.4%, rgba(255,255,255,0.16) 49.4% 50.6%, transparent 50.6%),
    linear-gradient(90deg, transparent 4%, color-mix(in srgb, var(--hb-zx5-a) 55%, transparent) 4% 4.8%, transparent 4.8% 95.2%, color-mix(in srgb, var(--hb-zx5-a) 55%, transparent) 95.2% 96%, transparent 96%),
    linear-gradient(180deg, #0c0d12 0%, #141519 100%);
  background-size: 9cqh 70cqh, 9cqh 70cqh, 100% 40cqh, 100% 100%, 100% 100%;
  background-repeat: repeat-y, repeat-y, repeat-y, no-repeat, no-repeat;
  background-position: 1.5% 0, 98.5% 0, 0 0, 0 0, 0 0;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 45%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 45%);
  pointer-events: none;
}
.hb-zx5-frame {
  position: absolute;
  left: 50%;
  bottom: 22%;
  width: 36cqh;
  aspect-ratio: 4 / 5;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background-color: #111;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 14px 28px rgba(0,0,0,0.6);
  transition: box-shadow 0.3s ease;
}
.hb-zx5-frame::after {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -7%;
  height: 10%;
  border-radius: 50%;
  background: rgba(0,0,0,0.75);
  filter: blur(5px);
  z-index: -1;
}
.hb-zx5-frame[data-hot="true"] { box-shadow: 0 0 0 1.5px #ffffff, 0 0 28px -4px var(--hb-zx5-a), 0 14px 28px rgba(0,0,0,0.6); }
.hb-zx5-frame[data-sel="true"] { box-shadow: 0 0 0 2px var(--hb-zx5-a), 0 0 30px -2px var(--hb-zx5-a), 0 14px 28px rgba(0,0,0,0.6); }
.hb-zx5-plate {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18% 7% 6%;
  border-radius: 0 0 5px 5px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.72));
  font-size: 3.6cqh;
  font-weight: 600;
  line-height: 1.15;
  text-align: left;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}
.hb-zx5-hud {
  position: absolute;
  left: 10px;
  top: 9px;
  right: 10px;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  pointer-events: none;
}
.hb-zx5-now { min-width: 0; }
.hb-zx5-kick { margin: 0; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hb-zx5-a); }
.hb-zx5-title { margin: 2px 0 0; font-size: 13px; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: hb-zx5-in 0.4s ease both; }
.hb-zx5-cap { margin: 1px 0 0; font-size: 10.5px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-zx5-state {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 8px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  background: rgba(10,10,10,0.6);
  font-size: 10px;
  color: #a1a1a1;
  font-variant-numeric: tabular-nums;
}
.hb-zx5-dot { width: 6px; height: 6px; border-radius: 999px; background: #3ddc84; box-shadow: 0 0 8px #3ddc84; }
.hb-zx5-dot[data-paused="true"] { background: #f5b04a; box-shadow: 0 0 8px #f5b04a; }
@keyframes hb-zx5-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-zx5-frame { transition: none; }
  .hb-zx5-title { animation: none; }
}
`;

function smooth(a: number, b: number, v: number) {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function slotPose(p: number, j: number) {
  const side = j % 2 === 0 ? -1 : 1;
  const x = side * (24 + Math.max(0, p - 0.5) * 80);
  const z = -880 + p * 990;
  const o = smooth(0, 0.14, p) * (1 - smooth(0.86, 1, p));
  const b = 0.32 + 0.68 * smooth(0, 0.8, p);
  return { x, z, o, b };
}

export function GalleryRunway({
  images,
  value,
  defaultValue = null,
  onChange,
  speed = 0.055,
  playing = true,
  accent = "#2f7bff",
  height,
  className,
  style,
  onKeyDown,
  onFocus,
  onBlur,
  ...rest
}: GalleryRunwayProps) {
  const list = images && images.length > 0 ? images : defaults;
  const n = list.length;
  const slots = n >= 6 ? n : n * Math.ceil(6 / n);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<number | null>(defaultValue);
  const raw = controlled ? value : inner;
  const sel = raw === null || raw === undefined ? null : mod(raw, n);
  const [hot, setHot] = React.useState<number | null>(null);
  const [front, setFront] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const floorRef = React.useRef<HTMLDivElement>(null);
  const frameRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef);
  const st = React.useRef({ flow: 0.04, rate: 1, nudge: 0, hold: false, manual: false, front: -1, slots });

  React.useEffect(() => {
    const s = st.current;
    s.slots = slots;
    s.hold = hot !== null;
    s.manual = paused || !playing;
  });

  React.useEffect(() => {
    const apply = () => {
      const s = st.current;
      let best = -1;
      let bestP = -1;
      for (let j = 0; j < s.slots; j += 1) {
        const el = frameRefs.current[j];
        const p = mod(s.flow + j / s.slots, 1);
        const pose = slotPose(p, j);
        if (p < 0.9 && p > bestP) {
          bestP = p;
          best = j;
        }
        if (!el) continue;
        el.style.transform = `translate3d(calc(-50% + ${pose.x.toFixed(2)}cqh), 0, ${pose.z.toFixed(2)}cqh)`;
        el.style.opacity = pose.o.toFixed(3);
        el.style.filter = `brightness(${pose.b.toFixed(3)})`;
        el.style.zIndex = String(Math.round(p * 1000));
        el.style.pointerEvents = pose.o < 0.3 ? "none" : "auto";
      }
      const floor = floorRef.current;
      if (floor) {
        const y = mod(s.flow * 990, 280).toFixed(2);
        floor.style.backgroundPosition = `1.5% ${y}cqh, 98.5% ${y}cqh, 0 ${y}cqh, 0 0, 0 0`;
      }
      if (best !== s.front) {
        s.front = best;
        setFront(best);
      }
    };
    apply();
    if (!visible) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const s = st.current;
      const want = s.hold || s.manual || reduced ? 0 : 1;
      s.rate += (want - s.rate) * (1 - Math.exp(-dt * 5));
      if (Math.abs(want - s.rate) < 0.001) s.rate = want;
      s.flow += speed * s.rate * dt;
      if (s.nudge !== 0) {
        const k = reduced ? s.nudge : s.nudge * (1 - Math.exp(-dt * 7));
        s.flow += k;
        s.nudge -= k;
        if (Math.abs(s.nudge) < 0.0005) {
          s.flow += s.nudge;
          s.nudge = 0;
        }
      }
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, speed, slots]);

  const select = (i: number) => {
    if (!controlled) setInner(i);
    onChange?.(i);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const s = st.current;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") s.nudge += 1 / s.slots;
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft") s.nudge -= 1 / s.slots;
    else if (e.key === " ") setPaused((p) => !p);
    else if (e.key === "Enter") {
      if (front >= 0) select(front % n);
    } else return;
    e.preventDefault();
  };

  const shown = hot ?? (front >= 0 ? front % n : 0);
  const item = list[shown];
  const isPaused = paused || !playing || hot !== null || reduced;

  const frames = Array.from({ length: slots }, (_, j) => {
    const i = j % n;
    return (
      <button
        key={j}
        ref={(el) => {
          frameRefs.current[j] = el;
        }}
        type="button"
        tabIndex={-1}
        className="hb-zx5-frame"
        data-hot={hot === i}
        data-sel={sel === i}
        aria-label={list[i].title}
        style={{ backgroundImage: imageUrl(list, i), opacity: 0 }}
        onPointerEnter={() => setHot(i)}
        onPointerLeave={() => setHot((h) => (h === i ? null : h))}
        onClick={() => select(i)}
      >
        <span className="hb-zx5-plate">{list[i].title}</span>
      </button>
    );
  });

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Runway gallery. Arrow keys move the flow, Space pauses, Enter selects the front frame."
      tabIndex={0}
      className={className ? `hb-zx5 ${className}` : "hb-zx5"}
      style={{
        ...(height !== undefined ? { height } : { aspectRatio: "16 / 10" }),
        ["--hb-zx5-a" as string]: accent,
        ...style,
      }}
      onKeyDown={handleKey}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      <style href="hb-gallery-runway" precedence="default">
        {css}
      </style>
      <div className="hb-zx5-horizon" />
      <div className="hb-zx5-stage">
        <div ref={floorRef} className="hb-zx5-floor" />
        {frames}
      </div>
      <div className="hb-zx5-hud">
        <div className="hb-zx5-now">
          <p className="hb-zx5-kick">{hot !== null ? "Paused on" : sel === shown ? "Selected" : "Now passing"}</p>
          <p className="hb-zx5-title" key={shown}>
            {item?.title}
          </p>
          {item?.caption ? <p className="hb-zx5-cap">{item.caption}</p> : null}
        </div>
        <span className="hb-zx5-state">
          <span className="hb-zx5-dot" data-paused={isPaused} />
          {shown + 1}/{n}
        </span>
      </div>
    </div>
  );
}

export default GalleryRunway;

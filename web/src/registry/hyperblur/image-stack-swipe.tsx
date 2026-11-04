"use client";

import * as React from "react";

const SCENE_COUNT = 4;

type SceneLayer = "all" | "back" | "mid" | "front";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 3266489917) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

const sceneCache = new Map<string, string>();

function sceneSvg(k: number, layer: SceneLayer) {
  const on = (name: string) => layer === "all" || layer === name;
  let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200">';
  if (k === 0) {
    if (on("back")) {
      s +=
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb36b"/><stop offset="0.5" stop-color="#ff6f91"/><stop offset="1" stop-color="#4b3b8f"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/><circle cx="220" cy="96" r="46" fill="#ffe3a8" opacity="0.22"/><circle cx="220" cy="96" r="26" fill="#ffe9bd"/>';
    }
    if (on("mid")) {
      s +=
        '<polygon points="0,140 50,92 90,122 140,70 200,128 250,96 320,138 320,200 0,200" fill="#6a4a98"/><polygon points="0,158 70,118 130,148 190,110 260,150 320,128 320,200 0,200" fill="#3d2c70"/>';
    }
    if (on("front")) {
      s += '<path d="M0 178 Q80 150 160 172 T320 166 L320 200 L0 200Z" fill="#1b1640"/>';
      for (let i = 0; i < 9; i += 1) {
        const x = 12 + i * 36 + (hash(i + 3) % 14);
        const h = 26 + (hash(i + 9) % 18);
        s += `<polygon points="${x},${200 - h - 6} ${x - 8},${206 - 6} ${x + 8},${206 - 6}" fill="#120e30"/><rect x="${x - 1}" y="${200 - 8}" width="2" height="8" fill="#120e30"/>`;
      }
    }
  } else if (k === 1) {
    if (on("back")) {
      s +=
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14183f"/><stop offset="0.55" stop-color="#6a3d8f"/><stop offset="1" stop-color="#ff8a7a"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/><circle cx="252" cy="46" r="16" fill="#fff1d6"/><circle cx="259" cy="41" r="14" fill="#3a2f78" opacity="0.4"/>';
      for (let i = 0; i < 22; i += 1) {
        const h = hash(i + 11);
        s += `<circle cx="${h % 320}" cy="${hash(i + 71) % 80}" r="${(0.5 + (h % 5) / 6).toFixed(2)}" fill="#fff" opacity="0.${5 + (h % 4)}"/>`;
      }
    }
    if (on("mid")) {
      const fx = [0, 28, 64, 98, 132, 170, 208, 246, 284];
      const fw = [32, 40, 38, 40, 42, 42, 42, 42, 40];
      const fh = [96, 120, 88, 130, 104, 126, 92, 118, 100];
      fx.forEach((x, i) => {
        s += `<rect x="${x}" y="${200 - fh[i]}" width="${fw[i]}" height="${fh[i]}" fill="#3b3182" opacity="0.92"/>`;
      });
    }
    if (on("front")) {
      const nx = [-6, 40, 86, 136, 190, 236, 282];
      const nw = [50, 50, 54, 60, 52, 52, 50];
      const nh = [74, 100, 64, 92, 110, 70, 90];
      nx.forEach((x, b) => {
        s += `<rect x="${x}" y="${200 - nh[b]}" width="${nw[b]}" height="${nh[b]}" fill="#16132f"/>`;
        const cols = Math.floor((nw[b] - 10) / 11);
        const rows = Math.floor((nh[b] - 10) / 13);
        for (let r = 0; r < rows; r += 1) {
          for (let c = 0; c < cols; c += 1) {
            const h = hash(b * 100 + r * 10 + c);
            if (h % 3 !== 0) {
              s += `<rect x="${x + 6 + c * 11}" y="${200 - nh[b] + 8 + r * 13}" width="5" height="7" fill="${h % 4 === 0 ? "#ff9f80" : "#ffd37a"}"/>`;
            }
          }
        }
      });
    }
  } else if (k === 2) {
    if (on("back")) {
      s +=
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1f5c"/><stop offset="0.55" stop-color="#1c7ed6"/><stop offset="1" stop-color="#5ee0c8"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/><circle cx="72" cy="52" r="20" fill="#fff" opacity="0.25"/>';
    }
    if (on("mid")) {
      s +=
        '<path d="M0 110 C60 80 120 140 180 108 S280 90 320 112 V200 H0Z" fill="#fff" opacity="0.16"/><path d="M0 130 C70 100 130 160 200 128 S290 112 320 134 V200 H0Z" fill="#7ee8d3" opacity="0.32"/>';
    }
    if (on("front")) {
      s +=
        '<path d="M0 156 C80 130 140 184 210 154 S290 142 320 160 V200 H0Z" fill="#0a2f6a" opacity="0.88"/><path d="M0 178 C90 160 160 196 240 176 S300 170 320 182 V200 H0Z" fill="#061a42"/>';
    }
  } else {
    if (on("back")) {
      s +=
        '<defs><radialGradient id="g" cx="0.5" cy="0.38" r="0.8"><stop offset="0" stop-color="#ffd9b0"/><stop offset="0.55" stop-color="#ea6f8f"/><stop offset="1" stop-color="#43235f"/></radialGradient></defs><rect width="320" height="200" fill="url(#g)"/>';
    }
    if (on("mid")) {
      s +=
        '<circle cx="160" cy="100" r="72" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.24"/><path d="M70 120 C60 70 120 40 170 52 C230 64 262 110 236 150 C210 190 100 180 70 120Z" fill="#fff" opacity="0.13"/>';
    }
    if (on("front")) {
      s +=
        '<path d="M70 200 C74 160 112 148 160 148 C208 148 246 160 250 200Z" fill="#2a1a48"/><rect x="146" y="124" width="28" height="32" fill="#d9987a"/><ellipse cx="160" cy="98" rx="30" ry="35" fill="#f0b698"/><path d="M128 96 C124 62 150 50 172 56 C196 62 198 84 192 98 C186 78 170 72 150 74 C140 76 132 84 128 96Z" fill="#2b1230"/><circle cx="160" cy="160" r="4" fill="#ffd37a"/>';
    }
  }
  return `${s}</svg>`;
}

function sceneUri(index: number, layer: SceneLayer = "all") {
  const k = mod(index, SCENE_COUNT);
  const key = `${k}:${layer}`;
  let uri = sceneCache.get(key);
  if (!uri) {
    uri = `data:image/svg+xml,${encodeURIComponent(sceneSvg(k, layer))}`;
    sceneCache.set(key, uri);
  }
  return uri;
}

function cssUrl(list: string[] | null, index: number, layer: SceneLayer = "all") {
  if (list) return `url(${JSON.stringify(list[mod(index, list.length)])})`;
  return `url("${sceneUri(index, layer)}")`;
}

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

function rootBox(
  width: number | string | undefined,
  height: number | string | undefined,
  aspect: string,
  style: React.CSSProperties | undefined,
): React.CSSProperties {
  return {
    width: width ?? "100%",
    ...(height !== undefined ? { height } : { aspectRatio: aspect }),
    ...style,
  };
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

function usePause() {
  const [paused, setPaused] = React.useState(false);
  const handlers = {
    onPointerEnter: () => setPaused(true),
    onPointerLeave: () => setPaused(false),
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (e.target.matches(":focus-visible")) setPaused(true);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
    },
  };
  return [paused, handlers] as const;
}

function useAutoAdvance(
  enabled: boolean,
  interval: number,
  step: () => void,
  ref: React.RefObject<HTMLElement | null>,
  paused: boolean,
  resetKey: number,
) {
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const stepRef = React.useRef(step);
  React.useEffect(() => {
    stepRef.current = step;
  });
  React.useEffect(() => {
    if (!enabled || reduced || !visible || paused) return;
    const id = window.setInterval(() => stepRef.current(), interval);
    return () => window.clearInterval(id);
  }, [enabled, reduced, visible, paused, interval, resetKey]);
}

function useSlideIndex(
  count: number,
  value: number | undefined,
  initial: number,
  onChange?: (index: number) => void,
) {
  const [inner, setInner] = React.useState(initial);
  const controlled = value !== undefined;
  const current = mod(controlled ? value : inner, count);
  const set = (next: number) => {
    const n = mod(next, count);
    if (n === current) return;
    if (!controlled) setInner(n);
    onChange?.(n);
  };
  return [current, set] as const;
}

export interface ImageStackSwipeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspect?: string;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  onSwipe?: (direction: "left" | "right", index: number) => void;
  visible?: number;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
}

const css = `
.hb-qe9 {
  --hb-qe9-a: #2f7bff;
  position: relative;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 14px;
  background: #0a0a0a;
  isolation: isolate;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-qe9 *, .hb-qe9 *::before, .hb-qe9 *::after { box-sizing: border-box; }
.hb-qe9:focus-visible { outline: 2px solid var(--hb-qe9-a); outline-offset: 2px; }
.hb-qe9-layer { position: absolute; inset: 0; }
.hb-qe9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.hb-qe9 {
  overflow: visible;
  background: transparent;
  border-radius: 0;
  touch-action: pan-y;
}
.hb-qe9-stage { position: absolute; inset: 0 0 18px 0; }
.hb-qe9-card {
  position: absolute;
  inset: 0;
  background-color: #151515;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 18px 32px -16px rgba(0, 0, 0, 0.7);
  transform: translateY(calc(var(--hb-qe9-k) * 9px)) scale(calc(1 - var(--hb-qe9-k) * 0.055));
  transform-origin: 50% 100%;
  filter: brightness(calc(1 - var(--hb-qe9-k) * 0.2));
  transition: transform 0.45s cubic-bezier(0.3, 0.8, 0.2, 1), filter 0.45s ease, opacity 0.45s ease;
  will-change: transform;
}
.hb-qe9-card[data-top="true"] { cursor: grab; touch-action: pan-y; transform-origin: 50% 90%; }
.hb-qe9-card[data-top="true"][data-drag="true"] { cursor: grabbing; transition: none; }
.hb-qe9-card[data-exit="true"] {
  transition: transform 0.38s cubic-bezier(0.5, 0, 0.8, 0.4), opacity 0.38s ease;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qe9-card { transition: none; }
}
`;

export function ImageStackSwipe({
  images,
  alt = "Photo",
  width,
  height,
  aspect = "4 / 3",
  index: indexProp,
  defaultIndex = 0,
  onChange,
  onSwipe,
  visible = 3,
  autoPlay = true,
  interval = 2600,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  ...rest
}: ImageStackSwipeProps) {
  const list = images && images.length > 0 ? images : null;
  const count = list ? list.length : SCENE_COUNT;
  const shown = Math.max(1, Math.min(Math.round(visible), count));
  const [index, setIndex] = useSlideIndex(count, indexProp, defaultIndex, onChange);
  const [drag, setDrag] = React.useState({ dx: 0, dy: 0, active: false });
  const [exit, setExit] = React.useState<0 | 1 | -1>(0);
  const [paused, pause] = usePause();
  const ref = React.useRef<HTMLDivElement>(null);
  const start = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const reduced = useReducedMotion();
  const label = (i: number) => `${alt} ${i + 1} of ${count}`;

  const fling = (dir: 1 | -1) => {
    if (exit !== 0 || count < 2) return;
    onSwipe?.(dir === 1 ? "right" : "left", index);
    if (reduced) {
      setDrag({ dx: 0, dy: 0, active: false });
      setIndex(index + 1);
      return;
    }
    setExit(dir);
  };

  const finish = () => {
    setExit(0);
    setDrag({ dx: 0, dy: 0, active: false });
    setIndex(index + 1);
  };

  useAutoAdvance(
    autoPlay && count > 1,
    interval,
    () => fling(index % 2 === 0 ? 1 : -1),
    ref,
    paused || drag.active || exit !== 0,
    index,
  );

  const topStyle: React.CSSProperties =
    exit !== 0
      ? {
          transform: `translate(${exit * 140}%, ${(drag.dy * 0.4).toFixed(1)}px) rotate(${exit * 22}deg)`,
          opacity: 0,
        }
      : drag.dx !== 0 || drag.dy !== 0
        ? {
            transform: `translate(${drag.dx.toFixed(1)}px, ${drag.dy.toFixed(1)}px) rotate(${(drag.dx * 0.07).toFixed(2)}deg)`,
          }
        : {};

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} stack`}
      {...rest}
      {...pause}
      ref={ref}
      className={cx("hb-qe9", className)}
      style={{ ...rootBox(width, height, aspect, style), "--hb-qe9-a": accent } as React.CSSProperties}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          fling(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          fling(1);
        }
      }}
    >
      <style href="hb-image-stack-swipe" precedence="default">
        {css}
      </style>
      <div className="hb-qe9-stage">
        {Array.from({ length: shown }, (_, k) => shown - 1 - k).map((k) => {
          const ci = mod(index + k, count);
          const top = k === 0;
          return (
            <div
              key={ci}
              className="hb-qe9-card"
              role="img"
              aria-label={label(ci)}
              aria-hidden={top ? undefined : true}
              data-top={top ? "true" : "false"}
              data-drag={top && drag.active ? "true" : "false"}
              data-exit={top && exit !== 0 ? "true" : "false"}
              style={
                {
                  backgroundImage: cssUrl(list, ci),
                  "--hb-qe9-k": k,
                  zIndex: shown - k,
                  ...(top ? topStyle : {}),
                } as React.CSSProperties
              }
              onPointerDown={
                top
                  ? (e) => {
                      if (exit !== 0 || count < 2) return;
                      e.currentTarget.setPointerCapture(e.pointerId);
                      start.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
                      setDrag({ dx: 0, dy: 0, active: true });
                    }
                  : undefined
              }
              onPointerMove={
                top
                  ? (e) => {
                      const s = start.current;
                      if (!s) return;
                      setDrag({ dx: e.clientX - s.x, dy: (e.clientY - s.y) * 0.5, active: true });
                    }
                  : undefined
              }
              onPointerUp={
                top
                  ? (e) => {
                      const s = start.current;
                      start.current = null;
                      if (!s) return;
                      const dx = e.clientX - s.x;
                      const elapsed = Math.max(1, e.timeStamp - s.t);
                      const far = Math.abs(dx) > e.currentTarget.offsetWidth * 0.28;
                      const quick = Math.abs(dx) > 28 && Math.abs(dx) / elapsed > 0.6;
                      if (far || quick) {
                        setDrag((d) => ({ ...d, active: false }));
                        fling(dx > 0 ? 1 : -1);
                      } else {
                        setDrag({ dx: 0, dy: 0, active: false });
                      }
                    }
                  : undefined
              }
              onPointerCancel={
                top
                  ? () => {
                      start.current = null;
                      setDrag({ dx: 0, dy: 0, active: false });
                    }
                  : undefined
              }
              onTransitionEnd={
                top
                  ? (e) => {
                      if (exit !== 0 && e.propertyName === "transform") finish();
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      <span className="hb-qe9-sr" aria-live="polite">
        {label(index)}
      </span>
    </div>
  );
}

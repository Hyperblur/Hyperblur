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

function arrowNav(e: React.KeyboardEvent, prev: () => void, next: () => void) {
  if (e.defaultPrevented) return;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  }
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

function Controls({
  count,
  index,
  onGo,
  label,
  arrows = true,
}: {
  count: number;
  index: number;
  onGo: (index: number) => void;
  label: string;
  arrows?: boolean;
}) {
  if (count < 2) return null;
  return (
    <>
      {arrows ? (
        <>
          <button
            type="button"
            className="hb-qe6-nav hb-qe6-prev"
            aria-label={`Previous ${label}`}
            onClick={() => onGo(index - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hb-qe6-nav hb-qe6-next"
            aria-label={`Next ${label}`}
            onClick={() => onGo(index + 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
      <div className="hb-qe6-dots">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className="hb-qe6-dot"
            aria-label={`Show ${label} ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => onGo(i)}
          />
        ))}
      </div>
    </>
  );
}

export interface ImageParallaxTiltProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspect?: string;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  maxTilt?: number;
  depth?: number;
  perspective?: number;
  glare?: boolean;
  accent?: string;
}

const css = `
.hb-qe6 {
  --hb-qe6-a: #2f7bff;
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
.hb-qe6 *, .hb-qe6 *::before, .hb-qe6 *::after { box-sizing: border-box; }
.hb-qe6:focus-visible { outline: 2px solid var(--hb-qe6-a); outline-offset: 2px; }
.hb-qe6-layer { position: absolute; inset: 0; }
.hb-qe6-sr {
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
.hb-qe6 {
  --hb-qe6-x: 0;
  --hb-qe6-y: 0;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  touch-action: pan-y;
  cursor: default;
}
.hb-qe6-card {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #0a0a0a;
  border-radius: 14px;
  box-shadow: 0 26px 44px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: perspective(var(--hb-qe6-p)) rotateX(calc(var(--hb-qe6-y) * var(--hb-qe6-t) * -1deg)) rotateY(calc(var(--hb-qe6-x) * var(--hb-qe6-t) * 1deg));
  will-change: transform;
}
.hb-qe6-l {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  will-change: transform;
}
.hb-qe6-back { transform: translate3d(calc(var(--hb-qe6-x) * var(--hb-qe6-s) * -0.5px), calc(var(--hb-qe6-y) * var(--hb-qe6-s) * -0.5px), 0) scale(1.2); }
.hb-qe6-mid { transform: translate3d(calc(var(--hb-qe6-x) * var(--hb-qe6-s) * 0.3px), calc(var(--hb-qe6-y) * var(--hb-qe6-s) * 0.3px), 0) scale(1.2); }
.hb-qe6-front { transform: translate3d(calc(var(--hb-qe6-x) * var(--hb-qe6-s) * 1px), calc(var(--hb-qe6-y) * var(--hb-qe6-s) * 1px), 0) scale(1.26); }
.hb-qe6-glare {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(circle at calc(50% + var(--hb-qe6-x) * 38%) calc(50% + var(--hb-qe6-y) * 38%), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 55%);
  mix-blend-mode: overlay;
}
.hb-qe6-nav {
  position: absolute;
  top: 50%;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: -15px 0 0;
  padding: 0;
  color: #fff;
  background: rgba(10, 10, 10, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  cursor: pointer;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, transform 0.2s ease;
}
.hb-qe6-nav:hover { background: rgba(10, 10, 10, 0.7); transform: scale(1.06); }
.hb-qe6-nav:active { transform: scale(0.95); }
.hb-qe6-nav:focus-visible { outline: 2px solid var(--hb-qe6-a); outline-offset: 2px; }
.hb-qe6-prev { left: 10px; }
.hb-qe6-next { right: 10px; }
.hb-qe6-dots {
  position: absolute;
  left: 50%;
  bottom: 10px;
  z-index: 4;
  display: flex;
  gap: 6px;
  padding: 5px 8px;
  background: rgba(10, 10, 10, 0.35);
  border-radius: 999px;
  transform: translateX(-50%);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-qe6-dot {
  position: relative;
  width: 6px;
  height: 6px;
  margin: 0;
  padding: 0;
  background: rgba(255, 255, 255, 0.5);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: width 0.3s cubic-bezier(0.3, 0.8, 0.2, 1), background 0.2s ease;
}
.hb-qe6-dot::before { content: ""; position: absolute; inset: -6px -3px; }
.hb-qe6-dot[aria-current="true"] { width: 16px; background: #fff; }
.hb-qe6-dot:focus-visible { outline: 2px solid var(--hb-qe6-a); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qe6-card, .hb-qe6-l { transform: none; }
  .hb-qe6-nav, .hb-qe6-dot { transition: none; }
}
`;

function clamp(n: number) {
  return Math.max(-1, Math.min(1, n));
}

export function ImageParallaxTilt({
  images,
  alt = "Photo",
  width,
  height,
  aspect = "16 / 10",
  index: indexProp,
  defaultIndex = 0,
  onChange,
  maxTilt = 10,
  depth = 14,
  perspective = 900,
  glare = true,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  onPointerMove,
  onPointerLeave,
  ...rest
}: ImageParallaxTiltProps) {
  const list = images && images.length > 0 ? images : null;
  const count = list ? list.length : SCENE_COUNT;
  const [index, setIndex] = useSlideIndex(count, indexProp, defaultIndex, onChange);
  const ref = React.useRef<HTMLDivElement>(null);
  const pointer = React.useRef({ x: 0, y: 0, inside: false });
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const label = `${alt} ${index + 1} of ${count}`;

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.style.setProperty("--hb-qe6-x", "0");
    root.style.setProperty("--hb-qe6-y", "0");
    if (reduced || !visible) return;
    let raf = 0;
    let t0 = -1;
    let cx = 0;
    let cy = 0;
    const tick = (now: number) => {
      if (t0 < 0) t0 = now;
      const t = (now - t0) / 1000;
      const p = pointer.current;
      const tx = p.inside ? p.x : 0.7 * Math.sin(t * 0.8);
      const ty = p.inside ? p.y : 0.5 * Math.sin(t * 1.1 + 1.2);
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      root.style.setProperty("--hb-qe6-x", cx.toFixed(3));
      root.style.setProperty("--hb-qe6-y", cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, visible]);

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} gallery`}
      {...rest}
      ref={ref}
      className={cx("hb-qe6", className)}
      style={
        {
          ...rootBox(width, height, aspect, style),
          "--hb-qe6-a": accent,
          "--hb-qe6-t": maxTilt,
          "--hb-qe6-s": depth,
          "--hb-qe6-p": `${perspective}px`,
        } as React.CSSProperties
      }
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: clamp(((e.clientX - rect.left) / rect.width) * 2 - 1),
          y: clamp(((e.clientY - rect.top) / rect.height) * 2 - 1),
          inside: true,
        };
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        pointer.current.inside = false;
        onPointerLeave?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        arrowNav(e, () => setIndex(index - 1), () => setIndex(index + 1));
      }}
    >
      <style href="hb-image-parallax-tilt" precedence="default">
        {css}
      </style>
      <div className="hb-qe6-card">
        {list ? (
          <div
            className="hb-qe6-l hb-qe6-back"
            role="img"
            aria-label={label}
            style={{ backgroundImage: cssUrl(list, index) }}
          />
        ) : (
          <>
            <div
              className="hb-qe6-l hb-qe6-back"
              role="img"
              aria-label={label}
              style={{ backgroundImage: cssUrl(null, index, "back") }}
            />
            <div
              className="hb-qe6-l hb-qe6-mid"
              aria-hidden="true"
              style={{ backgroundImage: cssUrl(null, index, "mid") }}
            />
            <div
              className="hb-qe6-l hb-qe6-front"
              aria-hidden="true"
              style={{ backgroundImage: cssUrl(null, index, "front") }}
            />
          </>
        )}
        {glare ? <div className="hb-qe6-glare" aria-hidden="true" /> : null}
        <Controls count={count} index={index} onGo={setIndex} label="photo" arrows={false} />
      </div>
      <span className="hb-qe6-sr" aria-live="polite">
        {label}
      </span>
    </div>
  );
}

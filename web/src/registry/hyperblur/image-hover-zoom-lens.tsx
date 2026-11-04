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

function Slide({ image, label, hidden }: { image: string; label: string; hidden?: boolean }) {
  return (
    <div
      role="img"
      aria-label={label}
      aria-hidden={hidden || undefined}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: image,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
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
            className="hb-qea-nav hb-qea-prev"
            aria-label={`Previous ${label}`}
            onClick={() => onGo(index - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hb-qea-nav hb-qea-next"
            aria-label={`Next ${label}`}
            onClick={() => onGo(index + 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
      <div className="hb-qea-dots">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className="hb-qea-dot"
            aria-label={`Show ${label} ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => onGo(i)}
          />
        ))}
      </div>
    </>
  );
}

export interface ImageHoverZoomLensProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspect?: string;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  zoom?: number;
  size?: number;
  accent?: string;
}

const css = `
.hb-qea {
  --hb-qea-a: #2f7bff;
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
.hb-qea *, .hb-qea *::before, .hb-qea *::after { box-sizing: border-box; }
.hb-qea:focus-visible { outline: 2px solid var(--hb-qea-a); outline-offset: 2px; }
.hb-qea-layer { position: absolute; inset: 0; }
.hb-qea-sr {
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
.hb-qea { container-type: size; cursor: crosshair; touch-action: pan-y; }
.hb-qea-lens {
  position: absolute;
  left: var(--hb-qea-lx, 50%);
  top: var(--hb-qea-ly, 50%);
  z-index: 2;
  width: calc(var(--hb-qea-r) * 2px);
  height: calc(var(--hb-qea-r) * 2px);
  margin: calc(var(--hb-qea-r) * -1px) 0 0 calc(var(--hb-qea-r) * -1px);
  overflow: hidden;
  pointer-events: none;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9), 0 0 0 5px rgba(10, 10, 10, 0.35), 0 14px 30px rgba(0, 0, 0, 0.5);
}
.hb-qea-lens::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 46%);
}
.hb-qea-zoom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100cqw;
  height: 100cqh;
  background-image: var(--hb-qea-img);
  background-size: cover;
  background-position: center;
  transform-origin: 0 0;
  transform: translate(var(--hb-qea-ix, 0px), var(--hb-qea-iy, 0px)) scale(var(--hb-qea-z));
}
.hb-qea-nav {
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
.hb-qea-nav:hover { background: rgba(10, 10, 10, 0.7); transform: scale(1.06); }
.hb-qea-nav:active { transform: scale(0.95); }
.hb-qea-nav:focus-visible { outline: 2px solid var(--hb-qea-a); outline-offset: 2px; }
.hb-qea-prev { left: 10px; }
.hb-qea-next { right: 10px; }
.hb-qea-dots {
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
.hb-qea-dot {
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
.hb-qea-dot::before { content: ""; position: absolute; inset: -6px -3px; }
.hb-qea-dot[aria-current="true"] { width: 16px; background: #fff; }
.hb-qea-dot:focus-visible { outline: 2px solid var(--hb-qea-a); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qea-nav, .hb-qea-dot { transition: none; }
}
`;

export function ImageHoverZoomLens({
  images,
  alt = "Photo",
  width,
  height,
  aspect = "16 / 10",
  index: indexProp,
  defaultIndex = 0,
  onChange,
  zoom = 2.4,
  size = 96,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  onPointerMove,
  onPointerLeave,
  onBlur,
  ...rest
}: ImageHoverZoomLensProps) {
  const list = images && images.length > 0 ? images : null;
  const count = list ? list.length : SCENE_COUNT;
  const [index, setIndex] = useSlideIndex(count, indexProp, defaultIndex, onChange);
  const ref = React.useRef<HTMLDivElement>(null);
  const live = React.useRef({ x: 0, y: 0, inside: false, kx: 0.5, ky: 0.5, kb: false });
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const label = `${alt} ${index + 1} of ${count}`;

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const r0 = size / 2;
    const place = (x: number, y: number, r: number) => {
      root.style.setProperty("--hb-qea-lx", `${x.toFixed(1)}px`);
      root.style.setProperty("--hb-qea-ly", `${y.toFixed(1)}px`);
      root.style.setProperty("--hb-qea-r", r.toFixed(1));
      root.style.setProperty("--hb-qea-ix", `${(r - x * zoom).toFixed(1)}px`);
      root.style.setProperty("--hb-qea-iy", `${(r - y * zoom).toFixed(1)}px`);
    };
    if (reduced || !visible) {
      const rect = root.getBoundingClientRect();
      place(rect.width / 2, rect.height / 2, r0);
      return;
    }
    let raf = 0;
    let t0 = -1;
    let cx = -1;
    let cy = -1;
    let grow = 0;
    const tick = (now: number) => {
      if (t0 < 0) t0 = now;
      const t = (now - t0) / 1000;
      const rect = root.getBoundingClientRect();
      const s = live.current;
      let tx = rect.width * (0.5 + 0.27 * Math.sin(t * 0.55));
      let ty = rect.height * (0.5 + 0.24 * Math.sin(t * 0.83 + 0.8));
      if (s.inside) {
        tx = s.x;
        ty = s.y;
      } else if (s.kb) {
        tx = s.kx * rect.width;
        ty = s.ky * rect.height;
      }
      if (cx < 0) {
        cx = tx;
        cy = ty;
      }
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      grow += ((s.inside || s.kb ? 1 : 0) - grow) * 0.12;
      place(cx, cy, r0 * (1 + 0.14 * grow));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, visible, size, zoom]);

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} magnifier`}
      {...rest}
      ref={ref}
      className={cx("hb-qea", className)}
      style={
        {
          ...rootBox(width, height, aspect, style),
          "--hb-qea-a": accent,
          "--hb-qea-z": zoom,
          "--hb-qea-r": size / 2,
          "--hb-qea-img": cssUrl(list, index),
        } as React.CSSProperties
      }
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        live.current.x = e.clientX - rect.left;
        live.current.y = e.clientY - rect.top;
        live.current.inside = true;
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        live.current.inside = false;
        onPointerLeave?.(e);
      }}
      onBlur={(e) => {
        live.current.kb = false;
        onBlur?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const s = live.current;
        const step = 0.08;
        if (e.key === "ArrowLeft") s.kx = Math.max(0, s.kx - step);
        else if (e.key === "ArrowRight") s.kx = Math.min(1, s.kx + step);
        else if (e.key === "ArrowUp") s.ky = Math.max(0, s.ky - step);
        else if (e.key === "ArrowDown") s.ky = Math.min(1, s.ky + step);
        else return;
        e.preventDefault();
        s.kb = true;
      }}
    >
      <style href="hb-image-hover-zoom-lens" precedence="default">
        {css}
      </style>
      <div className="hb-qea-layer">
        <Slide image={cssUrl(list, index)} label={label} />
      </div>
      <div className="hb-qea-lens" aria-hidden="true">
        <div className="hb-qea-zoom" />
      </div>
      <Controls count={count} index={index} onGo={setIndex} label="photo" arrows={false} />
      <span className="hb-qea-sr" aria-live="polite">
        {label}
      </span>
    </div>
  );
}

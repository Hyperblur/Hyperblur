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

interface FlipState {
  cur: number;
  from: number;
  dir: 1 | -1;
  n: number;
}

function useFlip(index: number, count: number) {
  const [state, setState] = React.useState<FlipState>({ cur: index, from: -1, dir: 1, n: 0 });
  if (state.cur !== index) {
    const last = count - 1;
    let dir: 1 | -1 = index > state.cur ? 1 : -1;
    if (count > 2 && state.cur === last && index === 0) dir = 1;
    if (count > 2 && state.cur === 0 && index === last) dir = -1;
    setState({ cur: index, from: state.cur, dir, n: state.n + 1 });
  }
  const done = React.useCallback(() => {
    setState((p) => (p.from === -1 ? p : { ...p, from: -1 }));
  }, []);
  return [state, done] as const;
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
            className="hb-qe3-nav hb-qe3-prev"
            aria-label={`Previous ${label}`}
            onClick={() => onGo(index - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hb-qe3-nav hb-qe3-next"
            aria-label={`Next ${label}`}
            onClick={() => onGo(index + 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
      <div className="hb-qe3-dots">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className="hb-qe3-dot"
            aria-label={`Show ${label} ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => onGo(i)}
          />
        ))}
      </div>
    </>
  );
}

export interface ImageLiquidDistortProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspect?: string;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  idleScale?: number;
  hoverScale?: number;
  changeScale?: number;
  accent?: string;
}

const css = `
.hb-qe3 {
  --hb-qe3-a: #2f7bff;
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
.hb-qe3 *, .hb-qe3 *::before, .hb-qe3 *::after { box-sizing: border-box; }
.hb-qe3:focus-visible { outline: 2px solid var(--hb-qe3-a); outline-offset: 2px; }
.hb-qe3-layer { position: absolute; inset: 0; }
.hb-qe3-sr {
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
.hb-qe3-fx { position: absolute; inset: 0; transform: scale(1.1); }
.hb-qe3-fade { animation: hb-qe3-in var(--hb-qe3-d) ease both; }
.hb-qe3-svg { position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none; }
.hb-qe3-nav {
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
.hb-qe3-nav:hover { background: rgba(10, 10, 10, 0.7); transform: scale(1.06); }
.hb-qe3-nav:active { transform: scale(0.95); }
.hb-qe3-nav:focus-visible { outline: 2px solid var(--hb-qe3-a); outline-offset: 2px; }
.hb-qe3-prev { left: 10px; }
.hb-qe3-next { right: 10px; }
.hb-qe3-dots {
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
.hb-qe3-dot {
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
.hb-qe3-dot::before { content: ""; position: absolute; inset: -6px -3px; }
.hb-qe3-dot[aria-current="true"] { width: 16px; background: #fff; }
.hb-qe3-dot:focus-visible { outline: 2px solid var(--hb-qe3-a); outline-offset: 2px; }
@keyframes hb-qe3-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qe3-fade { animation: none; }
  .hb-qe3-nav, .hb-qe3-dot { transition: none; }
}
`;

export function ImageLiquidDistort({
  images,
  alt = "Photo",
  width,
  height,
  aspect = "16 / 10",
  index: indexProp,
  defaultIndex = 0,
  onChange,
  autoPlay = true,
  interval = 3600,
  duration = 1100,
  idleScale = 12,
  hoverScale = 54,
  changeScale = 96,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ImageLiquidDistortProps) {
  const list = images && images.length > 0 ? images : null;
  const count = list ? list.length : SCENE_COUNT;
  const [index, setIndex] = useSlideIndex(count, indexProp, defaultIndex, onChange);
  const [state, done] = useFlip(index, count);
  const [paused, pause] = usePause();
  const ref = React.useRef<HTMLDivElement>(null);
  const turbRef = React.useRef<SVGFETurbulenceElement>(null);
  const dispRef = React.useRef<SVGFEDisplacementMapElement>(null);
  const hoverRef = React.useRef(false);
  const kickRef = React.useRef(0);
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `hb-qe3-f-${uid}`;
  useAutoAdvance(autoPlay && count > 1, interval, () => setIndex(index + 1), ref, paused, index);
  const label = (i: number) => `${alt} ${i + 1} of ${count}`;
  const base = state.from >= 0 ? state.from : state.cur;

  React.useEffect(() => {
    if (state.n > 0) kickRef.current = 1;
  }, [state.n]);

  React.useEffect(() => {
    const disp = dispRef.current;
    const turb = turbRef.current;
    if (!disp || !turb) return;
    disp.setAttribute("scale", "0");
    if (reduced || !visible) return;
    let raf = 0;
    let t0 = -1;
    let hover = 0;
    const tick = (now: number) => {
      if (t0 < 0) t0 = now;
      const t = (now - t0) / 1000;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;
      kickRef.current *= 0.95;
      const idle = idleScale * (0.65 + 0.35 * Math.sin(t * 0.9));
      const value = idle + hover * hoverScale + kickRef.current * changeScale;
      disp.setAttribute("scale", value.toFixed(2));
      const fx = 0.011 + 0.003 * Math.sin(t * 0.5);
      const fy = 0.018 + 0.004 * Math.cos(t * 0.4);
      turb.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, visible, idleScale, hoverScale, changeScale]);

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} gallery`}
      {...rest}
      {...pause}
      ref={ref}
      className={cx("hb-qe3", className)}
      style={
        {
          ...rootBox(width, height, aspect, style),
          "--hb-qe3-a": accent,
          "--hb-qe3-d": `${duration}ms`,
        } as React.CSSProperties
      }
      onPointerEnter={(e) => {
        hoverRef.current = true;
        pause.onPointerEnter();
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        hoverRef.current = false;
        pause.onPointerLeave();
        onPointerLeave?.(e);
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) hoverRef.current = true;
        pause.onFocus(e);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        hoverRef.current = false;
        pause.onBlur(e);
        onBlur?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        arrowNav(e, () => setIndex(index - 1), () => setIndex(index + 1));
      }}
    >
      <style href="hb-image-liquid-distort" precedence="default">
        {css}
      </style>
      <svg className="hb-qe3-svg" aria-hidden="true" focusable="false">
        <filter id={filterId} x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.011 0.018" numOctaves={2} seed={4} result="noise" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="hb-qe3-fx" style={{ filter: `url(#${filterId})` }}>
        <div className="hb-qe3-layer">
          <Slide image={cssUrl(list, base)} label={label(base)} />
        </div>
        {state.from >= 0 ? (
          <div key={state.n} className="hb-qe3-layer hb-qe3-fade" onAnimationEnd={done}>
            <Slide image={cssUrl(list, state.cur)} label={label(state.cur)} />
          </div>
        ) : null}
      </div>
      <Controls count={count} index={index} onGo={setIndex} label="photo" />
      <span className="hb-qe3-sr" aria-live="polite">
        {label(index)}
      </span>
    </div>
  );
}

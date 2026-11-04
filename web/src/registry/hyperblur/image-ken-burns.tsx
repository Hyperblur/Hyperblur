"use client";

import * as React from "react";

const SCENE_COUNT = 4;

const SCENE_NAMES = ["Alpine dusk", "Neon district", "Tidal lines", "Studio light"];

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

export interface ImageKenBurnsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  images?: string[];
  captions?: string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspect?: string;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  accent?: string;
}

const css = `
.hb-qe7 {
  --hb-qe7-a: #2f7bff;
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
.hb-qe7 *, .hb-qe7 *::before, .hb-qe7 *::after { box-sizing: border-box; }
.hb-qe7:focus-visible { outline: 2px solid var(--hb-qe7-a); outline-offset: 2px; }
.hb-qe7-layer { position: absolute; inset: 0; }
.hb-qe7-sr {
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
.hb-qe7-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.9s ease;
  will-change: transform, opacity;
}
.hb-qe7-slide[data-state="active"] { opacity: 1; }
.hb-qe7-slide[data-state="active"], .hb-qe7-slide[data-state="leaving"] {
  animation: hb-qe7-kb calc(var(--hb-qe7-i) + 1400ms) linear both;
}
.hb-qe7-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.55) 100%);
}
.hb-qe7-bars {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 3;
  display: flex;
  gap: 4px;
}
.hb-qe7-bar {
  position: relative;
  flex: 1 1 0;
  height: 3px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.32);
  border-radius: 999px;
}
.hb-qe7-fill {
  position: absolute;
  inset: 0;
  background: #fff;
  border-radius: inherit;
  transform: scaleX(0);
  transform-origin: left center;
}
.hb-qe7-fill[data-state="done"] { transform: scaleX(1); }
.hb-qe7-fill[data-state="active"] { animation: hb-qe7-fill var(--hb-qe7-i) linear both; }
.hb-qe7[data-auto="false"] .hb-qe7-fill[data-state="active"] { animation: none; transform: scaleX(1); }
.hb-qe7[data-paused="true"] .hb-qe7-fill, .hb-qe7[data-paused="true"] .hb-qe7-slide { animation-play-state: paused; }
.hb-qe7-cap {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  z-index: 3;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  animation: hb-qe7-cap 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-qe7-hit {
  position: absolute;
  top: 22px;
  bottom: 0;
  z-index: 2;
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qe7-hit-l { left: 0; width: 35%; }
.hb-qe7-hit-r { right: 0; width: 65%; }
.hb-qe7-hit:focus-visible { outline: 2px solid var(--hb-qe7-a); outline-offset: -4px; }
@keyframes hb-qe7-kb {
  from { transform: scale(1.02) translate(0, 0); }
  to { transform: scale(1.2) translate(var(--hb-qe7-tx, 0%), var(--hb-qe7-ty, 0%)); }
}
@keyframes hb-qe7-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes hb-qe7-cap {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qe7-slide { transition: none; }
  .hb-qe7-slide[data-state="active"], .hb-qe7-slide[data-state="leaving"], .hb-qe7-cap { animation: none; }
  .hb-qe7-fill[data-state="active"] { animation: none; transform: scaleX(1); }
}
`;

export function ImageKenBurns({
  images,
  captions,
  alt = "Photo",
  width,
  height,
  aspect = "16 / 10",
  index: indexProp,
  defaultIndex = 0,
  onChange,
  autoPlay = true,
  interval = 4200,
  loop = true,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  ...rest
}: ImageKenBurnsProps) {
  const list = images && images.length > 0 ? images : null;
  const count = list ? list.length : SCENE_COUNT;
  const names = captions ?? (list ? [] : SCENE_NAMES);
  const [index, setIndex] = useSlideIndex(count, indexProp, defaultIndex, onChange);
  const [state, done] = useFlip(index, count);
  const [paused, pause] = usePause();
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const label = (i: number) => `${alt} ${i + 1} of ${count}`;
  const go = (next: number) => {
    if (!loop && (next < 0 || next >= count)) return;
    setIndex(next);
  };

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} stories`}
      {...rest}
      {...pause}
      ref={ref}
      className={cx("hb-qe7", className)}
      data-auto={autoPlay && count > 1 ? "true" : "false"}
      data-paused={paused || !visible ? "true" : "false"}
      style={
        {
          ...rootBox(width, height, aspect, style),
          "--hb-qe7-a": accent,
          "--hb-qe7-i": `${interval}ms`,
        } as React.CSSProperties
      }
      onKeyDown={(e) => {
        onKeyDown?.(e);
        arrowNav(e, () => go(index - 1), () => go(index + 1));
      }}
    >
      <style href="hb-image-ken-burns" precedence="default">
        {css}
      </style>
      {Array.from({ length: count }, (_, i) => {
        const tx = (hash(i * 3 + 1) % 7) - 3;
        const ty = (hash(i * 3 + 2) % 5) - 2;
        const phase = i === state.cur ? "active" : i === state.from ? "leaving" : "idle";
        return (
          <div
            key={i}
            className="hb-qe7-slide"
            data-state={phase}
            role="img"
            aria-label={label(i)}
            aria-hidden={i === index ? undefined : true}
            style={
              {
                backgroundImage: cssUrl(list, i),
                "--hb-qe7-tx": `${tx}%`,
                "--hb-qe7-ty": `${ty}%`,
              } as React.CSSProperties
            }
            onTransitionEnd={
              phase === "leaving"
                ? (e) => {
                    if (e.propertyName === "opacity") done();
                  }
                : undefined
            }
          />
        );
      })}
      <div className="hb-qe7-shade" aria-hidden="true" />
      <div className="hb-qe7-bars" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="hb-qe7-bar">
            <span
              className="hb-qe7-fill"
              data-state={i < index ? "done" : i === index ? "active" : "idle"}
              onAnimationEnd={i === index && autoPlay ? () => go(index + 1) : undefined}
            />
          </span>
        ))}
      </div>
      {names[index] ? (
        <div key={index} className="hb-qe7-cap">
          {names[index]}
        </div>
      ) : null}
      {count > 1 ? (
        <>
          <button type="button" tabIndex={-1} className="hb-qe7-hit hb-qe7-hit-l" aria-label="Previous photo" onClick={() => go(index - 1)} />
          <button type="button" tabIndex={-1} className="hb-qe7-hit hb-qe7-hit-r" aria-label="Next photo" onClick={() => go(index + 1)} />
        </>
      ) : null}
      <span className="hb-qe7-sr" aria-live="polite">
        {label(index)}
      </span>
    </div>
  );
}

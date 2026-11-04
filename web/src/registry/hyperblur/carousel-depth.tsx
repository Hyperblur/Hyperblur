"use client";

import * as React from "react";

export interface DepthImage {
  src?: string;
  title?: string;
  caption?: string;
}

export interface CarouselDepthProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "defaultValue"> {
  images?: DepthImage[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  accent?: string;
  label?: string;
}

const defaultImages: DepthImage[] = [
  { title: "Aurora Basin", caption: "Iceland" },
  { title: "Terracotta Row", caption: "Marrakech" },
  { title: "Night Ferry", caption: "Hong Kong" },
  { title: "Salt Flats", caption: "Bolivia" },
  { title: "Cedar Hollow", caption: "Oregon" },
  { title: "Glass Tower", caption: "Singapore" },
  { title: "Blue Hour", caption: "Lisbon" },
];

const css = `
.hb-qu2 {
  --hb-qu2-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 180px;
  overflow: hidden;
  container-type: size;
  perspective: 900px;
  font-family: inherit;
  color: #ededed;
  background:
    radial-gradient(ellipse at 50% 55%, color-mix(in srgb, var(--hb-qu2-a) 18%, transparent) 0%, transparent 60%),
    #0a0a0a;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
}
.hb-qu2 *, .hb-qu2 *::before, .hb-qu2 *::after { box-sizing: border-box; }
.hb-qu2:focus-visible { outline: 2px solid var(--hb-qu2-a); outline-offset: -2px; }
.hb-qu2-slide {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 74cqh;
  width: calc(74cqh * 0.8);
  overflow: hidden;
  border-radius: 14px;
  background: #111111;
  cursor: pointer;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  will-change: transform, opacity;
}
.hb-qu2-slide[data-active="true"] {
  cursor: default;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px color-mix(in srgb, var(--hb-qu2-a) 55%, transparent);
}
.hb-qu2[data-drag="true"] .hb-qu2-slide { cursor: grabbing; }
.hb-qu2-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  pointer-events: none;
}
.hb-qu2-art { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.hb-qu2-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 11px 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), transparent);
  pointer-events: none;
}
.hb-qu2-title {
  display: block;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.2;
  color: #ffffff;
}
.hb-qu2-sub {
  display: block;
  margin-top: 2px;
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
}
.hb-qu2-arrow {
  position: absolute;
  top: 50%;
  z-index: 200;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: -15px 0 0;
  padding: 0;
  color: #ededed;
  background: rgba(17, 17, 17, 0.8);
  border: 1px solid #262626;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.hb-qu2-arrow[data-dir="prev"] { left: 8px; }
.hb-qu2-arrow[data-dir="next"] { right: 8px; }
.hb-qu2-arrow:hover:not(:disabled) { background: #171717; border-color: var(--hb-qu2-a); }
.hb-qu2-arrow:active:not(:disabled) { transform: scale(0.92); }
.hb-qu2-arrow:disabled { opacity: 0.35; cursor: default; }
.hb-qu2-arrow:focus-visible, .hb-qu2-dot:focus-visible { outline: 2px solid var(--hb-qu2-a); outline-offset: 2px; }
.hb-qu2-dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  z-index: 200;
  display: flex;
  justify-content: center;
  gap: 0;
}
.hb-qu2-dot {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
}
.hb-qu2-dot::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
  transition: width 0.3s ease, background 0.3s ease;
}
.hb-qu2-dot[aria-current="true"]::before { width: 16px; background: var(--hb-qu2-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-qu2-slide { will-change: auto; }
  .hb-qu2-arrow, .hb-qu2-dot::before { transition: none; }
}
`;

function hash(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

interface Api {
  moveTo: (t: number, notify: boolean) => void;
  go: (i: number, notify: boolean) => void;
  step: (d: number) => void;
  drag: (p: number) => void;
  release: (v: number) => void;
}

const noop = () => undefined;

function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}

function Scene({ index }: { index: number }) {
  const hue = (index * 53 + 12) % 360;
  const a = hash(index + 7);
  const b = hash(index + 211);
  const sunX = 18 + (a % 64);
  const sunY = 16 + (b % 20);
  const m1 = 56 + (a % 12);
  const m2 = 70 + (b % 10);
  return (
    <>
      <div
        className="hb-qu2-img"
        style={{
          background: `linear-gradient(170deg, hsl(${hue} 72% 58%) 0%, hsl(${(hue + 46) % 360} 76% 44%) 58%, hsl(${(hue + 80) % 360} 58% 20%) 100%)`,
        }}
      />
      <svg className="hb-qu2-art" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx={sunX} cy={sunY} r="10" fill={`hsl(${(hue + 28) % 360} 95% 90%)`} opacity="0.9" />
        <polygon
          points={`0,125 0,${m1} ${30 + (a % 36)},${m1 - 26} 100,${m1 + 4} 100,125`}
          fill={`hsl(${hue} 52% 26%)`}
          opacity="0.8"
        />
        <polygon
          points={`0,125 0,${m2 + 6} ${44 + (b % 36)},${m2 - 10} 100,${m2 + 8} 100,125`}
          fill={`hsl(${hue} 48% 13%)`}
          opacity="0.92"
        />
      </svg>
    </>
  );
}

function slideStyle(o: number) {
  const a = Math.abs(o);
  const sign = o < 0 ? -1 : 1;
  const x = sign * (a < 1 ? 30 * a : 30 + (a - 1) * 19);
  const scale = 1 - 0.1 * Math.min(a, 2.2);
  const ry = -Math.max(-1.5, Math.min(1.5, o)) * 40;
  const z = -Math.min(a, 2) * 70;
  const br = 1 - 0.5 * Math.min(a, 1.3);
  const op = a <= 1.4 ? 1 : Math.max(0, 1 - (a - 1.4) / 0.9);
  return {
    transform: `translate(-50%, -50%) translateX(${x.toFixed(3)}cqw) translateZ(${z.toFixed(2)}px) rotateY(${ry.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
    filter: `brightness(${br.toFixed(3)})`,
    opacity: op.toFixed(3),
    zIndex: Math.round(100 - a * 10),
    pointerEvents: (op <= 0.01 ? "none" : "auto") as React.CSSProperties["pointerEvents"],
  };
}

export function CarouselDepth({
  images = defaultImages,
  value,
  defaultValue = 0,
  onChange,
  autoplay = true,
  interval = 3200,
  loop = true,
  accent = "#2f7bff",
  label = "Image carousel",
  className = "",
  style,
  ...rest
}: CarouselDepthProps) {
  const n = images.length;
  const wrap = loop && n >= 6;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const index = Math.max(0, Math.min(Math.max(0, n - 1), controlled ? value : inner));
  const [pos, setPos] = React.useState(index);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const posRef = React.useRef(index);
  const targetRef = React.useRef(index);
  const raf = React.useRef(0);
  const flags = React.useRef({ hover: false, focus: false, drag: false, visible: true });
  const api = React.useRef<Api>({
    moveTo: noop,
    go: noop,
    step: noop,
    drag: noop,
    release: noop,
  });

  React.useEffect(() => {
    function kick() {
      if (raf.current) return;
      let prev = performance.now();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const step = (now: number) => {
        const dt = Math.min(0.05, Math.max(0, (now - prev) / 1000));
        prev = now;
        const diff = targetRef.current - posRef.current;
        if (reduce || Math.abs(diff) < 0.002) {
          posRef.current = targetRef.current;
          raf.current = 0;
          setPos(posRef.current);
          return;
        }
        posRef.current += diff * (1 - Math.exp(-dt * 8));
        setPos(posRef.current);
        raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    }

    function moveTo(t: number, notify: boolean) {
      const tgt = wrap ? t : Math.max(0, Math.min(n - 1, t));
      targetRef.current = tgt;
      kick();
      const ni = wrap ? mod(tgt, n) : tgt;
      if (!controlled) setInner(ni);
      if (notify) onChange?.(ni);
    }

    function go(i: number, notify: boolean) {
      const cur = Math.round(posRef.current);
      if (wrap) {
        let diff = i - mod(cur, n);
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        moveTo(cur + diff, notify);
      } else {
        moveTo(i, notify);
      }
    }

    api.current = {
      moveTo,
      go,
      step: (d: number) => moveTo(Math.round(posRef.current) + d, true),
      drag: (p: number) => {
        posRef.current = wrap ? p : Math.max(-0.5, Math.min(n - 0.5, p));
        setPos(posRef.current);
      },
      release: (v: number) => {
        const base = Math.round(posRef.current - v * 0.18);
        const cur = Math.round(posRef.current);
        moveTo(Math.max(cur - 2, Math.min(cur + 2, base)), true);
      },
    };
  });

  React.useEffect(() => {
    const cur = targetRef.current;
    const curIdx = wrap ? mod(cur, n) : cur;
    if (curIdx !== index) api.current.go(index, false);
  }, [index, wrap, n]);

  React.useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const f = flags.current;
    const g = { id: -1, active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, v: 0, step: 100 };

    function onDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as Element).closest("button")) return;
      g.id = e.pointerId;
      g.active = false;
      g.startX = e.clientX;
      g.startPos = posRef.current;
      g.lastX = e.clientX;
      g.lastT = e.timeStamp;
      g.v = 0;
      g.step = Math.max(60, root!.clientWidth * 0.3);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerId !== g.id) return;
      const dx = e.clientX - g.startX;
      if (!g.active) {
        if (Math.abs(dx) < 6) return;
        g.active = true;
        f.drag = true;
        cancelAnimationFrame(raf.current);
        raf.current = 0;
        root!.dataset.drag = "true";
        root!.setPointerCapture(e.pointerId);
      }
      const dtm = Math.max(0.001, (e.timeStamp - g.lastT) / 1000);
      g.v = g.v * 0.6 + (-(e.clientX - g.lastX) / g.step / dtm) * 0.4;
      g.lastX = e.clientX;
      g.lastT = e.timeStamp;
      api.current.drag(g.startPos - dx / g.step);
    }

    function onUp(e: PointerEvent) {
      if (e.pointerId !== g.id) return;
      g.id = -1;
      if (!g.active) return;
      g.active = false;
      f.drag = false;
      root!.dataset.drag = "false";
      if (root!.hasPointerCapture(e.pointerId)) root!.releasePointerCapture(e.pointerId);
      api.current.release(g.v);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        api.current.step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.current.step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        api.current.go(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        api.current.go(n - 1, true);
      }
    }

    function onEnter(e: PointerEvent) {
      if (e.pointerType === "mouse") f.hover = true;
    }
    function onLeave() {
      f.hover = false;
    }
    function onFocusIn() {
      f.focus = true;
    }
    function onFocusOut() {
      f.focus = false;
    }

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("keydown", onKey);
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) f.visible = entry.isIntersecting;
    });
    io.observe(root);
    return () => {
      io.disconnect();
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("keydown", onKey);
    };
  }, [n]);

  React.useEffect(() => {
    if (!autoplay || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = flags.current;
    const id = window.setInterval(() => {
      if (f.hover || f.focus || f.drag || !f.visible) return;
      const cur = Math.round(posRef.current);
      if (wrap) api.current.moveTo(cur + 1, true);
      else api.current.go(mod(cur + 1, n), true);
    }, Math.max(800, interval));
    return () => window.clearInterval(id);
  }, [autoplay, interval, n, wrap]);

  const active = wrap ? mod(Math.round(pos), n) : Math.max(0, Math.min(n - 1, Math.round(pos)));
  const vars = { "--hb-qu2-a": accent, ...style } as React.CSSProperties;
  const atStart = !wrap && Math.round(pos) <= 0;
  const atEnd = !wrap && Math.round(pos) >= n - 1;

  return (
    <>
      <style href="hb-carousel-depth" precedence="default">{css}</style>
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        data-drag="false"
        className={`hb-qu2 ${className}`}
        style={vars}
        {...rest}
      >
        {images.map((img, i) => {
          let o = i - pos;
          if (wrap) o -= n * Math.round(o / n);
          const isActive = i === active;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={isActive ? undefined : true}
              data-active={isActive}
              className="hb-qu2-slide"
              style={slideStyle(o)}
              onClick={() => {
                if (!isActive) api.current.go(i, true);
              }}
            >
              {img.src ? (
                <div className="hb-qu2-img" style={{ backgroundImage: `url("${img.src}")` }} />
              ) : (
                <Scene index={i} />
              )}
              {img.title || img.caption ? (
                <div className="hb-qu2-cap">
                  {img.title ? <span className="hb-qu2-title">{img.title}</span> : null}
                  {img.caption ? <span className="hb-qu2-sub">{img.caption}</span> : null}
                </div>
              ) : null}
            </div>
          );
        })}
        <button
          type="button"
          className="hb-qu2-arrow"
          data-dir="prev"
          aria-label="Previous slide"
          disabled={atStart}
          onClick={() => api.current.step(-1)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="hb-qu2-arrow"
          data-dir="next"
          aria-label="Next slide"
          disabled={atEnd}
          onClick={() => api.current.step(1)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="hb-qu2-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className="hb-qu2-dot"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => api.current.go(i, true)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

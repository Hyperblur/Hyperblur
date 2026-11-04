"use client";

import * as React from "react";

export interface SpiralImage {
  src?: string;
  label?: string;
  alt?: string;
}

export interface GalleryInfiniteSpiralProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  images?: SpiralImage[];
  drift?: number;
  turns?: number;
  wheel?: boolean;
  accent?: string;
  itemRatio?: number;
  label?: string;
}

const defaultImages: SpiralImage[] = [
  { label: "Dune" },
  { label: "Fjord" },
  { label: "Lagoon" },
  { label: "Summit" },
  { label: "Meadow" },
  { label: "Canyon" },
  { label: "Glacier" },
  { label: "Harbor" },
  { label: "Savanna" },
  { label: "Tundra" },
  { label: "Orchard" },
  { label: "Mesa" },
];

const css = `
.hb-qu1 {
  --hb-qu1-a: #2f7bff;
  --hb-qu1-r: 0.78;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 180px;
  overflow: hidden;
  container-type: size;
  font-family: inherit;
  color: #ededed;
  background:
    radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--hb-qu1-a) 22%, transparent) 0%, transparent 38%),
    #0a0a0a;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
}
.hb-qu1 *, .hb-qu1 *::before, .hb-qu1 *::after { box-sizing: border-box; }
.hb-qu1[data-drag="true"] { cursor: grabbing; }
.hb-qu1:focus-visible { outline: 2px solid var(--hb-qu1-a); outline-offset: -2px; }
.hb-qu1-guide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-qu1-guide path {
  fill: none;
  stroke: color-mix(in srgb, var(--hb-qu1-a) 45%, transparent);
  stroke-width: 1;
  stroke-dasharray: 2 5;
  vector-effect: non-scaling-stroke;
}
.hb-qu1-item {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 40cqh;
  width: calc(40cqh * var(--hb-qu1-r));
  overflow: hidden;
  border-radius: 10px;
  background: #111111;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  will-change: transform, opacity;
}
.hb-qu1-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  pointer-events: none;
  -webkit-user-drag: none;
}
.hb-qu1-art { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.hb-qu1-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 8px 6px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  color: #ffffff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qu1-item { will-change: auto; }
}
`;

function hash(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

function sceneBackground(i: number) {
  const h = (i * 47 + 196) % 360;
  const h2 = (h + 48) % 360;
  return `linear-gradient(165deg, hsl(${h} 70% 56%) 0%, hsl(${h2} 78% 46%) 55%, hsl(${(h2 + 40) % 360} 60% 22%) 100%)`;
}

function Scene({ index }: { index: number }) {
  const a = hash(index);
  const b = hash(index + 101);
  const sunX = 20 + (a % 60);
  const sunY = 18 + (b % 18);
  const p1 = 52 + (a % 14);
  const p2 = 34 + (b % 14);
  const peak1 = 30 + (a % 40);
  const peak2 = 50 + (b % 40);
  const hue = (index * 47 + 196) % 360;
  return (
    <svg className="hb-qu1-art" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx={sunX} cy={sunY} r="9" fill={`hsl(${(hue + 30) % 360} 95% 88%)`} opacity="0.9" />
      <polygon
        points={`0,130 0,${p1} ${peak1},${p1 - 22} 100,${p1 + 6} 100,130`}
        fill={`hsl(${hue} 55% 28%)`}
        opacity="0.78"
      />
      <polygon
        points={`0,130 0,${p2 + 50} ${peak2},${p2 + 20} 100,${p2 + 54} 100,130`}
        fill={`hsl(${hue} 50% 14%)`}
        opacity="0.9"
      />
    </svg>
  );
}

function place(i: number, n: number, t: number, turns: number) {
  const d = ((((i - t) % n) + n) % n) / n;
  const rho = 0.04 + 0.96 * Math.pow(1 - d, 0.85);
  const th = -1.2 + d * turns * Math.PI * 2;
  const x = 36 * rho * Math.cos(th);
  const y = 30 * rho * Math.sin(th);
  const s = 0.16 + 0.84 * Math.pow(1 - d, 1.15);
  const fadeIn = Math.min(1, d / 0.08);
  const fadeOut = Math.min(1, (1 - d) / 0.08);
  const o = (1 - 0.8 * Math.pow(d, 1.4)) * fadeIn * fadeOut;
  return {
    transform: `translate(calc(-50% + ${x.toFixed(3)}cqw), calc(-50% + ${y.toFixed(3)}cqh)) scale(${s.toFixed(4)})`,
    opacity: o.toFixed(3),
    zIndex: Math.round((1 - d) * 100),
  };
}

function guidePath(turns: number) {
  const pts: string[] = [];
  for (let k = 0; k <= 80; k++) {
    const d = k / 80;
    const rho = 0.04 + 0.96 * Math.pow(1 - d, 0.85);
    const th = -1.2 + d * turns * Math.PI * 2;
    const x = 50 + 36 * rho * Math.cos(th);
    const y = 50 + 30 * rho * Math.sin(th);
    pts.push(`${k === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export function GalleryInfiniteSpiral({
  images = defaultImages,
  drift = 0.3,
  turns = 1.5,
  wheel = true,
  accent = "#2f7bff",
  itemRatio = 0.78,
  label = "Spiral gallery",
  className = "",
  style,
  ...rest
}: GalleryInfiniteSpiralProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const itemEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const pos = React.useRef(0);
  const n = images.length;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || n === 0) return;
    const els = itemEls.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = {
      vx: 0,
      pending: 0,
      gain: reduce ? 0 : 1,
      hover: false,
      focus: false,
      drag: false,
      lastX: 0,
      lastT: 0,
      v: 0,
      prev: 0,
      raf: 0,
      running: false,
    };

    function apply() {
      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        const p = place(i, n, pos.current, turns);
        el.style.transform = p.transform;
        el.style.opacity = p.opacity;
        el.style.zIndex = String(p.zIndex);
      }
    }

    function tick(now: number) {
      const dt = Math.min(0.05, Math.max(0, (now - s.prev) / 1000));
      s.prev = now;
      const target = s.hover || s.focus || s.drag ? 0 : 1;
      s.gain += (target - s.gain) * (1 - Math.exp(-dt * 4));
      if (!s.drag) {
        pos.current += (s.vx + drift * s.gain) * dt;
        s.vx *= Math.exp(-dt * 2.6);
        const mv = s.pending * (1 - Math.exp(-dt * 9));
        pos.current += mv;
        s.pending -= mv;
      }
      pos.current = ((pos.current % n) + n) % n;
      apply();
      s.raf = requestAnimationFrame(tick);
    }

    function start() {
      if (s.running || reduce) return;
      s.running = true;
      s.prev = performance.now();
      s.raf = requestAnimationFrame(tick);
    }

    function stop() {
      s.running = false;
      cancelAnimationFrame(s.raf);
    }

    function nudge(by: number) {
      if (reduce) {
        pos.current += by;
        apply();
      } else {
        s.pending += by;
      }
    }

    function pxPerItem() {
      return Math.max(48, root!.clientWidth * 0.2);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.drag = true;
      s.v = 0;
      s.vx = 0;
      s.lastX = e.clientX;
      s.lastT = e.timeStamp;
      root!.dataset.drag = "true";
      root!.setPointerCapture(e.pointerId);
    }

    function onMove(e: PointerEvent) {
      if (!s.drag) return;
      const dx = e.clientX - s.lastX;
      const dtm = Math.max(0.001, (e.timeStamp - s.lastT) / 1000);
      const step = -dx / pxPerItem();
      pos.current += step;
      s.v = s.v * 0.7 + (step / dtm) * 0.3;
      s.lastX = e.clientX;
      s.lastT = e.timeStamp;
      if (reduce) apply();
    }

    function onUp(e: PointerEvent) {
      if (!s.drag) return;
      s.drag = false;
      root!.dataset.drag = "false";
      if (root!.hasPointerCapture(e.pointerId)) root!.releasePointerCapture(e.pointerId);
      if (!reduce) s.vx = Math.max(-6, Math.min(6, s.v));
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      nudge(Math.max(-3, Math.min(3, e.deltaY / 140)));
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nudge(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nudge(-1);
      }
    }

    function onEnter(e: PointerEvent) {
      if (e.pointerType === "mouse") s.hover = true;
    }
    function onLeave() {
      s.hover = false;
    }
    function onFocusIn() {
      s.focus = true;
    }
    function onFocusOut() {
      s.focus = false;
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
    if (wheel) root.addEventListener("wheel", onWheel, { passive: false });

    apply();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) start();
        else stop();
      }
    });
    io.observe(root);

    return () => {
      stop();
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
      if (wheel) root.removeEventListener("wheel", onWheel);
    };
  }, [n, turns, drift, wheel]);

  const vars = {
    "--hb-qu1-a": accent,
    "--hb-qu1-r": String(itemRatio),
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-gallery-infinite-spiral" precedence="default">{css}</style>
      <div
        ref={rootRef}
        role="group"
        aria-roledescription="spiral gallery"
        aria-label={label}
        tabIndex={0}
        data-drag="false"
        className={`hb-qu1 ${className}`}
        style={vars}
        {...rest}
      >
        <svg className="hb-qu1-guide" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={guidePath(turns)} />
        </svg>
        {images.map((img, i) => {
          const p = place(i, n, 0, turns);
          return (
            <div
              key={i}
              ref={(el) => {
                itemEls.current[i] = el;
              }}
              className="hb-qu1-item"
              role="img"
              aria-label={img.alt ?? img.label ?? `Image ${i + 1}`}
              style={{ transform: p.transform, opacity: p.opacity, zIndex: p.zIndex }}
            >
              {img.src ? (
                <div className="hb-qu1-img" style={{ backgroundImage: `url("${img.src}")` }} />
              ) : (
                <>
                  <div className="hb-qu1-img" style={{ background: sceneBackground(i) }} />
                  <Scene index={i} />
                </>
              )}
              {img.label ? <div className="hb-qu1-cap">{img.label}</div> : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

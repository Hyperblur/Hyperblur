"use client";

import * as React from "react";

export interface ScrollParallaxLayersProps extends React.HTMLAttributes<HTMLDivElement> {
  scroller?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  height?: number | string;
  autoplay?: boolean;
  sceneHeight?: number | string;
  strength?: number;
  accent?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

type Scroller = React.RefObject<HTMLElement | null> | HTMLElement | null;

interface Frame {
  sc: HTMLElement | null;
  top: number;
  vh: number;
}

const css = `
.hb-qm2 {
  --hb-qm2-p: 0;
  --hb-qm2-k: 1;
  --hb-qm2-a: #ffb26b;
  --hb-qm2-h: 320px;
  position: relative;
  width: 100%;
  font-family: inherit;
}
.hb-qm2, .hb-qm2 * { box-sizing: border-box; }
.hb-qm2-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm2-vp:focus-visible { outline: 2px solid var(--hb-qm2-a); outline-offset: -2px; }
.hb-qm2-scene {
  position: relative;
  height: var(--hb-qm2-h);
  overflow: hidden;
  isolation: isolate;
  background: #0a0c26;
}
.hb-qm2-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: -25%;
  bottom: -25%;
  will-change: transform;
}
.hb-qm2-layer svg { display: block; width: 100%; height: 100%; }
.hb-qm2-sky { transform: translate3d(0, calc((var(--hb-qm2-p) - 0.5) * var(--hb-qm2-k) * 9%), 0); }
.hb-qm2-hills { transform: translate3d(0, calc((var(--hb-qm2-p) - 0.5) * var(--hb-qm2-k) * -14%), 0); }
.hb-qm2-fore { transform: translate3d(0, calc((var(--hb-qm2-p) - 0.5) * var(--hb-qm2-k) * -24%), 0); }
.hb-qm2-sun { fill: var(--hb-qm2-a); }
.hb-qm2-over {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 18px rgba(8, 6, 30, 0.6);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qm2-layer { transform: none; will-change: auto; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 0x9e3779b1) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

const starField = Array.from({ length: 30 }, (_, i) => {
  const a = hash(i * 3);
  const b = hash(i * 3 + 1);
  const c = hash(i * 3 + 2);
  return {
    x: ((a % 4000) / 10).toFixed(1),
    y: ((b % 1300) / 10 + 6).toFixed(1),
    r: (0.5 + (c % 9) / 10).toFixed(2),
    o: (0.35 + (c % 6) / 10).toFixed(2),
  };
});

function pine(cx: number, base: number, h: number, w: number) {
  const y = (f: number) => (base - h * f).toFixed(1);
  const x = (d: number) => (cx + w * d).toFixed(1);
  return `M${x(0)} ${y(1)}L${x(0.32)} ${y(0.62)}L${x(0.18)} ${y(0.62)}L${x(0.46)} ${y(0.3)}L${x(0.28)} ${y(0.3)}L${x(0.5)} ${y(0)}L${x(-0.5)} ${y(0)}L${x(-0.28)} ${y(0.3)}L${x(-0.46)} ${y(0.3)}L${x(-0.18)} ${y(0.62)}L${x(-0.32)} ${y(0.62)}Z`;
}

const pines = [
  pine(24, 215, 130, 58),
  pine(64, 212, 92, 42),
  pine(104, 210, 52, 26),
  pine(296, 210, 62, 30),
  pine(338, 214, 124, 56),
  pine(380, 212, 94, 44),
].join("");

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function pick(scroller: Scroller | undefined): HTMLElement | null {
  if (!scroller) return null;
  return "current" in scroller ? scroller.current : scroller;
}

function useScrollFrame(
  rootRef: React.RefObject<HTMLElement | null>,
  viewportRef: React.RefObject<HTMLElement | null>,
  scroller: Scroller | undefined,
  own: boolean,
  onFrame: (frame: Frame) => void,
) {
  const latest = React.useRef(onFrame);

  React.useEffect(() => {
    latest.current = onFrame;
  });

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sc = own ? viewportRef.current : pick(scroller);
    const host: HTMLElement | Window = sc ?? window;
    const run = () => {
      const top = sc ? sc.getBoundingClientRect().top : 0;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      latest.current({ sc, top, vh });
    };
    host.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    const ro = new ResizeObserver(run);
    ro.observe(root);
    if (sc) ro.observe(sc);
    return () => {
      host.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
      ro.disconnect();
    };
  }, [rootRef, viewportRef, scroller, own]);
}

function useAutoScroll(viewportRef: React.RefObject<HTMLElement | null>, active: boolean) {
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el || !active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.45;
      return;
    }
    let raf = 0;
    let last = 0;
    let pos = 0;
    let dir = 1;
    let hold = 700;
    let idle = 0;
    const touch = () => {
      idle = performance.now() + 3200;
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 50);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      if (now < idle) {
        pos = el.scrollTop / max;
        return;
      }
      if (hold > 0) {
        hold -= dt;
        return;
      }
      pos += (dir * dt) / 9000;
      if (pos >= 1) {
        pos = 1;
        dir = -1;
        hold = 900;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
        hold = 900;
      }
      el.scrollTop = pos * max;
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    for (const name of events) el.addEventListener(name, touch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      for (const name of events) el.removeEventListener(name, touch);
    };
  }, [viewportRef, active]);
}

export function ScrollParallaxLayers({
  scroller,
  height,
  autoplay = false,
  sceneHeight = 320,
  strength = 1,
  accent = "#ffb26b",
  before,
  after,
  className = "",
  style,
  children,
  ...rest
}: ScrollParallaxLayersProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/:/g, "");
  const own = height !== undefined;
  const k = Math.min(1.3, Math.max(0, strength));

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, ({ top, vh }) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    const p = clamp((top + vh - rect.top) / (vh + rect.height));
    rootRef.current?.style.setProperty("--hb-qm2-p", p.toFixed(4));
  });

  const body = (
    <>
      {before}
      <div ref={sceneRef} className="hb-qm2-scene">
        <div className="hb-qm2-layer hb-qm2-sky" aria-hidden="true">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${uid}s`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
                <stop offset="0" stopColor="#0a0c26" />
                <stop offset="0.3" stopColor="#1c1b4b" />
                <stop offset="0.52" stopColor="#4a2d7a" />
                <stop offset="0.66" stopColor="#b5527f" />
                <stop offset="0.8" style={{ stopColor: "var(--hb-qm2-a)" }} />
              </linearGradient>
              <radialGradient id={`${uid}g`}>
                <stop offset="0" style={{ stopColor: "var(--hb-qm2-a)", stopOpacity: 0.55 }} />
                <stop offset="1" style={{ stopColor: "var(--hb-qm2-a)", stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill={`url(#${uid}s)`} />
            {starField.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
            ))}
            <circle cx="282" cy="182" r="96" fill={`url(#${uid}g)`} />
            <circle className="hb-qm2-sun" cx="282" cy="182" r="21" />
            <rect x="52" y="118" width="74" height="2.5" rx="1.25" fill="#fff" opacity="0.14" />
            <rect x="70" y="127" width="46" height="2.5" rx="1.25" fill="#fff" opacity="0.1" />
            <rect x="214" y="104" width="62" height="2.5" rx="1.25" fill="#fff" opacity="0.12" />
          </svg>
        </div>
        <div className="hb-qm2-layer hb-qm2-hills" aria-hidden="true">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${uid}h`} gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="250">
                <stop offset="0" stopColor="#4b3a86" />
                <stop offset="1" stopColor="#2a2260" />
              </linearGradient>
            </defs>
            <path
              d="M0 192C38 168 78 172 118 184S198 148 250 158S342 184 400 164L400 300L0 300Z"
              fill={`url(#${uid}h)`}
            />
            <path
              d="M0 220C50 198 108 206 160 218S258 192 308 202S380 216 400 206L400 300L0 300Z"
              fill="#241d55"
            />
          </svg>
        </div>
        <div className="hb-qm2-layer hb-qm2-fore" aria-hidden="true">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${uid}f`} gradientUnits="userSpaceOnUse" x1="0" y1="196" x2="0" y2="300">
                <stop offset="0" stopColor="#151231" />
                <stop offset="1" stopColor="#090818" />
              </linearGradient>
            </defs>
            <path d={pines} fill="#100d29" />
            <path
              d="M0 204C70 190 140 198 210 192S340 188 400 198L400 300L0 300Z"
              fill={`url(#${uid}f)`}
            />
          </svg>
        </div>
        {children ? <div className="hb-qm2-over">{children}</div> : null}
      </div>
      {after}
    </>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm2 ${className}`.trim()}
      style={
        {
          "--hb-qm2-a": accent,
          "--hb-qm2-k": k,
          "--hb-qm2-h": typeof sceneHeight === "number" ? `${sceneHeight}px` : sceneHeight,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-parallax-layers" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm2-vp"
          style={{ height }}
          tabIndex={0}
          role="region"
          aria-label="Scrollable content"
        >
          {body}
        </div>
      ) : (
        body
      )}
    </div>
  );
}

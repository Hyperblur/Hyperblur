"use client";

import * as React from "react";

export interface ScrollZoomRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  caption?: React.ReactNode;
  src?: string;
  alt?: string;
  startInset?: number;
  length?: number;
  scroller?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  height?: number | string;
  autoplay?: boolean;
  accent?: string;
}

type Scroller = React.RefObject<HTMLElement | null> | HTMLElement | null;

interface Frame {
  sc: HTMLElement | null;
  top: number;
  vh: number;
}

const css = `
.hb-qm5 {
  --hb-qm5-a: #ffb26b;
  --hb-qm5-p: 0;
  --hb-qm5-u: 100vh;
  --hb-qm5-in: 33;
  position: relative;
  width: 100%;
  color: #fff;
  font-family: inherit;
}
.hb-qm5, .hb-qm5 * { box-sizing: border-box; }
.hb-qm5-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm5-vp:focus-visible { outline: 2px solid var(--hb-qm5-a); outline-offset: -2px; }
.hb-qm5-track { position: relative; width: 100%; }
.hb-qm5-stage {
  --hb-qm5-t: clamp(0, calc(var(--hb-qm5-p) / 0.85), 1);
  --hb-qm5-e: calc(var(--hb-qm5-t) * var(--hb-qm5-t) * (3 - 2 * var(--hb-qm5-t)));
  position: sticky;
  top: 0;
  height: var(--hb-qm5-u);
  overflow: hidden;
  container-type: inline-size;
  background: var(--hb-qm5-bg, #0a0a0a);
}
.hb-qm5-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(calc((1 - var(--hb-qm5-e)) * var(--hb-qm5-in) * 1%) round calc((1 - var(--hb-qm5-e)) * 16px));
}
.hb-qm5-media {
  position: absolute;
  inset: 0;
  transform: scale(calc(1.45 - 0.45 * var(--hb-qm5-e)));
  will-change: transform;
}
.hb-qm5-media svg {
  display: block;
  width: 100%;
  height: 100%;
}
.hb-qm5-pic {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
.hb-qm5-ring {
  position: absolute;
  inset: calc((1 - var(--hb-qm5-e)) * var(--hb-qm5-in) * 1%);
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: calc((1 - var(--hb-qm5-e)) * 16px);
  opacity: calc(1 - var(--hb-qm5-e) * 1.6);
  pointer-events: none;
}
.hb-qm5-head {
  position: absolute;
  left: 0;
  right: 0;
  top: 6%;
  z-index: 2;
  padding: 0 1em;
  text-align: center;
  opacity: clamp(0, calc(1 - var(--hb-qm5-p) * 3.2), 1);
  transform: translate3d(0, calc(var(--hb-qm5-p) * -30px), 0) scale(calc(1 + var(--hb-qm5-p) * 0.14));
  pointer-events: none;
}
.hb-qm5-title {
  margin: 0;
  font-size: clamp(1.4em, 8.5cqw, 4.6em);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #f4f4f4;
}
.hb-qm5-sub {
  margin: 0.45em 0 0;
  font-size: 0.78em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-qm5-hint {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 7%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font-size: 0.72em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8f8f8f;
  opacity: clamp(0, calc(1 - var(--hb-qm5-p) * 7), 1);
  pointer-events: none;
}
.hb-qm5-hint svg {
  width: 1.3em;
  height: 1.3em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qm5-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 2.6em 1.3em 1.1em;
  font-size: 0.95em;
  background: linear-gradient(180deg, transparent, rgba(6, 6, 16, 0.7));
  opacity: clamp(0, calc((var(--hb-qm5-p) - 0.72) * 5), 1);
  transform: translate3d(0, calc((1 - clamp(0, (var(--hb-qm5-p) - 0.72) * 5, 1)) * 12px), 0);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qm5-media, .hb-qm5-head { will-change: auto; }
}
`;

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
  unit: string,
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
      if (sc && !own) root.style.setProperty(unit, `${vh}px`);
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
  }, [rootRef, viewportRef, scroller, own, unit]);
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

function Scene({ uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1b4d" />
          <stop offset="0.45" stopColor="#7a3f8f" />
          <stop offset="0.72" stopColor="#f07a6a" />
          <stop offset="1" stopColor="#ffc47a" />
        </linearGradient>
        <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2a73" />
          <stop offset="1" stopColor="#0f0d2e" />
        </linearGradient>
        <radialGradient id={`${uid}g`}>
          <stop offset="0" stopColor="#ffe0a8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffe0a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${uid}s)`} />
      <circle cx="200" cy="138" r="86" fill={`url(#${uid}g)`} />
      <circle cx="200" cy="138" r="26" fill="#fff1cf" />
      <path d="M0 150L52 112L96 140L150 100L210 146L262 118L318 146L360 124L400 148L400 160L0 160Z" fill="#53307a" opacity="0.8" />
      <path d="M0 160L40 140L84 158L132 132L186 160L248 140L300 162L352 146L400 160L400 170L0 170Z" fill="#2f2063" />
      <rect y="156" width="400" height="84" fill={`url(#${uid}w)`} />
      <rect x="176" y="164" width="48" height="2.5" rx="1.25" fill="#ffd9a0" opacity="0.8" />
      <rect x="168" y="174" width="64" height="2.5" rx="1.25" fill="#ffd9a0" opacity="0.6" />
      <rect x="158" y="185" width="84" height="2.5" rx="1.25" fill="#ffd9a0" opacity="0.42" />
      <rect x="146" y="197" width="108" height="2.5" rx="1.25" fill="#ffd9a0" opacity="0.26" />
      <rect x="134" y="210" width="132" height="2.5" rx="1.25" fill="#ffd9a0" opacity="0.14" />
    </svg>
  );
}

export function ScrollZoomReveal({
  title = "Wide open",
  subtitle = "Scroll to step inside",
  caption,
  src,
  alt = "",
  startInset = 33,
  length = 1.5,
  scroller,
  height,
  autoplay = false,
  accent = "#ffb26b",
  className = "",
  style,
  ...rest
}: ScrollZoomRevealProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/:/g, "");
  const own = height !== undefined;

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, "--hb-qm5-u", ({ top, vh }) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const span = rect.height - vh;
    const p = span > 0 ? clamp((top - rect.top) / span) : 0;
    rootRef.current?.style.setProperty("--hb-qm5-p", p.toFixed(4));
  });

  const body = (
    <div
      ref={trackRef}
      className="hb-qm5-track"
      style={{ height: `calc(var(--hb-qm5-u) * ${(1 + Math.max(0.2, length)).toFixed(3)})` }}
    >
      <div className="hb-qm5-stage">
        <div className="hb-qm5-head">
          <h3 className="hb-qm5-title">{title}</h3>
          {subtitle ? <p className="hb-qm5-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-qm5-ring" />
        <div className="hb-qm5-frame">
          <div className="hb-qm5-media">
            {src ? (
              <div
                className="hb-qm5-pic"
                role={alt ? "img" : undefined}
                aria-label={alt || undefined}
                aria-hidden={alt ? undefined : true}
                style={{ backgroundImage: `url("${src.replace(/"/g, "%22")}")` }}
              />
            ) : (
              <Scene uid={uid} />
            )}
          </div>
        </div>
        <div className="hb-qm5-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
          Scroll
        </div>
        {caption ? <div className="hb-qm5-cap">{caption}</div> : null}
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm5 ${className}`.trim()}
      style={
        {
          "--hb-qm5-a": accent,
          "--hb-qm5-in": Math.min(45, Math.max(0, startInset)),
          ...(own ? { "--hb-qm5-u": typeof height === "number" ? `${height}px` : height } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-zoom-reveal" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm5-vp"
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

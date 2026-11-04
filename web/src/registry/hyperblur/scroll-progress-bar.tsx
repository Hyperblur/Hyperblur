"use client";

import * as React from "react";

export interface ScrollProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  scroller?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  height?: number | string;
  autoplay?: boolean;
  accent?: string;
  accentTo?: string;
  thickness?: number;
  showChip?: boolean;
}

type Scroller = React.RefObject<HTMLElement | null> | HTMLElement | null;

interface Frame {
  sc: HTMLElement | null;
  top: number;
  vh: number;
}

const css = `
.hb-qm1 {
  --hb-qm1-p: 0;
  --hb-qm1-a: #2f7bff;
  --hb-qm1-b: #7fb3ff;
  --hb-qm1-t: 3px;
  position: relative;
  width: 100%;
  font-family: inherit;
}
.hb-qm1, .hb-qm1 * { box-sizing: border-box; }
.hb-qm1-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm1-vp:focus-visible { outline: 2px solid var(--hb-qm1-a); outline-offset: -2px; }
.hb-qm1-head {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--hb-qm1-t);
  pointer-events: none;
}
.hb-qm1[data-mode="window"] .hb-qm1-head { position: fixed; left: 0; right: 0; }
.hb-qm1-bar {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}
.hb-qm1-fill {
  position: absolute;
  inset: 0;
  transform: scaleX(var(--hb-qm1-p));
  transform-origin: left center;
  background: linear-gradient(90deg, var(--hb-qm1-a), var(--hb-qm1-b));
}
.hb-qm1-dot {
  position: absolute;
  top: 50%;
  left: calc(var(--hb-qm1-p) * 100%);
  width: calc(var(--hb-qm1-t) * 2.6);
  height: calc(var(--hb-qm1-t) * 2.6);
  border-radius: 999px;
  background: var(--hb-qm1-b);
  box-shadow: 0 0 0 calc(var(--hb-qm1-t) * 1.2) color-mix(in srgb, var(--hb-qm1-a) 30%, transparent), 0 0 14px var(--hb-qm1-a);
  transform: translate3d(-50%, -50%, 0);
}
.hb-qm1-chip {
  position: absolute;
  top: calc(var(--hb-qm1-t) + 9px);
  left: calc(var(--hb-qm1-p) * (100% - 46px));
  width: 46px;
  height: 20px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.92);
  color: #ededed;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
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

export function ScrollProgressBar({
  scroller,
  height,
  autoplay = false,
  accent = "#2f7bff",
  accentTo = "#7fb3ff",
  thickness = 3,
  showChip = true,
  className = "",
  style,
  children,
  ...rest
}: ScrollProgressBarProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const own = height !== undefined;
  const [pct, setPct] = React.useState(0);

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, ({ sc }) => {
    const cur = sc ? sc.scrollTop : window.scrollY;
    const max = sc
      ? sc.scrollHeight - sc.clientHeight
      : document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(cur / max) : 0;
    rootRef.current?.style.setProperty("--hb-qm1-p", p.toFixed(4));
    setPct(Math.round(p * 100));
  });

  const mode = own ? "own" : scroller ? "sticky" : "window";

  const head = (
    <div className="hb-qm1-head">
      <div
        className="hb-qm1-bar"
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="hb-qm1-fill" />
      </div>
      <div className="hb-qm1-dot" />
      {showChip ? (
        <div className="hb-qm1-chip" aria-hidden="true">
          {pct}%
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm1 ${className}`.trim()}
      data-mode={mode}
      style={
        {
          "--hb-qm1-a": accent,
          "--hb-qm1-b": accentTo,
          "--hb-qm1-t": `${thickness}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-progress-bar" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm1-vp"
          style={{ height }}
          tabIndex={0}
          role="region"
          aria-label="Scrollable content"
        >
          {head}
          {children}
        </div>
      ) : (
        <>
          {head}
          {children}
        </>
      )}
    </div>
  );
}

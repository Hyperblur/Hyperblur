"use client";

import * as React from "react";

export interface ScrollCounterTickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  from?: number;
  to?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  separator?: string;
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
.hb-qm7 {
  --hb-qm7-a: #2f7bff;
  --hb-qm7-p: 0;
  --hb-qm7-u: 100vh;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-qm7, .hb-qm7 * { box-sizing: border-box; }
.hb-qm7-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm7-vp:focus-visible { outline: 2px solid var(--hb-qm7-a); outline-offset: -2px; }
.hb-qm7-track { position: relative; width: 100%; }
.hb-qm7-stage {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9em;
  height: var(--hb-qm7-u);
  padding: 1.2em;
  overflow: hidden;
  container-type: inline-size;
  background: radial-gradient(70% 60% at 50% 45%, color-mix(in srgb, var(--hb-qm7-a) 14%, #0a0a0a), var(--hb-qm7-bg, #0a0a0a) 75%);
}
.hb-qm7-num {
  display: flex;
  align-items: center;
  font-size: clamp(2.2em, 17cqw, 7em);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: #f4f4f4;
}
.hb-qm7-fix {
  padding: 0 0.06em;
  color: color-mix(in srgb, var(--hb-qm7-a) 62%, #fff);
}
.hb-qm7-col {
  position: relative;
  display: block;
  width: 0.62em;
  height: 1.12em;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
  transition: opacity 0.3s ease;
}
.hb-qm7-col[data-dim="true"] { opacity: 0.16; }
.hb-qm7-strip { display: block; will-change: transform; }
.hb-qm7-cell {
  display: block;
  height: 1.12em;
  line-height: 1.12em;
  text-align: center;
}
.hb-qm7-sep {
  align-self: flex-end;
  padding: 0 0.03em 0.08em;
  color: #6b6b6b;
}
.hb-qm7-label {
  margin: 0;
  font-size: 0.95em;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #a1a1a1;
  text-align: center;
}
.hb-qm7-meter {
  display: flex;
  align-items: center;
  gap: 0.8em;
  width: min(100%, 22em);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68em;
  font-variant-numeric: tabular-nums;
  color: #6f6f6f;
}
.hb-qm7-rail {
  position: relative;
  flex: 1;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
}
.hb-qm7-rail::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-qm7-a);
  transform: scaleX(var(--hb-qm7-p));
  transform-origin: left center;
}
.hb-qm7-sr {
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
@media (prefers-reduced-motion: reduce) {
  .hb-qm7-col { transition: none; }
  .hb-qm7-strip { will-change: auto; }
}
`;

const digitRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function pick(scroller: Scroller | undefined): HTMLElement | null {
  if (!scroller) return null;
  return "current" in scroller ? scroller.current : scroller;
}

function positions(value: number, count: number) {
  const x = Math.max(0, value);
  const out: number[] = [x % 10];
  for (let k = 1; k < count; k++) {
    const base = Math.floor(x / Math.pow(10, k)) % 10;
    const carry = Math.min(1, Math.max(0, out[k - 1] - 9));
    out.push(base + carry);
  }
  return out;
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

export function ScrollCounterTicker({
  from = 0,
  to = 48200,
  prefix = "",
  suffix = "",
  label = "Trees planted this year",
  separator = ",",
  length = 1.2,
  scroller,
  height,
  autoplay = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ScrollCounterTickerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState(from);
  const own = height !== undefined;
  const digits = Math.max(1, String(Math.round(Math.max(Math.abs(from), Math.abs(to)))).length);

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, "--hb-qm7-u", ({ top, vh }) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const span = rect.height - vh;
    const p = span > 0 ? clamp((top - rect.top) / span) : 0;
    rootRef.current?.style.setProperty("--hb-qm7-p", p.toFixed(4));
    const t = clamp((p - 0.06) / 0.88);
    setValue(Math.round((from + (to - from) * t) * 100) / 100);
  });

  const pos = positions(value, digits);
  const magnitude = Math.floor(Math.max(0, value));
  const format = (v: number) => {
    const s = Math.round(v).toLocaleString("en-US");
    return separator === "," ? s : s.replace(/,/g, separator);
  };

  const cols: React.ReactNode[] = [];
  for (let k = digits - 1; k >= 0; k--) {
    cols.push(
      <span key={`c${k}`} className="hb-qm7-col" data-dim={k > 0 && magnitude < Math.pow(10, k)}>
        <span
          className="hb-qm7-strip"
          style={{ transform: `translate3d(0, calc(${pos[k].toFixed(3)} * -1.12em), 0)` }}
        >
          {digitRow.map((d, i) => (
            <span key={i} className="hb-qm7-cell">
              {d}
            </span>
          ))}
        </span>
      </span>,
    );
    if (k > 0 && k % 3 === 0 && separator) {
      cols.push(
        <span key={`s${k}`} className="hb-qm7-sep">
          {separator}
        </span>,
      );
    }
  }

  const body = (
    <div
      ref={trackRef}
      className="hb-qm7-track"
      style={{ height: `calc(var(--hb-qm7-u) * ${(1 + Math.max(0.2, length)).toFixed(3)})` }}
    >
      <div className="hb-qm7-stage">
        <div className="hb-qm7-num" aria-hidden="true">
          {prefix ? <span className="hb-qm7-fix">{prefix}</span> : null}
          {cols}
          {suffix ? <span className="hb-qm7-fix">{suffix}</span> : null}
        </div>
        <span className="hb-qm7-sr">
          {prefix}
          {format(to)}
          {suffix} {label}
        </span>
        <p className="hb-qm7-label" aria-hidden="true">
          {label}
        </p>
        <div className="hb-qm7-meter" aria-hidden="true">
          <span>{format(from)}</span>
          <div className="hb-qm7-rail" />
          <span>{format(to)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm7 ${className}`.trim()}
      style={
        {
          "--hb-qm7-a": accent,
          ...(own ? { "--hb-qm7-u": typeof height === "number" ? `${height}px` : height } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-counter-ticker" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm7-vp"
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

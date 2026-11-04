"use client";

import * as React from "react";

export interface ScrollTrackCard {
  title: string;
  text: string;
  tag?: string;
  from?: string;
  to?: string;
}

export interface ScrollHorizontalTrackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  cards?: ScrollTrackCard[];
  title?: string;
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

const defaultCards: ScrollTrackCard[] = [
  { title: "Lisbon", text: "Tram 28 at dawn and pastries on the hill.", tag: "Days 1-2", from: "#f6c177", to: "#c2410c" },
  { title: "Porto", text: "Riverside cellars and the blue-tiled station.", tag: "Days 3-4", from: "#7dd3fc", to: "#1d4ed8" },
  { title: "Salamanca", text: "Golden stone, quiet courtyards, late dinners.", tag: "Day 5", from: "#fde68a", to: "#b45309" },
  { title: "Madrid", text: "Three museums, one long lunch, a night train.", tag: "Days 6-7", from: "#fda4af", to: "#9f1239" },
  { title: "Valencia", text: "Orange groves and a beach that stays warm.", tag: "Days 8-9", from: "#86efac", to: "#0f766e" },
  { title: "Barcelona", text: "Rooftops, markets and the last sunset.", tag: "Day 10", from: "#c4b5fd", to: "#6d28d9" },
];

const css = `
.hb-qm6 {
  --hb-qm6-a: #2f7bff;
  --hb-qm6-p: 0;
  --hb-qm6-u: 100vh;
  --hb-qm6-travel: 0px;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-qm6, .hb-qm6 * { box-sizing: border-box; }
.hb-qm6-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm6-vp:focus-visible { outline: 2px solid var(--hb-qm6-a); outline-offset: -2px; }
.hb-qm6-track {
  position: relative;
  width: 100%;
  height: calc(var(--hb-qm6-u) + var(--hb-qm6-travel));
}
.hb-qm6-stage {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: var(--hb-qm6-u);
  overflow: hidden;
  container-type: inline-size;
  background: var(--hb-qm6-bg, #0a0a0a);
}
.hb-qm6-top {
  display: flex;
  flex: none;
  align-items: baseline;
  justify-content: space-between;
  gap: 1em;
  padding: 1.1em 1.3em 0.7em;
}
.hb-qm6-title {
  margin: 0;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #f4f4f4;
}
.hb-qm6-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.7em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-qm6-hint svg {
  width: 1.4em;
  height: 1.4em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qm6-view { display: flex; flex: 1; min-height: 0; align-items: stretch; }
.hb-qm6-strip {
  display: flex;
  flex: none;
  gap: 0.8em;
  width: max-content;
  padding: 0 1.3em;
  transform: translate3d(calc(var(--hb-qm6-p) * var(--hb-qm6-travel) * -1), 0, 0);
  will-change: transform;
}
.hb-qm6-card {
  display: flex;
  flex: none;
  flex-direction: column;
  width: clamp(9em, 62cqw, 19em);
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 1em;
  background: #111111;
}
.hb-qm6-art {
  position: relative;
  flex: 1;
  min-height: 3em;
  background: linear-gradient(145deg, var(--hb-qm6-f), var(--hb-qm6-s));
}
.hb-qm6-art::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 90% at 15% 0%, rgba(255, 255, 255, 0.32), transparent 65%),
    linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.35));
}
.hb-qm6-tag {
  position: absolute;
  left: 0.7em;
  top: 0.65em;
  padding: 0.2em 0.6em;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.55);
  font-size: 0.66em;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #fff;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.hb-qm6-body { flex: none; padding: 0.7em 0.9em 0.8em; }
.hb-qm6-name {
  margin: 0;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #f4f4f4;
}
.hb-qm6-text {
  margin: 0.25em 0 0;
  font-size: 0.78em;
  line-height: 1.4;
  color: #a1a1a1;
}
.hb-qm6-rail {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.9em;
  padding: 0.8em 1.3em 1.1em;
}
.hb-qm6-count {
  flex: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72em;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: #a1a1a1;
}
.hb-qm6-line {
  position: relative;
  flex: 1;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
}
.hb-qm6-line::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-qm6-a);
  transform: scaleX(var(--hb-qm6-p));
  transform-origin: left center;
}
.hb-qm6-tick {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 999px;
  background: #2a2a2a;
  transition: background-color 0.25s ease;
}
.hb-qm6-tick[data-on="true"] { background: var(--hb-qm6-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-qm6-strip { will-change: auto; }
  .hb-qm6-tick { transition: none; }
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

export function ScrollHorizontalTrack({
  cards = defaultCards,
  title = "Ten days by rail",
  scroller,
  height,
  autoplay = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ScrollHorizontalTrackProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const own = height !== undefined;
  const n = Math.max(1, cards.length);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const strip = stripRef.current;
    if (!root || !stage || !strip) return;
    const measure = () => {
      const travel = Math.max(0, strip.scrollWidth - stage.clientWidth);
      root.style.setProperty("--hb-qm6-travel", `${travel}px`);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(strip);
    return () => ro.disconnect();
  }, [cards.length]);

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, "--hb-qm6-u", ({ top, vh }) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const span = rect.height - vh;
    const p = span > 0 ? clamp((top - rect.top) / span) : 0;
    rootRef.current?.style.setProperty("--hb-qm6-p", p.toFixed(4));
    setIndex(Math.round(p * (n - 1)));
  });

  const pad = (v: number) => String(v).padStart(2, "0");

  const body = (
    <div ref={trackRef} className="hb-qm6-track">
      <div ref={stageRef} className="hb-qm6-stage">
        <div className="hb-qm6-top">
          <h3 className="hb-qm6-title">{title}</h3>
          <span className="hb-qm6-hint" aria-hidden="true">
            Scroll
            <svg viewBox="0 0 24 24">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <div className="hb-qm6-view">
          <div ref={stripRef} className="hb-qm6-strip">
            {cards.map((card, i) => (
              <article
                key={i}
                className="hb-qm6-card"
                aria-label={`${i + 1} of ${n}: ${card.title}`}
              >
                <div
                  className="hb-qm6-art"
                  style={
                    {
                      "--hb-qm6-f": card.from ?? "#7fb3ff",
                      "--hb-qm6-s": card.to ?? "#1d3a8a",
                    } as React.CSSProperties
                  }
                >
                  {card.tag ? <span className="hb-qm6-tag">{card.tag}</span> : null}
                </div>
                <div className="hb-qm6-body">
                  <h4 className="hb-qm6-name">{card.title}</h4>
                  <p className="hb-qm6-text">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="hb-qm6-rail" aria-hidden="true">
          <span className="hb-qm6-count">
            {pad(index + 1)} / {pad(n)}
          </span>
          <div className="hb-qm6-line">
            {cards.map((_, i) => (
              <span
                key={i}
                className="hb-qm6-tick"
                data-on={i <= index}
                style={{ left: `${n > 1 ? ((i / (n - 1)) * 100).toFixed(2) : "0"}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm6 ${className}`.trim()}
      style={
        {
          "--hb-qm6-a": accent,
          ...(own ? { "--hb-qm6-u": typeof height === "number" ? `${height}px` : height } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-horizontal-track" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm6-vp"
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

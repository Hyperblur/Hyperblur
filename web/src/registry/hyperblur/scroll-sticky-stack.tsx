"use client";

import * as React from "react";

export interface ScrollStackCard {
  title: string;
  text: string;
  tag?: string;
  stat?: string;
  from?: string;
  to?: string;
}

export interface ScrollStickyStackProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: ScrollStackCard[];
  top?: number;
  gap?: number;
  cardHeight?: number;
  minScale?: number;
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

const defaultCards: ScrollStackCard[] = [
  {
    title: "Discover",
    text: "Interviews, audits and a clear brief before any pixel moves.",
    tag: "Week 1",
    stat: "12 interviews",
    from: "#1e3a8a",
    to: "#0f172a",
  },
  {
    title: "Design",
    text: "Flows, type and a component library the whole team shares.",
    tag: "Weeks 2-4",
    stat: "48 components",
    from: "#6d28d9",
    to: "#1e1b4b",
  },
  {
    title: "Build",
    text: "Small slices behind flags, tested on real devices.",
    tag: "Weeks 5-9",
    stat: "31 releases",
    from: "#0f766e",
    to: "#042f2e",
  },
  {
    title: "Launch",
    text: "A calm rollout with monitoring, docs and a clean handover.",
    tag: "Week 10",
    stat: "99.98% uptime",
    from: "#b45309",
    to: "#291304",
  },
];

const css = `
.hb-qm8 {
  --hb-qm8-a: #2f7bff;
  --hb-qm8-u: 100vh;
  --hb-qm8-ch: 0.62;
  --hb-qm8-top: 16px;
  --hb-qm8-gap: 14px;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-qm8, .hb-qm8 * { box-sizing: border-box; }
.hb-qm8-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm8-vp:focus-visible { outline: 2px solid var(--hb-qm8-a); outline-offset: -2px; }
.hb-qm8-list { padding: 0 1em calc(var(--hb-qm8-u) * 0.14); }
.hb-qm8-card {
  --hb-qm8-s: 1;
  --hb-qm8-d: 0;
  position: sticky;
  top: calc(var(--hb-qm8-top) + var(--hb-qm8-i) * var(--hb-qm8-gap));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(var(--hb-qm8-u) * var(--hb-qm8-ch));
  min-height: 7.5em;
  margin-bottom: calc(var(--hb-qm8-u) * 0.3);
  padding: 1em 1.1em;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.1em;
  background: linear-gradient(150deg, var(--hb-qm8-f), var(--hb-qm8-t));
  box-shadow: 0 -12px 30px rgba(0, 0, 0, 0.4);
  transform: scale(var(--hb-qm8-s));
  transform-origin: 50% 0;
  will-change: transform;
}
.hb-qm8-card:last-child { margin-bottom: 0; }
.hb-qm8-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 90% at 10% 0%, rgba(255, 255, 255, 0.2), transparent 60%);
  pointer-events: none;
}
.hb-qm8-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #000;
  opacity: var(--hb-qm8-d);
  pointer-events: none;
}
.hb-qm8-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8em;
}
.hb-qm8-tag {
  padding: 0.22em 0.7em;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.4);
  font-size: 0.68em;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #fff;
}
.hb-qm8-idx {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72em;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
}
.hb-qm8-main { position: relative; z-index: 1; }
.hb-qm8-title {
  margin: 0;
  font-size: 1.65em;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #fff;
}
.hb-qm8-text {
  max-width: 42ch;
  margin: 0.4em 0 0;
  font-size: 0.82em;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.72);
}
.hb-qm8-stat {
  position: relative;
  z-index: 1;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.86);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qm8-card { transform: none; will-change: auto; }
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

export function ScrollStickyStack({
  cards = defaultCards,
  top = 16,
  gap = 14,
  cardHeight = 0.62,
  minScale = 0.94,
  scroller,
  height,
  autoplay = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ScrollStickyStackProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const own = height !== undefined;
  const n = cards.length;
  const per = 1 - Math.min(1, Math.max(0.6, minScale));

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, "--hb-qm8-u", ({ top: vTop }) => {
    const list = listRef.current;
    if (!list) return;
    const els = list.children;
    const arrive: number[] = [0];
    for (let j = 1; j < els.length; j++) {
      const prev = els[j - 1] as HTMLElement;
      const next = els[j] as HTMLElement;
      const startY = vTop + top + (j - 1) * gap + prev.offsetHeight;
      const stuckY = vTop + top + j * gap;
      const q = clamp((startY - next.getBoundingClientRect().top) / Math.max(1, startY - stuckY));
      arrive.push(q);
    }
    for (let i = 0; i < els.length; i++) {
      let sum = 0;
      for (let j = i + 1; j < els.length; j++) sum += arrive[j];
      const el = els[i] as HTMLElement;
      el.style.setProperty("--hb-qm8-s", (1 - per * sum).toFixed(4));
      el.style.setProperty("--hb-qm8-d", Math.min(0.5, sum * 0.16).toFixed(4));
    }
  });

  const body = (
    <div ref={listRef} className="hb-qm8-list">
      {cards.map((card, i) => (
        <article
          key={i}
          className="hb-qm8-card"
          style={
            {
              "--hb-qm8-i": i,
              "--hb-qm8-f": card.from ?? "#1e3a8a",
              "--hb-qm8-t": card.to ?? "#0f172a",
            } as React.CSSProperties
          }
        >
          <div className="hb-qm8-row">
            {card.tag ? <span className="hb-qm8-tag">{card.tag}</span> : <span />}
            <span className="hb-qm8-idx">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="hb-qm8-main">
            <h3 className="hb-qm8-title">{card.title}</h3>
            <p className="hb-qm8-text">{card.text}</p>
          </div>
          {card.stat ? <span className="hb-qm8-stat">{card.stat}</span> : <span />}
        </article>
      ))}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm8 ${className}`.trim()}
      style={
        {
          "--hb-qm8-a": accent,
          "--hb-qm8-top": `${top}px`,
          "--hb-qm8-gap": `${gap}px`,
          "--hb-qm8-ch": Math.min(1, Math.max(0.2, cardHeight)),
          ...(own ? { "--hb-qm8-u": typeof height === "number" ? `${height}px` : height } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-sticky-stack" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm8-vp"
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

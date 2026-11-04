"use client";

import * as React from "react";

export interface ScrollPinStep {
  title: string;
  text: string;
  visual?: React.ReactNode;
}

export interface ScrollPinStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: ScrollPinStep[];
  scroller?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  height?: number | string;
  autoplay?: boolean;
  accent?: string;
  stepLength?: number;
  onStepChange?: (index: number) => void;
}

type Scroller = React.RefObject<HTMLElement | null> | HTMLElement | null;

interface Frame {
  sc: HTMLElement | null;
  top: number;
  vh: number;
}

const defaultSteps: ScrollPinStep[] = [
  {
    title: "Capture",
    text: "Drop in notes, links and files from anywhere. Everything lands in one inbox.",
  },
  {
    title: "Organize",
    text: "Smart folders sort the pile by project, person and date without any tagging.",
  },
  {
    title: "Share",
    text: "Send a live page to the team. Edits sync for everyone as they happen.",
  },
  {
    title: "Review",
    text: "A weekly digest shows what moved forward and what is still stuck.",
  },
];

const icons = [
  "M12 2.5 3 7.5l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16.5l9 5 9-5",
  "M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12L13 2Z",
  "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  "M4 12.5 9.5 18 20 6.5",
];

const css = `
.hb-qm3 {
  --hb-qm3-a: #2f7bff;
  --hb-qm3-p: 0;
  --hb-qm3-u: 100vh;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-qm3, .hb-qm3 * { box-sizing: border-box; }
.hb-qm3-vp {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
  outline: none;
}
.hb-qm3-vp:focus-visible { outline: 2px solid var(--hb-qm3-a); outline-offset: -2px; }
.hb-qm3-track { position: relative; width: 100%; }
.hb-qm3-stage {
  position: sticky;
  top: 0;
  height: var(--hb-qm3-u);
  overflow: hidden;
  container-type: inline-size;
  background: var(--hb-qm3-bg, #0a0a0a);
}
.hb-qm3-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 1.3em;
  height: 100%;
  padding: 1.4em 1.5em 3em;
}
.hb-qm3-copy { display: grid; min-width: 0; }
.hb-qm3-item {
  grid-area: 1 / 1;
  align-self: center;
  opacity: 0;
  transform: translate3d(0, 16px, 0);
  transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}
.hb-qm3-item[data-state="past"] { transform: translate3d(0, -16px, 0); }
.hb-qm3-item[data-state="on"] { opacity: 1; transform: none; pointer-events: auto; }
.hb-qm3-num {
  display: block;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  color: color-mix(in srgb, var(--hb-qm3-a) 70%, #fff);
}
.hb-qm3-title {
  margin: 0.55em 0 0.4em;
  font-size: 1.75em;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #f4f4f4;
}
.hb-qm3-text {
  max-width: 32ch;
  margin: 0;
  font-size: 0.9em;
  line-height: 1.5;
  color: #a1a1a1;
}
.hb-qm3-art {
  display: grid;
  width: clamp(5.5em, 34cqw, 16em);
  aspect-ratio: 1;
}
.hb-qm3-panel {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.95em;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 1.1em;
  background: radial-gradient(120% 100% at 30% 0%, color-mix(in srgb, var(--hb-qm3-a) 26%, #111111) 0%, #0f0f0f 70%);
  opacity: 0;
  transform: scale(0.9) translate3d(0, 10px, 0);
  transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qm3-panel[data-on="true"] { opacity: 1; transform: none; }
.hb-qm3-plate {
  display: grid;
  place-items: center;
  width: 3.4em;
  height: 3.4em;
  border: 1px solid color-mix(in srgb, var(--hb-qm3-a) 45%, #262626);
  border-radius: 1em;
  background: color-mix(in srgb, var(--hb-qm3-a) 22%, #141414);
  filter: hue-rotate(var(--hb-qm3-h, 0deg));
}
.hb-qm3-plate svg {
  width: 1.7em;
  height: 1.7em;
  fill: none;
  stroke: color-mix(in srgb, var(--hb-qm3-a) 60%, #fff);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qm3-bars { display: grid; gap: 0.38em; width: 62%; }
.hb-qm3-bars i {
  display: block;
  height: 0.3em;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}
.hb-qm3-bars i:first-child { background: color-mix(in srgb, var(--hb-qm3-a) 55%, transparent); }
.hb-qm3-dots {
  position: absolute;
  left: 1.7em;
  bottom: 1.15em;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.45em;
}
.hb-qm3-dot {
  position: relative;
  appearance: none;
  width: 0.45em;
  height: 0.45em;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #3a3a3a;
  cursor: pointer;
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease;
}
.hb-qm3-dot::after { content: ""; position: absolute; inset: -0.7em -0.3em; }
.hb-qm3-dot[aria-current="step"] { width: 1.7em; background: var(--hb-qm3-a); }
.hb-qm3-dot:focus-visible { outline: 2px solid var(--hb-qm3-a); outline-offset: 3px; }
.hb-qm3-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
}
.hb-qm3-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-qm3-a);
  transform: scaleX(var(--hb-qm3-p));
  transform-origin: left center;
}
@container (max-width: 260px) {
  .hb-qm3-body { grid-template-columns: minmax(0, 1fr); }
  .hb-qm3-art { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qm3-item, .hb-qm3-panel, .hb-qm3-dot { transition: none; }
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

export function ScrollPinSteps({
  steps = defaultSteps,
  scroller,
  height,
  autoplay = false,
  accent = "#2f7bff",
  stepLength = 0.9,
  onStepChange,
  className = "",
  style,
  ...rest
}: ScrollPinStepsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const lastStep = React.useRef(0);
  const changeRef = React.useRef(onStepChange);
  const [active, setActive] = React.useState(0);
  const own = height !== undefined;
  const n = Math.max(1, steps.length);

  React.useEffect(() => {
    changeRef.current = onStepChange;
  });

  useAutoScroll(viewportRef, own && autoplay);
  useScrollFrame(rootRef, viewportRef, scroller, own, "--hb-qm3-u", ({ top, vh }) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const span = rect.height - vh;
    const p = span > 0 ? clamp((top - rect.top) / span) : 0;
    rootRef.current?.style.setProperty("--hb-qm3-p", p.toFixed(4));
    const idx = Math.min(n - 1, Math.floor(p * n));
    if (idx !== lastStep.current) {
      lastStep.current = idx;
      setActive(idx);
      changeRef.current?.(idx);
    }
  });

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const sc = own ? viewportRef.current : pick(scroller);
    const vh = sc ? sc.clientHeight : window.innerHeight;
    const top = sc ? sc.getBoundingClientRect().top : 0;
    const rect = track.getBoundingClientRect();
    const span = rect.height - vh;
    const base = (sc ? sc.scrollTop : window.scrollY) + rect.top - top;
    const target = base + span * ((i + 0.5) / n);
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    if (sc) sc.scrollTo({ top: target, behavior });
    else window.scrollTo({ top: target, behavior });
  };

  const pad = (v: number) => String(v).padStart(2, "0");

  const body = (
    <div
      ref={trackRef}
      className="hb-qm3-track"
      style={{ height: `calc(var(--hb-qm3-u) * ${(1 + n * stepLength).toFixed(3)})` }}
    >
      <div className="hb-qm3-stage">
        <div className="hb-qm3-body">
          <div className="hb-qm3-copy">
            {steps.map((step, i) => (
              <div
                key={i}
                className="hb-qm3-item"
                data-state={i === active ? "on" : i < active ? "past" : "next"}
                aria-hidden={i === active ? undefined : true}
              >
                <span className="hb-qm3-num">
                  {pad(i + 1)} / {pad(n)}
                </span>
                <h3 className="hb-qm3-title">{step.title}</h3>
                <p className="hb-qm3-text">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="hb-qm3-art" aria-hidden="true">
            {steps.map((step, i) => (
              <div key={i} className="hb-qm3-panel" data-on={i === active}>
                {step.visual ?? (
                  <>
                    <div className="hb-qm3-plate" style={{ "--hb-qm3-h": `${i * 34}deg` } as React.CSSProperties}>
                      <svg viewBox="0 0 24 24">
                        <path d={icons[i % icons.length]} />
                      </svg>
                    </div>
                    <div className="hb-qm3-bars">
                      <i style={{ width: `${46 + ((i * 17) % 40)}%` }} />
                      <i style={{ width: `${82 - ((i * 13) % 30)}%` }} />
                      <i style={{ width: `${56 + ((i * 23) % 36)}%` }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="hb-qm3-dots">
          {steps.map((step, i) => (
            <button
              key={i}
              type="button"
              className="hb-qm3-dot"
              aria-label={`Step ${i + 1}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="hb-qm3-line" aria-hidden="true" />
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`hb-qm3 ${className}`.trim()}
      style={
        {
          "--hb-qm3-a": accent,
          ...(own ? { "--hb-qm3-u": typeof height === "number" ? `${height}px` : height } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-pin-steps" precedence="default">
        {css}
      </style>
      {own ? (
        <div
          ref={viewportRef}
          className="hb-qm3-vp"
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

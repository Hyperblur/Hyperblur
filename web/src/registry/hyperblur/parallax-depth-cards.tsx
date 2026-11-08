"use client";

import * as React from "react";

export interface DepthCard {
  label: string;
  value: string;
  detail?: string;
  tone?: "stat" | "chip" | "note" | "chart";
  depth?: number;
  x?: number;
  y?: number;
  rotate?: number;
}

export interface ParallaxDepthCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: DepthCard[];
  mode?: "inner" | "page";
  height?: number;
  length?: number;
  range?: number;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  accent?: string;
}

const defaultCards: DepthCard[] = [
  { label: "Monthly revenue", value: "$84,210", detail: "+12.4% vs Oct", tone: "stat", depth: 0.7, x: 6, y: 16, rotate: -4 },
  { label: "Active seats", value: "1,284", tone: "chip", depth: 0.35, x: 72, y: 8, rotate: 3 },
  { label: "api-gateway", value: "Deploy succeeded", detail: "2m 14s / main", tone: "note", depth: 1, x: 66, y: 66, rotate: 4 },
  { label: "Weekly signups", value: "312", tone: "chart", depth: 0.9, x: 4, y: 64, rotate: -3 },
  { label: "Churn", value: "1.8%", tone: "chip", depth: 0.25, x: 40, y: 84, rotate: -2 },
  { label: "NPS", value: "62", tone: "chip", depth: 0.5, x: 84, y: 40, rotate: 6 },
];

const bars = [0.42, 0.55, 0.48, 0.7, 0.62, 0.86, 0.78];

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
}

function useParallaxProgress(
  root: React.RefObject<HTMLDivElement | null>,
  viewport: React.RefObject<HTMLDivElement | null>,
  variable: string,
  options: { mode: "inner" | "page"; progress?: number; autoPlay: boolean; duration: number },
) {
  const { mode, progress, autoPlay, duration } = options;
  React.useEffect(() => {
    const el = root.current;
    const vp = viewport.current;
    if (!el || !vp) return;
    let current = 0;
    const set = (p: number) => {
      current = clamp(p);
      el.style.setProperty(variable, current.toFixed(4));
    };
    if (progress !== undefined) {
      set(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    const pageScroller = mode === "page" ? scrollParent(el) : null;
    const fromScroll = () => {
      if (mode === "inner") {
        const max = vp.scrollHeight - vp.clientHeight;
        set(max > 0 ? vp.scrollTop / max : 0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const top = pageScroller ? pageScroller.getBoundingClientRect().top : 0;
      const view = pageScroller ? pageScroller.clientHeight : window.innerHeight;
      const travel = rect.height - view;
      set(travel > 0 ? (top - rect.top) / travel : top >= rect.top ? 1 : 0);
    };
    let raf = 0;
    let visible = true;
    let held = false;
    let phase = 0;
    let last = 0;
    const target: HTMLElement | Window = mode === "inner" ? vp : pageScroller ?? window;
    const onScroll = () => {
      if (!autoPlay || held) fromScroll();
    };
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (held || !visible) return;
      phase = (phase + dt / duration) % 1;
      set(ease(phase < 0.5 ? phase * 2 : 2 - phase * 2));
    };
    const onEnter = () => {
      if (mode !== "inner") return;
      held = true;
      const max = vp.scrollHeight - vp.clientHeight;
      vp.scrollTop = current * max;
    };
    const onLeave = () => {
      if (!held) return;
      held = false;
      phase = current * 0.5;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (autoPlay) {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("focusin", onEnter);
      el.addEventListener("focusout", onLeave);
      raf = requestAnimationFrame(loop);
    } else {
      fromScroll();
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
    };
  }, [root, viewport, variable, mode, progress, autoPlay, duration]);
}

const css = `
.hb-vl4 {
  --hb-vl4-p: 0;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl4 *, .hb-vl4 *::before, .hb-vl4 *::after { box-sizing: border-box; }
.hb-vl4-vp { position: relative; width: 100%; }
.hb-vl4[data-mode="inner"] .hb-vl4-vp {
  height: var(--hb-vl4-h);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  border-radius: 20px;
}
.hb-vl4[data-mode="inner"] .hb-vl4-vp::-webkit-scrollbar { display: none; }
.hb-vl4-track { position: relative; height: calc(var(--hb-vl4-h) * var(--hb-vl4-len)); }
.hb-vl4-stage {
  position: sticky;
  top: 0;
  height: var(--hb-vl4-h);
  overflow: hidden;
  border-radius: 20px;
  background:
    radial-gradient(60% 50% at 50% 50%, color-mix(in srgb, var(--hb-vl4-a) 18%, transparent), transparent 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0d;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  container-type: size;
  perspective: 900px;
}
.hb-vl4-copy {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  width: min(86%, 520px);
  text-align: center;
  transform: translate(-50%, -50%) scale(calc(0.94 + var(--hb-vl4-p) * 0.08));
}
.hb-vl4-eye {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 2.4cqh, 11px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a1a1a1;
}
.hb-vl4-eye::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--hb-vl4-a); }
.hb-vl4-title {
  margin: 0;
  font-size: clamp(18px, 9cqh, 46px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.hb-vl4-sub {
  margin: 8px auto 0;
  max-width: 40ch;
  font-size: clamp(11px, 3.4cqh, 15px);
  line-height: 1.45;
  color: #a1a1a1;
}
.hb-vl4-c {
  position: absolute;
  left: var(--hb-vl4-x);
  top: var(--hb-vl4-y);
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(34, 34, 38, 0.92), rgba(20, 20, 23, 0.92));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.07), 0 18px 32px -16px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  font-size: clamp(9px, 2.6cqh, 12px);
  transform:
    translate3d(0, calc((0.5 - var(--hb-vl4-p)) * var(--hb-vl4-d) * var(--hb-vl4-r)), 0)
    scale(calc(0.7 + var(--hb-vl4-d) * 0.3))
    rotate(calc((0.5 - var(--hb-vl4-p)) * var(--hb-vl4-rot) * 2deg));
  filter: blur(calc((1 - var(--hb-vl4-d)) * 1.6px)) brightness(calc(0.55 + var(--hb-vl4-d) * 0.45));
  will-change: transform;
}
.hb-vl4-lab { color: #8f8f8f; }
.hb-vl4-val { font-size: 1.5em; font-weight: 600; letter-spacing: -0.02em; color: #ededed; }
.hb-vl4-det { color: #7fd99a; font-family: var(--font-mono, ui-monospace, monospace); font-size: 0.9em; }
.hb-vl4-c[data-tone="chip"] { flex-direction: row; align-items: baseline; gap: 6px; padding: 6px 10px; border-radius: 999px; }
.hb-vl4-c[data-tone="chip"] .hb-vl4-val { font-size: 1.15em; }
.hb-vl4-c[data-tone="note"] { flex-direction: row; align-items: center; gap: 8px; }
.hb-vl4-ok {
  display: grid;
  place-items: center;
  width: 2.2em;
  height: 2.2em;
  border-radius: 8px;
  background: color-mix(in srgb, #3ccf7a 18%, transparent);
  color: #5fe39a;
}
.hb-vl4-note { display: flex; flex-direction: column; gap: 1px; }
.hb-vl4-note .hb-vl4-val { font-size: 1.1em; }
.hb-vl4-note .hb-vl4-det { color: #8f8f8f; }
.hb-vl4-bars { display: flex; align-items: flex-end; gap: 3px; height: 2.6em; margin-top: 4px; }
.hb-vl4-bars span {
  width: 0.7em;
  height: calc(var(--hb-vl4-b) * 100%);
  border-radius: 2px 2px 1px 1px;
  background: linear-gradient(180deg, var(--hb-vl4-a), color-mix(in srgb, var(--hb-vl4-a) 35%, transparent));
}
.hb-vl4-bars span:last-child { background: #ededed; }
@media (prefers-reduced-motion: reduce) {
  .hb-vl4-c { will-change: auto; }
}
`;

export function ParallaxDepthCards({
  eyebrow = "Live workspace",
  title = "Every number your team watches, in one place.",
  subtitle = "Revenue, deploys and signups update the moment they change.",
  cards = defaultCards,
  mode = "inner",
  height = 440,
  length = 2.4,
  range = 260,
  progress,
  autoPlay = false,
  duration = 9000,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ParallaxDepthCardsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const vpRef = React.useRef<HTMLDivElement>(null);
  useParallaxProgress(rootRef, vpRef, "--hb-vl4-p", { mode, progress, autoPlay, duration });
  const trackLength = mode === "page" && autoPlay ? 1 : length;

  return (
    <div
      ref={rootRef}
      className={["hb-vl4", className].filter(Boolean).join(" ")}
      data-mode={mode}
      style={
        {
          "--hb-vl4-a": accent,
          "--hb-vl4-h": `${height}px`,
          "--hb-vl4-len": trackLength,
          "--hb-vl4-r": `${range}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-parallax-depth-cards" precedence="default">{css}</style>
      <div ref={vpRef} className="hb-vl4-vp" tabIndex={mode === "inner" ? 0 : undefined} aria-label={mode === "inner" ? title : undefined} role={mode === "inner" ? "region" : undefined}>
        <div className="hb-vl4-track">
          <div className="hb-vl4-stage">
            {cards.map((card, i) => (
              <div
                key={card.label + i}
                className="hb-vl4-c"
                data-tone={card.tone ?? "stat"}
                aria-hidden="true"
                style={
                  {
                    "--hb-vl4-x": `${card.x ?? 10}%`,
                    "--hb-vl4-y": `${card.y ?? 10}%`,
                    "--hb-vl4-d": card.depth ?? 0.6,
                    "--hb-vl4-rot": card.rotate ?? 0,
                    zIndex: (card.depth ?? 0.6) >= 0.75 ? 3 : 1,
                  } as React.CSSProperties
                }
              >
                {card.tone === "note" ? (
                  <>
                    <span className="hb-vl4-ok">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="hb-vl4-note">
                      <span className="hb-vl4-val">{card.value}</span>
                      <span className="hb-vl4-det">
                        {card.label}
                        {card.detail ? ` / ${card.detail}` : ""}
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hb-vl4-lab">{card.label}</span>
                    <span className="hb-vl4-val">{card.value}</span>
                    {card.detail && <span className="hb-vl4-det">{card.detail}</span>}
                    {card.tone === "chart" && (
                      <span className="hb-vl4-bars">
                        {bars.map((b, j) => (
                          <span key={j} style={{ "--hb-vl4-b": b } as React.CSSProperties} />
                        ))}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="hb-vl4-copy">
              {eyebrow && <p className="hb-vl4-eye">{eyebrow}</p>}
              <h2 className="hb-vl4-title">{title}</h2>
              {subtitle && <p className="hb-vl4-sub">{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

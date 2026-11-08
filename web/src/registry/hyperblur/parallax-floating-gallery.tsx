"use client";

import * as React from "react";

export interface FloatingTile {
  title: string;
  colors?: [string, string, string];
  shape?: "sun" | "dune" | "tide" | "orb";
  tall?: boolean;
}

export interface ParallaxFloatingGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles?: FloatingTile[];
  eyebrow?: string;
  title?: string;
  cta?: string;
  onCtaClick?: () => void;
  onTileClick?: (tile: FloatingTile, index: number) => void;
  mode?: "inner" | "page";
  height?: number;
  length?: number;
  range?: number;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  accent?: string;
}

const defaultTiles: FloatingTile[] = [
  { title: "Low tide, Cornwall", colors: ["#1e3a5f", "#f0a37a", "#ffe2b8"], shape: "tide", tall: true },
  { title: "Dune 45, 6:12 am", colors: ["#3b1a2e", "#ff9466", "#ffd9a0"], shape: "dune" },
  { title: "Harbour light", colors: ["#0f2633", "#4fa3b8", "#e8fbff"], shape: "orb" },
  { title: "Salt pans", colors: ["#2b2350", "#e7a0c4", "#fff1f7"], shape: "sun", tall: true },
  { title: "Fog bank", colors: ["#1c2a2a", "#8fb5a8", "#f2fff9"], shape: "tide" },
  { title: "Last ferry", colors: ["#2a160c", "#e0773b", "#ffe6c2"], shape: "sun" },
  { title: "Kelp forest", colors: ["#0c2a22", "#3fae86", "#d6ffef"], shape: "orb", tall: true },
  { title: "Blue hour pier", colors: ["#141a3d", "#5b6fd6", "#dfe4ff"], shape: "dune" },
];

const speeds = [-1, 0.55, -0.35, 0.85, -0.6];

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
.hb-vl6 {
  --hb-vl6-p: 0;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl6 *, .hb-vl6 *::before, .hb-vl6 *::after { box-sizing: border-box; }
.hb-vl6[data-mode="inner"] .hb-vl6-vp {
  height: var(--hb-vl6-h);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  border-radius: 20px;
}
.hb-vl6[data-mode="inner"] .hb-vl6-vp::-webkit-scrollbar { display: none; }
.hb-vl6-vp:focus-visible { outline: 2px solid var(--hb-vl6-a); outline-offset: 2px; }
.hb-vl6-track { height: calc(var(--hb-vl6-h) * var(--hb-vl6-len)); }
.hb-vl6-stage {
  position: sticky;
  top: 0;
  height: var(--hb-vl6-h);
  overflow: hidden;
  border-radius: 20px;
  background: #09090b;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  container-type: size;
}
.hb-vl6-cols {
  position: absolute;
  inset: 0 -4%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(6px, 2.4cqw, 14px);
  transform: rotate(-6deg) scale(1.12);
}
.hb-vl6-col {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 2.4cqw, 14px);
  margin-top: calc(var(--hb-vl6-r) * -1);
  transform: translate3d(0, calc((var(--hb-vl6-p) - 0.5) * var(--hb-vl6-s) * var(--hb-vl6-r)), 0);
  will-change: transform;
}
.hb-vl6-col:nth-child(5) { display: none; }
@container (min-width: 620px) {
  .hb-vl6-cols { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .hb-vl6-col:nth-child(5) { display: flex; }
}
.hb-vl6-t {
  position: relative;
  flex: none;
  width: 100%;
  aspect-ratio: 4 / 5;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: clamp(8px, 2.6cqw, 14px);
  background:
    linear-gradient(180deg, var(--hb-vl6-c0) 0%, var(--hb-vl6-c1) 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 30px -18px rgba(0, 0, 0, 0.9);
  color: inherit;
  font: inherit;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
}
.hb-vl6-t[data-tall="true"] { aspect-ratio: 3 / 5; }
.hb-vl6-t:hover, .hb-vl6-t:focus-visible { transform: translateY(-4px) scale(1.03); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 24px 40px -18px rgba(0, 0, 0, 1); }
.hb-vl6-t:focus-visible { outline: 2px solid var(--hb-vl6-a); outline-offset: 2px; }
.hb-vl6-t::before, .hb-vl6-t::after { content: ""; position: absolute; pointer-events: none; }
.hb-vl6-t[data-shape="sun"]::before {
  left: 50%;
  top: 40%;
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--hb-vl6-c2);
  box-shadow: 0 0 40px 10px color-mix(in srgb, var(--hb-vl6-c2) 45%, transparent);
  transform: translate(-50%, -50%);
}
.hb-vl6-t[data-shape="sun"]::after {
  inset: 58% 0 0 0;
  background: repeating-linear-gradient(180deg, color-mix(in srgb, var(--hb-vl6-c0) 85%, #000000) 0 6px, color-mix(in srgb, var(--hb-vl6-c1) 70%, #000000) 6px 8px);
}
.hb-vl6-t[data-shape="dune"]::before {
  inset: 50% -30% -40% -10%;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(160deg, var(--hb-vl6-c1), color-mix(in srgb, var(--hb-vl6-c0) 70%, #000000));
  transform: rotate(-8deg);
}
.hb-vl6-t[data-shape="dune"]::after {
  inset: 66% -20% -40% -40%;
  border-radius: 50% 50% 0 0;
  background: color-mix(in srgb, var(--hb-vl6-c0) 75%, #000000);
  transform: rotate(10deg);
}
.hb-vl6-t[data-shape="tide"]::before {
  inset: 0;
  background:
    radial-gradient(120% 40% at 50% 62%, color-mix(in srgb, var(--hb-vl6-c2) 70%, transparent), transparent 60%),
    repeating-linear-gradient(176deg, transparent 0 9px, color-mix(in srgb, var(--hb-vl6-c2) 30%, transparent) 9px 10px);
  mask-image: linear-gradient(180deg, transparent 50%, #000000 62%);
  -webkit-mask-image: linear-gradient(180deg, transparent 50%, #000000 62%);
}
.hb-vl6-t[data-shape="orb"]::before {
  left: 18%;
  top: 22%;
  width: 64%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, var(--hb-vl6-c2), var(--hb-vl6-c1) 45%, color-mix(in srgb, var(--hb-vl6-c0) 70%, #000000) 80%);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.6);
}
.hb-vl6-t[data-shape="orb"]::after {
  left: 10%;
  right: 10%;
  bottom: 12%;
  height: 6%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  filter: blur(4px);
}
.hb-vl6-cap {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 1;
  overflow: hidden;
  font-size: clamp(9px, 2.2cqw, 11px);
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl6-t:hover .hb-vl6-cap, .hb-vl6-t:focus-visible .hb-vl6-cap { opacity: 1; transform: none; }
.hb-vl6-veil {
  position: absolute;
  inset: 0;
  background: radial-gradient(48% 46% at 50% 50%, rgba(9, 9, 11, 0.92), rgba(9, 9, 11, 0.55) 60%, rgba(9, 9, 11, 0) 100%);
  pointer-events: none;
}
.hb-vl6-copy {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 2cqh, 10px);
  width: min(80%, 440px);
  text-align: center;
  transform: translate(-50%, -50%);
}
.hb-vl6-eye {
  margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 2.6cqh, 11px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #a1a1a1;
}
.hb-vl6-title {
  margin: 0;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(17px, 8cqh, 44px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
.hb-vl6-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  padding: clamp(5px, 1.8cqh, 9px) clamp(10px, 3.4cqh, 16px);
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: clamp(10px, 3cqh, 13px);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 24px -8px rgba(255, 255, 255, 0.35);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.hb-vl6-cta:hover { transform: translateY(-1px); background: #ffffff; }
.hb-vl6-cta:active { transform: scale(0.97); }
.hb-vl6-cta:focus-visible { outline: 2px solid var(--hb-vl6-a); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vl6 *, .hb-vl6 *::before, .hb-vl6 *::after { transition: none !important; }
  .hb-vl6-col { will-change: auto; }
}
`;

export function ParallaxFloatingGallery({
  tiles = defaultTiles,
  eyebrow = "Field notes / 48 photographs",
  title = "The coast at the edges of the day",
  cta = "Open the gallery",
  onCtaClick,
  onTileClick,
  mode = "inner",
  height = 460,
  length = 2.6,
  range = 220,
  progress,
  autoPlay = false,
  duration = 14000,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ParallaxFloatingGalleryProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const vpRef = React.useRef<HTMLDivElement>(null);
  useParallaxProgress(rootRef, vpRef, "--hb-vl6-p", { mode, progress, autoPlay, duration });
  const trackLength = mode === "page" && autoPlay ? 1 : length;
  const columns = 5;
  const perColumn = 4;
  const count = Math.max(tiles.length, 1);

  return (
    <div
      ref={rootRef}
      className={["hb-vl6", className].filter(Boolean).join(" ")}
      data-mode={mode}
      style={
        {
          "--hb-vl6-a": accent,
          "--hb-vl6-h": `${height}px`,
          "--hb-vl6-len": trackLength,
          "--hb-vl6-r": `${range}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-parallax-floating-gallery" precedence="default">{css}</style>
      <div
        ref={vpRef}
        className="hb-vl6-vp"
        tabIndex={mode === "inner" ? 0 : undefined}
        role={mode === "inner" ? "region" : undefined}
        aria-label={mode === "inner" ? title : undefined}
      >
        <div className="hb-vl6-track">
          <div className="hb-vl6-stage">
            <div className="hb-vl6-cols">
              {Array.from({ length: columns }, (_, c) => (
                <div key={c} className="hb-vl6-col" style={{ "--hb-vl6-s": speeds[c % speeds.length] } as React.CSSProperties}>
                  {Array.from({ length: perColumn }, (_, r) => {
                    const index = (c * 3 + r * 5) % count;
                    const tile = tiles[index];
                    const [c0, c1, c2] = tile.colors ?? ["#1e3a5f", "#f0a37a", "#ffe2b8"];
                    return (
                      <button
                        key={r}
                        type="button"
                        className="hb-vl6-t"
                        data-shape={tile.shape ?? "sun"}
                        data-tall={tile.tall ? "true" : "false"}
                        aria-label={tile.title}
                        tabIndex={r === 1 ? 0 : -1}
                        style={{ "--hb-vl6-c0": c0, "--hb-vl6-c1": c1, "--hb-vl6-c2": c2 } as React.CSSProperties}
                        onClick={() => onTileClick?.(tile, index)}
                      >
                        <span className="hb-vl6-cap">{tile.title}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="hb-vl6-veil" />
            <div className="hb-vl6-copy">
              {eyebrow && <p className="hb-vl6-eye">{eyebrow}</p>}
              <h2 className="hb-vl6-title">{title}</h2>
              {cta && (
                <button type="button" className="hb-vl6-cta" onClick={onCtaClick}>
                  {cta}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";

export interface StickyCaptionStep {
  kicker?: string;
  title: string;
  text: string;
  focus?: { x: number; y: number; zoom?: number };
}

export interface ParallaxStickyCaptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: StickyCaptionStep[];
  art?: React.ReactNode;
  mode?: "inner" | "page";
  height?: number;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  accent?: string;
  onStepChange?: (index: number) => void;
}

const defaultSteps: StickyCaptionStep[] = [
  { kicker: "Cover glass", title: "Sapphire that shrugs off keys", text: "A 0.4 mm sapphire window with an anti-glare coating sits flush with the frame.", focus: { x: 50, y: 22, zoom: 1.35 } },
  { kicker: "Lens stack", title: "Seven elements, one focal plane", text: "Aspherical glass keeps corners sharp at f/1.8 from edge to edge.", focus: { x: 50, y: 41, zoom: 1.35 } },
  { kicker: "Sensor", title: "A 1-inch stacked sensor", text: "Larger pixels collect 2.3 times the light, so night shots stay clean.", focus: { x: 50, y: 60, zoom: 1.35 } },
  { kicker: "Logic board", title: "Processed before you lift a finger", text: "A dedicated image core merges nine frames in under 40 ms.", focus: { x: 50, y: 79, zoom: 1.35 } },
];

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

function useStickyProgress(
  root: React.RefObject<HTMLDivElement | null>,
  viewport: React.RefObject<HTMLDivElement | null>,
  options: { mode: "inner" | "page"; progress?: number; autoPlay: boolean; duration: number; onValue: (p: number) => void },
) {
  const { mode, progress, autoPlay, duration } = options;
  const onValue = React.useRef(options.onValue);
  React.useEffect(() => {
    onValue.current = options.onValue;
  });
  React.useEffect(() => {
    const el = root.current;
    const vp = viewport.current;
    if (!el || !vp) return;
    let current = 0;
    const set = (p: number) => {
      current = clamp(p);
      el.style.setProperty("--hb-vl5-p", current.toFixed(4));
      onValue.current(current);
    };
    if (progress !== undefined) {
      el.style.setProperty("--hb-vl5-p", clamp(progress).toFixed(4));
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
      const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2;
      set(ease(tri));
    };
    const onEnter = () => {
      if (mode !== "inner") return;
      held = true;
      vp.scrollTop = current * (vp.scrollHeight - vp.clientHeight);
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
  }, [root, viewport, mode, progress, autoPlay, duration]);
}

function ModuleArt({ active, uid }: { active: number; uid: string }) {
  const plate = (cy: number) => `M150 ${cy - 34} L262 ${cy} L150 ${cy + 34} L38 ${cy} Z`;
  const side = (cy: number) => `M38 ${cy} L150 ${cy + 34} L262 ${cy} L262 ${cy + 8} L150 ${cy + 42} L38 ${cy + 8} Z`;
  const layers = [66, 123, 180, 237];
  return (
    <svg viewBox="0 0 300 300" className="hb-vl5-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#9fc4ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.28" />
        </linearGradient>
        <radialGradient id={`${uid}-lens`} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#7fb3ff" />
          <stop offset="0.6" stopColor="#1b2a55" />
          <stop offset="1" stopColor="#0a0f1f" />
        </radialGradient>
      </defs>
      <line x1="150" y1="40" x2="150" y2="280" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 5" />
      {layers
        .map((cy, i) => ({ cy, i }))
        .reverse()
        .map(({ cy, i }) => (
          <g key={i} className="hb-vl5-layer" data-on={i === active ? "true" : "false"}>
            <path d={side(cy)} fill="#141418" stroke="rgba(255,255,255,0.08)" />
            <path d={plate(cy)} className="hb-vl5-plate" fill={i === 0 ? `url(#${uid}-glass)` : "#1b1b20"} />
            {i === 1 && (
              <g>
                <ellipse cx="150" cy={cy} rx="54" ry="17" fill="#0c0c10" />
                <ellipse cx="150" cy={cy} rx="42" ry="13" fill={`url(#${uid}-lens)`} />
                <ellipse cx="150" cy={cy} rx="24" ry="7.5" fill="none" stroke="rgba(255,255,255,0.35)" />
                <ellipse cx="141" cy={cy - 4} rx="7" ry="2.4" fill="#ffffff" opacity="0.7" />
              </g>
            )}
            {i === 2 && (
              <g>
                <path d={`M150 ${cy - 19} L212 ${cy} L150 ${cy + 19} L88 ${cy} Z`} fill="#2a1f3d" stroke="rgba(190,160,255,0.5)" />
                {[0, 1, 2, 3, 4].map((k) => (
                  <path
                    key={k}
                    d={`M${(88 + k * 15.5).toFixed(1)} ${(cy + k * 4.75).toFixed(1)} L${(150 + k * 15.5).toFixed(1)} ${(cy - 19 + k * 4.75).toFixed(1)}`}
                    stroke="rgba(190,160,255,0.35)"
                  />
                ))}
              </g>
            )}
            {i === 3 && (
              <g>
                <path d={`M118 ${cy - 6} L146 ${cy + 4} L126 ${cy + 11} L98 ${cy + 1} Z`} fill="#2b2b33" />
                <path d={`M160 ${cy - 14} L196 ${cy - 2} L178 ${cy + 4} L142 ${cy - 8} Z`} fill="#33333c" />
                <path d={`M190 ${cy + 6} L210 ${cy + 13} L200 ${cy + 17} L180 ${cy + 10} Z`} fill="#d9a441" />
                <path d={`M70 ${cy} L110 ${cy - 14} M200 ${cy - 20} L236 ${cy - 6}`} stroke="#3ccf7a" strokeOpacity="0.6" />
              </g>
            )}
            <path d={plate(cy)} className="hb-vl5-ring" fill="none" />
          </g>
        ))}
    </svg>
  );
}

const css = `
.hb-vl5 {
  --hb-vl5-p: 0;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl5 *, .hb-vl5 *::before, .hb-vl5 *::after { box-sizing: border-box; }
.hb-vl5[data-mode="inner"] .hb-vl5-vp {
  height: var(--hb-vl5-h);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  border-radius: 20px;
}
.hb-vl5[data-mode="inner"] .hb-vl5-vp::-webkit-scrollbar { display: none; }
.hb-vl5-vp:focus-visible { outline: 2px solid var(--hb-vl5-a); outline-offset: 2px; }
.hb-vl5-track { height: calc(var(--hb-vl5-h) * var(--hb-vl5-len)); }
.hb-vl5-stage {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  height: var(--hb-vl5-h);
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(180deg, #101013, #0a0a0b);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  container-type: size;
}
.hb-vl5-media {
  position: relative;
  overflow: hidden;
  background: radial-gradient(70% 60% at 50% 50%, color-mix(in srgb, var(--hb-vl5-a) 16%, transparent), transparent 72%);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}
.hb-vl5-frame {
  position: absolute;
  inset: 0;
  transform-origin: var(--hb-vl5-fx) var(--hb-vl5-fy);
  transform: translate(calc(50% - var(--hb-vl5-fx)), calc(50% - var(--hb-vl5-fy))) scale(var(--hb-vl5-fz));
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1), transform-origin 0.9s cubic-bezier(0.65, 0, 0.35, 1);
}
.hb-vl5-svg { display: block; width: 100%; height: 100%; }
.hb-vl5-layer { transition: opacity 0.5s ease; opacity: 0.32; }
.hb-vl5-layer[data-on="true"] { opacity: 1; }
.hb-vl5-ring { stroke: var(--hb-vl5-a); stroke-width: 1.5; opacity: 0; transition: opacity 0.4s ease; }
.hb-vl5-layer[data-on="true"] .hb-vl5-ring { opacity: 1; filter: drop-shadow(0 0 6px var(--hb-vl5-a)); }
.hb-vl5-tag {
  position: absolute;
  left: 12px;
  top: 12px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 2.6cqh, 11px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-vl5-side { position: relative; overflow: hidden; }
.hb-vl5-rail {
  position: absolute;
  left: clamp(12px, 5cqh, 22px);
  top: 18%;
  bottom: 18%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}
.hb-vl5-rail::after {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: calc(var(--hb-vl5-p) * 100%);
  background: var(--hb-vl5-a);
  box-shadow: 0 0 8px var(--hb-vl5-a);
}
.hb-vl5-list {
  position: absolute;
  inset: 0;
  transform: translateY(calc(var(--hb-vl5-p) * (var(--hb-vl5-n) - 1) * -100%));
}
.hb-vl5-cap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(3px, 1.6cqh, 8px);
  height: 100%;
  padding: 0 clamp(14px, 6cqh, 32px) 0 clamp(26px, 11cqh, 52px);
  opacity: 0.18;
  filter: blur(1.5px);
  transition: opacity 0.5s ease, filter 0.5s ease;
}
.hb-vl5-cap[data-on="true"] { opacity: 1; filter: none; }
.hb-vl5-kick {
  margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 2.6cqh, 11px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--hb-vl5-a);
}
.hb-vl5-title {
  margin: 0;
  font-size: clamp(14px, 5.6cqh, 26px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.hb-vl5-text {
  margin: 0;
  max-width: 34ch;
  font-size: clamp(11px, 3.4cqh, 14px);
  line-height: 1.5;
  color: #a1a1a1;
}
@container (max-height: 240px) {
  .hb-vl5-text { display: none; }
}
@container (max-width: 420px) and (min-height: 320px) {
  .hb-vl5-stage { grid-template-columns: 1fr; grid-template-rows: 1.2fr 1fr; }
  .hb-vl5-media { border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl5 *, .hb-vl5 *::before, .hb-vl5 *::after { transition: none !important; }
}
`;

export function ParallaxStickyCaptions({
  steps = defaultSteps,
  art,
  mode = "inner",
  height = 460,
  progress,
  autoPlay = false,
  duration = 12000,
  accent = "#2f7bff",
  onStepChange,
  className,
  style,
  ...rest
}: ParallaxStickyCaptionsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const vpRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/:/g, "");
  const n = Math.max(steps.length, 1);
  const toIndex = (p: number) => Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
  const [live, setLive] = React.useState(0);
  const liveRef = React.useRef(0);
  const changed = React.useRef(onStepChange);
  React.useEffect(() => {
    changed.current = onStepChange;
  });
  useStickyProgress(rootRef, vpRef, {
    mode,
    progress,
    autoPlay,
    duration,
    onValue: (p) => {
      const next = toIndex(p);
      if (next === liveRef.current) return;
      liveRef.current = next;
      setLive(next);
      changed.current?.(next);
    },
  });
  const active = progress !== undefined ? toIndex(progress) : live;
  const focus = steps[active]?.focus ?? { x: 50, y: 50, zoom: 1 };
  const trackLength = mode === "page" && autoPlay ? 1 : n * 0.9 + 0.4;

  return (
    <div
      ref={rootRef}
      className={["hb-vl5", className].filter(Boolean).join(" ")}
      data-mode={mode}
      style={
        {
          "--hb-vl5-a": accent,
          "--hb-vl5-h": `${height}px`,
          "--hb-vl5-n": n,
          "--hb-vl5-len": trackLength,
          "--hb-vl5-fx": `${focus.x}%`,
          "--hb-vl5-fy": `${focus.y}%`,
          "--hb-vl5-fz": focus.zoom ?? 1,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-parallax-sticky-captions" precedence="default">{css}</style>
      <div
        ref={vpRef}
        className="hb-vl5-vp"
        tabIndex={mode === "inner" ? 0 : undefined}
        role={mode === "inner" ? "region" : undefined}
        aria-label={mode === "inner" ? "Feature walkthrough" : undefined}
      >
        <div className="hb-vl5-track">
          <div className="hb-vl5-stage">
            <div className="hb-vl5-media">
              <div className="hb-vl5-frame">{art ?? <ModuleArt active={active} uid={uid} />}</div>
              <span className="hb-vl5-tag">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
            <div className="hb-vl5-side">
              <span className="hb-vl5-rail" aria-hidden="true" />
              <ol className="hb-vl5-list" style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {steps.map((step, i) => (
                  <li key={step.title + i} className="hb-vl5-cap" data-on={i === active ? "true" : "false"} aria-current={i === active ? "step" : undefined}>
                    {step.kicker && <p className="hb-vl5-kick">{step.kicker}</p>}
                    <h3 className="hb-vl5-title">{step.title}</h3>
                    <p className="hb-vl5-text">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

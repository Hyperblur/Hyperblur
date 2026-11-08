"use client";

import * as React from "react";

export interface StoryTabStep {
  label: string;
  title: string;
  body: string;
  points: string[];
}

export interface StepsStoryTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  steps?: StoryTabStep[];
  defaultStep?: number;
  step?: number;
  onStepChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
}

const defaultSteps: StoryTabStep[] = [
  { label: "Measure", title: "Sketch the room, or snap the floor plan", body: "Draw walls with your finger or photograph an existing plan. Roomwise straightens the lines and reads the dimensions for you.", points: ["Walls snap to 90 degrees", "Doors and windows detected", "Metric or imperial"] },
  { label: "Style", title: "Pick a mood from real palettes", body: "Swipe through palettes built from finished homes. Each one sets the wall color, wood tone and textiles together.", points: ["38 curated palettes", "Matches your existing sofa", "Swap any single color"] },
  { label: "Render", title: "See it in 3D before you lift a box", body: "The room rises in three dimensions with furniture at true scale, so you know the sideboard clears the radiator.", points: ["True-scale furniture", "Morning and evening light", "Walk-through on your phone"] },
  { label: "Order", title: "Order the whole room in one cart", body: "Every piece in the render is in stock from partner stores. One checkout, one delivery window, free returns for 60 days.", points: ["14 partner stores", "Single delivery window", "60-day returns"] },
];

const css = `
.hb-we5 {
  --hb-we5-accent: #f45d48;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #ffffff;
  color: #121212;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we5 *, .hb-we5 *::before, .hb-we5 *::after { box-sizing: border-box; }
.hb-we5-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we5-eyebrow { margin: 0 0 12px; color: var(--hb-we5-accent); font-size: 13px; font-weight: 600; }
.hb-we5-title { margin: 0; max-width: 22ch; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 48px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; text-wrap: balance; }
.hb-we5-tabs { display: grid; grid-template-columns: repeat(var(--hb-we5-n, 4), minmax(0, 1fr)); gap: clamp(8px, 1.4cqi, 16px); margin: clamp(28px, 4cqi, 44px) 0 clamp(20px, 3cqi, 32px); }
.hb-we5-tab { display: grid; gap: 10px; padding: 0 0 4px; border: 0; background: none; cursor: pointer; text-align: left; color: #8a8a8a; font: inherit; transition: color .25s ease; }
.hb-we5-tab:hover { color: #121212; }
.hb-we5-tab[aria-selected="true"] { color: #121212; }
.hb-we5-tab:focus-visible { outline: 2px solid var(--hb-we5-accent); outline-offset: 4px; border-radius: 4px; }
.hb-we5-track { position: relative; height: 4px; border-radius: 4px; background: #ececec; overflow: hidden; }
.hb-we5-track i { position: absolute; inset: 0; border-radius: inherit; background: #121212; transform-origin: left; transform: scaleX(0); font-style: normal; }
.hb-we5-tab[data-s="done"] .hb-we5-track i { transform: scaleX(1); }
.hb-we5-tab[data-s="active"] .hb-we5-track i { background: var(--hb-we5-accent); transform: scaleX(1); }
.hb-we5[data-play="true"] .hb-we5-tab[data-s="active"] .hb-we5-track i { animation: hb-we5-fill var(--hb-we5-dur, 4s) linear both; }
.hb-we5-tl { display: flex; align-items: baseline; gap: 8px; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; }
.hb-we5-tl span { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; font-weight: 500; color: #a3a3a3; }
.hb-we5-panel { display: grid; gap: clamp(24px, 4cqi, 48px); align-items: center; }
.hb-we5-copy { display: grid; gap: 16px; min-width: 0; }
.hb-we5-copy > * { animation: hb-we5-up .6s cubic-bezier(.2,.8,.2,1) both; }
.hb-we5-copy > *:nth-child(2) { animation-delay: 60ms; }
.hb-we5-copy > *:nth-child(3) { animation-delay: 120ms; }
.hb-we5-copy > *:nth-child(4) { animation-delay: 180ms; }
.hb-we5-big { font-family: var(--font-grotesk, inherit); font-size: clamp(56px, 9cqi, 104px); font-weight: 600; line-height: .8; letter-spacing: -.06em; color: transparent; -webkit-text-stroke: 1.5px #d6d6d6; }
.hb-we5-h { margin: 0; font-size: clamp(20px, 2.6cqi, 28px); font-weight: 600; line-height: 1.15; letter-spacing: -.025em; text-wrap: balance; }
.hb-we5-p { margin: 0; color: #5c5c5c; font-size: 15px; line-height: 1.65; max-width: 46ch; }
.hb-we5-pts { display: grid; gap: 10px; margin: 4px 0 0; padding: 0; list-style: none; }
.hb-we5-pts li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #2a2a2a; }
.hb-we5-pts svg { flex: none; width: 18px; height: 18px; color: var(--hb-we5-accent); }
.hb-we5-vis { position: relative; aspect-ratio: 5 / 4; border-radius: 26px; overflow: hidden; background: linear-gradient(160deg, #faf7f2, #f1ece3); box-shadow: inset 0 0 0 1px rgba(0,0,0,.06), 0 30px 60px -40px rgba(0,0,0,.35); min-width: 0; }
.hb-we5-vis svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-we5-scene { animation: hb-we5-scene .7s cubic-bezier(.2,.8,.2,1) both; }
.hb-we5-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-we5-draw 1.6s cubic-bezier(.65,0,.35,1) forwards; animation-delay: calc(var(--hb-we5-k, 0) * 140ms + 200ms); }
.hb-we5-dim { opacity: 0; animation: hb-we5-fade .5s ease forwards; animation-delay: calc(var(--hb-we5-k, 0) * 120ms + 1.3s); }
.hb-we5-swatch { transform-box: fill-box; transform-origin: 50% 100%; animation: hb-we5-fan .9s cubic-bezier(.3,1.3,.5,1) both; animation-delay: calc(var(--hb-we5-k) * 90ms + 150ms); }
.hb-we5-rise { transform-box: fill-box; transform-origin: 50% 100%; animation: hb-we5-rise .8s cubic-bezier(.3,1.4,.5,1) both; animation-delay: calc(var(--hb-we5-k) * 120ms + 200ms); }
.hb-we5-slide { animation: hb-we5-slide .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we5-k) * 130ms + 200ms); }
.hb-we5-pop { transform-box: fill-box; transform-origin: center; animation: hb-we5-pop .6s cubic-bezier(.3,1.6,.5,1) both; animation-delay: 1.05s; }
@keyframes hb-we5-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-we5-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hb-we5-scene { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
@keyframes hb-we5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-we5-fade { to { opacity: 1; } }
@keyframes hb-we5-fan { from { opacity: 0; transform: translateY(40px) rotate(0deg); } to { opacity: 1; transform: translateY(0) rotate(var(--hb-we5-r)); } }
@keyframes hb-we5-rise { from { opacity: 0; transform: scaleY(0); } to { opacity: 1; transform: scaleY(1); } }
@keyframes hb-we5-slide { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: none; } }
@keyframes hb-we5-pop { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: scale(1); } }
@container (min-width: 820px) {
  .hb-we5-panel { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); }
}
@container (max-width: 520px) {
  .hb-we5-tl span { display: none; }
  .hb-we5-tl { font-size: 12.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we5 *, .hb-we5 *::before, .hb-we5 *::after { transition: none !important; animation: none !important; }
  .hb-we5-draw { stroke-dashoffset: 0; }
  .hb-we5-dim { opacity: 1; }
  .hb-we5-swatch { transform: rotate(var(--hb-we5-r)); }
}
`;

function k(n: number, extra?: Record<string, string>) {
  return { "--hb-we5-k": n, ...extra } as React.CSSProperties;
}

function Scene({ index, accent }: { index: number; accent: string }) {
  const kind = index % 4;
  if (kind === 0) {
    return (
      <svg viewBox="0 0 500 400" className="hb-we5-scene" aria-hidden="true">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M ${40 + i * 35} 30 V 370`} stroke="rgba(0,0,0,.05)" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`h${i}`} d={`M 40 ${40 + i * 35} H 460`} stroke="rgba(0,0,0,.05)" />
        ))}
        <path className="hb-we5-draw" style={k(0)} pathLength={1} d="M 90 80 H 410 V 320 H 260 V 220 H 90 Z" fill="none" stroke="#121212" strokeWidth="6" strokeLinejoin="round" />
        <path className="hb-we5-draw" style={k(2)} pathLength={1} d="M 260 80 V 170" fill="none" stroke="#121212" strokeWidth="4" />
        <path className="hb-we5-draw" style={k(3)} pathLength={1} d="M 150 220 A 40 40 0 0 1 190 180" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="4 5" />
        <path className="hb-we5-draw" style={k(4)} pathLength={1} d="M 330 80 H 380" fill="none" stroke="#7ab8ff" strokeWidth="8" />
        <g className="hb-we5-dim" style={k(0)}>
          <path d="M 90 60 H 410" stroke={accent} strokeWidth="1.5" />
          <path d="M 90 54 V 66 M 410 54 V 66" stroke={accent} strokeWidth="1.5" />
          <rect x="218" y="48" width="64" height="22" rx="11" fill={accent} />
          <text x="250" y="63" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="inherit">6.40 m</text>
        </g>
        <g className="hb-we5-dim" style={k(1)}>
          <path d="M 430 80 V 320" stroke={accent} strokeWidth="1.5" />
          <rect x="406" y="190" width="48" height="22" rx="11" fill="#121212" />
          <text x="430" y="205" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="inherit">4.80</text>
        </g>
        <g className="hb-we5-dim" style={k(2)}>
          <text x="175" y="150" textAnchor="middle" fill="#6b6b6b" fontSize="13" fontFamily="inherit">Living · 22 m²</text>
          <text x="335" y="210" textAnchor="middle" fill="#6b6b6b" fontSize="13" fontFamily="inherit">Kitchen</text>
        </g>
      </svg>
    );
  }
  if (kind === 1) {
    const palettes = [
      ["#d9c7b0", "#8a6f55", "#3f4a3c", "#efe8dc"],
      ["#c9d3cf", "#5f7b74", "#20302d", "#f2efe8"],
      ["#e9c9b9", "#b5644a", "#3b2b26", "#f6eee6"],
      ["#d6d1e6", "#6d6596", "#232035", "#f1eff7"],
    ];
    return (
      <svg viewBox="0 0 500 400" className="hb-we5-scene" aria-hidden="true">
        {palettes.map((p, i) => {
          const r = (i - 1.5) * 9;
          const x = 140 + i * 70;
          return (
            <g key={i} className="hb-we5-swatch" style={k(i, { "--hb-we5-r": `${r}deg` })}>
              <rect x={x - 70} y="70" width="140" height="250" rx="16" fill="#fff" stroke="rgba(0,0,0,.08)" />
              {p.map((c, j) => (
                <rect key={c} x={x - 58} y={82 + j * 46} width="116" height="40" rx={j === 0 ? 8 : 4} fill={c} />
              ))}
              <rect x={x - 58} y="274" width="70" height="8" rx="4" fill="#121212" opacity=".8" />
              <rect x={x - 58} y="290" width="46" height="6" rx="3" fill="#b5b5b5" />
            </g>
          );
        })}
        <g className="hb-we5-pop">
          <circle cx="400" cy="92" r="26" fill={accent} />
          <path d="M 388 92 l 8 8 l 16 -16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }
  if (kind === 2) {
    const iso = (x: number, y: number, z: number) => `${(250 + (x - y) * 0.87).toFixed(1)},${(250 + (x + y) * 0.5 - z).toFixed(1)}`;
    const box = (x: number, y: number, w: number, d: number, h: number, top: string, left: string, right: string, n: number) => (
      <g key={`${x}-${y}`} className="hb-we5-rise" style={k(n)}>
        <polygon points={`${iso(x, y + d, 0)} ${iso(x + w, y + d, 0)} ${iso(x + w, y + d, h)} ${iso(x, y + d, h)}`} fill={left} />
        <polygon points={`${iso(x + w, y, 0)} ${iso(x + w, y + d, 0)} ${iso(x + w, y + d, h)} ${iso(x + w, y, h)}`} fill={right} />
        <polygon points={`${iso(x, y, h)} ${iso(x + w, y, h)} ${iso(x + w, y + d, h)} ${iso(x, y + d, h)}`} fill={top} />
      </g>
    );
    return (
      <svg viewBox="0 0 500 400" className="hb-we5-scene" aria-hidden="true">
        <polygon points={`${iso(-120, -120, 0)} ${iso(120, -120, 0)} ${iso(120, 120, 0)} ${iso(-120, 120, 0)}`} fill="#e6dfd2" />
        <polygon points={`${iso(-120, -120, 0)} ${iso(120, -120, 0)} ${iso(120, -120, 120)} ${iso(-120, -120, 120)}`} fill="#efe9de" />
        <polygon points={`${iso(-120, -120, 0)} ${iso(-120, 120, 0)} ${iso(-120, 120, 120)} ${iso(-120, -120, 120)}`} fill="#e9e2d5" />
        <polygon className="hb-we5-dim" style={k(-6)} points={`${iso(-20, -120, 30)} ${iso(50, -120, 30)} ${iso(50, -120, 95)} ${iso(-20, -120, 95)}`} fill="#cfe3f5" />
        {box(-100, -60, 60, 140, 30, "#8a9a84", "#6c7b66", "#5a6855", 0)}
        {box(-100, -60, 60, 20, 58, "#8a9a84", "#6c7b66", "#5a6855", 1)}
        {box(10, -10, 60, 40, 22, "#c9a27a", "#a8835e", "#94714f", 2)}
        {box(60, -110, 50, 24, 70, "#4b4038", "#3a312b", "#2f2823", 3)}
        {box(-30, 60, 30, 30, 50, accent, "#c74634", "#b13d2d", 4)}
        <g className="hb-we5-pop">
          <rect x="330" y="300" width="132" height="40" rx="20" fill="#121212" />
          <text x="396" y="325" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily="inherit">Fits · 12 cm spare</text>
        </g>
      </svg>
    );
  }
  const items = [
    { name: "Arlo 3-seat sofa", price: "$1,240", c: "#8a9a84" },
    { name: "Oak sideboard", price: "$690", c: "#c9a27a" },
    { name: "Linen curtains, pair", price: "$148", c: "#e6dfd2" },
  ];
  return (
    <svg viewBox="0 0 500 400" className="hb-we5-scene" aria-hidden="true">
      <rect x="80" y="44" width="340" height="312" rx="22" fill="#fff" stroke="rgba(0,0,0,.07)" />
      <text x="106" y="84" fill="#121212" fontSize="17" fontWeight="700" fontFamily="inherit">Your room · 3 items</text>
      {items.map((it, i) => (
        <g key={it.name} className="hb-we5-slide" style={k(i)}>
          <rect x="106" y={106 + i * 64} width="48" height="48" rx="12" fill={it.c} />
          <text x="170" y={126 + i * 64} fill="#121212" fontSize="14" fontWeight="600" fontFamily="inherit">{it.name}</text>
          <text x="170" y={145 + i * 64} fill="#8a8a8a" fontSize="12" fontFamily="inherit">In stock · ships Tue</text>
          <text x="394" y={134 + i * 64} textAnchor="end" fill="#121212" fontSize="14" fontWeight="600" fontFamily="inherit">{it.price}</text>
        </g>
      ))}
      <path d="M 106 302 H 394" stroke="rgba(0,0,0,.08)" />
      <g className="hb-we5-slide" style={k(3)}>
        <text x="106" y="332" fill="#5c5c5c" fontSize="13" fontFamily="inherit">Total</text>
        <text x="200" y="333" fill="#121212" fontSize="18" fontWeight="700" fontFamily="inherit">$2,078</text>
      </g>
      <g className="hb-we5-pop">
        <rect x="282" y="312" width="112" height="32" rx="16" fill={accent} />
        <text x="338" y="333" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily="inherit">Checkout</text>
      </g>
    </svg>
  );
}

export function StepsStoryTabs({
  eyebrow = "How Roomwise works",
  title = "An empty room to a delivered one, in four chapters",
  steps = defaultSteps,
  defaultStep = 0,
  step,
  onStepChange,
  autoPlay = true,
  interval = 4200,
  accent = "#f45d48",
  className,
  style,
  ...rest
}: StepsStoryTabsProps) {
  const [inner, setInner] = React.useState(defaultStep);
  const active = Math.max(0, Math.min(steps.length - 1, step ?? inner));
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const uid = React.useId().replace(/:/g, "");

  const go = React.useCallback(
    (i: number) => {
      if (step === undefined) setInner(i);
      onStepChange?.(i);
    },
    [step, onStepChange],
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    const t = window.setTimeout(on, 0);
    mq.addEventListener("change", on);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", on);
    };
  }, []);

  const playing = autoPlay && !paused && !reduced && steps.length > 1;
  React.useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go((active + 1) % steps.length), interval);
    return () => window.clearTimeout(t);
  }, [playing, active, interval, steps.length, go]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % steps.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + steps.length) % steps.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = steps.length - 1;
    if (n < 0) return;
    e.preventDefault();
    go(n);
    tabRefs.current[n]?.focus();
  };

  const s = steps[active];

  return (
    <section
      className={["hb-we5", className].filter(Boolean).join(" ")}
      style={{ "--hb-we5-accent": accent, "--hb-we5-dur": `${interval}ms`, "--hb-we5-n": steps.length, ...style } as React.CSSProperties}
      data-play={playing ? "true" : "false"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-steps-story-tabs" precedence="default">{css}</style>
      <div className="hb-we5-inner">
        {eyebrow ? <p className="hb-we5-eyebrow">{eyebrow}</p> : null}
        <h2 className="hb-we5-title">{title}</h2>
        <div className="hb-we5-tabs" role="tablist" aria-label="Steps">
          {steps.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              aria-controls={`${uid}-p`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className="hb-we5-tab"
              data-s={i < active ? "done" : i === active ? "active" : "next"}
              onClick={() => go(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="hb-we5-track"><i key={i === active ? `a${active}` : "x"} /></span>
              <span className="hb-we5-tl"><span>{String(i + 1).padStart(2, "0")}</span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="hb-we5-panel" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${active}`} key={active}>
          <div className="hb-we5-copy">
            <span className="hb-we5-big" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
            <h3 className="hb-we5-h">{s.title}</h3>
            <p className="hb-we5-p">{s.body}</p>
            <ul className="hb-we5-pts">
              {s.points.map((p) => (
                <li key={p}>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" opacity=".14" /><path d="M6 10.4l2.6 2.6L14 7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="hb-we5-vis">
            <Scene index={active} accent={accent} />
          </div>
        </div>
      </div>
    </section>
  );
}

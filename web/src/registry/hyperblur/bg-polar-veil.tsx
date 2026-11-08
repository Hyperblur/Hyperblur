"use client";

import * as React from "react";

export interface BgPolarVeilProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  stars?: number;
  grain?: number;
  horizon?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd1-bg); isolation: isolate; }
.hb-vd1 *, .hb-vd1 *::before, .hb-vd1 *::after { box-sizing: border-box; }
.hb-vd1-sky { position: absolute; inset: 0; background: radial-gradient(130% 80% at 50% 120%, color-mix(in srgb, var(--hb-vd1-c0) 22%, transparent) 0%, transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%); }
.hb-vd1-star { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: #fff; opacity: var(--o); animation: hb-vd1-twinkle calc(var(--d) * var(--hb-vd1-k)) ease-in-out infinite alternate; animation-delay: var(--dl); }
.hb-vd1-band { position: absolute; left: -30%; width: 160%; height: 66%; top: var(--top); transform-origin: 50% 100%; mix-blend-mode: screen; opacity: var(--o); animation: hb-vd1-sway calc(var(--d) * var(--hb-vd1-k)) cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate; animation-delay: var(--dl); }
.hb-vd1-glow { position: absolute; inset: 8% 10% 0; background: radial-gradient(55% 60% at 50% 100%, var(--c) 0%, transparent 72%); filter: blur(26px); opacity: 0.5; animation: hb-vd1-breathe calc(7s * var(--hb-vd1-k)) ease-in-out infinite alternate; animation-delay: var(--dl); }
.hb-vd1-rays { position: absolute; inset: 0; background: linear-gradient(0deg, transparent 0%, var(--c) 9%, color-mix(in srgb, var(--c) 45%, transparent) 34%, transparent 82%); -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 2px, rgba(0,0,0,0.22) 2px 6px, rgba(0,0,0,0.85) 6px 8px, rgba(0,0,0,0.08) 8px 13px), radial-gradient(50% 100% at 50% 100%, #000 28%, transparent 76%); mask-image: repeating-linear-gradient(90deg, #000 0 2px, rgba(0,0,0,0.22) 2px 6px, rgba(0,0,0,0.85) 6px 8px, rgba(0,0,0,0.08) 8px 13px), radial-gradient(50% 100% at 50% 100%, #000 28%, transparent 76%); -webkit-mask-composite: source-in; mask-composite: intersect; filter: blur(1.2px); animation: hb-vd1-shimmer calc(var(--sd) * var(--hb-vd1-k)) linear infinite; }
.hb-vd1-ridge { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 24%; display: block; }
.hb-vd1-grain { position: absolute; inset: 0; width: 100%; height: 100%; display: block; mix-blend-mode: overlay; }
.hb-vd1-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd1-sway {
  0% { transform: translateX(-6%) skewX(-9deg) rotate(var(--r)) scaleY(0.9); }
  50% { transform: translateX(2%) skewX(7deg) rotate(calc(var(--r) * -0.4)) scaleY(1.06); }
  100% { transform: translateX(7%) skewX(-3deg) rotate(var(--r)) scaleY(0.96); }
}
@keyframes hb-vd1-shimmer { from { -webkit-mask-position: 0 0, 0 0; mask-position: 0 0, 0 0; } to { -webkit-mask-position: 130px 0, 0 0; mask-position: 130px 0, 0 0; } }
@keyframes hb-vd1-breathe { from { opacity: 0.32; } to { opacity: 0.68; } }
@keyframes hb-vd1-twinkle { from { opacity: var(--o); } to { opacity: 0.08; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vd1-band, .hb-vd1-glow, .hb-vd1-rays, .hb-vd1-star { animation: none; }
}
`;

const defaultColors = ["#3cf2b0", "#2f7bff", "#b26cff"];

function hash(i: number) {
  let x = Math.imul(i ^ 0x7f4a7c15, 0x9e3779b1);
  x ^= x >>> 15;
  x = Math.imul(x, 0x85ebca77);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function ridgePath() {
  const pts: string[] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const y = 110 - 46 * Math.sin(u * 3.4 + 0.7) * 0.6 - 38 * hash(i * 3 + 1) * 0.7 - 30 * Math.sin(u * 9.1 + 2) * 0.35;
    pts.push(`${(u * 1000).toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M0 200 L${pts.join(" L")} L1000 200 Z`;
}

const ridge = ridgePath();

export function BgPolarVeil({
  colors = defaultColors,
  background = "#04060b",
  stars = 46,
  grain = 0.16,
  horizon = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgPolarVeilProps) {
  const rawId = React.useId();
  const id = `hb-vd1-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const palette = colors.length ? colors : defaultColors;
  const k = 1 / Math.max(0.05, speed);
  const bands = palette.map((c, i) => {
    const n = palette.length;
    return {
      c,
      top: (4 + (i * 18) / Math.max(1, n - 1) + hash(i + 40) * 6).toFixed(2),
      r: ((i % 2 ? 1 : -1) * (4 + 6 * hash(i + 50))).toFixed(2),
      d: (14 + 9 * hash(i + 60)).toFixed(2),
      sd: (8 + 6 * hash(i + 70)).toFixed(2),
      dl: (-hash(i + 80) * 20).toFixed(2),
      o: (0.95 - i * 0.12).toFixed(2),
    };
  });
  const starList = Array.from({ length: Math.max(0, Math.min(200, Math.round(stars))) }, (_, i) => ({
    x: (hash(i * 4 + 1) * 100).toFixed(2),
    y: (hash(i * 4 + 2) * 62).toFixed(2),
    o: (0.25 + 0.6 * hash(i * 4 + 3)).toFixed(2),
    s: (0.5 + 0.9 * hash(i * 4 + 4)).toFixed(2),
    d: (2 + 4 * hash(i * 4 + 5)).toFixed(2),
    dl: (-hash(i * 4 + 6) * 6).toFixed(2),
  }));

  return (
    <div
      className={`hb-vd1 ${className}`}
      style={{ "--hb-vd1-bg": background, "--hb-vd1-c0": palette[0], "--hb-vd1-k": k.toFixed(3), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bg-polar-veil" precedence="default">{css}</style>
      <div className="hb-vd1-sky" aria-hidden="true" />
      {starList.map((s, i) => (
        <span
          key={i}
          className="hb-vd1-star"
          aria-hidden="true"
          style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `scale(${s.s})`, "--o": s.o, "--d": `${s.d}s`, "--dl": `${s.dl}s` } as React.CSSProperties}
        />
      ))}
      {bands.map((b, i) => (
        <div
          key={i}
          className="hb-vd1-band"
          aria-hidden="true"
          style={{ "--c": b.c, "--top": `${b.top}%`, "--r": `${b.r}deg`, "--d": `${b.d}s`, "--sd": `${b.sd}s`, "--dl": `${b.dl}s`, "--o": b.o } as React.CSSProperties}
        >
          <div className="hb-vd1-glow" />
          <div className="hb-vd1-rays" />
        </div>
      ))}
      {horizon ? (
        <svg className="hb-vd1-ridge" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-r`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b0f18" />
              <stop offset="1" stopColor="#020306" />
            </linearGradient>
          </defs>
          <path d={ridge} fill={`url(#${id}-r)`} />
          <path d={ridge} fill="none" stroke={palette[0]} strokeOpacity="0.28" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}
      {grain > 0 ? (
        <svg className="hb-vd1-grain" style={{ opacity: grain }} aria-hidden="true">
          <filter id={`${id}-g`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${id}-g)`} />
        </svg>
      ) : null}
      {children ? <div className="hb-vd1-in">{children}</div> : null}
    </div>
  );
}

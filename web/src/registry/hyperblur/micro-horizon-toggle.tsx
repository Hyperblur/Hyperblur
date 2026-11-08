"use client";

import * as React from "react";

export interface MicroHorizonToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "children"> {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: number;
  label?: string;
  onChange?: (dark: boolean) => void;
}

const css = `
.hb-wf8 {
  --hb-wf8-s: 48px;
  position: relative;
  display: inline-block;
  width: calc(var(--hb-wf8-s) * 2.25);
  height: var(--hb-wf8-s);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
  border-radius: 999px;
  background: #0a0a0a;
  cursor: grab;
  overflow: hidden;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 24px -10px rgba(0,0,0,0.9);
  transition: transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1), box-shadow 0.2s ease;
}
.hb-wf8 *, .hb-wf8 *::before, .hb-wf8 *::after { box-sizing: border-box; }
.hb-wf8:active { cursor: grabbing; transform: scale(0.97); }
.hb-wf8:focus-visible { outline: none; box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px #7fb3ff; }
.hb-wf8:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-wf8-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-wf8::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.08);
}
.hb-wf8-tw { animation: hb-wf8-tw 2.8s ease-in-out infinite; }
@keyframes hb-wf8-tw { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.hb-wf8-wv { animation: hb-wf8-wv 3.6s ease-in-out infinite; }
@keyframes hb-wf8-wv { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-wf8 { transition: none; }
  .hb-wf8-tw, .hb-wf8-wv { animation: none; }
}
`;

type RGB = [number, number, number];

const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: RGB, b: RGB, t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
const ramp = (stops: string[], t: number) => {
  const c = stops.map(hex);
  const x = Math.max(0, Math.min(1, t)) * (c.length - 1);
  const i = Math.min(c.length - 2, Math.floor(x));
  return mix(c[i], c[i + 1], x - i);
};

const stars = Array.from({ length: 14 }, (_, i) => {
  const h = (Math.imul(i + 7, 2654435761) >>> 0) / 4294967296;
  const k = (Math.imul(i + 31, 2246822519) >>> 0) / 4294967296;
  return { x: (6 + h * 96).toFixed(1), y: (3 + k * 22).toFixed(1), r: (0.35 + ((i * 7) % 5) * 0.12).toFixed(2), d: `${((i * 0.37) % 2.8).toFixed(2)}s` };
});

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function MicroHorizonToggle({
  checked,
  defaultChecked = false,
  size = 48,
  label = "Dark mode",
  disabled,
  onChange,
  className = "",
  style,
  onClick,
  ...rest
}: MicroHorizonToggleProps) {
  const [inner, setInner] = React.useState(defaultChecked);
  const dark = checked ?? inner;
  const [p, setP] = React.useState(dark ? 1 : 0);
  const [scrub, setScrub] = React.useState(false);
  const anim = React.useRef({ raf: 0, from: 0, to: 0, t0: 0 });
  const drag = React.useRef({ on: false, x: 0, base: 0, moved: false, w: 100 });
  const pRef = React.useRef(p);
  const uid = React.useId().replace(/:/g, "");

  const animateTo = React.useCallback((to: number) => {
    const a = anim.current;
    cancelAnimationFrame(a.raf);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pRef.current = to;
      setP(to);
      return;
    }
    a.from = pRef.current;
    a.to = to;
    a.t0 = performance.now();
    const dur = 720 * Math.max(0.35, Math.abs(to - a.from));
    const step = (t: number) => {
      const k = Math.min(1, (t - a.t0) / dur);
      const v = a.from + (a.to - a.from) * ease(k);
      pRef.current = v;
      setP(v);
      if (k < 1) a.raf = requestAnimationFrame(step);
    };
    a.raf = requestAnimationFrame(step);
  }, []);

  React.useEffect(() => {
    if (drag.current.on) return;
    const target = dark ? 1 : 0;
    if (Math.abs(pRef.current - target) < 0.001) return;
    const id = requestAnimationFrame(() => animateTo(target));
    return () => cancelAnimationFrame(id);
  }, [dark, animateTo]);

  React.useEffect(() => () => cancelAnimationFrame(anim.current.raf), []);

  const set = (next: boolean) => {
    if (disabled) return;
    if (next === dark) {
      animateTo(next ? 1 : 0);
      return;
    }
    if (checked === undefined) setInner(next);
    onChange?.(next);
  };

  const skyTop = ramp(["#3d8bff", "#4a62c9", "#2b2266", "#060a1c"], p);
  const skyBot = ramp(["#a9d6ff", "#ffb08a", "#6a3a7a", "#16204a"], p);
  const hillB = ramp(["#3f8a63", "#5a4a5e", "#211a33", "#0b0f1d"], p);
  const hillF = ramp(["#2c6e4c", "#3e2f45", "#150f22", "#05070f"], p);
  const water = ramp(["#5aa4e8", "#c97a6a", "#2a1f4a", "#0a1230"], p);
  const sx = 24 + 52 * p;
  const sy = 15 + 34 * p * p;
  const my = 58 - 44 * ease(Math.max(0, (p - 0.35) / 0.65));
  const glow = Math.sin(Math.PI * Math.min(1, p * 1.15));
  const starOp = Math.max(0, (p - 0.55) / 0.45);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={label}
      disabled={disabled}
      data-scrub={scrub}
      className={`hb-wf8 ${className}`}
      style={{ ...style, ["--hb-wf8-s" as string]: `${size}px` }}
      onPointerDown={(e) => {
        if (disabled) return;
        cancelAnimationFrame(anim.current.raf);
        drag.current = { on: true, x: e.clientX, base: pRef.current, moved: false, w: e.currentTarget.clientWidth };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d.on) return;
        const dx = e.clientX - d.x;
        if (!d.moved && Math.abs(dx) < 4) return;
        d.moved = true;
        setScrub(true);
        const v = Math.max(0, Math.min(1, d.base + dx / (d.w * 0.7)));
        pRef.current = v;
        setP(v);
      }}
      onPointerUp={() => {
        const d = drag.current;
        if (!d.on) return;
        d.on = false;
        setScrub(false);
        if (d.moved) set(pRef.current > 0.5);
      }}
      onPointerCancel={() => {
        drag.current.on = false;
        setScrub(false);
        animateTo(dark ? 1 : 0);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (drag.current.moved) {
          drag.current.moved = false;
          return;
        }
        set(!dark);
      }}
      {...rest}
    >
      <style href="hb-micro-horizon-toggle" precedence="default">
        {css}
      </style>
      <svg className="hb-wf8-svg" viewBox="0 0 108 48" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`s${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={skyTop} />
            <stop offset="1" stopColor={skyBot} />
          </linearGradient>
          <radialGradient id={`g${uid}`}>
            <stop offset="0" stopColor="#ffb36b" stopOpacity={(0.85 * glow).toFixed(3)} />
            <stop offset="1" stopColor="#ff7a4a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`u${uid}`} cx="40%" cy="35%">
            <stop offset="0" stopColor="#fffbe6" />
            <stop offset="1" stopColor={ramp(["#ffd84a", "#ff9a3c", "#ff6a3c"], p * 1.4)} />
          </radialGradient>
          <mask id={`m${uid}`}>
            <rect width="108" height="48" fill="#fff" />
            <circle cx="89" cy={(my - 3).toFixed(2)} r="6.2" fill="#000" />
          </mask>
          <clipPath id={`c${uid}`}>
            <rect width="108" height="34" />
          </clipPath>
        </defs>
        <rect width="108" height="48" fill={`url(#s${uid})`} />
        <g opacity={starOp.toFixed(3)}>
          {stars.map((s, i) => (
            <circle key={i} className="hb-wf8-tw" cx={s.x} cy={s.y} r={s.r} fill="#fff" style={{ animationDelay: s.d }} />
          ))}
        </g>
        <circle cx={sx.toFixed(2)} cy="32" r="34" fill={`url(#g${uid})`} />
        <g clipPath={`url(#c${uid})`}>
          <circle cx={sx.toFixed(2)} cy={sy.toFixed(2)} r="7.5" fill={`url(#u${uid})`} />
          <circle cx="85" cy={my.toFixed(2)} r="7" fill="#eef1ff" mask={`url(#m${uid})`} />
        </g>
        <path d="M0 30c10-6 20-8 30-4s16 2 24-3 20-6 30 0 16 6 24 4v7H0z" fill={hillB} />
        <path d="M0 33c8-3 16-4 26-1s20 3 30 0 22-2 32 1 14 2 20 0v4H0z" fill={hillF} />
        <rect y="34" width="108" height="14" fill={water} />
        <g opacity={(0.55 * (1 - p) + 0.35 * starOp).toFixed(3)}>
          <rect className="hb-wf8-wv" x={(sx - 6).toFixed(2)} y="37" width="12" height="1" rx="0.5" fill="#fff" />
          <rect className="hb-wf8-wv" x={(sx - 4).toFixed(2)} y="40.5" width="8" height="1" rx="0.5" fill="#fff" style={{ animationDelay: "-1.2s" }} />
          <rect className="hb-wf8-wv" x={(sx - 2.5).toFixed(2)} y="44" width="5" height="1" rx="0.5" fill="#fff" style={{ animationDelay: "-2.4s" }} />
        </g>
      </svg>
    </button>
  );
}

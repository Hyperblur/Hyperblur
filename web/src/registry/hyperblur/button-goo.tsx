"use client";

import * as React from "react";

export interface ButtonGooProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  blobs?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa3 {
  --hb-xa3-c: #7c5cff;
  --hb-xa3-px: 50%;
  --hb-xa3-py: 50%;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.95em 1.9em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-xa3 *, .hb-xa3 *::before, .hb-xa3 *::after { box-sizing: border-box; }
.hb-xa3[data-size="sm"] { font-size: 13px; }
.hb-xa3[data-size="lg"] { font-size: 17px; }
.hb-xa3:focus-visible { outline: 2px solid var(--hb-xa3-c); outline-offset: 5px; }
.hb-xa3:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa3-svg { position: absolute; width: 0; height: 0; overflow: hidden; }
.hb-xa3-goo {
  position: absolute;
  inset: -28px;
  z-index: -1;
  pointer-events: none;
}
.hb-xa3-pill {
  position: absolute;
  inset: 28px;
  border-radius: 999px;
  background: var(--hb-xa3-c);
  transition: inset 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xa3:active:not(:disabled) .hb-xa3-pill { inset: 30px 32px; }
.hb-xa3-blob {
  position: absolute;
  left: var(--hb-xa3-bx);
  top: var(--hb-xa3-by);
  width: var(--hb-xa3-bs);
  height: var(--hb-xa3-bs);
  margin: calc(var(--hb-xa3-bs) / -2) 0 0 calc(var(--hb-xa3-bs) / -2);
  border-radius: 50%;
  background: var(--hb-xa3-c);
  transform: translate(0, 0) scale(0.6);
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--hb-xa3-bd);
}
.hb-xa3:hover:not(:disabled) .hb-xa3-blob,
.hb-xa3:focus-visible .hb-xa3-blob {
  transform: translate(var(--hb-xa3-dx), var(--hb-xa3-dy)) scale(1);
  animation: hb-xa3-bob 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: calc(var(--hb-xa3-bd) + 0.7s);
}
.hb-xa3.hb-xa3[data-pop="a"] .hb-xa3-blob { animation: hb-xa3-pa 0.75s cubic-bezier(0.2, 0.9, 0.3, 1.2); }
.hb-xa3.hb-xa3[data-pop="b"] .hb-xa3-blob { animation: hb-xa3-pb 0.75s cubic-bezier(0.2, 0.9, 0.3, 1.2); }
.hb-xa3-cursor {
  position: absolute;
  left: var(--hb-xa3-px);
  top: var(--hb-xa3-py);
  width: 30px;
  height: 30px;
  margin: -15px 0 0 -15px;
  border-radius: 50%;
  background: var(--hb-xa3-c);
  transform: scale(0);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa3[data-near="true"] .hb-xa3-cursor { transform: scale(1); }
.hb-xa3-shine {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -8px 14px rgba(0, 0, 0, 0.18);
}
.hb-xa3-label { display: inline-flex; align-items: center; gap: 0.5em; white-space: nowrap; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
.hb-xa3-shadow {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -10px;
  height: 18px;
  z-index: -2;
  border-radius: 50%;
  background: var(--hb-xa3-c);
  filter: blur(14px);
  opacity: 0.55;
  pointer-events: none;
}
@keyframes hb-xa3-bob {
  from { transform: translate(var(--hb-xa3-dx), var(--hb-xa3-dy)) scale(1); }
  to { transform: translate(calc(var(--hb-xa3-dx) * 0.35), calc(var(--hb-xa3-dy) * 0.35)) scale(0.75); }
}
@keyframes hb-xa3-pa {
  0% { transform: translate(0, 0) scale(0.6); }
  45% { transform: translate(calc(var(--hb-xa3-dx) * 2.3), calc(var(--hb-xa3-dy) * 2.3)) scale(0.85); }
  100% { transform: translate(var(--hb-xa3-dx), var(--hb-xa3-dy)) scale(1); }
}
@keyframes hb-xa3-pb {
  0% { transform: translate(0, 0) scale(0.6); }
  45% { transform: translate(calc(var(--hb-xa3-dx) * 2.3), calc(var(--hb-xa3-dy) * 2.3)) scale(0.85); }
  100% { transform: translate(var(--hb-xa3-dx), var(--hb-xa3-dy)) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xa3-pill, .hb-xa3-blob, .hb-xa3-cursor { transition: none; }
  .hb-xa3:hover:not(:disabled) .hb-xa3-blob, .hb-xa3:focus-visible .hb-xa3-blob,
  .hb-xa3.hb-xa3[data-pop] .hb-xa3-blob { animation: none; transform: translate(0, 0) scale(0.6); }
  .hb-xa3[data-near="true"] .hb-xa3-cursor { transform: scale(0); }
}
`;

function hash(n: number) {
  let h = (n + 1) * 2654435761;
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export function ButtonGoo({
  children = "Join the beta",
  accent = "#7c5cff",
  blobs = 7,
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  style,
  onClick,
  onPointerMove,
  onPointerLeave,
  ...rest
}: ButtonGooProps) {
  const raw = React.useId();
  const id = `hb-xa3-f${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
  const ref = React.useRef<HTMLButtonElement>(null);
  const [pop, setPop] = React.useState<"a" | "b" | undefined>(undefined);
  const [near, setNear] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const count = Math.max(0, Math.min(14, Math.round(blobs)));

  const list = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / Math.max(1, count);
    const top = i % 2 === 0;
    const bx = 14 + t * 72;
    const by = top ? 34 : 66;
    const lift = 10 + hash(i) * 12;
    const side = t < 0.12 ? -1 : t > 0.88 ? 1 : 0;
    return {
      "--hb-xa3-bx": `${bx.toFixed(1)}%`,
      "--hb-xa3-by": `${by.toFixed(1)}%`,
      "--hb-xa3-bs": `${(12 + hash(i + 40) * 12).toFixed(1)}px`,
      "--hb-xa3-dx": `${(side * lift + (hash(i + 7) - 0.5) * 8).toFixed(1)}px`,
      "--hb-xa3-dy": `${((top ? -1 : 1) * lift).toFixed(1)}px`,
      "--hb-xa3-bd": `${(hash(i + 90) * 0.12).toFixed(3)}s`,
    } as React.CSSProperties;
  });

  function follow(e: React.PointerEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width - 0.5;
    const fy = (e.clientY - r.top) / r.height - 0.5;
    const ox = 50 + fx * 100 * 1.12;
    const oy = 50 + fy * 100 * 1.9;
    const gw = r.width + 56;
    const gh = r.height + 56;
    const px = 28 + (ox / 100) * r.width;
    const py = 28 + (oy / 100) * r.height;
    el.style.setProperty("--hb-xa3-px", `${((px / gw) * 100).toFixed(2)}%`);
    el.style.setProperty("--hb-xa3-py", `${((py / gh) * 100).toFixed(2)}%`);
    if (!near) setNear(true);
  }

  const vars = { "--hb-xa3-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-goo" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-xa3 ${className}`}
        style={vars}
        data-size={size}
        data-pop={pop}
        data-near={near || undefined}
        disabled={disabled}
        onClick={(e) => {
          setPop((p) => (p === "a" ? "b" : "a"));
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setPop(undefined), 780);
          onClick?.(e);
        }}
        onPointerMove={(e) => {
          follow(e);
          onPointerMove?.(e);
        }}
        onPointerLeave={(e) => {
          setNear(false);
          onPointerLeave?.(e);
        }}
        {...rest}
      >
        <svg className="hb-xa3-svg" aria-hidden="true" focusable="false">
          <defs>
            <filter id={id} x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
              <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
            </filter>
          </defs>
        </svg>
        <span className="hb-xa3-shadow" aria-hidden="true" />
        <span className="hb-xa3-goo" style={{ filter: `url(#${id})` }} aria-hidden="true">
          <span className="hb-xa3-pill" />
          {list.map((v, i) => (
            <span className="hb-xa3-blob" style={v} key={i} />
          ))}
          <span className="hb-xa3-cursor" />
        </span>
        <span className="hb-xa3-shine" aria-hidden="true" />
        <span className="hb-xa3-label">{children}</span>
      </button>
    </>
  );
}

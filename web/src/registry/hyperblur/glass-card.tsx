"use client";

import * as React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  blur?: number;
  tilt?: number;
  glare?: boolean;
  radius?: number;
  tint?: string;
}

const noise =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")";

const css = `
.hb-gls {
  --hb-gls-rx: 0deg;
  --hb-gls-ry: 0deg;
  --hb-gls-x: 30%;
  --hb-gls-y: 0%;
  position: relative;
  box-sizing: border-box;
  isolation: isolate;
  overflow: hidden;
  border-radius: var(--hb-gls-r);
  color: #ffffff;
  font-family: inherit;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-gls-t) 22%, transparent), color-mix(in srgb, var(--hb-gls-t) 6%, transparent) 60%);
  -webkit-backdrop-filter: blur(var(--hb-gls-b)) saturate(170%);
  backdrop-filter: blur(var(--hb-gls-b)) saturate(170%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    0 24px 48px -18px rgba(0, 0, 0, 0.55);
  transform: perspective(900px) rotateX(var(--hb-gls-rx)) rotateY(var(--hb-gls-ry));
  transition: transform .6s cubic-bezier(.2, .9, .2, 1);
  will-change: transform;
}
.hb-gls *, .hb-gls *::before, .hb-gls *::after { box-sizing: border-box; }
.hb-gls[data-live] { transition: transform .12s ease-out; }
.hb-gls::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-image: ${noise};
  background-size: 140px 140px;
  opacity: .22;
  mix-blend-mode: overlay;
  pointer-events: none;
}
.hb-gls-glare {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(70% 60% at var(--hb-gls-x) var(--hb-gls-y), rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 60%),
    linear-gradient(115deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0) 60%);
  mix-blend-mode: soft-light;
  opacity: .75;
  transition: opacity .4s ease;
}
.hb-gls[data-live] .hb-gls-glare { opacity: 1; }
.hb-gls-rim {
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  padding: 1px;
  pointer-events: none;
  background: radial-gradient(60% 80% at var(--hb-gls-x) var(--hb-gls-y), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: .6;
}
@media (prefers-reduced-motion: reduce) {
  .hb-gls, .hb-gls[data-live] { transform: none; transition: none; will-change: auto; }
  .hb-gls-glare { transition: none; }
}
`;

export function GlassCard({
  children,
  blur = 18,
  tilt = 6,
  glare = true,
  radius = 20,
  tint = "#ffffff",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: GlassCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const max = Math.min(6, Math.max(0, tilt));

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.setAttribute("data-live", "");
    el.style.setProperty("--hb-gls-ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--hb-gls-rx", `${(-(y - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--hb-gls-x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-gls-y", `${(y * 100).toFixed(1)}%`);
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    const el = ref.current;
    if (!el) return;
    el.removeAttribute("data-live");
    el.style.setProperty("--hb-gls-rx", "0deg");
    el.style.setProperty("--hb-gls-ry", "0deg");
    el.style.setProperty("--hb-gls-x", "30%");
    el.style.setProperty("--hb-gls-y", "0%");
  }

  const vars = {
    "--hb-gls-b": `${Math.max(0, blur)}px`,
    "--hb-gls-r": `${Math.max(0, radius)}px`,
    "--hb-gls-t": tint,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`hb-gls ${className}`} style={vars} onPointerMove={handleMove} onPointerLeave={handleLeave} {...rest}>
      <style href="hb-glass-card" precedence="default">{css}</style>
      {children}
      {glare && <span className="hb-gls-glare" aria-hidden="true" />}
      {glare && <span className="hb-gls-rim" aria-hidden="true" />}
    </div>
  );
}

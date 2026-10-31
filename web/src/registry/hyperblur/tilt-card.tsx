"use client";

import * as React from "react";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content. */
  children: React.ReactNode;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
  /** Show a glare highlight that follows the cursor. */
  glare?: boolean;
  /** Scale while hovered. */
  scale?: number;
  /** Perspective distance in pixels. */
  perspective?: number;
}

const css = `
.hb-tc {
  --hb-rx: 0deg; --hb-ry: 0deg; --hb-gx: 50%; --hb-gy: 50%;
  position: relative;
  display: inline-block;
  transform: perspective(var(--hb-p)) rotateX(0deg) rotateY(0deg) scale(1);
  transition: transform .5s cubic-bezier(.2, .9, .2, 1);
  will-change: transform;
}
.hb-tc:hover {
  transform: perspective(var(--hb-p)) rotateX(var(--hb-rx)) rotateY(var(--hb-ry)) scale(var(--hb-sc));
  transition: transform .12s ease-out;
}
.hb-tc > .hb-tc-glare {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(circle at var(--hb-gx) var(--hb-gy), rgba(255,255,255,.35), rgba(255,255,255,0) 60%);
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-tc:hover > .hb-tc-glare { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .hb-tc, .hb-tc:hover { transform: none; transition: none; }
  .hb-tc > .hb-tc-glare { display: none; }
}
`;

export function TiltCard({
  children,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  perspective = 800,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.style.setProperty("--hb-ry", `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
    el.style.setProperty("--hb-rx", `${(-(y - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
    el.style.setProperty("--hb-gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-gy", `${(y * 100).toFixed(1)}%`);
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--hb-rx", "0deg");
    el.style.setProperty("--hb-ry", "0deg");
  }

  const vars = {
    "--hb-p": `${perspective}px`,
    "--hb-sc": scale,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-tc ${className}`}
      style={vars}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      <style href="hb-tilt-card" precedence="default">{css}</style>
      {children}
      {glare && <span className="hb-tc-glare" aria-hidden="true" />}
    </div>
  );
}

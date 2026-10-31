"use client";

import * as React from "react";

export interface DotGridProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  dotColor?: string;
  glowColor?: string;
  radius?: number;
  intensity?: number;
}

const css = `
.hb-dg {
  --hb-x: 50%; --hb-y: 50%; --hb-o: 0;
  position: absolute; inset: 0; overflow: hidden; pointer-events: none;
}
.hb-dg::before, .hb-dg::after { content: ""; position: absolute; inset: 0; }
.hb-dg::before {
  background-image: radial-gradient(circle, var(--hb-dc) 1px, transparent 1.6px);
  background-size: var(--hb-s) var(--hb-s);
}
.hb-dg::after {
  background-image:
    radial-gradient(circle var(--hb-r) at var(--hb-x) var(--hb-y), color-mix(in srgb, var(--hb-gc) 18%, transparent), transparent 70%),
    radial-gradient(circle, var(--hb-gc) 1px, transparent 1.8px);
  background-size: 100% 100%, var(--hb-s) var(--hb-s);
  -webkit-mask-image: radial-gradient(circle var(--hb-r) at var(--hb-x) var(--hb-y), #000 0%, transparent 100%);
  mask-image: radial-gradient(circle var(--hb-r) at var(--hb-x) var(--hb-y), #000 0%, transparent 100%);
  opacity: calc(var(--hb-o) * var(--hb-i));
  transition: opacity .5s ease;
}
@media (prefers-reduced-motion: reduce) {
  .hb-dg::after { transition: none; }
}
`;

export function DotGrid({
  size = 22,
  dotColor = "rgba(255,255,255,0.08)",
  glowColor = "#2f7bff",
  radius = 160,
  intensity = 0.6,
  className = "",
  style,
  ...rest
}: DotGridProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    function move(e: PointerEvent) {
      if (!el || !host) return;
      const r = host.getBoundingClientRect();
      el.style.setProperty("--hb-x", `${(e.clientX - r.left).toFixed(1)}px`);
      el.style.setProperty("--hb-y", `${(e.clientY - r.top).toFixed(1)}px`);
      el.style.setProperty("--hb-o", "1");
    }

    function leave() {
      if (!el) return;
      el.style.setProperty("--hb-o", "0");
    }

    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  const vars = {
    "--hb-s": `${size}px`,
    "--hb-dc": dotColor,
    "--hb-gc": glowColor,
    "--hb-r": `${radius}px`,
    "--hb-i": intensity,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`hb-dg ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-dot-grid" precedence="default">{css}</style>
    </div>
  );
}

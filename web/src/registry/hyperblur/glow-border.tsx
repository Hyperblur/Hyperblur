"use client";

import * as React from "react";

export interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  radius?: number;
  borderWidth?: number;
  rounded?: number;
}

const css = `
.hb-gb {
  --hb-x: 50%; --hb-y: 50%;
  position: relative;
  border-radius: var(--hb-rd);
}
.hb-gb::before, .hb-gb::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  padding: var(--hb-bw);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-gb::after { background: rgba(255, 255, 255, 0.08); }
.hb-gb::before {
  z-index: 1;
  background: radial-gradient(circle var(--hb-r) at var(--hb-x) var(--hb-y), var(--hb-c), transparent 70%);
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-gb:hover::before { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .hb-gb::before { transition: none; }
}
`;

export function GlowBorder({
  children,
  color = "#2f7bff",
  radius = 240,
  borderWidth = 1,
  rounded = 16,
  className = "",
  style,
  onPointerMove,
  ...rest
}: GlowBorderProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-x", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--hb-y", `${(e.clientY - r.top).toFixed(1)}px`);
  }

  const vars = {
    "--hb-c": color,
    "--hb-r": `${radius}px`,
    "--hb-bw": `${borderWidth}px`,
    "--hb-rd": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-gb ${className}`}
      style={vars}
      onPointerMove={handleMove}
      {...rest}
    >
      <style href="hb-glow-border" precedence="default">{css}</style>
      {children}
    </div>
  );
}

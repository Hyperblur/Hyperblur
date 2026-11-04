"use client";

import * as React from "react";

export interface DepthLayersProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  layers?: number;
  depth?: number;
  tilt?: number;
  color?: string;
  accent?: string;
  idle?: boolean;
}

const css = `
.hb-qs7 {
  --hb-qs7-c: #2f7bff;
  --hb-qs7-f: #f2f2f2;
  --hb-qs7-x: 0;
  --hb-qs7-y: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.35em 0.2em;
  font: inherit;
  touch-action: pan-y;
  perspective: 800px;
}
.hb-qs7 *, .hb-qs7 *::before, .hb-qs7 *::after { box-sizing: border-box; }
.hb-qs7-s {
  display: inline-grid;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--hb-qs7-y) * var(--hb-qs7-tilt) * -1deg)) rotateY(calc(var(--hb-qs7-x) * var(--hb-qs7-tilt) * 1deg));
  will-change: transform;
}
.hb-qs7-l {
  grid-area: 1 / 1;
  display: block;
  font: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: 1;
  text-align: center;
  white-space: pre-wrap;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  color: color-mix(in srgb, var(--hb-qs7-c) var(--hb-qs7-m), #05060a);
  transform: translate(
    calc(var(--hb-qs7-x) * var(--hb-qs7-i) * var(--hb-qs7-step) * -1px),
    calc(var(--hb-qs7-y) * var(--hb-qs7-i) * var(--hb-qs7-step) * -1px + var(--hb-qs7-i) * var(--hb-qs7-step) * 0.55px)
  );
}
.hb-qs7-l[data-deep="true"] { text-shadow: 0 0.12em 0.22em rgba(0, 0, 0, 0.55), 0 0.35em 0.6em rgba(0, 0, 0, 0.35); }
.hb-qs7-t {
  position: relative;
  grid-area: 1 / 1;
  display: block;
  font: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: 1;
  text-align: center;
  white-space: pre-wrap;
  color: var(--hb-qs7-f);
  text-shadow: 0 0 0.35em color-mix(in srgb, var(--hb-qs7-c) 35%, transparent);
  transform: translate(calc(var(--hb-qs7-x) * var(--hb-qs7-step) * 0.5px), calc(var(--hb-qs7-y) * var(--hb-qs7-step) * 0.5px)) translateZ(1px);
}
`;

export function DepthLayers({
  children,
  layers = 10,
  depth = 14,
  tilt = 10,
  color = "#f2f2f2",
  accent = "#2f7bff",
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  onPointerEnter,
  ...rest
}: DepthLayersProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const target = React.useRef({ x: 0, y: 0, active: false });
  const visible = React.useRef(true);
  const count = Math.max(2, Math.min(24, Math.round(layers)));
  const step = depth / (count - 1);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cur = { x: 0, y: 0 };
    function paint() {
      el!.style.setProperty("--hb-qs7-x", cur.x.toFixed(3));
      el!.style.setProperty("--hb-qs7-y", cur.y.toFixed(3));
    }
    if (reduced) {
      cur.x = 0.4;
      cur.y = -0.25;
      paint();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      visible.current = entries.some((e) => e.isIntersecting);
    });
    io.observe(el);
    let raf = 0;
    let last = 0;
    let t = 0;
    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      if (!visible.current) return;
      t += dt;
      const tg = target.current;
      const wantX = tg.active ? tg.x : idle ? Math.sin(t * 0.9) * 0.85 : 0;
      const wantY = tg.active ? tg.y : idle ? Math.cos(t * 0.65) * 0.55 : 0;
      const k = 1 - Math.exp(-dt * (tg.active ? 9 : 3));
      cur.x += (wantX - cur.x) * k;
      cur.y += (wantY - cur.y) * k;
      paint();
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [idle]);

  function point(e: React.PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / Math.max(1, box.width)) * 2 - 1;
    const y = ((e.clientY - box.top) / Math.max(1, box.height)) * 2 - 1;
    target.current.x = Math.max(-1, Math.min(1, x));
    target.current.y = Math.max(-1, Math.min(1, y));
    target.current.active = true;
  }

  const stack = Array.from({ length: count - 1 }, (_, n) => {
    const i = count - 1 - n;
    const mixPct = 18 + (1 - i / (count - 1)) * 62;
    return (
      <span
        key={i}
        className="hb-qs7-l"
        aria-hidden="true"
        data-deep={i === count - 1}
        style={{ "--hb-qs7-i": i, "--hb-qs7-m": `${mixPct.toFixed(1)}%` } as React.CSSProperties}
      >
        {children}
      </span>
    );
  });

  const vars = {
    "--hb-qs7-c": accent,
    "--hb-qs7-f": color,
    "--hb-qs7-step": step.toFixed(3),
    "--hb-qs7-tilt": tilt,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-text-depth-layers" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-qs7 ${className}`}
        style={vars}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          point(e);
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          point(e);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          target.current.active = false;
        }}
        {...rest}
      >
        <span className="hb-qs7-s">
          {stack}
          <span className="hb-qs7-t">{children}</span>
        </span>
      </div>
    </>
  );
}

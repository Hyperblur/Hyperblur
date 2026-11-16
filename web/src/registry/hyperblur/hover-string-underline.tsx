"use client";

import * as React from "react";

export interface HoverStringUnderlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  color?: string;
  thickness?: number;
  strength?: number;
  stiffness?: number;
  damping?: number;
}

const css = `
.hb-hsu { position: relative; display: inline-block; padding-bottom: 2px; cursor: pointer; }
.hb-hsu-svg { position: absolute; left: 0; right: 0; bottom: -11px; width: 100%; height: 24px; overflow: visible; pointer-events: none; }
.hb-hsu-path { fill: none; stroke: var(--hb-hsu-c); stroke-width: var(--hb-hsu-t); stroke-linecap: round; vector-effect: non-scaling-stroke; }
.hb-hsu::after { content: ""; position: absolute; left: -10px; right: -10px; top: -6px; bottom: -22px; }
.hb-hsu:focus-visible { outline: 2px solid var(--hb-hsu-c); outline-offset: 6px; border-radius: 4px; }
`;

export function HoverStringUnderline({
  children = "Hover the string",
  color = "currentColor",
  thickness = 2,
  strength = 1,
  stiffness = 0.14,
  damping = 0.9,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: HoverStringUnderlineProps) {
  const root = React.useRef<HTMLSpanElement>(null);
  const path = React.useRef<SVGPathElement>(null);
  const state = React.useRef({ y: 0, v: 0, x: 50, tx: 50, ty: 0, raf: 0, last: 0 });

  const draw = React.useCallback(() => {
    const s = state.current;
    path.current?.setAttribute("d", `M0 12 Q${s.x.toFixed(2)} ${(12 + s.y * 2).toFixed(2)} 100 12`);
  }, []);

  const tick = React.useCallback(
    (now: number) => {
      const s = state.current;
      const dt = Math.min(2, (now - (s.last || now)) / 16.67);
      s.last = now;
      s.v += (s.ty - s.y) * stiffness * dt;
      s.v *= Math.pow(damping, dt);
      s.y += s.v * dt;
      s.x += (s.tx - s.x) * Math.min(1, 0.35 * dt);
      draw();
      if (Math.abs(s.v) > 0.01 || Math.abs(s.ty - s.y) > 0.01) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.y = s.ty;
        s.raf = 0;
        s.last = 0;
        draw();
      }
    },
    [damping, draw, stiffness],
  );

  const wake = React.useCallback(() => {
    const s = state.current;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  }, [tick]);

  React.useEffect(() => {
    const s = state.current;
    draw();
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, [draw]);

  const move = (e: React.PointerEvent<HTMLSpanElement>) => {
    onPointerMove?.(e);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const s = state.current;
    const dy = Math.max(-26, Math.min(26, e.clientY - (r.bottom - 2)));
    s.tx = Math.max(4, Math.min(96, ((e.clientX - r.left) / Math.max(1, r.width)) * 100));
    s.ty = dy * strength;
    wake();
  };

  const leave = (e: React.PointerEvent<HTMLSpanElement>) => {
    onPointerLeave?.(e);
    const s = state.current;
    s.tx = 50;
    s.ty = 0;
    wake();
  };

  const vars = { "--hb-hsu-c": color, "--hb-hsu-t": `${thickness}px`, ...style } as React.CSSProperties;

  return (
    <span
      ref={root}
      className={`hb-hsu ${className}`}
      style={vars}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      {children}
      <svg className="hb-hsu-svg" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path ref={path} className="hb-hsu-path" d="M0 12 Q50 12 100 12" />
      </svg>
      <style href="hb-hover-string-underline" precedence="default">{css}</style>
    </span>
  );
}

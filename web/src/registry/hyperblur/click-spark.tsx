"use client";

import * as React from "react";

export interface ClickSparkProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  count?: number;
  size?: number;
  radius?: number;
  duration?: number;
  easing?: "ease-out" | "linear";
}

interface Burst {
  x: number;
  y: number;
  t: number;
  a: number;
}

const css = `
.hb-cs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-cs-c { display: block; width: 100%; height: 100%; }
@media (prefers-reduced-motion: reduce) {
  .hb-cs { display: none; }
}
`;

export function ClickSpark({
  color = "#ffffff",
  count = 8,
  size = 12,
  radius = 24,
  duration = 400,
  easing = "ease-out",
  className = "",
  style,
  ...rest
}: ClickSparkProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const TAU = Math.PI * 2;
    const n = Math.max(1, Math.min(64, Math.floor(count)));
    const life = Math.max(50, duration);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bursts: Burst[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let seq = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        const p = Math.max(0, (now - burst.t) / life);
        if (p >= 1) {
          bursts.splice(b, 1);
          continue;
        }
        const e = easing === "linear" ? p : 1 - Math.pow(1 - p, 3);
        const from = radius * e;
        const to = from + size * (1 - p);
        ctx.globalAlpha = 1 - p;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const a = burst.a + (i / n) * TAU;
          const c = Math.cos(a);
          const s = Math.sin(a);
          ctx.moveTo(burst.x + c * from, burst.y + s * from);
          ctx.lineTo(burst.x + c * to, burst.y + s * to);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = 0;
      draw(now);
      if (bursts.length) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (bursts.length) draw(performance.now());
    };

    const down = (ev: Event) => {
      const e = ev as PointerEvent;
      if (motion.matches || !w || !h) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const r = wrap.getBoundingClientRect();
      if (bursts.length >= 24) bursts.shift();
      bursts.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        t: performance.now(),
        a: ((seq++ * 0.6180339887) % 1) * (TAU / n),
      });
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    host.addEventListener("pointerdown", down, { passive: true });
    resize();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerdown", down);
    };
  }, [color, count, size, radius, duration, easing]);

  return (
    <div ref={wrapRef} className={`hb-cs ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-click-spark" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-cs-c" />
    </div>
  );
}

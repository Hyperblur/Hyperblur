"use client";

import * as React from "react";

export interface BeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  count?: number;
  speed?: number;
  angle?: number;
  blur?: number;
  seed?: number;
}

const css = `
.hb-bm { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-bm-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
`;

interface Beam {
  rot: number;
  start: number;
  vel: number;
  size: number;
  alpha: number;
  freq: number;
  phase: number;
  gradient: CanvasGradient | null;
}

function rnd(i: number, salt: number, seed: number) {
  let x = (Math.imul(i + 1, 2654435761) + Math.imul(salt + 1, 40503) + Math.imul(seed | 0, 2246822519)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function parseColor(ctx: CanvasRenderingContext2D, value: string): [number, number, number] {
  ctx.fillStyle = "#2f7bff";
  ctx.fillStyle = value;
  const s = String(ctx.fillStyle);
  if (s[0] === "#") {
    const n = parseInt(s.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = s.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Math.round(+m[0]), Math.round(+m[1]), Math.round(+m[2])] : [47, 123, 255];
}

export function Beams({
  color = "#2f7bff",
  count = 6,
  speed = 1,
  angle = 25,
  blur = 0.6,
  seed = 1,
  className = "",
  style,
  ...rest
}: BeamsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = Math.max(1, Math.round(count));
    const soft = Math.min(1, Math.max(0, blur));
    const rgb = parseColor(ctx, color);
    const core = rgb.map((v) => Math.round(v + (255 - v) * 0.45));
    const edge = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
    const mid = `rgba(${core[0]},${core[1]},${core[2]},1)`;

    const beams: Beam[] = Array.from({ length: total }, (_, i) => ({
      rot: ((angle + (rnd(i, 1, seed) - 0.5) * 16) * Math.PI) / 180,
      start: rnd(i, 2, seed),
      vel: (0.012 + rnd(i, 3, seed) * 0.022) * (rnd(i, 4, seed) < 0.25 ? -1 : 1),
      size: 0.05 + rnd(i, 5, seed) * 0.13,
      alpha: 0.16 + rnd(i, 6, seed) * 0.2,
      freq: 0.5 + rnd(i, 7, seed) * 0.9,
      phase: rnd(i, 8, seed) * Math.PI * 2,
      gradient: null,
    }));

    let w = 1;
    let h = 1;
    let dpr = 1;
    let diag = 1;
    let raf = 0;
    let last = 0;
    let time = 0;
    let visible = true;

    const build = () => {
      for (const b of beams) {
        const bw = b.size * diag;
        const g = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
        const fall = 0.1 + soft * 0.4;
        const steps = 5;
        for (let k = 0; k <= steps; k++) {
          const u = k / steps;
          const a = u * u * (3 - 2 * u);
          g.addColorStop(fall * u, edge(a * 0.85));
          g.addColorStop(1 - fall * u, edge(a * 0.85));
        }
        g.addColorStop(0.5, mid);
        b.gradient = g;
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const cx = w / 2;
      const cy = h / 2;
      for (const b of beams) {
        const bw = b.size * diag;
        const pos = (((b.start + b.vel * speed * t) % 1) + 1) % 1;
        const off = (pos - 0.5) * (diag + bw);
        const cos = Math.cos(b.rot);
        const sin = Math.sin(b.rot);
        const shimmer = 0.78 + 0.14 * Math.sin(t * b.freq + b.phase) + 0.08 * Math.sin(t * b.freq * 2.7 + b.phase * 1.7);
        ctx.globalAlpha = b.alpha * shimmer;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * (cx + cos * off), dpr * (cy + sin * off));
        if (b.gradient) ctx.fillStyle = b.gradient;
        ctx.fillRect(-bw / 2, -diag / 2, bw, diag);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const active = () => visible && !document.hidden && !reduce.matches;

    const frame = (now: number) => {
      raf = 0;
      time += Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(time);
      if (active()) raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      if (active()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        draw(time);
      }
    };

    const resize = () => {
      w = Math.max(1, wrap.clientWidth);
      h = Math.max(1, wrap.clientHeight);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      diag = Math.hypot(w, h);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      build();
      draw(time);
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });

    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [color, count, speed, angle, blur, seed]);

  return (
    <div ref={wrapRef} className={`hb-bm ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-beams" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-bm-canvas" />
    </div>
  );
}

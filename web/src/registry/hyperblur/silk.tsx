"use client";

import * as React from "react";

export interface SilkProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  secondary?: string;
  layers?: number;
  speed?: number;
  amplitude?: number;
  seed?: number;
}

const css = `
.hb-sk { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-sk-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
`;

interface Layer {
  base: number;
  amp: number;
  f1: number;
  f2: number;
  s1: number;
  s2: number;
  p1: number;
  p2: number;
  drift: number;
  breathe: number;
  rgb: [number, number, number];
  fill: CanvasGradient | null;
  line: CanvasGradient | null;
}

function rnd(i: number, salt: number, seed: number) {
  let x = (Math.imul(i + 1, 2654435761) + Math.imul(salt + 1, 40503) + Math.imul(seed | 0, 2246822519)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function parseColor(ctx: CanvasRenderingContext2D, value: string, fallback: string): [number, number, number] {
  ctx.fillStyle = fallback;
  ctx.fillStyle = value;
  const s = String(ctx.fillStyle);
  if (s[0] === "#") {
    const n = parseInt(s.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = s.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Math.round(+m[0]), Math.round(+m[1]), Math.round(+m[2])] : [47, 123, 255];
}

export function Silk({
  color = "#2f7bff",
  secondary = "#19c3f5",
  layers = 4,
  speed = 1,
  amplitude = 0.5,
  seed = 1,
  className = "",
  style,
  ...rest
}: SilkProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = Math.max(1, Math.round(layers));
    const amp = Math.min(1, Math.max(0, amplitude));
    const c1 = parseColor(ctx, color, "#2f7bff");
    const c2 = parseColor(ctx, secondary, "#19c3f5");
    const TAU = Math.PI * 2;
    const step = 8;

    const table = new Float32Array(32);
    for (let i = 0; i < 32; i++) table[i] = rnd(i, 99, seed) * 2 - 1;
    const noise = (x: number) => {
      const i = Math.floor(x);
      const f = x - i;
      const s = f * f * (3 - 2 * f);
      return table[i & 31] * (1 - s) + table[(i + 1) & 31] * s;
    };

    const stack: Layer[] = Array.from({ length: total }, (_, i) => {
      const u = total > 1 ? i / (total - 1) : 0.5;
      return {
        base: 0.3 + 0.5 * u + (rnd(i, 1, seed) - 0.5) * 0.06,
        amp: 0.05 + 0.17 * amp,
        f1: TAU * (0.6 + rnd(i, 2, seed) * 0.9),
        f2: TAU * (1.4 + rnd(i, 3, seed) * 1.6),
        s1: (0.2 + rnd(i, 4, seed) * 0.3) * (rnd(i, 5, seed) < 0.5 ? -1 : 1),
        s2: 0.15 + rnd(i, 6, seed) * 0.3,
        p1: rnd(i, 7, seed) * TAU,
        p2: rnd(i, 8, seed) * TAU,
        drift: i * 7.3 + rnd(i, 9, seed) * 10,
        breathe: rnd(i, 10, seed) * TAU,
        rgb: [
          Math.round(c1[0] + (c2[0] - c1[0]) * u),
          Math.round(c1[1] + (c2[1] - c1[1]) * u),
          Math.round(c1[2] + (c2[2] - c1[2]) * u),
        ],
        fill: null,
        line: null,
      };
    });

    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let time = 0;
    let visible = true;
    let sheen: CanvasGradient | null = null;

    const build = () => {
      const s = ctx.createLinearGradient(0, 0, w, 0);
      s.addColorStop(0, "rgba(255,255,255,0)");
      s.addColorStop(0.5, "rgba(255,255,255,0.06)");
      s.addColorStop(1, "rgba(255,255,255,0)");
      sheen = s;
      for (const l of stack) {
        const [r, g, b] = l.rgb;
        const top = l.base * h - l.amp * h * 2.2;
        const f = ctx.createLinearGradient(0, top, 0, h);
        f.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
        f.addColorStop(0.35, `rgba(${r},${g},${b},0.16)`);
        f.addColorStop(1, `rgba(${r},${g},${b},0)`);
        l.fill = f;
        const hi = [Math.round(r + (255 - r) * 0.5), Math.round(g + (255 - g) * 0.5), Math.round(b + (255 - b) * 0.5)];
        const e = ctx.createLinearGradient(0, 0, w, 0);
        e.addColorStop(0, `rgba(${hi[0]},${hi[1]},${hi[2]},0)`);
        e.addColorStop(0.3, `rgba(${hi[0]},${hi[1]},${hi[2]},0.7)`);
        e.addColorStop(0.7, `rgba(${hi[0]},${hi[1]},${hi[2]},0.7)`);
        e.addColorStop(1, `rgba(${hi[0]},${hi[1]},${hi[2]},0)`);
        l.line = e;
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.25;
      ctx.lineJoin = "round";
      const ts = t * speed;
      for (const l of stack) {
        const a = l.amp * h * (0.82 + 0.18 * Math.sin(ts * 0.4 + l.breathe));
        const y0 = l.base * h;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const n = noise(u * 2.2 + ts * 0.08 + l.drift);
          const y =
            y0 +
            a * Math.sin(u * l.f1 + ts * l.s1 + l.p1 + n * 1.1) +
            a * 0.5 * Math.sin(u * l.f2 - ts * l.s2 + l.p2 + n * 0.7);
          if (x < 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (l.line) ctx.strokeStyle = l.line;
        ctx.globalAlpha = 0.55;
        ctx.stroke();
        ctx.lineTo(w + step, h + 2);
        ctx.lineTo(-step, h + 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
        if (l.fill) ctx.fillStyle = l.fill;
        ctx.fill();
        if (sheen) {
          ctx.fillStyle = sheen;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
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
  }, [color, secondary, layers, speed, amplitude, seed]);

  return (
    <div ref={wrapRef} className={`hb-sk ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-silk" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-sk-canvas" />
    </div>
  );
}

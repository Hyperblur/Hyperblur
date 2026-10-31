"use client";

import * as React from "react";

export interface HyperspeedProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  count?: number;
  speed?: number;
  boost?: boolean;
  seed?: number;
}

const css = `
.hb-hs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-hs-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
`;

function rnd(i: number, salt: number, seed: number) {
  let x = (Math.imul(i + 1, 2654435761) + Math.imul(salt + 1, 40503) + Math.imul(seed | 0, 2246822519)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function parseColor(ctx: CanvasRenderingContext2D, value: string): [number, number, number] {
  ctx.fillStyle = "#ffffff";
  ctx.fillStyle = value;
  const s = String(ctx.fillStyle);
  if (s[0] === "#") {
    const n = parseInt(s.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = s.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Math.round(+m[0]), Math.round(+m[1]), Math.round(+m[2])] : [255, 255, 255];
}

export function Hyperspeed({
  color = "#ffffff",
  accent = "#2f7bff",
  count = 300,
  speed = 1,
  boost = false,
  seed = 1,
  className = "",
  style,
  ...rest
}: HyperspeedProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const boostRef = React.useRef(boost);
  const speedRef = React.useRef(speed);

  React.useEffect(() => {
    boostRef.current = boost;
    speedRef.current = speed;
  }, [boost, speed]);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = Math.max(1, Math.round(count));
    const main = parseColor(ctx, color);
    const acc = parseColor(ctx, accent);
    const palette = [`rgb(${main[0]},${main[1]},${main[2]})`, `rgb(${acc[0]},${acc[1]},${acc[2]})`];

    const cosA = new Float32Array(total);
    const sinA = new Float32Array(total);
    const dist = new Float32Array(total);
    const depth = new Float32Array(total);
    const pace = new Float32Array(total);
    const tint = new Uint8Array(total);

    let spawned = 0;
    const place = (i: number, fresh: boolean) => {
      const n = fresh ? i : total + spawned++;
      const a = rnd(n, 11, seed) * Math.PI * 2;
      cosA[i] = Math.cos(a);
      sinA[i] = Math.sin(a);
      dist[i] = 0.2 + 0.8 * Math.sqrt(rnd(n, 12, seed));
      pace[i] = 0.6 + 0.8 * rnd(n, 13, seed);
      tint[i] = rnd(n, 14, seed) < 0.25 ? 1 : 0;
      depth[i] = fresh ? 0.04 + 0.96 * rnd(n, 15, seed) : 1;
    };

    for (let i = 0; i < total; i++) place(i, true);

    let w = 1;
    let h = 1;
    let dpr = 1;
    let diag = 1;
    let raf = 0;
    let last = 0;
    let visible = true;
    let pressed = false;
    let glow: CanvasGradient | null = null;
    let cur = reduce.matches ? 2 : 1;

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      const base = speedRef.current;
      const target = boostRef.current || pressed ? 5 : 1;
      cur += (target - cur) * (1 - Math.exp(-dt * 2.5));

      const cx = w / 2;
      const cy = h / 2;
      const scale = diag * 0.04;
      const reach = diag * 0.5;
      const trail = 0.07;

      if (glow) {
        ctx.globalAlpha = Math.min(0.6, 0.14 + 0.12 * (cur - 1));
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      let lastTint = -1;
      for (let i = 0; i < total; i++) {
        const rate = pace[i] * 0.32 * base * cur;
        depth[i] -= rate * dt;
        let z = depth[i];
        let r = (dist[i] * scale) / z;
        if (z <= 0.02 || r > reach) {
          place(i, false);
          z = depth[i];
          r = (dist[i] * scale) / z;
        }
        const zp = Math.min(1.6, z + Math.max(0.01, rate * trail));
        const rp = (dist[i] * scale) / zp;
        const near = 1 - z;
        const ca = cosA[i];
        const sa = sinA[i];

        if (tint[i] !== lastTint) {
          lastTint = tint[i];
          ctx.strokeStyle = palette[lastTint];
        }
        const alpha = Math.min(1, 0.15 + near * 1.1);
        const lw = 0.5 + near * 1.6;
        ctx.beginPath();
        ctx.moveTo(cx + ca * rp, cy + sa * rp);
        ctx.lineTo(cx + ca * r, cy + sa * r);
        ctx.globalAlpha = alpha * 0.25;
        ctx.lineWidth = lw * 3;
        ctx.stroke();
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lw;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const active = () => visible && !document.hidden && !reduce.matches;

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
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
        draw(0);
      }
    };

    const resize = () => {
      w = Math.max(1, wrap.clientWidth);
      h = Math.max(1, wrap.clientHeight);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      diag = Math.hypot(w, h);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, diag * 0.35);
      g.addColorStop(0, `rgba(${acc[0]},${acc[1]},${acc[2]},0.5)`);
      g.addColorStop(0.4, `rgba(${acc[0]},${acc[1]},${acc[2]},0.12)`);
      g.addColorStop(1, `rgba(${acc[0]},${acc[1]},${acc[2]},0)`);
      glow = g;
      draw(0);
    };

    const down = () => {
      pressed = true;
    };
    const up = () => {
      pressed = false;
    };

    const host = wrap.parentElement;
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });

    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    if (host) host.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      if (host) host.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [color, accent, count, seed]);

  return (
    <div ref={wrapRef} className={`hb-hs ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-hyperspeed" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hs-canvas" />
    </div>
  );
}

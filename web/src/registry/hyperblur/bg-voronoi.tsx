"use client";

import * as React from "react";

export interface BgVoronoiProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  cells?: number;
  gap?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

type Pt = [number, number];

function clip(poly: Pt[], mx: number, my: number, nx: number, ny: number): Pt[] {
  const out: Pt[] = [];
  const len = poly.length;
  for (let i = 0; i < len; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % len];
    const da = (a[0] - mx) * nx + (a[1] - my) * ny;
    const db = (b[0] - mx) * nx + (b[1] - my) * ny;
    if (da <= 0) out.push(a);
    if ((da <= 0) !== (db <= 0)) {
      const k = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
    }
  }
  return out;
}

export function BgVoronoi({
  color = "#121722",
  accent = "#2f7bff",
  background = "#05060a",
  cells = 24,
  gap = 3,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgVoronoiProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = wrap?.parentElement;
    if (!wrap || !canvas || !ctx || !host) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const hostEl: HTMLElement = host;

    const base = rgbOf(color, [18, 23, 34]);
    const ac = rgbOf(accent, [47, 123, 255]);
    const n = Math.max(6, Math.min(80, Math.round(cells)));
    const seeds = Array.from({ length: n }, (_, i) => ({
      x: rnd(i * 5 + 11),
      y: rnd(i * 5 + 12),
      fx: 0.08 + rnd(i * 5 + 13) * 0.18,
      fy: 0.07 + rnd(i * 5 + 14) * 0.16,
      ph: rnd(i * 5 + 15) * 6.283,
      lum: rnd(i * 5 + 16),
    }));
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const lit = new Float32Array(n);

    let w = 0;
    let h = 0;
    let t = 0;
    let mx = -9999;
    let my = -9999;
    let inside = false;

    function render(dt: number) {
      if (!w || !h) return;
      const amp = Math.sqrt((w * h) / n) * 0.28;
      for (let i = 0; i < n; i++) {
        const s = seeds[i];
        sx[i] = s.x * w + Math.sin(t * s.fx + s.ph) * amp;
        sy[i] = s.y * h + Math.cos(t * s.fy + s.ph * 1.3) * amp;
      }
      let near = -1;
      if (inside) {
        let best = Infinity;
        for (let i = 0; i < n; i++) {
          const d = (sx[i] - mx) ** 2 + (sy[i] - my) ** 2;
          if (d < best) {
            best = d;
            near = i;
          }
        }
      }
      const sweep = ((t * 0.09) % 1.6) - 0.3;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      g.lineJoin = "round";
      for (let i = 0; i < n; i++) {
        let poly: Pt[] = [
          [-40, -40],
          [w + 40, -40],
          [w + 40, h + 40],
          [-40, h + 40],
        ];
        for (let j = 0; j < n && poly.length; j++) {
          if (j === i) continue;
          poly = clip(poly, (sx[i] + sx[j]) / 2, (sy[i] + sy[j]) / 2, sx[j] - sx[i], sy[j] - sy[i]);
        }
        if (poly.length < 3) continue;
        let cx = 0;
        let cy = 0;
        for (const p of poly) {
          cx += p[0];
          cy += p[1];
        }
        cx /= poly.length;
        cy /= poly.length;
        const s = seeds[i];
        const blink = Math.max(0, Math.sin(t * 0.55 + s.ph * 3)) ** 14;
        const band = Math.max(0, 1 - Math.abs(cx / w - sweep) / 0.14);
        const target = Math.max(blink, band * 0.55, i === near ? 1 : 0);
        lit[i] += (target - lit[i]) * Math.min(1, dt > 0 ? dt * 5 : 1);
        const a = lit[i];
        g.beginPath();
        for (let k = 0; k < poly.length; k++) {
          const p = poly[k];
          const dx = cx - p[0];
          const dy = cy - p[1];
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const m = Math.min(gap, d * 0.4);
          const x = p[0] + (dx / d) * m;
          const y = p[1] + (dy / d) * m;
          if (k) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        g.closePath();
        const lift = 0.75 + s.lum * 0.5;
        const r = Math.min(255, base[0] * lift + ac[0] * a * 0.35);
        const gg = Math.min(255, base[1] * lift + ac[1] * a * 0.35);
        const bb = Math.min(255, base[2] * lift + ac[2] * a * 0.35);
        const grad = g.createRadialGradient(sx[i], sy[i], 0, sx[i], sy[i], amp * 2.6);
        grad.addColorStop(0, `rgb(${(r + 10 + a * 30) | 0},${(gg + 12 + a * 30) | 0},${(bb + 16 + a * 30) | 0})`);
        grad.addColorStop(1, `rgb(${(r * 0.62) | 0},${(gg * 0.62) | 0},${(bb * 0.62) | 0})`);
        g.fillStyle = grad;
        g.fill();
        g.lineWidth = 1;
        g.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${(0.08 + a * 0.75).toFixed(3)})`;
        g.stroke();
        g.fillStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${(0.18 + a * 0.8).toFixed(3)})`;
        g.beginPath();
        g.arc(sx[i], sy[i], 1.2 + a * 1.4, 0, 6.2832);
        g.fill();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 6;
      inside = false;
      render(0);
    }

    function resize() {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
      else render(0);
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      render(dt);
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) still();
    }

    function move(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      inside = true;
    }

    function leave() {
      inside = false;
    }

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(el);
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    hostEl.addEventListener("pointermove", move, { passive: true });
    hostEl.addEventListener("pointerleave", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      hostEl.removeEventListener("pointermove", move);
      hostEl.removeEventListener("pointerleave", leave);
    };
  }, [color, accent, background, cells, gap, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve3 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-voronoi" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve3-c" aria-hidden="true" />
      {children ? <div className="hb-ve3-in">{children}</div> : null}
    </div>
  );
}

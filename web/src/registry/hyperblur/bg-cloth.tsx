"use client";

import * as React from "react";

export interface BgClothProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  folds?: number;
  sheen?: number;
  detail?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve8 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve8-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve8-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BgCloth({
  color = "#1a2b52",
  accent = "#9cc2ff",
  background = "#05060a",
  folds = 1,
  sheen = 1,
  detail = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgClothProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;

    const base = rgbOf(color, [26, 43, 82]);
    const hi = rgbOf(accent, [156, 194, 255]);
    const lx0 = -0.45;
    const ly0 = -0.62;
    const lz0 = 0.64;
    const ll = Math.hypot(lx0, ly0, lz0);
    const lx = lx0 / ll;
    const ly = ly0 / ll;
    const lz = lz0 / ll;
    const hx0 = lx;
    const hy0 = ly;
    const hz0 = lz + 1;
    const hl = Math.hypot(hx0, hy0, hz0);
    const hx = hx0 / hl;
    const hy = hy0 / hl;
    const hz = hz0 / hl;

    let w = 0;
    let h = 0;
    let t = 0;
    let cols = 0;
    let rows = 0;
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let sh = new Float32Array(0);
    let sp = new Float32Array(0);

    function height(x: number, y: number) {
      const f = Math.max(0.2, folds);
      return (
        Math.sin(x * 0.55 * f + y * 0.22 - t * 0.9) * 1.0 +
        Math.sin(x * 0.23 * f - y * 0.5 - t * 0.55 + 1.7) * 0.75 +
        Math.sin((x * 0.9 + y * 1.1) * f - t * 1.6) * 0.16
      );
    }

    function setup() {
      const cell = Math.max(10, 18 / Math.max(0.4, detail));
      cols = Math.min(110, Math.ceil(w / cell) + 3);
      rows = Math.min(80, Math.ceil(h / cell) + 3);
      const n = cols * rows;
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      sh = new Float32Array(n);
      sp = new Float32Array(n);
    }

    function render() {
      if (!w || !h || !cols) return;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const cw = (w + 40) / (cols - 1);
      const ch = (h + 40) / (rows - 1);
      const unit = Math.max(w, h) / 16;
      const amp = Math.min(w, h) * 0.035;
      const e = 0.35;
      const gl = Math.max(0, sheen);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const gx = (c * cw) / unit;
          const gy = (r * ch) / unit;
          const z = height(gx, gy);
          const dx = (height(gx + e, gy) - z) / e;
          const dy = (height(gx, gy + e) - z) / e;
          const nl = Math.hypot(dx, dy, 1.6);
          const nx = -dx / nl;
          const ny = -dy / nl;
          const nz = 1.6 / nl;
          const lam = Math.max(0, nx * lx + ny * ly + nz * lz);
          const ndh = Math.max(0, nx * hx + ny * hy + nz * hz);
          sh[i] = lam;
          sp[i] = Math.pow(ndh, 28) * gl + Math.pow(ndh, 6) * 0.12 * gl;
          vx[i] = -20 + c * cw + dx * amp * 0.25;
          vy[i] = -20 + r * ch - z * amp;
        }
      }
      g.lineJoin = "round";
      g.lineWidth = 0.8;
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a = r * cols + c;
          const b2 = a + 1;
          const d = a + cols;
          const e2 = d + 1;
          const s = (sh[a] + sh[b2] + sh[d] + sh[e2]) * 0.25;
          const q = (sp[a] + sp[b2] + sp[d] + sp[e2]) * 0.25;
          const m = 0.18 + s * 0.95;
          const rr = Math.min(255, base[0] * m + hi[0] * q);
          const gg = Math.min(255, base[1] * m + hi[1] * q);
          const bb = Math.min(255, base[2] * m + hi[2] * q);
          const col = `rgb(${rr | 0},${gg | 0},${bb | 0})`;
          g.fillStyle = col;
          g.strokeStyle = col;
          g.beginPath();
          g.moveTo(vx[a], vy[a]);
          g.lineTo(vx[b2], vy[b2]);
          g.lineTo(vx[e2], vy[e2]);
          g.lineTo(vx[d], vy[d]);
          g.closePath();
          g.fill();
          g.stroke();
        }
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 2.2;
      render();
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
      setup();
      if (motion.matches) still();
      else render();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      render();
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

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(el);
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [color, accent, background, folds, sheen, detail, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve8 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-cloth" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve8-c" aria-hidden="true" />
      {children ? <div className="hb-ve8-in">{children}</div> : null}
    </div>
  );
}

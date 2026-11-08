"use client";

import * as React from "react";

export interface BgDotSwellProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  columns?: number;
  rows?: number;
  height?: number;
  horizon?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve4-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BgDotSwell({
  color = "#5b6a86",
  accent = "#7fb3ff",
  background = "#05060a",
  columns = 80,
  rows = 40,
  height = 1,
  horizon = 0.34,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgDotSwellProps) {
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

    const ca = rgbOf(color, [91, 106, 134]);
    const cb = rgbOf(accent, [127, 179, 255]);
    const cols = Math.max(12, Math.min(140, Math.round(columns)));
    const rws = Math.max(8, Math.min(90, Math.round(rows)));
    const B = 10;
    const fills: string[] = [];
    for (let i = 0; i < B; i++) {
      const k = i / (B - 1);
      fills.push(`rgb(${Math.round(ca[0] + (cb[0] - ca[0]) * k)},${Math.round(ca[1] + (cb[1] - ca[1]) * k)},${Math.round(ca[2] + (cb[2] - ca[2]) * k)})`);
    }
    const A = 6;

    let w = 0;
    let h = 0;
    let t = 0;

    function surface(x: number, z: number) {
      const r1 = Math.sqrt((x + 0.9) ** 2 + (z - 2.2) ** 2);
      const r2 = Math.sqrt((x - 1.1) ** 2 + (z - 3.4) ** 2);
      return (
        0.09 * Math.sin(x * 1.9 + t * 0.9) +
        0.07 * Math.sin(z * 2.6 - t * 1.25) +
        0.06 * Math.sin(r1 * 6 - t * 2.1) +
        0.05 * Math.sin(r2 * 5.2 - t * 1.7)
      ) * height;
    }

    function render() {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      const f = Math.max(w, h * 1.4) * 0.5;
      const hy = h * horizon;
      const cam = 0.62;
      const zNear = 0.75;
      const zFar = 5.2;
      const spanX = 3.4 * Math.max(1, w / h / 1.4);
      const buckets: Path2D[][] = [];
      for (let a = 0; a < A; a++) {
        const row: Path2D[] = [];
        for (let c = 0; c < B; c++) row.push(new Path2D());
        buckets.push(row);
      }
      for (let r = rws - 1; r >= 0; r--) {
        const z = zNear + (zFar - zNear) * (r / (rws - 1));
        const depth = (z - zNear) / (zFar - zNear);
        const di = Math.min(A - 1, Math.floor(depth * A));
        const size = Math.max(0.45, (2.2 / z) * (f / 300));
        for (let c = 0; c < cols; c++) {
          const x = -spanX + (2 * spanX * c) / (cols - 1);
          const y = surface(x, z);
          const px = w / 2 + (x / z) * f;
          if (px < -10 || px > w + 10) continue;
          const py = hy + ((cam - y) / z) * f;
          if (py < -10 || py > h + 10) continue;
          const k = Math.max(0, Math.min(B - 1, Math.round(((y / Math.max(0.05, height)) + 0.27) / 0.54 * (B - 1))));
          const p = buckets[di][k];
          p.moveTo(px + size, py);
          p.arc(px, py, size * (1 + (k / (B - 1)) * 0.35), 0, 6.2832);
        }
      }
      for (let a = A - 1; a >= 0; a--) {
        g.globalAlpha = Math.max(0.08, 1 - a / A) * 0.95;
        for (let c = 0; c < B; c++) {
          g.fillStyle = fills[c];
          g.fill(buckets[a][c]);
        }
      }
      g.globalAlpha = 1;
      const fog = g.createLinearGradient(0, hy - 10, 0, hy + h * 0.22);
      fog.addColorStop(0, background);
      fog.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = fog;
      g.fillRect(0, 0, w, hy + h * 0.22);
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 2.4;
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
  }, [color, accent, background, columns, rows, height, horizon, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve4 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-dot-swell" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve4-c" aria-hidden="true" />
      {children ? <div className="hb-ve4-in">{children}</div> : null}
    </div>
  );
}

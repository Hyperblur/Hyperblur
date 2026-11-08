"use client";

import * as React from "react";

export interface BgCrystalFacetsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  facet?: number;
  relief?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve9 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve9-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve9-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
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

export function BgCrystalFacets({
  color = "#28334d",
  accent = "#9fd0ff",
  background = "#05060a",
  facet = 84,
  relief = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgCrystalFacetsProps) {
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

    const base = rgbOf(color, [40, 51, 77]);
    const hi = rgbOf(accent, [159, 208, 255]);
    const bg = rgbOf(background, [5, 6, 10]);

    let w = 0;
    let h = 0;
    let t = 0;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pz = new Float32Array(0);
    let ph = new Float32Array(0);
    let flip = new Uint8Array(0);
    let zbuf = new Float32Array(0);

    function setup() {
      cell = Math.max(36, facet);
      cols = Math.ceil(w / cell) + 3;
      rows = Math.ceil(h / cell) + 3;
      const n = cols * rows;
      px = new Float32Array(n);
      py = new Float32Array(n);
      pz = new Float32Array(n);
      ph = new Float32Array(n);
      flip = new Uint8Array(n);
      zbuf = new Float32Array(n);
      const ox = (w - (cols - 1) * cell) / 2;
      const oy = (h - (rows - 1) * cell) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const edge = r === 0 || c === 0 || r === rows - 1 || c === cols - 1;
          px[i] = ox + c * cell + (edge ? 0 : (rnd(i * 3 + 1) - 0.5) * cell * 0.72);
          py[i] = oy + r * cell + (edge ? 0 : (rnd(i * 3 + 2) - 0.5) * cell * 0.72);
          pz[i] = rnd(i * 3 + 3);
          ph[i] = rnd(i * 7 + 5) * 6.283;
          flip[i] = rnd(i * 11 + 9) > 0.5 ? 1 : 0;
        }
      }
    }

    function tri(a: number, b: number, c: number, lx: number, ly: number, lz: number, sweep: number, zs: Float32Array) {
      const ax = px[b] - px[a];
      const ay = py[b] - py[a];
      const az = (zs[b] - zs[a]) * cell * 0.55 * relief;
      const bx = px[c] - px[a];
      const by = py[c] - py[a];
      const bz = (zs[c] - zs[a]) * cell * 0.55 * relief;
      let nx = ay * bz - az * by;
      let ny = az * bx - ax * bz;
      let nz = ax * by - ay * bx;
      if (nz < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl;
      ny /= nl;
      nz /= nl;
      const lam = Math.max(0, nx * lx + ny * ly + nz * lz);
      const hx = lx;
      const hy = ly;
      const hz = lz + 1;
      const hl = Math.hypot(hx, hy, hz);
      const spec = Math.pow(Math.max(0, (nx * hx + ny * hy + nz * hz) / hl), 36);
      const cx = (px[a] + px[b] + px[c]) / 3;
      const cy = (py[a] + py[b] + py[c]) / 3;
      const dd = (cx + cy) / (w + h) - sweep;
      const band = Math.exp(-(dd * dd) / 0.004) * 0.5;
      const m = 0.22 + lam * 0.9;
      const q = Math.min(1, spec + band * (0.4 + lam));
      const r = Math.min(255, bg[0] + base[0] * m + (hi[0] - base[0] * m) * q);
      const gg = Math.min(255, bg[1] + base[1] * m + (hi[1] - base[1] * m) * q);
      const bb = Math.min(255, bg[2] + base[2] * m + (hi[2] - base[2] * m) * q);
      g.fillStyle = `rgb(${r | 0},${gg | 0},${bb | 0})`;
      g.beginPath();
      g.moveTo(px[a], py[a]);
      g.lineTo(px[b], py[b]);
      g.lineTo(px[c], py[c]);
      g.closePath();
      g.fill();
      g.strokeStyle = `rgba(${hi[0]},${hi[1]},${hi[2]},${(0.05 + q * 0.4).toFixed(3)})`;
      g.stroke();
    }

    function render() {
      if (!w || !h || !cols) return;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const zs = zbuf;
      for (let i = 0; i < pz.length; i++) zs[i] = pz[i] + 0.22 * Math.sin(t * 0.7 + ph[i]);
      const ang = t * 0.22;
      const lx0 = Math.cos(ang) * 0.62;
      const ly0 = Math.sin(ang) * 0.42 - 0.3;
      const lz0 = 0.62;
      const ll = Math.hypot(lx0, ly0, lz0);
      const lx = lx0 / ll;
      const ly = ly0 / ll;
      const lz = lz0 / ll;
      const sweep = ((t * 0.08) % 1.8) - 0.4;
      g.lineWidth = 0.7;
      g.lineJoin = "round";
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a = r * cols + c;
          const b = a + 1;
          const d = a + cols;
          const e = d + 1;
          if (flip[a]) {
            tri(a, b, e, lx, ly, lz, sweep, zs);
            tri(a, e, d, lx, ly, lz, sweep, zs);
          } else {
            tri(a, b, d, lx, ly, lz, sweep, zs);
            tri(b, e, d, lx, ly, lz, sweep, zs);
          }
        }
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 3.4;
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
  }, [color, accent, background, facet, relief, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve9 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-crystal-facets" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve9-c" aria-hidden="true" />
      {children ? <div className="hb-ve9-in">{children}</div> : null}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgMeshLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  accent?: string;
  background?: string;
  handles?: boolean;
  softness?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd5-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd5-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const defaultColors = ["#2f7bff", "#0b1f4d", "#7fb3ff", "#5b3df5", "#0a0a12", "#1e4fd6"];

function hash(i: number) {
  let x = Math.imul(i ^ 0x3c6ef372, 0xa54ff53a);
  x ^= x >>> 16;
  x = Math.imul(x, 0x510e527f);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function rgb(hex: string): [number, number, number] {
  let s = hex.replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  const n = parseInt(s.slice(0, 6), 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BgMeshLattice({
  colors = defaultColors,
  accent = "#ffffff",
  background = "#06070d",
  handles = true,
  softness = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgMeshLatticeProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorKey = (colors.length ? colors : defaultColors).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!wrap || !canvas || !context || !octx) return;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = context;
    const o: CanvasRenderingContext2D = octx;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = colorKey.split("|");
    const COLS = 4;
    const ROWS = 3;
    const pts = Array.from({ length: COLS * ROWS }, (_, i) => {
      const cx = i % COLS;
      const cy = Math.floor(i / COLS);
      const hexColor = palette[(i * 5 + Math.floor(hash(i + 3) * palette.length)) % palette.length];
      return {
        bx: -0.08 + (cx / (COLS - 1)) * 1.16,
        by: -0.1 + (cy / (ROWS - 1)) * 1.2,
        ax: 0.05 + 0.07 * hash(i * 4 + 1),
        ay: 0.05 + 0.08 * hash(i * 4 + 2),
        f: 0.12 + 0.14 * hash(i * 4 + 3),
        ph: hash(i * 4 + 4) * 6.28,
        hex: hexColor,
        c: rgb(hexColor),
        x: 0,
        y: 0,
      };
    });
    const bg = rgb(background);
    let w = 0;
    let h = 0;
    let bw = 0;
    let bh = 0;
    let img: ImageData | null = null;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;

    function place() {
      for (const p of pts) {
        p.x = p.bx + p.ax * Math.sin(t * p.f + p.ph);
        p.y = p.by + p.ay * Math.cos(t * p.f * 0.83 + p.ph * 1.3);
      }
    }

    function paint() {
      if (!img) return;
      const data = img.data;
      const aspect = w / Math.max(1, h);
      const sig = 0.2 * Math.max(0.3, softness);
      const inv = 1 / (2 * sig * sig);
      for (let y = 0; y < bh; y++) {
        const v = y / (bh - 1);
        for (let x = 0; x < bw; x++) {
          const u = x / (bw - 1);
          let r = 0;
          let gg = 0;
          let b = 0;
          let ws = 0.02;
          for (const p of pts) {
            const dx = (u - p.x) * aspect;
            const dy = v - p.y;
            const wt = Math.exp(-(dx * dx + dy * dy) * inv);
            r += p.c[0] * wt;
            gg += p.c[1] * wt;
            b += p.c[2] * wt;
            ws += wt;
          }
          r = (r + bg[0] * 0.02) / ws;
          gg = (gg + bg[1] * 0.02) / ws;
          b = (b + bg[2] * 0.02) / ws;
          const n = (((x * 7 + y * 13) % 5) - 2) * 0.9;
          const i4 = (y * bw + x) * 4;
          data[i4] = r + n;
          data[i4 + 1] = gg + n;
          data[i4 + 2] = b + n;
          data[i4 + 3] = 255;
        }
      }
      o.putImageData(img, 0, 0);
    }

    function lattice() {
      const P = (i: number) => ({ x: pts[i].x * w, y: pts[i].y * h });
      g.strokeStyle = accent;
      g.lineWidth = 1;
      g.globalAlpha = 0.13;
      g.beginPath();
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const a = P(r * COLS + c);
          if (c === 0) g.moveTo(a.x, a.y);
          if (c < COLS - 1) {
            const b = P(r * COLS + c + 1);
            const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            g.quadraticCurveTo(a.x + (m.x - a.x) * 0.6, a.y, m.x, m.y);
            g.quadraticCurveTo(b.x - (b.x - m.x) * 0.6, b.y, b.x, b.y);
          }
        }
      }
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const a = P(r * COLS + c);
          if (r === 0) g.moveTo(a.x, a.y);
          if (r < ROWS - 1) {
            const b = P((r + 1) * COLS + c);
            const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            g.quadraticCurveTo(a.x, a.y + (m.y - a.y) * 0.6, m.x, m.y);
            g.quadraticCurveTo(b.x, b.y - (b.y - m.y) * 0.6, b.x, b.y);
          }
        }
      }
      g.stroke();
      const order = [5, 6, 2, 9, 1, 10];
      const sel = order[Math.floor(t / 3.2) % order.length];
      const phase = (t / 3.2) % 1;
      const appear = Math.min(1, phase * 6, (1 - phase) * 6);
      for (let i = 0; i < pts.length; i++) {
        const p = P(i);
        if (p.x < -6 || p.y < -6 || p.x > w + 6 || p.y > h + 6) continue;
        const active = i === sel;
        if (active && appear > 0) {
          const left = P(i % COLS === 0 ? i : i - 1);
          const right = P(i % COLS === COLS - 1 ? i : i + 1);
          const hx = (right.x - left.x) * 0.18;
          const hy = (right.y - left.y) * 0.18;
          g.globalAlpha = 0.7 * appear;
          g.beginPath();
          g.moveTo(p.x - hx, p.y - hy);
          g.lineTo(p.x + hx, p.y + hy);
          g.stroke();
          g.fillStyle = accent;
          g.beginPath();
          g.arc(p.x - hx, p.y - hy, 2.4, 0, Math.PI * 2);
          g.arc(p.x + hx, p.y + hy, 2.4, 0, Math.PI * 2);
          g.fill();
          g.globalAlpha = 0.9 * appear;
          g.font = "500 9px ui-monospace, SFMono-Regular, Menlo, monospace";
          g.textBaseline = "middle";
          const label = pts[i].hex.toUpperCase();
          const tx = p.x + 10 > w - 60 ? p.x - 62 : p.x + 10;
          g.fillStyle = "rgba(0,0,0,0.55)";
          g.fillRect(tx - 4, p.y + 8, 56, 14);
          g.fillStyle = accent;
          g.fillText(label, tx, p.y + 15.5);
        }
        g.globalAlpha = active ? 1 : 0.55;
        g.fillStyle = active ? accent : "rgba(10,10,14,0.85)";
        g.fillRect(p.x - 3, p.y - 3, 6, 6);
        g.strokeStyle = accent;
        g.lineWidth = 1;
        g.strokeRect(p.x - 3.5, p.y - 3.5, 7, 7);
      }
      g.globalAlpha = 1;
    }

    function draw() {
      if (!w || !h) return;
      place();
      paint();
      g.globalAlpha = 1;
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "high";
      g.drawImage(off, 0, 0, bw, bh, 0, 0, w, h);
      if (handles) lattice();
    }

    function resize() {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      bw = 72;
      bh = Math.max(8, Math.min(96, Math.round((72 * h) / w)));
      off.width = bw;
      off.height = bh;
      img = o.createImageData(bw, bh);
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) t = 2;
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      draw();
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
      if (motion.matches) {
        t = 2;
        draw();
      }
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
  }, [colorKey, accent, background, handles, softness, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd5 ${className}`} style={style} {...rest}>
      <style href="hb-bg-mesh-lattice" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd5-c" aria-hidden="true" />
      {children ? <div className="hb-vd5-in">{children}</div> : null}
    </div>
  );
}

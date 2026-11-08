"use client";

import * as React from "react";

export interface BgHelixThreadsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  threads?: number;
  angle?: number;
  twist?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve15 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve15-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve15-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
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

export function BgHelixThreads({
  color = "#7fb3ff",
  accent = "#ff7ad9",
  background = "#05060b",
  threads = 3,
  angle = -14,
  twist = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgHelixThreadsProps) {
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

    const ca = rgbOf(color, [127, 179, 255]);
    const cb = rgbOf(accent, [255, 122, 217]);
    const n = Math.max(1, Math.min(8, Math.round(threads)));
    const helices = Array.from({ length: n }, (_, i) => {
      const z = n === 1 ? 1 : 0.45 + (i / (n - 1)) * 0.55;
      return {
        z,
        off: n === 1 ? 0 : ((i + 0.5) / n - 0.5) * 1.2 + (rnd(i * 3 + 1) - 0.5) * 0.18,
        tilt: (rnd(i * 3 + 2) - 0.5) * 0.22,
        ph: rnd(i * 3 + 3) * 6.283,
        dir: i % 2 ? -1 : 1,
      };
    });

    let w = 0;
    let h = 0;
    let t = 0;

    function rgba(c: [number, number, number], a: number) {
      return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
    }

    function drawHelix(hx: (typeof helices)[number]) {
      const th = (angle * Math.PI) / 180 + hx.tilt;
      const ux = Math.cos(th);
      const uy = Math.sin(th);
      const nx = -uy;
      const ny = ux;
      const diag = Math.hypot(w, h);
      const cx = w / 2 + nx * hx.off * h * 0.5;
      const cy = h / 2 + ny * hx.off * h * 0.5;
      const amp = Math.min(h * 0.11, 70) * hx.z;
      const period = Math.max(120, Math.min(w, 900) * 0.42) * hx.z;
      const k = (6.2832 / period) * Math.max(0.2, twist);
      const flow = t * 0.9 * hx.dir + hx.ph;
      const step = 5;
      const half = diag / 2 + 40;
      const count = Math.ceil((half * 2) / step);
      const ax: number[] = [];
      const ay: number[] = [];
      const ad: number[] = [];
      for (let i = 0; i <= count; i++) {
        const s = -half + i * step;
        const p = s * k + flow;
        const sway = Math.sin(s * 0.004 + t * 0.3 + hx.ph) * amp * 0.5;
        const bx = cx + ux * s + nx * sway;
        const by = cy + uy * s + ny * sway;
        ax.push(bx);
        ay.push(by);
        ad.push(p);
      }
      const baseA = 0.25 + hx.z * 0.75;
      const lw = 0.8 + hx.z * 1.6;
      const pt = (i: number, sgn: number): [number, number, number] => {
        const sp = Math.sin(ad[i]) * sgn;
        const dp = Math.cos(ad[i]) * sgn;
        return [ax[i] + nx * sp * amp, ay[i] + ny * sp * amp, dp];
      };
      g.lineCap = "round";
      for (const front of [false, true]) {
        for (const sgn of [1, -1]) {
          const col = sgn > 0 ? ca : cb;
          let prev = pt(0, sgn);
          for (let i = 1; i <= count; i++) {
            const cur = pt(i, sgn);
            const d = (prev[2] + cur[2]) / 2;
            if (d > 0 === front) {
              g.strokeStyle = rgba(col, baseA * (0.22 + 0.78 * (d * 0.5 + 0.5)));
              g.lineWidth = lw * (0.6 + 0.6 * (d * 0.5 + 0.5));
              g.beginPath();
              g.moveTo(prev[0], prev[1]);
              g.lineTo(cur[0], cur[1]);
              g.stroke();
            }
            prev = cur;
          }
        }
        if (!front) {
          const rungEvery = 6.2832 / 10;
          for (let i = 0; i <= count; i++) {
            const p0 = ad[i] - flow;
            const q = Math.floor(p0 / rungEvery);
            const p1 = i < count ? ad[i + 1] - flow : p0;
            if (Math.floor(p1 / rungEvery) === q) continue;
            const a = pt(i, 1);
            const b = pt(i, -1);
            const depth = Math.abs(Math.sin(ad[i]));
            const alpha = baseA * (0.18 + 0.4 * depth);
            const grad = g.createLinearGradient(a[0], a[1], b[0], b[1]);
            grad.addColorStop(0, rgba(ca, alpha));
            grad.addColorStop(0.5, rgba([255, 255, 255], alpha * 0.35));
            grad.addColorStop(1, rgba(cb, alpha));
            g.strokeStyle = grad;
            g.lineWidth = lw * 0.6;
            g.beginPath();
            g.moveTo(a[0], a[1]);
            g.lineTo(b[0], b[1]);
            g.stroke();
            for (const e of [a, b]) {
              const fr = e[2] * 0.5 + 0.5;
              g.fillStyle = rgba(e === a ? ca : cb, baseA * (0.3 + fr * 0.7));
              g.beginPath();
              g.arc(e[0], e[1], (1 + fr * 1.6) * (0.6 + hx.z * 0.6), 0, 6.2832);
              g.fill();
            }
          }
        }
      }
    }

    function render() {
      if (!w || !h) return;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const glow = g.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.6);
      glow.addColorStop(0, rgba(ca, 0.07));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, w, h);
      for (const hx of helices) drawHelix(hx);
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 1.5;
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
  }, [color, accent, background, threads, angle, twist, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve15 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-helix-threads" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve15-c" aria-hidden="true" />
      {children ? <div className="hb-ve15-in">{children}</div> : null}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgWaveLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  lines?: number;
  amplitude?: number;
  horizon?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd9 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd9-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd9-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

export function BgWaveLines({
  color = "#ededed",
  accent = "#2f7bff",
  background = "#060608",
  lines = 40,
  amplitude = 1,
  horizon = 0.3,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgWaveLinesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !context) return;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const L = Math.max(8, Math.min(90, Math.round(lines)));
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;
    let ysBuf = new Float32Array(0);
    let hsBuf = new Float32Array(0);

    function height(u: number, z: number) {
      const bx = 0.5 + 0.38 * Math.sin(t * 0.21);
      const bz = 0.55 + 0.3 * Math.sin(t * 0.17 + 1.3);
      const dx = (u - bx) * 1.6;
      const dz = z - bz;
      const bump = Math.exp(-(dx * dx + dz * dz * 1.8) / 0.045);
      return (
        0.42 * Math.sin(u * 4.2 + t * 0.55 + z * 5.1) +
        0.24 * Math.sin(u * 9.3 - t * 0.8 + z * 2.4) +
        0.14 * Math.sin(u * 17 + t * 1.1 - z * 6) +
        bump * 1.15
      );
    }

    function draw() {
      if (!w || !h) return;
      g.globalAlpha = 1;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const top = h * Math.max(0, Math.min(0.8, horizon));
      const step = Math.max(4, Math.round(w / 140));
      const count = Math.ceil(w / step) + 2;
      if (ysBuf.length !== count) {
        ysBuf = new Float32Array(count);
        hsBuf = new Float32Array(count);
      }
      g.lineJoin = "round";
      for (let j = 0; j < L; j++) {
        const z = j / (L - 1);
        const persp = Math.pow(z, 1.75);
        const yb = top + (h * 1.04 - top) * persp;
        const spread = 1.5 - z * 0.55;
        const amp = h * 0.075 * amplitude * (0.25 + z * 0.95);
        g.beginPath();
        for (let i = 0; i < count; i++) {
          const x = (i - 1) * step;
          const u = 0.5 + (x / w - 0.5) * spread;
          const hv = height(u, z);
          const y = yb - hv * amp;
          ysBuf[i] = y;
          hsBuf[i] = hv;
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.lineTo(w + step, h + 2);
        g.lineTo(-step, h + 2);
        g.closePath();
        g.globalAlpha = 1;
        g.fillStyle = background;
        g.fill();
        g.beginPath();
        for (let i = 0; i < count; i++) {
          const x = (i - 1) * step;
          if (i === 0) g.moveTo(x, ysBuf[i]);
          else g.lineTo(x, ysBuf[i]);
        }
        g.globalAlpha = 0.1 + 0.55 * z;
        g.strokeStyle = color;
        g.lineWidth = 0.6 + z * 0.8;
        g.stroke();
        g.beginPath();
        let pen = false;
        for (let i = 0; i < count; i++) {
          const x = (i - 1) * step;
          if (hsBuf[i] > 0.62) {
            if (pen) g.lineTo(x, ysBuf[i]);
            else g.moveTo(x, ysBuf[i]);
            pen = true;
          } else pen = false;
        }
        g.globalAlpha = Math.min(1, 0.35 + 0.65 * z);
        g.strokeStyle = accent;
        g.lineWidth = 1 + z * 1.2;
        g.stroke();
      }
      const fog = g.createLinearGradient(0, top - 10, 0, top + (h - top) * 0.35);
      fog.addColorStop(0, background);
      fog.addColorStop(1, "rgba(0,0,0,0)");
      g.globalAlpha = 1;
      g.fillStyle = fog;
      g.fillRect(0, 0, w, top + (h - top) * 0.35);
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
      if (motion.matches) t = 4;
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
        t = 4;
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
  }, [color, accent, background, lines, amplitude, horizon, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd9 ${className}`} style={style} {...rest}>
      <style href="hb-bg-wave-lines" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd9-c" aria-hidden="true" />
      {children ? <div className="hb-vd9-in">{children}</div> : null}
    </div>
  );
}

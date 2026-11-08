"use client";

import * as React from "react";

export interface BgHalftoneProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  spacing?: number;
  angle?: number;
  misregister?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd15 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd15-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd15-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

export function BgHalftone({
  color = "#ededed",
  accent = "#2f7bff",
  background = "#08080a",
  spacing = 9,
  angle = 18,
  misregister = 1.5,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgHalftoneProps) {
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
    const S = Math.max(5, Math.min(40, spacing));
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;

    function field(x: number, y: number, ch: number) {
      const u = x / w;
      const v = y / h;
      const ox = ch ? 0.6 : 0;
      const b1x = 0.3 + 0.22 * Math.sin(t * 0.23 + ox);
      const b1y = 0.4 + 0.2 * Math.cos(t * 0.19 + ox * 1.5);
      const b2x = 0.72 + 0.2 * Math.cos(t * 0.17 + 1.7 + ox);
      const b2y = 0.62 + 0.22 * Math.sin(t * 0.21 + 0.4 - ox);
      const a = w / Math.max(1, h);
      const d1 = ((u - b1x) * a) ** 2 + (v - b1y) ** 2;
      const d2 = ((u - b2x) * a) ** 2 + (v - b2y) ** 2;
      const sweep = 0.5 + 0.5 * Math.sin(u * 2.4 - v * 1.6 + t * 0.35 + ox * 2);
      const f = (ch ? 0.75 : 0.95) * Math.exp(-d1 / 0.09) + (ch ? 0.9 : 0.55) * Math.exp(-d2 / 0.12) + sweep * 0.18;
      return Math.min(1, f);
    }

    function screen(deg: number, ch: number, fill: string, dx: number, dy: number) {
      const a = (deg * Math.PI) / 180;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const cx = w / 2;
      const cy = h / 2;
      const half = Math.ceil(Math.hypot(w, h) / 2 / S) + 1;
      const maxR = S * 0.56;
      g.beginPath();
      for (let j = -half; j <= half; j++) {
        for (let i = -half; i <= half; i++) {
          const lx = i * S;
          const ly = j * S;
          const x = cx + lx * ca - ly * sa + dx;
          const y = cy + lx * sa + ly * ca + dy;
          if (x < -S || y < -S || x > w + S || y > h + S) continue;
          const f = field(x, y, ch);
          if (f < 0.04) continue;
          const r = maxR * Math.sqrt(f);
          g.moveTo(x + r, y);
          g.arc(x, y, r, 0, Math.PI * 2);
        }
      }
      g.fillStyle = fill;
      g.fill();
    }

    function draw() {
      if (!w || !h) return;
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      g.globalAlpha = 0.95;
      screen(angle + 45, 1, accent, misregister, -misregister * 0.6);
      g.globalAlpha = 0.85;
      screen(angle, 0, color, 0, 0);
      g.globalCompositeOperation = "source-over";
      const vig = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, background);
      g.globalAlpha = 0.85;
      g.fillStyle = vig;
      g.fillRect(0, 0, w, h);
      g.globalAlpha = 1;
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
  }, [color, accent, background, spacing, angle, misregister, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd15 ${className}`} style={style} {...rest}>
      <style href="hb-bg-halftone" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd15-c" aria-hidden="true" />
      {children ? <div className="hb-vd15-in">{children}</div> : null}
    </div>
  );
}

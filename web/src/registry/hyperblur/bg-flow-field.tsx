"use client";

import * as React from "react";

export interface BgFlowFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  density?: number;
  trail?: number;
  scale?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve2-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve2-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BgFlowField({
  color = "#2f7bff",
  accent = "#5ff0d2",
  background = "#06070b",
  density = 1,
  trail = 0.9,
  scale = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgFlowFieldProps) {
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

    const ca = rgbOf(color, [47, 123, 255]);
    const cb = rgbOf(accent, [95, 240, 210]);
    const bg = rgbOf(background, [6, 7, 11]);
    const fade = 0.035 + 0.25 * (1 - Math.max(0, Math.min(1, trail)));
    const palette: string[] = [];
    for (let i = 0; i < 16; i++) {
      const k = i / 15;
      const r = Math.round(ca[0] + (cb[0] - ca[0]) * k);
      const gg = Math.round(ca[1] + (cb[1] - ca[1]) * k);
      const bb = Math.round(ca[2] + (cb[2] - ca[2]) * k);
      palette.push(`rgba(${r},${gg},${bb},0.55)`);
    }

    let seed = 0x2f7b;
    function rand() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let n = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let life = new Float32Array(0);
    let mx = -9999;
    let my = -9999;
    let inside = false;

    function angle(x: number, y: number) {
      const k = 0.0032 / Math.max(0.3, scale);
      const a = Math.sin(x * k + t * 0.11) * 1.3 + Math.cos(y * k * 1.21 - t * 0.09) * 1.1 + Math.sin((x - y) * k * 0.63 + t * 0.05) * 0.9;
      return a * 1.6;
    }

    function spawn(i: number) {
      px[i] = rand() * w;
      py[i] = rand() * h;
      life[i] = 60 + rand() * 220;
    }

    function setup() {
      n = Math.max(80, Math.min(2600, Math.round(((w * h) / 520) * density)));
      px = new Float32Array(n);
      py = new Float32Array(n);
      life = new Float32Array(n);
      seed = 0x2f7b;
      for (let i = 0; i < n; i++) spawn(i);
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
    }

    function step(dt: number) {
      g.fillStyle = `rgba(${bg[0]},${bg[1]},${bg[2]},${fade})`;
      g.fillRect(0, 0, w, h);
      g.lineWidth = 1;
      g.lineCap = "round";
      const v = 1.25 * Math.max(0.3, Math.min(3, dt * 60));
      const paths: Path2D[] = [];
      for (let c = 0; c < 16; c++) paths.push(new Path2D());
      for (let i = 0; i < n; i++) {
        const x = px[i];
        const y = py[i];
        let a = angle(x, y);
        if (inside) {
          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) a += (1 - d2 / 22500) * 1.9;
        }
        const nx = x + Math.cos(a) * v;
        const ny = y + Math.sin(a) * v;
        const k = (Math.sin(a) * 0.5 + 0.5) * 15;
        const path = paths[k | 0];
        path.moveTo(x, y);
        path.lineTo(nx, ny);
        px[i] = nx;
        py[i] = ny;
        life[i] -= 1;
        if (life[i] <= 0 || nx < -4 || ny < -4 || nx > w + 4 || ny > h + 4) spawn(i);
      }
      for (let c = 0; c < 16; c++) {
        g.strokeStyle = palette[c];
        g.stroke(paths[c]);
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 3;
      setup();
      for (let k = 0; k < 160; k++) step(1 / 60);
    }

    function resize() {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      if (Math.abs(nw - w) < 2 && Math.abs(nh - h) < 2 && n) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
      else {
        setup();
        for (let k = 0; k < 40; k++) step(1 / 60);
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      step(dt * speed);
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
    }

    function onMotion() {
      if (motion.matches) still();
      sync();
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
    motion.addEventListener("change", onMotion);
    hostEl.addEventListener("pointermove", move, { passive: true });
    hostEl.addEventListener("pointerleave", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      hostEl.removeEventListener("pointermove", move);
      hostEl.removeEventListener("pointerleave", leave);
    };
  }, [color, accent, background, density, trail, scale, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve2 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-flow-field" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve2-c" aria-hidden="true" />
      {children ? <div className="hb-ve2-in">{children}</div> : null}
    </div>
  );
}

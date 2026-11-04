"use client";

import * as React from "react";

export interface BgAcidSquaresProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  gap?: number;
  colors?: string[];
  color?: string;
  interval?: number;
  waveSpeed?: number;
  seed?: number;
  speed?: number;
}

const css = `
.hb-qo5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo5-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo5-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const DEFAULT_COLORS = ["#c6ff00", "#39ff88", "#00f0ff", "#ff2bd6", "#fff200"];

function hashU(n: number, s: number) {
  let x = (Math.imul(n, 2654435761) ^ Math.imul(s + 1, 1597334677)) | 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

interface Ripple {
  x: number;
  y: number;
  t0: number;
  s: number;
  c: number;
}

export function BgAcidSquares({
  cellSize = 18,
  gap = 0.2,
  colors = DEFAULT_COLORS,
  color = "rgba(255,255,255,0.05)",
  interval = 1.6,
  waveSpeed = 200,
  seed = 5,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgAcidSquaresProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const palette = (colors.length ? colors : DEFAULT_COLORS).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !context) return;
    const g = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pal = palette.split("|");
    const s0 = Math.round(seed) | 0;
    const life = 2.6;
    const wid = 26;
    const vel = Math.max(40, waveSpeed);
    let cell = Math.max(6, cellSize);
    let w = 0;
    let h = 0;
    let t = 0;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let inside = false;
    let px = -9999;
    let py = -9999;
    let lastX = -9999;
    let lastY = -9999;
    let lastT = -9;
    let pulse = 0;
    let nextIdle = 0.15;
    let colorTurn = 0;
    let ripples: Ripple[] = [];

    const add = (x: number, y: number, s: number) => {
      ripples.push({ x, y, t0: t, s, c: colorTurn % pal.length });
      colorTurn++;
      if (ripples.length > 28) ripples = ripples.slice(ripples.length - 28);
    };

    const idlePulse = () => {
      const n = pulse++;
      const x = w * (0.12 + 0.76 * hashU(n, s0));
      const y = h * (0.15 + 0.7 * hashU(n + 911, s0));
      add(x, y, 1);
    };

    const layout = () => {
      cell = Math.max(6, cellSize);
      while ((w / cell) * (h / cell) > 9000) cell *= 1.15;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      ox = (w - cols * cell) / 2;
      oy = (h - rows * cell) / 2;
    };

    const draw = () => {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      ripples = ripples.filter((r) => t - r.t0 < life);
      const inner = cell * (1 - Math.min(0.8, Math.max(0, gap)));
      g.fillStyle = color;
      g.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = hashU(j * 4099 + i, s0);
          const b = 0.55 + 0.45 * Math.sin(t * 1.3 + k * 6.283);
          const sz = inner * (0.5 + 0.18 * b);
          const cx = ox + (i + 0.5) * cell;
          const cy = oy + (j + 0.5) * cell;
          g.rect(cx - sz / 2, cy - sz / 2, sz, sz);
        }
      }
      g.fill();
      g.globalCompositeOperation = "lighter";
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const cx = ox + (i + 0.5) * cell;
          const cy = oy + (j + 0.5) * cell;
          let best = 0;
          let sum = 0;
          let ci = 0;
          for (let r = 0; r < ripples.length; r++) {
            const rp = ripples[r];
            const age = t - rp.t0;
            const d = Math.hypot(cx - rp.x, cy - rp.y) - age * vel;
            if (d > wid * 3 || d < -wid * 3) continue;
            const fade = 1 - age / life;
            const v = rp.s * Math.exp(-(d * d) / (wid * wid)) * fade * fade;
            sum += v;
            if (v > best) {
              best = v;
              ci = rp.c;
            }
          }
          if (inside) {
            const dd = Math.hypot(cx - px, cy - py);
            const near = Math.max(0, 1 - dd / (cell * 2.6));
            if (near > 0) {
              sum += near * 0.55;
              if (near * 0.55 > best) {
                best = near * 0.55;
                ci = (colorTurn + 1) % pal.length;
              }
            }
          }
          const I = Math.min(1, sum);
          if (I < 0.03) continue;
          const hue = pal[(ci + (hashU(j * 131 + i, s0 + 3) < 0.2 ? 1 : 0)) % pal.length];
          g.fillStyle = hue;
          const sz = inner * (0.5 + 0.5 * I);
          g.globalAlpha = I * 0.22;
          g.fillRect(cx - sz * 0.85, cy - sz * 0.85, sz * 1.7, sz * 1.7);
          g.globalAlpha = Math.min(1, 0.25 + I * 0.85);
          g.fillRect(cx - sz / 2, cy - sz / 2, sz, sz);
        }
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (motion.matches) still();
      else draw();
    };

    let visible = true;
    let raf = 0;
    let prev = 0;

    const still = () => {
      inside = false;
      ripples = [];
      t = 0;
      colorTurn = 0;
      add(w * 0.3, h * 0.45, 1);
      add(w * 0.72, h * 0.6, 1);
      t = 0.55;
      nextIdle = t + 0.2;
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      if (!inside && t >= nextIdle) {
        idlePulse();
        nextIdle = t + Math.max(0.3, interval);
      }
      draw();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) still();
    };

    const locate = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      px = (e.clientX - rect.left) * sx;
      py = (e.clientY - rect.top) * sy;
    };

    const move = (e: PointerEvent) => {
      if (motion.matches) return;
      locate(e);
      inside = true;
      nextIdle = t + Math.max(0.3, interval) * 1.5;
      const moved = Math.hypot(px - lastX, py - lastY);
      if (moved > cell * 3 || (moved > cell * 0.8 && t - lastT > 0.22)) {
        add(px, py, 0.6);
        lastX = px;
        lastY = py;
        lastT = t;
      }
    };

    const down = (e: PointerEvent) => {
      if (motion.matches) return;
      locate(e);
      inside = true;
      add(px, py, 1.3);
      lastX = px;
      lastY = py;
      lastT = t;
    };

    const leave = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
      nextIdle = t + 0.6;
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", down, { passive: true });
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerup", leave);
    host.addEventListener("pointercancel", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [cellSize, gap, palette, color, interval, waveSpeed, seed, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo5 ${className}`} style={style} {...rest}>
      <style href="hb-bg-acid-squares" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo5-c" aria-hidden="true" />
      {children != null && <div className="hb-qo5-in">{children}</div>}
    </div>
  );
}

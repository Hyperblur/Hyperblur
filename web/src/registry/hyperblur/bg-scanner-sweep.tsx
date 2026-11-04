"use client";

import * as React from "react";

export interface BgScannerSweepProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  color?: string;
  accent?: string;
  hits?: number;
  decay?: number;
  trail?: number;
  seed?: number;
  speed?: number;
}

const css = `
.hb-qo6 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo6-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo6-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function hashU(n: number, s: number) {
  let x = (Math.imul(n, 2654435761) ^ Math.imul(s + 1, 1597334677)) | 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

function toRgb(value: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = 1;
  c.height = 1;
  const x = c.getContext("2d");
  if (!x) return [47, 123, 255];
  x.fillStyle = "#2f7bff";
  x.fillStyle = value;
  x.fillRect(0, 0, 1, 1);
  const d = x.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

export function BgScannerSweep({
  cellSize = 14,
  color = "rgba(255,255,255,0.16)",
  accent = "#2f7bff",
  hits = 0.1,
  decay = 1.1,
  trail = 70,
  seed = 9,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgScannerSweepProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !context) return;
    const g = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const [ar, ag, ab] = toRgb(accent);
    const rgba = (a: number) => `rgba(${ar},${ag},${ab},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
    const s0 = Math.round(seed) | 0;
    let cell = Math.max(6, cellSize);
    let w = 0;
    let h = 0;
    let t = 0;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let heat = new Float32Array(0);
    let hit = new Uint8Array(0);
    let inside = false;
    let tx = 0;
    let ty = 0;
    let bx = 0;
    let by = 0;
    let tilt = 0;
    let lastBx = 0;
    let lastTilt = 0;
    let dir = 1;
    let placed = false;

    const idleX = (tt: number) => w * (0.5 + 0.56 * Math.sin(tt * 0.62));

    const layout = () => {
      cell = Math.max(6, cellSize);
      while ((w / cell) * (h / cell) > 12000) cell *= 1.15;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      ox = (w - cols * cell) / 2;
      oy = (h - rows * cell) / 2;
      heat = new Float32Array(cols * rows);
      hit = new Uint8Array(cols * rows);
      for (let n = 0; n < cols * rows; n++) hit[n] = hashU(n, s0) < hits ? 1 : 0;
    };

    const beamAt = (x: number, tl: number, y: number) => x + tl * (1 - (2 * y) / Math.max(1, h));

    const advance = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      if (!placed) {
        bx = gx;
        by = h / 2;
        lastBx = bx;
        placed = true;
      } else {
        const e = 1 - Math.exp(-dt * (inside ? 14 : 6));
        bx += (gx - bx) * e;
        by += ((inside ? ty : h / 2) - by) * Math.min(1, dt * 6);
      }
      const vel = dt > 0 ? (bx - lastBx) / dt : 0;
      tilt += (Math.max(-h * 0.18, Math.min(h * 0.18, vel * 0.06)) - tilt) * Math.min(1, dt * 8);
      if (Math.abs(bx - lastBx) > 0.05) dir = bx > lastBx ? 1 : -1;
      const keepHit = Math.exp(-dt / Math.max(0.05, decay * 2.6));
      const keep = Math.exp(-dt / Math.max(0.05, decay));
      for (let j = 0; j < rows; j++) {
        const cy = oy + (j + 0.5) * cell;
        const a = beamAt(lastBx, lastTilt, cy);
        const b = beamAt(bx, tilt, cy);
        const lo = Math.min(a, b) - cell * 0.5;
        const hi = Math.max(a, b) + cell * 0.5;
        for (let i = 0; i < cols; i++) {
          const n = j * cols + i;
          const cx = ox + (i + 0.5) * cell;
          if (cx >= lo && cx <= hi) heat[n] = 1;
          else heat[n] *= hit[n] ? keepHit : keep;
        }
      }
      lastBx = bx;
      lastTilt = tilt;
    };

    const draw = () => {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      const dot = Math.max(0.8, cell * 0.08);
      g.fillStyle = color;
      g.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = j * cols + i;
          if (heat[n] > 0.25) continue;
          const cx = ox + (i + 0.5) * cell;
          const cy = oy + (j + 0.5) * cell;
          g.moveTo(cx + dot, cy);
          g.arc(cx, cy, dot, 0, Math.PI * 2);
        }
      }
      g.fill();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = j * cols + i;
          const k = heat[n];
          if (k < 0.02) continue;
          const cx = ox + (i + 0.5) * cell;
          const cy = oy + (j + 0.5) * cell;
          if (hit[n]) {
            const s = cell * 0.62;
            g.fillStyle = rgba(0.25 + 0.6 * k);
            g.fillRect(cx - s / 2, cy - s / 2, s, s);
            if (k > 0.15) {
              const m = cell * 0.5;
              const l = cell * 0.2;
              g.strokeStyle = rgba(k);
              g.lineWidth = 1;
              g.beginPath();
              g.moveTo(cx - m, cy - m + l);
              g.lineTo(cx - m, cy - m);
              g.lineTo(cx - m + l, cy - m);
              g.moveTo(cx + m - l, cy - m);
              g.lineTo(cx + m, cy - m);
              g.lineTo(cx + m, cy - m + l);
              g.moveTo(cx + m, cy + m - l);
              g.lineTo(cx + m, cy + m);
              g.lineTo(cx + m - l, cy + m);
              g.moveTo(cx - m + l, cy + m);
              g.lineTo(cx - m, cy + m);
              g.lineTo(cx - m, cy + m - l);
              g.stroke();
            }
          } else {
            const s = cell * (0.18 + 0.32 * k);
            g.fillStyle = rgba(k * 0.75);
            g.fillRect(cx - s / 2, cy - s / 2, s, s);
          }
        }
      }
      const topX = beamAt(bx, tilt, 0);
      const botX = beamAt(bx, tilt, h);
      const tr = Math.max(4, trail);
      const band = g.createLinearGradient(bx, 0, bx - dir * tr, 0);
      band.addColorStop(0, rgba(0.32));
      band.addColorStop(1, rgba(0));
      g.fillStyle = band;
      g.beginPath();
      g.moveTo(topX, 0);
      g.lineTo(topX - dir * tr, 0);
      g.lineTo(botX - dir * tr, h);
      g.lineTo(botX, h);
      g.closePath();
      g.fill();
      g.globalCompositeOperation = "lighter";
      g.beginPath();
      g.moveTo(topX, 0);
      g.lineTo(botX, h);
      g.strokeStyle = rgba(0.9);
      g.lineWidth = 3;
      g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.85)";
      g.lineWidth = 1;
      g.stroke();
      const hx = beamAt(bx, tilt, by);
      const glow = g.createRadialGradient(hx, by, 0, hx, by, cell * 4);
      glow.addColorStop(0, rgba(0.55));
      glow.addColorStop(1, rgba(0));
      g.fillStyle = glow;
      g.fillRect(hx - cell * 4, by - cell * 4, cell * 8, cell * 8);
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
      placed = false;
      if (motion.matches) still();
      else {
        advance(0);
        draw();
      }
    };

    let visible = true;
    let raf = 0;
    let prev = 0;

    const still = () => {
      inside = false;
      placed = false;
      t = 0;
      advance(0);
      for (let s = 1; s <= 40; s++) {
        t = s * 0.03;
        advance(0.03);
      }
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      advance(dt);
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

    const move = (e: PointerEvent) => {
      if (motion.matches) return;
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    };

    const leave = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      if (inside) {
        const target = Math.max(-0.999, Math.min(0.999, (bx / Math.max(1, w) - 0.5) / 0.56));
        const phase = Math.asin(target) / 0.62;
        const period = (Math.PI * 2) / 0.62;
        const goingRight = dir > 0;
        const base = goingRight ? phase : Math.PI / 0.62 - phase;
        t = base + Math.ceil((t - base) / period) * period;
      }
      inside = false;
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
    host.addEventListener("pointerdown", move, { passive: true });
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
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [cellSize, color, accent, hits, decay, trail, seed, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo6 ${className}`} style={style} {...rest}>
      <style href="hb-bg-scanner-sweep" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo6-c" aria-hidden="true" />
      {children != null && <div className="hb-qo6-in">{children}</div>}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgTopographyProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  levels?: number;
  scale?: number;
  cellSize?: number;
  lift?: number;
  radius?: number;
  speed?: number;
  seed?: number;
}

const css = `
.hb-qj6 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj6-c { display: block; width: 100%; height: 100%; }
`;

function h3(x: number, y: number, z: number, seed: number) {
  let v = (Math.imul(x, 0x27d4eb2d) ^ Math.imul(y, 0x165667b1) ^ Math.imul(z, 0x9e3779b1) ^ Math.imul(seed + 1, 0x85ebca6b)) >>> 0;
  v = Math.imul(v ^ (v >>> 15), 0x2c1b3c6d) >>> 0;
  v = Math.imul(v ^ (v >>> 12), 0x297a2d39) >>> 0;
  v = (v ^ (v >>> 15)) >>> 0;
  return v / 4294967296;
}

function noise(x: number, y: number, z: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const s = zf * zf * (3 - 2 * zf);
  const a = h3(xi, yi, zi, seed);
  const b = h3(xi + 1, yi, zi, seed);
  const c = h3(xi, yi + 1, zi, seed);
  const d = h3(xi + 1, yi + 1, zi, seed);
  const e = h3(xi, yi, zi + 1, seed);
  const f = h3(xi + 1, yi, zi + 1, seed);
  const g = h3(xi, yi + 1, zi + 1, seed);
  const k = h3(xi + 1, yi + 1, zi + 1, seed);
  const l0 = a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  const l1 = e + (f - e) * u + (g - e) * v + (e - f - g + k) * u * v;
  return l0 + (l1 - l0) * s;
}

export function BgTopography({
  color = "rgba(255,255,255,0.16)",
  accent = "#7fb3ff",
  levels = 12,
  scale = 190,
  cellSize = 10,
  lift = 0.55,
  radius = 150,
  speed = 1,
  seed = 11,
  className = "",
  style,
  ...rest
}: BgTopographyProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const R = Math.max(20, radius);
    const inv = 1 / (R * R);
    const sc = 1 / Math.max(30, scale);
    const stepV = 1 / Math.max(3, Math.min(40, levels));
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let cell = Math.max(5, cellSize);
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);

    function idleX(tt: number) {
      return w * (0.5 + 0.3 * Math.sin(tt * 0.33 + 1.1));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.28 * Math.sin(tt * 0.52 + 0.2));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 7 : 2));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function layout() {
      cell = Math.max(5, cellSize);
      while ((w / cell + 1) * (h / cell + 1) > 16000) cell *= 1.15;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      field = new Float32Array(cols * rows);
    }

    function sample() {
      const z = t * 0.09;
      const bump = lift * (0.85 + 0.15 * Math.sin(t * 1.1));
      for (let r = 0; r < rows; r++) {
        const y = r * cell;
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const nx = x * sc;
          const ny = y * sc;
          let v = 0.68 * noise(nx, ny, z, seed) + 0.32 * noise(nx * 2.1 + 5.2, ny * 2.1 + 1.3, z * 1.6, seed + 7);
          const dx = x - px;
          const dy = y - py;
          v += bump * Math.exp(-(dx * dx + dy * dy) * inv);
          field[r * cols + c] = v;
        }
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      sample();
      ctx.clearRect(0, 0, w, h);
      const minor = new Path2D();
      const major = new Path2D();
      const top = 1 + lift;
      let index = 0;
      for (let th = stepV; th < top; th += stepV) {
        index++;
        const path = index % 4 === 0 ? major : minor;
        for (let r = 0; r < rows - 1; r++) {
          const y0 = r * cell;
          const y1 = y0 + cell;
          for (let c = 0; c < cols - 1; c++) {
            const i = r * cols + c;
            const a = field[i];
            const b = field[i + 1];
            const d = field[i + cols];
            const e = field[i + cols + 1];
            const ia = a > th;
            const ib = b > th;
            const ie = e > th;
            const id = d > th;
            if (ia === ib && ib === ie && ie === id) continue;
            const x0 = c * cell;
            const x1 = x0 + cell;
            const pts: number[] = [];
            let tX = 0;
            let rY = 0;
            let bX = 0;
            let lY = 0;
            const hasT = ia !== ib;
            const hasR = ib !== ie;
            const hasB = id !== ie;
            const hasL = ia !== id;
            if (hasT) tX = x0 + ((th - a) / (b - a)) * cell;
            if (hasR) rY = y0 + ((th - b) / (e - b)) * cell;
            if (hasB) bX = x0 + ((th - d) / (e - d)) * cell;
            if (hasL) lY = y0 + ((th - a) / (d - a)) * cell;
            if (hasT && hasR && hasB && hasL) {
              const center = (a + b + d + e) / 4 > th;
              if (ia === center) {
                path.moveTo(tX, y0);
                path.lineTo(x1, rY);
                path.moveTo(bX, y1);
                path.lineTo(x0, lY);
              } else {
                path.moveTo(tX, y0);
                path.lineTo(x0, lY);
                path.moveTo(x1, rY);
                path.lineTo(bX, y1);
              }
              continue;
            }
            if (hasT) pts.push(tX, y0);
            if (hasR) pts.push(x1, rY);
            if (hasB) pts.push(bX, y1);
            if (hasL) pts.push(x0, lY);
            if (pts.length === 4) {
              path.moveTo(pts[0], pts[1]);
              path.lineTo(pts[2], pts[3]);
            }
          }
        }
      }
      const glow = ctx.createRadialGradient(px, py, 0, px, py, R * 1.6);
      glow.addColorStop(0, accent);
      glow.addColorStop(1, color);
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;
      ctx.strokeStyle = glow;
      ctx.stroke(minor);
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = accent;
      ctx.stroke(major);
      ctx.globalAlpha = 1;
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 2.6;
      inside = false;
      placed = false;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
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
      if (motion.matches) still();
    }

    function move(e: PointerEvent) {
      if (!host || motion.matches) return;
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    }

    function leave(e: PointerEvent) {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
    }

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
  }, [color, accent, levels, scale, cellSize, lift, radius, speed, seed]);

  return (
    <div ref={wrapRef} className={`hb-qj6 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-topography" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj6-c" />
    </div>
  );
}

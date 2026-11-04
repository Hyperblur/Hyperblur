"use client";

import * as React from "react";

export interface CursorMagneticFilingsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  baseColor?: string;
  spacing?: number;
  length?: number;
  thickness?: number;
  strength?: number;
  idle?: boolean;
}

const css = `
.hb-zb3 {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 120px;
  overflow: hidden;
  box-sizing: border-box;
  font-family: inherit;
  touch-action: pan-y;
}
.hb-zb3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-zb3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: none; }
.hb-zb3-in > * { pointer-events: auto; }
`;

const BUCKETS = 8;
const MAX_NEEDLES = 4200;

function hash(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function parseColor(input: string, fallback: [number, number, number]): [number, number, number] {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return fallback;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const v = parseInt(hex, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function CursorMagneticFilings({
  color = "#7fb3ff",
  baseColor = "#3b4150",
  spacing = 13,
  length = 9,
  thickness = 1.3,
  strength = 1,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorMagneticFilingsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ca = parseColor(baseColor, [59, 65, 80]);
    const cb = parseColor(color, [127, 179, 255]);
    const styles: string[] = [];
    for (let b = 0; b < BUCKETS; b++) {
      const u = b / (BUCKETS - 1);
      const r = Math.round(ca[0] + (cb[0] - ca[0]) * u);
      const g = Math.round(ca[1] + (cb[1] - ca[1]) * u);
      const bl = Math.round(ca[2] + (cb[2] - ca[2]) * u);
      styles.push(`rgba(${r},${g},${bl},${(0.5 + 0.5 * u).toFixed(3)})`);
    }

    let w = 0;
    let h = 0;
    let n = 0;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let rest0 = new Float32Array(0);
    let ang = new Float32Array(0);
    let segs: Float32Array[] = [];
    const counts = new Array<number>(BUCKETS).fill(0);
    let t = 0.8;
    let raf = 0;
    let prev = 0;
    let visible = true;
    let pointerOn = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let lastTx = 0;
    let lastTy = 0;
    let vx = 0;
    let vy = 0;
    let pa = 0;
    let mix = 0;

    const build = () => {
      const sp = Math.max(6, spacing, Math.sqrt((w * h) / MAX_NEEDLES));
      const cols = Math.ceil(w / sp) + 1;
      const rows = Math.ceil(h / sp) + 1;
      n = cols * rows;
      xs = new Float32Array(n);
      ys = new Float32Array(n);
      rest0 = new Float32Array(n);
      ang = new Float32Array(n);
      segs = Array.from({ length: BUCKETS }, () => new Float32Array(n * 4));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          xs[i] = (c + 0.5 + (hash(i * 3 + 1) - 0.5) * 0.45) * sp - sp * 0.25;
          ys[i] = (r + 0.5 + (hash(i * 3 + 2) - 0.5) * 0.45) * sp - sp * 0.25;
          rest0[i] = hash(i * 3 + 3) * Math.PI;
          ang[i] = rest0[i];
        }
      }
    };

    const step = (dt: number) => {
      t += dt;
      const ox = w * 0.5 + w * 0.3 * Math.cos(t * 0.5);
      const oy = h * 0.5 + h * 0.27 * Math.sin(t * 0.83 + 0.7);
      const oa = t * 0.7;
      const target = pointerOn ? 1 : 0;
      mix += (target - mix) * (1 - Math.exp(-dt * 5));
      if (pointerOn) {
        const k = 1 - Math.exp(-dt * 14);
        px += (tx - px) * k;
        py += (ty - py) * k;
        const ddx = tx - lastTx;
        const ddy = ty - lastTy;
        lastTx = tx;
        lastTy = ty;
        const q = 1 - Math.exp(-dt * 9);
        vx += (ddx / Math.max(dt, 0.001) - vx) * q;
        vy += (ddy / Math.max(dt, 0.001) - vy) * q;
        if (Math.hypot(vx, vy) > 30) pa = Math.atan2(vy, vx);
      }
      const active = idle || mix > 0.001;
      const live = idle ? 1 - mix : 0;
      const mx = idle ? ox * (1 - mix) + px * mix : px;
      const my = idle ? oy * (1 - mix) + py * mix : py;
      const ux = Math.cos(oa) * live + Math.cos(pa) * (1 - live);
      const uy = Math.sin(oa) * live + Math.sin(pa) * (1 - live);
      const th = Math.atan2(uy, ux);
      const cx = Math.cos(th);
      const sx = Math.sin(th);
      const R0 = Math.min(Math.max(w, 160), Math.max(h, 160)) * 0.55 * strength;
      const soft = Math.max(spacing * 1.1, 10);
      const rate = 1 - Math.exp(-dt * 14);
      counts.fill(0);
      const half0 = length * 0.5;
      for (let i = 0; i < n; i++) {
        let wgt = 0;
        let a = rest0[i];
        if (active) {
          const dx = xs[i] - mx;
          const dy = ys[i] - my;
          const r = Math.max(Math.sqrt(dx * dx + dy * dy), soft);
          const rx = dx / r;
          const ry = dy / r;
          const md = cx * rx + sx * ry;
          const bx = 3 * md * rx - cx;
          const by = 3 * md * ry - sx;
          const q = R0 / r;
          const g = q * q * q * Math.sqrt(3 * md * md + 1) * 0.5;
          wgt = 1 - Math.exp(-g * 0.35);
          const ta = Math.atan2(by, bx);
          const vxx = (1 - wgt) * Math.cos(2 * rest0[i]) + wgt * Math.cos(2 * ta);
          const vyy = (1 - wgt) * Math.sin(2 * rest0[i]) + wgt * Math.sin(2 * ta);
          a = Math.atan2(vyy, vxx) * 0.5;
        }
        let d = a - ang[i];
        d -= Math.PI * Math.round(d / Math.PI);
        ang[i] += d * rate;
        const b = Math.min(BUCKETS - 1, Math.floor(wgt * BUCKETS));
        const half = half0 * (0.82 + 0.5 * wgt);
        const ca2 = Math.cos(ang[i]) * half;
        const sa2 = Math.sin(ang[i]) * half;
        const arr = segs[b];
        const o = counts[b] * 4;
        arr[o] = xs[i] - ca2;
        arr[o + 1] = ys[i] - sa2;
        arr[o + 2] = xs[i] + ca2;
        arr[o + 3] = ys[i] + sa2;
        counts[b]++;
      }
      return { mx, my, show: mix };
    };

    const draw = (info: { mx: number; my: number; show: number }) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (let b = 0; b < BUCKETS; b++) {
        const c = counts[b];
        if (!c) continue;
        const arr = segs[b];
        ctx.strokeStyle = styles[b];
        ctx.lineWidth = thickness * (0.8 + 0.5 * (b / (BUCKETS - 1)));
        ctx.beginPath();
        for (let k = 0; k < c; k++) {
          const o = k * 4;
          ctx.moveTo(arr[o], arr[o + 1]);
          ctx.lineTo(arr[o + 2], arr[o + 3]);
        }
        ctx.stroke();
      }
      if (info.show > 0.01) {
        const g = ctx.createRadialGradient(info.mx, info.my, 0, info.mx, info.my, 46);
        g.addColorStop(0, `rgba(${cb[0]},${cb[1]},${cb[2]},${(0.22 * info.show).toFixed(3)})`);
        g.addColorStop(1, `rgba(${cb[0]},${cb[1]},${cb[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(info.mx - 46, info.my - 46, 92, 92);
      }
    };

    const still = () => {
      draw(step(10));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - prev) / 1000));
      prev = now;
      draw(step(dt));
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || motion.matches || !visible || (!idle && !pointerOn && mix < 0.002)) return;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const nw = root.clientWidth;
      const nh = root.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!px && !py) {
        px = w * 0.5;
        py = h * 0.5;
      }
      if (motion.matches || !idle) still();
    };

    const move = (ev: Event) => {
      const e = ev as PointerEvent;
      if (motion.matches) return;
      const r = root.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!pointerOn) {
        pointerOn = true;
        px = tx;
        py = ty;
        lastTx = tx;
        lastTy = ty;
        vx = 0;
        vy = 0;
        start();
      }
    };

    const leave = () => {
      pointerOn = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerdown", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    const onMotion = () => {
      if (motion.matches) {
        stop();
        still();
      } else {
        start();
      }
    };
    motion.addEventListener("change", onMotion);
    resize();
    if (!motion.matches) start();

    const watch = window.setInterval(() => {
      if (!idle && !pointerOn && mix < 0.002) stop();
    }, 500);

    return () => {
      window.clearInterval(watch);
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      motion.removeEventListener("change", onMotion);
    };
  }, [color, baseColor, spacing, length, thickness, strength, idle]);

  return (
    <div ref={rootRef} className={`hb-zb3 ${className}`.trim()} style={style} {...rest}>
      <style href="hb-cursor-magnetic-filings" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-zb3-c" aria-hidden="true" />
      {children ? <div className="hb-zb3-in">{children}</div> : null}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgCrtWarpProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  frameColor?: string;
  curvature?: number;
  scanlines?: number;
  fringe?: number;
  flicker?: number;
  bulge?: number;
  radius?: number;
  speed?: number;
}

const css = `
.hb-qo4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: #050505; }
.hb-qo4-c { position: absolute; inset: 0; z-index: 2; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qo4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const BARS: [number, number, number][] = [
  [196, 196, 196],
  [196, 190, 24],
  [24, 186, 196],
  [24, 186, 60],
  [190, 40, 190],
  [196, 36, 44],
  [36, 52, 196],
];

const LOW: [number, number, number][] = [
  [36, 52, 196],
  [10, 10, 14],
  [190, 40, 190],
  [10, 10, 14],
  [24, 186, 196],
  [10, 10, 14],
  [196, 196, 196],
];

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

export function BgCrtWarp({
  accent = "#2f7bff",
  frameColor = "#050505",
  curvature = 0.12,
  scanlines = 0.24,
  fringe = 1,
  flicker = 0.05,
  bulge = 0.35,
  radius = 90,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgCrtWarpProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const hasChildren = children != null && children !== false;

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !context) return;
    const g = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const [ar, ag, ab] = toRgb(accent);
    const curv = Math.max(0, curvature);
    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d");
    let img: ImageData | null = null;
    let w = 0;
    let h = 0;
    let bw = 0;
    let bh = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let hover = 0;
    let placed = false;
    let frameX = new Float32Array(0);
    let frameY = new Float32Array(0);
    const out: [number, number, number] = [0, 0, 0];

    const idleX = (tt: number) => w * (0.5 + 0.3 * Math.sin(tt * 0.41 + 1.1));
    const idleY = (tt: number) => h * (0.5 + 0.26 * Math.sin(tt * 0.67 + 0.2));

    const track = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
      } else {
        const e = 1 - Math.exp(-dt * (inside ? 9 : 2));
        px += (gx - px) * e;
        py += (gy - py) * e;
      }
      hover += ((inside ? 1 : 0) - hover) * Math.min(1, dt * 4);
    };

    const pattern = (x: number, y: number, asp: number) => {
      const u = (x + 1) / 2;
      const v = (y + 1) / 2;
      let r: number;
      let gg: number;
      let b: number;
      if (v < 0.6) {
        const bar = BARS[Math.min(6, Math.max(0, Math.floor(u * 7)))];
        const m = 0.82 + 0.18 * Math.sin(t * 1.6 + u * 9);
        const s = 0.5 + 0.5 * Math.sin((u * 3 + v * 2) * Math.PI - t * 1.4);
        r = bar[0] * m + ar * 0.32 * s;
        gg = bar[1] * m + ag * 0.32 * s;
        b = bar[2] * m + ab * 0.32 * s;
      } else if (v < 0.68) {
        const bar = LOW[Math.min(6, Math.max(0, Math.floor(u * 7)))];
        r = bar[0] * 0.7;
        gg = bar[1] * 0.7;
        b = bar[2] * 0.7;
      } else {
        const band = 0.5 + 0.5 * Math.sin(u * 12 - t * 2.6);
        const k = Math.min(1, Math.max(0, u * 1.15 - 0.05));
        const lum = k * (0.55 + 0.45 * band);
        const mix = Math.max(0, k - 0.6) / 0.4;
        r = (ar * (1 - mix) + 235 * mix) * lum;
        gg = (ag * (1 - mix) + 235 * mix) * lum;
        b = (ab * (1 - mix) + 235 * mix) * lum;
      }
      const d = Math.sqrt(x * asp * x * asp + y * y);
      const ring = Math.abs(d - 0.62);
      if (ring < 0.014 || (d < 0.62 && (Math.abs(x * asp) < 0.006 || Math.abs(y) < 0.008))) {
        r = r * 0.3 + 230;
        gg = gg * 0.3 + 230;
        b = b * 0.3 + 230;
      }
      out[0] = r;
      out[1] = gg;
      out[2] = b;
    };

    const renderPattern = () => {
      if (!bctx || !img || !bw || !bh) return;
      const data = img.data;
      const asp = w / h;
      const rn = Math.max(0.05, radius / (h / 2));
      const inv = 1 / (rn * rn);
      const pnx = (px / w) * 2 - 1;
      const pny = (py / h) * 2 - 1;
      const bul = bulge * (0.6 + 0.4 * hover);
      const fr = 0.035 * fringe;
      let o = 0;
      for (let j = 0; j < bh; j++) {
        const ny = ((j + 0.5) / bh) * 2 - 1;
        for (let i = 0; i < bw; i++) {
          const nx = ((i + 0.5) / bw) * 2 - 1;
          const dx = (nx - pnx) * asp;
          const dy = ny - pny;
          const q = 1 - bul * Math.exp(-(dx * dx + dy * dy) * inv);
          const ax = pnx + (nx - pnx) * q;
          const ay = pny + (ny - pny) * q;
          const r2 = ax * ax + ay * ay;
          const f = 1 + curv * r2;
          const sx = ax * f;
          const sy = ay * f;
          if (sx < -1 || sx > 1 || sy < -1 || sy > 1) {
            data[o] = 0;
            data[o + 1] = 0;
            data[o + 2] = 0;
            data[o + 3] = 255;
            o += 4;
            continue;
          }
          const cr = 1 + fr * r2;
          pattern(sx * cr, sy, asp);
          data[o] = out[0];
          pattern(sx, sy, asp);
          data[o + 1] = out[1];
          pattern(sx / cr, sy, asp);
          data[o + 2] = out[2];
          data[o + 3] = 255;
          o += 4;
        }
      }
      bctx.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = true;
      g.drawImage(buffer, 0, 0, w, h);
    };

    const unwarp = (sx: number, sy: number) => {
      let nx = sx;
      let ny = sy;
      for (let k = 0; k < 4; k++) {
        const f = 1 + curv * (nx * nx + ny * ny);
        nx = sx / f;
        ny = sy / f;
      }
      return [nx, ny];
    };

    const layout = () => {
      const scale = Math.min(0.5, Math.sqrt(60000 / (w * h)));
      bw = Math.max(8, Math.round(w * scale));
      bh = Math.max(8, Math.round(h * scale));
      buffer.width = bw;
      buffer.height = bh;
      img = bctx ? bctx.createImageData(bw, bh) : null;
      const S = 32;
      frameX = new Float32Array(S * 4);
      frameY = new Float32Array(S * 4);
      for (let e = 0; e < 4; e++) {
        for (let k = 0; k < S; k++) {
          const p = (k / S) * 2 - 1;
          const sx = e === 0 ? p : e === 1 ? 1 : e === 2 ? -p : -1;
          const sy = e === 0 ? -1 : e === 1 ? p : e === 2 ? 1 : -p;
          const [nx, ny] = unwarp(sx, sy);
          frameX[e * S + k] = ((nx + 1) / 2) * w;
          frameY[e * S + k] = ((ny + 1) / 2) * h;
        }
      }
    };

    const screenPath = () => {
      g.moveTo(frameX[0], frameY[0]);
      for (let k = 1; k < frameX.length; k++) g.lineTo(frameX[k], frameY[k]);
      g.closePath();
    };

    const overlay = () => {
      const asp = w / h;
      const rn = Math.max(0.05, radius / (h / 2));
      const inv = 1 / (rn * rn);
      const pnx = (px / w) * 2 - 1;
      const pny = (py / h) * 2 - 1;
      const bul = bulge * (0.6 + 0.4 * hover);
      const stepX = Math.max(8, w / 60);
      g.beginPath();
      for (let y = 1.5; y < h; y += 3) {
        const ny0 = (y / h) * 2 - 1;
        for (let x = 0; x <= w + stepX; x += stepX) {
          const nx = (Math.min(x, w) / w) * 2 - 1;
          let ny = ny0 / (1 + curv * (nx * nx + ny0 * ny0));
          const dx = (nx - pnx) * asp;
          const dy = ny - pny;
          ny += dy * bul * 0.9 * Math.exp(-(dx * dx + dy * dy) * inv);
          const yy = ((ny + 1) / 2) * h;
          if (x === 0) g.moveTo(0, yy);
          else g.lineTo(Math.min(x, w), yy);
        }
      }
      g.strokeStyle = `rgba(0,0,0,${Math.min(1, scanlines).toFixed(3)})`;
      g.lineWidth = 1.2;
      g.stroke();

      const lens = g.createRadialGradient(px, py, 0, px, py, radius * 1.1);
      lens.addColorStop(0, `rgba(255,255,255,${(0.07 * (0.5 + 0.5 * hover)).toFixed(3)})`);
      lens.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = lens;
      g.fillRect(0, 0, w, h);

      const roll = ((t * 0.14) % 1.4) - 0.2;
      const ry = roll * h;
      const bar = g.createLinearGradient(0, ry - h * 0.12, 0, ry + h * 0.12);
      bar.addColorStop(0, "rgba(255,255,255,0)");
      bar.addColorStop(0.5, "rgba(255,255,255,0.06)");
      bar.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = bar;
      g.fillRect(0, ry - h * 0.12, w, h * 0.24);

      const tick = Math.floor(t * 14);
      const hz = ((Math.imul(tick, 2654435761) >>> 0) % 1000) / 1000;
      const dim = flicker * (0.45 + 0.35 * Math.sin(t * 43) + (hz > 0.93 ? 1.2 : 0));
      if (dim > 0) {
        g.fillStyle = `rgba(0,0,0,${Math.min(0.6, dim).toFixed(3)})`;
        g.fillRect(0, 0, w, h);
      }

      const vig = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.hypot(w, h) * 0.55);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      g.fillStyle = vig;
      g.fillRect(0, 0, w, h);

      if (fringe > 0) {
        g.globalCompositeOperation = "lighter";
        g.lineWidth = 2;
        g.save();
        g.translate(-1.5 * fringe, 0);
        g.beginPath();
        screenPath();
        g.strokeStyle = "rgba(255,40,90,0.35)";
        g.stroke();
        g.restore();
        g.save();
        g.translate(1.5 * fringe, 0);
        g.beginPath();
        screenPath();
        g.strokeStyle = "rgba(40,200,255,0.35)";
        g.stroke();
        g.restore();
        g.globalCompositeOperation = "source-over";
      }

      g.beginPath();
      screenPath();
      g.lineWidth = 16;
      g.strokeStyle = "rgba(0,0,0,0.55)";
      g.stroke();
      g.beginPath();
      g.rect(-2, -2, w + 4, h + 4);
      screenPath();
      g.fillStyle = frameColor;
      g.fill("evenodd");
      g.beginPath();
      screenPath();
      g.lineWidth = 1;
      g.strokeStyle = "rgba(255,255,255,0.07)";
      g.stroke();
    };

    const draw = () => {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      if (!hasChildren) renderPattern();
      overlay();
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
      else {
        track(0);
        draw();
      }
    };

    let visible = true;
    let raf = 0;
    let prev = 0;

    const still = () => {
      t = 0.9;
      inside = false;
      placed = false;
      hover = 0;
      track(0);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
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
  }, [accent, frameColor, curvature, scanlines, fringe, flicker, bulge, radius, speed, hasChildren]);

  return (
    <div ref={wrapRef} className={`hb-qo4 ${className}`} style={style} {...rest}>
      <style href="hb-bg-crt-warp" precedence="default">{css}</style>
      {hasChildren && <div className="hb-qo4-in">{children}</div>}
      <canvas ref={canvasRef} className="hb-qo4-c" aria-hidden="true" />
    </div>
  );
}

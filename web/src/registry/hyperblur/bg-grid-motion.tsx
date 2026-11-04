"use client";

import * as React from "react";

export interface BgGridMotionProps extends React.HTMLAttributes<HTMLDivElement> {
  tileSize?: number;
  gap?: number;
  angle?: number;
  speed?: number;
  boost?: number;
  accent?: string;
  colors?: string[];
  tileColor?: string;
}

const css = `
.hb-qq5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qq5-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qq5-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const qq5Palette = ["#7c5cff", "#ff5c8a", "#22d3a7", "#ffb547", "#38bdf8"];

function qq5Hash(a: number, b: number) {
  let x = Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663);
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function qq5Round(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

export function BgGridMotion({
  tileSize = 64,
  gap = 10,
  angle = -14,
  speed = 1,
  boost = 4,
  accent = "#2f7bff",
  colors,
  tileColor = "#141414",
  className = "",
  style,
  children,
  ...rest
}: BgGridMotionProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorKey = (colors && colors.length ? colors : qq5Palette).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const atlas = document.createElement("canvas");
    const actx = atlas.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !actx) return;

    const pal = [accent, ...colorKey.split("|")];
    const kinds = 12;
    const size = Math.max(24, tileSize);
    const pitch = size + Math.max(0, gap);
    const rad = (angle * Math.PI) / 180;
    const ca = Math.cos(rad);
    const sa = Math.sin(rad);

    let w = 0;
    let h = 0;
    let t = 0;
    let dpr = 1;
    let rows = 0;
    let cols = 0;
    let off = new Float32Array(0);
    let gain = new Float32Array(0);
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let act = 0;
    let placed = false;
    let built = false;

    function paintTile(k: number) {
      if (!actx) return;
      const s = size * dpr;
      const ox = k * (s + 4);
      actx.save();
      actx.translate(ox, 0);
      actx.scale(dpr, dpr);
      const c1 = pal[k % pal.length];
      const c2 = pal[(k * 3 + 1) % pal.length];
      const r = Math.min(14, size * 0.18);
      qq5Round(actx, 0.5, 0.5, size - 1, size - 1, r);
      actx.fillStyle = tileColor;
      actx.fill();
      actx.save();
      actx.clip();
      const g = actx.createLinearGradient(0, 0, size, size);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      actx.globalAlpha = 0.18 + (k % 4) * 0.07;
      actx.fillStyle = g;
      actx.fillRect(0, 0, size, size);
      actx.globalAlpha = 1;
      const kind = k % 4;
      if (kind === 0) {
        const rg = actx.createRadialGradient(size * 0.32, size * 0.38, 0, size * 0.32, size * 0.38, size * 0.3);
        rg.addColorStop(0, c1);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        actx.fillStyle = rg;
        actx.fillRect(0, 0, size, size);
        actx.fillStyle = "rgba(255,255,255,0.55)";
        qq5Round(actx, size * 0.16, size * 0.72, size * 0.5, size * 0.07, size * 0.035);
        actx.fill();
        actx.fillStyle = "rgba(255,255,255,0.25)";
        qq5Round(actx, size * 0.16, size * 0.84, size * 0.32, size * 0.06, size * 0.03);
        actx.fill();
      } else if (kind === 1) {
        for (let b = 0; b < 5; b++) {
          const bh = size * (0.18 + qq5Hash(k, b) * 0.46);
          actx.fillStyle = b === 3 ? c1 : "rgba(255,255,255,0.28)";
          qq5Round(actx, size * (0.16 + b * 0.14), size * 0.84 - bh, size * 0.09, bh, size * 0.03);
          actx.fill();
        }
      } else if (kind === 2) {
        actx.beginPath();
        for (let p = 0; p <= 20; p++) {
          const x = size * (0.1 + (p / 20) * 0.8);
          const y = size * (0.58 - Math.sin(p * 0.5 + k) * 0.14 - (p / 20) * 0.12);
          if (p === 0) actx.moveTo(x, y);
          else actx.lineTo(x, y);
        }
        actx.strokeStyle = c1;
        actx.lineWidth = Math.max(1.5, size * 0.035);
        actx.lineCap = "round";
        actx.stroke();
        actx.fillStyle = "rgba(255,255,255,0.4)";
        qq5Round(actx, size * 0.12, size * 0.14, size * 0.3, size * 0.07, size * 0.035);
        actx.fill();
      } else {
        actx.lineWidth = Math.max(1, size * 0.025);
        for (let ring = 3; ring >= 1; ring--) {
          actx.beginPath();
          actx.arc(size * 0.68, size * 0.36, size * 0.09 * ring, 0, Math.PI * 2);
          actx.strokeStyle = ring === 1 ? c2 : "rgba(255,255,255,0.2)";
          actx.stroke();
        }
        actx.fillStyle = "rgba(255,255,255,0.45)";
        qq5Round(actx, size * 0.14, size * 0.74, size * 0.42, size * 0.07, size * 0.035);
        actx.fill();
      }
      actx.restore();
      qq5Round(actx, 0.5, 0.5, size - 1, size - 1, r);
      actx.strokeStyle = "rgba(255,255,255,0.08)";
      actx.lineWidth = 1;
      actx.stroke();
      actx.restore();
    }

    function buildAtlas() {
      if (!actx) return;
      const s = size * dpr;
      atlas.width = Math.ceil(kinds * (s + 4));
      atlas.height = Math.ceil(s);
      actx.clearRect(0, 0, atlas.width, atlas.height);
      for (let k = 0; k < kinds; k++) paintTile(k);
    }

    function idleX(tt: number) {
      return w * (0.5 + 0.34 * Math.sin(tt * 0.37 + 0.5));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.34 * Math.sin(tt * 0.23 + 1.4));
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
      const k = 1 - Math.exp(-dt * (inside ? 10 : 2));
      px += (gx - px) * k;
      py += (gy - py) * k;
      act += ((inside ? 1 : 0) - act) * (1 - Math.exp(-dt * 3));
    }

    function layout() {
      const D = Math.sqrt(w * w + h * h) + pitch * 2;
      rows = Math.ceil(D / pitch) + 1;
      cols = Math.ceil(D / pitch) + 2;
      off = new Float32Array(rows);
      gain = new Float32Array(rows);
      for (let r = 0; r < rows; r++) off[r] = qq5Hash(r, 91) * pitch * 4;
    }

    function update(dt: number) {
      const cx = w / 2;
      const cy = h / 2;
      const dx = px - cx;
      const dy = py - cy;
      const ly = -dx * sa + dy * ca;
      const top = -(rows * pitch) / 2;
      const strength = boost * (0.35 + 0.65 * act);
      const base = 16 * speed;
      for (let r = 0; r < rows; r++) {
        const rc = top + r * pitch + pitch / 2;
        const d = (ly - rc) / pitch;
        const target = strength * Math.exp(-d * d * 0.9);
        gain[r] += (target - gain[r]) * (1 - Math.exp(-dt * 5));
        const dir = r % 2 === 0 ? 1 : -1;
        off[r] += dir * base * (1 + gain[r]) * dt;
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rad);
      const top = -(rows * pitch) / 2;
      const left = -(cols * pitch) / 2;
      const dxp = px - cx;
      const dyp = py - cy;
      const lpx = dxp * ca + dyp * sa;
      const lpy = -dxp * sa + dyp * ca;
      const s = size * dpr;
      for (let r = 0; r < rows; r++) {
        const o = off[r];
        const shift = Math.floor(o / pitch);
        const frac = o - shift * pitch;
        const y = top + r * pitch;
        const glow = Math.min(1, gain[r] / Math.max(0.5, boost));
        for (let c = -1; c < cols; c++) {
          const x = left + c * pitch + frac;
          const idx = c - shift;
          const k = Math.floor(qq5Hash(idx, r * 7 + 3) * kinds);
          const ddx = x + size / 2 - lpx;
          const ddy = y + size / 2 - lpy;
          const near = Math.exp(-(ddx * ddx + ddy * ddy) / (pitch * pitch * 2.2));
          const sc = 1 + near * 0.06 * (0.4 + 0.6 * act);
          ctx.globalAlpha = 0.55 + glow * 0.3 + near * 0.15;
          const sw = size * sc;
          ctx.drawImage(atlas, k * (s + 4), 0, s, s, x + (size - sw) / 2, y + (size - sw) / 2, sw, sw);
        }
      }
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";
      const R = Math.max(w, h) * 0.75;
      const v = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.2, cx, cy, R);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,0.92)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const nd = Math.min(2, window.devicePixelRatio || 1);
      const rebuild = nd !== dpr || !built;
      dpr = nd;
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      if (rebuild) {
        buildAtlas();
        built = true;
      }
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
      t = 0;
      inside = false;
      placed = false;
      act = 0;
      track(0);
      gain.fill(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt;
      track(dt);
      update(dt);
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
      if (!wrap || motion.matches) return;
      const rect = wrap.getBoundingClientRect();
      const kx = rect.width ? wrap.clientWidth / rect.width : 1;
      const ky = rect.height ? wrap.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * kx;
      ty = (e.clientY - rect.top) * ky;
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
  }, [tileSize, gap, angle, speed, boost, accent, colorKey, tileColor]);

  return (
    <div ref={wrapRef} className={`hb-qq5 ${className}`} style={style} {...rest}>
      <style href="hb-bg-grid-motion" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qq5-c" aria-hidden="true" />
      {children ? <div className="hb-qq5-in">{children}</div> : null}
    </div>
  );
}

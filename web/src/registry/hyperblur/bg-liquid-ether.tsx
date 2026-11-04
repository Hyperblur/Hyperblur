"use client";

import * as React from "react";

export interface BgLiquidEtherProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  blobSize?: number;
  intensity?: number;
  force?: number;
  speed?: number;
  seed?: number;
}

const css = `
.hb-qj5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj5-c { display: block; width: 100%; height: 100%; }
`;

const defaultColors = ["#ff9ecf", "#9ec5ff", "#b9a6ff", "#8ff0d6", "#ffd59e"];

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function rgb(hex: string) {
  const m = hex.trim().replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m.slice(0, 6);
  const v = parseInt(full, 16);
  if (Number.isNaN(v)) return [255, 255, 255];
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function BgLiquidEther({
  colors = defaultColors,
  background = "#0b0a12",
  blobSize = 0.42,
  intensity = 0.8,
  force = 1,
  speed = 1,
  seed = 5,
  className = "",
  style,
  ...rest
}: BgLiquidEtherProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const palette = colors.length ? colors.join("|") : defaultColors.join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !bctx) return;

    const tones = palette.split("|").map(rgb);
    const count = Math.max(4, Math.min(14, tones.length * 2));
    const scale = 0.25;
    const bx = new Float32Array(count);
    const by = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const sz = new Float32Array(count);
    const p1 = new Float32Array(count);
    const p2 = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      bx[i] = 0.1 + rnd(seed, i * 6 + 1) * 0.8;
      by[i] = 0.1 + rnd(seed, i * 6 + 2) * 0.8;
      sz[i] = 0.7 + rnd(seed, i * 6 + 3) * 0.6;
      p1[i] = rnd(seed, i * 6 + 4) * 6.283;
      p2[i] = rnd(seed, i * 6 + 5) * 6.283;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let pvx = 0;
    let pvy = 0;
    let placed = false;
    let hue = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.34 * Math.sin(tt * 0.5 + 0.7));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.83 + 2.4));
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
      const k = 1 - Math.exp(-dt * (inside ? 14 : 3));
      const nx = px + (gx - px) * k;
      const ny = py + (gy - py) * k;
      if (dt > 0) {
        const m = 1 - Math.exp(-dt * 8);
        pvx += ((nx - px) / dt - pvx) * m;
        pvy += ((ny - py) / dt - pvy) * m;
      }
      px = nx;
      py = ny;
    }

    function step(dt: number) {
      const reach = Math.max(w, h) * 0.45;
      for (let i = 0; i < count; i++) {
        const x = bx[i] * w;
        const y = by[i] * h;
        const a =
          (Math.sin(x * 0.0035 + t * 0.21 + p1[i]) +
            Math.cos(y * 0.0042 - t * 0.17 + p2[i]) +
            Math.sin((x + y) * 0.0021 + t * 0.11)) *
          Math.PI *
          0.7;
        const flow = 26 * speed;
        vx[i] += (Math.cos(a) * flow - vx[i]) * Math.min(1, dt * 0.9);
        vy[i] += (Math.sin(a) * flow - vy[i]) * Math.min(1, dt * 0.9);
        const dx = x - px;
        const dy = y - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < reach) {
          const k = 1 - d / reach;
          vx[i] += pvx * k * k * dt * 2.4 * force;
          vy[i] += pvy * k * k * dt * 2.4 * force;
        }
        if (x < w * 0.05) vx[i] += 60 * dt;
        if (x > w * 0.95) vx[i] -= 60 * dt;
        if (y < h * 0.05) vy[i] += 60 * dt;
        if (y > h * 0.95) vy[i] -= 60 * dt;
        bx[i] += (vx[i] * dt) / w;
        by[i] += (vy[i] * dt) / h;
      }
      hue += dt * 0.35;
    }

    function blob(x: number, y: number, r: number, vxx: number, vyy: number, c: number[], alpha: number) {
      if (!bctx || !c) return;
      const mag = Math.sqrt(vxx * vxx + vyy * vyy);
      const stretch = 1 + Math.min(1.1, mag / 140);
      bctx.save();
      bctx.translate(x, y);
      bctx.rotate(Math.atan2(vyy, vxx));
      bctx.scale(stretch, 1 / Math.sqrt(stretch));
      const g = bctx.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`);
      g.addColorStop(0.55, `rgba(${c[0]},${c[1]},${c[2]},${(alpha * 0.38).toFixed(3)})`);
      g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
      bctx.fillStyle = g;
      bctx.fillRect(-r, -r, r * 2, r * 2);
      bctx.restore();
    }

    function draw() {
      if (!ctx || !bctx || !w || !h) return;
      const W = buffer.width;
      const H = buffer.height;
      bctx.globalCompositeOperation = "source-over";
      bctx.globalAlpha = 1;
      bctx.fillStyle = background;
      bctx.fillRect(0, 0, W, H);
      bctx.globalCompositeOperation = "screen";
      const base = Math.min(W, H) * blobSize;
      for (let i = 0; i < count; i++) {
        blob(bx[i] * W, by[i] * H, base * sz[i], vx[i], vy[i], tones[i % tones.length], intensity);
      }
      const pm = Math.sqrt(pvx * pvx + pvy * pvy);
      const splash = Math.min(1, pm / 420) * intensity * force;
      if (splash > 0.02) {
        const c = tones[(((Math.floor(hue) || 0) % tones.length) + tones.length) % tones.length];
        blob(px * scale, py * scale, base * 0.55, pvx, pvy, c, splash * 0.85);
      }
      bctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(buffer, 0, 0, w, h);
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
      buffer.width = Math.max(1, Math.round(w * scale));
      buffer.height = Math.max(1, Math.round(h * scale));
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
      pvx = 0;
      pvy = 0;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      step(dt);
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
  }, [palette, background, blobSize, intensity, force, speed, seed]);

  return (
    <div ref={wrapRef} className={`hb-qj5 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-liquid-ether" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj5-c" />
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgDarkVeilProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  edgeColor?: string;
  veilColor?: string;
  opacity?: number;
  tearRadius?: number;
  grain?: number;
  speed?: number;
}

const css = `
.hb-qq2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qq2-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qq2-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function qq2Rgb(color: string, fallback: [number, number, number]): [number, number, number] {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return fallback;
  let s = m[1];
  if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  const v = parseInt(s, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function qq2Lattice(x: number, y: number) {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}

function qq2Noise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = qq2Lattice(ix, iy);
  const b = qq2Lattice(ix + 1, iy);
  const c = qq2Lattice(ix, iy + 1);
  const d = qq2Lattice(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function qq2Fbm(x: number, y: number) {
  return qq2Noise(x, y) * 0.55 + qq2Noise(x * 2.03 + 17.1, y * 2.03 - 9.2) * 0.3 + qq2Noise(x * 4.1 - 3.7, y * 4.1 + 5.3) * 0.15;
}

export function BgDarkVeil({
  accent = "#2f7bff",
  edgeColor = "#a64dff",
  veilColor = "#06070a",
  opacity = 0.94,
  tearRadius = 70,
  grain = 0.04,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgDarkVeilProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const veil = document.createElement("canvas");
    const vctx = veil.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !vctx) return;

    const [vr, vg, vb] = qq2Rgb(veilColor, [6, 7, 10]);
    const [ar, ag, ab] = qq2Rgb(accent, [47, 123, 255]);
    const [er, eg, eb] = qq2Rgb(edgeColor, [166, 77, 255]);
    const baseAlpha = Math.min(1, Math.max(0.3, opacity));

    let w = 0;
    let h = 0;
    let t = 0;
    let cols = 0;
    let rows = 0;
    let cell = 6;
    let img: ImageData | null = null;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let vx = 0;
    let vy = 0;
    let act = 0;
    let placed = false;

    function idleX(tt: number) {
      return w * (0.5 + 0.32 * Math.sin(tt * 0.27 + 0.4) + 0.06 * Math.sin(tt * 0.9));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.22 * Math.sin(tt * 0.41 + 2.2));
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
      const k = 1 - Math.exp(-dt * (inside ? 9 : 1.6));
      const nx = px + (gx - px) * k;
      const ny = py + (gy - py) * k;
      if (dt > 0) {
        const kv = 1 - Math.exp(-dt * 6);
        vx += ((nx - px) / dt - vx) * kv;
        vy += ((ny - py) / dt - vy) * kv;
      }
      px = nx;
      py = ny;
      act += ((inside ? 1 : 0) - act) * (1 - Math.exp(-dt * 2.5));
    }

    function render() {
      if (!img || !vctx) return;
      const data = img.data;
      const s = 1 / Math.max(80, Math.min(w, h) * 0.55);
      const tt = t * 0.09;
      const gpx = px / cell;
      const gpy = py / cell;
      const sp = Math.hypot(vx, vy);
      const dirx = sp > 1 ? vx / sp : 1;
      const diry = sp > 1 ? vy / sp : 0;
      const stretch = 1 + Math.min(1.2, sp / 600);
      const lift = 0.45 + 0.55 * act + 0.12 * Math.sin(t * 1.3);
      const rad = (tearRadius * (0.75 + 0.35 * act)) / cell;
      for (let j = 0; j < rows; j++) {
        const yy = j * cell;
        const ey = Math.min(j, rows - 1 - j) / Math.max(1, rows * 0.5);
        for (let i = 0; i < cols; i++) {
          const xx = i * cell;
          const sx = xx * s;
          const sy = yy * s;
          const wx = qq2Noise(sx * 1.3 + tt, sy * 1.3 - tt * 0.6) - 0.5;
          const wy = qq2Noise(sx * 1.3 - 4.1 - tt * 0.5, sy * 1.3 + 7.7 + tt) - 0.5;
          const n = qq2Fbm(sx * 2.2 + wx * 1.6 + tt * 0.7, sy * 2.2 + wy * 1.6 - tt * 0.4);
          const ex = Math.min(i, cols - 1 - i) / Math.max(1, cols * 0.5);
          const edge = Math.max(0, 1 - Math.min(ex * 1.6, ey * 1.3));
          const band = Math.max(0, 1 - Math.abs(n - 0.55) * 4.5);
          const ddx = i - gpx;
          const ddy = j - gpy;
          const along = ddx * dirx + ddy * diry;
          const across = -ddx * diry + ddy * dirx;
          const d = Math.sqrt((along * along) / (stretch * stretch) + across * across);
          const ragged = rad * (0.7 + 0.6 * n);
          let tear = d < ragged ? 1 - d / ragged : 0;
          tear = tear * tear * (3 - 2 * tear) * lift;
          const rim = Math.max(0, 1 - Math.abs(d - ragged) / Math.max(1.5, rad * 0.35)) * lift;
          const shade = 0.55 + n * 0.9;
          const g = (qq2Lattice(i + ((t * 24) | 0), j) - 0.5) * grain * 255;
          const tintE = edge * band * 0.55;
          const tintR = rim * 0.75;
          let r = vr * shade + er * tintE + ar * tintR + g;
          let gg = vg * shade + eg * tintE + ag * tintR + g;
          let b = vb * shade + eb * tintE + ab * tintR + g;
          r = r < 0 ? 0 : r > 255 ? 255 : r;
          gg = gg < 0 ? 0 : gg > 255 ? 255 : gg;
          b = b < 0 ? 0 : b > 255 ? 255 : b;
          let a = baseAlpha * (0.82 + 0.18 * n) - edge * band * 0.28 - tear * 0.92;
          a = a < 0 ? 0 : a > 1 ? 1 : a;
          const o = (j * cols + i) * 4;
          data[o] = r;
          data[o + 1] = gg;
          data[o + 2] = b;
          data[o + 3] = a * 255;
        }
      }
      vctx.putImageData(img, 0, 0);
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const R = Math.max(w, h);
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, edgeColor);
      base.addColorStop(0.5, "#05060a");
      base.addColorStop(1, accent);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      const glowR = tearRadius * (1.6 + 0.6 * act);
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
      glow.addColorStop(0, "#ffffff");
      glow.addColorStop(0.18, accent);
      glow.addColorStop(0.6, edgeColor);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = glow;
      ctx.fillRect(px - R, py - R, R * 2, R * 2);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      render();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(veil, 0, 0, cols, rows, -cell / 2, -cell / 2, cols * cell, rows * cell);
    }

    function resize() {
      if (!wrap || !canvas || !ctx || !vctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = 5;
      while ((w / cell + 2) * (h / cell + 2) > 16000) cell *= 1.2;
      cols = Math.ceil(w / cell) + 2;
      rows = Math.ceil(h / cell) + 2;
      veil.width = cols;
      veil.height = rows;
      img = vctx.createImageData(cols, rows);
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
      t = 4;
      inside = false;
      placed = false;
      act = 0;
      vx = 0;
      vy = 0;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
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
  }, [accent, edgeColor, veilColor, opacity, tearRadius, grain, speed]);

  return (
    <div ref={wrapRef} className={`hb-qq2 ${className}`} style={style} {...rest}>
      <style href="hb-bg-dark-veil" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qq2-c" aria-hidden="true" />
      {children ? <div className="hb-qq2-in">{children}</div> : null}
    </div>
  );
}

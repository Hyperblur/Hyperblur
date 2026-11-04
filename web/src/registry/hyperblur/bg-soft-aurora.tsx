"use client";

import * as React from "react";

export interface BgSoftAuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  accent?: string;
  background?: string;
  motes?: number;
  intensity?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp2-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp2-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const defaultColors = ["#9ec5ff", "#c8b4ff", "#9fe8d2", "#ffc6e0"];

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function BgSoftAurora({
  colors = defaultColors,
  accent = "#e8f0ff",
  background = "#07080d",
  motes = 40,
  intensity = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgSoftAuroraProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorKey = (colors.length ? colors : defaultColors).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !octx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = colorKey.split("|");
    const curtains = palette.length;
    const M = Math.max(0, Math.min(160, Math.round(motes)));
    const SCALE = 6;

    let w = 0;
    let h = 0;
    let ow = 0;
    let oh = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let near = 0;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.32 * Math.sin(tt * 0.12 + 0.6));
    }
    function idleY(tt: number) {
      return h * (0.38 + 0.12 * Math.sin(tt * 0.19 + 2));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        placed = true;
        near = inside ? 1 : 0.45;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 2.2 : 0.9));
      px += (gx - px) * k;
      py += (gy - py) * k;
      near += ((inside ? 1 : 0.45) - near) * Math.min(1, dt * 1.5);
    }

    function curtainsPass() {
      octx!.globalCompositeOperation = "source-over";
      octx!.clearRect(0, 0, ow, oh);
      octx!.globalCompositeOperation = "lighter";
      const pxs = px / SCALE;
      const lean = (px / Math.max(1, w) - 0.5) * 0.9;
      for (let c = 0; c < curtains; c++) {
        const seed = c * 7 + 3;
        const base = oh * (0.22 + (0.42 * c) / Math.max(1, curtains - 1 || 1)) + (rnd(seed) - 0.5) * oh * 0.08;
        const amp = oh * (0.08 + 0.06 * rnd(seed + 1));
        const freq = (0.9 + 0.8 * rnd(seed + 2)) / Math.max(1, ow);
        const len = oh * (0.28 + 0.14 * rnd(seed + 3));
        const drift = 0.06 + 0.05 * rnd(seed + 4);
        const grad = octx!.createLinearGradient(0, 0, 0, len);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.35, palette[c]);
        grad.addColorStop(0.6, palette[c]);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        octx!.fillStyle = grad;
        for (let x = -2; x < ow + 2; x++) {
          const dx = (x - pxs) / Math.max(1, ow * 0.35);
          const bend = Math.exp(-dx * dx) * near;
          const y =
            base +
            Math.sin(x * freq * Math.PI * 2 + t * drift * 3 + c * 1.9) * amp +
            Math.sin(x * freq * 5.1 + t * drift * 5.3 + c) * amp * 0.35 -
            bend * oh * 0.07 -
            len * 0.5;
          const shimmer = 0.5 + 0.5 * Math.sin(x * freq * 17 + t * drift * 9 + c * 4.1);
          octx!.globalAlpha = Math.min(1, (0.1 + 0.12 * shimmer + bend * 0.08) * intensity);
          octx!.setTransform(1, 0, lean * 0.35, 1, x, y);
          octx!.fillRect(0, 0, 1.4, len);
        }
      }
      octx!.setTransform(1, 0, 0, 1, 0, 0);
      octx!.globalAlpha = 1;
    }

    function draw() {
      if (!w || !h) return;
      curtainsPass();
      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";
      ctx!.globalCompositeOperation = "lighter";
      ctx!.drawImage(off, 0, 0, ow, oh, -SCALE, -SCALE, w + SCALE * 2, h + SCALE * 2);
      const r = Math.max(w, h) * 0.42;
      const bloom = ctx!.createRadialGradient(px, py, 0, px, py, r);
      bloom.addColorStop(0, accent);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = (0.05 + 0.06 * near) * intensity;
      ctx!.fillStyle = bloom;
      ctx!.fillRect(0, 0, w, h);
      ctx!.fillStyle = accent;
      for (let i = 0; i < M; i++) {
        const sx = rnd(i * 5 + 11);
        const sy = rnd(i * 5 + 12);
        const sp = 0.004 + 0.01 * rnd(i * 5 + 13);
        const yy = (((sy - t * sp) % 1) + 1) % 1;
        const x = sx * w + Math.sin(t * 0.3 + i) * 14;
        const y = yy * (h + 20) - 10;
        const dx = x - px;
        const dy = y - py;
        const lit = Math.exp(-(dx * dx + dy * dy) / (r * r * 0.3)) * near;
        const tw = 0.5 + 0.5 * Math.sin(t * (0.6 + rnd(i * 5 + 14)) + i * 2.7);
        const fade = Math.min(1, yy * 4, (1 - yy) * 4);
        ctx!.globalAlpha = Math.max(0, (0.12 + 0.4 * tw + 0.4 * lit) * fade);
        ctx!.beginPath();
        ctx!.arc(x, y, 0.6 + 0.9 * rnd(i * 5 + 15) + lit * 0.6, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function still() {
      t = 9;
      inside = false;
      placed = false;
      track(0);
      draw();
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      ow = Math.max(4, Math.ceil(w / SCALE));
      oh = Math.max(4, Math.ceil(h / SCALE));
      off.width = ow;
      off.height = oh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
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
  }, [colorKey, accent, background, motes, intensity, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp2 ${className}`} style={style} {...rest}>
      <style href="hb-bg-soft-aurora" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp2-c" aria-hidden="true" />
      {children ? <div className="hb-qp2-in">{children}</div> : null}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgPrismBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  background?: string;
  rays?: number;
  spread?: number;
  intensity?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp6 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp6-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp6-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const spectrum = ["#ff3b4e", "#ff8a2a", "#ffe14a", "#3dff8f", "#2fb4ff", "#5b5bff", "#b04dff"];

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function BgPrismBurst({
  accent = "#cfe0ff",
  background = "#050508",
  rays = 22,
  spread = 1,
  intensity = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgPrismBurstProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !octx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const N = Math.max(4, Math.min(60, Math.round(rays)));
    const S = spectrum.length;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.22 * Math.sin(tt * 0.23 + 0.5));
    }
    function idleY(tt: number) {
      return h * (0.42 + 0.16 * Math.sin(tt * 0.31 + 1.7));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        placed = true;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 6 : 1.4));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function draw() {
      if (!w || !h) return;
      const far = Math.hypot(Math.max(px, w - px), Math.max(py, h - py)) * 1.05;
      octx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx!.globalCompositeOperation = "source-over";
      octx!.globalAlpha = 1;
      octx!.clearRect(0, 0, w, h);
      octx!.globalCompositeOperation = "lighter";
      const spin = t * 0.06;
      for (let r = 0; r < N; r++) {
        const seed = r * 17 + 3;
        const a = (r / N) * Math.PI * 2 + spin + (rnd(seed) - 0.5) * (Math.PI / N);
        const width = (0.03 + 0.07 * rnd(seed + 1)) * spread;
        const len = far * (0.45 + 0.55 * rnd(seed + 2)) * (0.82 + 0.18 * Math.sin(t * (0.5 + rnd(seed + 3)) + r * 1.3));
        const power = (0.35 + 0.65 * rnd(seed + 4)) * (0.75 + 0.25 * Math.sin(t * 0.9 + r * 2.1));
        const band = (width * 2.5) / S;
        for (let s = 0; s < S; s++) {
          const a0 = a + (s / S - 0.5) * width * 1.8;
          const a1 = a0 + band;
          octx!.globalAlpha = 0.24 * power * intensity;
          octx!.fillStyle = spectrum[s];
          octx!.beginPath();
          octx!.moveTo(px, py);
          octx!.lineTo(px + Math.cos(a0) * len, py + Math.sin(a0) * len);
          octx!.lineTo(px + Math.cos(a1) * len, py + Math.sin(a1) * len);
          octx!.closePath();
          octx!.fill();
        }
        octx!.globalAlpha = 0.12 * power * intensity;
        octx!.fillStyle = "#ffffff";
        octx!.beginPath();
        octx!.moveTo(px, py);
        octx!.lineTo(px + Math.cos(a - width * 0.12) * len * 0.6, py + Math.sin(a - width * 0.12) * len * 0.6);
        octx!.lineTo(px + Math.cos(a + width * 0.12) * len * 0.6, py + Math.sin(a + width * 0.12) * len * 0.6);
        octx!.closePath();
        octx!.fill();
      }
      octx!.globalCompositeOperation = "destination-in";
      octx!.globalAlpha = 1;
      const mask = octx!.createRadialGradient(px, py, 0, px, py, far);
      mask.addColorStop(0, "rgba(0,0,0,1)");
      mask.addColorStop(0.35, "rgba(0,0,0,0.75)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      octx!.fillStyle = mask;
      octx!.fillRect(0, 0, w, h);

      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.drawImage(off, 0, 0);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const halo = Math.min(w, h) * 0.5;
      const hg = ctx!.createRadialGradient(px, py, 0, px, py, halo);
      hg.addColorStop(0, accent);
      hg.addColorStop(0.4, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.35 * intensity;
      ctx!.fillStyle = hg;
      ctx!.fillRect(px - halo, py - halo, halo * 2, halo * 2);

      const core = Math.min(w, h) * 0.07 * (0.92 + 0.08 * Math.sin(t * 2.2));
      const cg = ctx!.createRadialGradient(px, py, 0, px, py, core);
      cg.addColorStop(0, "#ffffff");
      cg.addColorStop(0.35, accent);
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.95;
      ctx!.fillStyle = cg;
      ctx!.fillRect(px - core, py - core, core * 2, core * 2);

      const ring = Math.min(w, h) * 0.22;
      ctx!.globalAlpha = 0.1 * intensity;
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(px, py, ring, 0, Math.PI * 2);
      ctx!.stroke();

      const fx = w / 2 + (w / 2 - px) * 0.6;
      const fy = h / 2 + (h / 2 - py) * 0.6;
      for (let i = 0; i < 3; i++) {
        const k = 0.35 + i * 0.32;
        const x = px + (fx - px) * k;
        const y = py + (fy - py) * k;
        const rr = Math.min(w, h) * (0.025 + 0.02 * i);
        ctx!.globalAlpha = 0.1 * intensity;
        ctx!.fillStyle = spectrum[(i * 2 + 1) % S];
        ctx!.beginPath();
        ctx!.arc(x, y, rr, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function still() {
      t = 6;
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
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      off.width = canvas.width;
      off.height = canvas.height;
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
  }, [accent, background, rays, spread, intensity, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp6 ${className}`} style={style} {...rest}>
      <style href="hb-bg-prism-burst" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp6-c" aria-hidden="true" />
      {children ? <div className="hb-qp6-in">{children}</div> : null}
    </div>
  );
}

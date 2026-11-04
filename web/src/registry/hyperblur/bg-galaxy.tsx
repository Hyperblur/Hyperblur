"use client";

import * as React from "react";

export interface BgGalaxyProps extends React.HTMLAttributes<HTMLDivElement> {
  stars?: number;
  arms?: number;
  twist?: number;
  accent?: string;
  coreColor?: string;
  tilt?: number;
  parallax?: number;
  spread?: number;
  speed?: number;
  seed?: number;
}

const css = `
.hb-qq1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qq1-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qq1-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function qq1Hash(n: number) {
  let x = n | 0;
  x = (x ^ 61) ^ (x >>> 16);
  x = Math.imul(x, 9);
  x ^= x >>> 4;
  x = Math.imul(x, 0x27d4eb2d);
  x ^= x >>> 15;
  return (x >>> 0) / 4294967296;
}

export function BgGalaxy({
  stars = 4200,
  arms = 2,
  twist = 3.4,
  accent = "#7fb3ff",
  coreColor = "#ffd7a3",
  tilt = 0.56,
  parallax = 16,
  spread = 24,
  speed = 1,
  seed = 7,
  className = "",
  style,
  children,
  ...rest
}: BgGalaxyProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const TAU = Math.PI * 2;
    const armCount = Math.max(1, Math.round(arms));
    const total = Math.max(200, Math.min(12000, Math.round(stars)));
    const incline = Math.min(1, Math.max(0.15, tilt));
    const palette = [coreColor, "#fff4e6", "#eef2ff", accent, "#ffb0cf"];

    const sr = new Float32Array(total);
    const sa = new Float32Array(total);
    const sz = new Float32Array(total);
    const ss = new Float32Array(total);
    const sb = new Float32Array(total);
    const sp = new Float32Array(total);
    const sw = new Float32Array(total);
    const order = new Uint16Array(total);
    const bucketEnd = new Int32Array(palette.length);

    const buckets: number[][] = palette.map(() => []);
    for (let i = 0; i < total; i++) {
      const k = (seed | 0) * 7919 + i * 13;
      const r1 = qq1Hash(k + 1);
      const r2 = qq1Hash(k + 2);
      const r3 = qq1Hash(k + 3);
      const r4 = qq1Hash(k + 4);
      const r5 = qq1Hash(k + 5);
      const r6 = qq1Hash(k + 6);
      let r: number;
      let a: number;
      let bucket: number;
      if (r1 < 0.2) {
        r = 0.2 * Math.pow(r2, 1.6);
        a = r3 * TAU;
        bucket = r4 < 0.7 ? 0 : 1;
      } else {
        r = 0.07 + 0.93 * Math.pow(r2, 0.85);
        const arm = i % armCount;
        const scatter = (r3 + r4 - 1) * (0.5 - r * 0.22);
        a = (arm / armCount) * TAU + r * twist + scatter;
        r += (r5 - 0.5) * 0.05;
        const zone = r * 2.6 + r6 * 1.4;
        bucket = zone < 1 ? 1 : zone < 2.1 ? 2 : r6 > 0.94 ? 4 : 3;
      }
      sr[i] = Math.max(0.005, r);
      sa[i] = a;
      sz[i] = r5;
      ss[i] = 0.45 + Math.pow(r6, 7) * 1.7;
      sb[i] = 0.35 + 0.65 * Math.pow(r3, 2) * (1.1 - r * 0.4);
      sp[i] = r4 * TAU;
      sw[i] = 0.6 + r1 * 2.4;
      buckets[bucket].push(i);
    }
    let cursor = 0;
    for (let b = 0; b < buckets.length; b++) {
      for (const i of buckets[b]) order[cursor++] = i;
      bucketEnd[b] = cursor;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let act = 0;
    let placed = false;

    function idleX(tt: number) {
      return w * (0.5 + 0.3 * Math.sin(tt * 0.31 + 0.6));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.28 * Math.sin(tt * 0.47 + 1.9));
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
      const k = 1 - Math.exp(-dt * (inside ? 7 : 1.8));
      px += (gx - px) * k;
      py += (gy - py) * k;
      act += ((inside ? 1 : 0) - act) * (1 - Math.exp(-dt * 3));
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w * 0.5, (h * 0.5) / incline) * 0.98;
      const nx = (px - cx) / Math.max(1, w / 2);
      const ny = (py - cy) / Math.max(1, h / 2);
      const spin = t * 0.06;
      const roll = -0.32;
      const cr = Math.cos(roll);
      const sn = Math.sin(roll);
      const partR = Math.max(40, R * 0.42);
      const partR2 = partR * partR;
      const strength = spread * (0.4 + 0.6 * act);

      ctx.globalCompositeOperation = "lighter";
      const gx0 = cx + nx * parallax * 0.2;
      const gy0 = cy + ny * parallax * 0.2;
      const halo = ctx.createRadialGradient(gx0, gy0, 0, gx0, gy0, R * 0.9);
      halo.addColorStop(0, accent);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);
      const core = ctx.createRadialGradient(gx0, gy0, 0, gx0, gy0, R * 0.32);
      core.addColorStop(0, "#ffffff");
      core.addColorStop(0.18, coreColor);
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = core;
      ctx.save();
      ctx.translate(gx0, gy0);
      ctx.rotate(roll);
      ctx.scale(1, incline * 1.25);
      ctx.translate(-gx0, -gy0);
      ctx.fillRect(gx0 - R, gy0 - R, R * 2, R * 2);
      ctx.restore();

      let start = 0;
      for (let b = 0; b < palette.length; b++) {
        ctx.fillStyle = palette[b];
        const end = bucketEnd[b];
        for (let o = start; o < end; o++) {
          const i = order[o];
          const r = sr[i];
          const ang = sa[i] + spin + Math.sin(t * 0.2 + sp[i]) * 0.012 / (r + 0.2);
          const lx = Math.cos(ang) * r * R;
          const ly = Math.sin(ang) * r * R * incline;
          const depth = sz[i] - 0.5;
          let x = cx + lx * cr - ly * sn + nx * parallax * (0.35 + depth * 1.6);
          let y = cy + lx * sn + ly * cr + ny * parallax * (0.35 + depth * 1.6) * 0.7;
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < partR2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = 1 - d / partR;
            const push = f * f * strength * (0.6 + sz[i] * 0.8);
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
          const tw = 0.72 + 0.28 * Math.sin(t * sw[i] + sp[i]);
          ctx.globalAlpha = Math.min(1, sb[i] * tw);
          const s = ss[i] * (0.8 + sz[i] * 0.5);
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
        start = end;
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round";
      const lx0 = nx * parallax * 0.35;
      const ly0 = ny * parallax * 0.25;
      for (let arm = 0; arm < armCount; arm++) {
        for (let pass = 0; pass < 3; pass++) {
          ctx.beginPath();
          for (let s = 0; s <= 40; s++) {
            const r = 0.1 + (s / 40) * 0.62;
            const ang = (arm / armCount) * TAU + r * twist + spin - 0.24;
            const ex = Math.cos(ang) * r * R;
            const ey = Math.sin(ang) * r * R * incline;
            const x = cx + ex * cr - ey * sn + lx0;
            const y = cy + ex * sn + ey * cr + ly0;
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.globalAlpha = [0.1, 0.14, 0.2][pass];
          ctx.lineWidth = R * [0.075, 0.045, 0.02][pass];
          ctx.strokeStyle = "#020205";
          ctx.stroke();
        }
      }
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
      t = 3;
      inside = false;
      placed = false;
      act = 0;
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
  }, [stars, arms, twist, accent, coreColor, tilt, parallax, spread, speed, seed]);

  return (
    <div ref={wrapRef} className={`hb-qq1 ${className}`} style={style} {...rest}>
      <style href="hb-bg-galaxy" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qq1-c" aria-hidden="true" />
      {children ? <div className="hb-qq1-in">{children}</div> : null}
    </div>
  );
}

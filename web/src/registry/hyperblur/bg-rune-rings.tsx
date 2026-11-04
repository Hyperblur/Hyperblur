"use client";

import * as React from "react";

export interface BgRuneRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  color?: string;
  background?: string;
  rings?: number;
  tilt?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

interface Ring {
  r: number;
  spin: number;
  ticks: number;
  glyphs: number[][];
  dashed: boolean;
}

function buildRings(count: number): Ring[] {
  const out: Ring[] = [];
  for (let k = 0; k < count; k++) {
    const r = 0.3 + (0.7 * (k + 1)) / count;
    const dir = k % 2 === 0 ? 1 : -1;
    const spin = dir * (0.05 + 0.1 * rnd(k * 13 + 1)) * (1.4 - r * 0.6);
    const ticks = Math.round(10 + r * 26);
    const glyphs: number[][] = [];
    for (let g = 0; g < ticks; g++) {
      const seed = k * 977 + g * 31;
      const strokes: number[] = [];
      const n = 2 + Math.floor(rnd(seed) * 3);
      for (let s = 0; s < n; s++) {
        const pick = Math.floor(rnd(seed + s * 7 + 1) * 6);
        const a = rnd(seed + s * 7 + 2);
        if (pick === 0) strokes.push(-0.5, -1, -0.5, 1);
        else if (pick === 1) strokes.push(0.5, -1, 0.5, 1);
        else if (pick === 2) strokes.push(-0.5, -1 + a, 0.5, 1 - a);
        else if (pick === 3) strokes.push(-0.5, 0, 0.5, -1 + a * 0.5);
        else if (pick === 4) strokes.push(0, -1, 0, 1);
        else strokes.push(-0.5, 1 - a, 0.5, 1);
      }
      glyphs.push(strokes);
    }
    out.push({ r, spin, ticks, glyphs, dashed: k % 3 === 1 });
  }
  return out;
}

export function BgRuneRings({
  accent = "#2f7bff",
  color = "#a9c8ff",
  background = "#05060a",
  rings = 5,
  tilt = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgRuneRingsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const list = buildRings(Math.max(2, Math.min(9, Math.round(rings))));
    const SEG = 120;

    let w = 0;
    let h = 0;
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
    let cx = 0;
    let cy = 0;
    let R = 1;
    let rx = 0;
    let ry = 0;
    let cosX = 1;
    let sinX = 0;
    let cosY = 1;
    let sinY = 0;
    let outX = 0;
    let outY = 0;
    let outZ = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.3 * Math.sin(tt * 0.29));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.37 + 1.3));
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
      const k = 1 - Math.exp(-dt * (inside ? 5 : 1.6));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function project(x: number, y: number, z: number) {
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;
      const f = 3.2 * R;
      const s = f / (f + z2);
      outX = cx + x2 * s;
      outY = cy + y1 * s;
      outZ = z2;
    }

    function draw() {
      if (!w || !h) return;
      cx = w / 2;
      cy = h / 2;
      R = Math.min(w * 0.46, h * 0.95);
      const nx = (px / Math.max(1, w) - 0.5) * 2;
      const ny = (py / Math.max(1, h) - 0.5) * 2;
      rx = (0.95 + ny * 0.4) * tilt;
      ry = nx * 0.55 * tilt;
      cosX = Math.cos(rx);
      sinX = Math.sin(rx);
      cosY = Math.cos(ry);
      sinY = Math.sin(ry);

      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);

      ctx!.globalCompositeOperation = "lighter";
      const core = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
      core.addColorStop(0, accent);
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.22 + 0.05 * Math.sin(t * 1.3);
      ctx!.fillStyle = core;
      ctx!.fillRect(0, 0, w, h);

      ctx!.lineCap = "round";
      for (let k = 0; k < list.length; k++) {
        const ring = list[k];
        const r = ring.r * R;
        const rot = t * ring.spin;
        ctx!.strokeStyle = accent;
        ctx!.beginPath();
        for (let i = 0; i <= SEG; i++) {
          const a = (i / SEG) * Math.PI * 2;
          project(Math.cos(a) * r, Math.sin(a) * r, 0);
          if (i === 0) ctx!.moveTo(outX, outY);
          else ctx!.lineTo(outX, outY);
        }
        ctx!.globalAlpha = 0.18;
        ctx!.lineWidth = 5;
        ctx!.stroke();
        ctx!.strokeStyle = color;
        ctx!.globalAlpha = 0.55;
        ctx!.lineWidth = 1;
        if (ring.dashed) ctx!.setLineDash([2, 6]);
        ctx!.stroke();
        ctx!.setLineDash([]);

        const gs = Math.max(2.5, R * 0.028) * (0.8 + ring.r * 0.4);
        ctx!.lineWidth = 1.1;
        ctx!.beginPath();
        for (let g = 0; g < ring.ticks; g++) {
          const a = (g / ring.ticks) * Math.PI * 2 + rot;
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          const strokes = ring.glyphs[g];
          const off = r + (k % 2 === 0 ? gs * 1.8 : -gs * 1.8);
          for (let s = 0; s < strokes.length; s += 4) {
            const u0 = strokes[s] * gs;
            const v0 = strokes[s + 1] * gs;
            const u1 = strokes[s + 2] * gs;
            const v1 = strokes[s + 3] * gs;
            project(ca * (off + v0) - sa * u0, sa * (off + v0) + ca * u0, 0);
            ctx!.moveTo(outX, outY);
            project(ca * (off + v1) - sa * u1, sa * (off + v1) + ca * u1, 0);
            ctx!.lineTo(outX, outY);
          }
        }
        ctx!.strokeStyle = color;
        ctx!.globalAlpha = 0.75;
        ctx!.stroke();

        const ma = rot * 2.3 + k;
        project(Math.cos(ma) * r, Math.sin(ma) * r, 0);
        const depth = 0.65 + 0.35 * Math.max(-1, Math.min(1, -outZ / Math.max(1, r)));
        const glow = ctx!.createRadialGradient(outX, outY, 0, outX, outY, gs * 5);
        glow.addColorStop(0, color);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.globalAlpha = 0.8 * depth;
        ctx!.fillStyle = glow;
        ctx!.fillRect(outX - gs * 5, outY - gs * 5, gs * 10, gs * 10);
      }

      ctx!.globalAlpha = 0.9;
      ctx!.fillStyle = color;
      ctx!.beginPath();
      project(0, 0, 0);
      ctx!.arc(outX, outY, Math.max(1.5, R * 0.012), 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function still() {
      t = 4;
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
  }, [accent, color, background, rings, tilt, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp3 ${className}`} style={style} {...rest}>
      <style href="hb-bg-rune-rings" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp3-c" aria-hidden="true" />
      {children ? <div className="hb-qp3-in">{children}</div> : null}
    </div>
  );
}

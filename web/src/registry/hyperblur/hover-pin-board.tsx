"use client";

import * as React from "react";

export interface HoverPinBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  radius?: number;
  recovery?: number;
  accent?: string;
  pinColor?: string;
  autoPlay?: boolean;
}

const css = `
.hb-wg9 { position: relative; box-sizing: border-box; width: 100%; height: 100%; overflow: hidden; font-family: inherit; background: radial-gradient(120% 90% at 50% 0%, #161616 0%, #0b0b0b 70%); isolation: isolate; touch-action: pan-y; }
.hb-wg9 *, .hb-wg9 *::before, .hb-wg9 *::after { box-sizing: border-box; }
.hb-wg9-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-wg9-content { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: none; }
.hb-wg9-content > * { pointer-events: auto; }
`;

function parse(hex: string) {
  const m = hex.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m.padEnd(6, "0").slice(0, 6);
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function HoverPinBoard({
  spacing = 13,
  radius = 46,
  recovery = 2.6,
  accent = "#2f7bff",
  pinColor = "#d9d9d9",
  autoPlay = true,
  className = "",
  style,
  children,
  ...rest
}: HoverPinBoardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [ar, ag, ab] = parse(accent);
    const [pr, pg, pb] = parse(pinColor);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rowsN = 0;
    let ox = 0;
    let oy = 0;
    let depth = new Float32Array(0);
    let px = -999;
    let py = -999;
    let lpx = -999;
    let lpy = -999;
    let inside = false;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let dirty = true;

    const resize = () => {
      w = root.offsetWidth;
      h = root.offsetHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.floor(w / spacing));
      rowsN = Math.max(1, Math.floor(h / spacing));
      ox = (w - (cols - 1) * spacing) / 2;
      oy = (h - (rowsN - 1) * spacing) / 2;
      depth = new Float32Array(cols * rowsN);
      dirty = true;
    };

    const press = (x: number, y: number, x0: number, y0: number) => {
      const steps = Math.max(1, Math.ceil(Math.hypot(x - x0, y - y0) / (spacing * 0.5)));
      for (let s = 1; s <= steps; s++) {
        const sx = x0 + ((x - x0) * s) / steps;
        const sy = y0 + ((y - y0) * s) / steps;
        const c0 = Math.max(0, Math.floor((sx - ox - radius) / spacing));
        const c1 = Math.min(cols - 1, Math.ceil((sx - ox + radius) / spacing));
        const r0 = Math.max(0, Math.floor((sy - oy - radius) / spacing));
        const r1 = Math.min(rowsN - 1, Math.ceil((sy - oy + radius) / spacing));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const d = Math.hypot(ox + c * spacing - sx, oy + r * spacing - sy);
            if (d >= radius) continue;
            const f = 1 - d / radius;
            const v = f * f * (3 - 2 * f);
            const i = r * cols + c;
            if (v > depth[i]) depth[i] = v;
          }
        }
      }
      dirty = true;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const head = spacing * 0.3;
      const rise = spacing * 0.22;
      for (let r = 0; r < rowsN; r++) {
        for (let c = 0; c < cols; c++) {
          const v = depth[r * cols + c];
          const x = ox + c * spacing;
          const y = oy + r * spacing;
          const up = 1 - v;
          ctx.fillStyle = "rgba(0,0,0,0.55)";
          ctx.beginPath();
          ctx.arc(x + rise * up * 0.6, y + rise * up * 0.9, head * (0.9 + up * 0.25), 0, Math.PI * 2);
          ctx.fill();
          const lift = rise * up;
          const hx = x - lift * 0.35;
          const hy = y - lift;
          const lum = 0.32 + 0.68 * up;
          const mixA = v * 0.85;
          const cr = Math.round((pr * lum) * (1 - mixA) + ar * mixA);
          const cg = Math.round((pg * lum) * (1 - mixA) + ag * mixA);
          const cb = Math.round((pb * lum) * (1 - mixA) + ab * mixA);
          const g = ctx.createRadialGradient(hx - head * 0.35, hy - head * 0.4, head * 0.1, hx, hy, head);
          g.addColorStop(0, `rgb(${Math.min(255, cr + 70)},${Math.min(255, cg + 70)},${Math.min(255, cb + 70)})`);
          g.addColorStop(1, `rgb(${cr},${cg},${cb})`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(hx, hy, head, 0, Math.PI * 2);
          ctx.fill();
          if (v > 0.35) {
            ctx.fillStyle = `rgba(${ar},${ag},${ab},${((v - 0.35) * 0.35).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(hx, hy, head * 2.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (!inside && autoPlay) {
        const ax = w * (0.5 + 0.4 * Math.sin(t * 0.9));
        const ay = h * (0.5 + 0.3 * Math.sin(t * 1.8 + 0.6));
        if (lpx < -900) {
          lpx = ax;
          lpy = ay;
        }
        press(ax, ay, lpx, lpy);
        lpx = ax;
        lpy = ay;
      } else if (inside) {
        press(px, py, lpx < -900 ? px : lpx, lpy < -900 ? py : lpy);
        lpx = px;
        lpy = py;
      }
      const dec = dt / Math.max(0.2, recovery);
      let any = false;
      for (let i = 0; i < depth.length; i++) {
        if (depth[i] > 0) {
          depth[i] = Math.max(0, depth[i] - dec * (0.35 + depth[i]));
          any = true;
        }
      }
      if (any || dirty) {
        draw();
        dirty = false;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      const s = b.width ? root.offsetWidth / b.width : 1;
      px = (e.clientX - b.left) * s;
      py = (e.clientY - b.top) * s;
      if (!inside) {
        lpx = px;
        lpy = py;
      }
      inside = true;
      if (reduce) {
        depth.fill(0);
        press(px, py, px, py);
        draw();
      }
    };
    const onLeave = () => {
      inside = false;
      lpx = -999;
      lpy = -999;
      if (reduce) {
        depth.fill(0);
        draw();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 600);
    };
    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(root);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerup", onUp);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
      else stop();
    });
    io.observe(root);
    if (!reduce) start();
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [spacing, radius, recovery, accent, pinColor, autoPlay]);

  return (
    <div ref={rootRef} className={`hb-wg9 ${className}`} style={style} {...rest}>
      <style href="hb-hover-pin-board" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-wg9-canvas" aria-hidden="true" />
      {children ? <div className="hb-wg9-content">{children}</div> : null}
    </div>
  );
}

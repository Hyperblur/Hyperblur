"use client";

import * as React from "react";

export interface BgGridScanProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  accent?: string;
  color?: string;
  background?: string;
  trail?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp4-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

export function BgGridScan({
  cellSize = 28,
  accent = "#2f7bff",
  color = "rgba(255,255,255,0.07)",
  background = "#08090c",
  trail = 1.2,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgGridScanProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decay = Math.max(0.1, trail);

    let w = 0;
    let h = 0;
    let cell = 28;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let heat = new Float32Array(0);
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let lx = 0;
    let ly = 0;
    let placed = false;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.38 * Math.sin(tt * 0.53 + 0.4) * Math.cos(tt * 0.21));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.36 * Math.sin(tt * 0.81 + 1.1));
    }

    function layout() {
      cell = Math.max(10, cellSize);
      while ((w / cell) * (h / cell) > 9000) cell *= 1.2;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      ox = ((w % cell) - cell) / 2;
      oy = ((h % cell) - cell) / 2;
      heat = new Float32Array(cols * rows);
    }

    function mark(x: number, y: number, v: number) {
      const c = Math.floor((x - ox) / cell);
      const r = Math.floor((y - oy) / cell);
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;
      const i = r * cols + c;
      if (heat[i] < v) heat[i] = v;
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        lx = px;
        ly = py;
        placed = true;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 18 : 4));
      px += (gx - px) * k;
      py += (gy - py) * k;
      const dist = Math.hypot(px - lx, py - ly);
      const steps = Math.max(1, Math.ceil(dist / (cell * 0.5)));
      for (let s = 1; s <= steps; s++) {
        mark(lx + ((px - lx) * s) / steps, ly + ((py - ly) * s) / steps, 1);
      }
      lx = px;
      ly = py;
    }

    function scanPos() {
      const sy = (((t * 0.16) % 1) + 1) % 1;
      const sx = (((t * 0.11 + 0.37) % 1) + 1) % 1;
      return [sx * (w + 80) - 40, sy * (h + 80) - 40];
    }

    function draw(dt: number) {
      if (!w || !h) return;
      const fall = Math.exp(-dt / decay);
      for (let i = 0; i < heat.length; i++) heat[i] *= fall;
      const [scx, scy] = scanPos();
      if (dt > 0) mark(scx, scy, 0.55);

      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);

      ctx!.fillStyle = accent;
      for (let r = 0; r < rows; r++) {
        const y = oy + r * cell;
        const rowLit = Math.max(0, 1 - Math.abs(y + cell / 2 - scy) / (cell * 1.2));
        for (let c = 0; c < cols; c++) {
          const x = ox + c * cell;
          const colLit = Math.max(0, 1 - Math.abs(x + cell / 2 - scx) / (cell * 1.2));
          const v = heat[r * cols + c];
          const a = v * 0.55 + (rowLit + colLit) * 0.05;
          if (a < 0.01) continue;
          ctx!.globalAlpha = Math.min(1, a);
          ctx!.fillRect(x + 1, y + 1, cell - 1, cell - 1);
        }
      }

      ctx!.globalAlpha = 1;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(ox + c * cell) + 0.5;
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
      }
      for (let r = 0; r <= rows; r++) {
        const y = Math.round(oy + r * cell) + 0.5;
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
      }
      ctx!.stroke();

      ctx!.strokeStyle = accent;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = heat[r * cols + c];
          if (v < 0.25) continue;
          ctx!.globalAlpha = Math.min(1, (v - 0.25) * 1.3);
          ctx!.strokeRect(Math.round(ox + c * cell) + 0.5, Math.round(oy + r * cell) + 0.5, cell, cell);
        }
      }

      ctx!.globalCompositeOperation = "lighter";
      const band = Math.max(26, cell * 1.4);
      const gh = ctx!.createLinearGradient(0, scy - band, 0, scy + band);
      gh.addColorStop(0, "rgba(0,0,0,0)");
      gh.addColorStop(0.5, accent);
      gh.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.16;
      ctx!.fillStyle = gh;
      ctx!.fillRect(0, scy - band, w, band * 2);
      const gv = ctx!.createLinearGradient(scx - band, 0, scx + band, 0);
      gv.addColorStop(0, "rgba(0,0,0,0)");
      gv.addColorStop(0.5, accent);
      gv.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = gv;
      ctx!.fillRect(scx - band, 0, band * 2, h);

      ctx!.globalAlpha = 0.9;
      ctx!.fillStyle = accent;
      ctx!.fillRect(0, scy - 0.75, w, 1.5);
      ctx!.fillRect(scx - 0.75, 0, 1.5, h);
      ctx!.globalAlpha = 0.7;
      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, scy - 0.25, w, 0.5);
      ctx!.fillRect(scx - 0.25, 0, 0.5, h);

      const cross = ctx!.createRadialGradient(scx, scy, 0, scx, scy, band * 1.6);
      cross.addColorStop(0, "#ffffff");
      cross.addColorStop(0.25, accent);
      cross.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.55;
      ctx!.fillStyle = cross;
      ctx!.fillRect(scx - band * 1.6, scy - band * 1.6, band * 3.2, band * 3.2);

      const pr = cell * 2.2;
      const pg = ctx!.createRadialGradient(px, py, 0, px, py, pr);
      pg.addColorStop(0, accent);
      pg.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.35;
      ctx!.fillStyle = pg;
      ctx!.fillRect(px - pr, py - pr, pr * 2, pr * 2);

      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function still() {
      inside = false;
      placed = false;
      heat.fill(0);
      for (let i = 0; i < 24; i++) {
        t = 3 - i * 0.04;
        const x = idleX(t);
        const y = idleY(t);
        mark(x, y, 1 - i / 24);
      }
      t = 3;
      track(0);
      draw(0);
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
      layout();
      if (motion.matches) still();
      else {
        track(0);
        draw(0);
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      draw(dt);
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
  }, [cellSize, accent, color, background, trail, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp4 ${className}`} style={style} {...rest}>
      <style href="hb-bg-grid-scan" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp4-c" aria-hidden="true" />
      {children ? <div className="hb-qp4-in">{children}</div> : null}
    </div>
  );
}

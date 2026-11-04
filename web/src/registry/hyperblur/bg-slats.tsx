"use client";

import * as React from "react";

export interface BgSlatsProps extends React.HTMLAttributes<HTMLDivElement> {
  slatWidth?: number;
  gap?: number;
  color?: string;
  accent?: string;
  amplitude?: number;
  skew?: number;
  radius?: number;
  fade?: number;
  speed?: number;
}

const css = `
.hb-qo2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo2-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo2-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

export function BgSlats({
  slatWidth = 6,
  gap = 4,
  color = "#ffffff",
  accent = "#2f7bff",
  amplitude = 0.75,
  skew = 12,
  radius = 90,
  fade = 0.22,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgSlatsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !context) return;
    const g = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sw = Math.max(2, slatWidth);
    const pitch = sw + Math.max(0, gap);
    const R = Math.max(20, radius);
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let hover = 0;
    let placed = false;
    let count = 0;
    let start = 0;
    let mask: CanvasGradient | null = null;

    const idleX = (tt: number) => w * (0.5 + 0.42 * Math.sin(tt * 0.45 + 0.4));
    const idleY = (tt: number) => h * (0.5 + 0.2 * Math.sin(tt * 0.7));

    const track = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
      } else {
        const e = 1 - Math.exp(-dt * (inside ? 8 : 2));
        px += (gx - px) * e;
        py += (gy - py) * e;
      }
      hover += ((inside ? 1 : 0) - hover) * Math.min(1, dt * 4);
    };

    const layout = () => {
      count = Math.floor((w + gap) / pitch) + 2;
      start = (w - (count - 1) * pitch) / 2;
      const f = Math.min(0.49, Math.max(0, fade));
      mask = g.createLinearGradient(0, 0, 0, h);
      mask.addColorStop(0, "rgba(0,0,0,0)");
      mask.addColorStop(f, "rgba(0,0,0,1)");
      mask.addColorStop(1 - f, "rgba(0,0,0,1)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
    };

    const draw = () => {
      if (!w || !h) return;
      g.globalCompositeOperation = "source-over";
      g.clearRect(0, 0, w, h);
      const crest = 0.75 + 0.25 * hover;
      const lift = 0.5 + 0.5 * Math.sin(t * 0.4);
      const yBias = (py / h - 0.5) * 2;
      for (let i = 0; i < count; i++) {
        const cx = start + i * pitch;
        const d = (cx - px) / R;
        const c = Math.exp(-d * d) * crest;
        const wave = Math.sin(i * 0.32 - t * 1.8) * (0.6 + 0.4 * Math.sin(t * 0.4 + i * 0.05));
        const theta = amplitude * wave + c * 0.9 * (d < 0 ? -1 : 1) * Math.min(1, Math.abs(d) * 3);
        const width = sw * (0.28 + 0.72 * Math.abs(Math.cos(theta)));
        const shift = Math.sin(theta) * skew;
        const light = 0.5 + 0.5 * Math.sin(theta * 1.6 + 0.5 + lift * 0.3);
        const tilt = yBias * c * skew * 0.6;
        const x0 = cx - width / 2;
        g.beginPath();
        g.moveTo(x0 + shift + tilt, 0);
        g.lineTo(x0 + width + shift + tilt, 0);
        g.lineTo(x0 + width - shift - tilt, h);
        g.lineTo(x0 - shift - tilt, h);
        g.closePath();
        g.fillStyle = color;
        g.globalAlpha = 0.04 + 0.16 * light;
        g.fill();
        if (c > 0.03) {
          g.fillStyle = accent;
          g.globalAlpha = Math.min(1, c * (0.55 + 0.45 * light));
          g.fill();
        }
        g.beginPath();
        const edge = theta > 0 ? x0 + width : x0;
        g.moveTo(edge + shift + tilt, 0);
        g.lineTo(edge - shift - tilt, h);
        g.strokeStyle = c > 0.2 ? accent : color;
        g.globalAlpha = 0.05 + 0.3 * light * (0.4 + c);
        g.lineWidth = 1;
        g.stroke();
      }
      g.globalAlpha = 1;
      if (mask) {
        g.globalCompositeOperation = "destination-in";
        g.fillStyle = mask;
        g.fillRect(0, 0, w, h);
        g.globalCompositeOperation = "source-over";
      }
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
      t = 1.7;
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
  }, [slatWidth, gap, color, accent, amplitude, skew, radius, fade, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo2 ${className}`} style={style} {...rest}>
      <style href="hb-bg-slats" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo2-c" aria-hidden="true" />
      {children != null && <div className="hb-qo2-in">{children}</div>}
    </div>
  );
}

"use client";

import * as React from "react";

export interface CursorGhostProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
  opacity?: number;
  stiffness?: number;
  damping?: number;
  trail?: number;
  idle?: boolean;
}

const css = `
.hb-qi2 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi2 *, .hb-qi2 *::before, .hb-qi2 *::after { box-sizing: border-box; }
.hb-qi2-content { position: relative; z-index: 1; width: 100%; height: 100%; }
.hb-qi2-canvas { position: absolute; inset: 0; z-index: 2; display: block; width: 100%; height: 100%; pointer-events: none; }
`;

interface Pose {
  x: number;
  y: number;
  angle: number;
  lean: number;
}

export function CursorGhost({
  color = "#e8ecff",
  size = 56,
  opacity = 0.62,
  stiffness = 60,
  damping = 9,
  trail = 6,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorGhostProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = Math.max(0, Math.min(16, Math.floor(trail)));
    const history: Pose[] = [];
    let w = 0;
    let h = 0;
    let px = 0;
    let py = 0;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let since = 0;
    let visible = true;
    let placed = false;

    const shape = (pose: Pose, alpha: number, eyes: boolean) => {
      const s = size;
      const r = s * 0.42;
      const top = -s * 0.5;
      const headY = top + r;
      const bottom = s * 0.5;
      const lean = pose.lean;
      ctx.save();
      ctx.translate(pose.x, pose.y + Math.sin(t * 2.2) * s * 0.05);
      ctx.rotate(pose.angle);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(-r, headY);
      ctx.arc(0, headY, r, Math.PI, 0);
      ctx.quadraticCurveTo(r + lean * 0.3, (headY + bottom) / 2, r + lean, bottom);
      for (let k = 0; k < 3; k++) {
        const xa = r - ((2 * r) / 3) * k + lean;
        const xb = r - ((2 * r) / 3) * (k + 1) + lean;
        const drop = s * 0.13 * (1 + 0.35 * Math.sin(t * 5 + k * 2.1));
        ctx.quadraticCurveTo((xa + xb) / 2, bottom + drop, xb, bottom);
      }
      ctx.quadraticCurveTo(-r + lean * 0.3, (headY + bottom) / 2, -r, headY);
      ctx.closePath();
      ctx.fill();
      if (eyes) {
        const sp = Math.hypot(vx, vy);
        const lx = sp > 1 ? (vx / sp) * r * 0.12 : 0;
        const ly = sp > 1 ? (vy / sp) * r * 0.1 : 0;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = Math.min(1, alpha + 0.2);
        ctx.fillStyle = "#0a0a0a";
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(side * r * 0.36 + lx, headY + r * 0.05 + ly, r * 0.14, r * 0.2, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (let i = 0; i < history.length; i++) {
        shape(history[i], opacity * 0.2 * ((i + 1) / (history.length + 1)), false);
      }
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 0.45;
      ctx.fillStyle = color;
      const pose = {
        x,
        y,
        angle: Math.max(-0.35, Math.min(0.35, vx * 0.0011)),
        lean: Math.max(-size * 0.3, Math.min(size * 0.3, -vx * 0.04)),
      };
      shape(pose, opacity, true);
      ctx.shadowBlur = 0;
      return pose;
    };

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 3));
      const ix = idle ? w * (0.5 + 0.32 * Math.sin(t * 0.47) + 0.06 * Math.sin(t * 1.6)) : px;
      const iy = idle ? h * (0.5 + 0.26 * Math.sin(t * 0.71 + 1.1)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      vx += ((tx - x) * stiffness - vx * damping) * dt;
      vy += ((ty - y) * stiffness - vy * damping) * dt;
      x += vx * dt;
      y += vy * dt;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.04, Math.max(0.001, (now - last) / 1000));
      last = now;
      step(dt);
      const pose = draw();
      since += dt;
      if (since > 0.05 && count) {
        since = 0;
        history.push(pose);
        if (history.length > count) history.shift();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced || !visible || !w) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const nw = root.clientWidth;
      const nh = root.clientHeight;
      if (!nw || !nh) return;
      w = nw;
      h = nh;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!placed) {
        placed = true;
        px = w / 2;
        py = h / 2;
        x = idle ? w * 0.5 : px;
        y = idle ? h * (0.5 + 0.26 * Math.sin(1.1)) : py;
      }
      if (reduced) {
        x = w * 0.5;
        y = h * 0.5;
        vx = 0;
        vy = 0;
        draw();
      } else {
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("pointerup", onUp);
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [color, size, opacity, stiffness, damping, trail, idle]);

  return (
    <div ref={rootRef} className={`hb-qi2 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-ghost" precedence="default">{css}</style>
      <div className="hb-qi2-content">{children}</div>
      <canvas ref={canvasRef} className="hb-qi2-canvas" aria-hidden="true" />
    </div>
  );
}

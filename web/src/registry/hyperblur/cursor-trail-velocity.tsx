"use client";

import * as React from "react";

export interface CursorTrailVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  slowHue?: number;
  fastHue?: number;
  size?: number;
  life?: number;
  maxSpeed?: number;
  idle?: boolean;
}

const css = `
.hb-zb4 {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 120px;
  overflow: hidden;
  box-sizing: border-box;
  font-family: inherit;
  touch-action: pan-y;
}
.hb-zb4-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-zb4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: none; }
.hb-zb4-in > * { pointer-events: auto; }
`;

interface Dot {
  x: number;
  y: number;
  r: number;
  hue: number;
  s: number;
  born: number;
  life: number;
  joined: boolean;
}

const CAP = 720;

function smooth(a: number, b: number, v: number) {
  const k = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return k * k * (3 - 2 * k);
}

export function CursorTrailVelocity({
  slowHue = 200,
  fastHue = 330,
  size = 5,
  life = 650,
  maxSpeed = 1400,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorTrailVelocityProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const TAU = Math.PI * 2;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let t = 0;
    let phase = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;
    let pointerOn = false;
    let tx = 0;
    let ty = 0;
    let lx = 0;
    let ly = 0;
    let ex = 0;
    let ey = 0;
    let hasLast = false;
    let speed = 0;
    let headX = 0;
    let headY = 0;
    let headOn = false;

    const idlePoint = () => {
      const x = w * 0.5 + w * 0.38 * Math.sin(phase + 0.5);
      const y = h * 0.5 + h * 0.32 * Math.sin(phase * 1.7);
      return [x, y];
    };

    const step = (dt: number) => {
      t += dt * 1000;
      let x = 0;
      let y = 0;
      let live = false;
      if (pointerOn) {
        x = tx;
        y = ty;
        live = true;
      } else if (idle) {
        const wave = Math.sin(t * 0.00045 + 0.4);
        phase += dt * (0.8 + 6 * wave * wave * wave * wave);
        const p = idlePoint();
        x = p[0];
        y = p[1];
        live = true;
      }
      headOn = live;
      if (live) {
        headX = x;
        headY = y;
        if (!hasLast) {
          lx = x;
          ly = y;
          ex = x;
          ey = y;
          hasLast = true;
          speed = 0;
          dots.push({ x, y, r: size * 0.6, hue: slowHue, s: 0, born: t, life, joined: false });
        } else {
          const raw = Math.hypot(x - lx, y - ly) / Math.max(dt, 0.001);
          speed += (raw - speed) * 0.22;
          lx = x;
          ly = y;
          const sn = Math.min(1, speed / Math.max(1, maxSpeed));
          const gap = 11 - 8 * sn;
          let guard = 0;
          let dx = x - ex;
          let dy = y - ey;
          let d = Math.hypot(dx, dy);
          while (d >= gap && guard < 160) {
            ex += (dx / d) * gap;
            ey += (dy / d) * gap;
            dots.push({
              x: ex,
              y: ey,
              r: size * 0.6 * (1 - 0.7 * sn),
              hue: slowHue + (fastHue - slowHue) * Math.pow(sn, 0.8),
              s: sn,
              born: t,
              life: life * (0.5 + 1.5 * sn),
              joined: sn > 0.22,
            });
            dx = x - ex;
            dy = y - ey;
            d = Math.hypot(dx, dy);
            guard++;
          }
        }
      } else {
        hasLast = false;
      }
      if (dots.length > CAP) dots = dots.slice(dots.length - CAP);
      dots = dots.filter((p) => t - p.born < p.life);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        const f = Math.max(0, 1 - (t - p.born) / p.life);
        const e = Math.pow(f, 1.4);
        if (p.joined && i > 0) {
          const q = dots[i - 1];
          if (Math.hypot(q.x - p.x, q.y - p.y) < 60) {
            const a = smooth(0.22, 0.7, p.s) * e;
            ctx.strokeStyle = `hsla(${p.hue.toFixed(1)}, 100%, 66%, ${a.toFixed(3)})`;
            ctx.lineWidth = Math.max(0.7, size * 0.3 * (1.25 - p.s)) * (0.4 + 0.6 * f);
            ctx.beginPath();
            ctx.moveTo(q.x, q.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
        const da = (1 - 0.55 * p.s) * e;
        ctx.fillStyle = `hsla(${p.hue.toFixed(1)}, 100%, 64%, ${da.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, p.r * (0.35 + 0.65 * f)), 0, TAU);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (headOn) {
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.beginPath();
        ctx.arc(headX, headY, Math.max(1.4, size * 0.34), 0, TAU);
        ctx.fill();
      }
    };

    const still = () => {
      dots = [];
      t = 0;
      phase = 0;
      hasLast = false;
      if (idle) {
        for (let k = 0; k < 150; k++) step(1 / 60);
      }
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || motion.matches || !visible) return;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const nw = root.clientWidth;
      const nh = root.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
    };

    const move = (ev: Event) => {
      const e = ev as PointerEvent;
      if (motion.matches) return;
      const r = root.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!pointerOn) {
        pointerOn = true;
        hasLast = false;
      }
    };

    const leave = () => {
      if (!pointerOn) return;
      pointerOn = false;
      hasLast = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerdown", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    const onMotion = () => {
      if (motion.matches) {
        stop();
        still();
      } else {
        dots = [];
        hasLast = false;
        start();
      }
    };
    motion.addEventListener("change", onMotion);
    resize();
    if (!motion.matches) start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      motion.removeEventListener("change", onMotion);
    };
  }, [slowHue, fastHue, size, life, maxSpeed, idle]);

  return (
    <div ref={rootRef} className={`hb-zb4 ${className}`.trim()} style={style} {...rest}>
      <style href="hb-cursor-trail-velocity" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-zb4-c" aria-hidden="true" />
      {children ? <div className="hb-zb4-in">{children}</div> : null}
    </div>
  );
}

"use client";

import * as React from "react";

export interface BgRippleWaterProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  color?: string;
  speed?: number;
  interval?: number;
  maxRipples?: number;
  seed?: number;
}

const css = `
.hb-qj4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj4-c { display: block; width: 100%; height: 100%; }
`;

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

interface Drop {
  x: number;
  y: number;
  age: number;
  amp: number;
  phase: number;
}

export function BgRippleWater({
  background = "#061122",
  color = "#9cc4ff",
  speed = 1,
  interval = 1.4,
  maxRipples = 26,
  seed = 3,
  className = "",
  style,
  ...rest
}: BgRippleWaterProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const TAU = Math.PI * 2;
    const life = 3.4;
    const velocity = 70;
    const cap = Math.max(4, Math.min(80, Math.floor(maxRipples)));
    const every = Math.max(0.3, interval);
    let w = 0;
    let h = 0;
    let t = 0;
    let drops: Drop[] = [];
    let inside = false;
    let lastX = -999;
    let lastY = -999;
    let lastT = -1;
    let idleClock = 0;
    let idleCount = 0;
    let dropCount = 0;
    let shade: CanvasGradient | null = null;

    function add(x: number, y: number, amp: number, age = 0) {
      dropCount++;
      drops.push({ x, y, age, amp, phase: rnd(seed, dropCount) * TAU });
      if (drops.length > cap) drops.splice(0, drops.length - cap);
    }

    function idleDrop(age = 0) {
      idleCount++;
      const x = w * (0.12 + 0.76 * rnd(seed, idleCount * 2 + 101));
      const y = h * (0.14 + 0.72 * rnd(seed, idleCount * 2 + 102));
      add(x, y, 0.75 + 0.25 * rnd(seed, idleCount + 303), age);
    }

    function seedDrops() {
      drops = [];
      idleCount = 0;
      dropCount = 0;
      idleDrop(2.2);
      idleDrop(1.3);
      idleDrop(0.4);
      idleClock = 0;
    }

    function step(dt: number) {
      const adv = dt * speed;
      for (const d of drops) d.age += adv;
      drops = drops.filter((d) => d.age < life);
      if (!inside) {
        idleClock += adv;
        if (idleClock >= every) {
          idleClock = 0;
          idleDrop();
        }
      }
    }

    function ring(x: number, y: number, r: number, wob: number, ph: number) {
      if (!ctx) return;
      ctx.beginPath();
      const seg = Math.max(28, Math.min(96, Math.round(r / 3)));
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * TAU;
        const rr = r + Math.sin(a * 6 + ph) * wob + Math.sin(a * 11 - ph * 1.7) * wob * 0.5;
        const X = x + Math.cos(a) * rr;
        const Y = y + Math.sin(a) * rr * 0.92;
        if (i === 0) ctx.moveTo(X, Y);
        else ctx.lineTo(X, Y);
      }
      ctx.closePath();
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      if (shade) {
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, w, h);
      }
      for (const d of drops) {
        if (d.age < 0) continue;
        const p = d.age / life;
        const fade = Math.pow(1 - p, 1.6) * d.amp;
        const front = d.age * velocity;
        const wob = 1.8 * (1 - p) * d.amp;
        const ph = d.phase + d.age * 3;
        const glow = ctx.createRadialGradient(d.x, d.y, Math.max(0, front - 26), d.x, d.y, front + 8);
        glow.addColorStop(0, "rgba(0,0,0,0)");
        glow.addColorStop(0.78, color);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = fade * 0.1;
        ctx.fillStyle = glow;
        ctx.fillRect(d.x - front - 10, d.y - front - 10, (front + 10) * 2, (front + 10) * 2);
        for (let j = 0; j < 3; j++) {
          const r = front - j * 15;
          if (r <= 2) continue;
          const a = fade * (1 - j * 0.3);
          ctx.globalAlpha = a * 0.55;
          ctx.strokeStyle = "rgba(0,0,0,0.9)";
          ctx.lineWidth = 2;
          ctx.save();
          ctx.translate(1, 1.6);
          ring(d.x, d.y, r, wob, ph + j);
          ctx.stroke();
          ctx.restore();
          ctx.globalAlpha = a * 0.85;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.3 - j * 0.25;
          ring(d.x, d.y, r, wob, ph + j);
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
      const first = !w;
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      shade = ctx.createLinearGradient(0, 0, 0, h);
      shade.addColorStop(0, "rgba(255,255,255,0.05)");
      shade.addColorStop(0.5, "rgba(255,255,255,0)");
      shade.addColorStop(1, "rgba(0,0,0,0.3)");
      if (first || motion.matches) seedDrops();
      draw();
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt;
      step(dt);
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
      if (motion.matches) {
        seedDrops();
        draw();
      }
    }

    function point(e: PointerEvent) {
      if (!host) return [0, 0];
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      return [(e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy];
    }

    function move(e: PointerEvent) {
      if (motion.matches) return;
      inside = true;
      const [x, y] = point(e);
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy > 1600 && t - lastT > 0.09) {
        add(x, y, 0.5);
        lastX = x;
        lastY = y;
        lastT = t;
      }
    }

    function down(e: PointerEvent) {
      if (motion.matches) return;
      inside = true;
      const [x, y] = point(e);
      add(x, y, 1);
      lastX = x;
      lastY = y;
      lastT = t;
    }

    function leave(e: PointerEvent) {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
      idleClock = every * 0.5;
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
    host.addEventListener("pointerdown", down, { passive: true });
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
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [background, color, speed, interval, maxRipples, seed]);

  return (
    <div ref={wrapRef} className={`hb-qj4 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-ripple-water" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj4-c" />
    </div>
  );
}

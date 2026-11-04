"use client";

import * as React from "react";

export interface BgLayeredWavesProps extends React.HTMLAttributes<HTMLDivElement> {
  layers?: number;
  accent?: string;
  accentTo?: string;
  amplitude?: number;
  lift?: number;
  crest?: boolean;
  speed?: number;
}

const css = `
.hb-qq4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qq4-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qq4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function qq4Rgb(color: string, fallback: [number, number, number]): [number, number, number] {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return fallback;
  let s = m[1];
  if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  const v = parseInt(s, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function BgLayeredWaves({
  layers = 5,
  accent = "#2f7bff",
  accentTo = "#a855f7",
  amplitude = 14,
  lift = 34,
  crest = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgLayeredWavesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const n = Math.max(2, Math.min(9, Math.round(layers)));
    const a0 = qq4Rgb(accent, [47, 123, 255]);
    const a1 = qq4Rgb(accentTo, [168, 85, 247]);
    const tones: string[] = [];
    for (let i = 0; i < n; i++) {
      const f = n === 1 ? 0 : i / (n - 1);
      const r = Math.round(a1[0] + (a0[0] - a1[0]) * f);
      const g = Math.round(a1[1] + (a0[1] - a1[1]) * f);
      const b = Math.round(a1[2] + (a0[2] - a1[2]) * f);
      tones.push(`${r},${g},${b}`);
    }
    const mod = new Float32Array(n);

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
      return w * (0.5 + 0.4 * Math.sin(tt * 0.29 + 0.8));
    }
    function idleY(tt: number) {
      return h * (0.58 + 0.24 * Math.sin(tt * 0.19 + 2.4));
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
      const k = 1 - Math.exp(-dt * (inside ? 8 : 2));
      px += (gx - px) * k;
      py += (gy - py) * k;
      act += ((inside ? 1 : 0) - act) * (1 - Math.exp(-dt * 3));
    }

    function baseY(i: number) {
      return h * (0.3 + (0.62 * (i + 0.5)) / n);
    }

    function wave(i: number, x: number) {
      const depth = (i + 1) / n;
      const a = amplitude * (0.55 + depth * 0.8);
      const k = (0.011 - depth * 0.004) * (1 + (i % 2) * 0.25);
      const s = 0.35 + depth * 0.45;
      return (
        baseY(i) +
        a * Math.sin(x * k + t * s + i * 1.7) * 0.65 +
        a * 0.4 * Math.sin(x * k * 2.3 - t * s * 0.8 + i * 0.9) +
        a * 0.25 * Math.sin(x * k * 0.45 + t * 0.3 + i)
      );
    }

    function draw(dt: number) {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      let near = 0;
      let best = Infinity;
      for (let i = 0; i < n; i++) {
        const d = Math.abs(wave(i, px) - py);
        if (d < best) {
          best = d;
          near = i;
        }
      }
      const ease = dt > 0 ? 1 - Math.exp(-dt * 4) : 1;
      for (let i = 0; i < n; i++) {
        const target = i === near ? 0.45 + 0.55 * act : 0;
        mod[i] += (target - mod[i]) * ease;
      }
      const step = Math.max(4, w / 120);
      const sigma = Math.max(50, w * 0.16);
      const s2 = 2 * sigma * sigma;
      const breathe = 1 + 0.18 * Math.sin(t * 2.2);
      for (let i = 0; i < n; i++) {
        const depth = (i + 1) / n;
        const tone = tones[i];
        const m = mod[i];
        const reach = Math.max(-lift * 1.6, Math.min(lift * 0.6, py - baseY(i)));
        const bump = (reach - lift * 0.55) * m * breathe;
        ctx.beginPath();
        let minY = h;
        const ys: number[] = [];
        for (let x = -step; x <= w + step; x += step) {
          const dx = x - px;
          const y = wave(i, x) + bump * Math.exp(-(dx * dx) / s2);
          ys.push(y);
          if (y < minY) minY = y;
        }
        let xi = -step;
        for (let p = 0; p < ys.length; p++) {
          if (p === 0) ctx.moveTo(xi, ys[p]);
          else ctx.lineTo(xi, ys[p]);
          xi += step;
        }
        ctx.lineTo(w + step, h + 2);
        ctx.lineTo(-step, h + 2);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, minY, 0, h);
        g.addColorStop(0, `rgba(${tone},${(0.22 + depth * 0.4 + m * 0.12).toFixed(3)})`);
        g.addColorStop(0.55, `rgba(${tone},${(0.06 + depth * 0.14).toFixed(3)})`);
        g.addColorStop(1, `rgba(6,7,12,${(0.25 + depth * 0.55).toFixed(3)})`);
        ctx.fillStyle = g;
        ctx.fill();
        if (crest) {
          ctx.beginPath();
          xi = -step;
          for (let p = 0; p < ys.length; p++) {
            if (p === 0) ctx.moveTo(xi, ys[p]);
            else ctx.lineTo(xi, ys[p]);
            xi += step;
          }
          ctx.strokeStyle = `rgba(255,255,255,${(0.08 + depth * 0.14 + m * 0.25).toFixed(3)})`;
          ctx.lineWidth = 1 + m * 0.6;
          ctx.stroke();
        }
      }
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
        draw(0);
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 1.2;
      inside = false;
      placed = false;
      act = 0;
      mod.fill(0);
      track(0);
      draw(0);
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
  }, [layers, accent, accentTo, amplitude, lift, crest, speed]);

  return (
    <div ref={wrapRef} className={`hb-qq4 ${className}`} style={style} {...rest}>
      <style href="hb-bg-layered-waves" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qq4-c" aria-hidden="true" />
      {children ? <div className="hb-qq4-in">{children}</div> : null}
    </div>
  );
}

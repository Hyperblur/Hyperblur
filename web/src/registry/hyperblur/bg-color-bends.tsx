"use client";

import * as React from "react";

export interface BgColorBendsProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  bands?: number;
  thickness?: number;
  warp?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp5-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp5-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const defaultColors = ["#ff2e88", "#ff7a1a", "#ffd60a", "#21e6a5", "#1f8bff", "#8b3dff"];

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function BgColorBends({
  colors = defaultColors,
  background = "#07070a",
  bands = 6,
  thickness = 1,
  warp = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgColorBendsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorKey = (colors.length ? colors : defaultColors).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = colorKey.split("|");
    const B = Math.max(1, Math.min(14, Math.round(bands)));
    const SEG = 56;
    const cxs = new Float32Array(SEG + 1);
    const cys = new Float32Array(SEG + 1);
    const tws = new Float32Array(SEG + 1);
    const ex = new Float32Array((SEG + 1) * 2);
    const ey = new Float32Array((SEG + 1) * 2);

    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let pull = 0;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.34 * Math.sin(tt * 0.27 + 0.8));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.28 * Math.sin(tt * 0.43 + 2.2));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        placed = true;
        pull = inside ? 1 : 0.6;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 4.5 : 1.5));
      px += (gx - px) * k;
      py += (gy - py) * k;
      pull += ((inside ? 1 : 0.6) - pull) * Math.min(1, dt * 2.5);
    }

    function draw() {
      if (!w || !h) return;
      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);

      const span = w + 160;
      const rad = Math.max(w, h) * 0.32;
      const rad2 = rad * rad;
      const strength = 1.5 * warp * pull;
      const baseHalf = (h / (B + 1)) * 0.42 * thickness;

      for (let b = 0; b < B; b++) {
        const seed = b * 11 + 5;
        const base = h * ((b + 1) / (B + 1)) + (rnd(seed) - 0.5) * h * 0.06;
        const amp = h * (0.08 + 0.08 * rnd(seed + 1));
        const fq = (1.2 + 1.4 * rnd(seed + 2)) / span;
        const ph = rnd(seed + 3) * 6.28;
        const tf = 0.25 + 0.35 * rnd(seed + 4);
        const twf = (2 + 3 * rnd(seed + 5)) / span;
        const sp = (b % 2 === 0 ? 1 : -1) * (0.3 + 0.4 * rnd(seed + 6));

        for (let i = 0; i <= SEG; i++) {
          const x = -80 + (span * i) / SEG;
          let y =
            base +
            Math.sin(x * fq * 6.283 + t * tf + ph) * amp +
            Math.sin(x * fq * 14.1 - t * tf * 1.3 + ph * 2) * amp * 0.3;
          const dx = x - px;
          const dy = y - py;
          const g = Math.exp(-(dx * dx + dy * dy) / rad2);
          const ang = g * strength * (b % 2 === 0 ? 1 : -1);
          const ca = Math.cos(ang);
          const sa = Math.sin(ang);
          const rx = px + dx * ca - dy * sa;
          y = py + dx * sa + dy * ca;
          cxs[i] = rx;
          cys[i] = y;
          tws[i] = Math.cos(x * twf * 6.283 + t * sp + ph + g * 3 * warp);
        }

        for (let i = 0; i <= SEG; i++) {
          const a = i > 0 ? i - 1 : i;
          const c = i < SEG ? i + 1 : i;
          let nx = -(cys[c] - cys[a]);
          let ny = cxs[c] - cxs[a];
          const l = Math.hypot(nx, ny) || 1;
          nx /= l;
          ny /= l;
          const half = baseHalf * (0.18 + 0.82 * Math.abs(tws[i]));
          ex[i * 2] = cxs[i] + nx * half;
          ey[i * 2] = cys[i] + ny * half;
          ex[i * 2 + 1] = cxs[i] - nx * half;
          ey[i * 2 + 1] = cys[i] - ny * half;
        }

        const c0 = palette[b % palette.length];
        const c1 = palette[(b + 1) % palette.length];
        const c2 = palette[(b + 2) % palette.length];
        const grad = ctx!.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, c0);
        grad.addColorStop(0.55, c1);
        grad.addColorStop(1, c2);

        ctx!.globalAlpha = 0.92;
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.moveTo(ex[0], ey[0]);
        for (let i = 1; i <= SEG; i++) ctx!.lineTo(ex[i * 2], ey[i * 2]);
        for (let i = SEG; i >= 0; i--) ctx!.lineTo(ex[i * 2 + 1], ey[i * 2 + 1]);
        ctx!.closePath();
        ctx!.fill();

        const shadeGrad = ctx!.createLinearGradient(-80, 0, w + 80, 0);
        const shineGrad = ctx!.createLinearGradient(-80, 0, w + 80, 0);
        let last = 0;
        for (let i = 0; i <= SEG; i++) {
          const m = tws[i];
          const am = Math.abs(m);
          const shade = Math.min(0.72, (1 - am) * 0.62 + (m < 0 ? 0.12 : 0));
          const shine = am > 0.86 ? Math.min(0.32, (am - 0.86) * 2.2) : 0;
          last = Math.max(last, Math.min(1, Math.max(0, (cxs[i] + 80) / (w + 160))));
          shadeGrad.addColorStop(last, `rgba(0,0,0,${shade.toFixed(3)})`);
          shineGrad.addColorStop(last, `rgba(255,255,255,${shine.toFixed(3)})`);
        }
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = shadeGrad;
        ctx!.fill();
        ctx!.fillStyle = shineGrad;
        ctx!.fill();
      }

      const vg = ctx!.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, background);
      ctx!.globalAlpha = 0.85;
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalAlpha = 1;
    }

    function still() {
      t = 5;
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
  }, [colorKey, background, bands, thickness, warp, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp5 ${className}`} style={style} {...rest}>
      <style href="hb-bg-color-bends" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp5-c" aria-hidden="true" />
      {children ? <div className="hb-qp5-in">{children}</div> : null}
    </div>
  );
}

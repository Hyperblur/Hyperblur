"use client";

import * as React from "react";

export interface BgFerrofluidProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  background?: string;
  spikes?: number;
  size?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp1-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp1-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function BgFerrofluid({
  accent = "#2f7bff",
  background = "#060709",
  spikes = 12,
  size = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgFerrofluidProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !octx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const [ar, ag, ab] = rgbOf(accent, [47, 123, 255]);
    const [br, bg, bb] = rgbOf(background, [6, 7, 9]);
    const N = Math.max(3, Math.min(24, Math.round(spikes)));
    const POOL = 7;
    const total = POOL + 1;
    const bx = new Float32Array(total);
    const by = new Float32Array(total);
    const brr = new Float32Array(total);
    const ax0 = new Float32Array(N);
    const ay0 = new Float32Array(N);
    const adx = new Float32Array(N);
    const ady = new Float32Array(N);
    const al2 = new Float32Array(N);
    let r0 = 1;
    let r1 = 1;
    const lx = -0.48;
    const ly = -0.62;
    const lz = 0.62;
    const hl = Math.hypot(lx, ly, lz + 1);
    const hx = lx / hl;
    const hy = ly / hl;
    const hz = (lz + 1) / hl;
    const h2l = Math.hypot(0.55, 0.5, 1.6);
    const h2x = 0.55 / h2l;
    const h2y = 0.5 / h2l;
    const h2z = 1.6 / h2l;

    let w = 0;
    let h = 0;
    let cs = 4;
    let gw = 0;
    let gh = 0;
    let field = new Float32Array(0);
    let height = new Float32Array(0);
    let img: ImageData | null = null;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let lift = 0;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.3 * Math.sin(tt * 0.31 + 1.2) + 0.06 * Math.sin(tt * 0.83));
    }
    function idleY(tt: number) {
      return h * (0.46 + 0.14 * Math.sin(tt * 0.47 + 0.4));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        placed = true;
        lift = inside ? 1 : 0.7;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 7 : 1.8));
      px += (gx - px) * k;
      py += (gy - py) * k;
      lift += ((inside ? 1 : 0.7) - lift) * Math.min(1, dt * 3);
    }

    function layout() {
      cs = Math.max(3, Math.ceil(Math.sqrt((w * h) / 16000)));
      gw = Math.max(2, Math.ceil(w / cs));
      gh = Math.max(2, Math.ceil(h / cs));
      off.width = gw;
      off.height = gh;
      field = new Float32Array(gw * gh);
      height = new Float32Array(gw * gh);
      img = octx!.createImageData(gw, gh);
    }

    function place() {
      const m = Math.min(w, h) * size;
      const reach = Math.max(w, h) * 0.38;
      let k = 0;
      for (let i = 0; i < POOL; i++) {
        let x = w * (0.08 + (0.84 * i) / (POOL - 1)) + (rnd(i * 3 + 1) - 0.5) * w * 0.08;
        let y = h * (0.92 + 0.1 * rnd(i * 3 + 2));
        x += Math.sin(t * 0.33 + i * 1.7) * w * 0.035;
        y += Math.cos(t * 0.41 + i * 2.3) * h * 0.04;
        const dx = px - x;
        const dy = py - y;
        const pull = Math.exp(-(dx * dx + dy * dy) / (reach * reach)) * 0.42 * lift;
        bx[k] = x + dx * pull;
        by[k] = y + dy * pull;
        brr[k] = m * (0.1 + 0.05 * rnd(i * 3 + 3));
        k++;
      }
      const core = m * 0.11 * (0.92 + 0.08 * Math.sin(t * 1.9));
      bx[k] = px;
      by[k] = py;
      brr[k] = core;
      r0 = m * 0.05;
      r1 = m * 0.004;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 + t * 0.22 + Math.sin(t * 0.7 + i) * 0.06;
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        const len = m * 0.2 * (0.5 + 0.5 * lift) * (0.7 + 0.3 * Math.sin(t * 2.4 + i * 2.31));
        ax0[i] = px + ca * core * 0.5;
        ay0[i] = py + sa * core * 0.5;
        adx[i] = ca * (core * 0.5 + len);
        ady[i] = sa * (core * 0.5 + len);
        al2[i] = adx[i] * adx[i] + ady[i] * ady[i] || 1;
      }
      for (let i = 0; i < total; i++) brr[i] = brr[i] * brr[i];
    }

    function draw() {
      if (!img || !w || !h) return;
      place();
      for (let j = 0; j < gh; j++) {
        const y = (j + 0.5) * cs;
        for (let i = 0; i < gw; i++) {
          const x = (i + 0.5) * cs;
          let f = 0;
          for (let b = 0; b < total; b++) {
            const dx = x - bx[b];
            const dy = y - by[b];
            f += brr[b] / (dx * dx + dy * dy + 1);
          }
          for (let a = 0; a < N; a++) {
            const qx = x - ax0[a];
            const qy = y - ay0[a];
            let u = (qx * adx[a] + qy * ady[a]) / al2[a];
            if (u < 0) u = 0;
            else if (u > 1) u = 1;
            const dx = qx - adx[a] * u;
            const dy = qy - ady[a] * u;
            const r = r0 + (r1 - r0) * u;
            f += (r * r) / (dx * dx + dy * dy + 1);
          }
          const idx = j * gw + i;
          field[idx] = f;
          height[idx] = f > 0.2 ? 1 - 0.2 / f : 0;
        }
      }
      const S = Math.min(w, h) * 0.22 * size;
      const inv = S / (2 * cs);
      const data = img.data;
      for (let j = 0; j < gh; j++) {
        const j0 = j > 0 ? j - 1 : j;
        const j1 = j < gh - 1 ? j + 1 : j;
        for (let i = 0; i < gw; i++) {
          const idx = j * gw + i;
          const f = field[idx];
          const o = idx * 4;
          const glow = f < 0.3 ? 0 : Math.min(1, (f - 0.3) / 0.7);
          const g2 = glow * glow * 0.16;
          let r = br + ar * g2;
          let g = bg + ag * g2;
          let bl = bb + ab * g2;
          if (f > 0.85) {
            const i0 = i > 0 ? i - 1 : i;
            const i1 = i < gw - 1 ? i + 1 : i;
            const nxr = -(height[j * gw + i1] - height[j * gw + i0]) * inv;
            const nyr = -(height[j1 * gw + i] - height[j0 * gw + i]) * inv;
            const nl = 1 / Math.sqrt(nxr * nxr + nyr * nyr + 1);
            const nx = nxr * nl;
            const ny = nyr * nl;
            const nz = nl;
            const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
            let s = Math.max(0, nx * hx + ny * hy + nz * hz);
            s *= s;
            s *= s;
            s *= s;
            s *= s;
            s *= s;
            s *= s;
            s *= s;
            let s2 = Math.max(0, nx * h2x + ny * h2y + nz * h2z);
            s2 *= s2;
            s2 *= s2;
            s2 *= s2;
            const fr = 1 - nz;
            const lr = 5 + diff * 10 + ar * (fr * fr * 0.85 + s2 * 0.35) + 255 * s * 0.95;
            const lg = 6 + diff * 11 + ag * (fr * fr * 0.85 + s2 * 0.35) + 255 * s * 0.95;
            const lb = 8 + diff * 13 + ab * (fr * fr * 0.85 + s2 * 0.35) + 255 * s * 0.95;
            const e = f >= 1.12 ? 1 : (f - 0.85) / 0.27;
            const a = e * e * (3 - 2 * e);
            r += (lr - r) * a;
            g += (lg - g) * a;
            bl += (lb - bl) * a;
          }
          data[o] = r > 255 ? 255 : r;
          data[o + 1] = g > 255 ? 255 : g;
          data[o + 2] = bl > 255 ? 255 : bl;
          data[o + 3] = 255;
        }
      }
      octx!.putImageData(img, 0, 0);
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";
      ctx!.drawImage(off, 0, 0, gw, gh, 0, 0, gw * cs, gh * cs);
    }

    function still() {
      t = 2.6;
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
      layout();
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
  }, [accent, background, spikes, size, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp1 ${className}`} style={style} {...rest}>
      <style href="hb-bg-ferrofluid" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp1-c" aria-hidden="true" />
      {children ? <div className="hb-qp1-in">{children}</div> : null}
    </div>
  );
}

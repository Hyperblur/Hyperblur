"use client";

import * as React from "react";

export interface BgWebThreadsProps extends React.HTMLAttributes<HTMLDivElement> {
  spokes?: number;
  rings?: number;
  color?: string;
  accent?: string;
  pluck?: number;
  damping?: number;
  breeze?: number;
  seed?: number;
  speed?: number;
}

const css = `
.hb-qo7 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo7-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo7-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function hashU(n: number, s: number) {
  let x = (Math.imul(n, 2654435761) ^ Math.imul(s + 1, 1597334677)) | 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

export function BgWebThreads({
  spokes = 14,
  rings = 8,
  color = "rgba(255,255,255,0.22)",
  accent = "#7fb3ff",
  pluck = 0.8,
  damping = 2.5,
  breeze = 1,
  seed = 4,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgWebThreadsProps) {
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

    const S = Math.max(5, Math.min(32, Math.round(spokes)));
    const K = Math.max(2, Math.min(20, Math.round(rings)));
    const s0 = Math.round(seed) | 0;
    const N = 1 + S * K;
    const stiff = 18;
    const couple = 120;
    const maxD = 28;
    const rx = new Float32Array(N);
    const ry = new Float32Array(N);
    const dx = new Float32Array(N);
    const dy = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const ax = new Float32Array(S);
    const ay = new Float32Array(S);
    const nbr: number[][] = [];
    const segs: [number, number][] = [];
    const node = (s: number, r: number) => 1 + (((s % S) + S) % S) * K + (r - 1);
    for (let i = 0; i < N; i++) nbr.push([]);
    for (let s = 0; s < S; s++) {
      nbr[0].push(node(s, 1));
      segs.push([0, node(s, 1)]);
      for (let r = 1; r <= K; r++) {
        const n = node(s, r);
        nbr[n].push(r === 1 ? 0 : node(s, r - 1));
        nbr[n].push(r === K ? -1 - s : node(s, r + 1));
        nbr[n].push(node(s - 1, r));
        nbr[n].push(node(s + 1, r));
        segs.push([n, r === K ? -1 - s : node(s, r + 1)]);
        segs.push([n, node(s + 1, r)]);
      }
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let cx = 0;
    let cy = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let p0x = 0;
    let p0y = 0;
    let fresh = true;

    const idleX = (tt: number) => w * (0.5 + 0.44 * Math.sin(tt * 0.5 + 0.3));
    const idleY = (tt: number) => h * (0.5 + 0.4 * Math.sin(tt * 0.83 + 1.1));

    const layout = () => {
      cx = w * 0.5;
      cy = h * 0.47;
      rx[0] = cx;
      ry[0] = cy;
      for (let s = 0; s < S; s++) {
        const a = (s / S) * Math.PI * 2 + (hashU(s, s0) - 0.5) * (2.4 / S);
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        let tm = Infinity;
        if (ux > 1e-6) tm = Math.min(tm, (w + 2 - cx) / ux);
        if (ux < -1e-6) tm = Math.min(tm, (-2 - cx) / ux);
        if (uy > 1e-6) tm = Math.min(tm, (h + 2 - cy) / uy);
        if (uy < -1e-6) tm = Math.min(tm, (-2 - cy) / uy);
        ax[s] = cx + ux * tm;
        ay[s] = cy + uy * tm;
        for (let r = 1; r <= K; r++) {
          const f = 0.06 + 0.84 * Math.pow(r / K, 1.15) + (hashU(s * 97 + r, s0 + 1) - 0.5) * (0.5 / K);
          const n = node(s, r);
          rx[n] = cx + ux * tm * f;
          ry[n] = cy + uy * tm * f;
        }
      }
      dx.fill(0);
      dy.fill(0);
      vx.fill(0);
      vy.fill(0);
      fresh = true;
    };

    const px = (i: number) => (i < 0 ? ax[-1 - i] : rx[i] + dx[i]);
    const py = (i: number) => (i < 0 ? ay[-1 - i] : ry[i] + dy[i]);

    const kick = (i: number, jx: number, jy: number) => {
      if (i < 0) return;
      const m = i === 0 ? 0.35 : 1;
      vx[i] += jx * m;
      vy[i] += jy * m;
    };

    const cross = (x0: number, y0: number, x1: number, y1: number, dt: number, boost: number) => {
      const mx = x1 - x0;
      const my = y1 - y0;
      if (mx * mx + my * my < 0.01 || dt <= 0) return;
      let jx = (mx / dt) * boost;
      let jy = (my / dt) * boost;
      const len = Math.hypot(jx, jy);
      if (len > 1400) {
        jx *= 1400 / len;
        jy *= 1400 / len;
      }
      jx *= pluck * 0.35;
      jy *= pluck * 0.35;
      for (let k = 0; k < segs.length; k++) {
        const [a, b] = segs[k];
        const sx0 = px(a);
        const sy0 = py(a);
        const ex = px(b) - sx0;
        const ey = py(b) - sy0;
        const den = mx * ey - my * ex;
        if (Math.abs(den) < 1e-9) continue;
        const qx = sx0 - x0;
        const qy = sy0 - y0;
        const tp = (qx * ey - qy * ex) / den;
        const u = (qx * my - qy * mx) / den;
        if (tp < 0 || tp > 1 || u < 0 || u > 1) continue;
        kick(a, jx * (1 - u), jy * (1 - u));
        kick(b, jx * u, jy * u);
      }
    };

    const simulate = (dt: number) => {
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h1 = dt / steps;
      for (let st = 0; st < steps; st++) {
        for (let i = 0; i < N; i++) {
          let sx = 0;
          let sy = 0;
          const list = nbr[i];
          for (let k = 0; k < list.length; k++) {
            const n = list[k];
            if (n >= 0) {
              sx += dx[n];
              sy += dy[n];
            }
          }
          const deg = list.length;
          const wind = breeze * 9 * Math.sin(t * 0.7 + ry[i] * 0.012 + rx[i] * 0.004);
          vx[i] += (-stiff * dx[i] - damping * vx[i] + couple * (sx - deg * dx[i]) * (i === 0 ? 0.25 : 1) + wind) * h1;
          vy[i] += (-stiff * dy[i] - damping * vy[i] + couple * (sy - deg * dy[i]) * (i === 0 ? 0.25 : 1) + wind * 0.6) * h1;
        }
        for (let i = 0; i < N; i++) {
          dx[i] = Math.max(-maxD, Math.min(maxD, dx[i] + vx[i] * h1));
          dy[i] = Math.max(-maxD, Math.min(maxD, dy[i] + vy[i] * h1));
        }
      }
    };

    const pointer = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (fresh) {
        p0x = gx;
        p0y = gy;
        fresh = false;
        return;
      }
      cross(p0x, p0y, gx, gy, dt, inside ? 1 : 6);
      p0x = gx;
      p0y = gy;
    };

    const segPath = (a: number, b: number) => {
      const x0 = px(a);
      const y0 = py(a);
      const x1 = px(b);
      const y1 = py(b);
      g.moveTo(x0, y0);
      const ringSeg = a > 0 && b > 0 && (a - 1) % K === (b - 1) % K;
      if (ringSeg) {
        const mx = (x0 + x1) / 2;
        const my = (y0 + y1) / 2;
        g.quadraticCurveTo(mx + (px(0) - mx) * 0.07, my + (py(0) - my) * 0.07, x1, y1);
      } else g.lineTo(x1, y1);
    };

    const energy = (i: number) => (i < 0 ? 0 : Math.hypot(vx[i], vy[i]));

    const draw = () => {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      g.lineCap = "round";
      g.strokeStyle = color;
      g.lineWidth = 1;
      g.beginPath();
      for (let k = 0; k < segs.length; k++) segPath(segs[k][0], segs[k][1]);
      g.stroke();
      g.strokeStyle = accent;
      for (let b = 1; b <= 4; b++) {
        let any = false;
        g.beginPath();
        for (let k = 0; k < segs.length; k++) {
          const [p, q] = segs[k];
          const e = Math.min(1, (energy(p) + energy(q)) / 2 / 140);
          if (e < 0.06 || Math.min(4, Math.ceil(e * 4)) !== b) continue;
          segPath(p, q);
          any = true;
        }
        if (any) {
          g.globalAlpha = 0.2 + b * 0.2;
          g.lineWidth = 1 + b * 0.25;
          g.stroke();
        }
      }
      g.globalAlpha = 1;
      for (let i = 1; i < N; i++) {
        if (hashU(i, s0 + 5) > 0.16) continue;
        const tw = 0.35 + 0.35 * Math.sin(t * 1.7 + i * 2.3);
        g.globalAlpha = tw;
        g.fillStyle = "#ffffff";
        g.beginPath();
        g.arc(px(i), py(i), 1.2, 0, Math.PI * 2);
        g.fill();
      }
      const ke = Math.min(1, energy(0) / 120);
      const kx = px(0);
      const ky = py(0);
      const glow = g.createRadialGradient(kx, ky, 0, kx, ky, 18 + ke * 14);
      glow.addColorStop(0, accent);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.globalAlpha = 0.35 + ke * 0.4;
      g.fillStyle = glow;
      g.fillRect(kx - 40, ky - 40, 80, 80);
      g.globalAlpha = 1;
      g.fillStyle = accent;
      g.beginPath();
      g.arc(kx, ky, 2.8 + ke * 1.6, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
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
      else draw();
    };

    let visible = true;
    let raf = 0;
    let prev = 0;

    const still = () => {
      inside = false;
      dx.fill(0);
      dy.fill(0);
      vx.fill(0);
      vy.fill(0);
      t = 0;
      fresh = true;
      for (let s = 0; s < 90; s++) {
        t += 1 / 60;
        pointer(1 / 60);
        simulate(1 / 60);
      }
      vx.fill(0);
      vy.fill(0);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      pointer(dt);
      simulate(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        fresh = true;
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
      if (!inside) fresh = true;
      inside = true;
    };

    const leave = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
      fresh = true;
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
  }, [spokes, rings, color, accent, pluck, damping, breeze, seed, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo7 ${className}`} style={style} {...rest}>
      <style href="hb-bg-web-threads" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo7-c" aria-hidden="true" />
      {children != null && <div className="hb-qo7-in">{children}</div>}
    </div>
  );
}

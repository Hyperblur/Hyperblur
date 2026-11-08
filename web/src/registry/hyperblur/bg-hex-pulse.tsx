"use client";

import * as React from "react";

export interface BgHexPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  radius?: number;
  interval?: number;
  interactive?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve13 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve13-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve13-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface Wave {
  x: number;
  y: number;
  at: number;
  power: number;
}

export function BgHexPulse({
  color = "#1c2433",
  accent = "#2f7bff",
  background = "#05070b",
  radius = 18,
  interval = 1.8,
  interactive = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgHexPulseProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = wrap?.parentElement;
    if (!wrap || !canvas || !ctx || !host) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const hostEl: HTMLElement = host;

    const lc = rgbOf(color, [28, 36, 51]);
    const ac = rgbOf(accent, [47, 123, 255]);
    const LV = 9;
    const strokes: string[] = [];
    const fills: string[] = [];
    for (let i = 0; i < LV; i++) {
      const k = i / (LV - 1);
      strokes.push(`rgba(${Math.round(lc[0] + (ac[0] - lc[0]) * k)},${Math.round(lc[1] + (ac[1] - lc[1]) * k)},${Math.round(lc[2] + (ac[2] - lc[2]) * k)},${(0.75 + k * 0.25).toFixed(2)})`);
      fills.push(`rgba(${ac[0]},${ac[1]},${ac[2]},${(k * k * 0.32).toFixed(3)})`);
    }

    let seed = 0x4e7;
    function rand() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let next = 0.2;
    let lastPointer = -9;
    let cx = new Float32Array(0);
    let cy = new Float32Array(0);
    let cr = 0;
    const waves: Wave[] = [];

    function setup() {
      cr = Math.max(8, radius);
      const hw = Math.sqrt(3) * cr;
      const vh = 1.5 * cr;
      const cols = Math.ceil(w / hw) + 2;
      const rows = Math.ceil(h / vh) + 2;
      cx = new Float32Array(cols * rows);
      cy = new Float32Array(cols * rows);
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cx[i] = c * hw + (r % 2 ? hw / 2 : 0) - hw / 2;
          cy[i] = r * vh - vh / 2;
          i++;
        }
      }
    }

    function spawn(x: number, y: number, power: number) {
      waves.push({ x, y, at: t, power });
      if (waves.length > 10) waves.shift();
    }

    function hexPath(p: Path2D, x: number, y: number, r: number) {
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (k) p.lineTo(px, py);
        else p.moveTo(px, py);
      }
      p.closePath();
    }

    function render() {
      if (!w || !h) return;
      if (t >= next) {
        if (cx.length) {
          const i = Math.floor(rand() * cx.length);
          spawn(cx[i], cy[i], 0.75 + rand() * 0.25);
        }
        next = t + Math.max(0.3, interval) * (0.6 + rand() * 0.8);
      }
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const v = Math.max(w, h) * 0.32;
      const band = cr * 2.6;
      const strokeP: Path2D[] = [];
      const fillP: Path2D[] = [];
      for (let k = 0; k < LV; k++) {
        strokeP.push(new Path2D());
        fillP.push(new Path2D());
      }
      const inner = cr - 1.6;
      for (let i = 0; i < cx.length; i++) {
        let I = 0;
        for (const wv of waves) {
          const age = t - wv.at;
          if (age < 0) continue;
          const front = age * v;
          const d = Math.hypot(cx[i] - wv.x, cy[i] - wv.y);
          const off = (d - front) / band;
          if (off > 1.5 || off < -3) continue;
          const decay = Math.exp(-age * 0.9) * wv.power;
          const lead = off > 0 ? Math.exp(-off * off * 3) : Math.exp(-off * off * 0.5);
          I = Math.max(I, lead * decay);
        }
        const shimmer = 0.05 * (0.5 + 0.5 * Math.sin(t * 0.8 + cx[i] * 0.02 + cy[i] * 0.03));
        const lvl = Math.min(LV - 1, Math.round((I + shimmer) * (LV - 1)));
        hexPath(strokeP[lvl], cx[i], cy[i], inner);
        if (lvl > 1) hexPath(fillP[lvl], cx[i], cy[i], inner - 1);
      }
      g.lineWidth = 1;
      g.lineJoin = "round";
      for (let k = 0; k < LV; k++) {
        if (k > 1) {
          g.fillStyle = fills[k];
          g.fill(fillP[k]);
        }
        g.strokeStyle = strokes[k];
        g.stroke(strokeP[k]);
      }
      while (waves.length && t - waves[0].at > 5) waves.shift();
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      waves.length = 0;
      t = 0;
      if (cx.length) spawn(w * 0.5, h * 0.5, 1);
      t = 0.55;
      next = 99;
      render();
      next = 0.2;
    }

    function resize() {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      setup();
      if (motion.matches) still();
      else render();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      render();
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

    function poke(e: PointerEvent) {
      if (!interactive || motion.matches) return;
      if (e.type === "pointermove" && t - lastPointer < 0.45) return;
      lastPointer = t;
      const rect = el.getBoundingClientRect();
      spawn(e.clientX - rect.left, e.clientY - rect.top, e.type === "pointerdown" ? 1 : 0.55);
    }

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(el);
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    hostEl.addEventListener("pointermove", poke, { passive: true });
    hostEl.addEventListener("pointerdown", poke, { passive: true });
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      hostEl.removeEventListener("pointermove", poke);
      hostEl.removeEventListener("pointerdown", poke);
    };
  }, [color, accent, background, radius, interval, interactive, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve13 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-hex-pulse" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve13-c" aria-hidden="true" />
      {children ? <div className="hb-ve13-in">{children}</div> : null}
    </div>
  );
}

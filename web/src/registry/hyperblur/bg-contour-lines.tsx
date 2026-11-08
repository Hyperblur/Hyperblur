"use client";

import * as React from "react";

export interface BgContourLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  peaks?: number;
  lines?: number;
  labels?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x51ed270b, 0x2c1b3c6d);
  x ^= x >>> 13;
  x = Math.imul(x, 0x297a2d39);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

type Peak = { bx: number; by: number; r: number; p1: number; p2: number; p3: number; base: number; la: number };

export function BgContourLines({
  color = "#7fb3ff",
  accent = "#2f7bff",
  background = "#070a10",
  peaks = 3,
  lines = 14,
  labels = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgContourLinesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !context) return;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const P = Math.max(1, Math.min(5, Math.round(peaks)));
    const L = Math.max(4, Math.min(30, Math.round(lines)));
    const anchors = [
      [0.26, 0.4],
      [0.74, 0.62],
      [0.56, 0.18],
      [0.12, 0.84],
      [0.9, 0.16],
    ];
    const list: Peak[] = Array.from({ length: P }, (_, i) => ({
      bx: anchors[i][0] + (hash(i * 9 + 1) - 0.5) * 0.06,
      by: anchors[i][1] + (hash(i * 9 + 2) - 0.5) * 0.06,
      r: 0.85 + 0.35 * hash(i * 9 + 3),
      p1: hash(i * 9 + 4) * 6.28,
      p2: hash(i * 9 + 5) * 6.28,
      p3: hash(i * 9 + 6) * 6.28,
      base: 1400 + Math.round(hash(i * 9 + 7) * 9) * 100,
      la: hash(i * 9 + 8) * 6.28,
    }));
    const STEPS = 120;
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;

    function center(pk: Peak) {
      return {
        x: w * (pk.bx + 0.025 * Math.sin(t * 0.05 + pk.p1)),
        y: h * (pk.by + 0.03 * Math.cos(t * 0.04 + pk.p2)),
        R: Math.min(w, h) * 0.62 * pk.r,
      };
    }

    function shape(pk: Peak, a: number, s: number) {
      return (
        1 +
        0.16 * Math.sin(3 * a + pk.p1 + t * 0.22 + s * 0.6) +
        0.09 * Math.sin(5 * a + pk.p2 - t * 0.17 + s * 0.9) +
        0.05 * Math.sin(8 * a + pk.p3 + t * 0.29)
      );
    }

    function level(pk: Peak, c: { x: number; y: number; R: number }, x: number, y: number) {
      const dx = x - c.x;
      const dy = y - c.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const a = Math.atan2(dy, dx);
      const s = d / c.R;
      return 1 - d / (c.R * shape(pk, a, Math.min(1, s)));
    }

    function draw() {
      if (!w || !h) return;
      g.globalAlpha = 1;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      g.strokeStyle = color;
      g.globalAlpha = 0.14;
      g.lineWidth = 1;
      g.beginPath();
      for (let x = 24; x < w; x += 24) {
        const big = Math.round(x / 24) % 5 === 0;
        g.moveTo(x + 0.5, 0);
        g.lineTo(x + 0.5, big ? 8 : 4);
        g.moveTo(x + 0.5, h);
        g.lineTo(x + 0.5, h - (big ? 8 : 4));
      }
      for (let y = 24; y < h; y += 24) {
        const big = Math.round(y / 24) % 5 === 0;
        g.moveTo(0, y + 0.5);
        g.lineTo(big ? 8 : 4, y + 0.5);
        g.moveTo(w, y + 0.5);
        g.lineTo(w - (big ? 8 : 4), y + 0.5);
      }
      g.stroke();
      const cs = list.map(center);
      const labelsToDraw: { x: number; y: number; a: number; text: string }[] = [];
      for (let p = 0; p < P; p++) {
        const pk = list[p];
        const c = cs[p];
        for (let k = 1; k <= L; k++) {
          const s = k / L;
          const lam = 1 - s;
          const index = k % 5 === 0;
          g.beginPath();
          let pen = false;
          for (let j = 0; j <= STEPS; j++) {
            const a = (j / STEPS) * Math.PI * 2;
            const r = c.R * s * shape(pk, a, s);
            const x = c.x + Math.cos(a) * r;
            const y = c.y + Math.sin(a) * r;
            let hidden = false;
            for (let q = 0; q < P; q++) {
              if (q !== p && level(list[q], cs[q], x, y) > lam) {
                hidden = true;
                break;
              }
            }
            if (hidden) {
              pen = false;
              continue;
            }
            if (pen) g.lineTo(x, y);
            else g.moveTo(x, y);
            pen = true;
          }
          g.globalAlpha = index ? 0.62 : 0.24 + 0.1 * (1 - s);
          g.lineWidth = index ? 1.25 : 0.7;
          g.strokeStyle = color;
          g.stroke();
          if (labels && index) {
            const a = pk.la + t * 0.01;
            const r = c.R * s * shape(pk, a, s);
            const x = c.x + Math.cos(a) * r;
            const y = c.y + Math.sin(a) * r;
            let hidden = x < 16 || y < 12 || x > w - 16 || y > h - 12;
            for (let q = 0; q < P && !hidden; q++) {
              if (q !== p && level(list[q], cs[q], x, y) > lam) hidden = true;
            }
            if (!hidden) labelsToDraw.push({ x, y, a: a + Math.PI / 2, text: (pk.base + 20 - k * 20).toLocaleString("en-US") });
          }
        }
      }
      g.font = "500 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      g.textAlign = "center";
      g.textBaseline = "middle";
      for (const lb of labelsToDraw) {
        let ang = lb.a;
        while (ang > Math.PI / 2) ang -= Math.PI;
        while (ang < -Math.PI / 2) ang += Math.PI;
        g.save();
        g.translate(lb.x, lb.y);
        g.rotate(ang);
        const tw = g.measureText(lb.text).width + 6;
        g.globalAlpha = 1;
        g.fillStyle = background;
        g.fillRect(-tw / 2, -6, tw, 12);
        g.globalAlpha = 0.75;
        g.fillStyle = color;
        g.fillText(lb.text, 0, 0.5);
        g.restore();
      }
      for (let p = 0; p < P; p++) {
        const c = cs[p];
        const pk = list[p];
        const r = Math.max(2, (c.R / L) * 0.5);
        g.globalAlpha = 0.22;
        g.fillStyle = accent;
        g.beginPath();
        g.arc(c.x, c.y, r * 3.2, 0, Math.PI * 2);
        g.fill();
        g.globalAlpha = 1;
        g.beginPath();
        g.moveTo(c.x, c.y - 4.5);
        g.lineTo(c.x + 4, c.y + 2.5);
        g.lineTo(c.x - 4, c.y + 2.5);
        g.closePath();
        g.fill();
        if (labels && c.x > 40 && c.x < w - 70 && c.y > 18) {
          g.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace";
          g.textAlign = "left";
          g.globalAlpha = 0.9;
          g.fillStyle = color;
          g.fillText(`${(pk.base + 20).toLocaleString("en-US")} m`, c.x + 8, c.y - 4);
        }
      }
      g.globalAlpha = 1;
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
      if (motion.matches) t = 6;
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
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
        t = 6;
        draw();
      }
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
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [color, accent, background, peaks, lines, labels, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd3 ${className}`} style={style} {...rest}>
      <style href="hb-bg-contour-lines" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd3-c" aria-hidden="true" />
      {children ? <div className="hb-vd3-in">{children}</div> : null}
    </div>
  );
}

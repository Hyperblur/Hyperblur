"use client";

import * as React from "react";

export interface CardPixelHoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  subtitle?: string;
  tag?: string;
  src?: string;
  accent?: string;
  cell?: number;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qk3 {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk3-r);
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid #262626;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk3 *, .hb-qk3 *::before, .hb-qk3 *::after { box-sizing: border-box; }
.hb-qk3:focus-visible { outline: 2px solid var(--hb-qk3-c); outline-offset: 3px; }
.hb-qk3-cv {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.hb-qk3-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(5, 5, 8, 0) 40%, rgba(5, 5, 8, 0.86) 100%);
}
.hb-qk3-tag {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(10, 10, 12, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  color: #ededed;
  pointer-events: none;
}
.hb-qk3-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 16px 15px;
  pointer-events: none;
}
.hb-qk3-title {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.hb-qk3-sub {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.3;
  color: #b8b8b8;
}
`;

function hash(n: number) {
  let h = Math.imul(n + 1, 2654435761) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

const points = [
  [0.2, 0.3],
  [0.82, 0.7],
  [0.5, 0.18],
  [0.14, 0.84],
];

export function CardPixelHover({
  title = "Sunroom studio, Lisbon",
  subtitle = "38 m2, south facing, from 1,450 / month",
  tag = "Available May 1",
  src,
  accent = "#2f7bff",
  cell = 16,
  ratio = 1.75,
  idle = true,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerCancel,
  onFocus,
  onBlur,
  ...rest
}: CardPixelHoverProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const api = React.useRef<((target: number, x: number, y: number) => void) | null>(null);
  const live = React.useRef({ real: false, cool: 0 });

  React.useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const s = live.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = document.createElement("canvas");
    const small = document.createElement("canvas");
    const fctx = full.getContext("2d");
    const sctx = small.getContext("2d");
    if (!fctx || !sctx) return;
    let image: HTMLImageElement | null = null;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 1;
    let rows = 1;
    let cw = 1;
    let ch = 1;
    let v = new Float32Array(1);
    let delay = new Float32Array(1);
    let target = 0;
    let t0 = 0;
    let raf = 0;
    let last = 0;
    let dirty = true;

    const drawScene = () => {
      fctx.setTransform(1, 0, 0, 1, 0, 0);
      fctx.clearRect(0, 0, full.width, full.height);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (image && image.complete && image.naturalWidth) {
        const k = Math.max(w / image.naturalWidth, h / image.naturalHeight);
        const iw = image.naturalWidth * k;
        const ih = image.naturalHeight * k;
        fctx.drawImage(image, (w - iw) / 2, (h - ih) / 2, iw, ih);
      } else {
        fctx.fillStyle = accent;
        fctx.fillRect(0, 0, w, h);
        const sky = fctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "rgba(255,255,255,0.28)");
        sky.addColorStop(0.55, "rgba(10,10,24,0.35)");
        sky.addColorStop(1, "rgba(4,4,8,0.82)");
        fctx.fillStyle = sky;
        fctx.fillRect(0, 0, w, h);
        const sun = fctx.createRadialGradient(w * 0.74, h * 0.32, 0, w * 0.74, h * 0.32, h * 0.34);
        sun.addColorStop(0, "rgba(255,255,255,1)");
        sun.addColorStop(0.4, "rgba(255,244,214,0.85)");
        sun.addColorStop(1, "rgba(255,255,255,0)");
        fctx.fillStyle = sun;
        fctx.fillRect(0, 0, w, h);
        const ridges: [number[][], string][] = [
          [[[0, 0.7], [0.14, 0.52], [0.3, 0.64], [0.48, 0.4], [0.64, 0.6], [0.82, 0.46], [1, 0.62], [1, 1], [0, 1]], "rgba(6,6,14,0.5)"],
          [[[0, 0.84], [0.2, 0.72], [0.4, 0.82], [0.6, 0.66], [0.82, 0.8], [1, 0.72], [1, 1], [0, 1]], "rgba(3,3,8,0.78)"],
        ];
        for (const [poly, color] of ridges) {
          fctx.beginPath();
          poly.forEach(([px, py], i) => {
            if (i === 0) fctx.moveTo(px * w, py * h);
            else fctx.lineTo(px * w, py * h);
          });
          fctx.closePath();
          fctx.fillStyle = color;
          fctx.fill();
        }
      }
      small.width = cols;
      small.height = rows;
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = "high";
      sctx.clearRect(0, 0, cols, rows);
      sctx.drawImage(full, 0, 0, cols, rows);
      dirty = true;
    };

    const spread = (now: number, ox: number, oy: number) => {
      const diag = Math.hypot(w, h) || 1;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const i = r * cols + c;
          const d = Math.hypot((c + 0.5) * cw - ox * w, (r + 0.5) * ch - oy * h) / diag;
          delay[i] = d * 0.7 + hash(i) * 0.1;
        }
      }
      t0 = now;
    };

    const trigger = (next: number, x: number, y: number) => {
      const now = performance.now() / 1000;
      target = next;
      spread(now, x, y);
      dirty = true;
    };
    api.current = trigger;

    const render = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(full, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const k = v[r * cols + c];
          if (k <= 0.001) continue;
          const x = c * cw;
          const y = r * ch;
          ctx.globalAlpha = Math.min(1, k * 1.8);
          ctx.fillStyle = "#0a0a0a";
          ctx.fillRect(x - 0.5, y - 0.5, cw + 1, ch + 1);
          const e = k * k * (3 - 2 * k);
          const pulse = k > 0.98 && target === 1 ? 0.06 * Math.sin(now * 3 + (c + r) * 0.6) : 0;
          const f = Math.min(0.96, 0.12 + 0.76 * e + pulse);
          const bw = cw * f;
          const bh = ch * f;
          ctx.globalAlpha = Math.min(1, k * 1.5);
          ctx.drawImage(small, c, r, 1, 1, x + (cw - bw) / 2, y + (ch - bh) / 2, bw, bh);
        }
      }
      ctx.globalAlpha = 1;
    };

    const layout = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      full.width = cv.width;
      full.height = cv.height;
      cols = Math.max(2, Math.round(w / Math.max(6, cell)));
      rows = Math.max(2, Math.round(h / Math.max(6, cell)));
      cw = w / cols;
      ch = h / rows;
      v = new Float32Array(cols * rows).fill(target);
      delay = new Float32Array(cols * rows);
      spread(performance.now() / 1000, 0.5, 0.5);
      drawScene();
      render(performance.now() / 1000);
    };

    if (src) {
      image = new Image();
      image.onload = () => {
        drawScene();
        render(performance.now() / 1000);
      };
      image.src = src;
    }

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);

    if (reduce) {
      return () => {
        ro.disconnect();
        if (image) image.onload = null;
        api.current = null;
      };
    }

    const frame = (ms: number) => {
      const now = ms / 1000;
      const dt = Math.min(0.05, last ? now - last : 0.016);
      last = now;
      if (idle && !s.real && now > s.cool) {
        const phase = Math.floor(now / 2.6);
        const want = phase % 2 === 1 ? 1 : 0;
        if (want !== target) {
          const p = points[(Math.floor(phase / 2) + (want ? 0 : 2)) % points.length];
          trigger(want, p[0], p[1]);
        }
      }
      let moving = false;
      const clock = performance.now() / 1000;
      for (let i = 0; i < v.length; i += 1) {
        if (clock - t0 >= delay[i] && v[i] !== target) {
          const step = dt / 0.42;
          v[i] = target > v[i] ? Math.min(target, v[i] + step) : Math.max(target, v[i] - step);
          moving = true;
        }
      }
      if (moving || dirty || target === 1) {
        render(now);
        dirty = moving;
      }
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (image) image.onload = null;
      api.current = null;
    };
  }, [src, accent, cell, idle]);

  const enter = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    live.current.real = true;
    api.current?.(1, r.width ? (e.clientX - r.left) / r.width : 0.5, r.height ? (e.clientY - r.top) / r.height : 0.5);
  };

  const leaveWith = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    live.current.real = false;
    live.current.cool = performance.now() / 1000 + 2.4;
    api.current?.(0, r.width ? (e.clientX - r.left) / r.width : 0.5, r.height ? (e.clientY - r.top) / r.height : 0.5);
  };

  return (
    <div
      ref={root}
      tabIndex={0}
      className={`hb-qk3 ${className}`}
      style={{ "--hb-qk3-r": ratio, "--hb-qk3-c": accent, ...style } as React.CSSProperties}
      onPointerEnter={enter}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        leaveWith(e);
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        leaveWith(e);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        live.current.real = true;
        api.current?.(1, 0.5, 0.5);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        live.current.real = false;
        live.current.cool = performance.now() / 1000 + 2.4;
        api.current?.(0, 0.5, 0.5);
      }}
      {...rest}
    >
      <style href="hb-card-pixel-hover" precedence="default">{css}</style>
      <canvas ref={canvas} className="hb-qk3-cv" aria-hidden="true" />
      <div className="hb-qk3-scrim" aria-hidden="true" />
      {tag ? <span className="hb-qk3-tag">{tag}</span> : null}
      <div className="hb-qk3-body">
        <h3 className="hb-qk3-title">{title}</h3>
        {subtitle ? <p className="hb-qk3-sub">{subtitle}</p> : null}
      </div>
    </div>
  );
}

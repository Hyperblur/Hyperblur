"use client";

import * as React from "react";

export interface TextAsciiRenderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  text: string;
  density?: number;
  charset?: string;
  height?: number | string;
  fontFamily?: string;
  textFont?: string;
  fontWeight?: number;
  wave?: number;
  field?: boolean;
  pointerRadius?: number;
  color?: string;
  accent?: string;
}

const css = `
:where(.hb-qt5) { font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; }
.hb-qt5 {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: var(--hb-qt5-h);
  overflow: hidden;
}
.hb-qt5-cv {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
}
.hb-qt5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;

const FRAME_MS = 26;

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function TextAsciiRender({
  text,
  density = 1,
  charset = " .:-=+*#%@",
  height = 200,
  fontFamily,
  textFont = 'system-ui, "Helvetica Neue", Arial, sans-serif',
  fontWeight = 800,
  wave = 1,
  field = true,
  pointerRadius = 80,
  color,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: TextAsciiRenderProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = Array.from(charset.length > 1 ? charset : " .:-=+*#%@");
    const last = chars.length - 1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 1;
    let H = 1;
    let dpr = 1;
    let cols = 1;
    let rows = 1;
    let cw = 6;
    let chh = 10;
    let offX = 0;
    let offY = 0;
    let cell = 10;
    let family = "monospace";
    let ink = "#ededed";
    let lum = new Float32Array(1);
    let disposed = false;
    let seen = true;
    let raf = 0;
    let lastFrame = 0;
    let inside = false;
    let blend = 0;
    let realX = 0;
    let realY = 0;
    const origin = performance.now();

    const rebuild = () => {
      const rect = root.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const cs = getComputedStyle(root);
      family = cs.fontFamily || "monospace";
      ink = color ?? cs.color ?? "#ededed";
      cell = Math.max(4, 10 / Math.max(0.2, density));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = `${cell}px ${family}`;
      const m = ctx.measureText("M").width;
      cw = m > 0 ? m : cell * 0.6;
      chh = cell;
      cols = Math.max(1, Math.floor(W / cw));
      rows = Math.max(1, Math.floor(H / chh));
      offX = (W - cols * cw) / 2;
      offY = (H - rows * chh) / 2;

      const S = W * H > 400000 ? 2 : 3;
      const bw = Math.max(1, Math.round(cols * cw * S));
      const bh = Math.max(1, Math.round(rows * chh * S));
      const big = document.createElement("canvas");
      big.width = bw;
      big.height = bh;
      const bctx = big.getContext("2d", { willReadFrequently: true });
      lum = new Float32Array(cols * rows);
      if (!bctx) return;
      const lines = text.split("\n");
      bctx.font = `${fontWeight} 100px ${textFont}`;
      let maxW = 1;
      for (const line of lines) maxW = Math.max(maxW, bctx.measureText(line).width);
      const fit = Math.min((bw * 0.94) / maxW, (bh * 0.8) / (lines.length * 1.05));
      const px = Math.max(4, 100 * fit);
      bctx.font = `${fontWeight} ${px.toFixed(1)}px ${textFont}`;
      bctx.fillStyle = "#fff";
      bctx.textAlign = "center";
      bctx.textBaseline = "middle";
      const lh = px * 1.02;
      lines.forEach((line, i) => {
        bctx.fillText(line, bw / 2, bh / 2 + (i - (lines.length - 1) / 2) * lh);
      });
      const data = bctx.getImageData(0, 0, bw, bh).data;
      const bcw = bw / cols;
      const bch = bh / rows;
      for (let r = 0; r < rows; r++) {
        const y0 = Math.floor(r * bch);
        const y1 = Math.max(y0 + 1, Math.floor((r + 1) * bch));
        for (let c = 0; c < cols; c++) {
          const x0 = Math.floor(c * bcw);
          const x1 = Math.max(x0 + 1, Math.floor((c + 1) * bcw));
          let sum = 0;
          let n = 0;
          for (let y = y0; y < y1 && y < bh; y++) {
            for (let x = x0; x < x1 && x < bw; x++) {
              sum += data[(y * bw + x) * 4 + 3];
              n++;
            }
          }
          lum[r * cols + c] = n ? sum / n / 255 : 0;
        }
      }
    };

    const draw = (t: number, px: number, py: number, radius: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${cell}px ${family}`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      const amp = Math.max(0, wave);
      let fillNow = "";
      let alphaNow = -1;
      for (let r = 0; r < rows; r++) {
        const y = offY + r * chh;
        for (let c = 0; c < cols; c++) {
          const x = offX + c * cw;
          const base = lum[r * cols + c];
          const s = (Math.sin(c * 0.28 + r * 0.19 + t * 1.6) + Math.sin(c * 0.11 - r * 0.31 - t * 1.1)) * 0.5;
          let v: number;
          let a: number;
          if (base > 0.04) {
            v = 0.3 + 0.7 * base + s * 0.16 * amp;
            a = 1;
          } else if (field) {
            v = 0.1 + s * 0.09 * amp;
            a = 0.34;
          } else {
            v = 0;
            a = 0;
          }
          let k = 0;
          if (radius > 0) {
            const d = Math.hypot(x + cw / 2 - px, y + chh / 2 - py);
            if (d < radius) {
              k = 1 - d / radius;
              k *= k;
              v += k * 0.7 * (0.5 + 0.5 * Math.sin(d * 0.13 - t * 7));
              if (a === 0) a = 0.5 * k + 0.1;
              else a = Math.max(a, 0.5 + 0.5 * k);
            }
          }
          const idx = Math.round(clamp(v) * last);
          if (idx <= 0 || a <= 0) continue;
          const fill = k > 0.1 ? accent : ink;
          if (fill !== fillNow) {
            ctx.fillStyle = fill;
            fillNow = fill;
          }
          if (a !== alphaNow) {
            ctx.globalAlpha = a;
            alphaNow = a;
          }
          ctx.fillText(chars[idx], x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const still = () => {
      draw(0, -9999, -9999, 0);
    };

    const tick = (now: number) => {
      raf = 0;
      if (disposed || !seen) return;
      raf = requestAnimationFrame(tick);
      const dt = lastFrame ? now - lastFrame : FRAME_MS;
      if (dt < FRAME_MS) return;
      lastFrame = now;
      const t = (now - origin) / 1000;
      blend += ((inside ? 1 : 0) - blend) * (1 - Math.exp((-Math.min(dt, 100) / 1000) * 6));
      const ix = W * (0.5 + 0.38 * Math.sin(t * 0.6));
      const iy = H * (0.5 + 0.3 * Math.sin(t * 0.9 + 1));
      const px = ix + (realX - ix) * blend;
      const py = iy + (realY - iy) * blend;
      draw(t, px, py, Math.max(0, pointerRadius) * (0.8 + 0.2 * blend));
    };
    const run = () => {
      if (!raf && seen && !disposed && !reduce) raf = requestAnimationFrame(tick);
    };

    const setup = () => {
      rebuild();
      if (reduce) still();
    };
    setup();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) setup();
      });
    }

    const ro = new ResizeObserver(() => setup());
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        seen = entry.isIntersecting;
        if (seen) {
          lastFrame = 0;
          run();
        }
      }
    });
    io.observe(root);

    const move = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      realX = e.clientX - rect.left;
      realY = e.clientY - rect.top;
      inside = true;
    };
    const leave = () => {
      inside = false;
    };
    if (!reduce) {
      root.addEventListener("pointerenter", move);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("pointercancel", leave);
    }
    run();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointerenter", move);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
    };
  }, [text, density, charset, wave, field, pointerRadius, color, accent, textFont, fontWeight, fontFamily]);

  const vars = {
    "--hb-qt5-h": typeof height === "number" ? `${height}px` : height,
    ...(fontFamily ? { fontFamily } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qt5 ${className}`} style={vars} {...rest}>
      <style href="hb-text-ascii-render" precedence="default">{css}</style>
      <span className="hb-qt5-sr">{text}</span>
      <canvas ref={canvasRef} className="hb-qt5-cv" aria-hidden="true" />
    </div>
  );
}

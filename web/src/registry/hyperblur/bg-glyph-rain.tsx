"use client";

import * as React from "react";

export type BgGlyphRainVariant = "hex" | "binary" | "blocks" | "symbols";

export interface BgGlyphRainProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BgGlyphRainVariant;
  chars?: string;
  color?: string;
  accent?: string;
  background?: string;
  fontSize?: number;
  density?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve5 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve5-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve5-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const sets: Record<BgGlyphRainVariant, string> = {
  hex: "0123456789ABCDEF",
  binary: "01",
  blocks: "▁▂▃▄▅▆▇█▏▎▍▌▋▊▉",
  symbols: "+-=<>[]{}()/\\|*#%&$@;:~^",
};

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function hash(i: number) {
  let x = Math.imul(i ^ 0x7f4a7c15, 0x2c1b3c6d);
  x ^= x >>> 12;
  x = Math.imul(x, 0x297a2d39);
  x ^= x >>> 15;
  return x >>> 0;
}

interface Layer {
  size: number;
  alpha: number;
  rate: number;
  cols: number;
  head: Float32Array;
  vel: Float32Array;
  len: Uint8Array;
  wait: Float32Array;
}

export function BgGlyphRain({
  variant = "hex",
  chars,
  color = "#2f7bff",
  accent = "#e6f0ff",
  background = "#04060b",
  fontSize = 14,
  density = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgGlyphRainProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;

    const glyphs = Array.from(chars && chars.length ? chars : sets[variant] ?? sets.hex);
    const cc = rgbOf(color, [47, 123, 255]);
    const ch = rgbOf(accent, [230, 240, 255]);
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim();
    const family = `${mono ? mono + ", " : ""}ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    const base = Math.max(8, fontSize);
    const specs = [
      { size: base * 0.62, alpha: 0.28, rate: 0.55 },
      { size: base * 0.82, alpha: 0.55, rate: 0.8 },
      { size: base * 1.12, alpha: 1, rate: 1.15 },
    ];

    let seed = 0x51ed;
    function rand() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let layers: Layer[] = [];

    function reset(L: Layer, i: number, rows: number, first: boolean) {
      L.len[i] = 6 + Math.floor(rand() * Math.min(26, rows * 0.7));
      L.vel[i] = (5 + rand() * 9) * L.rate;
      L.head[i] = first ? rand() * (rows + L.len[i]) : -rand() * rows * 0.4;
      L.wait[i] = first ? 0 : rand() * 2.5;
    }

    function setup() {
      seed = 0x51ed;
      layers = specs.map((s) => {
        const pitch = s.size * 1.05;
        const cols = Math.max(1, Math.floor((w / pitch) * Math.min(1, 0.55 * density)));
        const L: Layer = {
          size: s.size,
          alpha: s.alpha,
          rate: s.rate,
          cols,
          head: new Float32Array(cols),
          vel: new Float32Array(cols),
          len: new Uint8Array(cols),
          wait: new Float32Array(cols),
        };
        const rows = Math.ceil(h / (s.size * 1.2));
        for (let i = 0; i < cols; i++) reset(L, i, rows, true);
        return L;
      });
    }

    function render(dt: number) {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      g.textAlign = "center";
      g.textBaseline = "top";
      const scan = ((t * 0.12) % 1.3) * h - h * 0.15;
      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        const lh = L.size * 1.2;
        const rows = Math.ceil(h / lh);
        const pitch = w / L.cols;
        g.font = `500 ${L.size.toFixed(1)}px ${family}`;
        for (let i = 0; i < L.cols; i++) {
          if (L.wait[i] > 0) {
            L.wait[i] -= dt;
            continue;
          }
          L.head[i] += L.vel[i] * dt;
          const len = L.len[i];
          if (L.head[i] - len > rows) {
            reset(L, i, rows, false);
            continue;
          }
          const x = (i + 0.5) * pitch + ((hash(i * 31 + li) % 7) - 3) * 0.6;
          const top = Math.floor(L.head[i]);
          const tick = Math.floor(t * 9 + (hash(i + li * 977) % 50));
          for (let j = 0; j < len; j++) {
            const row = top - j;
            if (row < 0 || row > rows) continue;
            const y = row * lh;
            const fl = j < 3 ? tick : Math.floor(tick / (4 + (j % 5)));
            const glyph = glyphs[hash(row * 7919 + i * 104729 + li * 31 + fl) % glyphs.length];
            let a = (1 - j / len) ** 1.6 * L.alpha;
            const sd = Math.abs(y - scan);
            if (sd < 30) a = Math.min(1, a + (1 - sd / 30) * 0.35 * L.alpha);
            if (j === 0) {
              g.globalAlpha = Math.min(1, L.alpha * 1.1);
              g.fillStyle = `rgb(${ch[0]},${ch[1]},${ch[2]})`;
            } else {
              g.globalAlpha = a;
              const m = j < 3 ? 0.45 : 0;
              g.fillStyle = `rgb(${Math.round(cc[0] + (ch[0] - cc[0]) * m)},${Math.round(cc[1] + (ch[1] - cc[1]) * m)},${Math.round(cc[2] + (ch[2] - cc[2]) * m)})`;
            }
            g.fillText(glyph, x, y);
          }
        }
      }
      g.globalAlpha = 1;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 1;
      setup();
      render(0);
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
      else render(0);
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000) * speed;
      prev = now;
      t += dt;
      render(dt);
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
  }, [variant, chars, color, accent, background, fontSize, density, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve5 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-glyph-rain" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve5-c" aria-hidden="true" />
      {children ? <div className="hb-ve5-in">{children}</div> : null}
    </div>
  );
}

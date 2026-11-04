"use client";

import * as React from "react";

export interface BgGlitchLettersProps extends React.HTMLAttributes<HTMLDivElement> {
  characters?: string;
  colors?: string[];
  fontSize?: number;
  fontFamily?: string;
  rate?: number;
  radius?: number;
  dim?: number;
  seed?: number;
}

const css = `
.hb-qj8 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj8-c { display: block; width: 100%; height: 100%; }
`;

const defaultColors = ["#ededed", "#2f7bff", "#7fb3ff", "#ff5c8a"];

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function BgGlitchLetters({
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=<>/",
  colors = defaultColors,
  fontSize = 15,
  fontFamily = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  rate = 1,
  radius = 120,
  dim = 0.2,
  seed = 9,
  className = "",
  style,
  ...rest
}: BgGlitchLettersProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const palette = colors.length ? colors.join("|") : defaultColors.join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    if (!wrap || !host || !canvas || !ctx || !lctx) return;

    const glyphs = Array.from(characters.length ? characters : "01");
    const tones = palette.split("|");
    const size = Math.max(8, fontSize);
    const cw = Math.ceil(size * 0.66);
    const ch = Math.ceil(size * 1.3);
    const font = `${size}px ${fontFamily}`;
    const R = Math.max(20, radius);
    const tickLen = 1 / (16 * Math.max(0.05, rate));
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let cols = 0;
    let rows = 0;
    let n = 0;
    let glyph = new Uint16Array(0);
    let tone = new Uint8Array(0);
    let flash = new Float32Array(0);
    let active: number[] = [];
    let tick = 0;
    let clock = 0;
    let burstClock = 0;
    let bursts = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.34 * Math.sin(tt * 0.39 + 0.5));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.61 + 2));
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
      const k = 1 - Math.exp(-dt * (inside ? 12 : 2.4));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function pickTone(v: number) {
      if (tones.length < 2 || v < 0.82) return 0;
      return 1 + Math.floor(((v - 0.82) / 0.18) * (tones.length - 1)) % (tones.length - 1);
    }

    function paint(i: number) {
      if (!lctx) return;
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = c * cw;
      const y = r * ch;
      lctx.clearRect(x, y, cw, ch);
      lctx.globalAlpha = tone[i] === 0 ? dim : Math.min(1, dim * 2.2);
      lctx.fillStyle = tones[tone[i]];
      lctx.fillText(glyphs[glyph[i]], x + cw / 2, y + ch / 2);
    }

    function layout() {
      cols = Math.ceil(w / cw) + 1;
      rows = Math.ceil(h / ch) + 1;
      n = cols * rows;
      glyph = new Uint16Array(n);
      tone = new Uint8Array(n);
      flash = new Float32Array(n);
      active = [];
      tick = 0;
      bursts = 0;
      for (let i = 0; i < n; i++) {
        glyph[i] = Math.floor(rnd(seed, i * 3 + 1) * glyphs.length);
        tone[i] = pickTone(rnd(seed, i * 3 + 2));
      }
      if (!lctx) return;
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, layer.width, layer.height);
      lctx.setTransform(layer.width / w, 0, 0, layer.height / h, 0, 0);
      lctx.font = font;
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
      for (let i = 0; i < n; i++) paint(i);
    }

    function change(i: number, k: number) {
      glyph[i] = Math.floor(rnd(seed, k * 2 + 1) * glyphs.length);
      tone[i] = pickTone(rnd(seed, k * 2 + 2));
      if (flash[i] <= 0) active.push(i);
      flash[i] = 1;
      paint(i);
    }

    function step(dt: number) {
      clock += dt;
      burstClock += dt;
      while (clock >= tickLen) {
        clock -= tickLen;
        tick++;
        const amount = Math.max(1, Math.floor(n * 0.006));
        for (let j = 0; j < amount; j++) {
          const key = tick * 7919 + j;
          change(Math.floor(rnd(seed + 17, key) * n), key);
        }
      }
      if (burstClock > 2.4 / Math.max(0.05, rate)) {
        burstClock = 0;
        bursts++;
        const row = Math.floor(rnd(seed + 31, bursts) * rows);
        const start = Math.floor(rnd(seed + 37, bursts) * cols);
        const len = 6 + Math.floor(rnd(seed + 41, bursts) * 10);
        for (let c = start; c < Math.min(cols, start + len); c++) change(row * cols + c, 900000 + bursts * 64 + c);
      }
      const keep: number[] = [];
      for (const i of active) {
        flash[i] -= dt * 2.2;
        if (flash[i] > 0) keep.push(i);
        else flash[i] = 0;
      }
      active = keep;
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.drawImage(layer, 0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const i of active) {
        ctx.globalAlpha = flash[i] * 0.75;
        ctx.fillStyle = tones[tone[i]];
        ctx.fillText(glyphs[glyph[i]], (i % cols) * cw + cw / 2, Math.floor(i / cols) * ch + ch / 2);
      }
      const c0 = Math.max(0, Math.floor((px - R) / cw));
      const c1 = Math.min(cols - 1, Math.ceil((px + R) / cw));
      const r0 = Math.max(0, Math.floor((py - R) / ch));
      const r1 = Math.min(rows - 1, Math.ceil((py + R) / ch));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const x = c * cw + cw / 2;
          const y = r * ch + ch / 2;
          const dx = x - px;
          const dy = y - py;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d >= R) continue;
          const k = 1 - d / R;
          const i = r * cols + c;
          ctx.globalAlpha = Math.min(1, k * k * 0.95);
          ctx.fillStyle = tone[i] === 0 ? "#ffffff" : tones[tone[i]];
          ctx.fillText(glyphs[glyph[i]], x, y);
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
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      layer.width = canvas.width;
      layer.height = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 1.8;
      inside = false;
      placed = false;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt;
      track(dt);
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
  }, [characters, palette, fontSize, fontFamily, rate, radius, dim, seed]);

  return (
    <div ref={wrapRef} className={`hb-qj8 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-glitch-letters" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj8-c" />
    </div>
  );
}

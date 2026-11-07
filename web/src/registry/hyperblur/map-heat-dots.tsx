"use client";

import * as React from "react";

export type HeatMetric = "footfall" | "temperature" | "noise" | "signal";

export interface MapHeatDotsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  metric?: HeatMetric;
  accent?: string;
  coldColor?: string;
  seed?: number;
  density?: number;
  title?: string;
  subtitle?: string;
}

type C3 = [number, number, number];
type Spot = { u: number; v: number; amp: number; r: number; name: string };
type Dot = { x: number; y: number; val: number; ph: number; spot: number };

const METRICS: Record<HeatMetric, { label: string; unit: string; min: number; max: number; digits: number; sub: string }> = {
  footfall: { label: "Footfall", unit: "people/h", min: 0, max: 2400, digits: 0, sub: "Saturday, 14:00" },
  temperature: { label: "Surface temperature", unit: "°C", min: 16, max: 39, digits: 1, sub: "July average, 15:00" },
  noise: { label: "Noise level", unit: "dB", min: 38, max: 84, digits: 0, sub: "Weekday peak" },
  signal: { label: "5G throughput", unit: "Mbps", min: 40, max: 960, digits: 0, sub: "Median, last 7 days" },
};

const NAMES = ["Harbor Front", "Old Town", "Market Hall", "Central Station", "Northbank", "Mill Quarter", "Lighthouse Point"];
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function mix32(n: number) {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function rnd(seed: number, a: number, b = 0) {
  return mix32(seed * 374761393 + a * 668265263 + b * 2246822519 + 1013904223);
}

function coast(u: number, seed: number) {
  return 0.3 + 0.09 * Math.sin(u * 5.1 + seed) + 0.045 * Math.sin(u * 13.7 + seed * 2.3) + 0.02 * Math.sin(u * 31 + seed);
}

function isLand(u: number, v: number, seed: number) {
  if (((u - 0.17) / 0.075) ** 2 + ((v - 0.17) / 0.05) ** 2 < 1) return true;
  if (((u - 0.86) / 0.05) ** 2 + ((v - 0.12) / 0.035) ** 2 < 1) return true;
  if (v < coast(u, seed)) return false;
  if (((u - 0.62) / 0.13) ** 2 + ((v - coast(0.62, seed) - 0.02) / 0.15) ** 2 < 1) return false;
  const rx = 0.36 + 0.05 * Math.sin(v * 10 + seed);
  if (Math.abs(u - rx) < 0.011 && v > 0.2) return false;
  return true;
}

function buildSpots(seed: number): Spot[] {
  const out: Spot[] = [];
  for (let i = 0; i < 6; i++) {
    let u = 0.08 + rnd(seed, i, 1) * 0.84;
    let v = 0.32 + rnd(seed, i, 2) * 0.6;
    for (let tries = 0; tries < 12 && !isLand(u, v, seed); tries++) {
      u = 0.08 + rnd(seed, i, 10 + tries) * 0.84;
      v = 0.4 + rnd(seed, i, 30 + tries) * 0.52;
    }
    out.push({ u, v, amp: 0.45 + rnd(seed, i, 3) * 0.55, r: 0.07 + rnd(seed, i, 4) * 0.09, name: NAMES[(i + seed) % NAMES.length] });
  }
  out.push({ u: 0.17, v: 0.17, amp: 0.55, r: 0.05, name: "Lighthouse Point" });
  return out;
}

function mixc(a: C3, b: C3, t: number): C3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function ramp(cold: C3, hot: C3, t: number): C3 {
  if (t < 0.7) return mixc(cold, hot, t / 0.7);
  return mixc(hot, [255, 240, 225], (t - 0.7) / 0.3);
}

function parseColor(ctx: CanvasRenderingContext2D, value: string, fb: C3): C3 {
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value;
  const v = String(ctx.fillStyle);
  if (v[0] === "#" && v.length === 7) {
    return [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)];
  }
  const m = v.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Number(m[0]), Number(m[1]), Number(m[2])] : fb;
}

function format(metric: HeatMetric, t: number) {
  const m = METRICS[metric];
  const n = m.min + (m.max - m.min) * t;
  const s = m.digits ? n.toFixed(m.digits) : Math.round(n).toLocaleString("en-US");
  return `${s} ${m.unit}`;
}

function subscribeMotion(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

const css = `
.hb-ub5 {
  --hb-ub5-a: #ff4d4d;
  --hb-ub5-c: #2c4270;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 10;
  min-height: 170px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: radial-gradient(120% 90% at 30% 0%, #0d1220, #08090c 70%);
  color: #ededed;
  font-family: inherit;
}
.hb-ub5 *, .hb-ub5 *::before, .hb-ub5 *::after { box-sizing: border-box; }
.hb-ub5-stage { position: absolute; inset: 0; outline: none; cursor: crosshair; }
.hb-ub5-stage:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-ub5-a); border-radius: 13px; }
.hb-ub5-cv { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub5-head { position: absolute; left: 12px; top: 10px; display: flex; flex-direction: column; gap: 3px; pointer-events: none; }
.hb-ub5-t { font-size: 13px; font-weight: 600; line-height: 1.2; white-space: nowrap; }
.hb-ub5-s { font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8f8f8f; white-space: nowrap; }
.hb-ub5-lg {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 8px;
  width: 152px;
  padding: 7px 8px;
  border-radius: 9px;
  background: rgba(8, 9, 12, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.06);
  pointer-events: none;
}
.hb-ub5-bar {
  grid-column: 1 / span 2;
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--hb-ub5-c), var(--hb-ub5-a) 70%, #fff0e1);
}
.hb-ub5-lg span { font: 500 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-ub5-lg span:last-child { text-align: right; }
.hb-ub5-tip {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  min-width: 118px;
  padding: 7px 9px 8px;
  border-radius: 10px;
  background: rgba(14, 14, 16, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}
.hb-ub5-tip[data-on="true"] { opacity: 1; }
.hb-ub5-tn { display: block; font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8f8f8f; }
.hb-ub5-tv { display: flex; align-items: center; gap: 6px; margin-top: 5px; font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ub5-tv i { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-ub5-dot, var(--hb-ub5-a)); box-shadow: 0 0 8px var(--hb-ub5-dot, var(--hb-ub5-a)); }
.hb-ub5-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-ub5-tip { transition: none; }
}
`;

export function MapHeatDots({
  metric = "footfall",
  accent = "#ff4d4d",
  coldColor = "#2c4270",
  seed = 3,
  density = 58,
  title,
  subtitle,
  className = "",
  style,
  ...rest
}: MapHeatDotsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const tipRef = React.useRef<HTMLDivElement>(null);
  const tipName = React.useRef<HTMLSpanElement>(null);
  const tipVal = React.useRef<HTMLSpanElement>(null);
  const liveRef = React.useRef<HTMLSpanElement>(null);
  const reduced = React.useSyncExternalStore(subscribeMotion, () => window.matchMedia(RM_QUERY).matches, () => false);
  const info = METRICS[metric] ?? METRICS.footfall;
  const st = React.useRef({ metric, accent, cold: coldColor, reduced: false, redraw: () => {} });

  React.useEffect(() => {
    const s = st.current;
    s.metric = metric;
    s.accent = accent;
    s.cold = coldColor;
    s.reduced = reduced;
    s.redraw();
  }, [metric, accent, coldColor, reduced]);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !stage || !canvas || !ctx) return;
    const s = st.current;
    const spots = buildSpots(seed);
    let dots: Dot[] = [];
    let sea: number[] = [];
    let cols = 0;
    let rows = 0;
    let grid: number[] = [];
    let sp = 8;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let hover = -1;
    let hot: C3 = [255, 77, 77];
    let cold: C3 = [44, 66, 112];
    let colorsFor = "";

    const layout = () => {
      const r = root.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;
      w = r.width;
      h = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      sp = Math.max(5.5, w / Math.max(20, density));
      cols = Math.floor(w / sp);
      rows = Math.floor(h / sp);
      const ox = (w - (cols - 1) * sp) / 2;
      const oy = (h - (rows - 1) * sp) / 2;
      dots = [];
      sea = [];
      grid = new Array(cols * rows).fill(-1);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ox + i * sp;
          const y = oy + j * sp;
          const u = x / w;
          const v = y / h;
          if (!isLand(u, v, seed)) {
            if ((i + j) % 2 === 0) sea.push(x, y);
            continue;
          }
          let val = 0;
          let best = 0;
          let bestV = -1;
          spots.forEach((p, k) => {
            const d2 = ((u - p.u) * 1.6) ** 2 + (v - p.v) ** 2;
            const c = p.amp * Math.exp(-d2 / (2 * p.r * p.r));
            val += c;
            if (c > bestV) {
              bestV = c;
              best = k;
            }
          });
          val = Math.min(1, val * 0.8 + (rnd(seed, i, j) - 0.5) * 0.08 + 0.04);
          val = Math.max(0, val);
          grid[j * cols + i] = dots.length;
          dots.push({ x, y, val, ph: rnd(seed, i + 500, j) * Math.PI * 2, spot: best });
        }
      }
      return true;
    };

    const draw = (t: number) => {
      if (colorsFor !== s.accent + s.cold) {
        hot = parseColor(ctx, s.accent, [255, 77, 77]);
        cold = parseColor(ctx, s.cold, [44, 66, 112]);
        colorsFor = s.accent + s.cold;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      for (let i = 0; i < sea.length; i += 2) ctx.rect(sea[i] - 0.5, sea[i + 1] - 0.5, 1, 1);
      ctx.fillStyle = "rgba(127,179,255,0.09)";
      ctx.fill();
      const base = sp * 0.42;
      const time = s.reduced ? 0 : t / 1000;
      const buckets: Path2D[] = [];
      const B = 10;
      const S = 3;
      for (let i = 0; i < B * S; i++) buckets.push(new Path2D());
      const glow = new Path2D();
      for (const d of dots) {
        const wave = s.reduced ? 0.5 : 0.5 + 0.5 * Math.sin(time * 1.7 - d.x * 0.018 - d.y * 0.012 + d.ph * 0.35);
        const vb = Math.min(B - 1, Math.floor(d.val * B));
        const sb = Math.min(S - 1, Math.floor(wave * S));
        const r = base * (0.42 + 0.58 * d.val) * (0.9 + 0.12 * wave * d.val);
        const p = buckets[vb * S + sb];
        p.moveTo(d.x + r, d.y);
        p.arc(d.x, d.y, r, 0, Math.PI * 2);
        if (d.val > 0.72) {
          glow.moveTo(d.x + r * 2.4, d.y);
          glow.arc(d.x, d.y, r * 2.4, 0, Math.PI * 2);
        }
      }
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(${hot[0]},${hot[1]},${hot[2]},0.05)`;
      ctx.fill(glow);
      ctx.globalCompositeOperation = "source-over";
      for (let vb = 0; vb < B; vb++) {
        const c = ramp(cold, hot, (vb + 0.5) / B);
        for (let sb = 0; sb < S; sb++) {
          const a = 0.6 + ((vb + 0.5) / B) * 0.3 + (sb / (S - 1)) * 0.12;
          ctx.fillStyle = `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${Math.min(1, a).toFixed(3)})`;
          ctx.fill(buckets[vb * S + sb]);
        }
      }
      if (hover >= 0 && dots[hover]) {
        const d = dots[hover];
        ctx.beginPath();
        ctx.arc(d.x, d.y, sp * 0.95, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
    };

    const frame = (t: number) => {
      raf = 0;
      draw(t);
      if (visible && !s.reduced) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!visible) return;
      if (s.reduced) {
        draw(0);
        return;
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const showTip = (idx: number) => {
      hover = idx;
      const tip = tipRef.current;
      if (!tip) return;
      if (idx < 0) {
        tip.dataset.on = "false";
        if (s.reduced) draw(0);
        return;
      }
      const d = dots[idx];
      const name = spots[d.spot].name;
      const value = format(s.metric as HeatMetric, d.val);
      if (tipName.current) tipName.current.textContent = name;
      if (tipVal.current) tipVal.current.textContent = value;
      const c = ramp(cold, hot, d.val);
      tip.style.setProperty("--hb-ub5-dot", `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`);
      const tw = tip.offsetWidth || 130;
      const th = tip.offsetHeight || 46;
      let x = d.x + 12;
      let y = d.y - th - 10;
      if (x + tw > w - 6) x = d.x - tw - 12;
      if (y < 6) y = d.y + 12;
      tip.style.transform = `translate(${Math.round(Math.max(6, x))}px, ${Math.round(Math.min(h - th - 6, y))}px)`;
      tip.dataset.on = "true";
      if (s.reduced) draw(0);
    };

    const nearest = (x: number, y: number) => {
      const ox = (w - (cols - 1) * sp) / 2;
      const oy = (h - (rows - 1) * sp) / 2;
      const ci = Math.round((x - ox) / sp);
      const cj = Math.round((y - oy) / sp);
      let best = -1;
      let bd = Infinity;
      for (let j = cj - 1; j <= cj + 1; j++) {
        for (let i = ci - 1; i <= ci + 1; i++) {
          if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
          const k = grid[j * cols + i];
          if (k < 0) continue;
          const dd = (dots[k].x - x) ** 2 + (dots[k].y - y) ** 2;
          if (dd < bd) {
            bd = dd;
            best = k;
          }
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      showTip(nearest(e.clientX - r.left, e.clientY - r.top));
    };
    const onLeave = () => {
      if (document.activeElement !== stage) showTip(-1);
    };
    const onFocus = () => {
      if (hover >= 0) return;
      let best = 0;
      dots.forEach((d, k) => {
        if (d.val > dots[best].val) best = k;
      });
      showTip(best);
    };
    const onBlur = () => showTip(-1);
    const onKey = (e: KeyboardEvent) => {
      const dirs: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (e.key === "Escape") {
        showTip(-1);
        return;
      }
      const dir = dirs[e.key];
      if (!dir || !dots.length) return;
      e.preventDefault();
      const cur = dots[hover >= 0 ? hover : 0];
      const ox = (w - (cols - 1) * sp) / 2;
      const oy = (h - (rows - 1) * sp) / 2;
      let i = Math.round((cur.x - ox) / sp);
      let j = Math.round((cur.y - oy) / sp);
      const step = e.shiftKey ? 4 : 2;
      for (let n = 0; n < cols + rows; n++) {
        i += dir[0] * step;
        j += dir[1] * step;
        if (i < 0 || j < 0 || i >= cols || j >= rows) return;
        const k = grid[j * cols + i];
        if (k >= 0) {
          showTip(k);
          const d = dots[k];
          if (liveRef.current) liveRef.current.textContent = `${spots[d.spot].name}: ${format(s.metric as HeatMetric, d.val)}`;
          return;
        }
      }
    };

    s.redraw = () => {
      if (hover >= 0) showTip(hover);
      if (s.reduced) draw(0);
      else kick();
    };

    s.reduced = window.matchMedia(RM_QUERY).matches;
    const resize = () => {
      if (!layout()) return;
      hover = -1;
      if (tipRef.current) tipRef.current.dataset.on = "false";
      draw(performance.now());
    };
    resize();
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("focus", onFocus);
    stage.addEventListener("blur", onBlur);
    stage.addEventListener("keydown", onKey);
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(root);
    kick();
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("focus", onFocus);
      stage.removeEventListener("blur", onBlur);
      stage.removeEventListener("keydown", onKey);
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      s.redraw = () => {};
    };
  }, [seed, density]);

  return (
    <div
      ref={rootRef}
      className={`hb-ub5 ${className}`.trim()}
      style={{ "--hb-ub5-a": accent, "--hb-ub5-c": coldColor, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-map-heat-dots" precedence="default">
        {css}
      </style>
      <div
        ref={stageRef}
        className="hb-ub5-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="heat map"
        aria-label={`${title ?? info.label} heat map. Use arrow keys to read values.`}
      >
        <canvas ref={canvasRef} className="hb-ub5-cv" aria-hidden="true" />
      </div>
      <div className="hb-ub5-head">
        <span className="hb-ub5-t">{title ?? info.label}</span>
        <span className="hb-ub5-s">{subtitle ?? info.sub}</span>
      </div>
      <div className="hb-ub5-lg" aria-hidden="true">
        <i className="hb-ub5-bar" />
        <span>{format(metric, 0).split(" ")[0]}</span>
        <span>{format(metric, 1)}</span>
      </div>
      <div ref={tipRef} className="hb-ub5-tip" data-on="false" aria-hidden="true">
        <span ref={tipName} className="hb-ub5-tn" />
        <span className="hb-ub5-tv">
          <i />
          <span ref={tipVal} />
        </span>
      </div>
      <span ref={liveRef} className="hb-ub5-sr" aria-live="polite" />
    </div>
  );
}

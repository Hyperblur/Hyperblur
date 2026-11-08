"use client";

import * as React from "react";

export interface SpinFinish {
  name: string;
  color: string;
  stock: number;
}

export interface SpinSize {
  label: string;
  price: number;
  height: number;
}

export interface SpinConfiguration {
  finish: string;
  size: string;
  engraving: string;
  total: number;
}

export interface ShopSpinConfiguratorProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  name?: string;
  blurb?: string;
  finishes?: SpinFinish[];
  sizes?: SpinSize[];
  engravingPrice?: number;
  maxEngraving?: number;
  currency?: string;
  autoSpin?: boolean;
  accent?: string;
  onAddToCart?: (config: SpinConfiguration) => void;
}

const defaultFinishes: SpinFinish[] = [
  { name: "Glacier", color: "#9cc3d8", stock: 42 },
  { name: "Ember", color: "#d9643a", stock: 4 },
  { name: "Moss", color: "#5d7552", stock: 18 },
  { name: "Graphite", color: "#3a3d42", stock: 63 },
  { name: "Sand", color: "#d8c3a0", stock: 0 },
];

const defaultSizes: SpinSize[] = [
  { label: "500 ml", price: 34, height: 290 },
  { label: "750 ml", price: 38, height: 350 },
  { label: "1 L", price: 44, height: 410 },
];

const css = `
.hb-we11 {
  --hb-we11-accent: #f97316;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0b0b0b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we11 *, .hb-we11 *::before, .hb-we11 *::after { box-sizing: border-box; }
.hb-we11-inner { display: grid; gap: clamp(24px, 4cqi, 48px); max-width: 1120px; margin: 0 auto; padding: clamp(48px, 7cqi, 96px) clamp(18px, 4cqi, 40px); }
.hb-we11-media { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 12px; min-width: 0; }
.hb-we11-strip { display: grid; gap: 8px; align-content: start; }
.hb-we11-th { position: relative; aspect-ratio: 1; padding: 0; border: 0; border-radius: 12px; cursor: pointer; overflow: hidden; background: #141414; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); transition: box-shadow .2s ease, transform .2s ease; }
.hb-we11-th svg { width: 100%; height: 100%; display: block; }
.hb-we11-th:hover { transform: translateY(-1px); }
.hb-we11-th[aria-pressed="true"] { box-shadow: inset 0 0 0 1.5px var(--hb-we11-accent); }
.hb-we11-th:focus-visible { outline: 2px solid var(--hb-we11-accent); outline-offset: 2px; }
.hb-we11-th span { position: absolute; left: 0; right: 0; bottom: 3px; font-size: 9.5px; color: #8f8f8f; text-align: center; }
.hb-we11-stage { position: relative; aspect-ratio: 1; min-width: 0; border-radius: 24px; overflow: hidden; touch-action: pan-y; cursor: grab; outline: none;
  background: radial-gradient(70% 60% at 50% 40%, #222 0%, #121212 70%); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.05); }
.hb-we11-stage[data-drag="true"] { cursor: grabbing; }
.hb-we11-stage:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-we11-accent); }
.hb-we11-stage > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-we11-hint { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px; background: rgba(10,10,10,.6); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); color: #d4d4d4; font-size: 12px; white-space: nowrap; pointer-events: none; }
.hb-we11-hint b { font-family: var(--font-mono, ui-monospace, monospace); font-weight: 500; color: #fff; min-width: 34px; text-align: right; font-variant-numeric: tabular-nums; }
.hb-we11-dial { position: absolute; left: 0; right: 0; top: 14px; height: 14px; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent); pointer-events: none; }
.hb-we11-dial i { position: absolute; left: 0; top: 0; width: 200%; height: 100%; font-style: normal; background: repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 10px); transform: translateX(var(--hb-we11-dx)); }
.hb-we11-dial::after { content: ""; position: absolute; left: 50%; top: 0; width: 2px; height: 14px; margin-left: -1px; border-radius: 2px; background: var(--hb-we11-accent); }
.hb-we11-info { display: grid; gap: 22px; align-content: start; min-width: 0; }
.hb-we11-brand { margin: 0 0 6px; color: #8f8f8f; font-size: 13px; font-weight: 500; }
.hb-we11-name { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(26px, 3.6cqi, 38px); font-weight: 600; line-height: 1.05; letter-spacing: -.03em; }
.hb-we11-blurb { margin: 10px 0 0; color: #a1a1a1; font-size: 14.5px; line-height: 1.6; max-width: 46ch; }
.hb-we11-price { display: inline-block; font-size: 30px; font-weight: 650; letter-spacing: -.03em; font-variant-numeric: tabular-nums; animation: hb-we11-tick .45s cubic-bezier(.2,.8,.2,1) both; }
.hb-we11-g { display: grid; gap: 10px; }
.hb-we11-gl { display: flex; justify-content: space-between; gap: 12px; color: #8f8f8f; font-size: 13px; }
.hb-we11-gl b { color: #ededed; font-weight: 500; }
.hb-we11-stock { font-size: 12px; }
.hb-we11-stock[data-low="true"] { color: #fbbf24; }
.hb-we11-stock[data-out="true"] { color: #f87171; }
.hb-we11-sw { display: flex; flex-wrap: wrap; gap: 10px; }
.hb-we11-swb { position: relative; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; background: var(--hb-we11-c); box-shadow: inset 0 -6px 10px rgba(0,0,0,.3), inset 0 4px 8px rgba(255,255,255,.25), 0 0 0 1px rgba(255,255,255,.1); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
.hb-we11-swb::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; box-shadow: 0 0 0 2px var(--hb-we11-accent); opacity: 0; transform: scale(.85); transition: opacity .25s ease, transform .35s cubic-bezier(.3,1.5,.5,1); }
.hb-we11-swb[aria-checked="true"]::after { opacity: 1; transform: none; }
.hb-we11-swb:hover { transform: scale(1.08); }
.hb-we11-swb:disabled { cursor: not-allowed; opacity: .45; }
.hb-we11-swb:disabled::before { content: ""; position: absolute; left: 50%; top: 4px; bottom: 4px; width: 2px; background: #f4f4f4; transform: rotate(45deg); border-radius: 2px; }
.hb-we11-swb:focus-visible { outline: 2px solid var(--hb-we11-accent); outline-offset: 6px; }
.hb-we11-sizes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.hb-we11-sz { display: grid; gap: 2px; justify-items: start; padding: 12px; border: 0; border-radius: 12px; cursor: pointer; text-align: left; font: inherit; color: #ededed; background: #141414; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); transition: box-shadow .2s ease, background .2s ease; }
.hb-we11-sz b { font-size: 14px; font-weight: 600; }
.hb-we11-sz span { color: #8f8f8f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-we11-sz[aria-checked="true"] { background: color-mix(in srgb, var(--hb-we11-accent) 8%, #141414); box-shadow: inset 0 0 0 1.5px var(--hb-we11-accent); }
.hb-we11-sz:focus-visible { outline: 2px solid var(--hb-we11-accent); outline-offset: 2px; }
.hb-we11-eng { display: grid; gap: 10px; padding: 14px; border-radius: 14px; background: #121212; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); }
.hb-we11-tg { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0; border: 0; background: none; cursor: pointer; color: #ededed; font: inherit; font-size: 14px; font-weight: 500; text-align: left; }
.hb-we11-tg small { display: block; color: #8f8f8f; font-size: 12px; font-weight: 400; margin-top: 2px; }
.hb-we11-sw2 { position: relative; flex: none; width: 40px; height: 24px; border-radius: 99px; background: #2a2a2a; transition: background .25s ease; }
.hb-we11-sw2::after { content: ""; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.4); transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.hb-we11-tg[aria-checked="true"] .hb-we11-sw2 { background: var(--hb-we11-accent); }
.hb-we11-tg[aria-checked="true"] .hb-we11-sw2::after { transform: translateX(16px); }
.hb-we11-tg:focus-visible { outline: 2px solid var(--hb-we11-accent); outline-offset: 4px; border-radius: 6px; }
.hb-we11-in { display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 12px; border-radius: 10px; background: #0b0b0b; box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); animation: hb-we11-open .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-we11-in:focus-within { box-shadow: inset 0 0 0 1.5px var(--hb-we11-accent); }
.hb-we11-in input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; color: #ededed; font-family: var(--font-mono, ui-monospace, monospace); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
.hb-we11-in span { color: #6b6b6b; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-we11-sum { margin: 0; color: #a1a1a1; font-size: 13.5px; line-height: 1.55; }
.hb-we11-sum b { color: #ededed; font-weight: 600; }
.hb-we11-add { position: relative; display: flex; align-items: center; justify-content: center; gap: 10px; height: 52px; border: 0; border-radius: 14px; cursor: pointer; overflow: hidden; color: #140800; font: inherit; font-size: 15px; font-weight: 650; background: var(--hb-we11-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 14px 30px -14px var(--hb-we11-accent); transition: transform .2s cubic-bezier(.2,.8,.2,1), filter .2s ease, background .3s ease, color .3s ease; }
.hb-we11-add:hover:not(:disabled) { filter: brightness(1.07); transform: translateY(-1px); }
.hb-we11-add:active:not(:disabled) { transform: scale(.985); }
.hb-we11-add:disabled { opacity: .5; cursor: not-allowed; }
.hb-we11-add[data-done="true"] { background: #ededed; color: #0b0b0b; }
.hb-we11-add:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-we11-add svg { width: 18px; height: 18px; }
.hb-we11-add[data-done="true"] svg path { stroke-dasharray: 20; stroke-dashoffset: 20; animation: hb-we11-check .45s .1s ease forwards; }
.hb-we11-eng-text { font-family: var(--font-mono, ui-monospace, monospace); letter-spacing: .2em; }
@keyframes hb-we11-tick { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@keyframes hb-we11-open { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes hb-we11-check { to { stroke-dashoffset: 0; } }
@container (min-width: 860px) {
  .hb-we11-inner { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: start; }
}
@container (max-width: 480px) {
  .hb-we11-media { grid-template-columns: 1fr; }
  .hb-we11-strip { grid-template-columns: repeat(4, 1fr); order: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we11 *, .hb-we11 *::before, .hb-we11 *::after { transition: none !important; animation: none !important; }
}
`;

function shade(hex: string, amt: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (amt > 0 ? (255 - c) * amt : c * amt))));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function Bottle({ angle, color, height, engraving, brand, uid, small }: { angle: number; color: string; height: number; engraving: string; brand: string; uid: string; small?: boolean }) {
  const cx = 200;
  const r = 64;
  const bottom = 470;
  const top = bottom - height;
  const rad = (angle * Math.PI) / 180;
  const ridges = Array.from({ length: 16 }, (_, i) => {
    const t = rad + (i * Math.PI * 2) / 16;
    const c = Math.cos(t);
    return { x: cx + r * Math.sin(t), c };
  }).filter((p) => p.c > 0.05);
  const face = (offset: number) => {
    const t = rad + offset;
    return { x: cx + r * 0.92 * Math.sin(t), c: Math.cos(t) };
  };
  const logo = face(0);
  const eng = face(0);
  const g = `${uid}b${small ? "s" : "l"}`;
  return (
    <svg viewBox="0 0 400 520" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor={shade(color, -0.55)} />
          <stop offset=".3" stopColor={shade(color, 0.28)} />
          <stop offset=".42" stopColor={shade(color, 0.05)} />
          <stop offset=".8" stopColor={shade(color, -0.35)} />
          <stop offset="1" stopColor={shade(color, -0.6)} />
        </linearGradient>
        <linearGradient id={`${g}c`} x1="0" x2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset=".32" stopColor="#4a4a4a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>
      <ellipse cx={cx} cy={bottom + 14} rx={r * 1.3} ry="10" fill="rgba(0,0,0,.55)" />
      <path d={`M ${cx - r} ${top + 40} Q ${cx - r} ${top} ${cx - 40} ${top - 6} L ${cx + 40} ${top - 6} Q ${cx + r} ${top} ${cx + r} ${top + 40} L ${cx + r} ${bottom - 16} Q ${cx + r} ${bottom} ${cx + r - 16} ${bottom} L ${cx - r + 16} ${bottom} Q ${cx - r} ${bottom} ${cx - r} ${bottom - 16} Z`} fill={`url(#${g})`} />
      <rect x={cx - 42} y={top - 58} width="84" height="54" rx="12" fill={`url(#${g}c)`} />
      <rect x={cx - 30} y={top - 74} width="60" height="20" rx="8" fill={`url(#${g}c)`} />
      <rect x={cx - r} y={bottom - 70} width={r * 2} height="26" fill="rgba(0,0,0,.18)" />
      {ridges.map((p, i) => (
        <rect key={i} x={(p.x - 1.2 * p.c).toFixed(2)} y={bottom - 68} width={(2.4 * p.c).toFixed(2)} height="22" fill="rgba(255,255,255,.22)" opacity={p.c.toFixed(2)} />
      ))}
      {logo.c > 0.08 ? (
        <text
          x="0"
          y="0"
          transform={`translate(${logo.x.toFixed(2)} ${(top + 80).toFixed(1)}) scale(${logo.c.toFixed(3)} 1)`}
          textAnchor="middle"
          fill="rgba(255,255,255,.85)"
          fontSize="22"
          fontWeight="700"
          letterSpacing="4"
          fontFamily="inherit"
          opacity={Math.min(1, logo.c * 1.4).toFixed(2)}
        >
          {brand.toUpperCase()}
        </text>
      ) : null}
      {engraving && eng.c > 0.08 ? (
        <text
          className="hb-we11-eng-text"
          x="0"
          y="0"
          transform={`translate(${eng.x.toFixed(2)} ${(bottom - 100).toFixed(1)}) scale(${(eng.c * Math.min(1, 9 / Math.max(1, engraving.length))).toFixed(3)} 1)`}
          textAnchor="middle"
          fill="rgba(0,0,0,.45)"
          stroke="rgba(255,255,255,.25)"
          strokeWidth=".6"
          fontSize="18"
          fontWeight="600"
          opacity={Math.min(1, eng.c * 1.4).toFixed(2)}
        >
          {engraving.toUpperCase()}
        </text>
      ) : null}
      <rect x={cx - r + 10} y={top + 20} width="10" height={height - 60} rx="5" fill="rgba(255,255,255,.18)" />
    </svg>
  );
}

const presets = [
  { label: "Front", angle: 0 },
  { label: "Side", angle: 90 },
  { label: "Back", angle: 180 },
  { label: "Three-quarter", angle: 320 },
];

export function ShopSpinConfigurator({
  brand = "Kova",
  name = "Kova Everyday Bottle",
  blurb = "Double-wall steel that keeps water cold for 24 hours. Drag the bottle to turn it, then make it yours with a laser engraving.",
  finishes = defaultFinishes,
  sizes = defaultSizes,
  engravingPrice = 8,
  maxEngraving = 12,
  currency = "$",
  autoSpin = true,
  accent = "#f97316",
  onAddToCart,
  className,
  style,
  ...rest
}: ShopSpinConfiguratorProps) {
  const uid = React.useId().replace(/:/g, "");
  const firstOk = Math.max(0, finishes.findIndex((f) => f.stock > 0));
  const [finishIdx, setFinishIdx] = React.useState(firstOk);
  const [sizeIdx, setSizeIdx] = React.useState(Math.min(1, sizes.length - 1));
  const [engraveOn, setEngraveOn] = React.useState(true);
  const [text, setText] = React.useState("Maya");
  const [angle, setAngle] = React.useState(320);
  const [dragging, setDragging] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const angleRef = React.useRef(320);
  const touched = React.useRef(false);
  const drag = React.useRef({ on: false, x: 0, a: 0 });
  const tween = React.useRef(0);
  const doneTimer = React.useRef(0);

  const finish = finishes[finishIdx] ?? finishes[0];
  const size = sizes[sizeIdx] ?? sizes[0];
  const engraving = engraveOn ? text.trim().slice(0, maxEngraving) : "";
  const total = size.price + (engraving ? engravingPrice : 0);

  const setA = React.useCallback((a: number) => {
    const v = ((a % 360) + 360) % 360;
    angleRef.current = v;
    setAngle(v);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!autoSpin || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    let visible = true;
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true;
    });
    io.observe(el);
    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 0;
      last = now;
      if (visible && !touched.current) setA(angleRef.current + dt * 0.03);
      if (!touched.current) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [autoSpin, setA]);

  React.useEffect(
    () => () => {
      cancelAnimationFrame(tween.current);
      window.clearTimeout(doneTimer.current);
    },
    [],
  );

  const turnTo = (target: number) => {
    touched.current = true;
    cancelAnimationFrame(tween.current);
    const from = angleRef.current;
    let delta = ((target - from + 540) % 360) - 180;
    if (Math.abs(delta) < 0.5) delta = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || delta === 0) {
      setA(target);
      return;
    }
    let start = -1;
    const dur = 650;
    const step = (now: number) => {
      if (start < 0) start = now;
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setA(from + delta * e);
      if (t < 1) tween.current = requestAnimationFrame(step);
    };
    tween.current = requestAnimationFrame(step);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    cancelAnimationFrame(tween.current);
    drag.current = { on: true, x: e.clientX, a: angleRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    setA(drag.current.a - (e.clientX - drag.current.x) * 0.7);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    drag.current.on = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const add = () => {
    if (!finish || finish.stock <= 0) return;
    onAddToCart?.({ finish: finish.name, size: size.label, engraving, total });
    setDone(true);
    window.clearTimeout(doneTimer.current);
    doneTimer.current = window.setTimeout(() => setDone(false), 2400);
  };

  const radioKeys = (e: React.KeyboardEvent, count: number, idx: number, set: (i: number) => void, ok: (i: number) => boolean = () => true) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    let n = idx;
    for (let s = 0; s < count; s++) {
      n = (n + dir + count) % count;
      if (ok(n)) break;
    }
    set(n);
    const group = (e.currentTarget as HTMLElement).parentElement;
    group?.querySelectorAll<HTMLButtonElement>("button")[n]?.focus();
  };

  const stockLabel = finish.stock <= 0 ? "Sold out" : finish.stock < 6 ? `Only ${finish.stock} left` : "In stock";
  const rounded = Math.round(angle);

  return (
    <section
      className={["hb-we11", className].filter(Boolean).join(" ")}
      style={{ "--hb-we11-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-spin-configurator" precedence="default">{css}</style>
      <div className="hb-we11-inner">
        <div className="hb-we11-media">
          <div className="hb-we11-strip" role="group" aria-label="Views">
            {presets.map((p) => (
              <button key={p.label} type="button" className="hb-we11-th" aria-pressed={Math.abs(((angle - p.angle + 540) % 360) - 180) < 4} aria-label={`${p.label} view`} onClick={() => turnTo(p.angle)}>
                <Bottle angle={p.angle} color={finish.color} height={size.height} engraving={engraving} brand={brand} uid={`${uid}${p.angle}`} small />
              </button>
            ))}
          </div>
          <div
            ref={stageRef}
            className="hb-we11-stage"
            data-drag={dragging ? "true" : "false"}
            role="slider"
            tabIndex={0}
            aria-label={`Rotate ${name}`}
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={rounded}
            aria-valuetext={`${rounded} degrees`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                touched.current = true;
                setA(angleRef.current + (e.key === "ArrowRight" ? -15 : 15));
              } else if (e.key === "Home") {
                e.preventDefault();
                turnTo(0);
              }
            }}
          >
            <div className="hb-we11-dial" aria-hidden="true">
              <i style={{ "--hb-we11-dx": `${(-((angle * 2) % 100)).toFixed(1)}px` } as React.CSSProperties} />
            </div>
            <Bottle angle={angle} color={finish.color} height={size.height} engraving={engraving} brand={brand} uid={uid} />
            <span className="hb-we11-hint" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8a6 3 0 0 0 12 0M12 6l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Drag to turn
              <b>{rounded}°</b>
            </span>
          </div>
        </div>
        <div className="hb-we11-info">
          <div>
            <p className="hb-we11-brand">{brand} · Drinkware</p>
            <h2 className="hb-we11-name">{name}</h2>
            <p className="hb-we11-blurb">{blurb}</p>
          </div>
          <span className="hb-we11-price" key={total} aria-live="polite">{currency}{total}</span>
          <div className="hb-we11-g">
            <div className="hb-we11-gl">
              <span>Finish <b>{finish.name}</b></span>
              <span className="hb-we11-stock" data-low={finish.stock > 0 && finish.stock < 6 ? "true" : "false"} data-out={finish.stock <= 0 ? "true" : "false"}>{stockLabel}</span>
            </div>
            <div className="hb-we11-sw" role="radiogroup" aria-label="Finish">
              {finishes.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  role="radio"
                  aria-checked={i === finishIdx}
                  aria-label={`${f.name}${f.stock <= 0 ? ", sold out" : ""}`}
                  tabIndex={i === finishIdx ? 0 : -1}
                  disabled={f.stock <= 0}
                  className="hb-we11-swb"
                  style={{ "--hb-we11-c": f.color } as React.CSSProperties}
                  onClick={() => setFinishIdx(i)}
                  onKeyDown={(e) => radioKeys(e, finishes.length, i, setFinishIdx, (n) => finishes[n].stock > 0)}
                />
              ))}
            </div>
          </div>
          <div className="hb-we11-g">
            <div className="hb-we11-gl"><span>Size <b>{size.label}</b></span></div>
            <div className="hb-we11-sizes" role="radiogroup" aria-label="Size">
              {sizes.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  role="radio"
                  aria-checked={i === sizeIdx}
                  tabIndex={i === sizeIdx ? 0 : -1}
                  className="hb-we11-sz"
                  onClick={() => setSizeIdx(i)}
                  onKeyDown={(e) => radioKeys(e, sizes.length, i, setSizeIdx)}
                >
                  <b>{s.label}</b>
                  <span>{currency}{s.price}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hb-we11-eng">
            <button type="button" role="switch" aria-checked={engraveOn} className="hb-we11-tg" onClick={() => setEngraveOn((v) => !v)}>
              <span>
                Laser engraving
                <small>Up to {maxEngraving} characters, +{currency}{engravingPrice}</small>
              </span>
              <span className="hb-we11-sw2" aria-hidden="true" />
            </button>
            {engraveOn ? (
              <label className="hb-we11-in">
                <input
                  value={text}
                  maxLength={maxEngraving}
                  aria-label="Engraving text"
                  placeholder="Your name"
                  onChange={(e) => {
                    setText(e.target.value);
                    turnTo(0);
                  }}
                />
                <span>{text.length}/{maxEngraving}</span>
              </label>
            ) : null}
          </div>
          <p className="hb-we11-sum">
            <b>{name}</b>, {size.label} in {finish.name}{engraving ? <>, engraved <b>{engraving.toUpperCase()}</b></> : null}. Ships in {engraving ? "3 days" : "1 day"}.
          </p>
          <button type="button" className="hb-we11-add" data-done={done ? "true" : "false"} disabled={finish.stock <= 0} onClick={add} aria-live="polite">
            {done ? (
              <>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Added to cart
              </>
            ) : (
              <>Add to cart · {currency}{total}</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface MapPin {
  id: string;
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  rating?: number;
  meta?: string;
  color?: string;
}

export interface MapPinBoardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  pins?: MapPin[];
  accent?: string;
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onPinSelect?: (pin: MapPin) => void;
  label?: string;
  seed?: number;
}

export const defaultMapPins: MapPin[] = [
  { id: "lumen", x: 22, y: 34, title: "Lumen Roasters", subtitle: "Coffee · Open until 6 PM", rating: 4.8, meta: "3 min walk" },
  { id: "pier", x: 68, y: 28, title: "Pier 9 Market", subtitle: "Food hall · Open now", rating: 4.6, meta: "7 min walk" },
  { id: "halden", x: 33, y: 76, title: "Halden Books", subtitle: "Bookshop · Closes 8 PM", rating: 4.9, meta: "5 min walk" },
  { id: "northgate", x: 88, y: 82, title: "Northgate Climbing", subtitle: "Gym · Open 24 hours", rating: 4.7, meta: "11 min walk" },
  { id: "juniper", x: 12, y: 66, title: "Juniper Studio", subtitle: "Yoga · Next class 18:30", rating: 4.9, meta: "9 min walk" },
];

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

type Rect = { x: number; y: number; w: number; h: number; tone: number };

function buildMap(seed: number) {
  const xs = [0];
  while (xs[xs.length - 1] < 400) xs.push(Math.min(400, xs[xs.length - 1] + 34 + Math.round(rnd(seed, xs.length, 1) * 20)));
  const ys = [0];
  while (ys[ys.length - 1] < 250) ys.push(Math.min(250, ys[ys.length - 1] + 28 + Math.round(rnd(seed, ys.length, 2) * 16)));
  const blocks: Rect[] = [];
  const parks: Rect[] = [];
  const trees: [number, number][] = [];
  const pc = 1 + Math.floor(rnd(seed, 3) * 2);
  const pr = 1 + Math.floor(rnd(seed, 4) * 2);
  for (let j = 0; j < ys.length - 1; j++) {
    for (let i = 0; i < xs.length - 1; i++) {
      const x = xs[i] + 3;
      const y = ys[j] + 3;
      const w = xs[i + 1] - xs[i] - 6;
      const h = ys[j + 1] - ys[j] - 6;
      if (w < 6 || h < 6) continue;
      if (i >= pc && i < pc + 2 && j === pr) {
        parks.push({ x, y, w, h, tone: 0 });
        for (let q = 0; q < 7; q++) trees.push([x + 4 + rnd(seed, i * 50 + j, q) * (w - 8), y + 4 + rnd(seed, i * 50 + j, q + 20) * (h - 8)]);
        continue;
      }
      const r = rnd(seed, i * 31 + j, 5);
      const tone = rnd(seed, i * 31 + j, 6);
      if (r < 0.4 && w > 30) {
        const m = Math.round(w * (0.4 + rnd(seed, i, j) * 0.2));
        blocks.push({ x, y, w: m - 2, h, tone }, { x: x + m + 2, y, w: w - m - 2, h, tone: rnd(seed, i * 31 + j, 7) });
      } else if (r < 0.7 && h > 26) {
        const m = Math.round(h * 0.5);
        blocks.push({ x, y, w, h: m - 2, tone }, { x, y: y + m + 2, w, h: h - m - 2, tone: rnd(seed, i * 31 + j, 8) });
      } else {
        blocks.push({ x, y, w, h, tone });
      }
    }
  }
  const a = 150 + rnd(seed, 9) * 40;
  const b = 110 + rnd(seed, 10) * 40;
  const river = `M-20 ${(a + 30).toFixed(1)} C 90 ${(a + 50).toFixed(1)}, 150 ${(b - 20).toFixed(1)}, 230 ${b.toFixed(1)} S 360 ${(b + 70).toFixed(1)}, 420 ${(b + 40).toFixed(1)}`;
  return { blocks, parks, trees, river, xs, ys };
}

const css = `
.hb-ub3 {
  --hb-ub3-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 10;
  min-height: 170px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: #0b0d12;
  color: #ededed;
  font-family: inherit;
}
.hb-ub3 *, .hb-ub3 *::before, .hb-ub3 *::after { box-sizing: border-box; }
.hb-ub3-svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub3-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(5, 6, 9, 0.55));
}
.hb-ub3-chip {
  position: absolute;
  left: 10px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  background: rgba(9, 10, 13, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #a1a1a1;
  pointer-events: none;
  z-index: 3;
}
.hb-ub3-chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ub3-a); box-shadow: 0 0 8px var(--hb-ub3-a); }
.hb-ub3-pin {
  --hb-ub3-c: var(--hb-ub3-a);
  position: absolute;
  z-index: 1;
  display: grid;
  place-items: end center;
  width: 30px;
  height: 34px;
  margin: 0;
  padding: 0 0 2px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  transform: translate(-50%, -100%);
  -webkit-tap-highlight-color: transparent;
}
.hb-ub3-pin svg {
  position: relative;
  z-index: 1;
  width: 18px;
  height: 23px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  transform-origin: 50% 100%;
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease;
}
.hb-ub3-pin:hover svg, .hb-ub3-pin:focus-visible svg, .hb-ub3-pin[data-on="true"] svg {
  transform: translateY(-3px) scale(1.18);
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 10px color-mix(in srgb, var(--hb-ub3-c) 60%, transparent));
}
.hb-ub3-pin[data-on="true"] { z-index: 2; }
.hb-ub3-pin:focus-visible { outline: none; }
.hb-ub3-pin:focus-visible::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 10px;
  box-shadow: 0 0 0 2px var(--hb-ub3-c);
}
.hb-ub3-ring {
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 22px;
  height: 8px;
  margin-left: -11px;
  border-radius: 50%;
  border: 1.5px solid var(--hb-ub3-c);
  opacity: 0;
  animation: hb-ub3-pulse 2.4s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
  animation-delay: var(--hb-ub3-d, 0s);
}
.hb-ub3-base {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 8px;
  height: 3px;
  margin-left: -4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
}
.hb-ub3-card {
  position: absolute;
  z-index: 4;
  width: 176px;
  padding: 9px 11px 10px;
  border-radius: 12px;
  background: rgba(17, 17, 17, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  pointer-events: none;
  animation: hb-ub3-in 0.26s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-ub3-card[data-v="above"] { transform: translate(var(--hb-ub3-tx), calc(-100% - 32px)); }
.hb-ub3-card[data-v="below"] { transform: translate(var(--hb-ub3-tx), 10px); }
.hb-ub3-card[data-h="start"] { --hb-ub3-tx: -18px; }
.hb-ub3-card[data-h="center"] { --hb-ub3-tx: -50%; }
.hb-ub3-card[data-h="end"] { --hb-ub3-tx: calc(-100% + 18px); }
.hb-ub3-ct { display: block; font-size: 12.5px; font-weight: 600; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub3-cs { display: block; margin-top: 2px; font-size: 10.5px; color: #a1a1a1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub3-cm { display: flex; align-items: center; gap: 8px; margin-top: 7px; font-size: 10.5px; color: #8f8f8f; white-space: nowrap; }
.hb-ub3-cr { display: inline-flex; align-items: center; gap: 3px; color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ub3-cr svg { width: 10px; height: 10px; color: #ffc24d; }
.hb-ub3-cb { width: 3px; height: 3px; border-radius: 50%; background: #5a5a5a; }
@keyframes hb-ub3-pulse {
  0% { opacity: 0.9; transform: scale(0.35); }
  80% { opacity: 0; transform: scale(1.7); }
  100% { opacity: 0; transform: scale(1.7); }
}
@keyframes hb-ub3-in {
  from { opacity: 0; translate: 0 5px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ub3-ring { animation: none; opacity: 0.5; transform: scale(1.1); }
  .hb-ub3-card { animation: none; }
  .hb-ub3-pin svg { transition: none; }
}
`;

export function MapPinBoard({
  pins = defaultMapPins,
  accent = "#2f7bff",
  selectedId,
  defaultSelectedId = null,
  onPinSelect,
  label = "Places nearby",
  seed = 4,
  className = "",
  style,
  ...rest
}: MapPinBoardProps) {
  const map = React.useMemo(() => buildMap(seed), [seed]);
  const [innerSel, setInnerSel] = React.useState<string | null>(defaultSelectedId);
  const [hover, setHover] = React.useState<string | null>(null);
  const [focus, setFocus] = React.useState<string | null>(null);
  const refs = React.useRef(new Map<string, HTMLButtonElement>());
  const uid = React.useId();
  const sel = selectedId === undefined ? innerSel : selectedId;
  const activeId = hover ?? focus ?? sel;
  const active = pins.find((p) => p.id === activeId) ?? null;
  const order = React.useMemo(() => pins.slice().sort((a, b) => a.x - b.x || a.y - b.y).map((p) => p.id), [pins]);

  const choose = (pin: MapPin) => {
    if (selectedId === undefined) setInnerSel(pin.id);
    onPinSelect?.(pin);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, pin: MapPin) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setHover(null);
      setFocus(null);
      if (selectedId === undefined) setInnerSel(null);
      return;
    }
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = -2;
    const at = order.indexOf(pin.id);
    if (e.key in keys) next = (at + keys[e.key] + order.length) % order.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = order.length - 1;
    if (next < 0) return;
    e.preventDefault();
    refs.current.get(order[next])?.focus();
  };

  const vPos = active && active.y < 52 ? "below" : "above";
  const hPos = active ? (active.x < 26 ? "start" : active.x > 74 ? "end" : "center") : "center";
  const cardId = `${uid}-card`;

  return (
    <div
      className={`hb-ub3 ${className}`.trim()}
      style={{ "--hb-ub3-a": accent, ...style } as React.CSSProperties}
      role="group"
      aria-label={label}
      {...rest}
    >
      <style href="hb-map-pin-board" precedence="default">
        {css}
      </style>
      <svg className="hb-ub3-svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="250" fill="#0b0d12" />
        {map.blocks.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="2"
            fill={b.tone > 0.82 ? "#1b2029" : b.tone > 0.4 ? "#161a22" : "#14171e"}
          />
        ))}
        {map.parks.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx="4" fill="#12271f" />
        ))}
        {map.trees.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.4" fill="#1d4434" />
        ))}
        <path d="M-10 40 L 410 176" stroke="#0b0d12" strokeWidth="9" />
        <path d="M-10 40 L 410 176" stroke="#242a35" strokeWidth="0.8" strokeDasharray="4 5" />
        <path d={map.river} fill="none" stroke="#0d2038" strokeWidth="22" strokeLinecap="round" />
        <path d={map.river} fill="none" stroke="#123056" strokeWidth="16" strokeLinecap="round" />
        <path d={map.river} fill="none" stroke="#1d4a80" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="10 14" />
        <g fill="#4a5162" fontSize="6.5" letterSpacing="1.4" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <text x={map.xs[2] + 6} y={map.ys[1] - 0.5}>HARBOR AVE</text>
          <text x={map.xs[5] + 6} y={map.ys[4] - 0.5}>KESTREL ST</text>
          <text x="300" y="196" fill="#2d5d93">ALDER RIVER</text>
        </g>
      </svg>
      <div className="hb-ub3-shade" />
      <span className="hb-ub3-chip">{label}</span>
      {pins.map((pin, i) => {
        const on = activeId === pin.id;
        return (
          <button
            key={pin.id}
            ref={(el) => {
              if (el) refs.current.set(pin.id, el);
              else refs.current.delete(pin.id);
            }}
            type="button"
            className="hb-ub3-pin"
            data-on={on ? "true" : "false"}
            aria-label={pin.subtitle ? `${pin.title}, ${pin.subtitle}` : pin.title}
            aria-pressed={sel === pin.id}
            aria-describedby={on ? cardId : undefined}
            style={
              {
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                "--hb-ub3-c": pin.color ?? accent,
                "--hb-ub3-d": `${((i * 0.47) % 2.4).toFixed(2)}s`,
              } as React.CSSProperties
            }
            onPointerEnter={() => setHover(pin.id)}
            onPointerLeave={() => setHover((h) => (h === pin.id ? null : h))}
            onFocus={() => setFocus(pin.id)}
            onBlur={() => setFocus((f) => (f === pin.id ? null : f))}
            onClick={() => choose(pin)}
            onKeyDown={(e) => onKey(e, pin)}
          >
            <span className="hb-ub3-ring" />
            <span className="hb-ub3-base" />
            <svg viewBox="0 0 24 30" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 30 12 30s12-10 12-18.4C24 5.2 18.6 0 12 0Z" fill="var(--hb-ub3-c)" />
              <path d="M12 1.2C6 1.2 1.2 5.9 1.2 11.6" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
              <circle cx="12" cy="11.5" r="4.2" fill="#fff" />
            </svg>
          </button>
        );
      })}
      {active ? (
        <div
          key={active.id}
          id={cardId}
          role="tooltip"
          className="hb-ub3-card"
          data-v={vPos}
          data-h={hPos}
          style={{ left: `${active.x}%`, top: `${active.y}%` }}
        >
          <span className="hb-ub3-ct">{active.title}</span>
          {active.subtitle ? <span className="hb-ub3-cs">{active.subtitle}</span> : null}
          {active.rating !== undefined || active.meta ? (
            <span className="hb-ub3-cm">
              {active.rating !== undefined ? (
                <span className="hb-ub3-cr">
                  <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M6 .8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L.8 4.6l3.6-.5Z" />
                  </svg>
                  {active.rating.toFixed(1)}
                </span>
              ) : null}
              {active.rating !== undefined && active.meta ? <span className="hb-ub3-cb" /> : null}
              {active.meta ? <span>{active.meta}</span> : null}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

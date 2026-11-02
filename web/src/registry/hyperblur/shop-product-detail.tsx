"use client";

import * as React from "react";

export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductSize {
  label: string;
  available?: boolean;
}

export interface ProductSelection {
  color: string;
  size: string;
  quantity: number;
}

export interface ShopProductDetailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  name?: string;
  badge?: string;
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  colors?: ProductColor[];
  defaultColor?: string;
  sizes?: ProductSize[];
  defaultSize?: string;
  maxQuantity?: number;
  deliveryNotes?: string[];
  addLabel?: string;
  addedLabel?: string;
  onAddToBag?: (selection: ProductSelection) => void;
  accent?: string;
}

const views = ["Front", "Back", "Detail", "Flat lay"] as const;

const css = `
.hb-ki5 {
  --hb-ki5-accent: #2f7bff;
  --hb-ki5-c: #5b6b4a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki5 *, .hb-ki5 *::before, .hb-ki5 *::after { box-sizing: border-box; }
.hb-ki5-inner {
  display: grid;
  gap: 32px;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(40px, 6cqi, 96px) clamp(16px, 4cqi, 40px);
}
.hb-ki5-gallery { display: grid; gap: 12px; min-width: 0; }
.hb-ki5-stage {
  position: relative;
  aspect-ratio: 1;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 22px;
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
}
.hb-ki5-photo {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  animation: hb-ki5-swap .55s cubic-bezier(.2,.7,.2,1) both;
}
.hb-ki5-zoomer {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: var(--hb-ki5-mx, 50%) var(--hb-ki5-my, 50%);
  transition: transform .45s cubic-bezier(.2,.7,.2,1);
}
.hb-ki5-stage:hover .hb-ki5-zoomer { transform: scale(1.55); }
.hb-ki5-svg { width: 78%; height: 78%; overflow: visible; filter: drop-shadow(0 30px 30px rgba(0,0,0,.35)); }
.hb-ki5-cloth { fill: var(--hb-ki5-c); transition: fill .45s ease; }
.hb-ki5-seam { fill: none; stroke: color-mix(in srgb, var(--hb-ki5-c) 55%, #000); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; transition: stroke .45s ease; }
.hb-ki5-pocket { fill: color-mix(in srgb, var(--hb-ki5-c) 88%, #000); stroke: color-mix(in srgb, var(--hb-ki5-c) 55%, #000); stroke-width: 1.2; transition: fill .45s ease; }
.hb-ki5-btnc { fill: color-mix(in srgb, var(--hb-ki5-c) 40%, #f5efe0); }
.hb-ki5-shade { fill: rgba(0,0,0,.16); }
.hb-ki5-light { fill: rgba(255,255,255,.08); }
.hb-ki5-tagl { fill: #f5efe0; }
.hb-ki5-badges {
  position: absolute;
  left: 14px;
  top: 14px;
  display: flex;
  gap: 6px;
  pointer-events: none;
}
.hb-ki5-badge {
  height: 26px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(10,10,10,.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 26px;
}
.hb-ki5-viewname {
  position: absolute;
  right: 14px;
  bottom: 14px;
  color: rgba(255,255,255,.7);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  letter-spacing: .06em;
  text-transform: uppercase;
  pointer-events: none;
}
.hb-ki5-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.hb-ki5-thumb {
  position: relative;
  aspect-ratio: 1;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  opacity: .62;
  transition: opacity .2s ease, border-color .2s ease, transform .2s ease;
}
.hb-ki5-thumb .hb-ki5-svg { width: 70%; height: 70%; filter: none; }
.hb-ki5-thumb:hover { opacity: .9; }
.hb-ki5-thumb[aria-pressed="true"] { opacity: 1; border-color: var(--hb-ki5-accent); box-shadow: 0 0 0 1px var(--hb-ki5-accent); }
.hb-ki5-thumb:focus-visible { outline: 2px solid var(--hb-ki5-accent); outline-offset: 2px; }
.hb-ki5-info { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
.hb-ki5-brand {
  margin: 0 0 8px;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .02em;
}
.hb-ki5-name {
  margin: 0;
  font-size: clamp(26px, 3.6cqi, 36px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-ki5-rate {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: #8f8f8f;
  font-size: 13px;
}
.hb-ki5-stars { position: relative; display: inline-flex; color: #333; }
.hb-ki5-stars svg { width: 15px; height: 15px; flex: none; }
.hb-ki5-stars-fill { position: absolute; inset: 0; display: inline-flex; overflow: hidden; color: #fbbf24; }
.hb-ki5-rate b { color: #ededed; font-weight: 600; }
.hb-ki5-rate a { color: #8f8f8f; text-decoration: underline; text-decoration-color: rgba(255,255,255,.2); text-underline-offset: 3px; }
.hb-ki5-rate a:hover { color: #ededed; }
.hb-ki5-price { display: flex; align-items: baseline; flex-wrap: wrap; gap: 10px; }
.hb-ki5-now { font-size: 28px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-ki5-was { color: #6b6b6b; font-size: 16px; text-decoration: line-through; }
.hb-ki5-save {
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  background: color-mix(in srgb, #22c55e 14%, transparent);
  color: #4ade80;
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
}
.hb-ki5-desc { margin: 0; color: #a1a1a1; font-size: 14.5px; line-height: 1.6; }
.hb-ki5-group { display: grid; gap: 10px; }
.hb-ki5-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #8f8f8f;
}
.hb-ki5-label b { color: #ededed; font-weight: 500; }
.hb-ki5-label a { color: #8f8f8f; font-size: 12.5px; }
.hb-ki5-label a:hover { color: #ededed; }
.hb-ki5-swatches { display: flex; flex-wrap: wrap; gap: 10px; }
.hb-ki5-swatch {
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 0 0 3px #0a0a0a, 0 0 0 4px transparent;
  cursor: pointer;
  transition: box-shadow .2s ease, transform .2s cubic-bezier(.2,.7,.2,1);
}
.hb-ki5-swatch:hover { transform: scale(1.08); }
.hb-ki5-swatch[aria-checked="true"] { box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 0 0 3px #0a0a0a, 0 0 0 4.5px #ededed; }
.hb-ki5-swatch:focus-visible { outline: 2px solid var(--hb-ki5-accent); outline-offset: 5px; }
.hb-ki5-sizes { display: grid; grid-template-columns: repeat(auto-fill, minmax(54px, 1fr)); gap: 8px; }
.hb-ki5-sizes[data-error="true"] { animation: hb-ki5-shake .4s ease; }
.hb-ki5-size {
  position: relative;
  height: 40px;
  margin: 0;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  background: #111;
  color: #ededed;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: border-color .2s ease, background-color .2s ease, color .2s ease;
}
.hb-ki5-size:hover:not(:disabled) { border-color: rgba(255,255,255,.28); }
.hb-ki5-size[aria-checked="true"] { border-color: #ededed; background: #ededed; color: #0a0a0a; }
.hb-ki5-size:disabled { color: #4a4a4a; cursor: not-allowed; background: #0d0d0d; }
.hb-ki5-size:disabled::after {
  content: "";
  position: absolute;
  left: -10%;
  top: 50%;
  width: 120%;
  height: 1px;
  background: #2a2a2a;
  transform: rotate(-18deg);
}
.hb-ki5-size:focus-visible { outline: 2px solid var(--hb-ki5-accent); outline-offset: 2px; }
.hb-ki5-error { margin: 0; color: #f87171; font-size: 12.5px; }
.hb-ki5-buy { display: flex; gap: 10px; }
.hb-ki5-qty {
  display: inline-flex;
  align-items: center;
  flex: none;
  height: 50px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 14px;
  background: #111;
}
.hb-ki5-qty button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #ededed;
  cursor: pointer;
  border-radius: 14px;
}
.hb-ki5-qty button:disabled { color: #4a4a4a; cursor: default; }
.hb-ki5-qty button:focus-visible { outline: 2px solid var(--hb-ki5-accent); outline-offset: -4px; }
.hb-ki5-qty svg { width: 14px; height: 14px; }
.hb-ki5-qty output { min-width: 22px; text-align: center; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ki5-add {
  position: relative;
  flex: 1;
  height: 50px;
  margin: 0;
  border: 0;
  border-radius: 14px;
  background: var(--hb-ki5-accent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 30px -12px var(--hb-ki5-accent);
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: background-color .4s ease, box-shadow .4s ease, transform .15s ease;
}
.hb-ki5-add:active { transform: scale(.985); }
.hb-ki5-add:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-ki5-add[data-state="done"] { background: #16a34a; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 30px -12px #16a34a; }
.hb-ki5-add-row {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform .45s cubic-bezier(.7,0,.2,1), opacity .3s ease;
}
.hb-ki5-add-row svg { width: 18px; height: 18px; }
.hb-ki5-add-row[data-row="done"] { transform: translateY(110%); opacity: 0; }
.hb-ki5-add[data-state="done"] .hb-ki5-add-row[data-row="idle"] { transform: translateY(-110%); opacity: 0; }
.hb-ki5-add[data-state="done"] .hb-ki5-add-row[data-row="done"] { transform: none; opacity: 1; }
.hb-ki5-check { stroke-dasharray: 20; stroke-dashoffset: 20; }
.hb-ki5-add[data-state="done"] .hb-ki5-check { animation: hb-ki5-draw .45s .2s ease forwards; }
.hb-ki5-spin {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hb-ki5-rot .7s linear infinite;
}
.hb-ki5-delivery {
  display: grid;
  margin: 0;
  padding: 4px 16px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  list-style: none;
}
.hb-ki5-delivery li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #c9c9c9;
  font-size: 13.5px;
}
.hb-ki5-delivery li + li { border-top: 1px solid rgba(255,255,255,.06); }
.hb-ki5-delivery svg { width: 18px; height: 18px; flex: none; color: var(--hb-ki5-accent); }
.hb-ki5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 820px) {
  .hb-ki5-inner { grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 5cqi, 64px); align-items: start; }
  .hb-ki5-gallery { grid-template-columns: 76px 1fr; }
  .hb-ki5-thumbs { grid-template-columns: 1fr; order: -1; align-content: start; }
}
@keyframes hb-ki5-swap {
  from { opacity: 0; transform: scale(1.04); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ki5-shake {
  0%, 100% { transform: none; }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-3px); }
}
@keyframes hb-ki5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-ki5-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-ki5-photo, .hb-ki5-sizes[data-error="true"], .hb-ki5-spin { animation: none; }
  .hb-ki5-add[data-state="done"] .hb-ki5-check { animation: none; stroke-dashoffset: 0; }
  .hb-ki5-zoomer, .hb-ki5-cloth, .hb-ki5-seam, .hb-ki5-pocket, .hb-ki5-swatch, .hb-ki5-size, .hb-ki5-thumb, .hb-ki5-add, .hb-ki5-add-row { transition: none; }
  .hb-ki5-stage:hover .hb-ki5-zoomer { transform: none; }
}
`;

function backdrop(view: number) {
  const sets = [
    "radial-gradient(70% 60% at 50% 40%, color-mix(in srgb, var(--hb-ki5-c) 30%, #2a2a2a) 0%, transparent 70%), linear-gradient(160deg, #1d1d1f, #121214)",
    "radial-gradient(60% 50% at 30% 20%, rgba(255,255,255,.12), transparent 60%), linear-gradient(200deg, color-mix(in srgb, var(--hb-ki5-c) 25%, #1a1a1a), #101010)",
    "radial-gradient(90% 80% at 70% 30%, color-mix(in srgb, var(--hb-ki5-c) 45%, #222) 0%, transparent 70%), #141414",
    "linear-gradient(135deg, #e7dfcf 0%, #cfc4ad 100%)",
  ];
  return sets[view] ?? sets[0];
}

function Garment({ view }: { view: number }) {
  const body = "M70 40 L52 47 L30 62 L17 122 L36 127 L47 86 L49 172 L151 172 L153 86 L164 127 L183 122 L170 62 L148 47 L130 40 Q100 58 70 40 Z";
  const transform =
    view === 2 ? "translate(100 100) scale(2.4) translate(-73 -103)" : view === 3 ? "translate(100 100) rotate(-14) scale(.9) translate(-100 -106)" : undefined;
  return (
    <svg className="hb-ki5-svg" viewBox="0 0 200 200" aria-hidden="true">
      <g transform={transform}>
        {view === 3 && <path d={body} transform="translate(5 7)" fill="rgba(60,40,20,.25)" />}
        <path className="hb-ki5-cloth" d={body} />
        <path className="hb-ki5-shade" d="M100 56 L130 40 L148 47 L170 62 L183 122 L164 127 L153 86 L151 172 L118 172 Z" />
        <path className="hb-ki5-light" d="M70 40 L52 47 L30 62 L22 98 L44 70 Z" />
        <path className="hb-ki5-seam" d="M47 86 L49 60 M153 86 L151 60 M36 127 L38 118 L19 113 M164 127 L162 118 L181 113" />
        {view === 1 ? (
          <>
            <path className="hb-ki5-seam" d="M52 62 Q100 76 148 62" />
            <path className="hb-ki5-seam" d="M100 70 L100 82" />
            <rect className="hb-ki5-tagl" x="93" y="45" width="14" height="6" rx="1" />
          </>
        ) : (
          <>
            <path className="hb-ki5-seam" d="M70 40 L86 64 L100 52 L114 64 L130 40" />
            <path className="hb-ki5-seam" d="M100 52 L100 172 M106 56 L106 172" />
            <path className="hb-ki5-pocket" d="M60 92 h26 v22 q-13 5 -26 0 Z" />
            <path className="hb-ki5-pocket" d="M114 92 h26 v22 q-13 5 -26 0 Z" />
            <path className="hb-ki5-seam" d="M60 98 h26 M114 98 h26" />
            {[74, 98, 122, 146].map((y) => (
              <circle key={y} className="hb-ki5-btnc" cx="103" cy={y} r="2.6" />
            ))}
            <circle className="hb-ki5-btnc" cx="73" cy="95" r="1.8" />
            <circle className="hb-ki5-btnc" cx="127" cy="95" r="1.8" />
          </>
        )}
      </g>
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8L6 11.6l-4.3-4 5.8-.7L10 1.6z" />
    </svg>
  );
}

function money(value: number, currency: string) {
  const [whole, cents] = value.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+$)/g, ",");
  return cents === "00" ? `${currency}${grouped}` : `${currency}${grouped}.${cents}`;
}

const deliveryIcons = [
  "M2 6h11v9H2zM13 9h4l3 3v3h-7M5.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  "M4 9a7 7 0 1 1 1.6 5.4M4 4v5h5",
  "M5 19c0-8 5-13 14-14-1 9-6 14-14 14zM5 19l7-7",
];

export function ShopProductDetail({
  brand = "Northwind Supply Co.",
  name = "Ridgeline Wool Overshirt",
  badge = "New season",
  price = 168,
  compareAtPrice = 210,
  currency = "$",
  rating = 4.8,
  reviewCount = 2146,
  description = "Brushed recycled wool with a cotton twill lining, corozo buttons and two bellowed chest pockets. Cut roomy to layer over a knit.",
  colors = [
    { name: "Moss", value: "#5b6b4a" },
    { name: "Ink", value: "#2b3247" },
    { name: "Clay", value: "#a85d43" },
    { name: "Oat", value: "#cdbf9f" },
  ],
  defaultColor,
  sizes = [
    { label: "XS" },
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "XXL", available: false },
  ],
  defaultSize = "M",
  maxQuantity = 10,
  deliveryNotes = ["Free delivery by Thursday, Nov 6", "Free 30-day returns and exchanges", "Carbon neutral shipping from Portland, OR"],
  addLabel = "Add to bag",
  addedLabel = "Added to bag",
  onAddToBag,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ShopProductDetailProps) {
  const [view, setView] = React.useState(0);
  const [color, setColor] = React.useState(defaultColor ?? colors[0]?.name ?? "");
  const [size, setSize] = React.useState<string | null>(defaultSize ?? null);
  const [qty, setQty] = React.useState(1);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = React.useState(0);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const zoomRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId();
  const colorLabel = `${uid}-color`;
  const sizeLabel = `${uid}-size`;

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const current = colors.find((item) => item.name === color) ?? colors[0];
  const filled = Math.max(0, Math.min(5, rating)) / 5;
  const save = compareAtPrice && compareAtPrice > price ? Math.round((1 - price / compareAtPrice) * 100) : 0;

  const add = () => {
    if (status !== "idle") return;
    if (!size) {
      setError((n) => n + 1);
      return;
    }
    setStatus("loading");
    timers.current.push(
      setTimeout(() => {
        setStatus("done");
        onAddToBag?.({ color, size, quantity: qty });
      }, 650),
      setTimeout(() => setStatus("idle"), 2600),
    );
  };

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = zoomRef.current;
    if (!node) return;
    const rect = event.currentTarget.getBoundingClientRect();
    node.style.setProperty("--hb-ki5-mx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
    node.style.setProperty("--hb-ki5-my", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
  };

  const radioKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(event.key)) return;
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = buttons[(index + step + buttons.length) % buttons.length];
    next.focus();
    next.click();
  };

  return (
    <section
      className={className ? `hb-ki5 ${className}` : "hb-ki5"}
      style={{ "--hb-ki5-accent": accent, "--hb-ki5-c": current?.value ?? "#5b6b4a", ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-product-detail" precedence="default">{css}</style>
      <div className="hb-ki5-inner">
        <div className="hb-ki5-gallery">
          <div className="hb-ki5-stage" onPointerMove={onMove}>
            <div className="hb-ki5-photo" key={view} style={{ background: backdrop(view) }}>
              <div className="hb-ki5-zoomer" ref={zoomRef}>
                <Garment view={view} />
              </div>
            </div>
            {badge && (
              <div className="hb-ki5-badges">
                <span className="hb-ki5-badge">{badge}</span>
              </div>
            )}
            <span className="hb-ki5-viewname">
              {views[view]} · {view + 1}/{views.length}
            </span>
          </div>
          <div className="hb-ki5-thumbs" role="group" aria-label="Product photos">
            {views.map((label, i) => (
              <button
                key={label}
                type="button"
                className="hb-ki5-thumb"
                aria-pressed={view === i}
                aria-label={`Show ${label.toLowerCase()} photo`}
                onClick={() => setView(i)}
                style={{ background: backdrop(i) }}
              >
                <Garment view={i} />
              </button>
            ))}
          </div>
        </div>
        <div className="hb-ki5-info">
          <div>
            <p className="hb-ki5-brand">{brand}</p>
            <h2 className="hb-ki5-name">{name}</h2>
            <div className="hb-ki5-rate">
              <span className="hb-ki5-stars" aria-hidden="true">
                <Star /><Star /><Star /><Star /><Star />
                <span className="hb-ki5-stars-fill" style={{ width: `${(filled * 100).toFixed(1)}%` }}>
                  <Star /><Star /><Star /><Star /><Star />
                </span>
              </span>
              <span className="hb-ki5-sr">Rated {rating} out of 5.</span>
              <b>{rating.toFixed(1)}</b>
              <a href="#reviews">{reviewCount.toLocaleString("en-US")} reviews</a>
            </div>
          </div>
          <div className="hb-ki5-price">
            <span className="hb-ki5-now">{money(price, currency)}</span>
            {save > 0 && compareAtPrice && (
              <>
                <span className="hb-ki5-was">{money(compareAtPrice, currency)}</span>
                <span className="hb-ki5-save">Save {save}%</span>
              </>
            )}
          </div>
          {description && <p className="hb-ki5-desc">{description}</p>}
          <div className="hb-ki5-group">
            <span className="hb-ki5-label" id={colorLabel}>
              <span>
                Color <b>{color}</b>
              </span>
            </span>
            <div className="hb-ki5-swatches" role="radiogroup" aria-labelledby={colorLabel} onKeyDown={radioKeys}>
              {colors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  role="radio"
                  aria-checked={item.name === color}
                  aria-label={item.name}
                  tabIndex={item.name === color ? 0 : -1}
                  className="hb-ki5-swatch"
                  style={{ background: item.value }}
                  onClick={() => setColor(item.name)}
                />
              ))}
            </div>
          </div>
          <div className="hb-ki5-group">
            <span className="hb-ki5-label" id={sizeLabel}>
              <span>
                Size {size && <b>{size}</b>}
              </span>
              <a href="#size-guide">Size guide</a>
            </span>
            <div
              className="hb-ki5-sizes"
              role="radiogroup"
              aria-labelledby={sizeLabel}
              data-error={error > 0 && !size}
              key={error}
              onKeyDown={radioKeys}
            >
              {sizes.map((item) => {
                const checked = item.label === size;
                const disabled = item.available === false;
                const focusable = checked || (!size && item === sizes.find((s) => s.available !== false));
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    disabled={disabled}
                    tabIndex={focusable ? 0 : -1}
                    className="hb-ki5-size"
                    aria-label={disabled ? `${item.label}, sold out` : item.label}
                    onClick={() => setSize(item.label)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {error > 0 && !size && <p className="hb-ki5-error" role="alert">Choose a size first.</p>}
          </div>
          <div className="hb-ki5-buy">
            <div className="hb-ki5-qty" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 7h8" /></svg>
              </button>
              <output aria-live="polite">{qty}</output>
              <button type="button" aria-label="Increase quantity" disabled={qty >= maxQuantity} onClick={() => setQty((q) => Math.min(maxQuantity, q + 1))}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 7h8M7 3v8" /></svg>
              </button>
            </div>
            <button type="button" className="hb-ki5-add" data-state={status} onClick={add}>
              <span className="hb-ki5-add-row" data-row="idle">
                {status === "loading" ? (
                  <span className="hb-ki5-spin" aria-hidden="true" />
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 6h12l-1 11H5L4 6zM7.5 6V5a2.5 2.5 0 0 1 5 0v1" />
                    </svg>
                    {addLabel} · {money(price * qty, currency)}
                  </>
                )}
              </span>
              <span className="hb-ki5-add-row" data-row="done" aria-hidden={status !== "done"}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="hb-ki5-check" d="M4.5 10.5l3.5 3.5 7.5-8" />
                </svg>
                {addedLabel}
              </span>
            </button>
          </div>
          <span className="hb-ki5-sr" aria-live="polite">
            {status === "loading" ? "Adding to bag" : status === "done" ? addedLabel : ""}
          </span>
          {deliveryNotes.length > 0 && (
            <ul className="hb-ki5-delivery">
              {deliveryNotes.map((note, i) => (
                <li key={note}>
                  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={deliveryIcons[i % deliveryIcons.length]} />
                  </svg>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

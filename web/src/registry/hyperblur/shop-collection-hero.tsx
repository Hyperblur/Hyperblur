"use client";

import * as React from "react";

export type CeramicShape = "vase" | "mug" | "bowl" | "carafe" | "lamp";

export interface CollectionProduct {
  name: string;
  price: number;
  category: string;
  shape: CeramicShape;
  tone: string;
  glazes?: string[];
  tag?: string;
  href?: string;
}

export interface ShopCollectionHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  products?: CollectionProduct[];
  filters?: string[];
  allLabel?: string;
  defaultFilter?: string;
  onFilterChange?: (filter: string) => void;
  defaultWishlist?: string[];
  onWishlistChange?: (product: CollectionProduct, wished: boolean) => void;
  onQuickAdd?: (product: CollectionProduct) => void;
  currency?: string;
  accent?: string;
}

const defaultProducts: CollectionProduct[] = [
  { name: "Dune Bud Vase", price: 58, category: "Vases", shape: "vase", tone: "#c79a72", glazes: ["#c79a72", "#7d8a6a", "#e8e1d3"], tag: "New", href: "#" },
  { name: "Ember Mug", price: 34, category: "Tableware", shape: "mug", tone: "#b5532f", glazes: ["#b5532f", "#2f3a46", "#e8e1d3"], href: "#" },
  { name: "Tidepool Bowl", price: 46, category: "Tableware", shape: "bowl", tone: "#5f7f86", glazes: ["#5f7f86", "#c79a72"], tag: "Bestseller", href: "#" },
  { name: "Hearth Table Lamp", price: 148, category: "Lighting", shape: "lamp", tone: "#d6c6aa", glazes: ["#d6c6aa", "#3d3a36"], tag: "Limited", href: "#" },
  { name: "Fold Pitcher", price: 72, category: "Tableware", shape: "carafe", tone: "#8a6d55", glazes: ["#8a6d55", "#e8e1d3"], href: "#" },
  { name: "Moon Vase", price: 96, category: "Vases", shape: "vase", tone: "#e4dccd", glazes: ["#e4dccd", "#b5532f"], href: "#" },
  { name: "Lantern Pendant", price: 182, category: "Lighting", shape: "lamp", tone: "#9a5a3c", glazes: ["#9a5a3c", "#d6c6aa"], href: "#" },
];

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function Ceramic({ shape, seed }: { shape: CeramicShape; seed: number }) {
  const speckles = Array.from({ length: 22 }, (_, i) => {
    const h = hash(`${seed}-${i}`) >>> 0;
    return { x: 36 + (h % 28), y: 56 + ((h >>> 5) % 40), r: 0.5 + ((h >>> 10) % 8) / 10 };
  });
  return (
    <svg className="hb-ki7-svg" viewBox="0 0 100 120" aria-hidden="true">
      <ellipse cx="50" cy="111" rx={shape === "bowl" ? 34 : 28} ry="4.5" fill="rgba(60,40,20,.16)" />
      {shape === "vase" && (
        <>
          <path className="hb-ki7-glaze" d="M38 12H62V20C62 28 80 36 80 60C80 86 68 108 50 108C32 108 20 86 20 60C20 36 38 28 38 20Z" />
          <path className="hb-ki7-rim" d="M38 12H62V16H38Z" />
          <path className="hb-ki7-dip" d="M20.6 72C30 76 40 70 50 74S70 78 79.4 72C77 92 66 108 50 108S23 92 20.6 72Z" />
        </>
      )}
      {shape === "mug" && (
        <>
          <path className="hb-ki7-handle" d="M69 52C86 52 86 86 69 86" />
          <path className="hb-ki7-glaze" d="M24 40H70V96C70 104 64 108 56 108H38C30 108 24 104 24 96Z" />
          <path className="hb-ki7-rim" d="M24 40H70V45H24Z" />
          <path className="hb-ki7-dip" d="M24 82C34 86 44 80 54 84S66 86 70 82V96C70 104 64 108 56 108H38C30 108 24 104 24 96Z" />
        </>
      )}
      {shape === "bowl" && (
        <>
          <path className="hb-ki7-glaze" d="M12 60H88C88 86 72 103 50 103C28 103 12 86 12 60Z" />
          <path d="M40 102H60V108H40Z" className="hb-ki7-rim" />
          <ellipse cx="50" cy="60" rx="38" ry="7" className="hb-ki7-inner" />
          <path className="hb-ki7-dip" d="M17 80C28 84 40 78 50 82S72 84 83 80C78 94 66 103 50 103S22 94 17 80Z" />
        </>
      )}
      {shape === "carafe" && (
        <>
          <path className="hb-ki7-glaze" d="M41 12H59L57 30C57 38 75 48 75 72C75 96 64 108 50 108C36 108 25 96 25 72C25 48 43 38 43 30Z" />
          <path className="hb-ki7-rim" d="M41 12H59L58.6 16H41.4Z" />
          <path className="hb-ki7-dip" d="M25.4 80C35 84 44 78 52 82S68 84 74.6 80C72 98 62 108 50 108S28 98 25.4 80Z" />
        </>
      )}
      {shape === "lamp" && (
        <>
          <ellipse cx="50" cy="40" rx="40" ry="26" fill="rgba(255,214,150,.35)" className="hb-ki7-glow" />
          <path className="hb-ki7-glaze" d="M45 58H55V98H45Z" />
          <ellipse className="hb-ki7-glaze" cx="50" cy="102" rx="20" ry="6" />
          <path className="hb-ki7-shade" d="M32 18H68L82 58H18Z" />
          <path d="M18 58H82" stroke="rgba(60,40,20,.25)" strokeWidth="1.4" />
        </>
      )}
      {shape !== "lamp" &&
        speckles.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r.toFixed(2)} fill="rgba(40,25,10,.22)" />)}
      <path className="hb-ki7-hi" d={shape === "bowl" ? "M20 70C22 82 28 90 36 96" : shape === "lamp" ? "M34 24L26 52" : "M31 54C28 68 30 84 37 96"} />
    </svg>
  );
}

const css = `
.hb-ki7 {
  --hb-ki7-accent: #c4532d;
  --hb-ki7-ink: #1c1a16;
  --hb-ki7-muted: #6f685d;
  --hb-ki7-line: rgba(28,26,22,.12);
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-ki7-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki7 *, .hb-ki7 *::before, .hb-ki7 *::after { box-sizing: border-box; }
.hb-ki7-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(32px, 5cqi, 88px) clamp(16px, 4cqi, 40px) clamp(56px, 9cqi, 112px);
}
.hb-ki7-banner {
  position: relative;
  display: grid;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(40% 70% at 82% 40%, rgba(255,236,210,.9), transparent 70%),
    radial-gradient(60% 90% at 100% 100%, color-mix(in srgb, var(--hb-ki7-accent) 38%, transparent), transparent 70%),
    linear-gradient(115deg, #efe4d2 0%, #e6cfb3 60%, #ddb999 100%);
  box-shadow: inset 0 0 0 1px rgba(28,26,22,.06), inset 0 1px 0 rgba(255,255,255,.6);
}
.hb-ki7-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(60,40,20,.12) .8px, transparent .8px);
  background-size: 6px 6px;
  -webkit-mask-image: linear-gradient(90deg, #000, transparent 70%);
  mask-image: linear-gradient(90deg, #000, transparent 70%);
  pointer-events: none;
}
.hb-ki7-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(28px, 4cqi, 52px);
}
.hb-ki7-eyebrow {
  margin: 0 0 14px;
  color: color-mix(in srgb, var(--hb-ki7-accent) 80%, #000);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ki7-title {
  margin: 0;
  font-family: var(--font-serif, "Instrument Serif", "Iowan Old Style", Georgia, serif);
  font-size: clamp(56px, 9cqi, 104px);
  font-weight: 400;
  line-height: .9;
  letter-spacing: -.025em;
}
.hb-ki7-char {
  display: inline-block;
  animation: hb-ki7-rise .9s cubic-bezier(.2,.7,.2,1) both;
  animation-delay: var(--hb-ki7-d, 0ms);
}
.hb-ki7-title em { font-style: italic; color: color-mix(in srgb, var(--hb-ki7-accent) 85%, #000); }
.hb-ki7-sub {
  margin: 16px 0 0;
  max-width: 400px;
  color: #5b5349;
  font-size: 15px;
  line-height: 1.6;
}
.hb-ki7-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.hb-ki7-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease;
}
.hb-ki7-btn svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-ki7-btn:hover svg { transform: translateX(3px); }
.hb-ki7-primary { background: var(--hb-ki7-ink); color: #f7f5ef; box-shadow: 0 10px 24px -12px rgba(28,26,22,.6); }
.hb-ki7-primary:hover { transform: translateY(-1px); }
.hb-ki7-ghost { background: rgba(255,255,255,.45); color: var(--hb-ki7-ink); box-shadow: inset 0 0 0 1px rgba(28,26,22,.14); }
.hb-ki7-ghost:hover { background: rgba(255,255,255,.75); }
.hb-ki7-btn:focus-visible { outline: 2px solid var(--hb-ki7-accent); outline-offset: 3px; }
.hb-ki7-shelf {
  position: relative;
  display: none;
  align-items: flex-end;
  justify-content: center;
  gap: 0;
  padding: 32px 40px 0;
}
.hb-ki7-shelf::after {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 30px;
  height: 1px;
  background: rgba(60,40,20,.2);
}
.hb-ki7-piece {
  position: relative;
  z-index: 1;
  margin-bottom: 22px;
  animation: hb-ki7-bob 6s ease-in-out infinite;
  animation-delay: var(--hb-ki7-d, 0s);
}
.hb-ki7-piece .hb-ki7-svg { width: 100%; height: auto; }
.hb-ki7-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: clamp(24px, 3.4cqi, 36px) 0 18px;
}
.hb-ki7-filters { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; min-width: 0; }
.hb-ki7-filters::-webkit-scrollbar { display: none; }
.hb-ki7-chip {
  flex: none;
  height: 34px;
  margin: 0;
  padding: 0 15px;
  border: 1px solid var(--hb-ki7-line);
  border-radius: 999px;
  background: #fff;
  color: var(--hb-ki7-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
}
.hb-ki7-chip:hover { border-color: rgba(28,26,22,.3); }
.hb-ki7-chip[aria-pressed="true"] { background: var(--hb-ki7-ink); border-color: var(--hb-ki7-ink); color: #f7f5ef; }
.hb-ki7-chip:focus-visible { outline: 2px solid var(--hb-ki7-accent); outline-offset: 2px; }
.hb-ki7-count { color: var(--hb-ki7-muted); font-size: 13px; }
.hb-ki7-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(12px, 2cqi, 20px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ki7-card { min-width: 0; animation: hb-ki7-in .5s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--hb-ki7-d, 0ms); }
.hb-ki7-media {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(28,26,22,.06);
}
.hb-ki7-media > a { position: absolute; inset: 0; display: grid; place-items: center; border-radius: inherit; }
.hb-ki7-media > a:focus-visible { outline: 2px solid var(--hb-ki7-accent); outline-offset: -2px; }
.hb-ki7-media .hb-ki7-svg { width: 62%; height: auto; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.hb-ki7-card:hover .hb-ki7-media .hb-ki7-svg { transform: translateY(-6px) scale(1.04); }
.hb-ki7-glaze { fill: var(--hb-ki7-tone); }
.hb-ki7-rim { fill: color-mix(in srgb, var(--hb-ki7-tone) 70%, #2a1a0c); }
.hb-ki7-dip { fill: color-mix(in srgb, var(--hb-ki7-tone) 78%, #2a1a0c); }
.hb-ki7-inner { fill: color-mix(in srgb, var(--hb-ki7-tone) 60%, #1a0f06); }
.hb-ki7-handle { fill: none; stroke: var(--hb-ki7-tone); stroke-width: 7; stroke-linecap: round; }
.hb-ki7-shade { fill: color-mix(in srgb, var(--hb-ki7-tone) 80%, #fff); }
.hb-ki7-glow { filter: blur(6px); }
.hb-ki7-hi { fill: none; stroke: rgba(255,255,255,.4); stroke-width: 3; stroke-linecap: round; }
.hb-ki7-tag {
  position: absolute;
  left: 12px;
  top: 12px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  color: var(--hb-ki7-ink);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 24px;
  pointer-events: none;
}
.hb-ki7-heart {
  position: absolute;
  right: 10px;
  top: 10px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  box-shadow: 0 4px 12px -6px rgba(28,26,22,.4);
  color: var(--hb-ki7-ink);
  cursor: pointer;
  transition: transform .2s ease, background-color .2s ease;
}
.hb-ki7-heart:hover { transform: scale(1.08); background: #fff; }
.hb-ki7-heart:focus-visible { outline: 2px solid var(--hb-ki7-accent); outline-offset: 2px; }
.hb-ki7-heart svg { width: 17px; height: 17px; fill: transparent; stroke: currentColor; stroke-width: 1.6; transition: fill .2s ease, stroke .2s ease; }
.hb-ki7-heart[aria-pressed="true"] { color: var(--hb-ki7-accent); }
.hb-ki7-heart[aria-pressed="true"] svg { fill: var(--hb-ki7-accent); animation: hb-ki7-pop .45s cubic-bezier(.2,.9,.3,1.4); }
.hb-ki7-quick {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  transform: translateY(calc(100% + 14px));
  opacity: 0;
  transition: transform .4s cubic-bezier(.2,.7,.2,1), opacity .3s ease;
}
.hb-ki7-card:hover .hb-ki7-quick, .hb-ki7-media:focus-within .hb-ki7-quick, .hb-ki7-quick[data-done="true"] { transform: none; opacity: 1; }
.hb-ki7-qbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 42px;
  margin: 0;
  border: 0;
  border-radius: 14px;
  background: rgba(28,26,22,.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #f7f5ef;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
}
.hb-ki7-qbtn svg { width: 15px; height: 15px; }
.hb-ki7-qbtn:focus-visible { outline: 2px solid var(--hb-ki7-accent); outline-offset: 2px; }
.hb-ki7-quick[data-done="true"] .hb-ki7-qbtn { background: var(--hb-ki7-accent); }
.hb-ki7-info { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 12px 4px 0; }
.hb-ki7-name { margin: 0; font-size: 14.5px; font-weight: 600; line-height: 1.3; }
.hb-ki7-name a { color: inherit; text-decoration: none; }
.hb-ki7-name a:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-ki7-dots { display: flex; gap: 4px; margin-top: 7px; }
.hb-ki7-dots span { width: 10px; height: 10px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(28,26,22,.18); }
.hb-ki7-price { font-size: 14.5px; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-ki7-empty { padding: 40px 0; color: var(--hb-ki7-muted); text-align: center; }
@container (min-width: 760px) {
  .hb-ki7-banner { grid-template-columns: 1.05fr 1fr; }
  .hb-ki7-shelf { display: flex; }
  .hb-ki7-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@keyframes hb-ki7-rise {
  from { opacity: 0; transform: translateY(.4em) rotate(4deg); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ki7-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes hb-ki7-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ki7-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.35); }
  100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ki7-char, .hb-ki7-piece, .hb-ki7-card, .hb-ki7-heart[aria-pressed="true"] svg { animation: none; }
  .hb-ki7-btn, .hb-ki7-btn svg, .hb-ki7-chip, .hb-ki7-media .hb-ki7-svg, .hb-ki7-heart, .hb-ki7-heart svg, .hb-ki7-quick, .hb-ki7-qbtn { transition: none; }
}
`;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function money(value: number, currency: string) {
  const [whole, cents] = value.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+$)/g, ",");
  return cents === "00" ? `${currency}${grouped}` : `${currency}${grouped}.${cents}`;
}

export function ShopCollectionHero({
  eyebrow = "Collection 04 · Autumn 2026",
  title = "Slow Kiln",
  subtitle = "Wood-fired stoneware thrown in small batches. Every glaze pools differently, so no two pieces match.",
  primaryCta = { label: "Shop the collection", href: "#" },
  secondaryCta = { label: "Read the lookbook", href: "#" },
  products = defaultProducts,
  filters,
  allLabel = "All",
  defaultFilter,
  onFilterChange,
  defaultWishlist = ["Tidepool Bowl"],
  onWishlistChange,
  onQuickAdd,
  currency = "$",
  accent = "#c4532d",
  className,
  style,
  ...rest
}: ShopCollectionHeroProps) {
  const options = React.useMemo(() => {
    const list = filters ?? Array.from(new Set(products.map((p) => p.category)));
    return [allLabel, ...list.filter((item) => item !== allLabel)];
  }, [filters, products, allLabel]);
  const [filter, setFilter] = React.useState(defaultFilter ?? allLabel);
  const [wished, setWished] = React.useState<string[]>(defaultWishlist);
  const [added, setAdded] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const matching = filter === allLabel ? products : products.filter((p) => p.category === filter);
  const visible = matching.slice(0, 4);

  const choose = (next: string) => {
    setFilter(next);
    onFilterChange?.(next);
  };

  const toggleWish = (product: CollectionProduct) => {
    const on = !wished.includes(product.name);
    setWished((list) => (on ? [...list, product.name] : list.filter((n) => n !== product.name)));
    onWishlistChange?.(product, on);
  };

  const quickAdd = (product: CollectionProduct) => {
    setAdded(product.name);
    onQuickAdd?.(product);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(null), 1600);
  };

  const words = title.split(" ");
  const tail = words.length > 1 ? words.pop() : undefined;
  const head = words.join(" ");
  const renderChars = (text: string, offset: number) =>
    Array.from(text).map((ch, index) => {
      const i = offset + index;
      return (
        <span key={i} className="hb-ki7-char" style={{ "--hb-ki7-d": `${(i * 45).toFixed(0)}ms` } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      );
    });

  const shelf: { shape: CeramicShape; tone: string; width: number; delay: number }[] = [
    { shape: "carafe", tone: "#8a6d55", width: 108, delay: 0.4 },
    { shape: "vase", tone: "#c4532d", width: 152, delay: 0 },
    { shape: "bowl", tone: "#5f7f86", width: 128, delay: 0.9 },
  ];

  return (
    <section
      className={className ? `hb-ki7 ${className}` : "hb-ki7"}
      style={{ "--hb-ki7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-collection-hero" precedence="default">{css}</style>
      <div className="hb-ki7-inner">
        <div className="hb-ki7-banner">
          <div className="hb-ki7-copy">
            {eyebrow && <p className="hb-ki7-eyebrow">{eyebrow}</p>}
            <h2 className="hb-ki7-title" aria-label={title}>
              <span aria-hidden="true">
                {renderChars(head, 0)}
                {tail && (
                  <>
                    {" "}
                    <em>{renderChars(tail, head.length + 1)}</em>
                  </>
                )}
              </span>
            </h2>
            {subtitle && <p className="hb-ki7-sub">{subtitle}</p>}
            {(primaryCta || secondaryCta) && (
              <div className="hb-ki7-ctas">
                {primaryCta && (
                  <a className="hb-ki7-btn hb-ki7-primary" href={primaryCta.href}>
                    {primaryCta.label}
                    <Arrow />
                  </a>
                )}
                {secondaryCta && (
                  <a className="hb-ki7-btn hb-ki7-ghost" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="hb-ki7-shelf" aria-hidden="true">
            {shelf.map((piece, i) => (
              <div
                key={i}
                className="hb-ki7-piece"
                style={{ width: piece.width, "--hb-ki7-tone": piece.tone, "--hb-ki7-d": `${piece.delay}s`, marginLeft: i === 0 ? 0 : -14 } as React.CSSProperties}
              >
                <Ceramic shape={piece.shape} seed={i + 11} />
              </div>
            ))}
          </div>
        </div>
        <div className="hb-ki7-bar">
          <div className="hb-ki7-filters" role="group" aria-label="Filter products">
            {options.map((option) => (
              <button key={option} type="button" className="hb-ki7-chip" aria-pressed={option === filter} onClick={() => choose(option)}>
                {option}
              </button>
            ))}
          </div>
          <span className="hb-ki7-count" aria-live="polite">
            Showing {visible.length} of {matching.length} {matching.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
        {visible.length === 0 ? (
          <p className="hb-ki7-empty">No pieces in {filter} right now.</p>
        ) : (
          <ul className="hb-ki7-grid" key={filter}>
            {visible.map((product, i) => {
              const on = wished.includes(product.name);
              const done = added === product.name;
              return (
                <li
                  key={product.name}
                  className="hb-ki7-card"
                  style={{ "--hb-ki7-tone": product.tone, "--hb-ki7-d": `${(i * 70).toFixed(0)}ms` } as React.CSSProperties}
                >
                  <div
                    className="hb-ki7-media"
                    style={{
                      background: `radial-gradient(70% 55% at 50% 38%, color-mix(in srgb, ${product.tone} 22%, #fff) 0%, transparent 72%), linear-gradient(180deg, #efeae0, #e2dacb)`,
                    }}
                  >
                    <a href={product.href ?? "#"} aria-label={product.name}>
                      <Ceramic shape={product.shape} seed={hash(product.name)} />
                    </a>
                    {product.tag && <span className="hb-ki7-tag">{product.tag}</span>}
                    <button
                      type="button"
                      className="hb-ki7-heart"
                      aria-pressed={on}
                      aria-label={on ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                      onClick={() => toggleWish(product)}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10 16.5s-6.5-3.8-6.5-8.6A3.6 3.6 0 0 1 10 5.6a3.6 3.6 0 0 1 6.5 2.3c0 4.8-6.5 8.6-6.5 8.6z" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="hb-ki7-quick" data-done={done}>
                      <button type="button" className="hb-ki7-qbtn" onClick={() => quickAdd(product)}>
                        {done ? (
                          <>
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3.5 8.5l3 3 6-7" />
                            </svg>
                            Added to bag
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                              <path d="M8 3v10M3 8h10" />
                            </svg>
                            Quick add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="hb-ki7-info">
                    <div style={{ minWidth: 0 }}>
                      <h3 className="hb-ki7-name">
                        <a href={product.href ?? "#"}>{product.name}</a>
                      </h3>
                      {product.glazes && product.glazes.length > 0 && (
                        <div className="hb-ki7-dots" role="img" aria-label={`${product.glazes.length} glazes`}>
                          {product.glazes.map((g) => (
                            <span key={g} style={{ background: g }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="hb-ki7-price">{money(product.price, currency)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

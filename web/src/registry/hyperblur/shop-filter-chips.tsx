"use client";

import * as React from "react";

export interface FilterChipsProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  colorName: string;
  tags: string[];
  href: string;
}

export interface FilterChipsState {
  category: string;
  tags: string[];
  colors: string[];
  sort: "featured" | "price-asc" | "price-desc";
}

export interface ShopFilterChipsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  products?: FilterChipsProduct[];
  categories?: string[];
  tags?: string[];
  currency?: string;
  defaultTags?: string[];
  accent?: string;
  onFiltersChange?: (state: FilterChipsState) => void;
}

const defaultProducts: FilterChipsProduct[] = [
  { id: "p1", name: "Harbor rain shell", category: "Jackets", price: 189, color: "#2f4a5c", colorName: "Navy", tags: ["Waterproof", "Recycled"], href: "#" },
  { id: "p2", name: "Fell quilted vest", category: "Jackets", price: 128, color: "#6b7a4f", colorName: "Olive", tags: ["Recycled", "New"], href: "#" },
  { id: "p3", name: "Lofoten parka", category: "Jackets", price: 320, color: "#1d1d1f", colorName: "Black", tags: ["Waterproof"], href: "#" },
  { id: "p4", name: "Merino crew", category: "Knitwear", price: 98, color: "#c9b79c", colorName: "Oat", tags: ["Under $100"], href: "#" },
  { id: "p5", name: "Fisherman cardigan", category: "Knitwear", price: 165, color: "#e7e1d4", colorName: "Ecru", tags: ["New"], href: "#" },
  { id: "p6", name: "Ribbed half-zip", category: "Knitwear", price: 118, color: "#2f4a5c", colorName: "Navy", tags: ["Recycled"], href: "#" },
  { id: "p7", name: "Canvas work pant", category: "Trousers", price: 110, color: "#8a6a45", colorName: "Tobacco", tags: ["Recycled"], href: "#" },
  { id: "p8", name: "Trail softshell pant", category: "Trousers", price: 135, color: "#1d1d1f", colorName: "Black", tags: ["Waterproof", "New"], href: "#" },
  { id: "p9", name: "Wide cord trouser", category: "Trousers", price: 92, color: "#6b7a4f", colorName: "Olive", tags: ["Under $100"], href: "#" },
  { id: "p10", name: "Wool beanie", category: "Accessories", price: 34, color: "#c9b79c", colorName: "Oat", tags: ["Under $100", "Recycled"], href: "#" },
  { id: "p11", name: "Waxed tote", category: "Accessories", price: 76, color: "#8a6a45", colorName: "Tobacco", tags: ["Waterproof", "Under $100"], href: "#" },
  { id: "p12", name: "Lambswool scarf", category: "Accessories", price: 58, color: "#e7e1d4", colorName: "Ecru", tags: ["New", "Under $100"], href: "#" },
];

const css = `
.hb-we12 {
  --hb-we12-accent: #1f6feb;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #fafaf9;
  color: #18181b;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we12 *, .hb-we12 *::before, .hb-we12 *::after { box-sizing: border-box; }
.hb-we12-inner { max-width: 1120px; margin: 0 auto; padding: clamp(48px, 7cqi, 96px) clamp(18px, 4cqi, 40px); }
.hb-we12-head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 16px; }
.hb-we12-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 48px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; }
.hb-we12-sub { margin: 8px 0 0; color: #71717a; font-size: 14.5px; }
.hb-we12-count { display: inline-flex; align-items: baseline; gap: 6px; color: #71717a; font-size: 14px; }
.hb-we12-count b { display: inline-block; min-width: 1.4ch; color: #18181b; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; text-align: right; font-variant-numeric: tabular-nums; animation: hb-we12-roll .45s cubic-bezier(.3,1.4,.5,1) both; }
.hb-we12-bar { position: sticky; top: 0; z-index: 3; display: grid; gap: 12px; margin: 22px calc(clamp(18px, 4cqi, 40px) * -1) 22px; padding: 12px clamp(18px, 4cqi, 40px); background: rgba(250,250,249,.86); backdrop-filter: blur(12px) saturate(1.4); -webkit-backdrop-filter: blur(12px) saturate(1.4); border-block: 1px solid rgba(24,24,27,.07); }
.hb-we12-cats { position: relative; display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
.hb-we12-cats::-webkit-scrollbar { display: none; }
.hb-we12-ind { position: absolute; top: 0; left: 0; height: 36px; border-radius: 999px; background: #18181b; transform: translateX(var(--hb-we12-l, 0px)); width: var(--hb-we12-w, 60px); transition: transform .45s cubic-bezier(.3,1.25,.5,1), width .45s cubic-bezier(.3,1.25,.5,1); }
.hb-we12-cat { position: relative; z-index: 1; flex: none; height: 36px; padding: 0 16px; border: 0; border-radius: 999px; cursor: pointer; background: none; color: #52525b; font: inherit; font-size: 13.5px; font-weight: 500; white-space: nowrap; transition: color .3s ease; }
.hb-we12-cat[aria-pressed="true"] { color: #fff; }
.hb-we12-cat:not([aria-pressed="true"]):hover { color: #18181b; }
.hb-we12-cat:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 2px; }
.hb-we12-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-we12-chip { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 0; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; font-weight: 500; color: #3f3f46; background: #fff; box-shadow: inset 0 0 0 1px rgba(24,24,27,.12); transition: background .2s ease, color .2s ease, box-shadow .2s ease, transform .3s cubic-bezier(.3,1.5,.5,1); }
.hb-we12-chip:hover { box-shadow: inset 0 0 0 1px rgba(24,24,27,.3); }
.hb-we12-chip:active { transform: scale(.95); }
.hb-we12-chip[aria-pressed="true"] { color: var(--hb-we12-accent); background: color-mix(in srgb, var(--hb-we12-accent) 9%, #fff); box-shadow: inset 0 0 0 1.5px var(--hb-we12-accent); }
.hb-we12-chip:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 2px; }
.hb-we12-chip svg { width: 12px; height: 12px; transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.hb-we12-chip[aria-pressed="true"] svg { transform: rotate(45deg); }
.hb-we12-sep { width: 1px; height: 22px; background: rgba(24,24,27,.12); margin: 0 4px; }
.hb-we12-dot { position: relative; width: 26px; height: 26px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; background: var(--hb-we12-c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
.hb-we12-dot::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; box-shadow: 0 0 0 2px var(--hb-we12-accent); opacity: 0; transform: scale(.8); transition: opacity .2s ease, transform .3s cubic-bezier(.3,1.5,.5,1); }
.hb-we12-dot[aria-pressed="true"]::after { opacity: 1; transform: none; }
.hb-we12-dot:hover { transform: scale(1.1); }
.hb-we12-dot:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 5px; }
.hb-we12-sort { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; color: #71717a; font-size: 13px; }
.hb-we12-sort select { height: 32px; padding: 0 28px 0 12px; border: 0; border-radius: 10px; cursor: pointer; appearance: none; -webkit-appearance: none; font: inherit; font-size: 13px; font-weight: 500; color: #18181b; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%2371717a' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 10px center; box-shadow: inset 0 0 0 1px rgba(24,24,27,.12); }
.hb-we12-sort select:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 2px; }
.hb-we12-active { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 28px; }
.hb-we12-tag { display: inline-flex; align-items: center; gap: 4px; height: 28px; padding: 0 4px 0 10px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: #fff; background: #18181b; animation: hb-we12-pop .4s cubic-bezier(.3,1.6,.5,1) both; }
.hb-we12-tag i { width: 10px; height: 10px; border-radius: 50%; background: var(--hb-we12-c); box-shadow: 0 0 0 1px rgba(255,255,255,.4); font-style: normal; }
.hb-we12-x { width: 20px; height: 20px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 6px; cursor: pointer; color: #a1a1aa; background: none; transition: background .2s ease, color .2s ease; }
.hb-we12-x:hover { color: #fff; background: rgba(255,255,255,.14); }
.hb-we12-x:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 1px; }
.hb-we12-x svg { width: 10px; height: 10px; }
.hb-we12-clear { padding: 0 6px; border: 0; background: none; cursor: pointer; color: #71717a; font: inherit; font-size: 12.5px; text-decoration: underline; text-underline-offset: 3px; }
.hb-we12-clear:hover { color: #18181b; }
.hb-we12-clear:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 2px; border-radius: 3px; }
.hb-we12-hint { color: #a1a1aa; font-size: 12.5px; }
.hb-we12-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: clamp(12px, 2cqi, 20px); }
.hb-we12-card { display: grid; gap: 10px; color: inherit; text-decoration: none; will-change: transform; }
.hb-we12-card[data-enter="true"] { animation: hb-we12-enter .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-we12-img { position: relative; aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden; background: linear-gradient(170deg, #f1efeb, #e7e4de); box-shadow: inset 0 0 0 1px rgba(24,24,27,.05); }
.hb-we12-img svg { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform .7s cubic-bezier(.2,.8,.2,1); }
.hb-we12-card:hover .hb-we12-img svg { transform: scale(1.05) translateY(-2%); }
.hb-we12-card:focus-visible { outline: 2px solid var(--hb-we12-accent); outline-offset: 4px; border-radius: 16px; }
.hb-we12-badge { position: absolute; left: 10px; top: 10px; height: 22px; padding: 0 8px; border-radius: 6px; font-size: 11px; font-weight: 600; line-height: 22px; color: #18181b; background: rgba(255,255,255,.9); }
.hb-we12-pn { display: flex; justify-content: space-between; gap: 10px; font-size: 14px; font-weight: 500; }
.hb-we12-pn span:last-child { font-variant-numeric: tabular-nums; }
.hb-we12-pm { margin-top: -6px; color: #71717a; font-size: 12.5px; }
.hb-we12-empty { grid-column: 1 / -1; display: grid; justify-items: center; gap: 10px; padding: 56px 16px; border-radius: 18px; color: #71717a; font-size: 14px; text-align: center; background: #fff; box-shadow: inset 0 0 0 1px rgba(24,24,27,.07); }
@keyframes hb-we12-roll { from { opacity: 0; transform: translateY(-60%); } to { opacity: 1; transform: none; } }
@keyframes hb-we12-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@keyframes hb-we12-enter { from { opacity: 0; transform: scale(.92) translateY(10px); } to { opacity: 1; transform: none; } }
@container (max-width: 640px) {
  .hb-we12-sort { margin-left: 0; }
  .hb-we12-sep { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we12 *, .hb-we12 *::before, .hb-we12 *::after { transition: none !important; animation: none !important; }
}
`;

function Garment({ category, color }: { category: string; color: string }) {
  const dark = "rgba(0,0,0,.18)";
  if (category === "Knitwear") {
    return (
      <svg viewBox="0 0 200 250" aria-hidden="true">
        <path d="M70 50 Q100 62 130 50 L170 72 L160 140 L144 136 L144 210 L56 210 L56 136 L40 140 L30 72 Z" fill={color} />
        <path d="M70 50 Q100 70 130 50" fill="none" stroke={dark} strokeWidth="4" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M ${68 + i * 11} 88 V 205`} stroke={dark} strokeWidth="1.2" opacity=".6" />
        ))}
        <rect x="56" y="196" width="88" height="14" fill={dark} />
      </svg>
    );
  }
  if (category === "Trousers") {
    return (
      <svg viewBox="0 0 200 250" aria-hidden="true">
        <path d="M66 36 H134 L144 218 H108 L100 96 L92 218 H56 Z" fill={color} />
        <rect x="66" y="36" width="68" height="12" fill={dark} />
        <path d="M100 48 V 90" stroke={dark} strokeWidth="2" />
        <path d="M74 56 Q 84 66 94 56" fill="none" stroke={dark} strokeWidth="2" />
      </svg>
    );
  }
  if (category === "Accessories") {
    return (
      <svg viewBox="0 0 200 250" aria-hidden="true">
        <path d="M74 110 Q 74 64 100 64 Q 126 64 126 110" fill="none" stroke={dark} strokeWidth="6" />
        <path d="M54 104 H146 L156 206 H44 Z" fill={color} />
        <path d="M54 104 H146 L148 122 H52 Z" fill={dark} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 250" aria-hidden="true">
      <path d="M76 40 L100 56 L124 40 L168 64 L160 150 L146 146 L146 216 L54 216 L54 146 L40 150 L32 64 Z" fill={color} />
      <path d="M76 40 L92 74 L100 56 L108 74 L124 40" fill={dark} />
      <path d="M100 74 V 216" stroke={dark} strokeWidth="2" />
      <rect x="62" y="150" width="26" height="20" rx="3" fill={dark} />
      <rect x="112" y="150" width="26" height="20" rx="3" fill={dark} />
    </svg>
  );
}

export function ShopFilterChips({
  title = "Outerwear and layers",
  subtitle = "Autumn collection · free returns within 60 days",
  products = defaultProducts,
  categories,
  tags = ["Waterproof", "Recycled", "New", "Under $100"],
  currency = "$",
  defaultTags = [],
  accent = "#1f6feb",
  onFiltersChange,
  className,
  style,
  ...rest
}: ShopFilterChipsProps) {
  const cats = React.useMemo(() => categories ?? ["All", ...Array.from(new Set(products.map((p) => p.category)))], [categories, products]);
  const colorList = React.useMemo(() => {
    const m = new Map<string, string>();
    products.forEach((p) => m.set(p.colorName, p.color));
    return Array.from(m, ([name, value]) => ({ name, value }));
  }, [products]);

  const [state, setState] = React.useState<FilterChipsState>({ category: cats[0] ?? "All", tags: defaultTags, colors: [], sort: "featured" });
  const cardRefs = React.useRef(new Map<string, HTMLElement>());
  const rects = React.useRef(new Map<string, DOMRect>());
  const [prevIds, setPrevIds] = React.useState<string[] | null>(null);
  const catRef = React.useRef<HTMLDivElement | null>(null);
  const indRef = React.useRef<HTMLSpanElement | null>(null);

  const visible = React.useMemo(() => {
    const list = products.filter(
      (p) =>
        (state.category === "All" || p.category === state.category) &&
        state.tags.every((t) => p.tags.includes(t)) &&
        (state.colors.length === 0 || state.colors.includes(p.colorName)),
    );
    if (state.sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, state]);

  const update = (next: Partial<FilterChipsState>) => {
    const m = new Map<string, DOMRect>();
    cardRefs.current.forEach((el, id) => m.set(id, el.getBoundingClientRect()));
    rects.current = m;
    setPrevIds(visible.map((p) => p.id));
    const s = { ...state, ...next };
    setState(s);
    onFiltersChange?.(s);
  };

  React.useLayoutEffect(() => {
    const before = rects.current;
    if (!before.size) return;
    rects.current = new Map();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cardRefs.current.forEach((el, id) => {
      const a = before.get(id);
      if (!a) return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      void el.offsetWidth;
      el.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1)";
      el.style.transform = "";
    });
  }, [visible]);

  React.useLayoutEffect(() => {
    const wrap = catRef.current;
    const ind = indRef.current;
    if (!wrap || !ind) return;
    const place = () => {
      const btn = wrap.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!btn) return;
      ind.style.setProperty("--hb-we12-l", `${btn.offsetLeft}px`);
      ind.style.setProperty("--hb-we12-w", `${btn.offsetWidth}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [state.category]);

  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const activeCount = state.tags.length + state.colors.length;
  const isNew = (id: string) => prevIds !== null && !prevIds.includes(id);

  return (
    <section
      className={["hb-we12", className].filter(Boolean).join(" ")}
      style={{ "--hb-we12-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-filter-chips" precedence="default">{css}</style>
      <div className="hb-we12-inner">
        <div className="hb-we12-head">
          <div>
            <h2 className="hb-we12-title">{title}</h2>
            {subtitle ? <p className="hb-we12-sub">{subtitle}</p> : null}
          </div>
          <span className="hb-we12-count" aria-live="polite">
            <b key={visible.length}>{visible.length}</b> {visible.length === 1 ? "product" : "products"}
          </span>
        </div>
        <div className="hb-we12-bar">
          <div ref={catRef} className="hb-we12-cats" role="group" aria-label="Category">
            <span ref={indRef} className="hb-we12-ind" aria-hidden="true" />
            {cats.map((c) => (
              <button key={c} type="button" className="hb-we12-cat" aria-pressed={state.category === c} onClick={() => update({ category: c })}>
                {c}
              </button>
            ))}
          </div>
          <div className="hb-we12-row">
            {tags.map((t) => (
              <button key={t} type="button" className="hb-we12-chip" aria-pressed={state.tags.includes(t)} onClick={() => update({ tags: toggle(state.tags, t) })}>
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                {t}
              </button>
            ))}
            <span className="hb-we12-sep" aria-hidden="true" />
            {colorList.map((c) => (
              <button
                key={c.name}
                type="button"
                className="hb-we12-dot"
                aria-pressed={state.colors.includes(c.name)}
                aria-label={c.name}
                title={c.name}
                style={{ "--hb-we12-c": c.value } as React.CSSProperties}
                onClick={() => update({ colors: toggle(state.colors, c.name) })}
              />
            ))}
            <label className="hb-we12-sort">
              Sort
              <select value={state.sort} onChange={(e) => update({ sort: e.target.value as FilterChipsState["sort"] })}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </label>
          </div>
          <div className="hb-we12-active" aria-label="Active filters">
            {activeCount === 0 ? <span className="hb-we12-hint">No filters applied. Pick a chip or a color above.</span> : null}
            {state.tags.map((t) => (
              <span key={`t-${t}`} className="hb-we12-tag">
                {t}
                <button type="button" className="hb-we12-x" aria-label={`Remove ${t}`} onClick={() => update({ tags: state.tags.filter((x) => x !== t) })}>
                  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </span>
            ))}
            {state.colors.map((c) => (
              <span key={`c-${c}`} className="hb-we12-tag">
                <i style={{ "--hb-we12-c": colorList.find((x) => x.name === c)?.value } as React.CSSProperties} />
                {c}
                <button type="button" className="hb-we12-x" aria-label={`Remove ${c}`} onClick={() => update({ colors: state.colors.filter((x) => x !== c) })}>
                  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </span>
            ))}
            {activeCount > 1 ? (
              <button type="button" className="hb-we12-clear" onClick={() => update({ tags: [], colors: [] })}>Clear all</button>
            ) : null}
          </div>
        </div>
        <div className="hb-we12-grid">
          {visible.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="hb-we12-card"
              data-enter={isNew(p.id) ? "true" : "false"}
              ref={(el) => {
                if (el) cardRefs.current.set(p.id, el);
                else cardRefs.current.delete(p.id);
              }}
            >
              <div className="hb-we12-img">
                <Garment category={p.category} color={p.color} />
                {p.tags.includes("New") ? <span className="hb-we12-badge">New</span> : null}
              </div>
              <div className="hb-we12-pn">
                <span>{p.name}</span>
                <span>{currency}{p.price}</span>
              </div>
              <div className="hb-we12-pm">{p.colorName} · {p.category}</div>
            </a>
          ))}
          {visible.length === 0 ? (
            <div className="hb-we12-empty">
              Nothing matches every filter.
              <button type="button" className="hb-we12-clear" onClick={() => update({ tags: [], colors: [] })}>Clear filters</button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

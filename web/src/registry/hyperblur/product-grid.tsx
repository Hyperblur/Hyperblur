"use client";

import * as React from "react";

export type ProductShape = "orb" | "arch" | "ring" | "bars";
export type ProductSort = "featured" | "price-asc" | "price-desc";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  colors: [string, string];
  shape?: ProductShape;
}

export const defaultProducts: Product[] = [
  { id: "pr1", name: "Arc Floor Lamp", category: "Lighting", price: 189, rating: 4.8, colors: ["#f5b84a", "#b8561f"], shape: "arch" },
  { id: "pr2", name: "Tidal Lounge Chair", category: "Seating", price: 420, rating: 4.9, colors: ["#4a7fc0", "#142a45"], shape: "arch" },
  { id: "pr3", name: "Terra Vase", category: "Decor", price: 58, rating: 4.7, colors: ["#e07a5f", "#5a2418"], shape: "orb" },
  { id: "pr4", name: "Halo Pendant", category: "Lighting", price: 124, rating: 4.6, colors: ["#ffd9a0", "#8a5a2b"], shape: "ring" },
  { id: "pr5", name: "Mono Stool", category: "Seating", price: 96, rating: 4.4, colors: ["#9a9aa4", "#26262b"], shape: "orb" },
  { id: "pr6", name: "Woven Throw", category: "Decor", price: 79.5, rating: 4.5, colors: ["#a3b18a", "#2f4a3c"], shape: "bars" },
  { id: "pr7", name: "Cove Table Lamp", category: "Lighting", price: 68, rating: 4.3, colors: ["#d7b8ff", "#432b73"], shape: "orb" },
  { id: "pr8", name: "Ridge Wall Mirror", category: "Decor", price: 145, rating: 4.6, colors: ["#8fd3d0", "#154245"], shape: "ring" },
];

export interface ProductGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  products?: Product[];
  allLabel?: string;
  category?: string;
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
  sort?: ProductSort;
  defaultSort?: ProductSort;
  onSortChange?: (sort: ProductSort) => void;
  defaultFavorites?: string[];
  onFavorite?: (product: Product, favorited: boolean) => void;
  density?: "comfortable" | "compact";
  accent?: string;
}

const css = `
.hb-pgr {
  --hb-pgr-accent: #2f7bff;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
}
.hb-pgr *, .hb-pgr *::before, .hb-pgr *::after { box-sizing: border-box; font-family: inherit; }
.hb-pgr[data-density="compact"] { gap: 6px; }
.hb-pgr-chips {
  position: relative;
  display: flex;
  gap: 4px;
  padding: 3px;
  overflow-x: auto;
  border: 1px solid #1f1f1f;
  border-radius: 999px;
  background: #0d0d0d;
  scrollbar-width: none;
}
.hb-pgr-chips::-webkit-scrollbar { display: none; }
.hb-pgr-pill {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 0;
  width: var(--hb-pgr-pw, 0px);
  border-radius: 999px;
  background: var(--hb-pgr-accent);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--hb-pgr-accent) 40%, transparent);
  transform: translateX(var(--hb-pgr-px, 0px));
  opacity: 0;
  pointer-events: none;
}
.hb-pgr-pill[data-ready="true"] { opacity: 1; transition: transform .38s cubic-bezier(.3, 1.2, .4, 1), width .38s cubic-bezier(.3, 1.2, .4, 1); }
.hb-pgr-chip {
  position: relative;
  z-index: 1;
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: none;
  color: #a1a1a1;
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-pgr-chip:hover { color: #ededed; }
.hb-pgr-chip[aria-pressed="true"] { color: #fff; }
.hb-pgr:not([data-ready="true"]) .hb-pgr-chip[aria-pressed="true"] { background: var(--hb-pgr-accent); }
.hb-pgr-chip small { font-size: 10.5px; font-variant-numeric: tabular-nums; opacity: .6; }
.hb-pgr-chip:focus-visible, .hb-pgr-select:focus-visible, .hb-pgr-heart:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--hb-pgr-accent) 80%, transparent);
  outline-offset: 2px;
}
.hb-pgr-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-pgr-count { font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-pgr-sortbox { position: relative; display: inline-flex; align-items: center; }
.hb-pgr-select {
  appearance: none;
  height: 28px;
  padding: 0 26px 0 10px;
  border: 1px solid #262626;
  border-radius: 8px;
  background: #111111;
  color: #ededed;
  font-size: 12px;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease;
}
.hb-pgr-select:hover { border-color: #3a3a3a; background: #151515; }
.hb-pgr-select option { background: #171717; color: #ededed; }
.hb-pgr-sortbox svg { position: absolute; right: 9px; width: 9px; height: 9px; color: #8f8f8f; pointer-events: none; }
.hb-pgr-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.hb-pgr[data-density="compact"] .hb-pgr-grid { gap: 6px; }
.hb-pgr-card {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 6px 10px;
  border: 1px solid #1f1f1f;
  border-radius: 14px;
  background: #101010;
  transition: border-color .2s ease, background-color .2s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-pgr-card:hover { border-color: #2e2e2e; background: #131313; transform: translateY(-2px); }
.hb-pgr-img {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  background:
    radial-gradient(120% 90% at 18% 0%, rgba(255, 255, 255, .3), transparent 55%),
    linear-gradient(var(--hb-pgr-ang, 150deg), var(--hb-pgr-a), var(--hb-pgr-b));
}
.hb-pgr-shape {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-pgr-card:hover .hb-pgr-shape { transform: translateX(-50%) scale(1.07); }
.hb-pgr-shape[data-shape="orb"] {
  bottom: 14%;
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 34% 28%, rgba(255, 255, 255, .6), rgba(255, 255, 255, .06) 62%);
  box-shadow: 0 14px 22px -8px rgba(0, 0, 0, .5);
}
.hb-pgr-shape[data-shape="arch"] {
  bottom: 0;
  width: 36%;
  height: 64%;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, .42), rgba(255, 255, 255, .06));
}
.hb-pgr-shape[data-shape="ring"] {
  top: 50%;
  width: 46%;
  aspect-ratio: 1;
  margin-top: -23%;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, .48);
  box-shadow: 0 10px 20px -6px rgba(0, 0, 0, .45), inset 0 0 12px rgba(255, 255, 255, .15);
}
.hb-pgr-shape[data-shape="bars"] {
  bottom: 0;
  width: 56%;
  height: 58%;
  border-radius: 8px 8px 0 0;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, .42) 0 9px, rgba(255, 255, 255, .1) 9px 16px);
}
.hb-pgr-heart {
  position: absolute;
  top: 6px;
  right: 6px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(10, 10, 10, .5);
  backdrop-filter: blur(6px);
  color: #fff;
  cursor: pointer;
  transition: background-color .15s ease, transform .2s cubic-bezier(.3, 1.6, .5, 1);
}
.hb-pgr-heart:hover { background: rgba(10, 10, 10, .72); transform: scale(1.08); }
.hb-pgr-heart:active { transform: scale(.88); }
.hb-pgr-heart svg { width: 15px; height: 15px; }
.hb-pgr-heart svg path { transition: fill .2s ease, stroke .2s ease; }
.hb-pgr-heart[aria-pressed="true"] { color: #ff5d7a; }
.hb-pgr-heart[aria-pressed="true"] svg { animation: hb-pgr-beat .4s cubic-bezier(.3, 1.6, .5, 1); }
.hb-pgr-heart[aria-pressed="true"] svg path { fill: currentColor; }
.hb-pgr-info { min-width: 0; display: flex; flex-direction: column; gap: 1px; padding: 0 4px; }
.hb-pgr-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-pgr-cat { font-size: 11.5px; color: #6f6f6f; }
.hb-pgr-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 3px; }
.hb-pgr-price { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-pgr-rate { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-pgr-rate svg { width: 11px; height: 11px; color: #f5b84a; }
.hb-pgr[data-density="compact"] .hb-pgr-chips { padding: 2px; }
.hb-pgr[data-density="compact"] .hb-pgr-pill { top: 2px; bottom: 2px; }
.hb-pgr[data-density="compact"] .hb-pgr-chip { height: 22px; padding: 0 11px; font-size: 12px; }
.hb-pgr[data-density="compact"] .hb-pgr-select { height: 24px; font-size: 11.5px; }
.hb-pgr[data-density="compact"] .hb-pgr-card { flex-direction: row; align-items: center; gap: 8px; padding: 4px; border-radius: 11px; }
.hb-pgr[data-density="compact"] .hb-pgr-img { position: static; flex: none; width: 36px; height: 36px; aspect-ratio: auto; border-radius: 8px; }
.hb-pgr[data-density="compact"] .hb-pgr-info { flex: 1; padding: 0 22px 0 0; gap: 0; }
.hb-pgr[data-density="compact"] .hb-pgr-name { font-size: 12px; }
.hb-pgr[data-density="compact"] .hb-pgr-cat { display: none; }
.hb-pgr[data-density="compact"] .hb-pgr-foot { margin-top: 1px; justify-content: flex-start; gap: 8px; }
.hb-pgr[data-density="compact"] .hb-pgr-price { font-size: 12px; }
.hb-pgr[data-density="compact"] .hb-pgr-rate { font-size: 11px; }
.hb-pgr[data-density="compact"] .hb-pgr-heart { top: calc(50% - 11px); right: 4px; width: 22px; height: 22px; background: none; backdrop-filter: none; color: #6f6f6f; }
.hb-pgr[data-density="compact"] .hb-pgr-heart[aria-pressed="true"] { color: #ff5d7a; }
.hb-pgr[data-density="compact"] .hb-pgr-heart svg { width: 13px; height: 13px; }
.hb-pgr-empty { grid-column: 1 / -1; padding: 24px 12px; text-align: center; color: #8f8f8f; }
.hb-pgr-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 560px) {
  .hb-pgr-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@container (min-width: 800px) {
  .hb-pgr-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@keyframes hb-pgr-beat {
  0% { transform: scale(.6); }
  60% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-pgr-pill, .hb-pgr-card, .hb-pgr-shape, .hb-pgr-heart, .hb-pgr-chip, .hb-pgr-select { transition: none !important; }
  .hb-pgr-heart[aria-pressed="true"] svg { animation: none !important; }
}
`;

const sortLabels: Record<ProductSort, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

function formatPrice(value: number) {
  const whole = Number.isInteger(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(value);
}

export function ProductGrid({
  products = defaultProducts,
  allLabel = "All",
  category,
  defaultCategory,
  onCategoryChange,
  sort,
  defaultSort = "featured",
  onSortChange,
  defaultFavorites = [],
  onFavorite,
  density = "comfortable",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ProductGridProps) {
  const [innerCategory, setInnerCategory] = React.useState(defaultCategory ?? allLabel);
  const [innerSort, setInnerSort] = React.useState<ProductSort>(defaultSort);
  const [favorites, setFavorites] = React.useState<string[]>(defaultFavorites);
  const [pill, setPill] = React.useState<{ x: number; w: number } | null>(null);
  const chipsRef = React.useRef<HTMLDivElement | null>(null);
  const chipRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const cardRefs = React.useRef(new Map<string, HTMLLIElement>());
  const before = React.useRef<Map<string, DOMRect> | null>(null);

  const activeCategory = category ?? innerCategory;
  const activeSort = sort ?? innerSort;

  const categoryNames = React.useMemo(() => {
    const seen: string[] = [];
    for (const p of products) if (!seen.includes(p.category)) seen.push(p.category);
    return seen;
  }, [products]);

  const filtered = activeCategory === allLabel ? products : products.filter((p) => p.category === activeCategory);
  const visible =
    activeSort === "featured"
      ? filtered
      : [...filtered].sort((a, b) => (activeSort === "price-asc" ? a.price - b.price : b.price - a.price));

  const measure = React.useCallback(() => {
    const el = chipRefs.current.get(activeCategory);
    if (!el) return;
    setPill((prev) => (prev && prev.x === el.offsetLeft && prev.w === el.offsetWidth ? prev : { x: el.offsetLeft, w: el.offsetWidth }));
    const box = chipsRef.current;
    if (box) {
      const left = el.offsetLeft - 8;
      const right = el.offsetLeft + el.offsetWidth + 8;
      if (left < box.scrollLeft) box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      else if (right > box.scrollLeft + box.clientWidth) box.scrollTo({ left: right - box.clientWidth, behavior: "smooth" });
    }
  }, [activeCategory]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure, categoryNames]);

  React.useEffect(() => {
    const box = chipsRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(box);
    return () => observer.disconnect();
  }, [measure]);

  React.useLayoutEffect(() => {
    const first = before.current;
    before.current = null;
    if (!first) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cardRefs.current.forEach((el, id) => {
      const from = first.get(id);
      if (!from) {
        el.animate(
          [
            { opacity: 0, transform: "scale(.92) translateY(10px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 380, easing: "cubic-bezier(.2, .8, .2, 1)", delay: 60 },
        );
        return;
      }
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;
      el.animate(
        [
          { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)` },
          { transform: "none" },
        ],
        { duration: 440, easing: "cubic-bezier(.2, .8, .2, 1)" },
      );
    });
  }, [activeCategory, activeSort]);

  const capture = () => {
    const snapshot = new Map<string, DOMRect>();
    cardRefs.current.forEach((el, id) => snapshot.set(id, el.getBoundingClientRect()));
    before.current = snapshot;
  };

  const pickCategory = (next: string) => {
    if (next === activeCategory) return;
    capture();
    if (category === undefined) setInnerCategory(next);
    onCategoryChange?.(next);
  };

  const pickSort = (next: ProductSort) => {
    if (next === activeSort) return;
    capture();
    if (sort === undefined) setInnerSort(next);
    onSortChange?.(next);
  };

  const toggleFavorite = (product: Product) => {
    const on = !favorites.includes(product.id);
    setFavorites((prev) => (on ? [...prev, product.id] : prev.filter((id) => id !== product.id)));
    onFavorite?.(product, on);
  };

  const chipNames = [allLabel, ...categoryNames];
  const countFor = (name: string) => (name === allLabel ? products.length : products.filter((p) => p.category === name).length);

  const vars = {
    "--hb-pgr-accent": accent,
    "--hb-pgr-px": `${(pill?.x ?? 0).toFixed(1)}px`,
    "--hb-pgr-pw": `${(pill?.w ?? 0).toFixed(1)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-pgr ${className}`} style={vars} data-density={density} data-ready={pill !== null} {...rest}>
      <style href="hb-product-grid" precedence="default">{css}</style>
      <div className="hb-pgr-chips" role="group" aria-label="Filter by category" ref={chipsRef}>
        <span className="hb-pgr-pill" data-ready={pill !== null} aria-hidden="true" />
        {chipNames.map((name) => (
          <button
            key={name}
            type="button"
            className="hb-pgr-chip"
            aria-pressed={name === activeCategory}
            ref={(el) => {
              if (el) chipRefs.current.set(name, el);
              else chipRefs.current.delete(name);
            }}
            onClick={() => pickCategory(name)}
          >
            {name}
            {density === "comfortable" && <small>{countFor(name)}</small>}
          </button>
        ))}
      </div>
      <div className="hb-pgr-bar">
        <span className="hb-pgr-count" role="status" aria-live="polite">
          {`${visible.length} ${visible.length === 1 ? "result" : "results"}`}
        </span>
        <label className="hb-pgr-sortbox">
          <span className="hb-pgr-sr">Sort by</span>
          <select className="hb-pgr-select" value={activeSort} onChange={(event) => pickSort(event.target.value as ProductSort)}>
            {(Object.keys(sortLabels) as ProductSort[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 3.5l3 3 3-3" />
          </svg>
        </label>
      </div>
      <ul className="hb-pgr-grid" aria-label="Products">
        {visible.map((product) => {
          const liked = favorites.includes(product.id);
          const art = {
            "--hb-pgr-a": product.colors[0],
            "--hb-pgr-b": product.colors[1],
          } as React.CSSProperties;
          return (
            <li
              key={product.id}
              className="hb-pgr-card"
              ref={(el) => {
                if (el) cardRefs.current.set(product.id, el);
                else cardRefs.current.delete(product.id);
              }}
            >
              <div className="hb-pgr-img" style={art}>
                <span className="hb-pgr-shape" data-shape={product.shape ?? "orb"} />
              </div>
              <button
                type="button"
                className="hb-pgr-heart"
                aria-pressed={liked}
                aria-label={`${liked ? "Remove" : "Save"} ${product.name} ${liked ? "from" : "to"} favorites`}
                onClick={() => toggleFavorite(product)}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 13.6S2.2 10.2 2.2 6.1A3 3 0 0 1 8 5a3 3 0 0 1 5.8 1.1C13.8 10.2 8 13.6 8 13.6z" />
                </svg>
              </button>
              <div className="hb-pgr-info">
                <span className="hb-pgr-name">{product.name}</span>
                <span className="hb-pgr-cat">{product.category}</span>
                <span className="hb-pgr-foot">
                  <span className="hb-pgr-price">{formatPrice(product.price)}</span>
                  <span className="hb-pgr-rate" aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}>
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 1.6l1.9 4 4.3.5-3.2 2.9.9 4.3L8 11.1 4.1 13.3l.9-4.3L1.8 6.1l4.3-.5z" />
                    </svg>
                    {product.rating.toFixed(1)}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && <li className="hb-pgr-empty">No products found</li>}
      </ul>
    </div>
  );
}

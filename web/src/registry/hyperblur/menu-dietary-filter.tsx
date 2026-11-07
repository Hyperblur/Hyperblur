"use client";

import * as React from "react";

export type MenuDietaryTag = "vegan" | "vegetarian" | "gluten-free" | "spicy" | "new" | "popular";
export type MenuDietaryFilterId = "vegan" | "vegetarian" | "gluten-free" | "spicy" | "under-10";

export interface MenuDietaryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags?: MenuDietaryTag[];
  art?: "bowl" | "plate" | "wrap" | "soup";
  hue?: number;
}

export interface MenuDietaryFilterState {
  filters: MenuDietaryFilterId[];
  query: string;
  count: number;
}

export interface MenuDietaryFilterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: MenuDietaryItem[];
  defaultFilters?: MenuDietaryFilterId[];
  defaultQuery?: string;
  priceLimit?: number;
  onFilterChange?: (state: MenuDietaryFilterState) => void;
  accent?: string;
}

const defaultItems: MenuDietaryItem[] = [
  { id: "goddess", name: "Green Goddess Bowl", description: "Quinoa, charred broccolini, avocado, edamame, herb tahini", price: 13, tags: ["vegan", "gluten-free", "popular"], art: "bowl", hue: 120 },
  { id: "tacos", name: "Smoky Black Bean Tacos", description: "Three corn tortillas, chipotle beans, pickled onion, lime crema", price: 9.5, tags: ["vegetarian", "gluten-free", "spicy"], art: "wrap", hue: 28 },
  { id: "dandan", name: "Dan Dan Noodles", description: "Wheat noodles, Sichuan chili oil, crispy tofu, bok choy, sesame", price: 12.5, tags: ["vegan", "spicy"], art: "bowl", hue: 8 },
  { id: "halloumi", name: "Halloumi Flatbread", description: "Grilled halloumi, za'atar, blistered tomato, mint yogurt", price: 11, tags: ["vegetarian"], art: "plate", hue: 44 },
  { id: "sando", name: "Hot Honey Chicken Sando", description: "Buttermilk thigh, hot honey, cabbage slaw, toasted brioche", price: 12, tags: ["spicy", "popular"], art: "wrap", hue: 36 },
  { id: "salmon", name: "Miso Glazed Salmon", description: "Brown rice, smashed cucumber, sesame greens, pickled ginger", price: 16.5, tags: ["gluten-free"], art: "plate", hue: 16 },
  { id: "soup", name: "Roasted Tomato Soup", description: "Slow-roasted tomatoes, basil oil, garlic sourdough crumbs", price: 7.5, tags: ["vegan", "new"], art: "soup", hue: 4 },
  { id: "falafel", name: "Falafel Wrap", description: "Herbed chickpea falafel, hummus, pickled turnip, tahini", price: 9, tags: ["vegan"], art: "wrap", hue: 52 },
  { id: "caesar", name: "Kale Caesar", description: "Lacinato kale, aged parmesan, lemon, garlic crumbs", price: 10.5, tags: ["vegetarian"], art: "bowl", hue: 96 },
  { id: "cauli", name: "Gochujang Cauliflower", description: "Rice-flour crunch, sticky gochujang glaze, scallion, sesame", price: 8.5, tags: ["vegan", "gluten-free", "spicy", "new"], art: "plate", hue: 14 },
  { id: "steak", name: "Steak Frites", description: "8 oz hanger steak, herb butter, hand-cut fries, aioli", price: 24, tags: ["gluten-free"], art: "plate", hue: 22 },
  { id: "chia", name: "Mango Chia Pudding", description: "Coconut milk, passion fruit, toasted coconut flakes", price: 6.5, tags: ["vegan", "gluten-free"], art: "soup", hue: 40 },
];

const filterDefs: { id: MenuDietaryFilterId; label: string }[] = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "spicy", label: "Spicy" },
  { id: "under-10", label: "Under $10" },
];

const tagLabels: Record<MenuDietaryTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "gluten-free": "Gluten-free",
  spicy: "Spicy",
  new: "New",
  popular: "Popular",
};

const css = `
.hb-mc1 {
  --hb-mc1-accent: #34d399;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: radial-gradient(120% 70% at 85% -10%, color-mix(in srgb, var(--hb-mc1-accent) 16%, transparent), transparent 60%), #0a0b0a;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-mc1 *, .hb-mc1 *::before, .hb-mc1 *::after { box-sizing: border-box; }
.hb-mc1-wrap { max-width: 1120px; margin: 0 auto; padding: 72px 24px 96px; }
.hb-mc1-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 28px; }
.hb-mc1-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: var(--hb-mc1-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.hb-mc1-eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-mc1-accent); box-shadow: 0 0 12px var(--hb-mc1-accent); }
.hb-mc1-title { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-weight: 600; font-size: clamp(34px, 5.2cqw, 56px); line-height: 1; letter-spacing: -.035em; }
.hb-mc1-sub { margin: 14px 0 0; max-width: 460px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-mc1-count { margin: 0; color: #a1a1a1; font-size: 14px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-mc1-count b { color: #ededed; font-weight: 600; }
.hb-mc1-bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px; margin-bottom: 24px; border-radius: 20px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); box-shadow: inset 0 1px 0 rgba(255,255,255,.04); }
.hb-mc1-search { position: relative; flex: 1 1 220px; min-width: 0; }
.hb-mc1-search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8f8f8f; pointer-events: none; }
.hb-mc1-input { width: 100%; height: 42px; padding: 0 14px 0 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,.08); background: #111; color: #ededed; font: inherit; font-size: 14.5px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-mc1-input::placeholder { color: #6f6f6f; }
.hb-mc1-input:focus { border-color: color-mix(in srgb, var(--hb-mc1-accent) 60%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-mc1-accent) 20%, transparent); }
.hb-mc1-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.hb-mc1-chip { display: inline-flex; align-items: center; gap: 7px; height: 42px; padding: 0 15px; border-radius: 999px; border: 1px solid rgba(255,255,255,.1); background: #121212; color: #c8c8c8; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s, border-color .2s, color .2s, transform .15s; }
.hb-mc1-chip:hover { border-color: rgba(255,255,255,.22); color: #fff; }
.hb-mc1-chip:active { transform: scale(.96); }
.hb-mc1-chip[aria-pressed="true"] { background: color-mix(in srgb, var(--hb-mc1-accent) 16%, #111); border-color: color-mix(in srgb, var(--hb-mc1-accent) 55%, transparent); color: #fff; }
.hb-mc1-chip[aria-pressed="true"] .hb-mc1-ico { color: var(--hb-mc1-accent); }
.hb-mc1-chip:focus-visible, .hb-mc1-clear:focus-visible { outline: 2px solid var(--hb-mc1-accent); outline-offset: 2px; }
.hb-mc1-ico { flex: none; color: #8f8f8f; transition: color .2s; }
.hb-mc1-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 0; padding: 0; list-style: none; }
.hb-mc1-card { position: relative; display: flex; gap: 14px; min-width: 0; padding: 14px; border-radius: 18px; background: linear-gradient(180deg, #141414, #101010); border: 1px solid rgba(255,255,255,.07); box-shadow: inset 0 1px 0 rgba(255,255,255,.04); animation: hb-mc1-in .42s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-mc1-i, 0) * 35ms); transition: border-color .2s, transform .2s; }
.hb-mc1-card:hover { border-color: rgba(255,255,255,.16); transform: translateY(-2px); }
.hb-mc1-card[data-leaving="true"] { animation: hb-mc1-out .24s cubic-bezier(.4,0,1,1) both; pointer-events: none; }
@keyframes hb-mc1-in { from { opacity: 0; transform: translateY(10px) scale(.97); } }
@keyframes hb-mc1-out { to { opacity: 0; transform: scale(.94); filter: blur(2px); } }
.hb-mc1-art { flex: none; width: 76px; height: 76px; border-radius: 14px; background: radial-gradient(circle at 50% 40%, hsl(var(--hb-mc1-h) 45% 22%), hsl(var(--hb-mc1-h) 30% 10%)); display: grid; place-items: center; }
.hb-mc1-art svg { width: 68px; height: 68px; }
.hb-mc1-body { min-width: 0; flex: 1; display: flex; flex-direction: column; }
.hb-mc1-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.hb-mc1-name { margin: 0; font-size: 15.5px; font-weight: 600; line-height: 1.25; letter-spacing: -.01em; }
.hb-mc1-price { flex: none; font-family: var(--font-grotesk, inherit); font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; color: #fff; }
.hb-mc1-desc { margin: 5px 0 9px; color: #8f8f8f; font-size: 13px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-mc1-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; }
.hb-mc1-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px 3px 6px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: .01em; background: rgba(255,255,255,.05); color: #bdbdbd; border: 1px solid rgba(255,255,255,.07); }
.hb-mc1-tag[data-tag="vegan"], .hb-mc1-tag[data-tag="vegetarian"] { color: #86efac; background: rgba(34,197,94,.09); border-color: rgba(34,197,94,.2); }
.hb-mc1-tag[data-tag="gluten-free"] { color: #fcd34d; background: rgba(245,158,11,.09); border-color: rgba(245,158,11,.2); }
.hb-mc1-tag[data-tag="spicy"] { color: #fca5a5; background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.22); }
.hb-mc1-tag[data-tag="new"] { color: #93c5fd; background: rgba(59,130,246,.1); border-color: rgba(59,130,246,.22); }
.hb-mc1-tag[data-tag="popular"] { color: #f0abfc; background: rgba(217,70,239,.09); border-color: rgba(217,70,239,.2); }
.hb-mc1-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 56px 20px; border-radius: 20px; border: 1px dashed rgba(255,255,255,.12); animation: hb-mc1-in .4s ease both; }
.hb-mc1-empty h3 { margin: 6px 0 0; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 600; }
.hb-mc1-empty p { margin: 0; max-width: 340px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-mc1-clear { margin-top: 8px; height: 40px; padding: 0 18px; border-radius: 999px; border: 0; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s; }
.hb-mc1-clear:hover { background: #fff; }
@container (max-width: 900px) { .hb-mc1-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (max-width: 600px) {
  .hb-mc1-wrap { padding: 56px 16px 64px; }
  .hb-mc1-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-mc1-chips { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin: 0 -10px; padding: 0 10px; width: calc(100% + 20px); }
  .hb-mc1-chip { flex: none; height: 38px; padding: 0 13px; font-size: 13.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mc1 *, .hb-mc1 *::before, .hb-mc1 *::after { animation: none !important; transition: none !important; }
}
`;

function FilterIcon({ id }: { id: MenuDietaryFilterId | MenuDietaryTag }) {
  const p = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "hb-mc1-ico", "aria-hidden": true };
  if (id === "vegan") return <svg {...p}><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19l8-8" /></svg>;
  if (id === "vegetarian") return <svg {...p}><path d="M12 4c3.5 0 6 4.5 6 9a6 6 0 0 1-12 0c0-4.5 2.5-9 6-9z" /><circle cx="12" cy="14" r="2.2" /></svg>;
  if (id === "gluten-free") return <svg {...p}><path d="M12 21V8" /><path d="M12 12c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 12c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 8c-1.5-1-2-2.5-1-4.5 1.5 1 2 2.5 1 4.5z" /><path d="M4 4l16 16" /></svg>;
  if (id === "spicy") return <svg {...p}><path d="M14 6c-4 1-9 6-9 13 6 0 12-5 13-10" /><path d="M14 6c1.5-.5 3 0 4 1.5" /><path d="M15 3.5c0 1.5.5 2.5 1.5 3" /></svg>;
  if (id === "under-10") return <svg {...p}><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8" r="1.4" /></svg>;
  if (id === "new") return <svg {...p}><path d="M12 3l2.2 5.4L20 9l-4.4 3.8L17 19l-5-3-5 3 1.4-6.2L4 9l5.8-.6z" /></svg>;
  return <svg {...p}><path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z" /></svg>;
}

function DishArt({ art = "bowl", hue = 30 }: { art?: MenuDietaryItem["art"]; hue?: number }) {
  const h = (n: number, s: number, l: number) => `hsl(${((hue + n + 360) % 360).toFixed(0)} ${s}% ${l}%)`;
  if (art === "wrap") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <ellipse cx="40" cy="62" rx="26" ry="5" fill="rgba(0,0,0,.35)" />
        <path d="M14 52c4-18 16-30 26-30s22 12 26 30z" fill={h(0, 70, 72)} />
        <path d="M18 50c6-12 14-20 22-20s16 8 22 20" fill="none" stroke={h(90, 55, 45)} strokeWidth="5" strokeLinecap="round" />
        <path d="M22 48c5-8 11-13 18-13s13 5 18 13" fill="none" stroke={h(-20, 75, 52)} strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="40" r="2" fill="#fff6e8" opacity=".9" />
        <circle cx="46" cy="38" r="2" fill="#fff6e8" opacity=".9" />
        <path d="M14 52h52" stroke={h(0, 55, 58)} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "plate") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <ellipse cx="41" cy="44" rx="31" ry="29" fill="rgba(0,0,0,.35)" />
        <circle cx="40" cy="40" r="30" fill="#f4f1ea" />
        <circle cx="40" cy="40" r="22" fill="#fffdf8" stroke="#e6e0d4" />
        <path d="M27 44c2-10 18-14 26-6-3 8-19 12-26 6z" fill={h(0, 62, 50)} />
        <path d="M30 42c6-4 13-5 19-2" fill="none" stroke={h(10, 70, 72)} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="50" cy="30" r="4" fill={h(90, 50, 42)} />
        <circle cx="45" cy="27" r="3" fill={h(100, 45, 50)} />
        <circle cx="30" cy="31" r="2" fill={h(-30, 80, 55)} />
      </svg>
    );
  }
  if (art === "soup") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <ellipse cx="40" cy="64" rx="24" ry="4.5" fill="rgba(0,0,0,.35)" />
        <path d="M14 38h52c0 15-11 25-26 25S14 53 14 38z" fill="#f2efe8" />
        <ellipse cx="40" cy="38" rx="26" ry="8" fill="#dcd6ca" />
        <ellipse cx="40" cy="38" rx="23" ry="6.5" fill={h(0, 72, 52)} />
        <path d="M30 37c4-2 8 2 12 0s7-2 9 0" fill="none" stroke={h(20, 85, 78)} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="45" cy="36" r="1.8" fill={h(100, 50, 40)} />
        <path d="M32 26c-2-3 2-5 0-8M42 26c-2-3 2-5 0-8M52 26c-2-3 2-5 0-8" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="64" rx="26" ry="5" fill="rgba(0,0,0,.35)" />
      <path d="M12 36h56c0 16-12 27-28 27S12 52 12 36z" fill="#efeae0" />
      <path d="M12 36h56c0 3-1 6-2 8H14c-1-2-2-5-2-8z" fill="#ddd6c8" />
      <ellipse cx="40" cy="36" rx="28" ry="8" fill={h(0, 40, 30)} />
      <circle cx="30" cy="33" r="6" fill={h(0, 55, 48)} />
      <circle cx="44" cy="31" r="5.5" fill={h(60, 55, 55)} />
      <circle cx="53" cy="36" r="4.5" fill={h(-40, 65, 55)} />
      <circle cx="37" cy="38" r="4" fill={h(30, 50, 70)} />
      <path d="M24 37l5-4M47 37l4-3" stroke="#fff6e8" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function matches(item: MenuDietaryItem, filters: MenuDietaryFilterId[], query: string, limit: number) {
  const tags = item.tags ?? [];
  for (const f of filters) {
    if (f === "under-10") {
      if (item.price >= limit) return false;
    } else if (f === "vegetarian") {
      if (!tags.includes("vegetarian") && !tags.includes("vegan")) return false;
    } else if (!tags.includes(f)) return false;
  }
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${item.name} ${item.description}`.toLowerCase().includes(q);
}

export function MenuDietaryFilter({
  eyebrow = "Greenline Kitchen · All-day menu",
  title = "Eat the way you eat.",
  subtitle = "Twelve dishes, cooked to order. Filter by what works for you and every plate is clearly marked.",
  items = defaultItems,
  defaultFilters = [],
  defaultQuery = "",
  priceLimit = 10,
  onFilterChange,
  accent = "#34d399",
  className,
  style,
  ...rest
}: MenuDietaryFilterProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [filters, setFilters] = React.useState<MenuDietaryFilterId[]>(defaultFilters);
  const [query, setQuery] = React.useState(defaultQuery);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const visible = items.filter((it) => matches(it, filters, query, priceLimit));

  const apply = (nextFilters: MenuDietaryFilterId[], nextQuery: string) => {
    const before = new Set(visible.map((it) => it.id));
    const after = items.filter((it) => matches(it, nextFilters, nextQuery, priceLimit));
    const afterIds = new Set(after.map((it) => it.id));
    const gone = [...before].filter((id) => !afterIds.has(id));
    setFilters(nextFilters);
    setQuery(nextQuery);
    setLeaving(gone);
    if (timer.current) clearTimeout(timer.current);
    if (gone.length) timer.current = setTimeout(() => setLeaving([]), 240);
    onFilterChange?.({ filters: nextFilters, query: nextQuery, count: after.length });
  };

  const toggle = (id: MenuDietaryFilterId) => {
    apply(filters.includes(id) ? filters.filter((f) => f !== id) : [...filters, id], query);
  };

  const visibleIds = new Set(visible.map((it) => it.id));
  const rendered = items.filter((it) => visibleIds.has(it.id) || leaving.includes(it.id));
  const activeLabels = filterDefs.filter((f) => filters.includes(f.id)).map((f) => f.label);
  const priceLabel = (n: number) => (Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2));

  return (
    <section
      className={["hb-mc1", className].filter(Boolean).join(" ")}
      style={{ "--hb-mc1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-dietary-filter" precedence="default">{css}</style>
      <div className="hb-mc1-wrap">
        <div className="hb-mc1-head">
          <div>
            <p className="hb-mc1-eyebrow">{eyebrow}</p>
            <h2 className="hb-mc1-title">{title}</h2>
            <p className="hb-mc1-sub">{subtitle}</p>
          </div>
          <p className="hb-mc1-count" aria-live="polite">
            Showing <b>{visible.length}</b> of <b>{items.length}</b>
          </p>
        </div>
        <div className="hb-mc1-bar">
          <label className="hb-mc1-search">
            <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search the menu</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              className="hb-mc1-input"
              type="search"
              value={query}
              placeholder="Search tacos, tofu, salmon..."
              aria-controls={`${uid}-list`}
              onChange={(e) => apply(filters, e.target.value)}
            />
          </label>
          <div className="hb-mc1-chips" role="group" aria-label="Dietary filters">
            {filterDefs.map((f) => (
              <button
                key={f.id}
                type="button"
                className="hb-mc1-chip"
                aria-pressed={filters.includes(f.id)}
                onClick={() => toggle(f.id)}
              >
                <FilterIcon id={f.id} />
                {f.id === "under-10" ? `Under $${priceLabel(priceLimit)}` : f.label}
              </button>
            ))}
          </div>
        </div>
        {rendered.length ? (
          <ul className="hb-mc1-grid" id={`${uid}-list`}>
            {rendered.map((it, i) => (
              <li
                key={it.id}
                className="hb-mc1-card"
                data-leaving={leaving.includes(it.id) && !visibleIds.has(it.id) ? "true" : undefined}
                style={{ "--hb-mc1-i": i % 9, "--hb-mc1-h": String(it.hue ?? 30) } as React.CSSProperties}
              >
                <div className="hb-mc1-art"><DishArt art={it.art} hue={it.hue} /></div>
                <div className="hb-mc1-body">
                  <div className="hb-mc1-row">
                    <h3 className="hb-mc1-name">{it.name}</h3>
                    <span className="hb-mc1-price">${it.price.toFixed(2)}</span>
                  </div>
                  <p className="hb-mc1-desc">{it.description}</p>
                  {it.tags?.length ? (
                    <div className="hb-mc1-tags">
                      {it.tags.map((t) => (
                        <span key={t} className="hb-mc1-tag" data-tag={t}>
                          <FilterIcon id={t} />
                          {tagLabels[t]}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="hb-mc1-empty" id={`${uid}-list`} role="status">
            <svg width="56" height="56" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <path d="M12 36h56c0 16-12 27-28 27S12 52 12 36z" stroke="#5a5a5a" strokeWidth="2.5" />
              <path d="M30 26c-2-3 2-5 0-8M40 26c-2-3 2-5 0-8M50 26c-2-3 2-5 0-8" stroke="#3d3d3d" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <h3>Nothing on the menu matches</h3>
            <p>
              No dish is {activeLabels.length ? activeLabels.join(" + ").toLowerCase() : "a match"}
              {query.trim() ? ` for "${query.trim()}"` : ""}. Try removing a filter.
            </p>
            <button type="button" className="hb-mc1-clear" onClick={() => apply([], "")}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}

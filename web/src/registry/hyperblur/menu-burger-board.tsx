"use client";

import * as React from "react";

export type MenuBurgerTag = "popular" | "spicy" | "new" | "vegan" | "gluten-free";
export type MenuBurgerArt = "burger" | "double" | "chicken" | "veggie" | "fries" | "loaded" | "shake" | "combo";

export interface MenuBurgerCategory {
  id: string;
  label: string;
  note?: string;
}

export interface MenuBurgerItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  art: MenuBurgerArt;
  shade?: string;
  tags?: MenuBurgerTag[];
}

export interface MenuBurgerOrder {
  lines: { item: MenuBurgerItem; quantity: number }[];
  count: number;
  total: number;
}

export interface MenuBurgerBoardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: MenuBurgerCategory[];
  items?: MenuBurgerItem[];
  defaultCategory?: string;
  defaultOrder?: Record<string, number>;
  accent?: string;
  onPlaceOrder?: (order: MenuBurgerOrder) => void;
}

const defaultCategories: MenuBurgerCategory[] = [
  { id: "burgers", label: "Burgers", note: "Smashed on a 500° flat top" },
  { id: "fries", label: "Fries", note: "Hand cut, double fried" },
  { id: "shakes", label: "Shakes", note: "Frozen custard, spun to order" },
  { id: "combos", label: "Combos", note: "Burger, side and a drink" },
];

const defaultItems: MenuBurgerItem[] = [
  { id: "smash-double", category: "burgers", name: "Smash Double", description: "Two 3 oz patties, American cheese, pickles, house sauce, potato bun.", price: 11.5, art: "double", tags: ["popular"] },
  { id: "classic-single", category: "burgers", name: "The Classic", description: "One 4 oz smash patty, cheddar, shredded lettuce, tomato, white onion.", price: 8.25, art: "burger" },
  { id: "hot-honey", category: "burgers", name: "Hot Honey Chicken", description: "Crispy buttermilk thigh, chili honey, vinegar slaw, bread-and-butter pickles.", price: 10.75, art: "chicken", tags: ["spicy", "new"] },
  { id: "black-bean", category: "burgers", name: "Black Bean Smash", description: "Smashed black bean patty, vegan cheddar, chipotle mayo, charred onion.", price: 9.5, art: "veggie", tags: ["vegan"] },
  { id: "shoestring", category: "fries", name: "Shoestring Fries", description: "Thin cut, double fried in rice bran oil, flaky sea salt.", price: 4.25, art: "fries", tags: ["vegan", "gluten-free"] },
  { id: "garlic-fries", category: "fries", name: "Garlic Parm Fries", description: "Garlic butter, grated parmesan, parsley, black pepper.", price: 5.75, art: "fries", shade: "#ffc23d", tags: ["popular"] },
  { id: "chili-fries", category: "fries", name: "Loaded Chili Fries", description: "Beef and bean chili, cheese sauce, pickled jalapeño, scallion.", price: 7.5, art: "loaded", tags: ["spicy"] },
  { id: "vanilla-shake", category: "shakes", name: "Vanilla Bean", description: "Madagascar vanilla custard, whipped cream, a cherry on top.", price: 6.5, art: "shake", shade: "#f5ead2", tags: ["gluten-free"] },
  { id: "caramel-shake", category: "shakes", name: "Burnt Caramel", description: "Dark caramel swirl, salted pretzel crumble, malted milk.", price: 7, art: "shake", shade: "#c98a4b", tags: ["popular"] },
  { id: "berry-shake", category: "shakes", name: "Strawberry Cereal", description: "Roasted strawberries, cereal milk custard, crunchy flakes.", price: 7.25, art: "shake", shade: "#ff8fa8", tags: ["new"] },
  { id: "double-combo", category: "combos", name: "Double Down Combo", description: "Smash Double, shoestring fries and any shake. Saves $3.25.", price: 19.5, art: "combo", tags: ["popular"] },
  { id: "chicken-combo", category: "combos", name: "Hot Honey Combo", description: "Hot Honey Chicken, garlic parm fries, fresh lemonade.", price: 17.75, art: "combo", shade: "#ffd76a", tags: ["spicy"] },
  { id: "kids-combo", category: "combos", name: "Little Smash Combo", description: "Single cheeseburger, small fries, apple juice, a sticker.", price: 9.95, art: "combo", shade: "#8fd0ff" },
];

const tagLabels: Record<MenuBurgerTag, string> = { popular: "Popular", spicy: "Spicy", new: "New", vegan: "Vegan", "gluten-free": "Gluten-free" };

const css = `
.hb-ma1 {
  --hb-ma1-accent: #ff3b2f;
  --hb-ma1-mustard: #ffc23d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: #0b0b0b;
  background-image: radial-gradient(900px 420px at 85% -10%, color-mix(in srgb, var(--hb-ma1-accent) 22%, transparent), transparent 70%), radial-gradient(600px 300px at -5% 110%, rgba(255, 194, 61, .1), transparent 70%);
  color: #f4f1ea;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-ma1 *, .hb-ma1 *::before, .hb-ma1 *::after { box-sizing: border-box; }
.hb-ma1 em, .hb-ma1 i { font-style: normal; }
.hb-ma1-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.hb-ma1-wrap { max-width: 1120px; margin: 0 auto; padding: 56px 24px 88px; }
.hb-ma1-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px 40px; flex-wrap: wrap; margin-bottom: 22px; }
.hb-ma1-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: var(--hb-ma1-mustard); font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.hb-ma1-dot { width: 8px; height: 8px; border-radius: 50%; background: #3ee07a; box-shadow: 0 0 0 4px rgba(62, 224, 122, .18); }
.hb-ma1-title { margin: 0; max-width: 640px; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-weight: 700; font-size: clamp(36px, 6.4cqw, 64px); line-height: .94; letter-spacing: -.035em; text-transform: uppercase; }
.hb-ma1-title em { color: var(--hb-ma1-accent); }
.hb-ma1-sub { margin: 0; max-width: 300px; color: #a8a29a; font-size: 15px; line-height: 1.55; }
.hb-ma1-bar {
  position: sticky;
  top: 12px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 0 22px;
  padding: 10px 10px 10px 18px;
  border-radius: 18px;
  background: rgba(22, 22, 22, .86);
  border: 1px solid rgba(255, 255, 255, .09);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 24px 48px -24px rgba(0, 0, 0, .9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.hb-ma1-bag { position: relative; flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: color-mix(in srgb, var(--hb-ma1-accent) 16%, transparent); color: var(--hb-ma1-accent); }
.hb-ma1-badge { position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 999px; background: var(--hb-ma1-accent); color: #fff; font-size: 11px; font-weight: 800; line-height: 20px; text-align: center; animation: hb-ma1-pop .45s cubic-bezier(.3, 1.6, .5, 1) both; }
@keyframes hb-ma1-pop { 0% { transform: scale(.4); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
.hb-ma1-summary { flex: 1; min-width: 0; }
.hb-ma1-summary b { display: block; font-size: 13px; font-weight: 700; letter-spacing: .02em; }
.hb-ma1-summary span { display: block; overflow: hidden; color: #8f8a83; font-size: 12.5px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ma1-total { flex: none; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 26px; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; animation: hb-ma1-bump .5s cubic-bezier(.3, 1.5, .5, 1) both; }
@keyframes hb-ma1-bump { 0% { transform: translateY(6px) scale(.92); color: var(--hb-ma1-mustard); } 100% { transform: none; } }
.hb-ma1-btn { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 20px; border: 0; border-radius: 12px; background: var(--hb-ma1-accent); color: #fff; font: inherit; font-size: 14px; font-weight: 800; letter-spacing: .02em; cursor: pointer; transition: transform .18s, filter .18s, background .18s; box-shadow: 0 10px 24px -10px var(--hb-ma1-accent); }
.hb-ma1-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-ma1-btn:active { transform: translateY(1px) scale(.98); }
.hb-ma1-btn:disabled { background: #2a2a2a; color: #6f6a64; box-shadow: none; cursor: not-allowed; transform: none; }
.hb-ma1-ghost { flex: none; height: 44px; padding: 0 14px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 12px; background: transparent; color: #c9c3ba; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .18s, color .18s; }
.hb-ma1-ghost:hover { background: rgba(255, 255, 255, .06); color: #fff; }
.hb-ma1-done { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; animation: hb-ma1-slide .45s cubic-bezier(.2, .8, .2, 1) both; }
@keyframes hb-ma1-slide { from { opacity: 0; transform: translateY(8px); } }
.hb-ma1-check { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: #3ee07a; color: #07210f; }
.hb-ma1-body { display: grid; grid-template-columns: 196px minmax(0, 1fr); gap: 26px; align-items: start; }
.hb-ma1-rail { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; }
.hb-ma1-cat { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 14px 16px; border: 1px solid transparent; border-radius: 14px; background: transparent; color: #8f8a83; font: inherit; text-align: left; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.hb-ma1-cat strong { display: block; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 19px; font-weight: 700; letter-spacing: -.01em; text-transform: uppercase; }
.hb-ma1-cat small { display: block; margin-top: 2px; color: #6d6862; font-size: 11.5px; }
.hb-ma1-cat:hover { color: #f4f1ea; background: rgba(255, 255, 255, .03); }
.hb-ma1-cat[aria-selected="true"] { color: #fff; background: #151515; border-color: rgba(255, 255, 255, .08); }
.hb-ma1-cat[aria-selected="true"]::before { content: ""; position: absolute; left: -1px; top: 14px; bottom: 14px; width: 3px; border-radius: 3px; background: var(--hb-ma1-accent); }
.hb-ma1-count { flex: none; min-width: 28px; padding: 3px 8px; border-radius: 999px; background: rgba(255, 255, 255, .06); color: #a8a29a; font-size: 12px; font-weight: 700; text-align: center; }
.hb-ma1-cat[aria-selected="true"] .hb-ma1-count { background: var(--hb-ma1-accent); color: #fff; }
.hb-ma1-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
.hb-ma1-card { position: relative; display: flex; flex-direction: column; min-width: 0; border-radius: 20px; background: linear-gradient(180deg, #161616, #111); border: 1px solid rgba(255, 255, 255, .07); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05); overflow: hidden; transition: transform .25s cubic-bezier(.2, .8, .2, 1), border-color .25s; animation: hb-ma1-rise .5s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-ma1-i, 0) * 60ms); }
@keyframes hb-ma1-rise { from { opacity: 0; transform: translateY(14px); } }
.hb-ma1-card:hover { transform: translateY(-3px); border-color: rgba(255, 255, 255, .14); }
.hb-ma1-card[data-in="true"] { border-color: color-mix(in srgb, var(--hb-ma1-accent) 55%, transparent); }
.hb-ma1-art { position: relative; height: 128px; background: radial-gradient(120px 80px at 50% 60%, color-mix(in srgb, var(--hb-ma1-tone, var(--hb-ma1-accent)) 30%, transparent), transparent 75%), repeating-linear-gradient(-45deg, rgba(255, 255, 255, .025) 0 10px, transparent 10px 20px); border-bottom: 1px solid rgba(255, 255, 255, .06); }
.hb-ma1-art svg { position: absolute; inset: 6px 0 0; width: 100%; height: calc(100% - 6px); transition: transform .35s cubic-bezier(.2, .8, .2, 1); }
.hb-ma1-card:hover .hb-ma1-art svg { transform: scale(1.06) rotate(-2deg); }
.hb-ma1-tags { position: absolute; left: 10px; top: 10px; display: flex; flex-wrap: wrap; gap: 5px; }
.hb-ma1-tag { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px 0 6px; border-radius: 999px; background: rgba(0, 0, 0, .55); border: 1px solid rgba(255, 255, 255, .1); color: #f4f1ea; font-size: 10.5px; font-weight: 700; letter-spacing: .02em; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.hb-ma1-tag svg { width: 12px; height: 12px; }
.hb-ma1-tag[data-tag="spicy"] { color: #ff8a6b; }
.hb-ma1-tag[data-tag="popular"] { color: var(--hb-ma1-mustard); }
.hb-ma1-tag[data-tag="new"] { color: #8fd0ff; }
.hb-ma1-tag[data-tag="vegan"], .hb-ma1-tag[data-tag="gluten-free"] { color: #7fe39a; }
.hb-ma1-info { display: flex; flex-direction: column; flex: 1; padding: 14px 16px 16px; }
.hb-ma1-name { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 18px; font-weight: 700; letter-spacing: -.01em; line-height: 1.15; }
.hb-ma1-desc { margin: 6px 0 0; color: #8f8a83; font-size: 12.5px; line-height: 1.45; }
.hb-ma1-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 14px; }
.hb-ma1-price { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 21px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-ma1-price small { margin-right: 1px; color: var(--hb-ma1-accent); font-size: 14px; }
.hb-ma1-add { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 14px 0 10px; border: 0; border-radius: 10px; background: #f4f1ea; color: #0b0b0b; font: inherit; font-size: 13px; font-weight: 800; cursor: pointer; transition: transform .18s, background .18s; }
.hb-ma1-add:hover { background: var(--hb-ma1-mustard); }
.hb-ma1-add:active { transform: scale(.94); }
.hb-ma1-step { display: inline-flex; align-items: center; height: 36px; border-radius: 10px; background: var(--hb-ma1-accent); color: #fff; overflow: hidden; }
.hb-ma1-step button { display: grid; place-items: center; width: 34px; height: 36px; border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; transition: background .15s; }
.hb-ma1-step button:hover { background: rgba(0, 0, 0, .18); }
.hb-ma1-step output { min-width: 22px; font-size: 14px; font-weight: 800; text-align: center; animation: hb-ma1-pop .4s cubic-bezier(.3, 1.6, .5, 1) both; }
.hb-ma1 button:focus-visible { outline: 2px solid var(--hb-ma1-mustard); outline-offset: 2px; }
@container (max-width: 860px) {
  .hb-ma1-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 720px) {
  .hb-ma1-wrap { padding: 44px 18px 64px; }
  .hb-ma1-body { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .hb-ma1-rail { flex-direction: row; overflow-x: auto; scrollbar-width: none; }
  .hb-ma1-cat { width: auto; flex: none; padding: 10px 14px; }
  .hb-ma1-cat small { display: none; }
  .hb-ma1-cat strong { font-size: 15px; }
  .hb-ma1-cat[aria-selected="true"]::before { left: 14px; right: 14px; top: auto; bottom: -1px; width: auto; height: 3px; }
}
@container (max-width: 520px) {
  .hb-ma1-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-ma1-bar { flex-wrap: wrap; gap: 10px 12px; }
  .hb-ma1-total { font-size: 22px; }
  .hb-ma1-btn { flex: 1; justify-content: center; }
  .hb-ma1-ghost { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ma1 *, .hb-ma1 *::before, .hb-ma1 *::after { animation: none !important; transition: none !important; }
}
`;

const money = (n: number) => n.toFixed(2);

function TagIcon({ tag }: { tag: MenuBurgerTag }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (tag === "spicy") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M10 6c6 0 9 5 9 9 0 3-3 5-6 3-4-2-8-5-7-9 .4-2 2-3 4-3zM10 6c0-2 1.5-3 3-2.5" /></svg>;
  if (tag === "popular") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-5 1-8z" /></svg>;
  if (tag === "new") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></svg>;
  if (tag === "vegan") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 4v16M12 8l-3-2M12 8l3-2M12 12l-3-2M12 12l3-2M12 16l-3-2M12 16l3-2M4 4l16 16" /></svg>;
}

const seeds = [[78, 40, -20], [96, 33, 10], [116, 31, -5], [134, 36, 25], [150, 46, -15], [88, 52, 30], [108, 46, 0], [128, 50, -30], [68, 56, 15]];

function Burger({ sid, kind }: { sid: string; kind: "burger" | "double" | "chicken" | "veggie" }) {
  const lift = kind === "double" ? 18 : 0;
  const patty = kind === "chicken" ? `url(#${sid}-crisp)` : kind === "veggie" ? "#3b2a22" : `url(#${sid}-patty)`;
  const cheese = kind === "chicken" ? "#f3eedc" : kind === "veggie" ? "#ffb347" : "#ffc23d";
  const layer = (
    <g>
      <rect x="42" y="86" width="136" height="20" rx="10" fill={patty} />
      {kind === "veggie" ? [60, 84, 110, 134, 156].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 98 : 94} r="2" fill="#6b4a3a" />) : null}
      {kind === "chicken" ? [56, 80, 104, 128, 152].map((x, i) => <path key={x} d={`M${x} ${i % 2 ? 92 : 96}q5-4 10 0`} stroke="#9c5a18" strokeWidth="2" fill="none" strokeLinecap="round" />) : <path d="M58 92h10M96 90h12M140 93h10" stroke="#1a0b05" strokeWidth="2" strokeLinecap="round" opacity=".55" />}
      <path d="M40 80h140l-4 7h-14l-5 11-5-11h-38l-4 8-4-8h-40l-6 12-4-12H44z" fill={cheese} />
    </g>
  );
  return (
    <g transform={`translate(0 ${(lift / 2 + 4).toFixed(0)})`}>
      <ellipse cx="110" cy="128" rx="78" ry="7" fill="rgba(0,0,0,.55)" />
      <path d="M46 104h128c4 0 6 3 5 7l-2 6c-1 3-4 5-7 5H50c-3 0-6-2-7-5l-2-6c-1-4 1-7 5-7z" fill={`url(#${sid}-bunlow)`} />
      {layer}
      {lift ? <g transform={`translate(0 -${lift})`}>{layer}</g> : null}
      <g transform={`translate(0 -${lift})`}>
        <rect x="48" y="74" width="124" height="8" rx="4" fill="#e8432f" />
        <path d="M38 76c6-7 12-7 18-1s12 6 18 0 12-6 18 0 12 6 18 0 12-6 18 0 12 6 18 0 12-6 18 0 12 6 14 2l-2 6H40z" fill="#62c24b" />
        <path d="M40 70c0-28 30-46 70-46s70 18 70 46c0 3-2 5-5 5H45c-3 0-5-2-5-5z" fill={`url(#${sid}-bun)`} />
        <path d="M62 44c12-10 28-14 40-14" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" fill="none" />
        {seeds.map(([x, y, r]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3.4" ry="1.6" fill="#fff4d8" transform={`rotate(${r} ${x} ${y})`} />)}
      </g>
    </g>
  );
}

const sticks = [[78, -12], [88, -6], [96, 4], [104, -9], [112, 6], [120, -3], [128, 10], [136, -7], [144, 3]];

function Fries({ sid, tone, loaded }: { sid: string; tone: string; loaded?: boolean }) {
  return (
    <g>
      <ellipse cx="110" cy="134" rx="52" ry="6" fill="rgba(0,0,0,.55)" />
      {sticks.map(([x, r], i) => <rect key={x} x={x} y={18 + ((i * 7) % 14)} width="9" height="72" rx="3" fill={`url(#${sid}-fry)`} transform={`rotate(${r} ${x + 4} 90)`} />)}
      {loaded ? (
        <g>
          <path d="M70 66c8-14 22-10 30-16 10-8 24-4 32 2 8 6 16 4 20 14z" fill="#ffb21f" />
          <path d="M78 66c4 8 8 8 10 0M116 66c3 10 9 10 11 0" stroke="#ffb21f" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="96" cy="56" r="5" fill="#5aa83a" stroke="#2f6b1c" strokeWidth="1.5" />
          <circle cx="124" cy="58" r="4.5" fill="#5aa83a" stroke="#2f6b1c" strokeWidth="1.5" />
          <path d="M106 50l6 4M84 60l4-5M138 62l4-4" stroke="#3a7d2a" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ) : null}
      <path d="M68 68h84l-10 66H78z" fill={tone} />
      <path d="M68 68h84l-2 12H70z" fill="rgba(0,0,0,.18)" />
      <path d="M100 94l10-8 10 8-10 22z" fill="#fff" fillOpacity=".92" />
      <path d="M76 74l6 56" stroke="#fff" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Shake({ tone }: { tone: string }) {
  return (
    <g>
      <ellipse cx="110" cy="136" rx="40" ry="5" fill="rgba(0,0,0,.55)" />
      <rect x="114" y="6" width="9" height="62" rx="4" fill="#ff3b2f" transform="rotate(14 118 40)" />
      <path d="M116 14l8 2M115 26l8 2M113 38l8 2" stroke="#fff" strokeWidth="3" transform="rotate(14 118 40)" />
      <circle cx="92" cy="50" r="16" fill="#fffaf0" />
      <circle cx="112" cy="44" r="19" fill="#fffaf0" />
      <circle cx="128" cy="52" r="14" fill="#f4ecdc" />
      <circle cx="108" cy="27" r="7" fill="#d71f3c" />
      <path d="M108 21c2-6 6-9 10-10" stroke="#3b6a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M78 58h64l-9 76H87z" fill={tone} />
      <path d="M78 58h64l-1 9H79z" fill="rgba(255,255,255,.35)" />
      <path d="M86 70l6 58" stroke="#fff" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
      <rect x="84" y="92" width="52" height="12" fill="rgba(0,0,0,.14)" />
    </g>
  );
}

function FoodArt({ art, sid, shade, accent }: { art: MenuBurgerArt; sid: string; shade?: string; accent: string }) {
  let body: React.ReactNode;
  if (art === "fries" || art === "loaded") body = <Fries sid={sid} tone={accent} loaded={art === "loaded"} />;
  else if (art === "shake") body = <Shake tone={shade ?? "#f5ead2"} />;
  else if (art === "combo") {
    body = (
      <g>
        <g transform="translate(78 30) scale(.62)"><Fries sid={sid} tone={accent} /></g>
        <g transform="translate(-12 52) scale(.7)"><Shake tone={shade ?? "#c98a4b"} /></g>
        <g transform="translate(40 34) scale(.68)"><Burger sid={sid} kind="double" /></g>
      </g>
    );
  } else body = <Burger sid={sid} kind={art} />;
  return <svg viewBox="0 0 220 150" aria-hidden="true">{body}</svg>;
}

export function MenuBurgerBoard({
  eyebrow = "Smash Street · Open till 2 am",
  title = "Loud burgers. Louder fries.",
  subtitle = "Smashed thin, seared hard, stacked tall. Order at the counter or straight from your table.",
  categories = defaultCategories,
  items = defaultItems,
  defaultCategory,
  defaultOrder = { "smash-double": 2, "garlic-fries": 1 },
  accent = "#ff3b2f",
  onPlaceOrder,
  className,
  style,
  ...rest
}: MenuBurgerBoardProps) {
  const uid = React.useId();
  const sid = `hbma1${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [category, setCategory] = React.useState(defaultCategory ?? categories[0]?.id ?? "");
  const [order, setOrder] = React.useState<Record<string, number>>(defaultOrder);
  const [bump, setBump] = React.useState(0);
  const [placed, setPlaced] = React.useState<{ number: string; total: number } | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const lines = items.filter((it) => (order[it.id] ?? 0) > 0).map((it) => ({ item: it, quantity: order[it.id] }));
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  const total = lines.reduce((s, l) => s + l.quantity * l.item.price, 0);
  const visible = items.filter((it) => it.category === category);
  const active = categories.find((c) => c.id === category);

  const change = (id: string, delta: number) => {
    setPlaced(null);
    setOrder((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      if (!next[id]) delete next[id];
      return next;
    });
    setBump((b) => b + 1);
  };

  const place = () => {
    if (!count) return;
    const number = `SS-${1000 + (Math.round(total * 100) % 9000)}`;
    setPlaced({ number, total });
    onPlaceOrder?.({ lines, count, total });
    setOrder({});
  };

  const onKey = (event: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % categories.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = categories.length - 1;
    if (next < 0) return;
    event.preventDefault();
    setCategory(categories[next].id);
    tabRefs.current[next]?.focus();
  };

  const words = title.split(" ");
  const last = words.pop();

  return (
    <section className={["hb-ma1", className].filter(Boolean).join(" ")} style={{ "--hb-ma1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-menu-burger-board" precedence="default">{css}</style>
      <svg className="hb-ma1-defs" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${sid}-bun`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f9b84f" />
            <stop offset="1" stopColor="#c8651a" />
          </linearGradient>
          <linearGradient id={`${sid}-bunlow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eaa043" />
            <stop offset="1" stopColor="#b5571a" />
          </linearGradient>
          <linearGradient id={`${sid}-patty`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6b3820" />
            <stop offset="1" stopColor="#2a1309" />
          </linearGradient>
          <linearGradient id={`${sid}-crisp`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0a83c" />
            <stop offset="1" stopColor="#b8691d" />
          </linearGradient>
          <linearGradient id={`${sid}-fry`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffd86b" />
            <stop offset="1" stopColor="#f0a530" />
          </linearGradient>
        </defs>
      </svg>
      <div className="hb-ma1-wrap">
        <div className="hb-ma1-head">
          <div>
            <p className="hb-ma1-eyebrow"><span className="hb-ma1-dot" aria-hidden="true" />{eyebrow}</p>
            <h2 className="hb-ma1-title">{words.join(" ")} <em>{last}</em></h2>
          </div>
          <p className="hb-ma1-sub">{subtitle}</p>
        </div>

        <div className="hb-ma1-bar" aria-live="polite">
          {placed ? (
            <div className="hb-ma1-done">
              <span className="hb-ma1-check" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div className="hb-ma1-summary">
                <b>Order {placed.number} is on the grill</b>
                <span>${money(placed.total)} · ready for pickup in about 12 minutes</span>
              </div>
              <button type="button" className="hb-ma1-ghost" onClick={() => setPlaced(null)}>New order</button>
            </div>
          ) : (
            <>
              <span className="hb-ma1-bag" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8zM9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {count ? <span key={`b${bump}`} className="hb-ma1-badge">{count}</span> : null}
              </span>
              <div className="hb-ma1-summary">
                <b>Your order</b>
                <span>{lines.length ? lines.map((l) => `${l.quantity}× ${l.item.name}`).join(", ") : "Nothing yet, tap Add on anything below"}</span>
              </div>
              <span key={`t${bump}`} className="hb-ma1-total" aria-label={`Total $${money(total)}`}>${money(total)}</span>
              {count ? <button type="button" className="hb-ma1-ghost" onClick={() => { setOrder({}); setBump((b) => b + 1); }}>Clear</button> : null}
              <button type="button" className="hb-ma1-btn" onClick={place} disabled={!count}>
                Place order
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}
        </div>

        <div className="hb-ma1-body">
          <div className="hb-ma1-rail" role="tablist" aria-label="Menu categories" aria-orientation="vertical">
            {categories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${sid}-tab-${c.id}`}
                aria-controls={`${sid}-panel`}
                aria-selected={c.id === category}
                tabIndex={c.id === category ? 0 : -1}
                className="hb-ma1-cat"
                onClick={() => setCategory(c.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span>
                  <strong>{c.label}</strong>
                  {c.note ? <small>{c.note}</small> : null}
                </span>
                <span className="hb-ma1-count">{items.filter((it) => it.category === c.id).length}</span>
              </button>
            ))}
          </div>

          <ul className="hb-ma1-grid" role="tabpanel" id={`${sid}-panel`} aria-labelledby={active ? `${sid}-tab-${active.id}` : undefined} key={category}>
            {visible.map((it, i) => {
              const qty = order[it.id] ?? 0;
              return (
                <li key={it.id} className="hb-ma1-card" data-in={qty > 0} style={{ "--hb-ma1-i": i, "--hb-ma1-tone": it.shade ?? accent } as React.CSSProperties}>
                  <div className="hb-ma1-art">
                    <FoodArt art={it.art} sid={sid} shade={it.shade} accent={accent} />
                    {it.tags?.length ? (
                      <span className="hb-ma1-tags">
                        {it.tags.map((t) => <span key={t} className="hb-ma1-tag" data-tag={t}><TagIcon tag={t} />{tagLabels[t]}</span>)}
                      </span>
                    ) : null}
                  </div>
                  <div className="hb-ma1-info">
                    <h3 className="hb-ma1-name">{it.name}</h3>
                    <p className="hb-ma1-desc">{it.description}</p>
                    <div className="hb-ma1-foot">
                      <span className="hb-ma1-price"><small>$</small>{money(it.price)}</span>
                      {qty ? (
                        <span className="hb-ma1-step" role="group" aria-label={`${it.name} quantity`}>
                          <button type="button" aria-label={`Remove one ${it.name}`} onClick={() => change(it.id, -1)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
                          </button>
                          <output key={qty} aria-live="polite">{qty}</output>
                          <button type="button" aria-label={`Add one ${it.name}`} onClick={() => change(it.id, 1)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
                          </button>
                        </span>
                      ) : (
                        <button type="button" className="hb-ma1-add" onClick={() => change(it.id, 1)} aria-label={`Add ${it.name}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

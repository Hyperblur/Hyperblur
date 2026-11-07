"use client";

import * as React from "react";

export type MenuPhotoRailArt =
  | "burger"
  | "chicken-burger"
  | "veggie-burger"
  | "fries"
  | "loaded-fries"
  | "salad"
  | "pizza"
  | "pepperoni"
  | "bowl"
  | "soda"
  | "shake"
  | "coffee"
  | "cake"
  | "chocolate-cake";

export interface MenuPhotoRailItem {
  id: string;
  name: string;
  description: string;
  price: number;
  art: MenuPhotoRailArt;
  tint?: string;
  tag?: string;
}

export interface MenuPhotoRailSection {
  id: string;
  label: string;
  note?: string;
  items: MenuPhotoRailItem[];
}

export interface MenuPhotoRailLabels {
  eyebrow: string;
  title: string;
  subtitle: string;
  rail: string;
  add: string;
  added: string;
  count: string;
  countOne: string;
  open: string;
}

export interface MenuPhotoRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  sections?: MenuPhotoRailSection[];
  currency?: string;
  locale?: string;
  onAdd?: (item: MenuPhotoRailItem, section: MenuPhotoRailSection) => void;
  onItemOpen?: (item: MenuPhotoRailItem, section: MenuPhotoRailSection) => void;
  stickyTop?: number;
  labels?: Partial<MenuPhotoRailLabels>;
  accent?: string;
  appearance?: "dark" | "light";
}

const defaultLabels: MenuPhotoRailLabels = {
  eyebrow: "Corner Kitchen · Order for pickup or delivery",
  title: "The whole menu, one scroll away",
  subtitle: "Smashed to order, fries cut every morning, shakes spun with real ice cream.",
  rail: "Menu sections",
  add: "Add",
  added: "Added",
  count: "{count} items",
  countOne: "1 item",
  open: "View details for",
};

const defaultSections: MenuPhotoRailSection[] = [
  {
    id: "burgers",
    label: "Burgers",
    note: "Potato bun, griddled to order",
    items: [
      { id: "smash-double", name: "Smash Double", description: "Two 3 oz patties, American cheese, pickles, shaved onion, house sauce.", price: 12.5, art: "burger", tint: "#ff8a3d", tag: "Popular" },
      { id: "crispy-chicken", name: "Crispy Chicken", description: "Buttermilk thigh, hot honey glaze, cabbage slaw, dill pickles.", price: 11, art: "chicken-burger", tint: "#ffc23d", tag: "Spicy" },
      { id: "garden-stack", name: "Garden Stack", description: "Black bean and beet patty, avocado, tomato, chipotle mayo.", price: 12, art: "veggie-burger", tint: "#5fd38d", tag: "Vegan" },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    note: "Cut fresh every morning",
    items: [
      { id: "shoestring", name: "Shoestring Fries", description: "Twice fried, sea salt and a side of garlic aioli.", price: 4.5, art: "fries", tint: "#ffd34d" },
      { id: "loaded", name: "Loaded Fries", description: "Cheddar sauce, crispy shallots, scallions, pickled jalapeño.", price: 7.5, art: "loaded-fries", tint: "#ffb547", tag: "New" },
      { id: "kale-caesar", name: "Kale Caesar", description: "Lacinato kale, parmesan, sourdough crumbs, lemon dressing.", price: 8, art: "salad", tint: "#7bd88f" },
    ],
  },
  {
    id: "pizza",
    label: "Pizza & bowls",
    note: "12 inch, naturally leavened",
    items: [
      { id: "margherita", name: "Margherita", description: "San Marzano tomato, fior di latte, basil, olive oil.", price: 14, art: "pizza", tint: "#ff6b4a" },
      { id: "pepperoni", name: "Hot Pepperoni", description: "Cup and char pepperoni, mozzarella, chili honey.", price: 16, art: "pepperoni", tint: "#ff5d4d", tag: "Popular" },
      { id: "sesame-bowl", name: "Sesame Chicken Bowl", description: "Jasmine rice, glazed chicken, soft egg, cucumber, sesame.", price: 13.5, art: "bowl", tint: "#ffb86b" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    note: "Made at the counter",
    items: [
      { id: "hibiscus", name: "Hibiscus Lemonade", description: "Fresh lemon, hibiscus syrup, sparkling water over ice.", price: 4, art: "soda", tint: "#ff5d8f" },
      { id: "caramel-shake", name: "Salted Caramel Shake", description: "Vanilla custard, burnt caramel, whipped cream, cherry.", price: 6.5, art: "shake", tint: "#ffa3c2" },
      { id: "flat-white", name: "Oat Flat White", description: "Double ristretto, steamed oat milk, 8 oz.", price: 4.75, art: "coffee", tint: "#c89566" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { id: "shortcake", name: "Strawberry Shortcake", description: "Buttermilk biscuit, macerated berries, vanilla cream.", price: 7, art: "cake", tint: "#ff7a9a" },
      { id: "chocolate-cake", name: "Double Chocolate Cake", description: "Dark chocolate layers, fudge frosting, flaky salt.", price: 7.5, art: "chocolate-cake", tint: "#a8714a" },
    ],
  },
];

const css = `
.hb-oa1 {
  --hb-oa1-accent: #ff6a3d;
  --hb-oa1-top: 0px;
  --hb-oa1-bg: #0a0a0a;
  --hb-oa1-surface: #111111;
  --hb-oa1-raise: #171717;
  --hb-oa1-line: rgba(255, 255, 255, 0.08);
  --hb-oa1-text: #ededed;
  --hb-oa1-muted: #8f8f8f;
  --hb-oa1-glass: rgba(10, 10, 10, 0.78);
  --hb-oa1-art: #151515;
  --hb-oa1-mix: 34%;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: var(--hb-oa1-bg);
  color: var(--hb-oa1-text);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-oa1[data-appearance="light"] {
  --hb-oa1-bg: #f7f5ef;
  --hb-oa1-surface: #ffffff;
  --hb-oa1-raise: #f1ede4;
  --hb-oa1-line: rgba(20, 16, 10, 0.1);
  --hb-oa1-text: #17140f;
  --hb-oa1-muted: #6f685e;
  --hb-oa1-glass: rgba(247, 245, 239, 0.84);
  --hb-oa1-art: #fbf8f2;
  --hb-oa1-mix: 46%;
}
.hb-oa1 *, .hb-oa1 *::before, .hb-oa1 *::after { box-sizing: border-box; }
.hb-oa1-wrap { max-width: 1120px; margin: 0 auto; padding: 72px 20px 96px; }
.hb-oa1-head { display: grid; gap: 12px; margin-bottom: 28px; }
.hb-oa1-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: var(--hb-oa1-muted); font-size: 13px; font-weight: 500; }
.hb-oa1-eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-oa1-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-oa1-accent) 22%, transparent); }
.hb-oa1-title { margin: 0; max-width: 640px; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 5.4cqw, 52px); font-weight: 600; line-height: 1.02; letter-spacing: -0.035em; text-wrap: balance; }
.hb-oa1-sub { margin: 0; max-width: 520px; color: var(--hb-oa1-muted); font-size: 15.5px; line-height: 1.6; }
.hb-oa1-rail { position: sticky; top: var(--hb-oa1-top); z-index: 5; margin: 0 -20px; padding: 10px 20px; background: var(--hb-oa1-glass); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--hb-oa1-line); }
.hb-oa1-scroll { overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.hb-oa1-scroll::-webkit-scrollbar { display: none; }
.hb-oa1-track { position: relative; display: inline-flex; gap: 4px; padding: 2px; min-width: 100%; }
.hb-oa1-pill { position: absolute; top: 2px; left: 0; height: calc(100% - 4px); width: 0; border-radius: 999px; background: var(--hb-oa1-text); transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); pointer-events: none; }
.hb-oa1-chip { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px 0 16px; border-radius: 999px; color: var(--hb-oa1-muted); font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; transition: color 0.3s ease; outline: none; }
.hb-oa1-chip:hover { color: var(--hb-oa1-text); }
.hb-oa1-chip:focus-visible { box-shadow: 0 0 0 2px var(--hb-oa1-accent); }
.hb-oa1-chip[aria-current="true"] { color: var(--hb-oa1-bg); }
.hb-oa1-num { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: var(--hb-oa1-line); font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oa1-chip[aria-current="true"] .hb-oa1-num { background: var(--hb-oa1-accent); color: #fff; }
.hb-oa1-section { padding-top: 36px; scroll-margin-top: calc(var(--hb-oa1-top) + 72px); }
.hb-oa1-shead { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.hb-oa1-stitle { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -0.02em; }
.hb-oa1-snote { margin: 0; color: var(--hb-oa1-muted); font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-oa1-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-oa1-card { position: relative; min-width: 0; display: grid; grid-template-columns: 108px minmax(0, 1fr); gap: 14px; padding: 10px; border-radius: 20px; background: var(--hb-oa1-surface); border: 1px solid var(--hb-oa1-line); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.35s ease; animation: hb-oa1-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--hb-oa1-i) * 60ms); }
.hb-oa1-card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--hb-oa1-accent) 40%, var(--hb-oa1-line)); box-shadow: 0 22px 44px -28px rgba(0, 0, 0, 0.6); }
.hb-oa1[data-appearance="light"] .hb-oa1-card:hover { box-shadow: 0 22px 44px -28px rgba(70, 45, 15, 0.35); }
@keyframes hb-oa1-rise { from { opacity: 0; transform: translateY(14px); } }
.hb-oa1-media { position: relative; display: grid; place-items: center; aspect-ratio: 1; border-radius: 14px; overflow: hidden; background: radial-gradient(circle at 50% 62%, color-mix(in srgb, var(--hb-oa1-tint) var(--hb-oa1-mix), transparent) 0%, transparent 72%), var(--hb-oa1-art); }
.hb-oa1-media::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 1px var(--hb-oa1-line); pointer-events: none; }
.hb-oa1-media svg { width: 92%; height: auto; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); filter: drop-shadow(0 12px 12px rgba(0, 0, 0, 0.28)); }
.hb-oa1-card:hover .hb-oa1-media svg { transform: translateY(-4px) rotate(-4deg) scale(1.04); }
.hb-oa1-body { min-width: 0; display: flex; flex-direction: column; gap: 6px; padding: 4px 4px 2px 0; }
.hb-oa1-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hb-oa1-name { margin: 0; min-width: 0; font-size: 15.5px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-oa1-open { all: unset; cursor: pointer; }
.hb-oa1-open::after { content: ""; position: absolute; inset: 0; border-radius: 20px; }
.hb-oa1-open:focus-visible::after { box-shadow: 0 0 0 2px var(--hb-oa1-accent); }
.hb-oa1-tag { flex: none; padding: 3px 8px; border-radius: 999px; background: color-mix(in srgb, var(--hb-oa1-tint) 18%, transparent); color: color-mix(in srgb, var(--hb-oa1-tint) 80%, var(--hb-oa1-text)); font-size: 11px; font-weight: 600; letter-spacing: 0.01em; }
.hb-oa1-desc { margin: 0; color: var(--hb-oa1-muted); font-size: 13px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-oa1-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 4px; }
.hb-oa1-price { font-family: var(--font-grotesk, inherit); font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oa1-add { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px 0 11px; border: 1px solid var(--hb-oa1-line); border-radius: 999px; background: var(--hb-oa1-raise); color: var(--hb-oa1-text); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, color 0.2s ease; }
.hb-oa1-add:hover { background: var(--hb-oa1-accent); border-color: var(--hb-oa1-accent); color: #fff; }
.hb-oa1-add:active { transform: scale(0.95); }
.hb-oa1-add:focus-visible { outline: 2px solid var(--hb-oa1-accent); outline-offset: 2px; }
.hb-oa1-add[data-added="true"] { background: color-mix(in srgb, var(--hb-oa1-accent) 16%, var(--hb-oa1-raise)); border-color: color-mix(in srgb, var(--hb-oa1-accent) 55%, transparent); }
.hb-oa1-badge { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 5px; margin-left: 2px; border-radius: 999px; background: var(--hb-oa1-accent); color: #fff; font-size: 11px; font-variant-numeric: tabular-nums; animation: hb-oa1-pop 0.45s cubic-bezier(0.3, 1.7, 0.5, 1); }
.hb-oa1-add:hover .hb-oa1-badge { background: #fff; color: var(--hb-oa1-accent); }
@keyframes hb-oa1-pop { 0% { transform: scale(0.4); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
.hb-oa1-steam { animation: hb-oa1-steam 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.hb-oa1-steam:nth-of-type(2) { animation-delay: 0.9s; }
@keyframes hb-oa1-steam { 0% { opacity: 0; transform: translateY(6px) scaleY(0.8); } 40% { opacity: 0.7; } 100% { opacity: 0; transform: translateY(-8px) scaleY(1.1); } }
.hb-oa1-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@container (min-width: 460px) {
  .hb-oa1-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .hb-oa1-card { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 8px; }
  .hb-oa1-media { aspect-ratio: 16 / 11; }
  .hb-oa1-media svg { width: 70%; }
  .hb-oa1-body { padding: 8px 8px 6px; }
}
@container (min-width: 760px) {
  .hb-oa1-wrap { padding: 96px 32px 120px; }
  .hb-oa1-rail { margin: 0 -32px; padding: 12px 32px; }
  .hb-oa1-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
  .hb-oa1-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: end; column-gap: 40px; }
  .hb-oa1-head .hb-oa1-eyebrow { grid-column: 1 / -1; }
  .hb-oa1-sub { justify-self: end; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-oa1-card, .hb-oa1-badge, .hb-oa1-steam { animation: none; }
  .hb-oa1-card, .hb-oa1-pill, .hb-oa1-media svg, .hb-oa1-add { transition: none; }
  .hb-oa1-card:hover, .hb-oa1-card:hover .hb-oa1-media svg { transform: none; }
}
`;

const seeds: [number, number, number][] = [
  [58, 38, -20], [70, 32, 10], [84, 30, -8], [98, 33, 18], [110, 39, -14], [64, 46, 24], [78, 41, 0], [92, 42, -24], [104, 47, 12],
];

function Burger({ uid, kind }: { uid: string; kind: "beef" | "chicken" | "veggie" }) {
  const patty = kind === "chicken" ? ["#f2b24c", "#c9761f"] : kind === "veggie" ? ["#7d3b4c", "#4a1f2b"] : ["#7a3d1f", "#3d1c0c"];
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffbf61" />
          <stop offset="1" stopColor="#d1772b" />
        </linearGradient>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0a24d" />
          <stop offset="1" stopColor="#b9621f" />
        </linearGradient>
        <linearGradient id={`${uid}p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={patty[0]} />
          <stop offset="1" stopColor={patty[1]} />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="106" rx="56" ry="6" fill="rgba(0,0,0,0.28)" />
      <path d="M30 86 H130 a6 6 0 0 1 -5 10 C110 102 50 102 35 96 a6 6 0 0 1 -5 -10 Z" fill={`url(#${uid}b)`} />
      <rect x="26" y="70" width="108" height="17" rx="8.5" fill={`url(#${uid}p)`} />
      {kind === "chicken" ? (
        <path d="M30 74 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="#ffd98a" strokeWidth="2" fill="none" opacity="0.7" />
      ) : (
        <path d="M30 80 h100" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="6 5" />
      )}
      {kind === "beef" ? (
        <path d="M28 68 H132 L126 74 L120 84 L112 74 L100 80 L90 72 L76 82 L66 72 L52 80 L42 72 L34 76 Z" fill="#ffc63a" />
      ) : kind === "chicken" ? (
        <path d="M30 66 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 v6 H30 Z" fill="#e9f0d9" />
      ) : (
        <path d="M34 64 C50 58 66 70 80 64 S112 58 126 66 L120 72 H40 Z" fill="#bfe08a" />
      )}
      <path d="M24 64 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 v5 H24 Z" fill="#5cc35a" />
      <rect x="36" y="56" width="88" height="7" rx="3.5" fill="#e6493a" />
      <path d="M26 58 C26 22 134 22 134 58 Z" fill={`url(#${uid}t)`} />
      <path d="M40 44 C48 32 66 27 80 27" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round" fill="none" />
      {seeds.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.4" transform={`rotate(${r} ${x} ${y})`} fill="#fff4d6" />
      ))}
    </svg>
  );
}

function Fries({ uid, loaded }: { uid: string; loaded: boolean }) {
  const sticks = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#f1a93a" />
        </linearGradient>
        <linearGradient id={`${uid}c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5a46" />
          <stop offset="1" stopColor="#c62a22" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="108" rx="40" ry="5" fill="rgba(0,0,0,0.28)" />
      {sticks.map((i) => {
        const h = 36 + ((i * 37 + 11) % 22);
        const x = 52 + i * 6.5;
        const r = ((i * 29) % 14) - 7;
        return <rect key={i} x={x} y={62 - h} width="7" height={h + 10} rx="2" fill={`url(#${uid}f)`} transform={`rotate(${r} ${x + 3.5} 62)`} />;
      })}
      {loaded ? (
        <g>
          <path d="M50 44 C58 50 66 40 74 46 S90 52 98 44 S108 50 112 46 L110 58 H50 Z" fill="#ffb21f" opacity="0.95" />
          <circle cx="62" cy="44" r="2" fill="#4caf50" />
          <circle cx="86" cy="42" r="2" fill="#4caf50" />
          <circle cx="102" cy="45" r="2" fill="#4caf50" />
          <circle cx="74" cy="40" r="2.4" fill="#9b5524" />
        </g>
      ) : null}
      <path d="M44 56 L116 56 L106 106 L54 106 Z" fill={`url(#${uid}c)`} />
      <path d="M44 56 Q80 72 116 56 L114 64 Q80 80 46 64 Z" fill="rgba(0,0,0,0.18)" />
      <circle cx="80" cy="86" r="9" fill="none" stroke="#fff" strokeWidth="2.5" opacity="0.85" />
      <path d="M76 86 l3 3 l5 -6" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}

function Bowl({ uid, salad }: { uid: string; salad: boolean }) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={salad ? "#f3efe6" : "#2b3440"} />
          <stop offset="1" stopColor={salad ? "#cfc7b8" : "#141a22"} />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="108" rx="48" ry="5" fill="rgba(0,0,0,0.28)" />
      {salad ? (
        <g>
          <circle cx="56" cy="58" r="14" fill="#3f9a47" />
          <circle cx="74" cy="50" r="16" fill="#57b85a" />
          <circle cx="96" cy="52" r="15" fill="#3c8f43" />
          <circle cx="110" cy="60" r="11" fill="#6cc865" />
          <rect x="66" y="50" width="12" height="9" rx="2" fill="#e8c27a" transform="rotate(-14 72 54)" />
          <rect x="90" y="46" width="11" height="8" rx="2" fill="#d9ad5e" transform="rotate(18 95 50)" />
          <path d="M60 52 l10 -4 M84 44 l12 2 M102 56 l8 -6" stroke="#f6f2e4" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <path d="M40 62 C46 46 70 42 80 46 C92 40 116 44 120 62 Z" fill="#f4efe2" />
          <path d="M58 58 C62 46 78 44 84 52 C80 58 66 62 58 58 Z" fill="#c8622a" />
          <path d="M78 56 C84 44 100 44 106 54 C100 60 86 62 78 56 Z" fill="#d97a37" />
          <ellipse cx="98" cy="48" rx="11" ry="8" fill="#fffaf0" />
          <circle cx="98" cy="48" r="5" fill="#ffb21f" />
          <circle cx="54" cy="52" r="5" fill="#7cc26d" />
          <circle cx="64" cy="47" r="4" fill="#8fd17f" />
          <path d="M70 50 l3 -1 M88 46 l3 1 M76 44 l2 2 M110 56 l3 -1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
      <path d="M26 62 H134 C134 86 112 104 80 104 C48 104 26 86 26 62 Z" fill={`url(#${uid}w)`} />
      <ellipse cx="80" cy="62" rx="54" ry="4" fill={salad ? "#fffaf0" : "#3a4552"} />
      <path d="M38 72 C44 88 58 96 72 98" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Pizza({ uid, pepperoni }: { uid: string; pepperoni: boolean }) {
  const dots: [number, number][] = [[64, 44], [96, 46], [80, 62], [58, 74], [100, 76], [78, 86], [112, 60], [48, 58]];
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}z`} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#ffe4a0" />
          <stop offset="1" stopColor="#f2bb5a" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="110" rx="50" ry="5" fill="rgba(0,0,0,0.28)" />
      <circle cx="80" cy="64" r="46" fill="#d98f3e" />
      <circle cx="80" cy="64" r="46" fill="none" stroke="#b86d26" strokeWidth="2" strokeDasharray="2 6" />
      <circle cx="80" cy="64" r="39" fill="#d8432c" />
      <path d="M48 56 C52 36 76 28 92 34 C110 40 120 58 112 76 C104 96 76 100 60 90 C44 80 44 66 48 56 Z" fill={`url(#${uid}z)`} />
      {pepperoni
        ? dots.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#b9302a" />
              <circle cx={x - 1.5} cy={y - 1.5} r="2.6" fill="rgba(255,255,255,0.18)" />
            </g>
          ))
        : dots.slice(0, 5).map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6.5" fill="#fff6e2" />
              <ellipse cx={x + 7} cy={y - 6} rx="5" ry="2.6" fill="#3e9b48" transform={`rotate(${-30 + i * 20} ${x + 7} ${y - 6})`} />
            </g>
          ))}
      <path d="M80 18 V110 M34 64 H126 M47 31 L113 97 M113 31 L47 97" stroke="rgba(80,30,10,0.22)" strokeWidth="1.4" />
    </svg>
  );
}

function Drink({ uid, kind }: { uid: string; kind: "soda" | "shake" }) {
  const shake = kind === "shake";
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}l`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shake ? "#ffc4d6" : "#ff7aa2"} />
          <stop offset="1" stopColor={shake ? "#f28bb0" : "#d8285e"} />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="110" rx="26" ry="4" fill="rgba(0,0,0,0.28)" />
      <path d={shake ? "M100 38 L116 6" : "M92 46 L112 10"} stroke="#ffd34d" strokeWidth="5" strokeLinecap="round" />
      <path d={shake ? "M100 38 L116 6" : "M92 46 L112 10"} stroke="#ff5a46" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 6" />
      <path d="M56 40 H104 L97 106 H63 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" />
      <path d={shake ? "M58 52 H102 L96.6 104 H63.4 Z" : "M58.5 56 H101.5 L96.6 104 H63.4 Z"} fill={`url(#${uid}l)`} />
      {shake ? (
        <g>
          <circle cx="66" cy="44" r="10" fill="#fffaf2" />
          <circle cx="80" cy="38" r="13" fill="#fffaf2" />
          <circle cx="94" cy="44" r="10" fill="#fff4e6" />
          <circle cx="80" cy="26" r="6" fill="#e0263f" />
          <path d="M80 20 Q84 10 92 8" stroke="#3c7a3a" strokeWidth="1.8" fill="none" />
          <path d="M68 66 l20 -6 M66 80 l26 -6" stroke="#b46a3c" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
        </g>
      ) : (
        <g>
          <rect x="66" y="62" width="13" height="13" rx="3" fill="rgba(255,255,255,0.45)" transform="rotate(14 72 68)" />
          <rect x="82" y="72" width="12" height="12" rx="3" fill="rgba(255,255,255,0.38)" transform="rotate(-12 88 78)" />
          <circle cx="70" cy="92" r="1.6" fill="rgba(255,255,255,0.7)" />
          <circle cx="88" cy="96" r="1.2" fill="rgba(255,255,255,0.7)" />
          <circle cx="78" cy="86" r="1" fill="rgba(255,255,255,0.7)" />
          <circle cx="58" cy="42" r="12" fill="#ffe14d" />
          <circle cx="58" cy="42" r="9" fill="#fff2a8" />
          <path d="M58 33 V51 M49 42 H67 M52 36 L64 48 M64 36 L52 48" stroke="#ffe14d" strokeWidth="1.2" />
        </g>
      )}
      <path d="M62 48 L66 100" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Coffee({ uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}k`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9d3c8" />
        </linearGradient>
      </defs>
      <path className="hb-oa1-steam" d="M70 36 C64 28 76 22 70 12" stroke="rgba(255,255,255,0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path className="hb-oa1-steam" d="M88 36 C82 28 94 22 88 12" stroke="rgba(255,255,255,0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="102" rx="52" ry="9" fill="#e9e3d8" />
      <ellipse cx="80" cy="100" rx="40" ry="6" fill="#d6cfc2" />
      <path d="M112 58 C128 56 130 80 108 82" stroke="#e2dcd1" strokeWidth="7" fill="none" />
      <path d="M46 48 H114 V70 C114 88 100 98 80 98 C60 98 46 88 46 70 Z" fill={`url(#${uid}k)`} />
      <ellipse cx="80" cy="48" rx="34" ry="7" fill="#f5f1ea" />
      <ellipse cx="80" cy="49" rx="30" ry="5.4" fill="#8a5330" />
      <path d="M80 53 C72 47 74 44 78 45 C79 45.5 80 46.5 80 47 C80 46.5 81 45.5 82 45 C86 44 88 47 80 53 Z" fill="#e8c9a6" />
    </svg>
  );
}

function Cake({ uid, chocolate }: { uid: string; chocolate: boolean }) {
  const sponge = chocolate ? ["#7a4426", "#4e2814"] : ["#ffe2a8", "#f2c06e"];
  const cream = chocolate ? "#3a1d0e" : "#fffaf0";
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sponge[0]} />
          <stop offset="1" stopColor={sponge[1]} />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="106" rx="54" ry="7" fill="rgba(0,0,0,0.28)" />
      <ellipse cx="80" cy="102" rx="54" ry="8" fill="#f2efe8" />
      <path d="M36 98 V58 L104 46 L124 58 V98 Z" fill={`url(#${uid}s)`} />
      <path d="M36 70 H124 V78 H36 Z" fill={cream} />
      <path d="M36 86 H124 V90 H36 Z" fill={chocolate ? "#2e160a" : "#ff8fa8"} opacity="0.9" />
      <path d="M36 58 L104 46 L124 58 Z" fill={chocolate ? "#3b1d0d" : "#fffaf0"} />
      <path d="M36 58 C40 64 44 58 48 63 S56 58 60 62 S68 58 72 63 S80 58 84 62 S92 58 96 63 S104 58 108 62 S116 58 124 60 V58 Z" fill={chocolate ? "#3b1d0d" : "#fffaf0"} />
      {chocolate ? (
        <g fill="#fff6e6">
          <circle cx="82" cy="52" r="1.2" />
          <circle cx="92" cy="54" r="1" />
          <circle cx="100" cy="52" r="1.3" />
          <circle cx="74" cy="55" r="1" />
        </g>
      ) : (
        <g>
          <path d="M84 50 C76 40 84 30 92 34 C100 30 106 42 96 50 Z" fill="#e8344d" />
          <path d="M88 33 L92 27 L95 33" stroke="#3e9b48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="88" cy="42" r="0.9" fill="#ffe08a" />
          <circle cx="94" cy="40" r="0.9" fill="#ffe08a" />
          <circle cx="92" cy="46" r="0.9" fill="#ffe08a" />
        </g>
      )}
    </svg>
  );
}

function RailArt({ art, uid }: { art: MenuPhotoRailArt; uid: string }) {
  switch (art) {
    case "burger":
      return <Burger uid={uid} kind="beef" />;
    case "chicken-burger":
      return <Burger uid={uid} kind="chicken" />;
    case "veggie-burger":
      return <Burger uid={uid} kind="veggie" />;
    case "fries":
      return <Fries uid={uid} loaded={false} />;
    case "loaded-fries":
      return <Fries uid={uid} loaded />;
    case "salad":
      return <Bowl uid={uid} salad />;
    case "bowl":
      return <Bowl uid={uid} salad={false} />;
    case "pizza":
      return <Pizza uid={uid} pepperoni={false} />;
    case "pepperoni":
      return <Pizza uid={uid} pepperoni />;
    case "soda":
      return <Drink uid={uid} kind="soda" />;
    case "shake":
      return <Drink uid={uid} kind="shake" />;
    case "coffee":
      return <Coffee uid={uid} />;
    case "cake":
      return <Cake uid={uid} chocolate={false} />;
    default:
      return <Cake uid={uid} chocolate />;
  }
}

function findScrollParent(node: HTMLElement | null): Element | null {
  let el = node?.parentElement ?? null;
  while (el && el !== document.body && el !== document.documentElement) {
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
}

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MenuPhotoRail({
  sections = defaultSections,
  currency = "USD",
  locale = "en-US",
  onAdd,
  onItemOpen,
  stickyTop = 0,
  labels: labelsProp,
  accent = "#ff6a3d",
  appearance = "dark",
  className = "",
  style,
  ...rest
}: MenuPhotoRailProps) {
  const labels = { ...defaultLabels, ...labelsProp };
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = React.useRef<HTMLElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);
  const lockUntil = React.useRef(0);
  const firstMove = React.useRef(true);
  const [active, setActive] = React.useState(sections[0]?.id ?? "");
  const [counts, setCounts] = React.useState<Record<string, number>>({});

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const sectionKey = sections.map((s) => s.id).join("|");

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-hb-oa1-section]"));
    const ids = nodes.map((n) => n.dataset.hbOa1Section ?? "");
    const railHeight = root.querySelector<HTMLElement>(".hb-oa1-rail")?.offsetHeight ?? 60;
    const offset = Math.round(stickyTop + railHeight + 8);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set((entry.target as HTMLElement).dataset.hbOa1Section ?? "", entry.isIntersecting);
        if (performance.now() < lockUntil.current) return;
        const first = ids.find((id) => visible.get(id));
        if (first) setActive(first);
      },
      { root: findScrollParent(root), rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sectionKey, stickyTop]);

  React.useEffect(() => {
    const scroller = scrollRef.current;
    const pill = pillRef.current;
    if (!scroller || !pill) return;
    const place = (animate: boolean) => {
      const chip = scroller.querySelector<HTMLElement>(`[data-hb-oa1-chip="${CSS.escape(active)}"]`);
      if (!chip) return;
      if (!animate) pill.style.transition = "none";
      pill.style.width = `${chip.offsetWidth}px`;
      pill.style.transform = `translateX(${chip.offsetLeft}px)`;
      if (!animate) {
        void pill.offsetWidth;
        pill.style.transition = "";
      }
      const left = chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2;
      scroller.scrollTo({ left: Math.max(0, left), behavior: animate && !prefersReduced() ? "smooth" : "auto" });
    };
    place(!firstMove.current);
    firstMove.current = false;
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [active, sectionKey]);

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(`${uid}-${id}`);
    lockUntil.current = event.timeStamp + 900;
    setActive(id);
    target?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  };

  const add = (item: MenuPhotoRailItem, section: MenuPhotoRailSection) => {
    setCounts((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + 1 }));
    onAdd?.(item, section);
  };

  const countLabel = (n: number) => (n === 1 ? labels.countOne : labels.count.replace("{count}", String(n)));
  const vars = { "--hb-oa1-accent": accent, "--hb-oa1-top": `${stickyTop}px`, ...style } as React.CSSProperties;
  const starts = sections.map((_, k) => sections.slice(0, k).reduce((sum, prev) => sum + prev.items.length, 0));

  return (
    <section ref={rootRef} className={`hb-oa1 ${className}`} style={vars} data-appearance={appearance} {...rest}>
      <style href="hb-menu-photo-rail" precedence="default">{css}</style>
      <div className="hb-oa1-wrap">
        <header className="hb-oa1-head">
          <p className="hb-oa1-eyebrow">{labels.eyebrow}</p>
          <h2 className="hb-oa1-title">{labels.title}</h2>
          <p className="hb-oa1-sub">{labels.subtitle}</p>
        </header>
        <nav className="hb-oa1-rail" aria-label={labels.rail}>
          <div className="hb-oa1-scroll" ref={scrollRef}>
            <div className="hb-oa1-track">
              <span className="hb-oa1-pill" ref={pillRef} aria-hidden="true" />
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${uid}-${s.id}`}
                  className="hb-oa1-chip"
                  data-hb-oa1-chip={s.id}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={(e) => jump(e, s.id)}
                >
                  {s.label}
                  <span className="hb-oa1-num" aria-label={countLabel(s.items.length)}>{s.items.length}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
        {sections.map((s, si) => (
          <section key={s.id} id={`${uid}-${s.id}`} className="hb-oa1-section" data-hb-oa1-section={s.id} aria-labelledby={`${uid}-${s.id}-h`}>
            <div className="hb-oa1-shead">
              <h3 className="hb-oa1-stitle" id={`${uid}-${s.id}-h`}>{s.label}</h3>
              <p className="hb-oa1-snote">{s.note ? `${s.note} · ` : ""}{countLabel(s.items.length)}</p>
            </div>
            <ul className="hb-oa1-grid">
              {s.items.map((item, ii) => {
                const n = counts[item.id] ?? 0;
                const i = starts[si] + ii;
                return (
                  <li key={item.id} className="hb-oa1-card" style={{ "--hb-oa1-tint": item.tint ?? accent, "--hb-oa1-i": Math.min(i, 8) } as React.CSSProperties}>
                    <div className="hb-oa1-media">
                      <RailArt art={item.art} uid={`${uid}-${item.id}`} />
                    </div>
                    <div className="hb-oa1-body">
                      <div className="hb-oa1-row">
                        <h4 className="hb-oa1-name">
                          {onItemOpen ? (
                            <button type="button" className="hb-oa1-open" onClick={() => onItemOpen(item, s)}>
                              <span className="hb-oa1-sr">{labels.open} </span>
                              {item.name}
                            </button>
                          ) : (
                            item.name
                          )}
                        </h4>
                        {item.tag ? <span className="hb-oa1-tag">{item.tag}</span> : null}
                      </div>
                      <p className="hb-oa1-desc">{item.description}</p>
                      <div className="hb-oa1-foot">
                        <span className="hb-oa1-price">{money.format(item.price)}</span>
                        <button
                          type="button"
                          className="hb-oa1-add"
                          data-added={n > 0}
                          aria-label={`${labels.add} ${item.name}${n > 0 ? `, ${n} ${labels.added.toLowerCase()}` : ""}`}
                          onClick={() => add(item, s)}
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          {n > 0 ? labels.added : labels.add}
                          {n > 0 ? <span key={n} className="hb-oa1-badge">{n}</span> : null}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

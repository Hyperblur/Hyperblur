"use client";

import * as React from "react";

export interface NavbarCommerceRowsGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface NavbarCommerceRowsCategory {
  label: string;
  href: string;
  groups?: NavbarCommerceRowsGroup[];
  promo?: { eyebrow: string; title: string; href: string; tone?: string };
  sale?: boolean;
}

export interface NavbarCommerceRowsCartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  swatch?: string;
}

export interface NavbarCommerceRowsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  messages?: string[];
  categories?: NavbarCommerceRowsCategory[];
  cartItems?: NavbarCommerceRowsCartItem[];
  currency?: string;
  locale?: string;
  freeShippingAt?: number;
  defaultCategory?: string | null;
  defaultCartOpen?: boolean;
  onCartOpenChange?: (open: boolean) => void;
  onCartChange?: (items: NavbarCommerceRowsCartItem[]) => void;
  onCheckout?: (items: NavbarCommerceRowsCartItem[]) => void;
  onSearch?: (query: string) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultCategories: NavbarCommerceRowsCategory[] = [
  {
    label: "New in",
    href: "#new",
    groups: [
      { title: "This week", links: [{ label: "Trail shells", href: "#" }, { label: "Merino base layers", href: "#" }, { label: "Camp kitchen", href: "#" }, { label: "Back in stock", href: "#" }] },
      { title: "Collections", links: [{ label: "Alpine 26", href: "#" }, { label: "Coastline", href: "#" }, { label: "Night hike", href: "#" }] },
    ],
    promo: { eyebrow: "Just dropped", title: "The Ridgeline 2L shell", href: "#ridgeline", tone: "linear-gradient(140deg, #0f766e, #134e4a 55%, #0b1f1d)" },
  },
  {
    label: "Women",
    href: "#women",
    groups: [
      { title: "Clothing", links: [{ label: "Jackets", href: "#" }, { label: "Fleece", href: "#" }, { label: "Pants & tights", href: "#" }, { label: "Base layers", href: "#" }] },
      { title: "Footwear", links: [{ label: "Hiking boots", href: "#" }, { label: "Trail runners", href: "#" }, { label: "Sandals", href: "#" }] },
      { title: "Accessories", links: [{ label: "Beanies", href: "#" }, { label: "Gloves", href: "#" }, { label: "Socks", href: "#" }] },
    ],
    promo: { eyebrow: "Women's edit", title: "Layers for shoulder season", href: "#women-edit", tone: "linear-gradient(140deg, #9a3412, #7c2d12 55%, #1c0f0a)" },
  },
  {
    label: "Men",
    href: "#men",
    groups: [
      { title: "Clothing", links: [{ label: "Jackets", href: "#" }, { label: "Insulation", href: "#" }, { label: "Shirts", href: "#" }, { label: "Shorts", href: "#" }] },
      { title: "Footwear", links: [{ label: "Hiking boots", href: "#" }, { label: "Approach shoes", href: "#" }, { label: "Camp slides", href: "#" }] },
    ],
    promo: { eyebrow: "Best seller", title: "Talus down hoodie", href: "#talus", tone: "linear-gradient(140deg, #1e3a8a, #172554 55%, #0b1020)" },
  },
  {
    label: "Camp & hike",
    href: "#camp",
    groups: [
      { title: "Shelter", links: [{ label: "Tents", href: "#" }, { label: "Tarps", href: "#" }, { label: "Hammocks", href: "#" }] },
      { title: "Sleep", links: [{ label: "Sleeping bags", href: "#" }, { label: "Pads", href: "#" }, { label: "Pillows", href: "#" }] },
      { title: "Packs", links: [{ label: "Daypacks", href: "#" }, { label: "Overnight", href: "#" }, { label: "Hip packs", href: "#" }] },
    ],
  },
  { label: "Climb", href: "#climb" },
  { label: "Journal", href: "#journal" },
  { label: "Sale", href: "#sale", sale: true },
];

const defaultCart: NavbarCommerceRowsCartItem[] = [
  { id: "ridgeline", name: "Ridgeline 2L Shell", variant: "Moss, M", price: 189, qty: 1, swatch: "linear-gradient(140deg,#4d7c0f,#1a2e05)" },
  { id: "merino", name: "Merino Crew 180", variant: "Charcoal, M", price: 64, qty: 2, swatch: "linear-gradient(140deg,#52525b,#18181b)" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj6 {
  --hb-xj6-accent: #e8ff5a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj6 *, .hb-xj6 *::before, .hb-xj6 *::after { box-sizing: border-box; }
.hb-xj6[data-backdrop="true"] { min-height: 640px; overflow: hidden; background: #0a0a0a; }
.hb-xj6-head { position: relative; z-index: 5; background: #0d0d0d; border-bottom: 1px solid #1f1f1f; }
.hb-xj6-util { display: flex; align-items: center; justify-content: space-between; height: 34px; padding: 0 24px; background: #151515; color: #a1a1a1; font-size: 12px; }
.hb-xj6-msg { position: relative; height: 34px; overflow: hidden; flex: 1; }
.hb-xj6-msg span { position: absolute; inset: 0; display: flex; align-items: center; gap: 8px; white-space: nowrap; transform: translateY(100%); opacity: 0; transition: transform .6s ${ease}, opacity .4s ease; }
.hb-xj6-msg span[data-state="on"] { transform: none; opacity: 1; }
.hb-xj6-msg span[data-state="off"] { transform: translateY(-100%); }
.hb-xj6-msg b { color: #ededed; font-weight: 500; }
.hb-xj6-msg i { width: 5px; height: 5px; border-radius: 50%; background: var(--hb-xj6-accent); font-style: normal; }
.hb-xj6-ulinks { display: flex; gap: 18px; }
.hb-xj6-ulinks a { color: #a1a1a1; text-decoration: none; transition: color .2s ease; }
.hb-xj6-ulinks a:hover { color: #ededed; }
.hb-xj6-main { display: flex; align-items: center; gap: 24px; height: 68px; padding: 0 24px; }
.hb-xj6-burger { display: none; }
.hb-xj6-brand { display: inline-flex; align-items: baseline; gap: 2px; color: #ededed; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 700; letter-spacing: -.05em; text-decoration: none; flex: none; }
.hb-xj6-brand span { color: var(--hb-xj6-accent); }
.hb-xj6-search {
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 560px;
  height: 42px;
  margin: 0 auto;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #141414;
  transition: border-color .2s ease, box-shadow .3s ease;
}
.hb-xj6-search:focus-within { border-color: #3a3a3a; box-shadow: 0 0 0 4px rgba(255,255,255,.04); }
.hb-xj6-search svg { width: 17px; height: 17px; margin: 0 10px 0 16px; flex: none; fill: none; stroke: #8f8f8f; stroke-width: 2; stroke-linecap: round; }
.hb-xj6-search input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; color: #ededed; font: inherit; font-size: 14px; }
.hb-xj6-search input::placeholder { color: #707070; }
.hb-xj6-search button { height: 34px; margin-right: 4px; padding: 0 16px; border: 0; border-radius: 999px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-xj6-acts { display: flex; align-items: center; gap: 6px; flex: none; }
.hb-xj6-act {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 10px;
  border: 0;
  border-radius: 12px;
  background: none;
  color: #ededed;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .2s ease;
}
.hb-xj6-act:hover, .hb-xj6-act[aria-expanded="true"] { background: rgba(255,255,255,.06); }
.hb-xj6-act > svg { width: 22px; height: 22px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj6-two { display: grid; text-align: left; line-height: 1.15; }
.hb-xj6-two small { color: #8f8f8f; font-size: 11px; }
.hb-xj6-two b { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xj6-count {
  position: absolute;
  top: 4px;
  left: 24px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--hb-xj6-accent);
  color: #0a0a0a;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  box-shadow: 0 0 0 2px #0d0d0d;
  animation: hb-xj6-bump .5s cubic-bezier(.34,1.56,.64,1);
}
@keyframes hb-xj6-bump { 0% { transform: scale(.4); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
.hb-xj6-cats { position: relative; display: flex; gap: 2px; height: 46px; margin: 0; padding: 0 16px; list-style: none; border-top: 1px solid #1a1a1a; }
.hb-xj6-cat {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 46px;
  padding: 0 12px;
  border: 0;
  background: none;
  color: #c4c4c4;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-xj6-cat::after { content: ""; position: absolute; left: 12px; right: 12px; bottom: 0; height: 2px; border-radius: 2px; background: #ededed; transform: scaleX(0); transition: transform .35s ${ease}; }
.hb-xj6-cat:hover, .hb-xj6-cat[aria-expanded="true"] { color: #fff; }
.hb-xj6-cat[aria-expanded="true"]::after, .hb-xj6-cat:hover::after { transform: scaleX(1); }
.hb-xj6-cat[data-sale="true"] { color: #ff6b6b; }
.hb-xj6-cat[data-sale="true"]::after { background: #ff6b6b; }
.hb-xj6-cat svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; opacity: .6; transition: transform .3s ${ease}; }
.hb-xj6-cat[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-xj6-mega {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-bottom: 1px solid #1f1f1f;
  background: linear-gradient(180deg, #111, #0d0d0d);
  box-shadow: 0 40px 60px -30px rgba(0,0,0,.9);
  animation: hb-xj6-drop .35s ${ease};
}
@keyframes hb-xj6-drop { from { opacity: 0; clip-path: inset(0 0 100% 0); } to { opacity: 1; clip-path: inset(0 0 0 0); } }
.hb-xj6-megain { display: flex; gap: 40px; max-width: 1080px; margin: 0 auto; padding: 26px 24px 30px; }
.hb-xj6-col { min-width: 140px; animation: hb-xj6-col .45s ${ease} both; animation-delay: calc(var(--hb-xj6-i) * 40ms); }
@keyframes hb-xj6-col { from { opacity: 0; transform: translateY(6px); } }
.hb-xj6-col h4 { margin: 0 0 12px; color: #6f6f6f; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-xj6-col a { display: block; padding: 6px 0; color: #d4d4d4; font-size: 14px; text-decoration: none; transition: color .2s ease, transform .25s ${ease}; }
.hb-xj6-col a:hover { color: #fff; transform: translateX(3px); }
.hb-xj6-promo {
  position: relative;
  margin-left: auto;
  width: 280px;
  min-height: 170px;
  padding: 18px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 1px rgba(255,255,255,.06);
}
.hb-xj6-promo::before { content: ""; position: absolute; right: -40px; top: -40px; width: 180px; height: 180px; border-radius: 50%; border: 1px solid rgba(255,255,255,.12); box-shadow: 0 0 0 26px rgba(255,255,255,.03), 0 0 0 52px rgba(255,255,255,.02); }
.hb-xj6-promo small { position: relative; color: rgba(255,255,255,.7); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
.hb-xj6-promo b { position: relative; margin-top: 4px; font-size: 19px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-xj6-promo span { position: relative; margin-top: 10px; font-size: 13px; color: var(--hb-xj6-accent); }
.hb-xj6-cart {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 6;
  width: 360px;
  border: 1px solid #262626;
  border-radius: 18px;
  background: linear-gradient(180deg, #151515, #101010);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 80px -24px rgba(0,0,0,.95);
  transform-origin: 90% 0;
  animation: hb-xj6-pop .35s ${ease};
}
@keyframes hb-xj6-pop { from { opacity: 0; transform: translateY(-6px) scale(.97); } }
.hb-xj6-cwrap { position: relative; }
.hb-xj6-ch { display: flex; justify-content: space-between; align-items: center; padding: 16px 18px 0; }
.hb-xj6-ch b { font-size: 15px; font-weight: 600; }
.hb-xj6-ch span { color: #8f8f8f; font-size: 12px; }
.hb-xj6-ship { margin: 12px 18px 4px; padding: 10px 12px; border-radius: 12px; background: #1a1a1a; font-size: 12.5px; color: #c4c4c4; }
.hb-xj6-ship b { color: #fff; font-weight: 600; }
.hb-xj6-track { height: 5px; margin-top: 8px; border-radius: 99px; background: #262626; overflow: hidden; }
.hb-xj6-track i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xj6-accent) 60%, #fff), var(--hb-xj6-accent)); font-style: normal; transition: width .6s ${ease}; }
.hb-xj6-items { margin: 0; padding: 6px 18px; list-style: none; }
.hb-xj6-item { display: flex; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid #1c1c1c; }
.hb-xj6-item:last-child { border-bottom: 0; }
.hb-xj6-thumb { width: 52px; height: 60px; flex: none; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
.hb-xj6-info { flex: 1; min-width: 0; }
.hb-xj6-info b { display: block; font-size: 13.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xj6-info small { color: #8f8f8f; font-size: 12px; }
.hb-xj6-step { display: inline-flex; align-items: center; margin-top: 6px; height: 26px; border: 1px solid #2a2a2a; border-radius: 999px; }
.hb-xj6-step button { width: 26px; height: 24px; border: 0; background: none; color: #c4c4c4; font: inherit; font-size: 15px; line-height: 1; cursor: pointer; border-radius: 999px; }
.hb-xj6-step button:hover { color: #fff; background: rgba(255,255,255,.06); }
.hb-xj6-step span { min-width: 18px; text-align: center; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-xj6-price { align-self: flex-start; font-size: 13.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xj6-empty { padding: 26px 18px; color: #8f8f8f; font-size: 13px; text-align: center; }
.hb-xj6-cf { padding: 14px 18px 18px; border-top: 1px solid #1f1f1f; }
.hb-xj6-sub { display: flex; justify-content: space-between; font-size: 14px; }
.hb-xj6-sub b { font-variant-numeric: tabular-nums; }
.hb-xj6-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  margin-top: 12px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-xj6-accent);
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,.15), 0 10px 24px -12px var(--hb-xj6-accent);
  transition: transform .2s ${ease}, filter .2s ease;
}
.hb-xj6-checkout:hover { filter: brightness(1.05); transform: translateY(-1px); }
.hb-xj6-checkout:active { transform: scale(.98); }
.hb-xj6-checkout:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.hb-xj6 a:focus-visible, .hb-xj6 button:focus-visible, .hb-xj6 input:focus-visible { outline: 2px solid var(--hb-xj6-accent); outline-offset: 2px; }
.hb-xj6-drawer { display: none; }
@container (max-width: 860px) {
  .hb-xj6-two { display: none; }
  .hb-xj6-main { gap: 12px; }
}
@container (max-width: 680px) {
  .hb-xj6-util { justify-content: center; padding: 0 14px; }
  .hb-xj6-msg span { justify-content: center; }
  .hb-xj6-ulinks { display: none; }
  .hb-xj6-main { flex-wrap: wrap; height: auto; padding: 10px 14px 12px; row-gap: 10px; }
  .hb-xj6-burger {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin-left: -6px;
    border: 0;
    border-radius: 10px;
    background: none;
    color: #ededed;
    cursor: pointer;
  }
  .hb-xj6-burger svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
  .hb-xj6-brand { font-size: 20px; }
  .hb-xj6-acts { margin-left: auto; gap: 0; }
  .hb-xj6-act[data-wish="true"] { display: none; }
  .hb-xj6-search { order: 5; flex-basis: 100%; max-width: none; height: 40px; }
  .hb-xj6-search button { display: none; }
  .hb-xj6-cats { overflow-x: auto; scrollbar-width: none; padding: 0 8px; height: 44px; }
  .hb-xj6-cats::-webkit-scrollbar { display: none; }
  .hb-xj6-cat svg { display: none; }
  .hb-xj6-mega { display: none; }
  .hb-xj6-cwrap { position: static; }
  .hb-xj6-cart { left: 10px; right: 10px; width: auto; top: calc(100% - 4px); }
  .hb-xj6-drawer {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 6;
    display: block;
    max-height: 70dvh;
    overflow-y: auto;
    padding: 8px 14px 18px;
    border-bottom: 1px solid #1f1f1f;
    background: #0f0f0f;
    box-shadow: 0 40px 60px -30px rgba(0,0,0,.9);
    animation: hb-xj6-drop .4s ${ease};
  }
  .hb-xj6-drawer[hidden] { display: none; }
  .hb-xj6-drow { border-bottom: 1px solid #1c1c1c; }
  .hb-xj6-dbtn { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 52px; padding: 0 4px; border: 0; background: none; color: #ededed; font: inherit; font-size: 16px; font-weight: 500; text-decoration: none; cursor: pointer; }
  .hb-xj6-dbtn[data-sale="true"] { color: #ff6b6b; }
  .hb-xj6-dbtn svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; transition: transform .3s ${ease}; }
  .hb-xj6-dbtn[aria-expanded="true"] svg { transform: rotate(45deg); }
  .hb-xj6-dsub { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; padding: 0 4px 14px; }
  .hb-xj6-dsub a { padding: 6px 0; color: #a1a1a1; font-size: 14px; text-decoration: none; }
}
.hb-xj6-page { position: relative; z-index: 1; padding: 24px; display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 14px; }
.hb-xj6-hero { grid-row: span 2; min-height: 380px; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; justify-content: flex-end; background: radial-gradient(90% 70% at 70% 20%, #3f6212, transparent 60%), linear-gradient(160deg, #1a2e05, #0b0f06); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
.hb-xj6-hero small { color: var(--hb-xj6-accent); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.hb-xj6-hero b { margin-top: 8px; font-family: var(--font-grotesk, inherit); font-size: 40px; font-weight: 600; line-height: 1; letter-spacing: -.04em; }
.hb-xj6-tile { min-height: 183px; border-radius: 20px; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
.hb-xj6-tile b { font-size: 14px; font-weight: 600; }
.hb-xj6-tile small { color: #a1a1a1; font-size: 12px; }
@container (max-width: 680px) { .hb-xj6-page { grid-template-columns: 1fr 1fr; padding: 14px; } .hb-xj6-hero { grid-column: span 2; grid-row: auto; min-height: 220px; } .hb-xj6-hero b { font-size: 28px; } .hb-xj6-tile { min-height: 140px; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj6 *, .hb-xj6 *::before, .hb-xj6 *::after { transition: none !important; animation: none !important; }
}
`;

function Chevron() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="m2 3.5 3 3 3-3" />
    </svg>
  );
}

export function NavbarCommerceRows({
  brand = "Fieldhouse",
  messages = ["Free shipping on orders over $150", "Repairs are free for life on Fieldhouse gear", "Members get 10% back on every order"],
  categories = defaultCategories,
  cartItems = defaultCart,
  currency = "USD",
  locale = "en-US",
  freeShippingAt = 400,
  defaultCategory = null,
  defaultCartOpen = false,
  onCartOpenChange,
  onCartChange,
  onCheckout,
  onSearch,
  accent = "#e8ff5a",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarCommerceRowsProps) {
  const [msg, setMsg] = React.useState(0);
  const [openCat, setOpenCat] = React.useState<string | null>(defaultCategory);
  const [cartOpen, setCartOpen] = React.useState(defaultCartOpen);
  const [items, setItems] = React.useState(cartItems);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const cartRef = React.useRef<HTMLDivElement>(null);
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const catsRef = React.useRef<HTMLUListElement>(null);
  const hoverTimer = React.useRef<number | undefined>(undefined);
  const cartId = React.useId();
  const megaId = React.useId();
  const drawerId = React.useId();

  const fmt = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }), [locale, currency]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const remaining = Math.max(0, freeShippingAt - subtotal);
  const progress = freeShippingAt > 0 ? Math.min(1, subtotal / freeShippingAt) : 1;

  React.useEffect(() => {
    if (messages.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setMsg((m) => (m + 1) % messages.length), 4500);
    return () => window.clearInterval(id);
  }, [messages.length]);

  const setCart = React.useCallback(
    (next: boolean) => {
      setCartOpen(next);
      onCartOpenChange?.(next);
    },
    [onCartOpenChange],
  );

  React.useEffect(() => {
    if (!cartOpen && !openCat && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (cartOpen) {
        setCart(false);
        cartBtnRef.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
      if (openCat) {
        const btn = catsRef.current?.querySelector<HTMLButtonElement>(`[data-cat="${CSS.escape(openCat)}"]`);
        setOpenCat(null);
        btn?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (cartOpen && cartRef.current && !cartRef.current.contains(e.target as Node)) setCart(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [cartOpen, openCat, menuOpen, setCart]);

  const updateQty = (id: string, delta: number) => {
    const next = items.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0);
    setItems(next);
    onCartChange?.(next);
  };

  const enterCat = (label: string | null) => {
    window.clearTimeout(hoverTimer.current);
    const delay = openCat ? 0 : 110;
    hoverTimer.current = window.setTimeout(() => setOpenCat(label), label ? delay : 160);
  };

  const active = categories.find((c) => c.label === openCat && c.groups);

  return (
    <header
      className={["hb-xj6", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-commerce-rows" precedence="default">
        {css}
      </style>
      <div className="hb-xj6-head">
        <div className="hb-xj6-util">
          <div className="hb-xj6-msg">
            {messages.map((m, i) => (
              <span key={m} data-state={i === msg ? "on" : i === (msg - 1 + messages.length) % messages.length ? "off" : "next"} aria-hidden={i !== msg}>
                <i aria-hidden="true" />
                <b>{m}</b>
              </span>
            ))}
          </div>
          <div className="hb-xj6-ulinks">
            <a href="#help">Help</a>
            <a href="#stores">Find a store</a>
            <a href="#currency">{currency}</a>
          </div>
        </div>
        <div className="hb-xj6-main">
          <button
            ref={burgerRef}
            type="button"
            className="hb-xj6-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setCart(false);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
          <a className="hb-xj6-brand" href="#top">
            {brand}
            <span>.</span>
          </a>
          <form
            className="hb-xj6-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch?.(query.trim());
            }}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13.2 13.2 3.3 3.3" />
            </svg>
            <input type="search" aria-label="Search products" placeholder="Search jackets, tents, boots…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">Search</button>
          </form>
          <div className="hb-xj6-acts">
            <a className="hb-xj6-act" href="#account" aria-label="Account">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8.5" r="3.5" />
                <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
              </svg>
              <span className="hb-xj6-two">
                <small>Hello, sign in</small>
                <b>Account</b>
              </span>
            </a>
            <a className="hb-xj6-act" href="#wishlist" data-wish="true" aria-label="Wishlist, 4 items">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19.5s-7-4.3-7-9.5a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.2-7 9.5-7 9.5Z" />
              </svg>
            </a>
            <div className="hb-xj6-cwrap" ref={cartRef}>
              <button
                ref={cartBtnRef}
                type="button"
                className="hb-xj6-act"
                aria-expanded={cartOpen}
                aria-controls={cartId}
                aria-label={`Cart, ${count} items, ${fmt.format(subtotal)}`}
                onClick={() => {
                  setCart(!cartOpen);
                  setMenuOpen(false);
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 8h14l-1.2 10.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3Z" />
                  <path d="M9 10V7a3 3 0 0 1 6 0v3" />
                </svg>
                {count > 0 && (
                  <span className="hb-xj6-count" key={count} aria-hidden="true">
                    {count}
                  </span>
                )}
                <span className="hb-xj6-two">
                  <small>Cart</small>
                  <b>{fmt.format(subtotal)}</b>
                </span>
              </button>
              {cartOpen && (
                <div className="hb-xj6-cart" id={cartId} role="dialog" aria-label="Cart">
                  <div className="hb-xj6-ch">
                    <b>Your cart</b>
                    <span>
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="hb-xj6-ship">
                    {remaining > 0 ? (
                      <>
                        You are <b>{fmt.format(remaining)}</b> away from free shipping
                      </>
                    ) : (
                      <>
                        <b>Free shipping unlocked.</b> Arrives Thu, Nov 12
                      </>
                    )}
                    <div className="hb-xj6-track">
                      <i style={{ width: `${(progress * 100).toFixed(1)}%` }} />
                    </div>
                  </div>
                  {items.length === 0 ? (
                    <div className="hb-xj6-empty">Your cart is empty. The trail is waiting.</div>
                  ) : (
                    <ul className="hb-xj6-items">
                      {items.map((it) => (
                        <li className="hb-xj6-item" key={it.id}>
                          <span className="hb-xj6-thumb" style={{ background: it.swatch ?? "#262626" }} aria-hidden="true" />
                          <div className="hb-xj6-info">
                            <b>{it.name}</b>
                            <small>{it.variant}</small>
                            <div className="hb-xj6-step">
                              <button type="button" aria-label={`Remove one ${it.name}`} onClick={() => updateQty(it.id, -1)}>
                                −
                              </button>
                              <span aria-live="polite">{it.qty}</span>
                              <button type="button" aria-label={`Add one ${it.name}`} onClick={() => updateQty(it.id, 1)}>
                                +
                              </button>
                            </div>
                          </div>
                          <span className="hb-xj6-price">{fmt.format(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="hb-xj6-cf">
                    <div className="hb-xj6-sub">
                      <span>Subtotal</span>
                      <b>{fmt.format(subtotal)}</b>
                    </div>
                    <button type="button" className="hb-xj6-checkout" disabled={items.length === 0} onClick={() => onCheckout?.(items)}>
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav aria-label="Categories" onPointerLeave={() => enterCat(null)}>
          <ul className="hb-xj6-cats" ref={catsRef}>
            {categories.map((c) => (
              <li key={c.label}>
                {c.groups ? (
                  <button
                    type="button"
                    className="hb-xj6-cat"
                    data-cat={c.label}
                    data-sale={c.sale ? "true" : undefined}
                    aria-expanded={openCat === c.label}
                    aria-controls={megaId}
                    onPointerEnter={(e) => e.pointerType === "mouse" && enterCat(c.label)}
                    onClick={() => setOpenCat(openCat === c.label ? null : c.label)}
                  >
                    {c.label}
                    <Chevron />
                  </button>
                ) : (
                  <a className="hb-xj6-cat" href={c.href} data-sale={c.sale ? "true" : undefined} onPointerEnter={() => enterCat(null)}>
                    {c.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {active && (
            <div className="hb-xj6-mega" id={megaId} key={active.label} onPointerEnter={() => window.clearTimeout(hoverTimer.current)}>
              <div className="hb-xj6-megain">
                {active.groups?.map((g, gi) => (
                  <div className="hb-xj6-col" key={g.title} style={{ "--hb-xj6-i": gi } as React.CSSProperties}>
                    <h4>{g.title}</h4>
                    {g.links.map((l) => (
                      <a key={l.label} href={l.href}>
                        {l.label}
                      </a>
                    ))}
                  </div>
                ))}
                {active.promo && (
                  <a className="hb-xj6-promo" href={active.promo.href} style={{ background: active.promo.tone ?? "linear-gradient(140deg,#262626,#111)" }}>
                    <small>{active.promo.eyebrow}</small>
                    <b>{active.promo.title}</b>
                    <span>Shop now →</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </nav>
        <div className="hb-xj6-drawer" id={drawerId} hidden={!menuOpen}>
          {categories.map((c) => (
            <div className="hb-xj6-drow" key={c.label}>
              {c.groups ? (
                <>
                  <button type="button" className="hb-xj6-dbtn" aria-expanded={expanded === c.label} onClick={() => setExpanded(expanded === c.label ? null : c.label)}>
                    {c.label}
                    <svg viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M7 2v10M2 7h10" />
                    </svg>
                  </button>
                  {expanded === c.label && (
                    <div className="hb-xj6-dsub">
                      {c.groups.flatMap((g) => g.links.slice(0, 3)).map((l, li) => (
                        <a key={l.label + li} href={l.href}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a className="hb-xj6-dbtn" href={c.href} data-sale={c.sale ? "true" : undefined}>
                  {c.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xj6-page" aria-hidden="true">
          <div className="hb-xj6-hero">
            <small>Fall 26 collection</small>
            <b>Built for the long way round</b>
          </div>
          <div className="hb-xj6-tile" style={{ background: "linear-gradient(160deg,#7c2d12,#1c0f0a)" }}>
            <b>Insulated jackets</b>
            <small>From $149</small>
          </div>
          <div className="hb-xj6-tile" style={{ background: "linear-gradient(160deg,#1e3a8a,#0b1020)" }}>
            <b>Ultralight tents</b>
            <small>From $329</small>
          </div>
          <div className="hb-xj6-tile" style={{ background: "linear-gradient(160deg,#3f3f46,#111)" }}>
            <b>Trail footwear</b>
            <small>From $119</small>
          </div>
          <div className="hb-xj6-tile" style={{ background: "linear-gradient(160deg,#854d0e,#1a1206)" }}>
            <b>Camp kitchen</b>
            <small>From $24</small>
          </div>
        </div>
      )}
    </header>
  );
}

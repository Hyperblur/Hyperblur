"use client";

import * as React from "react";

export type MenuDrinkTag = "vegan" | "gf" | "spicy" | "new" | "popular";

export interface MenuDrink {
  id: string;
  name: string;
  description: string;
  price: number;
  group: string;
  color: string;
  temps?: "both" | "hot" | "iced";
  milk?: boolean;
  tags?: MenuDrinkTag[];
}

export interface MenuDrinkOption {
  id: string;
  label: string;
  add: number;
  note?: string;
}

export interface MenuDrinkOrder {
  drink: MenuDrink;
  temp: "hot" | "iced";
  size: MenuDrinkOption;
  milk: MenuDrinkOption | null;
  extras: MenuDrinkOption[];
  price: number;
}

export interface MenuDrinksCafeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  drinks?: MenuDrink[];
  sizes?: MenuDrinkOption[];
  milks?: MenuDrinkOption[];
  extras?: MenuDrinkOption[];
  defaultDrink?: string;
  accent?: string;
  onAdd?: (order: MenuDrinkOrder) => void;
}

const defaultDrinks: MenuDrink[] = [
  { id: "lavender", name: "Honey lavender latte", description: "Double shot, wildflower honey, dried lavender", price: 5.25, group: "Espresso bar", color: "#cdb2d6", tags: ["popular", "new"] },
  { id: "flatwhite", name: "Flat white", description: "Ristretto, velvet microfoam, 6 oz", price: 4.5, group: "Espresso bar", color: "#c4936a" },
  { id: "cortado", name: "Salted caramel cortado", description: "Equal parts espresso and steamed milk", price: 4.75, group: "Espresso bar", color: "#b17643", tags: ["gf"] },
  { id: "shaken", name: "Brown sugar shaken espresso", description: "Shaken hard over ice with cinnamon", price: 5.75, group: "Espresso bar", color: "#9c6035", temps: "iced", tags: ["new"] },
  { id: "coldbrew", name: "18-hour cold brew", description: "Ethiopian Guji, chocolate and stone fruit", price: 4.25, group: "Slow coffee", color: "#4a2c1d", temps: "iced", milk: false, tags: ["vegan"] },
  { id: "matcha", name: "Ceremonial matcha latte", description: "Uji matcha whisked to order", price: 5.5, group: "Tea and matcha", color: "#a6c779", tags: ["popular"] },
  { id: "chai", name: "Masala chai", description: "Black tea simmered with ginger and clove", price: 5, group: "Tea and matcha", color: "#c98d58", tags: ["spicy"] },
  { id: "hibiscus", name: "Hibiscus berry tea", description: "Hibiscus, raspberry leaf, orange peel", price: 4, group: "Tea and matcha", color: "#d4577a", milk: false, tags: ["vegan", "gf"] },
];

const defaultSizes: MenuDrinkOption[] = [
  { id: "s", label: "S", add: 0, note: "8 oz" },
  { id: "m", label: "M", add: 0.75, note: "12 oz" },
  { id: "l", label: "L", add: 1.25, note: "16 oz" },
];

const defaultMilks: MenuDrinkOption[] = [
  { id: "whole", label: "Whole", add: 0 },
  { id: "oat", label: "Oat", add: 0.7 },
  { id: "almond", label: "Almond", add: 0.7 },
  { id: "skim", label: "Skim", add: 0 },
];

const defaultExtras: MenuDrinkOption[] = [
  { id: "shot", label: "Extra shot", add: 1 },
  { id: "vanilla", label: "Vanilla syrup", add: 0.6 },
  { id: "foam", label: "Cold foam", add: 0.9 },
  { id: "cinnamon", label: "Cinnamon dust", add: 0 },
];

const tagLabel: Record<MenuDrinkTag, string> = { vegan: "Vegan", gf: "GF", spicy: "Spiced", new: "New", popular: "Popular" };

function TagIcon({ tag }: { tag: MenuDrinkTag }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      {tag === "vegan" ? <path {...p} d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zm0 0 7-7" /> : null}
      {tag === "gf" ? <path {...p} d="M12 21V8m0 0c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 6c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zM4 4l16 16" /> : null}
      {tag === "spicy" ? <path {...p} d="M7 20c6 0 11-5 11-12 0-1-1-2-2-2-1 4-4 9-9 11-1 0-1 3 0 3zM16 6c0-2 1-3 3-3" /> : null}
      {tag === "new" ? <path {...p} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /> : null}
      {tag === "popular" ? <path {...p} d="M12 21c-4 0-7-3-7-7 0-4 4-6 4-10 3 2 5 4 5 7 1-1 2-2 2-3 2 2 3 4 3 6 0 4-3 7-7 7z" /> : null}
    </svg>
  );
}

function mix(hex: string, target: string, t: number) {
  const a = hex.replace("#", "");
  const b = target.replace("#", "");
  const ch = (s: string, i: number) => parseInt(s.slice(i, i + 2), 16);
  const out = [0, 2, 4].map((i) => Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t).toString(16).padStart(2, "0"));
  return `#${out.join("")}`;
}

function Cup({ color, temp, scale, uid }: { color: string; temp: "hot" | "iced"; scale: number; uid: string }) {
  const liquid = temp === "iced" ? mix(color, "#ffffff", 0.18) : color;
  const foam = mix(color, "#fff8ef", 0.72);
  return (
    <svg className="hb-mb2-cup" viewBox="0 0 220 240" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-glass`} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".75" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity=".25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id={`${uid}-mug`} x1="0" x2="1">
          <stop offset="0%" stopColor="#fffdfa" />
          <stop offset="70%" stopColor="#f3ece4" />
          <stop offset="100%" stopColor="#e4d9cd" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="222" rx="74" ry="10" fill="rgba(70,40,40,.12)" />
      <g className="hb-mb2-scale" style={{ transform: `scale(${scale.toFixed(3)})` }}>
        {temp === "hot" ? (
          <g className="hb-mb2-hot">
            <g className="hb-mb2-steam" fill="none" stroke="#c9b8b0" strokeWidth="5" strokeLinecap="round">
              <path d="M86 70c-10-12 10-20 0-34" />
              <path d="M110 64c-10-12 10-20 0-38" />
              <path d="M134 70c-10-12 10-20 0-34" />
            </g>
            <ellipse cx="110" cy="206" rx="86" ry="16" fill="#efe6dc" stroke="#e1d4c6" />
            <ellipse cx="110" cy="202" rx="58" ry="9" fill="#e6dbce" />
            <path d="M166 120c26 0 30 18 30 28s-8 30-38 30" fill="none" stroke="#efe6dc" strokeWidth="13" strokeLinecap="round" />
            <path d="M166 120c26 0 30 18 30 28s-8 30-38 30" fill="none" stroke="#e1d4c6" strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <path d="M44 100h132l-10 76c-2 16-16 26-32 26H86c-16 0-30-10-32-26z" fill={`url(#${uid}-mug)`} stroke="#e1d4c6" />
            <path d="M52 134h116" stroke="var(--hb-mb2-accent)" strokeWidth="7" opacity=".55" />
            <ellipse cx="110" cy="100" rx="66" ry="14" fill="#e7dbcd" />
            <ellipse cx="110" cy="102" rx="60" ry="11" className="hb-mb2-tint" style={{ fill: liquid }} />
            <path d="M110 112c-12-6-18-10-18-14 0-4 4-6 8-6 4 0 8 2 10 6 2-4 6-6 10-6 4 0 8 2 8 6 0 4-6 8-18 14z" className="hb-mb2-tint" style={{ fill: foam }} />
          </g>
        ) : (
          <g className="hb-mb2-iced">
            <path d="M128 20l-14 92" stroke="var(--hb-mb2-accent)" strokeWidth="9" strokeLinecap="round" />
            <path d="M58 56h104l-12 146c-1 10-9 16-18 16H88c-9 0-17-6-18-16z" fill="#f4f8fb" opacity=".7" />
            <path d="M64 98h92l-8 104c-1 8-7 12-14 12H86c-7 0-13-4-14-12z" className="hb-mb2-tint" style={{ fill: liquid }} />
            <path d="M64 98h92l-1 18c-30 10-60-6-90 4z" className="hb-mb2-tint" style={{ fill: foam }} />
            <rect x="74" y="74" width="30" height="28" rx="6" fill="#ffffff" opacity=".75" transform="rotate(-12 89 88)" />
            <rect x="110" y="80" width="28" height="26" rx="6" fill="#ffffff" opacity=".6" transform="rotate(14 124 93)" />
            <rect x="88" y="120" width="26" height="24" rx="6" fill="#ffffff" opacity=".35" transform="rotate(8 101 132)" />
            <path d="M58 56h104l-12 146c-1 10-9 16-18 16H88c-9 0-17-6-18-16z" fill={`url(#${uid}-glass)`} stroke="#d7e2ea" strokeWidth="2" />
            <ellipse cx="110" cy="56" rx="52" ry="8" fill="none" stroke="#d7e2ea" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={(70 + ((i * 37) % 80)).toFixed(1)} cy={(130 + ((i * 53) % 70)).toFixed(1)} r={(1.6 + (i % 3) * 0.6).toFixed(1)} fill="#ffffff" opacity=".8" />
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}

const css = `
.hb-mb2 {
  --hb-mb2-accent: #d96c8a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  color: #2b2530;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  background:
    radial-gradient(40% 50% at 92% 8%, #fde3e8, transparent 70%),
    radial-gradient(45% 55% at 4% 96%, #def2e6, transparent 70%),
    radial-gradient(35% 40% at 55% 50%, #e6eefc, transparent 70%),
    #fdf9f4;
  -webkit-font-smoothing: antialiased;
}
.hb-mb2 *, .hb-mb2 *::before, .hb-mb2 *::after { box-sizing: border-box; }
.hb-mb2 em, .hb-mb2 i, .hb-mb2 cite { font-style: normal; }
.hb-mb2-wrap { max-width: 1120px; margin: 0 auto; padding: 64px 24px 88px; }
.hb-mb2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 30px; }
.hb-mb2-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: var(--hb-mb2-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.hb-mb2-title { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-weight: 600; font-size: clamp(34px, 5.2cqw, 56px); line-height: 1.02; letter-spacing: -.03em; color: #251f2a; }
.hb-mb2-title em { color: var(--hb-mb2-accent); }
.hb-mb2-sub { margin: 12px 0 0; max-width: 460px; color: #6f6672; font-size: 16px; line-height: 1.6; }
.hb-mb2-hours { display: flex; gap: 8px; flex-wrap: wrap; }
.hb-mb2-hours span { padding: 7px 12px; border-radius: 999px; background: rgba(255, 255, 255, .8); border: 1px solid rgba(43, 37, 48, .08); color: #5c5360; font-size: 12.5px; font-weight: 500; }
.hb-mb2-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 440px); gap: 28px; align-items: start; }
.hb-mb2-menu { min-width: 0; display: grid; gap: 22px; }
.hb-mb2-group h3 { display: flex; align-items: center; gap: 10px; margin: 0 0 6px; color: #8a7f8d; font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-mb2-group h3::after { content: ""; flex: 1; height: 1px; background: rgba(43, 37, 48, .1); }
.hb-mb2-list { margin: 0; padding: 0; list-style: none; display: grid; gap: 4px; }
.hb-mb2-drink { width: 100%; display: grid; grid-template-columns: 42px minmax(0, 1fr) auto; gap: 14px; align-items: center; padding: 10px 12px; border: 1px solid transparent; border-radius: 16px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background .2s, border-color .2s, box-shadow .2s, transform .2s; }
.hb-mb2-drink:hover { background: rgba(255, 255, 255, .7); }
.hb-mb2-drink[aria-pressed="true"] { background: #ffffff; border-color: rgba(43, 37, 48, .08); box-shadow: 0 12px 26px -18px rgba(90, 40, 60, .45); }
.hb-mb2-swatch { position: relative; width: 42px; height: 42px; border-radius: 14px; background: #f5efe8; display: grid; place-items: center; }
.hb-mb2-swatch i { width: 22px; height: 22px; border-radius: 50%; background: var(--hb-mb2-c); box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .08), 0 0 0 4px #ffffff; }
.hb-mb2-dname { display: block; font-size: 15px; font-weight: 600; color: #251f2a; }
.hb-mb2-ddesc { display: block; margin-top: 2px; color: #847a87; font-size: 13px; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-mb2-tags { display: inline-flex; gap: 4px; margin-left: 8px; vertical-align: 2px; }
.hb-mb2-tag { display: inline-flex; align-items: center; gap: 3px; padding: 2px 6px; border-radius: 999px; font-size: 10px; font-weight: 600; line-height: 1.3; }
.hb-mb2-tag-vegan { background: #e4f3e8; color: #2a7a4b; }
.hb-mb2-tag-gf { background: #fbf0d6; color: #91620f; }
.hb-mb2-tag-spicy { background: #fde5df; color: #bd3d22; }
.hb-mb2-tag-new { background: #e7edfd; color: #3555c4; }
.hb-mb2-tag-popular { background: #fde6ee; color: #b33d63; }
.hb-mb2-from { font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; color: #251f2a; white-space: nowrap; }
.hb-mb2-from small { display: block; color: #9a909d; font-size: 10.5px; font-weight: 500; text-align: right; }
.hb-mb2-card { position: relative; min-width: 0; padding: 22px; border-radius: 30px; background: rgba(255, 255, 255, .86); border: 1px solid rgba(43, 37, 48, .07); box-shadow: 0 40px 70px -46px rgba(90, 40, 60, .55), 0 1px 0 #ffffff inset; backdrop-filter: blur(8px); }
.hb-mb2-hero { position: relative; display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 18px; align-items: center; }
.hb-mb2-art { position: relative; aspect-ratio: 1 / 1.08; border-radius: 24px; overflow: hidden; background: radial-gradient(70% 60% at 50% 60%, #fff3e6, #fbe3d6); transition: background .5s; }
.hb-mb2-art[data-temp="iced"] { background: radial-gradient(70% 60% at 50% 60%, #eef6ff, #d9e9fb); }
.hb-mb2-cup { position: absolute; inset: 6px 4px 0; width: calc(100% - 8px); height: calc(100% - 6px); }
.hb-mb2-scale { transform-origin: 110px 222px; transform-box: view-box; transition: transform .45s cubic-bezier(.3, 1.4, .5, 1); }
.hb-mb2-tint { transition: fill .5s ease; }
.hb-mb2-hot, .hb-mb2-iced { animation: hb-mb2-swap .45s cubic-bezier(.2, .8, .2, 1); transform-origin: 110px 200px; transform-box: view-box; }
@keyframes hb-mb2-swap { from { opacity: 0; transform: translateY(10px) scale(.96); } }
.hb-mb2-steam path { opacity: 0; animation: hb-mb2-steam 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
.hb-mb2-steam path:nth-child(2) { animation-delay: 1s; }
.hb-mb2-steam path:nth-child(3) { animation-delay: 2s; }
@keyframes hb-mb2-steam { 0% { opacity: 0; transform: translateY(14px) scaleY(.7); } 35% { opacity: .8; } 100% { opacity: 0; transform: translateY(-16px) scaleY(1.15); } }
.hb-mb2-cname { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.15; color: #251f2a; }
.hb-mb2-cdesc { margin: 6px 0 14px; color: #7b717e; font-size: 13.5px; line-height: 1.45; }
.hb-mb2-temp { position: relative; display: grid; grid-template-columns: 1fr 1fr; padding: 4px; border-radius: 999px; background: #f4eee8; }
.hb-mb2-temp::before { content: ""; position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc(50% - 4px); border-radius: 999px; background: #ffffff; box-shadow: 0 2px 8px -2px rgba(60, 30, 40, .25); transition: transform .35s cubic-bezier(.3, 1.3, .5, 1); }
.hb-mb2-temp[data-temp="iced"]::before { transform: translateX(100%); }
.hb-mb2-tbtn { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; border: 0; border-radius: 999px; background: transparent; color: #7b717e; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-mb2-tbtn[aria-checked="true"] { color: #251f2a; }
.hb-mb2-tbtn:disabled { opacity: .4; cursor: not-allowed; }
.hb-mb2-field { margin: 16px 0 0; padding: 0; border: 0; min-width: 0; }
.hb-mb2-field legend { display: flex; justify-content: space-between; width: 100%; margin-bottom: 8px; padding: 0; color: #8a7f8d; font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.hb-mb2-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-mb2-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(43, 37, 48, .1); background: #ffffff; color: #4f4653; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: border-color .2s, background .2s, color .2s; }
.hb-mb2-chip small { color: #9a909d; font-size: 11px; }
.hb-mb2-chip:hover { border-color: rgba(43, 37, 48, .22); }
.hb-mb2-chip[aria-checked="true"], .hb-mb2-chip[aria-pressed="true"] { border-color: var(--hb-mb2-accent); background: color-mix(in srgb, var(--hb-mb2-accent) 9%, #ffffff); color: #251f2a; }
.hb-mb2-chip[aria-checked="true"] small, .hb-mb2-chip[aria-pressed="true"] small { color: var(--hb-mb2-accent); }
.hb-mb2-size { flex: 1; flex-direction: column; gap: 1px; padding: 8px 6px; min-width: 64px; }
.hb-mb2-size b { font-family: var(--font-grotesk, inherit); font-size: 16px; }
.hb-mb2-foot { display: flex; align-items: center; gap: 12px; margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(43, 37, 48, .08); }
.hb-mb2-total { display: grid; }
.hb-mb2-total small { color: #8a7f8d; font-size: 11.5px; }
.hb-mb2-total b { font-family: var(--font-grotesk, inherit); font-size: 26px; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-mb2-add { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 20px; border: 0; border-radius: 999px; background: #251f2a; color: #ffffff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s; }
.hb-mb2-add:hover { background: var(--hb-mb2-accent); }
.hb-mb2-add:active { transform: scale(.97); }
.hb-mb2-toast { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-top: 12px; padding: 10px 12px; border-radius: 14px; background: #eaf6ee; color: #23683f; font-size: 13px; line-height: 1.4; animation: hb-mb2-toast .4s cubic-bezier(.2, .8, .2, 1); }
.hb-mb2-toast b { font-weight: 600; }
.hb-mb2-toast span:last-child { margin-left: auto; white-space: nowrap; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes hb-mb2-toast { from { opacity: 0; transform: translateY(6px); } }
.hb-mb2 button:focus-visible { outline: 2px solid var(--hb-mb2-accent); outline-offset: 2px; }
@container (max-width: 860px) {
  .hb-mb2-body { grid-template-columns: minmax(0, 1fr); }
  .hb-mb2-wrap { padding: 56px 20px 64px; }
}
@container (max-width: 440px) {
  .hb-mb2-hero { grid-template-columns: minmax(0, 1fr); }
  .hb-mb2-art { max-width: 200px; margin: 0 auto; width: 100%; }
  .hb-mb2-card { padding: 16px; border-radius: 24px; }
  .hb-mb2-ddesc { white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mb2 *, .hb-mb2 *::before, .hb-mb2 *::after { animation: none !important; transition: none !important; }
  .hb-mb2-steam path { opacity: .5; }
}
`;

const money = (n: number) => `$${n.toFixed(2)}`;

export function MenuDrinksCafe({
  eyebrow = "Little Fern Coffee · Silver Lake",
  title = "Pour me something good.",
  subtitle = "Single-origin espresso, ceremonial matcha and teas we blend in the back room. Build it the way you like it and pick it up at the bar.",
  drinks = defaultDrinks,
  sizes = defaultSizes,
  milks = defaultMilks,
  extras = defaultExtras,
  defaultDrink = "lavender",
  accent = "#d96c8a",
  onAdd,
  className,
  style,
  ...rest
}: MenuDrinksCafeProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [drinkId, setDrinkId] = React.useState(defaultDrink);
  const [tempPick, setTempPick] = React.useState<"hot" | "iced">("iced");
  const [sizeId, setSizeId] = React.useState(sizes[1]?.id ?? sizes[0]?.id ?? "");
  const [milkId, setMilkId] = React.useState(milks[1]?.id ?? milks[0]?.id ?? "");
  const [extraIds, setExtraIds] = React.useState<string[]>([]);
  const [added, setAdded] = React.useState<{ key: number; text: string; count: number; total: number } | null>(null);

  const drink = drinks.find((d) => d.id === drinkId) ?? drinks[0];
  const temps = drink?.temps ?? "both";
  const temp: "hot" | "iced" = temps === "both" ? tempPick : temps;
  const size = sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const hasMilk = drink?.milk !== false;
  const milk = hasMilk ? milks.find((m) => m.id === milkId) ?? null : null;
  const chosenExtras = extras.filter((e) => extraIds.includes(e.id));
  const price = (drink?.price ?? 0) + (size?.add ?? 0) + (milk?.add ?? 0) + chosenExtras.reduce((a, e) => a + e.add, 0);
  const sizeIndex = Math.max(0, sizes.findIndex((s) => s.id === size?.id));
  const scale = sizes.length > 1 ? 0.84 + (sizeIndex / (sizes.length - 1)) * 0.16 : 1;

  const groups = React.useMemo(() => {
    const map: { name: string; items: MenuDrink[] }[] = [];
    for (const d of drinks) {
      const g = map.find((x) => x.name === d.group);
      if (g) g.items.push(d);
      else map.push({ name: d.group, items: [d] });
    }
    return map;
  }, [drinks]);

  if (!drink || !size) return null;

  const toggleExtra = (id: string) => setExtraIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const add = () => {
    const order: MenuDrinkOrder = { drink, temp, size, milk, extras: chosenExtras, price };
    onAdd?.(order);
    const parts = [size.note ?? size.label, temp, milk && milk.add > 0 ? milk.label.toLowerCase() : "", drink.name.toLowerCase()].filter(Boolean);
    setAdded((prev) => ({ key: (prev?.key ?? 0) + 1, text: parts.join(" "), count: (prev?.count ?? 0) + 1, total: (prev?.total ?? 0) + price }));
  };

  const words = title.split(" ");
  const last = words.pop();

  return (
    <section
      className={["hb-mb2", className].filter(Boolean).join(" ")}
      style={{ "--hb-mb2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-drinks-cafe" precedence="default">{css}</style>
      <div className="hb-mb2-wrap">
        <div className="hb-mb2-head">
          <div>
            <p className="hb-mb2-eyebrow">{eyebrow}</p>
            <h2 className="hb-mb2-title">{words.join(" ")} <em>{last}</em></h2>
            <p className="hb-mb2-sub">{subtitle}</p>
          </div>
          <div className="hb-mb2-hours" aria-label="Opening hours">
            <span>Mon to Fri 7 am to 4 pm</span>
            <span>Sat and Sun 8 am to 3 pm</span>
          </div>
        </div>
        <div className="hb-mb2-body">
          <div className="hb-mb2-menu">
            {groups.map((g) => (
              <div key={g.name} className="hb-mb2-group">
                <h3>{g.name}</h3>
                <ul className="hb-mb2-list">
                  {g.items.map((d) => (
                    <li key={d.id}>
                      <button type="button" className="hb-mb2-drink" aria-pressed={d.id === drink.id} onClick={() => setDrinkId(d.id)}>
                        <span className="hb-mb2-swatch" aria-hidden="true"><i style={{ "--hb-mb2-c": d.color } as React.CSSProperties} /></span>
                        <span style={{ minWidth: 0 }}>
                          <span className="hb-mb2-dname">
                            {d.name}
                            {d.tags?.length ? (
                              <span className="hb-mb2-tags">
                                {d.tags.map((t) => <span key={t} className={`hb-mb2-tag hb-mb2-tag-${t}`}><TagIcon tag={t} />{tagLabel[t]}</span>)}
                              </span>
                            ) : null}
                          </span>
                          <span className="hb-mb2-ddesc">{d.description}</span>
                        </span>
                        <span className="hb-mb2-from"><small>from</small>{money(d.price)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="hb-mb2-card" aria-label={`Customize ${drink.name}`}>
            <div className="hb-mb2-hero">
              <div className="hb-mb2-art" data-temp={temp}>
                <Cup key={`${drink.id}-${temp}`} color={drink.color} temp={temp} scale={scale} uid={uid} />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 className="hb-mb2-cname">{drink.name}</h3>
                <p className="hb-mb2-cdesc">{drink.description}</p>
                <div className="hb-mb2-temp" role="radiogroup" aria-label="Temperature" data-temp={temp}>
                  {(["hot", "iced"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      className="hb-mb2-tbtn"
                      aria-checked={temp === t}
                      disabled={temps !== "both" && temps !== t}
                      onClick={() => setTempPick(t)}
                    >
                      {t === "hot" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3c-1 2 1 3 0 5M12 3c-1 2 1 3 0 5M16 3c-1 2 1 3 0 5M4 11h14v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6zM18 12h1a2.5 2.5 0 0 1 0 5h-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M4 7l16 10M20 7L4 17M9 3l3 3 3-3M9 21l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                      {t === "hot" ? "Hot" : "Iced"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <fieldset className="hb-mb2-field">
              <legend><span>Size</span><span>{size.note}</span></legend>
              <div className="hb-mb2-chips" role="radiogroup" aria-label="Size">
                {sizes.map((s) => (
                  <button key={s.id} type="button" role="radio" aria-checked={s.id === size.id} className="hb-mb2-chip hb-mb2-size" onClick={() => setSizeId(s.id)}>
                    <b>{s.label}</b>
                    <small>{money(drink.price + s.add + (milk?.add ?? 0))}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            {hasMilk ? (
              <fieldset className="hb-mb2-field">
                <legend><span>Milk</span></legend>
                <div className="hb-mb2-chips" role="radiogroup" aria-label="Milk">
                  {milks.map((m) => (
                    <button key={m.id} type="button" role="radio" aria-checked={m.id === milk?.id} className="hb-mb2-chip" onClick={() => setMilkId(m.id)}>
                      {m.label}
                      {m.add ? <small>+{m.add.toFixed(2)}</small> : null}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}
            <fieldset className="hb-mb2-field">
              <legend><span>Extras</span><span>{chosenExtras.length ? `${chosenExtras.length} added` : "Optional"}</span></legend>
              <div className="hb-mb2-chips">
                {extras.map((e) => (
                  <button key={e.id} type="button" aria-pressed={extraIds.includes(e.id)} className="hb-mb2-chip" onClick={() => toggleExtra(e.id)}>
                    {e.label}
                    <small>{e.add ? `+${e.add.toFixed(2)}` : "Free"}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="hb-mb2-foot">
              <div className="hb-mb2-total">
                <small>Your drink</small>
                <b aria-live="polite">{money(price)}</b>
              </div>
              <button type="button" className="hb-mb2-add" onClick={add}>
                Add to order
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
              </button>
            </div>
            {added ? (
              <div key={added.key} className="hb-mb2-toast" role="status">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Added <b>{added.text}</b></span>
                <span>{added.count} in order · {money(added.total)}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

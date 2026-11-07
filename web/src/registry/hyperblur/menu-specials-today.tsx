"use client";

import * as React from "react";

export type MenuSpecialArt = "taco" | "burger" | "fries" | "skewer" | "bowl" | "pizza" | "hotdog" | "corn";

export interface MenuSpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  was?: number;
  left: number;
  total: number;
  art: MenuSpecialArt;
  color?: string;
}

export interface MenuSpecialsDay {
  day: string;
  short: string;
  theme: string;
  specials: MenuSpecial[];
}

export interface MenuSpecialsTodayProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  days?: MenuSpecialsDay[];
  todayIndex?: number;
  ticker?: string[];
  onChange?: (index: number) => void;
  onClaim?: (special: MenuSpecial, left: number) => void;
  accent?: string;
}

const defaultDays: MenuSpecialsDay[] = [
  {
    day: "Monday", short: "Mon", theme: "Burger Monday",
    specials: [
      { id: "mon-1", name: "Smash Double", description: "Two 3 oz patties, American cheese, pickles, house sauce", price: 9, was: 11.5, left: 14, total: 30, art: "burger", color: "#ff4d2e" },
      { id: "mon-2", name: "Loaded Cheese Fries", description: "Hand-cut fries, cheddar sauce, bacon, scallion", price: 6.5, was: 8, left: 9, total: 25, art: "fries", color: "#ffc23d" },
      { id: "mon-3", name: "Elote Cup", description: "Charred corn, cotija, lime mayo, tajin", price: 4.5, left: 18, total: 24, art: "corn", color: "#b8f04a" },
    ],
  },
  {
    day: "Tuesday", short: "Tue", theme: "Taco Tuesday",
    specials: [
      { id: "tue-1", name: "Al Pastor Trio", description: "Spit-roasted pork, grilled pineapple, onion, cilantro", price: 8, was: 10.5, left: 6, total: 40, art: "taco", color: "#ff4d2e" },
      { id: "tue-2", name: "Baja Fish Taco", description: "Beer-battered cod, chipotle slaw, lime crema", price: 4.25, left: 11, total: 30, art: "taco", color: "#ff8fb1" },
      { id: "tue-3", name: "Street Corn", description: "Grilled on the cob, cotija, chili, lime", price: 4, left: 20, total: 24, art: "corn", color: "#ffc23d" },
    ],
  },
  {
    day: "Wednesday", short: "Wed", theme: "Skewer Night",
    specials: [
      { id: "wed-1", name: "Chicken Yakitori", description: "Thigh and scallion, tare glaze, over binchotan", price: 7.5, left: 12, total: 30, art: "skewer", color: "#ffc23d" },
      { id: "wed-2", name: "Lamb Kofta Pair", description: "Cumin lamb, tahini, sumac onion, warm pita", price: 9.5, was: 12, left: 5, total: 20, art: "skewer", color: "#ff4d2e" },
      { id: "wed-3", name: "Chili Crisp Bowl", description: "Jasmine rice, crispy egg, chili crisp, greens", price: 10, left: 16, total: 25, art: "bowl", color: "#b8f04a" },
    ],
  },
  {
    day: "Thursday", short: "Thu", theme: "Dog Days",
    specials: [
      { id: "thu-1", name: "Chicago Dog", description: "All-beef frank, neon relish, sport peppers, poppy bun", price: 6, was: 7.5, left: 10, total: 30, art: "hotdog", color: "#ffc23d" },
      { id: "thu-2", name: "Kimchi Dog", description: "Griddled frank, kimchi, gochujang mayo, sesame", price: 7, left: 7, total: 20, art: "hotdog", color: "#ff4d2e" },
      { id: "thu-3", name: "Shoestring Fries", description: "Rosemary salt, garlic dip on the side", price: 4, left: 22, total: 30, art: "fries", color: "#ff8fb1" },
    ],
  },
  {
    day: "Friday", short: "Fri", theme: "Fuego Friday",
    specials: [
      { id: "fri-1", name: "Birria Tacos", description: "Slow-braised beef, melted Oaxaca cheese, consommé to dip", price: 12, was: 14.5, left: 6, total: 36, art: "taco", color: "#ff4d2e" },
      { id: "fri-2", name: "Nashville Hot Stack", description: "Fried chicken thigh, cayenne oil, pickles, slaw", price: 11, left: 13, total: 30, art: "burger", color: "#ffc23d" },
      { id: "fri-3", name: "Pepperoni Square", description: "Detroit-style slice, crispy cheese edge, hot honey", price: 5.5, was: 6.5, left: 3, total: 24, art: "pizza", color: "#ff8fb1" },
    ],
  },
  {
    day: "Saturday", short: "Sat", theme: "Weekend Pile-up",
    specials: [
      { id: "sat-1", name: "Triple Stack", description: "Three smashed patties, grilled onion, double cheese", price: 13.5, left: 8, total: 30, art: "burger", color: "#ff4d2e" },
      { id: "sat-2", name: "Margherita Slice", description: "San Marzano, fior di latte, basil, olive oil", price: 4.5, left: 15, total: 32, art: "pizza", color: "#b8f04a" },
      { id: "sat-3", name: "Truffle Fries", description: "Parmesan, parsley, truffle salt, aioli", price: 7, was: 8.5, left: 4, total: 20, art: "fries", color: "#ffc23d" },
    ],
  },
  {
    day: "Sunday", short: "Sun", theme: "Slow Sunday",
    specials: [
      { id: "sun-1", name: "Poke Bowl", description: "Ahi tuna, sushi rice, mango, edamame, ponzu", price: 13, left: 10, total: 24, art: "bowl", color: "#ff8fb1" },
      { id: "sun-2", name: "Steak Skewers", description: "Chimichurri flank, charred peppers, lime", price: 11.5, was: 13, left: 6, total: 20, art: "skewer", color: "#ff4d2e" },
      { id: "sun-3", name: "Sweet Corn Ribs", description: "Fried corn ribs, smoked paprika butter", price: 5, left: 17, total: 24, art: "corn", color: "#ffc23d" },
    ],
  },
];

const defaultTicker = ["Birria Tacos $12", "Smash Double $9 on Mondays", "Kitchen open till 2 am", "Al Pastor Trio $8 on Tuesdays", "Free horchata with any combo", "Pepperoni Square $5.50"];

const css = `
.hb-mc2 {
  --hb-mc2-accent: #ffc23d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: #120d14;
  background-image: radial-gradient(70% 60% at 0% 0%, rgba(255,77,46,.22), transparent 60%), radial-gradient(60% 60% at 100% 100%, rgba(255,143,177,.14), transparent 60%);
  color: #fff7ec;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-mc2 *, .hb-mc2 *::before, .hb-mc2 *::after { box-sizing: border-box; }
.hb-mc2-tick { position: relative; overflow: hidden; background: var(--hb-mc2-accent); color: #160f10; transform: rotate(-1.2deg) scale(1.03); margin-top: 18px; box-shadow: 0 10px 30px -12px rgba(0,0,0,.6); }
.hb-mc2-track { display: flex; width: max-content; animation: hb-mc2-roll 32s linear infinite; }
.hb-mc2-tick:hover .hb-mc2-track { animation-play-state: paused; }
.hb-mc2-run { display: flex; flex: none; align-items: center; }
.hb-mc2-chunk { display: inline-flex; align-items: center; gap: 18px; padding: 12px 18px 12px 0; font-family: var(--font-grotesk, inherit); font-size: 17px; font-weight: 700; letter-spacing: .02em; text-transform: uppercase; white-space: nowrap; }
.hb-mc2-star { width: 14px; height: 14px; flex: none; }
@keyframes hb-mc2-roll { to { transform: translateX(-50%); } }
.hb-mc2-wrap { max-width: 1120px; margin: 0 auto; padding: 56px 24px 88px; }
.hb-mc2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 30px; }
.hb-mc2-eyebrow { margin: 0 0 10px; color: #ff8a73; font-size: 13px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
.hb-mc2-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(42px, 7cqw, 78px); font-weight: 700; line-height: .92; letter-spacing: -.045em; text-transform: uppercase; }
.hb-mc2-title span { display: block; color: var(--hb-mc2-accent); }
.hb-mc2-days { display: flex; gap: 4px; padding: 5px; border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.hb-mc2-day { position: relative; flex: none; min-width: 52px; padding: 9px 10px 8px; border: 0; border-radius: 12px; background: transparent; color: #cbbfb4; font: inherit; font-family: var(--font-grotesk, inherit); font-size: 14px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: background .2s, color .2s; }
.hb-mc2-day:hover { color: #fff; background: rgba(255,255,255,.06); }
.hb-mc2-day[aria-selected="true"] { background: #fff7ec; color: #160f10; }
.hb-mc2-day[data-today="true"]::after { content: ""; position: absolute; left: 50%; bottom: 3px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #ff4d2e; }
.hb-mc2-day:focus-visible, .hb-mc2-claim:focus-visible { outline: 2px solid var(--hb-mc2-accent); outline-offset: 2px; }
.hb-mc2-theme { display: flex; align-items: center; gap: 12px; margin: 0 0 18px; font-family: var(--font-grotesk, inherit); font-size: 15px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #ffd9cf; }
.hb-mc2-theme b { padding: 4px 10px; border-radius: 8px; background: #ff4d2e; color: #fff; font-weight: 700; }
.hb-mc2-theme::after { content: ""; flex: 1; height: 2px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.2) 0 8px, transparent 8px 14px); }
.hb-mc2-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
.hb-mc2-card { position: relative; min-width: 0; display: flex; flex-direction: column; border-radius: 26px; background: var(--hb-mc2-c); color: #160f10; overflow: hidden; box-shadow: 0 24px 50px -28px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.4); animation: hb-mc2-pop .5s cubic-bezier(.2,1.3,.4,1) both; animation-delay: calc(var(--hb-mc2-i) * 80ms); transition: transform .25s cubic-bezier(.2,.8,.2,1); }
.hb-mc2-card:hover { transform: translateY(-4px) rotate(-.6deg); }
@keyframes hb-mc2-pop { from { opacity: 0; transform: translateY(18px) scale(.94) rotate(1.5deg); } }
.hb-mc2-art { position: relative; height: 150px; display: grid; place-items: center; background: radial-gradient(circle at 50% 60%, rgba(255,255,255,.45), transparent 62%); }
.hb-mc2-art svg { width: 150px; height: 130px; filter: drop-shadow(0 12px 10px rgba(60,10,0,.28)); }
.hb-mc2-deal { position: absolute; top: 14px; left: 14px; padding: 5px 10px; border-radius: 999px; background: #160f10; color: #fff7ec; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.hb-mc2-body { display: flex; flex-direction: column; flex: 1; padding: 4px 20px 20px; }
.hb-mc2-name { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 24px; font-weight: 700; line-height: 1.05; letter-spacing: -.02em; text-transform: uppercase; }
.hb-mc2-desc { margin: 6px 0 14px; font-size: 13.5px; line-height: 1.45; color: rgba(22,15,16,.72); }
.hb-mc2-prices { display: flex; align-items: baseline; gap: 8px; margin-top: auto; }
.hb-mc2-price { font-family: var(--font-grotesk, inherit); font-size: 32px; font-weight: 700; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-mc2-was { font-size: 14px; font-weight: 600; color: rgba(22,15,16,.5); text-decoration: line-through; }
.hb-mc2-meter { margin-top: 12px; }
.hb-mc2-mtop { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; font-weight: 700; margin-bottom: 6px; }
.hb-mc2-mtop[data-low="true"] .hb-mc2-left { color: #9b1200; }
.hb-mc2-bar { height: 9px; border-radius: 999px; background: rgba(22,15,16,.16); overflow: hidden; }
.hb-mc2-fill { height: 100%; border-radius: inherit; background: #160f10; transform-origin: left; transform: scaleX(var(--hb-mc2-p)); transition: transform .5s cubic-bezier(.2,.8,.2,1); animation: hb-mc2-grow .9s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-mc2-i) * 80ms + 200ms); }
@keyframes hb-mc2-grow { from { transform: scaleX(0); } }
.hb-mc2-claim { margin-top: 14px; height: 44px; border: 0; border-radius: 14px; background: #160f10; color: #fff7ec; font: inherit; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: transform .15s, background .2s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.hb-mc2-claim:hover { background: #2a1d1f; }
.hb-mc2-claim:active { transform: scale(.97); }
.hb-mc2-claim:disabled { background: rgba(22,15,16,.25); color: rgba(22,15,16,.6); cursor: not-allowed; }
.hb-mc2-claim[data-bump="true"] { animation: hb-mc2-bump .35s ease; }
@keyframes hb-mc2-bump { 40% { transform: scale(1.06); } }
.hb-mc2-sold { position: absolute; top: 46px; right: -36px; padding: 6px 44px; background: #160f10; color: var(--hb-mc2-accent); font-family: var(--font-grotesk, inherit); font-size: 14px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; transform: rotate(32deg); }
@container (max-width: 860px) {
  .hb-mc2-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 560px) {
  .hb-mc2-wrap { padding: 44px 16px 64px; }
  .hb-mc2-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-mc2-chunk { font-size: 14px; }
  .hb-mc2-art { height: 128px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mc2 *, .hb-mc2 *::before, .hb-mc2 *::after { animation: none !important; transition: none !important; }
}
`;

function Star() {
  return (
    <svg className="hb-mc2-star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" />
    </svg>
  );
}

export function MenuSpecialArtwork({ art }: { art: MenuSpecialArt }) {
  if (art === "taco") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <path d="M18 100C18 52 50 26 80 26s62 26 62 74z" fill="#f2b84b" />
        <path d="M28 98c4-30 26-54 52-54s48 24 52 54" fill="none" stroke="#5aa832" strokeWidth="12" strokeLinecap="round" />
        <path d="M34 98c6-24 24-42 46-42s40 18 46 42" fill="none" stroke="#8a3b1c" strokeWidth="10" strokeLinecap="round" />
        <circle cx="58" cy="64" r="5" fill="#ff5a3c" />
        <circle cx="84" cy="56" r="5" fill="#ff5a3c" />
        <circle cx="106" cy="68" r="5" fill="#fff4dc" />
        <circle cx="70" cy="58" r="3" fill="#fff4dc" />
        <path d="M18 100h124" stroke="#d99a2b" strokeWidth="6" strokeLinecap="round" />
        <path d="M36 92c8-34 24-52 44-56" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "burger") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <path d="M28 58c0-26 24-40 52-40s52 14 52 40z" fill="#e89a3c" />
        <path d="M40 40c10-10 24-14 40-14" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="4" strokeLinecap="round" />
        <g fill="#fff3d6"><ellipse cx="64" cy="36" rx="3" ry="1.8" /><ellipse cx="84" cy="30" rx="3" ry="1.8" /><ellipse cx="100" cy="40" rx="3" ry="1.8" /><ellipse cx="76" cy="44" rx="3" ry="1.8" /></g>
        <path d="M24 62c18 6 30-4 44 4s28-6 40 0 18 2 28-4l-4 10H28z" fill="#6dbb3a" />
        <path d="M26 72h108l-14 12-16-8-14 10-16-10-14 10-16-10-12 8z" fill="#ffc62e" />
        <rect x="24" y="76" width="112" height="16" rx="8" fill="#5a2a14" />
        <rect x="26" y="92" width="108" height="10" rx="5" fill="#7a3a1c" />
        <path d="M28 104h104c0 8-10 12-20 12H48c-10 0-20-4-20-12z" fill="#d98a34" />
      </svg>
    );
  }
  if (art === "fries") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <g fill="#ffd25a" stroke="#e7a92c" strokeWidth="1.5">
          <rect x="52" y="14" width="10" height="64" rx="3" transform="rotate(-10 57 46)" />
          <rect x="66" y="8" width="10" height="70" rx="3" transform="rotate(-3 71 43)" />
          <rect x="80" y="10" width="10" height="68" rx="3" transform="rotate(4 85 44)" />
          <rect x="94" y="16" width="10" height="62" rx="3" transform="rotate(11 99 47)" />
          <rect x="72" y="22" width="10" height="60" rx="3" transform="rotate(14 77 52)" />
        </g>
        <path d="M44 56h72l-10 64H54z" fill="#e5322b" />
        <path d="M44 56h72l-2 12H46z" fill="#c92218" />
        <path d="M64 84c4 10 28 10 32 0" fill="none" stroke="#fff3e0" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 64l6 52" stroke="rgba(255,255,255,.3)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "skewer") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <path d="M14 112L148 18" stroke="#c7a27a" strokeWidth="4" strokeLinecap="round" />
        <rect x="34" y="78" width="26" height="22" rx="7" fill="#9a4a22" transform="rotate(-35 47 89)" />
        <rect x="58" y="62" width="18" height="18" rx="5" fill="#e04a2a" transform="rotate(-35 67 71)" />
        <rect x="74" y="48" width="26" height="22" rx="7" fill="#b45a2a" transform="rotate(-35 87 59)" />
        <rect x="98" y="34" width="18" height="18" rx="5" fill="#6dbb3a" transform="rotate(-35 107 43)" />
        <rect x="112" y="20" width="24" height="20" rx="7" fill="#9a4a22" transform="rotate(-35 124 30)" />
        <path d="M38 86l12-8M80 58l12-8M116 32l10-7" stroke="rgba(255,240,220,.5)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "bowl") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <ellipse cx="80" cy="56" rx="60" ry="16" fill="#3a2a22" />
        <circle cx="58" cy="50" r="12" fill="#ff8a65" />
        <circle cx="80" cy="46" r="11" fill="#fff4e0" />
        <circle cx="80" cy="46" r="5" fill="#ffc62e" />
        <circle cx="102" cy="52" r="10" fill="#6dbb3a" />
        <circle cx="70" cy="60" r="6" fill="#ff4d6d" />
        <circle cx="94" cy="62" r="6" fill="#9ad15a" />
        <path d="M20 58h120c0 32-26 54-60 54S20 90 20 58z" fill="#fff7ec" />
        <path d="M20 58h120c0 4-1 8-2 11H22c-1-3-2-7-2-11z" fill="#ffd9cf" />
        <path d="M30 76c6 18 22 28 40 30" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "pizza") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <path d="M30 22h100l-50 100z" fill="#ffd25a" />
        <path d="M30 22h100l-6 12H36z" fill="#d98a34" />
        <path d="M38 36h84l-42 80z" fill="#ffcf3f" />
        <path d="M44 38c10 6 20 2 30 8s22-2 40 0" fill="none" stroke="#f3a12c" strokeWidth="5" strokeLinecap="round" opacity=".6" />
        <circle cx="66" cy="52" r="9" fill="#d8341f" />
        <circle cx="94" cy="50" r="9" fill="#d8341f" />
        <circle cx="80" cy="76" r="8" fill="#d8341f" />
        <circle cx="66" cy="52" r="3" fill="#a82312" />
        <circle cx="94" cy="50" r="3" fill="#a82312" />
        <path d="M80 104v12" stroke="#ffcf3f" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "hotdog") {
    return (
      <svg viewBox="0 0 160 130" aria-hidden="true">
        <path d="M18 78c0-14 12-20 26-20h72c14 0 26 6 26 20s-12 24-26 24H44c-14 0-26-10-26-24z" fill="#e89a3c" />
        <rect x="14" y="58" width="132" height="26" rx="13" fill="#c2412a" />
        <path d="M26 66h108" stroke="rgba(255,255,255,.3)" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 72c8-6 14 6 22 0s14 6 22 0 14 6 22 0 14 6 22 0 12 6 18 0" fill="none" stroke="#ffc62e" strokeWidth="5" strokeLinecap="round" />
        <g fill="#6dbb3a"><circle cx="40" cy="62" r="3" /><circle cx="62" cy="60" r="3" /><circle cx="96" cy="61" r="3" /><circle cx="118" cy="62" r="3" /></g>
        <path d="M22 84c4 12 16 18 30 18h56c14 0 26-6 30-18" fill="#d98a34" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 130" aria-hidden="true">
      <path d="M40 104L118 26" stroke="#5aa832" strokeWidth="10" strokeLinecap="round" />
      <path d="M48 108c-18-6-20-20-10-26M30 96c-6-14 2-26 14-26" fill="none" stroke="#6dbb3a" strokeWidth="6" strokeLinecap="round" />
      <rect x="54" y="20" width="40" height="92" rx="20" fill="#ffd25a" transform="rotate(45 74 66)" />
      <g fill="#f3b22c" transform="rotate(45 74 66)">
        {Array.from({ length: 6 }, (_, r) => Array.from({ length: 3 }, (_, c) => <rect key={`${r}-${c}`} x={58 + c * 11} y={28 + r * 13} width="9" height="10" rx="4" />))}
      </g>
      <path d="M64 88l36-36" stroke="#fff4dc" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <path d="M58 70l30-30" stroke="#ff4d2e" strokeWidth="2.5" strokeDasharray="2 5" strokeLinecap="round" />
    </svg>
  );
}

export function MenuSpecialsToday({
  eyebrow = "Fuego Street Kitchen · 418 Mercer Ave",
  title = "Today's specials",
  days = defaultDays,
  todayIndex = 4,
  ticker = defaultTicker,
  onChange,
  onClaim,
  accent = "#ffc23d",
  className,
  style,
  ...rest
}: MenuSpecialsTodayProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [index, setIndex] = React.useState(Math.min(Math.max(todayIndex, 0), days.length - 1));
  const [claimed, setClaimed] = React.useState<Record<string, number>>({});
  const [bump, setBump] = React.useState<string | null>(null);
  const dayRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const active = days[index] ?? days[0];

  const pick = (i: number) => {
    setIndex(i);
    onChange?.(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % days.length;
    if (e.key === "ArrowLeft") next = (i - 1 + days.length) % days.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = days.length - 1;
    if (next < 0) return;
    e.preventDefault();
    pick(next);
    dayRefs.current[next]?.focus();
  };

  const claim = (s: MenuSpecial) => {
    const left = Math.max(0, s.left - (claimed[s.id] ?? 0) - 1);
    setClaimed((c) => ({ ...c, [s.id]: (c[s.id] ?? 0) + 1 }));
    setBump(null);
    requestAnimationFrame(() => setBump(s.id));
    onClaim?.(s, left);
  };

  const words = title.split(" ");
  const last = words.pop();
  const run = (hidden: boolean) => (
    <div className="hb-mc2-run" aria-hidden={hidden || undefined}>
      {ticker.map((t, i) => (
        <span key={i} className="hb-mc2-chunk">
          {t}
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <section
      className={["hb-mc2", className].filter(Boolean).join(" ")}
      style={{ "--hb-mc2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-specials-today" precedence="default">{css}</style>
      {ticker.length ? (
        <div className="hb-mc2-tick">
          <div className="hb-mc2-track">
            {run(false)}
            {run(true)}
          </div>
        </div>
      ) : null}
      <div className="hb-mc2-wrap">
        <div className="hb-mc2-head">
          <div>
            <p className="hb-mc2-eyebrow">{eyebrow}</p>
            <h2 className="hb-mc2-title">{words.join(" ")} <span>{last}</span></h2>
          </div>
          <div className="hb-mc2-days" role="tablist" aria-label="Day of the week">
            {days.map((d, i) => (
              <button
                key={d.day}
                ref={(el) => { dayRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${uid}-t${i}`}
                aria-controls={`${uid}-p`}
                aria-selected={i === index}
                aria-label={i === todayIndex ? `${d.day}, today` : d.day}
                tabIndex={i === index ? 0 : -1}
                data-today={i === todayIndex || undefined}
                className="hb-mc2-day"
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {i === todayIndex ? "Today" : d.short}
              </button>
            ))}
          </div>
        </div>
        {active ? (
          <div role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${index}`}>
            <p className="hb-mc2-theme"><b>{active.short}</b>{active.theme}</p>
            <ul className="hb-mc2-grid" key={active.day}>
              {active.specials.map((s, i) => {
                const left = Math.max(0, s.left - (claimed[s.id] ?? 0));
                const p = s.total > 0 ? left / s.total : 0;
                const off = s.was ? Math.round((1 - s.price / s.was) * 100) : 0;
                return (
                  <li key={s.id} className="hb-mc2-card" style={{ "--hb-mc2-c": s.color ?? accent, "--hb-mc2-i": i, "--hb-mc2-p": p.toFixed(3) } as React.CSSProperties}>
                    <div className="hb-mc2-art">
                      {off > 0 ? <span className="hb-mc2-deal">{off}% off</span> : null}
                      <MenuSpecialArtwork art={s.art} />
                    </div>
                    {left === 0 ? <span className="hb-mc2-sold" aria-hidden="true">Sold out</span> : null}
                    <div className="hb-mc2-body">
                      <h3 className="hb-mc2-name">{s.name}</h3>
                      <p className="hb-mc2-desc">{s.description}</p>
                      <div className="hb-mc2-prices">
                        <span className="hb-mc2-price">${s.price.toFixed(2)}</span>
                        {s.was ? <span className="hb-mc2-was">${s.was.toFixed(2)}</span> : null}
                      </div>
                      <div className="hb-mc2-meter">
                        <div className="hb-mc2-mtop" data-low={left <= 6 || undefined}>
                          <span className="hb-mc2-left" aria-live="polite">{left === 0 ? "None left today" : `${left} left`}</span>
                          <span>of {s.total}</span>
                        </div>
                        <div className="hb-mc2-bar" role="meter" aria-valuemin={0} aria-valuemax={s.total} aria-valuenow={left} aria-label={`${s.name} remaining`}>
                          <div className="hb-mc2-fill" />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="hb-mc2-claim"
                        disabled={left === 0}
                        data-bump={bump === s.id || undefined}
                        onAnimationEnd={() => setBump(null)}
                        onClick={() => claim(s)}
                      >
                        {left === 0 ? "Sold out" : claimed[s.id] ? `Held for you · ${claimed[s.id]}` : "Hold one for pickup"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

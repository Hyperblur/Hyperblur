"use client";

import * as React from "react";

export type MenuQrTag = "vegan" | "vegetarian" | "gf" | "spicy" | "new" | "popular";

export type MenuQrArt = "dip" | "fries" | "skewer" | "plate" | "steak" | "stew" | "knafeh" | "scoop" | "lemonade" | "coffee" | "tea";

export interface MenuQrItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  art?: MenuQrArt;
  tags?: MenuQrTag[];
}

export interface MenuQrOrderLine {
  item: MenuQrItem;
  quantity: number;
}

export interface MenuQrTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: { title: string; text: string }[];
  restaurant?: string;
  table?: string;
  categories?: string[];
  items?: MenuQrItem[];
  defaultOrder?: Record<string, number>;
  accent?: string;
  onSubmit?: (order: { table: string; lines: MenuQrOrderLine[]; total: number }) => void;
}

const defaultItems: MenuQrItem[] = [
  { id: "feta", name: "Whipped feta", description: "Wildflower honey, Aleppo chili, warm pita", price: 9.5, category: "Small plates", art: "dip", tags: ["vegetarian", "popular"] },
  { id: "halloumi", name: "Halloumi fries", description: "Za'atar, pomegranate molasses, mint yogurt", price: 10, category: "Small plates", art: "fries", tags: ["vegetarian"] },
  { id: "kofta", name: "Lamb kofta skewers", description: "Tahini, sumac onions, charred tomato", price: 13.5, category: "Small plates", art: "skewer", tags: ["spicy"] },
  { id: "shawarma", name: "Chicken shawarma plate", description: "Garlic toum, pickled turnips, saffron rice", price: 18.5, category: "Mains", art: "plate", tags: ["popular", "gf"] },
  { id: "cauliflower", name: "Charred cauliflower steak", description: "Green tahini, toasted pine nuts, herbs", price: 16, category: "Mains", art: "steak", tags: ["vegan", "gf", "new"] },
  { id: "lamb", name: "Braised lamb shoulder", description: "Apricot, freekeh, preserved lemon", price: 26, category: "Mains", art: "stew" },
  { id: "knafeh", name: "Pistachio knafeh", description: "Warm cheese, orange blossom syrup", price: 9, category: "Desserts", art: "knafeh", tags: ["popular"] },
  { id: "rose", name: "Rose and cardamom ice cream", description: "Two scoops, crushed pistachio", price: 7.5, category: "Desserts", art: "scoop", tags: ["gf", "vegetarian"] },
  { id: "lemonade", name: "Frozen mint lemonade", description: "Fresh lemon, spearmint, cane sugar", price: 5.5, category: "Drinks", art: "lemonade", tags: ["vegan"] },
  { id: "coffee", name: "Cardamom coffee", description: "Finely ground, brewed in a copper cezve", price: 4, category: "Drinks", art: "coffee" },
  { id: "hibiscus", name: "Hibiscus iced tea", description: "Cold brewed, orange peel, a little honey", price: 5, category: "Drinks", art: "tea", tags: ["new"] },
];

const defaultSteps = [
  { title: "Scan the code", text: "Point your camera at the card on your table. No app to download." },
  { title: "Order from your seat", text: "Browse the full menu with photos, tags and live prices." },
  { title: "Relax, we bring it", text: "Your order goes straight to the kitchen with your table number." },
];

const tagLabel: Record<MenuQrTag, string> = { vegan: "Vegan", vegetarian: "Veggie", gf: "GF", spicy: "Spicy", new: "New", popular: "Popular" };

function TagIcon({ tag }: { tag: MenuQrTag }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      {tag === "vegan" ? <path {...p} d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zm0 0 7-7" /> : null}
      {tag === "vegetarian" ? <path {...p} d="M12 21v-8m0 0c0-4 3-7 7-7 0 4-3 7-7 7zm0 2c0-3-2-5-5-5 0 3 2 5 5 5z" /> : null}
      {tag === "gf" ? <path {...p} d="M12 21V8m0 0c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 6c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zM4 4l16 16" /> : null}
      {tag === "spicy" ? <path {...p} d="M7 20c6 0 11-5 11-12 0-1-1-2-2-2-1 4-4 9-9 11-1 0-1 3 0 3zM16 6c0-2 1-3 3-3" /> : null}
      {tag === "new" ? <path {...p} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /> : null}
      {tag === "popular" ? <path {...p} d="M12 21c-4 0-7-3-7-7 0-4 4-6 4-10 3 2 5 4 5 7 1-1 2-2 2-3 2 2 3 4 3 6 0 4-3 7-7 7z" /> : null}
    </svg>
  );
}

function Art({ kind, uid }: { kind: MenuQrArt; uid: string }) {
  const g = `${uid}-${kind}`;
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id={`${g}-plate`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#efe6da" />
        </radialGradient>
      </defs>
      {kind === "dip" ? (
        <g>
          <circle cx="32" cy="33" r="25" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          <circle cx="32" cy="33" r="15" fill="#f7efe2" />
          <path d="M22 33c3-7 17-7 20 0-3 6-17 6-20 0z" fill="#e9c46a" opacity=".55" />
          <path d="M25 31c4-3 10-3 14 1" stroke="#c9852b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="29" cy="36" r="1.3" fill="#c0392b" />
          <circle cx="35" cy="30" r="1.1" fill="#c0392b" />
          <path d="M8 22l10 6M10 44l9-6" stroke="#d9a35f" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : null}
      {kind === "fries" ? (
        <g>
          <circle cx="32" cy="34" r="25" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={(16 + i * 5.4).toFixed(1)} y={(20 + ((i * 7) % 6)).toFixed(1)} width="6" height="22" rx="2" fill={i % 2 ? "#f2c35b" : "#e7ad3f"} transform={`rotate(${((i - 2.5) * 9).toFixed(1)} 32 34)`} />
          ))}
          <circle cx="44" cy="44" r="6" fill="#fbf7f0" stroke="#e6dccd" />
          <circle cx="44" cy="44" r="3" fill="#8bb174" />
        </g>
      ) : null}
      {kind === "skewer" ? (
        <g>
          <ellipse cx="32" cy="34" rx="27" ry="22" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          <path d="M10 46L54 20" stroke="#b08a5a" strokeWidth="1.6" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={(20 + i * 12).toFixed(1)} cy={(40 - i * 7).toFixed(1)} rx="6.5" ry="4.5" fill={i === 1 ? "#a4532c" : "#8f4423"} transform={`rotate(-30 ${(20 + i * 12).toFixed(1)} ${(40 - i * 7).toFixed(1)})`} />
          ))}
          <path d="M18 48c4 2 9 2 13 0" stroke="#d94f3d" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="46" cy="42" r="4" fill="#f4ead9" stroke="#e1d2bb" />
        </g>
      ) : null}
      {kind === "plate" ? (
        <g>
          <circle cx="32" cy="33" r="26" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          <path d="M14 36c2-10 14-14 20-10 2 8-8 16-20 10z" fill="#f2c14e" />
          <path d="M30 22c8-4 18 0 20 8-6 4-16 4-20-8z" fill="#b5652f" />
          <path d="M33 25c5-1 10 1 13 5" stroke="#7d3e18" strokeWidth="1.2" fill="none" />
          <path d="M34 40c6 2 12 0 14-4" stroke="#d6457a" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="44" r="3" fill="#7fa65b" />
          <circle cx="20" cy="31" r="1" fill="#fff6dc" />
          <circle cx="25" cy="35" r="1" fill="#fff6dc" />
        </g>
      ) : null}
      {kind === "steak" ? (
        <g>
          <circle cx="32" cy="33" r="26" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          <path d="M18 34c0-10 8-15 15-14 9 1 14 7 13 14-1 9-10 12-16 11-7-1-12-5-12-11z" fill="#e8d3a6" />
          <path d="M22 30c4-3 9-4 14-2M24 37c5 2 11 2 16-1" stroke="#b5813d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M14 44c8 4 26 4 34-2" stroke="#6f9a4a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="33" r="1.2" fill="#8a5a2a" />
          <circle cx="37" cy="31" r="1.2" fill="#8a5a2a" />
        </g>
      ) : null}
      {kind === "stew" ? (
        <g>
          <ellipse cx="32" cy="38" rx="26" ry="18" fill="#3c2a20" />
          <ellipse cx="32" cy="34" rx="25" ry="16" fill="#5a3826" />
          <ellipse cx="32" cy="33" rx="20" ry="12" fill="#8a4a24" />
          <path d="M20 32c4-5 10-6 14-3 4-3 9-2 11 2-4 5-20 6-25 1z" fill="#6b2f17" />
          <circle cx="40" cy="30" r="3.2" fill="#f0a24a" />
          <circle cx="24" cy="35" r="2.4" fill="#f0a24a" />
          <path d="M30 36l2-3 2 3" stroke="#9cc06a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      ) : null}
      {kind === "knafeh" ? (
        <g>
          <circle cx="32" cy="34" r="25" fill={`url(#${g}-plate)`} stroke="#e4d6c4" />
          <circle cx="32" cy="34" r="17" fill="#e07b26" />
          <circle cx="32" cy="34" r="17" fill="none" stroke="#c4601a" strokeWidth="2" strokeDasharray="1.5 2.5" />
          <circle cx="32" cy="34" r="11" fill="#ef9a3a" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={(32 + Math.cos(i * 0.9) * 7).toFixed(2)} cy={(34 + Math.sin(i * 0.9) * 7).toFixed(2)} r="1.6" fill="#8fbf4f" />
          ))}
        </g>
      ) : null}
      {kind === "scoop" ? (
        <g>
          <path d="M14 34h36l-5 18H19z" fill="#e9e1d5" />
          <path d="M14 34h36" stroke="#d3c6b2" strokeWidth="2" />
          <circle cx="25" cy="28" r="10" fill="#f3b6c6" />
          <circle cx="39" cy="27" r="10" fill="#f7cbd6" />
          <path d="M17 31c3 2 6 2 8 0M31 31c3 2 7 2 10 0" stroke="#e48aa3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="33" cy="20" r="1.4" fill="#86b24b" />
          <circle cx="27" cy="22" r="1.2" fill="#86b24b" />
        </g>
      ) : null}
      {kind === "lemonade" || kind === "tea" ? (
        <g>
          <path d="M20 14h24l-3 40c0 2-2 3-4 3H27c-2 0-4-1-4-3z" fill={kind === "tea" ? "#c2324f" : "#e5f2c8"} opacity=".9" />
          <path d="M20 14h24l-1 10H21z" fill="#ffffff" opacity=".35" />
          <rect x="25" y="26" width="7" height="7" rx="1.5" fill="#ffffff" opacity=".6" transform="rotate(12 28 29)" />
          <rect x="32" y="34" width="6" height="6" rx="1.5" fill="#ffffff" opacity=".5" transform="rotate(-10 35 37)" />
          <path d="M38 6l-4 22" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="15" r="6" fill={kind === "tea" ? "#f59e0b" : "#f6d84a"} stroke="#ffffff" strokeWidth="1.5" />
          <path d="M18 12c3-3 7-3 9 0" stroke="#5aa35a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : null}
      {kind === "coffee" ? (
        <g>
          <ellipse cx="32" cy="50" rx="22" ry="6" fill="#e7dccd" />
          <path d="M18 26h26v14c0 7-6 12-13 12s-13-5-13-12z" fill="#b8733a" />
          <path d="M44 30c6 0 8 3 8 6s-3 6-8 6" stroke="#b8733a" strokeWidth="3" fill="none" />
          <ellipse cx="31" cy="26" rx="13" ry="3.5" fill="#3d2216" />
          <path d="M26 18c-2-3 2-5 0-8M34 18c-2-3 2-5 0-8" stroke="#c9b9a6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}

function QrCode({ seed }: { seed: string }) {
  const n = 25;
  let s = 7;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const inFinder = (r: number, c: number) => (r < 8 && c < 8) || (r < 8 && c >= n - 8) || (r >= n - 8 && c < 8);
  let d = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (inFinder(r, c)) continue;
      const h = (Math.imul(r * 73856093 ^ c * 19349663 ^ s, 2654435761) >>> 0) % 100;
      if (h < 47 || (r === 6 && c % 2 === 0) || (c === 6 && r % 2 === 0)) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  const finder = (x: number, y: number) => `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  return (
    <svg className="hb-mb1-qrsvg" viewBox="-2 -2 29 29" role="img" aria-label="QR code for the table menu" shapeRendering="crispEdges">
      <rect x="-2" y="-2" width="29" height="29" fill="#ffffff" />
      <path d={d} fill="#14161c" />
      <path d={`${finder(0, 0)}${finder(n - 7, 0)}${finder(0, n - 7)}`} fill="#14161c" fillRule="evenodd" />
      <rect x="10" y="10" width="5" height="5" rx="1" fill="#ffffff" />
      <rect x="11" y="11" width="3" height="3" rx=".6" fill="var(--hb-mb1-accent)" />
    </svg>
  );
}

const css = `
.hb-mb1 {
  --hb-mb1-accent: #e8603c;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  color: #1b1d24;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  background:
    radial-gradient(60% 70% at 85% 20%, color-mix(in srgb, var(--hb-mb1-accent) 18%, transparent), transparent 70%),
    radial-gradient(50% 60% at 10% 90%, rgba(120, 190, 170, .22), transparent 70%),
    linear-gradient(180deg, #fbf6ef 0%, #f4efe6 100%);
  -webkit-font-smoothing: antialiased;
}
.hb-mb1 *, .hb-mb1 *::before, .hb-mb1 *::after { box-sizing: border-box; }
.hb-mb1 em, .hb-mb1 i, .hb-mb1 cite { font-style: normal; }
.hb-mb1-wrap { max-width: 1120px; margin: 0 auto; padding: 64px 24px 80px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 340px); gap: 56px; align-items: center; }
.hb-mb1-copy { min-width: 0; }
.hb-mb1-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 18px; padding: 6px 12px 6px 8px; border-radius: 999px; background: #ffffff; border: 1px solid rgba(27, 29, 36, .08); box-shadow: 0 1px 2px rgba(27, 29, 36, .06); color: #4a4d57; font-size: 13px; font-weight: 500; }
.hb-mb1-dot { width: 8px; height: 8px; border-radius: 50%; background: #22a06b; box-shadow: 0 0 0 3px rgba(34, 160, 107, .18); }
.hb-mb1-title { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-weight: 600; font-size: clamp(38px, 6cqw, 64px); line-height: 1; letter-spacing: -.035em; color: #15171d; }
.hb-mb1-title em { color: var(--hb-mb1-accent); }
.hb-mb1-sub { margin: 18px 0 0; max-width: 440px; color: #5b5f6b; font-size: 16.5px; line-height: 1.6; }
.hb-mb1-scan { display: flex; align-items: center; gap: 26px; margin-top: 34px; }
.hb-mb1-qr { position: relative; flex: none; width: 148px; padding: 12px; border-radius: 22px; background: #ffffff; border: 1px solid rgba(27, 29, 36, .08); box-shadow: 0 24px 48px -28px rgba(40, 30, 20, .45), 0 2px 4px rgba(27, 29, 36, .05); overflow: hidden; }
.hb-mb1-qrsvg { display: block; width: 100%; height: auto; border-radius: 6px; }
.hb-mb1-beam { position: absolute; left: 8px; right: 8px; top: 12px; height: 26px; background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-mb1-accent) 35%, transparent) 80%, var(--hb-mb1-accent)); border-bottom: 2px solid var(--hb-mb1-accent); animation: hb-mb1-beam 2.6s cubic-bezier(.45, 0, .55, 1) infinite alternate; pointer-events: none; mix-blend-mode: multiply; }
@keyframes hb-mb1-beam { from { transform: translateY(-14px); } to { transform: translateY(110px); } }
.hb-mb1-qrtag { margin: 10px 0 0; text-align: center; color: #6b6f7b; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-mb1-steps { margin: 0; padding: 0; list-style: none; display: grid; gap: 16px; min-width: 0; }
.hb-mb1-step { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 12px; align-items: start; }
.hb-mb1-num { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 9px; background: #15171d; color: #ffffff; font-family: var(--font-grotesk, inherit); font-size: 13px; font-weight: 600; }
.hb-mb1-step b { display: block; font-size: 15px; font-weight: 600; color: #15171d; }
.hb-mb1-step span { display: block; margin-top: 2px; color: #6b6f7b; font-size: 13.5px; line-height: 1.45; }
.hb-mb1-stage { display: flex; justify-content: center; min-width: 0; }
.hb-mb1-phone { position: relative; width: 100%; max-width: 330px; height: 640px; padding: 12px; border-radius: 52px; background: linear-gradient(160deg, #2a2d35, #0f1014); box-shadow: 0 50px 90px -40px rgba(30, 20, 10, .6), 0 0 0 1px rgba(255, 255, 255, .06) inset, 0 0 0 2px #3a3e48; }
.hb-mb1-screen { position: relative; height: 100%; border-radius: 41px; overflow: hidden; background: #fffdf9; display: flex; flex-direction: column; }
.hb-mb1-notch { position: absolute; z-index: 3; top: 10px; left: 50%; width: 96px; height: 28px; margin-left: -48px; border-radius: 999px; background: #0d0e11; }
.hb-mb1-status { display: flex; justify-content: space-between; align-items: center; padding: 16px 26px 0; height: 46px; font-size: 13px; font-weight: 600; color: #15171d; }
.hb-mb1-status svg { display: block; }
.hb-mb1-head { padding: 8px 18px 12px; display: flex; align-items: center; gap: 12px; }
.hb-mb1-logo { display: grid; place-items: center; flex: none; width: 40px; height: 40px; border-radius: 13px; background: var(--hb-mb1-accent); color: #ffffff; font-family: var(--font-grotesk, inherit); font-weight: 700; font-size: 17px; }
.hb-mb1-rname { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.hb-mb1-rmeta { margin: 1px 0 0; font-size: 12px; color: #7a7e89; }
.hb-mb1-table { margin-left: auto; padding: 5px 9px; border-radius: 9px; background: #f2ede5; color: #3c3f48; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.hb-mb1-chips { display: flex; gap: 6px; padding: 0 18px 12px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid #efe9df; }
.hb-mb1-chips::-webkit-scrollbar { display: none; }
.hb-mb1-chip { flex: none; padding: 7px 12px; border-radius: 999px; border: 1px solid #e7e0d5; background: #ffffff; color: #4a4d57; font: inherit; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.hb-mb1-chip:hover { border-color: #cfc6b8; }
.hb-mb1-chip[aria-pressed="true"] { background: #15171d; border-color: #15171d; color: #ffffff; }
.hb-mb1-list { flex: 1; min-height: 0; overflow-y: auto; margin: 0; padding: 6px 14px 90px; list-style: none; scrollbar-width: none; }
.hb-mb1-list::-webkit-scrollbar { display: none; }
.hb-mb1-item { display: grid; grid-template-columns: 62px minmax(0, 1fr); gap: 12px; padding: 12px 4px; border-bottom: 1px solid #f1ebe2; animation: hb-mb1-in .45s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-mb1-i) * 50ms); }
@keyframes hb-mb1-in { from { opacity: 0; transform: translateY(8px); } }
.hb-mb1-thumb { width: 62px; height: 62px; border-radius: 16px; background: linear-gradient(160deg, #f6efe4, #ede3d4); display: grid; place-items: center; }
.hb-mb1-thumb svg { width: 54px; height: 54px; }
.hb-mb1-iname { margin: 0; font-size: 14px; font-weight: 600; line-height: 1.25; color: #15171d; }
.hb-mb1-idesc { margin: 2px 0 0; color: #7a7e89; font-size: 12px; line-height: 1.35; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.hb-mb1-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.hb-mb1-tag { display: inline-flex; align-items: center; gap: 3px; padding: 2px 6px; border-radius: 999px; font-size: 10px; font-weight: 600; line-height: 1.3; }
.hb-mb1-tag-vegan, .hb-mb1-tag-vegetarian { background: #e6f4ea; color: #23784a; }
.hb-mb1-tag-gf { background: #fbf0d9; color: #94620e; }
.hb-mb1-tag-spicy { background: #fde6e1; color: #c0391f; }
.hb-mb1-tag-new { background: #e8eefe; color: #2f56c9; }
.hb-mb1-tag-popular { background: #fdeadf; color: #b9521c; }
.hb-mb1-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; }
.hb-mb1-price { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; color: #15171d; }
.hb-mb1-add { display: inline-flex; align-items: center; gap: 4px; height: 30px; padding: 0 12px; border-radius: 999px; border: 0; background: #15171d; color: #ffffff; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: transform .15s, background .2s; }
.hb-mb1-add:hover { background: var(--hb-mb1-accent); }
.hb-mb1-add:active { transform: scale(.94); }
.hb-mb1-step2 { display: inline-flex; align-items: center; height: 30px; border-radius: 999px; background: #f2ede5; }
.hb-mb1-step2 button { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 50%; background: transparent; color: #15171d; font: inherit; font-size: 16px; font-weight: 600; cursor: pointer; }
.hb-mb1-step2 button:hover { background: #e7e0d5; }
.hb-mb1-step2 output { min-width: 18px; text-align: center; font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-mb1-empty { padding: 40px 10px; text-align: center; color: #7a7e89; font-size: 13px; }
.hb-mb1-bar { position: absolute; z-index: 2; left: 12px; right: 12px; bottom: 14px; display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 14px; border: 0; border-radius: 20px; background: #15171d; color: #ffffff; font: inherit; text-align: left; cursor: pointer; box-shadow: 0 16px 30px -12px rgba(0, 0, 0, .5); transition: transform .3s cubic-bezier(.2, .8, .2, 1), opacity .3s; }
.hb-mb1-bar[data-hidden="true"] { transform: translateY(120%); opacity: 0; pointer-events: none; }
.hb-mb1-count { display: grid; place-items: center; min-width: 26px; height: 26px; padding: 0 6px; border-radius: 9px; background: var(--hb-mb1-accent); font-size: 12.5px; font-weight: 700; }
.hb-mb1-bump { animation: hb-mb1-bump .45s cubic-bezier(.3, 1.6, .5, 1); }
@keyframes hb-mb1-bump { 40% { transform: scale(1.25); } }
.hb-mb1-barlabel { flex: 1; font-size: 13.5px; font-weight: 600; }
.hb-mb1-bartotal { padding: 7px 11px; border-radius: 12px; background: rgba(255, 255, 255, .1); font-size: 13.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-mb1-sheet { position: absolute; z-index: 4; inset: auto 0 0 0; max-height: 78%; display: flex; flex-direction: column; padding: 10px 18px 18px; border-radius: 26px 26px 0 0; background: #ffffff; box-shadow: 0 -20px 40px -20px rgba(0, 0, 0, .35); animation: hb-mb1-up .35s cubic-bezier(.2, .8, .2, 1); }
@keyframes hb-mb1-up { from { transform: translateY(100%); } }
.hb-mb1-scrim { position: absolute; z-index: 3; inset: 0; background: rgba(15, 16, 20, .32); border: 0; cursor: pointer; animation: hb-mb1-fade .3s both; }
@keyframes hb-mb1-fade { from { opacity: 0; } }
.hb-mb1-grip { width: 38px; height: 4px; margin: 0 auto 12px; border-radius: 999px; background: #e1dbd1; }
.hb-mb1-sheet h3 { margin: 0 0 8px; font-family: var(--font-grotesk, inherit); font-size: 18px; font-weight: 600; }
.hb-mb1-lines { margin: 0; padding: 0; list-style: none; overflow-y: auto; }
.hb-mb1-line { display: flex; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px dashed #ece5da; font-size: 13.5px; }
.hb-mb1-line span:first-child { color: #3c3f48; }
.hb-mb1-line b { font-variant-numeric: tabular-nums; }
.hb-mb1-sum { display: flex; justify-content: space-between; margin: 12px 0 14px; font-size: 15px; font-weight: 700; }
.hb-mb1-send { height: 46px; border: 0; border-radius: 15px; background: var(--hb-mb1-accent); color: #ffffff; font: inherit; font-size: 14.5px; font-weight: 600; cursor: pointer; transition: filter .2s; }
.hb-mb1-send:hover { filter: brightness(1.06); }
.hb-mb1-done { display: grid; justify-items: center; gap: 6px; padding: 18px 6px 8px; text-align: center; }
.hb-mb1-check { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: #e6f4ea; color: #23784a; animation: hb-mb1-pop .5s cubic-bezier(.3, 1.6, .5, 1); }
@keyframes hb-mb1-pop { from { transform: scale(.4); opacity: 0; } }
.hb-mb1-done b { font-size: 16px; }
.hb-mb1-done span { color: #6b6f7b; font-size: 13px; line-height: 1.5; }
.hb-mb1-again { margin-top: 8px; padding: 9px 16px; border-radius: 999px; border: 1px solid #e1dbd1; background: #ffffff; color: #15171d; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-mb1 button:focus-visible { outline: 2px solid var(--hb-mb1-accent); outline-offset: 2px; }
@container (max-width: 780px) {
  .hb-mb1-wrap { grid-template-columns: minmax(0, 1fr); gap: 40px; padding: 56px 20px 64px; }
}
@container (max-width: 460px) {
  .hb-mb1-scan { flex-direction: column; align-items: flex-start; }
  .hb-mb1-phone { height: 600px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mb1 *, .hb-mb1 *::before, .hb-mb1 *::after { animation: none !important; transition: none !important; }
}
`;

const money = (n: number) => `$${n.toFixed(2)}`;

export function MenuQrTable({
  eyebrow = "Now live at all three locations",
  title = "Scan, order, relax.",
  subtitle = "Every table at Saffron Lane has its own code. Guests browse the menu on their phone, order when they are ready and pay at the end, without waiting to flag anyone down.",
  steps = defaultSteps,
  restaurant = "Saffron Lane",
  table = "Table 12",
  categories,
  items = defaultItems,
  defaultOrder = { shawarma: 1, feta: 1 },
  accent = "#e8603c",
  onSubmit,
  className,
  style,
  ...rest
}: MenuQrTableProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const cats = React.useMemo(() => {
    if (categories?.length) return categories;
    const list = ["Popular"];
    for (const it of items) if (!list.includes(it.category)) list.push(it.category);
    return list;
  }, [categories, items]);
  const [cat, setCat] = React.useState(cats[0] ?? "");
  const [order, setOrder] = React.useState<Record<string, number>>(defaultOrder);
  const [bump, setBump] = React.useState(0);
  const [sheet, setSheet] = React.useState<"closed" | "open" | "sent">("closed");

  const shown = items.filter((it) => (cat === "Popular" ? it.tags?.includes("popular") : it.category === cat));
  const lines: MenuQrOrderLine[] = items.filter((it) => (order[it.id] ?? 0) > 0).map((it) => ({ item: it, quantity: order[it.id] }));
  const count = lines.reduce((a, l) => a + l.quantity, 0);
  const total = lines.reduce((a, l) => a + l.quantity * l.item.price, 0);

  const change = (id: string, delta: number) => {
    setOrder((o) => {
      const next = Math.max(0, (o[id] ?? 0) + delta);
      const copy = { ...o, [id]: next };
      if (!next) delete copy[id];
      return copy;
    });
    if (delta > 0) setBump((b) => b + 1);
  };

  const send = () => {
    onSubmit?.({ table, lines, total });
    setSheet("sent");
  };

  const reset = () => {
    setOrder({});
    setSheet("closed");
  };

  const words = title.split(" ");
  const last = words.pop();

  return (
    <section
      className={["hb-mb1", className].filter(Boolean).join(" ")}
      style={{ "--hb-mb1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-qr-table" precedence="default">{css}</style>
      <div className="hb-mb1-wrap">
        <div className="hb-mb1-copy">
          <p className="hb-mb1-eyebrow"><span className="hb-mb1-dot" aria-hidden="true" />{eyebrow}</p>
          <h2 className="hb-mb1-title">{words.join(" ")} <em>{last}</em></h2>
          <p className="hb-mb1-sub">{subtitle}</p>
          <div className="hb-mb1-scan">
            <div className="hb-mb1-qr">
              <QrCode seed={`${restaurant}-${table}`} />
              <span className="hb-mb1-beam" aria-hidden="true" />
              <p className="hb-mb1-qrtag">{table}</p>
            </div>
            <ol className="hb-mb1-steps">
              {steps.map((s, i) => (
                <li key={s.title} className="hb-mb1-step">
                  <span className="hb-mb1-num">{i + 1}</span>
                  <div><b>{s.title}</b><span>{s.text}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="hb-mb1-stage">
          <div className="hb-mb1-phone">
            <div className="hb-mb1-screen" aria-label={`${restaurant} table menu`}>
              <span className="hb-mb1-notch" aria-hidden="true" />
              <div className="hb-mb1-status" aria-hidden="true">
                <span>7:42</span>
                <svg width="52" height="12" viewBox="0 0 52 12">
                  <rect x="0" y="7" width="3" height="5" rx="1" fill="#15171d" />
                  <rect x="5" y="5" width="3" height="7" rx="1" fill="#15171d" />
                  <rect x="10" y="2" width="3" height="10" rx="1" fill="#15171d" />
                  <rect x="15" y="0" width="3" height="12" rx="1" fill="#15171d" />
                  <rect x="27" y="1" width="21" height="10" rx="3" fill="none" stroke="#15171d" strokeWidth="1.2" />
                  <rect x="29" y="3" width="14" height="6" rx="1.5" fill="#15171d" />
                  <rect x="49" y="4" width="2" height="4" rx="1" fill="#15171d" />
                </svg>
              </div>
              <div className="hb-mb1-head">
                <span className="hb-mb1-logo" aria-hidden="true">{restaurant.charAt(0)}</span>
                <div>
                  <p className="hb-mb1-rname">{restaurant}</p>
                  <p className="hb-mb1-rmeta">All-day Mediterranean · 4.8 rating</p>
                </div>
                <span className="hb-mb1-table">{table}</span>
              </div>
              <div className="hb-mb1-chips" role="group" aria-label="Menu categories">
                {cats.map((c) => (
                  <button key={c} type="button" className="hb-mb1-chip" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
              <ul className="hb-mb1-list" key={cat}>
                {shown.map((it, i) => {
                  const q = order[it.id] ?? 0;
                  return (
                    <li key={it.id} className="hb-mb1-item" style={{ "--hb-mb1-i": i } as React.CSSProperties}>
                      <div className="hb-mb1-thumb"><Art kind={it.art ?? "plate"} uid={uid} /></div>
                      <div>
                        <p className="hb-mb1-iname">{it.name}</p>
                        <p className="hb-mb1-idesc">{it.description}</p>
                        {it.tags?.length ? (
                          <div className="hb-mb1-tags">
                            {it.tags.map((t) => (
                              <span key={t} className={`hb-mb1-tag hb-mb1-tag-${t}`}><TagIcon tag={t} />{tagLabel[t]}</span>
                            ))}
                          </div>
                        ) : null}
                        <div className="hb-mb1-row">
                          <span className="hb-mb1-price">{money(it.price)}</span>
                          {q ? (
                            <span className="hb-mb1-step2">
                              <button type="button" aria-label={`Remove one ${it.name}`} onClick={() => change(it.id, -1)}>−</button>
                              <output aria-live="polite">{q}</output>
                              <button type="button" aria-label={`Add one ${it.name}`} onClick={() => change(it.id, 1)}>+</button>
                            </span>
                          ) : (
                            <button type="button" className="hb-mb1-add" aria-label={`Add ${it.name}`} onClick={() => change(it.id, 1)}>
                              <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
                {!shown.length ? <li className="hb-mb1-empty">Nothing in this section right now.</li> : null}
              </ul>
              <button
                type="button"
                className="hb-mb1-bar"
                data-hidden={count === 0 || sheet !== "closed"}
                onClick={() => setSheet("open")}
                aria-label={`View order, ${count} items, ${money(total)}`}
              >
                <span key={bump} className={`hb-mb1-count${bump ? " hb-mb1-bump" : ""}`}>{count}</span>
                <span className="hb-mb1-barlabel">View order</span>
                <span className="hb-mb1-bartotal">{money(total)}</span>
              </button>
              {sheet !== "closed" ? (
                <>
                  <button type="button" className="hb-mb1-scrim" aria-label="Close order" onClick={() => (sheet === "sent" ? reset() : setSheet("closed"))} />
                  <div className="hb-mb1-sheet" role="dialog" aria-label="Your order" onKeyDown={(e) => { if (e.key === "Escape") { if (sheet === "sent") reset(); else setSheet("closed"); } }}>
                    <span className="hb-mb1-grip" aria-hidden="true" />
                    {sheet === "open" ? (
                      <>
                        <h3>Your order · {table}</h3>
                        <ul className="hb-mb1-lines">
                          {lines.map((l) => (
                            <li key={l.item.id} className="hb-mb1-line">
                              <span>{l.quantity} × {l.item.name}</span>
                              <b>{money(l.quantity * l.item.price)}</b>
                            </li>
                          ))}
                        </ul>
                        <div className="hb-mb1-sum"><span>Total</span><span>{money(total)}</span></div>
                        <button type="button" className="hb-mb1-send" onClick={send} autoFocus>Send to kitchen</button>
                      </>
                    ) : (
                      <div className="hb-mb1-done" role="status">
                        <span className="hb-mb1-check">
                          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <b>Sent to the kitchen</b>
                        <span>{count} items for {table}. Your food should arrive in about 15 minutes.</span>
                        <button type="button" className="hb-mb1-again" onClick={reset}>Start a new order</button>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

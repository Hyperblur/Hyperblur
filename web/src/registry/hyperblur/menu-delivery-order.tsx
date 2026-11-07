"use client";

import * as React from "react";

export type MenuDeliveryTag = "vegan" | "vegetarian" | "gf" | "spicy" | "new" | "popular";

export type MenuDeliveryArt = "bao" | "noodles" | "ramen" | "rice" | "poke" | "dumplings" | "salad" | "fries" | "drink";

export interface MenuDeliveryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  art?: MenuDeliveryArt;
  tags?: MenuDeliveryTag[];
}

export interface MenuDeliveryLine {
  item: MenuDeliveryItem;
  quantity: number;
}

export interface MenuDeliveryCheckout {
  lines: MenuDeliveryLine[];
  subtotal: number;
  deliveryFee: number;
  tip: number;
  total: number;
}

export interface MenuDeliveryOrderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  restaurant?: string;
  tagline?: string;
  rating?: string;
  eta?: string;
  address?: string;
  items?: MenuDeliveryItem[];
  categories?: string[];
  defaultCart?: Record<string, number>;
  deliveryFee?: number;
  freeDeliveryOver?: number;
  tipOptions?: number[];
  defaultTip?: number;
  accent?: string;
  onCheckout?: (order: MenuDeliveryCheckout) => void;
}

const defaultItems: MenuDeliveryItem[] = [
  { id: "porkbao", name: "Crispy pork belly bao", description: "Hoisin glaze, cucumber, crushed peanuts, cilantro", price: 6.5, category: "Bao", art: "bao", tags: ["popular"] },
  { id: "chickenbao", name: "Fried chicken bao", description: "Gochujang mayo, sesame slaw, pickled jalapeño", price: 6, category: "Bao", art: "bao", tags: ["spicy"] },
  { id: "tofubao", name: "Tofu katsu bao", description: "Miso glaze, pickled carrot, shiso", price: 5.5, category: "Bao", art: "bao", tags: ["vegan", "new"] },
  { id: "dandan", name: "Dan dan noodles", description: "Pork mince, chili oil, sesame paste, bok choy", price: 14.5, category: "Noodles", art: "noodles", tags: ["spicy", "popular"] },
  { id: "udon", name: "Garlic butter udon", description: "Shiitake, scallion, soft egg yolk, nori", price: 13, category: "Noodles", art: "noodles", tags: ["vegetarian"] },
  { id: "ramen", name: "Tonkotsu ramen", description: "18-hour pork broth, chashu, marinated egg", price: 16.5, category: "Noodles", art: "ramen" },
  { id: "bulgogi", name: "Bulgogi rice bowl", description: "Grilled beef, kimchi, fried egg, sesame rice", price: 15.5, category: "Rice bowls", art: "rice", tags: ["new"] },
  { id: "poke", name: "Salmon poke", description: "Avocado, edamame, ponzu, crispy shallots", price: 16, category: "Rice bowls", art: "poke", tags: ["gf"] },
  { id: "dumplings", name: "Pork and chive dumplings", description: "Six pieces, black vinegar, chili crisp", price: 8.5, category: "Sides", art: "dumplings", tags: ["popular"] },
  { id: "cucumber", name: "Smashed cucumber salad", description: "Garlic, black vinegar, toasted sesame", price: 5.5, category: "Sides", art: "salad", tags: ["vegan", "gf"] },
  { id: "fries", name: "Furikake fries", description: "Seaweed salt, kewpie mayo on the side", price: 5, category: "Sides", art: "fries", tags: ["vegetarian"] },
  { id: "yuzu", name: "Yuzu lemonade", description: "Fresh yuzu, cane sugar, sparkling water", price: 4.5, category: "Drinks", art: "drink", tags: ["vegan"] },
];

const tagLabel: Record<MenuDeliveryTag, string> = { vegan: "Vegan", vegetarian: "Veggie", gf: "GF", spicy: "Spicy", new: "New", popular: "Popular" };

function TagIcon({ tag }: { tag: MenuDeliveryTag }) {
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

function Bowl({ inner, rim = "#f4f1ea" }: { inner: React.ReactNode; rim?: string }) {
  return (
    <g>
      <ellipse cx="40" cy="62" rx="26" ry="5" fill="rgba(0,0,0,.35)" />
      <path d="M10 38h60c0 14-12 24-30 24S10 52 10 38z" fill={rim} />
      <path d="M10 38h60c0 3-1 6-2 8H12c-1-2-2-5-2-8z" fill="#ffffff" opacity=".25" />
      <path d="M22 54c5 4 11 6 18 6" stroke="#d6cfc2" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="38" rx="30" ry="9" fill={rim} />
      <ellipse cx="40" cy="38" rx="27" ry="7.5" fill="#2b1b12" />
      {inner}
    </g>
  );
}

function Art({ kind }: { kind: MenuDeliveryArt }) {
  return (
    <svg viewBox="0 0 80 72" aria-hidden="true">
      {kind === "bao" ? (
        <g>
          <ellipse cx="40" cy="60" rx="28" ry="5" fill="rgba(0,0,0,.35)" />
          <path d="M12 40c0-14 12-22 28-22s28 8 28 22c0 6-4 9-10 9H22c-6 0-10-3-10-9z" fill="#f6efe2" />
          <path d="M14 42c4 3 16 4 26 4s22-1 26-4c-2 6-6 8-12 8H26c-6 0-10-2-12-8z" fill="#e8dcc6" />
          <path d="M12 40c6-4 18-6 28-6s22 2 28 6" stroke="#8a3b1f" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M16 38c8-2 16-3 24-3" stroke="#6aa84f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M44 36c8 0 14 1 20 3" stroke="#a7c957" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="36" r="1.4" fill="#e9c46a" />
          <circle cx="50" cy="35" r="1.4" fill="#e9c46a" />
          <path d="M24 26c6-4 22-5 32 0" stroke="#ffffff" strokeWidth="2" opacity=".55" fill="none" strokeLinecap="round" />
        </g>
      ) : null}
      {kind === "noodles" ? (
        <Bowl
          inner={
            <g>
              <ellipse cx="40" cy="38" rx="25" ry="6.5" fill="#c0392b" opacity=".85" />
              <path d="M20 37c4-3 8 2 12-1s8 2 12-1 8 2 12-1M22 40c4-3 8 2 12-1s8 2 12-1 8 2 10-1" stroke="#f2d38b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <ellipse cx="50" cy="35" rx="7" ry="3" fill="#5c8a3a" />
              <circle cx="30" cy="35" r="3" fill="#7a3b1e" />
              <circle cx="35" cy="38" r="2.4" fill="#7a3b1e" />
              <path d="M54 14L42 36M60 16L46 37" stroke="#c99a5b" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          }
        />
      ) : null}
      {kind === "ramen" ? (
        <Bowl
          rim="#1f1f1f"
          inner={
            <g>
              <ellipse cx="40" cy="38" rx="25" ry="6.5" fill="#e9d2a8" />
              <path d="M18 38c5-2 9 1 13-1s8 1 12-1 8 1 12-1" stroke="#f6e4b0" strokeWidth="2" fill="none" />
              <ellipse cx="30" cy="36" rx="7" ry="3.2" fill="#b4673a" />
              <ellipse cx="48" cy="37" rx="5" ry="3.4" fill="#ffffff" />
              <ellipse cx="48" cy="37" rx="2.4" ry="1.8" fill="#f2a93b" />
              <rect x="54" y="31" width="6" height="9" rx="1" fill="#1c2b1c" transform="rotate(10 57 35)" />
              <circle cx="38" cy="40" r="1.2" fill="#6aa84f" />
              <circle cx="42" cy="34" r="1.2" fill="#6aa84f" />
            </g>
          }
        />
      ) : null}
      {kind === "rice" || kind === "poke" ? (
        <Bowl
          inner={
            <g>
              <ellipse cx="40" cy="38" rx="25" ry="6.5" fill="#f7f3ea" />
              {kind === "rice" ? (
                <g>
                  <path d="M18 38c4-5 14-6 20-2-4 4-14 5-20 2z" fill="#8c4a2a" />
                  <path d="M42 34c6-2 12-1 16 3-5 3-12 3-16-3z" fill="#d94b2b" />
                  <circle cx="40" cy="40" r="5" fill="#ffffff" />
                  <circle cx="40" cy="40" r="2.4" fill="#f4b23a" />
                </g>
              ) : (
                <g>
                  <path d="M18 37l8-3 4 4-8 3z" fill="#ff8a65" />
                  <path d="M28 40l8-3 4 4-8 3z" fill="#ff7043" />
                  <path d="M44 33c5-1 10 1 12 4-5 2-10 2-12-4z" fill="#6aa84f" />
                  <circle cx="48" cy="40" r="2" fill="#9ccc65" />
                  <circle cx="53" cy="39" r="2" fill="#9ccc65" />
                  <circle cx="44" cy="42" r="2" fill="#9ccc65" />
                </g>
              )}
              <circle cx="30" cy="34" r=".9" fill="#1f1f1f" />
              <circle cx="34" cy="35" r=".9" fill="#1f1f1f" />
            </g>
          }
        />
      ) : null}
      {kind === "dumplings" ? (
        <g>
          <ellipse cx="40" cy="58" rx="32" ry="8" fill="rgba(0,0,0,.35)" />
          <ellipse cx="40" cy="48" rx="34" ry="12" fill="#2c2a26" />
          <ellipse cx="40" cy="46" rx="31" ry="10" fill="#3a3732" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${(16 + i * 16).toFixed(0)} ${(i === 1 ? 30 : 34).toFixed(0)})`}>
              <path d="M0 12c0-8 6-12 12-12s12 4 12 12c0 2-2 3-4 3H4c-2 0-4-1-4-3z" fill="#f3e6cc" />
              <path d="M3 4c2 2 3 4 3 7M9 1c1 3 1 6 1 9M15 1c-1 3-1 6-1 9M21 4c-2 2-3 4-3 7" stroke="#d9c49c" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M1 13c4 2 18 2 22 0" stroke="#c8873e" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="62" cy="52" r="4" fill="#5c1a12" />
        </g>
      ) : null}
      {kind === "salad" ? (
        <Bowl
          rim="#e5eef0"
          inner={
            <g>
              <ellipse cx="40" cy="38" rx="25" ry="6.5" fill="#2f4f2a" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={(18 + i * 7).toFixed(0)} y={(33 + ((i * 3) % 5)).toFixed(0)} width="8" height="5" rx="2" fill={i % 2 ? "#a5d17a" : "#7fb35a"} transform={`rotate(${((i - 3) * 14).toFixed(0)} ${(22 + i * 7).toFixed(0)} 36)`} />
              ))}
              <circle cx="30" cy="40" r="1" fill="#f6e7c1" />
              <circle cx="46" cy="35" r="1" fill="#f6e7c1" />
              <circle cx="52" cy="40" r="1.4" fill="#c0392b" />
            </g>
          }
        />
      ) : null}
      {kind === "fries" ? (
        <g>
          <ellipse cx="40" cy="62" rx="22" ry="5" fill="rgba(0,0,0,.35)" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={(24 + i * 4.6).toFixed(1)} y={(10 + ((i * 5) % 8)).toFixed(1)} width="5" height="30" rx="1.6" fill={i % 2 ? "#f4c75b" : "#e9b03f"} transform={`rotate(${((i - 3) * 5).toFixed(0)} 40 40)`} />
          ))}
          <path d="M20 30h40l-5 30H25z" fill="var(--hb-mb4-accent)" />
          <path d="M20 30h40l-1 6H21z" fill="#ffffff" opacity=".25" />
          <path d="M30 44h20" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />
          <circle cx="30" cy="22" r="1" fill="#1f2a1f" />
          <circle cx="46" cy="18" r="1" fill="#1f2a1f" />
        </g>
      ) : null}
      {kind === "drink" ? (
        <g>
          <ellipse cx="40" cy="64" rx="16" ry="4" fill="rgba(0,0,0,.35)" />
          <path d="M26 16h28l-3 44c0 2-2 4-4 4H33c-2 0-4-2-4-4z" fill="#f7e27a" opacity=".92" />
          <path d="M26 16h28l-1 10H27z" fill="#ffffff" opacity=".35" />
          <rect x="31" y="30" width="8" height="8" rx="2" fill="#ffffff" opacity=".55" transform="rotate(12 35 34)" />
          <rect x="40" y="40" width="7" height="7" rx="2" fill="#ffffff" opacity=".45" transform="rotate(-10 43 43)" />
          <path d="M46 6l-4 24" stroke="var(--hb-mb4-accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="54" cy="18" r="7" fill="#f2c94c" stroke="#fff6c9" strokeWidth="2" />
        </g>
      ) : null}
    </svg>
  );
}

const css = `
.hb-mb4 {
  --hb-mb4-accent: #ff5a36;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  color: #f2efea;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  background:
    radial-gradient(45% 35% at 0% 0%, color-mix(in srgb, var(--hb-mb4-accent) 16%, transparent), transparent 70%),
    #0b0b0b;
  -webkit-font-smoothing: antialiased;
}
.hb-mb4 *, .hb-mb4 *::before, .hb-mb4 *::after { box-sizing: border-box; }
.hb-mb4 em, .hb-mb4 i, .hb-mb4 cite { font-style: normal; }
.hb-mb4-wrap { max-width: 1160px; margin: 0 auto; padding: 48px 24px 80px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 360px); gap: 28px; align-items: start; }
.hb-mb4-main { min-width: 0; }
.hb-mb4-top { display: flex; align-items: center; gap: 16px; margin-bottom: 22px; }
.hb-mb4-logo { display: grid; place-items: center; flex: none; width: 60px; height: 60px; border-radius: 18px; background: var(--hb-mb4-accent); color: #0b0b0b; font-family: var(--font-grotesk, inherit); font-size: 26px; font-weight: 700; letter-spacing: -.04em; box-shadow: 0 14px 30px -14px var(--hb-mb4-accent); }
.hb-mb4-name { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(26px, 3.6cqw, 40px); font-weight: 700; letter-spacing: -.035em; line-height: 1; text-transform: uppercase; }
.hb-mb4-tagline { margin: 6px 0 0; color: #9a958d; font-size: 14px; }
.hb-mb4-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.hb-mb4-meta span { display: inline-flex; align-items: center; gap: 6px; padding: 7px 11px; border-radius: 999px; background: #151515; border: 1px solid #242424; color: #cfcac2; font-size: 12.5px; font-weight: 500; }
.hb-mb4-meta svg { color: var(--hb-mb4-accent); }
.hb-mb4-tools { display: grid; gap: 12px; position: sticky; top: 0; z-index: 2; padding: 10px 0 12px; background: linear-gradient(180deg, #0b0b0b 80%, rgba(11, 11, 11, 0)); }
.hb-mb4-search { position: relative; }
.hb-mb4-search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #7d786f; pointer-events: none; }
.hb-mb4-search input { width: 100%; height: 46px; padding: 0 14px 0 42px; border-radius: 14px; border: 1px solid #262626; background: #131313; color: #f2efea; font: inherit; font-size: 14.5px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-mb4-search input::placeholder { color: #6f6a62; }
.hb-mb4-search input:focus { border-color: var(--hb-mb4-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-mb4-accent) 18%, transparent); }
.hb-mb4-tabs { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }
.hb-mb4-tabs::-webkit-scrollbar { display: none; }
.hb-mb4-tab { flex: none; height: 36px; padding: 0 14px; border-radius: 999px; border: 1px solid #262626; background: transparent; color: #b5b0a7; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.hb-mb4-tab:hover { color: #f2efea; border-color: #3a3a3a; }
.hb-mb4-tab[aria-selected="true"] { background: #f2efea; border-color: #f2efea; color: #0b0b0b; }
.hb-mb4-tab small { margin-left: 6px; opacity: .55; font-size: 11.5px; }
.hb-mb4-group { margin-top: 18px; }
.hb-mb4-gname { display: flex; align-items: baseline; gap: 10px; margin: 0 0 10px; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 700; letter-spacing: -.02em; text-transform: uppercase; }
.hb-mb4-gname small { color: #6f6a62; font-family: var(--font-sans, inherit); font-size: 12.5px; font-weight: 500; letter-spacing: 0; text-transform: none; }
.hb-mb4-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-mb4-item { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 92px; gap: 12px; padding: 14px; border-radius: 18px; background: #131313; border: 1px solid #1f1f1f; transition: border-color .2s, background .2s, transform .2s; animation: hb-mb4-in .4s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-mb4-i) * 35ms); }
@keyframes hb-mb4-in { from { opacity: 0; transform: translateY(8px); } }
.hb-mb4-item:hover { border-color: #303030; background: #161616; transform: translateY(-2px); }
.hb-mb4-iname { margin: 0; font-size: 15px; font-weight: 600; line-height: 1.25; }
.hb-mb4-idesc { margin: 4px 0 0; color: #8e8981; font-size: 12.5px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-mb4-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
.hb-mb4-tag { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: .02em; line-height: 1.4; }
.hb-mb4-tag-vegan, .hb-mb4-tag-vegetarian { background: rgba(74, 222, 128, .12); color: #6fe39b; }
.hb-mb4-tag-gf { background: rgba(250, 204, 21, .12); color: #f5cf4f; }
.hb-mb4-tag-spicy { background: rgba(255, 90, 54, .14); color: #ff8a6b; }
.hb-mb4-tag-new { background: rgba(96, 165, 250, .14); color: #8ab8ff; }
.hb-mb4-tag-popular { background: rgba(251, 146, 60, .14); color: #fdae6b; }
.hb-mb4-price { display: block; margin-top: 10px; font-family: var(--font-grotesk, inherit); font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-mb4-art { position: relative; align-self: start; width: 92px; height: 84px; border-radius: 14px; background: radial-gradient(70% 70% at 50% 40%, #232323, #171717); display: grid; place-items: center; }
.hb-mb4-art svg { width: 82px; height: 74px; }
.hb-mb4-plus { position: absolute; right: -6px; bottom: -8px; display: grid; place-items: center; min-width: 34px; height: 34px; padding: 0 8px; border-radius: 999px; border: 3px solid #131313; background: #f2efea; color: #0b0b0b; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .2s, color .2s, transform .15s; }
.hb-mb4-plus:hover { background: var(--hb-mb4-accent); color: #0b0b0b; }
.hb-mb4-plus:active { transform: scale(.9); }
.hb-mb4-plus[data-in="true"] { background: var(--hb-mb4-accent); }
.hb-mb4-empty { padding: 48px 16px; border: 1px dashed #262626; border-radius: 18px; text-align: center; color: #8e8981; font-size: 14px; }
.hb-mb4-empty b { display: block; margin-bottom: 4px; color: #f2efea; font-size: 15px; }
.hb-mb4-cart { position: sticky; top: 20px; min-width: 0; padding: 20px; border-radius: 24px; background: #121212; border: 1px solid #222222; box-shadow: 0 30px 60px -40px rgba(0, 0, 0, .9), 0 1px 0 rgba(255, 255, 255, .04) inset; }
.hb-mb4-chead { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-mb4-chead h3 { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.hb-mb4-badge { display: grid; place-items: center; min-width: 28px; height: 28px; padding: 0 8px; border-radius: 999px; background: var(--hb-mb4-accent); color: #0b0b0b; font-size: 13px; font-weight: 800; }
.hb-mb4-bump { animation: hb-mb4-bump .45s cubic-bezier(.3, 1.6, .5, 1); }
@keyframes hb-mb4-bump { 40% { transform: scale(1.3) rotate(-6deg); } }
.hb-mb4-addr { display: flex; align-items: center; gap: 8px; margin: 10px 0 14px; padding: 10px 12px; border-radius: 12px; background: #181818; color: #b5b0a7; font-size: 12.5px; }
.hb-mb4-addr svg { flex: none; color: var(--hb-mb4-accent); }
.hb-mb4-lines { margin: 0; padding: 0; list-style: none; }
.hb-mb4-line { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #1f1f1f; animation: hb-mb4-slide .4s cubic-bezier(.2, .8, .2, 1) both; }
@keyframes hb-mb4-slide { from { opacity: 0; transform: translateX(16px); } }
.hb-mb4-lname { font-size: 13.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-mb4-lprice { font-size: 13.5px; font-weight: 700; font-variant-numeric: tabular-nums; text-align: right; }
.hb-mb4-lunit { color: #7d786f; font-size: 12px; }
.hb-mb4-qty { justify-self: end; display: inline-flex; align-items: center; border-radius: 999px; background: #1c1c1c; border: 1px solid #262626; }
.hb-mb4-qty button { display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 50%; background: transparent; color: #f2efea; font: inherit; font-size: 15px; cursor: pointer; }
.hb-mb4-qty button:hover { background: #262626; }
.hb-mb4-qty output { min-width: 20px; text-align: center; font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-mb4-free { margin: 14px 0 4px; font-size: 12.5px; color: #b5b0a7; }
.hb-mb4-free b { color: #f2efea; }
.hb-mb4-meter { height: 6px; border-radius: 999px; background: #1f1f1f; overflow: hidden; }
.hb-mb4-meter i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-mb4-accent) 70%, #ffc23d), var(--hb-mb4-accent)); transition: width .5s cubic-bezier(.2, .8, .2, 1); }
.hb-mb4-sums { margin: 14px 0 0; display: grid; gap: 8px; }
.hb-mb4-sums div { display: flex; justify-content: space-between; color: #a29d94; font-size: 13.5px; }
.hb-mb4-sums dd, .hb-mb4-sums dt { margin: 0; }
.hb-mb4-sums dd { color: #f2efea; font-variant-numeric: tabular-nums; }
.hb-mb4-zero { color: #6fe39b !important; font-weight: 600; }
.hb-mb4-tip { margin-top: 14px; }
.hb-mb4-tip p { margin: 0 0 8px; color: #a29d94; font-size: 12.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-mb4-tips { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.hb-mb4-tipbtn { height: 38px; border-radius: 11px; border: 1px solid #262626; background: #161616; color: #cfcac2; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s, border-color .2s, color .2s; }
.hb-mb4-tipbtn:hover { border-color: #3a3a3a; }
.hb-mb4-tipbtn[aria-checked="true"] { background: color-mix(in srgb, var(--hb-mb4-accent) 16%, #161616); border-color: var(--hb-mb4-accent); color: #f2efea; }
.hb-mb4-total { display: flex; justify-content: space-between; align-items: baseline; margin: 16px 0 14px; padding-top: 14px; border-top: 1px solid #222222; }
.hb-mb4-total span { font-size: 14px; font-weight: 600; }
.hb-mb4-total b { font-family: var(--font-grotesk, inherit); font-size: 28px; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-mb4-checkout { width: 100%; height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; border: 0; border-radius: 16px; background: var(--hb-mb4-accent); color: #0b0b0b; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer; transition: filter .2s, transform .15s; }
.hb-mb4-checkout:hover { filter: brightness(1.08); }
.hb-mb4-checkout:active { transform: scale(.98); }
.hb-mb4-checkout:disabled { background: #262626; color: #6f6a62; cursor: not-allowed; }
.hb-mb4-cempty { padding: 26px 8px; text-align: center; color: #8e8981; font-size: 13.5px; line-height: 1.5; }
.hb-mb4-cempty svg { display: block; margin: 0 auto 10px; color: #3a3a3a; }
.hb-mb4-done { display: grid; justify-items: center; gap: 6px; padding: 18px 4px 4px; text-align: center; animation: hb-mb4-in .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-mb4-tick { display: grid; place-items: center; width: 60px; height: 60px; border-radius: 50%; background: color-mix(in srgb, var(--hb-mb4-accent) 18%, transparent); color: var(--hb-mb4-accent); }
.hb-mb4-tick path { stroke-dasharray: 24; animation: hb-mb4-tick .6s .15s ease-out both; }
@keyframes hb-mb4-tick { from { stroke-dashoffset: 24; } }
.hb-mb4-done b { font-family: var(--font-grotesk, inherit); font-size: 20px; }
.hb-mb4-done span { color: #a29d94; font-size: 13.5px; line-height: 1.5; }
.hb-mb4-done code { padding: 2px 6px; border-radius: 6px; background: #1c1c1c; color: #f2efea; font-family: inherit; font-size: 12.5px; }
.hb-mb4-again { margin-top: 8px; height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid #2a2a2a; background: transparent; color: #f2efea; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-mb4 button:focus-visible { outline: 2px solid var(--hb-mb4-accent); outline-offset: 2px; }
@container (max-width: 880px) {
  .hb-mb4-wrap { grid-template-columns: minmax(0, 1fr); padding: 40px 20px 64px; }
  .hb-mb4-cart { position: static; }
}
@container (max-width: 560px) {
  .hb-mb4-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-mb4-tools { position: static; }
}
@container (max-width: 360px) {
  .hb-mb4-item { grid-template-columns: minmax(0, 1fr) 76px; padding: 12px; }
  .hb-mb4-art { width: 76px; height: 70px; }
  .hb-mb4-art svg { width: 68px; height: 62px; }
  .hb-mb4-cart { padding: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mb4 *, .hb-mb4 *::before, .hb-mb4 *::after { animation: none !important; transition: none !important; }
}
`;

const money = (n: number) => `$${n.toFixed(2)}`;

export function MenuDeliveryOrder({
  restaurant = "Lucky Bao",
  tagline = "Bao, hand-pulled noodles and rice bowls from Grand Street",
  rating = "4.9 (2.1k)",
  eta = "20 to 30 min",
  address = "418 Grand St, Apt 3B, Brooklyn",
  items = defaultItems,
  categories,
  defaultCart = { dandan: 1, porkbao: 2 },
  deliveryFee = 2.99,
  freeDeliveryOver = 35,
  tipOptions = [0, 10, 15, 20],
  defaultTip = 15,
  accent = "#ff5a36",
  onCheckout,
  className,
  style,
  ...rest
}: MenuDeliveryOrderProps) {
  const uid = React.useId();
  const cats = React.useMemo(() => {
    if (categories?.length) return categories;
    const list: string[] = [];
    for (const it of items) if (!list.includes(it.category)) list.push(it.category);
    return list;
  }, [categories, items]);
  const tabs = ["All", ...cats];
  const [tab, setTab] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [cart, setCart] = React.useState<Record<string, number>>(defaultCart);
  const [tip, setTip] = React.useState(defaultTip);
  const [bump, setBump] = React.useState(0);
  const [placed, setPlaced] = React.useState<{ code: string; count: number; total: number } | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const q = query.trim().toLowerCase();
  const matches = items.filter((it) => !q || `${it.name} ${it.description} ${it.category}`.toLowerCase().includes(q));
  const visibleCats = (tab === "All" ? cats : [tab]).map((c) => ({ name: c, list: matches.filter((it) => it.category === c) })).filter((g) => g.list.length);

  const lines: MenuDeliveryLine[] = items.filter((it) => (cart[it.id] ?? 0) > 0).map((it) => ({ item: it, quantity: cart[it.id] }));
  const count = lines.reduce((a, l) => a + l.quantity, 0);
  const subtotal = lines.reduce((a, l) => a + l.quantity * l.item.price, 0);
  const fee = subtotal >= freeDeliveryOver || subtotal === 0 ? 0 : deliveryFee;
  const tipAmount = Math.round(subtotal * tip) / 100;
  const total = subtotal + fee + tipAmount;
  const toFree = Math.max(0, freeDeliveryOver - subtotal);

  const change = (id: string, delta: number) => {
    setPlaced(null);
    setCart((c) => {
      const next = Math.max(0, (c[id] ?? 0) + delta);
      const copy = { ...c, [id]: next };
      if (!next) delete copy[id];
      return copy;
    });
    if (delta > 0) setBump((b) => b + 1);
  };

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  const checkout = () => {
    if (!count) return;
    onCheckout?.({ lines, subtotal, deliveryFee: fee, tip: tipAmount, total });
    const code = `${restaurant.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}-${2040 + count * 7 + Math.round(subtotal)}`;
    setPlaced({ code, count, total });
    setCart({});
  };

  return (
    <section
      className={["hb-mb4", className].filter(Boolean).join(" ")}
      style={{ "--hb-mb4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-delivery-order" precedence="default">{css}</style>
      <div className="hb-mb4-wrap">
        <div className="hb-mb4-main">
          <div className="hb-mb4-top">
            <span className="hb-mb4-logo" aria-hidden="true">{restaurant.split(" ").map((w) => w.charAt(0)).join("").slice(0, 2)}</span>
            <div style={{ minWidth: 0 }}>
              <h2 className="hb-mb4-name">{restaurant}</h2>
              <p className="hb-mb4-tagline">{tagline}</p>
            </div>
          </div>
          <div className="hb-mb4-meta">
            <span><svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" /></svg>{rating}</span>
            <span><svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" /></svg>{eta}</span>
            <span><svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /><circle cx="7" cy="18" r="2" fill="currentColor" /><circle cx="17" cy="18" r="2" fill="currentColor" /></svg>{money(deliveryFee)} delivery, free over ${freeDeliveryOver}</span>
          </div>
          <div className="hb-mb4-tools">
            <label className="hb-mb4-search">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${restaurant}`} aria-label="Search the menu" />
            </label>
            <div className="hb-mb4-tabs" role="tablist" aria-label="Menu categories">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-controls={`${uid}-panel`}
                  aria-selected={t === tab}
                  tabIndex={t === tab ? 0 : -1}
                  className="hb-mb4-tab"
                  onClick={() => setTab(t)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t}
                  <small>{t === "All" ? matches.length : matches.filter((it) => it.category === t).length}</small>
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${Math.max(0, tabs.indexOf(tab))}`}>
            {visibleCats.map((g) => (
              <div key={`${tab}-${g.name}`} className="hb-mb4-group">
                <h3 className="hb-mb4-gname">{g.name}<small>{g.list.length} {g.list.length === 1 ? "item" : "items"}</small></h3>
                <ul className="hb-mb4-grid">
                  {g.list.map((it, i) => {
                    const n = cart[it.id] ?? 0;
                    return (
                      <li key={it.id} className="hb-mb4-item" style={{ "--hb-mb4-i": i } as React.CSSProperties}>
                        <div style={{ minWidth: 0 }}>
                          <p className="hb-mb4-iname">{it.name}</p>
                          <p className="hb-mb4-idesc">{it.description}</p>
                          {it.tags?.length ? (
                            <div className="hb-mb4-tags">
                              {it.tags.map((t) => <span key={t} className={`hb-mb4-tag hb-mb4-tag-${t}`}><TagIcon tag={t} />{tagLabel[t]}</span>)}
                            </div>
                          ) : null}
                          <span className="hb-mb4-price">{money(it.price)}</span>
                        </div>
                        <div className="hb-mb4-art">
                          <Art kind={it.art ?? "rice"} />
                          <button type="button" className="hb-mb4-plus" data-in={n > 0} aria-label={n ? `Add another ${it.name}, ${n} in cart` : `Add ${it.name}`} onClick={() => change(it.id, 1)}>
                            {n ? n : <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" /></svg>}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {!visibleCats.length ? (
              <div className="hb-mb4-empty" role="status"><b>No dishes match &ldquo;{query}&rdquo;</b>Try noodles, bao or spicy.</div>
            ) : null}
          </div>
        </div>
        <aside className="hb-mb4-cart" aria-label="Your order">
          <div className="hb-mb4-chead">
            <h3>Your order</h3>
            {count ? <span key={bump} className={`hb-mb4-badge${bump ? " hb-mb4-bump" : ""}`} aria-label={`${count} items`}>{count}</span> : null}
          </div>
          {placed ? (
            <div className="hb-mb4-done" role="status">
              <span className="hb-mb4-tick">
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <b>Order placed</b>
              <span>Order <code>{placed.code}</code>, {placed.count} items, {money(placed.total)}. The kitchen is on it, arriving in {eta}.</span>
              <button type="button" className="hb-mb4-again" onClick={() => setPlaced(null)}>Order something else</button>
            </div>
          ) : (
            <>
              <div className="hb-mb4-addr">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="9.5" r="2.5" fill="currentColor" /></svg>
                <span>{address}</span>
              </div>
              {lines.length ? (
                <ul className="hb-mb4-lines">
                  {lines.map((l) => (
                    <li key={l.item.id} className="hb-mb4-line">
                      <span className="hb-mb4-lname">{l.item.name}</span>
                      <span className="hb-mb4-lprice">{money(l.item.price * l.quantity)}</span>
                      <span className="hb-mb4-lunit">{money(l.item.price)} each</span>
                      <span className="hb-mb4-qty">
                        <button type="button" aria-label={`Remove one ${l.item.name}`} onClick={() => change(l.item.id, -1)}>−</button>
                        <output aria-live="polite">{l.quantity}</output>
                        <button type="button" aria-label={`Add one ${l.item.name}`} onClick={() => change(l.item.id, 1)}>+</button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="hb-mb4-cempty">
                  <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                  Your bag is empty. Add a few dishes to get started.
                </div>
              )}
              {lines.length ? (
                <>
                  <p className="hb-mb4-free">{toFree > 0 ? <>Add <b>{money(toFree)}</b> more for free delivery</> : <><b>Free delivery</b> unlocked</>}</p>
                  <div className="hb-mb4-meter" aria-hidden="true"><i style={{ width: `${Math.min(100, (subtotal / freeDeliveryOver) * 100).toFixed(1)}%` }} /></div>
                  <dl className="hb-mb4-sums">
                    <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                    <div><dt>Delivery fee</dt><dd className={fee === 0 ? "hb-mb4-zero" : undefined}>{fee === 0 ? "Free" : money(fee)}</dd></div>
                    <div><dt>Tip for your rider</dt><dd>{money(tipAmount)}</dd></div>
                  </dl>
                  <div className="hb-mb4-tip">
                    <p>Tip</p>
                    <div className="hb-mb4-tips" role="radiogroup" aria-label="Tip">
                      {tipOptions.map((t) => (
                        <button key={t} type="button" role="radio" aria-checked={tip === t} className="hb-mb4-tipbtn" onClick={() => setTip(t)}>{t ? `${t}%` : "None"}</button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              <div className="hb-mb4-total"><span>Total</span><b aria-live="polite">{money(total)}</b></div>
              <button type="button" className="hb-mb4-checkout" disabled={!count} onClick={checkout}>
                <span>Checkout</span>
                <span>{money(total)}</span>
              </button>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

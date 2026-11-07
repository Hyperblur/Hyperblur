"use client";

import * as React from "react";

export type MenuPhotoArt = "pasta" | "salad" | "steak" | "tart" | "ramen" | "poke";

export interface MenuPhotoDish {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  ingredients: string[];
  art: MenuPhotoArt;
  tint?: string;
  badge?: string;
}

export interface MenuPhotoCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  dishes?: MenuPhotoDish[];
  defaultSaved?: string[];
  defaultOrder?: Record<string, number>;
  onAdd?: (dish: MenuPhotoDish, quantity: number) => void;
  onSaveChange?: (ids: string[]) => void;
  accent?: string;
}

const defaultDishes: MenuPhotoDish[] = [
  { id: "cacio", name: "Cacio e Pepe", description: "Hand-rolled tonnarelli, pecorino romano, toasted black pepper", price: 19, calories: 680, ingredients: ["Tonnarelli", "Pecorino romano", "Black pepper", "Cultured butter"], art: "pasta", tint: "#fbe9d0", badge: "House favorite" },
  { id: "burrata", name: "Burrata & Peach Salad", description: "Grilled peach, heirloom tomato, basil oil, pistachio", price: 17, calories: 420, ingredients: ["Burrata", "Grilled peach", "Heirloom tomato", "Pistachio", "Basil oil"], art: "salad", tint: "#e4f2dc" },
  { id: "ribeye", name: "Charred Ribeye", description: "12 oz dry-aged, salsa verde, crispy smashed potatoes", price: 42, calories: 960, ingredients: ["Dry-aged ribeye", "Salsa verde", "Smashed potatoes", "Flaky salt"], art: "steak", tint: "#f6dfd8", badge: "Chef's cut" },
  { id: "ramen", name: "Shoyu Ramen", description: "Chicken and dashi broth, chashu, soft egg, nori, scallion", price: 18, calories: 740, ingredients: ["Chicken dashi", "Pork chashu", "Ajitama egg", "Nori", "Scallion"], art: "ramen", tint: "#f8ecd4" },
  { id: "poke", name: "Citrus Salmon Poke", description: "Sushi rice, avocado, cucumber, yuzu ponzu, furikake", price: 21, calories: 560, ingredients: ["Salmon", "Sushi rice", "Avocado", "Cucumber", "Yuzu ponzu"], art: "poke", tint: "#dcebf4", badge: "New" },
  { id: "tart", name: "Lemon Meringue Tart", description: "Brown butter crust, Meyer lemon curd, torched meringue", price: 11, calories: 390, ingredients: ["Meyer lemon curd", "Brown butter crust", "Italian meringue"], art: "tart", tint: "#fbf1c9" },
];

const css = `
.hb-mc3 {
  --hb-mc3-accent: #ff6b4a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  background: #fbfaf7;
  color: #1a1715;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-mc3 *, .hb-mc3 *::before, .hb-mc3 *::after { box-sizing: border-box; }
.hb-mc3-wrap { max-width: 1120px; margin: 0 auto; padding: 72px 24px 96px; }
.hb-mc3-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 32px; }
.hb-mc3-eyebrow { margin: 0 0 12px; color: var(--hb-mc3-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.hb-mc3-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(34px, 5cqw, 54px); font-weight: 600; line-height: 1.02; letter-spacing: -.035em; }
.hb-mc3-sub { margin: 12px 0 0; max-width: 440px; color: #6f6862; font-size: 15.5px; line-height: 1.6; }
.hb-mc3-order { display: inline-flex; align-items: center; gap: 12px; padding: 8px 8px 8px 16px; border-radius: 999px; background: #fff; border: 1px solid #ece7e0; box-shadow: 0 10px 30px -18px rgba(60,40,20,.35); }
.hb-mc3-order[data-bump="true"] { animation: hb-mc3-bump .45s cubic-bezier(.3,1.6,.5,1); }
@keyframes hb-mc3-bump { 35% { transform: scale(1.06); } }
.hb-mc3-otext { font-size: 13.5px; color: #6f6862; white-space: nowrap; }
.hb-mc3-otext b { color: #1a1715; font-variant-numeric: tabular-nums; }
.hb-mc3-obtn { height: 36px; padding: 0 16px; border-radius: 999px; border: 0; background: #1a1715; color: #fff; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background .2s; }
.hb-mc3-obtn:hover:not(:disabled) { background: var(--hb-mc3-accent); }
.hb-mc3-obtn:disabled { background: #d8d2ca; cursor: default; }
.hb-mc3-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin: 0; padding: 0; list-style: none; }
.hb-mc3-card { position: relative; min-width: 0; display: flex; flex-direction: column; border-radius: 24px; background: #fff; border: 1px solid #efeae3; box-shadow: 0 1px 2px rgba(60,40,20,.05); transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s; animation: hb-mc3-rise .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-mc3-i) * 70ms); }
.hb-mc3-card:hover, .hb-mc3-card:focus-within { transform: translateY(-6px); box-shadow: 0 28px 50px -26px rgba(80,50,20,.38), 0 2px 6px rgba(60,40,20,.05); }
@keyframes hb-mc3-rise { from { opacity: 0; transform: translateY(16px); } }
.hb-mc3-media { position: relative; height: 200px; margin: 8px 8px 0; border-radius: 18px; overflow: hidden; background: radial-gradient(circle at 50% 55%, #fff 0%, var(--hb-mc3-tint) 70%); }
.hb-mc3-media svg { position: absolute; left: 50%; top: 50%; width: 176px; height: 176px; transform: translate(-50%, -50%); transition: transform .6s cubic-bezier(.2,.8,.2,1); filter: drop-shadow(0 16px 14px rgba(70,40,10,.18)); }
.hb-mc3-card:hover .hb-mc3-media svg, .hb-mc3-card:focus-within .hb-mc3-media svg { transform: translate(-50%, -62%) rotate(-8deg) scale(.86); }
.hb-mc3-badge { position: absolute; top: 12px; left: 12px; padding: 5px 10px; border-radius: 999px; background: rgba(255,255,255,.88); color: #1a1715; font-size: 11.5px; font-weight: 600; backdrop-filter: blur(6px); }
.hb-mc3-heart { position: absolute; top: 10px; right: 10px; width: 36px; height: 36px; display: grid; place-items: center; border: 0; border-radius: 50%; background: rgba(255,255,255,.9); color: #8b847c; cursor: pointer; transition: color .2s, transform .15s; z-index: 2; }
.hb-mc3-heart:hover { color: var(--hb-mc3-accent); }
.hb-mc3-heart:active { transform: scale(.9); }
.hb-mc3-heart[aria-pressed="true"] { color: var(--hb-mc3-accent); }
.hb-mc3-heart[aria-pressed="true"] svg { animation: hb-mc3-love .45s cubic-bezier(.3,1.8,.5,1); }
@keyframes hb-mc3-love { 0% { transform: scale(.6); } 60% { transform: scale(1.25); } }
.hb-mc3-info { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,.92); backdrop-filter: blur(10px); box-shadow: 0 10px 24px -14px rgba(60,40,20,.4); transform: translateY(calc(100% + 14px)); opacity: 0; transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.hb-mc3-card:hover .hb-mc3-info, .hb-mc3-card:focus-within .hb-mc3-info { transform: none; opacity: 1; }
.hb-mc3-itop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #8b847c; }
.hb-mc3-kcal { display: inline-flex; align-items: center; gap: 4px; color: var(--hb-mc3-accent); letter-spacing: .02em; text-transform: none; font-size: 12px; }
.hb-mc3-ing { display: flex; flex-wrap: wrap; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-mc3-ing li { padding: 3px 8px; border-radius: 999px; background: #f4f0ea; font-size: 11.5px; color: #4a443e; }
.hb-mc3-body { display: flex; flex-direction: column; flex: 1; padding: 16px 18px 18px; }
.hb-mc3-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-mc3-name { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 18px; font-weight: 600; letter-spacing: -.015em; line-height: 1.2; }
.hb-mc3-price { flex: none; font-family: var(--font-grotesk, inherit); font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-mc3-desc { margin: 6px 0 16px; color: #6f6862; font-size: 13.5px; line-height: 1.5; }
.hb-mc3-actions { display: flex; align-items: center; gap: 10px; margin-top: auto; }
.hb-mc3-add { position: relative; flex: 1; height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; border: 1px solid #e6e0d8; background: #fff; color: #1a1715; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, border-color .2s, color .2s, transform .15s; }
.hb-mc3-add:hover { background: #1a1715; border-color: #1a1715; color: #fff; }
.hb-mc3-add:active { transform: scale(.97); }
.hb-mc3-add[data-has="true"] { background: var(--hb-mc3-accent); border-color: var(--hb-mc3-accent); color: #fff; }
.hb-mc3-add[data-bump="true"] { animation: hb-mc3-bump .4s cubic-bezier(.3,1.6,.5,1); }
.hb-mc3-qty { min-width: 22px; height: 22px; padding: 0 6px; border-radius: 999px; background: rgba(255,255,255,.25); font-size: 12px; font-variant-numeric: tabular-nums; display: inline-grid; place-items: center; }
.hb-mc3-minus { width: 42px; height: 42px; flex: none; display: grid; place-items: center; border-radius: 12px; border: 1px solid #e6e0d8; background: #fff; color: #1a1715; cursor: pointer; transition: background .2s; }
.hb-mc3-minus:hover { background: #f4f0ea; }
.hb-mc3-heart:focus-visible, .hb-mc3-add:focus-visible, .hb-mc3-minus:focus-visible, .hb-mc3-obtn:focus-visible { outline: 2px solid var(--hb-mc3-accent); outline-offset: 2px; }
.hb-mc3-done { margin: 0; font-size: 13.5px; color: #2f7a3a; font-weight: 600; }
@container (max-width: 880px) { .hb-mc3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (max-width: 560px) {
  .hb-mc3-wrap { padding: 56px 16px 64px; }
  .hb-mc3-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-mc3-order { width: 100%; justify-content: space-between; }
}
@media (hover: none) { .hb-mc3-info { transform: none; opacity: 1; position: static; margin: 0; box-shadow: none; border-radius: 0; background: transparent; padding: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-mc3 *, .hb-mc3 *::before, .hb-mc3 *::after { animation: none !important; transition: none !important; }
}
`;

function Art({ art, uid }: { art: MenuPhotoArt; uid: string }) {
  const plate = (
    <>
      <circle cx="100" cy="100" r="92" fill={`url(#${uid}-p)`} />
      <circle cx="100" cy="100" r="70" fill="#fffefb" stroke="#ece6dc" />
    </>
  );
  const defs = (
    <defs>
      <radialGradient id={`${uid}-p`} cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="85%" stopColor="#f2ede4" />
        <stop offset="100%" stopColor="#e3dccf" />
      </radialGradient>
      <radialGradient id={`${uid}-b`} cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#3b4a5a" />
        <stop offset="100%" stopColor="#1d2631" />
      </radialGradient>
    </defs>
  );
  if (art === "pasta") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {defs}
        {plate}
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse key={i} cx="100" cy="100" rx={(46 - i * 5).toFixed(1)} ry={(40 - i * 4.5).toFixed(1)} fill="none" stroke={i % 2 ? "#f0c26a" : "#f6d389"} strokeWidth="6" transform={`rotate(${(i * 23).toFixed(0)} 100 100)`} />
        ))}
        {Array.from({ length: 14 }, (_, i) => {
          const a = i * 2.4;
          const r = 8 + ((i * 13) % 30);
          return <circle key={i} cx={(100 + Math.cos(a) * r).toFixed(2)} cy={(100 + Math.sin(a) * r).toFixed(2)} r="1.6" fill="#2a2420" />;
        })}
        <path d="M84 82c6-4 14-4 20 0" stroke="#fff8e6" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
        <path d="M120 70c4 0 8 4 6 8-4 0-8-4-6-8z" fill="#7aa64a" />
      </svg>
    );
  }
  if (art === "salad") {
    const leaves = Array.from({ length: 9 }, (_, i) => {
      const a = (i / 9) * Math.PI * 2;
      return { x: (100 + Math.cos(a) * 40).toFixed(2), y: (100 + Math.sin(a) * 40).toFixed(2), r: ((a * 180) / Math.PI + 90).toFixed(1) };
    });
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {defs}
        {plate}
        {leaves.map((l, i) => (
          <ellipse key={i} cx={l.x} cy={l.y} rx="11" ry="22" fill={i % 2 ? "#7fb85a" : "#9ccc6e"} transform={`rotate(${l.r} ${l.x} ${l.y})`} />
        ))}
        <path d="M70 100a12 12 0 0 1 24 0z" fill="#ff6b4a" />
        <path d="M108 120a12 12 0 0 1 24 0z" fill="#ffb24a" transform="rotate(30 120 120)" />
        <path d="M106 76a12 12 0 0 1 24 0z" fill="#ff8a5c" transform="rotate(-20 118 76)" />
        <circle cx="96" cy="104" r="20" fill="#fffaf0" />
        <circle cx="92" cy="98" r="8" fill="#fff" />
        <path d="M80 112c8 6 22 6 30-2" stroke="#4f8a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g fill="#9bb84a"><circle cx="128" cy="96" r="2.4" /><circle cx="74" cy="124" r="2.4" /><circle cx="118" cy="138" r="2.4" /></g>
      </svg>
    );
  }
  if (art === "steak") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {defs}
        {plate}
        <path d="M60 96c0-22 24-34 48-30 22 4 36 18 32 36-4 20-26 30-50 26-20-4-30-14-30-32z" fill="#7a2f1e" />
        <path d="M66 96c0-18 20-28 40-25 19 3 30 15 27 30-3 16-22 24-42 21-16-3-25-11-25-26z" fill="#a0442a" />
        <g stroke="#5a1f12" strokeWidth="4" strokeLinecap="round" opacity=".55">
          <path d="M76 80l40 30" /><path d="M86 74l40 30" /><path d="M70 92l36 26" />
        </g>
        <g fill="#f2d07a"><circle cx="58" cy="138" r="9" /><circle cx="74" cy="146" r="8" /><circle cx="140" cy="132" r="9" /></g>
        <path d="M122 60c10 0 18 6 16 14-10 2-18-4-16-14z" fill="#5f9a3e" />
        <path d="M116 64c6 6 10 10 16 12" stroke="#3f7a2a" strokeWidth="2" fill="none" />
      </svg>
    );
  }
  if (art === "ramen") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {defs}
        <circle cx="100" cy="100" r="90" fill={`url(#${uid}-b)`} />
        <circle cx="100" cy="100" r="76" fill="#e8b46a" />
        <circle cx="100" cy="100" r="76" fill="none" stroke="#c88a3e" strokeWidth="3" />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${(56 + i * 6).toFixed(0)} 120c10-10 20 10 30 0s20 10 30 0`} stroke="#f7e0a0" strokeWidth="4" fill="none" strokeLinecap="round" />
        ))}
        <circle cx="74" cy="80" r="18" fill="#e8c9a4" stroke="#b57a4a" strokeWidth="3" />
        <path d="M66 76c6 4 12 4 16 0" stroke="#b57a4a" strokeWidth="2" fill="none" />
        <ellipse cx="124" cy="78" rx="16" ry="13" fill="#fffaf0" />
        <ellipse cx="124" cy="78" rx="8" ry="7" fill="#f3a12c" />
        <rect x="128" y="102" width="26" height="34" rx="2" fill="#1f2a1e" transform="rotate(14 141 119)" />
        <g fill="#7fbf4a"><circle cx="96" cy="94" r="3" /><circle cx="104" cy="100" r="3" /><circle cx="92" cy="104" r="3" /><circle cx="108" cy="90" r="3" /></g>
      </svg>
    );
  }
  if (art === "poke") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {defs}
        <circle cx="100" cy="100" r="90" fill="#f7f4ee" stroke="#e7e0d4" strokeWidth="2" />
        <circle cx="100" cy="100" r="76" fill="#fffdf8" />
        <path d="M100 100L100 26A74 74 0 0 1 164 64z" fill="#ff8a65" />
        <g fill="#ff7550">{[0, 1, 2].map((i) => <rect key={i} x={(108 + i * 14).toFixed(0)} y={(42 + i * 6).toFixed(0)} width="12" height="12" rx="3" />)}</g>
        <path d="M100 100L164 64A74 74 0 0 1 150 154z" fill="#8cc06a" />
        <g fill="#6aa34a">{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={(140 + (i % 2) * 6).toFixed(0)} cy={(84 + i * 14).toFixed(0)} rx="7" ry="5" />)}</g>
        <path d="M100 100L150 154A74 74 0 0 1 52 156z" fill="#b8e0a4" />
        <g fill="#5f9a4a">{[0, 1, 2].map((i) => <circle key={i} cx={(80 + i * 18).toFixed(0)} cy="146" r="7" />)}</g>
        <path d="M100 100L52 156A74 74 0 0 1 100 26z" fill="#fbf7ee" />
        <g fill="#2a2420">{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={(58 + ((i * 17) % 34)).toFixed(0)} cy={(70 + ((i * 23) % 60)).toFixed(0)} r="1.4" />)}</g>
        <circle cx="100" cy="100" r="14" fill="#ffd25a" />
        <circle cx="100" cy="100" r="6" fill="#f3a12c" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      {defs}
      {plate}
      <circle cx="100" cy="100" r="52" fill="#d9a35a" />
      <circle cx="100" cy="100" r="44" fill="#ffd94a" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const x = 100 + Math.cos(a) * 28;
        const y = 100 + Math.sin(a) * 28;
        return (
          <g key={i}>
            <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r="10" fill="#fffaf0" />
            <circle cx={(x - 2).toFixed(2)} cy={(y - 3).toFixed(2)} r="4" fill="#e8a24a" opacity=".55" />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="11" fill="#fffaf0" />
      <circle cx="98" cy="97" r="4" fill="#e8a24a" opacity=".6" />
      <path d="M140 150c6-2 12 2 12 8" stroke="#f3c94a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MenuPhotoCards({
  eyebrow = "Lumen Kitchen · Spring menu",
  title = "Chef's favorites this season",
  subtitle = "Six plates our regulars order again and again. Hover a dish for what goes into it.",
  dishes = defaultDishes,
  defaultSaved = ["ramen"],
  defaultOrder = { cacio: 1, poke: 2 },
  onAdd,
  onSaveChange,
  accent = "#ff6b4a",
  className,
  style,
  ...rest
}: MenuPhotoCardsProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [saved, setSaved] = React.useState<string[]>(defaultSaved);
  const [qty, setQty] = React.useState<Record<string, number>>(defaultOrder);
  const [bump, setBump] = React.useState<string | null>(null);
  const [placed, setPlaced] = React.useState(false);

  const count = dishes.reduce((n, d) => n + (qty[d.id] ?? 0), 0);
  const total = dishes.reduce((n, d) => n + (qty[d.id] ?? 0) * d.price, 0);

  const kick = (id: string) => {
    setBump(null);
    requestAnimationFrame(() => setBump(id));
  };

  const change = (d: MenuPhotoDish, delta: number) => {
    const next = Math.max(0, (qty[d.id] ?? 0) + delta);
    setQty((q) => ({ ...q, [d.id]: next }));
    setPlaced(false);
    if (delta > 0) kick(d.id);
    onAdd?.(d, next);
  };

  const toggleSave = (id: string) => {
    const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
    setSaved(next);
    onSaveChange?.(next);
  };

  return (
    <section
      className={["hb-mc3", className].filter(Boolean).join(" ")}
      style={{ "--hb-mc3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-photo-cards" precedence="default">{css}</style>
      <div className="hb-mc3-wrap">
        <div className="hb-mc3-head">
          <div>
            <p className="hb-mc3-eyebrow">{eyebrow}</p>
            <h2 className="hb-mc3-title">{title}</h2>
            <p className="hb-mc3-sub">{subtitle}</p>
          </div>
          <div className="hb-mc3-order" data-bump={bump !== null || undefined} onAnimationEnd={(e) => { if (e.target === e.currentTarget) setBump(null); }}>
            {placed ? (
              <p className="hb-mc3-done" role="status">Order sent to the kitchen</p>
            ) : (
              <span className="hb-mc3-otext" aria-live="polite">
                Your order · <b>{count}</b> {count === 1 ? "item" : "items"} · <b>${total.toFixed(2)}</b>
              </span>
            )}
            <button type="button" className="hb-mc3-obtn" disabled={count === 0 || placed} onClick={() => setPlaced(true)}>
              {placed ? "Placed" : "Checkout"}
            </button>
          </div>
        </div>
        <ul className="hb-mc3-grid">
          {dishes.map((d, i) => {
            const q = qty[d.id] ?? 0;
            const isSaved = saved.includes(d.id);
            return (
              <li key={d.id} className="hb-mc3-card" style={{ "--hb-mc3-i": i, "--hb-mc3-tint": d.tint ?? "#f4efe7" } as React.CSSProperties}>
                <div className="hb-mc3-media">
                  <Art art={d.art} uid={`${uid}${i}`} />
                  {d.badge ? <span className="hb-mc3-badge">{d.badge}</span> : null}
                  <button type="button" className="hb-mc3-heart" aria-pressed={isSaved} aria-label={isSaved ? `Remove ${d.name} from saved` : `Save ${d.name}`} onClick={() => toggleSave(d.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7 4 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4 20 4 22.4 7 21.2 10.6 19.5 15.4 12 20 12 20z" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="hb-mc3-info">
                    <div className="hb-mc3-itop">
                      <span>Ingredients</span>
                      <span className="hb-mc3-kcal">
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 1 4 3 4 0-4-2-6 0-10z" fill="currentColor" /></svg>
                        {d.calories} kcal
                      </span>
                    </div>
                    <ul className="hb-mc3-ing">
                      {d.ingredients.map((g) => <li key={g}>{g}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="hb-mc3-body">
                  <div className="hb-mc3-row">
                    <h3 className="hb-mc3-name">{d.name}</h3>
                    <span className="hb-mc3-price">${d.price.toFixed(2)}</span>
                  </div>
                  <p className="hb-mc3-desc">{d.description}</p>
                  <div className="hb-mc3-actions">
                    {q > 0 ? (
                      <button type="button" className="hb-mc3-minus" aria-label={`Remove one ${d.name}`} onClick={() => change(d, -1)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="hb-mc3-add"
                      data-has={q > 0 || undefined}
                      data-bump={bump === d.id || undefined}
                      onClick={() => change(d, 1)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                      {q > 0 ? "Add another" : "Add to order"}
                      {q > 0 ? <span className="hb-mc3-qty" aria-label={`${q} in order`}>{q}</span> : null}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

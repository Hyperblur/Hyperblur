"use client";

import * as React from "react";

export type MenuComboTag = "popular" | "spicy" | "new" | "vegan" | "gluten-free";
export type MenuComboArt = "tenders" | "sandwich" | "wings" | "bowl" | "fries" | "cup" | "corn" | "drink" | "size";

export interface MenuComboOption {
  id: string;
  name: string;
  description: string;
  price: number;
  art: MenuComboArt;
  tone?: string;
  scale?: number;
  tags?: MenuComboTag[];
}

export interface MenuComboStep {
  id: string;
  label: string;
  heading: string;
  options: MenuComboOption[];
}

export interface MenuComboResult {
  selection: Record<string, MenuComboOption>;
  separate: number;
  price: number;
  savings: number;
}

export interface MenuComboBuilderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: MenuComboStep[];
  defaultSelection?: Record<string, string>;
  defaultStep?: number;
  discount?: number;
  venue?: string;
  accent?: string;
  onComplete?: (combo: MenuComboResult) => void;
}

const defaultSteps: MenuComboStep[] = [
  {
    id: "main",
    label: "Main",
    heading: "Pick your main",
    options: [
      { id: "hot-tenders", name: "Hot Tenders", description: "Three buttermilk tenders, Nashville hot oil, pickles.", price: 9.5, art: "tenders", tone: "#ff8a3d", tags: ["spicy", "popular"] },
      { id: "owl-sandwich", name: "Night Owl Sandwich", description: "Fried thigh, honey butter, vinegar slaw, brioche.", price: 10.25, art: "sandwich", tone: "#ffc23d", tags: ["popular"] },
      { id: "glazed-wings", name: "Glazed Wings", description: "Six wings, gochujang glaze, sesame, scallion.", price: 11, art: "wings", tone: "#ff5a5a", tags: ["spicy", "new"] },
      { id: "tofu-bowl", name: "Crispy Tofu Bowl", description: "Jasmine rice, pickled vegetables, sesame dressing.", price: 10.5, art: "bowl", tone: "#7cf29a", tags: ["vegan"] },
    ],
  },
  {
    id: "side",
    label: "Side",
    heading: "Add a side",
    options: [
      { id: "waffle-fries", name: "Waffle Fries", description: "Seasoned salt, comeback sauce for dipping.", price: 4.25, art: "fries", tone: "#ffd34d", tags: ["vegan"] },
      { id: "mac", name: "Mac and Cheese", description: "Three cheeses, toasted garlic crumbs.", price: 4.75, art: "cup", tone: "#ffb547", tags: ["popular"] },
      { id: "slaw", name: "Vinegar Slaw", description: "Cabbage, carrot, celery seed, no mayo.", price: 3.5, art: "cup", tone: "#9ff07a", tags: ["vegan", "gluten-free"] },
      { id: "street-corn", name: "Street Corn", description: "Cotija, lime, chili mayo, cilantro.", price: 4.5, art: "corn", tone: "#ffe066", tags: ["gluten-free"] },
    ],
  },
  {
    id: "drink",
    label: "Drink",
    heading: "Choose a drink",
    options: [
      { id: "yuzu", name: "Yuzu Lemonade", description: "Fresh yuzu, cane sugar, sparkling water.", price: 3.75, art: "drink", tone: "#f7f06a", tags: ["new"] },
      { id: "hibiscus", name: "Hibiscus Iced Tea", description: "Brewed in house, lightly sweet.", price: 3.5, art: "drink", tone: "#ff5fa8" },
      { id: "cola", name: "Classic Cola", description: "Cane sugar cola, lots of ice.", price: 2.95, art: "drink", tone: "#ff7a45" },
      { id: "shake", name: "Vanilla Shake", description: "Soft serve, Madagascar vanilla.", price: 5.5, art: "drink", tone: "#f2e9ff", tags: ["popular"] },
    ],
  },
  {
    id: "size",
    label: "Size",
    heading: "How hungry?",
    options: [
      { id: "regular", name: "Regular", description: "Regular side and a 16 oz drink.", price: 0, art: "size", scale: 0.78 },
      { id: "large", name: "Large", description: "Large side and a 24 oz drink.", price: 1.75, art: "size", scale: 0.92 },
      { id: "xl", name: "Night Owl XL", description: "Double side and a 32 oz drink.", price: 3.25, art: "size", scale: 1.06, tags: ["popular"] },
    ],
  },
];

const tagLabels: Record<MenuComboTag, string> = { popular: "Popular", spicy: "Spicy", new: "New", vegan: "Vegan", "gluten-free": "Gluten-free" };

const css = `
.hb-ma4 {
  --hb-ma4-accent: #ff4fd8;
  --hb-ma4-cyan: #38e8ff;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: #0c0a12;
  background-image: radial-gradient(700px 380px at 10% -10%, color-mix(in srgb, var(--hb-ma4-accent) 20%, transparent), transparent 70%), radial-gradient(600px 360px at 100% 100%, rgba(56, 232, 255, .12), transparent 70%), linear-gradient(rgba(255, 255, 255, .025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .025) 1px, transparent 1px);
  background-size: auto, auto, 40px 40px, 40px 40px;
  color: #f1eef8;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-ma4 *, .hb-ma4 *::before, .hb-ma4 *::after { box-sizing: border-box; }
.hb-ma4 em, .hb-ma4 i { font-style: normal; }
.hb-ma4-wrap { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 330px); gap: 40px; align-items: start; max-width: 1120px; margin: 0 auto; padding: 56px 24px 88px; }
.hb-ma4-main { min-width: 0; }
.hb-ma4-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: var(--hb-ma4-cyan); font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; text-shadow: 0 0 12px rgba(56, 232, 255, .6); }
.hb-ma4-title { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: clamp(32px, 4.6cqw, 48px); font-weight: 700; line-height: 1.02; letter-spacing: -.03em; }
.hb-ma4-title em { color: var(--hb-ma4-accent); text-shadow: 0 0 18px color-mix(in srgb, var(--hb-ma4-accent) 70%, transparent), 0 0 2px #fff; }
.hb-ma4-sub { margin: 12px 0 0; max-width: 480px; color: #9a94ab; font-size: 15px; line-height: 1.55; }
.hb-ma4-stepper { position: relative; margin: 28px 0 22px; }
.hb-ma4-steps { position: relative; display: grid; grid-template-columns: repeat(var(--hb-ma4-n, 4), minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.hb-ma4-track { position: absolute; left: 17px; right: 17px; top: 17px; height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .1); }
.hb-ma4-fill { position: absolute; inset: 0 auto 0 0; width: var(--hb-ma4-p, 0%); border-radius: 2px; background: linear-gradient(90deg, var(--hb-ma4-cyan), var(--hb-ma4-accent)); box-shadow: 0 0 12px var(--hb-ma4-accent); transition: width .5s cubic-bezier(.2, .8, .2, 1); }
.hb-ma4-step { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; min-width: 0; }
.hb-ma4-step:last-child { align-items: flex-end; }
.hb-ma4-step:not(:first-child):not(:last-child) { align-items: center; }
.hb-ma4-dot { display: inline-flex; align-items: center; gap: 10px; padding: 0; border: 0; background: none; color: #77718a; font: inherit; cursor: pointer; }
.hb-ma4-dot:disabled { cursor: default; }
.hb-ma4-num { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #15121d; border: 2px solid rgba(255, 255, 255, .14); color: #9a94ab; font-size: 13px; font-weight: 800; transition: border-color .3s, background .3s, color .3s, box-shadow .3s; }
.hb-ma4-step[data-state="done"] .hb-ma4-num { background: var(--hb-ma4-cyan); border-color: var(--hb-ma4-cyan); color: #06222a; box-shadow: 0 0 14px rgba(56, 232, 255, .55); }
.hb-ma4-step[data-state="current"] .hb-ma4-num { border-color: var(--hb-ma4-accent); color: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-ma4-accent) 22%, transparent), 0 0 18px color-mix(in srgb, var(--hb-ma4-accent) 60%, transparent); }
.hb-ma4-slabel { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.hb-ma4-step[data-state="current"] .hb-ma4-slabel { color: #fff; }
.hb-ma4-step[data-state="done"] .hb-ma4-slabel { color: #c9c4d8; }
.hb-ma4-sname { overflow: hidden; max-width: 100%; color: #77718a; font-size: 11.5px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ma4-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 0 12px; }
.hb-ma4-heading h3 { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 20px; font-weight: 700; letter-spacing: -.01em; }
.hb-ma4-heading span { color: #77718a; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-ma4-options { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 12px; }
.hb-ma4-opt { position: relative; display: grid; grid-template-columns: 76px minmax(0, 1fr); gap: 12px; align-items: center; min-width: 0; padding: 12px 14px 12px 12px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 18px; background: linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .015)); color: inherit; font: inherit; text-align: left; cursor: pointer; transition: border-color .25s, background .25s, transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s; animation: hb-ma4-in .45s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-ma4-i, 0) * 55ms); }
@keyframes hb-ma4-in { from { opacity: 0; transform: translateY(10px); } }
.hb-ma4-opt:hover { border-color: rgba(255, 255, 255, .18); transform: translateY(-2px); }
.hb-ma4-opt[aria-checked="true"] { border-color: var(--hb-ma4-accent); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-ma4-accent) 14%, transparent), rgba(255, 255, 255, .02)); box-shadow: 0 0 0 1px var(--hb-ma4-accent), 0 0 28px -6px color-mix(in srgb, var(--hb-ma4-accent) 70%, transparent); }
.hb-ma4-art { display: grid; place-items: center; width: 76px; height: 64px; border-radius: 14px; background: radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--hb-ma4-tone, var(--hb-ma4-accent)) 22%, transparent), transparent 70%), #110e18; border: 1px solid rgba(255, 255, 255, .06); color: var(--hb-ma4-tone, var(--hb-ma4-accent)); }
.hb-ma4-art svg { width: 100%; height: 100%; filter: drop-shadow(0 0 4px currentColor); }
.hb-ma4-otext { min-width: 0; }
.hb-ma4-otop { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-ma4-oname { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 15px; font-weight: 700; line-height: 1.2; }
.hb-ma4-oprice { flex: none; color: var(--hb-ma4-cyan); font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-ma4-odesc { display: block; margin-top: 3px; color: #8e88a0; font-size: 12px; line-height: 1.4; }
.hb-ma4-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.hb-ma4-tag { display: inline-flex; align-items: center; gap: 3px; height: 19px; padding: 0 7px 0 5px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .12); color: #cfcadc; font-size: 10px; font-weight: 700; }
.hb-ma4-tag svg { width: 11px; height: 11px; }
.hb-ma4-tag[data-tag="spicy"] { color: #ff8f6b; border-color: rgba(255, 143, 107, .4); }
.hb-ma4-tag[data-tag="popular"] { color: #ffd166; border-color: rgba(255, 209, 102, .4); }
.hb-ma4-tag[data-tag="new"] { color: var(--hb-ma4-cyan); border-color: rgba(56, 232, 255, .4); }
.hb-ma4-tag[data-tag="vegan"], .hb-ma4-tag[data-tag="gluten-free"] { color: #8ff0a8; border-color: rgba(143, 240, 168, .4); }
.hb-ma4-check { position: absolute; right: 10px; bottom: 10px; display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: var(--hb-ma4-accent); color: #fff; opacity: 0; transform: scale(.5); transition: opacity .2s, transform .3s cubic-bezier(.3, 1.6, .5, 1); }
.hb-ma4-opt[aria-checked="true"] .hb-ma4-check { opacity: 1; transform: none; }
.hb-ma4-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; }
.hb-ma4-back { height: 42px; padding: 0 16px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 999px; background: transparent; color: #c9c4d8; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background .2s, color .2s; }
.hb-ma4-back:hover:not(:disabled) { background: rgba(255, 255, 255, .06); color: #fff; }
.hb-ma4-back:disabled { opacity: .35; cursor: default; }
.hb-ma4-next { display: inline-flex; align-items: center; gap: 8px; height: 42px; padding: 0 20px; border: 0; border-radius: 999px; background: var(--hb-ma4-accent); color: #fff; font: inherit; font-size: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 0 24px -4px var(--hb-ma4-accent); transition: transform .18s, filter .18s; }
.hb-ma4-next:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
.hb-ma4-next:disabled { background: #2a2534; color: #6f6880; box-shadow: none; cursor: not-allowed; }
.hb-ma4-ticket { position: sticky; top: 16px; min-width: 0; filter: drop-shadow(0 30px 40px rgba(0, 0, 0, .6)) drop-shadow(0 0 30px color-mix(in srgb, var(--hb-ma4-accent) 18%, transparent)); }
.hb-ma4-paper { position: relative; padding: 22px 22px 34px; background: #f6f3ec; color: #1d1a24; border-radius: 16px 16px 0 0; -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%; mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%; }
.hb-ma4-thead { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding-bottom: 14px; border-bottom: 1.5px dashed #cfc8b8; }
.hb-ma4-thead b { display: block; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 16px; font-weight: 700; letter-spacing: .02em; text-transform: uppercase; }
.hb-ma4-thead small { display: block; margin-top: 2px; color: #7a7386; font-size: 11.5px; }
.hb-ma4-qr { flex: none; width: 34px; height: 34px; color: #1d1a24; }
.hb-ma4-lines { margin: 0; padding: 12px 0; list-style: none; border-bottom: 1.5px dashed #cfc8b8; }
.hb-ma4-line { display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; gap: 8px; align-items: baseline; padding: 6px 0; font-size: 13.5px; }
.hb-ma4-line span:first-child { color: #8b8497; font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.hb-ma4-line span:nth-child(2) { overflow: hidden; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
.hb-ma4-line[data-empty="true"] span:nth-child(2) { color: #aaa3b4; font-weight: 500; }
.hb-ma4-line span:last-child { font-variant-numeric: tabular-nums; }
.hb-ma4-line[data-fresh="true"] { animation: hb-ma4-flash .7s ease both; }
@keyframes hb-ma4-flash { 0% { background: color-mix(in srgb, var(--hb-ma4-accent) 25%, transparent); } 100% { background: transparent; } }
.hb-ma4-sum { padding-top: 12px; }
.hb-ma4-sep { display: flex; justify-content: space-between; color: #7a7386; font-size: 12.5px; }
.hb-ma4-sep s { font-variant-numeric: tabular-nums; }
.hb-ma4-total { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; margin-top: 6px; }
.hb-ma4-total span:first-child { font-size: 13px; font-weight: 700; }
.hb-ma4-big { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 40px; font-weight: 700; line-height: 1; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-ma4-save { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; padding: 6px 11px; border-radius: 999px; background: #1d1a24; color: #fff; font-size: 12px; font-weight: 700; }
.hb-ma4-save b { color: var(--hb-ma4-cyan); }
.hb-ma4-save[data-pop] { animation: hb-ma4-pop .5s cubic-bezier(.3, 1.6, .5, 1) both; }
@keyframes hb-ma4-pop { 0% { transform: scale(.8); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }
.hb-ma4-done { position: relative; padding: 6px 0 2px; text-align: center; animation: hb-ma4-in .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-ma4-stamp { display: inline-block; margin: 8px 0 12px; padding: 6px 14px; border: 3px solid #d02e7d; border-radius: 8px; color: #d02e7d; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 22px; font-weight: 700; letter-spacing: .14em; transform: rotate(-6deg); animation: hb-ma4-stamp .5s cubic-bezier(.3, 1.6, .5, 1) both; }
@keyframes hb-ma4-stamp { from { opacity: 0; transform: rotate(-6deg) scale(1.8); } }
.hb-ma4-done p { margin: 0; color: #4a4456; font-size: 13px; line-height: 1.5; }
.hb-ma4-again { margin-top: 14px; height: 38px; padding: 0 16px; border: 1.5px solid #1d1a24; border-radius: 999px; background: transparent; color: #1d1a24; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.hb-ma4-again:hover { background: #1d1a24; color: #fff; }
.hb-ma4 button:focus-visible { outline: 2px solid var(--hb-ma4-cyan); outline-offset: 2px; }
@container (max-width: 820px) {
  .hb-ma4-wrap { grid-template-columns: minmax(0, 1fr); gap: 28px; padding: 44px 18px 64px; }
  .hb-ma4-ticket { position: relative; top: 0; max-width: 420px; }
}
@container (max-width: 460px) {
  .hb-ma4-sname { display: none; }
  .hb-ma4-slabel { font-size: 10.5px; }
  .hb-ma4-opt { grid-template-columns: 60px minmax(0, 1fr); }
  .hb-ma4-art { width: 60px; height: 52px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ma4 *, .hb-ma4 *::before, .hb-ma4 *::after { animation: none !important; transition: none !important; }
}
`;

function TagIcon({ tag }: { tag: MenuComboTag }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (tag === "spicy") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M10 6c6 0 9 5 9 9 0 3-3 5-6 3-4-2-8-5-7-9 .4-2 2-3 4-3zM10 6c0-2 1.5-3 3-2.5" /></svg>;
  if (tag === "popular") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-5 1-8z" /></svg>;
  if (tag === "new") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></svg>;
  if (tag === "vegan") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 4v16M12 8l-3-2M12 8l3-2M12 12l-3-2M12 12l3-2M12 16l-3-2M12 16l3-2M4 4l16 16" /></svg>;
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function NeonArt({ art, scale = 1 }: { art: MenuComboArt; scale?: number }) {
  let body: React.ReactNode;
  if (art === "tenders") {
    body = (
      <g>
        <rect x="16" y="26" width="40" height="13" rx="6.5" transform="rotate(-18 36 32)" {...line} fill="currentColor" fillOpacity=".18" />
        <rect x="24" y="32" width="40" height="13" rx="6.5" transform="rotate(8 44 38)" {...line} fill="currentColor" fillOpacity=".18" />
        <rect x="20" y="16" width="36" height="12" rx="6" transform="rotate(-36 38 22)" {...line} fill="currentColor" fillOpacity=".18" />
        <path {...line} strokeWidth="1.6" d="M30 30h.5M42 38h.5M50 36h.5M36 22h.5" />
      </g>
    );
  } else if (art === "sandwich") {
    body = (
      <g>
        <path {...line} fill="currentColor" fillOpacity=".2" d="M14 30c0-11 12-17 26-17s26 6 26 17z" />
        <path {...line} d="M12 34c4-3 7-3 10 0s7 3 10 0 7-3 10 0 7 3 10 0 7-3 10 0" />
        <rect {...line} x="14" y="37" width="52" height="8" rx="4" fill="currentColor" fillOpacity=".3" />
        <path {...line} fill="currentColor" fillOpacity=".2" d="M14 48h52c0 4-3 6-6 6H20c-3 0-6-2-6-6z" />
        <path {...line} strokeWidth="1.6" d="M30 20h.5M40 18h.5M50 21h.5" />
      </g>
    );
  } else if (art === "wings") {
    body = (
      <g>
        <ellipse {...line} cx="46" cy="26" rx="16" ry="11" transform="rotate(-28 46 26)" fill="currentColor" fillOpacity=".2" />
        <path {...line} d="M34 34l-10 10" />
        <circle {...line} cx="20" cy="44" r="3.4" />
        <circle {...line} cx="25" cy="49" r="3.4" />
        <path {...line} strokeWidth="1.6" d="M42 22h.5M50 28h.5M46 18h.5" />
      </g>
    );
  } else if (art === "bowl") {
    body = (
      <g>
        <path {...line} d="M48 8l-8 22M58 10l-12 20" />
        <path {...line} fill="currentColor" fillOpacity=".25" d="M18 30c3-6 9-8 14-6 3-4 11-4 15 0 5-2 12 0 15 6z" />
        <path {...line} fill="currentColor" fillOpacity=".12" d="M12 30h56c0 13-12 22-28 22S12 43 12 30z" />
        <path {...line} d="M30 56h20" />
      </g>
    );
  } else if (art === "fries") {
    body = (
      <g>
        <path {...line} d="M28 30l-4-20M34 30l-1-22M40 30l1-20M46 30l3-21M52 30l5-18" />
        <path {...line} fill="currentColor" fillOpacity=".22" d="M22 28h36l-5 28H27z" />
        <path {...line} d="M34 40l6-5 6 5-6 10z" />
      </g>
    );
  } else if (art === "cup" || art === "corn") {
    body = art === "corn" ? (
      <g>
        <ellipse {...line} cx="40" cy="32" rx="22" ry="11" transform="rotate(-24 40 32)" fill="currentColor" fillOpacity=".22" />
        <path {...line} strokeWidth="1.4" d="M26 34l24-12M28 40l26-12M32 28l4 8M40 24l4 8M48 21l4 8" />
        <path {...line} d="M60 20c4-2 8 0 8 4M58 16c2-4 7-5 9-2" />
      </g>
    ) : (
      <g>
        <path {...line} fill="currentColor" fillOpacity=".3" d="M20 26c2-6 8-8 13-6 3-5 12-5 15 0 5-2 11 0 13 6z" />
        <path {...line} fill="currentColor" fillOpacity=".12" d="M18 26h44l-5 28H23z" />
        <path {...line} d="M24 36h32" />
      </g>
    );
  } else if (art === "drink") {
    body = (
      <g>
        <path {...line} d="M44 4l-4 16" />
        <path {...line} d="M24 16h32M26 20h28" />
        <path {...line} fill="currentColor" fillOpacity=".18" d="M27 20h26l-3 36H30z" />
        <path {...line} strokeWidth="1.6" d="M33 32h.5M44 38h.5M38 46h.5" />
      </g>
    );
  } else {
    body = (
      <g transform={`translate(40 60) scale(${scale.toFixed(2)}) translate(-40 -60)`}>
        <path {...line} d="M44 6l-3 12" />
        <path {...line} d="M24 16h22M24 20h22" />
        <path {...line} fill="currentColor" fillOpacity=".18" d="M26 20h18l-3 38H29z" />
        <path {...line} fill="currentColor" fillOpacity=".22" d="M48 40h20l-4 18H52z" />
        <path {...line} d="M51 40l-2-10M56 40v-12M61 40l2-10" />
      </g>
    );
  }
  return <svg viewBox="0 0 80 64" aria-hidden="true">{body}</svg>;
}

const money = (n: number) => `$${n.toFixed(2)}`;

export function MenuComboBuilder({
  eyebrow = "Night Owl Chicken · Combo builder",
  title = "Build your combo, keep the change.",
  subtitle = "Four quick picks. The ticket keeps score and the combo always costs less than ordering each piece on its own.",
  steps = defaultSteps,
  defaultSelection = { main: "hot-tenders", side: "waffle-fries" },
  defaultStep = 2,
  discount = 0.18,
  venue = "Night Owl Chicken",
  accent = "#ff4fd8",
  onComplete,
  className,
  style,
  ...rest
}: MenuComboBuilderProps) {
  const uid = React.useId();
  const sid = `hbma4${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [picks, setPicks] = React.useState<Record<string, string>>(defaultSelection);
  const [stepIndex, setStepIndex] = React.useState(Math.min(Math.max(defaultStep, 0), steps.length - 1));
  const [fresh, setFresh] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<{ number: string; price: number } | null>(null);
  const optRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [display, setDisplay] = React.useState<number | null>(null);
  const shown = React.useRef<number | null>(null);

  const selection: Record<string, MenuComboOption> = {};
  steps.forEach((s) => {
    const o = s.options.find((x) => x.id === picks[s.id]);
    if (o) selection[s.id] = o;
  });
  const chosen = Object.keys(selection).length;
  const complete = chosen === steps.length;
  const separate = Object.values(selection).reduce((s, o) => s + o.price, 0);
  const price = Math.floor(separate * (1 - discount) * 4) / 4;
  const savings = Math.max(0, separate - price);
  const step = steps[stepIndex];
  const reachable = (i: number) => steps.slice(0, i).every((s) => selection[s.id]);
  const progress = steps.length > 1 ? (Math.min(stepIndex, steps.length - 1) / (steps.length - 1)) * 100 : 100;

  React.useEffect(() => {
    const from = shown.current ?? price;
    shown.current = price;
    if (from === price) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const k = reduce ? 1 : Math.min(1, (t - start) / 650);
      const e = 1 - Math.pow(1 - k, 3);
      const value = from + (price - from) * e;
      shown.current = value;
      setDisplay(k < 1 ? value : null);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [price]);

  const pick = (option: MenuComboOption) => {
    setPicks((p) => ({ ...p, [step.id]: option.id }));
    setFresh(`${step.id}-${option.id}`);
  };

  const onOptKey = (event: React.KeyboardEvent, index: number) => {
    const n = step.options.length;
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % n;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + n) % n;
    if (next < 0) return;
    event.preventDefault();
    pick(step.options[next]);
    optRefs.current[next]?.focus();
  };

  const next = () => {
    if (!selection[step.id]) return;
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }
    if (!complete) {
      const missing = steps.findIndex((s) => !selection[s.id]);
      if (missing >= 0) setStepIndex(missing);
      return;
    }
    const number = `NO-${1000 + (Math.round(price * 100) % 9000)}`;
    setDone({ number, price });
    onComplete?.({ selection, separate, price, savings });
  };

  const reset = () => {
    setDone(null);
    setPicks({});
    setStepIndex(0);
    setFresh(null);
  };

  const words = title.split(" ");
  const last = words.pop();
  const checkedIndex = step.options.findIndex((o) => o.id === picks[step.id]);
  const isLast = stepIndex === steps.length - 1;

  return (
    <section className={["hb-ma4", className].filter(Boolean).join(" ")} style={{ "--hb-ma4-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-menu-combo-builder" precedence="default">{css}</style>
      <div className="hb-ma4-wrap">
        <div className="hb-ma4-main">
          <p className="hb-ma4-eyebrow">{eyebrow}</p>
          <h2 className="hb-ma4-title">{words.join(" ")} <em>{last}</em></h2>
          <p className="hb-ma4-sub">{subtitle}</p>

          <div className="hb-ma4-stepper">
          <span className="hb-ma4-track" aria-hidden="true"><span className="hb-ma4-fill" style={{ "--hb-ma4-p": `${progress.toFixed(1)}%` } as React.CSSProperties} /></span>
          <ol className="hb-ma4-steps" style={{ "--hb-ma4-n": steps.length } as React.CSSProperties} aria-label="Combo steps">
            {steps.map((s, i) => {
              const state = i === stepIndex && !done ? "current" : selection[s.id] ? "done" : "todo";
              return (
                <li key={s.id} className="hb-ma4-step" data-state={state}>
                  <button type="button" className="hb-ma4-dot" disabled={!!done || !reachable(i)} onClick={() => setStepIndex(i)} aria-current={state === "current" ? "step" : undefined} aria-label={`Step ${i + 1}, ${s.label}${selection[s.id] ? `: ${selection[s.id].name}` : ""}`}>
                    <span className="hb-ma4-num">
                      {state === "done" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : i + 1}
                    </span>
                  </button>
                  <span className="hb-ma4-slabel">{s.label}</span>
                  <span className="hb-ma4-sname">{selection[s.id]?.name ?? "Not picked"}</span>
                </li>
              );
            })}
          </ol>
          </div>

          <div className="hb-ma4-heading">
            <h3 id={`${sid}-heading`}>{step.heading}</h3>
            <span>Step {stepIndex + 1} of {steps.length}</span>
          </div>
          <div className="hb-ma4-options" role="radiogroup" aria-labelledby={`${sid}-heading`} key={step.id}>
            {step.options.map((o, i) => {
              const checked = picks[step.id] === o.id;
              return (
                <button
                  key={o.id}
                  ref={(el) => { optRefs.current[i] = el; }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked || (checkedIndex < 0 && i === 0) ? 0 : -1}
                  className="hb-ma4-opt"
                  disabled={!!done}
                  style={{ "--hb-ma4-i": i, "--hb-ma4-tone": o.tone ?? accent } as React.CSSProperties}
                  onClick={() => pick(o)}
                  onKeyDown={(e) => onOptKey(e, i)}
                >
                  <span className="hb-ma4-art"><NeonArt art={o.art} scale={o.scale} /></span>
                  <span className="hb-ma4-otext">
                    <span className="hb-ma4-otop">
                      <span className="hb-ma4-oname">{o.name}</span>
                      <span className="hb-ma4-oprice">{o.price ? (step.id === "size" ? `+${money(o.price)}` : money(o.price)) : "Free"}</span>
                    </span>
                    <span className="hb-ma4-odesc">{o.description}</span>
                    {o.tags?.length ? (
                      <span className="hb-ma4-tags">
                        {o.tags.map((t) => <span key={t} className="hb-ma4-tag" data-tag={t}><TagIcon tag={t} />{tagLabels[t]}</span>)}
                      </span>
                    ) : null}
                  </span>
                  <span className="hb-ma4-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="hb-ma4-nav">
            <button type="button" className="hb-ma4-back" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0 || !!done}>Back</button>
            <button type="button" className="hb-ma4-next" onClick={next} disabled={!selection[step.id] || !!done}>
              {isLast ? `Add combo · ${money(price)}` : `Next: ${steps[stepIndex + 1]?.label}`}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <aside className="hb-ma4-ticket" aria-label="Combo ticket">
          <div className="hb-ma4-paper">
            <div className="hb-ma4-thead">
              <div>
                <b>{venue}</b>
                <small>Combo ticket · {chosen} of {steps.length} picked</small>
              </div>
              <svg className="hb-ma4-qr" viewBox="0 0 7 7" aria-hidden="true" shapeRendering="crispEdges">
                {Array.from({ length: 49 }, (_, i) => {
                  const x = i % 7;
                  const y = Math.floor(i / 7);
                  const corner = (x < 2 && y < 2) || (x > 4 && y < 2) || (x < 2 && y > 4);
                  const on = corner || ((i * 37 + 11) % 5 < 2);
                  return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" /> : null;
                })}
              </svg>
            </div>
            {done ? (
              <div className="hb-ma4-done" aria-live="polite">
                <span className="hb-ma4-stamp">ADDED</span>
                <p><strong>Combo added to order {done.number}.</strong></p>
                <p>{money(done.price)} · ready at the window in about 9 minutes.</p>
                <button type="button" className="hb-ma4-again" onClick={reset}>Build another combo</button>
              </div>
            ) : (
              <>
                <ul className="hb-ma4-lines">
                  {steps.map((s) => {
                    const o = selection[s.id];
                    return (
                      <li key={s.id} className="hb-ma4-line" data-empty={!o} data-fresh={!!o && fresh === `${s.id}-${o.id}`}>
                        <span>{s.label}</span>
                        <span>{o ? o.name : `Pick a ${s.label.toLowerCase()}`}</span>
                        <span>{o ? money(o.price) : "-"}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="hb-ma4-sum" aria-live="polite">
                  <div className="hb-ma4-sep"><span>Bought separately</span><s>{money(separate)}</s></div>
                  <div className="hb-ma4-total">
                    <span>Combo price</span>
                    <span className="hb-ma4-big">{money(display ?? price)}</span>
                  </div>
                  {savings > 0 ? (
                    <span className="hb-ma4-save" key={savings.toFixed(2)} data-pop="">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
                      You save <b>{money(savings)}</b>{complete ? "" : " so far"}
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export type MenuBrunchIcon = "egg" | "pancake" | "toast" | "bowl" | "cup" | "juice" | "croissant" | "waffle";

export interface MenuBrunchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: MenuBrunchIcon;
  tag?: string;
}

export interface MenuBrunchSection {
  id: string;
  title: string;
  note?: string;
  icon: MenuBrunchIcon;
  items: MenuBrunchItem[];
}

export interface MenuBrunchListProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  hours?: string;
  pages?: [MenuBrunchSection[], MenuBrunchSection[]];
  defaultSelected?: string[];
  ctaLabel?: string;
  onSubmit?: (items: MenuBrunchItem[], total: number) => void;
  accent?: string;
}

const defaultPages: [MenuBrunchSection[], MenuBrunchSection[]] = [
  [
    {
      id: "eggs", title: "Eggs & Benedicts", note: "Free-range eggs from Hollow Creek Farm", icon: "egg",
      items: [
        { id: "benedict", name: "Classic Benedict", description: "Poached eggs, Canadian bacon, English muffin, chive hollandaise", price: 15, icon: "egg", tag: "Popular" },
        { id: "salmon", name: "Smoked Salmon Benny", description: "Cured salmon, capers, dill hollandaise, toasted rye", price: 18, icon: "egg" },
        { id: "shakshuka", name: "Shakshuka", description: "Two eggs baked in spiced tomato and pepper, feta, grilled bread", price: 16, icon: "bowl" },
        { id: "scramble", name: "Farmhouse Scramble", description: "Soft eggs, gruyère, chives, rosemary potatoes", price: 14, icon: "egg" },
      ],
    },
    {
      id: "griddle", title: "From the Griddle", note: "Real maple syrup, always", icon: "pancake",
      items: [
        { id: "stack", name: "Buttermilk Stack", description: "Three fluffy pancakes, whipped butter, warm maple syrup", price: 13, icon: "pancake" },
        { id: "frenchtoast", name: "Brioche French Toast", description: "Vanilla custard, macerated berries, mascarpone", price: 14.5, icon: "toast", tag: "New" },
        { id: "waffle", name: "Liège Waffle", description: "Pearl sugar, caramelized banana, sea salt caramel", price: 12, icon: "waffle" },
      ],
    },
  ],
  [
    {
      id: "toasts", title: "Toasts & Bowls", note: "Sourdough baked next door at Rise", icon: "toast",
      items: [
        { id: "avocado", name: "Avocado Toast", description: "Smashed avocado, chili flakes, lemon, shaved radish", price: 12.5, icon: "toast" },
        { id: "granola", name: "Yogurt & Granola", description: "Greek yogurt, wildflower honey, house granola, fruit", price: 9, icon: "bowl" },
        { id: "croissant", name: "Almond Croissant", description: "Twice-baked, frangipane, toasted almond flakes", price: 6, icon: "croissant" },
      ],
    },
    {
      id: "drinks", title: "Coffee & Juice", note: "Oat or almond milk at no charge", icon: "cup",
      items: [
        { id: "flatwhite", name: "Flat White", description: "Double ristretto, silky steamed whole milk", price: 4.75, icon: "cup" },
        { id: "oj", name: "Fresh Orange Juice", description: "Valencia oranges, pressed to order", price: 6, icon: "juice" },
        { id: "bloody", name: "Bloody Mary", description: "House mix, celery salt rim, pickled green bean", price: 12, icon: "juice" },
        { id: "mimosa", name: "Mimosa Carafe", description: "Prosecco and fresh orange, serves two", price: 26, icon: "juice", tag: "For two" },
      ],
    },
  ],
];

const css = `
.hb-mc4 {
  --hb-mc4-accent: #c8553d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  background: #f3ead9;
  background-image: radial-gradient(80% 50% at 50% 0%, #fbf5e9, transparent 70%);
  color: #33261b;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-mc4 *, .hb-mc4 *::before, .hb-mc4 *::after { box-sizing: border-box; }
.hb-mc4-wrap { max-width: 1120px; margin: 0 auto; padding: 68px 24px 96px; }
.hb-mc4-head { text-align: center; margin-bottom: 26px; }
.hb-mc4-eyebrow { margin: 0 0 12px; color: var(--hb-mc4-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; }
.hb-mc4-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(36px, 5.6cqw, 60px); font-weight: 500; line-height: 1; letter-spacing: -.035em; color: #2b1f15; }
.hb-mc4-hours { display: inline-flex; align-items: center; gap: 8px; margin: 14px 0 0; color: #7d6a58; font-size: 14.5px; }
.hb-mc4-ribbon { position: sticky; top: 14px; z-index: 3; display: flex; justify-content: center; margin: 0 auto -26px; pointer-events: none; }
.hb-mc4-band { pointer-events: auto; display: flex; align-items: center; gap: 16px; min-height: 52px; padding: 6px 44px 6px 46px; background: var(--hb-mc4-accent); color: #fff6ea; clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 50%, 100% 100%, 0 100%, 18px 50%); filter: drop-shadow(0 10px 14px rgba(110,50,20,.25)); max-width: 100%; }
.hb-mc4-band[data-bump="true"] { animation: hb-mc4-wiggle .5s cubic-bezier(.3,1.5,.5,1); }
@keyframes hb-mc4-wiggle { 30% { transform: rotate(-1.5deg) scale(1.03); } 60% { transform: rotate(1deg); } }
.hb-mc4-btext { font-size: 14px; white-space: nowrap; }
.hb-mc4-btext b { font-weight: 700; font-variant-numeric: tabular-nums; }
.hb-mc4-go { flex: none; height: 38px; padding: 0 18px; border: 0; border-radius: 999px; background: #fff6ea; color: #2b1f15; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: transform .15s, background .2s; }
.hb-mc4-go:hover:not(:disabled) { background: #fff; transform: translateX(2px); }
.hb-mc4-go:disabled { opacity: .7; cursor: default; }
.hb-mc4-go:focus-visible, .hb-mc4-item:focus-visible { outline: 2px solid var(--hb-mc4-accent); outline-offset: 2px; }
.hb-mc4-go:focus-visible { outline-color: #fff6ea; }
.hb-mc4-book { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); perspective: 2200px; filter: drop-shadow(0 30px 40px rgba(90,50,20,.22)); }
.hb-mc4-page { position: relative; min-width: 0; padding: 60px 44px 44px; background: #fffaf0; background-image: repeating-linear-gradient(180deg, transparent 0 31px, rgba(150,110,70,.06) 31px 32px); }
.hb-mc4-page:first-child { border-radius: 18px 4px 4px 18px; background-color: #fff8ec; box-shadow: inset -30px 0 40px -30px rgba(110,70,30,.28); transform-origin: right center; animation: hb-mc4-open 1s cubic-bezier(.2,.8,.2,1) both; }
.hb-mc4-page:last-child { border-radius: 4px 18px 18px 4px; box-shadow: inset 30px 0 40px -30px rgba(110,70,30,.24); transform-origin: left center; animation: hb-mc4-open2 1s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-mc4-open { from { transform: rotateY(28deg); opacity: .6; } }
@keyframes hb-mc4-open2 { from { transform: rotateY(-20deg); opacity: .6; } }
.hb-mc4-book::after { content: ""; position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; margin-left: -1px; background: linear-gradient(180deg, transparent, rgba(110,70,30,.25) 12%, rgba(110,70,30,.25) 88%, transparent); }
.hb-mc4-folio { position: absolute; bottom: 18px; font-size: 11.5px; color: #b09c86; letter-spacing: .1em; }
.hb-mc4-page:first-child .hb-mc4-folio { left: 44px; }
.hb-mc4-page:last-child .hb-mc4-folio { right: 44px; }
.hb-mc4-sec + .hb-mc4-sec { margin-top: 34px; }
.hb-mc4-sh { display: flex; align-items: center; gap: 12px; margin: 0 0 4px; }
.hb-mc4-sico { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: color-mix(in srgb, var(--hb-mc4-accent) 12%, #fff8ec); color: var(--hb-mc4-accent); }
.hb-mc4-stitle { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.02em; color: #2b1f15; }
.hb-mc4-snote { margin: 0 0 10px 48px; color: #9a8572; font-size: 13px; }
.hb-mc4-list { margin: 0; padding: 0; list-style: none; }
.hb-mc4-item { display: grid; grid-template-columns: 22px minmax(0, 1fr) 26px; gap: 12px; padding: 10px 8px; margin: 0 -8px; width: calc(100% + 16px); border: 0; border-radius: 12px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background .2s; }
.hb-mc4-item:hover { background: rgba(200,140,80,.08); }
.hb-mc4-item[aria-pressed="true"] { background: color-mix(in srgb, var(--hb-mc4-accent) 9%, transparent); }
.hb-mc4-iico { margin-top: 2px; color: #a08670; }
.hb-mc4-item[aria-pressed="true"] .hb-mc4-iico { color: var(--hb-mc4-accent); }
.hb-mc4-main { min-width: 0; }
.hb-mc4-row { display: flex; align-items: baseline; gap: 8px; }
.hb-mc4-name { font-size: 16px; font-weight: 600; color: #2b1f15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-mc4-tag { flex: none; padding: 1px 7px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--hb-mc4-accent) 40%, transparent); color: var(--hb-mc4-accent); font-size: 10.5px; font-weight: 600; letter-spacing: .03em; }
.hb-mc4-dots { flex: 1; min-width: 16px; border-bottom: 2px dotted #d5c2aa; transform: translateY(-4px); }
.hb-mc4-price { flex: none; font-family: var(--font-grotesk, inherit); font-size: 15.5px; font-weight: 600; font-variant-numeric: tabular-nums; color: #2b1f15; }
.hb-mc4-desc { display: block; margin-top: 3px; color: #8a7562; font-size: 13.5px; line-height: 1.45; }
.hb-mc4-check { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; border: 1.5px solid #dccab3; color: #b09c86; transition: background .2s, border-color .2s, color .2s, transform .2s; }
.hb-mc4-item:hover .hb-mc4-check { border-color: var(--hb-mc4-accent); color: var(--hb-mc4-accent); }
.hb-mc4-item[aria-pressed="true"] .hb-mc4-check { background: var(--hb-mc4-accent); border-color: var(--hb-mc4-accent); color: #fff6ea; transform: rotate(360deg); }
@container (max-width: 760px) {
  .hb-mc4-book { grid-template-columns: minmax(0, 1fr); }
  .hb-mc4-book::after { display: none; }
  .hb-mc4-page:first-child { border-radius: 18px 18px 0 0; box-shadow: none; animation-name: hb-mc4-rise; }
  .hb-mc4-page:last-child { border-radius: 0 0 18px 18px; box-shadow: none; padding-top: 12px; padding-bottom: 56px; border-top: 1px dashed #e4d4bd; animation-name: hb-mc4-rise; }
}
@keyframes hb-mc4-rise { from { opacity: 0; transform: translateY(12px); } }
@container (max-width: 520px) {
  .hb-mc4-wrap { padding: 52px 12px 64px; }
  .hb-mc4-page { padding-left: 20px; padding-right: 20px; }
  .hb-mc4-page:first-child { padding-top: 52px; }
  .hb-mc4-page:first-child .hb-mc4-folio { left: 20px; }
  .hb-mc4-page:last-child .hb-mc4-folio { right: 20px; }
  .hb-mc4-band { gap: 10px; padding: 6px 30px 6px 32px; clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 0 100%, 12px 50%); }
  .hb-mc4-hide { display: none; }
  .hb-mc4-btext { font-size: 13px; }
  .hb-mc4-go { height: 34px; padding: 0 14px; font-size: 13px; }
  .hb-mc4-snote { margin-left: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mc4 *, .hb-mc4 *::before, .hb-mc4 *::after { animation: none !important; transition: none !important; }
}
`;

function LineIcon({ name, size = 20 }: { name: MenuBrunchIcon; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "egg") return <svg {...p}><path d="M4 13c0-4 4-7 8-7 3 0 4-2 6-2 2 1 2 4 2 7 0 5-4 9-9 9-4 0-7-3-7-7z" /><circle cx="12" cy="13" r="3" /></svg>;
  if (name === "pancake") return <svg {...p}><ellipse cx="12" cy="8" rx="8" ry="2.5" /><path d="M4 8v3c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V8" /><path d="M4 11v3c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-3" /><path d="M10 8.5v2" /><path d="M3 19h18" /></svg>;
  if (name === "toast") return <svg {...p}><path d="M6 20V11a4 4 0 0 1-1-7c2-1 5-1 7-1s5 0 7 1a4 4 0 0 1-1 7v9z" /><path d="M9 13c1.5-1.5 4.5-1.5 6 0" /></svg>;
  if (name === "bowl") return <svg {...p}><path d="M3 11h18a9 9 0 0 1-18 0z" /><path d="M8 20h8" /><path d="M9 8c0-1.5 1-2 1-3M13 8c0-1.5 1-2 1-3" /></svg>;
  if (name === "cup") return <svg {...p}><path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" /><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" /><path d="M8 3c0 2 1 2 1 4M12 3c0 2 1 2 1 4" /></svg>;
  if (name === "juice") return <svg {...p}><path d="M6 6h12l-1.5 14h-9z" /><path d="M6.6 11h10.8" /><path d="M13 6l2-4h3" /></svg>;
  if (name === "croissant") return <svg {...p}><path d="M3 15c2-6 6-9 9-9s7 3 9 9c-2 1-4 1-5 0l-4-5-4 5c-1 1-3 1-5 0z" /><path d="M9 10l1.5 6M15 10l-1.5 6" /></svg>;
  return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16" /></svg>;
}

export function MenuBrunchList({
  eyebrow = "Sunday Table · Brunch menu",
  title = "Brunch, slowly.",
  hours = "Saturday and Sunday, 9 am to 3 pm",
  pages = defaultPages,
  defaultSelected = ["benedict", "flatwhite"],
  ctaLabel = "Order brunch",
  onSubmit,
  accent = "#c8553d",
  className,
  style,
  ...rest
}: MenuBrunchListProps) {
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [sent, setSent] = React.useState(false);
  const [bump, setBump] = React.useState(false);

  const all = pages.flat().flatMap((s) => s.items);
  const chosen = all.filter((it) => selected.includes(it.id));
  const total = chosen.reduce((n, it) => n + it.price, 0);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    setSent(false);
    setBump(false);
    requestAnimationFrame(() => setBump(true));
  };

  const submit = () => {
    setSent(true);
    onSubmit?.(chosen, total);
  };

  return (
    <section
      className={["hb-mc4", className].filter(Boolean).join(" ")}
      style={{ "--hb-mc4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-brunch-list" precedence="default">{css}</style>
      <div className="hb-mc4-wrap">
        <header className="hb-mc4-head">
          <p className="hb-mc4-eyebrow">{eyebrow}</p>
          <h2 className="hb-mc4-title">{title}</h2>
          <p className="hb-mc4-hours">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {hours}
          </p>
        </header>
        <div className="hb-mc4-ribbon">
          <div className="hb-mc4-band" data-bump={bump || undefined} onAnimationEnd={() => setBump(false)}>
            <span className="hb-mc4-btext" aria-live="polite">
              {sent ? (
                <>Order placed · ready in about <b>15 min</b></>
              ) : chosen.length ? (
                <><b>{chosen.length}</b> {chosen.length === 1 ? "item" : "items"}<span className="hb-mc4-hide"> picked</span> · <b>${total.toFixed(2)}</b></>
              ) : (
                <>Tap a dish to start<span className="hb-mc4-hide"> your order</span></>
              )}
            </span>
            <button type="button" className="hb-mc4-go" disabled={!chosen.length || sent} onClick={submit}>
              {sent ? "Sent" : ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {sent ? (
                  <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className="hb-mc4-book">
          {pages.map((page, pi) => (
            <div key={pi} className="hb-mc4-page">
              {page.map((sec) => (
                <div key={sec.id} className="hb-mc4-sec">
                  <div className="hb-mc4-sh">
                    <span className="hb-mc4-sico"><LineIcon name={sec.icon} size={18} /></span>
                    <h3 className="hb-mc4-stitle">{sec.title}</h3>
                  </div>
                  {sec.note ? <p className="hb-mc4-snote">{sec.note}</p> : null}
                  <ul className="hb-mc4-list">
                    {sec.items.map((it) => {
                      const on = selected.includes(it.id);
                      return (
                        <li key={it.id}>
                          <button type="button" className="hb-mc4-item" aria-pressed={on} onClick={() => toggle(it.id)}>
                            <span className="hb-mc4-iico"><LineIcon name={it.icon} /></span>
                            <span className="hb-mc4-main">
                              <span className="hb-mc4-row">
                                <span className="hb-mc4-name">{it.name}</span>
                                {it.tag ? <span className="hb-mc4-tag">{it.tag}</span> : null}
                                <span className="hb-mc4-dots" aria-hidden="true" />
                                <span className="hb-mc4-price">{Number.isInteger(it.price) ? it.price.toFixed(0) : it.price.toFixed(2)}</span>
                              </span>
                              <span className="hb-mc4-desc">{it.description}</span>
                            </span>
                            <span className="hb-mc4-check" aria-hidden="true">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                {on ? (
                                  <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                ) : (
                                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                )}
                              </svg>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <span className="hb-mc4-folio" aria-hidden="true">{pi === 0 ? "— 1 —" : "— 2 —"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

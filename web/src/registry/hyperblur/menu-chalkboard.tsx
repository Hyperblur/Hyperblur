"use client";

import * as React from "react";

export type MenuChalkTag = "vegetarian" | "vegan" | "gluten-free" | "spicy" | "new";

export interface MenuChalkItem {
  name: string;
  description?: string;
  price: string;
  tags?: MenuChalkTag[];
}

export interface MenuChalkSection {
  title: string;
  note?: string;
  items: MenuChalkItem[];
}

export interface MenuChalkSpecial {
  label: string;
  name: string;
  description: string;
  price: string;
  note?: string;
}

export interface MenuChalkboardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  venue?: string;
  title?: string;
  note?: string;
  sections?: MenuChalkSection[];
  special?: MenuChalkSpecial | null;
  footnote?: string;
  accent?: string;
}

const defaultSections: MenuChalkSection[] = [
  {
    title: "Small plates",
    note: "To share, or not",
    items: [
      { name: "Warm olives", description: "Orange zest, fennel seed, thyme", price: "6", tags: ["vegan", "gluten-free"] },
      { name: "Gougères", description: "Five, with Comté and black pepper", price: "8", tags: ["vegetarian"] },
      { name: "Chicken liver mousse", description: "Port jelly, cornichons, grilled bread", price: "11" },
      { name: "Leeks vinaigrette", description: "Soft egg, toasted hazelnut, chervil", price: "10", tags: ["vegetarian", "gluten-free"] },
    ],
  },
  {
    title: "Soups & salads",
    items: [
      { name: "French onion soup", description: "Beef broth, gruyère crouton", price: "12" },
      { name: "Little gem", description: "Buttermilk, radish, chives, crispy shallot", price: "11", tags: ["vegetarian"] },
      { name: "Lentils du Puy", description: "Whipped goat cheese, roast beet, walnut", price: "13", tags: ["new"] },
    ],
  },
  {
    title: "Mains",
    note: "Frites or green salad on the side",
    items: [
      { name: "Steak frites", description: "8 oz bavette, béarnaise, watercress", price: "29" },
      { name: "Moules marinières", description: "White wine, shallot, parsley, frites", price: "24", tags: ["gluten-free"] },
      { name: "Duck leg confit", description: "White beans, garlic sausage, cherry jus", price: "27" },
      { name: "Mushroom bourguignon", description: "Red wine, pearl onions, pommes purée", price: "21", tags: ["vegetarian"] },
      { name: "Merguez and harissa", description: "Lamb sausage, couscous, preserved lemon", price: "22", tags: ["spicy"] },
    ],
  },
  {
    title: "Sweets",
    items: [
      { name: "Crème caramel", price: "9", tags: ["gluten-free"] },
      { name: "Chocolate mousse", description: "Sea salt, olive oil", price: "9" },
      { name: "Tarte Tatin for two", description: "Crème fraîche, cooked to order", price: "16" },
    ],
  },
];

const defaultSpecial: MenuChalkSpecial = {
  label: "Today's special",
  name: "Bouillabaisse",
  description: "Saffron fish stew with mussels, prawns and monkfish, rouille and grilled country bread.",
  price: "32",
  note: "Only 14 bowls, then it's gone",
};

const tagLabels: Record<MenuChalkTag, string> = { vegetarian: "V", vegan: "VG", "gluten-free": "GF", spicy: "Hot", new: "New" };
const tagNames: Record<MenuChalkTag, string> = { vegetarian: "Vegetarian", vegan: "Vegan", "gluten-free": "Gluten-free", spicy: "Spicy", new: "New" };

const css = `
.hb-ma3 {
  --hb-ma3-accent: #f2d16b;
  --hb-ma3-chalk: #ece8dc;
  --hb-ma3-dim: rgba(236, 232, 220, .62);
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  background: #17120d;
  background-image: radial-gradient(800px 400px at 50% 0%, rgba(255, 210, 140, .1), transparent 70%), repeating-linear-gradient(90deg, rgba(255, 255, 255, .015) 0 2px, transparent 2px 80px);
  color: var(--hb-ma3-chalk);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-ma3 *, .hb-ma3 *::before, .hb-ma3 *::after { box-sizing: border-box; }
.hb-ma3 em, .hb-ma3 i, .hb-ma3 cite { font-style: normal; }
.hb-ma3-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.hb-ma3-wrap { max-width: 1120px; margin: 0 auto; padding: 40px 24px 72px; }
.hb-ma3-frame { padding: 14px; border-radius: 10px; background: linear-gradient(135deg, #7a4f2c, #5a3519 30%, #8a5a33 55%, #4e2d14 80%, #6d4423); box-shadow: inset 0 1px 0 rgba(255, 220, 170, .35), inset 0 -2px 0 rgba(0, 0, 0, .35), 0 40px 80px -30px rgba(0, 0, 0, .8); }
.hb-ma3-board {
  position: relative;
  overflow: hidden;
  padding: 42px 48px 36px;
  border-radius: 4px;
  background-color: #1d2622;
  background-image:
    radial-gradient(420px 220px at 18% 22%, rgba(255, 255, 255, .055), transparent 70%),
    radial-gradient(360px 200px at 82% 70%, rgba(255, 255, 255, .045), transparent 70%),
    radial-gradient(300px 120px at 60% 10%, rgba(255, 255, 255, .03), transparent 70%),
    repeating-linear-gradient(-12deg, rgba(255, 255, 255, .012) 0 3px, transparent 3px 9px);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .5), inset 0 0 60px rgba(0, 0, 0, .55);
}
.hb-ma3-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 330px); gap: 32px 48px; align-items: center; margin-bottom: 34px; }
.hb-ma3-venue { margin: 0 0 12px; color: var(--hb-ma3-accent); font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 13px; font-weight: 500; letter-spacing: .38em; text-transform: uppercase; opacity: .9; }
.hb-ma3-title { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: clamp(34px, 5.6cqw, 58px); font-weight: 500; line-height: 1; letter-spacing: .06em; text-transform: uppercase; color: var(--hb-ma3-chalk); text-shadow: 0 0 1px rgba(255, 255, 255, .55), 0 0 14px rgba(255, 255, 255, .08); }
.hb-ma3-swash { display: block; width: min(320px, 70%); height: 16px; margin-top: 10px; color: var(--hb-ma3-accent); opacity: .85; }
.hb-ma3-note { margin: 12px 0 0; color: var(--hb-ma3-dim); font-size: 14px; letter-spacing: .04em; }
.hb-ma3-special { position: relative; padding: 22px 24px 20px; border: 2px dashed rgba(242, 209, 107, .7); border-radius: 14px; transform: rotate(-1.4deg); background: rgba(242, 209, 107, .04); overflow: hidden; }
.hb-ma3-special::after { content: ""; position: absolute; inset: -20%; background: linear-gradient(105deg, transparent 42%, rgba(255, 255, 255, .13) 50%, transparent 58%); background-size: 260% 100%; animation: hb-ma3-shimmer 5.5s ease-in-out infinite; pointer-events: none; }
@keyframes hb-ma3-shimmer { 0% { background-position: 130% 0; } 55%, 100% { background-position: -40% 0; } }
.hb-ma3-slabel { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 10px; color: var(--hb-ma3-accent); font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 12px; font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
.hb-ma3-slabel svg { width: 16px; height: 16px; }
.hb-ma3-srow { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-ma3-sname { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 28px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; text-shadow: 0 0 1px rgba(255, 255, 255, .5); }
.hb-ma3-sprice { color: var(--hb-ma3-accent); font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 30px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ma3-sdesc { margin: 8px 0 0; color: var(--hb-ma3-dim); font-size: 13.5px; line-height: 1.5; }
.hb-ma3-snote { display: inline-block; margin-top: 12px; padding-bottom: 2px; border-bottom: 1.5px solid rgba(244, 167, 185, .7); color: #f4a7b9; font-size: 12.5px; font-weight: 600; letter-spacing: .04em; }
.hb-ma3-cols { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 64px; }
.hb-ma3-cols::before { content: ""; position: absolute; left: 50%; top: 6px; bottom: 6px; width: 0; border-left: 2px dotted rgba(236, 232, 220, .22); }
.hb-ma3-col { min-width: 0; }
.hb-ma3-sec + .hb-ma3-sec { margin-top: 30px; }
.hb-ma3-sec-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 0 6px; padding-bottom: 8px; border-bottom: 1.5px solid rgba(236, 232, 220, .28); }
.hb-ma3-sec-title { margin: 0; color: var(--hb-ma3-accent); font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 17px; font-weight: 600; letter-spacing: .3em; text-transform: uppercase; }
.hb-ma3-sec-note { color: var(--hb-ma3-dim); font-size: 12px; letter-spacing: .03em; text-align: right; }
.hb-ma3-list { margin: 0; padding: 0; list-style: none; }
.hb-ma3-item { padding: 10px 0; }
.hb-ma3-row { display: flex; align-items: baseline; gap: 10px; }
.hb-ma3-name { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 17px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; text-shadow: 0 0 1px rgba(255, 255, 255, .45); transition: color .25s; }
.hb-ma3-leader { flex: 1; min-width: 24px; height: 4px; background-image: radial-gradient(circle, rgba(236, 232, 220, .55) 1.1px, transparent 1.5px); background-size: 8px 4px; background-repeat: repeat-x; transition: opacity .25s; opacity: .8; }
.hb-ma3-price { color: var(--hb-ma3-chalk); font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 18px; font-weight: 600; font-variant-numeric: tabular-nums; text-shadow: 0 0 1px rgba(255, 255, 255, .5); }
.hb-ma3-desc { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 3px 0 0; color: var(--hb-ma3-dim); font-size: 13px; line-height: 1.45; }
.hb-ma3-tag { display: inline-flex; align-items: center; gap: 3px; height: 18px; padding: 0 6px 0 4px; border: 1.2px solid rgba(236, 232, 220, .45); border-radius: 999px; color: var(--hb-ma3-chalk); font-size: 9.5px; font-weight: 700; letter-spacing: .08em; }
.hb-ma3-tag svg { width: 10px; height: 10px; }
.hb-ma3-tag[data-tag="spicy"] { border-color: rgba(255, 138, 107, .7); color: #ff9c80; }
.hb-ma3-tag[data-tag="new"] { border-color: rgba(127, 200, 255, .7); color: #9fd4ff; }
.hb-ma3-tag[data-tag="vegan"], .hb-ma3-tag[data-tag="vegetarian"], .hb-ma3-tag[data-tag="gluten-free"] { border-color: rgba(150, 220, 150, .6); color: #b4e6b0; }
.hb-ma3-item:hover .hb-ma3-name { color: var(--hb-ma3-accent); }
.hb-ma3-item:hover .hb-ma3-leader { opacity: 1; }
.hb-ma3-foot { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 30px; padding-top: 18px; border-top: 1.5px dashed rgba(236, 232, 220, .2); }
.hb-ma3-foot p { margin: 0; max-width: 520px; color: var(--hb-ma3-dim); font-size: 12.5px; line-height: 1.5; }
.hb-ma3-doodles { display: flex; gap: 18px; color: var(--hb-ma3-chalk); opacity: .7; }
.hb-ma3-doodles svg { width: 38px; height: 38px; }
.hb-ma3-ledge { height: 14px; margin: 0 24px; border-radius: 0 0 6px 6px; background: linear-gradient(180deg, #5a3519, #3a200c); box-shadow: 0 10px 20px -8px rgba(0, 0, 0, .7); position: relative; }
.hb-ma3-ledge::before { content: ""; position: absolute; left: 14%; top: -5px; width: 46px; height: 9px; border-radius: 3px; background: linear-gradient(180deg, #fbf8ef, #d9d4c6); transform: rotate(-4deg); }
.hb-ma3-ledge::after { content: ""; position: absolute; left: calc(14% + 60px); top: -4px; width: 30px; height: 8px; border-radius: 3px; background: linear-gradient(180deg, #f7e18e, #cdb35a); transform: rotate(6deg); }
@container (max-width: 820px) {
  .hb-ma3-top { grid-template-columns: minmax(0, 1fr); }
  .hb-ma3-special { max-width: 420px; }
  .hb-ma3-board { padding: 32px 28px 28px; }
  .hb-ma3-cols { gap: 0 36px; }
}
@container (max-width: 640px) {
  .hb-ma3-wrap { padding: 28px 12px 48px; }
  .hb-ma3-frame { padding: 9px; }
  .hb-ma3-board { padding: 26px 18px 22px; }
  .hb-ma3-cols { grid-template-columns: minmax(0, 1fr); }
  .hb-ma3-cols::before { display: none; }
  .hb-ma3-col + .hb-ma3-col { margin-top: 30px; }
  .hb-ma3-special { transform: none; }
  .hb-ma3-foot { flex-direction: column; align-items: flex-start; }
  .hb-ma3-name { font-size: 15px; letter-spacing: .03em; }
  .hb-ma3-sec-title { letter-spacing: .2em; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ma3 *, .hb-ma3 *::before, .hb-ma3 *::after { animation: none !important; transition: none !important; }
}
`;

function TagIcon({ tag }: { tag: MenuChalkTag }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (tag === "spicy") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M10 6c6 0 9 5 9 9 0 3-3 5-6 3-4-2-8-5-7-9 .4-2 2-3 4-3zM10 6c0-2 1.5-3 3-2.5" /></svg>;
  if (tag === "new") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></svg>;
  if (tag === "gluten-free") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 4v16M12 8l-3-2M12 8l3-2M12 12l-3-2M12 12l3-2M12 16l-3-2M12 16l3-2M4 4l16 16" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7" /></svg>;
}

const chalkStroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function MenuChalkboard({
  venue = "Le Petit Comptoir",
  title = "On the board today",
  note = "Thursday · Lunch 11:30 to 3 · Dinner 5:30 to 10",
  sections = defaultSections,
  special = defaultSpecial,
  footnote = "Please tell us about any allergies. Bread from Ostro Bakery, butter from Hudson Valley, coffee roasted on Atlantic Ave.",
  accent = "#f2d16b",
  className,
  style,
  ...rest
}: MenuChalkboardProps) {
  const uid = React.useId();
  const sid = `hbma3${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const half = Math.ceil(sections.length / 2);
  const columns = [sections.slice(0, half), sections.slice(half)];
  const chalk = { filter: `url(#${sid}-rough)` };

  return (
    <section className={["hb-ma3", className].filter(Boolean).join(" ")} style={{ "--hb-ma3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-menu-chalkboard" precedence="default">{css}</style>
      <svg className="hb-ma3-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id={`${sid}-rough`} x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="hb-ma3-wrap">
        <div className="hb-ma3-frame">
          <div className="hb-ma3-board">
            <div className="hb-ma3-top">
              <div>
                <p className="hb-ma3-venue">{venue}</p>
                <h2 className="hb-ma3-title" style={chalk}>{title}</h2>
                <svg className="hb-ma3-swash" viewBox="0 0 320 16" preserveAspectRatio="none" aria-hidden="true">
                  <path {...chalkStroke} strokeWidth="2.4" d="M3 10c40-6 80-7 120-4s90 5 130 0 50-4 64-2" />
                  <path {...chalkStroke} strokeWidth="1.4" opacity=".6" d="M40 14c50-3 120-4 200-2" />
                </svg>
                {note ? <p className="hb-ma3-note">{note}</p> : null}
              </div>
              {special ? (
                <aside className="hb-ma3-special" aria-label={special.label}>
                  <p className="hb-ma3-slabel">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path {...chalkStroke} d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" /></svg>
                    {special.label}
                  </p>
                  <div className="hb-ma3-srow">
                    <h3 className="hb-ma3-sname" style={chalk}>{special.name}</h3>
                    <span className="hb-ma3-sprice" style={chalk}>{special.price}</span>
                  </div>
                  <p className="hb-ma3-sdesc">{special.description}</p>
                  {special.note ? <span className="hb-ma3-snote">{special.note}</span> : null}
                </aside>
              ) : null}
            </div>

            <div className="hb-ma3-cols">
              {columns.map((col, ci) => (
                <div className="hb-ma3-col" key={ci}>
                  {col.map((sec) => (
                    <div className="hb-ma3-sec" key={sec.title}>
                      <div className="hb-ma3-sec-head">
                        <h3 className="hb-ma3-sec-title" style={chalk}>{sec.title}</h3>
                        {sec.note ? <span className="hb-ma3-sec-note">{sec.note}</span> : null}
                      </div>
                      <ul className="hb-ma3-list">
                        {sec.items.map((it) => (
                          <li className="hb-ma3-item" key={it.name}>
                            <div className="hb-ma3-row">
                              <span className="hb-ma3-name">{it.name}</span>
                              <span className="hb-ma3-leader" aria-hidden="true" />
                              <span className="hb-ma3-price" aria-label={`$${it.price}`}>{it.price}</span>
                            </div>
                            {it.description || it.tags?.length ? (
                              <p className="hb-ma3-desc">
                                {it.description ? <span>{it.description}</span> : null}
                                {it.tags?.map((t) => (
                                  <span key={t} className="hb-ma3-tag" data-tag={t} title={tagNames[t]} aria-label={tagNames[t]}>
                                    <TagIcon tag={t} />
                                    {tagLabels[t]}
                                  </span>
                                ))}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="hb-ma3-foot">
              {footnote ? <p>{footnote}</p> : <span />}
              <div className="hb-ma3-doodles" aria-hidden="true">
                <svg viewBox="0 0 40 40"><path {...chalkStroke} d="M12 6h16c0 8-3 13-8 13s-8-5-8-13zM20 19v13M13 33h14M13 11h14" /></svg>
                <svg viewBox="0 0 40 40"><path {...chalkStroke} d="M8 18h20v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8zM28 20h3a3 3 0 0 1 0 6h-3M14 13c-2-2 2-4 0-7M20 13c-2-2 2-4 0-7" /></svg>
                <svg viewBox="0 0 40 40"><path {...chalkStroke} d="M6 20c6-8 16-10 24-2l5-5v14l-5-5c-8 8-18 6-24-2zM13 18.5h.5" /></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="hb-ma3-ledge" aria-hidden="true" />
      </div>
    </section>
  );
}

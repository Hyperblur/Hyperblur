"use client";

import * as React from "react";

export interface LocalMenuDish {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface LocalMenuSection {
  id: string;
  label: string;
  note?: string;
  dishes: LocalMenuDish[];
  featured?: LocalMenuDish;
}

export interface LocalMenuBoardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  sections?: LocalMenuSection[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultSections: LocalMenuSection[] = [
  {
    id: "starters",
    label: "Starters",
    note: "Served from 5 pm",
    dishes: [
      { name: "Charred leeks", description: "Romesco, toasted hazelnut, aged sherry vinegar", price: "14", tags: ["V"] },
      { name: "Burrata and stone fruit", description: "Grilled peach, basil oil, Maldon salt, sourdough", price: "18", tags: ["V"] },
      { name: "Crispy squid", description: "Lemon aioli, pickled chili, fennel pollen", price: "16" },
      { name: "Beef tartare", description: "Smoked egg yolk, capers, shallot, potato crisps", price: "19" },
    ],
    featured: { name: "Wood-fired flatbread", description: "Whipped ricotta, hot honey, Calabrian chili and wild oregano, baked to order in our oak oven.", price: "15", tags: ["Chef's pick"] },
  },
  {
    id: "mains",
    label: "Mains",
    note: "All mains come with house focaccia",
    dishes: [
      { name: "Hand-cut pappardelle", description: "Slow-braised short rib ragu, parmigiano, gremolata", price: "29" },
      { name: "Half roast chicken", description: "Salsa verde, charred lemon, crispy potatoes", price: "32" },
      { name: "Market fish", description: "Brown butter, capers, spring peas, mint", price: "36" },
      { name: "Wild mushroom risotto", description: "Carnaroli rice, thyme, pecorino, truffle oil", price: "27", tags: ["V"] },
    ],
    featured: { name: "Dry-aged ribeye for two", description: "Twenty-eight day aged, grilled over oak, with bone marrow butter and a crisp leaf salad.", price: "96", tags: ["For sharing"] },
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "Made in house every morning",
    dishes: [
      { name: "Olive oil cake", description: "Blood orange, crème fraîche, pistachio", price: "12", tags: ["V"] },
      { name: "Dark chocolate pot", description: "Sea salt caramel, cocoa nib tuile", price: "13", tags: ["GF"] },
      { name: "Affogato", description: "Fior di latte gelato, double espresso", price: "9" },
      { name: "Cheese plate", description: "Three local cheeses, quince paste, oat crackers", price: "18" },
    ],
    featured: { name: "Basque cheesecake", description: "Burnt on top, barely set in the middle, served with macerated cherries and a spoon of cream.", price: "13", tags: ["Most ordered"] },
  },
  {
    id: "drinks",
    label: "Drinks",
    note: "Ask about our natural wine list",
    dishes: [
      { name: "Terracotta spritz", description: "Aperitivo, blood orange, prosecco, soda", price: "14" },
      { name: "Smoked negroni", description: "Gin, vermouth, bitter, oak smoke", price: "16" },
      { name: "House red, by the glass", description: "Montepulciano d'Abruzzo, juicy and soft", price: "12" },
      { name: "Sparkling lemonade", description: "Meyer lemon, rosemary, sparkling water", price: "7", tags: ["0%"] },
    ],
    featured: { name: "Bottle of the week", description: "A skin-contact Ribolla Gialla from Friuli, amber and bright, chosen by our sommelier Lucia.", price: "58", tags: ["Limited"] },
  },
];

const css = `
.hb-kl2 {
  --hb-kl2-accent: #c4572f;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  background: #f6efe3;
  background-image: radial-gradient(rgba(120, 72, 40, .07) 1px, transparent 1px);
  background-size: 18px 18px;
  color: #2d1e15;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl2 *, .hb-kl2 *::before, .hb-kl2 *::after { box-sizing: border-box; }
.hb-kl2-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 100px; }
.hb-kl2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 36px; flex-wrap: wrap; }
.hb-kl2-eyebrow { margin: 0 0 12px; color: var(--hb-kl2-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; }
.hb-kl2-title { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: clamp(40px, 6cqw, 68px); line-height: .98; letter-spacing: -.02em; color: #2a1a10; }
.hb-kl2-title em { font-style: normal; color: var(--hb-kl2-accent); }
.hb-kl2-sub { margin: 14px 0 0; max-width: 420px; color: #6e5646; font-size: 16px; line-height: 1.6; }
.hb-kl2-tabs { display: inline-flex; padding: 5px; gap: 4px; border-radius: 999px; background: #efe4d3; border: 1px solid #e3d3bc; max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.hb-kl2-tab {
  position: relative;
  flex: none;
  padding: 10px 18px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #7a6150;
  font: inherit;
  font-size: 14.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background .25s, color .25s, box-shadow .25s;
}
.hb-kl2-tab:hover { color: #2d1e15; }
.hb-kl2-tab[aria-selected="true"] { background: #fffaf1; color: #2d1e15; box-shadow: 0 1px 2px rgba(80, 40, 10, .12), 0 6px 14px -8px rgba(80, 40, 10, .3); }
.hb-kl2-tab:focus-visible, .hb-kl2-cta:focus-visible { outline: 2px solid var(--hb-kl2-accent); outline-offset: 2px; }
.hb-kl2-body { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .9fr); gap: 40px; align-items: start; }
.hb-kl2-panel { min-width: 0; }
.hb-kl2-note { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; color: #8a705e; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 17px; }
.hb-kl2-note::after { content: ""; flex: 1; height: 1px; background: #e0cfb7; }
.hb-kl2-list { margin: 0; padding: 0; list-style: none; }
.hb-kl2-item { padding: 18px 0; border-bottom: 1px solid #e8dac6; animation: hb-kl2-in .55s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-kl2-i) * 70ms); }
@keyframes hb-kl2-in { from { opacity: 0; transform: translateY(10px); } }
.hb-kl2-row { display: flex; align-items: baseline; gap: 10px; }
.hb-kl2-name { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 23px; line-height: 1.2; color: #2a1a10; }
.hb-kl2-tag { display: inline-block; margin-left: 8px; padding: 1px 7px; border: 1px solid #d9c3a6; border-radius: 999px; color: #8a6a4f; font-family: inherit; font-size: 10.5px; font-weight: 600; letter-spacing: .04em; vertical-align: 4px; }
.hb-kl2-leader { flex: 1; min-width: 20px; border-bottom: 2px dotted #cdb79b; transform: translateY(-5px); }
.hb-kl2-price { font-variant-numeric: tabular-nums; font-size: 17px; font-weight: 600; color: #2a1a10; }
.hb-kl2-price small { color: var(--hb-kl2-accent); font-size: 13px; margin-right: 1px; }
.hb-kl2-desc { margin: 4px 0 0; color: #7a6150; font-size: 14.5px; line-height: 1.5; }
.hb-kl2-feature {
  position: relative;
  min-width: 0;
  padding: 28px;
  border-radius: 28px;
  background: linear-gradient(160deg, #fffaf1 0%, #f9ecd9 100%);
  border: 1px solid #ead8bf;
  box-shadow: 0 30px 60px -36px rgba(110, 50, 20, .45);
  overflow: hidden;
  animation: hb-kl2-in .6s cubic-bezier(.2,.8,.2,1) both;
}
.hb-kl2-plate { display: block; width: 100%; max-width: 300px; margin: 0 auto 6px; aspect-ratio: 1; }
.hb-kl2-spin { transform-origin: 120px 120px; animation: hb-kl2-turn 40s linear infinite; }
@keyframes hb-kl2-turn { to { transform: rotate(360deg); } }
.hb-kl2-ribbon { display: inline-block; margin-bottom: 10px; padding: 5px 12px; border-radius: 999px; background: var(--hb-kl2-accent); color: #fff8ef; font-size: 11.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-kl2-fname { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: 30px; line-height: 1.1; color: #2a1a10; }
.hb-kl2-fdesc { margin: 10px 0 0; color: #6e5646; font-size: 15px; line-height: 1.55; }
.hb-kl2-ffoot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; }
.hb-kl2-fprice { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 34px; color: var(--hb-kl2-accent); }
.hb-kl2-cta { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: #2a1a10; color: #fff8ef; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; }
.hb-kl2-cta:hover { background: var(--hb-kl2-accent); transform: translateY(-1px); }
@container (max-width: 820px) {
  .hb-kl2-body { grid-template-columns: minmax(0, 1fr); }
  .hb-kl2-wrap { padding: 64px 20px 72px; }
}
@container (max-width: 420px) {
  .hb-kl2-name { font-size: 20px; }
  .hb-kl2-feature { padding: 20px; }
  .hb-kl2-tab { padding: 9px 13px; font-size: 13.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl2 *, .hb-kl2 *::before, .hb-kl2 *::after { animation: none !important; transition: none !important; }
}
`;

function Plate({ accent }: { accent: string }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    const r = 34 + ((i * 37) % 13);
    return { x: (120 + Math.cos(a) * r).toFixed(2), y: (120 + Math.sin(a) * r).toFixed(2), rot: ((a * 180) / Math.PI).toFixed(1) };
  });
  return (
    <svg className="hb-kl2-plate" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <radialGradient id="hb-kl2-rim" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f3e6d3" />
          <stop offset="100%" stopColor="#e2cdb0" />
        </radialGradient>
      </defs>
      <ellipse cx="124" cy="132" rx="100" ry="96" fill="rgba(90,45,15,.12)" />
      <circle cx="120" cy="120" r="100" fill="url(#hb-kl2-rim)" stroke="#e5d2b8" />
      <circle cx="120" cy="120" r="74" fill="#fffaf2" stroke="#efe0ca" />
      <g className="hb-kl2-spin">
        <circle cx="120" cy="120" r="88" fill="none" stroke={accent} strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="120" cy="120" r="46" fill={accent} fillOpacity=".16" />
        <path d="M84 126c10-26 62-34 74-4-10 22-60 28-74 4z" fill={accent} fillOpacity=".85" />
        <path d="M92 124c14-12 42-14 58-2" stroke="#fff4e6" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
        <circle cx="104" cy="104" r="7" fill="#f2c94c" />
        <circle cx="140" cy="140" r="5" fill="#f2c94c" opacity=".85" />
        {leaves.map((l, i) => (
          <ellipse key={i} cx={l.x} cy={l.y} rx="6" ry="2.6" fill="#5f7d3a" transform={`rotate(${l.rot} ${l.x} ${l.y})`} opacity={i % 2 ? 0.75 : 1} />
        ))}
      </g>
    </svg>
  );
}

export function LocalMenuBoard({
  eyebrow = "Osteria Rosa · Carroll Gardens",
  title = "Tonight's menu",
  subtitle = "Seasonal Italian cooking over an oak fire. Our menu changes with the market, so ask what came in this morning.",
  sections = defaultSections,
  value,
  defaultValue,
  onChange,
  cta = { label: "Reserve a table", href: "#reserve" },
  accent = "#c4572f",
  className,
  style,
  ...rest
}: LocalMenuBoardProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? sections[0]?.id ?? "");
  const current = value ?? inner;
  const active = sections.find((s) => s.id === current) ?? sections[0];
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  const onKey = (event: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % sections.length;
    if (event.key === "ArrowLeft") next = (index - 1 + sections.length) % sections.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = sections.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(sections[next].id);
    tabRefs.current[next]?.focus();
  };

  const words = title.split(" ");
  const last = words.pop();

  return (
    <section
      className={["hb-kl2", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-menu-board" precedence="default">{css}</style>
      <div className="hb-kl2-wrap">
        <div className="hb-kl2-head">
          <div>
            <p className="hb-kl2-eyebrow">{eyebrow}</p>
            <h2 className="hb-kl2-title">{words.join(" ")} <em>{last}</em></h2>
            <p className="hb-kl2-sub">{subtitle}</p>
          </div>
          <div className="hb-kl2-tabs" role="tablist" aria-label="Menu sections">
            {sections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${uid}-tab-${s.id}`}
                aria-controls={`${uid}-panel`}
                aria-selected={s.id === active?.id}
                tabIndex={s.id === active?.id ? 0 : -1}
                className="hb-kl2-tab"
                onClick={() => select(s.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {active ? (
          <div className="hb-kl2-body" key={active.id}>
            <div className="hb-kl2-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active.id}`}>
              {active.note ? <p className="hb-kl2-note">{active.note}</p> : null}
              <ul className="hb-kl2-list">
                {active.dishes.map((d, i) => (
                  <li key={d.name} className="hb-kl2-item" style={{ "--hb-kl2-i": i } as React.CSSProperties}>
                    <div className="hb-kl2-row">
                      <span className="hb-kl2-name">
                        {d.name}
                        {d.tags?.map((t) => <span key={t} className="hb-kl2-tag">{t}</span>)}
                      </span>
                      <span className="hb-kl2-leader" aria-hidden="true" />
                      <span className="hb-kl2-price"><small>$</small>{d.price}</span>
                    </div>
                    <p className="hb-kl2-desc">{d.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            {active.featured ? (
              <aside className="hb-kl2-feature" aria-label="Featured dish">
                <Plate accent={accent} />
                {active.featured.tags?.[0] ? <span className="hb-kl2-ribbon">{active.featured.tags[0]}</span> : null}
                <h3 className="hb-kl2-fname">{active.featured.name}</h3>
                <p className="hb-kl2-fdesc">{active.featured.description}</p>
                <div className="hb-kl2-ffoot">
                  <span className="hb-kl2-fprice">${active.featured.price}</span>
                  {cta ? (
                    <a className="hb-kl2-cta" href={cta.href}>
                      {cta.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </aside>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

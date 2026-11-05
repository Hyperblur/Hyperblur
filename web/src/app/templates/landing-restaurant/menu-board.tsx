"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type Dish = { name: string; desc: string; price: string; tags?: string[] };

const tabs: { id: string; label: string; note: string; dishes: Dish[] }[] = [
  {
    id: "small",
    label: "Small plates",
    note: "To share, two or three per person",
    dishes: [
      { name: "Hearth sourdough", desc: "Cultured butter, Sicilian olive oil, flaky salt", price: "9", tags: ["V"] },
      { name: "Smoked labneh", desc: "Za'atar, charred spring onion, warm flatbread", price: "14", tags: ["V"] },
      { name: "Grilled halloumi", desc: "Burnt honey, pickled kumquat, mint", price: "16", tags: ["V", "GF"] },
      { name: "Charred octopus", desc: "Smoked paprika, crushed potatoes, caper salsa", price: "24", tags: ["GF"] },
      { name: "Fire-blistered peppers", desc: "Padrón and shishito, lemon, sea salt", price: "12", tags: ["VG", "GF"] },
    ],
  },
  {
    id: "fire",
    label: "From the fire",
    note: "Cooked over oak and almond wood",
    dishes: [
      { name: "Whole dorade", desc: "Charred lemon, salsa verde, fennel salad", price: "38", tags: ["GF"] },
      { name: "Lamb shoulder", desc: "Seven hours in the embers, pomegranate, herbs", price: "46", tags: ["GF"] },
      { name: "Half chicken", desc: "Toum, sumac onions, grilled bread", price: "32" },
      { name: "Ember-roasted carrots", desc: "Carrot-top harissa, whipped feta, dukkah", price: "18", tags: ["V"] },
      { name: "Dry-aged ribeye, 24 oz", desc: "For two. Bone marrow butter, chicories", price: "98", tags: ["GF"] },
    ],
  },
  {
    id: "grains",
    label: "Pasta & grains",
    note: "Made in house every afternoon",
    dishes: [
      { name: "Saffron rice", desc: "Clams, chorizo, crispy socarrat", price: "29" },
      { name: "Hand-cut pappardelle", desc: "Slow-braised rabbit, green olives, thyme", price: "27" },
      { name: "Freekeh salad", desc: "Roasted squash, herbs, pistachio, molasses", price: "17", tags: ["VG"] },
      { name: "Burnt-butter gnocchi", desc: "Sage, chestnut, aged pecorino", price: "24", tags: ["V"] },
    ],
  },
  {
    id: "sweets",
    label: "Sweets",
    note: "Ask about the dessert wines",
    dishes: [
      { name: "Burnt honey tart", desc: "Brown butter crust, crème fraîche", price: "13", tags: ["V"] },
      { name: "Olive oil cake", desc: "Blood orange, pistachio, cardamom cream", price: "12", tags: ["V"] },
      { name: "Grilled stone fruit", desc: "Labneh ice cream, rose, sesame brittle", price: "14", tags: ["V", "GF"] },
      { name: "Dark chocolate mousse", desc: "Smoked sea salt, extra virgin olive oil", price: "11", tags: ["VG", "GF"] },
    ],
  },
  {
    id: "wine",
    label: "Wine",
    note: "By the glass, 150 ml",
    dishes: [
      { name: "Frappato, Sicily", desc: "Chilled red, wild strawberry, a little salt", price: "15" },
      { name: "Assyrtiko, Santorini", desc: "Volcanic, lemon zest, sea spray", price: "17" },
      { name: "Skin-contact Malvasia", desc: "Amber, apricot, black tea", price: "16" },
      { name: "Poulsard, Jura", desc: "Pale, bright, red currant", price: "18" },
      { name: "Pét-nat rosé, Sonoma", desc: "Gentle bubbles, watermelon, pink grapefruit", price: "14" },
    ],
  },
];

export function MenuBoard() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="hbl-rs-board">
      <div className="hbl-rs-board-top">
        <div role="tablist" aria-label="Menu sections" className="hbl-rs-tabs" onKeyDown={onKey}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`hbl-rs-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`hbl-rs-panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              className="hbl-rs-tab"
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`hbl-rs-panel-${tab.id}`}
        aria-labelledby={`hbl-rs-tab-${tab.id}`}
        className="hbl-rs-panel"
        key={tab.id}
      >
        <p className="hbl-rs-board-note">
          <span className="hbl-rs-mono">{tab.note}</span>
        </p>
        <ul className="hbl-rs-dishes">
          {tab.dishes.map((d, i) => (
            <li key={d.name} className="hbl-rs-dish" style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}>
              <div className="hbl-rs-dish-line">
                <span className="hbl-rs-dish-name">{d.name}</span>
                <span className="hbl-rs-leader" aria-hidden="true" />
                <span className="hbl-rs-dish-price hbl-rs-mono">${d.price}</span>
              </div>
              <p className="hbl-rs-dish-desc">
                {d.desc}
                {d.tags?.map((t) => (
                  <abbr
                    key={t}
                    className="hbl-rs-tag"
                    title={t === "V" ? "Vegetarian" : t === "VG" ? "Vegan" : "Gluten free"}
                  >
                    {t}
                  </abbr>
                ))}
              </p>
            </li>
          ))}
        </ul>
        <p className="hbl-rs-board-foot hbl-rs-mono">V vegetarian · VG vegan · GF gluten free · 20% service shared with the whole team</p>
      </div>
    </div>
  );
}

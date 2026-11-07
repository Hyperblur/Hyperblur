"use client";

import * as React from "react";
import { FoodArt } from "./art";
import { categories, findItem, menu, money, popularIds, type Item, type Tag } from "./data";
import { AddButton } from "./order";
import { Ico, icons } from "./icons";

const tagInfo: Record<Tag, { label: string; icon: React.ReactNode }> = {
  popular: { label: "Popular", icon: icons.star },
  new: { label: "New", icon: icons.spark },
  spicy: { label: "Spicy", icon: icons.chili },
  veg: { label: "Vegan option", icon: icons.leaf },
};

export function TagPill({ tag }: { tag: Tag }) {
  const t = tagInfo[tag];
  return (
    <span className={`hbl-bg-tag hbl-bg-tag-${tag}`}>
      <Ico size={12} stroke={2}>{t.icon}</Ico>
      {t.label}
    </span>
  );
}

function MenuCard({ item, index }: { item: Item; index: number }) {
  return (
    <li className="hbl-bg-mcard" style={{ "--hbl-bg-i": index } as React.CSSProperties}>
      <div className="hbl-bg-mcard-art">
        <FoodArt art={item.art} />
      </div>
      <div className="hbl-bg-mcard-body">
        {item.tags.length > 0 && (
          <div className="hbl-bg-tags">
            {item.tags.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>
        )}
        <h3 className="hbl-bg-mcard-name">{item.name}</h3>
        <p className="hbl-bg-mcard-desc">{item.desc}</p>
        <div className="hbl-bg-mcard-foot">
          <div>
            <p className="hbl-bg-price">{money(item.price)}</p>
            <p className="hbl-bg-kcal">{item.kcal} kcal</p>
          </div>
          <AddButton id={item.id} name={item.name} />
        </div>
      </div>
    </li>
  );
}

export function FullMenu() {
  const [active, setActive] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const cat = categories[active];
  const items = menu.filter((m) => m.cat === cat.id);

  function onKey(e: React.KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % categories.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + categories.length) % categories.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = categories.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="menu" className="hbl-bg-section hbl-bg-menu">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-head hbl-bg-head-split">
          <div className="hbl-bg-min0">
            <p className="hbl-bg-kicker">The full menu</p>
            <h2 className="hbl-bg-h2">Pick your poison.</h2>
          </div>
          <p className="hbl-bg-sub">Everything is cooked to order. Tap add, tweak quantities in your bag, and check out for pickup or delivery.</p>
        </div>
        <div className="hbl-bg-tabs" role="tablist" aria-label="Menu categories" onKeyDown={onKey}>
          {categories.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`hbl-bg-tab-${c.id}`}
              aria-selected={active === i}
              aria-controls="hbl-bg-menu-panel"
              tabIndex={active === i ? 0 : -1}
              className="hbl-bg-tab"
              onClick={() => setActive(i)}
            >
              {c.label}
              <span className="hbl-bg-tab-n">{menu.filter((m) => m.cat === c.id).length}</span>
            </button>
          ))}
        </div>
        <div id="hbl-bg-menu-panel" role="tabpanel" aria-labelledby={`hbl-bg-tab-${cat.id}`} className="hbl-bg-panel">
          <p className="hbl-bg-panel-blurb">
            <Ico size={16}>{icons.flame}</Ico>
            {cat.blurb}
          </p>
          <ul key={cat.id} className="hbl-bg-mgrid">
            {items.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Popular() {
  const track = React.useRef<HTMLUListElement>(null);
  const [progress, setProgress] = React.useState(0);
  const items = popularIds.map((id) => findItem(id)).filter((i): i is Item => Boolean(i));

  function scrollBy(dir: number) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <section className="hbl-bg-section hbl-bg-popular" aria-labelledby="hbl-bg-popular-title">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-head hbl-bg-head-split">
          <div className="hbl-bg-min0">
            <p className="hbl-bg-kicker">Most ordered this week</p>
            <h2 id="hbl-bg-popular-title" className="hbl-bg-h2">
              The hits.
            </h2>
          </div>
          <div className="hbl-bg-carousel-ctrl">
            <button type="button" className="hbl-bg-iconbtn" onClick={() => scrollBy(-1)} aria-label="Previous items" disabled={progress <= 0.01}>
              <Ico size={18}>{icons.left}</Ico>
            </button>
            <button type="button" className="hbl-bg-iconbtn" onClick={() => scrollBy(1)} aria-label="Next items" disabled={progress >= 0.99}>
              <Ico size={18}>{icons.right}</Ico>
            </button>
          </div>
        </div>
      </div>
      <ul ref={track} className="hbl-bg-track-row" onScroll={onScroll} aria-label="Popular items" tabIndex={0}>
        {items.map((item, i) => (
          <li key={item.id} className="hbl-bg-pcard">
            <span className="hbl-bg-pcard-rank">#{i + 1}</span>
            <div className="hbl-bg-pcard-art">
              <FoodArt art={item.art} />
            </div>
            <div className="hbl-bg-tags">
              {item.tags.map((t) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>
            <h3 className="hbl-bg-pcard-name">{item.name}</h3>
            <p className="hbl-bg-pcard-desc">{item.desc}</p>
            <div className="hbl-bg-mcard-foot">
              <p className="hbl-bg-price">{money(item.price)}</p>
              <AddButton id={item.id} name={item.name} />
            </div>
          </li>
        ))}
      </ul>
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.12, progress).toFixed(3)})` }} />
        </div>
      </div>
    </section>
  );
}

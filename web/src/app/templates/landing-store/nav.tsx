"use client";

import * as React from "react";
import { AnnouncementBar } from "@/registry/hyperblur/announcement-bar";
import { useCart } from "./cart";
import { allProducts, money } from "./data";
import { BagIcon, LogoMark, SearchIcon } from "./icons";

const links = [
  { label: "Shop", href: "#bestsellers" },
  { label: "Collections", href: "#categories" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Our story", href: "#story" },
];

const announcements = [
  { badge: "Free shipping", text: "On every order over $75, delivered in 2 to 4 days.", cta: "Shop now", href: "#bestsellers" },
  { text: "New: the Arch Vase and Coast Pasta Bowls just landed.", cta: "See new arrivals", href: "#arrivals" },
  { text: "Flagship open today 10am to 8pm, 214 Wythe Ave, Brooklyn. (718) 555-0142", cta: "Visit", href: "#visit" },
];

function Search({ id }: { id: string }) {
  const [q, setQ] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const term = q.trim().toLowerCase();
  const results = term
    ? allProducts.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(term)).slice(0, 5)
    : [];
  const show = focused && term.length > 0;

  return (
    <form
      role="search"
      className="hbl-st-search"
      onSubmit={(e) => e.preventDefault()}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <label htmlFor={id} className="hbl-st-sr">
        Search the shop
      </label>
      <SearchIcon />
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search vases, linen, candles"
        autoComplete="off"
      />
      {show && (
        <div className="hbl-st-results">
          {results.length === 0 ? (
            <p className="hbl-st-results-empty">No pieces match “{q.trim()}”. Try “linen” or “oak”.</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <a href={`#p-${p.id}`} onClick={() => setFocused(false)}>
                    <span>{p.name}</span>
                    <span className="hbl-st-results-meta">
                      {p.category} · {money(p.price)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}

export function StoreNav() {
  const { count, last } = useCart();

  return (
    <>
      <AnnouncementBar messages={announcements} variant="solid" accent="#23352b" dismissible={false} interval={5000} />
      <header className="hbl-st-nav">
        <div className="hbl-st-wrap hbl-st-nav-row">
          <a href="#top" className="hbl-st-brand" aria-label="Haven Goods, back to top">
            <LogoMark />
            <span className="font-serif">Haven Goods</span>
          </a>
          <nav aria-label="Shop" className="hbl-st-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hbl-st-link">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hbl-st-nav-end">
            <div className="hbl-st-search-desk">
              <Search id="hbl-st-search-desk" />
            </div>
            <a href="#bestsellers" className="hbl-st-bag" aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
              <BagIcon />
              <span key={count} className="hbl-st-bag-count" data-bump={count > 0} aria-hidden="true">
                {count}
              </span>
            </a>
            <a href="#bestsellers" className="hbl-st-btn hbl-st-btn-primary hbl-st-nav-cta">
              Shop the collection
            </a>
          </div>
        </div>
        <div className="hbl-st-wrap hbl-st-search-mob">
          <Search id="hbl-st-search-mob" />
        </div>
        <p className="hbl-st-sr" aria-live="polite">
          {last ? `${last} added. ${count} ${count === 1 ? "item" : "items"} in your bag.` : ""}
        </p>
        {last && (
          <div key={count} className="hbl-st-toast" aria-hidden="true">
            <span className="hbl-st-toast-dot" />
            {last} added to your bag
          </div>
        )}
      </header>
    </>
  );
}

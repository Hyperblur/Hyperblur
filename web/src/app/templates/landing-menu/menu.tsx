"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { dietInfo, services, type Diet, type Dish, type Service } from "./data";
import { DishArt } from "./art";
import { DietIcon, Ico, icons } from "./icons";

const dietLabel = Object.fromEntries(dietInfo.map((d) => [d.id, d.label])) as Record<Diet, string>;

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function AllergenPopover({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  return (
    <div className="hbl-mn-pop" role="dialog" id={`hbl-mn-pop-${dish.id}`} aria-label={`Allergen info for ${dish.name}`}>
      <div className="hbl-mn-pop-head">
        <p className="hbl-mn-pop-title">Allergen info</p>
        <button type="button" className="hbl-mn-pop-x" onClick={onClose} aria-label="Close allergen info">
          <Ico size={14} stroke={2}>{icons.close}</Ico>
        </button>
      </div>
      <p className="hbl-mn-pop-label">Contains</p>
      {dish.contains.length ? (
        <ul className="hbl-mn-pop-list">
          {dish.contains.map((a) => (
            <li key={a} className="hbl-mn-pop-chip hbl-mn-pop-chip-hot">
              {a}
            </li>
          ))}
        </ul>
      ) : (
        <p className="hbl-mn-pop-none">None of the 14 major allergens</p>
      )}
      {dish.traces.length > 0 && (
        <>
          <p className="hbl-mn-pop-label">May contain traces of</p>
          <ul className="hbl-mn-pop-list">
            {dish.traces.map((a) => (
              <li key={a} className="hbl-mn-pop-chip">
                {a}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="hbl-mn-pop-foot">
        <span>{dish.kcal} kcal</span>
        <span>Ask your server about swaps.</span>
      </p>
    </div>
  );
}

function DishCard({
  dish,
  index,
  open,
  onToggle,
  onClose,
}: {
  dish: Dish;
  index: number;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <article
      className="hbl-mn-dish"
      data-open={open}
      style={{ "--hbl-mn-i": index } as CSSProperties}
    >
      <DishArt kind={dish.art} tint={dish.tint} uid={dish.id} tone={dish.tone} />
      <div className="hbl-mn-dish-body">
        <div className="hbl-mn-dish-top">
          <h4 className="hbl-mn-dish-name">{dish.name}</h4>
          <span className="hbl-mn-leader" aria-hidden="true" />
          <span className="hbl-mn-price">${dish.price}</span>
        </div>
        <p className="hbl-mn-dish-desc">{dish.desc}</p>
        <div className="hbl-mn-dish-foot">
          <ul className="hbl-mn-tags" aria-label="Dietary info">
            {dish.badge && (
              <li className="hbl-mn-badge" data-badge={dish.badge === "Chef's pick" ? "chef" : dish.badge.toLowerCase()}>
                {dish.badge}
              </li>
            )}
            {dish.tags.map((t) => (
              <li key={t} className="hbl-mn-tag" data-diet={t}>
                <DietIcon diet={t} />
                {dietLabel[t]}
              </li>
            ))}
          </ul>
          <div className="hbl-mn-allergen" data-hbl-mn-pop-root="">
            <button
              type="button"
              id={`hbl-mn-trig-${dish.id}`}
              className="hbl-mn-allergen-btn"
              aria-expanded={open}
              aria-controls={open ? `hbl-mn-pop-${dish.id}` : undefined}
              onClick={onToggle}
            >
              <Ico size={14}>{icons.info}</Ico>
              Allergen info
            </button>
            {open && <AllergenPopover dish={dish} onClose={onClose} />}
          </div>
        </div>
      </div>
    </article>
  );
}

export function MenuExplorer() {
  const [serviceId, setServiceId] = useState<Service["id"]>("lunch");
  const [filters, setFilters] = useState<Diet[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [active, setActive] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const serviceIndex = services.findIndex((s) => s.id === serviceId);
  const service = services[serviceIndex];
  const visible = service.sections
    .map((s) => ({ ...s, dishes: s.dishes.filter((d) => filters.every((f) => d.tags.includes(f))) }))
    .filter((s) => s.dishes.length > 0);
  const total = service.sections.reduce((n, s) => n + s.dishes.length, 0);
  const shown = visible.reduce((n, s) => n + s.dishes.length, 0);
  const activeId = visible.some((s) => s.id === active) ? active : visible[0]?.id ?? "";
  const visibleKey = visible.map((s) => s.id).join("|");

  function scrollToMenuTop() {
    const root = rootRef.current;
    if (!root) return;
    if (root.getBoundingClientRect().top < 0) {
      root.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    }
  }

  function pickService(id: Service["id"]) {
    setServiceId(id);
    setOpenId(null);
    setActive("");
    scrollToMenuTop();
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = serviceIndex;
    if (e.key === "ArrowRight") next = (serviceIndex + 1) % services.length;
    if (e.key === "ArrowLeft") next = (serviceIndex - 1 + services.length) % services.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = services.length - 1;
    pickService(services[next].id);
    tabRefs.current[next]?.focus();
  }

  function toggleFilter(d: Diet) {
    setFilters((f) => (f.includes(d) ? f.filter((x) => x !== d) : [...f, d]));
    setOpenId(null);
  }

  function jumpTo(id: string) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  }

  useEffect(() => {
    function onHash() {
      const id = window.location.hash.replace("#", "");
      const match = services.find((s) => s.id === id);
      if (!match) return;
      setServiceId(match.id);
      setOpenId(null);
      setActive("");
      rootRef.current?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const ids = visibleKey ? visibleKey.split("|") : [];
    let raf = 0;
    function measure() {
      raf = 0;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [visibleKey]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !activeId) return;
    const chip = bar.querySelector<HTMLElement>(`[data-target="${activeId}"]`);
    if (!chip) return;
    const left = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: prefersReduced() ? "auto" : "smooth" });
  }, [activeId]);

  useEffect(() => {
    if (!openId) return;
    const id = openId;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenId(null);
        document.getElementById(`hbl-mn-trig-${id}`)?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      const t = e.target;
      if (t instanceof Element && t.closest("[data-hbl-mn-pop-root]")) return;
      setOpenId(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId]);

  const offsets = visible.map((_, i) => visible.slice(0, i).reduce((n, s) => n + s.dishes.length, 0));

  return (
    <div ref={rootRef} className="hbl-mn-explorer">
      <div
        className="hbl-mn-tabs"
        role="tablist"
        aria-label="Menus"
        onKeyDown={onTabKey}
        style={{ "--hbl-mn-tab": serviceIndex } as CSSProperties}
      >
        <span className="hbl-mn-tabs-ind" aria-hidden="true" />
        {services.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`hbl-mn-tab-${s.id}`}
            aria-selected={s.id === serviceId}
            aria-controls="hbl-mn-panel"
            tabIndex={s.id === serviceId ? 0 : -1}
            className="hbl-mn-tab"
            onClick={() => pickService(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="hbl-mn-filterbar">
        <div className="hbl-mn-filters" role="group" aria-label="Dietary filters">
          {dietInfo.map((d) => (
            <button
              key={d.id}
              type="button"
              className="hbl-mn-chip"
              data-diet={d.id}
              aria-pressed={filters.includes(d.id)}
              onClick={() => toggleFilter(d.id)}
            >
              <DietIcon diet={d.id} size={14} />
              {d.label}
            </button>
          ))}
          {filters.length > 0 && (
            <button type="button" className="hbl-mn-clear" onClick={() => setFilters([])}>
              Clear
            </button>
          )}
        </div>
        <p className="hbl-mn-count" aria-live="polite">
          <Ico size={14}>{icons.clock}</Ico>
          <span>
            {service.hours} · Showing <b>{shown}</b> of {total}
          </span>
        </p>
      </div>

      <div className="hbl-mn-catbar">
        <div className="hbl-mn-catbar-in" ref={barRef} aria-label={`${service.label} sections`} role="navigation">
          {visible.map((s) => (
            <button
              key={s.id}
              type="button"
              data-target={s.id}
              className="hbl-mn-cat"
              aria-current={s.id === activeId ? "true" : undefined}
              onClick={() => jumpTo(s.id)}
            >
              {s.title}
              <span className="hbl-mn-cat-n">{s.dishes.length}</span>
            </button>
          ))}
          {visible.length === 0 && <span className="hbl-mn-cat-empty">No sections match</span>}
        </div>
      </div>

      <div
        id="hbl-mn-panel"
        role="tabpanel"
        aria-labelledby={`hbl-mn-tab-${serviceId}`}
        className="hbl-mn-panel"
        key={serviceId}
      >
        {visible.map((s, si) => (
          <section key={s.id} id={s.id} className="hbl-mn-group" aria-labelledby={`${s.id}-h`}>
            <div className="hbl-mn-group-head">
              <h3 id={`${s.id}-h`} className="hbl-mn-group-title">
                {s.title}
              </h3>
              <p className="hbl-mn-group-note">{s.note}</p>
            </div>
            <div className="hbl-mn-dishes">
              {s.dishes.map((d, di) => {
                return (
                  <DishCard
                    key={d.id}
                    dish={d}
                    index={(offsets[si] + di) % 8}
                    open={openId === d.id}
                    onToggle={() => setOpenId((o) => (o === d.id ? null : d.id))}
                    onClose={() => {
                      setOpenId(null);
                      document.getElementById(`hbl-mn-trig-${d.id}`)?.focus();
                    }}
                  />
                );
              })}
            </div>
          </section>
        ))}
        {visible.length === 0 && (
          <div className="hbl-mn-empty" role="status">
            <span className="hbl-mn-empty-ico">
              <Ico size={22}>{icons.filter}</Ico>
            </span>
            <p className="hbl-mn-empty-t">Nothing on the {service.label.toLowerCase()} menu matches all of those.</p>
            <p className="hbl-mn-empty-s">Try removing a filter. The kitchen can also adapt most dishes, just ask.</p>
            <button type="button" className="hbl-mn-btn hbl-mn-btn-ghost hbl-mn-btn-sm" onClick={() => setFilters([])}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";

export interface PillNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface PillNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue"> {
  items: PillNavItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  followHover?: boolean;
}

const css = `
.hb-pn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,.06);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
}
.hb-pn-pill {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--hb-pw, 0px);
  height: var(--hb-ph, 0px);
  border-radius: 999px;
  background: rgba(255,255,255,.16);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.18);
  transform: translate3d(var(--hb-px, 0px), var(--hb-py, 0px), 0);
  opacity: 0;
  pointer-events: none;
  transition:
    transform .4s cubic-bezier(.2, .9, .2, 1),
    width .4s cubic-bezier(.2, .9, .2, 1),
    height .4s cubic-bezier(.2, .9, .2, 1),
    opacity .2s ease;
}
.hb-pn-pill[data-ready="true"] { opacity: 1; }
.hb-pn-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 7px 16px;
  border: 0;
  border-radius: 999px;
  color: rgba(255,255,255,.6);
  font: inherit;
  font-size: 14px;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  transition: color .2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-pn-tab:hover,
.hb-pn-tab[aria-selected="true"] { color: #fff; }
.hb-pn-tab:focus-visible { outline: 2px solid #2f7bff; outline-offset: 1px; }
@media (prefers-reduced-motion: reduce) {
  .hb-pn-pill { transition: opacity .01s linear; }
  .hb-pn-tab { transition: none; }
}
`;

export function PillNav({
  items,
  active,
  defaultActive,
  onChange,
  followHover = true,
  className = "",
  onPointerLeave,
  onKeyDown,
  ...rest
}: PillNavProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const current = active ?? inner;
  const currentRef = React.useRef(current);
  const placedRef = React.useRef(false);

  const place = React.useCallback((id: string, instant = false) => {
    const pill = pillRef.current;
    const el = itemRefs.current.get(id);
    if (!pill) return;
    if (!el) {
      pill.dataset.ready = "false";
      return;
    }
    if (instant) pill.style.transition = "none";
    pill.style.setProperty("--hb-pw", `${el.offsetWidth}px`);
    pill.style.setProperty("--hb-ph", `${el.offsetHeight}px`);
    pill.style.setProperty("--hb-px", `${el.offsetLeft}px`);
    pill.style.setProperty("--hb-py", `${el.offsetTop}px`);
    pill.dataset.ready = "true";
    if (instant) {
      void pill.offsetWidth;
      pill.style.transition = "";
    }
  }, []);

  React.useEffect(() => {
    currentRef.current = current;
    place(current, !placedRef.current);
    placedRef.current = true;
  }, [current, items, place]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => place(currentRef.current, true);
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, [place]);

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    place(currentRef.current);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || items.length === 0) return;
    const n = items.length;
    const idx = Math.max(0, items.findIndex((i) => i.id === current));
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = items[next].id;
    select(id);
    itemRefs.current.get(id)?.focus();
  }

  const tabStop = items.some((i) => i.id === current) ? current : items[0]?.id;

  return (
    <div
      ref={rootRef}
      role="tablist"
      aria-orientation="horizontal"
      className={`hb-pn ${className}`}
      onPointerLeave={handleLeave}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <style href="hb-pill-nav" precedence="default">{css}</style>
      <span className="hb-pn-pill" ref={pillRef} aria-hidden="true" />
      {items.map((item) => {
        const common = {
          role: "tab",
          className: "hb-pn-tab",
          "aria-selected": item.id === current,
          tabIndex: item.id === tabStop ? 0 : -1,
          onClick: () => select(item.id),
          onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
            if (followHover && e.pointerType !== "touch") place(item.id);
          },
        };
        const setRef = (el: HTMLElement | null) => {
          if (el) itemRefs.current.set(item.id, el);
          else itemRefs.current.delete(item.id);
        };
        return item.href ? (
          <a key={item.id} ref={setRef} href={item.href} {...common}>
            {item.label}
          </a>
        ) : (
          <button key={item.id} ref={setRef} type="button" {...common}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

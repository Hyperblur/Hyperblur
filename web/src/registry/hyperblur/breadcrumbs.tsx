"use client";

import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items?: BreadcrumbItem[];
  separator?: "chevron" | "slash";
  maxItems?: number;
  maxLabelWidth?: number;
  homeIcon?: boolean;
  accent?: string;
}

const defaultItems: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Guides", href: "#" },
  { label: "Authentication", href: "#" },
  { label: "Single sign-on with SAML", href: "#" },
];

const css = `
.hb-brc {
  --hb-brc-a: #2f7bff;
  --hb-brc-mw: 160px;
  container: hb-brc / inline-size;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: 13.5px;
}
.hb-brc *, .hb-brc *::before, .hb-brc *::after { box-sizing: border-box; }
.hb-brc-ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-brc-li { position: relative; display: inline-flex; align-items: center; min-width: 0; }
.hb-brc-sep {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 22px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1;
  user-select: none;
}
.hb-brc-sep svg { width: 12px; height: 12px; }
.hb-brc-a,
.hb-brc-cur,
.hb-brc-more {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  margin: 0;
  padding: 4px 6px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  line-height: 1.3;
  text-decoration: none;
}
.hb-brc-t {
  position: relative;
  display: block;
  max-width: var(--hb-brc-mw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-brc-a { cursor: pointer; transition: color 0.2s ease; }
.hb-brc-a .hb-brc-t::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.hb-brc-a:hover { color: #fff; }
.hb-brc-a:hover .hb-brc-t::after { transform: scaleX(1); transform-origin: left; }
.hb-brc-cur { color: #ededed; font-weight: 550; }
.hb-brc-home { width: 28px; height: 28px; justify-content: center; padding: 0; }
.hb-brc-home svg { width: 15px; height: 15px; }
.hb-brc-more {
  justify-content: center;
  width: 28px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-brc-more:hover,
.hb-brc-more[aria-expanded="true"] { background: rgba(255, 255, 255, 0.08); color: #fff; }
.hb-brc-more svg { width: 15px; height: 15px; }
.hb-brc-a:focus-visible,
.hb-brc-more:focus-visible,
.hb-brc-mi:focus-visible {
  outline: 2px solid var(--hb-brc-a);
  outline-offset: 1px;
}
.hb-brc-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  display: grid;
  min-width: 170px;
  max-width: 260px;
  margin: 0;
  padding: 5px;
  list-style: none;
  border-radius: 12px;
  background: #141414;
  box-shadow: inset 0 0 0 1px #2a2a2a, 0 16px 40px rgba(0, 0, 0, 0.55);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-4px) scale(0.98);
  transform-origin: top left;
  transition: opacity 0.15s ease, transform 0.22s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s linear 0.22s;
}
.hb-brc-menu[data-open="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: none;
  transition: opacity 0.15s ease, transform 0.22s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s;
}
.hb-brc-mi {
  display: block;
  padding: 8px 10px;
  overflow: hidden;
  border-radius: 8px;
  color: #cfcfcf;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
}
.hb-brc-mi:hover { background: rgba(255, 255, 255, 0.07); color: #fff; }
@container hb-brc (max-width: 359px) {
  .hb-brc-t { max-width: min(var(--hb-brc-mw), 96px); }
  .hb-brc-sep { width: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-brc-a, .hb-brc-more, .hb-brc-menu, .hb-brc-mi, .hb-brc-a .hb-brc-t::after { transition: none; }
}
`;

function Separator({ kind }: { kind: "chevron" | "slash" }) {
  return (
    <span className="hb-brc-sep" aria-hidden="true">
      {kind === "slash" ? (
        "/"
      ) : (
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
        </svg>
      )}
    </span>
  );
}

export function Breadcrumbs({
  items = defaultItems,
  separator = "chevron",
  maxItems = 4,
  maxLabelWidth = 160,
  homeIcon = false,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  onBlur,
  ...rest
}: BreadcrumbsProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const moreRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const [open, setOpen] = React.useState(false);
  const focusFirst = React.useRef(false);

  const limit = Math.max(2, maxItems);
  const collapsed = items.length > limit;
  const tail = Math.max(1, limit - 2);
  const hidden = collapsed ? items.slice(1, items.length - tail) : [];
  const shown: (BreadcrumbItem | "more")[] = collapsed
    ? [items[0], "more", ...items.slice(items.length - tail)]
    : items;

  React.useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (open && focusFirst.current) {
      focusFirst.current = false;
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || !open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      moreRef.current?.focus();
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    onBlur?.(e);
    const next = e.relatedTarget as Node | null;
    if (open && next && !e.currentTarget.contains(next)) setOpen(false);
  }

  function handleMenuKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("a"));
    const i = links.indexOf(e.target as HTMLElement);
    if (i < 0) return;
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % links.length;
    else if (e.key === "ArrowUp") next = (i - 1 + links.length) % links.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = links.length - 1;
    if (next < 0) return;
    e.preventDefault();
    links[next].focus();
  }

  const rootStyle = {
    "--hb-brc-a": accent,
    "--hb-brc-mw": `${maxLabelWidth}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      aria-label="Breadcrumb"
      className={`hb-brc ${className}`}
      style={rootStyle}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    >
      <style href="hb-breadcrumbs" precedence="default">{css}</style>
      <ol className="hb-brc-ol">
        {shown.map((item, i) => {
          const last = i === shown.length - 1;
          if (item === "more") {
            return (
              <li className="hb-brc-li" key="more">
                <button
                  ref={moreRef}
                  type="button"
                  className="hb-brc-more"
                  aria-label={`Show ${hidden.length} more`}
                  aria-expanded={open}
                  aria-controls={`${uid}-menu`}
                  onClick={() => setOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      if (open) menuRef.current?.querySelector<HTMLElement>("a")?.focus();
                      else {
                        focusFirst.current = true;
                        setOpen(true);
                      }
                    }
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <circle cx="3.5" cy="8" r="1.25" />
                    <circle cx="8" cy="8" r="1.25" />
                    <circle cx="12.5" cy="8" r="1.25" />
                  </svg>
                </button>
                <ul
                  ref={menuRef}
                  id={`${uid}-menu`}
                  className="hb-brc-menu"
                  data-open={open ? "true" : "false"}
                  onKeyDown={handleMenuKey}
                >
                  {hidden.map((h) => (
                    <li key={h.label}>
                      <a className="hb-brc-mi" href={h.href ?? "#"} title={h.label} onClick={() => setOpen(false)}>
                        {h.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Separator kind={separator} />
              </li>
            );
          }
          const isHome = homeIcon && item === items[0];
          return (
            <li className="hb-brc-li" key={`${i}-${item.label}`}>
              {last ? (
                <span className="hb-brc-cur" aria-current="page" title={item.label}>
                  <span className="hb-brc-t">{item.label}</span>
                </span>
              ) : isHome ? (
                <a className="hb-brc-a hb-brc-home" href={item.href ?? "#"} aria-label={item.label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />
                  </svg>
                </a>
              ) : (
                <a className="hb-brc-a" href={item.href ?? "#"} title={item.label}>
                  <span className="hb-brc-t">{item.label}</span>
                </a>
              )}
              {!last && <Separator kind={separator} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

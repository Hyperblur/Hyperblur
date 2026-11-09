"use client";

import * as React from "react";

export type NavbarIconName =
  | "bolt"
  | "chart"
  | "shield"
  | "code"
  | "users"
  | "book"
  | "globe"
  | "layers";

export interface NavbarMenuItem {
  title: string;
  description?: string;
  href?: string;
  icon?: NavbarIconName | React.ReactNode;
}

export interface NavbarLink {
  id: string;
  label: string;
  href?: string;
  menu?: NavbarMenuItem[];
}

export interface NavbarCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  logo?: React.ReactNode;
  links?: NavbarLink[];
  cta?: NavbarCta | null;
  accent?: string;
  sticky?: boolean;
  defaultOpenId?: string;
}

const iconPaths: Record<NavbarIconName, string[]> = {
  bolt: ["M13 2 4 14h7l-1 8 9-12h-7l1-8z"],
  chart: ["M4 20v-9M10 20V5M16 20v-6M22 20H2"],
  shield: ["M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3z", "m9 12 2 2 4-4"],
  code: ["m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"],
  users: [
    "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 18.5V20",
    "M10.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "M19 20v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 5.2a3 3 0 0 1 0 5.6",
  ],
  book: [
    "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16z",
    "M4 21.5A2.5 2.5 0 0 1 6.5 19H20",
  ],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"],
  layers: ["m12 3 9 5-9 5-9-5 9-5z", "m3 13 9 5 9-5"],
};

const defaultLinks: NavbarLink[] = [
  {
    id: "product",
    label: "Product",
    menu: [
      { title: "Automations", description: "Trigger workflows from any event", icon: "bolt", href: "#" },
      { title: "Analytics", description: "Dashboards your whole team reads", icon: "chart", href: "#" },
      { title: "Security", description: "SSO, audit logs and SOC 2 reports", icon: "shield", href: "#" },
      { title: "Developer API", description: "REST and webhooks with typed SDKs", icon: "code", href: "#" },
      { title: "Collaboration", description: "Comments, roles and shared views", icon: "users", href: "#" },
      { title: "Integrations", description: "Connect 120+ tools in a click", icon: "layers", href: "#" },
    ],
  },
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "docs", label: "Docs", href: "#" },
  { id: "changelog", label: "Changelog", href: "#" },
];

const defaultCta: NavbarCta = { label: "Get started", href: "#" };

const css = `
.hb-nvg {
  --hb-nvg-a: #2f7bff;
  container: hb-nvg / inline-size;
  position: relative;
  z-index: 30;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-nvg *, .hb-nvg *::before, .hb-nvg *::after { box-sizing: border-box; }
.hb-nvg[data-sticky="true"] { position: sticky; top: 0; }
.hb-nvg-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 8px 10px 8px 16px;
  border-radius: 16px;
  background: rgba(14, 14, 14, 0.62);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09), 0 10px 30px rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  backdrop-filter: blur(16px) saturate(1.5);
}
.hb-nvg-logo {
  display: inline-flex;
  align-items: center;
  flex: none;
  gap: 9px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
}
.hb-nvg-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-nvg-li { display: flex; }
.hb-nvg-pill {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--hb-nvg-pw, 0px);
  height: var(--hb-nvg-ph, 0px);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.09);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: translate3d(var(--hb-nvg-px, 0px), var(--hb-nvg-py, 0px), 0);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1),
    width 0.35s cubic-bezier(0.2, 0.9, 0.2, 1),
    height 0.35s cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 0.2s ease;
}
.hb-nvg-pill[data-on="true"] { opacity: 1; }
.hb-nvg-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  padding: 8px 13px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: rgba(255, 255, 255, 0.68);
  font: inherit;
  font-size: 14px;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-nvg-link:hover,
.hb-nvg-link[aria-expanded="true"] { color: #fff; }
.hb-nvg-link:focus-visible,
.hb-nvg-cta:focus-visible,
.hb-nvg-burger:focus-visible,
.hb-nvg-item:focus-visible,
.hb-nvg-sbtn:focus-visible {
  outline: 2px solid var(--hb-nvg-a);
  outline-offset: 1px;
}
.hb-nvg-caret {
  width: 12px;
  height: 12px;
  opacity: 0.7;
  transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.hb-nvg-link[aria-expanded="true"] .hb-nvg-caret { transform: rotate(180deg); }
.hb-nvg-cta {
  display: inline-flex;
  align-items: center;
  flex: none;
  justify-content: center;
  margin: 0;
  padding: 9px 16px;
  border: 0;
  border-radius: 11px;
  background: var(--hb-nvg-a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px color-mix(in srgb, var(--hb-nvg-a) 40%, transparent);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
}
.hb-nvg-cta:hover { filter: brightness(1.1); transform: translateY(-1px); }
.hb-nvg-cta:active { transform: translateY(0); }
.hb-nvg-burger {
  display: none;
  position: relative;
  flex: none;
  width: 38px;
  height: 38px;
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  cursor: pointer;
}
.hb-nvg-burger span {
  position: absolute;
  left: 11px;
  width: 16px;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.2s ease;
}
.hb-nvg-burger span:nth-child(1) { top: 13px; }
.hb-nvg-burger span:nth-child(2) { top: 18px; }
.hb-nvg-burger span:nth-child(3) { top: 23px; }
.hb-nvg-burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.hb-nvg-burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hb-nvg-burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
.hb-nvg-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  padding: 8px;
  border-radius: 18px;
  background: rgba(17, 17, 17, 0.92);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-8px) scale(0.985);
  transform-origin: top center;
  transition:
    opacity 0.2s ease,
    transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1),
    visibility 0s linear 0.28s;
}
.hb-nvg-panel[data-open="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: none;
  transition:
    opacity 0.2s ease,
    transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1),
    visibility 0s;
}
.hb-nvg-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px;
}
.hb-nvg-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 12px;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s ease;
}
.hb-nvg-panel[data-open="true"] .hb-nvg-item {
  animation: hb-nvg-item 0.35s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  animation-delay: calc(var(--hb-nvg-i, 0) * 35ms);
}
.hb-nvg-item:hover { background: rgba(255, 255, 255, 0.06); }
.hb-nvg-ico {
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-nvg-a) 14%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-nvg-a) 28%, transparent);
  color: color-mix(in srgb, var(--hb-nvg-a) 55%, #fff);
}
.hb-nvg-ico svg { width: 17px; height: 17px; }
.hb-nvg-text { min-width: 0; }
.hb-nvg-title { display: block; color: #f2f2f2; font-size: 14px; font-weight: 550; line-height: 1.3; }
.hb-nvg-desc { display: block; margin-top: 2px; color: #8f8f8f; font-size: 12.5px; line-height: 1.4; }
.hb-nvg-sheet {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  padding: 8px;
  border-radius: 18px;
  background: rgba(17, 17, 17, 0.94);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-8px);
  transition:
    opacity 0.2s ease,
    transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1),
    visibility 0s linear 0.28s;
}
.hb-nvg-sheet[data-open="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: none;
  transition:
    opacity 0.2s ease,
    transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1),
    visibility 0s;
}
.hb-nvg-sl { margin: 0; padding: 0; list-style: none; }
.hb-nvg-sbtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 13px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}
.hb-nvg-sbtn:hover { background: rgba(255, 255, 255, 0.06); }
.hb-nvg-sbtn[aria-expanded="true"] .hb-nvg-caret { transform: rotate(180deg); }
.hb-nvg-sub {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.3s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s linear 0.3s;
}
.hb-nvg-sub[data-open="true"] {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows 0.3s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s;
}
.hb-nvg-sub > div { min-height: 0; overflow: hidden; }
.hb-nvg-sheet .hb-nvg-cta { width: 100%; margin-top: 6px; padding: 13px 16px; }
@keyframes hb-nvg-item {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@container hb-nvg (max-width: 559px) {
  .hb-nvg-bar > .hb-nvg-links,
  .hb-nvg-bar > .hb-nvg-cta,
  .hb-nvg-panel { display: none; }
  .hb-nvg-burger { display: block; }
  .hb-nvg-sheet { display: block; }
  .hb-nvg-bar { padding-left: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-nvg-pill,
  .hb-nvg-panel,
  .hb-nvg-sheet,
  .hb-nvg-sub,
  .hb-nvg-caret,
  .hb-nvg-burger span,
  .hb-nvg-cta,
  .hb-nvg-item,
  .hb-nvg-link { transition: none; }
  .hb-nvg-panel[data-open="true"] .hb-nvg-item { animation: none; }
}
`;

function Icon({ name }: { name: NavbarIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Caret() {
  return (
    <svg className="hb-nvg-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

function renderIcon(icon: NavbarMenuItem["icon"]) {
  if (typeof icon === "string") return <Icon name={icon as NavbarIconName} />;
  return icon ?? null;
}

const defaultLogo = (
  <>
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#2f7bff" />
      <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
    <span>Acme</span>
  </>
);

export function NavbarGlass({
  logo,
  links = defaultLinks,
  cta = defaultCta,
  accent = "#2f7bff",
  sticky = true,
  defaultOpenId,
  className = "",
  style,
  onKeyDown,
  onBlur,
  ...rest
}: NavbarGlassProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const pillRef = React.useRef<HTMLLIElement>(null);
  const triggers = React.useRef<Map<string, HTMLElement>>(new Map());
  const placed = React.useRef<HTMLElement | null>(null);
  const focusFirst = React.useRef(false);
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId ?? null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [section, setSection] = React.useState<string | null>(null);

  const place = React.useCallback((el: HTMLElement | null, instant = false) => {
    const pill = pillRef.current;
    if (!pill) return;
    placed.current = el;
    if (!el) {
      pill.dataset.on = "false";
      return;
    }
    const fresh = instant || pill.dataset.on !== "true";
    if (fresh) pill.style.transition = "opacity 0.2s ease";
    pill.style.setProperty("--hb-nvg-pw", `${el.offsetWidth}px`);
    pill.style.setProperty("--hb-nvg-ph", `${el.offsetHeight}px`);
    pill.style.setProperty("--hb-nvg-px", `${el.offsetLeft}px`);
    pill.style.setProperty("--hb-nvg-py", `${el.offsetTop}px`);
    pill.dataset.on = "true";
    if (fresh) {
      void pill.offsetWidth;
      pill.style.transition = "";
    }
  }, []);

  React.useEffect(() => {
    if (defaultOpenId) {
      const el = triggers.current.get(defaultOpenId);
      if (el) place(el, true);
    }
  }, [defaultOpenId, place]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (placed.current) place(placed.current, true);
    });
    ro.observe(list);
    return () => ro.disconnect();
  }, [place]);

  React.useEffect(() => {
    if (!openId && !menuOpen) return;
    function onDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenId(null);
        setMenuOpen(false);
        place(null);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openId, menuOpen, place]);

  React.useEffect(() => {
    if (!openId || !focusFirst.current) return;
    focusFirst.current = false;
    rootRef.current?.querySelector<HTMLElement>(`[data-nvg-panel="${CSS.escape(openId)}"] [data-nvg-item]`)?.focus();
  }, [openId]);

  function closeAll() {
    setOpenId(null);
    setMenuOpen(false);
    place(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.key !== "Escape") return;
    if (!openId && !menuOpen) return;
    e.preventDefault();
    const back = openId ? triggers.current.get(openId) : null;
    const inPanel = (e.target as HTMLElement).closest("[data-nvg-panel]");
    closeAll();
    if (back && inPanel) back.focus();
  }

  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    onBlur?.(e);
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) closeAll();
  }

  function toggle(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (!next) place(null);
  }

  function handleTriggerKey(e: React.KeyboardEvent<HTMLElement>, id: string) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusFirst.current = true;
      if (openId === id) {
        rootRef.current?.querySelector<HTMLElement>(`[data-nvg-panel="${CSS.escape(id)}"] [data-nvg-item]`)?.focus();
        focusFirst.current = false;
      } else {
        setOpenId(id);
      }
    }
  }

  function handlePanelKey(e: React.KeyboardEvent<HTMLDivElement>, id: string) {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-nvg-item]"));
    const i = items.indexOf(e.target as HTMLElement);
    if (i < 0) return;
    const grid = e.currentTarget.querySelector<HTMLElement>(".hb-nvg-grid");
    const cols = grid ? Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(" ").length) : 1;
    let next = -1;
    if (e.key === "ArrowRight") next = Math.min(items.length - 1, i + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, i - 1);
    else if (e.key === "ArrowDown") next = Math.min(items.length - 1, i + cols);
    else if (e.key === "ArrowUp") {
      if (i - cols < 0) {
        e.preventDefault();
        triggers.current.get(id)?.focus();
        return;
      }
      next = i - cols;
    } else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    items[next].focus();
  }

  const sheetId = `${uid}-sheet`;
  const rootStyle = { "--hb-nvg-a": accent, ...style } as React.CSSProperties;

  return (
    <header
      ref={rootRef}
      className={`hb-nvg ${className}`}
      data-sticky={sticky ? "true" : "false"}
      style={rootStyle}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    >
      <style href="hb-navbar-glass" precedence="default">{css}</style>
      <nav className="hb-nvg-bar" aria-label="Main">
        <div className="hb-nvg-logo">{logo ?? defaultLogo}</div>
        <ul
          className="hb-nvg-links"
          ref={listRef}
          onPointerLeave={() => {
            const open = openId ? triggers.current.get(openId) : null;
            place(open ?? null);
          }}
        >
          <li className="hb-nvg-pill" ref={pillRef} aria-hidden="true" data-on="false" />
          {links.map((link) => {
            const setRef = (el: HTMLElement | null) => {
              if (el) triggers.current.set(link.id, el);
              else triggers.current.delete(link.id);
            };
            const hover = (e: React.SyntheticEvent<HTMLElement>) => place(e.currentTarget);
            return (
              <li key={link.id} className="hb-nvg-li">
                {link.menu ? (
                  <button
                    type="button"
                    ref={setRef}
                    className="hb-nvg-link"
                    aria-expanded={openId === link.id}
                    aria-haspopup="true"
                    aria-controls={`${uid}-${link.id}`}
                    onClick={() => toggle(link.id)}
                    onKeyDown={(e) => handleTriggerKey(e, link.id)}
                    onPointerEnter={hover}
                    onFocus={hover}
                  >
                    {link.label}
                    <Caret />
                  </button>
                ) : (
                  <a
                    ref={setRef}
                    className="hb-nvg-link"
                    href={link.href ?? "#"}
                    onPointerEnter={hover}
                    onFocus={hover}
                    onClick={() => setOpenId(null)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        {cta &&
          (cta.href ? (
            <a className="hb-nvg-cta" href={cta.href} onClick={cta.onClick}>
              {cta.label}
            </a>
          ) : (
            <button type="button" className="hb-nvg-cta" onClick={cta.onClick}>
              {cta.label}
            </button>
          ))}
        <button
          type="button"
          className="hb-nvg-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={sheetId}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {links.map((link) =>
        link.menu ? (
          <div
            key={link.id}
            id={`${uid}-${link.id}`}
            className="hb-nvg-panel"
            data-open={openId === link.id ? "true" : "false"}
            data-nvg-panel={link.id}
            onKeyDown={(e) => handlePanelKey(e, link.id)}
          >
            <div className="hb-nvg-grid">
              {link.menu.map((item, i) => (
                <a
                  key={item.title}
                  className="hb-nvg-item"
                  href={item.href ?? "#"}
                  data-nvg-item=""
                  style={{ "--hb-nvg-i": i } as React.CSSProperties}
                  onClick={closeAll}
                >
                  {item.icon !== undefined && <span className="hb-nvg-ico">{renderIcon(item.icon)}</span>}
                  <span className="hb-nvg-text">
                    <span className="hb-nvg-title">{item.title}</span>
                    {item.description && <span className="hb-nvg-desc">{item.description}</span>}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null,
      )}
      <div id={sheetId} className="hb-nvg-sheet" data-open={menuOpen ? "true" : "false"}>
        <ul className="hb-nvg-sl">
          {links.map((link) => (
            <li key={link.id}>
              {link.menu ? (
                <>
                  <button
                    type="button"
                    className="hb-nvg-sbtn"
                    aria-expanded={section === link.id}
                    onClick={() => setSection((s) => (s === link.id ? null : link.id))}
                  >
                    {link.label}
                    <Caret />
                  </button>
                  <div className="hb-nvg-sub" data-open={section === link.id ? "true" : "false"}>
                    <div>
                      {link.menu.map((item) => (
                        <a key={item.title} className="hb-nvg-item" href={item.href ?? "#"} onClick={closeAll}>
                          {item.icon !== undefined && <span className="hb-nvg-ico">{renderIcon(item.icon)}</span>}
                          <span className="hb-nvg-text">
                            <span className="hb-nvg-title">{item.title}</span>
                            {item.description && <span className="hb-nvg-desc">{item.description}</span>}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a className="hb-nvg-sbtn" href={link.href ?? "#"} onClick={closeAll}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {cta &&
          (cta.href ? (
            <a className="hb-nvg-cta" href={cta.href} onClick={cta.onClick}>
              {cta.label}
            </a>
          ) : (
            <button type="button" className="hb-nvg-cta" onClick={cta.onClick}>
              {cta.label}
            </button>
          ))}
      </div>
    </header>
  );
}

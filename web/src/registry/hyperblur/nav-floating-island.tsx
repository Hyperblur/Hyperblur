"use client";

import * as React from "react";

export interface NavFloatingIslandLink {
  label: string;
  href: string;
}

export interface NavFloatingIslandUser {
  name: string;
  email: string;
  plan?: string;
}

export interface NavFloatingIslandMenuItem {
  label: string;
  href?: string;
  shortcut?: string;
  danger?: boolean;
}

export interface NavFloatingIslandProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavFloatingIslandLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  compact?: boolean;
  compactOnScroll?: boolean;
  searchLabel?: string;
  onSearch?: () => void;
  user?: NavFloatingIslandUser | null;
  menu?: NavFloatingIslandMenuItem[];
  defaultMenuOpen?: boolean;
  onMenuItemSelect?: (item: NavFloatingIslandMenuItem) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-ke2 {
  --hb-ke2-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  padding: 20px 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke2 *, .hb-ke2 *::before, .hb-ke2 *::after { box-sizing: border-box; }
.hb-ke2[data-backdrop="true"] { min-height: 600px; overflow: hidden; }
.hb-ke2-wrap { position: relative; z-index: 3; display: flex; justify-content: center; }
.hb-ke2-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 58px;
  padding: 0 9px 0 9px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(28,28,30,.82), rgba(16,16,18,.82));
  backdrop-filter: blur(16px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 1px 0 rgba(0,0,0,.4), 0 18px 50px -16px rgba(0,0,0,.85), 0 0 0 6px rgba(255,255,255,.015);
  transition: height .45s cubic-bezier(.2,.8,.2,1), padding .45s cubic-bezier(.2,.8,.2,1), gap .45s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease;
}
.hb-ke2[data-compact="true"] .hb-ke2-pill { height: 46px; padding: 0 5px; gap: 2px; }
.hb-ke2-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex: none;
  height: 40px;
  padding: 0 10px 0 6px;
  border-radius: 999px;
  color: #ededed;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -.015em;
  text-decoration: none;
  transition: padding .45s cubic-bezier(.2,.8,.2,1);
}
.hb-ke2-logo {
  position: relative;
  display: block;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: conic-gradient(from 210deg, var(--hb-ke2-accent), #0ea5e9, var(--hb-ke2-accent));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25);
  transition: width .45s cubic-bezier(.2,.8,.2,1), height .45s cubic-bezier(.2,.8,.2,1);
}
.hb-ke2-logo::after { content: ""; position: absolute; inset: 7px; border-radius: 50%; background: #121214; }
.hb-ke2-word { display: inline-block; max-width: 120px; overflow: hidden; white-space: nowrap; transition: max-width .45s cubic-bezier(.2,.8,.2,1), opacity .3s ease; }
.hb-ke2[data-compact="true"] .hb-ke2-word { max-width: 0; opacity: 0; }
.hb-ke2[data-compact="true"] .hb-ke2-brand { padding: 0 4px; gap: 0; }
.hb-ke2[data-compact="true"] .hb-ke2-logo { width: 24px; height: 24px; }
.hb-ke2-sep { width: 1px; height: 22px; flex: none; background: rgba(255,255,255,.1); }
.hb-ke2-links {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ke2-hl {
  position: absolute;
  list-style: none;
  top: 50%;
  left: 0;
  height: 36px;
  width: 0;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.05);
  opacity: 0;
  transform: translate3d(var(--hb-ke2-x, 0px), -50%, 0);
  transition: transform .42s cubic-bezier(.3,1.3,.5,1), width .42s cubic-bezier(.3,1.3,.5,1), opacity .2s ease, height .45s ease;
  pointer-events: none;
}
.hb-ke2-hl::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background: var(--hb-ke2-accent);
  box-shadow: 0 0 12px 1px var(--hb-ke2-accent);
  transform: translateX(-50%);
  transition: opacity .2s ease;
}
.hb-ke2-hl[data-hover="true"]::after { opacity: 0; }
.hb-ke2[data-compact="true"] .hb-ke2-hl { height: 32px; }
.hb-ke2-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  color: #8f8f8f;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: color .2s ease, padding .45s cubic-bezier(.2,.8,.2,1);
}
.hb-ke2-link:hover, .hb-ke2-link[aria-current="page"] { color: #ededed; }
.hb-ke2[data-compact="true"] .hb-ke2-link { padding: 0 11px; height: 32px; font-size: 13.5px; }
.hb-ke2-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
  height: 38px;
  margin: 0 0 0 4px;
  padding: 0 6px 0 12px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: #8f8f8f;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: border-color .2s ease, color .2s ease, background-color .2s ease, height .45s ease, padding .45s ease;
}
.hb-ke2-search:hover { color: #ededed; border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
.hb-ke2-search svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-ke2-stext { max-width: 90px; overflow: hidden; white-space: nowrap; transition: max-width .45s cubic-bezier(.2,.8,.2,1), opacity .3s ease; }
.hb-ke2[data-compact="true"] .hb-ke2-stext { max-width: 0; opacity: 0; }
.hb-ke2[data-compact="true"] .hb-ke2-search { height: 34px; padding: 0 5px 0 10px; }
.hb-ke2-kbd {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 24px;
  padding: 0 7px;
  border: 1px solid rgba(255,255,255,.1);
  border-bottom-width: 2px;
  border-radius: 999px;
  background: #1a1a1c;
  color: #c4c4c4;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-ke2-me { position: relative; flex: none; }
.hb-ke2-av {
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #ef4444 60%, #8b5cf6);
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25);
  transition: width .45s ease, height .45s ease, transform .15s ease;
}
.hb-ke2-av:active { transform: scale(.94); }
.hb-ke2-av::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 11px;
  height: 11px;
  border: 2px solid #141416;
  border-radius: 50%;
  background: var(--hb-ke2-accent);
}
.hb-ke2[data-compact="true"] .hb-ke2-av { width: 34px; height: 34px; }
.hb-ke2-menu {
  position: absolute;
  z-index: 5;
  top: calc(100% + 14px);
  right: -6px;
  width: 248px;
  padding: 6px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 16px;
  background: linear-gradient(#18181a, #121214);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 24px 60px -12px rgba(0,0,0,.85);
  transform-origin: calc(100% - 24px) 0;
  animation: hb-ke2-pop .26s cubic-bezier(.2,.9,.3,1.2) both;
}
.hb-ke2-head { display: flex; align-items: center; gap: 10px; padding: 10px 10px 12px; border-bottom: 1px solid rgba(255,255,255,.07); margin-bottom: 6px; }
.hb-ke2-hn { font-size: 13.5px; font-weight: 600; }
.hb-ke2-he { margin-top: 2px; color: #8f8f8f; font-size: 12px; }
.hb-ke2-plan {
  margin-left: auto;
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ke2-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-ke2-accent) 75%, #fff);
  font-size: 11px;
  font-weight: 600;
}
.hb-ke2-mi {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #d4d4d4;
  font: inherit;
  font-size: 13.5px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.hb-ke2-mi:hover, .hb-ke2-mi:focus-visible { background: rgba(255,255,255,.06); color: #fff; outline: none; }
.hb-ke2-mi[data-danger="true"] { color: #f87171; }
.hb-ke2-mi[data-danger="true"]:hover, .hb-ke2-mi[data-danger="true"]:focus-visible { background: rgba(248,113,113,.1); }
.hb-ke2-ms { margin-left: auto; color: #6f6f6f; font-size: 12px; }
.hb-ke2-div { height: 1px; margin: 6px 4px; background: rgba(255,255,255,.07); }
.hb-ke2 a:focus-visible, .hb-ke2 button:focus-visible { outline: 2px solid var(--hb-ke2-accent); outline-offset: 2px; }
.hb-ke2-stage { position: absolute; z-index: 1; inset: 0; pointer-events: none; }
.hb-ke2-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(40% 50% at 20% 30%, color-mix(in srgb, var(--hb-ke2-accent) 22%, transparent), transparent 70%),
    radial-gradient(45% 55% at 85% 20%, rgba(14,165,233,.18), transparent 70%),
    radial-gradient(60% 40% at 50% 110%, rgba(139,92,246,.16), transparent 70%);
}
.hb-ke2-copy { position: absolute; left: 0; right: 0; top: 150px; padding: 0 24px; text-align: center; opacity: .5; }
.hb-ke2-t { margin: 0 auto; max-width: 760px; font-size: clamp(32px, 6.4cqi, 64px); font-weight: 650; letter-spacing: -.04em; line-height: 1.02; }
.hb-ke2-t em { font-style: normal; color: color-mix(in srgb, var(--hb-ke2-accent) 65%, #fff); }
.hb-ke2-sub { margin: 18px auto 0; max-width: 480px; color: #a1a1a1; font-size: 16px; line-height: 1.55; }
.hb-ke2-shot {
  position: absolute;
  left: 50%;
  bottom: -120px;
  width: min(880px, calc(100% - 48px));
  height: 240px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 18px;
  background: linear-gradient(#151517, #0c0c0d);
  transform: translateX(-50%);
  opacity: .6;
}
.hb-ke2-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-ke2-pop { from { opacity: 0; transform: translate3d(0,-6px,0) scale(.96); } to { opacity: 1; transform: none; } }
@container (max-width: 640px) {
  .hb-ke2-word, .hb-ke2-stext { display: none; }
  .hb-ke2-brand { padding: 0 4px; }
  .hb-ke2-search { padding: 0 5px 0 10px; }
  .hb-ke2-links { overflow-x: auto; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent); mask-image: linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent); }
  .hb-ke2-links::-webkit-scrollbar { display: none; }
  .hb-ke2-link { padding: 0 10px; font-size: 13px; }
  .hb-ke2-sep { display: none; }
  .hb-ke2-copy { top: 130px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke2 *, .hb-ke2 *::before, .hb-ke2 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavFloatingIslandLink[] = [
  { label: "Overview", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "Library", href: "#" },
  { label: "Pricing", href: "#" },
];

const defaultMenu: NavFloatingIslandMenuItem[] = [
  { label: "Profile", href: "#", shortcut: "P" },
  { label: "Billing", href: "#", shortcut: "B" },
  { label: "Keyboard shortcuts", shortcut: "?" },
  { label: "Sign out", danger: true },
];

const noop = () => () => {};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function NavFloatingIsland({
  brand = "Frame",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  compact,
  compactOnScroll = false,
  searchLabel = "Search",
  onSearch,
  user = { name: "Leah Moreno", email: "leah@frame.so", plan: "Pro" },
  menu = defaultMenu,
  defaultMenuOpen = false,
  onMenuItemSelect,
  accent = "#10b981",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavFloatingIslandProps) {
  const uid = React.useId();
  const [innerActive, setInnerActive] = React.useState(defaultActive);
  const current = active ?? innerActive;
  const [menuOpen, setMenuOpen] = React.useState(defaultMenuOpen);
  const [scrolled, setScrolled] = React.useState(false);
  const isCompact = compact ?? (compactOnScroll && scrolled);
  const listRef = React.useRef<HTMLUListElement>(null);
  const hlRef = React.useRef<HTMLLIElement>(null);
  const meRef = React.useRef<HTMLDivElement>(null);
  const avRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const isMac = React.useSyncExternalStore(
    noop,
    () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => true,
  );

  const place = React.useCallback((target: HTMLElement | null, hover: boolean) => {
    const hl = hlRef.current;
    const list = listRef.current;
    if (!hl || !list) return;
    if (!target) {
      hl.style.opacity = "0";
      return;
    }
    hl.style.setProperty("--hb-ke2-x", `${target.offsetLeft.toFixed(1)}px`);
    hl.style.width = `${target.offsetWidth.toFixed(1)}px`;
    hl.style.opacity = "1";
    hl.dataset.hover = hover ? "true" : "false";
  }, []);

  const toActive = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    place(list.querySelector<HTMLElement>(`[data-hb-ke2-i="${current}"]`), false);
  }, [current, place]);

  React.useLayoutEffect(() => {
    toActive();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => toActive());
    ro.observe(list);
    return () => ro.disconnect();
  }, [toActive, isCompact]);

  React.useEffect(() => {
    if (!compactOnScroll) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [compactOnScroll]);

  React.useEffect(() => {
    if (!onSearch) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearch]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (meRef.current && !meRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  function pick(index: number) {
    if (active === undefined) setInnerActive(index);
    onActiveChange?.(index);
  }

  function menuItems() {
    return menuRef.current ? Array.from(menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')) : [];
  }

  function openMenu(focus: "first" | "last" | null) {
    setMenuOpen(true);
    if (focus) {
      window.requestAnimationFrame(() => {
        const list = menuItems();
        (focus === "first" ? list[0] : list[list.length - 1])?.focus();
      });
    }
  }

  function closeMenu(refocus: boolean) {
    setMenuOpen(false);
    if (refocus) avRef.current?.focus();
  }

  function onMenuKey(e: React.KeyboardEvent) {
    const list = menuItems();
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(at + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(at - 1 + list.length) % list.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      list[list.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
    } else if (e.key === "Tab") {
      closeMenu(false);
    }
  }

  function onLinksKey(e: React.KeyboardEvent) {
    const nodes = listRef.current ? Array.from(listRef.current.querySelectorAll<HTMLElement>("a")) : [];
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nodes[(at + 1) % nodes.length]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nodes[(at - 1 + nodes.length) % nodes.length]?.focus();
    }
  }

  return (
    <nav
      aria-label="Main"
      className={`hb-ke2 ${className}`}
      data-compact={isCompact ? "true" : "false"}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-ke2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-nav-floating-island" precedence="default">
        {css}
      </style>
      {showBackdrop && (
        <div className="hb-ke2-stage" aria-hidden="true">
          <div className="hb-ke2-copy">
            <p className="hb-ke2-t">
              Design reviews, <em>without</em> the meeting.
            </p>
            <p className="hb-ke2-sub">Drop a Figma link, collect threaded feedback and ship the final frame by Friday.</p>
          </div>
          <div className="hb-ke2-shot" />
        </div>
      )}
      <div className="hb-ke2-wrap">
        <div className="hb-ke2-pill">
          <a href="#" className="hb-ke2-brand" aria-label={`${brand} home`}>
            <span className="hb-ke2-logo" aria-hidden="true" />
            <span className="hb-ke2-word">{brand}</span>
          </a>
          <span className="hb-ke2-sep" aria-hidden="true" />
          <ul ref={listRef} className="hb-ke2-links" onPointerLeave={toActive} onKeyDown={onLinksKey} onBlur={toActive}>
            <li ref={hlRef} className="hb-ke2-hl" aria-hidden="true" />
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hb-ke2-link"
                  data-hb-ke2-i={i}
                  aria-current={i === current ? "page" : undefined}
                  onPointerEnter={(e) => place(e.currentTarget, i !== current)}
                  onFocus={(e) => place(e.currentTarget, i !== current)}
                  onClick={() => pick(i)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="hb-ke2-search" onClick={() => onSearch?.()} aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <span className="hb-ke2-stext">{searchLabel}</span>
            <span className="hb-ke2-kbd" aria-hidden="true">
              {isMac ? "⌘" : "Ctrl"} K
            </span>
          </button>
          {user && (
            <div ref={meRef} className="hb-ke2-me">
              <button
                ref={avRef}
                type="button"
                className="hb-ke2-av"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls={`${uid}-menu`}
                aria-label={`Account menu for ${user.name}`}
                onClick={() => (menuOpen ? closeMenu(false) : openMenu(null))}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openMenu("first");
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    openMenu("last");
                  } else if (e.key === "Escape") closeMenu(true);
                }}
              >
                {initials(user.name)}
              </button>
              {menuOpen && (
                <div ref={menuRef} id={`${uid}-menu`} role="menu" aria-label="Account" className="hb-ke2-menu" onKeyDown={onMenuKey}>
                  <div className="hb-ke2-head" role="presentation">
                    <div>
                      <div className="hb-ke2-hn">{user.name}</div>
                      <div className="hb-ke2-he">{user.email}</div>
                    </div>
                    {user.plan && <span className="hb-ke2-plan">{user.plan}</span>}
                  </div>
                  {menu.map((item, i) => {
                    const divider = item.danger && i > 0 && !menu[i - 1]!.danger;
                    const body = (
                      <>
                        {item.label}
                        {item.shortcut && <span className="hb-ke2-ms">{item.shortcut}</span>}
                      </>
                    );
                    const select = () => {
                      onMenuItemSelect?.(item);
                      closeMenu(true);
                    };
                    return (
                      <React.Fragment key={item.label}>
                        {divider && <div className="hb-ke2-div" role="separator" />}
                        {item.href ? (
                          <a
                            href={item.href}
                            role="menuitem"
                            tabIndex={-1}
                            className="hb-ke2-mi"
                            data-danger={item.danger ? "true" : "false"}
                            onClick={select}
                          >
                            {body}
                          </a>
                        ) : (
                          <button
                            type="button"
                            role="menuitem"
                            tabIndex={-1}
                            className="hb-ke2-mi"
                            data-danger={item.danger ? "true" : "false"}
                            onClick={select}
                          >
                            {body}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";

import * as React from "react";

export interface NavAppHeaderCrumb {
  label: string;
  href: string;
}

export interface NavAppHeaderTab {
  label: string;
  href: string;
  count?: number;
}

export interface NavAppHeaderMenuItem {
  label: string;
  href?: string;
  shortcut?: string;
  danger?: boolean;
}

export interface NavAppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  breadcrumbs?: NavAppHeaderCrumb[];
  status?: string | null;
  tabs?: NavAppHeaderTab[];
  activeTab?: number;
  defaultActiveTab?: number;
  onTabChange?: (index: number, tab: NavAppHeaderTab) => void;
  searchPlaceholder?: string;
  onSearch?: () => void;
  notifications?: number;
  onNotificationsClick?: () => void;
  user?: { name: string; email: string } | null;
  menu?: NavAppHeaderMenuItem[];
  defaultMenuOpen?: boolean;
  onMenuItemSelect?: (item: NavAppHeaderMenuItem) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-yh5 {
  --hb-yh5-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #fff;
  color: #171717;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh5 *, .hb-yh5 *::before, .hb-yh5 *::after { box-sizing: border-box; }
.hb-yh5[data-backdrop="true"] { min-height: 600px; overflow: hidden; background: #fafaf8; }
.hb-yh5-bar { position: relative; z-index: 3; border-bottom: 1px solid rgba(0,0,0,.08); background: rgba(255,255,255,.92); backdrop-filter: blur(12px); }
.hb-yh5-top { display: flex; align-items: center; gap: 10px; height: 60px; padding: 0 20px; }
.hb-yh5-logo { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 9px; background: linear-gradient(135deg, #171717, #3f3f46); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.2); text-decoration: none; }
.hb-yh5-logo svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh5-crumbs { display: flex; align-items: center; min-width: 0; margin: 0; padding: 0; list-style: none; }
.hb-yh5-cr { display: flex; align-items: center; min-width: 0; opacity: 0; transform: translateX(-6px); animation: hb-yh5-in .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(var(--hb-yh5-i) * 80ms); }
.hb-yh5-sl { flex: none; width: 18px; height: 22px; color: #d4d4d4; }
.hb-yh5-sl path { fill: none; stroke: currentColor; stroke-width: 1.3; stroke-linecap: round; }
.hb-yh5-cl {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  min-width: 0;
  padding: 0 8px;
  border-radius: 8px;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yh5-cl:hover { background: #f4f4f5; color: #171717; }
.hb-yh5-cl[aria-current="page"] { color: #171717; font-weight: 600; }
.hb-yh5-cl span { overflow: hidden; text-overflow: ellipsis; }
.hb-yh5-ws { display: grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff; font-size: 10px; font-weight: 700; }
.hb-yh5-ud { flex: none; width: 12px; height: 12px; color: #a3a3a3; }
.hb-yh5-ud path { fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh5-status { display: inline-flex; align-items: center; gap: 6px; flex: none; height: 22px; margin-left: 4px; padding: 0 8px; border: 1px solid rgba(16,185,129,.25); border-radius: 999px; background: rgba(16,185,129,.08); color: #047857; font-size: 11.5px; font-weight: 600; }
.hb-yh5-status i { position: relative; width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
.hb-yh5-status i::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid #10b981; animation: hb-yh5-ping 1.8s ease-out infinite; }
.hb-yh5-sp { flex: 1; }
.hb-yh5-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
  width: 260px;
  height: 36px;
  padding: 0 6px 0 12px;
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 10px;
  background: #fafafa;
  color: #8a8a8a;
  font: inherit;
  font-size: 13.5px;
  text-align: left;
  cursor: text;
  transition: border-color .15s ease, box-shadow .15s ease, background-color .15s ease;
}
.hb-yh5-search:hover { border-color: rgba(0,0,0,.16); background: #fff; }
.hb-yh5-search svg { width: 15px; height: 15px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-yh5-st { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh5-kbd { display: inline-flex; align-items: center; height: 22px; padding: 0 6px; border: 1px solid rgba(0,0,0,.1); border-bottom-width: 2px; border-radius: 6px; background: #fff; color: #737373; font-size: 11px; font-weight: 600; }
.hb-yh5-icon {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 10px;
  background: #fff;
  color: #525252;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yh5-icon:hover { background: #f4f4f5; color: #171717; }
.hb-yh5-icon svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh5-icon b { position: absolute; top: 5px; right: 5px; min-width: 15px; height: 15px; padding: 0 4px; border: 2px solid #fff; border-radius: 99px; background: var(--hb-yh5-accent); color: #fff; font-size: 9px; font-weight: 700; line-height: 11px; text-align: center; }
.hb-yh5-me { position: relative; flex: none; }
.hb-yh5-av { display: grid; place-items: center; width: 34px; height: 34px; margin-left: 2px; padding: 0; border: 0; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #06b6d4); color: #fff; font: inherit; font-size: 12.5px; font-weight: 650; cursor: pointer; box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(0,0,0,.08); transition: transform .15s ease; }
.hb-yh5-av:active { transform: scale(.94); }
.hb-yh5-menu {
  position: absolute;
  z-index: 5;
  top: calc(100% + 10px);
  right: 0;
  width: 240px;
  padding: 6px;
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.05), 0 20px 50px -12px rgba(0,0,0,.25);
  transform-origin: calc(100% - 16px) 0;
  animation: hb-yh5-pop .22s cubic-bezier(.2,.9,.3,1.2) both;
}
.hb-yh5-mh { padding: 10px 10px 12px; margin-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,.06); }
.hb-yh5-mn { font-size: 13.5px; font-weight: 600; }
.hb-yh5-me2 { margin-top: 2px; color: #737373; font-size: 12px; }
.hb-yh5-mi { display: flex; align-items: center; width: 100%; height: 34px; margin: 0; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #262626; font: inherit; font-size: 13.5px; text-align: left; text-decoration: none; cursor: pointer; }
.hb-yh5-mi:hover, .hb-yh5-mi:focus-visible { background: #f4f4f5; outline: none; }
.hb-yh5-mi[data-danger="true"] { color: #dc2626; }
.hb-yh5-mi[data-danger="true"]:hover, .hb-yh5-mi[data-danger="true"]:focus-visible { background: #fef2f2; }
.hb-yh5-ms { margin-left: auto; color: #a3a3a3; font-size: 12px; }
.hb-yh5-div { height: 1px; margin: 6px 4px; background: rgba(0,0,0,.06); }
.hb-yh5-tabs { position: relative; display: flex; align-items: center; gap: 2px; height: 44px; margin: 0; padding: 0 12px; list-style: none; overflow-x: auto; scrollbar-width: none; }
.hb-yh5-tabs::-webkit-scrollbar { display: none; }
.hb-yh5-hov { position: absolute; top: 6px; left: 0; height: 32px; border-radius: 8px; background: #f4f4f5; opacity: 0; transform: translateX(var(--hb-yh5-hx, 0px)); width: var(--hb-yh5-hw, 0px); transition: transform .25s cubic-bezier(.3,1,.4,1), width .25s cubic-bezier(.3,1,.4,1), opacity .15s ease; pointer-events: none; list-style: none; }
.hb-yh5-line { position: absolute; bottom: 0; left: 0; height: 2px; border-radius: 2px; background: #171717; transform: translateX(var(--hb-yh5-lx, 0px)); width: var(--hb-yh5-lw, 0px); transition: transform .42s cubic-bezier(.4,1.4,.5,1), width .42s cubic-bezier(.4,1.4,.5,1); pointer-events: none; list-style: none; }
.hb-yh5-line::after { content: ""; position: absolute; inset: -2px 30% auto; height: 4px; border-radius: 99px; background: var(--hb-yh5-accent); filter: blur(5px); opacity: .55; }
.hb-yh5-tab { position: relative; display: inline-flex; align-items: center; gap: 7px; height: 32px; padding: 0 12px; border-radius: 8px; color: #737373; font-size: 13.5px; font-weight: 500; white-space: nowrap; text-decoration: none; transition: color .15s ease; }
.hb-yh5-tab:hover, .hb-yh5-tab[aria-current="page"] { color: #171717; }
.hb-yh5-tab[aria-current="page"] { font-weight: 600; }
.hb-yh5-ct { display: inline-grid; place-items: center; min-width: 20px; height: 18px; padding: 0 6px; border-radius: 99px; background: #f0f0f0; color: #525252; font-size: 11px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yh5-tab[aria-current="page"] .hb-yh5-ct { background: color-mix(in srgb, var(--hb-yh5-accent) 12%, #fff); color: var(--hb-yh5-accent); }
.hb-yh5 a:focus-visible, .hb-yh5 button:focus-visible { outline: 2px solid var(--hb-yh5-accent); outline-offset: 2px; }
.hb-yh5-page { position: relative; z-index: 1; padding: 28px 20px; opacity: .75; pointer-events: none; }
.hb-yh5-ph { display: flex; justify-content: space-between; align-items: flex-end; max-width: 1120px; margin: 0 auto 20px; }
.hb-yh5-pt { font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-yh5-pd { margin-top: 4px; color: #8a8a8a; font-size: 13px; }
.hb-yh5-pb { height: 34px; padding: 0 14px; border-radius: 9px; background: #171717; color: #fff; font-size: 13px; font-weight: 600; line-height: 34px; }
.hb-yh5-cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; max-width: 1120px; margin: 0 auto; }
.hb-yh5-card { padding: 16px; border: 1px solid rgba(0,0,0,.07); border-radius: 14px; background: #fff; }
.hb-yh5-ck { color: #8a8a8a; font-size: 12px; }
.hb-yh5-cv { margin-top: 6px; font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-yh5-cv em { margin-left: 6px; color: #059669; font-size: 12px; font-style: normal; font-weight: 600; }
.hb-yh5-table { max-width: 1120px; margin: 14px auto 0; border: 1px solid rgba(0,0,0,.07); border-radius: 14px; background: #fff; overflow: hidden; }
.hb-yh5-tr { display: grid; grid-template-columns: 90px minmax(0, 1fr) 120px 90px; align-items: center; gap: 12px; height: 46px; padding: 0 16px; border-top: 1px solid rgba(0,0,0,.05); font-size: 13px; }
.hb-yh5-tr:first-child { border-top: 0; color: #8a8a8a; font-size: 12px; background: #fafafa; }
.hb-yh5-id { color: #8a8a8a; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
.hb-yh5-tag { justify-self: start; padding: 2px 8px; border-radius: 99px; font-size: 11.5px; font-weight: 600; }
.hb-yh5-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-yh5-in { to { opacity: 1; transform: none; } }
@keyframes hb-yh5-ping { from { transform: scale(.6); opacity: .8; } to { transform: scale(1.8); opacity: 0; } }
@keyframes hb-yh5-pop { from { opacity: 0; transform: translateY(-4px) scale(.97); } to { opacity: 1; transform: none; } }
@container (max-width: 860px) {
  .hb-yh5-search { width: 36px; padding: 0; justify-content: center; }
  .hb-yh5-st, .hb-yh5-kbd { display: none; }
  .hb-yh5-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 600px) {
  .hb-yh5-top { padding: 0 12px; gap: 6px; }
  .hb-yh5-cr[data-mid="true"] { display: none; }
  .hb-yh5-status { display: none; }
  .hb-yh5-tr { grid-template-columns: 70px minmax(0, 1fr) 80px; }
  .hb-yh5-tr > :nth-child(3) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh5 *, .hb-yh5 *::before, .hb-yh5 *::after { animation: none !important; transition: none !important; }
  .hb-yh5-cr { opacity: 1; transform: none; }
}
`;

const defaultCrumbs: NavAppHeaderCrumb[] = [
  { label: "Northwind", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Atlas redesign", href: "#" },
];

const defaultTabs: NavAppHeaderTab[] = [
  { label: "Overview", href: "#" },
  { label: "Issues", href: "#", count: 24 },
  { label: "Pull requests", href: "#", count: 6 },
  { label: "Deployments", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "Settings", href: "#" },
];

const defaultMenu: NavAppHeaderMenuItem[] = [
  { label: "Your profile", href: "#", shortcut: "G P" },
  { label: "Workspace settings", href: "#", shortcut: "G S" },
  { label: "Invite teammates", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Log out", danger: true },
];

const rows = [
  { id: "ATL-482", t: "Empty state for archived boards", s: "In review", c: "#7c3aed", bg: "#f5f3ff", who: "MK" },
  { id: "ATL-479", t: "Keyboard shortcuts sheet", s: "In progress", c: "#b45309", bg: "#fffbeb", who: "JL" },
  { id: "ATL-471", t: "Migrate color tokens to v3", s: "Done", c: "#047857", bg: "#ecfdf5", who: "SP" },
  { id: "ATL-466", t: "Onboarding checklist copy", s: "Backlog", c: "#525252", bg: "#f4f4f5", who: "AR" },
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

export function NavAppHeader({
  breadcrumbs = defaultCrumbs,
  status = "Production",
  tabs = defaultTabs,
  activeTab,
  defaultActiveTab = 1,
  onTabChange,
  searchPlaceholder = "Search issues, docs, people",
  onSearch,
  notifications = 4,
  onNotificationsClick,
  user = { name: "Sofia Petrov", email: "sofia@northwind.dev" },
  menu = defaultMenu,
  defaultMenuOpen = false,
  onMenuItemSelect,
  accent = "#2f7bff",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavAppHeaderProps) {
  const uid = React.useId();
  const [innerTab, setInnerTab] = React.useState(defaultActiveTab);
  const current = activeTab ?? innerTab;
  const [menuOpen, setMenuOpen] = React.useState(defaultMenuOpen);
  const tabsRef = React.useRef<HTMLUListElement>(null);
  const lineRef = React.useRef<HTMLLIElement>(null);
  const hovRef = React.useRef<HTMLLIElement>(null);
  const meRef = React.useRef<HTMLDivElement>(null);
  const avRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const isMac = React.useSyncExternalStore(
    noop,
    () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => true,
  );

  const placeLine = React.useCallback(() => {
    const list = tabsRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    const el = list.querySelector<HTMLElement>(`[data-hb-yh5-i="${current}"]`);
    if (!el) return;
    line.style.setProperty("--hb-yh5-lx", `${(el.offsetLeft + 8).toFixed(1)}px`);
    line.style.setProperty("--hb-yh5-lw", `${Math.max(0, el.offsetWidth - 16).toFixed(1)}px`);
  }, [current]);

  React.useLayoutEffect(() => {
    placeLine();
    const list = tabsRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => placeLine());
    ro.observe(list);
    return () => ro.disconnect();
  }, [placeLine]);

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

  function hover(el: HTMLElement | null) {
    const h = hovRef.current;
    if (!h) return;
    if (!el) {
      h.style.opacity = "0";
      return;
    }
    h.style.setProperty("--hb-yh5-hx", `${el.offsetLeft.toFixed(1)}px`);
    h.style.setProperty("--hb-yh5-hw", `${el.offsetWidth.toFixed(1)}px`);
    h.style.opacity = "1";
  }

  function pick(i: number) {
    if (activeTab === undefined) setInnerTab(i);
    onTabChange?.(i, tabs[i]!);
  }

  function items() {
    return menuRef.current ? Array.from(menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')) : [];
  }

  function openMenu(focus: "first" | "last" | null) {
    setMenuOpen(true);
    if (focus) {
      window.requestAnimationFrame(() => {
        const list = items();
        (focus === "first" ? list[0] : list[list.length - 1])?.focus();
      });
    }
  }

  function closeMenu(refocus: boolean) {
    setMenuOpen(false);
    if (refocus) avRef.current?.focus();
  }

  function onMenuKey(e: React.KeyboardEvent) {
    const list = items();
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

  function onTabsKey(e: React.KeyboardEvent) {
    const nodes = tabsRef.current ? Array.from(tabsRef.current.querySelectorAll<HTMLElement>("a")) : [];
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    let next = -1;
    if (e.key === "ArrowRight") next = (at + 1) % nodes.length;
    else if (e.key === "ArrowLeft") next = (at - 1 + nodes.length) % nodes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = nodes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    nodes[next]?.focus();
  }

  return (
    <nav
      aria-label="Project"
      className={`hb-yh5 ${className}`}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-yh5-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-nav-app-header" precedence="default">
        {css}
      </style>
      <div className="hb-yh5-bar">
        <div className="hb-yh5-top">
          <a href="#" className="hb-yh5-logo" aria-label="Home">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 12.5 8 3l5 9.5M5.2 8.5h5.6" />
            </svg>
          </a>
          <ol className="hb-yh5-crumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li
                  key={c.label}
                  className="hb-yh5-cr"
                  data-mid={!last && i > 0 ? "true" : "false"}
                  style={{ "--hb-yh5-i": i } as React.CSSProperties}
                >
                  <svg className="hb-yh5-sl" viewBox="0 0 18 22" aria-hidden="true">
                    <path d="M11.5 4 6.5 18" />
                  </svg>
                  <a href={c.href} className="hb-yh5-cl" aria-current={last ? "page" : undefined}>
                    {i === 0 && <span className="hb-yh5-ws" aria-hidden="true">{c.label[0]}</span>}
                    <span>{c.label}</span>
                    {(i === 0 || last) && (
                      <svg className="hb-yh5-ud" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="m3.5 4.5 2.5-2.5 2.5 2.5M3.5 7.5 6 10l2.5-2.5" />
                      </svg>
                    )}
                  </a>
                  {last && status && (
                    <span className="hb-yh5-status">
                      <i aria-hidden="true" />
                      {status}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <span className="hb-yh5-sp" />
          <button type="button" className="hb-yh5-search" onClick={() => onSearch?.()} aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"} aria-label={searchPlaceholder}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <span className="hb-yh5-st" aria-hidden="true">
              {searchPlaceholder}
            </span>
            <span className="hb-yh5-kbd" aria-hidden="true">
              {isMac ? "⌘K" : "Ctrl K"}
            </span>
          </button>
          <button
            type="button"
            className="hb-yh5-icon"
            onClick={() => onNotificationsClick?.()}
            aria-label={notifications > 0 ? `Notifications, ${notifications} unread` : "Notifications"}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 8.5a5 5 0 0 1 10 0c0 4 1.5 5.5 1.5 5.5h-13S5 12.5 5 8.5zM8.3 16.5a1.9 1.9 0 0 0 3.4 0" />
            </svg>
            {notifications > 0 && <b aria-hidden="true">{notifications > 9 ? "9+" : notifications}</b>}
          </button>
          {user && (
            <div ref={meRef} className="hb-yh5-me">
              <button
                ref={avRef}
                type="button"
                className="hb-yh5-av"
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
                <div ref={menuRef} id={`${uid}-menu`} role="menu" aria-label="Account" className="hb-yh5-menu" onKeyDown={onMenuKey}>
                  <div className="hb-yh5-mh" role="presentation">
                    <div className="hb-yh5-mn">{user.name}</div>
                    <div className="hb-yh5-me2">{user.email}</div>
                  </div>
                  {menu.map((item, i) => {
                    const divider = item.danger && i > 0 && !menu[i - 1]!.danger;
                    const select = () => {
                      onMenuItemSelect?.(item);
                      closeMenu(true);
                    };
                    const body = (
                      <>
                        {item.label}
                        {item.shortcut && <span className="hb-yh5-ms">{item.shortcut}</span>}
                      </>
                    );
                    return (
                      <React.Fragment key={item.label}>
                        {divider && <div className="hb-yh5-div" role="separator" />}
                        {item.href ? (
                          <a href={item.href} role="menuitem" tabIndex={-1} className="hb-yh5-mi" data-danger={item.danger ? "true" : "false"} onClick={select}>
                            {body}
                          </a>
                        ) : (
                          <button type="button" role="menuitem" tabIndex={-1} className="hb-yh5-mi" data-danger={item.danger ? "true" : "false"} onClick={select}>
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
        <ul ref={tabsRef} className="hb-yh5-tabs" onKeyDown={onTabsKey} onPointerLeave={() => hover(null)}>
          <li ref={hovRef} className="hb-yh5-hov" aria-hidden="true" />
          <li ref={lineRef} className="hb-yh5-line" aria-hidden="true" />
          {tabs.map((t, i) => (
            <li key={t.label}>
              <a
                href={t.href}
                className="hb-yh5-tab"
                data-hb-yh5-i={i}
                aria-current={i === current ? "page" : undefined}
                onPointerEnter={(e) => hover(e.currentTarget)}
                onFocus={(e) => hover(e.currentTarget)}
                onBlur={() => hover(null)}
                onClick={() => pick(i)}
              >
                {t.label}
                {t.count !== undefined && <span className="hb-yh5-ct">{t.count}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {showBackdrop && (
        <div className="hb-yh5-page" aria-hidden="true">
          <div className="hb-yh5-ph">
            <div>
              <div className="hb-yh5-pt">{tabs[current]?.label ?? "Overview"}</div>
              <div className="hb-yh5-pd">Sprint 34, ends Friday, November 14</div>
            </div>
            <div className="hb-yh5-pb">New issue</div>
          </div>
          <div className="hb-yh5-cards">
            {[
              ["Open", "24", "-3"],
              ["In review", "7", "+2"],
              ["Closed this week", "31", "+18%"],
              ["Cycle time", "2.4d", "-0.6d"],
            ].map(([k, v, d]) => (
              <div key={k} className="hb-yh5-card">
                <div className="hb-yh5-ck">{k}</div>
                <div className="hb-yh5-cv">
                  {v}
                  <em>{d}</em>
                </div>
              </div>
            ))}
          </div>
          <div className="hb-yh5-table">
            <div className="hb-yh5-tr">
              <span>ID</span>
              <span>Title</span>
              <span>Status</span>
              <span>Owner</span>
            </div>
            {rows.map((r) => (
              <div key={r.id} className="hb-yh5-tr">
                <span className="hb-yh5-id">{r.id}</span>
                <span>{r.t}</span>
                <span className="hb-yh5-tag" style={{ color: r.c, background: r.bg }}>
                  {r.s}
                </span>
                <span>{r.who}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

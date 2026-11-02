"use client";

import * as React from "react";

const ICONS = {
  inbox:
    "M3.5 11.5h3.2l.9 1.8h4.8l.9-1.8h3.2M3.5 11.5l1.8-6.2a1 1 0 0 1 1-.7h7.4a1 1 0 0 1 1 .7l1.8 6.2v3.7a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z",
  tasks: "M4 5.5l1.5 1.5L8 4.5M4 11.5L5.5 13 8 10.5M11 6h5M11 12h5",
  folder:
    "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  chart: "M4 16V9M10 16V4M16 16v-5",
  users:
    "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  calendar:
    "M4.5 5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 8.5h13M7 3.5v3M13 3.5v3",
  search: "M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14 14l3 3",
} as const;

export type SidebarWorkspaceIconName = keyof typeof ICONS;

export function SidebarWorkspaceIcon({ name }: { name: SidebarWorkspaceIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarWorkspaceSpace {
  id: string;
  name: string;
  plan?: string;
  color?: string;
}

export interface SidebarWorkspaceItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number | string;
  href?: string;
}

export interface SidebarWorkspaceSection {
  label?: string;
  items: SidebarWorkspaceItem[];
}

export interface SidebarWorkspaceFavorite {
  id: string;
  label: string;
  color?: string;
}

export interface SidebarWorkspaceUsage {
  label: string;
  used: number;
  total: number;
  caption?: string;
}

export interface SidebarWorkspaceUser {
  name: string;
  email?: string;
  color?: string;
}

export interface SidebarWorkspaceMenuItem {
  id: string;
  label: string;
  danger?: boolean;
}

export interface SidebarWorkspaceProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  workspaces?: SidebarWorkspaceSpace[];
  workspace?: string;
  defaultWorkspace?: string;
  onWorkspaceChange?: (id: string) => void;
  onCreateWorkspace?: () => void;
  sections?: SidebarWorkspaceSection[];
  favorites?: SidebarWorkspaceFavorite[];
  favoritesLabel?: string;
  defaultFavoritesOpen?: boolean;
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  usage?: SidebarWorkspaceUsage | null;
  upgradeLabel?: string;
  onUpgrade?: () => void;
  user?: SidebarWorkspaceUser | null;
  userMenu?: SidebarWorkspaceMenuItem[];
  onUserMenuSelect?: (id: string) => void;
  width?: number;
  rowHeight?: number;
  color?: string;
}

const defaultWorkspaces: SidebarWorkspaceSpace[] = [
  { id: "northwind", name: "Northwind", plan: "Team plan", color: "#2f7bff" },
  { id: "studio", name: "Fable Studio", plan: "Pro plan", color: "#e5484d" },
  { id: "personal", name: "Personal", plan: "Free plan", color: "#30a46c" },
];

const defaultSections: SidebarWorkspaceSection[] = [
  {
    items: [
      { id: "inbox", label: "Inbox", icon: <SidebarWorkspaceIcon name="inbox" />, count: 8 },
      { id: "tasks", label: "My tasks", icon: <SidebarWorkspaceIcon name="tasks" />, count: 14 },
      { id: "projects", label: "Projects", icon: <SidebarWorkspaceIcon name="folder" />, count: 6 },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "reports", label: "Reports", icon: <SidebarWorkspaceIcon name="chart" /> },
      { id: "people", label: "People", icon: <SidebarWorkspaceIcon name="users" />, count: 23 },
    ],
  },
];

const defaultFavorites: SidebarWorkspaceFavorite[] = [
  { id: "fav-roadmap", label: "Q4 roadmap", color: "#2f7bff" },
  { id: "fav-launch", label: "Launch checklist", color: "#f5a623" },
  { id: "fav-research", label: "User research", color: "#30a46c" },
];

const defaultUsage: SidebarWorkspaceUsage = { label: "Storage", used: 7.2, total: 10, caption: "7.2 of 10 GB used" };

const defaultUser: SidebarWorkspaceUser = { name: "Daniel Okoye", email: "daniel@northwind.co" };

const defaultMenu: SidebarWorkspaceMenuItem[] = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "signout", label: "Sign out", danger: true },
];

const css = `
.hb-swk {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  width: var(--hb-swk-w, 260px);
  max-width: 100%;
  height: 100%;
  min-height: 0;
  padding: 6px;
  border-right: 1px solid #262626;
  background: #111111;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 18px;
  --hb-swk-accent: #2f7bff;
}
.hb-swk *, .hb-swk *::before, .hb-swk *::after { box-sizing: border-box; }
.hb-swk-top { position: relative; flex: none; }
.hb-swk-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: calc(var(--hb-swk-row, 32px) + 8px);
  margin: 0;
  padding: 0 6px 0 5px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-swk-switch:hover, .hb-swk-switch[aria-expanded="true"] { background: #1a1a1a; border-color: #262626; }
.hb-swk-switch:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: 1px; }
.hb-swk-mark {
  display: grid;
  flex: none;
  place-items: center;
  width: calc(var(--hb-swk-row, 32px) - 6px);
  height: calc(var(--hb-swk-row, 32px) - 6px);
  min-width: 18px;
  min-height: 18px;
  border-radius: 7px;
  background: var(--hb-swk-c, #2f7bff);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2);
}
.hb-swk-who { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.hb-swk-wname { overflow: hidden; font-size: 12.5px; font-weight: 600; line-height: 14px; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-wplan { overflow: hidden; color: #8f8f8f; font-size: 10.5px; line-height: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-caret { flex: none; width: 14px; height: 14px; color: #77777f; }
.hb-swk-pop {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 30;
  padding: 4px;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: #171717;
  box-shadow: 0 18px 40px rgba(0, 0, 0, .55), 0 2px 8px rgba(0, 0, 0, .3);
  transform-origin: top center;
  animation: hb-swk-pop .16s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-swk-pop[data-up="true"] { top: auto; bottom: calc(100% + 4px); transform-origin: bottom center; }
.hb-swk-list { margin: 0; padding: 0; list-style: none; outline: 0; }
.hb-swk-opt {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 8px 0 6px;
  border-radius: 8px;
  color: #d4d4d4;
  cursor: pointer;
}
.hb-swk-opt[data-hi="true"] { background: #232323; color: #ffffff; }
.hb-swk-opt .hb-swk-mark { width: 22px; height: 22px; }
.hb-swk-list:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: 1px; border-radius: 8px; }
.hb-swk-check { flex: none; width: 14px; height: 14px; color: var(--hb-swk-accent); }
.hb-swk-sep { height: 1px; margin: 4px 2px; background: #262626; }
.hb-swk-create {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.hb-swk-create:hover { background: #232323; color: #ededed; }
.hb-swk-create:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: -2px; }
.hb-swk-create svg { width: 14px; height: 14px; }
.hb-swk-mid { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-swk-sec + .hb-swk-sec, .hb-swk-sec + .hb-swk-fav { margin-top: 8px; }
.hb-swk-label { height: 20px; padding: 0 8px; color: #77777f; font-size: 11px; font-weight: 600; letter-spacing: .05em; line-height: 20px; text-transform: uppercase; }
.hb-swk-items { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-swk-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: var(--hb-swk-row, 32px);
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-swk-item:hover { background: #1a1a1a; color: #ededed; }
.hb-swk-item[aria-current="page"] { background: #202020; color: #ffffff; }
.hb-swk-item:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: -2px; }
.hb-swk-ico { display: grid; flex: none; place-items: center; width: 16px; height: 16px; }
.hb-swk-ico svg { width: 16px; height: 16px; }
.hb-swk-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-count { flex: none; color: #77777f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-swk-item[aria-current="page"] .hb-swk-count { color: #d4d4d4; }
.hb-swk-fhead {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0 6px 0 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #77777f;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .05em;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  transition: color .15s ease;
}
.hb-swk-fhead:hover { color: #ededed; }
.hb-swk-fhead:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: -2px; }
.hb-swk-chev { flex: none; width: 12px; height: 12px; transition: transform .28s cubic-bezier(.2, .9, .2, 1); }
.hb-swk-fhead[aria-expanded="true"] .hb-swk-chev { transform: rotate(90deg); }
.hb-swk-fold {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .3s;
}
.hb-swk-fold[data-open="true"] { grid-template-rows: 1fr; visibility: visible; transition-delay: 0s; }
.hb-swk-fin { min-height: 0; overflow: hidden; }
.hb-swk-fin .hb-swk-items { padding-top: 2px; }
.hb-swk-fav-item { height: calc(var(--hb-swk-row, 32px) - 2px); }
.hb-swk-dot { flex: none; width: 8px; height: 8px; margin: 0 4px; border-radius: 999px; background: var(--hb-swk-c, #8f8f8f); }
.hb-swk-bottom { display: flex; flex: none; flex-direction: column; gap: 4px; }
.hb-swk-usage { padding: 8px 10px; border: 1px solid #262626; border-radius: 10px; background: #151515; }
.hb-swk-urow { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-swk-ulabel { overflow: hidden; font-size: 12px; font-weight: 500; line-height: 20px; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-up {
  flex: none;
  height: 20px;
  margin: 0;
  padding: 0 9px;
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .15s ease, transform .15s ease;
}
.hb-swk-up:hover { background: #ffffff; }
.hb-swk-up:active { transform: scale(.96); }
.hb-swk-up:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: 2px; }
.hb-swk-bar { position: relative; height: 4px; margin-top: 6px; overflow: hidden; border-radius: 999px; background: #262626; }
.hb-swk-fill {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hb-swk-accent), #7fb3ff);
  transform: scaleX(var(--hb-swk-p, 0));
  transform-origin: left center;
  animation: hb-swk-grow .9s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-swk-fill[data-warn="true"] { background: linear-gradient(90deg, #f5a623, #ff6b4a); }
.hb-swk-cap { margin-top: 5px; color: #8f8f8f; font-size: 11px; line-height: 14px; }
.hb-swk-userwrap { position: relative; }
.hb-swk-user {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: calc(var(--hb-swk-row, 32px) + 6px);
  margin: 0;
  padding: 0 6px 0 5px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-swk-user:hover, .hb-swk-user[aria-expanded="true"] { background: #1a1a1a; }
.hb-swk-user:focus-visible { outline: 2px solid var(--hb-swk-accent); outline-offset: 1px; }
.hb-swk-avatar {
  display: grid;
  flex: none;
  place-items: center;
  width: calc(var(--hb-swk-row, 32px) - 6px);
  height: calc(var(--hb-swk-row, 32px) - 6px);
  min-width: 18px;
  min-height: 18px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1;
}
.hb-swk-uname { overflow: hidden; font-size: 12.5px; font-weight: 600; line-height: 14px; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-mail { overflow: hidden; color: #8f8f8f; font-size: 10.5px; line-height: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-swk-menu { margin: 0; padding: 0; list-style: none; }
.hb-swk-mi {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #d4d4d4;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.hb-swk-mi:hover, .hb-swk-mi:focus-visible { background: #232323; color: #ffffff; outline: 0; }
.hb-swk-mi[data-danger="true"] { color: #ff7a85; }
@keyframes hb-swk-pop {
  from { opacity: 0; transform: translate3d(0, -4px, 0) scale(.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-swk-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(var(--hb-swk-p, 0)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-swk-switch, .hb-swk-item, .hb-swk-chev, .hb-swk-fold, .hb-swk-up, .hb-swk-user, .hb-swk-fhead { transition: none; }
  .hb-swk-pop, .hb-swk-fill { animation: none; }
}
`;

function hueOf(value: string) {
  let h = 11;
  for (let i = 0; i < value.length; i += 1) h = (Math.imul(h, 31) + value.charCodeAt(i)) >>> 0;
  return h % 360;
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${parts[0].charAt(0)}${last}`.toUpperCase();
}

function spaceColor(space: SidebarWorkspaceSpace) {
  return space.color ?? `hsl(${hueOf(space.name)} 70% 52%)`;
}

export function SidebarWorkspace({
  workspaces = defaultWorkspaces,
  workspace,
  defaultWorkspace,
  onWorkspaceChange,
  onCreateWorkspace,
  sections = defaultSections,
  favorites = defaultFavorites,
  favoritesLabel = "Favorites",
  defaultFavoritesOpen = true,
  active,
  defaultActive,
  onChange,
  usage = defaultUsage,
  upgradeLabel = "Upgrade",
  onUpgrade,
  user = defaultUser,
  userMenu = defaultMenu,
  onUserMenuSelect,
  width = 260,
  rowHeight = 32,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarWorkspaceProps) {
  const uid = React.useId();
  const topRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);
  const switchRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const userBtnRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const [innerWs, setInnerWs] = React.useState(defaultWorkspace ?? workspaces[0]?.id ?? "");
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? sections[0]?.items[0]?.id ?? "");
  const [switchOpen, setSwitchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hi, setHi] = React.useState(0);
  const [favOpen, setFavOpen] = React.useState(defaultFavoritesOpen);
  const currentWs = workspace ?? innerWs;
  const current = active ?? innerActive;
  const space = workspaces.find((w) => w.id === currentWs) ?? workspaces[0];

  React.useEffect(() => {
    if (switchOpen) listRef.current?.focus();
  }, [switchOpen]);

  React.useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
  }, [menuOpen]);

  React.useEffect(() => {
    if (!switchOpen && !menuOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (switchOpen && topRef.current && !topRef.current.contains(t)) setSwitchOpen(false);
      if (menuOpen && userRef.current && !userRef.current.contains(t)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [switchOpen, menuOpen]);

  function select(id: string) {
    if (active === undefined) setInnerActive(id);
    onChange?.(id);
  }

  function openSwitcher() {
    setHi(Math.max(0, workspaces.findIndex((w) => w.id === currentWs)));
    setMenuOpen(false);
    setSwitchOpen(true);
  }

  function chooseWorkspace(id: string) {
    if (workspace === undefined) setInnerWs(id);
    onWorkspaceChange?.(id);
    setSwitchOpen(false);
    switchRef.current?.focus();
  }

  function handleListKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const last = workspaces.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((v) => Math.min(last, v + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((v) => Math.max(0, v - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHi(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHi(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const w = workspaces[hi];
      if (w) chooseWorkspace(w.id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setSwitchOpen(false);
      switchRef.current?.focus();
    } else if (e.key === "Tab") {
      setSwitchOpen(false);
    }
  }

  function handleMenuKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(items.length - 1, at + 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[Math.max(0, at - 1)]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(false);
      userBtnRef.current?.focus();
    } else if (e.key === "Tab") {
      setMenuOpen(false);
    }
  }

  const pct = usage && usage.total > 0 ? Math.max(0, Math.min(1, usage.used / usage.total)) : 0;
  const vars = { "--hb-swk-w": `${width}px`, "--hb-swk-row": `${rowHeight}px`, "--hb-swk-accent": color, ...style } as React.CSSProperties;
  const listId = `${uid}-ws`;

  return (
    <aside className={`hb-swk ${className}`} style={vars} {...rest}>
      <style href="hb-sidebar-workspace" precedence="default">{css}</style>
      <div ref={topRef} className="hb-swk-top">
        {space ? (
          <button
            ref={switchRef}
            type="button"
            className="hb-swk-switch"
            aria-haspopup="listbox"
            aria-expanded={switchOpen}
            aria-controls={switchOpen ? listId : undefined}
            aria-label={`Workspace: ${space.name}`}
            onClick={() => (switchOpen ? setSwitchOpen(false) : openSwitcher())}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && !switchOpen) {
                e.preventDefault();
                openSwitcher();
              }
            }}
          >
            <span className="hb-swk-mark" aria-hidden="true" style={{ "--hb-swk-c": spaceColor(space) } as React.CSSProperties}>
              {space.name.charAt(0).toUpperCase()}
            </span>
            <span className="hb-swk-who">
              <span className="hb-swk-wname">{space.name}</span>
              {space.plan ? <span className="hb-swk-wplan">{space.plan}</span> : null}
            </span>
            <svg className="hb-swk-caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3" />
            </svg>
          </button>
        ) : null}
        {switchOpen ? (
          <div className="hb-swk-pop">
            <ul
              ref={listRef}
              id={listId}
              className="hb-swk-list"
              role="listbox"
              tabIndex={-1}
              aria-label="Workspaces"
              aria-activedescendant={`${listId}-${workspaces[hi]?.id}`}
              onKeyDown={handleListKey}
            >
              {workspaces.map((w, i) => (
                <li
                  key={w.id}
                  id={`${listId}-${w.id}`}
                  className="hb-swk-opt"
                  role="option"
                  aria-selected={w.id === currentWs}
                  data-hi={i === hi}
                  onMouseEnter={() => setHi(i)}
                  onClick={() => chooseWorkspace(w.id)}
                >
                  <span className="hb-swk-mark" aria-hidden="true" style={{ "--hb-swk-c": spaceColor(w) } as React.CSSProperties}>
                    {w.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hb-swk-who">
                    <span className="hb-swk-wname">{w.name}</span>
                    {w.plan ? <span className="hb-swk-wplan">{w.plan}</span> : null}
                  </span>
                  {w.id === currentWs ? (
                    <svg className="hb-swk-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  ) : null}
                </li>
              ))}
            </ul>
            {onCreateWorkspace ? (
              <>
                <div className="hb-swk-sep" />
                <button
                  type="button"
                  className="hb-swk-create"
                  onClick={() => {
                    setSwitchOpen(false);
                    onCreateWorkspace();
                  }}
                >
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M7 2.5v9M2.5 7h9" />
                  </svg>
                  Create workspace
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="hb-swk-mid">
        <nav aria-label="Workspace">
          {sections.map((section, si) => (
            <div key={section.label ?? si} className="hb-swk-sec">
              {section.label ? <div className="hb-swk-label">{section.label}</div> : null}
              <ul className="hb-swk-items" role="list">
                {section.items.map((item) => {
                  const common = {
                    className: "hb-swk-item",
                    "aria-current": item.id === current ? ("page" as const) : undefined,
                    onClick: () => select(item.id),
                  };
                  const body = (
                    <>
                      <span className="hb-swk-ico" aria-hidden="true">
                        {item.icon ?? <SidebarWorkspaceIcon name="folder" />}
                      </span>
                      <span className="hb-swk-text">{item.label}</span>
                      {item.count !== undefined && item.count !== "" ? <span className="hb-swk-count">{item.count}</span> : null}
                    </>
                  );
                  return (
                    <li key={item.id}>
                      {item.href ? (
                        <a href={item.href} {...common}>
                          {body}
                        </a>
                      ) : (
                        <button type="button" {...common}>
                          {body}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {favorites.length > 0 ? (
            <div className="hb-swk-fav">
              <button
                type="button"
                className="hb-swk-fhead"
                aria-expanded={favOpen}
                aria-controls={`${uid}-fav`}
                onClick={() => setFavOpen((v) => !v)}
              >
                <svg className="hb-swk-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3.5L10.5 8 6 12.5" />
                </svg>
                {favoritesLabel}
              </button>
              <div id={`${uid}-fav`} className="hb-swk-fold" data-open={favOpen} inert={!favOpen}>
                <div className="hb-swk-fin">
                  <ul className="hb-swk-items" role="list">
                    {favorites.map((fav) => (
                      <li key={fav.id}>
                        <button
                          type="button"
                          className="hb-swk-item hb-swk-fav-item"
                          aria-current={fav.id === current ? "page" : undefined}
                          onClick={() => select(fav.id)}
                        >
                          <span className="hb-swk-dot" aria-hidden="true" style={fav.color ? ({ "--hb-swk-c": fav.color } as React.CSSProperties) : undefined} />
                          <span className="hb-swk-text">{fav.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
      <div className="hb-swk-bottom">
        {usage ? (
          <div className="hb-swk-usage">
            <div className="hb-swk-urow">
              <span className="hb-swk-ulabel">{usage.label}</span>
              <button type="button" className="hb-swk-up" onClick={onUpgrade}>
                {upgradeLabel}
              </button>
            </div>
            <div
              className="hb-swk-bar"
              role="progressbar"
              aria-label={usage.label}
              aria-valuemin={0}
              aria-valuemax={usage.total}
              aria-valuenow={usage.used}
              aria-valuetext={usage.caption}
            >
              <span className="hb-swk-fill" data-warn={pct >= 0.85} style={{ "--hb-swk-p": pct.toFixed(3) } as React.CSSProperties} />
            </div>
            {usage.caption ? <div className="hb-swk-cap">{usage.caption}</div> : null}
          </div>
        ) : null}
        {user ? (
          <div ref={userRef} className="hb-swk-userwrap">
            {menuOpen ? (
              <div className="hb-swk-pop" data-up="true">
                <ul ref={menuRef} className="hb-swk-menu" role="menu" aria-label={user.name} onKeyDown={handleMenuKey}>
                  {userMenu.map((m) => (
                    <li key={m.id} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        className="hb-swk-mi"
                        data-danger={m.danger ? "true" : undefined}
                        onClick={() => {
                          setMenuOpen(false);
                          userBtnRef.current?.focus();
                          onUserMenuSelect?.(m.id);
                        }}
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <button
              ref={userBtnRef}
              type="button"
              className="hb-swk-user"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => {
                setSwitchOpen(false);
                setMenuOpen((v) => !v);
              }}
            >
              <span
                className="hb-swk-avatar"
                aria-hidden="true"
                style={{
                  background:
                    user.color ?? `linear-gradient(135deg, hsl(${hueOf(user.name)} 75% 60%), hsl(${(hueOf(user.name) + 50) % 360} 70% 42%))`,
                }}
              >
                {initialsOf(user.name)}
              </span>
              <span className="hb-swk-who">
                <span className="hb-swk-uname">{user.name}</span>
                {user.email ? <span className="hb-swk-mail">{user.email}</span> : null}
              </span>
              <svg className="hb-swk-caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

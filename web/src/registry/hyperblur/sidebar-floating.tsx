"use client";

import * as React from "react";

const ICONS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  inbox:
    "M3.5 11.5h3.2l.9 1.8h4.8l.9-1.8h3.2M3.5 11.5l1.8-6.2a1 1 0 0 1 1-.7h7.4a1 1 0 0 1 1 .7l1.8 6.2v3.7a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z",
  folder:
    "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  chart: "M4 16V9M10 16V4M16 16v-5",
  users:
    "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  calendar:
    "M4.5 5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 8.5h13M7 3.5v3M13 3.5v3",
  sliders: "M4 6h7M14 6h2M4 14h2M9 14h7M12.5 4v4M7.5 12v4",
  bell: "M5.5 8.5a4.5 4.5 0 0 1 9 0c0 4 1.5 5 1.5 5h-12s1.5-1 1.5-5zM8.5 16a1.7 1.7 0 0 0 3 0",
  star: "M10 3.5l2 4.2 4.5.6-3.3 3.1.8 4.5L10 13.7l-4 2.2.8-4.5L3.5 8.3l4.5-.6z",
  layers: "M10 3.5l6.5 3.3L10 10 3.5 6.8zM3.5 10.2L10 13.5l6.5-3.3M3.5 13.4L10 16.7l6.5-3.3",
} as const;

export type SidebarFloatingIconName = keyof typeof ICONS;

export function SidebarFloatingIcon({ name }: { name: SidebarFloatingIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarFloatingItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
}

export interface SidebarFloatingGroup {
  label?: string;
  items: SidebarFloatingItem[];
}

export interface SidebarFloatingUser {
  name: string;
  role?: string;
  color?: string;
  status?: "online" | "away" | "offline";
}

export interface SidebarFloatingProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups?: SidebarFloatingGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  brand?: React.ReactNode;
  user?: SidebarFloatingUser | null;
  onUserClick?: () => void;
  width?: number;
  inset?: number;
  rowHeight?: number;
  color?: string;
}

const defaultGroups: SidebarFloatingGroup[] = [
  {
    label: "Workspace",
    items: [
      { id: "home", label: "Overview", icon: <SidebarFloatingIcon name="home" /> },
      { id: "inbox", label: "Inbox", icon: <SidebarFloatingIcon name="inbox" />, badge: 4 },
      { id: "calendar", label: "Calendar", icon: <SidebarFloatingIcon name="calendar" /> },
    ],
  },
  {
    label: "Manage",
    items: [
      { id: "projects", label: "Projects", icon: <SidebarFloatingIcon name="folder" /> },
      { id: "reports", label: "Reports", icon: <SidebarFloatingIcon name="chart" /> },
      { id: "team", label: "Team", icon: <SidebarFloatingIcon name="users" /> },
    ],
  },
];

const defaultUser: SidebarFloatingUser = { name: "Maya Jensen", role: "Product designer", status: "online" };

const css = `
.hb-sbf {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: var(--hb-sbf-w, 248px);
  max-width: 100%;
  height: 100%;
  min-height: 0;
  padding: var(--hb-sbf-inset, 12px);
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 18px;
  --hb-sbf-accent: #2f7bff;
}
.hb-sbf *, .hb-sbf *::before, .hb-sbf *::after { box-sizing: border-box; }
.hb-sbf-panel {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(36, 36, 41, .74), rgba(16, 16, 19, .7));
  -webkit-backdrop-filter: blur(20px) saturate(1.5);
  backdrop-filter: blur(20px) saturate(1.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 22px 44px -10px rgba(0, 0, 0, .65), 0 2px 8px rgba(0, 0, 0, .35);
}
.hb-sbf-brand { display: flex; flex: none; align-items: center; gap: 8px; min-width: 0; padding: 4px 8px 8px; font-weight: 600; }
.hb-sbf-nav {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}
.hb-sbf-nav::-webkit-scrollbar { display: none; }
.hb-sbf-pill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--hb-sbf-ph, 0px);
  border: 1px solid rgba(47, 123, 255, .38);
  border-radius: 11px;
  background: linear-gradient(180deg, rgba(47, 123, 255, .3), rgba(47, 123, 255, .14));
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-sbf-accent) 30%, transparent), color-mix(in srgb, var(--hb-sbf-accent) 14%, transparent));
  border-color: color-mix(in srgb, var(--hb-sbf-accent) 40%, transparent);
  box-shadow: 0 0 22px -6px var(--hb-sbf-accent), inset 0 1px 0 rgba(255, 255, 255, .12);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, var(--hb-sbf-py, 0px), 0);
  transition: transform .38s cubic-bezier(.34, 1.4, .5, 1), height .3s cubic-bezier(.2, .9, .2, 1), opacity .2s ease;
}
.hb-sbf-pill[data-ready="true"] { opacity: 1; }
.hb-sbf-group { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 2px; }
.hb-sbf-label {
  height: var(--hb-sbf-lh, 20px);
  padding: 0 10px;
  color: #77777f;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .08em;
  line-height: var(--hb-sbf-lh, 20px);
  text-transform: uppercase;
}
.hb-sbf-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: var(--hb-sbf-row, 36px);
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #9c9ca5;
  font: inherit;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color .18s ease, background-color .18s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sbf-item:hover { background: rgba(255, 255, 255, .05); color: #f4f4f5; }
.hb-sbf-item[aria-current="page"] { background: transparent; color: #ffffff; }
.hb-sbf-item:focus-visible { outline: 2px solid var(--hb-sbf-accent); outline-offset: -1px; }
.hb-sbf-ico { display: grid; flex: none; place-items: center; width: 18px; height: 18px; }
.hb-sbf-ico svg { width: 18px; height: 18px; transition: transform .25s cubic-bezier(.34, 1.56, .64, 1); }
.hb-sbf-item:hover .hb-sbf-ico svg { transform: scale(1.1); }
.hb-sbf-letter { display: grid; place-items: center; width: 18px; height: 18px; border: 1px solid currentColor; border-radius: 6px; font-size: 10px; line-height: 1; }
.hb-sbf-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-sbf-badge {
  flex: none;
  min-width: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .1);
  color: #e4e4e7;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  transition: background-color .2s ease, color .2s ease;
}
.hb-sbf-item[aria-current="page"] .hb-sbf-badge { background: var(--hb-sbf-accent); color: #ffffff; }
.hb-sbf-user {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  gap: 9px;
  width: 100%;
  margin: 8px 0 0;
  padding: 7px 8px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 13px;
  background: rgba(255, 255, 255, .04);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .18s ease, border-color .18s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sbf-user:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .12); }
.hb-sbf-user:focus-visible { outline: 2px solid var(--hb-sbf-accent); outline-offset: 1px; }
.hb-sbf-avatar {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .02em;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .22);
}
.hb-sbf-dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border: 2px solid #17171a;
  border-radius: 999px;
  background: var(--hb-sbf-status, #3ecf8e);
}
.hb-sbf-dot[data-status="online"]::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 999px;
  border: 1px solid #3ecf8e;
  animation: hb-sbf-ping 2.2s ease-out infinite;
}
.hb-sbf-who { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.hb-sbf-name { overflow: hidden; font-size: 12.5px; font-weight: 600; line-height: 16px; text-overflow: ellipsis; white-space: nowrap; }
.hb-sbf-role { overflow: hidden; color: #8a8a93; font-size: 11px; line-height: 14px; text-overflow: ellipsis; white-space: nowrap; }
.hb-sbf-more { flex: none; width: 14px; height: 14px; color: #77777f; }
@keyframes hb-sbf-ping {
  0% { opacity: .9; transform: scale(.8); }
  80%, 100% { opacity: 0; transform: scale(1.7); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-sbf-pill, .hb-sbf-item, .hb-sbf-ico svg, .hb-sbf-badge, .hb-sbf-user { transition: none; }
  .hb-sbf-dot[data-status="online"]::after { animation: none; display: none; }
}
`;

function hashName(value: string) {
  let h = 7;
  for (let i = 0; i < value.length; i += 1) h = (Math.imul(h, 31) + value.charCodeAt(i)) >>> 0;
  return h % 360;
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${last}`.toUpperCase();
}

const statusColor = { online: "#3ecf8e", away: "#f5a623", offline: "#6b6b73" } as const;

export function SidebarFloating({
  groups = defaultGroups,
  active,
  defaultActive,
  onChange,
  brand,
  user = defaultUser,
  onUserClick,
  width = 248,
  inset = 12,
  rowHeight = 36,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarFloatingProps) {
  const navRef = React.useRef<HTMLElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const placedRef = React.useRef(false);
  const all = React.useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? all[0]?.id ?? "");
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? innerActive;
  const currentRef = React.useRef(current);

  const place = React.useCallback((instant: boolean) => {
    const pill = pillRef.current;
    if (!pill) return;
    const el = itemRefs.current.get(currentRef.current);
    if (!el) {
      pill.dataset.ready = "false";
      return;
    }
    if (instant) pill.style.transition = "none";
    pill.style.setProperty("--hb-sbf-ph", `${el.offsetHeight}px`);
    pill.style.setProperty("--hb-sbf-py", `${el.offsetTop}px`);
    pill.dataset.ready = "true";
    if (instant) {
      void pill.offsetHeight;
      pill.style.transition = "";
    }
  }, []);

  React.useEffect(() => {
    currentRef.current = current;
    place(!placedRef.current);
    placedRef.current = true;
  }, [current, groups, rowHeight, place]);

  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => place(true);
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [place]);

  function select(id: string) {
    if (active === undefined) setInnerActive(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (all.length === 0) return;
    const ids = all.map((i) => i.id);
    const here = ids.indexOf(focusId);
    let next = -1;
    if (e.key === "ArrowDown") next = here < 0 ? 0 : Math.min(ids.length - 1, here + 1);
    else if (e.key === "ArrowUp") next = here < 0 ? ids.length - 1 : Math.max(0, here - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ids.length - 1;
    if (next < 0) return;
    e.preventDefault();
    itemRefs.current.get(ids[next])?.focus();
  }

  const tabStop = all.some((i) => i.id === focusId)
    ? focusId
    : all.some((i) => i.id === current)
      ? current
      : all[0]?.id;

  const vars = {
    "--hb-sbf-w": `${width}px`,
    "--hb-sbf-inset": `${inset}px`,
    "--hb-sbf-row": `${rowHeight}px`,
    "--hb-sbf-accent": color,
    ...style,
  } as React.CSSProperties;

  const hue = user ? hashName(user.name) : 0;
  const status = user?.status ?? "online";

  return (
    <aside className={`hb-sbf ${className}`} style={vars} {...rest}>
      <style href="hb-sidebar-floating" precedence="default">{css}</style>
      <div className="hb-sbf-panel">
        {brand ? <div className="hb-sbf-brand">{brand}</div> : null}
        <nav ref={navRef} className="hb-sbf-nav" aria-label="Main" onKeyDown={handleKeyDown}>
          <span ref={pillRef} className="hb-sbf-pill" aria-hidden="true" />
          {groups.map((group, gi) => (
            <div key={group.label ?? gi}>
              {group.label ? <div className="hb-sbf-label">{group.label}</div> : null}
              <ul className="hb-sbf-group" role="list">
                {group.items.map((item) => {
                  const selected = item.id === current;
                  const setRef = (el: HTMLElement | null) => {
                    if (el) itemRefs.current.set(item.id, el);
                    else itemRefs.current.delete(item.id);
                  };
                  const content = (
                    <>
                      <span className="hb-sbf-ico" aria-hidden="true">
                        {item.icon ?? <span className="hb-sbf-letter">{item.label.charAt(0).toUpperCase()}</span>}
                      </span>
                      <span className="hb-sbf-text">{item.label}</span>
                      {item.badge !== undefined && item.badge !== "" ? <span className="hb-sbf-badge">{item.badge}</span> : null}
                    </>
                  );
                  const common = {
                    className: "hb-sbf-item",
                    "aria-current": selected ? ("page" as const) : undefined,
                    tabIndex: item.id === tabStop ? 0 : -1,
                    onFocus: () => setFocusId(item.id),
                    onClick: () => select(item.id),
                  };
                  return (
                    <li key={item.id}>
                      {item.href ? (
                        <a ref={setRef} href={item.href} {...common}>
                          {content}
                        </a>
                      ) : (
                        <button ref={setRef} type="button" {...common}>
                          {content}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        {user ? (
          <button type="button" className="hb-sbf-user" onClick={onUserClick} aria-label={`${user.name}, ${status}`}>
            <span
              className="hb-sbf-avatar"
              aria-hidden="true"
              style={{
                background: user.color ?? `linear-gradient(135deg, hsl(${hue} 78% 62%), hsl(${(hue + 48) % 360} 70% 42%))`,
              }}
            >
              {initialsOf(user.name)}
              <span className="hb-sbf-dot" data-status={status} style={{ "--hb-sbf-status": statusColor[status] } as React.CSSProperties} />
            </span>
            <span className="hb-sbf-who">
              <span className="hb-sbf-name">{user.name}</span>
              {user.role ? <span className="hb-sbf-role">{user.role}</span> : null}
            </span>
            <svg className="hb-sbf-more" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3" />
            </svg>
          </button>
        ) : null}
      </div>
    </aside>
  );
}

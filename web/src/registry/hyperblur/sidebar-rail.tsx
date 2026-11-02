"use client";

import * as React from "react";

const ICONS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  layers: "M10 3.5l6.5 3.3L10 10 3.5 6.8zM3.5 10.2L10 13.5l6.5-3.3M3.5 13.4L10 16.7l6.5-3.3",
  chart: "M4 16V9M10 16V4M16 16v-5",
  users:
    "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  folder:
    "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  bolt: "M11 3L4.5 11h4.5l-1 6 6.5-8H10z",
  sliders: "M4 6h7M14 6h2M4 14h2M9 14h7M12.5 4v4M7.5 12v4",
  help: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8 8a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2M10 13.6v.01",
} as const;

export type SidebarRailIconName = keyof typeof ICONS;

export function SidebarRailIcon({ name }: { name: SidebarRailIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarRailLink {
  id: string;
  label: string;
  badge?: string | number;
  href?: string;
}

export interface SidebarRailItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  links?: SidebarRailLink[];
  href?: string;
}

export interface SidebarRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  items?: SidebarRailItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null) => void;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  flyoutWidth?: number;
  itemSize?: number;
  color?: string;
}

const defaultItems: SidebarRailItem[] = [
  { id: "home", label: "Home", icon: <SidebarRailIcon name="home" /> },
  {
    id: "projects",
    label: "Projects",
    icon: <SidebarRailIcon name="layers" />,
    links: [
      { id: "projects-all", label: "All projects" },
      { id: "projects-active", label: "Active", badge: 6 },
      { id: "projects-archived", label: "Archived" },
      { id: "projects-templates", label: "Templates" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <SidebarRailIcon name="chart" />,
    links: [
      { id: "analytics-traffic", label: "Traffic" },
      { id: "analytics-funnels", label: "Funnels" },
      { id: "analytics-retention", label: "Retention" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: <SidebarRailIcon name="users" />,
    links: [
      { id: "team-members", label: "Members", badge: 12 },
      { id: "team-roles", label: "Roles" },
      { id: "team-invites", label: "Invites", badge: 2 },
    ],
  },
  { id: "settings", label: "Settings", icon: <SidebarRailIcon name="sliders" /> },
];

const css = `
.hb-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 56px;
  height: 100%;
  min-height: 0;
  padding: 10px 0;
  border-right: 1px solid #262626;
  background: #0f0f0f;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 18px;
  --hb-rail-accent: #2f7bff;
}
.hb-rail *, .hb-rail *::before, .hb-rail *::after { box-sizing: border-box; }
.hb-rail-brand { display: grid; flex: none; place-items: center; width: 32px; height: 32px; margin-bottom: 10px; }
.hb-rail-list { display: flex; flex: 1; flex-direction: column; align-items: center; gap: 4px; min-height: 0; margin: 0; padding: 0; list-style: none; }
.hb-rail-li { position: relative; display: flex; justify-content: center; width: 100%; }
.hb-rail-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--hb-rail-btn, 40px);
  height: var(--hb-rail-btn, 40px);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #8f8f8f;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .18s ease, color .18s ease, transform .18s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-rail-btn svg { width: calc(var(--hb-rail-btn, 40px) * .5); height: calc(var(--hb-rail-btn, 40px) * .5); }
.hb-rail-btn:hover, .hb-rail-li[data-open="true"] > .hb-rail-btn { background: #1c1c1c; color: #ededed; }
.hb-rail-btn:active { transform: scale(.94); }
.hb-rail-btn[aria-current="true"] { background: #1c1c1c; color: #ffffff; }
.hb-rail-btn:focus-visible { outline: 2px solid var(--hb-rail-accent); outline-offset: 1px; }
.hb-rail-bar {
  position: absolute;
  top: 24%;
  bottom: 24%;
  left: -8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-rail-accent);
  transform: scaleY(0);
  transform-origin: center;
  transition: transform .28s cubic-bezier(.2, .9, .2, 1);
}
.hb-rail-btn[aria-current="true"] .hb-rail-bar { transform: scaleY(1); }
.hb-rail-tip {
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  z-index: 30;
  padding: 5px 9px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #171717;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .5);
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-4px, -50%, 0);
  transition: opacity .15s ease, transform .15s ease;
  visibility: hidden;
}
.hb-rail-btn:hover .hb-rail-tip,
.hb-rail-btn:focus-visible .hb-rail-tip {
  opacity: 1;
  transform: translate3d(0, -50%, 0);
  visibility: visible;
  transition-delay: .25s;
}
.hb-rail-foot { display: grid; flex: none; place-items: center; margin-top: 8px; }
.hb-rail-fly {
  position: absolute;
  top: var(--hb-rail-fy, -6px);
  left: 100%;
  z-index: 40;
  padding-left: 12px;
  animation: hb-rail-in .2s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-rail-panel {
  width: var(--hb-rail-fw, 176px);
  padding: 6px;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: #151515;
  box-shadow: 0 18px 40px rgba(0, 0, 0, .55), 0 2px 8px rgba(0, 0, 0, .3);
}
.hb-rail-title { padding: 6px 8px 8px; color: #8f8f8f; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-rail-links { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-rail-link {
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
  color: #b4b4b4;
  font: inherit;
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-rail-link:hover { background: #202020; color: #ededed; }
.hb-rail-link[aria-current="true"] { background: #1f1f1f; color: #ffffff; }
.hb-rail-link[aria-current="true"]::before {
  content: "";
  flex: none;
  width: 5px;
  height: 5px;
  margin-right: -2px;
  border-radius: 999px;
  background: var(--hb-rail-accent);
}
.hb-rail-link:focus-visible { outline: 2px solid var(--hb-rail-accent); outline-offset: -2px; }
.hb-rail-lt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-rail-count { flex: none; min-width: 18px; padding: 0 6px; border-radius: 999px; background: #262626; color: #ededed; font-size: 11px; line-height: 18px; text-align: center; }
@keyframes hb-rail-in {
  from { opacity: 0; transform: translate3d(-6px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-rail-btn, .hb-rail-bar, .hb-rail-tip, .hb-rail-link { transition: none; }
  .hb-rail-fly { animation: none; }
}
`;

export function SidebarRail({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  openId,
  defaultOpenId = null,
  onOpenChange,
  brand,
  footer,
  flyoutWidth = 176,
  itemSize = 40,
  color = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  onBlur,
  onMouseLeave,
  onMouseEnter,
  ...rest
}: SidebarRailProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const flyRef = React.useRef<HTMLDivElement>(null);
  const btnRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? "");
  const [innerOpen, setInnerOpen] = React.useState<string | null>(defaultOpenId);
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? innerActive;
  const open = openId !== undefined ? openId : innerOpen;
  const openItem = open ? items.find((i) => i.id === open && i.links && i.links.length > 0) : undefined;
  const openKey = openItem ? openItem.id : "";

  const setOpen = React.useCallback(
    (id: string | null) => {
      if (openId === undefined) setInnerOpen(id);
      onOpenChange?.(id);
    },
    [openId, onOpenChange],
  );

  const clearTimer = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  React.useEffect(() => clearTimer, [clearTimer]);

  React.useLayoutEffect(() => {
    const fly = flyRef.current;
    const root = rootRef.current;
    const li = fly?.parentElement;
    if (!fly || !root || !li) return;
    const rootH = root.clientHeight;
    const above = li.getBoundingClientRect().top - root.getBoundingClientRect().top;
    const h = fly.offsetHeight;
    const top = Math.max(-above, Math.min(-6, rootH - h - above - 6));
    fly.style.setProperty("--hb-rail-fy", `${top.toFixed(1)}px`);
  }, [openKey]);

  React.useEffect(() => {
    if (!openKey) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openKey, setOpen]);

  function select(id: string) {
    if (active === undefined) setInnerActive(id);
    onChange?.(id);
  }

  function isActive(item: SidebarRailItem) {
    return item.id === current || (item.links?.some((l) => l.id === current) ?? false);
  }

  function focusButton(id: string) {
    btnRefs.current.get(id)?.focus();
  }

  function flyoutLinks() {
    return Array.from(flyRef.current?.querySelectorAll<HTMLElement>("[data-rail-link]") ?? []);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    const inFly = !!flyRef.current && flyRef.current.contains(target);
    if (e.key === "Escape") {
      if (openKey) {
        e.preventDefault();
        setOpen(null);
        if (inFly) focusButton(openKey);
      }
      return;
    }
    if (inFly) {
      const links = flyoutLinks();
      const at = links.indexOf(target);
      let next = -1;
      if (e.key === "ArrowDown") next = Math.min(links.length - 1, at + 1);
      else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = links.length - 1;
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setOpen(null);
        focusButton(openKey);
        return;
      }
      if (next >= 0) {
        e.preventDefault();
        links[next]?.focus();
      }
      return;
    }
    const id = target.dataset.railItem;
    if (!id) return;
    const ids = items.map((i) => i.id);
    const here = ids.indexOf(id);
    const item = items[here];
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(ids.length - 1, here + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, here - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ids.length - 1;
    if (next >= 0) {
      e.preventDefault();
      focusButton(ids[next]);
      return;
    }
    if (item?.links && item.links.length > 0 && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
      e.preventDefault();
      if (open !== item.id) setOpen(item.id);
      requestAnimationFrame(() => flyoutLinks()[0]?.focus());
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    onBlur?.(e);
    const next = e.relatedTarget as Node | null;
    if (next && rootRef.current && !rootRef.current.contains(next)) setOpen(null);
  }

  const tabStop = items.some((i) => i.id === focusId)
    ? focusId
    : (items.find((i) => isActive(i))?.id ?? items[0]?.id);

  const vars = { "--hb-rail-accent": color, "--hb-rail-fw": `${flyoutWidth}px`, "--hb-rail-btn": `${itemSize}px`, ...style } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      className={`hb-rail ${className}`}
      aria-label="Primary"
      style={vars}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        clearTimer();
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        clearTimer();
        if (openKey) timer.current = setTimeout(() => setOpen(null), 160);
      }}
      {...rest}
    >
      <style href="hb-sidebar-rail" precedence="default">{css}</style>
      {brand ? <div className="hb-rail-brand">{brand}</div> : null}
      <ul className="hb-rail-list" role="list">
        {items.map((item) => {
          const hasLinks = !!item.links && item.links.length > 0;
          const isOpen = openKey === item.id;
          const selected = isActive(item);
          const setRef = (el: HTMLElement | null) => {
            if (el) btnRefs.current.set(item.id, el);
            else btnRefs.current.delete(item.id);
          };
          const flyId = `${uid}-${item.id}`;
          const common = {
            className: "hb-rail-btn",
            "data-rail-item": item.id,
            "aria-current": selected ? (true as const) : undefined,
            "aria-label": item.label,
            tabIndex: item.id === tabStop ? 0 : -1,
            onFocus: () => {
              setFocusId(item.id);
              clearTimer();
              if (hasLinks) {
                if (open !== item.id) setOpen(item.id);
              } else if (open) setOpen(null);
            },
            onMouseEnter: () => {
              clearTimer();
              if (hasLinks) {
                if (open !== item.id) setOpen(item.id);
              } else if (open) setOpen(null);
            },
          };
          const inner = (
            <>
              <span className="hb-rail-bar" aria-hidden="true" />
              {item.icon ?? <SidebarRailIcon name="layers" />}
              {hasLinks ? null : (
                <span className="hb-rail-tip" aria-hidden="true">
                  {item.label}
                </span>
              )}
            </>
          );
          return (
            <li key={item.id} className="hb-rail-li" data-open={isOpen}>
              {item.href && !hasLinks ? (
                <a ref={setRef} href={item.href} {...common} onClick={() => select(item.id)}>
                  {inner}
                </a>
              ) : (
                <button
                  ref={setRef}
                  type="button"
                  {...common}
                  aria-haspopup={hasLinks ? "true" : undefined}
                  aria-expanded={hasLinks ? isOpen : undefined}
                  aria-controls={hasLinks && isOpen ? flyId : undefined}
                  onClick={() => {
                    if (hasLinks) {
                      if (!isOpen) setOpen(item.id);
                    } else select(item.id);
                  }}
                >
                  {inner}
                </button>
              )}
              {isOpen && item.links ? (
                <div ref={flyRef} id={flyId} className="hb-rail-fly" role="group" aria-label={item.label}>
                  <div className="hb-rail-panel">
                    <div className="hb-rail-title">{item.label}</div>
                    <ul className="hb-rail-links" role="list">
                      {item.links.map((link) => {
                        const linkCommon = {
                          className: "hb-rail-link",
                          "data-rail-link": link.id,
                          "aria-current": link.id === current ? (true as const) : undefined,
                          onClick: () => {
                            select(link.id);
                            setOpen(null);
                          },
                        };
                        const body = (
                          <>
                            <span className="hb-rail-lt">{link.label}</span>
                            {link.badge !== undefined && link.badge !== "" ? <span className="hb-rail-count">{link.badge}</span> : null}
                          </>
                        );
                        return (
                          <li key={link.id}>
                            {link.href ? (
                              <a href={link.href} {...linkCommon}>
                                {body}
                              </a>
                            ) : (
                              <button type="button" {...linkCommon}>
                                {body}
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      {footer ? <div className="hb-rail-foot">{footer}</div> : null}
    </nav>
  );
}

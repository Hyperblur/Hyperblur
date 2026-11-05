"use client";

import * as React from "react";

const ICONS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  calendar: "M4.5 5h11a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 8.5h13M7 3.5v3M13 3.5v3",
  message: "M4 4.5h12a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H9.5L6 17v-3.3H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z",
  folder:
    "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  chart: "M4 16V9M10 16V4M16 16v-5",
  users:
    "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
} as const;

export type SidebarIconLabelsIconName = keyof typeof ICONS;

export function SidebarIconLabelsIcon({ name }: { name: SidebarIconLabelsIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarIconLabelsItem {
  id: string;
  label: string;
  icon?: SidebarIconLabelsIconName | React.ReactNode;
  badge?: number;
}

export interface SidebarIconLabelsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  items?: SidebarIconLabelsItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  expandOnHover?: boolean;
  peek?: number;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  collapsedWidth?: number;
  expandedWidth?: number;
  itemHeight?: number;
  accent?: string;
}

const defaultItems: SidebarIconLabelsItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "messages", label: "Messages", icon: "message", badge: 3 },
  { id: "files", label: "Files", icon: "folder" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "settings", label: "Settings", icon: "gear" },
];

const css = `
.hb-yc3 {
  --hb-yc3-a: #2f7bff;
  --hb-yc3-cw: 56px;
  --hb-yc3-ew: 184px;
  --hb-yc3-h: 40px;
  --hb-yc3-gap: 4px;
  position: relative;
  z-index: 20;
  flex: none;
  box-sizing: border-box;
  width: var(--hb-yc3-cw);
  height: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc3 *, .hb-yc3 *::before, .hb-yc3 *::after { box-sizing: border-box; }
.hb-yc3-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: var(--hb-yc3-cw);
  padding: 10px 8px;
  overflow: hidden;
  border-right: 1px solid #262626;
  background: #0f0f0f;
  transition: width .32s cubic-bezier(.2, .9, .2, 1), box-shadow .32s ease, background-color .32s ease;
}
.hb-yc3-panel[data-open="true"] {
  width: var(--hb-yc3-ew);
  background: #121212;
  box-shadow: 18px 0 44px rgba(0, 0, 0, .55);
}
.hb-yc3-brand { display: flex; flex: none; align-items: center; height: 36px; margin-bottom: 8px; padding-left: 4px; overflow: hidden; white-space: nowrap; }
.hb-yc3-list { position: relative; display: flex; flex-direction: column; flex: none; gap: var(--hb-yc3-gap); margin: 0; padding: 0; list-style: none; }
.hb-yc3-ind {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: var(--hb-yc3-h);
  border-radius: 11px;
  background: color-mix(in srgb, var(--hb-yc3-a) 16%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-yc3-a) 28%, transparent);
  pointer-events: none;
  transform: translateY(calc(var(--hb-yc3-i, 0) * (var(--hb-yc3-h) + var(--hb-yc3-gap))));
  transition: transform .4s cubic-bezier(.3, 1.25, .4, 1), opacity .2s ease;
}
.hb-yc3-ind[data-on="false"] { opacity: 0; }
.hb-yc3-ind::before {
  content: "";
  position: absolute;
  top: 9px;
  bottom: 9px;
  left: -8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-yc3-a);
  box-shadow: 0 0 12px var(--hb-yc3-a);
}
.hb-yc3-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--hb-yc3-h);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .16s ease, color .16s ease;
}
.hb-yc3-item:hover { background: rgba(255, 255, 255, .05); color: #ededed; }
.hb-yc3-item[aria-current="true"] { color: #ffffff; }
.hb-yc3-item:focus-visible { outline: 2px solid var(--hb-yc3-a); outline-offset: -2px; }
.hb-yc3-ico { position: relative; display: grid; flex: none; place-items: center; width: calc(var(--hb-yc3-cw) - 17px); height: 100%; }
.hb-yc3-ico svg { width: 20px; height: 20px; transition: transform .2s ease, color .2s ease; }
.hb-yc3-item[aria-current="true"] .hb-yc3-ico svg { color: var(--hb-yc3-a); }
.hb-yc3-item:active .hb-yc3-ico svg { transform: scale(.88); }
.hb-yc3-pip {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 8px;
  height: 8px;
  border: 2px solid #0f0f0f;
  border-radius: 999px;
  background: #e5484d;
  transition: opacity .2s ease;
}
.hb-yc3-panel[data-open="true"] .hb-yc3-pip { opacity: 0; }
.hb-yc3-lab {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity .12s ease, transform .2s ease;
}
.hb-yc3-panel[data-open="true"] .hb-yc3-lab { opacity: 1; transform: none; transition: opacity .22s ease .08s, transform .3s cubic-bezier(.2, .9, .2, 1) .06s; }
.hb-yc3-cnt {
  flex: none;
  min-width: 20px;
  margin-right: 8px;
  padding: 0 6px;
  border-radius: 999px;
  background: #e5484d;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  opacity: 0;
  transition: opacity .12s ease;
}
.hb-yc3-panel[data-open="true"] .hb-yc3-cnt { opacity: 1; transition: opacity .22s ease .1s; }
.hb-yc3-foot { display: flex; flex: none; align-items: center; margin-top: auto; padding-left: 4px; overflow: hidden; white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-yc3-panel, .hb-yc3-ind, .hb-yc3-item, .hb-yc3-lab, .hb-yc3-cnt, .hb-yc3-pip, .hb-yc3-ico svg { transition: none !important; }
}
`;

export function SidebarIconLabels({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  open,
  onOpenChange,
  expandOnHover = true,
  peek = 0,
  brand,
  footer,
  collapsedWidth = 56,
  expandedWidth = 184,
  itemHeight = 40,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: SidebarIconLabelsProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const seen = React.useRef(true);
  const lastOpen = React.useRef(false);
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const [hover, setHover] = React.useState(false);
  const [focusIn, setFocusIn] = React.useState(false);
  const [peeking, setPeeking] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? inner;
  const engaged = hover || focusIn;
  const derived = (expandOnHover ? engaged : focusIn) || peeking;
  const expanded = open ?? (derived && !dismissed);
  const ids = items.map((i) => i.id);
  const tabStop = ids.includes(focusId) ? focusId : ids.includes(current) ? current : ids[0];
  const activeIndex = ids.indexOf(current);

  React.useEffect(() => {
    if (lastOpen.current !== expanded) {
      lastOpen.current = expanded;
      onOpenChange?.(expanded);
    }
  }, [expanded, onOpenChange]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      seen.current = entry?.isIntersecting ?? true;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (peek <= 0 || engaged) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (seen.current) setPeeking((p) => !p);
    }, peek);
    return () => window.clearInterval(id);
  }, [peek, engaged]);

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      setDismissed(true);
      setPeeking(false);
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc3-item")) return;
    const list = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc3-item]") ?? []);
    const at = list.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next >= 0) {
      e.preventDefault();
      list[next]?.focus();
    }
  }

  const vars = {
    "--hb-yc3-a": accent,
    "--hb-yc3-cw": `${collapsedWidth}px`,
    "--hb-yc3-ew": `${expandedWidth}px`,
    "--hb-yc3-h": `${itemHeight}px`,
    "--hb-yc3-i": Math.max(0, activeIndex),
    ...style,
  } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      className={`hb-yc3 ${className}`}
      aria-label="Primary"
      style={vars}
      onKeyDown={handleKeyDown}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setHover(true);
        setPeeking(false);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setHover(false);
        setDismissed(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setFocusIn(true);
        setPeeking(false);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusIn(false);
          setDismissed(false);
        }
      }}
      {...rest}
    >
      <style href="hb-sidebar-icon-labels" precedence="default">{css}</style>
      <div className="hb-yc3-panel" data-open={expanded}>
        {brand ? <div className="hb-yc3-brand">{brand}</div> : null}
        <ul className="hb-yc3-list" role="list">
          <li className="hb-yc3-ind" data-on={activeIndex >= 0} aria-hidden="true" />
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="hb-yc3-item"
                data-yc3-item=""
                aria-current={item.id === current ? true : undefined}
                tabIndex={item.id === tabStop ? 0 : -1}
                onFocus={() => setFocusId(item.id)}
                onClick={() => select(item.id)}
              >
                <span className="hb-yc3-ico">
                  {typeof item.icon === "string" || item.icon === undefined ? (
                    <SidebarIconLabelsIcon name={(item.icon as SidebarIconLabelsIconName | undefined) ?? "home"} />
                  ) : (
                    item.icon
                  )}
                  {item.badge ? <span className="hb-yc3-pip" aria-hidden="true" /> : null}
                </span>
                <span className="hb-yc3-lab">{item.label}</span>
                {item.badge ? (
                  <span className="hb-yc3-cnt" aria-label={`${item.badge} new`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        {footer ? <div className="hb-yc3-foot">{footer}</div> : null}
      </div>
    </nav>
  );
}

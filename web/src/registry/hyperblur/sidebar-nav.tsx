"use client";

import * as React from "react";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
}

export interface SidebarNavGroup {
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups: SidebarNavGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  color?: string;
}

const css = `
.hb-sb {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--hb-sb-w, 240px);
  height: 100%;
  min-height: 0;
  border-right: 1px solid #262626;
  background: #111111;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  transition: width .3s cubic-bezier(.2, .9, .2, 1);
  --hb-sb-accent: #2f7bff;
}
.hb-sb[data-collapsed="true"] { width: 64px; }
.hb-sb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-sizing: border-box;
  height: var(--hb-sb-headh, 52px);
  padding: 0 12px 0 16px;
  flex: none;
}
.hb-sb[data-collapsed="true"] .hb-sb-head { justify-content: center; padding: 0 12px; }
.hb-sb-brand {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity .2s ease, max-width .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-sb[data-collapsed="true"] .hb-sb-brand { flex: none; max-width: 0; opacity: 0; pointer-events: none; }
.hb-sb-toggle {
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sb-toggle:hover { background: #1f1f1f; color: #ededed; }
.hb-sb-toggle:focus-visible { outline: 2px solid var(--hb-sb-accent); outline-offset: 1px; }
.hb-sb-toggle svg { width: 16px; height: 16px; transition: transform .3s cubic-bezier(.2, .9, .2, 1); }
.hb-sb[data-collapsed="true"] .hb-sb-toggle svg { transform: rotate(180deg); }
.hb-sb-nav {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  padding: 6px 12px;
}
.hb-sb-ind {
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: var(--hb-sb-ih, 0px);
  border-radius: 8px;
  background: #1f1f1f;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, var(--hb-sb-iy, 0px), 0);
  transition: transform .32s cubic-bezier(.2, .9, .2, 1), height .32s cubic-bezier(.2, .9, .2, 1), opacity .2s ease;
}
.hb-sb-ind::before {
  content: "";
  position: absolute;
  left: -12px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-sb-accent);
}
.hb-sb-ind[data-ready="true"] { opacity: 1; }
.hb-sb-group { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-sb-glabel {
  height: 18px;
  padding: 0 10px;
  overflow: hidden;
  color: #8f8f8f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 18px;
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity .2s ease;
}
.hb-sb[data-collapsed="true"] .hb-sb-glabel { opacity: 0; }
.hb-sb-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  height: var(--hb-sb-row, 36px);
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sb-item:hover { color: #ededed; background: rgba(255, 255, 255, .04); }
.hb-sb-item[aria-current="page"] { color: #ededed; background: transparent; }
.hb-sb-item:focus-visible { outline: 2px solid var(--hb-sb-accent); outline-offset: -2px; }
.hb-sb-ico { display: grid; flex: none; place-items: center; width: 20px; height: 20px; }
.hb-sb-ico svg { width: 18px; height: 18px; }
.hb-sb-letter {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid currentColor;
  border-radius: 5px;
  font-size: 10px;
  line-height: 1;
}
.hb-sb-label {
  flex: 1;
  min-width: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity .2s ease, max-width .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-sb[data-collapsed="true"] .hb-sb-label { flex: none; max-width: 0; opacity: 0; }
.hb-sb[data-collapsed="true"] .hb-sb-item { gap: 0; }
.hb-sb-badge {
  flex: none;
  min-width: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #262626;
  color: #ededed;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  transition: opacity .2s ease;
}
.hb-sb-item[aria-current="page"] .hb-sb-badge { background: var(--hb-sb-accent); color: #ffffff; }
.hb-sb[data-collapsed="true"] .hb-sb-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 8px;
  height: 8px;
  padding: 0;
  overflow: hidden;
  border: 2px solid #111111;
  box-sizing: content-box;
  background: var(--hb-sb-accent);
  font-size: 0;
  line-height: 0;
  color: transparent;
}
.hb-sb-tip {
  position: absolute;
  top: 50%;
  left: calc(100% + 12px);
  z-index: 20;
  padding: 5px 9px;
  border: 1px solid #262626;
  border-radius: 8px;
  background: #171717;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .5);
  color: #ededed;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-4px, -50%, 0);
  transition: opacity .15s ease, transform .15s ease;
  visibility: hidden;
}
.hb-sb[data-collapsed="true"] .hb-sb-item:hover .hb-sb-tip,
.hb-sb[data-collapsed="true"] .hb-sb-item:focus-visible .hb-sb-tip {
  opacity: 1;
  transform: translate3d(0, -50%, 0);
  visibility: visible;
}
.hb-sb-foot {
  flex: none;
  box-sizing: border-box;
  max-width: 100%;
  padding: 12px;
  overflow: hidden;
  border-top: 1px solid #262626;
}
@media (prefers-reduced-motion: reduce) {
  .hb-sb, .hb-sb-brand, .hb-sb-toggle, .hb-sb-toggle svg, .hb-sb-ind, .hb-sb-glabel,
  .hb-sb-item, .hb-sb-label, .hb-sb-badge, .hb-sb-tip { transition: none; }
}
`;

function ChevronsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 4L5.5 8l4 4" />
    </svg>
  );
}

export function SidebarNav({
  groups,
  active,
  defaultActive,
  onChange,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  width = 240,
  brand,
  footer,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarNavProps) {
  const navRef = React.useRef<HTMLElement>(null);
  const indRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const placedRef = React.useRef(false);
  const all = React.useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? all[0]?.id ?? "");
  const [innerCollapsed, setInnerCollapsed] = React.useState(defaultCollapsed);
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? innerActive;
  const isCollapsed = collapsed ?? innerCollapsed;
  const currentRef = React.useRef(current);

  const place = React.useCallback((instant: boolean) => {
    const ind = indRef.current;
    if (!ind) return;
    const el = itemRefs.current.get(currentRef.current);
    if (!el) {
      ind.dataset.ready = "false";
      return;
    }
    if (instant) ind.style.transition = "none";
    ind.style.setProperty("--hb-sb-ih", `${el.offsetHeight}px`);
    ind.style.setProperty("--hb-sb-iy", `${el.offsetTop}px`);
    ind.dataset.ready = "true";
    if (instant) {
      void ind.offsetHeight;
      ind.style.transition = "";
    }
  }, []);

  React.useEffect(() => {
    currentRef.current = current;
    place(!placedRef.current);
    placedRef.current = true;
  }, [current, groups, place]);

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

  function toggle() {
    const next = !isCollapsed;
    if (collapsed === undefined) setInnerCollapsed(next);
    onCollapsedChange?.(next);
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

  const vars = { "--hb-sb-w": `${width}px`, "--hb-sb-accent": color, ...style } as React.CSSProperties;

  return (
    <aside className={`hb-sb ${className}`} data-collapsed={isCollapsed} style={vars} {...rest}>
      <style href="hb-sidebar-nav" precedence="default">{css}</style>
      <div className="hb-sb-head">
        {brand ? <div className="hb-sb-brand">{brand}</div> : null}
        <button
          type="button"
          className="hb-sb-toggle"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          onClick={toggle}
        >
          <ChevronsIcon />
        </button>
      </div>
      <nav ref={navRef} className="hb-sb-nav" aria-label="Main" onKeyDown={handleKeyDown}>
        <span ref={indRef} className="hb-sb-ind" aria-hidden="true" />
        {groups.map((group, gi) => (
          <div key={group.label ?? gi}>
            {group.label ? <div className="hb-sb-glabel">{group.label}</div> : null}
            <ul className="hb-sb-group" role="list">
              {group.items.map((item) => {
                const selected = item.id === current;
                const setRef = (el: HTMLElement | null) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                };
                const content = (
                  <>
                    <span className="hb-sb-ico" aria-hidden="true">
                      {item.icon ?? <span className="hb-sb-letter">{item.label.charAt(0).toUpperCase()}</span>}
                    </span>
                    <span className="hb-sb-label">{item.label}</span>
                    {item.badge !== undefined && item.badge !== "" ? (
                      <span className="hb-sb-badge">{item.badge}</span>
                    ) : null}
                    <span className="hb-sb-tip" aria-hidden="true">
                      {item.label}
                    </span>
                  </>
                );
                const common = {
                  className: "hb-sb-item",
                  "aria-current": selected ? ("page" as const) : undefined,
                  "aria-label": isCollapsed
                    ? item.badge !== undefined && item.badge !== ""
                      ? `${item.label}, ${item.badge}`
                      : item.label
                    : undefined,
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
      {footer ? <div className="hb-sb-foot">{footer}</div> : null}
    </aside>
  );
}

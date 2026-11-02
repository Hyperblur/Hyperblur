"use client";

import * as React from "react";

const ICONS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  search: "M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14 14l3 3",
  chat: "M4 5.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 16 5.5v6a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3h0A1.5 1.5 0 0 1 4 11.5z",
  bookmark: "M6 3.8h8a1 1 0 0 1 1 1V16l-5-3.2L5 16V4.8a1 1 0 0 1 1-1z",
  sliders: "M4 6h7M14 6h2M4 14h2M9 14h7M12.5 4v4M7.5 12v4",
  bell: "M5.5 8.5a4.5 4.5 0 0 1 9 0c0 4 1.5 5 1.5 5h-12s1.5-1 1.5-5zM8.5 16a1.7 1.7 0 0 0 3 0",
  menu: "M3.5 6h13M3.5 10h13M3.5 14h13",
} as const;

export type SidebarDrawerIconName = keyof typeof ICONS;

export function SidebarDrawerIcon({ name }: { name: SidebarDrawerIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarDrawerItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
}

export interface SidebarDrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue" | "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
  items?: SidebarDrawerItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  closeOnSelect?: boolean;
  rowHeight?: number;
  position?: "absolute" | "fixed";
  width?: number | string;
  label?: string;
  color?: string;
}

const defaultItems: SidebarDrawerItem[] = [
  { id: "home", label: "Home", icon: <SidebarDrawerIcon name="home" /> },
  { id: "search", label: "Search", icon: <SidebarDrawerIcon name="search" /> },
  { id: "messages", label: "Messages", icon: <SidebarDrawerIcon name="chat" />, badge: 3 },
  { id: "saved", label: "Saved", icon: <SidebarDrawerIcon name="bookmark" /> },
  { id: "settings", label: "Settings", icon: <SidebarDrawerIcon name="sliders" /> },
];

const css = `
.hb-sdr {
  position: absolute;
  inset: 0;
  z-index: 50;
  overflow: hidden;
  box-sizing: border-box;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 14px;
  line-height: 20px;
  pointer-events: none;
  --hb-sdr-accent: #2f7bff;
}
.hb-sdr[data-position="fixed"] { position: fixed; }
.hb-sdr *, .hb-sdr *::before, .hb-sdr *::after { box-sizing: border-box; }
.hb-sdr-scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .58);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease, visibility 0s linear .3s;
}
.hb-sdr[data-open="true"] .hb-sdr-scrim { opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
.hb-sdr-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: var(--hb-sdr-w, min(280px, 84%));
  max-width: 100%;
  border-right: 1px solid #262626;
  background: #111111;
  box-shadow: 24px 0 60px rgba(0, 0, 0, .5);
  outline: 0;
  pointer-events: auto;
  transform: translate3d(-102%, 0, 0);
  visibility: hidden;
  transition: transform .34s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .34s;
}
.hb-sdr[data-side="right"] .hb-sdr-panel {
  left: auto;
  right: 0;
  border-right: 0;
  border-left: 1px solid #262626;
  box-shadow: -24px 0 60px rgba(0, 0, 0, .5);
  transform: translate3d(102%, 0, 0);
}
.hb-sdr[data-open="true"] .hb-sdr-panel { transform: translate3d(0, 0, 0); visibility: visible; transition-delay: 0s; }
.hb-sdr-head { display: flex; flex: none; align-items: center; justify-content: space-between; gap: 8px; min-height: 52px; padding: 8px 8px 8px 16px; border-bottom: 1px solid #1f1f1f; }
.hb-sdr-title { min-width: 0; font-weight: 600; }
.hb-sdr-close {
  display: grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sdr-close:hover { background: #1f1f1f; color: #ededed; }
.hb-sdr-close:focus-visible { outline: 2px solid var(--hb-sdr-accent); outline-offset: 1px; }
.hb-sdr-close svg { width: 16px; height: 16px; }
.hb-sdr-nav { flex: 1; min-height: 0; padding: 8px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-sdr-list { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-sdr-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: var(--hb-sdr-row, 44px);
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
  transition: background-color .15s ease, color .15s ease, opacity .3s ease, transform .35s cubic-bezier(.2, .9, .2, 1);
  -webkit-tap-highlight-color: transparent;
}
.hb-sdr[data-side="right"] .hb-sdr-item { transform: translate3d(10px, 0, 0); }
.hb-sdr[data-open="true"] .hb-sdr-item {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition-delay: 0s, 0s, calc(var(--hb-sdr-i, 0) * 35ms + 90ms), calc(var(--hb-sdr-i, 0) * 35ms + 90ms);
}
.hb-sdr-item:hover { background: #1a1a1a; color: #ededed; }
.hb-sdr-item[aria-current="page"] { background: #1f1f1f; color: #ffffff; }
.hb-sdr-item:focus-visible { outline: 2px solid var(--hb-sdr-accent); outline-offset: -2px; }
.hb-sdr-ico { display: grid; flex: none; place-items: center; width: 20px; height: 20px; }
.hb-sdr-ico svg { width: 20px; height: 20px; }
.hb-sdr-item[aria-current="page"] .hb-sdr-ico { color: var(--hb-sdr-accent); }
.hb-sdr-letter { display: grid; place-items: center; width: 20px; height: 20px; border: 1px solid currentColor; border-radius: 6px; font-size: 11px; line-height: 1; }
.hb-sdr-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-sdr-badge { flex: none; min-width: 20px; padding: 0 7px; border-radius: 999px; background: var(--hb-sdr-accent); color: #ffffff; font-size: 12px; font-weight: 600; line-height: 20px; text-align: center; }
.hb-sdr-foot { flex: none; padding: 12px 16px; border-top: 1px solid #1f1f1f; color: #8f8f8f; font-size: 13px; }
@media (prefers-reduced-motion: reduce) {
  .hb-sdr-scrim, .hb-sdr-panel, .hb-sdr-item, .hb-sdr-close { transition: none; }
  .hb-sdr-item { opacity: 1; transform: none; }
}
`;

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SidebarDrawer({
  open,
  defaultOpen = false,
  onOpenChange,
  side = "left",
  items = defaultItems,
  header,
  footer,
  active,
  defaultActive,
  onChange,
  closeOnSelect = true,
  rowHeight = 44,
  position = "absolute",
  width,
  label = "Navigation menu",
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarDrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const isOpen = open ?? innerOpen;
  const current = active ?? innerActive;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const skipFocus = React.useRef(isOpen);

  React.useEffect(() => {
    if (!isOpen) {
      skipFocus.current = false;
      return;
    }
    if (skipFocus.current) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>('[aria-current="page"]') ?? panel?.querySelector<HTMLElement>(focusable) ?? panel;
    target?.focus({ preventScroll: true });
    return () => {
      if (previous && previous !== document.body && previous.isConnected) previous.focus({ preventScroll: true });
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  function select(id: string) {
    if (active === undefined) setInnerActive(id);
    onChange?.(id);
    if (closeOnSelect) setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable));
    if (nodes.length === 0) return;
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Tab") {
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (at <= 0 || document.activeElement === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (at === nodes.length - 1 || at < 0)) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    const links = Array.from(panel.querySelectorAll<HTMLElement>("[data-sdr-item]"));
    const here = links.indexOf(document.activeElement as HTMLElement);
    if (here < 0) return;
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(links.length - 1, here + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, here - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = links.length - 1;
    if (next < 0) return;
    e.preventDefault();
    links[next]?.focus();
  }

  const w = typeof width === "number" ? `${width}px` : width;
  const vars = { "--hb-sdr-accent": color, "--hb-sdr-row": `${rowHeight}px`, ...(w ? { "--hb-sdr-w": w } : null), ...style } as React.CSSProperties;

  return (
    <div className={`hb-sdr ${className}`} data-open={isOpen} data-side={side} data-position={position} style={vars} {...rest}>
      <style href="hb-sidebar-drawer" precedence="default">{css}</style>
      <div className="hb-sdr-scrim" aria-hidden="true" onClick={() => setOpen(false)} />
      <div
        ref={panelRef}
        className="hb-sdr-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-hidden={!isOpen}
        tabIndex={-1}
        inert={!isOpen}
        onKeyDown={handleKeyDown}
      >
        <div className="hb-sdr-head">
          <div className="hb-sdr-title">{header}</div>
          <button type="button" className="hb-sdr-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>
        <nav className="hb-sdr-nav" aria-label={label}>
          <ul className="hb-sdr-list" role="list">
            {items.map((item, i) => {
              const common = {
                className: "hb-sdr-item",
                "data-sdr-item": "",
                "aria-current": item.id === current ? ("page" as const) : undefined,
                style: { "--hb-sdr-i": i } as React.CSSProperties,
                onClick: () => select(item.id),
              };
              const body = (
                <>
                  <span className="hb-sdr-ico" aria-hidden="true">
                    {item.icon ?? <span className="hb-sdr-letter">{item.label.charAt(0).toUpperCase()}</span>}
                  </span>
                  <span className="hb-sdr-text">{item.label}</span>
                  {item.badge !== undefined && item.badge !== "" ? <span className="hb-sdr-badge">{item.badge}</span> : null}
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
        </nav>
        {footer ? <div className="hb-sdr-foot">{footer}</div> : null}
      </div>
    </div>
  );
}

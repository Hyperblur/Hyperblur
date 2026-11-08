"use client";

import * as React from "react";

const PATHS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  inbox: "M3 11l1.9-5.6a1 1 0 0 1 .9-.7h8.4a1 1 0 0 1 .9.7L17 11M3 11v3.8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11M3 11h4l.9 1.8h4.2L13 11h4",
  folder: "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  chart: "M4 16V9M10 16V4M16 16v-5",
  users: "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
  bolt: "M11 2.8L4.8 11h4.6L8.8 17.2 15.2 9h-4.6z",
  doc: "M5.5 2.8h6l3.5 3.5v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1zM11.5 2.8v3.5H15M7.5 10.5h5M7.5 13.5h3.5",
} as const;

export type SidebarResizableIconName = keyof typeof PATHS;

export function SidebarResizableIcon({ name }: { name: SidebarResizableIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

export interface SidebarResizableItem {
  id: string;
  label: string;
  icon?: SidebarResizableIconName | React.ReactNode;
  shortcut?: string;
  badge?: number;
}

export interface SidebarResizableGroup {
  label?: string;
  items: SidebarResizableItem[];
}

export interface SidebarResizableProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups?: SidebarResizableGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  width?: number;
  defaultWidth?: number;
  onWidthChange?: (width: number) => void;
  minWidth?: number;
  maxWidth?: number;
  collapsedWidth?: number;
  snapAt?: number;
  itemHeight?: number;
  brand?: string;
  footer?: React.ReactNode;
  accent?: string;
}

const defaultGroups: SidebarResizableGroup[] = [
  {
    label: "Workspace",
    items: [
      { id: "home", label: "Home", icon: "home", shortcut: "G H" },
      { id: "inbox", label: "Inbox", icon: "inbox", shortcut: "G I", badge: 4 },
      { id: "projects", label: "Projects", icon: "folder", shortcut: "G P" },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "reports", label: "Reports", icon: "chart", shortcut: "G R" },
      { id: "members", label: "Members", icon: "users", shortcut: "G M" },
      { id: "settings", label: "Settings", icon: "gear", shortcut: "," },
    ],
  },
];

const css = `
.hb-xk1 {
  --hb-xk1-a: #2f7bff;
  --hb-xk1-h: 34px;
  --hb-xk1-cw: 60px;
  position: relative;
  z-index: 5;
  flex: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 8px;
  border-right: 1px solid #222;
  background: linear-gradient(180deg, #111 0%, #0d0d0d 100%);
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, .02);
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
  transition: width .38s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk1[data-drag="true"] { transition: none; user-select: none; }
.hb-xk1 *, .hb-xk1 *::before, .hb-xk1 *::after { box-sizing: border-box; }
.hb-xk1-head { display: flex; flex: none; align-items: center; gap: 10px; height: 36px; margin-bottom: 6px; padding-left: 8px; overflow: hidden; white-space: nowrap; }
.hb-xk1-mark {
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(145deg, color-mix(in srgb, var(--hb-xk1-a) 100%, #fff 18%), color-mix(in srgb, var(--hb-xk1-a) 70%, #000));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .28), 0 4px 12px -4px color-mix(in srgb, var(--hb-xk1-a) 70%, transparent);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.hb-xk1-name { font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; transition: opacity .2s ease; }
.hb-xk1[data-collapsed="true"] .hb-xk1-name { opacity: 0; }
.hb-xk1-scroll { flex: 1; min-height: 0; }
.hb-xk1-group { margin: 0; padding: 0; border: 0; }
.hb-xk1-glabel {
  position: relative;
  display: block;
  height: 22px;
  padding: 6px 10px 0;
  overflow: hidden;
  color: #6f6f76;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-xk1-glabel span { transition: opacity .18s ease; }
.hb-xk1-glabel::after {
  content: "";
  position: absolute;
  top: 12px;
  left: 14px;
  width: 16px;
  height: 1px;
  background: #2c2c2c;
  opacity: 0;
  transition: opacity .18s ease;
}
.hb-xk1[data-collapsed="true"] .hb-xk1-glabel span { opacity: 0; }
.hb-xk1[data-collapsed="true"] .hb-xk1-glabel::after { opacity: 1; }
.hb-xk1-list { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-xk1-li { position: relative; }
.hb-xk1-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--hb-xk1-h);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #9a9aa1;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .16s ease, color .16s ease;
}
.hb-xk1-item:hover { background: rgba(255, 255, 255, .045); color: #ededed; }
.hb-xk1-item:focus-visible { outline: 2px solid var(--hb-xk1-a); outline-offset: -2px; }
.hb-xk1-item[aria-current="page"] {
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xk1-a) 18%, transparent), color-mix(in srgb, var(--hb-xk1-a) 6%, transparent));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xk1-a) 22%, transparent);
  color: #fff;
}
.hb-xk1-item[aria-current="page"]::before {
  content: "";
  position: absolute;
  top: 9px;
  bottom: 9px;
  left: -8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-xk1-a);
  box-shadow: 0 0 10px var(--hb-xk1-a);
}
.hb-xk1-ico { position: relative; display: grid; flex: none; place-items: center; width: calc(var(--hb-xk1-cw) - 16px); height: 100%; }
.hb-xk1-ico svg { width: 18px; height: 18px; }
.hb-xk1-item[aria-current="page"] .hb-xk1-ico svg { color: var(--hb-xk1-a); }
.hb-xk1-dot { position: absolute; top: 7px; right: 11px; width: 7px; height: 7px; border: 1.5px solid #101010; border-radius: 99px; background: #e5484d; opacity: 0; transition: opacity .2s ease; }
.hb-xk1[data-collapsed="true"] .hb-xk1-dot { opacity: 1; }
.hb-xk1-lab { flex: 1; min-width: 0; overflow: hidden; font-weight: 500; text-overflow: clip; transition: opacity .2s ease; }
.hb-xk1-kbd, .hb-xk1-cnt { flex: none; margin-right: 8px; transition: opacity .18s ease; }
.hb-xk1-kbd { padding: 0 5px; border: 1px solid #2a2a2a; border-radius: 5px; background: #151515; color: #6f6f76; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; line-height: 16px; opacity: 0; }
.hb-xk1-item:hover .hb-xk1-kbd, .hb-xk1-item:focus-visible .hb-xk1-kbd { opacity: 1; }
.hb-xk1-cnt { min-width: 18px; padding: 0 5px; border-radius: 99px; background: color-mix(in srgb, var(--hb-xk1-a) 22%, transparent); color: color-mix(in srgb, var(--hb-xk1-a) 45%, #fff); font-size: 10.5px; font-weight: 600; line-height: 17px; text-align: center; }
.hb-xk1-item:hover .hb-xk1-cnt, .hb-xk1-item:focus-visible .hb-xk1-cnt { opacity: 0; width: 0; min-width: 0; padding: 0; margin: 0; overflow: hidden; }
.hb-xk1[data-collapsed="true"] .hb-xk1-lab, .hb-xk1[data-collapsed="true"] .hb-xk1-kbd, .hb-xk1[data-collapsed="true"] .hb-xk1-cnt { opacity: 0 !important; }
.hb-xk1-tip {
  position: absolute;
  top: 50%;
  left: calc(100% + 12px);
  z-index: 10;
  display: none;
  align-items: center;
  gap: 8px;
  padding: 5px 6px 5px 10px;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  background: #1a1a1a;
  box-shadow: 0 10px 28px -8px rgba(0, 0, 0, .8), inset 0 1px 0 rgba(255, 255, 255, .05);
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-6px, -50%);
  transition: opacity .14s ease, transform .2s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk1-tip::before { content: ""; position: absolute; top: 50%; left: -5px; width: 8px; height: 8px; border-left: 1px solid #2c2c2c; border-bottom: 1px solid #2c2c2c; background: #1a1a1a; transform: translateY(-50%) rotate(45deg); }
.hb-xk1-tip kbd { padding: 0 5px; border-radius: 4px; background: #262626; color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; line-height: 16px; }
.hb-xk1[data-collapsed="true"] .hb-xk1-tip { display: inline-flex; }
.hb-xk1[data-collapsed="true"][data-drag="false"] .hb-xk1-li:hover .hb-xk1-tip,
.hb-xk1[data-collapsed="true"][data-drag="false"] .hb-xk1-item:focus-visible + .hb-xk1-tip { opacity: 1; transform: translate(0, -50%); transition-delay: .12s; }
.hb-xk1-foot { flex: none; margin-top: 6px; padding-top: 6px; border-top: 1px solid #1e1e1e; }
.hb-xk1-extra { margin-bottom: 4px; overflow: hidden; white-space: nowrap; }
.hb-xk1-fold svg { transition: transform .38s cubic-bezier(.22, 1, .36, 1); }
.hb-xk1[data-collapsed="true"] .hb-xk1-fold svg { transform: rotate(180deg); }
.hb-xk1-handle {
  position: absolute;
  top: 0;
  right: -6px;
  bottom: 0;
  z-index: 6;
  width: 12px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: col-resize;
  touch-action: none;
}
.hb-xk1-handle::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
  width: 2px;
  border-radius: 2px;
  background: var(--hb-xk1-a);
  opacity: 0;
  transform: scaleY(.4);
  transition: opacity .18s ease, transform .3s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk1-handle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 3px;
  width: 6px;
  height: 28px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #1c1c1c;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity .18s ease;
}
.hb-xk1-handle:hover::before, .hb-xk1-handle:focus-visible::before, .hb-xk1[data-drag="true"] .hb-xk1-handle::before { opacity: 1; transform: scaleY(1); }
.hb-xk1-handle:hover::after, .hb-xk1-handle:focus-visible::after, .hb-xk1[data-drag="true"] .hb-xk1-handle::after { opacity: 1; }
.hb-xk1-handle:focus-visible { outline: none; }
.hb-xk1-read {
  position: absolute;
  top: 12px;
  left: calc(100% + 10px);
  z-index: 8;
  padding: 3px 8px;
  border-radius: 99px;
  background: var(--hb-xk1-a);
  box-shadow: 0 6px 18px -6px color-mix(in srgb, var(--hb-xk1-a) 80%, transparent);
  color: #fff;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  line-height: 14px;
  white-space: nowrap;
  pointer-events: none;
  animation: hb-xk1-pop .2s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk1-read[data-snap="true"] { background: #2a2a2a; box-shadow: none; color: #ededed; }
@keyframes hb-xk1-pop { from { opacity: 0; transform: translateY(-4px) scale(.94); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk1, .hb-xk1 *, .hb-xk1 *::before, .hb-xk1 *::after { transition: none !important; animation: none !important; }
}
`;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function SidebarResizable({
  groups = defaultGroups,
  active,
  defaultActive,
  onChange,
  width,
  defaultWidth = 224,
  onWidthChange,
  minWidth = 176,
  maxWidth = 320,
  collapsedWidth = 60,
  snapAt = 128,
  itemHeight = 34,
  brand = "Linework",
  footer,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarResizableProps) {
  const allItems = groups.flatMap((g) => g.items);
  const [inner, setInner] = React.useState(defaultActive ?? allItems[0]?.id ?? "");
  const [innerW, setInnerW] = React.useState(defaultWidth);
  const [live, setLive] = React.useState<{ w: number; snap: boolean } | null>(null);
  const dragRef = React.useRef<{ x: number; w: number; moved: boolean } | null>(null);
  const rootRef = React.useRef<HTMLElement>(null);
  const current = active ?? inner;
  const committed = width ?? innerW;
  const lastOpen = React.useRef(committed > collapsedWidth ? committed : defaultWidth);
  const shown = live ? live.w : committed;
  const collapsed = shown <= collapsedWidth;
  const [focusId, setFocusId] = React.useState("");
  const ids = allItems.map((i) => i.id);
  const tabStop = ids.includes(focusId) ? focusId : ids.includes(current) ? current : ids[0];

  function commit(n: number) {
    if (n > collapsedWidth) lastOpen.current = n;
    if (width === undefined) setInnerW(n);
    onWidthChange?.(n);
  }

  function toggle() {
    commit(committed <= collapsedWidth ? clamp(lastOpen.current, minWidth, maxWidth) : collapsedWidth);
  }

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, w: committed, moved: false };
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 3) return;
    d.moved = true;
    const raw = d.w + dx;
    const snap = raw < snapAt;
    setLive({ w: snap ? collapsedWidth : clamp(raw, minWidth, maxWidth), snap });
  }

  function onPointerUp() {
    const d = dragRef.current;
    dragRef.current = null;
    if (d?.moved && live) commit(Math.round(live.w));
    setLive(null);
  }

  function onHandleKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = committed <= collapsedWidth ? minWidth : clamp(committed + 16, minWidth, maxWidth);
    else if (e.key === "ArrowLeft") next = committed - 16 < minWidth ? collapsedWidth : committed - 16;
    else if (e.key === "Home") next = collapsedWidth;
    else if (e.key === "End") next = maxWidth;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
      return;
    }
    if (next !== null) {
      e.preventDefault();
      commit(next);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-xk1-item")) return;
    const list = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-xk1-item]") ?? []);
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
    "--hb-xk1-a": accent,
    "--hb-xk1-h": `${itemHeight}px`,
    "--hb-xk1-cw": `${collapsedWidth}px`,
    width: `${Math.round(shown)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      aria-label="Main"
      className={`hb-xk1 ${className}`}
      data-collapsed={collapsed}
      data-drag={live ? "true" : "false"}
      style={vars}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <style href="hb-sidebar-resizable" precedence="default">{css}</style>
      <div className="hb-xk1-head">
        <span className="hb-xk1-mark" aria-hidden="true">{brand.slice(0, 1)}</span>
        <span className="hb-xk1-name">{brand}</span>
      </div>
      <div className="hb-xk1-scroll">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className="hb-xk1-group" role="group" aria-label={group.label}>
            {group.label ? (
              <span className="hb-xk1-glabel" aria-hidden="true">
                <span>{group.label}</span>
              </span>
            ) : null}
            <ul className="hb-xk1-list" role="list">
              {group.items.map((item) => (
                <li key={item.id} className="hb-xk1-li">
                  <button
                    type="button"
                    className="hb-xk1-item"
                    data-xk1-item=""
                    aria-current={item.id === current ? "page" : undefined}
                    tabIndex={item.id === tabStop ? 0 : -1}
                    onFocus={() => setFocusId(item.id)}
                    onClick={() => select(item.id)}
                  >
                    <span className="hb-xk1-ico">
                      {typeof item.icon === "string" || item.icon === undefined ? (
                        <SidebarResizableIcon name={(item.icon as SidebarResizableIconName | undefined) ?? "doc"} />
                      ) : (
                        item.icon
                      )}
                      {item.badge ? <span className="hb-xk1-dot" aria-hidden="true" /> : null}
                    </span>
                    <span className="hb-xk1-lab">{item.label}</span>
                    {item.badge ? <span className="hb-xk1-cnt" aria-label={`${item.badge} new`}>{item.badge}</span> : null}
                    {item.shortcut ? <kbd className="hb-xk1-kbd" aria-hidden="true">{item.shortcut}</kbd> : null}
                  </button>
                  <span className="hb-xk1-tip" aria-hidden="true">
                    {item.label}
                    {item.badge ? <kbd>{item.badge} new</kbd> : item.shortcut ? <kbd>{item.shortcut}</kbd> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hb-xk1-foot">
        {footer ? <div className="hb-xk1-extra">{footer}</div> : null}
        <div className="hb-xk1-li">
          <button type="button" className="hb-xk1-item hb-xk1-fold" aria-expanded={!collapsed} onClick={toggle}>
            <span className="hb-xk1-ico">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11.5 6l-4 4 4 4M15 4.5v11" />
              </svg>
            </span>
            <span className="hb-xk1-lab">Collapse</span>
          </button>
          <span className="hb-xk1-tip" aria-hidden="true">
            Expand
            <kbd>drag</kbd>
          </span>
        </div>
      </div>
      <button
        type="button"
        className="hb-xk1-handle"
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuemin={collapsedWidth}
        aria-valuemax={maxWidth}
        aria-valuenow={Math.round(shown)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={toggle}
        onKeyDown={onHandleKey}
      />
      {live ? (
        <span className="hb-xk1-read" data-snap={live.snap} aria-hidden="true">
          {live.snap ? "Release to collapse" : `${Math.round(live.w)} px`}
        </span>
      ) : null}
    </nav>
  );
}

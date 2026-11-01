"use client";

import * as React from "react";

export interface NotificationBellItem {
  id: string;
  title: string;
  text?: string;
  time: string;
  read?: boolean;
}

export interface NotificationBellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: NotificationBellItem[];
  count?: number;
  onMarkAllRead?: () => void;
  onOpenChange?: (open: boolean) => void;
  align?: "left" | "right";
  inline?: boolean;
  color?: string;
}

const css = `
.hb-nb {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  --hb-nb-accent: #2f7bff;
}
.hb-nb[data-inline="true"] { display: flex; width: 100%; gap: 6px; }
.hb-nb[data-inline="true"][data-align="right"] { align-items: flex-end; }
.hb-nb[data-inline="true"][data-align="left"] { align-items: flex-start; }
.hb-nb-btn {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 1px solid #262626;
  border-radius: 10px;
  background: #111111;
  color: #ededed;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-nb-btn:hover, .hb-nb-btn[aria-expanded="true"] { border-color: #333333; background: #171717; }
.hb-nb-btn:focus-visible { outline: 2px solid var(--hb-nb-accent); outline-offset: 2px; }
.hb-nb-bell { width: 18px; height: 18px; transform-origin: 50% 12%; }
.hb-nb-bell[data-ring="true"] { animation: hb-nb-ring .9s cubic-bezier(.36, .07, .19, .97) both; }
.hb-nb-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  box-sizing: content-box;
  min-width: 10px;
  height: 14px;
  padding: 0 3px;
  border: 2px solid #111111;
  border-radius: 999px;
  background: var(--hb-nb-accent);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  line-height: 14px;
  text-align: center;
  pointer-events: none;
}
.hb-nb-badge[data-pop="true"] { animation: hb-nb-pop .45s cubic-bezier(.2, 1.5, .4, 1) both; }
.hb-nb-panel {
  z-index: 50;
  box-sizing: border-box;
  width: 320px;
  max-width: calc(100vw - 32px);
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .55);
  text-align: left;
}
.hb-nb[data-inline="false"] .hb-nb-panel {
  position: absolute;
  top: calc(100% + 8px);
  transform-origin: top right;
  animation: hb-nb-drop .2s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-nb[data-inline="false"][data-align="right"] .hb-nb-panel { right: 0; transform-origin: top right; }
.hb-nb[data-inline="false"][data-align="left"] .hb-nb-panel { left: 0; transform-origin: top left; }
.hb-nb[data-inline="true"] .hb-nb-panel { width: 100%; max-width: none; box-shadow: none; }
.hb-nb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;
  height: 38px;
  padding: 0 8px 0 14px;
  border-bottom: 1px solid #262626;
}
.hb-nb-title { font-size: 13px; font-weight: 600; }
.hb-nb-mark {
  margin: 0;
  padding: 4px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--hb-nb-accent);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, opacity .15s ease;
}
.hb-nb-mark:hover { background: #1f1f1f; }
.hb-nb-mark:focus-visible { outline: 2px solid var(--hb-nb-accent); outline-offset: 1px; }
.hb-nb-mark:disabled { color: #8f8f8f; cursor: default; opacity: .6; background: transparent; }
.hb-nb-list {
  max-height: 320px;
  margin: 0;
  padding: 4px;
  overflow-y: auto;
  overscroll-behavior: contain;
  list-style: none;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
}
.hb-nb[data-inline="true"] .hb-nb-list { max-height: 80px; }
.hb-nb-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 8px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-nb-item:hover { background: #1a1a1a; }
.hb-nb-item:focus-visible { outline: 2px solid var(--hb-nb-accent); outline-offset: -2px; }
.hb-nb-dot {
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border: 1px solid #333333;
  border-radius: 999px;
  box-sizing: border-box;
  transition: background-color .2s ease, border-color .2s ease;
}
.hb-nb-item[data-read="false"] .hb-nb-dot { border-color: var(--hb-nb-accent); background: var(--hb-nb-accent); }
.hb-nb-main { display: flex; flex: 1; flex-direction: column; min-width: 0; gap: 2px; }
.hb-nb-name { overflow: hidden; font-size: 13px; font-weight: 500; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; }
.hb-nb-item[data-read="true"] .hb-nb-name { color: #8f8f8f; font-weight: 400; }
.hb-nb-text { color: #8f8f8f; font-size: 12px; line-height: 17px; }
.hb-nb-time { flex: none; margin-top: 2px; color: #8f8f8f; font-size: 11px; line-height: 16px; white-space: nowrap; }
.hb-nb-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-nb-empty { padding: 28px 16px; color: #8f8f8f; font-size: 13px; text-align: center; }
@keyframes hb-nb-ring {
  0% { transform: rotate(0); }
  15% { transform: rotate(16deg); }
  30% { transform: rotate(-14deg); }
  45% { transform: rotate(10deg); }
  60% { transform: rotate(-8deg); }
  75% { transform: rotate(4deg); }
  100% { transform: rotate(0); }
}
@keyframes hb-nb-pop {
  0% { transform: scale(.4); }
  60% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
@keyframes hb-nb-drop {
  from { opacity: 0; transform: translate3d(0, -6px, 0) scale(.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-nb-bell[data-ring="true"], .hb-nb-badge[data-pop="true"], .hb-nb[data-inline="false"] .hb-nb-panel { animation: none; }
  .hb-nb-btn, .hb-nb-item, .hb-nb-dot, .hb-nb-mark { transition: none; }
}
`;

export function NotificationBell({
  items,
  count,
  onMarkAllRead,
  onOpenChange,
  align = "right",
  inline = false,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: NotificationBellProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const focusFirst = React.useRef(false);
  const [open, setOpen] = React.useState(false);
  const [readIds, setReadIds] = React.useState<string[]>([]);
  const isOpen = inline || open;

  const unread = items.filter((i) => !i.read && !readIds.includes(i.id)).length;
  const total = count ?? unread;

  const [prevTotal, setPrevTotal] = React.useState(total);
  const [pops, setPops] = React.useState(0);
  const [rings, setRings] = React.useState(0);
  if (prevTotal !== total) {
    setPrevTotal(total);
    setPops((p) => p + 1);
    if (total > prevTotal) setRings((r) => r + 1);
  }

  const change = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  React.useEffect(() => {
    if (!open || inline) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) change(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, inline, change]);

  React.useEffect(() => {
    if (isOpen && focusFirst.current) {
      focusFirst.current = false;
      panelRef.current?.querySelector<HTMLElement>("button:not(:disabled)")?.focus();
    }
  }, [isOpen]);

  function markAll() {
    setReadIds(items.map((i) => i.id));
    onMarkAllRead?.();
  }

  function markOne(id: string) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && isOpen && !inline) {
      e.preventDefault();
      change(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const panel = panelRef.current;
    const buttons = panel ? Array.from(panel.querySelectorAll<HTMLElement>("button:not(:disabled)")) : [];
    const here = buttons.indexOf(document.activeElement as HTMLElement);
    if (here < 0) {
      if (e.key === "ArrowDown" && document.activeElement === btnRef.current) {
        e.preventDefault();
        if (isOpen) buttons[0]?.focus();
        else {
          focusFirst.current = true;
          change(true);
        }
      }
      return;
    }
    e.preventDefault();
    const next = e.key === "ArrowDown" ? Math.min(buttons.length - 1, here + 1) : Math.max(0, here - 1);
    buttons[next]?.focus();
  }

  const panelId = `${uid}-panel`;
  const vars = { "--hb-nb-accent": color, ...style } as React.CSSProperties;
  const label = total > 0 ? `Notifications, ${total} unread` : "Notifications";

  return (
    <div
      ref={rootRef}
      className={`hb-nb ${className}`}
      data-inline={inline}
      data-align={align}
      style={vars}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <style href="hb-notification-bell" precedence="default">{css}</style>
      <button
        ref={btnRef}
        type="button"
        className="hb-nb-btn"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          if (!inline) change(!open);
        }}
      >
        <svg
          key={`r${rings}`}
          className="hb-nb-bell"
          data-ring={rings > 0}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {total > 0 ? (
          <span key={`p${pops}`} className="hb-nb-badge" data-pop={pops > 0} aria-hidden="true">
            {total > 99 ? "99+" : total}
          </span>
        ) : null}
      </button>
      {isOpen ? (
        <div ref={panelRef} id={panelId} className="hb-nb-panel" role="region" aria-label="Notifications">
          <div className="hb-nb-head">
            <span className="hb-nb-title">Notifications</span>
            <button type="button" className="hb-nb-mark" disabled={total === 0} onClick={markAll}>
              Mark all as read
            </button>
          </div>
          {items.length === 0 ? (
            <div className="hb-nb-empty" role="status">
              You are all caught up
            </div>
          ) : (
            <ul className="hb-nb-list">
              {items.map((item) => {
                const read = Boolean(item.read) || readIds.includes(item.id);
                return (
                  <li key={item.id}>
                    <button type="button" className="hb-nb-item" data-read={read} onClick={() => markOne(item.id)}>
                      <span className="hb-nb-dot" aria-hidden="true" />
                      <span className="hb-nb-main">
                        <span className="hb-nb-name">
                          {item.title}
                          {read ? null : <span className="hb-nb-sr"> (unread)</span>}
                        </span>
                        {item.text ? <span className="hb-nb-text">{item.text}</span> : null}
                      </span>
                      <span className="hb-nb-time">{item.time}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export type ContextIconName =
  | "open"
  | "copy"
  | "cut"
  | "paste"
  | "edit"
  | "share"
  | "trash"
  | "star"
  | "link"
  | "folder"
  | "download"
  | "mail"
  | "chat";

export interface ContextMenuItem {
  id: string;
  label?: string;
  icon?: React.ReactNode | ContextIconName;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  separator?: boolean;
  items?: ContextMenuItem[];
}

export interface MenuContextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: ContextMenuItem[];
  onSelect?: (id: string) => void;
  boundary?: "viewport" | "container";
  longPress?: number;
  autoDemo?: number;
  disabled?: boolean;
  accent?: string;
}

const icons: Record<ContextIconName, React.ReactNode> = {
  open: <path d="M9 3h4v4M13 3 7.5 8.5M11 9v3c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h3" />,
  copy: (
    <>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
      <path d="M10.5 5.5V4.3a1.8 1.8 0 0 0-1.8-1.8H4.3a1.8 1.8 0 0 0-1.8 1.8v4.4a1.8 1.8 0 0 0 1.8 1.8h1.2" />
    </>
  ),
  cut: (
    <>
      <circle cx="4.5" cy="11.5" r="1.8" />
      <circle cx="11.5" cy="11.5" r="1.8" />
      <path d="m5.7 10 6.3-7.5M10.3 10 4 2.5" />
    </>
  ),
  paste: (
    <>
      <rect x="3" y="3" width="10" height="11" rx="1.8" />
      <path d="M6 3V2.5h4V3M6 7.5h4M6 10.5h3" />
    </>
  ),
  edit: <path d="m10.5 3 2.5 2.5L6 12.5l-3 .5.5-3z" />,
  share: <path d="M8 10V2.5M5 5l3-2.5L11 5M3.5 9v3.2c0 .7.6 1.3 1.3 1.3h6.4c.7 0 1.3-.6 1.3-1.3V9" />,
  trash: <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.2c0 .5.4.8.9.8h4c.5 0 .9-.3.9-.8l.6-8.2M7 7v4M9 7v4" />,
  star: <path d="m8 2.2 1.8 3.7 4 .6-2.9 2.8.7 4L8 11.4l-3.6 1.9.7-4L2.2 6.5l4-.6z" />,
  link: <path d="M6.7 9.3a2.6 2.6 0 0 0 3.7 0l2-2a2.6 2.6 0 0 0-3.7-3.7l-.7.7M9.3 6.7a2.6 2.6 0 0 0-3.7 0l-2 2a2.6 2.6 0 0 0 3.7 3.7l.7-.7" />,
  folder: <path d="M2.5 4.5c0-.6.4-1 1-1h2.7l1.3 1.5h5c.6 0 1 .4 1 1v5.5c0 .6-.4 1-1 1h-9c-.6 0-1-.4-1-1z" />,
  download: <path d="M8 2.5v8M5 7.5l3 3 3-3M3 13h10" />,
  mail: (
    <>
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.8" />
      <path d="m3 5 5 3.8L13 5" />
    </>
  ),
  chat: <path d="M3 3.5h10v7H8l-3 2.5v-2.5H3z" />,
};

const defaultItems: ContextMenuItem[] = [
  { id: "open", label: "Open", icon: "open", shortcut: "Enter" },
  { id: "rename", label: "Rename", icon: "edit", shortcut: "F2" },
  { id: "copy", label: "Copy", icon: "copy", shortcut: "Cmd C" },
  {
    id: "share",
    label: "Share",
    icon: "share",
    items: [
      { id: "share-link", label: "Copy link", icon: "link" },
      { id: "share-mail", label: "Email", icon: "mail" },
      { id: "share-chat", label: "Send in chat", icon: "chat" },
    ],
  },
  { id: "sep", separator: true },
  { id: "delete", label: "Delete", icon: "trash", shortcut: "Del", danger: true },
];

const css = `
.hb-za5 {
  --hb-za5-c: #2f7bff;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-family: inherit;
  outline: none;
  -webkit-touch-callout: none;
}
.hb-za5 *, .hb-za5 *::before, .hb-za5 *::after { box-sizing: border-box; }
.hb-za5:focus-visible { outline: 2px solid var(--hb-za5-c); outline-offset: 2px; border-radius: 12px; }
.hb-za5-area {
  display: grid;
  place-items: center;
  min-height: 120px;
  padding: 16px;
  font-size: 13px;
  color: #8f8f8f;
  text-align: center;
  background: #111111;
  border: 1px dashed #2f2f2f;
  border-radius: 12px;
  user-select: none;
  -webkit-user-select: none;
}
.hb-za5-area b { display: block; margin-bottom: 2px; font-size: 14px; font-weight: 600; color: #ededed; }
.hb-za5-menu {
  position: absolute;
  z-index: 30;
  width: max-content;
  min-width: var(--hb-za5-w, 188px);
  max-width: 280px;
  padding: 5px;
  color: #ededed;
  background: rgba(20, 20, 20, 0.96);
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  outline: none;
  visibility: hidden;
  font-family: inherit;
  font-size: 13px;
  user-select: none;
  -webkit-user-select: none;
  animation: hb-za5-pop 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}
.hb-za5-menu *, .hb-za5-menu *::before, .hb-za5-menu *::after { box-sizing: border-box; }
.hb-za5-menu[data-fixed="true"] { position: fixed; z-index: 2147483000; }
.hb-za5-menu[data-ghost="true"] { pointer-events: none; }
.hb-za5-row { position: relative; }
.hb-za5-item {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 28px;
  padding: 0 8px;
  color: #e4e4e4;
  border-radius: 7px;
  cursor: default;
  outline: none;
  white-space: nowrap;
  transition: background 0.12s ease, color 0.12s ease;
}
.hb-za5-item[data-active="true"], .hb-za5-item:focus-visible { background: color-mix(in srgb, var(--hb-za5-c) 85%, #000); color: #ffffff; }
.hb-za5-item[data-danger="true"] { color: #ff6b6b; }
.hb-za5-item[data-danger="true"][data-active="true"], .hb-za5-item[data-danger="true"]:focus-visible { background: #d93f3f; color: #ffffff; }
.hb-za5-item[aria-disabled="true"] { opacity: 0.4; }
.hb-za5-ico { display: grid; flex: 0 0 auto; place-items: center; width: 16px; height: 16px; }
.hb-za5-ico svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.hb-za5-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-za5-key { flex: 0 0 auto; margin-left: 18px; font-size: 11px; letter-spacing: 0.02em; color: #7d7d7d; }
.hb-za5-item[data-active="true"] .hb-za5-key, .hb-za5-item:focus-visible .hb-za5-key { color: rgba(255, 255, 255, 0.7); }
.hb-za5-chev { flex: 0 0 auto; width: 12px; height: 12px; margin-left: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; opacity: 0.7; }
.hb-za5-sep { height: 1px; margin: 5px 4px; background: #2a2a2a; }
.hb-za5-sub {
  position: absolute;
  top: -6px;
  left: calc(100% + 2px);
  width: max-content;
  min-width: var(--hb-za5-sw, 168px);
  padding: 5px;
  background: rgba(20, 20, 20, 0.98);
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
  transform-origin: 0 12px;
  animation: hb-za5-sub 0.14s cubic-bezier(0.2, 0.9, 0.3, 1.1) both;
}
.hb-za5-sub[data-flip="true"] { left: auto; right: calc(100% + 2px); transform-origin: 100% 12px; }
@keyframes hb-za5-pop {
  from { opacity: 0; transform: scale(0.84); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes hb-za5-sub {
  from { opacity: 0; transform: translateX(-6px) scale(0.94); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-za5-menu, .hb-za5-sub { animation: none; }
  .hb-za5-item { transition: none; }
}
`;

function Icon({ icon }: { icon: React.ReactNode | ContextIconName | undefined }) {
  if (icon === undefined || icon === null) return <span className="hb-za5-ico" aria-hidden="true" />;
  if (typeof icon === "string") {
    const glyph = icons[icon as ContextIconName];
    return (
      <span className="hb-za5-ico" aria-hidden="true">
        {glyph ? <svg viewBox="0 0 16 16">{glyph}</svg> : icon}
      </span>
    );
  }
  return (
    <span className="hb-za5-ico" aria-hidden="true">
      {icon}
    </span>
  );
}

interface MenuState {
  x: number;
  y: number;
  ghost: boolean;
  keyboard: boolean;
}

const PAD = 8;

function subscribeNothing() {
  return () => {};
}

export function MenuContext({
  items,
  onSelect,
  boundary = "viewport",
  longPress = 520,
  autoDemo = 0,
  disabled = false,
  accent = "#2f7bff",
  className = "",
  style,
  children,
  onContextMenu,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  ...rest
}: MenuContextProps) {
  const list = items && items.length ? items : defaultItems;
  const fixed = boundary === "viewport";
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const subRef = React.useRef<HTMLDivElement>(null);
  const nodes = React.useRef(new Map<string, HTMLElement>());
  const rows = React.useRef(new Map<string, HTMLElement>());
  const press = React.useRef<{ timer: number; x: number; y: number; id: number } | null>(null);
  const suppress = React.useRef(false);
  const [menu, setMenu] = React.useState<MenuState | null>(null);
  const [focusId, setFocusId] = React.useState<string | null>(null);
  const [subOpen, setSubOpen] = React.useState<string | null>(null);
  const [hovering, setHovering] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );

  const realOpen = menu !== null && !menu.ghost;
  const subItems = list.find((i) => i.id === subOpen)?.items ?? [];
  const inSub = focusId !== null && subItems.some((i) => i.id === focusId);

  const close = React.useCallback((refocus: boolean) => {
    setMenu(null);
    setFocusId(null);
    setSubOpen(null);
    if (refocus) rootRef.current?.focus({ preventScroll: true });
  }, []);

  const openAt = React.useCallback(
    (clientX: number, clientY: number, keyboard: boolean) => {
      const root = rootRef.current;
      if (!root) return;
      let x = clientX;
      let y = clientY;
      if (!fixed) {
        const rect = root.getBoundingClientRect();
        x = clientX - rect.left - root.clientLeft;
        y = clientY - rect.top - root.clientTop;
      }
      const first = list.find((i) => !i.separator && !i.disabled);
      setSubOpen(null);
      setFocusId(keyboard && first ? first.id : null);
      setMenu({ x, y, ghost: false, keyboard });
    },
    [fixed, list],
  );

  React.useLayoutEffect(() => {
    const el = menuRef.current;
    const root = rootRef.current;
    if (!menu || !el || !root) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const bw = fixed ? window.innerWidth : root.clientWidth;
    const bh = fixed ? window.innerHeight : root.clientHeight;
    let left = menu.x;
    let top = menu.y;
    if (left + w > bw - PAD) left = menu.x - w;
    if (top + h > bh - PAD) top = menu.y - h;
    left = Math.max(PAD / 2, Math.min(left, bw - w - PAD / 2));
    top = Math.max(PAD / 2, Math.min(top, bh - h - PAD / 2));
    el.style.left = `${left.toFixed(1)}px`;
    el.style.top = `${top.toFixed(1)}px`;
    el.style.transformOrigin = `${(menu.x - left).toFixed(1)}px ${(menu.y - top).toFixed(1)}px`;
    el.style.visibility = "visible";
  }, [menu, fixed]);

  React.useLayoutEffect(() => {
    const sub = subRef.current;
    const root = rootRef.current;
    const row = subOpen ? rows.current.get(subOpen) : null;
    if (!sub || !row || !root) return;
    const rowRect = row.getBoundingClientRect();
    const limit = fixed
      ? { right: window.innerWidth, bottom: window.innerHeight }
      : (() => {
          const r = root.getBoundingClientRect();
          return { right: r.right, bottom: r.bottom };
        })();
    const w = sub.offsetWidth;
    const h = sub.offsetHeight;
    const flip = rowRect.right + 2 + w > limit.right - PAD / 2;
    sub.dataset.flip = flip ? "true" : "false";
    const overflow = rowRect.top - 6 + h - (limit.bottom - PAD / 2);
    sub.style.top = overflow > 0 ? `${(-6 - overflow).toFixed(1)}px` : "";
  }, [subOpen, fixed, menu]);

  React.useEffect(() => {
    if (!menu || menu.ghost) return;
    if (focusId) nodes.current.get(focusId)?.focus({ preventScroll: true });
    else menuRef.current?.focus({ preventScroll: true });
  }, [menu, focusId, subOpen]);

  React.useEffect(() => {
    if (!realOpen) return;
    function away(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close(false);
    }
    function dismiss() {
      close(false);
    }
    document.addEventListener("pointerdown", away, true);
    window.addEventListener("resize", dismiss);
    if (fixed) window.addEventListener("scroll", dismiss, true);
    return () => {
      document.removeEventListener("pointerdown", away, true);
      window.removeEventListener("resize", dismiss);
      if (fixed) window.removeEventListener("scroll", dismiss, true);
    };
  }, [realOpen, fixed, close]);

  React.useEffect(() => {
    if (!autoDemo || fixed || hovering || realOpen || disabled) return;
    const ids: number[] = [];
    function later(fn: () => void, ms: number) {
      ids.push(window.setTimeout(fn, ms));
    }
    const plain = list.filter((i) => !i.separator && !i.disabled);
    const direct = plain.filter((i) => !i.items).slice(0, 2);
    const parent = plain.find((i) => i.items && i.items.length);
    const steps: { focus: string; sub: string | null }[] = direct.map((i) => ({ focus: i.id, sub: null }));
    if (parent && parent.items) {
      steps.push({ focus: parent.id, sub: parent.id });
      const kids = parent.items.filter((i) => !i.separator && !i.disabled).slice(0, 2);
      kids.forEach((k) => steps.push({ focus: k.id, sub: parent.id }));
    }
    function cycle() {
      const root = rootRef.current;
      if (!root) return;
      setSubOpen(null);
      setFocusId(null);
      setMenu({ x: 14, y: root.clientHeight * 0.16, ghost: true, keyboard: false });
      steps.forEach((s, n) => {
        later(() => {
          setSubOpen(s.sub);
          setFocusId(s.focus);
        }, 900 + n * 850);
      });
      later(() => {
        setMenu(null);
        setFocusId(null);
        setSubOpen(null);
        later(cycle, autoDemo);
      }, 900 + steps.length * 850 + 700);
    }
    later(cycle, 900);
    return () => {
      ids.forEach((t) => window.clearTimeout(t));
      setMenu((m) => (m && m.ghost ? null : m));
      setFocusId(null);
      setSubOpen(null);
    };
  }, [autoDemo, fixed, hovering, realOpen, disabled, list]);

  function select(item: ContextMenuItem) {
    if (item.disabled || item.separator) return;
    if (item.items && item.items.length) {
      setSubOpen(item.id);
      setFocusId(item.items.find((i) => !i.separator && !i.disabled)?.id ?? null);
      return;
    }
    onSelect?.(item.id);
    close(true);
  }

  function onMenuKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const current = inSub ? subItems : list;
    const focusable = current.filter((i) => !i.separator && !i.disabled);
    const at = focusable.findIndex((i) => i.id === focusId);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!focusable.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      const next = at === -1 ? (step === 1 ? 0 : focusable.length - 1) : (at + step + focusable.length) % focusable.length;
      setFocusId(focusable[next].id);
      if (!inSub) setSubOpen(null);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      if (!focusable.length) return;
      setFocusId(focusable[e.key === "Home" ? 0 : focusable.length - 1].id);
    } else if (e.key === "ArrowRight") {
      const item = list.find((i) => i.id === focusId);
      if (item && item.items && item.items.length) {
        e.preventDefault();
        select(item);
      }
    } else if (e.key === "ArrowLeft") {
      if (inSub && subOpen) {
        e.preventDefault();
        setFocusId(subOpen);
        setSubOpen(null);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = current.find((i) => i.id === focusId);
      if (item) select(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (subOpen) {
        setFocusId(subOpen);
        setSubOpen(null);
      } else close(true);
    } else if (e.key === "Tab") {
      e.preventDefault();
      close(true);
    }
  }

  function renderItems(group: ContextMenuItem[], level: number) {
    return group.map((item) => {
      if (item.separator) return <div key={item.id} className="hb-za5-sep" role="separator" />;
      const hasSub = Boolean(item.items && item.items.length);
      const active = focusId === item.id;
      return (
        <div
          key={item.id}
          className="hb-za5-row"
          ref={(el) => {
            if (el) rows.current.set(item.id, el);
            else rows.current.delete(item.id);
          }}
        >
          <div
            ref={(el) => {
              if (el) nodes.current.set(item.id, el);
              else nodes.current.delete(item.id);
            }}
            role="menuitem"
            tabIndex={active ? 0 : -1}
            className="hb-za5-item"
            data-active={active}
            data-danger={item.danger ? "true" : undefined}
            aria-disabled={item.disabled || undefined}
            aria-haspopup={hasSub ? "menu" : undefined}
            aria-expanded={hasSub ? subOpen === item.id : undefined}
            onPointerEnter={() => {
              if (item.disabled || menu?.ghost) return;
              setFocusId(item.id);
              if (level === 0) setSubOpen(hasSub ? item.id : null);
            }}
            onClick={() => select(item)}
          >
            <Icon icon={item.icon} />
            <span className="hb-za5-label">{item.label}</span>
            {hasSub ? (
              <svg className="hb-za5-chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
              </svg>
            ) : item.shortcut ? (
              <span className="hb-za5-key">{item.shortcut}</span>
            ) : null}
          </div>
          {hasSub && subOpen === item.id ? (
            <div ref={subRef} className="hb-za5-sub" role="menu" aria-label={item.label}>
              {renderItems(item.items ?? [], 1)}
            </div>
          ) : null}
        </div>
      );
    });
  }

  function cancelPress() {
    const p = press.current;
    if (p) window.clearTimeout(p.timer);
    press.current = null;
  }

  const vars = { "--hb-za5-c": accent, ...style } as React.CSSProperties;

  const panel = menu ? (
    <div
      ref={menuRef}
      className="hb-za5-menu"
      role="menu"
      tabIndex={-1}
      aria-orientation="vertical"
      aria-hidden={menu.ghost || undefined}
      data-fixed={fixed}
      data-ghost={menu.ghost}
      style={{ left: menu.x, top: menu.y, "--hb-za5-c": accent } as React.CSSProperties}
      onKeyDown={onMenuKey}
      onContextMenu={(e) => e.preventDefault()}
    >
      {renderItems(list, 0)}
    </div>
  ) : null;

  return (
    <div
      ref={rootRef}
      className={`hb-za5 ${className}`}
      style={vars}
      tabIndex={disabled ? undefined : 0}
      aria-haspopup="menu"
      onContextMenu={(e) => {
        onContextMenu?.(e);
        if (e.defaultPrevented || disabled) return;
        if (suppress.current || (e.target as HTMLElement).closest(".hb-za5-menu")) {
          e.preventDefault();
          suppress.current = false;
          return;
        }
        e.preventDefault();
        openAt(e.clientX, e.clientY, false);
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        if (disabled || e.pointerType === "mouse" || longPress <= 0) return;
        if ((e.target as HTMLElement).closest(".hb-za5-menu")) return;
        cancelPress();
        const x = e.clientX;
        const y = e.clientY;
        const timer = window.setTimeout(() => {
          press.current = null;
          suppress.current = true;
          openAt(x, y, false);
        }, longPress);
        press.current = { timer, x, y, id: e.pointerId };
      }}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        const p = press.current;
        if (p && p.id === e.pointerId && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8) cancelPress();
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        cancelPress();
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        cancelPress();
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setHovering(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setHovering(false);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (disabled || e.defaultPrevented) return;
        if (e.key === "ContextMenu" || (e.key === "F10" && e.shiftKey)) {
          e.preventDefault();
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          openAt(rect.left + 20, rect.top + 20, true);
        }
      }}
      {...rest}
    >
      <style href="hb-menu-context" precedence="default">{css}</style>
      {children ?? (
        <div className="hb-za5-area">
          <span>
            <b>Right-click here</b>
            or press and hold on touch
          </span>
        </div>
      )}
      {panel ? (fixed ? (mounted ? createPortal(panel, document.body) : null) : panel) : null}
    </div>
  );
}

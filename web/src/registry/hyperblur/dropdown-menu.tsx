"use client";

import * as React from "react";

export type DropdownMenuItem =
  | {
      type?: "item";
      id: string;
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      disabled?: boolean;
      destructive?: boolean;
      onSelect?: () => void;
    }
  | {
      type: "checkbox";
      id: string;
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      disabled?: boolean;
      checked?: boolean;
      defaultChecked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
    }
  | { type: "separator"; id?: string }
  | { type: "label"; id?: string; label: string }
  | {
      type: "submenu";
      id: string;
      label: string;
      icon?: React.ReactNode;
      disabled?: boolean;
      items: DropdownMenuItem[];
    };

export interface DropdownMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  items: DropdownMenuItem[];
  trigger?: React.ReactNode;
  triggerLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (id: string) => void;
  align?: "start" | "end";
  side?: "auto" | "bottom" | "top";
  size?: "sm" | "md";
  accent?: string;
}

type FocusRequest = "first" | "last" | "panel" | null;

interface MenuContext {
  checks: Record<string, boolean>;
  toggle: (id: string, next: boolean) => void;
  select: (id: string) => void;
  closeAll: (refocus: boolean) => void;
}

const css = `
.hb-ddm {
  --hb-ddm-accent: #2f7bff;
  --hb-ddm-h: 32px;
  --hb-ddm-fs: 13.5px;
  position: relative;
  display: inline-flex;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  text-align: left;
}
.hb-ddm[data-size="sm"] { --hb-ddm-h: 24px; --hb-ddm-fs: 12.5px; }
.hb-ddm[data-size="sm"] .hb-ddm-trigger { height: 28px; padding: 0 9px; border-radius: 8px; }
.hb-ddm *, .hb-ddm *::before, .hb-ddm *::after { box-sizing: border-box; }
.hb-ddm-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid #262626;
  border-radius: 10px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.hb-ddm-trigger:hover, .hb-ddm-trigger[aria-expanded="true"] { background: #1f1f1f; border-color: #333333; }
.hb-ddm-trigger:focus-visible { outline: 2px solid var(--hb-ddm-accent); outline-offset: 2px; }
.hb-ddm-trigger svg { width: 14px; height: 14px; flex: none; color: #8f8f8f; }
.hb-ddm-panel {
  position: absolute;
  z-index: 60;
  top: calc(100% + 6px);
  left: 0;
  width: max-content;
  min-width: 100%;
  max-width: 300px;
  padding: 4px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111111;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.4);
  outline: none;
  transform-origin: 0 0;
  animation: hb-ddm-in 0.16s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}
.hb-ddm-panel[data-root="true"] { min-width: max(100%, 200px); }
.hb-ddm[data-size="sm"] .hb-ddm-panel[data-root="true"] { min-width: max(100%, 184px); }
.hb-ddm-panel[data-align="end"] { left: auto; right: 0; transform-origin: 100% 0; }
.hb-ddm-panel[data-side="top"] { top: auto; bottom: calc(100% + 6px); transform-origin: 0 100%; }
.hb-ddm-panel[data-side="top"][data-align="end"] { transform-origin: 100% 100%; }
.hb-ddm-panel[data-root="false"] { top: -5px; left: calc(100% + 3px); min-width: 168px; }
.hb-ddm-panel[data-root="false"][data-flip="true"] { left: auto; right: calc(100% + 3px); transform-origin: 100% 0; }
.hb-ddm-sub { position: relative; }
.hb-ddm-i {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: var(--hb-ddm-h);
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #d4d4d4;
  font: inherit;
  font-size: var(--hb-ddm-fs);
  line-height: 1.2;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-ddm-i:focus, .hb-ddm-i[aria-expanded="true"] { background: rgba(255, 255, 255, 0.08); color: #ffffff; }
.hb-ddm-i[data-destructive="true"] { color: #ff6369; }
.hb-ddm-i[data-destructive="true"]:focus { background: rgba(229, 72, 77, 0.15); color: #ff7b80; }
.hb-ddm-i[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }
.hb-ddm-i[aria-disabled="true"]:focus { background: transparent; }
.hb-ddm-ic { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 16px; height: 16px; color: #8f8f8f; }
.hb-ddm-i:focus .hb-ddm-ic { color: inherit; }
.hb-ddm-i[data-destructive="true"] .hb-ddm-ic { color: inherit; }
.hb-ddm-ic svg { width: 15px; height: 15px; }
.hb-ddm-tick { width: 13px; height: 13px; color: var(--hb-ddm-accent); }
.hb-ddm-tick path { stroke-dasharray: 16; stroke-dashoffset: 16; transition: stroke-dashoffset 0.22s ease; }
.hb-ddm-i[aria-checked="true"] .hb-ddm-tick path { stroke-dashoffset: 0; }
.hb-ddm-lb { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-ddm-kb {
  flex: none;
  margin-left: 16px;
  color: #6f6f6f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  letter-spacing: 0.02em;
}
.hb-ddm-i:focus .hb-ddm-kb { color: #a1a1a1; }
.hb-ddm-chev { flex: none; width: 12px; height: 12px; margin-left: 12px; color: #6f6f6f; }
.hb-ddm-lab {
  padding: 8px 8px 4px;
  color: #6f6f6f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.hb-ddm-sep { height: 1px; margin: 3px -4px; background: #262626; }
@keyframes hb-ddm-in { from { opacity: 0; transform: scale(0.95) translateY(-3px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ddm-panel { animation: none; }
  .hb-ddm-trigger, .hb-ddm-tick path { transition: none; }
}
`;

const MenuCtx = React.createContext<MenuContext | null>(null);

function useMenu() {
  const ctx = React.useContext(MenuCtx);
  if (!ctx) throw new Error("Menu context missing");
  return ctx;
}

const chevronDown = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 6.25 4 4 4-4" />
  </svg>
);

function navItems(panel: HTMLElement) {
  return Array.from(panel.querySelectorAll<HTMLElement>("[data-ddm-nav]")).filter(
    (el) => el.closest('[role="menu"]') === panel && el.getAttribute("aria-disabled") !== "true",
  );
}

interface PanelProps {
  items: DropdownMenuItem[];
  root: boolean;
  request: FocusRequest;
  onExit?: () => void;
  align?: "start" | "end";
  side?: "auto" | "bottom" | "top";
  anchor?: React.RefObject<HTMLElement | null>;
  labelledBy?: string;
  panelId?: string;
}

function MenuPanel({
  items,
  root,
  request,
  onExit,
  align = "start",
  side = "auto",
  anchor,
  labelledBy,
  panelId,
}: PanelProps) {
  const ctx = useMenu();
  const panel = React.useRef<HTMLDivElement>(null);
  const search = React.useRef({ text: "", timer: 0 });
  const [active, setActive] = React.useState<string | null>(null);

  React.useLayoutEffect(() => {
    const node = panel.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (root) {
      const base = anchor?.current?.getBoundingClientRect();
      if (base && side === "auto") {
        const below = window.innerHeight - base.bottom;
        if (below < rect.height + 12 && base.top > below) node.dataset.side = "top";
      }
      if (rect.right > window.innerWidth - 8 && align === "start") node.dataset.align = "end";
      else if (rect.left < 8 && align === "end") node.dataset.align = "start";
    } else if (rect.right > window.innerWidth - 8) {
      node.dataset.flip = "true";
    }
  }, [root, anchor, side, align]);

  React.useEffect(() => {
    const node = panel.current;
    if (!request || !node) return;
    const list = navItems(node);
    const target = request === "first" ? list[0] : request === "last" ? list[list.length - 1] : node;
    (target ?? node).focus({ preventScroll: true });
  }, [request]);

  React.useEffect(() => {
    const state = search.current;
    return () => window.clearTimeout(state.timer);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const node = panel.current;
    if (!node) return;
    const list = navItems(node);
    const index = list.indexOf(document.activeElement as HTMLElement);
    const focusAt = (i: number) => list[i]?.focus({ preventScroll: true });
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusAt(index < 0 ? 0 : (index + 1) % list.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusAt(index < 0 ? list.length - 1 : (index - 1 + list.length) % list.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAt(list.length - 1);
    } else if (e.key === "ArrowLeft" && !root) {
      e.preventDefault();
      onExit?.();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (root) ctx.closeAll(true);
      else onExit?.();
    } else if (e.key === "Tab") {
      e.preventDefault();
      ctx.closeAll(true);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key !== " " || search.current.text)) {
      e.preventDefault();
      const state = search.current;
      window.clearTimeout(state.timer);
      state.text += e.key.toLowerCase();
      state.timer = window.setTimeout(() => {
        state.text = "";
      }, 600);
      const ordered = [...list.slice(index + 1), ...list.slice(0, index + 1)];
      const pool = state.text.length === 1 ? ordered : [...list.slice(Math.max(index, 0)), ...list.slice(0, Math.max(index, 0))];
      const hit = pool.find((el) => (el.textContent ?? "").trim().toLowerCase().startsWith(state.text));
      hit?.focus({ preventScroll: true });
    } else {
      return;
    }
    e.stopPropagation();
  }

  return (
    <div
      ref={panel}
      id={panelId}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className="hb-ddm-panel"
      data-root={root}
      data-side={root ? (side === "top" ? "top" : "bottom") : undefined}
      data-align={root ? align : undefined}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, i) => {
        const key = item.id ?? `${item.type}-${i}`;
        if (item.type === "separator") return <div key={key} role="separator" className="hb-ddm-sep" />;
        if (item.type === "label") {
          return (
            <div key={key} role="presentation" className="hb-ddm-lab">
              {item.label}
            </div>
          );
        }
        if (item.type === "submenu") {
          return <SubmenuItem key={key} item={item} active={active} onActive={setActive} />;
        }
        if (item.type === "checkbox") {
          const checked = item.checked ?? ctx.checks[item.id] ?? item.defaultChecked ?? false;
          return (
            <button
              key={key}
              type="button"
              role="menuitemcheckbox"
              aria-checked={checked}
              aria-disabled={item.disabled || undefined}
              data-ddm-nav
              tabIndex={active === item.id ? 0 : -1}
              className="hb-ddm-i"
              onFocus={() => setActive(item.id)}
              onPointerMove={(e) => focusOnHover(e)}
              onClick={() => {
                if (item.disabled) return;
                const next = !checked;
                ctx.toggle(item.id, next);
                item.onCheckedChange?.(next);
              }}
            >
              <span className="hb-ddm-ic" aria-hidden="true">
                <svg className="hb-ddm-tick" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 8.5 3.2 3.2L13 4.8" />
                </svg>
              </span>
              <span className="hb-ddm-lb">{item.label}</span>
              {item.shortcut && <kbd className="hb-ddm-kb">{item.shortcut}</kbd>}
            </button>
          );
        }
        return (
          <button
            key={key}
            type="button"
            role="menuitem"
            aria-disabled={item.disabled || undefined}
            data-ddm-nav
            data-destructive={item.destructive || undefined}
            tabIndex={active === item.id ? 0 : -1}
            className="hb-ddm-i"
            onFocus={() => setActive(item.id)}
            onPointerMove={(e) => focusOnHover(e)}
            onClick={() => {
              if (item.disabled) return;
              item.onSelect?.();
              ctx.select(item.id);
            }}
          >
            {item.icon && (
              <span className="hb-ddm-ic" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="hb-ddm-lb">{item.label}</span>
            {item.shortcut && <kbd className="hb-ddm-kb">{item.shortcut}</kbd>}
          </button>
        );
      })}
    </div>
  );
}

function focusOnHover(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  if (el.getAttribute("aria-disabled") === "true") return;
  if (document.activeElement !== el) el.focus({ preventScroll: true });
}

interface SubmenuProps {
  item: Extract<DropdownMenuItem, { type: "submenu" }>;
  active: string | null;
  onActive: (id: string) => void;
}

function SubmenuItem({ item, active, onActive }: SubmenuProps) {
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const [request, setRequest] = React.useState<FocusRequest>(null);
  const timer = React.useRef(0);
  const panelId = React.useId();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function show(next: FocusRequest) {
    window.clearTimeout(timer.current);
    if (item.disabled) return;
    setRequest(next);
    setOpen(true);
  }

  function hide(refocus: boolean) {
    window.clearTimeout(timer.current);
    const inside = wrap.current?.contains(document.activeElement) && document.activeElement !== button.current;
    setOpen(false);
    setRequest(null);
    if (refocus || inside) button.current?.focus({ preventScroll: true });
  }

  return (
    <div
      ref={wrap}
      className="hb-ddm-sub"
      onMouseEnter={() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => show(null), 120);
      }}
      onMouseLeave={() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => hide(false), 160);
      }}
    >
      <button
        ref={button}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-disabled={item.disabled || undefined}
        data-ddm-nav
        tabIndex={active === item.id ? 0 : -1}
        className="hb-ddm-i"
        onFocus={() => onActive(item.id)}
        onPointerMove={(e) => focusOnHover(e)}
        onClick={() => show("panel")}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            show("first");
          }
        }}
      >
        {item.icon && (
          <span className="hb-ddm-ic" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className="hb-ddm-lb">{item.label}</span>
        <svg className="hb-ddm-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 3.5 4.5 4.5L6 12.5" />
        </svg>
      </button>
      {open && (
        <MenuPanel
          items={item.items}
          root={false}
          request={request}
          onExit={() => hide(true)}
          panelId={panelId}
        />
      )}
    </div>
  );
}

export function DropdownMenu({
  items,
  trigger = "Options",
  triggerLabel,
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  align = "start",
  side = "auto",
  size = "md",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: DropdownMenuProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : inner;
  const root = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const [request, setRequest] = React.useState<FocusRequest>(null);
  const [checks, setChecks] = React.useState<Record<string, boolean>>({});
  const menuId = React.useId();
  const triggerId = `${menuId}-trigger`;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      if (!next) setRequest(null);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    function onDown(e: PointerEvent) {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [isOpen, setOpen]);

  const ctx = React.useMemo<MenuContext>(
    () => ({
      checks,
      toggle: (id, next) => setChecks((prev) => ({ ...prev, [id]: next })),
      select: (id) => {
        onSelect?.(id);
        setOpen(false);
        button.current?.focus({ preventScroll: true });
      },
      closeAll: (refocus) => {
        setOpen(false);
        if (refocus) button.current?.focus({ preventScroll: true });
      },
    }),
    [checks, onSelect, setOpen],
  );

  function openWith(next: FocusRequest) {
    setRequest(next);
    setOpen(true);
  }

  const vars = { "--hb-ddm-accent": accent, ...style } as React.CSSProperties;

  return (
    <div ref={root} className={`hb-ddm ${className}`} style={vars} data-size={size} {...rest}>
      <style href="hb-dropdown-menu" precedence="default">{css}</style>
      <button
        ref={button}
        id={triggerId}
        type="button"
        className="hb-ddm-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-label={triggerLabel}
        onClick={(e) => {
          if (isOpen) setOpen(false);
          else openWith(e.detail === 0 ? "first" : "panel");
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openWith("first");
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            openWith("last");
          } else if (e.key === "Escape" && isOpen) {
            e.preventDefault();
            setOpen(false);
          }
        }}
      >
        {trigger}
        {typeof trigger === "string" && chevronDown}
      </button>
      {isOpen && (
        <MenuCtx.Provider value={ctx}>
          <MenuPanel
            items={items}
            root
            request={request}
            align={align}
            side={side}
            anchor={button}
            labelledBy={triggerId}
            panelId={menuId}
          />
        </MenuCtx.Provider>
      )}
    </div>
  );
}

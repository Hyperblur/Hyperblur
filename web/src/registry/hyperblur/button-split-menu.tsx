"use client";

import * as React from "react";

export interface ButtonSplitMenuOption {
  id: string;
  label: string;
  action?: string;
  description?: string;
}

export interface ButtonSplitMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: ButtonSplitMenuOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  onAction?: (id: string) => void;
  placement?: "bottom" | "top";
  align?: "start" | "end";
  menuLabel?: string;
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-xb7 {
  --hb-xb7-c: #2ea05b;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  font-family: inherit;
  color: #fff;
}
.hb-xb7 *, .hb-xb7 *::before, .hb-xb7 *::after { box-sizing: border-box; }
.hb-xb7-group {
  display: inline-flex;
  border-radius: 10px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb7-c) 88%, #fff) 0%, var(--hb-xb7-c) 55%, color-mix(in srgb, var(--hb-xb7-c) 90%, #000) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 0 1px color-mix(in srgb, var(--hb-xb7-c) 60%, #000), 0 8px 18px -10px var(--hb-xb7-c), 0 1px 2px rgba(0, 0, 0, 0.4);
}
.hb-xb7-main, .hb-xb7-tog {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  height: 38px;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.2s ease;
}
.hb-xb7-main { padding: 0 14px 0 13px; gap: 8px; border-radius: 10px 0 0 10px; font-size: 14px; font-weight: 600; overflow: hidden; }
.hb-xb7-tog { padding: 0 10px; border-radius: 0 10px 10px 0; }
.hb-xb7-tog::before { content: ""; position: absolute; left: 0; top: 7px; bottom: 7px; width: 1px; background: rgba(0, 0, 0, 0.28); box-shadow: 1px 0 0 rgba(255, 255, 255, 0.18); }
.hb-xb7-main:hover:not(:disabled), .hb-xb7-tog:hover:not(:disabled), .hb-xb7-tog[aria-expanded="true"] { background: rgba(255, 255, 255, 0.1); }
.hb-xb7-main:active:not(:disabled), .hb-xb7-tog:active:not(:disabled) { background: rgba(0, 0, 0, 0.12); }
.hb-xb7-main:focus-visible, .hb-xb7-tog:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
.hb-xb7-main:disabled, .hb-xb7-tog:disabled { cursor: not-allowed; opacity: 0.55; }
.hb-xb7-main svg, .hb-xb7-tog svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
.hb-xb7-tog svg { transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb7-tog[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-xb7-lbl { display: inline-block; white-space: nowrap; animation: hb-xb7-in 0.42s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb7-menu {
  position: absolute;
  z-index: 30;
  width: max-content;
  min-width: 100%;
  max-width: 300px;
  margin: 0;
  padding: 5px;
  list-style: none;
  border-radius: 12px;
  background: rgba(22, 22, 22, 0.96);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 0 0 1px #2a2a2a, inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 22px 44px -16px rgba(0, 0, 0, 0.95), 0 6px 14px -6px rgba(0, 0, 0, 0.7);
  color: #ededed;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px) scale(0.96);
  filter: blur(2px);
  transition: opacity 0.18s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease, visibility 0s linear 0.32s;
}
.hb-xb7-menu[data-placement="bottom"] { top: calc(100% + 6px); }
.hb-xb7-menu[data-placement="top"] { bottom: calc(100% + 6px); transform: translateY(6px) scale(0.96); }
.hb-xb7-menu[data-align="end"] { right: 0; transform-origin: 100% 0; }
.hb-xb7-menu[data-align="start"] { left: 0; transform-origin: 0 0; }
.hb-xb7-menu[data-placement="top"][data-align="end"] { transform-origin: 100% 100%; }
.hb-xb7-menu[data-placement="top"][data-align="start"] { transform-origin: 0 100%; }
.hb-xb7-menu[data-open="true"] { opacity: 1; visibility: visible; transform: none; filter: none; transition: opacity 0.18s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease, visibility 0s; }
.hb-xb7-item {
  position: relative;
  display: grid;
  grid-template-columns: 18px 1fr;
  column-gap: 8px;
  align-items: start;
  padding: 7px 10px 7px 8px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: background 0.15s ease;
}
.hb-xb7-item[data-active="true"] { background: #232323; }
.hb-xb7-item:focus-visible { box-shadow: inset 0 0 0 1.5px var(--hb-xb7-c); }
.hb-xb7-ck { width: 16px; height: 16px; margin-top: 1px; fill: none; stroke: var(--hb-xb7-c); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transform: scale(0.5); transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb7-item[aria-checked="true"] .hb-xb7-ck { opacity: 1; transform: none; }
.hb-xb7-t { font-size: 13px; font-weight: 600; letter-spacing: -0.005em; white-space: nowrap; }
.hb-xb7-d { grid-column: 2; font-size: 11.5px; line-height: 1.35; color: #8f8f8f; margin-top: 1px; }
@keyframes hb-xb7-in { from { opacity: 0; transform: translateY(70%); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb7 *, .hb-xb7-menu { transition-duration: 0.01s !important; animation: none !important; }
  .hb-xb7-menu { filter: none; transform: none !important; }
}
`;

const defaultOptions: ButtonSplitMenuOption[] = [
  { id: "merge", label: "Create a merge commit", action: "Merge pull request", description: "All 14 commits are added to main." },
  { id: "squash", label: "Squash and merge", description: "One clean commit on main." },
  { id: "rebase", label: "Rebase and merge", description: "Replays each commit on top of main." },
];

export function ButtonSplitMenu({
  options = defaultOptions,
  value,
  defaultValue,
  onValueChange,
  onAction,
  placement = "bottom",
  align = "end",
  menuLabel = "More merge options",
  accent = "#2ea05b",
  disabled = false,
  className = "",
  style,
  ...rest
}: ButtonSplitMenuProps) {
  const id = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.id ?? "");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const root = React.useRef<HTMLDivElement>(null);
  const tog = React.useRef<HTMLButtonElement>(null);
  const items = React.useRef<(HTMLLIElement | null)[]>([]);
  const selected = value ?? inner;
  const current = options.find((o) => o.id === selected) ?? options[0];
  const mainLabel = current ? current.action ?? current.label : "";

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (open) items.current[active]?.focus();
  }, [open, active]);

  const openMenu = (index?: number) => {
    const i = index ?? Math.max(0, options.findIndex((o) => o.id === selected));
    setActive(i);
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) tog.current?.focus();
  };

  const choose = (i: number) => {
    const o = options[i];
    if (!o) return;
    if (value === undefined) setInner(o.id);
    onValueChange?.(o.id);
    close();
  };

  const onMenuKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const n = options.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(n - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div ref={root} className={`hb-xb7 ${className}`.trim()} style={{ "--hb-xb7-c": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-button-split-menu" precedence="default">{css}</style>
      <div className="hb-xb7-group">
        <button type="button" className="hb-xb7-main" disabled={disabled} onClick={() => current && onAction?.(current.id)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="6" cy="5.5" r="2" />
            <circle cx="6" cy="18.5" r="2" />
            <circle cx="18" cy="12" r="2" />
            <path d="M6 7.5v9M16 12c-5 0-10-1.5-10-4.5" />
          </svg>
          <span key={selected} className="hb-xb7-lbl">{mainLabel}</span>
        </button>
        <button
          ref={tog}
          type="button"
          className="hb-xb7-tog"
          disabled={disabled}
          aria-label={menuLabel}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={`${id}-menu`}
          onClick={() => (open ? close() : openMenu())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              openMenu(e.key === "ArrowUp" ? options.length - 1 : undefined);
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9.5l6 6 6-6" />
          </svg>
        </button>
      </div>
      <ul
        id={`${id}-menu`}
        role="menu"
        aria-label={menuLabel}
        className="hb-xb7-menu"
        data-open={open ? "true" : "false"}
        data-placement={placement}
        data-align={align}
        onKeyDown={onMenuKey}
      >
        {options.map((o, i) => (
          <li
            key={o.id}
            ref={(el) => {
              items.current[i] = el;
            }}
            role="menuitemradio"
            aria-checked={o.id === selected}
            tabIndex={open && i === active ? 0 : -1}
            className="hb-xb7-item"
            data-active={open && i === active ? "true" : "false"}
            onPointerEnter={() => setActive(i)}
            onClick={() => choose(i)}
          >
            <svg className="hb-xb7-ck" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            <span className="hb-xb7-t">{o.label}</span>
            {o.description && <span className="hb-xb7-d">{o.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

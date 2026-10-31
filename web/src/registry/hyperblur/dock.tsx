"use client";

import * as React from "react";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface DockProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: DockItem[];
  magnification?: number;
  distance?: number;
  size?: number;
  position?: "bottom" | "top";
}

const css = `
.hb-dk { position: relative; display: inline-block; }
.hb-dk-list {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 0;
  padding: 8px;
  list-style: none;
  border-radius: 18px;
  background: rgba(255,255,255,.07);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.hb-dk[data-position="top"] .hb-dk-list { align-items: flex-start; }
.hb-dk-item {
  position: relative;
  flex: 0 0 auto;
  width: var(--hb-size);
  height: var(--hb-size);
  transform: translate3d(var(--hb-x, 0px), 0, 0);
  transition: transform .35s cubic-bezier(.2, .9, .2, 1);
}
.hb-dk-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 22%;
  color: #fff;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  background: linear-gradient(160deg, rgba(255,255,255,.2), rgba(255,255,255,.06));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 6px 16px rgba(0,0,0,.35);
  transform: scale(var(--hb-s, 1));
  transform-origin: 50% 100%;
  transition: transform .35s cubic-bezier(.2, .9, .2, 1);
  -webkit-tap-highlight-color: transparent;
}
.hb-dk[data-position="top"] .hb-dk-btn { transform-origin: 50% 0; }
.hb-dk[data-active="true"] .hb-dk-item,
.hb-dk[data-active="true"] .hb-dk-btn { transition-duration: .12s; transition-timing-function: ease-out; }
.hb-dk-btn > svg { width: 50%; height: 50%; }
.hb-dk-btn:focus-visible { outline: 2px solid #2f7bff; outline-offset: 3px; }
.hb-dk-tip {
  position: absolute;
  left: 50%;
  bottom: calc(var(--hb-size) * var(--hb-s, 1) + 10px);
  z-index: 2;
  padding: 4px 9px;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  pointer-events: none;
  background: rgba(20,20,20,.92);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
  opacity: 0;
  transform: translate3d(-50%, 4px, 0);
  transition: opacity .15s ease, transform .15s ease, bottom .12s ease-out, top .12s ease-out;
}
.hb-dk[data-position="top"] .hb-dk-tip {
  bottom: auto;
  top: calc(var(--hb-size) * var(--hb-s, 1) + 10px);
  transform: translate3d(-50%, -4px, 0);
}
.hb-dk-item:hover .hb-dk-tip,
.hb-dk-btn:focus-visible + .hb-dk-tip { opacity: 1; transform: translate3d(-50%, 0, 0); }
@media (prefers-reduced-motion: reduce) {
  .hb-dk-item, .hb-dk-btn { transform: none; transition: none; }
  .hb-dk-tip { transition: opacity .01s linear; }
}
`;

export function Dock({
  items,
  magnification = 1.6,
  distance = 120,
  size = 48,
  position = "bottom",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: DockProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    onPointerMove?.(e);
    if (e.pointerType === "touch") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = listRef.current;
    const root = rootRef.current;
    if (!list || !root) return;
    const x = e.clientX - list.getBoundingClientRect().left;
    const nodes = Array.from(list.children) as HTMLElement[];
    const reach = Math.max(1, distance);
    const scales = nodes.map((node) => {
      const center = node.offsetLeft + node.offsetWidth / 2;
      const t = Math.min(1, Math.abs(x - center) / reach);
      return 1 + (magnification - 1) * ((1 + Math.cos(Math.PI * t)) / 2);
    });
    const extras = scales.map((s) => (s - 1) * size);
    const total = extras.reduce((sum, v) => sum + v, 0);
    let before = 0;
    nodes.forEach((node, i) => {
      const shift = before + extras[i] / 2 - total / 2;
      before += extras[i];
      node.style.setProperty("--hb-s", scales[i].toFixed(3));
      node.style.setProperty("--hb-x", `${shift.toFixed(2)}px`);
    });
    root.dataset.active = "true";
  }

  function handleLeave(e: React.PointerEvent<HTMLElement>) {
    onPointerLeave?.(e);
    const list = listRef.current;
    const root = rootRef.current;
    if (root) root.dataset.active = "false";
    if (!list) return;
    Array.from(list.children).forEach((node) => {
      const el = node as HTMLElement;
      el.style.removeProperty("--hb-s");
      el.style.removeProperty("--hb-x");
    });
  }

  const vars = {
    "--hb-size": `${size}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      aria-label="Dock"
      className={`hb-dk ${className}`}
      style={vars}
      data-position={position}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      {...rest}
    >
      <style href="hb-dock" precedence="default">{css}</style>
      <ul className="hb-dk-list" ref={listRef}>
        {items.map((item) => (
          <li className="hb-dk-item" key={item.id}>
            {item.href ? (
              <a className="hb-dk-btn" href={item.href} aria-label={item.label} onClick={item.onClick}>
                {item.icon}
              </a>
            ) : (
              <button className="hb-dk-btn" type="button" aria-label={item.label} onClick={item.onClick}>
                {item.icon}
              </button>
            )}
            <span className="hb-dk-tip" aria-hidden="true">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

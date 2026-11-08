"use client";

import * as React from "react";

export interface ButtonToolbarGroupItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
}

export interface ButtonToolbarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: ButtonToolbarGroupItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  tooltipSide?: "top" | "bottom" | "right" | "left";
  shortcuts?: boolean;
  label?: string;
  accent?: string;
}

const css = `
.hb-xb10 {
  --hb-xb10-c: #2f7bff;
  --hb-xb10-s: 36px;
  --hb-xb10-g: 2px;
  position: relative;
  display: inline-flex;
  gap: var(--hb-xb10-g);
  padding: 4px;
  box-sizing: border-box;
  border-radius: 14px;
  font-family: inherit;
  color: #a1a1a1;
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.92), rgba(20, 20, 20, 0.92));
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px #2a2a2a, 0 16px 36px -14px rgba(0, 0, 0, 0.95), 0 4px 10px -4px rgba(0, 0, 0, 0.6);
}
.hb-xb10 *, .hb-xb10 *::before, .hb-xb10 *::after { box-sizing: border-box; }
.hb-xb10[data-orientation="vertical"] { flex-direction: column; }
.hb-xb10-ind, .hb-xb10-hov {
  position: absolute;
  left: 4px;
  top: 4px;
  width: var(--hb-xb10-s);
  height: var(--hb-xb10-s);
  border-radius: 10px;
  pointer-events: none;
}
.hb-xb10-ind {
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb10-c) 92%, #fff) 0%, var(--hb-xb10-c) 60%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 16px -6px var(--hb-xb10-c);
  transform: translate(var(--hb-xb10-ix), var(--hb-xb10-iy));
  transition: transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.hb-xb10-hov {
  background: rgba(255, 255, 255, 0.06);
  opacity: 0;
  transform: translate(var(--hb-xb10-hx), var(--hb-xb10-hy));
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s ease;
}
.hb-xb10[data-hover="true"] .hb-xb10-hov { opacity: 1; }
.hb-xb10-btn {
  position: relative;
  z-index: 1;
  width: var(--hb-xb10-s);
  height: var(--hb-xb10-s);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xb10-btn:hover { color: #ededed; }
.hb-xb10-btn:active { transform: scale(0.88); }
.hb-xb10-btn[aria-pressed="true"] { color: #fff; }
.hb-xb10-btn:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-xb10-c) 80%, #fff); outline-offset: 1px; }
.hb-xb10-btn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb10-tip {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 6px 5px 9px;
  border-radius: 8px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 550;
  color: #ededed;
  background: #1d1d1d;
  box-shadow: 0 0 0 1px #2e2e2e, 0 10px 22px -10px rgba(0, 0, 0, 0.95);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.14s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xb10-tip kbd { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; min-width: 18px; padding: 1px 4px; text-align: center; border-radius: 4px; color: #a1a1a1; background: #262626; box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.4); }
.hb-xb10-tip[data-side="top"] { bottom: calc(100% + 8px); left: 50%; transform: translate(-50%, 4px); }
.hb-xb10-tip[data-side="bottom"] { top: calc(100% + 8px); left: 50%; transform: translate(-50%, -4px); }
.hb-xb10-tip[data-side="right"] { left: calc(100% + 8px); top: 50%; transform: translate(-4px, -50%); }
.hb-xb10-tip[data-side="left"] { right: calc(100% + 8px); top: 50%; transform: translate(4px, -50%); }
.hb-xb10-btn:hover .hb-xb10-tip, .hb-xb10-btn:focus-visible .hb-xb10-tip { opacity: 1; transition-delay: 0.35s; }
.hb-xb10-btn:hover .hb-xb10-tip[data-side="top"], .hb-xb10-btn:focus-visible .hb-xb10-tip[data-side="top"],
.hb-xb10-btn:hover .hb-xb10-tip[data-side="bottom"], .hb-xb10-btn:focus-visible .hb-xb10-tip[data-side="bottom"] { transform: translate(-50%, 0); }
.hb-xb10-btn:hover .hb-xb10-tip[data-side="right"], .hb-xb10-btn:focus-visible .hb-xb10-tip[data-side="right"],
.hb-xb10-btn:hover .hb-xb10-tip[data-side="left"], .hb-xb10-btn:focus-visible .hb-xb10-tip[data-side="left"] { transform: translate(0, -50%); }
.hb-xb10[data-hover="true"] .hb-xb10-btn:hover .hb-xb10-tip { transition-delay: 0.08s; }
@media (prefers-reduced-motion: reduce) {
  .hb-xb10 *, .hb-xb10-ind, .hb-xb10-hov { transition-duration: 0.01s !important; }
}
`;

const ico = (d: string) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

const defaultItems: ButtonToolbarGroupItem[] = [
  { id: "move", label: "Move", shortcut: "V", icon: ico("M5.5 4l13 6.2-5.6 1.7-1.8 5.6z") },
  { id: "hand", label: "Hand", shortcut: "H", icon: ico("M8 12.5V6.8a1.4 1.4 0 0 1 2.8 0v4.7M10.8 11V5.4a1.4 1.4 0 0 1 2.8 0V11M13.6 11V6.4a1.4 1.4 0 0 1 2.8 0v6.1M16.4 9.5a1.4 1.4 0 0 1 2.8 0v4.2a6.3 6.3 0 0 1-6.3 6.3h-.6a5.6 5.6 0 0 1-4.4-2.2l-3-4a1.5 1.5 0 0 1 2.3-1.9L8 12.5") },
  { id: "frame", label: "Frame", shortcut: "F", icon: ico("M8 3.5v17M16 3.5v17M3.5 8h17M3.5 16h17") },
  { id: "pen", label: "Pen", shortcut: "P", icon: ico("M14.5 5.5l4 4M4 20l1.2-4.6L15.6 5a1.9 1.9 0 0 1 2.8 0l.6.6a1.9 1.9 0 0 1 0 2.8L8.6 18.8z") },
  { id: "text", label: "Text", shortcut: "T", icon: ico("M5 6.5V5h14v1.5M12 5v14M9.5 19h5") },
  { id: "comment", label: "Comment", shortcut: "C", icon: ico("M5 5.5h14c.8 0 1.5.7 1.5 1.5v8.5c0 .8-.7 1.5-1.5 1.5h-7.5L7 20.5V17H5c-.8 0-1.5-.7-1.5-1.5V7c0-.8.7-1.5 1.5-1.5z") },
];

export function ButtonToolbarGroup({
  items = defaultItems,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  tooltipSide,
  shortcuts = true,
  label = "Tools",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ButtonToolbarGroupProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const [hover, setHover] = React.useState<number | null>(null);
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const selected = value ?? inner;
  const index = Math.max(0, items.findIndex((i) => i.id === selected));
  const roving = focusIndex ?? index;
  const vertical = orientation === "vertical";
  const side = tooltipSide ?? (vertical ? "right" : "top");

  const select = React.useCallback(
    (id: string) => {
      if (value === undefined) setInner(id);
      onValueChange?.(id);
    },
    [value, onValueChange],
  );

  React.useEffect(() => {
    if (!shortcuts) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const hit = items.find((i) => i.shortcut && i.shortcut.toLowerCase() === e.key.toLowerCase());
      if (hit) select(hit.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcuts, items, select]);

  const offset = (i: number) => `calc(${i} * (var(--hb-xb10-s) + var(--hb-xb10-g)))`;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = items.length;
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    let to: number | null = null;
    if (e.key === nextKey) to = (roving + 1) % n;
    else if (e.key === prevKey) to = (roving - 1 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    if (to !== null) {
      e.preventDefault();
      setFocusIndex(to);
      refs.current[to]?.focus();
    }
  };

  const vars = {
    "--hb-xb10-c": accent,
    "--hb-xb10-ix": vertical ? "0px" : offset(index),
    "--hb-xb10-iy": vertical ? offset(index) : "0px",
    "--hb-xb10-hx": vertical ? "0px" : offset(hover ?? index),
    "--hb-xb10-hy": vertical ? offset(hover ?? index) : "0px",
  } as React.CSSProperties;

  return (
    <div
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      className={`hb-xb10 ${className}`.trim()}
      data-orientation={orientation}
      data-hover={hover !== null && hover !== index ? "true" : "false"}
      style={{ ...vars, ...style }}
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusIndex(null);
      }}
      {...rest}
    >
      <style href="hb-button-toolbar-group" precedence="default">{css}</style>
      <span className="hb-xb10-hov" aria-hidden="true" />
      <span className="hb-xb10-ind" aria-hidden="true" />
      {items.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          aria-pressed={item.id === selected}
          aria-label={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}
          aria-keyshortcuts={item.shortcut}
          tabIndex={i === roving ? 0 : -1}
          className="hb-xb10-btn"
          onPointerEnter={() => setHover(i)}
          onFocus={() => setFocusIndex(i)}
          onClick={() => select(item.id)}
        >
          {item.icon ?? ico("M12 5v14M5 12h14")}
          <span className="hb-xb10-tip" data-side={side} aria-hidden="true">
            {item.label}
            {item.shortcut && <kbd>{item.shortcut}</kbd>}
          </span>
        </button>
      ))}
    </div>
  );
}

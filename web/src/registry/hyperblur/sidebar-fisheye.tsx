"use client";

import * as React from "react";

const PATHS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  search: "M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM13.5 13.5L17 17",
  music: "M7.5 15.5V5l9-2v10.5M7.5 15.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16.5 13.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  mic: "M10 12.5a2.5 2.5 0 0 0 2.5-2.5V5.5a2.5 2.5 0 0 0-5 0V10a2.5 2.5 0 0 0 2.5 2.5zM5 9.5a5 5 0 0 0 10 0M10 14.5V17",
  heart: "M10 16.5S3 12.4 3 7.6A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.6c0 4.8-7 8.9-7 8.9z",
  radio: "M4 7.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM5.5 7.5L14 3.5M12.5 12a1.8 1.8 0 1 0 0-.1M5.5 10.5h3M5.5 13.5h3",
  download: "M10 3.5v9M6.5 9l3.5 3.5L13.5 9M4 16.5h12",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
} as const;

export type SidebarFisheyeIconName = keyof typeof PATHS;

export interface SidebarFisheyeItem {
  id: string;
  label: string;
  icon?: SidebarFisheyeIconName | React.ReactNode;
  tint?: string;
  hint?: string;
}

export interface SidebarFisheyeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  items?: SidebarFisheyeItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  magnify?: number;
  radius?: number;
  size?: number;
  gap?: number;
  footer?: React.ReactNode;
  accent?: string;
}

const defaultItems: SidebarFisheyeItem[] = [
  { id: "home", label: "Listen now", icon: "home", tint: "#ff5a5f" },
  { id: "search", label: "Search", icon: "search", tint: "#8b5cf6", hint: "/" },
  { id: "library", label: "Library", icon: "music", tint: "#2f7bff", hint: "1,284" },
  { id: "podcasts", label: "Podcasts", icon: "mic", tint: "#f5a623", hint: "3 new" },
  { id: "liked", label: "Liked songs", icon: "heart", tint: "#ec4899", hint: "412" },
  { id: "radio", label: "Radio", icon: "radio", tint: "#14b8a6" },
  { id: "downloads", label: "Downloads", icon: "download", tint: "#64748b", hint: "2.1 GB" },
];

const css = `
.hb-xk4 {
  --hb-xk4-a: #2f7bff;
  --hb-xk4-s: 36px;
  --hb-xk4-g: 8px;
  position: relative;
  z-index: 5;
  box-sizing: border-box;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: flex-start;
  width: calc(var(--hb-xk4-s) + 28px);
  height: 100%;
  padding: 12px 0 12px 14px;
  border-right: 1px solid #1d1d1d;
  background: linear-gradient(90deg, #0e0e0e, #0b0b0b);
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
}
.hb-xk4 *, .hb-xk4 *::before, .hb-xk4 *::after { box-sizing: border-box; }
.hb-xk4-list { position: relative; display: flex; flex-direction: column; gap: var(--hb-xk4-g); margin: auto 0; padding: 0; list-style: none; }
.hb-xk4-li { position: relative; width: var(--hb-xk4-s); height: var(--hb-xk4-s); }
.hb-xk4-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 28%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .22), rgba(255, 255, 255, 0) 55%),
    linear-gradient(160deg, color-mix(in srgb, var(--hb-xk4-t) 100%, #fff 10%), color-mix(in srgb, var(--hb-xk4-t) 62%, #000));
  box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .25), inset 0 -2px 4px rgba(0, 0, 0, .25), 0 4px 10px -4px rgba(0, 0, 0, .9);
  color: #fff;
  cursor: pointer;
  transform-origin: 0% 50%;
  transform: translateX(calc((var(--hb-xk4-k) - 1) * 10px)) scale(var(--hb-xk4-k));
  transition: transform .5s cubic-bezier(.22, 1, .36, 1), filter .2s ease;
  will-change: transform;
}
.hb-xk4[data-live="true"] .hb-xk4-btn { transition: transform .14s cubic-bezier(.22, 1, .36, 1), filter .2s ease; }
.hb-xk4-btn svg { width: 52%; height: 52%; filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .3)); }
.hb-xk4-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-xk4-btn:active { filter: brightness(.82); }
.hb-xk4-li[data-dim="true"] .hb-xk4-btn { filter: saturate(.55) brightness(.75); }
.hb-xk4-pip {
  position: absolute;
  top: 50%;
  left: -10px;
  width: 4px;
  height: 4px;
  border-radius: 99px;
  background: #ededed;
  box-shadow: 0 0 6px rgba(255, 255, 255, .7);
  transform: translateY(-50%) scale(0);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-xk4-li[data-current="true"] .hb-xk4-pip { transform: translateY(-50%) scale(1); }
.hb-xk4-label {
  position: absolute;
  top: 0;
  left: calc(var(--hb-xk4-s) + 36px);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 6px 0 10px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 9px;
  background: rgba(24, 24, 24, .86);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .06);
  color: #fff;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  transform: translate(-6px, calc(var(--hb-xk4-ly) - 14px)) scale(.96);
  transition: transform .32s cubic-bezier(.22, 1, .36, 1), opacity .16s ease;
}
.hb-xk4-label[data-on="true"] { opacity: 1; transform: translate(0, calc(var(--hb-xk4-ly) - 14px)); }
.hb-xk4-label::before { content: ""; position: absolute; top: 50%; left: -4px; width: 7px; height: 7px; border-bottom: 1px solid rgba(255, 255, 255, .1); border-left: 1px solid rgba(255, 255, 255, .1); background: #181818; transform: translateY(-50%) rotate(45deg); }
.hb-xk4-hint { padding: 0 6px; border-radius: 5px; background: rgba(255, 255, 255, .08); color: #a1a1a1; font-size: 10.5px; line-height: 17px; }
.hb-xk4-foot { flex: none; margin-top: 8px; }
@media (prefers-reduced-motion: reduce) {
  .hb-xk4 *, .hb-xk4 *::before, .hb-xk4 *::after { transition: none !important; }
  .hb-xk4-btn { transform: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarFisheyeIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarFisheyeIconName | undefined) ?? "home"] ?? PATHS.home;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

export function SidebarFisheye({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  magnify = 0.5,
  radius = 96,
  size = 36,
  gap = 8,
  footer,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarFisheyeProps) {
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const [y, setY] = React.useState<number | null>(null);
  const [live, setLive] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);
  const current = active ?? inner;
  const pitch = size + gap;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const nearest = y === null ? -1 : Math.max(0, Math.min(items.length - 1, Math.round((y - size / 2) / pitch)));

  function scaleAt(i: number) {
    if (y === null || reduced) return 1;
    const d = Math.abs(i * pitch + size / 2 - y);
    if (d >= radius) return 1;
    const f = 1 - d / radius;
    return 1 + magnify * f * f;
  }

  function onMove(e: React.PointerEvent<HTMLUListElement>) {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    setLive(true);
    setY(e.clientY - r.top);
  }

  function focusAt(i: number) {
    setLive(false);
    setY(i * pitch + size / 2);
  }

  function onKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const btns = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const at = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (at < 0) return;
    let n = -1;
    if (e.key === "ArrowDown") n = Math.min(btns.length - 1, at + 1);
    else if (e.key === "ArrowUp") n = Math.max(0, at - 1);
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = btns.length - 1;
    if (n >= 0) {
      e.preventDefault();
      btns[n]?.focus();
    }
  }

  function pick(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  const shownItem = nearest >= 0 ? items[nearest] : undefined;
  const ly = nearest >= 0 ? nearest * pitch + size / 2 : 0;
  const ci = items.findIndex((i) => i.id === current);

  const vars = { "--hb-xk4-a": accent, "--hb-xk4-s": `${size}px`, "--hb-xk4-g": `${gap}px`, ...style } as React.CSSProperties;

  return (
    <nav aria-label="Library" className={`hb-xk4 ${className}`} data-live={live} style={vars} {...rest}>
      <style href="hb-sidebar-fisheye" precedence="default">{css}</style>
      <ul
        ref={listRef}
        className="hb-xk4-list"
        role="list"
        onPointerMove={onMove}
        onPointerLeave={() => {
          setY(null);
          setLive(false);
        }}
        onKeyDown={onKey}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setY(null);
        }}
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            className="hb-xk4-li"
            data-current={item.id === current}
            data-dim={y !== null && i !== nearest && item.id !== current}
            style={{ "--hb-xk4-t": item.tint ?? accent, "--hb-xk4-k": scaleAt(i).toFixed(3), zIndex: i === nearest ? 2 : 1 } as React.CSSProperties}
          >
            <span className="hb-xk4-pip" aria-hidden="true" />
            <button
              type="button"
              className="hb-xk4-btn"
              aria-label={item.label}
              aria-current={item.id === current ? "page" : undefined}
              tabIndex={i === (ci >= 0 ? ci : 0) ? 0 : -1}
              onFocus={() => focusAt(i)}
              onClick={() => pick(item.id)}
            >
              <Glyph icon={item.icon} />
            </button>
          </li>
        ))}
        <li className="hb-xk4-label" data-on={!!shownItem} aria-hidden="true" style={{ "--hb-xk4-ly": `${ly.toFixed(1)}px` } as React.CSSProperties}>
          {shownItem?.label ?? items[0]?.label}
          {shownItem?.hint ? <span className="hb-xk4-hint">{shownItem.hint}</span> : null}
        </li>
      </ul>
      {footer ? <div className="hb-xk4-foot">{footer}</div> : null}
    </nav>
  );
}

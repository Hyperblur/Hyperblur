"use client";

import * as React from "react";

const PATHS = {
  spark: "M10 2.8l1.6 4.6 4.6 1.6-4.6 1.6L10 15.2l-1.6-4.6L3.8 9l4.6-1.6zM15.5 13.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z",
  grid: "M3.5 3.5h5v5h-5zM11.5 3.5h5v5h-5zM3.5 11.5h5v5h-5zM11.5 11.5h5v5h-5z",
  layers: "M10 3l7 3.8-7 3.8-7-3.8zM3 10.2l7 3.8 7-3.8M3 13.6l7 3.8 7-3.8",
  image: "M4 4h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM3 13l4-4 3 3 2-2 5 5M12.5 7.5a.5.5 0 1 0 0-.1",
  users: "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
} as const;

export type SidebarGlassAuroraIconName = keyof typeof PATHS;

export interface SidebarGlassAuroraItem {
  id: string;
  label: string;
  icon?: SidebarGlassAuroraIconName | React.ReactNode;
  badge?: string;
}

export interface SidebarGlassAuroraProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  items?: SidebarGlassAuroraItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  colors?: [string, string, string];
  workspace?: string;
  plan?: string;
  usage?: { label: string; used: number; total: number } | null;
  onUpgrade?: () => void;
  upgradeLabel?: string;
  speed?: number;
}

const defaultItems: SidebarGlassAuroraItem[] = [
  { id: "create", label: "Create", icon: "spark" },
  { id: "gallery", label: "Gallery", icon: "grid", badge: "128" },
  { id: "styles", label: "Styles", icon: "layers" },
  { id: "assets", label: "Assets", icon: "image" },
  { id: "team", label: "Team", icon: "users" },
  { id: "settings", label: "Settings", icon: "gear" },
];

const css = `
.hb-xk5 {
  --hb-xk5-c1: #6d5dfc;
  --hb-xk5-c2: #2fd3c5;
  --hb-xk5-c3: #ff4d8d;
  --hb-xk5-sp: 18s;
  --hb-xk5-my: -200px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  background: #08080b;
  color: #f2f2f5;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
  isolation: isolate;
}
.hb-xk5 *, .hb-xk5 *::before, .hb-xk5 *::after { box-sizing: border-box; }
.hb-xk5-sky { position: absolute; inset: -30%; z-index: -2; filter: blur(34px) saturate(140%); opacity: .85; }
.hb-xk5-blob { position: absolute; border-radius: 50%; mix-blend-mode: screen; }
.hb-xk5-blob:nth-child(1) { top: 8%; left: -10%; width: 80%; height: 46%; background: radial-gradient(closest-side, var(--hb-xk5-c1), transparent); animation: hb-xk5-a var(--hb-xk5-sp) ease-in-out infinite alternate; }
.hb-xk5-blob:nth-child(2) { top: 42%; left: 30%; width: 70%; height: 40%; background: radial-gradient(closest-side, var(--hb-xk5-c2), transparent); animation: hb-xk5-b calc(var(--hb-xk5-sp) * 1.3) ease-in-out infinite alternate; }
.hb-xk5-blob:nth-child(3) { top: 70%; left: -5%; width: 60%; height: 38%; background: radial-gradient(closest-side, var(--hb-xk5-c3), transparent); animation: hb-xk5-c calc(var(--hb-xk5-sp) * .9) ease-in-out infinite alternate; }
.hb-xk5-glass {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .015) 40%, rgba(0, 0, 0, .25)),
    rgba(10, 10, 14, .42);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), inset -1px 0 0 rgba(255, 255, 255, .06);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.hb-xk5-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, .06) .6px, transparent .6px);
  background-size: 3px 3px;
  mix-blend-mode: overlay;
  opacity: .6;
}
.hb-xk5-ws {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: rgba(255, 255, 255, .06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 8px 24px -12px rgba(0, 0, 0, .6);
}
.hb-xk5-orb { position: relative; flex: none; width: 28px; height: 28px; border-radius: 9px; background: conic-gradient(from 210deg, var(--hb-xk5-c1), var(--hb-xk5-c2), var(--hb-xk5-c3), var(--hb-xk5-c1)); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .3), 0 4px 14px -4px var(--hb-xk5-c1); }
.hb-xk5-orb::after { content: ""; position: absolute; inset: 7px; border-radius: 5px; background: rgba(8, 8, 11, .55); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25); }
.hb-xk5-wsn { min-width: 0; flex: 1; }
.hb-xk5-wsn b { display: block; overflow: hidden; font-size: 12.5px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk5-wsn span { display: block; color: rgba(242, 242, 245, .55); font-size: 10.5px; line-height: 14px; }
.hb-xk5-list { position: relative; display: flex; flex: 1; flex-direction: column; gap: 2px; margin: 12px 0 0; padding: 0; list-style: none; min-height: 0; }
.hb-xk5-light {
  position: absolute;
  left: -20px;
  right: -20px;
  top: 0;
  height: 110px;
  background: radial-gradient(closest-side, rgba(255, 255, 255, .13), transparent);
  pointer-events: none;
  transform: translateY(calc(var(--hb-xk5-my) - 55px));
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-xk5-list:hover .hb-xk5-light { opacity: 1; }
.hb-xk5-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 34px;
  margin: 0;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: rgba(242, 242, 245, .66);
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .3s ease;
}
.hb-xk5-item svg { flex: none; width: 17px; height: 17px; }
.hb-xk5-item:hover { color: #fff; }
.hb-xk5-item:focus-visible { outline: 2px solid rgba(255, 255, 255, .8); outline-offset: -1px; }
.hb-xk5-item[aria-current="page"] {
  border-color: rgba(255, 255, 255, .14);
  background: linear-gradient(180deg, rgba(255, 255, 255, .14), rgba(255, 255, 255, .05));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 10px 24px -14px rgba(0, 0, 0, .9);
  color: #fff;
}
.hb-xk5-item[aria-current="page"]::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 16%;
  right: 16%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .9), transparent);
}
.hb-xk5-item[aria-current="page"] svg { color: #fff; filter: drop-shadow(0 0 6px var(--hb-xk5-c2)); }
.hb-xk5-il { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk5-badge { padding: 0 7px; border-radius: 99px; background: rgba(255, 255, 255, .1); color: rgba(242, 242, 245, .8); font-size: 10.5px; line-height: 17px; }
.hb-xk5-card {
  position: relative;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(255, 255, 255, .1), rgba(255, 255, 255, .03));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14);
}
.hb-xk5-row { display: flex; justify-content: space-between; color: rgba(242, 242, 245, .7); font-size: 11px; }
.hb-xk5-row b { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xk5-bar { position: relative; height: 5px; margin: 7px 0 9px; overflow: hidden; border-radius: 99px; background: rgba(255, 255, 255, .1); }
.hb-xk5-bar span { position: absolute; inset: 0 auto 0 0; width: var(--hb-xk5-p); border-radius: inherit; background: linear-gradient(90deg, var(--hb-xk5-c1), var(--hb-xk5-c2)); box-shadow: 0 0 10px var(--hb-xk5-c2); animation: hb-xk5-grow 1.2s cubic-bezier(.22, 1, .36, 1) both .2s; }
.hb-xk5-up {
  width: 100%;
  height: 28px;
  margin: 0;
  border: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 6px 18px -8px var(--hb-xk5-c1), inset 0 -1px 0 rgba(0, 0, 0, .15);
  color: #0b0b0f;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s cubic-bezier(.22, 1, .36, 1), box-shadow .2s ease;
}
.hb-xk5-up:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -8px var(--hb-xk5-c1), inset 0 -1px 0 rgba(0, 0, 0, .15); }
.hb-xk5-up:active { transform: translateY(0) scale(.98); }
.hb-xk5-up:focus-visible { outline: 2px solid var(--hb-xk5-c2); outline-offset: 2px; }
@keyframes hb-xk5-a { to { transform: translate(28%, 18%) scale(1.15); } }
@keyframes hb-xk5-b { to { transform: translate(-30%, -16%) scale(.9); } }
@keyframes hb-xk5-c { to { transform: translate(24%, -22%) scale(1.2); } }
@keyframes hb-xk5-grow { from { width: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk5 *, .hb-xk5 *::before, .hb-xk5 *::after { transition: none !important; animation: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarGlassAuroraIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarGlassAuroraIconName | undefined) ?? "grid"] ?? PATHS.grid;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

export function SidebarGlassAurora({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  colors = ["#6d5dfc", "#2fd3c5", "#ff4d8d"],
  workspace = "Prism Studio",
  plan = "Creator plan",
  usage = { label: "Renders this month", used: 742, total: 1000 },
  onUpgrade,
  upgradeLabel = "Upgrade to Pro",
  speed = 18,
  className = "",
  style,
  ...rest
}: SidebarGlassAuroraProps) {
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const current = active ?? inner;
  const listRef = React.useRef<HTMLUListElement>(null);
  const rootRef = React.useRef<HTMLElement>(null);

  function onMove(e: React.PointerEvent<HTMLUListElement>) {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    rootRef.current?.style.setProperty("--hb-xk5-my", `${(e.clientY - r.top).toFixed(1)}px`);
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

  const pct = usage ? Math.max(0, Math.min(100, (usage.used / Math.max(1, usage.total)) * 100)) : 0;
  const ci = items.findIndex((i) => i.id === current);

  const vars = {
    "--hb-xk5-c1": colors[0],
    "--hb-xk5-c2": colors[1],
    "--hb-xk5-c3": colors[2],
    "--hb-xk5-sp": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <nav ref={rootRef} aria-label={workspace} className={`hb-xk5 ${className}`} style={vars} {...rest}>
      <style href="hb-sidebar-glass-aurora" precedence="default">{css}</style>
      <div className="hb-xk5-sky" aria-hidden="true">
        <span className="hb-xk5-blob" />
        <span className="hb-xk5-blob" />
        <span className="hb-xk5-blob" />
      </div>
      <div className="hb-xk5-glass" aria-hidden="true" />
      <div className="hb-xk5-ws">
        <span className="hb-xk5-orb" aria-hidden="true" />
        <span className="hb-xk5-wsn">
          <b>{workspace}</b>
          {plan ? <span>{plan}</span> : null}
        </span>
      </div>
      <ul ref={listRef} className="hb-xk5-list" role="list" onPointerMove={onMove} onKeyDown={onKey}>
        <li className="hb-xk5-light" aria-hidden="true" />
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className="hb-xk5-item"
              aria-current={item.id === current ? "page" : undefined}
              tabIndex={i === (ci >= 0 ? ci : 0) ? 0 : -1}
              onClick={() => pick(item.id)}
            >
              <Glyph icon={item.icon} />
              <span className="hb-xk5-il">{item.label}</span>
              {item.badge ? <span className="hb-xk5-badge">{item.badge}</span> : null}
            </button>
          </li>
        ))}
      </ul>
      {usage ? (
        <div className="hb-xk5-card">
          <div className="hb-xk5-row">
            <span>{usage.label}</span>
            <b>
              {usage.used.toLocaleString("en-US")}/{usage.total.toLocaleString("en-US")}
            </b>
          </div>
          <div
            className="hb-xk5-bar"
            role="progressbar"
            aria-label={usage.label}
            aria-valuemin={0}
            aria-valuemax={usage.total}
            aria-valuenow={usage.used}
            style={{ "--hb-xk5-p": `${pct.toFixed(1)}%` } as React.CSSProperties}
          >
            <span />
          </div>
          {upgradeLabel ? (
            <button type="button" className="hb-xk5-up" onClick={onUpgrade}>
              {upgradeLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </nav>
  );
}

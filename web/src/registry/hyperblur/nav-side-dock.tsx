"use client";

import * as React from "react";

export type NavSideDockIcon = "home" | "search" | "inbox" | "calendar" | "folder" | "chart" | "layers" | "users" | "settings" | "plus";

export interface NavSideDockItem {
  label: string;
  icon: NavSideDockIcon;
  href?: string;
  badge?: number;
  separator?: boolean;
}

export interface NavSideDockProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items?: NavSideDockItem[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number, item: NavSideDockItem) => void;
  magnification?: number;
  range?: number;
  idle?: boolean;
  side?: "left" | "right";
  user?: { name: string } | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-yh6 {
  --hb-yh6-accent: #8b5cf6;
  --hb-yh6-b: 44px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh6 *, .hb-yh6 *::before, .hb-yh6 *::after { box-sizing: border-box; }
.hb-yh6[data-backdrop="true"] {
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 620px;
  padding: 24px;
  overflow: hidden;
  background:
    radial-gradient(40% 60% at 0% 50%, color-mix(in srgb, var(--hb-yh6-accent) 20%, transparent), transparent 70%),
    #0a0a0a;
}
.hb-yh6[data-side="right"] { flex-direction: row-reverse; }
.hb-yh6-rail { position: relative; z-index: 3; flex: none; display: flex; align-items: center; width: calc(var(--hb-yh6-b) + 18px); }
.hb-yh6[data-backdrop="false"] .hb-yh6-rail { width: auto; display: inline-flex; }
.hb-yh6-dock {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin: 0;
  padding: 9px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(30,30,34,.86), rgba(18,18,20,.9));
  backdrop-filter: blur(18px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 24px 60px -20px rgba(0,0,0,.9), 0 0 0 6px rgba(255,255,255,.015);
  list-style: none;
}
.hb-yh6[data-side="right"] .hb-yh6-dock { align-items: flex-end; }
.hb-yh6-li { position: relative; display: flex; }
.hb-yh6-sep { width: var(--hb-yh6-b); height: 1px; margin: 4px 0; background: rgba(255,255,255,.08); list-style: none; }
.hb-yh6-it {
  --s: 1;
  position: relative;
  display: grid;
  place-items: center;
  width: calc(var(--hb-yh6-b) * var(--s));
  height: calc(var(--hb-yh6-b) * var(--s));
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: calc(13px * var(--s));
  background: linear-gradient(180deg, #232327, #18181b);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.05);
  color: #a1a1a1;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: width .3s cubic-bezier(.3,1.2,.5,1), height .3s cubic-bezier(.3,1.2,.5,1), border-radius .3s ease, color .2s ease, background .2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-yh6[data-live="true"] .hb-yh6-it { transition: width .09s linear, height .09s linear, border-radius .09s linear, color .2s ease; }
.hb-yh6-it:hover { color: #ededed; }
.hb-yh6-it[aria-current="page"] { color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-yh6-accent) 70%, #232327), color-mix(in srgb, var(--hb-yh6-accent) 35%, #18181b)); box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 10px 24px -10px var(--hb-yh6-accent); }
.hb-yh6-it svg { width: calc(20px * var(--s)); height: calc(20px * var(--s)); fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh6-it:focus-visible { outline: 2px solid var(--hb-yh6-accent); outline-offset: 3px; }
.hb-yh6-ind { position: absolute; top: 50%; left: -10px; width: 3px; height: 18px; border-radius: 0 3px 3px 0; background: var(--hb-yh6-accent); box-shadow: 0 0 10px var(--hb-yh6-accent); transform: translateY(-50%); animation: hb-yh6-grow .4s cubic-bezier(.3,1.4,.5,1); }
.hb-yh6[data-side="right"] .hb-yh6-ind { left: auto; right: -10px; border-radius: 3px 0 0 3px; }
.hb-yh6-badge { position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px; padding: 0 5px; border: 2px solid #18181b; border-radius: 99px; background: #f43f5e; color: #fff; font-size: 10px; font-weight: 700; line-height: 14px; text-align: center; }
.hb-yh6-tip {
  position: absolute;
  top: 50%;
  left: calc(100% + 14px);
  z-index: 4;
  height: 30px;
  padding: 0 11px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 9px;
  background: #1c1c1f;
  color: #ededed;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 28px;
  white-space: nowrap;
  box-shadow: 0 10px 24px -8px rgba(0,0,0,.8);
  opacity: 0;
  transform: translate(-6px, -50%);
  transition: opacity .15s ease, transform .2s cubic-bezier(.3,1.3,.5,1);
  pointer-events: none;
}
.hb-yh6-tip kbd { margin-left: 8px; color: #8f8f8f; font: inherit; font-size: 11px; }
.hb-yh6[data-side="right"] .hb-yh6-tip { left: auto; right: calc(100% + 14px); transform: translate(6px, -50%); }
.hb-yh6-li:hover .hb-yh6-tip, .hb-yh6-it:focus-visible + .hb-yh6-tip { opacity: 1; transform: translate(0, -50%); }
.hb-yh6-av { display: grid; place-items: center; width: 100%; height: 100%; border-radius: inherit; background: linear-gradient(135deg, #f59e0b, #ec4899); color: #fff; font-size: calc(13px * var(--s)); font-weight: 700; }
.hb-yh6-page { position: relative; z-index: 1; flex: 1; min-width: 0; height: 572px; border: 1px solid rgba(255,255,255,.07); border-radius: 22px; background: #0f0f10; overflow: hidden; opacity: .78; pointer-events: none; }
.hb-yh6-pt { display: flex; align-items: center; gap: 12px; height: 54px; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,.06); font-size: 14px; font-weight: 600; }
.hb-yh6-pt span { color: #6f6f6f; font-weight: 500; }
.hb-yh6-pt b { margin-left: auto; display: flex; }
.hb-yh6-pt b i { width: 26px; height: 26px; margin-left: -7px; border: 2px solid #0f0f10; border-radius: 50%; }
.hb-yh6-canvas { position: absolute; inset: 54px 0 0; background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px); background-size: 20px 20px; }
.hb-yh6-fr { position: absolute; padding: 14px; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: #151517; box-shadow: 0 20px 40px -20px rgba(0,0,0,.8); }
.hb-yh6-fl { position: absolute; top: -20px; left: 2px; color: #6f6f6f; font-size: 11px; }
.hb-yh6-ln { height: 8px; margin-top: 8px; border-radius: 4px; background: rgba(255,255,255,.07); }
.hb-yh6-blk { border-radius: 10px; }
.hb-yh6-cur { position: absolute; display: flex; align-items: flex-start; gap: 4px; animation: hb-yh6-drift 9s ease-in-out infinite; }
.hb-yh6-cur svg { width: 16px; height: 16px; }
.hb-yh6-cur span { margin-top: 12px; padding: 2px 7px; border-radius: 6px; color: #fff; font-size: 11px; font-weight: 600; }
.hb-yh6-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-yh6-grow { from { height: 0; } }
@keyframes hb-yh6-drift { 0%, 100% { transform: translate(0, 0); } 35% { transform: translate(60px, 30px); } 70% { transform: translate(-30px, 50px); } }
@container (max-width: 640px) {
  .hb-yh6[data-backdrop="true"] { gap: 14px; padding: 16px 12px; }
  .hb-yh6 { --hb-yh6-b: 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh6 *, .hb-yh6 *::before, .hb-yh6 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultItems: NavSideDockItem[] = [
  { label: "Home", icon: "home", href: "#" },
  { label: "Search", icon: "search", href: "#" },
  { label: "Inbox", icon: "inbox", href: "#", badge: 12 },
  { label: "Calendar", icon: "calendar", href: "#" },
  { label: "Files", icon: "folder", href: "#" },
  { label: "Insights", icon: "chart", href: "#" },
  { label: "Team", icon: "users", href: "#" },
  { label: "New board", icon: "plus", href: "#", separator: true },
  { label: "Settings", icon: "settings", href: "#" },
];

const icons: Record<NavSideDockIcon, React.ReactNode> = {
  home: <path d="M3.5 9 10 3.5 16.5 9v7a1 1 0 0 1-1 1H12v-4.5H8V17H4.5a1 1 0 0 1-1-1z" />,
  search: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.2 13.2 3.3 3.3" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 11 5 4.5h10l2 6.5v4.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M3 11h4l1 2h4l1-2h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="4.5" width="13" height="12" rx="2.5" />
      <path d="M3.5 8.5h13M7 2.8v3.4M13 2.8v3.4" />
    </>
  ),
  folder: <path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h3.2l1.6 1.8h6.2A1.5 1.5 0 0 1 17 8.3v6.2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z" />,
  chart: <path d="M4 16V9M8 16V5M12 16v-4M16 16V7" />,
  layers: <path d="m10 3 7 3.8-7 3.8-7-3.8zM3 10.2l7 3.8 7-3.8M3 13.6l7 3.8 7-3.8" />,
  users: (
    <>
      <circle cx="7.5" cy="7" r="2.8" />
      <path d="M2.8 16c.7-2.8 2.5-4.2 4.7-4.2s4 1.4 4.7 4.2M13 4.6a2.6 2.6 0 0 1 0 5M14.5 12c1.6.4 2.6 1.7 3 4" />
    </>
  ),
  settings: (
    <>
      <circle cx="10" cy="10" r="2.6" />
      <path d="M10 2.8v2M10 15.2v2M2.8 10h2M15.2 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M4.9 15.1l1.4-1.4M13.7 6.3l1.4-1.4" />
    </>
  ),
  plus: <path d="M10 4.5v11M4.5 10h11" />,
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function NavSideDock({
  items = defaultItems,
  active,
  defaultActive = 0,
  onActiveChange,
  magnification = 1.7,
  range = 150,
  idle = true,
  side = "left",
  user = { name: "Rafael Costa" },
  accent = "#8b5cf6",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavSideDockProps) {
  const [inner, setInner] = React.useState(defaultActive);
  const current = active ?? inner;
  const rootRef = React.useRef<HTMLElement>(null);
  const dockRef = React.useRef<HTMLUListElement>(null);
  const pointer = React.useRef<number | null>(null);
  const focusY = React.useRef<number | null>(null);

  const apply = React.useCallback(
    (y: number | null, mag: number) => {
      const dock = dockRef.current;
      if (!dock) return;
      const nodes = Array.from(dock.querySelectorAll<HTMLElement>("[data-hb-yh6-it]"));
      const k = dock.offsetHeight ? dock.getBoundingClientRect().height / dock.offsetHeight : 1;
      for (const node of nodes) {
        let s = 1;
        if (y !== null) {
          const r = node.getBoundingClientRect();
          const d = Math.abs(y - (r.top + r.height / 2)) / (k || 1);
          if (d < range) s = 1 + (mag - 1) * ((Math.cos((Math.PI * d) / range) + 1) / 2);
        }
        node.style.setProperty("--s", s.toFixed(3));
      }
    },
    [range],
  );

  React.useEffect(() => {
    const root = rootRef.current;
    const dock = dockRef.current;
    if (!root || !dock || !idle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = true;
    let t0 = 0;
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((e) => (visible = e[0]?.isIntersecting ?? true)) : null;
    io?.observe(root);
    const tick = (t: number) => {
      raf = window.requestAnimationFrame(tick);
      if (!t0) t0 = t;
      if (!visible || pointer.current !== null || focusY.current !== null) return;
      const p = ((t - t0) / 5600) % 1;
      const r = dock.getBoundingClientRect();
      if (p < 0.62) {
        const k = p / 0.62;
        const env = Math.sin(Math.PI * k);
        const y = r.top + 20 + (r.height - 40) * (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
        apply(y, 1 + (magnification - 1) * 0.7 * env);
      } else apply(null, 1);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [idle, magnification, apply]);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    pointer.current = e.clientY;
    rootRef.current?.setAttribute("data-live", "true");
    apply(e.clientY, magnification);
  }

  function onLeave() {
    pointer.current = null;
    rootRef.current?.setAttribute("data-live", "false");
    apply(focusY.current, magnification);
  }

  function onFocusItem(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    focusY.current = r.top + r.height / 2;
    if (pointer.current === null) apply(focusY.current, magnification);
  }

  function onBlurDock(e: React.FocusEvent) {
    if (dockRef.current && dockRef.current.contains(e.relatedTarget as Node)) return;
    focusY.current = null;
    if (pointer.current === null) apply(null, 1);
  }

  function pick(i: number) {
    if (active === undefined) setInner(i);
    onActiveChange?.(i, items[i]!);
  }

  function onKey(e: React.KeyboardEvent) {
    const nodes = dockRef.current ? Array.from(dockRef.current.querySelectorAll<HTMLElement>("[data-hb-yh6-it]")) : [];
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    let next = -1;
    if (e.key === "ArrowDown") next = (at + 1) % nodes.length;
    else if (e.key === "ArrowUp") next = (at - 1 + nodes.length) % nodes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = nodes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    nodes[next]?.focus();
  }

  const dock = (
    <div className="hb-yh6-rail">
      <ul ref={dockRef} className="hb-yh6-dock" onPointerMove={onMove} onPointerLeave={onLeave} onKeyDown={onKey} onBlur={onBlurDock}>
        {items.map((item, i) => {
          const on = i === current;
          const body = (
            <>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                {icons[item.icon]}
              </svg>
              {item.badge ? (
                <span className="hb-yh6-badge" aria-hidden="true">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              ) : null}
              {item.badge ? <span className="hb-yh6-sr">, {item.badge} unread</span> : null}
            </>
          );
          return (
            <React.Fragment key={item.label}>
              {item.separator && <li className="hb-yh6-sep" role="separator" />}
              <li className="hb-yh6-li">
                {on && <span className="hb-yh6-ind" aria-hidden="true" />}
                {item.href ? (
                  <a
                    href={item.href}
                    className="hb-yh6-it"
                    data-hb-yh6-it=""
                    aria-label={item.label}
                    aria-current={on ? "page" : undefined}
                    onFocus={(e) => onFocusItem(e.currentTarget)}
                    onClick={() => pick(i)}
                  >
                    {body}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="hb-yh6-it"
                    data-hb-yh6-it=""
                    aria-label={item.label}
                    aria-current={on ? "page" : undefined}
                    onFocus={(e) => onFocusItem(e.currentTarget)}
                    onClick={() => pick(i)}
                  >
                    {body}
                  </button>
                )}
                <span className="hb-yh6-tip" aria-hidden="true">
                  {item.label}
                  <kbd>{i < 9 ? `G ${i + 1}` : ""}</kbd>
                </span>
              </li>
            </React.Fragment>
          );
        })}
        {user && (
          <>
            <li className="hb-yh6-sep" role="separator" />
            <li className="hb-yh6-li">
              <button type="button" className="hb-yh6-it" data-hb-yh6-it="" aria-label={`Account, ${user.name}`} onFocus={(e) => onFocusItem(e.currentTarget)}>
                <span className="hb-yh6-av" aria-hidden="true">
                  {initials(user.name)}
                </span>
              </button>
              <span className="hb-yh6-tip" aria-hidden="true">
                {user.name}
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <nav
      ref={rootRef}
      aria-label="Workspace"
      className={`hb-yh6 ${className}`}
      data-backdrop={showBackdrop ? "true" : "false"}
      data-side={side}
      data-live="false"
      style={{ "--hb-yh6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-nav-side-dock" precedence="default">
        {css}
      </style>
      {dock}
      {showBackdrop && (
        <div className="hb-yh6-page" aria-hidden="true">
          <div className="hb-yh6-pt">
            Launch plan Q1 <span>/ Board</span>
            <b>
              {["#0ea5e9", "#f97316", "#10b981"].map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </b>
          </div>
          <div className="hb-yh6-canvas">
            <div className="hb-yh6-fr" style={{ left: "6%", top: 60, width: "30%", height: 210 }}>
              <span className="hb-yh6-fl">Landing / Hero</span>
              <div className="hb-yh6-blk" style={{ height: 90, background: `linear-gradient(135deg, ${accent}, #1e1b4b)` }} />
              <div className="hb-yh6-ln" style={{ width: "70%" }} />
              <div className="hb-yh6-ln" style={{ width: "45%" }} />
            </div>
            <div className="hb-yh6-fr" style={{ left: "41%", top: 60, width: "24%", height: 300 }}>
              <span className="hb-yh6-fl">Mobile / Onboarding</span>
              <div className="hb-yh6-blk" style={{ height: 150, background: "linear-gradient(160deg, #0f766e, #064e3b)" }} />
              <div className="hb-yh6-ln" style={{ width: "80%" }} />
              <div className="hb-yh6-ln" style={{ width: "60%" }} />
              <div className="hb-yh6-ln" style={{ width: "40%" }} />
            </div>
            <div className="hb-yh6-fr" style={{ left: "70%", top: 60, width: "24%", height: 160 }}>
              <span className="hb-yh6-fl">Pricing card</span>
              <div className="hb-yh6-ln" style={{ width: "40%", height: 14 }} />
              <div className="hb-yh6-ln" style={{ width: "60%", height: 26, marginTop: 14 }} />
              <div className="hb-yh6-ln" style={{ width: "85%" }} />
              <div className="hb-yh6-ln" style={{ width: "70%" }} />
            </div>
            <div className="hb-yh6-fr" style={{ left: "6%", top: 310, width: "30%", height: 150 }}>
              <span className="hb-yh6-fl">Notes</span>
              <div className="hb-yh6-ln" style={{ width: "90%" }} />
              <div className="hb-yh6-ln" style={{ width: "75%" }} />
              <div className="hb-yh6-ln" style={{ width: "82%" }} />
              <div className="hb-yh6-ln" style={{ width: "50%" }} />
            </div>
            <div className="hb-yh6-cur" style={{ left: "58%", top: 230 }}>
              <svg viewBox="0 0 16 16">
                <path d="M2 1.5 14 7l-5.2 1.6L6.6 14z" fill="#f97316" stroke="#fff" strokeWidth="1" />
              </svg>
              <span style={{ background: "#f97316" }}>Mina</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

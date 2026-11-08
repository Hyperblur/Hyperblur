"use client";

import * as React from "react";

export type NavbarBottomNotchIcon = "home" | "explore" | "inbox" | "saved" | "profile" | "cart" | "calendar" | "chart";

export interface NavbarBottomNotchTab {
  label: string;
  href?: string;
  icon?: NavbarBottomNotchIcon | React.ReactNode;
  badge?: number | boolean;
}

export interface NavbarBottomNotchProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  tabs?: NavbarBottomNotchTab[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  fixed?: boolean;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultTabs: NavbarBottomNotchTab[] = [
  { label: "Home", icon: "home", href: "#home" },
  { label: "Explore", icon: "explore", href: "#explore" },
  { label: "Inbox", icon: "inbox", href: "#inbox", badge: 3 },
  { label: "Saved", icon: "saved", href: "#saved" },
  { label: "Profile", icon: "profile", href: "#profile", badge: true },
];

const ease = "cubic-bezier(.34,1.36,.5,1)";

const css = `
@property --hb-xj5-x { syntax: "<percentage>"; inherits: true; initial-value: 50%; }
.hb-xj5 {
  --hb-xj5-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj5 *, .hb-xj5 *::before, .hb-xj5 *::after { box-sizing: border-box; }
.hb-xj5[data-backdrop="true"] {
  display: grid;
  place-items: center;
  min-height: 600px;
  padding: 20px;
  overflow: hidden;
  background: radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--hb-xj5-accent) 14%, transparent), transparent 70%), #0a0a0a;
}
.hb-xj5-phone {
  position: relative;
  width: 320px;
  height: 560px;
  padding: 10px;
  border-radius: 46px;
  background: linear-gradient(160deg, #2a2a2c, #111113 40%, #1d1d1f);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), 0 40px 80px -30px rgba(0,0,0,.9), 0 0 0 1px #000;
}
.hb-xj5-screen { position: relative; height: 100%; border-radius: 37px; overflow: hidden; background: #0c0c0d; }
.hb-xj5-island { position: absolute; top: 10px; left: 50%; z-index: 6; width: 92px; height: 26px; border-radius: 999px; background: #000; transform: translateX(-50%); }
.hb-xj5-app { position: absolute; inset: 0; padding: 48px 18px 120px; overflow: hidden; }
.hb-xj5-view { animation: hb-xj5-in .45s cubic-bezier(.22,1,.36,1); }
@keyframes hb-xj5-in { from { opacity: 0; transform: translateY(10px); } }
.hb-xj5-hi { color: #8f8f8f; font-size: 12px; }
.hb-xj5-title { margin: 2px 0 14px; font-size: 26px; font-weight: 650; letter-spacing: -.035em; }
.hb-xj5-feat { height: 150px; border-radius: 22px; padding: 14px; display: flex; flex-direction: column; justify-content: flex-end; color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
.hb-xj5-feat b { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
.hb-xj5-feat small { color: rgba(255,255,255,.7); font-size: 12px; margin-top: 2px; }
.hb-xj5-rows { display: grid; gap: 10px; margin-top: 14px; }
.hb-xj5-row { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 16px; background: #151517; }
.hb-xj5-row i { width: 38px; height: 38px; flex: none; border-radius: 12px; font-style: normal; }
.hb-xj5-row span { flex: 1; min-width: 0; font-size: 13px; font-weight: 500; }
.hb-xj5-row span small { display: block; color: #7a7a7a; font-size: 11.5px; font-weight: 400; margin-top: 1px; }
.hb-xj5-row em { color: #7a7a7a; font-size: 11px; font-style: normal; }
.hb-xj5-nav {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  height: 74px;
}
.hb-xj5[data-backdrop="false"][data-fixed="true"] .hb-xj5-nav { position: fixed; left: 12px; right: 12px; bottom: calc(10px + env(safe-area-inset-bottom)); width: auto; }
.hb-xj5[data-backdrop="true"] .hb-xj5-nav { position: absolute; left: 10px; right: 10px; bottom: 14px; width: auto; }
.hb-xj5-plate {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: linear-gradient(180deg, #1c1c1f, #141416);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), inset 0 0 0 1px rgba(255,255,255,.05);
  -webkit-mask: radial-gradient(circle at var(--hb-xj5-x) 0, transparent 34px, #000 35px);
  mask: radial-gradient(circle at var(--hb-xj5-x) 0, transparent 34px, #000 35px);
  transition: --hb-xj5-x .6s ${ease};
}
.hb-xj5-shadow {
  position: absolute;
  inset: 8px 6px -6px;
  border-radius: 26px;
  background: rgba(0,0,0,.6);
  filter: blur(14px);
}
.hb-xj5-bubble {
  position: absolute;
  top: -27px;
  left: var(--hb-xj5-x);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #06120d;
  background: radial-gradient(circle at 35% 25%, color-mix(in srgb, var(--hb-xj5-accent) 60%, #fff), var(--hb-xj5-accent) 60%);
  box-shadow: inset 0 -3px 6px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.5), 0 10px 24px -6px color-mix(in srgb, var(--hb-xj5-accent) 70%, transparent);
  transform: translateX(-50%);
  transition: --hb-xj5-x .6s ${ease};
  pointer-events: none;
}
.hb-xj5-bubble svg { width: 22px; height: 22px; animation: hb-xj5-pop .55s ${ease}; }
@keyframes hb-xj5-pop { 0% { transform: scale(.4) rotate(-20deg); opacity: 0; } 100% { transform: none; opacity: 1; } }
.hb-xj5-list { position: relative; display: flex; height: 100%; margin: 0; padding: 0; list-style: none; }
.hb-xj5-list li { flex: 1; display: flex; }
.hb-xj5-tab {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  background: none;
  color: #7c7c80;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color .2s ease;
}
.hb-xj5-tab:hover { color: #d4d4d4; }
.hb-xj5-tab svg { width: 22px; height: 22px; transition: transform .45s ${ease}, opacity .2s ease; }
.hb-xj5-tab[aria-current="page"] svg { opacity: 0; transform: translateY(-22px) scale(.6); }
.hb-xj5-lbl { font-size: 11px; font-weight: 500; letter-spacing: .01em; transition: transform .45s ${ease}, color .2s ease; }
.hb-xj5-tab[aria-current="page"] .hb-xj5-lbl { color: #ededed; transform: translateY(10px); font-weight: 600; }
.hb-xj5-badge {
  position: absolute;
  top: 13px;
  left: calc(50% + 6px);
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ff4d4f;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  box-shadow: 0 0 0 2px #18181a;
  transition: opacity .2s ease, transform .3s ${ease};
}
.hb-xj5-badge[data-dot="true"] { min-width: 8px; width: 8px; height: 8px; padding: 0; top: 16px; left: calc(50% + 7px); }
.hb-xj5-tab[aria-current="page"] .hb-xj5-badge { opacity: 0; transform: scale(.4); }
.hb-xj5-tab:focus-visible { outline: none; }
.hb-xj5-tab:focus-visible .hb-xj5-lbl { outline: 2px solid var(--hb-xj5-accent); outline-offset: 3px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  .hb-xj5 *, .hb-xj5 *::before, .hb-xj5 *::after { transition: none !important; animation: none !important; }
}
`;

const paths: Record<NavbarBottomNotchIcon, React.ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />,
  explore: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5z" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13.5 6.3 6a1.5 1.5 0 0 1 1.4-1h8.6a1.5 1.5 0 0 1 1.4 1L20 13.5V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 13.5h4.5l1 2h5l1-2H20" />
    </>
  ),
  saved: <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.8L6 20V5a1 1 0 0 1 1-1Z" />,
  profile: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 4.5h2.2l2 10.5h10l1.8-7.5H7" />
      <circle cx="9.5" cy="19" r="1.3" />
      <circle cx="16.5" cy="19" r="1.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  chart: <path d="M5 19V11M10 19V6M15 19v-5M20 19V9" />,
};

function Icon({ icon }: { icon: NavbarBottomNotchTab["icon"] }) {
  if (typeof icon === "string" && icon in paths) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[icon as NavbarBottomNotchIcon]}
      </svg>
    );
  }
  return <>{icon}</>;
}

const views = [
  { hi: "Good morning, Noa", title: "Today", feat: ["Morning run club", "6:30 · Riverside loop · 18 going"], grad: "linear-gradient(135deg, #059669, #0ea5e9)" },
  { hi: "Near you", title: "Explore", feat: ["Ceramics weekend", "Sat & Sun · Studio Kiln"], grad: "linear-gradient(135deg, #7c3aed, #db2777)" },
  { hi: "3 unread", title: "Inbox", feat: ["Jules invited you", "Climbing night, Thursday 8pm"], grad: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { hi: "12 items", title: "Saved", feat: ["Jazz on the roof", "Fri · 9pm · Hotel Lumen"], grad: "linear-gradient(135deg, #2563eb, #22d3ee)" },
  { hi: "Member since 2024", title: "Profile", feat: ["42 events joined", "Top 5% in your city"], grad: "linear-gradient(135deg, #334155, #64748b)" },
];

const rows = [
  ["Pottery basics", "Tomorrow · 4 spots left", "linear-gradient(135deg,#fb923c,#f43f5e)", "2h"],
  ["Sunset swim", "Fri · Praia Norte", "linear-gradient(135deg,#38bdf8,#6366f1)", "5h"],
];

export function NavbarBottomNotch({
  tabs = defaultTabs,
  value,
  defaultValue = 0,
  onValueChange,
  fixed = true,
  accent = "#34d399",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarBottomNotchProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = Math.min(value ?? inner, tabs.length - 1);
  const refs = React.useRef<(HTMLElement | null)[]>([]);
  const x = `${(((current + 0.5) / tabs.length) * 100).toFixed(3)}%`;

  const select = (i: number) => {
    if (value === undefined) setInner(i);
    onValueChange?.(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (next < 0) return;
    e.preventDefault();
    refs.current[next]?.focus();
  };

  const nav = (
    <nav className="hb-xj5-nav" aria-label="Primary" style={{ "--hb-xj5-x": x } as React.CSSProperties}>
      <div className="hb-xj5-shadow" aria-hidden="true" />
      <div className="hb-xj5-plate" aria-hidden="true" />
      <div className="hb-xj5-bubble" aria-hidden="true">
        <Icon key={current} icon={tabs[current]?.icon} />
      </div>
      <ul className="hb-xj5-list">
        {tabs.map((t, i) => {
          const content = (
            <>
              <Icon icon={t.icon} />
              <span className="hb-xj5-lbl">{t.label}</span>
              {t.badge ? (
                <span className="hb-xj5-badge" data-dot={t.badge === true ? "true" : "false"} aria-label={t.badge === true ? "New activity" : `${t.badge} new`}>
                  {t.badge === true ? "" : t.badge}
                </span>
              ) : null}
            </>
          );
          return (
            <li key={t.label + i}>
              {t.href ? (
                <a
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="hb-xj5-tab"
                  href={t.href}
                  aria-current={i === current ? "page" : undefined}
                  onClick={(e) => {
                    if (showBackdrop) e.preventDefault();
                    select(i);
                  }}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {content}
                </a>
              ) : (
                <button
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  className="hb-xj5-tab"
                  aria-current={i === current ? "page" : undefined}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const view = views[current % views.length];

  return (
    <div
      className={["hb-xj5", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      data-fixed={fixed ? "true" : "false"}
      style={{ "--hb-xj5-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-bottom-notch" precedence="default">
        {css}
      </style>
      {showBackdrop ? (
        <div className="hb-xj5-phone">
          <div className="hb-xj5-screen">
            <div className="hb-xj5-island" aria-hidden="true" />
            <div className="hb-xj5-app" aria-hidden="true">
              <div className="hb-xj5-view" key={current}>
                <div className="hb-xj5-hi">{view.hi}</div>
                <div className="hb-xj5-title">{tabs[current]?.label ?? view.title}</div>
                <div className="hb-xj5-feat" style={{ background: view.grad }}>
                  <b>{view.feat[0]}</b>
                  <small>{view.feat[1]}</small>
                </div>
                <div className="hb-xj5-rows">
                  {rows.map((r) => (
                    <div className="hb-xj5-row" key={r[0]}>
                      <i style={{ background: r[2] }} />
                      <span>
                        {r[0]}
                        <small>{r[1]}</small>
                      </span>
                      <em>{r[3]}</em>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {nav}
          </div>
        </div>
      ) : (
        nav
      )}
    </div>
  );
}

"use client";

import * as React from "react";

export type NavTabBarIcon = "home" | "explore" | "inbox" | "activity" | "profile" | "plus" | "calendar" | "bag";

export interface NavTabBarTab {
  label: string;
  icon: NavTabBarIcon;
  badge?: number | boolean;
  href?: string;
}

export interface NavTabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "defaultValue" | "onChange"> {
  tabs?: NavTabBarTab[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number, tab: NavTabBarTab) => void;
  showLabels?: boolean;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-yh4 {
  --hb-yh4-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh4 *, .hb-yh4 *::before, .hb-yh4 *::after { box-sizing: border-box; }
.hb-yh4[data-backdrop="true"] {
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 36px 16px 48px;
  background:
    radial-gradient(40% 50% at 50% 40%, color-mix(in srgb, var(--hb-yh4-accent) 18%, transparent), transparent 70%),
    radial-gradient(30% 40% at 18% 80%, rgba(139,92,246,.14), transparent 70%),
    #0a0a0a;
}
.hb-yh4[data-backdrop="true"]::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
  mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
  pointer-events: none;
}
.hb-yh4-side { position: absolute; top: 50%; width: 220px; padding: 14px 16px; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: rgba(20,20,22,.7); backdrop-filter: blur(10px); box-shadow: 0 20px 50px -20px rgba(0,0,0,.8); }
.hb-yh4-side[data-at="l"] { right: calc(50% + 196px); transform: translateY(-80%); animation: hb-yh4-float 6s ease-in-out infinite; }
.hb-yh4-side[data-at="r"] { left: calc(50% + 196px); transform: translateY(10%); animation: hb-yh4-float 7s ease-in-out -2s infinite; }
.hb-yh4-sk { color: #8f8f8f; font-size: 11.5px; }
.hb-yh4-sv { margin-top: 4px; font-size: 22px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-yh4-sv em { margin-left: 6px; color: var(--hb-yh4-accent); font-size: 12px; font-style: normal; font-weight: 600; }
.hb-yh4-spark { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin-top: 10px; }
.hb-yh4-spark i { flex: 1; border-radius: 3px; background: rgba(255,255,255,.12); }
.hb-yh4-spark i:last-child { background: var(--hb-yh4-accent); }
.hb-yh4-phone {
  position: relative;
  z-index: 1;
  width: 300px;
  height: 600px;
  padding: 10px;
  border-radius: 52px;
  background: linear-gradient(145deg, #2b2b2e, #121214 40%, #1d1d20);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), inset 0 0 0 3px #08080a, 0 40px 90px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.6);
}
.hb-yh4-screen { position: relative; display: flex; flex-direction: column; height: 100%; overflow: hidden; border-radius: 42px; background: linear-gradient(180deg, #101012, #0a0a0b); }
.hb-yh4-island { position: absolute; z-index: 3; top: 10px; left: 50%; width: 92px; height: 26px; border-radius: 99px; background: #000; transform: translateX(-50%); }
.hb-yh4-status { display: flex; justify-content: space-between; align-items: center; height: 46px; padding: 6px 28px 0; font-size: 13px; font-weight: 600; }
.hb-yh4-status svg { width: 38px; height: 12px; fill: #ededed; }
.hb-yh4-view { position: relative; flex: 1; overflow: hidden; }
.hb-yh4-track { display: flex; height: 100%; transition: transform .55s cubic-bezier(.3,1,.35,1); transform: translateX(calc(var(--hb-yh4-i) * -100%)); }
.hb-yh4-page { flex: none; width: 100%; height: 100%; padding: 8px 18px 0; }
.hb-yh4-h { margin: 6px 0 14px; font-size: 26px; font-weight: 700; letter-spacing: -.03em; }
.hb-yh4-hero { position: relative; height: 150px; padding: 16px; border-radius: 22px; background: linear-gradient(135deg, color-mix(in srgb, var(--hb-yh4-accent) 70%, #0a0a0a), #1e1b4b); overflow: hidden; }
.hb-yh4-hero::after { content: ""; position: absolute; right: -30px; bottom: -40px; width: 150px; height: 150px; border-radius: 50%; border: 18px solid rgba(255,255,255,.14); }
.hb-yh4-hk { color: rgba(255,255,255,.75); font-size: 11.5px; font-weight: 600; }
.hb-yh4-hv { margin-top: 6px; font-size: 34px; font-weight: 700; letter-spacing: -.04em; }
.hb-yh4-hs { margin-top: 2px; color: rgba(255,255,255,.75); font-size: 12px; }
.hb-yh4-rows { display: grid; gap: 8px; margin-top: 12px; }
.hb-yh4-r { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px; background: #161618; }
.hb-yh4-av { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 50%; color: #fff; font-size: 11.5px; font-weight: 700; }
.hb-yh4-rt { min-width: 0; flex: 1; }
.hb-yh4-rn { display: block; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh4-rd { display: block; margin-top: 2px; color: #8f8f8f; font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh4-rx { color: #8f8f8f; font-size: 11px; }
.hb-yh4-rx b { display: block; width: 8px; height: 8px; margin: 4px 0 0 auto; border-radius: 50%; background: var(--hb-yh4-accent); }
.hb-yh4-search { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border-radius: 14px; background: #19191b; color: #8f8f8f; font-size: 13px; }
.hb-yh4-search svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-yh4-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.hb-yh4-chip { height: 28px; padding: 0 12px; border-radius: 99px; background: #19191b; color: #c4c4c4; font-size: 12px; line-height: 28px; }
.hb-yh4-chip:first-child { background: color-mix(in srgb, var(--hb-yh4-accent) 20%, transparent); color: var(--hb-yh4-accent); }
.hb-yh4-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
.hb-yh4-tile { height: 96px; padding: 10px; border-radius: 18px; color: #fff; font-size: 12px; font-weight: 600; display: flex; align-items: flex-end; }
.hb-yh4-ring { position: relative; width: 170px; height: 170px; margin: 4px auto 14px; }
.hb-yh4-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-yh4-ring circle { fill: none; stroke-width: 14; stroke-linecap: round; }
.hb-yh4-rc { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.hb-yh4-rc b { font-size: 30px; letter-spacing: -.03em; }
.hb-yh4-rc span { color: #8f8f8f; font-size: 11.5px; }
.hb-yh4-me { display: grid; justify-items: center; padding-top: 12px; text-align: center; }
.hb-yh4-big { width: 84px; height: 84px; border-radius: 50%; background: conic-gradient(from 200deg, var(--hb-yh4-accent), #8b5cf6, #f472b6, var(--hb-yh4-accent)); padding: 3px; }
.hb-yh4-big span { display: grid; place-items: center; width: 100%; height: 100%; border-radius: 50%; background: #1b1b1e; font-size: 26px; font-weight: 700; }
.hb-yh4-mn { margin-top: 12px; font-size: 18px; font-weight: 700; }
.hb-yh4-ms { margin-top: 2px; color: #8f8f8f; font-size: 12.5px; }
.hb-yh4-stats { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; margin-top: 18px; padding: 12px 0; border-radius: 16px; background: #161618; }
.hb-yh4-stats div { display: grid; gap: 2px; font-size: 16px; font-weight: 700; }
.hb-yh4-stats span { color: #8f8f8f; font-size: 11px; font-weight: 500; }
.hb-yh4-barwrap { position: relative; z-index: 2; padding: 0 12px 14px; }
.hb-yh4[data-backdrop="false"] .hb-yh4-barwrap { max-width: 480px; margin: 0 auto; padding: 12px; }
.hb-yh4-bar {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-yh4-n), minmax(0, 1fr));
  height: 68px;
  margin: 0;
  padding: 0 6px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(32,32,36,.9), rgba(20,20,22,.92));
  backdrop-filter: blur(18px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 14px 34px -12px rgba(0,0,0,.8);
  list-style: none;
}
.hb-yh4-blob {
  position: absolute;
  top: 9px;
  left: 6px;
  width: calc((100% - 12px) / var(--hb-yh4-n));
  height: 50px;
  pointer-events: none;
  transform: translateX(calc(var(--hb-yh4-i) * 100%));
  transition: transform .5s cubic-bezier(.34,1.45,.5,1);
}
.hb-yh4-blob::before {
  content: "";
  position: absolute;
  inset: 0 6px;
  border-radius: 18px;
  background: radial-gradient(80% 90% at 50% 0%, color-mix(in srgb, var(--hb-yh4-accent) 42%, transparent), color-mix(in srgb, var(--hb-yh4-accent) 14%, transparent));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 0 24px -4px color-mix(in srgb, var(--hb-yh4-accent) 60%, transparent);
  animation: hb-yh4-squash .5s cubic-bezier(.3,1.3,.5,1);
}
.hb-yh4-blob[data-k="b"]::before { animation-name: hb-yh4-squash2; }
.hb-yh4-blob::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--hb-yh4-accent);
  box-shadow: 0 0 8px var(--hb-yh4-accent);
  transform: translateX(-50%);
}
.hb-yh4-li { position: relative; display: flex; }
.hb-yh4-btn {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #7a7a7a;
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color .25s ease;
}
.hb-yh4-btn:hover { color: #c4c4c4; }
.hb-yh4-btn[aria-current="page"] { color: #fff; }
.hb-yh4-btn:focus-visible { outline: none; }
.hb-yh4-btn:focus-visible .hb-yh4-ico { outline: 2px solid var(--hb-yh4-accent); outline-offset: 4px; border-radius: 8px; }
.hb-yh4-ico { position: relative; display: grid; place-items: center; width: 24px; height: 24px; transition: transform .4s cubic-bezier(.34,1.56,.5,1); }
.hb-yh4-btn[aria-current="page"] .hb-yh4-ico { transform: translateY(-1px) scale(1.08); }
.hb-yh4-ico svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh4-btn[aria-current="page"] .hb-yh4-ico svg { stroke-width: 2.1; }
.hb-yh4-lab { white-space: nowrap; letter-spacing: .01em; }
.hb-yh4-badge {
  position: absolute;
  top: -6px;
  left: 14px;
  min-width: 17px;
  height: 17px;
  padding: 0 5px;
  border: 2px solid #18181b;
  border-radius: 99px;
  background: #f43f5e;
  color: #fff;
  font-size: 9.5px;
  font-weight: 700;
  line-height: 13px;
  text-align: center;
  animation: hb-yh4-pop .5s cubic-bezier(.34,1.8,.5,1) .4s both;
}
.hb-yh4-badge[data-dot="true"] { top: -2px; left: 16px; min-width: 0; width: 11px; height: 11px; padding: 0; }
.hb-yh4-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-yh4-squash { 0% { transform: scale(1.35, .78); } 55% { transform: scale(.92, 1.08); } 100% { transform: none; } }
@keyframes hb-yh4-squash2 { 0% { transform: scale(1.35, .78); } 55% { transform: scale(.92, 1.08); } 100% { transform: none; } }
@keyframes hb-yh4-pop { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes hb-yh4-float { 50% { margin-top: -10px; } }
@container (max-width: 820px) {
  .hb-yh4-side { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh4 *, .hb-yh4 *::before, .hb-yh4 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultTabs: NavTabBarTab[] = [
  { label: "Home", icon: "home" },
  { label: "Explore", icon: "explore" },
  { label: "Inbox", icon: "inbox", badge: 3 },
  { label: "Activity", icon: "activity", badge: true },
  { label: "Profile", icon: "profile" },
];

const paths: Record<NavTabBarIcon, React.ReactNode> = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />
    </>
  ),
  explore: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4z" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13.5 6.2 6h11.6l2.2 7.5V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 13.5h4.5l1.2 2h4.6l1.2-2H20" />
    </>
  ),
  activity: <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />,
  profile: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c1.3-3.6 4.1-5.2 7.5-5.2s6.2 1.6 7.5 5.2" />
    </>
  ),
  plus: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </>
  ),
};

const people = [
  { n: "Maya Okafor", d: "Ran 8.2 km along the river", c: "#0ea5e9", t: "2m" },
  { n: "Jonas Weber", d: "Joined Saturday Long Run", c: "#8b5cf6", t: "14m" },
  { n: "Priya Raman", d: "New 5K best: 23:41", c: "#f97316", t: "1h" },
  { n: "Leo Hart", d: "Cheered your tempo run", c: "#10b981", t: "3h" },
];

function initials(n: string) {
  return n
    .split(" ")
    .map((p) => p[0])
    .join("");
}

function Screen({ kind, title }: { kind: number; title: string }) {
  if (kind === 0) {
    return (
      <>
        <h3 className="hb-yh4-h">{title}</h3>
        <div className="hb-yh4-hero">
          <div className="hb-yh4-hk">THIS WEEK</div>
          <div className="hb-yh4-hv">31.4 km</div>
          <div className="hb-yh4-hs">4 runs, 2h 48m moving</div>
        </div>
        <div className="hb-yh4-rows">
          {people.slice(0, 3).map((p) => (
            <div key={p.n} className="hb-yh4-r">
              <span className="hb-yh4-av" style={{ background: p.c }}>
                {initials(p.n)}
              </span>
              <span className="hb-yh4-rt">
                <span className="hb-yh4-rn">{p.n}</span>
                <span className="hb-yh4-rd">{p.d}</span>
              </span>
              <span className="hb-yh4-rx">{p.t}</span>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (kind === 1) {
    const tiles = [
      ["Trail loops", "linear-gradient(160deg,#065f46,#0f766e)"],
      ["Track nights", "linear-gradient(160deg,#7c2d12,#c2410c)"],
      ["Hill repeats", "linear-gradient(160deg,#312e81,#6d28d9)"],
      ["Easy 5K", "linear-gradient(160deg,#0c4a6e,#0369a1)"],
    ];
    return (
      <>
        <h3 className="hb-yh4-h">{title}</h3>
        <div className="hb-yh4-search">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          Routes, clubs, people
        </div>
        <div className="hb-yh4-chips">
          {["Near me", "Under 5 km", "Trails", "Flat"].map((c) => (
            <span key={c} className="hb-yh4-chip">
              {c}
            </span>
          ))}
        </div>
        <div className="hb-yh4-tiles">
          {tiles.map(([t, g]) => (
            <div key={t} className="hb-yh4-tile" style={{ background: g }}>
              {t}
            </div>
          ))}
        </div>
      </>
    );
  }
  if (kind === 2) {
    return (
      <>
        <h3 className="hb-yh4-h">{title}</h3>
        <div className="hb-yh4-rows">
          {people.map((p, i) => (
            <div key={p.n} className="hb-yh4-r">
              <span className="hb-yh4-av" style={{ background: p.c }}>
                {initials(p.n)}
              </span>
              <span className="hb-yh4-rt">
                <span className="hb-yh4-rn">{p.n}</span>
                <span className="hb-yh4-rd">{["See you at 7 by the bridge?", "Route for Sunday is up", "Thanks for the pacing!", "Shoes arrived, trying them"][i]}</span>
              </span>
              <span className="hb-yh4-rx">
                {p.t}
                {i < 3 && <b />}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (kind === 3) {
    const C = 2 * Math.PI * 70;
    return (
      <>
        <h3 className="hb-yh4-h">{title}</h3>
        <div className="hb-yh4-ring">
          <svg viewBox="0 0 170 170" aria-hidden="true">
            <circle cx="85" cy="85" r="70" stroke="rgba(255,255,255,.07)" />
            <circle cx="85" cy="85" r="70" stroke="var(--hb-yh4-accent)" strokeDasharray={C.toFixed(2)} strokeDashoffset={(C * 0.28).toFixed(2)} />
          </svg>
          <div className="hb-yh4-rc">
            <b>72%</b>
            <span>of weekly goal</span>
          </div>
        </div>
        <div className="hb-yh4-rows">
          <div className="hb-yh4-r">
            <span className="hb-yh4-rt">
              <span className="hb-yh4-rn">Tempo run, 6.4 km</span>
              <span className="hb-yh4-rd">Avg pace 4:58 /km</span>
            </span>
            <span className="hb-yh4-rx">Today</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="hb-yh4-me">
      <div className="hb-yh4-big">
        <span>AR</span>
      </div>
      <div className="hb-yh4-mn">Ana Ribeiro</div>
      <div className="hb-yh4-ms">Lisbon Harriers, since 2024</div>
      <div className="hb-yh4-stats">
        <div>
          412<span>km</span>
        </div>
        <div>
          58<span>runs</span>
        </div>
        <div>
          21<span>kudos</span>
        </div>
      </div>
    </div>
  );
}

export function NavTabBar({
  tabs = defaultTabs,
  value,
  defaultValue = 0,
  onValueChange,
  showLabels = true,
  accent = "#22d3ee",
  showBackdrop = true,
  className = "",
  style,
  "aria-label": ariaLabel = "App",
  ...rest
}: NavTabBarProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [flip, setFlip] = React.useState(false);
  const current = value ?? inner;
  const listRef = React.useRef<HTMLUListElement>(null);

  function pick(i: number) {
    if (i === current) return;
    if (value === undefined) setInner(i);
    setFlip((f) => !f);
    onValueChange?.(i, tabs[i]!);
  }

  function onKey(e: React.KeyboardEvent) {
    const nodes = listRef.current ? Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-hb-yh4-tab]")) : [];
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    let next = -1;
    if (e.key === "ArrowRight") next = (at + 1) % nodes.length;
    else if (e.key === "ArrowLeft") next = (at - 1 + nodes.length) % nodes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = nodes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    nodes[next]?.focus();
    pick(next);
  }

  const bar = (
    <div className="hb-yh4-barwrap">
      <ul ref={listRef} className="hb-yh4-bar" onKeyDown={onKey} style={{ "--hb-yh4-n": tabs.length, "--hb-yh4-i": current } as React.CSSProperties}>
        <li className="hb-yh4-blob" data-k={flip ? "b" : "a"} aria-hidden="true" />
        {tabs.map((tab, i) => {
          const active = i === current;
          const inside = (
            <>
              <span className="hb-yh4-ico">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {paths[tab.icon]}
                </svg>
                {tab.badge !== undefined && tab.badge !== false && (
                  <span className="hb-yh4-badge" data-dot={tab.badge === true ? "true" : "false"} aria-hidden="true">
                    {typeof tab.badge === "number" ? (tab.badge > 99 ? "99+" : tab.badge) : null}
                  </span>
                )}
              </span>
              {showLabels ? <span className="hb-yh4-lab">{tab.label}</span> : <span className="hb-yh4-sr">{tab.label}</span>}
              {typeof tab.badge === "number" && <span className="hb-yh4-sr">, {tab.badge} new</span>}
              {tab.badge === true && <span className="hb-yh4-sr">, new activity</span>}
            </>
          );
          return (
            <li key={tab.label} className="hb-yh4-li">
              {tab.href ? (
                <a
                  href={tab.href}
                  className="hb-yh4-btn"
                  data-hb-yh4-tab=""
                  aria-current={active ? "page" : undefined}
                  tabIndex={active ? 0 : -1}
                  onClick={() => pick(i)}
                >
                  {inside}
                </a>
              ) : (
                <button
                  type="button"
                  className="hb-yh4-btn"
                  data-hb-yh4-tab=""
                  aria-current={active ? "page" : undefined}
                  tabIndex={active ? 0 : -1}
                  onClick={() => pick(i)}
                >
                  {inside}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={`hb-yh4 ${className}`}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-yh4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-nav-tab-bar" precedence="default">
        {css}
      </style>
      {showBackdrop ? (
        <>
          <div className="hb-yh4-side" data-at="l" aria-hidden="true">
            <div className="hb-yh4-sk">Weekly distance</div>
            <div className="hb-yh4-sv">
              31.4 km<em>+12%</em>
            </div>
            <div className="hb-yh4-spark">
              {[40, 62, 35, 70, 52, 80, 96].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="hb-yh4-side" data-at="r" aria-hidden="true">
            <div className="hb-yh4-sk">Unread in Inbox</div>
            <div className="hb-yh4-sv">
              3<em>from your club</em>
            </div>
          </div>
          <div className="hb-yh4-phone">
            <div className="hb-yh4-screen">
              <span className="hb-yh4-island" aria-hidden="true" />
              <div className="hb-yh4-status" aria-hidden="true">
                <span>9:41</span>
                <svg viewBox="0 0 38 12">
                  <rect x="0" y="7" width="3" height="5" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                  <rect x="23" y="1" width="13" height="10" rx="3" fill="none" stroke="#ededed" strokeWidth="1.2" />
                  <rect x="25" y="3" width="8" height="6" rx="1.5" />
                </svg>
              </div>
              <div className="hb-yh4-view" aria-hidden="true">
                <div className="hb-yh4-track" style={{ "--hb-yh4-i": current } as React.CSSProperties}>
                  {tabs.map((tab, i) => (
                    <div key={tab.label} className="hb-yh4-page">
                      <Screen kind={i % 5} title={tab.label} />
                    </div>
                  ))}
                </div>
              </div>
              {bar}
            </div>
          </div>
        </>
      ) : (
        bar
      )}
    </nav>
  );
}

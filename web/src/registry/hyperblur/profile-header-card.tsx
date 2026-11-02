"use client";

import * as React from "react";

export interface ProfileHeaderCardStat {
  label: string;
  value: number;
}

export interface ProfileHeaderCardTab {
  id: string;
  label: string;
  count?: number;
}

export interface ProfileHeaderCardPost {
  title: string;
  meta: string;
  hue: number;
}

export interface ProfileHeaderCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  handle?: string;
  verified?: boolean;
  bio?: string;
  location?: string;
  website?: { label: string; href: string };
  joined?: string;
  stats?: ProfileHeaderCardStat[];
  tabs?: ProfileHeaderCardTab[];
  panels?: Record<string, ProfileHeaderCardPost[]>;
  tab?: string;
  defaultTab?: string;
  onTabChange?: (id: string) => void;
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  onMessage?: () => void;
  accent?: string;
}

const defaultStats: ProfileHeaderCardStat[] = [
  { label: "Followers", value: 48210 },
  { label: "Following", value: 312 },
  { label: "Appreciations", value: 1294000 },
];

const defaultTabs: ProfileHeaderCardTab[] = [
  { id: "posts", label: "Posts", count: 128 },
  { id: "work", label: "Work", count: 24 },
  { id: "likes", label: "Likes" },
];

const defaultPanels: Record<string, ProfileHeaderCardPost[]> = {
  posts: [
    { title: "Why our settings page has no save button", meta: "2 days ago · 312 likes", hue: 218 },
    { title: "A type scale that survives dark mode", meta: "Last week · 1.4K likes", hue: 262 },
    { title: "Notes from shipping Ledger 2.0", meta: "Oct 12 · 856 likes", hue: 190 },
  ],
  work: [
    { title: "Ledger, a calm finance app", meta: "Case study · 2026", hue: 152 },
    { title: "Northwind design system", meta: "Lead designer · 2024", hue: 226 },
    { title: "Field, offline maps for hikers", meta: "Side project · 2023", hue: 32 },
  ],
  likes: [
    { title: "The quiet power of empty states", meta: "by Theo Lind", hue: 300 },
    { title: "Designing for 300ms", meta: "by Ana Sousa", hue: 12 },
    { title: "Color tokens at scale", meta: "by Kenji Mori", hue: 200 },
  ],
};

const css = `
.hb-kg5 {
  --hb-kg5-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg5 *, .hb-kg5 *::before, .hb-kg5 *::after { box-sizing: border-box; }
.hb-kg5-inner { max-width: 1120px; margin: 0 auto; padding: 48px 16px 64px; }
.hb-kg5-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 24px;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04), 0 30px 80px -40px rgba(0, 0, 0, .8);
}
.hb-kg5-cover {
  position: relative;
  height: clamp(130px, 22cqi, 220px);
  overflow: hidden;
  background:
    radial-gradient(40% 80% at 18% 30%, var(--hb-kg5-accent), transparent 70%),
    radial-gradient(35% 70% at 78% 18%, #a855f7, transparent 70%),
    radial-gradient(45% 90% at 58% 110%, #14b8a6, transparent 70%),
    #0d1222;
  background-size: 140% 140%;
  animation: hb-kg5-drift 18s ease-in-out infinite alternate;
}
.hb-kg5-cover::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, .08) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(255, 255, 255, .08) 1px, transparent 1px) 0 0 / 32px 32px;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%, transparent);
  mask-image: linear-gradient(180deg, transparent, #000 40%, transparent);
}
.hb-kg5-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(17, 17, 17, .65));
}
.hb-kg5-body { padding: 0 20px 4px; }
.hb-kg5-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.hb-kg5-avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(84px, 13cqi, 116px);
  aspect-ratio: 1;
  margin-top: calc(clamp(84px, 13cqi, 116px) / -2);
  border: 4px solid #111;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd29a, #ff7a59 50%, #c2417a);
  color: #1b0f12;
  font-size: clamp(28px, 4.4cqi, 40px);
  font-weight: 700;
  letter-spacing: -.02em;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, .7);
  z-index: 1;
}
.hb-kg5-online {
  position: absolute;
  right: 6%;
  bottom: 6%;
  width: 18%;
  aspect-ratio: 1;
  border: 3px solid #111;
  border-radius: 50%;
  background: #22c55e;
}
.hb-kg5-actions { display: flex; gap: 8px; padding-top: 14px; }
.hb-kg5-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 40px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .2s cubic-bezier(.2, .8, .2, 1), box-shadow .2s ease;
}
.hb-kg5-btn svg { width: 16px; height: 16px; flex: none; }
.hb-kg5-btn:hover { border-color: rgba(255, 255, 255, .24); background: rgba(255, 255, 255, .07); }
.hb-kg5-btn:active { transform: scale(.97); }
.hb-kg5 button:focus-visible, .hb-kg5 a:focus-visible { outline: 2px solid var(--hb-kg5-accent); outline-offset: 2px; }
.hb-kg5-icon { width: 40px; padding: 0; }
.hb-kg5-follow[aria-pressed="false"] {
  border-color: transparent;
  background: var(--hb-kg5-accent);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 8px 24px -10px var(--hb-kg5-accent);
}
.hb-kg5-follow[aria-pressed="false"]:hover { background: color-mix(in srgb, var(--hb-kg5-accent) 88%, #fff); }
.hb-kg5-follow[aria-pressed="true"] { min-width: 120px; }
.hb-kg5-main { display: inline-flex; align-items: center; gap: 7px; }
.hb-kg5-follow .hb-kg5-alt { display: none; }
.hb-kg5-follow[aria-pressed="true"]:hover { border-color: rgba(248, 113, 113, .4); color: #fca5a5; background: rgba(248, 113, 113, .08); }
.hb-kg5-follow[aria-pressed="true"]:hover .hb-kg5-main { display: none; }
.hb-kg5-follow[aria-pressed="true"]:hover .hb-kg5-alt { display: inline; }
.hb-kg5-grid { display: grid; gap: 20px; margin-top: 16px; }
.hb-kg5-name { display: flex; align-items: center; gap: 8px; margin: 0; font-size: clamp(22px, 3.2cqi, 30px); font-weight: 680; letter-spacing: -.025em; }
.hb-kg5-name svg { width: 22px; height: 22px; flex: none; color: var(--hb-kg5-accent); }
.hb-kg5-handle { margin: 2px 0 0; color: #8f8f8f; font-size: 15px; }
.hb-kg5-bio { margin: 14px 0 0; max-width: 580px; color: #cfcfcf; font-size: 15px; line-height: 1.6; text-wrap: pretty; }
.hb-kg5-meta { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 14px 0 0; padding: 0; list-style: none; color: #8f8f8f; font-size: 14px; }
.hb-kg5-meta li { display: inline-flex; align-items: center; gap: 6px; }
.hb-kg5-meta svg { width: 15px; height: 15px; }
.hb-kg5-meta a { color: color-mix(in srgb, var(--hb-kg5-accent) 55%, #fff); text-decoration: none; }
.hb-kg5-meta a:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-kg5-stats {
  display: grid;
  grid-template-columns: repeat(var(--hb-kg5-n), minmax(0, 1fr));
  align-self: start;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(180deg, #151515, #121212);
}
.hb-kg5-stat { display: flex; flex-direction: column-reverse; padding: 14px 16px; min-width: 0; }
.hb-kg5-stat + .hb-kg5-stat { border-left: 1px solid rgba(255, 255, 255, .06); }
.hb-kg5-num { display: block; font-size: clamp(20px, 2.8cqi, 26px); font-weight: 680; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-kg5-lbl { display: block; overflow: hidden; margin-top: 2px; color: #8f8f8f; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-kg5-tabs { position: relative; display: flex; gap: 4px; margin: 24px -20px 0; padding: 0 20px; border-bottom: 1px solid rgba(255, 255, 255, .08); overflow-x: auto; scrollbar-width: none; }
.hb-kg5-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px 8px 0 0;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-kg5-tab:hover { color: #ededed; }
.hb-kg5-tab[aria-selected="true"] { color: #ededed; }
.hb-kg5-tab:focus-visible { outline-offset: -2px; }
.hb-kg5-count { padding: 1px 7px; border-radius: 999px; background: rgba(255, 255, 255, .06); color: #a1a1a1; font-size: 11px; font-weight: 600; }
.hb-kg5-bar {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: var(--hb-kg5-accent);
  box-shadow: 0 0 12px var(--hb-kg5-accent);
  transition: transform .35s cubic-bezier(.3, .9, .3, 1), width .35s cubic-bezier(.3, .9, .3, 1);
}
.hb-kg5-panel { display: grid; gap: 12px; padding: 20px 0 20px; }
.hb-kg5-post {
  display: grid;
  gap: 10px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 16px;
  background: #141414;
  animation: hb-kg5-up .45s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kg5-i);
  transition: border-color .2s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kg5-post:hover { border-color: rgba(255, 255, 255, .14); transform: translateY(-2px); }
.hb-kg5-thumb { height: 96px; border-radius: 10px; }
.hb-kg5-ptitle { margin: 0; padding: 0 4px; font-size: 14px; font-weight: 600; line-height: 1.4; }
.hb-kg5-pmeta { margin: -4px 0 2px; padding: 0 4px; color: #8f8f8f; font-size: 12px; }
@container (min-width: 640px) {
  .hb-kg5-inner { padding: 64px 32px 88px; }
  .hb-kg5-body { padding: 0 32px 8px; }
  .hb-kg5-tabs { margin: 28px -32px 0; padding: 0 32px; }
  .hb-kg5-panel { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
}
@container (min-width: 900px) {
  .hb-kg5-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 380px); gap: 40px; }
  .hb-kg5-stats { margin-top: 6px; }
}
@keyframes hb-kg5-drift { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
@keyframes hb-kg5-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg5-cover, .hb-kg5-post { animation: none; }
  .hb-kg5-bar, .hb-kg5-btn, .hb-kg5-post, .hb-kg5-tab { transition: none; }
  .hb-kg5-post:hover { transform: none; }
}
`;

function compact(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(n >= 10000000 ? 0 : 1).replace(/\.0$/, "")}M`;
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString("en-US");
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export function ProfileHeaderCard({
  name = "Maya Okafor",
  handle = "@mayabuilds",
  verified = true,
  bio = "Product designer building calm tools for busy teams. Previously design lead at Northwind. Writing about interfaces, type and the craft of shipping.",
  location = "Lisbon, Portugal",
  website = { label: "maya.design", href: "https://maya.design" },
  joined = "Joined March 2019",
  stats = defaultStats,
  tabs = defaultTabs,
  panels = defaultPanels,
  tab,
  defaultTab,
  onTabChange,
  following,
  defaultFollowing = false,
  onFollowChange,
  onMessage,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ProfileHeaderCardProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [innerTab, setInnerTab] = React.useState(defaultTab ?? tabs[0]?.id ?? "");
  const [innerFollowing, setInnerFollowing] = React.useState(defaultFollowing);
  const [progress, setProgress] = React.useState(0);
  const [bar, setBar] = React.useState({ x: 0, w: 0 });
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = React.useRef<HTMLDivElement>(null);
  const active = tab ?? innerTab;
  const isFollowing = following ?? innerFollowing;
  const vars = { "--hb-kg5-accent": accent, ...style } as React.CSSProperties;

  React.useEffect(() => {
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf);
    }
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1400);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setBar({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const selectTab = (id: string) => {
    if (tab === undefined) setInnerTab(id);
    onTabChange?.(id);
  };

  const toggleFollow = () => {
    const next = !isFollowing;
    if (following === undefined) setInnerFollowing(next);
    onFollowChange?.(next);
  };

  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const at = tabs.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === "ArrowRight") next = (at + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (at - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.current[tabs[next].id]?.focus();
  };

  const eased = 1 - Math.pow(1 - progress, 3);
  const posts = panels[active] ?? [];

  return (
    <section className={`hb-kg5 ${className}`} style={vars} aria-labelledby={`${uid}-name`} {...rest}>
      <style href="hb-profile-header-card" precedence="default">{css}</style>
      <div className="hb-kg5-inner">
        <div className="hb-kg5-card">
          <div className="hb-kg5-cover" aria-hidden="true" />
          <div className="hb-kg5-body">
            <div className="hb-kg5-top">
              <div className="hb-kg5-avatar" aria-hidden="true">
                {initialsOf(name)}
                <span className="hb-kg5-online" />
              </div>
              <div className="hb-kg5-actions">
                <button type="button" className="hb-kg5-btn hb-kg5-icon" aria-label="Message" onClick={onMessage}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 11H7l-3 2.5V11a1.5 1.5 0 0 1-1.5-1.5v-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" className="hb-kg5-btn hb-kg5-follow" aria-pressed={isFollowing} onClick={toggleFollow}>
                  {isFollowing ? (
                    <>
                      <span className="hb-kg5-main">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Following
                      </span>
                      <span className="hb-kg5-alt">Unfollow</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                      Follow
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="hb-kg5-grid">
              <div>
                <h2 id={`${uid}-name`} className="hb-kg5-name">
                  {name}
                  {verified && (
                    <svg viewBox="0 0 24 24" aria-label="Verified" role="img">
                      <path fill="currentColor" d="M12 1.8 14.6 4l3.4-.3.9 3.3 3 1.7-1.3 3.2 1.3 3.2-3 1.7-.9 3.3-3.4-.3L12 22.2 9.4 20l-3.4.3-.9-3.3-3-1.7L3.4 12 2.1 8.8l3-1.7.9-3.3 3.4.3L12 1.8Z" />
                      <path d="m8 12.2 2.7 2.7L16.2 9.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </h2>
                <p className="hb-kg5-handle">{handle}</p>
                {bio && <p className="hb-kg5-bio">{bio}</p>}
                <ul className="hb-kg5-meta">
                  {location && (
                    <li>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
                      {location}
                    </li>
                  )}
                  {website && (
                    <li>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6.5 9.5 9.5 6.5M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                      <a href={website.href}>{website.label}</a>
                    </li>
                  )}
                  {joined && (
                    <li>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                      {joined}
                    </li>
                  )}
                </ul>
              </div>
              {stats.length > 0 && (
                <dl className="hb-kg5-stats" style={{ "--hb-kg5-n": stats.length, margin: 0 } as React.CSSProperties}>
                  {stats.map((s, i) => {
                    const target = s.value + (i === 0 && isFollowing && following === undefined ? 1 : 0);
                    return (
                      <div key={s.label} className="hb-kg5-stat">
                        <dt className="hb-kg5-lbl">{s.label}</dt>
                        <dd className="hb-kg5-num" style={{ margin: 0 }}>{compact(Math.round(target * eased))}</dd>
                      </div>
                    );
                  })}
                </dl>
              )}
            </div>
            <div ref={listRef} className="hb-kg5-tabs" role="tablist" aria-label="Profile sections" onKeyDown={onTabKey}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[t.id] = el; }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={t.id === active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={t.id === active ? 0 : -1}
                  className="hb-kg5-tab"
                  onClick={() => selectTab(t.id)}
                >
                  {t.label}
                  {t.count !== undefined && <span className="hb-kg5-count">{t.count}</span>}
                </button>
              ))}
              <span className="hb-kg5-bar" aria-hidden="true" style={{ width: bar.w, transform: `translateX(${bar.x}px)` }} />
            </div>
            <div key={active} id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="hb-kg5-panel">
              {posts.map((p, i) => (
                <article key={p.title} className="hb-kg5-post" style={{ "--hb-kg5-i": `${i * 60}ms` } as React.CSSProperties}>
                  <div
                    className="hb-kg5-thumb"
                    style={{
                      background: `radial-gradient(70% 90% at 25% 20%, hsl(${p.hue} 90% 62% / .9), transparent 70%), radial-gradient(60% 80% at 85% 90%, hsl(${(p.hue + 50) % 360} 80% 55% / .8), transparent 70%), hsl(${p.hue} 30% 12%)`,
                    }}
                  />
                  <h3 className="hb-kg5-ptitle">{p.title}</h3>
                  <p className="hb-kg5-pmeta">{p.meta}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

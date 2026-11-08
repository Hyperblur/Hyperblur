"use client";

import * as React from "react";

export interface ReadingTimePost {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  minutes: number;
  hue: number;
  href: string;
}

export type ReadingTimeFilter = "all" | "quick" | "medium" | "long";

export interface BlogReadingTimeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  posts?: ReadingTimePost[];
  defaultFilter?: ReadingTimeFilter;
  accent?: string;
  onPostClick?: (post: ReadingTimePost, index: number) => void;
}

const defaultPosts: ReadingTimePost[] = [
  { title: "How we cut our cloud bill by 61% without a migration", excerpt: "No rewrite, no new vendor. Three months of measuring, a spreadsheet nobody wanted to own, and eleven small changes that added up.", category: "Engineering", author: "Priya Raman", date: "Nov 5, 2026", minutes: 14, hue: 200, href: "#" },
  { title: "The case for boring status pages", excerpt: "Customers read them at the worst moment of their week.", category: "Reliability", author: "Tomás Herrera", date: "Nov 3, 2026", minutes: 4, hue: 32, href: "#" },
  { title: "Designing an empty state people actually finish", excerpt: "What changed when we stopped decorating and started asking.", category: "Design", author: "Hana Okafor", date: "Oct 30, 2026", minutes: 8, hue: 330, href: "#" },
  { title: "A year of on-call with a four-person team", excerpt: "Rotations, pages per week and the one rule that saved us.", category: "Teams", author: "Lena Fischer", date: "Oct 24, 2026", minutes: 11, hue: 150, href: "#" },
  { title: "Five SQL habits that age well", excerpt: "Small conventions that make next year's queries easy to read.", category: "Engineering", author: "Marcus Bell", date: "Oct 19, 2026", minutes: 5, hue: 260, href: "#" },
  { title: "Inside the redesign of our billing page", excerpt: "Forty-two interviews, three prototypes and a pricing table we threw away.", category: "Design", author: "Hana Okafor", date: "Oct 11, 2026", minutes: 18, hue: 12, href: "#" },
];

const css = `
.hb-we9 {
  --hb-we9-accent: #a3e635;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0b0b0c;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we9 *, .hb-we9 *::before, .hb-we9 *::after { box-sizing: border-box; }
.hb-we9-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we9-head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: clamp(24px, 3.4cqi, 36px); }
.hb-we9-eyebrow { margin: 0 0 10px; color: #8f8f8f; font-size: 13px; font-weight: 500; }
.hb-we9-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; }
.hb-we9-filter { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-we9-f { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 10px; border: 0; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; font-weight: 500; color: #a1a1a1; background: #141416; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); transition: color .2s ease, background .2s ease, box-shadow .2s ease; }
.hb-we9-f:hover { color: #ededed; }
.hb-we9-f[aria-pressed="true"] { color: #0b0b0c; background: var(--hb-we9-accent); box-shadow: none; }
.hb-we9-f:focus-visible { outline: 2px solid var(--hb-we9-accent); outline-offset: 2px; }
.hb-we9-f b { font-weight: 600; font-variant-numeric: tabular-nums; opacity: .6; }
.hb-we9-grid { display: grid; gap: clamp(18px, 2.6cqi, 28px); }
.hb-we9-feat { position: relative; display: grid; align-content: end; min-height: clamp(360px, 46cqi, 520px); padding: clamp(20px, 3cqi, 32px); border-radius: 24px; overflow: hidden; color: inherit; text-decoration: none; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); animation: hb-we9-swap .6s cubic-bezier(.2,.8,.2,1) both; }
.hb-we9-cover { position: absolute; inset: 0; z-index: -1; transition: transform 1.2s cubic-bezier(.2,.8,.2,1); }
.hb-we9-cover svg { width: 100%; height: 100%; display: block; }
.hb-we9-feat:hover .hb-we9-cover { transform: scale(1.04); }
.hb-we9-feat::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(11,11,12,0) 25%, rgba(11,11,12,.9) 80%); }
.hb-we9-feat:focus-visible { outline: 2px solid var(--hb-we9-accent); outline-offset: 3px; }
.hb-we9-ft { margin: 14px 0 10px; max-width: 22ch; font-family: var(--font-grotesk, inherit); font-size: clamp(24px, 3.4cqi, 38px); font-weight: 600; line-height: 1.08; letter-spacing: -.03em; text-wrap: balance; }
.hb-we9-fx { margin: 0; max-width: 52ch; color: #c9c9c9; font-size: 14.5px; line-height: 1.6; }
.hb-we9-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.hb-we9-cat { height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 500; line-height: 24px; color: #fff; background: rgba(255,255,255,.12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.hb-we9-meta { display: flex; align-items: center; gap: 10px; margin-top: 16px; color: #a1a1a1; font-size: 13px; }
.hb-we9-av { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; flex: none; font-size: 10px; font-weight: 700; color: #0b0b0c; background: hsl(var(--hb-we9-h) 70% 72%); }
.hb-we9-time { display: inline-flex; align-items: center; gap: 7px; height: 26px; padding: 0 10px 0 6px; border-radius: 999px; font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; color: #ededed; background: rgba(255,255,255,.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); white-space: nowrap; }
.hb-we9-time svg { width: 16px; height: 16px; transform: rotate(-90deg); }
.hb-we9-time circle:last-child { stroke-dasharray: var(--hb-we9-m) 100; animation: hb-we9-pie .9s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we9-k, 0) * 70ms + 200ms); }
.hb-we9-time[data-len="long"] { color: #0b0b0c; background: var(--hb-we9-accent); box-shadow: none; }
.hb-we9-time[data-len="long"] circle:first-child { stroke: rgba(0,0,0,.2); }
.hb-we9-time[data-len="long"] circle:last-child { stroke: #0b0b0c; }
.hb-we9-list { display: grid; align-content: start; margin: 0; padding: 0; list-style: none; }
.hb-we9-item { border-top: 1px solid rgba(255,255,255,.07); animation: hb-we9-in .5s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we9-k) * 70ms); }
.hb-we9-item:first-child { border-top: 0; }
.hb-we9-link { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 16px; align-items: center; padding: 16px 4px; color: inherit; text-decoration: none; border-radius: 12px; transition: background .25s ease; }
.hb-we9-link:hover { background: rgba(255,255,255,.025); }
.hb-we9-link:focus-visible { outline: 2px solid var(--hb-we9-accent); outline-offset: 2px; }
.hb-we9-thumb { width: 64px; height: 64px; border-radius: 14px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
.hb-we9-thumb svg { width: 100%; height: 100%; display: block; transition: transform .6s cubic-bezier(.2,.8,.2,1); }
.hb-we9-link:hover .hb-we9-thumb svg { transform: scale(1.12) rotate(-2deg); }
.hb-we9-lt { margin: 6px 0 0; font-size: 15.5px; font-weight: 600; line-height: 1.35; letter-spacing: -.01em; text-wrap: balance; }
.hb-we9-lc { color: #8f8f8f; font-size: 12px; }
.hb-we9-empty { padding: 40px 0; color: #8f8f8f; font-size: 14px; text-align: center; }
@keyframes hb-we9-swap { from { opacity: 0; transform: scale(.985); } to { opacity: 1; transform: none; } }
@keyframes hb-we9-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-we9-pie { from { stroke-dasharray: 0 100; } }
@container (min-width: 860px) {
  .hb-we9-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
}
@container (max-width: 480px) {
  .hb-we9-fx { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we9 *, .hb-we9 *::before, .hb-we9 *::after { transition: none !important; animation: none !important; }
}
`;

function lengthOf(m: number): Exclude<ReadingTimeFilter, "all"> {
  if (m < 6) return "quick";
  if (m <= 12) return "medium";
  return "long";
}

const filterLabels: { id: ReadingTimeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "quick", label: "Under 6 min" },
  { id: "medium", label: "6 to 12 min" },
  { id: "long", label: "Long reads" },
];

function Cover({ post, seed, uid }: { post: ReadingTimePost; seed: number; uid: string }) {
  const h = post.hue;
  const id = `${uid}c${seed}`;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${h} 70% 46%)`} />
          <stop offset="1" stopColor={`hsl(${(h + 50) % 360} 60% 16%)`} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={i} cx={320 - i * 8} cy={70 + i * 4} r={150 - i * 20} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
      ))}
      <rect x={40 + (seed % 3) * 30} y="60" width="120" height="160" rx="8" fill="rgba(255,255,255,.1)" transform={`rotate(${(seed % 5) * 3 - 6} 100 140)`} />
      <circle cx={280 + (seed % 4) * 10} cy="200" r="40" fill={`hsl(${(h + 30) % 360} 90% 70%)`} opacity=".85" />
    </svg>
  );
}

function TimeChip({ minutes, k }: { minutes: number; k?: number }) {
  const m = Math.max(4, Math.min(100, (minutes / 20) * 100));
  return (
    <span className="hb-we9-time" data-len={lengthOf(minutes)} style={{ "--hb-we9-m": m.toFixed(1), "--hb-we9-k": k ?? 0 } as React.CSSProperties}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="7" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="3" pathLength={100} />
      </svg>
      {minutes} min
    </span>
  );
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export function BlogReadingTime({
  eyebrow = "From the Fieldwork blog",
  title = "Read what fits the time you have",
  posts = defaultPosts,
  defaultFilter = "all",
  accent = "#a3e635",
  onPostClick,
  className,
  style,
  ...rest
}: BlogReadingTimeProps) {
  const [filter, setFilter] = React.useState<ReadingTimeFilter>(defaultFilter);
  const uid = React.useId().replace(/:/g, "");
  const visible = posts.filter((p) => filter === "all" || lengthOf(p.minutes) === filter);
  const [feat, ...others] = visible;
  const counts = (id: ReadingTimeFilter) => (id === "all" ? posts.length : posts.filter((p) => lengthOf(p.minutes) === id).length);

  return (
    <section
      className={["hb-we9", className].filter(Boolean).join(" ")}
      style={{ "--hb-we9-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-reading-time" precedence="default">{css}</style>
      <div className="hb-we9-inner">
        <div className="hb-we9-head">
          <div>
            {eyebrow ? <p className="hb-we9-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-we9-title">{title}</h2>
          </div>
          <div className="hb-we9-filter" role="group" aria-label="Filter by reading time">
            {filterLabels.map((f) => (
              <button key={f.id} type="button" className="hb-we9-f" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                {f.label}
                <b>{counts(f.id)}</b>
              </button>
            ))}
          </div>
        </div>
        {feat ? (
          <div className="hb-we9-grid">
            <a
              key={`${filter}-${feat.title}`}
              className="hb-we9-feat"
              href={feat.href}
              onClick={() => onPostClick?.(feat, posts.indexOf(feat))}
              style={{ "--hb-we9-h": feat.hue } as React.CSSProperties}
            >
              <span className="hb-we9-cover"><Cover post={feat} seed={posts.indexOf(feat)} uid={uid} /></span>
              <span className="hb-we9-row">
                <span className="hb-we9-cat">{feat.category}</span>
                <TimeChip minutes={feat.minutes} />
              </span>
              <h3 className="hb-we9-ft">{feat.title}</h3>
              <p className="hb-we9-fx">{feat.excerpt}</p>
              <span className="hb-we9-meta">
                <span className="hb-we9-av" aria-hidden="true">{initials(feat.author)}</span>
                {feat.author} · {feat.date}
              </span>
            </a>
            <ul className="hb-we9-list" key={filter}>
              {others.map((p, i) => (
                <li key={p.title} className="hb-we9-item" style={{ "--hb-we9-k": i } as React.CSSProperties}>
                  <a className="hb-we9-link" href={p.href} onClick={() => onPostClick?.(p, posts.indexOf(p))}>
                    <span className="hb-we9-thumb"><Cover post={p} seed={posts.indexOf(p) + 10} uid={uid} /></span>
                    <span style={{ minWidth: 0 }}>
                      <span className="hb-we9-row">
                        <TimeChip minutes={p.minutes} k={i} />
                        <span className="hb-we9-lc">{p.category} · {p.date}</span>
                      </span>
                      <h3 className="hb-we9-lt">{p.title}</h3>
                    </span>
                  </a>
                </li>
              ))}
              {others.length === 0 ? <li className="hb-we9-empty">That is the only post in this length. Try another filter.</li> : null}
            </ul>
          </div>
        ) : (
          <p className="hb-we9-empty">No posts match this length yet.</p>
        )}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface BlogFeaturedPost {
  title: string;
  excerpt?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
  cover?: string;
}

export interface BlogFeaturedGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  posts?: BlogFeaturedPost[];
  cta?: { label: string; href: string };
  accent?: string;
  onPostClick?: (post: BlogFeaturedPost, index: number) => void;
}

const defaultPosts: BlogFeaturedPost[] = [
  {
    title: "How we cut cold starts from 1.8s to 240ms without rewriting the runtime",
    excerpt: "A year of profiling edge functions taught us that most latency hides in places nobody measures. Here is the playbook we now run on every new service.",
    category: "Engineering",
    author: "Priya Raman",
    date: "Oct 28, 2026",
    readTime: "12 min read",
    href: "#",
  },
  {
    title: "Designing empty states that actually move people forward",
    category: "Design",
    author: "Tomás Álvarez",
    date: "Oct 24, 2026",
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Our pricing page, rebuilt from 41 customer interviews",
    category: "Growth",
    author: "Hana Ito",
    date: "Oct 19, 2026",
    readTime: "8 min read",
    href: "#",
  },
  {
    title: "Postgres row-level security at 30,000 tenants",
    category: "Engineering",
    author: "Marcus Bell",
    date: "Oct 14, 2026",
    readTime: "10 min read",
    href: "#",
  },
  {
    title: "Release notes: offline drafts, faster search, team spaces",
    category: "Product",
    author: "Elin Berg",
    date: "Oct 9, 2026",
    readTime: "4 min read",
    href: "#",
  },
];

const palettes = [
  ["#2a1b5c", "#7c3aed", "#f0abfc"],
  ["#0c2f3a", "#0ea5a4", "#a7f3d0"],
  ["#3a1a12", "#ea580c", "#fde68a"],
  ["#101c3d", "#2f7bff", "#bae6fd"],
  ["#2d0f24", "#db2777", "#fbcfe8"],
  ["#14261a", "#16a34a", "#d9f99d"],
];

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function coverBackground(seed: number) {
  const [deep, mid, light] = palettes[seed % palettes.length];
  const x = 20 + (seed % 60);
  const y = 15 + ((seed >> 3) % 50);
  return `radial-gradient(120% 90% at ${x}% ${y}%, ${light} 0%, transparent 42%), radial-gradient(90% 120% at ${100 - x}% 100%, ${mid} 0%, transparent 60%), linear-gradient(135deg, ${deep}, ${mid})`;
}

function CoverArt({ seed }: { seed: number }) {
  const variant = seed % 4;
  return (
    <svg className="hb-ki1-art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {variant === 0 &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx="250" cy="150" r={(30 + i * 28).toFixed(0)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />
        ))}
      {variant === 1 &&
        Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={(i * 26 - 40).toFixed(0)} y1="210" x2={(i * 26 + 60).toFixed(0)} y2="-10" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
        ))}
      {variant === 2 &&
        Array.from({ length: 60 }, (_, i) => {
          const cx = 20 + (i % 12) * 26;
          const cy = 24 + Math.floor(i / 12) * 38;
          const r = 1.4 + ((hash(`${seed}-${i}`) % 30) / 10);
          return <circle key={i} cx={cx} cy={cy} r={r.toFixed(2)} fill="rgba(255,255,255,.32)" />;
        })}
      {variant === 3 &&
        [0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M -10 ${(120 + i * 18).toFixed(0)} C 80 ${(60 + i * 18).toFixed(0)}, 180 ${(180 + i * 12).toFixed(0)}, 330 ${(90 + i * 20).toFixed(0)}`}
            fill="none"
            stroke="rgba(255,255,255,.24)"
            strokeWidth="1.2"
          />
        ))}
    </svg>
  );
}

const css = `
.hb-ki1 {
  --hb-ki1-accent: #8b5cf6;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki1 *, .hb-ki1 *::before, .hb-ki1 *::after { box-sizing: border-box; }
.hb-ki1-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(56px, 9cqi, 104px) clamp(18px, 4cqi, 40px);
}
.hb-ki1-head {
  display: grid;
  gap: 18px;
  margin-bottom: clamp(28px, 4cqi, 44px);
}
.hb-ki1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  color: var(--hb-ki1-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-ki1-eyebrow::before {
  content: "";
  width: 18px;
  height: 1px;
  background: currentColor;
}
.hb-ki1-title {
  margin: 0;
  max-width: 620px;
  font-size: clamp(30px, 4.6cqi, 46px);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ki1-side { display: grid; gap: 16px; align-content: end; justify-items: start; }
.hb-ki1-sub {
  margin: 0;
  max-width: 420px;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.6;
}
.hb-ki1-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-ki1-cta svg { width: 14px; height: 14px; transition: transform .25s cubic-bezier(.2,.7,.2,1); }
.hb-ki1-cta:hover { border-color: rgba(255,255,255,.24); background: rgba(255,255,255,.06); }
.hb-ki1-cta:hover svg { transform: translateX(3px); }
.hb-ki1-cta:focus-visible { outline: 2px solid var(--hb-ki1-accent); outline-offset: 3px; }
.hb-ki1-grid {
  display: grid;
  gap: 16px;
}
.hb-ki1-minis { display: grid; gap: 16px; }
.hb-ki1-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  animation: hb-ki1-rise .7s cubic-bezier(.2,.7,.2,1) both;
  animation-delay: var(--hb-ki1-d, 0ms);
  transition: border-color .25s ease, transform .35s cubic-bezier(.2,.7,.2,1);
}
.hb-ki1-card:hover { border-color: color-mix(in srgb, var(--hb-ki1-accent) 40%, rgba(255,255,255,.08)); transform: translateY(-2px); }
.hb-ki1-card:focus-visible { outline: 2px solid var(--hb-ki1-accent); outline-offset: 3px; }
.hb-ki1-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.hb-ki1-feat .hb-ki1-cover { aspect-ratio: 16 / 10; }
.hb-ki1-zoom {
  position: absolute;
  inset: 0;
  transition: transform .8s cubic-bezier(.2,.7,.2,1);
}
.hb-ki1-zoom::after {
  content: "";
  position: absolute;
  width: 60%;
  aspect-ratio: 1;
  left: 50%;
  top: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,.28), transparent 65%);
  filter: blur(18px);
  animation: hb-ki1-drift 14s ease-in-out infinite alternate;
}
.hb-ki1-card:hover .hb-ki1-zoom, .hb-ki1-card:focus-visible .hb-ki1-zoom { transform: scale(1.07); }
.hb-ki1-art { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-ki1-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(10,10,10,.55));
}
.hb-ki1-chip {
  position: absolute;
  left: 12px;
  top: 12px;
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px;
  background: rgba(10,10,10,.42);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-ki1-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px 16px;
}
.hb-ki1-feat .hb-ki1-body { gap: 12px; padding: 20px 22px 22px; }
.hb-ki1-ptitle {
  margin: 0;
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.32;
  letter-spacing: -.01em;
  text-wrap: pretty;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-ki1-feat .hb-ki1-ptitle {
  font-size: clamp(20px, 2.6cqi, 27px);
  line-height: 1.18;
  letter-spacing: -.025em;
  -webkit-line-clamp: 3;
}
.hb-ki1-ptitle span {
  background: linear-gradient(var(--hb-ki1-accent), var(--hb-ki1-accent)) 0 100% / 0 1px no-repeat;
  transition: background-size .4s cubic-bezier(.2,.7,.2,1);
}
.hb-ki1-card:hover .hb-ki1-ptitle span { background-size: 100% 1px; }
.hb-ki1-excerpt {
  margin: 0;
  color: #8f8f8f;
  font-size: 14.5px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-ki1-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  color: #8f8f8f;
  font-size: 12.5px;
  min-width: 0;
}
.hb-ki1-avatar {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.2);
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .02em;
}
.hb-ki1-feat .hb-ki1-avatar { width: 30px; height: 30px; font-size: 11.5px; }
.hb-ki1-name { color: #d4d4d4; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ki1-dot { width: 3px; height: 3px; flex: none; border-radius: 50%; background: #4a4a4a; }
.hb-ki1-time { white-space: nowrap; }
.hb-ki1-hide-sm { display: none; }
@container (min-width: 640px) {
  .hb-ki1-head { grid-template-columns: 1.3fr 1fr; align-items: end; }
  .hb-ki1-side { justify-items: end; text-align: right; }
  .hb-ki1-minis { grid-template-columns: 1fr 1fr; }
  .hb-ki1-hide-sm { display: inline; }
}
@container (min-width: 880px) {
  .hb-ki1-grid { grid-template-columns: 1.08fr 1fr; gap: 18px; }
  .hb-ki1-minis { gap: 18px; }
  .hb-ki1-feat .hb-ki1-cover { aspect-ratio: auto; flex: 1; min-height: 240px; }
}
@keyframes hb-ki1-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ki1-drift {
  from { transform: translate(-80%, -30%) scale(.9); }
  to { transform: translate(-10%, 20%) scale(1.15); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ki1-card, .hb-ki1-zoom::after { animation: none; }
  .hb-ki1-card, .hb-ki1-zoom, .hb-ki1-cta svg, .hb-ki1-ptitle span { transition: none; }
}
`;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function PostCard({
  post,
  index,
  featured,
  onPostClick,
}: {
  post: BlogFeaturedPost;
  index: number;
  featured: boolean;
  onPostClick?: (post: BlogFeaturedPost, index: number) => void;
}) {
  const seed = hash(post.title) + index * 7;
  const avatarSeed = hash(post.author);
  const [b, a] = palettes[avatarSeed % palettes.length];
  return (
    <a
      className={featured ? "hb-ki1-card hb-ki1-feat" : "hb-ki1-card"}
      href={post.href}
      onClick={onPostClick ? () => onPostClick(post, index) : undefined}
      style={{ "--hb-ki1-d": `${(index * 90).toFixed(0)}ms` } as React.CSSProperties}
    >
      <div className="hb-ki1-cover">
        <div className="hb-ki1-zoom" style={{ background: post.cover ?? coverBackground(seed) }}>
          {!post.cover && <CoverArt seed={seed} />}
        </div>
        <div className="hb-ki1-shade" />
        <span className="hb-ki1-chip">{post.category}</span>
      </div>
      <div className="hb-ki1-body">
        <h3 className="hb-ki1-ptitle">
          <span>{post.title}</span>
        </h3>
        {featured && post.excerpt && <p className="hb-ki1-excerpt">{post.excerpt}</p>}
        <div className="hb-ki1-meta">
          <span className="hb-ki1-avatar" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} aria-hidden="true">
            {initials(post.author)}
          </span>
          <span className="hb-ki1-name">{post.author}</span>
          <span className="hb-ki1-dot" aria-hidden="true" />
          {featured && (
            <>
              <span className="hb-ki1-time hb-ki1-hide-sm">{post.date}</span>
              <span className="hb-ki1-dot hb-ki1-hide-sm" aria-hidden="true" />
            </>
          )}
          <span className="hb-ki1-time">{post.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export function BlogFeaturedGrid({
  eyebrow = "The Northwind journal",
  title = "Notes on building fast, calm software",
  subtitle = "Deep dives from our engineering, design and growth teams. New essays every Tuesday.",
  posts = defaultPosts,
  cta = { label: "View all posts", href: "#" },
  accent = "#8b5cf6",
  onPostClick,
  className,
  style,
  ...rest
}: BlogFeaturedGridProps) {
  const [featured, ...others] = posts;
  return (
    <section
      className={className ? `hb-ki1 ${className}` : "hb-ki1"}
      style={{ "--hb-ki1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-featured-grid" precedence="default">{css}</style>
      <div className="hb-ki1-inner">
        <header className="hb-ki1-head">
          <div>
            {eyebrow && <p className="hb-ki1-eyebrow">{eyebrow}</p>}
            <h2 className="hb-ki1-title">{title}</h2>
          </div>
          <div className="hb-ki1-side">
            {subtitle && <p className="hb-ki1-sub">{subtitle}</p>}
            {cta && (
              <a className="hb-ki1-cta" href={cta.href}>
                {cta.label}
                <Arrow />
              </a>
            )}
          </div>
        </header>
        {featured && (
          <div className="hb-ki1-grid">
            <PostCard post={featured} index={0} featured onPostClick={onPostClick} />
            {others.length > 0 && (
              <div className="hb-ki1-minis">
                {others.slice(0, 4).map((post, i) => (
                  <PostCard key={`${post.title}-${i}`} post={post} index={i + 1} featured={false} onPostClick={onPostClick} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface BlogCategoryTile {
  name: string;
  count: number;
  description: string;
  href: string;
  colors?: [string, string];
  shape?: "circle" | "arc" | "stack" | "wave" | "grid" | "spark";
}

export interface BlogFeaturedStripPost {
  label: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  href: string;
  cover?: string;
}

export interface BlogCategoryTilesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: BlogCategoryTile[];
  featured?: BlogFeaturedStripPost | null;
  accent?: string;
  onCategoryClick?: (category: BlogCategoryTile, index: number) => void;
}

const defaultCategories: BlogCategoryTile[] = [
  { name: "Engineering", count: 84, description: "Architecture notes and postmortems", href: "#", colors: ["#2f7bff", "#7fb3ff"], shape: "grid" },
  { name: "Design", count: 52, description: "Interfaces, type and motion", href: "#", colors: ["#ec4899", "#fbcfe8"], shape: "circle" },
  { name: "Product", count: 47, description: "Roadmaps, launches and lessons", href: "#", colors: ["#f59e0b", "#fde68a"], shape: "stack" },
  { name: "Culture", count: 29, description: "How we hire, work and rest", href: "#", colors: ["#10b981", "#a7f3d0"], shape: "wave" },
  { name: "Customer stories", count: 36, description: "Teams building with Lattice", href: "#", colors: ["#8b5cf6", "#ddd6fe"], shape: "arc" },
  { name: "Changelog", count: 118, description: "Every release, explained", href: "#", colors: ["#ef4444", "#fecaca"], shape: "spark" },
];

const defaultFeatured: BlogFeaturedStripPost = {
  label: "Featured essay",
  title: "We rewrote our sync engine in eleven weeks. Here is every mistake.",
  excerpt: "A candid look at moving 2.3 billion records to a new replication model without a single minute of planned downtime.",
  author: "Renata Silva",
  role: "Staff Engineer",
  date: "Oct 29, 2026",
  readTime: "14 min read",
  href: "#",
};

const css = `
.hb-yj8 {
  --hb-yj8-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #ffffff;
  color: #0f0f10;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj8 *, .hb-yj8 *::before, .hb-yj8 *::after { box-sizing: border-box; }
.hb-yj8-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px; }
@container (min-width: 800px) { .hb-yj8-inner { padding: 100px 32px; } }
.hb-yj8-head {
  display: grid;
  gap: 14px 48px;
  margin-bottom: 40px;
}
@container (min-width: 800px) { .hb-yj8-head { grid-template-columns: minmax(0, 1fr) minmax(0, .8fr); align-items: end; } }
.hb-yj8-eyebrow { margin: 0 0 12px; color: var(--hb-yj8-accent); font-size: 13px; font-weight: 600; }
.hb-yj8-title { margin: 0; font-size: clamp(30px, 4.6cqw, 46px); line-height: 1.05; letter-spacing: -.035em; font-weight: 650; text-wrap: balance; }
.hb-yj8-sub { margin: 0; color: #5f5f66; font-size: 16px; line-height: 1.6; }
.hb-yj8-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
@container (min-width: 800px) { .hb-yj8-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; } }
.hb-yj8-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 172px;
  padding: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 15, 16, .08);
  border-radius: 18px;
  background: #fafafa;
  color: inherit;
  text-decoration: none;
  opacity: 0;
  transform: translateY(16px);
  transition: border-color .3s ease, box-shadow .3s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
}
@container (min-width: 800px) { .hb-yj8-tile { min-height: 196px; padding: 22px; } }
.hb-yj8-seen .hb-yj8-tile { animation: hb-yj8-rise .7s cubic-bezier(.2, .8, .2, 1) forwards; animation-delay: calc(var(--hb-yj8-i) * 70ms); }
.hb-yj8-tile:hover { border-color: rgba(15, 15, 16, .16); box-shadow: 0 20px 40px -24px rgba(15, 15, 16, .35); }
.hb-yj8-tile:focus-visible { outline: 2px solid var(--hb-yj8-accent); outline-offset: 3px; }
.hb-yj8-art {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(70% 90% at 100% 0%, var(--hb-yj8-c2), transparent 70%),
    linear-gradient(180deg, transparent 40%, #fafafa 88%);
  opacity: .85;
  transition: opacity .4s ease;
}
.hb-yj8-tile:hover .hb-yj8-art { opacity: 1; }
.hb-yj8-shape {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 44%;
  max-width: 120px;
  aspect-ratio: 1;
  color: var(--hb-yj8-c1);
  transition: transform .6s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj8-shape svg { width: 100%; height: 100%; overflow: visible; }
.hb-yj8-tile:hover .hb-yj8-shape { transform: translate(-8px, 6px) rotate(-8deg) scale(1.08); }
.hb-yj8-shape .hb-yj8-float { animation: hb-yj8-float 5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
.hb-yj8-body { position: relative; z-index: 1; }
.hb-yj8-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(15, 15, 16, .08);
  color: #3f3f46;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.hb-yj8-count i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yj8-c1); }
.hb-yj8-name { display: flex; width: fit-content; align-items: center; gap: 8px; font-size: 18px; font-weight: 640; letter-spacing: -.02em; }
.hb-yj8-name svg { opacity: 0; transform: translateX(-6px); transition: opacity .3s ease, transform .3s ease; }
.hb-yj8-tile:hover .hb-yj8-name svg, .hb-yj8-tile:focus-visible .hb-yj8-name svg { opacity: 1; transform: none; }
.hb-yj8-desc { display: block; margin: 4px 0 0; color: #6b6b73; font-size: 13.5px; line-height: 1.45; }
@container (max-width: 480px) { .hb-yj8-desc { display: none; } .hb-yj8-name { font-size: 16px; } }
.hb-yj8-feat {
  display: grid;
  margin-top: 14px;
  overflow: hidden;
  border: 1px solid rgba(15, 15, 16, .08);
  border-radius: 22px;
  background: #0f0f10;
  color: #f4f4f5;
  text-decoration: none;
  transition: box-shadow .3s ease, transform .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj8-feat:hover { box-shadow: 0 30px 60px -30px rgba(15, 15, 16, .55); transform: translateY(-2px); }
.hb-yj8-feat:focus-visible { outline: 2px solid var(--hb-yj8-accent); outline-offset: 3px; }
@container (min-width: 720px) { .hb-yj8-feat { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); } }
.hb-yj8-cover {
  position: relative;
  min-height: 190px;
  overflow: hidden;
}
.hb-yj8-cover-img {
  position: absolute;
  inset: 0;
  transition: transform .8s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj8-feat:hover .hb-yj8-cover-img { transform: scale(1.06); }
.hb-yj8-cover svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-yj8-fbody { display: flex; flex-direction: column; gap: 12px; padding: 26px; }
@container (min-width: 720px) { .hb-yj8-fbody { padding: 32px 36px; } }
.hb-yj8-label {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yj8-accent) 22%, transparent);
  color: color-mix(in srgb, var(--hb-yj8-accent) 50%, #fff);
  font-size: 12px;
  font-weight: 600;
}
.hb-yj8-ftitle { margin: 0; font-size: clamp(20px, 2.6cqw, 27px); line-height: 1.2; letter-spacing: -.025em; font-weight: 640; text-wrap: balance; }
.hb-yj8-fex { margin: 0; color: #a1a1aa; font-size: 15px; line-height: 1.6; }
.hb-yj8-by { display: flex; align-items: center; gap: 10px; margin-top: auto; padding-top: 6px; color: #a1a1aa; font-size: 13px; }
.hb-yj8-av {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hb-yj8-accent), #7fb3ff);
  color: #0f0f10;
  font-size: 12px;
  font-weight: 700;
}
.hb-yj8-by strong { display: block; color: #f4f4f5; font-weight: 600; }
.hb-yj8-read { margin-left: auto; white-space: nowrap; }
@keyframes hb-yj8-rise { to { opacity: 1; transform: none; } }
@keyframes hb-yj8-float { 50% { transform: translateY(-6%) rotate(6deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj8 *, .hb-yj8 *::before, .hb-yj8 *::after { animation: none !important; transition: none !important; }
  .hb-yj8-tile { opacity: 1; transform: none; }
}
`;

function Shape({ kind }: { kind: NonNullable<BlogCategoryTile["shape"]> }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {kind === "circle" ? (
        <>
          <circle cx="58" cy="42" r="34" fill="currentColor" opacity=".9" />
          <circle className="hb-yj8-float" cx="30" cy="70" r="16" fill="#fff" opacity=".85" />
        </>
      ) : null}
      {kind === "grid" ? (
        <>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={12 + c * 28} y={12 + r * 28} width="22" height="22" rx="6" fill="currentColor" opacity={((r + c) % 3 === 0 ? 0.95 : 0.35).toFixed(2)} />),
          )}
          <rect className="hb-yj8-float" x="40" y="40" width="22" height="22" rx="6" fill="#fff" />
        </>
      ) : null}
      {kind === "stack" ? (
        <>
          <rect x="14" y="58" width="72" height="22" rx="8" fill="currentColor" opacity=".35" />
          <rect x="20" y="36" width="60" height="22" rx="8" fill="currentColor" opacity=".65" />
          <rect className="hb-yj8-float" x="26" y="14" width="48" height="22" rx="8" fill="currentColor" />
        </>
      ) : null}
      {kind === "wave" ? (
        <>
          <path d="M6 40c15-14 29-14 44 0s29 14 44 0" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M6 66c15-14 29-14 44 0s29 14 44 0" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".4" />
          <circle className="hb-yj8-float" cx="74" cy="20" r="9" fill="#fff" />
        </>
      ) : null}
      {kind === "arc" ? (
        <>
          <path d="M14 86a72 72 0 0 1 72-72v72Z" fill="currentColor" opacity=".9" />
          <circle className="hb-yj8-float" cx="66" cy="62" r="13" fill="#fff" />
        </>
      ) : null}
      {kind === "spark" ? (
        <>
          <path className="hb-yj8-float" d="M50 6c4 26 18 40 44 44-26 4-40 18-44 44-4-26-18-40-44-44 26-4 40-18 44-44Z" fill="currentColor" />
          <circle cx="82" cy="18" r="7" fill="currentColor" opacity=".4" />
        </>
      ) : null}
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function BlogCategoryTiles({
  eyebrow = "The Lattice blog",
  title = "Browse by topic",
  subtitle = "Three hundred and sixty six posts from the people building Lattice, sorted into the shelves our readers use most.",
  categories = defaultCategories,
  featured = defaultFeatured,
  accent = "#2f7bff",
  onCategoryClick,
  className,
  style,
  ...rest
}: BlogCategoryTilesProps) {
  const [seen, setSeen] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={["hb-yj8", seen ? "hb-yj8-seen" : "", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj8-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-category-tiles" precedence="default">{css}</style>
      <div className="hb-yj8-inner">
        <div className="hb-yj8-head">
          <div>
            {eyebrow ? <p className="hb-yj8-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yj8-title">{title}</h2>
          </div>
          {subtitle ? <p className="hb-yj8-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-yj8-grid" ref={gridRef}>
          {categories.map((c, i) => {
            const [c1, c2] = c.colors ?? [accent, "#e4e4e7"];
            return (
              <a
                key={c.name}
                className="hb-yj8-tile"
                href={c.href}
                onClick={() => onCategoryClick?.(c, i)}
                style={{ "--hb-yj8-i": i, "--hb-yj8-c1": c1, "--hb-yj8-c2": c2 } as React.CSSProperties}
              >
                <span className="hb-yj8-art" aria-hidden="true" />
                <span className="hb-yj8-shape">
                  <Shape kind={c.shape ?? "circle"} />
                </span>
                <span className="hb-yj8-body">
                  <span className="hb-yj8-count">
                    <i />
                    {c.count} posts
                  </span>
                  <span className="hb-yj8-name">
                    {c.name}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="hb-yj8-desc">
                    {c.description}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
        {featured ? (
          <a className="hb-yj8-feat" href={featured.href}>
            <div className="hb-yj8-cover">
              <div
                className="hb-yj8-cover-img"
                style={{
                  background:
                    featured.cover ??
                    `radial-gradient(60% 80% at 30% 30%, ${accent}, transparent 70%), radial-gradient(50% 60% at 80% 80%, #ec4899, transparent 70%), linear-gradient(135deg, #1e1b4b, #0f0f10)`,
                }}
              >
                {featured.cover ? null : (
                  <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <path key={i} d={`M-20 ${(150 + i * 14).toFixed(0)} C 100 ${(90 + i * 18).toFixed(0)}, 260 ${(210 - i * 6).toFixed(0)}, 420 ${(120 + i * 12).toFixed(0)}`} stroke="#fff" strokeOpacity={(0.08 + i * 0.04).toFixed(2)} strokeWidth="1.5" fill="none" />
                    ))}
                    <circle cx="300" cy="70" r="26" fill="#fff" fillOpacity=".9" />
                  </svg>
                )}
              </div>
            </div>
            <div className="hb-yj8-fbody">
              <span className="hb-yj8-label">{featured.label}</span>
              <h3 className="hb-yj8-ftitle">{featured.title}</h3>
              <p className="hb-yj8-fex">{featured.excerpt}</p>
              <div className="hb-yj8-by">
                <span className="hb-yj8-av">{initials(featured.author)}</span>
                <span>
                  <strong>{featured.author}</strong>
                  {featured.role} · {featured.date}
                </span>
                <span className="hb-yj8-read">{featured.readTime}</span>
              </div>
            </div>
          </a>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface EditorialPost {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  href: string;
}

export interface BlogListEditorialProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  posts?: EditorialPost[];
  categories?: string[];
  allLabel?: string;
  category?: string;
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
  accent?: string;
}

const defaultPosts: EditorialPost[] = [
  {
    title: "The quiet economics of a four-day studio week",
    excerpt: "Eighteen months in, our output went up and our sick days went down. The numbers, the trade-offs and the one meeting we refused to cut.",
    date: "Oct 30, 2026",
    tag: "Culture",
    readTime: "9 min",
    href: "#",
  },
  {
    title: "Typesetting for long reads on small screens",
    excerpt: "Measure, rhythm and the forgotten art of the hanging punctuation. A field guide to making 4,000 words feel short on a phone.",
    date: "Oct 22, 2026",
    tag: "Design",
    readTime: "7 min",
    href: "#",
  },
  {
    title: "What we learned shipping a print magazine from a codebase",
    excerpt: "Markdown in, press-ready PDF out. How a static site generator ended up running our quarterly print edition of 6,000 copies.",
    date: "Oct 15, 2026",
    tag: "Engineering",
    readTime: "11 min",
    href: "#",
  },
  {
    title: "Interview: Mara Lindqvist on drawing maps by hand",
    excerpt: "The cartographer behind the Nordic Trails atlas talks about ink, error, and why her maps leave out half the roads on purpose.",
    date: "Oct 8, 2026",
    tag: "Interviews",
    readTime: "14 min",
    href: "#",
  },
  {
    title: "A small case for slower product launches",
    excerpt: "We stopped announcing features on launch day. Adoption rose 22 percent. Notes on staged releases and listening before talking.",
    date: "Sep 29, 2026",
    tag: "Culture",
    readTime: "6 min",
    href: "#",
  },
  {
    title: "Color systems that survive dark mode",
    excerpt: "Why perceptual lightness beats hex math, and the twelve tokens that carried our product through three rebrands.",
    date: "Sep 18, 2026",
    tag: "Design",
    readTime: "8 min",
    href: "#",
  },
];

const css = `
.hb-ki2 {
  --hb-ki2-accent: #d4573b;
  --hb-ki2-paper: #f7f5ef;
  --hb-ki2-ink: #1b1a17;
  --hb-ki2-muted: #6f6a60;
  --hb-ki2-line: rgba(27,26,23,.12);
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: var(--hb-ki2-paper);
  color: var(--hb-ki2-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki2 *, .hb-ki2 *::before, .hb-ki2 *::after { box-sizing: border-box; }
.hb-ki2-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(56px, 9cqi, 112px) clamp(18px, 4cqi, 40px);
}
.hb-ki2-head {
  display: grid;
  gap: 16px;
  padding-bottom: clamp(24px, 3.4cqi, 36px);
  border-bottom: 1px solid var(--hb-ki2-ink);
}
.hb-ki2-eyebrow {
  margin: 0 0 10px;
  color: var(--hb-ki2-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ki2-title {
  margin: 0;
  font-family: var(--font-serif, "Instrument Serif", "Iowan Old Style", Georgia, serif);
  font-size: clamp(44px, 8cqi, 88px);
  font-weight: 400;
  line-height: .95;
  letter-spacing: -.02em;
}
.hb-ki2-title em { color: var(--hb-ki2-accent); font-style: italic; }
.hb-ki2-sub {
  margin: 0;
  max-width: 380px;
  color: var(--hb-ki2-muted);
  font-size: 15px;
  line-height: 1.6;
}
.hb-ki2-bar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 calc(clamp(18px, 4cqi, 40px) * -1);
  padding: 14px clamp(18px, 4cqi, 40px);
  border-bottom: 1px solid var(--hb-ki2-line);
  background: color-mix(in srgb, var(--hb-ki2-paper) 88%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.hb-ki2-filters {
  display: flex;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.hb-ki2-filters::-webkit-scrollbar { display: none; }
.hb-ki2-filter {
  flex: none;
  height: 32px;
  margin: 0;
  padding: 0 14px;
  border: 1px solid var(--hb-ki2-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hb-ki2-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
}
.hb-ki2-filter:hover { border-color: rgba(27,26,23,.3); }
.hb-ki2-filter[aria-pressed="true"] { border-color: var(--hb-ki2-ink); background: var(--hb-ki2-ink); color: var(--hb-ki2-paper); }
.hb-ki2-filter:focus-visible { outline: 2px solid var(--hb-ki2-accent); outline-offset: 2px; }
.hb-ki2-count {
  flex: none;
  display: none;
  color: var(--hb-ki2-muted);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
}
.hb-ki2-list { margin: 0; padding: 0; list-style: none; }
.hb-ki2-item {
  border-bottom: 1px solid var(--hb-ki2-line);
  animation: hb-ki2-fade .55s cubic-bezier(.2,.7,.2,1) both;
  animation-delay: var(--hb-ki2-d, 0ms);
}
.hb-ki2-link {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 20px;
  padding: 24px 0;
  color: inherit;
  text-decoration: none;
}
.hb-ki2-link::before {
  content: "";
  position: absolute;
  inset: 0 calc(clamp(18px, 4cqi, 40px) * -.5);
  border-radius: 12px;
  background: rgba(27,26,23,.035);
  opacity: 0;
  transition: opacity .25s ease;
}
.hb-ki2-link:hover::before { opacity: 1; }
.hb-ki2-link:focus-visible { outline: none; }
.hb-ki2-link:focus-visible::before { opacity: 1; box-shadow: inset 0 0 0 2px var(--hb-ki2-accent); }
.hb-ki2-date {
  position: relative;
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: var(--hb-ki2-muted);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  letter-spacing: .02em;
}
.hb-ki2-day {
  color: var(--hb-ki2-ink);
  font-family: var(--font-serif, "Instrument Serif", "Iowan Old Style", Georgia, serif);
  font-size: 22px;
  line-height: 1;
  letter-spacing: 0;
}
.hb-ki2-main { position: relative; min-width: 0; }
.hb-ki2-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: var(--hb-ki2-accent);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.hb-ki2-tag::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-ki2-read { color: var(--hb-ki2-muted); font-weight: 500; letter-spacing: .04em; }
.hb-ki2-ptitle {
  margin: 0;
  font-family: var(--font-serif, "Instrument Serif", "Iowan Old Style", Georgia, serif);
  font-size: clamp(24px, 3.2cqi, 34px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -.01em;
  text-wrap: balance;
  transition: color .25s ease;
}
.hb-ki2-link:hover .hb-ki2-ptitle { color: color-mix(in srgb, var(--hb-ki2-ink) 70%, var(--hb-ki2-accent)); }
.hb-ki2-excerpt {
  margin: 10px 0 0;
  max-width: 620px;
  color: var(--hb-ki2-muted);
  font-size: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-ki2-arrow {
  position: relative;
  align-self: center;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--hb-ki2-line);
  border-radius: 50%;
  overflow: hidden;
  transition: border-color .25s ease, background-color .25s ease, color .25s ease;
}
.hb-ki2-arrow svg {
  width: 18px;
  height: 18px;
  grid-area: 1 / 1;
  transition: transform .45s cubic-bezier(.6,0,.2,1);
}
.hb-ki2-arrow svg + svg { transform: translateX(-180%); }
.hb-ki2-link:hover .hb-ki2-arrow, .hb-ki2-link:focus-visible .hb-ki2-arrow { border-color: var(--hb-ki2-accent); background: var(--hb-ki2-accent); color: #fff; }
.hb-ki2-link:hover .hb-ki2-arrow svg, .hb-ki2-link:focus-visible .hb-ki2-arrow svg { transform: translateX(180%); }
.hb-ki2-link:hover .hb-ki2-arrow svg + svg, .hb-ki2-link:focus-visible .hb-ki2-arrow svg + svg { transform: none; }
.hb-ki2-empty {
  padding: 56px 0;
  color: var(--hb-ki2-muted);
  font-family: var(--font-serif, "Instrument Serif", "Iowan Old Style", Georgia, serif);
  font-size: 24px;
  text-align: center;
}
@container (min-width: 560px) {
  .hb-ki2-count { display: inline; }
}
@container (min-width: 720px) {
  .hb-ki2-head { grid-template-columns: 1fr auto; align-items: end; }
  .hb-ki2-link { grid-template-columns: 120px 1fr auto; gap: 32px; padding: 28px 0; }
  .hb-ki2-date { grid-column: auto; flex-direction: column; gap: 6px; padding-top: 2px; }
  .hb-ki2-day { font-size: 30px; }
}
@keyframes hb-ki2-fade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ki2-item { animation: none; }
  .hb-ki2-filter, .hb-ki2-link::before, .hb-ki2-ptitle, .hb-ki2-arrow, .hb-ki2-arrow svg { transition: none; }
}
`;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function splitDate(date: string) {
  const match = /^([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})?$/.exec(date.trim());
  if (!match) return { day: "", rest: date };
  return { day: match[2].padStart(2, "0"), rest: `${match[1]} ${match[3] ?? ""}`.trim() };
}

export function BlogListEditorial({
  eyebrow = "Field notes · Issue 31",
  title = "Writing from the studio",
  subtitle = "Essays, interviews and working notes on design, engineering and the business of making things slowly.",
  posts = defaultPosts,
  categories,
  allLabel = "All",
  category,
  defaultCategory,
  onCategoryChange,
  accent = "#d4573b",
  className,
  style,
  ...rest
}: BlogListEditorialProps) {
  const options = React.useMemo(() => {
    const list = categories ?? Array.from(new Set(posts.map((post) => post.tag)));
    return [allLabel, ...list.filter((item) => item !== allLabel)];
  }, [categories, posts, allLabel]);
  const [internal, setInternal] = React.useState(defaultCategory ?? allLabel);
  const active = category ?? internal;
  const visible = active === allLabel ? posts : posts.filter((post) => post.tag === active);

  const choose = (next: string) => {
    if (category === undefined) setInternal(next);
    onCategoryChange?.(next);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    event.preventDefault();
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  };

  const words = title.split(" ");
  const last = words.pop();

  return (
    <section
      className={className ? `hb-ki2 ${className}` : "hb-ki2"}
      style={{ "--hb-ki2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-list-editorial" precedence="default">{css}</style>
      <div className="hb-ki2-inner">
        <header className="hb-ki2-head">
          <div>
            {eyebrow && <p className="hb-ki2-eyebrow">{eyebrow}</p>}
            <h2 className="hb-ki2-title">
              {words.join(" ")}
              {words.length > 0 ? " " : ""}
              <em>{last}</em>
            </h2>
          </div>
          {subtitle && <p className="hb-ki2-sub">{subtitle}</p>}
        </header>
        <div className="hb-ki2-bar">
          <div className="hb-ki2-filters" role="group" aria-label="Filter posts by category" onKeyDown={onKeyDown}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="hb-ki2-filter"
                aria-pressed={option === active}
                onClick={() => choose(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="hb-ki2-count" aria-live="polite">
            {String(visible.length).padStart(2, "0")} {visible.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        {visible.length === 0 ? (
          <p className="hb-ki2-empty">Nothing filed under {active} yet.</p>
        ) : (
          <ul className="hb-ki2-list" key={active}>
            {visible.map((post, i) => {
              const { day, rest: monthYear } = splitDate(post.date);
              return (
                <li
                  key={`${post.title}-${i}`}
                  className="hb-ki2-item"
                  style={{ "--hb-ki2-d": `${(i * 70).toFixed(0)}ms` } as React.CSSProperties}
                >
                  <a className="hb-ki2-link" href={post.href}>
                    <time className="hb-ki2-date">
                      {day && <span className="hb-ki2-day">{day}</span>}
                      <span>{monthYear}</span>
                    </time>
                    <div className="hb-ki2-main">
                      <span className="hb-ki2-tag">
                        {post.tag}
                        <span className="hb-ki2-read">· {post.readTime}</span>
                      </span>
                      <h3 className="hb-ki2-ptitle">{post.title}</h3>
                      <p className="hb-ki2-excerpt">{post.excerpt}</p>
                    </div>
                    <span className="hb-ki2-arrow" aria-hidden="true">
                      <ArrowIcon />
                      <ArrowIcon />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

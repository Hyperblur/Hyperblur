"use client";

import * as React from "react";

export type ArticleShareNetwork = "x" | "linkedin" | "copy";

export interface ArticleAuthor {
  name: string;
  role?: string;
}

export interface BlogArticleHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  breadcrumbs?: { label: string; href: string }[];
  category?: string;
  title?: string;
  dek?: string;
  author?: ArticleAuthor;
  date?: string;
  readTime?: string;
  updated?: string;
  progress?: number;
  intro?: string;
  body?: string[];
  shareUrl?: string;
  onShare?: (network: ArticleShareNetwork) => void;
  accent?: string;
}

const css = `
.hb-ki3 {
  --hb-ki3-accent: #22d3ee;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background:
    radial-gradient(70% 50% at 50% 0%, color-mix(in srgb, var(--hb-ki3-accent) 12%, transparent), transparent 70%),
    #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki3 *, .hb-ki3 *::before, .hb-ki3 *::after { box-sizing: border-box; }
.hb-ki3-progress {
  position: sticky;
  top: 0;
  z-index: 3;
  height: 3px;
  background: rgba(255,255,255,.06);
}
.hb-ki3-fill {
  height: 100%;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ki3-accent) 40%, transparent), var(--hb-ki3-accent));
  box-shadow: 0 0 14px color-mix(in srgb, var(--hb-ki3-accent) 60%, transparent);
  transform: scaleX(var(--hb-ki3-p, 0));
  transform-origin: left;
  transition: transform .5s cubic-bezier(.2,.7,.2,1);
  animation: hb-ki3-fill 1.4s cubic-bezier(.2,.7,.2,1) both;
}
.hb-ki3-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(40px, 7cqi, 88px) clamp(18px, 4cqi, 40px) clamp(56px, 9cqi, 112px);
}
.hb-ki3-col { max-width: 760px; margin: 0 auto; }
.hb-ki3-crumbs { margin: 0 0 28px; }
.hb-ki3-crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}
.hb-ki3-crumbs li { display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; }
.hb-ki3-crumbs a {
  color: #8f8f8f;
  text-decoration: none;
  border-radius: 4px;
  transition: color .2s ease;
}
.hb-ki3-crumbs a:hover { color: #ededed; }
.hb-ki3-crumbs a:focus-visible { outline: 2px solid var(--hb-ki3-accent); outline-offset: 2px; }
.hb-ki3-crumbs li[aria-current="page"] { color: #d4d4d4; }
.hb-ki3-crumbs svg { width: 12px; height: 12px; color: #4a4a4a; }
.hb-ki3-cat {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  margin-bottom: 18px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--hb-ki3-accent) 35%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ki3-accent) 10%, transparent);
  color: color-mix(in srgb, var(--hb-ki3-accent) 75%, #fff);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .03em;
}
.hb-ki3-cat::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-ki3-accent);
  box-shadow: 0 0 10px var(--hb-ki3-accent);
}
.hb-ki3-title {
  margin: 0;
  font-size: clamp(32px, 6.2cqi, 60px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-ki3-word {
  display: inline-block;
  animation: hb-ki3-word .8s cubic-bezier(.2,.7,.2,1) both;
  animation-delay: var(--hb-ki3-d, 0ms);
}
.hb-ki3-dek {
  margin: 20px 0 0;
  color: #a1a1a1;
  font-size: clamp(16px, 2cqi, 19px);
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-ki3-word .8s .35s cubic-bezier(.2,.7,.2,1) both;
}
.hb-ki3-byline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 32px;
  padding: 18px 0;
  border-top: 1px solid rgba(255,255,255,.08);
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.hb-ki3-author { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hb-ki3-avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,.4), transparent 45%),
    linear-gradient(135deg, var(--hb-ki3-accent), #1e3a8a);
  box-shadow: 0 0 0 3px #0a0a0a, 0 0 0 4px rgba(255,255,255,.12);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.hb-ki3-who { display: grid; gap: 3px; min-width: 0; }
.hb-ki3-name { font-size: 14.5px; font-weight: 600; }
.hb-ki3-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  color: #8f8f8f;
  font-size: 13px;
}
.hb-ki3-meta span { display: inline-flex; align-items: center; gap: 6px; }
.hb-ki3-meta svg { width: 14px; height: 14px; }
.hb-ki3-share { display: flex; align-items: center; gap: 8px; }
.hb-ki3-sbtn {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  color: #d4d4d4;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: border-color .2s ease, color .2s ease, transform .15s ease, background-color .2s ease;
}
.hb-ki3-sbtn:hover { border-color: color-mix(in srgb, var(--hb-ki3-accent) 50%, transparent); color: #fff; background: #171717; }
.hb-ki3-sbtn:active { transform: scale(.94); }
.hb-ki3-sbtn:focus-visible { outline: 2px solid var(--hb-ki3-accent); outline-offset: 2px; }
.hb-ki3-sbtn svg { width: 16px; height: 16px; }
.hb-ki3-sbtn[data-done="true"] { border-color: color-mix(in srgb, var(--hb-ki3-accent) 60%, transparent); color: var(--hb-ki3-accent); }
.hb-ki3-tip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  padding: 4px 8px;
  border-radius: 6px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  transform: translateX(-50%);
  pointer-events: none;
  animation: hb-ki3-tip .25s ease both;
}
.hb-ki3-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0 30px;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
}
.hb-ki3-track {
  position: relative;
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: rgba(255,255,255,.08);
  overflow: hidden;
}
.hb-ki3-track span {
  position: absolute;
  inset: 0;
  background: var(--hb-ki3-accent);
  transform: scaleX(var(--hb-ki3-p, 0));
  transform-origin: left;
  transition: transform .5s cubic-bezier(.2,.7,.2,1);
  animation: hb-ki3-fill 1.4s cubic-bezier(.2,.7,.2,1) both;
}
.hb-ki3-body p {
  margin: 0 0 20px;
  color: #c9c9c9;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(19px, 2.3cqi, 22px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-ki3-body p:first-child { color: #ededed; }
.hb-ki3-body p:first-child::first-letter {
  float: left;
  margin: .06em .12em 0 0;
  color: var(--hb-ki3-accent);
  font-size: 4.3em;
  line-height: .78;
  font-weight: 400;
  text-shadow: 0 0 28px color-mix(in srgb, var(--hb-ki3-accent) 45%, transparent);
}
@container (max-width: 520px) {
  .hb-ki3-byline { align-items: flex-start; }
  .hb-ki3-share { width: 100%; }
}
@keyframes hb-ki3-fill { from { transform: scaleX(0); } }
@keyframes hb-ki3-word {
  from { opacity: 0; transform: translateY(.35em); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes hb-ki3-tip {
  from { opacity: 0; transform: translate(-50%, 4px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ki3-fill, .hb-ki3-track span, .hb-ki3-word, .hb-ki3-dek, .hb-ki3-tip { animation: none; }
  .hb-ki3-fill, .hb-ki3-track span, .hb-ki3-sbtn, .hb-ki3-crumbs a { transition: none; }
}
`;

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const defaultBody = [
  "Every product team has a number they quietly avoid. For us it was p99 latency on the dashboard, a figure that hovered around 2.4 seconds for most of last year while the median looked perfectly healthy. Users did not complain about the median. They complained about Monday mornings.",
  "This is the story of how we gave every request a budget, made that budget visible in code review, and brought the slowest one percent of page loads under 600 milliseconds without a rewrite.",
];

export function BlogArticleHeader({
  breadcrumbs = [
    { label: "Journal", href: "#" },
    { label: "Engineering", href: "#" },
    { label: "Latency budgets", href: "#" },
  ],
  category = "Engineering",
  title = "Latency budgets: how we made the slowest page load fast",
  dek = "A practical system for giving every request a time limit, catching regressions in review and keeping p99 honest as the product grows.",
  author = { name: "Priya Raman", role: "Staff engineer, Platform" },
  date = "Oct 28, 2026",
  readTime = "12 min read",
  updated,
  progress = 34,
  intro,
  body = defaultBody,
  shareUrl = "https://northwind.example/journal/latency-budgets",
  onShare,
  accent = "#22d3ee",
  className,
  style,
  ...rest
}: BlogArticleHeaderProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clamped = Math.min(100, Math.max(0, progress));
  const paragraphs = intro ? [intro, ...body] : body;
  const minutes = parseInt(readTime, 10);
  const left = Number.isFinite(minutes) ? Math.max(0, Math.ceil(minutes * (1 - clamped / 100))) : null;

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = () => {
    onShare?.("copy");
    const finish = () => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    };
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(shareUrl).then(finish, finish);
    else finish();
  };

  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const words = title.split(" ");

  return (
    <section
      className={className ? `hb-ki3 ${className}` : "hb-ki3"}
      style={{ "--hb-ki3-accent": accent, "--hb-ki3-p": (clamped / 100).toFixed(4), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-article-header" precedence="default">{css}</style>
      <div
        className="hb-ki3-progress"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
      >
        <div className="hb-ki3-fill" />
      </div>
      <div className="hb-ki3-inner">
        <div className="hb-ki3-col">
          {breadcrumbs.length > 0 && (
            <nav className="hb-ki3-crumbs" aria-label="Breadcrumb">
              <ol>
                {breadcrumbs.map((crumb, i) => {
                  const last = i === breadcrumbs.length - 1;
                  return (
                    <li key={`${crumb.label}-${i}`} aria-current={last ? "page" : undefined}>
                      {last ? crumb.label : <a href={crumb.href}>{crumb.label}</a>}
                      {!last && <Chevron />}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
          {category && <span className="hb-ki3-cat">{category}</span>}
          <h1 className="hb-ki3-title">
            {words.map((word, i) => (
              <React.Fragment key={`${word}-${i}`}>
                <span className="hb-ki3-word" style={{ "--hb-ki3-d": `${(i * 45).toFixed(0)}ms` } as React.CSSProperties}>
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </h1>
          {dek && <p className="hb-ki3-dek">{dek}</p>}
          <div className="hb-ki3-byline">
            <div className="hb-ki3-author">
              <span className="hb-ki3-avatar" aria-hidden="true">{initials(author.name)}</span>
              <div className="hb-ki3-who">
                <span className="hb-ki3-name">
                  {author.name}
                  {author.role && <span style={{ color: "#8f8f8f", fontWeight: 400 }}> · {author.role}</span>}
                </span>
                <div className="hb-ki3-meta">
                  <span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
                      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" strokeLinecap="round" />
                    </svg>
                    {date}
                  </span>
                  <span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <circle cx="8" cy="8" r="5.5" />
                      <path d="M8 5v3l2 1.5" strokeLinecap="round" />
                    </svg>
                    {readTime}
                  </span>
                  {updated && <span>Updated {updated}</span>}
                </div>
              </div>
            </div>
            <div className="hb-ki3-share" aria-label="Share this article" role="group">
              <a
                className="hb-ki3-sbtn"
                href={`https://x.com/intent/post?url=${encoded}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
                onClick={() => onShare?.("x")}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M12.2 1.5h2.2L9.6 7l5.6 7.5h-4.4L7.4 10l-3.9 4.5H1.3l5.1-5.9L1 1.5h4.5l3.1 4.1 3.6-4.1Zm-.8 11.7h1.2L4.7 2.7H3.4l8 10.5Z" />
                </svg>
              </a>
              <a
                className="hb-ki3-sbtn"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                onClick={() => onShare?.("linkedin")}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M3.6 5.6H1.2V15h2.4V5.6ZM2.4 1.2a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM15 9.8c0-2.6-.6-4.4-3.4-4.4-1.4 0-2.3.7-2.7 1.4V5.6H6.6V15H9v-4.7c0-1.2.2-2.4 1.8-2.4 1.5 0 1.6 1.4 1.6 2.5V15H15V9.8Z" />
                </svg>
              </a>
              <button
                type="button"
                className="hb-ki3-sbtn"
                aria-label={copied ? "Link copied" : "Copy link"}
                data-done={copied}
                onClick={copy}
              >
                {copied ? (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6.8 9.2a3 3 0 0 0 4.2 0l2.1-2.1a3 3 0 0 0-4.2-4.2l-.8.8" />
                    <path d="M9.2 6.8a3 3 0 0 0-4.2 0L2.9 8.9a3 3 0 0 0 4.2 4.2l.8-.8" />
                  </svg>
                )}
                {copied && <span className="hb-ki3-tip" aria-hidden="true">Copied</span>}
              </button>
            </div>
          </div>
          <div className="hb-ki3-status" aria-hidden="true">
            <span>{Math.round(clamped)}% read</span>
            <span className="hb-ki3-track"><span /></span>
            {left !== null && <span>{left} min left</span>}
          </div>
          <div className="hb-ki3-body">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

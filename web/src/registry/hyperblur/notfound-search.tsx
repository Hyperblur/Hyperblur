"use client";

import * as React from "react";

export interface NotfoundSearchLink {
  label: string;
  href: string;
}

export interface NotfoundSearchPage {
  title: string;
  href: string;
  description?: string;
  section?: string;
}

export interface NotfoundSearchProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  code?: string;
  title?: string;
  titleEmphasis?: string;
  subtitle?: string;
  pages?: NotfoundSearchPage[];
  placeholder?: string;
  note?: string;
  limit?: number;
  shortcut?: boolean;
  primary?: NotfoundSearchLink;
  secondary?: NotfoundSearchLink;
  onReport?: () => void;
  onSearch?: (query: string) => void;
  accent?: string;
}

const defaultPages: NotfoundSearchPage[] = [
  { title: "Pricing", href: "/pricing", description: "Plans for teams of every size", section: "Product" },
  { title: "Documentation", href: "/docs", description: "Guides, API reference and SDKs", section: "Developers" },
  { title: "Changelog", href: "/changelog", description: "Everything we shipped this month", section: "Product" },
  { title: "Integrations", href: "/integrations", description: "Slack, Linear, GitHub and 40 more", section: "Product" },
  { title: "Help center", href: "/help", description: "Billing, accounts and security answers", section: "Support" },
  { title: "System status", href: "/status", description: "Live uptime for every region", section: "Support" },
  { title: "Careers", href: "/careers", description: "12 open roles in Lisbon, Berlin and remote", section: "Company" },
  { title: "Blog", href: "/blog", description: "Notes from the team building Fernway", section: "Company" },
];

const css = `
.hb-kg3 {
  --hb-kg3-accent: #e8613c;
  --hb-kg3-ink: #1d1b17;
  --hb-kg3-muted: #6f6a60;
  --hb-kg3-line: rgba(29, 27, 23, .1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background:
    radial-gradient(rgba(29, 27, 23, .07) 1px, transparent 1px) 0 0 / 22px 22px,
    #f7f5ef;
  color: var(--hb-kg3-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg3 *, .hb-kg3 *::before, .hb-kg3 *::after { box-sizing: border-box; }
.hb-kg3::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(40% 60% at 85% 20%, color-mix(in srgb, var(--hb-kg3-accent) 14%, transparent), transparent 70%),
    linear-gradient(90deg, #f7f5ef 0, transparent 30%, transparent 70%, #f7f5ef 100%);
  pointer-events: none;
}
.hb-kg3-inner {
  display: grid;
  gap: 40px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
  align-items: center;
}
.hb-kg3-copy { min-width: 0; }
.hb-kg3-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid var(--hb-kg3-line);
  border-radius: 999px;
  background: #fff;
  color: var(--hb-kg3-muted);
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: .06em;
  box-shadow: 0 1px 2px rgba(29, 27, 23, .05);
}
.hb-kg3-chip b { color: var(--hb-kg3-accent); font-weight: 600; }
.hb-kg3-title {
  margin: 20px 0 0;
  font-family: "Instrument Serif", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  font-size: clamp(50px, 8.2cqi, 92px);
  font-weight: 400;
  line-height: .95;
  letter-spacing: -.025em;
  text-wrap: balance;
}
.hb-kg3-title em { font-style: italic; color: var(--hb-kg3-accent); }
.hb-kg3-sub {
  margin: 18px 0 0;
  max-width: 420px;
  color: var(--hb-kg3-muted);
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kg3-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; margin-top: 28px; }
.hb-kg3-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  background: var(--hb-kg3-ink);
  color: #f7f5ef;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 8px 20px -10px rgba(29, 27, 23, .6);
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), box-shadow .2s ease;
}
.hb-kg3-btn:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 14px 26px -12px rgba(29, 27, 23, .7); }
.hb-kg3-link {
  color: var(--hb-kg3-ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--hb-kg3-accent) 60%, transparent);
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
  transition: text-decoration-color .2s ease;
}
.hb-kg3-link:hover { text-decoration-color: var(--hb-kg3-accent); }
.hb-kg3 a:focus-visible, .hb-kg3 button:focus-visible { outline: 2px solid var(--hb-kg3-accent); outline-offset: 3px; }
.hb-kg3-side { position: relative; min-width: 0; }
.hb-kg3-card {
  position: relative;
  border: 1px solid var(--hb-kg3-line);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset, 0 1px 2px rgba(29, 27, 23, .04), 0 24px 48px -24px rgba(29, 27, 23, .22);
  overflow: hidden;
}
.hb-kg3-field {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 58px;
  padding: 0 18px;
  border-bottom: 1px solid var(--hb-kg3-line);
}
.hb-kg3-field:focus-within { background: color-mix(in srgb, var(--hb-kg3-accent) 4%, #fff); }
.hb-kg3-field svg { width: 18px; height: 18px; flex: none; color: var(--hb-kg3-muted); }
.hb-kg3-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: var(--hb-kg3-ink);
  font: inherit;
  font-size: 16px;
  outline: none;
}
.hb-kg3-input::placeholder { color: #a39d92; }
.hb-kg3-input::-webkit-search-cancel-button { display: none; }
.hb-kg3-kbd {
  display: inline-grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border: 1px solid var(--hb-kg3-line);
  border-bottom-width: 2px;
  border-radius: 6px;
  color: var(--hb-kg3-muted);
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 11px;
}
.hb-kg3-label {
  display: flex;
  justify-content: space-between;
  padding: 12px 18px 6px;
  color: #a39d92;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-kg3-list { list-style: none; margin: 0; padding: 0 8px 8px; }
.hb-kg3-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 8px 10px;
  border-radius: 12px;
  color: inherit;
  text-decoration: none;
  outline: none;
  animation: hb-kg3-in .32s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kg3-i);
  transition: background-color .15s ease;
}
.hb-kg3-item:hover, .hb-kg3-item:focus-visible { background: #f4f1ea; outline: none; }
.hb-kg3-item:focus-visible { box-shadow: inset 0 0 0 1.5px var(--hb-kg3-accent); }
.hb-kg3-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border: 1px solid var(--hb-kg3-line);
  border-radius: 10px;
  background: #faf8f3;
  color: var(--hb-kg3-ink);
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 18px;
}
.hb-kg3-text { display: grid; min-width: 0; flex: 1; }
.hb-kg3-name { font-size: 14px; font-weight: 600; }
.hb-kg3-desc { overflow: hidden; color: var(--hb-kg3-muted); font-size: 13px; white-space: nowrap; text-overflow: ellipsis; }
.hb-kg3 mark { border-radius: 3px; background: color-mix(in srgb, var(--hb-kg3-accent) 22%, transparent); color: inherit; }
.hb-kg3-tag { display: none; color: #a39d92; font-size: 12px; }
.hb-kg3-go { width: 16px; height: 16px; flex: none; color: var(--hb-kg3-accent); opacity: 0; transform: translateX(-4px); transition: opacity .15s ease, transform .15s ease; }
.hb-kg3-item:hover .hb-kg3-go, .hb-kg3-item:focus-visible .hb-kg3-go { opacity: 1; transform: none; }
.hb-kg3-empty { padding: 22px 18px 26px; color: var(--hb-kg3-muted); font-size: 14px; line-height: 1.5; }
.hb-kg3-empty button {
  margin-left: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--hb-kg3-ink);
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.hb-kg3-doodle { display: none; position: absolute; left: -150px; top: -54px; width: 160px; height: 100px; pointer-events: none; color: var(--hb-kg3-ink); }
.hb-kg3-note {
  position: absolute;
  left: 0;
  top: 0;
  font-family: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  font-size: 21px;
  font-style: italic;
  white-space: nowrap;
  transform: rotate(-6deg);
  opacity: 0;
  animation: hb-kg3-fade .5s ease .3s forwards;
}
.hb-kg3-doodle svg { position: absolute; left: 40px; top: 24px; width: 110px; height: 76px; overflow: visible; }
.hb-kg3-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-kg3-draw 1.2s cubic-bezier(.6, 0, .3, 1) .6s forwards; }
.hb-kg3-head { opacity: 0; animation: hb-kg3-fade .25s ease 1.7s forwards; }
@container (min-width: 520px) {
  .hb-kg3-tag { display: block; }
}
@container (min-width: 900px) {
  .hb-kg3-inner { grid-template-columns: 1fr 1.05fr; gap: 72px; padding: 96px 40px; }
  .hb-kg3-doodle { display: block; }
}
@keyframes hb-kg3-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-kg3-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kg3-fade { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg3-item, .hb-kg3-note, .hb-kg3-head { animation: none; opacity: 1; }
  .hb-kg3-draw { animation: none; stroke-dashoffset: 0; }
  .hb-kg3-btn, .hb-kg3-item, .hb-kg3-go { transition: none; }
  .hb-kg3-btn:hover { transform: none; }
}
`;

function highlight(text: string, query: string) {
  if (!query) return text;
  const at = text.toLowerCase().indexOf(query.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  );
}

export function NotfoundSearch({
  code = "404",
  title = "Page not found",
  titleEmphasis = "not found",
  subtitle = "The page you asked for isn't here anymore. Search for it, or jump to one of the pages people visit most.",
  pages = defaultPages,
  placeholder = "Search pages, docs and guides",
  note = "start typing",
  limit = 5,
  shortcut = false,
  primary = { label: "Back to home", href: "/" },
  secondary = { label: "Report a broken link", href: "mailto:hello@fernway.co?subject=Broken%20link" },
  onReport,
  onSearch,
  accent = "#e8613c",
  className = "",
  style,
  ...rest
}: NotfoundSearchProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const vars = { "--hb-kg3-accent": accent, ...style } as React.CSSProperties;

  const q = query.trim();
  const results = React.useMemo(() => {
    const needle = q.toLowerCase();
    const found = needle
      ? pages.filter((p) => `${p.title} ${p.description ?? ""} ${p.section ?? ""}`.toLowerCase().includes(needle))
      : pages;
    return found.slice(0, limit);
  }, [pages, q, limit]);

  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const update = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const links = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links()[0]?.focus();
    } else if (e.key === "Enter") {
      const first = links()[0];
      if (first && q) {
        e.preventDefault();
        first.click();
      }
    } else if (e.key === "Escape" && query) {
      e.preventDefault();
      update("");
    }
  };

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const all = links();
    const at = all.indexOf(document.activeElement as HTMLAnchorElement);
    if (at < 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      all[Math.min(at + 1, all.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (at === 0) inputRef.current?.focus();
      else all[at - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  const emIndex = titleEmphasis ? title.indexOf(titleEmphasis) : -1;
  const heading =
    emIndex >= 0 ? (
      <>
        {title.slice(0, emIndex)}
        <em>{titleEmphasis}</em>
        {title.slice(emIndex + titleEmphasis.length)}
      </>
    ) : (
      title
    );

  return (
    <section className={`hb-kg3 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-notfound-search" precedence="default">{css}</style>
      <div className="hb-kg3-inner">
        <div className="hb-kg3-copy">
          <span className="hb-kg3-chip"><b>{code}</b> Not found</span>
          <h1 id={`${uid}-title`} className="hb-kg3-title">{heading}</h1>
          {subtitle && <p className="hb-kg3-sub">{subtitle}</p>}
          <div className="hb-kg3-actions">
            <a className="hb-kg3-btn" href={primary.href}>{primary.label}</a>
            <a className="hb-kg3-link" href={secondary.href} onClick={onReport}>{secondary.label}</a>
          </div>
        </div>
        <div className="hb-kg3-side">
          <div className="hb-kg3-doodle" aria-hidden="true">
            <span className="hb-kg3-note">{note}</span>
            <svg viewBox="0 0 110 76" fill="none">
              <defs>
                <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="130" height="96">
                  <path className="hb-kg3-draw" d="M6 4C8 36 44 60 100 56" pathLength={1} stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                </mask>
              </defs>
              <path d="M6 4C8 36 44 60 100 56" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 5" mask={`url(#${uid}-m)`} />
              <path className="hb-kg3-head" d="M91 48.5 101 56l-9.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hb-kg3-card">
            <label className="hb-kg3-field">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                className="hb-kg3-input"
                type="search"
                value={query}
                placeholder={placeholder}
                aria-label="Search pages"
                aria-controls={`${uid}-list`}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => update(e.target.value)}
                onKeyDown={onInputKey}
              />
              {(query || shortcut) && <span className="hb-kg3-kbd" aria-hidden="true">{query ? "esc" : "/"}</span>}
            </label>
            <div className="hb-kg3-label">
              <span>{q ? "Results" : "Popular pages"}</span>
              <span aria-live="polite">{q ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : ""}</span>
            </div>
            {results.length > 0 ? (
              <ul id={`${uid}-list`} ref={listRef} className="hb-kg3-list" onKeyDown={onListKey}>
                {results.map((page, i) => (
                  <li key={page.href + page.title}>
                    <a className="hb-kg3-item" href={page.href} style={{ "--hb-kg3-i": `${i * 40}ms` } as React.CSSProperties}>
                      <span className="hb-kg3-icon" aria-hidden="true">{page.title.charAt(0)}</span>
                      <span className="hb-kg3-text">
                        <span className="hb-kg3-name">{highlight(page.title, q)}</span>
                        {page.description && <span className="hb-kg3-desc">{highlight(page.description, q)}</span>}
                      </span>
                      {page.section && <span className="hb-kg3-tag">{page.section}</span>}
                      <svg className="hb-kg3-go" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="hb-kg3-empty" id={`${uid}-list`}>
                No pages match &ldquo;{q}&rdquo;.
                <button type="button" onClick={() => { update(""); inputRef.current?.focus(); }}>Clear search</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

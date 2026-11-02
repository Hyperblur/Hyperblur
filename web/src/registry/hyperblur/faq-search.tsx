"use client";

import * as React from "react";

export interface FaqSearchItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqSearchLink {
  label: string;
  href: string;
}

export interface FaqSearchProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  items?: FaqSearchItem[];
  placeholder?: string;
  suggestions?: string[];
  contact?: FaqSearchLink | null;
  accent?: string;
  defaultQuery?: string;
  onSearch?: (query: string, results: number) => void;
}

const css = `
.hb-kd5 {
  --hb-kd5-accent: #22d3ee;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd5 *, .hb-kd5 *::before, .hb-kd5 *::after { box-sizing: border-box; }
.hb-kd5::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -180px;
  width: 1000px;
  height: 480px;
  transform: translateX(-50%);
  background:
    radial-gradient(closest-side, color-mix(in srgb, var(--hb-kd5-accent) 16%, transparent), transparent),
    radial-gradient(closest-side at 70% 60%, rgba(139, 92, 246, .1), transparent);
  pointer-events: none;
}
.hb-kd5-in {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 88px 24px 104px;
}
.hb-kd5-head { text-align: center; }
.hb-kd5-title {
  margin: 0;
  font-size: clamp(30px, 5cqi, 48px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -.03em;
}
.hb-kd5-sub { margin: 14px auto 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kd5-search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 60px;
  margin-top: 36px;
  padding: 0 14px 0 20px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 18px;
  background: linear-gradient(180deg, #151515, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 20px 50px -20px rgba(0, 0, 0, .8);
  transition: border-color .25s ease, box-shadow .25s ease;
}
.hb-kd5-search:focus-within {
  border-color: color-mix(in srgb, var(--hb-kd5-accent) 60%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 0 0 4px color-mix(in srgb, var(--hb-kd5-accent) 16%, transparent), 0 20px 50px -20px rgba(0, 0, 0, .8);
}
.hb-kd5-search > svg { flex: none; width: 20px; height: 20px; color: #7a7a7a; }
.hb-kd5-search:focus-within > svg { color: var(--hb-kd5-accent); }
.hb-kd5-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 17px;
}
.hb-kd5-input::placeholder { color: #6b6b6b; }
.hb-kd5-input::-webkit-search-cancel-button { display: none; }
.hb-kd5-kbd {
  display: grid;
  flex: none;
  place-items: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 7px;
  background: rgba(255, 255, 255, .04);
  color: #8f8f8f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.hb-kd5-clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, .06);
  color: #bdbdbd;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease;
}
.hb-kd5-clear:hover { background: rgba(255, 255, 255, .12); color: #fff; }
.hb-kd5-clear:focus-visible { outline: 2px solid var(--hb-kd5-accent); outline-offset: 2px; }
.hb-kd5-clear svg { width: 14px; height: 14px; }
.hb-kd5-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: #6b6b6b;
  font-size: 13px;
}
.hb-kd5-chip {
  margin: 0;
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .02);
  color: #a1a1a1;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: border-color .2s ease, color .2s ease, background-color .2s ease;
}
.hb-kd5-chip:hover { border-color: rgba(255, 255, 255, .2); color: #ededed; }
.hb-kd5-chip[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-kd5-accent) 55%, transparent);
  background: color-mix(in srgb, var(--hb-kd5-accent) 12%, transparent);
  color: color-mix(in srgb, var(--hb-kd5-accent) 50%, #fff);
}
.hb-kd5-chip:focus-visible { outline: 2px solid var(--hb-kd5-accent); outline-offset: 2px; }
.hb-kd5-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 4px 12px;
  color: #8f8f8f;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.hb-kd5-meta b { color: #ededed; font-weight: 600; }
.hb-kd5-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: #0f0f0f;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  overflow: hidden;
}
.hb-kd5-item { border-top: 1px solid rgba(255, 255, 255, .06); animation: hb-kd5-in .35s cubic-bezier(.2, .8, .2, 1) both; }
.hb-kd5-item:first-child { border-top: 0; }
@keyframes hb-kd5-in { from { opacity: 0; transform: translate3d(0, 6px, 0); } to { opacity: 1; transform: none; } }
.hb-kd5-h { margin: 0; font: inherit; }
.hb-kd5-trigger {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  margin: 0;
  padding: 20px 22px;
  border: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  transition: background-color .2s ease;
}
.hb-kd5-trigger:hover { background: rgba(255, 255, 255, .025); }
.hb-kd5-trigger:focus-visible { outline: 2px solid var(--hb-kd5-accent); outline-offset: -2px; border-radius: 12px; }
.hb-kd5-q { flex: 1; min-width: 0; }
.hb-kd5-tag {
  flex: none;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .05);
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 500;
}
.hb-kd5-icon {
  position: relative;
  flex: none;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 7px;
  transition: border-color .3s ease, background-color .3s ease;
}
.hb-kd5-icon::before, .hb-kd5-icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 9px;
  height: 1.5px;
  margin: -.75px 0 0 -4.5px;
  border-radius: 2px;
  background: #bdbdbd;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), background-color .3s ease;
}
.hb-kd5-icon::after { transform: rotate(90deg); }
.hb-kd5-trigger[aria-expanded="true"] .hb-kd5-icon { border-color: color-mix(in srgb, var(--hb-kd5-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-kd5-accent) 14%, transparent); }
.hb-kd5-trigger[aria-expanded="true"] .hb-kd5-icon::before, .hb-kd5-trigger[aria-expanded="true"] .hb-kd5-icon::after { background: var(--hb-kd5-accent); }
.hb-kd5-trigger[aria-expanded="true"] .hb-kd5-icon::after { transform: rotate(0deg); }
.hb-kd5-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1), visibility 0s linear .4s;
}
.hb-kd5-item[data-open="true"] .hb-kd5-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1), visibility 0s linear 0s;
}
.hb-kd5-clip { min-height: 0; overflow: hidden; }
.hb-kd5-a {
  margin: 0;
  padding: 0 22px 22px;
  max-width: 640px;
  color: #a1a1a1;
  font-size: 15px;
  line-height: 1.65;
  opacity: 0;
  transform: translate3d(0, -4px, 0);
  transition: opacity .3s ease, transform .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd5-item[data-open="true"] .hb-kd5-a { opacity: 1; transform: none; transition-delay: .08s; }
.hb-kd5-mark {
  padding: 0 2px;
  margin: 0 -2px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--hb-kd5-accent) 26%, transparent);
  color: #fff;
  box-shadow: inset 0 -1px 0 var(--hb-kd5-accent);
}
.hb-kd5-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 24px;
  border: 1px dashed rgba(255, 255, 255, .12);
  border-radius: 20px;
  background: rgba(255, 255, 255, .015);
  text-align: center;
}
.hb-kd5-empty-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 16px;
  background: linear-gradient(180deg, #181818, #111);
  color: #8f8f8f;
}
.hb-kd5-empty-icon svg { width: 22px; height: 22px; }
.hb-kd5-empty-title { margin: 18px 0 0; font-size: 17px; font-weight: 600; }
.hb-kd5-empty-text { margin: 8px 0 0; max-width: 360px; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
.hb-kd5-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 22px; }
.hb-kd5-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  margin: 0;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-kd5-btn:hover { border-color: rgba(255, 255, 255, .24); background: rgba(255, 255, 255, .08); }
.hb-kd5-btn[data-primary="true"] { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-kd5-btn[data-primary="true"]:hover { background: #fff; }
.hb-kd5-btn:focus-visible { outline: 2px solid var(--hb-kd5-accent); outline-offset: 3px; }
.hb-kd5-foot { margin: 20px 0 0; color: #8f8f8f; font-size: 14px; text-align: center; }
.hb-kd5-foot a { color: #ededed; text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--hb-kd5-accent) 60%, transparent); text-underline-offset: 3px; border-radius: 4px; }
.hb-kd5-foot a:hover { color: var(--hb-kd5-accent); }
.hb-kd5-foot a:focus-visible { outline: 2px solid var(--hb-kd5-accent); outline-offset: 2px; }
@container (max-width: 560px) {
  .hb-kd5-in { padding: 64px 16px 72px; }
  .hb-kd5-search { height: 54px; padding: 0 10px 0 16px; border-radius: 16px; }
  .hb-kd5-input { font-size: 16px; }
  .hb-kd5-kbd { display: none; }
  .hb-kd5-trigger { padding: 18px 16px; font-size: 15px; gap: 12px; }
  .hb-kd5-a { padding: 0 16px 18px; }
  .hb-kd5-tag { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd5-item { animation: none; }
  .hb-kd5-panel, .hb-kd5-item[data-open="true"] .hb-kd5-panel, .hb-kd5-a, .hb-kd5-icon, .hb-kd5-icon::before, .hb-kd5-icon::after { transition: none; }
}
`;

const defaultItems: FaqSearchItem[] = [
  { question: "How do I request a refund?", answer: "Open Billing, pick the invoice and choose Request refund. Refunds for annual plans are prorated and land on the original card within 5 to 10 business days.", category: "Billing" },
  { question: "Can I change my plan in the middle of a billing cycle?", answer: "Yes. Upgrades apply immediately and you only pay the difference for the days left. Downgrades take effect at the start of your next cycle.", category: "Billing" },
  { question: "Do you support single sign-on with SAML?", answer: "SAML SSO with Okta, Microsoft Entra ID and Google Workspace is included on the Business plan. SCIM provisioning keeps seats in sync automatically.", category: "Security" },
  { question: "Where is my data stored?", answer: "Workspaces are hosted in Frankfurt or Virginia, chosen at sign-up. Data is encrypted at rest with AES-256 and in transit with TLS 1.3.", category: "Security" },
  { question: "How do I export everything from my workspace?", answer: "Go to Settings, then Data, then Export. You get a ZIP with CSV and JSON files for every project, plus original attachments, usually within ten minutes.", category: "Account" },
  { question: "How are seats counted?", answer: "A seat is any member who can edit. Viewers and guests are free and unlimited, so you can share boards with clients without paying extra.", category: "Billing" },
  { question: "Is there an API and a rate limit?", answer: "The REST and GraphQL APIs are available on every plan. The limit is 600 requests per minute per workspace, and webhooks do not count toward it.", category: "Developers" },
  { question: "Can I invite people outside my company?", answer: "Invite guests by email to individual projects. They only see what you share with them and can be removed in one click from the member list.", category: "Account" },
];

const defaultSuggestions = ["refund", "SSO", "export", "seats", "API"];

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordsOf(query: string) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function matches(item: FaqSearchItem, words: string[]) {
  if (words.length === 0) return true;
  const hay = `${item.question} ${item.answer} ${item.category ?? ""}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}

function highlight(text: string, words: string[]) {
  if (words.length === 0) return text;
  const pattern = new RegExp(`(${[...words].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="hb-kd5-mark">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export function FaqSearch({
  title = "How can we help?",
  subtitle = "Search answers about billing, security and your workspace. Most questions are answered in under a minute.",
  items = defaultItems,
  placeholder = "Search questions, for example refunds",
  suggestions = defaultSuggestions,
  contact = { label: "Contact support", href: "#support" },
  accent = "#22d3ee",
  defaultQuery = "",
  onSearch,
  className = "",
  style,
  ...rest
}: FaqSearchProps) {
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState(defaultQuery);
  const [open, setOpen] = React.useState<number>(defaultQuery ? -2 : 0);
  const words = wordsOf(query);

  const results = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => matches(item, words));

  const openIndex = open === -2 ? (results[0]?.index ?? -1) : open;

  const update = (value: string) => {
    setQuery(value);
    const w = wordsOf(value);
    setOpen(w.length ? -2 : 0);
    onSearch?.(value, items.filter((item) => matches(item, w)).length);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const vars = { "--hb-kd5-accent": accent, ...style } as React.CSSProperties;
  const lowerQuery = query.trim().toLowerCase();

  return (
    <section className={`hb-kd5 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-faq-search" precedence="default">{css}</style>
      <div className="hb-kd5-in">
        <header className="hb-kd5-head">
          <h2 id={`${uid}-t`} className="hb-kd5-title">{title}</h2>
          {subtitle && <p className="hb-kd5-sub">{subtitle}</p>}
        </header>
        <div className="hb-kd5-search" role="search">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" />
          </svg>
          <input
            ref={inputRef}
            className="hb-kd5-input"
            type="search"
            value={query}
            placeholder={placeholder}
            aria-label="Search frequently asked questions"
            aria-controls={`${uid}-list`}
            onChange={(e) => update(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) {
                e.preventDefault();
                update("");
              }
            }}
          />
          {query ? (
            <button type="button" className="hb-kd5-clear" aria-label="Clear search" onClick={() => { update(""); inputRef.current?.focus(); }}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
              </svg>
            </button>
          ) : (
            <kbd className="hb-kd5-kbd" aria-hidden="true">/</kbd>
          )}
        </div>
        {suggestions.length > 0 && (
          <div className="hb-kd5-chips">
            <span>Popular:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="hb-kd5-chip"
                aria-pressed={lowerQuery === s.toLowerCase()}
                onClick={() => update(lowerQuery === s.toLowerCase() ? "" : s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="hb-kd5-meta" aria-live="polite">
          <span>
            {words.length ? (
              <>
                <b>{results.length}</b> of {items.length} answers match
              </>
            ) : (
              <>
                <b>{items.length}</b> answers
              </>
            )}
          </span>
          <span>Updated Oct 2026</span>
        </div>
        {results.length > 0 ? (
          <ul className="hb-kd5-list" id={`${uid}-list`}>
            {results.map(({ item, index }) => {
              const isOpen = openIndex === index;
              const tid = `${uid}-q${index}`;
              const pid = `${uid}-a${index}`;
              return (
                <li key={index} className="hb-kd5-item" data-open={isOpen ? "true" : "false"}>
                  <h3 className="hb-kd5-h">
                    <button
                      id={tid}
                      type="button"
                      className="hb-kd5-trigger"
                      aria-expanded={isOpen}
                      aria-controls={pid}
                      onClick={() => setOpen(isOpen ? -1 : index)}
                    >
                      <span className="hb-kd5-q">{highlight(item.question, words)}</span>
                      {item.category && <span className="hb-kd5-tag">{item.category}</span>}
                      <span className="hb-kd5-icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={pid} className="hb-kd5-panel" role="region" aria-labelledby={tid}>
                    <div className="hb-kd5-clip">
                      <p className="hb-kd5-a">{highlight(item.answer, words)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="hb-kd5-empty" id={`${uid}-list`}>
            <span className="hb-kd5-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="6.5" />
                <path d="M15 15l4 4M7.8 8.2c.3-1 1.1-1.6 2.2-1.6 1.3 0 2.2.8 2.2 1.9 0 1.5-2.2 1.6-2.2 3" />
                <path d="M10 13.6v.1" />
              </svg>
            </span>
            <p className="hb-kd5-empty-title">No answers for &ldquo;{query.trim()}&rdquo;</p>
            <p className="hb-kd5-empty-text">Try a shorter keyword, check the spelling, or ask our team. A real person replies in about two hours.</p>
            <div className="hb-kd5-actions">
              <button type="button" className="hb-kd5-btn" onClick={() => { update(""); inputRef.current?.focus(); }}>
                Clear search
              </button>
              {contact && (
                <a className="hb-kd5-btn" data-primary="true" href={contact.href}>
                  {contact.label}
                </a>
              )}
            </div>
          </div>
        )}
        {contact && results.length > 0 && (
          <p className="hb-kd5-foot">
            Still stuck? <a href={contact.href}>{contact.label}</a>
          </p>
        )}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export type FaqTopicIconsTopic = "billing" | "security" | "team" | "data" | "integrations" | "account";

export interface FaqTopicIconsItem {
  question: string;
  answer: string;
  topic: FaqTopicIconsTopic;
}

export interface FaqTopicIconsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqTopicIconsItem[];
  defaultOpen?: number | null;
  placeholder?: string;
  contact?: { label: string; href: string };
  onItemToggle?: (index: number, open: boolean) => void;
  accent?: string;
}

const css = `
.hb-wc9 {
  --hb-wc9-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc9 *, .hb-wc9 *::before, .hb-wc9 *::after { box-sizing: border-box; }
.hb-wc9-inner { max-width: 880px; margin: 0 auto; padding: 72px 20px; }
.hb-wc9-head { display: grid; gap: 22px; margin-bottom: 26px; }
.hb-wc9-eyebrow { margin: 0 0 12px; color: var(--hb-wc9-accent); font-size: 13px; font-weight: 650; letter-spacing: .02em; }
.hb-wc9-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(30px, 5cqi, 46px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; }
.hb-wc9-sub { margin: 12px 0 0; max-width: 460px; color: #8f8f8f; font-size: 15.5px; line-height: 1.55; }
.hb-wc9-search { position: relative; display: flex; align-items: center; gap: 10px; height: 50px; padding: 0 8px 0 16px; border: 1px solid rgba(255, 255, 255, .09); border-radius: 14px; background: linear-gradient(180deg, #141414, #101010); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05); transition: border-color .2s ease, box-shadow .2s ease; }
.hb-wc9-search:focus-within { border-color: color-mix(in srgb, var(--hb-wc9-accent) 70%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wc9-accent) 16%, transparent); }
.hb-wc9-search > svg { flex: none; width: 17px; height: 17px; color: #6f6f6f; }
.hb-wc9-input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 15px; outline: none; }
.hb-wc9-input::placeholder { color: #5f5f5f; }
.hb-wc9-input::-webkit-search-cancel-button { display: none; }
.hb-wc9-count { color: #6f6f6f; font-size: 12.5px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wc9-kbd { display: inline-grid; place-items: center; min-width: 24px; height: 24px; padding: 0 6px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 6px; background: #1a1a1a; color: #8f8f8f; font-family: var(--font-mono), monospace; font-size: 11.5px; box-shadow: inset 0 -1px 0 rgba(255, 255, 255, .05); }
.hb-wc9-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
.hb-wc9-chip { display: inline-flex; align-items: center; gap: 7px; height: 32px; padding: 0 12px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; background: transparent; color: #a1a1a1; font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; transition: color .2s ease, background .2s ease, border-color .2s ease; }
.hb-wc9-chip:hover { color: #ededed; border-color: rgba(255, 255, 255, .18); }
.hb-wc9-chip[aria-pressed="true"] { border-color: color-mix(in srgb, var(--hb-wc9-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-wc9-accent) 14%, transparent); color: #fff; }
.hb-wc9-chip svg { width: 14px; height: 14px; }
.hb-wc9-chip:focus-visible, .hb-wc9-q:focus-visible, .hb-wc9-link:focus-visible { outline: 2px solid var(--hb-wc9-accent); outline-offset: 2px; }
.hb-wc9-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-wc9-item { position: relative; border: 1px solid rgba(255, 255, 255, .07); border-radius: 16px; background: #0f0f0f; transition: border-color .3s ease, background .3s ease; animation: hb-wc9-in .4s cubic-bezier(.2, .9, .3, 1) both; }
.hb-wc9-item[data-open="true"] { border-color: rgba(255, 255, 255, .12); background: linear-gradient(180deg, #141414, #0f0f0f); }
.hb-wc9-item[data-active="true"] { border-color: color-mix(in srgb, var(--hb-wc9-accent) 55%, transparent); }
.hb-wc9-q { display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 16px 14px 14px; border: 0; border-radius: 16px; background: none; color: #ededed; font: inherit; font-size: 15.5px; font-weight: 550; text-align: left; cursor: pointer; }
.hb-wc9-tile { position: relative; display: grid; place-items: center; flex: none; width: 38px; height: 38px; border-radius: 11px; background: #171717; color: #8f8f8f; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .07); transition: background .35s ease, color .35s ease, box-shadow .35s ease, transform .45s cubic-bezier(.3, 1.6, .5, 1); }
.hb-wc9-tile svg { width: 19px; height: 19px; overflow: visible; }
.hb-wc9-tile path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.hb-wc9-q:hover .hb-wc9-tile { transform: rotate(-6deg) scale(1.05); }
.hb-wc9-item[data-open="true"] .hb-wc9-tile { background: color-mix(in srgb, var(--hb-wc9-accent) 20%, #141414); color: #fff; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-wc9-accent) 60%, transparent), 0 8px 20px -8px var(--hb-wc9-accent); }
.hb-wc9-item[data-open="true"] .hb-wc9-tile path { animation: hb-wc9-draw .9s cubic-bezier(.65, 0, .35, 1) both; }
.hb-wc9-item[data-open="true"] .hb-wc9-tile path:nth-child(2) { animation-delay: .12s; }
.hb-wc9-item[data-open="true"] .hb-wc9-tile path:nth-child(3) { animation-delay: .24s; }
.hb-wc9-qt { flex: 1; min-width: 0; }
.hb-wc9-qt mark, .hb-wc9-a mark { padding: 0 2px; border-radius: 3px; background: color-mix(in srgb, var(--hb-wc9-accent) 32%, transparent); color: #fff; }
.hb-wc9-pm { position: relative; flex: none; width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .1); transition: transform .5s cubic-bezier(.3, 1.4, .5, 1), background .3s ease, border-color .3s ease; }
.hb-wc9-pm::before, .hb-wc9-pm::after { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 1.6px; border-radius: 1px; background: #a1a1a1; transform: translate(-50%, -50%); transition: transform .5s cubic-bezier(.3, 1.4, .5, 1), background .3s ease; }
.hb-wc9-pm::after { transform: translate(-50%, -50%) rotate(90deg); }
.hb-wc9-item[data-open="true"] .hb-wc9-pm { transform: rotate(180deg); background: #ededed; border-color: #ededed; }
.hb-wc9-item[data-open="true"] .hb-wc9-pm::before, .hb-wc9-item[data-open="true"] .hb-wc9-pm::after { background: #0a0a0a; }
.hb-wc9-item[data-open="true"] .hb-wc9-pm::after { transform: translate(-50%, -50%) rotate(0deg); }
.hb-wc9-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1); }
.hb-wc9-item[data-open="true"] .hb-wc9-wrap { grid-template-rows: 1fr; }
.hb-wc9-wrap > div { min-height: 0; overflow: hidden; }
.hb-wc9-a { margin: 0; padding: 0 56px 18px 66px; color: #a1a1a1; font-size: 14.5px; line-height: 1.65; opacity: 0; transform: translateY(-6px); transition: opacity .3s ease, transform .4s cubic-bezier(.2, .8, .2, 1); }
.hb-wc9-item[data-open="true"] .hb-wc9-a { opacity: 1; transform: none; transition-delay: .08s; }
.hb-wc9-empty { display: grid; justify-items: center; gap: 10px; padding: 40px 16px; border: 1px dashed rgba(255, 255, 255, .1); border-radius: 16px; color: #8f8f8f; font-size: 14.5px; text-align: center; }
.hb-wc9-empty b { color: #ededed; font-weight: 600; }
.hb-wc9-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; color: #6f6f6f; font-size: 13px; }
.hb-wc9-keys { display: inline-flex; align-items: center; gap: 6px; }
.hb-wc9-link { display: inline-flex; align-items: center; gap: 6px; color: #ededed; font-weight: 550; text-decoration: none; border-radius: 6px; }
.hb-wc9-link svg { width: 13px; height: 13px; transition: transform .3s ease; }
.hb-wc9-link:hover svg { transform: translateX(3px); }
@keyframes hb-wc9-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wc9-in { from { opacity: 0; transform: translateY(6px); } }
@container (min-width: 720px) {
  .hb-wc9-inner { padding: 104px 32px; }
  .hb-wc9-head { grid-template-columns: minmax(0, 1fr) minmax(0, 340px); align-items: end; gap: 32px; }
}
@container (max-width: 520px) {
  .hb-wc9-a { padding: 0 16px 16px 66px; }
  .hb-wc9-keys { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc9 *, .hb-wc9 *::before, .hb-wc9 *::after { animation: none !important; transition: none !important; }
}
`;

const topicIcons: Record<FaqTopicIconsTopic, string[]> = {
  billing: ["M2 5.5h16v10H2z", "M2 8.5h16", "M5 12.5h4"],
  security: ["M10 2l6.5 2.5v5c0 4-2.8 6.8-6.5 8-3.7-1.2-6.5-4-6.5-8v-5z", "M7 10l2.2 2.2L13.5 8"],
  team: ["M7.5 9a3 3 0 100-6 3 3 0 000 6z", "M2 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5", "M13.5 3.3a3 3 0 010 5.4M15.5 12.4c1.6.7 2.5 2.4 2.5 4.6"],
  data: ["M10 2c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3z", "M3 5v5c0 1.7 3 3 7 3s7-1.3 7-3V5", "M3 10v5c0 1.7 3 3 7 3s7-1.3 7-3v-5"],
  integrations: ["M8 3v4M12 3v4", "M5 7h10v3a5 5 0 01-10 0z", "M10 15v3"],
  account: ["M10 9.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z", "M3 18c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5"],
};

const topicLabels: Record<FaqTopicIconsTopic, string> = {
  billing: "Billing",
  security: "Security",
  team: "Team",
  data: "Data",
  integrations: "Integrations",
  account: "Account",
};

const defaultItems: FaqTopicIconsItem[] = [
  { topic: "billing", question: "Can I switch between monthly and yearly billing?", answer: "Yes. Switch from Settings, Billing at any time. Moving to yearly applies a prorated credit for the rest of your month, and moving to monthly takes effect at the end of your current year." },
  { topic: "security", question: "Where is my data stored and is it encrypted?", answer: "Workspaces are hosted in Frankfurt or Virginia, your choice at signup. Data is encrypted at rest with AES-256 and in transit with TLS 1.3, and keys rotate every 90 days." },
  { topic: "team", question: "How do guest seats work?", answer: "Guests can view and comment on the projects you share with them and never count toward your seat total. Each paid seat includes five guests." },
  { topic: "integrations", question: "Which tools can I connect?", answer: "There are native integrations for 60 tools including issue trackers, chat, calendars and storage. Anything else connects through webhooks or the REST API with a personal token." },
  { topic: "data", question: "Can I export everything if I leave?", answer: "Export your full workspace as JSON or CSV from Settings, Data. Files come as a zip with the original folder structure. Exports stay available for 30 days after you cancel." },
  { topic: "account", question: "How do I transfer workspace ownership?", answer: "An owner can hand over ownership to any admin from Members. The new owner confirms by email, and billing moves with the ownership." },
  { topic: "billing", question: "Do you offer discounts for nonprofits or education?", answer: "Registered nonprofits and accredited schools get 50 percent off any paid plan. Apply from the billing page with your registration number." },
  { topic: "security", question: "Do you support SSO and SCIM?", answer: "SAML single sign-on and SCIM provisioning are available on the Business plan and work with every major identity provider." },
];

function Icon({ topic }: { topic: FaqTopicIconsTopic }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {topicIcons[topic].map((d) => (
        <path key={d} d={d} pathLength={1} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

function highlight(text: string, terms: string[]) {
  if (!terms.length) return text;
  const esc = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>));
}

export function FaqTopicIcons({
  eyebrow = "Help center",
  title = "Questions, answered.",
  subtitle = "Search the most common questions or filter by topic. Still stuck? A real person replies in under two hours.",
  items = defaultItems,
  defaultOpen = 1,
  placeholder = "Search questions",
  contact = { label: "Contact support", href: "#" },
  onItemToggle,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: FaqTopicIconsProps) {
  const [query, setQuery] = React.useState("");
  const [topic, setTopic] = React.useState<FaqTopicIconsTopic | null>(null);
  const [open, setOpen] = React.useState<number | null>(defaultOpen);
  const [active, setActive] = React.useState(-1);
  const input = React.useRef<HTMLInputElement>(null);
  const id = React.useId();

  const terms = query.trim().toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  const visible = items
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => (!topic || it.topic === topic) && terms.every((t) => `${it.question} ${it.answer}`.toLowerCase().includes(t)));
  const topics = Array.from(new Set(items.map((i) => i.topic)));

  React.useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    onItemToggle?.(i, next === i);
  };

  const searchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visible.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % visible.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? visible.length - 1 : a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = visible[Math.max(0, active)];
      if (pick) toggle(pick.i);
    } else if (e.key === "Escape") {
      setQuery("");
      setActive(-1);
    }
  };

  const vars = { "--hb-wc9-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc9 ${className}`} style={vars} {...rest}>
      <style href="hb-faq-topic-icons" precedence="default">{css}</style>
      <div className="hb-wc9-inner">
        <div className="hb-wc9-head">
          <div>
            {eyebrow ? <p className="hb-wc9-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-wc9-title">{title}</h2>
            {subtitle ? <p className="hb-wc9-sub">{subtitle}</p> : null}
          </div>
          <label className="hb-wc9-search" htmlFor={`${id}-q`}>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12.2 12.2L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              ref={input}
              id={`${id}-q`}
              className="hb-wc9-input"
              type="search"
              value={query}
              placeholder={placeholder}
              aria-label="Search questions"
              aria-controls={`${id}-l`}
              aria-activedescendant={active >= 0 && visible[active] ? `${id}-i${visible[active].i}` : undefined}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(-1);
              }}
              onKeyDown={searchKey}
            />
            {query ? (
              <span className="hb-wc9-count" aria-live="polite">
                {visible.length} of {items.length}
              </span>
            ) : (
              <span className="hb-wc9-kbd" aria-hidden="true">/</span>
            )}
          </label>
        </div>
        <div className="hb-wc9-chips" role="group" aria-label="Filter by topic">
          <button type="button" className="hb-wc9-chip" aria-pressed={topic === null} onClick={() => setTopic(null)}>
            All
          </button>
          {topics.map((t) => (
            <button key={t} type="button" className="hb-wc9-chip" aria-pressed={topic === t} onClick={() => setTopic((c) => (c === t ? null : t))}>
              <Icon topic={t} />
              {topicLabels[t]}
            </button>
          ))}
        </div>
        {visible.length ? (
          <ul className="hb-wc9-list" id={`${id}-l`}>
            {visible.map(({ it, i }, n) => (
              <li
                key={i}
                id={`${id}-i${i}`}
                className="hb-wc9-item"
                data-open={open === i ? "true" : "false"}
                data-active={active === n ? "true" : "false"}
                style={{ animationDelay: `${(n * 40).toFixed(0)}ms` }}
              >
                <button type="button" className="hb-wc9-q" aria-expanded={open === i} aria-controls={`${id}-a${i}`} onClick={() => toggle(i)}>
                  <span className="hb-wc9-tile">
                    <Icon topic={it.topic} />
                  </span>
                  <span className="hb-wc9-qt">{highlight(it.question, terms)}</span>
                  <span className="hb-wc9-pm" aria-hidden="true" />
                </button>
                <div className="hb-wc9-wrap" id={`${id}-a${i}`} role="region" aria-hidden={open !== i}>
                  <div>
                    <p className="hb-wc9-a">{highlight(it.answer, terms)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="hb-wc9-empty" role="status">
            <b>No matches for &ldquo;{query}&rdquo;</b>
            Try a shorter word, or ask the team directly.
            {contact ? (
              <a className="hb-wc9-link" href={contact.href}>
                {contact.label}
              </a>
            ) : null}
          </div>
        )}
        <div className="hb-wc9-foot">
          <span className="hb-wc9-keys">
            <span className="hb-wc9-kbd">/</span> to search, <span className="hb-wc9-kbd">↑</span>
            <span className="hb-wc9-kbd">↓</span> to move, <span className="hb-wc9-kbd">Enter</span> to open
          </span>
          {contact ? (
            <a className="hb-wc9-link" href={contact.href}>
              {contact.label}
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2.5 7h8.5M7.5 3.5L11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

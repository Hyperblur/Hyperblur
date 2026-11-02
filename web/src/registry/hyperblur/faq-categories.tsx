"use client";

import * as React from "react";

export interface FaqCategoryQuestion {
  question: string;
  answer: React.ReactNode;
}

export interface FaqCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: FaqCategoryQuestion[];
}

export interface FaqCategoriesLink {
  label: string;
  href: string;
}

export interface FaqCategoriesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "defaultValue" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: FaqCategory[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  contact?: FaqCategoriesLink | null;
  accent?: string;
}

const css = `
.hb-kd7 {
  --hb-kd7-accent: #8b5cf6;
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
.hb-kd7 *, .hb-kd7 *::before, .hb-kd7 *::after { box-sizing: border-box; }
.hb-kd7::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(40% 50% at 15% 0%, color-mix(in srgb, var(--hb-kd7-accent) 15%, transparent), transparent 70%),
    radial-gradient(35% 45% at 90% 100%, color-mix(in srgb, var(--hb-kd7-accent) 9%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-kd7-in {
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 88px 24px 100px;
}
.hb-kd7-head { max-width: 620px; margin: 0 auto; text-align: center; }
.hb-kd7-eyebrow {
  margin: 0;
  color: color-mix(in srgb, var(--hb-kd7-accent) 55%, #fff);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-kd7-title {
  margin: 14px 0 0;
  font-size: clamp(30px, 4.8cqi, 46px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-kd7-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kd7-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-kd7-n, 3), minmax(0, 1fr));
  width: min(100%, 520px);
  margin: 36px auto 0;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-kd7-pill {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc((100% - 10px) / var(--hb-kd7-n, 3));
  border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-kd7-accent) 85%, #fff), var(--hb-kd7-accent));
  box-shadow: 0 1px 0 rgba(255, 255, 255, .3) inset, 0 8px 24px -8px color-mix(in srgb, var(--hb-kd7-accent) 80%, transparent);
  transform: translate3d(calc(100% * var(--hb-kd7-i, 0)), 0, 0);
  transition: transform .5s cubic-bezier(.3, 1.3, .5, 1);
}
.hb-kd7-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  height: 42px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  white-space: nowrap;
  cursor: pointer;
  transition: color .3s ease;
}
.hb-kd7-tab:hover { color: #ededed; }
.hb-kd7-tab[aria-selected="true"] { color: #fff; }
.hb-kd7-tab:focus-visible { outline: 2px solid #fff; outline-offset: -3px; }
.hb-kd7-tab svg { flex: none; width: 16px; height: 16px; }
.hb-kd7-count {
  display: grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .08);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-kd7-tab[aria-selected="true"] .hb-kd7-count { background: rgba(255, 255, 255, .22); }
.hb-kd7-panel { margin-top: 44px; outline: none; }
.hb-kd7-panel:focus-visible { outline: 2px solid var(--hb-kd7-accent); outline-offset: 8px; border-radius: 16px; }
.hb-kd7-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-kd7-card {
  position: relative;
  height: 100%;
  padding: 24px 24px 26px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  transition: border-color .3s ease, background-color .3s ease;
  animation: hb-kd7-in .55s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kd7-d, 0s);
}
.hb-kd7-panel[data-dir="-1"] .hb-kd7-card { animation-name: hb-kd7-in-back; }
.hb-kd7-card:hover { border-color: color-mix(in srgb, var(--hb-kd7-accent) 40%, rgba(255, 255, 255, .07)); }
@keyframes hb-kd7-in {
  from { opacity: 0; transform: translate3d(28px, 0, 0); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes hb-kd7-in-back {
  from { opacity: 0; transform: translate3d(-28px, 0, 0); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
.hb-kd7-q {
  display: flex;
  gap: 12px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -.01em;
}
.hb-kd7-q::before {
  content: "";
  flex: none;
  width: 7px;
  height: 7px;
  margin-top: 8px;
  border-radius: 2px;
  background: var(--hb-kd7-accent);
  box-shadow: 0 0 12px var(--hb-kd7-accent);
  transform: rotate(45deg);
}
.hb-kd7-a { margin: 10px 0 0 19px; color: #9a9a9a; font-size: 14.5px; line-height: 1.65; }
.hb-kd7-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 16px;
  margin-top: 40px;
  color: #8f8f8f;
  font-size: 14px;
}
.hb-kd7-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: #ededed;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease;
}
.hb-kd7-link:hover { border-color: color-mix(in srgb, var(--hb-kd7-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-kd7-accent) 12%, transparent); }
.hb-kd7-link:focus-visible { outline: 2px solid var(--hb-kd7-accent); outline-offset: 3px; }
.hb-kd7-link svg { width: 14px; height: 14px; }
@container (max-width: 680px) {
  .hb-kd7-grid { grid-template-columns: minmax(0, 1fr); }
}
@container (max-width: 520px) {
  .hb-kd7-in { padding: 64px 16px 72px; }
  .hb-kd7-tab { gap: 6px; padding: 0 6px; font-size: 13px; }
  .hb-kd7-tab svg { display: none; }
  .hb-kd7-panel { margin-top: 32px; }
  .hb-kd7-card { padding: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd7-pill, .hb-kd7-tab, .hb-kd7-card, .hb-kd7-link { transition: none; }
  .hb-kd7-card { animation: none; }
}
`;

const icons = [
  <svg key="card" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="9" rx="2" />
    <path d="M1.5 6.5h13M4 10h2.5" />
  </svg>,
  <svg key="shield" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5l5.5 2v4c0 3.4-2.3 5.9-5.5 7-3.2-1.1-5.5-3.6-5.5-7v-4L8 1.5z" />
    <path d="M5.8 8l1.6 1.6L10.4 6.5" />
  </svg>,
  <svg key="box" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5l6 3.2v6.6l-6 3.2-6-3.2V4.7l6-3.2z" />
    <path d="M2 4.7l6 3.3 6-3.3M8 8v6.5" />
  </svg>,
];

const defaultCategories: FaqCategory[] = [
  {
    id: "billing",
    label: "Billing",
    items: [
      { question: "When will I be charged?", answer: "On the day your trial ends, and then on the same date every month or year. You get an email receipt three days before each renewal." },
      { question: "Which payment methods do you accept?", answer: "Visa, Mastercard, American Express, Apple Pay and SEPA debit. Annual plans over $5,000 can also be paid by bank transfer against an invoice." },
      { question: "Can I get an invoice with my VAT number?", answer: "Add your VAT or tax ID under Billing and every future invoice will include it. Past invoices can be reissued with one click." },
      { question: "What happens if a payment fails?", answer: "We retry three times over seven days and email the billing owner each time. Your workspace stays fully active during that window." },
    ],
  },
  {
    id: "security",
    label: "Security",
    items: [
      { question: "Are you SOC 2 compliant?", answer: "Yes. We hold a SOC 2 Type II report renewed every year, and an ISO 27001 certificate. Both are available under NDA from the trust center." },
      { question: "How is my data encrypted?", answer: "AES-256 at rest and TLS 1.3 in transit. Enterprise workspaces can bring their own keys through AWS KMS and rotate them on their schedule." },
      { question: "Do you support SSO and SCIM?", answer: "SAML single sign-on with Okta, Entra ID and Google Workspace, plus SCIM provisioning, are included on the Business and Enterprise plans." },
      { question: "Can I see who accessed what?", answer: "Audit logs record every sign-in, export and permission change for 400 days, and can be streamed to Datadog or Splunk in real time." },
    ],
  },
  {
    id: "product",
    label: "Product",
    items: [
      { question: "Does it work offline?", answer: "The desktop and mobile apps keep your last 30 days of documents available offline and sync every change the moment you reconnect." },
      { question: "Can I import from other tools?", answer: "One-click importers bring in projects from Notion, Confluence, Asana and Trello, including comments, attachments and assignees." },
      { question: "Is there a public API?", answer: "A REST API and webhooks are available on every plan, with typed SDKs for TypeScript and Python and a sandbox workspace for testing." },
      { question: "How often do you ship updates?", answer: "Small improvements go out daily and larger features every two weeks. The changelog lists every release with screenshots and migration notes." },
    ],
  },
];

export function FaqCategories({
  eyebrow = "Help center",
  title = "Answers, sorted by what you need",
  subtitle = "Pick a topic to see the questions our customers ask most often.",
  categories = defaultCategories,
  value,
  defaultValue,
  onValueChange,
  contact = { label: "Chat with our team", href: "#chat" },
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: FaqCategoriesProps) {
  const uid = React.useId();
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultValue ?? categories[0]?.id ?? "");
  const [dir, setDir] = React.useState(1);
  const current = value ?? inner;
  const foundIndex = categories.findIndex((c) => c.id === current);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const active = categories[activeIndex];

  const select = (index: number, focus = false) => {
    const target = categories[index];
    if (!target) return;
    if (index !== activeIndex) {
      setDir(index > activeIndex ? 1 : -1);
      if (value === undefined) setInner(target.id);
      onValueChange?.(target.id);
    }
    if (focus) tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = categories.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (activeIndex + 1) % n;
    else if (e.key === "ArrowLeft") next = (activeIndex - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === -1) return;
    e.preventDefault();
    select(next, true);
  };

  const vars = {
    "--hb-kd7-accent": accent,
    "--hb-kd7-n": Math.max(1, categories.length),
    "--hb-kd7-i": activeIndex,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-kd7 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-faq-categories" precedence="default">{css}</style>
      <div className="hb-kd7-in">
        <header className="hb-kd7-head">
          {eyebrow && <p className="hb-kd7-eyebrow">{eyebrow}</p>}
          <h2 id={`${uid}-t`} className="hb-kd7-title">{title}</h2>
          {subtitle && <p className="hb-kd7-sub">{subtitle}</p>}
        </header>
        <div ref={tabsRef} className="hb-kd7-tabs" role="tablist" aria-label="Question topics" onKeyDown={onKeyDown}>
          <span className="hb-kd7-pill" aria-hidden="true" />
          {categories.map((cat, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={cat.id}
                id={`${uid}-tab-${i}`}
                type="button"
                role="tab"
                className="hb-kd7-tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
              >
                {cat.icon ?? icons[i % icons.length]}
                <span>{cat.label}</span>
                <span className="hb-kd7-count">{cat.items.length}</span>
              </button>
            );
          })}
        </div>
        {active && (
          <div
            key={active.id}
            id={`${uid}-panel`}
            className="hb-kd7-panel"
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${activeIndex}`}
            tabIndex={0}
            data-dir={dir}
          >
            <ul className="hb-kd7-grid">
              {active.items.map((item, i) => (
                <li key={`${item.question}-${i}`}>
                  <div className="hb-kd7-card" style={{ "--hb-kd7-d": `${(i * 0.06).toFixed(2)}s` } as React.CSSProperties}>
                    <h3 className="hb-kd7-q">{item.question}</h3>
                    <div className="hb-kd7-a">{item.answer}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {contact && (
          <div className="hb-kd7-foot">
            <span>Did not find your answer?</span>
            <a className="hb-kd7-link" href={contact.href}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2v-7z" />
              </svg>
              {contact.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

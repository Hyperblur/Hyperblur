"use client";

import * as React from "react";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqContact {
  label: string;
  href: string;
}

export interface FaqSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  contact?: FaqContact;
  accent?: string;
  defaultOpen?: number;
}

const css = `
.hb-fq {
  --hb-fq-accent: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  padding: 96px 24px;
  background: #07070a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-fq *, .hb-fq *::before, .hb-fq *::after { box-sizing: border-box; }
.hb-fq-wrap {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 64px;
  align-items: start;
  max-width: 1120px;
  margin: 0 auto;
}
.hb-fq-side { position: sticky; top: 48px; }
.hb-fq-title {
  margin: 0;
  font-size: clamp(30px, 4vw, 42px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.02em;
}
.hb-fq-sub {
  margin: 16px 0 0;
  max-width: 420px;
  font-size: clamp(15px, 1.6vw, 17px);
  line-height: 1.6;
  color: rgba(255, 255, 255, .62);
}
.hb-fq-contact {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  margin-top: 28px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #f2f2f5;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease, transform .25s cubic-bezier(.22, .8, .24, 1);
}
.hb-fq-contact:hover {
  border-color: var(--hb-fq-accent);
  background: color-mix(in srgb, var(--hb-fq-accent) 14%, transparent);
  transform: translate3d(0, -2px, 0);
}
.hb-fq-contact:focus-visible { outline: 2px solid var(--hb-fq-accent); outline-offset: 3px; }
.hb-fq-contact svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-fq-contact:hover svg { transform: translate3d(3px, 0, 0); }
.hb-fq-list { margin: 0; padding: 0; list-style: none; }
.hb-fq-item { border-bottom: 1px solid rgba(255, 255, 255, .12); }
.hb-fq-item:first-child { border-top: 1px solid rgba(255, 255, 255, .12); }
.hb-fq-head { margin: 0; font: inherit; }
.hb-fq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 20px 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 16px;
  font-weight: 550;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  transition: color .2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-fq-trigger:hover { color: color-mix(in srgb, var(--hb-fq-accent) 60%, #fff); }
.hb-fq-trigger:focus-visible { outline: 2px solid var(--hb-fq-accent); outline-offset: -2px; }
.hb-fq-chevron {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  opacity: .65;
  transition: transform .35s cubic-bezier(.2, .9, .2, 1), opacity .2s ease, color .2s ease;
}
.hb-fq-trigger[aria-expanded="true"] .hb-fq-chevron {
  transform: rotate(180deg);
  opacity: 1;
  color: var(--hb-fq-accent);
}
.hb-fq-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .35s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .35s;
}
.hb-fq-item[data-open="true"] > .hb-fq-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .35s cubic-bezier(.2, .9, .2, 1), visibility 0s linear 0s;
}
.hb-fq-inner { min-height: 0; overflow: hidden; }
.hb-fq-answer {
  padding: 0 4px 22px;
  max-width: 600px;
  font-size: 15px;
  line-height: 1.65;
  color: rgba(255, 255, 255, .64);
}
@media (max-width: 767px) {
  .hb-fq { padding: 64px 16px; }
  .hb-fq-wrap { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .hb-fq-side { position: static; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-fq-panel, .hb-fq-item[data-open="true"] > .hb-fq-panel { transition: none; }
  .hb-fq-chevron, .hb-fq-contact, .hb-fq-contact svg, .hb-fq-trigger { transition: none; }
  .hb-fq-contact:hover { transform: none; }
  .hb-fq-contact:hover svg { transform: none; }
}
`;

const defaultItems: FaqItem[] = [
  {
    question: "How does the free trial work?",
    answer: "You get full access to every feature for 14 days. No credit card is required, and your workspace is kept if you decide to upgrade later.",
  },
  {
    question: "Can I change or cancel my plan at any time?",
    answer: "Yes. Upgrade, downgrade or cancel whenever you like from your billing settings. Changes apply at the next billing cycle and we never charge cancellation fees.",
  },
  {
    question: "Is my data secure?",
    answer: "All data is encrypted in transit and at rest, backed up daily and stored in certified data centers. You can export or delete everything with one click.",
  },
  {
    question: "Do you offer discounts for startups or nonprofits?",
    answer: "We do. Eligible startups, students and nonprofit organizations get a significant discount. Reach out with a few details and we will set you up.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "Every plan includes email support with a reply in under one business day. Higher plans add live chat and a dedicated success manager.",
  },
  {
    question: "Can I bring my existing data with me?",
    answer: "Absolutely. Import from CSV or connect your current tools, and our migration guides walk you through each step. Most teams are done in an afternoon.",
  },
];

export function FaqSection({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know before getting started. Can not find the answer you are after? Our team is happy to help.",
  items = defaultItems,
  contact = { label: "Contact support", href: "#contact" },
  accent = "#2f7bff",
  defaultOpen = 0,
  className = "",
  style,
  ...rest
}: FaqSectionProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState(defaultOpen);
  const vars = { "--hb-fq-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-fq ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-faq-section" precedence="default">{css}</style>
      <div className="hb-fq-wrap">
        <div className="hb-fq-side">
          <h2 id={`${uid}-title`} className="hb-fq-title">{title}</h2>
          {subtitle && <p className="hb-fq-sub">{subtitle}</p>}
          {contact && (
            <a className="hb-fq-contact" href={contact.href}>
              {contact.label}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10" />
                <path d="M9 4l4 4-4 4" />
              </svg>
            </a>
          )}
        </div>
        <ul className="hb-fq-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `${uid}-trigger-${i}`;
            const panelId = `${uid}-panel-${i}`;
            return (
              <li className="hb-fq-item" data-open={isOpen} key={`${item.question}-${i}`}>
                <h3 className="hb-fq-head">
                  <button
                    id={triggerId}
                    className="hb-fq-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen((prev) => (prev === i ? -1 : i))}
                  >
                    <span>{item.question}</span>
                    <svg
                      className="hb-fq-chevron"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3.5 6l4.5 4.5L12.5 6" />
                    </svg>
                  </button>
                </h3>
                <div id={panelId} className="hb-fq-panel" role="region" aria-labelledby={triggerId}>
                  <div className="hb-fq-inner">
                    <div className="hb-fq-answer">{item.answer}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

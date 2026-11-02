"use client";

import * as React from "react";

export interface FaqTwoColumnItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqTwoColumnLink {
  label: string;
  href: string;
}

export interface FaqTwoColumnSupport {
  title: string;
  text: string;
  people?: string[];
  status?: string;
}

export interface FaqTwoColumnProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqTwoColumnItem[];
  support?: FaqTwoColumnSupport | null;
  contact?: FaqTwoColumnLink | null;
  secondary?: FaqTwoColumnLink | null;
  accent?: string;
  defaultOpen?: number;
  onOpenChange?: (index: number) => void;
}

const css = `
.hb-kd6 {
  --hb-kd6-accent: #4f46e5;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  background: #ffffff;
  color: #111114;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd6 *, .hb-kd6 *::before, .hb-kd6 *::after { box-sizing: border-box; }
.hb-kd6-in {
  display: grid;
  grid-template-columns: minmax(0, 4.2fr) minmax(0, 7fr);
  gap: 72px;
  align-items: start;
  max-width: 1120px;
  margin: 0 auto;
  padding: 104px 32px 112px;
}
.hb-kd6-side { position: sticky; top: 32px; }
.hb-kd6-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kd6-accent) 9%, #fff);
  color: var(--hb-kd6-accent);
  font-size: 12.5px;
  font-weight: 600;
}
.hb-kd6-title {
  margin: 18px 0 0;
  font-size: clamp(32px, 4.6cqi, 50px);
  font-weight: 650;
  line-height: 1.02;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kd6-sub { margin: 18px 0 0; max-width: 380px; color: #5f5f68; font-size: 16px; line-height: 1.6; }
.hb-kd6-card {
  position: relative;
  margin-top: 36px;
  padding: 22px;
  border: 1px solid #e8e8ec;
  border-radius: 20px;
  background: linear-gradient(180deg, #fbfbfc, #f4f4f7);
  box-shadow: 0 1px 0 #fff inset, 0 12px 32px -18px rgba(17, 17, 20, .25);
  overflow: hidden;
}
.hb-kd6-card::after {
  content: "";
  position: absolute;
  right: -60px;
  top: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kd6-accent) 16%, transparent), transparent);
  pointer-events: none;
}
.hb-kd6-people { display: flex; align-items: center; }
.hb-kd6-face {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2.5px solid #f8f8fa;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}
.hb-kd6-face:first-child { margin-left: 0; }
.hb-kd6-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
  color: #3f3f46;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-kd6-status i {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
}
.hb-kd6-status i::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #16a34a;
  animation: hb-kd6-ping 2s cubic-bezier(0, 0, .2, 1) infinite;
}
@keyframes hb-kd6-ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }
.hb-kd6-card-title { position: relative; margin: 18px 0 0; font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.hb-kd6-card-text { position: relative; margin: 6px 0 0; color: #5f5f68; font-size: 14px; line-height: 1.55; }
.hb-kd6-ctas { position: relative; display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.hb-kd6-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: #111114;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .16) inset, 0 6px 16px -6px rgba(17, 17, 20, .5);
  transition: background-color .25s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd6-btn:hover { background: var(--hb-kd6-accent); transform: translate3d(0, -1px, 0); }
.hb-kd6-btn svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kd6-btn:hover svg { transform: translate3d(2px, 0, 0); }
.hb-kd6-btn[data-ghost="true"] { border-color: #dcdce2; background: #fff; color: #111114; box-shadow: none; }
.hb-kd6-btn[data-ghost="true"]:hover { border-color: #b9b9c3; background: #fff; }
.hb-kd6-btn:focus-visible { outline: 2px solid var(--hb-kd6-accent); outline-offset: 3px; }
.hb-kd6-list { margin: 0; padding: 0; list-style: none; }
.hb-kd6-item {
  position: relative;
  border-bottom: 1px solid #ececf0;
  transition: background-color .3s ease;
}
.hb-kd6-item:first-child { border-top: 1px solid #ececf0; }
.hb-kd6-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  bottom: -1px;
  width: 2px;
  background: var(--hb-kd6-accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd6-item[data-open="true"]::before { transform: scaleY(1); }
.hb-kd6-h { margin: 0; font: inherit; }
.hb-kd6-trigger {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 24px 4px 24px 20px;
  border: 0;
  background: transparent;
  color: #111114;
  font: inherit;
  font-size: 17px;
  font-weight: 550;
  line-height: 1.35;
  letter-spacing: -.01em;
  text-align: left;
  cursor: pointer;
}
.hb-kd6-trigger:focus-visible { outline: 2px solid var(--hb-kd6-accent); outline-offset: -2px; border-radius: 10px; }
.hb-kd6-num {
  color: #a1a1aa;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  transition: color .3s ease;
}
.hb-kd6-item[data-open="true"] .hb-kd6-num, .hb-kd6-trigger:hover .hb-kd6-num { color: var(--hb-kd6-accent); }
.hb-kd6-plus {
  position: relative;
  justify-self: end;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f2f2f5;
  transition: background-color .3s ease, transform .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd6-plus::before, .hb-kd6-plus::after {
  content: "";
  position: absolute;
  left: 9px;
  top: 13.25px;
  width: 10px;
  height: 1.5px;
  border-radius: 2px;
  background: #3f3f46;
  transition: transform .45s cubic-bezier(.2, .8, .2, 1), background-color .3s ease;
}
.hb-kd6-plus::after { transform: rotate(90deg); }
.hb-kd6-trigger:hover .hb-kd6-plus { background: #e9e9ee; }
.hb-kd6-item[data-open="true"] .hb-kd6-plus { background: var(--hb-kd6-accent); transform: rotate(180deg); }
.hb-kd6-item[data-open="true"] .hb-kd6-plus::before, .hb-kd6-item[data-open="true"] .hb-kd6-plus::after { background: #fff; }
.hb-kd6-item[data-open="true"] .hb-kd6-plus::after { transform: rotate(0deg); }
.hb-kd6-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1), visibility 0s linear .45s;
}
.hb-kd6-item[data-open="true"] .hb-kd6-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1), visibility 0s linear 0s;
}
.hb-kd6-clip { min-height: 0; overflow: hidden; }
.hb-kd6-a {
  padding: 0 40px 26px 72px;
  color: #52525b;
  font-size: 15.5px;
  line-height: 1.65;
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-kd6-item[data-open="true"] .hb-kd6-a { opacity: 1; transition-delay: .1s; }
@container (max-width: 860px) {
  .hb-kd6-in { grid-template-columns: minmax(0, 1fr); gap: 40px; padding: 72px 20px 80px; }
  .hb-kd6-side { position: static; }
  .hb-kd6-sub { max-width: 520px; }
  .hb-kd6-card { max-width: 480px; }
}
@container (max-width: 480px) {
  .hb-kd6-trigger { grid-template-columns: 32px minmax(0, 1fr) 28px; padding: 20px 0 20px 12px; font-size: 16px; }
  .hb-kd6-a { padding: 0 8px 22px 52px; font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd6-panel, .hb-kd6-item[data-open="true"] .hb-kd6-panel, .hb-kd6-a, .hb-kd6-plus, .hb-kd6-plus::before, .hb-kd6-plus::after, .hb-kd6-item::before, .hb-kd6-btn, .hb-kd6-btn svg { transition: none; }
  .hb-kd6-status i::after { animation: none; }
  .hb-kd6-btn:hover { transform: none; }
}
`;

const defaultItems: FaqTwoColumnItem[] = [
  { question: "How long does it take to get set up?", answer: "Most teams connect their calendar and send the first booking link in under ten minutes. Importing past appointments from another tool takes about an hour, and we can do it for you on any paid plan." },
  { question: "Can clients book without creating an account?", answer: "Yes. Clients pick a time, enter their name and email, and get a confirmation with a calendar invite. Returning clients are recognized by email, so their history stays in one place." },
  { question: "Which calendars and video tools do you support?", answer: "Google Calendar, Outlook and iCloud sync both ways in real time. Zoom, Google Meet and Microsoft Teams links are created automatically for every booking." },
  { question: "How do payments and deposits work?", answer: "Connect Stripe to collect full payments or a deposit at booking. Payouts arrive on your usual Stripe schedule, and we never add a fee on top of Stripe's own." },
  { question: "What happens if a client cancels late?", answer: "You set the rules. Charge a cancellation fee, keep the deposit, or allow free rescheduling up to a cutoff you choose. Clients see the policy before they confirm." },
  { question: "Is there a discount for nonprofits and schools?", answer: "Registered nonprofits and accredited schools get 40% off every plan. Send us proof of status from your workspace settings and the discount applies to your next invoice." },
];

const faces = [
  "linear-gradient(135deg, #6366f1, #a855f7)",
  "linear-gradient(135deg, #f97316, #ec4899)",
  "linear-gradient(135deg, #14b8a6, #3b82f6)",
  "linear-gradient(135deg, #eab308, #f97316)",
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function FaqTwoColumn({
  eyebrow = "FAQ",
  title = "Questions, answered",
  subtitle = "Everything about booking, payments and calendars. If something is missing, our support team is one message away.",
  items = defaultItems,
  support = {
    title: "Talk to a real person",
    text: "Our support team in Lisbon and Austin replies in about two hours, seven days a week.",
    people: ["Inês Rocha", "Caleb Hart", "Mei Lin"],
    status: "Online now",
  },
  contact = { label: "Contact support", href: "#contact" },
  secondary = { label: "Help center", href: "#help" },
  accent = "#4f46e5",
  defaultOpen = 0,
  onOpenChange,
  className = "",
  style,
  ...rest
}: FaqTwoColumnProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState(defaultOpen);
  const vars = { "--hb-kd6-accent": accent, ...style } as React.CSSProperties;
  const focusTrigger = (index: number) => {
    const el = document.getElementById(`${uid}-q${index}`);
    el?.focus();
  };

  return (
    <section className={`hb-kd6 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-faq-two-column" precedence="default">{css}</style>
      <div className="hb-kd6-in">
        <div className="hb-kd6-side">
          {eyebrow && <p className="hb-kd6-eyebrow">{eyebrow}</p>}
          <h2 id={`${uid}-t`} className="hb-kd6-title">{title}</h2>
          {subtitle && <p className="hb-kd6-sub">{subtitle}</p>}
          {(support || contact || secondary) && (
            <div className="hb-kd6-card">
              {support && (
                <>
                  {(support.people?.length || support.status) && (
                    <div className="hb-kd6-people">
                      {support.people?.slice(0, 4).map((name, i) => (
                        <span key={name} className="hb-kd6-face" style={{ background: faces[i % faces.length] }} title={name} aria-hidden="true">
                          {initialsOf(name)}
                        </span>
                      ))}
                      {support.status && (
                        <span className="hb-kd6-status">
                          <i aria-hidden="true" />
                          {support.status}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="hb-kd6-card-title">{support.title}</p>
                  <p className="hb-kd6-card-text">{support.text}</p>
                </>
              )}
              {(contact || secondary) && (
                <div className="hb-kd6-ctas">
                  {contact && (
                    <a className="hb-kd6-btn" href={contact.href}>
                      {contact.label}
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </a>
                  )}
                  {secondary && (
                    <a className="hb-kd6-btn" data-ghost="true" href={secondary.href}>
                      {secondary.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <ol className="hb-kd6-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            const tid = `${uid}-q${i}`;
            const pid = `${uid}-a${i}`;
            return (
              <li key={`${item.question}-${i}`} className="hb-kd6-item" data-open={isOpen ? "true" : "false"}>
                <h3 className="hb-kd6-h">
                  <button
                    id={tid}
                    type="button"
                    className="hb-kd6-trigger"
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => {
                      const next = isOpen ? -1 : i;
                      setOpen(next);
                      onOpenChange?.(next);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        focusTrigger((i + 1) % items.length);
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        focusTrigger((i - 1 + items.length) % items.length);
                      } else if (e.key === "Home") {
                        e.preventDefault();
                        focusTrigger(0);
                      } else if (e.key === "End") {
                        e.preventDefault();
                        focusTrigger(items.length - 1);
                      }
                    }}
                  >
                    <span className="hb-kd6-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item.question}</span>
                    <span className="hb-kd6-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={pid} className="hb-kd6-panel" role="region" aria-labelledby={tid}>
                  <div className="hb-kd6-clip">
                    <div className="hb-kd6-a">{item.answer}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

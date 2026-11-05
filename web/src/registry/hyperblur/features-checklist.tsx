"use client";

import * as React from "react";

export interface ChecklistItem {
  title: string;
  detail?: string;
}

export interface ChecklistSummary {
  label: string;
  value: string;
  caption?: string;
  stats?: { label: string; value: string }[];
  cta?: { label: string; href: string };
  note?: string;
}

export interface FeaturesChecklistProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  items?: ChecklistItem[];
  summary?: ChecklistSummary | null;
  accent?: string;
}

const css = `
.hb-ka4 {
  --hb-ka4-accent: #e5533d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #1a1a1a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka4 *, .hb-ka4 *::before, .hb-ka4 *::after { box-sizing: border-box; }
.hb-ka4-wrap { max-width: 1120px; margin: 0 auto; padding: 80px 24px 112px; }
.hb-ka4-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
  align-items: end;
  gap: 24px 64px;
  margin-bottom: 56px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e3dfd4;
}
.hb-ka4-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: #6b675e;
  font-size: 13px;
  font-weight: 500;
}
.hb-ka4-eyebrow::before { content: ""; width: 20px; height: 1px; background: var(--hb-ka4-accent); }
.hb-ka4-title {
  margin: 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(40px, 6.4cqw, 72px);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.hb-ka4-title em { font-style: normal; color: var(--hb-ka4-accent); }
.hb-ka4-sub { margin: 0; color: #6b675e; font-size: 16px; line-height: 1.6; }
.hb-ka4-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 320px);
  align-items: start;
  gap: 64px;
}
.hb-ka4-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ka4-item {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 14px;
  padding: 20px 0;
  border-top: 1px solid #e3dfd4;
}
.hb-ka4-ico { width: 28px; height: 28px; }
.hb-ka4-ring {
  fill: none;
  stroke: var(--hb-ka4-accent);
  stroke-width: 1.6;
  stroke-dasharray: 76;
  stroke-dashoffset: 76;
  transform: rotate(-90deg);
  transform-origin: 14px 14px;
  transition: stroke-dashoffset .7s cubic-bezier(.65, 0, .35, 1);
  transition-delay: var(--hb-ka4-d, 0s);
}
.hb-ka4-bg { fill: color-mix(in srgb, var(--hb-ka4-accent) 9%, transparent); opacity: 0; transition: opacity .5s ease; transition-delay: var(--hb-ka4-d, 0s); }
.hb-ka4-mark {
  fill: none;
  stroke: var(--hb-ka4-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
  transition: stroke-dashoffset .35s cubic-bezier(.65, 0, .35, 1);
  transition-delay: calc(var(--hb-ka4-d, 0s) + .5s);
}
.hb-ka4-text { opacity: .35; transition: opacity .6s ease; transition-delay: calc(var(--hb-ka4-d, 0s) + .3s); }
.hb-ka4[data-in="true"] .hb-ka4-ring, .hb-ka4[data-in="true"] .hb-ka4-mark { stroke-dashoffset: 0; }
.hb-ka4[data-in="true"] .hb-ka4-bg, .hb-ka4[data-in="true"] .hb-ka4-text { opacity: 1; }
.hb-ka4-item-title { margin: 3px 0 0; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
.hb-ka4-item-detail { margin: 5px 0 0; color: #6b675e; font-size: 14px; line-height: 1.55; }
.hb-ka4-aside { position: sticky; top: 24px; }
.hb-ka4-card {
  position: relative;
  padding: 28px 26px 24px;
  border: 1px solid #e6e1d6;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .9) inset, 0 1px 2px rgba(40, 30, 10, .06), 0 12px 28px -12px rgba(40, 30, 10, .18), 0 40px 60px -40px rgba(40, 30, 10, .25);
  transform: rotate(-1.2deg);
  transition: transform .5s cubic-bezier(.2, .8, .2, 1), box-shadow .5s ease;
}
.hb-ka4-card:hover { transform: rotate(0deg) translateY(-2px); }
.hb-ka4-card::before {
  content: "";
  position: absolute;
  top: -11px;
  left: 50%;
  width: 92px;
  height: 22px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--hb-ka4-accent) 22%, rgba(255, 248, 230, .7));
  box-shadow: 0 1px 2px rgba(40, 30, 10, .08);
  transform: translateX(-50%) rotate(2deg);
}
.hb-ka4-label { margin: 0; color: #6b675e; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-ka4-value {
  margin: 10px 0 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 64px;
  font-weight: 400;
  line-height: .95;
  letter-spacing: -.02em;
}
.hb-ka4-caption { margin: 8px 0 0; color: #6b675e; font-size: 14px; line-height: 1.5; }
.hb-ka4-stats { margin: 22px 0 0; padding: 0; list-style: none; border-top: 1px dashed #e3dfd4; }
.hb-ka4-stats li { display: flex; justify-content: space-between; gap: 12px; padding: 11px 0; border-bottom: 1px dashed #e3dfd4; font-size: 14px; color: #4a4740; }
.hb-ka4-stats b { color: #1a1a1a; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ka4-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  margin-top: 22px;
  border-radius: 999px;
  background: #1a1a1a;
  color: #f7f5ef;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background .2s ease, transform .2s ease;
}
.hb-ka4-cta:hover { background: #000; }
.hb-ka4-cta:active { transform: scale(.98); }
.hb-ka4-cta:focus-visible { outline: 2px solid var(--hb-ka4-accent); outline-offset: 3px; }
.hb-ka4-note { margin: 10px 0 0; color: #8a857a; font-size: 12px; text-align: center; }
@container (max-width: 900px) {
  .hb-ka4-body { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .hb-ka4-aside { position: static; max-width: 420px; }
  .hb-ka4-head { grid-template-columns: minmax(0, 1fr); }
}
@container (max-width: 560px) {
  .hb-ka4-wrap { padding: 64px 16px 80px; }
  .hb-ka4-head { margin-bottom: 32px; padding-bottom: 28px; }
  .hb-ka4-list { grid-template-columns: minmax(0, 1fr); }
  .hb-ka4-item { padding: 16px 0; }
  .hb-ka4-card { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka4-ring, .hb-ka4-mark, .hb-ka4-bg, .hb-ka4-text, .hb-ka4-card, .hb-ka4-cta { transition: none; }
  .hb-ka4-ring, .hb-ka4-mark { stroke-dashoffset: 0; }
  .hb-ka4-bg, .hb-ka4-text { opacity: 1; }
}
`;

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

const defaultItems: ChecklistItem[] = [
  { title: "Bank feeds from 11,000 banks", detail: "Transactions arrive every morning, matched to receipts before you open the app." },
  { title: "Receipts by email or photo", detail: "Forward a receipt or snap it. Totals, tax and vendor are filled in for you." },
  { title: "Approvals that follow the money", detail: "Route spend over $2,500 to a second approver, everything else straight through." },
  { title: "Multi-entity books", detail: "Run three companies in three currencies from one login, with clean consolidation." },
  { title: "Month-end close checklist", detail: "Recurring tasks, owners and due dates, with a sign-off trail for your auditor." },
  { title: "Corporate cards with limits", detail: "Physical and virtual cards with per-merchant limits and instant freeze." },
  { title: "Sales tax in 46 states", detail: "Rates update automatically and filings are prepared on schedule." },
  { title: "Exports your accountant likes", detail: "Clean CSV, PDF and general ledger exports, mapped to your chart of accounts." },
];

const defaultSummary: ChecklistSummary = {
  label: "Average Tally customer",
  value: "3.1 days",
  caption: "to close the month, down from nine before switching.",
  stats: [
    { label: "Tools replaced", value: "6" },
    { label: "Hours saved per month", value: "42" },
    { label: "Duplicate payments caught", value: "$18,400" },
  ],
  cta: { label: "Start a 14-day trial", href: "#" },
  note: "No card required. Cancel anytime.",
};

export function FeaturesChecklist({
  eyebrow = "Included on every plan",
  title = "Everything a lean finance team needs.",
  titleAccent = "Nothing it doesn't.",
  subtitle = "Tally replaces the spreadsheet, the expense app and the late-night reconciliation with one calm workspace.",
  items = defaultItems,
  summary = defaultSummary,
  accent = "#e5533d",
  className = "",
  style,
  ...rest
}: FeaturesChecklistProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLElement>(null);
  const seen = useInView(ref);
  const vars = { "--hb-ka4-accent": accent, ...style } as React.CSSProperties;

  return (
    <section ref={ref} className={`hb-ka4 ${className}`} style={vars} data-in={seen} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-features-checklist" precedence="default">{css}</style>
      <div className="hb-ka4-wrap">
        <header className="hb-ka4-head">
          <div>
            {eyebrow && <p className="hb-ka4-eyebrow">{eyebrow}</p>}
            <h2 id={`${uid}-t`} className="hb-ka4-title">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <em>{titleAccent}</em>
                </>
              )}
            </h2>
          </div>
          {subtitle && <p className="hb-ka4-sub">{subtitle}</p>}
        </header>
        <div className="hb-ka4-body">
          <ul className="hb-ka4-list">
            {items.map((item, i) => (
                <li key={`${item.title}-${i}`} className="hb-ka4-item" style={{ "--hb-ka4-d": `${(0.15 + i * 0.14).toFixed(2)}s` } as React.CSSProperties}>
                  <svg className="hb-ka4-ico" viewBox="0 0 28 28" aria-hidden="true">
                    <circle className="hb-ka4-bg" cx="14" cy="14" r="12" />
                    <circle className="hb-ka4-ring" cx="14" cy="14" r="12" />
                    <path className="hb-ka4-mark" d="M9 14.4l3.3 3.2L19 10.8" />
                  </svg>
                  <div className="hb-ka4-text">
                    <h3 className="hb-ka4-item-title">{item.title}</h3>
                    {item.detail && <p className="hb-ka4-item-detail">{item.detail}</p>}
                  </div>
                </li>
            ))}
          </ul>
          {summary && (
            <aside className="hb-ka4-aside" aria-label={summary.label}>
              <div className="hb-ka4-card">
                <p className="hb-ka4-label">{summary.label}</p>
                <p className="hb-ka4-value">{summary.value}</p>
                {summary.caption && <p className="hb-ka4-caption">{summary.caption}</p>}
                {summary.stats && summary.stats.length > 0 && (
                  <ul className="hb-ka4-stats">
                    {summary.stats.map((s) => (
                      <li key={s.label}>
                        <span>{s.label}</span>
                        <b>{s.value}</b>
                      </li>
                    ))}
                  </ul>
                )}
                {summary.cta && (
                  <a className="hb-ka4-cta" href={summary.cta.href}>
                    {summary.cta.label}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                {summary.note && <p className="hb-ka4-note">{summary.note}</p>}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

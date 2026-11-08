"use client";

import * as React from "react";

export type PricingMatrixValue = boolean | string;

export interface PricingMatrixPlan {
  name: string;
  price: number | null;
  note: string;
  cta: { label: string; href: string };
  highlight?: boolean;
}

export interface PricingMatrixGroup {
  label: string;
  rows: { label: string; values: PricingMatrixValue[] }[];
}

export interface PricingMatrixStickyProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  plans?: PricingMatrixPlan[];
  groups?: PricingMatrixGroup[];
  currency?: string;
  locale?: string;
  customLabel?: string;
  maxHeight?: number;
  diffOnly?: boolean;
  defaultDiffOnly?: boolean;
  onDiffOnlyChange?: (value: boolean) => void;
  diffLabel?: string;
  accent?: string;
}

const defaultPlans: PricingMatrixPlan[] = [
  { name: "Free", price: 0, note: "forever", cta: { label: "Sign up", href: "#" } },
  { name: "Plus", price: 10, note: "per seat / mo", cta: { label: "Try Plus", href: "#" } },
  { name: "Business", price: 22, note: "per seat / mo", cta: { label: "Try Business", href: "#" }, highlight: true },
  { name: "Enterprise", price: null, note: "billed yearly", cta: { label: "Contact sales", href: "#" } },
];

const defaultGroups: PricingMatrixGroup[] = [
  {
    label: "Workspace",
    rows: [
      { label: "Members", values: ["Up to 3", "Up to 50", "Unlimited", "Unlimited"] },
      { label: "Pages and docs", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "File uploads", values: ["5 MB", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "Page history", values: ["7 days", "30 days", "90 days", "Unlimited"] },
      { label: "Guests", values: ["10", "100", "250", "Custom"] },
    ],
  },
  {
    label: "Collaboration",
    rows: [
      { label: "Real-time editing", values: [true, true, true, true] },
      { label: "Comments and mentions", values: [true, true, true, true] },
      { label: "Private teamspaces", values: [false, false, true, true] },
      { label: "Bulk PDF export", values: [false, false, true, true] },
    ],
  },
  {
    label: "Security",
    rows: [
      { label: "Two-factor authentication", values: [true, true, true, true] },
      { label: "SAML single sign-on", values: [false, false, true, true] },
      { label: "SCIM user provisioning", values: [false, false, false, true] },
      { label: "Audit log", values: [false, false, false, true] },
      { label: "Data retention policies", values: [false, false, false, true] },
    ],
  },
  {
    label: "Support",
    rows: [
      { label: "Help center", values: [true, true, true, true] },
      { label: "Priority support", values: [false, false, true, true] },
      { label: "Dedicated success manager", values: [false, false, false, true] },
    ],
  },
];

const css = `
.hb-vh4 {
  --hb-vh4-accent: #2f7bff;
  --hb-vh4-p: 0;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh4 *, .hb-vh4 *::before, .hb-vh4 *::after { box-sizing: border-box; }
.hb-vh4-inner { max-width: 1080px; margin: 0 auto; padding: 56px 20px 64px; }
.hb-vh4-bar { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-vh4-title { margin: 0; font-size: clamp(26px, 4cqi, 38px); font-weight: 650; letter-spacing: -.03em; line-height: 1.1; }
.hb-vh4-sub { margin: 8px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.55; max-width: 480px; }
.hb-vh4-diff { display: inline-flex; align-items: center; gap: 10px; padding: 0; border: 0; background: none; color: #a1a1a1; font: inherit; font-size: 13.5px; cursor: pointer; }
.hb-vh4-diff-box { position: relative; width: 34px; height: 20px; border-radius: 999px; background: #232326; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08); transition: background-color .3s ease; }
.hb-vh4-diff-box::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 999px; background: #d4d4d8; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1); }
.hb-vh4-diff[aria-checked="true"] { color: #ededed; }
.hb-vh4-diff[aria-checked="true"] .hb-vh4-diff-box { background: var(--hb-vh4-accent); }
.hb-vh4-diff[aria-checked="true"] .hb-vh4-diff-box::after { transform: translateX(14px); background: #fff; }
.hb-vh4-diff:focus-visible { outline: none; }
.hb-vh4-diff:focus-visible .hb-vh4-diff-box { outline: 2px solid var(--hb-vh4-accent); outline-offset: 2px; }
.hb-vh4-scroll {
  position: relative;
  margin-top: 28px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: #0d0d0f;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2e transparent;
}
.hb-vh4-table { min-width: 680px; }
.hb-vh4-row { display: grid; grid-template-columns: minmax(170px, 1.35fr) repeat(var(--n), minmax(110px, 1fr)); }
.hb-vh4-head {
  position: sticky;
  top: 0;
  z-index: 3;
  background: color-mix(in srgb, #0d0d0f 88%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, calc(.04 + var(--hb-vh4-p) * .06));
  box-shadow: 0 calc(var(--hb-vh4-p) * 18px) 30px -18px rgba(0, 0, 0, calc(var(--hb-vh4-p) * .9));
}
.hb-vh4-corner { display: flex; align-items: flex-end; padding: 16px 18px; color: #6f6f6f; font-size: 12px; }
.hb-vh4-plan { position: relative; display: flex; flex-direction: column; padding: calc(22px - var(--hb-vh4-p) * 10px) 14px calc(18px - var(--hb-vh4-p) * 6px); }
.hb-vh4-pname { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.hb-vh4-pname i { width: 6px; height: 6px; border-radius: 999px; background: var(--hb-vh4-accent); font-style: normal; box-shadow: 0 0 8px var(--hb-vh4-accent); }
.hb-vh4-pprice { display: flex; align-items: baseline; gap: 5px; margin-top: calc(10px - var(--hb-vh4-p) * 8px); }
.hb-vh4-pprice strong { font-size: calc(30px - var(--hb-vh4-p) * 12px); font-weight: 650; letter-spacing: -.03em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-vh4-pprice span { color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-vh4-pcta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: calc(34px - var(--hb-vh4-p) * 6px);
  margin-top: calc(14px - var(--hb-vh4-p) * 6px);
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .2s ease, border-color .2s ease;
}
.hb-vh4-pcta:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .2); }
.hb-vh4-pcta:focus-visible { outline: 2px solid var(--hb-vh4-accent); outline-offset: 2px; }
.hb-vh4-plan[data-hl="true"] .hb-vh4-pcta { border-color: transparent; background: var(--hb-vh4-accent); color: #fff; }
.hb-vh4-col { position: relative; }
.hb-vh4-col[data-hl="true"] { background: color-mix(in srgb, var(--hb-vh4-accent) 6%, transparent); }
.hb-vh4-col[data-hover="true"] { background: rgba(255, 255, 255, .035); }
.hb-vh4-col[data-hl="true"][data-hover="true"] { background: color-mix(in srgb, var(--hb-vh4-accent) 10%, transparent); }
.hb-vh4-plan[data-hl="true"]::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--hb-vh4-accent); box-shadow: 0 0 14px var(--hb-vh4-accent); }
.hb-vh4-group { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1), opacity .3s ease; }
.hb-vh4-group[data-hidden="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-vh4-group > div { overflow: hidden; min-height: 0; }
.hb-vh4-glabel { padding: 22px 18px 8px; color: #6f6f6f; font-family: var(--font-mono), ui-monospace, monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
.hb-vh4-line { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1), opacity .25s ease; }
.hb-vh4-line[data-hidden="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-vh4-line > .hb-vh4-row { overflow: hidden; min-height: 0; }
.hb-vh4-line:hover .hb-vh4-cell, .hb-vh4-line:hover .hb-vh4-label { background-color: rgba(255, 255, 255, .02); }
.hb-vh4-label, .hb-vh4-cell { display: flex; align-items: center; min-height: 0; border-top: 1px solid rgba(255, 255, 255, .05); font-size: 13.5px; }
.hb-vh4-label { padding: 13px 18px; color: #b5b5b5; }
.hb-vh4-cell { justify-content: flex-start; padding: 13px 14px; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-vh4-cell svg { width: 16px; height: 16px; }
.hb-vh4-yes { color: var(--hb-vh4-accent); }
.hb-vh4-no { color: #3f3f46; }
.hb-vh4-empty { padding: 36px 18px; color: #6f6f6f; font-size: 13.5px; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh4 *, .hb-vh4 *::before, .hb-vh4 *::after { transition: none !important; }
}
`;

const yes = (
  <svg viewBox="0 0 16 16" className="hb-vh4-yes" role="img" aria-label="Included">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const no = (
  <svg viewBox="0 0 16 16" className="hb-vh4-no" role="img" aria-label="Not included">
    <path d="M4.5 8h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function PricingMatrixSticky({
  title = "Compare every feature",
  subtitle = "All the details in one place. Scroll the table and the plan headers stay with you.",
  plans = defaultPlans,
  groups = defaultGroups,
  currency = "USD",
  locale = "en-US",
  customLabel = "Custom",
  maxHeight = 560,
  diffOnly,
  defaultDiffOnly = false,
  onDiffOnlyChange,
  diffLabel = "Only show differences",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingMatrixStickyProps) {
  const [innerDiff, setInnerDiff] = React.useState(defaultDiffOnly);
  const [hover, setHover] = React.useState<number | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLElement>(null);
  const diff = diffOnly ?? innerDiff;

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  const onScroll = () => {
    const el = scrollRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    const p = Math.min(1, el.scrollTop / 90);
    root.style.setProperty("--hb-vh4-p", p.toFixed(3));
  };

  const toggleDiff = () => {
    const next = !diff;
    if (diffOnly === undefined) setInnerDiff(next);
    onDiffOnlyChange?.(next);
  };

  const same = (values: PricingMatrixValue[]) => values.every((v) => v === values[0]);
  const n = plans.length;
  const visibleCount = groups.reduce((s, g) => s + g.rows.filter((r) => !diff || !same(r.values)).length, 0);

  return (
    <section
      ref={rootRef}
      className={`hb-vh4 ${className}`}
      style={{ "--hb-vh4-accent": accent, "--n": n, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-pricing-matrix-sticky" precedence="default">{css}</style>
      <div className="hb-vh4-inner">
        <div className="hb-vh4-bar">
          <div>
            <h2 className="hb-vh4-title">{title}</h2>
            {subtitle ? <p className="hb-vh4-sub">{subtitle}</p> : null}
          </div>
          <button type="button" role="switch" aria-checked={diff} className="hb-vh4-diff" onClick={toggleDiff}>
            <span className="hb-vh4-diff-box" aria-hidden="true" />
            {diffLabel}
          </button>
        </div>
        <div
          ref={scrollRef}
          className="hb-vh4-scroll"
          style={{ maxHeight }}
          onScroll={onScroll}
          onPointerLeave={() => setHover(null)}
          tabIndex={0}
          role="region"
          aria-label={title}
        >
          <div className="hb-vh4-table" role="table" aria-label={title}>
            <div className="hb-vh4-head" role="rowgroup">
              <div className="hb-vh4-row" role="row">
                <div className="hb-vh4-corner" role="columnheader">{visibleCount} features</div>
                {plans.map((p, i) => (
                  <div
                    key={p.name}
                    role="columnheader"
                    className="hb-vh4-plan hb-vh4-col"
                    data-hl={p.highlight ? "true" : undefined}
                    data-hover={hover === i ? "true" : undefined}
                    onPointerEnter={() => setHover(i)}
                  >
                    <span className="hb-vh4-pname">{p.highlight ? <i aria-hidden="true" /> : null}{p.name}</span>
                    <span className="hb-vh4-pprice">
                      <strong>{p.price === null ? customLabel : money.format(p.price)}</strong>
                      <span>{p.note}</span>
                    </span>
                    <a className="hb-vh4-pcta" href={p.cta.href}>{p.cta.label}</a>
                  </div>
                ))}
              </div>
            </div>
            <div role="rowgroup">
              {groups.map((g) => {
                const hiddenGroup = diff && g.rows.every((r) => same(r.values));
                return (
                  <div key={g.label} className="hb-vh4-group" data-hidden={hiddenGroup ? "true" : undefined}>
                    <div>
                      <div className="hb-vh4-glabel" role="row">
                        <span role="rowheader">{g.label}</span>
                      </div>
                      {g.rows.map((r) => {
                        const hidden = diff && same(r.values);
                        return (
                          <div key={r.label} className="hb-vh4-line" data-hidden={hidden ? "true" : undefined} aria-hidden={hidden || undefined}>
                            <div className="hb-vh4-row" role="row">
                              <div className="hb-vh4-label" role="rowheader">{r.label}</div>
                              {r.values.map((v, i) => (
                                <div
                                  key={i}
                                  role="cell"
                                  className="hb-vh4-cell hb-vh4-col"
                                  data-hl={plans[i]?.highlight ? "true" : undefined}
                                  data-hover={hover === i ? "true" : undefined}
                                  onPointerEnter={() => setHover(i)}
                                >
                                  {v === true ? yes : v === false ? no : v}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {visibleCount === 0 ? <div className="hb-vh4-empty">Every plan includes the same features.</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

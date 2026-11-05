"use client";

import * as React from "react";

export type PricingTableBilling = "monthly" | "yearly";
export type PricingTableValue = boolean | string;

export interface PricingTablePlan {
  name: string;
  monthly: number | null;
  yearly: number | null;
  note: string;
  cta: { label: string; href: string };
  highlight?: boolean;
}

export interface PricingTableGroup {
  name: string;
  rows: { feature: string; hint?: string; values: PricingTableValue[] }[];
}

export interface PricingFeatureTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingTablePlan[];
  groups?: PricingTableGroup[];
  billing?: PricingTableBilling;
  defaultBilling?: PricingTableBilling;
  onBillingChange?: (billing: PricingTableBilling) => void;
  stickyTop?: number;
  currency?: string;
  accent?: string;
}

const defaultPlans: PricingTablePlan[] = [
  { name: "Hobby", monthly: 0, yearly: 0, note: "For side projects", cta: { label: "Start free", href: "#" } },
  { name: "Pro", monthly: 24, yearly: 19, note: "Per member", cta: { label: "Start trial", href: "#" }, highlight: true },
  { name: "Scale", monthly: 79, yearly: 63, note: "Per member", cta: { label: "Start trial", href: "#" } },
  { name: "Enterprise", monthly: null, yearly: null, note: "Annual contract", cta: { label: "Contact sales", href: "#" } },
];

const defaultGroups: PricingTableGroup[] = [
  {
    name: "Workspace",
    rows: [
      { feature: "Projects", values: ["3", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Members", values: ["1", "Up to 25", "Up to 200", "Unlimited"] },
      { feature: "File storage", hint: "Per workspace", values: ["2 GB", "100 GB", "1 TB", "Custom"] },
      { feature: "Version history", values: ["7 days", "90 days", "1 year", "Unlimited"] },
    ],
  },
  {
    name: "Collaboration",
    rows: [
      { feature: "Guest access", values: [false, true, true, true] },
      { feature: "Comments and mentions", values: [true, true, true, true] },
      { feature: "Approval flows", values: [false, false, true, true] },
      { feature: "Shared templates", values: [false, true, true, true] },
    ],
  },
  {
    name: "Security",
    rows: [
      { feature: "Two-factor authentication", values: [true, true, true, true] },
      { feature: "SAML single sign-on", values: [false, false, true, true] },
      { feature: "Audit log", values: [false, false, "30 days", "Unlimited"] },
      { feature: "Data residency", values: [false, false, false, true] },
    ],
  },
  {
    name: "Support",
    rows: [
      { feature: "Help center and community", values: [true, true, true, true] },
      { feature: "Response time", values: ["-", "24 hours", "4 hours", "1 hour"] },
      { feature: "Dedicated success manager", values: [false, false, false, true] },
    ],
  },
];

const css = `
.hb-yia {
  --hb-yia-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yia *, .hb-yia *::before, .hb-yia *::after { box-sizing: border-box; }
.hb-yia-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yia-head { display: grid; gap: 22px; align-items: end; margin-bottom: 36px; }
.hb-yia-eyebrow { margin: 0 0 12px; font-size: 13px; font-weight: 500; color: color-mix(in srgb, var(--hb-yia-accent) 60%, #fff); }
.hb-yia-title { margin: 0; font-size: clamp(30px, 4.6cqi, 48px); line-height: 1.05; letter-spacing: -.04em; font-weight: 600; }
.hb-yia-sub { margin: 12px 0 0; max-width: 460px; font-size: 15px; line-height: 1.6; color: #8f8f8f; }
.hb-yia-toggle { display: inline-flex; align-items: center; gap: 12px; justify-self: start; font-size: 14px; color: #8f8f8f; }
.hb-yia-switch {
  position: relative; width: 46px; height: 26px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .12); background: #1a1a1a; cursor: pointer; padding: 0;
  transition: background .25s, border-color .25s;
}
.hb-yia-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: #ededed; transition: transform .35s cubic-bezier(.3, 1.4, .5, 1); }
.hb-yia-switch[aria-checked="true"] { background: var(--hb-yia-accent); border-color: transparent; }
.hb-yia-switch[aria-checked="true"]::after { transform: translateX(20px); background: #fff; }
.hb-yia-switch:focus-visible, .hb-yia-tab:focus-visible, .hb-yia-gbtn:focus-visible, .hb-yia-cta:focus-visible { outline: 2px solid var(--hb-yia-accent); outline-offset: 2px; }
.hb-yia-toggle span[data-on="true"] { color: #ededed; }
.hb-yia-save { padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 500; color: #4ade80; background: rgba(74, 222, 128, .12); }
.hb-yia-tabs { display: flex; gap: 4px; padding: 4px; margin-bottom: 14px; border-radius: 12px; background: #111; border: 1px solid rgba(255, 255, 255, .08); }
.hb-yia-tab { flex: 1; height: 34px; border: 0; border-radius: 9px; background: transparent; color: #8f8f8f; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; }
.hb-yia-tab[aria-selected="true"] { background: #222; color: #fff; }
.hb-yia-table { --hb-yia-cols: 4; position: relative; border-radius: 20px; border: 1px solid rgba(255, 255, 255, .08); background: #0d0d0d; }
.hb-yia-row { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
.hb-yia-cell[data-sel="false"] { display: none; }
.hb-yia-sticky {
  position: sticky; top: var(--hb-yia-top, 0px); z-index: 2; border-radius: 20px 20px 0 0;
  background: rgba(13, 13, 13, .82); backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}
.hb-yia-corner { padding: 22px 20px; display: flex; align-items: flex-end; font-size: 13px; color: #6f6f6f; }
.hb-yia-plan { position: relative; padding: 22px 16px 18px; display: flex; flex-direction: column; gap: 4px; }
.hb-yia-plan[data-hl="true"]::before {
  content: ""; position: absolute; inset: 0 0 0 0; border-radius: 16px 16px 0 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-yia-accent) 18%, transparent), transparent);
  border-top: 2px solid var(--hb-yia-accent);
}
.hb-yia-plan > * { position: relative; }
.hb-yia-pname { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; }
.hb-yia-pop { padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; background: var(--hb-yia-accent); color: #fff; }
.hb-yia-amount { display: flex; align-items: baseline; gap: 4px; margin-top: 6px; perspective: 400px; }
.hb-yia-num { display: inline-block; font-size: 30px; line-height: 1; letter-spacing: -.04em; font-weight: 600; font-variant-numeric: tabular-nums; animation: hb-yia-flip .55s cubic-bezier(.2, .9, .25, 1) both; transform-origin: 50% 0; }
.hb-yia-unit { font-size: 13px; color: #8f8f8f; }
.hb-yia-note { font-size: 12px; color: #6f6f6f; }
.hb-yia-cta {
  display: inline-flex; align-items: center; justify-content: center; height: 36px; margin-top: 12px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none;
  color: #ededed; border: 1px solid rgba(255, 255, 255, .14); background: rgba(255, 255, 255, .02); transition: background .2s, border-color .2s, transform .2s;
}
.hb-yia-cta:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .25); }
.hb-yia-plan[data-hl="true"] .hb-yia-cta { background: var(--hb-yia-accent); border-color: transparent; color: #fff; box-shadow: 0 10px 24px -12px var(--hb-yia-accent); }
.hb-yia-plan[data-hl="true"] .hb-yia-cta:hover { transform: translateY(-1px); }
.hb-yia-group + .hb-yia-group { border-top: 1px solid rgba(255, 255, 255, .06); }
.hb-yia-gbtn {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 18px 20px 10px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px;
  font-weight: 600; letter-spacing: .04em; text-transform: uppercase; cursor: pointer; text-align: left;
}
.hb-yia-gbtn svg { width: 14px; height: 14px; color: #6f6f6f; transition: transform .3s cubic-bezier(.3, 1.3, .5, 1); }
.hb-yia-gbtn[aria-expanded="false"] svg { transform: rotate(-90deg); }
.hb-yia-gbtn small { margin-left: auto; font-size: 12px; font-weight: 400; letter-spacing: 0; text-transform: none; color: #5f5f5f; }
.hb-yia-rows { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1); }
.hb-yia-rows[data-open="false"] { grid-template-rows: 0fr; }
.hb-yia-rows > div { overflow: hidden; min-height: 0; }
.hb-yia-frow { transition: background .2s; animation: hb-yia-row .5s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yia-i) * 35ms); }
.hb-yia-frow:hover { background: rgba(255, 255, 255, .025); }
.hb-yia-frow > div { padding: 13px 16px; font-size: 14px; display: flex; align-items: center; border-top: 1px solid rgba(255, 255, 255, .045); }
.hb-yia-frow > div:first-child { padding-left: 20px; color: #c9c9c9; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; }
.hb-yia-frow small { font-size: 12px; color: #5f5f5f; }
.hb-yia-frow > div[data-hl="true"] { background: color-mix(in srgb, var(--hb-yia-accent) 5%, transparent); }
.hb-yia-yes { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: color-mix(in srgb, var(--hb-yia-accent) 18%, transparent); color: color-mix(in srgb, var(--hb-yia-accent) 50%, #fff); }
.hb-yia-yes svg { width: 12px; height: 12px; }
.hb-yia-no { width: 12px; height: 1.5px; border-radius: 1px; background: #3a3a3a; }
.hb-yia-txt { color: #ededed; font-variant-numeric: tabular-nums; }
.hb-yia-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yia-flip { from { opacity: 0; transform: rotateX(-80deg); } to { opacity: 1; transform: none; } }
@keyframes hb-yia-row { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@container (min-width: 720px) {
  .hb-yia-inner { padding: 104px 32px 112px; }
  .hb-yia-head { grid-template-columns: minmax(0, 1fr) auto; }
  .hb-yia-toggle { justify-self: end; }
  .hb-yia-tabs { display: none; }
  .hb-yia-row { grid-template-columns: minmax(0, 1.4fr) repeat(var(--hb-yia-cols), minmax(0, 1fr)); }
  .hb-yia-cell[data-sel="false"] { display: flex; }
  .hb-yia-sticky .hb-yia-cell[data-sel="false"] { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yia-num, .hb-yia-frow { animation: none; }
  .hb-yia-rows, .hb-yia-gbtn svg, .hb-yia-switch, .hb-yia-switch::after, .hb-yia-cta { transition: none; }
}
`;

function Value({ v }: { v: PricingTableValue }) {
  if (v === true) {
    return (
      <span className="hb-yia-yes">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span className="hb-yia-sr">Included</span>
      </span>
    );
  }
  if (v === false) {
    return (
      <span className="hb-yia-no">
        <span className="hb-yia-sr">Not included</span>
      </span>
    );
  }
  return <span className="hb-yia-txt">{v}</span>;
}

export function PricingFeatureTable({
  eyebrow = "Compare plans",
  title = "Every feature, side by side.",
  subtitle = "All plans include unlimited viewers, real-time sync and a 99.9 percent uptime commitment.",
  plans = defaultPlans,
  groups = defaultGroups,
  billing,
  defaultBilling = "yearly",
  onBillingChange,
  stickyTop = 0,
  currency = "$",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingFeatureTableProps) {
  const [innerBilling, setInnerBilling] = React.useState<PricingTableBilling>(defaultBilling);
  const [closed, setClosed] = React.useState<string[]>([]);
  const [pick, setPick] = React.useState(() => Math.max(0, plans.findIndex((p) => p.highlight)));
  const mode = billing ?? innerBilling;
  const id = React.useId();

  const setMode = (m: PricingTableBilling) => {
    if (billing === undefined) setInnerBilling(m);
    onBillingChange?.(m);
  };

  const savings = plans.reduce((best, p) => {
    if (!p.monthly || p.yearly === null) return best;
    return Math.max(best, Math.round((1 - p.yearly / p.monthly) * 100));
  }, 0);

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (pick + (e.key === "ArrowRight" ? 1 : -1) + plans.length) % plans.length;
    setPick(next);
    const el = document.getElementById(`${id}-tab-${next}`);
    el?.focus();
  };

  let rowIndex = 0;
  const vars = { "--hb-yia-accent": accent, "--hb-yia-top": `${stickyTop}px`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yia ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-feature-table" precedence="default">{css}</style>
      <div className="hb-yia-inner">
        <div className="hb-yia-head">
          <div>
            {eyebrow ? <p className="hb-yia-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yia-title">{title}</h2>
            {subtitle ? <p className="hb-yia-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-yia-toggle">
            <span data-on={mode === "monthly"} id={`${id}-m`}>Monthly</span>
            <button
              type="button"
              role="switch"
              className="hb-yia-switch"
              aria-checked={mode === "yearly"}
              aria-label="Bill yearly"
              onClick={() => setMode(mode === "yearly" ? "monthly" : "yearly")}
            />
            <span data-on={mode === "yearly"}>Yearly</span>
            {savings ? <span className="hb-yia-save">{`Save up to ${savings}%`}</span> : null}
          </div>
        </div>

        <div className="hb-yia-tabs" role="tablist" aria-label="Plan">
          {plans.map((p, i) => (
            <button
              key={p.name}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              className="hb-yia-tab"
              aria-selected={pick === i}
              tabIndex={pick === i ? 0 : -1}
              onClick={() => setPick(i)}
              onKeyDown={onTabKey}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="hb-yia-table" style={{ "--hb-yia-cols": plans.length } as React.CSSProperties} role="table" aria-label="Plan comparison">
          <div className="hb-yia-row hb-yia-sticky" role="row">
            <div className="hb-yia-corner" role="columnheader">
              {mode === "yearly" ? "Prices per month, billed yearly" : "Prices per month"}
            </div>
            {plans.map((p, i) => {
              const price = mode === "yearly" ? p.yearly : p.monthly;
              return (
                <div key={p.name} className="hb-yia-plan hb-yia-cell" data-sel={pick === i} data-hl={!!p.highlight} role="columnheader">
                  <span className="hb-yia-pname">
                    {p.name}
                    {p.highlight ? <span className="hb-yia-pop">Popular</span> : null}
                  </span>
                  <span className="hb-yia-amount">
                    <span key={`${mode}-${p.name}`} className="hb-yia-num">
                      {price === null ? "Custom" : `${currency}${price}`}
                    </span>
                    {price !== null && price > 0 ? <span className="hb-yia-unit">/mo</span> : null}
                  </span>
                  <span className="hb-yia-note">{p.note}</span>
                  <a className="hb-yia-cta" href={p.cta.href}>
                    {p.cta.label}
                  </a>
                </div>
              );
            })}
          </div>

          {groups.map((g) => {
            const open = !closed.includes(g.name);
            const panelId = `${id}-${g.name.replace(/\s+/g, "-")}`;
            return (
              <div key={g.name} className="hb-yia-group" role="rowgroup">
                <div role="row">
                  <div role="rowheader">
                    <button
                      type="button"
                      className="hb-yia-gbtn"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setClosed((c) => (open ? [...c, g.name] : c.filter((x) => x !== g.name)))}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                      {g.name}
                      <small>{`${g.rows.length} features`}</small>
                    </button>
                  </div>
                </div>
                <div className="hb-yia-rows" data-open={open} id={panelId}>
                  <div>
                    {g.rows.map((r) => {
                      const i = rowIndex++;
                      return (
                        <div key={r.feature} className="hb-yia-row hb-yia-frow" role="row" style={{ "--hb-yia-i": i } as React.CSSProperties}>
                          <div role="rowheader">
                            {r.feature}
                            {r.hint ? <small>{r.hint}</small> : null}
                          </div>
                          {plans.map((p, c) => (
                            <div key={p.name} className="hb-yia-cell" data-sel={pick === c} data-hl={!!p.highlight} role="cell">
                              <Value v={r.values[c] ?? false} />
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

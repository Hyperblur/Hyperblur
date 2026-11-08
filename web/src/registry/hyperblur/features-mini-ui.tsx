"use client";

import * as React from "react";

export interface FeaturesMiniUiTransaction {
  merchant: string;
  amount: number;
  date: string;
}

export interface FeaturesMiniUiProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  spent?: number;
  defaultLimit?: number;
  transactions?: FeaturesMiniUiTransaction[];
  cardholder?: string;
  currency?: string;
  locale?: string;
  accent?: string;
  onLimitChange?: (value: number) => void;
  onFreezeChange?: (frozen: boolean) => void;
}

const css = `
@keyframes hb-wa5-rise { from { opacity: 0; transform: translate3d(0, 16px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa5-frost { from { opacity: 0; backdrop-filter: blur(0); } to { opacity: 1; backdrop-filter: blur(3px); } }
@keyframes hb-wa5-flake { from { transform: translateY(-8px) rotate(0); opacity: 0; } 30% { opacity: 1; } to { transform: translateY(70px) rotate(120deg); opacity: 0; } }
@keyframes hb-wa5-check { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wa5-bump { 40% { transform: scale(1.18); } }
.hb-wa5 {
  --hb-wa5-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa5 *, .hb-wa5 *::before, .hb-wa5 *::after { box-sizing: border-box; }
.hb-wa5 em, .hb-wa5 i { font-style: normal; }
.hb-wa5-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa5-head { max-width: 640px; margin-bottom: clamp(26px, 4cqi, 44px); }
.hb-wa5-eyebrow { margin: 0 0 12px; color: var(--hb-wa5-accent); font-size: 13px; font-weight: 600; }
.hb-wa5-title { margin: 0; font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa5-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-wa5-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
.hb-wa5-card { display: flex; flex-direction: column; min-width: 0; border: 1px solid rgba(255, 255, 255, .08); border-radius: 20px; background: linear-gradient(180deg, #131313, #0f0f0f); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05); animation: hb-wa5-rise .6s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--i) * 90ms); }
.hb-wa5-card:nth-child(1) { grid-column: span 4; }
.hb-wa5-card:nth-child(2) { grid-column: span 2; }
.hb-wa5-card:nth-child(3) { grid-column: span 2; }
.hb-wa5-card:nth-child(4) { grid-column: span 4; }
.hb-wa5-ui { flex: 1; padding: 18px; }
.hb-wa5-cap { padding: 14px 18px 18px; border-top: 1px solid rgba(255, 255, 255, .06); }
.hb-wa5-cap h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-wa5-cap p { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; line-height: 1.5; }
.hb-wa5-lim { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.hb-wa5-lim small { color: #8f8f8f; font-size: 12px; }
.hb-wa5-lim strong { font-family: var(--font-grotesk, inherit); font-size: 30px; font-weight: 600; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-wa5-meter { position: relative; height: 12px; margin: 14px 0 8px; overflow: hidden; border-radius: 6px; background: #1c1c1c; }
.hb-wa5-meter i { position: absolute; inset: 0 auto 0 0; width: var(--w); border-radius: 6px; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wa5-tone) 50%, #111), var(--hb-wa5-tone)); transition: width .45s cubic-bezier(.22, 1, .36, 1), background .3s ease; }
.hb-wa5-legend { display: flex; justify-content: space-between; color: #8f8f8f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-wa5-legend b { color: var(--hb-wa5-tone); font-weight: 600; transition: color .3s ease; }
.hb-wa5-range { width: 100%; margin: 18px 0 0; accent-color: var(--hb-wa5-accent); cursor: pointer; }
.hb-wa5-range:focus-visible { outline: 2px solid var(--hb-wa5-accent); outline-offset: 4px; border-radius: 4px; }
.hb-wa5-ticks { display: flex; justify-content: space-between; color: #5f5f5f; font-size: 11px; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wa5-rules { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-wa5-rule { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 0; color: #d4d4d4; font-size: 13px; }
.hb-wa5-sw { position: relative; flex: none; width: 36px; height: 22px; padding: 0; border: 0; border-radius: 999px; background: #262626; cursor: pointer; transition: background .25s ease; }
.hb-wa5-sw::after { content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, .4); transition: transform .3s cubic-bezier(.34, 1.56, .64, 1); }
.hb-wa5-sw[aria-checked="true"] { background: var(--hb-wa5-accent); }
.hb-wa5-sw[aria-checked="true"]::after { transform: translateX(14px); }
.hb-wa5-sw:focus-visible { outline: 2px solid var(--hb-wa5-accent); outline-offset: 2px; }
.hb-wa5-sum { margin-top: 10px; padding: 10px 12px; border-radius: 10px; background: color-mix(in srgb, var(--hb-wa5-accent) 9%, #111); color: #cfcfcf; font-size: 12.5px; line-height: 1.5; }
.hb-wa5-sum b { color: var(--hb-wa5-accent); font-weight: 600; }
.hb-wa5-vcard { position: relative; aspect-ratio: 1.586; overflow: hidden; padding: 14px; border-radius: 14px; background: linear-gradient(135deg, #0f3d2e, #064e3b 40%, #022c22); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 20px 30px -18px rgba(0, 0, 0, .9); color: #ecfdf5; display: flex; flex-direction: column; justify-content: space-between; transition: filter .5s ease; }
.hb-wa5-vcard::before { content: ""; position: absolute; inset: -40% -20% auto auto; width: 80%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(52, 211, 153, .35), transparent 70%); }
.hb-wa5-vcard[data-frozen="true"] { filter: saturate(.2) brightness(.9); }
.hb-wa5-chip { position: relative; width: 28px; height: 20px; border-radius: 5px; background: linear-gradient(135deg, #e5e7eb, #9ca3af); }
.hb-wa5-pan { position: relative; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .12em; }
.hb-wa5-name { position: relative; display: flex; justify-content: space-between; font-size: 10.5px; opacity: .8; }
.hb-wa5-frost { position: absolute; inset: 0; display: grid; place-items: center; background: linear-gradient(135deg, rgba(186, 230, 253, .35), rgba(224, 242, 254, .15)); animation: hb-wa5-frost .5s ease both; color: #e0f2fe; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.hb-wa5-frost i { position: absolute; top: 0; width: 6px; height: 6px; border-radius: 1px; background: #e0f2fe; animation: hb-wa5-flake 2.4s linear infinite; }
.hb-wa5-fbtn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 12px; padding: 9px 12px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 10px; background: #171717; color: #ededed; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s ease, border-color .2s ease; }
.hb-wa5-fbtn:hover { background: #1f1f1f; }
.hb-wa5-fbtn[aria-pressed="true"] { border-color: rgba(125, 211, 252, .5); color: #bae6fd; }
.hb-wa5-fbtn:focus-visible { outline: 2px solid var(--hb-wa5-accent); outline-offset: 2px; }
.hb-wa5-tx { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-wa5-txr { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto auto; align-items: center; gap: 12px; padding: 8px 10px; border: 1px solid rgba(255, 255, 255, .06); border-radius: 12px; background: #121212; transition: border-color .3s ease, background .3s ease; }
.hb-wa5-txr[data-done="true"] { border-color: color-mix(in srgb, var(--hb-wa5-accent) 30%, transparent); background: color-mix(in srgb, var(--hb-wa5-accent) 5%, #121212); }
.hb-wa5-logo { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; color: #0a0a0a; font-size: 11px; font-weight: 800; }
.hb-wa5-txr b { display: block; overflow: hidden; font-size: 13px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-wa5-txr small { color: #6f6f6f; font-size: 11.5px; }
.hb-wa5-amt { font-variant-numeric: tabular-nums; font-size: 13px; color: #d4d4d4; }
.hb-wa5-match { display: inline-flex; align-items: center; gap: 6px; min-width: 92px; justify-content: center; padding: 6px 10px; border: 1px dashed rgba(255, 255, 255, .18); border-radius: 8px; background: none; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; transition: all .25s ease; }
.hb-wa5-match:hover { color: #ededed; border-color: rgba(255, 255, 255, .35); }
.hb-wa5-match:focus-visible { outline: 2px solid var(--hb-wa5-accent); outline-offset: 2px; }
.hb-wa5-match[data-done="true"] { border-style: solid; border-color: transparent; background: color-mix(in srgb, var(--hb-wa5-accent) 16%, transparent); color: var(--hb-wa5-accent); }
.hb-wa5-match path { stroke-dasharray: 1; animation: hb-wa5-check .35s ease both; }
.hb-wa5-txh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; color: #8f8f8f; font-size: 12.5px; }
.hb-wa5-txh b { color: #ededed; font-variant-numeric: tabular-nums; }
.hb-wa5-txh b[data-bump="true"] { display: inline-block; animation: hb-wa5-bump .4s ease; }
@container (max-width: 820px) {
  .hb-wa5-card:nth-child(n) { grid-column: span 3; }
}
@container (max-width: 560px) {
  .hb-wa5-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-wa5-card:nth-child(n) { grid-column: auto; }
  .hb-wa5-txr { grid-template-columns: 30px minmax(0, 1fr) auto; }
  .hb-wa5-amt { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa5 *, .hb-wa5 *::before, .hb-wa5 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultTx: FeaturesMiniUiTransaction[] = [
  { merchant: "Northbeam Air", amount: 642.18, date: "Oct 28" },
  { merchant: "Copperleaf Hotel", amount: 389, date: "Oct 27" },
  { merchant: "Figtree Catering", amount: 1240.5, date: "Oct 24" },
];

const logoColors = ["#a7f3d0", "#fde68a", "#fbcfe8"];

const ruleDefs = [
  { id: "approvers", label: "Two approvers over $500" },
  { id: "receipts", label: "Receipt required within 3 days" },
  { id: "weekend", label: "Block weekend spend" },
];

export function FeaturesMiniUi({
  eyebrow = "Ledgerline for finance teams",
  title = "Controls you can feel, not settings you forget",
  subtitle = "Every card below is the real product. Drag the limit, flip a rule, freeze the card, match a receipt.",
  spent = 3180,
  defaultLimit = 5000,
  transactions = defaultTx,
  cardholder = "Priya Raman",
  currency = "USD",
  locale = "en-US",
  accent = "#34d399",
  onLimitChange,
  onFreezeChange,
  className,
  style,
  ...rest
}: FeaturesMiniUiProps) {
  const [limit, setLimit] = React.useState(defaultLimit);
  const [rules, setRules] = React.useState<Record<string, boolean>>({ approvers: true, receipts: true, weekend: false });
  const [frozen, setFrozen] = React.useState(false);
  const [matched, setMatched] = React.useState<boolean[]>(() => transactions.map((_, i) => i === 0));
  const [bump, setBump] = React.useState(0);

  const fmt = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }), [locale, currency]);
  const fmt2 = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);

  const ratio = Math.min(1, spent / limit);
  const tone = ratio > 0.9 ? "#f87171" : ratio > 0.75 ? "#fbbf24" : accent;
  const active = ruleDefs.filter((r) => rules[r.id]);
  const done = matched.filter(Boolean).length;

  const summary =
    active.length === 0 ? (
      <>No rules on. <b>Every purchase</b> goes straight through.</>
    ) : (
      <>
        <b>{active.length} of 3</b> rules on. {rules.approvers ? "Large purchases wait for two approvals" : "Purchases skip approval"}
        {rules.weekend ? " and weekend spend is blocked." : "."}
      </>
    );

  return (
    <section className={["hb-wa5", className].filter(Boolean).join(" ")} style={{ "--hb-wa5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-features-mini-ui" precedence="default">{css}</style>
      <div className="hb-wa5-in">
        <div className="hb-wa5-head">
          <p className="hb-wa5-eyebrow">{eyebrow}</p>
          <h2 className="hb-wa5-title">{title}</h2>
          <p className="hb-wa5-sub">{subtitle}</p>
        </div>
        <div className="hb-wa5-grid">
          <article className="hb-wa5-card" style={{ "--i": 0, "--hb-wa5-tone": tone } as React.CSSProperties}>
            <div className="hb-wa5-ui">
              <div className="hb-wa5-lim">
                <small>Design team · monthly limit</small>
                <strong>{fmt.format(limit)}</strong>
              </div>
              <div className="hb-wa5-meter" role="img" aria-label={`${fmt.format(spent)} spent of ${fmt.format(limit)}`}>
                <i style={{ "--w": `${(ratio * 100).toFixed(1)}%` } as React.CSSProperties} />
              </div>
              <div className="hb-wa5-legend">
                <span>{fmt.format(spent)} spent</span>
                <b>{ratio >= 1 ? "Over limit" : `${fmt.format(limit - spent)} left`}</b>
              </div>
              <input
                className="hb-wa5-range"
                type="range"
                min={2000}
                max={12000}
                step={250}
                value={limit}
                aria-label="Monthly limit"
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setLimit(v);
                  onLimitChange?.(v);
                }}
              />
              <div className="hb-wa5-ticks">
                <span>{fmt.format(2000)}</span>
                <span>{fmt.format(7000)}</span>
                <span>{fmt.format(12000)}</span>
              </div>
            </div>
            <div className="hb-wa5-cap">
              <h3>Spend limits that warn early</h3>
              <p>The bar turns amber at 75% and red at 90%, and the team lead hears about it before the card declines.</p>
            </div>
          </article>

          <article className="hb-wa5-card" style={{ "--i": 1 } as React.CSSProperties}>
            <div className="hb-wa5-ui">
              <ul className="hb-wa5-rules">
                {ruleDefs.map((r) => (
                  <li key={r.id} className="hb-wa5-rule">
                    <span id={`hb-wa5-${r.id}`}>{r.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={rules[r.id]}
                      aria-labelledby={`hb-wa5-${r.id}`}
                      className="hb-wa5-sw"
                      onClick={() => setRules((p) => ({ ...p, [r.id]: !p[r.id] }))}
                    />
                  </li>
                ))}
              </ul>
              <p className="hb-wa5-sum" aria-live="polite">{summary}</p>
            </div>
            <div className="hb-wa5-cap">
              <h3>Policies in plain English</h3>
              <p>Rules read like sentences, so finance and the team agree on them.</p>
            </div>
          </article>

          <article className="hb-wa5-card" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="hb-wa5-ui">
              <div className="hb-wa5-vcard" data-frozen={frozen}>
                <span className="hb-wa5-chip" />
                <span className="hb-wa5-pan">•••• 4821</span>
                <span className="hb-wa5-name">
                  <span>{cardholder}</span>
                  <span>09/29</span>
                </span>
                {frozen && (
                  <span className="hb-wa5-frost" aria-hidden="true">
                    Frozen
                    {[12, 30, 48, 66, 84].map((l, j) => (
                      <i key={l} style={{ left: `${l}%`, animationDelay: `${(j * 0.45).toFixed(2)}s` }} />
                    ))}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="hb-wa5-fbtn"
                aria-pressed={frozen}
                onClick={() => {
                  setFrozen((f) => !f);
                  onFreezeChange?.(!frozen);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1v14M2 4.5l12 7M14 4.5l-12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                {frozen ? "Unfreeze card" : "Freeze card"}
              </button>
            </div>
            <div className="hb-wa5-cap">
              <h3>Freeze in one tap</h3>
              <p>Lost card? Freeze it and unfreeze when it turns up.</p>
            </div>
          </article>

          <article className="hb-wa5-card" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="hb-wa5-ui">
              <div className="hb-wa5-txh">
                <span>Receipts this week</span>
                <span>
                  <b key={bump} data-bump={bump > 0}>{done}</b> of {transactions.length} matched
                </span>
              </div>
              <ul className="hb-wa5-tx">
                {transactions.map((t, i) => (
                  <li key={t.merchant} className="hb-wa5-txr" data-done={matched[i]}>
                    <span className="hb-wa5-logo" style={{ background: logoColors[i % logoColors.length] }}>{t.merchant.slice(0, 2).toUpperCase()}</span>
                    <span>
                      <b>{t.merchant}</b>
                      <small>{t.date}</small>
                    </span>
                    <span className="hb-wa5-amt">{fmt2.format(t.amount)}</span>
                    <button
                      type="button"
                      className="hb-wa5-match"
                      data-done={matched[i]}
                      aria-pressed={matched[i]}
                      onClick={() => {
                        setMatched((m) => m.map((v, j) => (j === i ? !v : v)));
                        setBump((b) => b + 1);
                      }}
                    >
                      {matched[i] ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} /></svg>
                          Matched
                        </>
                      ) : (
                        "Match receipt"
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hb-wa5-cap">
              <h3>Receipts that find their charge</h3>
              <p>Forward a photo and Ledgerline matches it by amount and merchant. You just confirm.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

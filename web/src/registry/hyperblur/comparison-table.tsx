"use client";

import * as React from "react";

export type ComparisonValue = boolean | string;

export interface ComparisonColumn {
  name: string;
  highlight?: boolean;
  note?: string;
}

export interface ComparisonGroup {
  name: string;
  rows: { label: string; values: ComparisonValue[] }[];
}

export interface ComparisonTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  columns?: ComparisonColumn[];
  groups?: ComparisonGroup[];
  stickyOffset?: number;
  cta?: { label: string; href: string } | null;
  secondaryCta?: { label: string; href: string } | null;
  accent?: string;
}

const defaultColumns: ComparisonColumn[] = [
  { name: "Relay", highlight: true, note: "Recommended" },
  { name: "Legacy CDN" },
  { name: "Build it yourself" },
];

const defaultGroups: ComparisonGroup[] = [
  {
    name: "Performance",
    rows: [
      { label: "Global edge locations", values: ["310", "84", "Up to you"] },
      { label: "Median cold start", values: ["4 ms", "240 ms", "1.2 s"] },
      { label: "On-the-fly image optimization", values: [true, true, false] },
      { label: "HTTP/3 and early hints", values: [true, false, "Partial"] },
    ],
  },
  {
    name: "Developer experience",
    rows: [
      { label: "Deploy on git push", values: [true, false, true] },
      { label: "Preview URL for every branch", values: [true, false, false] },
      { label: "One-click rollbacks", values: [true, "Manual", false] },
    ],
  },
  {
    name: "Security",
    rows: [
      { label: "Always-on DDoS mitigation", values: [true, true, false] },
      { label: "SOC 2 Type II report", values: [true, true, false] },
      { label: "Managed TLS certificates", values: [true, "Paid add-on", false] },
    ],
  },
];

const css = `
.hb-kc5 {
  --hb-kc5-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc5 *, .hb-kc5 *::before, .hb-kc5 *::after { box-sizing: border-box; }
.hb-kc5-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc5-head { display: grid; gap: 14px; margin-bottom: 36px; }
.hb-kc5-eyebrow { margin: 0; color: color-mix(in srgb, var(--hb-kc5-accent) 60%, #fff); font-size: 13px; font-weight: 600; letter-spacing: .04em; }
.hb-kc5-title { margin: 0; max-width: 620px; font-size: clamp(30px, 5cqi, 46px); font-weight: 650; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-kc5-sub { margin: 0; max-width: 440px; color: #8f8f8f; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc5-wrap { position: relative; display: none; }
.hb-kc5-glow {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--hb-kc5-left);
  width: var(--hb-kc5-width);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--hb-kc5-accent) 45%, transparent);
  border-radius: 18px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-kc5-accent) 14%, #0d0d0f), color-mix(in srgb, var(--hb-kc5-accent) 5%, #0d0d0f) 40%, #0d0d0f);
  box-shadow: 0 30px 80px -40px color-mix(in srgb, var(--hb-kc5-accent) 80%, transparent), inset 0 1px 0 rgba(255, 255, 255, .08);
  pointer-events: none;
}
.hb-kc5-glow::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -30%;
  height: 30%;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-kc5-accent) 22%, transparent), transparent);
  animation: hb-kc5-sweep 5.5s cubic-bezier(.45, 0, .55, 1) infinite;
}
.hb-kc5-table { position: relative; width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; font-size: 14px; }
.hb-kc5-table th, .hb-kc5-table td { padding: 0 16px; text-align: center; }
.hb-kc5-table thead th {
  position: sticky;
  top: var(--hb-kc5-top, 0px);
  z-index: 2;
  height: 84px;
  padding-top: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  background: rgba(10, 10, 10, .82);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  vertical-align: middle;
}
.hb-kc5-table thead th:first-child { text-align: left; padding-left: 0; color: #6f6f6f; font-size: 12.5px; font-weight: 550; letter-spacing: .04em; text-transform: uppercase; }
.hb-kc5-table thead th[data-us="true"] {
  border-radius: 18px 18px 0 0;
  border-bottom-color: color-mix(in srgb, var(--hb-kc5-accent) 30%, transparent);
  background: color-mix(in srgb, var(--hb-kc5-accent) 14%, #0d0d0f);
  box-shadow: inset 1px 0 0 color-mix(in srgb, var(--hb-kc5-accent) 45%, transparent), inset -1px 0 0 color-mix(in srgb, var(--hb-kc5-accent) 45%, transparent), inset 0 1px 0 color-mix(in srgb, var(--hb-kc5-accent) 45%, transparent);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}
.hb-kc5-colname { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
.hb-kc5-colname[data-us="false"] { color: #a1a1a1; font-weight: 550; }
.hb-kc5-mark { display: inline-flex; align-items: center; gap: 8px; }
.hb-kc5-logo { width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(135deg, color-mix(in srgb, var(--hb-kc5-accent) 50%, #fff), var(--hb-kc5-accent)); box-shadow: 0 0 16px color-mix(in srgb, var(--hb-kc5-accent) 60%, transparent); }
.hb-kc5-note {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kc5-accent) 20%, transparent);
  color: color-mix(in srgb, var(--hb-kc5-accent) 50%, #fff);
  font-size: 11px;
  font-weight: 600;
}
.hb-kc5-group th {
  height: 52px;
  padding: 18px 0 8px;
  color: #ededed;
  font-size: 13px;
  font-weight: 650;
  text-align: left;
  vertical-align: bottom;
}
.hb-kc5-row td, .hb-kc5-row th {
  height: 50px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  transition: background-color .2s ease;
  animation: hb-kc5-in .6s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kc5-d, 0ms);
}
.hb-kc5-row th { padding-left: 12px; color: #c9c9c9; font-weight: 450; text-align: left; border-radius: 10px 0 0 10px; }
.hb-kc5-row td:last-child { border-radius: 0 10px 10px 0; }
.hb-kc5-row:hover td, .hb-kc5-row:hover th { background: rgba(255, 255, 255, .035); }
.hb-kc5-row:hover th { color: #fff; }
.hb-kc5-val { display: inline-flex; align-items: center; justify-content: center; color: #a1a1a1; font-size: 13.5px; font-variant-numeric: tabular-nums; }
.hb-kc5-val[data-us="true"] { color: #fff; font-weight: 600; }
.hb-kc5-yes { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: rgba(255, 255, 255, .08); color: #d4d4d4; }
.hb-kc5-yes svg { width: 12px; height: 12px; }
.hb-kc5-val[data-us="true"] .hb-kc5-yes { background: var(--hb-kc5-accent); color: #fff; box-shadow: 0 0 14px color-mix(in srgb, var(--hb-kc5-accent) 60%, transparent); }
.hb-kc5-no { display: block; width: 12px; height: 2px; border-radius: 2px; background: #3a3a3a; }
.hb-kc5-cards { display: grid; gap: 22px; }
.hb-kc5-cgroup h3 { margin: 0 0 10px; color: #ededed; font-size: 13px; font-weight: 650; }
.hb-kc5-clist { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-kc5-card { padding: 14px 14px 12px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: #101010; }
.hb-kc5-card p { margin: 0 0 10px; color: #ededed; font-size: 14px; font-weight: 550; }
.hb-kc5-cvals { display: grid; gap: 6px; margin: 0; }
.hb-kc5-cvals div { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 30px; padding: 0 10px; border-radius: 8px; font-size: 13px; }
.hb-kc5-cvals div[data-us="true"] { background: color-mix(in srgb, var(--hb-kc5-accent) 12%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-kc5-accent) 35%, transparent); }
.hb-kc5-cvals dt { color: #8f8f8f; }
.hb-kc5-cvals div[data-us="true"] dt { color: #fff; font-weight: 600; }
.hb-kc5-cvals dd { margin: 0; }
.hb-kc5-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 20px; margin-top: 40px; }
.hb-kc5-cta {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  background: #fff;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), background-color .2s ease;
}
.hb-kc5-cta:hover { transform: translateY(-1px); background: #ececec; }
.hb-kc5-link { color: #a1a1a1; font-size: 14px; font-weight: 550; text-decoration: none; transition: color .2s ease; }
.hb-kc5-link:hover { color: #fff; }
.hb-kc5-cta:focus-visible, .hb-kc5-link:focus-visible { outline: 2px solid var(--hb-kc5-accent); outline-offset: 3px; }
@keyframes hb-kc5-sweep {
  0% { transform: translateY(0); }
  70%, 100% { transform: translateY(440%); }
}
@keyframes hb-kc5-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@container (min-width: 700px) {
  .hb-kc5-inner { padding: 104px 32px 88px; }
  .hb-kc5-head { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); align-items: end; gap: 32px; margin-bottom: 44px; }
  .hb-kc5-wrap { display: block; }
  .hb-kc5-cards { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc5-glow::after { animation: none; opacity: 0; }
  .hb-kc5-row td, .hb-kc5-row th { animation: none; transition: none; }
  .hb-kc5-cta, .hb-kc5-link { transition: none; }
}
`;

function Cell({ value, us }: { value: ComparisonValue; us: boolean }) {
  if (value === true) {
    return (
      <span className="hb-kc5-val" data-us={us ? "true" : "false"}>
        <span className="hb-kc5-yes" role="img" aria-label="Yes">
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.5 6.3l2.3 2.3 4.7-5.1" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="hb-kc5-val" data-us={us ? "true" : "false"}>
        <span className="hb-kc5-no" role="img" aria-label="No" />
      </span>
    );
  }
  return (
    <span className="hb-kc5-val" data-us={us ? "true" : "false"}>
      {value}
    </span>
  );
}

export function ComparisonTable({
  eyebrow = "Compare",
  title = "Why teams move their sites to Relay",
  subtitle = "The same features you would spend a quarter wiring together, on by default and priced per project.",
  columns = defaultColumns,
  groups = defaultGroups,
  stickyOffset = 0,
  cta = { label: "Deploy your first site", href: "#" },
  secondaryCta = { label: "Read the migration guide", href: "#" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ComparisonTableProps) {
  const first = 34;
  const colW = (100 - first) / Math.max(1, columns.length);
  const usIndex = columns.findIndex((c) => c.highlight);
  const offsets = groups.map((_, gi) => groups.slice(0, gi).reduce((n, g) => n + g.rows.length, 0));

  const vars = {
    "--hb-kc5-accent": accent,
    "--hb-kc5-top": `${stickyOffset}px`,
    "--hb-kc5-left": `${(first + Math.max(0, usIndex) * colW).toFixed(3)}%`,
    "--hb-kc5-width": `${colW.toFixed(3)}%`,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-kc5 ${className}`} style={vars} {...rest}>
      <style href="hb-comparison-table" precedence="default">{css}</style>
      <div className="hb-kc5-inner">
        <div className="hb-kc5-head">
          <div>
            {eyebrow ? <p className="hb-kc5-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-kc5-title">{title}</h2>
          </div>
          {subtitle ? <p className="hb-kc5-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-kc5-wrap">
          {usIndex >= 0 ? <span className="hb-kc5-glow" aria-hidden="true" /> : null}
          <table className="hb-kc5-table">
            <colgroup>
              <col style={{ width: `${first}%` }} />
              {columns.map((c) => (
                <col key={c.name} style={{ width: `${colW.toFixed(3)}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {columns.map((c) => (
                  <th key={c.name} scope="col" data-us={c.highlight ? "true" : "false"}>
                    <span className="hb-kc5-colname" data-us={c.highlight ? "true" : "false"}>
                      <span className="hb-kc5-mark">
                        {c.highlight ? <span className="hb-kc5-logo" aria-hidden="true" /> : null}
                        {c.name}
                      </span>
                      {c.note ? <span className="hb-kc5-note">{c.note}</span> : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {groups.map((g, gi) => (
              <tbody key={g.name}>
                <tr className="hb-kc5-group">
                  <th scope="colgroup" colSpan={columns.length + 1}>{g.name}</th>
                </tr>
                {g.rows.map((r, ri) => {
                  const d = ((offsets[gi] ?? 0) + ri) * 45;
                  return (
                    <tr key={r.label} className="hb-kc5-row" style={{ "--hb-kc5-d": `${d}ms` } as React.CSSProperties}>
                      <th scope="row">{r.label}</th>
                      {columns.map((c, i) => (
                        <td key={c.name}>
                          <Cell value={r.values[i] ?? false} us={!!c.highlight} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            ))}
          </table>
        </div>
        <div className="hb-kc5-cards">
          {groups.map((g) => (
            <div key={g.name} className="hb-kc5-cgroup">
              <h3>{g.name}</h3>
              <ul className="hb-kc5-clist">
                {g.rows.map((r) => (
                  <li key={r.label} className="hb-kc5-card">
                    <p>{r.label}</p>
                    <dl className="hb-kc5-cvals">
                      {columns.map((c, i) => (
                        <div key={c.name} data-us={c.highlight ? "true" : "false"}>
                          <dt>{c.name}</dt>
                          <dd>
                            <Cell value={r.values[i] ?? false} us={!!c.highlight} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {cta || secondaryCta ? (
          <div className="hb-kc5-actions">
            {cta ? <a className="hb-kc5-cta" href={cta.href}>{cta.label}</a> : null}
            {secondaryCta ? <a className="hb-kc5-link" href={secondaryCta.href}>{secondaryCta.label}</a> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

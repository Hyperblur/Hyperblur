"use client";

import * as React from "react";

export interface FooterSitemapStatusLink {
  label: string;
  href: string;
}

export interface FooterSitemapStatusGroup {
  title: string;
  links: FooterSitemapStatusLink[];
}

export interface FooterSitemapStatusDay {
  label: string;
  uptime: number;
  note?: string;
}

export interface FooterSitemapStatusService {
  name: string;
  state: "operational" | "degraded" | "outage";
}

export interface FooterSitemapStatusProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  description?: string;
  status?: "operational" | "degraded" | "outage";
  statusHref?: string;
  history?: FooterSitemapStatusDay[];
  services?: FooterSitemapStatusService[];
  groups?: FooterSitemapStatusGroup[];
  copyright?: string;
  legal?: FooterSitemapStatusLink[];
  accent?: string;
}

const css = `
.hb-wc4 {
  --hb-wc4-accent: #22d3ee;
  --hb-wc4-ok: #34d399;
  --hb-wc4-warn: #fbbf24;
  --hb-wc4-bad: #f87171;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc4 *, .hb-wc4 *::before, .hb-wc4 *::after { box-sizing: border-box; }
.hb-wc4-inner { max-width: 1180px; margin: 0 auto; padding: 64px 20px 28px; }
.hb-wc4-grid { display: grid; gap: 44px; }
.hb-wc4-left { display: grid; gap: 22px; align-content: start; }
.hb-wc4-brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 18px; font-weight: 650; letter-spacing: -.01em; }
.hb-wc4-logo { position: relative; width: 28px; height: 28px; border-radius: 8px; background: #151515; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .12); overflow: hidden; }
.hb-wc4-logo::before, .hb-wc4-logo::after { content: ""; position: absolute; left: 6px; right: 6px; height: 3px; border-radius: 2px; background: var(--hb-wc4-accent); }
.hb-wc4-logo::before { top: 9px; }
.hb-wc4-logo::after { top: 16px; right: 11px; opacity: .55; }
.hb-wc4-desc { margin: 0; max-width: 380px; color: #8f8f8f; font-size: 14.5px; line-height: 1.6; }
.hb-wc4-card {
  position: relative;
  display: grid;
  gap: 16px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 24px 60px -30px rgba(0, 0, 0, .9);
}
.hb-wc4-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-wc4-state { display: inline-flex; align-items: center; gap: 10px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-wc4-state:focus-visible, .hb-wc4-link:focus-visible, .hb-wc4-legal a:focus-visible { outline: 2px solid var(--hb-wc4-accent); outline-offset: 3px; border-radius: 6px; }
.hb-wc4-pulse { position: relative; width: 10px; height: 10px; border-radius: 50%; background: var(--hb-wc4-c); box-shadow: 0 0 12px var(--hb-wc4-c); }
.hb-wc4-pulse::before, .hb-wc4-pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 1px solid var(--hb-wc4-c); animation: hb-wc4-ring 2.4s cubic-bezier(.2, .6, .3, 1) infinite; }
.hb-wc4-pulse::after { animation-delay: 1.2s; }
.hb-wc4-pct { color: #8f8f8f; font-family: var(--font-mono), monospace; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-wc4-strip { position: relative; display: flex; align-items: flex-end; gap: 2px; height: 34px; padding: 0; border-radius: 6px; outline: none; cursor: crosshair; }
.hb-wc4-strip:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wc4-accent); }
.hb-wc4-bar { flex: 1 1 0; min-width: 1px; height: 100%; border-radius: 2px; background: var(--hb-wc4-c); opacity: .78; transform-origin: 50% 100%; animation: hb-wc4-grow .8s cubic-bezier(.2, .9, .2, 1) both; animation-delay: calc(var(--hb-wc4-i) * 6ms); transition: opacity .15s ease, transform .2s ease; }
.hb-wc4-bar[data-active="true"] { opacity: 1; transform: scaleY(1.18); box-shadow: 0 0 10px var(--hb-wc4-c); }
.hb-wc4-strip:hover .hb-wc4-bar:not([data-active="true"]) { opacity: .45; }
.hb-wc4-tip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: var(--hb-wc4-x);
  z-index: 2;
  min-width: 168px;
  padding: 9px 11px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: rgba(23, 23, 23, .96);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, .8);
  color: #ededed;
  font-size: 12px;
  line-height: 1.45;
  transform: translateX(-50%);
  pointer-events: none;
  animation: hb-wc4-tip .18s ease-out;
}
.hb-wc4-tip b { display: block; font-weight: 600; }
.hb-wc4-tip span { color: #8f8f8f; }
.hb-wc4-axis { display: flex; justify-content: space-between; color: #5f5f5f; font-size: 11.5px; }
.hb-wc4-svc { display: grid; gap: 8px; margin: 0; padding: 12px 0 0; border-top: 1px dashed rgba(255, 255, 255, .08); list-style: none; }
.hb-wc4-svc li { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #a1a1a1; font-size: 13px; }
.hb-wc4-tag { display: inline-flex; align-items: center; gap: 6px; color: var(--hb-wc4-c); font-size: 12px; font-weight: 550; }
.hb-wc4-tag::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-wc4-map { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; align-content: start; }
.hb-wc4-gt { display: flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #6f6f6f; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-wc4-gt::before { content: ""; width: 10px; height: 1px; background: var(--hb-wc4-accent); }
.hb-wc4-list { display: grid; gap: 11px; margin: 0; padding: 0; list-style: none; }
.hb-wc4-link { color: #b4b4b4; font-size: 14px; text-decoration: none; transition: color .2s ease; }
.hb-wc4-link:hover { color: #fff; }
.hb-wc4-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; margin-top: 48px; padding-top: 22px; border-top: 1px solid rgba(255, 255, 255, .07); color: #6f6f6f; font-size: 13px; }
.hb-wc4-legal { display: flex; flex-wrap: wrap; gap: 8px 20px; margin: 0; padding: 0; list-style: none; }
.hb-wc4-legal a { color: #8f8f8f; text-decoration: none; }
.hb-wc4-legal a:hover { color: #ededed; }
.hb-wc4-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-wc4-ring { from { transform: scale(1); opacity: .8; } to { transform: scale(2.6); opacity: 0; } }
@keyframes hb-wc4-grow { from { transform: scaleY(.15); opacity: 0; } }
@keyframes hb-wc4-tip { from { opacity: 0; transform: translate(-50%, 4px); } }
@container (min-width: 760px) {
  .hb-wc4-inner { padding: 88px 40px 32px; }
  .hb-wc4-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 72px; }
  .hb-wc4-map { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc4 *, .hb-wc4 *::before, .hb-wc4 *::after { animation: none !important; transition: none !important; }
}
`;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return (x ^ (x >>> 16)) >>> 0;
}

function buildHistory(): FooterSitemapStatusDay[] {
  const out: FooterSitemapStatusDay[] = [];
  let m = 10;
  let d = 7;
  for (let i = 0; i < 90; i++) {
    const h = hash(i) % 1000;
    let uptime = 100;
    let note: string | undefined;
    if (i === 23) {
      uptime = 97.42;
      note = "Partial outage in webhook delivery, 37 min";
    } else if (i === 58) {
      uptime = 99.31;
      note = "Elevated API latency in eu-west, 12 min";
    } else if (h < 40) {
      uptime = 99.9 + (h % 9) / 100;
      note = "Brief connection resets, resolved automatically";
    }
    out.unshift({ label: `${months[m]} ${d}`, uptime, note });
    d -= 1;
    if (d === 0) {
      m = (m + 11) % 12;
      d = monthDays[m];
    }
  }
  return out;
}

const defaultHistory = buildHistory();

const defaultServices: FooterSitemapStatusService[] = [
  { name: "REST and GraphQL API", state: "operational" },
  { name: "Webhooks", state: "operational" },
  { name: "Dashboard", state: "operational" },
];

const defaultGroups: FooterSitemapStatusGroup[] = [
  { title: "Platform", links: [{ label: "Payments", href: "#" }, { label: "Invoicing", href: "#" }, { label: "Payouts", href: "#" }, { label: "Fraud rules", href: "#" }] },
  { title: "Developers", links: [{ label: "Documentation", href: "#" }, { label: "API reference", href: "#" }, { label: "SDKs", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }, { label: "Newsroom", href: "#" }] },
  { title: "Support", links: [{ label: "Help center", href: "#" }, { label: "Contact sales", href: "#" }, { label: "Security", href: "#" }, { label: "System status", href: "#" }] },
];

const defaultLegal: FooterSitemapStatusLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "DPA", href: "#" },
  { label: "Licenses", href: "#" },
];

const labels = { operational: "All systems operational", degraded: "Degraded performance", outage: "Major outage" };
const short = { operational: "Operational", degraded: "Degraded", outage: "Outage" };

function color(state: "operational" | "degraded" | "outage") {
  return state === "operational" ? "var(--hb-wc4-ok)" : state === "degraded" ? "var(--hb-wc4-warn)" : "var(--hb-wc4-bad)";
}

function dayColor(u: number) {
  return u >= 99.95 ? "var(--hb-wc4-ok)" : u >= 99 ? "var(--hb-wc4-warn)" : "var(--hb-wc4-bad)";
}

export function FooterSitemapStatus({
  brand = "Ledgerline",
  description = "Payments infrastructure for software platforms. Accept, route and reconcile money in 46 countries with one integration.",
  status = "operational",
  statusHref = "#",
  history = defaultHistory,
  services = defaultServices,
  groups = defaultGroups,
  copyright = "© 2026 Ledgerline, Inc.",
  legal = defaultLegal,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: FooterSitemapStatusProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const strip = React.useRef<HTMLDivElement>(null);
  const avg = history.length ? history.reduce((s, d) => s + d.uptime, 0) / history.length : 100;
  const cur = active === null ? null : history[active];

  const pick = (clientX: number) => {
    const el = strip.current;
    if (!el || !history.length) return;
    const r = el.getBoundingClientRect();
    const i = Math.floor(((clientX - r.left) / r.width) * history.length);
    setActive(Math.max(0, Math.min(history.length - 1, i)));
  };

  const key = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = history.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : -1;
      setActive((a) => Math.max(0, Math.min(last, (a ?? last) + (a === null ? 0 : step))));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Escape") {
      setActive(null);
    }
  };

  const vars = { "--hb-wc4-accent": accent, ...style } as React.CSSProperties;

  return (
    <footer className={`hb-wc4 ${className}`} style={vars} {...rest}>
      <style href="hb-footer-sitemap-status" precedence="default">{css}</style>
      <div className="hb-wc4-inner">
        <div className="hb-wc4-grid">
          <div className="hb-wc4-left">
            <span className="hb-wc4-brand">
              <span className="hb-wc4-logo" aria-hidden="true" />
              {brand}
            </span>
            <p className="hb-wc4-desc">{description}</p>
            <div className="hb-wc4-card">
              <div className="hb-wc4-head">
                <a className="hb-wc4-state" href={statusHref} style={{ "--hb-wc4-c": color(status) } as React.CSSProperties}>
                  <span className="hb-wc4-pulse" aria-hidden="true" />
                  {labels[status]}
                </a>
                <span className="hb-wc4-pct">{avg.toFixed(2)}% uptime</span>
              </div>
              <div
                ref={strip}
                className="hb-wc4-strip"
                role="group"
                tabIndex={0}
                aria-label={`Uptime for the last ${history.length} days. Use the arrow keys to inspect a day.`}
                onPointerMove={(e) => pick(e.clientX)}
                onPointerDown={(e) => pick(e.clientX)}
                onPointerLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                onKeyDown={key}
              >
                {history.map((d, i) => (
                  <span
                    key={`${d.label}-${i}`}
                    className="hb-wc4-bar"
                    data-active={active === i ? "true" : "false"}
                    style={{ "--hb-wc4-c": dayColor(d.uptime), "--hb-wc4-i": i } as React.CSSProperties}
                  />
                ))}
                {cur && active !== null ? (
                  <span className="hb-wc4-tip" style={{ "--hb-wc4-x": `${(((active + 0.5) / history.length) * 100).toFixed(2)}%` } as React.CSSProperties}>
                    <b>
                      {cur.label} · {cur.uptime.toFixed(2)}%
                    </b>
                    <span>{cur.note ?? "No incidents recorded"}</span>
                  </span>
                ) : null}
              </div>
              <span className="hb-wc4-sr" aria-live="polite">
                {cur ? `${cur.label}, ${cur.uptime.toFixed(2)} percent. ${cur.note ?? "No incidents recorded"}` : ""}
              </span>
              <div className="hb-wc4-axis" aria-hidden="true">
                <span>{history.length} days ago</span>
                <span>Today</span>
              </div>
              <ul className="hb-wc4-svc">
                {services.map((s) => (
                  <li key={s.name}>
                    {s.name}
                    <span className="hb-wc4-tag" style={{ "--hb-wc4-c": color(s.state) } as React.CSSProperties}>{short[s.state]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <nav className="hb-wc4-map" aria-label="Sitemap">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="hb-wc4-gt">{g.title}</p>
                <ul className="hb-wc4-list">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a className="hb-wc4-link" href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="hb-wc4-bottom">
          <span>{copyright}</span>
          <ul className="hb-wc4-legal">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

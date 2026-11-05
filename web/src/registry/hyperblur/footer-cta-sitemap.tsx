"use client";

import * as React from "react";

export interface FooterCtaSitemapLink {
  label: string;
  href: string;
}

export interface FooterCtaSitemapColumn {
  title: string;
  links: FooterCtaSitemapLink[];
}

export interface FooterCtaSitemapProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "children"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primary?: FooterCtaSitemapLink | null;
  secondary?: FooterCtaSitemapLink | null;
  rating?: { score: string; label: string } | null;
  brand?: string;
  address?: string[];
  columns?: FooterCtaSitemapColumn[];
  legal?: FooterCtaSitemapLink[];
  copyright?: string;
  accent?: string;
}

const css = `
.hb-ke7 {
  --hb-ke7-accent: #2f6b4f;
  --hb-ke7-serif: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #1d1c19;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke7 *, .hb-ke7 *::before, .hb-ke7 *::after { box-sizing: border-box; }
.hb-ke7-top { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding: 72px 24px 0; }
.hb-ke7-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  align-items: center;
  gap: 32px;
  margin-bottom: -112px;
  padding: 52px 52px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 28px;
  background:
    radial-gradient(70% 90% at 100% 50%, color-mix(in srgb, var(--hb-ke7-accent) 70%, transparent), transparent 70%),
    linear-gradient(135deg, color-mix(in srgb, var(--hb-ke7-accent) 60%, #0b1712), color-mix(in srgb, var(--hb-ke7-accent) 35%, #08100c));
  color: #f4f1e8;
  box-shadow: 0 1px 0 rgba(255,255,255,.12) inset, 0 40px 80px -40px rgba(20,40,30,.55), 0 0 0 1px rgba(0,0,0,.06);
}
.hb-ke7-card::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
  background-size: 18px 18px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 70%);
  mask-image: linear-gradient(90deg, transparent, #000 70%);
}
.hb-ke7-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: rgba(244,241,232,.75); font-size: 13px; font-weight: 500; letter-spacing: .02em; }
.hb-ke7-eyebrow i { width: 18px; height: 1px; background: rgba(244,241,232,.5); }
.hb-ke7-h { margin: 16px 0 14px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(34px, 5cqi, 54px); font-weight: 400; letter-spacing: -.015em; line-height: 1.02; }
.hb-ke7-h em { font-style: normal; color: #e9dcb5; }
.hb-ke7-sub { margin: 0; max-width: 440px; color: rgba(244,241,232,.72); font-size: 15.5px; line-height: 1.6; }
.hb-ke7-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.hb-ke7-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 550;
  text-decoration: none;
  transition: transform .15s ease, background-color .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.hb-ke7-btn:active { transform: scale(.97); }
.hb-ke7-p { background: #f4f1e8; color: #13261d; box-shadow: 0 10px 24px -12px rgba(0,0,0,.5); }
.hb-ke7-p:hover { background: #fff; box-shadow: 0 14px 30px -12px rgba(0,0,0,.55); }
.hb-ke7-p svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
.hb-ke7-p:hover svg { transform: translateX(3px); }
.hb-ke7-s { border: 1px solid rgba(244,241,232,.28); color: #f4f1e8; }
.hb-ke7-s:hover { border-color: rgba(244,241,232,.6); background: rgba(244,241,232,.06); }
.hb-ke7-orbit { position: relative; justify-self: center; width: min(100%, 320px); aspect-ratio: 1; }
.hb-ke7-ring { position: absolute; inset: 0; border: 1px solid rgba(244,241,232,.16); border-radius: 50%; animation: hb-ke7-spin 26s linear infinite; }
.hb-ke7-ring:nth-child(2) { inset: 16%; border-style: dashed; border-color: rgba(244,241,232,.2); animation-duration: 18s; animation-direction: reverse; }
.hb-ke7-ring:nth-child(3) { inset: 32%; animation-duration: 12s; }
.hb-ke7-ring b { position: absolute; top: -5px; left: calc(50% - 5px); width: 10px; height: 10px; border-radius: 50%; background: #e9dcb5; box-shadow: 0 0 0 5px rgba(233,220,181,.15); }
.hb-ke7-ring:nth-child(2) b { top: auto; bottom: -4px; width: 8px; height: 8px; background: #f4f1e8; }
.hb-ke7-ring:nth-child(3) b { top: calc(50% - 3px); left: -3px; width: 6px; height: 6px; background: #b6d8c4; }
.hb-ke7-seal {
  position: absolute;
  inset: 38%;
  display: grid;
  place-content: center;
  border-radius: 50%;
  background: #f4f1e8;
  color: #13261d;
  text-align: center;
  box-shadow: 0 20px 40px -20px rgba(0,0,0,.6);
}
.hb-ke7-score { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(20px, 3cqi, 30px); line-height: 1; }
.hb-ke7-stars { display: flex; justify-content: center; gap: 1px; margin-top: 4px; }
.hb-ke7-stars svg { width: 9px; height: 9px; fill: var(--hb-ke7-accent); }
.hb-ke7-tip {
  position: absolute;
  right: -2%;
  bottom: 12%;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(244,241,232,.12);
  border: 1px solid rgba(244,241,232,.2);
  color: #f4f1e8;
  font-size: 12px;
  line-height: 1.3;
  backdrop-filter: blur(6px);
  white-space: nowrap;
}
.hb-ke7-map { position: relative; background: #ede9dd; border-top: 1px solid rgba(29,28,25,.06); }
.hb-ke7-mapin { max-width: 1120px; margin: 0 auto; padding: 164px 24px 28px; }
.hb-ke7-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(4, minmax(0, 1fr)); gap: 32px; }
.hb-ke7-brand { display: inline-block; color: #1d1c19; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 34px; letter-spacing: -.02em; line-height: 1; text-decoration: none; }
.hb-ke7-brand span { color: var(--hb-ke7-accent); }
.hb-ke7-addr { margin: 16px 0 0; color: #6c685e; font-size: 13.5px; font-style: normal; line-height: 1.7; }
.hb-ke7-ct { margin: 4px 0 14px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 19px; color: #1d1c19; }
.hb-ke7-ul { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
.hb-ke7-a {
  color: #57534a;
  font-size: 14px;
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: color .2s ease, background-size .3s cubic-bezier(.2,.8,.2,1);
}
.hb-ke7-a:hover { color: var(--hb-ke7-accent); background-size: 100% 1px; }
.hb-ke7-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  margin-top: 52px;
  padding-top: 20px;
  border-top: 1px solid rgba(29,28,25,.12);
  color: #7a766b;
  font-size: 13px;
}
.hb-ke7-bottom ul { display: flex; flex-wrap: wrap; gap: 6px 20px; margin: 0; padding: 0; list-style: none; }
.hb-ke7-bottom a { color: #57534a; text-decoration: none; }
.hb-ke7-bottom a:hover { color: #1d1c19; }
.hb-ke7 a:focus-visible { outline: 2px solid var(--hb-ke7-accent); outline-offset: 3px; border-radius: 4px; }
.hb-ke7-card a:focus-visible { outline-color: #e9dcb5; }
@keyframes hb-ke7-spin { to { transform: rotate(1turn); } }
@container (max-width: 900px) {
  .hb-ke7-card { grid-template-columns: minmax(0, 1fr); padding: 40px 32px; }
  .hb-ke7-orbit { display: none; }
  .hb-ke7-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ke7-about { grid-column: 1 / -1; }
}
@container (max-width: 520px) {
  .hb-ke7-top { padding: 48px 16px 0; }
  .hb-ke7-card { padding: 32px 22px; border-radius: 22px; }
  .hb-ke7-mapin { padding: 148px 16px 24px; }
  .hb-ke7-btn { flex: 1 1 auto; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke7 *, .hb-ke7 *::before, .hb-ke7 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultColumns: FooterCtaSitemapColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Season planner", href: "#" },
      { label: "Crop calendar", href: "#" },
      { label: "Yield reports", href: "#" },
      { label: "Mobile app", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Growers",
    links: [
      { label: "Market gardens", href: "#" },
      { label: "Orchards", href: "#" },
      { label: "Vineyards", href: "#" },
      { label: "Co-ops", href: "#" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Field guides", href: "#" },
      { label: "Seed library", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const defaultLegal: FooterCtaSitemapLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Accessibility", href: "#" },
];

export function FooterCtaSitemap({
  eyebrow = "Free for your first 30 days",
  title = "Plan your next season",
  highlight = "in an afternoon.",
  subtitle = "Map every bed, schedule every sowing and see your harvest forecast before the first frost. Loved by 2,300 farms across 14 countries.",
  primary = { label: "Start planning", href: "#" },
  secondary = { label: "Talk to a grower", href: "#" },
  rating = { score: "4.9", label: "from 2,300 farms" },
  brand = "Fieldnote",
  address = ["41 Mercer Lane", "Portland, Oregon 97214", "hello@fieldnote.farm"],
  columns = defaultColumns,
  legal = defaultLegal,
  copyright = "© 2026 Fieldnote Cooperative",
  accent = "#2f6b4f",
  className = "",
  style,
  ...rest
}: FooterCtaSitemapProps) {
  return (
    <footer className={`hb-ke7 ${className}`} style={{ "--hb-ke7-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-footer-cta-sitemap" precedence="default">
        {css}
      </style>
      <div className="hb-ke7-top">
        <section className="hb-ke7-card" aria-label={title}>
          <div>
            {eyebrow && (
              <p className="hb-ke7-eyebrow">
                <i aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h2 className="hb-ke7-h">
              {title} {highlight && <em>{highlight}</em>}
            </h2>
            {subtitle && <p className="hb-ke7-sub">{subtitle}</p>}
            {(primary || secondary) && (
              <div className="hb-ke7-actions">
                {primary && (
                  <a href={primary.href} className="hb-ke7-btn hb-ke7-p">
                    {primary.label}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                )}
                {secondary && (
                  <a href={secondary.href} className="hb-ke7-btn hb-ke7-s">
                    {secondary.label}
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="hb-ke7-orbit" aria-hidden="true">
            <span className="hb-ke7-ring">
              <b />
            </span>
            <span className="hb-ke7-ring">
              <b />
            </span>
            <span className="hb-ke7-ring">
              <b />
            </span>
            {rating && (
              <span className="hb-ke7-seal">
                <span className="hb-ke7-score">{rating.score}</span>
                <span className="hb-ke7-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24">
                      <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
                    </svg>
                  ))}
                </span>
              </span>
            )}
            {rating && <span className="hb-ke7-tip">{rating.label}</span>}
          </div>
        </section>
      </div>
      <div className="hb-ke7-map">
        <div className="hb-ke7-mapin">
          <div className="hb-ke7-grid">
            <div className="hb-ke7-about">
              <a href="#" className="hb-ke7-brand" aria-label={`${brand} home`}>
                {brand}
                <span>.</span>
              </a>
              <address className="hb-ke7-addr">
                {address.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </address>
            </div>
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="hb-ke7-ct">{col.title}</p>
                <ul className="hb-ke7-ul">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hb-ke7-a">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="hb-ke7-bottom">
            <span>{copyright}</span>
            <ul aria-label="Legal">
              {legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

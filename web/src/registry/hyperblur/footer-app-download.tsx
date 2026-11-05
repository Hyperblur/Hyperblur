"use client";

import * as React from "react";

export type FooterAppPlatform = "ios" | "android" | "mac" | "windows";
export type FooterAppTheme = "dark" | "light";

export interface FooterAppBadge {
  platform: FooterAppPlatform;
  top: string;
  label: string;
  href: string;
}

export interface FooterAppColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterAppLanguage {
  code: string;
  label: string;
}

export interface FooterAppDownloadProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  brand?: string;
  rating?: string;
  badges?: FooterAppBadge[];
  columns?: FooterAppColumn[];
  languages?: FooterAppLanguage[];
  language?: string;
  defaultLanguage?: string;
  onLanguageChange?: (code: string) => void;
  theme?: FooterAppTheme;
  defaultTheme?: FooterAppTheme;
  onThemeChange?: (theme: FooterAppTheme) => void;
  legal?: string;
  accent?: string;
}

const defaultBadges: FooterAppBadge[] = [
  { platform: "ios", top: "Download for", label: "iPhone & iPad", href: "#" },
  { platform: "android", top: "Get it for", label: "Android", href: "#" },
  { platform: "mac", top: "Desktop app", label: "macOS", href: "#" },
  { platform: "windows", top: "Desktop app", label: "Windows", href: "#" },
];

const defaultColumns: FooterAppColumn[] = [
  { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Offline mode", href: "#" }, { label: "Widgets", href: "#" }, { label: "Release notes", href: "#" }] },
  { title: "Support", links: [{ label: "Help center", href: "#" }, { label: "Device guide", href: "#" }, { label: "Contact us", href: "#" }, { label: "Status", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }, { label: "Press", href: "#" }] },
];

const defaultLanguages: FooterAppLanguage[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "ja", label: "日本語" },
];

const css = `
.hb-yi4 {
  --hb-yi4-accent: #f59e0b;
  --hb-yi4-bg: #0a0a0a;
  --hb-yi4-sf: #111111;
  --hb-yi4-sf2: #171717;
  --hb-yi4-line: rgba(255, 255, 255, .08);
  --hb-yi4-tx: #ededed;
  --hb-yi4-mu: #8f8f8f;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: var(--hb-yi4-bg);
  color: var(--hb-yi4-tx);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  transition: background .4s ease, color .4s ease;
}
.hb-yi4[data-theme="light"] {
  --hb-yi4-bg: #ffffff;
  --hb-yi4-sf: #f6f6f4;
  --hb-yi4-sf2: #ececea;
  --hb-yi4-line: rgba(10, 10, 10, .1);
  --hb-yi4-tx: #111111;
  --hb-yi4-mu: #6b6b6b;
}
.hb-yi4 *, .hb-yi4 *::before, .hb-yi4 *::after { box-sizing: border-box; }
.hb-yi4-inner { max-width: 1120px; margin: 0 auto; padding: 64px 20px 28px; }
.hb-yi4-promo {
  position: relative; display: grid; gap: 28px; padding: 32px 24px 0; border-radius: 28px; overflow: hidden;
  background: radial-gradient(120% 120% at 100% 0%, color-mix(in srgb, var(--hb-yi4-accent) 22%, transparent), transparent 55%), var(--hb-yi4-sf);
  border: 1px solid var(--hb-yi4-line);
  transition: background .4s ease, border-color .4s ease;
}
.hb-yi4-copy { padding-bottom: 8px; }
.hb-yi4-rating { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; font-size: 13px; color: var(--hb-yi4-mu); }
.hb-yi4-stars { display: inline-flex; gap: 2px; color: var(--hb-yi4-accent); }
.hb-yi4-stars svg { width: 14px; height: 14px; }
.hb-yi4-title { margin: 0; font-size: clamp(28px, 4.6cqi, 46px); line-height: 1.04; letter-spacing: -.035em; font-weight: 600; max-width: 14ch; }
.hb-yi4-sub { margin: 14px 0 0; max-width: 420px; font-size: 15px; line-height: 1.6; color: var(--hb-yi4-mu); }
.hb-yi4-badges { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 26px; max-width: 440px; }
.hb-yi4-badge {
  display: flex; align-items: center; gap: 10px; min-width: 0; padding: 10px 14px; border-radius: 13px; text-decoration: none;
  background: var(--hb-yi4-tx); color: var(--hb-yi4-bg); border: 1px solid var(--hb-yi4-line);
  box-shadow: 0 1px 0 rgba(255, 255, 255, .15) inset; transition: transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s, background .4s, color .4s;
}
.hb-yi4-badge:nth-child(n + 3) { background: transparent; color: var(--hb-yi4-tx); }
.hb-yi4-badge:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -14px var(--hb-yi4-accent); }
.hb-yi4-badge:focus-visible, .hb-yi4-col a:focus-visible, .hb-yi4-seg button:focus-visible, .hb-yi4-select:focus-visible { outline: 2px solid var(--hb-yi4-accent); outline-offset: 2px; }
.hb-yi4-badge svg { width: 24px; height: 24px; flex: none; }
.hb-yi4-badge span { display: grid; min-width: 0; line-height: 1.15; }
.hb-yi4-badge small { font-size: 10px; opacity: .7; white-space: nowrap; }
.hb-yi4-badge b { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yi4-stage { position: relative; display: flex; justify-content: center; align-items: flex-end; gap: 20px; min-height: 280px; }
.hb-yi4-phone {
  position: relative; width: 200px; height: 300px; margin-bottom: -40px; border-radius: 34px; padding: 9px;
  background: linear-gradient(160deg, #3a3a3a, #121212); box-shadow: 0 0 0 1px rgba(255, 255, 255, .08) inset, 0 40px 60px -20px rgba(0, 0, 0, .55);
  animation: hb-yi4-float 6s ease-in-out infinite;
}
.hb-yi4-screen { position: relative; height: 100%; border-radius: 26px; overflow: hidden; background: #0d0d0d; }
.hb-yi4-notch { position: absolute; z-index: 2; left: 50%; top: 8px; width: 64px; height: 18px; margin-left: -32px; border-radius: 10px; background: #000; }
.hb-yi4-feed { position: absolute; inset: 36px 12px auto; display: grid; gap: 8px; animation: hb-yi4-scroll 9s cubic-bezier(.6, 0, .3, 1) infinite; }
.hb-yi4-tile { height: 54px; border-radius: 12px; padding: 9px 10px; background: #1a1a1a; border: 1px solid rgba(255, 255, 255, .06); display: grid; gap: 6px; align-content: start; }
.hb-yi4-tile i { display: block; height: 6px; border-radius: 3px; background: rgba(255, 255, 255, .14); }
.hb-yi4-tile i:first-child { width: 60%; background: rgba(255, 255, 255, .5); }
.hb-yi4-tile[data-hot="true"] { background: linear-gradient(135deg, color-mix(in srgb, var(--hb-yi4-accent) 70%, #000), #1a1a1a); }
.hb-yi4-qr {
  display: none; align-self: center; padding: 14px; border-radius: 18px; background: #fff; color: #0a0a0a; text-align: center;
  box-shadow: 0 20px 40px -24px rgba(0, 0, 0, .5); border: 1px solid rgba(10, 10, 10, .08);
}
.hb-yi4-qr svg { display: block; width: 104px; height: 104px; }
.hb-yi4-qr p { margin: 8px 0 0; font-size: 11px; font-weight: 600; color: #444; }
.hb-yi4-cols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; padding: 48px 0 40px; }
.hb-yi4-brandcol { grid-column: 1 / -1; }
.hb-yi4-brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 17px; letter-spacing: -.02em; }
.hb-yi4-logo { width: 28px; height: 28px; border-radius: 9px; background: var(--hb-yi4-accent); position: relative; }
.hb-yi4-logo::after { content: ""; position: absolute; inset: 8px; border-radius: 50%; border: 2.5px solid #0a0a0a; }
.hb-yi4-brandcol p { margin: 12px 0 0; max-width: 280px; font-size: 14px; line-height: 1.6; color: var(--hb-yi4-mu); }
.hb-yi4-col h3 { margin: 0 0 14px; font-size: 13px; font-weight: 600; }
.hb-yi4-col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hb-yi4-col a { color: var(--hb-yi4-mu); text-decoration: none; font-size: 14px; transition: color .2s; }
.hb-yi4-col a:hover { color: var(--hb-yi4-tx); }
.hb-yi4-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; padding-top: 22px; border-top: 1px solid var(--hb-yi4-line); font-size: 13px; color: var(--hb-yi4-mu); }
.hb-yi4-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.hb-yi4-lang { position: relative; display: inline-flex; align-items: center; }
.hb-yi4-lang > svg { position: absolute; left: 11px; width: 15px; height: 15px; pointer-events: none; color: var(--hb-yi4-mu); }
.hb-yi4-lang > svg + svg { left: auto; right: 10px; width: 12px; height: 12px; }
.hb-yi4-select {
  appearance: none; height: 34px; padding: 0 30px 0 32px; border-radius: 999px; border: 1px solid var(--hb-yi4-line); background: var(--hb-yi4-sf);
  color: var(--hb-yi4-tx); font: inherit; font-size: 13px; cursor: pointer; transition: background .4s, border-color .2s, color .4s;
}
.hb-yi4-select:hover { border-color: color-mix(in srgb, var(--hb-yi4-tx) 30%, transparent); }
.hb-yi4-seg { position: relative; display: inline-flex; padding: 3px; border-radius: 999px; border: 1px solid var(--hb-yi4-line); background: var(--hb-yi4-sf); transition: background .4s; }
.hb-yi4-seg::before {
  content: ""; position: absolute; top: 3px; left: 3px; width: 30px; height: 26px; border-radius: 999px; background: var(--hb-yi4-sf2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2), 0 0 0 1px var(--hb-yi4-line); transition: transform .35s cubic-bezier(.3, 1.4, .5, 1), background .4s;
}
.hb-yi4[data-theme="light"] .hb-yi4-seg::before { transform: translateX(30px); background: #fff; }
.hb-yi4-seg button { position: relative; display: grid; place-items: center; width: 30px; height: 26px; border: 0; border-radius: 999px; background: transparent; color: var(--hb-yi4-mu); cursor: pointer; }
.hb-yi4-seg button[aria-pressed="true"] { color: var(--hb-yi4-tx); }
.hb-yi4-seg svg { width: 14px; height: 14px; }
@keyframes hb-yi4-float { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
@keyframes hb-yi4-scroll { 0%, 18% { transform: translateY(0); } 40%, 60% { transform: translateY(-124px); } 82%, 100% { transform: translateY(0); } }
@container (min-width: 560px) {
  .hb-yi4-badges { grid-template-columns: repeat(2, minmax(0, 200px)); }
  .hb-yi4-cols { grid-template-columns: 1.4fr repeat(3, minmax(0, 1fr)); }
  .hb-yi4-brandcol { grid-column: auto; }
  .hb-yi4-qr { display: block; }
}
@container (min-width: 860px) {
  .hb-yi4-inner { padding: 96px 32px 32px; }
  .hb-yi4-promo { grid-template-columns: minmax(0, 1fr) minmax(0, 440px); padding: 52px 52px 0; }
  .hb-yi4-copy { padding-bottom: 52px; }
  .hb-yi4-stage { justify-content: flex-end; }
  .hb-yi4-phone { width: 220px; height: 340px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi4-phone, .hb-yi4-feed { animation: none; }
  .hb-yi4, .hb-yi4-promo, .hb-yi4-badge, .hb-yi4-seg::before, .hb-yi4-select, .hb-yi4-col a { transition: none; }
}
`;

function hash(n: number) {
  let x = (n + 0x9e3779b9) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  return (x ^ (x >>> 16)) >>> 0;
}

function qrCells(size: number) {
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    const corners: [number, number][] = [[0, 0], [size - 7, 0], [0, size - 7]];
    for (const [ox, oy] of corners) {
      if (inBox(ox, oy)) {
        const dx = x - ox;
        const dy = y - oy;
        const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return ring || core ? 1 : 0;
      }
      if (x >= ox - 1 && x <= ox + 7 && y >= oy - 1 && y <= oy + 7) return 0;
    }
    return -1;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const f = finder(x, y);
      if (f === 1 || (f === -1 && hash(y * 97 + x * 13) % 100 < 48)) cells.push([x, y]);
    }
  }
  return cells;
}

const qr = qrCells(25);

function PlatformIcon({ platform }: { platform: FooterAppPlatform }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (platform === "ios") {
    return (
      <svg {...common}>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
        <path d="M10.5 18.5h3" />
      </svg>
    );
  }
  if (platform === "android") {
    return (
      <svg {...common}>
        <path d="M6 9.5h12v7.5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM6 9.5a6 6 0 0 1 12 0M8.5 4.5L7.5 3M15.5 4.5l1-1.5" />
        <circle cx="10" cy="7" r=".6" fill="currentColor" />
        <circle cx="14" cy="7" r=".6" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "mac") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M1.5 19.5h21" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 20.5h8M12 17v3.5M3 10.5h18M11 4v13" />
    </svg>
  );
}

export function FooterAppDownload({
  title = "Your field notes, offline and in your pocket.",
  subtitle = "Capture photos, checklists and signatures without signal. Everything syncs the moment you are back online.",
  brand = "Fieldnote",
  rating = "4.8 from 12,400 reviews",
  badges = defaultBadges,
  columns = defaultColumns,
  languages = defaultLanguages,
  language,
  defaultLanguage = "en",
  onLanguageChange,
  theme,
  defaultTheme = "dark",
  onThemeChange,
  legal = "© 2026 Fieldnote Labs, Inc. All rights reserved.",
  accent = "#f59e0b",
  className = "",
  style,
  ...rest
}: FooterAppDownloadProps) {
  const [innerLang, setInnerLang] = React.useState(defaultLanguage);
  const [innerTheme, setInnerTheme] = React.useState<FooterAppTheme>(defaultTheme);
  const lang = language ?? innerLang;
  const mode = theme ?? innerTheme;
  const id = React.useId();

  const pickTheme = (t: FooterAppTheme) => {
    if (theme === undefined) setInnerTheme(t);
    onThemeChange?.(t);
  };

  const pickLang = (code: string) => {
    if (language === undefined) setInnerLang(code);
    onLanguageChange?.(code);
  };

  const vars = { "--hb-yi4-accent": accent, ...style } as React.CSSProperties;

  return (
    <footer className={`hb-yi4 ${className}`} data-theme={mode} style={vars} {...rest}>
      <style href="hb-footer-app-download" precedence="default">{css}</style>
      <div className="hb-yi4-inner">
        <div className="hb-yi4-promo">
          <div className="hb-yi4-copy">
            <p className="hb-yi4-rating">
              <span className="hb-yi4-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
                  </svg>
                ))}
              </span>
              {rating}
            </p>
            <h2 className="hb-yi4-title">{title}</h2>
            {subtitle ? <p className="hb-yi4-sub">{subtitle}</p> : null}
            <div className="hb-yi4-badges">
              {badges.map((b) => (
                <a key={b.platform + b.label} className="hb-yi4-badge" href={b.href}>
                  <PlatformIcon platform={b.platform} />
                  <span>
                    <small>{b.top}</small>
                    <b>{b.label}</b>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="hb-yi4-stage" aria-hidden="true">
            <div className="hb-yi4-qr">
              <svg viewBox="-1 -1 27 27" shapeRendering="crispEdges">
                {qr.map(([x, y]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
                ))}
              </svg>
              <p>Scan to download</p>
            </div>
            <div className="hb-yi4-phone">
              <div className="hb-yi4-screen">
                <span className="hb-yi4-notch" />
                <div className="hb-yi4-feed">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="hb-yi4-tile" data-hot={i === 1 || i === 4}>
                      <i />
                      <i style={{ width: `${(40 + (hash(i) % 45)).toFixed(0)}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hb-yi4-cols">
          <div className="hb-yi4-brandcol">
            <span className="hb-yi4-brand">
              <span className="hb-yi4-logo" aria-hidden="true" />
              {brand}
            </span>
            <p>Inspections, audits and site visits for teams who work where the Wi-Fi does not.</p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} className="hb-yi4-col" aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="hb-yi4-bar">
          <span>{legal}</span>
          <div className="hb-yi4-controls">
            <label className="hb-yi4-lang" htmlFor={`${id}-lang`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <select id={`${id}-lang`} className="hb-yi4-select" value={lang} onChange={(e) => pickLang(e.target.value)} aria-label="Language">
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </label>
            <div className="hb-yi4-seg" role="group" aria-label="Theme">
              <button type="button" aria-pressed={mode === "dark"} aria-label="Dark theme" onClick={() => pickTheme("dark")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
              </button>
              <button type="button" aria-pressed={mode === "light"} aria-label="Light theme" onClick={() => pickTheme("light")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

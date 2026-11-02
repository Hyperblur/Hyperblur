"use client";

import * as React from "react";

export type FooterMegaSocialId = "x" | "github" | "linkedin" | "youtube" | "discord";

export interface FooterMegaLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterMegaColumn {
  title: string;
  links: FooterMegaLink[];
}

export interface FooterMegaSocial {
  id: FooterMegaSocialId;
  href: string;
  label?: string;
}

export interface FooterMegaLanguage {
  code: string;
  label: string;
}

export interface FooterMegaStatus {
  label: string;
  href: string;
  tone?: "ok" | "degraded" | "down";
}

export interface FooterMegaNewsletter {
  title: string;
  description: string;
  placeholder?: string;
  button?: string;
}

export interface FooterMegaProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  tagline?: string;
  columns?: FooterMegaColumn[];
  newsletter?: FooterMegaNewsletter | null;
  onSubscribe?: (email: string) => void;
  socials?: FooterMegaSocial[];
  languages?: FooterMegaLanguage[];
  language?: string;
  defaultLanguage?: string;
  onLanguageChange?: (code: string) => void;
  status?: FooterMegaStatus | null;
  legal?: FooterMegaLink[];
  copyright?: string;
  accent?: string;
}

const css = `
.hb-ke5 {
  --hb-ke5-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.08);
  background:
    radial-gradient(80% 60% at 50% 0%, color-mix(in srgb, var(--hb-ke5-accent) 7%, transparent), transparent 60%),
    #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke5 *, .hb-ke5 *::before, .hb-ke5 *::after { box-sizing: border-box; }
.hb-ke5::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -240px;
  width: 220px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--hb-ke5-accent), transparent);
  animation: hb-ke5-beam 7s cubic-bezier(.45,0,.2,1) infinite;
}
.hb-ke5-in { max-width: 1120px; margin: 0 auto; padding: 64px 24px 28px; }
.hb-ke5-news {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
  align-items: center;
  gap: 32px;
  padding: 26px 28px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
}
.hb-ke5-nt { margin: 0; font-size: 20px; font-weight: 650; letter-spacing: -.015em; }
.hb-ke5-nd { margin: 6px 0 0; color: #8f8f8f; font-size: 14px; line-height: 1.5; }
.hb-ke5-form {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 4px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: #0a0a0a;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-ke5-form:focus-within { border-color: color-mix(in srgb, var(--hb-ke5-accent) 60%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-ke5-accent) 14%, transparent); }
.hb-ke5-form[data-invalid="true"] { border-color: #f87171; box-shadow: 0 0 0 4px rgba(248,113,113,.14); animation: hb-ke5-shake .35s ease; }
.hb-ke5-input { flex: 1; min-width: 0; height: 100%; padding: 0 14px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-ke5-input::placeholder { color: #6f6f6f; }
.hb-ke5-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  min-width: 112px;
  margin: 0;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: background-color .25s ease, color .25s ease, transform .15s ease;
}
.hb-ke5-btn:hover { background: #fff; }
.hb-ke5-btn:active { transform: scale(.97); }
.hb-ke5-btn[data-done="true"] { background: var(--hb-ke5-accent); color: #04151a; }
.hb-ke5-btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 20; stroke-dashoffset: 20; animation: hb-ke5-draw .4s .05s ease forwards; }
.hb-ke5-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) repeat(5, minmax(0, 1fr));
  gap: 28px;
  padding: 48px 4px 40px;
}
.hb-ke5-brand { display: inline-flex; align-items: center; gap: 10px; color: #ededed; font-size: 17px; font-weight: 650; letter-spacing: -.01em; text-decoration: none; border-radius: 6px; }
.hb-ke5-mark { position: relative; width: 28px; height: 28px; border-radius: 9px; background: #171717; box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); overflow: hidden; }
.hb-ke5-mark::before { content: ""; position: absolute; inset: 7px; border: 2px solid var(--hb-ke5-accent); border-radius: 50% 50% 50% 2px; }
.hb-ke5-tag { margin: 14px 0 20px; max-width: 220px; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-ke5-socials { display: flex; flex-wrap: wrap; gap: 8px; }
.hb-ke5-soc {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 10px;
  background: #111;
  color: #a1a1a1;
  transition: color .2s ease, border-color .2s ease, background-color .2s ease, transform .2s cubic-bezier(.3,1.4,.5,1);
}
.hb-ke5-soc:hover { color: #fff; border-color: rgba(255,255,255,.2); background: #171717; transform: translateY(-2px); }
.hb-ke5-soc svg { width: 16px; height: 16px; fill: currentColor; }
.hb-ke5-ct { margin: 4px 0 14px; color: #ededed; font-size: 13px; font-weight: 600; }
.hb-ke5-ul { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-ke5-a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8f8f8f;
  font-size: 13.5px;
  text-decoration: none;
  transition: color .18s ease;
}
.hb-ke5-a::before { content: ""; width: 0; height: 1px; background: var(--hb-ke5-accent); transition: width .25s cubic-bezier(.2,.8,.2,1); }
.hb-ke5-a:hover { color: #ededed; }
.hb-ke5-a:hover::before { width: 10px; }
.hb-ke5-badge { padding: 1px 7px; border-radius: 999px; background: color-mix(in srgb, var(--hb-ke5-accent) 14%, transparent); color: var(--hb-ke5-accent); font-size: 10.5px; font-weight: 600; }
.hb-ke5-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,.08);
  color: #6f6f6f;
  font-size: 13px;
}
.hb-ke5-legal { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 0; padding: 0; list-style: none; }
.hb-ke5-legal a { color: #8f8f8f; text-decoration: none; transition: color .15s ease; }
.hb-ke5-legal a:hover { color: #ededed; }
.hb-ke5-tools { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.hb-ke5-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 999px;
  color: #a1a1a1;
  text-decoration: none;
  transition: border-color .15s ease, color .15s ease;
}
.hb-ke5-status:hover { color: #ededed; border-color: rgba(255,255,255,.18); }
.hb-ke5-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-ke5-tone); }
.hb-ke5-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--hb-ke5-tone); animation: hb-ke5-ping 2s cubic-bezier(0,0,.2,1) infinite; }
.hb-ke5-lang { position: relative; display: inline-flex; align-items: center; }
.hb-ke5-lang svg { position: absolute; pointer-events: none; width: 14px; height: 14px; fill: none; stroke: #8f8f8f; stroke-width: 1.7; stroke-linecap: round; }
.hb-ke5-lang svg:first-child { left: 11px; }
.hb-ke5-lang svg:last-child { right: 10px; width: 10px; height: 10px; stroke-width: 2; }
.hb-ke5-select {
  height: 32px;
  padding: 0 28px 0 32px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 999px;
  background: #111;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  transition: border-color .15s ease;
}
.hb-ke5-select:hover { border-color: rgba(255,255,255,.18); }
.hb-ke5-select option { background: #111; color: #ededed; }
.hb-ke5 a:focus-visible, .hb-ke5 button:focus-visible, .hb-ke5 select:focus-visible { outline: 2px solid var(--hb-ke5-accent); outline-offset: 2px; }
.hb-ke5-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-ke5-beam { 0% { left: -240px; } 60%, 100% { left: 100%; } }
@keyframes hb-ke5-ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }
@keyframes hb-ke5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-ke5-shake { 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-2px); } }
@container (max-width: 980px) {
  .hb-ke5-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hb-ke5-about { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
  .hb-ke5-tag { margin: 8px 0 0; max-width: 360px; }
}
@container (max-width: 720px) {
  .hb-ke5-news { grid-template-columns: minmax(0, 1fr); gap: 18px; padding: 22px; }
  .hb-ke5-in { padding: 48px 16px 24px; }
  .hb-ke5-tools { margin-left: 0; flex-wrap: wrap; }
  .hb-ke5-bottom { flex-direction: column; align-items: flex-start; }
}
@container (max-width: 480px) {
  .hb-ke5-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; }
  .hb-ke5-btn { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke5 *, .hb-ke5 *::before, .hb-ke5 *::after, .hb-ke5::before { animation: none !important; transition: none !important; }
  .hb-ke5-btn svg { stroke-dashoffset: 0; }
}
`;

const socialPaths: Record<FooterMegaSocialId, string> = {
  x: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z",
  github:
    "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z",
  discord:
    "M19.5 5.3A17 17 0 0 0 15.3 4l-.5 1a15.7 15.7 0 0 0-5.6 0l-.5-1a17 17 0 0 0-4.2 1.3C1.8 9.3 1.1 13.2 1.4 17a17 17 0 0 0 5.2 2.6l1.1-1.8c-.6-.2-1.2-.5-1.8-.9l.4-.3a12.2 12.2 0 0 0 11.4 0l.4.3c-.6.4-1.2.7-1.8.9l1.1 1.8a17 17 0 0 0 5.2-2.6c.4-4.4-.7-8.3-3.1-11.7zM8.7 14.7c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2zm6.6 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2z",
};

const socialLabels: Record<FooterMegaSocialId, string> = {
  x: "X",
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  discord: "Discord",
};

const toneColors = { ok: "#34d399", degraded: "#fbbf24", down: "#f87171" };

const defaultColumns: FooterMegaColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Pipelines", href: "#" },
      { label: "Edge functions", href: "#" },
      { label: "Observability", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#", badge: "v3.8" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Startups", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "E-commerce", href: "#" },
      { label: "Fintech", href: "#" },
      { label: "Gaming", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "CLI", href: "#" },
      { label: "SDKs", href: "#" },
      { label: "Open source", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Templates", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#", badge: "14 open" },
      { label: "Press kit", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const defaultSocials: FooterMegaSocial[] = [
  { id: "x", href: "#" },
  { id: "github", href: "#" },
  { id: "linkedin", href: "#" },
  { id: "youtube", href: "#" },
  { id: "discord", href: "#" },
];

const defaultLanguages: FooterMegaLanguage[] = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
];

const defaultLegal: FooterMegaLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "DPA", href: "#" },
  { label: "Security", href: "#" },
];

export function FooterMega({
  brand = "Arcfield",
  tagline = "The data platform for teams that ship every day. Built in Copenhagen, running in 31 regions.",
  columns = defaultColumns,
  newsletter = {
    title: "The monthly changelog",
    description: "One email on the first Tuesday of every month. New features, deep dives and zero fluff.",
    placeholder: "you@company.com",
    button: "Subscribe",
  },
  onSubscribe,
  socials = defaultSocials,
  languages = defaultLanguages,
  language,
  defaultLanguage = "en",
  onLanguageChange,
  status = { label: "All systems normal", href: "#", tone: "ok" },
  legal = defaultLegal,
  copyright = "© 2026 Arcfield Labs ApS",
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: FooterMegaProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "invalid" | "done">("idle");
  const [innerLang, setInnerLang] = React.useState(defaultLanguage);
  const lang = language ?? innerLang;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setState("invalid");
      return;
    }
    setState("done");
    onSubscribe?.(value);
  }

  return (
    <footer className={`hb-ke5 ${className}`} style={{ "--hb-ke5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-footer-mega" precedence="default">
        {css}
      </style>
      <div className="hb-ke5-in">
        {newsletter && (
          <div className="hb-ke5-news">
            <div>
              <p className="hb-ke5-nt" id={`${uid}-nt`}>
                {newsletter.title}
              </p>
              <p className="hb-ke5-nd">{newsletter.description}</p>
            </div>
            <form
              className="hb-ke5-form"
              data-invalid={state === "invalid" ? "true" : "false"}
              onSubmit={submit}
              noValidate
              aria-labelledby={`${uid}-nt`}
            >
              <label htmlFor={`${uid}-email`} className="hb-ke5-sr">
                Email address
              </label>
              <input
                id={`${uid}-email`}
                className="hb-ke5-input"
                type="email"
                autoComplete="email"
                placeholder={newsletter.placeholder ?? "you@company.com"}
                value={email}
                disabled={state === "done"}
                aria-invalid={state === "invalid"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "invalid") setState("idle");
                }}
              />
              <button type="submit" className="hb-ke5-btn" data-done={state === "done" ? "true" : "false"} disabled={state === "done"}>
                {state === "done" ? (
                  <>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                    Subscribed
                  </>
                ) : (
                  (newsletter.button ?? "Subscribe")
                )}
              </button>
              <span className="hb-ke5-sr" role="status" aria-live="polite">
                {state === "done" ? "Thanks, you are subscribed." : state === "invalid" ? "Enter a valid email address." : ""}
              </span>
            </form>
          </div>
        )}
        <div className="hb-ke5-grid">
          <div className="hb-ke5-about">
            <div>
              <a href="#" className="hb-ke5-brand" aria-label={`${brand} home`}>
                <span className="hb-ke5-mark" aria-hidden="true" />
                {brand}
              </a>
              <p className="hb-ke5-tag">{tagline}</p>
            </div>
            {socials.length > 0 && (
              <div className="hb-ke5-socials">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    className="hb-ke5-soc"
                    aria-label={s.label ?? socialLabels[s.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={socialPaths[s.id]} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="hb-ke5-ct">{col.title}</p>
              <ul className="hb-ke5-ul">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hb-ke5-a">
                      {link.label}
                      {link.badge && <span className="hb-ke5-badge">{link.badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="hb-ke5-bottom">
          <span>{copyright}</span>
          <ul className="hb-ke5-legal" aria-label="Legal">
            {legal.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="hb-ke5-tools">
            {status && (
              <a
                href={status.href}
                className="hb-ke5-status"
                style={{ "--hb-ke5-tone": toneColors[status.tone ?? "ok"] } as React.CSSProperties}
              >
                <span className="hb-ke5-dot" aria-hidden="true" />
                {status.label}
              </a>
            )}
            {languages.length > 0 && (
              <span className="hb-ke5-lang">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M2 8h12M8 2c2 2.2 2 9.8 0 12M8 2c-2 2.2-2 9.8 0 12" />
                </svg>
                <label htmlFor={`${uid}-lang`} className="hb-ke5-sr">
                  Language
                </label>
                <select
                  id={`${uid}-lang`}
                  className="hb-ke5-select"
                  value={lang}
                  onChange={(e) => {
                    if (language === undefined) setInnerLang(e.target.value);
                    onLanguageChange?.(e.target.value);
                  }}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path d="m2.5 4 2.5 2.5L7.5 4" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

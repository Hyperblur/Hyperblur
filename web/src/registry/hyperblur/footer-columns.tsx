"use client";

import * as React from "react";

export type FooterSocialName = "x" | "github" | "linkedin" | "youtube" | "instagram";

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  name: FooterSocialName;
  label?: string;
  href?: string;
}

export interface FooterStatus {
  label: string;
  tone?: "ok" | "warn" | "down";
  href?: string;
}

export interface FooterColumnsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  logo?: React.ReactNode;
  blurb?: string;
  socials?: FooterSocial[];
  columns?: FooterColumn[];
  newsletter?: boolean;
  newsletterTitle?: string;
  onSubscribe?: (email: string) => void;
  legal?: FooterLink[];
  copyright?: string;
  status?: FooterStatus | null;
  accent?: string;
}

const socialIcons: Record<FooterSocialName, { paths: string[]; fill?: boolean; label: string }> = {
  x: {
    label: "X",
    fill: true,
    paths: ["M18.2 3h2.9l-6.4 7.3L22 21h-5.9l-4.6-6-5.3 6H3.3l6.8-7.8L2.8 3h6l4.2 5.5L18.2 3zm-1 16.2h1.6L7.7 4.7H6l11.2 14.5z"],
  },
  github: {
    label: "GitHub",
    paths: [
      "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
    ],
  },
  linkedin: {
    label: "LinkedIn",
    paths: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  },
  youtube: {
    label: "YouTube",
    paths: [
      "M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8.1 1 12 1 12s0 3.9.5 5.6a2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.5-1.7.5-5.6.5-5.6s0-3.9-.5-5.6z",
      "m9.8 15 5.7-3-5.7-3v6z",
    ],
  },
  instagram: {
    label: "Instagram",
    paths: [
      "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z",
      "M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z",
      "M17.5 6.5h.01",
    ],
  },
};

const defaultColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

const defaultSocials: FooterSocial[] = [
  { name: "x", href: "#" },
  { name: "github", href: "#" },
  { name: "linkedin", href: "#" },
  { name: "youtube", href: "#" },
];

const defaultLegal: FooterLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];

const defaultLogo = (
  <>
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h14l-4 18H3z" fill="#2f7bff" />
      <path d="M9 9h6M8 13h6M7 17h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
    <span>Hyperblur</span>
  </>
);

const css = `
.hb-ftc {
  --hb-ftc-a: #2f7bff;
  container: hb-ftc / inline-size;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-ftc *, .hb-ftc *::before, .hb-ftc *::after { box-sizing: border-box; }
.hb-ftc-in {
  padding: 40px 32px 20px;
  border-top: 1px solid #262626;
  background: #0a0a0a;
}
.hb-ftc-top {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) repeat(var(--hb-ftc-n, 3), minmax(0, 1fr));
  gap: 36px 28px;
}
.hb-ftc-brand { display: grid; align-content: start; gap: 24px; min-width: 0; }
.hb-ftc-about { display: grid; gap: 14px; min-width: 0; }
.hb-ftc-logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hb-ftc-blurb { margin: 0; max-width: 34ch; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-ftc-social { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-ftc-sbtn {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #151515;
  box-shadow: inset 0 0 0 1px #262626;
  color: #a1a1a1;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.hb-ftc-sbtn:hover {
  background: color-mix(in srgb, var(--hb-ftc-a) 14%, #151515);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-ftc-a) 45%, #262626);
  color: #fff;
  transform: translateY(-2px);
}
.hb-ftc-sbtn svg { width: 16px; height: 16px; }
.hb-ftc-news { display: grid; gap: 10px; min-width: 0; align-content: start; }
.hb-ftc-ntitle { margin: 0; color: #ededed; font-size: 13px; font-weight: 550; }
.hb-ftc-form {
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 340px;
  padding: 4px;
  border-radius: 12px;
  background: #121212;
  box-shadow: inset 0 0 0 1px #262626;
  transition: box-shadow 0.2s ease;
}
.hb-ftc-form:focus-within { box-shadow: inset 0 0 0 1px var(--hb-ftc-a), 0 0 0 3px color-mix(in srgb, var(--hb-ftc-a) 22%, transparent); }
.hb-ftc-form[data-invalid="true"] { box-shadow: inset 0 0 0 1px #ff5a5f; }
.hb-ftc-input {
  flex: 1;
  min-width: 0;
  height: 32px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 13.5px;
}
.hb-ftc-input::placeholder { color: #6b6b6b; }
.hb-ftc-go {
  display: grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: var(--hb-ftc-a);
  color: #fff;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
}
.hb-ftc-go:hover { filter: brightness(1.12); }
.hb-ftc-go:active { transform: scale(0.94); }
.hb-ftc-go svg { width: 15px; height: 15px; }
.hb-ftc-note { min-height: 16px; margin: 0; color: #6b6b6b; font-size: 12px; line-height: 1.3; }
.hb-ftc-note[data-tone="error"] { color: #ff7a7e; }
.hb-ftc-note[data-tone="ok"] { color: #4cd694; }
.hb-ftc-col { min-width: 0; }
.hb-ftc-h { margin: 0 0 14px; color: #ededed; font-size: 13px; font-weight: 550; letter-spacing: 0.01em; }
.hb-ftc-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-ftc-lk {
  position: relative;
  display: inline-block;
  color: #8f8f8f;
  font-size: 13.5px;
  line-height: 1.3;
  text-decoration: none;
  transition: color 0.2s ease;
}
.hb-ftc-lk::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.hb-ftc-lk:hover { color: #fff; }
.hb-ftc-lk:hover::after { transform: scaleX(1); }
.hb-ftc-lk:focus-visible,
.hb-ftc-sbtn:focus-visible,
.hb-ftc-go:focus-visible,
.hb-ftc-stat:focus-visible {
  outline: 2px solid var(--hb-ftc-a);
  outline-offset: 3px;
  border-radius: 6px;
}
.hb-ftc-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid #1c1c1c;
}
.hb-ftc-copy { margin: 0; color: #6b6b6b; font-size: 12.5px; }
.hb-ftc-legal { display: flex; flex-wrap: wrap; gap: 4px 18px; margin: 0; padding: 0; list-style: none; }
.hb-ftc-legal .hb-ftc-lk { font-size: 12.5px; color: #6b6b6b; }
.hb-ftc-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }
.hb-ftc-stat {
  --hb-ftc-t: #2fd17a;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px 5px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ftc-t) 9%, #0a0a0a);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-ftc-t) 26%, #0a0a0a);
  color: #cfd3d8;
  font-size: 12px;
  line-height: 1;
  text-decoration: none;
}
.hb-ftc-stat[data-tone="warn"] { --hb-ftc-t: #f5a524; }
.hb-ftc-stat[data-tone="down"] { --hb-ftc-t: #ff4d5e; }
.hb-ftc-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-ftc-t); }
.hb-ftc-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--hb-ftc-t);
  animation: hb-ftc-pulse 2s ease-out infinite;
}
@keyframes hb-ftc-pulse {
  0% { transform: scale(1); opacity: 0.6; }
  80%, 100% { transform: scale(3.2); opacity: 0; }
}
@container hb-ftc (max-width: 719px) {
  .hb-ftc-in { padding: 32px 24px 18px; }
  .hb-ftc-top { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ftc-brand { grid-column: 1 / -1; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
}
@container hb-ftc (max-width: 419px) {
  .hb-ftc-in { padding: 28px 18px 16px; }
  .hb-ftc-top { grid-template-columns: minmax(0, 1fr); }
  .hb-ftc-brand { grid-template-columns: minmax(0, 1fr); }
  .hb-ftc-form { max-width: none; }
  .hb-ftc-bar { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ftc-dot::after { animation: none; opacity: 0; }
  .hb-ftc-sbtn, .hb-ftc-lk, .hb-ftc-lk::after, .hb-ftc-go, .hb-ftc-form { transition: none; }
}
`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function SocialIcon({ name }: { name: FooterSocialName }) {
  const icon = socialIcons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.fill ? "currentColor" : "none"}
      stroke={icon.fill ? "none" : "currentColor"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function FooterColumns({
  logo,
  blurb = "Build, ship and measure product experiments from one workspace your whole team can trust.",
  socials = defaultSocials,
  columns = defaultColumns,
  newsletter = true,
  newsletterTitle = "Product updates, once a month",
  onSubscribe,
  legal = defaultLegal,
  copyright = "© 2026 Hyperblur, Inc. All rights reserved.",
  status = { label: "All systems normal", tone: "ok" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: FooterColumnsProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "error" | "done">("idle");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!emailPattern.test(value)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
    onSubscribe?.(value);
  }

  const rootStyle = {
    "--hb-ftc-a": accent,
    "--hb-ftc-n": Math.max(1, columns.length),
    ...style,
  } as React.CSSProperties;

  const note =
    state === "error"
      ? "Enter a valid email address."
      : state === "done"
        ? "Thanks, you are on the list."
        : "No spam. Unsubscribe anytime.";

  const tone = status?.tone ?? "ok";
  const statusInner = status && (
    <>
      <span className="hb-ftc-dot" aria-hidden="true" />
      {status.label}
    </>
  );

  return (
    <footer className={`hb-ftc ${className}`} style={rootStyle} {...rest}>
      <style href="hb-footer-columns" precedence="default">{css}</style>
      <div className="hb-ftc-in">
        <div className="hb-ftc-top">
          <div className="hb-ftc-brand">
            <div className="hb-ftc-about">
              <div className="hb-ftc-logo">{logo ?? defaultLogo}</div>
              {blurb && <p className="hb-ftc-blurb">{blurb}</p>}
              {socials.length > 0 && (
                <ul className="hb-ftc-social">
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a className="hb-ftc-sbtn" href={s.href ?? "#"} aria-label={s.label ?? socialIcons[s.name].label}>
                        <SocialIcon name={s.name} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {newsletter && (
              <div className="hb-ftc-news">
                <p className="hb-ftc-ntitle" id={`${uid}-news`}>{newsletterTitle}</p>
                <form className="hb-ftc-form" data-invalid={state === "error" ? "true" : "false"} onSubmit={submit} noValidate>
                  <input
                    className="hb-ftc-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-labelledby={`${uid}-news`}
                    aria-invalid={state === "error"}
                    aria-describedby={`${uid}-note`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state !== "idle") setState("idle");
                    }}
                  />
                  <button className="hb-ftc-go" type="submit" aria-label="Subscribe">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </form>
                <p className="hb-ftc-note" id={`${uid}-note`} role="status" data-tone={state === "idle" ? "" : state === "error" ? "error" : "ok"}>
                  {note}
                </p>
              </div>
            )}
          </div>
          {columns.map((col) => (
            <nav className="hb-ftc-col" key={col.title} aria-label={col.title}>
              <h3 className="hb-ftc-h">{col.title}</h3>
              <ul className="hb-ftc-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a className="hb-ftc-lk" href={link.href ?? "#"}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="hb-ftc-bar">
          <p className="hb-ftc-copy">{copyright}</p>
          <div className="hb-ftc-meta">
            {legal.length > 0 && (
              <ul className="hb-ftc-legal">
                {legal.map((link) => (
                  <li key={link.label}>
                    <a className="hb-ftc-lk" href={link.href ?? "#"}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {status &&
              (status.href ? (
                <a className="hb-ftc-stat" href={status.href} data-tone={tone}>
                  {statusInner}
                </a>
              ) : (
                <span className="hb-ftc-stat" role="status" data-tone={tone}>
                  {statusInner}
                </span>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";

export interface FooterRevealUnderLink {
  label: string;
  href: string;
}

export interface FooterRevealUnderColumn {
  title: string;
  links: FooterRevealUnderLink[];
}

export interface FooterRevealUnderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  wordmark?: string;
  tagline?: string;
  columns?: FooterRevealUnderColumn[];
  socials?: FooterRevealUnderLink[];
  legal?: FooterRevealUnderLink[];
  newsletterTitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  onSubscribe?: (email: string) => void;
  copyright?: string;
  accent?: string;
  showBackdrop?: boolean;
}

export interface FooterRevealUnderPageProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  radius?: number;
}

const defaultColumns: FooterRevealUnderColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Field guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "System status", href: "#" },
    ],
  },
];

const defaultSocials: FooterRevealUnderLink[] = [
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const defaultLegal: FooterRevealUnderLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const css = `
.hb-zb1 {
  --hb-zb1-a: #2f7bff;
  position: sticky;
  bottom: 0;
  z-index: 0;
  display: block;
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  overflow: hidden;
  isolation: isolate;
  color: #ededed;
  font-family: inherit;
  background:
    radial-gradient(70% 60% at 50% 100%, color-mix(in srgb, var(--hb-zb1-a) 14%, transparent), transparent 70%),
    #0a0a0a;
}
.hb-zb1[data-demo="true"] { position: relative; }
@media (max-width: 640px), (max-height: 600px) {
  .hb-zb1 { position: relative; }
}
.hb-zb1 *, .hb-zb1 *::before, .hb-zb1 *::after { box-sizing: border-box; font-family: inherit; }
.hb-zb1-in {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 40px 24px;
}
.hb-zb1-top {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.4fr);
  gap: 56px;
  align-items: start;
}
.hb-zb1-intro { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
.hb-zb1-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 650; letter-spacing: -0.01em; }
.hb-zb1-mark {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--hb-zb1-a), color-mix(in srgb, var(--hb-zb1-a) 35%, #ffffff));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 6px 18px color-mix(in srgb, var(--hb-zb1-a) 45%, transparent);
}
.hb-zb1-mark::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 3px;
  background: rgba(10, 10, 10, 0.75);
}
.hb-zb1-tag { margin: 0; max-width: 34ch; font-size: 15px; line-height: 1.55; color: #a1a1a1; }
.hb-zb1-form { display: flex; flex-direction: column; gap: 10px; max-width: 380px; }
.hb-zb1-fl { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #8f8f8f; }
.hb-zb1-fr {
  display: flex;
  gap: 6px;
  padding: 5px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-zb1-fr:focus-within {
  border-color: color-mix(in srgb, var(--hb-zb1-a) 70%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-zb1-a) 18%, transparent);
}
.hb-zb1-in-email {
  flex: 1;
  min-width: 0;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  color: #ededed;
  background: transparent;
  border: 0;
  outline: 0;
}
.hb-zb1-in-email::placeholder { color: #6f6f6f; }
.hb-zb1-btn {
  flex: none;
  padding: 10px 18px;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  color: #0a0a0a;
  background: #ededed;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.hb-zb1-btn:hover { background: #ffffff; transform: translateY(-1px); }
.hb-zb1-btn:active { transform: scale(0.97); }
.hb-zb1-btn:focus-visible { outline: 2px solid var(--hb-zb1-a); outline-offset: 2px; }
.hb-zb1-fs { margin: 0; min-height: 18px; font-size: 13px; color: color-mix(in srgb, var(--hb-zb1-a) 55%, #ffffff); }
.hb-zb1-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; min-width: 0; }
.hb-zb1-col { margin: 0; padding: 0; min-width: 0; }
.hb-zb1-ct { margin: 0 0 16px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8f8f8f; }
.hb-zb1-ul { display: flex; flex-direction: column; gap: 11px; margin: 0; padding: 0; list-style: none; }
.hb-zb1-a {
  position: relative;
  display: inline-block;
  font-size: 15px;
  color: #d4d4d4;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zb1-a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: var(--hb-zb1-a);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zb1-a:hover { color: #ffffff; transform: translateX(3px); }
.hb-zb1-a:hover::after { transform: scaleX(1); }
.hb-zb1-a:focus-visible { outline: 2px solid var(--hb-zb1-a); outline-offset: 4px; border-radius: 3px; }
.hb-zb1-wm { position: relative; width: 100%; line-height: 0; user-select: none; -webkit-user-select: none; }
.hb-zb1-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-zb1-t { font-size: 230px; font-weight: 800; font-family: inherit; }
.hb-zb1-sp {
  transform: translateX(var(--hb-zb1-sx, 300px));
  animation: hb-zb1-sweep 7s ease-in-out infinite alternate;
}
.hb-zb1-wm[data-live="true"] .hb-zb1-sp { animation: none; transition: transform 0.25s ease-out; }
.hb-zb1-bot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: #8f8f8f;
}
.hb-zb1-links { display: flex; flex-wrap: wrap; gap: 6px 20px; }
.hb-zb1-links .hb-zb1-a { font-size: 13px; color: #a1a1a1; }
.hb-zb1-stub {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 44px;
  overflow: hidden;
  color: #17171a;
  background:
    radial-gradient(60% 50% at 85% 0%, rgba(255, 190, 120, 0.35), transparent 70%),
    radial-gradient(50% 60% at 0% 100%, rgba(150, 190, 255, 0.35), transparent 70%),
    #f7f5ef;
  border-radius: 0 0 28px 28px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), 0 2px 0 rgba(255, 255, 255, 0.7) inset;
  transform: translateY(-58%);
  animation: hb-zb1-lift 9s cubic-bezier(0.65, 0, 0.25, 1) infinite;
}
.hb-zb1-sn { display: flex; align-items: center; gap: 10px; }
.hb-zb1-sd { width: 12px; height: 12px; border-radius: 4px; background: #17171a; }
.hb-zb1-sb { width: 54px; height: 8px; border-radius: 99px; background: rgba(23, 23, 26, 0.14); }
.hb-zb1-sd + .hb-zb1-sb { margin-left: 6px; }
.hb-zb1-sp2 { margin-left: auto; padding: 7px 14px; border-radius: 99px; font-size: 12px; font-weight: 600; color: #f7f5ef; background: #17171a; }
.hb-zb1-sh { margin: 0; max-width: 14ch; font-size: 54px; font-weight: 650; line-height: 1; letter-spacing: -0.035em; }
.hb-zb1-sc { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: auto; }
.hb-zb1-si { height: 120px; border-radius: 18px; border: 1px solid rgba(23, 23, 26, 0.08); }
.hb-zb1-si:nth-child(1) { background: linear-gradient(160deg, #ffd9a8, #ff9f6e); }
.hb-zb1-si:nth-child(2) { background: linear-gradient(160deg, #cfe0ff, #7fa6ff); }
.hb-zb1-si:nth-child(3) { background: linear-gradient(160deg, #d6f0d2, #8fcf9b); }
.hb-zb1-sk {
  position: absolute;
  right: 44px;
  bottom: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(23, 23, 26, 0.45);
}
.hb-zb1-page {
  position: relative;
  z-index: 1;
  background: #0a0a0a;
  border-radius: 0 0 var(--hb-zb1-r, 28px) var(--hb-zb1-r, 28px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55);
}
@container (max-width: 760px) {
  .hb-zb1-in { padding: 56px 24px 24px; gap: 36px; }
  .hb-zb1-top { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .hb-zb1-stub { padding: 20px 24px; }
  .hb-zb1-sh { font-size: 38px; }
  .hb-zb1-sk { right: 24px; }
}
@container (max-width: 480px) {
  .hb-zb1-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; }
  .hb-zb1-sc { gap: 8px; }
  .hb-zb1-si { height: 70px; }
}
@keyframes hb-zb1-sweep {
  from { transform: translateX(80px); }
  to { transform: translateX(920px); }
}
@keyframes hb-zb1-lift {
  0% { transform: translateY(-58%); }
  26% { transform: translateY(-100%); }
  56% { transform: translateY(-100%); }
  86% { transform: translateY(-6%); }
  100% { transform: translateY(-58%); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zb1-sp, .hb-zb1-stub { animation: none; }
  .hb-zb1-sp { transform: translateX(500px); }
  .hb-zb1-a, .hb-zb1-a::after, .hb-zb1-btn, .hb-zb1-fr { transition: none; }
}
`;

export function FooterRevealUnder({
  brand = "Fieldnote",
  wordmark,
  tagline = "Notes that organize themselves, wherever you happen to write them.",
  columns = defaultColumns,
  socials = defaultSocials,
  legal = defaultLegal,
  newsletterTitle = "A monthly letter, no noise",
  placeholder = "you@studio.com",
  buttonLabel = "Subscribe",
  successMessage = "You are on the list. See you next month.",
  onSubscribe,
  copyright,
  accent = "#2f7bff",
  showBackdrop = false,
  className = "",
  style,
  ...rest
}: FooterRevealUnderProps) {
  const uid = React.useId().replace(/:/g, "");
  const inputId = `${uid}-e`;
  const fade = `${uid}-f`;
  const glow = `${uid}-g`;
  const mask = `${uid}-m`;
  const wmRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const word = (wordmark ?? brand).toUpperCase();
  const year = copyright ?? `${brand} Inc. All rights reserved.`;

  function aim(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = wmRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    el.dataset.live = "true";
    el.style.setProperty("--hb-zb1-sx", `${(((e.clientX - r.left) / r.width) * 1000).toFixed(1)}px`);
  }

  function release() {
    const el = wmRef.current;
    if (!el) return;
    el.dataset.live = "false";
    el.style.removeProperty("--hb-zb1-sx");
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubscribe?.(email);
    setDone(true);
    setEmail("");
  }

  return (
    <footer
      data-demo={showBackdrop ? "true" : "false"}
      className={`hb-zb1 ${className}`.trim()}
      style={{ "--hb-zb1-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-footer-reveal-under" precedence="default">{css}</style>
      <div className="hb-zb1-in">
        <div className="hb-zb1-top">
          <div className="hb-zb1-intro">
            <span className="hb-zb1-brand">
              <span className="hb-zb1-mark" aria-hidden="true" />
              {brand}
            </span>
            <p className="hb-zb1-tag">{tagline}</p>
            <form className="hb-zb1-form" onSubmit={submit}>
              <label className="hb-zb1-fl" htmlFor={inputId}>
                {newsletterTitle}
              </label>
              <div className="hb-zb1-fr">
                <input
                  id={inputId}
                  className="hb-zb1-in-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (done) setDone(false);
                  }}
                />
                <button type="submit" className="hb-zb1-btn">
                  {buttonLabel}
                </button>
              </div>
              <p className="hb-zb1-fs" role="status" aria-live="polite">
                {done ? successMessage : ""}
              </p>
            </form>
          </div>
          <nav className="hb-zb1-cols" aria-label="Footer">
            {columns.map((col) => (
              <div className="hb-zb1-col" key={col.title}>
                <h3 className="hb-zb1-ct">{col.title}</h3>
                <ul className="hb-zb1-ul">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a className="hb-zb1-a" href={l.href}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div
          ref={wmRef}
          className="hb-zb1-wm"
          aria-hidden="true"
          data-live="false"
          onPointerMove={aim}
          onPointerLeave={release}
        >
          <svg className="hb-zb1-svg" viewBox="0 0 1000 176" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
              <radialGradient id={glow}>
                <stop offset="0" style={{ stopColor: "var(--hb-zb1-a)", stopOpacity: 1 }} />
                <stop offset="1" style={{ stopColor: "var(--hb-zb1-a)", stopOpacity: 0 }} />
              </radialGradient>
              <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="176">
                <text className="hb-zb1-t" x="0" y="168" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="#ffffff">
                  {word}
                </text>
              </mask>
            </defs>
            <text className="hb-zb1-t" x="0" y="168" textLength="1000" lengthAdjust="spacingAndGlyphs" fill={`url(#${fade})`}>
              {word}
            </text>
            <g mask={`url(#${mask})`}>
              <rect className="hb-zb1-sp" x="-300" y="-60" width="600" height="300" fill={`url(#${glow})`} />
            </g>
          </svg>
        </div>
        <div className="hb-zb1-bot">
          <span>
            {"©"} {year}
          </span>
          <div className="hb-zb1-links">
            {socials.map((l) => (
              <a key={l.label} className="hb-zb1-a" href={l.href}>
                {l.label}
              </a>
            ))}
            {legal.map((l) => (
              <a key={l.label} className="hb-zb1-a" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      {showBackdrop ? (
        <div className="hb-zb1-stub" aria-hidden="true">
          <div className="hb-zb1-sn">
            <span className="hb-zb1-sd" />
            <span className="hb-zb1-sb" />
            <span className="hb-zb1-sb" />
            <span className="hb-zb1-sb" />
            <span className="hb-zb1-sp2">Get started</span>
          </div>
          <p className="hb-zb1-sh">Software that rests when you do.</p>
          <div className="hb-zb1-sc">
            <span className="hb-zb1-si" />
            <span className="hb-zb1-si" />
            <span className="hb-zb1-si" />
          </div>
          <span className="hb-zb1-sk">Scroll</span>
        </div>
      ) : null}
    </footer>
  );
}

export function FooterRevealUnderPage({
  background,
  radius = 28,
  className = "",
  style,
  children,
  ...rest
}: FooterRevealUnderPageProps) {
  return (
    <div
      className={`hb-zb1-page ${className}`.trim()}
      style={{ "--hb-zb1-r": `${radius}px`, ...(background ? { background } : null), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-footer-reveal-under" precedence="default">{css}</style>
      {children}
    </div>
  );
}

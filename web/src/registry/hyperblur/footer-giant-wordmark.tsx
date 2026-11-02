"use client";

import * as React from "react";

export interface FooterGiantWordmarkLink {
  label: string;
  href: string;
}

export interface FooterGiantWordmarkProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  wordmark?: string;
  statement?: string;
  email?: string;
  links?: FooterGiantWordmarkLink[];
  socials?: FooterGiantWordmarkLink[];
  legal?: FooterGiantWordmarkLink[];
  location?: string;
  copyright?: string;
  accent?: string;
}

const css = `
.hb-ke6 {
  --hb-ke6-accent: #f5a524;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke6 *, .hb-ke6 *::before, .hb-ke6 *::after { box-sizing: border-box; }
.hb-ke6::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -30%;
  width: 90%;
  height: 70%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-ke6-accent) 12%, transparent), transparent);
  transform: translateX(-50%);
  pointer-events: none;
}
.hb-ke6-in { position: relative; max-width: 1120px; margin: 0 auto; padding: 80px 24px 0; }
.hb-ke6-top { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px; }
.hb-ke6-st { margin: 0; max-width: 420px; font-size: clamp(22px, 3.2cqi, 30px); font-weight: 550; letter-spacing: -.025em; line-height: 1.15; }
.hb-ke6-st span { color: #6f6f6f; }
.hb-ke6-mail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: #ededed;
  font-size: 15px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,.2);
  padding-bottom: 3px;
  transition: border-color .2s ease, color .2s ease;
}
.hb-ke6-mail:hover { color: var(--hb-ke6-accent); border-color: var(--hb-ke6-accent); }
.hb-ke6-mail svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
.hb-ke6-mail:hover svg { transform: translate(2px, -2px); }
.hb-ke6-links { display: flex; flex-wrap: wrap; gap: 4px 4px; margin: 0; padding: 0; list-style: none; }
.hb-ke6-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  color: #a1a1a1;
  font-size: 14px;
  text-decoration: none;
  transition: color .18s ease, background-color .18s ease;
}
.hb-ke6-link:hover { color: #ededed; background: rgba(255,255,255,.06); }
.hb-ke6-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  margin-top: 36px;
  padding: 18px 0;
  border-top: 1px solid rgba(255,255,255,.08);
  color: #6f6f6f;
  font-size: 13px;
}
.hb-ke6-meta ul { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 0; padding: 0; list-style: none; }
.hb-ke6-meta a { color: #8f8f8f; text-decoration: none; transition: color .15s ease; }
.hb-ke6-meta a:hover { color: #ededed; }
.hb-ke6-loc { display: inline-flex; align-items: center; gap: 8px; }
.hb-ke6-loc i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ke6-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ke6-accent) 20%, transparent); }
.hb-ke6-soc { margin-left: auto; }
.hb-ke6 a:focus-visible { outline: 2px solid var(--hb-ke6-accent); outline-offset: 2px; border-radius: 6px; }
.hb-ke6-word {
  display: flex;
  justify-content: space-between;
  margin: 8px 0 0;
  font-size: min(calc((100cqi - 48px) / var(--hb-ke6-n) * 1.5), 300px);
  font-weight: 700;
  line-height: .8;
  letter-spacing: -.02em;
  white-space: nowrap;
  user-select: none;
  -webkit-mask-image: linear-gradient(180deg, #000 30%, rgba(0,0,0,.35) 62%, transparent 92%);
  mask-image: linear-gradient(180deg, #000 30%, rgba(0,0,0,.35) 62%, transparent 92%);
  margin-bottom: -.12em;
}
.hb-ke6-l {
  display: inline-block;
  padding-top: .06em;
  color: #ececec;
  opacity: 0;
  translate: 0 55%;
  transition: color .35s ease, transform .5s cubic-bezier(.3,1.5,.5,1);
}
.hb-ke6-word[data-in="true"] .hb-ke6-l { animation: hb-ke6-rise 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: calc(var(--hb-ke6-i) * 70ms); }
.hb-ke6-l:hover { color: var(--hb-ke6-accent); transform: translateY(-5%); }
@keyframes hb-ke6-rise { from { opacity: 0; translate: 0 55%; } to { opacity: 1; translate: 0 0; } }
@container (max-width: 640px) {
  .hb-ke6-in { padding: 56px 16px 0; }
  .hb-ke6-word { font-size: min(calc((100cqi - 32px) / var(--hb-ke6-n) * 1.5), 300px); }
  .hb-ke6-soc { margin-left: 0; }
  .hb-ke6-links { margin-left: -12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke6 *, .hb-ke6 *::before, .hb-ke6 *::after { animation: none !important; transition: none !important; }
  .hb-ke6-l { opacity: 1; translate: none; }
}
`;

const defaultLinks: FooterGiantWordmarkLink[] = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const defaultSocials: FooterGiantWordmarkLink[] = [
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
];

const defaultLegal: FooterGiantWordmarkLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function FooterGiantWordmark({
  wordmark = "nimbus",
  statement = "Quiet software for loud weeks.",
  email = "hello@nimbus.so",
  links = defaultLinks,
  socials = defaultSocials,
  legal = defaultLegal,
  location = "Lisbon, working everywhere",
  copyright = "© 2026 Nimbus Software, Inc.",
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: FooterGiantWordmarkProps) {
  const wordRef = React.useRef<HTMLDivElement>(null);
  const letters = Array.from(wordmark);
  const split = statement.indexOf(" ", Math.floor(statement.length / 2));

  React.useEffect(() => {
    const node = wordRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <footer className={`hb-ke6 ${className}`} style={{ "--hb-ke6-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-footer-giant-wordmark" precedence="default">
        {css}
      </style>
      <div className="hb-ke6-in">
        <div className="hb-ke6-top">
          <div>
            <p className="hb-ke6-st">
              {split > 0 ? (
                <>
                  {statement.slice(0, split)}
                  <span>{statement.slice(split)}</span>
                </>
              ) : (
                statement
              )}
            </p>
            {email && (
              <a href={`mailto:${email}`} className="hb-ke6-mail">
                {email}
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M4 10l6-6M5 4h5v5" />
                </svg>
              </a>
            )}
          </div>
          <nav aria-label="Footer">
            <ul className="hb-ke6-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hb-ke6-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hb-ke6-meta">
          <span>{copyright}</span>
          {location && (
            <span className="hb-ke6-loc">
              <i aria-hidden="true" />
              {location}
            </span>
          )}
          <ul aria-label="Legal">
            {legal.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <ul className="hb-ke6-soc" aria-label="Social">
            {socials.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          ref={wordRef}
          className="hb-ke6-word"
          role="img"
          aria-label={wordmark}
          style={{ "--hb-ke6-n": Math.max(letters.length, 3) } as React.CSSProperties}
        >
          {letters.map((ch, i) => (
            <span key={`${ch}-${i}`} className="hb-ke6-l" aria-hidden="true" style={{ "--hb-ke6-i": i } as React.CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

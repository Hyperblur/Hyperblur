"use client";

import * as React from "react";

export interface FooterLinksRailLink {
  label: string;
  href: string;
}

export interface FooterLinksRailGroup {
  label: string;
  links: FooterLinksRailLink[];
}

export interface FooterLinksRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  copyright?: string;
  groups?: FooterLinksRailGroup[];
  backToTopLabel?: string;
  onBackToTop?: () => void;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-ke8 {
  --hb-ke8-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke8 *, .hb-ke8 *::before, .hb-ke8 *::after { box-sizing: border-box; }
.hb-ke8-stage { position: relative; height: 470px; overflow: hidden; -webkit-mask-image: linear-gradient(transparent, #000 45%); mask-image: linear-gradient(transparent, #000 45%); }
.hb-ke8-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; max-width: 1120px; margin: 0 auto; padding: 40px 24px 0; opacity: .5; }
.hb-ke8-cd { border: 1px solid rgba(255,255,255,.08); border-radius: 18px; background: #111; overflow: hidden; }
.hb-ke8-img { height: 170px; }
.hb-ke8-cb { padding: 18px; }
.hb-ke8-ck { color: #8f8f8f; font-size: 12px; }
.hb-ke8-ct { margin: 8px 0 0; font-size: 17px; font-weight: 600; letter-spacing: -.01em; line-height: 1.3; }
.hb-ke8-end { max-width: 1120px; margin: 0 auto; padding: 56px 24px 0; text-align: center; opacity: .55; }
.hb-ke8-et { margin: 0; font-size: clamp(22px, 3cqi, 30px); font-weight: 600; letter-spacing: -.02em; }
.hb-ke8-es { margin: 8px 0 0; color: #8f8f8f; font-size: 14px; }
.hb-ke8-in { max-width: 1120px; margin: 0 auto; padding: 20px 24px 28px; }
.hb-ke8-rail {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 10px 18px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 999px;
  background: linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 20px 40px -24px rgba(0,0,0,.8);
}
.hb-ke8-brand { display: inline-flex; align-items: center; gap: 9px; flex: none; color: #ededed; font-size: 15px; font-weight: 650; letter-spacing: -.01em; text-decoration: none; border-radius: 8px; }
.hb-ke8-logo { position: relative; width: 22px; height: 22px; flex: none; }
.hb-ke8-logo i { position: absolute; left: 0; height: 4px; border-radius: 2px; background: #ededed; }
.hb-ke8-logo i:nth-child(1) { top: 3px; width: 22px; }
.hb-ke8-logo i:nth-child(2) { top: 9px; width: 15px; background: var(--hb-ke8-accent); }
.hb-ke8-logo i:nth-child(3) { top: 15px; width: 9px; opacity: .5; }
.hb-ke8-id { display: flex; flex-direction: column; gap: 3px; flex: none; }
.hb-ke8-copy { padding-left: 31px; color: #6f6f6f; font-size: 11.5px; white-space: nowrap; }
.hb-ke8-groups {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.hb-ke8-groups::-webkit-scrollbar { display: none; }
.hb-ke8-group {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: none;
  padding: 3px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 999px;
  background: rgba(255,255,255,.02);
}
.hb-ke8-gl {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 6px 0 10px;
  color: #6f6f6f;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-ke8-ul { display: flex; align-items: center; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-ke8-a {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  color: #a1a1a1;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: color .18s ease, background-color .18s ease;
}
.hb-ke8-a:hover { color: #fff; background: rgba(255,255,255,.07); }
.hb-ke8-top {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: none;
  height: 44px;
  margin: 0;
  padding: 0 4px 0 16px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-ke8-top:hover { border-color: color-mix(in srgb, var(--hb-ke8-accent) 55%, transparent); background: color-mix(in srgb, var(--hb-ke8-accent) 10%, #171717); }
.hb-ke8-ar {
  position: relative;
  display: block;
  width: 34px;
  height: 34px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--hb-ke8-accent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 6px 16px -6px var(--hb-ke8-accent);
}
.hb-ke8-ar svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform .45s cubic-bezier(.7,0,.2,1);
}
.hb-ke8-ar svg + svg { transform: translateY(34px); }
.hb-ke8-top:hover .hb-ke8-ar svg:first-child, .hb-ke8-top:focus-visible .hb-ke8-ar svg:first-child { transform: translateY(-34px); }
.hb-ke8-top:hover .hb-ke8-ar svg + svg, .hb-ke8-top:focus-visible .hb-ke8-ar svg + svg { transform: translateY(0); }
.hb-ke8-top[data-launch="true"] .hb-ke8-ar svg + svg { animation: hb-ke8-launch .7s cubic-bezier(.7,0,.2,1); }
.hb-ke8 a:focus-visible, .hb-ke8 button:focus-visible { outline: 2px solid var(--hb-ke8-accent); outline-offset: 2px; }
@keyframes hb-ke8-launch { 0% { transform: translateY(0); } 45% { transform: translateY(-34px); } 46% { transform: translateY(34px); } 100% { transform: translateY(0); } }
@container (max-width: 1199px) {
  .hb-ke8-tl { display: none; }
  .hb-ke8-top { padding: 0 4px; }
}
@container (max-width: 1060px) {
  .hb-ke8-rail { flex-wrap: wrap; border-radius: 24px; padding: 14px; row-gap: 14px; }
  .hb-ke8-id { margin-right: auto; padding-left: 4px; }
  .hb-ke8-groups { order: 3; flex: 1 0 100%; justify-content: flex-start; }
  .hb-ke8-tl { display: inline; }
  .hb-ke8-top { padding: 0 4px 0 16px; }
}
@container (max-width: 860px) {
  .hb-ke8-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ke8-cards > :nth-child(3) { display: none; }
}
@container (max-width: 520px) {
  .hb-ke8-in { padding: 16px 12px 20px; }
  .hb-ke8-groups { flex-direction: column; align-items: flex-start; overflow: visible; }
  .hb-ke8-group { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
  .hb-ke8-tl { display: none; }
  .hb-ke8-top { padding: 0 4px; }
  .hb-ke8-cards { grid-template-columns: minmax(0, 1fr); }
  .hb-ke8-cards > :nth-child(2) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke8 *, .hb-ke8 *::before, .hb-ke8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultGroups: FooterLinksRailGroup[] = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const cards = [
  { kind: "Guide", title: "Routing 40,000 webhooks a minute without a queue", hue: 218 },
  { kind: "Release", title: "Relay 5.2: replay any event from the last 30 days", hue: 262 },
  { kind: "Story", title: "How Parcelwise cut delivery alerts from 9s to 400ms", hue: 168 },
];

export function FooterLinksRail({
  brand = "Relay",
  copyright = "© 2026 Relay Systems",
  groups = defaultGroups,
  backToTopLabel = "Back to top",
  onBackToTop,
  accent = "#2f7bff",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: FooterLinksRailProps) {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function backToTop() {
    const btn = btnRef.current;
    if (btn) {
      btn.dataset.launch = "false";
      void btn.offsetWidth;
      btn.dataset.launch = "true";
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        btn.dataset.launch = "false";
      }, 750);
    }
    if (onBackToTop) {
      onBackToTop();
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer className={`hb-ke8 ${className}`} style={{ "--hb-ke8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-footer-links-rail" precedence="default">
        {css}
      </style>
      {showBackdrop && (
        <div className="hb-ke8-stage" aria-hidden="true">
          <div className="hb-ke8-cards">
            {cards.map((card) => (
              <div key={card.title} className="hb-ke8-cd">
                <div
                  className="hb-ke8-img"
                  style={{
                    background: `radial-gradient(80% 90% at 30% 20%, hsl(${card.hue} 70% 45% / .55), transparent 70%), radial-gradient(60% 70% at 90% 100%, hsl(${card.hue + 40} 70% 50% / .35), transparent 70%), #141414`,
                  }}
                />
                <div className="hb-ke8-cb">
                  <div className="hb-ke8-ck">{card.kind}</div>
                  <p className="hb-ke8-ct">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hb-ke8-end">
            <p className="hb-ke8-et">You reached the end of the journal.</p>
            <p className="hb-ke8-es">New posts every other Thursday.</p>
          </div>
        </div>
      )}
      <div className="hb-ke8-in">
        <div className="hb-ke8-rail">
          <div className="hb-ke8-id">
            <a href="#" className="hb-ke8-brand" aria-label={`${brand} home`}>
              <span className="hb-ke8-logo" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {brand}
            </a>
            {copyright && <span className="hb-ke8-copy">{copyright}</span>}
          </div>
          <div className="hb-ke8-groups">
            {groups.map((group) => (
              <nav key={group.label} className="hb-ke8-group" aria-label={group.label}>
                <span className="hb-ke8-gl" aria-hidden="true">
                  {group.label}
                </span>
                <ul className="hb-ke8-ul">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hb-ke8-a">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <button ref={btnRef} type="button" className="hb-ke8-top" onClick={backToTop} aria-label={backToTopLabel}>
            <span className="hb-ke8-tl" aria-hidden="true">
              {backToTopLabel}
            </span>
            <span className="hb-ke8-ar" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
              </svg>
              <svg viewBox="0 0 16 16">
                <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";

export interface FooterPointerWordmarkLink {
  label: string;
  href: string;
}

export interface FooterPointerWordmarkGroup {
  title: string;
  links: FooterPointerWordmarkLink[];
}

export interface FooterPointerWordmarkProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  wordmark?: string;
  tagline?: string;
  groups?: FooterPointerWordmarkGroup[];
  contact?: FooterPointerWordmarkLink;
  legal?: FooterPointerWordmarkLink[];
  copyright?: string;
  radius?: number;
  lift?: number;
  accent?: string;
}

const css = `
.hb-wc1 {
  --hb-wc1-accent: #8b5cf6;
  --hb-wc1-mx: 50%;
  --hb-wc1-my: 80%;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc1 *, .hb-wc1 *::before, .hb-wc1 *::after { box-sizing: border-box; }
.hb-wc1::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(520px circle at var(--hb-wc1-mx) var(--hb-wc1-my), color-mix(in srgb, var(--hb-wc1-accent) 18%, transparent), transparent 70%);
  opacity: .7;
  transition: opacity .5s ease;
  pointer-events: none;
}
.hb-wc1[data-live="true"]::before { opacity: 1; }
.hb-wc1-inner { max-width: 1180px; margin: 0 auto; padding: 72px 24px 0; }
.hb-wc1-top { display: grid; gap: 40px; padding-bottom: 48px; border-bottom: 1px solid rgba(255, 255, 255, .08); }
.hb-wc1-lead { display: grid; gap: 22px; align-content: start; max-width: 380px; }
.hb-wc1-tag { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 26px; font-weight: 500; line-height: 1.2; letter-spacing: -.02em; color: #ededed; }
.hb-wc1-contact {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  padding: 10px 14px 10px 16px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
  color: #ededed;
  font-size: 14px;
  font-weight: 550;
  text-decoration: none;
  transition: border-color .25s ease, background .25s ease;
}
.hb-wc1-contact:hover { border-color: color-mix(in srgb, var(--hb-wc1-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-wc1-accent) 14%, transparent); }
.hb-wc1-contact:focus-visible, .hb-wc1-link:focus-visible, .hb-wc1-legal a:focus-visible { outline: 2px solid var(--hb-wc1-accent); outline-offset: 3px; border-radius: 6px; }
.hb-wc1-contact svg { width: 14px; height: 14px; transition: transform .35s cubic-bezier(.3, 1.5, .5, 1); }
.hb-wc1-contact:hover svg { transform: translate(2px, -2px); }
.hb-wc1-groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; }
.hb-wc1-gt { margin: 0 0 14px; color: #6f6f6f; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-wc1-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-wc1-link { position: relative; color: #b4b4b4; font-size: 14px; text-decoration: none; transition: color .2s ease; }
.hb-wc1-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background: var(--hb-wc1-accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-wc1-link:hover { color: #fff; }
.hb-wc1-link:hover::after { transform: scaleX(1); transform-origin: left; }
.hb-wc1-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; padding: 20px 0; color: #6f6f6f; font-size: 13px; }
.hb-wc1-legal { display: flex; flex-wrap: wrap; gap: 8px 20px; margin: 0; padding: 0; list-style: none; }
.hb-wc1-legal a { color: #8f8f8f; text-decoration: none; transition: color .2s ease; }
.hb-wc1-legal a:hover { color: #ededed; }
.hb-wc1-mark {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 auto;
  padding: 0 12px;
  max-width: 1400px;
  height: clamp(110px, 24cqi, 330px);
  overflow: hidden;
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: clamp(72px, 19.5cqi, 280px);
  font-weight: 700;
  line-height: .78;
  letter-spacing: -.06em;
  user-select: none;
  touch-action: pan-y;
}
.hb-wc1-ch {
  --hb-wc1-p: 0;
  position: relative;
  display: inline-block;
  transform-origin: 50% 100%;
  transform: translateY(calc(18% - var(--hb-wc1-p) * 18%)) scaleY(calc(1 + var(--hb-wc1-p) * var(--hb-wc1-lift, .32)));
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, .22);
  background: linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, var(--hb-wc1-accent) 70%, #fff) 55%, var(--hb-wc1-accent) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 100% 300%;
  background-position: 0 calc(100% - var(--hb-wc1-p) * 100%);
  transition: transform .5s cubic-bezier(.2, .9, .25, 1.15), background-position .5s ease, -webkit-text-stroke-color .4s ease;
  will-change: transform;
}
.hb-wc1[data-live="false"] .hb-wc1-ch { animation: hb-wc1-idle 6s cubic-bezier(.45, 0, .25, 1) infinite; animation-delay: calc(var(--hb-wc1-i) * -.42s); }
.hb-wc1-fade { position: absolute; left: 0; right: 0; bottom: 0; height: 22%; background: linear-gradient(180deg, transparent, #0a0a0a); pointer-events: none; }
.hb-wc1-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-wc1-idle {
  0%, 100% { transform: translateY(18%) scaleY(1); }
  50% { transform: translateY(8%) scaleY(1.08); background-position: 0 70%; }
}
@container (min-width: 720px) {
  .hb-wc1-inner { padding: 96px 40px 0; }
  .hb-wc1-top { grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); gap: 56px; padding-bottom: 64px; }
  .hb-wc1-groups { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hb-wc1-tag { font-size: 30px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc1-ch, .hb-wc1::before, .hb-wc1-link::after, .hb-wc1-contact svg { transition: none; animation: none !important; }
}
`;

const defaultGroups: FooterPointerWordmarkGroup[] = [
  { title: "Product", links: [{ label: "Canvas", href: "#" }, { label: "Timelines", href: "#" }, { label: "Integrations", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Studio", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Press kit", href: "#" }, { label: "Contact", href: "#" }] },
  { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Templates", href: "#" }, { label: "Community", href: "#" }, { label: "Status", href: "#" }] },
];

const defaultLegal: FooterPointerWordmarkLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];

export function FooterPointerWordmark({
  wordmark = "Velora",
  tagline = "Plan the work, see the whole picture, and ship it with your team.",
  groups = defaultGroups,
  contact = { label: "hello@velora.studio", href: "mailto:hello@velora.studio" },
  legal = defaultLegal,
  copyright = "© 2026 Velora Labs, Inc.",
  radius = 0.22,
  lift = 0.32,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: FooterPointerWordmarkProps) {
  const root = React.useRef<HTMLElement>(null);
  const letters = React.useRef<(HTMLSpanElement | null)[]>([]);
  const frame = React.useRef(0);
  const [live, setLive] = React.useState(false);
  const chars = Array.from(wordmark);

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const reset = () => {
    letters.current.forEach((el) => el?.style.setProperty("--hb-wc1-p", "0"));
    setLive(false);
  };

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = e.clientX;
    const y = e.clientY;
    if (!live) setLive(true);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--hb-wc1-mx", `${(x - r.left).toFixed(0)}px`);
      el.style.setProperty("--hb-wc1-my", `${(y - r.top).toFixed(0)}px`);
      const reach = Math.max(80, r.width * radius);
      letters.current.forEach((ch) => {
        if (!ch) return;
        const b = ch.getBoundingClientRect();
        const d = Math.abs(x - (b.left + b.width / 2));
        const p = Math.max(0, 1 - d / reach);
        const eased = p * p * (3 - 2 * p);
        ch.style.setProperty("--hb-wc1-p", eased.toFixed(3));
      });
    });
  };

  const vars = { "--hb-wc1-accent": accent, "--hb-wc1-lift": lift, ...style } as React.CSSProperties;

  return (
    <footer ref={root} className={`hb-wc1 ${className}`} style={vars} data-live={live ? "true" : "false"} onPointerMove={move} onPointerLeave={reset} {...rest}>
      <style href="hb-footer-pointer-wordmark" precedence="default">{css}</style>
      <div className="hb-wc1-inner">
        <div className="hb-wc1-top">
          <div className="hb-wc1-lead">
            <p className="hb-wc1-tag">{tagline}</p>
            {contact ? (
              <a className="hb-wc1-contact" href={contact.href}>
                {contact.label}
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M4 10l6-6M5 4h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : null}
          </div>
          <nav className="hb-wc1-groups" aria-label="Footer">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="hb-wc1-gt">{g.title}</p>
                <ul className="hb-wc1-list">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a className="hb-wc1-link" href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="hb-wc1-bar">
          <span>{copyright}</span>
          <ul className="hb-wc1-legal">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hb-wc1-mark" aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={`${c}-${i}`}
            ref={(el) => {
              letters.current[i] = el;
            }}
            className="hb-wc1-ch"
            style={{ "--hb-wc1-i": i } as React.CSSProperties}
          >
            {c === " " ? " " : c}
          </span>
        ))}
        <span className="hb-wc1-fade" />
      </div>
      <span className="hb-wc1-sr">{wordmark}</span>
    </footer>
  );
}

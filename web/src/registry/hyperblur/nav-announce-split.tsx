"use client";

import * as React from "react";

export interface NavAnnounceSplitLink {
  label: string;
  href: string;
}

export interface NavAnnounceSplitAnnouncement {
  tag?: string;
  text: string;
  link?: NavAnnounceSplitLink;
}

export interface NavAnnounceSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  announcement?: NavAnnounceSplitAnnouncement | null;
  onDismiss?: () => void;
  links?: NavAnnounceSplitLink[];
  activeIndex?: number;
  login?: NavAnnounceSplitLink | null;
  cta?: NavAnnounceSplitLink | null;
  progress?: number;
  trackScroll?: boolean;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-ke4 {
  --hb-ke4-accent: #e8590c;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #fbfaf6;
  color: #17171a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke4 *, .hb-ke4 *::before, .hb-ke4 *::after { box-sizing: border-box; }
.hb-ke4-strip {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 40px;
  padding: 8px 48px;
  overflow: hidden;
  background: #17171a;
  color: #e9e7e1;
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
}
.hb-ke4-strip::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, color-mix(in srgb, var(--hb-ke4-accent) 28%, transparent) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: hb-ke4-sweep 5.5s cubic-bezier(.4,0,.2,1) 1s infinite;
  pointer-events: none;
}
.hb-ke4-tag {
  position: relative;
  flex: none;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--hb-ke4-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .03em;
  text-transform: uppercase;
}
.hb-ke4-msg { position: relative; }
.hb-ke4-sl { position: relative; display: inline-flex; align-items: center; gap: 4px; margin-left: 4px; color: #fff; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(255,255,255,.35); text-underline-offset: 3px; transition: text-decoration-color .2s ease; }
.hb-ke4-sl:hover { text-decoration-color: #fff; }
.hb-ke4-sl svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .2s ease; }
.hb-ke4-sl:hover svg { transform: translateX(2px); }
.hb-ke4-x {
  position: absolute;
  top: 50%;
  right: 10px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #9a978f;
  cursor: pointer;
  transform: translateY(-50%);
  transition: color .15s ease, background-color .15s ease;
}
.hb-ke4-x:hover { color: #fff; background: rgba(255,255,255,.08); }
.hb-ke4-x svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-ke4-bar { position: relative; z-index: 3; background: rgba(251,250,246,.9); backdrop-filter: blur(10px); }
.hb-ke4-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  max-width: 1120px;
  height: 68px;
  margin: 0 auto;
  padding: 0 24px;
}
.hb-ke4-brand { display: inline-flex; align-items: center; gap: 10px; justify-self: start; color: #17171a; font-size: 18px; font-weight: 700; letter-spacing: -.03em; text-decoration: none; border-radius: 6px; }
.hb-ke4-mark { position: relative; width: 26px; height: 26px; border-radius: 7px; background: #17171a; overflow: hidden; }
.hb-ke4-mark::before, .hb-ke4-mark::after { content: ""; position: absolute; left: 6px; right: 6px; height: 3px; border-radius: 2px; }
.hb-ke4-mark::before { top: 8px; background: #fbfaf6; }
.hb-ke4-mark::after { top: 15px; right: 11px; background: var(--hb-ke4-accent); }
.hb-ke4-links { display: flex; align-items: center; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-ke4-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  color: #55534d;
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-ke4-link::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 5px;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform .38s cubic-bezier(.65,0,.25,1);
}
.hb-ke4-link:hover, .hb-ke4-link:focus-visible, .hb-ke4-link[aria-current="page"] { color: #17171a; }
.hb-ke4-link:hover::after, .hb-ke4-link:focus-visible::after { transform: scaleX(1); transform-origin: 0 50%; }
.hb-ke4-link[aria-current="page"]::after { transform: scaleX(1); background: var(--hb-ke4-accent); }
.hb-ke4-end { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.hb-ke4-login { display: inline-flex; align-items: center; height: 38px; padding: 0 14px; border-radius: 999px; color: #17171a; font-size: 14.5px; font-weight: 500; text-decoration: none; transition: background-color .15s ease; }
.hb-ke4-login:hover { background: rgba(23,23,26,.06); }
.hb-ke4-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 8px 0 16px;
  border-radius: 999px;
  background: #17171a;
  color: #fbfaf6;
  font-size: 14.5px;
  font-weight: 550;
  text-decoration: none;
  box-shadow: 0 1px 0 rgba(255,255,255,.15) inset, 0 6px 16px -8px rgba(23,23,26,.6);
  transition: transform .15s ease, box-shadow .2s ease;
}
.hb-ke4-cta:hover { box-shadow: 0 1px 0 rgba(255,255,255,.15) inset, 0 10px 22px -8px rgba(23,23,26,.55); }
.hb-ke4-cta:active { transform: scale(.97); }
.hb-ke4-ca { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--hb-ke4-accent); overflow: hidden; }
.hb-ke4-ca svg { width: 12px; height: 12px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; }
.hb-ke4-cta:hover .hb-ke4-ca svg { animation: hb-ke4-nudge .5s cubic-bezier(.65,0,.25,1); }
.hb-ke4-menu {
  display: none;
  place-items: center;
  width: 38px;
  height: 38px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(23,23,26,.12);
  border-radius: 999px;
  background: #fff;
  color: #17171a;
  cursor: pointer;
}
.hb-ke4-menu svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-ke4-line { position: relative; height: 1px; background: rgba(23,23,26,.1); }
.hb-ke4-prog {
  position: absolute;
  left: 0;
  top: -1px;
  height: 2px;
  width: 100%;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ke4-accent) 30%, transparent), var(--hb-ke4-accent));
  transform: scaleX(var(--hb-ke4-p, 0));
  transform-origin: 0 50%;
  transition: transform .12s linear;
}
.hb-ke4-prog::after { content: ""; position: absolute; right: -3px; top: -2px; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ke4-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-ke4-accent) 20%, transparent); }
.hb-ke4-sheet { display: none; }
.hb-ke4 a:focus-visible, .hb-ke4 button:focus-visible { outline: 2px solid var(--hb-ke4-accent); outline-offset: 2px; }
.hb-ke4-stage { position: relative; height: 470px; overflow: hidden; -webkit-mask-image: linear-gradient(#000 50%, transparent); mask-image: linear-gradient(#000 50%, transparent); }
.hb-ke4-art { max-width: 720px; margin: 0 auto; padding: 72px 24px 0; opacity: .6; }
.hb-ke4-meta { display: flex; gap: 10px; color: #8a877e; font-size: 13px; }
.hb-ke4-meta b { color: var(--hb-ke4-accent); font-weight: 600; }
.hb-ke4-h { margin: 14px 0 18px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(34px, 5.6cqi, 56px); font-weight: 400; letter-spacing: -.02em; line-height: 1.04; }
.hb-ke4-p { height: 12px; margin-top: 12px; border-radius: 6px; background: rgba(23,23,26,.08); }
.hb-ke4-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-ke4-sweep { 0% { transform: translateX(-100%); } 40%, 100% { transform: translateX(100%); } }
@keyframes hb-ke4-nudge { 0% { transform: translateX(0); } 45% { transform: translateX(16px); } 46% { transform: translateX(-16px); } 100% { transform: translateX(0); } }
@container (max-width: 820px) {
  .hb-ke4-row { grid-template-columns: 1fr auto; height: 60px; padding: 0 16px; }
  .hb-ke4-links, .hb-ke4-login { display: none; }
  .hb-ke4-menu { display: grid; }
  .hb-ke4-strip { padding: 8px 40px 8px 14px; justify-content: flex-start; text-align: left; }
  .hb-ke4-sheet[data-open="true"] { display: block; padding: 8px 16px 16px; border-top: 1px solid rgba(23,23,26,.08); animation: hb-ke4-drop .25s ease both; }
  .hb-ke4-sheet a { display: flex; align-items: center; height: 44px; padding: 0 4px; border-bottom: 1px solid rgba(23,23,26,.06); color: #17171a; font-size: 15px; text-decoration: none; }
  .hb-ke4-sheet a[aria-current="page"] { color: var(--hb-ke4-accent); }
}
@container (max-width: 420px) {
  .hb-ke4-cta { padding: 0 6px 0 12px; font-size: 13.5px; }
}
@keyframes hb-ke4-drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ke4 *, .hb-ke4 *::before, .hb-ke4 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavAnnounceSplitLink[] = [
  { label: "Product", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Company", href: "#" },
];

const defaultAnnouncement: NavAnnounceSplitAnnouncement = {
  tag: "New",
  text: "Ledger 2.0 is live: multi-entity books and same-day payouts.",
  link: { label: "Read the launch post", href: "#" },
};

export function NavAnnounceSplit({
  brand = "Ledger",
  announcement = defaultAnnouncement,
  onDismiss,
  links = defaultLinks,
  activeIndex = 3,
  login = { label: "Log in", href: "#" },
  cta = { label: "Get started", href: "#" },
  progress,
  trackScroll = true,
  accent = "#e8590c",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavAnnounceSplitProps) {
  const uid = React.useId();
  const [dismissed, setDismissed] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const progRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (progress !== undefined || !trackScroll) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const node = progRef.current;
      if (!node) return;
      node.style.setProperty("--hb-ke4-p", value.toFixed(4));
      node.setAttribute("aria-valuenow", String(Math.round(value * 100)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progress, trackScroll]);

  const arrow = (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6h7M6.5 3l3 3-3 3" />
    </svg>
  );

  const value = progress === undefined ? undefined : Math.min(1, Math.max(0, progress)).toFixed(4);

  return (
    <header className={`hb-ke4 ${className}`} style={{ "--hb-ke4-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-nav-announce-split" precedence="default">
        {css}
      </style>
      {announcement && !dismissed && (
        <div className="hb-ke4-strip" role="region" aria-label="Announcement">
          {announcement.tag && <span className="hb-ke4-tag">{announcement.tag}</span>}
          <span className="hb-ke4-msg">
            {announcement.text}
            {announcement.link && (
              <a href={announcement.link.href} className="hb-ke4-sl">
                {announcement.link.label}
                {arrow}
              </a>
            )}
          </span>
          <button
            type="button"
            className="hb-ke4-x"
            aria-label="Dismiss announcement"
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
          >
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
            </svg>
          </button>
        </div>
      )}
      <div className="hb-ke4-bar">
        <nav className="hb-ke4-row" aria-label="Main">
          <a href="#" className="hb-ke4-brand" aria-label={`${brand} home`}>
            <span className="hb-ke4-mark" aria-hidden="true" />
            {brand}
          </a>
          <ul className="hb-ke4-links">
            {links.map((link, i) => (
              <li key={link.label}>
                <a href={link.href} className="hb-ke4-link" aria-current={i === activeIndex ? "page" : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hb-ke4-end">
            {login && (
              <a href={login.href} className="hb-ke4-login">
                {login.label}
              </a>
            )}
            {cta && (
              <a href={cta.href} className="hb-ke4-cta">
                {cta.label}
                <span className="hb-ke4-ca">{arrow}</span>
              </a>
            )}
            <button
              type="button"
              className="hb-ke4-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={`${uid}-sheet`}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {menuOpen ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2.5 5h11M2.5 11h11" />}
              </svg>
            </button>
          </div>
        </nav>
        <div
          id={`${uid}-sheet`}
          className="hb-ke4-sheet"
          data-open={menuOpen ? "true" : "false"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        >
          {links.map((link, i) => (
            <a key={link.label} href={link.href} aria-current={i === activeIndex ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          {login && <a href={login.href}>{login.label}</a>}
        </div>
        <div className="hb-ke4-line">
          <span
            ref={progRef}
            className="hb-ke4-prog"
            role="progressbar"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value === undefined ? undefined : Math.round(Number(value) * 100)}
            style={value === undefined ? undefined : ({ "--hb-ke4-p": value } as React.CSSProperties)}
          />
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-ke4-stage" aria-hidden="true">
          <div className="hb-ke4-art">
            <div className="hb-ke4-meta">
              <b>Engineering</b>
              <span>8 min read</span>
              <span>Oct 28, 2026</span>
            </div>
            <p className="hb-ke4-h">How we close the books for 3,000 companies in four hours</p>
            <div className="hb-ke4-p" style={{ width: "100%" }} />
            <div className="hb-ke4-p" style={{ width: "94%" }} />
            <div className="hb-ke4-p" style={{ width: "97%" }} />
            <div className="hb-ke4-p" style={{ width: "62%" }} />
            <div className="hb-ke4-p" style={{ width: "88%", marginTop: 28 }} />
            <div className="hb-ke4-p" style={{ width: "91%" }} />
          </div>
        </div>
      )}
    </header>
  );
}

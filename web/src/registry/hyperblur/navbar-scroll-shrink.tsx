"use client";

import * as React from "react";

export interface NavbarScrollShrinkLink {
  label: string;
  href: string;
}

export interface NavbarScrollShrinkProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  edition?: string;
  links?: NavbarScrollShrinkLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  utility?: NavbarScrollShrinkLink[];
  cta?: { label: string; href: string } | null;
  compact?: boolean;
  onCompactChange?: (compact: boolean) => void;
  threshold?: number;
  progress?: number;
  sticky?: boolean;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi5 {
  --hb-xi5-accent: #d4ff3f;
  --hb-xi5-p: 0;
  --hb-xi5-ease: cubic-bezier(.22,1,.36,1);
  position: relative;
  z-index: 40;
  box-sizing: border-box;
  width: 100%;
  height: 140px;
  container-type: inline-size;
  color: #f1f0ea;
  font-family: inherit;
  pointer-events: none;
  -webkit-font-smoothing: antialiased;
}
.hb-xi5[data-sticky="true"] { position: sticky; top: 0; }
.hb-xi5 *, .hb-xi5 *::before, .hb-xi5 *::after { box-sizing: border-box; }
.hb-xi5-shell {
  position: relative;
  height: 140px;
  margin: 0;
  border-radius: 0;
  background: #0e0e0c;
  box-shadow: 0 1px 0 rgba(241,240,234,.08);
  pointer-events: auto;
  transition: height .6s var(--hb-xi5-ease), margin .6s var(--hb-xi5-ease), border-radius .6s var(--hb-xi5-ease), background-color .4s ease, box-shadow .6s ease;
}
.hb-xi5[data-compact="true"] .hb-xi5-shell {
  height: 60px;
  margin: 10px 16px 0;
  border-radius: 16px;
  background: rgba(22,22,19,.86);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  backdrop-filter: blur(16px) saturate(1.4);
  box-shadow: 0 0 0 1px rgba(241,240,234,.08) inset, 0 1px 0 rgba(255,255,255,.06) inset, 0 20px 40px -16px rgba(0,0,0,.7);
}
.hb-xi5-in { position: relative; max-width: 1160px; height: 100%; margin: 0 auto; }
.hb-xi5-util {
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  border-bottom: 1px solid rgba(241,240,234,.08);
  color: rgba(241,240,234,.5);
  font-size: 12px;
  transition: opacity .3s ease, transform .5s var(--hb-xi5-ease), visibility 0s linear 0s;
}
.hb-xi5-util b { color: var(--hb-xi5-accent); font-weight: 600; }
.hb-xi5-util nav { display: flex; gap: 18px; }
.hb-xi5-util a { color: inherit; text-decoration: none; transition: color .2s ease; }
.hb-xi5-util a:hover { color: #f1f0ea; }
.hb-xi5[data-compact="true"] .hb-xi5-util { opacity: 0; visibility: hidden; transform: translateY(-10px); transition: opacity .2s ease, transform .4s var(--hb-xi5-ease), visibility 0s linear .4s; }
.hb-xi5-word {
  position: absolute;
  top: 46px;
  left: 50%;
  display: block;
  color: #f1f0ea;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: 44px;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: -.05em;
  white-space: nowrap;
  text-decoration: none;
  transform: translateX(-50%) scale(1);
  transform-origin: 0 0;
  transition: top .6s var(--hb-xi5-ease), left .6s var(--hb-xi5-ease), transform .6s var(--hb-xi5-ease);
  border-radius: 6px;
}
.hb-xi5-word span { color: var(--hb-xi5-accent); }
.hb-xi5[data-compact="true"] .hb-xi5-word { top: 18px; left: 24px; transform: translateX(0) scale(.55); }
.hb-xi5-side { position: absolute; top: 52px; left: 24px; display: flex; flex-direction: column; gap: 2px; color: rgba(241,240,234,.55); font-size: 12px; line-height: 1.4; transition: opacity .3s ease, transform .5s var(--hb-xi5-ease); }
.hb-xi5-side strong { color: #f1f0ea; font-size: 13px; font-weight: 600; }
.hb-xi5[data-compact="true"] .hb-xi5-side { opacity: 0; transform: translateY(-8px); pointer-events: none; }
.hb-xi5-links { position: absolute; top: 96px; left: 50%; display: flex; gap: 2px; margin: 0; padding: 0; list-style: none; transform: translateX(-50%); transition: top .6s var(--hb-xi5-ease); }
.hb-xi5[data-compact="true"] .hb-xi5-links { top: 12px; }
.hb-xi5-link { display: inline-flex; align-items: center; height: 36px; padding: 0 13px; border-radius: 9px; color: rgba(241,240,234,.62); font-size: 14px; font-weight: 500; white-space: nowrap; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-xi5-link:hover { color: #f1f0ea; background: rgba(241,240,234,.06); }
.hb-xi5-link[aria-current="page"] { color: #0e0e0c; background: var(--hb-xi5-accent); }
.hb-xi5-act { position: absolute; top: 48px; right: 24px; display: flex; align-items: center; gap: 8px; transition: top .6s var(--hb-xi5-ease); }
.hb-xi5[data-compact="true"] .hb-xi5-act { top: 10px; }
.hb-xi5-icon { display: grid; place-items: center; width: 40px; height: 40px; margin: 0; padding: 0; border: 0; border-radius: 10px; background: transparent; color: #f1f0ea; cursor: pointer; transition: background-color .2s ease; }
.hb-xi5-icon:hover { background: rgba(241,240,234,.07); }
.hb-xi5-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi5-ring { position: relative; }
.hb-xi5-ring svg.hb-xi5-prog { position: absolute; inset: 2px; width: 36px; height: 36px; transform: rotate(-90deg); opacity: 0; transition: opacity .4s ease; }
.hb-xi5-prog circle { fill: none; stroke-width: 2; }
.hb-xi5-prog circle + circle { stroke: var(--hb-xi5-accent); stroke-linecap: round; stroke-dasharray: 100; stroke-dashoffset: calc(100 - var(--hb-xi5-p) * 100); transition: stroke-dashoffset .15s linear; }
.hb-xi5[data-compact="true"] .hb-xi5-ring svg.hb-xi5-prog { opacity: 1; }
.hb-xi5-cta { display: inline-flex; align-items: center; height: 40px; padding: 0 18px; border-radius: 999px; background: #f1f0ea; color: #0e0e0c; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 0 #fff inset; transition: transform .2s var(--hb-xi5-ease), background-color .2s ease; }
.hb-xi5-cta:hover { background: var(--hb-xi5-accent); }
.hb-xi5-cta:active { transform: scale(.97); }
.hb-xi5-burger { position: absolute; top: 32px; left: 12px; display: none; transition: top .6s var(--hb-xi5-ease); }
.hb-xi5-burger span { position: relative; display: block; width: 18px; height: 12px; }
.hb-xi5-burger span::before, .hb-xi5-burger span::after, .hb-xi5-burger span i { content: ""; position: absolute; left: 0; height: 1.8px; border-radius: 2px; background: currentColor; transition: transform .4s var(--hb-xi5-ease), opacity .2s ease, width .4s var(--hb-xi5-ease); }
.hb-xi5-burger span::before { top: 0; width: 18px; }
.hb-xi5-burger span i { top: 5px; width: 12px; font-style: normal; }
.hb-xi5-burger span::after { top: 10px; width: 15px; }
.hb-xi5-burger[aria-expanded="true"] span::before { width: 18px; transform: translateY(5px) rotate(45deg); }
.hb-xi5-burger[aria-expanded="true"] span i { opacity: 0; }
.hb-xi5-burger[aria-expanded="true"] span::after { width: 18px; transform: translateY(-5px) rotate(-45deg); }
.hb-xi5-sheet { display: none; }
.hb-xi5 a:focus-visible, .hb-xi5 button:focus-visible { outline: 2px solid var(--hb-xi5-accent); outline-offset: 2px; }
.hb-xi5-wrap { position: relative; background: #0e0e0c; }
.hb-xi5-stage { position: relative; height: 580px; overflow: hidden; background: #0e0e0c; color: #f1f0ea; container-type: inline-size; }
.hb-xi5-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; max-width: 1160px; margin: 0 auto; padding: 26px 24px 0; }
.hb-xi5-lead { height: 300px; border-radius: 18px; background: radial-gradient(120% 90% at 20% 10%, #f7c873, transparent 55%), radial-gradient(90% 80% at 90% 90%, #2f6b5a, transparent 60%), linear-gradient(160deg, #a2512f, #1b2b26); }
.hb-xi5-kick { margin-top: 20px; color: var(--hb-xi5-accent); font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.hb-xi5-h { margin: 10px 0 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(26px, 3.6cqi, 40px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; }
.hb-xi5-list { display: grid; gap: 18px; align-content: start; }
.hb-xi5-item { display: grid; grid-template-columns: 84px 1fr; gap: 14px; padding-bottom: 18px; border-bottom: 1px solid rgba(241,240,234,.08); }
.hb-xi5-item span { height: 64px; border-radius: 10px; }
.hb-xi5-item b { display: block; font-size: 15px; font-weight: 600; letter-spacing: -.01em; line-height: 1.3; }
.hb-xi5-item small { display: block; margin-top: 6px; color: rgba(241,240,234,.45); font-size: 12px; }
@keyframes hb-xi5-sheet { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@container (max-width: 900px) {
  .hb-xi5, .hb-xi5-shell { height: 104px; }
  .hb-xi5[data-compact="true"] .hb-xi5-shell { height: 56px; margin: 8px 10px 0; }
  .hb-xi5-util, .hb-xi5-side, .hb-xi5-links, .hb-xi5-cta { display: none; }
  .hb-xi5-burger { display: grid; }
  .hb-xi5-word { top: 30px; transform: translateX(-50%) scale(.72); transform-origin: 50% 0; }
  .hb-xi5[data-compact="true"] .hb-xi5-word { top: 13px; left: 50%; transform: translateX(-50%) scale(.5); }
  .hb-xi5[data-compact="true"] .hb-xi5-burger { top: 8px; }
  .hb-xi5-act { top: 32px; right: 12px; gap: 0; }
  .hb-xi5[data-compact="true"] .hb-xi5-act { top: 8px; }
  .hb-xi5-sheet[data-open="true"] { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px 14px 16px; border-top: 1px solid rgba(241,240,234,.08); background: #0e0e0c; box-shadow: 0 24px 40px -20px rgba(0,0,0,.8); animation: hb-xi5-sheet .35s var(--hb-xi5-ease) both; }
  .hb-xi5[data-compact="true"] .hb-xi5-sheet[data-open="true"] { border-radius: 0 0 16px 16px; background: #161613; }
  .hb-xi5-sheet a { display: flex; align-items: center; height: 44px; padding: 0 14px; border-radius: 10px; background: rgba(241,240,234,.05); color: #f1f0ea; font-size: 14px; font-weight: 500; text-decoration: none; }
  .hb-xi5-sheet a[aria-current="page"] { background: var(--hb-xi5-accent); color: #0e0e0c; }
  .hb-xi5-sheet .hb-xi5-sheet-wide { grid-column: 1 / -1; justify-content: center; background: #f1f0ea; color: #0e0e0c; font-weight: 600; }
  .hb-xi5-grid { grid-template-columns: 1fr; }
  .hb-xi5-list { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi5 *, .hb-xi5 *::before, .hb-xi5 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarScrollShrinkLink[] = [
  { label: "Field guides", href: "#" },
  { label: "Gear", href: "#" },
  { label: "Routes", href: "#" },
  { label: "Essays", href: "#" },
  { label: "Photo", href: "#" },
];

const defaultUtility: NavbarScrollShrinkLink[] = [
  { label: "Shop prints", href: "#" },
  { label: "Newsletter", href: "#" },
  { label: "Log in", href: "#" },
];

export function NavbarScrollShrink({
  brand = "Northbound",
  edition = "Issue 48 · The winter field guide",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  utility = defaultUtility,
  cta = { label: "Subscribe", href: "#" },
  compact,
  onCompactChange,
  threshold = 80,
  progress,
  sticky = true,
  accent = "#d4ff3f",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarScrollShrinkProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const [inner, setInner] = React.useState(defaultActive);
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const current = active ?? inner;
  const isCompact = compact ?? scrolled;
  const notify = React.useRef(onCompactChange);

  React.useEffect(() => {
    notify.current = onCompactChange;
  }, [onCompactChange]);

  React.useEffect(() => {
    if (compact !== undefined && progress !== undefined) return;
    let frame = 0;
    let last = window.scrollY > threshold;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next = last ? y > threshold * 0.5 : y > threshold;
      if (next !== last) {
        last = next;
        if (compact === undefined) setScrolled(next);
        notify.current?.(next);
      }
      if (progress === undefined && rootRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rootRef.current.style.setProperty("--hb-xi5-p", (max > 0 ? Math.min(1, y / max) : 0).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [compact, progress, threshold]);

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
    setOpen(false);
  };

  const word = (
    <>
      {brand}
      <span>.</span>
    </>
  );

  const header = (
    <header
      ref={rootRef}
      className={`hb-xi5 ${className}`}
      data-compact={isCompact ? "true" : "false"}
      data-sticky={sticky && !showBackdrop ? "true" : "false"}
      style={
        {
          "--hb-xi5-accent": accent,
          ...(progress !== undefined ? { "--hb-xi5-p": Math.min(1, Math.max(0, progress)).toFixed(4) } : {}),
          ...style,
        } as React.CSSProperties
      }
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-scroll-shrink" precedence="default">
        {css}
      </style>
      <div className="hb-xi5-shell">
        <div className="hb-xi5-in">
          <div className="hb-xi5-util">
            <span>
              <b>New</b> {edition}
            </span>
            <nav aria-label="Utility">
              {utility.map((u) => (
                <a key={u.label} href={u.href}>
                  {u.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="hb-xi5-side" aria-hidden="true">
            <strong>Saturday edition</strong>
            <span>12 new stories this week</span>
          </div>
          <a href="#" className="hb-xi5-word" aria-label={`${brand} home`}>
            {word}
          </a>
          <nav aria-label="Sections">
            <ul className="hb-xi5-links">
              {links.map((link, i) => (
                <li key={link.label}>
                  <a href={link.href} className="hb-xi5-link" aria-current={i === current ? "page" : undefined} onClick={() => select(i)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="hb-xi5-icon hb-xi5-burger"
            aria-label={open ? "Close sections" : "Open sections"}
            aria-expanded={open}
            aria-controls={`${uid}-sheet`}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">
              <i />
            </span>
          </button>
          <div className="hb-xi5-act">
            <span className="hb-xi5-ring">
              <button type="button" className="hb-xi5-icon" aria-label="Search stories">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="8" cy="8" r="5" />
                  <path d="M12 12l3.5 3.5" />
                </svg>
              </button>
              <svg className="hb-xi5-prog" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="16" stroke="rgba(241,240,234,.12)" />
                <circle cx="18" cy="18" r="16" pathLength={100} />
              </svg>
            </span>
            {cta && (
              <a href={cta.href} className="hb-xi5-cta">
                {cta.label}
              </a>
            )}
          </div>
        </div>
        <div id={`${uid}-sheet`} className="hb-xi5-sheet" data-open={open ? "true" : "false"}>
          {links.map((link, i) => (
            <a key={link.label} href={link.href} aria-current={i === current ? "page" : undefined} onClick={() => select(i)}>
              {link.label}
            </a>
          ))}
          {utility.map((u) => (
            <a key={u.label} href={u.href} onClick={() => setOpen(false)}>
              {u.label}
            </a>
          ))}
          {cta && (
            <a href={cta.href} className="hb-xi5-sheet-wide" onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );

  if (!showBackdrop) return header;

  return (
    <div className="hb-xi5-wrap">
      {header}
      <div className="hb-xi5-stage" aria-hidden="true">
        <div className="hb-xi5-grid">
          <div>
            <div className="hb-xi5-lead" />
            <div className="hb-xi5-kick">Routes · 14 min read</div>
            <h2 className="hb-xi5-h">Four days on the Kungsleden with a 6 kg pack and no regrets</h2>
          </div>
          <div className="hb-xi5-list">
            <div className="hb-xi5-item">
              <span style={{ background: "linear-gradient(140deg, #5b7fa6, #1d2a3a)" }} />
              <div>
                <b>The only three layers you need below freezing</b>
                <small>Gear · 6 min</small>
              </div>
            </div>
            <div className="hb-xi5-item">
              <span style={{ background: "linear-gradient(140deg, #c9a46a, #3d2a17)" }} />
              <div>
                <b>Reading the snowpack before you commit to a line</b>
                <small>Field guides · 9 min</small>
              </div>
            </div>
            <div className="hb-xi5-item">
              <span style={{ background: "linear-gradient(140deg, #7aa58a, #1c3328)" }} />
              <div>
                <b>Why we stopped chasing summits in December</b>
                <small>Essays · 11 min</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

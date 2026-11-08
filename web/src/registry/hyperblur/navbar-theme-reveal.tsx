"use client";

import * as React from "react";

export type NavbarThemeRevealTheme = "dark" | "light";

export interface NavbarThemeRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string } | null;
  theme?: NavbarThemeRevealTheme;
  defaultTheme?: NavbarThemeRevealTheme;
  onThemeChange?: (theme: NavbarThemeRevealTheme) => void;
  duration?: number;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj7 {
  --hb-xj7-accent: #ff5c35;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj7 *, .hb-xj7 *::before, .hb-xj7 *::after { box-sizing: border-box; }
.hb-xj7[data-backdrop="true"] { min-height: 620px; overflow: hidden; }
.hb-xj7-layer {
  --hb-xj7-bg: #0a0a0a;
  --hb-xj7-bar: rgba(17,17,17,.82);
  --hb-xj7-line: #232323;
  --hb-xj7-fg: #ededed;
  --hb-xj7-mute: #8f8f8f;
  --hb-xj7-chip: #1a1a1a;
  --hb-xj7-inv: #ededed;
  --hb-xj7-invfg: #0a0a0a;
  position: relative;
  color: var(--hb-xj7-fg);
}
.hb-xj7-layer[data-theme="light"] {
  --hb-xj7-bg: #f6f5f1;
  --hb-xj7-bar: rgba(255,255,255,.85);
  --hb-xj7-line: #e4e2dc;
  --hb-xj7-fg: #16161a;
  --hb-xj7-mute: #6b6a66;
  --hb-xj7-chip: #ecebe6;
  --hb-xj7-inv: #16161a;
  --hb-xj7-invfg: #ffffff;
}
.hb-xj7[data-backdrop="true"] .hb-xj7-layer { min-height: 620px; background: var(--hb-xj7-bg); }
.hb-xj7-over { position: absolute; inset: 0; z-index: 8; pointer-events: none; clip-path: circle(0px at var(--hb-xj7-cx) var(--hb-xj7-cy)); animation: hb-xj7-wipe var(--hb-xj7-d) ${ease} forwards; }
@keyframes hb-xj7-wipe { to { clip-path: circle(var(--hb-xj7-r) at var(--hb-xj7-cx) var(--hb-xj7-cy)); } }
.hb-xj7-over .hb-xj7-layer { height: 100%; }
.hb-xj7[data-backdrop="false"] .hb-xj7-over { bottom: auto; }
.hb-xj7-bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 64px;
  padding: 0 22px;
  border-bottom: 1px solid var(--hb-xj7-line);
  background: var(--hb-xj7-bar);
  backdrop-filter: blur(14px) saturate(160%);
}
.hb-xj7-brand { display: inline-flex; align-items: center; gap: 10px; color: var(--hb-xj7-fg); font-size: 16px; font-weight: 650; letter-spacing: -.025em; text-decoration: none; }
.hb-xj7-logo { position: relative; width: 26px; height: 26px; border-radius: 50%; background: var(--hb-xj7-fg); overflow: hidden; }
.hb-xj7-logo::after { content: ""; position: absolute; inset: 0 0 0 50%; background: var(--hb-xj7-accent); }
.hb-xj7-links { display: flex; gap: 2px; margin: 0 auto; padding: 0; list-style: none; }
.hb-xj7-link { display: inline-flex; align-items: center; height: 36px; padding: 0 13px; border-radius: 999px; color: var(--hb-xj7-mute); font-size: 14px; font-weight: 500; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-xj7-link:hover { color: var(--hb-xj7-fg); background: var(--hb-xj7-chip); }
.hb-xj7-right { display: flex; align-items: center; gap: 10px; }
.hb-xj7-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 64px;
  height: 34px;
  padding: 3px;
  border: 1px solid var(--hb-xj7-line);
  border-radius: 999px;
  background: var(--hb-xj7-chip);
  cursor: pointer;
  transition: border-color .2s ease;
}
.hb-xj7-toggle:hover { border-color: color-mix(in srgb, var(--hb-xj7-fg) 25%, transparent); }
.hb-xj7-knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--hb-xj7-inv);
  color: var(--hb-xj7-invfg);
  box-shadow: 0 2px 6px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.2);
  transform: translateX(0);
  transition: transform .5s cubic-bezier(.34,1.4,.5,1);
}
.hb-xj7-layer[data-theme="light"] .hb-xj7-knob { transform: translateX(30px); }
.hb-xj7-knob svg { width: 16px; height: 16px; overflow: visible; }
.hb-xj7-bite { transition: transform .5s ${ease}; }
.hb-xj7-rays { transform-origin: 8px 8px; transition: transform .6s ${ease}, opacity .3s ease; }
.hb-xj7-layer[data-theme="dark"] .hb-xj7-rays { transform: rotate(-60deg) scale(.4); opacity: 0; }
.hb-xj7-layer[data-theme="light"] .hb-xj7-bite { transform: translate(8px, -8px); }
.hb-xj7-cta {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--hb-xj7-inv);
  color: var(--hb-xj7-invfg);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .2s ${ease};
}
.hb-xj7-cta:hover { transform: translateY(-1px); }
.hb-xj7-burger { display: none; }
.hb-xj7-sheet { display: none; }
.hb-xj7 a:focus-visible, .hb-xj7 button:focus-visible { outline: 2px solid var(--hb-xj7-accent); outline-offset: 2px; }
@container (max-width: 720px) {
  .hb-xj7-bar { padding: 0 14px; gap: 10px; }
  .hb-xj7-links, .hb-xj7-right .hb-xj7-cta { display: none; }
  .hb-xj7-right { margin-left: auto; }
  .hb-xj7-burger {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--hb-xj7-line);
    border-radius: 999px;
    background: var(--hb-xj7-chip);
    color: var(--hb-xj7-fg);
    cursor: pointer;
  }
  .hb-xj7-burger svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
  .hb-xj7-sheet {
    position: absolute;
    top: 64px;
    left: 10px;
    right: 10px;
    z-index: 4;
    display: block;
    padding: 8px;
    border: 1px solid var(--hb-xj7-line);
    border-radius: 18px;
    background: var(--hb-xj7-bg);
    box-shadow: 0 30px 60px -20px rgba(0,0,0,.5);
    transform-origin: 100% 0;
    animation: hb-xj7-sheet .35s ${ease};
  }
  .hb-xj7-sheet[hidden] { display: none; }
  .hb-xj7-sheet a { display: flex; align-items: center; height: 48px; padding: 0 12px; border-radius: 12px; color: var(--hb-xj7-fg); font-size: 16px; text-decoration: none; }
  .hb-xj7-sheet a:hover { background: var(--hb-xj7-chip); }
  .hb-xj7-sheet .hb-xj7-cta { justify-content: center; margin-top: 6px; height: 46px; color: var(--hb-xj7-invfg); }
}
@keyframes hb-xj7-sheet { from { opacity: 0; transform: translateY(-6px) scale(.97); } }
.hb-xj7-page { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: 72px 22px 40px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
.hb-xj7-page h2 { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(34px, 5.6cqi, 58px); font-weight: 600; line-height: 1.02; letter-spacing: -.045em; }
.hb-xj7-page h2 span { color: var(--hb-xj7-accent); }
.hb-xj7-page p { margin: 16px 0 0; color: var(--hb-xj7-mute); font-size: 16px; line-height: 1.55; }
.hb-xj7-win { border: 1px solid var(--hb-xj7-line); border-radius: 16px; background: var(--hb-xj7-chip); padding: 14px; box-shadow: 0 30px 60px -30px rgba(0,0,0,.4); }
.hb-xj7-dots { display: flex; gap: 6px; margin-bottom: 12px; }
.hb-xj7-dots i { width: 9px; height: 9px; border-radius: 50%; background: var(--hb-xj7-line); font-style: normal; }
.hb-xj7-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.hb-xj7-card { height: 64px; border-radius: 10px; background: var(--hb-xj7-bg); border: 1px solid var(--hb-xj7-line); padding: 8px; }
.hb-xj7-card i { display: block; height: 6px; width: 70%; border-radius: 3px; background: var(--hb-xj7-line); font-style: normal; }
.hb-xj7-card i + i { width: 45%; margin-top: 6px; }
.hb-xj7-card:nth-child(2) i:first-child, .hb-xj7-card:nth-child(4) i:first-child { background: var(--hb-xj7-accent); }
@container (max-width: 720px) { .hb-xj7-page { grid-template-columns: 1fr; padding: 40px 16px; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj7 *, .hb-xj7 *::before, .hb-xj7 *::after { transition: none !important; animation: none !important; }
}
`;

function ThemeGlyph({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <mask id={id}>
        <rect x="-4" y="-4" width="24" height="24" fill="#fff" />
        <circle className="hb-xj7-bite" cx="11" cy="5" r="5" fill="#000" />
      </mask>
      <circle cx="8" cy="8" r="5.5" fill="currentColor" mask={`url(#${id})`} />
      <g className="hb-xj7-rays" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 0.5v1.2M8 14.3v1.2M0.5 8h1.2M14.3 8h1.2M2.7 2.7l.85.85M12.45 12.45l.85.85M2.7 13.3l.85-.85M12.45 3.55l.85-.85" />
      </g>
    </svg>
  );
}

export function NavbarThemeReveal({
  brand = "Paperline",
  links = defaultLinks,
  cta = { label: "Try it free", href: "#signup" },
  theme,
  defaultTheme = "dark",
  onThemeChange,
  duration = 700,
  accent = "#ff5c35",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarThemeRevealProps) {
  const [inner, setInner] = React.useState<NavbarThemeRevealTheme>(defaultTheme);
  const [wipe, setWipe] = React.useState<{ to: NavbarThemeRevealTheme; x: number; y: number; r: number } | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const sheetId = React.useId();
  const maskId = `hb-xj7-m${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const current = theme ?? inner;

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const commit = (to: NavbarThemeRevealTheme) => {
    if (theme === undefined) setInner(to);
    onThemeChange?.(to);
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (wipe) return;
    const to: NavbarThemeRevealTheme = current === "dark" ? "light" : "dark";
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reduce || duration <= 0) {
      commit(to);
      return;
    }
    const box = root.getBoundingClientRect();
    const btn = e.currentTarget.getBoundingClientRect();
    const x = btn.left + btn.width / 2 - box.left;
    const y = btn.top + btn.height / 2 - box.top;
    const h = root.offsetHeight;
    const r = Math.hypot(Math.max(x, box.width - x), Math.max(y, h - y)) + 8;
    setWipe({ to, x, y, r });
  };

  const renderLayer = (t: NavbarThemeRevealTheme, live: boolean) => (
    <div className="hb-xj7-layer" data-theme={t}>
      <nav className="hb-xj7-bar" aria-label={live ? "Main" : undefined}>
        <a className="hb-xj7-brand" href="#top" tabIndex={live ? undefined : -1}>
          <span className="hb-xj7-logo" aria-hidden="true" />
          {brand}
        </a>
        <ul className="hb-xj7-links">
          {links.map((l) => (
            <li key={l.href}>
              <a className="hb-xj7-link" href={l.href} tabIndex={live ? undefined : -1}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hb-xj7-right">
          <button
            type="button"
            className="hb-xj7-toggle"
            role="switch"
            aria-checked={t === "light"}
            aria-label="Light theme"
            tabIndex={live ? undefined : -1}
            onClick={live ? toggle : undefined}
          >
            <span className="hb-xj7-knob">
              <ThemeGlyph id={`${maskId}${live ? "a" : "b"}`} />
            </span>
          </button>
          {cta && (
            <a className="hb-xj7-cta" href={cta.href} tabIndex={live ? undefined : -1}>
              {cta.label}
            </a>
          )}
          <button
            ref={live ? burgerRef : undefined}
            type="button"
            className="hb-xj7-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={live ? sheetId : undefined}
            tabIndex={live ? undefined : -1}
            onClick={live ? () => setMenuOpen(!menuOpen) : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M5 9h14M5 15h14" />}
            </svg>
          </button>
        </div>
      </nav>
      <div className="hb-xj7-sheet" id={live ? sheetId : undefined} hidden={!menuOpen}>
        {links.map((l) => (
          <a key={l.href} href={l.href} tabIndex={live ? undefined : -1} onClick={live ? () => setMenuOpen(false) : undefined}>
            {l.label}
          </a>
        ))}
        {cta && (
          <a className="hb-xj7-cta" href={cta.href} tabIndex={live ? undefined : -1}>
            {cta.label}
          </a>
        )}
      </div>
      {showBackdrop && (
        <div className="hb-xj7-page" aria-hidden="true">
          <div>
            <h2>
              Docs that look sharp at <span>3am</span> and at noon.
            </h2>
            <p>Paperline turns your notes into a published handbook with search, versions and a reading mode for every room.</p>
          </div>
          <div className="hb-xj7-win">
            <div className="hb-xj7-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="hb-xj7-col">
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
              <div className="hb-xj7-card">
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header
      ref={rootRef}
      className={["hb-xj7", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-theme-reveal" precedence="default">
        {css}
      </style>
      {renderLayer(current, true)}
      {wipe && (
        <div
          className="hb-xj7-over"
          aria-hidden="true"
          inert
          style={
            {
              "--hb-xj7-cx": `${wipe.x.toFixed(1)}px`,
              "--hb-xj7-cy": `${wipe.y.toFixed(1)}px`,
              "--hb-xj7-r": `${wipe.r.toFixed(1)}px`,
              "--hb-xj7-d": `${duration}ms`,
            } as React.CSSProperties
          }
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            commit(wipe.to);
            setWipe(null);
          }}
        >
          {renderLayer(wipe.to, false)}
        </div>
      )}
    </header>
  );
}

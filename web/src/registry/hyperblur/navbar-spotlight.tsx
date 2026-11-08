"use client";

import * as React from "react";

export interface NavbarSpotlightLink {
  label: string;
  href: string;
}

export interface NavbarSpotlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavbarSpotlightLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  status?: string | null;
  cta?: { label: string; href: string } | null;
  size?: number;
  idleAt?: number | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi4 {
  --hb-xi4-accent: #5ee7ff;
  --hb-xi4-x: 50%;
  --hb-xi4-y: 50%;
  --hb-xi4-r: 150px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #030304;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi4 *, .hb-xi4 *::before, .hb-xi4 *::after { box-sizing: border-box; }
.hb-xi4-bar { position: relative; z-index: 2; overflow: hidden; background: #050506; }
.hb-xi4-bar::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: rgba(255,255,255,.07); }
.hb-xi4-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.55) 1px, transparent 1.2px);
  background-size: 14px 14px;
  background-position: 7px 7px;
  -webkit-mask-image: radial-gradient(var(--hb-xi4-r) circle at var(--hb-xi4-x) var(--hb-xi4-y), rgba(0,0,0,.5), transparent 70%);
  mask-image: radial-gradient(var(--hb-xi4-r) circle at var(--hb-xi4-x) var(--hb-xi4-y), rgba(0,0,0,.5), transparent 70%);
  opacity: var(--hb-xi4-on, 0);
  transition: opacity .5s ease;
  pointer-events: none;
}
.hb-xi4-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(calc(var(--hb-xi4-r) * 1.4) circle at var(--hb-xi4-x) var(--hb-xi4-y), color-mix(in srgb, var(--hb-xi4-accent) 13%, transparent), transparent 70%);
  opacity: var(--hb-xi4-on, 0);
  transition: opacity .5s ease;
  pointer-events: none;
}
.hb-xi4-beam {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 1px;
  background: radial-gradient(calc(var(--hb-xi4-r) * 1.1) 2px at var(--hb-xi4-x) 50%, var(--hb-xi4-accent), transparent);
  opacity: var(--hb-xi4-on, 0);
  transition: opacity .5s ease;
  pointer-events: none;
}
.hb-xi4-row { position: relative; display: flex; align-items: center; gap: 20px; max-width: 1140px; height: 64px; margin: 0 auto; padding: 0 24px; }
.hb-xi4-lit {
  position: absolute;
  inset: 0;
  z-index: 1;
  -webkit-mask-image: radial-gradient(calc(var(--hb-xi4-r) * .8) circle at var(--hb-xi4-x) var(--hb-xi4-y), #000 0%, rgba(0,0,0,.6) 45%, transparent 100%);
  mask-image: radial-gradient(calc(var(--hb-xi4-r) * .8) circle at var(--hb-xi4-x) var(--hb-xi4-y), #000 0%, rgba(0,0,0,.6) 45%, transparent 100%);
  opacity: var(--hb-xi4-on, 0);
  transition: opacity .5s ease;
  pointer-events: none;
}
.hb-xi4-lit .hb-xi4-brand, .hb-xi4-lit .hb-xi4-link, .hb-xi4-lit .hb-xi4-status { color: #fff; text-shadow: 0 0 18px color-mix(in srgb, var(--hb-xi4-accent) 70%, transparent); }
.hb-xi4-lit .hb-xi4-mark { border-color: var(--hb-xi4-accent); box-shadow: 0 0 14px color-mix(in srgb, var(--hb-xi4-accent) 60%, transparent); }
.hb-xi4-lit .hb-xi4-ghost { border-color: color-mix(in srgb, var(--hb-xi4-accent) 70%, transparent); color: #fff; box-shadow: 0 0 20px -4px var(--hb-xi4-accent); }
.hb-xi4-brand { display: inline-flex; align-items: center; gap: 10px; color: #8a8a8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 14px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; text-decoration: none; border-radius: 6px; }
.hb-xi4-mark { display: grid; place-items: center; width: 24px; height: 24px; border: 1px solid #3a3a40; border-radius: 6px; }
.hb-xi4-mark::before { content: ""; width: 8px; height: 8px; border-radius: 2px; background: currentColor; transform: rotate(45deg); }
.hb-xi4-links { display: flex; align-items: center; gap: 2px; margin: 0 auto; padding: 0; list-style: none; }
.hb-xi4-link { position: relative; display: inline-flex; align-items: center; height: 36px; padding: 0 14px; color: #6e6e74; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 8px; transition: color .25s ease; }
.hb-xi4-link:hover, .hb-xi4-link:focus-visible { color: #d4d4d8; }
.hb-xi4-link[aria-current="page"] { color: #ededed; }
.hb-xi4-link[aria-current="page"]::before { content: ""; position: absolute; left: 14px; right: 14px; top: -14px; height: 2px; border-radius: 0 0 2px 2px; background: var(--hb-xi4-accent); box-shadow: 0 0 12px var(--hb-xi4-accent); }
.hb-xi4-end { display: flex; align-items: center; gap: 14px; }
.hb-xi4-status { display: inline-flex; align-items: center; gap: 8px; color: #6e6e74; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; white-space: nowrap; }
.hb-xi4-status::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 3px rgba(52,211,153,.15); animation: hb-xi4-blink 2.4s ease-in-out infinite; }
.hb-xi4-ghost { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border: 1px solid #2a2a30; border-radius: 9px; color: #c8c8cc; font-size: 13.5px; font-weight: 550; text-decoration: none; background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0)); transition: border-color .25s ease, color .25s ease; }
.hb-xi4-ghost:hover { border-color: #45454d; color: #fff; }
.hb-xi4-ghost svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-xi4-burger { display: none; place-items: center; width: 38px; height: 38px; margin: 0; padding: 0; border: 1px solid #2a2a30; border-radius: 9px; background: transparent; color: #ededed; cursor: pointer; }
.hb-xi4-burger svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-xi4-sheet { display: none; }
.hb-xi4 a:focus-visible, .hb-xi4 button:focus-visible { outline: 2px solid var(--hb-xi4-accent); outline-offset: 2px; }
.hb-xi4-stage { position: relative; height: 640px; overflow: hidden; background: radial-gradient(900px 420px at 50% -10%, color-mix(in srgb, var(--hb-xi4-accent) 9%, transparent), transparent 70%); }
.hb-xi4-hero { max-width: 760px; margin: 0 auto; padding: 96px 24px 0; text-align: center; }
.hb-xi4-chip { display: inline-flex; gap: 8px; padding: 6px 12px; border: 1px solid #222; border-radius: 999px; color: #8a8a8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-xi4-chip b { color: var(--hb-xi4-accent); font-weight: 500; }
.hb-xi4-h { margin: 22px 0 16px; font-size: clamp(34px, 6.4cqi, 62px); font-weight: 600; letter-spacing: -.045em; line-height: 1.02; background: linear-gradient(180deg, #fff 30%, #6e6e74); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hb-xi4-sub { max-width: 500px; margin: 0 auto; color: #8a8a8f; font-size: 16px; line-height: 1.6; }
.hb-xi4-term { max-width: 640px; margin: 44px auto 0; padding: 16px 18px; border: 1px solid #1d1d21; border-radius: 12px; background: #08080a; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; line-height: 1.9; text-align: left; color: #6e6e74; }
.hb-xi4-term b { color: #34d399; font-weight: 500; }
.hb-xi4-term em { color: #f87171; font-style: normal; }
@keyframes hb-xi4-blink { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
@keyframes hb-xi4-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
@container (max-width: 800px) {
  .hb-xi4-links, .hb-xi4-status, .hb-xi4-ghost { display: none; }
  .hb-xi4-end { margin-left: auto; }
  .hb-xi4-burger { display: grid; }
  .hb-xi4-row { height: 58px; padding: 0 16px; }
  .hb-xi4-sheet[data-open="true"] { position: relative; z-index: 2; display: grid; padding: 6px 16px 16px; border-bottom: 1px solid rgba(255,255,255,.07); background: #050506; }
  .hb-xi4-sheet a { display: flex; align-items: center; gap: 14px; height: 48px; border-bottom: 1px solid #141417; color: #a1a1a6; font-size: 15px; text-decoration: none; animation: hb-xi4-in .4s cubic-bezier(.2,.8,.2,1) both; }
  .hb-xi4-sheet a span { width: 24px; color: #45454d; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
  .hb-xi4-sheet a[aria-current="page"] { color: #fff; }
  .hb-xi4-sheet a[aria-current="page"] span { color: var(--hb-xi4-accent); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi4 *, .hb-xi4 *::before, .hb-xi4 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarSpotlightLink[] = [
  { label: "Platform", href: "#" },
  { label: "Detection", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Docs", href: "#" },
];

function Row({
  brand,
  links,
  current,
  status,
  cta,
  onSelect,
  burger,
}: {
  brand: string;
  links: NavbarSpotlightLink[];
  current: number;
  status: string | null;
  cta: { label: string; href: string } | null;
  onSelect?: (i: number) => void;
  burger?: React.ReactNode;
}) {
  const arrow = (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6h7M6.5 3l3 3-3 3" />
    </svg>
  );
  return (
    <>
      <a href="#" className="hb-xi4-brand" aria-label={`${brand} home`}>
        <span className="hb-xi4-mark" aria-hidden="true" />
        {brand}
      </a>
      <ul className="hb-xi4-links">
        {links.map((link, i) => (
          <li key={link.label}>
            <a href={link.href} className="hb-xi4-link" aria-current={i === current ? "page" : undefined} onClick={() => onSelect?.(i)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="hb-xi4-end">
        {status && <span className="hb-xi4-status">{status}</span>}
        {cta && (
          <a href={cta.href} className="hb-xi4-ghost">
            {cta.label}
            {arrow}
          </a>
        )}
        {burger}
      </div>
    </>
  );
}

export function NavbarSpotlight({
  brand = "Nocturne",
  links = defaultLinks,
  active,
  defaultActive = 1,
  onActiveChange,
  status = "All systems normal",
  cta = { label: "Book a demo", href: "#" },
  size = 150,
  idleAt = null,
  accent = "#5ee7ff",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarSpotlightProps) {
  const uid = React.useId();
  const barRef = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultActive);
  const [open, setOpen] = React.useState(false);
  const current = active ?? inner;

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
    setOpen(false);
  };

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    bar.style.setProperty("--hb-xi4-x", `${(e.clientX - r.left).toFixed(1)}px`);
    bar.style.setProperty("--hb-xi4-y", `${(e.clientY - r.top).toFixed(1)}px`);
    bar.style.setProperty("--hb-xi4-on", "1");
  };
  const leave = () => {
    const bar = barRef.current;
    if (!bar) return;
    if (idleAt === null) {
      bar.style.setProperty("--hb-xi4-on", "0");
      return;
    }
    bar.style.setProperty("--hb-xi4-x", `${(idleAt * 100).toFixed(2)}%`);
    bar.style.setProperty("--hb-xi4-y", "50%");
  };

  const idle =
    idleAt === null
      ? {}
      : { "--hb-xi4-x": `${(Math.min(1, Math.max(0, idleAt)) * 100).toFixed(2)}%`, "--hb-xi4-y": "50%", "--hb-xi4-on": "1" };

  return (
    <header
      className={`hb-xi4 ${className}`}
      style={{ "--hb-xi4-accent": accent, "--hb-xi4-r": `${size}px`, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-spotlight" precedence="default">
        {css}
      </style>
      <div
        ref={barRef}
        className="hb-xi4-bar"
        style={idle as React.CSSProperties}
        onPointerMove={track}
        onPointerDown={track}
        onPointerLeave={leave}
      >
        <span className="hb-xi4-glow" aria-hidden="true" />
        <span className="hb-xi4-grid" aria-hidden="true" />
        <nav className="hb-xi4-row" aria-label="Main">
          <Row
            brand={brand}
            links={links}
            current={current}
            status={status}
            cta={cta}
            onSelect={select}
            burger={
              <button
                type="button"
                className="hb-xi4-burger"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls={`${uid}-sheet`}
                onClick={() => setOpen((v) => !v)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d={open ? "M4 4L12 12" : "M2.5 5.5L13.5 5.5"} />
                  <path d={open ? "M4 12L12 4" : "M2.5 10.5L13.5 10.5"} />
                </svg>
              </button>
            }
          />
        </nav>
        <div className="hb-xi4-lit" aria-hidden="true" inert>
          <div className="hb-xi4-row">
            <Row brand={brand} links={links} current={current} status={status} cta={cta} />
          </div>
        </div>
        <span className="hb-xi4-beam" aria-hidden="true" />
      </div>
      <div id={`${uid}-sheet`} className="hb-xi4-sheet" data-open={open ? "true" : "false"}>
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            aria-current={i === current ? "page" : undefined}
            style={{ animationDelay: `${(i * 0.04).toFixed(2)}s` }}
            onClick={() => select(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
        {cta && (
          <a href={cta.href} onClick={() => setOpen(false)}>
            <span>{"->"}</span>
            {cta.label}
          </a>
        )}
      </div>
      {showBackdrop && (
        <div className="hb-xi4-stage" aria-hidden="true">
          <div className="hb-xi4-hero">
            <span className="hb-xi4-chip">
              <b>v3.2</b> Runtime detection for serverless
            </span>
            <h2 className="hb-xi4-h">See every request before it lands.</h2>
            <p className="hb-xi4-sub">Nocturne watches traffic at the edge, scores intent in under 4 ms and blocks the bad actors your WAF lets through.</p>
            <div className="hb-xi4-term">
              <div>
                <b>allow</b> 203.0.113.24 GET /api/orders 200 1.8ms
              </div>
              <div>
                <b>allow</b> 198.51.100.7 POST /checkout 201 3.1ms
              </div>
              <div>
                <em>block</em> 192.0.2.91 POST /login credential stuffing, score 0.97
              </div>
              <div>
                <b>allow</b> 203.0.113.80 GET /assets/app.js 304 0.4ms
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

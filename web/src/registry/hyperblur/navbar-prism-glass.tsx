"use client";

import * as React from "react";

export interface NavbarPrismGlassLink {
  label: string;
  href: string;
  badge?: string;
}

export interface NavbarPrismGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavbarPrismGlassLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  signIn?: { label: string; href: string } | null;
  cta?: { label: string; href: string } | null;
  frost?: number;
  scrollRange?: number;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi1 {
  --hb-xi1-accent: #8fa8ff;
  --hb-xi1-f: .35;
  --hb-xi1-mx: 50%;
  --hb-xi1-lit: 0;
  position: sticky;
  top: 12px;
  z-index: 40;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  padding: 0 16px;
  color: #f2f3f7;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi1 *, .hb-xi1 *::before, .hb-xi1 *::after { box-sizing: border-box; }
.hb-xi1-bar {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,calc(.06 + var(--hb-xi1-f) * .05)), rgba(255,255,255,calc(.02 + var(--hb-xi1-f) * .03))), rgba(14,16,24,calc(.18 + var(--hb-xi1-f) * .5));
  -webkit-backdrop-filter: blur(calc(6px + var(--hb-xi1-f) * 16px)) saturate(calc(1.2 + var(--hb-xi1-f) * .7));
  backdrop-filter: blur(calc(6px + var(--hb-xi1-f) * 16px)) saturate(calc(1.2 + var(--hb-xi1-f) * .7));
  box-shadow: 0 1px 0 rgba(255,255,255,.14) inset, 0 -1px 0 rgba(0,0,0,.25) inset, 0 18px 40px -18px rgba(0,0,0,calc(.35 + var(--hb-xi1-f) * .35)), 0 2px 6px rgba(0,0,0,.18);
  transition: box-shadow .4s ease;
}
.hb-xi1-bar::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(260px 120px at var(--hb-xi1-mx) 0%, rgba(255,255,255,calc(.22 + var(--hb-xi1-lit) * .5)), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.05) 45%, rgba(255,255,255,.12));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
.hb-xi1-sheen {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.hb-xi1-sheen::before {
  content: "";
  position: absolute;
  top: -60%;
  left: var(--hb-xi1-mx);
  width: 280px;
  height: 220%;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, rgba(255,255,255,.12), transparent);
  opacity: var(--hb-xi1-lit);
  transition: opacity .35s ease;
}
.hb-xi1-sheen::after {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,.07), transparent);
}
.hb-xi1-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 60px;
  padding: 0 10px 0 18px;
}
.hb-xi1-brand { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-size: 16px; font-weight: 650; letter-spacing: -.02em; text-decoration: none; border-radius: 8px; }
.hb-xi1-mark { position: relative; width: 24px; height: 24px; border-radius: 50%; background: conic-gradient(from 210deg, #ff9ad5, #8fa8ff, #7cf2d6, #ffe08a, #ff9ad5); box-shadow: 0 0 0 1px rgba(255,255,255,.35) inset, 0 4px 12px -2px rgba(143,168,255,.6); }
.hb-xi1-mark::after { content: ""; position: absolute; inset: 6px; border-radius: 50%; background: rgba(12,14,22,.85); box-shadow: 0 1px 0 rgba(255,255,255,.25); }
.hb-xi1-links { display: flex; align-items: center; gap: 2px; margin: 0 auto; padding: 0; list-style: none; }
.hb-xi1-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 13px;
  border-radius: 12px;
  color: rgba(242,243,247,.68);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color .25s ease, background-color .25s ease, transform .35s cubic-bezier(.2,.8,.2,1);
}
.hb-xi1-link:hover { color: #fff; background: rgba(255,255,255,.07); }
.hb-xi1-link:active { transform: translateY(1px); }
.hb-xi1-link[aria-current="page"] { color: #fff; }
.hb-xi1-link[aria-current="page"]::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 3px;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--hb-xi1-accent);
  box-shadow: 0 0 8px 1px var(--hb-xi1-accent), 0 0 18px 2px color-mix(in srgb, var(--hb-xi1-accent) 50%, transparent);
  animation: hb-xi1-pulse 2.8s ease-in-out infinite;
}
.hb-xi1-badge { padding: 1px 6px; border-radius: 6px; background: color-mix(in srgb, var(--hb-xi1-accent) 22%, transparent); color: color-mix(in srgb, var(--hb-xi1-accent) 60%, #fff); font-size: 10.5px; font-weight: 650; letter-spacing: .02em; box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xi1-accent) 35%, transparent) inset; }
.hb-xi1-end { display: flex; align-items: center; gap: 6px; }
.hb-xi1-in { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 12px; color: rgba(242,243,247,.8); font-size: 14px; font-weight: 500; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-xi1-in:hover { color: #fff; background: rgba(255,255,255,.07); }
.hb-xi1-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 13px;
  background: linear-gradient(180deg, #ffffff, #dfe3ef);
  color: #0d0f17;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 0 #fff inset, 0 -1px 0 rgba(0,0,0,.12) inset, 0 8px 20px -8px rgba(143,168,255,.7);
  transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease;
}
.hb-xi1-cta:hover { transform: translateY(-1px); box-shadow: 0 1px 0 #fff inset, 0 -1px 0 rgba(0,0,0,.12) inset, 0 12px 26px -8px rgba(143,168,255,.85); }
.hb-xi1-cta:active { transform: translateY(0) scale(.98); }
.hb-xi1-burger { display: none; place-items: center; width: 40px; height: 40px; margin: 0; padding: 0; border: 0; border-radius: 12px; background: rgba(255,255,255,.08); color: #fff; cursor: pointer; box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset; }
.hb-xi1-burger span { position: relative; display: block; width: 16px; height: 10px; }
.hb-xi1-burger span::before, .hb-xi1-burger span::after { content: ""; position: absolute; left: 0; right: 0; height: 1.6px; border-radius: 2px; background: currentColor; transition: transform .35s cubic-bezier(.7,0,.2,1), top .35s cubic-bezier(.7,0,.2,1); }
.hb-xi1-burger span::before { top: 1px; }
.hb-xi1-burger span::after { top: 7.4px; }
.hb-xi1-burger[aria-expanded="true"] span::before { top: 4.2px; transform: rotate(45deg); }
.hb-xi1-burger[aria-expanded="true"] span::after { top: 4.2px; transform: rotate(-45deg); }
.hb-xi1-sheet { display: none; }
.hb-xi1 a:focus-visible, .hb-xi1 button:focus-visible { outline: 2px solid var(--hb-xi1-accent); outline-offset: 2px; }
.hb-xi1-stage { position: relative; height: 700px; overflow: hidden; background: #07080d; color: #f2f3f7; container-type: inline-size; }
.hb-xi1-wrap { position: relative; background: #07080d; }
.hb-xi1-wrap > .hb-xi1 { position: absolute; top: 16px; left: 0; right: 0; }
.hb-xi1-orb { position: absolute; border-radius: 50%; filter: blur(48px); opacity: .85; animation: hb-xi1-drift 14s ease-in-out infinite alternate; }
.hb-xi1-hero { position: relative; max-width: 760px; margin: 0 auto; padding: 150px 24px 0; text-align: center; }
.hb-xi1-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 999px; background: rgba(255,255,255,.06); box-shadow: 0 0 0 1px rgba(255,255,255,.1) inset; color: rgba(242,243,247,.8); font-size: 13px; }
.hb-xi1-h { margin: 22px 0 16px; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(36px, 7cqi, 68px); font-weight: 600; letter-spacing: -.04em; line-height: 1; }
.hb-xi1-sub { max-width: 520px; margin: 0 auto; color: rgba(242,243,247,.62); font-size: 17px; line-height: 1.55; }
.hb-xi1-tiles { position: absolute; left: 50%; bottom: -40px; display: flex; gap: 18px; transform: translateX(-50%); }
.hb-xi1-tile { width: 210px; height: 260px; border-radius: 22px; box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset, 0 30px 60px -20px rgba(0,0,0,.7); }
@keyframes hb-xi1-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }
@keyframes hb-xi1-drift { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(40px,-30px,0) scale(1.12); } }
@keyframes hb-xi1-drop { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: none; } }
@container (max-width: 780px) {
  .hb-xi1-links, .hb-xi1-in { display: none; }
  .hb-xi1-end { margin-left: auto; }
  .hb-xi1-burger { display: grid; }
  .hb-xi1-row { height: 56px; padding: 0 8px 0 14px; }
  .hb-xi1-sheet[data-open="true"] { position: relative; display: grid; gap: 2px; padding: 4px 8px 10px; animation: hb-xi1-drop .35s cubic-bezier(.2,.8,.2,1) both; }
  .hb-xi1-sheet a { display: flex; align-items: center; justify-content: space-between; height: 46px; padding: 0 12px; border-radius: 12px; color: rgba(242,243,247,.82); font-size: 15px; font-weight: 500; text-decoration: none; }
  .hb-xi1-sheet a:hover, .hb-xi1-sheet a[aria-current="page"] { background: rgba(255,255,255,.07); color: #fff; }
  .hb-xi1-sheet a svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; opacity: .5; }
  .hb-xi1-tiles { display: none; }
}
@container (max-width: 420px) {
  .hb-xi1-cta { height: 36px; padding: 0 12px; font-size: 13px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi1 *, .hb-xi1 *::before, .hb-xi1 *::after, .hb-xi1-stage * { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarPrismGlassLink[] = [
  { label: "Studio", href: "#" },
  { label: "Presets", href: "#", badge: "New" },
  { label: "Gallery", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Learn", href: "#" },
];

export function NavbarPrismGlass({
  brand = "Halo",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  signIn = { label: "Sign in", href: "#" },
  cta = { label: "Open Studio", href: "#" },
  frost,
  scrollRange = 140,
  accent = "#8fa8ff",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarPrismGlassProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const [inner, setInner] = React.useState(defaultActive);
  const [open, setOpen] = React.useState(false);
  const current = active ?? inner;

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
    setOpen(false);
  };

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (frost !== undefined) {
      node.style.setProperty("--hb-xi1-f", Math.min(1, Math.max(0, frost)).toFixed(3));
      return;
    }
    if (showBackdrop) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const v = Math.min(1, Math.max(0, window.scrollY / Math.max(1, scrollRange)));
      node.style.setProperty("--hb-xi1-f", v.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [frost, scrollRange, showBackdrop]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = rootRef.current;
    if (!node) return;
    const r = e.currentTarget.getBoundingClientRect();
    node.style.setProperty("--hb-xi1-mx", `${(e.clientX - r.left).toFixed(1)}px`);
    node.style.setProperty("--hb-xi1-lit", "1");
  };
  const onLeave = () => rootRef.current?.style.setProperty("--hb-xi1-lit", "0");

  const chevron = (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M5 3l4 4-4 4" />
    </svg>
  );

  const header = (
    <header
      ref={rootRef}
      className={`hb-xi1 ${className}`}
      style={{ "--hb-xi1-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-prism-glass" precedence="default">
        {css}
      </style>
      <div className="hb-xi1-bar" onPointerMove={onMove} onPointerLeave={onLeave}>
        <span className="hb-xi1-sheen" aria-hidden="true" />
        <nav className="hb-xi1-row" aria-label="Main">
          <a href="#" className="hb-xi1-brand" aria-label={`${brand} home`}>
            <span className="hb-xi1-mark" aria-hidden="true" />
            {brand}
          </a>
          <ul className="hb-xi1-links">
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hb-xi1-link"
                  aria-current={i === current ? "page" : undefined}
                  onClick={() => select(i)}
                >
                  {link.label}
                  {link.badge && <span className="hb-xi1-badge">{link.badge}</span>}
                </a>
              </li>
            ))}
          </ul>
          <div className="hb-xi1-end">
            {signIn && (
              <a href={signIn.href} className="hb-xi1-in">
                {signIn.label}
              </a>
            )}
            {cta && (
              <a href={cta.href} className="hb-xi1-cta">
                {cta.label}
              </a>
            )}
            <button
              type="button"
              className="hb-xi1-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={`${uid}-sheet`}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </nav>
        <div id={`${uid}-sheet`} className="hb-xi1-sheet" data-open={open ? "true" : "false"}>
          {links.map((link, i) => (
            <a key={link.label} href={link.href} aria-current={i === current ? "page" : undefined} onClick={() => select(i)}>
              <span>{link.label}</span>
              {chevron}
            </a>
          ))}
          {signIn && (
            <a href={signIn.href} onClick={() => setOpen(false)}>
              <span>{signIn.label}</span>
              {chevron}
            </a>
          )}
        </div>
      </div>
    </header>
  );

  if (!showBackdrop) return header;

  return (
    <div className="hb-xi1-wrap">
      {header}
      <div className="hb-xi1-stage" aria-hidden="true">
        <span className="hb-xi1-orb" style={{ width: 420, height: 420, left: "8%", top: 20, background: "#ff7ac6" }} />
        <span className="hb-xi1-orb" style={{ width: 460, height: 460, right: "6%", top: -60, background: "#5b7cff", animationDelay: "-5s" }} />
        <span className="hb-xi1-orb" style={{ width: 360, height: 360, left: "38%", top: 260, background: "#34e0b8", animationDelay: "-9s" }} />
        <div className="hb-xi1-hero">
          <span className="hb-xi1-eyebrow">Halo 4 · Relight any photo in one pass</span>
          <h2 className="hb-xi1-h">Edit the light, not the pixels.</h2>
          <p className="hb-xi1-sub">Drop a portrait, drag the sun, and Halo rebuilds shadows, reflections and skin tone in real time.</p>
        </div>
        <div className="hb-xi1-tiles">
          <span className="hb-xi1-tile" style={{ background: "linear-gradient(160deg, #ffb38a, #ff5f8f 55%, #46206b)" }} />
          <span className="hb-xi1-tile" style={{ background: "linear-gradient(200deg, #9be7ff, #4c6cff 60%, #1b1d4a)", transform: "translateY(-30px)" }} />
          <span className="hb-xi1-tile" style={{ background: "linear-gradient(170deg, #c6ffdd, #2fbf8f 50%, #0e3b3a)" }} />
        </div>
      </div>
    </div>
  );
}

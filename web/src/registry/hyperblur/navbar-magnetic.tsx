"use client";

import * as React from "react";

export interface NavbarMagneticLink {
  label: string;
  href: string;
}

export interface NavbarMagneticProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavbarMagneticLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  cta?: { label: string; href: string } | null;
  strength?: number;
  radius?: number;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi3 {
  --hb-xi3-accent: #ff7a45;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0b0a09;
  color: #f4efe9;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi3 *, .hb-xi3 *::before, .hb-xi3 *::after { box-sizing: border-box; }
.hb-xi3-bar { position: relative; z-index: 2; }
.hb-xi3-row { display: flex; align-items: center; gap: 24px; max-width: 1160px; height: 84px; margin: 0 auto; padding: 0 28px; }
.hb-xi3-brand { display: inline-flex; align-items: center; gap: 10px; color: #f4efe9; font-family: var(--font-grotesk, inherit); font-size: 19px; font-weight: 700; letter-spacing: -.04em; text-decoration: none; border-radius: 8px; }
.hb-xi3-mark { position: relative; width: 26px; height: 26px; }
.hb-xi3-mark::before { content: ""; position: absolute; inset: 0; border: 2px solid #f4efe9; border-radius: 50%; }
.hb-xi3-mark::after { content: ""; position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border-radius: 50%; background: var(--hb-xi3-accent); box-shadow: 0 0 12px var(--hb-xi3-accent); animation: hb-xi3-orbit 6s linear infinite; transform-origin: -3px 15px; }
.hb-xi3-field { position: relative; display: flex; align-items: center; gap: 6px; margin: 0 auto; padding: 6px; list-style: none; }
.hb-xi3-field li { display: flex; }
.hb-xi3-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  color: rgba(244,239,233,.62);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 999px;
  transition: color .3s ease;
}
.hb-xi3-blob {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(244,239,233,.07);
  box-shadow: 0 0 0 1px rgba(244,239,233,.08) inset;
  opacity: 0;
  transform: translate3d(var(--hb-xi3-bx, 0px), var(--hb-xi3-by, 0px), 0) scale(var(--hb-xi3-bs, .7));
  transition: opacity .35s ease, transform .55s cubic-bezier(.34,1.56,.64,1);
}
.hb-xi3-label { position: relative; display: inline-block; transform: translate3d(var(--hb-xi3-lx, 0px), var(--hb-xi3-ly, 0px), 0); transition: transform .55s cubic-bezier(.34,1.56,.64,1); }
.hb-xi3-link[data-near="true"] .hb-xi3-blob { opacity: 1; transition: opacity .25s ease, transform .18s cubic-bezier(.2,.8,.2,1); }
.hb-xi3-link[data-near="true"] .hb-xi3-label { transition: transform .18s cubic-bezier(.2,.8,.2,1); }
.hb-xi3-link[data-near="true"], .hb-xi3-link:hover, .hb-xi3-link:focus-visible { color: #fff; }
.hb-xi3-link[aria-current="page"] { color: #fff; }
.hb-xi3-link[aria-current="page"] .hb-xi3-label::after { content: ""; position: absolute; left: 50%; bottom: -9px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: var(--hb-xi3-accent); }
.hb-xi3-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 8px 0 22px;
  border-radius: 999px;
  background: #f4efe9;
  color: #0b0a09;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transform: translate3d(var(--hb-xi3-cx, 0px), var(--hb-xi3-cy, 0px), 0);
  transition: transform .6s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
  box-shadow: 0 1px 0 #fff inset, 0 10px 30px -12px rgba(255,122,69,.55);
}
.hb-xi3-cta[data-near="true"] { transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; box-shadow: 0 1px 0 #fff inset, 0 14px 36px -10px rgba(255,122,69,.75); }
.hb-xi3-cta-t { transform: translate3d(calc(var(--hb-xi3-cx, 0px) * .35), calc(var(--hb-xi3-cy, 0px) * .35), 0); transition: inherit; }
.hb-xi3-dot { position: relative; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--hb-xi3-accent); color: #fff; overflow: hidden; }
.hb-xi3-dot svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transform: rotate(-45deg); transition: transform .45s cubic-bezier(.34,1.56,.64,1); }
.hb-xi3-cta:hover .hb-xi3-dot svg, .hb-xi3-cta:focus-visible .hb-xi3-dot svg { transform: rotate(0deg); }
.hb-xi3-cta:active { scale: .97; }
.hb-xi3-burger { display: none; align-items: center; gap: 10px; height: 44px; margin: 0 0 0 auto; padding: 0 16px; border: 1px solid rgba(244,239,233,.16); border-radius: 999px; background: transparent; color: #f4efe9; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; }
.hb-xi3-burger i { position: relative; display: block; width: 14px; height: 8px; font-style: normal; }
.hb-xi3-burger i::before, .hb-xi3-burger i::after { content: ""; position: absolute; left: 0; right: 0; height: 1.6px; border-radius: 2px; background: currentColor; transition: transform .4s cubic-bezier(.7,0,.2,1), top .4s cubic-bezier(.7,0,.2,1); }
.hb-xi3-burger i::before { top: 0; }
.hb-xi3-burger i::after { top: 6.4px; }
.hb-xi3-burger[aria-expanded="true"] i::before { top: 3.2px; transform: rotate(45deg); }
.hb-xi3-burger[aria-expanded="true"] i::after { top: 3.2px; transform: rotate(-45deg); }
.hb-xi3-sheet { display: none; }
.hb-xi3 a:focus-visible, .hb-xi3 button:focus-visible { outline: 2px solid var(--hb-xi3-accent); outline-offset: 3px; }
.hb-xi3-stage { position: relative; height: 620px; overflow: hidden; }
.hb-xi3-hero { max-width: 1160px; margin: 0 auto; padding: 70px 28px 0; }
.hb-xi3-tag { display: inline-flex; align-items: center; gap: 10px; color: rgba(244,239,233,.6); font-size: 14px; }
.hb-xi3-tag::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 4px rgba(61,220,132,.15); }
.hb-xi3-h { margin: 24px 0 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(44px, 10cqi, 128px); font-weight: 700; letter-spacing: -.06em; line-height: .9; }
.hb-xi3-h span { color: var(--hb-xi3-accent); }
.hb-xi3-foot { display: flex; justify-content: space-between; gap: 24px; margin-top: 44px; color: rgba(244,239,233,.55); font-size: 15px; line-height: 1.5; }
.hb-xi3-foot p { max-width: 360px; margin: 0; }
.hb-xi3-logos { display: flex; gap: 28px; align-items: center; color: rgba(244,239,233,.38); font-family: var(--font-grotesk, inherit); font-weight: 700; letter-spacing: -.02em; }
@keyframes hb-xi3-orbit { to { transform: rotate(360deg); } }
@keyframes hb-xi3-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@container (max-width: 820px) {
  .hb-xi3-field, .hb-xi3-cta { display: none; }
  .hb-xi3-burger { display: inline-flex; }
  .hb-xi3-row { height: 68px; padding: 0 18px; }
  .hb-xi3-sheet[data-open="true"] { display: grid; gap: 4px; padding: 6px 18px 22px; border-bottom: 1px solid rgba(244,239,233,.08); }
  .hb-xi3-sheet a { display: flex; align-items: baseline; gap: 14px; padding: 8px 0; color: #f4efe9; font-family: var(--font-grotesk, inherit); font-size: 32px; font-weight: 600; letter-spacing: -.04em; text-decoration: none; animation: hb-xi3-rise .5s cubic-bezier(.2,.8,.2,1) both; }
  .hb-xi3-sheet a small { color: rgba(244,239,233,.4); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: 0; }
  .hb-xi3-sheet a[aria-current="page"] { color: var(--hb-xi3-accent); }
  .hb-xi3-sheet .hb-xi3-sheet-cta { display: inline-flex; justify-content: center; align-items: center; margin-top: 12px; height: 50px; border-radius: 999px; background: #f4efe9; color: #0b0a09; font-family: inherit; font-size: 15px; letter-spacing: 0; }
  .hb-xi3-foot { flex-direction: column; }
  .hb-xi3-logos { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi3 *, .hb-xi3 *::before, .hb-xi3 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarMagneticLink[] = [
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Contact", href: "#" },
];

export function NavbarMagnetic({
  brand = "Orbit",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  cta = { label: "Start a project", href: "#" },
  strength = 0.4,
  radius = 90,
  accent = "#ff7a45",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarMagneticProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultActive);
  const [open, setOpen] = React.useState(false);
  const current = active ?? inner;
  const rowRef = React.useRef<HTMLElement>(null);
  const frame = React.useRef(0);
  const point = React.useRef<{ x: number; y: number } | null>(null);

  const apply = React.useCallback(() => {
    frame.current = 0;
    const row = rowRef.current;
    if (!row) return;
    const p = point.current;
    row.querySelectorAll<HTMLElement>("[data-hb-xi3-mag]").forEach((el) => {
      const isCta = el.dataset.hbXi3Mag === "cta";
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const reach = isCta ? radius * 1.3 : radius;
      if (!p) {
        el.dataset.near = "false";
        el.style.removeProperty(isCta ? "--hb-xi3-cx" : "--hb-xi3-lx");
        el.style.removeProperty(isCta ? "--hb-xi3-cy" : "--hb-xi3-ly");
        el.style.removeProperty("--hb-xi3-bx");
        el.style.removeProperty("--hb-xi3-by");
        el.style.removeProperty("--hb-xi3-bs");
        return;
      }
      const dx = p.x - cx;
      const dy = p.y - cy;
      const half = Math.max(r.width, r.height) / 2;
      const d = Math.hypot(dx, dy);
      const near = d < half + reach * 0.35;
      const pull = Math.max(0, 1 - Math.max(0, d - half * 0.5) / (half + reach));
      const k = strength * pull;
      el.dataset.near = near ? "true" : "false";
      if (isCta) {
        el.style.setProperty("--hb-xi3-cx", `${(dx * k * 0.6).toFixed(2)}px`);
        el.style.setProperty("--hb-xi3-cy", `${(dy * k * 0.6).toFixed(2)}px`);
        return;
      }
      el.style.setProperty("--hb-xi3-lx", `${(dx * k * 0.5).toFixed(2)}px`);
      el.style.setProperty("--hb-xi3-ly", `${(dy * k * 0.5).toFixed(2)}px`);
      el.style.setProperty("--hb-xi3-bx", `${(dx * k * 0.28).toFixed(2)}px`);
      el.style.setProperty("--hb-xi3-by", `${(dy * k * 0.28).toFixed(2)}px`);
      el.style.setProperty("--hb-xi3-bs", near ? (1 + pull * 0.06).toFixed(3) : ".7");
    });
  }, [radius, strength]);

  React.useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  const schedule = () => {
    if (!frame.current) frame.current = window.requestAnimationFrame(apply);
  };

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    point.current = { x: e.clientX, y: e.clientY };
    schedule();
  };
  const onLeave = () => {
    point.current = null;
    schedule();
  };

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
    setOpen(false);
  };

  return (
    <header
      className={`hb-xi3 ${className}`}
      style={{ "--hb-xi3-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-magnetic" precedence="default">
        {css}
      </style>
      <div className="hb-xi3-bar">
        <nav ref={rowRef} className="hb-xi3-row" aria-label="Main" onPointerMove={onMove} onPointerLeave={onLeave}>
          <a href="#" className="hb-xi3-brand" aria-label={`${brand} home`}>
            <span className="hb-xi3-mark" aria-hidden="true" />
            {brand}
          </a>
          <ul className="hb-xi3-field">
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hb-xi3-link"
                  data-hb-xi3-mag="link"
                  data-near="false"
                  aria-current={i === current ? "page" : undefined}
                  onClick={() => select(i)}
                >
                  <span className="hb-xi3-blob" aria-hidden="true" />
                  <span className="hb-xi3-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {cta && (
            <a href={cta.href} className="hb-xi3-cta" data-hb-xi3-mag="cta" data-near="false">
              <span className="hb-xi3-cta-t">{cta.label}</span>
              <span className="hb-xi3-dot" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
          )}
          <button
            type="button"
            className="hb-xi3-burger"
            aria-expanded={open}
            aria-controls={`${uid}-sheet`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
            <i aria-hidden="true" />
          </button>
        </nav>
        <div id={`${uid}-sheet`} className="hb-xi3-sheet" data-open={open ? "true" : "false"}>
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={i === current ? "page" : undefined}
              style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}
              onClick={() => select(i)}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              {link.label}
            </a>
          ))}
          {cta && (
            <a href={cta.href} className="hb-xi3-sheet-cta" onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          )}
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xi3-stage" aria-hidden="true">
          <div className="hb-xi3-hero">
            <span className="hb-xi3-tag">Booking projects for March 2027</span>
            <h2 className="hb-xi3-h">
              We build brands
              <br />
              that <span>move.</span>
            </h2>
            <div className="hb-xi3-foot">
              <p>Identity, product and motion for founders who would rather be remembered than merely seen. Based in Lisbon, working everywhere.</p>
              <div className="hb-xi3-logos">
                <span>Northwind</span>
                <span>Kestrel</span>
                <span>Pallas</span>
                <span>Fjord</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

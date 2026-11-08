"use client";

import * as React from "react";

export interface NavbarSplitLogoLink {
  label: string;
  href: string;
}

export interface NavbarSplitLogoProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  left?: NavbarSplitLogoLink[];
  right?: NavbarSplitLogoLink[];
  activeHref?: string;
  bagCount?: number;
  onBagClick?: () => void;
  featured?: { eyebrow: string; title: string; href: string } | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi10 {
  --hb-xi10-accent: #c9a77c;
  --hb-xi10-ink: #ece5d8;
  --hb-xi10-ease: cubic-bezier(.65,0,.35,1);
  --hb-xi10-out: cubic-bezier(.22,1,.36,1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0f0d0b;
  color: var(--hb-xi10-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi10 *, .hb-xi10 *::before, .hb-xi10 *::after { box-sizing: border-box; }
.hb-xi10-bar { position: relative; z-index: 2; border-bottom: 1px solid rgba(236,229,216,.1); background: #0f0d0b; }
.hb-xi10-row { position: relative; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; max-width: 1240px; height: 84px; margin: 0 auto; padding: 0 32px; }
.hb-xi10-side { display: flex; align-items: center; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-xi10-side[data-side="right"] { justify-content: flex-end; }
.hb-xi10-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  color: rgba(236,229,216,.62);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 6px;
  background: none;
  border: 0;
  margin: 0;
  font-family: inherit;
  cursor: pointer;
  transition: color .35s ease, letter-spacing .5s var(--hb-xi10-out);
}
.hb-xi10-link:hover, .hb-xi10-link:focus-visible { color: var(--hb-xi10-ink); letter-spacing: .22em; }
.hb-xi10-link[aria-current="page"] { color: var(--hb-xi10-ink); }
.hb-xi10-link[aria-current="page"]::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--hb-xi10-accent); }
.hb-xi10-count { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: var(--hb-xi10-accent); color: #1a140d; font-size: 11px; font-weight: 700; letter-spacing: 0; animation: hb-xi10-bump .5s var(--hb-xi10-out); }
.hb-xi10-logo { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 0 28px; color: var(--hb-xi10-ink); text-decoration: none; border-radius: 8px; }
.hb-xi10-mark { width: 26px; height: 26px; color: var(--hb-xi10-accent); transition: transform .8s var(--hb-xi10-out); }
.hb-xi10[data-side="left"] .hb-xi10-mark { transform: rotate(-45deg); }
.hb-xi10[data-side="right"] .hb-xi10-mark { transform: rotate(45deg); }
.hb-xi10-mark path { fill: currentColor; }
.hb-xi10-word { font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: 17px; font-weight: 600; letter-spacing: .42em; margin-right: -.42em; text-transform: uppercase; line-height: 1; }
.hb-xi10-wire {
  position: absolute;
  top: 50%;
  height: 1px;
  left: var(--hb-xi10-wl, 50%);
  width: var(--hb-xi10-ww, 0px);
  pointer-events: none;
  background: linear-gradient(90deg, rgba(201,167,124,0), var(--hb-xi10-accent));
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform .55s var(--hb-xi10-ease);
}
.hb-xi10-wire[data-side="right"] { background: linear-gradient(270deg, rgba(201,167,124,0), var(--hb-xi10-accent)); transform-origin: 0 50%; }
.hb-xi10-wire[data-on="true"] { transform: scaleX(1); transition: transform .7s var(--hb-xi10-out); }
.hb-xi10-wire::after { content: ""; position: absolute; top: -2px; width: 5px; height: 5px; border-radius: 50%; background: var(--hb-xi10-accent); box-shadow: 0 0 10px var(--hb-xi10-accent); }
.hb-xi10-wire[data-side="left"]::after { left: 0; }
.hb-xi10-wire[data-side="right"]::after { right: 0; }
.hb-xi10-ib { display: none; place-items: center; width: 40px; height: 40px; margin: 0; padding: 0; border: 0; border-radius: 10px; background: transparent; color: var(--hb-xi10-ink); cursor: pointer; }
.hb-xi10-ib svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi10-ib i { position: relative; display: block; width: 20px; height: 10px; font-style: normal; }
.hb-xi10-ib i::before, .hb-xi10-ib i::after { content: ""; position: absolute; left: 0; height: 1.5px; background: currentColor; transition: transform .5s var(--hb-xi10-out), width .5s var(--hb-xi10-out), top .5s var(--hb-xi10-out); }
.hb-xi10-ib i::before { top: 0; width: 20px; }
.hb-xi10-ib i::after { top: 8.5px; width: 12px; }
.hb-xi10-ib[aria-expanded="true"] i::before { top: 4.25px; transform: rotate(45deg); }
.hb-xi10-ib[aria-expanded="true"] i::after { top: 4.25px; width: 20px; transform: rotate(-45deg); }
.hb-xi10-bag { position: relative; }
.hb-xi10-bag .hb-xi10-count { position: absolute; top: 3px; right: 0; min-width: 17px; height: 17px; padding: 0 4px; font-size: 10px; box-shadow: 0 0 0 2px #0f0d0b; }
.hb-xi10-sheet { display: none; }
.hb-xi10 a:focus-visible, .hb-xi10 button:focus-visible { outline: 1.5px solid var(--hb-xi10-accent); outline-offset: 3px; }
.hb-xi10-stage { position: relative; height: 620px; overflow: hidden; }
.hb-xi10-ed { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; height: 100%; }
.hb-xi10-pic { position: relative; overflow: hidden; }
.hb-xi10-pic::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(15,13,11,.75)); }
.hb-xi10-cap { position: absolute; left: 32px; bottom: 120px; z-index: 1; }
.hb-xi10-cap small { display: block; color: var(--hb-xi10-accent); font-size: 11px; font-weight: 600; letter-spacing: .24em; text-transform: uppercase; }
.hb-xi10-cap b { display: block; margin-top: 10px; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(30px, 4.4cqi, 54px); font-weight: 500; letter-spacing: -.03em; line-height: 1; }
.hb-xi10-cap span { display: inline-block; margin-top: 16px; padding-bottom: 4px; border-bottom: 1px solid currentColor; font-size: 12px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
@keyframes hb-xi10-bump { 0% { transform: scale(.6); } 55% { transform: scale(1.18); } 100% { transform: scale(1); } }
@keyframes hb-xi10-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@container (max-width: 860px) {
  .hb-xi10-row { grid-template-columns: 1fr auto 1fr; height: 64px; padding: 0 12px; }
  .hb-xi10-row > .hb-xi10-side, .hb-xi10-wire { display: none; }
  .hb-xi10-ib { display: grid; }
  .hb-xi10-ib.hb-xi10-bag { justify-self: end; }
  .hb-xi10-logo { grid-column: 2; flex-direction: row; gap: 10px; padding: 0; }
  .hb-xi10-mark { width: 20px; height: 20px; }
  .hb-xi10-word { font-size: 14px; letter-spacing: .34em; margin-right: -.34em; }
  .hb-xi10-sheet[data-open="true"] { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; padding: 18px 20px 22px; border-bottom: 1px solid rgba(236,229,216,.1); background: #12100d; }
  .hb-xi10-sheet a { display: block; padding: 11px 0; border-bottom: 1px solid rgba(236,229,216,.07); color: var(--hb-xi10-ink); font-size: 13px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; text-decoration: none; animation: hb-xi10-rise .5s var(--hb-xi10-out) both; }
  .hb-xi10-sheet a[aria-current="page"] { color: var(--hb-xi10-accent); }
  .hb-xi10-feat { grid-column: 1 / -1; display: flex !important; align-items: flex-end; height: 130px; margin-top: 16px; padding: 16px !important; border: 0 !important; border-radius: 4px; background: linear-gradient(160deg, #8a6a4a, #2b2018 70%); letter-spacing: 0 !important; text-transform: none !important; }
  .hb-xi10-feat small { display: block; color: var(--hb-xi10-accent); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; }
  .hb-xi10-feat b { display: block; margin-top: 4px; font-size: 18px; font-weight: 600; letter-spacing: -.01em; }
  .hb-xi10-ed { grid-template-columns: 1fr; }
  .hb-xi10-ed .hb-xi10-pic + .hb-xi10-pic { display: none; }
  .hb-xi10-cap { left: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi10 *, .hb-xi10 *::before, .hb-xi10 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLeft: NavbarSplitLogoLink[] = [
  { label: "Women", href: "#women" },
  { label: "Men", href: "#men" },
  { label: "Home", href: "#home" },
];

const defaultRight: NavbarSplitLogoLink[] = [
  { label: "Journal", href: "#journal" },
  { label: "Stores", href: "#stores" },
  { label: "Account", href: "#account" },
];

export function NavbarSplitLogo({
  brand = "Aster",
  left = defaultLeft,
  right = defaultRight,
  activeHref = "#women",
  bagCount = 2,
  onBagClick,
  featured = { eyebrow: "Winter 26", title: "Quiet wool, made in Porto", href: "#" },
  accent = "#c9a77c",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarSplitLogoProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const rowRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);
  const wireL = React.useRef<HTMLSpanElement>(null);
  const wireR = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);

  const aim = (el: HTMLElement | null, side: "left" | "right" | null) => {
    const root = rootRef.current;
    const row = rowRef.current;
    const logo = logoRef.current;
    if (!root || !row || !logo) return;
    root.dataset.side = side ?? "";
    [wireL.current, wireR.current].forEach((w) => {
      if (w) w.dataset.on = "false";
    });
    if (!el || !side) return;
    const rr = row.getBoundingClientRect();
    const lr = logo.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const wire = side === "left" ? wireL.current : wireR.current;
    if (!wire) return;
    const start = side === "left" ? er.right + 6 - rr.left : lr.right - 8 - rr.left;
    const end = side === "left" ? lr.left + 8 - rr.left : er.left - 6 - rr.left;
    wire.style.setProperty("--hb-xi10-wl", `${start.toFixed(1)}px`);
    wire.style.setProperty("--hb-xi10-ww", `${Math.max(0, end - start).toFixed(1)}px`);
    wire.dataset.on = "true";
  };

  const bag = (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 6.5h11l-.8 10h-9.4zM7.5 8V5.5a2.5 2.5 0 0 1 5 0V8" />
    </svg>
  );

  const renderSide = (list: NavbarSplitLogoLink[], side: "left" | "right", withBag: boolean) => (
    <ul className="hb-xi10-side" data-side={side}>
      {list.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="hb-xi10-link"
            aria-current={link.href === activeHref ? "page" : undefined}
            onPointerEnter={(e) => aim(e.currentTarget, side)}
            onPointerLeave={() => aim(null, null)}
            onFocus={(e) => aim(e.currentTarget, side)}
            onBlur={() => aim(null, null)}
          >
            {link.label}
          </a>
        </li>
      ))}
      {withBag && (
        <li>
          <button
            type="button"
            className="hb-xi10-link"
            aria-label={`Bag, ${bagCount} items`}
            onClick={onBagClick}
            onPointerEnter={(e) => aim(e.currentTarget, side)}
            onPointerLeave={() => aim(null, null)}
            onFocus={(e) => aim(e.currentTarget, side)}
            onBlur={() => aim(null, null)}
          >
            Bag
            {bagCount > 0 && (
              <span key={bagCount} className="hb-xi10-count" aria-hidden="true">
                {bagCount}
              </span>
            )}
          </button>
        </li>
      )}
    </ul>
  );

  const all = [...left, ...right];

  return (
    <header
      ref={rootRef}
      className={`hb-xi10 ${className}`}
      style={{ "--hb-xi10-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-split-logo" precedence="default">
        {css}
      </style>
      <div className="hb-xi10-bar">
        <nav ref={rowRef} className="hb-xi10-row" aria-label="Main">
          {renderSide(left, "left", false)}
          <button
            type="button"
            className="hb-xi10-ib"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={`${uid}-sheet`}
            onClick={() => setOpen((v) => !v)}
          >
            <i aria-hidden="true" />
          </button>
          <a ref={logoRef} href="#" className="hb-xi10-logo" aria-label={`${brand} home`}>
            <svg className="hb-xi10-mark" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M13 0l3 8.5L24.5 5 19.6 13l4.9 8-8.5-3.5L13 26l-3-8.5L1.5 21l4.9-8L1.5 5 10 8.5z" />
            </svg>
            <span className="hb-xi10-word">{brand}</span>
          </a>
          {renderSide(right, "right", true)}
          <button type="button" className="hb-xi10-ib hb-xi10-bag" aria-label={`Bag, ${bagCount} items`} onClick={onBagClick}>
            {bag}
            {bagCount > 0 && (
              <span key={bagCount} className="hb-xi10-count" aria-hidden="true">
                {bagCount}
              </span>
            )}
          </button>
          <span ref={wireL} className="hb-xi10-wire" data-side="left" data-on="false" aria-hidden="true" />
          <span ref={wireR} className="hb-xi10-wire" data-side="right" data-on="false" aria-hidden="true" />
        </nav>
        <div id={`${uid}-sheet`} className="hb-xi10-sheet" data-open={open ? "true" : "false"}>
          {all.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.href === activeHref ? "page" : undefined}
              style={{ animationDelay: `${(i * 0.04).toFixed(2)}s` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {featured && (
            <a href={featured.href} className="hb-xi10-feat" onClick={() => setOpen(false)}>
              <span>
                <small>{featured.eyebrow}</small>
                <b>{featured.title}</b>
              </span>
            </a>
          )}
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xi10-stage" aria-hidden="true">
          <div className="hb-xi10-ed">
            <div className="hb-xi10-pic" style={{ background: "radial-gradient(70% 60% at 50% 35%, #b08a63, transparent 70%), linear-gradient(170deg, #5a4331, #1c1611)" }}>
              <div className="hb-xi10-cap">
                <small>{featured?.eyebrow ?? "Winter 26"}</small>
                <b>{featured?.title ?? "Quiet wool, made in Porto"}</b>
                <span>Shop women</span>
              </div>
            </div>
            <div className="hb-xi10-pic" style={{ background: "radial-gradient(60% 50% at 45% 40%, #7d8a86, transparent 70%), linear-gradient(190deg, #3a4442, #121614)" }}>
              <div className="hb-xi10-cap">
                <small>The overcoat edit</small>
                <b>Cut long, worn for decades</b>
                <span>Shop men</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

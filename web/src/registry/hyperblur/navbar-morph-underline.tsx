"use client";

import * as React from "react";

export interface NavbarMorphUnderlineLink {
  label: string;
  href: string;
  count?: number;
}

export interface NavbarMorphUnderlineProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavbarMorphUnderlineLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  cta?: { label: string; href: string } | null;
  appearance?: "light" | "dark";
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi2 {
  --hb-xi2-accent: #e5484d;
  --hb-xi2-bg: #f7f5ef;
  --hb-xi2-fg: #1b1a17;
  --hb-xi2-mute: #77736a;
  --hb-xi2-line: rgba(27,26,23,.1);
  --hb-xi2-chip: rgba(27,26,23,.06);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: var(--hb-xi2-bg);
  color: var(--hb-xi2-fg);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi2[data-appearance="dark"] {
  --hb-xi2-bg: #0c0c0d;
  --hb-xi2-fg: #ededed;
  --hb-xi2-mute: #8f8f8f;
  --hb-xi2-line: rgba(255,255,255,.09);
  --hb-xi2-chip: rgba(255,255,255,.07);
}
.hb-xi2 *, .hb-xi2 *::before, .hb-xi2 *::after { box-sizing: border-box; }
.hb-xi2-bar { position: relative; z-index: 2; border-bottom: 1px solid var(--hb-xi2-line); background: color-mix(in srgb, var(--hb-xi2-bg) 88%, transparent); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.hb-xi2-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 28px; max-width: 1120px; height: 64px; margin: 0 auto; padding: 0 24px; }
.hb-xi2-brand { display: inline-flex; align-items: center; gap: 9px; color: var(--hb-xi2-fg); font-size: 16px; font-weight: 700; letter-spacing: -.025em; text-decoration: none; border-radius: 6px; }
.hb-xi2-mark { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 8px; background: var(--hb-xi2-fg); color: var(--hb-xi2-bg); }
.hb-xi2-mark svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi2-track { position: relative; display: flex; align-self: stretch; min-width: 0; margin: 0; padding: 0; list-style: none; }
.hb-xi2-track li { display: flex; }
.hb-xi2-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 14px;
  color: var(--hb-xi2-mute);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: color .3s ease;
}
.hb-xi2-link:hover, .hb-xi2-link[data-target="true"] { color: var(--hb-xi2-fg); }
.hb-xi2-link[aria-current="page"] { color: var(--hb-xi2-fg); font-weight: 600; }
.hb-xi2-link:focus-visible { outline: none; }
.hb-xi2-link:focus-visible .hb-xi2-lt { outline: 2px solid var(--hb-xi2-accent); outline-offset: 4px; border-radius: 4px; }
.hb-xi2-count { min-width: 20px; padding: 1px 6px; border-radius: 999px; background: var(--hb-xi2-chip); color: var(--hb-xi2-mute); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; font-weight: 500; text-align: center; transition: background-color .3s ease, color .3s ease; }
.hb-xi2-link[aria-current="page"] .hb-xi2-count { background: color-mix(in srgb, var(--hb-xi2-accent) 14%, transparent); color: var(--hb-xi2-accent); }
.hb-xi2-worm {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--hb-xi2-fg);
  pointer-events: none;
  transition: left .5s cubic-bezier(.65,0,.2,1) var(--hb-xi2-dl, 0s), right .5s cubic-bezier(.65,0,.2,1) var(--hb-xi2-dr, 0s), background-color .3s ease, height .3s ease;
}
.hb-xi2-worm[data-home="true"] { height: 3px; background: var(--hb-xi2-accent); }
.hb-xi2-worm::after { content: ""; position: absolute; inset: -3px -2px; border-radius: 4px; background: inherit; opacity: .18; filter: blur(4px); }
.hb-xi2-worm[data-ready="false"] { opacity: 0; transition: none; }
.hb-xi2-end { display: flex; align-items: center; gap: 8px; }
.hb-xi2-kbd { display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 8px 0 12px; border: 1px solid var(--hb-xi2-line); border-radius: 10px; background: transparent; color: var(--hb-xi2-mute); font-size: 13px; cursor: pointer; font-family: inherit; transition: border-color .2s ease, color .2s ease; }
.hb-xi2-kbd:hover { color: var(--hb-xi2-fg); border-color: color-mix(in srgb, var(--hb-xi2-fg) 25%, transparent); }
.hb-xi2-kbd svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-xi2-kbd kbd { padding: 1px 5px; border-radius: 5px; background: var(--hb-xi2-chip); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-xi2-cta { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 10px; background: var(--hb-xi2-fg); color: var(--hb-xi2-bg); font-size: 13.5px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 4px 12px -6px rgba(0,0,0,.5); transition: transform .2s cubic-bezier(.2,.8,.2,1), opacity .2s ease; }
.hb-xi2-cta:hover { transform: translateY(-1px); }
.hb-xi2-cta:active { transform: scale(.97); }
.hb-xi2 a:focus-visible:not(.hb-xi2-link), .hb-xi2 button:focus-visible { outline: 2px solid var(--hb-xi2-accent); outline-offset: 2px; }
.hb-xi2-stage { position: relative; height: 640px; overflow: hidden; }
.hb-xi2-doc { display: grid; grid-template-columns: 200px 1fr; gap: 56px; max-width: 1120px; margin: 0 auto; padding: 48px 24px 0; }
.hb-xi2-toc { display: grid; gap: 12px; align-content: start; color: var(--hb-xi2-mute); font-size: 13px; }
.hb-xi2-toc b { color: var(--hb-xi2-fg); font-weight: 600; }
.hb-xi2-crumb { color: var(--hb-xi2-mute); font-size: 13px; }
.hb-xi2-h { margin: 12px 0 14px; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(30px, 5cqi, 46px); font-weight: 600; letter-spacing: -.035em; line-height: 1.05; }
.hb-xi2-lead { max-width: 600px; margin: 0 0 28px; color: var(--hb-xi2-mute); font-size: 17px; line-height: 1.6; }
.hb-xi2-ln { height: 11px; margin-bottom: 14px; border-radius: 6px; background: var(--hb-xi2-chip); }
.hb-xi2-code { margin: 26px 0; padding: 18px 20px; border: 1px solid var(--hb-xi2-line); border-radius: 12px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; line-height: 1.7; color: var(--hb-xi2-mute); }
.hb-xi2-code b { color: var(--hb-xi2-accent); font-weight: 500; }
@container (max-width: 760px) {
  .hb-xi2-row { grid-template-columns: 1fr auto; grid-template-rows: 56px 44px; gap: 0 12px; height: auto; padding: 0 16px; }
  .hb-xi2-track { grid-column: 1 / -1; grid-row: 2; margin: 0 -16px; padding: 0 6px; overflow-x: auto; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 24px), transparent); mask-image: linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 24px), transparent); }
  .hb-xi2-track::-webkit-scrollbar { display: none; }
  .hb-xi2-link { padding: 0 12px; font-size: 13.5px; }
  .hb-xi2-kbd span, .hb-xi2-kbd kbd { display: none; }
  .hb-xi2-kbd { width: 34px; padding: 0; justify-content: center; }
  .hb-xi2-doc { grid-template-columns: 1fr; padding-top: 32px; }
  .hb-xi2-toc { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi2 *, .hb-xi2 *::before, .hb-xi2 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarMorphUnderlineLink[] = [
  { label: "Guides", href: "#", count: 48 },
  { label: "API reference", href: "#" },
  { label: "Changelog", href: "#", count: 3 },
  { label: "Examples", href: "#" },
  { label: "Community", href: "#" },
];

export function NavbarMorphUnderline({
  brand = "Fieldnote",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  cta = { label: "Get API key", href: "#" },
  appearance = "light",
  accent = "#e5484d",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarMorphUnderlineProps) {
  const [inner, setInner] = React.useState(defaultActive);
  const [hover, setHover] = React.useState<number | null>(null);
  const current = active ?? inner;
  const target = hover ?? current;
  const trackRef = React.useRef<HTMLUListElement>(null);
  const wormRef = React.useRef<HTMLLIElement>(null);
  const lastRef = React.useRef<{ l: number; r: number } | null>(null);

  const place = React.useCallback((index: number, instant: boolean) => {
    const track = trackRef.current;
    const worm = wormRef.current;
    if (!track || !worm) return;
    const el = track.querySelectorAll<HTMLElement>("[data-hb-xi2-link]")[index];
    if (!el) return;
    const pad = 14;
    const l = el.offsetLeft + pad;
    const r = track.clientWidth - (el.offsetLeft + el.offsetWidth) + pad;
    const prev = lastRef.current;
    const right = prev ? l > prev.l : true;
    worm.style.setProperty("--hb-xi2-dl", instant ? "0s" : right ? ".09s" : "0s");
    worm.style.setProperty("--hb-xi2-dr", instant ? "0s" : right ? "0s" : ".09s");
    if (instant) worm.style.transition = "none";
    worm.style.left = `${l}px`;
    worm.style.right = `${r}px`;
    worm.dataset.ready = "true";
    if (instant) {
      void worm.offsetWidth;
      worm.style.transition = "";
    }
    lastRef.current = { l, r };
  }, []);

  React.useLayoutEffect(() => {
    place(target, lastRef.current === null);
    if (wormRef.current) wormRef.current.dataset.home = target === current ? "true" : "false";
  }, [target, current, place, links]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => place(target, true));
    ro.observe(track);
    return () => ro.disconnect();
  }, [place, target]);

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
  };

  const onKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-hb-xi2-link]"));
    const at = items.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    e.preventDefault();
    const n = items.length;
    const next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (at + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
    items[next]?.focus();
  };

  return (
    <header className={`hb-xi2 ${className}`} data-appearance={appearance} style={{ "--hb-xi2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-navbar-morph-underline" precedence="default">
        {css}
      </style>
      <div className="hb-xi2-bar">
        <nav className="hb-xi2-row" aria-label="Main">
          <a href="#" className="hb-xi2-brand" aria-label={`${brand} home`}>
            <span className="hb-xi2-mark" aria-hidden="true">
              <svg viewBox="0 0 14 14">
                <path d="M3 2.5h8M3 7h5M3 11.5h7" />
              </svg>
            </span>
            {brand}
          </a>
          <ul className="hb-xi2-track" ref={trackRef} onKeyDown={onKey} onPointerLeave={() => setHover(null)}>
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-hb-xi2-link=""
                  className="hb-xi2-link"
                  data-target={i === target ? "true" : "false"}
                  aria-current={i === current ? "page" : undefined}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setHover(i);
                  }}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => select(i)}
                >
                  <span className="hb-xi2-lt">{link.label}</span>
                  {link.count !== undefined && <span className="hb-xi2-count">{link.count}</span>}
                </a>
              </li>
            ))}
            <li ref={wormRef} className="hb-xi2-worm" data-ready="false" data-home="true" aria-hidden="true" />
          </ul>
          <div className="hb-xi2-end">
            <button type="button" className="hb-xi2-kbd" aria-label="Search docs">
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <circle cx="6" cy="6" r="4" />
                <path d="M9 9l3 3" />
              </svg>
              <span>Search</span>
              <kbd>/</kbd>
            </button>
            {cta && (
              <a href={cta.href} className="hb-xi2-cta">
                {cta.label}
              </a>
            )}
          </div>
        </nav>
      </div>
      {showBackdrop && (
        <div className="hb-xi2-stage" aria-hidden="true">
          <div className="hb-xi2-doc">
            <div className="hb-xi2-toc">
              <b>Getting started</b>
              <span>Install the SDK</span>
              <span>Authenticate</span>
              <span>Your first note</span>
              <span>Webhooks</span>
              <span>Rate limits</span>
            </div>
            <div>
              <div className="hb-xi2-crumb">Guides / Getting started</div>
              <h2 className="hb-xi2-h">Capture your first field note</h2>
              <p className="hb-xi2-lead">Create a workspace token, send a note with location and photos attached, and watch it sync to every device in under a second.</p>
              <div className="hb-xi2-ln" style={{ width: "92%" }} />
              <div className="hb-xi2-ln" style={{ width: "84%" }} />
              <div className="hb-xi2-ln" style={{ width: "66%" }} />
              <div className="hb-xi2-code">
                <b>npm</b> install @fieldnote/sdk
                <br />
                const note = await fieldnote.notes.create({"{"} title: <b>&quot;Site walk, Pier 7&quot;</b> {"}"})
              </div>
              <div className="hb-xi2-ln" style={{ width: "88%" }} />
              <div className="hb-xi2-ln" style={{ width: "72%" }} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import * as React from "react";

export interface NavbarHeroFillProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string } | null;
  progress?: number;
  distance?: number;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultLinks = [
  { label: "Stays", href: "#stays" },
  { label: "Experiences", href: "#experiences" },
  { label: "Journal", href: "#journal" },
  { label: "About", href: "#about" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj8 {
  --hb-xj8-accent: #c2410c;
  --hb-xj8-p: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj8 *, .hb-xj8 *::before, .hb-xj8 *::after { box-sizing: border-box; }
.hb-xj8[data-backdrop="true"] { height: 620px; overflow: hidden; background: #0a0a0a; }
.hb-xj8-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 24px;
  height: calc(84px - 20px * var(--hb-xj8-p));
  padding: 0 calc(36px - 12px * var(--hb-xj8-p));
  color: color-mix(in srgb, #15130f calc(var(--hb-xj8-p) * 100%), #ffffff);
}
.hb-xj8[data-backdrop="true"] .hb-xj8-bar { position: absolute; }
.hb-xj8-fill {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(250,248,243,calc(.92 * var(--hb-xj8-p)));
  backdrop-filter: blur(calc(18px * var(--hb-xj8-p))) saturate(calc(100% + 60% * var(--hb-xj8-p)));
  box-shadow: 0 1px 0 rgba(21,19,15,calc(.08 * var(--hb-xj8-p))), 0 10px 30px -12px rgba(0,0,0,calc(.25 * var(--hb-xj8-p)));
}
.hb-xj8-fill::before {
  content: "";
  position: absolute;
  inset: 0 0 -60px;
  z-index: -1;
  background: linear-gradient(180deg, rgba(0,0,0,.45), transparent);
  opacity: calc(1 - var(--hb-xj8-p));
  pointer-events: none;
}
.hb-xj8-brand { display: inline-flex; align-items: center; gap: 10px; color: inherit; font-family: var(--font-grotesk, inherit); font-size: calc(22px - 3px * var(--hb-xj8-p)); font-weight: 600; letter-spacing: -.03em; text-decoration: none; }
.hb-xj8-sun { position: relative; width: 22px; height: 22px; border-radius: 50%; border: 2px solid currentColor; }
.hb-xj8-sun::after { content: ""; position: absolute; left: -4px; right: -4px; bottom: 3px; height: 2px; background: currentColor; box-shadow: 0 -4px 0 0 transparent; }
.hb-xj8-links { display: flex; gap: 4px; margin: 0 0 0 auto; padding: 0; list-style: none; }
.hb-xj8-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 14px;
  color: inherit;
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  opacity: .88;
  transition: opacity .2s ease;
}
.hb-xj8-link::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 6px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: 100% 50%; transition: transform .45s ${ease}; }
.hb-xj8-link:hover { opacity: 1; }
.hb-xj8-link:hover::after { transform: scaleX(1); transform-origin: 0 50%; }
.hb-xj8-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  isolation: isolate;
  transition: color .3s ease, border-color .3s ease;
}
.hb-xj8-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--hb-xj8-accent);
  opacity: var(--hb-xj8-p);
}
.hb-xj8[data-filled="true"] .hb-xj8-cta { color: #fff; border-color: transparent; }
.hb-xj8-cta:hover { border-color: currentColor; }
.hb-xj8-burger { display: none; }
.hb-xj8-overlay { display: none; }
.hb-xj8 a:focus-visible, .hb-xj8 button:focus-visible { outline: 2px solid var(--hb-xj8-accent); outline-offset: 3px; }
@container (max-width: 720px) {
  .hb-xj8-bar { padding: 0 16px; gap: 12px; height: calc(68px - 8px * var(--hb-xj8-p)); }
  .hb-xj8-links, .hb-xj8-bar > .hb-xj8-cta { display: none; }
  .hb-xj8-burger {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    margin-left: auto;
    padding: 0 4px 0 14px;
    border: 0;
    border-radius: 999px;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .hb-xj8-burger i { position: relative; display: block; width: 32px; height: 32px; border-radius: 50%; border: 1px solid color-mix(in srgb, currentColor 40%, transparent); font-style: normal; }
  .hb-xj8-burger i::before, .hb-xj8-burger i::after { content: ""; position: absolute; left: 9px; right: 9px; height: 1.5px; background: currentColor; transition: transform .5s ${ease}, top .5s ${ease}; }
  .hb-xj8-burger i::before { top: 12px; }
  .hb-xj8-burger i::after { top: 18px; }
  .hb-xj8-overlay {
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    flex-direction: column;
    height: 100dvh;
    padding: 18px 16px 28px;
    background: #15130f;
    color: #faf8f3;
    clip-path: circle(0px at calc(100% - 36px) 34px);
    visibility: hidden;
    transition: clip-path .7s ${ease}, visibility 0s linear .7s;
  }
  .hb-xj8[data-backdrop="true"] .hb-xj8-overlay { position: absolute; height: 100%; }
  .hb-xj8[data-open="true"] .hb-xj8-overlay { clip-path: circle(150% at calc(100% - 36px) 34px); visibility: visible; transition: clip-path .7s ${ease}, visibility 0s; }
  .hb-xj8-otop { display: flex; align-items: center; justify-content: space-between; height: 34px; }
  .hb-xj8-close { display: inline-flex; align-items: center; gap: 10px; height: 40px; padding: 0 4px 0 14px; border: 0; background: none; color: inherit; font: inherit; font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
  .hb-xj8-close i { position: relative; display: block; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(250,248,243,.3); font-style: normal; }
  .hb-xj8-close i::before, .hb-xj8-close i::after { content: ""; position: absolute; left: 9px; right: 9px; top: 15px; height: 1.5px; background: currentColor; transform: rotate(45deg); }
  .hb-xj8-close i::after { transform: rotate(-45deg); }
  .hb-xj8-olist { margin: auto 0 0; padding: 0; list-style: none; }
  .hb-xj8-olist li { overflow: hidden; border-bottom: 1px solid rgba(250,248,243,.12); }
  .hb-xj8-olink {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 14px 0;
    color: inherit;
    font-family: var(--font-grotesk, inherit);
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -.04em;
    line-height: 1;
    text-decoration: none;
    transform: translateY(105%);
    transition: transform .7s ${ease};
    transition-delay: calc(var(--hb-xj8-i) * 60ms + 120ms);
  }
  .hb-xj8-olink small { color: rgba(250,248,243,.45); font-family: var(--font-mono, monospace); font-size: 12px; letter-spacing: 0; }
  .hb-xj8[data-open="true"] .hb-xj8-olink { transform: none; }
  .hb-xj8-ofoot { display: flex; justify-content: space-between; align-items: center; margin-top: 26px; color: rgba(250,248,243,.6); font-size: 13px; opacity: 0; transition: opacity .4s ease .5s; }
  .hb-xj8[data-open="true"] .hb-xj8-ofoot { opacity: 1; }
  .hb-xj8-ofoot a { display: inline-flex; align-items: center; height: 44px; padding: 0 20px; border-radius: 999px; background: var(--hb-xj8-accent); color: #fff; font-weight: 600; text-decoration: none; }
}
.hb-xj8-scroll { position: absolute; inset: 0; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: none; }
.hb-xj8-scroll::-webkit-scrollbar { display: none; }
.hb-xj8-hero {
  position: relative;
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 36px 54px;
  color: #fff;
  background:
    radial-gradient(60% 50% at 75% 30%, rgba(255,196,120,.85), transparent 60%),
    radial-gradient(80% 60% at 20% 10%, rgba(255,120,80,.55), transparent 60%),
    linear-gradient(180deg, #f59e0b 0%, #c2410c 38%, #4a1d0c 70%, #170b06 100%);
  overflow: hidden;
}
.hb-xj8-hill { position: absolute; left: -10%; right: -10%; border-radius: 50% 50% 0 0; }
.hb-xj8-hill:nth-child(1) { bottom: 120px; height: 260px; background: #6b2a10; opacity: .7; transform: translateX(-18%); }
.hb-xj8-hill:nth-child(2) { bottom: 40px; height: 240px; background: #3b160a; transform: translateX(22%); }
.hb-xj8-hill:nth-child(3) { bottom: -60px; height: 240px; background: #170b06; }
.hb-xj8-hero small { position: relative; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
.hb-xj8-hero h2 { position: relative; margin: 12px 0 0; max-width: 620px; font-family: var(--font-grotesk, inherit); font-size: clamp(36px, 7cqi, 72px); font-weight: 500; line-height: .98; letter-spacing: -.045em; }
.hb-xj8-body { padding: 44px 36px 80px; background: #faf8f3; color: #15130f; }
.hb-xj8-body h3 { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-xj8-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; }
.hb-xj8-card { height: 200px; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; justify-content: flex-end; color: #fff; }
.hb-xj8-card b { font-size: 15px; font-weight: 600; }
.hb-xj8-card small { font-size: 12px; opacity: .8; }
@container (max-width: 720px) { .hb-xj8-hero { padding: 0 16px 40px; height: 480px; } .hb-xj8-body { padding: 32px 16px 60px; } .hb-xj8-cards { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj8 *, .hb-xj8 *::before, .hb-xj8 *::after { transition: none !important; animation: none !important; }
}
`;

export function NavbarHeroFill({
  brand = "Solstice",
  links = defaultLinks,
  cta = { label: "Book a stay", href: "#book" },
  progress,
  distance = 220,
  menuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  accent = "#c2410c",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarHeroFillProps) {
  const [measured, setMeasured] = React.useState(0);
  const [innerOpen, setInnerOpen] = React.useState(defaultMenuOpen);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const overlayId = React.useId();
  const open = menuOpen ?? innerOpen;
  const p = Math.min(1, Math.max(0, progress ?? measured));

  React.useEffect(() => {
    if (progress !== undefined) return;
    const target: HTMLElement | Window = showBackdrop && scrollRef.current ? scrollRef.current : window;
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = target instanceof Window ? target.scrollY : target.scrollTop;
      const next = Math.round(Math.min(1, Math.max(0, y / Math.max(1, distance))) * 100) / 100;
      setMeasured(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
    };
  }, [progress, distance, showBackdrop]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (menuOpen === undefined) setInnerOpen(next);
      onMenuOpenChange?.(next);
    },
    [menuOpen, onMenuOpenChange],
  );

  React.useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const lock = !showBackdrop;
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    const first = overlay?.querySelector<HTMLElement>("button, a");
    const t = window.setTimeout(() => first?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !overlay) return;
      const nodes = Array.from(overlay.querySelectorAll<HTMLElement>("button, a[href]"));
      if (!nodes.length) return;
      const a = nodes[0];
      const b = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        b.focus();
      } else if (!e.shiftKey && document.activeElement === b) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      if (lock) document.body.style.overflow = prev;
    };
  }, [open, setOpen, showBackdrop]);

  const close = () => {
    setOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <header
      className={["hb-xj8", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      data-filled={p > 0.5 ? "true" : "false"}
      data-open={open ? "true" : "false"}
      style={{ "--hb-xj8-accent": accent, "--hb-xj8-p": p.toFixed(2), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-hero-fill" precedence="default">
        {css}
      </style>
      <nav className="hb-xj8-bar" aria-label="Main">
        <div className="hb-xj8-fill" aria-hidden="true" />
        <a className="hb-xj8-brand" href="#top">
          <span className="hb-xj8-sun" aria-hidden="true" />
          {brand}
        </a>
        <ul className="hb-xj8-links">
          {links.map((l) => (
            <li key={l.href}>
              <a className="hb-xj8-link" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <a className="hb-xj8-cta" href={cta.href}>
            {cta.label}
          </a>
        )}
        <button ref={burgerRef} type="button" className="hb-xj8-burger" aria-expanded={open} aria-controls={overlayId} onClick={() => setOpen(true)}>
          Menu
          <i aria-hidden="true" />
        </button>
      </nav>
      <div className="hb-xj8-overlay" id={overlayId} ref={overlayRef} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="hb-xj8-otop">
          <a className="hb-xj8-brand" href="#top" style={{ fontSize: 20 }}>
            <span className="hb-xj8-sun" aria-hidden="true" />
            {brand}
          </a>
          <button type="button" className="hb-xj8-close" onClick={close}>
            Close
            <i aria-hidden="true" />
          </button>
        </div>
        <ul className="hb-xj8-olist">
          {links.map((l, i) => (
            <li key={l.href}>
              <a className="hb-xj8-olink" href={l.href} style={{ "--hb-xj8-i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
                {l.label}
                <small>{String(i + 1).padStart(2, "0")}</small>
              </a>
            </li>
          ))}
        </ul>
        <div className="hb-xj8-ofoot">
          <span>Open year round, Algarve</span>
          {cta && <a href={cta.href}>{cta.label}</a>}
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xj8-scroll" ref={scrollRef} tabIndex={-1}>
          <div className="hb-xj8-hero">
            <span className="hb-xj8-hill" aria-hidden="true" />
            <span className="hb-xj8-hill" aria-hidden="true" />
            <span className="hb-xj8-hill" aria-hidden="true" />
            <small>Cliffside retreat, Algarve</small>
            <h2>Slow mornings above the Atlantic</h2>
          </div>
          <div className="hb-xj8-body">
            <h3>Rooms with a horizon</h3>
            <div className="hb-xj8-cards">
              <div className="hb-xj8-card" style={{ background: "linear-gradient(160deg,#f59e0b,#7c2d12)" }}>
                <b>Cliff suite</b>
                <small>From $420 a night</small>
              </div>
              <div className="hb-xj8-card" style={{ background: "linear-gradient(160deg,#0e7490,#082f49)" }}>
                <b>Ocean loft</b>
                <small>From $360 a night</small>
              </div>
              <div className="hb-xj8-card" style={{ background: "linear-gradient(160deg,#65a30d,#1a2e05)" }}>
                <b>Garden cabin</b>
                <small>From $240 a night</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

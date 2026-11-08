"use client";

import * as React from "react";

export interface NavbarFloatingCapsuleLink {
  label: string;
  href: string;
}

export interface NavbarFloatingCapsuleProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  links?: NavbarFloatingCapsuleLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  signIn?: { label: string; href: string } | null;
  cta?: { label: string; href: string } | null;
  merged?: boolean;
  mergeOnScroll?: boolean;
  threshold?: number;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultLinks: NavbarFloatingCapsuleLink[] = [
  { label: "Product", href: "#product" },
  { label: "Changelog", href: "#changelog" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj1 {
  --hb-xj1-accent: #f59e0b;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  padding: 18px 18px;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj1 *, .hb-xj1 *::before, .hb-xj1 *::after { box-sizing: border-box; }
.hb-xj1[data-backdrop="true"] { min-height: 620px; overflow: hidden; background: #0a0a0a; }
.hb-xj1-bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  transition: max-width .7s ${ease}, gap .7s ${ease};
}
.hb-xj1[data-merged="true"] .hb-xj1-bar { max-width: 880px; gap: 0; }
.hb-xj1-shell {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.1);
  background: linear-gradient(180deg, rgba(30,30,32,.86), rgba(17,17,19,.9));
  backdrop-filter: blur(18px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px -24px rgba(0,0,0,.9), 0 0 0 6px rgba(255,255,255,.02);
  opacity: 0;
  transform: scaleX(.94);
  transition: opacity .5s ease, transform .7s ${ease};
  pointer-events: none;
}
.hb-xj1[data-merged="true"] .hb-xj1-shell { opacity: 1; transform: none; }
.hb-xj1-cap {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 52px;
  padding: 0 6px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.09);
  background: linear-gradient(180deg, rgba(28,28,30,.82), rgba(16,16,18,.86));
  backdrop-filter: blur(14px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 16px 40px -20px rgba(0,0,0,.9);
  transition: border-color .5s ease, background-color .5s ease, box-shadow .5s ease, padding .7s ${ease};
}
.hb-xj1[data-merged="true"] .hb-xj1-cap { border-color: transparent; background: transparent; box-shadow: none; backdrop-filter: none; }
.hb-xj1-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 14px 0 8px;
  border-radius: 999px;
  color: #ededed;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -.02em;
  text-decoration: none;
}
.hb-xj1-mark { position: relative; width: 26px; height: 26px; flex: none; }
.hb-xj1-mark span {
  position: absolute;
  inset: 0;
  border-radius: 9px;
  background: linear-gradient(140deg, var(--hb-xj1-accent), #fb7185);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.4);
}
.hb-xj1-mark span + span { inset: 7px; border-radius: 4px; background: #141416; box-shadow: none; }
.hb-xj1-links { display: flex; align-items: center; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-xj1-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: color .2s ease, background-color .25s ease;
}
.hb-xj1-link:hover { color: #ededed; background: rgba(255,255,255,.05); }
.hb-xj1-link[aria-current="page"] { color: #ededed; }
.hb-xj1-link[aria-current="page"]::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--hb-xj1-accent);
  box-shadow: 0 0 10px 2px color-mix(in srgb, var(--hb-xj1-accent) 60%, transparent);
  transform: translateX(-50%);
  animation: hb-xj1-dot .5s ${ease};
}
@keyframes hb-xj1-dot { from { transform: translateX(-50%) scale(0); } }
.hb-xj1-sep {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: rgba(255,255,255,.1);
  opacity: 0;
  transition: opacity .5s ease;
}
.hb-xj1[data-merged="true"] .hb-xj1-sep { opacity: 1; }
.hb-xj1-ghost {
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  color: #c9c9c9;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-xj1-ghost:hover { color: #fff; background: rgba(255,255,255,.05); }
.hb-xj1-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 8px 0 16px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffffff, #e4e4e4);
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.12), 0 6px 18px -6px rgba(255,255,255,.35);
  transition: transform .25s ${ease}, box-shadow .25s ease;
}
.hb-xj1-cta:hover { transform: translateY(-1px); box-shadow: inset 0 -1px 0 rgba(0,0,0,.12), 0 10px 24px -8px rgba(255,255,255,.45); }
.hb-xj1-cta:active { transform: translateY(0) scale(.98); }
.hb-xj1-cta i {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #0a0a0a;
  color: #fff;
  font-style: normal;
  transition: transform .3s ${ease};
}
.hb-xj1-cta:hover i { transform: translateX(2px) rotate(-45deg); }
.hb-xj1-cta svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj1 a:focus-visible, .hb-xj1 button:focus-visible { outline: 2px solid var(--hb-xj1-accent); outline-offset: 2px; }
.hb-xj1-mobile { display: none; }
.hb-xj1-sheet { display: none; }
@container (max-width: 900px) {
  .hb-xj1-bar, .hb-xj1[data-merged="true"] .hb-xj1-bar { display: none; }
  .hb-xj1-mobile { position: relative; z-index: 4; display: block; max-width: 520px; margin: 0 auto; }
  .hb-xj1-pill {
    position: relative;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,.1);
    background: linear-gradient(180deg, rgba(30,30,32,.92), rgba(17,17,19,.94));
    backdrop-filter: blur(18px) saturate(160%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px -24px rgba(0,0,0,.9);
    overflow: hidden;
    transition: border-radius .6s ${ease}, box-shadow .4s ease;
  }
  .hb-xj1[data-open="true"] .hb-xj1-pill { border-radius: 24px; box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 40px 80px -30px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.04); }
  .hb-xj1-mrow { display: flex; align-items: center; justify-content: space-between; height: 54px; padding: 0 7px 0 4px; }
  .hb-xj1-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    padding: 0 14px 0 16px;
    border: 0;
    border-radius: 999px;
    background: rgba(255,255,255,.07);
    color: #ededed;
    font: inherit;
    font-size: 14px;
    font-weight: 550;
    cursor: pointer;
    transition: background-color .2s ease;
  }
  .hb-xj1-toggle:hover { background: rgba(255,255,255,.11); }
  .hb-xj1-burger { position: relative; width: 14px; height: 10px; }
  .hb-xj1-burger span {
    position: absolute;
    left: 0;
    width: 14px;
    height: 1.6px;
    border-radius: 2px;
    background: currentColor;
    transition: transform .45s ${ease}, top .45s ${ease};
  }
  .hb-xj1-burger span:first-child { top: 1px; }
  .hb-xj1-burger span:last-child { top: 7px; }
  .hb-xj1[data-open="true"] .hb-xj1-burger span:first-child { top: 4px; transform: rotate(45deg); }
  .hb-xj1[data-open="true"] .hb-xj1-burger span:last-child { top: 4px; transform: rotate(-45deg); }
  .hb-xj1-sheet { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .6s ${ease}; }
  .hb-xj1[data-open="true"] .hb-xj1-sheet { grid-template-rows: 1fr; }
  .hb-xj1-sheet > div { min-height: 0; overflow: hidden; }
  .hb-xj1-mlist { margin: 0; padding: 6px 10px 4px; list-style: none; border-top: 1px solid rgba(255,255,255,.06); }
  .hb-xj1-mlist li {
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity .35s ease, transform .5s ${ease};
    transition-delay: calc(var(--hb-xj1-i) * 40ms);
  }
  .hb-xj1[data-open="true"] .hb-xj1-mlist li { opacity: 1; transform: none; }
  .hb-xj1-mlink {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 10px;
    border-radius: 14px;
    color: #d4d4d4;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -.01em;
    text-decoration: none;
    transition: background-color .2s ease, color .2s ease;
  }
  .hb-xj1-mlink:hover { background: rgba(255,255,255,.05); color: #fff; }
  .hb-xj1-mlink[aria-current="page"] { color: #fff; }
  .hb-xj1-mlink small { color: #6b6b6b; font-size: 12px; font-variant-numeric: tabular-nums; }
  .hb-xj1-mlink[aria-current="page"] small { color: var(--hb-xj1-accent); }
  .hb-xj1-mfoot { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px 12px 14px; }
  .hb-xj1-mfoot a { justify-content: center; height: 44px; }
  .hb-xj1-mfoot .hb-xj1-ghost { border: 1px solid rgba(255,255,255,.1); }
}
.hb-xj1-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.hb-xj1-glow {
  position: absolute;
  left: 50%;
  top: -180px;
  width: 900px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-xj1-accent) 26%, transparent), transparent 70%);
  transform: translateX(-50%);
  filter: blur(10px);
}
.hb-xj1-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 70%);
  mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 70%);
}
.hb-xj1-hero { position: relative; z-index: 1; max-width: 760px; margin: 120px auto 0; padding: 0 20px; text-align: center; }
.hb-xj1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: #bdbdbd;
  font-size: 13px;
}
.hb-xj1-eyebrow b { color: var(--hb-xj1-accent); font-weight: 600; }
.hb-xj1-hero h2 { margin: 22px 0 0; font-size: clamp(34px, 7cqi, 64px); font-weight: 650; line-height: 1.02; letter-spacing: -.045em; }
.hb-xj1-hero p { max-width: 520px; margin: 18px auto 0; color: #8f8f8f; font-size: 17px; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) {
  .hb-xj1 *, .hb-xj1 *::before, .hb-xj1 *::after { transition: none !important; animation: none !important; }
}
`;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 8h8M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

export function NavbarFloatingCapsule({
  brand = "Halftone",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  signIn = { label: "Sign in", href: "#signin" },
  cta = { label: "Get started", href: "#start" },
  merged,
  mergeOnScroll = true,
  threshold = 40,
  menuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  accent = "#f59e0b",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarFloatingCapsuleProps) {
  const [innerActive, setInnerActive] = React.useState(defaultActive);
  const [innerOpen, setInnerOpen] = React.useState(defaultMenuOpen);
  const [scrolled, setScrolled] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const sheetId = React.useId();
  const current = active ?? innerActive;
  const open = menuOpen ?? innerOpen;
  const isMerged = merged ?? (mergeOnScroll && scrolled);

  React.useEffect(() => {
    if (merged !== undefined || !mergeOnScroll) return;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [merged, mergeOnScroll, threshold]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (menuOpen === undefined) setInnerOpen(next);
      onMenuOpenChange?.(next);
    },
    [menuOpen, onMenuOpenChange],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const choose = (i: number) => {
    if (active === undefined) setInnerActive(i);
    onActiveChange?.(i);
  };

  const linkList = links.map((l, i) => (
    <li key={l.href + i}>
      <a className="hb-xj1-link" href={l.href} aria-current={i === current ? "page" : undefined} onClick={() => choose(i)}>
        {l.label}
      </a>
    </li>
  ));

  return (
    <header
      className={["hb-xj1", className].filter(Boolean).join(" ")}
      data-merged={isMerged ? "true" : "false"}
      data-open={open ? "true" : "false"}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-floating-capsule" precedence="default">
        {css}
      </style>
      {showBackdrop && (
        <div className="hb-xj1-bg" aria-hidden="true">
          <div className="hb-xj1-glow" />
          <div className="hb-xj1-grid" />
        </div>
      )}
      <nav className="hb-xj1-bar" aria-label="Main">
        <div className="hb-xj1-shell" aria-hidden="true" />
        <div className="hb-xj1-cap">
          <a className="hb-xj1-brand" href="#top">
            <span className="hb-xj1-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            {brand}
          </a>
        </div>
        <div className="hb-xj1-sep" aria-hidden="true" />
        <div className="hb-xj1-cap">
          <ul className="hb-xj1-links">{linkList}</ul>
        </div>
        <div className="hb-xj1-sep" aria-hidden="true" />
        <div className="hb-xj1-cap">
          {signIn && (
            <a className="hb-xj1-ghost" href={signIn.href}>
              {signIn.label}
            </a>
          )}
          {cta && (
            <a className="hb-xj1-cta" href={cta.href}>
              {cta.label}
              <i>
                <Arrow />
              </i>
            </a>
          )}
        </div>
      </nav>
      <nav className="hb-xj1-mobile" aria-label="Main">
        <div className="hb-xj1-pill">
          <div className="hb-xj1-mrow">
            <a className="hb-xj1-brand" href="#top">
              <span className="hb-xj1-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              {brand}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="hb-xj1-toggle"
              aria-expanded={open}
              aria-controls={sheetId}
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Menu"}
              <span className="hb-xj1-burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
          <div className="hb-xj1-sheet" id={sheetId} inert={!open}>
            <div>
              <ul className="hb-xj1-mlist">
                {links.map((l, i) => (
                  <li key={l.href + i} style={{ "--hb-xj1-i": i } as React.CSSProperties}>
                    <a
                      className="hb-xj1-mlink"
                      href={l.href}
                      aria-current={i === current ? "page" : undefined}
                      onClick={() => {
                        choose(i);
                        setOpen(false);
                      }}
                    >
                      {l.label}
                      <small>{String(i + 1).padStart(2, "0")}</small>
                    </a>
                  </li>
                ))}
              </ul>
              {(signIn || cta) && (
                <div className="hb-xj1-mfoot">
                  {signIn && (
                    <a className="hb-xj1-ghost" href={signIn.href}>
                      {signIn.label}
                    </a>
                  )}
                  {cta && (
                    <a className="hb-xj1-cta" href={cta.href}>
                      {cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showBackdrop && (
        <div className="hb-xj1-hero" aria-hidden="true">
          <span className="hb-xj1-eyebrow">
            <b>New</b> Print-ready exports in one click
          </span>
          <h2>Design files your printer will actually love</h2>
          <p>Halftone checks bleed, color profiles and fonts before anything leaves your desk.</p>
        </div>
      )}
    </header>
  );
}

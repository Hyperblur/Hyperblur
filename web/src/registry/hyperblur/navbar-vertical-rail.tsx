"use client";

import * as React from "react";

export interface NavbarVerticalRailLink {
  label: string;
  href: string;
}

export interface NavbarVerticalRailProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: string;
  links?: NavbarVerticalRailLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  cta?: { label: string; href: string } | null;
  status?: string | null;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultLinks: NavbarVerticalRailLink[] = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Index", href: "#index" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj2 {
  --hb-xj2-accent: #d4ff3f;
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj2 *, .hb-xj2 *::before, .hb-xj2 *::after { box-sizing: border-box; }
.hb-xj2[data-backdrop="true"] { min-height: 660px; overflow: hidden; }
.hb-xj2-rail {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  width: 84px;
  height: 100dvh;
  padding: 22px 0 20px;
  border-right: 1px solid #1f1f1f;
  background: linear-gradient(180deg, #111111, #0c0c0c);
}
.hb-xj2[data-backdrop="true"] .hb-xj2-rail { height: auto; min-height: 660px; align-self: stretch; }
.hb-xj2-logo {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--hb-xj2-accent);
  color: #0a0a0a;
  font-family: var(--font-grotesk, inherit);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -.04em;
  text-decoration: none;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,.18), 0 10px 24px -10px color-mix(in srgb, var(--hb-xj2-accent) 70%, transparent);
  transition: transform .4s ${ease};
}
.hb-xj2-logo:hover { transform: rotate(-8deg) scale(1.04); }
.hb-xj2-count {
  margin-top: 22px;
  color: #6b6b6b;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: .04em;
  font-variant-numeric: tabular-nums;
}
.hb-xj2-count b { display: block; color: #ededed; font-weight: 500; text-align: center; }
.hb-xj2-wrap { position: relative; margin: auto 0; }
.hb-xj2-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-xj2-wrap::before {
  content: "";
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 50%;
  width: 1px;
  background: linear-gradient(180deg, transparent, #262626 12%, #262626 88%, transparent);
  transform: translateX(-21px);
}
.hb-xj2-mark {
  position: absolute;
  left: 50%;
  top: 0;
  width: 3px;
  height: var(--hb-xj2-h, 0px);
  border-radius: 3px;
  background: var(--hb-xj2-accent);
  box-shadow: 0 0 14px 1px color-mix(in srgb, var(--hb-xj2-accent) 55%, transparent);
  transform: translate(-22px, var(--hb-xj2-y, 0px));
  transition: transform .6s ${ease}, height .6s ${ease};
}
.hb-xj2-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border-radius: 10px;
  color: #8a8a8a;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  text-decoration: none;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transition: color .25s ease, background-color .25s ease;
}
.hb-xj2-link:hover { color: #ededed; background: rgba(255,255,255,.04); }
.hb-xj2-link[aria-current="page"] { color: #ededed; }
.hb-xj2-num { color: #4d4d4d; font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: 0; transition: color .25s ease; }
.hb-xj2-link[aria-current="page"] .hb-xj2-num { color: var(--hb-xj2-accent); }
.hb-xj2-foot { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.hb-xj2-status { position: relative; display: grid; place-items: center; width: 20px; height: 20px; }
.hb-xj2-pulse { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
.hb-xj2-pulse::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #22c55e; animation: hb-xj2-ping 2.2s ${ease} infinite; }
@keyframes hb-xj2-ping { from { transform: scale(.5); opacity: 1; } to { transform: scale(1.6); opacity: 0; } }
.hb-xj2-cta {
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  background: #151515;
  color: #ededed;
  text-decoration: none;
  overflow: hidden;
  transition: border-color .3s ease, color .3s ease;
}
.hb-xj2-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--hb-xj2-accent);
  transform: scale(0);
  transition: transform .45s ${ease};
}
.hb-xj2-cta:hover { border-color: var(--hb-xj2-accent); color: #0a0a0a; }
.hb-xj2-cta:hover::before { transform: scale(1); }
.hb-xj2-cta svg { position: relative; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-xj2 a:focus-visible, .hb-xj2 button:focus-visible { outline: 2px solid var(--hb-xj2-accent); outline-offset: 2px; }
.hb-xj2-main { position: relative; flex: 1; min-width: 0; }
.hb-xj2-top { display: none; }
.hb-xj2-panel { display: none; }
@container (max-width: 640px) {
  .hb-xj2 { flex-direction: column; }
  .hb-xj2-rail { display: none; }
  .hb-xj2-top {
    position: sticky;
    top: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 62px;
    padding: 0 14px;
    border-bottom: 1px solid #1f1f1f;
    background: rgba(12,12,12,.9);
    backdrop-filter: blur(14px);
  }
  .hb-xj2-top .hb-xj2-logo { width: 38px; height: 38px; border-radius: 12px; font-size: 15px; }
  .hb-xj2-crumb { display: flex; align-items: center; gap: 10px; color: #8a8a8a; font-family: var(--font-mono, monospace); font-size: 12px; }
  .hb-xj2-crumb b { color: #ededed; font-family: inherit; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; font-size: 12px; }
  .hb-xj2-menu {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    padding: 0 14px;
    border: 1px solid #2a2a2a;
    border-radius: 999px;
    background: #151515;
    color: #ededed;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .hb-xj2-dots { display: grid; grid-template-columns: repeat(2, 3px); gap: 3px; transition: transform .5s ${ease}; }
  .hb-xj2-dots span { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }
  .hb-xj2[data-open="true"] .hb-xj2-dots { transform: rotate(45deg); }
  .hb-xj2[data-backdrop="true"] .hb-xj2-top { position: relative; }
  .hb-xj2[data-backdrop="false"] .hb-xj2-panel { position: fixed; }
  .hb-xj2-panel {
    position: absolute;
    top: 62px;
    left: 0;
    right: 0;
    z-index: 5;
    display: block;
    padding: 10px 14px 18px;
    border-bottom: 1px solid #1f1f1f;
    background: #0d0d0d;
    clip-path: inset(0 0 100% 0);
    transition: clip-path .6s ${ease};
  }
  .hb-xj2[data-open="true"] .hb-xj2-panel { clip-path: inset(0 0 0 0); }
  .hb-xj2-plist { margin: 0; padding: 0; list-style: none; }
  .hb-xj2-plink {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 12px 4px;
    border-bottom: 1px solid #1a1a1a;
    color: #9a9a9a;
    font-family: var(--font-grotesk, inherit);
    font-size: 30px;
    font-weight: 500;
    letter-spacing: -.03em;
    text-decoration: none;
    transform: translateY(14px);
    opacity: 0;
    transition: transform .6s ${ease}, opacity .4s ease, color .2s ease;
    transition-delay: calc(var(--hb-xj2-i) * 45ms + 80ms);
  }
  .hb-xj2[data-open="true"] .hb-xj2-plink { transform: none; opacity: 1; }
  .hb-xj2-plink[aria-current="page"], .hb-xj2-plink:hover { color: #ededed; }
  .hb-xj2-plink small { color: #4d4d4d; font-family: var(--font-mono, monospace); font-size: 11px; letter-spacing: 0; }
  .hb-xj2-plink[aria-current="page"] small { color: var(--hb-xj2-accent); }
  .hb-xj2-pcta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    height: 50px;
    padding: 0 18px;
    border-radius: 14px;
    background: var(--hb-xj2-accent);
    color: #0a0a0a;
    font-weight: 600;
    text-decoration: none;
  }
  .hb-xj2-pcta svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
}
.hb-xj2-page { padding: 56px 56px 40px; }
.hb-xj2-kicker { color: #6b6b6b; font-family: var(--font-mono, monospace); font-size: 12px; letter-spacing: .04em; }
.hb-xj2-page h2 {
  margin: 18px 0 0;
  max-width: 760px;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(38px, 7.4cqi, 84px);
  font-weight: 500;
  line-height: .98;
  letter-spacing: -.05em;
}
.hb-xj2-page h2 span { color: var(--hb-xj2-accent); }
.hb-xj2-tiles { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 14px; margin-top: 44px; }
.hb-xj2-tile { position: relative; height: 190px; border-radius: 18px; border: 1px solid #1f1f1f; overflow: hidden; }
.hb-xj2-tile:nth-child(1) { background: radial-gradient(120% 90% at 20% 10%, #3b3b1a, #141414 60%); }
.hb-xj2-tile:nth-child(2) { background: radial-gradient(120% 90% at 80% 20%, #1d2b3d, #121212 60%); }
.hb-xj2-tile:nth-child(3) { background: radial-gradient(120% 90% at 50% 100%, #3a1d2a, #121212 60%); }
.hb-xj2-tile span { position: absolute; left: 16px; bottom: 14px; color: #d4d4d4; font-size: 13px; }
.hb-xj2-tile small { position: absolute; right: 16px; bottom: 14px; color: #6b6b6b; font-family: var(--font-mono, monospace); font-size: 11px; }
@container (max-width: 640px) {
  .hb-xj2-page { padding: 32px 18px; }
  .hb-xj2-tiles { grid-template-columns: 1fr 1fr; }
  .hb-xj2-tile:nth-child(1) { grid-column: span 2; }
  .hb-xj2-tile { height: 130px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xj2 *, .hb-xj2 *::before, .hb-xj2 *::after { transition: none !important; animation: none !important; }
}
`;

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M7.5 6H14v6.5" />
    </svg>
  );
}

export function NavbarVerticalRail({
  brand = "Nº",
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  cta = { label: "Start a project", href: "#contact" },
  status = "Booking Q1",
  menuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  accent = "#d4ff3f",
  showBackdrop = true,
  className,
  style,
  children,
  ...rest
}: NavbarVerticalRailProps) {
  const [innerActive, setInnerActive] = React.useState(defaultActive);
  const [innerOpen, setInnerOpen] = React.useState(defaultMenuOpen);
  const listRef = React.useRef<HTMLUListElement>(null);
  const markRef = React.useRef<HTMLSpanElement>(null);
  const menuRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const current = active ?? innerActive;
  const open = menuOpen ?? innerOpen;

  React.useLayoutEffect(() => {
    const list = listRef.current;
    const mark = markRef.current;
    if (!list || !mark) return;
    const place = () => {
      const link = list.querySelectorAll<HTMLElement>(".hb-xj2-link")[current];
      if (!link) return;
      mark.style.setProperty("--hb-xj2-y", `${link.offsetTop + 8}px`);
      mark.style.setProperty("--hb-xj2-h", `${Math.max(0, link.offsetHeight - 16)}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [current, links]);

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
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const choose = (i: number) => {
    if (active === undefined) setInnerActive(i);
    onActiveChange?.(i);
  };

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>(".hb-xj2-link"));
    const at = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (at < 0) return;
    e.preventDefault();
    const next = (at + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next].focus();
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={["hb-xj2", className].filter(Boolean).join(" ")}
      data-open={open ? "true" : "false"}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-vertical-rail" precedence="default">
        {css}
      </style>
      <nav className="hb-xj2-rail" aria-label="Main">
        <a className="hb-xj2-logo" href="#top">
          {brand}
        </a>
        <div className="hb-xj2-count" aria-hidden="true">
          <b>{pad(current + 1)}</b>/{pad(links.length)}
        </div>
        <div className="hb-xj2-wrap">
        <span className="hb-xj2-mark" ref={markRef} aria-hidden="true" />
        <ul className="hb-xj2-list" ref={listRef} onKeyDown={onListKey}>
          {links.map((l, i) => (
            <li key={l.href + i}>
              <a className="hb-xj2-link" href={l.href} aria-current={i === current ? "page" : undefined} onClick={() => choose(i)}>
                <span className="hb-xj2-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
        <div className="hb-xj2-foot">
          {status && (
            <span className="hb-xj2-status" title={status}>
              <span className="hb-xj2-pulse" aria-hidden="true" />
              <span className="hb-xj2-sr">{status}</span>
            </span>
          )}
          {cta && (
            <a className="hb-xj2-cta" href={cta.href} title={cta.label}>
              <ArrowUpRight />
              <span className="hb-xj2-sr">{cta.label}</span>
            </a>
          )}
        </div>
      </nav>
      <div className="hb-xj2-top">
        <a className="hb-xj2-logo" href="#top">
          {brand}
        </a>
        <span className="hb-xj2-crumb" aria-hidden="true">
          {pad(current + 1)} <b>{links[current]?.label}</b>
        </span>
        <button ref={menuRef} type="button" className="hb-xj2-menu" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
          <span className="hb-xj2-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <nav className="hb-xj2-panel" id={panelId} aria-label="Main" inert={!open}>
        <ul className="hb-xj2-plist">
          {links.map((l, i) => (
            <li key={l.href + i}>
              <a
                className="hb-xj2-plink"
                href={l.href}
                aria-current={i === current ? "page" : undefined}
                style={{ "--hb-xj2-i": i } as React.CSSProperties}
                onClick={() => {
                  choose(i);
                  setOpen(false);
                }}
              >
                <small>{pad(i + 1)}</small>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <a className="hb-xj2-pcta" href={cta.href}>
            {cta.label}
            <ArrowUpRight />
          </a>
        )}
      </nav>
      <div className="hb-xj2-main">
        {children ??
          (showBackdrop && (
            <div className="hb-xj2-page" aria-hidden="true">
              <div className="hb-xj2-kicker">Independent design studio, Lisbon</div>
              <h2>
                Brands and interfaces with a <span>point of view</span>.
              </h2>
              <div className="hb-xj2-tiles">
                <div className="hb-xj2-tile">
                  <span>Ostra, identity system</span>
                  <small>2026</small>
                </div>
                <div className="hb-xj2-tile">
                  <span>Lumo banking app</span>
                  <small>2025</small>
                </div>
                <div className="hb-xj2-tile">
                  <span>Kiln ceramics</span>
                  <small>2025</small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

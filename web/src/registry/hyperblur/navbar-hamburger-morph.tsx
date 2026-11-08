"use client";

import * as React from "react";

export interface NavbarHamburgerMorphLink {
  label: string;
  href: string;
  note?: string;
}

export interface NavbarHamburgerMorphProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  tagline?: string;
  links?: NavbarHamburgerMorphLink[];
  socials?: NavbarHamburgerMorphLink[];
  email?: string;
  address?: string;
  availability?: string | null;
  cta?: { label: string; href: string } | null;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  accent?: string;
  paper?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi8 {
  --hb-xi8-accent: #ff5b2e;
  --hb-xi8-paper: #ece8df;
  --hb-xi8-ink: #121110;
  --hb-xi8-ease: cubic-bezier(.76,0,.24,1);
  --hb-xi8-out: cubic-bezier(.22,1,.36,1);
  --hb-xi8-cx: calc(100% - 60px);
  --hb-xi8-cy: 40px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0c0c0b;
  color: #f2efe8;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi8 *, .hb-xi8 *::before, .hb-xi8 *::after { box-sizing: border-box; }
.hb-xi8-bar { position: relative; z-index: 62; transition: color .5s var(--hb-xi8-ease) .1s; }
.hb-xi8[data-open="true"] .hb-xi8-bar { color: var(--hb-xi8-ink); }
.hb-xi8-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; max-width: 1200px; height: 80px; margin: 0 auto; padding: 0 28px; }
.hb-xi8-brand { justify-self: start; display: inline-flex; align-items: baseline; gap: 2px; color: inherit; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 700; letter-spacing: -.05em; text-decoration: none; border-radius: 6px; }
.hb-xi8-brand span { color: var(--hb-xi8-accent); }
.hb-xi8-tag { color: currentColor; opacity: .55; font-size: 13px; white-space: nowrap; transition: opacity .3s ease; }
.hb-xi8-end { justify-self: end; display: flex; align-items: center; gap: 10px; }
.hb-xi8-talk { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; box-shadow: 0 0 0 1px currentColor inset; color: inherit; font-size: 14px; font-weight: 500; text-decoration: none; opacity: .9; transition: background-color .3s ease, color .3s ease, opacity .3s ease; }
.hb-xi8-talk:hover { background: #f2efe8; color: #0c0c0b; opacity: 1; }
.hb-xi8[data-open="true"] .hb-xi8-talk { opacity: 0; pointer-events: none; }
.hb-xi8-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  margin: 0;
  padding: 0 8px 0 20px;
  border: 0;
  border-radius: 999px;
  background: #f2efe8;
  color: #0c0c0b;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 0 #fff inset, 0 10px 24px -12px rgba(0,0,0,.6);
  transition: background-color .5s var(--hb-xi8-ease), color .5s var(--hb-xi8-ease), transform .2s var(--hb-xi8-out);
}
.hb-xi8-btn:active { transform: scale(.96); }
.hb-xi8[data-open="true"] .hb-xi8-btn { background: var(--hb-xi8-ink); color: var(--hb-xi8-paper); box-shadow: 0 10px 24px -12px rgba(0,0,0,.5); }
.hb-xi8-roll { position: relative; display: block; height: 18px; overflow: hidden; line-height: 18px; }
.hb-xi8-roll span { display: block; transition: transform .55s var(--hb-xi8-ease); }
.hb-xi8[data-open="true"] .hb-xi8-roll span { transform: translateY(-100%); }
.hb-xi8-ico { position: relative; display: block; width: 32px; height: 32px; border-radius: 50%; background: var(--hb-xi8-accent); }
.hb-xi8-ico i { position: absolute; left: 9px; width: 14px; height: 1.8px; border-radius: 2px; background: #fff; font-style: normal; transition: transform .55s var(--hb-xi8-ease), top .55s var(--hb-xi8-ease), width .4s var(--hb-xi8-ease), opacity .3s ease; }
.hb-xi8-ico i:nth-child(1) { top: 11px; }
.hb-xi8-ico i:nth-child(2) { top: 15.1px; width: 9px; }
.hb-xi8-ico i:nth-child(3) { top: 19.2px; width: 11px; }
.hb-xi8-btn:hover .hb-xi8-ico i:nth-child(2), .hb-xi8-btn:hover .hb-xi8-ico i:nth-child(3) { width: 14px; }
.hb-xi8[data-open="true"] .hb-xi8-ico i:nth-child(1) { top: 15.1px; transform: rotate(45deg); transition-delay: .1s; }
.hb-xi8[data-open="true"] .hb-xi8-ico i:nth-child(2) { width: 0; opacity: 0; }
.hb-xi8[data-open="true"] .hb-xi8-ico i:nth-child(3) { top: 15.1px; width: 14px; transform: rotate(-45deg); transition-delay: .1s; }
.hb-xi8-veil {
  position: fixed;
  inset: 0;
  z-index: 61;
  height: 100dvh;
  overflow-y: auto;
  background: var(--hb-xi8-paper);
  color: var(--hb-xi8-ink);
  clip-path: circle(0px at var(--hb-xi8-cx) var(--hb-xi8-cy));
  visibility: hidden;
  transition: clip-path .8s var(--hb-xi8-ease), visibility 0s linear .8s;
}
.hb-xi8[data-embedded="true"] .hb-xi8-veil { position: absolute; height: auto; min-height: 100%; }
.hb-xi8[data-open="true"] .hb-xi8-veil { clip-path: circle(150% at var(--hb-xi8-cx) var(--hb-xi8-cy)); visibility: visible; transition: clip-path .9s var(--hb-xi8-ease), visibility 0s; }
.hb-xi8-in { display: grid; grid-template-columns: 1fr 300px; gap: 48px; max-width: 1200px; min-height: 100%; margin: 0 auto; padding: 120px 28px 32px; }
.hb-xi8-list { margin: 0; padding: 0; list-style: none; counter-reset: hb-xi8-n; }
.hb-xi8-li { overflow: hidden; border-top: 1px solid rgba(18,17,16,.12); }
.hb-xi8-li:last-child { border-bottom: 1px solid rgba(18,17,16,.12); }
.hb-xi8-a {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 10px 0;
  color: inherit;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(36px, 6.4cqi, 78px);
  font-weight: 600;
  letter-spacing: -.055em;
  line-height: 1;
  text-decoration: none;
  transform: translateY(110%);
  transition: transform .5s var(--hb-xi8-ease), opacity .35s ease, color .3s ease;
}
.hb-xi8[data-open="true"] .hb-xi8-a { transform: translateY(0); transition: transform .9s var(--hb-xi8-out) calc(.28s + var(--hb-xi8-i) * .06s), opacity .35s ease, color .3s ease; }
.hb-xi8-num { align-self: flex-start; margin-top: .3em; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; font-weight: 500; letter-spacing: 0; opacity: .5; }
.hb-xi8-txt { transition: transform .5s var(--hb-xi8-out); }
.hb-xi8-note { margin-left: auto; font-family: var(--font-sans, inherit); font-size: 13px; font-weight: 500; letter-spacing: 0; opacity: .55; }
.hb-xi8-arr { display: grid; place-items: center; width: .7em; height: .7em; border-radius: 50%; background: var(--hb-xi8-accent); color: #fff; transform: scale(0) rotate(-45deg); transition: transform .45s var(--hb-xi8-out); }
.hb-xi8-arr svg { width: 40%; height: 40%; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi8-list:hover .hb-xi8-a, .hb-xi8-list:focus-within .hb-xi8-a { opacity: .28; }
.hb-xi8-list .hb-xi8-a:hover, .hb-xi8-list .hb-xi8-a:focus-visible { opacity: 1; }
.hb-xi8-a:hover .hb-xi8-txt, .hb-xi8-a:focus-visible .hb-xi8-txt { transform: translateX(14px); }
.hb-xi8-a:hover .hb-xi8-arr, .hb-xi8-a:focus-visible .hb-xi8-arr { transform: scale(1) rotate(0deg); }
.hb-xi8-a[aria-current="page"] .hb-xi8-num { color: var(--hb-xi8-accent); opacity: 1; }
.hb-xi8-side { display: flex; flex-direction: column; gap: 28px; padding-top: 12px; opacity: 0; transform: translateY(16px); transition: opacity .3s ease, transform .5s var(--hb-xi8-ease); }
.hb-xi8[data-open="true"] .hb-xi8-side { opacity: 1; transform: none; transition: opacity .6s ease .55s, transform .9s var(--hb-xi8-out) .5s; }
.hb-xi8-k { margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; opacity: .5; }
.hb-xi8-mail { color: inherit; font-size: 20px; font-weight: 600; letter-spacing: -.02em; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; text-decoration-color: rgba(18,17,16,.3); transition: text-decoration-color .2s ease; }
.hb-xi8-mail:hover { text-decoration-color: var(--hb-xi8-accent); }
.hb-xi8-soc { display: flex; flex-wrap: wrap; gap: 8px; }
.hb-xi8-soc a { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 999px; box-shadow: 0 0 0 1px rgba(18,17,16,.18) inset; color: inherit; font-size: 13px; font-weight: 500; text-decoration: none; transition: background-color .2s ease, color .2s ease; }
.hb-xi8-soc a:hover { background: var(--hb-xi8-ink); color: var(--hb-xi8-paper); }
.hb-xi8-addr { margin: 0; font-size: 14px; line-height: 1.55; opacity: .75; white-space: pre-line; }
.hb-xi8-avail { display: inline-flex; align-items: center; gap: 10px; align-self: flex-start; margin-top: auto; padding: 10px 14px; border-radius: 12px; background: rgba(18,17,16,.06); font-size: 13px; font-weight: 500; }
.hb-xi8-avail::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #1fae5b; box-shadow: 0 0 0 0 rgba(31,174,91,.5); animation: hb-xi8-ping 2s ease-out infinite; }
.hb-xi8 a:focus-visible, .hb-xi8 button:focus-visible { outline: 2px solid var(--hb-xi8-accent); outline-offset: 3px; }
.hb-xi8-stage { position: relative; height: 640px; overflow: hidden; }
.hb-xi8-hero { max-width: 1200px; margin: 0 auto; padding: 60px 28px 0; }
.hb-xi8-h { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(40px, 8cqi, 104px); font-weight: 600; letter-spacing: -.06em; line-height: .92; }
.hb-xi8-h span { color: var(--hb-xi8-accent); }
.hb-xi8-work { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 16px; margin-top: 44px; }
.hb-xi8-work span { height: 240px; border-radius: 16px; }
@keyframes hb-xi8-ping { 0% { box-shadow: 0 0 0 0 rgba(31,174,91,.5); } 80%, 100% { box-shadow: 0 0 0 8px rgba(31,174,91,0); } }
@container (max-width: 760px) {
  .hb-xi8-row { grid-template-columns: 1fr auto; height: 68px; padding: 0 16px; }
  .hb-xi8-tag, .hb-xi8-talk { display: none; }
  .hb-xi8-btn { height: 44px; padding: 0 6px 0 16px; }
  .hb-xi8-in { grid-template-columns: 1fr; gap: 32px; padding: 92px 16px 24px; }
  .hb-xi8-a { font-size: clamp(34px, 11cqi, 52px); padding: 8px 0; }
  .hb-xi8-note { display: none; }
  .hb-xi8-side { gap: 20px; }
  .hb-xi8-work { grid-template-columns: 1fr 1fr; }
  .hb-xi8-work span:first-child { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi8 *, .hb-xi8 *::before, .hb-xi8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarHamburgerMorphLink[] = [
  { label: "Work", href: "#", note: "32 projects" },
  { label: "Studio", href: "#", note: "Since 2014" },
  { label: "Services", href: "#", note: "Brand, product, spatial" },
  { label: "Journal", href: "#", note: "Latest: On quiet interfaces" },
  { label: "Contact", href: "#" },
];

const defaultSocials: NavbarHamburgerMorphLink[] = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Are.na", href: "#" },
];

export function NavbarHamburgerMorph({
  brand = "Wren",
  tagline = "Independent design studio, Lisbon",
  links = defaultLinks,
  socials = defaultSocials,
  email = "hello@wren.studio",
  address = "Rua da Boavista 84\n1200-066 Lisbon, Portugal",
  availability = "Taking new projects for Q1 2027",
  cta = { label: "Let's talk", href: "#" },
  open,
  defaultOpen = false,
  onOpenChange,
  embedded = false,
  accent = "#ff5b2e",
  paper = "#ece8df",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarHamburgerMorphProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const veilRef = React.useRef<HTMLDivElement>(null);
  const userToggled = React.useRef(false);
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;

  const setOpen = (v: boolean) => {
    userToggled.current = true;
    const root = rootRef.current;
    const btn = btnRef.current;
    if (v && root && btn) {
      const ico = btn.querySelector<HTMLElement>(".hb-xi8-ico") ?? btn;
      const r = ico.getBoundingClientRect();
      const box = embedded ? root.getBoundingClientRect() : { left: 0, top: 0 };
      root.style.setProperty("--hb-xi8-cx", `${(r.left + r.width / 2 - box.left).toFixed(1)}px`);
      root.style.setProperty("--hb-xi8-cy", `${(r.top + r.height / 2 - box.top).toFixed(1)}px`);
    }
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  };

  React.useEffect(() => {
    if (!isOpen || embedded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen, embedded]);

  React.useEffect(() => {
    if (!userToggled.current) return;
    if (isOpen) {
      const first = veilRef.current?.querySelector<HTMLElement>("a[href]");
      const t = window.setTimeout(() => first?.focus({ preventScroll: true }), 120);
      return () => window.clearTimeout(t);
    }
    btnRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const veil = veilRef.current;
    const btn = btnRef.current;
    if (!veil || !btn) return;
    const nodes = [btn, ...Array.from(veil.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))];
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const at = document.activeElement;
    if (!nodes.includes(at as HTMLElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && at === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && at === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const arrow = (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
    </svg>
  );

  return (
    <header
      ref={rootRef}
      className={`hb-xi8 ${className}`}
      data-open={isOpen ? "true" : "false"}
      data-embedded={embedded ? "true" : "false"}
      style={{ "--hb-xi8-accent": accent, "--hb-xi8-paper": paper, ...style } as React.CSSProperties}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-navbar-hamburger-morph" precedence="default">
        {css}
      </style>
      <div className="hb-xi8-bar">
        <div className="hb-xi8-row">
          <a href="#" className="hb-xi8-brand" aria-label={`${brand} home`} tabIndex={isOpen ? -1 : undefined}>
            {brand}
            <span>.</span>
          </a>
          <span className="hb-xi8-tag">{tagline}</span>
          <div className="hb-xi8-end">
            {cta && (
              <a href={cta.href} className="hb-xi8-talk" tabIndex={isOpen ? -1 : undefined}>
                {cta.label}
              </a>
            )}
            <button
              ref={btnRef}
              type="button"
              className="hb-xi8-btn"
              aria-expanded={isOpen}
              aria-controls={`${uid}-menu`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!isOpen)}
            >
              <span className="hb-xi8-roll" aria-hidden="true">
                <span>Menu</span>
                <span>Close</span>
              </span>
              <span className="hb-xi8-ico" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={veilRef}
        id={`${uid}-menu`}
        className="hb-xi8-veil"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="hb-xi8-in">
          <nav aria-label="Main">
            <ul className="hb-xi8-list">
              {links.map((link, i) => (
                <li key={link.label} className="hb-xi8-li">
                  <a
                    href={link.href}
                    className="hb-xi8-a"
                    aria-current={i === 0 ? "page" : undefined}
                    style={{ "--hb-xi8-i": i } as React.CSSProperties}
                    onClick={() => setOpen(false)}
                  >
                    <span className="hb-xi8-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="hb-xi8-txt">{link.label}</span>
                    <span className="hb-xi8-arr" aria-hidden="true">
                      {arrow}
                    </span>
                    {link.note && <span className="hb-xi8-note">{link.note}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hb-xi8-side">
            <div>
              <p className="hb-xi8-k">New business</p>
              <a href={`mailto:${email}`} className="hb-xi8-mail">
                {email}
              </a>
            </div>
            {socials.length > 0 && (
              <div>
                <p className="hb-xi8-k">Follow</p>
                <div className="hb-xi8-soc">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="hb-xi8-k">Studio</p>
              <p className="hb-xi8-addr">{address}</p>
            </div>
            {availability && <span className="hb-xi8-avail">{availability}</span>}
          </div>
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xi8-stage" aria-hidden="true">
          <div className="hb-xi8-hero">
            <h2 className="hb-xi8-h">
              Spaces, brands and
              <br />
              products with <span>nerve.</span>
            </h2>
            <div className="hb-xi8-work">
              <span style={{ background: "linear-gradient(150deg, #d9b48f, #6b3f2a)" }} />
              <span style={{ background: "linear-gradient(150deg, #9fb7c9, #2c3e50)" }} />
              <span style={{ background: "linear-gradient(150deg, #c7c9a1, #4a4f2a)" }} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

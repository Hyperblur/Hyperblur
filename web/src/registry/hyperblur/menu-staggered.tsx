"use client";

import * as React from "react";

export interface MenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface MenuStaggeredProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  links?: MenuLink[];
  footer?: MenuLink[];
  brand?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "right" | "left";
  accent?: string;
  menuLabel?: string;
}

const defaultLinks: MenuLink[] = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const defaultFooter: MenuLink[] = [
  { label: "Instagram", href: "#instagram" },
  { label: "Dribbble", href: "#dribbble" },
  { label: "LinkedIn", href: "#linkedin" },
];

const css = `
.hb-qu4 {
  --hb-qu4-a: #2f7bff;
  --hb-qu4-bar: 48px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 180px;
  overflow: hidden;
  container-type: inline-size;
  font-family: inherit;
  color: #ededed;
  background: #0a0a0a;
  isolation: isolate;
}
.hb-qu4 *, .hb-qu4 *::before, .hb-qu4 *::after { box-sizing: border-box; }
.hb-qu4-page {
  position: absolute;
  inset: 0;
  padding-top: var(--hb-qu4-bar);
  transform-origin: 50% 60%;
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), filter 0.8s ease;
}
.hb-qu4[data-open="true"] .hb-qu4-page { transform: scale(0.94); filter: brightness(0.55); }
.hb-qu4-hero {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 18px;
  background:
    radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--hb-qu4-a) 35%, transparent), transparent 55%),
    linear-gradient(180deg, #111111, #0a0a0a);
}
.hb-qu4-hero b { font-size: 26px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.1; }
.hb-qu4-hero span { margin-top: 6px; font-size: 12px; color: #8f8f8f; }
.hb-qu4-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  display: flex;
  height: var(--hb-qu4-bar);
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 18px;
}
.hb-qu4-brand { font-size: 14px; font-weight: 650; letter-spacing: 0.01em; }
.hb-qu4-btn {
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  color: #ededed;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hb-qu4-btn:hover { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.28); }
.hb-qu4-btn:focus-visible, .hb-qu4-link:focus-visible, .hb-qu4-foot a:focus-visible {
  outline: 2px solid var(--hb-qu4-a);
  outline-offset: 3px;
}
.hb-qu4-bar-line {
  position: absolute;
  left: 12px;
  top: 50%;
  width: 14px;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.2s ease;
}
.hb-qu4-bar-line:nth-child(1) { transform: translateY(-4px); }
.hb-qu4-bar-line:nth-child(2) { opacity: 1; }
.hb-qu4-bar-line:nth-child(3) { transform: translateY(4px); }
.hb-qu4-btn[aria-expanded="true"] .hb-qu4-bar-line:nth-child(1) { transform: rotate(45deg); }
.hb-qu4-btn[aria-expanded="true"] .hb-qu4-bar-line:nth-child(2) { opacity: 0; }
.hb-qu4-btn[aria-expanded="true"] .hb-qu4-bar-line:nth-child(3) { transform: rotate(-45deg); }
.hb-qu4-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  visibility: hidden;
  transition: visibility 0s linear 1s;
}
.hb-qu4[data-open="true"] .hb-qu4-layer { visibility: visible; transition-delay: 0s; }
.hb-qu4-pn {
  position: absolute;
  inset: 0;
  transform: translateX(100%);
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
}
.hb-qu4[data-side="left"] .hb-qu4-pn { transform: translateX(-100%); }
.hb-qu4[data-open="true"] .hb-qu4-pn { transform: translateX(0); }
.hb-qu4-pn[data-n="1"] { background: var(--hb-qu4-a); transition-delay: 0.14s; }
.hb-qu4-pn[data-n="2"] { background: color-mix(in srgb, var(--hb-qu4-a) 30%, #111111); transition-delay: 0.07s; }
.hb-qu4-pn[data-n="3"] {
  display: flex;
  flex-direction: column;
  padding: var(--hb-qu4-bar) 22px 16px;
  background: #101010;
  transition-delay: 0s;
}
.hb-qu4[data-open="true"] .hb-qu4-pn[data-n="1"] { transition-delay: 0s; }
.hb-qu4[data-open="true"] .hb-qu4-pn[data-n="2"] { transition-delay: 0.08s; }
.hb-qu4[data-open="true"] .hb-qu4-pn[data-n="3"] { transition-delay: 0.16s; }
.hb-qu4-list { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-qu4-item { overflow: hidden; }
.hb-qu4-link {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  padding: 3px 0 4px;
  color: #ededed;
  text-decoration: none;
  font-size: clamp(18px, 6.2cqw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  transition: color 0.25s ease;
}
.hb-qu4-link:hover { color: #7fb3ff; }
.hb-qu4-clip { display: block; overflow: hidden; padding-bottom: 2px; }
.hb-qu4-txt {
  display: block;
  transform: translateY(115%);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qu4[data-open="true"] .hb-qu4-txt { transform: translateY(0); transition-delay: calc(0.42s + var(--hb-qu4-i) * 0.07s); }
.hb-qu4-num {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #6b6b6b;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  transition: opacity 0.4s ease, color 0.25s ease;
}
.hb-qu4[data-open="true"] .hb-qu4-num { opacity: 1; transition-delay: calc(0.5s + var(--hb-qu4-i) * 0.07s); }
.hb-qu4-link:hover .hb-qu4-num { color: var(--hb-qu4-a); }
.hb-qu4-ar {
  margin-left: 2px;
  align-self: center;
  color: #7fb3ff;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.hb-qu4-link:hover .hb-qu4-ar, .hb-qu4-link:focus-visible .hb-qu4-ar { opacity: 1; transform: none; }
.hb-qu4-foot {
  position: absolute;
  right: 22px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.hb-qu4[data-open="true"] .hb-qu4-foot { opacity: 1; transition-delay: 0.85s; }
.hb-qu4-foot a { font-size: 11px; color: #8f8f8f; text-decoration: none; transition: color 0.2s ease; }
.hb-qu4-foot a:hover { color: #ededed; }
@container (max-width: 299px) {
  .hb-qu4-foot { position: static; flex-direction: row; align-items: center; gap: 12px; margin-top: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qu4-page, .hb-qu4-pn, .hb-qu4-txt, .hb-qu4-num, .hb-qu4-foot, .hb-qu4-bar-line, .hb-qu4-layer {
    transition: none !important;
  }
}
`;

export function MenuStaggered({
  links = defaultLinks,
  footer = defaultFooter,
  brand = "Atelier",
  open,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  accent = "#2f7bff",
  menuLabel = "Main menu",
  children,
  className = "",
  style,
  onKeyDown,
  ...rest
}: MenuStaggeredProps) {
  const controlled = open !== undefined;
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = controlled ? open : inner;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef(0);
  const menuId = React.useId();

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  function setOpen(next: boolean) {
    if (!controlled) setInner(next);
    onOpenChange?.(next);
    window.clearTimeout(timer.current);
    if (next) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      timer.current = window.setTimeout(
        () => {
          const first = rootRef.current?.querySelector<HTMLElement>(".hb-qu4-link");
          first?.focus({ preventScroll: true });
        },
        reduce ? 0 : 520,
      );
    } else {
      btnRef.current?.focus({ preventScroll: true });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || !isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("button, a[href]"),
    ).filter((el) => !el.closest("[inert]"));
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !root.contains(active))) {
      e.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!e.shiftKey && (active === last || !root.contains(active))) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  function renderLink(link: MenuLink, extra?: React.ReactNode, props?: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const href = link.href ?? "#";
    return (
      <a
        href={href}
        {...props}
        onClick={(e) => {
          if (href === "#") e.preventDefault();
          link.onClick?.();
          setOpen(false);
        }}
      >
        {extra}
      </a>
    );
  }

  const vars = { "--hb-qu4-a": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-menu-staggered" precedence="default">{css}</style>
      <div
        ref={rootRef}
        data-open={isOpen}
        data-side={side}
        className={`hb-qu4 ${className}`}
        style={vars}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <header className="hb-qu4-bar">
          <span className="hb-qu4-brand">{brand}</span>
          <button
            ref={btnRef}
            type="button"
            className="hb-qu4-btn"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!isOpen)}
          >
            <span className="hb-qu4-bar-line" />
            <span className="hb-qu4-bar-line" />
            <span className="hb-qu4-bar-line" />
          </button>
        </header>
        <div className="hb-qu4-page" inert={isOpen}>
          {children ?? (
            <div className="hb-qu4-hero">
              <b>Spaces that feel lived in.</b>
              <span>Interior studio, Copenhagen</span>
            </div>
          )}
        </div>
        <div className="hb-qu4-layer" inert={!isOpen}>
          <div className="hb-qu4-pn" data-n="1" aria-hidden="true" />
          <div className="hb-qu4-pn" data-n="2" aria-hidden="true" />
          <nav id={menuId} className="hb-qu4-pn" data-n="3" aria-label={menuLabel}>
            <ul className="hb-qu4-list">
              {links.map((link, i) => (
                <li key={`${link.label}-${i}`} className="hb-qu4-item">
                  {renderLink(
                    link,
                    <>
                      <span className="hb-qu4-num" style={{ "--hb-qu4-i": i } as React.CSSProperties}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="hb-qu4-clip">
                        <span className="hb-qu4-txt" style={{ "--hb-qu4-i": i } as React.CSSProperties}>
                          {link.label}
                        </span>
                      </span>
                      <svg className="hb-qu4-ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>,
                    { className: "hb-qu4-link" },
                  )}
                </li>
              ))}
            </ul>
            {footer.length > 0 ? (
              <div className="hb-qu4-foot">
                {footer.map((f, i) => (
                  <React.Fragment key={`${f.label}-${i}`}>{renderLink(f, f.label)}</React.Fragment>
                ))}
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  );
}

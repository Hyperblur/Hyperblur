"use client";

import * as React from "react";

export interface NavCardLink {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface NavCardCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavCardExpandProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children"> {
  links?: NavCardLink[];
  brand?: React.ReactNode;
  cta?: NavCardCta;
  note?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  accent?: string;
  menuLabel?: string;
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const defaultLinks: NavCardLink[] = [
  {
    title: "Components",
    description: "Buttons, menus and charts",
    href: "#components",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Guides",
    description: "Setup and theming",
    href: "#guides",
    icon: (
      <svg {...iconProps}>
        <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4z" />
        <path d="M9 9h6M9 13h4" />
      </svg>
    ),
  },
  {
    title: "Templates",
    description: "Full pages to start from",
    href: "#templates",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M9 9v11" />
      </svg>
    ),
  },
];

const css = `
.hb-qu5 {
  --hb-qu5-a: #2f7bff;
  --hb-qu5-bar: 46px;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: var(--hb-qu5-bar);
  font-family: inherit;
  color: #ededed;
  container-type: inline-size;
  z-index: 20;
}
.hb-qu5 *, .hb-qu5 *::before, .hb-qu5 *::after { box-sizing: border-box; }
.hb-qu5-card {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  background: rgba(17, 17, 17, 0.88);
  border: 1px solid #262626;
  border-radius: 16px;
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: border-color 0.3s ease, box-shadow 0.4s ease;
}
.hb-qu5[data-open="true"] .hb-qu5-card {
  border-color: #333333;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 24px 60px rgba(0, 0, 0, 0.55);
}
.hb-qu5-bar {
  display: flex;
  height: calc(var(--hb-qu5-bar) - 2px);
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 0 14px;
}
.hb-qu5-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.005em;
}
.hb-qu5-mark {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background: linear-gradient(135deg, #7fb3ff, var(--hb-qu5-a));
  transform: rotate(-12deg);
}
.hb-qu5-btn {
  display: inline-flex;
  height: 32px;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0 12px 0 14px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #ededed;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hb-qu5-btn:hover { background: rgba(255, 255, 255, 0.11); border-color: rgba(255, 255, 255, 0.24); }
.hb-qu5-btn:focus-visible, .hb-qu5-link:focus-visible, .hb-qu5-cta:focus-visible {
  outline: 2px solid var(--hb-qu5-a);
  outline-offset: 2px;
}
.hb-qu5-lbl { display: grid; }
.hb-qu5-lbl > span { grid-area: 1 / 1; transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-qu5-lbl > span:last-child { opacity: 0; transform: translateY(6px); }
.hb-qu5[data-open="true"] .hb-qu5-lbl > span:first-child { opacity: 0; transform: translateY(-6px); }
.hb-qu5[data-open="true"] .hb-qu5-lbl > span:last-child { opacity: 1; transform: none; }
.hb-qu5-ico { position: relative; display: block; width: 14px; height: 14px; }
.hb-qu5-ico i {
  position: absolute;
  left: 0;
  top: 50%;
  width: 14px;
  height: 1.8px;
  margin-top: -0.9px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
}
.hb-qu5-ico i:first-child { transform: translateY(-3px); }
.hb-qu5-ico i:last-child { transform: translateY(3px); }
.hb-qu5[data-open="true"] .hb-qu5-ico i:first-child { transform: rotate(45deg); }
.hb-qu5[data-open="true"] .hb-qu5-ico i:last-child { transform: rotate(-45deg); }
.hb-qu5-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}
.hb-qu5[data-open="true"] .hb-qu5-wrap { grid-template-rows: 1fr; }
.hb-qu5-inner { min-height: 0; overflow: hidden; }
.hb-qu5-body { padding: 2px 8px 8px; }
.hb-qu5-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-qu5-li {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.hb-qu5[data-open="true"] .hb-qu5-li {
  opacity: 1;
  transform: none;
  transition: opacity 0.5s ease calc(0.14s + var(--hb-qu5-i) * 0.06s), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) calc(0.14s + var(--hb-qu5-i) * 0.06s);
}
.hb-qu5-link {
  position: relative;
  display: flex;
  height: 100%;
  min-height: 70px;
  flex-direction: column;
  gap: 2px;
  padding: 8px 8px 7px;
  color: inherit;
  text-decoration: none;
  background: #171717;
  border: 1px solid #232323;
  border-radius: 12px;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.hb-qu5-link:hover { background: #1c1c1c; border-color: color-mix(in srgb, var(--hb-qu5-a) 60%, #232323); transform: translateY(-1px); }
.hb-qu5-tile {
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  margin-bottom: 4px;
  color: #7fb3ff;
  background: color-mix(in srgb, var(--hb-qu5-a) 16%, transparent);
  border-radius: 8px;
}
.hb-qu5-t { font-size: 12px; font-weight: 600; line-height: 1.2; }
.hb-qu5-d {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 10.5px;
  line-height: 1.3;
  color: #8f8f8f;
}
.hb-qu5-ar {
  position: absolute;
  right: 7px;
  top: 8px;
  color: #7fb3ff;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hb-qu5-link:hover .hb-qu5-ar, .hb-qu5-link:focus-visible .hb-qu5-ar { opacity: 1; transform: none; }
.hb-qu5-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 8px;
  padding: 0 2px 0 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.hb-qu5[data-open="true"] .hb-qu5-foot { opacity: 1; transition: opacity 0.5s ease 0.34s; }
.hb-qu5-note { min-width: 0; overflow: hidden; font-size: 11px; color: #8f8f8f; text-overflow: ellipsis; white-space: nowrap; }
.hb-qu5-cta {
  display: inline-flex;
  flex: none;
  height: 28px;
  align-items: center;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 650;
  color: #0a0a0a;
  text-decoration: none;
  background: #ededed;
  border-radius: 999px;
  transition: background 0.2s ease, transform 0.2s ease;
}
.hb-qu5-cta:hover { background: #ffffff; }
.hb-qu5-cta:active { transform: scale(0.96); }
@container (max-width: 279px) {
  .hb-qu5-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-qu5-link { min-height: 0; flex-direction: row; align-items: center; gap: 10px; }
  .hb-qu5-tile { flex: none; margin-bottom: 0; }
  .hb-qu5-d { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qu5-wrap, .hb-qu5-li, .hb-qu5-lbl > span, .hb-qu5-ico i, .hb-qu5-foot, .hb-qu5-link, .hb-qu5-card {
    transition: none !important;
  }
}
`;

export function NavCardExpand({
  links = defaultLinks,
  brand = "Northlight",
  cta = { label: "Get started", href: "#start" },
  note = "New: dark mode tokens",
  open,
  defaultOpen = false,
  onOpenChange,
  accent = "#2f7bff",
  menuLabel = "Primary",
  className = "",
  style,
  onKeyDown,
  ...rest
}: NavCardExpandProps) {
  const controlled = open !== undefined;
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = controlled ? open : inner;
  const rootRef = React.useRef<HTMLElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const closeRef = React.useRef<() => void>(() => undefined);

  function setOpen(next: boolean) {
    if (!controlled) setInner(next);
    onOpenChange?.(next);
  }

  React.useEffect(() => {
    closeRef.current = () => setOpen(false);
  });

  React.useEffect(() => {
    if (!isOpen) return;
    function onDown(e: PointerEvent) {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) closeRef.current();
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || !isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus({ preventScroll: true });
      return;
    }
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".hb-qu5-link, .hb-qu5-cta"));
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    nodes[(at + dir + nodes.length) % nodes.length].focus({ preventScroll: true });
  }

  const vars = { "--hb-qu5-a": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-nav-card-expand" precedence="default">{css}</style>
      <nav
        ref={rootRef}
        aria-label={menuLabel}
        data-open={isOpen}
        className={`hb-qu5 ${className}`}
        style={vars}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="hb-qu5-card">
          <div className="hb-qu5-bar">
            <span className="hb-qu5-brand">
              <span className="hb-qu5-mark" aria-hidden="true" />
              {brand}
            </span>
            <button
              ref={btnRef}
              type="button"
              className="hb-qu5-btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!isOpen)}
            >
              <span className="hb-qu5-lbl" aria-hidden="true">
                <span>Menu</span>
                <span>Close</span>
              </span>
              <span className="hb-qu5-ico" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
          <div id={panelId} className="hb-qu5-wrap" inert={!isOpen}>
            <div className="hb-qu5-inner">
              <div className="hb-qu5-body">
                <ul className="hb-qu5-grid">
                  {links.map((link, i) => (
                    <li
                      key={`${link.title}-${i}`}
                      className="hb-qu5-li"
                      style={{ "--hb-qu5-i": i } as React.CSSProperties}
                    >
                      <a
                        href={link.href ?? "#"}
                        className="hb-qu5-link"
                        onClick={(e) => {
                          if (!link.href || link.href === "#") e.preventDefault();
                          setOpen(false);
                        }}
                      >
                        {link.icon ? <span className="hb-qu5-tile">{link.icon}</span> : null}
                        <span className="hb-qu5-t">{link.title}</span>
                        {link.description ? <span className="hb-qu5-d">{link.description}</span> : null}
                        <svg className="hb-qu5-ar" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="hb-qu5-foot">
                  <span className="hb-qu5-note">{note}</span>
                  {cta ? (
                    <a
                      className="hb-qu5-cta"
                      href={cta.href ?? "#"}
                      onClick={(e) => {
                        if (!cta.href || cta.href === "#") e.preventDefault();
                        cta.onClick?.();
                        setOpen(false);
                      }}
                    >
                      {cta.label}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

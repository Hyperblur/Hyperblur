"use client";

import * as React from "react";

export interface MenuSidePushItem {
  id: string;
  label: string;
  href?: string;
  meta?: string;
}

export interface MenuSidePushProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  items?: MenuSidePushItem[];
  secondary?: { label: string; href?: string }[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
  brand?: string;
  note?: string;
  menuWidth?: number;
  embedded?: boolean;
  accent?: string;
  children?: React.ReactNode;
}

const defaultItems: MenuSidePushItem[] = [
  { id: "work", label: "Work", meta: "24" },
  { id: "studio", label: "Studio" },
  { id: "journal", label: "Journal", meta: "New" },
  { id: "careers", label: "Careers", meta: "3" },
  { id: "contact", label: "Contact" },
];

const defaultSecondary = [{ label: "Instagram" }, { label: "Dribbble" }, { label: "LinkedIn" }];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const css = `
.hb-xk2 {
  --hb-xk2-a: #2f7bff;
  --hb-xk2-mw: 220px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--hb-xk2-a) 16%, transparent), transparent 60%),
    #070707;
  color: #ededed;
  font-family: inherit;
  isolation: isolate;
}
.hb-xk2[data-embedded="true"] { height: 100%; }
.hb-xk2 *, .hb-xk2 *::before, .hb-xk2 *::after { box-sizing: border-box; }
.hb-xk2-trigger {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 30;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 11px;
  background: rgba(20, 20, 20, .72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 8px 20px -10px rgba(0, 0, 0, .8);
  color: #ededed;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color .2s ease, transform .2s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk2-trigger:hover { background: rgba(34, 34, 34, .9); }
.hb-xk2-trigger:active { transform: scale(.94); }
.hb-xk2-trigger:focus-visible { outline: 2px solid var(--hb-xk2-a); outline-offset: 2px; }
.hb-xk2-bars { position: relative; width: 16px; height: 12px; }
.hb-xk2-bars span { position: absolute; left: 0; width: 16px; height: 1.6px; border-radius: 2px; background: currentColor; transition: transform .42s cubic-bezier(.65, 0, .35, 1), opacity .2s ease, width .3s ease; }
.hb-xk2-bars span:nth-child(1) { top: 0; }
.hb-xk2-bars span:nth-child(2) { top: 5.2px; width: 11px; }
.hb-xk2-bars span:nth-child(3) { top: 10.4px; }
.hb-xk2[data-open="true"] .hb-xk2-bars span:nth-child(1) { transform: translateY(5.2px) rotate(45deg); }
.hb-xk2[data-open="true"] .hb-xk2-bars span:nth-child(2) { opacity: 0; width: 0; }
.hb-xk2[data-open="true"] .hb-xk2-bars span:nth-child(3) { transform: translateY(-5.2px) rotate(-45deg); }
.hb-xk2-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: var(--hb-xk2-mw);
  padding: 16px 18px 16px 20px;
  visibility: hidden;
  transition: visibility 0s linear .5s;
}
.hb-xk2[data-open="true"] .hb-xk2-menu { visibility: visible; transition: none; }
.hb-xk2-brand { display: flex; align-items: center; gap: 8px; height: 28px; margin: 2px 0 0 44px; color: #a1a1a1; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; white-space: nowrap; }
.hb-xk2-brand i { width: 6px; height: 6px; border-radius: 99px; background: var(--hb-xk2-a); box-shadow: 0 0 10px var(--hb-xk2-a); font-style: normal; }
.hb-xk2-list { display: flex; flex: 1; flex-direction: column; justify-content: center; gap: 2px; margin: 0; padding: 0; list-style: none; counter-reset: hb-xk2-n; }
.hb-xk2-li {
  counter-increment: hb-xk2-n;
  opacity: 0;
  transform: translateX(-18px);
  transition: opacity .2s ease, transform .3s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk2[data-open="true"] .hb-xk2-li {
  opacity: 1;
  transform: none;
  transition: opacity .4s ease, transform .6s cubic-bezier(.22, 1, .36, 1);
  transition-delay: calc(var(--hb-xk2-i) * 45ms + 140ms);
}
.hb-xk2-link {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 3px 0;
  border: 0;
  background: none;
  color: #6c6c72;
  font: inherit;
  font-family: var(--font-grotesk, inherit);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -.03em;
  line-height: 1.12;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-xk2-link::before { content: counter(hb-xk2-n, decimal-leading-zero); align-self: flex-start; margin-top: 5px; color: #4a4a50; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; letter-spacing: 0; transition: color .2s ease; }
.hb-xk2-text { position: relative; display: inline-block; transition: transform .35s cubic-bezier(.22, 1, .36, 1); }
.hb-xk2-text::after { content: ""; position: absolute; right: 0; bottom: 1px; left: 0; height: 1.5px; background: var(--hb-xk2-a); transform: scaleX(0); transform-origin: right; transition: transform .4s cubic-bezier(.65, 0, .35, 1); }
.hb-xk2-link:hover, .hb-xk2-link:focus-visible { color: #ededed; outline: none; }
.hb-xk2-link:hover .hb-xk2-text, .hb-xk2-link:focus-visible .hb-xk2-text { transform: translateX(4px); }
.hb-xk2-link:hover .hb-xk2-text::after, .hb-xk2-link:focus-visible .hb-xk2-text::after { transform: scaleX(1); transform-origin: left; }
.hb-xk2-link[aria-current="page"] { color: #fff; }
.hb-xk2-link[aria-current="page"]::before { color: var(--hb-xk2-a); }
.hb-xk2-meta { align-self: center; padding: 1px 6px; border: 1px solid #2a2a2a; border-radius: 99px; color: #8f8f8f; font-family: var(--font-sans, inherit); font-size: 9.5px; font-weight: 600; letter-spacing: .02em; line-height: 14px; }
.hb-xk2-link[aria-current="page"] .hb-xk2-meta { border-color: color-mix(in srgb, var(--hb-xk2-a) 50%, transparent); color: color-mix(in srgb, var(--hb-xk2-a) 50%, #fff); }
.hb-xk2-foot { display: flex; flex-direction: column; gap: 8px; opacity: 0; transition: opacity .2s ease; }
.hb-xk2[data-open="true"] .hb-xk2-foot { opacity: 1; transition: opacity .5s ease .42s; }
.hb-xk2-sec { display: flex; flex-wrap: wrap; gap: 4px 12px; }
.hb-xk2-sec a, .hb-xk2-sec span { color: #8f8f8f; font-size: 11px; text-decoration: none; transition: color .15s ease; }
.hb-xk2-sec a:hover, .hb-xk2-sec a:focus-visible { color: #ededed; outline: none; text-decoration: underline; text-underline-offset: 3px; }
.hb-xk2-note { display: flex; align-items: center; gap: 6px; color: #5f5f66; font-size: 10.5px; }
.hb-xk2-note::before { content: ""; width: 6px; height: 6px; border-radius: 99px; background: #30a46c; box-shadow: 0 0 0 3px rgba(48, 164, 108, .18); }
.hb-xk2-ghost, .hb-xk2-page {
  position: absolute;
  inset: 0;
  transform-origin: 0% 50%;
  transition: transform .62s cubic-bezier(.76, 0, .24, 1), border-radius .62s cubic-bezier(.76, 0, .24, 1), box-shadow .62s ease, opacity .5s ease;
}
.hb-xk2-ghost { z-index: 2; border-radius: 0; background: #151515; opacity: 0; }
.hb-xk2-page { z-index: 3; overflow: hidden; background: #0a0a0a; }
.hb-xk2-content { position: relative; width: 100%; height: 100%; overflow: auto; }
.hb-xk2[data-open="true"] .hb-xk2-ghost {
  border-radius: 18px;
  opacity: .55;
  transform: translateX(calc(var(--hb-xk2-mw) - 18px)) scale(.76);
}
.hb-xk2[data-open="true"] .hb-xk2-page {
  border-radius: 18px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .07), -30px 0 60px -20px rgba(0, 0, 0, .9);
  transform: translateX(var(--hb-xk2-mw)) scale(.84);
}
.hb-xk2-scrim {
  position: absolute;
  inset: 0;
  z-index: 4;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, .25);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s ease;
}
.hb-xk2[data-open="true"] .hb-xk2-scrim { opacity: 1; pointer-events: auto; }
@media (prefers-reduced-motion: reduce) {
  .hb-xk2 *, .hb-xk2 *::before, .hb-xk2 *::after { transition: none !important; }
}
`;

export function MenuSidePush({
  items = defaultItems,
  secondary = defaultSecondary,
  active,
  defaultActive,
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  brand = "Northfold Studio",
  note = "Booking projects for March",
  menuWidth = 220,
  embedded = false,
  accent = "#2f7bff",
  children,
  className = "",
  style,
  ...rest
}: MenuSidePushProps) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const isOpen = open ?? innerOpen;
  const current = active ?? inner;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();
  const interacted = React.useRef(false);

  const setOpen = React.useCallback(
    (next: boolean) => {
      interacted.current = true;
      if (open === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen || !interacted.current) return;
    const first = menuRef.current?.querySelector<HTMLElement>("[data-xk2-link]");
    const t = window.setTimeout(() => first?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || embedded) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [isOpen, embedded]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    rest.onKeyDown?.(e);
    if (!isOpen || e.defaultPrevented) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[data-xk2-link]") ?? []);
    const at = links.indexOf(document.activeElement as HTMLElement);
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && at >= 0) {
      e.preventDefault();
      const n = e.key === "ArrowDown" ? (at + 1) % links.length : (at - 1 + links.length) % links.length;
      links[n]?.focus();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = [triggerRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>(focusable) ?? [])].filter(
      (n): n is HTMLElement => !!n,
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function pick(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
    if (closeOnSelect) close();
  }

  const vars = { "--hb-xk2-a": accent, "--hb-xk2-mw": `${menuWidth}px`, ...style } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      {...rest}
      className={`hb-xk2 ${className}`}
      data-open={isOpen}
      data-embedded={embedded}
      style={vars}
      onKeyDown={onKeyDown}
    >
      <style href="hb-menu-side-push" precedence="default">{css}</style>
      <button
        ref={triggerRef}
        type="button"
        className="hb-xk2-trigger"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setOpen(!isOpen)}
      >
        <span className="hb-xk2-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div
        ref={menuRef}
        id={menuId}
        className="hb-xk2-menu"
        role="dialog"
        aria-modal={isOpen && !embedded ? true : undefined}
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="hb-xk2-brand">
          <i aria-hidden="true" />
          {brand}
        </div>
        <ul className="hb-xk2-list" role="list">
          {items.map((item, i) => {
            const body = (
              <>
                <span className="hb-xk2-text">{item.label}</span>
                {item.meta ? <span className="hb-xk2-meta">{item.meta}</span> : null}
              </>
            );
            const common = {
              className: "hb-xk2-link",
              "data-xk2-link": "",
              "aria-current": item.id === current ? ("page" as const) : undefined,
            };
            return (
              <li key={item.id} className="hb-xk2-li" style={{ "--hb-xk2-i": i } as React.CSSProperties}>
                {item.href ? (
                  <a {...common} href={item.href} onClick={() => pick(item.id)}>
                    {body}
                  </a>
                ) : (
                  <button {...common} type="button" onClick={() => pick(item.id)}>
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="hb-xk2-foot">
          <div className="hb-xk2-sec">
            {secondary.map((s) => (s.href ? <a key={s.label} href={s.href}>{s.label}</a> : <span key={s.label}>{s.label}</span>))}
          </div>
          {note ? <div className="hb-xk2-note">{note}</div> : null}
        </div>
      </div>
      <div className="hb-xk2-ghost" aria-hidden="true" />
      <div className="hb-xk2-page">
        <div className="hb-xk2-content" inert={isOpen}>
          {children}
        </div>
        <button type="button" className="hb-xk2-scrim" tabIndex={-1} aria-hidden="true" onClick={close} />
      </div>
    </div>
  );
}

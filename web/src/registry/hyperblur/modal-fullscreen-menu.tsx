"use client";

import * as React from "react";

export interface FullscreenMenuLink {
  label: string;
  href: string;
  meta?: string;
}

export interface FullscreenMenuContact {
  label: string;
  value: string;
  href?: string;
}

export interface ModalFullscreenMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  brand?: string;
  links?: FullscreenMenuLink[];
  contact?: FullscreenMenuContact[];
  note?: string;
  onNavigate?: (href: string) => void;
  accent?: string;
}

const defaultLinks: FullscreenMenuLink[] = [
  { label: "Work", href: "#work", meta: "24 projects" },
  { label: "Studio", href: "#studio", meta: "Since 2014" },
  { label: "Services", href: "#services", meta: "Brand, web, motion" },
  { label: "Journal", href: "#journal", meta: "New essay" },
  { label: "Contact", href: "#contact", meta: "Reply in 24h" },
];

const defaultContact: FullscreenMenuContact[] = [
  { label: "New business", value: "hello@northfold.studio", href: "mailto:hello@northfold.studio" },
  { label: "Studio", value: "88 Wythe Ave, Brooklyn" },
  { label: "Social", value: "Instagram · Dribbble · LinkedIn" },
];

const css = `
.hb-xe4 { --hb-xe4-accent: #ff5a36; display: inline-block; box-sizing: border-box; color: #f2f0eb; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe4 *, .hb-xe4 *::before, .hb-xe4 *::after { box-sizing: border-box; }
.hb-xe4[data-embedded] { position: relative; display: block; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0b0b0b; }
.hb-xe4-site { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 14px 16px; }
.hb-xe4-bar { display: flex; align-items: center; justify-content: space-between; }
.hb-xe4-logo { font-family: var(--font-grotesk, inherit); font-weight: 700; font-size: 14px; letter-spacing: -0.03em; }
.hb-xe4-hero { font-family: var(--font-grotesk, inherit); font-size: 26px; line-height: 1; letter-spacing: -0.045em; font-weight: 600; color: #3a3936; }
.hb-xe4-trigger { display: inline-flex; align-items: center; gap: 10px; height: 34px; padding: 0 6px 0 14px; border: 1px solid rgba(242, 240, 235, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.03); color: inherit; font: inherit; font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; transition: border-color 0.25s ease, background-color 0.25s ease; }
.hb-xe4-trigger:hover { border-color: rgba(242, 240, 235, 0.34); background: rgba(255, 255, 255, 0.06); }
.hb-xe4-trigger i { position: relative; display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--hb-xe4-accent); font-style: normal; }
.hb-xe4-trigger i::before, .hb-xe4-trigger i::after { content: ""; position: absolute; width: 10px; height: 1.5px; border-radius: 2px; background: #0b0b0b; transition: transform 0.3s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe4-trigger i::before { transform: translateY(-2.5px); }
.hb-xe4-trigger i::after { transform: translateY(2.5px); }
.hb-xe4-trigger:hover i::before { transform: translateY(-2.5px) scaleX(0.6); }
.hb-xe4 a:focus-visible, .hb-xe4 button:focus-visible { outline: 2px solid var(--hb-xe4-accent); outline-offset: 3px; }
.hb-xe4-layer { container-type: size; position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: flex; flex-direction: column; background: radial-gradient(90% 70% at 100% 0%, color-mix(in srgb, var(--hb-xe4-accent) 16%, transparent), transparent 60%), #0e0d0c; outline: none; clip-path: circle(150% at var(--hb-xe4-x, 100%) var(--hb-xe4-y, 0%)); animation: hb-xe4-open 0.8s cubic-bezier(0.7, 0, 0.2, 1) both; }
.hb-xe4[data-embedded] .hb-xe4-layer { position: absolute; height: auto; z-index: 2; }
.hb-xe4-layer[data-state="closed"] { animation: hb-xe4-close 0.55s cubic-bezier(0.7, 0, 0.3, 1) both; pointer-events: none; }
.hb-xe4-top { flex: none; display: flex; align-items: center; justify-content: space-between; padding: clamp(12px, 3.4cqh, 28px) clamp(14px, 4cqw, 40px); }
.hb-xe4-close { display: inline-flex; align-items: center; gap: 10px; height: 34px; padding: 0 6px 0 14px; border: 1px solid rgba(242, 240, 235, 0.16); border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; }
.hb-xe4-close i { position: relative; display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: #f2f0eb; font-style: normal; transition: transform 0.4s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe4-close:hover i { transform: rotate(90deg); }
.hb-xe4-close i::before, .hb-xe4-close i::after { content: ""; position: absolute; width: 10px; height: 1.5px; border-radius: 2px; background: #0b0b0b; transform: rotate(45deg); }
.hb-xe4-close i::after { transform: rotate(-45deg); }
.hb-xe4-main { flex: 1 1 auto; min-height: 0; display: grid; grid-template-columns: 1fr; align-items: end; gap: 24px; padding: 0 clamp(14px, 4cqw, 40px) clamp(14px, 5cqh, 44px); }
.hb-xe4-list { list-style: none; margin: 0; padding: 0; }
.hb-xe4-li { overflow: hidden; border-top: 1px solid rgba(242, 240, 235, 0.08); }
.hb-xe4-li:last-child { border-bottom: 1px solid rgba(242, 240, 235, 0.08); }
.hb-xe4-link { position: relative; display: flex; align-items: baseline; gap: clamp(8px, 2cqw, 22px); padding: clamp(1px, 0.6cqh, 8px) 0; color: inherit; text-decoration: none; transform: translateY(105%); animation: hb-xe4-rise 0.9s calc(0.32s + var(--hb-xe4-i) * 0.06s) cubic-bezier(0.2, 0.9, 0.1, 1) both; transition: opacity 0.35s ease, color 0.35s ease; border-radius: 4px; }
.hb-xe4-list:hover .hb-xe4-link:not(:hover), .hb-xe4-list:focus-within .hb-xe4-link:not(:focus-visible):not(:hover) { opacity: 0.32; }
.hb-xe4-idx { flex: none; width: clamp(18px, 4cqw, 34px); font-family: var(--font-mono, ui-monospace, monospace); font-size: clamp(9px, 1.6cqh, 12px); color: #8a877f; }
.hb-xe4-word { font-family: var(--font-grotesk, inherit); font-size: clamp(18px, min(11.5cqh, 10cqw), 104px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02; transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.1, 1); }
.hb-xe4-link:hover .hb-xe4-word, .hb-xe4-link:focus-visible .hb-xe4-word { transform: translateX(clamp(6px, 2cqw, 22px)); }
.hb-xe4-meta { margin-left: auto; font-size: clamp(10px, 1.8cqh, 13px); color: #8a877f; white-space: nowrap; }
.hb-xe4-arrow { align-self: center; width: clamp(12px, 3.6cqh, 30px); height: clamp(12px, 3.6cqh, 30px); color: var(--hb-xe4-accent); opacity: 0; transform: translateX(-12px) rotate(-45deg); transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.2, 0.9, 0.1, 1); }
.hb-xe4-link:hover .hb-xe4-arrow, .hb-xe4-link:focus-visible .hb-xe4-arrow { opacity: 1; transform: none; }
.hb-xe4-aside { display: none; align-content: end; gap: 18px; animation: hb-xe4-fade 0.6s 0.7s ease both; }
.hb-xe4-aside dl { margin: 0; display: grid; gap: 14px; }
.hb-xe4-aside dt { color: #8a877f; font-size: 12px; margin-bottom: 3px; }
.hb-xe4-aside dd { margin: 0; font-size: 14px; }
.hb-xe4-aside a { color: inherit; text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.4s cubic-bezier(0.2, 0.9, 0.1, 1); }
.hb-xe4-aside a:hover { background-size: 100% 1px; }
.hb-xe4-note { display: inline-flex; align-items: center; gap: 8px; color: #c8c5bd; font-size: 13px; }
.hb-xe4-note::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 4px rgba(61, 220, 132, 0.15); }
@container (min-width: 720px) {
  .hb-xe4-main { grid-template-columns: minmax(0, 1fr) 260px; gap: 56px; }
  .hb-xe4-aside { display: grid; }
}
@container (max-width: 420px) {
  .hb-xe4-meta { display: none; }
}
@keyframes hb-xe4-open { from { clip-path: circle(0px at var(--hb-xe4-x, 100%) var(--hb-xe4-y, 0%)); } to { clip-path: circle(150% at var(--hb-xe4-x, 100%) var(--hb-xe4-y, 0%)); } }
@keyframes hb-xe4-close { from { clip-path: circle(150% at var(--hb-xe4-x, 100%) var(--hb-xe4-y, 0%)); } to { clip-path: circle(0px at var(--hb-xe4-x, 100%) var(--hb-xe4-y, 0%)); } }
@keyframes hb-xe4-rise { to { transform: none; } }
@keyframes hb-xe4-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe4-layer, .hb-xe4-layer[data-state="closed"], .hb-xe4-link, .hb-xe4-aside { animation: none; transform: none; }
  .hb-xe4-layer[data-state="closed"] { opacity: 0; }
  .hb-xe4-word, .hb-xe4-arrow, .hb-xe4-link, .hb-xe4-trigger, .hb-xe4-trigger i::before, .hb-xe4-close i { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

function useLayer(
  open: boolean,
  embedded: boolean,
  panel: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  userOpened: React.RefObject<boolean>,
) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const steal = !embedded || userOpened.current;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    if (!embedded) html.style.overflow = "hidden";
    if (steal && node) {
      const target = node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(focusable) ?? node;
      target.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (!node) return;
      if (embedded && !node.contains(document.activeElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!embedded) html.style.overflow = overflow;
      if (steal && previous && previous.isConnected && previous !== document.body) previous.focus({ preventScroll: true });
    };
  }, [open, embedded, panel, userOpened]);
}

export function ModalFullscreenMenu({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Menu",
  brand = "Northfold",
  links = defaultLinks,
  contact = defaultContact,
  note = "Booking new projects for Q1 2027",
  onNavigate,
  accent = "#ff5a36",
  className = "",
  style,
  ...rest
}: ModalFullscreenMenuProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [origin, setOrigin] = React.useState<{ x: string; y: string }>({ x: "calc(100% - 48px)", y: "32px" });
  const userOpened = React.useRef(false);
  const layer = React.useRef<HTMLDivElement>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) userOpened.current = true;
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 560);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  useLayer(isOpen, embedded, layer, close, userOpened);

  function openFrom(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const base = embedded && root.current ? root.current.getBoundingClientRect() : { left: 0, top: 0 };
    setOrigin({ x: `${(r.left + r.width / 2 - base.left).toFixed(0)}px`, y: `${(r.top + r.height / 2 - base.top).toFixed(0)}px` });
    setOpen(true);
  }

  function onListKey(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (i < 0) return;
    e.preventDefault();
    items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
  }

  const vars = { "--hb-xe4-accent": accent, ...style } as React.CSSProperties;

  const triggerButton =
    trigger !== null ? (
      <button type="button" className="hb-xe4-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={openFrom}>
        {trigger}
        <i aria-hidden="true" />
      </button>
    ) : null;

  return (
    <div ref={root} className={`hb-xe4 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe4-css" precedence="default">{css}</style>
      {embedded ? (
        <div className="hb-xe4-site">
          <div className="hb-xe4-bar">
            <span className="hb-xe4-logo">{brand}</span>
            {triggerButton}
          </div>
          <div className="hb-xe4-hero" aria-hidden="true">Brands with a pulse.</div>
        </div>
      ) : (
        triggerButton
      )}
      {present && (
        <div
          ref={layer}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-t`}
          tabIndex={-1}
          className="hb-xe4-layer"
          data-state={isOpen ? "open" : "closed"}
          style={{ "--hb-xe4-x": origin.x, "--hb-xe4-y": origin.y } as React.CSSProperties}
        >
          <div className="hb-xe4-top">
            <span id={`${id}-t`} className="hb-xe4-logo">{brand}</span>
            <button type="button" className="hb-xe4-close" onClick={close} aria-label="Close menu">
              Close
              <i aria-hidden="true" />
            </button>
          </div>
          <div className="hb-xe4-main">
            <nav aria-label="Main">
              <ul className="hb-xe4-list" onKeyDown={onListKey}>
                {links.map((l, i) => (
                  <li key={l.href} className="hb-xe4-li">
                    <a
                      href={l.href}
                      className="hb-xe4-link"
                      style={{ "--hb-xe4-i": i } as React.CSSProperties}
                      data-autofocus={i === 0 ? "" : undefined}
                      onClick={() => {
                        onNavigate?.(l.href);
                        close();
                      }}
                    >
                      <span className="hb-xe4-idx">{String(i + 1).padStart(2, "0")}</span>
                      <span className="hb-xe4-word">{l.label}</span>
                      <svg className="hb-xe4-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                      {l.meta && <span className="hb-xe4-meta">{l.meta}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <aside className="hb-xe4-aside">
              <dl>
                {contact.map((c) => (
                  <div key={c.label}>
                    <dt>{c.label}</dt>
                    <dd>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</dd>
                  </div>
                ))}
              </dl>
              {note && <span className="hb-xe4-note">{note}</span>}
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

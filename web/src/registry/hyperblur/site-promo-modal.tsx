"use client";

import * as React from "react";

export interface SitePromoModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: number;
  badge?: string;
  title?: string;
  description?: string;
  cta?: string;
  ctaHref?: string;
  onCta?: () => void;
  rememberLabel?: string;
  storageKey?: string;
  onDismiss?: (dontShowAgain: boolean) => void;
  highlight?: string;
  art?: React.ReactNode;
  autoFocus?: boolean;
  fixed?: boolean;
  accent?: string;
}

const css = `
.hb-yf8 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  container-type: inline-size;
  font-family: inherit;
  color: #ededed;
  outline: none;
}
.hb-yf8 *, .hb-yf8 *::before, .hb-yf8 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf8[data-fixed="true"] { position: fixed; inset: 0; z-index: 60; width: auto; height: auto; overflow: visible; pointer-events: none; }
.hb-yf8-page { width: 100%; height: 100%; }
.hb-yf8-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  place-items: center;
  padding: 10px;
  background: rgba(5, 5, 7, 0.62);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  animation: hb-yf8-fade 0.25s ease both;
}
.hb-yf8[data-fixed="true"] .hb-yf8-overlay { position: fixed; pointer-events: auto; padding: 20px; }
.hb-yf8-overlay[data-state="closed"] { animation: hb-yf8-fade-out 0.22s ease forwards; pointer-events: none; }
.hb-yf8-dialog {
  position: relative;
  display: grid;
  grid-template-columns: 38% minmax(0, 1fr);
  width: 100%;
  max-width: 520px;
  max-height: 100%;
  overflow: hidden;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  outline: none;
  animation: hb-yf8-pop 0.42s cubic-bezier(0.22, 1.2, 0.36, 1) both;
}
.hb-yf8-overlay[data-state="closed"] .hb-yf8-dialog { animation: hb-yf8-pop-out 0.22s ease forwards; }
.hb-yf8-art {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100%;
  overflow: hidden;
  background: linear-gradient(155deg, var(--hb-yf8-a, #2f7bff) 0%, #6a3dff 62%, #c13fb8 120%);
}
.hb-yf8-blob { position: absolute; border-radius: 50%; filter: blur(14px); opacity: 0.55; animation: hb-yf8-drift 7s ease-in-out infinite alternate; }
.hb-yf8-blob[data-n="1"] { width: 90px; height: 90px; left: -26px; top: -22px; background: #9fd0ff; }
.hb-yf8-blob[data-n="2"] { width: 80px; height: 80px; right: -24px; bottom: -20px; background: #ff7ad9; animation-delay: -3s; }
.hb-yf8-ring { position: absolute; width: 74%; aspect-ratio: 1; border: 1px dashed rgba(255, 255, 255, 0.5); border-radius: 50%; animation: hb-yf8-spin 28s linear infinite; }
.hb-yf8-big { position: relative; z-index: 1; display: grid; justify-items: center; line-height: 1; text-align: center; color: #fff; text-shadow: 0 2px 18px rgba(20, 10, 60, 0.4); }
.hb-yf8-big strong { font-size: 34px; font-weight: 700; letter-spacing: -0.03em; }
.hb-yf8-big span { margin-top: 3px; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.9; }
.hb-yf8-main { position: relative; display: flex; flex-direction: column; align-items: flex-start; min-width: 0; padding: 12px 14px 10px; }
.hb-yf8-badge { margin: 0 0 5px; padding: 1px 8px; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; line-height: 16px; text-transform: uppercase; color: #7fb3ff; background: rgba(47, 123, 255, 0.14); border: 1px solid rgba(47, 123, 255, 0.35); border-radius: 999px; }
.hb-yf8-title { margin: 0 24px 3px 0; font-size: 15px; font-weight: 600; line-height: 1.2; letter-spacing: -0.015em; }
.hb-yf8-desc { margin: 0 0 8px; font-size: 11.5px; line-height: 1.4; color: #a1a1a1; }
.hb-yf8-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 600;
  color: #0a0a0a;
  text-decoration: none;
  background: #ededed;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}
.hb-yf8-cta:hover { background: #ffffff; transform: translateY(-1px); }
.hb-yf8-cta:active { transform: scale(0.97); }
.hb-yf8-cta svg { width: 11px; height: 11px; }
.hb-yf8-close { position: absolute; top: 8px; right: 8px; display: grid; place-items: center; width: 24px; height: 24px; margin: 0; padding: 0; color: #8f8f8f; background: transparent; border: 0; border-radius: 8px; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-yf8-close:hover { color: #ededed; background: rgba(255, 255, 255, 0.08); }
.hb-yf8-close svg { width: 10px; height: 10px; }
.hb-yf8-cta:focus-visible, .hb-yf8-close:focus-visible { outline: 2px solid var(--hb-yf8-a, #2f7bff); outline-offset: 2px; }
.hb-yf8-remember { display: inline-flex; align-items: center; gap: 7px; margin-top: 8px; font-size: 11px; color: #8f8f8f; cursor: pointer; user-select: none; }
.hb-yf8-remember:hover { color: #c8c8c8; }
.hb-yf8-check { position: relative; width: 14px; height: 14px; margin: 0; appearance: none; -webkit-appearance: none; background: #171717; border: 1px solid #3a3a3a; border-radius: 4px; cursor: pointer; transition: background-color 0.15s ease, border-color 0.15s ease; }
.hb-yf8-check:checked { background: var(--hb-yf8-a, #2f7bff); border-color: var(--hb-yf8-a, #2f7bff); }
.hb-yf8-check:checked::after { content: ""; position: absolute; left: 4px; top: 1px; width: 3px; height: 7px; border: solid #fff; border-width: 0 1.6px 1.6px 0; transform: rotate(45deg); }
.hb-yf8-check:focus-visible { outline: 2px solid var(--hb-yf8-a, #2f7bff); outline-offset: 2px; }
@container (max-width: 300px) {
  .hb-yf8-dialog { grid-template-columns: minmax(0, 1fr); }
  .hb-yf8-art { display: none; }
}
@keyframes hb-yf8-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-yf8-fade-out { to { opacity: 0; } }
@keyframes hb-yf8-pop { from { opacity: 0; transform: translateY(18px) scale(0.94); } to { opacity: 1; transform: none; } }
@keyframes hb-yf8-pop-out { to { opacity: 0; transform: translateY(8px) scale(0.97); } }
@keyframes hb-yf8-drift { from { transform: translate(0, 0); } to { transform: translate(14px, 10px); } }
@keyframes hb-yf8-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf8-overlay, .hb-yf8-dialog, .hb-yf8-blob, .hb-yf8-ring { animation: none; }
  .hb-yf8-overlay[data-state="closed"], .hb-yf8-overlay[data-state="closed"] .hb-yf8-dialog { animation: none; opacity: 0; }
  .hb-yf8-cta, .hb-yf8-close, .hb-yf8-check { transition: none; }
}
`;

function isBlocked(key?: string) {
  if (!key) return false;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function remember(key: string) {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    return false;
  }
  return true;
}

export function SitePromoModal({
  open,
  defaultOpen = true,
  onOpenChange,
  delay = 0,
  badge = "Welcome offer",
  title = "20% off your first order",
  description = "Free shipping over $40, too.",
  cta = "Claim my code",
  ctaHref = "#",
  onCta,
  rememberLabel = "Don't show this again",
  storageKey,
  onDismiss,
  highlight = "20%",
  art,
  autoFocus = true,
  fixed = false,
  accent = "#2f7bff",
  className = "",
  style,
  children,
  onKeyDown,
  ...rest
}: SitePromoModalProps) {
  const uid = React.useId();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultOpen);
  const [armed, setArmed] = React.useState(false);
  const [dontShow, setDontShow] = React.useState(false);
  const controlled = open !== undefined;
  const isOpen = controlled ? open : inner;

  React.useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => {
        if (isBlocked(storageKey)) return;
        setArmed(true);
      }, Math.max(0, delay));
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setArmed(false), 240);
    return () => window.clearTimeout(t);
  }, [isOpen, delay, storageKey]);

  React.useEffect(() => {
    if (armed && isOpen && autoFocus) dialogRef.current?.focus({ preventScroll: true });
  }, [armed, isOpen, autoFocus]);

  function close() {
    if (dontShow && storageKey) remember(storageKey);
    if (!controlled) setInner(false);
    onOpenChange?.(false);
    onDismiss?.(dontShow);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (!armed || !isOpen) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key === "Tab" && dialogRef.current) {
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])'),
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && at === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <>
      <style href="hb-site-promo-modal" precedence="default">{css}</style>
      <div
        className={`hb-yf8 ${className}`}
        data-fixed={fixed}
        tabIndex={-1}
        style={{ "--hb-yf8-a": accent, ...style } as React.CSSProperties}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="hb-yf8-page">{children}</div>
        {armed ? (
          <div
            className="hb-yf8-overlay"
            data-state={isOpen ? "open" : "closed"}
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${uid}-t`}
              aria-describedby={`${uid}-d`}
              tabIndex={-1}
              className="hb-yf8-dialog"
            >
              <div className="hb-yf8-art" aria-hidden="true">
                {art ?? (
                  <>
                    <span className="hb-yf8-blob" data-n="1" />
                    <span className="hb-yf8-blob" data-n="2" />
                    <span className="hb-yf8-ring" />
                    <span className="hb-yf8-big">
                      <strong>{highlight}</strong>
                      <span>off</span>
                    </span>
                  </>
                )}
              </div>
              <div className="hb-yf8-main">
                <button type="button" className="hb-yf8-close" aria-label="Close" onClick={close}>
                  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1.8 1.8l6.4 6.4M8.2 1.8l-6.4 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
                {badge ? <p className="hb-yf8-badge">{badge}</p> : null}
                <h3 id={`${uid}-t`} className="hb-yf8-title">{title}</h3>
                <p id={`${uid}-d`} className="hb-yf8-desc">{description}</p>
                <a href={ctaHref} className="hb-yf8-cta" onClick={onCta}>
                  {cta}
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <label className="hb-yf8-remember">
                  <input
                    type="checkbox"
                    className="hb-yf8-check"
                    checked={dontShow}
                    onChange={(e) => setDontShow(e.target.checked)}
                  />
                  {rememberLabel}
                </label>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

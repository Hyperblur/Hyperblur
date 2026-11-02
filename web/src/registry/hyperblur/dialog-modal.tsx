"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export interface DialogModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode | ((close: () => void) => React.ReactNode);
  trigger?: React.ReactNode;
  container?: "viewport" | "parent";
  variant?: "default" | "destructive";
  closeOnEscape?: boolean;
  closeOnScrim?: boolean;
  showClose?: boolean;
  autoFocus?: boolean;
  maxWidth?: number;
  accent?: string;
}

export interface DialogButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "primary" | "ghost" | "danger";
}

const css = `
.hb-dlg-trigger, .hb-dlg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  height: 34px;
  margin: 0;
  padding: 0 14px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
}
.hb-dlg-trigger:hover, .hb-dlg-btn:hover { background: #1f1f1f; border-color: #333333; }
.hb-dlg-trigger:active, .hb-dlg-btn:active { transform: scale(0.97); }
.hb-dlg-trigger:focus-visible, .hb-dlg-btn:focus-visible, .hb-dlg-x:focus-visible {
  outline: 2px solid var(--hb-dlg-accent, #2f7bff);
  outline-offset: 2px;
}
.hb-dlg-btn[data-tone="primary"] { background: #ededed; border-color: #ededed; color: #0a0a0a; font-weight: 600; }
.hb-dlg-btn[data-tone="primary"]:hover { background: #ffffff; border-color: #ffffff; }
.hb-dlg-btn[data-tone="ghost"] { background: transparent; border-color: transparent; color: #a1a1a1; }
.hb-dlg-btn[data-tone="ghost"]:hover { background: rgba(255, 255, 255, 0.07); color: #ededed; }
.hb-dlg-btn[data-tone="danger"] { background: #e5484d; border-color: #e5484d; color: #ffffff; font-weight: 600; }
.hb-dlg-btn[data-tone="danger"]:hover { background: #f2555a; border-color: #f2555a; }
.hb-dlg-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-dlg-scrim {
  --hb-dlg-accent: #2f7bff;
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  animation: hb-dlg-fade 0.2s ease both;
}
.hb-dlg-scrim[data-container="parent"] { position: absolute; z-index: 20; padding: 12px; border-radius: inherit; }
.hb-dlg-scrim[data-state="closed"] { animation: hb-dlg-fade-out 0.18s ease both; pointer-events: none; }
.hb-dlg-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--hb-dlg-w, 440px);
  max-height: 100%;
  overflow: auto;
  border: 1px solid #262626;
  border-radius: 16px;
  background: #111111;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
  text-align: left;
  outline: none;
  animation: hb-dlg-pop 0.26s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}
.hb-dlg-scrim[data-state="closed"] .hb-dlg-panel { animation: hb-dlg-pop-out 0.18s ease both; }
.hb-dlg-panel[data-variant="destructive"] { --hb-dlg-accent: #e5484d; border-color: rgba(229, 72, 77, 0.28); }
.hb-dlg-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 18px 18px 0;
}
.hb-dlg-badge {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(229, 72, 77, 0.14);
  color: #ff6369;
}
.hb-dlg-badge svg { width: 18px; height: 18px; }
.hb-dlg-text { flex: 1; min-width: 0; padding-right: 24px; }
.hb-dlg-title {
  margin: 0;
  color: #ededed;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}
.hb-dlg-desc {
  margin: 4px 0 0;
  color: #a1a1a1;
  font-size: 13.5px;
  line-height: 1.5;
}
.hb-dlg-body { padding: 14px 18px 0; color: #cfcfcf; font-size: 14px; line-height: 1.55; }
.hb-dlg-body:empty { display: none; }
.hb-dlg-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  padding: 18px;
}
.hb-dlg-x {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.hb-dlg-x:hover { background: rgba(255, 255, 255, 0.08); color: #ededed; }
.hb-dlg-x svg { width: 14px; height: 14px; }
@keyframes hb-dlg-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dlg-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-dlg-pop { from { opacity: 0; transform: translateY(8px) scale(0.95); } to { opacity: 1; transform: none; } }
@keyframes hb-dlg-pop-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(4px) scale(0.97); } }
@media (prefers-reduced-motion: reduce) {
  .hb-dlg-scrim, .hb-dlg-panel, .hb-dlg-scrim[data-state="closed"], .hb-dlg-scrim[data-state="closed"] .hb-dlg-panel { animation: none; }
  .hb-dlg-trigger, .hb-dlg-btn, .hb-dlg-x { transition: none; }
}
`;

const focusableSelector =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

const subscribe = () => () => {};

export function DialogButton({ tone = "ghost", className = "", type = "button", ...rest }: DialogButtonProps) {
  return <button type={type} className={`hb-dlg-btn ${className}`} data-tone={tone} {...rest} />;
}

export function DialogModal({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  children,
  footer,
  trigger,
  container = "viewport",
  variant = "default",
  closeOnEscape = true,
  closeOnScrim = true,
  showClose = true,
  autoFocus = true,
  maxWidth = 440,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: DialogModalProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : inner;
  const [present, setPresent] = React.useState(isOpen);
  const panel = React.useRef<HTMLDivElement>(null);
  const downOnScrim = React.useRef(false);
  const id = React.useId();
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    if (autoFocus) {
      const node = panel.current;
      const preferred = node?.querySelector<HTMLElement>("[data-autofocus]");
      const first = preferred ?? node?.querySelector<HTMLElement>(focusableSelector);
      (first ?? node)?.focus({ preventScroll: true });
    }
    return () => {
      if (previous && previous !== document.body && previous.isConnected) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [isOpen, autoFocus]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const timer = setTimeout(() => setPresent(false), 200);
    return () => clearTimeout(timer);
  }, [isOpen, present]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && closeOnEscape) {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const node = panel.current;
    if (!node) return;
    const items = Array.from(node.querySelectorAll<HTMLElement>(focusableSelector));
    if (items.length === 0) {
      e.preventDefault();
      node.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === node)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    } else if (!node.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  const resolvedFooter = typeof footer === "function" ? footer(close) : footer;
  const vars = {
    "--hb-dlg-accent": accent,
    "--hb-dlg-w": `${maxWidth}px`,
    ...style,
  } as React.CSSProperties;

  const layer = present ? (
    <div
      className={`hb-dlg-scrim ${className}`}
      style={vars}
      data-container={container}
      data-state={isOpen ? "open" : "closed"}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => {
        downOnScrim.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (closeOnScrim && downOnScrim.current && e.target === e.currentTarget) close();
        downOnScrim.current = false;
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className="hb-dlg-panel"
        data-variant={variant}
        {...rest}
      >
        {(title || description || variant === "destructive") && (
          <div className="hb-dlg-head">
            {variant === "destructive" && (
              <span className="hb-dlg-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </span>
            )}
            <div className="hb-dlg-text">
              {title && (
                <h2 id={titleId} className="hb-dlg-title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="hb-dlg-desc">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {showClose && (
          <button type="button" className="hb-dlg-x" aria-label="Close dialog" onClick={close}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="m3.5 3.5 9 9m0-9-9 9" />
            </svg>
          </button>
        )}
        <div className="hb-dlg-body">{children}</div>
        {resolvedFooter && <div className="hb-dlg-foot">{resolvedFooter}</div>}
      </div>
    </div>
  ) : null;

  return (
    <>
      <style href="hb-dialog-modal" precedence="default">{css}</style>
      {trigger !== undefined && (
        <button
          type="button"
          className="hb-dlg-trigger"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setOpen(true)}
        >
          {trigger}
        </button>
      )}
      {container === "viewport" ? (mounted && layer ? createPortal(layer, document.body) : null) : layer}
    </>
  );
}

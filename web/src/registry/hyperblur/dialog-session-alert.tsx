"use client";

import * as React from "react";

export interface DialogSessionAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  seconds?: number;
  app?: string;
  note?: string;
  onExtend?: () => void;
  onSignOut?: () => void;
  onTimeout?: () => void;
  onSignIn?: () => void;
  accent?: string;
}

const css = `
.hb-xe5 { --hb-xe5-accent: #f5a524; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe5 *, .hb-xe5 *::before, .hb-xe5 *::after { box-sizing: border-box; }
.hb-xe5[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: repeating-linear-gradient(0deg, #0e0e0f 0 22px, #101011 22px 23px), #0e0e0f; }
.hb-xe5-trigger { display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 13px; border: 1px solid #2a2a2c; border-radius: 9px; background: #151517; color: #e4e4e7; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: border-color 0.2s ease, transform 0.15s ease; }
.hb-xe5-trigger:hover { border-color: #3c3c40; }
.hb-xe5-trigger:active { transform: scale(0.97); }
.hb-xe5-trigger svg { width: 14px; height: 14px; color: var(--hb-xe5-accent); }
.hb-xe5 button:focus-visible { outline: 2px solid var(--hb-xe5-accent); outline-offset: 2px; }
.hb-xe5-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe5[data-embedded] .hb-xe5-layer { position: absolute; height: auto; z-index: 2; padding: 10px; }
.hb-xe5-scrim { position: absolute; inset: 0; background: radial-gradient(70% 70% at 50% 50%, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.78)); animation: hb-xe5-fade 0.25s ease both; }
.hb-xe5-layer[data-state="closed"] .hb-xe5-scrim { animation: hb-xe5-fade-out 0.2s ease both; }
.hb-xe5-panel { position: relative; width: 100%; max-width: 380px; max-height: 100%; overflow: auto; padding: 18px; border: 1px solid #2b2925; border-radius: 18px; background: linear-gradient(180deg, #19181a, #121213); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.5), 0 30px 70px -20px rgba(0, 0, 0, 0.9); outline: none; animation: hb-xe5-in 0.42s cubic-bezier(0.2, 0.9, 0.25, 1.15) both; }
.hb-xe5-panel::before { content: ""; position: absolute; inset: 0 0 auto; height: 1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-xe5-tone) 70%, transparent), transparent); }
.hb-xe5-layer[data-state="closed"] .hb-xe5-panel { animation: hb-xe5-out 0.2s ease both; }
.hb-xe5-panel[data-nudge="a"] { animation: hb-xe5-nudge-a 0.4s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe5-panel[data-nudge="b"] { animation: hb-xe5-nudge-b 0.4s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe5-top { display: flex; gap: 14px; align-items: center; }
.hb-xe5-ring { position: relative; flex: none; width: 62px; height: 62px; }
.hb-xe5-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.hb-xe5-track { stroke: #262528; }
.hb-xe5-arc { stroke: var(--hb-xe5-tone); transition: stroke-dashoffset 1s linear, stroke 0.4s ease; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-xe5-tone) 55%, transparent)); }
.hb-xe5-num { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-mono, ui-monospace, monospace); font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; color: #f4f4f5; }
.hb-xe5-halo { position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--hb-xe5-tone); opacity: 0; }
.hb-xe5-panel[data-urgent="true"] .hb-xe5-halo { animation: hb-xe5-halo 1s cubic-bezier(0.2, 0.8, 0.3, 1) infinite; }
.hb-xe5-lock { display: grid; place-items: center; width: 62px; height: 62px; flex: none; border-radius: 50%; background: radial-gradient(circle at 50% 30%, #2a2a2e, #18181a); box-shadow: inset 0 0 0 1px #2e2e33; color: #c4c4c8; animation: hb-xe5-pop 0.45s cubic-bezier(0.2, 0.9, 0.25, 1.3) both; }
.hb-xe5-lock svg { width: 22px; height: 22px; }
.hb-xe5-title { margin: 0; font-size: 15.5px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3; }
.hb-xe5-desc { margin: 4px 0 0; color: #9f9fa5; font-size: 12.5px; line-height: 1.5; }
.hb-xe5-desc b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xe5-note { display: flex; align-items: center; gap: 9px; margin-top: 14px; padding: 9px 11px; border-radius: 10px; background: #0f0f10; box-shadow: inset 0 0 0 1px #222224; color: #b4b4b9; font-size: 12px; }
.hb-xe5-note svg { flex: none; width: 14px; height: 14px; color: #6fd39b; }
.hb-xe5-foot { display: flex; gap: 8px; margin-top: 14px; }
.hb-xe5-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 0 12px; border: 1px solid #2c2c30; border-radius: 10px; background: transparent; color: #d4d4d8; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe5-btn:hover { background: #1c1c1f; }
.hb-xe5-btn:active { transform: scale(0.97); }
.hb-xe5-btn[data-primary] { border-color: transparent; background: linear-gradient(180deg, #fafafa, #e4e4e7); color: #111; box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.12), 0 6px 16px -8px rgba(255, 255, 255, 0.3); }
.hb-xe5-btn[data-primary]:hover { background: #fff; }
@keyframes hb-xe5-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe5-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe5-in { from { opacity: 0; transform: translateY(10px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes hb-xe5-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: scale(0.97); } }
@keyframes hb-xe5-nudge-a { 0%, 100% { transform: none; } 40% { transform: scale(1.025); } }
@keyframes hb-xe5-nudge-b { 0%, 100% { transform: none; } 40% { transform: scale(1.025); } }
@keyframes hb-xe5-halo { from { opacity: 0.8; transform: scale(0.92); } to { opacity: 0; transform: scale(1.25); } }
@keyframes hb-xe5-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe5-scrim, .hb-xe5-panel, .hb-xe5-lock, .hb-xe5-layer[data-state="closed"] .hb-xe5-panel, .hb-xe5-layer[data-state="closed"] .hb-xe5-scrim, .hb-xe5-panel[data-nudge] { animation: none; }
  .hb-xe5-panel[data-urgent="true"] .hb-xe5-halo { animation: none; opacity: 0.5; }
  .hb-xe5-layer[data-state="closed"] { opacity: 0; }
  .hb-xe5-arc, .hb-xe5-btn, .hb-xe5-trigger { transition: none; }
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

function clock(s: number) {
  const v = Math.max(0, s);
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
}

export function DialogSessionAlert({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Preview timeout warning",
  seconds = 60,
  app = "Ledgerline",
  note = "Your draft “Q3 board memo” is saved.",
  onExtend,
  onSignOut,
  onTimeout,
  onSignIn,
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: DialogSessionAlertProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [remaining, setRemaining] = React.useState(seconds);
  const [nudge, setNudge] = React.useState<"a" | "b" | undefined>(undefined);
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  const expired = remaining <= 0;

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setRemaining(seconds);
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange, seconds],
  );

  const extend = React.useCallback(() => {
    if (expired) return;
    onExtend?.();
    setOpen(false);
  }, [expired, onExtend, setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 220);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    if (!isOpen || expired) return;
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [isOpen, expired]);

  const timeoutRef = React.useRef(onTimeout);
  React.useEffect(() => {
    timeoutRef.current = onTimeout;
  });
  React.useEffect(() => {
    if (isOpen && expired) timeoutRef.current?.();
  }, [isOpen, expired]);

  useLayer(isOpen, embedded, panel, expired ? () => setOpen(false) : extend, userOpened);

  const tone = expired ? "#71717a" : remaining <= 10 ? "#ff5a5f" : accent;
  const c = 2 * Math.PI * 27;
  const offset = c * (1 - Math.max(remaining, 0) / Math.max(seconds, 1));
  const vars = { "--hb-xe5-accent": accent, "--hb-xe5-tone": tone, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe5 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe5-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe5-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <circle cx="8" cy="8.5" r="5.5" />
            <path d="M8 5.5v3l2 1.3M6.5 1.5h3" />
          </svg>
          {trigger}
        </button>
      )}
      {present && (
        <div className="hb-xe5-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe5-scrim" aria-hidden="true" onClick={() => setNudge((n) => (n === "a" ? "b" : "a"))} />
          <div
            ref={panel}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            aria-describedby={`${id}-d`}
            tabIndex={-1}
            className="hb-xe5-panel"
            data-urgent={!expired && remaining <= 10 ? "true" : undefined}
            data-nudge={nudge}
          >
            <div className="hb-xe5-top">
              {expired ? (
                <span className="hb-xe5-lock" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
                    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
                  </svg>
                </span>
              ) : (
                <span className="hb-xe5-ring" aria-hidden="true">
                  <span className="hb-xe5-halo" />
                  <svg viewBox="0 0 62 62" fill="none">
                    <circle className="hb-xe5-track" cx="31" cy="31" r="27" strokeWidth="4" />
                    <circle
                      className="hb-xe5-arc"
                      cx="31"
                      cy="31"
                      r="27"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={c.toFixed(2)}
                      strokeDashoffset={offset.toFixed(2)}
                    />
                  </svg>
                  <span className="hb-xe5-num">{clock(remaining)}</span>
                </span>
              )}
              <div style={{ minWidth: 0 }}>
                <h2 id={`${id}-t`} className="hb-xe5-title">
                  {expired ? "You have been signed out" : "Your session is about to expire"}
                </h2>
                <p id={`${id}-d`} className="hb-xe5-desc">
                  {expired ? (
                    <>For your security we closed your {app} session.</>
                  ) : (
                    <>
                      We will sign you out of {app} in <b>{clock(remaining)}</b> unless you stay.
                    </>
                  )}
                </p>
              </div>
            </div>
            {note && (
              <div className="hb-xe5-note">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3.5 8.4 3 3 6-6.4" />
                </svg>
                {note}
              </div>
            )}
            <div className="hb-xe5-foot">
              {expired ? (
                <button
                  type="button"
                  className="hb-xe5-btn"
                  data-primary=""
                  data-autofocus=""
                  onClick={() => {
                    onSignIn?.();
                    setRemaining(seconds);
                  }}
                >
                  Sign in again
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="hb-xe5-btn"
                    onClick={() => {
                      onSignOut?.();
                      setRemaining(0);
                    }}
                  >
                    Sign out now
                  </button>
                  <button type="button" className="hb-xe5-btn" data-primary="" data-autofocus="" onClick={extend}>
                    Stay signed in
                  </button>
                </>
              )}
            </div>
            <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }} aria-live="assertive">
              {expired ? "Signed out" : remaining === 30 || remaining === 10 ? `${remaining} seconds left` : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

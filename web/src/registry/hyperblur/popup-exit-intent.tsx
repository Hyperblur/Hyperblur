"use client";

import * as React from "react";

export interface PopupExitIntentItem {
  name: string;
  variant: string;
  price: number;
  tint: string;
}

export interface PopupExitIntentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  description?: string;
  code?: string;
  discount?: string;
  items?: PopupExitIntentItem[];
  currency?: string;
  locale?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
  storageKey?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onReveal?: (code: string) => void;
  onCheckout?: () => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultItems: PopupExitIntentItem[] = [
  { name: "Merino Crew Sweater", variant: "Oat · M", price: 89, tint: "#d9b98c" },
  { name: "Canvas Field Tote", variant: "Olive", price: 43, tint: "#7d8a5a" },
];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useModal(active: boolean, panelRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.getClientRects().length > 0);
      if (!nodes.length) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel || !panel.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !panel.contains(cur))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [active, panelRef]);
}

function usePresence(open: boolean, ms: number) {
  const [mounted, setMounted] = React.useState(open);
  if (open && !mounted) setMounted(true);
  React.useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => setMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [open, mounted, ms]);
  return mounted;
}

const css = `
.hb-xf5 { --hb-xf5-accent: #e8573f; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf5 *, .hb-xf5 *::before, .hb-xf5 *::after { box-sizing: border-box; }
.hb-xf5-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf5-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border-radius: 999px; font-size: 13px; font-weight: 500; color: #ededed; background: #161616; border: 1px solid #2a2a2a; cursor: pointer; transition: border-color .2s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf5-trigger:hover { border-color: #3a3a3a; }
.hb-xf5-trigger:active { transform: scale(.97); }
.hb-xf5-trigger:focus-visible { outline: 2px solid var(--hb-xf5-accent); outline-offset: 2px; }
.hb-xf5-trigger svg { width: 14px; height: 14px; }
.hb-xf5-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf5-embedded .hb-xf5-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf5-scrim { position: absolute; inset: 0; background: rgba(5,5,5,.72); backdrop-filter: blur(4px) saturate(.8); animation: hb-xf5-fade .3s ease both; }
.hb-xf5-embedded .hb-xf5-scrim { display: none; }
.hb-xf5-overlay[data-state="closed"] .hb-xf5-scrim { animation: hb-xf5-fade .2s ease reverse both; }
.hb-xf5-panel { position: relative; width: min(420px, 100%); max-height: calc(100dvh - 32px); overflow: auto; border-radius: 22px; padding: 20px; background: linear-gradient(180deg, #181818, #101010 50%); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.9); outline: none; animation: hb-xf5-in .5s cubic-bezier(.16,1,.3,1) both; }
.hb-xf5-overlay[data-state="closed"] .hb-xf5-panel { animation: hb-xf5-out .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf5-close { all: unset; position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #8f8f8f; cursor: pointer; transition: background .2s, color .2s; }
.hb-xf5-close:hover { background: #1f1f1f; color: #ededed; }
.hb-xf5-close:focus-visible { outline: 2px solid var(--hb-xf5-accent); }
.hb-xf5-close svg { width: 14px; height: 14px; }
.hb-xf5-title { margin: 0; padding-right: 30px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 21px; font-weight: 600; letter-spacing: -.02em; }
.hb-xf5-desc { margin: 4px 0 14px; font-size: 12.5px; color: #a1a1a1; }
.hb-xf5-items { list-style: none; margin: 0 0 14px; padding: 0; display: grid; gap: 8px; }
.hb-xf5-item { display: flex; align-items: center; gap: 10px; }
.hb-xf5-thumb { position: relative; width: 40px; height: 40px; border-radius: 10px; flex: none; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--hb-xf5-tint) 80%, #fff), var(--hb-xf5-tint) 60%, color-mix(in srgb, var(--hb-xf5-tint) 60%, #000)); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
.hb-xf5-thumb::after { content: ""; position: absolute; left: 10px; right: 10px; top: 12px; bottom: 9px; border-radius: 6px 6px 4px 4px; border: 2px solid rgba(0,0,0,.25); border-top-width: 5px; }
.hb-xf5-iname { margin: 0; font-size: 12.5px; font-weight: 500; }
.hb-xf5-ivar { margin: 1px 0 0; font-size: 11px; color: #8f8f8f; }
.hb-xf5-price { margin-left: auto; font-size: 12.5px; font-variant-numeric: tabular-nums; color: #d4d4d4; }
.hb-xf5-ticket { position: relative; display: flex; height: 76px; margin-bottom: 14px; filter: drop-shadow(0 10px 20px rgba(0,0,0,.45)); }
.hb-xf5-main { position: relative; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 16px; border-radius: 14px 0 0 14px; background: linear-gradient(120deg, color-mix(in srgb, var(--hb-xf5-accent) 90%, #fff 0%), color-mix(in srgb, var(--hb-xf5-accent) 70%, #000)); color: #fff; overflow: hidden; mask: radial-gradient(circle 8px at 100% 0, transparent 98%, #000) top right / 100% 51% no-repeat, radial-gradient(circle 8px at 100% 100%, transparent 98%, #000) bottom right / 100% 51% no-repeat; }
.hb-xf5-main::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, rgba(255,255,255,.06) 0 6px, transparent 6px 12px); }
.hb-xf5-off { position: relative; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -.03em; line-height: 1; }
.hb-xf5-offsub { position: relative; margin-top: 4px; font-size: 11px; opacity: .85; }
.hb-xf5-under { position: absolute; right: 0; top: 0; bottom: 0; width: 132px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border-radius: 0 14px 14px 0; background: #0d0d0d; border: 1px dashed #333; border-left: 0; }
.hb-xf5-code { font-family: var(--font-mono), ui-monospace, monospace; font-size: 15px; font-weight: 600; letter-spacing: .14em; color: #fff; }
.hb-xf5-copy { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 9px; border-radius: 999px; font-size: 11px; color: #a1a1a1; background: #1a1a1a; border: 1px solid #2c2c2c; cursor: pointer; transition: color .2s, border-color .2s; }
.hb-xf5-copy:hover { color: #ededed; border-color: #3c3c3c; }
.hb-xf5-copy:focus-visible { outline: 2px solid var(--hb-xf5-accent); outline-offset: 2px; }
.hb-xf5-copy[data-done="true"] { color: #3ddc84; border-color: #1f4d33; }
.hb-xf5-copy svg { width: 11px; height: 11px; }
.hb-xf5-stub { all: unset; box-sizing: border-box; position: relative; width: 132px; flex: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border-radius: 0 14px 14px 0; background: linear-gradient(120deg, color-mix(in srgb, var(--hb-xf5-accent) 70%, #000), color-mix(in srgb, var(--hb-xf5-accent) 55%, #000)); color: #fff; cursor: grab; touch-action: none; transform-origin: 0 100%; transform: translateY(var(--hb-xf5-pull, 0px)) rotate(calc(var(--hb-xf5-pull, 0px) * .12deg)); mask: radial-gradient(circle 8px at 0 0, transparent 98%, #000) top left / 100% 51% no-repeat, radial-gradient(circle 8px at 0 100%, transparent 98%, #000) bottom left / 100% 51% no-repeat; transition: transform .45s cubic-bezier(.3,1.5,.5,1); }
.hb-xf5-stub[data-dragging="true"] { transition: none; cursor: grabbing; }
.hb-xf5-stub::before { content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; border-left: 2px dotted rgba(255,255,255,.45); }
.hb-xf5-stub:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
.hb-xf5-stub b { font-size: 12px; font-weight: 600; }
.hb-xf5-stub small { font-size: 10.5px; opacity: .75; }
.hb-xf5-stub svg { width: 16px; height: 16px; animation: hb-xf5-nudge 1.8s cubic-bezier(.4,0,.2,1) infinite; }
.hb-xf5-stub[data-torn="true"] { pointer-events: none; animation: hb-xf5-fall .7s cubic-bezier(.5,0,.75,0) both; }
.hb-xf5-sum { display: flex; justify-content: space-between; margin: 0 0 12px; font-size: 12.5px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-xf5-sum b { font-weight: 600; color: #ededed; }
.hb-xf5-sum s { color: #6f6f6f; margin-right: 6px; }
.hb-xf5-cta { all: unset; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 42px; border-radius: 12px; font-size: 13.5px; font-weight: 600; color: #0a0a0a; background: linear-gradient(#fafafa, #dedede); box-shadow: inset 0 -1px 0 rgba(0,0,0,.2), 0 10px 24px -12px rgba(255,255,255,.4); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), background .2s; }
.hb-xf5-cta:hover { background: #fff; }
.hb-xf5-cta:active { transform: scale(.98); }
.hb-xf5-cta:focus-visible { outline: 2px solid var(--hb-xf5-accent); outline-offset: 2px; }
.hb-xf5-cta svg { width: 14px; height: 14px; transition: transform .25s cubic-bezier(.3,.7,.4,1); }
.hb-xf5-cta:hover svg { transform: translateX(3px); }
.hb-xf5-skip { all: unset; display: block; margin: 10px auto 0; font-size: 12px; color: #7a7a7a; cursor: pointer; }
.hb-xf5-skip:hover { color: #ededed; }
.hb-xf5-skip:focus-visible { outline: 2px solid var(--hb-xf5-accent); outline-offset: 2px; border-radius: 3px; }
@keyframes hb-xf5-fade { from { opacity: 0; } }
@keyframes hb-xf5-in { 0% { opacity: 0; transform: translateY(-40px) scale(.96); } 100% { opacity: 1; transform: none; } }
@keyframes hb-xf5-out { to { opacity: 0; transform: translateY(12px) scale(.98); } }
@keyframes hb-xf5-fall { 0% { transform: translateY(var(--hb-xf5-pull, 0px)) rotate(4deg); opacity: 1; } 100% { transform: translate(30px, 180px) rotate(38deg); opacity: 0; } }
@keyframes hb-xf5-nudge { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf5 *, .hb-xf5 *::before { animation: none !important; transition: none !important; }
  .hb-xf5-stub[data-torn="true"] { opacity: 0; }
}
`;

export function PopupExitIntent({
  title = "Leaving already?",
  description = "Your bag is saved for 48 hours. Tear off the stub for a little push.",
  code = "STAY15",
  discount = "15% off",
  items = defaultItems,
  currency = "USD",
  locale = "en-US",
  threshold = 12,
  delay = 4000,
  once = true,
  storageKey = "hb-exit-intent",
  open,
  defaultOpen,
  onOpenChange,
  onReveal,
  onCheckout,
  showTrigger = true,
  triggerLabel = "Preview exit offer",
  embedded = false,
  accent = "#e8573f",
  className = "",
  style,
  ...rest
}: PopupExitIntentProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const [torn, setTorn] = React.useState(false);
  const [gone, setGone] = React.useState(false);
  const [pull, setPull] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const drag = React.useRef<{ y: number; id: number } | null>(null);
  const timers = React.useRef<number[]>([]);

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);

  const setOpen = React.useCallback(
    (value: boolean) => {
      touched.current = true;
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);
  useModal(isOpen && !embedded, panelRef, close);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  React.useEffect(() => {
    if (!embedded || !touched.current) return;
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [embedded, isOpen]);

  React.useEffect(() => {
    if (embedded || isOpen) return;
    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, delay);
    const onOut = (e: MouseEvent) => {
      if (!armed || e.relatedTarget || e.clientY > threshold) return;
      if (once) {
        try {
          if (window.sessionStorage.getItem(storageKey)) return;
          window.sessionStorage.setItem(storageKey, "1");
        } catch {}
      }
      setOpen(true);
    };
    document.addEventListener("mouseout", onOut);
    return () => {
      window.clearTimeout(arm);
      document.removeEventListener("mouseout", onOut);
    };
  }, [embedded, isOpen, delay, threshold, once, storageKey, setOpen]);

  const tear = () => {
    if (torn) return;
    setTorn(true);
    setDragging(false);
    onReveal?.(code);
    timers.current.push(window.setTimeout(() => setGone(true), 700));
    timers.current.push(window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>(".hb-xf5-copy")?.focus({ preventScroll: true }), 720));
  };

  const copy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    timers.current.push(window.setTimeout(() => setCopied(false), 1800));
  };

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const pct = Number.parseFloat(discount) || 0;
  const after = discount.includes("%") ? subtotal * (1 - pct / 100) : subtotal - pct;

  return (
    <div
      className={`hb-xf5 ${embedded ? "hb-xf5-embedded" : ""} ${className}`}
      style={{ "--hb-xf5-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-exit-intent" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf5-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l4-4-4-4M14 12H4" /></svg>
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf5-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf5-scrim" onClick={close} aria-hidden="true" />
          <div ref={panelRef} className="hb-xf5-panel" role="dialog" aria-modal={embedded ? undefined : true} aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} tabIndex={-1}>
            <button type="button" className="hb-xf5-close" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
            </button>
            <h2 className="hb-xf5-title" id={`${uid}-t`}>{title}</h2>
            <p className="hb-xf5-desc" id={`${uid}-d`}>{description}</p>
            <ul className="hb-xf5-items">
              {items.map((it) => (
                <li key={it.name} className="hb-xf5-item">
                  <span className="hb-xf5-thumb" style={{ "--hb-xf5-tint": it.tint } as React.CSSProperties} aria-hidden="true" />
                  <div style={{ minWidth: 0 }}>
                    <p className="hb-xf5-iname">{it.name}</p>
                    <p className="hb-xf5-ivar">{it.variant}</p>
                  </div>
                  <span className="hb-xf5-price">{money.format(it.price)}</span>
                </li>
              ))}
            </ul>
            <div className="hb-xf5-ticket">
              <div className="hb-xf5-main">
                <span className="hb-xf5-off">{discount}</span>
                <span className="hb-xf5-offsub">Your whole bag, today only</span>
              </div>
              {torn && (
                <div className="hb-xf5-under" aria-live="polite">
                  <span className="hb-xf5-code">{code}</span>
                  <button type="button" className="hb-xf5-copy" data-done={copied} onClick={copy}>
                    {copied ? (
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg>
                    ) : (
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><path d="M8 4V2.5A1 1 0 0 0 7 1.5H2.5a1 1 0 0 0-1 1V7a1 1 0 0 0 1 1H4" /></svg>
                    )}
                    {copied ? "Copied" : "Copy code"}
                  </button>
                </div>
              )}
              {!gone && (
                <button
                  type="button"
                  className="hb-xf5-stub"
                  data-autofocus
                  data-torn={torn}
                  data-dragging={dragging}
                  aria-label={`Tear off to reveal your ${discount} code`}
                  style={{ "--hb-xf5-pull": `${pull}px` } as React.CSSProperties}
                  onClick={() => {
                    if (pull < 4) tear();
                  }}
                  onPointerDown={(e) => {
                    if (torn) return;
                    drag.current = { y: e.clientY, id: e.pointerId };
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDragging(true);
                  }}
                  onPointerMove={(e) => {
                    if (!drag.current || drag.current.id !== e.pointerId) return;
                    const dy = Math.max(0, Math.min(60, e.clientY - drag.current.y));
                    setPull(Math.round(dy));
                    if (dy > 42) {
                      drag.current = null;
                      tear();
                    }
                  }}
                  onPointerUp={() => {
                    drag.current = null;
                    setDragging(false);
                    if (!torn) window.setTimeout(() => setPull(0), 0);
                  }}
                  onPointerCancel={() => {
                    drag.current = null;
                    setDragging(false);
                    setPull(0);
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" /></svg>
                  <b>Tear here</b>
                  <small>pull down or tap</small>
                </button>
              )}
            </div>
            <p className="hb-xf5-sum">
              <span>Bag total</span>
              <span>
                {torn && <s>{money.format(subtotal)}</s>}
                <b>{money.format(torn ? after : subtotal)}</b>
              </span>
            </p>
            <button
              type="button"
              className="hb-xf5-cta"
              onClick={() => {
                onCheckout?.();
                close();
              }}
            >
              Return to checkout
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>
            <button type="button" className="hb-xf5-skip" onClick={close}>No thanks, I will pay full price</button>
          </div>
        </div>
      )}
    </div>
  );
}

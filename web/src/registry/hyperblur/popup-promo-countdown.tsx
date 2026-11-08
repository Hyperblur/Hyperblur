"use client";

import * as React from "react";

export interface PopupPromoCountdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title?: string;
  description?: string;
  discount?: number;
  duration?: number;
  endsAt?: string;
  claimed?: number;
  total?: number;
  ctaLabel?: string;
  onClaim?: () => void;
  onExpire?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

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
.hb-xf6 { --hb-xf6-accent: #ffcc33; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf6 *, .hb-xf6 *::before, .hb-xf6 *::after { box-sizing: border-box; }
@property --hb-xf6-spin { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hb-xf6-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf6-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 8px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #0a0a0a; background: var(--hb-xf6-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 8px 20px -10px var(--hb-xf6-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf6-trigger:hover { filter: brightness(1.06); }
.hb-xf6-trigger:active { transform: scale(.97); }
.hb-xf6-trigger:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf6-trigger span { display: grid; place-items: center; height: 22px; padding: 0 7px; border-radius: 999px; background: #0a0a0a; color: var(--hb-xf6-accent); font-size: 11px; }
.hb-xf6-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf6-embedded .hb-xf6-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf6-scrim { position: absolute; inset: 0; background: rgba(0,0,0,.78); backdrop-filter: blur(5px); animation: hb-xf6-fade .3s ease both; }
.hb-xf6-embedded .hb-xf6-scrim { display: none; }
.hb-xf6-overlay[data-state="closed"] .hb-xf6-scrim { animation: hb-xf6-fade .2s ease reverse both; }
.hb-xf6-frame { position: relative; width: min(400px, 100%); max-height: calc(100dvh - 32px); padding: 1px; border-radius: 24px; background: conic-gradient(from var(--hb-xf6-spin), transparent 0 60%, var(--hb-xf6-accent) 78%, #fff 82%, transparent 88% 100%), #2a2a2a; animation: hb-xf6-in .55s cubic-bezier(.16,1,.3,1) both, hb-xf6-rot 4s linear infinite; box-shadow: 0 40px 90px -30px rgba(0,0,0,.95); }
.hb-xf6-overlay[data-state="closed"] .hb-xf6-frame { animation: hb-xf6-out .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf6-panel { position: relative; max-height: calc(100dvh - 34px); overflow: auto; border-radius: 23px; padding: 22px 22px 18px; background: radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--hb-xf6-accent) 14%, #121212), #0f0f0f 70%); outline: none; text-align: center; }
.hb-xf6-close { all: unset; position: absolute; top: 12px; right: 12px; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #8f8f8f; cursor: pointer; transition: background .2s, color .2s; }
.hb-xf6-close:hover { background: #1f1f1f; color: #ededed; }
.hb-xf6-close:focus-visible { outline: 2px solid var(--hb-xf6-accent); }
.hb-xf6-close svg { width: 14px; height: 14px; }
.hb-xf6-eyebrow { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 10px; border-radius: 999px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--hb-xf6-accent); background: color-mix(in srgb, var(--hb-xf6-accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--hb-xf6-accent) 25%, transparent); }
.hb-xf6-eyebrow i { font-style: normal; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xf6-accent); animation: hb-xf6-blink 1.2s steps(2, jump-none) infinite; }
.hb-xf6-big { margin: 12px 0 2px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 64px; line-height: .9; font-weight: 700; letter-spacing: -.05em; background: linear-gradient(180deg, #fff 30%, color-mix(in srgb, var(--hb-xf6-accent) 80%, #fff)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hb-xf6-big small { font-size: 26px; letter-spacing: -.02em; margin-left: 4px; }
.hb-xf6-title { margin: 6px 0 0; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
.hb-xf6-desc { margin: 4px auto 0; max-width: 300px; font-size: 12.5px; line-height: 1.5; color: #a1a1a1; }
.hb-xf6-clock { display: flex; justify-content: center; align-items: flex-start; gap: 6px; margin: 16px 0 14px; }
.hb-xf6-unit { display: grid; gap: 5px; justify-items: center; }
.hb-xf6-digits { display: flex; gap: 2px; }
.hb-xf6-digit { position: relative; width: 26px; height: 38px; overflow: hidden; border-radius: 8px; background: linear-gradient(#1c1c1c, #141414); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 4px 10px -6px rgba(0,0,0,.8); }
.hb-xf6-digit::after { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(0,0,0,.55); }
.hb-xf6-reel { position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transform: translateY(calc(var(--hb-xf6-d) * -38px)); transition: transform .6s cubic-bezier(.5,1.6,.4,1); }
.hb-xf6-reel span { display: grid; place-items: center; height: 38px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 20px; font-weight: 600; color: #fff; font-variant-numeric: tabular-nums; }
.hb-xf6-label { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #6f6f6f; }
.hb-xf6-colon { height: 38px; display: grid; place-items: center; font-size: 18px; color: #555; font-family: var(--font-mono), ui-monospace, monospace; }
.hb-xf6-stock { display: grid; gap: 6px; margin-bottom: 16px; text-align: left; }
.hb-xf6-stocktext { display: flex; justify-content: space-between; font-size: 11.5px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-xf6-stocktext b { color: #ededed; font-weight: 600; }
.hb-xf6-bar { position: relative; height: 8px; border-radius: 999px; background: #1c1c1c; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); overflow: hidden; }
.hb-xf6-fill { position: absolute; inset: 0 auto 0 0; width: var(--hb-xf6-pct); border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xf6-accent) 60%, #000), var(--hb-xf6-accent)); animation: hb-xf6-grow 1.1s cubic-bezier(.2,.8,.2,1) .25s both; transition: width .6s cubic-bezier(.3,.7,.4,1); }
.hb-xf6-fill::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, rgba(255,255,255,.18) 0 4px, transparent 4px 9px); background-size: 26px 100%; animation: hb-xf6-stripes .9s linear infinite; }
.hb-xf6-cta { all: unset; box-sizing: border-box; position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 44px; border-radius: 13px; overflow: hidden; font-size: 14px; font-weight: 700; color: #0a0a0a; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf6-accent) 70%, #fff), var(--hb-xf6-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 0 rgba(0,0,0,.15), 0 12px 28px -12px var(--hb-xf6-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf6-cta::before { content: ""; position: absolute; top: 0; bottom: 0; left: -40%; width: 30%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.65), transparent); transform: skewX(-20deg); animation: hb-xf6-sheen 3.2s cubic-bezier(.4,0,.2,1) 1s infinite; }
.hb-xf6-cta:hover { filter: brightness(1.05); }
.hb-xf6-cta:active { transform: scale(.98); }
.hb-xf6-cta:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf6-cta:disabled { cursor: not-allowed; color: #6f6f6f; background: #1c1c1c; box-shadow: inset 0 0 0 1px #2a2a2a; }
.hb-xf6-cta:disabled::before { display: none; }
.hb-xf6-fine { margin: 10px 0 0; font-size: 11px; color: #6f6f6f; }
.hb-xf6[data-urgent="true"] .hb-xf6-digit { border-color: color-mix(in srgb, #ff5d5d 50%, #2a2a2a); }
@keyframes hb-xf6-fade { from { opacity: 0; } }
@keyframes hb-xf6-in { from { opacity: 0; transform: scale(.9) rotate(-1.5deg); } }
@keyframes hb-xf6-out { to { opacity: 0; transform: scale(.96); } }
@keyframes hb-xf6-rot { to { --hb-xf6-spin: 360deg; } }
@keyframes hb-xf6-blink { 50% { opacity: .2; } }
@keyframes hb-xf6-grow { from { width: 0; } }
@keyframes hb-xf6-stripes { to { background-position: 26px 0; } }
@keyframes hb-xf6-sheen { 0% { left: -40%; } 45%, 100% { left: 130%; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf6 *, .hb-xf6 *::before, .hb-xf6 *::after { animation: none !important; transition: none !important; }
}
`;

function Digit({ value }: { value: number }) {
  return (
    <span className="hb-xf6-digit" aria-hidden="true">
      <span className="hb-xf6-reel" style={{ "--hb-xf6-d": value } as React.CSSProperties}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  const v = Math.min(99, Math.max(0, value));
  return (
    <span className="hb-xf6-unit">
      <span className="hb-xf6-digits">
        <Digit value={Math.floor(v / 10)} />
        <Digit value={v % 10} />
      </span>
      <span className="hb-xf6-label">{label}</span>
    </span>
  );
}

export function PopupPromoCountdown({
  eyebrow = "Black Friday",
  title = "Pro, annual plan",
  description = "Every template, the Figma kit and priority support. Locked at this price for as long as you stay.",
  discount = 40,
  duration = 8049,
  endsAt,
  claimed = 812,
  total = 1000,
  ctaLabel,
  onClaim,
  onExpire,
  open,
  defaultOpen,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "See the deal",
  embedded = false,
  accent = "#ffcc33",
  className = "",
  style,
  ...rest
}: PopupPromoCountdownProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const [left, setLeft] = React.useState(Math.max(0, Math.floor(duration)));
  const [taken, setTaken] = React.useState(claimed);
  const expireRef = React.useRef(onExpire);

  React.useEffect(() => {
    expireRef.current = onExpire;
  });

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
    if (!embedded || !touched.current) return;
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [embedded, isOpen]);

  React.useEffect(() => {
    const end = endsAt ? Date.parse(endsAt) : Date.now() + Math.max(0, Math.floor(duration)) * 1000;
    let done = false;
    const tick = () => {
      const s = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(s);
      if (s === 0 && !done) {
        done = true;
        expireRef.current?.();
      }
    };
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [endsAt, duration]);

  React.useEffect(() => {
    if (!isOpen) return;
    const id = window.setInterval(() => setTaken((t) => Math.min(total - 1, t + 1)), 9000);
    return () => window.clearInterval(id);
  }, [isOpen, total]);

  const expired = left === 0;
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const pct = Math.min(100, (taken / Math.max(1, total)) * 100);
  const spoken = `${h} hours ${m} minutes left`;

  return (
    <div
      className={`hb-xf6 ${embedded ? "hb-xf6-embedded" : ""} ${className}`}
      data-urgent={left > 0 && left < 600}
      style={{ "--hb-xf6-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-promo-countdown" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf6-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <span>-{discount}%</span>
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf6-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf6-scrim" onClick={close} aria-hidden="true" />
          <div className="hb-xf6-frame">
            <div ref={panelRef} className="hb-xf6-panel" role="dialog" aria-modal={embedded ? undefined : true} aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} tabIndex={-1}>
              <button type="button" className="hb-xf6-close" aria-label="Close" onClick={close}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
              </button>
              <span className="hb-xf6-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
              <p className="hb-xf6-big" aria-hidden="true">{discount}%<small>off</small></p>
              <h2 className="hb-xf6-title" id={`${uid}-t`}>{expired ? "This deal has ended" : `${discount}% off ${title}`}</h2>
              <p className="hb-xf6-desc" id={`${uid}-d`}>{description}</p>
              <div className="hb-xf6-clock" role="timer" aria-label={expired ? "Offer ended" : spoken}>
                <Unit value={h} label="Hours" />
                <span className="hb-xf6-colon" aria-hidden="true">:</span>
                <Unit value={m} label="Min" />
                <span className="hb-xf6-colon" aria-hidden="true">:</span>
                <Unit value={s} label="Sec" />
              </div>
              <div className="hb-xf6-stock">
                <div className="hb-xf6-stocktext">
                  <span><b>{taken.toLocaleString("en-US")}</b> of {total.toLocaleString("en-US")} claimed</span>
                  <span>{(total - taken).toLocaleString("en-US")} left</span>
                </div>
                <div className="hb-xf6-bar" role="progressbar" aria-label="Seats claimed" aria-valuemin={0} aria-valuemax={total} aria-valuenow={taken}>
                  <span className="hb-xf6-fill" style={{ "--hb-xf6-pct": `${pct.toFixed(1)}%` } as React.CSSProperties} />
                </div>
              </div>
              <button
                type="button"
                className="hb-xf6-cta"
                data-autofocus
                disabled={expired}
                onClick={() => {
                  onClaim?.();
                  close();
                }}
              >
                {expired ? "Offer expired" : ctaLabel ?? `Claim ${discount}% off`}
              </button>
              <p className="hb-xf6-fine">Applied at checkout. Cancel anytime.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";

export interface SuccessDetail {
  label: string;
  value: string;
}

export interface ModalSuccessCheckProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  message?: string;
  amount?: number;
  currency?: string;
  locale?: string;
  details?: SuccessDetail[];
  doneLabel?: string;
  receiptLabel?: string;
  onDone?: () => void;
  onReceipt?: () => void;
  accent?: string;
}

const defaultDetails: SuccessDetail[] = [
  { label: "Paid to", value: "Northwind Studio" },
  { label: "Invoice", value: "INV-2048" },
  { label: "Method", value: "Visa •• 4242" },
  { label: "Date", value: "Nov 7, 2026 · 2:14 PM" },
];

const palette = ["var(--hb-xe12-accent)", "#fde047", "#60a5fa", "#f472b6", "#ffffff"];

const sparks = Array.from({ length: 16 }, (_, i) => {
  const h = Math.imul(i + 7, 2654435761) >>> 0;
  const j = Math.imul(i + 3, 1597334677) >>> 0;
  return {
    a: (i * 22.5 + ((h % 100) / 100) * 12 - 6).toFixed(1),
    d: (36 + (j % 18)).toFixed(0),
    s: (3 + (h % 4)).toFixed(0),
    c: palette[(h >>> 3) % palette.length],
    r: (h >>> 5) % 2 === 0,
  };
});

const css = `
.hb-xe12 { --hb-xe12-accent: #22c55e; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe12 *, .hb-xe12 *::before, .hb-xe12 *::after { box-sizing: border-box; }
.hb-xe12[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: radial-gradient(70% 60% at 50% 30%, color-mix(in srgb, var(--hb-xe12-accent) 9%, transparent), transparent 70%), #0a0a0a; }
.hb-xe12-trigger { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 18px; border: 0; border-radius: 11px; background: linear-gradient(180deg, #fafafa, #e4e4e7); color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 650; font-variant-numeric: tabular-nums; cursor: pointer; box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.12), 0 10px 24px -12px rgba(255, 255, 255, 0.35); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe12-trigger:active { transform: scale(0.97); }
.hb-xe12-trigger svg { width: 14px; height: 14px; }
.hb-xe12 button:focus-visible { outline: 2px solid var(--hb-xe12-accent); outline-offset: 2px; }
.hb-xe12-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe12[data-embedded] .hb-xe12-layer { position: absolute; height: auto; z-index: 2; padding: 10px; }
.hb-xe12-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.66); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); animation: hb-xe12-fade 0.3s ease both; }
.hb-xe12-layer[data-state="closed"] .hb-xe12-scrim { animation: hb-xe12-fade-out 0.24s ease both; }
.hb-xe12-panel { position: relative; width: 100%; max-width: 360px; max-height: 100%; overflow: auto; padding: 26px 22px 30px; border-radius: 20px 20px 6px 6px; background: linear-gradient(180deg, #171717, #121212 60%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 40px 90px -30px rgba(0, 0, 0, 0.95); text-align: center; outline: none; -webkit-mask: radial-gradient(circle 6px at 50% 100%, transparent 98%, #000) 50% 100% / 18px 100% repeat-x; mask: radial-gradient(circle 6px at 50% 100%, transparent 98%, #000) 50% 100% / 18px 100% repeat-x; animation: hb-xe12-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hb-xe12-layer[data-state="closed"] .hb-xe12-panel { animation: hb-xe12-out 0.24s ease both; }
.hb-xe12-mark { position: relative; width: 68px; height: 68px; margin: 0 auto 14px; }
.hb-xe12-glow { position: absolute; inset: -14px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--hb-xe12-accent) 35%, transparent), transparent 65%); animation: hb-xe12-glow 1.2s 0.4s ease-out both; }
.hb-xe12-mark svg { position: relative; width: 100%; height: 100%; overflow: visible; }
.hb-xe12-disc { fill: color-mix(in srgb, var(--hb-xe12-accent) 14%, #121212); transform-origin: 34px 34px; animation: hb-xe12-disc 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.4) both; }
.hb-xe12-ring { fill: none; stroke: var(--hb-xe12-accent); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 189; stroke-dashoffset: 189; transform: rotate(-90deg); transform-origin: 34px 34px; animation: hb-xe12-draw 0.6s 0.1s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
.hb-xe12-tick { fill: none; stroke: var(--hb-xe12-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 36; stroke-dashoffset: 36; animation: hb-xe12-draw 0.38s 0.55s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
.hb-xe12-spark { position: absolute; top: 50%; left: 50%; width: var(--hb-xe12-s); height: var(--hb-xe12-s); margin: calc(var(--hb-xe12-s) / -2) 0 0 calc(var(--hb-xe12-s) / -2); border-radius: 50%; background: var(--hb-xe12-c); opacity: 0; transform: rotate(var(--hb-xe12-a)) translateY(0); animation: hb-xe12-burst 0.8s 0.7s cubic-bezier(0.1, 0.8, 0.3, 1) both; }
.hb-xe12-spark[data-r="true"] { border-radius: 1px; width: 2px; height: calc(var(--hb-xe12-s) * 2.2); }
.hb-xe12-title { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -0.012em; animation: hb-xe12-rise 0.5s 0.5s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe12-amount { margin: 6px 0 0; font-family: var(--font-grotesk, inherit); font-size: 34px; font-weight: 600; letter-spacing: -0.035em; font-variant-numeric: tabular-nums; animation: hb-xe12-rise 0.5s 0.58s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe12-msg { margin: 4px 0 0; color: #8f8f8f; font-size: 12.5px; line-height: 1.5; animation: hb-xe12-rise 0.5s 0.66s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe12-list { margin: 18px 0 0; padding: 14px 0 0; border-top: 1px dashed #2a2a2a; display: grid; gap: 8px; text-align: left; }
.hb-xe12-row { display: flex; justify-content: space-between; gap: 12px; font-size: 12.5px; animation: hb-xe12-rise 0.45s calc(0.75s + var(--hb-xe12-i) * 0.06s) cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe12-row dt { color: #7d7d7d; }
.hb-xe12-row dd { margin: 0; color: #e4e4e4; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe12-foot { display: flex; gap: 8px; margin-top: 20px; animation: hb-xe12-rise 0.45s 1s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe12-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 38px; border: 1px solid #2a2a2a; border-radius: 10px; background: transparent; color: #d4d4d4; font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe12-btn:hover { background: #1c1c1c; }
.hb-xe12-btn:active { transform: scale(0.97); }
.hb-xe12-btn[data-primary] { border-color: transparent; background: var(--hb-xe12-accent); color: #04140a; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 20px -10px var(--hb-xe12-accent); }
.hb-xe12-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-xe12-accent) 88%, #fff); }
.hb-xe12-btn svg { width: 13px; height: 13px; }
.hb-xe12[data-embedded] .hb-xe12-panel { padding: 18px 18px 24px; }
.hb-xe12[data-embedded] .hb-xe12-mark { width: 52px; height: 52px; margin-bottom: 10px; }
.hb-xe12[data-embedded] .hb-xe12-amount { font-size: 28px; margin-top: 4px; }
.hb-xe12[data-embedded] .hb-xe12-list { margin-top: 12px; padding-top: 10px; }
.hb-xe12[data-embedded] .hb-xe12-foot { margin-top: 14px; }
@keyframes hb-xe12-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe12-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe12-in { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes hb-xe12-out { from { opacity: 1; } to { opacity: 0; transform: translateY(8px) scale(0.98); } }
@keyframes hb-xe12-disc { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes hb-xe12-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xe12-glow { 0% { opacity: 0; transform: scale(0.6); } 40% { opacity: 1; } 100% { opacity: 0.35; transform: scale(1); } }
@keyframes hb-xe12-burst { 0% { opacity: 1; transform: rotate(var(--hb-xe12-a)) translateY(-20px) scale(1); } 70% { opacity: 1; } 100% { opacity: 0; transform: rotate(var(--hb-xe12-a)) translateY(calc(var(--hb-xe12-d) * -1px)) scale(0.4); } }
@keyframes hb-xe12-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe12-scrim, .hb-xe12-panel, .hb-xe12-glow, .hb-xe12-disc, .hb-xe12-title, .hb-xe12-amount, .hb-xe12-msg, .hb-xe12-row, .hb-xe12-foot, .hb-xe12-layer[data-state="closed"] .hb-xe12-panel, .hb-xe12-layer[data-state="closed"] .hb-xe12-scrim { animation: none; }
  .hb-xe12-ring, .hb-xe12-tick { animation: none; stroke-dashoffset: 0; }
  .hb-xe12-spark { animation: none; opacity: 0; }
  .hb-xe12-layer[data-state="closed"] { opacity: 0; }
  .hb-xe12-btn, .hb-xe12-trigger { transition: none; }
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

export function ModalSuccessCheck({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger,
  title = "Payment successful",
  message = "A receipt is on its way to ana@northwind.studio.",
  amount = 1284,
  currency = "USD",
  locale = "en-US",
  details = defaultDetails,
  doneLabel = "Done",
  receiptLabel = "View receipt",
  onDone,
  onReceipt,
  accent = "#22c55e",
  className = "",
  style,
  ...rest
}: ModalSuccessCheckProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [run, setRun] = React.useState(0);
  const [shown, setShown] = React.useState(amount);
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setRun((r) => r + 1);
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 260);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    if (!isOpen) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start - 520;
      const p = still ? 1 : Math.min(Math.max(elapsed / 950, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(Math.round(amount * eased * 100) / 100);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, run, amount]);

  useLayer(isOpen, embedded, panel, close, userOpened);

  const vars = { "--hb-xe12-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe12 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe12-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe12-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="7" width="8" height="6.5" rx="1.5" />
            <path d="M5.8 7V5.2a2.2 2.2 0 0 1 4.4 0V7" />
          </svg>
          {trigger ?? `Pay ${money.format(amount)}`}
        </button>
      )}
      {present && (
        <div className="hb-xe12-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe12-scrim" onClick={close} aria-hidden="true" />
          <div
            key={run}
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            aria-describedby={message ? `${id}-d` : undefined}
            tabIndex={-1}
            className="hb-xe12-panel"
          >
            <div className="hb-xe12-mark" aria-hidden="true">
              <span className="hb-xe12-glow" />
              {sparks.map((s, i) => (
                <span
                  key={i}
                  className="hb-xe12-spark"
                  data-r={s.r ? "true" : undefined}
                  style={{ "--hb-xe12-a": `${s.a}deg`, "--hb-xe12-d": s.d, "--hb-xe12-s": `${s.s}px`, "--hb-xe12-c": s.c } as React.CSSProperties}
                />
              ))}
              <svg viewBox="0 0 68 68">
                <circle className="hb-xe12-disc" cx="34" cy="34" r="30" />
                <circle className="hb-xe12-ring" cx="34" cy="34" r="30" />
                <path className="hb-xe12-tick" d="m22.5 34.5 7.8 7.8L46 27" />
              </svg>
            </div>
            <h2 id={`${id}-t`} className="hb-xe12-title">{title}</h2>
            <p className="hb-xe12-amount" aria-label={money.format(amount)}>{money.format(shown)}</p>
            {message && <p id={`${id}-d`} className="hb-xe12-msg">{message}</p>}
            {details.length > 0 && (
              <dl className="hb-xe12-list">
                {details.map((d, i) => (
                  <div key={d.label} className="hb-xe12-row" style={{ "--hb-xe12-i": i } as React.CSSProperties}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="hb-xe12-foot">
              <button type="button" className="hb-xe12-btn" onClick={() => onReceipt?.()}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 2.5h8v11l-2-1.2-2 1.2-2-1.2-2 1.2ZM6.5 6h3M6.5 8.5h3" />
                </svg>
                {receiptLabel}
              </button>
              <button
                type="button"
                className="hb-xe12-btn"
                data-primary=""
                data-autofocus=""
                onClick={() => {
                  onDone?.();
                  close();
                }}
              >
                {doneLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

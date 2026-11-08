"use client";

import * as React from "react";

export interface SideSheetItem {
  name: string;
  variant: string;
  qty: number;
  price: number;
  tint?: string;
}

export interface SideSheetOrder {
  id: string;
  customer: string;
  email: string;
  placed: string;
  items: SideSheetItem[];
  shipping: number;
}

export interface ModalSideSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  side?: "right" | "left";
  order?: SideSheetOrder;
  reasons?: string[];
  currency?: string;
  locale?: string;
  onRefund?: (amount: number, reason: string) => void;
  onFulfill?: (orderId: string) => void;
  accent?: string;
}

const defaultOrder: SideSheetOrder = {
  id: "4821",
  customer: "Priya Raman",
  email: "priya@fieldnotes.co",
  placed: "Nov 6, 4:12 PM",
  items: [
    { name: "Merino Crew Sweater", variant: "Oat · M", qty: 1, price: 98, tint: "#c9b38f" },
    { name: "Canvas Field Tote", variant: "Olive", qty: 1, price: 42, tint: "#6f7b4f" },
  ],
  shipping: 8,
};

const defaultReasons = ["Damaged", "Wrong size", "Arrived late", "Changed mind"];

const css = `
.hb-xe3 { --hb-xe3-accent: #a78bfa; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe3 *, .hb-xe3 *::before, .hb-xe3 *::after { box-sizing: border-box; }
.hb-xe3[data-embedded] { position: relative; display: grid; place-items: center start; padding-left: 22px; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0b0b0d; }
.hb-xe3[data-embedded][data-side="left"] { place-items: center end; padding: 0 22px 0 0; }
.hb-xe3-trigger { display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 12px; border: 1px solid #2a2a30; border-radius: 9px; background: #141418; color: #e4e4e7; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease; }
.hb-xe3-trigger:hover { border-color: #3a3a42; background: #18181d; }
.hb-xe3-trigger:active { transform: scale(0.97); }
.hb-xe3-trigger b { font-family: var(--font-mono, ui-monospace, monospace); font-weight: 500; font-size: 12px; color: #8b8b94; }
.hb-xe3 button:focus-visible, .hb-xe3 input:focus-visible { outline: 2px solid var(--hb-xe3-accent); outline-offset: 2px; }
.hb-xe3-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: flex; justify-content: flex-end; overflow: hidden; }
.hb-xe3[data-side="left"] .hb-xe3-layer { justify-content: flex-start; }
.hb-xe3[data-embedded] .hb-xe3-layer { position: absolute; height: auto; z-index: 2; }
.hb-xe3-scrim { position: absolute; inset: 0; background: rgba(5, 5, 8, 0.55); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); animation: hb-xe3-fade 0.3s ease both; }
.hb-xe3-layer[data-state="closed"] .hb-xe3-scrim { animation: hb-xe3-fade-out 0.28s ease both; }
.hb-xe3-stack { position: relative; width: min(420px, 100%); height: 100%; outline: none; animation: hb-xe3-in-r 0.48s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hb-xe3[data-side="left"] .hb-xe3-stack { animation-name: hb-xe3-in-l; }
.hb-xe3[data-embedded] .hb-xe3-stack { width: min(300px, 72%); }
.hb-xe3-layer[data-state="closed"] .hb-xe3-stack { animation: hb-xe3-out-r 0.28s cubic-bezier(0.5, 0, 0.75, 0) both; }
.hb-xe3[data-side="left"] .hb-xe3-layer[data-state="closed"] .hb-xe3-stack { animation-name: hb-xe3-out-l; }
.hb-xe3-sheet { position: absolute; inset: 0; display: flex; flex-direction: column; background: linear-gradient(180deg, #151519, #101013 40%); border-left: 1px solid #25252b; box-shadow: -30px 0 60px -30px rgba(0, 0, 0, 0.9); transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.5s ease, border-radius 0.5s ease; transform-origin: center left; }
.hb-xe3[data-side="left"] .hb-xe3-sheet { border-left: 0; border-right: 1px solid #25252b; box-shadow: 30px 0 60px -30px rgba(0, 0, 0, 0.9); transform-origin: center right; }
.hb-xe3-sheet[data-back="true"] { transform: translateX(-26px) scale(0.94); filter: brightness(0.55); border-radius: 14px; overflow: hidden; }
.hb-xe3[data-side="left"] .hb-xe3-sheet[data-back="true"] { transform: translateX(26px) scale(0.94); }
.hb-xe3-sub { position: absolute; inset: 0; display: flex; flex-direction: column; background: linear-gradient(180deg, #17171c, #111114 45%); border-left: 1px solid #2c2c33; box-shadow: -24px 0 50px -20px rgba(0, 0, 0, 0.9); transform: translateX(104%); visibility: hidden; transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s linear 0.5s; }
.hb-xe3[data-side="left"] .hb-xe3-sub { transform: translateX(-104%); border-left: 0; border-right: 1px solid #2c2c33; }
.hb-xe3-sub[data-open="true"] { transform: none; visibility: visible; transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s; }
.hb-xe3-head { flex: none; display: flex; align-items: center; gap: 10px; padding: 14px 14px 12px 16px; border-bottom: 1px solid #1f1f24; }
.hb-xe3-eyebrow { display: block; color: #7d7d86; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
.hb-xe3-title { margin: 1px 0 0; font-family: var(--font-grotesk, inherit); font-size: 17px; font-weight: 600; letter-spacing: -0.02em; white-space: nowrap; }
.hb-xe3-title span { color: #6e6e78; font-weight: 500; }
.hb-xe3-pill { display: inline-flex; align-items: center; gap: 5px; height: 22px; padding: 0 8px; margin-left: auto; border-radius: 999px; background: rgba(245, 185, 66, 0.12); color: #f5c24a; font-size: 11px; font-weight: 600; white-space: nowrap; }
.hb-xe3-pill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-xe3-pill[data-tone="done"] { background: rgba(74, 210, 140, 0.12); color: #4fd18b; }
.hb-xe3-pill[data-tone="refund"] { background: color-mix(in srgb, var(--hb-xe3-accent) 16%, transparent); color: var(--hb-xe3-accent); }
.hb-xe3-icon { flex: none; display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 8px; background: transparent; color: #8b8b94; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-xe3-icon:hover { background: #1f1f25; color: #fff; }
.hb-xe3-icon svg { width: 14px; height: 14px; }
.hb-xe3-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 14px 16px; display: grid; align-content: start; gap: 14px; }
.hb-xe3-who { display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #222228; border-radius: 12px; background: #0f0f12; }
.hb-xe3-av { flex: none; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #f0abfc, #818cf8); color: #160f25; font-size: 12px; font-weight: 700; }
.hb-xe3-name { display: block; font-size: 13px; font-weight: 600; }
.hb-xe3-muted { display: block; color: #7d7d86; font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe3-items { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hb-xe3-item { display: grid; grid-template-columns: 38px 1fr auto; gap: 10px; align-items: center; font-size: 13px; }
.hb-xe3-thumb { height: 38px; border-radius: 9px; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 -10px 18px rgba(0, 0, 0, 0.25); }
.hb-xe3-num { font-variant-numeric: tabular-nums; }
.hb-xe3-sum { display: grid; gap: 6px; padding-top: 12px; border-top: 1px dashed #26262c; font-size: 12.5px; color: #9a9aa3; }
.hb-xe3-sum div { display: flex; justify-content: space-between; }
.hb-xe3-sum div:last-child { color: #ededed; font-size: 14px; font-weight: 600; }
.hb-xe3-foot { flex: none; display: flex; gap: 8px; padding: 12px 16px 16px; border-top: 1px solid #1f1f24; }
.hb-xe3-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 38px; padding: 0 12px; border: 1px solid #2b2b32; border-radius: 10px; background: #18181d; color: #e4e4e7; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), opacity 0.2s ease; }
.hb-xe3-btn:hover { background: #1f1f25; }
.hb-xe3-btn:active { transform: scale(0.97); }
.hb-xe3-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xe3-btn[data-primary] { border-color: transparent; background: #ededed; color: #0b0b0d; box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1); }
.hb-xe3-btn[data-primary]:hover { background: #fff; }
.hb-xe3-btn[data-accent] { border-color: transparent; background: var(--hb-xe3-accent); color: #120c22; }
.hb-xe3-btn svg { width: 14px; height: 14px; }
.hb-xe3-label { margin: 0 0 7px; color: #8b8b94; font-size: 11.5px; font-weight: 500; }
.hb-xe3-modes { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.hb-xe3-mode { display: grid; gap: 2px; padding: 10px; border: 1px solid #26262c; border-radius: 11px; background: #121215; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: border-color 0.2s ease, background-color 0.2s ease; }
.hb-xe3-mode[aria-checked="true"] { border-color: var(--hb-xe3-accent); background: color-mix(in srgb, var(--hb-xe3-accent) 9%, #121215); }
.hb-xe3-mode b { font-size: 12.5px; font-weight: 600; }
.hb-xe3-mode span { color: #8b8b94; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-xe3-amount { display: flex; align-items: center; height: 38px; margin-top: 6px; padding: 0 10px; border: 1px solid #2b2b32; border-radius: 10px; background: #0d0d10; font-variant-numeric: tabular-nums; }
.hb-xe3-amount:focus-within { border-color: var(--hb-xe3-accent); }
.hb-xe3-amount span { color: #6e6e78; font-size: 13px; }
.hb-xe3-amount input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; outline: none; padding-left: 4px; }
.hb-xe3 .hb-xe3-amount input:focus-visible { outline: none; }
.hb-xe3-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-xe3-chip { height: 28px; padding: 0 10px; border: 1px solid #2b2b32; border-radius: 999px; background: transparent; color: #c4c4cc; font: inherit; font-size: 12px; cursor: pointer; transition: all 0.18s ease; }
.hb-xe3-chip[aria-pressed="true"] { border-color: transparent; background: #ededed; color: #0b0b0d; }
.hb-xe3-done { display: grid; justify-items: center; gap: 8px; padding: 26px 0 8px; text-align: center; animation: hb-xe3-pop 0.5s cubic-bezier(0.2, 0.9, 0.2, 1.2) both; }
.hb-xe3-done i { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: color-mix(in srgb, var(--hb-xe3-accent) 18%, transparent); color: var(--hb-xe3-accent); font-style: normal; }
.hb-xe3-done svg { width: 20px; height: 20px; }
.hb-xe3-done b { font-size: 14px; }
@keyframes hb-xe3-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe3-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe3-in-r { from { transform: translateX(100%); } to { transform: none; } }
@keyframes hb-xe3-in-l { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes hb-xe3-out-r { from { transform: none; } to { transform: translateX(100%); } }
@keyframes hb-xe3-out-l { from { transform: none; } to { transform: translateX(-100%); } }
@keyframes hb-xe3-pop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe3-scrim, .hb-xe3-stack, .hb-xe3-done, .hb-xe3-layer[data-state="closed"] .hb-xe3-stack, .hb-xe3-layer[data-state="closed"] .hb-xe3-scrim { animation: none; }
  .hb-xe3-layer[data-state="closed"] { opacity: 0; }
  .hb-xe3-sheet, .hb-xe3-sub, .hb-xe3-sub[data-open="true"], .hb-xe3-btn, .hb-xe3-mode, .hb-xe3-chip, .hb-xe3-trigger, .hb-xe3-icon { transition: none; }
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
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]") && getComputedStyle(el).visibility !== "hidden",
      );
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active) || !items.includes(active as HTMLElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
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

export function ModalSideSheet({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "View order",
  side = "right",
  order = defaultOrder,
  reasons = defaultReasons,
  currency = "USD",
  locale = "en-US",
  onRefund,
  onFulfill,
  accent = "#a78bfa",
  className = "",
  style,
  ...rest
}: ModalSideSheetProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [nested, setNested] = React.useState(false);
  const [status, setStatus] = React.useState<"open" | "fulfilled" | "refunded">("open");
  const [mode, setMode] = React.useState<"full" | "partial">("full");
  const [partial, setPartial] = React.useState("40.00");
  const [reason, setReason] = React.useState(reasons[0] ?? "");
  const [phase, setPhase] = React.useState<"form" | "busy" | "done">("form");
  const userOpened = React.useRef(false);
  const stack = React.useRef<HTMLDivElement>(null);
  const refundBtn = React.useRef<HTMLButtonElement>(null);
  const subFirst = React.useRef<HTMLButtonElement>(null);
  const timers = React.useRef<number[]>([]);
  const id = React.useId();

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + order.shipping;
  const parsed = Math.min(Math.max(Number.parseFloat(partial) || 0, 0), total);
  const amount = mode === "full" ? total : parsed;

  if (isOpen && !present) setPresent(true);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) userOpened.current = true;
      else setNested(false);
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const popNested = React.useCallback(() => {
    setNested(false);
    setPhase("form");
    timers.current.push(window.setTimeout(() => refundBtn.current?.focus({ preventScroll: true }), 30));
  }, []);

  const handleClose = React.useCallback(() => {
    if (nested) popNested();
    else setOpen(false);
  }, [nested, popNested, setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 300);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  useLayer(isOpen, embedded, stack, handleClose, userOpened);

  function openNested() {
    setNested(true);
    setPhase("form");
    timers.current.push(window.setTimeout(() => subFirst.current?.focus({ preventScroll: true }), 60));
  }

  function submitRefund() {
    if (amount <= 0 || phase !== "form") return;
    setPhase("busy");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("done");
        setStatus("refunded");
        onRefund?.(amount, reason);
        timers.current.push(window.setTimeout(popNested, 1300));
      }, 900),
    );
  }

  const pill = status === "fulfilled" ? "Fulfilled" : status === "refunded" ? "Refunded" : "Unfulfilled";
  const tone = status === "fulfilled" ? "done" : status === "refunded" ? "refund" : "wait";
  const vars = { "--hb-xe3-accent": accent, ...style } as React.CSSProperties;
  const closeIcon = (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="m3.5 3.5 9 9m0-9-9 9" />
    </svg>
  );

  return (
    <div className={`hb-xe3 ${className}`} data-embedded={embedded || undefined} data-side={side} style={vars} {...rest}>
      <style href="hb-xe3-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe3-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          {trigger}
          <b>#{order.id}</b>
        </button>
      )}
      {present && (
        <div className="hb-xe3-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe3-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
          <div ref={stack} role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} tabIndex={-1} className="hb-xe3-stack">
            <section className="hb-xe3-sheet" data-back={nested ? "true" : undefined} inert={nested}>
              <header className="hb-xe3-head">
                <div style={{ minWidth: 0 }}>
                  <span className="hb-xe3-eyebrow">{order.placed}</span>
                  <h2 id={`${id}-t`} className="hb-xe3-title"><span>Order </span>#{order.id}</h2>
                </div>
                <span className="hb-xe3-pill" data-tone={tone} aria-live="polite">{pill}</span>
                <button type="button" className="hb-xe3-icon" aria-label="Close" onClick={() => setOpen(false)}>{closeIcon}</button>
              </header>
              <div className="hb-xe3-body">
                <div className="hb-xe3-who">
                  <span className="hb-xe3-av" aria-hidden="true">
                    {order.customer.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="hb-xe3-name">{order.customer}</span>
                    <span className="hb-xe3-muted">{order.email}</span>
                  </span>
                </div>
                <ul className="hb-xe3-items">
                  {order.items.map((it) => (
                    <li key={it.name} className="hb-xe3-item">
                      <span className="hb-xe3-thumb" style={{ background: `linear-gradient(150deg, ${it.tint ?? "#555"}, #1a1a1f)` }} aria-hidden="true" />
                      <span style={{ minWidth: 0 }}>
                        <span className="hb-xe3-name" style={{ fontWeight: 500 }}>{it.name}</span>
                        <span className="hb-xe3-muted">{it.variant} · Qty {it.qty}</span>
                      </span>
                      <span className="hb-xe3-num">{money.format(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="hb-xe3-sum">
                  <div><span>Subtotal</span><span className="hb-xe3-num">{money.format(subtotal)}</span></div>
                  <div><span>Shipping</span><span className="hb-xe3-num">{money.format(order.shipping)}</span></div>
                  <div><span>Total</span><span className="hb-xe3-num">{money.format(total)}</span></div>
                </div>
              </div>
              <footer className="hb-xe3-foot">
                <button ref={refundBtn} type="button" className="hb-xe3-btn" disabled={status === "refunded"} onClick={openNested}>
                  Issue refund
                </button>
                <button
                  type="button"
                  className="hb-xe3-btn"
                  data-primary=""
                  data-autofocus=""
                  disabled={status !== "open"}
                  onClick={() => {
                    setStatus("fulfilled");
                    onFulfill?.(order.id);
                  }}
                >
                  {status === "fulfilled" ? (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.4 3 3 6-6.4" /></svg>
                      Fulfilled
                    </>
                  ) : (
                    "Mark as fulfilled"
                  )}
                </button>
              </footer>
            </section>
            <section className="hb-xe3-sub" data-open={nested ? "true" : undefined} inert={!nested} aria-label="Refund">
              <header className="hb-xe3-head">
                <button ref={subFirst} type="button" className="hb-xe3-icon" aria-label="Back to order" onClick={popNested}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 3.5 5.5 8l4.5 4.5" />
                  </svg>
                </button>
                <div style={{ minWidth: 0 }}>
                  <span className="hb-xe3-eyebrow">Order #{order.id}</span>
                  <h3 className="hb-xe3-title">Issue refund</h3>
                </div>
              </header>
              <div className="hb-xe3-body">
                {phase === "done" ? (
                  <div className="hb-xe3-done" role="status">
                    <i aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 10.5 3.2 3.2L15 7" /></svg>
                    </i>
                    <b>{money.format(amount)} refunded</b>
                    <span className="hb-xe3-muted">{order.customer} gets an email in a minute.</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="hb-xe3-label">Amount</p>
                      <div className="hb-xe3-modes" role="radiogroup" aria-label="Refund amount">
                        <button type="button" role="radio" aria-checked={mode === "full"} className="hb-xe3-mode" onClick={() => setMode("full")}>
                          <b>Full</b>
                          <span>{money.format(total)}</span>
                        </button>
                        <button type="button" role="radio" aria-checked={mode === "partial"} className="hb-xe3-mode" onClick={() => setMode("partial")}>
                          <b>Partial</b>
                          <span>Custom amount</span>
                        </button>
                      </div>
                      {mode === "partial" && (
                        <label className="hb-xe3-amount">
                          <span>{currency}</span>
                          <input
                            inputMode="decimal"
                            aria-label="Refund amount"
                            value={partial}
                            onChange={(e) => setPartial(e.target.value.replace(/[^0-9.]/g, ""))}
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <p className="hb-xe3-label">Reason</p>
                      <div className="hb-xe3-chips">
                        {reasons.map((r) => (
                          <button key={r} type="button" className="hb-xe3-chip" aria-pressed={reason === r} onClick={() => setReason(r)}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <footer className="hb-xe3-foot">
                <button
                  type="button"
                  className="hb-xe3-btn"
                  data-accent=""
                  disabled={amount <= 0 || phase !== "form"}
                  aria-busy={phase === "busy" || undefined}
                  onClick={submitRefund}
                >
                  {phase === "busy" ? "Refunding" : phase === "done" ? "Done" : `Refund ${money.format(amount)}`}
                </button>
              </footer>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

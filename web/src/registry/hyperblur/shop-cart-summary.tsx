"use client";

import * as React from "react";

export interface CartItem {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  tone?: string;
  glyph?: "shoe" | "sock" | "bag" | "bottle" | "cap";
}

export interface CartTotals {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode: string | null;
}

export interface ShopCartSummaryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  defaultItems?: CartItem[];
  currency?: string;
  freeShippingThreshold?: number;
  shippingCost?: number;
  taxRate?: number;
  promoCodes?: Record<string, number>;
  checkoutLabel?: string;
  continueHref?: string;
  onItemsChange?: (items: CartItem[]) => void;
  onCheckout?: (totals: CartTotals) => void;
  accent?: string;
}

const defaultItems: CartItem[] = [
  { id: "trail-runner", name: "Trail Runner 3", variant: "Basalt / US 10", price: 138, quantity: 1, tone: "#3b4a5a", glyph: "shoe" },
  { id: "merino-crew", name: "Merino Crew Socks", variant: "Fog, 3-pack", price: 24, quantity: 2, tone: "#7a6f62", glyph: "sock" },
  { id: "daypack", name: "Ridge Daypack 18L", variant: "Moss", price: 92, quantity: 1, tone: "#4f5d3f", glyph: "bag" },
];

const glyphs: Record<NonNullable<CartItem["glyph"]>, string> = {
  shoe: "M6 30c0-4 2-7 5-8l6-1 4-6c1-1 2-1 3 0l3 3c2 2 5 3 8 3l6 1c3 1 5 3 5 6v2H6Z M6 31.5h40v3H6Z",
  sock: "M20 6h12v18c0 3 1 5 3 7l2 2c2 2 2 6-1 8s-6 2-8 0l-7-7c-1-1-1-3-1-4V6Z",
  bag: "M14 16c0-6 4-10 12-10s12 4 12 10v22c0 2-2 4-4 4H18c-2 0-4-2-4-4V16Z M20 24h12v8H20z",
  bottle: "M22 6h8v6l3 4v24c0 2-1 3-3 3h-8c-2 0-3-1-3-3V16l3-4V6Z",
  cap: "M8 30c0-10 8-18 18-18s18 8 18 18H8Z M8 31.5h40c0 2-2 3-4 3H8v-3Z",
};

function money(value: number, currency: string) {
  const negative = value < 0;
  const [whole, cents] = Math.abs(value).toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+$)/g, ",");
  return `${negative ? "−" : ""}${currency}${grouped}.${cents}`;
}

function useTween(target: number) {
  const [value, setValue] = React.useState(target);
  const fromRef = React.useRef(target);
  React.useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const duration = reduce ? 0 : 520;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

function Num({ value, currency }: { value: number; currency: string }) {
  const shown = useTween(value);
  return <>{money(Math.round(shown * 100) / 100, currency)}</>;
}

const css = `
.hb-ki6 {
  --hb-ki6-accent: #10b981;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background:
    radial-gradient(60% 40% at 100% 0%, color-mix(in srgb, var(--hb-ki6-accent) 8%, transparent), transparent 70%),
    #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki6 *, .hb-ki6 *::before, .hb-ki6 *::after { box-sizing: border-box; }
.hb-ki6-inner {
  display: grid;
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(40px, 6.5cqi, 96px) clamp(16px, 4cqi, 40px);
}
.hb-ki6-panel {
  min-width: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 22px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
}
.hb-ki6-main { padding: clamp(18px, 2.6cqi, 28px); }
.hb-ki6-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-ki6-title { margin: 0; font-size: clamp(24px, 3cqi, 30px); font-weight: 650; letter-spacing: -.03em; }
.hb-ki6-title span { color: #6b6b6b; font-weight: 500; }
.hb-ki6-link { color: #8f8f8f; font-size: 13.5px; text-decoration: none; border-radius: 4px; }
.hb-ki6-link:hover { color: #ededed; }
.hb-ki6-link:focus-visible { outline: 2px solid var(--hb-ki6-accent); outline-offset: 2px; }
.hb-ki6-ship {
  margin-top: 18px;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px;
  background: #0b0b0b;
}
.hb-ki6-ship p { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; color: #c9c9c9; font-size: 13.5px; }
.hb-ki6-ship p b { color: #ededed; font-weight: 600; }
.hb-ki6-ship svg { width: 16px; height: 16px; flex: none; color: var(--hb-ki6-accent); }
.hb-ki6-bar { position: relative; height: 6px; border-radius: 6px; background: rgba(255,255,255,.07); overflow: hidden; }
.hb-ki6-bar span {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ki6-accent) 50%, #0a0a0a), var(--hb-ki6-accent));
  transform-origin: left;
  transform: scaleX(var(--hb-ki6-p, 0));
  transition: transform .6s cubic-bezier(.2,.7,.2,1);
  animation: hb-ki6-grow 1.2s cubic-bezier(.2,.7,.2,1) both;
}
.hb-ki6-bar span::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
  transform: translateX(-100%);
  animation: hb-ki6-sheen 2.6s 1.2s ease-in-out infinite;
}
.hb-ki6-list { margin: 8px 0 0; padding: 0; list-style: none; }
.hb-ki6-item {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows .3s ease, opacity .25s ease;
}
.hb-ki6-item[data-leaving="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-ki6-row {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 4px 14px;
  align-items: center;
  min-height: 0;
  overflow: hidden;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.hb-ki6-item:last-child .hb-ki6-row { border-bottom: 0; }
.hb-ki6-thumb {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.15);
}
.hb-ki6-thumb svg { width: 36px; height: 36px; }
.hb-ki6-name { min-width: 0; }
.hb-ki6-name b { display: block; font-size: 14.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ki6-name span { display: block; margin-top: 3px; color: #8f8f8f; font-size: 12.5px; }
.hb-ki6-line { font-size: 14.5px; font-weight: 600; font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.hb-ki6-ctrls { grid-column: 2 / -1; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-ki6-step {
  display: inline-flex;
  align-items: center;
  height: 32px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  background: #0b0b0b;
}
.hb-ki6-step button {
  display: grid;
  place-items: center;
  width: 30px;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #ededed;
  cursor: pointer;
}
.hb-ki6-step button:disabled { color: #404040; cursor: default; }
.hb-ki6-step button:focus-visible { outline: 2px solid var(--hb-ki6-accent); outline-offset: -3px; }
.hb-ki6-step svg { width: 12px; height: 12px; }
.hb-ki6-step output { min-width: 20px; font-size: 13.5px; font-weight: 600; text-align: center; font-variant-numeric: tabular-nums; }
.hb-ki6-unit { color: #6b6b6b; font-size: 12px; margin-left: 10px; }
.hb-ki6-remove {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-ki6-remove svg { width: 14px; height: 14px; }
.hb-ki6-remove:hover { color: #f87171; background: rgba(248,113,113,.08); }
.hb-ki6-remove:focus-visible { outline: 2px solid var(--hb-ki6-accent); outline-offset: 1px; }
.hb-ki6-empty { padding: 40px 0 20px; color: #8f8f8f; font-size: 14.5px; text-align: center; }
.hb-ki6-empty a { color: var(--hb-ki6-accent); }
.hb-ki6-side { padding: clamp(18px, 2.6cqi, 26px); align-self: start; }
.hb-ki6-stitle { margin: 0 0 16px; font-size: 16px; font-weight: 600; }
.hb-ki6-promo { display: flex; gap: 8px; }
.hb-ki6-input {
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 14px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px;
  background: #0a0a0a;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  letter-spacing: .04em;
  text-transform: uppercase;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-ki6-input::placeholder { color: #5a5a5a; letter-spacing: 0; text-transform: none; }
.hb-ki6-input:focus { border-color: color-mix(in srgb, var(--hb-ki6-accent) 60%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ki6-accent) 18%, transparent); }
.hb-ki6-input[aria-invalid="true"] { border-color: rgba(248,113,113,.6); box-shadow: 0 0 0 3px rgba(248,113,113,.14); animation: hb-ki6-shake .35s ease; }
.hb-ki6-apply {
  height: 42px;
  margin: 0;
  padding: 0 16px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease;
}
.hb-ki6-apply:hover:not(:disabled) { background: #1f1f1f; border-color: rgba(255,255,255,.2); }
.hb-ki6-apply:disabled { color: #5a5a5a; cursor: default; }
.hb-ki6-apply:focus-visible { outline: 2px solid var(--hb-ki6-accent); outline-offset: 2px; }
.hb-ki6-msg { min-height: 20px; margin: 8px 0 0; font-size: 12.5px; }
.hb-ki6-msg[data-kind="error"] { color: #f87171; }
.hb-ki6-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  margin-top: 10px;
  padding: 0 6px 0 10px;
  border: 1px solid color-mix(in srgb, var(--hb-ki6-accent) 40%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ki6-accent) 12%, transparent);
  color: color-mix(in srgb, var(--hb-ki6-accent) 70%, #fff);
  font-size: 12.5px;
  font-weight: 600;
  animation: hb-ki6-pop .35s cubic-bezier(.2,.9,.3,1.3) both;
}
.hb-ki6-chip svg { width: 14px; height: 14px; }
.hb-ki6-chip button {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.08);
  color: inherit;
  cursor: pointer;
}
.hb-ki6-chip button:focus-visible { outline: 2px solid var(--hb-ki6-accent); outline-offset: 1px; }
.hb-ki6-rows { display: grid; gap: 10px; margin: 18px 0 0; padding: 18px 0 0; border-top: 1px solid rgba(255,255,255,.07); }
.hb-ki6-rows div { display: flex; justify-content: space-between; gap: 12px; color: #a1a1a1; font-size: 14px; }
.hb-ki6-rows dd { margin: 0; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-ki6-rows dt { margin: 0; }
.hb-ki6-rows .hb-ki6-good dd { color: color-mix(in srgb, var(--hb-ki6-accent) 75%, #fff); }
.hb-ki6-total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 18px 0;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.07);
}
.hb-ki6-total span { color: #a1a1a1; font-size: 14px; }
.hb-ki6-total b { font-size: 28px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-ki6-total small { color: #6b6b6b; font-size: 12px; font-weight: 500; margin-right: 6px; }
.hb-ki6-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  margin: 0;
  border: 0;
  border-radius: 14px;
  background: var(--hb-ki6-accent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 12px 30px -14px var(--hb-ki6-accent);
  color: #04130d;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  cursor: pointer;
  transition: filter .2s ease, transform .15s ease;
}
.hb-ki6-checkout svg { width: 16px; height: 16px; }
.hb-ki6-checkout:hover:not(:disabled) { filter: brightness(1.08); }
.hb-ki6-checkout:active:not(:disabled) { transform: scale(.985); }
.hb-ki6-checkout:disabled { opacity: .4; cursor: default; }
.hb-ki6-checkout:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-ki6-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 12px 0 0; color: #6b6b6b; font-size: 12px; }
.hb-ki6-note svg { width: 13px; height: 13px; }
@container (min-width: 820px) {
  .hb-ki6-inner { grid-template-columns: 1.55fr 1fr; gap: 20px; align-items: start; }
  .hb-ki6-row { grid-template-columns: 72px 1fr auto; gap: 6px 18px; }
  .hb-ki6-thumb { width: 72px; height: 72px; }
}
@container (max-width: 520px) {
  .hb-ki6-unit, .hb-ki6-rmt { display: none; }
  .hb-ki6-remove { padding: 0 8px; }
  .hb-ki6-head { flex-direction: column; gap: 6px; }
}
@keyframes hb-ki6-grow { from { transform: scaleX(0); } }
@keyframes hb-ki6-sheen { 0% { transform: translateX(-100%); } 60%, 100% { transform: translateX(100%); } }
@keyframes hb-ki6-shake {
  0%, 100% { transform: none; }
  30% { transform: translateX(-5px); }
  60% { transform: translateX(4px); }
}
@keyframes hb-ki6-pop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ki6-bar span, .hb-ki6-bar span::after, .hb-ki6-input[aria-invalid="true"], .hb-ki6-chip { animation: none; }
  .hb-ki6-bar span, .hb-ki6-item, .hb-ki6-input, .hb-ki6-remove, .hb-ki6-checkout { transition: none; }
}
`;

const minus = <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M2.5 6h7" /></svg>;
const plus = <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M2.5 6h7M6 2.5v7" /></svg>;

export function ShopCartSummary({
  title = "Your bag",
  defaultItems: initialItems = defaultItems,
  currency = "$",
  freeShippingThreshold = 300,
  shippingCost = 9,
  taxRate = 0.0825,
  promoCodes = { NORTHWIND10: 0.1, TRAIL15: 0.15 },
  checkoutLabel = "Checkout securely",
  continueHref = "#",
  onItemsChange,
  onCheckout,
  accent = "#10b981",
  className,
  style,
  ...rest
}: ShopCartSummaryProps) {
  const [items, setItems] = React.useState(initialItems);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [code, setCode] = React.useState("");
  const [applied, setApplied] = React.useState<string | null>(null);
  const [invalid, setInvalid] = React.useState(0);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const uid = React.useId();

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const update = (next: CartItem[]) => {
    setItems(next);
    onItemsChange?.(next);
  };

  const setQty = (id: string, delta: number) => {
    update(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, Math.min(20, item.quantity + delta)) } : item)));
  };

  const remove = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setLeaving((list) => [...list, id]);
    timers.current.push(
      setTimeout(() => {
        setLeaving((list) => list.filter((x) => x !== id));
        update(next);
      }, 300),
    );
  };

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = code.trim().toUpperCase();
    if (!key) return;
    if (promoCodes[key] !== undefined) {
      setApplied(key);
      setInvalid(0);
      setCode("");
    } else {
      setInvalid((n) => n + 1);
    }
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const rate = applied ? promoCodes[applied] ?? 0 : 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const afterDiscount = subtotal - discount;
  const free = afterDiscount >= freeShippingThreshold;
  const shipping = items.length === 0 || free ? 0 : shippingCost;
  const tax = Math.round(afterDiscount * taxRate * 100) / 100;
  const total = afterDiscount + shipping + tax;
  const progress = freeShippingThreshold > 0 ? Math.min(1, afterDiscount / freeShippingThreshold) : 1;

  return (
    <section
      className={className ? `hb-ki6 ${className}` : "hb-ki6"}
      style={{ "--hb-ki6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-cart-summary" precedence="default">{css}</style>
      <div className="hb-ki6-inner">
        <div className="hb-ki6-panel hb-ki6-main">
          <div className="hb-ki6-head">
            <h2 className="hb-ki6-title">
              {title} <span>· {count} {count === 1 ? "item" : "items"}</span>
            </h2>
            <a className="hb-ki6-link" href={continueHref}>Continue shopping</a>
          </div>
          {items.length > 0 && (
            <div className="hb-ki6-ship">
              <p aria-live="polite">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {free ? <path d="M4.5 10.5l3.5 3.5 7.5-8" /> : <path d="M1.5 5h10v8h-10zM11.5 8h3.5l3 3v2h-6.5M5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM15 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />}
                </svg>
                {free ? (
                  <span>You unlocked <b>free shipping</b>.</span>
                ) : (
                  <span>
                    Add <b>{money(freeShippingThreshold - afterDiscount, currency)}</b> more for free shipping.
                  </span>
                )}
              </p>
              <div
                className="hb-ki6-bar"
                role="progressbar"
                aria-label="Progress to free shipping"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
              >
                <span style={{ "--hb-ki6-p": progress.toFixed(4) } as React.CSSProperties} />
              </div>
            </div>
          )}
          {items.length === 0 ? (
            <p className="hb-ki6-empty">
              Your bag is empty. <a href={continueHref}>Find something you love</a>
            </p>
          ) : (
            <ul className="hb-ki6-list">
              {items.map((item) => {
                const tone = item.tone ?? "#3a3a3a";
                return (
                  <li key={item.id} className="hb-ki6-item" data-leaving={leaving.includes(item.id)}>
                    <div className="hb-ki6-row">
                      <span
                        className="hb-ki6-thumb"
                        style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${tone} 60%, #fff) 0%, transparent 55%), linear-gradient(145deg, ${tone}, color-mix(in srgb, ${tone} 45%, #000))` }}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 52 48" fill="rgba(255,255,255,.88)" fillRule="evenodd">
                          <path d={glyphs[item.glyph ?? "bag"]} />
                        </svg>
                      </span>
                      <div className="hb-ki6-name">
                        <b>{item.name}</b>
                        {item.variant && <span>{item.variant}</span>}
                      </div>
                      <div className="hb-ki6-ctrls">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="hb-ki6-step" role="group" aria-label={`Quantity of ${item.name}`}>
                            <button type="button" aria-label="Decrease" disabled={item.quantity <= 1} onClick={() => setQty(item.id, -1)}>{minus}</button>
                            <output aria-live="polite">{item.quantity}</output>
                            <button type="button" aria-label="Increase" disabled={item.quantity >= 20} onClick={() => setQty(item.id, 1)}>{plus}</button>
                          </div>
                          {item.quantity > 1 && <span className="hb-ki6-unit">{money(item.price, currency)} each</span>}
                        </div>
                        <button type="button" className="hb-ki6-remove" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`}>
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.7 9h6.6l.7-9" />
                          </svg>
                          <span className="hb-ki6-rmt">Remove</span>
                        </button>
                      </div>
                      <span className="hb-ki6-line">
                        <Num value={item.price * item.quantity} currency={currency} />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <aside className="hb-ki6-panel hb-ki6-side" aria-label="Order summary">
          <h3 className="hb-ki6-stitle">Order summary</h3>
          <form className="hb-ki6-promo" onSubmit={apply} noValidate>
            <label htmlFor={`${uid}-promo`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Promo code
            </label>
            <input
              id={`${uid}-promo`}
              key={invalid}
              className="hb-ki6-input"
              placeholder="Promo code"
              value={code}
              autoComplete="off"
              aria-invalid={invalid > 0}
              aria-describedby={`${uid}-msg`}
              onChange={(event) => {
                setCode(event.target.value);
                if (invalid) setInvalid(0);
              }}
            />
            <button type="submit" className="hb-ki6-apply" disabled={!code.trim()}>Apply</button>
          </form>
          <p className="hb-ki6-msg" id={`${uid}-msg`} data-kind={invalid ? "error" : undefined} aria-live="polite">
            {invalid ? "That code isn't valid. Check the spelling and try again." : applied ? "" : `Try ${Object.keys(promoCodes)[0] ?? ""}`}
          </p>
          {applied && (
            <span className="hb-ki6-chip">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8.5 2h5v5l-6.5 6.5-5-5L8.5 2zM11 5h.01" />
              </svg>
              {applied} · {Math.round(rate * 100)}% off
              <button type="button" aria-label={`Remove code ${applied}`} onClick={() => setApplied(null)}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" /></svg>
              </button>
            </span>
          )}
          <dl className="hb-ki6-rows">
            <div>
              <dt>Subtotal</dt>
              <dd><Num value={subtotal} currency={currency} /></dd>
            </div>
            {discount > 0 && (
              <div className="hb-ki6-good">
                <dt>Discount</dt>
                <dd><Num value={-discount} currency={currency} /></dd>
              </div>
            )}
            <div className={shipping === 0 && items.length > 0 ? "hb-ki6-good" : undefined}>
              <dt>Shipping</dt>
              <dd>{shipping === 0 && items.length > 0 ? "Free" : money(shipping, currency)}</dd>
            </div>
            <div>
              <dt>Estimated tax</dt>
              <dd><Num value={tax} currency={currency} /></dd>
            </div>
          </dl>
          <div className="hb-ki6-total">
            <span>Total</span>
            <b>
              <small>USD</small>
              <Num value={total} currency={currency} />
            </b>
          </div>
          <button
            type="button"
            className="hb-ki6-checkout"
            disabled={items.length === 0}
            onClick={() => onCheckout?.({ items, subtotal, discount, shipping, tax, total, promoCode: applied })}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            {checkoutLabel}
          </button>
          <p className="hb-ki6-note">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 1.5l5 2v4c0 3.2-2.2 5.8-5 7-2.8-1.2-5-3.8-5-7v-4l5-2z" />
            </svg>
            Free returns within 30 days
          </p>
        </aside>
      </div>
    </section>
  );
}

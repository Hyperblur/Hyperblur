"use client";

import * as React from "react";

export interface ReceiptItem {
  name: string;
  detail: string;
  quantity: number;
  price: number;
}

export interface ReceiptStage {
  label: string;
  date: string;
}

export interface ReceiptOrder {
  number: string;
  date: string;
  customer: string;
  email: string;
  payment: string;
  items: ReceiptItem[];
  shipping: number;
  tax: number;
}

export interface CheckoutSuccessReceiptProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  merchant?: string;
  order?: ReceiptOrder;
  stages?: ReceiptStage[];
  currentStage?: number;
  currency?: string;
  continueCta?: { label: string; href: string };
  onDownload?: (orderNumber: string) => void;
  accent?: string;
}

const defaultOrder: ReceiptOrder = {
  number: "NW-20931",
  date: "Nov 4, 2026",
  customer: "Maya Lindqvist",
  email: "maya@studio.co",
  payment: "Visa ending 4242",
  items: [
    { name: "Field Jacket", detail: "Olive, M", quantity: 1, price: 168 },
    { name: "Merino Crew Socks", detail: "Charcoal, 3-pack", quantity: 2, price: 32 },
    { name: "Canvas Weekender", detail: "Sand", quantity: 1, price: 124 },
  ],
  shipping: 12,
  tax: 29.04,
};

const defaultStages: ReceiptStage[] = [
  { label: "Order placed", date: "Today, 10:42" },
  { label: "Packed", date: "Nov 5" },
  { label: "Shipped", date: "Nov 5" },
  { label: "Delivered", date: "Est. Nov 7" },
];

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  return x % 1000;
}

const css = `
.hb-qg6 {
  --hb-qg6-accent: #10b981;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg6 *, .hb-qg6 *::before, .hb-qg6 *::after { box-sizing: border-box; }
.hb-qg6::before { content: ""; position: absolute; left: -10%; top: -30%; width: 60%; height: 90%; z-index: -1; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg6-accent) 18%, transparent), transparent); }
.hb-qg6-inner { max-width: 1120px; margin: 0 auto; padding: clamp(44px, 7cqw, 104px) clamp(16px, 4cqw, 32px); display: grid; gap: 40px; align-items: center; }
@container (min-width: 820px) { .hb-qg6-inner { grid-template-columns: 1fr 420px; gap: 64px; } }
.hb-qg6-mark { position: relative; width: 76px; height: 76px; }
.hb-qg6-mark svg { position: relative; width: 76px; height: 76px; }
.hb-qg6-circ { stroke-dasharray: 214; stroke-dashoffset: 214; animation: hb-qg6-draw .7s cubic-bezier(.6,0,.3,1) forwards; }
.hb-qg6-tick { stroke-dasharray: 40; stroke-dashoffset: 40; animation: hb-qg6-draw .4s .6s ease-out forwards; }
@keyframes hb-qg6-draw { to { stroke-dashoffset: 0; } }
.hb-qg6-fillc { transform-origin: center; transform: scale(0); animation: hb-qg6-grow .45s .55s cubic-bezier(.3,1.4,.5,1) forwards; }
@keyframes hb-qg6-grow { to { transform: scale(1); } }
.hb-qg6-wave { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--hb-qg6-accent); opacity: 0; animation: hb-qg6-wave 1.6s .8s ease-out 2; }
@keyframes hb-qg6-wave { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2); opacity: 0; } }
.hb-qg6-dot { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; margin: -2.5px; border-radius: 50%; background: var(--hb-qg6-accent); opacity: 0; animation: hb-qg6-burst .9s .7s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes hb-qg6-burst { 0% { opacity: 1; transform: rotate(var(--a)) translateY(0); } 100% { opacity: 0; transform: rotate(var(--a)) translateY(var(--d)); } }
.hb-qg6-title { margin: 26px 0 0; font-size: clamp(32px, 5cqw, 52px); letter-spacing: -0.04em; line-height: 1.02; font-weight: 600; }
.hb-qg6-lead { margin: 14px 0 0; font-size: 16px; line-height: 1.6; color: #8f8f8f; max-width: 480px; }
.hb-qg6-lead b { color: #ededed; font-weight: 500; }
.hb-qg6-tl { list-style: none; margin: 32px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); max-width: 520px; }
.hb-qg6-st { position: relative; display: grid; gap: 4px; padding-top: 22px; font-size: 12px; color: #6b6b6b; }
.hb-qg6-st::before { content: ""; position: absolute; top: 6px; left: 14px; right: -2px; height: 2px; background: rgba(255,255,255,.1); }
.hb-qg6-st:last-child::before { display: none; }
.hb-qg6-st::after { content: ""; position: absolute; top: 6px; left: 14px; right: -2px; height: 2px; background: var(--hb-qg6-accent); transform: scaleX(0); transform-origin: left; animation: hb-qg6-line .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: var(--dl); }
.hb-qg6-st[data-state="todo"]::after, .hb-qg6-st[data-state="current"]::after, .hb-qg6-st:last-child::after { display: none; }
@keyframes hb-qg6-line { to { transform: scaleX(1); } }
.hb-qg6-node { position: absolute; top: 0; left: 0; width: 14px; height: 14px; border-radius: 50%; background: #0a0a0a; border: 2px solid rgba(255,255,255,.18); }
.hb-qg6-st[data-state="done"] .hb-qg6-node { background: var(--hb-qg6-accent); border-color: var(--hb-qg6-accent); }
.hb-qg6-st[data-state="current"] .hb-qg6-node { border-color: var(--hb-qg6-accent); box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-qg6-accent) 60%, transparent); animation: hb-qg6-ping 1.8s ease-out infinite; }
@keyframes hb-qg6-ping { 70% { box-shadow: 0 0 0 8px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
.hb-qg6-st b { font-weight: 500; color: #a1a1a1; font-size: 13px; }
.hb-qg6-st[data-state="done"] b, .hb-qg6-st[data-state="current"] b { color: #ededed; }
.hb-qg6-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 34px; }
.hb-qg6-btn { height: 46px; padding: 0 20px; border-radius: 999px; font: inherit; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; text-decoration: none; transition: filter .2s, background .2s, transform .15s; }
.hb-qg6-btn svg { width: 15px; height: 15px; }
.hb-qg6-primary { border: 0; background: #ededed; color: #0a0a0a; }
.hb-qg6-primary:hover { filter: brightness(.92); }
.hb-qg6-ghost { border: 1px solid rgba(255,255,255,.14); background: transparent; color: #ededed; }
.hb-qg6-ghost:hover { background: rgba(255,255,255,.05); }
.hb-qg6-btn:active { transform: translateY(1px); }
.hb-qg6-btn:focus-visible { outline: 2px solid var(--hb-qg6-accent); outline-offset: 3px; }
.hb-qg6-paperwrap { position: relative; justify-self: center; width: 100%; max-width: 420px; }
.hb-qg6-slot { height: 10px; border-radius: 6px; background: #1a1a1a; box-shadow: inset 0 2px 4px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.06); margin: 0 -8px; position: relative; z-index: 2; }
.hb-qg6-clip { overflow: hidden; margin-top: -5px; padding: 0 0 20px; filter: drop-shadow(0 24px 30px rgba(0,0,0,.5)); }
.hb-qg6-paper { position: relative; background: #f4f2ec; color: #1a1a1a; padding: 26px 24px 30px; transform: translateY(-100%); animation: hb-qg6-print 1.4s .3s cubic-bezier(.3,.7,.2,1) forwards; -webkit-mask: radial-gradient(circle 6px at 50% 100%, transparent 5.5px, #000 6px) 0 100% / 16px 12px repeat-x, linear-gradient(#000, #000) 0 0 / 100% calc(100% - 11px) no-repeat; mask: radial-gradient(circle 6px at 50% 100%, transparent 5.5px, #000 6px) 0 100% / 16px 12px repeat-x, linear-gradient(#000, #000) 0 0 / 100% calc(100% - 11px) no-repeat; }
@keyframes hb-qg6-print { to { transform: none; } }
.hb-qg6-rh { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.hb-qg6-rh b { font-size: 15px; letter-spacing: -0.01em; }
.hb-qg6-rh small { display: block; font-size: 11px; color: #6f6c64; margin-top: 2px; }
.hb-qg6-paid { font-size: 10px; font-weight: 700; letter-spacing: .1em; color: var(--hb-qg6-accent); border: 1.5px solid currentColor; border-radius: 6px; padding: 3px 7px; transform: rotate(-6deg); }
.hb-qg6-tear { position: relative; height: 1px; margin: 18px -24px; background-image: linear-gradient(90deg, rgba(0,0,0,.25) 50%, transparent 50%); background-size: 8px 1px; }
.hb-qg6-tear::before, .hb-qg6-tear::after { content: ""; position: absolute; top: -8px; width: 16px; height: 16px; border-radius: 50%; background: #0a0a0a; }
.hb-qg6-tear::before { left: -8px; }
.hb-qg6-tear::after { right: -8px; }
.hb-qg6-items { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 13px; }
.hb-qg6-items li { display: grid; grid-template-columns: 22px 1fr auto; gap: 8px; align-items: baseline; }
.hb-qg6-items em { font-style: normal; font-size: 11px; color: #6f6c64; font-variant-numeric: tabular-nums; }
.hb-qg6-items small { display: block; font-size: 11px; color: #6f6c64; }
.hb-qg6-items span:last-child { font-variant-numeric: tabular-nums; }
.hb-qg6-tot { display: grid; gap: 6px; font-size: 12px; color: #4b4943; font-variant-numeric: tabular-nums; }
.hb-qg6-tot div { display: flex; justify-content: space-between; }
.hb-qg6-tot div[data-big="true"] { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-top: 6px; }
.hb-qg6-meta { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; color: #6f6c64; }
.hb-qg6-meta b { display: block; color: #1a1a1a; font-size: 12px; font-weight: 600; margin-top: 2px; }
.hb-qg6-code { margin-top: 18px; display: flex; align-items: flex-end; gap: 1.5px; height: 36px; }
.hb-qg6-code i { display: block; background: #1a1a1a; height: 100%; }
.hb-qg6-num { font-size: 10px; letter-spacing: .3em; color: #6f6c64; text-align: center; margin-top: 6px; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg6 *, .hb-qg6 *::before, .hb-qg6 *::after { animation: none !important; transition: none !important; }
  .hb-qg6-circ, .hb-qg6-tick { stroke-dashoffset: 0; }
  .hb-qg6-fillc, .hb-qg6-paper, .hb-qg6-st::after { transform: none; }
  .hb-qg6-dot, .hb-qg6-wave { display: none; }
}
`;

export function CheckoutSuccessReceipt({
  title = "Order confirmed",
  merchant = "Northwind Supply",
  order = defaultOrder,
  stages = defaultStages,
  currentStage = 1,
  currency = "USD",
  continueCta = { label: "Continue shopping", href: "#" },
  onDownload,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: CheckoutSuccessReceiptProps) {
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + order.shipping + order.tax;
  const first = order.customer.split(" ")[0];

  const download = () => {
    if (onDownload) {
      onDownload(order.number);
      return;
    }
    const lines = [
      `${merchant} receipt`,
      `Order ${order.number}, ${order.date}`,
      `Billed to ${order.customer} <${order.email}>`,
      "",
      ...order.items.map((i) => `${i.quantity} x ${i.name} (${i.detail})  ${money.format(i.price * i.quantity)}`),
      "",
      `Subtotal  ${money.format(subtotal)}`,
      `Shipping  ${money.format(order.shipping)}`,
      `Tax  ${money.format(order.tax)}`,
      `Total  ${money.format(total)}`,
      `Paid with ${order.payment}`,
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${order.number}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const bars = Array.from({ length: 46 }, (_, i) => 1 + (hash(i) % 3));
  const dots = Array.from({ length: 10 }, (_, i) => ({ a: i * 36 + (hash(i) % 14), d: 44 + (hash(i + 20) % 22) }));
  const vars = { "--hb-qg6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg6 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-success-receipt" precedence="default">{css}</style>
      <div className="hb-qg6-inner">
        <div>
          <div className="hb-qg6-mark" aria-hidden="true">
            <span className="hb-qg6-wave" />
            {dots.map((d, i) => (
              <span key={i} className="hb-qg6-dot" style={{ "--a": `${d.a}deg`, "--d": `-${d.d}px` } as React.CSSProperties} />
            ))}
            <svg viewBox="0 0 76 76" fill="none">
              <circle className="hb-qg6-fillc" cx="38" cy="38" r="34" fill="color-mix(in srgb, var(--hb-qg6-accent) 16%, transparent)" />
              <circle className="hb-qg6-circ" cx="38" cy="38" r="34" stroke="var(--hb-qg6-accent)" strokeWidth="3" strokeLinecap="round" transform="rotate(-90 38 38)" />
              <path className="hb-qg6-tick" d="M25 39.5l9 9L52 30" stroke="var(--hb-qg6-accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="hb-qg6-title">{title}</h2>
          <p className="hb-qg6-lead">
            Thanks, {first}. Order <b>{order.number}</b> is being packed. We sent the receipt to <b>{order.email}</b> and will text you when it ships.
          </p>
          <ol className="hb-qg6-tl" aria-label="Delivery progress">
            {stages.map((s, i) => {
              const state = i < currentStage ? "done" : i === currentStage ? "current" : "todo";
              return (
                <li key={s.label} className="hb-qg6-st" data-state={state} style={{ "--dl": `${(1.1 + i * 0.25).toFixed(2)}s` } as React.CSSProperties} aria-current={state === "current" ? "step" : undefined}>
                  <span className="hb-qg6-node" aria-hidden="true" />
                  <b>{s.label}</b>
                  <span>{s.date}</span>
                </li>
              );
            })}
          </ol>
          <div className="hb-qg6-actions">
            <button type="button" className="hb-qg6-btn hb-qg6-primary" onClick={download}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Download receipt
            </button>
            <a className="hb-qg6-btn hb-qg6-ghost" href={continueCta.href}>
              {continueCta.label}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
        <div className="hb-qg6-paperwrap">
          <div className="hb-qg6-slot" aria-hidden="true" />
          <div className="hb-qg6-clip">
            <article className="hb-qg6-paper" aria-label={`Receipt for order ${order.number}`}>
              <div className="hb-qg6-rh">
                <div>
                  <b>{merchant}</b>
                  <small>Receipt {order.number}</small>
                  <small>{order.date}</small>
                </div>
                <span className="hb-qg6-paid">PAID</span>
              </div>
              <div className="hb-qg6-tear" aria-hidden="true" />
              <ul className="hb-qg6-items">
                {order.items.map((it) => (
                  <li key={it.name}>
                    <em>{it.quantity}x</em>
                    <span>{it.name}<small>{it.detail}</small></span>
                    <span>{money.format(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="hb-qg6-tear" aria-hidden="true" />
              <div className="hb-qg6-tot">
                <div><span>Subtotal</span><span>{money.format(subtotal)}</span></div>
                <div><span>Shipping</span><span>{money.format(order.shipping)}</span></div>
                <div><span>Tax</span><span>{money.format(order.tax)}</span></div>
                <div data-big="true"><span>Total</span><span>{money.format(total)}</span></div>
              </div>
              <div className="hb-qg6-meta">
                <div>Billed to<b>{order.customer}</b></div>
                <div>Payment<b>{order.payment}</b></div>
              </div>
              <div className="hb-qg6-code" aria-hidden="true">
                {bars.map((w, i) => <i key={i} style={{ width: `${w}px`, opacity: i % 7 === 3 ? 0 : 1 }} />)}
              </div>
              <div className="hb-qg6-num" aria-hidden="true">{order.number.replace(/\D/g, "").padEnd(12, "0")}</div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

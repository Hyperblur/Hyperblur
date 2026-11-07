"use client";

import * as React from "react";

export type ReceiptPaper = "80mm" | "58mm";

export interface ReceiptLine {
  name: string;
  price: number;
  quantity?: number;
  options?: string[];
  note?: string;
}

export interface ReceiptAdjustment {
  label: string;
  amount: number;
}

export interface ReceiptCustomer {
  name: string;
  phone?: string;
  address?: string;
}

export interface ReceiptLabels {
  print: string;
  paper: string;
  order: string;
  date: string;
  type: string;
  customer: string;
  phone: string;
  address: string;
  item: string;
  amount: string;
  subtotal: string;
  total: string;
  payment: string;
  note: string;
  scan: string;
}

export interface Receipt80mmProps extends React.HTMLAttributes<HTMLDivElement> {
  storeName?: string;
  storeLines?: string[];
  orderNumber?: string | number;
  date?: string;
  type?: string;
  customer?: ReceiptCustomer | null;
  items?: ReceiptLine[];
  adjustments?: ReceiptAdjustment[];
  total?: number;
  payment?: string;
  paymentNote?: string;
  note?: string;
  footer?: string;
  qrValue?: string;
  showQr?: boolean;
  paper?: ReceiptPaper;
  currency?: string;
  locale?: string;
  labels?: Partial<ReceiptLabels>;
  showToolbar?: boolean;
  showPrinter?: boolean;
  animateIn?: boolean;
  onPrint?: () => void;
  accent?: string;
}

const defaultLabels: ReceiptLabels = {
  print: "Print receipt",
  paper: "{paper} thermal",
  order: "Order",
  date: "Date",
  type: "Type",
  customer: "Customer",
  phone: "Phone",
  address: "Address",
  item: "Item",
  amount: "Amount",
  subtotal: "Subtotal",
  total: "Total",
  payment: "Payment",
  note: "Note",
  scan: "Scan to track your order",
};

const sampleItems: ReceiptLine[] = [
  { name: "Smash Double", quantity: 2, price: 11.5, options: ["Medium well", "Add bacon +2.00"], note: "No onions" },
  { name: "Crinkle Fries", quantity: 1, price: 4.25, options: ["Large"] },
  { name: "Vanilla Shake", quantity: 1, price: 5.75 },
  { name: "Garlic Aioli", quantity: 2, price: 0.75 },
];

const css = `
.hb-oc2 {
  --hb-oc2-accent: #2f7bff;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-oc2 *, .hb-oc2 *::before, .hb-oc2 *::after { box-sizing: border-box; }
.hb-oc2-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  max-width: 360px;
  margin-bottom: 14px;
}
.hb-oc2-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #141414;
  color: #a1a1a1;
  font-size: 12px;
  white-space: nowrap;
}
.hb-oc2-chip svg, .hb-oc2-print svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc2-print {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--hb-oc2-accent);
  color: #ffffff;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: filter 0.16s ease, transform 0.12s ease;
}
.hb-oc2-print:hover { filter: brightness(1.1); }
.hb-oc2-print:active { transform: scale(0.97); }
.hb-oc2-print:focus-visible { outline: 2px solid var(--hb-oc2-accent); outline-offset: 3px; }
.hb-oc2-device { display: flex; flex-direction: column; align-items: center; width: 100%; }
.hb-oc2-slot {
  position: relative;
  z-index: 2;
  width: min(100%, calc(var(--hb-oc2-w) + 36px));
  height: 22px;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: linear-gradient(180deg, #2a2a2a, #161616);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 10px 24px -10px rgba(0, 0, 0, 0.9);
}
.hb-oc2-slot::after {
  content: "";
  position: absolute;
  right: 16px;
  bottom: 5px;
  left: 16px;
  height: 3px;
  border-radius: 3px;
  background: #050505;
}
.hb-oc2-slot i {
  position: absolute;
  top: 6px;
  left: 12px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #3ccf91;
  box-shadow: 0 0 6px #3ccf91;
  font-style: normal;
}
.hb-oc2-feed {
  width: 100%;
  max-width: var(--hb-oc2-w);
  margin-top: -9px;
  padding: 0 0 14px;
  overflow: hidden;
}
.hb-oc2-paper {
  position: relative;
  width: 100%;
  padding: 22px 14px 26px;
  background: #fbfaf6;
  color: #151515;
  font-family: var(--font-mono, ui-monospace), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04), 0 14px 30px -14px rgba(0, 0, 0, 0.7);
  -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 10px 100%;
  mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 10px 100%;
}
.hb-oc2-paper[data-paper="58mm"] { padding: 20px 10px 24px; font-size: 10.5px; }
.hb-oc2-paper[data-feed="true"] { animation: hb-oc2-out 1.9s cubic-bezier(0.45, 0.05, 0.25, 1) both; }
@keyframes hb-oc2-out {
  0% { transform: translateY(-100%); }
  12% { transform: translateY(-86%); }
  24% { transform: translateY(-86%); }
  100% { transform: translateY(0); }
}
.hb-oc2-paper p { margin: 0; }
.hb-oc2-c { text-align: center; }
.hb-oc2-store { font-size: 1.3em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-oc2-sub { color: #4a4a4a; font-size: 0.92em; }
.hb-oc2-rule { height: 0; margin: 10px 0; border: 0; border-top: 1.5px dashed #9a9a9a; }
.hb-oc2-rule[data-double="true"] { height: 4px; border-top: 1.5px solid #151515; border-bottom: 1.5px solid #151515; }
.hb-oc2-num { margin: 2px 0 4px; font-size: 1.6em; font-weight: 700; letter-spacing: 0.02em; }
.hb-oc2-kv { display: flex; justify-content: space-between; gap: 10px; }
.hb-oc2-kv span:first-child { flex: none; color: #4a4a4a; }
.hb-oc2-kv span:last-child { min-width: 0; text-align: right; overflow-wrap: anywhere; }
.hb-oc2-head { display: flex; gap: 6px; color: #4a4a4a; font-size: 0.88em; text-transform: uppercase; letter-spacing: 0.06em; }
.hb-oc2-head span:last-child, .hb-oc2-line b { margin-left: auto; }
.hb-oc2-line { display: flex; align-items: baseline; gap: 6px; margin-top: 5px; }
.hb-oc2-line span:first-child { flex: none; min-width: 2.4em; font-weight: 700; }
.hb-oc2-line span:nth-child(2) { min-width: 0; overflow-wrap: anywhere; }
.hb-oc2-line b { flex: none; font-weight: 700; white-space: nowrap; }
.hb-oc2-opt { padding-left: 3em; color: #3d3d3d; font-size: 0.94em; }
.hb-oc2-opt::before { content: "+ "; }
.hb-oc2-opt[data-note="true"]::before { content: "> "; }
.hb-oc2-opt[data-note="true"] { font-weight: 700; color: #151515; }
.hb-oc2-tot { margin-top: 3px; font-size: 1.35em; font-weight: 700; }
.hb-oc2-box { margin-top: 10px; padding: 7px 8px; border: 1.5px solid #151515; }
.hb-oc2-box strong { display: block; font-size: 0.88em; letter-spacing: 0.06em; text-transform: uppercase; }
.hb-oc2-qr { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 12px; }
.hb-oc2-qr svg { width: 74px; height: 74px; shape-rendering: crispEdges; }
.hb-oc2-foot { margin-top: 10px; font-weight: 700; }
.hb-oc2-print-root { display: none; }
@media print {
  html.hb-oc2-printing body > *:not(.hb-oc2-print-root) { display: none !important; }
  html.hb-oc2-printing, html.hb-oc2-printing body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
  html.hb-oc2-printing .hb-oc2-print-root { display: block; width: 100%; }
  .hb-oc2-print-root .hb-oc2-paper {
    width: 100% !important;
    padding: 4mm 3mm 6mm;
    background: #ffffff;
    color: #000000;
    box-shadow: none;
    animation: none !important;
    transform: none !important;
    -webkit-mask: none;
    mask: none;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hb-oc2 *, .hb-oc2 *::before, .hb-oc2 *::after { animation: none !important; transition: none !important; }
}
`;

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

function seedOf(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function qrPath(value: string) {
  const size = 21;
  const seed = seedOf(value);
  const finder = (x: number, y: number) => {
    const corners = [[0, 0], [size - 7, 0], [0, size - 7]];
    for (const [cx, cy] of corners) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return edge || core ? 1 : 0;
      }
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return 0;
    }
    return -1;
  };
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const f = finder(x, y);
      let on = f === 1;
      if (f === -1) {
        if (y === 6 || x === 6) on = (x + y) % 2 === 0;
        else {
          let h = Math.imul(seed ^ (y * size + x + 1), 2654435761) >>> 0;
          h ^= h >>> 15;
          h = Math.imul(h, 2246822519) >>> 0;
          h ^= h >>> 13;
          on = (h & 7) < 4;
        }
      }
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

export function printReceipt(element: HTMLElement | null, paper: ReceiptPaper = "80mm") {
  if (!element || typeof window === "undefined") return;
  const root = document.createElement("div");
  root.className = "hb-oc2-print-root";
  const clone = element.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-feed");
  root.appendChild(clone);
  document.body.appendChild(root);
  const page = document.createElement("style");
  page.textContent = `@page { size: ${paper} auto; margin: 0; }`;
  document.head.appendChild(page);
  document.documentElement.classList.add("hb-oc2-printing");
  let cleaned = false;
  let fallback = 0;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    window.clearTimeout(fallback);
    window.removeEventListener("afterprint", cleanup);
    document.documentElement.classList.remove("hb-oc2-printing");
    root.remove();
    page.remove();
  };
  window.addEventListener("afterprint", cleanup);
  fallback = window.setTimeout(cleanup, 60000);
  window.print();
}

export function Receipt80mm({
  storeName = "Corner Kitchen",
  storeLines = ["214 Bedford Ave, Brooklyn, NY 11249", "(718) 555-0199"],
  orderNumber = 1048,
  date = "Nov 5, 2026 · 7:42 PM",
  type = "Delivery",
  customer = { name: "Maya Thompson", phone: "(347) 555-0123", address: "88 N 6th St, Apt 4B" },
  items = sampleItems,
  adjustments = [
    { label: "Delivery fee", amount: 3.5 },
    { label: "Coupon WELCOME5", amount: -5 },
  ],
  total,
  payment = "Card on delivery",
  paymentNote = "Bring the card machine",
  note = "Ring twice, side door on 6th St.",
  footer = "Thank you! See you soon.",
  qrValue,
  showQr = true,
  paper = "80mm",
  currency = "USD",
  locale = "en-US",
  labels,
  showToolbar = true,
  showPrinter = true,
  animateIn = true,
  onPrint,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: Receipt80mmProps) {
  const t = { ...defaultLabels, ...labels };
  const paperRef = React.useRef<HTMLDivElement>(null);
  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const subtotal = items.reduce((sum, it) => sum + it.price * (it.quantity ?? 1), 0);
  const grand = total ?? subtotal + adjustments.reduce((sum, a) => sum + a.amount, 0);
  const path = React.useMemo(() => qrPath(qrValue ?? `${storeName}-${orderNumber}`), [qrValue, storeName, orderNumber]);
  const width = paper === "58mm" ? "58mm" : "80mm";

  const handlePrint = () => {
    onPrint?.();
    printReceipt(paperRef.current, paper);
  };

  return (
    <div className={["hb-oc2", className].filter(Boolean).join(" ")} style={{ "--hb-oc2-accent": accent, "--hb-oc2-w": width, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-receipt-80mm" precedence="default">{css}</style>
      {showToolbar && (
        <div className="hb-oc2-bar">
          <span className="hb-oc2-chip">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21zM9 8h6M9 12h6M9 16h3" />
            </svg>
            {fill(t.paper, { paper: width.replace("mm", " mm") })}
          </span>
          <button type="button" className="hb-oc2-print" onClick={handlePrint}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />
            </svg>
            {t.print}
          </button>
        </div>
      )}
      <div className="hb-oc2-device">
        {showPrinter && (
          <div className="hb-oc2-slot" aria-hidden="true">
            <i />
          </div>
        )}
        <div className="hb-oc2-feed" style={showPrinter ? undefined : { marginTop: 0 }}>
          <div ref={paperRef} className="hb-oc2-paper" data-paper={paper} data-feed={animateIn ? "true" : undefined} role="document" aria-label={`${t.order} #${orderNumber}`}>
            <p className="hb-oc2-c hb-oc2-store">{storeName}</p>
            {storeLines.map((line) => (
              <p key={line} className="hb-oc2-c hb-oc2-sub">
                {line}
              </p>
            ))}
            <hr className="hb-oc2-rule" />
            <p className="hb-oc2-c hb-oc2-sub">{t.order}</p>
            <p className="hb-oc2-c hb-oc2-num">#{orderNumber}</p>
            <p className="hb-oc2-kv">
              <span>{t.date}</span>
              <span>{date}</span>
            </p>
            <p className="hb-oc2-kv">
              <span>{t.type}</span>
              <span>{type}</span>
            </p>
            {customer && (
              <>
                <hr className="hb-oc2-rule" />
                <p className="hb-oc2-kv">
                  <span>{t.customer}</span>
                  <span>{customer.name}</span>
                </p>
                {customer.phone && (
                  <p className="hb-oc2-kv">
                    <span>{t.phone}</span>
                    <span>{customer.phone}</span>
                  </p>
                )}
                {customer.address && (
                  <p className="hb-oc2-kv">
                    <span>{t.address}</span>
                    <span>{customer.address}</span>
                  </p>
                )}
              </>
            )}
            <hr className="hb-oc2-rule" />
            <p className="hb-oc2-head">
              <span>{t.item}</span>
              <span>{t.amount}</span>
            </p>
            {items.map((it, i) => (
              <React.Fragment key={`${it.name}-${i}`}>
                <p className="hb-oc2-line">
                  <span>{it.quantity ?? 1}x</span>
                  <span>{it.name}</span>
                  <b>{money.format(it.price * (it.quantity ?? 1))}</b>
                </p>
                {it.options?.map((opt) => (
                  <p key={opt} className="hb-oc2-opt">
                    {opt}
                  </p>
                ))}
                {it.note && (
                  <p className="hb-oc2-opt" data-note="true">
                    {it.note}
                  </p>
                )}
              </React.Fragment>
            ))}
            <hr className="hb-oc2-rule" />
            <p className="hb-oc2-kv">
              <span>{t.subtotal}</span>
              <span>{money.format(subtotal)}</span>
            </p>
            {adjustments.map((a) => (
              <p key={a.label} className="hb-oc2-kv">
                <span>{a.label}</span>
                <span>{money.format(a.amount)}</span>
              </p>
            ))}
            <hr className="hb-oc2-rule" data-double="true" />
            <p className="hb-oc2-kv hb-oc2-tot">
              <span>{t.total}</span>
              <span>{money.format(grand)}</span>
            </p>
            {payment && (
              <p className="hb-oc2-kv">
                <span>{t.payment}</span>
                <span>{payment}</span>
              </p>
            )}
            {paymentNote && <p className="hb-oc2-opt" data-note="true">{paymentNote}</p>}
            {note && (
              <div className="hb-oc2-box">
                <strong>{t.note}</strong>
                {note}
              </div>
            )}
            {showQr && (
              <div className="hb-oc2-qr">
                <svg viewBox="-1 -1 23 23" aria-hidden="true">
                  <rect x="-1" y="-1" width="23" height="23" fill="#fbfaf6" />
                  <path d={path} fill="#151515" />
                </svg>
                <p className="hb-oc2-c hb-oc2-sub">{t.scan}</p>
              </div>
            )}
            {footer && <p className="hb-oc2-c hb-oc2-foot">{footer}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

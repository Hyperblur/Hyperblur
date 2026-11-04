"use client";

import * as React from "react";

export type PayInvoiceStatus = "paid" | "due" | "overdue";

export interface PayInvoiceLine {
  name: string;
  quantity?: number;
  price: number;
}

export interface PayInvoiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  status?: PayInvoiceStatus;
  billedTo?: string;
  dueDate?: string;
  paidDate?: string;
  items?: PayInvoiceLine[];
  currency?: string;
  onDownload?: () => void;
  onPay?: () => void;
  downloadLabel?: string;
  payLabel?: string;
  accent?: string;
}

const defaultItems: PayInvoiceLine[] = [
  { name: "Brand identity sprint", quantity: 1, price: 240000 },
  { name: "Illustration set", quantity: 6, price: 18000 },
  { name: "Hosting, 12 months", quantity: 1, price: 14400 },
];

const css = `
.hb-qfb {
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}
.hb-qfb *, .hb-qfb *::before, .hb-qfb *::after { box-sizing: border-box; }
.hb-qfb-sheet {
  position: relative;
  padding: 12px 14px 18px;
  background: linear-gradient(180deg, #151515, #111111);
  border-radius: 14px;
  box-shadow: 0 0 0 1px #262626 inset;
  -webkit-mask: radial-gradient(circle at 50% 100%, transparent 5px, #000 5.5px) 0 0 / 16px 100% repeat-x;
  mask: radial-gradient(circle at 50% 100%, transparent 5px, #000 5.5px) 0 0 / 16px 100% repeat-x;
}
.hb-qfb-hd { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-qfb-hd > div { display: flex; align-items: baseline; gap: 8px; }
.hb-qfb-lab { display: inline; color: #8f8f8f; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-qfb-no { display: inline; font-size: 16px; font-weight: 650; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.hb-qfb-pill {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  padding: 3px 10px 3px 8px;
  color: var(--hb-qfb-s);
  font-size: 12px;
  font-weight: 600;
  background: color-mix(in srgb, var(--hb-qfb-s) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-qfb-s) 32%, transparent);
  border-radius: 999px;
}
.hb-qfb-pill i { width: 6px; height: 6px; background: var(--hb-qfb-s); border-radius: 50%; }
.hb-qfb[data-status="overdue"] .hb-qfb-pill i { animation: hb-qfb-beat 1.6s ease-in-out infinite; }
.hb-qfb[data-status="paid"] { --hb-qfb-s: #3ddc97; }
.hb-qfb[data-status="due"] { --hb-qfb-s: #ffb340; }
.hb-qfb[data-status="overdue"] { --hb-qfb-s: #ff5d6c; }
.hb-qfb-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-qfb-sub b { color: #cfcfcf; font-weight: 500; }
.hb-qfb-items { display: flex; flex-direction: column; gap: 2px; margin: 8px 0 0; padding: 0; list-style: none; }
.hb-qfb-it { display: flex; align-items: baseline; gap: 8px; min-height: 20px; animation: hb-qfb-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--i) * 70ms); }
.hb-qfb-nm { overflow: hidden; min-width: 0; flex: 1; text-overflow: ellipsis; white-space: nowrap; }
.hb-qfb-q { flex: none; color: #6f6f6f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-qfb-am { flex: none; min-width: 64px; font-variant-numeric: tabular-nums; text-align: right; }
.hb-qfb-tear { height: 0; margin: 8px 0 6px; border-top: 1.5px dashed #333333; }
.hb-qfb-tot { display: flex; align-items: baseline; justify-content: space-between; margin: 0; }
.hb-qfb-tot span { color: #a1a1a1; }
.hb-qfb-tot b { font-size: 20px; font-weight: 650; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-qfb-acts { display: flex; gap: 8px; margin-top: 10px; }
.hb-qfb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 32px;
  margin: 0;
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border-radius: 9px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-qfb-btn:hover { transform: translateY(-1px); }
.hb-qfb-btn:active { transform: scale(0.97); }
.hb-qfb-btn:focus-visible { outline: 2px solid var(--hb-qfb-x); outline-offset: 2px; }
.hb-qfb-btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-qfb-dl { flex: 1; color: #ededed; background: transparent; border: 1px solid #333333; }
.hb-qfb-dl:hover { background: #1c1c1c; border-color: #4a4a4a; }
.hb-qfb-pay { flex: 1.3; color: #fff; background: var(--hb-qfb-x); background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0)); border: 0; }
.hb-qfb[data-status="overdue"] .hb-qfb-pay { background-color: #e5384a; }
@keyframes hb-qfb-beat { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.5); } }
@keyframes hb-qfb-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qfb-it, .hb-qfb[data-status="overdue"] .hb-qfb-pill i { animation: none; }
  .hb-qfb-btn { transition: none; }
}
`;

const statusLabel: Record<PayInvoiceStatus, string> = { paid: "Paid", due: "Due", overdue: "Overdue" };

function money(cents: number, currency: string) {
  const whole = Math.floor(cents / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currency}${whole}.${(cents % 100).toString().padStart(2, "0")}`;
}

export function PayInvoiceCard({
  number = "INV-2041",
  status = "due",
  billedTo = "Orchard Studio",
  dueDate = "Nov 11, 2026",
  paidDate = "Nov 2, 2026",
  items = defaultItems,
  currency = "$",
  onDownload,
  onPay,
  downloadLabel = "Download PDF",
  payLabel = "Pay now",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayInvoiceCardProps) {
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  const vars = { "--hb-qfb-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qfb ${className}`} style={vars} data-status={status} {...rest}>
      <style href="hb-pay-invoice-card" precedence="default">{css}</style>
      <div className="hb-qfb-sheet">
        <div className="hb-qfb-hd">
          <div>
            <span className="hb-qfb-lab">Invoice</span>
            <span className="hb-qfb-no">{number}</span>
          </div>
          <span className="hb-qfb-pill">
            <i aria-hidden="true" />
            {statusLabel[status]}
          </span>
        </div>
        <p className="hb-qfb-sub">
          Billed to <b>{billedTo}</b> &middot; {status === "paid" ? `Paid ${paidDate}` : `${status === "overdue" ? "Was due" : "Due"} ${dueDate}`}
        </p>
        <ul className="hb-qfb-items">
          {items.map((item, i) => (
            <li key={item.name} className="hb-qfb-it" style={{ "--i": i } as React.CSSProperties}>
              <span className="hb-qfb-nm">{item.name}</span>
              {(item.quantity ?? 1) > 1 && <span className="hb-qfb-q">x{item.quantity}</span>}
              <span className="hb-qfb-am">{money(item.price * (item.quantity ?? 1), currency)}</span>
            </li>
          ))}
        </ul>
        <div className="hb-qfb-tear" aria-hidden="true" />
        <p className="hb-qfb-tot">
          <span>{status === "paid" ? "Total paid" : "Amount due"}</span>
          <b>{money(total, currency)}</b>
        </p>
        <div className="hb-qfb-acts">
          <button type="button" className="hb-qfb-btn hb-qfb-dl" onClick={onDownload}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 19.5h14" />
            </svg>
            {downloadLabel}
          </button>
          {status !== "paid" && (
            <button type="button" className="hb-qfb-btn hb-qfb-pay" onClick={onPay}>
              {payLabel} {money(total, currency)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

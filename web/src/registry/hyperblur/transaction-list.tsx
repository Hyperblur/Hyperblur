"use client";

import * as React from "react";

export type TransactionStatus = "pending" | "posted";

export interface Transaction {
  id: string;
  day: string;
  merchant: string;
  category: string;
  time: string;
  amount: number;
  status?: TransactionStatus;
  reference?: string;
  account?: string;
}

export const defaultTransactions: Transaction[] = [
  { id: "t1", day: "Today", merchant: "Blue Bottle Coffee", category: "Dining", time: "8:42 AM", amount: -6.5, reference: "TXN-84F2-19C7", account: "Visa 4821" },
  { id: "t2", day: "Today", merchant: "Stripe Payout", category: "Income", time: "7:15 AM", amount: 3240, reference: "PO-5521-A0E3", account: "Checking 0917" },
  { id: "t3", day: "Today", merchant: "Spotify", category: "Subscriptions", time: "6:03 AM", amount: -11.99, status: "pending", reference: "TXN-71B0-44D8", account: "Visa 4821" },
  { id: "t4", day: "Yesterday", merchant: "Whole Foods", category: "Groceries", time: "6:20 PM", amount: -84.37, reference: "TXN-62A9-0B15", account: "Visa 4821" },
  { id: "t5", day: "Yesterday", merchant: "Uber", category: "Transport", time: "11:05 PM", amount: -23.1, reference: "TXN-5D18-77AE", account: "Visa 4821" },
  { id: "t6", day: "Yesterday", merchant: "Figma", category: "Software", time: "9:00 AM", amount: -15, reference: "TXN-4C03-91F6", account: "Visa 4821" },
  { id: "t7", day: "Oct 28", merchant: "Delta Air Lines", category: "Travel", time: "2:48 PM", amount: -412.8, reference: "TXN-3B77-C2D0", account: "Amex 1009" },
  { id: "t8", day: "Oct 28", merchant: "Refund: Apple", category: "Income", time: "10:12 AM", amount: 129, reference: "RF-2A64-8E51", account: "Visa 4821" },
];

export interface TransactionListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  transactions?: Transaction[];
  currency?: string;
  maxHeight?: number;
  surface?: string;
  accent?: string;
  defaultExpanded?: string;
  onCopy?: (transaction: Transaction) => void;
}

const css = `
.hb-trx {
  --hb-trx-accent: #2f7bff;
  --hb-trx-bg: #111111;
  container-type: inline-size;
  width: 100%;
  min-width: 0;
  max-height: var(--hb-trx-h, 360px);
  overflow-y: auto;
  overscroll-behavior: contain;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
}
.hb-trx *, .hb-trx *::before, .hb-trx *::after { box-sizing: border-box; font-family: inherit; }
.hb-trx-group { margin: 0; padding: 0; list-style: none; }
.hb-trx-day {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px 6px;
  background: var(--hb-trx-bg);
  border-bottom: 1px solid #1f1f1f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-trx-net { font-weight: 400; letter-spacing: 0; text-transform: none; font-variant-numeric: tabular-nums; color: #6b6b6b; }
.hb-trx-items { margin: 0; padding: 2px 0; list-style: none; }
.hb-trx-item { position: relative; border-radius: 10px; animation: hb-trx-in .36s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-trx-i, 0) * 40ms); }
.hb-trx-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease;
}
.hb-trx-row:hover { background: rgba(255, 255, 255, .045); }
.hb-trx-item[data-open="true"] .hb-trx-row { background: color-mix(in srgb, var(--hb-trx-accent) 11%, transparent); }
.hb-trx-row:focus-visible, .hb-trx-copy:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--hb-trx-accent) 80%, transparent);
  outline-offset: -2px;
}
.hb-trx-tile {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--hb-trx-bg1);
  border: 1px solid var(--hb-trx-bd);
  color: var(--hb-trx-fg);
  font-size: 13px;
  font-weight: 600;
}
.hb-trx-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.hb-trx-merchant { display: flex; align-items: center; gap: 6px; min-width: 0; font-weight: 500; }
.hb-trx-merchant-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-trx-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: #8f8f8f; }
.hb-trx-chip {
  flex: none;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  color: #f5a524;
  background: rgba(245, 165, 36, .14);
  border: 1px solid rgba(245, 165, 36, .3);
}
.hb-trx-amount { flex: none; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-trx-amount[data-income="true"] { color: #3ecf8e; }
.hb-trx-drawer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .3s cubic-bezier(.2, .8, .2, 1);
}
.hb-trx-item[data-open="true"] .hb-trx-drawer { grid-template-rows: 1fr; }
.hb-trx-drawer-in { min-height: 0; overflow: hidden; }
.hb-trx-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 2px 10px 6px 52px;
  padding: 8px 10px;
  border: 1px solid #222222;
  border-radius: 9px;
  background: #0d0d0d;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity .25s ease .05s, transform .25s ease .05s;
}
.hb-trx-item[data-open="true"] .hb-trx-detail { opacity: 1; transform: none; }
.hb-trx-field { min-width: 0; display: flex; flex-direction: column; }
.hb-trx-label { font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: #6b6b6b; }
.hb-trx-ref {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  color: #ededed;
}
.hb-trx-copy {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 9px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #171717;
  color: #ededed;
  font-size: 12px;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease, color .15s ease;
}
.hb-trx-copy svg { width: 12px; height: 12px; }
.hb-trx-copy:hover { background: #1f1f1f; border-color: #3a3a3a; }
.hb-trx-copy[data-copied="true"] { color: #3ecf8e; border-color: rgba(62, 207, 142, .4); }
.hb-trx-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 300px) {
  .hb-trx-detail { margin-left: 10px; }
  .hb-trx-tile { display: none; }
}
@keyframes hb-trx-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-trx-item { animation: none !important; }
  .hb-trx-row, .hb-trx-drawer, .hb-trx-detail, .hb-trx-copy { transition: none !important; }
}
`;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  return h;
}

function glyphOf(merchant: string) {
  const colon = merchant.indexOf(":");
  const clean = (colon >= 0 ? merchant.slice(colon + 1) : merchant).trim();
  return (clean[0] ?? "?").toUpperCase();
}

export function TransactionList({
  transactions = defaultTransactions,
  currency = "USD",
  maxHeight = 360,
  surface = "#111111",
  accent = "#2f7bff",
  defaultExpanded,
  onCopy,
  className = "",
  style,
  ...rest
}: TransactionListProps) {
  const [openId, setOpenId] = React.useState<string | null>(defaultExpanded ?? null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency });
  const format = (value: number) => `${value < 0 ? "−" : value > 0 ? "+" : ""}${money.format(Math.abs(value))}`;

  const groups: { day: string; items: Transaction[] }[] = [];
  for (const tx of transactions) {
    const last = groups[groups.length - 1];
    const existing = last && last.day === tx.day ? last : groups.find((g) => g.day === tx.day);
    if (existing) existing.items.push(tx);
    else groups.push({ day: tx.day, items: [tx] });
  }

  const copy = async (tx: Transaction) => {
    const text = tx.reference ?? tx.id;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        return;
      } finally {
        document.body.removeChild(area);
      }
    }
    setCopiedId(tx.id);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), 1600);
    onCopy?.(tx);
  };

  const vars = {
    "--hb-trx-accent": accent,
    "--hb-trx-bg": surface,
    "--hb-trx-h": `${maxHeight}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-trx ${className}`} style={vars} {...rest}>
      <style href="hb-transaction-list" precedence="default">{css}</style>
      <span className="hb-trx-sr" role="status" aria-live="polite">
        {copiedId ? "Reference copied" : ""}
      </span>
      {groups.map((group) => {
        const net = group.items.reduce((sum, t) => sum + t.amount, 0);
        return (
          <section key={group.day} className="hb-trx-group" aria-label={group.day}>
            <h3 className="hb-trx-day" style={{ margin: 0 }}>
              <span>{group.day}</span>
              <span className="hb-trx-net">{format(net)}</span>
            </h3>
            <ul className="hb-trx-items">
              {group.items.map((tx) => {
                const open = openId === tx.id;
                const hue = hash(tx.merchant) % 360;
                const tile = {
                  "--hb-trx-bg1": `hsl(${hue} 38% 17%)`,
                  "--hb-trx-bd": `hsl(${hue} 38% 26%)`,
                  "--hb-trx-fg": `hsl(${hue} 75% 78%)`,
                  "--hb-trx-i": transactions.indexOf(tx),
                } as React.CSSProperties;
                const drawerId = `hb-trx-d-${tx.id}`;
                return (
                  <li key={tx.id} className="hb-trx-item" data-open={open} style={tile}>
                    <button
                      type="button"
                      className="hb-trx-row"
                      aria-expanded={open}
                      aria-controls={drawerId}
                      onClick={() => setOpenId(open ? null : tx.id)}
                    >
                      <span className="hb-trx-tile" aria-hidden="true">
                        {glyphOf(tx.merchant)}
                      </span>
                      <span className="hb-trx-main">
                        <span className="hb-trx-merchant">
                          <span className="hb-trx-merchant-text">{tx.merchant}</span>
                          {tx.status === "pending" && <span className="hb-trx-chip">Pending</span>}
                        </span>
                        <span className="hb-trx-sub">{`${tx.category} · ${tx.time}`}</span>
                      </span>
                      <span className="hb-trx-amount" data-income={tx.amount > 0}>
                        {format(tx.amount)}
                      </span>
                    </button>
                    <div className="hb-trx-drawer" id={drawerId} role="region" aria-label={`${tx.merchant} details`} inert={!open}>
                      <div className="hb-trx-drawer-in">
                        <div className="hb-trx-detail">
                          <span className="hb-trx-field">
                            <span className="hb-trx-label">Reference</span>
                            <span className="hb-trx-ref">{tx.reference ?? tx.id}</span>
                          </span>
                          {tx.account && (
                            <span className="hb-trx-field">
                              <span className="hb-trx-label">Account</span>
                              <span className="hb-trx-ref">{tx.account}</span>
                            </span>
                          )}
                          <button type="button" className="hb-trx-copy" data-copied={copiedId === tx.id} onClick={() => copy(tx)}>
                            {copiedId === tx.id ? (
                              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2.4 6.4l2.3 2.3 4.9-5" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
                                <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" />
                                <path d="M8 4V2.9A1.4 1.4 0 0 0 6.6 1.5H2.9A1.4 1.4 0 0 0 1.5 2.9v3.7A1.4 1.4 0 0 0 2.9 8H4" />
                              </svg>
                            )}
                            {copiedId === tx.id ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

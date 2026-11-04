"use client";

import * as React from "react";

export type InvoiceStatus = "paid" | "open" | "failed" | "refunded";

export interface InvoiceRow {
  id: string;
  date: string;
  year: number;
  description: string;
  amount: number;
  status: InvoiceStatus;
}

export interface UpcomingInvoice {
  date: string;
  lines: { label: string; amount: number }[];
}

export interface CheckoutInvoiceHistoryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  invoices?: InvoiceRow[];
  upcoming?: UpcomingInvoice;
  currency?: string;
  onDownload?: (invoiceId: string) => void;
  onFilterChange?: (filter: { status: InvoiceStatus | "all"; query: string; year: number | "all" }) => void;
  accent?: string;
}

const defaultInvoices: InvoiceRow[] = [
  { id: "INV-2026-0112", date: "Nov 1, 2026", year: 2026, description: "Team plan, 10 seats", amount: 240, status: "open" },
  { id: "INV-2026-0098", date: "Oct 1, 2026", year: 2026, description: "Team plan, 10 seats", amount: 240, status: "paid" },
  { id: "INV-2026-0091", date: "Sep 14, 2026", year: 2026, description: "Extra build minutes, 2,000", amount: 36, status: "paid" },
  { id: "INV-2026-0085", date: "Sep 1, 2026", year: 2026, description: "Team plan, 10 seats", amount: 240, status: "failed" },
  { id: "INV-2026-0071", date: "Aug 1, 2026", year: 2026, description: "Team plan, 8 seats", amount: 192, status: "paid" },
  { id: "INV-2026-0064", date: "Jul 19, 2026", year: 2026, description: "Seat added mid-cycle, prorated", amount: 14.2, status: "refunded" },
  { id: "INV-2026-0058", date: "Jul 1, 2026", year: 2026, description: "Team plan, 8 seats", amount: 192, status: "paid" },
  { id: "INV-2026-0042", date: "Jun 1, 2026", year: 2026, description: "Team plan, 8 seats", amount: 192, status: "paid" },
  { id: "INV-2025-0311", date: "Dec 1, 2025", year: 2025, description: "Starter plan, 6 seats", amount: 60, status: "paid" },
  { id: "INV-2025-0287", date: "Nov 1, 2025", year: 2025, description: "Starter plan, 6 seats", amount: 60, status: "paid" },
];

const defaultUpcoming: UpcomingInvoice = {
  date: "Dec 1, 2026",
  lines: [
    { label: "Team plan, 10 seats", amount: 240 },
    { label: "Extra bandwidth, 120 GB", amount: 18 },
    { label: "Credit from downgrade", amount: -12 },
  ],
};

const statusLabel: Record<InvoiceStatus, string> = { paid: "Paid", open: "Open", failed: "Failed", refunded: "Refunded" };
const filters: (InvoiceStatus | "all")[] = ["all", "paid", "open", "failed", "refunded"];

function useCount(target: number) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = reduce ? 1 : Math.min(1, (t - t0) / 1100);
      setValue(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

const css = `
.hb-qg9 {
  --hb-qg9-accent: #f59e0b;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg9 *, .hb-qg9 *::before, .hb-qg9 *::after { box-sizing: border-box; }
.hb-qg9-inner { max-width: 1120px; margin: 0 auto; padding: clamp(40px, 6cqw, 88px) clamp(16px, 4cqw, 32px); }
.hb-qg9-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.hb-qg9-title { margin: 0; font-size: clamp(26px, 3.6cqw, 36px); letter-spacing: -0.03em; font-weight: 600; }
.hb-qg9-sub { margin: 6px 0 0; font-size: 14px; color: #8f8f8f; }
.hb-qg9-btn { height: 36px; padding: 0 14px; border-radius: 9px; border: 1px solid rgba(255,255,255,.1); background: #141414; color: #ededed; font: inherit; font-size: 13px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: background .2s, border-color .2s; }
.hb-qg9-btn:hover { background: #1c1c1c; border-color: rgba(255,255,255,.18); }
.hb-qg9-btn svg { width: 14px; height: 14px; }
.hb-qg9-btn:focus-visible, .hb-qg9-seg button:focus-visible, .hb-qg9-dl:focus-visible { outline: 2px solid var(--hb-qg9-accent); outline-offset: 2px; }
.hb-qg9-top { display: grid; gap: 12px; margin-top: 28px; }
@container (min-width: 760px) { .hb-qg9-top { grid-template-columns: 1fr 1fr 1.5fr; } }
.hb-qg9-stat { border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: #111; padding: 18px; display: grid; align-content: space-between; gap: 18px; position: relative; overflow: hidden; }
.hb-qg9-stat small { font-size: 12px; color: #8f8f8f; display: flex; align-items: center; gap: 6px; }
.hb-qg9-stat b { font-size: clamp(26px, 3.4cqw, 34px); letter-spacing: -0.04em; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-qg9-stat span { font-size: 12px; color: #6b6b6b; }
.hb-qg9-spark { position: absolute; right: 0; bottom: 0; width: 55%; height: 60%; opacity: .9; }
.hb-qg9-spark path:first-child { fill: color-mix(in srgb, var(--hb-qg9-accent) 14%, transparent); }
.hb-qg9-spark path:last-child { stroke: var(--hb-qg9-accent); stroke-dasharray: 300; stroke-dashoffset: 300; animation: hb-qg9-draw 1.6s .2s ease forwards; }
@keyframes hb-qg9-draw { to { stroke-dashoffset: 0; } }
.hb-qg9-up { border: 1px solid color-mix(in srgb, var(--hb-qg9-accent) 30%, rgba(255,255,255,.08)); border-radius: 16px; padding: 18px; background: radial-gradient(120% 120% at 100% 0%, color-mix(in srgb, var(--hb-qg9-accent) 14%, #111), #111 60%); }
.hb-qg9-uph { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.hb-qg9-uph small { font-size: 12px; color: #a1a1a1; }
.hb-qg9-uph span { font-size: 11px; font-weight: 600; color: var(--hb-qg9-accent); background: color-mix(in srgb, var(--hb-qg9-accent) 14%, transparent); padding: 3px 8px; border-radius: 999px; }
.hb-qg9-upt { margin: 6px 0 10px; font-size: 28px; font-weight: 600; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.hb-qg9-upl { list-style: none; margin: 0; padding: 10px 0 0; border-top: 1px dashed rgba(255,255,255,.1); display: grid; gap: 6px; font-size: 12px; color: #a1a1a1; }
.hb-qg9-upl li { display: flex; justify-content: space-between; gap: 8px; font-variant-numeric: tabular-nums; }
.hb-qg9-upl li[data-neg="true"] span:last-child { color: #6ee7b7; }
.hb-qg9-panel { margin-top: 16px; border: 1px solid rgba(255,255,255,.08); border-radius: 18px; background: #0f0f0f; overflow: hidden; container-type: inline-size; }
.hb-qg9-bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; padding: 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-qg9-seg { display: flex; gap: 2px; padding: 3px; border-radius: 10px; background: #161616; border: 1px solid rgba(255,255,255,.06); overflow-x: auto; max-width: 100%; }
.hb-qg9-seg button { border: 0; background: none; color: #8f8f8f; font: inherit; font-size: 12px; font-weight: 500; padding: 6px 10px; border-radius: 7px; cursor: pointer; white-space: nowrap; display: inline-flex; gap: 6px; align-items: center; }
.hb-qg9-seg button:hover { color: #ededed; }
.hb-qg9-seg button[aria-checked="true"] { background: #262626; color: #ededed; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
.hb-qg9-seg em { font-style: normal; font-size: 10px; color: #6b6b6b; font-variant-numeric: tabular-nums; }
.hb-qg9-search { flex: 1; min-width: 160px; position: relative; }
.hb-qg9-search svg { position: absolute; left: 10px; top: 50%; width: 14px; height: 14px; margin-top: -7px; color: #6b6b6b; }
.hb-qg9-search input { width: 100%; height: 34px; border-radius: 9px; border: 1px solid rgba(255,255,255,.08); background: #0a0a0a; color: #ededed; font: inherit; font-size: 13px; padding: 0 10px 0 30px; outline: none; }
.hb-qg9-search input:focus, .hb-qg9-year:focus { border-color: var(--hb-qg9-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg9-accent) 20%, transparent); }
.hb-qg9-year { height: 34px; border-radius: 9px; border: 1px solid rgba(255,255,255,.08); background: #0a0a0a; color: #ededed; font: inherit; font-size: 13px; padding: 0 8px; outline: none; }
.hb-qg9-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.hb-qg9-table th { text-align: left; font-weight: 500; font-size: 11px; color: #6b6b6b; text-transform: uppercase; letter-spacing: .06em; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,.06); background: #0c0c0c; }
.hb-qg9-table td { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.05); vertical-align: middle; }
.hb-qg9-table tbody tr { animation: hb-qg9-row .45s cubic-bezier(.2,.8,.2,1) both; transition: background .15s; }
.hb-qg9-table tbody tr:hover { background: rgba(255,255,255,.02); }
@keyframes hb-qg9-row { from { opacity: 0; transform: translateY(6px); } }
.hb-qg9-id { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: #d4d4d4; }
.hb-qg9-muted { color: #8f8f8f; }
.hb-qg9-num { text-align: right; font-variant-numeric: tabular-nums; font-weight: 500; }
.hb-qg9-table th.hb-qg9-num { text-align: right; }
.hb-qg9-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 3px 9px 3px 8px; border-radius: 999px; border: 1px solid; }
.hb-qg9-pill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-qg9-pill[data-s="paid"] { color: #6ee7b7; border-color: rgba(110,231,183,.25); background: rgba(110,231,183,.08); }
.hb-qg9-pill[data-s="open"] { color: var(--hb-qg9-accent); border-color: color-mix(in srgb, var(--hb-qg9-accent) 35%, transparent); background: color-mix(in srgb, var(--hb-qg9-accent) 10%, transparent); }
.hb-qg9-pill[data-s="open"]::before { animation: hb-qg9-blink 1.6s ease-in-out infinite; }
@keyframes hb-qg9-blink { 50% { opacity: .3; } }
.hb-qg9-pill[data-s="failed"] { color: #fda4af; border-color: rgba(253,164,175,.25); background: rgba(253,164,175,.08); }
.hb-qg9-pill[data-s="refunded"] { color: #a1a1a1; border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.04); }
.hb-qg9-dl { width: 30px; height: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,.08); background: transparent; color: #a1a1a1; cursor: pointer; display: inline-grid; place-items: center; transition: background .2s, color .2s; }
.hb-qg9-dl:hover { background: #1a1a1a; color: #ededed; }
.hb-qg9-dl svg { width: 14px; height: 14px; }
.hb-qg9-empty { padding: 40px 16px; text-align: center; color: #6b6b6b; font-size: 13px; }
.hb-qg9-foot { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 16px; font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-qg9-foot b { color: #ededed; font-weight: 500; }
@container (max-width: 640px) {
  .hb-qg9-table thead { display: none; }
  .hb-qg9-table, .hb-qg9-table tbody, .hb-qg9-table tr, .hb-qg9-table td { display: block; width: 100%; }
  .hb-qg9-table tr { display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,.05); }
  .hb-qg9-table td { padding: 0; border: 0; }
  .hb-qg9-table td:nth-child(1) { grid-column: 1; }
  .hb-qg9-table td:nth-child(2) { grid-column: 1; grid-row: 3; font-size: 12px; }
  .hb-qg9-table td:nth-child(3) { grid-column: 1; grid-row: 2; }
  .hb-qg9-table td:nth-child(4) { grid-column: 2; grid-row: 1; }
  .hb-qg9-table td:nth-child(5) { grid-column: 2; grid-row: 2; text-align: right; }
  .hb-qg9-table td:nth-child(6) { grid-column: 2; grid-row: 3; text-align: right; }
  .hb-qg9-table td.hb-qg9-num { width: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qg9 *, .hb-qg9 *::before, .hb-qg9 *::after { animation: none !important; transition: none !important; }
  .hb-qg9-spark path:last-child { stroke-dashoffset: 0; }
}
`;

export function CheckoutInvoiceHistory({
  title = "Invoices",
  subtitle = "Every charge for the Halcyon Labs workspace, with PDF-ready receipts.",
  invoices = defaultInvoices,
  upcoming = defaultUpcoming,
  currency = "USD",
  onDownload,
  onFilterChange,
  accent = "#f59e0b",
  className = "",
  style,
  ...rest
}: CheckoutInvoiceHistoryProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [status, setStatus] = React.useState<InvoiceStatus | "all">("all");
  const [query, setQuery] = React.useState("");
  const years = React.useMemo(() => Array.from(new Set(invoices.map((i) => i.year))).sort((a, b) => b - a), [invoices]);
  const [year, setYear] = React.useState<number | "all">(years[0] ?? "all");
  const segRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const update = (next: { status?: InvoiceStatus | "all"; query?: string; year?: number | "all" }) => {
    const s = next.status ?? status;
    const q = next.query ?? query;
    const y = next.year ?? year;
    if (next.status !== undefined) setStatus(s);
    if (next.query !== undefined) setQuery(q);
    if (next.year !== undefined) setYear(y);
    onFilterChange?.({ status: s, query: q, year: y });
  };

  const inYear = invoices.filter((i) => year === "all" || i.year === year);
  const q = query.trim().toLowerCase();
  const shown = inYear.filter((i) => (status === "all" || i.status === status) && (!q || i.id.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)));
  const paidTotal = inYear.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const openTotal = inYear.filter((i) => i.status === "open" || i.status === "failed").reduce((s, i) => s + i.amount, 0);
  const shownTotal = shown.reduce((s, i) => s + (i.status === "refunded" ? 0 : i.amount), 0);
  const upTotal = upcoming.lines.reduce((s, l) => s + l.amount, 0);
  const paidCount = useCount(paidTotal);
  const openCount = useCount(openTotal);

  const download = (inv: InvoiceRow) => {
    if (onDownload) {
      onDownload(inv.id);
      return;
    }
    const text = [`Invoice ${inv.id}`, `Date ${inv.date}`, inv.description, `Amount ${money.format(inv.amount)}`, `Status ${statusLabel[inv.status]}`].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inv.id}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const exportCsv = () => {
    const rows = [["Invoice", "Date", "Description", "Amount", "Status"], ...shown.map((i) => [i.id, i.date, i.description, i.amount.toFixed(2), statusLabel[i.status]])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoices-${year}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const onSegKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % filters.length;
    if (e.key === "ArrowLeft") n = (i - 1 + filters.length) % filters.length;
    if (n < 0) return;
    e.preventDefault();
    update({ status: filters[n] });
    segRefs.current[n]?.focus();
  };

  const vars = { "--hb-qg9-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg9 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-invoice-history" precedence="default">{css}</style>
      <div className="hb-qg9-inner">
        <div className="hb-qg9-head">
          <div>
            <h2 className="hb-qg9-title">{title}</h2>
            {subtitle ? <p className="hb-qg9-sub">{subtitle}</p> : null}
          </div>
          <button type="button" className="hb-qg9-btn" onClick={exportCsv}>
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5v7M4 5.8L7 8.8l3-3M2 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Export CSV
          </button>
        </div>
        <div className="hb-qg9-top">
          <div className="hb-qg9-stat">
            <small>Paid in {year === "all" ? "total" : year}</small>
            <b>{money.format(paidCount)}</b>
            <span>{inYear.filter((i) => i.status === "paid").length} invoices settled</span>
            <svg className="hb-qg9-spark" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 50 L15 46 L30 48 L45 38 L60 40 L75 28 L90 30 L105 18 L120 14 L120 60 L0 60Z" />
              <path d="M0 50 L15 46 L30 48 L45 38 L60 40 L75 28 L90 30 L105 18 L120 14" fill="none" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="hb-qg9-stat">
            <small>Outstanding</small>
            <b>{money.format(openCount)}</b>
            <span>{inYear.filter((i) => i.status === "open" || i.status === "failed").length} open or failed</span>
          </div>
          <div className="hb-qg9-up">
            <div className="hb-qg9-uph"><small>Upcoming invoice</small><span>{upcoming.date}</span></div>
            <div className="hb-qg9-upt">{money.format(upTotal)}</div>
            <ul className="hb-qg9-upl">
              {upcoming.lines.map((l) => (
                <li key={l.label} data-neg={l.amount < 0 ? "true" : undefined}><span>{l.label}</span><span>{l.amount < 0 ? `-${money.format(-l.amount)}` : money.format(l.amount)}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hb-qg9-panel">
          <div className="hb-qg9-bar">
            <div className="hb-qg9-seg" role="radiogroup" aria-label="Status">
              {filters.map((f, i) => (
                <button
                  key={f}
                  ref={(el) => { segRefs.current[i] = el; }}
                  type="button"
                  role="radio"
                  aria-checked={status === f}
                  tabIndex={status === f ? 0 : -1}
                  onClick={() => update({ status: f })}
                  onKeyDown={(e) => onSegKey(e, i)}
                >
                  {f === "all" ? "All" : statusLabel[f]}
                  <em>{f === "all" ? inYear.length : inYear.filter((x) => x.status === f).length}</em>
                </button>
              ))}
            </div>
            <div className="hb-qg9-search">
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.4" /><path d="M9.2 9.2l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              <input aria-label="Search invoices" placeholder="Search number or description" value={query} onChange={(e) => update({ query: e.target.value })} />
            </div>
            <select className="hb-qg9-year" aria-label="Year" value={String(year)} onChange={(e) => update({ year: e.target.value === "all" ? "all" : Number(e.target.value) })}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
              <option value="all">All years</option>
            </select>
          </div>
          {shown.length ? (
            <table className="hb-qg9-table" aria-describedby={`${uid}-foot`}>
              <thead>
                <tr>
                  <th scope="col">Invoice</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="hb-qg9-num">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col"><span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Download</span></th>
                </tr>
              </thead>
              <tbody>
                {shown.map((inv, i) => (
                  <tr key={inv.id} style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}>
                    <td className="hb-qg9-id">{inv.id}</td>
                    <td className="hb-qg9-muted">{inv.date}</td>
                    <td>{inv.description}</td>
                    <td className="hb-qg9-num">{money.format(inv.amount)}</td>
                    <td><span className="hb-qg9-pill" data-s={inv.status}>{statusLabel[inv.status]}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="hb-qg9-dl" aria-label={`Download ${inv.id}`} onClick={() => download(inv)}>
                        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5v7M4 5.8L7 8.8l3-3M2 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="hb-qg9-empty">No invoices match these filters.</p>
          )}
          <div className="hb-qg9-foot" id={`${uid}-foot`}>
            <span>Showing <b>{shown.length}</b> of {inYear.length} invoices</span>
            <span>Billed <b>{money.format(shownTotal)}</b> excluding refunds</span>
          </div>
        </div>
      </div>
    </section>
  );
}

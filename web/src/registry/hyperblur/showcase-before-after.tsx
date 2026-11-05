"use client";

import * as React from "react";

export interface ShowcaseBeforeAfterStat {
  value: string;
  label: string;
}

export interface ShowcaseBeforeAfterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  beforeLabel?: string;
  afterLabel?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  intro?: boolean;
  stats?: ShowcaseBeforeAfterStat[];
  url?: string;
  accent?: string;
}

const css = `
.hb-yh8 {
  --hb-yh8-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(56px, 8cqi, 104px) 20px;
  background: #f7f5ef;
  color: #151515;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh8 *, .hb-yh8 *::before, .hb-yh8 *::after { box-sizing: border-box; }
.hb-yh8-in { position: relative; max-width: 1120px; margin: 0 auto; }
.hb-yh8-head { max-width: 620px; margin: 0 auto 32px; text-align: center; }
.hb-yh8-eyebrow { display: inline-flex; align-items: center; gap: 8px; height: 26px; padding: 0 11px; border: 1px solid rgba(0,0,0,.08); border-radius: 999px; background: #fff; color: #555; font-size: 12.5px; font-weight: 600; }
.hb-yh8-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yh8-accent); }
.hb-yh8-title { margin: 16px 0 0; font-size: clamp(30px, 4.4cqi, 46px); font-weight: 650; letter-spacing: -.035em; line-height: 1.06; }
.hb-yh8-sub { margin: 12px auto 0; max-width: 500px; color: #6b6b6b; font-size: 15.5px; line-height: 1.6; }
.hb-yh8-frame { position: relative; max-width: 1000px; margin: 0 auto; border: 1px solid rgba(0,0,0,.1); border-radius: 18px; background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,.03), 0 40px 80px -40px rgba(30,30,20,.35); overflow: hidden; }
.hb-yh8-chrome { display: flex; align-items: center; gap: 6px; height: 38px; padding: 0 14px; border-bottom: 1px solid rgba(0,0,0,.07); background: #fbfaf7; }
.hb-yh8-chrome i { width: 10px; height: 10px; border-radius: 50%; background: #e5e2da; }
.hb-yh8-url { flex: 1; max-width: 300px; height: 24px; margin: 0 auto; border-radius: 7px; background: #f0eee8; color: #8a8a8a; font-size: 11.5px; line-height: 24px; text-align: center; }
.hb-yh8-stage { position: relative; height: 420px; touch-action: pan-y; user-select: none; -webkit-user-select: none; cursor: ew-resize; }
.hb-yh8-layer { position: absolute; inset: 0; overflow: hidden; }
.hb-yh8-after { clip-path: inset(0 0 0 calc(var(--hb-yh8-p) * 1%)); }
.hb-yh8-chip { position: absolute; z-index: 3; top: 14px; height: 26px; padding: 0 10px; border-radius: 999px; font-size: 11.5px; font-weight: 650; line-height: 26px; transition: opacity .25s ease; pointer-events: none; }
.hb-yh8-chip[data-at="l"] { left: 14px; background: rgba(40,40,40,.82); color: #fff; }
.hb-yh8-chip[data-at="r"] { right: 14px; background: var(--hb-yh8-accent); color: #fff; }
.hb-yh8-div { position: absolute; z-index: 4; top: 0; bottom: 0; left: calc(var(--hb-yh8-p) * 1%); width: 2px; margin-left: -1px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.08), 0 0 24px rgba(0,0,0,.18); pointer-events: none; }
.hb-yh8-handle {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: calc(var(--hb-yh8-p) * 1%);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #151515;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 8px 24px -6px rgba(0,0,0,.35);
  cursor: grab;
  transition: transform .2s cubic-bezier(.3,1.4,.5,1), box-shadow .2s ease;
}
.hb-yh8-handle:hover { transform: scale(1.08); }
.hb-yh8[data-drag="true"] .hb-yh8-handle { cursor: grabbing; transform: scale(.94); }
.hb-yh8-handle:focus-visible { outline: none; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yh8-accent) 40%, transparent), 0 8px 24px -6px rgba(0,0,0,.35); }
.hb-yh8-handle svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh8-old { display: grid; grid-template-columns: 180px minmax(0, 1fr); height: 100%; background: #eceae6; color: #4a4a4a; font-size: 11px; }
.hb-yh8-os { padding: 10px 8px; border-right: 1px solid #cfccc5; background: #dedbd4; }
.hb-yh8-oi { height: 20px; margin-bottom: 3px; padding: 0 8px; border-radius: 3px; font-size: 10.5px; line-height: 20px; color: #555; }
.hb-yh8-oi:nth-child(3) { background: #bdb9b0; color: #222; }
.hb-yh8-om { padding: 10px 12px; overflow: hidden; }
.hb-yh8-otb { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
.hb-yh8-ob { height: 22px; padding: 0 8px; border: 1px solid #b9b5ad; border-radius: 3px; background: linear-gradient(#fafafa, #dcd9d2); font-size: 10px; line-height: 20px; color: #333; }
.hb-yh8-warn { margin-bottom: 8px; padding: 6px 10px; border: 1px solid #e3c86b; background: #fdf3c8; color: #6b5512; font-size: 10.5px; }
.hb-yh8-flt { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; margin-bottom: 8px; }
.hb-yh8-flt span { height: 22px; border: 1px solid #c4c0b8; background: #fff; padding: 0 6px; font-size: 10px; line-height: 20px; color: #777; }
.hb-yh8-tbl { border: 1px solid #c4c0b8; background: #fff; }
.hb-yh8-tr { display: grid; grid-template-columns: 22px 70px minmax(0, 1.4fr) repeat(5, minmax(0, 1fr)); border-top: 1px solid #e2dfd8; }
.hb-yh8-tr:first-child { border-top: 0; background: #d6d3cc; font-weight: 700; }
.hb-yh8-tr:nth-child(even) { background: #f6f5f2; }
.hb-yh8-tr span { height: 23px; padding: 0 5px; border-left: 1px solid #e2dfd8; font-size: 10px; line-height: 23px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh8-tr span:first-child { border-left: 0; }
.hb-yh8-new { display: grid; grid-template-columns: 64px minmax(0, 1fr); height: 100%; background: #fff; }
.hb-yh8-ns { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 0; border-right: 1px solid rgba(0,0,0,.06); }
.hb-yh8-ns i { width: 34px; height: 34px; border-radius: 10px; background: #f3f3f1; }
.hb-yh8-ns i:first-child { background: #151515; }
.hb-yh8-ns i:nth-child(2) { background: color-mix(in srgb, var(--hb-yh8-accent) 14%, #fff); box-shadow: inset 0 0 0 1.5px var(--hb-yh8-accent); }
.hb-yh8-nm { padding: 24px 30px; overflow: hidden; }
.hb-yh8-nh { display: flex; align-items: center; justify-content: space-between; }
.hb-yh8-nt { font-size: 20px; font-weight: 650; letter-spacing: -.02em; }
.hb-yh8-nb { height: 34px; padding: 0 14px; border-radius: 999px; background: #151515; color: #fff; font-size: 12.5px; font-weight: 600; line-height: 34px; }
.hb-yh8-ng { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 16px; margin-top: 20px; }
.hb-yh8-card { padding: 18px; border: 1px solid rgba(0,0,0,.07); border-radius: 16px; background: #fcfcfb; }
.hb-yh8-ck { color: #7a7a7a; font-size: 12px; }
.hb-yh8-cv { margin-top: 4px; font-size: 30px; font-weight: 700; letter-spacing: -.04em; }
.hb-yh8-cv em { margin-left: 8px; color: var(--hb-yh8-accent); font-size: 13px; font-style: normal; font-weight: 650; letter-spacing: 0; }
.hb-yh8-bars { display: flex; align-items: flex-end; gap: 7px; height: 120px; margin-top: 14px; }
.hb-yh8-bars i { flex: 1; border-radius: 6px 6px 3px 3px; background: #ecebe7; }
.hb-yh8-bars i:nth-child(n+9) { background: var(--hb-yh8-accent); }
.hb-yh8-li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid rgba(0,0,0,.05); font-size: 12.5px; }
.hb-yh8-li:first-of-type { border-top: 0; }
.hb-yh8-av { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #fff; font-size: 10.5px; font-weight: 700; }
.hb-yh8-li b { margin-left: auto; font-weight: 600; }
.hb-yh8-pill { padding: 2px 8px; border-radius: 99px; background: color-mix(in srgb, var(--hb-yh8-accent) 12%, #fff); color: color-mix(in srgb, var(--hb-yh8-accent) 80%, #000); font-size: 11px; font-weight: 600; }
.hb-yh8-stats { display: grid; grid-template-columns: repeat(var(--hb-yh8-n), minmax(0, 1fr)); max-width: 1000px; margin: 22px auto 0; }
.hb-yh8-st { padding: 6px 20px; border-left: 1px solid rgba(0,0,0,.08); }
.hb-yh8-st:first-child { border-left: 0; }
.hb-yh8-sv { font-size: 26px; font-weight: 700; letter-spacing: -.03em; }
.hb-yh8-sl { margin-top: 2px; color: #6b6b6b; font-size: 13px; }
.hb-yh8-hint { margin: 14px 0 0; color: #8a8a8a; font-size: 12.5px; text-align: center; }
@container (max-width: 760px) {
  .hb-yh8-stage { height: 360px; }
  .hb-yh8-old { grid-template-columns: 110px minmax(0, 1fr); }
  .hb-yh8-tr { grid-template-columns: 18px 56px minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)); }
  .hb-yh8-tr span:nth-child(n+7) { display: none; }
  .hb-yh8-ng { grid-template-columns: minmax(0, 1fr); }
  .hb-yh8-ng > :last-child { display: none; }
  .hb-yh8-nm { padding: 18px; }
  .hb-yh8-stats { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .hb-yh8-st { border-left: 0; padding: 0; text-align: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh8 *, .hb-yh8 *::before, .hb-yh8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultStats: ShowcaseBeforeAfterStat[] = [
  { value: "-62%", label: "Clicks to send an invoice" },
  { value: "3.4x", label: "Faster first load" },
  { value: "+41%", label: "Weekly active accountants" },
];

const oldRows = [
  ["INV-20931", "Hollis & Grant LLP", "$4,200.00", "Net 30", "Sent", "10/02", "JM"],
  ["INV-20930", "Brightline Dental", "$1,180.00", "Net 15", "Overdue", "09/28", "AK"],
  ["INV-20929", "Okafor Studio", "$860.00", "Due now", "Draft", "09/27", "JM"],
  ["INV-20928", "Northgate Supply", "$12,940.00", "Net 45", "Paid", "09/25", "RS"],
  ["INV-20927", "Pine & Co Bakery", "$318.50", "Net 15", "Paid", "09/24", "AK"],
  ["INV-20926", "Vela Architects", "$7,600.00", "Net 30", "Sent", "09/22", "RS"],
  ["INV-20925", "Marlow Fitness", "$540.00", "Net 15", "Paid", "09/21", "JM"],
  ["INV-20924", "Quarry Labs", "$2,275.00", "Net 30", "Partial", "09/19", "AK"],
  ["INV-20923", "Lumen Opticians", "$990.00", "Net 15", "Paid", "09/18", "RS"],
  ["INV-20922", "Harbor Freight Co", "$3,410.00", "Net 30", "Paid", "09/16", "JM"],
];

function OldUI() {
  return (
    <div className="hb-yh8-old">
      <div className="hb-yh8-os">
        {["Dashboard", "Customers", "Invoices", "Estimates", "Payments", "Items", "Taxes", "Reports", "Recurring", "Expenses", "Vendors", "Settings", "Users", "Import / Export", "Help"].map((x) => (
          <div key={x} className="hb-yh8-oi">
            {x}
          </div>
        ))}
      </div>
      <div className="hb-yh8-om">
        <div className="hb-yh8-otb">
          {["New", "Edit", "Duplicate", "Delete", "Print", "Email", "PDF", "Export CSV", "Mark paid", "Void", "Columns", "Refresh"].map((x) => (
            <span key={x} className="hb-yh8-ob">
              {x}
            </span>
          ))}
        </div>
        <div className="hb-yh8-warn">Your session expires in 5 minutes. Save your work. Scheduled maintenance Sunday 02:00 to 06:00.</div>
        <div className="hb-yh8-flt">
          {["Status: All", "Customer: All", "From: 09/01", "To: 10/31", "Owner: Any"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="hb-yh8-tbl">
          <div className="hb-yh8-tr">
            {["", "Number", "Customer", "Amount", "Terms", "Status", "Date", "Owner"].map((x, i) => (
              <span key={i}>{x}</span>
            ))}
          </div>
          {oldRows.map((r) => (
            <div key={r[0]} className="hb-yh8-tr">
              <span>[ ]</span>
              {r.map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewUI() {
  const bars = [30, 42, 38, 50, 46, 58, 54, 62, 70, 66, 82, 94];
  return (
    <div className="hb-yh8-new">
      <div className="hb-yh8-ns">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="hb-yh8-nm">
        <div className="hb-yh8-nh">
          <div className="hb-yh8-nt">Invoices</div>
          <div className="hb-yh8-nb">New invoice</div>
        </div>
        <div className="hb-yh8-ng">
          <div className="hb-yh8-card">
            <div className="hb-yh8-ck">Collected in October</div>
            <div className="hb-yh8-cv">
              $48,210<em>+18%</em>
            </div>
            <div className="hb-yh8-bars">
              {bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="hb-yh8-card">
            <div className="hb-yh8-ck">Needs attention</div>
            {[
              ["Brightline Dental", "$1,180", "#f97316", "BD"],
              ["Quarry Labs", "$2,275", "#6366f1", "QL"],
              ["Okafor Studio", "$860", "#0ea5e9", "OS"],
              ["Vela Architects", "$7,600", "#ec4899", "VA"],
            ].map(([n, a, c, ini], i) => (
              <div key={n} className="hb-yh8-li">
                <span className="hb-yh8-av" style={{ background: c }}>
                  {ini}
                </span>
                {n}
                {i === 0 ? <span className="hb-yh8-pill">Remind</span> : null}
                <b>{a}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseBeforeAfter({
  eyebrow = "Ledgerly 3.0",
  title = "We rebuilt invoicing from the ground up",
  subtitle = "Drag the divider to compare the old screen with the new one. Same data, a fraction of the noise.",
  beforeLabel = "Before, v2.8",
  afterLabel = "After, v3.0",
  value,
  defaultValue = 50,
  onValueChange,
  intro = true,
  stats = defaultStats,
  url = "app.ledgerly.com/invoices",
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: ShowcaseBeforeAfterProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [drag, setDrag] = React.useState(false);
  const [introPos, setIntroPos] = React.useState<number | null>(null);
  const touched = React.useRef(false);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const base = value ?? inner;
  const pos = introPos ?? base;

  React.useEffect(() => {
    if (!intro || value !== undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const keys = [
      [0, 0],
      [0.32, -28],
      [0.7, 24],
      [1, 0],
    ];
    const dur = 2600;
    let raf = 0;
    let t0 = 0;
    const start = window.setTimeout(() => {
      const tick = (t: number) => {
        if (touched.current) {
          setIntroPos(null);
          return;
        }
        if (!t0) t0 = t;
        const k = Math.min(1, (t - t0) / dur);
        let j = 0;
        while (j < keys.length - 2 && k > keys[j + 1]![0]!) j++;
        const [ka, va] = keys[j]!;
        const [kb, vb] = keys[j + 1]!;
        const u = (k - ka!) / (kb! - ka!);
        const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        setIntroPos(defaultValue + va! + (vb! - va!) * e);
        if (k < 1) raf = window.requestAnimationFrame(tick);
        else setIntroPos(null);
      };
      raf = window.requestAnimationFrame(tick);
    }, 700);
    return () => {
      window.clearTimeout(start);
      window.cancelAnimationFrame(raf);
    };
  }, [intro, value, defaultValue]);

  function set(v: number) {
    const next = Math.max(0, Math.min(100, v));
    touched.current = true;
    setIntroPos(null);
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  }

  function fromPointer(clientX: number) {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0) return;
    set(((clientX - r.left) / r.width) * 100);
  }

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(true);
    fromPointer(e.clientX);
  }

  function onKey(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(base - step);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") set(base + step);
    else if (e.key === "Home") set(0);
    else if (e.key === "End") set(100);
    else if (e.key === "PageDown") set(base - 10);
    else if (e.key === "PageUp") set(base + 10);
    else return;
    e.preventDefault();
  }

  return (
    <section
      className={`hb-yh8 ${className}`}
      data-drag={drag ? "true" : "false"}
      style={{ "--hb-yh8-accent": accent, "--hb-yh8-n": stats.length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-before-after" precedence="default">
        {css}
      </style>
      <div className="hb-yh8-in">
        <header className="hb-yh8-head">
          <span className="hb-yh8-eyebrow">
            <i aria-hidden="true" />
            {eyebrow}
          </span>
          <h2 className="hb-yh8-title">{title}</h2>
          {subtitle && <p className="hb-yh8-sub">{subtitle}</p>}
        </header>
        <div className="hb-yh8-frame">
          <div className="hb-yh8-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="hb-yh8-url">{url}</span>
          </div>
          <div
            ref={stageRef}
            className="hb-yh8-stage"
            style={{ "--hb-yh8-p": pos.toFixed(2) } as React.CSSProperties}
            onPointerDown={onDown}
            onPointerMove={(e) => drag && fromPointer(e.clientX)}
            onPointerUp={() => setDrag(false)}
            onPointerCancel={() => setDrag(false)}
          >
            <div className="hb-yh8-layer" aria-hidden="true">
              <OldUI />
            </div>
            <div className="hb-yh8-layer hb-yh8-after" aria-hidden="true">
              <NewUI />
            </div>
            <span className="hb-yh8-chip" data-at="l" style={{ opacity: pos < 14 ? 0 : 1 }}>
              {beforeLabel}
            </span>
            <span className="hb-yh8-chip" data-at="r" style={{ opacity: pos > 86 ? 0 : 1 }}>
              {afterLabel}
            </span>
            <span className="hb-yh8-div" aria-hidden="true" />
            <button
              type="button"
              role="slider"
              className="hb-yh8-handle"
              aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(base)}
              aria-valuetext={`${Math.round(100 - base)}% of the new design visible`}
              onKeyDown={onKey}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M7.5 5.5 3 10l4.5 4.5M12.5 5.5 17 10l-4.5 4.5" />
              </svg>
            </button>
          </div>
        </div>
        {stats.length > 0 && (
          <div className="hb-yh8-stats">
            {stats.map((s) => (
              <div key={s.label} className="hb-yh8-st">
                <div className="hb-yh8-sv">{s.value}</div>
                <div className="hb-yh8-sl">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <p className="hb-yh8-hint">Drag the handle or use the arrow keys. Hold Shift for bigger steps.</p>
      </div>
    </section>
  );
}

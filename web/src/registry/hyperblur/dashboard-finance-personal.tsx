"use client";

import * as React from "react";

export interface FinanceCategory {
  name: string;
  budget: number;
  color: string;
}

export interface FinanceGoal {
  name: string;
  target: number;
  saved: number;
  color: string;
}

export interface FinanceBill {
  name: string;
  day: number;
  amount: number;
  auto?: boolean;
}

export interface DashboardFinancePersonalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  user?: string;
  appearance?: "light" | "dark";
  accent?: string;
  currency?: string;
  months?: string[];
  month?: number;
  defaultMonth?: number;
  onMonthChange?: (index: number) => void;
  categories?: FinanceCategory[];
  goals?: FinanceGoal[];
  bills?: FinanceBill[];
}

function rnd(n: number) {
  let x = (n ^ 0x7feb352d) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x2c1b3c6d) >>> 0;
  return ((x ^ (x >>> 15)) >>> 0) / 4294967295;
}

const defaultMonths = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const monthLen: Record<string, number> = { Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30, Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31 };
const monthStart: Record<string, number> = { Jun: 1, Jul: 3, Aug: 6, Sep: 2, Oct: 4, Nov: 0, Dec: 2, Jan: 4, Feb: 0, Mar: 0, Apr: 3, May: 5 };

const defaultCategories: FinanceCategory[] = [
  { name: "Rent", budget: 1650, color: "#5b6cff" },
  { name: "Groceries", budget: 520, color: "#22a37a" },
  { name: "Dining out", budget: 260, color: "#f08a4b" },
  { name: "Transport", budget: 180, color: "#d4a72c" },
  { name: "Subscriptions", budget: 75, color: "#b26bd6" },
  { name: "Fun", budget: 200, color: "#e2557a" },
];

const defaultGoals: FinanceGoal[] = [
  { name: "Emergency fund", target: 12000, saved: 8450, color: "#22a37a" },
  { name: "Lisbon trip", target: 3200, saved: 1980, color: "#f08a4b" },
  { name: "New laptop", target: 2400, saved: 640, color: "#5b6cff" },
];

const defaultBills: FinanceBill[] = [
  { name: "Rent", day: 1, amount: 1650, auto: true },
  { name: "Phone", day: 8, amount: 45, auto: true },
  { name: "Internet", day: 12, amount: 60, auto: true },
  { name: "Gym", day: 15, amount: 39 },
  { name: "Credit card", day: 22, amount: 384 },
  { name: "Music", day: 27, amount: 11, auto: true },
];

const factor = [0.92, 1.04, 0.97, 1.08, 0.99, 0.88];

const css = `
.hb-wi12 {
  --hb-wi12-a: #5b6cff;
  --hb-wi12-bg: #f7f5ef;
  --hb-wi12-card: #ffffff;
  --hb-wi12-line: #e8e4d8;
  --hb-wi12-fg: #1b1b1f;
  --hb-wi12-mute: #77746b;
  --hb-wi12-soft: #f1eee5;
  container-type: inline-size;
  width: 100%;
  box-sizing: border-box;
  padding: 22px;
  border-radius: 18px;
  background: var(--hb-wi12-bg);
  color: var(--hb-wi12-fg);
  font-family: inherit;
  font-size: 13px;
}
.hb-wi12[data-appearance="dark"] {
  --hb-wi12-bg: #0b0b0c;
  --hb-wi12-card: #131315;
  --hb-wi12-line: #242427;
  --hb-wi12-fg: #ededed;
  --hb-wi12-mute: #8f8f8f;
  --hb-wi12-soft: #1b1b1e;
  border: 1px solid #222;
}
.hb-wi12 *, .hb-wi12 *::before, .hb-wi12 *::after { box-sizing: border-box; }
.hb-wi12 button { font-family: inherit; color: inherit; }
.hb-wi12 button:focus-visible { outline: none; box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-wi12-a) 60%, transparent); }
.hb-wi12-top { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
.hb-wi12-hi b { display: block; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.hb-wi12-hi span { font-size: 12.5px; color: var(--hb-wi12-mute); }
.hb-wi12-months { position: relative; margin-left: auto; display: grid; grid-template-columns: repeat(var(--hb-wi12-n, 6), 1fr); padding: 3px; border-radius: 11px; background: var(--hb-wi12-soft); border: 1px solid var(--hb-wi12-line); }
.hb-wi12-pill { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / var(--hb-wi12-n, 6)); border-radius: 8px; background: var(--hb-wi12-card); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), inset 0 0 0 1px var(--hb-wi12-line); transform: translateX(calc(100% * var(--hb-wi12-i, 0))); transition: transform 0.4s cubic-bezier(0.34, 1.25, 0.64, 1); }
.hb-wi12-months button { position: relative; height: 28px; min-width: 44px; padding: 0 10px; border: 0; background: transparent; font-size: 12px; font-weight: 500; color: var(--hb-wi12-mute); cursor: pointer; border-radius: 8px; transition: color 0.2s ease; }
.hb-wi12-months button[aria-pressed="true"] { color: var(--hb-wi12-fg); }
.hb-wi12-grid { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 14px; }
.hb-wi12-card { padding: 16px; border-radius: 15px; background: var(--hb-wi12-card); border: 1px solid var(--hb-wi12-line); box-shadow: 0 1px 2px rgba(30, 25, 10, 0.04), 0 8px 24px -16px rgba(30, 25, 10, 0.18); }
.hb-wi12-ch { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
.hb-wi12-ch b { font-size: 13px; font-weight: 600; }
.hb-wi12-ch span { font-size: 11.5px; color: var(--hb-wi12-mute); font-variant-numeric: tabular-nums; }
.hb-wi12-nw strong { display: block; font-size: 32px; font-weight: 600; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; line-height: 1.1; }
.hb-wi12-chg { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi12-chg[data-up="true"] { color: #178a5a; background: rgba(34, 163, 122, 0.12); }
.hb-wi12-chg[data-up="false"] { color: #c2410c; background: rgba(240, 138, 75, 0.14); }
.hb-wi12[data-appearance="dark"] .hb-wi12-chg[data-up="true"] { color: #4ade80; }
.hb-wi12[data-appearance="dark"] .hb-wi12-chg[data-up="false"] { color: #fb923c; }
.hb-wi12-nwc { position: relative; height: 110px; margin-top: 14px; }
.hb-wi12-nwc svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wi12-nwl { fill: none; stroke: var(--hb-wi12-a); stroke-width: 2.2; vector-effect: non-scaling-stroke; stroke-linejoin: round; stroke-linecap: round; }
.hb-wi12-mk { position: absolute; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: var(--hb-wi12-card); border: 2.5px solid var(--hb-wi12-a); box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-wi12-a) 18%, transparent); transition: left 0.45s cubic-bezier(0.34, 1.25, 0.64, 1), top 0.45s cubic-bezier(0.34, 1.25, 0.64, 1); }
.hb-wi12-split { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
.hb-wi12-split div { padding: 10px 12px; border-radius: 11px; background: var(--hb-wi12-soft); }
.hb-wi12-split small { display: block; font-size: 11px; color: var(--hb-wi12-mute); }
.hb-wi12-split b { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi12-donut { display: flex; align-items: center; gap: 14px; }
.hb-wi12-ring { position: relative; width: 132px; height: 132px; flex: none; }
.hb-wi12-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.hb-wi12-arc { fill: none; stroke-width: 16; transition: stroke-dasharray 0.6s cubic-bezier(0.65, 0, 0.25, 1), stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.25, 1), stroke-width 0.25s ease, opacity 0.2s ease; cursor: pointer; }
.hb-wi12-ring[data-hot="true"] .hb-wi12-arc { opacity: 0.3; }
.hb-wi12-ring[data-hot="true"] .hb-wi12-arc[data-on="true"] { opacity: 1; stroke-width: 20; }
.hb-wi12-rc { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; pointer-events: none; }
.hb-wi12-rc small { font-size: 10.5px; color: var(--hb-wi12-mute); }
.hb-wi12-rc b { font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
.hb-wi12-legend { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-wi12-legend li { display: flex; align-items: center; gap: 7px; padding: 3px 6px; border-radius: 7px; font-size: 12px; cursor: default; transition: background 0.2s ease; }
.hb-wi12-legend li[data-on="true"] { background: var(--hb-wi12-soft); }
.hb-wi12-legend i { width: 8px; height: 8px; border-radius: 3px; flex: none; }
.hb-wi12-legend span { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi12-legend b { font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi12-env { display: flex; flex-direction: column; gap: 11px; margin: 0; padding: 0; list-style: none; }
.hb-wi12-env li { display: flex; flex-direction: column; gap: 5px; }
.hb-wi12-env p { display: flex; justify-content: space-between; margin: 0; font-size: 12px; }
.hb-wi12-env p span { color: var(--hb-wi12-mute); font-variant-numeric: tabular-nums; }
.hb-wi12-env p span b { color: var(--hb-wi12-fg); font-weight: 600; }
.hb-wi12-env p span[data-over="true"], .hb-wi12-env p span[data-over="true"] b { color: #d9480f; }
.hb-wi12-track { position: relative; height: 8px; border-radius: 4px; background: var(--hb-wi12-soft); overflow: hidden; }
.hb-wi12-fill { position: absolute; inset: 0 auto 0 0; border-radius: 4px; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.hb-wi12-fill[data-over="true"] { background-image: repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.35) 0 3px, transparent 3px 6px) !important; background-color: #e8590c !important; }
.hb-wi12-cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; margin-bottom: 12px; }
.hb-wi12-cal span { display: grid; place-items: center; height: 24px; border-radius: 6px; font-size: 10.5px; color: var(--hb-wi12-mute); font-variant-numeric: tabular-nums; position: relative; }
.hb-wi12-cal span[data-h="true"] { font-size: 9.5px; height: 16px; text-transform: uppercase; letter-spacing: 0.04em; }
.hb-wi12-cal span[data-bill="true"] { color: var(--hb-wi12-fg); font-weight: 600; background: color-mix(in srgb, var(--hb-wi12-a) 12%, transparent); }
.hb-wi12-cal span[data-bill="true"]::after { content: ""; position: absolute; bottom: 2px; width: 4px; height: 4px; border-radius: 50%; background: var(--hb-wi12-a); }
.hb-wi12-cal span[data-today="true"] { box-shadow: inset 0 0 0 1.5px var(--hb-wi12-fg); }
.hb-wi12-bills { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-wi12-bills li { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-top: 1px solid var(--hb-wi12-line); font-size: 12px; }
.hb-wi12-bills li:first-child { border-top: 0; }
.hb-wi12-bills time { width: 34px; font-size: 11px; color: var(--hb-wi12-mute); font-variant-numeric: tabular-nums; }
.hb-wi12-bills span { flex: 1; }
.hb-wi12-bills em { font-style: normal; font-size: 10px; padding: 1px 6px; border-radius: 5px; background: var(--hb-wi12-soft); color: var(--hb-wi12-mute); }
.hb-wi12-bills b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi12-bills li[data-paid="true"] span, .hb-wi12-bills li[data-paid="true"] b { color: var(--hb-wi12-mute); text-decoration: line-through; text-decoration-color: var(--hb-wi12-line); }
.hb-wi12-goals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.hb-wi12-goal { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.hb-wi12-gr { position: relative; width: 74px; height: 74px; }
.hb-wi12-gr svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-wi12-gr circle:last-child { transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.hb-wi12-gr b { position: absolute; inset: 0; display: grid; place-items: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi12-goal span { font-size: 12px; font-weight: 550; }
.hb-wi12-goal small { font-size: 11px; color: var(--hb-wi12-mute); font-variant-numeric: tabular-nums; }
.hb-wi12-wide { grid-column: span 2; }
@container (max-width: 900px) {
  .hb-wi12-grid { grid-template-columns: 1fr 1fr; }
  .hb-wi12-wide { grid-column: span 2; }
}
@container (max-width: 600px) {
  .hb-wi12 { padding: 14px; }
  .hb-wi12-grid { grid-template-columns: 1fr; }
  .hb-wi12-wide { grid-column: auto; }
  .hb-wi12-months { margin-left: 0; width: 100%; }
  .hb-wi12-months button { min-width: 0; padding: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi12-pill, .hb-wi12-mk, .hb-wi12-arc, .hb-wi12-fill, .hb-wi12-gr circle:last-child { transition: none !important; }
}
`;

export function DashboardFinancePersonal({
  user = "Sofia Lind",
  appearance = "light",
  accent = "#5b6cff",
  currency = "$",
  months = defaultMonths,
  month,
  defaultMonth,
  onMonthChange,
  categories = defaultCategories,
  goals = defaultGoals,
  bills = defaultBills,
  className,
  style,
  ...rest
}: DashboardFinancePersonalProps) {
  const [mInner, setMInner] = React.useState(defaultMonth ?? months.length - 1);
  const [hot, setHot] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);
  const mi = Math.min(months.length - 1, Math.max(0, month ?? mInner));
  const uid = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const money = (v: number, d = 0) => `${v < 0 ? "−" : ""}${currency}${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

  const spentFor = (m: number) =>
    categories.map((c, ci) => {
      const f = factor[m % factor.length];
      const noise = c.name === "Rent" ? 1 : 0.7 + rnd(m * 53 + ci * 11) * 0.55 * f;
      return Math.round(c.budget * noise);
    });
  const spent = spentFor(mi);
  const totalSpent = spent.reduce((a, b) => a + b, 0);
  const income = 5400 + (mi % 3 === 2 ? 650 : 0);
  const worth = months.map((_, m) => Math.round(48200 + m * 1350 + (rnd(m * 7 + 3) - 0.4) * 2400));
  const nw = worth[mi];
  const prevNw = worth[Math.max(0, mi - 1)];
  const delta = nw - prevNw;
  const wMin = Math.min(...worth) * 0.985;
  const wMax = Math.max(...worth) * 1.01;
  const pts = worth.map((v, i) => [(i / Math.max(1, months.length - 1)) * 100, 100 - ((v - wMin) / (wMax - wMin)) * 100] as [number, number]);
  const nwLine = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  const monthName = months[mi];
  const days = monthLen[monthName] ?? 30;
  const start = monthStart[monthName] ?? 0;
  const isLast = mi === months.length - 1;
  const today = isLast ? 8 : days + 1;
  const goalScale = 0.55 + (mi / Math.max(1, months.length - 1)) * 0.45;

  const R = 56;
  const C = 2 * Math.PI * R;
  const arcs = categories.map((c, i) => {
    const frac = spent[i] / Math.max(1, totalSpent);
    const before = spent.slice(0, i).reduce((a, b) => a + b, 0) / Math.max(1, totalSpent);
    const len = Math.max(0, frac * C - 2.5);
    return { c, len, off: -before * C, value: spent[i] };
  });
  const hotArc = arcs.find((a) => a.c.name === hot);

  const setMonth = (i: number) => {
    if (month === undefined) setMInner(i);
    onMonthChange?.(i);
  };

  return (
    <div
      {...rest}
      className={["hb-wi12", className].filter(Boolean).join(" ")}
      data-appearance={appearance}
      style={{ ...style, ["--hb-wi12-a" as string]: accent, ["--hb-wi12-n" as string]: months.length, ["--hb-wi12-i" as string]: mi } as React.CSSProperties}
    >
      <style href="hb-dashboard-finance-personal" precedence="default">{css}</style>
      <div className="hb-wi12-top">
        <div className="hb-wi12-hi">
          <b>Good morning, {user.split(" ")[0]}</b>
          <span>
            {money(income - totalSpent)} left over in {monthName} after {money(totalSpent)} of spending
          </span>
        </div>
        <div
          className="hb-wi12-months"
          role="group"
          aria-label="Month"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              const next = Math.min(months.length - 1, Math.max(0, mi + (e.key === "ArrowRight" ? 1 : -1)));
              setMonth(next);
              (e.currentTarget.querySelectorAll("button")[next] as HTMLButtonElement | undefined)?.focus();
            }
          }}
        >
          <span className="hb-wi12-pill" aria-hidden="true" />
          {months.map((m, i) => (
            <button key={m} type="button" aria-pressed={i === mi} onClick={() => setMonth(i)}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="hb-wi12-grid">
        <section className="hb-wi12-card hb-wi12-nw" aria-label="Net worth">
          <div className="hb-wi12-ch">
            <b>Net worth</b>
            <span>End of {monthName}</span>
          </div>
          <strong>{money(nw)}</strong>
          <span className="hb-wi12-chg" data-up={delta >= 0}>
            {delta >= 0 ? "▲" : "▼"} {money(Math.abs(delta))} vs {months[Math.max(0, mi - 1)]}
          </span>
          <div className="hb-wi12-nwc">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-labelledby={`${uid}-nw`}>
              <title id={`${uid}-nw`}>{`Net worth from ${money(worth[0])} in ${months[0]} to ${money(worth[worth.length - 1])} in ${months[months.length - 1]}`}</title>
              <defs>
                <linearGradient id={`${uid}-ng`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={accent} stopOpacity="0.22" />
                  <stop offset="1" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${nwLine} L100 100 L0 100 Z`} fill={`url(#${uid}-ng)`} />
              <path className="hb-wi12-nwl" d={nwLine} />
            </svg>
            <span className="hb-wi12-mk" style={{ left: `${pts[mi][0].toFixed(2)}%`, top: `${pts[mi][1].toFixed(2)}%` }} />
          </div>
          <div className="hb-wi12-split">
            <div>
              <small>Income</small>
              <b>{money(income)}</b>
            </div>
            <div>
              <small>Spent</small>
              <b>{money(totalSpent)}</b>
            </div>
          </div>
        </section>
        <section className="hb-wi12-card" aria-label="Spending by category">
          <div className="hb-wi12-ch">
            <b>Where it went</b>
            <span>{monthName}</span>
          </div>
          <div className="hb-wi12-donut">
            <div className="hb-wi12-ring" data-hot={hot !== null}>
              <svg viewBox="0 0 140 140" role="img" aria-labelledby={`${uid}-sp`}>
                <title id={`${uid}-sp`}>{`Spending ${money(totalSpent)}: ${arcs.map((a) => `${a.c.name} ${money(a.value)}`).join(", ")}`}</title>
                <circle cx="70" cy="70" r={R} fill="none" stroke="var(--hb-wi12-soft)" strokeWidth="16" />
                {arcs.map((a) => (
                  <circle
                    key={a.c.name}
                    className="hb-wi12-arc"
                    cx="70"
                    cy="70"
                    r={R}
                    stroke={a.c.color}
                    data-on={hot === a.c.name}
                    strokeDasharray={`${(ready ? a.len : 0).toFixed(2)} ${C.toFixed(2)}`}
                    strokeDashoffset={a.off.toFixed(2)}
                    onPointerEnter={() => setHot(a.c.name)}
                    onPointerLeave={() => setHot(null)}
                  />
                ))}
              </svg>
              <div className="hb-wi12-rc">
                <small>{hotArc ? hotArc.c.name : "Total"}</small>
                <b>{money(hotArc ? hotArc.value : totalSpent)}</b>
                {hotArc ? <small>{Math.round((hotArc.value / totalSpent) * 100)}%</small> : null}
              </div>
            </div>
            <ul className="hb-wi12-legend">
              {arcs.map((a) => (
                <li key={a.c.name} data-on={hot === a.c.name} onPointerEnter={() => setHot(a.c.name)} onPointerLeave={() => setHot(null)}>
                  <i style={{ background: a.c.color }} />
                  <span>{a.c.name}</span>
                  <b>{money(a.value)}</b>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="hb-wi12-card" aria-label="Budgets">
          <div className="hb-wi12-ch">
            <b>Budgets</b>
            <span>{categories.filter((c, i) => spent[i] > c.budget).length} over</span>
          </div>
          <ul className="hb-wi12-env">
            {categories.map((c, i) => {
              const over = spent[i] > c.budget;
              const pct = Math.min(100, (spent[i] / c.budget) * 100);
              return (
                <li key={c.name}>
                  <p>
                    {c.name}
                    <span data-over={over}>
                      <b>{money(spent[i])}</b> / {money(c.budget)}
                    </span>
                  </p>
                  <div className="hb-wi12-track" role="progressbar" aria-label={`${c.name} budget`} aria-valuemin={0} aria-valuemax={c.budget} aria-valuenow={spent[i]}>
                    <div className="hb-wi12-fill" data-over={over} style={{ width: `${(ready ? pct : 0).toFixed(1)}%`, background: c.color }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="hb-wi12-card" aria-label="Upcoming bills">
          <div className="hb-wi12-ch">
            <b>Bills</b>
            <span>{money(bills.reduce((a, b) => a + b.amount, 0))} this month</span>
          </div>
          <div className="hb-wi12-cal" aria-hidden="true">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={`h${i}`} data-h="true">
                {d}
              </span>
            ))}
            {Array.from({ length: start }, (_, i) => (
              <span key={`e${i}`} />
            ))}
            {Array.from({ length: days }, (_, i) => (
              <span key={i} data-bill={bills.some((b) => b.day === i + 1)} data-today={isLast && i + 1 === today}>
                {i + 1}
              </span>
            ))}
          </div>
          <ul className="hb-wi12-bills">
            {bills.slice(0, 4).map((b) => (
              <li key={b.name} data-paid={b.day < today}>
                <time>
                  {monthName} {b.day}
                </time>
                <span>{b.name}</span>
                {b.auto ? <em>Auto</em> : null}
                <b>{money(b.amount)}</b>
              </li>
            ))}
          </ul>
        </section>
        <section className="hb-wi12-card hb-wi12-wide" aria-label="Savings goals">
          <div className="hb-wi12-ch">
            <b>Savings goals</b>
            <span>{money(Math.round(goals.reduce((a, g) => a + g.saved * goalScale, 0)))} saved</span>
          </div>
          <div className="hb-wi12-goals">
            {goals.map((g) => {
              const saved = Math.round(g.saved * goalScale);
              const frac = Math.min(1, saved / g.target);
              const r = 30;
              const c = 2 * Math.PI * r;
              return (
                <div key={g.name} className="hb-wi12-goal">
                  <div className="hb-wi12-gr" role="img" aria-label={`${g.name}: ${money(saved)} of ${money(g.target)}`}>
                    <svg viewBox="0 0 74 74">
                      <circle cx="37" cy="37" r={r} fill="none" stroke="var(--hb-wi12-soft)" strokeWidth="7" />
                      <circle cx="37" cy="37" r={r} fill="none" stroke={g.color} strokeWidth="7" strokeLinecap="round" strokeDasharray={c.toFixed(2)} strokeDashoffset={(c * (1 - (ready ? frac : 0))).toFixed(2)} />
                    </svg>
                    <b>{Math.round(frac * 100)}%</b>
                  </div>
                  <span>{g.name}</span>
                  <small>
                    {money(saved)} of {money(g.target)}
                  </small>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

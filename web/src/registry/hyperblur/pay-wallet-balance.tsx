"use client";

import * as React from "react";

export interface PayWalletActivity {
  id: string;
  label: string;
  time: string;
  amount: number;
}

export interface PayWalletBalanceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  balance?: number;
  currency?: string;
  name?: string;
  topUps?: number[];
  activity?: PayWalletActivity[];
  maxActivity?: number;
  optimistic?: boolean;
  onTopUp?: (amount: number) => void;
  hidden?: boolean;
  defaultHidden?: boolean;
  onHiddenChange?: (hidden: boolean) => void;
  accent?: string;
}

const defaultActivity: PayWalletActivity[] = [
  { id: "a1", label: "Corner Bakery", time: "Today, 8:14", amount: -640 },
  { id: "a2", label: "Salary, Halden Labs", time: "Yesterday", amount: 184000 },
  { id: "a3", label: "Metro monthly pass", time: "Oct 30", amount: -7800 },
];

const css = `
.hb-qfc {
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}
.hb-qfc *, .hb-qfc *::before, .hb-qfc *::after { box-sizing: border-box; }
.hb-qfc-card { position: relative; padding: 12px 14px 10px; overflow: hidden; background: #111111; border: 1px solid #262626; border-radius: 14px; }
.hb-qfc-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 112px;
  pointer-events: none;
  background:
    radial-gradient(90% 120% at 0% 0%, color-mix(in srgb, var(--hb-qfc-x) 30%, transparent), transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent);
}
.hb-qfc-top { position: relative; display: flex; align-items: center; justify-content: space-between; }
.hb-qfc-name { display: inline-flex; align-items: center; gap: 7px; color: #b5b5b5; font-size: 12px; font-weight: 500; }
.hb-qfc-name svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-qfc-eye {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: -4px -4px -4px 0;
  padding: 0;
  color: #a1a1a1;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}
.hb-qfc-eye:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }
.hb-qfc-eye:focus-visible { outline: 2px solid var(--hb-qfc-x); outline-offset: 1px; }
.hb-qfc-eye svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-qfc-eye .hb-qfc-slash { stroke-dasharray: 1 1.2; stroke-dashoffset: 1; transition: stroke-dashoffset 0.3s ease; }
.hb-qfc[data-hidden="true"] .hb-qfc-slash { stroke-dashoffset: 0; }
.hb-qfc-bal {
  position: relative;
  margin: 2px 0 0;
  font-size: 32px;
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  transition: filter 0.35s ease, opacity 0.35s ease;
}
.hb-qfc-bal small { color: #8f8f8f; font-size: 17px; font-weight: 500; letter-spacing: 0; }
.hb-qfc[data-hidden="true"] .hb-qfc-bal { opacity: 0.6; filter: blur(9px); user-select: none; -webkit-user-select: none; }
.hb-qfc-ups { position: relative; display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.hb-qfc-ups > span { margin-right: 2px; color: #8f8f8f; font-size: 12px; }
.hb-qfc-chip {
  margin: 0;
  padding: 0 11px;
  height: 28px;
  color: #ededed;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease;
}
.hb-qfc-chip:hover { background: color-mix(in srgb, var(--hb-qfc-x) 24%, transparent); border-color: var(--hb-qfc-x); }
.hb-qfc-chip:active { transform: scale(0.94); }
.hb-qfc-chip:focus-visible { outline: 2px solid var(--hb-qfc-x); outline-offset: 2px; }
.hb-qfc-sec { position: relative; margin: 10px 0 2px; color: #8f8f8f; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-qfc-list { position: relative; display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-qfc-row { display: flex; align-items: center; gap: 10px; min-height: 30px; border-top: 1px solid #1f1f1f; }
.hb-qfc-row:first-child { border-top: 0; }
.hb-qfc-row[data-new="true"] { animation: hb-qfc-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hb-qfc-av { display: grid; flex: none; place-items: center; width: 22px; height: 22px; color: #fff; font-size: 10.5px; font-weight: 700; border-radius: 50%; }
.hb-qfc-tx { display: flex; min-width: 0; flex: 1; align-items: baseline; gap: 8px; }
.hb-qfc-tx b { overflow: hidden; font-size: 12.5px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-qfc-tx span { flex: none; color: #6f6f6f; font-size: 11.5px; }
.hb-qfc-am { flex: none; font-size: 12.5px; font-variant-numeric: tabular-nums; transition: filter 0.35s ease, opacity 0.35s ease; }
.hb-qfc-am[data-sign="plus"] { color: #3ddc97; }
.hb-qfc[data-hidden="true"] .hb-qfc-am { opacity: 0.6; filter: blur(6px); user-select: none; -webkit-user-select: none; }
.hb-qfc-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-qfc-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qfc-bal, .hb-qfc-am, .hb-qfc-chip, .hb-qfc-eye, .hb-qfc-slash { transition: none; }
  .hb-qfc-row[data-new="true"] { animation: none; }
}
`;

const tints = ["#3b6dff", "#a05bff", "#14b8a6", "#f97316", "#ec4899", "#0ea5e9"];

function tintFor(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return tints[h % tints.length];
}

function split(cents: number) {
  const abs = Math.abs(Math.round(cents));
  return {
    whole: Math.floor(abs / 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    frac: (abs % 100).toString().padStart(2, "0"),
  };
}

function money(cents: number, currency: string) {
  const { whole, frac } = split(cents);
  return `${currency}${whole}.${frac}`;
}

function CountUp({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const shown = React.useRef(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (v: number) => {
      shown.current = v;
      const { whole, frac } = split(v);
      el.textContent = `${whole}.${frac}`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(value);
      return;
    }
    const from = shown.current;
    const span = Math.max(500, Math.min(1400, Math.abs(value - from) / 120));
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / span);
      const eased = 1 - Math.pow(1 - p, 3);
      write(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span ref={ref}>0.00</span>;
}

export function PayWalletBalance({
  balance = 248650,
  currency = "$",
  name = "Main wallet",
  topUps = [2500, 5000, 10000],
  activity = defaultActivity,
  maxActivity = 3,
  optimistic = true,
  onTopUp,
  hidden,
  defaultHidden = false,
  onHiddenChange,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayWalletBalanceProps) {
  const [innerHidden, setInnerHidden] = React.useState(defaultHidden);
  const [added, setAdded] = React.useState(0);
  const [extra, setExtra] = React.useState<PayWalletActivity[]>([]);
  const isHidden = hidden ?? innerHidden;
  const total = balance + added;
  const rows = [...extra, ...activity].slice(0, Math.max(1, maxActivity));

  function toggle() {
    const next = !isHidden;
    if (hidden === undefined) setInnerHidden(next);
    onHiddenChange?.(next);
  }

  function topUp(amount: number) {
    onTopUp?.(amount);
    if (!optimistic) return;
    setAdded((a) => a + amount);
    setExtra((list) => [{ id: `top-${list.length}`, label: "Top up", time: "Just now", amount }, ...list].slice(0, 6));
  }

  const vars = { "--hb-qfc-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qfc ${className}`} style={vars} data-hidden={isHidden} {...rest}>
      <style href="hb-pay-wallet-balance" precedence="default">{css}</style>
      <div className="hb-qfc-card">
        <div className="hb-qfc-top">
          <span className="hb-qfc-name">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
              <rect x="3.5" y="8" width="17" height="11" rx="2.5" />
              <circle cx="16.5" cy="13.5" r="1" />
            </svg>
            {name}
          </span>
          <button
            type="button"
            className="hb-qfc-eye"
            aria-pressed={isHidden}
            aria-label={isHidden ? "Show balance" : "Hide balance"}
            onClick={toggle}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
              <circle cx="12" cy="12" r="2.8" />
              <path className="hb-qfc-slash" d="M4 4l16 16" pathLength="1" />
            </svg>
          </button>
        </div>
        <p className="hb-qfc-bal" aria-hidden={isHidden}>
          <small>{currency}</small>
          <CountUp value={total} />
        </p>
        <span className="hb-qfc-sr" role="status">
          {isHidden ? "Balance hidden" : `Balance ${money(total, currency)}`}
        </span>
        {topUps.length > 0 && (
          <div className="hb-qfc-ups">
            <span>Top up</span>
            {topUps.map((amount) => (
              <button key={amount} type="button" className="hb-qfc-chip" onClick={() => topUp(amount)}>
                +{money(amount, currency).replace(/\.00$/, "")}
              </button>
            ))}
          </div>
        )}
        <p className="hb-qfc-sec">Recent activity</p>
        <ul className="hb-qfc-list">
          {rows.map((row) => (
            <li key={row.id} className="hb-qfc-row" data-new={row.id.startsWith("top-")}>
              <span className="hb-qfc-av" aria-hidden="true" style={{ background: tintFor(row.label) }}>
                {row.label.charAt(0).toUpperCase()}
              </span>
              <span className="hb-qfc-tx">
                <b>{row.label}</b>
                <span>{row.time}</span>
              </span>
              <span className="hb-qfc-am" data-sign={row.amount >= 0 ? "plus" : "minus"} aria-hidden={isHidden}>
                {row.amount >= 0 ? "+" : "-"}
                {money(row.amount, currency)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

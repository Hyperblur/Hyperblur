"use client";

import * as React from "react";

export interface PricingSeatBand {
  upTo: number | null;
  price: number;
}

export interface PricingSeatStepperProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  bands?: PricingSeatBand[];
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (seats: number, monthly: number) => void;
  names?: string[];
  currency?: string;
  locale?: string;
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultBands: PricingSeatBand[] = [
  { upTo: 10, price: 16 },
  { upTo: 25, price: 14 },
  { upTo: 50, price: 12 },
  { upTo: 100, price: 10 },
  { upTo: null, price: 8 },
];

const defaultNames = [
  "Maya Chen", "Leo Brandt", "Ana Souza", "Omar Haddad", "Ivy Park", "Noah Reyes", "Sara Lind", "Kai Tanaka",
  "Zoe Martin", "Eli Novak", "Rosa Diaz", "Theo Laurent", "Nina Popov", "Jonah Weiss", "Lia Moreau", "Sam Okafor",
  "Ada Kowal", "Ravi Shah", "Mila Costa", "Ben Arendt", "Yara Nasser", "Finn Doyle", "Iris Vance", "Tom Becker",
];

const hues = [212, 262, 152, 28, 338, 190, 46, 286];
const AVATARS = 21;

const css = `
.hb-vh9 {
  --hb-vh9-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh9 *, .hb-vh9 *::before, .hb-vh9 *::after { box-sizing: border-box; }
.hb-vh9-inner { max-width: 1040px; margin: 0 auto; padding: 64px 20px; }
.hb-vh9-head { display: grid; gap: 10px; max-width: 600px; }
.hb-vh9-eyebrow { margin: 0; color: #8f8f8f; font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-vh9-title { margin: 0; font-size: clamp(28px, 4.4cqi, 42px); font-weight: 650; line-height: 1.08; letter-spacing: -.03em; text-wrap: balance; }
.hb-vh9-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-vh9-card {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 34px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, #121214, #0c0c0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  overflow: hidden;
}
@container (min-width: 780px) { .hb-vh9-card { grid-template-columns: 1.15fr 1fr; } }
.hb-vh9-left { padding: 26px; }
.hb-vh9-right { display: flex; flex-direction: column; padding: 26px; border-top: 1px solid rgba(255, 255, 255, .07); }
@container (min-width: 780px) { .hb-vh9-right { border-top: 0; border-left: 1px solid rgba(255, 255, 255, .07); } }
.hb-vh9-ctl { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.hb-vh9-ctl label { color: #a1a1a1; font-size: 14px; font-weight: 500; }
.hb-vh9-stepper { display: inline-flex; align-items: center; padding: 4px; border-radius: 14px; background: #19191c; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08); }
.hb-vh9-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: #242428;
  color: #ededed;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
  touch-action: manipulation;
  user-select: none;
  transition: background-color .2s ease, transform .15s cubic-bezier(.34, 1.56, .64, 1), opacity .2s ease;
}
.hb-vh9-btn svg { width: 14px; height: 14px; }
.hb-vh9-btn:hover { background: #2e2e33; }
.hb-vh9-btn:active { transform: scale(.9); }
.hb-vh9-btn:disabled { opacity: .35; cursor: default; transform: none; }
.hb-vh9-btn:focus-visible { outline: 2px solid var(--hb-vh9-accent); outline-offset: 2px; }
.hb-vh9-num {
  width: 72px;
  height: 38px;
  border: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 20px;
  font-weight: 650;
  text-align: center;
  font-variant-numeric: tabular-nums;
  outline: none;
  -moz-appearance: textfield;
  appearance: textfield;
}
.hb-vh9-num::-webkit-inner-spin-button, .hb-vh9-num::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.hb-vh9-num:focus-visible { border-radius: 8px; box-shadow: 0 0 0 2px var(--hb-vh9-accent); }
.hb-vh9-team { display: flex; flex-wrap: wrap; gap: 0; min-height: 76px; margin-top: 22px; padding-left: 8px; align-content: flex-start; }
.hb-vh9-av {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0 0 4px -8px;
  border-radius: 999px;
  border: 2px solid #111113;
  background: linear-gradient(135deg, hsl(var(--h) 70% 62%), hsl(var(--h) 60% 38%));
  color: #fff;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .02em;
  animation: hb-vh9-pop .45s cubic-bezier(.34, 1.7, .5, 1) both;
}
@keyframes hb-vh9-pop { from { opacity: 0; transform: scale(.2) translateY(8px); } to { opacity: 1; transform: none; } }
.hb-vh9-more { background: #232326; color: #a1a1a1; font-size: 10.5px; }
.hb-vh9-chart { position: relative; margin-top: 18px; }
.hb-vh9-chart svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-vh9-step { fill: rgba(255, 255, 255, .035); transition: fill .3s ease; }
.hb-vh9-step[data-on="true"] { fill: color-mix(in srgb, var(--hb-vh9-accent) 22%, transparent); }
.hb-vh9-edge { fill: none; stroke: #3a3a40; stroke-width: 1.5; }
.hb-vh9-edge-on { fill: none; stroke: var(--hb-vh9-accent); stroke-width: 2; }
.hb-vh9-blabel { fill: #6f6f6f; font-size: 10px; font-family: var(--font-mono), ui-monospace, monospace; }
.hb-vh9-bprice { fill: #a1a1a1; font-size: 11px; font-weight: 600; }
.hb-vh9-step[data-on="true"] + .hb-vh9-bprice, .hb-vh9-bprice[data-on="true"] { fill: #fff; }
.hb-vh9-dot { fill: #fff; stroke: var(--hb-vh9-accent); stroke-width: 3; transition: cx .45s cubic-bezier(.22, 1, .36, 1), cy .45s cubic-bezier(.22, 1, .36, 1); }
.hb-vh9-halo { fill: var(--hb-vh9-accent); opacity: .25; transition: cx .45s cubic-bezier(.22, 1, .36, 1), cy .45s cubic-bezier(.22, 1, .36, 1); animation: hb-vh9-pulse 2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes hb-vh9-pulse { 0%, 100% { transform: scale(1); opacity: .25; } 50% { transform: scale(1.6); opacity: .08; } }
.hb-vh9-per { color: #8f8f8f; font-size: 13px; }
.hb-vh9-per-row { display: flex; align-items: baseline; gap: 10px; margin-top: 6px; }
.hb-vh9-per-row strong { font-size: 40px; font-weight: 650; letter-spacing: -.04em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-vh9-per-row s { color: #6f6f6f; font-size: 15px; text-decoration-color: #f87171; text-decoration-thickness: 1.5px; font-variant-numeric: tabular-nums; }
.hb-vh9-per-row span { color: #8f8f8f; font-size: 13px; }
.hb-vh9-lines { display: grid; gap: 0; margin: 20px 0 0; padding: 0; list-style: none; }
.hb-vh9-lines li { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, .06); color: #a1a1a1; font-size: 13.5px; font-variant-numeric: tabular-nums; }
.hb-vh9-lines li b { color: #ededed; font-weight: 600; }
.hb-vh9-lines li[data-save="true"] b { color: #6ee7b7; }
.hb-vh9-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-vh9-accent) 9%, transparent);
  color: #c4c4c4;
  font-size: 12.5px;
  line-height: 1.4;
}
.hb-vh9-hint svg { flex: none; width: 15px; height: 15px; color: var(--hb-vh9-accent); }
.hb-vh9-hint b { color: #fff; font-weight: 600; }
.hb-vh9-hint button { margin-left: auto; padding: 0; border: 0; background: none; color: color-mix(in srgb, var(--hb-vh9-accent) 50%, #fff); font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.hb-vh9-hint button:focus-visible { outline: 2px solid var(--hb-vh9-accent); outline-offset: 2px; border-radius: 4px; }
.hb-vh9-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  margin-top: auto;
  border-radius: 13px;
  background: var(--hb-vh9-accent);
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 12px 26px -12px var(--hb-vh9-accent);
  transition: filter .2s ease, transform .15s ease;
}
.hb-vh9-ctawrap { display: flex; flex-direction: column; flex: 1; justify-content: flex-end; margin-top: 18px; }
.hb-vh9-cta:hover { filter: brightness(1.1); }
.hb-vh9-cta:active { transform: scale(.985); }
.hb-vh9-cta:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh9 *, .hb-vh9 *::before, .hb-vh9 *::after { animation: none !important; transition: none !important; }
}
`;

function bandFor(bands: PricingSeatBand[], seats: number) {
  const i = bands.findIndex((b) => b.upTo === null || seats <= b.upTo);
  return i === -1 ? bands.length - 1 : i;
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0] ?? "").join("").slice(0, 2).toUpperCase();
}

export function PricingSeatStepper({
  eyebrow = "Team pricing",
  title = "Add your whole team. Every seat gets cheaper.",
  subtitle = "One price per seat, set by the size of your team. Cross a break and every seat drops to the lower rate, not just the new ones.",
  bands = defaultBands,
  min = 1,
  max = 500,
  value,
  defaultValue = 18,
  onChange,
  names = defaultNames,
  currency = "USD",
  locale = "en-US",
  cta = { label: "Start your team trial", href: "#" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingSeatStepperProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const [draft, setDraft] = React.useState<string | null>(null);
  const seats = Math.max(min, Math.min(max, value ?? inner));
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const seatsRef = React.useRef(seats);

  React.useEffect(() => {
    seatsRef.current = seats;
  }, [seats]);

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );
  const num = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const bi = bandFor(bands, seats);
  const band = bands[bi];
  const list = bands[0]?.price ?? band.price;
  const monthly = seats * band.price;
  const saved = seats * (list - band.price);
  const next = bands[bi + 1];
  const nextAt = band.upTo !== null ? band.upTo + 1 : null;

  const set = React.useCallback(
    (n: number) => {
      const v = Math.max(min, Math.min(max, Math.round(n)));
      if (value === undefined) setInner(v);
      const b = bands[bandFor(bands, v)];
      onChange?.(v, v * b.price);
    },
    [min, max, value, bands, onChange],
  );

  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const hold = (d: number) => {
    stop();
    set(seatsRef.current + d);
    seatsRef.current = Math.max(min, Math.min(max, seatsRef.current + d));
    let delay = 380;
    let count = 0;
    const tick = () => {
      count += 1;
      const step = count > 14 ? 5 : 1;
      const nv = Math.max(min, Math.min(max, seatsRef.current + d * step));
      if (nv === seatsRef.current) { stop(); return; }
      set(nv);
      seatsRef.current = nv;
      delay = Math.max(50, delay * 0.8);
      timer.current = setTimeout(tick, delay);
    };
    timer.current = setTimeout(tick, delay);
  };

  React.useEffect(() => stop, []);

  const W = 420;
  const H = 120;
  const pad = 6;
  const finite = bands.map((b, i) => b.upTo ?? Math.round((bands[i - 1]?.upTo ?? 10) * 2));
  const cap = finite[finite.length - 1];
  const sx = (s: number) => pad + (Math.log(Math.min(s, cap) + 1) / Math.log(cap + 1)) * (W - pad * 2);
  const maxP = Math.max(...bands.map((b) => b.price));
  const sy = (p: number) => 24 + (1 - p / maxP) * (H - 52);
  const starts = bands.map((_, i) => (i === 0 ? 0 : finite[i - 1]));
  const path = bands
    .map((b, i) => `${i === 0 ? "M" : "L"}${sx(starts[i]).toFixed(1)} ${sy(b.price).toFixed(1)} L${sx(finite[i]).toFixed(1)} ${sy(b.price).toFixed(1)}`)
    .join(" ");
  const onPath = bands
    .slice(0, bi + 1)
    .map((b, i) => {
      const end = i === bi ? Math.min(seats, finite[i]) : finite[i];
      return `${i === 0 ? "M" : "L"}${sx(starts[i]).toFixed(1)} ${sy(b.price).toFixed(1)} L${sx(end).toFixed(1)} ${sy(b.price).toFixed(1)}`;
    })
    .join(" ");
  const dx = sx(seats).toFixed(1);
  const dy = sy(band.price).toFixed(1);

  const shown = Math.min(seats, AVATARS);
  const extra = seats - shown;

  return (
    <section className={`hb-vh9 ${className}`} style={{ "--hb-vh9-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-pricing-seat-stepper" precedence="default">{css}</style>
      <div className="hb-vh9-inner">
        <div className="hb-vh9-head">
          {eyebrow ? <p className="hb-vh9-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-vh9-title">{title}</h2>
          {subtitle ? <p className="hb-vh9-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-vh9-card">
          <div className="hb-vh9-left">
            <div className="hb-vh9-ctl">
              <label htmlFor={`${uid}-n`}>Seats on your team</label>
              <div className="hb-vh9-stepper">
                <button
                  type="button"
                  className="hb-vh9-btn"
                  aria-label="Remove a seat"
                  disabled={seats <= min}
                  onPointerDown={(e) => { if (e.button === 0) hold(-1); }}
                  onPointerUp={stop}
                  onPointerLeave={stop}
                  onPointerCancel={stop}
                  onClick={(e) => { if (e.detail === 0) set(seats - 1); }}
                >
                  <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
                <input
                  id={`${uid}-n`}
                  className="hb-vh9-num"
                  type="number"
                  inputMode="numeric"
                  min={min}
                  max={max}
                  value={draft ?? String(seats)}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    const n = Number(e.target.value);
                    if (e.target.value !== "" && Number.isFinite(n)) set(n);
                  }}
                  onBlur={() => setDraft(null)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp") { e.preventDefault(); setDraft(null); set(seats + (e.shiftKey ? 10 : 1)); }
                    if (e.key === "ArrowDown") { e.preventDefault(); setDraft(null); set(seats - (e.shiftKey ? 10 : 1)); }
                  }}
                />
                <button
                  type="button"
                  className="hb-vh9-btn"
                  aria-label="Add a seat"
                  disabled={seats >= max}
                  onPointerDown={(e) => { if (e.button === 0) hold(1); }}
                  onPointerUp={stop}
                  onPointerLeave={stop}
                  onPointerCancel={stop}
                  onClick={(e) => { if (e.detail === 0) set(seats + 1); }}
                >
                  <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7h8M7 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>
            <div className="hb-vh9-team" aria-hidden="true">
              {Array.from({ length: shown }, (_, i) => {
                const name = names[i % Math.max(1, names.length)] ?? "Team member";
                return (
                  <span key={i} className="hb-vh9-av" style={{ "--h": hues[i % hues.length], zIndex: AVATARS - i } as React.CSSProperties} title={name}>
                    {initials(name)}
                  </span>
                );
              })}
              {extra > 0 ? <span key={`more-${extra > 99 ? "x" : extra}`} className="hb-vh9-av hb-vh9-more">+{extra > 99 ? "99" : extra}</span> : null}
            </div>
            <div className="hb-vh9-chart">
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Price per seat drops from ${money.format(list)} to ${money.format(bands[bands.length - 1].price)} as the team grows`}>
                {bands.map((b, i) => (
                  <g key={i}>
                    <rect
                      className="hb-vh9-step"
                      data-on={i === bi ? "true" : undefined}
                      x={sx(starts[i]).toFixed(1)}
                      y={sy(b.price).toFixed(1)}
                      width={Math.max(0, sx(finite[i]) - sx(starts[i]) - 2).toFixed(1)}
                      height={(H - 22 - sy(b.price)).toFixed(1)}
                      rx="3"
                    />
                    <text className="hb-vh9-bprice" data-on={i === bi ? "true" : undefined} x={((sx(starts[i]) + sx(finite[i])) / 2).toFixed(1)} y={(sy(b.price) - 7).toFixed(1)} textAnchor="middle">
                      {money.format(b.price)}
                    </text>
                    <text className="hb-vh9-blabel" x={((sx(starts[i]) + sx(finite[i])) / 2).toFixed(1)} y={H - 6} textAnchor="middle">
                      {b.upTo === null ? `${num.format(starts[i] + 1)}+` : `${num.format(starts[i] + 1)}-${num.format(b.upTo)}`}
                    </text>
                  </g>
                ))}
                <path className="hb-vh9-edge" d={path} />
                <path className="hb-vh9-edge-on" d={onPath} />
                <circle className="hb-vh9-halo" cx={dx} cy={dy} r="9" />
                <circle className="hb-vh9-dot" cx={dx} cy={dy} r="5" />
              </svg>
            </div>
          </div>
          <div className="hb-vh9-right">
            <span className="hb-vh9-per">Price per seat</span>
            <div className="hb-vh9-per-row" aria-live="polite">
              <strong>{money.format(band.price)}</strong>
              {band.price < list ? <s>{money.format(list)}</s> : null}
              <span>/ month</span>
            </div>
            <ul className="hb-vh9-lines">
              <li><span>{num.format(seats)} seats x {money.format(band.price)}</span><b>{money.format(monthly)} / mo</b></li>
              <li data-save={saved > 0 ? "true" : undefined}><span>Volume savings</span><b>{saved > 0 ? `${money.format(saved)} / mo` : `Starts at ${num.format((bands[0]?.upTo ?? 0) + 1)} seats`}</b></li>
              <li><span>Billed yearly</span><b>{money.format(monthly * 12)}</b></li>
            </ul>
            {next && nextAt !== null ? (
              <div className="hb-vh9-hint">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 11l4-4 3 3 4-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>At <b>{num.format(nextAt)} seats</b> every seat drops to <b>{money.format(next.price)}</b>.</span>
                <button type="button" onClick={() => set(nextAt)}>Jump</button>
              </div>
            ) : null}
            <div className="hb-vh9-ctawrap">
              <a className="hb-vh9-cta" href={cta.href}>{cta.label}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

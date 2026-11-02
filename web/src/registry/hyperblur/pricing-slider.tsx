"use client";

import * as React from "react";

export interface PricingSliderTier {
  name: string;
  upTo: number;
  rate: number;
}

export interface PricingSliderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  unit?: string;
  steps?: number[];
  included?: number;
  tiers?: PricingSliderTier[];
  value?: number;
  defaultValue?: number;
  onChange?: (units: number, price: number) => void;
  currency?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  accent?: string;
}

const defaultSteps = [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000, 10000000];

const defaultTiers: PricingSliderTier[] = [
  { name: "Growth", upTo: 100000, rate: 0.5 },
  { name: "Scale", upTo: 1000000, rate: 0.3 },
  { name: "Volume", upTo: 10000000, rate: 0.15 },
];

const css = `
.hb-kc2 {
  --hb-kc2-accent: #10b981;
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
.hb-kc2 *, .hb-kc2 *::before, .hb-kc2 *::after { box-sizing: border-box; }
.hb-kc2::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -260px;
  z-index: -1;
  width: 900px;
  height: 520px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kc2-accent) 20%, transparent), transparent);
  pointer-events: none;
}
.hb-kc2-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc2-head { max-width: 640px; margin: 0 auto; text-align: center; }
.hb-kc2-eyebrow {
  display: inline-block;
  margin: 0 0 16px;
  padding: 5px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kc2-accent) 35%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kc2-accent) 10%, transparent);
  color: color-mix(in srgb, var(--hb-kc2-accent) 55%, #fff);
  font-size: 12.5px;
  font-weight: 600;
}
.hb-kc2-title {
  margin: 0;
  font-size: clamp(30px, 5cqi, 46px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kc2-sub { margin: 14px auto 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc2-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 44px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 24px;
  background: #0f0f0f;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04), 0 30px 80px -40px rgba(0, 0, 0, .9);
}
.hb-kc2-left { padding: 28px 22px 26px; }
.hb-kc2-label { margin: 0; color: #8f8f8f; font-size: 13px; font-weight: 550; }
.hb-kc2-units { display: flex; align-items: baseline; gap: 8px; margin: 6px 0 0; }
.hb-kc2-units strong { font-size: clamp(30px, 5cqi, 40px); font-weight: 650; letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
.hb-kc2-units span { color: #8f8f8f; font-size: 14px; }
.hb-kc2-track { position: relative; margin: 46px 0 0; padding: 0 0 46px; }
.hb-kc2-bubble {
  position: absolute;
  top: -34px;
  left: calc(var(--hb-kc2-p) * (100% - 24px) / 100 + 12px);
  padding: 3px 8px;
  border-radius: 6px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
  transform: translateX(-50%);
  transition: left .18s cubic-bezier(.2, .8, .2, 1);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.hb-kc2-bubble::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 8px;
  height: 8px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
}
.hb-kc2-range {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 24px;
  margin: 0;
  background: transparent;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}
.hb-kc2-range:focus { outline: none; }
.hb-kc2-range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hb-kc2-accent) 0, color-mix(in srgb, var(--hb-kc2-accent) 60%, #fff) calc(var(--hb-kc2-p) * 1%), #222 calc(var(--hb-kc2-p) * 1%));
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .6);
}
.hb-kc2-range::-moz-range-track {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hb-kc2-accent) 0, color-mix(in srgb, var(--hb-kc2-accent) 60%, #fff) calc(var(--hb-kc2-p) * 1%), #222 calc(var(--hb-kc2-p) * 1%));
}
.hb-kc2-range::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  margin-top: -8px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-kc2-accent) 25%, transparent), 0 4px 12px rgba(0, 0, 0, .6);
  transition: box-shadow .2s ease, transform .2s ease;
  -webkit-appearance: none;
  appearance: none;
}
.hb-kc2-range::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-kc2-accent) 25%, transparent), 0 4px 12px rgba(0, 0, 0, .6);
}
.hb-kc2-range:hover::-webkit-slider-thumb { transform: scale(1.08); }
.hb-kc2-range:active::-webkit-slider-thumb { box-shadow: 0 0 0 10px color-mix(in srgb, var(--hb-kc2-accent) 30%, transparent), 0 4px 12px rgba(0, 0, 0, .6); }
.hb-kc2-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px #0f0f0f, 0 0 0 5px var(--hb-kc2-accent); }
.hb-kc2-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px #0f0f0f, 0 0 0 5px var(--hb-kc2-accent); }
.hb-kc2-marks { position: absolute; left: 12px; right: 12px; top: 0; bottom: 0; pointer-events: none; }
.hb-kc2-mark {
  position: absolute;
  top: 28px;
  left: var(--hb-kc2-x);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  color: #6f6f6f;
  font-size: 11.5px;
  white-space: nowrap;
  transition: color .3s ease;
}
.hb-kc2-mark::before {
  content: "";
  width: 1px;
  height: 8px;
  margin-bottom: 4px;
  background: currentColor;
}
.hb-kc2-mark[data-edge="start"] { align-items: flex-start; transform: translateX(-12px); }
.hb-kc2-mark[data-edge="start"]::before { margin-left: 12px; }
.hb-kc2-mark[data-edge="end"] { align-items: flex-end; transform: translateX(calc(-100% + 12px)); }
.hb-kc2-mark[data-edge="end"]::before { margin-right: 12px; }
.hb-kc2-mark[data-on="true"] { color: #c9c9c9; }
.hb-kc2-mark b { font-weight: 600; }
.hb-kc2-tiers { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 6px 0 0; padding: 0; list-style: none; }
.hb-kc2-tier {
  padding: 12px 12px 11px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 12px;
  background: #121212;
  transition: border-color .3s ease, background-color .3s ease;
}
.hb-kc2-tier[data-on="true"] {
  border-color: color-mix(in srgb, var(--hb-kc2-accent) 40%, transparent);
  background: color-mix(in srgb, var(--hb-kc2-accent) 8%, #121212);
}
.hb-kc2-tier-name { display: flex; align-items: center; gap: 7px; color: #ededed; font-size: 13px; font-weight: 600; }
.hb-kc2-dot { width: 7px; height: 7px; border-radius: 50%; background: #333; transition: background-color .3s ease, box-shadow .3s ease; }
.hb-kc2-tier[data-on="true"] .hb-kc2-dot { background: var(--hb-kc2-accent); box-shadow: 0 0 10px var(--hb-kc2-accent); }
.hb-kc2-tier-rate { margin: 4px 0 0; color: #8f8f8f; font-size: 12px; line-height: 1.4; }
.hb-kc2-right {
  display: flex;
  flex-direction: column;
  padding: 28px 22px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  background:
    radial-gradient(90% 60% at 100% 0%, color-mix(in srgb, var(--hb-kc2-accent) 14%, transparent), transparent 70%),
    #0c0c0c;
}
.hb-kc2-price { display: flex; align-items: flex-end; gap: 6px; margin-top: 8px; }
.hb-kc2-amount {
  display: inline-block;
  font-size: clamp(44px, 7cqi, 60px);
  font-weight: 650;
  line-height: 1;
  letter-spacing: -.045em;
  font-variant-numeric: tabular-nums;
  animation: hb-kc2-pop .45s cubic-bezier(.3, 1.5, .5, 1);
}
.hb-kc2-per { padding-bottom: 7px; color: #8f8f8f; font-size: 14px; }
.hb-kc2-avg { margin: 8px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-kc2-avg b { color: color-mix(in srgb, var(--hb-kc2-accent) 55%, #fff); font-weight: 600; }
.hb-kc2-stack { display: flex; height: 8px; margin: 22px 0 0; overflow: hidden; border-radius: 999px; background: #1c1c1c; }
.hb-kc2-seg { height: 100%; transition: width .5s cubic-bezier(.65, 0, .2, 1); }
.hb-kc2-seg + .hb-kc2-seg { box-shadow: inset 2px 0 0 #0c0c0c; }
.hb-kc2-rows { display: grid; gap: 0; margin: 16px 0 0; padding: 0; list-style: none; }
.hb-kc2-rows li {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, .08);
  color: #c9c9c9;
  font-size: 13px;
  transition: opacity .3s ease;
}
.hb-kc2-rows li[data-on="false"] { opacity: .38; }
.hb-kc2-rows i { width: 10px; height: 10px; border-radius: 3px; }
.hb-kc2-rows small { display: block; margin-top: 2px; color: #6f6f6f; font-size: 11.5px; }
.hb-kc2-rows em { font-style: normal; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kc2-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px; margin-top: auto; padding-top: 22px; }
.hb-kc2-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--hb-kc2-accent);
  color: #04120c;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 10px 30px -12px var(--hb-kc2-accent);
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), filter .25s ease;
}
.hb-kc2-cta:hover { transform: translateY(-1px); filter: brightness(1.08); }
.hb-kc2-cta:focus-visible, .hb-kc2-link:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kc2-link { color: #a1a1a1; font-size: 14px; font-weight: 550; text-decoration: none; transition: color .2s ease; }
.hb-kc2-link:hover { color: #fff; }
@keyframes hb-kc2-pop {
  0% { transform: translateY(6px) scale(.96); opacity: .4; }
  100% { transform: none; opacity: 1; }
}
@container (min-width: 780px) {
  .hb-kc2-inner { padding: 100px 32px 88px; }
  .hb-kc2-panel { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); margin-top: 56px; }
  .hb-kc2-left { padding: 36px 36px 32px; }
  .hb-kc2-right { padding: 36px 34px 32px; border-top: 0; border-left: 1px solid rgba(255, 255, 255, .08); }
  .hb-kc2-tiers { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc2-amount { animation: none; }
  .hb-kc2-bubble, .hb-kc2-seg, .hb-kc2-mark, .hb-kc2-tier, .hb-kc2-dot, .hb-kc2-rows li, .hb-kc2-cta, .hb-kc2-range::-webkit-slider-thumb { transition: none; }
}
`;

const shades = [0.35, 0.6, 0.82, 1];

function group(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function compact(n: number) {
  const trim = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(1));
  if (n >= 1000000) return `${trim(n / 1000000)}M`;
  if (n >= 1000) return `${trim(n / 1000)}k`;
  return String(n);
}

function money(n: number, currency: string) {
  const cents = Math.round(n * 100);
  const whole = Math.floor(cents / 100);
  const rest = cents % 100;
  return rest === 0 ? `${currency}${group(whole)}` : `${currency}${group(whole)}.${String(rest).padStart(2, "0")}`;
}

function nearest(steps: number[], units: number) {
  let best = 0;
  steps.forEach((s, i) => {
    if (Math.abs(s - units) < Math.abs(steps[best] - units)) best = i;
  });
  return best;
}

function breakdown(units: number, included: number, tiers: PricingSliderTier[]) {
  let floor = included;
  return tiers.map((t) => {
    const used = Math.max(0, Math.min(units, t.upTo) - floor);
    const row = { tier: t, from: floor, used, cost: (used / 1000) * t.rate };
    floor = Math.max(floor, t.upTo);
    return row;
  });
}

export function PricingSlider({
  eyebrow = "Usage-based pricing",
  title = "Start free. Scale by the event.",
  subtitle = "No seats, no tiers to outgrow. Move the slider to see exactly what a month of tracking costs.",
  unit = "events",
  steps = defaultSteps,
  included = 10000,
  tiers = defaultTiers,
  value,
  defaultValue = 250000,
  onChange,
  currency = "$",
  cta = { label: "Start with 10k free events", href: "#" },
  secondaryCta = { label: "Talk to sales", href: "#" },
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: PricingSliderProps) {
  const [inner, setInner] = React.useState(() => nearest(steps, defaultValue));
  const index = value === undefined ? inner : nearest(steps, value);
  const units = steps[index] ?? 0;
  const rows = breakdown(units, included, tiers);
  const total = rows.reduce((sum, r) => sum + r.cost, 0);
  const max = Math.max(1, steps.length - 1);
  const pct = (index / max) * 100;
  const avg = units > 0 ? (total / units) * 1000 : 0;
  const shade = (i: number) => `color-mix(in srgb, var(--hb-kc2-accent) ${Math.round(shades[Math.min(i, shades.length - 1)] * 100)}%, #1c1c1c)`;

  const change = (next: number) => {
    const u = steps[next] ?? 0;
    if (value === undefined) setInner(next);
    const cost = breakdown(u, included, tiers).reduce((sum, r) => sum + r.cost, 0);
    onChange?.(u, cost);
  };

  const marks = tiers
    .map((t) => ({ t, i: steps.indexOf(t.upTo) }))
    .filter((m) => m.i > 0 && m.i < max);

  const vars = { "--hb-kc2-accent": accent, "--hb-kc2-p": pct.toFixed(3), ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc2 ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-slider" precedence="default">{css}</style>
      <div className="hb-kc2-inner">
        <div className="hb-kc2-head">
          {eyebrow ? <p className="hb-kc2-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kc2-title">{title}</h2>
          {subtitle ? <p className="hb-kc2-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-kc2-panel">
          <div className="hb-kc2-left">
            <p className="hb-kc2-label">{`Monthly ${unit}`}</p>
            <p className="hb-kc2-units">
              <strong>{group(units)}</strong>
              <span>{`${unit} / month`}</span>
            </p>
            <div className="hb-kc2-track">
              <span className="hb-kc2-bubble" aria-hidden="true">{compact(units)}</span>
              <input
                className="hb-kc2-range"
                type="range"
                min={0}
                max={max}
                step={1}
                value={index}
                aria-label={`Monthly ${unit}`}
                aria-valuetext={`${group(units)} ${unit} per month, ${money(total, currency)} estimated`}
                onChange={(e) => change(Number(e.target.value))}
              />
              <div className="hb-kc2-marks" aria-hidden="true">
                <span className="hb-kc2-mark" data-edge="start" data-on="true" style={{ "--hb-kc2-x": "0%" } as React.CSSProperties}>
                  {compact(steps[0] ?? 0)}
                </span>
                {marks.map((m) => (
                  <span
                    key={m.t.name}
                    className="hb-kc2-mark"
                    data-on={index >= m.i ? "true" : "false"}
                    style={{ "--hb-kc2-x": `${((m.i / max) * 100).toFixed(3)}%` } as React.CSSProperties}
                  >
                    <b>{compact(m.t.upTo)}</b>
                  </span>
                ))}
                <span className="hb-kc2-mark" data-edge="end" data-on={index === max ? "true" : "false"} style={{ "--hb-kc2-x": "100%" } as React.CSSProperties}>
                  {compact(steps[max] ?? 0)}
                </span>
              </div>
            </div>
            <ul className="hb-kc2-tiers">
              <li className="hb-kc2-tier" data-on="true">
                <span className="hb-kc2-tier-name">
                  <span className="hb-kc2-dot" />
                  Free
                </span>
                <p className="hb-kc2-tier-rate">{`First ${compact(included)} ${unit} included`}</p>
              </li>
              {rows.map((r) => (
                <li key={r.tier.name} className="hb-kc2-tier" data-on={r.used > 0 ? "true" : "false"}>
                  <span className="hb-kc2-tier-name">
                    <span className="hb-kc2-dot" />
                    {r.tier.name}
                  </span>
                  <p className="hb-kc2-tier-rate">{`${currency}${r.tier.rate.toFixed(2)} per 1k up to ${compact(r.tier.upTo)}`}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="hb-kc2-right">
            <p className="hb-kc2-label">Estimated monthly cost</p>
            <div className="hb-kc2-price" aria-live="polite">
              <span key={total} className="hb-kc2-amount">{money(total, currency)}</span>
              <span className="hb-kc2-per">/ month</span>
            </div>
            <p className="hb-kc2-avg">
              {total === 0 ? (
                <>Inside the free allowance, <b>no card needed</b></>
              ) : (
                <>
                  Averages <b>{`${currency}${avg.toFixed(2)}`}</b>{` per 1k ${unit}`}
                </>
              )}
            </p>
            <div className="hb-kc2-stack" aria-hidden="true">
              {rows.map((r, i) => (
                <span
                  key={r.tier.name}
                  className="hb-kc2-seg"
                  style={{ width: `${(total > 0 ? (r.cost / total) * 100 : 0).toFixed(2)}%`, background: shade(i + 1) }}
                />
              ))}
            </div>
            <ul className="hb-kc2-rows">
              <li data-on="true">
                <i style={{ background: shade(0) }} />
                <span>
                  {`First ${compact(included)} ${unit}`}
                  <small>Included every month</small>
                </span>
                <em>{money(0, currency)}</em>
              </li>
              {rows.map((r, i) => (
                <li key={r.tier.name} data-on={r.used > 0 ? "true" : "false"}>
                  <i style={{ background: shade(i + 1) }} />
                  <span>
                    {r.tier.name}
                    <small>{r.used > 0 ? `${compact(r.used)} x ${currency}${r.tier.rate.toFixed(2)} per 1k` : `Starts above ${compact(r.from)}`}</small>
                  </span>
                  <em>{r.used > 0 ? money(r.cost, currency) : "-"}</em>
                </li>
              ))}
            </ul>
            <div className="hb-kc2-actions">
              <a className="hb-kc2-cta" href={cta.href}>{cta.label}</a>
              {secondaryCta ? (
                <a className="hb-kc2-link" href={secondaryCta.href}>{secondaryCta.label}</a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

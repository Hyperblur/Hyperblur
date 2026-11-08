"use client";

import * as React from "react";

export interface HeroLiveMetricsAction {
  label: string;
  href: string;
}

export interface HeroLiveMetricsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroLiveMetricsAction | null;
  secondaryCta?: HeroLiveMetricsAction | null;
  baseRevenue?: number;
  currency?: string;
  locale?: string;
  interval?: number;
  accent?: string;
  live?: boolean;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb9 {
  --hb-vb9-accent: #2f7bff;
  --hb-vb9-step: 1400ms;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 640px;
  padding: 56px clamp(16px, 5cqi, 48px) 0;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(80% 60% at 50% 110%, color-mix(in srgb, var(--hb-vb9-accent) 20%, transparent), transparent 70%), #08090b;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-vb9 *, .hb-vb9 *::before, .hb-vb9 *::after { box-sizing: border-box; }
.hb-vb9-in { animation: hb-vb9-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb9-d, 0ms); }
@keyframes hb-vb9-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb9-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  color: rgba(237, 237, 237, .72);
  font-size: 12.5px;
}
.hb-vb9-pulse { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
.hb-vb9-pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #22c55e; animation: hb-vb9-ping 1.6s cubic-bezier(0, 0, .2, 1) infinite; }
@keyframes hb-vb9-ping {
  to { transform: scale(2.8); opacity: 0; }
}
.hb-vb9-title {
  max-width: 760px;
  margin: 16px 0 0;
  color: #f5f5f5;
  font-size: clamp(34px, 5.6cqi, 58px);
  font-weight: 640;
  line-height: 1.03;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb9-sub { max-width: 520px; margin: 14px 0 0; color: rgba(237, 237, 237, .56); font-size: clamp(14.5px, 1.6cqi, 16px); line-height: 1.55; }
.hb-vb9-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 22px; }
.hb-vb9-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 10px;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease;
}
.hb-vb9-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .26); transform: translateY(-1px); }
.hb-vb9-btn:active { transform: scale(.98); }
.hb-vb9-btn:focus-visible { outline: 2px solid var(--hb-vb9-accent); outline-offset: 3px; }
.hb-vb9-btn[data-primary] { border-color: transparent; background: var(--hb-vb9-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 10px 30px -12px var(--hb-vb9-accent); }
.hb-vb9-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-vb9-accent) 88%, #ffffff); }
.hb-vb9-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  width: 100%;
  max-width: 840px;
  margin-top: 36px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .09);
  border-bottom: 0;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(180deg, #111215, #0b0c0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 -20px 80px -30px color-mix(in srgb, var(--hb-vb9-accent) 50%, transparent);
  text-align: left;
}
.hb-vb9-main { min-width: 0; padding: 18px 20px 20px; }
.hb-vb9-label { display: flex; align-items: center; justify-content: space-between; color: rgba(237, 237, 237, .5); font-size: 12px; }
.hb-vb9-range { display: inline-flex; gap: 2px; padding: 2px; border-radius: 7px; background: rgba(255, 255, 255, .05); }
.hb-vb9-range span { padding: 3px 8px; border-radius: 5px; font-size: 11px; }
.hb-vb9-range span:first-child { background: rgba(255, 255, 255, .1); color: #fff; }
.hb-vb9-value {
  margin-top: 6px;
  color: #fafafa;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(28px, 4.4cqi, 40px);
  font-weight: 600;
  letter-spacing: -.03em;
  font-variant-numeric: tabular-nums;
}
.hb-vb9-delta { display: inline-flex; align-items: center; gap: 6px; margin-top: 2px; color: #4ade80; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-vb9-delta span { color: rgba(237, 237, 237, .4); }
.hb-vb9-flash { animation: hb-vb9-flash .9s ease-out; }
@keyframes hb-vb9-flash {
  from { color: color-mix(in srgb, var(--hb-vb9-accent) 50%, #ffffff); }
}
.hb-vb9-chart { display: block; width: 100%; height: auto; margin-top: 12px; overflow: hidden; }
.hb-vb9-shift { animation: hb-vb9-shift var(--hb-vb9-step) linear both; }
@keyframes hb-vb9-shift {
  from { transform: translateX(var(--hb-vb9-dx)); }
  to { transform: translateX(0); }
}
.hb-vb9-side { display: flex; flex-direction: column; min-width: 0; padding: 18px 16px; border-left: 1px solid rgba(255, 255, 255, .06); }
.hb-vb9-side h3 { display: flex; align-items: center; justify-content: space-between; margin: 0 0 10px; color: rgba(237, 237, 237, .5); font-size: 12px; font-weight: 500; }
.hb-vb9-feed { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-vb9-event {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, .05);
  border-radius: 10px;
  background: rgba(255, 255, 255, .02);
  font-size: 12px;
}
.hb-vb9-event:first-child { animation: hb-vb9-drop .6s cubic-bezier(.34, 1.56, .64, 1); border-color: color-mix(in srgb, var(--hb-vb9-accent) 35%, transparent); }
@keyframes hb-vb9-drop {
  from { opacity: 0; transform: translate3d(0, -10px, 0) scale(.97); }
  to { opacity: 1; transform: none; }
}
.hb-vb9-av { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: #fff; font-size: 10.5px; font-weight: 650; }
.hb-vb9-who { overflow: hidden; color: #ededed; white-space: nowrap; text-overflow: ellipsis; }
.hb-vb9-who span { display: block; overflow: hidden; color: rgba(237, 237, 237, .42); font-size: 11px; text-overflow: ellipsis; }
.hb-vb9-amt { color: #4ade80; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; }
.hb-vb9-kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
.hb-vb9-kpi { padding: 10px; border-radius: 10px; background: rgba(255, 255, 255, .03); }
.hb-vb9-kpi b { display: block; color: #fafafa; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-vb9-kpi span { color: rgba(237, 237, 237, .45); font-size: 11px; }
@container (max-width: 680px) {
  .hb-vb9-panel { grid-template-columns: 1fr; }
  .hb-vb9-side { border-left: 0; border-top: 1px solid rgba(255, 255, 255, .06); }
}
@container (max-width: 480px) {
  .hb-vb9-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
  .hb-vb9-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb9-in, .hb-vb9-pulse::after, .hb-vb9-shift, .hb-vb9-event:first-child, .hb-vb9-flash { animation: none; }
  .hb-vb9-btn { transition: none; }
}
`;

function hash(n: number) {
  let x = Math.imul((n >>> 0) + 11, 2246822519);
  x = Math.imul(x ^ (x >>> 15), 3266489917);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

const W = 600;
const H = 170;
const COUNT = 41;
const STEP = (W - 14) / (COUNT - 1);

function sample(i: number) {
  return 52 + Math.sin(i * 0.33) * 14 + Math.sin(i * 0.11 + 1.3) * 10 + hash(i) * 16;
}

const people = [
  { n: "Maya Chen", c: "#6366f1" },
  { n: "Diego Ramos", c: "#f97316" },
  { n: "Aisha Bello", c: "#10b981" },
  { n: "Tom Becker", c: "#0ea5e9" },
  { n: "Lena Novak", c: "#ec4899" },
  { n: "Kenji Ito", c: "#eab308" },
  { n: "Sara Lund", c: "#8b5cf6" },
  { n: "Omar Haddad", c: "#14b8a6" },
];
const plans = [
  { p: "Pro annual", v: 288 },
  { p: "Team monthly", v: 79 },
  { p: "Pro monthly", v: 29 },
  { p: "Business annual", v: 1188 },
  { p: "Seat add-on", v: 12 },
];
const cities = ["Lisbon", "Austin", "Berlin", "Seoul", "Toronto", "Nairobi", "Melbourne", "Bogota"];

function eventAt(i: number) {
  const person = people[Math.floor(hash(i * 7 + 1) * people.length)];
  const plan = plans[Math.floor(hash(i * 13 + 2) * plans.length)];
  const city = cities[Math.floor(hash(i * 5 + 3) * cities.length)];
  return { id: i, name: person.n, color: person.c, plan: plan.p, value: plan.v, city };
}

const defaultPrimary: HeroLiveMetricsAction = { label: "Connect Stripe", href: "#" };
const defaultSecondary: HeroLiveMetricsAction = { label: "Open the live demo", href: "#" };

function d(ms: number) {
  return { "--hb-vb9-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroLiveMetrics({
  eyebrow = "Live now · 1,204 teams watching",
  title = "Watch your revenue move as it happens",
  subtitle = "Pulse streams every charge, upgrade and churn into one calm dashboard, updated the second money moves.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  baseRevenue = 1284392,
  currency = "USD",
  locale = "en-US",
  interval = 1400,
  accent = "#2f7bff",
  live = true,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroLiveMetricsProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/:/g, "");
  const root = React.useRef<HTMLElement>(null);
  const [tick, setTick] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const vars = { "--hb-vb9-accent": accent, "--hb-vb9-step": `${interval}ms`, ...style } as React.CSSProperties;

  React.useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!live || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), Math.max(interval, 400));
    return () => window.clearInterval(id);
  }, [live, visible, interval]);

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }), [locale, currency]);

  const points = Array.from({ length: COUNT }, (_, i) => sample(tick + i));
  const max = 96;
  const coords = points.map((v, i) => [i * STEP, H - 14 - (v / max) * (H - 30)] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${((COUNT - 1) * STEP).toFixed(1)} ${H} L0 ${H} Z`;
  const last = coords[COUNT - 1];

  let gained = 0;
  for (let i = 0; i < tick; i += 1) gained += eventAt(i + 1000).value;
  const recent = Array.from({ length: 4 }, (_, i) => tick - 1 - i)
    .filter((i) => i >= -4)
    .map((i) => eventAt(i + 1000));
  const minute = recent.reduce((sum, e) => sum + e.value, 0);

  return (
    <section ref={root} className={`hb-vb9 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-live-metrics" precedence="default">{css}</style>
      {eyebrow ? (
        <p className="hb-vb9-eyebrow hb-vb9-in" style={d(40)}>
          <span className="hb-vb9-pulse" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className="hb-vb9-title hb-vb9-in" style={d(120)}>
        {title}
      </Heading>
      {subtitle ? (
        <p className="hb-vb9-sub hb-vb9-in" style={d(200)}>
          {subtitle}
        </p>
      ) : null}
      {primaryCta || secondaryCta ? (
        <div className="hb-vb9-actions hb-vb9-in" style={d(280)}>
          {primaryCta ? (
            <a className="hb-vb9-btn" data-primary="" href={primaryCta.href}>
              {primaryCta.label}
            </a>
          ) : null}
          {secondaryCta ? (
            <a className="hb-vb9-btn" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="hb-vb9-panel hb-vb9-in" style={d(380)} role="img" aria-label={`Live revenue dashboard showing ${money.format(baseRevenue + gained)} this month`}>
        <div className="hb-vb9-main" aria-hidden="true">
          <div className="hb-vb9-label">
            <span>Net revenue, this month</span>
            <span className="hb-vb9-range">
              <span>Live</span>
              <span>7d</span>
              <span>30d</span>
            </span>
          </div>
          <div key={`v${tick}`} className={`hb-vb9-value${tick ? " hb-vb9-flash" : ""}`}>
            {money.format(baseRevenue + gained)}
          </div>
          <div className="hb-vb9-delta">
            +{money.format(minute)} <span>in the last minute</span>
          </div>
          <svg className="hb-vb9-chart" viewBox={`0 0 ${W} ${H}`}>
            <defs>
              <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={accent} stopOpacity=".35" />
                <stop offset="1" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={W} y1={(H * f).toFixed(1)} y2={(H * f).toFixed(1)} stroke="rgba(255,255,255,.05)" strokeDasharray="3 5" />
            ))}
            <g key={`g${tick}`} className={tick ? "hb-vb9-shift" : undefined} style={{ "--hb-vb9-dx": `${STEP.toFixed(2)}px` } as React.CSSProperties}>
              <path d={area} fill={`url(#${uid}-area)`} />
              <path d={line} fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
              <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="4" fill="#fff" stroke={accent} strokeWidth="2.5" />
            </g>
          </svg>
          <div className="hb-vb9-kpis">
            <div className="hb-vb9-kpi">
              <b>{(4.8 + hash(tick) * 0.3).toFixed(2)}%</b>
              <span>Trial to paid</span>
            </div>
            <div className="hb-vb9-kpi">
              <b>{312 + (tick % 9)}</b>
              <span>Active checkouts</span>
            </div>
            <div className="hb-vb9-kpi">
              <b>1.9%</b>
              <span>Monthly churn</span>
            </div>
          </div>
        </div>
        <div className="hb-vb9-side" aria-hidden="true">
          <h3>
            Latest payments <span>{tick + 214}</span>
          </h3>
          <ul className="hb-vb9-feed">
            {recent.map((event) => (
              <li key={event.id} className="hb-vb9-event">
                <span className="hb-vb9-av" style={{ background: event.color }}>
                  {event.name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")}
                </span>
                <span className="hb-vb9-who">
                  {event.name}
                  <span>
                    {event.plan} · {event.city}
                  </span>
                </span>
                <span className="hb-vb9-amt">+{money.format(event.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface BentoLiveWidgetsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string } | null;
  accent?: string;
  speed?: number;
}

const css = `
@keyframes hb-wa7-rise { from { opacity: 0; transform: translate3d(0, 16px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa7-pan { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes hb-wa7-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes hb-wa7-dot { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
@keyframes hb-wa7-line { 0% { opacity: 0; transform: translateY(4px); } 4%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes hb-wa7-ping { 0% { transform: scale(.4); opacity: .9; } 100% { transform: scale(3.2); opacity: 0; } }
@keyframes hb-wa7-arc { 0% { stroke-dashoffset: 1; opacity: 1; } 55% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
@keyframes hb-wa7-typing { 0%, 100% { opacity: .3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
@keyframes hb-wa7-slot { 0%, 30% { opacity: 0; transform: translateX(-12px); } 40%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes hb-wa7-now { from { top: 8%; } to { top: 92%; } }
.hb-wa7 {
  --hb-wa7-accent: #3b82f6;
  --hb-wa7-s: 1;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa7 *, .hb-wa7 *::before, .hb-wa7 *::after { box-sizing: border-box; }
.hb-wa7 em, .hb-wa7 i { font-style: normal; }
.hb-wa7-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa7-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 40px; flex-wrap: wrap; margin-bottom: clamp(24px, 3.6cqi, 40px); }
.hb-wa7-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-wa7-eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 10px #ef4444; animation: hb-wa7-dot 1.4s ease infinite; }
.hb-wa7-title { margin: 0; max-width: 620px; font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa7-sub { margin: 12px 0 0; max-width: 520px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-wa7-cta { display: inline-flex; padding: 10px 16px; border-radius: 10px; background: var(--hb-wa7-accent); color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 10px 24px -12px var(--hb-wa7-accent); transition: transform .2s ease, filter .2s ease; }
.hb-wa7-cta:hover { transform: translate3d(0, -1px, 0); filter: brightness(1.08); }
.hb-wa7-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-wa7-ticker { display: flex; overflow: hidden; margin-bottom: 12px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 12px; background: #0e0e0e; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hb-wa7-ticker > div { display: flex; flex: none; gap: 28px; padding: 9px 14px; animation: hb-wa7-scroll calc(40s / var(--hb-wa7-s)) linear infinite; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; color: #8f8f8f; white-space: nowrap; }
.hb-wa7-ticker b { color: #ededed; font-weight: 500; }
.hb-wa7-ticker em[data-up="true"] { color: #4ade80; }
.hb-wa7-ticker em[data-up="false"] { color: #f87171; }
.hb-wa7-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: 250px 230px; grid-template-areas: "chart chart chart term term cal" "map map chat chat chat cal"; gap: 12px; }
.hb-wa7-cell { position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; border: 1px solid rgba(255, 255, 255, .08); border-radius: 18px; background: #101010; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04); animation: hb-wa7-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--i) * 80ms); transition: border-color .25s ease; }
.hb-wa7-cell:hover { border-color: rgba(255, 255, 255, .18); }
.hb-wa7-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 14px 0; font-size: 12.5px; font-weight: 600; }
.hb-wa7-bar small { display: inline-flex; align-items: center; gap: 6px; color: #6f6f6f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; font-weight: 400; }
.hb-wa7-bar small::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: hb-wa7-dot 1.6s ease infinite; }
.hb-wa7-chart { grid-area: chart; }
.hb-wa7-kpi { display: flex; align-items: baseline; gap: 10px; padding: 6px 14px 0; }
.hb-wa7-kpi strong { font-family: var(--font-grotesk, inherit); font-size: 32px; font-weight: 600; letter-spacing: -.04em; }
.hb-wa7-roll { display: inline-block; height: 1.1em; overflow: hidden; vertical-align: bottom; line-height: 1.1; }
.hb-wa7-roll > span { display: block; animation: hb-wa7-roll calc(6s / var(--hb-wa7-s)) steps(1) infinite; }
@keyframes hb-wa7-roll { 0% { transform: translateY(0); } 25% { transform: translateY(-1.1em); } 50% { transform: translateY(-2.2em); } 75% { transform: translateY(-3.3em); } }
.hb-wa7-roll > span > span { display: block; height: 1.1em; }
.hb-wa7-kpi em { color: #4ade80; font-size: 12px; }
.hb-wa7-svg { flex: 1; width: 100%; min-height: 0; }
.hb-wa7-pan { transform-box: view-box; animation: hb-wa7-pan calc(14s / var(--hb-wa7-s)) linear infinite; }
.hb-wa7-svg path.hb-wa7-ln { fill: none; stroke: var(--hb-wa7-accent); stroke-width: 2; vector-effect: non-scaling-stroke; }
.hb-wa7-svg line { stroke: rgba(255, 255, 255, .05); vector-effect: non-scaling-stroke; }
.hb-wa7-nowdot { position: absolute; right: 14px; bottom: 46%; width: 9px; height: 9px; border-radius: 50%; background: var(--hb-wa7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wa7-accent) 25%, transparent); }
.hb-wa7-term { grid-area: term; background: #0b0b0b; }
.hb-wa7-tbody { position: relative; flex: 1; padding: 10px 14px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; line-height: 1.85; }
.hb-wa7-tl { display: flex; gap: 8px; white-space: nowrap; overflow: hidden; color: #a1a1a1; opacity: 0; animation: hb-wa7-line calc(8s / var(--hb-wa7-s)) ease infinite; animation-delay: calc(var(--j) * .7s / var(--hb-wa7-s)); animation-fill-mode: both; }
.hb-wa7-tl span:first-child { color: #4a4a4a; }
.hb-wa7-tl b { color: var(--hb-wa7-accent); font-weight: 500; }
.hb-wa7-tl[data-ok="true"] { color: #4ade80; }
.hb-wa7-map { grid-area: map; }
.hb-wa7-mapsvg { flex: 1; width: 100%; min-height: 0; }
.hb-wa7-mapsvg circle.hb-wa7-land { fill: #2a2a2a; }
.hb-wa7-mapsvg path { fill: none; stroke: var(--hb-wa7-accent); stroke-width: 1.4; stroke-linecap: round; stroke-dasharray: 1; vector-effect: non-scaling-stroke; animation: hb-wa7-arc calc(4s / var(--hb-wa7-s)) cubic-bezier(.65, 0, .35, 1) infinite; animation-delay: calc(var(--j) * 1.3s / var(--hb-wa7-s)); }
.hb-wa7-pin { fill: var(--hb-wa7-accent); }
.hb-wa7-pring { fill: none; stroke: var(--hb-wa7-accent); stroke-width: 1; transform-box: fill-box; transform-origin: center; animation: hb-wa7-ping calc(2.4s / var(--hb-wa7-s)) ease-out infinite; animation-delay: calc(var(--j) * .5s); }
.hb-wa7-chat { grid-area: chat; }
.hb-wa7-msgs { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; padding: 10px 14px 14px; }
.hb-wa7-m { display: flex; align-items: flex-end; gap: 8px; max-width: 86%; opacity: 0; animation: hb-wa7-m calc(10s / var(--hb-wa7-s)) ease infinite; animation-delay: calc(var(--j) * 1.6s / var(--hb-wa7-s)); }
@keyframes hb-wa7-m { 0% { opacity: 0; transform: translateY(8px) scale(.96); } 5%, 80% { opacity: 1; transform: none; } 90%, 100% { opacity: 0; } }
.hb-wa7-m[data-me="true"] { align-self: flex-end; flex-direction: row-reverse; }
.hb-wa7-m p { margin: 0; padding: 8px 11px; border-radius: 12px 12px 12px 4px; background: #1a1a1a; color: #d4d4d4; font-size: 12.5px; line-height: 1.4; }
.hb-wa7-m[data-me="true"] p { border-radius: 12px 12px 4px 12px; background: var(--hb-wa7-accent); color: #fff; }
.hb-wa7-av { display: grid; place-items: center; flex: none; width: 22px; height: 22px; border-radius: 50%; color: #0a0a0a; font-size: 9px; font-weight: 800; }
.hb-wa7-dots { display: inline-flex; gap: 3px; padding: 10px 12px !important; }
.hb-wa7-dots i { width: 5px; height: 5px; border-radius: 50%; background: #8f8f8f; animation: hb-wa7-typing 1s ease infinite; }
.hb-wa7-dots i:nth-child(2) { animation-delay: .15s; }
.hb-wa7-dots i:nth-child(3) { animation-delay: .3s; }
.hb-wa7-cal { grid-area: cal; }
.hb-wa7-day { position: relative; flex: 1; margin: 10px 14px 14px; border-left: 1px solid #222; }
.hb-wa7-hr { position: absolute; left: 0; right: 0; height: 1px; background: #1a1a1a; }
.hb-wa7-hr span { position: absolute; left: -2px; top: -7px; transform: translateX(-100%); padding-right: 6px; color: #5f5f5f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; }
.hb-wa7-ev { position: absolute; left: 6px; right: 0; padding: 6px 8px; border-radius: 8px; border-left: 3px solid var(--c); background: color-mix(in srgb, var(--c) 16%, #111); font-size: 11px; line-height: 1.3; }
.hb-wa7-ev b { display: block; font-weight: 600; }
.hb-wa7-ev span { color: #8f8f8f; font-size: 10px; }
.hb-wa7-ev[data-live="true"] { animation: hb-wa7-slot calc(7s / var(--hb-wa7-s)) cubic-bezier(.22, 1, .36, 1) infinite; }
.hb-wa7-now { position: absolute; left: -4px; right: 0; height: 2px; background: #ef4444; animation: hb-wa7-now calc(30s / var(--hb-wa7-s)) linear infinite alternate; }
.hb-wa7-now::before { content: ""; position: absolute; left: 0; top: -3px; width: 8px; height: 8px; border-radius: 50%; background: #ef4444; }
@container (max-width: 860px) {
  .hb-wa7-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: 240px 220px 230px; grid-template-areas: "chart chart" "term cal" "map chat"; }
}
@container (max-width: 560px) {
  .hb-wa7-grid { grid-template-columns: minmax(0, 1fr); grid-template-rows: 230px 200px 220px 230px 260px; grid-template-areas: "chart" "term" "map" "chat" "cal"; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa7 *, .hb-wa7 *::before, .hb-wa7 *::after { animation: none !important; transition: none !important; }
  .hb-wa7-tl, .hb-wa7-m { opacity: 1; }
  .hb-wa7-now { top: 46%; }
}
`;

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

function series(offset: number, count: number) {
  const pts: string[] = [];
  for (let i = 0; i < count; i++) {
    const v = 52 + Math.sin(((i + offset) / (count - 1)) * Math.PI * 6) * 14 + (hash((i % (count - 1)) + 3) - 0.5) * 18;
    pts.push(`${((i / (count - 1)) * 200).toFixed(2)} ${(100 - v).toFixed(2)}`);
  }
  return pts;
}

const linePts = series(0, 41);
const lineD = `M${linePts.join(" L")}`;
const areaD = `${lineD} L200 100 L0 100 Z`;

const landDots: { x: number; y: number }[] = [];
for (let r = 0; r < 14; r++) {
  for (let c = 0; c < 34; c++) {
    const x = c / 33;
    const y = r / 13;
    const blob =
      Math.exp(-(((x - 0.22) / 0.13) ** 2 + ((y - 0.35) / 0.3) ** 2)) +
      Math.exp(-(((x - 0.3) / 0.06) ** 2 + ((y - 0.78) / 0.2) ** 2)) +
      Math.exp(-(((x - 0.52) / 0.07) ** 2 + ((y - 0.32) / 0.18) ** 2)) +
      Math.exp(-(((x - 0.55) / 0.07) ** 2 + ((y - 0.68) / 0.2) ** 2)) +
      Math.exp(-(((x - 0.74) / 0.16) ** 2 + ((y - 0.33) / 0.24) ** 2)) +
      Math.exp(-(((x - 0.86) / 0.06) ** 2 + ((y - 0.8) / 0.1) ** 2));
    if (blob > 0.45 + hash(r * 40 + c) * 0.25) landDots.push({ x: 6 + c * 6, y: 6 + r * 6.6 });
  }
}

const tickerItems = [
  ["api.p95", "182ms", false],
  ["checkout.rps", "1,904", true],
  ["errors.5xx", "0.04%", true],
  ["queue.depth", "312", false],
  ["signups.today", "2,418", true],
  ["db.cpu", "41%", true],
] as const;

const termLines = [
  { t: "halyard watch --env prod", c: true },
  { t: "eu-west-1  healthy  41 pods" },
  { t: "us-east-1  healthy  58 pods" },
  { t: "scale checkout 12 → 16", c: true },
  { t: "rollout 4/4 ready in 38s", ok: true },
  { t: "alert cleared: queue.depth", ok: true },
];

const msgs = [
  { me: false, who: "NK", c: "#fda4af", t: "Checkout p95 just spiked in us-east" },
  { me: true, t: "Scaling to 16, watching it now" },
  { me: false, who: "NK", c: "#fda4af", t: "Back under 200ms. Nice." },
];

export function BentoLiveWidgets({
  eyebrow = "Live right now",
  title = "Your whole operation, breathing on one screen",
  subtitle = "Metrics, logs, regions, people and the calendar, all streaming. No refresh button anywhere.",
  cta = { label: "Open the live demo", href: "#" },
  accent = "#3b82f6",
  speed = 1,
  className,
  style,
  ...rest
}: BentoLiveWidgetsProps) {
  const gid = `hb-wa7-g${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const routes = [
    "M48 40 Q 90 6 128 30",
    "M128 30 Q 160 10 186 34",
    "M60 74 Q 100 96 140 70",
  ];
  const pins = [
    { x: 48, y: 40 },
    { x: 128, y: 30 },
    { x: 186, y: 34 },
    { x: 60, y: 74 },
    { x: 140, y: 70 },
  ];
  return (
    <section className={["hb-wa7", className].filter(Boolean).join(" ")} style={{ "--hb-wa7-accent": accent, "--hb-wa7-s": speed, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-bento-live-widgets" precedence="default">{css}</style>
      <div className="hb-wa7-in">
        <div className="hb-wa7-head">
          <div>
            <p className="hb-wa7-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa7-title">{title}</h2>
            <p className="hb-wa7-sub">{subtitle}</p>
          </div>
          {cta && <a className="hb-wa7-cta" href={cta.href}>{cta.label}</a>}
        </div>
        <div className="hb-wa7-ticker" aria-hidden="true">
          {[0, 1].map((k) => (
            <div key={k}>
              {[...tickerItems, ...tickerItems].map(([n, v, up], j) => (
                <span key={j}>
                  {n} <b>{v}</b> <em data-up={up}>{up ? "▲" : "▼"}</em>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="hb-wa7-grid">
          <article className="hb-wa7-cell hb-wa7-chart" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="hb-wa7-bar">Requests per second <small>streaming</small></div>
            <div className="hb-wa7-kpi">
              <strong>
                <span className="hb-wa7-roll">
                  <span>
                    <span>1,904</span>
                    <span>1,962</span>
                    <span>1,887</span>
                    <span>2,013</span>
                  </span>
                </span>
              </strong>
              <em>+6.2% vs last hour</em>
            </div>
            <svg className="hb-wa7-svg" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={accent} stopOpacity=".35" />
                  <stop offset="1" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} />
              ))}
              <g className="hb-wa7-pan">
                {[0, 200].map((dx) => (
                  <g key={dx} transform={`translate(${dx} 0)`}>
                    <path d={areaD} fill={`url(#${gid})`} />
                    <path className="hb-wa7-ln" d={lineD} />
                  </g>
                ))}
              </g>
            </svg>
            <i className="hb-wa7-nowdot" aria-hidden="true" />
          </article>

          <article className="hb-wa7-cell hb-wa7-term" style={{ "--i": 1 } as React.CSSProperties}>
            <div className="hb-wa7-bar">Deploy log <small>prod</small></div>
            <div className="hb-wa7-tbody" aria-hidden="true">
              {termLines.map((l, j) => (
                <div key={l.t} className="hb-wa7-tl" data-ok={l.ok ? "true" : undefined} style={{ "--j": j } as React.CSSProperties}>
                  <span>{l.c ? "$" : "›"}</span>
                  {l.c ? <b>{l.t}</b> : <span>{l.t}</span>}
                </div>
              ))}
            </div>
          </article>

          <article className="hb-wa7-cell hb-wa7-cal" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="hb-wa7-bar">Thu, Nov 12</div>
            <div className="hb-wa7-day" style={{ marginLeft: "44px" }}>
              {["9:00", "11:00", "13:00", "15:00", "17:00"].map((h, j) => (
                <i key={h} className="hb-wa7-hr" style={{ top: `${(j * 23 + 4).toFixed(0)}%` }}>
                  <span>{h}</span>
                </i>
              ))}
              <div className="hb-wa7-ev" style={{ top: "6%", height: "16%", "--c": "#a78bfa" } as React.CSSProperties}>
                <b>Standup</b>
                <span>9:15</span>
              </div>
              <div className="hb-wa7-ev" data-live="true" style={{ top: "30%", height: "20%", "--c": accent } as React.CSSProperties}>
                <b>Incident review</b>
                <span>Added just now</span>
              </div>
              <div className="hb-wa7-ev" style={{ top: "60%", height: "22%", "--c": "#34d399" } as React.CSSProperties}>
                <b>Capacity planning</b>
                <span>14:30</span>
              </div>
              <i className="hb-wa7-now" aria-hidden="true" />
            </div>
          </article>

          <article className="hb-wa7-cell hb-wa7-map" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="hb-wa7-bar">Edge regions <small>5 online</small></div>
            <svg className="hb-wa7-mapsvg" viewBox="0 0 210 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {landDots.map((d, j) => (
                <circle key={j} className="hb-wa7-land" cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r="1.3" />
              ))}
              {routes.map((d, j) => (
                <path key={d} d={d} pathLength={1} style={{ "--j": j } as React.CSSProperties} />
              ))}
              {pins.map((p, j) => (
                <g key={j}>
                  <circle className="hb-wa7-pring" cx={p.x} cy={p.y} r="3" style={{ "--j": j } as React.CSSProperties} />
                  <circle className="hb-wa7-pin" cx={p.x} cy={p.y} r="2.4" />
                </g>
              ))}
            </svg>
          </article>

          <article className="hb-wa7-cell hb-wa7-chat" style={{ "--i": 4 } as React.CSSProperties}>
            <div className="hb-wa7-bar">#oncall <small>3 here</small></div>
            <div className="hb-wa7-msgs" aria-hidden="true">
              {msgs.map((m, j) => (
                <div key={m.t} className="hb-wa7-m" data-me={m.me} style={{ "--j": j } as React.CSSProperties}>
                  {!m.me && <span className="hb-wa7-av" style={{ background: m.c }}>{m.who}</span>}
                  <p>{m.t}</p>
                </div>
              ))}
              <div className="hb-wa7-m" style={{ "--j": 3 } as React.CSSProperties}>
                <span className="hb-wa7-av" style={{ background: "#fde68a" }}>OB</span>
                <p className="hb-wa7-dots"><i /><i /><i /></p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

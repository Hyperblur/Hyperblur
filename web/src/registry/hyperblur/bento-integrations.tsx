"use client";

import * as React from "react";

export interface BentoIntegrationsItem {
  name: string;
  category: string;
  description: string;
  connected?: boolean;
}

export interface BentoIntegrationsEvent {
  method: string;
  event: string;
  status: number;
  ms: number;
}

export interface BentoIntegrationsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  hubLabel?: string;
  items?: BentoIntegrationsItem[];
  events?: BentoIntegrationsEvent[];
  installCommand?: string;
  onConnectChange?: (name: string, connected: boolean) => void;
  accent?: string;
}

const glyphs = [
  "M4 6h12M4 10h12M4 14h8",
  "M3 12c2.5-5 4.5-5 7 0s4.5 5 7 0",
  "M10 3l6 3.5v7L10 17l-6-3.5v-7z",
  "M10 4a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 100 6 3 3 0 000-6z",
  "M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z",
  "M10 4l7 12H3z",
  "M4 5h12v8H9l-4 3v-3H4z",
  "M11 3L5 11h5l-1 6 6-8h-5z",
];

const css = `
@keyframes hb-kb3-rise { from { opacity: 0; transform: translate3d(0, 16px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb3-flow { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
@keyframes hb-kb3-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-kb3-pulse { 0% { transform: scale(.8); opacity: .6; } 100% { transform: scale(2.1); opacity: 0; } }
@keyframes hb-kb3-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
@keyframes hb-kb3-scroll { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, -50%, 0); } }
.hb-kb3 {
  --hb-kb3-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb3 *, .hb-kb3 *::before, .hb-kb3 *::after { box-sizing: border-box; }
.hb-kb3-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-kb3-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: clamp(28px, 4cqi, 44px); animation: hb-kb3-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb3-head > div { max-width: 600px; }
.hb-kb3-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-kb3-eyebrow svg { color: var(--hb-kb3-accent); }
.hb-kb3-title { margin: 0; font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-kb3-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb3-count { flex: none; display: grid; gap: 2px; padding: 14px 18px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: #111; text-align: right; }
.hb-kb3-count strong { font-size: 28px; font-weight: 600; letter-spacing: -.03em; line-height: 1; }
.hb-kb3-count span { color: #8f8f8f; font-size: 12px; }
.hb-kb3-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas: "t0 hub hub t1" "t2 hub hub t3" "hooks hooks sdk sdk";
  gap: 12px;
}
.hb-kb3-cell {
  position: relative;
  min-width: 0;
  overflow: hidden;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 18px;
  background: linear-gradient(180deg, #121212, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  animation: hb-kb3-rise .7s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb3-i, 0) * 70ms + 120ms);
  transition: border-color .25s ease, transform .25s ease;
}
.hb-kb3-hub {
  grid-area: hub;
  display: flex;
  flex-direction: column;
  padding: 0;
  background:
    radial-gradient(55% 60% at 50% 50%, color-mix(in srgb, var(--hb-kb3-accent) 12%, transparent), transparent 70%),
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, .07) 1px, transparent 0) 0 0 / 16px 16px,
    #0c0c0c;
}
.hb-kb3-map { position: relative; flex: 1; min-height: 260px; }
.hb-kb3-map svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-kb3-link { fill: none; stroke: rgba(255, 255, 255, .1); stroke-width: 1.2; stroke-dasharray: 1; animation: hb-kb3-draw 1s ease both; animation-delay: calc(var(--hb-kb3-j) * 60ms + 300ms); transition: stroke .25s ease; }
.hb-kb3-flow { fill: none; stroke: var(--hb-kb3-accent); stroke-width: 1.8; stroke-linecap: round; stroke-dasharray: 14 286; animation: hb-kb3-flow var(--d, 3s) linear infinite; animation-delay: calc(var(--hb-kb3-j) * -470ms); opacity: .85; filter: drop-shadow(0 0 4px var(--hb-kb3-accent)); }
.hb-kb3-node { transform-box: fill-box; transform-origin: center; animation: hb-kb3-pop .5s cubic-bezier(.34, 1.56, .64, 1) both; animation-delay: calc(var(--hb-kb3-j) * 60ms + 500ms); }
.hb-kb3-node rect { fill: #141414; stroke: rgba(255, 255, 255, .12); transition: stroke .25s ease, fill .25s ease; }
.hb-kb3-node path { fill: none; stroke: #a1a1a1; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; transition: stroke .25s ease; }
.hb-kb3-ring { transform-box: fill-box; transform-origin: center; fill: none; stroke: var(--hb-kb3-accent); stroke-width: 1; animation: hb-kb3-pulse 2.6s ease-out infinite; }
.hb-kb3-ring + .hb-kb3-ring { animation-delay: 1.3s; }
.hb-kb3-core rect { fill: #0f0f0f; stroke: color-mix(in srgb, var(--hb-kb3-accent) 55%, transparent); stroke-width: 1.4; }
.hb-kb3-core path { fill: var(--hb-kb3-accent); }
.hb-kb3-hubcap { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-top: 1px solid rgba(255, 255, 255, .06); background: rgba(10, 10, 10, .7); }
.hb-kb3-hubcap h3 { margin: 0; font-size: 14.5px; font-weight: 600; }
.hb-kb3-hubcap p { margin: 3px 0 0; color: #8f8f8f; font-size: 12.5px; }
.hb-kb3-stat { display: inline-flex; align-items: center; gap: 7px; flex: none; padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--hb-kb3-accent) 12%, transparent); color: color-mix(in srgb, var(--hb-kb3-accent) 70%, #fff); font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kb3-stat i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kb3-accent); box-shadow: 0 0 8px var(--hb-kb3-accent); }
.hb-kb3-tile { display: flex; flex-direction: column; gap: 12px; }
.hb-kb3-tile:hover { border-color: color-mix(in srgb, var(--hb-kb3-accent) 40%, rgba(255, 255, 255, .08)); transform: translate3d(0, -2px, 0); }
.hb-kb3-ttop { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-kb3-badge { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 11px; background: linear-gradient(145deg, #1d1d1d, #111); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06); }
.hb-kb3-badge path { fill: none; stroke: #ededed; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.hb-kb3-tile:hover .hb-kb3-badge path { stroke: var(--hb-kb3-accent); }
.hb-kb3-btn { padding: 5px 10px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 999px; background: transparent; color: #ededed; font: inherit; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: background .2s ease, color .2s ease, border-color .2s ease; }
.hb-kb3-btn:hover { background: rgba(255, 255, 255, .06); }
.hb-kb3-btn[aria-pressed="true"] { border-color: transparent; background: color-mix(in srgb, var(--hb-kb3-accent) 14%, transparent); color: color-mix(in srgb, var(--hb-kb3-accent) 75%, #fff); }
.hb-kb3-btn:focus-visible { outline: 2px solid var(--hb-kb3-accent); outline-offset: 2px; }
.hb-kb3-tile h3 { margin: 0; font-size: 14.5px; font-weight: 600; }
.hb-kb3-tile h3 span { margin-left: 6px; color: #6f6f6f; font-size: 12px; font-weight: 500; }
.hb-kb3-tile p { margin: 4px 0 0; color: #8f8f8f; font-size: 12.5px; line-height: 1.5; }
.hb-kb3-sync { margin-top: auto; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, .08); color: #5f5f5f; font-size: 11px; }
.hb-kb3-hooks { grid-area: hooks; }
.hb-kb3-sdk { grid-area: sdk; }
.hb-kb3-ctitle { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.hb-kb3-ctitle h3 { margin: 0; font-size: 14.5px; font-weight: 600; }
.hb-kb3-ctitle span { color: #6f6f6f; font-size: 12px; }
.hb-kb3-log { position: relative; height: 132px; overflow: hidden; mask-image: linear-gradient(transparent, #000 18%, #000 82%, transparent); }
.hb-kb3-logtrack { animation: hb-kb3-scroll 14s linear infinite; }
.hb-kb3-log:hover .hb-kb3-logtrack { animation-play-state: paused; }
.hb-kb3-ev { display: grid; grid-template-columns: 46px minmax(0, 1fr) auto auto; align-items: center; gap: 10px; height: 33px; padding: 0 4px; border-bottom: 1px solid rgba(255, 255, 255, .04); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; }
.hb-kb3-ev b { padding: 2px 0; border-radius: 5px; background: rgba(255, 255, 255, .06); color: #a1a1a1; font-weight: 600; font-size: 10px; text-align: center; }
.hb-kb3-ev span { overflow: hidden; color: #d4d4d4; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb3-ev em { font-style: normal; color: #4ade80; }
.hb-kb3-ev em[data-bad="true"] { color: #fb7185; }
.hb-kb3-ev small { color: #5f5f5f; font-size: 11px; text-align: right; min-width: 44px; }
.hb-kb3-langs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.hb-kb3-langs span { padding: 4px 10px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; color: #a1a1a1; font-size: 12px; transition: color .2s ease, border-color .2s ease; }
.hb-kb3-langs span:hover { color: #ededed; border-color: rgba(255, 255, 255, .2); }
.hb-kb3-code { border: 1px solid rgba(255, 255, 255, .08); border-radius: 12px; background: #090909; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-kb3-install { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, .06); }
.hb-kb3-install code { flex: 1; min-width: 0; overflow: hidden; color: #ededed; font: inherit; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb3-install code::before { content: "$ "; color: #5f5f5f; }
.hb-kb3-copy { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 8px; background: #141414; color: #a1a1a1; cursor: pointer; transition: color .2s ease, background .2s ease; }
.hb-kb3-copy:hover { color: #ededed; background: #1c1c1c; }
.hb-kb3-copy:focus-visible { outline: 2px solid var(--hb-kb3-accent); outline-offset: 2px; }
.hb-kb3-snip { margin: 0; padding: 10px 12px; color: #a1a1a1; line-height: 1.7; white-space: pre; overflow: hidden; }
.hb-kb3-snip b { color: var(--hb-kb3-accent); font-weight: 400; }
.hb-kb3-snip i { color: #fcd34d; font-style: normal; }
${[0, 1, 2, 3]
  .map(
    (k) =>
      `.hb-kb3:has(.hb-kb3-tile[data-k="${k}"]:hover) .hb-kb3-link[data-k="${k}"] { stroke: var(--hb-kb3-accent); }
.hb-kb3:has(.hb-kb3-tile[data-k="${k}"]:hover) .hb-kb3-node[data-k="${k}"] rect { stroke: var(--hb-kb3-accent); fill: color-mix(in srgb, var(--hb-kb3-accent) 12%, #111); }
.hb-kb3:has(.hb-kb3-tile[data-k="${k}"]:hover) .hb-kb3-node[data-k="${k}"] path { stroke: var(--hb-kb3-accent); }`,
  )
  .join("\n")}
@container (max-width: 860px) {
  .hb-kb3-head { flex-direction: column; align-items: flex-start; }
  .hb-kb3-count { text-align: left; }
  .hb-kb3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-areas: "hub hub" "t0 t1" "t2 t3" "hooks hooks" "sdk sdk"; }
}
@container (max-width: 520px) {
  .hb-kb3-grid { grid-template-columns: minmax(0, 1fr); grid-template-areas: "hub" "t0" "t1" "t2" "t3" "hooks" "sdk"; }
  .hb-kb3-map { min-height: 220px; }
  .hb-kb3-hubcap { flex-direction: column; align-items: flex-start; }
  .hb-kb3-ev { grid-template-columns: 40px minmax(0, 1fr) auto; }
  .hb-kb3-ev small { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb3 *, .hb-kb3 *::before, .hb-kb3 *::after { animation: none !important; transition: none !important; }
  .hb-kb3-flow, .hb-kb3-ring { display: none; }
}
`;

const defaultItems: BentoIntegrationsItem[] = [
  { name: "Ledger", category: "Payments", description: "Payouts, invoices and refunds synced every five minutes.", connected: true },
  { name: "Relay", category: "Messaging", description: "Route alerts to the right channel with per-team rules.", connected: true },
  { name: "Vault", category: "Storage", description: "Mirror files and exports to your own bucket, encrypted.", connected: false },
  { name: "Pulse", category: "Analytics", description: "Stream product events into dashboards in real time.", connected: true },
];

const defaultEvents: BentoIntegrationsEvent[] = [
  { method: "POST", event: "invoice.paid", status: 200, ms: 84 },
  { method: "POST", event: "customer.updated", status: 200, ms: 61 },
  { method: "POST", event: "file.uploaded", status: 201, ms: 132 },
  { method: "POST", event: "alert.triggered", status: 200, ms: 47 },
  { method: "PUT", event: "seat.assigned", status: 200, ms: 73 },
  { method: "POST", event: "refund.created", status: 502, ms: 1204 },
  { method: "POST", event: "event.batch", status: 202, ms: 39 },
];

function Glyph({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function BentoIntegrations({
  eyebrow = "Integrations",
  title = "Plug into the stack you already run",
  subtitle = "One hub keeps payments, messaging, storage and analytics in sync, with retries, logs and typed SDKs included.",
  hubLabel = "Conduit hub",
  items = defaultItems,
  events = defaultEvents,
  installCommand = "npx shadcn@latest add https://hyperblur.dev/r/bento-integrations.json",
  onConnectChange,
  accent = "#22d3ee",
  className,
  style,
  ...rest
}: BentoIntegrationsProps) {
  const [connected, setConnected] = React.useState<boolean[]>(() => items.map((i) => Boolean(i.connected)));
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const toggle = (i: number) => {
    const next = !connected[i];
    setConnected((prev) => prev.map((v, j) => (j === i ? next : v)));
    onConnectChange?.(items[i].name, next);
  };

  const copy = () => {
    navigator.clipboard?.writeText(installCommand).catch(() => {});
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  const cx = 200;
  const cy = 140;
  const nodes = Array.from({ length: 8 }, (_, j) => {
    const order = [5, 7, 3, 1, 6, 2, 4, 0];
    const a = (order[j] / 8) * Math.PI * 2 + Math.PI / 8;
    return { x: cx + Math.cos(a) * 150, y: cy + Math.sin(a) * 98 };
  });

  const activeCount = connected.filter(Boolean).length;

  return (
    <section
      className={["hb-kb3", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-integrations" precedence="default">{css}</style>
      <div className="hb-kb3-in">
        <header className="hb-kb3-head">
          <div>
            {eyebrow ? (
              <p className="hb-kb3-eyebrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3v3M10 3v3M4.5 6h7v2.5a3.5 3.5 0 01-7 0zM8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-kb3-title">{title}</h2>
            {subtitle ? <p className="hb-kb3-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-kb3-count">
            <strong>120+</strong>
            <span>native connectors</span>
          </div>
        </header>

        <div className="hb-kb3-grid">
          <article className="hb-kb3-cell hb-kb3-hub" style={{ "--hb-kb3-i": 0 } as React.CSSProperties}>
            <div className="hb-kb3-map">
              <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {nodes.map((n, j) => {
                  const mx = (n.x + cx) / 2 + (n.y - cy) * 0.18;
                  const my = (n.y + cy) / 2 - (n.x - cx) * 0.18;
                  const d = `M${cx} ${cy} Q${mx.toFixed(1)} ${my.toFixed(1)} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`;
                  return (
                    <g key={j}>
                      <path className="hb-kb3-link" data-k={j} d={d} pathLength={1} style={{ "--hb-kb3-j": j } as React.CSSProperties} />
                      <path className="hb-kb3-flow" d={d} pathLength={300} style={{ "--hb-kb3-j": j, "--d": `${(2.6 + (j % 3) * 0.7).toFixed(1)}s` } as React.CSSProperties} />
                    </g>
                  );
                })}
                {nodes.map((n, j) => (
                  <g key={j} className="hb-kb3-node" data-k={j} style={{ "--hb-kb3-j": j } as React.CSSProperties}>
                    <rect x={(n.x - 19).toFixed(1)} y={(n.y - 19).toFixed(1)} width="38" height="38" rx="11" />
                    <g transform={`translate(${(n.x - 10).toFixed(1)} ${(n.y - 10).toFixed(1)})`}>
                      <path d={glyphs[j]} />
                    </g>
                  </g>
                ))}
                <rect className="hb-kb3-ring" x={cx - 36} y={cy - 36} width="72" height="72" rx="20" />
                <rect className="hb-kb3-ring" x={cx - 36} y={cy - 36} width="72" height="72" rx="20" />
                <g className="hb-kb3-core">
                  <rect x={cx - 34} y={cy - 34} width="68" height="68" rx="19" />
                  <path d={`M${cx - 14} ${cy - 10}h28l-4 6h-28zM${cx - 12} ${cy - 1}h28l-4 6h-28zM${cx - 10} ${cy + 8}h22l-4 6h-22z`} />
                </g>
              </svg>
            </div>
            <div className="hb-kb3-hubcap">
              <div>
                <h3>{hubLabel}</h3>
                <p>Every connector routes through one queue with automatic retries.</p>
              </div>
              <span className="hb-kb3-stat">
                <i aria-hidden="true" />
                {activeCount} of {items.length} live
              </span>
            </div>
          </article>

          {items.slice(0, 4).map((it, k) => (
            <article
              key={it.name}
              className="hb-kb3-cell hb-kb3-tile"
              data-k={k}
              style={{ gridArea: `t${k}`, "--hb-kb3-i": k + 1 } as React.CSSProperties}
            >
              <div className="hb-kb3-ttop">
                <span className="hb-kb3-badge">
                  <Glyph d={glyphs[k]} />
                </span>
                <button type="button" className="hb-kb3-btn" aria-pressed={Boolean(connected[k])} onClick={() => toggle(k)}>
                  {connected[k] ? "Connected" : "Connect"}
                </button>
              </div>
              <div>
                <h3>
                  {it.name}
                  <span>{it.category}</span>
                </h3>
                <p>{it.description}</p>
              </div>
              <div className="hb-kb3-sync">{connected[k] ? `Last sync ${2 + k * 3} min ago` : "Not connected"}</div>
            </article>
          ))}

          <article className="hb-kb3-cell hb-kb3-hooks" style={{ "--hb-kb3-i": 5 } as React.CSSProperties}>
            <div className="hb-kb3-ctitle">
              <h3>Webhooks with a paper trail</h3>
              <span>Signed, retried, replayable</span>
            </div>
            <div className="hb-kb3-log">
              <div className="hb-kb3-logtrack">
                {[0, 1].map((copyIndex) => (
                  <div key={copyIndex} aria-hidden={copyIndex === 1 ? "true" : undefined}>
                    {events.map((e, j) => (
                      <div key={`${copyIndex}-${j}`} className="hb-kb3-ev">
                        <b>{e.method}</b>
                        <span>{e.event}</span>
                        <em data-bad={e.status >= 400 ? "true" : undefined}>{e.status}</em>
                        <small>{e.ms} ms</small>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="hb-kb3-cell hb-kb3-sdk" style={{ "--hb-kb3-i": 6 } as React.CSSProperties}>
            <div className="hb-kb3-ctitle">
              <h3>Typed SDKs</h3>
              <span>Five languages</span>
            </div>
            <div className="hb-kb3-langs">
              {["TypeScript", "Python", "Go", "Ruby", "Rust"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="hb-kb3-code">
              <div className="hb-kb3-install">
                <code>{installCommand}</code>
                <button type="button" className="hb-kb3-copy" onClick={copy} aria-label={copied ? "Copied" : "Copy install command"}>
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="5" y="5" width="8.5" height="8.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M11 3.5V3a1.5 1.5 0 00-1.5-1.5H3.5A1.5 1.5 0 002 3v6a1.5 1.5 0 001.5 1.5H4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  )}
                </button>
              </div>
              <pre className="hb-kb3-snip">
                <b>await</b> conduit.connect(<i>&quot;ledger&quot;</i>)
              </pre>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

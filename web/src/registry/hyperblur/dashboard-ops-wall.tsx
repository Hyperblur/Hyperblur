"use client";

import * as React from "react";

export type OpsStatus = "ok" | "degraded" | "down";

export interface OpsService {
  id: string;
  name: string;
  region: string;
  status: OpsStatus;
  latency: number;
  rps: number;
  uptime: number;
}

export interface DashboardOpsWallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  brand?: string;
  services?: OpsService[];
  accent?: string;
  live?: boolean;
  interval?: number;
  incident?: { title: string; detail: string; minutes: number } | null;
  onServiceSelect?: (service: OpsService) => void;
}

function rnd(n: number) {
  let x = (n ^ 0x5bd1e995) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x27d4eb2d) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0x165667b1) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

const defaultServices: OpsService[] = [
  { id: "edge", name: "Edge gateway", region: "global", status: "ok", latency: 18, rps: 48200, uptime: 99.99 },
  { id: "auth", name: "Auth", region: "us-east", status: "ok", latency: 42, rps: 6100, uptime: 99.98 },
  { id: "api", name: "Public API", region: "us-east", status: "ok", latency: 86, rps: 12400, uptime: 99.95 },
  { id: "checkout", name: "Checkout", region: "eu-west", status: "degraded", latency: 612, rps: 2300, uptime: 99.41 },
  { id: "search", name: "Search", region: "us-west", status: "ok", latency: 64, rps: 8800, uptime: 99.97 },
  { id: "media", name: "Media CDN", region: "global", status: "ok", latency: 24, rps: 31600, uptime: 100 },
  { id: "queue", name: "Job queue", region: "us-east", status: "ok", latency: 9, rps: 4200, uptime: 99.99 },
  { id: "billing", name: "Billing", region: "eu-west", status: "ok", latency: 128, rps: 940, uptime: 99.93 },
  { id: "notify", name: "Notifications", region: "ap-south", status: "ok", latency: 71, rps: 3700, uptime: 99.96 },
  { id: "db", name: "Primary DB", region: "us-east", status: "ok", latency: 4, rps: 22100, uptime: 99.99 },
  { id: "replica", name: "Read replicas", region: "eu-west", status: "degraded", latency: 38, rps: 15800, uptime: 99.82 },
  { id: "ml", name: "Ranking", region: "us-west", status: "ok", latency: 142, rps: 5100, uptime: 99.9 },
];

const regions = [
  { id: "us-east", label: "US East", x: 27, y: 38 },
  { id: "us-west", label: "US West", x: 13, y: 40 },
  { id: "eu-west", label: "EU West", x: 48, y: 30 },
  { id: "ap-south", label: "AP South", x: 70, y: 50 },
];

const incidents = [
  { t: "14:32", text: "Checkout p95 above 600 ms in eu-west", tone: "degraded" as OpsStatus },
  { t: "14:29", text: "Replica lag 4.1 s on eu-west-db-2", tone: "degraded" as OpsStatus },
  { t: "13:05", text: "Deploy api v2.41 completed, 0 errors", tone: "ok" as OpsStatus },
  { t: "11:48", text: "INC-311 resolved by Jonah Reyes", tone: "ok" as OpsStatus },
  { t: "09:12", text: "Search index rebuild finished in 18 min", tone: "ok" as OpsStatus },
];

const statusColor: Record<OpsStatus, string> = { ok: "#4ade80", degraded: "#f5b544", down: "#ff5a4f" };
const statusLabel: Record<OpsStatus, string> = { ok: "Operational", degraded: "Degraded", down: "Down" };

const BEATS = 32;

const css = `
.hb-wi10 {
  --hb-wi10-a: #2f7bff;
  container-type: inline-size;
  width: 100%;
  box-sizing: border-box;
  padding: 18px;
  border-radius: 16px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px) 0 0 / 100% 24px,
    #070707;
  border: 1px solid #1d1d1d;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
}
.hb-wi10 *, .hb-wi10 *::before, .hb-wi10 *::after { box-sizing: border-box; }
.hb-wi10 button { font-family: inherit; }
.hb-wi10 button:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.75); }
.hb-wi10-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; flex-wrap: wrap; }
.hb-wi10-brand { display: flex; align-items: center; gap: 9px; font-weight: 600; font-size: 14px; letter-spacing: -0.01em; }
.hb-wi10-brand svg { color: var(--hb-wi10-a); }
.hb-wi10-clock { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wi10-sum { margin-left: auto; display: flex; gap: 6px; }
.hb-wi10-sum span { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 7px; background: #0f0f0f; border: 1px solid #1f1f1f; font-size: 11.5px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-wi10-sum i { width: 7px; height: 7px; border-radius: 50%; }
.hb-wi10-sum b { color: #ededed; font-weight: 600; }
.hb-wi10-banner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  margin-bottom: 14px;
  border-radius: 11px;
  border: 1px solid rgba(245, 181, 68, 0.28);
  background: linear-gradient(90deg, rgba(245, 181, 68, 0.12), rgba(245, 181, 68, 0.03));
  overflow: hidden;
}
.hb-wi10-banner::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(245, 181, 68, 0.12), transparent); transform: translateX(-100%); animation: hb-wi10-sweep 3.2s ease-in-out infinite; }
@keyframes hb-wi10-sweep { to { transform: translateX(100%); } }
.hb-wi10-banner svg { flex: none; color: #f5b544; }
.hb-wi10-banner b { font-weight: 600; color: #fde3b0; }
.hb-wi10-banner p { margin: 1px 0 0; font-size: 11.5px; color: #c9b48a; }
.hb-wi10-banner time { margin-left: auto; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #f5b544; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wi10-layout { display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 14px; }
.hb-wi10-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; align-content: start; }
.hb-wi10-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 11px 12px 10px;
  border-radius: 11px;
  border: 1px solid #1c1c1c;
  background: linear-gradient(#0f0f0f, #0c0c0c);
  color: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.hb-wi10-tile:hover { border-color: #2c2c2c; transform: translateY(-1px); }
.hb-wi10-tile[data-s="degraded"] { border-color: rgba(245, 181, 68, 0.3); background: linear-gradient(rgba(245, 181, 68, 0.06), #0c0c0c 70%); }
.hb-wi10-tile[data-s="down"] { border-color: rgba(255, 90, 79, 0.4); background: linear-gradient(rgba(255, 90, 79, 0.08), #0c0c0c 70%); }
.hb-wi10-tile[aria-pressed="true"] { border-color: var(--hb-wi10-a); box-shadow: 0 0 0 1px var(--hb-wi10-a) inset; }
.hb-wi10-th { display: flex; align-items: center; gap: 8px; }
.hb-wi10-led { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wi10-s); box-shadow: 0 0 8px var(--hb-wi10-s); flex: none; }
.hb-wi10-tile[data-s="degraded"] .hb-wi10-led, .hb-wi10-tile[data-s="down"] .hb-wi10-led { animation: hb-wi10-blink 1.2s steps(2, jump-none) infinite; }
@keyframes hb-wi10-blink { 50% { opacity: 0.35; } }
.hb-wi10-nm { font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi10-rg { margin-left: auto; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; color: #5f5f5f; }
.hb-wi10-nums { display: flex; align-items: baseline; gap: 12px; font-variant-numeric: tabular-nums; }
.hb-wi10-nums strong { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.hb-wi10-nums strong small { font-size: 11px; font-weight: 500; color: #6f6f6f; margin-left: 2px; }
.hb-wi10-nums span { font-size: 11px; color: #6f6f6f; }
.hb-wi10-beats { display: grid; grid-template-columns: repeat(${BEATS}, 1fr); gap: 2px; height: 18px; align-items: end; }
.hb-wi10-beats i { display: block; border-radius: 1.5px; background: color-mix(in srgb, var(--hb-wi10-s) 70%, #111); transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.hb-wi10-beats i[data-bad="true"] { background: #f5b544; }
.hb-wi10-beats i[data-bad="down"] { background: #ff5a4f; }
.hb-wi10-beats i:last-child { box-shadow: 0 0 6px var(--hb-wi10-s); }
.hb-wi10-side { display: flex; flex-direction: column; gap: 12px; }
.hb-wi10-panel { padding: 12px; border-radius: 12px; border: 1px solid #1c1c1c; background: #0c0c0c; }
.hb-wi10-ph { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8f8f8f; }
.hb-wi10-ph span { font-weight: 500; letter-spacing: 0; text-transform: none; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-wi10-map { position: relative; height: 128px; border-radius: 8px; background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1.2px); background-size: 8px 8px; overflow: hidden; }
.hb-wi10-map::before { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 40% 45%, transparent 40%, #0c0c0c 95%); }
.hb-wi10-pin { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 5px; font-size: 10px; color: #a1a1a1; white-space: nowrap; }
.hb-wi10-pin i { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wi10-s); }
.hb-wi10-pin i::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; border: 1px solid var(--hb-wi10-s); animation: hb-wi10-ring 2.4s ease-out infinite; }
@keyframes hb-wi10-ring { from { transform: scale(0.4); opacity: 0.9; } to { transform: scale(1.8); opacity: 0; } }
.hb-wi10-rate { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
.hb-wi10-rate div { display: grid; grid-template-columns: 62px 1fr 52px; align-items: center; gap: 8px; font-size: 11px; color: #a1a1a1; }
.hb-wi10-rate em { font-style: normal; height: 5px; border-radius: 3px; background: #1a1a1a; overflow: hidden; }
.hb-wi10-rate em b { display: block; height: 100%; border-radius: 3px; background: var(--hb-wi10-a); transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.hb-wi10-rate span { text-align: right; font-variant-numeric: tabular-nums; color: #ededed; }
.hb-wi10-up { display: flex; flex-direction: column; gap: 8px; }
.hb-wi10-up div { display: flex; flex-direction: column; gap: 4px; }
.hb-wi10-up p { display: flex; justify-content: space-between; margin: 0; font-size: 11px; color: #a1a1a1; }
.hb-wi10-up p b { color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi10-bars { display: grid; grid-template-columns: repeat(45, 1fr); gap: 1.5px; height: 14px; }
.hb-wi10-bars i { border-radius: 1px; background: #2f8f55; }
.hb-wi10-bars i[data-s="degraded"] { background: #f5b544; }
.hb-wi10-bars i[data-s="down"] { background: #ff5a4f; }
.hb-wi10-log { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.hb-wi10-log li { display: grid; grid-template-columns: 38px 8px 1fr; gap: 8px; align-items: baseline; font-size: 11.5px; color: #a1a1a1; line-height: 1.35; }
.hb-wi10-log time { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #5f5f5f; }
.hb-wi10-log i { width: 6px; height: 6px; border-radius: 50%; transform: translateY(-1px); }
@container (max-width: 820px) {
  .hb-wi10-layout { grid-template-columns: 1fr; }
  .hb-wi10-side { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
}
@container (max-width: 520px) {
  .hb-wi10 { padding: 12px; }
  .hb-wi10-sum { margin-left: 0; }
  .hb-wi10-tiles { grid-template-columns: 1fr 1fr; }
  .hb-wi10-beats { grid-template-columns: repeat(16, 1fr); }
  .hb-wi10-beats i:nth-child(-n + 16) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi10-banner::after, .hb-wi10-led, .hb-wi10-pin i::after { animation: none !important; }
  .hb-wi10-beats i, .hb-wi10-rate em b, .hb-wi10-tile { transition: none; }
}
`;

export function DashboardOpsWall({
  brand = "Watchtower",
  services = defaultServices,
  accent = "#2f7bff",
  live = true,
  interval = 1500,
  incident = { title: "Degraded performance: Checkout in eu-west", detail: "p95 latency 612 ms, error rate 1.8%. On call: Jonah Reyes", minutes: 23 },
  onServiceSelect,
  className,
  style,
  ...rest
}: DashboardOpsWallProps) {
  const [tick, setTick] = React.useState(0);
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!live) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), interval);
    return () => window.clearInterval(id);
  }, [live, interval]);

  const latencyAt = (s: OpsService, si: number, t: number) => {
    const jitter = s.status === "degraded" ? 0.35 : 0.18;
    const spike = rnd(si * 997 + t * 13) > 0.94 ? 1.8 : 1;
    return Math.max(1, s.latency * (1 + (rnd(si * 131 + t * 7) - 0.5) * jitter) * spike);
  };

  const seconds = (incident?.minutes ?? 0) * 60 + Math.round((tick * interval) / 1000);
  const elapsed = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const clockS = 14 * 3600 + 32 * 60 + 8 + Math.round((tick * interval) / 1000);
  const clock = `${String(Math.floor(clockS / 3600) % 24).padStart(2, "0")}:${String(Math.floor((clockS % 3600) / 60)).padStart(2, "0")}:${String(clockS % 60).padStart(2, "0")} UTC`;
  const counts = { ok: 0, degraded: 0, down: 0 } as Record<OpsStatus, number>;
  services.forEach((s) => {
    counts[s.status] += 1;
  });
  const regionRps = regions.map((r) => ({ ...r, rps: services.filter((s) => s.region === r.id).reduce((a, s, i) => a + s.rps * (1 + (rnd(i * 17 + tick * 3 + r.x) - 0.5) * 0.08), 0) }));
  const maxRps = Math.max(1, ...regionRps.map((r) => r.rps));
  const regionStatus = (id: string): OpsStatus => {
    const list = services.filter((s) => s.region === id);
    if (list.some((s) => s.status === "down")) return "down";
    if (list.some((s) => s.status === "degraded")) return "degraded";
    return "ok";
  };
  const core = services.slice(0, 4);

  return (
    <div {...rest} className={["hb-wi10", className].filter(Boolean).join(" ")} style={{ ...style, ["--hb-wi10-a" as string]: accent } as React.CSSProperties}>
      <style href="hb-dashboard-ops-wall" precedence="default">{css}</style>
      <div className="hb-wi10-top">
        <div className="hb-wi10-brand">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 1.5 15.5 4v4.6c0 3.8-2.7 6.8-6.5 7.9-3.8-1.1-6.5-4.1-6.5-7.9V4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5.5 9.2h1.8l1.2-2.4 1.6 4.4 1.1-2h1.3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {brand}
        </div>
        <span className="hb-wi10-clock">{clock}</span>
        <div className="hb-wi10-sum">
          {(Object.keys(counts) as OpsStatus[]).map((k) => (
            <span key={k}>
              <i style={{ background: statusColor[k] }} />
              <b>{counts[k]}</b> {statusLabel[k].toLowerCase()}
            </span>
          ))}
        </div>
      </div>
      {incident ? (
        <div className="hb-wi10-banner" role="status">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 2.2 16.4 15H1.6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 7v3.6M9 12.8v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div>
            <b>{incident.title}</b>
            <p>{incident.detail}</p>
          </div>
          <time aria-label={`Open for ${elapsed}`}>{elapsed}</time>
        </div>
      ) : null}
      <div className="hb-wi10-layout">
        <div className="hb-wi10-tiles">
          {services.map((s, si) => {
            const lat = latencyAt(s, si, tick);
            return (
              <button
                key={s.id}
                type="button"
                className="hb-wi10-tile"
                data-s={s.status}
                aria-pressed={selected === s.id}
                aria-label={`${s.name}, ${statusLabel[s.status]}, ${Math.round(lat)} milliseconds`}
                style={{ ["--hb-wi10-s" as string]: statusColor[s.status] } as React.CSSProperties}
                onClick={() => {
                  setSelected((v) => (v === s.id ? null : s.id));
                  onServiceSelect?.(s);
                }}
              >
                <span className="hb-wi10-th">
                  <span className="hb-wi10-led" aria-hidden="true" />
                  <span className="hb-wi10-nm">{s.name}</span>
                  <span className="hb-wi10-rg">{s.region}</span>
                </span>
                <span className="hb-wi10-nums">
                  <strong>
                    {Math.round(lat)}
                    <small>ms</small>
                  </strong>
                  <span>{s.rps >= 1000 ? `${(s.rps / 1000).toFixed(1)}k` : s.rps} rps</span>
                  <span>{s.uptime.toFixed(2)}%</span>
                </span>
                <span className="hb-wi10-beats" aria-hidden="true">
                  {Array.from({ length: BEATS }, (_, b) => {
                    const t = tick - (BEATS - 1 - b);
                    const v = latencyAt(s, si, t);
                    const h = Math.min(100, 22 + (v / (s.latency * 2)) * 78);
                    const bad = s.status === "down" ? "down" : v > s.latency * 1.5 || (s.status === "degraded" && rnd(si * 7 + t) > 0.6);
                    return <i key={b} data-bad={bad === "down" ? "down" : bad ? "true" : "false"} style={{ height: `${h.toFixed(0)}%` }} />;
                  })}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hb-wi10-side">
          <div className="hb-wi10-panel">
            <div className="hb-wi10-ph">
              Regions
              <span>{(regionRps.reduce((a, r) => a + r.rps, 0) / 1000).toFixed(1)}k rps</span>
            </div>
            <div className="hb-wi10-map" aria-hidden="true">
              {regions.map((r) => (
                <span key={r.id} className="hb-wi10-pin" style={{ left: `${r.x}%`, top: `${r.y}%`, ["--hb-wi10-s" as string]: statusColor[regionStatus(r.id)] } as React.CSSProperties}>
                  <i />
                  {r.label}
                </span>
              ))}
            </div>
            <div className="hb-wi10-rate">
              {regionRps.map((r) => (
                <div key={r.id}>
                  {r.label}
                  <em>
                    <b style={{ width: `${((r.rps / maxRps) * 100).toFixed(1)}%`, background: regionStatus(r.id) === "ok" ? undefined : statusColor[regionStatus(r.id)] }} />
                  </em>
                  <span>{(r.rps / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hb-wi10-panel">
            <div className="hb-wi10-ph">
              Uptime
              <span>45 days</span>
            </div>
            <div className="hb-wi10-up">
              {core.map((s, si) => (
                <div key={s.id}>
                  <p>
                    {s.name}
                    <b>{s.uptime.toFixed(2)}%</b>
                  </p>
                  <span className="hb-wi10-bars" aria-label={`${s.name} uptime ${s.uptime.toFixed(2)} percent`} role="img">
                    {Array.from({ length: 45 }, (_, d) => {
                      const v = rnd(si * 4099 + d * 37);
                      const st: OpsStatus = d === 44 && s.status !== "ok" ? s.status : v > 0.985 ? "down" : v > 0.97 - (100 - s.uptime) * 0.05 ? "degraded" : "ok";
                      return <i key={d} data-s={st} />;
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="hb-wi10-panel">
            <div className="hb-wi10-ph">
              Event log
              <span>Today</span>
            </div>
            <ul className="hb-wi10-log">
              {incidents.map((e) => (
                <li key={e.t}>
                  <time>{e.t}</time>
                  <i style={{ background: statusColor[e.tone] }} />
                  {e.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

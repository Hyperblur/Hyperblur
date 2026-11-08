"use client";

import * as React from "react";

export interface BentoHoverExpandTile {
  title: string;
  summary: string;
  points: string[];
  stat: string;
}

export interface BentoHoverExpandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiles?: BentoHoverExpandTile[];
  defaultIndex?: number;
  onItemSelect?: (index: number) => void;
  accent?: string;
}

const css = `
@keyframes hb-wa9-rise { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa9-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wa9-scrub { 0%, 100% { left: 18%; } 50% { left: 72%; } }
@keyframes hb-wa9-pulse { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(4); opacity: 0; } }
@keyframes hb-wa9-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-wa9-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
.hb-wa9 {
  --hb-wa9-accent: #f59e0b;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa9 *, .hb-wa9 *::before, .hb-wa9 *::after { box-sizing: border-box; }
.hb-wa9 em, .hb-wa9 i { font-style: normal; }
.hb-wa9-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa9-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px 40px; flex-wrap: wrap; margin-bottom: clamp(24px, 3.6cqi, 40px); }
.hb-wa9-eyebrow { margin: 0 0 12px; color: var(--hb-wa9-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-wa9-title { margin: 0; max-width: 600px; font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa9-sub { margin: 0; max-width: 360px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-wa9-grid { display: grid; grid-template-columns: var(--hb-wa9-cols); grid-template-rows: var(--hb-wa9-rows); height: 540px; gap: 12px; transition: grid-template-columns .6s cubic-bezier(.22, 1, .36, 1), grid-template-rows .6s cubic-bezier(.22, 1, .36, 1); }
.hb-wa9-tile { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; padding: 18px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 20px; background: linear-gradient(180deg, #131313, #0e0e0e); color: inherit; font: inherit; text-align: left; cursor: pointer; animation: hb-wa9-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--i) * 70ms); transition: border-color .3s ease, background .3s ease; }
.hb-wa9-tile::before { content: ""; position: absolute; inset: 0; background: radial-gradient(80% 70% at 100% 0%, color-mix(in srgb, var(--hb-wa9-accent) 16%, transparent), transparent 70%); opacity: 0; transition: opacity .5s ease; pointer-events: none; }
.hb-wa9-tile[aria-expanded="true"] { border-color: color-mix(in srgb, var(--hb-wa9-accent) 40%, transparent); }
.hb-wa9-tile[aria-expanded="true"]::before { opacity: 1; }
.hb-wa9-tile:focus-visible { outline: 2px solid var(--hb-wa9-accent); outline-offset: 3px; }
.hb-wa9-top { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-wa9-n { color: #5f5f5f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-wa9-plus { display: grid; place-items: center; width: 26px; height: 26px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 50%; color: #a1a1a1; transition: transform .5s cubic-bezier(.22, 1, .36, 1), background .3s ease, color .3s ease; }
.hb-wa9-tile[aria-expanded="true"] .hb-wa9-plus { transform: rotate(45deg); background: var(--hb-wa9-accent); border-color: transparent; color: #140d00; }
.hb-wa9-tile h3 { position: relative; margin: auto 0 0; padding-top: 14px; font-size: clamp(16px, 1.8cqi, 20px); font-weight: 600; letter-spacing: -.015em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wa9-sum { position: relative; margin: 4px 0 0; color: #8f8f8f; font-size: 13px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-wa9-more { position: relative; display: none; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 18px; flex: 1; min-height: 0; margin-top: 14px; }
.hb-wa9-tile[aria-expanded="true"] .hb-wa9-more { display: grid; animation: hb-wa9-in .5s cubic-bezier(.22, 1, .36, 1) .15s both; }
.hb-wa9-tile[aria-expanded="true"] h3 { margin-top: 0; }
.hb-wa9-vis { position: relative; min-height: 0; overflow: hidden; border: 1px solid rgba(255, 255, 255, .06); border-radius: 14px; background: #0a0a0a; }
.hb-wa9-pts { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 13px; color: #cfcfcf; }
.hb-wa9-pts li { display: flex; gap: 8px; line-height: 1.45; }
.hb-wa9-pts li::before { content: ""; flex: none; width: 6px; height: 6px; margin-top: 6px; border-radius: 2px; background: var(--hb-wa9-accent); transform: rotate(45deg); }
.hb-wa9-stat { margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, .08); color: #8f8f8f; font-size: 12px; }
.hb-wa9-stat b { display: block; color: #ededed; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-wa9-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-wa9-svg path { fill: none; stroke-width: 2; stroke-linecap: round; vector-effect: non-scaling-stroke; stroke-dasharray: 1; animation: hb-wa9-draw 1s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa9-svg circle.hb-wa9-pul { fill: none; stroke: var(--hb-wa9-accent); transform-box: fill-box; transform-origin: center; animation: hb-wa9-pulse 1.8s ease-out infinite; }
.hb-wa9-tl { position: absolute; left: 10%; right: 10%; top: 50%; height: 2px; background: #262626; }
.hb-wa9-tl i { position: absolute; top: -4px; width: 2px; height: 10px; background: #3a3a3a; }
.hb-wa9-scr { position: absolute; top: calc(50% - 22px); width: 2px; height: 44px; margin-left: -1px; background: var(--hb-wa9-accent); animation: hb-wa9-scrub 5s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa9-scr span { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 4px; padding: 2px 6px; border-radius: 6px; background: var(--hb-wa9-accent); color: #140d00; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; white-space: nowrap; }
.hb-wa9-qs { position: absolute; inset: 12px; display: flex; flex-direction: column; justify-content: center; gap: 9px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #a1a1a1; }
.hb-wa9-qs div { display: grid; grid-template-columns: minmax(0, 1fr) 46px; gap: 8px; align-items: center; }
.hb-wa9-qs div > span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-wa9-qs i { grid-column: 1 / -1; height: 4px; border-radius: 4px; background: linear-gradient(90deg, var(--hb-wa9-accent), color-mix(in srgb, var(--hb-wa9-accent) 30%, #111)); width: var(--w); transform-origin: left; animation: hb-wa9-bar .8s cubic-bezier(.22, 1, .36, 1) both; animation-delay: calc(var(--j) * 100ms + 200ms); }
.hb-wa9-diff { position: absolute; inset: 12px; display: flex; flex-direction: column; justify-content: center; gap: 3px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; white-space: nowrap; overflow: hidden; }
.hb-wa9-diff span { padding: 2px 6px; border-radius: 4px; color: #8f8f8f; }
.hb-wa9-diff span[data-k="+"] { background: rgba(34, 197, 94, .12); color: #86efac; }
.hb-wa9-diff span[data-k="-"] { background: rgba(244, 63, 94, .1); color: #fda4af; }
.hb-wa9-hit { position: absolute; inset: 14px; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
.hb-wa9-hit strong { font-family: var(--font-grotesk, inherit); font-size: 34px; font-weight: 600; letter-spacing: -.04em; }
.hb-wa9-hit small { color: #8f8f8f; font-size: 11px; }
.hb-wa9-hbar { display: flex; height: 10px; overflow: hidden; border-radius: 5px; }
.hb-wa9-hbar i { height: 100%; transform-origin: left; animation: hb-wa9-bar .9s cubic-bezier(.22, 1, .36, 1) both; }
@container (max-width: 720px) {
  .hb-wa9-grid { grid-template-columns: minmax(0, 1fr) !important; grid-template-rows: none !important; height: auto; }
  .hb-wa9-tile[aria-expanded="true"] .hb-wa9-more { grid-template-columns: minmax(0, 1fr); }
  .hb-wa9-vis { height: 150px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa9 *, .hb-wa9 *::before, .hb-wa9 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultTiles: BentoHoverExpandTile[] = [
  { title: "Branch the database", summary: "A full copy of production for every pull request, in two seconds.", points: ["Copy-on-write, so branches cost nothing until they change", "Auto-deleted when the PR merges"], stat: "2.1s to branch 480 GB" },
  { title: "Point-in-time restore", summary: "Rewind to any second in the last 30 days.", points: ["Restore to a new branch, never over production", "Diff the restored rows before you swap"], stat: "30 days of second-level history" },
  { title: "Read replicas", summary: "Serve reads from the region closest to each user.", points: ["Add a region with one command", "Replica lag shown live per query"], stat: "11 regions, p50 lag 38 ms" },
  { title: "Edge cache", summary: "Repeat queries answered before they reach the database.", points: ["Invalidated automatically on write", "Per-table rules, no code changes"], stat: "94% hit ratio on reads" },
  { title: "Query insights", summary: "The five queries costing you the most, ranked.", points: ["Suggested indexes with expected gain", "One click to test on a branch"], stat: "3.4x faster median query" },
  { title: "Schema diff", summary: "Review migrations like code, with a safe deploy.", points: ["Blocks locking migrations at peak", "A rollback plan ships with every change"], stat: "Zero-downtime migrations, every time" },
];

function VisBranch() {
  return (
    <svg className="hb-wa9-svg" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10 80 H190" stroke="#3a3a3a" pathLength={1} />
      <path d="M40 80 C 60 80, 60 40, 90 40 H 150 C 170 40, 170 80, 186 80" stroke="var(--hb-wa9-accent)" pathLength={1} style={{ animationDelay: ".2s" }} />
      <path d="M100 80 C 115 80, 115 104, 140 104 H 170" stroke="#60a5fa" pathLength={1} style={{ animationDelay: ".5s" }} />
      <circle cx="40" cy="80" r="4" fill="#ededed" />
      <circle cx="150" cy="40" r="4" fill="var(--hb-wa9-accent)" />
      <circle className="hb-wa9-pul" cx="150" cy="40" r="3" />
      <circle cx="170" cy="104" r="4" fill="#60a5fa" />
    </svg>
  );
}

function VisRestore() {
  return (
    <>
      <div className="hb-wa9-tl">
        {[0, 20, 40, 60, 80, 100].map((l) => (
          <i key={l} style={{ left: `${l}%` }} />
        ))}
      </div>
      <i className="hb-wa9-scr"><span>Oct 29 14:02:17</span></i>
    </>
  );
}

function VisReplicas() {
  const nodes = [[100, 60], [40, 34], [160, 30], [52, 96], [150, 94]];
  return (
    <svg className="hb-wa9-svg" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {nodes.slice(1).map(([x, y], j) => (
        <path key={j} d={`M100 60 L${x} ${y}`} stroke="color-mix(in srgb, var(--hb-wa9-accent) 60%, #333)" pathLength={1} style={{ animationDelay: `${j * 0.12}s` }} />
      ))}
      {nodes.map(([x, y], j) => (
        <g key={j}>
          {j > 0 && <circle className="hb-wa9-pul" cx={x} cy={y} r="3" style={{ animationDelay: `${j * 0.3}s` }} />}
          <circle cx={x} cy={y} r={j === 0 ? 8 : 5} fill={j === 0 ? "var(--hb-wa9-accent)" : "#ededed"} />
        </g>
      ))}
    </svg>
  );
}

function VisCache() {
  return (
    <div className="hb-wa9-hit">
      <strong>94.2%</strong>
      <div className="hb-wa9-hbar">
        <i style={{ width: "94.2%", background: "var(--hb-wa9-accent)" }} />
        <i style={{ width: "5.8%", background: "#333", animationDelay: ".3s" }} />
      </div>
      <small>12.8M cached of 13.6M reads today</small>
    </div>
  );
}

function VisInsights() {
  const q = [["SELECT * FROM orders WHERE…", "412ms", 92], ["UPDATE sessions SET…", "188ms", 54], ["SELECT count(*) FROM events…", "121ms", 36]];
  return (
    <div className="hb-wa9-qs">
      {q.map(([t, ms, w], j) => (
        <div key={String(t)}>
          <span>{t}</span>
          <span>{ms}</span>
          <i style={{ "--w": `${w}%`, "--j": j } as React.CSSProperties} />
        </div>
      ))}
    </div>
  );
}

function VisDiff() {
  return (
    <div className="hb-wa9-diff">
      <span>  table users (</span>
      <span>    id uuid primary key,</span>
      <span data-k="-">-   name text,</span>
      <span data-k="+">+   first_name text not null,</span>
      <span data-k="+">+   last_name text not null,</span>
      <span>  )</span>
    </div>
  );
}

const visuals = [VisBranch, VisRestore, VisReplicas, VisCache, VisInsights, VisDiff];

export function BentoHoverExpand({
  eyebrow = "quarry / platform",
  title = "Postgres with the sharp edges filed off",
  subtitle = "Hover any tile to open it. The grid makes room, the rest step aside.",
  tiles = defaultTiles,
  defaultIndex = 0,
  onItemSelect,
  accent = "#f59e0b",
  className,
  style,
  ...rest
}: BentoHoverExpandProps) {
  const [active, setActive] = React.useState(defaultIndex);
  const list = tiles.slice(0, 6);
  const cols = 3;
  const rowsN = Math.ceil(list.length / cols);
  const ac = active % cols;
  const ar = Math.floor(active / cols);
  const colTpl = Array.from({ length: cols }, (_, c) => (c === ac ? "2.3fr" : "1fr")).join(" ");
  const rowTpl = Array.from({ length: rowsN }, (_, r) => (r === ar ? "1.7fr" : "1fr")).join(" ");

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    onItemSelect?.(i);
  };

  return (
    <section className={["hb-wa9", className].filter(Boolean).join(" ")} style={{ "--hb-wa9-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-bento-hover-expand" precedence="default">{css}</style>
      <div className="hb-wa9-in">
        <div className="hb-wa9-head">
          <div>
            <p className="hb-wa9-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa9-title">{title}</h2>
          </div>
          <p className="hb-wa9-sub">{subtitle}</p>
        </div>
        <div className="hb-wa9-grid" style={{ "--hb-wa9-cols": colTpl, "--hb-wa9-rows": rowTpl } as React.CSSProperties}>
          {list.map((t, i) => {
            const Vis = visuals[i % visuals.length];
            const open = i === active;
            return (
              <div
                key={t.title}
                role="button"
                tabIndex={0}
                className="hb-wa9-tile"
                aria-expanded={open}
                style={{ "--i": i } as React.CSSProperties}
                onPointerEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(i);
                  }
                }}
              >
                <div className="hb-wa9-top">
                  <span className="hb-wa9-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hb-wa9-plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </span>
                </div>
                <h3>{t.title}</h3>
                <p className="hb-wa9-sum">{t.summary}</p>
                {open && (
                  <div className="hb-wa9-more">
                    <div className="hb-wa9-vis">
                      <Vis />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
                      <ul className="hb-wa9-pts">
                        {t.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <div className="hb-wa9-stat">
                        <b>{t.stat.split(/ (.+)/)[0]}</b>
                        {t.stat.split(/ (.+)/)[1]}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export interface ProfileDevLanguage {
  name: string;
  share: number;
  color: string;
}

export interface ProfileDevRepo {
  name: string;
  description: string;
  stars: string;
  language: string;
}

export interface ProfileDevSkylineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  handle?: string;
  role?: string;
  bio?: string;
  weeks?: number;
  startDate?: string;
  seed?: number;
  contributions?: number[];
  languages?: ProfileDevLanguage[];
  repos?: ProfileDevRepo[];
  followLabel?: string;
  onFollow?: () => void;
  onCellSelect?: (cell: { date: string; count: number }) => void;
  accent?: string;
}

const defaultLanguages: ProfileDevLanguage[] = [
  { name: "Rust", share: 46, color: "#f59e0b" },
  { name: "TypeScript", share: 31, color: "#38bdf8" },
  { name: "Go", share: 14, color: "#2dd4bf" },
  { name: "Shell", share: 9, color: "#a3a3a3" },
];

const defaultRepos: ProfileDevRepo[] = [
  { name: "quarry", description: "Embedded columnar store for edge devices", stars: "4.2k", language: "Rust" },
  { name: "tidepool", description: "Backpressure-aware job queue for Postgres", stars: "1.8k", language: "Go" },
  { name: "lintel", description: "Zero-config schema linter for TypeScript APIs", stars: "912", language: "TypeScript" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function addDays(start: string, n: number) {
  const [ys, ms, ds] = start.split("-").map(Number);
  let y = ys;
  let m = ms - 1;
  let d = ds + n;
  const dim = (yy: number, mm: number) => [31, (yy % 4 === 0 && yy % 100 !== 0) || yy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mm];
  while (d > dim(y, m)) {
    d -= dim(y, m);
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
  }
  return { y, m, d };
}

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return x >>> 0;
}

const css = `
@keyframes hb-wd10-rise { from { transform: scaleY(0.02); } to { transform: scaleY(1); } }
@keyframes hb-wd10-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.hb-wd10 {
  --hb-wd10-accent: #38bdf8;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: radial-gradient(60% 50% at 80% 10%, color-mix(in srgb, var(--hb-wd10-accent) 9%, transparent), transparent 70%), #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd10 *, .hb-wd10 *::before, .hb-wd10 *::after { box-sizing: border-box; }
.hb-wd10-in { max-width: 1120px; margin: 0 auto; padding: 64px 20px 84px; display: grid; gap: 28px; }
@container (min-width: 900px) { .hb-wd10-in { grid-template-columns: 300px 1fr; gap: 40px; align-items: start; } }
.hb-wd10-card { display: grid; gap: 16px; }
.hb-wd10-who { display: flex; gap: 14px; align-items: center; }
.hb-wd10-av { position: relative; width: 64px; height: 64px; border-radius: 18px; display: grid; place-items: center; font: 600 22px/1 var(--font-grotesk, inherit); color: #04131c; background: conic-gradient(from 210deg, var(--hb-wd10-accent), #a78bfa, #f472b6, var(--hb-wd10-accent)); box-shadow: 0 10px 30px -12px var(--hb-wd10-accent); flex: none; }
.hb-wd10-av::after { content: ""; position: absolute; right: -3px; bottom: -3px; width: 16px; height: 16px; border-radius: 50%; background: #22c55e; border: 3px solid #0a0a0a; }
.hb-wd10-name { margin: 0; font: 600 22px/1.15 var(--font-grotesk, inherit); letter-spacing: -0.02em; }
.hb-wd10-handle { margin: 4px 0 0; font: 500 13px/1 var(--font-mono, monospace); color: #8f8f8f; }
.hb-wd10-role { display: inline-flex; align-items: center; gap: 6px; width: fit-content; padding: 5px 10px; border-radius: 999px; background: #141414; border: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #cfcfcf; }
.hb-wd10-role::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-wd10-accent); }
.hb-wd10-bio { margin: 0; font-size: 14px; line-height: 1.6; color: #9a9a9a; }
.hb-wd10-follow { appearance: none; border: 0; height: 40px; border-radius: 10px; background: #ededed; color: #0a0a0a; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.4, 0.5, 1), background-color 0.2s ease; }
.hb-wd10-follow:hover { background: #fff; }
.hb-wd10-follow:active { transform: scale(0.98); }
.hb-wd10-follow[aria-pressed="true"] { background: #171717; color: #ededed; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12); }
.hb-wd10-follow:focus-visible { outline: 2px solid var(--hb-wd10-accent); outline-offset: 3px; }
.hb-wd10-langbar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; gap: 2px; }
.hb-wd10-langbar span { height: 100%; animation: hb-wd10-fade 0.6s ease both; }
.hb-wd10-langs { list-style: none; margin: 10px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; font-size: 12.5px; color: #a1a1a1; }
.hb-wd10-langs li { display: flex; align-items: center; gap: 7px; }
.hb-wd10-langs i { width: 8px; height: 8px; border-radius: 50%; font-style: normal; }
.hb-wd10-langs b { margin-left: auto; font: 500 11.5px var(--font-mono, monospace); color: #6f6f6f; }
.hb-wd10-main { display: grid; gap: 16px; min-width: 0; }
.hb-wd10-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.hb-wd10-kpi { padding: 14px 16px; border-radius: 14px; background: #111; border: 1px solid rgba(255,255,255,0.07); animation: hb-wd10-fade 0.5s ease both; }
.hb-wd10-kpi b { display: block; font: 600 24px/1 var(--font-grotesk, inherit); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-wd10-kpi span { display: block; margin-top: 6px; font-size: 12px; color: #8f8f8f; }
.hb-wd10-kpi:first-child b { color: var(--hb-wd10-accent); }
.hb-wd10-city { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, #0f1214, #0c0c0c 70%); padding: 16px 16px 12px; overflow: hidden; }
.hb-wd10-cityhead { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 13px; color: #a1a1a1; }
.hb-wd10-cityhead strong { color: #ededed; font-weight: 600; }
.hb-wd10-legend { display: inline-flex; align-items: center; gap: 4px; font: 500 11px var(--font-mono, monospace); color: #6f6f6f; }
.hb-wd10-legend i { width: 10px; height: 10px; border-radius: 2px; font-style: normal; }
.hb-wd10-svg { display: block; width: 100%; height: auto; margin-top: 6px; outline: none; border-radius: 10px; }
.hb-wd10-svg:focus-visible { box-shadow: 0 0 0 2px var(--hb-wd10-accent); }
.hb-wd10-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: hb-wd10-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; cursor: crosshair; }
.hb-wd10-bar polygon { transition: opacity 0.2s ease; }
.hb-wd10-svg:hover .hb-wd10-bar:not([data-on="true"]) polygon, .hb-wd10-svg:focus-visible .hb-wd10-bar:not([data-on="true"]) polygon { opacity: 0.55; }
.hb-wd10-bar[data-on="true"] polygon.t { fill: #fff; }
.hb-wd10-tip { display: flex; justify-content: space-between; gap: 10px; margin-top: 8px; padding: 10px 12px; border-radius: 10px; background: #121212; border: 1px solid rgba(255,255,255,0.06); font-size: 12.5px; color: #a1a1a1; min-height: 40px; align-items: center; }
.hb-wd10-tip b { color: #ededed; font-weight: 600; }
.hb-wd10-tip span:last-child { font: 500 11px var(--font-mono, monospace); color: #6f6f6f; }
.hb-wd10-repos { display: grid; gap: 10px; }
@container (min-width: 700px) { .hb-wd10-repos { grid-template-columns: repeat(3, 1fr); } }
.hb-wd10-repo { display: grid; gap: 6px; padding: 14px; border-radius: 14px; background: #111; border: 1px solid rgba(255,255,255,0.07); text-decoration: none; color: inherit; transition: border-color 0.25s ease, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1); }
.hb-wd10-repo:hover { border-color: color-mix(in srgb, var(--hb-wd10-accent) 45%, transparent); transform: translateY(-2px); }
.hb-wd10-repo:focus-visible { outline: 2px solid var(--hb-wd10-accent); outline-offset: 2px; }
.hb-wd10-repo b { font: 600 14px/1.2 var(--font-mono, monospace); color: var(--hb-wd10-accent); }
.hb-wd10-repo span { font-size: 12.5px; color: #9a9a9a; line-height: 1.45; }
.hb-wd10-repo small { display: flex; gap: 12px; font: 500 11.5px var(--font-mono, monospace); color: #7a7a7a; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd10 *, .hb-wd10 *::before, .hb-wd10 *::after { animation: none !important; transition: none !important; }
}
`;

export function ProfileDevSkyline({
  name = "Teodor Vasquez",
  handle = "@tvasquez",
  role = "Systems engineer at Brightline",
  bio = "Builds storage engines and the boring tools around them. Maintainer of quarry. Writes about latency, caches and good error messages.",
  weeks = 30,
  startDate = "2026-04-06",
  seed = 7,
  contributions,
  languages = defaultLanguages,
  repos = defaultRepos,
  followLabel = "Follow",
  onFollow,
  onCellSelect,
  accent = "#38bdf8",
  className = "",
  style,
  ...rest
}: ProfileDevSkylineProps) {
  const total = weeks * 7;
  const data = React.useMemo(() => {
    if (contributions && contributions.length >= total) return contributions.slice(0, total);
    return Array.from({ length: total }, (_, i) => {
      const day = i % 7;
      const w = Math.floor(i / 7);
      const r = hash(i * 13 + seed);
      if (day >= 5 && r % 3 !== 0) return r % 2;
      const sprint = Math.sin(w * 0.55 + seed) * 0.5 + 0.5;
      if (r % 9 === 0) return 0;
      return Math.round(1 + sprint * 9 + (r % 5));
    });
  }, [contributions, total, seed]);
  const [sel, setSel] = React.useState<number | null>(null);
  const [following, setFollowing] = React.useState(false);

  const sum = data.reduce((a, b) => a + b, 0);
  let streak = 0;
  for (let i = data.length - 1; i >= 0 && data[i] > 0; i--) streak++;
  let best = 0;
  let run = 0;
  for (const v of data) {
    run = v > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  const maxV = Math.max(1, ...data);

  const cw = 10;
  const dx = 6;
  const dy = 8;
  const unit = 54 / maxV;
  const W = weeks * (cw + 2) + 7 * dx + 20;
  const H = 7 * dy + 80;
  const ox = 7 * dx + 6;
  const oy = 62;

  const level = (v: number) => (v === 0 ? 0 : Math.min(4, Math.ceil((v / maxV) * 4)));
  const tops = ["#1b1f22", "color-mix(in srgb, var(--hb-wd10-accent) 35%, #12181c)", "color-mix(in srgb, var(--hb-wd10-accent) 60%, #12181c)", "color-mix(in srgb, var(--hb-wd10-accent) 82%, #12181c)", "var(--hb-wd10-accent)"];

  const label = (i: number) => {
    const { m, d } = addDays(startDate, i);
    return `${dayNames[i % 7]}, ${months[m]} ${d}`;
  };

  const choose = (i: number) => {
    setSel(i);
    const { y, m, d } = addDays(startDate, i);
    onCellSelect?.({ date: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, count: data[i] });
  };

  const onKey = (e: React.KeyboardEvent) => {
    const cur = sel ?? data.length - 1;
    const map: Record<string, number> = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const n = cur + map[e.key];
    if (n >= 0 && n < data.length) choose(n);
  };

  const order: number[] = [];
  for (let d = 0; d < 7; d++) for (let w = 0; w < weeks; w++) order.push(w * 7 + d);

  const monthMarks: { x: number; text: string }[] = [];
  let lastM = -1;
  for (let w = 0; w < weeks; w++) {
    const { m } = addDays(startDate, w * 7);
    if (m !== lastM) {
      monthMarks.push({ x: ox + w * (cw + 2) - 6 * dx, text: months[m] });
      lastM = m;
    }
  }

  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("");

  return (
    <section className={`hb-wd10 ${className}`} style={{ "--hb-wd10-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-profile-dev-skyline" precedence="default">{css}</style>
      <div className="hb-wd10-in">
        <aside className="hb-wd10-card">
          <div className="hb-wd10-who">
            <span className="hb-wd10-av" aria-hidden="true">{initials}</span>
            <div>
              <h2 className="hb-wd10-name">{name}</h2>
              <p className="hb-wd10-handle">{handle}</p>
            </div>
          </div>
          <span className="hb-wd10-role">{role}</span>
          <p className="hb-wd10-bio">{bio}</p>
          <button
            type="button"
            className="hb-wd10-follow"
            aria-pressed={following}
            onClick={() => {
              setFollowing((f) => !f);
              onFollow?.();
            }}
          >
            {following ? "Following" : followLabel}
          </button>
          <div>
            <div className="hb-wd10-langbar" aria-hidden="true">
              {languages.map((l, i) => (
                <span key={l.name} style={{ width: `${l.share}%`, background: l.color, animationDelay: `${(i * 0.1).toFixed(1)}s` }} />
              ))}
            </div>
            <ul className="hb-wd10-langs">
              {languages.map((l) => (
                <li key={l.name}>
                  <i style={{ background: l.color }} />
                  {l.name}
                  <b>{l.share}%</b>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="hb-wd10-main">
          <div className="hb-wd10-kpis">
            <div className="hb-wd10-kpi"><b>{sum.toLocaleString("en-US")}</b><span>contributions, {weeks} weeks</span></div>
            <div className="hb-wd10-kpi" style={{ animationDelay: "0.08s" }}><b>{streak} days</b><span>current streak</span></div>
            <div className="hb-wd10-kpi" style={{ animationDelay: "0.16s" }}><b>{best} days</b><span>longest streak</span></div>
          </div>
          <div className="hb-wd10-city">
            <div className="hb-wd10-cityhead">
              <span><strong>Contribution skyline</strong>, one tower per day</span>
              <span className="hb-wd10-legend" aria-hidden="true">
                Less
                {tops.map((c, i) => (
                  <i key={i} style={{ background: c }} />
                ))}
                More
              </span>
            </div>
            <svg
              className="hb-wd10-svg"
              viewBox={`0 0 ${W} ${H}`}
              tabIndex={0}
              role="img"
              aria-label={`${sum} contributions over ${weeks} weeks. Use arrow keys to inspect days.`}
              onKeyDown={onKey}
              onPointerLeave={() => setSel(null)}
            >
              {monthMarks.map((mk) => (
                <text key={mk.text + mk.x} x={mk.x} y={H - 4} fill="#5f5f5f" style={{ font: "500 8px var(--font-mono, monospace)" }}>{mk.text}</text>
              ))}
              {order.map((i) => {
                const w = Math.floor(i / 7);
                const d = i % 7;
                const v = data[i];
                const h = v === 0 ? 1.2 : 3 + v * unit;
                const x = ox + w * (cw + 2) - d * dx;
                const y = oy + d * dy;
                const lv = level(v);
                const top = `${x},${(y - h).toFixed(1)} ${x + cw},${(y - h).toFixed(1)} ${x + cw - dx},${(y + dy - h).toFixed(1)} ${x - dx},${(y + dy - h).toFixed(1)}`;
                const front = `${x - dx},${(y + dy - h).toFixed(1)} ${x + cw - dx},${(y + dy - h).toFixed(1)} ${x + cw - dx},${y + dy} ${x - dx},${y + dy}`;
                const side = `${x + cw},${(y - h).toFixed(1)} ${x + cw - dx},${(y + dy - h).toFixed(1)} ${x + cw - dx},${y + dy} ${x + cw},${y}`;
                return (
                  <g key={i} className="hb-wd10-bar" data-on={sel === i} style={{ animationDelay: `${(w * 0.025 + d * 0.03).toFixed(3)}s` }} onPointerEnter={() => choose(i)}>
                    <polygon points={front} fill={tops[lv]} style={{ filter: "brightness(0.62)" }} />
                    <polygon points={side} fill={tops[lv]} style={{ filter: "brightness(0.42)" }} />
                    <polygon className="t" points={top} fill={tops[lv]} />
                  </g>
                );
              })}
            </svg>
            <div className="hb-wd10-tip" aria-live="polite">
              {sel !== null ? (
                <>
                  <span>
                    <b>{data[sel]} {data[sel] === 1 ? "contribution" : "contributions"}</b> on {label(sel)}
                  </span>
                  <span>week {Math.floor(sel / 7) + 1}</span>
                </>
              ) : (
                <>
                  <span>Hover a tower or focus the chart and use the arrow keys</span>
                  <span>{weeks} weeks</span>
                </>
              )}
            </div>
          </div>
          <div className="hb-wd10-repos">
            {repos.map((r) => (
              <a key={r.name} className="hb-wd10-repo" href="#">
                <b>{r.name}</b>
                <span>{r.description}</span>
                <small>
                  <span>{r.language}</span>
                  <span>{r.stars} stars</span>
                </small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

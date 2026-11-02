"use client";

import * as React from "react";

export interface ProfileDevCardProject {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  href: string;
}

export interface ProfileDevCardStat {
  label: string;
  value: string;
}

export interface ProfileDevCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  handle?: string;
  role?: string;
  location?: string;
  bio?: string;
  status?: string;
  stack?: string[];
  stats?: ProfileDevCardStat[];
  projects?: ProfileDevCardProject[];
  weeks?: number;
  seed?: number;
  endDate?: string;
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  accent?: string;
}

const defaultProjects: ProfileDevCardProject[] = [
  { name: "tidewave", description: "Local-first sync engine with CRDT merging and durable offline queues.", language: "Rust", languageColor: "#dea584", stars: 8421, forks: 312, href: "#tidewave" },
  { name: "quill-ts", description: "A tiny, fully typed parser combinator library for TypeScript.", language: "TypeScript", languageColor: "#3178c6", stars: 5108, forks: 201, href: "#quill-ts" },
  { name: "pgshift", description: "Zero-downtime Postgres schema migrations from the command line.", language: "Go", languageColor: "#00add8", stars: 2964, forks: 140, href: "#pgshift" },
  { name: "lumen-ui", description: "Accessible React primitives that ship with zero runtime styles.", language: "TypeScript", languageColor: "#3178c6", stars: 1873, forks: 96, href: "#lumen-ui" },
];

const defaultStats: ProfileDevCardStat[] = [
  { label: "followers", value: "3.4k" },
  { label: "following", value: "128" },
  { label: "stars earned", value: "21.7k" },
];

const css = `
.hb-kg7 {
  --hb-kg7-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg7 *, .hb-kg7 *::before, .hb-kg7 *::after { box-sizing: border-box; }
.hb-kg7::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(50% 50% at 10% 0%, color-mix(in srgb, var(--hb-kg7-accent) 10%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-kg7-inner { display: grid; gap: 28px; max-width: 1120px; margin: 0 auto; padding: 48px 16px 64px; }
.hb-kg7-mono { font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; }
.hb-kg7-side { min-width: 0; }
.hb-kg7-head { display: flex; align-items: center; gap: 16px; }
.hb-kg7-avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 84px;
  aspect-ratio: 1;
  flex: none;
  border-radius: 50%;
  background: conic-gradient(from 210deg, #0f766e, var(--hb-kg7-accent), #a3e635, #0f766e);
  color: #04130d;
  font-size: 30px;
  font-weight: 750;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2), 0 0 0 4px #0a0a0a, 0 0 0 5px rgba(255, 255, 255, .08);
}
.hb-kg7-dot { position: absolute; right: 2px; bottom: 4px; width: 16px; height: 16px; border: 3px solid #0a0a0a; border-radius: 50%; background: var(--hb-kg7-accent); }
.hb-kg7-name { margin: 0; font-size: clamp(22px, 3cqi, 26px); font-weight: 680; letter-spacing: -.02em; line-height: 1.15; }
.hb-kg7-handle { margin: 4px 0 0; color: #8f8f8f; font-size: 14px; }
.hb-kg7-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kg7-accent) 30%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kg7-accent) 8%, transparent);
  color: color-mix(in srgb, var(--hb-kg7-accent) 70%, #fff);
  font-size: 12px;
  font-weight: 500;
}
.hb-kg7-status svg { width: 14px; height: 14px; }
.hb-kg7-bio { margin: 14px 0 0; color: #cfcfcf; font-size: 14px; line-height: 1.6; text-wrap: pretty; }
.hb-kg7-facts { display: grid; gap: 8px; margin: 16px 0 0; padding: 0; list-style: none; color: #a1a1a1; font-size: 13px; }
.hb-kg7-facts li { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hb-kg7-facts svg { width: 15px; height: 15px; flex: none; color: #6b6b6b; }
.hb-kg7-facts b { color: #ededed; font-weight: 600; }
.hb-kg7-row { display: flex; gap: 8px; margin-top: 18px; }
.hb-kg7-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex: 1;
  height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .15s ease;
}
.hb-kg7-btn svg { width: 15px; height: 15px; }
.hb-kg7-btn:hover { border-color: rgba(255, 255, 255, .24); background: #1d1d1d; }
.hb-kg7-btn:active { transform: scale(.98); }
.hb-kg7-btn[aria-pressed="false"] { border-color: transparent; background: var(--hb-kg7-accent); color: #04130d; }
.hb-kg7-btn[aria-pressed="false"]:hover { background: color-mix(in srgb, var(--hb-kg7-accent) 85%, #fff); }
.hb-kg7-btn-heart:hover svg { color: #f472b6; }
.hb-kg7 button:focus-visible, .hb-kg7 a:focus-visible { outline: 2px solid var(--hb-kg7-accent); outline-offset: 2px; }
.hb-kg7-stack { display: flex; flex-wrap: wrap; gap: 6px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-kg7-chip {
  padding: 4px 9px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 7px;
  background: #121212;
  color: #cfcfcf;
  font-size: 12px;
  transition: border-color .2s ease, color .2s ease;
}
.hb-kg7-chip:hover { border-color: color-mix(in srgb, var(--hb-kg7-accent) 50%, transparent); color: #fff; }
.hb-kg7-main { display: grid; gap: 22px; min-width: 0; }
.hb-kg7-panel {
  position: relative;
  min-width: 0;
  padding: 16px 18px 14px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(180deg, #121212, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-kg7-ptop { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-kg7-total { margin: 0; font-size: 14px; font-weight: 600; }
.hb-kg7-total span { color: #8f8f8f; font-weight: 400; }
.hb-kg7-legend { display: inline-flex; align-items: center; gap: 4px; color: #6b6b6b; font-size: 11px; }
.hb-kg7-legend i { width: 10px; height: 10px; border-radius: 2.5px; }
.hb-kg7-scroll { position: relative; margin-top: 12px; overflow-x: auto; scrollbar-width: none; }
.hb-kg7-scroll::-webkit-scrollbar { display: none; }
.hb-kg7-map { position: relative; min-width: 560px; }
.hb-kg7-map svg { display: block; width: 100%; height: auto; }
.hb-kg7-cell {
  transform-box: fill-box;
  transform-origin: center;
  animation: hb-kg7-pop .5s cubic-bezier(.2, .9, .3, 1.3) both;
  animation-delay: var(--hb-kg7-d);
  transition: stroke .15s ease;
}
.hb-kg7-cell:hover { stroke: #fff; stroke-width: 1.2; }
.hb-kg7-l0 { fill: rgba(255, 255, 255, .055); }
.hb-kg7-l1 { fill: color-mix(in srgb, var(--hb-kg7-accent) 24%, #161616); }
.hb-kg7-l2 { fill: color-mix(in srgb, var(--hb-kg7-accent) 46%, #161616); }
.hb-kg7-l3 { fill: color-mix(in srgb, var(--hb-kg7-accent) 72%, #161616); }
.hb-kg7-l4 { fill: var(--hb-kg7-accent); }
.hb-kg7-axis { fill: #6b6b6b; font-size: 9px; font-family: inherit; }
.hb-kg7-tip {
  position: absolute;
  z-index: 2;
  padding: 5px 9px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 7px;
  background: #1c1c1c;
  color: #ededed;
  font-size: 11px;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(var(--hb-kg7-tx), calc(-100% - 6px));
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, .8);
}
.hb-kg7-tip[data-below] { transform: translate(var(--hb-kg7-tx), 6px); }
.hb-kg7-tip b { color: var(--hb-kg7-accent); font-weight: 600; }
.hb-kg7-label { display: flex; align-items: center; justify-content: space-between; margin: 0 0 -10px; color: #a1a1a1; font-size: 13px; font-weight: 600; }
.hb-kg7-label a { color: #8f8f8f; font-size: 12px; font-weight: 500; text-decoration: none; }
.hb-kg7-label a:hover { color: #ededed; }
.hb-kg7-pins { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-kg7-pin {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 14px;
  background: #101010;
  color: inherit;
  text-decoration: none;
  animation: hb-kg7-up .5s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kg7-i);
  transition: border-color .2s ease, background-color .2s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kg7-pin:hover { border-color: color-mix(in srgb, var(--hb-kg7-accent) 40%, transparent); background: #131313; transform: translateY(-2px); }
.hb-kg7-repo { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hb-kg7-repo svg { width: 15px; height: 15px; flex: none; color: #6b6b6b; }
.hb-kg7-rname { overflow: hidden; color: color-mix(in srgb, var(--hb-kg7-accent) 60%, #fff); font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-kg7-public { margin-left: auto; padding: 1px 7px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 999px; color: #8f8f8f; font-size: 10px; }
.hb-kg7-desc { display: -webkit-box; flex: 1; margin: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; line-height: 1.5; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.hb-kg7-meta { display: flex; align-items: center; gap: 14px; color: #8f8f8f; font-size: 12px; }
.hb-kg7-meta span { display: inline-flex; align-items: center; gap: 5px; }
.hb-kg7-meta i { width: 10px; height: 10px; border-radius: 50%; }
.hb-kg7-meta svg { width: 14px; height: 14px; transition: color .2s ease, fill .2s ease; }
.hb-kg7-pin:hover .hb-kg7-star { color: #fbbf24; fill: #fbbf24; }
@container (min-width: 600px) {
  .hb-kg7-pins { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (min-width: 900px) {
  .hb-kg7-inner { grid-template-columns: 290px minmax(0, 1fr); gap: 40px; padding: 64px 40px 72px; }
  .hb-kg7-head { flex-direction: column; align-items: flex-start; }
  .hb-kg7-avatar { width: 112px; font-size: 38px; }
  .hb-kg7-map { min-width: 0; }
}
@keyframes hb-kg7-pop { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: none; } }
@keyframes hb-kg7-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg7-cell, .hb-kg7-pin { animation: none; }
  .hb-kg7-btn, .hb-kg7-pin, .hb-kg7-chip, .hb-kg7-cell { transition: none; }
  .hb-kg7-pin:hover { transform: none; }
}
`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 11;
const STEP = 14;
const LEFT = 28;
const TOP = 16;

function rand(i: number, salt: number) {
  let h = Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 11, 1597334677);
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489917);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function daysFromCivil(y: number, m: number, d: number) {
  const yy = m <= 2 ? y - 1 : y;
  const era = Math.floor(yy / 400);
  const yoe = yy - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

function civilFromDays(z: number) {
  const zz = z + 719468;
  const era = Math.floor(zz / 146097);
  const doe = zz - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  return { y: yoe + era * 400 + (m <= 2 ? 1 : 0), m, d };
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

interface Cell {
  c: number;
  r: number;
  count: number;
  level: number;
  label: string;
}

export function ProfileDevCard({
  name = "Priya Raman",
  handle = "priyar",
  role = "Staff engineer at Fieldnote",
  location = "Toronto, Canada",
  bio = "I work on sync engines, local-first data and the occasional compiler. Maintainer of tidewave and quill-ts.",
  status = "Open to mentoring",
  stack = ["TypeScript", "Rust", "Go", "PostgreSQL", "React", "WebAssembly", "SQLite"],
  stats = defaultStats,
  projects = defaultProjects,
  weeks = 52,
  seed = 11,
  endDate = "2026-11-01",
  following,
  defaultFollowing = false,
  onFollowChange,
  accent = "#34d399",
  className = "",
  style,
  ...rest
}: ProfileDevCardProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [innerFollowing, setInnerFollowing] = React.useState(defaultFollowing);
  const [hover, setHover] = React.useState<Cell | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isFollowing = following ?? innerFollowing;
  const vars = { "--hb-kg7-accent": accent, ...style } as React.CSSProperties;

  const { cells, total, months } = React.useMemo(() => {
    const [ey, em, ed] = endDate.split("-").map(Number);
    const end = daysFromCivil(ey || 2026, em || 11, ed || 1);
    const endWeekday = (((end + 4) % 7) + 7) % 7;
    const list: Cell[] = [];
    const monthMarks: { c: number; label: string }[] = [];
    let sum = 0;
    let lastMonth = -1;
    for (let c = 0; c < weeks; c++) {
      const firstDay = civilFromDays(end - ((weeks - 1 - c) * 7 + endWeekday));
      if (firstDay.m !== lastMonth) {
        if (c < weeks - 2 && (monthMarks.length === 0 || c - monthMarks[monthMarks.length - 1].c >= 3)) {
          monthMarks.push({ c, label: MONTHS[firstDay.m - 1] });
        }
        lastMonth = firstDay.m;
      }
      const phase = 0.3 + 0.35 * rand(c >> 2, seed + 50) + 0.35 * rand(c, seed + 90);
      for (let r = 0; r < 7; r++) {
        const ago = (weeks - 1 - c) * 7 + (endWeekday - r);
        if (ago < 0) continue;
        const i = c * 7 + r;
        const weekend = r === 0 || r === 6 ? 0.35 : 1;
        const base = rand(i, seed);
        const raw = base * base * 16 * weekend * phase;
        const count = base < 0.2 ? 0 : Math.round(raw);
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
        const day = civilFromDays(end - ago);
        sum += count;
        list.push({ c, r, count, level, label: `${MONTHS[day.m - 1]} ${day.d}, ${day.y}` });
      }
    }
    return { cells: list, total: sum, months: monthMarks };
  }, [endDate, weeks, seed]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const toggleFollow = () => {
    const next = !isFollowing;
    if (following === undefined) setInnerFollowing(next);
    onFollowChange?.(next);
  };

  const vbW = LEFT + weeks * STEP;
  const vbH = TOP + 7 * STEP;

  const onOver = (e: React.PointerEvent<SVGSVGElement>) => {
    const idx = (e.target as Element).getAttribute("data-i");
    setHover(idx === null ? null : cells[Number(idx)] ?? null);
  };

  return (
    <section className={`hb-kg7 ${className}`} style={vars} aria-labelledby={`${uid}-name`} {...rest}>
      <style href="hb-profile-dev-card" precedence="default">{css}</style>
      <div className="hb-kg7-inner">
        <aside className="hb-kg7-side">
          <div className="hb-kg7-head">
            <div className="hb-kg7-avatar" aria-hidden="true">
              {initialsOf(name)}
              <span className="hb-kg7-dot" />
            </div>
            <div>
              <h2 id={`${uid}-name`} className="hb-kg7-name">{name}</h2>
              <p className="hb-kg7-handle hb-kg7-mono">{handle}</p>
            </div>
          </div>
          {status && (
            <span className="hb-kg7-status">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2.5 9.6 6l3.9.4-2.9 2.6.8 3.8L8 10.9l-3.4 1.9.8-3.8L2.5 6.4 6.4 6 8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
              {status}
            </span>
          )}
          {bio && <p className="hb-kg7-bio">{bio}</p>}
          <div className="hb-kg7-row">
            <button type="button" className="hb-kg7-btn" aria-pressed={isFollowing} onClick={toggleFollow}>
              {isFollowing ? (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
              )}
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button type="button" className="hb-kg7-btn hb-kg7-btn-heart">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13.5S2.5 10.3 2.5 6.4A2.9 2.9 0 0 1 8 5a2.9 2.9 0 0 1 5.5 1.4C13.5 10.3 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
              Sponsor
            </button>
          </div>
          <ul className="hb-kg7-facts">
            {stats.length > 0 && (
              <li>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 13.5c.5-2.5 2.3-4 4.5-4s4 1.5 4.5 4M11 3.2a2.5 2.5 0 0 1 0 4.6M12.5 9.8c1 .6 1.7 1.9 2 3.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                <span>
                  {stats.map((s, i) => (
                    <React.Fragment key={s.label}>
                      {i > 0 && " · "}
                      <b>{s.value}</b> {s.label}
                    </React.Fragment>
                  ))}
                </span>
              </li>
            )}
            {role && (
              <li>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 4.5v-1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1M2.5 8.5h11" stroke="currentColor" strokeWidth="1.3" /></svg>
                {role}
              </li>
            )}
            {location && (
              <li>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
                {location}
              </li>
            )}
          </ul>
          {stack.length > 0 && (
            <ul className="hb-kg7-stack" aria-label="Tech stack">
              {stack.map((s) => (
                <li key={s} className="hb-kg7-chip hb-kg7-mono">{s}</li>
              ))}
            </ul>
          )}
        </aside>
        <div className="hb-kg7-main">
          <div className="hb-kg7-panel">
            <div className="hb-kg7-ptop">
              <p className="hb-kg7-total">{total.toLocaleString("en-US")} contributions <span>in the last year</span></p>
              <span className="hb-kg7-legend" aria-hidden="true">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <svg key={l} viewBox="0 0 10 10" width="10" height="10"><rect className={`hb-kg7-l${l}`} width="10" height="10" rx="2.5" /></svg>
                ))}
                More
              </span>
            </div>
            <div ref={scrollRef} className="hb-kg7-scroll">
              <div className="hb-kg7-map">
                <svg
                  viewBox={`0 0 ${vbW} ${vbH}`}
                  role="img"
                  aria-label={`${total} contributions in the last year`}
                  onPointerOver={onOver}
                  onPointerLeave={() => setHover(null)}
                >
                  {months.map((m) => (
                    <text key={m.c} className="hb-kg7-axis" x={LEFT + m.c * STEP} y={10}>{m.label}</text>
                  ))}
                  {[["Mon", 1], ["Wed", 3], ["Fri", 5]].map(([label, r]) => (
                    <text key={label} className="hb-kg7-axis" x={0} y={TOP + Number(r) * STEP + 9}>{label}</text>
                  ))}
                  {cells.map((cell, i) => (
                    <rect
                      key={i}
                      data-i={i}
                      className={`hb-kg7-cell hb-kg7-l${cell.level}`}
                      x={LEFT + cell.c * STEP}
                      y={TOP + cell.r * STEP}
                      width={CELL}
                      height={CELL}
                      rx={2.5}
                      style={{ "--hb-kg7-d": `${(cell.c * 14 + cell.r * 20).toFixed(0)}ms` } as React.CSSProperties}
                    />
                  ))}
                </svg>
                {hover && (
                  <div
                    className="hb-kg7-tip"
                    data-below={hover.r < 3 ? "" : undefined}
                    style={{
                      left: `${(((LEFT + hover.c * STEP + CELL / 2) / vbW) * 100).toFixed(2)}%`,
                      top: `${(((TOP + (hover.r < 3 ? hover.r + 1 : hover.r) * STEP) / vbH) * 100).toFixed(2)}%`,
                      "--hb-kg7-tx": hover.c < 8 ? "-12%" : hover.c > weeks - 9 ? "-88%" : "-50%",
                    } as React.CSSProperties}
                  >
                    <b>{hover.count === 0 ? "No" : hover.count} {hover.count === 1 ? "contribution" : "contributions"}</b> on {hover.label}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="hb-kg7-label">
            Pinned
            <a href="#repositories">All repositories</a>
          </p>
          <ul className="hb-kg7-pins">
            {projects.map((p, i) => (
              <li key={p.name}>
                <a className="hb-kg7-pin" href={p.href} style={{ "--hb-kg7-i": `${(200 + i * 80).toFixed(0)}ms` } as React.CSSProperties}>
                  <span className="hb-kg7-repo">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 12.5v-9a1.5 1.5 0 0 1 1.5-1.5h7.5v9H5a1.5 1.5 0 0 0-1.5 1.5Zm0 0A1.5 1.5 0 0 0 5 14h7.5v-3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                    <span className="hb-kg7-rname hb-kg7-mono">{p.name}</span>
                    <span className="hb-kg7-public">Public</span>
                  </span>
                  <p className="hb-kg7-desc">{p.description}</p>
                  <span className="hb-kg7-meta">
                    <span><i style={{ background: p.languageColor }} />{p.language}</span>
                    <span>
                      <svg className="hb-kg7-star" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true"><path d="M8 1.8 9.9 5.7l4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8Z" /></svg>
                      {p.stars.toLocaleString("en-US")}
                    </span>
                    <span>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="11.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4.5 5v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V5M8 8v3" stroke="currentColor" strokeWidth="1.3" /></svg>
                      {p.forks}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

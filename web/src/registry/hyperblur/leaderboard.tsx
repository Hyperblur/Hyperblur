"use client";

import * as React from "react";

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  change?: number;
  you?: boolean;
}

export const defaultLeaders: LeaderboardEntry[] = [
  { id: "l1", name: "Sofia Marchetti", score: 12840, change: 0 },
  { id: "l2", name: "Kenji Watanabe", score: 11975, change: 2 },
  { id: "l3", name: "Amara Nwosu", score: 11320, change: -1 },
  { id: "l4", name: "Oliver Brandt", score: 10410, change: 1 },
  { id: "l5", name: "Zara Haddad", score: 9880, change: -2 },
  { id: "l6", name: "Mateo Ruiz", score: 9215, change: 3 },
  { id: "l7", name: "Ingrid Larsen", score: 8760, change: 0 },
  { id: "l8", name: "Noah Fischer", score: 8105, change: -1 },
  { id: "l9", name: "Leila Karimi", score: 7490, change: 4 },
  { id: "l10", name: "You", score: 6930, change: 5, you: true },
];

export interface LeaderboardProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "onSelect"> {
  entries?: LeaderboardEntry[];
  topN?: number;
  unit?: string;
  accent?: string;
  onSelect?: (entry: LeaderboardEntry, rank: number) => void;
}

const css = `
.hb-ldb {
  --hb-ldb-accent: #2f7bff;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
}
.hb-ldb *, .hb-ldb *::before, .hb-ldb *::after { box-sizing: border-box; font-family: inherit; }
.hb-ldb-row {
  position: relative;
  min-width: 0;
  border-radius: 11px;
  animation: hb-ldb-in .4s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-ldb-i, 0) * 50ms);
}
.hb-ldb-body {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  padding: 8px 10px 8px 8px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  transition: background-color .15s ease, border-color .15s ease;
}
button.hb-ldb-body { cursor: pointer; }
.hb-ldb-row:hover .hb-ldb-body { background: rgba(255, 255, 255, .045); }
.hb-ldb-body:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-ldb-accent) 80%, transparent); outline-offset: 1px; }
.hb-ldb-row[data-you="true"] .hb-ldb-body {
  background: color-mix(in srgb, var(--hb-ldb-accent) 13%, transparent);
  border-color: color-mix(in srgb, var(--hb-ldb-accent) 40%, transparent);
}
.hb-ldb-row[data-you="true"]:hover .hb-ldb-body { background: color-mix(in srgb, var(--hb-ldb-accent) 18%, transparent); }
.hb-ldb-rank {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  color: #8f8f8f;
  font-variant-numeric: tabular-nums;
}
.hb-ldb-rank[data-medal] {
  color: #1a1204;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 2px 8px var(--hb-ldb-glow);
}
.hb-ldb-rank[data-medal="1"] { --hb-ldb-glow: rgba(245, 197, 66, .35); background: linear-gradient(145deg, #ffe08a, #e0a52a 60%, #b8860b); }
.hb-ldb-rank[data-medal="2"] { --hb-ldb-glow: rgba(200, 205, 215, .25); background: linear-gradient(145deg, #f2f4f8, #b4bac6 60%, #8a909c); color: #14161a; }
.hb-ldb-rank[data-medal="3"] { --hb-ldb-glow: rgba(205, 127, 50, .3); background: linear-gradient(145deg, #f0b27a, #cd7f32 60%, #96592a); color: #1c1008; }
.hb-ldb-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--hb-ldb-bg);
  color: var(--hb-ldb-fg);
  font-size: 11px;
  font-weight: 600;
}
.hb-ldb-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
.hb-ldb-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-ldb-row[data-you="true"] .hb-ldb-name { color: #fff; }
.hb-ldb-track { position: relative; height: 4px; overflow: hidden; border-radius: 999px; background: #1c1c1c; }
.hb-ldb-bar {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ldb-accent) 55%, #1c1c1c), var(--hb-ldb-accent));
  transform-origin: left center;
  transform: scaleX(var(--hb-ldb-w, 0));
  animation: hb-ldb-grow .9s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-ldb-i, 0) * 50ms + 150ms);
}
.hb-ldb-row[data-medal="1"] .hb-ldb-bar { background: linear-gradient(90deg, #8a6a1a, #f5c542); }
.hb-ldb-row[data-medal="2"] .hb-ldb-bar { background: linear-gradient(90deg, #5d626d, #cfd3dc); }
.hb-ldb-row[data-medal="3"] .hb-ldb-bar { background: linear-gradient(90deg, #6e4520, #d9894a); }
.hb-ldb-side { flex: none; display: flex; flex-direction: column; align-items: flex-end; gap: 1px; min-width: 52px; }
.hb-ldb-score { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ldb-unit { margin-left: 3px; font-size: 11px; font-weight: 400; color: #6b6b6b; }
.hb-ldb-change {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #6b6b6b;
}
.hb-ldb-change svg { width: 8px; height: 8px; }
.hb-ldb-change[data-dir="up"] { color: #3ecf8e; }
.hb-ldb-change[data-dir="down"] { color: #ff6b6b; }
.hb-ldb-gap {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 12px;
  color: #4a4a4a;
  list-style: none;
}
.hb-ldb-gap::before, .hb-ldb-gap::after { content: ""; flex: 1; height: 0; border-top: 1px dashed #2a2a2a; }
.hb-ldb-gap span { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #6b6b6b; }
.hb-ldb-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 280px) {
  .hb-ldb-avatar { display: none; }
  .hb-ldb-unit { display: none; }
}
@keyframes hb-ldb-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ldb-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(var(--hb-ldb-w, 0)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ldb-row, .hb-ldb-bar { animation: none !important; }
  .hb-ldb-body { transition: none !important; }
}
`;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

function changeLabel(change: number) {
  if (change > 0) return `Up ${change} ${change === 1 ? "place" : "places"}`;
  if (change < 0) return `Down ${Math.abs(change)} ${Math.abs(change) === 1 ? "place" : "places"}`;
  return "No change";
}

export function Leaderboard({
  entries = defaultLeaders,
  topN = 5,
  unit = "pts",
  accent = "#2f7bff",
  onSelect,
  className = "",
  style,
  ...rest
}: LeaderboardProps) {
  const ranked = [...entries].sort((a, b) => b.score - a.score).map((entry, index) => ({ entry, rank: index + 1 }));
  const limit = Math.max(1, Math.round(topN));
  const top = ranked.slice(0, limit);
  const pinned = ranked.slice(limit).find((r) => r.entry.you);
  const max = Math.max(1, ...ranked.map((r) => r.entry.score));

  const vars = { "--hb-ldb-accent": accent, ...style } as React.CSSProperties;

  const renderRow = ({ entry, rank }: { entry: LeaderboardEntry; rank: number }, i: number) => {
    const hue = hash(entry.name) % 360;
    const change = entry.change ?? 0;
    const dir = change > 0 ? "up" : change < 0 ? "down" : "flat";
    const medal = rank <= 3 ? rank : undefined;
    const Body = onSelect ? "button" : "div";
    const colors = {
      "--hb-ldb-bg": `hsl(${hue} 42% 30%)`,
      "--hb-ldb-fg": `hsl(${hue} 70% 88%)`,
      "--hb-ldb-w": (entry.score / max).toFixed(4),
      "--hb-ldb-i": i,
    } as React.CSSProperties;
    return (
      <li key={entry.id} className="hb-ldb-row" data-you={entry.you ? "true" : "false"} data-medal={medal} style={colors}>
        <Body
          className="hb-ldb-body"
          {...(onSelect ? { type: "button" as const, onClick: () => onSelect(entry, rank) } : {})}
        >
          <span className="hb-ldb-rank" data-medal={medal}>
            <span className="hb-ldb-sr">{`Rank `}</span>
            {rank}
          </span>
          <span className="hb-ldb-avatar" aria-hidden="true">
            {initials(entry.name)}
          </span>
          <span className="hb-ldb-main">
            <span className="hb-ldb-name">{entry.you && entry.name !== "You" ? `${entry.name} (you)` : entry.name}</span>
            <span className="hb-ldb-track" aria-hidden="true">
              <span className="hb-ldb-bar" />
            </span>
          </span>
          <span className="hb-ldb-side">
            <span className="hb-ldb-score">
              {entry.score.toLocaleString("en-US")}
              {unit && <span className="hb-ldb-unit">{unit}</span>}
            </span>
            <span className="hb-ldb-change" data-dir={dir} aria-label={changeLabel(change)}>
              {dir === "up" && (
                <svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
                  <path d="M4 1l3.2 5.4H.8z" />
                </svg>
              )}
              {dir === "down" && (
                <svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
                  <path d="M4 7L.8 1.6h6.4z" />
                </svg>
              )}
              {dir === "flat" ? "–" : Math.abs(change)}
            </span>
          </span>
        </Body>
      </li>
    );
  };

  return (
    <ol className={`hb-ldb ${className}`} style={vars} aria-label="Leaderboard" {...rest}>
      <style href="hb-leaderboard" precedence="default">{css}</style>
      {top.map((r, i) => renderRow(r, i))}
      {pinned && (
        <>
          <li className="hb-ldb-gap" aria-hidden="true">
            <span>Your rank</span>
          </li>
          {renderRow(pinned, top.length)}
        </>
      )}
    </ol>
  );
}

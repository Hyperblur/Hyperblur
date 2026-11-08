"use client";

import * as React from "react";

export type ProfileCreatorPeriod = "7d" | "30d" | "90d";

export interface ProfileCreatorStat {
  label: string;
  values: Record<ProfileCreatorPeriod, string>;
  deltas: Record<ProfileCreatorPeriod, number>;
  series: Record<ProfileCreatorPeriod, number[]>;
}

export interface ProfileCreatorPost {
  title: string;
  meta: string;
  duration: string;
  hue: number;
}

export interface ProfileCreatorStatsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  handle?: string;
  bio?: string;
  location?: string;
  website?: { label: string; href: string };
  segments?: number;
  seenSegments?: number;
  stats?: ProfileCreatorStat[];
  posts?: ProfileCreatorPost[];
  defaultPeriod?: ProfileCreatorPeriod;
  subscribers?: number;
  defaultSubscribed?: boolean;
  onSubscribeChange?: (subscribed: boolean) => void;
  onMessage?: () => void;
  accent?: string;
}

function wave(seed: number, n: number, trend: number) {
  return Array.from({ length: n }, (_, i) => {
    const h = ((seed * 9301 + i * 49297) % 233280) / 233280;
    return Math.round(40 + i * trend + Math.sin(i * 0.9 + seed) * 10 + h * 14);
  });
}

const defaultStats: ProfileCreatorStat[] = [
  { label: "Subscribers", values: { "7d": "184.2K", "30d": "184.2K", "90d": "184.2K" }, deltas: { "7d": 2.4, "30d": 9.8, "90d": 31.5 }, series: { "7d": wave(3, 7, 3), "30d": wave(5, 16, 2.2), "90d": wave(8, 24, 1.8) } },
  { label: "Views", values: { "7d": "1.2M", "30d": "4.9M", "90d": "13.6M" }, deltas: { "7d": 12.1, "30d": 6.3, "90d": 18.2 }, series: { "7d": wave(11, 7, 4), "30d": wave(13, 16, 0.8), "90d": wave(17, 24, 1.2) } },
  { label: "Watch hours", values: { "7d": "38.4K", "30d": "151K", "90d": "402K" }, deltas: { "7d": -3.2, "30d": 4.1, "90d": 11.7 }, series: { "7d": wave(19, 7, -2), "30d": wave(23, 16, 0.6), "90d": wave(29, 24, 0.9) } },
  { label: "Members", values: { "7d": "2,914", "30d": "2,914", "90d": "2,914" }, deltas: { "7d": 1.1, "30d": 5.6, "90d": 22.4 }, series: { "7d": wave(31, 7, 1.5), "30d": wave(37, 16, 1.4), "90d": wave(41, 24, 1.6) } },
];

const defaultPosts: ProfileCreatorPost[] = [
  { title: "I rebuilt my studio desk from one sheet of plywood", meta: "412K views, 3 days ago", duration: "18:42", hue: 28 },
  { title: "Five joinery mistakes that cost me a whole weekend", meta: "1.1M views, 2 weeks ago", duration: "12:07", hue: 200 },
  { title: "Live: finishing the walnut side table", meta: "88K views, streamed", duration: "2:14:55", hue: 330 },
];

const css = `
@keyframes hb-wd9-ring { from { stroke-dashoffset: var(--hb-wd9-len); } to { stroke-dashoffset: 0; } }
@keyframes hb-wd9-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wd9-char { from { transform: translateY(0.7em); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-wd9-mesh { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-4%, 3%) scale(1.08); } }
@keyframes hb-wd9-play { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
.hb-wd9 {
  --hb-wd9-accent: #e11d74;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #ffffff;
  color: #141318;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd9 *, .hb-wd9 *::before, .hb-wd9 *::after { box-sizing: border-box; }
.hb-wd9-cover { position: relative; height: 168px; overflow: hidden; background: #fbe7ef; }
.hb-wd9-cover::before, .hb-wd9-cover::after { content: ""; position: absolute; border-radius: 50%; filter: blur(40px); animation: hb-wd9-mesh 14s ease-in-out infinite; }
.hb-wd9-cover::before { width: 55%; height: 180%; left: -5%; top: -60%; background: color-mix(in srgb, var(--hb-wd9-accent) 45%, #ffb37a); }
.hb-wd9-cover::after { width: 50%; height: 170%; right: -6%; top: -40%; background: #8fb7ff; animation-delay: -6s; }
.hb-wd9-grain { position: absolute; inset: 0; background-image: radial-gradient(rgba(20,19,24,0.12) 0.6px, transparent 0.7px); background-size: 5px 5px; mix-blend-mode: multiply; opacity: 0.5; }
.hb-wd9-in { position: relative; max-width: 1120px; margin: 0 auto; padding: 0 20px 80px; }
.hb-wd9-top { display: grid; gap: 18px; margin-top: -58px; }
@container (min-width: 760px) { .hb-wd9-top { grid-template-columns: auto 1fr auto; align-items: end; gap: 24px; } }
.hb-wd9-avwrap { position: relative; width: 132px; height: 132px; }
.hb-wd9-avwrap svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-wd9-seg { fill: none; stroke-width: 4; stroke-linecap: round; animation: hb-wd9-ring 0.9s cubic-bezier(0.65, 0, 0.35, 1) both; }
.hb-wd9-av { position: absolute; inset: 10px; border-radius: 50%; display: grid; place-items: center; font: 600 38px/1 var(--font-grotesk, inherit); color: #fff; background: radial-gradient(120% 120% at 20% 10%, #ffcf9e, color-mix(in srgb, var(--hb-wd9-accent) 85%, #000) 70%); border: 4px solid #fff; box-shadow: 0 10px 24px -10px rgba(20,19,24,0.5); }
.hb-wd9-live { position: absolute; left: 50%; bottom: -4px; transform: translateX(-50%); padding: 3px 8px; border-radius: 6px; background: var(--hb-wd9-accent); color: #fff; font: 700 10px/1 var(--font-mono, monospace); letter-spacing: 0.08em; border: 2px solid #fff; }
.hb-wd9-name { display: flex; align-items: center; gap: 8px; margin: 0; font: 600 clamp(26px, 3.6cqw, 34px)/1.1 var(--font-grotesk, inherit); letter-spacing: -0.025em; }
.hb-wd9-name svg { width: 22px; height: 22px; color: var(--hb-wd9-accent); flex: none; }
.hb-wd9-handle { margin: 4px 0 8px; font: 500 13px/1 var(--font-mono, monospace); color: #77757e; }
.hb-wd9-bio { margin: 0; font-size: 14.5px; line-height: 1.55; color: #45434b; max-width: 56ch; }
.hb-wd9-tags { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 10px; font-size: 13px; color: #77757e; }
.hb-wd9-tags span, .hb-wd9-tags a { display: inline-flex; align-items: center; gap: 5px; color: inherit; text-decoration: none; }
.hb-wd9-tags a:hover { color: var(--hb-wd9-accent); }
.hb-wd9-tags a:focus-visible { outline: 2px solid var(--hb-wd9-accent); outline-offset: 2px; border-radius: 4px; }
.hb-wd9-tags svg { width: 14px; height: 14px; }
.hb-wd9-actions { display: flex; gap: 8px; align-items: center; }
.hb-wd9-sub { appearance: none; border: 0; height: 42px; padding: 0 18px; border-radius: 999px; background: #141318; color: #fff; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 10px 20px -12px rgba(20,19,24,0.7); transition: background-color 0.3s ease, color 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.4, 0.5, 1); }
.hb-wd9-sub:active { transform: scale(0.96); }
.hb-wd9-sub[aria-pressed="true"] { background: #f2f1f4; color: #141318; box-shadow: inset 0 0 0 1px rgba(20,19,24,0.1); }
.hb-wd9-sub small { font: 600 12px/1 var(--font-mono, monospace); opacity: 0.6; }
.hb-wd9-sub:focus-visible, .hb-wd9-icon:focus-visible { outline: 2px solid var(--hb-wd9-accent); outline-offset: 3px; }
.hb-wd9-icon { appearance: none; width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(20,19,24,0.12); background: #fff; color: #141318; display: grid; place-items: center; cursor: pointer; transition: border-color 0.2s ease, background-color 0.2s ease; }
.hb-wd9-icon:hover { background: #f6f5f8; border-color: rgba(20,19,24,0.24); }
.hb-wd9-icon svg { width: 17px; height: 17px; }
.hb-wd9-bar { display: flex; justify-content: space-between; align-items: center; margin: 34px 0 12px; }
.hb-wd9-bar h3 { margin: 0; font: 600 13px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: #77757e; }
.hb-wd9-period { display: flex; padding: 3px; border-radius: 10px; background: #f2f1f4; }
.hb-wd9-pbtn { appearance: none; border: 0; padding: 6px 11px; border-radius: 8px; background: transparent; color: #77757e; font: 600 12px/1 var(--font-mono, monospace); cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease; }
.hb-wd9-pbtn[aria-pressed="true"] { background: #fff; color: #141318; box-shadow: 0 1px 3px rgba(20,19,24,0.12); }
.hb-wd9-pbtn:focus-visible { outline: 2px solid var(--hb-wd9-accent); outline-offset: 1px; }
.hb-wd9-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@container (min-width: 820px) { .hb-wd9-stats { grid-template-columns: repeat(4, 1fr); } }
.hb-wd9-stat { position: relative; padding: 16px 16px 12px; border-radius: 16px; background: #fbfafc; border: 1px solid rgba(20,19,24,0.07); display: grid; gap: 4px; overflow: hidden; transition: border-color 0.25s ease, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s ease; }
.hb-wd9-stat:hover { transform: translateY(-2px); border-color: rgba(20,19,24,0.14); box-shadow: 0 16px 30px -22px rgba(20,19,24,0.45); }
.hb-wd9-stat-label { font-size: 12.5px; color: #77757e; }
.hb-wd9-stat-val { display: flex; align-items: baseline; gap: 8px; font: 600 26px/1.1 var(--font-grotesk, inherit); letter-spacing: -0.02em; overflow: hidden; }
.hb-wd9-stat-val > span { display: inline-flex; }
.hb-wd9-stat-val > span > span { display: inline-block; animation: hb-wd9-char 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hb-wd9-delta { font: 600 11.5px/1 var(--font-mono, monospace); padding: 3px 6px; border-radius: 6px; background: #e8f7ee; color: #15803d; }
.hb-wd9-delta[data-neg="true"] { background: #fdecec; color: #b91c1c; }
.hb-wd9-spark { display: block; width: 100%; height: 42px; margin-top: 6px; overflow: visible; }
.hb-wd9-spark path.l { fill: none; stroke: var(--hb-wd9-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; animation: hb-wd9-draw 1s cubic-bezier(0.65, 0, 0.35, 1) both; }
.hb-wd9-stat:nth-child(even) .hb-wd9-spark path.l { stroke: #141318; }
.hb-wd9-posts { display: grid; gap: 12px; margin-top: 12px; }
@container (min-width: 700px) { .hb-wd9-posts { grid-template-columns: 1.4fr 1fr 1fr; } }
.hb-wd9-post { display: grid; gap: 10px; text-decoration: none; color: inherit; border-radius: 16px; outline: none; }
.hb-wd9-thumb { display: block; position: relative; aspect-ratio: 16 / 9; border-radius: 14px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(20,19,24,0.06); }
.hb-wd9-thumb::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35)); }
.hb-wd9-play { position: absolute; left: 50%; top: 50%; z-index: 1; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; background: rgba(255,255,255,0.92); display: grid; place-items: center; color: #141318; box-shadow: 0 8px 20px -8px rgba(0,0,0,0.5); transition: transform 0.3s cubic-bezier(0.34, 1.5, 0.5, 1); }
.hb-wd9-play svg { width: 16px; height: 16px; margin-left: 2px; }
.hb-wd9-post:hover .hb-wd9-play, .hb-wd9-post:focus-visible .hb-wd9-play { transform: scale(1.12); }
.hb-wd9-post:focus-visible .hb-wd9-thumb { box-shadow: 0 0 0 3px var(--hb-wd9-accent); }
.hb-wd9-dur { position: absolute; right: 8px; bottom: 8px; z-index: 1; padding: 3px 6px; border-radius: 5px; background: rgba(0,0,0,0.72); color: #fff; font: 600 11px/1 var(--font-mono, monospace); }
.hb-wd9-post b { font-size: 14px; font-weight: 600; line-height: 1.35; }
.hb-wd9-post small { display: block; margin-top: 3px; font-size: 12px; color: #77757e; }
.hb-wd9-pin { position: absolute; left: 8px; top: 8px; z-index: 1; padding: 4px 7px; border-radius: 6px; background: #fff; font: 600 10.5px/1 var(--font-mono, monospace); color: var(--hb-wd9-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-wd9 *, .hb-wd9 *::before, .hb-wd9 *::after { animation: none !important; transition: none !important; }
}
`;

function Spark({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * 100, 38 - ((v - min) / Math.max(1, max - min)) * 32] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg className="hb-wd9-spark" viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true">
      <path className="l" d={d} pathLength={1} vectorEffect="non-scaling-stroke" />
      <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="2.4" fill="currentColor" />
    </svg>
  );
}

export function ProfileCreatorStats({
  name = "Noor Lindgren",
  handle = "@noorbuilds",
  bio = "Furniture maker and teacher. New build videos every Thursday, workshop streams on Sundays, plans and cut lists for members.",
  location = "Gothenburg, Sweden",
  website = { label: "noorbuilds.studio", href: "#" },
  segments = 6,
  seenSegments = 2,
  stats = defaultStats,
  posts = defaultPosts,
  defaultPeriod = "30d",
  subscribers = 184200,
  defaultSubscribed = false,
  onSubscribeChange,
  onMessage,
  accent = "#e11d74",
  className = "",
  style,
  ...rest
}: ProfileCreatorStatsProps) {
  const [period, setPeriod] = React.useState<ProfileCreatorPeriod>(defaultPeriod);
  const [subbed, setSubbed] = React.useState(defaultSubscribed);
  const r = 62;
  const circ = 2 * Math.PI * r;
  const gap = 6;
  const len = circ / segments - gap;
  const subs = subscribers + (subbed ? 1 : 0);
  const compact = subs >= 1000 ? `${(subs / 1000).toFixed(1)}K` : String(subs);
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("");

  return (
    <section className={`hb-wd9 ${className}`} style={{ "--hb-wd9-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-profile-creator-stats" precedence="default">{css}</style>
      <div className="hb-wd9-cover" aria-hidden="true">
        <div className="hb-wd9-grain" />
      </div>
      <div className="hb-wd9-in">
        <div className="hb-wd9-top">
          <div className="hb-wd9-avwrap">
            <svg viewBox="0 0 132 132" aria-hidden="true">
              {Array.from({ length: segments }, (_, i) => (
                <circle
                  key={i}
                  className="hb-wd9-seg"
                  cx="66"
                  cy="66"
                  r={r}
                  stroke={i < seenSegments ? "#d4d2d9" : "var(--hb-wd9-accent)"}
                  strokeDasharray={`${len.toFixed(2)} ${(circ - len).toFixed(2)}`}
                  style={{ "--hb-wd9-len": len.toFixed(2), animationDelay: `${(i * 0.08).toFixed(2)}s`, transform: `rotate(${((360 / segments) * i).toFixed(2)}deg)`, transformOrigin: "66px 66px" } as React.CSSProperties}
                />
              ))}
            </svg>
            <span className="hb-wd9-av" aria-hidden="true">{initials}</span>
            <span className="hb-wd9-live">LIVE SUN</span>
          </div>
          <div>
            <h2 className="hb-wd9-name">
              {name}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Verified creator"><path d="M12 1.8l2.5 1.9 3.1-.2.9 3 2.6 1.7-1 3 1 3-2.6 1.7-.9 3-3.1-.2L12 22.2l-2.5-1.9-3.1.2-.9-3-2.6-1.7 1-3-1-3 2.6-1.7.9-3 3.1.2z" /><path d="M8 12.2l2.6 2.6L16.2 9.2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </h2>
            <p className="hb-wd9-handle">{handle}</p>
            <p className="hb-wd9-bio">{bio}</p>
            <div className="hb-wd9-tags">
              <span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 14s5-4.4 5-8.2A5 5 0 0 0 3 5.8C3 9.6 8 14 8 14z" /><circle cx="8" cy="6" r="1.8" /></svg>
                {location}
              </span>
              <a href={website.href}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M6.6 9.4l2.8-2.8M7 4.6l1-1a2.6 2.6 0 0 1 3.7 3.7l-1 1M9 11.4l-1 1a2.6 2.6 0 0 1-3.7-3.7l1-1" /></svg>
                {website.label}
              </a>
            </div>
          </div>
          <div className="hb-wd9-actions">
            <button
              type="button"
              className="hb-wd9-sub"
              aria-pressed={subbed}
              onClick={() => {
                setSubbed((s) => !s);
                onSubscribeChange?.(!subbed);
              }}
            >
              {subbed ? "Subscribed" : "Subscribe"}
              <small>{compact}</small>
            </button>
            <button type="button" className="hb-wd9-icon" aria-label={`Message ${name}`} onClick={onMessage}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="M2.4 3.6a1.6 1.6 0 0 1 1.6-1.6h8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H6.6L3.6 13.4v-2.6H4a1.6 1.6 0 0 1-1.6-1.6z" /></svg>
            </button>
            <button type="button" className="hb-wd9-icon" aria-label="More options">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="3.5" cy="8" r="1.3" /><circle cx="8" cy="8" r="1.3" /><circle cx="12.5" cy="8" r="1.3" /></svg>
            </button>
          </div>
        </div>
        <div className="hb-wd9-bar">
          <h3>Channel stats</h3>
          <div className="hb-wd9-period" role="group" aria-label="Period">
            {(["7d", "30d", "90d"] as ProfileCreatorPeriod[]).map((p) => (
              <button key={p} type="button" className="hb-wd9-pbtn" aria-pressed={period === p} onClick={() => setPeriod(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="hb-wd9-stats" aria-live="polite">
          {stats.map((s) => {
            const v = s.values[period];
            const dlt = s.deltas[period];
            return (
              <div key={s.label} className="hb-wd9-stat">
                <span className="hb-wd9-stat-label">{s.label}</span>
                <span className="hb-wd9-stat-val">
                  <span key={`${period}-${v}`} aria-label={v}>
                    {v.split("").map((ch, i) => (
                      <span key={i} aria-hidden="true" style={{ animationDelay: `${(i * 0.035).toFixed(3)}s` }}>{ch}</span>
                    ))}
                  </span>
                  <span className="hb-wd9-delta" data-neg={dlt < 0}>
                    {dlt > 0 ? "+" : ""}
                    {dlt.toFixed(1)}%
                  </span>
                </span>
                <span style={{ color: "var(--hb-wd9-accent)" }} key={period}>
                  <Spark data={s.series[period]} />
                </span>
              </div>
            );
          })}
        </div>
        <div className="hb-wd9-bar">
          <h3>Pinned</h3>
        </div>
        <div className="hb-wd9-posts">
          {posts.map((p, i) => (
            <a key={p.title} className="hb-wd9-post" href="#">
              <span className="hb-wd9-thumb" style={{ background: `radial-gradient(80% 90% at 30% 20%, hsl(${p.hue} 80% 72%), transparent 60%), radial-gradient(70% 80% at 85% 90%, hsl(${(p.hue + 50) % 360} 70% 50%), transparent 60%), hsl(${p.hue} 30% 22%)` }}>
                {i === 0 && <span className="hb-wd9-pin">PINNED</span>}
                <span className="hb-wd9-play" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.6v10.8L13 8z" /></svg>
                </span>
                <span className="hb-wd9-dur">{p.duration}</span>
              </span>
              <span>
                <b>{p.title}</b>
                <small>{p.meta}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

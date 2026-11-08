"use client";

import * as React from "react";

export interface AboutZoneMember {
  name: string;
  role: string;
  team: string;
  city: string;
  offset: number;
  hue: number;
}

export interface AboutTeamTimezonesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: AboutZoneMember[];
  allLabel?: string;
  referenceUtcHour?: number;
  onTeamChange?: (team: string) => void;
  accent?: string;
}

const defaultMembers: AboutZoneMember[] = [
  { name: "Ines Carvalho", role: "CEO", team: "Leadership", city: "Lisbon", offset: 0, hue: 18 },
  { name: "Tobias Wren", role: "CTO", team: "Leadership", city: "London", offset: 0, hue: 210 },
  { name: "Kenji Moriyama", role: "Staff engineer", team: "Engineering", city: "Osaka", offset: 9, hue: 160 },
  { name: "Ana Lucía Ortiz", role: "Platform engineer", team: "Engineering", city: "Bogotá", offset: -5, hue: 330 },
  { name: "Dev Malhotra", role: "Infra lead", team: "Engineering", city: "Pune", offset: 5.5, hue: 45 },
  { name: "Sigrid Aas", role: "Mobile engineer", team: "Engineering", city: "Oslo", offset: 1, hue: 260 },
  { name: "Marcus Bell", role: "Backend engineer", team: "Engineering", city: "Chicago", offset: -6, hue: 190 },
  { name: "Leilani Kahale", role: "Product designer", team: "Design", city: "Honolulu", offset: -10, hue: 140 },
  { name: "Yusuf Demir", role: "Design lead", team: "Design", city: "Istanbul", offset: 3, hue: 0 },
  { name: "Clara Weiss", role: "Brand designer", team: "Design", city: "Vienna", offset: 1, hue: 290 },
  { name: "Olu Adeyemi", role: "Support lead", team: "Customers", city: "Lagos", offset: 1, hue: 30 },
  { name: "Mia Tanaka", role: "Success manager", team: "Customers", city: "Sydney", offset: 10, hue: 175 },
  { name: "Jordan Pike", role: "Solutions engineer", team: "Customers", city: "Denver", offset: -7, hue: 225 },
  { name: "Nadia Haddad", role: "Support engineer", team: "Customers", city: "Amman", offset: 3, hue: 350 },
];

const css = `
@keyframes hb-wd6-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.hb-wd6 {
  --hb-wd6-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd6 *, .hb-wd6 *::before, .hb-wd6 *::after { box-sizing: border-box; }
.hb-wd6-in { max-width: 1120px; margin: 0 auto; padding: 72px 20px 92px; }
.hb-wd6-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 28px; }
.hb-wd6-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd6-accent); }
.hb-wd6-title { margin: 12px 0 10px; font: 600 clamp(30px, 4.5cqw, 46px)/1.04 var(--font-grotesk, inherit); letter-spacing: -0.03em; max-width: 20ch; }
.hb-wd6-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 48ch; }
.hb-wd6-tools { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.hb-wd6-seg { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #141414; border: 1px solid rgba(255,255,255,0.07); overflow-x: auto; max-width: 100%; scrollbar-width: none; }
.hb-wd6-segbtn { appearance: none; border: 0; padding: 7px 13px; border-radius: 999px; background: transparent; color: #9a9a9a; font: 500 12.5px/1 inherit; font-family: inherit; white-space: nowrap; cursor: pointer; transition: background-color 0.25s ease, color 0.25s ease; }
.hb-wd6-segbtn:hover { color: #ededed; }
.hb-wd6-segbtn[aria-pressed="true"] { background: #ededed; color: #0a0a0a; }
.hb-wd6-segbtn:focus-visible { outline: 2px solid var(--hb-wd6-accent); outline-offset: 2px; }
.hb-wd6-search { position: relative; }
.hb-wd6-search svg { position: absolute; left: 11px; top: 50%; width: 14px; height: 14px; transform: translateY(-50%); color: #6a6a6a; pointer-events: none; }
.hb-wd6-search input { width: 180px; padding: 8px 12px 8px 32px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.08); background: #111; color: #ededed; font: 400 13px/1.2 inherit; font-family: inherit; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-wd6-search input:focus { border-color: color-mix(in srgb, var(--hb-wd6-accent) 60%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wd6-accent) 16%, transparent); }
.hb-wd6-band { position: relative; border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); background: #0e0e0e; padding: 16px 16px 10px; margin-bottom: 18px; overflow: hidden; }
.hb-wd6-bandtop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font: 500 11px/1 var(--font-mono, monospace); color: #8f8f8f; letter-spacing: 0.06em; }
.hb-wd6-bandtop b { color: #ededed; font-weight: 600; }
.hb-wd6-sky { position: relative; height: 92px; border-radius: 10px; overflow: hidden; }
.hb-wd6-daylight { position: absolute; inset: 0; }
.hb-wd6-col { position: absolute; bottom: 8px; display: flex; flex-direction: column-reverse; align-items: center; gap: 3px; transform: translateX(-50%); }
.hb-wd6-pin { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #0e0e0e; display: grid; place-items: center; font: 700 7.5px/1 inherit; color: rgba(0,0,0,0.72); transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.5, 0.5, 1), box-shadow 0.25s ease; cursor: default; }
.hb-wd6-pin[data-dim="true"] { opacity: 0.18; transform: scale(0.8); }
.hb-wd6-pin[data-hot="true"] { transform: scale(1.35); box-shadow: 0 0 0 3px var(--hb-wd6-accent); z-index: 2; }
.hb-wd6-ticks { position: relative; height: 18px; margin-top: 6px; }
.hb-wd6-ticks span { position: absolute; transform: translateX(-50%); font: 500 9.5px/1 var(--font-mono, monospace); color: #5c5c5c; top: 4px; }
.hb-wd6-now { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--hb-wd6-accent); box-shadow: 0 0 10px var(--hb-wd6-accent); }
.hb-wd6-now::after { content: "Midday"; position: absolute; top: 6px; left: 6px; font: 600 9px/1 var(--font-mono, monospace); color: var(--hb-wd6-accent); white-space: nowrap; }
.hb-wd6-count { font: 500 12px/1 var(--font-mono, monospace); color: #8f8f8f; margin: 0 0 12px; }
.hb-wd6-count b { color: #ededed; }
.hb-wd6-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; grid-template-columns: 1fr; }
@container (min-width: 520px) { .hb-wd6-grid { grid-template-columns: 1fr 1fr; } }
@container (min-width: 820px) { .hb-wd6-grid { grid-template-columns: repeat(3, 1fr); } }
@container (min-width: 1040px) { .hb-wd6-grid { grid-template-columns: repeat(4, 1fr); } }
.hb-wd6-card { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 12px 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: #111; transition: opacity 0.35s ease, filter 0.35s ease, border-color 0.25s ease, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), background-color 0.25s ease; outline: none; animation: hb-wd6-in 0.5s ease both; }
.hb-wd6-card[data-dim="true"] { opacity: 0.28; filter: grayscale(1); transform: scale(0.97); }
.hb-wd6-card[data-hot="true"], .hb-wd6-card:focus-visible { border-color: color-mix(in srgb, var(--hb-wd6-accent) 55%, transparent); background: #141616; }
.hb-wd6-av { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; font: 600 13px/1 inherit; color: rgba(0,0,0,0.75); }
.hb-wd6-who { min-width: 0; }
.hb-wd6-who b { display: block; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wd6-who span { display: block; font-size: 12px; color: #8a8a8a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
.hb-wd6-clock { text-align: right; }
.hb-wd6-clock b { display: flex; align-items: center; justify-content: flex-end; gap: 5px; font: 600 13px/1 var(--font-mono, monospace); font-variant-numeric: tabular-nums; }
.hb-wd6-clock svg { width: 12px; height: 12px; }
.hb-wd6-clock span { display: block; margin-top: 4px; font-size: 11px; color: #6f6f6f; }
.hb-wd6-awake { color: #fbbf24; }
.hb-wd6-asleep { color: #8b9cff; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd6 *, .hb-wd6 *::before, .hb-wd6 *::after { animation: none !important; transition: none !important; }
}
`;

const MIN = -11;
const MAX = 11;

function pos(offset: number) {
  return ((offset - MIN) / (MAX - MIN)) * 92 + 4;
}

function fmt(mins: number) {
  const m = ((Math.round(mins) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function initials(n: string) {
  return n.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("");
}

export function AboutTeamTimezones({
  eyebrow = "The team",
  title = "Fourteen people, spread across the clock",
  subtitle = "We work async by default and overlap for two hours a day. Filter by team to see who is awake right now and where the handoffs happen.",
  members = defaultMembers,
  allLabel = "Everyone",
  referenceUtcHour = 14,
  onTeamChange,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: AboutTeamTimezonesProps) {
  const [team, setTeam] = React.useState(allLabel);
  const [query, setQuery] = React.useState("");
  const [hot, setHot] = React.useState<string | null>(null);
  const [utc, setUtc] = React.useState(referenceUtcHour * 60);

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      setUtc(d.getUTCHours() * 60 + d.getUTCMinutes());
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  const teams = React.useMemo(() => [allLabel, ...Array.from(new Set(members.map((m) => m.team)))], [members, allLabel]);
  const q = query.trim().toLowerCase();
  const match = (m: AboutZoneMember) => (team === allLabel || m.team === team) && (!q || `${m.name} ${m.city} ${m.role}`.toLowerCase().includes(q));
  const shown = members.filter(match).length;

  const columns = React.useMemo(() => {
    const map = new Map<number, AboutZoneMember[]>();
    for (const m of members) map.set(m.offset, [...(map.get(m.offset) ?? []), m]);
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [members]);

  const utcH = utc / 60;
  const stops: string[] = [];
  for (let o = MIN; o <= MAX; o += 1) {
    const local = (((utcH + o) % 24) + 24) % 24;
    const sun = Math.max(0, Math.sin(((local - 6) / 12) * Math.PI));
    const c = sun > 0.02 ? `rgba(${Math.round(40 + sun * 30)}, ${Math.round(60 + sun * 80)}, ${Math.round(90 + sun * 90)}, ${(0.25 + sun * 0.45).toFixed(2)})` : "rgba(20, 22, 48, 0.9)";
    stops.push(`${c} ${pos(o).toFixed(1)}%`);
  }
  const noon = ((((12 - utcH + 12) % 24) + 24) % 24) - 12;
  const nowPos = pos(Math.min(MAX, Math.max(MIN, noon)));
  const pick = (t: string) => {
    setTeam(t);
    onTeamChange?.(t);
  };

  return (
    <section className={`hb-wd6 ${className}`} style={{ "--hb-wd6-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-team-timezones" precedence="default">{css}</style>
      <div className="hb-wd6-in">
        <div className="hb-wd6-head">
          <div>
            <div className="hb-wd6-eyebrow">{eyebrow}</div>
            <h2 className="hb-wd6-title">{title}</h2>
            <p className="hb-wd6-sub">{subtitle}</p>
          </div>
          <div className="hb-wd6-tools">
            <div className="hb-wd6-seg" role="group" aria-label="Filter by team">
              {teams.map((t) => (
                <button key={t} type="button" className="hb-wd6-segbtn" aria-pressed={team === t} onClick={() => pick(t)}>
                  {t}
                </button>
              ))}
            </div>
            <label className="hb-wd6-search">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.6" /><path d="M10.6 10.6L14 14" /></svg>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name or city" aria-label="Search the team" />
            </label>
          </div>
        </div>
        <div className="hb-wd6-band">
          <div className="hb-wd6-bandtop">
            <span>UTC{MIN} to UTC+{MAX}</span>
            <span>
              <b>{fmt(utc)}</b> UTC
            </span>
          </div>
          <div className="hb-wd6-sky" style={{ background: `linear-gradient(90deg, ${stops.join(", ")})` }}>
            <span className="hb-wd6-now" style={{ left: `${nowPos.toFixed(1)}%` }} aria-hidden="true" />
            {columns.map(([offset, list]) => (
              <div key={offset} className="hb-wd6-col" style={{ left: `${pos(offset).toFixed(2)}%` }}>
                {list.map((m) => (
                  <span
                    key={m.name}
                    className="hb-wd6-pin"
                    title={`${m.name}, ${m.city}`}
                    data-dim={!match(m)}
                    data-hot={hot === m.name}
                    style={{ background: `hsl(${m.hue} 70% 68%)` }}
                    onPointerEnter={() => setHot(m.name)}
                    onPointerLeave={() => setHot(null)}
                  >
                    {initials(m.name)}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="hb-wd6-ticks" aria-hidden="true">
            {[-10, -6, -3, 0, 3, 6, 10].map((o) => (
              <span key={o} style={{ left: `${pos(o).toFixed(1)}%` }}>{o === 0 ? "UTC" : o > 0 ? `+${o}` : o}</span>
            ))}
          </div>
        </div>
        <p className="hb-wd6-count" aria-live="polite">
          <b>{shown}</b> of {members.length} people
        </p>
        <ul className="hb-wd6-grid">
          {members.map((m, i) => {
            const local = utc + m.offset * 60;
            const h = ((((local / 60) % 24) + 24) % 24);
            const awake = h >= 8 && h < 20;
            return (
              <li
                key={m.name}
                className="hb-wd6-card"
                tabIndex={0}
                data-dim={!match(m)}
                data-hot={hot === m.name}
                onPointerEnter={() => setHot(m.name)}
                onPointerLeave={() => setHot(null)}
                onFocus={() => setHot(m.name)}
                onBlur={() => setHot(null)}
                style={{ animationDelay: `${(i * 0.03).toFixed(2)}s` }}
              >
                <span className="hb-wd6-av" style={{ background: `linear-gradient(135deg, hsl(${m.hue} 75% 72%), hsl(${(m.hue + 40) % 360} 65% 58%))` }} aria-hidden="true">
                  {initials(m.name)}
                </span>
                <span className="hb-wd6-who">
                  <b>{m.name}</b>
                  <span>{m.role}, {m.city}</span>
                </span>
                <span className="hb-wd6-clock">
                  <b>
                    {awake ? (
                      <svg className="hb-wd6-awake" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-label="Awake"><circle cx="6" cy="6" r="2.4" /><path d="M6 1v1.2M6 9.8V11M1 6h1.2M9.8 6H11M2.5 2.5l.8.8M8.7 8.7l.8.8M2.5 9.5l.8-.8M8.7 3.3l.8-.8" /></svg>
                    ) : (
                      <svg className="hb-wd6-asleep" viewBox="0 0 12 12" fill="currentColor" aria-label="Probably asleep"><path d="M9.8 7.6A4.4 4.4 0 0 1 4.4 2.2a4.4 4.4 0 1 0 5.4 5.4z" /></svg>
                    )}
                    {fmt(local)}
                  </b>
                  <span>UTC{m.offset >= 0 ? "+" : ""}{m.offset}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

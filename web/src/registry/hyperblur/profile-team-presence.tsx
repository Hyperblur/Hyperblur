"use client";

import * as React from "react";

export type ProfilePresenceStatus = "online" | "away" | "busy" | "offline";

export interface ProfilePresenceMember {
  name: string;
  role: string;
  status: ProfilePresenceStatus;
  note: string;
  localTime: string;
  city: string;
  hue: number;
  typing?: boolean;
}

export interface ProfileTeamPresenceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  members?: ProfilePresenceMember[];
  defaultFilter?: ProfilePresenceStatus | "all";
  onMessage?: (member: ProfilePresenceMember) => void;
  onCall?: (member: ProfilePresenceMember) => void;
  accent?: string;
}

const defaultMembers: ProfilePresenceMember[] = [
  { name: "Ines Carvalho", role: "Design Lead", status: "online", note: "Reviewing onboarding flows", localTime: "14:32", city: "Lisbon", hue: 330, typing: true },
  { name: "Marcus Webb", role: "Backend Engineer", status: "busy", note: "In a call until 15:00", localTime: "09:32", city: "New York", hue: 210 },
  { name: "Yuki Tanaka", role: "iOS Engineer", status: "online", note: "Shipping 4.2 to TestFlight", localTime: "22:32", city: "Osaka", hue: 160 },
  { name: "Leah Goldberg", role: "Product Manager", status: "away", note: "Lunch, back at 14:00", localTime: "13:32", city: "London", hue: 40 },
  { name: "Arjun Mehta", role: "Data Scientist", status: "online", note: "Training churn model v7", localTime: "19:02", city: "Bangalore", hue: 265 },
  { name: "Sofia Rossi", role: "Frontend Engineer", status: "offline", note: "Back Monday", localTime: "15:32", city: "Milan", hue: 12 },
  { name: "Kwame Asante", role: "Support Lead", status: "online", note: "Inbox zero, for now", localTime: "13:32", city: "Accra", hue: 185 },
  { name: "Nora Lindgren", role: "QA Engineer", status: "away", note: "Focus time", localTime: "15:32", city: "Stockholm", hue: 290 },
];

const statusLabel: Record<ProfilePresenceStatus, string> = { online: "Online", away: "Away", busy: "Do not disturb", offline: "Offline" };
const filters: (ProfilePresenceStatus | "all")[] = ["all", "online", "away", "busy", "offline"];
const filterLabel: Record<ProfilePresenceStatus | "all", string> = { all: "All", online: "Online", away: "Away", busy: "Busy", offline: "Offline" };

const css = `
@keyframes hb-yga-ping {
  0% { transform: scale(1); opacity: 0.6; }
  80%, 100% { transform: scale(2.6); opacity: 0; }
}
@keyframes hb-yga-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yga-dot {
  0%, 60%, 100% { transform: none; opacity: 0.4; }
  30% { transform: translateY(-3px); opacity: 1; }
}
.hb-yga {
  --hb-yga-accent: #10b981;
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
.hb-yga *, .hb-yga *::before, .hb-yga *::after { box-sizing: border-box; }
.hb-yga-in { max-width: 1120px; margin: 0 auto; padding: 80px 24px 96px; }
.hb-yga-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; }
.hb-yga-title { margin: 0; font-size: clamp(28px, 4cqw, 42px); font-weight: 650; letter-spacing: -0.04em; }
.hb-yga-sub { display: flex; flex-wrap: wrap; gap: 14px; margin: 10px 0 0; color: #8f8f8f; font-size: 14.5px; }
.hb-yga-sub span { display: inline-flex; align-items: center; gap: 6px; }
.hb-yga-sub i { width: 7px; height: 7px; border-radius: 50%; }
.hb-yga-tools { display: flex; flex-wrap: wrap; gap: 10px; }
.hb-yga-search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: #111;
  color: #6f6f6f;
  transition: border-color 0.2s ease;
}
.hb-yga-search:focus-within { border-color: color-mix(in srgb, var(--hb-yga-accent) 60%, transparent); }
.hb-yga-search input { width: 160px; border: 0; background: none; color: #ededed; font: inherit; font-size: 13.5px; outline: none; }
.hb-yga-search input::placeholder { color: #5f5f5f; }
.hb-yga-seg { display: flex; padding: 3px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; background: #111; }
.hb-yga-seg button {
  height: 30px;
  padding: 0 11px;
  border: 0;
  border-radius: 7px;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-yga-seg button:hover { color: #ededed; }
.hb-yga-seg button[aria-checked="true"] { background: #1f1f1f; color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06); }
.hb-yga-seg button:focus-visible { outline: 2px solid var(--hb-yga-accent); outline-offset: 1px; }
.hb-yga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 12px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}
.hb-yga-card {
  position: relative;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  animation: hb-yga-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.hb-yga-card:hover, .hb-yga-card:focus-within { border-color: rgba(255, 255, 255, 0.16); transform: translateY(-2px); }
.hb-yga-card[data-status="offline"] { opacity: 0.62; }
.hb-yga-top { display: flex; align-items: center; gap: 12px; }
.hb-yga-av {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(140deg, hsl(var(--hb-yga-h) 75% 62%), hsl(calc(var(--hb-yga-h) + 40) 60% 36%));
  color: #fff;
  font-size: 15px;
  font-weight: 650;
}
.hb-yga-card[data-status="offline"] .hb-yga-av { filter: grayscale(0.7); }
.hb-yga-pres {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 14px;
  height: 14px;
  border: 3px solid #121212;
  border-radius: 50%;
  background: var(--hb-yga-pc);
}
.hb-yga-pres::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: var(--hb-yga-pc);
  opacity: 0;
}
.hb-yga-card[data-status="online"] .hb-yga-pres::after { animation: hb-yga-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite; animation-delay: inherit; }
.hb-yga-card[data-status="busy"] .hb-yga-pres::before {
  content: "";
  position: absolute;
  left: 2px;
  right: 2px;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  border-radius: 1px;
  background: #121212;
}
.hb-yga-card[data-status="offline"] .hb-yga-pres { background: #121212; box-shadow: inset 0 0 0 2px #6f6f6f; }
.hb-yga-who { min-width: 0; }
.hb-yga-who strong { display: block; overflow: hidden; font-size: 15px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yga-who span { display: block; margin-top: 2px; color: #8f8f8f; font-size: 13px; }
.hb-yga-note {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  margin-top: 14px;
  padding: 9px 12px;
  border-radius: 10px;
  background: #0b0b0b;
  color: #c4c4c4;
  font-size: 13px;
  line-height: 1.35;
}
.hb-yga-typing { display: inline-flex; gap: 3px; margin-left: auto; }
.hb-yga-typing i { width: 4px; height: 4px; border-radius: 50%; background: var(--hb-yga-accent); animation: hb-yga-dot 1.2s ease-in-out infinite; }
.hb-yga-typing i:nth-child(2) { animation-delay: 0.15s; }
.hb-yga-typing i:nth-child(3) { animation-delay: 0.3s; }
.hb-yga-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 14px; }
.hb-yga-time { color: #6f6f6f; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-yga-time b { color: #a1a1a1; font-weight: 500; }
.hb-yga-acts { display: flex; gap: 6px; opacity: 0.55; transition: opacity 0.2s ease; }
.hb-yga-card:hover .hb-yga-acts, .hb-yga-card:focus-within .hb-yga-acts { opacity: 1; }
.hb-yga-act {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9px;
  background: #171717;
  color: #ededed;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.hb-yga-act:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-yga-accent) 18%, #171717); border-color: color-mix(in srgb, var(--hb-yga-accent) 50%, transparent); color: #fff; }
.hb-yga-act:disabled { opacity: 0.4; cursor: not-allowed; }
.hb-yga-act:focus-visible { outline: 2px solid var(--hb-yga-accent); outline-offset: 2px; }
.hb-yga-empty { grid-column: 1 / -1; padding: 40px; border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 18px; color: #8f8f8f; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .hb-yga-card, .hb-yga-pres::after, .hb-yga-typing i { animation: none !important; }
  .hb-yga-card, .hb-yga-acts, .hb-yga-act, .hb-yga-seg button, .hb-yga-search { transition: none; }
}
`;

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export function ProfileTeamPresence({
  title = "Who is around",
  subtitle,
  members = defaultMembers,
  defaultFilter = "all",
  onMessage,
  onCall,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: ProfileTeamPresenceProps) {
  const [filter, setFilter] = React.useState<ProfilePresenceStatus | "all">(defaultFilter);
  const [query, setQuery] = React.useState("");
  const segRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const colors: Record<ProfilePresenceStatus, string> = { online: accent, away: "#f5a524", busy: "#ef4444", offline: "#6f6f6f" };
  const count = (s: ProfilePresenceStatus) => members.filter((m) => m.status === s).length;
  const q = query.trim().toLowerCase();
  const visible = members.filter((m) => (filter === "all" || m.status === filter) && (!q || `${m.name} ${m.role} ${m.city}`.toLowerCase().includes(q)));

  const onSegKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + filters.length) % filters.length;
    segRefs.current[n]?.focus();
    setFilter(filters[n]);
  };

  return (
    <section className={`hb-yga ${className}`} style={{ "--hb-yga-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-profile-team-presence" precedence="default">{css}</style>
      <div className="hb-yga-in">
        <div className="hb-yga-head">
          <div>
            <h2 className="hb-yga-title">{title}</h2>
            <p className="hb-yga-sub">
              {subtitle ?? (
                <>
                  <span><i style={{ background: colors.online }} aria-hidden="true" />{count("online")} online</span>
                  <span><i style={{ background: colors.away }} aria-hidden="true" />{count("away")} away</span>
                  <span><i style={{ background: colors.busy }} aria-hidden="true" />{count("busy")} busy</span>
                  <span><i style={{ background: colors.offline }} aria-hidden="true" />{count("offline")} offline</span>
                </>
              )}
            </p>
          </div>
          <div className="hb-yga-tools">
            <label className="hb-yga-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              <input type="search" placeholder="Search people" aria-label="Search people" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <div className="hb-yga-seg" role="radiogroup" aria-label="Filter by status">
              {filters.map((f, i) => (
                <button
                  key={f}
                  ref={(el) => { segRefs.current[i] = el; }}
                  type="button"
                  role="radio"
                  aria-checked={filter === f}
                  tabIndex={filter === f ? 0 : -1}
                  onClick={() => setFilter(f)}
                  onKeyDown={(e) => onSegKey(e, i)}
                >
                  {filterLabel[f]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <ul className="hb-yga-grid" aria-live="polite">
          {visible.length === 0 && <li className="hb-yga-empty">No one matches that filter.</li>}
          {visible.map((m, i) => (
            <li
              key={`${filter}-${m.name}`}
              className="hb-yga-card"
              data-status={m.status}
              style={{ "--hb-yga-h": m.hue, "--hb-yga-pc": colors[m.status], animationDelay: `${(i * 0.05).toFixed(2)}s` } as React.CSSProperties}
            >
              <div className="hb-yga-top">
                <span className="hb-yga-av" aria-hidden="true">
                  {initials(m.name)}
                  <span className="hb-yga-pres" />
                </span>
                <div className="hb-yga-who">
                  <strong>{m.name}</strong>
                  <span>{m.role} · {statusLabel[m.status]}</span>
                </div>
              </div>
              <div className="hb-yga-note">
                {m.typing ? "Typing in #design" : m.note}
                {m.typing && <span className="hb-yga-typing" aria-hidden="true"><i /><i /><i /></span>}
              </div>
              <div className="hb-yga-foot">
                <span className="hb-yga-time"><b>{m.localTime}</b> in {m.city}</span>
                <span className="hb-yga-acts">
                  <button type="button" className="hb-yga-act" aria-label={`Message ${m.name}`} onClick={() => onMessage?.(m)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>
                  </button>
                  <button type="button" className="hb-yga-act" aria-label={`Call ${m.name}`} disabled={m.status === "offline" || m.status === "busy"} onClick={() => onCall?.(m)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 10l5-3v10l-5-3M3 7h12v10H3z" /></svg>
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

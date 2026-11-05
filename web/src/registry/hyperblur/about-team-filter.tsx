"use client";

import * as React from "react";

export interface AboutTeamMember {
  name: string;
  role: string;
  team: string;
  bio: string;
  location: string;
  hue: number;
}

export interface AboutTeamFilterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: AboutTeamMember[];
  allLabel?: string;
  defaultTeam?: string;
  onTeamChange?: (team: string) => void;
  accent?: string;
}

const defaultMembers: AboutTeamMember[] = [
  { name: "Maya Okafor", role: "Co-founder, CEO", team: "Leadership", bio: "Ran payments infrastructure at Stripe for six years before starting Northwind in a Lagos co-working space.", location: "Lisbon", hue: 262 },
  { name: "Jonas Lindqvist", role: "Co-founder, CTO", team: "Leadership", bio: "Wrote the first query engine on a train between Malmo and Berlin. Still reviews every schema change.", location: "Berlin", hue: 200 },
  { name: "Priya Raman", role: "Staff Engineer", team: "Engineering", bio: "Owns the sync layer. Previously built offline-first tooling at Figma and loves a good flame graph.", location: "Toronto", hue: 152 },
  { name: "Diego Alvarez", role: "Product Designer", team: "Design", bio: "Sketches every flow on paper first. Formerly at Linear, now obsessed with keyboard-first interfaces.", location: "Mexico City", hue: 24 },
  { name: "Hana Ito", role: "Engineering Manager", team: "Engineering", bio: "Grew the platform team from three to fourteen people without a single all-hands that ran over time.", location: "Tokyo", hue: 330 },
  { name: "Samuel Mensah", role: "Head of Growth", team: "Go to market", bio: "Took a developer tool from zero to forty thousand weekly users with docs, not ads.", location: "Accra", hue: 44 },
  { name: "Elena Petrova", role: "Brand Designer", team: "Design", bio: "Drew the Northwind wordmark by hand. Collects Soviet-era type specimens and old transit maps.", location: "Amsterdam", hue: 292 },
  { name: "Noah Fischer", role: "Solutions Engineer", team: "Go to market", bio: "Has migrated more than two hundred customers off spreadsheets and remembers every one of them.", location: "Zurich", hue: 176 },
];

const css = `
@keyframes hb-yg1-in {
  from { opacity: 0; transform: translateY(14px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yg1-orbit {
  to { transform: rotate(360deg); }
}
.hb-yg1 {
  --hb-yg1-accent: #8b5cf6;
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
.hb-yg1 *, .hb-yg1 *::before, .hb-yg1 *::after { box-sizing: border-box; }
.hb-yg1-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(40% 50% at 15% 0%, color-mix(in srgb, var(--hb-yg1-accent) 18%, transparent), transparent 70%),
    radial-gradient(30% 40% at 95% 20%, rgba(255, 255, 255, 0.04), transparent 70%);
}
.hb-yg1-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px 96px;
}
.hb-yg1-head {
  display: grid;
  gap: 20px;
  align-items: end;
}
@container (min-width: 760px) {
  .hb-yg1-head { grid-template-columns: 1.2fr 1fr; }
}
.hb-yg1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: color-mix(in srgb, var(--hb-yg1-accent) 70%, #fff);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.hb-yg1-eyebrow::before {
  content: "";
  width: 18px;
  height: 1px;
  background: currentColor;
}
.hb-yg1-title {
  margin: 14px 0 0;
  font-size: clamp(32px, 5cqw, 52px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.hb-yg1-sub {
  margin: 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-yg1-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 36px;
}
.hb-yg1-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: #111;
  color: #a1a1a1;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.hb-yg1-chip:hover { color: #ededed; border-color: rgba(255, 255, 255, 0.16); }
.hb-yg1-chip:focus-visible { outline: 2px solid var(--hb-yg1-accent); outline-offset: 2px; }
.hb-yg1-chip[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-yg1-accent) 60%, transparent);
  background: color-mix(in srgb, var(--hb-yg1-accent) 16%, #111);
  color: #fff;
}
.hb-yg1-count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 11.5px;
  line-height: 20px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.hb-yg1-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr));
  gap: 14px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}
.hb-yg1-card {
  position: relative;
  height: 270px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  outline: none;
  animation: hb-yg1-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.hb-yg1-card:hover, .hb-yg1-card:focus-visible {
  border-color: color-mix(in srgb, var(--hb-yg1-accent) 45%, transparent);
  transform: translateY(-3px);
}
.hb-yg1-card:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yg1-accent) 35%, transparent); }
.hb-yg1-art {
  position: absolute;
  inset: 0 0 76px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(70% 70% at 50% 40%, hsl(var(--hb-yg1-h) 70% 55% / 0.28), transparent 70%),
    linear-gradient(180deg, #151515, #111);
}
.hb-yg1-ring {
  position: absolute;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: 1px dashed hsl(var(--hb-yg1-h) 70% 70% / 0.3);
  animation: hb-yg1-orbit 24s linear infinite;
}
.hb-yg1-avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(140deg, hsl(var(--hb-yg1-h) 80% 66%), hsl(calc(var(--hb-yg1-h) + 40) 70% 38%));
  box-shadow: 0 18px 40px -16px hsl(var(--hb-yg1-h) 80% 50% / 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.94);
  font-size: 30px;
  font-weight: 650;
  letter-spacing: -0.03em;
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-yg1-card:hover .hb-yg1-avatar, .hb-yg1-card:focus-visible .hb-yg1-avatar { transform: translateY(-34px) scale(0.72); }
.hb-yg1-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 18px 18px;
}
.hb-yg1-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hb-yg1-role {
  margin: 3px 0 0;
  color: #8f8f8f;
  font-size: 13px;
}
.hb-yg1-bio {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.88), #111 40%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transform: translateY(101%);
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-yg1-card:hover .hb-yg1-bio, .hb-yg1-card:focus-visible .hb-yg1-bio { transform: none; }
.hb-yg1-bio p {
  margin: 8px 0 0;
  color: #c4c4c4;
  font-size: 13px;
  line-height: 1.55;
}
.hb-yg1-loc {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: color-mix(in srgb, var(--hb-yg1-accent) 60%, #fff);
  font-size: 12px;
  font-weight: 500;
}
.hb-yg1-empty {
  grid-column: 1 / -1;
  padding: 48px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  color: #8f8f8f;
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .hb-yg1-card, .hb-yg1-ring { animation: none; }
  .hb-yg1-card, .hb-yg1-avatar, .hb-yg1-bio, .hb-yg1-chip { transition: none; }
}
`;

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export function AboutTeamFilter({
  eyebrow = "The team",
  title = "Twenty-three people, eleven time zones, one very long Slack thread",
  subtitle = "We are a small, remote-first team of engineers, designers and operators. Hover a card to meet the person behind it.",
  members = defaultMembers,
  allLabel = "Everyone",
  defaultTeam,
  onTeamChange,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: AboutTeamFilterProps) {
  const teams = React.useMemo(() => [allLabel, ...Array.from(new Set(members.map((m) => m.team)))], [members, allLabel]);
  const [team, setTeam] = React.useState(defaultTeam ?? allLabel);
  const chipRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const visible = team === allLabel ? members : members.filter((m) => m.team === team);

  const choose = (next: string) => {
    setTeam(next);
    onTeamChange?.(next);
  };

  const onChipKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + teams.length) % teams.length;
    chipRefs.current[next]?.focus();
    choose(teams[next]);
  };

  return (
    <section className={`hb-yg1 ${className}`} style={{ "--hb-yg1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-team-filter" precedence="default">{css}</style>
      <div className="hb-yg1-glow" aria-hidden="true" />
      <div className="hb-yg1-in">
        <div className="hb-yg1-head">
          <div>
            <span className="hb-yg1-eyebrow">{eyebrow}</span>
            <h2 className="hb-yg1-title">{title}</h2>
          </div>
          <p className="hb-yg1-sub">{subtitle}</p>
        </div>
        <div className="hb-yg1-chips" role="toolbar" aria-label="Filter by team">
          {teams.map((t, i) => (
            <button
              key={t}
              ref={(el) => { chipRefs.current[i] = el; }}
              type="button"
              className="hb-yg1-chip"
              aria-pressed={team === t}
              tabIndex={team === t ? 0 : -1}
              onClick={() => choose(t)}
              onKeyDown={(e) => onChipKey(e, i)}
            >
              {t}
              <span className="hb-yg1-count">{t === allLabel ? members.length : members.filter((m) => m.team === t).length}</span>
            </button>
          ))}
        </div>
        <ul className="hb-yg1-grid" aria-live="polite">
          {visible.length === 0 && <li className="hb-yg1-empty">Nobody here yet.</li>}
          {visible.map((m, i) => (
            <li
              key={`${team}-${m.name}`}
              className="hb-yg1-card"
              tabIndex={0}
              aria-label={`${m.name}, ${m.role}`}
              style={{ "--hb-yg1-h": m.hue, animationDelay: `${(i * 0.06).toFixed(2)}s` } as React.CSSProperties}
            >
              <div className="hb-yg1-art" aria-hidden="true">
                <span className="hb-yg1-ring" />
                <span className="hb-yg1-avatar">{initials(m.name)}</span>
              </div>
              <div className="hb-yg1-meta">
                <p className="hb-yg1-name">{m.name}</p>
                <p className="hb-yg1-role">{m.role}</p>
              </div>
              <div className="hb-yg1-bio">
                <p className="hb-yg1-name">{m.name}</p>
                <p>{m.bio}</p>
                <span className="hb-yg1-loc">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  {m.location}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

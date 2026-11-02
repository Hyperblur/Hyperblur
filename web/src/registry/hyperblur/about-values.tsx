"use client";

import * as React from "react";

export interface AboutValue {
  title: string;
  text: string;
}

export interface AboutRole {
  title: string;
  team?: string;
  location?: string;
  href: string;
}

export interface AboutValuesLink {
  label: string;
  href: string;
}

export interface AboutValuesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  values?: AboutValue[];
  team?: string[];
  teamSize?: number;
  teamCaption?: string;
  roles?: AboutRole[];
  rolesLink?: AboutValuesLink | null;
  accent?: string;
}

const css = `
.hb-kd9 {
  --hb-kd9-accent: #0f8a5f;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #18181b;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd9 *, .hb-kd9 *::before, .hb-kd9 *::after { box-sizing: border-box; }
.hb-kd9::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(45% 40% at 0% 0%, color-mix(in srgb, var(--hb-kd9-accent) 10%, transparent), transparent 70%),
    radial-gradient(rgba(24, 24, 27, .07) 1px, transparent 1px);
  background-size: auto, 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, rgba(0, 0, 0, .35) 60%, #000);
  mask-image: linear-gradient(180deg, #000, rgba(0, 0, 0, .35) 60%, #000);
  pointer-events: none;
}
.hb-kd9-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 32px 104px;
}
.hb-kd9-head {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 48px;
  align-items: end;
}
.hb-kd9-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--hb-kd9-accent);
  font-size: 13px;
  font-weight: 600;
}
.hb-kd9-eyebrow i { width: 18px; height: 2px; border-radius: 2px; background: var(--hb-kd9-accent); }
.hb-kd9-title {
  margin: 14px 0 0;
  font-size: clamp(32px, 5cqi, 52px);
  font-weight: 650;
  line-height: 1.02;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kd9-sub { margin: 16px 0 0; max-width: 500px; color: #5c5a55; font-size: 16.5px; line-height: 1.6; }
.hb-kd9-team {
  padding: 22px 22px 20px;
  border: 1px solid rgba(24, 24, 27, .08);
  border-radius: 22px;
  background: rgba(255, 255, 255, .7);
  box-shadow: 0 1px 0 #fff inset, 0 18px 40px -24px rgba(24, 24, 27, .35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-kd9-faces { display: flex; align-items: center; padding: 6px 0 4px; }
.hb-kd9-face {
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-left: -10px;
  border: 3px solid #fcfbf8;
  border-radius: 50%;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .02em;
  animation: hb-kd9-bob 3.2s ease-in-out infinite;
  animation-delay: var(--hb-kd9-d, 0s);
  transition: transform .3s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd9-face:first-child { margin-left: 0; }
.hb-kd9-face[data-more="true"] { background: #18181b; color: #f7f5ef; font-size: 12px; animation: none; }
@keyframes hb-kd9-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -6px, 0); }
}
.hb-kd9-faces:hover .hb-kd9-face { animation-play-state: paused; }
.hb-kd9-team-text { margin: 14px 0 0; color: #3f3e3a; font-size: 14px; line-height: 1.5; }
.hb-kd9-team-text b { color: #18181b; font-weight: 650; }
.hb-kd9-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kd9-card {
  position: relative;
  height: 100%;
  padding: 26px 24px 28px;
  border: 1px solid rgba(24, 24, 27, .08);
  border-radius: 20px;
  background: #fffefb;
  box-shadow: 0 1px 2px rgba(24, 24, 27, .04);
  transition: transform .45s cubic-bezier(.2, .8, .2, 1), box-shadow .45s ease, border-color .3s ease;
}
.hb-kd9-card:hover {
  transform: translate3d(0, -4px, 0);
  border-color: color-mix(in srgb, var(--hb-kd9-accent) 30%, rgba(24, 24, 27, .08));
  box-shadow: 0 22px 40px -24px rgba(24, 24, 27, .35);
}
.hb-kd9-num {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kd9-accent) 28%, transparent);
  background: color-mix(in srgb, var(--hb-kd9-accent) 8%, #fff);
  color: var(--hb-kd9-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 600;
  transition: background-color .3s ease, color .3s ease, transform .45s cubic-bezier(.3, 1.4, .5, 1);
}
.hb-kd9-card:hover .hb-kd9-num { background: var(--hb-kd9-accent); color: #fff; transform: rotate(-6deg) scale(1.06); }
.hb-kd9-card-title { margin: 20px 0 0; font-size: 18px; font-weight: 650; letter-spacing: -.015em; }
.hb-kd9-card-text { margin: 8px 0 0; color: #5c5a55; font-size: 14.5px; line-height: 1.6; }
.hb-kd9-roles {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  padding: 22px 24px;
  border: 1px solid rgba(24, 24, 27, .08);
  border-radius: 20px;
  background: rgba(255, 255, 255, .55);
}
.hb-kd9-roles-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
  font-size: 14px;
  font-weight: 650;
}
.hb-kd9-roles-label span {
  display: grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--hb-kd9-accent);
  color: #fff;
  font-size: 12px;
}
.hb-kd9-role {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(24, 24, 27, .12);
  border-radius: 999px;
  background: #fff;
  color: #18181b;
  font-size: 13.5px;
  font-weight: 550;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd9-role small { color: #7a7871; font-size: 12.5px; font-weight: 450; }
.hb-kd9-role:hover { border-color: var(--hb-kd9-accent); background: color-mix(in srgb, var(--hb-kd9-accent) 6%, #fff); transform: translate3d(0, -1px, 0); }
.hb-kd9-role:focus-visible, .hb-kd9-all:focus-visible { outline: 2px solid var(--hb-kd9-accent); outline-offset: 2px; }
.hb-kd9-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  color: var(--hb-kd9-accent);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
}
.hb-kd9-all svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kd9-all:hover svg { transform: translate3d(3px, 0, 0); }
@container (max-width: 860px) {
  .hb-kd9-head { grid-template-columns: minmax(0, 1fr); gap: 32px; align-items: start; }
  .hb-kd9-team { max-width: 440px; }
  .hb-kd9-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 560px) {
  .hb-kd9-in { padding: 64px 16px 72px; }
  .hb-kd9-grid { grid-template-columns: minmax(0, 1fr); margin-top: 40px; }
  .hb-kd9-face { width: 38px; height: 38px; font-size: 12px; }
  .hb-kd9-roles { padding: 18px; }
  .hb-kd9-roles-label { width: 100%; }
  .hb-kd9-all { margin-left: 0; width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd9-face { animation: none; }
  .hb-kd9-card, .hb-kd9-num, .hb-kd9-role, .hb-kd9-all svg { transition: none; }
  .hb-kd9-card:hover, .hb-kd9-role:hover { transform: none; }
  .hb-kd9-card:hover .hb-kd9-num { transform: none; }
}
`;

const defaultValues: AboutValue[] = [
  { title: "Customers set the roadmap", text: "Every engineer spends two hours a month on support calls. What we hear there decides what we build next quarter." },
  { title: "Write it down", text: "Decisions live in short public docs, not in meetings. Anyone can see why we chose something and challenge it later." },
  { title: "Small teams, full ownership", text: "Teams of four ship, measure and maintain what they build. Nobody throws work over a wall to someone else." },
  { title: "Default to calm", text: "No late-night pings, no fake urgency. We plan for sustainable weeks so the work stays good for years, not sprints." },
  { title: "Be generous with credit", text: "We name the people behind every launch, in the changelog and in public. Good work deserves to be seen." },
  { title: "Leave it better", text: "Each pull request makes the codebase a little easier for the next person. Each process gets simpler, not heavier." },
];

const defaultTeam = ["Ana Ferreira", "Kwame Mensah", "Lena Vogt", "Ravi Patel", "Sofia Rossi", "Jun Park", "Olivia Grant", "Mateo Cruz"];

const defaultRoles: AboutRole[] = [
  { title: "Senior Product Designer", location: "Remote, EU", href: "#roles" },
  { title: "Staff Backend Engineer", location: "Lisbon", href: "#roles" },
  { title: "Developer Advocate", location: "Remote, US", href: "#roles" },
  { title: "Customer Success Lead", location: "Toronto", href: "#roles" },
];

const gradients = [
  "linear-gradient(135deg, #10b981, #0ea5e9)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #8b5cf6, #ec4899)",
  "linear-gradient(135deg, #14b8a6, #84cc16)",
  "linear-gradient(135deg, #f43f5e, #f97316)",
  "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  "linear-gradient(135deg, #eab308, #10b981)",
  "linear-gradient(135deg, #06b6d4, #6366f1)",
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AboutValues({
  eyebrow = "How we work",
  title = "Six things we will not compromise on",
  subtitle = "These are the principles we hire for, review against and argue about. They have not changed since the first ten of us wrote them down.",
  values = defaultValues,
  team = defaultTeam,
  teamSize = 42,
  teamCaption = "people across 11 countries, working async from Lisbon, Toronto and their kitchen tables.",
  roles = defaultRoles,
  rolesLink = { label: "See all open roles", href: "#careers" },
  accent = "#0f8a5f",
  className = "",
  style,
  ...rest
}: AboutValuesProps) {
  const uid = React.useId();
  const shown = team.slice(0, 7);
  const more = Math.max(0, teamSize - shown.length);
  const vars = { "--hb-kd9-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kd9 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-about-values" precedence="default">{css}</style>
      <div className="hb-kd9-in">
        <div className="hb-kd9-head">
          <header>
            {eyebrow && (
              <p className="hb-kd9-eyebrow">
                <i aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h2 id={`${uid}-t`} className="hb-kd9-title">{title}</h2>
            {subtitle && <p className="hb-kd9-sub">{subtitle}</p>}
          </header>
          {shown.length > 0 && (
            <div className="hb-kd9-team">
              <div className="hb-kd9-faces" role="img" aria-label={`${teamSize} team members, including ${shown.join(", ")}`}>
                {shown.map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="hb-kd9-face"
                    title={name}
                    style={{ background: gradients[i % gradients.length], "--hb-kd9-d": `${(i * 0.18).toFixed(2)}s` } as React.CSSProperties}
                  >
                    {initialsOf(name)}
                  </span>
                ))}
                {more > 0 && (
                  <span className="hb-kd9-face" data-more="true">
                    +{more}
                  </span>
                )}
              </div>
              {teamCaption && (
                <p className="hb-kd9-team-text">
                  <b>{teamSize}</b> {teamCaption}
                </p>
              )}
            </div>
          )}
        </div>
        <ol className="hb-kd9-grid">
          {values.map((value, i) => (
            <li key={`${value.title}-${i}`}>
              <div className="hb-kd9-card">
                <span className="hb-kd9-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="hb-kd9-card-title">{value.title}</h3>
                <p className="hb-kd9-card-text">{value.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {roles.length > 0 && (
          <nav className="hb-kd9-roles" aria-label="Open roles">
            <span className="hb-kd9-roles-label">
              Open roles
              <span>{roles.length}</span>
            </span>
            {roles.map((role) => (
              <a key={`${role.title}-${role.location ?? ""}`} className="hb-kd9-role" href={role.href}>
                {role.title}
                {(role.location || role.team) && <small>{[role.team, role.location].filter(Boolean).join(" · ")}</small>}
              </a>
            ))}
            {rolesLink && (
              <a className="hb-kd9-all" href={rolesLink.href}>
                {rolesLink.label}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}

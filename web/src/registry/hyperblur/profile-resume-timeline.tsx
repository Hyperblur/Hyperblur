"use client";

import * as React from "react";

export interface ProfileResumeRole {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  stack?: string[];
  current?: boolean;
}

export interface ProfileResumeSkill {
  name: string;
  level: number;
}

export interface ProfileResumeEducation {
  degree: string;
  school: string;
  period: string;
}

export interface ProfileResumeTimelineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  headline?: string;
  location?: string;
  available?: boolean;
  summary?: string;
  roles?: ProfileResumeRole[];
  skills?: ProfileResumeSkill[];
  education?: ProfileResumeEducation[];
  links?: { label: string; href: string }[];
  cv?: { label: string; href: string };
  accent?: string;
}

const defaultRoles: ProfileResumeRole[] = [
  {
    role: "Staff Frontend Engineer",
    company: "Pallet",
    period: "2023 to now",
    location: "Remote",
    current: true,
    points: ["Led the rewrite of the editor to a canvas renderer, cutting input latency from 48 to 9 ms.", "Mentor four engineers and run the frontend guild across three product teams."],
    stack: ["React", "TypeScript", "WebGL"],
  },
  {
    role: "Senior Engineer, Design Systems",
    company: "Brightwave",
    period: "2020 to 2023",
    location: "Copenhagen",
    points: ["Built the component library used by 140 engineers and 31 product surfaces.", "Introduced visual regression testing, reducing UI bugs in production by 62%."],
    stack: ["React", "Storybook", "CSS"],
  },
  {
    role: "Frontend Engineer",
    company: "Ticketfly",
    period: "2017 to 2020",
    location: "Berlin",
    points: ["Shipped the seat picker that sold 2.3 million tickets in its first season."],
    stack: ["Vue", "SVG", "Node"],
  },
];

const defaultSkills: ProfileResumeSkill[] = [
  { name: "TypeScript", level: 95 },
  { name: "React and rendering", level: 92 },
  { name: "Design systems", level: 88 },
  { name: "Accessibility", level: 80 },
  { name: "WebGL and canvas", level: 70 },
];

const defaultEducation: ProfileResumeEducation[] = [
  { degree: "MSc Human-Computer Interaction", school: "KTH Royal Institute of Technology", period: "2015 to 2017" },
];

const css = `
@keyframes hb-ygb-line { from { transform: scaleY(0); } }
@keyframes hb-ygb-fill { from { transform: scaleX(0); } }
@keyframes hb-ygb-node {
  0% { transform: scale(0); }
  70% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
@keyframes hb-ygb-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ygb-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-ygb-accent) 50%, transparent); }
  100% { box-shadow: 0 0 0 10px transparent; }
}
.hb-ygb {
  --hb-ygb-accent: #f59e0b;
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
.hb-ygb *, .hb-ygb *::before, .hb-ygb *::after { box-sizing: border-box; }
.hb-ygb-in {
  display: grid;
  gap: 40px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 24px 96px;
}
@container (min-width: 860px) {
  .hb-ygb-in { grid-template-columns: 340px 1fr; gap: 64px; align-items: start; }
  .hb-ygb-aside { position: sticky; top: 24px; }
}
.hb-ygb-aside {
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background:
    radial-gradient(80% 50% at 0% 0%, color-mix(in srgb, var(--hb-ygb-accent) 12%, transparent), transparent 70%),
    linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: hb-ygb-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-ygb-id { display: flex; align-items: center; gap: 14px; }
.hb-ygb-av {
  display: grid;
  place-items: center;
  flex: none;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-ygb-accent) 80%, #fff), color-mix(in srgb, var(--hb-ygb-accent) 50%, #3b0a00));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  color: #1a1203;
  font-size: 21px;
  font-weight: 700;
}
.hb-ygb-name { margin: 0; font-size: 21px; font-weight: 650; letter-spacing: -0.02em; }
.hb-ygb-head { margin: 3px 0 0; color: #a1a1a1; font-size: 14px; }
.hb-ygb-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.hb-ygb-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: #a1a1a1;
  font-size: 12px;
}
.hb-ygb-avail { color: #4ade80; border-color: rgba(74, 222, 128, 0.25); }
.hb-ygb-avail i { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
.hb-ygb-summary { margin: 16px 0 0; color: #b4b4b4; font-size: 14px; line-height: 1.6; }
.hb-ygb-h { margin: 24px 0 12px; color: #6f6f6f; font-size: 11.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.hb-ygb-skills { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-ygb-skill-top { display: flex; justify-content: space-between; font-size: 13px; }
.hb-ygb-skill-top span:last-child { color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-ygb-bar { position: relative; height: 6px; margin-top: 7px; overflow: hidden; border-radius: 6px; background: rgba(255, 255, 255, 0.06); }
.hb-ygb-bar span {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 6px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ygb-accent) 45%, transparent), var(--hb-ygb-accent));
  transform-origin: left;
  animation: hb-ygb-fill 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-ygb-bar span::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px var(--hb-ygb-accent);
  opacity: 0.85;
}
.hb-ygb-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.hb-ygb-cv {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.15s ease;
}
.hb-ygb-cv:hover { background: #fff; transform: translateY(-1px); }
.hb-ygb-link {
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #ededed;
  font-size: 13.5px;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.hb-ygb-link:hover { border-color: rgba(255, 255, 255, 0.22); background: #151515; }
.hb-ygb-cv:focus-visible, .hb-ygb-link:focus-visible { outline: 2px solid var(--hb-ygb-accent); outline-offset: 2px; }
.hb-ygb-main-h { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 0 24px; }
.hb-ygb-main-h h3 { margin: 0; font-size: clamp(24px, 3.4cqw, 32px); font-weight: 650; letter-spacing: -0.035em; }
.hb-ygb-main-h span { color: #6f6f6f; font-size: 13px; }
.hb-ygb-tl { position: relative; display: grid; gap: 14px; margin: 0; padding: 0 0 0 30px; list-style: none; }
.hb-ygb-tl::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--hb-ygb-accent), rgba(255, 255, 255, 0.08) 70%);
  transform-origin: top;
  animation: hb-ygb-line 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-ygb-item {
  position: relative;
  padding: 20px 22px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  background: #101010;
  animation: hb-ygb-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.hb-ygb-item:hover { border-color: color-mix(in srgb, var(--hb-ygb-accent) 35%, transparent); background: #131210; }
.hb-ygb-node {
  position: absolute;
  left: -30px;
  top: 24px;
  width: 16px;
  height: 16px;
  border: 3px solid #0a0a0a;
  border-radius: 50%;
  background: #3a3a3a;
  animation: hb-ygb-node 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: inherit;
}
.hb-ygb-item[data-current="true"] .hb-ygb-node { background: var(--hb-ygb-accent); animation: hb-ygb-node 0.5s both, hb-ygb-pulse 1.8s 0.6s ease-out infinite; }
.hb-ygb-row { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 12px; }
.hb-ygb-role { margin: 0; font-size: 16.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-ygb-period { color: #8f8f8f; font-size: 13px; font-variant-numeric: tabular-nums; }
.hb-ygb-co { margin: 3px 0 0; color: color-mix(in srgb, var(--hb-ygb-accent) 70%, #fff); font-size: 13.5px; font-weight: 500; }
.hb-ygb-co span { color: #6f6f6f; font-weight: 400; }
.hb-ygb-points { display: grid; gap: 6px; margin: 12px 0 0; padding: 0; list-style: none; }
.hb-ygb-points li { position: relative; padding-left: 16px; color: #b4b4b4; font-size: 14px; line-height: 1.55; }
.hb-ygb-points li::before { content: ""; position: absolute; left: 0; top: 0.65em; width: 6px; height: 1px; background: #6f6f6f; }
.hb-ygb-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.hb-ygb-stack span { height: 24px; padding: 0 9px; border-radius: 6px; background: #1a1a1a; color: #a1a1a1; font-family: ui-monospace, "Geist Mono", Menlo, monospace; font-size: 11.5px; line-height: 24px; }
.hb-ygb-edu { display: grid; gap: 10px; margin: 32px 0 0; padding: 0; list-style: none; }
.hb-ygb-edu li { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px 12px; padding: 16px 18px; border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 16px; }
.hb-ygb-edu strong { display: block; font-size: 14.5px; font-weight: 600; }
.hb-ygb-edu small { display: block; margin-top: 2px; color: #8f8f8f; font-size: 13px; }
.hb-ygb-edu em { color: #6f6f6f; font-size: 13px; font-style: normal; }
@media (prefers-reduced-motion: reduce) {
  .hb-ygb-aside, .hb-ygb-bar span, .hb-ygb-tl::before, .hb-ygb-item, .hb-ygb-node, .hb-ygb-item[data-current="true"] .hb-ygb-node { animation: none; }
  .hb-ygb-item, .hb-ygb-cv, .hb-ygb-link { transition: none; }
}
`;

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export function ProfileResumeTimeline({
  name = "Rasmus Holt",
  headline = "Staff Frontend Engineer",
  location = "Copenhagen, Denmark",
  available = true,
  summary = "Eight years building fast, accessible interfaces for creative tools. I care about input latency, honest design systems and teams that ship on Fridays without fear.",
  roles = defaultRoles,
  skills = defaultSkills,
  education = defaultEducation,
  links = [{ label: "GitHub", href: "#github" }, { label: "Email", href: "mailto:rasmus@holt.dev" }],
  cv = { label: "Download CV", href: "#cv" },
  accent = "#f59e0b",
  className = "",
  style,
  ...rest
}: ProfileResumeTimelineProps) {
  return (
    <section className={`hb-ygb ${className}`} style={{ "--hb-ygb-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-profile-resume-timeline" precedence="default">{css}</style>
      <div className="hb-ygb-in">
        <aside className="hb-ygb-aside">
          <div className="hb-ygb-id">
            <span className="hb-ygb-av" aria-hidden="true">{initials(name)}</span>
            <div>
              <h2 className="hb-ygb-name">{name}</h2>
              <p className="hb-ygb-head">{headline}</p>
            </div>
          </div>
          <div className="hb-ygb-tags">
            {available && <span className="hb-ygb-tag hb-ygb-avail"><i aria-hidden="true" />Open to work</span>}
            <span className="hb-ygb-tag">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              {location}
            </span>
          </div>
          <p className="hb-ygb-summary">{summary}</p>
          <h3 className="hb-ygb-h">Skills</h3>
          <ul className="hb-ygb-skills">
            {skills.map((s, i) => (
              <li key={s.name}>
                <div className="hb-ygb-skill-top"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="hb-ygb-bar" role="meter" aria-label={s.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.level}>
                  <span style={{ width: `${Math.min(100, Math.max(0, s.level)).toFixed(0)}%`, animationDelay: `${(0.3 + i * 0.1).toFixed(2)}s` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="hb-ygb-actions">
            {cv && (
              <a className="hb-ygb-cv" href={cv.href}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
                {cv.label}
              </a>
            )}
            {links.map((l) => <a key={l.label} className="hb-ygb-link" href={l.href}>{l.label}</a>)}
          </div>
        </aside>
        <div>
          <div className="hb-ygb-main-h">
            <h3>Experience</h3>
            <span>{roles.length} roles</span>
          </div>
          <ol className="hb-ygb-tl">
            {roles.map((r, i) => (
              <li key={r.company + r.period} className="hb-ygb-item" data-current={r.current ? "true" : undefined} style={{ animationDelay: `${(0.15 + i * 0.15).toFixed(2)}s` }}>
                <span className="hb-ygb-node" aria-hidden="true" />
                <div className="hb-ygb-row">
                  <h4 className="hb-ygb-role">{r.role}</h4>
                  <span className="hb-ygb-period">{r.period}</span>
                </div>
                <p className="hb-ygb-co">{r.company} <span>· {r.location}</span></p>
                <ul className="hb-ygb-points">
                  {r.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                {r.stack && r.stack.length > 0 && (
                  <div className="hb-ygb-stack">{r.stack.map((s) => <span key={s}>{s}</span>)}</div>
                )}
              </li>
            ))}
          </ol>
          {education.length > 0 && (
            <ul className="hb-ygb-edu" aria-label="Education">
              {education.map((e) => (
                <li key={e.degree}>
                  <div>
                    <strong>{e.degree}</strong>
                    <small>{e.school}</small>
                  </div>
                  <em>{e.period}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

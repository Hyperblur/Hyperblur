"use client";

import * as React from "react";

export interface AboutStoryMilestone {
  year: string;
  title: string;
  text: string;
}

export interface AboutStoryFact {
  label: string;
  value: string;
}

export interface AboutStoryNote {
  text: string;
  name: string;
  role: string;
}

export interface AboutStoryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  statement?: string;
  highlight?: string;
  facts?: AboutStoryFact[];
  milestones?: AboutStoryMilestone[];
  note?: AboutStoryNote | null;
  accent?: string;
}

const css = `
.hb-kd8 {
  --hb-kd8-accent: #f5a524;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd8 *, .hb-kd8 *::before, .hb-kd8 *::after { box-sizing: border-box; }
.hb-kd8::before {
  content: "";
  position: absolute;
  right: -10%;
  top: -30%;
  width: 70%;
  height: 80%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kd8-accent) 12%, transparent), transparent);
  pointer-events: none;
}
.hb-kd8-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 32px 112px;
}
.hb-kd8-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  color: #8f8f8f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.hb-kd8-eyebrow::after { content: ""; flex: 1; max-width: 120px; height: 1px; background: rgba(255, 255, 255, .14); }
.hb-kd8-statement {
  margin: 28px 0 0;
  max-width: 980px;
  font-family: var(--font-serif, ui-serif, Georgia, "Times New Roman", serif);
  font-size: clamp(34px, 6.2cqi, 74px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -.02em;
  color: #f4f1ea;
  text-wrap: balance;
}
.hb-kd8-hl {
  font-style: italic;
  color: var(--hb-kd8-accent);
  background: linear-gradient(90deg, var(--hb-kd8-accent), color-mix(in srgb, var(--hb-kd8-accent) 55%, #fff));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hb-kd8-facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 48px 0 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, .08);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}
.hb-kd8-fact { padding: 20px 20px 20px 0; }
.hb-kd8-fact + .hb-kd8-fact { padding-left: 20px; border-left: 1px solid rgba(255, 255, 255, .08); }
.hb-kd8-fact dt { color: #8f8f8f; font-size: 12.5px; }
.hb-kd8-fact dd { margin: 6px 0 0; font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-kd8-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: start;
  margin-top: 64px;
}
.hb-kd8-tlwrap { position: relative; padding-left: 40px; }
.hb-kd8-tl { margin: 0; padding: 0; list-style: none; }
.hb-kd8-track, .hb-kd8-fill {
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  border-radius: 2px;
}
.hb-kd8-track { background: rgba(255, 255, 255, .08); }
.hb-kd8-fill {
  background: linear-gradient(180deg, var(--hb-kd8-accent), color-mix(in srgb, var(--hb-kd8-accent) 30%, transparent));
  box-shadow: 0 0 14px color-mix(in srgb, var(--hb-kd8-accent) 60%, transparent);
  transform-origin: top;
  transform: scaleY(1);
  transition: transform 1.8s cubic-bezier(.5, 0, .2, 1);
}
.hb-kd8-step { position: relative; padding-bottom: 36px; }
.hb-kd8-step:last-child { padding-bottom: 0; }
.hb-kd8-dot {
  position: absolute;
  left: -40px;
  top: 2px;
  width: 16px;
  height: 16px;
  border: 2px solid var(--hb-kd8-accent);
  border-radius: 50%;
  background: #0a0a0a;
  transition: transform .5s cubic-bezier(.3, 1.6, .5, 1), background-color .4s ease;
  transition-delay: var(--hb-kd8-d, 0s);
}
.hb-kd8-step[data-now="true"] .hb-kd8-dot { background: var(--hb-kd8-accent); }
.hb-kd8-step[data-now="true"] .hb-kd8-dot::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid var(--hb-kd8-accent);
  animation: hb-kd8-pulse 2.4s ease-out infinite;
}
@keyframes hb-kd8-pulse { from { transform: scale(.6); opacity: .9; } to { transform: scale(1.6); opacity: 0; } }
.hb-kd8-body { transition: opacity .6s ease, transform .7s cubic-bezier(.2, .8, .2, 1); transition-delay: var(--hb-kd8-d, 0s); }
.hb-kd8-year {
  display: inline-block;
  color: var(--hb-kd8-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: .04em;
}
.hb-kd8-step-title { margin: 6px 0 0; font-size: 19px; font-weight: 600; letter-spacing: -.015em; }
.hb-kd8-step-text { margin: 8px 0 0; max-width: 520px; color: #9a9a9a; font-size: 15px; line-height: 1.6; }
.hb-kd8[data-armed="true"] .hb-kd8-fill { transform: scaleY(0); }
.hb-kd8[data-armed="true"] .hb-kd8-dot { transform: scale(0); }
.hb-kd8[data-armed="true"] .hb-kd8-body { opacity: 0; transform: translate3d(0, 12px, 0); }
.hb-kd8[data-armed="true"][data-inview="true"] .hb-kd8-fill { transform: scaleY(1); }
.hb-kd8[data-armed="true"][data-inview="true"] .hb-kd8-dot { transform: scale(1); }
.hb-kd8[data-armed="true"][data-inview="true"] .hb-kd8-body { opacity: 1; transform: none; }
.hb-kd8-note {
  position: sticky;
  top: 32px;
  margin: 0;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 24px;
  background:
    radial-gradient(90% 60% at 100% 0%, color-mix(in srgb, var(--hb-kd8-accent) 12%, transparent), transparent 70%),
    linear-gradient(180deg, #151413, #0f0f0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 60px -30px rgba(0, 0, 0, .8);
}
.hb-kd8-note-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #a1a1a1;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-kd8-note-label svg { width: 14px; height: 14px; color: var(--hb-kd8-accent); }
.hb-kd8-note-text {
  margin: 18px 0 0;
  color: #e4e1da;
  font-family: var(--font-serif, ui-serif, Georgia, serif);
  font-size: clamp(20px, 2.3cqi, 25px);
  line-height: 1.35;
}
.hb-kd8-sign {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px dashed rgba(255, 255, 255, .12);
}
.hb-kd8-av {
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hb-kd8-accent), #e8366d);
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 700;
}
.hb-kd8-name {
  display: block;
  color: #f4f1ea;
  font-family: var(--font-serif, ui-serif, Georgia, serif);
  font-size: 24px;
  font-style: italic;
  line-height: 1.1;
}
.hb-kd8-role { display: block; margin-top: 3px; color: #8f8f8f; font-size: 13px; }
@container (max-width: 860px) {
  .hb-kd8-grid { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .hb-kd8-note { position: static; }
  .hb-kd8-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-kd8-fact:nth-child(3) { padding-left: 0; border-left: 0; }
  .hb-kd8-fact:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, .08); }
}
@container (max-width: 520px) {
  .hb-kd8-in { padding: 72px 20px 80px; }
  .hb-kd8-facts { margin-top: 36px; }
  .hb-kd8-fact dd { font-size: 17px; }
  .hb-kd8-grid { margin-top: 48px; }
  .hb-kd8-tlwrap { padding-left: 32px; }
  .hb-kd8-dot { left: -32px; }
  .hb-kd8-note { padding: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd8-fill, .hb-kd8-dot, .hb-kd8-body { transition: none !important; }
  .hb-kd8-step[data-now="true"] .hb-kd8-dot::after { animation: none; }
}
`;

const defaultMilestones: AboutStoryMilestone[] = [
  { year: "2019", title: "A spreadsheet that got out of hand", text: "Two operations leads at a Lisbon logistics firm build a shared tracker to stop losing shipments between email threads." },
  { year: "2020", title: "First 100 customers", text: "Word spreads between freight forwarders. We quit our jobs, raise a small angel round and ship the first real version." },
  { year: "2022", title: "Series A and a second home", text: "We open an office in Toronto to be closer to North American carriers and grow the team to 30 people." },
  { year: "2024", title: "One million shipments a month", text: "Carriers in 41 countries now run their daily dispatch on Harbor, from two-truck family firms to national fleets." },
  { year: "Today", title: "Building the operating system for freight", text: "64 people, profitable, and still answering support tickets ourselves every Friday afternoon." },
];

const defaultFacts: AboutStoryFact[] = [
  { label: "Founded", value: "2019, Lisbon" },
  { label: "Team", value: "64 people" },
  { label: "Countries served", value: "41" },
  { label: "Shipments tracked", value: "1.2M a month" },
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function renderStatement(statement: string, highlight?: string) {
  if (!highlight) return statement;
  const at = statement.indexOf(highlight);
  if (at === -1) return statement;
  return (
    <>
      {statement.slice(0, at)}
      <em className="hb-kd8-hl">{highlight}</em>
      {statement.slice(at + highlight.length)}
    </>
  );
}

export function AboutStory({
  eyebrow = "Our story",
  statement = "We started Harbor because moving freight should feel as simple as sending an email, and for most of the world it still does not.",
  highlight = "as simple as sending an email",
  facts = defaultFacts,
  milestones = defaultMilestones,
  note = {
    text: "We are not trying to be the biggest company in logistics. We want to be the one dispatchers trust at 6am, when a truck is late and the phone will not stop ringing.",
    name: "Beatriz Couto",
    role: "Co-founder and CEO",
  },
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: AboutStoryProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const timeline = timelineRef.current;
    if (!root || !timeline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    root.dataset.armed = "true";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          root.dataset.inview = "true";
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(timeline);
    return () => {
      io.disconnect();
      delete root.dataset.armed;
      delete root.dataset.inview;
    };
  }, []);

  const vars = { "--hb-kd8-accent": accent, ...style } as React.CSSProperties;
  const step = milestones.length > 1 ? 1.6 / (milestones.length - 1) : 0;

  return (
    <section ref={rootRef} className={`hb-kd8 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-about-story" precedence="default">{css}</style>
      <div className="hb-kd8-in">
        {eyebrow && <p className="hb-kd8-eyebrow">{eyebrow}</p>}
        <h2 id={`${uid}-t`} className="hb-kd8-statement">{renderStatement(statement, highlight)}</h2>
        {facts.length > 0 && (
          <dl className="hb-kd8-facts">
            {facts.map((fact) => (
              <div key={fact.label} className="hb-kd8-fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="hb-kd8-grid">
          <div ref={timelineRef} className="hb-kd8-tlwrap">
            <span className="hb-kd8-track" aria-hidden="true" />
            <span className="hb-kd8-fill" aria-hidden="true" />
            <ol className="hb-kd8-tl" aria-label="Milestones">
              {milestones.map((m, i) => (
                <li
                  key={`${m.year}-${i}`}
                  className="hb-kd8-step"
                  data-now={i === milestones.length - 1 ? "true" : "false"}
                  style={{ "--hb-kd8-d": `${(0.15 + i * step).toFixed(2)}s` } as React.CSSProperties}
                >
                  <span className="hb-kd8-dot" aria-hidden="true" />
                  <div className="hb-kd8-body">
                    <span className="hb-kd8-year">{m.year}</span>
                    <h3 className="hb-kd8-step-title">{m.title}</h3>
                    <p className="hb-kd8-step-text">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {note && (
            <figure className="hb-kd8-note">
              <span className="hb-kd8-note-label">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.5 2.5l3 3L6 13H3v-3l7.5-7.5z" />
                </svg>
                A note from the founder
              </span>
              <blockquote className="hb-kd8-note-text">{note.text}</blockquote>
              <figcaption className="hb-kd8-sign">
                <span className="hb-kd8-av" aria-hidden="true">{initialsOf(note.name)}</span>
                <span>
                  <cite className="hb-kd8-name">{note.name}</cite>
                  <span className="hb-kd8-role">{note.role}</span>
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

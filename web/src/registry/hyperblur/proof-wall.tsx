"use client";

import * as React from "react";

export interface ProofWallItem {
  quote: string;
  name: string;
  role: string;
  company?: string;
  rating?: number;
  featured?: boolean;
}

export interface ProofWallLink {
  label: string;
  href: string;
}

export interface ProofWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  testimonials?: ProofWallItem[];
  score?: string;
  cta?: ProofWallLink | null;
  accent?: string;
  duration?: number;
  height?: number;
}

const css = `
.hb-kd1 {
  --hb-kd1-accent: #8b5cf6;
  --hb-kd1-dur: 40s;
  --hb-kd1-h: 640px;
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
.hb-kd1 *, .hb-kd1 *::before, .hb-kd1 *::after { box-sizing: border-box; }
.hb-kd1::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 520px;
  background:
    radial-gradient(60% 70% at 50% 0%, color-mix(in srgb, var(--hb-kd1-accent) 16%, transparent), transparent 70%),
    radial-gradient(40% 40% at 85% 10%, rgba(255, 255, 255, .04), transparent 70%);
  pointer-events: none;
}
.hb-kd1-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px 96px;
}
.hb-kd1-head {
  max-width: 640px;
  margin: 0 auto 48px;
  text-align: center;
}
.hb-kd1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 8px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #c9c9c9;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .01em;
}
.hb-kd1-eyebrow svg { width: 14px; height: 14px; color: var(--hb-kd1-accent); }
.hb-kd1-title {
  margin: 18px 0 0;
  font-size: clamp(30px, 5cqi, 48px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-kd1-sub {
  margin: 16px auto 0;
  max-width: 520px;
  color: #8f8f8f;
  font-size: clamp(15px, 1.6cqi, 17px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kd1-wall {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  height: var(--hb-kd1-h);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 14%, #000 86%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0, #000 14%, #000 86%, transparent 100%);
}
.hb-kd1-col { min-width: 0; }
.hb-kd1-track {
  display: flex;
  flex-direction: column;
  gap: 16px;
  will-change: transform;
}
.hb-kd1-col[data-drift="up"] .hb-kd1-track { animation: hb-kd1-up var(--hb-kd1-dur) linear infinite; }
.hb-kd1-col[data-drift="down"] .hb-kd1-track { animation: hb-kd1-down calc(var(--hb-kd1-dur) * 1.18) linear infinite; }
.hb-kd1-col[data-drift="none"] { padding-top: 72px; }
.hb-kd1-wall:hover .hb-kd1-track,
.hb-kd1-wall:focus-within .hb-kd1-track { animation-play-state: paused; }
.hb-kd1-set { display: flex; flex-direction: column; gap: 16px; }
@keyframes hb-kd1-up {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, calc(-50% - 8px), 0); }
}
@keyframes hb-kd1-down {
  from { transform: translate3d(0, calc(-50% - 8px), 0); }
  to { transform: translate3d(0, 0, 0); }
}
.hb-kd1-card {
  position: relative;
  margin: 0;
  padding: 22px 22px 20px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 18px;
  background: linear-gradient(180deg, #141414, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 1px 2px rgba(0, 0, 0, .4);
  transition: border-color .3s ease, transform .4s cubic-bezier(.2, .8, .2, 1), background-color .3s ease;
}
.hb-kd1-card:hover {
  border-color: color-mix(in srgb, var(--hb-kd1-accent) 45%, rgba(255, 255, 255, .08));
  transform: translate3d(0, -2px, 0);
}
.hb-kd1-card[data-featured="true"] {
  border-color: color-mix(in srgb, var(--hb-kd1-accent) 38%, transparent);
  background:
    radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--hb-kd1-accent) 18%, transparent), transparent 60%),
    linear-gradient(180deg, #151418, #0f0f12);
}
.hb-kd1-stars { display: flex; gap: 2px; margin-bottom: 14px; color: var(--hb-kd1-accent); }
.hb-kd1-stars svg { width: 14px; height: 14px; }
.hb-kd1-stars svg[data-on="false"] { color: rgba(255, 255, 255, .14); }
.hb-kd1-quote {
  margin: 0;
  color: #d6d6d6;
  font-size: 15px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kd1-card[data-featured="true"] .hb-kd1-quote { color: #f2f2f2; font-size: 16.5px; line-height: 1.55; }
.hb-kd1-who {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, .06);
}
.hb-kd1-av {
  display: grid;
  flex: none;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .18);
}
.hb-kd1-name { display: block; font-size: 14px; font-weight: 600; color: #ededed; font-style: normal; }
.hb-kd1-role { display: block; margin-top: 2px; font-size: 12.5px; color: #8f8f8f; }
.hb-kd1-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 20px;
  margin-top: 36px;
  color: #8f8f8f;
  font-size: 14px;
}
.hb-kd1-score { display: inline-flex; align-items: center; gap: 8px; }
.hb-kd1-score .hb-kd1-stars { margin: 0; }
.hb-kd1-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease;
}
.hb-kd1-link:hover { border-color: color-mix(in srgb, var(--hb-kd1-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-kd1-accent) 12%, transparent); }
.hb-kd1-link:focus-visible { outline: 2px solid var(--hb-kd1-accent); outline-offset: 3px; }
.hb-kd1-link svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kd1-link:hover svg { transform: translate3d(3px, 0, 0); }
@container (max-width: 820px) {
  .hb-kd1-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-kd1-col[data-slot="1"] { display: none; }
}
@container (max-width: 540px) {
  .hb-kd1-in { padding: 64px 16px 72px; }
  .hb-kd1-head { margin-bottom: 32px; }
  .hb-kd1-wall { grid-template-columns: minmax(0, 1fr); height: calc(var(--hb-kd1-h) * .85); }
  .hb-kd1-col[data-slot="2"] { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd1-col .hb-kd1-track { animation: none !important; }
  .hb-kd1-card, .hb-kd1-link, .hb-kd1-link svg { transition: none; }
  .hb-kd1-card:hover { transform: none; }
}
`;

const defaultTestimonials: ProofWallItem[] = [
  { quote: "We replaced three internal tools with Lumen in a week. Our release notes now write themselves from merged pull requests.", name: "Maya Okafor", role: "Staff Engineer", company: "Fernhill", rating: 5 },
  { quote: "The first tool our designers and engineers both open every morning without being asked.", name: "Daniel Brandt", role: "Head of Product", company: "Quartzline", rating: 5 },
  { quote: "Support answered a schema question at 11pm on a Sunday, with a code sample. That alone sold the team.", name: "Priya Raman", role: "CTO", company: "Kestrel Labs", rating: 5 },
  { quote: "Onboarding a new engineer used to take two weeks of tribal knowledge. With Lumen the context is already there, linked to every decision we made.", name: "Lucas Moreau", role: "Engineering Manager", company: "Obelisk", rating: 5, featured: true },
  { quote: "Cycle time dropped from nine days to four. I did not believe the dashboard until finance confirmed it.", name: "Hana Ito", role: "VP Engineering", company: "Halcyon", rating: 5 },
  { quote: "It feels like it was built by people who actually ship software on Fridays.", name: "Tomás Villar", role: "Founder", company: "Driftwood", rating: 5 },
  { quote: "We rolled it out to 140 engineers across four time zones and nobody asked for training. The defaults are just right.", name: "Grace Liu", role: "Platform Lead", company: "Parallax", rating: 5 },
  { quote: "Clean API, honest pricing, and a changelog that reads like a letter from a friend.", name: "Noah Fischer", role: "Senior Developer", company: "Sable", rating: 4 },
  { quote: "Our incident reviews went from blame sessions to twenty-minute walkthroughs. The timeline view is the best I have used.", name: "Amara Diallo", role: "SRE Manager", company: "Northwind", rating: 5 },
];

const palettes = [
  ["#8b5cf6", "#ec4899"],
  ["#2f7bff", "#22d3ee"],
  ["#f59e0b", "#ef4444"],
  ["#10b981", "#2f7bff"],
  ["#f43f5e", "#8b5cf6"],
  ["#06b6d4", "#10b981"],
  ["#eab308", "#f97316"],
  ["#6366f1", "#14b8a6"],
];

function hashOf(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Star({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" data-on={on} aria-hidden="true">
      <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z" />
    </svg>
  );
}

function Card({ item }: { item: ProofWallItem }) {
  const rating = Math.max(0, Math.min(5, Math.round(item.rating ?? 5)));
  const [a, b] = palettes[hashOf(item.name) % palettes.length];
  return (
    <figure className="hb-kd1-card" data-featured={item.featured ? "true" : "false"}>
      <div className="hb-kd1-stars" role="img" aria-label={`${rating} out of 5 stars`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} on={i < rating} />
        ))}
      </div>
      <blockquote className="hb-kd1-quote">{item.quote}</blockquote>
      <figcaption className="hb-kd1-who">
        <span className="hb-kd1-av" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} aria-hidden="true">
          {initialsOf(item.name)}
        </span>
        <span>
          <cite className="hb-kd1-name">{item.name}</cite>
          <span className="hb-kd1-role">
            {item.role}
            {item.company ? `, ${item.company}` : ""}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ProofWall({
  eyebrow = "Wall of love",
  title = "Loved by teams who ship every week",
  subtitle = "Over 3,800 engineering teams run their releases on Lumen. Here is what a few of them had to say.",
  testimonials = defaultTestimonials,
  score = "4.9 average across G2, Capterra and the App Store",
  cta = { label: "Read all 1,240 reviews", href: "#reviews" },
  accent = "#8b5cf6",
  duration = 40,
  height = 640,
  className = "",
  style,
  ...rest
}: ProofWallProps) {
  const uid = React.useId();
  const columns: ProofWallItem[][] = [[], [], []];
  testimonials.forEach((item, i) => columns[i % 3].push(item));
  const drift = ["up", "none", "down"] as const;
  const vars = {
    "--hb-kd1-accent": accent,
    "--hb-kd1-dur": `${Math.max(8, duration)}s`,
    "--hb-kd1-h": `${Math.max(320, height)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-kd1 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-wall" precedence="default">{css}</style>
      <div className="hb-kd1-in">
        <header className="hb-kd1-head">
          {eyebrow && (
            <span className="hb-kd1-eyebrow">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 14.2s-5.6-3.4-5.6-7.6A3.1 3.1 0 0 1 8 4.7a3.1 3.1 0 0 1 5.6 1.9c0 4.2-5.6 7.6-5.6 7.6z" />
              </svg>
              {eyebrow}
            </span>
          )}
          <h2 id={`${uid}-t`} className="hb-kd1-title">{title}</h2>
          {subtitle && <p className="hb-kd1-sub">{subtitle}</p>}
        </header>
        <div className="hb-kd1-wall">
          {columns.map((list, c) => {
            const mode = list.length > 0 && c !== 1 ? drift[c] : "none";
            return (
              <div key={c} className="hb-kd1-col" data-slot={c} data-drift={mode}>
                <div className="hb-kd1-track">
                  <div className="hb-kd1-set">
                    {list.map((item, i) => (
                      <Card key={`${item.name}-${i}`} item={item} />
                    ))}
                  </div>
                  {mode !== "none" && (
                    <div className="hb-kd1-set" aria-hidden="true" inert>
                      {list.map((item, i) => (
                        <Card key={`${item.name}-copy-${i}`} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {(score || cta) && (
          <div className="hb-kd1-foot">
            {score && (
              <span className="hb-kd1-score">
                <span className="hb-kd1-stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} on />
                  ))}
                </span>
                {score}
              </span>
            )}
            {cta && (
              <a className="hb-kd1-link" href={cta.href}>
                {cta.label}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

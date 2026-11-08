"use client";

import * as React from "react";

export interface TiltedWallReview {
  quote: string;
  name: string;
  role: string;
  highlight?: string;
  rating?: number;
}

export interface ProofTiltedWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  score?: string;
  scoreNote?: string;
  reviews?: TiltedWallReview[];
  cta?: { label: string; href: string } | null;
  columns?: number;
  speed?: number;
  accent?: string;
}

const css = `
.hb-wb1 {
  --hb-wb1-accent: #8b5cf6;
  --hb-wb1-speed: 46s;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb1 *, .hb-wb1 *::before, .hb-wb1 *::after { box-sizing: border-box; }
.hb-wb1::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto 30%;
  height: 90%;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--hb-wb1-accent) 26%, transparent), transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}
.hb-wb1-wrap {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: 32px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 96px 24px;
}
.hb-wb1-copy { position: relative; z-index: 2; max-width: 440px; }
.hb-wb1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  color: #a1a1a1;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-wb1-eyebrow i {
  width: 18px;
  height: 1px;
  background: var(--hb-wb1-accent);
  box-shadow: 0 0 10px var(--hb-wb1-accent);
}
.hb-wb1-title {
  margin: 0;
  font-size: clamp(32px, 4.6cqw, 52px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-wb1-sub { margin: 18px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-wb1-score {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .015));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-wb1-score b { font-size: 34px; font-weight: 600; letter-spacing: -.04em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-wb1-score span { display: block; color: #8f8f8f; font-size: 13px; line-height: 1.45; }
.hb-wb1-stars { display: flex; gap: 2px; margin-bottom: 3px; color: var(--hb-wb1-accent); }
.hb-wb1-stars svg { width: 13px; height: 13px; }
.hb-wb1-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  padding-bottom: 3px;
  transition: border-color .3s ease, gap .3s cubic-bezier(.2, .8, .2, 1);
}
.hb-wb1-cta:hover { border-color: var(--hb-wb1-accent); gap: 12px; }
.hb-wb1-cta:focus-visible { outline: 2px solid var(--hb-wb1-accent); outline-offset: 4px; border-radius: 2px; }
.hb-wb1-stage {
  position: relative;
  height: 620px;
  margin: -96px -24px -96px 0;
  perspective: 1400px;
  -webkit-mask: linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent), linear-gradient(90deg, transparent, #000 14%);
  -webkit-mask-composite: source-in;
  mask: linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent), linear-gradient(90deg, transparent, #000 14%);
  mask-composite: intersect;
}
.hb-wb1-sr { position: absolute; width: 1px; height: 1px; margin: 0; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-wb1-plane {
  position: absolute;
  top: -30%;
  left: 2%;
  width: 118%;
  height: 160%;
  display: grid;
  grid-template-columns: repeat(var(--hb-wb1-cols, 4), minmax(0, 1fr));
  gap: 14px;
  transform: rotateX(34deg) rotateY(-6deg) rotateZ(-18deg);
  transform-style: preserve-3d;
  transform-origin: 40% 50%;
}
.hb-wb1-col { position: relative; overflow: hidden; min-width: 0; }
.hb-wb1-track {
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: hb-wb1-up var(--hb-wb1-speed) linear infinite;
  will-change: transform;
}
.hb-wb1-col:nth-child(even) .hb-wb1-track { animation-name: hb-wb1-down; animation-duration: calc(var(--hb-wb1-speed) * 1.18); }
.hb-wb1-col:nth-child(3) .hb-wb1-track { animation-duration: calc(var(--hb-wb1-speed) * .86); }
.hb-wb1-stage:hover .hb-wb1-track { animation-play-state: paused; }
.hb-wb1-card {
  position: relative;
  padding: 18px 18px 16px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 16px;
  background: linear-gradient(180deg, #161616, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 24px 40px -24px rgba(0, 0, 0, .9);
  transition: border-color .4s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
}
.hb-wb1-card:hover { border-color: color-mix(in srgb, var(--hb-wb1-accent) 50%, transparent); transform: translateZ(18px); }
.hb-wb1-card .hb-wb1-stars svg { width: 11px; height: 11px; }
.hb-wb1-q { margin: 10px 0 14px; color: #d4d4d4; font-size: 13.5px; line-height: 1.55; }
.hb-wb1-q mark {
  color: #fff;
  background: linear-gradient(transparent 62%, color-mix(in srgb, var(--hb-wb1-accent) 42%, transparent) 62%);
}
.hb-wb1-who { display: flex; align-items: center; gap: 10px; }
.hb-wb1-av {
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25);
}
.hb-wb1-who b { display: block; font-size: 12.5px; font-weight: 600; }
.hb-wb1-who small { display: block; color: #8f8f8f; font-size: 11.5px; }
@keyframes hb-wb1-up { from { transform: translateY(0); } to { transform: translateY(calc(-50% - 7px)); } }
@keyframes hb-wb1-down { from { transform: translateY(calc(-50% - 7px)); } to { transform: translateY(0); } }
@container (max-width: 860px) {
  .hb-wb1-wrap { grid-template-columns: minmax(0, 1fr); padding: 72px 20px 0; gap: 8px; }
  .hb-wb1-copy { max-width: 560px; }
  .hb-wb1-stage { height: 460px; margin: 0 -20px; }
  .hb-wb1-plane { --hb-wb1-cols: 3; left: -6%; width: 116%; }
  .hb-wb1-col:nth-child(n+4) { display: none; }
}
@container (max-width: 480px) {
  .hb-wb1-plane { --hb-wb1-cols: 2; width: 130%; left: -12%; }
  .hb-wb1-col:nth-child(n+3) { display: none; }
  .hb-wb1-stage { height: 400px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb1-track { animation: none; }
  .hb-wb1-card, .hb-wb1-cta { transition: none; }
  .hb-wb1-card:hover { transform: none; }
}
`;

const palette = [
  ["#8b5cf6", "#4c1d95"],
  ["#f97316", "#9a3412"],
  ["#10b981", "#065f46"],
  ["#06b6d4", "#155e75"],
  ["#f43f5e", "#9f1239"],
  ["#eab308", "#854d0e"],
];

const defaultReviews: TiltedWallReview[] = [
  { quote: "We moved 40 services over in a weekend. The migration guide was better than our own docs.", highlight: "40 services over in a weekend", name: "Priya Raman", role: "Staff engineer, Lumen Freight" },
  { quote: "Preview links on every pull request changed how design reviews happen here.", highlight: "Preview links on every pull request", name: "Tom Alder", role: "Design lead, Pinecrest" },
  { quote: "Our p95 dropped from 840ms to 190ms without touching application code.", highlight: "840ms to 190ms", name: "Keiko Mori", role: "CTO, Halden Pay" },
  { quote: "The bill went down and the on-call rotation got quiet. Rare combination.", highlight: "on-call rotation got quiet", name: "Marcus Bell", role: "SRE, Northfold" },
  { quote: "Rollbacks take one click. I stopped dreading Friday deploys.", highlight: "Rollbacks take one click", name: "Ana Souza", role: "Platform, Copperline" },
  { quote: "Support answered a routing question at 2am with a working config attached.", highlight: "at 2am with a working config", name: "Felix Brandt", role: "Founder, Tiller Labs" },
  { quote: "Logs, traces and deploys in one timeline. Incidents read like a story now.", highlight: "Incidents read like a story", name: "Grace Okafor", role: "Eng manager, Brightwell" },
  { quote: "We cut our infrastructure repo from 12,000 lines to about 300.", highlight: "12,000 lines to about 300", name: "Daniel Cho", role: "Lead dev, Orchard Health" },
  { quote: "New hires ship to production on day one. That used to take three weeks.", highlight: "ship to production on day one", name: "Sofia Lind", role: "VP Engineering, Kestrel" },
  { quote: "Edge caching alone paid for the whole plan in the first month.", highlight: "paid for the whole plan", name: "Omar Haddad", role: "Head of web, Saltmarsh" },
  { quote: "It feels like the platform team we could never afford to hire.", highlight: "the platform team we could never afford", name: "Lena Fischer", role: "CTO, Wayfare" },
  { quote: "Branch databases made our test suite honest for the first time.", highlight: "Branch databases", name: "Jonah Reyes", role: "Backend, Quillstack" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  return x;
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path fill="currentColor" d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z" />
    </svg>
  );
}

function Quote({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const at = text.indexOf(highlight);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark>{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  );
}

export function ProofTiltedWall({
  eyebrow = "Wall of love",
  title = "Teams ship faster the week they switch",
  subtitle = "Twelve thousand engineering teams run production on Vantage. Here is what a few of them told us, unedited.",
  score = "4.9",
  scoreNote = "Average from 2,180 verified reviews across three review sites",
  reviews = defaultReviews,
  cta = { label: "Read all customer stories", href: "#stories" },
  columns = 4,
  speed = 46,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: ProofTiltedWallProps) {
  const uid = React.useId();
  const cols = Math.max(2, Math.min(columns, 5));
  const lanes = Array.from({ length: cols }, (_, c) => reviews.filter((_, i) => i % cols === c));
  const vars = {
    "--hb-wb1-accent": accent,
    "--hb-wb1-speed": `${Math.max(speed, 8)}s`,
    "--hb-wb1-cols": cols,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-wb1 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-tilted-wall" precedence="default">{css}</style>
      <div className="hb-wb1-wrap">
        <div className="hb-wb1-copy">
          {eyebrow && (
            <p className="hb-wb1-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id={`${uid}-t`} className="hb-wb1-title">{title}</h2>
          {subtitle && <p className="hb-wb1-sub">{subtitle}</p>}
          {score && (
            <div className="hb-wb1-score">
              <b>{score}</b>
              <div>
                <div className="hb-wb1-stars" aria-label={`${score} out of 5`}>
                  {[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}
                </div>
                <span>{scoreNote}</span>
              </div>
            </div>
          )}
          {cta && (
            <a className="hb-wb1-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
        <div className="hb-wb1-stage">
          <ul className="hb-wb1-sr">
            {reviews.map((r, i) => (
              <li key={i}>{`${r.quote} ${r.name}, ${r.role}`}</li>
            ))}
          </ul>
          <div className="hb-wb1-plane" aria-hidden="true">
            {lanes.map((lane, c) => (
              <div key={c} className="hb-wb1-col">
                <div className="hb-wb1-track">
                  {[...lane, ...lane].map((r, i) => {
                    const idx = reviews.indexOf(r);
                    const [a, b] = palette[hash(idx) % palette.length];
                    const stars = Math.round(r.rating ?? 5);
                    return (
                      <article key={`${c}-${i}`} className="hb-wb1-card">
                        <div className="hb-wb1-stars">
                          {Array.from({ length: stars }, (_, k) => <Star key={k} />)}
                        </div>
                        <p className="hb-wb1-q"><Quote text={r.quote} highlight={r.highlight} /></p>
                        <div className="hb-wb1-who">
                          <span className="hb-wb1-av" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>{initials(r.name)}</span>
                          <div>
                            <b>{r.name}</b>
                            <small>{r.role}</small>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

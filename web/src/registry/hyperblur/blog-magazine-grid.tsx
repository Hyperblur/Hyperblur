"use client";

import * as React from "react";

export interface MagazineStory {
  kicker: string;
  title: string;
  dek?: string;
  author: string;
  minutes: number;
  hue: number;
  href: string;
}

export interface MagazineBrief {
  label: string;
  title: string;
  href: string;
}

export interface BlogMagazineGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  masthead?: string;
  issue?: string;
  dateline?: string;
  sections?: string[];
  lead?: MagazineStory;
  stories?: MagazineStory[];
  mostRead?: MagazineBrief[];
  quote?: { text: string; by: string; role: string };
  briefs?: MagazineBrief[];
  accent?: string;
  onStoryClick?: (title: string) => void;
}

const defaultLead: MagazineStory = {
  kicker: "Cover story",
  title: "The quiet return of the four-day week",
  dek: "Eighteen companies tried it in 2025. Fourteen kept it. We spent a month inside three of them to find out what changed, and what nobody tells you before you start.",
  author: "Amara Osei",
  minutes: 16,
  hue: 18,
  href: "#",
};

const defaultStories: MagazineStory[] = [
  { kicker: "Markets", title: "Why mid-size logistics firms are buying their own chips", author: "Daniel Kowalski", minutes: 7, hue: 210, href: "#" },
  { kicker: "Cities", title: "Rotterdam's floating offices, three winters later", author: "Inés Calderón", minutes: 9, hue: 160, href: "#" },
];

const defaultMostRead: MagazineBrief[] = [
  { label: "Work", title: "Managers who block calendars get promoted faster", href: "#" },
  { label: "Money", title: "The real cost of a free trial", href: "#" },
  { label: "Tech", title: "Inside the smallest data center in Europe", href: "#" },
  { label: "Design", title: "Why every bank app now looks the same", href: "#" },
  { label: "Health", title: "Standing desks, ten years on", href: "#" },
];

const defaultBriefs: MagazineBrief[] = [
  { label: "Briefing", title: "Freight rates fall for a third month", href: "#" },
  { label: "Data", title: "Remote job posts steady at 21%", href: "#" },
  { label: "Policy", title: "New EU rules for app subscriptions", href: "#" },
  { label: "People", title: "A founder who hires only apprentices", href: "#" },
];

const css = `
.hb-we10 {
  --hb-we10-accent: #e0391b;
  --hb-we10-ink: #151412;
  --hb-we10-rule: rgba(21,20,18,.16);
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f4f0e6;
  color: var(--hb-we10-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we10 *, .hb-we10 *::before, .hb-we10 *::after { box-sizing: border-box; }
.hb-we10 em, .hb-we10 i, .hb-we10 cite { font-style: normal; }
.hb-we10-inner { max-width: 1120px; margin: 0 auto; padding: clamp(48px, 7cqi, 96px) clamp(18px, 4cqi, 40px); }
.hb-we10-mast { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 16px; padding-bottom: 14px; border-bottom: 3px solid var(--hb-we10-ink); }
.hb-we10-mi { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: #5f5a50; }
.hb-we10-mi:last-child { text-align: right; }
.hb-we10-name { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(36px, 8cqi, 92px); font-weight: 700; line-height: .86; letter-spacing: -.055em; text-align: center; text-transform: uppercase; }
.hb-we10-name span { color: var(--hb-we10-accent); }
.hb-we10-nav { display: flex; gap: clamp(14px, 2.6cqi, 28px); padding: 10px 0; border-bottom: 1px solid var(--hb-we10-ink); overflow-x: auto; scrollbar-width: none; }
.hb-we10-nav::-webkit-scrollbar { display: none; }
.hb-we10-nav a { position: relative; flex: none; color: var(--hb-we10-ink); font-size: 13px; font-weight: 600; text-decoration: none; letter-spacing: .01em; }
.hb-we10-nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -11px; height: 3px; background: var(--hb-we10-accent); transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
.hb-we10-nav a:hover::after, .hb-we10-nav a[aria-current="page"]::after { transform: scaleX(1); }
.hb-we10-nav a:focus-visible { outline: 2px solid var(--hb-we10-accent); outline-offset: 3px; }
.hb-we10-grid { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: clamp(16px, 2.4cqi, 28px); row-gap: 24px; padding-top: 24px; }
.hb-we10-cell { position: relative; min-width: 0; opacity: 0; animation: hb-we10-up .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(var(--hb-we10-k) * 90ms + 150ms); }
.hb-we10-cell[data-rule="true"]::before { content: ""; position: absolute; top: 0; bottom: 0; left: calc(clamp(16px, 2.4cqi, 28px) / -2); width: 1px; background: var(--hb-we10-rule); transform-origin: top; animation: hb-we10-rule 1s cubic-bezier(.65,0,.25,1) both; animation-delay: calc(var(--hb-we10-k) * 90ms + 200ms); }
.hb-we10-lead { grid-column: span 6; }
.hb-we10-side { grid-column: span 3; display: grid; gap: 22px; align-content: start; }
.hb-we10-most { grid-column: span 3; }
.hb-we10-briefs { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(16px, 2.4cqi, 28px); padding-top: 18px; border-top: 1px solid var(--hb-we10-ink); }
.hb-we10-a { display: block; color: inherit; text-decoration: none; }
.hb-we10-a:focus-visible { outline: 2px solid var(--hb-we10-accent); outline-offset: 4px; }
.hb-we10-art { position: relative; overflow: hidden; margin-bottom: 14px; background: #d9d2c3; }
.hb-we10-art svg { display: block; width: 100%; height: 100%; filter: grayscale(1) contrast(1.15); mix-blend-mode: multiply; transition: filter .7s ease, transform 1.1s cubic-bezier(.2,.8,.2,1); }
.hb-we10-art::after { content: ""; position: absolute; inset: 0; background: var(--hb-we10-tone); mix-blend-mode: screen; opacity: .55; transition: opacity .7s ease; pointer-events: none; }
.hb-we10-a:hover .hb-we10-art svg, .hb-we10-a:focus-visible .hb-we10-art svg { filter: grayscale(0) contrast(1); transform: scale(1.03); }
.hb-we10-a:hover .hb-we10-art::after, .hb-we10-a:focus-visible .hb-we10-art::after { opacity: 0; }
.hb-we10-lead .hb-we10-art { aspect-ratio: 16 / 10; }
.hb-we10-side .hb-we10-art { aspect-ratio: 4 / 3; }
.hb-we10-kick { display: inline-block; margin-bottom: 8px; color: var(--hb-we10-accent); font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.hb-we10-h { margin: 0; font-family: var(--font-grotesk, inherit); font-weight: 650; letter-spacing: -.03em; text-wrap: balance; }
.hb-we10-h span { background: linear-gradient(currentColor, currentColor) 0 100% / 0 2px no-repeat; transition: background-size .5s cubic-bezier(.2,.8,.2,1); }
.hb-we10-a:hover .hb-we10-h span, .hb-we10-a:focus-visible .hb-we10-h span { background-size: 100% 2px; }
.hb-we10-lead .hb-we10-h { font-size: clamp(28px, 4.2cqi, 48px); line-height: 1; }
.hb-we10-side .hb-we10-h { font-size: clamp(17px, 1.9cqi, 20px); line-height: 1.15; }
.hb-we10-dek { margin: 12px 0 0; color: #45413a; font-size: 15px; line-height: 1.6; }
.hb-we10-by { display: block; margin-top: 10px; color: #6d685d; font-size: 12px; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-we10-mt { margin: 0 0 6px; padding-bottom: 8px; border-bottom: 2px solid var(--hb-we10-ink); font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.hb-we10-ol { margin: 0; padding: 0; list-style: none; counter-reset: hb-we10-n; }
.hb-we10-ol li { counter-increment: hb-we10-n; border-bottom: 1px solid var(--hb-we10-rule); }
.hb-we10-ol a { display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 10px; padding: 12px 0; color: inherit; text-decoration: none; }
.hb-we10-ol a::before { content: counter(hb-we10-n); font-family: var(--font-grotesk, inherit); font-size: 34px; font-weight: 700; line-height: .9; letter-spacing: -.05em; color: transparent; -webkit-text-stroke: 1.2px var(--hb-we10-ink); transition: color .3s ease, -webkit-text-stroke-color .3s ease; }
.hb-we10-ol a:hover::before, .hb-we10-ol a:focus-visible::before { color: var(--hb-we10-accent); -webkit-text-stroke-color: var(--hb-we10-accent); }
.hb-we10-ol a:focus-visible { outline: 2px solid var(--hb-we10-accent); outline-offset: 2px; }
.hb-we10-ol small { display: block; color: #6d685d; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-we10-ol b { display: block; margin-top: 3px; font-size: 14.5px; font-weight: 600; line-height: 1.3; }
.hb-we10-q { margin: 0; padding: 18px; background: var(--hb-we10-ink); color: #f4f0e6; }
.hb-we10-q p { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(17px, 1.9cqi, 21px); font-weight: 600; line-height: 1.25; letter-spacing: -.02em; }
.hb-we10-q p::before { content: ""; display: block; width: 28px; height: 4px; margin-bottom: 14px; background: var(--hb-we10-accent); }
.hb-we10-q footer { margin-top: 14px; font-size: 12px; color: #b8b2a4; }
.hb-we10-q footer b { color: #f4f0e6; font-weight: 600; }
.hb-we10-brief small { display: block; margin-bottom: 4px; color: var(--hb-we10-accent); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.hb-we10-brief b { font-size: 14px; font-weight: 600; line-height: 1.35; }
@keyframes hb-we10-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes hb-we10-rule { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@container (max-width: 900px) {
  .hb-we10-lead { grid-column: 1 / -1; }
  .hb-we10-side { grid-column: span 6; }
  .hb-we10-most { grid-column: span 6; }
  .hb-we10-side[data-rule="true"]::before { display: none; }
  .hb-we10-briefs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 560px) {
  .hb-we10-mast { grid-template-columns: 1fr; text-align: center; }
  .hb-we10-mi, .hb-we10-mi:last-child { text-align: center; }
  .hb-we10-side, .hb-we10-most { grid-column: 1 / -1; }
  .hb-we10-cell[data-rule="true"]::before { display: none; }
  .hb-we10-briefs { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we10 *, .hb-we10 *::before, .hb-we10 *::after { transition: none !important; animation: none !important; }
  .hb-we10-cell { opacity: 1; }
}
`;

function Photo({ hue, kind }: { hue: number; kind: number }) {
  const a = `hsl(${hue} 65% 52%)`;
  const b = `hsl(${(hue + 200) % 360} 45% 38%)`;
  const c = `hsl(${(hue + 30) % 360} 80% 78%)`;
  if (kind === 0) {
    return (
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="640" height="400" fill={c} />
        <rect x="0" y="250" width="640" height="150" fill={b} />
        <circle cx="470" cy="120" r="70" fill={a} />
        <rect x="80" y="120" width="150" height="190" fill="#2b2620" />
        <rect x="96" y="140" width="52" height="64" fill={c} />
        <rect x="162" y="140" width="52" height="64" fill={c} />
        <rect x="96" y="220" width="52" height="64" fill={a} />
        <rect x="250" y="170" width="110" height="140" fill="#3c352c" />
        <rect x="270" y="190" width="70" height="40" fill={c} />
        <path d="M380 310 h60 v-70 a30 30 0 0 1 60 0 v70 h40" fill="none" stroke="#2b2620" strokeWidth="10" />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill={b} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={30 + i * 60} y={60 + (i % 2) * 30} width="44" height={180 - (i % 2) * 30} fill={i % 3 === 0 ? a : c} />
        ))}
        <rect x="0" y="240" width="400" height="60" fill="#221f1a" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill={c} />
      <path d="M0 200 Q 100 160 200 200 T 400 200 V 300 H 0 Z" fill={b} />
      <path d="M0 230 Q 100 200 200 230 T 400 230 V 300 H 0 Z" fill={a} opacity=".8" />
      <rect x="120" y="110" width="160" height="70" fill="#2b2620" />
      <rect x="136" y="124" width="30" height="20" fill={c} />
      <rect x="176" y="124" width="30" height="20" fill={c} />
      <rect x="216" y="124" width="30" height="20" fill={c} />
    </svg>
  );
}

export function BlogMagazineGrid({
  masthead = "The Margin",
  issue = "Issue 214",
  dateline = "Saturday, November 7, 2026",
  sections = ["Front page", "Work", "Money", "Tech", "Design", "Cities", "Health", "Opinion"],
  lead = defaultLead,
  stories = defaultStories,
  mostRead = defaultMostRead,
  quote = { text: "We did not lose a single client. We lost a lot of meetings.", by: "Ruth Adeyemi", role: "COO, Fernhill Studio" },
  briefs = defaultBriefs,
  accent = "#e0391b",
  onStoryClick,
  className,
  style,
  ...rest
}: BlogMagazineGridProps) {
  const [current, setCurrent] = React.useState(0);
  const words = masthead.split(" ");
  const tone = (h: number) => ({ "--hb-we10-tone": `hsl(${h} 70% 55%)` }) as React.CSSProperties;
  const k = (n: number, extra?: React.CSSProperties) => ({ "--hb-we10-k": n, ...extra }) as React.CSSProperties;

  return (
    <section
      className={["hb-we10", className].filter(Boolean).join(" ")}
      style={{ "--hb-we10-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-magazine-grid" precedence="default">{css}</style>
      <div className="hb-we10-inner">
        <header className="hb-we10-mast">
          <span className="hb-we10-mi">{issue}</span>
          <h2 className="hb-we10-name">
            {words.slice(0, -1).join(" ")}{words.length > 1 ? " " : ""}<span>{words[words.length - 1]}</span>
          </h2>
          <span className="hb-we10-mi">{dateline}</span>
        </header>
        <nav className="hb-we10-nav" aria-label="Sections">
          {sections.map((s, i) => (
            <a
              key={s}
              href="#"
              aria-current={i === current ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrent(i);
              }}
            >
              {s}
            </a>
          ))}
        </nav>
        <div className="hb-we10-grid">
          <article className="hb-we10-cell hb-we10-lead" style={k(0)}>
            <a className="hb-we10-a" href={lead.href} onClick={() => onStoryClick?.(lead.title)}>
              <div className="hb-we10-art" style={tone(lead.hue)}><Photo hue={lead.hue} kind={0} /></div>
              <span className="hb-we10-kick">{lead.kicker}</span>
              <h3 className="hb-we10-h"><span>{lead.title}</span></h3>
              {lead.dek ? <p className="hb-we10-dek">{lead.dek}</p> : null}
              <span className="hb-we10-by">By {lead.author} · {lead.minutes} min read</span>
            </a>
          </article>
          <div className="hb-we10-cell hb-we10-side" data-rule="true" style={k(1)}>
            {stories.map((s, i) => (
              <article key={s.title}>
                <a className="hb-we10-a" href={s.href} onClick={() => onStoryClick?.(s.title)}>
                  <div className="hb-we10-art" style={tone(s.hue)}><Photo hue={s.hue} kind={1 + (i % 2)} /></div>
                  <span className="hb-we10-kick">{s.kicker}</span>
                  <h3 className="hb-we10-h"><span>{s.title}</span></h3>
                  <span className="hb-we10-by">{s.author} · {s.minutes} min</span>
                </a>
              </article>
            ))}
          </div>
          <aside className="hb-we10-cell hb-we10-most" data-rule="true" style={k(2)}>
            <h3 className="hb-we10-mt">Most read this week</h3>
            <ol className="hb-we10-ol">
              {mostRead.map((m) => (
                <li key={m.title}>
                  <a href={m.href} onClick={() => onStoryClick?.(m.title)}>
                    <span>
                      <small>{m.label}</small>
                      <b>{m.title}</b>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            {quote ? (
              <blockquote className="hb-we10-q" style={{ marginTop: 22 }}>
                <p>{quote.text}</p>
                <footer><b>{quote.by}</b> · {quote.role}</footer>
              </blockquote>
            ) : null}
          </aside>
          <div className="hb-we10-cell hb-we10-briefs" style={k(3)}>
            {briefs.map((b) => (
              <a key={b.title} className="hb-we10-a hb-we10-brief" href={b.href} onClick={() => onStoryClick?.(b.title)}>
                <small>{b.label}</small>
                <b>{b.title}</b>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

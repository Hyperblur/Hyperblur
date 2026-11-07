"use client";

import * as React from "react";

export interface BentoEditorialStory {
  kicker: string;
  title: string;
  byline: string;
  href: string;
}

export interface BentoEditorialProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  masthead?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  cover?: BentoEditorialStory;
  feature?: BentoEditorialStory;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  numeral?: string;
  numeralCaption?: string;
  tags?: string[];
  onTagSelect?: (tag: string, selected: boolean) => void;
  accent?: string;
  paper?: string;
  ink?: string;
}

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const css = `
@keyframes hb-kb5-rise { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb5-drift { 0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%, 0 0; } 50% { background-position: 30% 20%, 70% 80%, 40% 60%, 0 0; } }
@keyframes hb-kb5-wipe { from { clip-path: inset(100% 0 0 0); transform: translate3d(0, 12px, 0); } to { clip-path: inset(0 0 0 0); transform: none; } }
@keyframes hb-kb5-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hb-kb5 {
  --hb-kb5-accent: #e4572e;
  --hb-kb5-paper: #f7f5ef;
  --hb-kb5-ink: #1c1a17;
  --hb-kb5-serif: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: var(--hb-kb5-paper);
  color: var(--hb-kb5-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb5 *, .hb-kb5 *::before, .hb-kb5 *::after { box-sizing: border-box; }
.hb-kb5-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-kb5-mast { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 12px; color: color-mix(in srgb, var(--hb-kb5-ink) 60%, transparent); font-size: 11.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-kb5-rule { height: 1px; background: var(--hb-kb5-ink); transform-origin: left; animation: hb-kb5-rule 1s cubic-bezier(.65, 0, .35, 1) both; }
.hb-kb5-rule + .hb-kb5-rule { margin-top: 3px; animation-delay: .12s; }
.hb-kb5-head { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); align-items: end; gap: 20px 48px; margin: clamp(22px, 3cqi, 34px) 0 clamp(28px, 4cqi, 44px); }
.hb-kb5-title { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(38px, 6cqi, 70px); font-weight: 400; line-height: .98; letter-spacing: -.02em; text-wrap: balance; animation: hb-kb5-rise .8s cubic-bezier(.2, .8, .2, 1) .1s backwards; }
.hb-kb5-title em { font-style: normal; color: var(--hb-kb5-accent); }
.hb-kb5-sub { margin: 0; padding-left: 18px; border-left: 1px solid color-mix(in srgb, var(--hb-kb5-ink) 18%, transparent); color: color-mix(in srgb, var(--hb-kb5-ink) 72%, transparent); font-size: 15.5px; line-height: 1.65; text-wrap: pretty; animation: hb-kb5-rise .8s cubic-bezier(.2, .8, .2, 1) .2s backwards; }
.hb-kb5-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas: "cover quote quote num" "cover tags feat feat";
  gap: 14px;
}
.hb-kb5-cell {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--hb-kb5-ink) 11%, transparent);
  border-radius: 6px;
  background: #fffdf8;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset, 0 1px 2px color-mix(in srgb, var(--hb-kb5-ink) 6%, transparent);
  animation: hb-kb5-rise .8s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb5-i, 0) * 90ms + 250ms);
}
.hb-kb5-photo {
  position: absolute;
  inset: 0;
  background-size: 160% 160%, 160% 160%, 140% 140%, auto;
  animation: hb-kb5-drift 18s ease-in-out infinite;
  transition: transform 1.2s cubic-bezier(.2, .8, .2, 1);
}
.hb-kb5-photo::after { content: ""; position: absolute; inset: 0; background-image: ${grain}; background-size: 160px 160px; mix-blend-mode: multiply; opacity: .5; }
.hb-kb5-cover { grid-area: cover; display: flex; min-height: 420px; color: #fffdf8; text-decoration: none; }
.hb-kb5-cover .hb-kb5-photo {
  background-image:
    radial-gradient(45% 40% at 30% 30%, #f2a65a, transparent 70%),
    radial-gradient(50% 50% at 75% 70%, #c2410c, transparent 70%),
    radial-gradient(60% 60% at 50% 100%, #1f3d2b, transparent 75%),
    linear-gradient(160deg, #e9c59a, #8a3b1d 70%, #23281f);
}
.hb-kb5-cover::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent 40%, rgba(20, 14, 8, .72)); }
.hb-kb5-cover:hover .hb-kb5-photo, .hb-kb5-feat:hover .hb-kb5-photo { transform: scale(1.05); }
.hb-kb5-ctext { position: relative; z-index: 1; align-self: flex-end; padding: 22px; }
.hb-kb5-kicker { display: inline-block; margin-bottom: 10px; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; opacity: .85; }
.hb-kb5-ctext h3 { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(28px, 3.4cqi, 38px); font-weight: 400; line-height: 1.02; letter-spacing: -.01em; }
.hb-kb5-ctext p { margin: 10px 0 0; font-size: 12.5px; opacity: .8; }
.hb-kb5-quote { grid-area: quote; display: flex; flex-direction: column; justify-content: space-between; gap: 22px; padding: clamp(20px, 2.6cqi, 30px); }
.hb-kb5-quote svg { color: var(--hb-kb5-accent); }
.hb-kb5-quote blockquote { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(21px, 2.5cqi, 28px); line-height: 1.22; letter-spacing: -.005em; text-wrap: pretty; }
.hb-kb5-who { display: flex; align-items: center; gap: 12px; font-size: 13px; }
.hb-kb5-who b { display: block; font-weight: 600; }
.hb-kb5-who span { color: color-mix(in srgb, var(--hb-kb5-ink) 60%, transparent); }
.hb-kb5-av { display: grid; place-items: center; flex: none; width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #e9c59a, var(--hb-kb5-accent)); color: #fffdf8; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 16px; }
.hb-kb5-num { grid-area: num; display: flex; flex-direction: column; justify-content: space-between; padding: 20px; background: var(--hb-kb5-ink); color: var(--hb-kb5-paper); border-color: transparent; }
.hb-kb5-num small { color: color-mix(in srgb, var(--hb-kb5-paper) 60%, transparent); font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-kb5-big { display: block; margin: 18px 0 6px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(64px, 9cqi, 112px); line-height: .82; letter-spacing: -.04em; animation: hb-kb5-wipe 1.1s cubic-bezier(.2, .8, .2, 1) .6s both; }
.hb-kb5-big sup { margin-left: 2px; color: var(--hb-kb5-accent); font-size: .34em; vertical-align: top; }
.hb-kb5-num p { margin: 0; font-size: 13px; line-height: 1.5; color: color-mix(in srgb, var(--hb-kb5-paper) 78%, transparent); }
.hb-kb5-tags { grid-area: tags; padding: 18px; }
.hb-kb5-tags h4 { margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: color-mix(in srgb, var(--hb-kb5-ink) 60%, transparent); }
.hb-kb5-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-kb5-tag {
  padding: 5px 11px;
  border: 1px solid color-mix(in srgb, var(--hb-kb5-ink) 18%, transparent);
  border-radius: 999px;
  background: transparent;
  color: var(--hb-kb5-ink);
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
}
.hb-kb5-tag[data-s="1"] { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 15px; }
.hb-kb5-tag[data-s="2"] { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; }
.hb-kb5-tag:hover { border-color: var(--hb-kb5-ink); transform: translate3d(0, -1px, 0); }
.hb-kb5-tag[aria-pressed="true"] { border-color: var(--hb-kb5-ink); background: var(--hb-kb5-ink); color: var(--hb-kb5-paper); }
.hb-kb5-tag:focus-visible { outline: 2px solid var(--hb-kb5-accent); outline-offset: 2px; }
.hb-kb5-feat { grid-area: feat; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); color: inherit; text-decoration: none; }
.hb-kb5-fimg { position: relative; min-height: 180px; overflow: hidden; }
.hb-kb5-feat .hb-kb5-photo {
  background-image:
    radial-gradient(40% 45% at 70% 30%, #9fc5b8, transparent 70%),
    radial-gradient(50% 50% at 20% 80%, #2f5d62, transparent 70%),
    radial-gradient(60% 60% at 60% 90%, #d9c7a7, transparent 70%),
    linear-gradient(200deg, #cfd9cc, #4a6b63 60%, #1e2e2d);
}
.hb-kb5-ftext { display: flex; flex-direction: column; justify-content: space-between; gap: 14px; padding: 20px; }
.hb-kb5-ftext .hb-kb5-kicker { color: var(--hb-kb5-accent); opacity: 1; }
.hb-kb5-ftext h3 { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(22px, 2.5cqi, 28px); font-weight: 400; line-height: 1.08; }
.hb-kb5-ftext p { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 0; color: color-mix(in srgb, var(--hb-kb5-ink) 62%, transparent); font-size: 12.5px; }
.hb-kb5-ftext p svg { flex: none; transition: transform .25s ease; }
.hb-kb5-feat:hover .hb-kb5-ftext p svg { transform: translate3d(4px, 0, 0); }
.hb-kb5-cover:focus-visible, .hb-kb5-feat:focus-visible { outline: 2px solid var(--hb-kb5-accent); outline-offset: 3px; }
@container (max-width: 860px) {
  .hb-kb5-head { grid-template-columns: minmax(0, 1fr); }
  .hb-kb5-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-areas: "cover quote" "cover num" "tags tags" "feat feat"; }
  .hb-kb5-cover { min-height: 360px; }
}
@container (max-width: 560px) {
  .hb-kb5-grid { grid-template-columns: minmax(0, 1fr); grid-template-areas: "cover" "quote" "num" "tags" "feat"; }
  .hb-kb5-feat { grid-template-columns: minmax(0, 1fr); }
  .hb-kb5-cover { min-height: 320px; }
  .hb-kb5-mast span + span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb5 *, .hb-kb5 *::before, .hb-kb5 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultTags = ["Typography", "Slow tech", "Essays", "Field notes", "Craft", "Archives", "Interviews", "Print", "Letters", "Design history"];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function BentoEditorial({
  masthead = "Folio · Volume 4 · Autumn 2026",
  title = "Publishing for people who",
  highlight = "read to the end",
  subtitle = "Folio is a calm home for newsletters, essays and print-ready issues. No feeds, no growth hacks, just beautiful pages and readers who stay.",
  cover = { kicker: "Issue 12", title: "The quiet web", byline: "Essays · 14 min read", href: "#" },
  feature = { kicker: "Field notes", title: "Notes from a letterpress shop in Porto", byline: "Tomás Reis · 9 min", href: "#" },
  quote = "We stopped chasing the feed and started sending letters. Open rates doubled, and readers began writing back.",
  quoteAuthor = "Imogen Hart",
  quoteRole = "Editor, Low Tide",
  numeral = "418",
  numeralCaption = "independent studios publish their issues on Folio.",
  tags = defaultTags,
  onTagSelect,
  accent = "#e4572e",
  paper = "#f7f5ef",
  ink = "#1c1a17",
  className,
  style,
  ...rest
}: BentoEditorialProps) {
  const [selected, setSelected] = React.useState<string[]>(() => tags.slice(1, 2));

  const toggle = (tag: string) => {
    const on = !selected.includes(tag);
    setSelected((prev) => (on ? [...prev, tag] : prev.filter((t) => t !== tag)));
    onTagSelect?.(tag, on);
  };

  return (
    <section
      className={["hb-kb5", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb5-accent": accent, "--hb-kb5-paper": paper, "--hb-kb5-ink": ink, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-editorial" precedence="default">{css}</style>
      <div className="hb-kb5-in">
        <div className="hb-kb5-mast">
          <span>{masthead}</span>
          <span>Est. 2019</span>
        </div>
        <div className="hb-kb5-rule" />
        <div className="hb-kb5-rule" />
        <header className="hb-kb5-head">
          <h2 className="hb-kb5-title">
            {title} {highlight ? <em>{highlight}</em> : null}
          </h2>
          {subtitle ? <p className="hb-kb5-sub">{subtitle}</p> : null}
        </header>

        <div className="hb-kb5-grid">
          <a className="hb-kb5-cell hb-kb5-cover" href={cover.href} style={{ "--hb-kb5-i": 0 } as React.CSSProperties}>
            <span className="hb-kb5-photo" aria-hidden="true" />
            <div className="hb-kb5-ctext">
              <span className="hb-kb5-kicker">{cover.kicker}</span>
              <h3>{cover.title}</h3>
              <p>{cover.byline}</p>
            </div>
          </a>

          <figure className="hb-kb5-cell hb-kb5-quote" style={{ margin: 0, "--hb-kb5-i": 1 } as React.CSSProperties}>
            <svg width="30" height="24" viewBox="0 0 30 24" fill="currentColor" aria-hidden="true">
              <path d="M0 24V14C0 6.4 4.2 1.7 11.5 0l1.4 3.3C8.7 4.8 6.6 7.6 6.4 11.3H12V24zm17 0V14c0-7.6 4.2-12.3 11.5-14l1.4 3.3c-4.2 1.5-6.3 4.3-6.5 8H29V24z" />
            </svg>
            <blockquote>{quote}</blockquote>
            <figcaption className="hb-kb5-who">
              <span className="hb-kb5-av" aria-hidden="true">
                {initials(quoteAuthor)}
              </span>
              <span>
                <b>{quoteAuthor}</b>
                <span>{quoteRole}</span>
              </span>
            </figcaption>
          </figure>

          <div className="hb-kb5-cell hb-kb5-num" style={{ "--hb-kb5-i": 2 } as React.CSSProperties}>
            <small>By the numbers</small>
            <div>
              <strong className="hb-kb5-big">
                {numeral}
                <sup>+</sup>
              </strong>
              <p>{numeralCaption}</p>
            </div>
          </div>

          <div className="hb-kb5-cell hb-kb5-tags" style={{ "--hb-kb5-i": 3 } as React.CSSProperties}>
            <h4>Browse by theme</h4>
            <div className="hb-kb5-cloud">
              {tags.map((t, i) => (
                <button key={t} type="button" className="hb-kb5-tag" data-s={i % 3} aria-pressed={selected.includes(t)} onClick={() => toggle(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <a className="hb-kb5-cell hb-kb5-feat" href={feature.href} style={{ "--hb-kb5-i": 4 } as React.CSSProperties}>
            <span className="hb-kb5-fimg" aria-hidden="true">
              <span className="hb-kb5-photo" />
            </span>
            <div className="hb-kb5-ftext">
              <div>
                <span className="hb-kb5-kicker">{feature.kicker}</span>
                <h3>{feature.title}</h3>
              </div>
              <p>
                {feature.byline}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

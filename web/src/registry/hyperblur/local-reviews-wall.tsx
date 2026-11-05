"use client";

import * as React from "react";

export interface LocalReview {
  name: string;
  rating: number;
  text: string;
  source: string;
  date: string;
  detail?: string;
}

export interface LocalReviewsWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  rating?: number;
  total?: number;
  distribution?: [number, number, number, number, number];
  reviews?: LocalReview[];
  sources?: { name: string; rating: string; color: string }[];
  cta?: { label: string; href: string };
  speed?: number;
  accent?: string;
}

const defaultReviews: LocalReview[] = [
  { name: "Priya Raman", rating: 5, source: "Google", date: "2 days ago", detail: "Morning bun and flat white", text: "The cardamom morning bun is the best thing I have eaten this year. Flaky, sticky, not too sweet. I now walk ten blocks out of my way every Saturday." },
  { name: "Marcus Bell", rating: 5, source: "Yelp", date: "1 week ago", text: "Ordered a birthday cake two days out and they still made it happen. Lemon and elderflower, perfectly moist, and the piping was gorgeous." },
  { name: "Hannah Cole", rating: 4, source: "Google", date: "3 weeks ago", detail: "Weekend brunch", text: "Gets busy after ten, so come early. Sourdough toast with whipped butter is simple and perfect." },
  { name: "Diego Alvarez", rating: 5, source: "Tripadvisor", date: "1 month ago", text: "We found this place on our first morning in town and came back every day of the trip. The staff remembered our order by day three." },
  { name: "Sofia Lindqvist", rating: 5, source: "Google", date: "1 month ago", detail: "Catering order", text: "They catered our office breakfast for forty people. Everything arrived warm, labelled for allergies, and the pastries disappeared in minutes." },
  { name: "Theo Nakamura", rating: 5, source: "Yelp", date: "2 months ago", text: "Their rye is the real deal. Dense, tangy, keeps for days. Worth the early alarm to get one before they sell out." },
  { name: "Grace Okonkwo", rating: 5, source: "Google", date: "2 months ago", detail: "Gluten-free options", text: "As a celiac I rarely get to enjoy a bakery. They have a dedicated gluten-free shelf and the almond cake is incredible." },
  { name: "Liam Brennan", rating: 4, source: "Tripadvisor", date: "3 months ago", text: "Great coffee, lovely window seats and very friendly baristas. Wish they stayed open a little later on weekdays." },
];

const defaultSources = [
  { name: "Google", rating: "4.9", color: "#4f8df5" },
  { name: "Yelp", rating: "4.8", color: "#e0493b" },
  { name: "Tripadvisor", rating: "5.0", color: "#2fa37a" },
];

const css = `
.hb-kl8 {
  --hb-kl8-accent: #e2a03f;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #fbfaf7;
  color: #1d1b18;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl8 *, .hb-kl8 *::before, .hb-kl8 *::after { box-sizing: border-box; }
.hb-kl8-wrap { max-width: 1120px; margin: 0 auto; padding: 80px 24px 88px; display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.6fr); gap: 48px; align-items: center; }
.hb-kl8-eyebrow { margin: 0 0 14px; color: #8a8378; font-size: 13px; font-weight: 500; }
.hb-kl8-title { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-weight: 600; font-size: clamp(30px, 4cqw, 44px); line-height: 1.05; letter-spacing: -.035em; text-wrap: balance; }
.hb-kl8-score { display: flex; align-items: flex-end; gap: 14px; margin: 28px 0 6px; }
.hb-kl8-big { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 68px; font-weight: 600; line-height: .85; letter-spacing: -.05em; }
.hb-kl8-stars { display: inline-flex; gap: 2px; color: var(--hb-kl8-accent); }
.hb-kl8-count { margin: 6px 0 0; color: #8a8378; font-size: 13.5px; }
.hb-kl8-bars { margin: 22px 0 0; padding: 0; list-style: none; display: grid; gap: 7px; }
.hb-kl8-bar { display: grid; grid-template-columns: 14px minmax(0, 1fr) 36px; align-items: center; gap: 10px; color: #6d675d; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-kl8-track { height: 6px; border-radius: 999px; background: #ece8e0; overflow: hidden; }
.hb-kl8-fill { display: block; height: 100%; border-radius: inherit; background: var(--hb-kl8-accent); transform-origin: left; animation: hb-kl8-grow 1.1s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-kl8-i) * 80ms + .2s); }
@keyframes hb-kl8-grow { from { transform: scaleX(0); } }
.hb-kl8-sources { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.hb-kl8-src { display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; background: #fff; border: 1px solid #ebe6dc; font-size: 12.5px; color: #3a362f; }
.hb-kl8-src i { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-kl8-c); }
.hb-kl8-src b { font-weight: 600; }
.hb-kl8-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 26px; padding: 12px 18px; border-radius: 999px; background: #1d1b18; color: #fbfaf7; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; }
.hb-kl8-cta:hover { background: #3b362e; transform: translateY(-1px); }
.hb-kl8-cta:focus-visible { outline: 2px solid var(--hb-kl8-accent); outline-offset: 3px; }
.hb-kl8-wall { position: relative; min-width: 0; height: 560px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; overflow: hidden; mask-image: linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent); -webkit-mask-image: linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent); }
.hb-kl8-col { min-width: 0; }
.hb-kl8-reel { display: flex; flex-direction: column; gap: 16px; animation: hb-kl8-up var(--hb-kl8-dur) linear infinite; }
.hb-kl8-col:nth-child(2) .hb-kl8-reel { animation-direction: reverse; }
.hb-kl8-wall:hover .hb-kl8-reel, .hb-kl8-wall:focus-within .hb-kl8-reel { animation-play-state: paused; }
@keyframes hb-kl8-up { to { transform: translateY(calc(-50% - 8px)); } }
.hb-kl8-card { padding: 20px; border-radius: 18px; background: #fff; border: 1px solid #ece7de; box-shadow: 0 1px 0 #fff inset, 0 14px 30px -24px rgba(60, 40, 10, .35); transition: transform .3s, box-shadow .3s, border-color .3s; }
.hb-kl8-card:hover { transform: translateY(-3px); border-color: #e0d7c6; box-shadow: 0 20px 40px -26px rgba(60, 40, 10, .45); }
.hb-kl8-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.hb-kl8-badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--hb-kl8-c) 10%, #fff); color: color-mix(in srgb, var(--hb-kl8-c) 80%, #000); font-size: 11.5px; font-weight: 600; }
.hb-kl8-badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kl8-c); }
.hb-kl8-text { margin: 0; color: #3a362f; font-size: 14.5px; line-height: 1.6; }
.hb-kl8-detail { display: inline-block; margin-top: 12px; padding: 3px 8px; border-radius: 6px; background: #f5f2ec; color: #7a7366; font-size: 12px; }
.hb-kl8-who { display: flex; align-items: center; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1ede5; }
.hb-kl8-av { flex: none; display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; color: #fff; font-size: 12.5px; font-weight: 600; }
.hb-kl8-name { font-size: 14px; font-weight: 600; }
.hb-kl8-date { color: #9a9387; font-size: 12.5px; }
@container (max-width: 860px) {
  .hb-kl8-wrap { grid-template-columns: minmax(0, 1fr); gap: 36px; padding: 64px 20px 72px; }
  .hb-kl8-wall { height: 480px; }
}
@container (max-width: 480px) {
  .hb-kl8-wall { grid-template-columns: minmax(0, 1fr); }
  .hb-kl8-col:nth-child(2) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl8 *, .hb-kl8 *::before, .hb-kl8 *::after { animation: none !important; transition: none !important; }
  .hb-kl8-wall { height: auto; max-height: 640px; overflow: auto; }
}
`;

const avatarColors = ["#c8763a", "#5b7f6a", "#7a6bb0", "#b5546a", "#3f7ea6", "#9a8a3c"];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="hb-kl8-stars" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill={i < Math.round(value) ? "currentColor" : "#e3ddd2"} />
        </svg>
      ))}
    </span>
  );
}

export function LocalReviewsWall({
  eyebrow = "Juniper Bakehouse · Reviews",
  title = "Loved by the whole neighbourhood.",
  rating = 4.9,
  total = 1386,
  distribution = [1201, 142, 28, 9, 6],
  reviews = defaultReviews,
  sources = defaultSources,
  cta = { label: "Order for pickup", href: "#order" },
  speed = 1,
  accent = "#e2a03f",
  className,
  style,
  ...rest
}: LocalReviewsWallProps) {
  const sum = distribution.reduce((a, b) => a + b, 0) || 1;
  const colorFor = (src: string) => sources.find((s) => s.name === src)?.color ?? "#8a8378";
  const columns: LocalReview[][] = [[], []];
  reviews.forEach((r, i) => columns[i % 2].push(r));
  const duration = `${(Math.max(reviews.length, 4) * 6.5 / Math.max(speed, 0.1)).toFixed(1)}s`;

  return (
    <section
      className={["hb-kl8", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl8-accent": accent, "--hb-kl8-dur": duration, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-reviews-wall" precedence="default">{css}</style>
      <div className="hb-kl8-wrap">
        <div>
          <p className="hb-kl8-eyebrow">{eyebrow}</p>
          <h2 className="hb-kl8-title">{title}</h2>
          <div className="hb-kl8-score">
            <span className="hb-kl8-big">{rating.toFixed(1)}</span>
            <Stars value={rating} size={20} />
          </div>
          <p className="hb-kl8-count">Based on {total.toLocaleString("en-US")} reviews</p>
          <ul className="hb-kl8-bars" aria-label="Rating distribution">
            {distribution.map((n, i) => {
              const pct = (n / sum) * 100;
              return (
                <li key={i} className="hb-kl8-bar">
                  <span>{5 - i}</span>
                  <span className="hb-kl8-track"><span className="hb-kl8-fill" style={{ width: `${pct.toFixed(1)}%`, "--hb-kl8-i": i } as React.CSSProperties} /></span>
                  <span>{pct.toFixed(0)}%</span>
                </li>
              );
            })}
          </ul>
          <div className="hb-kl8-sources">
            {sources.map((s) => (
              <span key={s.name} className="hb-kl8-src" style={{ "--hb-kl8-c": s.color } as React.CSSProperties}>
                <i aria-hidden="true" />{s.name} <b>{s.rating}</b>
              </span>
            ))}
          </div>
          {cta ? (
            <a className="hb-kl8-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-kl8-wall" aria-label="Customer reviews" role="region">
          {columns.map((col, ci) => (
            <div key={ci} className="hb-kl8-col">
              <div className="hb-kl8-reel">
                {[0, 1].map((copy) =>
                  col.map((r) => (
                    <article key={`${copy}-${r.name}`} className="hb-kl8-card" aria-hidden={copy === 1 ? true : undefined}>
                      <div className="hb-kl8-top">
                        <Stars value={r.rating} />
                        <span className="hb-kl8-badge" style={{ "--hb-kl8-c": colorFor(r.source) } as React.CSSProperties}>
                          <i aria-hidden="true" />{r.source}
                        </span>
                      </div>
                      <p className="hb-kl8-text">{r.text}</p>
                      {r.detail ? <span className="hb-kl8-detail">{r.detail}</span> : null}
                      <div className="hb-kl8-who">
                        <span className="hb-kl8-av" style={{ background: avatarColors[hash(r.name) % avatarColors.length] }} aria-hidden="true">
                          {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                        </span>
                        <div>
                          <div className="hb-kl8-name">{r.name}</div>
                          <div className="hb-kl8-date">{r.date}</div>
                        </div>
                      </div>
                    </article>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

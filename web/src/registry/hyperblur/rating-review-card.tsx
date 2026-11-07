"use client";

import * as React from "react";

export interface RatingReviewQuote {
  text: string;
  author: string;
  meta?: string;
  rating?: number;
}

export interface RatingReviewLabels {
  reviews: string;
  outOf: string;
  rateUs: string;
  topReview: string;
  starsRow: string;
}

export interface RatingReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rating?: number;
  count?: number;
  distribution?: number[];
  source?: string;
  reviewUrl?: string;
  quote?: RatingReviewQuote | null;
  appearance?: "dark" | "light";
  accent?: string;
  starColor?: string;
  locale?: string;
  labels?: Partial<RatingReviewLabels>;
}

const defaultLabels: RatingReviewLabels = {
  reviews: "{n} reviews",
  outOf: "out of 5",
  rateUs: "Rate us",
  topReview: "Top review",
  starsRow: "{s} stars",
};

const defaultQuote: RatingReviewQuote = {
  text: "Best smash burger in the neighborhood. Crispy edges, soft bun, and the order was at my door in 25 minutes.",
  author: "Maya R.",
  meta: "2 weeks ago",
  rating: 5,
};

const starPath = "M12 2.6l2.82 5.72 6.31.92-4.57 4.45 1.08 6.29L12 17l-5.64 2.98 1.08-6.29L2.87 9.24l6.31-.92z";

const css = `
.hb-od1 {
  --hb-od1-accent: #2f7bff;
  --hb-od1-star: #f5b301;
  --hb-od1-bg: #111111;
  --hb-od1-surface: #171717;
  --hb-od1-line: #262626;
  --hb-od1-track: #232323;
  --hb-od1-text: #ededed;
  --hb-od1-muted: #8f8f8f;
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: var(--hb-od1-text);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
}
.hb-od1[data-appearance="light"] {
  --hb-od1-bg: #ffffff;
  --hb-od1-surface: #f7f6f2;
  --hb-od1-line: #e7e5df;
  --hb-od1-track: #efede7;
  --hb-od1-text: #151515;
  --hb-od1-muted: #6f6f6f;
}
.hb-od1 *, .hb-od1 *::before, .hb-od1 *::after { box-sizing: border-box; }
.hb-od1-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--hb-od1-line);
  border-radius: 18px;
  background:
    radial-gradient(90% 70% at 0% 0%, color-mix(in srgb, var(--hb-od1-star) 10%, transparent), transparent 60%),
    var(--hb-od1-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.hb-od1-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.hb-od1-source {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 7px;
  color: var(--hb-od1-muted);
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
.hb-od1-source span { overflow: hidden; text-overflow: ellipsis; }
.hb-od1-source svg { flex: none; color: var(--hb-od1-star); }
.hb-od1-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--hb-od1-text);
  color: var(--hb-od1-bg);
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.15s ease, background 0.2s ease;
}
.hb-od1-cta:hover { background: color-mix(in srgb, var(--hb-od1-text) 86%, transparent); }
.hb-od1-cta:active { transform: scale(0.97); }
.hb-od1-cta:focus-visible { outline: 2px solid var(--hb-od1-accent); outline-offset: 2px; }
.hb-od1-cta svg { transition: transform 0.2s ease; }
.hb-od1-cta:hover svg { transform: translateX(2px); }
.hb-od1-body {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
}
.hb-od1-score { display: flex; flex-direction: column; gap: 5px; }
.hb-od1-num {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.hb-od1-big {
  font-size: 40px;
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 0.95;
  font-variant-numeric: tabular-nums;
}
.hb-od1-of { color: var(--hb-od1-muted); font-size: 11px; white-space: nowrap; }
.hb-od1-stars { display: inline-flex; gap: 2px; }
.hb-od1-star { position: relative; width: 15px; height: 15px; flex: none; }
.hb-od1-star svg { position: absolute; inset: 0; width: 15px; height: 15px; display: block; }
.hb-od1-star-b { fill: color-mix(in srgb, var(--hb-od1-text) 14%, transparent); }
.hb-od1-star-f {
  position: absolute;
  inset: 0 auto 0 0;
  overflow: hidden;
  animation: hb-od1-sweep 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-od1-i) * 80ms + 120ms);
}
.hb-od1-star-f svg { fill: var(--hb-od1-star); }
.hb-od1-count { color: var(--hb-od1-muted); font-size: 11.5px; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-od1-bars { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; min-width: 0; }
.hb-od1-row {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) 30px;
  align-items: center;
  gap: 8px;
  color: var(--hb-od1-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-od1-track { height: 6px; border-radius: 999px; background: var(--hb-od1-track); overflow: hidden; }
.hb-od1-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-od1-star) 70%, #ff8a00), var(--hb-od1-star));
  transform-origin: left center;
  animation: hb-od1-grow 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-od1-i) * 70ms + 200ms);
}
.hb-od1-pct { text-align: right; }
.hb-od1-quote {
  position: relative;
  margin: 0;
  padding: 12px 14px;
  border: 1px solid var(--hb-od1-line);
  border-radius: 14px;
  background: var(--hb-od1-surface);
  animation: hb-od1-rise 0.6s 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-od1-qhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  color: var(--hb-od1-muted);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.hb-od1-qstars { display: inline-flex; gap: 1px; color: var(--hb-od1-star); }
.hb-od1-qtext { margin: 0; font-size: 12.5px; line-height: 1.5; font-style: normal; }
.hb-od1-qby {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--hb-od1-muted);
  font-size: 11px;
  font-style: normal;
}
.hb-od1-qby b { color: var(--hb-od1-text); font-weight: 600; }
.hb-od1-av {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hb-od1-accent), color-mix(in srgb, var(--hb-od1-accent) 40%, #ff7a59));
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}
.hb-od1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (max-width: 290px) {
  .hb-od1-body { grid-template-columns: 1fr; gap: 12px; }
}
@container (min-width: 560px) {
  .hb-od1-card { padding: 22px 24px; gap: 18px; }
  .hb-od1-big { font-size: 56px; }
  .hb-od1-star, .hb-od1-star svg { width: 19px; height: 19px; }
  .hb-od1-body { gap: 32px; }
  .hb-od1-bars { gap: 7px; }
  .hb-od1-track { height: 8px; }
  .hb-od1-qtext { font-size: 14px; }
}
@keyframes hb-od1-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes hb-od1-sweep {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes hb-od1-rise {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-od1-fill, .hb-od1-star-f, .hb-od1-quote { animation: none; }
  .hb-od1-cta, .hb-od1-cta svg { transition: none; }
}
`;

function Star({ fill, index }: { fill: number; index: number }) {
  return (
    <span className="hb-od1-star" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="hb-od1-star-b">
        <path d={starPath} />
      </svg>
      <span className="hb-od1-star-f" style={{ width: `${(fill * 100).toFixed(1)}%`, "--hb-od1-i": index } as React.CSSProperties}>
        <svg viewBox="0 0 24 24">
          <path d={starPath} />
        </svg>
      </span>
    </span>
  );
}

export function RatingReviewCard({
  rating,
  count,
  distribution = [968, 214, 58, 22, 22],
  source = "Customer reviews",
  reviewUrl = "https://cornerkitchen.example/reviews",
  quote = defaultQuote,
  appearance = "dark",
  accent = "#2f7bff",
  starColor = "#f5b301",
  locale = "en-US",
  labels,
  className = "",
  style,
  ...rest
}: RatingReviewCardProps) {
  const l = { ...defaultLabels, ...labels };
  const rows = [0, 1, 2, 3, 4].map((i) => Math.max(0, distribution[i] ?? 0));
  const sum = rows.reduce((a, b) => a + b, 0);
  const average = sum > 0 ? rows.reduce((a, n, i) => a + n * (5 - i), 0) / sum : 0;
  const value = Math.min(5, Math.max(0, rating ?? average));
  const shown = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  const countText = l.reviews.replace("{n}", new Intl.NumberFormat(locale).format(count ?? sum));

  return (
    <div
      className={`hb-od1 ${className}`}
      data-appearance={appearance}
      style={{ "--hb-od1-accent": accent, "--hb-od1-star": starColor, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-rating-review-card" precedence="default">{css}</style>
      <section className="hb-od1-card" aria-label={source}>
        <div className="hb-od1-top">
          <span className="hb-od1-source">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={starPath} />
            </svg>
            <span>{source}</span>
          </span>
          {reviewUrl ? (
            <a className="hb-od1-cta" href={reviewUrl} target="_blank" rel="noopener noreferrer">
              {l.rateUs}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-od1-body">
          <div className="hb-od1-score">
            <div className="hb-od1-num">
              <span className="hb-od1-big">{shown}</span>
              <span className="hb-od1-of">{l.outOf}</span>
            </div>
            <span className="hb-od1-stars" role="img" aria-label={`${shown} ${l.outOf}`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} index={i} fill={Math.min(1, Math.max(0, value - i))} />
              ))}
            </span>
            <span className="hb-od1-count">{countText}</span>
          </div>
          <ul className="hb-od1-bars">
            {rows.map((n, i) => {
              const pct = sum > 0 ? (n / sum) * 100 : 0;
              const stars = 5 - i;
              return (
                <li key={stars} className="hb-od1-row">
                  <span className="hb-od1-sr">{`${l.starsRow.replace("{s}", String(stars))}: ${Math.round(pct)}%`}</span>
                  <span aria-hidden="true">{stars}</span>
                  <span className="hb-od1-track" aria-hidden="true">
                    <span className="hb-od1-fill" style={{ width: `${pct.toFixed(2)}%`, "--hb-od1-i": i } as React.CSSProperties} />
                  </span>
                  <span className="hb-od1-pct" aria-hidden="true">{`${Math.round(pct)}%`}</span>
                </li>
              );
            })}
          </ul>
        </div>
        {quote ? (
          <figure className="hb-od1-quote">
            <div className="hb-od1-qhead">
              <span>{l.topReview}</span>
              {quote.rating ? (
                <span className="hb-od1-qstars" role="img" aria-label={`${quote.rating} ${l.outOf}`}>
                  {Array.from({ length: Math.round(Math.min(5, Math.max(0, quote.rating))) }, (_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={starPath} />
                    </svg>
                  ))}
                </span>
              ) : null}
            </div>
            <blockquote className="hb-od1-qtext">{quote.text}</blockquote>
            <figcaption className="hb-od1-qby">
              <span className="hb-od1-av" aria-hidden="true">{quote.author.trim().charAt(0).toUpperCase()}</span>
              <b>{quote.author}</b>
              {quote.meta ? <span>{quote.meta}</span> : null}
            </figcaption>
          </figure>
        ) : null}
      </section>
    </div>
  );
}

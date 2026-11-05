"use client";

import * as React from "react";

export interface ShopReview {
  id: string;
  author: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified?: boolean;
  variant?: string;
  helpful?: number;
  tags?: string[];
}

export interface ShopReviewsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  productName?: string;
  reviews?: ShopReview[];
  totalReviews?: number;
  distribution?: number[];
  filters?: string[];
  recommendRate?: number;
  writeLabel?: string;
  accent?: string;
  onWriteReview?: () => void;
  onVote?: (review: ShopReview, vote: "up" | "down") => void;
  onFilterChange?: (filter: string, stars: number | null) => void;
}

const defaultReviews: ShopReview[] = [
  {
    id: "r1",
    author: "Hannah K.",
    location: "Portland, OR",
    rating: 5,
    title: "Warmest jacket I have owned, and it packs tiny",
    body: "Wore it on a 6 day trek in the Dolomites with temps around -4°C. Stayed warm at camp with only a base layer underneath. Fits true to size.",
    date: "Oct 28, 2026",
    verified: true,
    variant: "Size M · Moss",
    helpful: 42,
    tags: ["Warmth", "Fit"],
  },
  {
    id: "r2",
    author: "Marco R.",
    location: "Turin, IT",
    rating: 4,
    title: "Great quality, sleeves run a bit long",
    body: "Stitching and zippers feel premium. I have long arms and the sleeves still cover my hands, so size down if you are between sizes.",
    date: "Oct 21, 2026",
    verified: true,
    variant: "Size L · Graphite",
    helpful: 18,
    tags: ["Fit", "Quality"],
  },
  {
    id: "r3",
    author: "Yuna P.",
    location: "Seoul, KR",
    rating: 5,
    title: "Survived a full season of commuting by bike",
    body: "Rain beads right off and the hood fits over my helmet. After four months of daily use it still looks new.",
    date: "Oct 9, 2026",
    verified: false,
    variant: "Size S · Clay",
    helpful: 9,
    tags: ["Quality", "Rain"],
  },
  {
    id: "r4",
    author: "Ethan W.",
    location: "Calgary, CA",
    rating: 3,
    title: "Warm, but the pockets are shallow",
    body: "Insulation is excellent. My phone nearly slipped out twice while hiking, which is why it loses two stars for me.",
    date: "Sep 30, 2026",
    verified: true,
    variant: "Size XL · Moss",
    helpful: 6,
    tags: ["Warmth"],
  },
];

const css = `
.hb-yj9 {
  --hb-yj9-accent: #16a34a;
  --hb-yj9-star: #f5a524;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #ffffff;
  color: #111113;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj9 *, .hb-yj9 *::before, .hb-yj9 *::after { box-sizing: border-box; }
.hb-yj9-inner {
  display: grid;
  gap: 36px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
}
@container (min-width: 860px) {
  .hb-yj9-inner { grid-template-columns: 300px minmax(0, 1fr); gap: 56px; align-items: start; padding: 96px 32px; }
}
.hb-yj9-eyebrow { margin: 0 0 10px; color: #71717a; font-size: 13px; font-weight: 500; }
.hb-yj9-title { margin: 0; font-size: clamp(28px, 3.6cqw, 36px); line-height: 1.1; letter-spacing: -.03em; font-weight: 650; }
.hb-yj9-summary { display: flex; align-items: center; gap: 14px; margin-top: 22px; }
.hb-yj9-avg { font-size: 54px; line-height: 1; letter-spacing: -.04em; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yj9-stars { display: inline-flex; gap: 2px; color: var(--hb-yj9-star); }
.hb-yj9-stars svg { width: 16px; height: 16px; }
.hb-yj9-total { display: block; margin-top: 4px; color: #71717a; font-size: 13px; }
.hb-yj9-hist { display: grid; gap: 4px; margin-top: 22px; }
.hb-yj9-hrow {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 40px;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 5px 6px;
  border: 0;
  border-radius: 8px;
  background: none;
  color: #52525b;
  font: inherit;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  text-align: left;
  cursor: pointer;
  transition: background .2s ease;
}
.hb-yj9-hrow:hover { background: #f4f4f5; }
.hb-yj9-hrow:focus-visible { outline: 2px solid var(--hb-yj9-accent); outline-offset: 1px; }
.hb-yj9-hrow[aria-pressed="true"] { background: #f4f4f5; color: #111113; font-weight: 600; }
.hb-yj9-hrow span:last-child { text-align: right; }
.hb-yj9-track { height: 8px; border-radius: 99px; background: #f0f0f1; overflow: hidden; }
.hb-yj9-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--hb-yj9-star);
  transform-origin: left;
  animation: hb-yj9-grow 1s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-yj9-rec {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  padding: 14px;
  border: 1px solid #ececee;
  border-radius: 14px;
  background: #fafafa;
  font-size: 13.5px;
  line-height: 1.4;
  color: #3f3f46;
}
.hb-yj9-ring { flex: none; width: 44px; height: 44px; }
.hb-yj9-ring circle:last-child { animation: hb-yj9-ring 1.2s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yj9-write {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  margin-top: 16px;
  border: 0;
  border-radius: 999px;
  background: #111113;
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}
.hb-yj9-write:hover { background: #000; transform: translateY(-1px); }
.hb-yj9-write:focus-visible { outline: 2px solid var(--hb-yj9-accent); outline-offset: 3px; }
.hb-yj9-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.hb-yj9-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hb-yj9-chip {
  height: 34px;
  padding: 0 14px;
  border: 1px solid #e4e4e7;
  border-radius: 999px;
  background: #fff;
  color: #3f3f46;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s ease;
}
.hb-yj9-chip:hover { border-color: #a1a1aa; }
.hb-yj9-chip:focus-visible { outline: 2px solid var(--hb-yj9-accent); outline-offset: 2px; }
.hb-yj9-chip[aria-pressed="true"] { background: #111113; border-color: #111113; color: #fff; }
.hb-yj9-count { color: #71717a; font-size: 13px; }
.hb-yj9-list { display: grid; gap: 12px; }
@container (min-width: 1100px) { .hb-yj9-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.hb-yj9-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ececee;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(17, 17, 19, .03);
  animation: hb-yj9-in .45s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-yj9-i) * 60ms);
}
.hb-yj9-top { display: flex; align-items: center; gap: 10px; }
.hb-yj9-av {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-size: 13px;
  font-weight: 650;
}
.hb-yj9-who { min-width: 0; flex: 1; font-size: 14px; font-weight: 600; }
.hb-yj9-who span { display: block; color: #71717a; font-size: 12px; font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yj9-ver {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yj9-accent) 12%, transparent);
  color: var(--hb-yj9-accent);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.hb-yj9-rline { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
.hb-yj9-rline .hb-yj9-stars svg { width: 14px; height: 14px; }
.hb-yj9-date { color: #a1a1aa; font-size: 12px; }
.hb-yj9-card h4 { margin: 8px 0 0; font-size: 15.5px; line-height: 1.35; letter-spacing: -.01em; font-weight: 640; }
.hb-yj9-card p { margin: 6px 0 0; color: #52525b; font-size: 14px; line-height: 1.55; }
.hb-yj9-variant { margin-top: 10px; color: #71717a; font-size: 12.5px; }
.hb-yj9-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 14px;
  color: #71717a;
  font-size: 12.5px;
}
.hb-yj9-foot > span { margin-right: 4px; }
.hb-yj9-vote {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #e4e4e7;
  border-radius: 999px;
  background: #fff;
  color: #3f3f46;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: all .2s ease;
}
.hb-yj9-vote:hover { border-color: #a1a1aa; }
.hb-yj9-vote:focus-visible { outline: 2px solid var(--hb-yj9-accent); outline-offset: 2px; }
.hb-yj9-vote[aria-pressed="true"] { border-color: var(--hb-yj9-accent); background: color-mix(in srgb, var(--hb-yj9-accent) 10%, #fff); color: var(--hb-yj9-accent); }
.hb-yj9-vote[aria-pressed="true"] svg { animation: hb-yj9-pop .45s cubic-bezier(.3, 1.6, .5, 1); }
.hb-yj9-empty { padding: 40px 20px; border: 1px dashed #e4e4e7; border-radius: 16px; color: #71717a; font-size: 14px; text-align: center; }
@keyframes hb-yj9-grow { from { transform: scaleX(0); } }
@keyframes hb-yj9-in { from { opacity: 0; transform: translateY(10px); } }
@keyframes hb-yj9-pop { 40% { transform: scale(1.45) rotate(-12deg); } }
@keyframes hb-yj9-ring { from { stroke-dashoffset: 113.1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj9 *, .hb-yj9 *::before, .hb-yj9 *::after { animation: none !important; transition: none !important; }
}
`;

const avatarColors = ["#0ea5e9", "#f97316", "#8b5cf6", "#14b8a6", "#e11d48", "#65a30d"];

function Stars({ value }: { value: number }) {
  return (
    <span className="hb-yj9-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
          <path d="m10 1.8 2.5 5.1 5.6.8-4 4 1 5.5-5.1-2.6-5 2.6 1-5.5-4.1-4 5.6-.8Z" fill={i <= Math.round(value) ? "currentColor" : "#e4e4e7"} />
        </svg>
      ))}
    </span>
  );
}

function Thumb({ down }: { down?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={down ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M5 7v7H2.5V7H5Zm0 0 3-5c1.2 0 2 .8 2 2v2h3.2c.9 0 1.5.8 1.3 1.6l-1.2 5A1.6 1.6 0 0 1 11.7 14H5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopReviews({
  eyebrow = "Customer reviews",
  title = "What people say",
  productName = "Alpine Down Jacket",
  reviews = defaultReviews,
  totalReviews = 1284,
  distribution = [78, 14, 5, 2, 1],
  filters = ["All", "Verified", "Warmth", "Fit", "Quality"],
  recommendRate = 94,
  writeLabel = "Write a review",
  accent = "#16a34a",
  onWriteReview,
  onVote,
  onFilterChange,
  className,
  style,
  ...rest
}: ShopReviewsProps) {
  const [filter, setFilter] = React.useState(filters[0] ?? "All");
  const [stars, setStars] = React.useState<number | null>(null);
  const [votes, setVotes] = React.useState<Record<string, "up" | "down" | undefined>>({});

  const avg = React.useMemo(() => {
    const sum = distribution.reduce((a, b) => a + b, 0) || 1;
    return distribution.reduce((acc, v, i) => acc + v * (5 - i), 0) / sum;
  }, [distribution]);

  const shown = reviews.filter((r) => {
    if (stars !== null && Math.round(r.rating) !== stars) return false;
    if (filter === filters[0]) return true;
    if (filter === "Verified") return !!r.verified;
    return (r.tags ?? []).includes(filter);
  });

  const pickFilter = (f: string) => {
    setFilter(f);
    onFilterChange?.(f, stars);
  };

  const pickStars = (s: number) => {
    const next = stars === s ? null : s;
    setStars(next);
    onFilterChange?.(filter, next);
  };

  const vote = (r: ShopReview, v: "up" | "down") => {
    setVotes((m) => ({ ...m, [r.id]: m[r.id] === v ? undefined : v }));
    onVote?.(r, v);
  };

  const C = 2 * Math.PI * 18;

  return (
    <section
      className={["hb-yj9", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj9-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-reviews" precedence="default">{css}</style>
      <div className="hb-yj9-inner">
        <div>
          {eyebrow ? <p className="hb-yj9-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yj9-title">{title}</h2>
          <div className="hb-yj9-summary">
            <span className="hb-yj9-avg">{avg.toFixed(1)}</span>
            <span>
              <Stars value={avg} />
              <span className="hb-yj9-total">Based on {totalReviews.toLocaleString("en-US")} reviews</span>
            </span>
          </div>
          <div className="hb-yj9-hist" role="group" aria-label="Filter by star rating">
            {distribution.slice(0, 5).map((v, i) => {
              const s = 5 - i;
              return (
                <button key={s} type="button" className="hb-yj9-hrow" aria-pressed={stars === s} onClick={() => pickStars(s)}>
                  <span>{s} star</span>
                  <span className="hb-yj9-track">
                    <span className="hb-yj9-fill" style={{ display: "block", width: `${Math.min(100, Math.max(0, v)).toFixed(1)}%`, animationDelay: `${(i * 0.07).toFixed(2)}s` }} />
                  </span>
                  <span>{v}%</span>
                </button>
              );
            })}
          </div>
          <div className="hb-yj9-rec">
            <svg className="hb-yj9-ring" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#ececee" strokeWidth="5" />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="var(--hb-yj9-accent)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={C.toFixed(1)}
                strokeDashoffset={(C * (1 - recommendRate / 100)).toFixed(1)}
                transform="rotate(-90 22 22)"
              />
            </svg>
            <span>
              <b>{recommendRate}%</b> of buyers would recommend the {productName} to a friend.
            </span>
          </div>
          <button type="button" className="hb-yj9-write" onClick={onWriteReview}>
            {writeLabel}
          </button>
        </div>
        <div>
          <div className="hb-yj9-bar">
            <div className="hb-yj9-chips" role="group" aria-label="Filter reviews">
              {filters.map((f) => (
                <button key={f} type="button" className="hb-yj9-chip" aria-pressed={filter === f} onClick={() => pickFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            <span className="hb-yj9-count" aria-live="polite">
              {stars !== null ? `${stars} star · ` : ""}
              {shown.length} of {reviews.length} shown
            </span>
          </div>
          <div className="hb-yj9-list" key={`${filter}-${stars}`}>
            {shown.length === 0 ? <div className="hb-yj9-empty">No reviews match these filters yet.</div> : null}
            {shown.map((r, i) => {
              const v = votes[r.id];
              const up = (r.helpful ?? 0) + (v === "up" ? 1 : 0);
              return (
                <article key={r.id} className="hb-yj9-card" style={{ "--hb-yj9-i": i } as React.CSSProperties}>
                  <div className="hb-yj9-top">
                    <span className="hb-yj9-av" style={{ background: avatarColors[i % avatarColors.length] }}>
                      {r.author.charAt(0)}
                    </span>
                    <span className="hb-yj9-who">
                      {r.author}
                      {r.location ? <span>{r.location}</span> : null}
                    </span>
                    {r.verified ? (
                      <span className="hb-yj9-ver">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="m3.5 8.3 3 3 6-6.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Verified
                      </span>
                    ) : null}
                  </div>
                  <div className="hb-yj9-rline">
                    <Stars value={r.rating} />
                    <span className="hb-yj9-date">{r.date}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.body}</p>
                  {r.variant ? <div className="hb-yj9-variant">Purchased: {r.variant}</div> : null}
                  <div className="hb-yj9-foot">
                    <span>Helpful?</span>
                    <button type="button" className="hb-yj9-vote" aria-pressed={v === "up"} onClick={() => vote(r, "up")} aria-label={`Yes, helpful (${up})`}>
                      <Thumb />
                      {up}
                    </button>
                    <button type="button" className="hb-yj9-vote" aria-pressed={v === "down"} onClick={() => vote(r, "down")} aria-label="Not helpful">
                      <Thumb down />
                      No
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

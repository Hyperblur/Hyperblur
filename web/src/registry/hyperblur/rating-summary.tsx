"use client";

import * as React from "react";

export interface RatingCounts {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface RatingSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  counts?: RatingCounts | number[];
  color?: string;
  showPercent?: boolean;
}

const css = `
.hb-rs {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
}
.hb-rs *, .hb-rs *::before, .hb-rs *::after { box-sizing: border-box; }
.hb-rs-sum {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
.hb-rs-avg {
  font-size: 44px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hb-rs-stars { display: inline-flex; }
.hb-rs-star {
  position: relative;
  flex: none;
  width: 14px;
  height: 14px;
}
.hb-rs-star svg {
  position: absolute;
  inset: 0;
  width: 14px;
  height: 14px;
  display: block;
}
.hb-rs-star-b { fill: rgba(255, 255, 255, 0.14); }
.hb-rs-star-f {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}
.hb-rs-star-f svg { fill: var(--hb-c); }
.hb-rs-total { color: #8f8f8f; white-space: nowrap; }
.hb-rs-bars {
  display: grid;
  flex: 1;
  gap: 6px;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-rs-row {
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) 36px;
  align-items: center;
  gap: 8px;
}
.hb-rs-lab {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #bdbdbd;
  font-variant-numeric: tabular-nums;
}
.hb-rs-lab svg { width: 10px; height: 10px; fill: #8f8f8f; }
.hb-rs-track {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #262626;
}
.hb-rs-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--hb-c);
  transform-origin: left center;
  animation: hb-rs-grow 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-i) * 70ms);
}
.hb-rs-val {
  color: #8f8f8f;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.hb-rs-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-rs-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-rs-fill { animation: none; }
}
`;

const starPath =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

const sample: RatingCounts = { 5: 1700, 4: 420, 3: 100, 2: 50, 1: 40 };

const levels = [5, 4, 3, 2, 1] as const;

function normalize(counts: RatingCounts | number[]): RatingCounts {
  const pick = (n: 1 | 2 | 3 | 4 | 5, i: number) => {
    const v = Array.isArray(counts) ? counts[i] : counts[n];
    return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 0;
  };
  return { 5: pick(5, 0), 4: pick(4, 1), 3: pick(3, 2), 2: pick(2, 3), 1: pick(1, 4) };
}

export function RatingSummary({
  counts = sample,
  color = "#f5b301",
  showPercent = true,
  className = "",
  style,
  ...rest
}: RatingSummaryProps) {
  const c = normalize(counts);
  const total = levels.reduce((sum, n) => sum + c[n], 0);
  const weighted = levels.reduce((sum, n) => sum + c[n] * n, 0);
  const average = total > 0 ? weighted / total : 0;
  const shown = average.toFixed(1);

  const vars = {
    "--hb-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-rs ${className}`} style={vars} {...rest}>
      <style href="hb-rating-summary" precedence="default">{css}</style>
      <div className="hb-rs-sum">
        <span className="hb-rs-avg">{shown}</span>
        <span className="hb-rs-stars" role="img" aria-label={`Average rating ${shown} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => {
            const fill = Math.min(1, Math.max(0, average - i));
            return (
              <span key={i} className="hb-rs-star" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="hb-rs-star-b">
                  <path d={starPath} />
                </svg>
                <span className="hb-rs-star-f" style={{ width: `${fill * 100}%` }}>
                  <svg viewBox="0 0 24 24">
                    <path d={starPath} />
                  </svg>
                </span>
              </span>
            );
          })}
        </span>
        <span className="hb-rs-total">{`${total.toLocaleString("en-US")} ${total === 1 ? "review" : "reviews"}`}</span>
      </div>
      <ul className="hb-rs-bars" role="list">
        {levels.map((n, i) => {
          const pct = total > 0 ? (c[n] / total) * 100 : 0;
          const rounded = Math.round(pct);
          return (
            <li key={n} className="hb-rs-row">
              <span className="hb-rs-sr">{`${n} stars: ${rounded}%, ${c[n].toLocaleString("en-US")} reviews`}</span>
              <span className="hb-rs-lab" aria-hidden="true">
                {n}
                <svg viewBox="0 0 24 24">
                  <path d={starPath} />
                </svg>
              </span>
              <span className="hb-rs-track" aria-hidden="true">
                <span
                  className="hb-rs-fill"
                  style={{ width: `${pct.toFixed(2)}%`, "--hb-i": i } as React.CSSProperties}
                />
              </span>
              <span className="hb-rs-val" aria-hidden="true">
                {showPercent ? `${rounded}%` : c[n].toLocaleString("en-US")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

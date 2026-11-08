"use client";

import * as React from "react";

export interface TickerReview {
  title: string;
  quote: string;
  name: string;
  meta: string;
  rating: number;
  source: string;
}

export interface TickerSource {
  name: string;
  score: string;
  count: string;
}

export interface ProofReviewTickerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  score?: number;
  total?: string;
  distribution?: number[];
  reviews?: TickerReview[];
  sources?: TickerSource[];
  interval?: number;
  autoPlay?: boolean;
  accent?: string;
}

const css = `
.hb-wb5 {
  --hb-wb5-accent: #34d399;
  --hb-wb5-card: 118px;
  --hb-wb5-gap: 12px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: linear-gradient(180deg, #0b0d0c, #0a0a0a);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb5 *, .hb-wb5 *::before, .hb-wb5 *::after { box-sizing: border-box; }
.hb-wb5-wrap { max-width: 1120px; margin: 0 auto; padding: 84px 24px 40px; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 56px; align-items: center; }
.hb-wb5-eyebrow { margin: 0 0 14px; color: var(--hb-wb5-accent); font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-wb5-title { margin: 0; font-size: clamp(26px, 3.4cqw, 38px); font-weight: 600; line-height: 1.08; letter-spacing: -.035em; text-wrap: balance; }
.hb-wb5-agg { display: flex; align-items: center; gap: 20px; margin-top: 28px; }
.hb-wb5-big { font-size: clamp(56px, 8cqw, 84px); font-weight: 600; line-height: .9; letter-spacing: -.06em; font-variant-numeric: tabular-nums; }
.hb-wb5-agg small { display: block; margin-top: 8px; color: #8f8f8f; font-size: 13px; }
.hb-wb5-stars { position: relative; display: inline-flex; gap: 3px; }
.hb-wb5-stars svg { width: 18px; height: 18px; }
.hb-wb5-stars[data-sm] svg { width: 13px; height: 13px; }
.hb-wb5-stars-base { color: #2a2a2a; display: inline-flex; gap: inherit; }
.hb-wb5-stars-top { position: absolute; inset: 0; display: inline-flex; gap: inherit; overflow: hidden; color: var(--hb-wb5-accent); white-space: nowrap; }
.hb-wb5-dist { display: grid; gap: 7px; margin: 26px 0 0; padding: 0; list-style: none; max-width: 360px; }
.hb-wb5-dist li { display: grid; grid-template-columns: 14px minmax(0, 1fr) 40px; align-items: center; gap: 10px; color: #8f8f8f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-wb5-dist li span:last-child { text-align: right; }
.hb-wb5-bar { height: 6px; border-radius: 6px; background: #1c1c1c; overflow: hidden; }
.hb-wb5-bar i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wb5-accent) 55%, transparent), var(--hb-wb5-accent)); transform-origin: left; animation: hb-wb5-grow 1.2s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-wb5-d) * 90ms + 200ms); }
.hb-wb5-win {
  position: relative;
  height: calc(var(--hb-wb5-card) * 3 + var(--hb-wb5-gap) * 2);
  -webkit-mask: linear-gradient(180deg, #000 70%, transparent);
  mask: linear-gradient(180deg, #000 70%, transparent);
}
.hb-wb5-card {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: var(--hb-wb5-card);
  padding: 16px 18px 14px 20px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 16px;
  background: linear-gradient(180deg, #141414, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  opacity: var(--hb-wb5-o, 1);
  transform: translateY(calc(var(--hb-wb5-slot) * (var(--hb-wb5-card) + var(--hb-wb5-gap)))) scale(var(--hb-wb5-sc, 1));
  transition: transform .9s cubic-bezier(.65, 0, .35, 1), opacity .7s ease, border-color .6s ease, background .6s ease;
  animation: hb-wb5-enter .9s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-wb5-card::before { content: ""; position: absolute; left: -1px; top: 18px; bottom: 18px; width: 2px; border-radius: 2px; background: var(--hb-wb5-accent); opacity: 0; transition: opacity .6s ease; }
.hb-wb5-card[data-slot="0"] { border-color: color-mix(in srgb, var(--hb-wb5-accent) 30%, rgba(255, 255, 255, .08)); background: linear-gradient(180deg, #161a18, #101211); }
.hb-wb5-card[data-slot="0"]::before { opacity: 1; }
.hb-wb5-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-wb5-src { display: inline-flex; align-items: center; gap: 7px; color: #a1a1a1; font-size: 12px; font-weight: 500; }
.hb-wb5-src i { width: 16px; height: 16px; border-radius: 5px; background: var(--hb-wb5-g); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3); }
.hb-wb5-card .hb-wb5-fill svg { animation: hb-wb5-pop .5s cubic-bezier(.3, 1.6, .5, 1) both; animation-delay: calc(var(--hb-wb5-k) * 80ms + 350ms); }
.hb-wb5-card b { display: block; margin-top: 9px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wb5-card p { margin: 4px 0 0; color: #a1a1a1; font-size: 13px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.hb-wb5-by { display: flex; align-items: center; gap: 6px; margin-top: 8px; color: #6f6f6f; font-size: 11.5px; }
.hb-wb5-by svg { color: var(--hb-wb5-accent); }
.hb-wb5-strip {
  position: relative;
  margin-top: 28px;
  padding: 18px 0 48px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.hb-wb5-lane { display: flex; width: max-content; gap: 48px; animation: hb-wb5-slide 40s linear infinite; }
.hb-wb5-strip:hover .hb-wb5-lane { animation-play-state: paused; }
.hb-wb5-chip { display: inline-flex; align-items: center; gap: 10px; color: #8f8f8f; font-size: 13px; white-space: nowrap; }
.hb-wb5-chip b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wb5-chip svg { width: 12px; height: 12px; color: var(--hb-wb5-accent); }
.hb-wb5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-wb5-grow { from { transform: scaleX(0); } }
@keyframes hb-wb5-enter { from { opacity: 0; filter: blur(6px); } }
@keyframes hb-wb5-pop { from { transform: scale(0) rotate(-40deg); opacity: 0; } }
@keyframes hb-wb5-slide { to { transform: translateX(-50%); } }
@container (max-width: 820px) {
  .hb-wb5-wrap { grid-template-columns: minmax(0, 1fr); gap: 36px; padding-top: 64px; }
}
@container (max-width: 460px) {
  .hb-wb5 { --hb-wb5-card: 128px; }
  .hb-wb5-wrap { padding: 56px 16px 32px; }
  .hb-wb5-card p { -webkit-line-clamp: 2; }
  .hb-wb5-card b { margin-top: 7px; }
  .hb-wb5-by { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb5-card, .hb-wb5-card::before { transition: none; animation: none; }
  .hb-wb5-bar i, .hb-wb5-card .hb-wb5-fill svg { animation: none; }
  .hb-wb5-lane { animation: none; }
}
`;

const srcTones: Record<string, string> = {
  Stackrank: "linear-gradient(135deg, #34d399, #047857)",
  Peerlist: "linear-gradient(135deg, #f97316, #9a3412)",
  "App Shelf": "linear-gradient(135deg, #60a5fa, #1e40af)",
  Trustgrid: "linear-gradient(135deg, #a78bfa, #5b21b6)",
};

const defaultReviews: TickerReview[] = [
  { title: "Replaced three tools in one afternoon", quote: "Docs, tasks and the team wiki now live together, and search finds everything.", name: "Olivia Grant", meta: "Product lead, 40 seats", rating: 5, source: "Stackrank" },
  { title: "The offline mode is the real deal", quote: "I edit on flights and it merges perfectly the moment I land.", name: "Kenji Watanabe", meta: "Consultant, 3 seats", rating: 5, source: "App Shelf" },
  { title: "Our onboarding doc finally gets read", quote: "Embedded checklists made new hire setup take a day instead of a week.", name: "Fatima Zahra", meta: "People ops, 120 seats", rating: 5, source: "Peerlist" },
  { title: "Fast, even with 9,000 pages", quote: "We migrated eight years of notes and it still opens instantly.", name: "Henrik Nilsson", meta: "CTO, 85 seats", rating: 4, source: "Trustgrid" },
  { title: "Permissions that make sense", quote: "Guests see exactly one folder and nothing else. Legal signed off in a day.", name: "Carmen Ruiz", meta: "IT admin, 300 seats", rating: 5, source: "Stackrank" },
  { title: "Support answered in four minutes", quote: "A real person with a fix and a short screen recording. On a Sunday.", name: "David Osei", meta: "Founder, 12 seats", rating: 5, source: "Peerlist" },
  { title: "Templates saved our sprint rituals", quote: "Retro, planning and standup notes now follow one shape across nine teams.", name: "Isabel Moreau", meta: "Agile coach, 210 seats", rating: 5, source: "App Shelf" },
  { title: "Wish the mobile editor did tables", quote: "Everything else on the phone is excellent, and they say tables ship soon.", name: "Pavel Novak", meta: "Engineer, 25 seats", rating: 4, source: "Trustgrid" },
];

const defaultSources: TickerSource[] = [
  { name: "Stackrank", score: "4.9", count: "1,204 reviews" },
  { name: "Peerlist", score: "4.8", count: "860 reviews" },
  { name: "App Shelf", score: "4.8", count: "3,410 ratings" },
  { name: "Trustgrid", score: "4.7", count: "512 reviews" },
  { name: "Leader, Knowledge base", score: "Fall 2026", count: "Stackrank report" },
  { name: "Easiest to use", score: "#1", count: "Peerlist mid-market" },
];

function StarPath() {
  return <path fill="currentColor" d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z" />;
}

function Stars({ value, small, pop }: { value: number; small?: boolean; pop?: boolean }) {
  const pct = Math.max(0, Math.min(1, value / 5)) * 100;
  return (
    <span className="hb-wb5-stars" data-sm={small ? "" : undefined} aria-label={`${value} out of 5 stars`} role="img">
      <span className="hb-wb5-stars-base">
        {[0, 1, 2, 3, 4].map((k) => <svg key={k} viewBox="0 0 20 20" aria-hidden="true"><StarPath /></svg>)}
      </span>
      <span className={`hb-wb5-stars-top${pop ? " hb-wb5-fill" : ""}`} style={{ width: `${pct.toFixed(1)}%` }}>
        {[0, 1, 2, 3, 4].map((k) => (
          <svg key={k} viewBox="0 0 20 20" aria-hidden="true" style={{ "--hb-wb5-k": k, flex: "none" } as React.CSSProperties}><StarPath /></svg>
        ))}
      </span>
    </span>
  );
}

export function ProofReviewTicker({
  eyebrow = "Rated by 6,000+ teams",
  title = "People who write for a living love Folio",
  score = 4.8,
  total = "Based on 5,986 reviews",
  distribution = [82, 13, 3, 1, 1],
  reviews = defaultReviews,
  sources = defaultSources,
  interval = 3200,
  autoPlay = true,
  accent = "#34d399",
  className = "",
  style,
  ...rest
}: ProofReviewTickerProps) {
  const uid = React.useId();
  const n = reviews.length;
  const [head, setHead] = React.useState(0);
  const paused = React.useRef(false);

  React.useEffect(() => {
    if (!autoPlay || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) setHead((h) => h + 1);
    }, Math.max(interval, 1200));
    return () => window.clearInterval(id);
  }, [autoPlay, interval, n]);

  const slots = n ? [-1, 0, 1, 2, 3] : [];
  const vars = { "--hb-wb5-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wb5 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-review-ticker" precedence="default">{css}</style>
      <div className="hb-wb5-wrap">
        <div>
          <p className="hb-wb5-eyebrow">{eyebrow}</p>
          <h2 id={`${uid}-t`} className="hb-wb5-title">{title}</h2>
          <div className="hb-wb5-agg">
            <span className="hb-wb5-big">{score.toFixed(1)}</span>
            <div>
              <Stars value={score} />
              <small>{total}</small>
            </div>
          </div>
          <ul className="hb-wb5-dist" aria-label="Rating distribution">
            {distribution.slice(0, 5).map((v, i) => (
              <li key={i}>
                <span>{5 - i}</span>
                <span className="hb-wb5-bar"><i style={{ width: `${Math.max(0, Math.min(100, v))}%`, "--hb-wb5-d": i } as React.CSSProperties} /></span>
                <span>{`${v}%`}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="hb-wb5-win"
          onPointerEnter={() => { paused.current = true; }}
          onPointerLeave={() => { paused.current = false; }}
          onFocus={() => { paused.current = true; }}
          onBlur={() => { paused.current = false; }}
        >
          <ul className="hb-wb5-sr">
            {reviews.map((r, i) => (
              <li key={i}>{`${r.rating} stars. ${r.title}. ${r.quote} ${r.name}, ${r.meta}, via ${r.source}.`}</li>
            ))}
          </ul>
          {slots.map((slot) => {
            const abs = head + slot;
            if (abs < 0) return null;
            const r = reviews[abs % n];
            const o = slot < 0 ? 0 : slot === 0 ? 1 : slot === 1 ? 0.8 : slot === 2 ? 0.55 : 0.3;
            const sc = slot < 0 ? 0.94 : 1;
            return (
              <article
                key={abs}
                className="hb-wb5-card"
                data-slot={slot}
                aria-hidden="true"
                style={{ "--hb-wb5-slot": slot, "--hb-wb5-o": o, "--hb-wb5-sc": sc } as React.CSSProperties}
              >
                <div className="hb-wb5-row">
                  <span className="hb-wb5-src">
                    <i style={{ "--hb-wb5-g": srcTones[r.source] ?? "linear-gradient(135deg, #8f8f8f, #3a3a3a)" } as React.CSSProperties} />
                    {r.source}
                  </span>
                  <Stars value={r.rating} small pop />
                </div>
                <b>{r.title}</b>
                <p>{r.quote}</p>
                <div className="hb-wb5-by">
                  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1l1.8 1.3 2.2-.1.7 2.1 1.8 1.3-.7 2.1.7 2.1-1.8 1.3-.7 2.1-2.2-.1L8 15l-1.8-1.3-2.2.1-.7-2.1L1.5 10.4l.7-2.1-.7-2.1 1.8-1.3.7-2.1 2.2.1z" fill="currentColor" opacity=".25" /><path d="M5.5 8.2l1.7 1.6 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {`${r.name}, ${r.meta}`}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="hb-wb5-strip" role="group" aria-label="Ratings on review sites">
        <div className="hb-wb5-lane">
          {[0, 1].map((dup) =>
            sources.map((s, i) => (
              <span key={`${dup}-${i}`} className="hb-wb5-chip" aria-hidden={dup === 1 ? true : undefined}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><StarPath /></svg>
                <b>{s.score}</b>
                {`${s.name}, ${s.count}`}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

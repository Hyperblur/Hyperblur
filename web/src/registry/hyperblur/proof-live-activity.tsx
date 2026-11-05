"use client";

import * as React from "react";

export interface ProofActivity {
  name: string;
  city: string;
  action: string;
  time: string;
  color?: string;
}

export interface ProofRatingSource {
  name: string;
  score: number;
}

export interface ProofLiveActivityProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: string;
  distribution?: number[];
  sources?: ProofRatingSource[];
  activities?: ProofActivity[];
  liveLabel?: string;
  interval?: number;
  cta?: { label: string; href: string };
  accent?: string;
  onActivityChange?: (activity: ProofActivity, index: number) => void;
}

const defaultActivities: ProofActivity[] = [
  { name: "Maya", city: "Lisbon", action: "just joined the Team plan", time: "now", color: "#f59e0b" },
  { name: "Tobias", city: "Hamburg", action: "left a 5 star review", time: "1 min ago", color: "#10b981" },
  { name: "Aiko", city: "Osaka", action: "invited 6 teammates", time: "2 min ago", color: "#6366f1" },
  { name: "Lucas", city: "São Paulo", action: "upgraded to Pro yearly", time: "3 min ago", color: "#ef4444" },
  { name: "Freya", city: "Copenhagen", action: "published her first board", time: "4 min ago", color: "#0ea5e9" },
  { name: "Omar", city: "Dubai", action: "started a free trial", time: "6 min ago", color: "#8b5cf6" },
  { name: "Clara", city: "Montréal", action: "connected Slack and Linear", time: "7 min ago", color: "#ec4899" },
];

const defaultSources: ProofRatingSource[] = [
  { name: "Stackrank", score: 4.9 },
  { name: "Reviewly", score: 4.8 },
  { name: "App Store", score: 4.9 },
];

const ROW = 74;

const css = `
.hb-yj4 {
  --hb-yj4-accent: #f59e0b;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #ffffff;
  color: #111111;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj4 *, .hb-yj4 *::before, .hb-yj4 *::after { box-sizing: border-box; }
.hb-yj4::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(40% 60% at 85% 50%, color-mix(in srgb, var(--hb-yj4-accent) 12%, transparent), transparent 70%),
    radial-gradient(rgba(17, 17, 17, .06) 1px, transparent 1px) 0 0 / 20px 20px;
  -webkit-mask: linear-gradient(90deg, transparent, #000 40%);
  mask: linear-gradient(90deg, transparent, #000 40%);
  pointer-events: none;
}
.hb-yj4-inner {
  display: grid;
  gap: 40px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
}
@container (min-width: 820px) {
  .hb-yj4-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; padding: 104px 32px; }
}
.hb-yj4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  color: #6b6b6b;
  font-size: 13px;
  font-weight: 500;
}
.hb-yj4-eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, .18);
  animation: hb-yj4-pulse 2s ease-in-out infinite;
}
.hb-yj4-title {
  margin: 0;
  font-size: clamp(30px, 4.6cqw, 46px);
  line-height: 1.05;
  letter-spacing: -.035em;
  font-weight: 650;
  text-wrap: balance;
}
.hb-yj4-sub { margin: 16px 0 0; max-width: 460px; color: #5f5f5f; font-size: 16px; line-height: 1.6; }
.hb-yj4-rating {
  display: grid;
  gap: 22px;
  margin-top: 32px;
  padding: 22px;
  border: 1px solid rgba(17, 17, 17, .08);
  border-radius: 18px;
  background: linear-gradient(180deg, #fff, #fafafa);
  box-shadow: 0 1px 0 #fff inset, 0 12px 32px -18px rgba(17, 17, 17, .25);
}
@container (min-width: 480px) { .hb-yj4-rating { grid-template-columns: auto minmax(0, 1fr); align-items: center; } }
.hb-yj4-score { font-size: 56px; line-height: 1; letter-spacing: -.04em; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yj4-stars { display: flex; gap: 2px; margin-top: 8px; color: var(--hb-yj4-accent); }
.hb-yj4-stars svg { width: 16px; height: 16px; }
.hb-yj4-count { margin-top: 6px; color: #6b6b6b; font-size: 13px; }
.hb-yj4-bars { display: grid; gap: 7px; }
.hb-yj4-bar { display: grid; grid-template-columns: 14px minmax(0, 1fr) 36px; align-items: center; gap: 10px; color: #6b6b6b; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-yj4-track { height: 7px; border-radius: 99px; background: rgba(17, 17, 17, .07); overflow: hidden; }
.hb-yj4-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--hb-yj4-accent);
  transform-origin: left;
  animation: hb-yj4-grow 1.2s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-yj4-sources { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.hb-yj4-source {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 1px solid rgba(17, 17, 17, .08);
  border-radius: 999px;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
}
.hb-yj4-source b { color: #111; font-weight: 650; }
.hb-yj4-source span { color: #6b6b6b; }
.hb-yj4-feed {
  position: relative;
  padding: 18px;
  border: 1px solid rgba(17, 17, 17, .08);
  border-radius: 24px;
  background: linear-gradient(180deg, #fafafa, #f3f3f1);
  box-shadow: inset 0 1px 0 #fff;
}
.hb-yj4-feed-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 14px;
  font-size: 13px;
  font-weight: 600;
}
.hb-yj4-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(34, 197, 94, .12);
  color: #15803d;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-yj4-live::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: hb-yj4-pulse 1.4s ease-in-out infinite; }
.hb-yj4-stack {
  position: relative;
  overflow: hidden;
  -webkit-mask: linear-gradient(180deg, #000 70%, transparent);
  mask: linear-gradient(180deg, #000 70%, transparent);
}
.hb-yj4-toast {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 62px;
  padding: 0 14px;
  border: 1px solid rgba(17, 17, 17, .07);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(17, 17, 17, .04), 0 10px 24px -14px rgba(17, 17, 17, .2);
  transition: transform .6s cubic-bezier(.2, .8, .2, 1), opacity .6s ease;
}
.hb-yj4-new { animation: hb-yj4-in .6s cubic-bezier(.2, .9, .3, 1.15) both; }
.hb-yj4-av {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 650;
}
.hb-yj4-msg { min-width: 0; flex: 1; font-size: 13.5px; line-height: 1.3; }
.hb-yj4-msg b, .hb-yj4-msg span, .hb-yj4-msg small { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yj4-msg b { font-weight: 600; }
.hb-yj4-msg span { color: #5f5f5f; }
.hb-yj4-msg small { color: #9a9a9a; font-size: 11.5px; }
.hb-yj4-check { flex: none; color: #22c55e; }
.hb-yj4-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 4px 0;
  color: #6b6b6b;
  font-size: 13px;
}
.hb-yj4-foot a { color: #111; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(17, 17, 17, .2); }
.hb-yj4-foot a:hover { border-color: var(--hb-yj4-accent); }
.hb-yj4-foot a:focus-visible { outline: 2px solid var(--hb-yj4-accent); outline-offset: 3px; }
@keyframes hb-yj4-pulse { 50% { opacity: .45; } }
@keyframes hb-yj4-grow { from { transform: scaleX(0); } }
@keyframes hb-yj4-in { from { opacity: 0; transform: translateY(-24px) scale(.96); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj4 *, .hb-yj4 *::before, .hb-yj4 *::after { animation: none !important; transition: none !important; }
}
`;

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="m10 1.8 2.5 5.1 5.6.8-4 4 1 5.5-5.1-2.6-5 2.6 1-5.5-4.1-4 5.6-.8Z" />
    </svg>
  );
}

export function ProofLiveActivity({
  eyebrow = "Happening right now",
  title = "Joined by 12,000 teams this year, and counting",
  subtitle = "From two person studios to scaling startups, people pick Relay to plan their week in one calm place.",
  rating = 4.9,
  reviewCount = "from 2,418 reviews",
  distribution = [86, 9, 3, 1, 1],
  sources = defaultSources,
  activities = defaultActivities,
  liveLabel = "142 sign ups this week",
  interval = 2600,
  cta = { label: "Start free", href: "#" },
  accent = "#f59e0b",
  onActivityChange,
  className,
  style,
  ...rest
}: ProofLiveActivityProps) {
  const [tick, setTick] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const cb = React.useRef(onActivityChange);
  const n = activities.length;

  const acts = React.useRef(activities);

  React.useEffect(() => {
    cb.current = onActivityChange;
    acts.current = activities;
  }, [onActivityChange, activities]);

  React.useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, Math.max(800, interval));
    return () => window.clearInterval(id);
  }, [paused, n, interval]);

  React.useEffect(() => {
    if (tick === 0 || n === 0) return;
    cb.current?.(acts.current[tick % n], tick % n);
  }, [tick, n]);

  const visible = [0, 1, 2, 3, 4].map((k) => {
    const abs = tick - k;
    const idx = ((abs % n) + n) % n;
    return { k, abs, item: activities[idx] };
  });

  return (
    <section
      className={["hb-yj4", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-proof-live-activity" precedence="default">{css}</style>
      <div className="hb-yj4-inner">
        <div>
          {eyebrow ? <p className="hb-yj4-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yj4-title">{title}</h2>
          {subtitle ? <p className="hb-yj4-sub">{subtitle}</p> : null}
          <div className="hb-yj4-rating">
            <div>
              <div className="hb-yj4-score">{rating.toFixed(1)}</div>
              <div className="hb-yj4-stars" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <div className="hb-yj4-count">{reviewCount}</div>
            </div>
            <div className="hb-yj4-bars">
              {distribution.slice(0, 5).map((v, i) => (
                <div className="hb-yj4-bar" key={i}>
                  <span>{5 - i}</span>
                  <div className="hb-yj4-track">
                    <div className="hb-yj4-fill" style={{ width: `${Math.max(0, Math.min(100, v)).toFixed(1)}%`, animationDelay: `${(i * 0.08).toFixed(2)}s` }} />
                  </div>
                  <span>{v}%</span>
                </div>
              ))}
            </div>
          </div>
          {sources.length ? (
            <div className="hb-yj4-sources">
              {sources.map((s) => (
                <span className="hb-yj4-source" key={s.name}>
                  <b>{s.score.toFixed(1)}</b>
                  <span>{s.name}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="hb-yj4-feed" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <div className="hb-yj4-feed-head">
            <span>Recent activity</span>
            <span className="hb-yj4-live">Live</span>
          </div>
          <div className="hb-yj4-stack" style={{ height: ROW * 4 + 20 }} aria-live="polite" aria-atomic="false">
            {visible.map(({ k, abs, item }) => (
              <div
                key={abs}
                className={k === 0 && tick > 0 ? "hb-yj4-toast hb-yj4-new" : "hb-yj4-toast"}
                style={{ transform: `translateY(${k * ROW}px) scale(${(1 - k * 0.03).toFixed(2)})`, opacity: k >= 4 ? 0 : 1 - k * 0.18 }}
                aria-hidden={k !== 0}
              >
                <span className="hb-yj4-av" style={{ background: item.color ?? accent }}>
                  {item.name[0]}
                </span>
                <div className="hb-yj4-msg">
                  <b>
                    {item.name} from {item.city}
                  </b>
                  <span>{item.action}</span>
                  <small>{item.time}</small>
                </div>
                <svg className="hb-yj4-check" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" fill="currentColor" opacity=".15" />
                  <path d="m6.5 10.2 2.3 2.3 4.7-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
          <div className="hb-yj4-foot">
            <span>{liveLabel}</span>
            {cta ? <a href={cta.href}>{cta.label}</a> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

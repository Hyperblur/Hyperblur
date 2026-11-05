"use client";

import * as React from "react";

export interface AboutTimelineMilestone {
  year: string;
  title: string;
  text: string;
  stat?: string;
  statLabel?: string;
}

export interface AboutTimelineScrollProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  milestones?: AboutTimelineMilestone[];
  onMilestoneChange?: (index: number) => void;
  accent?: string;
}

const defaultMilestones: AboutTimelineMilestone[] = [
  { year: "2017", title: "A spreadsheet that refused to die", text: "Three freight planners in Rotterdam share one Excel file for routing. We build a tiny web app so they can stop emailing it around.", stat: "3", statLabel: "first users" },
  { year: "2018", title: "Seed round and a real office", text: "Harbour Ventures leads a 2.4 million seed. We move into a former bicycle shop near the Maas and hire our first designer.", stat: "$2.4M", statLabel: "seed" },
  { year: "2019", title: "Live tracking ships", text: "Vessel positions update every ten seconds. Customers start opening Tideline before their email in the morning.", stat: "140", statLabel: "carriers" },
  { year: "2021", title: "The remote year", text: "The office closes, the team triples, and we write the handbook that still guides how we work across nine countries.", stat: "62", statLabel: "people" },
  { year: "2023", title: "Series B and the API", text: "A 38 million round funds the public API. Two thousand developers build on it in the first quarter.", stat: "2,100", statLabel: "API teams" },
  { year: "2025", title: "One in six containers", text: "Tideline now plans routes for one in six containers that cross the North Sea, and we are just getting started.", stat: "17%", statLabel: "North Sea volume" },
];

const css = `
@keyframes hb-yg2-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}
.hb-yg2 {
  --hb-yg2-accent: #ff6b4a;
  --hb-yg2-ink: #1b1a17;
  --hb-yg2-muted: #6d6a62;
  --hb-yg2-p: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-yg2-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg2 *, .hb-yg2 *::before, .hb-yg2 *::after { box-sizing: border-box; }
.hb-yg2-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px 72px;
}
.hb-yg2-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}
.hb-yg2-eyebrow {
  color: var(--hb-yg2-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-yg2-title {
  max-width: 640px;
  margin: 12px 0 0;
  font-family: "Instrument Serif", ui-serif, Georgia, serif;
  font-size: clamp(36px, 5.6cqw, 60px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.hb-yg2-sub {
  max-width: 460px;
  margin: 16px 0 0;
  color: var(--hb-yg2-muted);
  font-size: 16px;
  line-height: 1.6;
}
.hb-yg2-nav { display: flex; gap: 8px; }
.hb-yg2-arrow {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(27, 26, 23, 0.14);
  border-radius: 50%;
  background: #fff;
  color: var(--hb-yg2-ink);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}
.hb-yg2-arrow:hover:not(:disabled) { background: var(--hb-yg2-ink); color: #f7f5ef; }
.hb-yg2-arrow:active:not(:disabled) { transform: scale(0.94); }
.hb-yg2-arrow:disabled { opacity: 0.35; cursor: default; }
.hb-yg2-arrow:focus-visible { outline: 2px solid var(--hb-yg2-accent); outline-offset: 2px; }
.hb-yg2-rail {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 18px;
}
.hb-yg2-rail::before, .hb-yg2-rail::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  border-radius: 2px;
}
.hb-yg2-rail::before { right: 0; background: rgba(27, 26, 23, 0.1); }
.hb-yg2-rail::after {
  width: 100%;
  background: var(--hb-yg2-accent);
  transform-origin: left;
  transform: scaleX(var(--hb-yg2-p));
  transition: transform 0.12s linear;
}
.hb-yg2-year {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  color: var(--hb-yg2-muted);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: color 0.2s ease;
}
.hb-yg2-year::before {
  content: "";
  position: absolute;
  top: -23px;
  left: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border: 2px solid #f7f5ef;
  border-radius: 50%;
  background: rgba(27, 26, 23, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;
}
.hb-yg2-year[aria-current="true"] { color: var(--hb-yg2-ink); }
.hb-yg2-year[aria-current="true"]::before { background: var(--hb-yg2-accent); transform: scale(1.4); }
.hb-yg2-year:focus-visible { outline: 2px solid var(--hb-yg2-accent); outline-offset: 4px; border-radius: 4px; }
.hb-yg2-track {
  display: flex;
  gap: 16px;
  margin: 28px -24px 0;
  padding: 4px 24px 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 24px;
  scrollbar-width: none;
  outline: none;
}
.hb-yg2-track::-webkit-scrollbar { display: none; }
.hb-yg2-track:focus-visible { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--hb-yg2-accent) 50%, transparent); border-radius: 12px; }
.hb-yg2-card {
  position: relative;
  flex: 0 0 min(82%, 330px);
  display: flex;
  flex-direction: column;
  min-height: 300px;
  padding: 26px;
  border: 1px solid rgba(27, 26, 23, 0.1);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(27, 26, 23, 0.04);
  scroll-snap-align: start;
  animation: hb-yg2-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}
.hb-yg2-card[data-active="true"] {
  border-color: color-mix(in srgb, var(--hb-yg2-accent) 40%, transparent);
  box-shadow: 0 24px 50px -28px color-mix(in srgb, var(--hb-yg2-accent) 60%, rgba(27, 26, 23, 0.4));
  transform: translateY(-4px);
}
.hb-yg2-big {
  font-family: "Instrument Serif", ui-serif, Georgia, serif;
  font-size: 64px;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(27, 26, 23, 0.35);
  transition: color 0.35s ease, -webkit-text-stroke-color 0.35s ease;
}
.hb-yg2-card[data-active="true"] .hb-yg2-big { color: var(--hb-yg2-accent); -webkit-text-stroke-color: transparent; }
.hb-yg2-card h3 {
  margin: 22px 0 0;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
}
.hb-yg2-card p {
  margin: 10px 0 0;
  color: var(--hb-yg2-muted);
  font-size: 14.5px;
  line-height: 1.6;
}
.hb-yg2-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px dashed rgba(27, 26, 23, 0.14);
}
.hb-yg2-stat strong { font-size: 22px; font-weight: 650; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-yg2-stat span { color: var(--hb-yg2-muted); font-size: 13px; }
.hb-yg2-spacer { flex: 0 0 1px; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg2-card { animation: none; }
  .hb-yg2-card, .hb-yg2-big, .hb-yg2-rail::after, .hb-yg2-year::before, .hb-yg2-arrow { transition: none; }
  .hb-yg2-track { scroll-behavior: auto; }
}
`;

export function AboutTimelineScroll({
  eyebrow = "Our story",
  title = "From one shared spreadsheet to the North Sea",
  subtitle = "Eight years of Tideline, one milestone at a time. Drag, scroll or use the arrows.",
  milestones = defaultMilestones,
  onMilestoneChange,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: AboutTimelineScrollProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [edges, setEdges] = React.useState({ start: true, end: false });
  const activeRef = React.useRef(0);

  const sync = React.useCallback(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;
    const max = track.scrollWidth - track.clientWidth;
    const p = max > 0 ? track.scrollLeft / max : 1;
    root.style.setProperty("--hb-yg2-p", p.toFixed(3));
    const left = track.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.getBoundingClientRect().left - left - 24);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (p > 0.995) best = milestones.length - 1;
    if (best !== activeRef.current) {
      activeRef.current = best;
      setActive(best);
      onMilestoneChange?.(best);
    }
    setEdges((prev) => {
      const next = { start: track.scrollLeft < 4, end: track.scrollLeft > max - 4 };
      return prev.start === next.start && prev.end === next.end ? prev : next;
    });
  }, [milestones.length, onMilestoneChange]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const frame = requestAnimationFrame(sync);
    const ro = new ResizeObserver(() => sync());
    ro.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [sync]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const el = cardRefs.current[i];
    if (!track || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: el.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(Math.min(active + 1, milestones.length - 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(Math.max(active - 1, 0)); }
    if (e.key === "Home") { e.preventDefault(); goTo(0); }
    if (e.key === "End") { e.preventDefault(); goTo(milestones.length - 1); }
  };

  return (
    <section ref={rootRef} className={`hb-yg2 ${className}`} style={{ "--hb-yg2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-timeline-scroll" precedence="default">{css}</style>
      <div className="hb-yg2-in">
        <div className="hb-yg2-top">
          <div>
            <span className="hb-yg2-eyebrow">{eyebrow}</span>
            <h2 className="hb-yg2-title">{title}</h2>
            <p className="hb-yg2-sub">{subtitle}</p>
          </div>
          <div className="hb-yg2-nav">
            <button type="button" className="hb-yg2-arrow" aria-label="Previous milestone" disabled={edges.start} onClick={() => goTo(Math.max(active - 1, 0))}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className="hb-yg2-arrow" aria-label="Next milestone" disabled={edges.end} onClick={() => goTo(Math.min(active + 1, milestones.length - 1))}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        <div className="hb-yg2-rail">
          {milestones.map((m, i) => (
            <button key={m.year + i} type="button" className="hb-yg2-year" aria-current={i === active} onClick={() => goTo(i)}>
              {m.year}
            </button>
          ))}
        </div>
        <div
          ref={trackRef}
          className="hb-yg2-track"
          tabIndex={0}
          role="region"
          aria-label="Company timeline"
          onScroll={sync}
          onKeyDown={onKey}
        >
          {milestones.map((m, i) => (
            <article
              key={m.year + i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="hb-yg2-card"
              data-active={i === active}
              style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
            >
              <span className="hb-yg2-big" aria-hidden="true">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              {m.stat && (
                <div className="hb-yg2-stat">
                  <strong>{m.stat}</strong>
                  <span>{m.statLabel}</span>
                </div>
              )}
            </article>
          ))}
          <span className="hb-yg2-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

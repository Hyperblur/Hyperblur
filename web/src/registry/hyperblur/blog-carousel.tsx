"use client";

import * as React from "react";

export interface CarouselPost {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
  cover?: string;
}

export interface BlogCarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  posts?: CarouselPost[];
  cta?: { label: string; href: string } | null;
  accent?: string;
  label?: string;
}

const defaultPosts: CarouselPost[] = [
  { title: "Inside the redesign of our mobile checkout", category: "Case study", author: "Hana Ito", date: "Oct 30", readTime: "9 min", href: "#" },
  { title: "Five SQL habits that saved us 40 hours a month", category: "Engineering", author: "Marcus Bell", date: "Oct 27", readTime: "7 min", href: "#" },
  { title: "Onboarding emails people actually open", category: "Growth", author: "Sofia Marín", date: "Oct 23", readTime: "6 min", href: "#" },
  { title: "Building a design system with three people", category: "Design", author: "Tomás Álvarez", date: "Oct 18", readTime: "11 min", href: "#" },
  { title: "What 2,000 support tickets taught us about docs", category: "Support", author: "Elin Berg", date: "Oct 12", readTime: "8 min", href: "#" },
  { title: "Incident review: the 14-minute search outage", category: "Reliability", author: "Priya Raman", date: "Oct 6", readTime: "10 min", href: "#" },
  { title: "Hiring our first developer advocate", category: "Company", author: "Noah Fischer", date: "Sep 30", readTime: "5 min", href: "#" },
];

const tones = [
  ["#1f1302", "#b45309", "#fcd34d"],
  ["#071a22", "#0e7490", "#67e8f9"],
  ["#1b0b22", "#9333ea", "#f0abfc"],
  ["#06190f", "#15803d", "#86efac"],
  ["#200a0a", "#dc2626", "#fda4af"],
  ["#0b1022", "#1d4ed8", "#93c5fd"],
];

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const css = `
.hb-ki4 {
  --hb-ki4-accent: #f5a524;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-ki4 *, .hb-ki4 *::before, .hb-ki4 *::after { box-sizing: border-box; }
.hb-ki4-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(56px, 9cqi, 104px) clamp(18px, 4cqi, 40px) 0;
}
.hb-ki4-head {
  display: grid;
  gap: 20px;
  margin-bottom: clamp(24px, 3.6cqi, 40px);
}
.hb-ki4-eyebrow {
  margin: 0 0 12px;
  color: var(--hb-ki4-accent);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-ki4-title {
  margin: 0;
  font-size: clamp(30px, 4.6cqi, 46px);
  font-weight: 650;
  line-height: 1.05;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ki4-sub {
  margin: 12px 0 0;
  max-width: 460px;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.6;
}
.hb-ki4-controls {
  display: flex;
  align-items: center;
  gap: 14px;
}
.hb-ki4-count {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 13px;
  color: #8f8f8f;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-ki4-count b { color: #ededed; font-weight: 500; }
.hb-ki4-meter {
  position: relative;
  flex: 1;
  min-width: 80px;
  height: 2px;
  border-radius: 2px;
  background: rgba(255,255,255,.1);
  overflow: hidden;
}
.hb-ki4-meter span {
  position: absolute;
  inset: 0;
  background: var(--hb-ki4-accent);
  transform-origin: left;
  transform: scaleX(var(--hb-ki4-p, .2));
  transition: transform .2s linear;
}
.hb-ki4-btns { display: flex; gap: 8px; }
.hb-ki4-btn {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
  color: #ededed;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, opacity .2s ease, transform .15s ease;
}
.hb-ki4-btn svg { width: 16px; height: 16px; }
.hb-ki4-btn:hover:not(:disabled) { border-color: var(--hb-ki4-accent); background: color-mix(in srgb, var(--hb-ki4-accent) 12%, #111); }
.hb-ki4-btn:active:not(:disabled) { transform: scale(.94); }
.hb-ki4-btn:disabled { opacity: .35; cursor: default; }
.hb-ki4-btn:focus-visible { outline: 2px solid var(--hb-ki4-accent); outline-offset: 2px; }
.hb-ki4-viewport {
  position: relative;
  padding-bottom: clamp(56px, 9cqi, 104px);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 var(--hb-ki4-l, 0px), #000 calc(100% - var(--hb-ki4-r, 72px)), transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 var(--hb-ki4-l, 0px), #000 calc(100% - var(--hb-ki4-r, 72px)), transparent 100%);
}
.hb-ki4-viewport[data-start="false"] { --hb-ki4-l: 72px; }
.hb-ki4-viewport[data-end="true"] { --hb-ki4-r: 0px; }
.hb-ki4-track {
  display: flex;
  gap: 18px;
  margin: 0;
  padding: 4px max(clamp(18px, 4cqi, 40px), calc((100cqi - 1120px) / 2 + clamp(18px, 4cqi, 40px))) 8px;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: max(clamp(18px, 4cqi, 40px), calc((100cqi - 1120px) / 2 + clamp(18px, 4cqi, 40px)));
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.hb-ki4-track::-webkit-scrollbar { display: none; }
.hb-ki4-track:focus-visible { outline: 2px solid var(--hb-ki4-accent); outline-offset: -2px; border-radius: 12px; }
.hb-ki4-slide {
  flex: none;
  width: clamp(250px, 31cqi, 340px);
  scroll-snap-align: start;
  animation: hb-ki4-in .8s cubic-bezier(.2,.7,.2,1) both;
  animation-delay: var(--hb-ki4-d, 0ms);
}
.hb-ki4-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition: border-color .25s ease, transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease;
}
.hb-ki4-card:hover {
  border-color: color-mix(in srgb, var(--hb-ki4-accent) 45%, rgba(255,255,255,.08));
  transform: translateY(-4px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 18px 40px -20px color-mix(in srgb, var(--hb-ki4-accent) 50%, transparent);
}
.hb-ki4-card:focus-visible { outline: 2px solid var(--hb-ki4-accent); outline-offset: 3px; }
.hb-ki4-cover {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.hb-ki4-layer {
  position: absolute;
  inset: -8%;
  transition: transform .7s cubic-bezier(.2,.7,.2,1);
}
.hb-ki4-card:hover .hb-ki4-layer { transform: translate3d(-3%, -2%, 0) scale(1.04); }
.hb-ki4-glyph {
  position: absolute;
  right: 16px;
  bottom: 6px;
  color: rgba(255,255,255,.9);
  font-family: var(--font-serif, "Instrument Serif", Georgia, serif);
  font-size: 92px;
  line-height: 1;
  letter-spacing: -.04em;
  mix-blend-mode: overlay;
  transition: transform .7s cubic-bezier(.2,.7,.2,1);
}
.hb-ki4-card:hover .hb-ki4-glyph { transform: translate3d(4%, -4%, 0); }
.hb-ki4-cat {
  position: absolute;
  left: 14px;
  top: 14px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(10,10,10,.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  line-height: 24px;
}
.hb-ki4-body { display: flex; flex: 1; flex-direction: column; gap: 14px; padding: 16px 18px 18px; }
.hb-ki4-ptitle {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -.015em;
  text-wrap: pretty;
}
.hb-ki4-meta {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: auto;
  min-width: 0;
  color: #8f8f8f;
  font-size: 12.5px;
  white-space: nowrap;
}
.hb-ki4-meta > span:not(.hb-ki4-sep):not(.hb-ki4-av):not(.hb-ki4-author) { flex: none; }
.hb-ki4-av {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.2);
}
.hb-ki4-meta > .hb-ki4-author { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #d4d4d4; font-weight: 500; }
.hb-ki4-sep { flex: none; width: 3px; height: 3px; border-radius: 50%; background: #4a4a4a; }
.hb-ki4-more {
  display: grid;
  place-items: center;
  height: 100%;
  min-height: 280px;
  border: 1px dashed rgba(255,255,255,.14);
  border-radius: 20px;
  color: #ededed;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease;
}
.hb-ki4-more span { display: inline-flex; align-items: center; gap: 8px; }
.hb-ki4-more svg { width: 16px; height: 16px; color: var(--hb-ki4-accent); transition: transform .25s ease; }
.hb-ki4-more:hover { border-color: var(--hb-ki4-accent); background: color-mix(in srgb, var(--hb-ki4-accent) 6%, transparent); }
.hb-ki4-more:hover svg { transform: translateX(4px); }
.hb-ki4-more:focus-visible { outline: 2px solid var(--hb-ki4-accent); outline-offset: 3px; }
@container (min-width: 720px) {
  .hb-ki4-head { grid-template-columns: 1fr minmax(260px, 340px); align-items: end; }
}
@keyframes hb-ki4-in {
  from { opacity: 0; transform: translateX(48px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ki4-slide { animation: none; }
  .hb-ki4-card, .hb-ki4-layer, .hb-ki4-glyph, .hb-ki4-btn, .hb-ki4-meter span, .hb-ki4-more svg { transition: none; }
  .hb-ki4-track { scroll-behavior: auto; }
}
`;

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function BlogCarousel({
  eyebrow = "Latest stories",
  title = "Fresh from the team",
  subtitle = "Case studies, incident reviews and the occasional strong opinion, written by the people who build Northwind.",
  posts = defaultPosts,
  cta = { label: "Browse the archive", href: "#" },
  accent = "#f5a524",
  label = "Latest stories",
  className,
  style,
  ...rest
}: BlogCarouselProps) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [state, setState] = React.useState({ start: true, end: false, progress: 0, index: 0 });
  const total = posts.length;

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const first = track.querySelector<HTMLElement>("li");
      const step = first ? first.offsetWidth + 18 : track.clientWidth;
      const progress = max > 0 ? track.scrollLeft / max : 1;
      const end = track.scrollLeft >= max - 2;
      const index = end ? Math.max(0, total - 1) : Math.min(total - 1, Math.round(track.scrollLeft / step));
      setState((prev) => {
        const next = { start: track.scrollLeft <= 2, end, progress, index };
        return prev.start === next.start && prev.end === next.end && prev.index === next.index && Math.abs(prev.progress - next.progress) < 0.002 ? prev : next;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    track.addEventListener("scroll", schedule, { passive: true });
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(track);
    return () => {
      track.removeEventListener("scroll", schedule);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>("li");
    const step = first ? first.offsetWidth + 18 : track.clientWidth * 0.8;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: step * direction, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const shown = Math.max(state.progress, total > 0 ? 1 / total : 0);

  return (
    <section
      className={className ? `hb-ki4 ${className}` : "hb-ki4"}
      style={{ "--hb-ki4-accent": accent, ...style } as React.CSSProperties}
      aria-roledescription="carousel"
      aria-label={label}
      {...rest}
    >
      <style href="hb-blog-carousel" precedence="default">{css}</style>
      <div className="hb-ki4-inner">
        <header className="hb-ki4-head">
          <div>
            {eyebrow && <p className="hb-ki4-eyebrow">{eyebrow}</p>}
            <h2 className="hb-ki4-title">{title}</h2>
            {subtitle && <p className="hb-ki4-sub">{subtitle}</p>}
          </div>
          <div className="hb-ki4-controls">
            <span className="hb-ki4-count" aria-live="polite">
              <b>{String(state.index + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
            </span>
            <span className="hb-ki4-meter" aria-hidden="true">
              <span style={{ "--hb-ki4-p": shown.toFixed(4) } as React.CSSProperties} />
            </span>
            <div className="hb-ki4-btns">
              <button type="button" className="hb-ki4-btn" aria-label="Previous stories" disabled={state.start} onClick={() => go(-1)}>
                <Arrow flip />
              </button>
              <button type="button" className="hb-ki4-btn" aria-label="Next stories" disabled={state.end} onClick={() => go(1)}>
                <Arrow />
              </button>
            </div>
          </div>
        </header>
      </div>
      <div className="hb-ki4-viewport" data-start={state.start} data-end={state.end}>
        <ul ref={trackRef} className="hb-ki4-track" tabIndex={0} aria-label="Stories, use arrow keys to scroll" onKeyDown={onKeyDown}>
          {posts.map((post, i) => {
            const seed = hash(post.title);
            const [deep, mid, light] = tones[(seed + i) % tones.length];
            const avatar = tones[hash(post.author) % tones.length];
            return (
              <li
                key={`${post.title}-${i}`}
                className="hb-ki4-slide"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
                style={{ "--hb-ki4-d": `${(Math.min(i, 4) * 80).toFixed(0)}ms` } as React.CSSProperties}
              >
                <a className="hb-ki4-card" href={post.href}>
                  <div className="hb-ki4-cover">
                    <div
                      className="hb-ki4-layer"
                      style={{
                        background:
                          post.cover ??
                          `radial-gradient(80% 70% at ${(20 + (seed % 50)).toFixed(0)}% 20%, ${light} 0%, transparent 55%), conic-gradient(from ${(seed % 360).toFixed(0)}deg at 70% 80%, ${mid}, ${deep}, ${mid}), ${deep}`,
                      }}
                    />
                    {!post.cover && <span className="hb-ki4-glyph" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}
                    <span className="hb-ki4-cat">{post.category}</span>
                  </div>
                  <div className="hb-ki4-body">
                    <h3 className="hb-ki4-ptitle">{post.title}</h3>
                    <div className="hb-ki4-meta">
                      <span className="hb-ki4-av" style={{ background: `linear-gradient(135deg, ${avatar[1]}, ${avatar[0]})` }} aria-hidden="true">
                        {initials(post.author)}
                      </span>
                      <span className="hb-ki4-author">{post.author}</span>
                      <span className="hb-ki4-sep" aria-hidden="true" />
                      <span>{post.date}</span>
                      <span className="hb-ki4-sep" aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
          {cta && (
            <li className="hb-ki4-slide" style={{ "--hb-ki4-d": "400ms" } as React.CSSProperties}>
              <a className="hb-ki4-more" href={cta.href}>
                <span>
                  {cta.label}
                  <Arrow />
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export type CinemaChapterMotif = "sun" | "waves" | "peaks" | "stars" | "city";

export interface CinemaChapter {
  id: string;
  title: string;
  synopsis: string;
  runtime: string;
  start: string;
  watched?: number;
  motif: CinemaChapterMotif;
  colors: [string, string];
}

export interface CinemaChapterSelectProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect" | "onPlay"> {
  film?: string;
  chapters?: CinemaChapter[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  onPlay?: (chapter: CinemaChapter) => void;
  playLabel?: string;
  headingAs?: "h1" | "h2";
}

const defaultChapters: CinemaChapter[] = [
  { id: "arrival", title: "Arrival", synopsis: "A ferry, a borrowed key and a lighthouse that nobody on the island admits is still lit.", runtime: "18 min", start: "00:00", watched: 1, motif: "waves", colors: ["#0f3a5c", "#7cc6e8"] },
  { id: "keeper", title: "The Keeper", synopsis: "Elena finds the logbook. Every entry for forty years ends with the same four numbers.", runtime: "22 min", start: "18:04", watched: 0.6, motif: "sun", colors: ["#5c1f0f", "#ffb35c"] },
  { id: "crossing", title: "The Crossing", synopsis: "A storm closes the harbor and the radio starts answering questions nobody asked.", runtime: "26 min", start: "40:12", watched: 0, motif: "peaks", colors: ["#1d1c3a", "#9a8cff"] },
  { id: "signal", title: "Signal", synopsis: "Tomas decodes the numbers. They are not coordinates. They are a date.", runtime: "19 min", start: "1:06:30", watched: 0, motif: "stars", colors: ["#04141a", "#4dffd2"] },
  { id: "return", title: "Return", synopsis: "The last boat leaves at dawn, and only one of them is on it.", runtime: "24 min", start: "1:25:48", watched: 0, motif: "city", colors: ["#2a0c1c", "#ff6aa8"] },
];

const css = `
.hb-vc12 {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  width: 100%;
  min-height: 600px;
  padding: clamp(24px, 5cqi, 56px);
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #050506;
  color: #f2f2f2;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc12 *, .hb-vc12 *::before, .hb-vc12 *::after { box-sizing: border-box; }
.hb-vc12-bg {
  position: absolute;
  inset: -10%;
  z-index: -2;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1s ease, transform 2.4s cubic-bezier(.2, .7, .2, 1);
}
.hb-vc12-bg[data-on="true"] { opacity: 1; transform: scale(1); }
.hb-vc12-veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, rgba(5, 5, 6, .92) 0%, rgba(5, 5, 6, .55) 55%, rgba(5, 5, 6, .3)), linear-gradient(0deg, rgba(5, 5, 6, .95), transparent 55%);
}
.hb-vc12-info { max-width: 520px; }
.hb-vc12-film {
  margin: 0 0 18px;
  color: rgba(242, 242, 242, .6);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .26em;
  text-transform: uppercase;
}
.hb-vc12-num {
  display: block;
  color: var(--hb-vc12-c);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  letter-spacing: .2em;
  text-transform: uppercase;
  transition: color .6s ease;
}
.hb-vc12-title {
  margin: 8px 0 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(40px, 7.6cqi, 92px);
  font-weight: 700;
  line-height: .92;
  letter-spacing: -.04em;
}
.hb-vc12-swap { animation: hb-vc12-swap .7s cubic-bezier(.2, .8, .2, 1) both; }
@keyframes hb-vc12-swap {
  from { opacity: 0; transform: translate3d(0, 12px, 0); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
.hb-vc12-syn {
  max-width: 420px;
  margin: 16px 0 0;
  color: rgba(242, 242, 242, .74);
  font-size: clamp(14px, 1.7cqi, 16px);
  line-height: 1.55;
}
.hb-vc12-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
}
.hb-vc12-play {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 22px 0 8px;
  border: 0;
  border-radius: 999px;
  background: #f2f2f2;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s ease, background .25s ease;
}
.hb-vc12-play span {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0a0a0a;
  color: #f2f2f2;
}
.hb-vc12-play:hover { background: #fff; }
.hb-vc12-play:active { transform: scale(.97); }
.hb-vc12-play:focus-visible, .hb-vc12-card:focus-visible { outline: 2px solid var(--hb-vc12-c); outline-offset: 3px; }
.hb-vc12-facts {
  color: rgba(242, 242, 242, .58);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11.5px;
  letter-spacing: .08em;
}
.hb-vc12-row {
  display: grid;
  grid-template-columns: repeat(var(--hb-vc12-n), minmax(0, 1fr));
  gap: clamp(8px, 1.4cqi, 16px);
  align-items: end;
  margin: 0;
  padding: 0;
}
.hb-vc12-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;
}
.hb-vc12-poster {
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .08), 0 18px 40px -20px rgba(0, 0, 0, .9);
  filter: saturate(.55) brightness(.7);
  transform: translate3d(0, 0, 0);
  transition: transform .6s cubic-bezier(.2, .8, .2, 1), filter .5s ease, box-shadow .5s ease;
}
.hb-vc12-poster svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vc12-card:hover .hb-vc12-poster { filter: saturate(.85) brightness(.9); transform: translate3d(0, -4px, 0); }
.hb-vc12-card[aria-checked="true"] .hb-vc12-poster {
  filter: none;
  transform: translate3d(0, -12px, 0) scale(1.04);
  box-shadow: 0 0 0 2px var(--hb-vc12-c), 0 30px 60px -24px var(--hb-vc12-c);
}
.hb-vc12-card[aria-checked="true"] .hb-vc12-poster::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, .35) 50%, transparent 70%);
  transform: translateX(-120%);
  animation: hb-vc12-glint 1.1s .15s cubic-bezier(.2, .7, .2, 1) both;
}
@keyframes hb-vc12-glint {
  to { transform: translateX(120%); }
}
.hb-vc12-pnum {
  position: absolute;
  left: 9%;
  top: 6%;
  color: rgba(255, 255, 255, .92);
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(16px, 3.4cqi, 38px);
  font-weight: 700;
  letter-spacing: -.03em;
}
.hb-vc12-ptitle {
  position: absolute;
  left: 9%;
  right: 9%;
  bottom: 7%;
  color: #fff;
  font-size: clamp(8px, 1.15cqi, 12px);
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-vc12-prog {
  display: block;
  height: 2px;
  margin-top: 10px;
  border-radius: 2px;
  background: rgba(255, 255, 255, .12);
  overflow: hidden;
}
.hb-vc12-prog span { display: block; height: 100%; background: var(--hb-vc12-c); }
.hb-vc12-time {
  margin-top: 6px;
  color: rgba(242, 242, 242, .5);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
}
@container (max-width: 520px) {
  .hb-vc12-time, .hb-vc12-ptitle { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc12-bg, .hb-vc12-poster, .hb-vc12-num { transition: none; }
  .hb-vc12-swap, .hb-vc12-card[aria-checked="true"] .hb-vc12-poster::after { animation: none; }
}
`;

function Motif({ motif, colors }: { motif: CinemaChapterMotif; colors: [string, string] }) {
  const [a, b] = colors;
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="300" fill={a} />
      <rect width="200" height="300" fill={b} opacity=".18" />
      {motif === "sun" ? (
        <>
          <circle cx="100" cy="170" r="56" fill={b} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="30" y={182 + i * 12} width="140" height={5 - i * 0.6} fill={a} />
          ))}
          <path d="M0 240 L200 240 L200 300 L0 300Z" fill={a} opacity=".9" />
        </>
      ) : null}
      {motif === "waves" ? (
        <>
          <rect x="94" y="80" width="12" height="110" fill={b} opacity=".85" />
          <path d="M88 80 L112 80 L106 64 L94 64Z" fill={b} />
          <path d="M100 66 L200 40 L200 92Z" fill={b} opacity=".25" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M-10 ${200 + i * 22} Q25 ${190 + i * 22} 50 ${200 + i * 22} T110 ${200 + i * 22} T170 ${200 + i * 22} T230 ${200 + i * 22}`} stroke={b} strokeWidth="2.5" fill="none" opacity={(0.9 - i * 0.18).toFixed(2)} />
          ))}
        </>
      ) : null}
      {motif === "peaks" ? (
        <>
          <circle cx="140" cy="90" r="18" fill={b} opacity=".9" />
          <path d="M-10 230 L60 130 L100 180 L140 110 L210 230Z" fill={b} opacity=".45" />
          <path d="M-10 260 L40 190 L90 240 L150 170 L210 260 L210 300 L-10 300Z" fill={a} />
          <path d="M-10 260 L40 190 L90 240 L150 170 L210 260" stroke={b} strokeWidth="1.5" fill="none" />
        </>
      ) : null}
      {motif === "stars" ? (
        <>
          {Array.from({ length: 40 }, (_, i) => {
            const h = Math.imul(i + 17, 2654435761) >>> 0;
            return <circle key={i} cx={h % 200} cy={(h >>> 8) % 220} r={((h >>> 4) % 3) * 0.5 + 0.5} fill={b} opacity={(0.3 + ((h >>> 12) % 70) / 100).toFixed(2)} />;
          })}
          <circle cx="100" cy="150" r="40" fill="none" stroke={b} strokeWidth="1.5" />
          <circle cx="100" cy="150" r="64" fill="none" stroke={b} strokeWidth=".8" opacity=".5" />
          <circle cx="100" cy="150" r="5" fill={b} />
        </>
      ) : null}
      {motif === "city" ? (
        <>
          <circle cx="60" cy="110" r="30" fill={b} opacity=".7" />
          {[[10, 190, 30], [44, 160, 26], [74, 200, 34], [112, 140, 28], [144, 180, 36], [184, 210, 20]].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height={300 - y} fill={a} stroke={b} strokeWidth=".8" strokeOpacity=".5" />
          ))}
        </>
      ) : null}
      <path d="M0 200 L200 200 L200 300 L0 300Z" fill="#000" opacity=".25" />
    </svg>
  );
}

export function CinemaChapterSelect({
  film = "The Long Quiet · Director's cut",
  chapters = defaultChapters,
  value,
  defaultValue,
  onValueChange,
  onPlay,
  playLabel = "Play chapter",
  headingAs = "h2",
  className,
  style,
  ...rest
}: CinemaChapterSelectProps) {
  const Heading = headingAs;
  const [inner, setInner] = React.useState(defaultValue ?? chapters[1]?.id ?? chapters[0]?.id ?? "");
  const current = value ?? inner;
  const index = Math.max(0, chapters.findIndex((c) => c.id === current));
  const chapter = chapters[index];
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const c = chapters[(i + chapters.length) % chapters.length];
    if (!c) return;
    if (value === undefined) setInner(c.id);
    onValueChange?.(c.id);
    if (focus) refs.current[(i + chapters.length) % chapters.length]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(index + 1, true); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(index - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); select(0, true); }
    else if (e.key === "End") { e.preventDefault(); select(chapters.length - 1, true); }
  };

  if (!chapter) return null;
  const vars = { "--hb-vc12-c": chapter.colors[1], "--hb-vc12-n": String(chapters.length), ...style } as React.CSSProperties;

  return (
    <section className={["hb-vc12", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-chapter-select" precedence="default">{css}</style>
      {chapters.map((c) => (
        <div
          key={c.id}
          className="hb-vc12-bg"
          data-on={c.id === chapter.id ? "true" : "false"}
          aria-hidden="true"
          style={{ background: `radial-gradient(60% 70% at 72% 40%, ${c.colors[1]}55, transparent 70%), radial-gradient(80% 80% at 90% 90%, ${c.colors[0]}, transparent 70%), ${c.colors[0]}33` }}
        />
      ))}
      <div className="hb-vc12-veil" aria-hidden="true" />
      <div className="hb-vc12-info">
        {film ? <p className="hb-vc12-film">{film}</p> : null}
        <div className="hb-vc12-swap" key={chapter.id}>
          <span className="hb-vc12-num">Chapter {String(index + 1).padStart(2, "0")} of {String(chapters.length).padStart(2, "0")}</span>
          <Heading className="hb-vc12-title">{chapter.title}</Heading>
          <p className="hb-vc12-syn">{chapter.synopsis}</p>
        </div>
        <div className="hb-vc12-meta">
          <button type="button" className="hb-vc12-play" onClick={() => onPlay?.(chapter)}>
            <span aria-hidden="true">
              <svg width="10" height="11" viewBox="0 0 8 9"><path d="M0 0 L8 4.5 L0 9Z" fill="currentColor" /></svg>
            </span>
            {chapter.watched && chapter.watched > 0 && chapter.watched < 1 ? "Resume chapter" : playLabel}
          </button>
          <span className="hb-vc12-facts">{chapter.runtime} · starts at {chapter.start}</span>
        </div>
      </div>
      <div className="hb-vc12-row" role="radiogroup" aria-label="Chapters" onKeyDown={onKey}>
        {chapters.map((c, i) => (
          <button
            key={c.id}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            role="radio"
            aria-checked={c.id === chapter.id}
            aria-label={`Chapter ${i + 1}: ${c.title}, ${c.runtime}`}
            tabIndex={c.id === chapter.id ? 0 : -1}
            className="hb-vc12-card"
            style={{ "--hb-vc12-c": c.colors[1] } as React.CSSProperties}
            onClick={() => select(i)}
          >
            <span className="hb-vc12-poster">
              <Motif motif={c.motif} colors={c.colors} />
              <span className="hb-vc12-pnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-vc12-ptitle">{c.title}</span>
            </span>
            <span className="hb-vc12-prog"><span style={{ width: `${Math.round((c.watched ?? 0) * 100)}%` }} /></span>
            <span className="hb-vc12-time">{c.start}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

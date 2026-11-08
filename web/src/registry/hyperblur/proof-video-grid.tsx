"use client";

import * as React from "react";

export interface VideoStory {
  name: string;
  role: string;
  company: string;
  duration: number;
  captions: string[];
  backdrop?: [string, string];
  skin?: string;
  hair?: string;
  cloth?: string;
}

export interface ProofVideoGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  stories?: VideoStory[];
  defaultIndex?: number;
  defaultPlaying?: boolean;
  accent?: string;
  onStoryPlay?: (index: number) => void;
}

const css = `
.hb-wb4 {
  --hb-wb4-accent: #e8590c;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #141414;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb4 *, .hb-wb4 *::before, .hb-wb4 *::after { box-sizing: border-box; }
.hb-wb4-wrap { max-width: 1120px; margin: 0 auto; padding: 80px 24px 88px; }
.hb-wb4-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
.hb-wb4-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #6b6b6b; font-size: 13px; font-weight: 500; }
.hb-wb4-rec { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wb4-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wb4-accent) 18%, transparent); animation: hb-wb4-blink 1.6s ease-in-out infinite; }
.hb-wb4-title { margin: 0; max-width: 560px; font-size: clamp(28px, 4cqw, 44px); font-weight: 600; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-wb4-sub { margin: 0; max-width: 300px; color: #6b6b6b; font-size: 14.5px; line-height: 1.55; }
.hb-wb4-grid { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 20px; }
.hb-wb4-player {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 20px;
  background: #111;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .6) inset, 0 2px 4px rgba(0, 0, 0, .06), 0 30px 60px -30px rgba(40, 30, 10, .45);
}
.hb-wb4-art {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: radial-gradient(70% 90% at 70% 20%, var(--hb-wb4-b1), var(--hb-wb4-b2));
}
.hb-wb4-art::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(9% 14% at 18% 30%, rgba(255, 255, 255, .22), transparent 70%),
    radial-gradient(6% 9% at 28% 62%, rgba(255, 255, 255, .14), transparent 70%),
    radial-gradient(12% 18% at 86% 70%, rgba(255, 220, 160, .18), transparent 70%),
    linear-gradient(90deg, rgba(0, 0, 0, .25), transparent 30%, transparent 70%, rgba(0, 0, 0, .3));
}
.hb-wb4-body {
  position: absolute;
  left: 50%;
  bottom: -6%;
  width: 54%;
  height: 40%;
  border-radius: 46% 46% 10% 10% / 70% 70% 10% 10%;
  background: linear-gradient(180deg, var(--hb-wb4-cl), color-mix(in srgb, var(--hb-wb4-cl) 60%, #000));
  transform: translateX(-46%);
  box-shadow: inset 0 6px 14px rgba(255, 255, 255, .12);
}
.hb-wb4-neck { position: absolute; left: 50%; bottom: 30%; width: 11%; height: 14%; border-radius: 30%; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wb4-sk) 70%, #000), var(--hb-wb4-sk)); transform: translateX(-38%); }
.hb-wb4-head2 {
  position: absolute;
  left: 50%;
  top: 22%;
  width: 21%;
  aspect-ratio: .82;
  border-radius: 46% 46% 44% 44% / 52% 52% 48% 48%;
  background: radial-gradient(70% 60% at 38% 40%, color-mix(in srgb, var(--hb-wb4-sk) 85%, #fff), var(--hb-wb4-sk) 60%, color-mix(in srgb, var(--hb-wb4-sk) 70%, #000));
  transform: translateX(-42%) rotate(-3deg);
  animation: hb-wb4-nod 4.8s ease-in-out infinite;
  animation-play-state: var(--hb-wb4-run, paused);
}
.hb-wb4-hair { position: absolute; inset: -8% -6% 52% -6%; border-radius: 50% 50% 30% 30% / 70% 70% 30% 30%; background: linear-gradient(160deg, color-mix(in srgb, var(--hb-wb4-hr) 80%, #fff), var(--hb-wb4-hr)); }
.hb-wb4-vig { position: absolute; inset: 0; background: radial-gradient(90% 90% at 50% 40%, transparent 55%, rgba(0, 0, 0, .45)); pointer-events: none; }
.hb-wb4-play {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .35);
  border-radius: 50%;
  background: rgba(255, 255, 255, .16);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  color: #fff;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), background .3s ease, opacity .3s ease;
}
.hb-wb4-play:hover { transform: translate(-50%, -50%) scale(1.06); background: rgba(255, 255, 255, .26); }
.hb-wb4-play:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.hb-wb4-player[data-playing="true"] .hb-wb4-play { opacity: 0; }
.hb-wb4-player[data-playing="true"]:hover .hb-wb4-play, .hb-wb4-player[data-playing="true"] .hb-wb4-play:focus-visible { opacity: 1; }
.hb-wb4-third { position: absolute; left: 20px; top: 18px; display: flex; align-items: center; gap: 10px; color: #fff; }
.hb-wb4-third b { display: block; font-size: 14px; font-weight: 600; }
.hb-wb4-third span { display: block; font-size: 12px; opacity: .75; }
.hb-wb4-third i { width: 3px; height: 30px; border-radius: 2px; background: var(--hb-wb4-accent); }
.hb-wb4-cap {
  position: absolute;
  left: 50%;
  bottom: 54px;
  max-width: 82%;
  padding: 7px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, .62);
  color: #fff;
  font-size: clamp(13px, 1.6cqw, 17px);
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
  transform: translateX(-50%);
  animation: hb-wb4-cap .35s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-wb4-bar { position: absolute; left: 20px; right: 20px; bottom: 20px; display: flex; align-items: center; gap: 12px; color: #fff; font-size: 12px; font-family: var(--font-mono, ui-monospace, monospace); font-variant-numeric: tabular-nums; }
.hb-wb4-track { position: relative; flex: 1; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, .25); overflow: hidden; }
.hb-wb4-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--hb-wb4-accent); transform-origin: left; transform: scaleX(var(--hb-wb4-p, 0)); transition: transform .12s linear; }
.hb-wb4-list { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-wb4-row {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background .3s ease, border-color .3s ease, box-shadow .3s ease;
}
.hb-wb4-row:hover { background: rgba(255, 255, 255, .6); }
.hb-wb4-row[aria-current="true"] { border-color: rgba(0, 0, 0, .08); background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 12px 24px -16px rgba(40, 30, 10, .3); }
.hb-wb4-row:focus-visible { outline: 2px solid var(--hb-wb4-accent); outline-offset: 2px; }
.hb-wb4-mini { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 9px; }
.hb-wb4-mini .hb-wb4-dur { position: absolute; right: 5px; bottom: 5px; padding: 1px 5px; border-radius: 4px; background: rgba(0, 0, 0, .65); color: #fff; font-size: 10px; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wb4-row b { display: block; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-wb4-row span.hb-wb4-who { display: block; margin-top: 2px; color: #6b6b6b; font-size: 12.5px; line-height: 1.4; }
.hb-wb4-row em { display: block; margin-top: 6px; color: #8a8a8a; font-size: 12px; font-style: normal; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-wb4-eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 10px; margin-right: 6px; vertical-align: -1px; }
.hb-wb4-eq i { width: 2px; height: 100%; border-radius: 1px; background: var(--hb-wb4-accent); animation: hb-wb4-eq .9s ease-in-out infinite; transform-origin: bottom; }
.hb-wb4-eq i:nth-child(2) { animation-delay: -.3s; }
.hb-wb4-eq i:nth-child(3) { animation-delay: -.6s; }
.hb-wb4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-wb4-blink { 50% { opacity: .35; } }
@keyframes hb-wb4-nod { 0%, 100% { transform: translateX(-42%) rotate(-3deg); } 35% { transform: translateX(-40%) rotate(2deg) translateY(1%); } 70% { transform: translateX(-43%) rotate(-1deg); } }
@keyframes hb-wb4-cap { from { opacity: 0; transform: translate(-50%, 6px); } }
@keyframes hb-wb4-eq { 0%, 100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
@container (max-width: 820px) {
  .hb-wb4-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-wb4-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-wb4-row { grid-template-columns: minmax(0, 1fr); }
  .hb-wb4-row em { display: none; }
}
@container (max-width: 560px) {
  .hb-wb4-wrap { padding: 56px 16px 64px; }
  .hb-wb4-head { flex-direction: column; align-items: flex-start; gap: 12px; }
  .hb-wb4-play { width: 56px; height: 56px; }
  .hb-wb4-cap { bottom: 44px; max-width: 92%; }
  .hb-wb4-third { left: 14px; top: 12px; }
  .hb-wb4-bar { left: 14px; right: 14px; bottom: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb4-rec, .hb-wb4-head2, .hb-wb4-cap, .hb-wb4-eq i { animation: none; }
  .hb-wb4-play, .hb-wb4-row, .hb-wb4-fill { transition: none; }
}
`;

const defaultStories: VideoStory[] = [
  {
    name: "Renata Alves",
    role: "Owner",
    company: "Casa Alves Bakery",
    duration: 14,
    captions: ["We were doing every order on paper.", "Now the shop runs on Tillwise from one tablet.", "Saturday mornings went from chaos to calm.", "And I finally take Sundays off."],
    backdrop: ["#f2b880", "#7a3e1d"],
    skin: "#b07a55",
    hair: "#2a1a12",
    cloth: "#e8e1d4",
  },
  {
    name: "Jonas Becker",
    role: "Founder",
    company: "Becker Cycles",
    duration: 12,
    captions: ["Inventory used to be a guess.", "Now I know what sells before the weekend.", "We cut dead stock by a third."],
    backdrop: ["#9ec5d8", "#1f3d52"],
    skin: "#e2b9a0",
    hair: "#a0662e",
    cloth: "#2f4a3a",
  },
  {
    name: "Amina Yusuf",
    role: "Manager",
    company: "Lantern Coffee",
    duration: 11,
    captions: ["Our baristas learned it in ten minutes.", "Tips come in on the same screen.", "The team actually likes closing now."],
    backdrop: ["#c8b6e2", "#3b2a5c"],
    skin: "#6e4630",
    hair: "#151010",
    cloth: "#c2593a",
  },
  {
    name: "Marco Bellini",
    role: "Chef",
    company: "Osteria Nove",
    duration: 13,
    captions: ["Tickets hit the kitchen in a second.", "No more shouting across the pass.", "Covers are up twenty percent this year."],
    backdrop: ["#a8d5a2", "#24452a"],
    skin: "#d6a684",
    hair: "#3a3a3a",
    cloth: "#f2f2f2",
  },
];

function fmt(s: number) {
  const v = Math.max(0, Math.floor(s));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
}

function Portrait({ s }: { s: VideoStory }) {
  const vars = {
    "--hb-wb4-b1": s.backdrop?.[0] ?? "#d9c7a8",
    "--hb-wb4-b2": s.backdrop?.[1] ?? "#3a2e20",
    "--hb-wb4-sk": s.skin ?? "#c69274",
    "--hb-wb4-hr": s.hair ?? "#2b1d14",
    "--hb-wb4-cl": s.cloth ?? "#3a4a5a",
  } as React.CSSProperties;
  return (
    <div className="hb-wb4-art" style={vars} aria-hidden="true">
      <div className="hb-wb4-body" />
      <div className="hb-wb4-neck" />
      <div className="hb-wb4-head2">
        <div className="hb-wb4-hair" />
      </div>
      <div className="hb-wb4-vig" />
    </div>
  );
}

export function ProofVideoGrid({
  eyebrow = "38 video stories",
  title = "Small shops, in their own words",
  subtitle = "Unscripted clips from owners who run their counter, kitchen or workshop on Tillwise.",
  stories = defaultStories,
  defaultIndex = 0,
  defaultPlaying = true,
  accent = "#e8590c",
  onStoryPlay,
  className = "",
  style,
  ...rest
}: ProofVideoGridProps) {
  const uid = React.useId();
  const n = stories.length;
  const [index, setIndex] = React.useState(Math.max(0, Math.min(defaultIndex, n - 1)));
  const [playing, setPlaying] = React.useState(defaultPlaying);
  const [time, setTime] = React.useState(0);
  const timeRef = React.useRef(0);
  const s = stories[index];
  const dur = s ? Math.max(s.duration, 1) : 1;

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const next = timeRef.current + 0.1;
      if (next >= dur) {
        window.clearInterval(id);
        timeRef.current = 0;
        setTime(0);
        setPlaying(false);
        return;
      }
      timeRef.current = next;
      setTime(next);
    }, 100);
    return () => window.clearInterval(id);
  }, [playing, dur, index]);

  const choose = (i: number) => {
    setIndex(i);
    timeRef.current = 0;
    setTime(0);
    setPlaying(true);
    onStoryPlay?.(i);
  };

  const toggle = () => {
    if (!playing) onStoryPlay?.(index);
    setPlaying((p) => !p);
  };

  if (!s) return null;
  const capIndex = Math.min(s.captions.length - 1, Math.floor((time / dur) * s.captions.length));
  const caption = s.captions[capIndex];
  const vars = { "--hb-wb4-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wb4 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-video-grid" precedence="default">{css}</style>
      <div className="hb-wb4-wrap">
        <div className="hb-wb4-head">
          <div>
            <p className="hb-wb4-eyebrow"><span className="hb-wb4-rec" aria-hidden="true" />{eyebrow}</p>
            <h2 id={`${uid}-t`} className="hb-wb4-title">{title}</h2>
          </div>
          {subtitle && <p className="hb-wb4-sub">{subtitle}</p>}
        </div>
        <div className="hb-wb4-grid">
          <div
            className="hb-wb4-player"
            data-playing={playing}
            style={{ "--hb-wb4-run": playing ? "running" : "paused", "--hb-wb4-p": (time / dur).toFixed(3) } as React.CSSProperties}
          >
            <Portrait s={s} />
            <div className="hb-wb4-third">
              <i aria-hidden="true" />
              <div>
                <b>{s.name}</b>
                <span>{`${s.role}, ${s.company}`}</span>
              </div>
            </div>
            {playing && caption && (
              <p key={`${index}-${capIndex}`} className="hb-wb4-cap" aria-live="polite">{caption}</p>
            )}
            <button type="button" className="hb-wb4-play" aria-label={playing ? `Pause story from ${s.name}` : `Play story from ${s.name}`} onClick={toggle}>
              {playing ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" /></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 001.5.86l10.4-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" fill="currentColor" /></svg>
              )}
            </button>
            <div className="hb-wb4-bar" aria-hidden="true">
              <span>{fmt(time)}</span>
              <div className="hb-wb4-track"><div className="hb-wb4-fill" /></div>
              <span>{fmt(dur)}</span>
            </div>
            <p className="hb-wb4-sr">{s.captions.join(" ")}</p>
          </div>
          <ul className="hb-wb4-list" aria-label="More stories">
            {stories.map((st, i) => (
              <li key={`${st.name}-${i}`}>
                <button type="button" className="hb-wb4-row" aria-current={i === index} onClick={() => choose(i)}>
                  <div className="hb-wb4-mini">
                    <Portrait s={st} />
                    <span className="hb-wb4-dur">{fmt(st.duration)}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <b>{st.name}</b>
                    <span className="hb-wb4-who">{st.company}</span>
                    <em>
                      {i === index && playing && (
                        <span className="hb-wb4-eq" aria-hidden="true"><i /><i /><i /></span>
                      )}
                      {`"${st.captions[0]}"`}
                    </em>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

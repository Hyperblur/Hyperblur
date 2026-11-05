"use client";

import * as React from "react";

export interface LocalReservationQuery {
  date: string;
  time: string;
  party: number;
}

export interface LocalReservationBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  dates?: string[];
  times?: string[];
  defaultTime?: string;
  defaultParty?: number;
  minParty?: number;
  maxParty?: number;
  submitLabel?: string;
  note?: string;
  accent?: string;
  onSubmit?: (query: LocalReservationQuery) => void;
}

const defaultDates = ["Tonight, Fri Nov 7", "Sat, Nov 8", "Sun, Nov 9", "Tue, Nov 11", "Wed, Nov 12", "Thu, Nov 13"];
const defaultTimes = ["5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm", "9:30 pm"];

function seats(seed: number) {
  let h = seed * 2654435761;
  h = (h ^ (h >>> 13)) >>> 0;
  return h % 6;
}

const css = `
.hb-kl6 {
  --hb-kl6-accent: #e0673a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #2a1512;
  color: #fff6ec;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl6 *, .hb-kl6 *::before, .hb-kl6 *::after { box-sizing: border-box; }
.hb-kl6-scene { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, #3b1a1b 0%, #8a3a26 46%, #e48a4a 78%, #f3c07a 100%); }
.hb-kl6-sun { position: absolute; left: 50%; top: 58%; width: 520px; height: 520px; margin-left: -260px; border-radius: 50%; background: radial-gradient(circle, rgba(255, 214, 150, .9) 0%, rgba(255, 170, 100, .35) 40%, transparent 70%); animation: hb-kl6-glow 8s ease-in-out infinite; }
@keyframes hb-kl6-glow { 50% { transform: scale(1.08); opacity: .85; } }
.hb-kl6-city { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 46%; display: block; }
.hb-kl6-win { animation: hb-kl6-flick 5s ease-in-out infinite; animation-delay: var(--hb-kl6-d); }
@keyframes hb-kl6-flick { 0%, 100% { opacity: 1; } 45% { opacity: .45; } 55% { opacity: 1; } }
.hb-kl6-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 104px 24px 200px; text-align: center; }
.hb-kl6-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 18px; color: #ffd9b8; font-size: 13px; letter-spacing: .2em; text-transform: uppercase; }
.hb-kl6-eyebrow::before, .hb-kl6-eyebrow::after { content: ""; width: 24px; height: 1px; background: currentColor; opacity: .6; }
.hb-kl6-title { margin: 0 auto; max-width: 760px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: clamp(40px, 6.4cqw, 76px); line-height: .98; letter-spacing: -.02em; text-wrap: balance; text-shadow: 0 2px 30px rgba(60, 20, 10, .4); }
.hb-kl6-sub { margin: 18px auto 0; max-width: 520px; color: #ffe3cc; font-size: 16.5px; line-height: 1.6; }
.hb-kl6-bar {
  margin: 40px auto 0;
  max-width: 940px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, 1fr) auto;
  align-items: stretch;
  padding: 8px;
  border-radius: 24px;
  background: rgba(255, 249, 242, .96);
  color: #2a1512;
  box-shadow: 0 1px 0 #fff inset, 0 40px 80px -30px rgba(40, 10, 5, .7);
  text-align: left;
}
.hb-kl6-field { position: relative; min-width: 0; padding: 10px 18px; border-radius: 16px; transition: background .2s; }
.hb-kl6-field + .hb-kl6-field::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 1px; background: #ecdccb; }
.hb-kl6-field:hover, .hb-kl6-field:focus-within { background: #f7ebdd; }
.hb-kl6-field:hover::before, .hb-kl6-field:focus-within::before, .hb-kl6-field:hover + .hb-kl6-field::before, .hb-kl6-field:focus-within + .hb-kl6-field::before { opacity: 0; }
.hb-kl6-label { display: block; color: #9a7663; font-size: 11.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-kl6-select { appearance: none; display: block; width: 100%; margin-top: 4px; padding: 0 20px 0 0; border: 0; background: transparent; color: #2a1512; font: inherit; font-size: 16px; font-weight: 600; cursor: pointer; text-overflow: ellipsis; }
.hb-kl6-select:focus-visible { outline: none; }
.hb-kl6-chev { position: absolute; right: 18px; bottom: 16px; color: #9a7663; pointer-events: none; }
.hb-kl6-field:has(.hb-kl6-select:focus-visible) { box-shadow: 0 0 0 2px var(--hb-kl6-accent); }
.hb-kl6-step { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 2px; }
.hb-kl6-step output { font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-kl6-stepbtns { display: flex; gap: 6px; }
.hb-kl6-round { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; border: 1px solid #e3cfba; background: #fff; color: #2a1512; cursor: pointer; transition: border-color .2s, background .2s; }
.hb-kl6-round:hover:not(:disabled) { border-color: var(--hb-kl6-accent); }
.hb-kl6-round:disabled { opacity: .35; cursor: not-allowed; }
.hb-kl6-round:focus-visible, .hb-kl6-go:focus-visible, .hb-kl6-slot:focus-visible { outline: 2px solid var(--hb-kl6-accent); outline-offset: 2px; }
.hb-kl6-go { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 26px; min-height: 56px; border: 0; border-radius: 18px; background: var(--hb-kl6-accent); color: #fff; font: inherit; font-size: 15.5px; font-weight: 600; white-space: nowrap; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 10px 24px -10px var(--hb-kl6-accent); transition: transform .2s, filter .2s; }
.hb-kl6-go:hover { transform: translateY(-1px); filter: brightness(1.06); }
.hb-kl6-avail { max-width: 940px; margin: 14px auto 0; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; }
.hb-kl6-availlabel { color: #ffe3cc; font-size: 13px; margin-right: 4px; }
.hb-kl6-slot { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(255, 240, 225, .25); background: rgba(40, 14, 10, .35); backdrop-filter: blur(10px); color: #fff6ec; font: inherit; font-size: 13.5px; font-variant-numeric: tabular-nums; cursor: pointer; transition: background .2s, border-color .2s; }
.hb-kl6-slot:hover:not(:disabled) { background: rgba(40, 14, 10, .55); border-color: rgba(255, 240, 225, .5); }
.hb-kl6-slot[aria-pressed="true"] { background: #fff6ec; color: #2a1512; border-color: #fff6ec; }
.hb-kl6-slot:disabled { opacity: .5; cursor: not-allowed; text-decoration: line-through; }
.hb-kl6-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-kl6-c); }
.hb-kl6-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--hb-kl6-c); animation: hb-kl6-ping 1.8s ease-out infinite; }
@keyframes hb-kl6-ping { to { transform: scale(2.6); opacity: 0; } }
.hb-kl6-result { max-width: 940px; margin: 18px auto 0; display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 14px; background: rgba(255, 249, 242, .14); border: 1px solid rgba(255, 240, 225, .25); backdrop-filter: blur(10px); color: #fff6ec; font-size: 14px; animation: hb-kl6-pop .45s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-kl6-pop { from { opacity: 0; transform: translateY(6px) scale(.98); } }
.hb-kl6-note { margin: 16px 0 0; color: rgba(255, 227, 204, .8); font-size: 13px; }
@container (max-width: 860px) {
  .hb-kl6-bar { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4px; }
  .hb-kl6-field + .hb-kl6-field::before { display: none; }
  .hb-kl6-go { grid-column: 1 / -1; }
  .hb-kl6-wrap { padding: 72px 20px 160px; }
}
@container (max-width: 440px) {
  .hb-kl6-bar { grid-template-columns: minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl6 *, .hb-kl6 *::before, .hb-kl6 *::after { animation: none !important; transition: none !important; }
}
`;

function City() {
  const towers = [
    { x: 0, w: 70, h: 120 }, { x: 64, w: 54, h: 170 }, { x: 112, w: 90, h: 110 }, { x: 196, w: 46, h: 200 },
    { x: 236, w: 80, h: 140 }, { x: 310, w: 60, h: 95 }, { x: 680, w: 70, h: 130 }, { x: 744, w: 50, h: 185 },
    { x: 788, w: 96, h: 120 }, { x: 878, w: 58, h: 160 }, { x: 930, w: 80, h: 105 }, { x: 1004, w: 60, h: 175 },
    { x: 1058, w: 90, h: 125 }, { x: 1142, w: 60, h: 150 },
  ];
  const windows: { x: number; y: number; d: string }[] = [];
  towers.forEach((t, ti) => {
    for (let r = 0; r < Math.floor(t.h / 26); r++) {
      for (let c = 0; c < Math.floor((t.w - 12) / 16); c++) {
        const k = (ti * 31 + r * 7 + c * 13) % 9;
        if (k < 3) windows.push({ x: t.x + 10 + c * 16, y: 260 - t.h + 14 + r * 26, d: `${((k * 1.3 + ti * 0.4) % 5).toFixed(1)}s` });
      }
    }
  });
  return (
    <svg className="hb-kl6-city" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 210 C 200 180, 380 230, 600 200 S 1000 180, 1200 205 L 1200 260 L 0 260 Z" fill="#6b2c1f" opacity=".55" />
      {towers.map((t, i) => <rect key={i} x={t.x} y={260 - t.h} width={t.w} height={t.h} fill="#3a1714" />)}
      {windows.map((w, i) => (
        <rect key={i} className="hb-kl6-win" x={w.x} y={w.y} width="7" height="10" rx="1" fill="#ffc77a" style={{ "--hb-kl6-d": w.d } as React.CSSProperties} />
      ))}
      <g transform="translate(430 120)">
        <rect x="0" y="40" width="340" height="100" fill="#2b100e" />
        <path d="M-14 40 L 354 40 L 330 14 L 10 14 Z" fill="#4a1d18" />
        <path d="M-14 40 L 354 40" stroke="#ffb46a" strokeWidth="2" />
        {Array.from({ length: 4 }, (_, i) => (
          <g key={i}>
            <rect x={20 + i * 80} y="58" width="60" height="62" rx="30" fill="#ffcf8a" opacity=".92" />
            <rect x={20 + i * 80} y="58" width="60" height="62" rx="30" fill="none" stroke="#5a2318" strokeWidth="3" />
            <circle cx={50 + i * 80} cy="96" r="7" fill="#7a3220" opacity=".55" />
          </g>
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={`b${i}`} cx={(6 + i * 29).toFixed(0)} cy={(26 + (i % 2) * 5).toFixed(0)} r="3.2" fill="#ffe2a8" className="hb-kl6-win" style={{ "--hb-kl6-d": `${(i * 0.37).toFixed(2)}s` } as React.CSSProperties} />
        ))}
      </g>
    </svg>
  );
}

export function LocalReservationBar({
  eyebrow = "Lantern House · Mission District",
  title = "Dinner under the string lights.",
  subtitle = "Wood-fired plates, a long natural wine list and a patio that stays warm till close. Tables open 30 days ahead.",
  dates = defaultDates,
  times = defaultTimes,
  defaultTime = "7:30 pm",
  defaultParty = 2,
  minParty = 1,
  maxParty = 12,
  submitLabel = "Find a table",
  note = "Parties over 8? Call us at (415) 555-0119 for the private room.",
  accent = "#e0673a",
  onSubmit,
  className,
  style,
  ...rest
}: LocalReservationBarProps) {
  const uid = React.useId();
  const [date, setDate] = React.useState(dates[0] ?? "");
  const [time, setTime] = React.useState(times.includes(defaultTime) ? defaultTime : times[0] ?? "");
  const [party, setParty] = React.useState(defaultParty);
  const [found, setFound] = React.useState<LocalReservationQuery | null>(null);

  const dateIndex = Math.max(0, dates.indexOf(date));
  const timeIndex = Math.max(0, times.indexOf(time));
  const around = times.slice(Math.max(0, Math.min(timeIndex - 2, times.length - 5)), Math.max(0, Math.min(timeIndex - 2, times.length - 5)) + 5);

  const availability = (t: string) => {
    const left = seats(dateIndex * 17 + times.indexOf(t) * 5 + party * 3);
    return party > 6 ? Math.max(0, left - 3) : left;
  };
  const tone = (n: number) => (n === 0 ? "#b8a59a" : n <= 2 ? "#f5b544" : "#5fd38d");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = { date, time, party };
    setFound(query);
    onSubmit?.(query);
  };

  const foundCount = found ? availability(found.time) : 0;

  return (
    <section
      className={["hb-kl6", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-reservation-bar" precedence="default">{css}</style>
      <div className="hb-kl6-scene" aria-hidden="true">
        <div className="hb-kl6-sun" />
        <City />
      </div>
      <div className="hb-kl6-wrap">
        <p className="hb-kl6-eyebrow">{eyebrow}</p>
        <h2 className="hb-kl6-title">{title}</h2>
        <p className="hb-kl6-sub">{subtitle}</p>
        <form className="hb-kl6-bar" onSubmit={submit}>
          <div className="hb-kl6-field">
            <label className="hb-kl6-label" htmlFor={`${uid}-date`}>Date</label>
            <select id={`${uid}-date`} className="hb-kl6-select" value={date} onChange={(e) => { setDate(e.target.value); setFound(null); }}>
              {dates.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <svg className="hb-kl6-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="hb-kl6-field">
            <label className="hb-kl6-label" htmlFor={`${uid}-time`}>Time</label>
            <select id={`${uid}-time`} className="hb-kl6-select" value={time} onChange={(e) => { setTime(e.target.value); setFound(null); }}>
              {times.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <svg className="hb-kl6-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="hb-kl6-field">
            <span className="hb-kl6-label" id={`${uid}-party`}>Guests</span>
            <div className="hb-kl6-step" role="group" aria-labelledby={`${uid}-party`}>
              <output aria-live="polite">{party} {party === 1 ? "guest" : "guests"}</output>
              <div className="hb-kl6-stepbtns">
                <button type="button" className="hb-kl6-round" aria-label="Remove a guest" disabled={party <= minParty} onClick={() => { setParty((p) => Math.max(minParty, p - 1)); setFound(null); }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
                </button>
                <button type="button" className="hb-kl6-round" aria-label="Add a guest" disabled={party >= maxParty} onClick={() => { setParty((p) => Math.min(maxParty, p + 1)); setFound(null); }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="hb-kl6-go">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            {submitLabel}
          </button>
        </form>
        <div className="hb-kl6-avail" role="group" aria-label="Live availability">
          <span className="hb-kl6-availlabel">Live availability</span>
          {around.map((t) => {
            const n = availability(t);
            return (
              <button
                key={t}
                type="button"
                className="hb-kl6-slot"
                aria-pressed={t === time}
                disabled={n === 0}
                aria-label={`${t}, ${n === 0 ? "fully booked" : `${n} tables left`}`}
                onClick={() => { setTime(t); setFound(null); }}
              >
                <span className="hb-kl6-dot" style={{ "--hb-kl6-c": tone(n) } as React.CSSProperties} aria-hidden="true" />
                {t}
              </button>
            );
          })}
        </div>
        {found ? (
          <div className="hb-kl6-result" role="status">
            <span className="hb-kl6-dot" style={{ "--hb-kl6-c": tone(foundCount) } as React.CSSProperties} aria-hidden="true" />
            {foundCount > 0
              ? `${foundCount} ${foundCount === 1 ? "table" : "tables"} for ${found.party} at ${found.time}, ${found.date}. We will hold it for 10 minutes.`
              : `${found.time} is fully booked. Try one of the green times above.`}
          </div>
        ) : null}
        {note ? <p className="hb-kl6-note">{note}</p> : null}
      </div>
    </section>
  );
}

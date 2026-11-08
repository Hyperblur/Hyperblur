"use client";

import * as React from "react";

export interface CinemaShowtime {
  time: string;
  format: string;
  seatsLeft: number;
}

export interface CinemaNowShowingFilm {
  title: string;
  rating: string;
  runtime: string;
  genres: string;
  director: string;
  synopsis: string;
}

export interface CinemaBooking {
  date: string;
  time: string;
  format: string;
  quantity: number;
  total: number;
}

export interface CinemaNowShowingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  film?: CinemaNowShowingFilm;
  venue?: string;
  dates?: string[];
  showtimes?: CinemaShowtime[];
  price?: number;
  currency?: string;
  locale?: string;
  maxTickets?: number;
  accent?: string;
  onBook?: (booking: CinemaBooking) => void;
  headingAs?: "h1" | "h2";
}

const defaultFilm: CinemaNowShowingFilm = {
  title: "Salt & Static",
  rating: "PG-13",
  runtime: "2h 08m",
  genres: "Mystery · Drama",
  director: "Mira Okafor",
  synopsis: "A radio engineer on a storm-cut island hears her own voice on a frequency that went dark in 1986.",
};

const css = `
.hb-vc13 {
  --hb-vc13-accent: #ff5a36;
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(24px, 5cqi, 64px);
  width: 100%;
  min-height: 580px;
  padding: clamp(24px, 5cqi, 60px);
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(70% 60% at 20% 30%, color-mix(in srgb, var(--hb-vc13-accent) 16%, transparent), transparent 70%), #08070a;
  color: #f4f1ec;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc13 *, .hb-vc13 *::before, .hb-vc13 *::after { box-sizing: border-box; }
.hb-vc13-film { display: grid; grid-template-columns: minmax(0, 150px) minmax(0, 1fr); gap: 22px; align-items: start; }
.hb-vc13-poster {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .08), 0 30px 60px -30px color-mix(in srgb, var(--hb-vc13-accent) 70%, #000);
  transform: rotate(-2deg);
}
.hb-vc13-poster svg { display: block; width: 100%; height: 100%; }
.hb-vc13-poster-t {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 12px;
  color: #fff;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: 15px;
  font-weight: 700;
  line-height: .95;
  letter-spacing: -.01em;
  text-transform: uppercase;
}
.hb-vc13-now {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  color: var(--hb-vc13-accent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .24em;
  text-transform: uppercase;
}
.hb-vc13-now::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 10px currentColor;
  animation: hb-vc13-live 1.6s ease-in-out infinite;
}
@keyframes hb-vc13-live {
  50% { opacity: .3; }
}
.hb-vc13-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(30px, 5.2cqi, 58px);
  font-weight: 700;
  line-height: .95;
  letter-spacing: -.035em;
}
.hb-vc13-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.hb-vc13-chip {
  padding: 4px 8px;
  border: 1px solid rgba(244, 241, 236, .16);
  border-radius: 6px;
  color: rgba(244, 241, 236, .75);
  font-size: 11.5px;
  white-space: nowrap;
}
.hb-vc13-syn { margin: 14px 0 0; color: rgba(244, 241, 236, .7); font-size: 14px; line-height: 1.55; }
.hb-vc13-dir { margin: 10px 0 0; color: rgba(244, 241, 236, .5); font-size: 12.5px; }
.hb-vc13-ticket {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px;
  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, .55));
}
.hb-vc13-body, .hb-vc13-stub {
  position: relative;
  background: linear-gradient(180deg, #f6f1e7, #ebe3d3);
  color: #1a1612;
}
.hb-vc13-body {
  padding: 22px 22px 20px;
  border-radius: 16px 0 0 16px;
  -webkit-mask: radial-gradient(circle 10px at 100% 0, transparent 98%, #000) top / 100% 51% no-repeat, radial-gradient(circle 10px at 100% 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
  mask: radial-gradient(circle 10px at 100% 0, transparent 98%, #000) top / 100% 51% no-repeat, radial-gradient(circle 10px at 100% 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
}
.hb-vc13-stub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 0 16px 16px 0;
  border-left: 2px dashed rgba(26, 22, 18, .28);
  -webkit-mask: radial-gradient(circle 10px at 0 0, transparent 98%, #000) top / 100% 51% no-repeat, radial-gradient(circle 10px at 0 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
  mask: radial-gradient(circle 10px at 0 0, transparent 98%, #000) top / 100% 51% no-repeat, radial-gradient(circle 10px at 0 100%, transparent 98%, #000) bottom / 100% 51% no-repeat;
  transform-origin: 0 100%;
}
.hb-vc13[data-phase="torn"] .hb-vc13-stub { animation: hb-vc13-tear .9s cubic-bezier(.5, 0, .3, 1) both; }
@keyframes hb-vc13-tear {
  0% { transform: none; }
  25% { transform: rotate(4deg) translate3d(2px, 0, 0); }
  100% { transform: rotate(18deg) translate3d(30px, 60px, 0); opacity: 0; }
}
.hb-vc13-label {
  margin: 0 0 8px;
  color: rgba(26, 22, 18, .55);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
}
.hb-vc13-group + .hb-vc13-group { margin-top: 16px; }
.hb-vc13-opts { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-vc13-opt {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
  padding: 7px 10px;
  border: 1px solid rgba(26, 22, 18, .16);
  border-radius: 9px;
  background: rgba(255, 255, 255, .5);
  color: #1a1612;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .15s ease;
}
.hb-vc13-opt small { color: rgba(26, 22, 18, .55); font-size: 10px; font-weight: 500; letter-spacing: .04em; }
.hb-vc13-opt:hover { border-color: rgba(26, 22, 18, .4); }
.hb-vc13-opt:active { transform: scale(.97); }
.hb-vc13-opt[aria-checked="true"] { border-color: #1a1612; background: #1a1612; color: #f6f1e7; }
.hb-vc13-opt[aria-checked="true"] small { color: rgba(246, 241, 231, .65); }
.hb-vc13-opt:disabled { opacity: .4; cursor: not-allowed; text-decoration: line-through; }
.hb-vc13-opt:focus-visible, .hb-vc13-step:focus-visible, .hb-vc13-book:focus-visible { outline: 2px solid var(--hb-vc13-accent); outline-offset: 2px; }
.hb-vc13-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed rgba(26, 22, 18, .2);
}
.hb-vc13-qty { display: inline-flex; align-items: center; gap: 6px; }
.hb-vc13-step {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(26, 22, 18, .2);
  border-radius: 50%;
  background: transparent;
  color: #1a1612;
  font: inherit;
  font-size: 16px;
  cursor: pointer;
}
.hb-vc13-step:disabled { opacity: .35; cursor: not-allowed; }
.hb-vc13-n { min-width: 3.2ch; font-size: 14px; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; }
.hb-vc13-total { font-size: 20px; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-vc13-book {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  margin-top: 14px;
  border: 0;
  border-radius: 11px;
  background: var(--hb-vc13-accent);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 10px 24px -12px var(--hb-vc13-accent);
  transition: transform .15s ease, filter .2s ease;
}
.hb-vc13-book:hover { filter: brightness(1.06); }
.hb-vc13-book:active { transform: scale(.98); }
.hb-vc13-admit {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: 18px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}
.hb-vc13-stubno { color: rgba(26, 22, 18, .5); font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; letter-spacing: .1em; }
.hb-vc13-done { animation: hb-vc13-done .6s .5s cubic-bezier(.2, .8, .2, 1) both; }
@keyframes hb-vc13-done {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vc13-seat { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: 26px; font-weight: 700; letter-spacing: -.02em; }
.hb-vc13-seatsub { margin: 6px 0 0; color: rgba(26, 22, 18, .65); font-size: 13px; }
.hb-vc13-bars { display: flex; align-items: stretch; gap: 2px; height: 46px; margin-top: 16px; }
.hb-vc13-bars span { background: #1a1612; }
.hb-vc13-again {
  margin-top: 14px;
  padding: 0;
  border: 0;
  background: none;
  color: #1a1612;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.hb-vc13-again:focus-visible { outline: 2px solid var(--hb-vc13-accent); outline-offset: 2px; }
@container (max-width: 700px) {
  .hb-vc13 { grid-template-columns: minmax(0, 1fr); }
  .hb-vc13-film { grid-template-columns: minmax(0, 96px) minmax(0, 1fr); }
  .hb-vc13-syn { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc13-now::before, .hb-vc13-done { animation: none; }
  .hb-vc13[data-phase="torn"] .hb-vc13-stub { animation: none; opacity: 0; }
}
`;

export function CinemaNowShowing({
  film = defaultFilm,
  venue = "Rialto Hall · Screen 4",
  dates = ["Fri 14", "Sat 15", "Sun 16", "Mon 17"],
  showtimes = [
    { time: "4:10 PM", format: "35mm", seatsLeft: 22 },
    { time: "7:15 PM", format: "Dolby Atmos", seatsLeft: 9 },
    { time: "9:40 PM", format: "Laser", seatsLeft: 41 },
    { time: "11:55 PM", format: "35mm", seatsLeft: 0 },
  ],
  price = 14.5,
  currency = "USD",
  locale = "en-US",
  maxTickets = 8,
  accent = "#ff5a36",
  onBook,
  headingAs = "h2",
  className,
  style,
  ...rest
}: CinemaNowShowingProps) {
  const Heading = headingAs;
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState(Math.max(0, showtimes.findIndex((s) => s.seatsLeft > 0)));
  const [qty, setQty] = React.useState(2);
  const [phase, setPhase] = React.useState<"select" | "torn">("select");
  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const show = showtimes[slot];
  const cap = Math.min(maxTickets, show?.seatsLeft ?? 0);
  const total = qty * price;

  const book = () => {
    if (!show || qty < 1) return;
    setPhase("torn");
    onBook?.({ date: dates[day] ?? "", time: show.time, format: show.format, quantity: qty, total });
  };

  const seed = (Math.imul(day * 31 + slot * 7 + qty + 1, 2654435761) >>> 0);
  const row = "CDEFGH"[seed % 6];
  const firstSeat = 3 + ((seed >>> 4) % 9);
  const bars = Array.from({ length: 38 }, (_, i) => 1 + ((Math.imul(seed + i * 13, 2246822519) >>> 0) % 4));
  const ticketNo = String(seed % 1000000).padStart(6, "0");

  const radioKeys = (e: React.KeyboardEvent, count: number, cur: number, set: (i: number) => void, ok: (i: number) => boolean) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    let i = cur;
    for (let k = 0; k < count; k++) {
      i = (i + dir + count) % count;
      if (ok(i)) break;
    }
    set(i);
    const group = e.currentTarget as HTMLElement;
    (group.querySelectorAll("[role=radio]")[i] as HTMLElement | undefined)?.focus();
  };

  const vars = { "--hb-vc13-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={["hb-vc13", className].filter(Boolean).join(" ")} style={vars} data-phase={phase} {...rest}>
      <style href="hb-cinema-now-showing" precedence="default">{css}</style>
      <div className="hb-vc13-film">
        <div className="hb-vc13-poster" aria-hidden="true">
          <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
            <rect width="200" height="300" fill="#141022" />
            <circle cx="100" cy="120" r="70" fill={accent} opacity=".85" />
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x="0" y={92 + i * 9} width="200" height={1 + i * 0.5} fill="#141022" />
            ))}
            <path d="M0 210 Q50 190 100 206 T200 200 L200 300 L0 300Z" fill="#0a0814" />
            <rect x="96" y="150" width="4" height="62" fill="#0a0814" />
            <path d="M84 150 L112 150 M88 160 L108 160" stroke="#0a0814" strokeWidth="3" />
          </svg>
          <span className="hb-vc13-poster-t">{film.title}</span>
        </div>
        <div>
          <p className="hb-vc13-now">Now showing</p>
          <Heading className="hb-vc13-title">{film.title}</Heading>
          <div className="hb-vc13-chips">
            <span className="hb-vc13-chip">{film.rating}</span>
            <span className="hb-vc13-chip">{film.runtime}</span>
            <span className="hb-vc13-chip">{film.genres}</span>
          </div>
          <p className="hb-vc13-syn">{film.synopsis}</p>
          <p className="hb-vc13-dir">Directed by {film.director} · {venue}</p>
        </div>
      </div>
      <div className="hb-vc13-ticket">
        <div className="hb-vc13-body">
          {phase === "select" ? (
            <>
              <div className="hb-vc13-group">
                <p className="hb-vc13-label">Date</p>
                <div className="hb-vc13-opts" role="radiogroup" aria-label="Date" onKeyDown={(e) => radioKeys(e, dates.length, day, setDay, () => true)}>
                  {dates.map((d, i) => (
                    <button key={d} type="button" role="radio" aria-checked={i === day} tabIndex={i === day ? 0 : -1} className="hb-vc13-opt" onClick={() => setDay(i)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hb-vc13-group">
                <p className="hb-vc13-label">Showtime</p>
                <div
                  className="hb-vc13-opts"
                  role="radiogroup"
                  aria-label="Showtime"
                  onKeyDown={(e) => radioKeys(e, showtimes.length, slot, (i) => { setSlot(i); setQty((q) => Math.max(1, Math.min(q, Math.min(maxTickets, showtimes[i].seatsLeft)))); }, (i) => showtimes[i].seatsLeft > 0)}
                >
                  {showtimes.map((s, i) => (
                    <button
                      key={s.time}
                      type="button"
                      role="radio"
                      aria-checked={i === slot}
                      tabIndex={i === slot ? 0 : -1}
                      disabled={s.seatsLeft <= 0}
                      className="hb-vc13-opt"
                      onClick={() => {
                        setSlot(i);
                        setQty((q) => Math.max(1, Math.min(q, Math.min(maxTickets, s.seatsLeft))));
                      }}
                    >
                      {s.time}
                      <small>{s.seatsLeft > 0 ? `${s.format} · ${s.seatsLeft} left` : "Sold out"}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="hb-vc13-foot">
                <div className="hb-vc13-qty">
                  <button type="button" className="hb-vc13-step" aria-label="Fewer tickets" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span className="hb-vc13-n" aria-live="polite">{qty}×</span>
                  <button type="button" className="hb-vc13-step" aria-label="More tickets" disabled={qty >= cap} onClick={() => setQty((q) => Math.min(cap, q + 1))}>+</button>
                </div>
                <span className="hb-vc13-total">{money.format(total)}</span>
              </div>
              <button type="button" className="hb-vc13-book" onClick={book} disabled={!show || cap < 1}>
                Get tickets
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          ) : (
            <div className="hb-vc13-done" role="status">
              <p className="hb-vc13-label">Admit {qty} · {dates[day]} · {show?.time}</p>
              <p className="hb-vc13-seat">Row {row}, seats {firstSeat}–{firstSeat + qty - 1}</p>
              <p className="hb-vc13-seatsub">{venue} · {show?.format} · {money.format(total)} paid</p>
              <div className="hb-vc13-bars" aria-hidden="true">
                {bars.map((w, i) => (
                  <span key={i} style={{ width: `${w}px`, opacity: i % 7 === 3 ? 0 : 1 }} />
                ))}
              </div>
              <button type="button" className="hb-vc13-again" onClick={() => setPhase("select")}>Change showtime</button>
            </div>
          )}
        </div>
        <div className="hb-vc13-stub" aria-hidden="true">
          <span className="hb-vc13-stubno">No. {ticketNo}</span>
          <span className="hb-vc13-admit">Admit {qty}</span>
          <span className="hb-vc13-stubno">{show?.time}</span>
        </div>
      </div>
    </section>
  );
}

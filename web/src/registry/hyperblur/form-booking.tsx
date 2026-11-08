"use client";

import * as React from "react";

export interface FormBookingValues {
  date: string;
  start: string;
  end: string;
  duration: number;
  name: string;
  email: string;
  notes: string;
}

export interface FormBookingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  host?: string;
  title?: string;
  startDate?: string;
  days?: number;
  openHour?: number;
  closeHour?: number;
  durations?: number[];
  timeZoneLabel?: string;
  accent?: string;
  delay?: number;
  onSubmit?: (values: FormBookingValues) => void | Promise<void>;
}

const css = `
.hb-xh9 {
  --hb-xh9-a: #22c3ee;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh9 *, .hb-xh9 *::before, .hb-xh9 *::after { box-sizing: border-box; }
.hb-xh9-card { overflow: hidden; border: 1px solid #262626; border-radius: 18px; background: #0f0f0f; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 28px 56px -28px rgba(0,0,0,0.85); }
.hb-xh9-head { display: flex; align-items: center; gap: 11px; padding: 14px 16px; border-bottom: 1px solid #1d1d1d; }
.hb-xh9-av { display: grid; place-items: center; width: 36px; height: 36px; flex: none; border-radius: 50%; background: linear-gradient(135deg, #22c3ee, #6366f1); color: #fff; font-size: 13px; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2); }
.hb-xh9-who { display: grid; gap: 1px; min-width: 0; flex: 1; }
.hb-xh9-who b { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xh9-who span { font-size: 12px; color: #8a8a8a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh9-dur { display: inline-flex; flex: none; padding: 2px; border: 1px solid #262626; border-radius: 9px; background: #0a0a0a; }
.hb-xh9-dur button { height: 26px; padding: 0 9px; border: 0; border-radius: 7px; background: transparent; color: #808080; font: inherit; font-size: 12px; font-variant-numeric: tabular-nums; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh9-dur button[aria-checked="true"] { background: #1f1f1f; color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
.hb-xh9-dur button:focus-visible { outline: 2px solid var(--hb-xh9-a); }
.hb-xh9-body { padding: 14px 16px 16px; }
.hb-xh9-month { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; font-size: 13px; font-weight: 600; }
.hb-xh9-month span { font-size: 11.5px; font-weight: 400; color: #6f6f6f; }
.hb-xh9-days { display: grid; grid-template-columns: repeat(var(--hb-xh9-n), 1fr); gap: 5px; margin-bottom: 14px; }
.hb-xh9-day { position: relative; display: grid; justify-items: center; gap: 2px; padding: 7px 0 9px; border: 1px solid #222; border-radius: 11px; background: #131313; color: #d6d6d6; font: inherit; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh9-day small { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #737373; }
.hb-xh9-day b { font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xh9-day i { position: absolute; bottom: 4px; width: 14px; height: 2px; border-radius: 2px; background: var(--hb-xh9-a); opacity: var(--hb-xh9-o); }
.hb-xh9-day:hover:not(:disabled) { border-color: #353535; transform: translateY(-1px); }
.hb-xh9-day[aria-pressed="true"] { border-color: var(--hb-xh9-a); background: color-mix(in srgb, var(--hb-xh9-a) 12%, #131313); }
.hb-xh9-day[aria-pressed="true"] small { color: var(--hb-xh9-a); }
.hb-xh9-day:disabled { cursor: not-allowed; color: #4a4a4a; background: repeating-linear-gradient(135deg, #111 0 4px, #0d0d0d 4px 8px); }
.hb-xh9-day:disabled small { color: #3d3d3d; }
.hb-xh9-day:focus-visible { outline: 2px solid var(--hb-xh9-a); outline-offset: 2px; }
.hb-xh9-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; animation: hb-xh9-in 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh9-slot { position: relative; height: 34px; border: 1px solid #262626; border-radius: 9px; background: #121212; color: #e0e0e0; font: inherit; font-size: 12.5px; font-variant-numeric: tabular-nums; cursor: pointer; overflow: hidden; transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease; }
.hb-xh9-slot:hover:not(:disabled) { border-color: var(--hb-xh9-a); color: #fff; }
.hb-xh9-slot:disabled { color: #4a4a4a; text-decoration: line-through; cursor: not-allowed; background: #0e0e0e; }
.hb-xh9-slot[aria-pressed="true"] { border-color: var(--hb-xh9-a); background: var(--hb-xh9-a); color: #04161c; font-weight: 600; }
.hb-xh9-slot:focus-visible { outline: 2px solid var(--hb-xh9-a); outline-offset: 2px; }
.hb-xh9-none { grid-column: 1 / -1; margin: 0; padding: 18px 0; text-align: center; font-size: 12.5px; color: #6f6f6f; border: 1px dashed #262626; border-radius: 10px; }
.hb-xh9-sum { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; padding: 10px 12px; border: 1px solid color-mix(in srgb, var(--hb-xh9-a) 35%, #262626); border-radius: 11px; background: color-mix(in srgb, var(--hb-xh9-a) 7%, #111); font-size: 13px; animation: hb-xh9-in 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh9-sum span { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.hb-xh9-sum svg { width: 15px; height: 15px; flex: none; color: var(--hb-xh9-a); }
.hb-xh9-sum b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh9-link { flex: none; padding: 3px 6px; border: 0; border-radius: 6px; background: none; color: var(--hb-xh9-a); font: inherit; font-size: 12px; cursor: pointer; }
.hb-xh9-link:hover { background: color-mix(in srgb, var(--hb-xh9-a) 12%, transparent); }
.hb-xh9-link:focus-visible { outline: 2px solid var(--hb-xh9-a); }
.hb-xh9-form { display: grid; gap: 10px; animation: hb-xh9-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh9-two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-xh9-f { display: grid; gap: 5px; min-width: 0; }
.hb-xh9-f label { font-size: 11.5px; font-weight: 500; color: #a6a6a6; }
.hb-xh9-in { width: 100%; height: 38px; padding: 0 11px; border: 1px solid #272727; border-radius: 9px; background: #0a0a0a; color: #ededed; font: inherit; font-size: 13.5px; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; }
.hb-xh9-in::placeholder { color: #4f4f4f; }
.hb-xh9-in:focus { border-color: var(--hb-xh9-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh9-a) 18%, transparent); }
.hb-xh9-in[aria-invalid="true"] { border-color: #f05260; }
textarea.hb-xh9-in { height: 58px; padding: 8px 11px; resize: none; line-height: 1.45; }
.hb-xh9-e { margin: 0; font-size: 11.5px; color: #ff8a95; }
.hb-xh9-go { height: 40px; border: 0; border-radius: 10px; background: var(--hb-xh9-a); color: #04161c; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px -10px var(--hb-xh9-a); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xh9-go:hover { filter: brightness(1.07); }
.hb-xh9-go:active { transform: scale(0.98); }
.hb-xh9-go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh9-go[aria-busy="true"] { cursor: progress; opacity: 0.8; }
.hb-xh9-ticket { padding: 18px 16px 16px; animation: hb-xh9-drop 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh9-tk { position: relative; border-radius: 14px; background: linear-gradient(180deg, #171717, #121212); border: 1px solid #262626; }
.hb-xh9-tk-top { padding: 16px; display: grid; gap: 4px; }
.hb-xh9-tk-top small { font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--hb-xh9-a); font-weight: 600; }
.hb-xh9-tk-top h3 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh9-tk-top p { margin: 0; font-size: 13px; color: #9a9a9a; }
.hb-xh9-perf { position: relative; height: 0; border-top: 2px dashed #2a2a2a; margin: 0 14px; }
.hb-xh9-perf::before, .hb-xh9-perf::after { content: ""; position: absolute; top: -10px; width: 18px; height: 18px; border-radius: 50%; background: #0f0f0f; border: 1px solid #262626; }
.hb-xh9-perf::before { left: -24px; clip-path: inset(0 0 0 50%); }
.hb-xh9-perf::after { right: -24px; clip-path: inset(0 50% 0 0); }
.hb-xh9-tk-bot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px 14px; }
.hb-xh9-code { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #bdbdbd; letter-spacing: 0.06em; }
.hb-xh9-cal { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 9px; background: #f2f2f2; color: #0a0a0a; font-size: 12.5px; font-weight: 600; text-decoration: none; transition: background 0.2s ease; }
.hb-xh9-cal:hover { background: #fff; }
.hb-xh9-cal:focus-visible { outline: 2px solid var(--hb-xh9-a); outline-offset: 2px; }
.hb-xh9-cal svg { width: 13px; height: 13px; }
.hb-xh9-again { display: block; margin: 12px auto 0; padding: 4px 8px; border: 0; background: none; color: #8a8a8a; font: inherit; font-size: 12px; cursor: pointer; border-radius: 6px; }
.hb-xh9-again:hover { color: #fff; }
.hb-xh9-again:focus-visible { outline: 2px solid var(--hb-xh9-a); }
@keyframes hb-xh9-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh9-drop { 0% { opacity: 0; transform: translateY(-24px) rotate(-2deg); } 70% { transform: translateY(3px) rotate(0.4deg); } 100% { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh9 *, .hb-xh9 *::before, .hb-xh9 *::after { animation: none !important; transition: none !important; }
}
`;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function dayInfo(iso: string, offset: number) {
  const [y0, m0, d0] = iso.split("-").map(Number);
  let y = y0;
  let m = m0;
  let d = d0 + offset;
  const len = (yy: number, mm: number) => [31, (yy % 4 === 0 && yy % 100 !== 0) || yy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mm - 1];
  while (d > len(y, m)) {
    d -= len(y, m);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yy = m < 3 ? y - 1 : y;
  const wd = (yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) + t[m - 1] + d) % 7;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return { iso: `${y}-${pad(m)}-${pad(d)}`, y, m, d, wd };
}

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function fmt(min: number) {
  const h = Math.floor(min / 60);
  const mm = min % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm.toString().padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function hhmm(min: number) {
  return `${Math.floor(min / 60).toString().padStart(2, "0")}${(min % 60).toString().padStart(2, "0")}`;
}

export function FormBooking({
  host = "Lena Ortiz",
  title = "Intro call · Google Meet",
  startDate = "2026-11-09",
  days = 6,
  openHour = 9,
  closeHour = 17,
  durations = [30, 60],
  timeZoneLabel = "Pacific Time",
  accent = "#22c3ee",
  delay = 1000,
  onSubmit,
  className,
  style,
  ...rest
}: FormBookingProps) {
  const uid = React.useId();
  const list = React.useMemo(() => Array.from({ length: days }, (_, i) => dayInfo(startDate, i)), [startDate, days]);
  const [duration, setDuration] = React.useState(durations[0] ?? 30);
  const [day, setDay] = React.useState(() => list.find((d) => d.wd !== 0 && d.wd !== 6)?.iso ?? list[0]?.iso ?? "");
  const [slot, setSlot] = React.useState<number | null>(null);
  const [phase, setPhase] = React.useState<"pick" | "details" | "done">("pick");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [tried, setTried] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const nameRef = React.useRef<HTMLInputElement>(null);

  const busyQuarter = (iso: string, min: number) => hashText(`${iso}-${min}`) % 100 < 34;
  const slotsFor = (iso: string) => {
    const info = list.find((d) => d.iso === iso);
    if (!info || info.wd === 0 || info.wd === 6) return [];
    const out: { start: number; free: boolean }[] = [];
    for (let m = openHour * 60; m + duration <= closeHour * 60; m += 30) {
      let free = true;
      for (let k = m; k < m + duration; k += 30) if (busyQuarter(iso, k) || (k >= 12 * 60 && k < 13 * 60)) free = false;
      out.push({ start: m, free });
    }
    return out;
  };
  const slots = slotsFor(day);
  const current = list.find((d) => d.iso === day);
  const label = current ? `${weekdays[current.wd]}, ${months[current.m - 1].slice(0, 3)} ${current.d}` : "";
  const range = slot !== null ? `${fmt(slot)} to ${fmt(slot + duration)}` : "";
  const errors = {
    name: name.trim().length < 2 ? "Add your name." : "",
    email: emailRe.test(email.trim()) ? "" : "Add a valid email for the invite.",
  };

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || slot === null) return;
    if (errors.name || errors.email) {
      setTried(true);
      return;
    }
    setBusy(true);
    try {
      await Promise.all([
        Promise.resolve(onSubmit?.({ date: day, start: fmt(slot), end: fmt(slot + duration), duration, name: name.trim(), email: email.trim(), notes: notes.trim() })),
        new Promise((r) => window.setTimeout(r, delay)),
      ]);
      setPhase("done");
    } finally {
      setBusy(false);
    }
  };

  const ics = slot !== null
    ? `data:text/calendar;charset=utf-8,${encodeURIComponent(["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `DTSTART:${day.replace(/-/g, "")}T${hhmm(slot)}00`, `DTEND:${day.replace(/-/g, "")}T${hhmm(slot + duration)}00`, `SUMMARY:${title} with ${host}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n"))}`
    : "#";
  const code = `BK-${(hashText(day + slot + email) % 9000 + 1000).toString()}-${String.fromCharCode(65 + (hashText(name) % 26))}`;
  const initials = host.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const calIcon = (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" />
    </svg>
  );

  return (
    <div className={["hb-xh9", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh9-a": accent, "--hb-xh9-n": days } as React.CSSProperties} {...rest}>
      <style href="hb-form-booking" precedence="default">{css}</style>
      <div className="hb-xh9-card">
        {phase === "done" ? (
          <div className="hb-xh9-ticket" role="status">
            <div className="hb-xh9-tk">
              <div className="hb-xh9-tk-top">
                <small>Confirmed</small>
                <h3>{label}</h3>
                <p>{range} · {timeZoneLabel}</p>
                <p>{title} with {host}. Invite sent to {email.trim()}.</p>
              </div>
              <div className="hb-xh9-perf" aria-hidden="true" />
              <div className="hb-xh9-tk-bot">
                <span className="hb-xh9-code">{code}</span>
                <a className="hb-xh9-cal" href={ics} download="booking.ics">{calIcon}Add to calendar</a>
              </div>
            </div>
            <button type="button" className="hb-xh9-again" onClick={() => { setPhase("pick"); setSlot(null); setTried(false); }}>Book another time</button>
          </div>
        ) : (
          <>
            <div className="hb-xh9-head">
              <span className="hb-xh9-av" aria-hidden="true">{initials}</span>
              <span className="hb-xh9-who"><b>{host}</b><span>{title}</span></span>
              <span className="hb-xh9-dur" role="radiogroup" aria-label="Duration">
                {durations.map((d) => (
                  <button key={d} type="button" role="radio" aria-checked={duration === d} onClick={() => { setDuration(d); setSlot(null); setPhase("pick"); }}>
                    {d} min
                  </button>
                ))}
              </span>
            </div>
            <div className="hb-xh9-body">
              {phase === "pick" ? (
                <>
                  <div className="hb-xh9-month">
                    {current ? `${months[current.m - 1]} ${current.y}` : ""}
                    <span>{timeZoneLabel}</span>
                  </div>
                  <div className="hb-xh9-days" role="group" aria-label="Day">
                    {list.map((d) => {
                      const s = slotsFor(d.iso);
                      const free = s.filter((x) => x.free).length;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          className="hb-xh9-day"
                          aria-pressed={day === d.iso}
                          aria-label={`${weekdays[d.wd]} ${months[d.m - 1]} ${d.d}, ${free ? `${free} times free` : "unavailable"}`}
                          disabled={!free}
                          style={{ "--hb-xh9-o": (free ? Math.min(1, 0.25 + free / 10) : 0).toFixed(2) } as React.CSSProperties}
                          onClick={() => { setDay(d.iso); setSlot(null); }}
                        >
                          <small>{weekdays[d.wd]}</small>
                          <b>{d.d}</b>
                          <i />
                        </button>
                      );
                    })}
                  </div>
                  <div className="hb-xh9-slots" key={`${day}-${duration}`} role="group" aria-label={`Times on ${label}`}>
                    {slots.length ? slots.slice(0, 9).map((s) => (
                      <button
                        key={s.start}
                        type="button"
                        className="hb-xh9-slot"
                        disabled={!s.free}
                        aria-pressed={slot === s.start}
                        onClick={() => {
                          setSlot(s.start);
                          setPhase("details");
                          window.requestAnimationFrame(() => nameRef.current?.focus());
                        }}
                      >
                        {fmt(s.start)}
                      </button>
                    )) : <p className="hb-xh9-none">No times left this day.</p>}
                  </div>
                </>
              ) : (
                <>
                  <div className="hb-xh9-sum">
                    <span>{calIcon}<b>{label} · {range}</b></span>
                    <button type="button" className="hb-xh9-link" onClick={() => setPhase("pick")}>Change</button>
                  </div>
                  <form className="hb-xh9-form" onSubmit={confirm} noValidate>
                    <div className="hb-xh9-two">
                      <div className="hb-xh9-f">
                        <label htmlFor={`${uid}-n`}>Name</label>
                        <input ref={nameRef} id={`${uid}-n`} className="hb-xh9-in" placeholder="Sam Patel" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={tried && errors.name ? true : undefined} />
                        {tried && errors.name ? <p className="hb-xh9-e">{errors.name}</p> : null}
                      </div>
                      <div className="hb-xh9-f">
                        <label htmlFor={`${uid}-e`}>Email</label>
                        <input id={`${uid}-e`} className="hb-xh9-in" type="email" placeholder="sam@acme.co" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={tried && errors.email ? true : undefined} />
                        {tried && errors.email ? <p className="hb-xh9-e">{errors.email}</p> : null}
                      </div>
                    </div>
                    <div className="hb-xh9-f">
                      <label htmlFor={`${uid}-o`}>What should we cover?</label>
                      <textarea id={`${uid}-o`} className="hb-xh9-in" placeholder="Pricing for 25 seats and the SSO setup." value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 300))} />
                    </div>
                    <button type="submit" className="hb-xh9-go" aria-busy={busy}>{busy ? "Booking..." : `Confirm ${duration}-minute call`}</button>
                  </form>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

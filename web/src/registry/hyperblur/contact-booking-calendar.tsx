"use client";

import * as React from "react";

export interface ContactBookingHost {
  name: string;
  role: string;
  initials: string;
}

export interface ContactBookingValues {
  date: string;
  time: string;
  name: string;
  email: string;
  notes: string;
}

export interface ContactBookingCalendarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  host?: ContactBookingHost;
  duration?: string;
  timezone?: string;
  year?: number;
  month?: number;
  defaultDay?: number;
  slots?: string[];
  points?: string[];
  onSubmit?: (values: ContactBookingValues) => void | Promise<unknown>;
  accent?: string;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const longWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultSlots = ["09:00", "09:30", "10:30", "11:00", "13:30", "14:00", "15:30", "16:30"];

const css = `
.hb-yi1 {
  --hb-yi1-accent: #e2553f;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #1b1a17;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi1 *, .hb-yi1 *::before, .hb-yi1 *::after { box-sizing: border-box; }
.hb-yi1::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(27, 26, 23, .07) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(180deg, #000, transparent 70%);
}
.hb-yi1-inner { position: relative; max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yi1-head { max-width: 620px; }
.hb-yi1-eyebrow {
  display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px;
  font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--hb-yi1-accent);
}
.hb-yi1-eyebrow::before { content: ""; width: 18px; height: 1px; background: currentColor; }
.hb-yi1-title { margin: 0; font-size: clamp(30px, 5.2cqi, 50px); line-height: 1.04; letter-spacing: -.035em; font-weight: 600; }
.hb-yi1-sub { margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: #6b675e; }
.hb-yi1-card {
  display: grid; grid-template-columns: 1fr; margin-top: 40px;
  background: #fff; border: 1px solid rgba(27, 26, 23, .1); border-radius: 20px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset, 0 30px 60px -30px rgba(27, 26, 23, .25), 0 2px 6px rgba(27, 26, 23, .04);
  overflow: hidden;
  animation: hb-yi1-rise .7s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-yi1-info { padding: 24px; border-bottom: 1px solid rgba(27, 26, 23, .08); background: linear-gradient(180deg, #fbfaf6, #fff); }
.hb-yi1-host { display: flex; align-items: center; gap: 12px; }
.hb-yi1-avatar {
  display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; flex: none;
  color: #fff; font-weight: 600; font-size: 15px;
  background: linear-gradient(135deg, var(--hb-yi1-accent), color-mix(in srgb, var(--hb-yi1-accent) 55%, #3b1d78));
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px rgba(27, 26, 23, .1);
}
.hb-yi1-host p { margin: 0; }
.hb-yi1-host-name { font-weight: 600; font-size: 15px; }
.hb-yi1-host-role { font-size: 13px; color: #6b675e; margin-top: 2px !important; }
.hb-yi1-meeting { margin: 22px 0 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-yi1-facts { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 10px; }
.hb-yi1-facts li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #4a473f; }
.hb-yi1-facts svg { width: 16px; height: 16px; color: #8c877b; flex: none; }
.hb-yi1-picked {
  margin-top: 18px; padding: 12px 14px; border-radius: 12px;
  background: color-mix(in srgb, var(--hb-yi1-accent) 9%, #fff); border: 1px solid color-mix(in srgb, var(--hb-yi1-accent) 25%, transparent);
  font-size: 13px; color: #3a372f; line-height: 1.45;
}
.hb-yi1-picked b { display: block; color: color-mix(in srgb, var(--hb-yi1-accent) 80%, #000); font-size: 14px; }
.hb-yi1-points { list-style: none; padding: 18px 0 0; margin: 18px 0 0; border-top: 1px dashed rgba(27, 26, 23, .14); display: none; gap: 8px; }
.hb-yi1-points li { position: relative; padding-left: 20px; font-size: 13px; color: #6b675e; line-height: 1.5; }
.hb-yi1-points li::before { content: ""; position: absolute; left: 2px; top: 7px; width: 7px; height: 7px; border-radius: 2px; background: var(--hb-yi1-accent); transform: rotate(45deg); }
.hb-yi1-cal { padding: 22px 20px 24px; }
.hb-yi1-cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.hb-yi1-cal-head h3 { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
.hb-yi1-nav { display: flex; gap: 6px; }
.hb-yi1-navbtn {
  display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; border: 1px solid rgba(27, 26, 23, .12);
  background: #fff; color: #1b1a17; cursor: pointer; transition: background .2s, border-color .2s, opacity .2s;
}
.hb-yi1-navbtn:hover:not(:disabled) { background: #f4f2ec; }
.hb-yi1-navbtn:disabled { opacity: .35; cursor: not-allowed; }
.hb-yi1-navbtn svg { width: 14px; height: 14px; }
.hb-yi1-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.hb-yi1-wd { text-align: center; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #9a9588; padding: 4px 0 8px; }
.hb-yi1-day {
  position: relative; aspect-ratio: 1; min-height: 34px; border: 0; border-radius: 10px; padding: 0;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: #b5b0a3; background: transparent; cursor: default;
  transition: background .2s, color .2s, transform .2s cubic-bezier(.2, .8, .2, 1), box-shadow .2s;
}
.hb-yi1-day[data-open="true"] {
  cursor: pointer; color: color-mix(in srgb, var(--hb-yi1-accent) 85%, #000); font-weight: 600;
  background: color-mix(in srgb, var(--hb-yi1-accent) 10%, #fff);
}
.hb-yi1-day[data-open="true"]:hover { background: color-mix(in srgb, var(--hb-yi1-accent) 18%, #fff); transform: translateY(-1px); }
.hb-yi1-day[data-on="true"] {
  color: #fff; background: var(--hb-yi1-accent);
  box-shadow: 0 8px 18px -8px var(--hb-yi1-accent), 0 1px 0 rgba(255, 255, 255, .35) inset;
}
.hb-yi1-day[data-on="true"]:hover { background: var(--hb-yi1-accent); }
.hb-yi1-day:focus-visible, .hb-yi1-slot:focus-visible, .hb-yi1-navbtn:focus-visible, .hb-yi1-btn:focus-visible, .hb-yi1-back:focus-visible {
  outline: 2px solid var(--hb-yi1-accent); outline-offset: 2px;
}
.hb-yi1-tz { margin: 14px 0 0; font-size: 12px; color: #8c877b; display: flex; align-items: center; gap: 6px; }
.hb-yi1-tz svg { width: 14px; height: 14px; }
.hb-yi1-side { padding: 22px 20px 24px; border-top: 1px solid rgba(27, 26, 23, .08); display: flex; flex-direction: column; }
.hb-yi1-side h4 { margin: 0 0 12px; font-size: 14px; font-weight: 600; }
.hb-yi1-side h4 span { color: #8c877b; font-weight: 500; }
.hb-yi1-slots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.hb-yi1-slot {
  height: 42px; border-radius: 10px; border: 1px solid color-mix(in srgb, var(--hb-yi1-accent) 30%, rgba(27, 26, 23, .12));
  background: #fff; color: color-mix(in srgb, var(--hb-yi1-accent) 85%, #000); font: inherit; font-size: 14px; font-weight: 600;
  font-variant-numeric: tabular-nums; cursor: pointer;
  animation: hb-yi1-slot .45s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yi1-i) * 45ms);
  transition: background .2s, color .2s, border-color .2s, transform .2s;
}
.hb-yi1-slot:hover { border-color: var(--hb-yi1-accent); transform: translateY(-1px); }
.hb-yi1-slot[aria-pressed="true"] { background: #1b1a17; border-color: #1b1a17; color: #fff; }
.hb-yi1-empty { font-size: 13px; color: #8c877b; padding: 18px 0; }
.hb-yi1-actions { margin-top: auto; padding-top: 18px; display: flex; gap: 10px; align-items: center; }
.hb-yi1-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 20px; flex: 1;
  border: 0; border-radius: 999px; background: #1b1a17; color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .15) inset, 0 10px 24px -12px rgba(27, 26, 23, .6);
  transition: transform .2s, background .2s, opacity .2s;
}
.hb-yi1-btn:hover:not(:disabled) { transform: translateY(-1px); background: #000; }
.hb-yi1-btn:disabled { opacity: .4; cursor: not-allowed; }
.hb-yi1-btn[data-loading="true"] { cursor: progress; }
.hb-yi1-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, .3); border-top-color: #fff; animation: hb-yi1-spin .7s linear infinite; }
.hb-yi1-back {
  height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(27, 26, 23, .14); background: #fff; color: #1b1a17;
  font: inherit; font-size: 14px; font-weight: 500; cursor: pointer;
}
.hb-yi1-back:hover { background: #f4f2ec; }
.hb-yi1-form { display: grid; gap: 14px; animation: hb-yi1-slot .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yi1-field { display: grid; gap: 6px; }
.hb-yi1-field label { font-size: 13px; font-weight: 600; color: #3a372f; }
.hb-yi1-field input, .hb-yi1-field textarea {
  width: 100%; border-radius: 10px; border: 1px solid rgba(27, 26, 23, .16); background: #fdfcf9; color: #1b1a17;
  font: inherit; font-size: 14px; padding: 11px 12px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
}
.hb-yi1-field textarea { resize: vertical; min-height: 84px; }
.hb-yi1-field input:focus, .hb-yi1-field textarea:focus {
  border-color: var(--hb-yi1-accent); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yi1-accent) 16%, transparent);
}
.hb-yi1-field[data-invalid="true"] input { border-color: #c2412d; }
.hb-yi1-err { font-size: 12px; color: #c2412d; }
.hb-yi1-done { display: grid; justify-items: center; text-align: center; padding: 28px 8px; gap: 10px; animation: hb-yi1-slot .5s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yi1-check { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-yi1-accent) 12%, #fff); color: var(--hb-yi1-accent); }
.hb-yi1-check svg { width: 30px; height: 30px; }
.hb-yi1-check path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-yi1-draw .6s .15s ease-out forwards; }
.hb-yi1-done h4 { margin: 6px 0 0; font-size: 20px; letter-spacing: -.02em; }
.hb-yi1-done p { margin: 0; font-size: 14px; color: #6b675e; max-width: 300px; line-height: 1.55; }
@keyframes hb-yi1-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes hb-yi1-slot { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-yi1-spin { to { transform: rotate(360deg); } }
@keyframes hb-yi1-draw { to { stroke-dashoffset: 0; } }
@container (min-width: 760px) {
  .hb-yi1-inner { padding: 104px 32px 112px; }
  .hb-yi1-card { grid-template-columns: 250px minmax(0, 1fr) 230px; }
  .hb-yi1-info { border-bottom: 0; border-right: 1px solid rgba(27, 26, 23, .08); padding: 28px 26px; }
  .hb-yi1-cal { padding: 28px 28px 30px; }
  .hb-yi1-side { border-top: 0; border-left: 1px solid rgba(27, 26, 23, .08); padding: 28px 22px 30px; }
  .hb-yi1-slots { grid-template-columns: 1fr; }
  .hb-yi1-points { display: grid; }
  .hb-yi1-card[data-step="details"], .hb-yi1-card[data-step="done"] { grid-template-columns: 250px minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi1-card, .hb-yi1-slot, .hb-yi1-form, .hb-yi1-done, .hb-yi1-check path { animation: none; stroke-dashoffset: 0; }
  .hb-yi1-day, .hb-yi1-slot, .hb-yi1-btn, .hb-yi1-navbtn { transition: none; }
}
`;

function hash(n: number) {
  let x = (n + 0x6d2b79f5) | 0;
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return (x ^ (x >>> 14)) >>> 0;
}

function weekday(y: number, m: number, d: number) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yy = m < 2 ? y - 1 : y;
  return (yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) + t[m] + d) % 7;
}

function daysIn(y: number, m: number) {
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
}

function isOpen(y: number, m: number, d: number, first: number) {
  const wd = weekday(y, m, d);
  if (wd === 0 || wd === 6) return false;
  if (d < first) return false;
  return hash(y * 400 + m * 32 + d) % 5 !== 0;
}

function slotsFor(y: number, m: number, d: number, all: string[]) {
  return all.filter((_, i) => hash(y * 9000 + m * 300 + d * 11 + i) % 3 !== 0);
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function ContactBookingCalendar({
  eyebrow = "Book a walkthrough",
  title = "Pick a time. We will bring the coffee.",
  subtitle = "A 30 minute call with someone from the product team. Bring your messiest workflow and we will map it live.",
  host = { name: "Marta Okafor", role: "Solutions lead, Fieldnote", initials: "MO" },
  duration = "30 min",
  timezone = "Lisbon, GMT+0",
  year = 2026,
  month = 10,
  defaultDay = 12,
  slots = defaultSlots,
  points = ["A tailored tour of your use case", "Migration plan from your current tool", "Pricing for teams over 50 seats"],
  onSubmit,
  accent = "#e2553f",
  className = "",
  style,
  ...rest
}: ContactBookingCalendarProps) {
  const [view, setView] = React.useState({ y: year, m: month });
  const [day, setDay] = React.useState<{ y: number; m: number; d: number } | null>(() => {
    const last = daysIn(year, month);
    for (let d = defaultDay; d <= last; d++) {
      if (isOpen(year, month, d, 3)) return { y: year, m: month, d };
    }
    return null;
  });
  const [time, setTime] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<"pick" | "details" | "done">("pick");
  const [values, setValues] = React.useState({ name: "", email: "", notes: "" });
  const [tried, setTried] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dayRefs = React.useRef<Map<number, HTMLButtonElement>>(new Map());
  const timer = React.useRef<number | undefined>(undefined);
  const nameId = React.useId();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const firstOpen = view.y === year && view.m === month ? 3 : 1;
  const total = daysIn(view.y, view.m);
  const lead = (weekday(view.y, view.m, 1) + 6) % 7;
  const cells: (number | null)[] = [...Array.from({ length: lead }, () => null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const canPrev = view.y > year || (view.y === year && view.m > month);
  const daySlots = day ? slotsFor(day.y, day.m, day.d, slots) : [];
  const dayLabel = day ? `${longWeek[weekday(day.y, day.m, day.d)]}, ${monthNames[day.m]} ${day.d}` : "";
  const errors = {
    name: values.name.trim().length < 2 ? "Tell us your name." : "",
    email: emailOk(values.email) ? "" : "Enter a valid work email.",
  };

  const shift = (delta: number) => {
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  };

  const pickDay = (d: number) => {
    setDay({ y: view.y, m: view.m, d });
    setTime(null);
  };

  const onGridKey = (e: React.KeyboardEvent, d: number) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const dir = moves[e.key];
    if (!dir) return;
    e.preventDefault();
    let next = d + dir;
    while (next >= 1 && next <= total) {
      if (isOpen(view.y, view.m, next, firstOpen)) {
        dayRefs.current.get(next)?.focus();
        return;
      }
      next += dir > 0 ? 1 : -1;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (errors.name || errors.email || !day || !time || loading) return;
    setLoading(true);
    const date = `${day.y}-${String(day.m + 1).padStart(2, "0")}-${String(day.d).padStart(2, "0")}`;
    try {
      await onSubmit?.({ date, time, name: values.name.trim(), email: values.email.trim(), notes: values.notes.trim() });
    } catch {
      setLoading(false);
      return;
    }
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 800);
  };

  const reset = () => {
    setStep("pick");
    setTime(null);
    setTried(false);
    setValues({ name: "", email: "", notes: "" });
  };

  const vars = { "--hb-yi1-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yi1 ${className}`} style={vars} {...rest}>
      <style href="hb-contact-booking-calendar" precedence="default">{css}</style>
      <div className="hb-yi1-inner">
        <div className="hb-yi1-head">
          {eyebrow ? <p className="hb-yi1-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yi1-title">{title}</h2>
          {subtitle ? <p className="hb-yi1-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-yi1-card" data-step={step}>
          <aside className="hb-yi1-info">
            <div className="hb-yi1-host">
              <span className="hb-yi1-avatar" aria-hidden="true">{host.initials}</span>
              <div>
                <p className="hb-yi1-host-name">{host.name}</p>
                <p className="hb-yi1-host-role">{host.role}</p>
              </div>
            </div>
            <p className="hb-yi1-meeting">Product walkthrough</p>
            <ul className="hb-yi1-facts">
              <li><Icon d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />{duration}</li>
              <li><Icon d="M15 10l4.5-2.5v9L15 14M4 7h11v10H4z" />Video call, link sent by email</li>
              <li><Icon d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />{timezone}</li>
            </ul>
            {day && time ? (
              <div className="hb-yi1-picked">
                <b>{time}</b>
                {dayLabel}
              </div>
            ) : null}
            <ul className="hb-yi1-points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </aside>

          {step === "pick" ? (
            <>
              <div className="hb-yi1-cal">
                <div className="hb-yi1-cal-head">
                  <h3 aria-live="polite">{`${monthNames[view.m]} ${view.y}`}</h3>
                  <div className="hb-yi1-nav">
                    <button type="button" className="hb-yi1-navbtn" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month">
                      <Icon d="M15 18l-6-6 6-6" />
                    </button>
                    <button type="button" className="hb-yi1-navbtn" onClick={() => shift(1)} aria-label="Next month">
                      <Icon d="M9 18l6-6-6-6" />
                    </button>
                  </div>
                </div>
                <div className="hb-yi1-grid" role="group" aria-label={`${monthNames[view.m]} ${view.y}`}>
                  {weekNames.map((w) => (
                    <span key={w} className="hb-yi1-wd" aria-hidden="true">{w}</span>
                  ))}
                  {cells.map((d, i) => {
                    if (d === null) return <span key={`e${i}`} aria-hidden="true" />;
                    const open = isOpen(view.y, view.m, d, firstOpen);
                    const on = !!day && day.y === view.y && day.m === view.m && day.d === d;
                    return (
                      <button
                        key={d}
                        ref={(el) => {
                          if (el) dayRefs.current.set(d, el);
                          else dayRefs.current.delete(d);
                        }}
                        type="button"
                        className="hb-yi1-day"
                        data-open={open}
                        data-on={on}
                        disabled={!open}
                        aria-pressed={on}
                        aria-label={`${longWeek[weekday(view.y, view.m, d)]}, ${monthNames[view.m]} ${d}${open ? "" : ", unavailable"}`}
                        onClick={() => pickDay(d)}
                        onKeyDown={(e) => onGridKey(e, d)}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <p className="hb-yi1-tz">
                  <Icon d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  Times shown in {timezone}
                </p>
              </div>
              <div className="hb-yi1-side">
                <h4>
                  {day ? (
                    <>
                      {dayLabel.split(",")[0]} <span>{`${monthNames[day.m].slice(0, 3)} ${day.d}`}</span>
                    </>
                  ) : (
                    "Choose a day"
                  )}
                </h4>
                {day ? (
                  daySlots.length ? (
                    <div className="hb-yi1-slots" key={`${day.m}-${day.d}`} role="group" aria-label={`Times on ${dayLabel}`}>
                      {daySlots.map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          className="hb-yi1-slot"
                          aria-pressed={time === s}
                          style={{ "--hb-yi1-i": i } as React.CSSProperties}
                          onClick={() => setTime(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="hb-yi1-empty">Fully booked. Try another day.</p>
                  )
                ) : (
                  <p className="hb-yi1-empty">Highlighted days have open times.</p>
                )}
                <div className="hb-yi1-actions">
                  <button type="button" className="hb-yi1-btn" disabled={!time} onClick={() => setStep("details")}>
                    Continue
                  </button>
                </div>
              </div>
            </>
          ) : step === "details" ? (
            <div className="hb-yi1-cal">
              <form className="hb-yi1-form" noValidate onSubmit={submit} aria-busy={loading || undefined}>
                <div className="hb-yi1-cal-head">
                  <h3>Your details</h3>
                </div>
                <div className="hb-yi1-field" data-invalid={tried && !!errors.name}>
                  <label htmlFor={`${nameId}-n`}>Full name</label>
                  <input
                    id={`${nameId}-n`}
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={tried && !!errors.name}
                    aria-describedby={tried && errors.name ? `${nameId}-ne` : undefined}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    placeholder="Jordan Reyes"
                  />
                  {tried && errors.name ? <span id={`${nameId}-ne`} className="hb-yi1-err">{errors.name}</span> : null}
                </div>
                <div className="hb-yi1-field" data-invalid={tried && !!errors.email}>
                  <label htmlFor={`${nameId}-e`}>Work email</label>
                  <input
                    id={`${nameId}-e`}
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={tried && !!errors.email}
                    aria-describedby={tried && errors.email ? `${nameId}-ee` : undefined}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder="jordan@company.com"
                  />
                  {tried && errors.email ? <span id={`${nameId}-ee`} className="hb-yi1-err">{errors.email}</span> : null}
                </div>
                <div className="hb-yi1-field">
                  <label htmlFor={`${nameId}-t`}>What should we prepare?</label>
                  <textarea
                    id={`${nameId}-t`}
                    value={values.notes}
                    onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
                    placeholder="We run 40 field audits a week and lose track of photos."
                  />
                </div>
                <div className="hb-yi1-actions">
                  <button type="button" className="hb-yi1-back" onClick={() => setStep("pick")} disabled={loading}>
                    Back
                  </button>
                  <button type="submit" className="hb-yi1-btn" data-loading={loading}>
                    {loading ? <span className="hb-yi1-spin" aria-hidden="true" /> : null}
                    {loading ? "Booking" : `Confirm ${time ?? ""}`}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="hb-yi1-cal">
              <div className="hb-yi1-done" role="status">
                <span className="hb-yi1-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h4>You are booked</h4>
                <p>{`${dayLabel} at ${time}. An invite is on its way to ${values.email.trim()}.`}</p>
                <div className="hb-yi1-actions">
                  <button type="button" className="hb-yi1-back" onClick={reset}>
                    Book another time
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

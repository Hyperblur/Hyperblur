"use client";

import * as React from "react";

export interface LocalBookingService {
  id: string;
  name: string;
  duration: string;
  price: string;
}

export interface LocalBookingDay {
  weekday: string;
  date: string;
  month: string;
  full?: boolean;
}

export interface LocalBookingRequest {
  service: LocalBookingService;
  day: LocalBookingDay;
  time: string;
}

export interface LocalBookingCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  highlights?: string[];
  services?: LocalBookingService[];
  days?: LocalBookingDay[];
  slots?: string[];
  bookedSlots?: string[];
  phone?: string;
  accent?: string;
  onSubmit?: (request: LocalBookingRequest) => void;
}

const defaultServices: LocalBookingService[] = [
  { id: "checkup", name: "Check-up and clean", duration: "45 min", price: "$95" },
  { id: "whitening", name: "Teeth whitening", duration: "60 min", price: "$320" },
  { id: "consult", name: "Invisalign consult", duration: "30 min", price: "Free" },
  { id: "emergency", name: "Emergency visit", duration: "30 min", price: "$140" },
];

const defaultDays: LocalBookingDay[] = [
  { weekday: "Mon", date: "10", month: "Nov" },
  { weekday: "Tue", date: "11", month: "Nov" },
  { weekday: "Wed", date: "12", month: "Nov", full: true },
  { weekday: "Thu", date: "13", month: "Nov" },
  { weekday: "Fri", date: "14", month: "Nov" },
  { weekday: "Sat", date: "15", month: "Nov" },
  { weekday: "Sun", date: "16", month: "Nov", full: true },
];

const defaultSlots = ["8:30", "9:15", "10:00", "10:45", "11:30", "1:15", "2:00", "2:45", "3:30", "4:15", "5:00", "5:45"];

const css = `
.hb-kl1 {
  --hb-kl1-accent: #0f9488;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f3fbfa 0%, #ffffff 70%);
  color: #10302d;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl1 *, .hb-kl1 *::before, .hb-kl1 *::after { box-sizing: border-box; }
.hb-kl1-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}
.hb-kl1-blob-a { width: 520px; height: 520px; right: -140px; top: -180px; background: radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--hb-kl1-accent) 22%, transparent), transparent 65%); }
.hb-kl1-blob-b { width: 380px; height: 380px; left: -160px; bottom: -160px; background: radial-gradient(circle, #d8f1ee, transparent 70%); }
.hb-kl1-wrap {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 24px 96px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 56px;
  align-items: center;
}
.hb-kl1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #d5ebe8;
  color: #2c625c;
  font-size: 13px;
  font-weight: 500;
}
.hb-kl1-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-kl1-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kl1-accent) 18%, transparent); animation: hb-kl1-pulse 2.4s ease-in-out infinite; }
@keyframes hb-kl1-pulse { 50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--hb-kl1-accent) 6%, transparent); } }
.hb-kl1-title {
  margin: 0;
  font-family: var(--font-serif, Georgia, serif);
  font-weight: 400;
  font-size: clamp(38px, 5.4cqw, 60px);
  line-height: 1.02;
  letter-spacing: -.02em;
  color: #0b2724;
  text-wrap: balance;
}
.hb-kl1-title em { font-style: italic; color: var(--hb-kl1-accent); }
.hb-kl1-sub { margin: 18px 0 0; max-width: 440px; color: #4b6a66; font-size: 16.5px; line-height: 1.6; }
.hb-kl1-list { margin: 26px 0 0; padding: 0; list-style: none; display: grid; gap: 10px; }
.hb-kl1-list li { display: flex; align-items: center; gap: 10px; color: #234a46; font-size: 14.5px; }
.hb-kl1-check { flex: none; display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: color-mix(in srgb, var(--hb-kl1-accent) 14%, #fff); color: var(--hb-kl1-accent); }
.hb-kl1-phone { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; color: #0b2724; font-weight: 600; font-size: 15px; text-decoration: none; border-bottom: 1px solid #b9dcd8; padding-bottom: 2px; }
.hb-kl1-phone:hover { border-color: var(--hb-kl1-accent); }
.hb-kl1-phone:focus-visible { outline: 2px solid var(--hb-kl1-accent); outline-offset: 4px; border-radius: 4px; }
.hb-kl1-card {
  position: relative;
  min-width: 0;
  padding: 26px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #e1efed;
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -30px rgba(15, 80, 74, .35), 0 8px 20px -12px rgba(15, 80, 74, .2);
  animation: hb-kl1-rise .7s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes hb-kl1-rise { from { opacity: 0; transform: translateY(18px); } }
.hb-kl1-cardhead { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.hb-kl1-cardtitle { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.hb-kl1-step { color: #6b8985; font-size: 12.5px; }
.hb-kl1-label { display: block; margin: 0 0 8px; color: #57746f; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-kl1-select { position: relative; margin-bottom: 20px; }
.hb-kl1-select select {
  appearance: none;
  width: 100%;
  padding: 13px 40px 13px 14px;
  border: 1px solid #d9e9e7;
  border-radius: 12px;
  background: #f8fcfb;
  color: #10302d;
  font: inherit;
  font-size: 15px;
  cursor: pointer;
}
.hb-kl1-select select:focus-visible { outline: 2px solid var(--hb-kl1-accent); outline-offset: 2px; }
.hb-kl1-select svg { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #57746f; }
.hb-kl1-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; margin-bottom: 20px; }
.hb-kl1-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 9px 0 8px;
  border: 1px solid #e1efed;
  border-radius: 12px;
  background: #ffffff;
  color: #10302d;
  font: inherit;
  cursor: pointer;
  transition: background .2s, border-color .2s, color .2s, transform .2s;
}
.hb-kl1-day span { font-size: 11px; color: #6b8985; }
.hb-kl1-day b { font-size: 17px; font-weight: 600; }
.hb-kl1-day:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hb-kl1-accent) 50%, #e1efed); transform: translateY(-1px); }
.hb-kl1-day[aria-pressed="true"] { background: var(--hb-kl1-accent); border-color: var(--hb-kl1-accent); color: #fff; }
.hb-kl1-day[aria-pressed="true"] span { color: rgba(255,255,255,.8); }
.hb-kl1-day:disabled { cursor: not-allowed; opacity: .45; background: repeating-linear-gradient(135deg, #f4f8f7 0 4px, #fff 4px 8px); }
.hb-kl1-day:focus-visible, .hb-kl1-slot:focus-visible, .hb-kl1-submit:focus-visible, .hb-kl1-reset:focus-visible { outline: 2px solid var(--hb-kl1-accent); outline-offset: 2px; }
.hb-kl1-slots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-bottom: 22px; }
.hb-kl1-slot {
  padding: 10px 0;
  border: 1px solid #e1efed;
  border-radius: 10px;
  background: #fff;
  color: #10302d;
  font: inherit;
  font-size: 13.5px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background .2s, border-color .2s, color .2s;
}
.hb-kl1-slot:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hb-kl1-accent) 50%, #e1efed); background: #f6fbfa; }
.hb-kl1-slot[aria-pressed="true"] { background: color-mix(in srgb, var(--hb-kl1-accent) 12%, #fff); border-color: var(--hb-kl1-accent); color: color-mix(in srgb, var(--hb-kl1-accent) 70%, #000); font-weight: 600; }
.hb-kl1-slot:disabled { color: #a9bcb9; text-decoration: line-through; cursor: not-allowed; }
.hb-kl1-foot { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-top: 18px; border-top: 1px dashed #dcebe9; }
.hb-kl1-summary { min-width: 0; font-size: 13px; color: #57746f; line-height: 1.4; }
.hb-kl1-summary b { display: block; color: #10302d; font-size: 14.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-kl1-submit {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 20px;
  border: 0;
  border-radius: 999px;
  background: #0b2724;
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s, transform .2s, box-shadow .2s;
}
.hb-kl1-submit:hover:not(:disabled) { background: var(--hb-kl1-accent); box-shadow: 0 10px 24px -10px var(--hb-kl1-accent); transform: translateY(-1px); }
.hb-kl1-submit:disabled { opacity: .4; cursor: not-allowed; }
.hb-kl1-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 28px 8px 8px; animation: hb-kl1-rise .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-kl1-badge { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; background: color-mix(in srgb, var(--hb-kl1-accent) 14%, #fff); color: var(--hb-kl1-accent); margin-bottom: 18px; }
.hb-kl1-badge path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-kl1-draw .6s .2s ease forwards; }
@keyframes hb-kl1-draw { to { stroke-dashoffset: 0; } }
.hb-kl1-done h3 { margin: 0; font-family: var(--font-serif, Georgia, serif); font-weight: 400; font-size: 30px; color: #0b2724; }
.hb-kl1-done p { margin: 10px 0 0; color: #4b6a66; font-size: 15px; line-height: 1.55; max-width: 340px; }
.hb-kl1-ticket { width: 100%; margin: 22px 0; padding: 16px; border-radius: 14px; background: #f5fbfa; border: 1px solid #e1efed; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; text-align: left; }
.hb-kl1-ticket span { display: block; color: #6b8985; font-size: 11.5px; text-transform: uppercase; letter-spacing: .06em; }
.hb-kl1-ticket b { display: block; margin-top: 4px; font-size: 14px; color: #10302d; }
.hb-kl1-reset { padding: 10px 16px; border: 1px solid #d9e9e7; border-radius: 999px; background: #fff; color: #10302d; font: inherit; font-size: 14px; cursor: pointer; }
.hb-kl1-reset:hover { border-color: var(--hb-kl1-accent); }
@container (max-width: 820px) {
  .hb-kl1-wrap { grid-template-columns: minmax(0, 1fr); gap: 40px; padding: 64px 20px 72px; }
}
@container (max-width: 420px) {
  .hb-kl1-card { padding: 18px; border-radius: 20px; }
  .hb-kl1-days { gap: 4px; }
  .hb-kl1-day b { font-size: 15px; }
  .hb-kl1-slots { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hb-kl1-foot { flex-direction: column; align-items: stretch; }
  .hb-kl1-submit { justify-content: center; }
  .hb-kl1-ticket { grid-template-columns: minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl1 *, .hb-kl1 *::before, .hb-kl1 *::after { animation: none !important; transition: none !important; }
  .hb-kl1-badge path { stroke-dashoffset: 0; }
}
`;

function Check({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LocalBookingCard({
  eyebrow = "Accepting new patients in Park Slope",
  title = "A calmer kind of dental visit.",
  subtitle = "Same-week appointments, transparent pricing and a team that explains every step before it happens.",
  highlights = ["Most PPO plans accepted, in network", "Evening hours Tuesday and Thursday", "Rated 4.9 from 1,240 patients"],
  services = defaultServices,
  days = defaultDays,
  slots = defaultSlots,
  bookedSlots = ["9:15", "11:30", "2:45", "5:00"],
  phone = "(718) 555-0142",
  accent = "#0f9488",
  onSubmit,
  className,
  style,
  ...rest
}: LocalBookingCardProps) {
  const uid = React.useId();
  const firstOpen = Math.max(0, days.findIndex((d) => !d.full));
  const [serviceId, setServiceId] = React.useState(services[0]?.id ?? "");
  const [dayIndex, setDayIndex] = React.useState(firstOpen);
  const [time, setTime] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const day = days[dayIndex];
  const booked = new Set(bookedSlots);
  const titleParts = title.split(" ");
  const lastWord = titleParts.pop();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!service || !day || !time) return;
    setConfirmed(true);
    onSubmit?.({ service, day, time });
  };

  return (
    <section
      className={["hb-kl1", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-booking-card" precedence="default">{css}</style>
      <div className="hb-kl1-blob hb-kl1-blob-a" aria-hidden="true" />
      <div className="hb-kl1-blob hb-kl1-blob-b" aria-hidden="true" />
      <div className="hb-kl1-wrap">
        <div>
          <p className="hb-kl1-eyebrow"><span className="hb-kl1-dot" />{eyebrow}</p>
          <h2 className="hb-kl1-title">
            {titleParts.join(" ")} <em>{lastWord}</em>
          </h2>
          <p className="hb-kl1-sub">{subtitle}</p>
          <ul className="hb-kl1-list">
            {highlights.map((h) => (
              <li key={h}><span className="hb-kl1-check"><Check /></span>{h}</li>
            ))}
          </ul>
          {phone ? (
            <a className="hb-kl1-phone" href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.6 3.5h2.7l1.4 4-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4 1.4v2.7a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              Prefer to call? {phone}
            </a>
          ) : null}
        </div>

        <div className="hb-kl1-card">
          {confirmed && service && day && time ? (
            <div className="hb-kl1-done" role="status">
              <div className="hb-kl1-badge">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>You are booked in.</h3>
              <p>We sent a confirmation and a reminder will follow the day before. Arrive five minutes early to check in.</p>
              <div className="hb-kl1-ticket">
                <div><span>Service</span><b>{service.name}</b></div>
                <div><span>Date</span><b>{day.weekday}, {day.month} {day.date}</b></div>
                <div><span>Time</span><b>{time}</b></div>
              </div>
              <button type="button" className="hb-kl1-reset" onClick={() => { setConfirmed(false); setTime(null); }}>
                Book another visit
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="hb-kl1-cardhead">
                <h3 className="hb-kl1-cardtitle">Book an appointment</h3>
                <span className="hb-kl1-step">Takes 30 seconds</span>
              </div>
              <label className="hb-kl1-label" htmlFor={`${uid}-service`}>Service</label>
              <div className="hb-kl1-select">
                <select id={`${uid}-service`} value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} · {s.duration} · {s.price}</option>
                  ))}
                </select>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="hb-kl1-label" id={`${uid}-days`}>Date</span>
              <div className="hb-kl1-days" role="group" aria-labelledby={`${uid}-days`}>
                {days.map((d, i) => (
                  <button
                    key={`${d.weekday}-${d.date}`}
                    type="button"
                    className="hb-kl1-day"
                    aria-pressed={i === dayIndex}
                    aria-label={`${d.weekday} ${d.month} ${d.date}${d.full ? ", fully booked" : ""}`}
                    disabled={d.full}
                    onClick={() => { setDayIndex(i); setTime(null); }}
                  >
                    <span>{d.weekday}</span>
                    <b>{d.date}</b>
                  </button>
                ))}
              </div>
              <span className="hb-kl1-label" id={`${uid}-slots`}>Time</span>
              <div className="hb-kl1-slots" role="group" aria-labelledby={`${uid}-slots`}>
                {slots.map((s, i) => {
                  const taken = booked.has(s) || ((dayIndex + i) % 5 === 0 && i > 0);
                  return (
                    <button
                      key={s}
                      type="button"
                      className="hb-kl1-slot"
                      aria-pressed={time === s}
                      disabled={taken}
                      aria-label={`${s}${taken ? ", taken" : ""}`}
                      onClick={() => setTime(s)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="hb-kl1-foot">
                <div className="hb-kl1-summary" aria-live="polite">
                  <b>{service ? service.name : "Choose a service"}</b>
                  {day ? `${day.weekday}, ${day.month} ${day.date}` : ""}{time ? ` at ${time}` : " · pick a time"}
                </div>
                <button type="submit" className="hb-kl1-submit" disabled={!time}>
                  Confirm booking
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

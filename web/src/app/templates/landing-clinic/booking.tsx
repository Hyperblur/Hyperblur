"use client";

import { useState, type FormEvent } from "react";
import { Ico, icons } from "./icons";

const services = [
  { id: "checkup", label: "Check-up & clean", note: "45 min · from $145" },
  { id: "whitening", label: "Whitening consult", note: "30 min · free" },
  { id: "aligners", label: "Aligner assessment", note: "40 min · free 3D scan" },
  { id: "kids", label: "Kids' visit", note: "30 min · from $95" },
  { id: "emergency", label: "Tooth pain, today", note: "30 min · $180" },
];

const days = [
  { id: "thu", short: "Thu", num: "6", label: "Today" },
  { id: "fri", short: "Fri", num: "7", label: "Fri" },
  { id: "sat", short: "Sat", num: "8", label: "Sat" },
  { id: "mon", short: "Mon", num: "10", label: "Mon" },
  { id: "tue", short: "Tue", num: "11", label: "Tue" },
];

const slots: Record<string, { time: string; taken?: boolean }[]> = {
  thu: [
    { time: "2:40 pm" },
    { time: "3:20 pm", taken: true },
    { time: "4:00 pm" },
    { time: "5:30 pm", taken: true },
    { time: "6:10 pm" },
    { time: "6:50 pm" },
  ],
  fri: [
    { time: "8:20 am" },
    { time: "9:20 am" },
    { time: "11:00 am", taken: true },
    { time: "1:40 pm" },
    { time: "3:00 pm" },
    { time: "4:20 pm", taken: true },
  ],
  sat: [
    { time: "9:00 am", taken: true },
    { time: "9:40 am" },
    { time: "10:20 am" },
    { time: "11:40 am", taken: true },
    { time: "12:20 pm" },
    { time: "1:40 pm" },
  ],
  mon: [
    { time: "8:00 am" },
    { time: "8:40 am" },
    { time: "10:00 am" },
    { time: "12:40 pm", taken: true },
    { time: "2:20 pm" },
    { time: "5:00 pm" },
  ],
  tue: [
    { time: "8:40 am", taken: true },
    { time: "10:40 am" },
    { time: "11:20 am" },
    { time: "2:00 pm" },
    { time: "3:40 pm" },
    { time: "6:20 pm" },
  ],
};

const dayNames: Record<string, string> = {
  thu: "today, Thursday Nov 6",
  fri: "Friday Nov 7",
  sat: "Saturday Nov 8",
  mon: "Monday Nov 10",
  tue: "Tuesday Nov 11",
};

function firstOpen(day: string) {
  return slots[day].find((s) => !s.taken)?.time ?? "";
}

export function BookingCard() {
  const [service, setService] = useState(services[0].id);
  const [patient, setPatient] = useState<"new" | "returning">("new");
  const [day, setDay] = useState("thu");
  const [time, setTime] = useState(firstOpen("thu"));
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const chosen = services.find((s) => s.id === service) ?? services[0];

  function pickDay(id: string) {
    setDay(id);
    setTime(firstOpen(id));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className="hbl-cl-book hbl-cl-book-done" role="status" aria-live="polite">
        <span className="hbl-cl-book-check" aria-hidden="true">
          <Ico size={26} stroke={2.4}>{icons.check}</Ico>
        </span>
        <p className="hbl-cl-book-done-title">You are pencilled in.</p>
        <p className="hbl-cl-book-done-text">
          {chosen.label} on {dayNames[day]} at {time}. We will text {phone || "your phone"} within 10 minutes to
          confirm, with parking tips and a short health form.
        </p>
        <ul className="hbl-cl-book-done-list">
          <li>
            <Ico size={16}>{icons.pin}</Ico>214 Larkspur Avenue, suite 2
          </li>
          <li>
            <Ico size={16}>{icons.clock}</Ico>Arrive 10 minutes early, tea is on us
          </li>
        </ul>
        <button type="button" className="hbl-cl-book-link" onClick={() => setDone(false)}>
          Change details
        </button>
      </div>
    );
  }

  return (
    <form className="hbl-cl-book" onSubmit={submit} aria-label="Book a visit">
      <div className="hbl-cl-book-head">
        <p className="hbl-cl-book-title">Book a visit</p>
        <span className="hbl-cl-book-badge">
          <i aria-hidden="true" />
          Online in 60 seconds
        </span>
      </div>

      <div className="hbl-cl-seg" role="radiogroup" aria-label="Patient type">
        {(["new", "returning"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={patient === p}
            className="hbl-cl-seg-btn"
            onClick={() => setPatient(p)}
          >
            {p === "new" ? "New patient" : "Returning"}
          </button>
        ))}
      </div>

      <label className="hbl-cl-field">
        <span className="hbl-cl-field-label">Reason for visit</span>
        <span className="hbl-cl-select-wrap">
          <select value={service} onChange={(e) => setService(e.target.value)} className="hbl-cl-select">
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className="hbl-cl-field-note">{chosen.note}</span>
      </label>

      <fieldset className="hbl-cl-fs">
        <legend className="hbl-cl-field-label">Day</legend>
        <div className="hbl-cl-days">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              className="hbl-cl-day"
              aria-pressed={day === d.id}
              aria-label={dayNames[d.id]}
              onClick={() => pickDay(d.id)}
            >
              <span>{d.label}</span>
              <b>{d.num}</b>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="hbl-cl-fs">
        <legend className="hbl-cl-field-label">Time</legend>
        <div className="hbl-cl-slots">
          {slots[day].map((s) => (
            <button
              key={s.time}
              type="button"
              className="hbl-cl-slot"
              disabled={s.taken}
              aria-pressed={time === s.time}
              onClick={() => setTime(s.time)}
            >
              {s.time}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="hbl-cl-field">
        <span className="hbl-cl-field-label">Mobile number</span>
        <input
          className="hbl-cl-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(415) 555-0123"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="hbl-cl-btn hbl-cl-btn-coral hbl-cl-book-submit">
        Request {time}
        <Ico size={16} stroke={2.2}>{icons.arrow}</Ico>
      </button>
      <p className="hbl-cl-book-fine">
        No card needed. Free to cancel up to 24 hours before.
      </p>
    </form>
  );
}

"use client";

import * as React from "react";
import { ArrowIcon, CheckIcon } from "./icons";

const days = [
  { id: "thu", label: "Thu", date: "13" },
  { id: "fri", label: "Fri", date: "14" },
  { id: "sat", label: "Sat", date: "15" },
  { id: "sun", label: "Sun", date: "16" },
  { id: "mon", label: "Mon", date: "17" },
];

const times = ["6:00 AM", "7:15 AM", "12:10 PM", "5:30 PM", "6:45 PM"];

const programs = ["Strength Foundations", "Engine HIIT", "Mobility Reset", "Fight Club Boxing", "Junior Athletes (8 to 14)"];

export function BookingCard() {
  const uid = React.useId();
  const [day, setDay] = React.useState("thu");
  const [time, setTime] = React.useState("5:30 PM");
  const [program, setProgram] = React.useState(programs[0]);
  const [name, setName] = React.useState("");
  const [done, setDone] = React.useState(false);

  const picked = days.find((d) => d.id === day) ?? days[0];

  if (done) {
    return (
      <div id="hbl-ft-claim" className="hbl-ft-book" aria-live="polite">
        <div className="hbl-ft-book-ok">
          <span className="hbl-ft-book-check">
            <CheckIcon className="h-6 w-6" />
          </span>
          <p className="font-grotesk text-2xl font-bold uppercase tracking-[-0.03em]">You are in{name ? `, ${name.split(" ")[0]}` : ""}.</p>
          <p className="mt-2 text-sm hbl-ft-muted">
            {program} on {picked.label} {picked.date} Nov at <span className="font-mono text-[#f1f0e8]">{time}</span>. Arrive 10 minutes early, bring water and closed shoes. Your 7 free days start at check-in.
          </p>
          <button type="button" className="hbl-ft-btn-ghost mt-5" onClick={() => setDone(false)}>
            Change booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="hbl-ft-claim"
      className="hbl-ft-book"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-grotesk text-lg font-bold uppercase tracking-[-0.02em]">Claim a free week</p>
        <span className="hbl-ft-tag">7 days · $0</span>
      </div>
      <p className="mt-1 text-[13px] hbl-ft-muted">Pick your first class. No card, no contract.</p>

      <fieldset className="mt-4">
        <legend className="hbl-ft-mono-label">Day</legend>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              className="hbl-ft-daychip"
              aria-pressed={day === d.id}
              onClick={() => setDay(d.id)}
            >
              <span className="text-[11px] uppercase tracking-[0.08em]">{d.label}</span>
              <span className="font-mono text-base">{d.date}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="hbl-ft-mono-label">Time</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              className="hbl-ft-slot"
              aria-pressed={time === t}
              onClick={() => setTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block min-w-0" htmlFor={`${uid}-p`}>
          <span className="hbl-ft-mono-label">Class</span>
          <select id={`${uid}-p`} className="hbl-ft-field mt-1.5" value={program} onChange={(e) => setProgram(e.target.value)}>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-0" htmlFor={`${uid}-n`}>
          <span className="hbl-ft-mono-label">First name</span>
          <input
            id={`${uid}-n`}
            className="hbl-ft-field mt-1.5"
            required
            autoComplete="given-name"
            placeholder="Jordan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="hbl-ft-btn mt-5 w-full justify-center">
        Book {picked.label} {picked.date} · {time}
        <ArrowIcon className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-[12px] hbl-ft-muted">218 people claimed a free week this month</p>
    </form>
  );
}

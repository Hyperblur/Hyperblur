"use client";

import { useState } from "react";
import { Ico, icons } from "./icons";

const days = [
  { id: "thu", dow: "Thu", day: 5, label: "Thursday, Nov 5", note: "Tonight" },
  { id: "fri", dow: "Fri", day: 6, label: "Friday, Nov 6", note: "" },
  { id: "sat", dow: "Sat", day: 7, label: "Saturday, Nov 7", note: "" },
  { id: "sun", dow: "Sun", day: 8, label: "Sunday, Nov 8", note: "" },
  { id: "mon", dow: "Mon", day: 9, label: "Monday, Nov 9", note: "Closed" },
  { id: "tue", dow: "Tue", day: 10, label: "Tuesday, Nov 10", note: "" },
  { id: "wed", dow: "Wed", day: 11, label: "Wednesday, Nov 11", note: "" },
];

const times = ["5:30", "6:00", "6:45", "7:15", "8:00", "8:30", "9:15"];

const seats = [
  { id: "room", label: "Dining room" },
  { id: "counter", label: "Chef's counter" },
  { id: "terrace", label: "Heated terrace" },
];

function soldOut(dayIndex: number, timeIndex: number) {
  return ((dayIndex * 7 + timeIndex * 3 + 2) % 5 === 0) || (dayIndex === 2 && timeIndex > 1 && timeIndex < 5);
}

export function ReservationCard() {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(3);
  const [guests, setGuests] = useState(2);
  const [seat, setSeat] = useState("room");
  const [done, setDone] = useState(false);

  const selectedDay = days[day];
  const timeTaken = soldOut(day, time);
  const canBook = selectedDay.note !== "Closed" && !timeTaken;
  const code = `EO-${(4800 + day * 131 + time * 17 + guests * 7).toString()}`;
  const seatLabel = seats.find((s) => s.id === seat)?.label ?? "";

  function pickDay(i: number) {
    setDay(i);
    if (soldOut(i, time)) {
      const free = times.findIndex((_, t) => !soldOut(i, t));
      if (free >= 0) setTime(free);
    }
  }

  if (done) {
    return (
      <div id="reserve" className="hbl-rs-res hbl-rs-res-done" role="status" aria-live="polite">
        <span className="hbl-rs-res-check">
          <Ico size={26} stroke={2.2}>{icons.check}</Ico>
        </span>
        <p className="hbl-rs-mono hbl-rs-res-kicker">Table held for 10 minutes</p>
        <h2 className="hbl-rs-res-title">See you by the fire.</h2>
        <p className="hbl-rs-res-sum">
          {guests} {guests === 1 ? "guest" : "guests"}, {selectedDay.label} at {times[time]} PM, {seatLabel.toLowerCase()}.
        </p>
        <dl className="hbl-rs-res-meta">
          <div>
            <dt>Confirmation</dt>
            <dd className="hbl-rs-mono">{code}</dd>
          </div>
          <div>
            <dt>Grace period</dt>
            <dd>15 minutes</dd>
          </div>
        </dl>
        <p className="hbl-rs-res-fine">A text with your details goes out after you confirm by phone or email. Free cancellation until 24 hours before.</p>
        <button type="button" className="hbl-rs-btn hbl-rs-btn-ghost hbl-rs-btn-block" onClick={() => setDone(false)}>
          Change reservation
        </button>
      </div>
    );
  }

  return (
    <form
      id="reserve"
      className="hbl-rs-res"
      aria-labelledby="hbl-rs-res-h"
      onSubmit={(e) => {
        e.preventDefault();
        if (canBook) setDone(true);
      }}
    >
      <div className="hbl-rs-res-head">
        <h2 id="hbl-rs-res-h" className="hbl-rs-res-title">Reserve a table</h2>
        <span className="hbl-rs-res-live">
          <span className="hbl-rs-dot" aria-hidden="true" />
          6 tables left tonight
        </span>
      </div>

      <fieldset className="hbl-rs-field">
        <legend className="hbl-rs-mono hbl-rs-legend">Date</legend>
        <div className="hbl-rs-days">
          {days.map((d, i) => {
            const closed = d.note === "Closed";
            return (
              <button
                key={d.id}
                type="button"
                className="hbl-rs-day"
                aria-pressed={day === i}
                aria-label={closed ? `${d.label}, closed` : d.label}
                disabled={closed}
                onClick={() => pickDay(i)}
              >
                <span className="hbl-rs-day-dow">{d.dow}</span>
                <span className="hbl-rs-day-n">{d.day}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="hbl-rs-field">
        <legend className="hbl-rs-mono hbl-rs-legend">Time</legend>
        <div className="hbl-rs-times">
          {times.map((t, i) => {
            const taken = soldOut(day, i);
            return (
              <button
                key={t}
                type="button"
                className="hbl-rs-time"
                aria-pressed={time === i}
                aria-label={taken ? `${t} PM, fully booked` : `${t} PM`}
                disabled={taken}
                onClick={() => setTime(i)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="hbl-rs-res-row">
        <div className="hbl-rs-field">
          <span className="hbl-rs-mono hbl-rs-legend" id="hbl-rs-guests-l">Guests</span>
          <div className="hbl-rs-stepper" role="group" aria-labelledby="hbl-rs-guests-l">
            <button
              type="button"
              aria-label="Fewer guests"
              disabled={guests <= 1}
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
            >
              <Ico size={16} stroke={2}>{icons.minus}</Ico>
            </button>
            <output aria-live="polite">{guests}</output>
            <button
              type="button"
              aria-label="More guests"
              disabled={guests >= 8}
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
            >
              <Ico size={16} stroke={2}>{icons.plus}</Ico>
            </button>
          </div>
        </div>
        <div className="hbl-rs-field hbl-rs-field-grow">
          <label className="hbl-rs-mono hbl-rs-legend" htmlFor="hbl-rs-seat">
            Seating
          </label>
          <select id="hbl-rs-seat" className="hbl-rs-select" value={seat} onChange={(e) => setSeat(e.target.value)}>
            {seats.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="hbl-rs-btn hbl-rs-btn-primary hbl-rs-btn-block" disabled={!canBook}>
        {canBook ? `Reserve for ${guests} · ${selectedDay.dow} ${times[time]} PM` : "Pick an open time"}
        <Ico size={16} stroke={2}>{icons.arrow}</Ico>
      </button>
      <p className="hbl-rs-res-fine">
        {guests >= 8 ? "Eight or more? The Olive Room seats up to 18. " : ""}
        No card needed. Free cancellation until 24 hours before.
      </p>
    </form>
  );
}

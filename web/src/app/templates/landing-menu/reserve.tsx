"use client";

import { useState } from "react";
import { Ico, icons } from "./icons";

const days = [
  { dow: "Thu", day: 5, label: "Thursday, Nov 5", today: true },
  { dow: "Fri", day: 6, label: "Friday, Nov 6", today: false },
  { dow: "Sat", day: 7, label: "Saturday, Nov 7", today: false },
  { dow: "Sun", day: 8, label: "Sunday, Nov 8", today: false },
  { dow: "Mon", day: 9, label: "Monday, Nov 9", today: false },
  { dow: "Tue", day: 10, label: "Tuesday, Nov 10", today: false },
  { dow: "Wed", day: 11, label: "Wednesday, Nov 11", today: false },
];

const slots = {
  lunch: ["11:30", "12:00", "12:30", "1:00", "1:45", "2:15"],
  dinner: ["5:30", "6:15", "7:00", "7:30", "8:15", "9:00"],
};

const seating = [
  { id: "room", label: "Dining room" },
  { id: "patio", label: "Garden patio" },
  { id: "bar", label: "Chef's bar" },
];

type Meal = keyof typeof slots;

function closed(meal: Meal, dayIndex: number) {
  return meal === "dinner" && days[dayIndex].dow === "Mon";
}

function booked(meal: Meal, dayIndex: number, slot: number) {
  const seed = (dayIndex * 11 + slot * 7 + (meal === "dinner" ? 3 : 0)) % 6;
  return seed === 0 || (meal === "dinner" && dayIndex === 2 && slot >= 2 && slot <= 3);
}

function firstFree(meal: Meal, dayIndex: number) {
  return slots[meal].findIndex((_, i) => !booked(meal, dayIndex, i));
}

export function ReserveCard() {
  const [meal, setMeal] = useState<Meal>("dinner");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(2);
  const [guests, setGuests] = useState(2);
  const [seat, setSeat] = useState("room");
  const [done, setDone] = useState(false);

  const isClosed = closed(meal, day);
  const taken = booked(meal, day, slot);
  const canBook = !isClosed && !taken && slot >= 0;
  const time = slot >= 0 ? `${slots[meal][slot]} ${meal === "lunch" && slot < 1 ? "AM" : "PM"}` : "";
  const seatLabel = seating.find((s) => s.id === seat)?.label ?? "";
  const code = `VR-${(3100 + day * 97 + slot * 13 + guests * 5 + (meal === "dinner" ? 400 : 0)).toString()}`;

  function chooseMeal(m: Meal) {
    setMeal(m);
    let d = day;
    if (closed(m, d)) {
      d = 0;
      setDay(0);
    }
    setSlot(firstFree(m, d));
  }

  function chooseDay(i: number) {
    setDay(i);
    if (booked(meal, i, slot) || slot < 0) setSlot(firstFree(meal, i));
  }

  if (done) {
    return (
      <div id="reserve" className="hbl-mn-res hbl-mn-res-done" role="status" aria-live="polite">
        <span className="hbl-mn-res-check">
          <Ico size={26} stroke={2.2}>{icons.check}</Ico>
        </span>
        <p className="hbl-mn-res-kicker">Table held for 10 minutes</p>
        <h2 className="hbl-mn-res-title">You&apos;re on the list.</h2>
        <p className="hbl-mn-res-sum">
          {guests} {guests === 1 ? "guest" : "guests"} for {meal}, {days[day].label} at {time}, {seatLabel.toLowerCase()}.
        </p>
        <dl className="hbl-mn-res-meta">
          <div>
            <dt>Confirmation</dt>
            <dd>{code}</dd>
          </div>
          <div>
            <dt>Grace period</dt>
            <dd>15 minutes</dd>
          </div>
        </dl>
        <button type="button" className="hbl-mn-btn hbl-mn-btn-ghost hbl-mn-btn-block" onClick={() => setDone(false)}>
          Change details
        </button>
      </div>
    );
  }

  return (
    <form
      id="reserve"
      className="hbl-mn-res"
      aria-labelledby="hbl-mn-res-h"
      onSubmit={(e) => {
        e.preventDefault();
        if (canBook) setDone(true);
      }}
    >
      <div className="hbl-mn-res-head">
        <h2 id="hbl-mn-res-h" className="hbl-mn-res-title">
          Reserve a table
        </h2>
        <span className="hbl-mn-res-live">
          <span className="hbl-mn-dot" aria-hidden="true" />4 left tonight
        </span>
      </div>

      <div className="hbl-mn-res-meal" role="group" aria-label="Meal">
        {(["lunch", "dinner"] as Meal[]).map((m) => (
          <button key={m} type="button" aria-pressed={meal === m} onClick={() => chooseMeal(m)}>
            {m === "lunch" ? "Lunch" : "Dinner"}
          </button>
        ))}
      </div>

      <fieldset className="hbl-mn-field">
        <legend className="hbl-mn-legend">Date</legend>
        <div className="hbl-mn-days">
          {days.map((d, i) => {
            const off = closed(meal, i);
            return (
              <button
                key={d.label}
                type="button"
                className="hbl-mn-day"
                aria-pressed={day === i}
                aria-label={off ? `${d.label}, closed for dinner` : d.today ? `${d.label}, today` : d.label}
                disabled={off}
                onClick={() => chooseDay(i)}
              >
                <span className="hbl-mn-day-dow">{d.today ? "Today" : d.dow}</span>
                <span className="hbl-mn-day-n">{d.day}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="hbl-mn-field">
        <legend className="hbl-mn-legend">Time</legend>
        <div className="hbl-mn-slots">
          {slots[meal].map((t, i) => {
            const full = booked(meal, day, i) || isClosed;
            return (
              <button
                key={t}
                type="button"
                className="hbl-mn-slot"
                aria-pressed={slot === i}
                aria-label={full ? `${t}, fully booked` : t}
                disabled={full}
                onClick={() => setSlot(i)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="hbl-mn-res-row">
        <div className="hbl-mn-field">
          <span className="hbl-mn-legend" id="hbl-mn-guests-l">
            Guests
          </span>
          <div className="hbl-mn-stepper" role="group" aria-labelledby="hbl-mn-guests-l">
            <button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests((g) => Math.max(1, g - 1))}>
              <Ico size={15} stroke={2}>{icons.minus}</Ico>
            </button>
            <output aria-live="polite">{guests}</output>
            <button type="button" aria-label="More guests" disabled={guests >= 10} onClick={() => setGuests((g) => Math.min(10, g + 1))}>
              <Ico size={15} stroke={2}>{icons.plus}</Ico>
            </button>
          </div>
        </div>
        <div className="hbl-mn-field hbl-mn-field-grow">
          <label className="hbl-mn-legend" htmlFor="hbl-mn-seat">
            Seating
          </label>
          <select id="hbl-mn-seat" className="hbl-mn-select" value={seat} onChange={(e) => setSeat(e.target.value)}>
            {seating.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="hbl-mn-btn hbl-mn-btn-primary hbl-mn-btn-block" disabled={!canBook}>
        {canBook ? `Reserve · ${days[day].dow} ${time}` : isClosed ? "Closed for dinner on Mondays" : "Pick an open time"}
        <Ico size={16} stroke={2}>{icons.arrow}</Ico>
      </button>
      <p className="hbl-mn-res-fine">
        {guests >= 8 ? "Parties of 8 or more sit at the long table on the patio. " : ""}
        No card needed. Free cancellation until 4 hours before.
      </p>
    </form>
  );
}

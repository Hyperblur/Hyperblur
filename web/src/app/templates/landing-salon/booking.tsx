"use client";

import * as React from "react";
import { bookingServices, days, stylists, times } from "./data";
import { Portrait } from "./art";
import { Ico, icons } from "./icons";

const surcharge = { Stylist: 0, Senior: 10, Master: 25 } as const;

export function BookingCard() {
  const [stylistId, setStylistId] = React.useState("noor");
  const [serviceId, setServiceId] = React.useState("cut");
  const [dayIdx, setDayIdx] = React.useState(1);
  const [time, setTime] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const stylist = stylists.find((s) => s.id === stylistId) ?? stylists[0];
  const service = bookingServices.find((s) => s.id === serviceId) ?? bookingServices[0];
  const total = service.price + surcharge[stylist.level];
  const isTaken = (i: number) => stylist.taken.includes((i + dayIdx) % times.length);

  function pickStylist(id: string) {
    setStylistId(id);
    setTime(null);
  }

  function pickDay(i: number) {
    setDayIdx(i);
    setTime(null);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (time) setDone(true);
  }

  if (done) {
    return (
      <div id="book" className="hbl-sl-book hbl-sl-book-done" role="status" aria-live="polite">
        <div className="hbl-sl-done-mark">
          <Ico size={26} stroke={2.2}>{icons.check}</Ico>
        </div>
        <p className="hbl-sl-eyebrow">Chair held for 10 minutes</p>
        <h3 className="hbl-sl-book-title">See you {days[dayIdx].full.split(",")[0]}.</h3>
        <dl className="hbl-sl-done-list">
          <div>
            <dt>Stylist</dt>
            <dd>{stylist.name}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>
              {service.label}, {service.duration}
            </dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>
              {days[dayIdx].full} at {time}
            </dd>
          </div>
          <div>
            <dt>Estimate</dt>
            <dd>${total}</dd>
          </div>
        </dl>
        <p className="hbl-sl-book-fine">We will text a confirmation. Free changes up to 24 hours before.</p>
        <button
          type="button"
          className="hbl-sl-btn hbl-sl-btn-ghost hbl-sl-btn-block"
          onClick={() => {
            setDone(false);
            setTime(null);
          }}
        >
          Change booking
        </button>
      </div>
    );
  }

  return (
    <form id="book" className="hbl-sl-book" onSubmit={submit} aria-labelledby="hbl-sl-book-h">
      <div className="hbl-sl-book-head">
        <h3 id="hbl-sl-book-h" className="hbl-sl-book-title">
          Book a chair
        </h3>
        <span className="hbl-sl-live">
          <span className="hbl-sl-live-dot" aria-hidden="true" />3 chairs free today
        </span>
      </div>

      <fieldset className="hbl-sl-field">
        <legend className="hbl-sl-label">Stylist</legend>
        <div className="hbl-sl-stylist-row">
          {stylists.map((s) => (
            <button
              key={s.id}
              type="button"
              className="hbl-sl-chip-stylist"
              aria-pressed={s.id === stylistId}
              aria-label={`${s.name}, ${s.role}`}
              onClick={() => pickStylist(s.id)}
            >
              <span className="hbl-sl-chip-face">
                <Portrait s={s} />
              </span>
              <span className="hbl-sl-chip-name">{s.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
        <p className="hbl-sl-book-meta">
          {stylist.role} · {stylist.level} {surcharge[stylist.level] > 0 ? `(+$${surcharge[stylist.level]})` : ""}
        </p>
      </fieldset>

      <div className="hbl-sl-field">
        <label htmlFor="hbl-sl-service" className="hbl-sl-label">
          Service
        </label>
        <div className="hbl-sl-select-wrap">
          <select
            id="hbl-sl-service"
            className="hbl-sl-select"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            {bookingServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} · {s.duration} · ${s.price}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="hbl-sl-select-caret">
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <fieldset className="hbl-sl-field">
        <legend className="hbl-sl-label">Day</legend>
        <div className="hbl-sl-days">
          {days.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className="hbl-sl-day"
              aria-pressed={i === dayIdx}
              aria-label={d.full}
              onClick={() => pickDay(i)}
            >
              <span>{d.label}</span>
              <strong>{d.date}</strong>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="hbl-sl-field">
        <legend className="hbl-sl-label">Time</legend>
        <div className="hbl-sl-times">
          {times.map((t, i) => {
            const taken = isTaken(i);
            return (
              <button
                key={t}
                type="button"
                className="hbl-sl-time"
                disabled={taken}
                aria-pressed={time === t}
                aria-label={taken ? `${t}, booked` : t}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="hbl-sl-book-foot">
        <div>
          <span className="hbl-sl-book-est">Estimate</span>
          <span className="hbl-sl-book-total">${total}</span>
        </div>
        <button type="submit" className="hbl-sl-btn hbl-sl-btn-primary" disabled={!time}>
          {time ? `Hold ${time}` : "Pick a time"}
          <Ico size={16} stroke={2}>{icons.arrow}</Ico>
        </button>
      </div>
    </form>
  );
}

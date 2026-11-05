"use client";

import * as React from "react";
import { CheckIcon } from "./icons";

const days = [
  { id: "thu", label: "Today", sub: "Thu" },
  { id: "fri", label: "Fri", sub: "Tomorrow" },
  { id: "sat", label: "Sat", sub: "Weekend" },
  { id: "sun", label: "Sun", sub: "Weekend" },
];

const slots: Record<string, string[]> = {
  thu: ["4:00 pm", "5:30 pm", "7:00 pm"],
  fri: ["11:00 am", "1:00 pm", "4:00 pm", "6:30 pm"],
  sat: ["10:00 am", "12:00 pm", "3:00 pm", "6:00 pm"],
  sun: ["12:00 pm", "2:00 pm", "4:30 pm"],
};

const full = new Set(["fri-1:00 pm", "sat-12:00 pm"]);

export function PickupCard() {
  const [day, setDay] = React.useState("fri");
  const [slot, setSlot] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [done, setDone] = React.useState(false);
  const dayInfo = days.find((d) => d.id === day)!;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="hbl-st-pick hbl-st-pick-done" role="status">
        <span className="hbl-st-news-check">
          <CheckIcon size={20} />
        </span>
        <p className="hbl-st-pick-title font-serif">Your pickup is held.</p>
        <p className="hbl-st-pick-text">
          {dayInfo.label === "Today" ? "Today" : dayInfo.label}, {slot} at 214 Wythe Ave.
          {order.trim() ? ` Order ${order.trim()} will be wrapped and waiting at the counter.` : " Bring your order email and we will have it wrapped."}
        </p>
        <button
          type="button"
          className="hbl-st-btn hbl-st-btn-ghost"
          onClick={() => {
            setDone(false);
            setSlot("");
          }}
        >
          Change time
        </button>
      </div>
    );
  }

  return (
    <form className="hbl-st-pick" onSubmit={submit}>
      <p className="hbl-st-pick-title font-serif">Free in-store pickup</p>
      <p className="hbl-st-pick-text">Order online, then choose a time. Ready in two hours.</p>
      <fieldset className="hbl-st-fieldset">
        <legend>Day</legend>
        <div className="hbl-st-days">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              className="hbl-st-day"
              aria-pressed={day === d.id}
              onClick={() => {
                setDay(d.id);
                setSlot("");
              }}
            >
              <span>{d.label}</span>
              <span className="hbl-st-day-sub">{d.sub}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="hbl-st-fieldset">
        <legend>Time</legend>
        <div className="hbl-st-slots">
          {slots[day].map((t) => {
            const isFull = full.has(`${day}-${t}`);
            return (
              <button
                key={t}
                type="button"
                className="hbl-st-slot"
                aria-pressed={slot === t}
                disabled={isFull}
                onClick={() => setSlot(t)}
              >
                {t}
                {isFull && <span className="hbl-st-sr"> (full)</span>}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label htmlFor="hbl-st-order" className="hbl-st-pick-label">
        Order number <span>(optional)</span>
      </label>
      <input
        id="hbl-st-order"
        className="hbl-st-input"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        placeholder="HG-20481"
        autoComplete="off"
      />
      <button type="submit" className="hbl-st-btn hbl-st-btn-primary hbl-st-pick-submit" disabled={!slot}>
        {slot ? `Hold ${dayInfo.label === "Today" ? "today" : dayInfo.label} at ${slot}` : "Choose a time"}
      </button>
    </form>
  );
}

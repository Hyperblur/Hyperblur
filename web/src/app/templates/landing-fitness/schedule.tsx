"use client";

import * as React from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { CheckIcon } from "./icons";

type Kind = "strength" | "hiit" | "mobility" | "boxing" | "kids";
type Row = [string, number, Kind, string, number, number];

const names: Record<Kind, string> = {
  strength: "Strength Foundations",
  hiit: "Engine HIIT",
  mobility: "Mobility Reset",
  boxing: "Fight Club Boxing",
  kids: "Junior Athletes",
};

const days: { id: string; label: string; date: string; rows: Row[] }[] = [
  {
    id: "mon",
    label: "Mon",
    date: "10",
    rows: [
      ["5:30 AM", 60, "strength", "Dana Whitfield", 12, 12],
      ["6:45 AM", 45, "hiit", "Marcus Bell", 9, 12],
      ["12:10 PM", 45, "mobility", "Ines Moreau", 5, 12],
      ["4:30 PM", 50, "kids", "Ines Moreau", 7, 10],
      ["6:00 PM", 60, "strength", "Dana Whitfield", 11, 12],
      ["7:15 PM", 60, "boxing", "Ray Castillo", 8, 12],
    ],
  },
  {
    id: "tue",
    label: "Tue",
    date: "11",
    rows: [
      ["5:30 AM", 45, "hiit", "Marcus Bell", 10, 12],
      ["7:00 AM", 60, "strength", "Sung-min Park", 8, 12],
      ["12:10 PM", 45, "hiit", "Marcus Bell", 6, 12],
      ["5:30 PM", 60, "boxing", "Ray Castillo", 12, 12],
      ["6:45 PM", 60, "strength", "Dana Whitfield", 10, 12],
    ],
  },
  {
    id: "wed",
    label: "Wed",
    date: "12",
    rows: [
      ["5:30 AM", 60, "strength", "Sung-min Park", 9, 12],
      ["6:45 AM", 45, "mobility", "Ines Moreau", 4, 12],
      ["12:10 PM", 60, "strength", "Dana Whitfield", 7, 12],
      ["4:30 PM", 50, "kids", "Ines Moreau", 9, 10],
      ["6:00 PM", 45, "hiit", "Marcus Bell", 11, 12],
      ["7:15 PM", 45, "mobility", "Ines Moreau", 6, 12],
    ],
  },
  {
    id: "thu",
    label: "Thu",
    date: "13",
    rows: [
      ["5:30 AM", 45, "hiit", "Marcus Bell", 12, 12],
      ["7:00 AM", 60, "strength", "Sung-min Park", 10, 12],
      ["12:10 PM", 45, "mobility", "Ines Moreau", 3, 12],
      ["6:00 PM", 60, "strength", "Dana Whitfield", 8, 12],
      ["6:45 PM", 45, "hiit", "Marcus Bell", 10, 12],
      ["7:45 PM", 60, "boxing", "Ray Castillo", 11, 12],
    ],
  },
  {
    id: "fri",
    label: "Fri",
    date: "14",
    rows: [
      ["5:30 AM", 60, "strength", "Dana Whitfield", 11, 12],
      ["6:45 AM", 45, "hiit", "Marcus Bell", 8, 12],
      ["12:10 PM", 60, "boxing", "Ray Castillo", 6, 12],
      ["5:30 PM", 60, "strength", "Sung-min Park", 9, 12],
    ],
  },
  {
    id: "sat",
    label: "Sat",
    date: "15",
    rows: [
      ["8:00 AM", 75, "strength", "Dana Whitfield", 12, 12],
      ["9:30 AM", 45, "hiit", "Marcus Bell", 10, 12],
      ["10:00 AM", 50, "kids", "Ines Moreau", 8, 10],
      ["11:00 AM", 60, "boxing", "Ray Castillo", 9, 12],
    ],
  },
  {
    id: "sun",
    label: "Sun",
    date: "16",
    rows: [
      ["9:00 AM", 60, "mobility", "Ines Moreau", 7, 12],
      ["10:30 AM", 60, "strength", "Sung-min Park", 6, 12],
      ["5:00 PM", 45, "mobility", "Ines Moreau", 4, 12],
    ],
  },
];

const today = "thu";

export function FitnessSchedule() {
  const [active, setActive] = React.useState(today);
  const [booked, setBooked] = React.useState<Record<string, true>>({});
  const tabs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const day = days.find((d) => d.id === active) ?? days[0];

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % days.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + days.length) % days.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = days.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(days[next].id);
    tabs.current.get(days[next].id)?.focus();
  }

  function toggle(key: string) {
    setBooked((prev) => {
      const copy = { ...prev };
      if (copy[key]) delete copy[key];
      else copy[key] = true;
      return copy;
    });
  }

  const count = Object.keys(booked).length;

  return (
    <section id="hbl-ft-schedule" aria-labelledby="hbl-ft-schedule-title" className="hbl-ft-schedule py-24 md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="hbl-ft-kicker">This week · Nov 10 to 16</p>
            <h2 id="hbl-ft-schedule-title" className="hbl-ft-h2 mt-5">
              Pick a class.
              <br />
              <span className="hbl-ft-lime">Grab a rack.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed hbl-ft-muted">
            Booking opens seven days ahead and closes 30 minutes before start. Full? Join the waitlist and we text you when a rack frees up.
          </p>
        </FadeInView>

        <div className="hbl-ft-table mt-12">
          <div role="tablist" aria-label="Day of the week" className="hbl-ft-days">
            {days.map((d, i) => (
              <button
                key={d.id}
                ref={(el) => {
                  if (el) tabs.current.set(d.id, el);
                  else tabs.current.delete(d.id);
                }}
                type="button"
                role="tab"
                id={`hbl-ft-tab-${d.id}`}
                aria-selected={active === d.id}
                aria-controls="hbl-ft-panel"
                tabIndex={active === d.id ? 0 : -1}
                className="hbl-ft-day"
                onClick={() => setActive(d.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="text-[11px] uppercase tracking-[0.1em]">{d.label}</span>
                <span className="font-mono text-lg">{d.date}</span>
                {d.id === today ? <span className="hbl-ft-today">Today</span> : null}
              </button>
            ))}
          </div>

          <div role="tabpanel" id="hbl-ft-panel" aria-labelledby={`hbl-ft-tab-${day.id}`} className="hbl-ft-panel">
            <ul key={day.id} className="hbl-ft-rows">
              {day.rows.map((r, i) => {
                const [time, dur, kind, coach, taken, cap] = r;
                const key = `${day.id}-${i}`;
                const mine = Boolean(booked[key]);
                const left = cap - taken - (mine ? 1 : 0);
                const full = cap - taken <= 0;
                const pct = Math.min(100, Math.round(((taken + (mine ? 1 : 0)) / cap) * 100));
                return (
                  <li key={key} className="hbl-ft-row" style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }} data-kind={kind}>
                    <div className="min-w-0">
                      <p className="font-mono text-[15px] text-[#f1f0e8]">{time}</p>
                      <p className="font-mono text-[12px] hbl-ft-muted">{dur} min</p>
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 font-grotesk text-[17px] font-bold uppercase tracking-[-0.02em]">
                        <span className="hbl-ft-kind" aria-hidden="true" />
                        <span className="truncate">{names[kind]}</span>
                      </p>
                      <p className="mt-0.5 truncate text-[13px] hbl-ft-muted">with {coach}</p>
                    </div>
                    <div className="hbl-ft-cap min-w-0">
                      <div className="hbl-ft-capbar" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} data-hot={left <= 2 ? "" : undefined} />
                      </div>
                      <p className={`mt-1.5 font-mono text-[12px] ${full ? "hbl-ft-muted" : left <= 2 ? "hbl-ft-ember" : "hbl-ft-muted"}`}>
                        {full ? "Full · waitlist 3" : mine ? `Booked · ${left} left` : `${left} of ${cap} spots left`}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="hbl-ft-bookbtn"
                      data-state={mine ? "booked" : full ? "full" : "open"}
                      aria-pressed={mine}
                      aria-label={`${mine ? "Cancel" : full ? "Join waitlist for" : "Book"} ${names[kind]} ${day.label} ${time}`}
                      onClick={() => toggle(key)}
                    >
                      {mine ? (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          {full ? "On list" : "Booked"}
                        </>
                      ) : full ? (
                        "Waitlist"
                      ) : (
                        "Book"
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="hbl-ft-tablefoot">
              <p className="text-[13px] hbl-ft-muted" aria-live="polite">
                {count === 0 ? "Nothing booked yet. Your first week is on us." : `${count} ${count === 1 ? "class" : "classes"} in your week. We will send a reminder 2 hours before.`}
              </p>
              <a href="#hbl-ft-claim" className="hbl-ft-btn hbl-ft-btn-sm">
                Claim a free week
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

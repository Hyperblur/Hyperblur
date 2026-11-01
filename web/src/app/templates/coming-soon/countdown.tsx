"use client";

import { useSyncExternalStore } from "react";

const target = Date.parse("2026-12-16T00:00:00Z");

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function Countdown() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = now > 0;
  const left = ready ? Math.max(0, target - now * 1000) : 0;
  const total = Math.floor(left / 1000);

  const parts = [
    { label: "Days", value: Math.floor(total / 86400) },
    { label: "Hours", value: Math.floor((total % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((total % 3600) / 60) },
    { label: "Seconds", value: total % 60 },
  ];

  return (
    <div className="grid w-full max-w-xl grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Time until launch">
      {parts.map((part) => (
        <div
          key={part.label}
          className="rounded-2xl border border-white/12 bg-black/50 px-1 py-4 text-center backdrop-blur-sm sm:py-6"
        >
          <p className="font-mono text-3xl font-bold tabular-nums text-white sm:text-5xl">
            {ready ? pad(part.value) : "--"}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">{part.label}</p>
        </div>
      ))}
    </div>
  );
}

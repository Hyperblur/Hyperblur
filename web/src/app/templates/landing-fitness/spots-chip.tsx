"use client";

import * as React from "react";

const feed = [
  { spots: 4, cls: "Strength Foundations", time: "6:00 PM" },
  { spots: 2, cls: "Engine HIIT", time: "6:45 PM" },
  { spots: 6, cls: "Mobility Reset", time: "7:30 PM" },
  { spots: 1, cls: "Fight Club Boxing", time: "7:45 PM" },
];

export function SpotsChip() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % feed.length), 3400);
    return () => window.clearInterval(id);
  }, []);

  const item = feed[index];

  return (
    <p className="hbl-ft-chip" aria-live="polite">
      <span className="hbl-ft-chip-dot" aria-hidden="true" />
      <span className="font-mono text-[12px] uppercase tracking-[0.08em] hbl-ft-muted">Tonight</span>
      <span key={index} className="hbl-ft-chip-text">
        <b className={item.spots <= 2 ? "hbl-ft-ember" : "hbl-ft-lime"}>
          {item.spots} {item.spots === 1 ? "spot" : "spots"} left
        </b>{" "}
        in {item.cls} · <span className="font-mono">{item.time}</span>
      </span>
    </p>
  );
}

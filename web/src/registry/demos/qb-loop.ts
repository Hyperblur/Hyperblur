"use client";

import * as React from "react";

export function useQbLoop(step: (n: number) => void, period = 3000, first = 1400) {
  const latest = React.useRef(step);
  const live = React.useRef(true);

  React.useEffect(() => {
    latest.current = step;
  });

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    let id: number;
    function tick() {
      if (live.current) latest.current(n++);
      id = window.setTimeout(tick, period);
    }
    id = window.setTimeout(tick, first);
    return () => window.clearTimeout(id);
  }, [period, first]);

  return React.useCallback(() => {
    live.current = false;
  }, []);
}

"use client";

import * as React from "react";

export function useQuLoop(step: (n: number) => void, period = 3200, first = 1200) {
  const latest = React.useRef(step);
  const live = React.useRef(true);

  React.useEffect(() => {
    latest.current = step;
  });

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    let id = 0;
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

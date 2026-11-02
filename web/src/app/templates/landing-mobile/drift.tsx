"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Drift({ depth = 0.06, children, className = "" }: { depth?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anchor = el.parentElement ?? el;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = anchor.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--hbl-mb-y", `${(-offset * depth).toFixed(1)}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [depth]);

  return (
    <div ref={ref} className={`hbl-mb-drift ${className}`}>
      {children}
    </div>
  );
}

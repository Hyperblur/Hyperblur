"use client";

import * as React from "react";

export function InView({
  children,
  className = "",
  threshold = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setOn(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`hbl-ag-inview ${className}`} data-on={on}>
      {children}
    </div>
  );
}

"use client";

import * as React from "react";

function useSeen(threshold: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

export function InView({
  children,
  className = "",
  minHeight = 0,
}: {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
}) {
  const [ref, seen] = useSeen(0.25);
  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {seen ? children : null}
    </div>
  );
}

export function SeenFlag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, seen] = useSeen(0.3);
  return (
    <div ref={ref} className={className} data-seen={seen ? "" : undefined}>
      {children}
    </div>
  );
}

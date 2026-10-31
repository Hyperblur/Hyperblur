"use client";

import * as React from "react";

export interface FadeInViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

const css = `
.hb-fv { will-change: opacity, transform; }
.hb-fv[data-inview="false"] {
  opacity: 0;
  transform: translate3d(var(--hb-fx), var(--hb-fy), 0);
  transition: none;
}
.hb-fv[data-inview="true"] {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity var(--hb-dur) cubic-bezier(.22, .8, .24, 1) var(--hb-delay), transform var(--hb-dur) cubic-bezier(.22, .8, .24, 1) var(--hb-delay);
}
@media (prefers-reduced-motion: reduce) {
  .hb-fv[data-inview] { opacity: 1; transform: none; transition: none; will-change: auto; }
}
`;

export function FadeInView({
  children,
  direction = "up",
  distance = 24,
  duration = 0.7,
  delay = 0,
  once = true,
  threshold = 0.2,
  className = "",
  style,
  ...rest
}: FadeInViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const t = Math.min(1, Math.max(0, threshold));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: t }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const d = Math.max(0, distance);
  const fx = direction === "left" ? d : direction === "right" ? -d : 0;
  const fy = direction === "up" ? d : direction === "down" ? -d : 0;

  const vars = {
    "--hb-fx": `${fx}px`,
    "--hb-fy": `${fy}px`,
    "--hb-dur": `${Math.max(0, duration)}s`,
    "--hb-delay": `${Math.max(0, delay)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`hb-fv ${className}`} style={vars} data-inview={inView} {...rest}>
      <style href="hb-fade-in-view" precedence="default">{css}</style>
      {children}
    </div>
  );
}

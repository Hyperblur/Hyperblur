"use client";

import * as React from "react";

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  once?: boolean;
}

const css = `
.hb-count { display: inline-block; white-space: pre; font-variant-numeric: tabular-nums; }
`;

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  once = true,
  className = "",
  ...rest
}: CountUpProps) {
  const [value, setValue] = React.useState<number | null>(null);
  const ref = React.useRef<HTMLSpanElement>(null);

  const format = React.useMemo(() => {
    const nf = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return (n: number) => `${prefix}${nf.format(n)}${suffix}`;
  }, [locale, decimals, prefix, suffix]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        if (t >= 1) {
          setValue(null);
          return;
        }
        setValue(from + (to - from) * ease(t));
        raf = requestAnimationFrame(tick);
      };
      setValue(from);
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run();
          if (once) observer.disconnect();
        } else if (!once) {
          cancelAnimationFrame(raf);
          setValue(null);
        }
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to, duration, once]);

  return (
    <span
      ref={ref}
      className={`hb-count ${className}`}
      aria-label={format(to)}
      {...rest}
    >
      <style href="hb-count-up" precedence="default">{css}</style>
      <span aria-hidden="true">{format(value ?? to)}</span>
    </span>
  );
}

"use client";

import * as React from "react";

export interface TextDropBounceProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  stagger?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  replayOnHover?: boolean;
}

const css = `
@keyframes hb-db-fall {
  0% { transform: translateY(var(--hb-db-d)) scale(1, 1.18); opacity: 0; }
  12% { opacity: 1; }
  52% { transform: translateY(0) scale(1.16, 0.74); opacity: 1; }
  72% { transform: translateY(-0.16em) scale(0.97, 1.06); opacity: 1; }
  88% { transform: translateY(0) scale(1.03, 0.96); opacity: 1; }
  100% { transform: translateY(0) scale(1, 1); opacity: 1; }
}
.hb-db { display: inline-block; }
.hb-db-w { display: inline-block; white-space: nowrap; }
.hb-db-c { display: inline-block; opacity: 0; transform-origin: 50% 100%; will-change: transform; }
.hb-db[data-on="true"] .hb-db-c { animation: hb-db-fall var(--hb-db-t) cubic-bezier(0.3, 0, 0.5, 1) both; animation-delay: calc(var(--i) * var(--hb-db-s)); }
@media (prefers-reduced-motion: reduce) { .hb-db-c { opacity: 1 !important; animation: none !important; transform: none !important; } }
`;

export function TextDropBounce({
  text = "Gravity wins",
  stagger = 0.05,
  distance = 1.1,
  duration = 0.95,
  once = true,
  replayOnHover = true,
  className = "",
  style,
  onPointerEnter,
  ...rest
}: TextDropBounceProps) {
  const root = React.useRef<HTMLSpanElement>(null);
  const [on, setOn] = React.useState(false);
  const busy = React.useRef(false);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          if (once) io.disconnect();
        } else if (!once) {
          setOn(false);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const replay = (e: React.PointerEvent<HTMLSpanElement>) => {
    onPointerEnter?.(e);
    if (!replayOnHover || busy.current || !on) return;
    busy.current = true;
    setOn(false);
    const total = (stagger * text.length + duration) * 1000;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setOn(true);
        window.setTimeout(() => {
          busy.current = false;
        }, total);
      }),
    );
  };

  let index = 0;
  const words = text.split(" ");
  const vars = {
    "--hb-db-s": `${stagger}s`,
    "--hb-db-t": `${duration}s`,
    "--hb-db-d": `${-distance}em`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      ref={root}
      className={`hb-db ${className}`}
      style={vars}
      data-on={on}
      role="text"
      aria-label={text}
      onPointerEnter={replay}
      {...rest}
    >
      {words.map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 ? " " : null}
          <span className="hb-db-w" aria-hidden="true">
            {Array.from(word).map((ch) => {
              const i = index++;
              return (
                <span key={i} className="hb-db-c" style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
      <style href="hb-text-drop-bounce" precedence="default">{css}</style>
    </span>
  );
}

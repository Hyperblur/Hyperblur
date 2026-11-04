"use client";

import * as React from "react";

export interface TextMaskRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  by?: "lines" | "words";
  stagger?: number;
  duration?: number;
  delay?: number;
  tilt?: number;
  once?: boolean;
  loop?: number;
}

const css = `
@keyframes hb-qd5-up {
  from { transform: translate3d(0, 118%, 0) rotate(var(--hb-qd5-tilt)); }
  to { transform: translate3d(0, 0, 0) rotate(0deg); }
}
.hb-qd5 { display: block; font-family: inherit; box-sizing: border-box; }
.hb-qd5 *, .hb-qd5 *::before, .hb-qd5 *::after { box-sizing: border-box; }
.hb-qd5-m {
  display: block;
  overflow: hidden;
  padding: 0.08em 0.06em 0.16em;
  margin: -0.08em -0.06em -0.16em;
}
.hb-qd5[data-by="words"] .hb-qd5-m { display: inline-block; vertical-align: top; }
.hb-qd5-i {
  display: inline-block;
  transform: translate3d(0, 118%, 0) rotate(var(--hb-qd5-tilt));
  transform-origin: 0 100%;
  will-change: transform;
}
.hb-qd5[data-active] .hb-qd5-i {
  animation: hb-qd5-up var(--hb-qd5-dur) cubic-bezier(.19, 1, .22, 1) both;
  animation-delay: calc(var(--hb-qd5-delay) + var(--hb-qd5-n) * var(--hb-qd5-stagger));
}
@media (prefers-reduced-motion: reduce) {
  .hb-qd5 .hb-qd5-i { transform: none; animation: none !important; will-change: auto; }
}
`;

export function TextMaskReveal({
  text,
  by = "lines",
  stagger = 0.12,
  duration = 0.95,
  delay = 0,
  tilt = 4,
  once = true,
  loop = 0,
  className = "",
  style,
  ...rest
}: TextMaskRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const pieces = React.useMemo(
    () => (by === "lines" ? text.split("\n") : text.split(/\s+/).filter(Boolean)),
    [text, by],
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  React.useEffect(() => {
    if (!inView || loop <= 0) return;
    const total = (delay + duration + stagger * pieces.length + loop) * 1000;
    const id = setTimeout(() => setHidden((h) => !h), hidden ? 450 : total);
    return () => clearTimeout(id);
  }, [inView, loop, hidden, delay, duration, stagger, pieces.length]);

  const vars = {
    "--hb-qd5-dur": `${duration}s`,
    "--hb-qd5-delay": `${delay}s`,
    "--hb-qd5-stagger": `${stagger}s`,
    "--hb-qd5-tilt": `${tilt}deg`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-qd5 ${className}`}
      style={vars}
      data-by={by}
      data-active={inView && !hidden ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-mask-reveal" precedence="default">{css}</style>
      {pieces.map((piece, i) => (
        <React.Fragment key={`${i}-${piece}`}>
          <span className="hb-qd5-m">
            <span className="hb-qd5-i" style={{ "--hb-qd5-n": i } as React.CSSProperties}>
              {piece}
            </span>
          </span>
          {by === "words" && i < pieces.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </div>
  );
}

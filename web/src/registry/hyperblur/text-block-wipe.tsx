"use client";

import * as React from "react";

export interface TextBlockWipeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color?: string;
  trail?: string;
  direction?: "left" | "right";
  duration?: number;
  stagger?: number;
  delay?: number;
  trigger?: "view" | "mount";
  loop?: number;
}

const css = `
@keyframes hb-vi1-bar {
  0% { transform: scaleX(0); transform-origin: var(--hb-vi1-from) 50%; }
  46% { transform: scaleX(1); transform-origin: var(--hb-vi1-from) 50%; }
  54% { transform: scaleX(1); transform-origin: var(--hb-vi1-to) 50%; }
  100% { transform: scaleX(0); transform-origin: var(--hb-vi1-to) 50%; }
}
@keyframes hb-vi1-text {
  0%, 49.9% { opacity: 0; transform: translate3d(var(--hb-vi1-shift), 0, 0); }
  50% { opacity: 1; transform: translate3d(var(--hb-vi1-shift), 0, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-vi1 { display: block; font-family: inherit; box-sizing: border-box; }
.hb-vi1 *, .hb-vi1 *::before, .hb-vi1 *::after { box-sizing: border-box; }
.hb-vi1-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi1-row { display: block; }
.hb-vi1-l {
  position: relative;
  display: inline-block;
  padding: 0 0.04em;
  margin: 0 -0.04em;
}
.hb-vi1-t { display: inline-block; opacity: 0; }
.hb-vi1-b, .hb-vi1-g {
  position: absolute;
  left: 0; right: 0;
  top: 0.08em; bottom: 0.06em;
  transform: scaleX(0);
  pointer-events: none;
}
.hb-vi1-g { background: var(--hb-vi1-trail); }
.hb-vi1-b { background: var(--hb-vi1-color); }
.hb-vi1[data-active] .hb-vi1-g {
  animation: hb-vi1-bar var(--hb-vi1-dur) cubic-bezier(.76, 0, .2, 1) both;
  animation-delay: calc(var(--hb-vi1-delay) + var(--hb-vi1-n) * var(--hb-vi1-stagger));
}
.hb-vi1[data-active] .hb-vi1-b {
  animation: hb-vi1-bar var(--hb-vi1-dur) cubic-bezier(.76, 0, .2, 1) both;
  animation-delay: calc(var(--hb-vi1-delay) + var(--hb-vi1-n) * var(--hb-vi1-stagger) + var(--hb-vi1-dur) * 0.09);
}
.hb-vi1[data-active] .hb-vi1-t {
  animation: hb-vi1-text calc(var(--hb-vi1-dur) * 1.25) cubic-bezier(.16, 1, .3, 1) both;
  animation-delay: calc(var(--hb-vi1-delay) + var(--hb-vi1-n) * var(--hb-vi1-stagger) + var(--hb-vi1-dur) * 0.09);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi1 .hb-vi1-t { opacity: 1; animation: none !important; transform: none; }
  .hb-vi1 .hb-vi1-b, .hb-vi1 .hb-vi1-g { display: none; }
}
`;

export function TextBlockWipe({
  text,
  color = "#2f7bff",
  trail = "#7fb3ff",
  direction = "left",
  duration = 1.1,
  stagger = 0.14,
  delay = 0,
  trigger = "view",
  loop = 0,
  className = "",
  style,
  ...rest
}: TextBlockWipeProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);
  const [resting, setResting] = React.useState(false);
  const lines = React.useMemo(() => text.split("\n"), [text]);

  React.useEffect(() => {
    if (trigger === "mount") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  React.useEffect(() => {
    if (!inView || loop <= 0) return;
    if (resting) {
      const id = setTimeout(() => {
        setResting(false);
        setCycle((c) => c + 1);
      }, 380);
      return () => clearTimeout(id);
    }
    const total = (delay + duration * 1.4 + stagger * lines.length + loop) * 1000;
    const id = setTimeout(() => setResting(true), total);
    return () => clearTimeout(id);
  }, [inView, loop, resting, delay, duration, stagger, lines.length]);

  const vars = {
    "--hb-vi1-color": color,
    "--hb-vi1-trail": trail,
    "--hb-vi1-dur": `${duration}s`,
    "--hb-vi1-delay": `${delay}s`,
    "--hb-vi1-stagger": `${stagger}s`,
    "--hb-vi1-from": direction === "left" ? "0%" : "100%",
    "--hb-vi1-to": direction === "left" ? "100%" : "0%",
    "--hb-vi1-shift": direction === "left" ? "-0.18em" : "0.18em",
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-vi1 ${className}`}
      style={vars}
      data-active={inView && !resting ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-block-wipe" precedence="default">{css}</style>
      <span className="hb-vi1-sr">{text.replace(/\n/g, " ")}</span>
      {lines.map((line, i) => (
        <span className="hb-vi1-row" key={`${cycle}-${i}`} aria-hidden="true">
          <span className="hb-vi1-l" style={{ "--hb-vi1-n": i } as React.CSSProperties}>
            <span className="hb-vi1-t">{line || " "}</span>
            <span className="hb-vi1-g" />
            <span className="hb-vi1-b" />
          </span>
        </span>
      ))}
    </div>
  );
}

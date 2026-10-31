"use client";

import * as React from "react";

export interface ShutterRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bars?: number;
  color?: string;
  duration?: number;
  direction?: "left" | "right";
  trigger?: "mount" | "hover";
}

const css = `
@keyframes hb-sr-out {
  from { transform: translateY(0) skewX(-20deg); }
  to { transform: translateY(calc(var(--hb-y) * 101%)) skewX(-20deg); }
}
.hb-sr { position: relative; display: inline-block; }
.hb-sr > .hb-sr-clip { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-sr-clip > .hb-sr-bars { position: absolute; top: 0; bottom: 0; display: flex; }
.hb-sr-bars > i {
  flex: 0 0 var(--hb-w);
  margin-right: -1px;
  background: var(--hb-c);
  transform: skewX(-20deg);
  animation: hb-sr-out var(--hb-bd) cubic-bezier(.7, 0, .2, 1) forwards;
  animation-delay: var(--d);
}
@media (prefers-reduced-motion: reduce) { .hb-sr > .hb-sr-clip { display: none; } }
`;

export function ShutterReveal({
  children,
  bars = 8,
  color = "#2f7bff",
  duration = 0.9,
  direction = "left",
  trigger = "mount",
  className = "",
  style,
  onMouseEnter,
  ...rest
}: ShutterRevealProps) {
  const [play, setPlay] = React.useState(trigger === "mount");
  const [key, setKey] = React.useState(0);

  const n = Math.max(1, Math.round(bars));
  const extra = Math.ceil(n / 3);
  const total = n + extra * 2;
  const barDur = duration * 0.5;
  const step = n > 1 ? (duration - barDur) / (n - 1) : 0;

  const items = Array.from({ length: total }, (_, i) => {
    const j = Math.min(n - 1, Math.max(0, i - extra));
    const order = direction === "left" ? j : n - 1 - j;
    return { delay: order * step, dir: i % 2 === 0 ? -1 : 1 };
  });

  const vars = {
    "--hb-c": color,
    "--hb-bd": `${barDur}s`,
    "--hb-w": `${100 / total}%`,
    ...style,
  } as React.CSSProperties;

  function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
    onMouseEnter?.(e);
    if (trigger !== "hover") return;
    setPlay(true);
    setKey((k) => k + 1);
  }

  return (
    <div className={`hb-sr ${className}`} style={vars} onMouseEnter={handleEnter} {...rest}>
      <style href="hb-shutter-reveal" precedence="default">{css}</style>
      {children}
      {play && (
        <div className="hb-sr-clip" key={key} aria-hidden="true">
          <div
            className="hb-sr-bars"
            style={{ left: `${(-extra / n) * 100}%`, width: `${(total / n) * 100}%` }}
          >
            {items.map((b, i) => (
              <i
                key={i}
                style={{ "--d": `${b.delay.toFixed(3)}s`, "--hb-y": b.dir } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

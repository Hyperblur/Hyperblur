"use client";

import * as React from "react";

export interface TextEchoProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children: string;
  echoes?: number;
  distance?: number;
  angle?: number;
  fade?: number;
  spread?: number;
  stagger?: number;
  variant?: "solid" | "outline";
  accent?: string;
}

const css = `
@property --hb-qs6-k {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}
@property --hb-qs6-b {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}
@property --hb-qs6-r {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
.hb-qs6 {
  --hb-qs6-c: #2f7bff;
  --hb-qs6-k: 1;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  font: inherit;
  line-height: inherit;
  white-space: pre-wrap;
  isolation: isolate;
  outline: none;
  transition: --hb-qs6-k 0.55s cubic-bezier(0.34, 1.4, 0.5, 1);
  animation: hb-qs6-breathe 4.8s ease-in-out infinite;
}
.hb-qs6:hover, .hb-qs6:focus-visible { --hb-qs6-k: var(--hb-qs6-spread, 2.2); }
.hb-qs6:focus-visible { outline: 2px solid var(--hb-qs6-c); outline-offset: 6px; border-radius: 4px; }
.hb-qs6-m { position: relative; z-index: 1; display: inline-block; }
.hb-qs6-e {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  white-space: inherit;
  color: var(--hb-qs6-c);
  opacity: calc(var(--hb-qs6-o) * var(--hb-qs6-r));
  transform: translate(
    calc(var(--hb-qs6-dx) * var(--hb-qs6-i) * var(--hb-qs6-k) * var(--hb-qs6-b) * var(--hb-qs6-r)),
    calc(var(--hb-qs6-dy) * var(--hb-qs6-i) * var(--hb-qs6-k) * var(--hb-qs6-b) * var(--hb-qs6-r))
  );
}
.hb-qs6[data-variant="outline"] .hb-qs6-e {
  color: transparent;
  -webkit-text-stroke: 1px var(--hb-qs6-c);
}
.hb-qs6[data-on="true"] .hb-qs6-e {
  animation: hb-qs6-in 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-qs6-i) * var(--hb-qs6-st));
}
.hb-qs6[data-on="false"] .hb-qs6-e { --hb-qs6-r: 0; }
.hb-qs6[data-on="static"] .hb-qs6-e { --hb-qs6-r: 1; }
@keyframes hb-qs6-in {
  from { --hb-qs6-r: 0; }
  to { --hb-qs6-r: 1; }
}
@keyframes hb-qs6-breathe {
  0%, 100% { --hb-qs6-b: 0.78; }
  50% { --hb-qs6-b: 1.2; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs6 { animation: none; transition: none; }
  .hb-qs6[data-on="true"] .hb-qs6-e { animation: none; --hb-qs6-r: 1; }
}
`;

export function TextEcho({
  children,
  echoes = 5,
  distance = 7,
  angle = 35,
  fade = 0.75,
  spread = 2.2,
  stagger = 80,
  variant = "outline",
  accent = "#2f7bff",
  className = "",
  style,
  tabIndex = 0,
  ...rest
}: TextEchoProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [on, setOn] = React.useState<"false" | "true" | "static">("false");
  const count = Math.max(1, Math.min(12, Math.round(echoes)));
  const rad = (angle * Math.PI) / 180;
  const dx = (Math.cos(rad) * distance).toFixed(2);
  const dy = (Math.sin(rad) * distance).toFixed(2);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setOn(reduced ? "static" : "true");
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vars = {
    "--hb-qs6-c": accent,
    "--hb-qs6-dx": `${dx}px`,
    "--hb-qs6-dy": `${dy}px`,
    "--hb-qs6-spread": spread,
    "--hb-qs6-st": `${stagger}ms`,
    ...style,
  } as React.CSSProperties;

  const copies = Array.from({ length: count }, (_, n) => {
    const i = n + 1;
    const o = Math.max(0, fade * (1 - n / (count + 0.6)));
    return (
      <span
        key={i}
        className="hb-qs6-e"
        aria-hidden="true"
        style={{ "--hb-qs6-i": i, "--hb-qs6-o": o.toFixed(3) } as React.CSSProperties}
      >
        {children}
      </span>
    );
  });

  return (
    <>
      <style href="hb-text-echo" precedence="default">{css}</style>
      <span
        ref={ref}
        className={`hb-qs6 ${className}`}
        style={vars}
        tabIndex={tabIndex}
        data-variant={variant}
        data-on={on}
        {...rest}
      >
        {copies}
        <span className="hb-qs6-m">{children}</span>
      </span>
    </>
  );
}

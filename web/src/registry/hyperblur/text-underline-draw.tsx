"use client";

import * as React from "react";

export interface TextUnderlineDrawProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  variant?: "wavy" | "straight";
  trigger?: "hover" | "view";
  color?: string;
  thickness?: number;
  duration?: number;
  autoplay?: boolean;
  once?: boolean;
}

const wave =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 6' preserveAspectRatio='none'%3E%3Cpath d='M0 3Q4 0.2 8 3T16 3' fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E\")";

const css = `
@keyframes hb-qd7-flow {
  from { -webkit-mask-position: 0 0; mask-position: 0 0; }
  to { -webkit-mask-position: calc(var(--hb-qd7-tile) * -1) 0; mask-position: calc(var(--hb-qd7-tile) * -1) 0; }
}
.hb-qd7 {
  position: relative;
  display: inline-block;
  padding-bottom: calc(var(--hb-qd7-h) * 0.55);
  font-family: inherit;
  box-sizing: border-box;
  cursor: default;
}
.hb-qd7-l {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--hb-qd7-h);
  background: var(--hb-qd7-c);
  clip-path: inset(0 100% 0 0);
  transition: clip-path var(--hb-qd7-dur) cubic-bezier(.65, 0, .25, 1);
  pointer-events: none;
}
.hb-qd7[data-v="wavy"] .hb-qd7-l {
  -webkit-mask-image: ${wave};
  mask-image: ${wave};
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  -webkit-mask-size: var(--hb-qd7-tile) 100%;
  mask-size: var(--hb-qd7-tile) 100%;
  animation: hb-qd7-flow 1.1s linear infinite;
}
.hb-qd7[data-v="straight"] .hb-qd7-l { border-radius: 999px; }
.hb-qd7[data-on] .hb-qd7-l { clip-path: inset(0 0 0 0); }
.hb-qd7[data-t="hover"]:hover .hb-qd7-l,
.hb-qd7[data-t="hover"]:focus-visible .hb-qd7-l { clip-path: inset(0 0 0 0); }
.hb-qd7:focus-visible { outline: 2px solid var(--hb-qd7-c); outline-offset: 4px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qd7-l { transition: none; animation: none !important; }
}
`;

export function TextUnderlineDraw({
  text,
  variant = "wavy",
  trigger = "hover",
  color = "#7fb3ff",
  thickness = 3,
  duration = 0.7,
  autoplay = true,
  once = true,
  className = "",
  style,
  ...rest
}: TextUnderlineDrawProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = React.useState(false);
  const [auto, setAuto] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || trigger !== "view") return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            if (once) io.disconnect();
          } else if (!once) {
            setSeen(false);
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, once]);

  React.useEffect(() => {
    if (trigger !== "hover" || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const first = setTimeout(() => setAuto(true), 500);
    const id = setInterval(() => setAuto((a) => !a), 1900);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [trigger, autoplay]);

  const h = variant === "wavy" ? thickness * 3.75 : thickness;
  const vars = {
    "--hb-qd7-c": color,
    "--hb-qd7-h": `${h.toFixed(2)}px`,
    "--hb-qd7-tile": `${((h * 16) / 6).toFixed(2)}px`,
    "--hb-qd7-dur": `${duration}s`,
    ...style,
  } as React.CSSProperties;

  const on = trigger === "view" ? seen : auto;

  return (
    <span
      ref={ref}
      className={`hb-qd7 ${className}`}
      style={vars}
      data-v={variant}
      data-t={trigger}
      data-on={on ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-underline-draw" precedence="default">{css}</style>
      {text}
      <span className="hb-qd7-l" aria-hidden="true" />
    </span>
  );
}

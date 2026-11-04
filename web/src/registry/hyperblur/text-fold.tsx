"use client";

import * as React from "react";

export interface TextFoldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  lines?: string[];
  fold?: number;
  stagger?: number;
  duration?: number;
  lineHeight?: number;
  shade?: boolean;
  replayEvery?: number;
}

const css = `
.hb-qs8 {
  --hb-qs8-lh: 1.15em;
  position: relative;
  box-sizing: border-box;
  display: block;
  font: inherit;
  perspective: 900px;
  perspective-origin: 50% 50%;
  outline: none;
}
.hb-qs8 *, .hb-qs8 *::before, .hb-qs8 *::after { box-sizing: border-box; }
.hb-qs8:focus-visible { outline: 2px solid #2f7bff; outline-offset: 6px; border-radius: 4px; }
.hb-qs8-w { display: block; transform-style: preserve-3d; }
.hb-qs8-l {
  display: block;
  height: var(--hb-qs8-lh);
  transform-origin: 50% 0;
  transform-style: preserve-3d;
}
.hb-qs8[data-on="false"] .hb-qs8-l { opacity: 0; }
.hb-qs8[data-on="true"] .hb-qs8-l {
  animation: hb-qs8-open var(--hb-qs8-d) cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--hb-qs8-n) * var(--hb-qs8-st));
}
.hb-qs8-f {
  position: relative;
  display: block;
  height: 100%;
  line-height: var(--hb-qs8-lh);
  white-space: nowrap;
  transform-origin: 50% 50%;
  transition: transform 0.7s cubic-bezier(0.34, 1.35, 0.5, 1);
  backface-visibility: hidden;
}
.hb-qs8-f::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, var(--hb-qs8-sh1) 0%, var(--hb-qs8-sh2) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.hb-qs8:hover .hb-qs8-f, .hb-qs8:focus-visible .hb-qs8-f {
  transform: translateY(var(--hb-qs8-ty)) rotateX(var(--hb-qs8-a));
}
.hb-qs8:hover .hb-qs8-f::after, .hb-qs8:focus-visible .hb-qs8-f::after { opacity: 1; }
@keyframes hb-qs8-open {
  0% { opacity: 0; transform: rotateX(-96deg); }
  25% { opacity: 1; }
  100% { opacity: 1; transform: rotateX(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs8[data-on="true"] .hb-qs8-l { animation: none; opacity: 1; }
  .hb-qs8-f, .hb-qs8-f::after { transition: none; }
}
`;

export function TextFold({
  lines = ["Fold the page.", "Keep the crease.", "Read between lines."],
  fold = 52,
  stagger = 140,
  duration = 1000,
  lineHeight = 1.15,
  shade = true,
  replayEvery = 0,
  className = "",
  style,
  tabIndex = 0,
  ...rest
}: TextFoldProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [on, setOn] = React.useState<"false" | "true" | "static">("false");
  const [run, setRun] = React.useState(0);
  const n = lines.length;
  const cos = Math.cos((fold * Math.PI) / 180);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setOn(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "static" : "true");
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!replayEvery || on !== "true") return;
    const id = window.setInterval(() => setRun((r) => r + 1), Math.max(2000, replayEvery));
    return () => window.clearInterval(id);
  }, [replayEvery, on]);

  const vars = {
    "--hb-qs8-lh": `${lineHeight}em`,
    "--hb-qs8-d": `${duration}ms`,
    "--hb-qs8-st": `${stagger}ms`,
    "--hb-qs8-sh1": shade ? "rgba(0, 0, 0, 0.5)" : "transparent",
    "--hb-qs8-sh2": shade ? "rgba(0, 0, 0, 0)" : "transparent",
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-text-fold" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-qs8 ${className}`}
        style={vars}
        tabIndex={tabIndex}
        data-on={on}
        aria-label={lines.join(" ")}
        role="group"
        {...rest}
      >
        <span key={run} className="hb-qs8-w">
          {lines.map((line, i) => {
            const down = i % 2 === 0 ? 1 : -1;
            const shift = (i + 0.5 - n / 2) * lineHeight * (cos - 1);
            const faceStyle = {
              "--hb-qs8-a": `${(down * fold).toFixed(1)}deg`,
              "--hb-qs8-ty": `${shift.toFixed(3)}em`,
            } as React.CSSProperties;
            return (
              <span
                key={i}
                className="hb-qs8-l"
                aria-hidden="true"
                style={{ "--hb-qs8-n": i } as React.CSSProperties}
              >
                <span className="hb-qs8-f" style={faceStyle}>
                  {line}
                </span>
              </span>
            );
          })}
        </span>
      </div>
    </>
  );
}

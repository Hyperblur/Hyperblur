"use client";

import * as React from "react";

export interface TextWeightWaveProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  minWeight?: number;
  maxWeight?: number;
  duration?: number;
  spread?: number;
  direction?: "forward" | "backward" | "mirror";
  accent?: string;
  tint?: boolean;
  bars?: boolean;
  paused?: boolean;
}

const css = `
@keyframes hb-vi3-w {
  0%, 100% { font-weight: var(--hb-vi3-min); color: var(--hb-vi3-base); }
  50% { font-weight: var(--hb-vi3-max); color: var(--hb-vi3-peak); }
}
@keyframes hb-vi3-bar {
  0%, 100% { transform: scaleY(0.2); opacity: 0.25; }
  50% { transform: scaleY(1); opacity: 1; }
}
.hb-vi3 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
  --hb-vi3-base: currentColor;
}
.hb-vi3 *, .hb-vi3 *::before, .hb-vi3 *::after { box-sizing: border-box; }
.hb-vi3-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi3-w { display: inline-block; white-space: nowrap; }
.hb-vi3-c {
  position: relative;
  display: inline-grid;
  justify-items: center;
}
.hb-vi3-c > span { grid-area: 1 / 1; }
.hb-vi3-g { visibility: hidden; font-weight: var(--hb-vi3-max); }
.hb-vi3-l {
  font-weight: var(--hb-vi3-min);
  animation: hb-vi3-w var(--hb-vi3-dur) cubic-bezier(.45, 0, .55, 1) infinite;
  animation-delay: calc(var(--hb-vi3-i) * var(--hb-vi3-spread) - var(--hb-vi3-dur) * 4);
}
.hb-vi3-b {
  position: absolute;
  left: 22%; right: 22%;
  bottom: -0.16em;
  height: 0.09em;
  border-radius: 0.05em;
  background: var(--hb-vi3-peak);
  transform-origin: 50% 100%;
  animation: hb-vi3-bar var(--hb-vi3-dur) cubic-bezier(.45, 0, .55, 1) infinite;
  animation-delay: calc(var(--hb-vi3-i) * var(--hb-vi3-spread) - var(--hb-vi3-dur) * 4);
}
.hb-vi3[data-paused] .hb-vi3-l, .hb-vi3[data-paused] .hb-vi3-b { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hb-vi3 .hb-vi3-l { animation: none; font-weight: var(--hb-vi3-mid); }
  .hb-vi3 .hb-vi3-b { animation: none; transform: scaleY(0.4); opacity: 0.4; }
}
`;

export function TextWeightWave({
  text,
  minWeight = 200,
  maxWeight = 900,
  duration = 2.4,
  spread = 0.09,
  direction = "forward",
  accent = "#7fb3ff",
  tint = true,
  bars = false,
  paused = false,
  className = "",
  style,
  ...rest
}: TextWeightWaveProps) {
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);
  const total = Array.from(text).filter((c) => c.trim() !== "").length;
  const mid = Math.round((minWeight + maxWeight) / 2);

  const vars = {
    "--hb-vi3-min": minWeight,
    "--hb-vi3-max": maxWeight,
    "--hb-vi3-mid": mid,
    "--hb-vi3-dur": `${duration}s`,
    "--hb-vi3-spread": `${direction === "backward" ? -spread : spread}s`,
    "--hb-vi3-peak": tint ? accent : "currentColor",
    ...style,
  } as React.CSSProperties;

  let n = 0;
  const center = (total - 1) / 2;

  return (
    <span className={`hb-vi3 ${className}`} style={vars} data-paused={paused ? "" : undefined} {...rest}>
      <style href="hb-text-weight-wave" precedence="default">{css}</style>
      <span className="hb-vi3-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          if (word.trim() === "") return <React.Fragment key={wi}>{word}</React.Fragment>;
          return (
            <span className="hb-vi3-w" key={wi}>
              {Array.from(word).map((ch, ci) => {
                const i = n++;
                const pos = direction === "mirror" ? Math.abs(i - center) : i;
                return (
                  <span key={ci} className="hb-vi3-c" style={{ "--hb-vi3-i": pos.toFixed(2) } as React.CSSProperties}>
                    <span className="hb-vi3-g">{ch}</span>
                    <span className="hb-vi3-l">{ch}</span>
                    {bars ? <span className="hb-vi3-b" /> : null}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}

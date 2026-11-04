"use client";

import * as React from "react";

export interface TextLiquidGradientProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  colors?: string[];
  speed?: number;
  glow?: number;
  glowBlur?: number;
}

const css = `
@keyframes hb-qdc-drift {
  from { background-position: var(--hb-qdc-x0) var(--hb-qdc-y0); }
  to { background-position: var(--hb-qdc-x1) var(--hb-qdc-y1); }
}
@keyframes hb-qdc-slide {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
.hb-qdc {
  position: relative;
  display: inline-block;
  max-width: 100%;
  isolation: isolate;
  line-height: 1.1;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-qdc-t {
  display: block;
  margin: 0;
  padding: 0.08em 0.14em;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat: no-repeat;
}
.hb-qdc-main { position: relative; z-index: 1; display: block; }
.hb-qdc-fill { position: relative; }
.hb-qdc-abs { position: absolute; inset: 0; pointer-events: none; user-select: none; }
.hb-qdc-base {
  background-image: var(--hb-qdc-ramp);
  background-size: 220% 100%;
  background-repeat: repeat-x;
  animation: hb-qdc-slide var(--hb-qdc-basedur) ease-in-out infinite alternate;
}
.hb-qdc-b {
  background-image: radial-gradient(closest-side, var(--hb-qdc-c) 0%, transparent 100%);
  background-size: var(--hb-qdc-w) var(--hb-qdc-h);
  background-position: var(--hb-qdc-x0) var(--hb-qdc-y0);
  animation: hb-qdc-drift var(--hb-qdc-dur) ease-in-out infinite alternate;
  animation-delay: var(--hb-qdc-dl);
}
.hb-qdc-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: var(--hb-qdc-glow);
  filter: blur(var(--hb-qdc-blur)) saturate(1.5);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qdc-base, .hb-qdc-b { animation: none; }
}
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function TextLiquidGradient({
  text,
  colors = ["#2f7bff", "#8b5cf6", "#ff4fd8", "#22d3ee"],
  speed = 1,
  glow = 0.55,
  glowBlur = 0.2,
  className = "",
  style,
  ...rest
}: TextLiquidGradientProps) {
  const palette = colors.length > 0 ? colors : ["#2f7bff"];
  const pct = (v: number) => `${v.toFixed(1)}%`;
  const rate = Math.max(0.1, speed);

  const blobs = palette.map((c, i) => {
    const dur = (7 + mix(i * 5 + 1) * 6) / rate;
    return {
      key: i,
      style: {
        "--hb-qdc-c": c,
        "--hb-qdc-w": pct(70 + mix(i * 5 + 2) * 40),
        "--hb-qdc-h": pct(130 + mix(i * 5 + 3) * 70),
        "--hb-qdc-x0": pct(mix(i * 5 + 4) * 100),
        "--hb-qdc-y0": pct(mix(i * 5 + 5) * 100),
        "--hb-qdc-x1": pct(mix(i * 5 + 6) * 100),
        "--hb-qdc-y1": pct(mix(i * 5 + 7) * 100),
        "--hb-qdc-dur": `${dur.toFixed(2)}s`,
        "--hb-qdc-dl": `${(-mix(i * 5 + 8) * dur).toFixed(2)}s`,
      } as React.CSSProperties,
    };
  });

  const ramp = `linear-gradient(100deg, ${[...palette, palette[0]].join(", ")})`;
  const vars = {
    "--hb-qdc-ramp": ramp,
    "--hb-qdc-basedur": `${(12 / rate).toFixed(2)}s`,
    "--hb-qdc-glow": glow,
    "--hb-qdc-blur": `${glowBlur}em`,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-qdc ${className}`} style={vars} {...rest}>
      <style href="hb-text-liquid-gradient" precedence="default">{css}</style>
      {glow > 0 ? (
        <span className="hb-qdc-glow" aria-hidden="true">
          <span className="hb-qdc-t hb-qdc-base hb-qdc-abs">{text}</span>
          {blobs.map((b) => (
            <span key={b.key} className="hb-qdc-t hb-qdc-b hb-qdc-abs" style={b.style}>
              {text}
            </span>
          ))}
        </span>
      ) : null}
      <span className="hb-qdc-main">
        <span className="hb-qdc-t hb-qdc-base hb-qdc-fill">{text}</span>
        {blobs.map((b) => (
          <span key={b.key} className="hb-qdc-t hb-qdc-b hb-qdc-abs" style={b.style} aria-hidden="true">
            {text}
          </span>
        ))}
      </span>
    </span>
  );
}

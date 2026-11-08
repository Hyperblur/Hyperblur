"use client";

import * as React from "react";

export interface TextFoilSweepProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  tone?: "silver" | "gold" | "graphite";
  speed?: number;
  intensity?: number;
  interactive?: boolean;
}

const tones = {
  silver: "#f7f8fa 0%, #b9bec7 22%, #ffffff 38%, #7c828d 56%, #e6e9ee 74%, #9aa0aa 100%",
  gold: "#fff4d6 0%, #d9a44a 24%, #fff1c2 40%, #9c6a1c 58%, #f3cf7a 76%, #b07d2c 100%",
  graphite: "#d9dce2 0%, #6b707a 24%, #c8ccd4 40%, #3c4048 58%, #9ea3ad 76%, #555a63 100%",
};

const css = `
@keyframes hb-vi5-sweep {
  0% { --hb-vi5-p: -0.25; }
  62%, 100% { --hb-vi5-p: 1.25; }
}
@property --hb-vi5-p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0.5;
}
.hb-vi5 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  box-sizing: border-box;
  --hb-vi5-p: 0.5;
}
.hb-vi5-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi5-t {
  display: inline-block;
  color: transparent;
  background-image:
    linear-gradient(105deg, transparent calc(var(--hb-vi5-p) * 100% - 14%), rgba(255, 255, 255, 0.96) calc(var(--hb-vi5-p) * 100%), transparent calc(var(--hb-vi5-p) * 100% + 14%)),
    linear-gradient(100deg, transparent calc(var(--hb-vi5-p) * 100% - 34%), rgba(255, 120, 200, var(--hb-vi5-i)) calc(var(--hb-vi5-p) * 100% - 18%), rgba(120, 220, 255, var(--hb-vi5-i)) calc(var(--hb-vi5-p) * 100% - 4%), rgba(170, 255, 170, var(--hb-vi5-i)) calc(var(--hb-vi5-p) * 100% + 10%), rgba(255, 230, 120, var(--hb-vi5-i)) calc(var(--hb-vi5-p) * 100% + 22%), transparent calc(var(--hb-vi5-p) * 100% + 36%)),
    linear-gradient(180deg, var(--hb-vi5-tone));
  background-blend-mode: normal, color, normal;
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0.02em 0 rgba(0, 0, 0, 0.55)) drop-shadow(0 0.08em 0.12em rgba(0, 0, 0, 0.35));
  animation: hb-vi5-sweep var(--hb-vi5-speed) cubic-bezier(.55, .05, .3, 1) infinite;
}
.hb-vi5[data-pointer] .hb-vi5-t {
  animation: none;
  transition: --hb-vi5-p 0.5s cubic-bezier(.22, 1, .36, 1);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi5 .hb-vi5-t { animation: none; transition: none; }
}
`;

export function TextFoilSweep({
  text,
  tone = "silver",
  speed = 3.2,
  intensity = 0.65,
  interactive = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TextFoilSweepProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [pointer, setPointer] = React.useState(false);

  const vars = {
    "--hb-vi5-tone": tones[tone] ?? tones.silver,
    "--hb-vi5-speed": `${speed}s`,
    "--hb-vi5-i": Math.max(0, Math.min(1, intensity)).toFixed(2),
    ...style,
  } as React.CSSProperties;

  return (
    <span
      ref={ref}
      className={`hb-vi5 ${className}`}
      style={vars}
      data-pointer={pointer ? "" : undefined}
      onPointerMove={(e) => {
        if (interactive && e.pointerType === "mouse" && ref.current) {
          const r = ref.current.getBoundingClientRect();
          const p = (e.clientX - r.left) / Math.max(1, r.width);
          ref.current.style.setProperty("--hb-vi5-p", (0.15 + p * 0.7).toFixed(3));
          if (!pointer) setPointer(true);
        }
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        if (ref.current) ref.current.style.removeProperty("--hb-vi5-p");
        setPointer(false);
        onPointerLeave?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-foil-sweep" precedence="default">{css}</style>
      <span className="hb-vi5-sr">{text}</span>
      <span className="hb-vi5-t" aria-hidden="true">{text}</span>
    </span>
  );
}

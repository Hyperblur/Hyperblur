"use client";

import * as React from "react";

export interface MotionBlurTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text to render. */
  text: string;
  /** Where the text comes from. */
  direction?: "left" | "right" | "up" | "down";
  /** Travel distance in pixels. */
  distance?: number;
  /** Seconds for the whole move. */
  duration?: number;
  /** Play once on mount, or replay on hover. */
  trigger?: "mount" | "hover";
}

const css = `
@keyframes hb-mb-in {
  0% { transform: translate(var(--hb-x), var(--hb-y)); filter: blur(var(--hb-blur)); opacity: 0; }
  60% { filter: blur(calc(var(--hb-blur) * 0.35)); opacity: 1; }
  100% { transform: translate(0, 0); filter: blur(0); opacity: 1; }
}
@keyframes hb-mb-ghost {
  0% { transform: translate(var(--hb-x), var(--hb-y)); opacity: 0; }
  30% { opacity: var(--hb-go); }
  100% { transform: translate(0, 0); opacity: 0; }
}
.hb-mb { position: relative; display: inline-block; white-space: nowrap; }
.hb-mb > span { display: inline-block; }
.hb-mb > span[aria-hidden] { position: absolute; inset: 0; pointer-events: none; opacity: 0; }
.hb-mb[data-play="true"] > span:first-child { animation: hb-mb-in var(--hb-d) cubic-bezier(.2,.9,.2,1) both; }
.hb-mb[data-play="true"] > span:nth-child(2) { animation: hb-mb-ghost var(--hb-d) cubic-bezier(.2,.9,.2,1) both; animation-delay: calc(var(--hb-d) * 0.08); --hb-go: .45; filter: blur(calc(var(--hb-blur) * .6)); }
.hb-mb[data-play="true"] > span:nth-child(3) { animation: hb-mb-ghost var(--hb-d) cubic-bezier(.2,.9,.2,1) both; animation-delay: calc(var(--hb-d) * 0.16); --hb-go: .2; filter: blur(var(--hb-blur)); }
@media (prefers-reduced-motion: reduce) { .hb-mb > span { animation: none !important; opacity: 1 !important; } .hb-mb > span[aria-hidden] { display: none; } }
`;

export function MotionBlurText({
  text,
  direction = "left",
  distance = 40,
  duration = 0.7,
  trigger = "mount",
  className = "",
  style,
  ...rest
}: MotionBlurTextProps) {
  const [play, setPlay] = React.useState(trigger === "mount");
  const [key, setKey] = React.useState(0);

  const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const y = direction === "up" ? -distance : direction === "down" ? distance : 0;

  const vars = {
    "--hb-x": `${x}px`,
    "--hb-y": `${y}px`,
    "--hb-blur": `${Math.max(6, distance * 0.3)}px`,
    "--hb-d": `${duration}s`,
    ...style,
  } as React.CSSProperties;

  function replay() {
    setPlay(true);
    setKey((k) => k + 1);
  }

  return (
    <span
      key={key}
      className={`hb-mb ${className}`}
      style={vars}
      data-play={play}
      onMouseEnter={trigger === "hover" ? replay : undefined}
      {...rest}
    >
      <style href="hb-motion-blur-text" precedence="default">{css}</style>
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

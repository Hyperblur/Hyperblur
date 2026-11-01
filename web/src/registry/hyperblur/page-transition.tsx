"use client";

import * as React from "react";

export interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  routeKey: string | number;
  variant?: "fade" | "slide-up" | "slide-left" | "blur" | "curtain";
  duration?: number;
  initial?: boolean;
}

const css = `
@keyframes hb-pt-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes hb-pt-slide-up {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-pt-slide-left {
  from { opacity: 0; transform: translateX(48px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes hb-pt-blur {
  from { opacity: 0; filter: blur(16px); transform: scale(1.03); }
  to { opacity: 1; filter: blur(0); transform: scale(1); }
}
@keyframes hb-pt-sweep {
  from { transform: translateX(0); }
  to { transform: translateX(101%); }
}
.hb-pt { position: relative; }
.hb-pt-v-slide-up, .hb-pt-v-slide-left, .hb-pt-v-curtain { overflow: hidden; }
.hb-pt-page { position: relative; }
.hb-pt-a-fade { animation: hb-pt-fade var(--hb-pt-d) ease both; }
.hb-pt-a-slide-up { animation: hb-pt-slide-up var(--hb-pt-d) cubic-bezier(.22, 1, .36, 1) backwards; }
.hb-pt-a-slide-left { animation: hb-pt-slide-left var(--hb-pt-d) cubic-bezier(.22, 1, .36, 1) backwards; }
.hb-pt-a-blur { animation: hb-pt-blur var(--hb-pt-d) cubic-bezier(.22, 1, .36, 1) backwards; }
.hb-pt-a-curtain { animation: hb-pt-fade calc(var(--hb-pt-d) * 0.6) ease calc(var(--hb-pt-d) * 0.25) backwards; }
.hb-pt-curtain {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(90deg, #0b0b0d, #141417);
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.16), -24px 0 48px rgba(0, 0, 0, 0.45);
  animation: hb-pt-sweep var(--hb-pt-d) cubic-bezier(.76, 0, .24, 1) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .hb-pt-page { animation-name: hb-pt-fade !important; animation-timing-function: ease !important; animation-delay: 0s !important; }
  .hb-pt-curtain { display: none; }
}
`;

interface Track {
  key: string | number;
  n: number;
}

export function PageTransition({
  children,
  routeKey,
  variant = "fade",
  duration = 0.45,
  initial = false,
  className = "",
  style,
  ...rest
}: PageTransitionProps) {
  const [track, setTrack] = React.useState<Track>({ key: routeKey, n: 0 });
  if (track.key !== routeKey) setTrack({ key: routeKey, n: track.n + 1 });

  const animate = initial || track.n > 0;
  const vars = {
    "--hb-pt-d": `${Math.max(0.05, duration)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-pt hb-pt-v-${variant} ${className}`} style={vars} {...rest}>
      <style href="hb-page-transition" precedence="default">{css}</style>
      <div key={track.n} className={`hb-pt-page${animate ? ` hb-pt-a-${variant}` : ""}`}>
        {children}
      </div>
      {animate && variant === "curtain" && <div key={`c${track.n}`} className="hb-pt-curtain" aria-hidden="true" />}
    </div>
  );
}

"use client";

import * as React from "react";

export interface FilmGrainProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  size?: number;
  speed?: number;
  monochrome?: boolean;
}

const FRAMES = [11, 47, 83, 129];

const css = `
@keyframes hb-fg-step { 0% { opacity: 1; } 25% { opacity: 0; } 100% { opacity: 0; } }
.hb-fg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; opacity: var(--hb-o); mix-blend-mode: overlay; }
.hb-fg > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-fg-f { opacity: 0; animation: hb-fg-step var(--hb-dur) steps(1, end) infinite; animation-delay: var(--d); }
.hb-fg-f[data-f="0"] { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .hb-fg-f { animation: none; } }
`;

export function FilmGrain({
  opacity = 0.18,
  size = 1,
  speed = 1,
  monochrome = true,
  className = "",
  style,
  ...rest
}: FilmGrainProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const freq = +(0.85 / Math.max(size, 0.1)).toFixed(4);
  const dur = +(0.5 / Math.max(speed, 0.01)).toFixed(3);

  const matrix = monochrome
    ? "0.9 0.9 0.9 0 -0.8  0.9 0.9 0.9 0 -0.8  0.9 0.9 0.9 0 -0.8  0 0 0 1 0"
    : "2.4 0 0 0 -0.7  0 2.4 0 0 -0.7  0 0 2.4 0 -0.7  0 0 0 1 0";

  const vars = {
    "--hb-o": opacity,
    "--hb-dur": `${dur}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-fg ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-film-grain" precedence="default">{css}</style>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          {FRAMES.map((seed, i) => (
            <filter key={seed} id={`hb-fg-${uid}-${i}`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={seed} stitchTiles="stitch" />
              <feColorMatrix type="matrix" values={matrix} />
            </filter>
          ))}
        </defs>
        {FRAMES.map((seed, i) => (
          <rect
            key={seed}
            className="hb-fg-f"
            data-f={i}
            width="100%"
            height="100%"
            filter={`url(#hb-fg-${uid}-${i})`}
            style={{ "--d": `${+(-(1 - i / FRAMES.length) * dur).toFixed(3)}s` } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}

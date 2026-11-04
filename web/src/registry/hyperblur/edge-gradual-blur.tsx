"use client";

import * as React from "react";

export interface EdgeGradualBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom" | "left" | "right";
  height?: number | string;
  strength?: number;
  layers?: number;
  tint?: string;
}

const css = `
.hb-qr2 {
  position: absolute;
  z-index: 3;
  box-sizing: border-box;
  pointer-events: none;
  overflow: hidden;
}
.hb-qr2[data-position="top"] { top: 0; left: 0; right: 0; height: var(--hb-qr2-s); }
.hb-qr2[data-position="bottom"] { bottom: 0; left: 0; right: 0; height: var(--hb-qr2-s); }
.hb-qr2[data-position="left"] { top: 0; bottom: 0; left: 0; width: var(--hb-qr2-s); }
.hb-qr2[data-position="right"] { top: 0; bottom: 0; right: 0; width: var(--hb-qr2-s); }
.hb-qr2-l,
.hb-qr2-t {
  position: absolute;
  inset: 0;
}
`;

const directions = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
} as const;

function layerMask(index: number, count: number, direction: string) {
  const step = 100 / count;
  const p0 = index * step;
  const p1 = (index + 1) * step;
  const p2 = (index + 2) * step;
  const p3 = (index + 3) * step;
  const stops = [`transparent ${p0.toFixed(2)}%`, `#000 ${p1.toFixed(2)}%`];
  if (p2 < 100) stops.push(`#000 ${p2.toFixed(2)}%`);
  if (p3 <= 100) stops.push(`transparent ${p3.toFixed(2)}%`);
  return `linear-gradient(${direction}, ${stops.join(", ")})`;
}

export function EdgeGradualBlur({
  position = "bottom",
  height = 64,
  strength = 1,
  layers = 6,
  tint,
  className = "",
  style,
  ...rest
}: EdgeGradualBlurProps) {
  const count = Math.max(2, Math.min(10, Math.round(layers)));
  const direction = directions[position];
  const size = typeof height === "number" ? `${height}px` : height;
  const items = Array.from({ length: count }, (_, i) => {
    const blur = Math.max(0.1, strength * 0.4 * Math.pow(2, i));
    const mask = layerMask(i, count, direction);
    const filter = `blur(${blur.toFixed(2)}px)`;
    return {
      key: i,
      style: {
        backdropFilter: filter,
        WebkitBackdropFilter: filter,
        maskImage: mask,
        WebkitMaskImage: mask,
      } as React.CSSProperties,
    };
  });

  return (
    <div
      aria-hidden="true"
      data-position={position}
      className={`hb-qr2 ${className}`.trim()}
      style={{ ["--hb-qr2-s" as string]: size, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-edge-gradual-blur" precedence="default">
        {css}
      </style>
      {items.map((item) => (
        <span key={item.key} className="hb-qr2-l" style={item.style} />
      ))}
      {tint ? (
        <span
          className="hb-qr2-t"
          style={{ background: `linear-gradient(${direction}, transparent 0%, ${tint} 100%)`, opacity: 0.85 }}
        />
      ) : null}
    </div>
  );
}

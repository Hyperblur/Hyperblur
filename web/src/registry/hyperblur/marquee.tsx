"use client";

import * as React from "react";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: number;
  fade?: boolean;
}

const css = `
@keyframes hb-mq-run {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.hb-mq { position: relative; display: flex; overflow: hidden; width: 100%; }
.hb-mq[data-fade="true"] {
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
}
.hb-mq-track {
  display: flex;
  flex: 0 0 auto;
  width: max-content;
  will-change: transform;
  animation: hb-mq-run var(--hb-dur) linear infinite;
  animation-direction: var(--hb-dir);
}
.hb-mq-group {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  box-sizing: border-box;
  min-width: 100%;
  gap: var(--hb-gap);
  padding-right: var(--hb-gap);
}
.hb-mq[data-pause="true"]:hover .hb-mq-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hb-mq { overflow-x: auto; }
  .hb-mq-track { animation: none; will-change: auto; }
  .hb-mq-group[aria-hidden="true"] { display: none; }
}
`;

export function Marquee({
  children,
  speed = 1,
  direction = "left",
  pauseOnHover = true,
  gap = 32,
  fade = true,
  className = "",
  style,
  ...rest
}: MarqueeProps) {
  const groupRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children, gap]);

  const pxPerSecond = 60 * Math.max(speed, 0.01);
  const dur = width > 0 ? +(width / pxPerSecond).toFixed(3) : +(30 / Math.max(speed, 0.01)).toFixed(3);

  const vars = {
    "--hb-dur": `${dur}s`,
    "--hb-dir": direction === "right" ? "reverse" : "normal",
    "--hb-gap": `${Math.max(0, gap)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`hb-mq ${className}`}
      style={vars}
      data-fade={fade}
      data-pause={pauseOnHover}
      {...rest}
    >
      <style href="hb-marquee" precedence="default">{css}</style>
      <div className="hb-mq-track">
        <div className="hb-mq-group" ref={groupRef}>
          {children}
        </div>
        <div className="hb-mq-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

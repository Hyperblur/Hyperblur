"use client";

import * as React from "react";

export interface ScrollVelocityTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  baseSpeed?: number;
  velocityFactor?: number;
  direction?: 1 | -1;
  gap?: number;
}

const css = `
.hb-svt { position: relative; display: block; overflow: hidden; width: 100%; }
.hb-svt-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
  will-change: transform;
}
.hb-svt-item { flex: 0 0 auto; padding-right: var(--hb-svt-gap); }
@media (prefers-reduced-motion: reduce) {
  .hb-svt { overflow-x: auto; }
  .hb-svt-track { will-change: auto; transform: none !important; }
  .hb-svt-item[aria-hidden="true"] { display: none; }
}
`;

export function ScrollVelocityText({
  text,
  baseSpeed = 40,
  velocityFactor = 1.5,
  direction = 1,
  gap = 48,
  className = "",
  style,
  ...rest
}: ScrollVelocityTextProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const itemRef = React.useRef<HTMLSpanElement>(null);
  const offset = React.useRef(0);
  const [copies, setCopies] = React.useState(2);

  React.useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const item = itemRef.current;
    if (!root || !track || !item) return;

    let itemWidth = 0;
    const measure = () => {
      itemWidth = item.offsetWidth;
      if (itemWidth <= 0) return;
      setCopies(Math.max(2, Math.ceil(root.clientWidth / itemWidth) + 1));
    };
    measure();

    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(root);
    ro?.observe(item);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => ro?.disconnect();
    }

    let raf = 0;
    let lastTime = performance.now();
    let lastY = window.scrollY;
    let velocity = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (dt > 0) {
        const y = window.scrollY;
        const raw = (y - lastY) / dt;
        lastY = y;
        velocity += (raw - velocity) * (1 - Math.exp(-dt * 8));
        if (itemWidth > 0) {
          const speed = direction * (baseSpeed + velocityFactor * velocity);
          const next = (offset.current + speed * dt) % itemWidth;
          offset.current = next < 0 ? next + itemWidth : next;
          track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [text, baseSpeed, velocityFactor, direction, gap]);

  const vars = {
    "--hb-svt-gap": `${Math.max(0, gap)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-svt ${className}`} style={vars} {...rest}>
      <style href="hb-scroll-velocity-text" precedence="default">{css}</style>
      <div ref={trackRef} className="hb-svt-track">
        {Array.from({ length: copies }, (_, i) => (
          <span
            key={i}
            ref={i === 0 ? itemRef : undefined}
            className="hb-svt-item"
            aria-hidden={i === 0 ? undefined : true}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

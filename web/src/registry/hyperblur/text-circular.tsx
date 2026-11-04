"use client";

import * as React from "react";

export interface TextCircularProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: number;
  fontSize?: number;
  speed?: number;
  hoverBoost?: number;
  reverseOnHover?: boolean;
  separator?: string;
  repeat?: number;
  pulseEvery?: number;
  accent?: string;
  children?: React.ReactNode;
}

const css = `
.hb-qt4 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--hb-qt4-size);
  aspect-ratio: 1;
  font-family: inherit;
}
.hb-qt4-ring {
  position: absolute;
  inset: 0;
  will-change: transform;
}
.hb-qt4-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-qt4-t {
  fill: currentColor;
  white-space: pre;
  font-family: inherit;
  font-weight: inherit;
  letter-spacing: 0;
}
.hb-qt4-dash {
  fill: none;
  stroke: var(--hb-qt4-ac);
  stroke-opacity: 0.45;
  stroke-width: 0.9;
  stroke-linecap: round;
  stroke-dasharray: 0.1 4.2;
}
.hb-qt4-mid {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hb-qt4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qt4-ring { transform: none !important; will-change: auto; }
}
`;

const PULSE_MS = 1500;

export function TextCircular({
  text = "Small batch coffee",
  size = 220,
  fontSize = 14,
  speed = 14,
  hoverBoost = 3,
  reverseOnHover = true,
  separator = " • ",
  repeat = 0,
  pulseEvery = 0,
  accent = "#2f7bff",
  children,
  className = "",
  style,
  ...rest
}: TextCircularProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const pid = `hb-qt4-p${uid}`;

  const radius = 100 - fontSize * 1.1;
  const circ = 2 * Math.PI * radius;
  const unit = (text.length + separator.length) * fontSize * 0.62;
  const copies = repeat > 0 ? Math.round(repeat) : Math.max(1, Math.round(circ / Math.max(1, unit)));
  const content = Array.from({ length: copies }, () => text).join(separator) + separator;
  const d = `M ${(100 - radius).toFixed(2)} 100 a ${radius.toFixed(2)} ${radius.toFixed(2)} 0 1 1 ${(radius * 2).toFixed(2)} 0 a ${radius.toFixed(2)} ${radius.toFixed(2)} 0 1 1 ${(-radius * 2).toFixed(2)} 0`;

  React.useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    if (!root || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ring.style.transform = "none";
      return;
    }
    let angle = 0;
    let velocity = speed;
    let hovered = false;
    let seen = true;
    let last = 0;
    let raf = 0;
    let pulseUntil = 0;
    let nextPulse = pulseEvery > 0 ? performance.now() + pulseEvery * 1000 : Infinity;

    const tick = (now: number) => {
      raf = 0;
      if (!seen) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (now >= nextPulse) {
        pulseUntil = now + PULSE_MS;
        nextPulse += pulseEvery * 1000;
      }
      const boosted = hovered || now < pulseUntil;
      const sign = boosted && reverseOnHover ? -1 : 1;
      const target = boosted ? speed * hoverBoost * sign : speed;
      velocity += (target - velocity) * (1 - Math.exp(-dt * 3.2));
      angle = (angle + velocity * dt) % 360;
      ring.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (!raf && seen) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        seen = entry.isIntersecting;
        if (seen) run();
      }
    });
    io.observe(root);

    const enter = () => {
      hovered = true;
    };
    const leave = () => {
      hovered = false;
    };
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    root.addEventListener("focusin", enter);
    root.addEventListener("focusout", leave);
    run();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      root.removeEventListener("focusin", enter);
      root.removeEventListener("focusout", leave);
    };
  }, [speed, hoverBoost, reverseOnHover, pulseEvery]);

  const vars = {
    "--hb-qt4-size": `${size}px`,
    "--hb-qt4-ac": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qt4 ${className}`} style={vars} {...rest}>
      <style href="hb-text-circular" precedence="default">{css}</style>
      <span className="hb-qt4-sr">{text}</span>
      <div ref={ringRef} className="hb-qt4-ring" aria-hidden="true">
        <svg className="hb-qt4-svg" viewBox="0 0 200 200" focusable="false">
          <defs>
            <path id={pid} d={d} />
          </defs>
          <circle className="hb-qt4-dash" cx="100" cy="100" r={(radius - fontSize * 0.9).toFixed(2)} />
          <text className="hb-qt4-t" fontSize={fontSize}>
            <textPath href={`#${pid}`} textLength={circ.toFixed(2)} lengthAdjust="spacing">
              {content}
            </textPath>
          </text>
        </svg>
      </div>
      {children ? <div className="hb-qt4-mid">{children}</div> : null}
    </div>
  );
}

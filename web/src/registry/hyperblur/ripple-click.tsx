"use client";

import * as React from "react";

export interface RippleClickProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const css = `
.hb-rc {
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.hb-rc > .hb-rc-r {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  background: var(--hb-c);
  transform: translate(-50%, -50%) scale(0);
  animation: hb-rc-ripple var(--hb-d) ease-out forwards;
}
@keyframes hb-rc-ripple {
  to { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}
`;

export function RippleClick({
  children,
  color = "rgba(255,255,255,0.35)",
  duration = 0.6,
  className = "",
  style,
  onClick,
  ...rest
}: RippleClickProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const counter = React.useRef(0);
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    onClick?.(e);
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const keyboard = e.detail === 0 && e.clientX === 0 && e.clientY === 0;
    const x = keyboard ? r.width / 2 : e.clientX - r.left;
    const y = keyboard ? r.height / 2 : e.clientY - r.top;
    const size = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y)) * 2;
    const id = counter.current++;
    setRipples((list) => [...list, { id, x, y, size }]);
  }

  function remove(id: number) {
    setRipples((list) => list.filter((item) => item.id !== id));
  }

  const vars = {
    "--hb-c": color,
    "--hb-d": `${duration}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      ref={ref}
      className={`hb-rc ${className}`}
      style={vars}
      onClick={handleClick}
      {...rest}
    >
      <style href="hb-ripple-click" precedence="default">{css}</style>
      {children}
      {ripples.map((item) => (
        <span
          key={item.id}
          className="hb-rc-r"
          aria-hidden="true"
          style={{ left: item.x, top: item.y, width: item.size, height: item.size }}
          onAnimationEnd={() => remove(item.id)}
        />
      ))}
    </span>
  );
}

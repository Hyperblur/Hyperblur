"use client";

import * as React from "react";

export interface Text3dExtrudeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  depth?: number;
  layers?: number;
  tilt?: number;
  color?: string;
  sideColor?: string;
  shadow?: boolean;
}

const css = `
.hb-qdb {
  position: relative;
  display: inline-block;
  max-width: 100%;
  padding: 0.35em 0.5em;
  line-height: 1.05;
  perspective: 760px;
  touch-action: pan-y;
  cursor: default;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-qdb *, .hb-qdb *::before, .hb-qdb *::after { box-sizing: border-box; }
.hb-qdb-stage {
  position: relative;
  display: block;
  transform-style: preserve-3d;
  transform-origin: 50% 50% calc(var(--hb-qdb-depth) * -0.5);
  transform: rotateX(var(--hb-qdb-rx)) rotateY(var(--hb-qdb-ry));
}
.hb-qdb-f { position: relative; display: block; color: var(--hb-qdb-front); transform: translateZ(0.5px); }
.hb-qdb-l {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
  user-select: none;
}
.hb-qdb-s { filter: blur(0.14em); opacity: 0.4; color: #000; }
`;

export function Text3dExtrude({
  text,
  depth = 30,
  layers = 16,
  tilt = 28,
  color = "#ffffff",
  sideColor = "#2f7bff",
  shadow = true,
  className = "",
  style,
  ...rest
}: Text3dExtrudeProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const count = Math.max(2, Math.round(layers));
  const step = depth / count;

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const set = (rx: number, ry: number) => {
      root.style.setProperty("--hb-qdb-rx", `${rx.toFixed(2)}deg`);
      root.style.setProperty("--hb-qdb-ry", `${ry.toFixed(2)}deg`);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(-tilt * 0.3, tilt * 0.5);
      return;
    }

    const pointer = { x: 0, y: 0, inside: false };
    const start = performance.now();
    let blend = 0;
    let rx = 0;
    let ry = 0;
    let visible = true;
    let raf = 0;

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const box = root.getBoundingClientRect();
      const t = (now - start) / 1000;
      blend += ((pointer.inside ? 1 : 0) - blend) * 0.1;
      const nx = Math.max(-1, Math.min(1, (pointer.x - box.left - box.width / 2) / (box.width / 2 || 1)));
      const ny = Math.max(-1, Math.min(1, (pointer.y - box.top - box.height / 2) / (box.height / 2 || 1)));
      const idleY = Math.sin(t * 0.8) * 0.75;
      const idleX = Math.sin(t * 0.55 + 1.2) * 0.35;
      const targetY = (idleY + (nx - idleY) * blend) * tilt;
      const targetX = (-(idleX + (ny - idleX) * blend)) * tilt * 0.7;
      rx += (targetX - rx) * 0.14;
      ry += (targetY - ry) * 0.14;
      set(rx, ry);
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const leave = () => {
      pointer.inside = false;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(root);
    root.addEventListener("pointerenter", move);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", move);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
    };
  }, [tilt]);

  const vars = {
    "--hb-qdb-front": color,
    "--hb-qdb-depth": `${depth}px`,
    "--hb-qdb-rx": "0deg",
    "--hb-qdb-ry": "0deg",
    ...style,
  } as React.CSSProperties;

  const stack = Array.from({ length: count }, (_, k) => {
    const i = count - k;
    const shade = ((i / count) * 68).toFixed(1);
    return {
      key: i,
      style: {
        transform: `translateZ(${(-i * step).toFixed(2)}px)`,
        color: `color-mix(in srgb, ${sideColor} ${(100 - Number(shade)).toFixed(1)}%, #000 ${shade}%)`,
      } as React.CSSProperties,
    };
  });

  return (
    <span ref={ref} className={`hb-qdb ${className}`} style={vars} {...rest}>
      <style href="hb-text-3d-extrude" precedence="default">{css}</style>
      <span className="hb-qdb-stage">
        {shadow ? (
          <span
            className="hb-qdb-l hb-qdb-s"
            aria-hidden="true"
            style={{ transform: `translateZ(${(-depth - 16).toFixed(1)}px)` }}
          >
            {text}
          </span>
        ) : null}
        {stack.map((layer) => (
          <span key={layer.key} className="hb-qdb-l" aria-hidden="true" style={layer.style}>
            {text}
          </span>
        ))}
        <span className="hb-qdb-f">{text}</span>
      </span>
    </span>
  );
}

"use client";

import * as React from "react";

export interface MicroDodgeFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size"> {
  label?: string;
  accent?: string;
  idle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const css = `
.hb-ql2 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  --hb-ql2-c: #2f7bff;
}
.hb-ql2 *, .hb-ql2 *::before, .hb-ql2 *::after { box-sizing: border-box; }
.hb-ql2-l {
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #a1a1a1;
}
.hb-ql2-f {
  position: relative;
  height: 52px;
  overflow: hidden;
  container-type: inline-size;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.hb-ql2-f:hover { border-color: #343434; }
.hb-ql2-f[data-focus="true"] {
  border-color: var(--hb-ql2-c);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ql2-c) 22%, transparent);
}
.hb-ql2-d {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0%, color-mix(in srgb, var(--hb-ql2-c) 70%, #fff) 28%, var(--hb-ql2-c) 70%);
  box-shadow: 0 0 14px 2px color-mix(in srgb, var(--hb-ql2-c) 55%, transparent);
  transform: translate(calc(100cqw - 33px), 19px);
  pointer-events: none;
  will-change: transform;
}
.hb-ql2-g {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.38);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  will-change: transform;
}
.hb-ql2-g[data-on="true"] { opacity: 1; }
.hb-ql2-i {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 16px;
  font: inherit;
  color: #ededed;
  background: transparent;
  border: 0;
  outline: 0;
}
.hb-ql2-i::placeholder { color: #6b6b6b; }
.hb-ql2-i:disabled { cursor: not-allowed; opacity: 0.5; }
@media (prefers-reduced-motion: reduce) {
  .hb-ql2-f, .hb-ql2-g { transition: none; }
}
`;

export function MicroDodgeField({
  label,
  accent = "#2f7bff",
  idle = true,
  className = "",
  style,
  id,
  onFocus,
  onBlur,
  ...rest
}: MicroDodgeFieldProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLSpanElement>(null);
  const ghostRef = React.useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = React.useState(false);
  const state = React.useRef({
    x: -1,
    y: -1,
    vx: 0,
    vy: 0,
    px: 0,
    py: 0,
    inside: false,
    focused: false,
    resumeAt: 0,
    idle,
  });
  const api = React.useRef({ wake: () => {} });

  React.useEffect(() => {
    state.current.idle = idle;
    state.current.focused = focused;
    api.current.wake();
  }, [idle, focused]);

  React.useEffect(() => {
    const field = fieldRef.current;
    const dot = dotRef.current;
    const ghost = ghostRef.current;
    if (!field || !dot || !ghost) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const restPoint = (w: number, h: number) =>
      s.focused ? { x: w - 18, y: 14 } : { x: w - 26, y: h / 2 };

    const draw = () => {
      const speed = Math.hypot(s.vx, s.vy);
      const sx = 1 + Math.min(0.55, speed / 1500);
      const sy = 1 / sx;
      const ang = Math.atan2(s.vy, s.vx);
      const base = s.focused ? 0.7 : 1;
      dot.style.transform = `translate3d(${(s.x - 7).toFixed(2)}px,${(s.y - 7).toFixed(2)}px,0) rotate(${ang.toFixed(3)}rad) scale(${(sx * base).toFixed(3)},${(sy * base).toFixed(3)})`;
    };

    const place = () => {
      const w = field.clientWidth;
      const h = field.clientHeight;
      const r = restPoint(w, h);
      s.x = r.x;
      s.y = r.y;
      s.vx = 0;
      s.vy = 0;
      draw();
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const w = field.clientWidth;
      const h = field.clientHeight;
      if (s.x < 0) {
        const r0 = restPoint(w, h);
        s.x = r0.x;
        s.y = r0.y;
      }
      const r = restPoint(w, h);
      let hasPointer = false;
      let px = 0;
      let py = 0;
      if (s.inside) {
        hasPointer = true;
        px = s.px;
        py = s.py;
        ghost.dataset.on = "false";
      } else if (s.idle && !reduced && now >= s.resumeAt) {
        hasPointer = true;
        px = w * (0.5 + 0.44 * Math.sin(now * 0.0011));
        py = h * (0.5 + 0.5 * Math.sin(now * 0.0019 + 1));
        ghost.dataset.on = "true";
        ghost.style.transform = `translate3d(${(px - 8).toFixed(1)}px,${(py - 8).toFixed(1)}px,0)`;
      } else {
        ghost.dataset.on = "false";
      }
      let rem = dt;
      while (rem > 0) {
        const step = Math.min(rem, 1 / 120);
        let ax = 110 * (r.x - s.x) - 13 * s.vx;
        let ay = 110 * (r.y - s.y) - 13 * s.vy;
        if (hasPointer) {
          const dx = s.x - px;
          const dy = s.y - py;
          const dist = Math.hypot(dx, dy);
          const reach = 96;
          if (dist < reach) {
            const f = 1 - dist / reach;
            const nx = dist > 0.01 ? dx / dist : 1;
            const ny = dist > 0.01 ? dy / dist : 0;
            ax += nx * f * f * 9000;
            ay += ny * f * f * 9000;
          }
        }
        s.vx += ax * step;
        s.vy += ay * step;
        s.x += s.vx * step;
        s.y += s.vy * step;
        const minX = 12;
        const maxX = w - 12;
        const minY = 12;
        const maxY = h - 12;
        if (s.x < minX) {
          s.x = minX;
          s.vx = Math.abs(s.vx) * 0.3;
        } else if (s.x > maxX) {
          s.x = maxX;
          s.vx = -Math.abs(s.vx) * 0.3;
        }
        if (s.y < minY) {
          s.y = minY;
          s.vy = Math.abs(s.vy) * 0.3;
        } else if (s.y > maxY) {
          s.y = maxY;
          s.vy = -Math.abs(s.vy) * 0.3;
        }
        rem -= step;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (reduced) {
        place();
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    place();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(field);
    const ro = new ResizeObserver(() => {
      if (reduced) place();
    });
    ro.observe(field);
    const onMq = () => {
      reduced = mq.matches;
      if (reduced) {
        cancelAnimationFrame(raf);
        raf = 0;
        ghost.dataset.on = "false";
        place();
      } else wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function track(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = state.current;
    s.px = e.clientX - rect.left;
    s.py = e.clientY - rect.top;
    s.inside = true;
  }

  const vars = { "--hb-ql2-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-dodge-field" precedence="default">{css}</style>
      <div className={`hb-ql2 ${className}`} style={vars}>
        {label ? (
          <label className="hb-ql2-l" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <div
          ref={fieldRef}
          className="hb-ql2-f"
          data-focus={focused}
          onPointerEnter={track}
          onPointerMove={track}
          onPointerLeave={() => {
            state.current.inside = false;
            state.current.resumeAt = performance.now() + 1600;
            api.current.wake();
          }}
        >
          <span ref={dotRef} className="hb-ql2-d" aria-hidden="true" />
          <span ref={ghostRef} className="hb-ql2-g" data-on="false" aria-hidden="true" />
          <input
            {...rest}
            id={inputId}
            className="hb-ql2-i"
            onFocus={(e) => {
              onFocus?.(e);
              setFocused(true);
            }}
            onBlur={(e) => {
              onBlur?.(e);
              setFocused(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

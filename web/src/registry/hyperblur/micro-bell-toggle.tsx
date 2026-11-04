"use client";

import * as React from "react";

export interface MicroBellToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "children" | "role"> {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: number;
  accent?: string;
  label?: string;
  idle?: boolean;
  onChange?: (checked: boolean) => void;
}

const body =
  "M12 4.2c-3.4 0-5.6 2.5-5.6 5.8v2.6c0 1.5-.6 2.6-1.6 3.7-.4.5-.1 1.3.6 1.3h13.2c.7 0 1-.8.6-1.3-1-1.1-1.6-2.2-1.6-3.7V10c0-3.3-2.2-5.8-5.6-5.8z";

const css = `
.hb-ql9 {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: var(--hb-ql9-s);
  height: var(--hb-ql9-s);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #6f6f6f;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 28%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  --hb-ql9-c: #2f7bff;
  --hb-ql9-s: 48px;
}
.hb-ql9 *, .hb-ql9 *::before, .hb-ql9 *::after { box-sizing: border-box; }
.hb-ql9:hover { border-color: #3a3a3a; }
.hb-ql9:active { transform: scale(0.92); }
.hb-ql9:focus-visible { outline: 2px solid var(--hb-ql9-c); outline-offset: 4px; }
.hb-ql9:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ql9[aria-checked="true"] {
  color: #f2f2f2;
  border-color: color-mix(in srgb, var(--hb-ql9-c) 50%, #2a2a2a);
  background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--hb-ql9-c) 16%, #111111), #111111 70%);
}
.hb-ql9-v {
  display: block;
  width: 58%;
  height: 58%;
  overflow: visible;
}
.hb-ql9-a {
  fill: currentColor;
  transition: fill 0.3s ease;
}
.hb-ql9-w {
  fill: none;
  stroke: var(--hb-ql9-c);
  stroke-width: 1.5;
  stroke-linecap: round;
  opacity: 0;
}
.hb-ql9-d {
  position: absolute;
  right: 20%;
  top: 18%;
  width: 28%;
  height: 28%;
  background: var(--hb-ql9-c);
  border: 2px solid #111111;
  border-radius: 50%;
  box-shadow: 0 0 10px color-mix(in srgb, var(--hb-ql9-c) 80%, transparent);
  transform: scale(0);
  transition: transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);
}
.hb-ql9[aria-checked="true"] .hb-ql9-d { transform: scale(1); }
.hb-ql9-g {
  position: absolute;
  right: 20%;
  top: 18%;
  width: 28%;
  height: 28%;
  border: 2px solid var(--hb-ql9-c);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  animation: hb-ql9-ping 0.8s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
@keyframes hb-ql9-ping {
  0% { opacity: 0.9; transform: scale(1); }
  100% { opacity: 0; transform: scale(3); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ql9, .hb-ql9-a, .hb-ql9-d { transition: none; }
  .hb-ql9-g { animation: none; }
}
`;

export function MicroBellToggle({
  checked,
  defaultChecked = true,
  size = 48,
  accent = "#2f7bff",
  label = "Notifications",
  idle = true,
  disabled,
  onChange,
  className = "",
  style,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: MicroBellToggleProps) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const [ping, setPing] = React.useState(0);
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const bellRef = React.useRef<SVGGElement>(null);
  const clapRef = React.useRef<SVGGElement>(null);
  const leftRef = React.useRef<SVGPathElement>(null);
  const rightRef = React.useRef<SVGPathElement>(null);
  const state = React.useRef({
    th: 0,
    w: 0,
    ph: 0,
    pw: 0,
    hover: false,
    focus: false,
    resumeAt: 0,
    idleStart: -1,
    cyc: -1,
  });
  const api = React.useRef({ wake: () => {}, reduced: false });
  const latest = React.useRef({ on, idle });

  React.useEffect(() => {
    latest.current = { on, idle };
    api.current.wake();
  }, [on, idle]);

  React.useEffect(() => {
    const root = rootRef.current;
    const bell = bellRef.current;
    const clap = clapRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !bell || !clap || !left || !right) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = () => {
      bell.setAttribute("transform", `rotate(${s.th.toFixed(2)} 12 2.6)`);
      clap.setAttribute("transform", `rotate(${s.ph.toFixed(2)} 12 10.5)`);
      const amp = Math.min(1, Math.abs(s.th) / 14);
      const op = (amp * 0.9).toFixed(2);
      left.setAttribute("opacity", op);
      right.setAttribute("opacity", op);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const cfg = latest.current;
      const idleOn = cfg.idle && cfg.on && !s.hover && !s.focus && now >= s.resumeAt;
      if (idleOn) {
        if (s.idleStart < 0) s.idleStart = now;
        const cyc = Math.floor((now - s.idleStart - 1200) / 4400);
        if (cyc >= 0 && cyc !== s.cyc) {
          s.cyc = cyc;
          s.w += 460;
        }
      } else {
        s.idleStart = -1;
        s.cyc = -1;
      }
      let rem = dt;
      while (rem > 0) {
        const h = Math.min(rem, 1 / 120);
        s.w += (-220 * s.th - 2.8 * s.w) * h;
        s.th += s.w * h;
        const clapTarget = Math.max(-42, Math.min(42, -s.th * 1.5));
        s.pw += (300 * (clapTarget - s.ph) - 7 * s.pw) * h;
        s.ph += s.pw * h;
        rem -= h;
      }
      draw();
      const resting =
        Math.abs(s.th) < 0.02 && Math.abs(s.w) < 0.1 && Math.abs(s.ph) < 0.02 && Math.abs(s.pw) < 0.1;
      if (resting && !idleOn) {
        s.th = 0;
        s.w = 0;
        s.ph = 0;
        s.pw = 0;
        draw();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) return;
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    draw();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(root);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        s.th = 0;
        s.w = 0;
        s.ph = 0;
        s.pw = 0;
        draw();
      } else wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function kick(power: number) {
    if (api.current.reduced) return;
    state.current.w += power;
    api.current.wake();
  }

  const vars = {
    "--hb-ql9-c": accent,
    "--hb-ql9-s": `${size}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-bell-toggle" precedence="default">{css}</style>
      <button
        {...rest}
        ref={rootRef}
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        disabled={disabled}
        className={`hb-ql9 ${className}`}
        style={vars}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          const next = !on;
          if (checked === undefined) setInner(next);
          if (next) setPing((p) => p + 1);
          state.current.resumeAt = performance.now() + 2600;
          kick(next ? 620 : -170);
          onChange?.(next);
        }}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          state.current.hover = true;
          if (e.pointerType === "mouse" && on) kick(240);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          state.current.hover = false;
          state.current.resumeAt = performance.now() + 1800;
          api.current.wake();
        }}
        onFocus={(e) => {
          onFocus?.(e);
          state.current.focus = true;
        }}
        onBlur={(e) => {
          onBlur?.(e);
          state.current.focus = false;
          state.current.resumeAt = performance.now() + 1800;
          api.current.wake();
        }}
      >
        <svg className="hb-ql9-v" viewBox="0 0 24 24" aria-hidden="true">
          <path ref={leftRef} className="hb-ql9-w" d="M3.2 9.6c.3-2 1.2-3.8 2.6-5.1" opacity="0" />
          <path ref={rightRef} className="hb-ql9-w" d="M20.8 9.6c-.3-2-1.2-3.8-2.6-5.1" opacity="0" />
          <g ref={bellRef}>
            <circle className="hb-ql9-a" cx="12" cy="2.9" r="1.1" />
            <path className="hb-ql9-a" d={body} />
            <g ref={clapRef}>
              <circle className="hb-ql9-a" cx="12" cy="20" r="1.8" />
            </g>
          </g>
        </svg>
        <span className="hb-ql9-d" aria-hidden="true" />
        {ping > 0 ? <span key={ping} className="hb-ql9-g" aria-hidden="true" /> : null}
      </button>
    </>
  );
}

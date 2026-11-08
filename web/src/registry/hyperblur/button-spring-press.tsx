"use client";

import * as React from "react";

export interface ButtonSpringPressProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> {
  children?: React.ReactNode;
  shortcut?: string;
  variant?: "accent" | "dark" | "light";
  accent?: string;
  depth?: number;
  stiffness?: number;
  damping?: number;
  chargeTime?: number;
  onPress?: (strength: number) => void;
}

const css = `
.hb-xb3 {
  --hb-xb3-c: #2f7bff;
  --hb-xb3-face: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb3-c) 82%, #fff) 0%, var(--hb-xb3-c) 45%, color-mix(in srgb, var(--hb-xb3-c) 86%, #000) 100%);
  --hb-xb3-base: color-mix(in srgb, var(--hb-xb3-c) 45%, #000);
  --hb-xb3-fg: #ffffff;
  --hb-xb3-d: 6px;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0 0 var(--hb-xb3-d);
  border: 0;
  background: none;
  font: inherit;
  color: var(--hb-xb3-fg);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  border-radius: 14px;
}
.hb-xb3 *, .hb-xb3 *::before, .hb-xb3 *::after { box-sizing: border-box; }
.hb-xb3[data-variant="dark"] {
  --hb-xb3-face: linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 50%, #171717 100%);
  --hb-xb3-base: #050505;
  --hb-xb3-fg: #ededed;
}
.hb-xb3[data-variant="light"] {
  --hb-xb3-face: linear-gradient(180deg, #ffffff 0%, #f1f1f1 55%, #e2e2e2 100%);
  --hb-xb3-base: #9a9a9a;
  --hb-xb3-fg: #111111;
}
.hb-xb3-base {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: var(--hb-xb3-d);
  border-radius: 14px;
  background: var(--hb-xb3-base);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.9), 0 2px 0 rgba(0, 0, 0, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06);
}
.hb-xb3-glow {
  position: absolute;
  inset: auto 10% -10px;
  height: 18px;
  border-radius: 50%;
  background: var(--hb-xb3-c);
  filter: blur(14px);
  opacity: calc(var(--hb-xb3-q, 0) * 0.85);
  pointer-events: none;
}
.hb-xb3-face {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px 13px 20px;
  border-radius: 14px;
  background: var(--hb-xb3-face);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transform-origin: 50% 100%;
  transform: translateY(var(--hb-xb3-y, 0px)) scale(var(--hb-xb3-sx, 1), var(--hb-xb3-sy, 1));
  will-change: transform;
}
.hb-xb3[data-variant="dark"] .hb-xb3-face { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 0 1px #2e2e2e; }
.hb-xb3-face::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(80% 120% at 50% 120%, rgba(255, 255, 255, 0.35), transparent 60%);
  opacity: var(--hb-xb3-q, 0);
  pointer-events: none;
}
.hb-xb3-label { font-size: 15px; font-weight: 650; letter-spacing: -0.01em; white-space: nowrap; }
.hb-xb3-keys { display: inline-flex; gap: 3px; }
.hb-xb3-key {
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  display: inline-grid;
  place-items: center;
  border-radius: 6px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.18);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}
.hb-xb3[data-variant="light"] .hb-xb3-key { background: rgba(0, 0, 0, 0.06); box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(0, 0, 0, 0.08); }
.hb-xb3-meter { position: absolute; left: 14px; right: 14px; bottom: 5px; height: 2px; border-radius: 2px; background: rgba(255, 255, 255, 0.14); overflow: hidden; opacity: calc(var(--hb-xb3-q, 0) * 4); }
.hb-xb3-meter::before { content: ""; position: absolute; inset: 0; transform-origin: 0 50%; transform: scaleX(var(--hb-xb3-q, 0)); background: currentColor; }
.hb-xb3:focus-visible { outline: none; }
.hb-xb3:focus-visible .hb-xb3-face { outline: 2px solid var(--hb-xb3-c); outline-offset: 4px; }
.hb-xb3[data-variant="accent"]:focus-visible .hb-xb3-face { outline-color: #ffffff; }
.hb-xb3:disabled { cursor: not-allowed; opacity: 0.45; }
`;

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ButtonSpringPress({
  children = "Deploy",
  shortcut = "⌘ ↵",
  variant = "accent",
  accent = "#2f7bff",
  depth = 6,
  stiffness = 520,
  damping = 16,
  chargeTime = 700,
  onPress,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonSpringPressProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const sim = React.useRef({ x: 0, v: 0, target: 0, raf: 0, last: 0, down: 0, charge: 0 });
  const onPressRef = React.useRef(onPress);

  React.useEffect(() => {
    onPressRef.current = onPress;
  });

  const paint = React.useCallback(
    (x: number, q: number) => {
      const el = ref.current;
      if (!el) return;
      const y = Math.max(-0.35, x) * depth;
      const sx = 1 + x * 0.035;
      const sy = 1 - x * 0.05;
      el.style.setProperty("--hb-xb3-y", `${y.toFixed(2)}px`);
      el.style.setProperty("--hb-xb3-sx", sx.toFixed(4));
      el.style.setProperty("--hb-xb3-sy", sy.toFixed(4));
      el.style.setProperty("--hb-xb3-q", q.toFixed(3));
    },
    [depth],
  );

  const kick = () => {
    const sm = sim.current;
    if (sm.raf) return;
    sm.last = 0;
    function loop(now: number) {
      const s = sim.current;
      const dt = Math.min(0.032, s.last ? (now - s.last) / 1000 : 0.016);
      s.last = now;
      if (s.down) s.charge = Math.min(1, (now - s.down) / chargeTime);
      const target = s.target * (1 + s.charge * 0.25);
      const a = -stiffness * (s.x - target) - damping * s.v;
      s.v += a * dt;
      s.x += s.v * dt;
      paint(s.x, s.down ? s.charge : Math.max(0, s.charge * Math.min(1, s.x * 1.5)));
      if (!s.down && Math.abs(s.x) < 0.001 && Math.abs(s.v) < 0.01) {
        s.x = 0;
        s.v = 0;
        s.charge = 0;
        paint(0, 0);
        s.raf = 0;
        return;
      }
      s.raf = requestAnimationFrame(loop);
    }
    sm.raf = requestAnimationFrame(loop);
  };

  React.useEffect(() => {
    const s = sim.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const press = () => {
    if (disabled) return;
    const s = sim.current;
    if (s.down) return;
    s.down = performance.now();
    s.charge = 0;
    s.target = 1;
    if (reduced()) {
      paint(1, 0);
      return;
    }
    kick();
  };

  const release = (fire: boolean) => {
    const s = sim.current;
    if (!s.down) return;
    const strength = Math.min(1, (performance.now() - s.down) / chargeTime);
    s.down = 0;
    s.target = 0;
    if (reduced()) {
      s.charge = 0;
      paint(0, 0);
    } else {
      s.v -= 6 + strength * 10;
      kick();
    }
    if (fire) onPressRef.current?.(strength);
  };

  const keys = shortcut ? shortcut.split(" ").filter(Boolean) : [];

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`hb-xb3 ${className}`.trim()}
      data-variant={variant}
      style={{ "--hb-xb3-c": accent, "--hb-xb3-d": `${depth}px`, ...style } as React.CSSProperties}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        press();
      }}
      onPointerUp={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        release(inside);
      }}
      onPointerCancel={() => release(false)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (!e.repeat) press();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          release(true);
        }
      }}
      onBlur={() => release(false)}
      onClick={(e) => {
        if (e.detail === 0 && !sim.current.down) {
          press();
          window.setTimeout(() => release(true), 90);
        }
      }}
      {...rest}
    >
      <style href="hb-button-spring-press" precedence="default">{css}</style>
      <span className="hb-xb3-glow" aria-hidden="true" />
      <span className="hb-xb3-base" aria-hidden="true" />
      <span className="hb-xb3-face">
        <span className="hb-xb3-label">{children}</span>
        {keys.length > 0 && (
          <span className="hb-xb3-keys" aria-hidden="true">
            {keys.map((k, i) => (
              <kbd key={i} className="hb-xb3-key">{k}</kbd>
            ))}
          </span>
        )}
        <span className="hb-xb3-meter" aria-hidden="true" />
      </span>
    </button>
  );
}

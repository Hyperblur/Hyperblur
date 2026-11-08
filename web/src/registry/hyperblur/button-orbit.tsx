"use client";

import * as React from "react";

export interface ButtonOrbitProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  particles?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa5 {
  --hb-xa5-c: #ffc857;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #ededed;
  background: transparent;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-xa5 *, .hb-xa5 *::before, .hb-xa5 *::after { box-sizing: border-box; }
.hb-xa5[data-size="sm"] { font-size: 13px; }
.hb-xa5[data-size="lg"] { font-size: 17px; }
.hb-xa5:focus-visible { outline: none; }
.hb-xa5:focus-visible .hb-xa5-face { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-xa5-c); }
.hb-xa5:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa5-face {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.9em 1.5em;
  border-radius: inherit;
  white-space: nowrap;
  background:
    radial-gradient(120% 140% at 50% 120%, color-mix(in srgb, var(--hb-xa5-c) 22%, transparent), transparent 60%),
    linear-gradient(180deg, #1d1b17, #12110f);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px color-mix(in srgb, var(--hb-xa5-c) 22%, #2a2a2a),
    0 14px 30px -18px color-mix(in srgb, var(--hb-xa5-c) 60%, transparent);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
}
.hb-xa5:hover:not(:disabled) .hb-xa5-face {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 0 1px color-mix(in srgb, var(--hb-xa5-c) 45%, #2a2a2a),
    0 16px 36px -16px color-mix(in srgb, var(--hb-xa5-c) 75%, transparent);
}
.hb-xa5:active:not(:disabled) .hb-xa5-face { transform: scale(0.96); }
.hb-xa5-ico { width: 1.1em; height: 1.1em; color: var(--hb-xa5-c); flex: none; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xa5:hover:not(:disabled) .hb-xa5-ico { transform: translate(1px, -1px) rotate(-8deg); }
.hb-xa5-orb {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-xa5-s);
  height: var(--hb-xa5-s);
  margin: calc(var(--hb-xa5-s) / -2) 0 0 calc(var(--hb-xa5-s) / -2);
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, #fff 0%, var(--hb-xa5-c) 45%, color-mix(in srgb, var(--hb-xa5-c) 0%, transparent) 72%);
  will-change: transform, opacity;
  z-index: 1;
}
.hb-xa5-orb[data-front="true"] { z-index: 3; }
`;

function hash(n: number) {
  let h = Math.imul(n + 3, 2654435761);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function Rocket() {
  return (
    <svg className="hb-xa5-ico" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11.8 3.2c2.3-.6 4.3-.5 5 .1.6.7.7 2.7.1 5-.6 2.4-2.2 4.6-4.6 6.2l-.6 2.7-2.6-1.5-2.8-2.8-1.5-2.6 2.7-.6c1.6-2.4 3.8-4 6.3-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12.6" cy="7.4" r="1.4" fill="currentColor" />
      <path d="M5.2 12.6c-1.3.4-2 1.9-2 3.9 2 0 3.5-.7 3.9-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ButtonOrbit({
  children = "Launch project",
  accent = "#ffc857",
  particles = 12,
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  style,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ButtonOrbitProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const orbs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const ctl = React.useRef({ hot: false, burst: 0, kick: () => {} });
  const n = Math.max(0, Math.min(24, Math.round(particles)));

  const seeds = React.useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        ring: i % 2,
        phase: (i / Math.max(1, n)) * Math.PI * 2 + hash(i) * 0.6,
        speed: 0.7 + hash(i + 20) * 0.6,
        rad: 1 + (hash(i + 40) - 0.5) * 0.16,
        size: 4 + hash(i + 60) * 5,
      })),
    [n],
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = ctl.current;
    let raf = 0;
    let last = 0;
    let t = 0;
    let rate = 0.35;
    let spread = 0;
    let visible = true;

    function draw() {
      const w = el!.offsetWidth;
      const h = el!.offsetHeight;
      const rx = w / 2 + 18;
      const ry = h / 2 + 10;
      for (let i = 0; i < seeds.length; i++) {
        const node = orbs.current[i];
        if (!node) continue;
        const s = seeds[i];
        const tilt = s.ring ? -0.22 : 0.18;
        const a = s.phase + t * s.speed * (s.ring ? -1 : 1);
        const ex = Math.cos(a) * rx * s.rad * (1 + spread * 1.6);
        const ey = Math.sin(a) * ry * 0.55 * s.rad * (1 + spread * 2.4);
        const x = ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const y = ex * Math.sin(tilt) + ey * Math.cos(tilt);
        const depth = Math.sin(a) * (s.ring ? -1 : 1);
        const sc = (0.7 + depth * 0.3) * (1 - spread * 0.4);
        const op = Math.max(0, (0.55 + depth * 0.45) * (1 - spread * 0.9));
        node.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${sc.toFixed(3)})`;
        node.style.opacity = op.toFixed(3);
        node.dataset.front = depth > 0 ? "true" : "false";
        node.style.setProperty("--hb-xa5-s", `${s.size.toFixed(1)}px`);
      }
    }

    function step(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      const target = state.hot ? 2.4 : 0.45;
      rate += (target - rate) * Math.min(1, dt * 4);
      if (state.burst > 0) {
        state.burst = Math.max(0, state.burst - dt * 1.5);
        const b = state.burst;
        spread = b > 0.5 ? (1 - b) * 2 : b * 2;
      } else spread = 0;
      t += dt * rate;
      draw();
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (mq.matches) {
        spread = 0;
        draw();
        return;
      }
      last = 0;
      if (!raf && visible) raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);
    const onMq = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      start();
    };
    mq.addEventListener("change", onMq);
    state.kick = start;
    draw();
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, [seeds]);

  function heat(v: boolean) {
    ctl.current.hot = v;
    ctl.current.kick();
  }

  const vars = { "--hb-xa5-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-orbit" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-xa5 ${className}`}
        style={vars}
        data-size={size}
        disabled={disabled}
        onClick={(e) => {
          ctl.current.burst = 1;
          ctl.current.kick();
          onClick?.(e);
        }}
        onPointerEnter={(e) => {
          heat(true);
          onPointerEnter?.(e);
        }}
        onPointerLeave={(e) => {
          heat(false);
          onPointerLeave?.(e);
        }}
        onFocus={(e) => {
          heat(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          heat(false);
          onBlur?.(e);
        }}
        {...rest}
      >
        {seeds.map((s, i) => (
          <span
            className="hb-xa5-orb"
            key={i}
            aria-hidden="true"
            ref={(node) => {
              orbs.current[i] = node;
            }}
            style={{ "--hb-xa5-s": `${s.size.toFixed(1)}px`, opacity: 0 } as React.CSSProperties}
          />
        ))}
        <span className="hb-xa5-face">
          <Rocket />
          {children}
        </span>
      </button>
    </>
  );
}

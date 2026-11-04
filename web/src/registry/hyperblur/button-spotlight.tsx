"use client";

import * as React from "react";

export interface ButtonSpotlightProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "outline";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const css = `
.hb-qa1 {
  --hb-qa1-c: #2f7bff;
  --hb-qa1-x: 50%;
  --hb-qa1-y: 50%;
  --hb-qa1-i: 0.55;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.6em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: #ededed;
  background: #141414;
  border: 0;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px #262626;
  cursor: pointer;
  isolation: isolate;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease;
}
.hb-qa1[data-size="sm"] { font-size: 13px; }
.hb-qa1[data-size="lg"] { font-size: 17px; }
.hb-qa1[data-variant="outline"] { background: transparent; box-shadow: inset 0 0 0 1px #333; }
.hb-qa1-glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--hb-qa1-i);
  background: radial-gradient(150px circle at var(--hb-qa1-x) var(--hb-qa1-y), color-mix(in srgb, var(--hb-qa1-c) 42%, transparent), transparent 72%);
}
.hb-qa1-edge {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 1px;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--hb-qa1-i);
  background: radial-gradient(110px circle at var(--hb-qa1-x) var(--hb-qa1-y), color-mix(in srgb, var(--hb-qa1-c) 35%, #ffffff), transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-qa1-t { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 0.6em; white-space: nowrap; }
.hb-qa1:active:not(:disabled) { transform: scale(0.97); }
.hb-qa1:focus-visible { outline: 2px solid var(--hb-qa1-c); outline-offset: 3px; }
.hb-qa1:disabled { cursor: not-allowed; }
.hb-qa1:disabled:not([aria-busy="true"]) { opacity: 0.45; }
.hb-qa1-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa1-spin 0.7s linear infinite;
}
@keyframes hb-qa1-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qa1 { transition: none; }
  .hb-qa1:active:not(:disabled) { transform: none; }
  .hb-qa1-sp { animation-duration: 1.6s; }
}
`;

export function ButtonSpotlight({
  children = "Start building",
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ButtonSpotlightProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const live = React.useRef({ active: false, px: 0.5, py: 0.5, reduce: false });
  const kickRef = React.useRef<() => void>(() => {});
  const inert = disabled || loading;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = live.current;
    state.reduce = mq.matches;
    let cx = 0.5;
    let cy = 0.5;
    let ci = 0.55;
    let raf = 0;
    let visible = true;

    function apply() {
      el!.style.setProperty("--hb-qa1-x", `${(cx * 100).toFixed(1)}%`);
      el!.style.setProperty("--hb-qa1-y", `${(cy * 100).toFixed(1)}%`);
      el!.style.setProperty("--hb-qa1-i", ci.toFixed(3));
    }

    function step(now: number) {
      raf = 0;
      if (!visible) return;
      const u = now / 1000;
      const tx = state.active ? state.px : 0.5 + 0.36 * Math.sin(u * 0.85);
      const ty = state.active ? state.py : 0.5 + 0.22 * Math.sin(u * 1.35 + 1);
      const ti = state.active ? 1 : 0.6;
      const k = state.active ? 0.22 : 0.06;
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      ci += (ti - ci) * 0.1;
      apply();
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (state.reduce) {
        cx = state.px;
        cy = state.py;
        ci = state.active ? 1 : 0.55;
        apply();
        return;
      }
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
      state.reduce = mq.matches;
      cancelAnimationFrame(raf);
      raf = 0;
      start();
    };
    mq.addEventListener("change", onMq);
    kickRef.current = start;
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function kick() {
    kickRef.current();
  }

  function track(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const state = live.current;
    state.px = rect.width ? Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)) : 0.5;
    state.py = rect.height ? Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)) : 0.5;
    state.active = true;
    kick();
  }

  function release() {
    const state = live.current;
    state.active = false;
    state.px = 0.5;
    state.py = 0.5;
    kick();
  }

  const vars = { "--hb-qa1-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-spotlight" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-qa1 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={inert}
        aria-busy={loading || undefined}
        onPointerEnter={(e) => {
          track(e);
          onPointerEnter?.(e);
        }}
        onPointerMove={(e) => {
          track(e);
          onPointerMove?.(e);
        }}
        onPointerLeave={(e) => {
          release();
          onPointerLeave?.(e);
        }}
        onFocus={(e) => {
          if (e.currentTarget.matches(":focus-visible")) {
            live.current.active = true;
            live.current.px = 0.5;
            live.current.py = 0.5;
            kick();
          }
          onFocus?.(e);
        }}
        onBlur={(e) => {
          release();
          onBlur?.(e);
        }}
        {...rest}
      >
        <span className="hb-qa1-glow" aria-hidden="true" />
        <span className="hb-qa1-edge" aria-hidden="true" />
        <span className="hb-qa1-t">
          {loading ? <span className="hb-qa1-sp" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}

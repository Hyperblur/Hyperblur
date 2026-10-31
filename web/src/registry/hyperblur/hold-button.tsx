"use client";

import * as React from "react";

export interface HoldButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> {
  children: React.ReactNode;
  onConfirm: () => void;
  duration?: number;
  color?: string;
  confirmedLabel?: string;
  disabled?: boolean;
}

const css = `
.hb-hold {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  margin: 0;
  padding: 0.75em 1.6em;
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease;
}
.hb-hold:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-hold:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-hold:not(:disabled):active { transform: scale(0.97); }
.hb-hold-f {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--hb-c) 78%, transparent);
  transform: scaleX(var(--hb-p, 0));
  transform-origin: left center;
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-hold[data-holding="true"] .hb-hold-f { transition: none; }
.hb-hold-l { display: grid; place-items: center; }
.hb-hold-a, .hb-hold-b { grid-area: 1 / 1; white-space: nowrap; }
.hb-hold-b { visibility: hidden; }
.hb-hold[data-done="true"] { border-color: var(--hb-c); animation: hb-hold-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-hold[data-done="true"] .hb-hold-a { visibility: hidden; }
.hb-hold[data-done="true"] .hb-hold-b { visibility: visible; }
.hb-hold-sr {
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
@keyframes hb-hold-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.06); }
  100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hold, .hb-hold-f { transition: none; }
  .hb-hold[data-done="true"] { animation: none; }
  .hb-hold:not(:disabled):active { transform: none; }
}
`;

export function HoldButton({
  children,
  onConfirm,
  duration = 1200,
  color = "#2f7bff",
  confirmedLabel = "Done",
  disabled = false,
  type = "button",
  className = "",
  style,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  onContextMenu,
  "aria-describedby": describedBy,
  ...rest
}: HoldButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const raf = React.useRef(0);
  const timer = React.useRef(0);
  const holding = React.useRef(false);
  const latest = React.useRef(onConfirm);
  const hintId = React.useId();
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    latest.current = onConfirm;
  }, [onConfirm]);

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    if (!disabled) return;
    holding.current = false;
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.dataset.holding = "false";
    el.style.setProperty("--hb-p", "0");
  }, [disabled]);

  function finish() {
    holding.current = false;
    const el = ref.current;
    if (el) {
      el.dataset.holding = "false";
      el.style.setProperty("--hb-p", "1");
    }
    setDone(true);
    latest.current();
    timer.current = window.setTimeout(() => {
      setDone(false);
      ref.current?.style.setProperty("--hb-p", "0");
    }, 1400);
  }

  function start() {
    const el = ref.current;
    if (!el || disabled || done || holding.current) return;
    holding.current = true;
    el.dataset.holding = "true";
    const t0 = performance.now();
    const total = Math.max(1, duration);
    function tick(now: number) {
      if (!holding.current || !el) return;
      const p = Math.min(1, Math.max(0, (now - t0) / total));
      el.style.setProperty("--hb-p", p.toFixed(4));
      if (p >= 1) return finish();
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
  }

  function stop() {
    if (!holding.current) return;
    holding.current = false;
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.dataset.holding = "false";
    el.style.setProperty("--hb-p", "0");
  }

  const vars = { "--hb-c": color, ...style } as React.CSSProperties;
  const describedIds = describedBy ? `${describedBy} ${hintId}` : hintId;

  return (
    <>
      <style href="hb-hold-button" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-hold ${className}`}
        style={vars}
        disabled={disabled}
        data-done={done}
        aria-describedby={describedIds}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (e.button === 0) start();
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          stop();
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          stop();
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          stop();
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key !== " " && e.key !== "Enter") return;
          e.preventDefault();
          if (!e.repeat) start();
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          if (e.key !== " " && e.key !== "Enter") return;
          e.preventDefault();
          stop();
        }}
        onBlur={(e) => {
          onBlur?.(e);
          stop();
        }}
        onContextMenu={(e) => {
          onContextMenu?.(e);
          e.preventDefault();
        }}
        {...rest}
      >
        <span className="hb-hold-f" aria-hidden="true" />
        <span className="hb-hold-l">
          <span className="hb-hold-a">{children}</span>
          <span className="hb-hold-b">{confirmedLabel}</span>
        </span>
      </button>
      <span id={hintId} className="hb-hold-sr">
        Press and hold to confirm
      </span>
      <span className="hb-hold-sr" role="status" aria-live="polite">
        {done ? confirmedLabel : ""}
      </span>
    </>
  );
}

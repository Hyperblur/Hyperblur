"use client";

import * as React from "react";

export type ButtonStatefulStatus = "idle" | "loading" | "success";

export interface ButtonStatefulProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onClick"> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
  status?: ButtonStatefulStatus;
  loadingLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  duration?: number;
  resetAfter?: number;
  variant?: "solid" | "outline";
  accent?: string;
  successAccent?: string;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-qa7 {
  --hb-qa7-c: #2f7bff;
  --hb-qa7-ok: #22c55e;
  --hb-qa7-bg: var(--hb-qa7-c);
  --hb-qa7-fg: #ffffff;
  --hb-qa7-ring: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.6em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--hb-qa7-fg);
  background: var(--hb-qa7-bg);
  border: 0;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px var(--hb-qa7-ring);
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qa7[data-size="sm"] { font-size: 13px; }
.hb-qa7[data-size="lg"] { font-size: 17px; }
.hb-qa7[data-variant="outline"] {
  --hb-qa7-bg: transparent;
  --hb-qa7-fg: #ededed;
  --hb-qa7-ring: #333333;
}
.hb-qa7[data-status="loading"] { cursor: progress; }
.hb-qa7[data-status="success"] {
  --hb-qa7-bg: var(--hb-qa7-ok);
  --hb-qa7-fg: #04140a;
  --hb-qa7-ring: transparent;
  cursor: default;
}
.hb-qa7[data-variant="outline"][data-status="success"] {
  --hb-qa7-bg: color-mix(in srgb, var(--hb-qa7-ok) 14%, transparent);
  --hb-qa7-fg: var(--hb-qa7-ok);
  --hb-qa7-ring: color-mix(in srgb, var(--hb-qa7-ok) 55%, transparent);
}
.hb-qa7-c {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(0.7em) scale(0.94);
  filter: blur(3px);
  pointer-events: none;
  transition: opacity 0.28s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.28s ease;
}
.hb-qa7-c[data-first="true"] { position: relative; inset: auto; }
.hb-qa7-c[data-on="true"] { opacity: 1; transform: none; filter: none; }
.hb-qa7-c[data-on="false"][data-after="true"] { transform: translateY(-0.7em) scale(0.94); }
.hb-qa7-l { display: inline-flex; align-items: center; gap: 0.55em; white-space: nowrap; }
.hb-qa7-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa7-spin 0.7s linear infinite;
}
.hb-qa7-ck {
  width: 1.1em;
  height: 1.1em;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
}
.hb-qa7-c[data-on="true"] .hb-qa7-ck { animation: hb-qa7-draw 0.45s cubic-bezier(0.65, 0, 0.35, 1) 0.12s forwards; }
.hb-qa7:hover:not(:disabled) { filter: brightness(1.08); }
.hb-qa7:active:not(:disabled) { transform: scale(0.97); }
.hb-qa7:focus-visible { outline: 2px solid var(--hb-qa7-c); outline-offset: 3px; }
.hb-qa7:disabled:not([data-status="loading"]):not([data-status="success"]) { opacity: 0.45; cursor: not-allowed; }
@keyframes hb-qa7-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa7-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qa7, .hb-qa7-c { transition-duration: 0.01s; }
  .hb-qa7-c { filter: none; transform: none; }
  .hb-qa7-c[data-on="true"] .hb-qa7-ck { animation: none; stroke-dashoffset: 0; }
  .hb-qa7:active:not(:disabled) { transform: none; }
  .hb-qa7-sp { animation-duration: 1.6s; }
}
`;

function isThenable(value: unknown): value is PromiseLike<unknown> {
  return typeof value === "object" && value !== null && typeof (value as { then?: unknown }).then === "function";
}

export function ButtonStateful({
  children = "Save changes",
  loadingLabel = "Saving",
  successLabel = "Saved",
  status,
  duration = 1500,
  resetAfter = 1800,
  onClick,
  variant = "solid",
  accent = "#2f7bff",
  successAccent = "#22c55e",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonStatefulProps) {
  const [inner, setInner] = React.useState<ButtonStatefulStatus>("idle");
  const [width, setWidth] = React.useState<Record<ButtonStatefulStatus, number> | null>(null);
  const refs = React.useRef<Record<ButtonStatefulStatus, HTMLSpanElement | null>>({
    idle: null,
    loading: null,
    success: null,
  });
  const alive = React.useRef(true);
  const timers = React.useRef<number[]>([]);
  const controlled = status !== undefined;
  const current: ButtonStatefulStatus = controlled ? status : inner;

  React.useEffect(() => {
    alive.current = true;
    const pending = timers.current;
    return () => {
      alive.current = false;
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  React.useLayoutEffect(() => {
    const nodes = refs.current;
    function measure() {
      const next = {
        idle: nodes.idle?.offsetWidth ?? 0,
        loading: nodes.loading?.offsetWidth ?? 0,
        success: nodes.success?.offsetWidth ?? 0,
      };
      setWidth((prev) =>
        prev && prev.idle === next.idle && prev.loading === next.loading && prev.success === next.success ? prev : next,
      );
    }
    measure();
    const ro = new ResizeObserver(measure);
    (Object.values(nodes) as (HTMLSpanElement | null)[]).forEach((n) => n && ro.observe(n));
    return () => ro.disconnect();
  }, [children, loadingLabel, successLabel, size]);

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function succeed() {
    if (!alive.current) return;
    setInner("success");
    later(() => alive.current && setInner("idle"), resetAfter);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (current !== "idle" || disabled) return;
    const result = onClick?.(e);
    if (controlled) return;
    setInner("loading");
    if (isThenable(result)) {
      result.then(succeed, () => alive.current && setInner("idle"));
    } else {
      later(succeed, Math.max(0, duration));
    }
  }

  const vars = {
    "--hb-qa7-c": accent,
    "--hb-qa7-ok": successAccent,
    ...(width ? { width: `calc(${width[current]}px + 3.2em)` } : null),
    ...style,
  } as React.CSSProperties;

  const order: ButtonStatefulStatus[] = ["idle", "loading", "success"];
  const labels: Record<ButtonStatefulStatus, React.ReactNode> = {
    idle: children,
    loading: (
      <>
        <span className="hb-qa7-sp" aria-hidden="true" />
        {loadingLabel}
      </>
    ),
    success: (
      <>
        <svg className="hb-qa7-ck" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        {successLabel}
      </>
    ),
  };

  return (
    <>
      <style href="hb-button-stateful" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa7 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-status={current}
        disabled={disabled || current !== "idle"}
        aria-busy={current === "loading" || undefined}
        aria-live="polite"
        onClick={handleClick}
        {...rest}
      >
        {order.map((key) => (
          <span
            key={key}
            className="hb-qa7-c"
            data-first={key === "idle" ? "true" : undefined}
            data-on={current === key ? "true" : "false"}
            data-after={order.indexOf(key) < order.indexOf(current) ? "true" : undefined}
            aria-hidden={current === key ? undefined : true}
          >
            <span
              className="hb-qa7-l"
              ref={(node) => {
                refs.current[key] = node;
              }}
            >
              {labels[key]}
            </span>
          </span>
        ))}
      </button>
    </>
  );
}

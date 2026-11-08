"use client";

import * as React from "react";

export type ButtonSubmitMorphStatus = "idle" | "loading" | "success" | "error";

export interface ButtonSubmitMorphProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSubmit" | "children"> {
  children?: React.ReactNode;
  successLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  status?: ButtonSubmitMorphStatus;
  onSubmit?: () => unknown;
  outcome?: "success" | "error";
  duration?: number;
  resetAfter?: number;
  accent?: string;
  successColor?: string;
  errorColor?: string;
}

const css = `
.hb-xb4 {
  --hb-xb4-c: #2f7bff;
  --hb-xb4-ok: #1fb866;
  --hb-xb4-err: #f04452;
  --hb-xb4-bg: var(--hb-xb4-c);
  --hb-xb4-h: 46px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: var(--hb-xb4-h);
  min-width: var(--hb-xb4-h);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb4-bg) 88%, #fff) 0%, var(--hb-xb4-bg) 60%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 0 1px color-mix(in srgb, var(--hb-xb4-bg) 70%, #000), 0 8px 20px -10px var(--hb-xb4-bg);
  cursor: pointer;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  transition: width 0.55s cubic-bezier(0.7, 0, 0.2, 1), border-radius 0.45s cubic-bezier(0.7, 0, 0.2, 1), background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease;
}
.hb-xb4 *, .hb-xb4 *::before, .hb-xb4 *::after { box-sizing: border-box; }
.hb-xb4[data-state="loading"] { border-radius: 999px; cursor: progress; --hb-xb4-bg: #1b1b1b; box-shadow: inset 0 0 0 1px #2a2a2a, 0 8px 20px -12px rgba(0, 0, 0, 0.9); }
.hb-xb4[data-state="success"] { --hb-xb4-bg: var(--hb-xb4-ok); border-radius: 999px; cursor: default; }
.hb-xb4[data-state="error"] { --hb-xb4-bg: var(--hb-xb4-err); animation: hb-xb4-shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xb4:hover[data-state="idle"]:not(:disabled) { filter: brightness(1.07); }
.hb-xb4:active[data-state="idle"]:not(:disabled) { transform: scale(0.97); }
.hb-xb4:focus-visible { outline: 2px solid var(--hb-xb4-c); outline-offset: 3px; }
.hb-xb4:disabled[data-state="idle"] { opacity: 0.45; cursor: not-allowed; }
.hb-xb4-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  opacity: 0;
  transform: scale(0.85);
  filter: blur(4px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease;
}
.hb-xb4[data-state="idle"] .hb-xb4-layer[data-for="idle"],
.hb-xb4[data-state="loading"] .hb-xb4-layer[data-for="loading"],
.hb-xb4[data-state="success"] .hb-xb4-layer[data-for="success"],
.hb-xb4[data-state="error"] .hb-xb4-layer[data-for="error"] { opacity: 1; transform: none; filter: none; transition-delay: 0.18s; }
.hb-xb4[data-state="idle"] .hb-xb4-layer[data-for="idle"] { transition-delay: 0.12s; }
.hb-xb4-layer svg { width: 18px; height: 18px; flex: none; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb4-spin { width: 24px !important; height: 24px !important; animation: hb-xb4-rot 0.9s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite; }
.hb-xb4-spin circle:first-child { stroke: #333; stroke-width: 2.6; }
.hb-xb4-spin circle:last-child { stroke: var(--hb-xb4-c); stroke-width: 2.6; stroke-dasharray: 18 60; animation: hb-xb4-arc 1.4s ease-in-out infinite; }
.hb-xb4-draw { stroke-dasharray: 24; stroke-dashoffset: 24; }
.hb-xb4[data-state="success"] .hb-xb4-draw, .hb-xb4[data-state="error"] .hb-xb4-draw { animation: hb-xb4-draw 0.45s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards; }
.hb-xb4-burst { position: absolute; inset: -1px; border-radius: inherit; border: 2px solid var(--hb-xb4-ok); opacity: 0; pointer-events: none; }
.hb-xb4[data-state="success"] .hb-xb4-burst { animation: hb-xb4-burst 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s; }
.hb-xb4-ghost { position: absolute; left: 0; top: 0; visibility: hidden; pointer-events: none; display: flex; flex-direction: column; align-items: flex-start; }
.hb-xb4-ghost > span { display: inline-flex; gap: 8px; align-items: center; white-space: nowrap; padding: 0 24px; font-size: 15px; font-weight: 600; }
.hb-xb4-ghost svg { width: 18px; height: 18px; }
@keyframes hb-xb4-rot { to { transform: rotate(360deg); } }
@keyframes hb-xb4-arc { 0%, 100% { stroke-dasharray: 10 60; } 50% { stroke-dasharray: 36 60; } }
@keyframes hb-xb4-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xb4-burst { 0% { opacity: 0.8; transform: scale(1); } 100% { opacity: 0; transform: scale(1.25, 1.6); } }
@keyframes hb-xb4-shake { 10%, 90% { translate: -1px 0; } 20%, 80% { translate: 3px 0; } 30%, 50%, 70% { translate: -5px 0; } 40%, 60% { translate: 5px 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb4, .hb-xb4-layer { transition-duration: 0.01s !important; transition-delay: 0s !important; }
  .hb-xb4-layer { filter: none; transform: none; }
  .hb-xb4[data-state="error"], .hb-xb4-burst { animation: none !important; }
  .hb-xb4[data-state="success"] .hb-xb4-draw, .hb-xb4[data-state="error"] .hb-xb4-draw { animation: none; stroke-dashoffset: 0; }
  .hb-xb4-spin, .hb-xb4-spin circle:last-child { animation-duration: 2.4s; }
}
`;

function isThenable(v: unknown): v is PromiseLike<unknown> {
  return typeof v === "object" && v !== null && typeof (v as { then?: unknown }).then === "function";
}

const checkIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path className="hb-xb4-draw" d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const errIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path className="hb-xb4-draw" d="M12 7v6M12 17h.01" />
  </svg>
);

export function ButtonSubmitMorph({
  children = "Create account",
  successLabel = "Account created",
  errorLabel = "Try again",
  status,
  onSubmit,
  outcome = "success",
  duration = 1600,
  resetAfter = 2200,
  accent = "#2f7bff",
  successColor = "#1fb866",
  errorColor = "#f04452",
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonSubmitMorphProps) {
  const [inner, setInner] = React.useState<ButtonSubmitMorphStatus>("idle");
  const [widths, setWidths] = React.useState<Record<"idle" | "success" | "error", number> | null>(null);
  const ghost = React.useRef<HTMLSpanElement>(null);
  const timers = React.useRef<number[]>([]);
  const alive = React.useRef(true);
  const current = status ?? inner;

  React.useEffect(() => {
    alive.current = true;
    const list = timers.current;
    const el = ghost.current;
    let ro: ResizeObserver | null = null;
    if (el) {
      const read = () => {
        const [a, b, c] = Array.from(el.children) as HTMLElement[];
        setWidths({ idle: a.offsetWidth, success: b.offsetWidth, error: c.offsetWidth });
      };
      ro = new ResizeObserver(read);
      ro.observe(el);
    }
    return () => {
      alive.current = false;
      ro?.disconnect();
      list.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const finish = (result: "success" | "error") => {
    if (!alive.current) return;
    setInner(result);
    timers.current.push(window.setTimeout(() => alive.current && setInner("idle"), resetAfter));
  };

  const handle = () => {
    if (disabled || current !== "idle") return;
    setInner("loading");
    const started = performance.now();
    const settle = (result: "success" | "error") => {
      const wait = Math.max(0, 700 - (performance.now() - started));
      timers.current.push(window.setTimeout(() => finish(result), wait));
    };
    let result: unknown;
    try {
      result = onSubmit?.();
    } catch {
      settle("error");
      return;
    }
    if (isThenable(result)) {
      result.then(
        () => settle("success"),
        () => settle("error"),
      );
    } else {
      timers.current.push(window.setTimeout(() => finish(outcome), duration));
    }
  };

  const h = 46;
  const w = widths ? (current === "loading" ? h : widths[current]) : undefined;
  const live = current === "loading" ? "Submitting" : current === "success" ? successLabel : current === "error" ? errorLabel : "";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={current === "loading" || undefined}
      className={`hb-xb4 ${className}`.trim()}
      data-state={current}
      style={
        {
          "--hb-xb4-c": accent,
          "--hb-xb4-ok": successColor,
          "--hb-xb4-err": errorColor,
          width: w !== undefined ? `${w}px` : undefined,
          ...style,
        } as React.CSSProperties
      }
      onClick={handle}
      {...rest}
    >
      <style href="hb-button-submit-morph" precedence="default">{css}</style>
      <span className="hb-xb4-ghost" ref={ghost} aria-hidden="true">
        <span>{children}</span>
        <span>
          <svg viewBox="0 0 24 24" />
          {successLabel}
        </span>
        <span>
          <svg viewBox="0 0 24 24" />
          {errorLabel}
        </span>
      </span>
      {widths === null && <span style={{ padding: "0 24px", visibility: "hidden", whiteSpace: "nowrap" }} aria-hidden="true">{children}</span>}
      <span className="hb-xb4-layer" data-for="idle" aria-hidden={current !== "idle"}>{children}</span>
      <span className="hb-xb4-layer" data-for="loading" aria-hidden="true">
        <svg className="hb-xb4-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
      <span className="hb-xb4-layer" data-for="success" aria-hidden={current !== "success"}>
        {checkIcon}
        {successLabel}
      </span>
      <span className="hb-xb4-layer" data-for="error" aria-hidden={current !== "error"}>
        {errIcon}
        {errorLabel}
      </span>
      <span className="hb-xb4-burst" aria-hidden="true" />
      <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {live}
      </span>
    </button>
  );
}

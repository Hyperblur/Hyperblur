"use client";

import * as React from "react";

export type ButtonDotsMorphStatus = "idle" | "loading" | "done";

export interface ButtonDotsMorphProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> {
  children?: string;
  loadingLabel?: string;
  doneLabel?: string;
  status?: ButtonDotsMorphStatus;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
  duration?: number;
  resetAfter?: number;
  variant?: "light" | "accent" | "dark";
  accent?: string;
}

const css = `
.hb-xb5 {
  --hb-xb5-c: #2f7bff;
  --hb-xb5-bg: #f4f4f5;
  --hb-xb5-fg: #0b0b0c;
  --hb-xb5-ok: #16a34a;
  position: relative;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0 22px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--hb-xb5-fg);
  background: var(--hb-xb5-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -2px 0 rgba(0, 0, 0, 0.08), 0 10px 24px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.04);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, color 0.4s ease, box-shadow 0.3s ease;
}
.hb-xb5 *, .hb-xb5 *::before, .hb-xb5 *::after { box-sizing: border-box; }
.hb-xb5[data-variant="accent"] { --hb-xb5-bg: var(--hb-xb5-c); --hb-xb5-fg: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 10px 24px -12px var(--hb-xb5-c); }
.hb-xb5[data-variant="dark"] { --hb-xb5-bg: #1a1a1a; --hb-xb5-fg: #ededed; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #2c2c2c, 0 10px 24px -12px rgba(0, 0, 0, 0.9); }
.hb-xb5:hover[data-state="idle"]:not(:disabled) { transform: translateY(-1px); }
.hb-xb5:active[data-state="idle"]:not(:disabled) { transform: scale(0.96); }
.hb-xb5[data-state="loading"] { cursor: progress; }
.hb-xb5[data-state="done"] { cursor: default; }
.hb-xb5:focus-visible { outline: 2px solid var(--hb-xb5-c); outline-offset: 3px; }
.hb-xb5:disabled[data-state="idle"] { opacity: 0.45; cursor: not-allowed; }
.hb-xb5-row { grid-area: 1 / 1; display: inline-flex; align-items: center; white-space: pre; pointer-events: none; }
.hb-xb5-ch {
  display: inline-block;
  transition: transform 0.42s cubic-bezier(0.55, 0, 0.3, 1) var(--hb-xb5-dl, 0s), opacity 0.3s ease var(--hb-xb5-dl, 0s), filter 0.3s ease var(--hb-xb5-dl, 0s);
}
.hb-xb5-row[data-on="false"] .hb-xb5-ch { transform: translateX(calc(var(--hb-xb5-o) * -0.62em)) translateY(0.1em) scale(0.15); opacity: 0; filter: blur(2px); }
.hb-xb5-row[data-kind="done"] .hb-xb5-ch { transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--hb-xb5-dl, 0s), opacity 0.3s ease var(--hb-xb5-dl, 0s); }
.hb-xb5-row[data-kind="done"][data-on="false"] .hb-xb5-ch { transform: translateY(0.7em) rotate(8deg); filter: none; }
.hb-xb5-ok {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--hb-xb5-ok);
  color: #fff;
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s;
}
.hb-xb5-row[data-kind="done"][data-on="true"] .hb-xb5-ok { transform: scale(1); }
.hb-xb5-ok svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb5-ok path { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.3s; }
.hb-xb5-row[data-kind="done"][data-on="true"] .hb-xb5-ok path { stroke-dashoffset: 0; }
.hb-xb5-dots { grid-area: 1 / 1; display: inline-flex; gap: 6px; pointer-events: none; }
.hb-xb5-dot { width: 7px; height: 7px; transform: scale(0); opacity: 0; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, translate 0.35s cubic-bezier(0.55, 0, 0.3, 1); }
.hb-xb5[data-state="loading"] .hb-xb5-dot { transform: scale(1); opacity: 1; transition-delay: 0.28s; }
.hb-xb5-dot > i { display: block; width: 100%; height: 100%; border-radius: 50%; background: currentColor; font-style: normal; }
.hb-xb5[data-state="loading"] .hb-xb5-dot > i { animation: hb-xb5-hop 0.9s cubic-bezier(0.45, 0, 0.55, 1) 0.5s infinite; }
.hb-xb5[data-state="loading"] .hb-xb5-dot:nth-child(2) > i { animation-delay: 0.62s; }
.hb-xb5[data-state="loading"] .hb-xb5-dot:nth-child(3) > i { animation-delay: 0.74s; }
.hb-xb5-dot:first-child { translate: 0 0; }
.hb-xb5[data-state="done"] .hb-xb5-dot { transform: scale(0.4); opacity: 0; }
.hb-xb5[data-state="done"] .hb-xb5-dot:first-child { translate: 13px 0; }
.hb-xb5[data-state="done"] .hb-xb5-dot:last-child { translate: -13px 0; }
@keyframes hb-xb5-hop { 0%, 60%, 100% { transform: translateY(0) scale(1, 1); } 20% { transform: translateY(-7px) scale(0.9, 1.1); } 40% { transform: translateY(0) scale(1.15, 0.85); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb5, .hb-xb5 * { transition-duration: 0.01s !important; transition-delay: 0s !important; }
  .hb-xb5-dot > i { animation: none !important; }
}
`;

function isThenable(v: unknown): v is PromiseLike<unknown> {
  return typeof v === "object" && v !== null && typeof (v as { then?: unknown }).then === "function";
}

function Letters({ text, on, kind }: { text: string; on: boolean; kind: "idle" | "done" }) {
  const chars = Array.from(text);
  const mid = (chars.length - 1) / 2;
  return (
    <span className="hb-xb5-row" data-on={on ? "true" : "false"} data-kind={kind} aria-hidden={!on}>
      {kind === "done" && (
        <span className="hb-xb5-ok">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
      )}
      {chars.map((ch, i) => {
        const o = i - mid;
        const delay = kind === "done" ? (on ? 0.12 + i * 0.025 : 0) : on ? Math.abs(o) * 0.022 + 0.05 : (mid - Math.abs(o)) * 0.018;
        return (
          <span key={i} className="hb-xb5-ch" style={{ "--hb-xb5-o": o.toFixed(2), "--hb-xb5-dl": `${delay.toFixed(3)}s` } as React.CSSProperties}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}

export function ButtonDotsMorph({
  children = "Publish story",
  loadingLabel = "Publishing",
  doneLabel = "Published",
  status,
  onClick,
  duration = 1700,
  resetAfter = 2000,
  variant = "light",
  accent = "#2f7bff",
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonDotsMorphProps) {
  const [inner, setInner] = React.useState<ButtonDotsMorphStatus>("idle");
  const timers = React.useRef<number[]>([]);
  const current = status ?? inner;

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const done = () => {
    setInner("done");
    timers.current.push(window.setTimeout(() => setInner("idle"), resetAfter));
  };

  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || current !== "idle") return;
    setInner("loading");
    const started = performance.now();
    const result = onClick?.(e);
    if (isThenable(result)) {
      const finish = () => timers.current.push(window.setTimeout(done, Math.max(0, 900 - (performance.now() - started))));
      result.then(finish, () => {
        timers.current.push(window.setTimeout(() => setInner("idle"), 300));
      });
    } else {
      timers.current.push(window.setTimeout(done, duration));
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={current === "loading" || undefined}
      aria-label={current === "loading" ? loadingLabel : current === "done" ? doneLabel : children}
      className={`hb-xb5 ${className}`.trim()}
      data-state={current}
      data-variant={variant}
      style={{ "--hb-xb5-c": accent, ...style } as React.CSSProperties}
      onClick={handle}
      {...rest}
    >
      <style href="hb-button-dots-morph" precedence="default">{css}</style>
      <Letters text={children} on={current === "idle"} kind="idle" />
      <Letters text={doneLabel} on={current === "done"} kind="done" />
      <span className="hb-xb5-dots" aria-hidden="true">
        <span className="hb-xb5-dot">
          <i />
        </span>
        <span className="hb-xb5-dot">
          <i />
        </span>
        <span className="hb-xb5-dot">
          <i />
        </span>
      </span>
      <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {current === "loading" ? loadingLabel : current === "done" ? doneLabel : ""}
      </span>
    </button>
  );
}

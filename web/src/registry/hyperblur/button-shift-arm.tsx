"use client";

import * as React from "react";

export interface ButtonShiftArmProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  armedLabel?: React.ReactNode;
  doneLabel?: React.ReactNode;
  hint?: React.ReactNode;
  touchFallback?: boolean;
  accent?: string;
  size?: "sm" | "md" | "lg";
  resetAfter?: number;
  onBlocked?: (attempts: number) => void;
  onConfirm?: () => void;
}

const css = `
.hb-xd8 {
  --hb-xd8-h: 2.75rem;
  --hb-xd8-fs: 0.875rem;
  --hb-xd8-amp: 3px;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--hb-xd8-fs);
}
.hb-xd8 *, .hb-xd8 *::before, .hb-xd8 *::after { box-sizing: border-box; }
.hb-xd8[data-size="sm"] { --hb-xd8-h: 2.25rem; --hb-xd8-fs: 0.8125rem; }
.hb-xd8[data-size="lg"] { --hb-xd8-h: 3.25rem; --hb-xd8-fs: 1rem; }
.hb-xd8-btn {
  position: relative;
  flex: 1 1 auto;
  display: grid;
  place-items: center;
  height: var(--hb-xd8-h);
  margin: 0;
  padding: 0 1.25em;
  overflow: hidden;
  font: inherit;
  font-weight: 600;
  white-space: nowrap;
  color: color-mix(in srgb, var(--hb-xd8-c) 50%, #fff);
  background: linear-gradient(180deg, #1b1b1b, #131313);
  border: 1px solid #2c2c2c;
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.5);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease, border-color 0.25s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.hb-xd8-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(-45deg, rgba(0,0,0,0.16) 0 6px, transparent 6px 12px),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-xd8-c) 92%, #fff), color-mix(in srgb, var(--hb-xd8-c) 82%, #000));
  background-size: 17px 17px, 100% 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.hb-xd8-btn:focus-visible { outline: 2px solid var(--hb-xd8-c); outline-offset: 3px; }
.hb-xd8-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd8[data-armed="true"] .hb-xd8-btn {
  color: #fff;
  border-color: color-mix(in srgb, var(--hb-xd8-c) 70%, #000);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 4px color-mix(in srgb, var(--hb-xd8-c) 18%, transparent), 0 10px 24px -10px var(--hb-xd8-c);
  transform: scale(1.03);
}
.hb-xd8[data-armed="true"] .hb-xd8-btn::before { opacity: 1; animation: hb-xd8-march 0.7s linear infinite; }
.hb-xd8[data-phase="done"] .hb-xd8-btn { color: #a1a1a1; cursor: default; }
.hb-xd8[data-shake="1"] .hb-xd8-btn { animation: hb-xd8-shake-a 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); border-color: color-mix(in srgb, var(--hb-xd8-c) 60%, #2c2c2c); }
.hb-xd8[data-shake="2"] .hb-xd8-btn { animation: hb-xd8-shake-b 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); border-color: color-mix(in srgb, var(--hb-xd8-c) 60%, #2c2c2c); }
.hb-xd8-lbl {
  position: relative;
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transition: opacity 0.18s ease, transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-xd8-lbl[data-on="false"] { opacity: 0; transform: translateY(70%); }
.hb-xd8-lbl[data-on="false"].hb-xd8-up { transform: translateY(-70%); }
.hb-xd8-tip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #ededed;
  white-space: nowrap;
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 10px 24px -8px rgba(0,0,0,0.9);
  opacity: 0;
  transform: translate(-50%, 6px) scale(0.95);
  transform-origin: 50% 100%;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd8-tip::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #1f1f1f;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  transform: rotate(45deg);
}
.hb-xd8[data-tip="true"] .hb-xd8-tip { opacity: 1; transform: translate(-50%, 0) scale(1); }
.hb-xd8-key {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.68rem;
  color: #fff;
  background: linear-gradient(180deg, #3a3a3a, #2a2a2a);
  border: 1px solid #444;
  border-bottom-width: 2px;
  border-radius: 5px;
}
.hb-xd8[data-tip="true"] .hb-xd8-key { animation: hb-xd8-press 1s ease-in-out 0.2s infinite; }
.hb-xd8-strikes { display: inline-flex; gap: 3px; margin-left: 2px; }
.hb-xd8-strikes i { display: block; width: 4px; height: 4px; border-radius: 50%; background: #3a3a3a; font-style: normal; }
.hb-xd8-strikes i[data-on="true"] { background: var(--hb-xd8-c); box-shadow: 0 0 6px var(--hb-xd8-c); }
.hb-xd8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd8-march { to { background-position: 17px 0, 0 0; } }
@keyframes hb-xd8-shake-a {
  15% { transform: translateX(calc(var(--hb-xd8-amp) * -1)) rotate(-1deg); }
  30% { transform: translateX(var(--hb-xd8-amp)) rotate(1deg); }
  45% { transform: translateX(calc(var(--hb-xd8-amp) * -0.7)); }
  60% { transform: translateX(calc(var(--hb-xd8-amp) * 0.5)); }
  75% { transform: translateX(calc(var(--hb-xd8-amp) * -0.25)); }
}
@keyframes hb-xd8-shake-b {
  15% { transform: translateX(calc(var(--hb-xd8-amp) * -1)) rotate(-1deg); }
  30% { transform: translateX(var(--hb-xd8-amp)) rotate(1deg); }
  45% { transform: translateX(calc(var(--hb-xd8-amp) * -0.7)); }
  60% { transform: translateX(calc(var(--hb-xd8-amp) * 0.5)); }
  75% { transform: translateX(calc(var(--hb-xd8-amp) * -0.25)); }
}
@keyframes hb-xd8-press {
  0%, 60%, 100% { transform: translateY(0); border-bottom-width: 2px; }
  30% { transform: translateY(1px); border-bottom-width: 1px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xd8-btn, .hb-xd8-btn::before, .hb-xd8-lbl, .hb-xd8-tip { transition: none; }
  .hb-xd8[data-armed="true"] .hb-xd8-btn { transform: none; }
  .hb-xd8[data-armed="true"] .hb-xd8-btn::before, .hb-xd8[data-shake] .hb-xd8-btn, .hb-xd8[data-tip="true"] .hb-xd8-key { animation: none; }
}
`;

export function ButtonShiftArm({
  children = "Delete branch",
  armedLabel = "Delete forever",
  doneLabel = "Branch deleted",
  hint = "to delete",
  touchFallback = true,
  accent = "#ef4444",
  size = "md",
  resetAfter = 2400,
  onBlocked,
  onConfirm,
  disabled = false,
  type = "button",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onFocus,
  onBlur,
  ...rest
}: ButtonShiftArmProps) {
  const [shift, setShift] = React.useState(false);
  const [near, setNear] = React.useState(false);
  const [strikes, setStrikes] = React.useState(0);
  const [tip, setTip] = React.useState(false);
  const [phase, setPhase] = React.useState<"idle" | "done">("idle");
  const pointer = React.useRef("mouse");
  const latest = React.useRef({ onBlocked, onConfirm });

  React.useEffect(() => {
    latest.current = { onBlocked, onConfirm };
  }, [onBlocked, onConfirm]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShift(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShift(false);
    };
    const reset = () => setShift(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", reset);
    };
  }, []);

  React.useEffect(() => {
    if (!tip) return;
    const t = window.setTimeout(() => setTip(false), 2400);
    return () => window.clearTimeout(t);
  }, [tip, strikes]);

  React.useEffect(() => {
    if (phase !== "done" || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setPhase("idle");
      setStrikes(0);
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [phase, resetAfter]);

  const armed = phase === "idle" && shift && near && !disabled;
  const shake = strikes === 0 || tip === false ? "0" : strikes % 2 ? "1" : "2";
  const shown = Math.min(3, strikes);

  return (
    <span
      className={`hb-xd8 ${className}`.trim()}
      data-size={size}
      data-phase={phase}
      data-armed={armed}
      data-tip={tip && phase === "idle"}
      data-shake={shake}
      style={{ "--hb-xd8-c": accent, "--hb-xd8-amp": `${(2 + Math.min(3, strikes) * 1.5).toFixed(1)}px`, ...style } as React.CSSProperties}
    >
      <style href="hb-button-shift-arm" precedence="default">{css}</style>
      <span className="hb-xd8-tip" aria-hidden="true">
        Hold <span className="hb-xd8-key">⇧ Shift</span> {hint}
        <span className="hb-xd8-strikes">
          {[0, 1, 2].map((i) => (
            <i key={i} data-on={i < shown} />
          ))}
        </span>
      </span>
      <button
        type={type}
        className="hb-xd8-btn"
        disabled={disabled}
        aria-disabled={phase === "done" || undefined}
        aria-keyshortcuts="Shift+Enter"
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          setNear(true);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setNear(false);
        }}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          pointer.current = e.pointerType;
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setNear(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setNear(false);
        }}
        onClick={(e) => {
          if (phase !== "idle") return;
          const touchOk = touchFallback && pointer.current === "touch" && tip;
          if (e.shiftKey || touchOk) {
            setTip(false);
            setPhase("done");
            latest.current.onConfirm?.();
            return;
          }
          const n = strikes + 1;
          setStrikes(n);
          setTip(true);
          latest.current.onBlocked?.(n);
        }}
        {...rest}
      >
        <span className="hb-xd8-lbl hb-xd8-up" data-on={phase === "idle" && !armed} aria-hidden={phase !== "idle" || armed}>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="8" r="2.5" />
            <path d="M6 8.5v7M18 10.5c0 4-6 3-11 5.5" />
          </svg>
          {children}
        </span>
        <span className="hb-xd8-lbl" data-on={armed} aria-hidden={!armed}>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l9.5 17h-19z" />
            <path d="M12 10v4.5M12 17.5v.01" />
          </svg>
          {armedLabel}
        </span>
        <span className="hb-xd8-lbl" data-on={phase === "done"} aria-hidden={phase !== "done"}>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          {doneLabel}
        </span>
      </button>
      <span className="hb-xd8-sr" role="status" aria-live="polite">
        {phase === "done" ? doneLabel : tip ? "Hold Shift and press again to delete" : ""}
      </span>
    </span>
  );
}

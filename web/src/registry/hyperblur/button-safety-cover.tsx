"use client";

import * as React from "react";

export interface ButtonSafetyCoverProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  armedLabel?: React.ReactNode;
  doneLabel?: React.ReactNode;
  armTimeout?: number;
  accent?: string;
  size?: "sm" | "md" | "lg";
  resetAfter?: number;
  onArm?: () => void;
  onConfirm?: () => void;
}

const css = `
.hb-xd4 {
  --hb-xd4-h: 2.75rem;
  --hb-xd4-fs: 0.875rem;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--hb-xd4-fs);
  perspective: 520px;
  perspective-origin: 50% 0%;
}
.hb-xd4 *, .hb-xd4 *::before, .hb-xd4 *::after { box-sizing: border-box; }
.hb-xd4[data-size="sm"] { --hb-xd4-h: 2.25rem; --hb-xd4-fs: 0.8125rem; }
.hb-xd4[data-size="lg"] { --hb-xd4-h: 3.25rem; --hb-xd4-fs: 1rem; }
.hb-xd4-well {
  position: relative;
  padding: 4px;
  border-radius: 14px;
  background: linear-gradient(180deg, #0b0b0b, #151515);
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05);
}
.hb-xd4-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: var(--hb-xd4-h);
  margin: 0;
  padding: 0 1.5em;
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #fff;
  white-space: nowrap;
  border: 0;
  border-radius: 10px;
  background:
    radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-xd4-c) 92%, #fff), color-mix(in srgb, var(--hb-xd4-c) 80%, #000));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.5);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.15s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.15s ease, filter 0.3s ease;
}
.hb-xd4[data-phase="armed"] .hb-xd4-btn { animation: hb-xd4-glow 1.1s ease-in-out infinite; }
.hb-xd4-btn:active:not(:disabled) { transform: translateY(1.5px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.5); }
.hb-xd4-btn:focus-visible { outline: none; }
.hb-xd4-well:has(.hb-xd4-btn:focus-visible) { outline: 2px solid color-mix(in srgb, var(--hb-xd4-c) 70%, #fff); outline-offset: 3px; }
.hb-xd4-btn:disabled { filter: grayscale(0.8) brightness(0.6); cursor: not-allowed; }
.hb-xd4[data-phase="done"] .hb-xd4-btn { filter: saturate(0.6) brightness(0.8); }
.hb-xd4-lbl {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  text-shadow: 0 1px 0 rgba(0,0,0,0.3);
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd4[data-phase="idle"] .hb-xd4-l1, .hb-xd4[data-phase="armed"] .hb-xd4-l2, .hb-xd4[data-phase="done"] .hb-xd4-l3 { opacity: 1; transform: none; }
.hb-xd4-cover {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 4px;
  border-radius: 14px;
  background: repeating-linear-gradient(-45deg, #f5c518 0 7px, #121212 7px 14px);
  box-shadow: 0 6px 14px -6px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.6);
  transform-origin: 50% 0;
  transform: rotateX(0deg);
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.34, 1.45, 0.55, 1), filter 0.6s ease;
}
.hb-xd4-glass {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: #e9e9e9;
  font-weight: 600;
  background:
    linear-gradient(115deg, rgba(255,255,255,0.16) 0 18%, rgba(255,255,255,0) 18% 34%, rgba(255,255,255,0.07) 34% 40%, rgba(255,255,255,0) 40%),
    linear-gradient(180deg, rgba(36,36,36,0.92), rgba(18,18,18,0.94));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.05);
}
.hb-xd4-glass > span { display: inline-flex; align-items: center; gap: 0.5em; white-space: nowrap; }
.hb-xd4-glass svg { color: #f5c518; }
.hb-xd4-hinge {
  position: absolute;
  top: -3px;
  left: 50%;
  width: 46%;
  height: 6px;
  margin-left: -23%;
  border-radius: 3px;
  background: linear-gradient(180deg, #5a5a5a, #2a2a2a);
  box-shadow: 0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.25);
}
.hb-xd4[data-phase="armed"] .hb-xd4-cover, .hb-xd4[data-phase="done"] .hb-xd4-cover {
  transform: rotateX(116deg);
  filter: brightness(0.55);
}
.hb-xd4-timer {
  height: 2px;
  margin: 7px 10px 0;
  border-radius: 2px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.hb-xd4-timer > span {
  display: block;
  height: 100%;
  background: var(--hb-xd4-c);
  transform: scaleX(0);
  transform-origin: left;
}
.hb-xd4[data-phase="armed"] .hb-xd4-timer > span { animation: hb-xd4-drain var(--hb-xd4-t) linear forwards; }
.hb-xd4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd4-drain { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes hb-xd4-glow {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.5), 0 0 0 0 color-mix(in srgb, var(--hb-xd4-c) 0%, transparent); }
  50% { box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.5), 0 0 22px 2px color-mix(in srgb, var(--hb-xd4-c) 55%, transparent); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xd4-btn, .hb-xd4-lbl, .hb-xd4-cover { transition: none; }
  .hb-xd4[data-phase="armed"] .hb-xd4-btn { animation: none; }
  .hb-xd4[data-phase="armed"] .hb-xd4-timer > span { animation: none; transform: scaleX(1); }
}
`;

export function ButtonSafetyCover({
  children = "Delete project",
  armedLabel = "Press to confirm",
  doneLabel = "Project deleted",
  armTimeout = 4000,
  accent = "#e5383b",
  size = "md",
  resetAfter = 2600,
  onArm,
  onConfirm,
  disabled = false,
  type = "button",
  className = "",
  style,
  onKeyDown,
  onBlur,
  ...rest
}: ButtonSafetyCoverProps) {
  const [phase, setPhase] = React.useState<"idle" | "armed" | "done">("idle");
  const latest = React.useRef({ onArm, onConfirm });

  React.useEffect(() => {
    latest.current = { onArm, onConfirm };
  }, [onArm, onConfirm]);

  React.useEffect(() => {
    if (phase === "armed" && armTimeout > 0) {
      const t = window.setTimeout(() => setPhase("idle"), armTimeout);
      return () => window.clearTimeout(t);
    }
    if (phase === "done" && resetAfter > 0) {
      const t = window.setTimeout(() => setPhase("idle"), resetAfter);
      return () => window.clearTimeout(t);
    }
  }, [phase, armTimeout, resetAfter]);

  const status = phase === "armed" ? "Safety cover open. Press again to confirm." : phase === "done" ? (typeof doneLabel === "string" ? doneLabel : "Confirmed") : "";

  return (
    <span
      className={`hb-xd4 ${className}`.trim()}
      data-size={size}
      data-phase={phase}
      style={{ "--hb-xd4-c": accent, "--hb-xd4-t": `${armTimeout}ms`, ...style } as React.CSSProperties}
    >
      <style href="hb-button-safety-cover" precedence="default">{css}</style>
      <span className="hb-xd4-well">
        <button
          type={type}
          className="hb-xd4-btn"
          disabled={disabled}
          aria-disabled={phase === "done" || undefined}
          onClick={() => {
            if (phase === "idle") {
              setPhase("armed");
              latest.current.onArm?.();
            } else if (phase === "armed") {
              setPhase("done");
              latest.current.onConfirm?.();
            }
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.key === "Escape" && phase === "armed") setPhase("idle");
          }}
          onBlur={(e) => {
            onBlur?.(e);
            if (phase === "armed") setPhase("idle");
          }}
          {...rest}
        >
          <span className="hb-xd4-lbl hb-xd4-l1" aria-hidden={phase !== "idle"}>{children}</span>
          <span className="hb-xd4-lbl hb-xd4-l2" aria-hidden={phase !== "armed"}>
            <svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l9.5 17h-19z" />
              <path d="M12 10v4.5M12 17.5v.01" />
            </svg>
            {armedLabel}
          </span>
          <span className="hb-xd4-lbl hb-xd4-l3" aria-hidden={phase !== "done"}>
            <svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {doneLabel}
          </span>
        </button>
        <span className="hb-xd4-cover" aria-hidden="true">
          <span className="hb-xd4-hinge" />
          <span className="hb-xd4-glass">
            <span>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              {children}
            </span>
          </span>
        </span>
      </span>
      <span className="hb-xd4-timer" aria-hidden="true"><span /></span>
      <span className="hb-xd4-sr" role="status" aria-live="polite">{status}</span>
    </span>
  );
}

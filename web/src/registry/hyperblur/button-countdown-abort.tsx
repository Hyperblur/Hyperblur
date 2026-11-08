"use client";

import * as React from "react";

export interface ButtonCountdownAbortProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  target?: string;
  verb?: string;
  doneLabel?: React.ReactNode;
  abortedLabel?: React.ReactNode;
  seconds?: number;
  accent?: string;
  resetAfter?: number;
  onStart?: () => void;
  onAbort?: () => void;
  onConfirm?: () => void;
}

const css = `
.hb-xd9 {
  position: relative;
  display: inline-grid;
  box-sizing: border-box;
  min-height: 3.5rem;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 0.8125rem;
  color: #ededed;
  text-align: left;
  background: linear-gradient(180deg, #1a1a1a, #121212);
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.5), 0 14px 30px -18px rgba(0,0,0,0.9);
  overflow: hidden;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.4s ease, border-color 0.4s ease, transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd9 *, .hb-xd9 *::before, .hb-xd9 *::after { box-sizing: border-box; }
.hb-xd9:hover:not(:disabled)[data-phase="idle"] { border-color: color-mix(in srgb, var(--hb-xd9-c) 45%, #2a2a2a); }
.hb-xd9:active:not(:disabled) { transform: scale(0.985); }
.hb-xd9:focus-visible { outline: 2px solid var(--hb-xd9-c); outline-offset: 3px; }
.hb-xd9:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd9[data-phase="counting"] {
  border-color: color-mix(in srgb, var(--hb-xd9-c) 55%, #2a1414);
  background:
    repeating-linear-gradient(180deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px),
    radial-gradient(120% 140% at 0% 50%, color-mix(in srgb, var(--hb-xd9-c) 26%, #140909), #0f0808 70%);
}
.hb-xd9-layer {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 0 12px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.4s cubic-bezier(0.2, 1.1, 0.4, 1), visibility 0s linear 0.4s;
}
.hb-xd9-layer[data-on="true"] { opacity: 1; visibility: visible; transform: none; transition-delay: 0.05s, 0.05s, 0s; }
.hb-xd9-ico {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: color-mix(in srgb, var(--hb-xd9-c) 70%, #fff);
  background: color-mix(in srgb, var(--hb-xd9-c) 14%, #141414);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd9-c) 28%, transparent);
}
.hb-xd9-txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; line-height: 1.25; }
.hb-xd9-txt b { font-weight: 600; color: #fff; white-space: nowrap; }
.hb-xd9-txt small { font-size: 0.7rem; color: #8f8f8f; white-space: nowrap; }
.hb-xd9-txt kbd {
  padding: 0 4px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.64rem;
  color: #d4d4d4;
  background: #241414;
  border: 1px solid #3a2020;
  border-radius: 4px;
}
.hb-xd9-odo {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  overflow: hidden;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 1.55rem;
  font-weight: 600;
  line-height: 34px;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(180deg, #230d0e, #170909);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd9-c) 40%, transparent), inset 0 8px 10px -6px rgba(0,0,0,0.8), inset 0 -8px 10px -6px rgba(0,0,0,0.8);
  text-shadow: 0 0 12px color-mix(in srgb, var(--hb-xd9-c) 80%, transparent);
  font-variant-numeric: tabular-nums;
}
.hb-xd9-reel {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--hb-xd9-d) * -34px));
  transition: transform 0.5s cubic-bezier(0.5, 1.6, 0.4, 1);
}
.hb-xd9-leds {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 6px;
  display: flex;
  gap: 3px;
}
.hb-xd9-leds i {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  font-style: normal;
  background: #2a1515;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.hb-xd9-leds i[data-on="true"] { background: var(--hb-xd9-c); box-shadow: 0 0 6px color-mix(in srgb, var(--hb-xd9-c) 80%, transparent); }
.hb-xd9-leds i:last-child[data-on="true"] { animation: hb-xd9-blink 0.5s steps(2, start) infinite; }
.hb-xd9[data-phase="counting"] .hb-xd9-layer[data-on="true"] { padding-bottom: 8px; }
.hb-xd9[data-phase="done"] .hb-xd9-ico { color: #fff; background: var(--hb-xd9-c); }
.hb-xd9[data-phase="aborted"] .hb-xd9-ico { color: #d4d4d4; background: #1f1f1f; box-shadow: inset 0 0 0 1px #333; }
.hb-xd9[data-phase="aborted"] .hb-xd9-ico svg { animation: hb-xd9-rewind 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-xd9-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd9-blink { to { background: #2a1515; box-shadow: none; } }
@keyframes hb-xd9-rewind { from { transform: rotate(300deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd9, .hb-xd9-layer, .hb-xd9-reel, .hb-xd9-leds i { transition: none; }
  .hb-xd9-leds i:last-child[data-on="true"], .hb-xd9[data-phase="aborted"] .hb-xd9-ico svg { animation: none; }
}
`;

type Phase = "idle" | "counting" | "aborted" | "done";

export function ButtonCountdownAbort({
  children = "Wipe this device",
  target = "MacBook Pro",
  verb = "Erasing",
  doneLabel = "Device erased",
  abortedLabel = "Wipe cancelled",
  seconds = 5,
  accent = "#ef4444",
  resetAfter = 2600,
  onStart,
  onAbort,
  onConfirm,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonCountdownAbortProps) {
  const total = Math.max(1, Math.min(9, Math.round(seconds)));
  const steps = total * 2;
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [tick, setTick] = React.useState(0);
  const latest = React.useRef({ onStart, onAbort, onConfirm });

  React.useEffect(() => {
    latest.current = { onStart, onAbort, onConfirm };
  }, [onStart, onAbort, onConfirm]);

  const abort = React.useCallback(() => {
    setPhase("aborted");
    latest.current.onAbort?.();
  }, []);

  React.useEffect(() => {
    if (phase === "counting") {
      const id = window.setInterval(() => setTick((t) => t + 1), 500);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") abort();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.clearInterval(id);
        window.removeEventListener("keydown", onKey);
      };
    }
    if (phase === "aborted") {
      const t = window.setTimeout(() => setPhase("idle"), 1400);
      return () => window.clearTimeout(t);
    }
    if (phase === "done" && resetAfter > 0) {
      const t = window.setTimeout(() => setPhase("idle"), resetAfter);
      return () => window.clearTimeout(t);
    }
  }, [phase, resetAfter, abort]);

  React.useEffect(() => {
    if (phase !== "counting" || tick < steps) return;
    const t = window.setTimeout(() => {
      setPhase("done");
      latest.current.onConfirm?.();
    }, 0);
    return () => window.clearTimeout(t);
  }, [phase, tick, steps]);

  const remaining = Math.max(0, steps - tick);
  const digit = Math.ceil(remaining / 2);

  return (
    <button
      type={type}
      className={`hb-xd9 ${className}`.trim()}
      data-phase={phase}
      disabled={disabled}
      aria-disabled={phase === "done" || phase === "aborted" || undefined}
      style={{ "--hb-xd9-c": accent, ...style } as React.CSSProperties}
      onClick={() => {
        if (phase === "idle") {
          setTick(0);
          setPhase("counting");
          latest.current.onStart?.();
        } else if (phase === "counting") abort();
      }}
      {...rest}
    >
      <style href="hb-button-countdown-abort" precedence="default">{css}</style>
      <span className="hb-xd9-layer" data-on={phase === "idle"} aria-hidden={phase !== "idle"}>
        <span className="hb-xd9-ico">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4.5" width="18" height="12" rx="2" />
            <path d="M2 19.5h20M9.5 8.5l5 5M14.5 8.5l-5 5" />
          </svg>
        </span>
        <span className="hb-xd9-txt">
          <b>{children}</b>
          <small>Starts a {total}s countdown</small>
        </span>
      </span>
      <span className="hb-xd9-layer" data-on={phase === "counting"} aria-hidden={phase !== "counting"}>
        <span className="hb-xd9-odo" aria-hidden="true">
          <span className="hb-xd9-reel" style={{ "--hb-xd9-d": String(9 - digit) } as React.CSSProperties}>
            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
        <span className="hb-xd9-txt">
          <b>{verb} {target}</b>
          <small>Click or press <kbd>Esc</kbd> to abort</small>
        </span>
        <span className="hb-xd9-leds" aria-hidden="true">
          {Array.from({ length: steps }, (_, i) => (
            <i key={i} data-on={i < remaining} />
          ))}
        </span>
      </span>
      <span className="hb-xd9-layer" data-on={phase === "aborted"} aria-hidden={phase !== "aborted"}>
        <span className="hb-xd9-ico">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.5-5.8" /><path d="M4 4v4.5h4.5" /></svg>
        </span>
        <span className="hb-xd9-txt">
          <b>{abortedLabel}</b>
          <small>Nothing was erased</small>
        </span>
      </span>
      <span className="hb-xd9-layer" data-on={phase === "done"} aria-hidden={phase !== "done"}>
        <span className="hb-xd9-ico">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <span className="hb-xd9-txt">
          <b>{doneLabel}</b>
          <small>Factory settings restored</small>
        </span>
      </span>
      <span className="hb-xd9-sr" role="status" aria-live="polite">
        {phase === "counting" ? `${verb} ${target} in ${digit} seconds. Press Escape to abort.` : phase === "aborted" ? abortedLabel : phase === "done" ? doneLabel : ""}
      </span>
    </button>
  );
}

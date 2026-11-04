"use client";

import * as React from "react";

export interface PayFailedRetryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  message?: string;
  reasons?: string[];
  retryLabel?: string;
  changeLabel?: string;
  onRetry?: () => void;
  onChangeMethod?: () => void;
  busy?: boolean;
  accent?: string;
  loop?: boolean;
  loopDelay?: number;
}

const css = `
.hb-qf5 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  text-align: center;
}
.hb-qf5 *, .hb-qf5 *::before, .hb-qf5 *::after { box-sizing: border-box; }
.hb-qf5-in { display: flex; flex-direction: column; align-items: center; width: 100%; }
.hb-qf5-badge { position: relative; width: 56px; height: 56px; flex: none; }
.hb-qf5-pulse {
  position: absolute;
  inset: 0;
  border: 2px solid var(--hb-qf5-x);
  border-radius: 50%;
  animation: hb-qf5-pulse 1.1s ease-out 0.45s both;
}
.hb-qf5-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-qf5-shake { transform-origin: 28px 28px; animation: hb-qf5-shake 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.55s both; }
.hb-qf5-disc { fill: color-mix(in srgb, var(--hb-qf5-x) 14%, transparent); stroke: var(--hb-qf5-x); stroke-width: 2.5; }
.hb-qf5-x {
  fill: none;
  stroke: var(--hb-qf5-x);
  stroke-width: 3.6;
  stroke-linecap: round;
  stroke-dasharray: 1 1.2;
  stroke-dashoffset: 0;
  animation: hb-qf5-draw 0.3s ease-out 0.25s both;
}
.hb-qf5-x + .hb-qf5-x { animation-delay: 0.4s; }
.hb-qf5-title { margin: 9px 0 0; font-size: 15px; font-weight: 600; letter-spacing: -0.005em; animation: hb-qf5-up 0.5s ease 0.5s both; }
.hb-qf5-msg { margin: 2px 0 0; color: #8f8f8f; font-size: 12.5px; line-height: 1.4; animation: hb-qf5-up 0.5s ease 0.58s both; }
.hb-qf5-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 9px 0 0; padding: 0; list-style: none; }
.hb-qf5-chip {
  padding: 3px 9px;
  color: color-mix(in srgb, var(--hb-qf5-x) 55%, #fff);
  font-size: 11.5px;
  background: color-mix(in srgb, var(--hb-qf5-x) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-qf5-x) 32%, transparent);
  border-radius: 999px;
  animation: hb-qf5-up 0.45s ease both;
  animation-delay: calc(0.66s + var(--i) * 0.07s);
}
.hb-qf5-acts { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 12px; animation: hb-qf5-up 0.5s ease 0.8s both; }
.hb-qf5-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 36px;
  margin: 0;
  padding: 0 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-qf5-btn:hover:not(:disabled) { transform: translateY(-1px); }
.hb-qf5-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-qf5-btn:focus-visible { outline: 2px solid var(--hb-qf5-x); outline-offset: 3px; }
.hb-qf5-btn:disabled { cursor: progress; opacity: 0.75; }
.hb-qf5-go { color: #0a0a0a; background: #ededed; border: 1px solid #ededed; }
.hb-qf5-go:hover:not(:disabled) { background: #fff; }
.hb-qf5-alt { color: #ededed; background: transparent; border: 1px solid #333333; }
.hb-qf5-alt:hover:not(:disabled) { background: #171717; border-color: #4a4a4a; }
.hb-qf5-spin { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; animation: hb-qf5-rot 0.8s linear infinite; }
.hb-qf5-ico { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
@keyframes hb-qf5-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-qf5-shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  15% { transform: translateX(-7px) rotate(-6deg); }
  30% { transform: translateX(6px) rotate(5deg); }
  45% { transform: translateX(-5px) rotate(-4deg); }
  60% { transform: translateX(4px) rotate(3deg); }
  80% { transform: translateX(-2px) rotate(-1deg); }
}
@keyframes hb-qf5-pulse { from { opacity: 0.7; transform: scale(1); } to { opacity: 0; transform: scale(1.7); } }
@keyframes hb-qf5-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-qf5-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qf5-pulse, .hb-qf5-shake, .hb-qf5-x, .hb-qf5-title, .hb-qf5-msg, .hb-qf5-chip, .hb-qf5-acts, .hb-qf5-spin { animation: none; }
  .hb-qf5-pulse { opacity: 0; }
  .hb-qf5-btn { transition: none; }
}
`;

export function PayFailedRetry({
  title = "Payment declined",
  message = "Your bank did not approve this payment.",
  reasons = ["Insufficient funds", "Card expired"],
  retryLabel = "Try again",
  changeLabel = "Change method",
  onRetry,
  onChangeMethod,
  busy = false,
  accent = "#ff5d6c",
  loop = false,
  loopDelay = 5600,
  className = "",
  style,
  ...rest
}: PayFailedRetryProps) {
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    if (!loop) return;
    const id = window.setInterval(() => setRun((r) => r + 1), Math.max(2500, loopDelay));
    return () => window.clearInterval(id);
  }, [loop, loopDelay]);

  function retry() {
    setRun((r) => r + 1);
    onRetry?.();
  }

  const vars = { "--hb-qf5-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qf5 ${className}`} style={vars} role="alert" {...rest}>
      <style href="hb-pay-failed-retry" precedence="default">{css}</style>
      <div key={run} className="hb-qf5-in">
        <div className="hb-qf5-badge" aria-hidden="true">
          <span className="hb-qf5-pulse" />
          <svg className="hb-qf5-svg" viewBox="0 0 56 56">
            <g className="hb-qf5-shake">
              <circle className="hb-qf5-disc" cx="28" cy="28" r="25" />
              <path className="hb-qf5-x" d="M20 20l16 16" pathLength="1" />
              <path className="hb-qf5-x" d="M36 20L20 36" pathLength="1" />
            </g>
          </svg>
        </div>
        <p className="hb-qf5-title">{title}</p>
        {message && <p className="hb-qf5-msg">{message}</p>}
        {reasons.length > 0 && (
          <ul className="hb-qf5-chips" aria-label="Possible reasons">
            {reasons.map((reason, i) => (
              <li key={reason} className="hb-qf5-chip" style={{ "--i": i } as React.CSSProperties}>
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="hb-qf5-acts">
          <button type="button" className="hb-qf5-btn hb-qf5-go" onClick={retry} disabled={busy} aria-busy={busy}>
            {busy ? (
              <svg className="hb-qf5-spin" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" opacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" />
              </svg>
            ) : (
              <svg className="hb-qf5-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" />
              </svg>
            )}
            {retryLabel}
          </button>
          <button type="button" className="hb-qf5-btn hb-qf5-alt" onClick={onChangeMethod}>
            {changeLabel}
          </button>
      </div>
    </div>
  );
}

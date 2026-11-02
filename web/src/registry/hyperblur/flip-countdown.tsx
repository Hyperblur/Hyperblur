"use client";

import * as React from "react";

export interface FlipCountdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  target: string;
  labels?: string[];
  color?: string;
  size?: number;
  onComplete?: () => void;
  hideDays?: boolean;
}

const css = `
@keyframes hb-fcd-fold {
  from { transform: rotateX(0deg); }
  to { transform: rotateX(-90deg); }
}
@keyframes hb-fcd-unfold {
  from { transform: rotateX(90deg); }
  to { transform: rotateX(0deg); }
}
@keyframes hb-fcd-shade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes hb-fcd-shade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
.hb-fcd {
  display: flex;
  justify-content: center;
  width: 100%;
  container-type: inline-size;
}
.hb-fcd-row {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: max(14px, min(var(--hb-fcd-s), calc((100cqw - 6px) / var(--hb-fcd-k))));
  font-family: var(--hb-fcd-font, ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--hb-fcd-c);
}
.hb-fcd-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.22em;
}
.hb-fcd-digits { display: flex; gap: 0.06em; }
.hb-fcd-lab {
  display: flex;
  justify-content: center;
  width: 0;
  min-width: 100%;
  font-size: max(9px, 0.22em);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.5);
}
.hb-fcd-sep {
  flex: 0 0 1px;
  align-self: flex-start;
  width: 1px;
  height: 1.3em;
  margin: 0 0.2em;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}
.hb-fcd-tile {
  position: relative;
  flex: 0 0 auto;
  width: 0.85em;
  height: 1.3em;
  perspective: 3.2em;
  border-radius: 0.12em;
  box-shadow: 0 0.05em 0.16em rgba(0, 0, 0, 0.5);
}
.hb-fcd-tile::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  z-index: 6;
  height: max(1px, 0.03em);
  margin-top: calc(max(1px, 0.03em) / -2);
  background: rgba(0, 0, 0, 0.9);
}
.hb-fcd-half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
  backface-visibility: hidden;
}
.hb-fcd-half::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}
.hb-fcd-top {
  top: 0;
  border-radius: 0.12em 0.12em 0 0;
  background: linear-gradient(180deg, #2a2a2e 0%, #1b1b1e 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09);
  transform-origin: 50% 100%;
}
.hb-fcd-top::after { background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)); }
.hb-fcd-bot {
  top: 50%;
  border-radius: 0 0 0.12em 0.12em;
  background: linear-gradient(180deg, #151517 0%, #1f1f23 100%);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.04);
  transform-origin: 50% 0;
}
.hb-fcd-bot::after { background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)); }
.hb-fcd-ch {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200%;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.hb-fcd-top .hb-fcd-ch { top: 0; }
.hb-fcd-bot .hb-fcd-ch { top: -100%; }
.hb-fcd-live.hb-fcd-top, .hb-fcd-live.hb-fcd-bot { z-index: 1; }
.hb-fcd-live.hb-fcd-top::after {
  opacity: 1;
  animation: hb-fcd-shade-out 0.6s ease-out forwards;
}
.hb-fcd-live.hb-fcd-bot::after { animation: hb-fcd-shade-in 0.3s ease-in forwards; }
.hb-fcd-flap.hb-fcd-top {
  z-index: 3;
  animation: hb-fcd-fold 0.3s ease-in forwards;
}
.hb-fcd-flap.hb-fcd-top::after { animation: hb-fcd-shade-in 0.3s ease-in forwards; }
.hb-fcd-flap.hb-fcd-bot {
  z-index: 2;
  animation: hb-fcd-unfold 0.3s ease-out 0.3s both;
}
.hb-fcd-flap.hb-fcd-bot::after {
  opacity: 1;
  animation: hb-fcd-shade-out 0.3s ease-out 0.3s both;
}
@media (prefers-reduced-motion: reduce) {
  .hb-fcd-flap, .hb-fcd-flap::after, .hb-fcd-live::after {
    animation-duration: 1ms !important;
    animation-delay: 0s !important;
  }
}
`;

const DEFAULT_LABELS = ["Days", "Hours", "Minutes", "Seconds"];

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 250);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

interface Flap {
  cur: string;
  prev: string;
  k: number;
}

function Digit({ value }: { value: string }) {
  const [flap, setFlap] = React.useState<Flap>({ cur: value, prev: value, k: 0 });
  if (flap.cur !== value) setFlap({ cur: value, prev: flap.cur, k: flap.k + 1 });
  const { cur, prev, k } = flap;
  const live = k > 0 ? " hb-fcd-live" : "";

  return (
    <span className="hb-fcd-tile" aria-hidden="true">
      <span key={`a${k}`} className={`hb-fcd-half hb-fcd-top${live}`}>
        <span className="hb-fcd-ch">{cur}</span>
      </span>
      <span key={`b${k}`} className={`hb-fcd-half hb-fcd-bot${live}`}>
        <span className="hb-fcd-ch">{k > 0 ? prev : cur}</span>
      </span>
      {k > 0 && (
        <>
          <span key={`c${k}`} className="hb-fcd-half hb-fcd-top hb-fcd-flap">
            <span className="hb-fcd-ch">{prev}</span>
          </span>
          <span key={`d${k}`} className="hb-fcd-half hb-fcd-bot hb-fcd-flap">
            <span className="hb-fcd-ch">{cur}</span>
          </span>
        </>
      )}
    </span>
  );
}

export function FlipCountdown({
  target,
  labels = DEFAULT_LABELS,
  color = "#ededed",
  size = 48,
  onComplete,
  hideDays = false,
  className = "",
  style,
  ...rest
}: FlipCountdownProps) {
  const now = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = now > 0;
  const targetMs = Date.parse(target);
  const total = ready && Number.isFinite(targetMs) ? Math.max(0, Math.floor(targetMs / 1000) - now) : 0;
  const done = ready && total === 0;

  const callback = React.useRef(onComplete);
  const fired = React.useRef(false);

  React.useEffect(() => {
    callback.current = onComplete;
  });

  React.useEffect(() => {
    fired.current = false;
  }, [target]);

  React.useEffect(() => {
    if (!done || fired.current) return;
    fired.current = true;
    callback.current?.();
  }, [done]);

  const days = Math.floor(total / 86400);
  const dayDigits = Math.max(2, String(days).length);
  const showDays = !(hideDays && ready && days === 0);

  const units = [
    { label: labels[0] ?? DEFAULT_LABELS[0], value: days, digits: dayDigits, name: "day" },
    { label: labels[1] ?? DEFAULT_LABELS[1], value: Math.floor((total % 86400) / 3600), digits: 2, name: "hour" },
    { label: labels[2] ?? DEFAULT_LABELS[2], value: Math.floor((total % 3600) / 60), digits: 2, name: "minute" },
    { label: labels[3] ?? DEFAULT_LABELS[3], value: total % 60, digits: 2, name: "second" },
  ].slice(showDays ? 0 : 1);

  const digitCount = units.reduce((sum, u) => sum + u.digits, 0);
  const fit = digitCount * 0.85 + (digitCount - units.length) * 0.06 + (units.length - 1) * 0.4 + 0.2;

  const spoken = ready
    ? units.map((u) => `${u.value} ${u.name}${u.value === 1 ? "" : "s"}`).join(", ") + " remaining"
    : "Countdown";

  const vars = {
    "--hb-fcd-s": `${Math.max(8, size)}px`,
    "--hb-fcd-c": color,
    "--hb-fcd-k": fit.toFixed(3),
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-fcd ${className}`} style={vars} role="timer" aria-label={spoken} {...rest}>
      <style href="hb-flip-countdown" precedence="default">{css}</style>
      <div className="hb-fcd-row">
        {units.map((unit, i) => {
          const text = ready ? String(unit.value).padStart(unit.digits, "0") : "-".repeat(unit.digits);
          return (
            <React.Fragment key={unit.name}>
              {i > 0 && <span className="hb-fcd-sep" aria-hidden="true" />}
              <span className="hb-fcd-unit">
                <span className="hb-fcd-digits">
                  {Array.from(text).map((ch, j) => (
                    <Digit key={j} value={ch} />
                  ))}
                </span>
                <span className="hb-fcd-lab" aria-hidden="true">
                  {unit.label}
                </span>
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

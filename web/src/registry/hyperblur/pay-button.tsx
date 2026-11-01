"use client";

import * as React from "react";

export interface PayButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> {
  amount: string;
  label?: string;
  successLabel?: string;
  processingMs?: number;
  resetMs?: number;
  color?: string;
  onPaid?: () => void;
  disabled?: boolean;
  rounded?: number;
  size?: "sm" | "md" | "lg";
  brand?: "none" | "visa" | "mastercard" | "pix";
}

type PayState = "idle" | "processing" | "success";

const css = `
.hb-pb {
  position: relative;
  display: inline-grid;
  place-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0.85em 1.6em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  color: #fff;
  background-color: var(--hb-c);
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 60%);
  border: 0;
  border-radius: var(--hb-r);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.28) inset, 0 12px 26px -12px color-mix(in srgb, var(--hb-c) 85%, transparent);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.4s ease, box-shadow 0.4s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-pb[data-size="sm"] { font-size: 13px; padding: 0.7em 1.3em; }
.hb-pb[data-size="lg"] { font-size: 17px; padding: 0.95em 1.9em; }
.hb-pb[data-state="success"] {
  background-color: #15803d;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25) inset, 0 12px 26px -12px rgba(21, 128, 61, 0.9);
}
.hb-pb[data-state="idle"]:not(:disabled):hover { transform: translateY(-1px); }
.hb-pb[data-state="idle"]:not(:disabled):active { transform: scale(0.97); }
.hb-pb[data-state="processing"] { cursor: progress; }
.hb-pb:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-pb:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-pb-v {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateY(40%);
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1), visibility 0s linear 0.35s;
}
.hb-pb[data-state="idle"] .hb-pb-i,
.hb-pb[data-state="processing"] .hb-pb-p,
.hb-pb[data-state="success"] .hb-pb-s {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: 0.05s, 0.05s, 0s;
}
.hb-pb-ic {
  width: 1.25em;
  height: 1.25em;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-pb-amt { font-weight: 700; }
.hb-pb-brand {
  display: inline-flex;
  align-items: center;
  height: 1.3em;
  margin-left: 0.2em;
  padding-left: 0.7em;
  border-left: 1px solid rgba(255, 255, 255, 0.35);
  opacity: 0.85;
}
.hb-pb-bm { height: 0.95em; width: auto; fill: currentColor; }
.hb-pb-spin {
  width: 1.25em;
  height: 1.25em;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  animation: hb-pb-rot 0.8s linear infinite;
}
.hb-pb-spin circle:first-child { opacity: 0.28; }
.hb-pb-ck path {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}
.hb-pb[data-state="success"] .hb-pb-s { animation: hb-pb-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-pb[data-state="success"] .hb-pb-ck path { animation: hb-pb-draw 0.4s ease-out 0.12s both; }
.hb-pb-sr {
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
@keyframes hb-pb-rot {
  to { transform: rotate(360deg); }
}
@keyframes hb-pb-pop {
  0% { transform: scale(0.6); }
  60% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
@keyframes hb-pb-draw {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
@keyframes hb-pb-pulse {
  50% { opacity: 0.35; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-pb, .hb-pb-v { transition-duration: 0.01s; }
  .hb-pb-v { transform: none; }
  .hb-pb-spin { animation: hb-pb-pulse 1.2s ease-in-out infinite; }
  .hb-pb[data-state="success"] .hb-pb-s, .hb-pb[data-state="success"] .hb-pb-ck path { animation: none; }
  .hb-pb[data-state="idle"]:not(:disabled):hover, .hb-pb[data-state="idle"]:not(:disabled):active { transform: none; }
}
`;

function BrandMark({ brand }: { brand: "visa" | "mastercard" | "pix" }) {
  if (brand === "visa") {
    return (
      <svg className="hb-pb-bm" viewBox="0 0 12 14" aria-hidden="true" focusable="false">
        <path d="M6.6 0.5H10L5.4 13.5H2z" />
      </svg>
    );
  }
  if (brand === "mastercard") {
    return (
      <svg className="hb-pb-bm" viewBox="0 0 22 14" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="6" fillOpacity="0.6" />
        <circle cx="15" cy="7" r="6" fillOpacity="0.6" />
      </svg>
    );
  }
  return (
    <svg className="hb-pb-bm" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" d="M7 0.5L13.5 7 7 13.5 0.5 7zM7 4L10 7 7 10 4 7z" />
    </svg>
  );
}

export function PayButton({
  amount,
  label = "Pay",
  successLabel = "Paid",
  processingMs = 1400,
  resetMs = 2400,
  color = "#2f7bff",
  onPaid,
  disabled = false,
  rounded = 9999,
  size = "md",
  brand = "none",
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: PayButtonProps) {
  const [state, setState] = React.useState<PayState>("idle");
  const timers = React.useRef<number[]>([]);
  const latest = React.useRef(onPaid);

  React.useEffect(() => {
    latest.current = onPaid;
  }, [onPaid]);

  React.useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (e.defaultPrevented || disabled || state !== "idle") return;
    setState("processing");
    timers.current.push(
      window.setTimeout(() => {
        setState("success");
        latest.current?.();
        if (resetMs > 0) {
          timers.current.push(window.setTimeout(() => setState("idle"), resetMs));
        }
      }, Math.max(0, processingMs)),
    );
  }

  const vars = {
    "--hb-c": color,
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-pay-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-pb ${className}`}
        style={vars}
        data-size={size}
        data-state={state}
        disabled={disabled}
        aria-busy={state === "processing"}
        onClick={handleClick}
        {...rest}
      >
        <span className="hb-pb-v hb-pb-i">
          <svg className="hb-pb-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <rect x="2.5" y="5" width="19" height="14" rx="3" />
            <path d="M2.5 10h19M6.5 15h3" />
          </svg>
          <span>
            {label} <span className="hb-pb-amt">{amount}</span>
          </span>
          {brand !== "none" ? (
            <span className="hb-pb-brand" aria-hidden="true">
              <BrandMark brand={brand} />
            </span>
          ) : null}
        </span>
        <span className="hb-pb-v hb-pb-p">
          <svg className="hb-pb-spin" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 9 9" />
          </svg>
          <span>Processing</span>
        </span>
        <span className="hb-pb-v hb-pb-s">
          <svg className="hb-pb-ic hb-pb-ck" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
          </svg>
          <span>{successLabel}</span>
        </span>
      </button>
      <span className="hb-pb-sr" role="status" aria-live="polite">
        {state === "success" ? successLabel : ""}
      </span>
    </>
  );
}

"use client";

import * as React from "react";

export interface InputFloatingLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  success?: boolean;
  hint?: string;
  icon?: React.ReactNode;
  accent?: string;
}

const css = `
.hb-qn5 {
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qn5 *, .hb-qn5 *::before, .hb-qn5 *::after { box-sizing: border-box; }
.hb-qn5-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 54px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qn5-field:hover { border-color: #3a3a3a; }
.hb-qn5-field:focus-within {
  border-color: var(--hb-qn5-c);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qn5-c) 18%, transparent);
}
.hb-qn5[data-state="error"] .hb-qn5-field { animation: hb-qn5-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-qn5-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  margin-left: 14px;
  color: #6f6f6f;
  transition: color 0.2s ease;
}
.hb-qn5-icon svg { width: 18px; height: 18px; display: block; }
.hb-qn5-field:focus-within .hb-qn5-icon { color: var(--hb-qn5-c); }
.hb-qn5-in {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 20px 14px 6px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  line-height: 1.2;
  text-overflow: ellipsis;
}
.hb-qn5[data-icon="true"] .hb-qn5-in { padding-left: 10px; }
.hb-qn5-in::placeholder { color: transparent; transition: color 0.2s ease; }
.hb-qn5-in:focus::placeholder { color: #5f5f5f; }
.hb-qn5-in:disabled { cursor: not-allowed; opacity: 0.5; }
.hb-qn5-lab {
  position: absolute;
  top: 50%;
  left: 14px;
  max-width: calc(100% - 56px);
  overflow: hidden;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  transform: translateY(-50%);
  transform-origin: left center;
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.2s ease;
}
.hb-qn5[data-icon="true"] .hb-qn5-lab { left: 44px; }
.hb-qn5-in:focus ~ .hb-qn5-lab,
.hb-qn5-in:not(:placeholder-shown) ~ .hb-qn5-lab { transform: translateY(calc(-50% - 11px)) scale(0.76); }
.hb-qn5-in:focus ~ .hb-qn5-lab { color: var(--hb-qn5-c); }
.hb-qn5-line {
  position: absolute;
  right: 12px;
  bottom: -1px;
  left: 12px;
  height: 2px;
  border-radius: 2px;
  background: var(--hb-qn5-c);
  transform: scaleX(0);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qn5-field:focus-within .hb-qn5-line,
.hb-qn5[data-state="error"] .hb-qn5-line,
.hb-qn5[data-state="success"] .hb-qn5-line { transform: scaleX(1); }
.hb-qn5[data-state="error"] { --hb-qn5-c: #ff5d6c; }
.hb-qn5[data-state="success"] { --hb-qn5-c: #34d27b; }
.hb-qn5[data-state="error"] .hb-qn5-field { border-color: #ff5d6c; }
.hb-qn5[data-state="success"] .hb-qn5-field { border-color: color-mix(in srgb, #34d27b 60%, #262626); }
.hb-qn5[data-state="success"] .hb-qn5-field:focus-within { border-color: #34d27b; }
.hb-qn5[data-state="error"] .hb-qn5-lab { color: #ff8a95; }
.hb-qn5[data-state="success"] .hb-qn5-lab { color: #5fe39b; }
.hb-qn5-status {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-right: 14px;
  animation: hb-qn5-pop 0.4s cubic-bezier(0.34, 1.7, 0.64, 1);
}
.hb-qn5-status svg { width: 20px; height: 20px; display: block; overflow: visible; }
.hb-qn5-status path, .hb-qn5-status circle { fill: none; stroke: var(--hb-qn5-c); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-qn5-draw { stroke-dasharray: 1 1.1; stroke-dashoffset: 1.05; animation: hb-qn5-draw 0.4s 0.1s cubic-bezier(0.6, 0, 0.3, 1) forwards; }
.hb-qn5-msg {
  margin: 6px 4px 0;
  font-size: 12.5px;
  line-height: 1.35;
  color: #8f8f8f;
  animation: hb-qn5-rise 0.25s ease-out;
}
.hb-qn5[data-state="error"] .hb-qn5-msg { color: #ff8a95; }
.hb-qn5[data-state="success"] .hb-qn5-msg { color: #5fe39b; }
@keyframes hb-qn5-shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}
@keyframes hb-qn5-pop {
  0% { opacity: 0; transform: scale(0.4); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes hb-qn5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-qn5-rise {
  0% { opacity: 0; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qn5-field, .hb-qn5-lab, .hb-qn5-line, .hb-qn5-icon, .hb-qn5-in::placeholder { transition: none; }
  .hb-qn5[data-state="error"] .hb-qn5-field, .hb-qn5-status, .hb-qn5-msg { animation: none; }
  .hb-qn5-draw { animation: none; stroke-dashoffset: 0; }
}
`;

export function InputFloatingLabel({
  label,
  error,
  success = false,
  hint,
  icon,
  accent = "#2f7bff",
  className = "",
  style,
  id,
  placeholder,
  "aria-describedby": describedBy,
  ...rest
}: InputFloatingLabelProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const msgId = `${inputId}-msg`;
  const state = error ? "error" : success ? "success" : "idle";
  const message = error ?? hint;
  const vars = { "--hb-qn5-c": accent, ...style } as React.CSSProperties;
  const ids = message ? (describedBy ? `${describedBy} ${msgId}` : msgId) : describedBy;

  return (
    <>
      <style href="hb-input-floating-label" precedence="default">{css}</style>
      <div className={`hb-qn5 ${className}`} style={vars} data-state={state} data-icon={icon ? "true" : "false"}>
        <div className="hb-qn5-field">
          {icon ? (
            <span className="hb-qn5-icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <input
            id={inputId}
            className="hb-qn5-in"
            placeholder={placeholder ?? " "}
            aria-invalid={error ? true : undefined}
            aria-describedby={ids}
            {...rest}
          />
          <label className="hb-qn5-lab" htmlFor={inputId}>
            {label}
          </label>
          {error ? (
            <span className="hb-qn5-status" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5v5.5M12 16.4v.1" />
              </svg>
            </span>
          ) : success ? (
            <span className="hb-qn5-status" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path className="hb-qn5-draw" d="M8 12.4l2.8 2.8 5.2-5.8" pathLength="1" />
              </svg>
            </span>
          ) : null}
          <span className="hb-qn5-line" aria-hidden="true" />
        </div>
        {message ? (
          <p key={message} id={msgId} className="hb-qn5-msg" aria-live="polite">
            {message}
          </p>
        ) : null}
      </div>
    </>
  );
}

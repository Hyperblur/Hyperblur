"use client";

import * as React from "react";

export interface OtpInputInlineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: "numeric" | "alphanumeric";
  mask?: boolean;
  separatorAfter?: number;
  error?: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  accent?: string;
}

const css = `
.hb-qnb {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qnb *, .hb-qnb *::before, .hb-qnb *::after { box-sizing: border-box; }
.hb-qnb[data-disabled="true"] { opacity: 0.5; }
.hb-qnb[data-error="true"] .hb-qnb-row { animation: hb-qnb-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-qnb-row { display: flex; align-items: center; justify-content: center; gap: 6px; }
.hb-qnb-in {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  font: inherit;
  font-size: 16px;
  opacity: 0;
  cursor: text;
}
.hb-qnb-seg {
  position: relative;
  display: grid;
  flex: 1 1 0;
  place-items: center;
  min-width: 0;
  max-width: 46px;
  height: 48px;
  border: 1px solid #262626;
  border-radius: 11px;
  background: #111;
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.hb-qnb-seg[data-active="true"][data-focus="true"] {
  border-color: var(--hb-qnb-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qnb-a) 20%, transparent);
  background: color-mix(in srgb, var(--hb-qnb-a) 6%, #111);
}
.hb-qnb-seg[data-filled="true"] { border-color: #3a3a3a; }
.hb-qnb[data-complete="true"] .hb-qnb-seg { border-color: color-mix(in srgb, var(--hb-qnb-a) 70%, #262626); }
.hb-qnb[data-error="true"] .hb-qnb-seg { border-color: #ff5d6c; }
.hb-qnb-seg[data-caret="true"]::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 22px;
  border-radius: 2px;
  background: var(--hb-qnb-a);
  animation: hb-qnb-blink 1.05s steps(1) infinite;
}
.hb-qnb-ch { display: block; animation: hb-qnb-pop 0.28s cubic-bezier(0.34, 1.7, 0.64, 1); }
.hb-qnb-sep { flex: none; width: 8px; height: 2px; margin: 0 2px; border-radius: 2px; background: #3a3a3a; }
@keyframes hb-qnb-blink {
  0%, 55% { opacity: 1; }
  56%, 100% { opacity: 0; }
}
@keyframes hb-qnb-pop {
  0% { opacity: 0; transform: translateY(6px) scale(0.6); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes hb-qnb-shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qnb-seg { transition: none; }
  .hb-qnb-seg[data-caret="true"]::after { animation: none; }
  .hb-qnb-ch, .hb-qnb[data-error="true"] .hb-qnb-row { animation: none; }
}
`;

export function OtpInputInline({
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  type = "numeric",
  mask = false,
  separatorAfter,
  error = false,
  label = "Verification code",
  name,
  disabled = false,
  autoFocus = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: OtpInputInlineProps) {
  const controlled = value !== undefined;
  const clean = React.useCallback(
    (raw: string) => {
      const filtered = type === "numeric" ? raw.replace(/\D/g, "") : raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      return filtered.slice(0, length);
    },
    [type, length],
  );
  const [inner, setInner] = React.useState(() => clean(defaultValue));
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const current = clean(controlled ? value : inner);
  const activeIndex = Math.min(current.length, length - 1);
  const complete = current.length === length;
  const split = separatorAfter ?? (length >= 6 ? Math.floor(length / 2) : 0);

  function update(raw: string) {
    const next = clean(raw);
    if (next === current) return;
    if (!controlled) setInner(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
  }

  function pin() {
    const el = inputRef.current;
    if (!el) return;
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }

  const vars = { "--hb-qnb-a": accent, ...style } as React.CSSProperties;
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < length; i += 1) {
    const ch = current[i];
    cells.push(
      <span
        key={`seg-${i}`}
        className="hb-qnb-seg"
        data-filled={ch !== undefined}
        data-active={i === activeIndex}
        data-focus={focused}
        data-caret={focused && i === activeIndex && ch === undefined}
      >
        {ch !== undefined ? (
          <span key={`${i}-${ch}`} className="hb-qnb-ch">
            {mask ? "•" : ch}
          </span>
        ) : null}
      </span>,
    );
    if (split > 0 && i + 1 === split && i + 1 < length) {
      cells.push(<span key={`sep-${i}`} className="hb-qnb-sep" aria-hidden="true" />);
    }
  }

  return (
    <>
      <style href="hb-otp-input-inline" precedence="default">{css}</style>
      <div
        className={`hb-qnb ${className}`}
        style={vars}
        data-disabled={disabled}
        data-error={error}
        data-complete={complete}
        {...rest}
      >
        <div className="hb-qnb-row" aria-hidden="true">
          {cells}
        </div>
        <input
          ref={inputRef}
          className="hb-qnb-in"
          value={current}
          name={name}
          disabled={disabled}
          autoFocus={autoFocus}
          inputMode={type === "numeric" ? "numeric" : "text"}
          autoComplete="one-time-code"
          autoCapitalize="characters"
          spellCheck={false}
          aria-label={`${label}, ${length} ${type === "numeric" ? "digits" : "characters"}`}
          aria-invalid={error || undefined}
          pattern={type === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*"}
          onChange={(e) => update(e.target.value)}
          onFocus={() => {
            setFocused(true);
            pin();
          }}
          onBlur={() => setFocused(false)}
          onSelect={pin}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End") e.preventDefault();
          }}
        />
      </div>
    </>
  );
}

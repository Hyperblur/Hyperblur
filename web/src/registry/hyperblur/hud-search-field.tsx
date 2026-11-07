"use client";

import * as React from "react";

export interface HudSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size" | "type"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  resultCount?: number;
  total?: number;
  shortcut?: string;
  label?: string;
  accent?: string;
}

const css = `
.hb-ua8 {
  --hb-ua8-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  padding: 0 10px 0 12px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.025);
  color: #ededed;
  font-family: inherit;
  transition: border-color .2s ease, background-color .2s ease, box-shadow .25s ease;
}
.hb-ua8 *, .hb-ua8 *::before, .hb-ua8 *::after { box-sizing: border-box; }
.hb-ua8:hover { border-color: rgba(255,255,255,.2); }
.hb-ua8:focus-within {
  border-color: color-mix(in srgb, var(--hb-ua8-accent) 45%, rgba(255,255,255,.12));
  background: color-mix(in srgb, var(--hb-ua8-accent) 5%, rgba(255,255,255,.02));
  box-shadow: 0 0 22px -10px var(--hb-ua8-accent);
}
.hb-ua8-k {
  position: absolute;
  width: 7px;
  height: 7px;
  border: 0 solid rgba(255,255,255,.5);
  pointer-events: none;
  transition: transform .3s cubic-bezier(.2, .8, .2, 1), width .3s cubic-bezier(.2, .8, .2, 1), height .3s cubic-bezier(.2, .8, .2, 1), border-color .2s ease;
}
.hb-ua8-k-tl { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.hb-ua8-k-tr { right: -1px; top: -1px; border-right-width: 1px; border-top-width: 1px; }
.hb-ua8-k-bl { left: -1px; bottom: -1px; border-left-width: 1px; border-bottom-width: 1px; }
.hb-ua8-k-br { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua8:focus-within .hb-ua8-k { width: 12px; height: 12px; border-color: var(--hb-ua8-accent); }
.hb-ua8:focus-within .hb-ua8-k-tl { transform: translate(-3px, -3px); }
.hb-ua8:focus-within .hb-ua8-k-tr { transform: translate(3px, -3px); }
.hb-ua8:focus-within .hb-ua8-k-bl { transform: translate(-3px, 3px); }
.hb-ua8:focus-within .hb-ua8-k-br { transform: translate(3px, 3px); }
.hb-ua8-icon { flex: 0 0 auto; width: 14px; height: 14px; color: #8f8f8f; transition: color .2s ease; }
.hb-ua8:focus-within .hb-ua8-icon { color: var(--hb-ua8-accent); }
.hb-ua8-input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: .06em;
  caret-color: var(--hb-ua8-accent);
}
.hb-ua8-input::placeholder { color: #5f5f5f; text-transform: uppercase; letter-spacing: .14em; font-size: 10px; }
.hb-ua8-input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.hb-ua8-mono {
  flex: 0 0 auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  letter-spacing: .14em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-ua8-count { color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-ua8-count b { font-weight: 400; color: #ededed; }
.hb-ua8-clear {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.14);
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
  animation: hb-ua8-pop .2s ease-out;
  transition: color .15s ease, border-color .15s ease;
}
.hb-ua8-clear:hover { color: #fff; border-color: var(--hb-ua8-accent); }
.hb-ua8-clear:focus-visible { outline: 1px solid var(--hb-ua8-accent); outline-offset: 2px; }
.hb-ua8-clear svg { width: 8px; height: 8px; }
.hb-ua8-kbd {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 1px solid rgba(255,255,255,.18);
  color: #a1a1a1;
  letter-spacing: 0;
}
@keyframes hb-ua8-pop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ua8, .hb-ua8-k, .hb-ua8-icon, .hb-ua8-clear { transition: none; animation: none; }
}
`;

export function HudSearchField({
  value,
  defaultValue = "",
  onChange,
  resultCount,
  total,
  shortcut = "/",
  label = "Search",
  accent = "#ff4d4d",
  placeholder = "Search experiments",
  className,
  style,
  onKeyDown,
  onFocus,
  onBlur,
  ...rest
}: HudSearchFieldProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const current = value ?? inner;

  const set = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== shortcut || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  return (
    <div
      className={["hb-ua8", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua8-accent" as string]: accent, ...style }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
    >
      <style href="hb-hud-search-field" precedence="default">{css}</style>
      <span className="hb-ua8-k hb-ua8-k-tl" aria-hidden="true" />
      <span className="hb-ua8-k hb-ua8-k-tr" aria-hidden="true" />
      <span className="hb-ua8-k hb-ua8-k-bl" aria-hidden="true" />
      <span className="hb-ua8-k hb-ua8-k-br" aria-hidden="true" />
      <svg className="hb-ua8-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <circle cx="6" cy="6" r="4.2" />
        <path d="M9.2 9.2 12.5 12.5" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        className="hb-ua8-input"
        aria-label={label}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        value={current}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "Escape") {
            e.preventDefault();
            if (current) set("");
            else e.currentTarget.blur();
          }
        }}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
      {current ? (
        <button
          type="button"
          className="hb-ua8-clear"
          aria-label="Clear search"
          onClick={() => {
            set("");
            inputRef.current?.focus();
          }}
        >
          <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M1 1l6 6M7 1 1 7" />
          </svg>
        </button>
      ) : null}
      {resultCount !== undefined ? (
        <span className="hb-ua8-mono hb-ua8-count" aria-live="polite">
          <b>{String(resultCount).padStart(2, "0")}</b>
          {total !== undefined ? ` / ${String(total).padStart(2, "0")}` : ` ${resultCount === 1 ? "result" : "results"}`}
        </span>
      ) : null}
      {shortcut && !focused && !current ? (
        <kbd className="hb-ua8-mono hb-ua8-kbd" aria-hidden="true">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}

export default HudSearchField;

"use client";

import * as React from "react";

export interface FieldAutosizeTextareaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "onSubmit"> {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  limit?: number;
  minRows?: number;
  maxRows?: number;
  submitLabel?: string;
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-xg6 {
  --hb-xg6-c: #2f7bff;
  --hb-xg6-lh: 21px;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg6 *, .hb-xg6 *::before, .hb-xg6 *::after { box-sizing: border-box; }
.hb-xg6-label { display: block; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg6-box {
  border: 1px solid #262626;
  border-radius: 14px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg6-box:hover { border-color: #333; }
.hb-xg6-box:focus-within {
  border-color: var(--hb-xg6-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg6-c) 16%, transparent);
}
.hb-xg6[data-over="true"] .hb-xg6-box:focus-within { border-color: #ff5c5c; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px rgba(255, 92, 92, 0.14); }
.hb-xg6[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-xg6-area { position: relative; }
.hb-xg6-ta, .hb-xg6-back, .hb-xg6-mirror {
  display: block;
  width: 100%;
  margin: 0;
  padding: 12px 14px 4px;
  border: 0;
  font: inherit;
  font-size: 14px;
  line-height: var(--hb-xg6-lh);
  letter-spacing: 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}
.hb-xg6-ta {
  position: relative;
  z-index: 1;
  resize: none;
  outline: 0;
  background: transparent;
  color: #ededed;
  caret-color: var(--hb-xg6-c);
  overflow-y: hidden;
  transition: height 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  scrollbar-width: thin;
}
.hb-xg6-ta::placeholder { color: #5a5a5a; }
.hb-xg6-ta[data-scroll="true"] { overflow-y: auto; }
.hb-xg6-back {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: transparent;
  pointer-events: none;
}
.hb-xg6-back mark { color: transparent; background: rgba(255, 92, 92, 0.22); border-radius: 3px; box-shadow: 0 2px 0 -0.5px #ff5c5c; }
.hb-xg6-mirror { position: absolute; top: 0; left: 0; visibility: hidden; pointer-events: none; height: auto; }
.hb-xg6-foot { display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 8px 0 14px; }
.hb-xg6-stats { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-xg6-stats kbd { font-family: inherit; padding: 1px 4px; border: 1px solid #2a2a2a; border-radius: 4px; color: #8f8f8f; font-size: 10.5px; }
.hb-xg6-ring { position: relative; display: grid; place-items: center; width: 26px; height: 26px; flex: none; }
.hb-xg6-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg6-ring circle { fill: none; stroke-width: 2.4; }
.hb-xg6-track { stroke: #262626; }
.hb-xg6-fill { stroke: var(--hb-xg6-c); stroke-linecap: round; transition: stroke-dashoffset 0.25s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.25s ease; }
.hb-xg6[data-level="warn"] .hb-xg6-fill { stroke: #f5a524; }
.hb-xg6[data-level="over"] .hb-xg6-fill { stroke: #ff5c5c; }
.hb-xg6[data-level="warn"] .hb-xg6-ring svg, .hb-xg6[data-level="over"] .hb-xg6-ring svg { transform: rotate(-90deg) scale(1.18); }
.hb-xg6-left { position: relative; font-size: 10px; font-weight: 600; font-variant-numeric: tabular-nums; color: #f5a524; opacity: 0; transform: scale(0.6); transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg6[data-level="warn"] .hb-xg6-left, .hb-xg6[data-level="over"] .hb-xg6-left { opacity: 1; transform: none; }
.hb-xg6[data-level="over"] .hb-xg6-left { color: #ff6b6b; }
.hb-xg6[data-level="over"] .hb-xg6-ring { animation: hb-xg6-nudge 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xg6-div { width: 1px; height: 20px; background: #262626; flex: none; }
.hb-xg6-send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffffff, #dcdcdc);
  box-shadow: inset 0 1px 0 #fff, 0 4px 12px -6px rgba(255, 255, 255, 0.4);
  color: #0a0a0a;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, filter 0.2s ease;
}
.hb-xg6-send:hover:not(:disabled) { filter: brightness(1.05); }
.hb-xg6-send:active:not(:disabled) { transform: scale(0.95); }
.hb-xg6-send:disabled { opacity: 0.3; cursor: not-allowed; }
.hb-xg6-send:focus-visible { outline: 2px solid var(--hb-xg6-c); outline-offset: 2px; }
.hb-xg6-send svg { width: 12px; height: 12px; }
.hb-xg6[data-sent="a"] .hb-xg6-send { animation: hb-xg6-sent-a 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg6[data-sent="b"] .hb-xg6-send { animation: hb-xg6-sent-b 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xg6-nudge { 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
@keyframes hb-xg6-sent-a { 40% { transform: scale(1.08); } }
@keyframes hb-xg6-sent-b { 40% { transform: scale(1.08); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg6 *, .hb-xg6 * svg { transition: none !important; animation: none !important; }
}
`;

export function FieldAutosizeTextarea({
  label = "Message",
  placeholder = "Write something worth reading…",
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  limit = 280,
  minRows = 2,
  maxRows = 8,
  submitLabel = "Post",
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: FieldAutosizeTextareaProps) {
  const id = React.useId();
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const mirrorRef = React.useRef<HTMLDivElement>(null);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const [sent, setSent] = React.useState(0);
  const text = controlled ? value : inner;
  const len = [...text].length;
  const left = limit - len;
  const level = left < 0 ? "over" : left <= Math.max(10, Math.round(limit * 0.1)) ? "warn" : "ok";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 230));

  React.useLayoutEffect(() => {
    const ta = taRef.current;
    const mirror = mirrorRef.current;
    if (!ta || !mirror) return;
    const lh = 21;
    const padY = 16;
    const min = minRows * lh + padY;
    const max = maxRows * lh + padY;
    const h = Math.min(max, Math.max(min, mirror.scrollHeight));
    ta.style.height = `${h}px`;
    ta.dataset.scroll = mirror.scrollHeight > max ? "true" : "false";
    if (backRef.current) backRef.current.scrollTop = ta.scrollTop;
  }, [text, minRows, maxRows]);

  function update(v: string) {
    if (!controlled) setInner(v);
    onChange?.(v);
  }

  function submit() {
    if (!text.trim() || left < 0 || disabled) return;
    onSubmit?.(text);
    setSent((s) => s + 1);
  }

  const chars = [...text];
  const within = chars.slice(0, limit).join("");
  const beyond = chars.slice(limit).join("");
  const r = 10;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(1, len / limit));
  const vars = { "--hb-xg6-c": accent, ...style } as React.CSSProperties;

  return (
    <div
      className={`hb-xg6 ${className}`}
      style={vars}
      data-level={level}
      data-over={left < 0}
      data-sent={sent === 0 ? "none" : sent % 2 === 1 ? "a" : "b"}
      data-disabled={disabled}
      {...rest}
    >
      <style href="hb-field-autosize-textarea" precedence="default">{css}</style>
      {label && (
        <label className="hb-xg6-label" htmlFor={`${id}-ta`}>
          {label}
        </label>
      )}
      <div className="hb-xg6-box">
        <div className="hb-xg6-area">
          <div ref={backRef} className="hb-xg6-back" aria-hidden="true">
            {within}
            {beyond && <mark>{beyond}</mark>}
          </div>
          <div ref={mirrorRef} className="hb-xg6-mirror" aria-hidden="true">
            {text}
            {"​"}
          </div>
          <textarea
            ref={taRef}
            id={`${id}-ta`}
            className="hb-xg6-ta"
            rows={minRows}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={left < 0}
            aria-describedby={`${id}-st`}
            onChange={(e) => update(e.target.value)}
            onScroll={(e) => {
              if (backRef.current) backRef.current.scrollTop = e.currentTarget.scrollTop;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                submit();
              }
            }}
          />
        </div>
        <div className="hb-xg6-foot">
          <span className="hb-xg6-stats" id={`${id}-st`}>
            {words} {words === 1 ? "word" : "words"} · {minutes} min read · <kbd>⌘</kbd> <kbd>↵</kbd> to send
          </span>
          <span className="hb-xg6-ring" aria-hidden="true">
            <svg viewBox="0 0 26 26">
              <circle className="hb-xg6-track" cx="13" cy="13" r={r} />
              <circle className="hb-xg6-fill" cx="13" cy="13" r={r} strokeDasharray={circ.toFixed(2)} strokeDashoffset={offset.toFixed(2)} />
            </svg>
            <span className="hb-xg6-left">{left < -99 ? "-99" : left}</span>
          </span>
          <span className="hb-xg6-sr" aria-live="polite">
            {level === "over" ? `${-left} characters over the limit` : level === "warn" ? `${left} characters left` : ""}
          </span>
          <span className="hb-xg6-div" aria-hidden="true" />
          <button type="button" className="hb-xg6-send" disabled={disabled || !text.trim() || left < 0} onClick={submit}>
            {submitLabel}
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M2 6h7.5M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";

export interface MicroQuantityPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  addLabel?: string;
  itemLabel?: string;
  accent?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const css = `
.hb-wf10 {
  --hb-wf10-c: #2f7bff;
  --hb-wf10-w: 132px;
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 42px;
  width: var(--hb-wf10-w);
  box-sizing: border-box;
  border-radius: 999px;
  background: var(--hb-wf10-c);
  color: #fff;
  font-family: inherit;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 22px -10px color-mix(in srgb, var(--hb-wf10-c) 80%, transparent);
  transition: width 0.45s cubic-bezier(0.3, 1.35, 0.45, 1), background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
}
.hb-wf10 *, .hb-wf10 *::before, .hb-wf10 *::after { box-sizing: border-box; }
.hb-wf10[data-open="true"] {
  width: 132px;
  background: linear-gradient(180deg, #1c1c1c, #141414);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px #2a2a2a, 0 10px 22px -12px rgba(0,0,0,0.9);
}
.hb-wf10[data-disabled="true"] { opacity: 0.45; pointer-events: none; }
.hb-wf10-add {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px 0 16px;
  margin: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-wf10-add:active { transform: scale(0.96); }
.hb-wf10-add:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-wf10-add svg { width: 16px; height: 16px; flex: none; }
.hb-wf10[data-open="true"] .hb-wf10-add { opacity: 0; transform: scale(0.85); pointer-events: none; }
.hb-wf10-ms {
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font-size: 13.5px;
  font-weight: 600;
  padding: 0 18px 0 16px;
  display: inline-flex;
  gap: 8px;
}
.hb-wf10-st {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease 0.08s;
}
.hb-wf10[data-open="true"] .hb-wf10-st { opacity: 1; pointer-events: auto; }
.hb-wf10-b {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #262626;
  color: #e6e6e6;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.8, 0.4, 1);
}
.hb-wf10-b:hover { background: #303030; color: #fff; }
.hb-wf10-b:active { transform: scale(0.86); }
.hb-wf10-b:focus-visible { outline: 2px solid var(--hb-wf10-c); outline-offset: 2px; }
.hb-wf10-b:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-wf10-b[data-del="true"] { color: #ff6b6b; }
.hb-wf10-b[data-del="true"]:hover { background: rgba(255,107,107,0.14); }
.hb-wf10-b svg { position: absolute; width: 15px; height: 15px; transition: opacity 0.18s ease, transform 0.28s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-wf10-b .hb-wf10-tr { opacity: 0; transform: scale(0.4) rotate(-30deg); }
.hb-wf10-b[data-del="true"] .hb-wf10-tr { opacity: 1; transform: none; }
.hb-wf10-b[data-del="true"] .hb-wf10-mn { opacity: 0; transform: scale(0.4) rotate(30deg); }
.hb-wf10-b[data-shake="a"] { animation: hb-wf10-shake 0.36s ease; }
.hb-wf10-b[data-shake="b"] { animation: hb-wf10-shake2 0.36s ease; }
@keyframes hb-wf10-shake { 20% { translate: 3px 0; } 45% { translate: -3px 0; } 70% { translate: 2px 0; } 100% { translate: 0 0; } }
@keyframes hb-wf10-shake2 { 20% { translate: 3px 0; } 45% { translate: -3px 0; } 70% { translate: 2px 0; } 100% { translate: 0 0; } }
.hb-wf10-n {
  position: relative;
  flex: 1;
  height: 22px;
  overflow: hidden;
  text-align: center;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  font-variant-numeric: tabular-nums;
}
.hb-wf10-n span { display: block; }
.hb-wf10-n[data-dir="1"] span { animation: hb-wf10-up 0.32s cubic-bezier(0.2, 1.4, 0.4, 1); }
.hb-wf10-n[data-dir="-1"] span { animation: hb-wf10-dn 0.32s cubic-bezier(0.2, 1.4, 0.4, 1); }
@keyframes hb-wf10-up { from { transform: translateY(100%); } to { transform: none; } }
@keyframes hb-wf10-dn { from { transform: translateY(-100%); } to { transform: none; } }
.hb-wf10-fx {
  position: absolute;
  right: 10px;
  top: -4px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--hb-wf10-c);
  pointer-events: none;
  animation: hb-wf10-fx 0.7s cubic-bezier(0.2, 0.8, 0.3, 1) both;
}
@keyframes hb-wf10-fx { 0% { opacity: 0; transform: translateY(6px) scale(0.7); } 25% { opacity: 1; transform: translateY(-4px) scale(1); } 100% { opacity: 0; transform: translateY(-20px) scale(0.9); } }
.hb-wf10-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf10, .hb-wf10-add, .hb-wf10-st, .hb-wf10-b, .hb-wf10-b svg { transition: none; }
  .hb-wf10-n span, .hb-wf10-fx, .hb-wf10-b[data-shake] { animation: none; }
  .hb-wf10-fx { display: none; }
}
`;

export function MicroQuantityPicker({
  value,
  defaultValue = 0,
  max = 9,
  addLabel = "Add to bag",
  itemLabel = "item",
  accent = "#2f7bff",
  disabled = false,
  onChange,
  className = "",
  style,
  ...rest
}: MicroQuantityPickerProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value ?? inner;
  const [dir, setDir] = React.useState(0);
  const [tick, setTick] = React.useState(0);
  const [fx, setFx] = React.useState(0);
  const [shake, setShake] = React.useState(0);
  const [w, setW] = React.useState<number | null>(null);
  const msRef = React.useRef<HTMLSpanElement>(null);
  const addRef = React.useRef<HTMLButtonElement>(null);
  const plusRef = React.useRef<HTMLButtonElement>(null);
  const open = v > 0;
  const wasOpen = React.useRef(open);

  React.useLayoutEffect(() => {
    const el = msRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(Math.ceil(el.getBoundingClientRect().width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [addLabel]);

  React.useEffect(() => {
    if (open && !wasOpen.current) plusRef.current?.focus({ preventScroll: true });
    if (!open && wasOpen.current) addRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  const set = (next: number) => {
    const c = Math.max(0, Math.min(max, next));
    if (c === v) {
      setShake((s) => s + 1);
      return;
    }
    setDir(c > v ? 1 : -1);
    setTick((t) => t + 1);
    if (c > v) setFx((f) => f + 1);
    if (value === undefined) setInner(c);
    onChange?.(c);
  };

  return (
    <div
      className={`hb-wf10 ${className}`}
      data-open={open}
      data-disabled={disabled}
      role="group"
      aria-label={`${addLabel} quantity`}
      style={{ ...style, ["--hb-wf10-c" as string]: accent, ["--hb-wf10-w" as string]: w ? `${w}px` : "auto" }}
      {...rest}
    >
      <style href="hb-micro-quantity-picker" precedence="default">
        {css}
      </style>
      <span ref={msRef} className="hb-wf10-ms" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" />
        {addLabel}
      </span>
      <button ref={addRef} type="button" className="hb-wf10-add" tabIndex={open ? -1 : 0} aria-hidden={open} onClick={() => set(1)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.2 5.5h9.6l-.8 7.2a1.4 1.4 0 0 1-1.4 1.3H5.4A1.4 1.4 0 0 1 4 12.7z" />
          <path d="M5.8 5.5V4.6a2.2 2.2 0 0 1 4.4 0v.9" />
        </svg>
        {addLabel}
      </button>
      <div className="hb-wf10-st" aria-hidden={!open}>
        <button
          type="button"
          className="hb-wf10-b"
          data-del={v === 1}
          tabIndex={open ? 0 : -1}
          aria-label={v === 1 ? "Remove from bag" : `One less ${itemLabel}`}
          onClick={() => set(v - 1)}
        >
          <svg className="hb-wf10-mn" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 8h9" />
          </svg>
          <svg className="hb-wf10-tr" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.8 4.4h10.4M6.2 4.4V3a1 1 0 0 1 1-1h1.6a1 1 0 0 1 1 1v1.4M4.2 4.4l.6 8.4a1.3 1.3 0 0 0 1.3 1.2h3.8a1.3 1.3 0 0 0 1.3-1.2l.6-8.4" />
          </svg>
        </button>
        <span className="hb-wf10-n" data-dir={dir}>
          <span key={tick}>{v}</span>
        </span>
        <button
          ref={plusRef}
          type="button"
          className="hb-wf10-b"
          data-shake={shake ? (shake % 2 ? "a" : "b") : undefined}
          tabIndex={open ? 0 : -1}
          aria-label={`One more ${itemLabel}`}
          aria-disabled={v >= max}
          onClick={() => set(v + 1)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 8h9M8 3.5v9" />
          </svg>
        </button>
        {fx > 0 ? (
          <span key={fx} className="hb-wf10-fx" aria-hidden="true">
            +1
          </span>
        ) : null}
      </div>
      <span className="hb-wf10-sr" aria-live="polite">
        {open ? `${v} in bag` : ""}
      </span>
    </div>
  );
}

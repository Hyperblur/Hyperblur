"use client";

import * as React from "react";

export interface MicroSpringStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
  accent?: string;
  disabled?: boolean;
  haptics?: boolean;
  onChange?: (value: number) => void;
}

const css = `
.hb-wf3 {
  --hb-wf3-c: #2f7bff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 20px;
  background: linear-gradient(180deg, #161616 0%, #0f0f0f 100%);
  border: 1px solid #262626;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px -12px rgba(0,0,0,0.9);
  font-family: inherit;
  color: #ededed;
  user-select: none;
  -webkit-user-select: none;
}
.hb-wf3 *, .hb-wf3 *::before, .hb-wf3 *::after { box-sizing: border-box; }
.hb-wf3[data-disabled="true"] { opacity: 0.45; pointer-events: none; }
.hb-wf3-b {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: linear-gradient(180deg, #1f1f1f, #171717);
  color: #cfcfcf;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 0 #050505;
  transition: transform 0.28s cubic-bezier(0.3, 1.8, 0.4, 1), background 0.2s ease, color 0.2s ease, box-shadow 0.15s ease;
}
.hb-wf3-b:hover { background: linear-gradient(180deg, #252525, #1b1b1b); color: #fff; }
.hb-wf3-b:active { transform: translateY(2px) scale(0.94, 0.88); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 #050505; transition-duration: 0.06s; }
.hb-wf3-b:focus-visible { outline: 2px solid var(--hb-wf3-c); outline-offset: 2px; }
.hb-wf3-b:disabled { opacity: 0.3; cursor: not-allowed; }
.hb-wf3-b svg { width: 16px; height: 16px; }
.hb-wf3-well {
  position: relative;
  width: 108px;
  height: 46px;
  border-radius: 14px;
  background: #080808;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.8), inset 0 0 0 1px #1c1c1c;
}
.hb-wf3-gl {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  margin-top: -9px;
  color: #3a3a3a;
  transition: color 0.2s ease, transform 0.2s ease;
}
.hb-wf3-gl[data-d="-1"] { left: 4px; }
.hb-wf3-gl[data-d="1"] { right: 4px; }
.hb-wf3-gl[data-hot="true"] { color: var(--hb-wf3-c); }
.hb-wf3-gl svg { width: 100%; height: 100%; }
.hb-wf3-pill {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 4px;
  bottom: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: linear-gradient(180deg, #262626 0%, #1b1b1b 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 3px 8px rgba(0,0,0,0.6);
  cursor: grab;
  touch-action: none;
  overflow: hidden;
  outline: none;
  transition: transform 0.5s cubic-bezier(0.25, 1.9, 0.4, 1), box-shadow 0.2s ease;
}
.hb-wf3-pill:focus-visible { box-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 0 0 2px var(--hb-wf3-c); }
.hb-wf3[data-drag="true"] .hb-wf3-pill { cursor: grabbing; transition: none; }
.hb-wf3-in[data-bump="1"] { animation: hb-wf3-bumpr 0.32s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-wf3-in[data-bump="-1"] { animation: hb-wf3-bumpl 0.32s cubic-bezier(0.3, 1.6, 0.5, 1); }
@keyframes hb-wf3-bumpr { 0% { translate: 0 0; } 30% { translate: 5px 0; } 60% { translate: -2px 0; } 100% { translate: 0 0; } }
@keyframes hb-wf3-bumpl { 0% { translate: 0 0; } 30% { translate: -5px 0; } 60% { translate: 2px 0; } 100% { translate: 0 0; } }
.hb-wf3-in { display: flex; flex-direction: column; align-items: center; }
.hb-wf3-num {
  position: relative;
  height: 20px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
.hb-wf3-num span { display: block; }
.hb-wf3-num[data-dir="1"] span { animation: hb-wf3-up 0.26s cubic-bezier(0.2, 1.3, 0.4, 1); }
.hb-wf3-num[data-dir="-1"] span { animation: hb-wf3-down 0.26s cubic-bezier(0.2, 1.3, 0.4, 1); }
@keyframes hb-wf3-up { from { transform: translateY(70%); opacity: 0; filter: blur(2px); } to { transform: none; opacity: 1; filter: none; } }
@keyframes hb-wf3-down { from { transform: translateY(-70%); opacity: 0; filter: blur(2px); } to { transform: none; opacity: 1; filter: none; } }
.hb-wf3-u { font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #7c7c7c; line-height: 1; margin-top: 1px; }
.hb-wf3-rate {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background: var(--hb-wf3-c);
  border-radius: 2px;
  opacity: 0.85;
  transition: width 0.12s ease;
}
@media (prefers-reduced-motion: reduce) {
  .hb-wf3-b, .hb-wf3-pill, .hb-wf3-gl, .hb-wf3-rate { transition: none; }
  .hb-wf3-num span, .hb-wf3-in[data-bump] { animation: none; }
}
`;

const reach = 26;

export function MicroSpringStepper({
  value,
  defaultValue = 2,
  min = 0,
  max = 12,
  step = 1,
  label = "Guests",
  unit = "guests",
  accent = "#2f7bff",
  disabled = false,
  haptics = true,
  onChange,
  className = "",
  style,
  ...rest
}: MicroSpringStepperProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value ?? inner;
  const [dir, setDir] = React.useState(0);
  const [tick, setTick] = React.useState(0);
  const [bump, setBump] = React.useState<{ d: number; n: number }>({ d: 0, n: 0 });
  const [off, setOff] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const live = React.useRef({ v, off: 0, acc: 0, last: 0, raf: 0, startX: 0 });
  const handlers = React.useRef({ onChange, haptics, value, min, max, step });

  React.useEffect(() => {
    handlers.current = { onChange, haptics, value, min, max, step };
    live.current.v = v;
  });

  const nudge = React.useCallback((d: number) => {
    const h = handlers.current;
    const cur = live.current.v;
    const next = Math.min(h.max, Math.max(h.min, cur + d * h.step));
    if (next === cur) {
      setBump((b) => ({ d, n: b.n + 1 }));
      if (h.haptics && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([4, 30, 4]);
      return;
    }
    live.current.v = next;
    if (h.value === undefined) setInner(next);
    setDir(Math.sign(d));
    setTick((t) => t + 1);
    if (h.haptics && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(6);
    h.onChange?.(next);
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const s = live.current;
    s.last = performance.now();
    s.acc = 0;
    const loop = (t: number) => {
      const dt = t - s.last;
      s.last = t;
      const mag = Math.abs(s.off) / reach;
      if (mag > 0.3) {
        const interval = 460 - 390 * Math.min(1, (mag - 0.3) / 0.65);
        s.acc += dt;
        if (s.acc >= interval) {
          s.acc = 0;
          nudge(s.off > 0 ? 1 : -1);
        }
      } else {
        s.acc = 380;
      }
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.raf);
  }, [dragging, nudge]);

  const end = () => {
    live.current.off = 0;
    setOff(0);
    setDragging(false);
  };

  const mag = Math.min(1, Math.abs(off) / reach);
  const hotDir = mag > 0.3 ? (off > 0 ? 1 : -1) : 0;

  return (
    <div
      className={`hb-wf3 ${className}`}
      data-drag={dragging}
      data-disabled={disabled}
      style={{ ...style, ["--hb-wf3-c" as string]: accent }}
      {...rest}
    >
      <style href="hb-micro-spring-stepper" precedence="default">
        {css}
      </style>
      <button type="button" className="hb-wf3-b" aria-label={`Fewer ${unit}`} disabled={disabled || v <= min} onClick={() => nudge(-1)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3.5 8h9" />
        </svg>
      </button>
      <div className="hb-wf3-well">
        <span className="hb-wf3-gl" data-d="-1" data-hot={hotDir === -1} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8l4 4" />
          </svg>
        </span>
        <span className="hb-wf3-gl" data-d="1" data-hot={hotDir === 1} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </span>
        <div
          role="spinbutton"
          tabIndex={disabled ? -1 : 0}
          aria-label={label}
          aria-valuenow={v}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={`${v} ${unit}`}
          className="hb-wf3-pill"
          style={{ transform: `translateX(${off.toFixed(2)}px) scaleX(${(1 - mag * 0.06).toFixed(3)})` }}
          onPointerDown={(e) => {
            if (disabled) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            live.current.startX = e.clientX;
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (!dragging) return;
            const dx = e.clientX - live.current.startX;
            const o = Math.sign(dx) * reach * (1 - Math.exp(-Math.abs(dx) / (reach * 1.6)));
            live.current.off = o;
            setOff(o);
          }}
          onPointerUp={end}
          onPointerCancel={end}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowRight") {
              e.preventDefault();
              nudge(1);
            } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
              e.preventDefault();
              nudge(-1);
            } else if (e.key === "PageUp") {
              e.preventDefault();
              for (let i = 0; i < 5; i++) nudge(1);
            } else if (e.key === "PageDown") {
              e.preventDefault();
              for (let i = 0; i < 5; i++) nudge(-1);
            } else if (e.key === "Home") {
              e.preventDefault();
              nudge(-(v - min) / step);
            } else if (e.key === "End") {
              e.preventDefault();
              nudge((max - v) / step);
            }
          }}
        >
          <span key={`b${bump.n}`} className="hb-wf3-in" data-bump={bump.n ? bump.d : undefined}>
            <span className="hb-wf3-num" data-dir={dir}>
              <span key={tick}>{v}</span>
            </span>
            <span className="hb-wf3-u">{unit}</span>
          </span>
          <span className="hb-wf3-rate" style={{ width: `${(mag * 100).toFixed(0)}%`, left: off < 0 ? "auto" : 0, right: off < 0 ? 0 : "auto" }} />
        </div>
      </div>
      <button type="button" className="hb-wf3-b" aria-label={`More ${unit}`} disabled={disabled || v >= max} onClick={() => nudge(1)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3.5 8h9M8 3.5v9" />
        </svg>
      </button>
    </div>
  );
}

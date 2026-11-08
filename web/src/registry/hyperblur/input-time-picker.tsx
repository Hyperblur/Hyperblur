"use client";

import * as React from "react";

export interface InputTimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hourCycle?: 12 | 24;
  step?: number;
  size?: number;
  accent?: string;
}

const css = `
.hb-xg9 {
  --hb-xg9-c: #2f7bff;
  --hb-xg9-size: 176px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg9 *, .hb-xg9 *::before, .hb-xg9 *::after { box-sizing: border-box; }
.hb-xg9-side { display: flex; flex: 1 1 120px; flex-direction: column; gap: 10px; min-width: 0; }
.hb-xg9-label { margin: 0; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg9-read { display: flex; align-items: center; gap: 2px; }
.hb-xg9-seg {
  position: relative;
  margin: 0;
  padding: 2px 6px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #6f6f6f;
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: 38px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: color 0.25s ease, background 0.25s ease;
}
.hb-xg9-seg:hover { color: #a1a1a1; }
.hb-xg9-seg[aria-pressed="true"] { color: #fff; background: color-mix(in srgb, var(--hb-xg9-c) 16%, transparent); }
.hb-xg9-seg:focus-visible { outline: 2px solid var(--hb-xg9-c); outline-offset: 1px; }
.hb-xg9-colon { font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 34px; color: #3a3a3a; line-height: 1; animation: hb-xg9-blink 1.2s steps(2, jump-none) infinite; }
.hb-xg9-mer { display: inline-flex; padding: 3px; border: 1px solid #222; border-radius: 10px; background: #0f0f0f; width: max-content; }
.hb-xg9-mer button {
  position: relative;
  min-width: 40px;
  height: 26px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: color 0.2s ease, background 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease;
}
.hb-xg9-mer button[aria-pressed="true"] { color: #fff; background: linear-gradient(180deg, #262626, #1b1b1b); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 1px 3px rgba(0, 0, 0, 0.6); }
.hb-xg9-mer button:focus-visible { outline: 2px solid var(--hb-xg9-c); outline-offset: 1px; }
.hb-xg9-cap { margin: 0; font-size: 11.5px; color: #6f6f6f; }
.hb-xg9-cap b { font-weight: 500; color: #a1a1a1; }
.hb-xg9-dial {
  position: relative;
  width: var(--hb-xg9-size);
  height: var(--hb-xg9-size);
  flex: none;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #0d0d0d 0 28%, transparent 29%),
    radial-gradient(circle at 50% 35%, #1a1a1a, #101010 70%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px #222, 0 18px 36px -18px rgba(0, 0, 0, 0.9);
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
  outline: 0;
}
.hb-xg9-dial:active { cursor: grabbing; }
.hb-xg9-dial:focus-visible { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px #222, 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-xg9-c); }
.hb-xg9-ticks { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.hb-xg9-ticks line { stroke: #2a2a2a; stroke-width: 1; }
.hb-xg9-ticks line[data-major="true"] { stroke: #3a3a3a; stroke-width: 1.4; }
.hb-xg9-hand {
  position: absolute;
  left: 50%;
  top: calc(50% - var(--hb-xg9-len));
  width: 2px;
  height: var(--hb-xg9-len);
  margin-left: -1px;
  border-radius: 2px;
  background: linear-gradient(to top, color-mix(in srgb, var(--hb-xg9-c) 30%, transparent), var(--hb-xg9-c));
  transform-origin: 50% 100%;
  transform: rotate(var(--hb-xg9-rot));
  transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), top 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.hb-xg9[data-drag="true"] .hb-xg9-hand { transition: height 0.3s ease, top 0.3s ease; }
.hb-xg9-knob {
  position: absolute;
  left: 50%;
  top: -15px;
  width: 30px;
  height: 30px;
  margin-left: -15px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--hb-xg9-c) 65%, #fff), var(--hb-xg9-c) 70%);
  box-shadow: 0 6px 16px -4px color-mix(in srgb, var(--hb-xg9-c) 70%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
.hb-xg9-knob[data-off="true"] { width: 10px; height: 10px; top: -5px; margin-left: -5px; }
.hb-xg9-hub { position: absolute; left: 50%; top: 50%; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--hb-xg9-c); box-shadow: 0 0 0 3px #0d0d0d; pointer-events: none; }
.hb-xg9-nums { position: absolute; inset: 0; pointer-events: none; animation: hb-xg9-swap 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xg9-num {
  position: absolute;
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
  display: grid;
  place-items: center;
  font-size: 12.5px;
  font-weight: 500;
  color: #a1a1a1;
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease;
}
.hb-xg9-num[data-inner="true"] { font-size: 10.5px; color: #6f6f6f; }
.hb-xg9-num[data-on="true"] { color: #fff; font-weight: 600; }
.hb-xg9-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xg9-swap { from { opacity: 0; transform: scale(1.12); } }
@keyframes hb-xg9-blink { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg9 *, .hb-xg9-nums { transition: none !important; animation: none !important; }
}
`;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parse(v: string) {
  const r = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!r) return { h: 9, m: 0 };
  return { h: Math.min(23, Number(r[1])), m: Math.min(59, Number(r[2])) };
}

export function InputTimePicker({
  label = "Start time",
  value,
  defaultValue = "09:30",
  onChange,
  hourCycle = 12,
  step = 5,
  size = 176,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: InputTimePickerProps) {
  const id = React.useId();
  const dialRef = React.useRef<HTMLDivElement>(null);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const { h, m } = parse(controlled ? value : inner);
  const [mode, setMode] = React.useState<"hour" | "minute">("hour");
  const [drag, setDrag] = React.useState(false);
  const [rot, setRot] = React.useState(() => ((parse(value ?? defaultValue).h % 12) * 30));

  const isInner = hourCycle === 24 && (h === 0 || h > 12);
  const target = mode === "hour" ? (h % 12) * 30 : m * 6;
  const norm = ((rot % 360) + 360) % 360;
  const shownRot = Math.abs(norm - target) < 0.01 ? rot : rot + ((((target - norm) % 360) + 540) % 360) - 180;

  function aim(deg: number) {
    setRot((r) => r + ((((deg - r) % 360) + 540) % 360) - 180);
  }

  function emit(nh: number, nm: number) {
    const v = `${pad(nh)}:${pad(nm)}`;
    if (!controlled) setInner(v);
    onChange?.(v);
  }

  function setHour(nh: number) {
    const hh = ((nh % 24) + 24) % 24;
    emit(hh, m);
    if (mode === "hour") aim((hh % 12) * 30);
  }

  function setMinute(nm: number) {
    const mm = ((nm % 60) + 60) % 60;
    emit(h, mm);
    if (mode === "minute") aim(mm * 6);
  }

  function switchMode(next: "hour" | "minute") {
    setMode(next);
    aim(next === "hour" ? (h % 12) * 30 : m * 6);
  }

  function fromPointer(e: React.PointerEvent, snap: boolean) {
    const el = dialRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const deg = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
    const dist = Math.hypot(dx, dy) / (r.width / 2);
    if (mode === "hour") {
      let idx = Math.round(deg / 30) % 12;
      const innerRing = hourCycle === 24 && dist < 0.62;
      if (hourCycle === 24) idx = innerRing ? (idx === 0 ? 0 : idx + 12) : idx === 0 ? 12 : idx;
      else {
        const pm = h >= 12;
        idx = (idx === 0 ? 0 : idx) + (pm ? 12 : 0);
      }
      emit(idx, m);
      aim((idx % 12) * 30);
    } else {
      let mm = Math.round(deg / 6) % 60;
      if (snap) mm = (Math.round(mm / step) * step) % 60;
      emit(h, mm);
      aim(mm * 6);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    const up = e.key === "ArrowUp" || e.key === "ArrowRight";
    const down = e.key === "ArrowDown" || e.key === "ArrowLeft";
    if (up || down) {
      e.preventDefault();
      if (mode === "hour") setHour(h + (up ? 1 : -1));
      else setMinute(m + (up ? 1 : -1) * (e.shiftKey ? step : 1));
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      if (mode === "minute") setMinute(m + (e.key === "PageUp" ? step : -step));
      else setHour(h + (e.key === "PageUp" ? 3 : -3));
    } else if (e.key === "Enter") {
      e.preventDefault();
      switchMode(mode === "hour" ? "minute" : "hour");
    }
  }

  const half = size / 2;
  const outerR = half - 22;
  const innerR = half * 0.46;
  const hourNums =
    hourCycle === 24
      ? [...Array.from({ length: 12 }, (_, i) => ({ n: i === 0 ? 12 : i, r: outerR, inner: false })), ...Array.from({ length: 12 }, (_, i) => ({ n: i === 0 ? 0 : i + 12, r: innerR, inner: true }))]
      : Array.from({ length: 12 }, (_, i) => ({ n: i === 0 ? 12 : i, r: outerR, inner: false }));
  const minNums = Array.from({ length: 12 }, (_, i) => ({ n: i * 5, r: outerR, inner: false }));
  const nums = mode === "hour" ? hourNums : minNums;
  const len = mode === "hour" && isInner ? innerR : outerR;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const shownHour = hourCycle === 12 ? h12 : h;
  const offStep = mode === "minute" && m % 5 !== 0;

  const vars = {
    "--hb-xg9-c": accent,
    "--hb-xg9-size": `${size}px`,
    "--hb-xg9-rot": `${shownRot.toFixed(2)}deg`,
    "--hb-xg9-len": `${len.toFixed(1)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-xg9 ${className}`} style={vars} data-drag={drag} role="group" aria-labelledby={`${id}-l`} {...rest}>
      <style href="hb-input-time-picker" precedence="default">{css}</style>
      <div className="hb-xg9-side">
        <p className="hb-xg9-label" id={`${id}-l`}>
          {label}
        </p>
        <div className="hb-xg9-read">
          <button type="button" className="hb-xg9-seg" aria-pressed={mode === "hour"} aria-label={`Hour ${shownHour}, edit`} onClick={() => switchMode("hour")}>
            {pad(shownHour)}
          </button>
          <span className="hb-xg9-colon" aria-hidden="true">
            :
          </span>
          <button type="button" className="hb-xg9-seg" aria-pressed={mode === "minute"} aria-label={`Minute ${m}, edit`} onClick={() => switchMode("minute")}>
            {pad(m)}
          </button>
        </div>
        {hourCycle === 12 && (
          <div className="hb-xg9-mer" role="group" aria-label="AM or PM">
            <button type="button" aria-pressed={h < 12} onClick={() => h >= 12 && emit(h - 12, m)}>
              AM
            </button>
            <button type="button" aria-pressed={h >= 12} onClick={() => h < 12 && emit(h + 12, m)}>
              PM
            </button>
          </div>
        )}
        <p className="hb-xg9-cap">
          {mode === "hour" ? (
            <>
              Drag to set the <b>hour</b>
            </>
          ) : (
            <>
              Snaps to <b>{step} min</b>, arrows for 1
            </>
          )}
        </p>
      </div>
      <div
        ref={dialRef}
        className="hb-xg9-dial"
        role="slider"
        tabIndex={0}
        aria-label={mode === "hour" ? "Hour" : "Minute"}
        aria-valuemin={mode === "hour" ? (hourCycle === 12 ? 1 : 0) : 0}
        aria-valuemax={mode === "hour" ? (hourCycle === 12 ? 12 : 23) : 59}
        aria-valuenow={mode === "hour" ? shownHour : m}
        aria-valuetext={`${pad(shownHour)}:${pad(m)}${hourCycle === 12 ? (h < 12 ? " AM" : " PM") : ""}`}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.focus();
          setDrag(true);
          fromPointer(e, true);
        }}
        onPointerMove={(e) => {
          if (drag) fromPointer(e, true);
        }}
        onPointerUp={() => {
          if (!drag) return;
          setDrag(false);
          if (mode === "hour") switchMode("minute");
        }}
        onPointerCancel={() => setDrag(false)}
      >
        <svg className="hb-xg9-ticks" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i * 6 * Math.PI) / 180;
            const major = i % 5 === 0;
            const r1 = half - 4;
            const r2 = half - (major ? 9 : 7);
            return (
              <line
                key={i}
                data-major={major}
                x1={(half + Math.sin(a) * r1).toFixed(2)}
                y1={(half - Math.cos(a) * r1).toFixed(2)}
                x2={(half + Math.sin(a) * r2).toFixed(2)}
                y2={(half - Math.cos(a) * r2).toFixed(2)}
              />
            );
          })}
        </svg>
        <span className="hb-xg9-hand" aria-hidden="true">
          <span className="hb-xg9-knob" data-off={offStep} />
        </span>
        <span className="hb-xg9-hub" aria-hidden="true" />
        <div className="hb-xg9-nums" key={mode} aria-hidden="true">
          {nums.map((n, i) => {
            const a = ((i % 12) * 30 * Math.PI) / 180;
            const on = mode === "hour" ? (hourCycle === 12 ? n.n === h12 : n.n === h) : n.n === m;
            return (
              <span
                key={`${n.n}-${n.inner}`}
                className="hb-xg9-num"
                data-inner={n.inner}
                data-on={on}
                style={{ left: `${(half + Math.sin(a) * n.r).toFixed(2)}px`, top: `${(half - Math.cos(a) * n.r).toFixed(2)}px` }}
              >
                {mode === "minute" ? pad(n.n) : n.n}
              </span>
            );
          })}
        </div>
      </div>
      <span className="hb-xg9-sr" aria-live="polite">
        {`${pad(shownHour)}:${pad(m)}${hourCycle === 12 ? (h < 12 ? " AM" : " PM") : ""}`}
      </span>
    </div>
  );
}

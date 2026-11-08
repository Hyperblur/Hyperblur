"use client";

import * as React from "react";

export interface MicroVolumeKnobProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  segments?: number;
  size?: number;
  label?: string;
  accent?: string;
  muted?: boolean;
  defaultMuted?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onMutedChange?: (muted: boolean) => void;
}

const css = `
.hb-wf4 {
  --hb-wf4-c: #2f7bff;
  --hb-wf4-s: 128px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  user-select: none;
  -webkit-user-select: none;
}
.hb-wf4 *, .hb-wf4 *::before, .hb-wf4 *::after { box-sizing: border-box; }
.hb-wf4[data-disabled="true"] { opacity: 0.45; pointer-events: none; }
.hb-wf4-dial {
  position: relative;
  width: var(--hb-wf4-s);
  height: var(--hb-wf4-s);
  border-radius: 50%;
  outline: none;
  cursor: ns-resize;
  touch-action: none;
}
.hb-wf4-dial:focus-visible .hb-wf4-cap { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wf4-c), 0 10px 22px -6px rgba(0,0,0,0.9); }
.hb-wf4-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wf4-seg { stroke: #232323; stroke-width: 3.2; stroke-linecap: round; transition: stroke 0.12s ease, opacity 0.2s ease; }
.hb-wf4-seg[data-lit="true"] { stroke: var(--hb-wf4-c); }
.hb-wf4-seg[data-peak="true"] { stroke: #ffffff; filter: drop-shadow(0 0 3px var(--hb-wf4-c)); }
.hb-wf4[data-muted="true"] .hb-wf4-seg[data-lit="true"] { stroke: #3a3a3a; filter: none; }
.hb-wf4-tk { fill: #555; font-family: var(--font-mono), ui-monospace, monospace; font-size: 7px; letter-spacing: 0.06em; }
.hb-wf4-well {
  position: absolute;
  inset: 17%;
  border-radius: 50%;
  background: #050505;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.05);
}
.hb-wf4-cap {
  position: absolute;
  inset: 20%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #262626 0%, #1b1b1b 54%, transparent 55%),
    repeating-conic-gradient(from 0deg, #2e2e2e 0deg 4deg, #161616 4deg 8deg);
  box-shadow: 0 10px 22px -6px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: transform 0.32s cubic-bezier(0.25, 1.4, 0.45, 1), box-shadow 0.2s ease;
}
.hb-wf4[data-drag="true"] .hb-wf4-cap { transition: none; }
.hb-wf4-cap::before {
  content: "";
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 30%, #3a3a3a 0%, #1e1e1e 60%, #151515 100%);
  box-shadow: inset 0 -2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12);
}
.hb-wf4-ind {
  position: absolute;
  left: 50%;
  top: 7%;
  width: 3px;
  height: 22%;
  margin-left: -1.5px;
  border-radius: 2px;
  background: var(--hb-wf4-c);
  box-shadow: 0 0 6px var(--hb-wf4-c);
}
.hb-wf4[data-muted="true"] .hb-wf4-ind { background: #5a5a5a; box-shadow: none; }
.hb-wf4-ro {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}
.hb-wf4-v { font-size: 15px; font-weight: 600; min-width: 3ch; text-align: right; }
.hb-wf4-l { font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #777; }
.hb-wf4[data-muted="true"] .hb-wf4-v { color: #ff6a5a; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf4-cap, .hb-wf4-seg { transition: none; }
}
`;

const sweep = 270;

export function MicroVolumeKnob({
  value,
  defaultValue = 62,
  min = 0,
  max = 100,
  step = 1,
  segments = 23,
  size = 128,
  label = "Volume",
  accent = "#2f7bff",
  muted,
  defaultMuted = false,
  disabled = false,
  onChange,
  onMutedChange,
  className = "",
  style,
  ...rest
}: MicroVolumeKnobProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [innerMuted, setInnerMuted] = React.useState(defaultMuted);
  const v = value ?? inner;
  const m = muted ?? innerMuted;
  const [dragging, setDragging] = React.useState(false);
  const dialRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef({ y: 0, base: 0 });
  const api = React.useRef({ v, min, max, step, value, onChange });

  React.useEffect(() => {
    api.current = { v, min, max, step, value, onChange };
  });

  const commit = React.useCallback((raw: number) => {
    const a = api.current;
    const snapped = Math.round(raw / a.step) * a.step;
    const next = Math.min(a.max, Math.max(a.min, Number(snapped.toFixed(4))));
    if (next === a.v) return;
    a.v = next;
    if (a.value === undefined) setInner(next);
    a.onChange?.(next);
  }, []);

  const toggleMute = () => {
    const next = !m;
    if (muted === undefined) setInnerMuted(next);
    onMutedChange?.(next);
  };

  React.useEffect(() => {
    const el = dialRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (document.activeElement !== el) return;
      e.preventDefault();
      const a = api.current;
      commit(a.v - Math.sign(e.deltaY) * a.step * (e.shiftKey ? 1 : 2));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [commit]);

  const p = (v - min) / (max - min || 1);
  const angle = -sweep / 2 + sweep * p;
  const lit = Math.round(p * (segments - 1));
  const segs = Array.from({ length: segments }, (_, i) => {
    const a = ((-sweep / 2 + (sweep * i) / (segments - 1)) * Math.PI) / 180;
    const r1 = 55;
    const r2 = i % 5 === 0 ? 62 : 60;
    return {
      x1: (64 + r1 * Math.sin(a)).toFixed(2),
      y1: (64 - r1 * Math.cos(a)).toFixed(2),
      x2: (64 + r2 * Math.sin(a)).toFixed(2),
      y2: (64 - r2 * Math.cos(a)).toFixed(2),
      on: p > 0 && i <= lit,
      peak: p > 0 && i === lit,
    };
  });

  return (
    <div
      className={`hb-wf4 ${className}`}
      data-drag={dragging}
      data-muted={m}
      data-disabled={disabled}
      style={{ ...style, ["--hb-wf4-c" as string]: accent, ["--hb-wf4-s" as string]: `${size}px` }}
      {...rest}
    >
      <style href="hb-micro-volume-knob" precedence="default">
        {css}
      </style>
      <div
        ref={dialRef}
        className="hb-wf4-dial"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        aria-valuetext={m ? `Muted, ${v}` : `${v}`}
        aria-disabled={disabled || undefined}
        onPointerDown={(e) => {
          if (disabled) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.focus();
          drag.current = { y: e.clientY, base: v };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          const range = max - min;
          const k = e.shiftKey ? 0.25 : 1;
          commit(drag.current.base + ((drag.current.y - e.clientY) / 160) * range * k);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onDoubleClick={toggleMute}
        onKeyDown={(e) => {
          const big = (max - min) / 10;
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            commit(v + step);
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            commit(v - step);
          } else if (e.key === "PageUp") {
            e.preventDefault();
            commit(v + big);
          } else if (e.key === "PageDown") {
            e.preventDefault();
            commit(v - big);
          } else if (e.key === "Home") {
            e.preventDefault();
            commit(min);
          } else if (e.key === "End") {
            e.preventDefault();
            commit(max);
          } else if (e.key === "m" || e.key === "M") {
            e.preventDefault();
            toggleMute();
          }
        }}
      >
        <svg className="hb-wf4-svg" viewBox="0 0 128 128" aria-hidden="true">
          {segs.map((s, i) => (
            <line key={i} className="hb-wf4-seg" data-lit={s.on} data-peak={s.peak} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
          ))}
          <text className="hb-wf4-tk" x="22" y="122" textAnchor="middle">MIN</text>
          <text className="hb-wf4-tk" x="106" y="122" textAnchor="middle">MAX</text>
        </svg>
        <span className="hb-wf4-well" aria-hidden="true" />
        <span className="hb-wf4-cap" aria-hidden="true" style={{ transform: `rotate(${angle.toFixed(2)}deg)` }}>
          <span className="hb-wf4-ind" />
        </span>
      </div>
      <div className="hb-wf4-ro" aria-hidden="true">
        <span className="hb-wf4-v">{m ? "MUTE" : v}</span>
        <span className="hb-wf4-l">{label}</span>
      </div>
    </div>
  );
}

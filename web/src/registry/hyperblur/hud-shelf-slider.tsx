"use client";

import * as React from "react";

export interface HudShelfSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  label?: string;
  labels?: string[];
  accent?: string;
}

const css = `
.hb-ua4 {
  --hb-ua4-accent: #ff4d4d;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-ua4 *, .hb-ua4 *::before, .hb-ua4 *::after { box-sizing: border-box; }
.hb-ua4-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ua4-name { display: flex; gap: 10px; min-width: 0; color: #8f8f8f; }
.hb-ua4-name b { font-weight: 400; color: #ededed; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ua4-count { flex: 0 0 auto; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-ua4-count b { font-weight: 400; color: var(--hb-ua4-accent); }
.hb-ua4-track {
  position: relative;
  height: 30px;
  margin: 0 7px;
  cursor: pointer;
  touch-action: none;
}
.hb-ua4-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(255,255,255,.16);
}
.hb-ua4-fill {
  position: absolute;
  left: 0;
  top: 50%;
  height: 1px;
  width: var(--hb-ua4-p);
  background: var(--hb-ua4-accent);
  box-shadow: 0 0 8px var(--hb-ua4-accent);
  transition: width .22s cubic-bezier(.2, .8, .2, 1);
}
.hb-ua4-tick {
  position: absolute;
  top: 50%;
  width: 1px;
  height: 5px;
  margin-top: 3px;
  background: rgba(255,255,255,.18);
  transform: translateX(-.5px);
}
.hb-ua4-tick[data-major="true"] { height: 9px; margin-top: -4.5px; background: rgba(255,255,255,.4); }
.hb-ua4-tick[data-lit="true"] { background: color-mix(in srgb, var(--hb-ua4-accent) 75%, transparent); }
.hb-ua4-thumb {
  position: absolute;
  top: 50%;
  left: var(--hb-ua4-p);
  width: 30px;
  height: 30px;
  margin: -15px 0 0 -15px;
  padding: 0;
  border: 0;
  background: none;
  outline: none;
  cursor: grab;
  transition: left .22s cubic-bezier(.2, .8, .2, 1);
}
.hb-ua4-thumb::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 11px;
  height: 11px;
  margin: -5.5px 0 0 -5.5px;
  border: 1px solid var(--hb-ua4-accent);
  background: #0a0a0a;
  transform: rotate(45deg);
  box-shadow: 0 0 0 3px #0a0a0a, 0 0 14px color-mix(in srgb, var(--hb-ua4-accent) 70%, transparent);
  transition: transform .18s ease, background-color .18s ease;
}
.hb-ua4-thumb::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 3px;
  margin: -1.5px 0 0 -1.5px;
  background: var(--hb-ua4-accent);
  transform: rotate(45deg);
}
.hb-ua4-thumb:hover::before, .hb-ua4[data-drag="true"] .hb-ua4-thumb::before { transform: rotate(45deg) scale(1.2); }
.hb-ua4-thumb:focus-visible::before { outline: 1px solid #ededed; outline-offset: 4px; }
.hb-ua4[data-drag="true"] .hb-ua4-thumb { cursor: grabbing; transition-duration: .08s; }
.hb-ua4[data-drag="true"] .hb-ua4-fill { transition-duration: .08s; }
.hb-ua4-scale {
  display: flex;
  justify-content: space-between;
  margin: -4px 7px 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  letter-spacing: .14em;
  color: #5f5f5f;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ua4-fill, .hb-ua4-thumb, .hb-ua4-thumb::before { transition: none; }
}
`;

export function HudShelfSlider({
  count = 9,
  value,
  defaultValue = 2,
  onChange,
  label = "Shelf",
  labels,
  accent = "#ff4d4d",
  className,
  style,
  ...rest
}: HudShelfSliderProps) {
  const steps = Math.max(2, Math.round(count));
  const [inner, setInner] = React.useState(() => Math.min(steps - 1, Math.max(0, defaultValue)));
  const [drag, setDrag] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLButtonElement>(null);
  const current = Math.min(steps - 1, Math.max(0, value ?? inner));

  const commit = (next: number) => {
    const v = Math.min(steps - 1, Math.max(0, next));
    if (v === current) return;
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const fromPointer = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = r.width ? (clientX - r.left) / r.width : 0;
    commit(Math.round(Math.min(1, Math.max(0, t)) * (steps - 1)));
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowUp: current + 1,
      ArrowLeft: current - 1,
      ArrowDown: current - 1,
      PageUp: current + 3,
      PageDown: current - 3,
      Home: 0,
      End: steps - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      commit(map[e.key]);
    }
  };

  const pad = (v: number) => String(v).padStart(2, "0");
  const pct = `${((current / (steps - 1)) * 100).toFixed(3)}%`;
  const name = labels?.[current];
  const ticks: React.ReactNode[] = [];
  const sub = 3;
  for (let i = 0; i <= (steps - 1) * sub; i++) {
    const pos = i / ((steps - 1) * sub);
    ticks.push(
      <span
        key={i}
        className="hb-ua4-tick"
        data-major={i % sub === 0 ? "true" : "false"}
        data-lit={pos <= current / (steps - 1) + 0.0001 ? "true" : "false"}
        style={{ left: `${(pos * 100).toFixed(3)}%` }}
      />,
    );
  }

  return (
    <div
      className={["hb-ua4", className].filter(Boolean).join(" ")}
      data-drag={drag ? "true" : "false"}
      style={{ ["--hb-ua4-accent" as string]: accent, ["--hb-ua4-p" as string]: pct, ...style }}
      {...rest}
    >
      <style href="hb-hud-shelf-slider" precedence="default">{css}</style>
      <div className="hb-ua4-top">
        <span className="hb-ua4-name">
          <span>{label}</span>
          {name ? <b>{name}</b> : null}
        </span>
        <span className="hb-ua4-count" aria-hidden="true">
          <b>{pad(current + 1)}</b> / {pad(steps)}
        </span>
      </div>
      <div
        ref={trackRef}
        className="hb-ua4-track"
        onPointerDown={(e) => {
          if (e.button !== 0 && e.pointerType === "mouse") return;
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          setDrag(true);
          thumbRef.current?.focus();
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (drag) fromPointer(e.clientX);
        }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        <span className="hb-ua4-line" />
        {ticks}
        <span className="hb-ua4-fill" />
        <button
          ref={thumbRef}
          type="button"
          className="hb-ua4-thumb"
          role="slider"
          aria-label={label}
          aria-valuemin={1}
          aria-valuemax={steps}
          aria-valuenow={current + 1}
          aria-valuetext={name ? `${current + 1} of ${steps}, ${name}` : `${current + 1} of ${steps}`}
          onKeyDown={onKey}
        />
      </div>
      <div className="hb-ua4-scale" aria-hidden="true">
        <span>01</span>
        <span>{pad(steps)}</span>
      </div>
    </div>
  );
}

export default HudShelfSlider;

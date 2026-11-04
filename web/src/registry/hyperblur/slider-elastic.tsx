"use client";

import * as React from "react";

export interface SliderElasticProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  accent?: string;
  maxBend?: number;
  bubble?: "auto" | "always";
  idle?: boolean;
  label?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

const PAD = 20;
const HEIGHT = 100;
const CY = 64;

const css = `
.hb-qv5 {
  --hb-qv5-acc: #2f7bff;
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: ${HEIGHT}px;
  font: inherit;
  color: #ededed;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
.hb-qv5 *, .hb-qv5 *::before, .hb-qv5 *::after { box-sizing: border-box; }
.hb-qv5[data-drag="true"] { cursor: grabbing; }
.hb-qv5[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.hb-qv5-sv {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.hb-qv5-tr { fill: none; stroke: #2e2e2e; stroke-width: 4; stroke-linecap: round; }
.hb-qv5-fl { fill: none; stroke: var(--hb-qv5-acc); stroke-width: 4; stroke-linecap: round; }
.hb-qv5-en { fill: #3a3a3a; }
.hb-qv5-th {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  pointer-events: none;
  will-change: transform;
}
.hb-qv5-kn {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #ffffff;
  border: 4px solid var(--hb-qv5-acc);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.55);
  transition: scale 0.25s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.25s ease;
}
.hb-qv5[data-drag="true"] .hb-qv5-kn { scale: 1.18; }
.hb-qv5:focus-visible .hb-qv5-kn { box-shadow: 0 0 0 3px #0a0a0a, 0 0 0 5px #7fb3ff; }
.hb-qv5-bb {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  min-width: 34px;
  padding: 4px 8px;
  border-radius: 8px;
  background: var(--hb-qv5-acc);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-50%) translateY(6px) scale(0.8);
  transform-origin: 50% 100%;
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-qv5-bb::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 1px;
}
.hb-qv5:hover .hb-qv5-bb,
.hb-qv5:focus-visible .hb-qv5-bb,
.hb-qv5[data-drag="true"] .hb-qv5-bb,
.hb-qv5[data-bubble="always"] .hb-qv5-bb {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qv5-kn, .hb-qv5-bb { transition: none; }
}
`;

function bezierT(x0: number, cx: number, x1: number, x: number) {
  let lo = 0;
  let hi = 1;
  for (let n = 0; n < 24; n++) {
    const m = (lo + hi) / 2;
    const bx = (1 - m) * (1 - m) * x0 + 2 * m * (1 - m) * cx + m * m * x1;
    if (bx < x) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

function decimals(step: number) {
  const text = String(step);
  const dot = text.indexOf(".");
  return dot < 0 ? 0 : text.length - dot - 1;
}

export function SliderElastic({
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  accent = "#2f7bff",
  maxBend = 24,
  bubble = "auto",
  idle = true,
  label = "Value",
  formatValue,
  disabled = false,
  className = "",
  style,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  ...rest
}: SliderElasticProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = Math.min(max, Math.max(min, value ?? inner));
  const [dragging, setDragging] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<SVGPathElement>(null);
  const fillRef = React.useRef<SVGPathElement>(null);
  const leftRef = React.useRef<SVGCircleElement>(null);
  const rightRef = React.useRef<SVGCircleElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef(current);
  const prevRef = React.useRef(current);
  const wake = React.useRef<(() => void) | null>(null);
  const draw = React.useRef<(() => void) | null>(null);
  const sim = React.useRef({
    width: 0,
    dy: 0,
    vel: 0,
    cx: 0,
    px: 0,
    py: CY,
    drag: false,
    hover: false,
    visible: true,
    running: false,
    raf: 0,
    last: 0,
  });

  React.useEffect(() => {
    valueRef.current = current;
  }, [current]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const s = sim.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function thumbX() {
      const frac = max === min ? 0 : (valueRef.current - min) / (max - min);
      return PAD + frac * Math.max(1, s.width - PAD * 2);
    }

    function render() {
      if (!s.width) return;
      const x0 = PAD;
      const x1 = s.width - PAD;
      const tx = Math.min(x1, Math.max(x0, thumbX()));
      const cx = Math.min(x1, Math.max(x0, s.cx));
      const c = 2 * s.dy;
      const t = bezierT(x0, cx, x1, tx);
      const ey = CY + 2 * t * (1 - t) * c;
      const qx = x0 + t * (cx - x0);
      const qy = CY + t * c;
      trackRef.current?.setAttribute("d", `M${x0} ${CY} Q${cx.toFixed(2)} ${(CY + c).toFixed(2)} ${x1} ${CY}`);
      fillRef.current?.setAttribute(
        "d",
        `M${x0} ${CY} Q${qx.toFixed(2)} ${qy.toFixed(2)} ${tx.toFixed(2)} ${ey.toFixed(2)}`,
      );
      leftRef.current?.setAttribute("cx", String(x0));
      rightRef.current?.setAttribute("cx", String(x1));
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate(${(tx - 12).toFixed(2)}px, ${(ey - 12).toFixed(2)}px)`;
      }
    }

    function tick(ts: number) {
      s.running = false;
      if (!s.visible) return;
      const dt = Math.min(0.032, s.last ? (ts - s.last) / 1000 : 0.016);
      s.last = ts;
      const tx = thumbX();
      let target = 0;
      let cxTarget = tx;
      if (s.drag) {
        const off = s.py - CY;
        target = maxBend * Math.tanh(off / (maxBend * 2.2));
        cxTarget = s.px;
      } else if (idle && !reduced && !s.hover) {
        const t = ts / 1000;
        target = 3 * Math.sin(t * 1.7);
        cxTarget = PAD + (0.5 + 0.42 * Math.sin(t * 0.7)) * Math.max(1, s.width - PAD * 2);
      }
      if (reduced) {
        s.dy = target;
        s.vel = 0;
        s.cx = cxTarget;
      } else {
        const k = s.drag ? 280 : 200;
        const damp = s.drag ? 26 : 7;
        for (let n = 0; n < 2; n++) {
          const h = dt / 2;
          s.vel += (k * (target - s.dy) - damp * s.vel) * h;
          s.dy += s.vel * h;
        }
        s.cx += (cxTarget - s.cx) * Math.min(1, dt * (s.drag ? 22 : 8));
      }
      render();
      const alive =
        s.drag ||
        (idle && !reduced) ||
        Math.abs(s.dy - target) > 0.02 ||
        Math.abs(s.vel) > 0.05 ||
        Math.abs(s.cx - cxTarget) > 0.2;
      if (alive) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    }

    function ensure() {
      if (s.running || !s.visible) return;
      s.running = true;
      s.last = 0;
      s.raf = requestAnimationFrame(tick);
    }

    function measure() {
      if (!root) return;
      s.width = root.clientWidth;
      if (!s.cx) s.cx = thumbX();
      render();
      ensure();
    }

    wake.current = ensure;
    draw.current = render;
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) ensure();
    });
    io.observe(root);

    return () => {
      wake.current = null;
      draw.current = null;
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
  }, [idle, maxBend, min, max]);

  React.useEffect(() => {
    const s = sim.current;
    const prev = prevRef.current;
    prevRef.current = current;
    if (prev === current) return;
    if (!s.drag) {
      const range = Math.max(1e-9, max - min);
      const kick = Math.min(70, (Math.abs(current - prev) / range) * 420);
      s.vel += current > prev ? -kick : kick;
    }
    draw.current?.();
    wake.current?.();
  }, [current, min, max]);

  function commit(next: number) {
    const places = decimals(step);
    const snapped = Math.round((next - min) / step) * step + min;
    const clamped = Math.min(max, Math.max(min, Number(snapped.toFixed(places))));
    if (clamped === current) return;
    if (value === undefined) setInner(clamped);
    onChange?.(clamped);
  }

  function fromPointer(e: React.PointerEvent<HTMLDivElement>) {
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const s = sim.current;
    const span = Math.max(1, r.width - PAD * 2);
    const frac = Math.min(1, Math.max(0, (e.clientX - r.left - PAD) / span));
    s.px = Math.min(r.width - PAD, Math.max(PAD, e.clientX - r.left));
    s.py = e.clientY - r.top;
    commit(min + frac * (max - min));
    wake.current?.();
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled) return;
    let next = current;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = current + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = current - step;
    else if (e.key === "PageUp") next = current + step * 10;
    else if (e.key === "PageDown") next = current - step * 10;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    else return;
    e.preventDefault();
    commit(next);
  }

  const text = formatValue ? formatValue(current) : String(current);
  const vars = { "--hb-qv5-acc": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-slider-elastic" precedence="default">{css}</style>
      <div
        ref={rootRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={text}
        aria-disabled={disabled || undefined}
        data-drag={dragging}
        data-bubble={bubble}
        className={`hb-qv5 ${className}`}
        style={vars}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (disabled || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          sim.current.drag = true;
          sim.current.hover = true;
          setDragging(true);
          fromPointer(e);
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          if (sim.current.drag) fromPointer(e);
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          if (!sim.current.drag) return;
          sim.current.drag = false;
          setDragging(false);
          wake.current?.();
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          sim.current.drag = false;
          setDragging(false);
          wake.current?.();
        }}
        onPointerEnter={() => {
          sim.current.hover = true;
        }}
        onPointerLeave={() => {
          sim.current.hover = false;
          wake.current?.();
        }}
        onKeyDown={handleKey}
        {...rest}
      >
        <svg className="hb-qv5-sv" aria-hidden="true" focusable="false">
          <path ref={trackRef} className="hb-qv5-tr" />
          <path ref={fillRef} className="hb-qv5-fl" />
          <circle ref={leftRef} className="hb-qv5-en" cy={CY} r="3" />
          <circle ref={rightRef} className="hb-qv5-en" cy={CY} r="3" />
        </svg>
        <div ref={thumbRef} className="hb-qv5-th" aria-hidden="true">
          <span className="hb-qv5-kn" />
          <span className="hb-qv5-bb">{text}</span>
        </div>
      </div>
    </>
  );
}

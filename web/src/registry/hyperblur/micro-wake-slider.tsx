"use client";

import * as React from "react";

export interface MicroWakeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  unit?: string;
  accent?: string;
  disabled?: boolean;
  idle?: boolean;
  onChange?: (value: number) => void;
}

const R = 12;

const css = `
.hb-ql6 {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  --hb-ql6-c: #2f7bff;
}
.hb-ql6 *, .hb-ql6 *::before, .hb-ql6 *::after { box-sizing: border-box; }
.hb-ql6-n {
  flex: none;
  font-size: 0.82em;
  font-weight: 500;
  color: #a1a1a1;
}
.hb-ql6-t {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 44px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-ql6[data-disabled="true"] .hb-ql6-t { cursor: not-allowed; opacity: 0.45; }
.hb-ql6-r {
  position: absolute;
  left: ${R}px;
  right: ${R}px;
  top: 50%;
  height: 6px;
  margin-top: -3px;
  background: #262626;
  border-radius: 999px;
}
.hb-ql6-f {
  position: absolute;
  left: ${R}px;
  top: 50%;
  height: 6px;
  margin-top: -3px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ql6-c) 55%, #000), var(--hb-ql6-c));
  border-radius: 999px;
}
.hb-ql6-s {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.hb-ql6-w { fill: var(--hb-ql6-c); }
.hb-ql6-k {
  position: absolute;
  left: 0;
  top: 50%;
  width: ${R * 2}px;
  height: ${R * 2}px;
  margin-top: -${R}px;
  background: linear-gradient(180deg, #ffffff, #dcdcdc);
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5), 0 0 0 3px color-mix(in srgb, var(--hb-ql6-c) 40%, transparent);
  outline: 0;
  will-change: transform;
}
.hb-ql6-k::after {
  content: "";
  position: absolute;
  inset: 6px;
  background: var(--hb-ql6-c);
  border-radius: 50%;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-ql6-t[data-drag="true"] .hb-ql6-k::after { transform: scale(1.35); }
.hb-ql6-k:focus-visible { box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5), 0 0 0 3px #0a0a0a, 0 0 0 5px var(--hb-ql6-c); }
.hb-ql6-h {
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}
.hb-ql6-g {
  position: absolute;
  left: -${R}px;
  top: -${R}px;
  width: ${R * 2}px;
  height: ${R * 2}px;
  border: 2px solid var(--hb-ql6-c);
  border-radius: 50%;
  opacity: 0;
  animation: hb-ql6-ring 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
.hb-ql6-g:nth-child(2) { animation-delay: 0.14s; }
.hb-ql6-o {
  flex: none;
  min-width: 3.2ch;
  font-size: 0.95em;
  font-weight: 600;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
@keyframes hb-ql6-ring {
  0% { opacity: 0.85; transform: scale(0.8); }
  100% { opacity: 0; transform: scale(3.4); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ql6-g { animation: none; }
  .hb-ql6-k::after { transition: none; }
}
`;

function decimals(step: number) {
  const t = String(step);
  const i = t.indexOf(".");
  return i < 0 ? 0 : t.length - i - 1;
}

export function MicroWakeSlider({
  value,
  defaultValue = 40,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  unit = "",
  accent = "#2f7bff",
  disabled = false,
  idle = true,
  onChange,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: MicroWakeSliderProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const val = value ?? inner;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const hostRef = React.useRef<HTMLDivElement>(null);
  const fillRef = React.useRef<HTMLDivElement>(null);
  const neckRef = React.useRef<SVGPathElement>(null);
  const capRef = React.useRef<SVGCircleElement>(null);
  const dropRef = React.useRef<SVGCircleElement>(null);
  const outRef = React.useRef<HTMLSpanElement>(null);
  const [ripple, setRipple] = React.useState({ id: 0, x: 0 });
  const state = React.useRef({
    dx: -1,
    wx: 0,
    w2: 0,
    v: 0,
    vw: 0,
    v2: 0,
    drag: false,
    px: 0,
    hover: false,
    focus: false,
    resumeAt: 0,
    acc: 0,
    moving: false,
  });
  const valRef = React.useRef(val);
  const api = React.useRef({ wake: () => {}, reduced: false });
  const latest = React.useRef({ min, max, step, idle, unit, value, onChange });

  React.useEffect(() => {
    valRef.current = val;
    latest.current = { min, max, step, idle, unit, value, onChange };
    api.current.wake();
  }, [val, min, max, step, idle, unit, value, onChange]);

  React.useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const host = hostRef.current;
    const fill = fillRef.current;
    const neck = neckRef.current;
    const cap = capRef.current;
    const drop = dropRef.current;
    if (!track || !thumb || !host || !fill || !neck || !cap || !drop) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const frac = (v: number) => {
      const c = latest.current;
      return c.max === c.min ? 0 : Math.max(0, Math.min(1, (v - c.min) / (c.max - c.min)));
    };

    const snap = (f: number) => {
      const c = latest.current;
      const raw = c.min + f * (c.max - c.min);
      const n = Math.round((raw - c.min) / c.step) * c.step + c.min;
      return Number(Math.max(c.min, Math.min(c.max, n)).toFixed(decimals(c.step)));
    };

    const draw = (idleOn: boolean) => {
      const w = track.clientWidth;
      const cy = track.clientHeight / 2;
      const c = latest.current;
      thumb.style.transform = `translate3d(${(s.dx - R).toFixed(2)}px,0,0)`;
      host.style.transform = `translate3d(${s.dx.toFixed(2)}px,0,0)`;
      fill.style.width = `${Math.max(0, s.dx - R).toFixed(2)}px`;
      const sep = s.dx - s.wx;
      const r1 = Math.max(0, Math.min(9, 3 + Math.abs(sep) * 0.2));
      const r0 = 9;
      const rm = Math.min(r0, r1) * 0.55;
      if (Math.abs(sep) < 1.5) {
        neck.setAttribute("d", "");
        cap.setAttribute("r", "0");
      } else {
        const mid = (s.dx + s.wx) / 2;
        neck.setAttribute(
          "d",
          `M ${s.dx.toFixed(1)} ${(cy - r0).toFixed(1)} Q ${mid.toFixed(1)} ${(cy - rm).toFixed(1)} ${s.wx.toFixed(1)} ${(cy - r1).toFixed(1)} L ${s.wx.toFixed(1)} ${(cy + r1).toFixed(1)} Q ${mid.toFixed(1)} ${(cy + rm).toFixed(1)} ${s.dx.toFixed(1)} ${(cy + r0).toFixed(1)} Z`,
        );
        cap.setAttribute("cx", s.wx.toFixed(1));
        cap.setAttribute("cy", cy.toFixed(1));
        cap.setAttribute("r", r1.toFixed(2));
      }
      const sep2 = s.wx - s.w2;
      const r2 = Math.abs(sep2) < 2 ? 0 : Math.min(5, 1.5 + Math.abs(sep2) * 0.14);
      drop.setAttribute("cx", s.w2.toFixed(1));
      drop.setAttribute("cy", cy.toFixed(1));
      drop.setAttribute("r", r2.toFixed(2));
      const shown = idleOn ? snap((s.dx - R) / Math.max(1, w - 2 * R)) : valRef.current;
      const text = `${shown.toFixed(decimals(c.step))}${c.unit}`;
      const out = outRef.current;
      if (out && out.textContent !== text) out.textContent = text;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const w = track.clientWidth;
      const span = Math.max(1, w - 2 * R);
      const c = latest.current;
      const home = R + span * frac(valRef.current);
      if (s.dx < 0) {
        s.dx = home;
        s.wx = home;
        s.w2 = home;
      }
      const idleOn = c.idle && !s.hover && !s.focus && !s.drag && now >= s.resumeAt;
      const desired = s.drag
        ? Math.max(R, Math.min(w - R, s.px))
        : idleOn
          ? R + span * (0.5 + 0.38 * Math.sin(now * 0.0013))
          : home;
      let rem = dt;
      while (rem > 0) {
        const h = Math.min(rem, 1 / 120);
        s.v += (520 * (desired - s.dx) - 32 * s.v) * h;
        s.dx += s.v * h;
        s.vw += (110 * (s.dx - s.wx) - 11 * s.vw) * h;
        s.wx += s.vw * h;
        s.v2 += (55 * (s.wx - s.w2) - 7 * s.v2) * h;
        s.w2 += s.v2 * h;
        rem -= h;
      }
      const moving = Math.abs(s.v) > 6 || Math.abs(desired - s.dx) > 0.5 || Math.abs(s.wx - s.dx) > 1.5;
      if (moving) s.acc += Math.abs(s.v) * dt;
      if (s.moving && !moving && s.acc > 10) {
        s.acc = 0;
        setRipple((r) => ({ id: r.id + 1, x: s.dx }));
      }
      s.moving = moving;
      draw(idleOn);
      raf = requestAnimationFrame(tick);
    };

    const placeNow = () => {
      const w = track.clientWidth;
      const span = Math.max(1, w - 2 * R);
      const home = R + span * frac(valRef.current);
      s.dx = home;
      s.wx = home;
      s.w2 = home;
      s.v = 0;
      s.vw = 0;
      s.v2 = 0;
      draw(false);
    };

    const wake = () => {
      if (api.current.reduced) {
        if (s.drag) {
          const w = track.clientWidth;
          s.dx = Math.max(R, Math.min(w - R, s.px));
          s.wx = s.dx;
          s.w2 = s.dx;
          draw(false);
        } else placeNow();
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    placeNow();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(track);
    const ro = new ResizeObserver(() => {
      if (api.current.reduced) placeNow();
    });
    ro.observe(track);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        placeNow();
      } else wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function emit(next: number) {
    if (next === valRef.current) return;
    valRef.current = next;
    if (latest.current.value === undefined) setInner(next);
    latest.current.onChange?.(next);
  }

  function fromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const s = state.current;
    s.px = clientX - rect.left;
    const span = Math.max(1, rect.width - 2 * R);
    const f = Math.max(0, Math.min(1, (s.px - R) / span));
    const c = latest.current;
    const raw = c.min + f * (c.max - c.min);
    const n = Math.round((raw - c.min) / c.step) * c.step + c.min;
    emit(Number(Math.max(c.min, Math.min(c.max, n)).toFixed(decimals(c.step))));
  }

  function nudge(delta: number) {
    const c = latest.current;
    const n = Math.max(c.min, Math.min(c.max, valRef.current + delta));
    emit(Number(n.toFixed(decimals(c.step))));
    state.current.resumeAt = performance.now() + 2000;
    api.current.wake();
  }

  const vars = { "--hb-ql6-c": accent, ...style } as React.CSSProperties;
  const text = `${val.toFixed(decimals(step))}${unit}`;

  return (
    <>
      <style href="hb-micro-wake-slider" precedence="default">{css}</style>
      <div
        {...rest}
        className={`hb-ql6 ${className}`}
        style={vars}
        data-disabled={disabled}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          state.current.hover = true;
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          state.current.hover = false;
          state.current.resumeAt = performance.now() + 1500;
        }}
      >
        {label ? <span className="hb-ql6-n">{label}</span> : null}
        <div
          ref={trackRef}
          className="hb-ql6-t"
          data-drag="false"
          onPointerDown={(e) => {
            if (e.button !== 0 || disabled) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.dataset.drag = "true";
            state.current.drag = true;
            fromPointer(e.clientX);
            thumbRef.current?.focus({ preventScroll: true });
            api.current.wake();
          }}
          onPointerMove={(e) => {
            if (!state.current.drag) return;
            fromPointer(e.clientX);
            api.current.wake();
          }}
          onPointerUp={(e) => {
            if (!state.current.drag) return;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
            e.currentTarget.dataset.drag = "false";
            state.current.drag = false;
            state.current.resumeAt = performance.now() + 2200;
            api.current.wake();
          }}
          onPointerCancel={(e) => {
            e.currentTarget.dataset.drag = "false";
            state.current.drag = false;
            api.current.wake();
          }}
        >
          <div className="hb-ql6-r" />
          <div ref={fillRef} className="hb-ql6-f" />
          <svg className="hb-ql6-s" aria-hidden="true">
            <circle ref={dropRef} className="hb-ql6-w" r="0" opacity="0.7" />
            <path ref={neckRef} className="hb-ql6-w" d="" />
            <circle ref={capRef} className="hb-ql6-w" r="0" />
          </svg>
          <div ref={hostRef} className="hb-ql6-h" aria-hidden="true">
            {ripple.id > 0 ? (
              <div key={ripple.id}>
                <span className="hb-ql6-g" />
                <span className="hb-ql6-g" />
              </div>
            ) : null}
          </div>
          <div
            ref={thumbRef}
            className="hb-ql6-k"
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={label ?? "Value"}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-valuetext={text}
            aria-disabled={disabled || undefined}
            aria-orientation="horizontal"
            onFocus={() => {
              state.current.focus = true;
            }}
            onBlur={() => {
              state.current.focus = false;
              state.current.resumeAt = performance.now() + 1500;
            }}
            onKeyDown={(e) => {
              if (disabled) return;
              const big = step * 10;
              let delta = 0;
              if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
              else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
              else if (e.key === "PageUp") delta = big;
              else if (e.key === "PageDown") delta = -big;
              else if (e.key === "Home") delta = min - valRef.current;
              else if (e.key === "End") delta = max - valRef.current;
              else return;
              e.preventDefault();
              nudge(delta);
            }}
          />
        </div>
        {showValue ? (
          <output className="hb-ql6-o" aria-hidden="true">
            <span ref={outRef}>{text}</span>
          </output>
        ) : null}
      </div>
    </>
  );
}

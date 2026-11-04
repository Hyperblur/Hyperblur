"use client";

import * as React from "react";

export interface MicroSquishSwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "children"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  size?: number;
  accent?: string;
  idle?: boolean;
  onChange?: (checked: boolean) => void;
}

const css = `
.hb-ql5 {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
  --hb-ql5-c: #2f7bff;
  --hb-ql5-h: 38px;
  --hb-ql5-p: 0;
}
.hb-ql5 *, .hb-ql5 *::before, .hb-ql5 *::after { box-sizing: border-box; }
.hb-ql5:focus-visible { outline: 2px solid var(--hb-ql5-c); outline-offset: 4px; }
.hb-ql5:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ql5-t {
  position: relative;
  flex: none;
  width: calc(var(--hb-ql5-h) * 1.8);
  height: var(--hb-ql5-h);
  background: color-mix(in srgb, var(--hb-ql5-c) calc(var(--hb-ql5-p) * 100%), #2b2b2b);
  border: 1px solid color-mix(in srgb, var(--hb-ql5-c) calc(var(--hb-ql5-p) * 100%), #3a3a3a);
  border-radius: 999px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.45);
}
.hb-ql5-k {
  position: absolute;
  left: 3px;
  top: 3px;
  width: calc(var(--hb-ql5-h) - 8px);
  height: calc(var(--hb-ql5-h) - 8px);
  background: linear-gradient(180deg, #ffffff 0%, #e4e4e4 100%);
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.45), inset 0 -2px 3px rgba(0, 0, 0, 0.12);
  will-change: transform;
}
.hb-ql5-l {
  font-size: 0.92em;
  font-weight: 500;
  color: #ededed;
}
`;

export function MicroSquishSwitch({
  checked,
  defaultChecked = false,
  label,
  size = 38,
  accent = "#2f7bff",
  idle = true,
  disabled,
  onChange,
  className = "",
  style,
  onClick,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: MicroSquishSwitchProps) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const trackRef = React.useRef<HTMLSpanElement>(null);
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const state = React.useRef({
    p: 0,
    v: 0,
    j: 0,
    jv: 0,
    pr: 0,
    prv: 0,
    prTarget: 0,
    drag: false,
    moved: false,
    ignoreClick: false,
    startX: 0,
    baseP: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
    hover: false,
    focus: false,
    resumeAt: 0,
    idleStart: -1,
    cyc: -1,
  });
  const api = React.useRef({ wake: () => {}, draw: () => {}, reduced: false, travel: (): number => 0 });
  const latest = React.useRef({ on, idle, checked, onChange });

  React.useEffect(() => {
    latest.current = { on, idle, checked, onChange };
    api.current.wake();
  }, [on, idle, checked, onChange]);

  React.useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const root = rootRef.current;
    if (!track || !thumb || !root) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const travel = () => Math.max(1, track.clientWidth - thumb.offsetWidth - 6);
    api.current.travel = travel;

    const draw = () => {
      const tr = travel();
      const a = Math.abs(s.j);
      const sx = 1 + a * 0.9 + s.pr * 0.2;
      const sy = 1 - a * 0.45 - s.pr * 0.14;
      thumb.style.transformOrigin = `${s.j > 0 ? "0%" : "100%"} 50%`;
      thumb.style.transform = `translate3d(${s.p.toFixed(2)}px,0,0) skewX(${(-s.j * 18).toFixed(2)}deg) scale(${sx.toFixed(3)},${sy.toFixed(3)})`;
      root.style.setProperty("--hb-ql5-p", Math.max(0, Math.min(1, s.p / tr)).toFixed(3));
    };

    const settleNow = () => {
      s.p = latest.current.on ? travel() : 0;
      s.v = 0;
      s.j = 0;
      s.jv = 0;
      s.pr = 0;
      s.prv = 0;
      draw();
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const cfg = latest.current;
      const tr = travel();
      const idleOn = cfg.idle && !s.hover && !s.focus && !s.drag && now >= s.resumeAt;
      if (idleOn) {
        if (s.idleStart < 0) s.idleStart = now;
        const cyc = Math.floor((now - s.idleStart - 700) / 2600);
        if (cyc >= 0 && cyc !== s.cyc) {
          s.cyc = cyc;
          s.v += cfg.on ? -tr * 24 : tr * 24;
          s.prv += 5;
        }
      } else {
        s.idleStart = -1;
        s.cyc = -1;
      }
      let rem = dt;
      while (rem > 0) {
        const h = Math.min(rem, 1 / 120);
        if (!s.drag) {
          const target = cfg.on ? tr : 0;
          s.v += (420 * (target - s.p) - 18 * s.v) * h;
          s.p += s.v * h;
        }
        const jt = Math.max(-0.5, Math.min(0.5, s.v / 1500));
        s.jv += (320 * (jt - s.j) - 9 * s.jv) * h;
        s.j += s.jv * h;
        s.prv += (360 * (s.prTarget - s.pr) - 20 * s.prv) * h;
        s.pr += s.prv * h;
        rem -= h;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) {
        if (!s.drag) settleNow();
        else draw();
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    api.current.draw = draw;
    settleNow();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(root);
    const ro = new ResizeObserver(() => {
      if (api.current.reduced) settleNow();
    });
    ro.observe(track);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        settleNow();
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

  function commit(next: boolean) {
    if (disabled) return;
    if (latest.current.checked === undefined) setInner(next);
    latest.current.onChange?.(next);
  }

  function pressure(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse" && e.pressure > 0 && e.pressure !== 0.5) return Math.min(1.3, 0.5 + e.pressure);
    return 1;
  }

  const vars = {
    "--hb-ql5-c": accent,
    "--hb-ql5-h": `${size}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-squish-switch" precedence="default">{css}</style>
      <button
        {...rest}
        ref={rootRef}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        className={`hb-ql5 ${className}`}
        style={vars}
        onClick={(e) => {
          onClick?.(e);
          const s = state.current;
          if (s.ignoreClick) {
            s.ignoreClick = false;
            return;
          }
          commit(!on);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "ArrowRight" && !on) {
            e.preventDefault();
            commit(true);
          } else if (e.key === "ArrowLeft" && on) {
            e.preventDefault();
            commit(false);
          }
        }}
        onFocus={(e) => {
          onFocus?.(e);
          state.current.focus = true;
        }}
        onBlur={(e) => {
          onBlur?.(e);
          state.current.focus = false;
          state.current.resumeAt = performance.now() + 1500;
        }}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          state.current.hover = true;
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          state.current.hover = false;
          state.current.resumeAt = performance.now() + 1500;
        }}
        onPointerDown={(e) => {
          if (e.button !== 0 || disabled) return;
          const s = state.current;
          e.currentTarget.setPointerCapture(e.pointerId);
          s.drag = true;
          s.moved = false;
          s.ignoreClick = false;
          s.startX = e.clientX;
          s.baseP = s.p;
          s.lastX = e.clientX;
          s.lastT = e.timeStamp;
          s.vel = 0;
          s.prTarget = pressure(e);
          api.current.wake();
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.drag) return;
          const dx = e.clientX - s.startX;
          if (Math.abs(dx) > 4) s.moved = true;
          if (s.moved) {
            const tr = api.current.travel();
            const raw = s.baseP + dx;
            const over = raw < 0 ? raw : raw > tr ? raw - tr : 0;
            const clamped = Math.max(0, Math.min(tr, raw));
            const next = clamped + Math.sign(over) * 14 * (1 - Math.exp(-Math.abs(over) / 14));
            s.v = Math.max(-2500, Math.min(2500, (next - s.p) / Math.max(0.008, (e.timeStamp - s.lastT) / 1000)));
            s.p = next;
          }
          const dt = Math.max(1, e.timeStamp - s.lastT);
          s.vel = Math.max(-3, Math.min(3, s.vel * 0.6 + ((e.clientX - s.lastX) / dt) * 0.4));
          s.lastX = e.clientX;
          s.lastT = e.timeStamp;
          s.prTarget = pressure(e);
          api.current.draw();
        }}
        onPointerUp={(e) => {
          const s = state.current;
          if (!s.drag) return;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          s.drag = false;
          s.prTarget = 0;
          s.resumeAt = performance.now() + 2200;
          if (s.moved) {
            s.ignoreClick = true;
            const tr = api.current.travel();
            const flick = Math.abs(s.vel) > 0.4;
            const next = flick ? s.vel > 0 : s.p + s.vel * 120 > tr / 2;
            s.v = s.vel * 1000;
            if (next !== on) commit(next);
          }
          api.current.wake();
        }}
        onPointerCancel={() => {
          const s = state.current;
          s.drag = false;
          s.prTarget = 0;
          api.current.wake();
        }}
      >
        <span ref={trackRef} className="hb-ql5-t">
          <span ref={thumbRef} className="hb-ql5-k" />
        </span>
        {label ? <span className="hb-ql5-l">{label}</span> : null}
      </button>
    </>
  );
}

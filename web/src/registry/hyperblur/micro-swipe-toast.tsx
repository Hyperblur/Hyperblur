"use client";

import * as React from "react";

export interface MicroSwipeToastProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "children" | "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel"
  > {
  title?: React.ReactNode;
  description?: React.ReactNode;
  undoLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  duration?: number;
  accent?: string;
  idle?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUndo?: () => void;
  onDismiss?: (direction: "left" | "right" | "undo" | "keyboard" | "timeout") => void;
}

const css = `
.hb-ql3 {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  padding: 10px 10px 10px 12px;
  overflow: hidden;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  background: #171717;
  border: 1px solid #2c2c2c;
  border-radius: 16px;
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: transform, opacity;
  --hb-ql3-c: #2f7bff;
}
.hb-ql3 *, .hb-ql3 *::before, .hb-ql3 *::after { box-sizing: border-box; }
.hb-ql3:active { cursor: grabbing; }
.hb-ql3:focus-visible { outline: 2px solid var(--hb-ql3-c); outline-offset: 3px; }
.hb-ql3-i {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  color: #fff;
  background: var(--hb-ql3-c);
  border-radius: 50%;
  box-shadow: 0 0 16px -2px color-mix(in srgb, var(--hb-ql3-c) 70%, transparent);
}
.hb-ql3-i svg { width: 16px; height: 16px; }
.hb-ql3-x { min-width: 0; flex: 1; line-height: 1.3; }
.hb-ql3-t {
  margin: 0;
  overflow: hidden;
  font-size: 0.92em;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-ql3-d {
  margin: 2px 0 0;
  overflow: hidden;
  font-size: 0.78em;
  color: #8f8f8f;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-ql3-u {
  flex: none;
  margin: 0;
  padding: 0.45em 0.95em;
  font: inherit;
  font-size: 0.82em;
  font-weight: 600;
  color: #7fb3ff;
  background: color-mix(in srgb, var(--hb-ql3-c) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-ql3-c) 45%, transparent);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-ql3-u:hover { background: color-mix(in srgb, var(--hb-ql3-c) 26%, transparent); }
.hb-ql3-u:active { transform: scale(0.94); }
.hb-ql3-u:focus-visible { outline: 2px solid var(--hb-ql3-c); outline-offset: 2px; }
.hb-ql3-b {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--hb-ql3-c);
  opacity: 0.8;
  transform-origin: left center;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ql3-u { transition: none; }
}
`;

type Leave = { mode: "fly" | "fade"; dir: number; reason: "left" | "right" | "undo" | "keyboard" | "timeout" };

export function MicroSwipeToast({
  title = "Conversation archived",
  description,
  undoLabel = "Undo",
  open,
  defaultOpen = true,
  duration = 0,
  accent = "#2f7bff",
  idle = true,
  onOpenChange,
  onUndo,
  onDismiss,
  className = "",
  style,
  onKeyDown,
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: MicroSwipeToastProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const elRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const state = React.useRef({
    x: 0,
    v: 0,
    drag: false,
    startX: 0,
    base: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
    hover: false,
    focus: false,
    resumeAt: 0,
    idleStart: -1,
    cyc: -1,
    life: 0,
    leave: null as Leave | null,
    fade: 1,
  });
  const api = React.useRef({ wake: () => {}, draw: () => {}, reduced: false });
  const latest = React.useRef({ idle, duration, onOpenChange, onDismiss, open });

  React.useEffect(() => {
    latest.current = { idle, duration, onOpenChange, onDismiss, open };
  }, [idle, duration, onOpenChange, onDismiss, open]);

  const finish = React.useCallback((reason: Leave["reason"]) => {
    const s = state.current;
    s.leave = null;
    s.x = 0;
    s.v = 0;
    s.fade = 1;
    s.life = 0;
    s.drag = false;
    if (latest.current.open === undefined) setInner(false);
    latest.current.onOpenChange?.(false);
    latest.current.onDismiss?.(reason);
  }, []);

  React.useEffect(() => {
    const el = elRef.current;
    if (!isOpen || !el) return;
    const bar = barRef.current;
    const s = state.current;
    s.x = 0;
    s.v = 0;
    s.fade = 1;
    s.life = 0;
    s.leave = null;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = () => {
      const w = el.clientWidth || 1;
      const op = Math.max(0, Math.min(1, s.fade * (1 - Math.abs(s.x) / (w * 1.1))));
      el.style.transform = `translate3d(${s.x.toFixed(2)}px,0,0) rotate(${(s.x / w * 4).toFixed(3)}deg)`;
      el.style.opacity = op.toFixed(3);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const cfg = latest.current;
      const w = el.clientWidth || 1;
      const reduced = api.current.reduced;
      const idleOn =
        cfg.idle && !reduced && !s.hover && !s.focus && !s.drag && !s.leave && now >= s.resumeAt;
      if (idleOn) {
        if (s.idleStart < 0) s.idleStart = now;
        const cyc = Math.floor((now - s.idleStart - 1000) / 3800);
        if (cyc >= 0 && cyc !== s.cyc) {
          s.cyc = cyc;
          s.v += cyc % 2 === 0 ? 520 : -520;
        }
      } else {
        s.idleStart = -1;
        s.cyc = -1;
      }
      if (cfg.duration > 0 && !s.hover && !s.focus && !s.drag && !s.leave) {
        s.life += dt * 1000;
        if (bar) bar.style.transform = `scaleX(${Math.max(0, 1 - s.life / cfg.duration).toFixed(4)})`;
        if (s.life >= cfg.duration) s.leave = { mode: "fly", dir: 1, reason: "timeout" };
      }
      if (!s.drag) {
        let rem = dt;
        while (rem > 0) {
          const h = Math.min(rem, 1 / 120);
          if (s.leave && s.leave.mode === "fly") {
            const target = s.leave.dir * (w + 48);
            s.v += (140 * (target - s.x) - 22 * s.v) * h;
          } else if (!s.leave) {
            s.v += (-230 * s.x - 15 * s.v) * h;
          } else {
            s.v = 0;
          }
          s.x += s.v * h;
          rem -= h;
        }
        if (s.leave) {
          if (s.leave.mode === "fade") s.fade = Math.max(0, s.fade - dt / 0.22);
          const done = s.leave.mode === "fly" ? Math.abs(s.x) > w + 8 : s.fade <= 0;
          if (done) {
            const reason = s.leave.reason;
            draw();
            finish(reason);
            return;
          }
        } else if (Math.abs(s.x) < 0.01 && Math.abs(s.v) < 0.01) {
          s.x = 0;
          s.v = 0;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) {
        draw();
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    api.current.draw = draw;
    draw();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = (entries[entries.length - 1]?.isIntersecting ?? true) || !!s.leave;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el.parentElement ?? el);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        s.x = 0;
        s.v = 0;
        draw();
      } else wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, [isOpen, finish]);

  function leave(next: Leave) {
    const s = state.current;
    if (s.leave) return;
    if (api.current.reduced) {
      finish(next.reason);
      return;
    }
    s.leave = next;
    s.drag = false;
    api.current.wake();
  }

  if (!isOpen) {
    return <style href="hb-micro-swipe-toast" precedence="default">{css}</style>;
  }

  const vars = { "--hb-ql3-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-swipe-toast" precedence="default">{css}</style>
      <div
        role="status"
        aria-live="polite"
        aria-keyshortcuts="Escape"
        tabIndex={0}
        {...rest}
        ref={elRef}
        className={`hb-ql3 ${className}`}
        style={vars}
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
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "Escape" || e.key === "ArrowRight") {
            e.preventDefault();
            leave({ mode: "fly", dir: 1, reason: "keyboard" });
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            leave({ mode: "fly", dir: -1, reason: "keyboard" });
          }
        }}
        onPointerDown={(e) => {
          if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
          const s = state.current;
          if (s.leave) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          s.drag = true;
          s.startX = e.clientX;
          s.lastX = e.clientX;
          s.lastT = e.timeStamp;
          s.vel = 0;
          const cap = 150;
          const sign = s.x < 0 ? -1 : 1;
          const base = Math.min(0.99, Math.abs(s.x) / cap);
          s.v = 0;
          s.base = sign * -cap * Math.log(1 - base);
          api.current.wake();
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.drag) return;
          const cap = 150;
          const raw = s.base + (e.clientX - s.startX);
          const mag = cap * (1 - Math.exp(-Math.abs(raw) / cap));
          s.x = raw < 0 ? -mag : mag;
          const dt = Math.max(1, e.timeStamp - s.lastT);
          s.vel = Math.max(-3, Math.min(3, s.vel * 0.6 + ((e.clientX - s.lastX) / dt) * 0.4));
          s.lastX = e.clientX;
          s.lastT = e.timeStamp;
          api.current.draw();
        }}
        onPointerUp={(e) => {
          const s = state.current;
          if (!s.drag) return;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          s.drag = false;
          const w = e.currentTarget.clientWidth;
          const thresh = Math.min(72, w * 0.25);
          const dir = s.x < 0 ? -1 : 1;
          const flick = Math.abs(s.vel) > 0.55 && Math.sign(s.vel) === dir;
          if (Math.abs(s.x) > thresh || flick) {
            s.v = s.vel * 1000;
            leave({ mode: "fly", dir, reason: dir < 0 ? "left" : "right" });
          } else {
            s.v = s.vel * 1000;
            s.resumeAt = performance.now() + 2000;
            if (api.current.reduced) {
              s.x = 0;
              api.current.draw();
            } else api.current.wake();
          }
        }}
        onPointerCancel={() => {
          state.current.drag = false;
          api.current.wake();
        }}
      >
        <span className="hb-ql3-i" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <div className="hb-ql3-x">
          <p className="hb-ql3-t">{title}</p>
          {description ? <p className="hb-ql3-d">{description}</p> : null}
        </div>
        <button
          type="button"
          className="hb-ql3-u"
          onClick={() => {
            onUndo?.();
            leave({ mode: "fade", dir: 0, reason: "undo" });
          }}
        >
          {undoLabel}
        </button>
        {duration > 0 ? <div ref={barRef} className="hb-ql3-b" aria-hidden="true" /> : null}
      </div>
    </>
  );
}

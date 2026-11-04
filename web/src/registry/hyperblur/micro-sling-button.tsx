"use client";

import * as React from "react";

export interface MicroSlingButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  maxPull?: number;
  accent?: string;
  disabled?: boolean;
  idle?: boolean;
  onSling?: (power: number) => void;
}

const css = `
.hb-ql1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
  box-sizing: border-box;
  font-family: inherit;
  --hb-ql1-c: #2f7bff;
}
.hb-ql1 *, .hb-ql1 *::before, .hb-ql1 *::after { box-sizing: border-box; }
.hb-ql1-s {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.hb-ql1-b {
  fill: none;
  stroke: var(--hb-ql1-c);
  stroke-linecap: round;
}
.hb-ql1-p {
  fill: #171717;
  stroke: #3a3a3a;
  stroke-width: 2;
}
.hb-ql1-k {
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0.7em 1.5em;
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-ql1-c) 86%, #fff) 0%, var(--hb-ql1-c) 100%);
  border: 1px solid color-mix(in srgb, var(--hb-ql1-c) 60%, #fff);
  border-radius: 999px;
  box-shadow: 0 8px 22px -10px var(--hb-ql1-c), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  white-space: nowrap;
  will-change: transform;
}
.hb-ql1-k:active { cursor: grabbing; }
.hb-ql1-k:focus-visible { outline: 2px solid var(--hb-ql1-c); outline-offset: 4px; }
.hb-ql1-k:disabled { opacity: 0.45; cursor: not-allowed; }
`;

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function MicroSlingButton({
  children = "Sling",
  maxPull = 72,
  accent = "#2f7bff",
  disabled = false,
  idle = true,
  onSling,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: MicroSlingButtonProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const bandRef = React.useRef<SVGPathElement>(null);
  const postRef = React.useRef<SVGCircleElement>(null);
  const state = React.useRef({
    x: 0,
    v: 0,
    drag: false,
    dragged: false,
    startX: 0,
    baseRaw: 0,
    hover: false,
    resumeAt: 0,
    idleStart: -1,
  });
  const api = React.useRef({ wake: () => {}, draw: () => {}, reduced: false });
  const latest = React.useRef({ maxPull, idle, onSling });

  React.useEffect(() => {
    latest.current = { maxPull, idle, onSling };
  }, [maxPull, idle, onSling]);

  React.useEffect(() => {
    const track = trackRef.current;
    const btn = btnRef.current;
    const band = bandRef.current;
    const post = postRef.current;
    if (!track || !btn || !band || !post) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = () => {
      const pull = latest.current.maxPull;
      const w = track.clientWidth;
      const cy = track.clientHeight / 2;
      const bx = btn.offsetLeft + btn.offsetWidth + s.x;
      const px = w - 22;
      const stretch = Math.min(1.2, Math.max(0, -s.x) / pull);
      const slack = Math.max(0, s.x);
      const sag = 7 * (1 - Math.min(1, stretch * 2)) + slack * 1.3;
      const mid = (bx + px) / 2;
      band.setAttribute(
        "d",
        `M ${bx.toFixed(1)} ${cy.toFixed(1)} Q ${mid.toFixed(1)} ${(cy + sag).toFixed(1)} ${px.toFixed(1)} ${cy.toFixed(1)}`,
      );
      band.setAttribute("stroke-width", Math.max(2, 7 - 4.6 * stretch).toFixed(2));
      band.setAttribute("stroke-opacity", (0.45 + 0.5 * Math.min(1, stretch)).toFixed(2));
      post.setAttribute("cx", px.toFixed(1));
      post.setAttribute("cy", cy.toFixed(1));
      post.setAttribute("r", "7");
      btn.style.transform = `translate3d(${s.x.toFixed(2)}px,0,0) scale(${(1 + stretch * 0.07).toFixed(3)},${(1 - stretch * 0.05).toFixed(3)})`;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const cfg = latest.current;
      const idleOn = cfg.idle && !s.hover && !s.drag && now >= s.resumeAt && !api.current.reduced;
      let scripted = false;
      if (idleOn) {
        if (s.idleStart < 0) s.idleStart = now;
        const ph = (now - s.idleStart) % 3400;
        if (ph < 800) {
          scripted = true;
          s.x = -52 * ease(ph / 800);
          s.v = 0;
        }
      } else {
        s.idleStart = -1;
      }
      if (!s.drag && !scripted) {
        let rem = dt;
        while (rem > 0) {
          const h = Math.min(rem, 1 / 120);
          s.v += (-260 * s.x - 12 * s.v) * h;
          s.x += s.v * h;
          rem -= h;
        }
        if (Math.abs(s.x) < 0.01 && Math.abs(s.v) < 0.01) {
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
    if (!api.current.reduced) wake();

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(track);
    const ro = new ResizeObserver(() => draw());
    ro.observe(track);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        s.x = 0;
        s.v = 0;
        cancelAnimationFrame(raf);
        raf = 0;
        draw();
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

  function release(power: number) {
    const s = state.current;
    s.resumeAt = performance.now() + 2600;
    if (api.current.reduced) {
      s.x = 0;
      s.v = 0;
      api.current.draw();
    } else api.current.wake();
    latest.current.onSling?.(power);
  }

  function fire(power: number) {
    const s = state.current;
    s.drag = false;
    if (!api.current.reduced) {
      s.x = -latest.current.maxPull * power;
      s.v = 0;
    }
    release(power);
  }

  function move(clientX: number) {
    const s = state.current;
    const pull = latest.current.maxPull;
    const raw = s.baseRaw + (clientX - s.startX);
    if (Math.abs(clientX - s.startX) > 4) s.dragged = true;
    s.x = raw < 0 ? -pull * (1 - Math.exp(raw / pull)) : raw * 0.15;
    api.current.draw();
  }

  const vars = { "--hb-ql1-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-sling-button" precedence="default">{css}</style>
      <div
        {...rest}
        ref={trackRef}
        className={`hb-ql1 ${className}`}
        style={vars}
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
        <svg className="hb-ql1-s" aria-hidden="true">
          <path ref={bandRef} className="hb-ql1-b" d="M0 0" />
          <circle ref={postRef} className="hb-ql1-p" r="7" />
        </svg>
        <button
          ref={btnRef}
          type="button"
          className="hb-ql1-k"
          disabled={disabled}
          onPointerDown={(e) => {
            if (e.button !== 0 || disabled) return;
            const s = state.current;
            const pull = latest.current.maxPull;
            e.currentTarget.setPointerCapture(e.pointerId);
            s.drag = true;
            s.dragged = false;
            s.startX = e.clientX;
            s.baseRaw = s.x < 0 ? pull * Math.log(Math.max(0.01, 1 + s.x / pull)) : s.x / 0.15;
            s.v = 0;
            api.current.wake();
          }}
          onPointerMove={(e) => {
            if (state.current.drag) move(e.clientX);
          }}
          onPointerUp={(e) => {
            const s = state.current;
            if (!s.drag) return;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
            s.drag = false;
            if (s.dragged && s.x < -6) release(Math.min(1, -s.x / latest.current.maxPull));
            else {
              s.resumeAt = performance.now() + 2600;
              api.current.wake();
            }
          }}
          onPointerCancel={() => {
            state.current.drag = false;
            api.current.wake();
          }}
          onClick={() => {
            if (state.current.dragged) {
              state.current.dragged = false;
              return;
            }
            fire(0.62);
          }}
        >
          {children}
        </button>
      </div>
    </>
  );
}

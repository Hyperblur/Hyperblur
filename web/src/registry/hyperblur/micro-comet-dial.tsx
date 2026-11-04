"use client";

import * as React from "react";

export interface MicroCometDialProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  detents?: number;
  labels?: string[];
  size?: number;
  accent?: string;
  label?: string;
  idle?: boolean;
  onChange?: (value: number) => void;
}

const TAIL = 20;
const RC = 90;

const css = `
.hb-qla {
  position: relative;
  display: block;
  box-sizing: border-box;
  font-family: inherit;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  border-radius: 50%;
  --hb-qla-c: #2f7bff;
}
.hb-qla *, .hb-qla *::before, .hb-qla *::after { box-sizing: border-box; }
.hb-qla:active { cursor: grabbing; }
.hb-qla:focus-visible { outline: 2px solid var(--hb-qla-c); outline-offset: 4px; }
.hb-qla-v { display: block; width: 100%; height: 100%; overflow: visible; }
.hb-qla-o { fill: none; stroke: #1f1f1f; stroke-width: 2; }
.hb-qla-t { stroke: #3a3a3a; stroke-width: 2; stroke-linecap: round; transition: stroke 0.2s ease; }
.hb-qla-t[data-on="true"] { stroke: var(--hb-qla-c); stroke-width: 3.2; }
.hb-qla-k { stroke: #363636; stroke-width: 1.5; }
.hb-qla-n { stroke: var(--hb-qla-c); stroke-width: 4; stroke-linecap: round; }
.hb-qla-d { fill: none; stroke: #262626; stroke-width: 3; stroke-dasharray: 1.5 5.2; }
.hb-qla-s { fill: none; stroke: var(--hb-qla-c); stroke-linecap: butt; }
.hb-qla-e { fill: color-mix(in srgb, var(--hb-qla-c) 40%, #fff); }
.hb-qla-r {
  fill: none;
  stroke: var(--hb-qla-c);
  stroke-width: 2;
  transform-box: fill-box;
  transform-origin: 50% 50%;
  opacity: 0;
  animation: hb-qla-click 0.4s ease-out both;
}
.hb-qla-x {
  font-family: inherit;
  font-size: 34px;
  font-weight: 600;
  fill: #ededed;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
@keyframes hb-qla-click {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.12); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qla-t { transition: none; }
  .hb-qla-r { animation: none; }
}
`;

function wrap(a: number) {
  return ((((a + 180) % 360) + 360) % 360) - 180;
}

export function MicroCometDial({
  value,
  defaultValue = 0,
  detents = 12,
  labels,
  size = 152,
  accent = "#2f7bff",
  label = "Dial",
  idle = true,
  onChange,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: MicroCometDialProps) {
  const n = Math.max(2, Math.round(detents));
  const stepDeg = 360 / n;
  const [inner, setInner] = React.useState(defaultValue);
  const val = (((value ?? inner) % n) + n) % n;
  const [shown, setShown] = React.useState(val);
  const [flash, setFlash] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const knobRef = React.useRef<SVGGElement>(null);
  const headRef = React.useRef<SVGCircleElement>(null);
  const segs = React.useRef<(SVGPathElement | null)[]>([]);
  const state = React.useRef({
    th: val * (360 / n),
    w: 0,
    ho: 0,
    pa: 0,
    lastT: 0,
    drag: false,
    user: false,
    rest: null as number | null,
    hover: false,
    focus: false,
    resumeAt: 0,
    nextFlick: -1,
    dir: 1,
    ghosted: false,
    settledSince: -1,
    hist: [] as number[],
    shown: val,
  });
  const valRef = React.useRef(val);
  const api = React.useRef({ wake: () => {}, sync: () => {}, reduced: false });
  const latest = React.useRef({ n, step: stepDeg, idle, value, onChange });

  React.useEffect(() => {
    const s = state.current;
    valRef.current = val;
    latest.current = { n, step: stepDeg, idle, value, onChange };
    const idx = ((Math.round(s.th / stepDeg) % n) + n) % n;
    if (!s.drag && !s.user && idx !== val) {
      const base = val * stepDeg;
      s.rest = base + 360 * Math.round((s.th - base) / 360);
    }
    api.current.wake();
  }, [val, n, stepDeg, idle, value, onChange]);

  React.useEffect(() => {
    const root = rootRef.current;
    const knob = knobRef.current;
    const head = headRef.current;
    if (!root || !knob || !head) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const pt = (a: number) => {
      const r = (a * Math.PI) / 180;
      return { x: 100 + RC * Math.sin(r), y: 100 - RC * Math.cos(r) };
    };

    const sync = () => {
      const c = latest.current;
      const idx = ((Math.round(s.th / c.step) % c.n) + c.n) % c.n;
      if (idx !== s.shown) {
        s.shown = idx;
        setShown(idx);
        setFlash((f) => f + 1);
      }
      if (s.user && idx !== valRef.current) {
        valRef.current = idx;
        if (c.value === undefined) setInner(idx);
        c.onChange?.(idx);
      }
      const headAngle = s.th + s.ho;
      s.hist.unshift(headAngle);
      if (s.hist.length > TAIL) s.hist.length = TAIL;
      knob.setAttribute("transform", `rotate(${s.th.toFixed(2)} 100 100)`);
      const hp = pt(headAngle);
      head.setAttribute("cx", hp.x.toFixed(2));
      head.setAttribute("cy", hp.y.toFixed(2));
      for (let i = 0; i < TAIL - 1; i++) {
        const seg = segs.current[i];
        if (!seg) continue;
        const a = s.hist[i] ?? headAngle;
        const b = s.hist[i + 1] ?? a;
        const p = pt(a);
        const q = pt(b);
        const k = 1 - i / (TAIL - 1);
        seg.setAttribute("d", `M ${p.x.toFixed(2)} ${p.y.toFixed(2)} L ${q.x.toFixed(2)} ${q.y.toFixed(2)}`);
        seg.setAttribute("stroke-width", (0.6 + 4.6 * k).toFixed(2));
        seg.setAttribute("stroke-opacity", (0.9 * k * k).toFixed(3));
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const c = latest.current;
      const idleOn =
        c.idle && !api.current.reduced && !s.hover && !s.focus && !s.drag && s.rest === null && now >= s.resumeAt;
      if (idleOn) {
        if (s.nextFlick < 0) s.nextFlick = now + 1000;
        if (now >= s.nextFlick) {
          s.user = false;
          s.w = s.dir * 520;
          s.dir = -s.dir;
          s.nextFlick = now + 4600;
          s.ghosted = true;
          s.settledSince = -1;
        }
        if (s.ghosted && Math.abs(s.w) < 3) {
          if (s.settledSince < 0) s.settledSince = now;
          else if (now - s.settledSince > 900) {
            const idx = ((Math.round(s.th / c.step) % c.n) + c.n) % c.n;
            const base = valRef.current * c.step;
            if (idx !== valRef.current) s.rest = base + 360 * Math.round((s.th - base) / 360);
            s.ghosted = false;
          }
        }
      } else {
        s.nextFlick = -1;
      }
      let rem = dt;
      while (rem > 0) {
        const h = Math.min(rem, 1 / 120);
        if (!s.drag) {
          const phase = (s.th / c.step) * 2 * Math.PI;
          let acc = -150 * (c.step / (2 * Math.PI)) * Math.sin(phase);
          let damp = 1.4 + 8 * (1 - Math.min(1, Math.abs(s.w) / 160));
          if (s.rest !== null) {
            acc += 120 * (s.rest - s.th);
            damp = 16;
          }
          s.w += (acc - damp * s.w) * h;
          s.th += s.w * h;
        }
        rem -= h;
      }
      if (s.rest !== null && Math.abs(s.rest - s.th) < 0.15 && Math.abs(s.w) < 2) {
        s.th = s.rest;
        s.w = 0;
        s.rest = null;
      }
      s.ho = s.drag ? wrap(s.pa - s.th) : s.ho * Math.exp(-dt * 9);
      sync();
      const near = Math.abs(s.th - Math.round(s.th / c.step) * c.step) < 0.05;
      const settled = !s.drag && s.rest === null && Math.abs(s.w) < 0.2 && near && Math.abs(s.ho) < 0.2;
      if (settled && !idleOn) {
        s.th = Math.round(s.th / c.step) * c.step;
        s.w = 0;
        s.ho = 0;
        s.hist.fill(s.th);
        sync();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) {
        if (s.rest !== null) {
          s.th = s.rest;
          s.rest = null;
        }
        s.ho = s.drag ? wrap(s.pa - s.th) : 0;
        sync();
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    api.current.wake = wake;
    api.current.sync = sync;
    s.hist.length = 0;
    sync();
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
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        s.w = 0;
        s.th = Math.round(s.th / latest.current.step) * latest.current.step;
      }
      wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function angleOf(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  }

  function stepBy(delta: number) {
    const s = state.current;
    const base = Math.round(s.th / stepDeg) + delta;
    s.user = true;
    s.w = 0;
    s.ghosted = false;
    s.rest = base * stepDeg;
    s.resumeAt = performance.now() + 2600;
    api.current.wake();
  }

  const vars = { "--hb-qla-c": accent, width: size, height: size, ...style } as React.CSSProperties;
  const text = labels?.[shown] ?? String(shown).padStart(2, "0");
  const ticks = Array.from({ length: n }, (_, i) => {
    const a = (i * stepDeg * Math.PI) / 180;
    return {
      x1: (100 + 72 * Math.sin(a)).toFixed(2),
      y1: (100 - 72 * Math.cos(a)).toFixed(2),
      x2: (100 + 82 * Math.sin(a)).toFixed(2),
      y2: (100 - 82 * Math.cos(a)).toFixed(2),
    };
  });

  return (
    <>
      <style href="hb-micro-comet-dial" precedence="default">{css}</style>
      <div
        {...rest}
        ref={rootRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={n - 1}
        aria-valuenow={val}
        aria-valuetext={labels?.[val] ?? String(val)}
        className={`hb-qla ${className}`}
        style={vars}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          const s = state.current;
          s.hover = true;
          if (s.ghosted) {
            const base = valRef.current * stepDeg;
            s.rest = base + 360 * Math.round((s.th - base) / 360);
            s.ghosted = false;
            api.current.wake();
          }
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          state.current.hover = false;
          state.current.resumeAt = performance.now() + 1800;
          api.current.wake();
        }}
        onFocus={(e) => {
          onFocus?.(e);
          state.current.focus = true;
        }}
        onBlur={(e) => {
          onBlur?.(e);
          state.current.focus = false;
          state.current.resumeAt = performance.now() + 1800;
          api.current.wake();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            stepBy(1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            stepBy(-1);
          } else if (e.key === "PageUp") {
            e.preventDefault();
            stepBy(3);
          } else if (e.key === "PageDown") {
            e.preventDefault();
            stepBy(-3);
          }
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          const s = state.current;
          e.currentTarget.setPointerCapture(e.pointerId);
          s.drag = true;
          s.user = true;
          s.rest = null;
          s.ghosted = false;
          s.w = 0;
          s.pa = angleOf(e);
          s.lastT = e.timeStamp;
          api.current.wake();
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.drag) return;
          const a = angleOf(e);
          const d = wrap(a - s.pa);
          s.pa = a;
          s.th += d;
          const dtm = Math.max(1, e.timeStamp - s.lastT);
          s.w = s.w * 0.5 + ((d / dtm) * 1000) * 0.5;
          s.lastT = e.timeStamp;
          if (api.current.reduced) {
            s.ho = wrap(s.pa - s.th);
            api.current.sync();
          } else api.current.wake();
        }}
        onPointerUp={(e) => {
          const s = state.current;
          if (!s.drag) return;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          s.drag = false;
          if (e.timeStamp - s.lastT > 90) s.w = 0;
          s.w = Math.max(-1400, Math.min(1400, s.w));
          s.resumeAt = performance.now() + 2600;
          if (api.current.reduced) {
            s.th = Math.round(s.th / stepDeg) * stepDeg;
            s.w = 0;
            s.ho = 0;
            api.current.sync();
          } else api.current.wake();
        }}
        onPointerCancel={() => {
          state.current.drag = false;
          api.current.wake();
        }}
      >
        <svg className="hb-qla-v" viewBox="0 0 200 200" aria-hidden="true">
          <circle className="hb-qla-o" cx="100" cy="100" r="95" />
          {ticks.map((t, i) => (
            <line key={i} className="hb-qla-t" data-on={i === shown} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
          ))}
          {Array.from({ length: TAIL - 1 }, (_, i) => (
            <path
              key={i}
              ref={(el) => {
                segs.current[i] = el;
              }}
              className="hb-qla-s"
              d=""
              strokeOpacity="0"
            />
          ))}
          <circle ref={headRef} className="hb-qla-e" cx="100" cy="10" r="4.6" />
          <g ref={knobRef}>
            <circle className="hb-qla-k" cx="100" cy="100" r="62" fill="#1c1c1c" />
            <circle className="hb-qla-d" cx="100" cy="100" r="56" />
            <line className="hb-qla-n" x1="100" y1="46" x2="100" y2="58" />
          </g>
          <circle cx="100" cy="100" r="40" fill="#0c0c0c" stroke="#222222" strokeWidth="1.5" />
          {flash > 0 ? <circle key={flash} className="hb-qla-r" cx="100" cy="100" r="62" /> : null}
          <text className="hb-qla-x" x="100" y="100" textAnchor="middle" dominantBaseline="central">
            {text}
          </text>
        </svg>
      </div>
    </>
  );
}

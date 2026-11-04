"use client";

import * as React from "react";

export interface MicroRubberSegmentOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface MicroRubberSegmentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options?: MicroRubberSegmentOption[];
  value?: string;
  defaultValue?: string;
  accent?: string;
  idle?: boolean;
  onChange?: (value: string) => void;
}

const defaultOptions: MicroRubberSegmentOption[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const css = `
.hb-ql7 {
  position: relative;
  display: flex;
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  font-family: inherit;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 16px;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  --hb-ql7-c: #2f7bff;
}
.hb-ql7 *, .hb-ql7 *::before, .hb-ql7 *::after { box-sizing: border-box; }
.hb-ql7-p {
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-ql7-c) 82%, #fff), var(--hb-ql7-c));
  border-radius: 12px;
  box-shadow: 0 8px 20px -8px var(--hb-ql7-c), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  will-change: transform, width;
}
.hb-ql7-b {
  position: relative;
  z-index: 1;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  padding: 0.7em 0.5em;
  overflow: hidden;
  font: inherit;
  font-size: 0.92em;
  font-weight: 600;
  color: #8f8f8f;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: none;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: color 0.25s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-ql7-b:hover { color: #ededed; }
.hb-ql7-b[data-on="true"] { color: #fff; }
.hb-ql7-b:disabled { opacity: 0.4; cursor: not-allowed; }
.hb-ql7-b:focus-visible { outline: 2px solid #fff; outline-offset: -3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-ql7-b { transition: none; }
}
`;

export function MicroRubberSegment({
  options = defaultOptions,
  value,
  defaultValue,
  accent = "#2f7bff",
  idle = true,
  onChange,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: MicroRubberSegmentProps) {
  const firstEnabled = options.find((o) => !o.disabled)?.value ?? options[0]?.value ?? "";
  const [inner, setInner] = React.useState(defaultValue ?? firstEnabled);
  const current = value ?? inner;
  const valueIdx = Math.max(0, options.findIndex((o) => o.value === current));
  const [ghost, setGhost] = React.useState<number | null>(null);
  const [engaged, setEngaged] = React.useState(false);
  const shown = ghost !== null && ghost < options.length ? ghost : valueIdx;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);
  const btns = React.useRef<(HTMLButtonElement | null)[]>([]);
  const state = React.useRef({
    L: -1,
    R: 0,
    vL: 0,
    vR: 0,
    dir: 1,
    drag: false,
    prev: -1,
  });
  const api = React.useRef({ wake: () => {}, reduced: false });
  const latest = React.useRef({ shown, value, onChange, options });

  React.useEffect(() => {
    const s = state.current;
    latest.current = { shown, value, onChange, options };
    if (s.prev !== shown) {
      s.dir = s.prev < 0 ? 1 : shown >= s.prev ? 1 : -1;
      s.prev = shown;
    }
    api.current.wake();
  }, [shown, value, onChange, options]);

  React.useEffect(() => {
    const root = rootRef.current;
    const pill = pillRef.current;
    if (!root || !pill) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const target = () => {
      const b = btns.current[latest.current.shown];
      if (!b) return null;
      return { l: b.offsetLeft, r: b.offsetLeft + b.offsetWidth };
    };

    const draw = (tw: number) => {
      const width = Math.max(4, s.R - s.L);
      const stretch = tw > 0 ? width / tw : 1;
      const sy = 1 / Math.sqrt(Math.max(0.6, stretch));
      pill.style.width = `${width.toFixed(2)}px`;
      pill.style.transform = `translate3d(${s.L.toFixed(2)}px,0,0) scaleY(${Math.min(1.08, sy).toFixed(3)})`;
    };

    const placeNow = () => {
      const t = target();
      if (!t) return;
      s.L = t.l;
      s.R = t.r;
      s.vL = 0;
      s.vR = 0;
      draw(t.r - t.l);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const t = target();
      if (!t) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (s.L < 0) {
        s.L = t.l;
        s.R = t.r;
      }
      const lead = { k: 520, c: 30 };
      const trail = { k: 170, c: 17 };
      const gl = s.dir > 0 ? trail : lead;
      const gr = s.dir > 0 ? lead : trail;
      let rem = dt;
      while (rem > 0) {
        const h = Math.min(rem, 1 / 120);
        s.vL += (gl.k * (t.l - s.L) - gl.c * s.vL) * h;
        s.L += s.vL * h;
        s.vR += (gr.k * (t.r - s.R) - gr.c * s.vR) * h;
        s.R += s.vR * h;
        rem -= h;
      }
      draw(t.r - t.l);
      const settled =
        Math.abs(t.l - s.L) < 0.05 && Math.abs(t.r - s.R) < 0.05 && Math.abs(s.vL) < 0.05 && Math.abs(s.vR) < 0.05;
      if (settled) {
        s.L = t.l;
        s.R = t.r;
        s.vL = 0;
        s.vR = 0;
        draw(t.r - t.l);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) {
        placeNow();
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
    io.observe(root);
    const ro = new ResizeObserver(() => {
      s.L = -1;
      placeNow();
      wake();
    });
    ro.observe(root);
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

  React.useEffect(() => {
    if (!idle || engaged || options.length < 2) {
      const reset = window.setTimeout(() => setGhost(null), 0);
      return () => window.clearTimeout(reset);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = options.length;
    const stride = Math.max(1, n - 1);
    let g = valueIdx;
    const id = window.setInterval(() => {
      let next = (g + stride) % n;
      let guard = 0;
      while (options[next]?.disabled && guard < n) {
        next = (next + 1) % n;
        guard++;
      }
      g = next;
      setGhost(g);
    }, 1800);
    return () => window.clearInterval(id);
  }, [idle, engaged, options, valueIdx]);

  function choose(i: number) {
    const o = options[i];
    if (!o || o.disabled) return;
    if (value === undefined) setInner(o.value);
    if (o.value !== current) onChange?.(o.value);
  }

  function indexAt(clientX: number) {
    let best = -1;
    let bestDist = Infinity;
    btns.current.forEach((b, i) => {
      if (!b || options[i]?.disabled) return;
      const r = b.getBoundingClientRect();
      const d = clientX < r.left ? r.left - clientX : clientX > r.right ? clientX - r.right : 0;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }

  function step(from: number, delta: number) {
    const n = options.length;
    for (let k = 1; k <= n; k++) {
      const i = (from + delta * k + n * k) % n;
      if (!options[i]?.disabled) return i;
    }
    return from;
  }

  const vars = { "--hb-ql7-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-rubber-segment" precedence="default">{css}</style>
      <div
        role="radiogroup"
        {...rest}
        ref={rootRef}
        className={`hb-ql7 ${className}`}
        style={vars}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          setEngaged(true);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          if (!state.current.drag) setEngaged(false);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setEngaged(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setEngaged(false);
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          const i = indexAt(e.clientX);
          if (i < 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          state.current.drag = true;
          choose(i);
        }}
        onPointerMove={(e) => {
          if (!state.current.drag) return;
          const i = indexAt(e.clientX);
          if (i >= 0) choose(i);
        }}
        onPointerUp={(e) => {
          if (!state.current.drag) return;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          state.current.drag = false;
        }}
        onPointerCancel={() => {
          state.current.drag = false;
        }}
        onKeyDown={(e) => {
          let next = -1;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = step(valueIdx, 1);
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = step(valueIdx, -1);
          else if (e.key === "Home") next = step(-1, 1);
          else if (e.key === "End") next = step(options.length, -1);
          else return;
          e.preventDefault();
          choose(next);
          btns.current[next]?.focus();
        }}
      >
        <span ref={pillRef} className="hb-ql7-p" aria-hidden="true" />
        {options.map((o, i) => (
          <button
            key={o.value}
            ref={(el) => {
              btns.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === valueIdx}
            tabIndex={i === valueIdx ? 0 : -1}
            disabled={o.disabled}
            className="hb-ql7-b"
            data-on={i === shown}
            onClick={(e) => {
              if (e.detail === 0) choose(i);
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </>
  );
}

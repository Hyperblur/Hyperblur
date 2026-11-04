"use client";

import * as React from "react";

export type WheelOption = string | { value: string; label?: string };

export interface WheelOptionPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  options?: WheelOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  itemHeight?: number;
  rows?: number;
  accent?: string;
  hint?: boolean;
  label?: string;
}

const defaultOptions: WheelOption[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const STEP = 20;

const css = `
.hb-qu3 {
  --hb-qu3-a: #2f7bff;
  --hb-qu3-h: 40px;
  --hb-qu3-rows: 5;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: calc(var(--hb-qu3-h) * var(--hb-qu3-rows));
  overflow: hidden;
  perspective: 700px;
  perspective-origin: 50% 50%;
  font-family: inherit;
  font-size: 17px;
  color: #8f8f8f;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-x;
  border-radius: 14px;
}
.hb-qu3 *, .hb-qu3 *::before, .hb-qu3 *::after { box-sizing: border-box; }
.hb-qu3[data-drag="true"] { cursor: grabbing; }
.hb-qu3:focus-visible { outline: 2px solid var(--hb-qu3-a); outline-offset: 2px; }
.hb-qu3-band {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: var(--hb-qu3-h);
  margin-top: calc(var(--hb-qu3-h) / -2);
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-qu3-a) 12%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-qu3-a) 38%, transparent);
  pointer-events: none;
}
.hb-qu3-opt {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--hb-qu3-h);
  margin-top: calc(var(--hb-qu3-h) / -2);
  padding: 0 12px;
  font-size: 1em;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: #8f8f8f;
  backface-visibility: hidden;
  transition: color 0.2s ease;
  will-change: transform, opacity;
}
.hb-qu3-opt > span { overflow: hidden; text-overflow: ellipsis; }
.hb-qu3-opt[data-on="true"] { color: #ededed; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-qu3-opt { transition: none; will-change: auto; }
}
`;

function normalize(options: WheelOption[]) {
  return options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : { value: o.value, label: o.label ?? o.value },
  );
}

function place(k: number, pos: number, radius: number) {
  const phi = (k - pos) * STEP;
  const a = Math.abs(phi);
  const op = a >= 84 ? 0 : Math.max(0, 1 - Math.pow(a / 84, 2.2));
  return {
    transform: `translateZ(${(-radius).toFixed(2)}px) rotateX(${(-phi).toFixed(3)}deg) translateZ(${radius.toFixed(2)}px)`,
    opacity: op.toFixed(3),
    on: Math.abs(k - pos) < 0.5,
    hidden: a >= 84,
  };
}

interface Api {
  commit: (i: number) => void;
}

export function WheelOptionPicker({
  options = defaultOptions,
  value,
  defaultValue,
  onChange,
  itemHeight = 40,
  rows = 5,
  accent = "#2f7bff",
  hint = true,
  label = "Option picker",
  className = "",
  style,
  ...rest
}: WheelOptionPickerProps) {
  const items = React.useMemo(() => normalize(options), [options]);
  const n = items.length;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value ?? "");
  const current = controlled ? value : inner;
  const found = items.findIndex((o) => o.value === current);
  const index = found < 0 ? 0 : found;
  const uid = React.useId();
  const [first] = React.useState(index);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const optEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(index);
  const targetRef = React.useRef(index);
  const loopApi = React.useRef<{ kick: () => void }>({ kick: () => undefined });
  const api = React.useRef<Api>({ commit: () => undefined });
  const radius = itemHeight / (2 * Math.tan((STEP * Math.PI) / 360));

  React.useEffect(() => {
    api.current = {
      commit: (i: number) => {
        const clamped = Math.max(0, Math.min(n - 1, i));
        targetRef.current = clamped;
        loopApi.current.kick();
        const next = items[clamped];
        if (!next) return;
        if (!controlled) setInner(next.value);
        onChange?.(next.value);
      },
    };
  });

  React.useEffect(() => {
    if (targetRef.current !== index) {
      targetRef.current = index;
      loopApi.current.kick();
    }
  }, [index]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || n === 0) return;
    const els = optEls.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = {
      raf: 0,
      prev: 0,
      nudge: 0,
      touched: false,
      hover: false,
      focus: false,
      drag: false,
      id: -1,
      active: false,
      startY: 0,
      startPos: 0,
      lastY: 0,
      lastT: 0,
      v: 0,
      acc: 0,
      accTimer: 0,
    };

    function apply() {
      for (let k = 0; k < n; k++) {
        const el = els[k];
        if (!el) continue;
        const p = place(k, posRef.current, radius);
        el.style.transform = p.transform;
        el.style.opacity = p.opacity;
        el.style.pointerEvents = p.hidden ? "none" : "auto";
        el.dataset.on = String(p.on);
      }
    }

    function tick(now: number) {
      const dt = Math.min(0.05, Math.max(0, (now - s.prev) / 1000));
      s.prev = now;
      if (!s.drag) {
        const goal = targetRef.current + s.nudge;
        const diff = goal - posRef.current;
        if (reduce || Math.abs(diff) < 0.002) {
          posRef.current = goal;
          s.raf = 0;
          apply();
          return;
        }
        posRef.current += diff * (1 - Math.exp(-dt * 9));
      }
      apply();
      s.raf = requestAnimationFrame(tick);
    }

    function kick() {
      if (s.raf) return;
      s.prev = performance.now();
      s.raf = requestAnimationFrame(tick);
    }

    loopApi.current = { kick };

    function onDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.id = e.pointerId;
      s.active = false;
      s.startY = e.clientY;
      s.startPos = posRef.current;
      s.lastY = e.clientY;
      s.lastT = e.timeStamp;
      s.v = 0;
    }

    function onMove(e: PointerEvent) {
      if (e.pointerId !== s.id) return;
      const dy = e.clientY - s.startY;
      if (!s.active) {
        if (Math.abs(dy) < 5) return;
        s.active = true;
        s.drag = true;
        s.touched = true;
        s.nudge = 0;
        root!.dataset.drag = "true";
        root!.setPointerCapture(e.pointerId);
      }
      const dtm = Math.max(0.001, (e.timeStamp - s.lastT) / 1000);
      s.v = s.v * 0.6 + (-(e.clientY - s.lastY) / itemHeight / dtm) * 0.4;
      s.lastY = e.clientY;
      s.lastT = e.timeStamp;
      posRef.current = Math.max(-0.45, Math.min(n - 0.55, s.startPos - dy / itemHeight));
      apply();
    }

    function onUp(e: PointerEvent) {
      if (e.pointerId !== s.id) return;
      s.id = -1;
      if (!s.active) return;
      s.active = false;
      s.drag = false;
      root!.dataset.drag = "false";
      if (root!.hasPointerCapture(e.pointerId)) root!.releasePointerCapture(e.pointerId);
      const fling = Math.max(-12, Math.min(12, s.v)) * 0.22;
      api.current.commit(Math.round(posRef.current + fling));
    }

    function onWheel(e: WheelEvent) {
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = targetRef.current + dir;
      if (next < 0 || next > n - 1) return;
      e.preventDefault();
      s.touched = true;
      s.nudge = 0;
      s.acc += e.deltaY;
      window.clearTimeout(s.accTimer);
      s.accTimer = window.setTimeout(() => {
        s.acc = 0;
      }, 180);
      if (Math.abs(s.acc) >= 40) {
        s.acc = 0;
        api.current.commit(next);
      }
    }

    function onKey(e: KeyboardEvent) {
      const t = targetRef.current;
      let next = -1;
      if (e.key === "ArrowDown") next = t + 1;
      else if (e.key === "ArrowUp") next = t - 1;
      else if (e.key === "PageDown") next = t + 3;
      else if (e.key === "PageUp") next = t - 3;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const ch = e.key.toLowerCase();
        for (let o = 1; o <= n; o++) {
          const k = (t + o) % n;
          if (items[k].label.toLowerCase().startsWith(ch)) {
            next = k;
            break;
          }
        }
      }
      if (next < 0) return;
      e.preventDefault();
      s.touched = true;
      s.nudge = 0;
      api.current.commit(next);
    }

    function onEnter(e: PointerEvent) {
      if (e.pointerType === "mouse") s.hover = true;
    }
    function onLeave() {
      s.hover = false;
    }
    function onFocusIn() {
      s.focus = true;
    }
    function onFocusOut() {
      s.focus = false;
    }

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("keydown", onKey);
    root.addEventListener("wheel", onWheel, { passive: false });

    apply();

    let hintTimer = 0;
    let backTimer = 0;
    let flip = 1;
    if (hint && !reduce) {
      const run = () => {
        if (!s.touched && !s.hover && !s.focus && !s.drag) {
          s.nudge = 0.42 * flip;
          flip = -flip;
          kick();
          backTimer = window.setTimeout(() => {
            s.nudge = 0;
            kick();
          }, 520);
        }
        hintTimer = window.setTimeout(run, 3400);
      };
      hintTimer = window.setTimeout(run, 1600);
    }

    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      window.clearTimeout(hintTimer);
      window.clearTimeout(backTimer);
      window.clearTimeout(s.accTimer);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("keydown", onKey);
      root.removeEventListener("wheel", onWheel);
    };
  }, [n, items, itemHeight, radius, hint]);

  const vars = {
    "--hb-qu3-a": accent,
    "--hb-qu3-h": `${itemHeight}px`,
    "--hb-qu3-rows": String(rows),
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-wheel-option-picker" precedence="default">{css}</style>
      <div
        ref={rootRef}
        role="listbox"
        aria-label={label}
        aria-activedescendant={n > 0 ? `${uid}-${index}` : undefined}
        tabIndex={0}
        data-drag="false"
        className={`hb-qu3 ${className}`}
        style={vars}
        {...rest}
      >
        <div className="hb-qu3-band" aria-hidden="true" />
        {items.map((o, k) => {
          const p = place(k, first, radius);
          return (
            <div
              key={`${o.value}-${k}`}
              id={`${uid}-${k}`}
              ref={(el) => {
                optEls.current[k] = el;
              }}
              role="option"
              aria-selected={k === index}
              data-on={p.on}
              className="hb-qu3-opt"
              style={{
                transform: p.transform,
                opacity: p.opacity,
                pointerEvents: p.hidden ? "none" : "auto",
              }}
              onClick={() => api.current.commit(k)}
            >
              <span>{o.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

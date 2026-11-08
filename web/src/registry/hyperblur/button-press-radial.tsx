"use client";

import * as React from "react";

export interface ButtonPressRadialOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonPressRadialProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options?: ButtonPressRadialOption[];
  label?: string;
  icon?: React.ReactNode;
  holdTime?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  accent?: string;
  disabled?: boolean;
  onPress?: () => void;
  onSelect?: (id: string) => void;
  onOpenChange?: (open: boolean) => void;
}

const css = `
.hb-xb12 {
  --hb-xb12-c: #2f7bff;
  --hb-xb12-hold: 480ms;
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-xb12 *, .hb-xb12 *::before, .hb-xb12 *::after { box-sizing: border-box; }
.hb-xb12-main {
  position: relative;
  z-index: 3;
  width: 52px;
  height: 52px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font: inherit;
  cursor: pointer;
  background: radial-gradient(120% 120% at 30% 15%, color-mix(in srgb, var(--hb-xb12-c) 70%, #fff) 0%, var(--hb-xb12-c) 50%, color-mix(in srgb, var(--hb-xb12-c) 75%, #000) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 24px -10px var(--hb-xb12-c), 0 3px 8px -2px rgba(0, 0, 0, 0.6);
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease;
}
.hb-xb12[data-press="true"] .hb-xb12-main { transform: scale(0.9); }
.hb-xb12[data-open="true"] .hb-xb12-main { transform: scale(0.82); background: radial-gradient(120% 120% at 30% 15%, #3a3a3a 0%, #1f1f1f 60%, #141414 100%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 0 1px #333; }
.hb-xb12-main:focus-visible { outline: 2px solid var(--hb-xb12-c); outline-offset: 4px; }
.hb-xb12-main:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xb12-main svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb12[data-open="true"] .hb-xb12-main svg { transform: scale(0.85); }
.hb-xb12-ring { position: absolute; inset: -7px; width: calc(100% + 14px); height: calc(100% + 14px); transform: rotate(-90deg); pointer-events: none; z-index: 2; }
.hb-xb12-ring circle { fill: none; stroke: var(--hb-xb12-c); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 201; stroke-dashoffset: 201; opacity: 0; }
.hb-xb12[data-press="true"] .hb-xb12-ring circle { opacity: 1; animation: hb-xb12-fill var(--hb-xb12-hold) cubic-bezier(0.4, 0, 0.6, 1) forwards; }
.hb-xb12-halo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--hb-xb12-r) * 2 + 96px);
  height: calc(var(--hb-xb12-r) * 2 + 96px);
  margin: calc((var(--hb-xb12-r) * 2 + 96px) / -2);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(8, 8, 8, 0.9) 0%, rgba(8, 8, 8, 0.65) 42%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}
.hb-xb12[data-open="true"] .hb-xb12-halo { opacity: 1; transform: none; }
.hb-xb12-beam {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-xb12-bl, 0px);
  height: 2px;
  margin-top: -1px;
  transform-origin: 0 50%;
  transform: rotate(var(--hb-xb12-ba, 0deg));
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-xb12-c) 80%, #fff));
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.2s ease;
}
.hb-xb12[data-drag="true"] .hb-xb12-beam { opacity: 0.8; }
.hb-xb12-opts { position: absolute; left: 50%; top: 50%; width: 0; height: 0; margin: 0; padding: 0; list-style: none; z-index: 2; }
.hb-xb12-opt {
  position: absolute;
  left: -22px;
  top: -22px;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #d4d4d4;
  font: inherit;
  cursor: pointer;
  background: linear-gradient(180deg, #242424, #181818);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px #2f2f2f, 0 10px 20px -10px rgba(0, 0, 0, 0.95);
  opacity: 0;
  visibility: hidden;
  transform: translate(0, 0) scale(0.2);
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.3, 1), opacity 0.2s ease, visibility 0s linear 0.3s, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
}
.hb-xb12[data-open="true"] .hb-xb12-opt {
  opacity: 1;
  visibility: visible;
  transform: translate(var(--hb-xb12-x), var(--hb-xb12-y)) scale(1);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--hb-xb12-d, 0s), opacity 0.2s ease var(--hb-xb12-d, 0s), visibility 0s, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
}
.hb-xb12[data-open="true"] .hb-xb12-opt[data-hot="true"] {
  color: #fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb12-c) 75%, #fff) 0%, var(--hb-xb12-c) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px var(--hb-xb12-c), 0 10px 24px -8px var(--hb-xb12-c);
  transform: translate(var(--hb-xb12-x), var(--hb-xb12-y)) scale(1.14);
  transition-delay: 0s;
}
.hb-xb12-opt:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-xb12-c) 80%, #fff); outline-offset: 3px; }
.hb-xb12-opt svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb12-cap {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 7px;
  font-size: 11.5px;
  font-weight: 600;
  color: #ededed;
  background: #1c1c1c;
  box-shadow: 0 0 0 1px #2e2e2e, 0 8px 18px -8px rgba(0, 0, 0, 0.9);
  opacity: 0;
  transform: translate(-50%, 4px);
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xb12-opt[data-hot="true"] .hb-xb12-cap { opacity: 1; transform: translate(-50%, 0); }
@keyframes hb-xb12-fill { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb12 *, .hb-xb12-opt, .hb-xb12[data-open="true"] .hb-xb12-opt { transition-duration: 0.01s !important; transition-delay: 0s !important; }
  .hb-xb12[data-press="true"] .hb-xb12-ring circle { animation-timing-function: steps(4, end); }
}
`;

const ico = (d: string) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

const defaultOptions: ButtonPressRadialOption[] = [
  { id: "schedule", label: "Schedule send", icon: ico("M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2") },
  { id: "silent", label: "Send without sound", icon: ico("M9.5 19.5a2.6 2.6 0 0 0 5 0M6.3 6.8A6 6 0 0 0 6 8.7V14l-1.6 2.6h11.3M9 4.3A6 6 0 0 1 18 9.2V14M3.5 3.5l17 17") },
  { id: "draft", label: "Save as draft", icon: ico("M14 3.5H7.5c-1 0-2 .9-2 2v13c0 1.1 1 2 2 2h9c1.1 0 2-.9 2-2V8zM14 3.5V8h4.5M9 14.5l2 2 4-4") },
  { id: "vanish", label: "Disappearing message", icon: ico("M12 20.5a8.5 8.5 0 1 1 8.5-8.5M12 7.5V12h4M17.5 16.5l3 3M20.5 16.5l-3 3") },
];

export function ButtonPressRadial({
  options = defaultOptions,
  label = "Send",
  icon,
  holdTime = 480,
  radius = 84,
  startAngle = 165,
  endAngle = 15,
  accent = "#2f7bff",
  disabled = false,
  onPress,
  onSelect,
  onOpenChange,
  className = "",
  style,
  ...rest
}: ButtonPressRadialProps) {
  const id = React.useId();
  const [open, setOpenState] = React.useState(false);
  const [pressing, setPressing] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  const [hot, setHot] = React.useState(-1);
  const [beam, setBeam] = React.useState({ a: 0, l: 0 });
  const root = React.useRef<HTMLDivElement>(null);
  const main = React.useRef<HTMLButtonElement>(null);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const timer = React.useRef(0);
  const phase = React.useRef<"idle" | "pressing" | "drag">("idle");
  const hotRef = React.useRef(-1);
  const suppress = React.useRef(false);

  const n = options.length;
  const pos = options.map((_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const deg = startAngle + (endAngle - startAngle) * t;
    const a = (deg * Math.PI) / 180;
    return { deg, x: Math.cos(a) * radius, y: -Math.sin(a) * radius };
  });

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  const setHotBoth = (i: number) => {
    hotRef.current = i;
    setHot(i);
  };

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpenState(false);
        setHot(-1);
        hotRef.current = -1;
        onOpenChange?.(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, onOpenChange]);

  const close = (refocus: boolean) => {
    setOpen(false);
    setDrag(false);
    setHotBoth(-1);
    phase.current = "idle";
    if (refocus) main.current?.focus();
  };

  const choose = (i: number) => {
    const o = options[i];
    if (!o) return;
    onSelect?.(o.id);
    close(true);
  };

  const openWith = (focusFirst: boolean) => {
    setOpen(true);
    if (focusFirst) {
      setHotBoth(0);
      window.requestAnimationFrame(() => refs.current[0]?.focus());
    }
  };

  const track = (clientX: number, clientY: number) => {
    const el = main.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const deg = (Math.atan2(-dy, dx) * 180) / Math.PI;
    setBeam({ a: (Math.atan2(dy, dx) * 180) / Math.PI, l: Math.min(dist, radius) });
    if (dist < 30) {
      setHotBoth(-1);
      return;
    }
    let best = -1;
    let bestDiff = 999;
    pos.forEach((p, i) => {
      let diff = Math.abs(((deg - p.deg + 540) % 360) - 180);
      if (dist > radius + 60) diff += 999;
      if (diff < bestDiff) {
        bestDiff = diff;
        best = i;
      }
    });
    const span = n > 1 ? Math.abs(endAngle - startAngle) / (n - 1) : 60;
    setHotBoth(bestDiff <= Math.max(24, span * 0.75) ? best : -1);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || e.button !== 0) return;
    if (open) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    phase.current = "pressing";
    setPressing(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (phase.current !== "pressing") return;
      phase.current = "drag";
      setPressing(false);
      setDrag(true);
      openWith(false);
      if ("vibrate" in navigator) navigator.vibrate?.(8);
    }, holdTime);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (phase.current === "drag") track(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    window.clearTimeout(timer.current);
    const p = phase.current;
    setPressing(false);
    if (p === "pressing") {
      phase.current = "idle";
      onPress?.();
    } else if (p === "drag") {
      setDrag(false);
      phase.current = "idle";
      suppress.current = true;
      if (hotRef.current >= 0) choose(hotRef.current);
    }
  };

  const onPointerCancel = () => {
    window.clearTimeout(timer.current);
    setPressing(false);
    setDrag(false);
    phase.current = "idle";
  };

  const onRootKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    const i = refs.current.findIndex((el) => el === document.activeElement);
    const step = (d: number) => {
      const next = ((i < 0 ? (d > 0 ? -1 : 0) : i) + d + n) % n;
      setHotBoth(next);
      refs.current[next]?.focus();
    };
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div
      ref={root}
      className={`hb-xb12 ${className}`.trim()}
      data-open={open ? "true" : "false"}
      data-press={pressing ? "true" : "false"}
      data-drag={drag ? "true" : "false"}
      style={
        {
          "--hb-xb12-c": accent,
          "--hb-xb12-hold": `${holdTime}ms`,
          "--hb-xb12-r": `${radius}px`,
          "--hb-xb12-ba": `${beam.a.toFixed(1)}deg`,
          "--hb-xb12-bl": `${beam.l.toFixed(1)}px`,
          ...style,
        } as React.CSSProperties
      }
      onKeyDown={onRootKey}
      {...rest}
    >
      <style href="hb-button-press-radial" precedence="default">{css}</style>
      <span className="hb-xb12-halo" aria-hidden="true" />
      <span className="hb-xb12-beam" aria-hidden="true" />
      <ul id={`${id}-menu`} className="hb-xb12-opts" role="menu" aria-label={`${label} options`} aria-hidden={!open}>
        {options.map((o, i) => (
          <li key={o.id} role="none">
            <button
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="menuitem"
              className="hb-xb12-opt"
              tabIndex={open ? 0 : -1}
              aria-label={o.label}
              data-hot={hot === i ? "true" : "false"}
              style={
                {
                  "--hb-xb12-x": `${pos[i].x.toFixed(2)}px`,
                  "--hb-xb12-y": `${pos[i].y.toFixed(2)}px`,
                  "--hb-xb12-d": `${(i * 0.04).toFixed(2)}s`,
                } as React.CSSProperties
              }
              onPointerEnter={() => setHotBoth(i)}
              onPointerLeave={() => phase.current !== "drag" && setHotBoth(-1)}
              onFocus={() => setHotBoth(i)}
              onClick={() => choose(i)}
            >
              {o.icon ?? ico("M12 5v14M5 12h14")}
              <span className="hb-xb12-cap" aria-hidden="true">
                {o.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <svg className="hb-xb12-ring" viewBox="0 0 66 66" aria-hidden="true">
        <circle cx="33" cy="33" r="32" />
      </svg>
      <button
        ref={main}
        type="button"
        className="hb-xb12-main"
        disabled={disabled}
        aria-label={`${label}. Long press or press Arrow Up for more options.`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={(e) => {
          e.preventDefault();
          if (!disabled && !open && phase.current === "idle") openWith(false);
        }}
        onClick={(e) => {
          if (suppress.current) {
            suppress.current = false;
            return;
          }
          if (e.detail === 0 && !open) onPress?.();
          else if (open && phase.current === "idle" && e.detail > 0) close(false);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (!open && (e.key === "ArrowUp" || e.key === "ContextMenu" || (e.shiftKey && e.key === "F10"))) {
            e.preventDefault();
            e.stopPropagation();
            openWith(true);
          }
        }}
      >
        {icon ?? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.5 12L20 4.5 15 20l-3.2-6.3zM11.8 13.7L20 4.5" />
          </svg>
        )}
      </button>
    </div>
  );
}

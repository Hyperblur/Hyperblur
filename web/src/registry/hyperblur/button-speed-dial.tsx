"use client";

import * as React from "react";

export interface ButtonSpeedDialAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonSpeedDialProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  actions?: ButtonSpeedDialAction[];
  layout?: "arc" | "stack";
  startAngle?: number;
  endAngle?: number;
  radius?: number;
  labelSide?: "left" | "right";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (id: string) => void;
  label?: string;
  accent?: string;
  scrim?: boolean;
}

const css = `
.hb-xb8 {
  --hb-xb8-c: #2f7bff;
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-xb8 *, .hb-xb8 *::before, .hb-xb8 *::after { box-sizing: border-box; }
.hb-xb8-scrim {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--hb-xb8-sw, 260px);
  height: var(--hb-xb8-sw, 260px);
  margin: calc(var(--hb-xb8-sw, 260px) / -2);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.6) 45%, transparent 70%);
  opacity: 0;
  transform: scale(0.4);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xb8[data-open="true"] .hb-xb8-scrim { opacity: 1; transform: none; }
.hb-xb8-fab {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font: inherit;
  cursor: pointer;
  background: radial-gradient(120% 120% at 30% 15%, color-mix(in srgb, var(--hb-xb8-c) 70%, #fff) 0%, var(--hb-xb8-c) 45%, color-mix(in srgb, var(--hb-xb8-c) 75%, #000) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 12px 28px -10px var(--hb-xb8-c), 0 4px 10px -2px rgba(0, 0, 0, 0.6);
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, box-shadow 0.35s ease;
}
.hb-xb8-fab:hover { transform: translateY(-1px) scale(1.03); }
.hb-xb8-fab:active { transform: scale(0.94); }
.hb-xb8[data-open="true"] .hb-xb8-fab { background: radial-gradient(120% 120% at 30% 15%, #3a3a3a 0%, #1f1f1f 60%, #151515 100%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 0 1px #333, 0 12px 28px -10px rgba(0, 0, 0, 0.9); }
.hb-xb8-fab:focus-visible { outline: 2px solid var(--hb-xb8-c); outline-offset: 4px; }
.hb-xb8-fab svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb8[data-open="true"] .hb-xb8-fab svg { transform: rotate(135deg); }
.hb-xb8-list { position: absolute; left: 50%; top: 50%; width: 0; height: 0; margin: 0; padding: 0; list-style: none; z-index: 1; }
.hb-xb8-li { position: absolute; left: 0; top: 0; }
.hb-xb8-act {
  position: absolute;
  left: -21px;
  top: -21px;
  width: 42px;
  height: 42px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #ededed;
  font: inherit;
  cursor: pointer;
  background: linear-gradient(180deg, #232323, #181818);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px #2e2e2e, 0 10px 20px -10px rgba(0, 0, 0, 0.95);
  opacity: 0;
  visibility: hidden;
  transform: translate(0, 0) scale(0.3);
  transition: transform 0.38s cubic-bezier(0.55, 0, 0.3, 1) var(--hb-xb8-out, 0s), opacity 0.2s ease var(--hb-xb8-out, 0s), visibility 0s linear calc(var(--hb-xb8-out, 0s) + 0.38s), background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xb8[data-open="true"] .hb-xb8-act {
  opacity: 1;
  visibility: visible;
  transform: translate(var(--hb-xb8-x), var(--hb-xb8-y)) scale(1);
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--hb-xb8-in, 0s), opacity 0.2s ease var(--hb-xb8-in, 0s), visibility 0s, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xb8-act:hover, .hb-xb8-act:focus-visible { color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb8-c) 55%, #222), color-mix(in srgb, var(--hb-xb8-c) 35%, #161616)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 0 0 1px color-mix(in srgb, var(--hb-xb8-c) 60%, transparent), 0 10px 22px -10px var(--hb-xb8-c); outline: none; }
.hb-xb8-act svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb8-tip {
  position: absolute;
  top: 50%;
  white-space: nowrap;
  padding: 5px 9px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 550;
  color: #ededed;
  background: #1b1b1b;
  box-shadow: 0 0 0 1px #2c2c2c, 0 8px 18px -8px rgba(0, 0, 0, 0.9);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-50%) translateX(var(--hb-xb8-tx, 4px));
  transition: opacity 0.18s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xb8-tip[data-side="left"] { right: calc(100% + 9px); --hb-xb8-tx: 4px; }
.hb-xb8-tip[data-side="right"] { left: calc(100% + 9px); --hb-xb8-tx: -4px; }
.hb-xb8-tip[data-side="top"] { bottom: calc(100% + 8px); top: auto; left: 50%; transform: translateX(-50%) translateY(4px); }
.hb-xb8-act:hover .hb-xb8-tip, .hb-xb8-act:focus-visible .hb-xb8-tip { opacity: 1; transform: translateY(-50%); }
.hb-xb8-act:hover .hb-xb8-tip[data-side="top"], .hb-xb8-act:focus-visible .hb-xb8-tip[data-side="top"] { transform: translateX(-50%); }
.hb-xb8[data-layout="stack"][data-open="true"] .hb-xb8-tip { opacity: 1; transform: translateY(-50%); transition-delay: calc(var(--hb-xb8-in, 0s) + 0.12s); }
@media (prefers-reduced-motion: reduce) {
  .hb-xb8 *, .hb-xb8-act, .hb-xb8[data-open="true"] .hb-xb8-act { transition-duration: 0.01s !important; transition-delay: 0s !important; }
}
`;

const ico = (d: string) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

const defaultActions: ButtonSpeedDialAction[] = [
  { id: "note", label: "New note", icon: ico("M14 3.5H7.5c-1 0-2 .9-2 2v13c0 1.1 1 2 2 2h9c1.1 0 2-.9 2-2V8zM14 3.5V8h4.5M9 13h6M9 16.5h4") },
  { id: "photo", label: "Take photo", icon: ico("M4 8.5c0-1 .8-1.8 1.8-1.8h2l1.4-2h5.6l1.4 2h2c1 0 1.8.8 1.8 1.8v9c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8zM12 16.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6z") },
  { id: "voice", label: "Voice memo", icon: ico("M12 3.5a2.8 2.8 0 0 0-2.8 2.8v5.4a2.8 2.8 0 0 0 5.6 0V6.3A2.8 2.8 0 0 0 12 3.5zM6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3.5") },
  { id: "upload", label: "Upload file", icon: ico("M12 15.5V4.5M7.5 9L12 4.5 16.5 9M5 15v2.8c0 1 .8 1.7 1.7 1.7h10.6c1 0 1.7-.8 1.7-1.7V15") },
];

export function ButtonSpeedDial({
  actions = defaultActions,
  layout = "arc",
  startAngle = 90,
  endAngle = 180,
  radius = 82,
  labelSide = "left",
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  label = "Create",
  accent = "#2f7bff",
  scrim = true,
  className = "",
  style,
  ...rest
}: ButtonSpeedDialProps) {
  const id = React.useId();
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const root = React.useRef<HTMLDivElement>(null);
  const fab = React.useRef<HTMLButtonElement>(null);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const focusFirst = React.useRef(false);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    if (focusFirst.current) {
      focusFirst.current = false;
      refs.current[0]?.focus();
    }
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [isOpen, setOpen]);

  const n = actions.length;
  const pos = actions.map((_, i) => {
    if (layout === "stack") return { x: 0, y: -(i + 1) * 54 };
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = ((startAngle + (endAngle - startAngle) * t) * Math.PI) / 180;
    return { x: Math.cos(a) * radius, y: -Math.sin(a) * radius };
  });

  const tipSide = (x: number, y: number): "left" | "right" | "top" => {
    if (layout === "stack") return labelSide;
    if (Math.abs(x) < 14 && y < 0) return "top";
    return x <= 0 ? "left" : "right";
  };

  const onListKey = (e: React.KeyboardEvent) => {
    const i = refs.current.findIndex((el) => el === document.activeElement);
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      fab.current?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      refs.current[(i + 1) % n]?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      if (i <= 0) fab.current?.focus();
      else refs.current[i - 1]?.focus();
    }
  };

  return (
    <div
      ref={root}
      className={`hb-xb8 ${className}`.trim()}
      data-open={isOpen ? "true" : "false"}
      data-layout={layout}
      style={{ "--hb-xb8-c": accent, "--hb-xb8-sw": `${Math.round((layout === "stack" ? n * 54 : radius) * 2 + 120)}px`, ...style } as React.CSSProperties}
      onKeyDown={onListKey}
      {...rest}
    >
      <style href="hb-button-speed-dial" precedence="default">{css}</style>
      {scrim && <span className="hb-xb8-scrim" aria-hidden="true" />}
      <ul id={`${id}-menu`} className="hb-xb8-list" role="menu" aria-label={label} aria-hidden={!isOpen}>
        {actions.map((a, i) => (
          <li key={a.id} className="hb-xb8-li" role="none">
            <button
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="menuitem"
              className="hb-xb8-act"
              tabIndex={isOpen ? 0 : -1}
              aria-label={a.label}
              style={
                {
                  "--hb-xb8-x": `${pos[i].x.toFixed(2)}px`,
                  "--hb-xb8-y": `${pos[i].y.toFixed(2)}px`,
                  "--hb-xb8-in": `${(i * 0.045).toFixed(3)}s`,
                  "--hb-xb8-out": `${((n - 1 - i) * 0.03).toFixed(3)}s`,
                } as React.CSSProperties
              }
              onClick={() => {
                onSelect?.(a.id);
                setOpen(false);
                fab.current?.focus();
              }}
            >
              {a.icon ?? ico("M12 5v14M5 12h14")}
              <span className="hb-xb8-tip" data-side={tipSide(pos[i].x, pos[i].y)} aria-hidden="true">
                {a.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        ref={fab}
        type="button"
        className="hb-xb8-fab"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        onClick={() => setOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === "ArrowUp" || e.key === "Enter" || e.key === " ")) {
            focusFirst.current = true;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }
          } else if (isOpen && e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();
            refs.current[0]?.focus();
          }
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

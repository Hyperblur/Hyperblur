"use client";

import * as React from "react";

export type ToastVariant = "default" | "success" | "error";
export type ToastPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastApi {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

export interface ToastProviderProps {
  children?: React.ReactNode;
  position?: ToastPosition;
  max?: number;
  duration?: number;
  color?: string;
  inline?: boolean;
  className?: string;
}

interface ToastEntry {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  leaving: boolean;
}

const css = `
.hb-ts-v {
  position: fixed;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  width: 344px;
  max-width: 100vw;
  padding: 16px;
  pointer-events: none;
}
.hb-ts-bottom-right { bottom: 0; right: 0; --hb-ts-x: 32px; }
.hb-ts-bottom-left { bottom: 0; left: 0; --hb-ts-x: -32px; }
.hb-ts-top-right { top: 0; right: 0; --hb-ts-x: 32px; }
.hb-ts-top-left { top: 0; left: 0; --hb-ts-x: -32px; }
.hb-ts-v.hb-ts-inline {
  position: absolute;
  z-index: 10;
  width: min(344px, 100%);
  max-width: 100%;
  padding: 12px;
}
.hb-ts-t {
  --hb-ts-a: var(--hb-c);
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 12px 10px 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: #141414;
  color: #f2f2f2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  font: 14px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif;
  pointer-events: auto;
  touch-action: pan-y;
  user-select: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  animation: hb-ts-in 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-ts-t[data-variant="success"] { --hb-ts-a: #2fd17a; }
.hb-ts-t[data-variant="error"] { --hb-ts-a: #ff4d5e; }
.hb-ts-t[data-drag] { transition: none; }
.hb-ts-t[data-leaving] {
  pointer-events: none;
  animation: hb-ts-out 0.22s ease-in forwards;
}
.hb-ts-i {
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--hb-ts-a);
  box-shadow: 0 0 10px var(--hb-ts-a);
}
.hb-ts-m { flex: 1; min-width: 0; }
.hb-ts-title { font-weight: 600; }
.hb-ts-desc { margin-top: 2px; color: rgba(255, 255, 255, 0.62); font-size: 13px; }
.hb-ts-x {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
}
.hb-ts-x:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.hb-ts-x:focus-visible { outline: 2px solid var(--hb-ts-a); outline-offset: 1px; }
.hb-ts-b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--hb-ts-a);
  opacity: 0.7;
  transform-origin: left;
  animation: hb-ts-bar var(--hb-ts-d) linear forwards;
}
.hb-ts-t[data-paused] .hb-ts-b { animation-play-state: paused; }
@keyframes hb-ts-in { from { opacity: 0; transform: translateX(var(--hb-ts-x)); } }
@keyframes hb-ts-out { to { opacity: 0; transform: translateX(var(--hb-ts-o, var(--hb-ts-x))); } }
@keyframes hb-ts-bar { to { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) {
  .hb-ts-t { animation: none; transition: none; }
  .hb-ts-t[data-leaving] { animation: none; opacity: 0; }
  .hb-ts-b { display: none; }
}
`;

const ToastContext = React.createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const api = React.useContext(ToastContext);
  if (!api) throw new Error("useToast must be used inside <ToastProvider>");
  return api;
}

interface ToastItemProps {
  item: ToastEntry;
  onDismiss: (id: number) => void;
  onRemove: (id: number) => void;
}

function ToastItem({ item, onDismiss, onRemove }: ToastItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ x: number; dx: number } | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const left = React.useRef(item.duration);
  const started = React.useRef(0);
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const paused = hover || focused;

  React.useEffect(() => {
    if (item.leaving || paused || item.duration <= 0) return;
    started.current = performance.now();
    timer.current = window.setTimeout(() => onDismiss(item.id), Math.max(0, left.current));
    return () => {
      window.clearTimeout(timer.current);
      left.current -= performance.now() - started.current;
    };
  }, [paused, item.leaving, item.id, item.duration, onDismiss]);

  React.useEffect(() => {
    if (!item.leaving) return;
    const t = window.setTimeout(() => onRemove(item.id), 260);
    return () => window.clearTimeout(t);
  }, [item.leaving, item.id, onRemove]);

  function down(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || item.leaving) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { x: e.clientX, dx: 0 };
    setHover(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.setAttribute("data-drag", "");
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    d.dx = e.clientX - d.x;
    const el = e.currentTarget;
    el.style.transform = `translateX(${d.dx}px)`;
    el.style.opacity = String(Math.max(0.2, 1 - Math.abs(d.dx) / 240));
  }

  function up(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const el = e.currentTarget;
    el.removeAttribute("data-drag");
    if (Math.abs(d.dx) > 80) {
      el.style.setProperty("--hb-ts-o", `${Math.sign(d.dx) * 320}px`);
      onDismiss(item.id);
    } else {
      el.style.transform = "";
      el.style.opacity = "";
    }
  }

  function blur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
  }

  function key(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") onDismiss(item.id);
  }

  return (
    <div
      ref={ref}
      className="hb-ts-t"
      data-variant={item.variant}
      data-paused={paused ? "" : undefined}
      data-leaving={item.leaving ? "" : undefined}
      style={{ "--hb-ts-d": `${item.duration}ms` } as React.CSSProperties}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={blur}
      onKeyDown={key}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <span className="hb-ts-i" aria-hidden="true" />
      <div className="hb-ts-m">
        <div className="hb-ts-title">{item.title}</div>
        {item.description ? <div className="hb-ts-desc">{item.description}</div> : null}
      </div>
      <button
        type="button"
        className="hb-ts-x"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(item.id)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {item.duration > 0 ? <span className="hb-ts-b" aria-hidden="true" /> : null}
    </div>
  );
}

export function ToastProvider({
  children,
  position = "bottom-right",
  max = 3,
  duration = 4000,
  color = "#2f7bff",
  inline = false,
  className = "",
}: ToastProviderProps) {
  const counter = React.useRef(0);
  const [items, setItems] = React.useState<ToastEntry[]>([]);

  const dismiss = React.useCallback((id: number) => {
    setItems((list) => list.map((t) => (t.id === id && !t.leaving ? { ...t, leaving: true } : t)));
  }, []);

  const remove = React.useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = counter.current++;
      const entry: ToastEntry = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
        duration: options.duration ?? duration,
        leaving: false,
      };
      setItems((list) => {
        const next = [...list, entry];
        let active = next.filter((t) => !t.leaving).length;
        return next.map((t) => {
          if (active > max && !t.leaving && t.id !== id) {
            active -= 1;
            return { ...t, leaving: true };
          }
          return t;
        });
      });
      return id;
    },
    [max, duration],
  );

  const api = React.useMemo<ToastApi>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      <style href="hb-toast-stack" precedence="default">{css}</style>
      {children}
      <div
        className={`hb-ts-v hb-ts-${position}${inline ? " hb-ts-inline" : ""} ${className}`}
        style={{ "--hb-c": color } as React.CSSProperties}
        role="status"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {[...items].reverse().map((item) => (
          <ToastItem key={item.id} item={item} onDismiss={dismiss} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

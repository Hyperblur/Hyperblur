"use client";

import * as React from "react";

export interface ImageCompareLabels {
  before: string;
  after: string;
}

export interface ImageCompareProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  before: React.ReactNode;
  after: React.ReactNode;
  initial?: number;
  labels?: Partial<ImageCompareLabels>;
  orientation?: "horizontal" | "vertical";
}

const css = `
.hb-ic {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: inherit;
  background: #111;
  color: #fff;
  user-select: none;
  -webkit-user-select: none;
  cursor: ew-resize;
}
.hb-ic[data-o="horizontal"] { touch-action: pan-y; }
.hb-ic[data-o="vertical"] { touch-action: pan-x; cursor: ns-resize; }
.hb-ic-layer { position: absolute; inset: 0; pointer-events: none; }
.hb-ic-layer > * { display: block; width: 100%; height: 100%; object-fit: cover; }
.hb-ic-layer img { -webkit-user-drag: none; }
.hb-ic[data-o="horizontal"] .hb-ic-after { clip-path: inset(0 0 0 var(--hb-pos)); }
.hb-ic[data-o="vertical"] .hb-ic-after { clip-path: inset(var(--hb-pos) 0 0 0); }
.hb-ic-chip {
  position: absolute;
  z-index: 1;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(10, 10, 10, .6);
  color: #fff;
  font-size: 11px;
  letter-spacing: .05em;
  line-height: 1.5;
  text-transform: uppercase;
  pointer-events: none;
  backdrop-filter: blur(6px);
}
.hb-ic-chip[data-side="before"] { top: 8px; left: 8px; }
.hb-ic[data-o="horizontal"] .hb-ic-chip[data-side="after"] { top: 8px; right: 8px; }
.hb-ic[data-o="vertical"] .hb-ic-chip[data-side="after"] { bottom: 8px; left: 8px; }
.hb-ic-handle {
  position: absolute;
  z-index: 2;
  outline: none;
}
.hb-ic[data-o="horizontal"] .hb-ic-handle {
  top: 0;
  bottom: 0;
  left: var(--hb-pos);
  width: 32px;
  margin-left: -16px;
}
.hb-ic[data-o="vertical"] .hb-ic-handle {
  left: 0;
  right: 0;
  top: var(--hb-pos);
  height: 32px;
  margin-top: -16px;
}
.hb-ic-handle::before {
  content: "";
  position: absolute;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, .5);
}
.hb-ic[data-o="horizontal"] .hb-ic-handle::before { top: 0; bottom: 0; left: 15px; width: 2px; }
.hb-ic[data-o="vertical"] .hb-ic-handle::before { left: 0; right: 0; top: 15px; height: 2px; }
.hb-ic-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: rgba(10, 10, 10, .7);
  box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
  backdrop-filter: blur(6px);
  transition: box-shadow .2s ease, background .2s ease;
}
.hb-ic[data-o="vertical"] .hb-ic-knob { transform: rotate(90deg); }
.hb-ic-handle:focus-visible .hb-ic-knob { box-shadow: 0 0 0 3px #2f7bff; }
.hb-ic[data-drag="true"] .hb-ic-knob { background: rgba(47, 123, 255, .85); }
@media (prefers-reduced-motion: reduce) {
  .hb-ic-knob { transition: none; }
}
`;

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function ImageCompare({
  before,
  after,
  initial = 50,
  labels,
  orientation = "horizontal",
  className = "",
  style,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...rest
}: ImageCompareProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const [pos, setPos] = React.useState(() => clamp(initial));
  const [dragging, setDragging] = React.useState(false);

  const vertical = orientation === "vertical";
  const text = { before: "Before", after: "After", ...labels };

  function setFromPointer(e: React.PointerEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const size = vertical ? r.height : r.width;
    if (size <= 0) return;
    const offset = vertical ? e.clientY - r.top : e.clientX - r.left;
    setPos(clamp((offset / size) * 100));
  }

  function handleDown(e: React.PointerEvent<HTMLDivElement>) {
    onPointerDown?.(e);
    if (e.defaultPrevented || (e.pointerType === "mouse" && e.button !== 0)) return;
    draggingRef.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleRef.current?.focus({ preventScroll: true });
    setFromPointer(e);
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (!draggingRef.current) return;
    setFromPointer(e);
  }

  function endDrag() {
    draggingRef.current = false;
    setDragging(false);
  }

  function handleUp(e: React.PointerEvent<HTMLDivElement>) {
    onPointerUp?.(e);
    endDrag();
  }

  function handleCancel(e: React.PointerEvent<HTMLDivElement>) {
    onPointerCancel?.(e);
    endDrag();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = pos - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") next = pos + step;
    else if (e.key === "PageUp") next = pos - 10;
    else if (e.key === "PageDown") next = pos + 10;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setPos(clamp(next));
  }

  const vars = { "--hb-pos": `${pos}%`, ...style } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-ic ${className}`}
      style={vars}
      data-o={orientation}
      data-drag={dragging}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleCancel}
      {...rest}
    >
      <style href="hb-image-compare" precedence="default">{css}</style>
      <div className="hb-ic-layer hb-ic-before">{before}</div>
      <div className="hb-ic-layer hb-ic-after">{after}</div>
      {text.before && (
        <span className="hb-ic-chip" data-side="before">
          {text.before}
        </span>
      )}
      {text.after && (
        <span className="hb-ic-chip" data-side="after">
          {text.after}
        </span>
      )}
      <div
        ref={handleRef}
        className="hb-ic-handle"
        role="slider"
        tabIndex={0}
        aria-label={`${text.before} and ${text.after} comparison`}
        aria-orientation={orientation}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={handleKeyDown}
      >
        <span className="hb-ic-knob" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

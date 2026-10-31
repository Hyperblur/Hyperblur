"use client";

import * as React from "react";

export interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  precision?: 1 | 0.5;
  size?: number;
  color?: string;
  readOnly?: boolean;
}

const css = `
.hb-sr {
  display: inline-flex;
  vertical-align: middle;
  border-radius: 6px;
  outline: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-sr[role="slider"] { cursor: pointer; }
.hb-sr:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-sr-s {
  position: relative;
  flex: none;
  width: var(--hb-s);
  height: var(--hb-s);
}
.hb-sr-s svg {
  position: absolute;
  inset: 0;
  width: var(--hb-s);
  height: var(--hb-s);
  display: block;
}
.hb-sr-b { fill: rgba(255, 255, 255, 0.16); }
.hb-sr-f {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.12s ease-out;
}
.hb-sr-f svg { fill: var(--hb-c); }
.hb-sr-s[data-pop] { animation: hb-sr-pop 0.28s cubic-bezier(0.3, 1.6, 0.5, 1); }
@keyframes hb-sr-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-sr-f { transition: none; }
  .hb-sr-s[data-pop] { animation: none; }
}
`;

const path =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

export function StarRating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  precision = 1,
  size = 24,
  color = "#f5b301",
  readOnly = false,
  className = "",
  style,
  onKeyDown,
  onPointerMove,
  onPointerDown,
  onPointerLeave,
  onClick,
  ...rest
}: StarRatingProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const count = Math.max(1, Math.round(max));

  const snap = (v: number) => {
    const s = Math.round(v / precision) * precision;
    return Math.min(count, Math.max(0, s));
  };

  const [inner, setInner] = React.useState(() => snap(defaultValue));
  const [hover, setHover] = React.useState<number | null>(null);
  const [pop, setPop] = React.useState<number | null>(null);

  const controlled = value !== undefined;
  const current = snap(controlled ? value : inner);
  const shown = hover ?? current;

  function commit(next: number) {
    const v = snap(next);
    if (!controlled) setInner(v);
    if (v !== current) onChange?.(v);
    setPop(v > 0 ? Math.ceil(v) - 1 : null);
  }

  function fromX(clientX: number) {
    const el = ref.current;
    if (!el) return current;
    const r = el.getBoundingClientRect();
    if (r.width <= 0) return current;
    const raw = ((clientX - r.left) / r.width) * count;
    const v = Math.ceil(raw / precision) * precision;
    return Math.min(count, Math.max(precision, v));
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (readOnly) return;
    setHover(fromX(e.clientX));
  }

  function handleDown(e: React.PointerEvent<HTMLDivElement>) {
    onPointerDown?.(e);
    if (readOnly) return;
    setHover(fromX(e.clientX));
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    setHover(null);
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    onClick?.(e);
    if (readOnly) return;
    if (e.detail === 0) return;
    commit(fromX(e.clientX));
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (readOnly || e.defaultPrevented) return;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = current + precision;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = current - precision;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count;
    if (next === null) return;
    e.preventDefault();
    setHover(null);
    commit(next);
  }

  const vars = {
    "--hb-s": `${size}px`,
    "--hb-c": color,
    ...style,
  } as React.CSSProperties;

  const popIndex = hover !== null ? Math.ceil(hover) - 1 : pop;

  const a11y: React.HTMLAttributes<HTMLDivElement> = readOnly
    ? { role: "img", "aria-label": `Rated ${current} out of ${count}` }
    : {
        role: "slider",
        tabIndex: 0,
        "aria-label": "Rating",
        "aria-valuemin": 0,
        "aria-valuemax": count,
        "aria-valuenow": current,
        "aria-valuetext": `${current} out of ${count} stars`,
      };

  return (
    <div
      ref={ref}
      className={`hb-sr ${className}`}
      style={vars}
      {...a11y}
      {...rest}
      onKeyDown={handleKey}
      onPointerMove={handleMove}
      onPointerDown={handleDown}
      onPointerLeave={handleLeave}
      onClick={handleClick}
    >
      <style href="hb-star-rating" precedence="default">{css}</style>
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.min(1, Math.max(0, shown - i));
        return (
          <span
            key={i}
            className="hb-sr-s"
            data-pop={popIndex === i ? "" : undefined}
            onAnimationEnd={() => setPop((p) => (p === i ? null : p))}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="hb-sr-b">
              <path d={path} />
            </svg>
            <span className="hb-sr-f" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24">
                <path d={path} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

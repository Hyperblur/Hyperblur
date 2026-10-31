"use client";

import * as React from "react";

export interface FlipCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  front: React.ReactNode;
  back: React.ReactNode;
  trigger?: "hover" | "click";
  direction?: "horizontal" | "vertical";
  duration?: number;
}

const css = `
.hb-fc {
  --hb-flip: rotateY(180deg);
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  perspective: 1000px;
  -webkit-tap-highlight-color: transparent;
}
.hb-fc[data-d="vertical"] { --hb-flip: rotateX(180deg); }
button.hb-fc { cursor: pointer; appearance: none; }
.hb-fc:focus-visible {
  outline: 2px solid #2f7bff;
  outline-offset: 4px;
  border-radius: 16px;
}
.hb-fc > .hb-fc-i {
  display: grid;
  transform-style: preserve-3d;
  transition: transform var(--hb-d) cubic-bezier(.4, .2, .2, 1);
}
.hb-fc[data-m="hover"]:is(:hover, :focus-within) > .hb-fc-i,
.hb-fc[aria-pressed="true"] > .hb-fc-i {
  transform: var(--hb-flip);
}
.hb-fc-f {
  grid-area: 1 / 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 120px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  background: linear-gradient(145deg, rgba(255, 255, 255, .09), rgba(255, 255, 255, .02)), #101010;
  color: #f5f5f5;
  text-align: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.hb-fc-b { transform: var(--hb-flip); }
@media (prefers-reduced-motion: reduce) {
  .hb-fc > .hb-fc-i {
    transition: none;
    transform: none !important;
  }
  .hb-fc-f {
    backface-visibility: visible;
    -webkit-backface-visibility: visible;
    transition: opacity .25s ease;
  }
  .hb-fc-b {
    transform: none !important;
    opacity: 0;
  }
  .hb-fc[data-m="hover"]:is(:hover, :focus-within) .hb-fc-a,
  .hb-fc[aria-pressed="true"] .hb-fc-a {
    opacity: 0;
  }
  .hb-fc[data-m="hover"]:is(:hover, :focus-within) .hb-fc-b,
  .hb-fc[aria-pressed="true"] .hb-fc-b {
    opacity: 1;
  }
}
`;

export function FlipCard({
  front,
  back,
  trigger = "hover",
  direction = "horizontal",
  duration = 0.6,
  className = "",
  style,
  onClick,
  ...rest
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const clickable = trigger === "click";
  const vars = { "--hb-d": `${duration}s`, ...style } as React.CSSProperties;

  const faces = (
    <>
      <style href="hb-flip-card" precedence="default">{css}</style>
      <span className="hb-fc-i">
        <span className="hb-fc-f hb-fc-a" aria-hidden={clickable ? flipped : undefined}>
          {front}
        </span>
        <span className="hb-fc-f hb-fc-b" aria-hidden={clickable ? !flipped : undefined}>
          {back}
        </span>
      </span>
    </>
  );

  if (clickable) {
    return (
      <button
        {...rest}
        type="button"
        className={`hb-fc ${className}`}
        style={vars}
        data-m="click"
        data-d={direction}
        aria-pressed={flipped}
        onClick={(e) => {
          onClick?.(e);
          setFlipped((f) => !f);
        }}
      >
        {faces}
      </button>
    );
  }

  return (
    <div
      {...rest}
      role="group"
      tabIndex={0}
      className={`hb-fc ${className}`}
      style={vars}
      data-m="hover"
      data-d={direction}
      onClick={onClick}
    >
      {faces}
    </div>
  );
}

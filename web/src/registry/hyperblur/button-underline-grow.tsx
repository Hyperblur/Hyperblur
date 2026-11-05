"use client";

import * as React from "react";

export interface ButtonUnderlineGrowProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  variant?: "accent" | "plain";
  accent?: string;
  visitedColor?: string;
  size?: "sm" | "md" | "lg";
  arrow?: boolean | React.ReactNode;
  idle?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const arrowIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const css = `
.hb-ya7 {
  --hb-ya7-fs: 0.9375rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.3em 0;
  font: inherit;
  font-size: var(--hb-ya7-fs);
  font-weight: 500;
  line-height: 1.25;
  color: var(--hb-ya7-fg);
  text-decoration: none;
  white-space: nowrap;
  background: none;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.3s ease;
}
.hb-ya7 *, .hb-ya7 *::before, .hb-ya7 *::after { box-sizing: border-box; }
.hb-ya7[data-size="sm"] { --hb-ya7-fs: 0.8125rem; }
.hb-ya7[data-size="lg"] { --hb-ya7-fs: 1.125rem; }
.hb-ya7[data-variant="accent"] { --hb-ya7-fg: color-mix(in srgb, var(--hb-ya7-c) 72%, #fff); }
.hb-ya7[data-variant="plain"] { --hb-ya7-fg: #ededed; }
.hb-ya7[data-visited="true"] { color: var(--hb-ya7-v); }
a.hb-ya7:visited { color: var(--hb-ya7-v); }
.hb-ya7:focus-visible { outline: 2px solid var(--hb-ya7-c); outline-offset: 4px; border-radius: 4px; }
.hb-ya7[aria-disabled="true"], .hb-ya7:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya7[aria-busy="true"] { cursor: progress; }
.hb-ya7-text { position: relative; display: inline-block; }
.hb-ya7-text::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.18em;
  height: 1px;
  background: currentColor;
  opacity: 0.2;
}
.hb-ya7-text::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.2em;
  height: 2px;
  border-radius: 2px;
  background: var(--hb-ya7-line, var(--hb-ya7-c));
  transform: scaleX(0);
  transform-origin: 50% 50%;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-ya7[data-visited="true"] .hb-ya7-text::after { background: var(--hb-ya7-v); }
.hb-ya7-arrow {
  display: grid;
  flex: none;
  place-items: center;
  width: 1.05em;
  height: 1.05em;
  transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-ya7-arrow > svg { display: block; width: 100%; height: 100%; }
.hb-ya7:not([aria-disabled="true"]):not(:disabled):hover .hb-ya7-text::after,
.hb-ya7:not([aria-disabled="true"]):not(:disabled):focus-visible .hb-ya7-text::after { transform: scaleX(1); }
.hb-ya7:not([aria-disabled="true"]):not(:disabled):hover .hb-ya7-arrow,
.hb-ya7:not([aria-disabled="true"]):not(:disabled):focus-visible .hb-ya7-arrow { transform: translateX(0.32em); }
.hb-ya7:not([aria-disabled="true"]):not(:disabled):active .hb-ya7-arrow { transform: translateX(0.55em); }
.hb-ya7[data-idle="true"] .hb-ya7-text::after { animation: hb-ya7-breathe 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
.hb-ya7[data-idle="true"] .hb-ya7-arrow { animation: hb-ya7-nudge 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
.hb-ya7[data-idle="true"]:hover .hb-ya7-text::after,
.hb-ya7[data-idle="true"]:focus-visible .hb-ya7-text::after,
.hb-ya7[data-idle="true"]:hover .hb-ya7-arrow,
.hb-ya7[data-idle="true"]:focus-visible .hb-ya7-arrow { animation: none; }
.hb-ya7-spin {
  width: 0.95em;
  height: 0.95em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya7-turn 0.7s linear infinite;
}
@keyframes hb-ya7-breathe {
  0%, 100% { transform: scaleX(0); }
  40%, 60% { transform: scaleX(1); }
}
@keyframes hb-ya7-nudge {
  0%, 100% { transform: translateX(0); }
  40%, 60% { transform: translateX(0.32em); }
}
@keyframes hb-ya7-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya7, .hb-ya7-text::after, .hb-ya7-arrow { transition: none; }
  .hb-ya7[data-idle="true"] .hb-ya7-text::after, .hb-ya7[data-idle="true"] .hb-ya7-arrow { animation: none; }
  .hb-ya7-spin { animation-duration: 2s; }
}
`;

export function ButtonUnderlineGrow({
  href,
  target,
  rel,
  type = "button",
  variant = "accent",
  accent = "#2f7bff",
  visitedColor = "#b69cff",
  size = "md",
  arrow = true,
  idle = false,
  loading = false,
  disabled = false,
  className = "",
  style,
  children,
  onClick,
  ...rest
}: ButtonUnderlineGrowProps) {
  const [visited, setVisited] = React.useState(false);
  const blocked = disabled || loading;
  const vars = {
    "--hb-ya7-c": accent,
    "--hb-ya7-v": visitedColor,
    ...style,
  } as React.CSSProperties;

  const arrowNode = arrow === true ? arrowIcon : arrow === false ? null : arrow;
  const content = (
    <>
      <span className="hb-ya7-text">{children}</span>
      {loading ? (
        <span className="hb-ya7-arrow" aria-hidden="true">
          <span className="hb-ya7-spin" />
        </span>
      ) : arrowNode ? (
        <span className="hb-ya7-arrow" aria-hidden="true">{arrowNode}</span>
      ) : null}
    </>
  );

  const common = {
    className: `hb-ya7 ${className}`,
    style: vars,
    "data-variant": variant,
    "data-size": size,
    "data-visited": visited,
    "data-idle": idle,
    "aria-busy": loading || undefined,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (blocked) {
        e.preventDefault();
        return;
      }
      setVisited(true);
      onClick?.(e);
    },
    ...rest,
  };

  return (
    <>
      <style href="hb-button-underline-grow" precedence="default">{css}</style>
      {href ? (
        <a
          href={blocked ? undefined : href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
          aria-disabled={blocked || undefined}
          {...common}
        >
          {content}
        </a>
      ) : (
        <button type={type} disabled={disabled} {...common}>
          {content}
        </button>
      )}
    </>
  );
}

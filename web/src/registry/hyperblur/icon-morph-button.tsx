"use client";

import * as React from "react";

export type IconMorphName = "arrow" | "download" | "external" | "plus";

export interface IconMorphButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
  icon?: IconMorphName;
  hoverIcon?: IconMorphName | "check";
  color?: string;
  rounded?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-im {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  margin: 0;
  padding: 0.4em 0.4em 0.4em 1.4em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  color: #f4f6fb;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--hb-r);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  --hb-ox: 140%;
  --hb-oy: 0%;
}
.hb-im[data-size="sm"] { font-size: 13px; padding-left: 1.2em; }
.hb-im[data-size="lg"] { font-size: 17px; padding-left: 1.6em; }
.hb-im[data-axis="y"] { --hb-ox: 0%; --hb-oy: 140%; }
.hb-im[data-axis="d"] { --hb-ox: 140%; --hb-oy: -140%; }
.hb-im-chip {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 2.1em;
  height: 2.1em;
  overflow: hidden;
  color: #fff;
  background: var(--hb-c);
  border-radius: 50%;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-im-i {
  grid-area: 1 / 1;
  width: 1.1em;
  height: 1.1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.45s cubic-bezier(0.6, 0, 0.2, 1), opacity 0.3s ease;
}
.hb-im-a { opacity: 1; transform: none; }
.hb-im-b {
  opacity: 0;
  transform: translate(calc(var(--hb-ox) * -1), calc(var(--hb-oy) * -1));
}
.hb-im:hover, .hb-im:focus-visible {
  border-color: color-mix(in srgb, var(--hb-c) 70%, transparent);
  background-color: color-mix(in srgb, var(--hb-c) 14%, transparent);
}
.hb-im:hover .hb-im-a, .hb-im:focus-visible .hb-im-a {
  opacity: 0;
  transform: translate(var(--hb-ox), var(--hb-oy));
}
.hb-im:hover .hb-im-b, .hb-im:focus-visible .hb-im-b { opacity: 1; transform: none; }
.hb-im:hover .hb-im-chip, .hb-im:focus-visible .hb-im-chip { transform: scale(1.08) rotate(-6deg); }
.hb-im:active { transform: scale(0.97); }
.hb-im:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-im:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-im, .hb-im-chip, .hb-im-i { transition-duration: 0.01s; }
  .hb-im:hover .hb-im-chip, .hb-im:focus-visible .hb-im-chip, .hb-im:active { transform: none; }
  .hb-im:hover .hb-im-a, .hb-im:focus-visible .hb-im-a { transform: none; }
  .hb-im-b { transform: none; }
}
`;

const paths: Record<IconMorphName | "check", string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 4v12M7 11l5 5 5-5M5 20h14",
  external: "M7 17L17 7M9 7h8v8",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

const defaultHover: Record<IconMorphName, IconMorphName | "check"> = {
  arrow: "check",
  download: "check",
  external: "arrow",
  plus: "check",
};

const axes: Record<IconMorphName, "x" | "y" | "d"> = {
  arrow: "x",
  download: "y",
  external: "d",
  plus: "x",
};

function Glyph({ name, className }: { name: IconMorphName | "check"; className: string }) {
  return (
    <svg className={`hb-im-i ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

export function IconMorphButton({
  children,
  icon = "arrow",
  hoverIcon,
  color = "#2f7bff",
  rounded = 9999,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: IconMorphButtonProps) {
  const vars = {
    "--hb-c": color,
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-icon-morph-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-im ${className}`}
        style={vars}
        data-size={size}
        data-axis={axes[icon]}
        {...rest}
      >
        <span className="hb-im-t">{children}</span>
        <span className="hb-im-chip" aria-hidden="true">
          <Glyph name={icon} className="hb-im-a" />
          <Glyph name={hoverIcon ?? defaultHover[icon]} className="hb-im-b" />
        </span>
      </button>
    </>
  );
}

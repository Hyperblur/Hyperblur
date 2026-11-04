"use client";

import * as React from "react";

export interface NavGooeyItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NavGooeyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "defaultValue"> {
  items?: NavGooeyItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  accent?: string;
  gooeyness?: number;
  label?: string;
}

const defaultItems: NavGooeyItem[] = [
  { value: "home", label: "Home" },
  { value: "explore", label: "Explore" },
  { value: "inbox", label: "Inbox" },
  { value: "profile", label: "Profile" },
];

const css = `
.hb-qv4 {
  --hb-qv4-acc: #2f7bff;
  --hb-qv4-n: 4;
  --hb-qv4-i: 0;
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #111111;
  color: #a1a1a1;
  font: inherit;
  isolation: isolate;
}
.hb-qv4 *, .hb-qv4 *::before, .hb-qv4 *::after { box-sizing: border-box; }
.hb-qv4-fx {
  position: absolute;
  inset: 6px;
  z-index: 0;
  pointer-events: none;
}
.hb-qv4-svg { position: absolute; width: 0; height: 0; overflow: hidden; }
.hb-qv4-g {
  position: absolute;
  inset: 0;
  filter: var(--hb-qv4-f);
}
.hb-qv4-b {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% / var(--hb-qv4-n));
  transform: translateX(calc(var(--hb-qv4-i) * 100%));
}
.hb-qv4-b::after {
  content: "";
  position: absolute;
  inset: 3px;
  border-radius: 999px;
  background: var(--hb-qv4-acc);
}
.hb-qv4-b1 { transition: transform 0.62s cubic-bezier(0.5, 1.5, 0.4, 1); }
.hb-qv4-b2 { transition: transform 0.34s cubic-bezier(0.3, 0, 0.2, 1); }
.hb-qv4-b3 { transition: transform 0.46s cubic-bezier(0.6, -0.5, 0.3, 1.5); }
.hb-qv4-b3::after { inset: 18% 24%; }
.hb-qv4-it {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  min-width: 0;
  margin: 0;
  padding: 0.62em 0.4em;
  font: inherit;
  font-size: 0.875em;
  font-weight: 600;
  line-height: 1.2;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.3s ease;
}
.hb-qv4-it:hover { color: #ededed; }
.hb-qv4-it[aria-current="true"] { color: #ffffff; }
.hb-qv4-it:focus-visible { outline: 2px solid #7fb3ff; outline-offset: -2px; }
.hb-qv4-ic { display: inline-flex; width: 1.1em; height: 1.1em; }
.hb-qv4-ic > svg { width: 100%; height: 100%; }
@media (prefers-reduced-motion: reduce) {
  .hb-qv4-b1, .hb-qv4-b2, .hb-qv4-b3, .hb-qv4-it { transition: none; }
}
`;

export function NavGooey({
  items = defaultItems,
  value,
  defaultValue,
  onChange,
  accent = "#2f7bff",
  gooeyness = 7,
  label = "Primary",
  className = "",
  style,
  onKeyDown,
  ...rest
}: NavGooeyProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `hb-qv4-f-${uid}`;
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value ?? "");
  const current = value ?? inner;
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const index = Math.max(0, items.findIndex((it) => it.value === current));

  function select(next: number, focus: boolean) {
    const target = items[next];
    if (!target) return;
    if (value === undefined) setInner(target.value);
    onChange?.(target.value);
    if (focus) refs.current[next]?.focus();
  }

  function handleKey(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const last = items.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index >= last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index <= 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    select(next, true);
  }

  const vars = {
    "--hb-qv4-acc": accent,
    "--hb-qv4-n": items.length,
    "--hb-qv4-i": index,
    "--hb-qv4-f": `url(#${filterId})`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-nav-gooey" precedence="default">{css}</style>
      <nav
        aria-label={label}
        className={`hb-qv4 ${className}`}
        style={vars}
        onKeyDown={handleKey}
        {...rest}
      >
        <svg className="hb-qv4-svg" aria-hidden="true" focusable="false">
          <defs>
            <filter id={filterId} x="-10%" y="-60%" width="120%" height="220%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation={gooeyness} result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              />
            </filter>
          </defs>
        </svg>
        <div className="hb-qv4-fx" aria-hidden="true">
          <div className="hb-qv4-g">
            <span className="hb-qv4-b hb-qv4-b1" />
            <span className="hb-qv4-b hb-qv4-b2" />
            <span className="hb-qv4-b hb-qv4-b3" />
          </div>
        </div>
        {items.map((item, i) => (
          <button
            key={item.value}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            className="hb-qv4-it"
            aria-current={i === index ? "true" : undefined}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i, false)}
          >
            {item.icon ? <span className="hb-qv4-ic" aria-hidden="true">{item.icon}</span> : null}
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}

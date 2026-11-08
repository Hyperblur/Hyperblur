"use client";

import * as React from "react";

export interface VerticalPanel {
  title: string;
  meta: string;
  description: string;
  colors?: [string, string, string];
  motif?: "arches" | "columns" | "stairs" | "window";
  href?: string;
}

export interface ImageAccordionVerticalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: VerticalPanel[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  openOn?: "hover" | "click";
  height?: number;
  accent?: string;
}

const defaultItems: VerticalPanel[] = [
  {
    title: "Casa Arco",
    meta: "Lisbon / 2026",
    description: "A row house opened up with five plaster arches and a lime-washed courtyard.",
    colors: ["#e9d8c4", "#c98f6a", "#5b3626"],
    motif: "arches",
  },
  {
    title: "Pavilion Nine",
    meta: "Oslo / 2025",
    description: "Timber colonnade around a reading room, lit from above by a single slot.",
    colors: ["#cfd9d6", "#6f8f88", "#1f3431"],
    motif: "columns",
  },
  {
    title: "Terrace House",
    meta: "Kyoto / 2025",
    description: "Stepped concrete levels follow the slope down to a moss garden.",
    colors: ["#d9d4e6", "#8b7fb3", "#2b2546"],
    motif: "stairs",
  },
  {
    title: "Oculus Studio",
    meta: "Mexico City / 2024",
    description: "A round skylight tracks the day across a terracotta floor.",
    colors: ["#f2cfa8", "#d0603a", "#4a1a10"],
    motif: "window",
  },
];

function Art({ colors, motif, id }: { colors: [string, string, string]; motif: VerticalPanel["motif"]; id: string }) {
  const [light, mid, deep] = colors;
  return (
    <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="300" fill={`url(#${id}-w)`} />
      {motif === "arches" &&
        [0, 1, 2, 3, 4].map((i) => {
          const x = 40 + i * 110;
          return (
            <g key={i}>
              <path d={`M${x} 300 L${x} 150 A45 45 0 0 1 ${x + 90} 150 L${x + 90} 300 Z`} fill={deep} opacity={0.85 - i * 0.08} />
              <path d={`M${x + 12} 300 L${x + 12} 156 A33 33 0 0 1 ${x + 78} 156 L${x + 78} 300 Z`} fill={mid} opacity="0.55" />
            </g>
          );
        })}
      {motif === "columns" &&
        [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect x={30 + i * 82} y="60" width="26" height="240" fill={deep} opacity={0.9 - i * 0.06} />
            <rect x={30 + i * 82} y="60" width="8" height="240" fill={light} opacity="0.25" />
          </g>
        ))}
      {motif === "columns" && <rect x="0" y="40" width="600" height="22" fill={deep} />}
      {motif === "stairs" &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={i * 100} y={120 + i * 30} width="600" height="200" fill={deep} opacity={0.35 + i * 0.1} />
            <rect x={i * 100} y={120 + i * 30} width="600" height="4" fill={light} opacity="0.5" />
          </g>
        ))}
      {motif === "window" && (
        <g>
          <rect x="0" y="210" width="600" height="90" fill={deep} opacity="0.75" />
          <circle cx="300" cy="110" r="78" fill={deep} />
          <circle cx="300" cy="110" r="62" fill={light} />
          <ellipse cx="330" cy="248" rx="120" ry="22" fill={light} opacity="0.45" />
        </g>
      )}
      <path d="M380 0 L520 0 L260 300 L120 300 Z" fill={`url(#${id}-r)`} opacity="0.35" />
    </svg>
  );
}

const css = `
.hb-vl2 {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  height: var(--hb-vl2-h);
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl2 *, .hb-vl2 *::before, .hb-vl2 *::after { box-sizing: border-box; }
.hb-vl2-b {
  position: relative;
  flex: 1 1 0;
  min-height: 36px;
  overflow: hidden;
  border-radius: 14px;
  background: #121212;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  transition: flex-grow 0.8s cubic-bezier(0.76, 0, 0.24, 1), box-shadow 0.4s ease;
}
.hb-vl2-b[data-active="true"] { flex-grow: 6; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16), 0 18px 40px -24px rgba(0, 0, 0, 0.9); }
.hb-vl2-art {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: var(--hb-vl2-h);
  transform: translateY(-50%) scale(1.06);
  filter: saturate(0.4) brightness(0.55);
  transition: filter 0.8s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl2-art svg { display: block; width: 100%; height: 100%; }
.hb-vl2-b[data-active="true"] .hb-vl2-art { filter: none; transform: translateY(-50%); }
.hb-vl2-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(8, 8, 10, 0.88) 0%, rgba(8, 8, 10, 0.5) 45%, rgba(8, 8, 10, 0.1) 100%);
  pointer-events: none;
}
.hb-vl2-head {
  position: absolute;
  inset: 0 0 auto 0;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 14px;
}
.hb-vl2-head:focus-visible { outline: 2px solid var(--hb-vl2-a); outline-offset: -2px; }
.hb-vl2-idx {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.06em;
}
.hb-vl2-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-vl2-meta {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}
.hb-vl2-plus {
  position: relative;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
  transition: transform 0.6s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.3s ease;
}
.hb-vl2-plus::before, .hb-vl2-plus::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: translate(-50%, -50%);
}
.hb-vl2-plus::after { transform: translate(-50%, -50%) rotate(90deg); }
.hb-vl2-b[data-active="true"] .hb-vl2-plus { transform: rotate(135deg); background: var(--hb-vl2-a); box-shadow: none; }
.hb-vl2-body {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.3s ease;
  pointer-events: none;
}
.hb-vl2-b[data-active="true"] .hb-vl2-body {
  opacity: 1;
  transform: none;
  pointer-events: auto;
  transition: opacity 0.5s ease 0.35s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
}
.hb-vl2-desc {
  margin: 0;
  max-width: 36ch;
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
}
.hb-vl2-link {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  padding: 6px 10px 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #0a0a0a;
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease;
}
.hb-vl2-link:hover { gap: 10px; background: #ffffff; }
.hb-vl2-link:focus-visible { outline: 2px solid var(--hb-vl2-a); outline-offset: 2px; }
@container (max-width: 360px) {
  .hb-vl2-desc { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl2 *, .hb-vl2 *::before, .hb-vl2 *::after { transition: none !important; }
}
`;

export function ImageAccordionVertical({
  items = defaultItems,
  value,
  defaultValue = 0,
  onChange,
  openOn = "hover",
  height = 380,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ImageAccordionVerticalProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const active = value ?? inner;
  const uid = React.useId().replace(/:/g, "");
  const heads = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    if (index === active) return;
    if (value === undefined) setInner(index);
    onChange?.(index);
  };

  const onKey = (event: React.KeyboardEvent, index: number) => {
    const n = items.length;
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % n;
    else if (event.key === "ArrowUp") next = (index - 1 + n) % n;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = n - 1;
    if (next < 0) return;
    event.preventDefault();
    heads.current[next]?.focus();
  };

  return (
    <div
      className={["hb-vl2", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl2-a": accent, "--hb-vl2-h": `${height}px`, containerType: "inline-size", ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-image-accordion-vertical" precedence="default">{css}</style>
      {items.map((item, i) => {
        const on = i === active;
        const bodyId = `${uid}-b${i}`;
        return (
          <div
            key={item.title + i}
            className="hb-vl2-b"
            data-active={on ? "true" : "false"}
            onPointerEnter={openOn === "hover" ? () => select(i) : undefined}
          >
            <div className="hb-vl2-art">
              <Art colors={item.colors ?? ["#e9d8c4", "#c98f6a", "#5b3626"]} motif={item.motif ?? "arches"} id={`${uid}-a${i}`} />
            </div>
            <span className="hb-vl2-veil" />
            <button
              ref={(node) => {
                heads.current[i] = node;
              }}
              type="button"
              className="hb-vl2-head"
              aria-expanded={on}
              aria-controls={bodyId}
              onClick={() => select(i)}
              onFocus={() => select(i)}
              onKeyDown={(event) => onKey(event, i)}
            >
              <span className="hb-vl2-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-vl2-title">{item.title}</span>
              <span className="hb-vl2-meta">{item.meta}</span>
              <span className="hb-vl2-plus" aria-hidden="true" />
            </button>
            <div className="hb-vl2-body" id={bodyId} aria-hidden={!on}>
              <p className="hb-vl2-desc">{item.description}</p>
              <a className="hb-vl2-link" href={item.href ?? "#"} tabIndex={on ? 0 : -1}>
                View project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

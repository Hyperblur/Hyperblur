"use client";

import * as React from "react";

export interface TickerVerticalItem {
  text: string;
  meta?: string;
  tag?: string;
}

export interface TickerVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TickerVerticalItem[];
  rows?: number;
  rowHeight?: number;
  speed?: number;
  columns?: 1 | 2;
  accent?: string;
}

const css = `
@keyframes hb-zz5-up {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
.hb-zz5 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  outline: none;
}
.hb-zz5 *, .hb-zz5 *::before, .hb-zz5 *::after { box-sizing: border-box; }
.hb-zz5:focus-visible { outline: 2px solid var(--hb-zz5-accent); outline-offset: 3px; border-radius: 10px; }
.hb-zz5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.hb-zz5-cols {
  display: grid;
  grid-template-columns: repeat(var(--hb-zz5-n, 1), minmax(0, 1fr));
  gap: 10px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 calc(var(--hb-zz5-rh) * 0.95), #000 calc(100% - var(--hb-zz5-rh) * 0.95), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 calc(var(--hb-zz5-rh) * 0.95), #000 calc(100% - var(--hb-zz5-rh) * 0.95), transparent 100%);
}
.hb-zz5-col {
  position: relative;
  min-width: 0;
  height: calc(var(--hb-zz5-rh) * var(--hb-zz5-rows));
  overflow: hidden;
  container-type: inline-size;
}
.hb-zz5-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: hb-zz5-up var(--hb-zz5-dur) linear infinite;
  animation-direction: var(--hb-zz5-dir, normal);
}
.hb-zz5:hover .hb-zz5-list, .hb-zz5:focus-visible .hb-zz5-list { animation-play-state: paused; }
.hb-zz5-r {
  display: flex;
  align-items: center;
  gap: 8px;
  height: var(--hb-zz5-rh);
  padding: 0 12px;
  font-size: 13px;
  line-height: 1.2;
  color: #8f8f8f;
}
.hb-zz5-tg {
  flex: none;
  padding: 2px 6px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.2;
  color: #8f8f8f;
  border: 1px solid #262626;
  border-radius: 5px;
}
.hb-zz5-x {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-zz5-m {
  flex: none;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: #6b6b6b;
}
@container (max-width: 200px) {
  .hb-zz5-m { display: none; }
}
.hb-zz5-band {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--hb-zz5-half);
  height: var(--hb-zz5-rh);
  overflow: hidden;
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-zz5-accent) 13%, #0f0f10);
}
.hb-zz5-band::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid color-mix(in srgb, var(--hb-zz5-accent) 38%, transparent);
  pointer-events: none;
}
.hb-zz5-band .hb-zz5-list { top: calc(var(--hb-zz5-half) * -1); }
.hb-zz5-band .hb-zz5-r { color: #ffffff; font-weight: 500; }
.hb-zz5-band .hb-zz5-tg { color: var(--hb-zz5-accent); border-color: color-mix(in srgb, var(--hb-zz5-accent) 45%, transparent); }
.hb-zz5-band .hb-zz5-m { color: #a1a1a1; }
@media (prefers-reduced-motion: reduce) {
  .hb-zz5-list { animation: none; }
}
`;

function Rows({ list }: { list: TickerVerticalItem[] }) {
  return (
    <>
      {list.map((item, i) => (
        <li key={i} className="hb-zz5-r">
          {item.tag ? <span className="hb-zz5-tg">{item.tag}</span> : null}
          <span className="hb-zz5-x">{item.text}</span>
          {item.meta ? <span className="hb-zz5-m">{item.meta}</span> : null}
        </li>
      ))}
    </>
  );
}

function Column({ unit, reverse, dur }: { unit: TickerVerticalItem[]; reverse: boolean; dur: string }) {
  const style = {
    ["--hb-zz5-dur" as string]: `${dur}s`,
    ["--hb-zz5-dir" as string]: reverse ? "reverse" : "normal",
  } as React.CSSProperties;
  return (
    <div className="hb-zz5-col" style={style} aria-hidden="true">
      <ul className="hb-zz5-list">
        <Rows list={unit} />
        <Rows list={unit} />
      </ul>
      <div className="hb-zz5-band">
        <ul className="hb-zz5-list">
          <Rows list={unit} />
          <Rows list={unit} />
        </ul>
      </div>
    </div>
  );
}

export function TickerVertical({
  items,
  rows = 5,
  rowHeight = 34,
  speed = 24,
  columns = 1,
  accent = "#2f7bff",
  className = "",
  style,
  tabIndex = 0,
  ...rest
}: TickerVerticalProps) {
  const count = Math.max(3, Math.round(rows));
  const rh = Math.max(20, rowHeight);
  const n = items.length;
  const repeat = n === 0 ? 1 : Math.max(1, Math.ceil((count + 1) / n));
  const unit = Array.from({ length: n * repeat }, (_, i) => items[i % n]);
  const dur = n === 0 ? "1" : ((unit.length * rh) / Math.max(4, speed)).toFixed(2);
  const shift = Math.floor(n / 2);
  const second = n === 0 ? unit : Array.from({ length: n * repeat }, (_, i) => items[(i + shift) % n]);
  const cols = columns === 2 ? 2 : 1;

  return (
    <div
      role="group"
      tabIndex={tabIndex}
      {...rest}
      className={`hb-zz5${className ? ` ${className}` : ""}`}
      style={{
        ["--hb-zz5-accent" as string]: accent,
        ["--hb-zz5-rh" as string]: `${rh}px`,
        ["--hb-zz5-rows" as string]: count,
        ["--hb-zz5-half" as string]: `${Math.floor(count / 2) * rh}px`,
        ["--hb-zz5-n" as string]: cols,
        ...style,
      }}
    >
      <style href="hb-ticker-vertical" precedence="default">{css}</style>
      <ul className="hb-zz5-sr">
        {items.map((item, i) => (
          <li key={i}>
            {item.tag ? `${item.tag}: ` : ""}
            {item.text}
            {item.meta ? `, ${item.meta}` : ""}
          </li>
        ))}
      </ul>
      {n === 0 ? null : (
        <div className="hb-zz5-cols">
          <Column unit={unit} reverse={false} dur={dur} />
          {cols === 2 ? <Column unit={second} reverse dur={dur} /> : null}
        </div>
      )}
    </div>
  );
}

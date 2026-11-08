"use client";

import * as React from "react";

export interface StaggerPanel {
  title: string;
  notes: string;
  price: string;
  colors?: [string, string, string];
}

export interface ImageAccordionStaggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: StaggerPanel[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  openOn?: "hover" | "click";
  height?: number;
  stagger?: number;
  accent?: string;
}

const defaultItems: StaggerPanel[] = [
  { title: "Vetiver Noir", notes: "Bergamot, vetiver, birch smoke", price: "$148 / 50 ml", colors: ["#1d2a22", "#6d8f5a", "#d9e8b0"] },
  { title: "Fig Leaf", notes: "Green fig, milk, cedarwood", price: "$132 / 50 ml", colors: ["#1f2b1c", "#a3b86c", "#f1f5d0"] },
  { title: "Salt & Cedar", notes: "Sea salt, sage, atlas cedar", price: "$140 / 50 ml", colors: ["#13232c", "#5f93a8", "#d8f0f4"] },
  { title: "Amber Dusk", notes: "Saffron, labdanum, tonka", price: "$156 / 50 ml", colors: ["#2b170d", "#d07a3a", "#ffe0b8"] },
  { title: "Yuzu Rain", notes: "Yuzu, white tea, vetiver", price: "$124 / 50 ml", colors: ["#2a2a12", "#d4c24a", "#fff8c4"] },
];

const offsets = [0, 0.75, 0.25, 1, 0.45, 0.85, 0.15];

const css = `
.hb-vl3 {
  position: relative;
  display: flex;
  gap: 8px;
  width: 100%;
  height: var(--hb-vl3-h);
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl3 *, .hb-vl3 *::before, .hb-vl3 *::after { box-sizing: border-box; }
.hb-vl3-p {
  position: relative;
  flex: 1 1 0;
  min-width: 46px;
  height: calc(var(--hb-vl3-h) - var(--hb-vl3-s));
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 18px;
  background: var(--hb-vl3-c0);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transform: translateY(calc(var(--hb-vl3-o) * var(--hb-vl3-s)));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px -28px rgba(0, 0, 0, 0.9);
  transition: flex-grow 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
  -webkit-tap-highlight-color: transparent;
}
.hb-vl3-p[data-active="true"] { flex-grow: 4.2; transform: translateY(calc(var(--hb-vl3-s) * 0.5)); }
.hb-vl3-p:focus-visible { outline: 2px solid var(--hb-vl3-a); outline-offset: 3px; }
.hb-vl3-art {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(40% 32% at 30% 30%, color-mix(in srgb, var(--hb-vl3-c2) 70%, transparent), transparent 70%),
    radial-gradient(46% 40% at 75% 70%, color-mix(in srgb, var(--hb-vl3-c1) 85%, transparent), transparent 72%),
    radial-gradient(60% 50% at 50% 110%, var(--hb-vl3-c1), transparent 70%),
    linear-gradient(160deg, var(--hb-vl3-c0), color-mix(in srgb, var(--hb-vl3-c0) 60%, #000000));
  transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  transform: scale(1.1) rotate(-6deg);
}
.hb-vl3-p[data-active="true"] .hb-vl3-art { transform: none; animation: hb-vl3-drift 9s ease-in-out 1.2s infinite alternate; }
@keyframes hb-vl3-drift { to { transform: translate3d(4%, -3%, 0) rotate(4deg); } }
.hb-vl3-grain {
  position: absolute;
  inset: 0;
  opacity: 0.16;
  background-image: repeating-radial-gradient(circle at 17% 23%, rgba(255, 255, 255, 0.5) 0 0.6px, transparent 0.6px 3px);
  mix-blend-mode: overlay;
}
.hb-vl3-bottle {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 70px;
  height: 120px;
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.9);
  transition: opacity 0.35s ease, transform 0.6s ease;
}
.hb-vl3-p[data-active="true"] .hb-vl3-bottle {
  opacity: 1;
  transform: translate(-30%, -58%);
  transition: opacity 0.7s ease 0.25s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}
.hb-vl3-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.62) 100%);
}
.hb-vl3-idx {
  position: absolute;
  left: 15px;
  bottom: 14px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.62);
}
.hb-vl3-t {
  position: absolute;
  left: 14px;
  bottom: 34px;
  margin: 0;
  font-family: var(--font-grotesk, inherit);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transform-origin: 0 100%;
  transform: translateX(1.2em) rotate(-90deg);
  transition: transform 0.9s cubic-bezier(0.34, 1.32, 0.64, 1), bottom 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl3-p[data-active="true"] .hb-vl3-t { transform: none; bottom: 52px; transition-delay: 0.12s; }
.hb-vl3-info {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.hb-vl3-p[data-active="true"] .hb-vl3-info {
  opacity: 1;
  transform: none;
  transition: opacity 0.5s ease 0.45s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.45s;
}
.hb-vl3-p[data-active="true"] .hb-vl3-idx { opacity: 0; }
.hb-vl3-notes {
  min-width: 0;
  overflow: hidden;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.78);
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-vl3-price {
  flex: none;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl3 *, .hb-vl3 *::before, .hb-vl3 *::after { transition: none !important; animation: none !important; }
}
`;

export function ImageAccordionStagger({
  items = defaultItems,
  value,
  defaultValue = 0,
  onChange,
  openOn = "hover",
  height = 360,
  stagger = 28,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ImageAccordionStaggerProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const active = value ?? inner;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const uid = React.useId().replace(/:/g, "");

  const select = (index: number) => {
    if (index === active) return;
    if (value === undefined) setInner(index);
    onChange?.(index);
  };

  const onKey = (event: React.KeyboardEvent, index: number) => {
    const n = items.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % n;
    else if (event.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = n - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      className={["hb-vl3", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl3-a": accent, "--hb-vl3-h": `${height}px`, "--hb-vl3-s": `${stagger}px`, ...style } as React.CSSProperties}
      role="tablist"
      aria-label="Collection"
      {...rest}
    >
      <style href="hb-image-accordion-stagger" precedence="default">{css}</style>
      {items.map((item, i) => {
        const on = i === active;
        const [c0, c1, c2] = item.colors ?? ["#1d2a22", "#6d8f5a", "#d9e8b0"];
        const gid = `${uid}-g${i}`;
        return (
          <button
            key={item.title + i}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            className="hb-vl3-p"
            data-active={on ? "true" : "false"}
            style={{ "--hb-vl3-o": offsets[i % offsets.length], "--hb-vl3-c0": c0, "--hb-vl3-c1": c1, "--hb-vl3-c2": c2 } as React.CSSProperties}
            onPointerEnter={openOn === "hover" ? () => select(i) : undefined}
            onClick={() => select(i)}
            onKeyDown={(event) => onKey(event, i)}
          >
            <span className="hb-vl3-art" />
            <span className="hb-vl3-grain" />
            <svg className="hb-vl3-bottle" viewBox="0 0 70 120" aria-hidden="true">
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.28" />
                </linearGradient>
              </defs>
              <rect x="26" y="4" width="18" height="18" rx="3" fill={c0} stroke="rgba(255,255,255,0.4)" />
              <rect x="30" y="20" width="10" height="8" fill="rgba(255,255,255,0.35)" />
              <rect x="8" y="28" width="54" height="88" rx="12" fill={`url(#${gid})`} stroke="rgba(255,255,255,0.45)" />
              <rect x="20" y="62" width="30" height="20" rx="2" fill="rgba(255,255,255,0.85)" />
              <rect x="25" y="68" width="20" height="2" fill={c0} />
              <rect x="28" y="74" width="14" height="1.5" fill={c0} opacity="0.6" />
              <rect x="14" y="34" width="5" height="70" rx="2.5" fill="#ffffff" opacity="0.35" />
            </svg>
            <span className="hb-vl3-shade" />
            <span className="hb-vl3-idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="hb-vl3-t">{item.title}</span>
            <span className="hb-vl3-info" aria-hidden={!on}>
              <span className="hb-vl3-notes">{item.notes}</span>
              <span className="hb-vl3-price">{item.price}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

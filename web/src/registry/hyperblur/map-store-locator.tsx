"use client";

import * as React from "react";

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  status?: "open" | "closing" | "closed";
  distance: string;
  x: number;
  y: number;
}

export interface MapStoreLocatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "defaultValue"> {
  locations?: StoreLocation[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string, location: StoreLocation) => void;
  accent?: string;
  zoom?: number;
  title?: string;
}

export const defaultStoreLocations: StoreLocation[] = [
  { id: "harbor", name: "Harbor Street", address: "214 Harbor St", hours: "Open until 8 PM", status: "open", distance: "0.3 mi", x: 30, y: 36 },
  { id: "mill", name: "Old Mill", address: "9 Mill Lane", hours: "Closes soon, 6 PM", status: "closing", distance: "0.8 mi", x: 64, y: 24 },
  { id: "kestrel", name: "Kestrel Park", address: "1180 Kestrel Ave", hours: "Open until 9 PM", status: "open", distance: "1.2 mi", x: 74, y: 62 },
  { id: "union", name: "Union Square", address: "47 Union Sq", hours: "Closed, opens 7 AM", status: "closed", distance: "1.6 mi", x: 20, y: 70 },
  { id: "quay", name: "Riverside Quay", address: "302 Quay Rd", hours: "Open until 10 PM", status: "open", distance: "2.1 mi", x: 50, y: 84 },
];

function mix32(n: number) {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function rnd(a: number, b = 0) {
  return mix32(a * 668265263 + b * 2246822519 + 374761393);
}

const MAP = (() => {
  const blocks: { x: number; y: number; w: number; h: number; f: string }[] = [];
  const cols = [0, 42, 90, 128, 176, 222, 262, 310, 352, 400];
  const rows = [0, 36, 78, 114, 160, 198, 240, 278, 300];
  for (let j = 0; j < rows.length - 1; j++) {
    for (let i = 0; i < cols.length - 1; i++) {
      const x = cols[i] + 3.5;
      const y = rows[j] + 3.5;
      const w = cols[i + 1] - cols[i] - 7;
      const h = rows[j + 1] - rows[j] - 7;
      const r = rnd(i, j);
      const park = (i === 5 || i === 6) && (j === 4 || j === 5);
      if (park) {
        blocks.push({ x, y, w, h, f: "#13271f" });
      } else if (r < 0.45 && w > 30) {
        const m = Math.round(w / 2);
        blocks.push({ x, y, w: m - 2, h, f: "#171b23" }, { x: x + m + 2, y, w: w - m - 2, h, f: r < 0.2 ? "#1c212b" : "#161920" });
      } else {
        blocks.push({ x, y, w, h, f: r > 0.85 ? "#1c212b" : "#161a22" });
      }
    }
  }
  return blocks;
})();

const css = `
.hb-ub4 {
  --hb-ub4-a: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 380px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: #0e0e0f;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-ub4 *, .hb-ub4 *::before, .hb-ub4 *::after { box-sizing: border-box; }
.hb-ub4-in { display: grid; grid-template-columns: minmax(220px, 38%) minmax(0, 1fr); height: 100%; }
.hb-ub4-side { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-right: 1px solid #222; background: #111111; }
.hb-ub4-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 12px 14px 8px; }
.hb-ub4-ti { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub4-ct { font: 600 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8f8f8f; white-space: nowrap; }
.hb-ub4-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
  margin: 0;
  padding: 0 8px 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
  outline: none;
}
.hb-ub4-item {
  position: relative;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  column-gap: 9px;
  row-gap: 2px;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hb-ub4-item:hover { background: rgba(255, 255, 255, 0.035); }
.hb-ub4-item[aria-selected="true"] {
  background: color-mix(in srgb, var(--hb-ub4-a) 10%, transparent);
  border-color: color-mix(in srgb, var(--hb-ub4-a) 38%, transparent);
}
.hb-ub4-item:focus-visible { outline: 2px solid var(--hb-ub4-a); outline-offset: -1px; }
.hb-ub4-n {
  grid-row: 1 / span 3;
  align-self: start;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 7px;
  background: #1c1c1e;
  border: 1px solid #2a2a2a;
  font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #a1a1a1;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.hb-ub4-item[aria-selected="true"] .hb-ub4-n { background: var(--hb-ub4-a); border-color: transparent; color: #fff; }
.hb-ub4-nm { font-size: 12.5px; font-weight: 600; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub4-d { font: 500 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: #8f8f8f; white-space: nowrap; }
.hb-ub4-ad, .hb-ub4-hr { grid-column: 2 / span 2; font-size: 11px; line-height: 1.3; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub4-hr { display: flex; align-items: center; gap: 6px; color: #a1a1a1; }
.hb-ub4-hr::before { content: ""; flex: none; width: 6px; height: 6px; border-radius: 50%; background: #3ecf8e; }
.hb-ub4-hr[data-s="closing"]::before { background: #f5a524; }
.hb-ub4-hr[data-s="closed"]::before { background: #6b6b6b; }
.hb-ub4-map { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: #0b0d12; }
.hb-ub4-layer {
  --hb-ub4-z: 1;
  position: absolute;
  inset: 0;
  transform-origin: 0 0;
  transition: transform 0.7s cubic-bezier(0.22, 0.8, 0.2, 1);
  will-change: transform;
}
.hb-ub4-svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub4-pin {
  position: absolute;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 1.5px solid var(--hb-ub4-a);
  border-radius: 50% 50% 50% 4px;
  background: #101318;
  color: #ededed;
  font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  cursor: pointer;
  transform-origin: 0 100%;
  transform: translate(0, -100%) scale(calc(1 / var(--hb-ub4-z))) rotate(0deg);
  transition: transform 0.7s cubic-bezier(0.22, 0.8, 0.2, 1), background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
.hb-ub4-pin:hover { background: #18202e; }
.hb-ub4-pin[aria-pressed="true"] {
  z-index: 2;
  background: var(--hb-ub4-a);
  border-color: #fff;
  color: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55), 0 0 0 6px color-mix(in srgb, var(--hb-ub4-a) 22%, transparent);
  animation: hb-ub4-halo 2.2s ease-out infinite;
}
.hb-ub4-pin:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-ub4-route { fill: none; stroke: var(--hb-ub4-a); stroke-width: 2; stroke-dasharray: 3 4; stroke-linecap: round; opacity: 0.85; }
.hb-ub4-me {
  position: absolute;
  left: 42%;
  top: 52%;
  width: 11px;
  height: 11px;
  margin: -5.5px 0 0 -5.5px;
  border-radius: 50%;
  background: #ededed;
  border: 2px solid #0b0d12;
  box-shadow: 0 0 0 7px rgba(237, 237, 237, 0.14);
  transform: scale(calc(1 / var(--hb-ub4-z)));
  transition: transform 0.7s cubic-bezier(0.22, 0.8, 0.2, 1);
  pointer-events: none;
}
.hb-ub4-ctl {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  margin: 0;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 12, 0.78);
  color: #ededed;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hb-ub4-ctl[data-hide="true"] { opacity: 0; transform: translateY(4px); pointer-events: none; }
.hb-ub4-ctl:focus-visible { outline: 2px solid var(--hb-ub4-a); outline-offset: 2px; }
.hb-ub4-ctl svg { width: 12px; height: 12px; }
.hb-ub4-shade { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(130% 100% at 50% 45%, transparent 55%, rgba(5, 6, 9, 0.5)); }
@keyframes hb-ub4-halo {
  0% { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55), 0 0 0 0 color-mix(in srgb, var(--hb-ub4-a) 45%, transparent); }
  100% { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55), 0 0 0 12px color-mix(in srgb, var(--hb-ub4-a) 0%, transparent); }
}
@container (max-width: 520px) {
  .hb-ub4-in { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) auto; }
  .hb-ub4-map { grid-row: 1; }
  .hb-ub4-side { grid-row: 2; border-right: 0; border-top: 1px solid #222; }
  .hb-ub4-head { display: none; }
  .hb-ub4-list {
    flex-direction: row;
    gap: 6px;
    padding: 7px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .hb-ub4-list::-webkit-scrollbar { display: none; }
  .hb-ub4-item {
    flex: 0 0 min(206px, 72%);
    scroll-snap-align: start;
    padding: 7px 9px;
    border-color: #232323;
    background: #151515;
  }
  .hb-ub4-ad { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ub4-layer, .hb-ub4-pin, .hb-ub4-me, .hb-ub4-item, .hb-ub4-n, .hb-ub4-ctl { transition: none; }
  .hb-ub4-pin[aria-pressed="true"] { animation: none; }
}
`;

export function MapStoreLocator({
  locations = defaultStoreLocations,
  value,
  defaultValue,
  onChange,
  accent = "#2f7bff",
  zoom = 2,
  title = "Brightwater Coffee",
  className = "",
  style,
  ...rest
}: MapStoreLocatorProps) {
  const [inner, setInner] = React.useState<string | undefined>(defaultValue ?? locations[0]?.id);
  const [zoomed, setZoomed] = React.useState(true);
  const listRef = React.useRef<HTMLDivElement>(null);
  const items = React.useRef(new Map<string, HTMLButtonElement>());
  const uid = React.useId();
  const selId = value ?? inner;
  const selected = locations.find((l) => l.id === selId) ?? null;

  React.useEffect(() => {
    const list = listRef.current;
    const el = selId ? items.current.get(selId) : undefined;
    if (!list || !el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
    if (list.scrollWidth > list.clientWidth + 2) {
      const left = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, left), behavior });
    } else if (list.scrollHeight > list.clientHeight + 2) {
      const top = el.offsetTop - (list.clientHeight - el.offsetHeight) / 2;
      list.scrollTo({ top: Math.max(0, top), behavior });
    }
  }, [selId]);

  const select = (loc: StoreLocation) => {
    if (value === undefined) setInner(loc.id);
    setZoomed(true);
    onChange?.(loc.id, loc);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = -1;
    if (e.key in map) next = (index + map[e.key] + locations.length) % locations.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = locations.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const loc = locations[next];
    select(loc);
    items.current.get(loc.id)?.focus();
  };

  const z = zoomed && selected ? Math.max(1, zoom) : 1;
  let tx = 0;
  let ty = 0;
  if (selected && z > 1) {
    tx = Math.min(0, Math.max(100 - 100 * z, 50 - selected.x * z));
    ty = Math.min(0, Math.max(100 - 100 * z, 50 - selected.y * z));
  }
  const near = selected ?? locations[0];

  return (
    <div
      className={`hb-ub4 ${className}`.trim()}
      style={{ "--hb-ub4-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-map-store-locator" precedence="default">
        {css}
      </style>
      <div className="hb-ub4-in">
        <div className="hb-ub4-side">
          <div className="hb-ub4-head">
            <span className="hb-ub4-ti">{title}</span>
            <span className="hb-ub4-ct">{locations.length} stores</span>
          </div>
          <div ref={listRef} className="hb-ub4-list" role="listbox" aria-label={`${title} locations`} aria-orientation="vertical">
            {locations.map((loc, i) => {
              const on = loc.id === selId;
              return (
                <button
                  key={loc.id}
                  ref={(el) => {
                    if (el) items.current.set(loc.id, el);
                    else items.current.delete(loc.id);
                  }}
                  id={`${uid}-${loc.id}`}
                  type="button"
                  role="option"
                  aria-selected={on}
                  tabIndex={on || (!selected && i === 0) ? 0 : -1}
                  className="hb-ub4-item"
                  onClick={() => select(loc)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="hb-ub4-n">{i + 1}</span>
                  <span className="hb-ub4-nm">{loc.name}</span>
                  <span className="hb-ub4-d">{loc.distance}</span>
                  <span className="hb-ub4-ad">{loc.address}</span>
                  <span className="hb-ub4-hr" data-s={loc.status ?? "open"}>
                    {loc.hours}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="hb-ub4-map">
          <div
            className="hb-ub4-layer"
            style={
              {
                "--hb-ub4-z": z.toFixed(3),
                transform: `translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%) scale(${z.toFixed(3)})`,
              } as React.CSSProperties
            }
          >
            <svg className="hb-ub4-svg" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
              <rect width="400" height="300" fill="#0b0d12" />
              {MAP.map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2.5" fill={b.f} />
              ))}
              <path d="M-10 250 C 80 230, 140 280, 220 262 S 340 214, 410 236" fill="none" stroke="#0e2340" strokeWidth="24" />
              <path d="M-10 250 C 80 230, 140 280, 220 262 S 340 214, 410 236" fill="none" stroke="#12345c" strokeWidth="17" />
              <path d="M-10 30 L 410 140" stroke="#0b0d12" strokeWidth="8" />
              <path d="M-10 30 L 410 140" stroke="#262c38" strokeWidth="0.8" strokeDasharray="4 5" />
              {near ? (
                <path
                  className="hb-ub4-route"
                  d={`M 168 156 L ${((near.x / 100) * 400).toFixed(1)} 156 L ${((near.x / 100) * 400).toFixed(1)} ${((near.y / 100) * 300).toFixed(1)}`}
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
            </svg>
            <span className="hb-ub4-me" aria-hidden="true" />
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                type="button"
                className="hb-ub4-pin"
                aria-pressed={loc.id === selId}
                aria-label={`${loc.name}, ${loc.distance}`}
                tabIndex={-1}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                onClick={() => select(loc)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="hb-ub4-shade" />
          <button
            type="button"
            className="hb-ub4-ctl"
            data-hide={z > 1 ? "false" : "true"}
            tabIndex={z > 1 ? 0 : -1}
            aria-hidden={z > 1 ? undefined : true}
            onClick={() => setZoomed(false)}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M1.5 4.5v-3h3M10.5 4.5v-3h-3M1.5 7.5v3h3M10.5 7.5v3h-3" />
            </svg>
            Show all
          </button>
        </div>
      </div>
    </div>
  );
}

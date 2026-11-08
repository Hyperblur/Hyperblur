"use client";

import * as React from "react";

export interface HoverExpandRowsItem {
  title: string;
  tag: string;
  year: string;
  summary: string;
  stats?: { label: string; value: string }[];
  background?: string;
  href?: string;
}

export interface HoverExpandRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: HoverExpandRowsItem[];
  defaultOpen?: number;
  autoPlay?: boolean;
  accent?: string;
  linkLabel?: string;
  onOpenChange?: (index: number) => void;
}

const defaults: HoverExpandRowsItem[] = [
  { title: "Halden Bank", tag: "Fintech", year: "2025", summary: "Rebuilt onboarding from 11 steps to 4.", stats: [{ label: "Activation", value: "+38%" }, { label: "Drop-off", value: "-52%" }], background: "radial-gradient(circle at 70% 30%, #9fd0ff 0 14%, transparent 15%), linear-gradient(135deg, #1a3a6e, #0a1630)" },
  { title: "Northwind Air", tag: "Travel", year: "2024", summary: "A booking flow that fits on one screen.", stats: [{ label: "Conversion", value: "+21%" }, { label: "Time", value: "1m 40s" }], background: "linear-gradient(180deg, transparent 60%, #f3e6d0 60%), radial-gradient(circle at 30% 40%, #fff 0 10%, transparent 11%), linear-gradient(180deg, #ff9a6a, #ffcf9a)" },
  { title: "Oko Health", tag: "Healthcare", year: "2024", summary: "Clinician dashboard for 300 clinics.", stats: [{ label: "Clinics", value: "312" }, { label: "NPS", value: "71" }], background: "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 12px), linear-gradient(135deg, #1f7a5c, #0b2a22)" },
  { title: "Parcel & Co", tag: "Logistics", year: "2023", summary: "Live tracking with honest arrival times.", stats: [{ label: "Tickets", value: "-44%" }, { label: "Routes", value: "9.2k" }], background: "linear-gradient(160deg, transparent 50%, #ffcc4d 50% 64%, transparent 64%), linear-gradient(135deg, #2b2b36, #121218)" },
];

const css = `
.hb-wg12 { --hb-wg12-accent: #2f7bff; box-sizing: border-box; width: 100%; font-family: inherit; color: #ededed; border-top: 1px solid #262626; }
.hb-wg12 *, .hb-wg12 *::before, .hb-wg12 *::after { box-sizing: border-box; }
.hb-wg12-row { border-bottom: 1px solid #262626; transition: opacity .35s ease; }
.hb-wg12[data-any="true"] .hb-wg12-row:not([data-open="true"]) { opacity: .45; }
.hb-wg12-head { appearance: none; border: 0; margin: 0; background: none; font: inherit; color: inherit; cursor: pointer; width: 100%; display: grid; grid-template-columns: 22px minmax(0, 1fr) auto auto; align-items: center; gap: 10px; padding: 8px 2px; text-align: left; outline: none; -webkit-tap-highlight-color: transparent; }
.hb-wg12-head:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-wg12-accent); border-radius: 6px; }
.hb-wg12-idx { font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; transition: color .3s ease; }
.hb-wg12-row[data-open="true"] .hb-wg12-idx { color: var(--hb-wg12-accent); }
.hb-wg12-title { display: flex; align-items: center; gap: 0; min-width: 0; font-size: 14px; font-weight: 600; letter-spacing: -.02em; white-space: nowrap; overflow: hidden; }
.hb-wg12-title span { overflow: hidden; text-overflow: ellipsis; }
.hb-wg12-arrow { flex: none; width: 0; height: 13px; opacity: 0; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: width .45s cubic-bezier(.2,.9,.25,1), opacity .3s ease, margin .45s cubic-bezier(.2,.9,.25,1); }
.hb-wg12-row[data-open="true"] .hb-wg12-arrow { width: 13px; margin-right: 7px; opacity: 1; }
.hb-wg12-tag { font-size: 9.5px; padding: 2px 7px; border-radius: 999px; color: #a1a1a1; box-shadow: inset 0 0 0 1px #2a2a2a; white-space: nowrap; }
.hb-wg12-year { font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; color: #8f8f8f; }
.hb-wg12-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s cubic-bezier(.2,.9,.25,1); }
.hb-wg12-row[data-open="true"] .hb-wg12-body { grid-template-rows: 1fr; }
.hb-wg12-inner { min-height: 0; overflow: hidden; }
.hb-wg12-panel { display: grid; grid-template-columns: 76px minmax(0, 1fr); gap: 10px; padding: 0 2px 10px 34px; opacity: 0; transform: translateY(-6px); transition: opacity .35s ease, transform .5s cubic-bezier(.2,.9,.25,1); }
.hb-wg12-row[data-open="true"] .hb-wg12-panel { opacity: 1; transform: none; transition-delay: .08s; }
.hb-wg12-art { aspect-ratio: 4 / 3; border-radius: 7px; background: var(--hb-wg12-bg); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); transform: scale(.92) rotate(-2deg); transition: transform .6s cubic-bezier(.2,1.3,.35,1); }
.hb-wg12-row[data-open="true"] .hb-wg12-art { transform: none; }
.hb-wg12-copy { min-width: 0; display: grid; gap: 5px; align-content: start; }
.hb-wg12-sum { margin: 0; font-size: 10.5px; line-height: 1.35; color: #a1a1a1; }
.hb-wg12-stats { display: flex; gap: 12px; align-items: baseline; }
.hb-wg12-stat { display: grid; gap: 0; }
.hb-wg12-val { font-size: 12px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-wg12-lab { font-size: 8.5px; color: #6f6f6f; text-transform: uppercase; letter-spacing: .08em; }
.hb-wg12-link { margin-left: auto; align-self: center; font-size: 10px; color: #ededed; text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--hb-wg12-accent) 70%, transparent); padding-bottom: 1px; outline: none; }
.hb-wg12-link:focus-visible { box-shadow: 0 0 0 2px var(--hb-wg12-accent); border-radius: 3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg12-row, .hb-wg12-arrow, .hb-wg12-body, .hb-wg12-panel, .hb-wg12-art, .hb-wg12-idx { transition: none; }
}
`;

export function HoverExpandRows({
  items = defaults,
  defaultOpen = -1,
  autoPlay = true,
  accent = "#2f7bff",
  linkLabel = "View case",
  onOpenChange,
  className = "",
  style,
  ...rest
}: HoverExpandRowsProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [engaged, setEngaged] = React.useState(false);
  const timer = React.useRef(0);
  const heads = React.useRef<(HTMLButtonElement | null)[]>([]);
  const lastPointer = React.useRef("mouse");
  const n = items.length;
  const baseId = React.useId();

  const openRef = React.useRef(defaultOpen);
  const change = React.useCallback(
    (i: number) => {
      if (openRef.current !== i) onOpenChange?.(i);
      openRef.current = i;
      setOpen(i);
    },
    [onOpenChange],
  );

  React.useEffect(() => {
    if (!autoPlay || engaged || n === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = window.setInterval(() => {
      openRef.current = i;
      setOpen(i);
      i = (i + 1) % n;
    }, 2200);
    return () => window.clearInterval(id);
  }, [autoPlay, engaged, n]);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const schedule = (i: number, delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => change(i), delay);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Escape") change(-1);
    if (next >= 0) {
      e.preventDefault();
      heads.current[next]?.focus();
    }
  };

  return (
    <div
      className={`hb-wg12 ${className}`}
      style={{ "--hb-wg12-accent": accent, ...style } as React.CSSProperties}
      data-any={open >= 0 ? "true" : "false"}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") schedule(-1, 220);
      }}
      {...rest}
    >
      <style href="hb-hover-expand-rows" precedence="default">{css}</style>
      {items.map((item, i) => {
        const isOpen = open === i;
        const pid = `${baseId}-p${i}`;
        return (
          <div key={`${item.title}-${i}`} className="hb-wg12-row" data-open={isOpen ? "true" : "false"}>
            <button
              ref={(el) => {
                heads.current[i] = el;
              }}
              type="button"
              className="hb-wg12-head"
              aria-expanded={isOpen}
              aria-controls={pid}
              onPointerDown={(e) => {
                lastPointer.current = e.pointerType;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                setEngaged(true);
                schedule(i, open >= 0 ? 60 : 110);
              }}
              onFocus={() => {
                setEngaged(true);
                change(i);
              }}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => {
                setEngaged(true);
                if (lastPointer.current === "mouse") change(i);
                else change(isOpen ? -1 : i);
                lastPointer.current = "key";
              }}
            >
              <span className="hb-wg12-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-wg12-title">
                <svg className="hb-wg12-arrow" viewBox="0 0 13 13" aria-hidden="true">
                  <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" />
                </svg>
                <span>{item.title}</span>
              </span>
              <span className="hb-wg12-tag">{item.tag}</span>
              <span className="hb-wg12-year">{item.year}</span>
            </button>
            <div className="hb-wg12-body" id={pid} role="region" aria-label={item.title} aria-hidden={!isOpen}>
              <div className="hb-wg12-inner">
                <div className="hb-wg12-panel" style={{ "--hb-wg12-bg": item.background ?? "linear-gradient(135deg, #222, #111)" } as React.CSSProperties}>
                  <span className="hb-wg12-art" aria-hidden="true" />
                  <div className="hb-wg12-copy">
                    <p className="hb-wg12-sum">{item.summary}</p>
                    <div className="hb-wg12-stats">
                      {(item.stats ?? []).map((s) => (
                        <span key={s.label} className="hb-wg12-stat">
                          <span className="hb-wg12-val">{s.value}</span>
                          <span className="hb-wg12-lab">{s.label}</span>
                        </span>
                      ))}
                      <a className="hb-wg12-link" href={item.href ?? "#"} tabIndex={isOpen ? 0 : -1}>
                        {linkLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

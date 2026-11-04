"use client";

import * as React from "react";

export interface ScrubberSlide {
  title: string;
  meta?: string;
  from?: string;
  to?: string;
}

export interface CarouselScrubberProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  slides?: ScrubberSlide[];
  value?: number;
  defaultValue?: number;
  onChange?: (stop: number) => void;
  autoPlay?: number;
  accent?: string;
}

const defaults: ScrubberSlide[] = [
  { title: "Overture", meta: "00:00", from: "#ff9a62", to: "#4a1d6b" },
  { title: "First light", meta: "01:12", from: "#ffd37a", to: "#c4452f" },
  { title: "The long road", meta: "02:48", from: "#7fb3ff", to: "#14264d" },
  { title: "Harbor town", meta: "04:05", from: "#9fe3c0", to: "#14593f" },
  { title: "Storm front", meta: "05:31", from: "#8c93a8", to: "#161a2b" },
  { title: "Night market", meta: "06:50", from: "#ff7fb0", to: "#3a1459" },
  { title: "Quiet hour", meta: "08:16", from: "#c9b6ff", to: "#2b2a6e" },
  { title: "Homecoming", meta: "09:40", from: "#f6c47b", to: "#7a2f36" },
];

const SLIDE = 58;
const GAP = 3;
const UNIT = SLIDE + GAP;

const css = `
.hb-za3 {
  --hb-za3-c: #2f7bff;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-za3 *, .hb-za3 *::before, .hb-za3 *::after { box-sizing: border-box; }
.hb-za3-view { overflow: hidden; border-radius: 14px; }
.hb-za3-track {
  display: flex;
  gap: ${GAP}%;
  transform: translate3d(calc(var(--hb-za3-pos) * -${UNIT}%), 0, 0);
  transition: transform 0.6s cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za3[data-scrub="true"] .hb-za3-track { transition: none; }
.hb-za3-slide {
  position: relative;
  flex: 0 0 ${SLIDE}%;
  min-width: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.hb-za3-slide[data-near="false"] { opacity: 0.55; transform: scale(0.97); }
.hb-za3-slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 78% 30%, rgba(255, 255, 255, 0.5) 0, rgba(255, 255, 255, 0.1) 13%, transparent 14%),
    linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.6));
}
.hb-za3-label { position: absolute; left: 10px; right: 10px; bottom: 8px; z-index: 1; display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-za3-label b { font-size: 13px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-za3-label span { font-size: 11px; color: rgba(255, 255, 255, 0.7); font-variant-numeric: tabular-nums; }
.hb-za3-rail { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
.hb-za3-now { flex: 0 0 auto; min-width: 5.2em; font-size: 12px; font-weight: 500; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-za3-bar {
  position: relative;
  flex: 1 1 auto;
  height: 22px;
  min-width: 0;
  cursor: pointer;
  touch-action: none;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
}
.hb-za3-bar::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 4px;
  margin-top: -2px;
  background: #262626;
  border-radius: 999px;
}
.hb-za3-ticks { position: absolute; inset: 0; pointer-events: none; }
.hb-za3-tick {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 8px;
  margin: -4px 0 0 -1px;
  background: #3d3d3d;
  border-radius: 1px;
  transition: background 0.2s ease, height 0.2s ease, margin 0.2s ease;
}
.hb-za3-tick[data-on="true"] { background: #6a6a6a; }
.hb-za3-tick[data-hit="true"] { height: 12px; margin-top: -6px; background: var(--hb-za3-c); }
.hb-za3-thumb {
  position: absolute;
  top: 50%;
  left: calc(var(--hb-za3-t) * (100% - var(--hb-za3-w)));
  width: var(--hb-za3-w);
  height: 16px;
  margin-top: -8px;
  background: #ededed;
  border-radius: 999px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(47, 123, 255, 0);
  transition: left 0.6s cubic-bezier(0.22, 0.9, 0.24, 1), box-shadow 0.2s ease, transform 0.2s ease;
}
.hb-za3[data-scrub="true"] .hb-za3-thumb { transition: box-shadow 0.2s ease, transform 0.2s ease; transform: scaleY(1.2); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 0 4px color-mix(in srgb, var(--hb-za3-c) 40%, transparent); }
.hb-za3-bar:focus-visible .hb-za3-thumb { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 0 3px var(--hb-za3-c); }
.hb-za3-bar:hover .hb-za3-thumb { background: #ffffff; }
@media (prefers-reduced-motion: reduce) {
  .hb-za3-track, .hb-za3-thumb, .hb-za3-slide, .hb-za3-tick { transition: none; }
}
`;

export function CarouselScrubber({
  slides,
  value,
  defaultValue = 0,
  onChange,
  autoPlay = 0,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: CarouselScrubberProps) {
  const items = slides && slides.length ? slides : defaults;
  const total = items.length;
  const limit = Math.max(0, (total * UNIT - GAP - 100) / UNIT);
  const stops = React.useMemo(() => {
    const list: number[] = [];
    for (let i = 0; i <= Math.floor(limit + 1e-6); i++) list.push(i);
    if (limit - list[list.length - 1] > 0.02) list.push(limit);
    return list;
  }, [limit]);
  const thumbFrac = Math.min(1, 100 / (total * UNIT - GAP));
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const stop = Math.min(stops.length - 1, Math.max(0, controlled ? value : inner));
  const [scrub, setScrub] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);
  const barRef = React.useRef<HTMLDivElement>(null);
  const grab = React.useRef(0);
  const latest = React.useRef(onChange);
  const maxP = limit;

  React.useEffect(() => {
    latest.current = onChange;
  }, [onChange]);

  const set = React.useCallback(
    (next: number) => {
      const clamped = Math.min(stops.length - 1, Math.max(0, next));
      if (clamped === stop) return;
      if (!controlled) setInner(clamped);
      latest.current?.(clamped);
    },
    [controlled, stop, stops.length],
  );

  React.useEffect(() => {
    if (!autoPlay || paused || scrub !== null) return;
    const id = window.setTimeout(() => set(stop >= stops.length - 1 ? 0 : stop + 1), autoPlay);
    return () => window.clearTimeout(id);
  }, [autoPlay, paused, scrub, stop, stops.length, set]);

  const pos = scrub !== null ? scrub : stops[stop];
  const t = maxP > 0 ? pos / maxP : 0;

  function posFromPointer(clientX: number) {
    const el = barRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const tw = rect.width * thumbFrac;
    const span = Math.max(1, rect.width - tw);
    const frac = (clientX - grab.current - rect.left - tw / 2) / span;
    return Math.min(1, Math.max(0, frac)) * maxP;
  }

  function nearest(p: number) {
    let best = 0;
    let dist = Infinity;
    stops.forEach((s, i) => {
      const d = Math.abs(s - p);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    return best;
  }

  function down(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = barRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    el.focus({ preventScroll: true });
    const rect = el.getBoundingClientRect();
    const tw = rect.width * thumbFrac;
    const center = rect.left + tw / 2 + t * (rect.width - tw);
    grab.current = Math.abs(e.clientX - center) <= tw / 2 ? e.clientX - center : 0;
    setScrub(posFromPointer(e.clientX));
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (scrub === null) return;
    setScrub(posFromPointer(e.clientX));
  }

  function up(e: React.PointerEvent<HTMLDivElement>) {
    if (scrub === null) return;
    const el = barRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    const target = nearest(posFromPointer(e.clientX));
    setScrub(null);
    if (!controlled) setInner(target);
    if (target !== stop) latest.current?.(target);
  }

  const currentIndex = Math.round(pos);
  const vars = {
    "--hb-za3-c": accent,
    "--hb-za3-pos": pos.toFixed(4),
    "--hb-za3-t": t.toFixed(4),
    "--hb-za3-w": `${(thumbFrac * 100).toFixed(2)}%`,
    ...style,
  } as React.CSSProperties;

  const lead = Math.min(total - 1, currentIndex);

  return (
    <div
      className={`hb-za3 ${className}`}
      style={vars}
      data-scrub={scrub !== null}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setPaused(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-carousel-scrubber" precedence="default">{css}</style>
      <div className="hb-za3-view" aria-hidden="true">
        <div className="hb-za3-track">
          {items.map((slide, i) => (
            <div
              key={i}
              className="hb-za3-slide"
              data-near={i >= pos - 0.6 && i <= pos + 1.2}
              style={{ background: `linear-gradient(150deg, ${slide.from ?? "#2f7bff"}, ${slide.to ?? "#101a33"})` }}
            >
              <div className="hb-za3-label">
                <b>{slide.title}</b>
                {slide.meta ? <span>{slide.meta}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hb-za3-rail">
        <span className="hb-za3-now">{String(lead + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <div
          ref={barRef}
          className="hb-za3-bar"
          role="slider"
          tabIndex={0}
          aria-label="Scrub through slides"
          aria-valuemin={1}
          aria-valuemax={stops.length}
          aria-valuenow={stop + 1}
          aria-valuetext={`${items[Math.min(total - 1, Math.round(stops[stop]))].title}, position ${stop + 1} of ${stops.length}`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              set(stop + 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              set(stop - 1);
            } else if (e.key === "Home") {
              e.preventDefault();
              set(0);
            } else if (e.key === "End") {
              e.preventDefault();
              set(stops.length - 1);
            }
          }}
        >
          <div className="hb-za3-ticks" aria-hidden="true">
            {stops.map((s, i) => {
              const frac = maxP > 0 ? s / maxP : 0;
              const left = `calc(${(thumbFrac * 50).toFixed(2)}% + ${frac.toFixed(4)} * (100% - ${(thumbFrac * 100).toFixed(2)}%))`;
              return (
                <span
                  key={i}
                  className="hb-za3-tick"
                  data-on={s <= pos + 0.001}
                  data-hit={Math.abs(s - pos) < 0.02}
                  style={{ left }}
                />
              );
            })}
          </div>
          <div className="hb-za3-thumb" />
        </div>
      </div>
    </div>
  );
}

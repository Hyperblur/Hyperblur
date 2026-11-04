"use client";

import * as React from "react";

export interface PageCountSlide {
  title: string;
  caption?: string;
  src?: string;
  from?: string;
  to?: string;
}

export interface CarouselPageCountProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  slides?: PageCountSlide[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoPlay?: number;
  ratio?: string;
  accent?: string;
}

const defaults: PageCountSlide[] = [
  { title: "Morning ferry", caption: "Cold light over the harbor", from: "#f6a85b", to: "#5b2a86" },
  { title: "Salt flats", caption: "Where the sky goes flat", from: "#9fd3e6", to: "#2a4a6b" },
  { title: "Night orchard", caption: "Lanterns between the rows", from: "#2b3b66", to: "#0a0f1f" },
  { title: "Rose cliffs", caption: "Low tide, late afternoon", from: "#f2c6a0", to: "#b4505a" },
  { title: "Fern valley", caption: "The hour after rain", from: "#a6e3b4", to: "#14593f" },
  { title: "Violet pass", caption: "Above the cloud line", from: "#c9b6ff", to: "#2b2a6e" },
  { title: "Ember road", caption: "Late August, dry grass", from: "#ffd37a", to: "#c4452f" },
  { title: "Glass bay", caption: "Slack water at dusk", from: "#7fe0e0", to: "#123b55" },
];

const css = `
.hb-za2 {
  --hb-za2-c: #2f7bff;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  outline: none;
}
.hb-za2 *, .hb-za2 *::before, .hb-za2 *::after { box-sizing: border-box; }
.hb-za2:focus-visible { outline: 2px solid var(--hb-za2-c); outline-offset: 4px; border-radius: 16px; }
.hb-za2-view {
  position: relative;
  overflow: hidden;
  aspect-ratio: var(--hb-za2-r);
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
  touch-action: pan-y;
  cursor: grab;
}
.hb-za2-view[data-drag="true"] { cursor: grabbing; }
.hb-za2-track {
  display: flex;
  height: 100%;
  transform: translate3d(calc(var(--hb-za2-i) * -100% + var(--hb-za2-dx, 0px)), 0, 0);
  transition: transform 0.55s cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za2-view[data-drag="true"] .hb-za2-track { transition: none; }
.hb-za2-slide {
  position: relative;
  flex: 0 0 100%;
  min-width: 0;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}
.hb-za2-art { position: absolute; inset: 0; background-size: cover; background-position: center; }
.hb-za2-art::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 76% 28%, rgba(255, 255, 255, 0.55) 0, rgba(255, 255, 255, 0.12) 14%, transparent 15%),
    linear-gradient(180deg, transparent 38%, rgba(0, 0, 0, 0.62) 100%);
}
.hb-za2-copy { position: absolute; left: 14px; right: 14px; bottom: 11px; display: flex; flex-direction: column; gap: 1px; }
.hb-za2-copy b { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-za2-copy span { font-size: 12px; color: rgba(255, 255, 255, 0.72); }
.hb-za2-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 10px; }
.hb-za2-count {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  font-size: 22px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.hb-za2-digits { display: inline-flex; }
.hb-za2-digit {
  position: relative;
  display: block;
  width: 0.62em;
  height: 1.1em;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
  mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
}
.hb-za2-reel {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--hb-za2-d) * -1.1em));
  transition: transform 0.6s cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za2-reel i { display: block; height: 1.1em; line-height: 1.1em; font-style: normal; text-align: center; }
.hb-za2-sep { font-size: 14px; font-weight: 500; color: #6b6b6b; }
.hb-za2-total { font-size: 14px; font-weight: 500; color: #8f8f8f; }
.hb-za2-meter { flex: 1 1 auto; min-width: 24px; height: 3px; overflow: hidden; background: #262626; border-radius: 999px; }
.hb-za2-meter span {
  display: block;
  height: 100%;
  background: var(--hb-za2-c);
  border-radius: inherit;
  transform-origin: left center;
  transform: scaleX(var(--hb-za2-p));
  transition: transform 0.55s cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za2-arrows { display: flex; gap: 8px; }
.hb-za2-btn {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  color: #ededed;
  background: #171717;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}
.hb-za2-btn:hover:not(:disabled) { background: #202020; border-color: #3a3a3a; }
.hb-za2-btn:active:not(:disabled) { transform: scale(0.93); }
.hb-za2-btn:focus-visible { outline: 2px solid var(--hb-za2-c); outline-offset: 2px; }
.hb-za2-btn:disabled { opacity: 0.32; cursor: not-allowed; }
.hb-za2-btn svg { width: 15px; height: 15px; }
.hb-za2-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-za2-track, .hb-za2-reel, .hb-za2-meter span, .hb-za2-btn { transition: none; }
}
`;

function Digits({ value, width }: { value: number; width: number }) {
  const text = String(value).padStart(width, "0");
  return (
    <span className="hb-za2-digits" aria-hidden="true">
      {text.split("").map((ch, k) => (
        <span key={k} className="hb-za2-digit">
          <span className="hb-za2-reel" style={{ "--hb-za2-d": Number(ch) } as React.CSSProperties}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <i key={n}>{n}</i>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export function CarouselPageCount({
  slides,
  value,
  defaultValue = 0,
  onChange,
  autoPlay = 0,
  ratio = "16 / 9",
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: CarouselPageCountProps) {
  const items = slides && slides.length ? slides : defaults;
  const total = items.length;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const index = Math.min(total - 1, Math.max(0, controlled ? value : inner));
  const [paused, setPaused] = React.useState(false);
  const [drag, setDrag] = React.useState<number | null>(null);
  const start = React.useRef<{ x: number; id: number; w: number } | null>(null);
  const latest = React.useRef(onChange);
  const width = String(total).length;

  React.useEffect(() => {
    latest.current = onChange;
  }, [onChange]);

  const set = React.useCallback(
    (next: number) => {
      const clamped = Math.min(total - 1, Math.max(0, next));
      if (clamped === index) return;
      if (!controlled) setInner(clamped);
      latest.current?.(clamped);
    },
    [controlled, index, total],
  );

  React.useEffect(() => {
    if (!autoPlay || paused || drag !== null) return;
    const id = window.setTimeout(() => set(index >= total - 1 ? 0 : index + 1), autoPlay);
    return () => window.clearTimeout(id);
  }, [autoPlay, paused, drag, index, total, set]);

  const vars = {
    "--hb-za2-c": accent,
    "--hb-za2-r": ratio,
    "--hb-za2-i": index,
    "--hb-za2-p": ((index + 1) / total).toFixed(4),
    "--hb-za2-dx": drag !== null ? `${drag.toFixed(1)}px` : "0px",
    ...style,
  } as React.CSSProperties;

  function down(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, id: e.pointerId, w: e.currentTarget.clientWidth };
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (drag === null && Math.abs(dx) < 6) return;
    if (drag === null) e.currentTarget.setPointerCapture(e.pointerId);
    let eased = dx;
    if ((index === 0 && dx > 0) || (index === total - 1 && dx < 0)) eased = dx * 0.3;
    setDrag(eased);
  }

  function up(e: React.PointerEvent<HTMLDivElement>) {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    start.current = null;
    const dx = drag ?? 0;
    setDrag(null);
    if (Math.abs(dx) > Math.min(70, s.w * 0.18)) set(index + (dx < 0 ? 1 : -1));
  }

  return (
    <div
      className={`hb-za2 ${className}`}
      style={vars}
      role="group"
      aria-roledescription="carousel"
      aria-label="Gallery"
      tabIndex={0}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "ArrowRight") {
          e.preventDefault();
          set(index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          set(index - 1);
        } else if (e.key === "Home") {
          e.preventDefault();
          set(0);
        } else if (e.key === "End") {
          e.preventDefault();
          set(total - 1);
        }
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setPaused(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setPaused(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setPaused(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-carousel-page-count" precedence="default">{css}</style>
      <div
        className="hb-za2-view"
        data-drag={drag !== null}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="hb-za2-track">
          {items.map((slide, i) => (
            <div
              key={i}
              className="hb-za2-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={i !== index}
            >
              <div
                className="hb-za2-art"
                style={{
                  background: slide.src
                    ? `center / cover url(${slide.src})`
                    : `linear-gradient(150deg, ${slide.from ?? "#2f7bff"}, ${slide.to ?? "#101a33"})`,
                }}
              />
              <div className="hb-za2-copy">
                <b>{slide.title}</b>
                {slide.caption ? <span>{slide.caption}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hb-za2-bar">
        <div className="hb-za2-count">
          <Digits value={index + 1} width={width} />
          <span className="hb-za2-sep" aria-hidden="true">/</span>
          <span className="hb-za2-total" aria-hidden="true">{String(total).padStart(width, "0")}</span>
          <span className="hb-za2-sr" role="status" aria-live="polite">
            Slide {index + 1} of {total}
          </span>
        </div>
        <div className="hb-za2-meter" aria-hidden="true">
          <span />
        </div>
        <div className="hb-za2-arrows">
          <button type="button" className="hb-za2-btn" aria-label="Previous slide" disabled={index === 0} onClick={() => set(index - 1)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <button type="button" className="hb-za2-btn" aria-label="Next slide" disabled={index === total - 1} onClick={() => set(index + 1)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

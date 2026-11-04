"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export interface LightboxImage {
  src?: string;
  alt?: string;
  caption?: string;
}

export interface CarouselLightboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  images?: LightboxImage[];
  accent?: string;
  thumbWidth?: number;
}

const palette = [
  ["#f6a85b", "#5b2a86"],
  ["#9fd3e6", "#2a4a6b"],
  ["#2b3b66", "#0a0f1f"],
  ["#f2c6a0", "#b4505a"],
  ["#a6e3b4", "#14593f"],
  ["#c9b6ff", "#2b2a6e"],
  ["#ffd37a", "#c4452f"],
  ["#7fe0e0", "#123b55"],
];

const defaults: LightboxImage[] = [
  { alt: "Dune light", caption: "Dune light, Namib coast" },
  { alt: "Harbor fog", caption: "Harbor fog before the first ferry" },
  { alt: "Night orchard", caption: "Night orchard, long exposure" },
  { alt: "Rose cliffs", caption: "Rose cliffs at low tide" },
  { alt: "Fern valley", caption: "Fern valley after rain" },
  { alt: "Violet pass", caption: "Violet pass above the cloud line" },
  { alt: "Ember road", caption: "Ember road, late August" },
  { alt: "Glass bay", caption: "Glass bay at slack water" },
];

function hash(n: number) {
  let h = Math.imul(n + 1, 374761393);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

function Scene({ index, image }: { index: number; image: LightboxImage }) {
  if (image.src) {
    return (
      <div
        className="hb-za1-scene hb-za1-img"
        role="img"
        aria-label={image.alt ?? ""}
        style={{ backgroundImage: `url(${JSON.stringify(image.src)})` }}
      />
    );
  }
  const h = hash(index);
  const [c1, c2] = palette[index % palette.length];
  const sx = 70 + (h % 260);
  const sy = 64 + ((h >>> 8) % 60);
  const r = 20 + ((h >>> 16) % 22);
  const a = 180 + ((h >>> 4) % 50);
  const b = 215 + ((h >>> 12) % 40);
  return (
    <div
      className="hb-za1-scene"
      role="img"
      aria-label={image.alt ?? ""}
      style={{ background: `linear-gradient(165deg, ${c1}, ${c2})` }}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx={sx} cy={sy} r={r.toFixed(1)} fill="#ffffff" fillOpacity="0.82" />
        <circle cx={sx} cy={sy} r={(r * 2).toFixed(1)} fill="#ffffff" fillOpacity="0.1" />
        <path
          d={`M0 ${a} Q 100 ${a - 56} 200 ${a - 12} T 400 ${a - 34} V300 H0Z`}
          fill="#000000"
          fillOpacity="0.22"
        />
        <path
          d={`M0 ${b} Q 120 ${b - 44} 230 ${b - 6} T 400 ${b - 22} V300 H0Z`}
          fill="#000000"
          fillOpacity="0.38"
        />
      </svg>
    </div>
  );
}

const css = `
.hb-za1 {
  --hb-za1-c: #2f7bff;
  --hb-za1-w: 112px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-za1 *, .hb-za1 *::before, .hb-za1 *::after { box-sizing: border-box; }
.hb-za1-strip {
  display: flex;
  gap: 10px;
  padding: 4px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.hb-za1-strip::-webkit-scrollbar { display: none; }
.hb-za1-thumb {
  position: relative;
  flex: 0 0 var(--hb-za1-w);
  aspect-ratio: 4 / 3;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font: inherit;
  color: inherit;
  background: #171717;
  border: 1px solid #262626;
  border-radius: 10px;
  cursor: zoom-in;
  scroll-snap-align: start;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-za1-thumb:hover { transform: translateY(-2px); border-color: #3a3a3a; }
.hb-za1-thumb:focus-visible { outline: 2px solid var(--hb-za1-c); outline-offset: 2px; }
.hb-za1-thumb[data-open="true"] { visibility: hidden; }
.hb-za1-thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.28) 50%, transparent 65%);
  transform: translateX(-120%);
  animation: hb-za1-glint 7s ease-in-out infinite;
  animation-delay: calc(var(--hb-za1-i, 0) * 0.55s);
}
.hb-za1-scene { position: absolute; inset: 0; overflow: hidden; }
.hb-za1-scene svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-za1-img { background-size: cover; background-position: center; user-select: none; }
.hb-za1-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: -14px 0 0;
  padding: 0;
  color: #ededed;
  background: rgba(10, 10, 10, 0.78);
  border: 1px solid #333333;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
}
.hb-za1-nav:hover { background: #1c1c1c; }
.hb-za1-nav:focus-visible { outline: 2px solid var(--hb-za1-c); outline-offset: 2px; }
.hb-za1-nav[data-side="prev"] { left: -6px; }
.hb-za1-nav[data-side="next"] { right: -6px; }
.hb-za1-nav:disabled { opacity: 0; pointer-events: none; transform: scale(0.8); }
.hb-za1-nav svg { width: 14px; height: 14px; }
.hb-za1-box {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-family: inherit;
  color: #ededed;
  outline: none;
}
.hb-za1-box *, .hb-za1-box *::before, .hb-za1-box *::after { box-sizing: border-box; }
.hb-za1-scrim {
  position: absolute;
  inset: 0;
  background: rgba(4, 4, 6, 0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 1;
  transition: opacity 0.3s ease;
  animation: hb-za1-fade 0.3s ease;
}
.hb-za1-box[data-closing="true"] .hb-za1-scrim,
.hb-za1-box[data-closing="true"] .hb-za1-ui { opacity: 0; }
.hb-za1-stage {
  position: relative;
  z-index: 1;
  width: min(92vw, calc((100vh - 170px) * 1.3333), 760px);
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #171717;
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform-origin: 0 0;
}
.hb-za1-slide { position: absolute; inset: 0; }
.hb-za1-slide[data-swap="next"] { animation: hb-za1-in-next 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-za1-slide[data-swap="prev"] { animation: hb-za1-in-prev 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-za1-ui { transition: opacity 0.25s ease; animation: hb-za1-fade 0.4s ease 0.1s backwards; }
.hb-za1-cap {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  max-width: 92vw;
  text-align: center;
  pointer-events: none;
}
.hb-za1-pane { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.hb-za1-pane .hb-za1-btn { pointer-events: auto; }
.hb-za1-cap b { font-size: 14px; font-weight: 600; }
.hb-za1-cap span { font-size: 12px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-za1-btn {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin: 0;
  padding: 0;
  color: #ededed;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}
.hb-za1-btn:hover { background: rgba(255, 255, 255, 0.16); }
.hb-za1-btn:active { transform: scale(0.94); }
.hb-za1-btn:focus-visible { outline: 2px solid var(--hb-za1-c); outline-offset: 2px; }
.hb-za1-btn:disabled { opacity: 0.25; cursor: default; }
.hb-za1-btn svg { width: 18px; height: 18px; }
.hb-za1-btn[data-role="close"] { top: 18px; right: 18px; }
.hb-za1-btn[data-role="prev"] { left: 18px; top: 50%; margin-top: -21px; }
.hb-za1-btn[data-role="next"] { right: 18px; top: 50%; margin-top: -21px; }
@keyframes hb-za1-glint {
  0%, 70%, 100% { transform: translateX(-120%); }
  85% { transform: translateX(120%); }
}
@keyframes hb-za1-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-za1-in-next { from { opacity: 0; transform: translateX(36px) scale(1.04); } to { opacity: 1; transform: none; } }
@keyframes hb-za1-in-prev { from { opacity: 0; transform: translateX(-36px) scale(1.04); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .hb-za1-btn[data-role="prev"] { left: 8px; }
  .hb-za1-btn[data-role="next"] { right: 8px; }
  .hb-za1-btn[data-role="close"] { top: 10px; right: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-za1-thumb, .hb-za1-nav, .hb-za1-scrim, .hb-za1-ui, .hb-za1-btn { transition: none; animation: none; }
  .hb-za1-thumb::after, .hb-za1-slide { animation: none !important; }
}
`;

const easing = "cubic-bezier(0.2, 0.8, 0.2, 1)";

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function flipFrame(from: DOMRect, to: DOMRect) {
  const dx = from.left - to.left;
  const dy = from.top - to.top;
  const sx = from.width / to.width;
  const sy = from.height / to.height;
  return `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
}

export function CarouselLightbox({
  images,
  accent = "#2f7bff",
  thumbWidth = 112,
  className = "",
  style,
  ...rest
}: CarouselLightboxProps) {
  const items = images && images.length ? images : defaults;
  const total = items.length;
  const [open, setOpen] = React.useState<number | null>(null);
  const [closing, setClosing] = React.useState(false);
  const [swap, setSwap] = React.useState<"next" | "prev" | null>(null);
  const [edges, setEdges] = React.useState({ start: true, end: false });
  const stripRef = React.useRef<HTMLDivElement>(null);
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const originRect = React.useRef<DOMRect | null>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const wasOpen = React.useRef(false);
  const isOpen = open !== null;

  const measure = React.useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  React.useEffect(() => {
    measure();
    const el = stripRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, total, thumbWidth]);

  React.useLayoutEffect(() => {
    if (isOpen && !wasOpen.current) {
      const stage = stageRef.current;
      const from = originRect.current;
      if (stage && from && !reducedMotion()) {
        const to = stage.getBoundingClientRect();
        stage.animate([{ transform: flipFrame(from, to) }, { transform: "none" }], {
          duration: 440,
          easing,
        });
      }
      closeRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  React.useEffect(() => {
    if (open === null) return;
    const strip = stripRef.current;
    const th = thumbs.current[open];
    if (!strip || !th) return;
    const left = th.offsetLeft - (strip.clientWidth - th.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  }, [open]);

  function openAt(i: number) {
    const th = thumbs.current[i];
    if (!th) return;
    originRect.current = th.getBoundingClientRect();
    setSwap(null);
    setClosing(false);
    setOpen(i);
  }

  function finish() {
    const idx = open;
    setOpen(null);
    setClosing(false);
    setSwap(null);
    if (idx !== null) thumbs.current[idx]?.focus({ preventScroll: true });
  }

  function close() {
    if (open === null || closing) return;
    const stage = stageRef.current;
    const th = thumbs.current[open];
    if (!stage || !th || reducedMotion()) {
      finish();
      return;
    }
    stage.getAnimations().forEach((a) => a.cancel());
    const to = stage.getBoundingClientRect();
    const from = th.getBoundingClientRect();
    setClosing(true);
    const anim = stage.animate([{ transform: "none" }, { transform: flipFrame(from, to) }], {
      duration: 340,
      easing,
      fill: "forwards",
    });
    anim.onfinish = finish;
  }

  function go(step: 1 | -1) {
    if (open === null || closing) return;
    const next = open + step;
    if (next < 0 || next >= total) return;
    setSwap(step === 1 ? "next" : "prev");
    setOpen(next);
  }

  function onBoxKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Tab") {
      const nodes = boxRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
      if (!nodes || !nodes.length) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === boxRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function nudge(dir: 1 | -1) {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reducedMotion() ? "auto" : "smooth" });
  }

  const vars = {
    "--hb-za1-c": accent,
    "--hb-za1-w": `${thumbWidth}px`,
    ...style,
  } as React.CSSProperties;

  const current = open !== null ? items[open] : null;

  return (
    <div className={`hb-za1 ${className}`} style={vars} {...rest}>
      <style href="hb-carousel-lightbox" precedence="default">{css}</style>
      <button
        type="button"
        className="hb-za1-nav"
        data-side="prev"
        aria-label="Scroll thumbnails left"
        disabled={edges.start}
        onClick={() => nudge(-1)}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <div
        ref={stripRef}
        className="hb-za1-strip"
        role="group"
        aria-label="Image thumbnails"
        onScroll={measure}
      >
        {items.map((image, i) => (
          <button
            key={i}
            ref={(el) => {
              thumbs.current[i] = el;
            }}
            type="button"
            className="hb-za1-thumb"
            data-open={open === i ? "true" : undefined}
            style={{ "--hb-za1-i": i } as React.CSSProperties}
            aria-label={`Open ${image.alt ?? `image ${i + 1}`}`}
            aria-haspopup="dialog"
            onClick={() => openAt(i)}
          >
            <Scene index={i} image={image} />
          </button>
        ))}
      </div>
      <button
        type="button"
        className="hb-za1-nav"
        data-side="next"
        aria-label="Scroll thumbnails right"
        disabled={edges.end}
        onClick={() => nudge(1)}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 3 5 5-5 5" />
        </svg>
      </button>
      {isOpen && current && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={boxRef}
              className="hb-za1-box"
              role="dialog"
              aria-modal="true"
              aria-label={current.alt ?? "Image viewer"}
              tabIndex={-1}
              data-closing={closing}
              style={{ "--hb-za1-c": accent } as React.CSSProperties}
              onKeyDown={onBoxKeyDown}
            >
              <style href="hb-carousel-lightbox" precedence="default">{css}</style>
              <div className="hb-za1-scrim" onClick={close} />
              <div ref={stageRef} className="hb-za1-stage">
                <div key={open} className="hb-za1-slide" data-swap={swap ?? undefined}>
                  <Scene index={open} image={current} />
                </div>
              </div>
              <div className="hb-za1-pane hb-za1-ui">
                <button ref={closeRef} type="button" className="hb-za1-btn" data-role="close" aria-label="Close viewer" onClick={close}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
                  </svg>
                </button>
                <button type="button" className="hb-za1-btn" data-role="prev" aria-label="Previous image" disabled={open === 0} onClick={() => go(-1)}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 3 5 8l5 5" />
                  </svg>
                </button>
                <button type="button" className="hb-za1-btn" data-role="next" aria-label="Next image" disabled={open === total - 1} onClick={() => go(1)}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 3 5 5-5 5" />
                  </svg>
                </button>
              </div>
              <div className="hb-za1-cap hb-za1-ui" aria-live="polite">
                <b>{current.caption ?? current.alt ?? ""}</b>
                <span>
                  {open + 1} / {total}
                </span>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

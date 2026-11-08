"use client";

import * as React from "react";

export interface LightboxImage {
  title: string;
  location: string;
  meta?: string;
  background: string;
  alt?: string;
}

export interface ModalLightboxZoomProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  images?: LightboxImage[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  gallery?: boolean;
  zoom?: number;
  accent?: string;
}

const defaultImages: LightboxImage[] = [
  {
    title: "Dune sea at first light",
    location: "Erg Chebbi, Morocco",
    meta: "X-T5 · 23mm · f/8 · 1/320s",
    background:
      "radial-gradient(120% 60% at 30% 100%, #8a4a22 0 38%, transparent 39%), radial-gradient(140% 55% at 85% 105%, #b5652c 0 40%, transparent 41%), radial-gradient(90% 40% at 60% 92%, #d98a45 0 45%, transparent 46%), radial-gradient(30% 22% at 72% 38%, #ffe2b0, transparent 70%), linear-gradient(180deg, #5a7bb0 0%, #e9b48a 58%, #f7cf9f 70%)",
  },
  {
    title: "Aurora over the falls",
    location: "Skógafoss, Iceland",
    meta: "A7 IV · 14mm · f/1.8 · 6s",
    background:
      "linear-gradient(180deg, transparent 72%, #05070a 72%), radial-gradient(60% 18% at 40% 40%, rgba(80, 255, 170, 0.75), transparent 70%), radial-gradient(50% 14% at 66% 30%, rgba(120, 120, 255, 0.55), transparent 70%), radial-gradient(1px 1px at 20% 20%, #fff, transparent), radial-gradient(1px 1px at 80% 12%, #fff, transparent), radial-gradient(1px 1px at 55% 8%, #fff, transparent), linear-gradient(180deg, #050816 0%, #0c1d33 60%, #12324a 72%)",
  },
  {
    title: "Low tide, golden hour",
    location: "Big Sur, California",
    meta: "R6 II · 50mm · f/4 · 1/800s",
    background:
      "linear-gradient(170deg, transparent 0 64%, #1d1410 64% 70%, transparent 70%), radial-gradient(28% 18% at 50% 58%, #fff3c4, transparent 70%), linear-gradient(180deg, #2b2a52 0%, #c25e5e 38%, #f2a65a 56%, #3a5f7a 58%, #1c3348 100%)",
  },
  {
    title: "Fog in the rainforest",
    location: "Hoh, Washington",
    meta: "X100V · 23mm · f/2 · 1/125s",
    background:
      "radial-gradient(80% 50% at 50% 50%, rgba(220, 235, 230, 0.55), transparent 70%), repeating-linear-gradient(90deg, rgba(10, 30, 26, 0.75) 0 3%, transparent 3% 11%, rgba(10, 30, 26, 0.45) 11% 13%, transparent 13% 21%), linear-gradient(180deg, #8fa8a0 0%, #3e5c54 60%, #142a24 100%)",
  },
  {
    title: "Crossing after rain",
    location: "Shibuya, Tokyo",
    meta: "Z6 III · 35mm · f/1.4 · 1/60s",
    background:
      "repeating-linear-gradient(90deg, transparent 0 6%, rgba(255, 255, 255, 0.5) 6% 8%, transparent 8% 12%) 0 82% / 100% 6% no-repeat, radial-gradient(18% 30% at 18% 30%, rgba(255, 64, 160, 0.8), transparent 70%), radial-gradient(16% 28% at 82% 26%, rgba(0, 220, 255, 0.7), transparent 70%), radial-gradient(40% 20% at 50% 92%, rgba(255, 120, 200, 0.35), transparent 70%), linear-gradient(180deg, #0c0a1a 0%, #1d1430 55%, #120e1e 100%)",
  },
  {
    title: "Blue ice, calving face",
    location: "Perito Moreno, Patagonia",
    meta: "GFX 100S · 63mm · f/11 · 1/250s",
    background:
      "linear-gradient(180deg, transparent 70%, #1b3242 70%), linear-gradient(100deg, transparent 0 20%, #cfe9f5 20% 30%, #9fd4ea 30% 44%, #e9f6fb 44% 58%, #7cc4e0 58% 72%, #d5eef8 72% 86%, transparent 86%) 0 46% / 100% 26% no-repeat, linear-gradient(180deg, #7fa6c4 0%, #c9dbe6 60%, #a9c2d1 70%)",
  },
];

const css = `
.hb-xe8 { --hb-xe8-accent: #ededed; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe8 *, .hb-xe8 *::before, .hb-xe8 *::after { box-sizing: border-box; }
.hb-xe8[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0b0b0b; padding: 12px; }
.hb-xe8 button:focus-visible { outline: 2px solid var(--hb-xe8-accent); outline-offset: 2px; }
.hb-xe8-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; grid-template-rows: 70px 70px; gap: 4px; width: min(340px, 100%); }
.hb-xe8-tile { position: relative; overflow: hidden; padding: 0; border: 0; border-radius: 6px; background-size: cover; background-position: center; cursor: zoom-in; transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1); }
.hb-xe8-tile:first-child { grid-row: span 2; border-radius: 10px 6px 6px 10px; }
.hb-xe8-tile:hover { filter: brightness(1.12); }
.hb-xe8-tile:active { transform: scale(0.98); }
.hb-xe8-more { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(0, 0, 0, 0.5); font-size: 15px; font-weight: 600; -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px); }
.hb-xe8-layer { container-type: size; position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; background: rgba(6, 6, 6, 0.96); outline: none; animation: hb-xe8-fade 0.3s ease both; }
.hb-xe8[data-embedded] .hb-xe8-layer { position: absolute; height: auto; z-index: 2; }
.hb-xe8-layer[data-state="closed"] { animation: hb-xe8-fade-out 0.24s ease both; }
.hb-xe8-bar { display: flex; align-items: center; gap: 10px; padding: clamp(8px, 2.4cqh, 16px) clamp(10px, 2.6cqw, 20px); }
.hb-xe8-count { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #9a9a9a; font-variant-numeric: tabular-nums; }
.hb-xe8-count b { color: #ededed; font-weight: 500; }
.hb-xe8-name { flex: 1; min-width: 0; font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe8-icon { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.06); color: #d4d4d4; cursor: pointer; transition: background-color 0.18s ease, color 0.18s ease; }
.hb-xe8-icon:hover { background: rgba(255, 255, 255, 0.14); color: #fff; }
.hb-xe8-icon[aria-pressed="true"] { background: #ededed; color: #0a0a0a; }
.hb-xe8-icon svg { width: 15px; height: 15px; }
.hb-xe8-stage { position: relative; min-height: 0; display: grid; place-items: center; padding: 0 clamp(40px, 8cqw, 76px); overflow: hidden; touch-action: pan-y; }
.hb-xe8-frame { position: relative; width: min(100%, calc((100cqh - 150px) * 1.5)); aspect-ratio: 3 / 2; max-height: 100%; overflow: hidden; border-radius: 6px; box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9); cursor: zoom-in; }
.hb-xe8-frame[data-zoomed="true"] { cursor: zoom-out; }
.hb-xe8-img { position: absolute; inset: 0; background-size: cover; background-position: center; transform-origin: var(--hb-xe8-ox, 50%) var(--hb-xe8-oy, 50%); transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1); animation: hb-xe8-in-next 0.55s cubic-bezier(0.2, 0.9, 0.2, 1) both; }
.hb-xe8-img[data-dir="prev"] { animation-name: hb-xe8-in-prev; }
.hb-xe8-frame[data-zoomed="true"] .hb-xe8-img { transform: scale(var(--hb-xe8-zoom, 2.2)); transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), transform-origin 0.12s linear; }
.hb-xe8-nav { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: clamp(30px, 7cqh, 44px); height: clamp(30px, 7cqh, 44px); margin-top: calc(clamp(30px, 7cqh, 44px) / -2); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 50%; background: rgba(20, 20, 20, 0.7); color: #ededed; cursor: pointer; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: background-color 0.2s ease, transform 0.2s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe8-nav:hover { background: rgba(40, 40, 40, 0.9); }
.hb-xe8-nav:active { transform: scale(0.92); }
.hb-xe8-nav[data-side="prev"] { left: clamp(6px, 1.6cqw, 18px); }
.hb-xe8-nav[data-side="next"] { right: clamp(6px, 1.6cqw, 18px); }
.hb-xe8-nav svg { width: 45%; height: 45%; }
.hb-xe8-info { position: absolute; left: 10px; bottom: 10px; max-width: calc(100% - 20px); padding: 8px 10px; border-radius: 9px; background: rgba(10, 10, 10, 0.72); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); font-size: 11.5px; line-height: 1.4; pointer-events: none; animation: hb-xe8-up 0.3s cubic-bezier(0.2, 0.9, 0.2, 1) both; }
.hb-xe8-info b { display: block; font-size: 12.5px; font-weight: 600; }
.hb-xe8-info span { display: block; color: #a8a8a8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe8-info span:last-child { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #8a8a8a; }
.hb-xe8-strip { display: flex; justify-content: center; gap: 6px; padding: clamp(8px, 2.4cqh, 16px) 12px; overflow-x: auto; scrollbar-width: none; }
.hb-xe8-thumb { flex: none; width: clamp(34px, 9cqh, 64px); aspect-ratio: 3 / 2; padding: 0; border: 0; border-radius: 4px; background-size: cover; background-position: center; opacity: 0.45; cursor: pointer; box-shadow: 0 0 0 0 transparent; transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.25s ease; }
.hb-xe8-thumb:hover { opacity: 0.8; }
.hb-xe8-thumb[aria-current="true"] { opacity: 1; transform: translateY(-2px); box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 3.5px var(--hb-xe8-accent); }
.hb-xe8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@container (max-height: 260px) {
  .hb-xe8-strip { display: none; }
  .hb-xe8-frame { width: min(100%, calc((100cqh - 64px) * 1.5)); }
  .hb-xe8-layer { grid-template-rows: auto 1fr 8px; }
}
@keyframes hb-xe8-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe8-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe8-in-next { from { opacity: 0; transform: translateX(6%) scale(1.04); } to { opacity: 1; transform: none; } }
@keyframes hb-xe8-in-prev { from { opacity: 0; transform: translateX(-6%) scale(1.04); } to { opacity: 1; transform: none; } }
@keyframes hb-xe8-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe8-layer, .hb-xe8-layer[data-state="closed"], .hb-xe8-img, .hb-xe8-info { animation: none; }
  .hb-xe8-layer[data-state="closed"] { opacity: 0; }
  .hb-xe8-img, .hb-xe8-frame[data-zoomed="true"] .hb-xe8-img, .hb-xe8-thumb, .hb-xe8-nav, .hb-xe8-tile, .hb-xe8-icon { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

function useLayer(
  open: boolean,
  embedded: boolean,
  panel: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  userOpened: React.RefObject<boolean>,
) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const steal = !embedded || userOpened.current;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    if (!embedded) html.style.overflow = "hidden";
    if (steal && node) {
      const target = node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(focusable) ?? node;
      target.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (!node) return;
      if (embedded && !node.contains(document.activeElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!embedded) html.style.overflow = overflow;
      if (steal && previous && previous.isConnected && previous !== document.body) previous.focus({ preventScroll: true });
    };
  }, [open, embedded, panel, userOpened]);
}

function bg(img: LightboxImage): React.CSSProperties {
  return { background: img.background };
}

export function ModalLightboxZoom({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  images = defaultImages,
  index,
  defaultIndex = 0,
  onIndexChange,
  gallery = true,
  zoom = 2.2,
  accent = "#ededed",
  className = "",
  style,
  ...rest
}: ModalLightboxZoomProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [innerIndex, setInnerIndex] = React.useState(defaultIndex);
  const [dir, setDir] = React.useState<"next" | "prev">("next");
  const [zoomed, setZoomed] = React.useState(false);
  const [info, setInfo] = React.useState(true);
  const userOpened = React.useRef(false);
  const layer = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<HTMLDivElement>(null);
  const swipe = React.useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const id = React.useId();
  const count = images.length;
  const current = Math.min(Math.max(index ?? innerIndex, 0), Math.max(count - 1, 0));
  const img = images[current];

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) userOpened.current = true;
      else setZoomed(false);
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  const go = React.useCallback(
    (to: number, direction?: "next" | "prev") => {
      if (!count) return;
      const next = (to + count) % count;
      setDir(direction ?? (next >= current ? "next" : "prev"));
      setZoomed(false);
      if (index === undefined) setInnerIndex(next);
      onIndexChange?.(next);
    },
    [count, current, index, onIndexChange],
  );

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 250);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    if (!isOpen) return;
    const el = layer.current?.querySelector<HTMLElement>('[aria-current="true"]');
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current, isOpen]);

  useLayer(isOpen, embedded, layer, close, userOpened);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(current + 1, "next");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(current - 1, "prev");
    } else if (e.key === "z" || e.key === "+" || e.key === "=") {
      setZoomed((z) => !z);
    } else if (e.key === "i") {
      setInfo((v) => !v);
    }
  }

  function aim(e: React.PointerEvent<HTMLDivElement>) {
    const f = frame.current;
    if (!f) return;
    const r = f.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * 100;
    const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1) * 100;
    f.style.setProperty("--hb-xe8-ox", `${x.toFixed(1)}%`);
    f.style.setProperty("--hb-xe8-oy", `${y.toFixed(1)}%`);
  }

  function openAt(i: number) {
    if (index === undefined) setInnerIndex(i);
    onIndexChange?.(i);
    setDir("next");
    setOpen(true);
  }

  const vars = { "--hb-xe8-accent": accent, "--hb-xe8-zoom": zoom, ...style } as React.CSSProperties;
  const chevron = (d: string) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );

  return (
    <div className={`hb-xe8 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe8-css" precedence="default">{css}</style>
      {gallery && (
        <div className="hb-xe8-grid" role="group" aria-label="Photo gallery">
          {images.slice(0, 5).map((im, i) => (
            <button
              key={im.title}
              type="button"
              className="hb-xe8-tile"
              style={bg(im)}
              aria-label={i === 4 && count > 5 ? `Open ${im.title}, ${count - 5} more photos` : `Open ${im.title}`}
              aria-haspopup="dialog"
              onClick={() => openAt(i)}
            >
              {i === 4 && count > 5 && <span className="hb-xe8-more">+{count - 5}</span>}
            </button>
          ))}
        </div>
      )}
      {present && img && (
        <div
          ref={layer}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer, ${img.title}`}
          tabIndex={-1}
          className="hb-xe8-layer"
          data-state={isOpen ? "open" : "closed"}
          onKeyDown={onKeyDown}
        >
          <div className="hb-xe8-bar">
            <span className="hb-xe8-count"><b>{current + 1}</b> / {count}</span>
            <span className="hb-xe8-name" id={`${id}-t`}>{img.title}</span>
            <button type="button" className="hb-xe8-icon" aria-label="Photo details" aria-pressed={info} onClick={() => setInfo((v) => !v)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M8 7.2v3.6M8 5.2v.1" /></svg>
            </button>
            <button type="button" className="hb-xe8-icon" aria-label={zoomed ? "Zoom out" : "Zoom in"} aria-pressed={zoomed} onClick={() => setZoomed((z) => !z)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" />
                <path d={zoomed ? "M5 7h4M10.5 10.5 14 14" : "M5 7h4M7 5v4M10.5 10.5 14 14"} />
              </svg>
            </button>
            <button type="button" className="hb-xe8-icon" aria-label="Close viewer" data-autofocus="" onClick={close}>
              {chevron("m4 4 8 8m0-8-8 8")}
            </button>
          </div>
          <div className="hb-xe8-stage">
            <button type="button" className="hb-xe8-nav" data-side="prev" aria-label="Previous photo" onClick={() => go(current - 1, "prev")}>
              {chevron("M10 3.5 5.5 8l4.5 4.5")}
            </button>
            <div
              ref={frame}
              className="hb-xe8-frame"
              data-zoomed={zoomed ? "true" : undefined}
              onPointerDown={(e) => {
                swipe.current = { x: e.clientX, y: e.clientY, moved: false };
                if (zoomed) aim(e);
              }}
              onPointerMove={(e) => {
                const s = swipe.current;
                if (s && Math.abs(e.clientX - s.x) > 8) s.moved = true;
                if (zoomed) aim(e);
              }}
              onPointerUp={(e) => {
                const s = swipe.current;
                swipe.current = null;
                if (!s) return;
                const dx = e.clientX - s.x;
                if (!zoomed && s.moved && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
                  go(current + (dx < 0 ? 1 : -1), dx < 0 ? "next" : "prev");
                  return;
                }
                if (!s.moved) {
                  aim(e);
                  setZoomed((z) => !z);
                }
              }}
            >
              <div key={current} className="hb-xe8-img" data-dir={dir} style={bg(img)} role="img" aria-label={img.alt ?? `${img.title}, ${img.location}`} />
              {info && !zoomed && (
                <div className="hb-xe8-info">
                  <b>{img.title}</b>
                  <span>{img.location}</span>
                  {img.meta && <span>{img.meta}</span>}
                </div>
              )}
            </div>
            <button type="button" className="hb-xe8-nav" data-side="next" aria-label="Next photo" onClick={() => go(current + 1, "next")}>
              {chevron("M6 3.5 10.5 8 6 12.5")}
            </button>
          </div>
          <div className="hb-xe8-strip" role="tablist" aria-label="All photos">
            {images.map((im, i) => (
              <button
                key={im.title}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-current={i === current ? "true" : undefined}
                aria-label={im.title}
                className="hb-xe8-thumb"
                style={bg(im)}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <span className="hb-xe8-sr" aria-live="polite">{`Photo ${current + 1} of ${count}: ${img.title}`}</span>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";

export interface SlideShowSlide {
  background: React.ReactNode;
  title?: string;
  text?: string;
}

export interface SlideShowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  slides?: SlideShowSlide[];
  children?: React.ReactNode;
  transition?: "fade" | "zoom" | "slide";
  autoplay?: number;
  loop?: boolean;
  arrows?: boolean;
  dots?: boolean;
  fullscreenButton?: boolean;
}

const css = `
@keyframes hb-ss-kb {
  from { transform: scale(1); }
  to { transform: scale(1.14); }
}
@keyframes hb-ss-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-ss-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes hb-ss-prog {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.hb-ss {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: inherit;
  background: #000;
  color: #fff;
  touch-action: pan-y;
  user-select: none;
  outline: none;
  container-type: inline-size;
}
.hb-ss:focus-visible { box-shadow: inset 0 0 0 2px #2f7bff; }
.hb-ss:fullscreen { aspect-ratio: auto; border-radius: 0; }
.hb-ss-slide {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  opacity: 0;
}
.hb-ss-slide.hb-ss-prev { z-index: 1; opacity: 1; }
.hb-ss-slide.hb-ss-active {
  z-index: 2;
  opacity: 1;
  transition: opacity 0.9s ease;
}
.hb-ss-bg { position: absolute; inset: 0; }
.hb-ss-bg > * { width: 100%; height: 100%; object-fit: cover; }
.hb-ss-t-zoom .hb-ss-active .hb-ss-bg,
.hb-ss-t-zoom .hb-ss-prev .hb-ss-bg {
  animation: hb-ss-kb var(--hb-ss-kb) ease-out forwards;
}
.hb-ss-t-slide .hb-ss-slide { opacity: 1; transition: none; }
.hb-ss-t-slide .hb-ss-before { transform: translateX(-100%); }
.hb-ss-t-slide .hb-ss-after { transform: translateX(100%); }
.hb-ss-t-slide .hb-ss-slide.hb-ss-active,
.hb-ss-t-slide .hb-ss-slide.hb-ss-prev {
  transition: transform 0.8s cubic-bezier(.65, 0, .35, 1);
}
.hb-ss-t-slide .hb-ss-slide.hb-ss-active { transform: none; }
.hb-ss-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.65) 100%);
  pointer-events: none;
}
.hb-ss-copy {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 clamp(14px, 6%, 48px) clamp(30px, 9%, 56px);
  max-width: 36em;
  opacity: 0;
}
.hb-ss-active .hb-ss-copy { animation: hb-ss-up 0.8s cubic-bezier(.22, 1, .36, 1) 0.3s both; }
.hb-ss-prev .hb-ss-copy { animation: hb-ss-out 0.35s ease forwards; }
.hb-ss-title {
  margin: 0;
  font-family: var(--font-serif, Georgia, "Times New Roman", serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(20px, 5.4cqw, 44px);
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.hb-ss-text {
  margin: 0.5em 0 0;
  font-size: clamp(12px, 1.6cqw, 16px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}
.hb-ss-btn {
  position: absolute;
  top: 50%;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: -16px 0 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.55);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, opacity 0.2s ease;
}
.hb-ss-btn:hover:not(:disabled) { background: rgba(47, 123, 255, 0.85); }
.hb-ss-btn:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
.hb-ss-btn:disabled { opacity: 0.35; cursor: default; }
.hb-ss-prevbtn { left: 8px; }
.hb-ss-nextbtn { right: 8px; }
.hb-ss-fs { top: 8px; right: 8px; margin: 0; }
.hb-ss-dots {
  position: absolute;
  left: 50%;
  bottom: 10px;
  z-index: 5;
  display: flex;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.45);
  transform: translateX(-50%);
}
.hb-ss-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.2s ease, width 0.25s ease;
}
.hb-ss-dot:hover { background: rgba(255, 255, 255, 0.7); }
.hb-ss-dot:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
.hb-ss-dot[aria-current="true"] { width: 18px; background: #fff; }
.hb-ss-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  height: 3px;
  background: rgba(255, 255, 255, 0.14);
}
.hb-ss-bar > i {
  display: block;
  height: 100%;
  background: #fff;
  transform-origin: 0 50%;
  animation: hb-ss-prog var(--hb-ss-ap) linear forwards;
}
.hb-ss-paused .hb-ss-bar > i { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hb-ss-t-zoom .hb-ss-active .hb-ss-bg,
  .hb-ss-t-zoom .hb-ss-prev .hb-ss-bg { animation: none; }
  .hb-ss-active .hb-ss-copy { animation: hb-ss-out 0.4s ease reverse both; }
  .hb-ss-t-slide .hb-ss-slide,
  .hb-ss-t-slide .hb-ss-slide.hb-ss-active,
  .hb-ss-t-slide .hb-ss-slide.hb-ss-prev {
    transform: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .hb-ss-t-slide .hb-ss-slide.hb-ss-active { opacity: 1; }
  .hb-ss-t-slide .hb-ss-slide.hb-ss-prev { opacity: 1; transition: none; }
  .hb-ss-btn, .hb-ss-dot { transition: none; }
}
`;

interface State {
  index: number;
  prev: number;
  dir: number;
}

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotion() {
  return false;
}

function place(i: number, state: State, n: number) {
  if (i === state.index) return "";
  if (i === state.prev) return state.dir > 0 ? "before" : "after";
  return (i - state.index + n) % n <= n / 2 ? "after" : "before";
}

export function SlideShow({
  slides,
  children,
  transition = "zoom",
  autoplay = 5000,
  loop = true,
  arrows = true,
  dots = true,
  fullscreenButton = false,
  className = "",
  style,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...rest
}: SlideShowProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const startX = React.useRef<number | null>(null);
  const [state, setState] = React.useState<State>({ index: 0, prev: -1, dir: 1 });
  const [paused, setPaused] = React.useState(false);
  const [full, setFull] = React.useState(false);
  const reduced = React.useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);

  const items: SlideShowSlide[] = slides ?? React.Children.toArray(children).map((child) => ({ background: child }));
  const count = items.length;
  const index = Math.min(state.index, Math.max(0, count - 1));
  const playing = autoplay > 0 && count > 1 && !reduced;

  const go = React.useCallback(
    (to: number, dir: number) => {
      setState((s) => {
        if (to === s.index) return s;
        return { index: to, prev: s.index, dir };
      });
    },
    [],
  );

  const next = React.useCallback(() => {
    if (count < 2) return;
    if (index < count - 1) go(index + 1, 1);
    else if (loop) go(0, 1);
  }, [count, index, loop, go]);

  const prev = React.useCallback(() => {
    if (count < 2) return;
    if (index > 0) go(index - 1, -1);
    else if (loop) go(count - 1, -1);
  }, [count, index, loop, go]);

  React.useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFullscreen() {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, -1);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1, 1);
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    onPointerDown?.(e);
    if ((e.target as HTMLElement).closest("button")) {
      startX.current = null;
      return;
    }
    startX.current = e.clientX;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    onPointerUp?.(e);
    const from = startX.current;
    startX.current = null;
    if (from === null) return;
    const dx = e.clientX - from;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  }

  function handlePointerCancel(e: React.PointerEvent<HTMLDivElement>) {
    onPointerCancel?.(e);
    startX.current = null;
  }

  function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
    onMouseEnter?.(e);
    setPaused(true);
  }

  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(e);
    setPaused(false);
  }

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    onFocus?.(e);
    setPaused(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    onBlur?.(e);
    setPaused(false);
  }

  const vars = {
    "--hb-ss-ap": `${Math.max(500, autoplay)}ms`,
    "--hb-ss-kb": `${Math.max(9000, autoplay * 1.8)}ms`,
    ...style,
  } as React.CSSProperties;

  const atEnd = !loop && index === count - 1;

  return (
    <div
      ref={rootRef}
      className={`hb-ss hb-ss-t-${transition}${paused ? " hb-ss-paused" : ""} ${className}`}
      style={vars}
      role="region"
      aria-roledescription="carousel"
      aria-label="Slideshow"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      <style href="hb-slide-show" precedence="default">{css}</style>
      {items.map((item, i) => {
        const active = i === index;
        const old = !active && i === state.prev;
        const where = place(i, { ...state, index }, count);
        const cls = ["hb-ss-slide", active ? "hb-ss-active" : "", old ? "hb-ss-prev" : "", where ? `hb-ss-${where}` : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            key={i}
            className={cls}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active ? undefined : true}
          >
            <div className="hb-ss-bg">{item.background}</div>
            {(item.title || item.text) && (
              <>
                <div className="hb-ss-scrim" />
                <div className="hb-ss-copy">
                  {item.title && <h3 className="hb-ss-title">{item.title}</h3>}
                  {item.text && <p className="hb-ss-text">{item.text}</p>}
                </div>
              </>
            )}
          </div>
        );
      })}
      {count > 1 && arrows && (
        <>
          <button
            type="button"
            className="hb-ss-btn hb-ss-prevbtn"
            aria-label="Previous slide"
            disabled={!loop && index === 0}
            onClick={prev}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hb-ss-btn hb-ss-nextbtn"
            aria-label="Next slide"
            disabled={atEnd}
            onClick={next}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {count > 1 && dots && (
        <div className="hb-ss-dots">
          {items.map((_, i) => (
            <button
              type="button"
              key={i}
              className="hb-ss-dot"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i, i > index ? 1 : -1)}
            />
          ))}
        </div>
      )}
      {fullscreenButton && (
        <button
          type="button"
          className="hb-ss-btn hb-ss-fs"
          aria-label={full ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={toggleFullscreen}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {full ? (
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            ) : (
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            )}
          </svg>
        </button>
      )}
      {playing && !atEnd && (
        <div className="hb-ss-bar" aria-hidden="true">
          <i key={`${index}-${autoplay}`} onAnimationEnd={next} />
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  autoplay?: number;
  loop?: boolean;
  gap?: number;
  slidesPerView?: number;
}

const css = `
.hb-cr { position: relative; width: 100%; }
.hb-cr-track {
  position: relative;
  display: flex;
  gap: var(--hb-gap);
  height: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  border-radius: inherit;
  outline: none;
}
.hb-cr-track::-webkit-scrollbar { display: none; }
.hb-cr-track:focus-visible { box-shadow: 0 0 0 2px #2f7bff; }
.hb-cr-slide {
  flex: 0 0 calc((100% - (var(--hb-n) - 1) * var(--hb-gap)) / var(--hb-n));
  display: flex;
  min-width: 0;
  scroll-snap-align: start;
}
.hb-cr-slide > * { flex: 1 1 auto; min-width: 0; }
.hb-cr-btn {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: -16px 0 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 50%;
  background: rgba(10, 10, 10, .6);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background .2s ease, opacity .2s ease;
}
.hb-cr-btn:hover:not(:disabled) { background: rgba(47, 123, 255, .85); }
.hb-cr-btn:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
.hb-cr-btn:disabled { opacity: .35; cursor: default; }
.hb-cr-prev { left: 8px; }
.hb-cr-next { right: 8px; }
.hb-cr-dots {
  position: absolute;
  left: 50%;
  bottom: 8px;
  z-index: 1;
  display: flex;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(10, 10, 10, .5);
  transform: translateX(-50%);
}
.hb-cr-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, .4);
  cursor: pointer;
  transition: background .2s ease, width .25s ease;
}
.hb-cr-dot:hover { background: rgba(255, 255, 255, .7); }
.hb-cr-dot:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
.hb-cr-dot[aria-current="true"] { width: 18px; background: #fff; }
@media (prefers-reduced-motion: reduce) {
  .hb-cr-btn, .hb-cr-dot { transition: none; }
}
`;

export function Carousel({
  children,
  autoplay = 0,
  loop = true,
  gap = 16,
  slidesPerView = 1,
  className = "",
  style,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const activeRef = React.useRef(0);
  const pausedRef = React.useRef(false);
  const [active, setActive] = React.useState(0);

  const slides = React.Children.toArray(children);
  const count = slides.length;
  const perView = Math.max(1, slidesPerView);
  const pages = Math.max(1, count - Math.floor(perView) + 1);

  const scrollToIndex = React.useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const target = el.children[Math.min(Math.max(index, 0), count - 1)] as HTMLElement | undefined;
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: target.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  const next = React.useCallback(() => {
    const i = activeRef.current + 1;
    if (i < pages) scrollToIndex(i);
    else if (loop) scrollToIndex(0);
  }, [pages, loop, scrollToIndex]);

  const prev = React.useCallback(() => {
    const i = activeRef.current - 1;
    if (i >= 0) scrollToIndex(i);
    else if (loop) scrollToIndex(pages - 1);
  }, [pages, loop, scrollToIndex]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const kids = el.children;
      const max = el.scrollWidth - el.clientWidth;
      let best = 0;
      if (max > 1 && el.scrollLeft >= max - 1) {
        best = pages - 1;
      } else {
        let bestDistance = Infinity;
        for (let i = 0; i < kids.length; i++) {
          const d = Math.abs((kids[i] as HTMLElement).offsetLeft - el.scrollLeft);
          if (d < bestDistance) {
            bestDistance = d;
            best = i;
          }
        }
      }
      best = Math.min(best, pages - 1);
      activeRef.current = best;
      setActive(best);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pages, count]);

  React.useEffect(() => {
    if (!(autoplay > 0) || pages < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      next();
    }, autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, pages, next]);

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
      scrollToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToIndex(pages - 1);
    }
  }

  function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
    onMouseEnter?.(e);
    pausedRef.current = true;
  }

  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(e);
    pausedRef.current = false;
  }

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    onFocus?.(e);
    pausedRef.current = true;
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    onBlur?.(e);
    pausedRef.current = false;
  }

  const vars = {
    "--hb-gap": `${gap}px`,
    "--hb-n": perView,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`hb-cr ${className}`}
      style={vars}
      role="region"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <style href="hb-carousel" precedence="default">{css}</style>
      <div className="hb-cr-track" ref={trackRef} tabIndex={0} aria-live={autoplay > 0 ? "off" : "polite"}>
        {slides.map((slide, i) => (
          <div
            className="hb-cr-slide"
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            {slide}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <>
          <button
            type="button"
            className="hb-cr-btn hb-cr-prev"
            aria-label="Previous slide"
            disabled={!loop && active === 0}
            onClick={prev}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hb-cr-btn hb-cr-next"
            aria-label="Next slide"
            disabled={!loop && active === pages - 1}
            onClick={next}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="hb-cr-dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                type="button"
                key={i}
                className="hb-cr-dot"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

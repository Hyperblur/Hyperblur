"use client";

import * as React from "react";

export interface AnimatedListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  items: React.ReactNode[];
  onSelect?: (index: number) => void;
  initialSelected?: number;
  showGradients?: boolean;
  maxHeight?: number;
}

const css = `
@property --hb-al-t { syntax: "<length>"; inherits: false; initial-value: 0px; }
@property --hb-al-b { syntax: "<length>"; inherits: false; initial-value: 0px; }
.hb-al { position: relative; width: 100%; color: #f2f2f5; }
.hb-al-scroll {
  --hb-al-t: 0px;
  --hb-al-b: 0px;
  max-height: var(--hb-al-max);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}
.hb-al-scroll::-webkit-scrollbar { display: none; }
.hb-al-scroll[data-gradients="true"] {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 var(--hb-al-t), #000 calc(100% - var(--hb-al-b)), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 var(--hb-al-t), #000 calc(100% - var(--hb-al-b)), transparent 100%);
  transition: --hb-al-t .25s ease, --hb-al-b .25s ease;
}
.hb-al-scroll[data-top="true"] { --hb-al-t: 28px; }
.hb-al-scroll[data-bottom="true"] { --hb-al-b: 28px; }
.hb-al-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  outline: none;
  border-radius: 14px;
}
.hb-al-track:focus-visible { box-shadow: 0 0 0 1px rgba(47, 123, 255, .6); }
.hb-al-hl {
  position: absolute;
  top: 0;
  left: 4px;
  right: 4px;
  height: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, .09);
  opacity: 0;
  pointer-events: none;
  transition: transform .28s cubic-bezier(.22, .8, .24, 1), height .28s cubic-bezier(.22, .8, .24, 1), opacity .2s ease;
}
.hb-al-item {
  position: relative;
  z-index: 1;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, .68);
  cursor: pointer;
  user-select: none;
  transition: color .2s ease;
  animation: hb-al-in .5s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: var(--hb-al-d);
}
.hb-al-item[data-active="true"] { color: #fff; }
.hb-al-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 3px;
  border-radius: 3px;
  background: #2f7bff;
  opacity: 0;
  transform: scaleY(.4);
  transition: opacity .2s ease, transform .2s ease;
}
.hb-al-item[data-selected="true"]::before { opacity: 1; transform: scaleY(1); }
@keyframes hb-al-in {
  from { opacity: 0; transform: translate3d(-14px, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-al-item { animation: none; transition: none; }
  .hb-al-item::before { transition: none; }
  .hb-al-hl { transition: none; }
  .hb-al-scroll[data-gradients="true"] { transition: none; }
}
`;

const FADE = 28;

export function AnimatedList({
  items,
  onSelect,
  initialSelected = -1,
  showGradients = true,
  maxHeight = 320,
  className = "",
  style,
  onKeyDown,
  ...rest
}: AnimatedListProps) {
  const uid = React.useId();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const hlRef = React.useRef<HTMLDivElement>(null);
  const placed = React.useRef(false);
  const [selected, setSelected] = React.useState(initialSelected);
  const [hovered, setHovered] = React.useState(-1);
  const [fade, setFade] = React.useState({ top: false, bottom: false });

  const total = items.length;
  const sel = selected >= 0 && selected < total ? selected : -1;
  const hov = hovered >= 0 && hovered < total ? hovered : -1;
  const active = hov >= 0 ? hov : sel;

  const updateFade = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop > 1;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setFade((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
  }, []);

  const place = React.useCallback(() => {
    const hl = hlRef.current;
    const track = trackRef.current;
    if (!hl || !track) return;
    const target = active >= 0 ? track.querySelector<HTMLElement>(`[data-idx="${active}"]`) : null;
    if (!target) {
      hl.style.opacity = "0";
      return;
    }
    const first = !placed.current;
    if (first) hl.style.transition = "none";
    hl.style.height = `${target.offsetHeight}px`;
    hl.style.transform = `translate3d(0, ${target.offsetTop}px, 0)`;
    hl.style.opacity = "1";
    if (first) {
      void hl.offsetHeight;
      hl.style.transition = "";
      placed.current = true;
    }
  }, [active]);

  React.useEffect(() => {
    place();
  }, [place, total]);

  React.useEffect(() => {
    const track = trackRef.current;
    const scroller = scrollRef.current;
    if (!track || !scroller || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      place();
      updateFade();
    });
    ro.observe(track);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [place, updateFade]);

  function reveal(index: number) {
    const scroller = scrollRef.current;
    const target = trackRef.current?.querySelector<HTMLElement>(`[data-idx="${index}"]`);
    if (!scroller || !target) return;
    const pad = showGradients ? FADE : 0;
    const top = target.offsetTop - pad;
    const bottom = target.offsetTop + target.offsetHeight + pad;
    if (top < scroller.scrollTop) scroller.scrollTop = Math.max(0, top);
    else if (bottom > scroller.scrollTop + scroller.clientHeight) {
      scroller.scrollTop = bottom - scroller.clientHeight;
    }
  }

  function choose(index: number) {
    setSelected(index);
    onSelect?.(index);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || total === 0) return;
    let next = active;
    if (e.key === "ArrowDown") next = active < 0 ? 0 : Math.min(total - 1, active + 1);
    else if (e.key === "ArrowUp") next = active < 0 ? total - 1 : Math.max(0, active - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else if (e.key === "Enter") {
      if (sel >= 0) {
        e.preventDefault();
        onSelect?.(sel);
      }
      return;
    } else return;
    e.preventDefault();
    setHovered(-1);
    setSelected(next);
    reveal(next);
  }

  const vars = {
    "--hb-al-max": `${Math.max(0, maxHeight)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-al ${className}`} style={vars} {...rest}>
      <style href="hb-animated-list" precedence="default">{css}</style>
      <div
        ref={scrollRef}
        className="hb-al-scroll"
        data-gradients={showGradients}
        data-top={fade.top}
        data-bottom={fade.bottom}
        onScroll={updateFade}
      >
        <div
          ref={trackRef}
          className="hb-al-track"
          role="listbox"
          tabIndex={0}
          aria-activedescendant={active >= 0 ? `${uid}-${active}` : undefined}
          onKeyDown={handleKeyDown}
          onPointerLeave={() => setHovered(-1)}
        >
          <div ref={hlRef} className="hb-al-hl" aria-hidden="true" />
          {items.map((item, i) => (
            <div
              key={i}
              id={`${uid}-${i}`}
              role="option"
              aria-selected={sel === i}
              data-idx={i}
              data-active={active === i}
              data-selected={sel === i}
              className="hb-al-item"
              style={{ "--hb-al-d": `${Math.min(i, 12) * 0.05}s` } as React.CSSProperties}
              onPointerMove={() => {
                if (hovered !== i) setHovered(i);
              }}
              onClick={() => choose(i)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

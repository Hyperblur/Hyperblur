"use client";

import * as React from "react";

export interface CursorTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  size?: number;
  padding?: number;
  thickness?: number;
  selector?: string;
  showLabel?: boolean;
  idle?: boolean;
}

const css = `
.hb-qi1 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi1 *, .hb-qi1 *::before, .hb-qi1 *::after { box-sizing: border-box; }
.hb-qi1-content { position: relative; z-index: 1; width: 100%; height: 100%; }
.hb-qi1-reticle { position: absolute; left: 0; top: 0; z-index: 2; width: 44px; height: 44px; pointer-events: none; color: rgba(237, 237, 237, 0.88); opacity: 0; transition: color 0.2s ease, opacity 0.3s ease; will-change: transform, width, height; }
.hb-qi1-reticle[data-ready="true"] { opacity: 1; }
.hb-qi1-reticle[data-locked="true"] { color: var(--hb-qi1-accent); }
.hb-qi1-corner { position: absolute; width: 10px; height: 10px; border: 0 solid currentColor; }
.hb-qi1-tl { left: 0; top: 0; border-left-width: var(--hb-qi1-t); border-top-width: var(--hb-qi1-t); border-top-left-radius: 2px; }
.hb-qi1-tr { right: 0; top: 0; border-right-width: var(--hb-qi1-t); border-top-width: var(--hb-qi1-t); border-top-right-radius: 2px; }
.hb-qi1-bl { left: 0; bottom: 0; border-left-width: var(--hb-qi1-t); border-bottom-width: var(--hb-qi1-t); border-bottom-left-radius: 2px; }
.hb-qi1-br { right: 0; bottom: 0; border-right-width: var(--hb-qi1-t); border-bottom-width: var(--hb-qi1-t); border-bottom-right-radius: 2px; }
.hb-qi1-ring { position: absolute; left: 50%; top: 50%; width: var(--hb-qi1-ring); height: var(--hb-qi1-ring); margin: calc(var(--hb-qi1-ring) / -2) 0 0 calc(var(--hb-qi1-ring) / -2); border-radius: 50%; border: 1px dashed currentColor; opacity: 0.6; animation: hb-qi1-spin 7s linear infinite; transition: opacity 0.25s ease; }
.hb-qi1-dot { position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%; background: currentColor; transition: opacity 0.2s ease; }
.hb-qi1-reticle[data-locked="true"] .hb-qi1-ring, .hb-qi1-reticle[data-locked="true"] .hb-qi1-dot { opacity: 0; }
.hb-qi1-chip { position: absolute; left: 0; top: calc(100% + 6px); white-space: nowrap; max-width: 180px; overflow: hidden; text-overflow: ellipsis; font: 500 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 6px; border-radius: 4px; background: rgba(10, 10, 10, 0.82); border: 1px solid rgba(255, 255, 255, 0.12); color: currentColor; }
.hb-qi1-reticle[data-flip="true"] .hb-qi1-chip { top: auto; bottom: calc(100% + 6px); }
@keyframes hb-qi1-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qi1-ring { animation: none; }
  .hb-qi1-reticle, .hb-qi1-ring, .hb-qi1-dot { transition: none; }
}
`;

function labelOf(el: HTMLElement) {
  const text = el.getAttribute("data-hb-label") || el.getAttribute("aria-label") || el.textContent || "";
  return text.trim().replace(/\s+/g, " ").slice(0, 24) || "Target";
}

export function CursorTarget({
  accent = "#2f7bff",
  size = 44,
  padding = 6,
  thickness = 2,
  selector = "a, button, [data-hb-target]",
  showLabel = true,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorTargetProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const reticleRef = React.useRef<HTMLDivElement>(null);
  const chipRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const reticle = reticleRef.current;
    if (!root || !content || !reticle) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = root.clientWidth;
    let h = root.clientHeight;
    let px = w / 2;
    let py = h / 2;
    let cx = w / 2;
    let cy = h / 2;
    let cw = size;
    let ch = size;
    let active = false;
    let mix = 0;
    let hoverEl: HTMLElement | null = null;
    let focusEl: HTMLElement | null = null;
    let lastLabel = "";
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;

    const toLocal = (rect: DOMRect) => {
      const r0 = root.getBoundingClientRect();
      const s = r0.width ? w / r0.width : 1;
      return {
        x: (rect.left - r0.left + rect.width / 2) * s,
        y: (rect.top - r0.top + rect.height / 2) * s,
        w: rect.width * s,
        h: rect.height * s,
      };
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      t += dt;
      w = root.clientWidth;
      h = root.clientHeight;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 5));
      const items = Array.from(content.querySelectorAll<HTMLElement>(selector));
      let lock: HTMLElement | null = focusEl ?? (active ? hoverEl : null);
      let freeX = px;
      let freeY = py;
      let show = true;
      if (!lock && !active) {
        if (idle && !reduced) {
          const slot = Math.floor(t / 2.2);
          const n = items.length;
          if (n && slot % (n + 1) < n) lock = items[slot % (n + 1)];
          const ix = w * (0.5 + 0.34 * Math.sin(t * 0.55) + 0.05 * Math.sin(t * 1.9));
          const iy = h * (0.5 + 0.3 * Math.sin(t * 0.83 + 0.7));
          freeX = ix + (px - ix) * mix;
          freeY = iy + (py - iy) * mix;
        } else if (!idle) {
          show = false;
        }
      }
      let tx = freeX;
      let ty = freeY;
      let tw = size;
      let th = size;
      if (lock) {
        const r = toLocal(lock.getBoundingClientRect());
        tx = r.x;
        ty = r.y;
        tw = r.w + padding * 2;
        th = r.h + padding * 2;
      }
      const kp = reduced ? 1 : 1 - Math.exp(-dt * 13);
      const ks = reduced ? 1 : 1 - Math.exp(-dt * 11);
      cx += (tx - cx) * kp;
      cy += (ty - cy) * kp;
      cw += (tw - cw) * ks;
      ch += (th - ch) * ks;
      reticle.style.transform = `translate3d(${(cx - cw / 2).toFixed(2)}px, ${(cy - ch / 2).toFixed(2)}px, 0)`;
      reticle.style.width = `${cw.toFixed(2)}px`;
      reticle.style.height = `${ch.toFixed(2)}px`;
      reticle.dataset.ready = show ? "true" : "false";
      reticle.dataset.locked = lock ? "true" : "false";
      reticle.dataset.flip = cy + ch / 2 + 26 > h ? "true" : "false";
      const chip = chipRef.current;
      if (chip) {
        const label = lock ? labelOf(lock) : `x ${Math.round(cx)} y ${Math.round(cy)}`;
        if (label !== lastLabel) {
          chip.textContent = label;
          lastLabel = label;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r0 = root.getBoundingClientRect();
      const s = r0.width ? w / r0.width : 1;
      px = (e.clientX - r0.left) * s;
      py = (e.clientY - r0.top) * s;
      active = true;
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>(selector) : null;
      hoverEl = target && content.contains(target) ? target : null;
    };
    const onLeave = () => {
      active = false;
      hoverEl = null;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target instanceof HTMLElement ? e.target.closest<HTMLElement>(selector) : null;
      let keyboard = false;
      try {
        keyboard = !!el && el.matches(":focus-visible");
      } catch {
        keyboard = !!el;
      }
      focusEl = el && keyboard && content.contains(el) ? el : null;
    };
    const onFocusOut = () => {
      focusEl = null;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    start();

    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [size, padding, selector, idle]);

  const vars = {
    "--hb-qi1-accent": accent,
    "--hb-qi1-t": `${thickness}px`,
    "--hb-qi1-ring": `${size + 16}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qi1 ${className}`} style={vars} {...rest}>
      <style href="hb-cursor-target" precedence="default">{css}</style>
      <div ref={contentRef} className="hb-qi1-content">{children}</div>
      <div ref={reticleRef} className="hb-qi1-reticle" aria-hidden="true">
        <span className="hb-qi1-ring" />
        <span className="hb-qi1-corner hb-qi1-tl" />
        <span className="hb-qi1-corner hb-qi1-tr" />
        <span className="hb-qi1-corner hb-qi1-bl" />
        <span className="hb-qi1-corner hb-qi1-br" />
        <span className="hb-qi1-dot" />
        {showLabel ? <span ref={chipRef} className="hb-qi1-chip" /> : null}
      </div>
    </div>
  );
}

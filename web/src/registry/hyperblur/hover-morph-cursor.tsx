"use client";

import * as React from "react";

export interface HoverMorphCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  selector?: string;
  size?: number;
  padding?: number;
  color?: string;
  blend?: boolean;
  autoPlay?: boolean;
}

const css = `
.hb-wg6 { position: relative; box-sizing: border-box; width: 100%; height: 100%; font-family: inherit; isolation: isolate; touch-action: pan-y; }
.hb-wg6 *, .hb-wg6 *::before, .hb-wg6 *::after { box-sizing: border-box; }
@media (hover: hover) and (pointer: fine) {
  .hb-wg6[data-inside="true"], .hb-wg6[data-inside="true"] * { cursor: none !important; }
}
.hb-wg6-blob { position: absolute; left: 0; top: 0; z-index: 5; pointer-events: none; width: 1px; height: 1px; background: var(--hb-wg6-color, #ededed); opacity: 0; transform-origin: 0 0; will-change: transform, width, height, border-radius; transition: opacity .35s ease; }
.hb-wg6[data-blend="true"] .hb-wg6-blob { mix-blend-mode: difference; }
.hb-wg6[data-show="true"] .hb-wg6-blob { opacity: 1; }
.hb-wg6-blob::after { content: ""; position: absolute; inset: -6px; border-radius: inherit; border: 1px solid var(--hb-wg6-color, #ededed); opacity: 0; transform: scale(.9); transition: opacity .3s ease, transform .45s cubic-bezier(.2,.9,.25,1); }
.hb-wg6[data-locked="true"] .hb-wg6-blob::after { opacity: .28; transform: none; }
.hb-wg6-default { display: flex; height: 100%; align-items: center; justify-content: center; padding: 16px; }
.hb-wg6-bar { display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 14px; background: #111; box-shadow: 0 0 0 1px #262626, inset 0 1px 0 rgba(255,255,255,.04), 0 14px 30px -18px rgba(0,0,0,.9); color: #ededed; }
.hb-wg6-icon, .hb-wg6-pill, .hb-wg6-seg { appearance: none; border: 0; background: none; color: inherit; font: inherit; margin: 0; display: inline-grid; place-items: center; outline: none; }
.hb-wg6-icon { width: 32px; height: 32px; border-radius: 50%; color: #a1a1a1; }
.hb-wg6-icon svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-wg6-sep { width: 1px; height: 20px; background: #262626; margin: 0 4px; }
.hb-wg6-seg { height: 32px; padding: 0 11px; border-radius: 8px; font-size: 12px; color: #a1a1a1; }
.hb-wg6-pill { height: 32px; padding: 0 14px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #ededed; color: #0a0a0a; margin-left: 4px; }
.hb-wg6-icon:focus-visible, .hb-wg6-seg:focus-visible, .hb-wg6-pill:focus-visible { box-shadow: 0 0 0 2px #2f7bff; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg6-blob { display: none; }
  .hb-wg6[data-inside="true"], .hb-wg6[data-inside="true"] * { cursor: auto !important; }
}
`;

function DefaultBar() {
  const path = (d: string) => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
  return (
    <div className="hb-wg6-default">
      <div className="hb-wg6-bar" role="toolbar" aria-label="Editor">
        <button type="button" className="hb-wg6-icon" aria-label="Undo">{path("M9 7L4.5 11.5 9 16M5 11.5h9a5 5 0 0 1 0 10h-2")}</button>
        <button type="button" className="hb-wg6-icon" aria-label="Comment">{path("M5 6h14v9h-8l-4 3.5V15H5z")}</button>
        <span className="hb-wg6-sep" aria-hidden="true" />
        <button type="button" className="hb-wg6-seg">Design</button>
        <button type="button" className="hb-wg6-seg">Prototype</button>
        <button type="button" className="hb-wg6-pill">Share</button>
      </div>
    </div>
  );
}

export function HoverMorphCursor({
  selector = "button, a, [data-morph]",
  size = 14,
  padding = 0,
  color = "#ededed",
  blend = true,
  autoPlay = true,
  className = "",
  style,
  children,
  ...rest
}: HoverMorphCursorProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const blobRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const blob = blobRef.current;
    if (!root || !blob) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cur = { x: root.offsetWidth / 2, y: root.offsetHeight / 2, w: size, h: size, r: size / 2 };
    const vel = { x: 0, y: 0, w: 0, h: 0, r: 0 };
    let px = cur.x;
    let py = cur.y;
    let inside = false;
    let target: HTMLElement | null = null;
    let autoIdx = 0;
    let autoT = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let pressed = 0;
    let lastPx = px;
    let lastPy = py;

    const scale = () => {
      const r = root.getBoundingClientRect();
      return { r, s: r.width ? root.offsetWidth / r.width : 1 };
    };
    const rectOf = (el: HTMLElement) => {
      const { r, s } = scale();
      const b = el.getBoundingClientRect();
      const rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 6;
      return {
        x: (b.left - r.left) * s - padding,
        y: (b.top - r.top) * s - padding,
        w: b.width * s + padding * 2,
        h: b.height * s + padding * 2,
        r: Math.min(rad + padding, (b.height * s + padding * 2) / 2),
      };
    };
    const targets = () =>
      (Array.from(root.querySelectorAll(selector)) as HTMLElement[]).filter((el) => !blob.contains(el) && el.offsetParent !== null);

    const spring = (key: keyof typeof cur, goal: number, dt: number, k: number, d: number) => {
      const a = (goal - cur[key]) * k - vel[key] * d;
      vel[key] += a * dt;
      cur[key] += vel[key] * dt;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      let goal: { x: number; y: number; w: number; h: number; r: number };
      let el: HTMLElement | null = inside ? target : null;
      if (!inside && autoPlay) {
        autoT += dt;
        const list = targets();
        if (autoT > 1.35 && list.length) {
          autoT = 0;
          autoIdx = (autoIdx + 1) % list.length;
        }
        el = list[autoIdx % Math.max(1, list.length)] ?? null;
      }
      if (el) {
        goal = rectOf(el);
        root.dataset.locked = "true";
      } else {
        const sz = size * (1 - pressed * 0.35);
        goal = { x: px - sz / 2, y: py - sz / 2, w: sz, h: sz, r: sz / 2 };
        root.dataset.locked = "false";
      }
      pressed *= Math.exp(-dt * 8);
      const k = el ? 420 : 900;
      const d = el ? 30 : 46;
      spring("x", goal.x, dt, k, d);
      spring("y", goal.y, dt, k, d);
      spring("w", goal.w, dt, k * 0.8, d);
      spring("h", goal.h, dt, k * 0.8, d);
      spring("r", goal.r, dt, k, d);
      const speed = Math.hypot(vel.x, vel.y);
      const stretch = Math.min(0.45, speed / 2600);
      const ang = Math.atan2(vel.y, vel.x);
      const w = Math.max(2, cur.w);
      const h = Math.max(2, cur.h);
      blob.style.width = `${w.toFixed(1)}px`;
      blob.style.height = `${h.toFixed(1)}px`;
      blob.style.borderRadius = `${Math.max(0, Math.min(cur.r, h / 2, w / 2)).toFixed(1)}px`;
      const cx = cur.x + w / 2;
      const cy = cur.y + h / 2;
      blob.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) rotate(${ang.toFixed(3)}rad) scale(${(1 + stretch).toFixed(3)}, ${(1 - stretch * 0.6).toFixed(3)}) rotate(${(-ang).toFixed(3)}rad) translate(${(-w / 2).toFixed(1)}px, ${(-h / 2).toFixed(1)}px)`;
      lastPx = px;
      lastPy = py;
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
    const pick = (node: EventTarget | null) => {
      const elNode = node instanceof Element ? node.closest(selector) : null;
      return elNode instanceof HTMLElement && root.contains(elNode) ? elNode : null;
    };
    const onMove = (e: PointerEvent) => {
      const { r, s } = scale();
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      if (!inside && Math.hypot(px - lastPx, py - lastPy) > 200 && !target) {
        cur.x = px - size / 2;
        cur.y = py - size / 2;
      }
      inside = true;
      target = pick(e.target);
      root.dataset.inside = e.pointerType === "mouse" ? "true" : "false";
      root.dataset.show = "true";
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pressed = 1;
    };
    const onLeave = () => {
      inside = false;
      target = null;
      root.dataset.inside = "false";
      root.dataset.show = autoPlay ? "true" : "false";
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 1500);
    };
    const onFocusIn = (e: FocusEvent) => {
      const el = pick(e.target);
      if (!el) return;
      inside = true;
      target = el;
      root.dataset.show = "true";
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) onLeave();
    };
    root.dataset.show = autoPlay ? "true" : "false";
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerleave", onLeave);
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
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [selector, size, padding, autoPlay]);

  return (
    <div
      ref={rootRef}
      className={`hb-wg6 ${className}`}
      style={{ "--hb-wg6-color": color, ...style } as React.CSSProperties}
      data-blend={blend ? "true" : "false"}
      data-inside="false"
      data-show="false"
      data-locked="false"
      {...rest}
    >
      <style href="hb-hover-morph-cursor" precedence="default">{css}</style>
      {children ?? <DefaultBar />}
      <span ref={blobRef} className="hb-wg6-blob" aria-hidden="true" />
    </div>
  );
}

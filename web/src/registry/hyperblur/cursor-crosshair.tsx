"use client";

import * as React from "react";

export interface CursorCrosshairProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  snap?: number;
  showGrid?: boolean;
  showReadout?: boolean;
  idle?: boolean;
}

const css = `
.hb-qi9 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; --hb-qi9-color: #2f7bff; --hb-qi9-snap: 20px; }
.hb-qi9 *, .hb-qi9 *::before, .hb-qi9 *::after { box-sizing: border-box; }
.hb-qi9-grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px); background-size: var(--hb-qi9-snap) var(--hb-qi9-snap); }
.hb-qi9-content { position: relative; z-index: 1; width: 100%; height: 100%; }
.hb-qi9-layer { position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0; transition: opacity 0.3s ease; }
.hb-qi9-layer[data-on="true"] { opacity: 1; }
.hb-qi9-h { position: absolute; left: 0; right: 0; top: 0; height: 1px; background-image: repeating-linear-gradient(to right, var(--hb-qi9-color) 0 4px, transparent 4px 8px); opacity: 0.7; will-change: transform; }
.hb-qi9-v { position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background-image: repeating-linear-gradient(to bottom, var(--hb-qi9-color) 0 4px, transparent 4px 8px); opacity: 0.7; will-change: transform; }
.hb-qi9-dot { position: absolute; left: 0; top: 0; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #0a0a0a; border: 2px solid var(--hb-qi9-color); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qi9-color) 22%, transparent); transition: transform 0.14s cubic-bezier(.2,.8,.2,1); }
.hb-qi9-chip { position: absolute; left: 0; top: 0; white-space: nowrap; font: 500 10px/1 var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); letter-spacing: 0.04em; font-variant-numeric: tabular-nums; color: #ededed; padding: 4px 6px; border-radius: 4px; background: color-mix(in srgb, var(--hb-qi9-color) 88%, #000); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45); }
.hb-qi9-chip-x { top: 6px; }
.hb-qi9-chip-y { left: 6px; }
.hb-qi9-chip-xy { background: rgba(10, 10, 10, 0.86); border: 1px solid rgba(255, 255, 255, 0.12); color: #a1a1a1; transition: transform 0.14s cubic-bezier(.2,.8,.2,1); }
@media (prefers-reduced-motion: reduce) {
  .hb-qi9-dot, .hb-qi9-chip-xy, .hb-qi9-layer { transition: none; }
}
`;

const pad3 = (n: number) => String(Math.max(0, Math.round(n))).padStart(3, "0");

export function CursorCrosshair({
  color = "#2f7bff",
  snap = 20,
  showGrid = true,
  showReadout = true,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorCrosshairProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const layerRef = React.useRef<HTMLDivElement>(null);
  const hRef = React.useRef<HTMLSpanElement>(null);
  const vRef = React.useRef<HTMLSpanElement>(null);
  const dotRef = React.useRef<HTMLSpanElement>(null);
  const xRef = React.useRef<HTMLSpanElement>(null);
  const yRef = React.useRef<HTMLSpanElement>(null);
  const xyRef = React.useRef<HTMLSpanElement>(null);
  const grid = Math.max(1, snap);

  React.useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    const hl = hRef.current;
    const vl = vRef.current;
    const dot = dotRef.current;
    if (!root || !layer || !hl || !vl || !dot) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = root.clientWidth;
    let h = root.clientHeight;
    let px = w / 2;
    let py = h / 2;
    let cx = w / 2;
    let cy = h / 2;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let lastText = "";
    let lastSnap = "";

    const render = () => {
      const sxv = Math.min(w, Math.max(0, Math.round(cx / grid) * grid));
      const syv = Math.min(h, Math.max(0, Math.round(cy / grid) * grid));
      hl.style.transform = `translate3d(0, ${cy.toFixed(1)}px, 0)`;
      vl.style.transform = `translate3d(${cx.toFixed(1)}px, 0, 0)`;
      const key = `${sxv},${syv}`;
      if (key !== lastSnap) {
        lastSnap = key;
        dot.style.transform = `translate3d(${sxv}px, ${syv}px, 0)`;
        const xy = xyRef.current;
        if (xy) {
          const right = sxv + 92 > w;
          const below = syv - 26 < 0;
          xy.style.transform = `translate3d(${(right ? sxv - 10 : sxv + 10).toFixed(0)}px, ${(below ? syv + 10 : syv - 26).toFixed(0)}px, 0) translateX(${right ? "-100%" : "0"})`;
          xy.textContent = `${pad3(sxv)}, ${pad3(syv)}`;
        }
      }
      const xc = xRef.current;
      const yc = yRef.current;
      if (xc) xc.style.transform = `translate3d(${Math.min(w - 30, Math.max(30, cx)).toFixed(1)}px, 0, 0) translateX(-50%)`;
      if (yc) yc.style.transform = `translate3d(0, ${Math.min(h - 16, Math.max(36, cy)).toFixed(1)}px, 0) translateY(-50%)`;
      const text = `${Math.round(cx)}|${Math.round(cy)}`;
      if (text !== lastText) {
        lastText = text;
        if (xc) xc.textContent = `X ${pad3(cx)}`;
        if (yc) yc.textContent = `Y ${pad3(cy)}`;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      t += dt;
      w = root.clientWidth;
      h = root.clientHeight;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 4));
      const ix = idle ? w * (0.5 + 0.3 * Math.sin(t * 0.38) + 0.06 * Math.sin(t * 1.21)) : px;
      const iy = idle ? h * (0.5 + 0.26 * Math.sin(t * 0.59 + 0.9)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      const k = 1 - Math.exp(-dt * 16);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      layer.dataset.on = idle || active ? "true" : "false";
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      w = root.clientWidth;
      h = root.clientHeight;
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      active = true;
      if (reduced) {
        cx = px;
        cy = py;
        layer.dataset.on = "true";
        render();
      }
    };
    const onLeave = () => {
      active = false;
      if (reduced && !idle) layer.dataset.on = "false";
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };

    if (reduced) {
      cx = w * 0.62;
      cy = h * 0.4;
      layer.dataset.on = idle ? "true" : "false";
      render();
    }
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("pointerup", onUp);
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
    };
  }, [grid, idle, showReadout]);

  const vars = {
    "--hb-qi9-color": color,
    "--hb-qi9-snap": `${grid}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qi9 ${className}`} style={vars} {...rest}>
      <style href="hb-cursor-crosshair" precedence="default">{css}</style>
      {showGrid ? <div className="hb-qi9-grid" aria-hidden="true" /> : null}
      <div className="hb-qi9-content">{children}</div>
      <div ref={layerRef} className="hb-qi9-layer" aria-hidden="true">
        <span ref={hRef} className="hb-qi9-h" />
        <span ref={vRef} className="hb-qi9-v" />
        <span ref={dotRef} className="hb-qi9-dot" />
        {showReadout ? (
          <>
            <span ref={xRef} className="hb-qi9-chip hb-qi9-chip-x" />
            <span ref={yRef} className="hb-qi9-chip hb-qi9-chip-y" />
            <span ref={xyRef} className="hb-qi9-chip hb-qi9-chip-xy" />
          </>
        ) : null}
      </div>
    </div>
  );
}

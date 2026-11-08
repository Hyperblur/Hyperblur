"use client";

import * as React from "react";

export interface TransitionSharedMorphProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  easing?: string;
}

const css = `
.hb-vj4 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-vj4 *, .hb-vj4 *::before, .hb-vj4 *::after { box-sizing: border-box; }
.hb-vj4-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px) scale(0.985);
  filter: blur(4px);
  transition:
    opacity calc(var(--hb-vj4-d) * 0.4) cubic-bezier(0.4, 0, 1, 1),
    transform calc(var(--hb-vj4-d) * 0.4) cubic-bezier(0.4, 0, 1, 1),
    filter calc(var(--hb-vj4-d) * 0.4) ease,
    visibility 0s linear calc(var(--hb-vj4-d) * 0.4);
}
.hb-vj4-l[data-on="true"] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition:
    opacity calc(var(--hb-vj4-d) * 0.6) cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hb-vj4-d) * 0.3),
    transform calc(var(--hb-vj4-d) * 0.7) cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hb-vj4-d) * 0.25),
    filter calc(var(--hb-vj4-d) * 0.6) ease calc(var(--hb-vj4-d) * 0.3),
    visibility 0s linear 0s;
}
.hb-vj4-fx {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}
.hb-vj4-fx > * {
  position: absolute;
  margin: 0;
  transform-origin: 0 0;
  will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj4-l, .hb-vj4-l[data-on="true"] { transition: none; }
}
`;

function useSwap(
  active: boolean | undefined,
  defaultActive: boolean,
  onActiveChange: ((active: boolean) => void) | undefined,
  autoPlay: boolean,
  interval: number,
) {
  const [inner, setInner] = React.useState(defaultActive);
  const controlled = active !== undefined;
  const value = controlled ? active : inner;
  const set = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInner(next);
      onActiveChange?.(next);
    },
    [controlled, onActiveChange],
  );
  React.useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => set(!value), interval);
    return () => window.clearTimeout(id);
  }, [autoPlay, interval, value, set]);
  return value;
}

function DefaultRow() {
  return (
    <div style={{ display: "grid", alignContent: "center", padding: 16, minHeight: 180, background: "#0f0f10", color: "#ededed" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 12, background: "#161618", border: "1px solid #262626" }}>
        <div data-morph="cover" style={{ width: 44, height: 44, borderRadius: 8, background: "linear-gradient(135deg, #ff8a3d, #c2185b)" }} />
        <div style={{ display: "grid", gap: 2 }}>
          <strong data-morph="title" style={{ fontSize: 14, fontWeight: 600 }}>Low Tide</strong>
          <span style={{ fontSize: 12, color: "#8f8f8f" }}>Harbor Lights</span>
        </div>
      </div>
    </div>
  );
}

function DefaultDetail() {
  return (
    <div style={{ display: "grid", justifyItems: "center", alignContent: "center", gap: 10, padding: 16, minHeight: 180, background: "#0f0f10", color: "#ededed" }}>
      <div data-morph="cover" style={{ width: 104, height: 104, borderRadius: 18, background: "linear-gradient(135deg, #ff8a3d, #c2185b)" }} />
      <strong data-morph="title" style={{ fontSize: 18, fontWeight: 600 }}>Low Tide</strong>
    </div>
  );
}

type Box = { x: number; y: number; w: number; h: number };

export function TransitionSharedMorph({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 760,
  easing = "cubic-bezier(0.32, 0.72, 0, 1)",
  className,
  style,
  ...rest
}: TransitionSharedMorphProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const fromRef = React.useRef<HTMLDivElement>(null);
  const toRef = React.useRef<HTMLDivElement>(null);
  const fxRef = React.useRef<HTMLDivElement>(null);
  const prevRef = React.useRef<boolean | null>(null);
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <DefaultRow />;
  const b = to ?? kids[1] ?? <DefaultDetail />;

  React.useLayoutEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = value;
      return;
    }
    if (prevRef.current === value) return;
    prevRef.current = value;
    const root = rootRef.current;
    const fx = fxRef.current;
    const outgoing = value ? fromRef.current : toRef.current;
    const incoming = value ? toRef.current : fromRef.current;
    if (!root || !fx || !outgoing || !incoming) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = (el: Element, layer: HTMLElement): Box => {
      const lr = layer.getBoundingClientRect();
      const s = layer.offsetWidth > 0 ? lr.width / layer.offsetWidth : 1;
      const r = el.getBoundingClientRect();
      return {
        x: (r.left - lr.left) / s + layer.offsetLeft,
        y: (r.top - lr.top) / s + layer.offsetTop,
        w: r.width / s,
        h: r.height / s,
      };
    };
    const animations: Animation[] = [];
    const clones: HTMLElement[] = [];
    const targets = incoming.querySelectorAll<HTMLElement>("[data-morph]");
    targets.forEach((target) => {
      const id = target.getAttribute("data-morph");
      if (!id) return;
      const source = Array.from(outgoing.querySelectorAll<HTMLElement>("[data-morph]")).find((el) => el.getAttribute("data-morph") === id);
      if (!source) return;
      const A = box(source, outgoing);
      const B = box(target, incoming);
      if (A.w === 0 || B.w === 0 || A.h === 0 || B.h === 0) return;
      const radiusA = getComputedStyle(source).borderRadius;
      const radiusB = getComputedStyle(target).borderRadius;
      const make = (el: HTMLElement, at: Box) => {
        const c = el.cloneNode(true) as HTMLElement;
        c.removeAttribute("data-morph");
        c.removeAttribute("id");
        c.style.left = `${at.x}px`;
        c.style.top = `${at.y}px`;
        c.style.width = `${at.w}px`;
        c.style.height = `${at.h}px`;
        fx.appendChild(c);
        clones.push(c);
        return c;
      };
      const out = make(source, A);
      const inn = make(target, B);
      const toB = `translate(${(B.x - A.x).toFixed(2)}px, ${(B.y - A.y).toFixed(2)}px) scale(${(B.w / A.w).toFixed(4)}, ${(B.h / A.h).toFixed(4)})`;
      const fromA = `translate(${(A.x - B.x).toFixed(2)}px, ${(A.y - B.y).toFixed(2)}px) scale(${(A.w / B.w).toFixed(4)}, ${(A.h / B.h).toFixed(4)})`;
      const opts: KeyframeAnimationOptions = { duration, easing, fill: "both" };
      animations.push(
        out.animate(
          [
            { transform: "none", opacity: 1, borderRadius: radiusA },
            { transform: toB, opacity: 0, borderRadius: radiusA },
          ],
          opts,
        ),
      );
      animations.push(
        inn.animate(
          [
            { transform: fromA, opacity: 0, borderRadius: radiusB },
            { transform: fromA, opacity: 0.4, offset: 0.12, borderRadius: radiusB },
            { transform: "none", opacity: 1, borderRadius: radiusB },
          ],
          opts,
        ),
      );
      [source, target].forEach((el) => {
        animations.push(el.animate([{ visibility: "hidden" }, { visibility: "hidden" }], { duration, fill: "none" }));
      });
    });
    let done = 0;
    const finish = () => {
      done += 1;
      if (done < animations.length) return;
      clones.forEach((c) => c.remove());
    };
    animations.forEach((anim) => {
      anim.onfinish = finish;
    });
    return () => {
      animations.forEach((anim) => anim.cancel());
      clones.forEach((c) => c.remove());
    };
  }, [value, duration, easing]);

  return (
    <div
      ref={rootRef}
      className={["hb-vj4", className].filter(Boolean).join(" ")}
      style={{ "--hb-vj4-d": `${duration}ms`, ...style } as React.CSSProperties}
      data-active={value}
      {...rest}
    >
      <style href="hb-transition-shared-morph" precedence="default">{css}</style>
      <div ref={fromRef} className="hb-vj4-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div ref={toRef} className="hb-vj4-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      <div ref={fxRef} className="hb-vj4-fx" aria-hidden="true" />
    </div>
  );
}

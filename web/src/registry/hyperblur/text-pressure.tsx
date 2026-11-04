"use client";

import * as React from "react";

export interface TextPressureProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  minWeight?: number;
  maxWeight?: number;
  maxScale?: number;
  radius?: number;
  breathe?: boolean;
  align?: "left" | "center" | "right";
}

const css = `
.hb-qd1 {
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.25em 0.15em;
  line-height: 1.05;
  text-align: var(--hb-qd1-align);
  touch-action: pan-y;
  cursor: default;
  font-family: inherit;
}
.hb-qd1 *, .hb-qd1 *::before, .hb-qd1 *::after { box-sizing: border-box; }
.hb-qd1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.hb-qd1-w { display: inline-block; white-space: nowrap; }
.hb-qd1-l {
  display: inline-block;
  font-weight: var(--hb-qd1-mid);
  transform-origin: 50% 72%;
  will-change: transform, font-weight;
}
`;

function tokenize(text: string) {
  let n = 0;
  return text
    .split(/(\s+)/)
    .filter((t) => t !== "")
    .map((value) => {
      if (/^\s+$/.test(value)) return { space: true, letters: [] as { ch: string; n: number }[], value };
      return { space: false, value, letters: Array.from(value).map((ch) => ({ ch, n: n++ })) };
    });
}

export function TextPressure({
  text,
  minWeight = 300,
  maxWeight = 900,
  maxScale = 1.18,
  radius = 150,
  breathe = true,
  align = "center",
  className = "",
  style,
  ...rest
}: TextPressureProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const tokens = React.useMemo(() => tokenize(text), [text]);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    if (letters.length === 0) return;
    const mid = Math.round((minWeight + maxWeight) / 2);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const l of letters) l.style.fontWeight = String(mid);
      return;
    }

    const pointer = { x: 0, y: 0, inside: false };
    const sigma = Math.max(20, radius) / 2.2;
    const span = maxWeight - minWeight;
    const start = performance.now();
    let blend = 0;
    let visible = true;
    let raf = 0;

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const box = root.getBoundingClientRect();
      const t = (now - start) / 1000;
      blend += ((pointer.inside ? 1 : 0) - blend) * 0.12;
      const ix = box.left + box.width * (0.5 + 0.44 * Math.sin(t * 0.85));
      const iy = box.top + box.height * 0.5;
      const px = ix + (pointer.x - ix) * blend;
      const py = iy + (pointer.y - iy) * blend;
      const rects = letters.map((l) => l.getBoundingClientRect());
      for (let i = 0; i < letters.length; i++) {
        const r = rects[i];
        const dx = r.left + r.width / 2 - px;
        const dy = (r.top + r.height / 2 - py) * 0.7;
        const f = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        const wave = breathe ? 0.1 + 0.1 * Math.sin(t * 1.7 - i * 0.55) : 0;
        const k = Math.min(1, f + wave * (1 - 0.6 * blend));
        const el = letters[i];
        el.style.fontWeight = (minWeight + span * k).toFixed(1);
        el.style.transform = `scale(${(1 + (maxScale - 1) * k).toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const leave = () => {
      pointer.inside = false;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(root);
    root.addEventListener("pointerenter", move);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", move);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
    };
  }, [tokens, minWeight, maxWeight, maxScale, radius, breathe]);

  const vars = {
    "--hb-qd1-align": align,
    "--hb-qd1-mid": Math.round((minWeight + maxWeight) / 2),
    ...style,
  } as React.CSSProperties;

  return (
    <span ref={ref} className={`hb-qd1 ${className}`} style={vars} {...rest}>
      <style href="hb-text-pressure" precedence="default">{css}</style>
      <span className="hb-qd1-sr">{text}</span>
      <span aria-hidden="true">
        {tokens.map((tok, i) =>
          tok.space ? (
            " "
          ) : (
            <span key={i} className="hb-qd1-w">
              {tok.letters.map((l) => (
                <span key={l.n} className="hb-qd1-l" data-l="">
                  {l.ch}
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

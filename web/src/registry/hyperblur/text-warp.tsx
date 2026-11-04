"use client";

import * as React from "react";

export interface TextWarpProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  radius?: number;
  strength?: number;
  magnify?: number;
  twist?: number;
  mode?: "push" | "pull";
  align?: "left" | "center" | "right";
}

const css = `
.hb-qd3 {
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3em 0.2em;
  line-height: 1.1;
  text-align: var(--hb-qd3-align);
  touch-action: pan-y;
  cursor: default;
  font-family: inherit;
}
.hb-qd3 *, .hb-qd3 *::before, .hb-qd3 *::after { box-sizing: border-box; }
.hb-qd3-sr {
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
.hb-qd3-w { display: inline-block; white-space: nowrap; }
.hb-qd3-l { display: inline-block; will-change: transform; transform-origin: 50% 60%; }
`;

function tokenize(text: string) {
  let n = 0;
  return text
    .split(/(\s+)/)
    .filter((t) => t !== "")
    .map((value) => {
      if (/^\s+$/.test(value)) return { space: true, letters: [] as { ch: string; n: number }[] };
      return { space: false, letters: Array.from(value).map((ch) => ({ ch, n: n++ })) };
    });
}

export function TextWarp({
  text,
  radius = 130,
  strength = 26,
  magnify = 0.55,
  twist = 16,
  mode = "push",
  align = "center",
  className = "",
  style,
  ...rest
}: TextWarpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const tokens = React.useMemo(() => tokenize(text), [text]);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    if (letters.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rel = letters.map(() => ({ x: 0, y: 0 }));
    const dirty = letters.map(() => false);
    const pointer = { x: 0, y: 0, inside: false };
    const sigma = Math.max(20, radius) / 2;
    const sign = mode === "pull" ? -1 : 1;
    const start = performance.now();
    let blend = 0;
    let visible = true;
    let raf = 0;

    const measure = () => {
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        const parent = l.offsetParent as HTMLElement | null;
        const ox = parent && parent !== root ? parent.offsetLeft : 0;
        const oy = parent && parent !== root ? parent.offsetTop : 0;
        rel[i].x = ox + l.offsetLeft + l.offsetWidth / 2;
        rel[i].y = oy + l.offsetTop + l.offsetHeight / 2;
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const box = root.getBoundingClientRect();
      const t = (now - start) / 1000;
      blend += ((pointer.inside ? 1 : 0) - blend) * 0.14;
      const ix = box.left + box.width * (0.5 + 0.42 * Math.sin(t * 0.8));
      const iy = box.top + box.height * (0.5 + 0.34 * Math.sin(t * 1.35 + 1));
      const px = ix + (pointer.x - ix) * blend;
      const py = iy + (pointer.y - iy) * blend;
      for (let i = 0; i < letters.length; i++) {
        const dx = box.left + rel[i].x - px;
        const dy = box.top + rel[i].y - py;
        const d = Math.hypot(dx, dy);
        const f = Math.exp(-(d * d) / (2 * sigma * sigma));
        const el = letters[i];
        if (f < 0.002) {
          if (dirty[i]) {
            dirty[i] = false;
            el.style.transform = "";
          }
          continue;
        }
        dirty[i] = true;
        const ux = d > 0.5 ? dx / d : 0;
        const uy = d > 0.5 ? dy / d : 0;
        const m = strength * f * sign;
        const rot = twist * f * Math.max(-1, Math.min(1, dx / radius));
        const scale = 1 + magnify * f;
        el.style.transform = `translate3d(${(ux * m).toFixed(2)}px, ${(uy * m).toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
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
    const ro = new ResizeObserver(measure);
    measure();
    ro.observe(root);
    io.observe(root);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    root.addEventListener("pointerenter", move);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      root.removeEventListener("pointerenter", move);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      for (const l of letters) l.style.transform = "";
    };
  }, [tokens, radius, strength, magnify, twist, mode]);

  const vars = { "--hb-qd3-align": align, ...style } as React.CSSProperties;

  return (
    <span ref={ref} className={`hb-qd3 ${className}`} style={vars} {...rest}>
      <style href="hb-text-warp" precedence="default">{css}</style>
      <span className="hb-qd3-sr">{text}</span>
      <span aria-hidden="true">
        {tokens.map((tok, i) =>
          tok.space ? (
            " "
          ) : (
            <span key={i} className="hb-qd3-w">
              {tok.letters.map((l) => (
                <span key={l.n} className="hb-qd3-l" data-l="">
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

"use client";

import * as React from "react";

export interface TextScrambleHoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  radius?: number;
  glyphs?: string;
  accent?: string;
  resolveTime?: number;
  align?: "left" | "center" | "right";
}

const css = `
.hb-qd2 {
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.25em 0.15em;
  line-height: 1.2;
  text-align: var(--hb-qd2-align);
  touch-action: pan-y;
  cursor: default;
  font-family: inherit;
}
.hb-qd2 *, .hb-qd2 *::before, .hb-qd2 *::after { box-sizing: border-box; }
.hb-qd2-sr {
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
.hb-qd2-w { display: inline-block; white-space: nowrap; }
.hb-qd2-c { position: relative; display: inline-block; }
.hb-qd2-o {
  position: absolute;
  top: 0;
  left: -1em;
  right: -1em;
  text-align: center;
  color: var(--hb-qd2-accent);
  opacity: 0;
  pointer-events: none;
}
.hb-qd2-c[data-s] .hb-qd2-g { opacity: 0; }
.hb-qd2-c[data-s] .hb-qd2-o { opacity: 1; }
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

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

export function TextScrambleHover({
  text,
  radius = 90,
  glyphs = "!<>-_/[]{}=+*^?#%&$01",
  accent = "#7fb3ff",
  resolveTime = 0.35,
  align = "center",
  className = "",
  style,
  ...rest
}: TextScrambleHoverProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const tokens = React.useMemo(() => tokenize(text), [text]);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cells = Array.from(root.querySelectorAll<HTMLElement>("[data-c]"));
    if (cells.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pool = Array.from(glyphs);
    if (pool.length === 0) return;

    const overlays = cells.map((c) => c.querySelector<HTMLElement>("[data-o]"));
    const rel = cells.map(() => ({ x: 0, y: 0 }));
    const until = cells.map(() => 0);
    const lastStep = cells.map(() => -1);
    const live = cells.map(() => false);
    const pointer = { x: 0, y: 0, inside: false };
    const start = performance.now();
    const resolveMs = Math.max(0, resolveTime) * 1000;
    let blend = 0;
    let visible = true;
    let raf = 0;

    const measure = () => {
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const parent = c.offsetParent as HTMLElement | null;
        const ox = parent && parent !== root ? parent.offsetLeft : 0;
        const oy = parent && parent !== root ? parent.offsetTop : 0;
        rel[i].x = ox + c.offsetLeft + c.offsetWidth / 2;
        rel[i].y = oy + c.offsetTop + c.offsetHeight / 2;
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const box = root.getBoundingClientRect();
      const t = (now - start) / 1000;
      blend += ((pointer.inside ? 1 : 0) - blend) * 0.2;
      const ix = box.left + box.width * (0.5 + 0.48 * Math.sin(t * 0.7));
      const iy = box.top + box.height * 0.5;
      const px = ix + (pointer.x - ix) * blend;
      const py = iy + (pointer.y - iy) * blend;
      const step = Math.floor(now / 55);
      for (let i = 0; i < cells.length; i++) {
        const dx = box.left + rel[i].x - px;
        const dy = (box.top + rel[i].y - py) * 0.6;
        const jitter = (mix(i * 31 + 7) % 1000) / 1000;
        if (dx * dx + dy * dy < radius * radius) {
          until[i] = Math.max(until[i], now + 120 + jitter * resolveMs);
        }
        const on = now < until[i];
        const cell = cells[i];
        if (on) {
          if (!live[i]) {
            live[i] = true;
            cell.setAttribute("data-s", "");
          }
          if (step !== lastStep[i]) {
            lastStep[i] = step;
            const o = overlays[i];
            if (o) o.textContent = pool[mix(i * 977 + step * 31) % pool.length];
          }
        } else if (live[i]) {
          live[i] = false;
          cell.removeAttribute("data-s");
        }
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
      for (const c of cells) c.removeAttribute("data-s");
    };
  }, [tokens, radius, glyphs, resolveTime]);

  const vars = {
    "--hb-qd2-align": align,
    "--hb-qd2-accent": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <span ref={ref} className={`hb-qd2 ${className}`} style={vars} {...rest}>
      <style href="hb-text-scramble-hover" precedence="default">{css}</style>
      <span className="hb-qd2-sr">{text}</span>
      <span aria-hidden="true">
        {tokens.map((tok, i) =>
          tok.space ? (
            " "
          ) : (
            <span key={i} className="hb-qd2-w">
              {tok.letters.map((l) => (
                <span key={l.n} className="hb-qd2-c" data-c="">
                  <span className="hb-qd2-g">{l.ch}</span>
                  <span className="hb-qd2-o" data-o="" />
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

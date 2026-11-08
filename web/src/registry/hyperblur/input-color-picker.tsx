"use client";

import * as React from "react";

export interface InputColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  swatches?: string[];
  alpha?: boolean;
  contrastWith?: string;
}

type Hsv = { h: number; s: number; v: number; a: number };
type Rgb = { r: number; g: number; b: number };

const css = `
.hb-xg8 {
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  container-type: inline-size;
}
.hb-xg8 *, .hb-xg8 *::before, .hb-xg8 *::after { box-sizing: border-box; }
.hb-xg8-label { display: flex; align-items: center; justify-content: space-between; margin: 0 0 8px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg8-grid { display: grid; gap: 10px; }
@container (min-width: 300px) { .hb-xg8-grid { grid-template-columns: minmax(120px, 46%) minmax(0, 1fr); } }
.hb-xg8-sv {
  position: relative;
  min-height: 120px;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  background:
    linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    hsl(var(--hb-xg8-h), 100%, 50%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 20px -12px rgba(0, 0, 0, 0.9);
  cursor: crosshair;
  touch-action: none;
  outline: 0;
}
@container (min-width: 300px) { .hb-xg8-sv { aspect-ratio: auto; height: 100%; } }
.hb-xg8-sv:focus-visible { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 0 2px #0a0a0a, 0 0 0 4px #ededed; }
.hb-xg8-thumb {
  position: absolute;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 2.5px solid #fff;
  border-radius: 50%;
  background: var(--hb-xg8-solid);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35), 0 4px 10px rgba(0, 0, 0, 0.45);
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg8[data-drag="sv"] .hb-xg8-sv .hb-xg8-thumb { transform: scale(1.35); }
.hb-xg8-side { display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.hb-xg8-row { display: flex; align-items: center; gap: 8px; }
.hb-xg8-swatch {
  position: relative;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 10px;
  overflow: hidden;
  background: repeating-conic-gradient(#2a2a2a 0 25%, #1a1a1a 0 50%) 0 0 / 8px 8px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.hb-xg8-swatch span { position: absolute; top: 0; bottom: 0; }
.hb-xg8-swatch span:first-child { left: 0; width: 50%; }
.hb-xg8-swatch span:last-child { right: 0; width: 50%; transition: background 0.12s ease; }
.hb-xg8-sliders { display: flex; flex: 1; flex-direction: column; gap: 8px; min-width: 0; }
.hb-xg8-track {
  position: relative;
  height: 12px;
  border-radius: 999px;
  cursor: pointer;
  touch-action: none;
  outline: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.hb-xg8-track:focus-visible { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 0 2px #0a0a0a, 0 0 0 3.5px #ededed; }
.hb-xg8-hue { background: linear-gradient(90deg, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00); }
.hb-xg8-alpha { background: linear-gradient(90deg, transparent, var(--hb-xg8-solid)), repeating-conic-gradient(#2a2a2a 0 25%, #1a1a1a 0 50%) 0 0 / 8px 8px; }
.hb-xg8-track .hb-xg8-thumb { top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-width: 2.5px; }
.hb-xg8-hue .hb-xg8-thumb { background: hsl(var(--hb-xg8-h), 100%, 50%); }
.hb-xg8[data-drag="hue"] .hb-xg8-hue .hb-xg8-thumb, .hb-xg8[data-drag="alpha"] .hb-xg8-alpha .hb-xg8-thumb { transform: scale(1.3); }
.hb-xg8-field {
  display: flex;
  align-items: center;
  height: 32px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #0f0f0f;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  overflow: hidden;
  transition: border-color 0.2s ease;
}
.hb-xg8-field:focus-within { border-color: #4a4a4a; }
.hb-xg8-fmt {
  height: 100%;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-right: 1px solid #222;
  background: #151515;
  color: #8f8f8f;
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
}
.hb-xg8-fmt:hover { color: #ededed; }
.hb-xg8-fmt:focus-visible { outline: 2px solid #ededed; outline-offset: -2px; }
.hb-xg8-in {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0 8px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
}
.hb-xg8-in[aria-invalid="true"] { color: #ff7a7a; }
.hb-xg8-drop {
  display: grid;
  place-items: center;
  width: 32px;
  height: 100%;
  flex: none;
  margin: 0;
  padding: 0;
  border: 0;
  border-left: 1px solid #222;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
}
.hb-xg8-drop:hover { color: #ededed; background: rgba(255, 255, 255, 0.04); }
.hb-xg8-drop:focus-visible { outline: 2px solid #ededed; outline-offset: -2px; }
.hb-xg8-drop svg { width: 14px; height: 14px; }
.hb-xg8-sw { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-xg8-chip {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: var(--hb-xg8-sw);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg8-chip:hover { transform: translateY(-2px) scale(1.08); }
.hb-xg8-chip:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-xg8-chip[aria-pressed="true"]::after { content: ""; position: absolute; inset: -3px; border-radius: 8px; box-shadow: 0 0 0 1.5px #ededed; }
.hb-xg8-cx {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 4px 0 6px;
  border-radius: 9px;
  background: #121212;
  box-shadow: inset 0 0 0 1px #222;
  font-size: 11.5px;
  color: #a1a1a1;
  font-variant-numeric: tabular-nums;
}
.hb-xg8-aa {
  display: grid;
  place-items: center;
  width: 30px;
  height: 22px;
  flex: none;
  border-radius: 6px;
  background: var(--hb-xg8-bg);
  color: var(--hb-xg8-solid);
  font-size: 12px;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.hb-xg8-cx b { flex: 1; font-weight: 600; color: #ededed; }
.hb-xg8-badge { padding: 2px 6px; border-radius: 5px; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; }
.hb-xg8-badge[data-ok="true"] { background: rgba(63, 191, 127, 0.16); color: #5fd38d; }
.hb-xg8-badge[data-ok="false"] { background: rgba(255, 92, 92, 0.14); color: #ff7a7a; }
.hb-xg8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-xg8 * { transition: none !important; animation: none !important; }
}
`;

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

function rgbToHsv({ r, g, b }: Rgb, a = 1, keepHue = 0): Hsv {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;
  let h = keepHue;
  if (d) {
    if (max === R) h = 60 * (((G - B) / d) % 6);
    else if (max === G) h = 60 * ((B - R) / d + 2);
    else h = 60 * ((R - G) / d + 4);
  }
  return { h: (h + 360) % 360, s: max ? d / max : 0, v: max, a };
}

function hex2(n: number) {
  return Math.round(n).toString(16).padStart(2, "0");
}

function toHex(c: Hsv, withAlpha: boolean) {
  const { r, g, b } = hsvToRgb(c);
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${withAlpha && c.a < 1 ? hex2(c.a * 255) : ""}`;
}

function rgbToHsl({ r, g, b }: Rgb) {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  const h = rgbToHsv({ r, g, b }).h;
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function parseColor(input: string, keepHue: number): Hsv | null {
  const t = input.trim().toLowerCase();
  const hx = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(t);
  if (hx) {
    let h = hx[1];
    if (h.length <= 4) h = h.split("").map((c) => c + c).join("");
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return rgbToHsv({ r: n(0), g: n(2), b: n(4) }, h.length === 8 ? n(6) / 255 : 1, keepHue);
  }
  const rgb = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(t);
  if (rgb) {
    const a = rgb[4] ? (rgb[4].endsWith("%") ? parseFloat(rgb[4]) / 100 : parseFloat(rgb[4])) : 1;
    return rgbToHsv({ r: clamp(+rgb[1], 0, 255), g: clamp(+rgb[2], 0, 255), b: clamp(+rgb[3], 0, 255) }, clamp(a), keepHue);
  }
  const hsl = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(t);
  if (hsl) {
    const h = +hsl[1] % 360;
    const s = clamp(+hsl[2] / 100);
    const l = clamp(+hsl[3] / 100);
    const v = l + s * Math.min(l, 1 - l);
    const a = hsl[4] ? (hsl[4].endsWith("%") ? parseFloat(hsl[4]) / 100 : parseFloat(hsl[4])) : 1;
    return { h, s: v ? 2 * (1 - l / v) : 0, v, a: clamp(a) };
  }
  return null;
}

function luminance({ r, g, b }: Rgb) {
  const f = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: Rgb, b: Rgb) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

function subscribeNone() {
  return () => {};
}

function hasDropper() {
  return "EyeDropper" in window;
}

function noDropper() {
  return false;
}

const formats = ["HEX", "RGB", "HSL"] as const;

export function InputColorPicker({
  label = "Brand color",
  value,
  defaultValue = "#2f7bff",
  onChange,
  swatches = ["#2f7bff", "#7c5cff", "#ff4d8d", "#ff8a3d", "#f5c542", "#3fbf7f", "#14b8c4", "#ededed"],
  alpha = true,
  contrastWith = "#0a0a0a",
  className = "",
  style,
  ...rest
}: InputColorPickerProps) {
  const id = React.useId();
  const [inner, setInner] = React.useState<Hsv>(() => parseColor(defaultValue, 0) ?? { h: 217, s: 0.8, v: 1, a: 1 });
  const controlled = value !== undefined;
  const fromValue = controlled ? parseColor(value, inner.h) : null;
  const color: Hsv = fromValue && toHex(fromValue, alpha) !== toHex(inner, alpha) ? fromValue : inner;
  const [fmt, setFmt] = React.useState<(typeof formats)[number]>("HEX");
  const [draft, setDraft] = React.useState<string | null>(null);
  const [drag, setDrag] = React.useState<"sv" | "hue" | "alpha" | null>(null);
  const [initial] = React.useState(() => toHex(parseColor(value ?? defaultValue, 0) ?? inner, alpha));
  const dropper = React.useSyncExternalStore(subscribeNone, hasDropper, noDropper);

  const rgb = hsvToRgb(color);
  const hex = toHex(color, alpha);
  const solid = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const shown =
    fmt === "HEX"
      ? hex.toUpperCase()
      : fmt === "RGB"
        ? `rgb(${rgb.r} ${rgb.g} ${rgb.b}${alpha && color.a < 1 ? ` / ${Math.round(color.a * 100)}%` : ""})`
        : (() => {
            const l = rgbToHsl(rgb);
            return `hsl(${l.h} ${l.s}% ${l.l}%${alpha && color.a < 1 ? ` / ${Math.round(color.a * 100)}%` : ""})`;
          })();
  const bg = parseColor(contrastWith, 0);
  const bgRgb = bg ? hsvToRgb(bg) : { r: 10, g: 10, b: 10 };
  const ratio = contrast(rgb, bgRgb);
  const grade = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";

  function commit(next: Hsv) {
    setInner(next);
    onChange?.(toHex(next, alpha));
  }

  function fromPointer(kind: "sv" | "hue" | "alpha", e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width);
    const y = clamp((e.clientY - r.top) / r.height);
    if (kind === "sv") commit({ ...color, s: x, v: 1 - y });
    else if (kind === "hue") commit({ ...color, h: x * 359.9 });
    else commit({ ...color, a: Math.round(x * 100) / 100 });
  }

  function pointer(kind: "sv" | "hue" | "alpha") {
    return {
      onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.focus();
        setDrag(kind);
        fromPointer(kind, e);
      },
      onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
        if (drag === kind) fromPointer(kind, e);
      },
      onPointerUp: () => setDrag(null),
      onPointerCancel: () => setDrag(null),
    };
  }

  function keys(kind: "sv" | "hue" | "alpha") {
    return (e: React.KeyboardEvent) => {
      const big = e.shiftKey ? 10 : 1;
      const dx = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      const dy = e.key === "ArrowUp" ? 1 : e.key === "ArrowDown" ? -1 : 0;
      if (!dx && !dy) return;
      e.preventDefault();
      if (kind === "sv") commit({ ...color, s: clamp(color.s + (dx * big) / 100), v: clamp(color.v + (dy * big) / 100) });
      else if (kind === "hue") commit({ ...color, h: (color.h + (dx || dy) * big + 360) % 360 });
      else commit({ ...color, a: clamp(Math.round((color.a + ((dx || dy) * big) / 100) * 100) / 100) });
    };
  }

  function applyDraft() {
    if (draft === null) return;
    const p = parseColor(draft, color.h);
    if (p) commit(alpha ? p : { ...p, a: 1 });
    setDraft(null);
  }

  async function pick() {
    const Ctor = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (!Ctor) return;
    try {
      const res = await new Ctor().open();
      const p = parseColor(res.sRGBHex, color.h);
      if (p) commit({ ...p, a: color.a });
    } catch {
      return;
    }
  }

  const draftBad = draft !== null && parseColor(draft, 0) === null;
  const vars = {
    "--hb-xg8-h": color.h.toFixed(1),
    "--hb-xg8-solid": solid,
    "--hb-xg8-bg": contrastWith,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-xg8 ${className}`} style={vars} data-drag={drag ?? "none"} {...rest}>
      <style href="hb-input-color-picker" precedence="default">{css}</style>
      {label && (
        <div className="hb-xg8-label">
          <span id={`${id}-l`}>{label}</span>
        </div>
      )}
      <div className="hb-xg8-grid" role="group" aria-labelledby={label ? `${id}-l` : undefined}>
        <div
          className="hb-xg8-sv"
          role="slider"
          tabIndex={0}
          aria-label="Saturation and brightness"
          aria-valuetext={`Saturation ${Math.round(color.s * 100)}%, brightness ${Math.round(color.v * 100)}%`}
          aria-valuenow={Math.round(color.s * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={keys("sv")}
          {...pointer("sv")}
        >
          <span className="hb-xg8-thumb" style={{ left: `${(color.s * 100).toFixed(2)}%`, top: `${((1 - color.v) * 100).toFixed(2)}%` }} />
        </div>
        <div className="hb-xg8-side">
          <div className="hb-xg8-row">
            <span className="hb-xg8-swatch" aria-hidden="true">
              <span style={{ background: initial }} />
              <span style={{ background: hex }} />
            </span>
            <div className="hb-xg8-sliders">
              <div
                      className="hb-xg8-track hb-xg8-hue"
                role="slider"
                tabIndex={0}
                aria-label="Hue"
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={Math.round(color.h)}
                onKeyDown={keys("hue")}
                {...pointer("hue")}
              >
                <span className="hb-xg8-thumb" style={{ left: `${((color.h / 360) * 100).toFixed(2)}%` }} />
              </div>
              {alpha && (
                <div
                          className="hb-xg8-track hb-xg8-alpha"
                  role="slider"
                  tabIndex={0}
                  aria-label="Opacity"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(color.a * 100)}
                  aria-valuetext={`${Math.round(color.a * 100)}%`}
                  onKeyDown={keys("alpha")}
                  {...pointer("alpha")}
                >
                  <span className="hb-xg8-thumb" style={{ left: `${(color.a * 100).toFixed(2)}%`, background: hex }} />
                </div>
              )}
            </div>
          </div>
          <div className="hb-xg8-field">
            <button
              type="button"
              className="hb-xg8-fmt"
              aria-label={`Format ${fmt}, switch format`}
              onClick={() => {
                setFmt(formats[(formats.indexOf(fmt) + 1) % formats.length]);
                setDraft(null);
              }}
            >
              {fmt}
            </button>
            <input
              className="hb-xg8-in"
              aria-label="Color value"
              spellCheck={false}
              value={draft ?? shown}
              aria-invalid={draftBad}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={applyDraft}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyDraft();
                if (e.key === "Escape") setDraft(null);
              }}
            />
            {dropper && (
              <button type="button" className="hb-xg8-drop" aria-label="Pick a color from the screen" onClick={pick}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8.2 3.4l2.4 2.4M9.6 2a1.7 1.7 0 0 1 2.4 2.4l-1.3 1.3-2.4-2.4zM8.3 4.7L2.8 10.2 2 12l1.8-.8 5.5-5.5" />
                </svg>
              </button>
            )}
          </div>
          <ul className="hb-xg8-sw" aria-label="Swatches">
            {swatches.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="hb-xg8-chip"
                  style={{ "--hb-xg8-sw": s } as React.CSSProperties}
                  aria-label={`Use ${s}`}
                  aria-pressed={toHex(color, false) === toHex(parseColor(s, 0) ?? color, false)}
                  onClick={() => {
                    const p = parseColor(s, color.h);
                    if (p) commit({ ...p, a: color.a });
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="hb-xg8-cx" aria-live="polite">
            <span className="hb-xg8-aa" aria-hidden="true">
              Aa
            </span>
            <b>{ratio.toFixed(2)}:1</b>
            <span className="hb-xg8-badge" data-ok={ratio >= 4.5}>
              {grade}
            </span>
          </div>
        </div>
      </div>
      <span className="hb-xg8-sr" aria-live="polite">
        {hex}
      </span>
    </div>
  );
}

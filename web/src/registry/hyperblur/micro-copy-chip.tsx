"use client";

import * as React from "react";

export interface MicroCopyChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "children" | "onCopy"> {
  value?: string;
  prefix?: string;
  copiedLabel?: string;
  timeout?: number;
  accent?: string;
  onCopy?: (value: string) => void;
}

const css = `
.hb-wf6 {
  --hb-wf6-c: #2f7bff;
  --hb-wf6-dx: 120px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  height: 40px;
  padding: 0 6px 0 14px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #141414, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 20px -12px rgba(0,0,0,0.9);
  color: #d8d8d8;
  font: inherit;
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.25s ease, transform 0.22s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.hb-wf6 *, .hb-wf6 *::before, .hb-wf6 *::after { box-sizing: border-box; }
.hb-wf6:hover { border-color: #353535; }
.hb-wf6:active { transform: scale(0.98); }
.hb-wf6:focus-visible { outline: 2px solid var(--hb-wf6-c); outline-offset: 3px; }
.hb-wf6:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-wf6[data-done="true"] { border-color: color-mix(in srgb, var(--hb-wf6-c) 55%, #262626); }
.hb-wf6-sw {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(100deg, transparent 30%, color-mix(in srgb, var(--hb-wf6-c) 28%, transparent) 50%, transparent 70%);
  background-size: 250% 100%;
  background-position: 130% 0;
  opacity: 0;
}
.hb-wf6[data-done="true"] .hb-wf6-sw { animation: hb-wf6-sweep 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.28s both; }
@keyframes hb-wf6-sweep { 0% { opacity: 1; background-position: 130% 0; } 100% { opacity: 1; background-position: -30% 0; } }
.hb-wf6-tx {
  position: relative;
  display: inline-flex;
  gap: 8px;
  min-width: 0;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12.5px;
  white-space: nowrap;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, #000 85%, transparent);
  mask-image: linear-gradient(90deg, #000 85%, transparent);
}
.hb-wf6-pf { color: #5c5c5c; user-select: none; }
.hb-wf6-vl { overflow: hidden; text-overflow: clip; transition: opacity 0.3s ease; }
.hb-wf6[data-done="true"] .hb-wf6-vl { animation: hb-wf6-dim 0.9s ease both; }
@keyframes hb-wf6-dim { 0% { opacity: 1; } 25% { opacity: 0.35; } 100% { opacity: 1; } }
.hb-wf6-gh {
  position: absolute;
  top: 50%;
  white-space: nowrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12.5px;
  color: var(--hb-wf6-c);
  pointer-events: none;
  transform-origin: 0 50%;
  translate: 0 -50%;
  animation: hb-wf6-fly 0.5s cubic-bezier(0.55, 0, 0.75, 0.3) both;
}
@keyframes hb-wf6-fly {
  0% { transform: translate(0, 0) scale(1); opacity: 0.95; filter: blur(0); }
  25% { transform: translate(4px, -8px) scale(0.92); opacity: 0.9; }
  100% { transform: translate(var(--hb-wf6-dx), 0) scale(0.08); opacity: 0; filter: blur(1px); }
}
.hb-wf6-ic {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
  color: #a8a8a8;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.hb-wf6:hover .hb-wf6-ic { color: #fff; }
.hb-wf6[data-done="true"] .hb-wf6-ic { background: var(--hb-wf6-c); border-color: var(--hb-wf6-c); color: #fff; animation: hb-wf6-gulp 0.45s cubic-bezier(0.3, 1.8, 0.4, 1) 0.4s both; }
@keyframes hb-wf6-gulp { 0% { transform: scale(1); } 40% { transform: scale(0.82, 1.12); } 100% { transform: scale(1); } }
.hb-wf6-ic svg { position: absolute; width: 15px; height: 15px; transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-wf6-ck { opacity: 0; transform: scale(0.5); }
.hb-wf6-ck path { stroke-dasharray: 16; stroke-dashoffset: 16; }
.hb-wf6[data-done="true"] .hb-wf6-cl { opacity: 0; transform: scale(0.5) rotate(-20deg); transition-delay: 0.38s; }
.hb-wf6[data-done="true"] .hb-wf6-ck { opacity: 1; transform: none; transition-delay: 0.4s; }
.hb-wf6[data-done="true"] .hb-wf6-ck path { animation: hb-wf6-draw 0.35s ease-out 0.45s forwards; }
@keyframes hb-wf6-draw { to { stroke-dashoffset: 0; } }
.hb-wf6-tag {
  position: absolute;
  right: 44px;
  top: 50%;
  padding: 3px 7px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--hb-wf6-c) 18%, #0e0e0e);
  border: 1px solid color-mix(in srgb, var(--hb-wf6-c) 40%, transparent);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  translate: 0 -50%;
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
  pointer-events: none;
}
.hb-wf6[data-done="true"] .hb-wf6-tag { opacity: 1; transform: none; transition-delay: 0.5s; }
.hb-wf6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf6, .hb-wf6-ic, .hb-wf6-ic svg, .hb-wf6-tag, .hb-wf6-vl { transition: none; transition-delay: 0s; }
  .hb-wf6-gh { display: none; }
  .hb-wf6[data-done="true"] .hb-wf6-sw, .hb-wf6[data-done="true"] .hb-wf6-ic, .hb-wf6[data-done="true"] .hb-wf6-vl { animation: none; }
  .hb-wf6[data-done="true"] .hb-wf6-ck path { animation: none; stroke-dashoffset: 0; }
}
`;

function writeClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => undefined);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {}
  document.body.removeChild(ta);
  return Promise.resolve();
}

export function MicroCopyChip({
  value = "npx shadcn add hyperblur/aurora",
  prefix = "$",
  copiedLabel = "Copied",
  timeout = 1800,
  accent = "#2f7bff",
  onCopy,
  className = "",
  style,
  onClick,
  ...rest
}: MicroCopyChipProps) {
  const [done, setDone] = React.useState(false);
  const [shot, setShot] = React.useState(0);
  const [dx, setDx] = React.useState(120);
  const [gl, setGl] = React.useState(14);
  const txtRef = React.useRef<HTMLSpanElement>(null);
  const icRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setDone(false), timeout);
    return () => window.clearTimeout(t);
  }, [done, shot, timeout]);

  return (
    <button
      type="button"
      className={`hb-wf6 ${className}`}
      data-done={done}
      aria-label={`Copy ${value}`}
      style={{ ...style, ["--hb-wf6-c" as string]: accent, ["--hb-wf6-dx" as string]: `${dx.toFixed(1)}px` }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        const a = txtRef.current?.getBoundingClientRect();
        const b = icRef.current?.getBoundingClientRect();
        const c = e.currentTarget.getBoundingClientRect();
        if (a && b) {
          setDx(b.left + b.width / 2 - a.left);
          setGl(a.left - c.left);
        }
        void writeClipboard(value);
        setDone(false);
        setShot((n) => n + 1);
        window.requestAnimationFrame(() => setDone(true));
        onCopy?.(value);
      }}
      {...rest}
    >
      <style href="hb-micro-copy-chip" precedence="default">
        {css}
      </style>
      <span className="hb-wf6-sw" aria-hidden="true" />
      <span className="hb-wf6-tx" aria-hidden="true">
        {prefix ? <span className="hb-wf6-pf">{prefix}</span> : null}
        <span ref={txtRef} className="hb-wf6-vl">
          {value}
        </span>
      </span>
      {shot > 0 && done ? (
        <span key={shot} className="hb-wf6-gh" aria-hidden="true" style={{ left: `${gl.toFixed(1)}px` }}>
          {value}
        </span>
      ) : null}
      <span className="hb-wf6-tag" aria-hidden="true">
        {copiedLabel}
      </span>
      <span ref={icRef} className="hb-wf6-ic" aria-hidden="true">
        <svg className="hb-wf6-cl" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <rect x="5.25" y="5.25" width="8" height="8.5" rx="1.8" />
          <path d="M10.75 5.25V3.8c0-.8-.6-1.4-1.4-1.4H4.2c-.8 0-1.4.6-1.4 1.4v5.6c0 .8.6 1.4 1.4 1.4h1.05" />
        </svg>
        <svg className="hb-wf6-ck" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
      <span className="hb-wf6-sr" aria-live="polite">
        {done ? copiedLabel : ""}
      </span>
    </button>
  );
}

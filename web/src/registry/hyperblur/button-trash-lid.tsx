"use client";

import * as React from "react";

export interface ButtonTrashLidProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  doneLabel?: React.ReactNode;
  accent?: string;
  size?: "sm" | "md" | "lg";
  resetAfter?: number;
  onDelete?: () => void;
}

const css = `
.hb-xd3 {
  --hb-xd3-h: 2.75rem;
  --hb-xd3-fs: 0.875rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  height: var(--hb-xd3-h);
  margin: 0;
  padding: 0 1.15em 0 0.3em;
  font-family: inherit;
  font-size: var(--hb-xd3-fs);
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #ededed;
  white-space: nowrap;
  background: linear-gradient(180deg, #1c1c1c, #131313);
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.5), 0 10px 24px -14px rgba(0,0,0,0.9);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd3 *, .hb-xd3 *::before, .hb-xd3 *::after { box-sizing: border-box; }
.hb-xd3[data-size="sm"] { --hb-xd3-h: 2.25rem; --hb-xd3-fs: 0.8125rem; }
.hb-xd3[data-size="lg"] { --hb-xd3-h: 3.25rem; --hb-xd3-fs: 1rem; }
.hb-xd3:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hb-xd3-c) 45%, #2a2a2a); }
.hb-xd3:active:not(:disabled) { transform: scale(0.97); }
.hb-xd3:focus-visible { outline: 2px solid var(--hb-xd3-c); outline-offset: 3px; }
.hb-xd3:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd3-chip {
  position: relative;
  display: grid;
  place-items: center;
  width: calc(var(--hb-xd3-h) - 0.6em);
  height: calc(var(--hb-xd3-h) - 0.6em);
  border-radius: 999px;
  color: color-mix(in srgb, var(--hb-xd3-c) 75%, #fff);
  background: radial-gradient(100% 100% at 50% 0%, color-mix(in srgb, var(--hb-xd3-c) 30%, #1a0c0d), color-mix(in srgb, var(--hb-xd3-c) 12%, #0e0707));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd3-c) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.08);
  transition: box-shadow 0.3s ease, background 0.3s ease;
}
.hb-xd3:hover:not(:disabled) .hb-xd3-chip, .hb-xd3:focus-visible .hb-xd3-chip {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd3-c) 55%, transparent), 0 0 18px -4px color-mix(in srgb, var(--hb-xd3-c) 70%, transparent);
}
.hb-xd3-can { width: 56%; height: 56%; overflow: visible; }
.hb-xd3-lid {
  transform-box: fill-box;
  transform-origin: 8% 100%;
  transition: transform 0.45s cubic-bezier(0.3, 1.8, 0.5, 1);
}
.hb-xd3:hover:not(:disabled) .hb-xd3-lid, .hb-xd3:focus-visible .hb-xd3-lid { transform: translateY(-1.5px) rotate(-24deg); }
.hb-xd3[data-phase="drop"] .hb-xd3-lid { animation: hb-xd3-lid 0.8s cubic-bezier(0.3, 0.9, 0.4, 1) forwards; }
.hb-xd3[data-phase="drop"] .hb-xd3-body { animation: hb-xd3-squash 0.8s ease forwards; }
.hb-xd3-body { transform-box: fill-box; transform-origin: 50% 100%; }
.hb-xd3-paper {
  position: absolute;
  left: 50%;
  top: 0;
  width: 42%;
  height: 50%;
  margin-left: -21%;
  border-radius: 2px;
  background:
    linear-gradient(225deg, transparent 0 22%, #c9c2c2 22% 30%, transparent 30%),
    repeating-linear-gradient(180deg, transparent 0 3px, rgba(0,0,0,0.22) 3px 4px) 2px 5px / calc(100% - 4px) 60% no-repeat,
    #f4f0f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  pointer-events: none;
}
.hb-xd3[data-phase="drop"] .hb-xd3-paper { animation: hb-xd3-paper 0.8s cubic-bezier(0.5, 0, 0.75, 0.4) forwards; }
.hb-xd3-text {
  display: grid;
  overflow: hidden;
  height: 1.3em;
}
.hb-xd3-text > span {
  grid-area: 1 / 1;
  line-height: 1.3em;
  transition: transform 0.5s cubic-bezier(0.6, 0, 0.2, 1), opacity 0.3s ease;
}
.hb-xd3-b { transform: translateY(110%); opacity: 0; color: color-mix(in srgb, var(--hb-xd3-c) 55%, #fff); }
.hb-xd3[data-phase="done"] .hb-xd3-a { transform: translateY(-110%); opacity: 0; }
.hb-xd3[data-phase="done"] .hb-xd3-b { transform: none; opacity: 1; }
.hb-xd3-count {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 15px;
  height: 15px;
  padding: 0 4px;
  font-size: 9px;
  font-weight: 700;
  line-height: 15px;
  text-align: center;
  color: #fff;
  background: var(--hb-xd3-c);
  border: 2px solid #151515;
  border-radius: 999px;
  transform: scale(0);
  transition: transform 0.4s cubic-bezier(0.3, 1.8, 0.5, 1);
}
.hb-xd3[data-phase="done"] .hb-xd3-count { transform: scale(1); }
.hb-xd3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd3-lid {
  0% { transform: translateY(-2px) rotate(-38deg); }
  55% { transform: translateY(-2px) rotate(-38deg); }
  72% { transform: translateY(0.5px) rotate(4deg); }
  84% { transform: rotate(-3deg); }
  100% { transform: rotate(0); }
}
@keyframes hb-xd3-squash {
  0%, 66% { transform: scale(1, 1); }
  76% { transform: scale(1.1, 0.88); }
  88% { transform: scale(0.97, 1.04); }
  100% { transform: scale(1, 1); }
}
@keyframes hb-xd3-paper {
  0% { opacity: 0; transform: translateY(-115%) rotate(-14deg); }
  18% { opacity: 1; transform: translateY(-95%) rotate(-8deg); }
  60% { opacity: 1; transform: translateY(18%) rotate(4deg) scale(0.75); }
  70% { opacity: 0; transform: translateY(40%) rotate(4deg) scale(0.6); }
  100% { opacity: 0; transform: translateY(40%) scale(0.6); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xd3, .hb-xd3-lid, .hb-xd3-text > span, .hb-xd3-count { transition: none; }
  .hb-xd3[data-phase="drop"] .hb-xd3-lid, .hb-xd3[data-phase="drop"] .hb-xd3-body, .hb-xd3[data-phase="drop"] .hb-xd3-paper { animation: none; }
}
`;

export function ButtonTrashLid({
  children = "Move to trash",
  doneLabel = "In the trash",
  accent = "#ef4444",
  size = "md",
  resetAfter = 2400,
  onDelete,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonTrashLidProps) {
  const [phase, setPhase] = React.useState<"idle" | "drop" | "done">("idle");
  const [count, setCount] = React.useState(0);
  const latest = React.useRef(onDelete);

  React.useEffect(() => {
    latest.current = onDelete;
  }, [onDelete]);

  React.useEffect(() => {
    if (phase === "drop") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t = window.setTimeout(() => {
        setPhase("done");
        latest.current?.();
      }, reduce ? 0 : 640);
      return () => window.clearTimeout(t);
    }
    if (phase === "done" && resetAfter > 0) {
      const t = window.setTimeout(() => setPhase("idle"), resetAfter);
      return () => window.clearTimeout(t);
    }
  }, [phase, resetAfter]);

  return (
    <button
      type={type}
      className={`hb-xd3 ${className}`.trim()}
      data-size={size}
      data-phase={phase}
      disabled={disabled}
      aria-disabled={phase !== "idle" || undefined}
      style={{ "--hb-xd3-c": accent, ...style } as React.CSSProperties}
      onClick={() => {
        if (phase !== "idle") return;
        setCount((c) => c + 1);
        setPhase("drop");
      }}
      {...rest}
    >
      <style href="hb-button-trash-lid" precedence="default">{css}</style>
      <span className="hb-xd3-chip" aria-hidden="true">
        <span className="hb-xd3-paper" />
        <svg className="hb-xd3-can" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <g className="hb-xd3-lid">
            <path d="M3.5 6.5h17" />
            <path d="M9.5 6.5V4.2h5v2.3" />
          </g>
          <g className="hb-xd3-body">
            <path d="M5.5 9.5l1.1 10.2c.1.8.7 1.3 1.5 1.3h7.8c.8 0 1.4-.5 1.5-1.3l1.1-10.2" />
            <path d="M10 12.5v5M14 12.5v5" />
          </g>
        </svg>
        <span className="hb-xd3-count">{count}</span>
      </span>
      <span className="hb-xd3-text">
        <span className="hb-xd3-a" aria-hidden={phase === "done"}>{children}</span>
        <span className="hb-xd3-b" aria-hidden={phase !== "done"}>{doneLabel}</span>
      </span>
      <span className="hb-xd3-sr" role="status" aria-live="polite">{phase === "done" ? doneLabel : ""}</span>
    </button>
  );
}

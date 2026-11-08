"use client";

import * as React from "react";

export interface HoverFanStackCard {
  title: string;
  meta: string;
  from: string;
  to: string;
}

export interface HoverFanStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  cards?: HoverFanStackCard[];
  spread?: number;
  cardWidth?: number;
  autoPlay?: boolean;
  defaultSelected?: number;
  accent?: string;
  labels?: { selected: string; pick: string };
  onSelect?: (index: number, card: HoverFanStackCard) => void;
}

const defaults: HoverFanStackCard[] = [
  { title: "Low Tide", meta: "18 tracks", from: "#1d6fa3", to: "#0b1f3a" },
  { title: "Night Drive", meta: "24 tracks", from: "#ff5f6d", to: "#3a0d3f" },
  { title: "Paper Moon", meta: "12 tracks", from: "#f2c14e", to: "#7a3b12" },
  { title: "Greenhouse", meta: "31 tracks", from: "#3fbf8a", to: "#0c2e25" },
  { title: "Static Bloom", meta: "16 tracks", from: "#9b7bff", to: "#1e1442" },
];

const css = `
.hb-wg3 { --hb-wg3-accent: #2f7bff; --hb-wg3-w: 96px; position: relative; box-sizing: border-box; width: 100%; height: calc(var(--hb-wg3-w) * 1.78); font-family: inherit; color: #ededed; }
.hb-wg3 *, .hb-wg3 *::before, .hb-wg3 *::after { box-sizing: border-box; }
.hb-wg3-deck { position: absolute; left: 50%; top: 8%; width: var(--hb-wg3-w); height: calc(var(--hb-wg3-w) * 1.32); margin-left: calc(var(--hb-wg3-w) / -2); }
.hb-wg3-card { appearance: none; border: 0; margin: 0; padding: 0; font: inherit; color: inherit; cursor: pointer; position: absolute; inset: 0; border-radius: 12px; overflow: hidden; text-align: left; transform-origin: 50% 165%; transform: translate3d(var(--hb-wg3-x), var(--hb-wg3-y), 0) rotate(var(--hb-wg3-r)) scale(var(--hb-wg3-s)); transition: transform .62s cubic-bezier(.22,1.18,.36,1), box-shadow .4s ease, filter .4s ease; background: linear-gradient(155deg, var(--hb-wg3-from), var(--hb-wg3-to)); box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 0 0 1px rgba(255,255,255,.06), 0 18px 30px -16px rgba(0,0,0,.9), 0 3px 8px rgba(0,0,0,.45); outline: none; -webkit-tap-highlight-color: transparent; }
.hb-wg3-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(120% 70% at 20% 0%, rgba(255,255,255,.28), transparent 55%), repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 2px, transparent 2px 9px); mix-blend-mode: soft-light; }
.hb-wg3-disc { position: absolute; right: -22%; top: 12%; width: 74%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(0,0,0,.55) 0 12%, rgba(255,255,255,.12) 13% 15%, transparent 16%), repeating-radial-gradient(circle, rgba(255,255,255,.07) 0 1px, transparent 1px 3px); opacity: .7; }
.hb-wg3-text { position: absolute; left: 10px; right: 10px; bottom: 9px; display: grid; gap: 2px; }
.hb-wg3-title { font-size: 12.5px; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; text-shadow: 0 1px 2px rgba(0,0,0,.35); }
.hb-wg3-meta { font-size: 9.5px; color: rgba(255,255,255,.72); letter-spacing: .02em; }
.hb-wg3-check { position: absolute; left: 9px; top: 9px; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; background: var(--hb-wg3-accent); box-shadow: 0 0 0 2px rgba(10,10,10,.6); transform: scale(0); transition: transform .45s cubic-bezier(.3,1.6,.4,1); }
.hb-wg3-check svg { width: 10px; height: 10px; fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-wg3-card[aria-pressed="true"] .hb-wg3-check { transform: scale(1); }
.hb-wg3[data-open="true"] .hb-wg3-card:not([data-hot="true"]) { filter: saturate(.8) brightness(.82); }
.hb-wg3[data-open="true"] .hb-wg3-card[data-hot="true"] { box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 0 0 1px rgba(255,255,255,.14), 0 26px 40px -16px rgba(0,0,0,.95), 0 0 34px -10px var(--hb-wg3-from); }
.hb-wg3-card:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg3-accent), 0 18px 30px -16px rgba(0,0,0,.9); }
.hb-wg3-hint { position: absolute; left: 0; right: 0; bottom: 0; text-align: center; font-size: 10.5px; color: #8f8f8f; letter-spacing: .01em; transition: opacity .3s ease, transform .4s cubic-bezier(.2,.7,.2,1); }
.hb-wg3-hint b { color: #ededed; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg3-card, .hb-wg3-check, .hb-wg3-hint { transition: none; }
}
`;

export function HoverFanStack({
  cards = defaults,
  spread = 10,
  cardWidth = 96,
  autoPlay = false,
  defaultSelected = 1,
  accent = "#2f7bff",
  labels = { selected: "now playing", pick: "select" },
  onSelect,
  className = "",
  style,
  ...rest
}: HoverFanStackProps) {
  const [hoverOpen, setHoverOpen] = React.useState(false);
  const [tapOpen, setTapOpen] = React.useState(false);
  const [autoOpen, setAutoOpen] = React.useState(false);
  const [hot, setHot] = React.useState(-1);
  const [selected, setSelected] = React.useState(defaultSelected);
  const [touched, setTouched] = React.useState(false);
  const btns = React.useRef<(HTMLButtonElement | null)[]>([]);
  const lastPointer = React.useRef("mouse");
  const n = cards.length;
  const open = hoverOpen || tapOpen || (autoPlay && !touched && autoOpen);

  React.useEffect(() => {
    if (!autoPlay || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAutoOpen((v) => !v), 2400);
    return () => window.clearInterval(id);
  }, [autoPlay, touched]);

  const mid = (n - 1) / 2;
  const front = Math.min(Math.max(selected, 0), n - 1);

  const pose = (i: number) => {
    const o = i - mid;
    if (!open) {
      const depth = i === front ? 0 : 1 + Math.abs(i - front);
      return { x: 0, y: -depth * 2.2, r: o * 2.4, s: 1 - depth * 0.018 };
    }
    let push = 0;
    if (hot >= 0 && i !== hot) push = i < hot ? -1 : 1;
    const r = o * spread + push * 4;
    const x = o * cardWidth * 0.2 + push * 6;
    const y = i === hot ? -cardWidth * 0.2 : Math.abs(o) * 3;
    return { x, y, r, s: i === hot ? 1.07 : 1 };
  };

  const choose = (i: number) => {
    setSelected(i);
    onSelect?.(i, cards[i]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (e.key === "Escape") {
      setTapOpen(false);
      setHoverOpen(false);
      return;
    }
    if (next >= 0) {
      e.preventDefault();
      btns.current[next]?.focus();
    }
  };

  const vars = { "--hb-wg3-accent": accent, "--hb-wg3-w": `${cardWidth}px` } as React.CSSProperties;
  const label = hot >= 0 ? cards[hot] : cards[front];

  return (
    <div
      className={`hb-wg3 ${className}`}
      style={{ ...vars, ...style }}
      data-open={open ? "true" : "false"}
      onPointerEnter={(e) => {
        lastPointer.current = e.pointerType;
        if (e.pointerType === "mouse") {
          setTouched(true);
          setHoverOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setHoverOpen(false);
          setHot(-1);
        }
      }}
      onFocus={() => {
        setTouched(true);
        setHoverOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHoverOpen(false);
          setTapOpen(false);
          setHot(-1);
        }
      }}
      {...rest}
    >
      <style href="hb-hover-fan-stack" precedence="default">{css}</style>
      <div className="hb-wg3-deck" role="group" aria-label="Collection">
        {cards.map((c, i) => {
          const p = pose(i);
          const z = open ? 10 + i : i === front ? 50 : 20 - Math.abs(i - front);
          return (
            <button
              key={`${c.title}-${i}`}
              ref={(el) => {
                btns.current[i] = el;
              }}
              type="button"
              className="hb-wg3-card"
              aria-pressed={i === selected}
              aria-label={`${c.title}, ${c.meta}`}
              data-hot={i === hot ? "true" : "false"}
              onPointerDown={(e) => {
                lastPointer.current = e.pointerType;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHot(i);
              }}
              onFocus={() => setHot(i)}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => {
                if (lastPointer.current !== "mouse" && !open) {
                  setTouched(true);
                  setTapOpen(true);
                  return;
                }
                if (lastPointer.current !== "mouse" && hot !== i) {
                  setHot(i);
                  return;
                }
                choose(i);
                if (lastPointer.current !== "mouse") {
                  setTapOpen(false);
                  setHot(-1);
                }
              }}
              style={
                {
                  "--hb-wg3-x": `${p.x.toFixed(1)}px`,
                  "--hb-wg3-y": `${p.y.toFixed(1)}px`,
                  "--hb-wg3-r": `${p.r.toFixed(2)}deg`,
                  "--hb-wg3-s": p.s.toFixed(3),
                  "--hb-wg3-from": c.from,
                  "--hb-wg3-to": c.to,
                  zIndex: z,
                } as React.CSSProperties
              }
            >
              <span className="hb-wg3-disc" aria-hidden="true" />
              <span className="hb-wg3-check" aria-hidden="true">
                <svg viewBox="0 0 12 12">
                  <path d="M2.5 6.2l2.3 2.3 4.7-5" />
                </svg>
              </span>
              <span className="hb-wg3-text">
                <span className="hb-wg3-title">{c.title}</span>
                <span className="hb-wg3-meta">{c.meta}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="hb-wg3-hint" aria-live="polite">
        {label ? (
          <>
            <b>{label.title}</b> · {hot >= 0 && hot !== selected ? labels.pick : labels.selected}
          </>
        ) : null}
      </p>
    </div>
  );
}

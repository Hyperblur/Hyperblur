"use client";

import * as React from "react";

export interface SharedLayoutCard {
  id: string;
  eyebrow?: string;
  title: string;
  from?: string;
  to?: string;
  body?: React.ReactNode;
  action?: string;
}

export interface ModalSharedLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  cards?: SharedLayoutCard[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (id: string | null) => void;
  height?: number;
  autoDemo?: number;
  accent?: string;
}

const defaults: SharedLayoutCard[] = [
  {
    id: "weekend",
    eyebrow: "Guide",
    title: "A slow weekend in Lisbon",
    from: "#ff9a62",
    to: "#7a2f6b",
    body: "Start with coffee in Alfama, ride tram 28 before the crowds, and book dinner in Principe Real by Thursday. Everything is walkable.",
    action: "Save itinerary",
  },
  {
    id: "kit",
    eyebrow: "Pack list",
    title: "The rain-ready travel kit",
    from: "#6fd0c4",
    to: "#14304f",
    body: "A packable shell, quick-dry socks, a dry bag for your phone and one pair of shoes you do not mind soaking. That covers most trips.",
    action: "Add to trip",
  },
];

const css = `
.hb-za7 {
  --hb-za7-c: #2f7bff;
  --hb-za7-h: 200px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: var(--hb-za7-h);
  overflow: hidden;
  font-family: inherit;
  color: #ededed;
  background: #0d0d0d;
  border: 1px solid #262626;
  border-radius: 18px;
  isolation: isolate;
}
.hb-za7 *, .hb-za7 *::before, .hb-za7 *::after { box-sizing: border-box; }
.hb-za7-grid { display: grid; grid-template-columns: repeat(var(--hb-za7-n), minmax(0, 1fr)); gap: 10px; height: 100%; padding: 10px; }
.hb-za7-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  margin: 0;
  padding: 12px;
  overflow: hidden;
  font: inherit;
  color: #ffffff;
  text-align: left;
  background: linear-gradient(155deg, var(--from), var(--to));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 0.9, 0.24, 1), box-shadow 0.3s ease;
}
.hb-za7-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4); }
.hb-za7-card:active { transform: scale(0.98); }
.hb-za7-card:focus-visible { outline: 2px solid var(--hb-za7-c); outline-offset: 2px; }
.hb-za7-card[data-hidden="true"] { visibility: hidden; }
.hb-za7-card::after {
  content: "";
  position: absolute;
  right: -28px;
  bottom: -34px;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 68%);
  pointer-events: none;
}
.hb-za7-eyebrow { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.72); }
.hb-za7-title { display: block; margin-top: 4px; font-size: 17px; font-weight: 650; line-height: 1.15; letter-spacing: -0.02em; text-wrap: balance; }
.hb-za7-more {
  position: relative;
  z-index: 1;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.32);
  border-radius: 999px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.hb-za7-more svg { width: 10px; height: 10px; }
.hb-za7-scrim {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  transition: opacity 0.28s ease;
  animation: hb-za7-fade 0.3s ease backwards;
}
.hb-za7-scrim[data-closing="true"] { opacity: 0; }
.hb-za7-shell {
  position: absolute;
  z-index: 6;
  left: 10px;
  top: 10px;
  right: 10px;
  bottom: 10px;
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(155deg, var(--from), var(--to));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  outline: none;
}
.hb-za7-head { position: absolute; left: 0; right: 0; top: 0; padding: 12px; padding-right: 48px; }
.hb-za7-sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 66px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  overflow: auto;
  color: #d4d4d4;
  background: #121212;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.08);
  animation: hb-za7-sheet 0.42s cubic-bezier(0.22, 0.9, 0.24, 1) 0.14s backwards;
  transition: opacity 0.18s ease, transform 0.25s ease;
}
.hb-za7-shell[data-closing="true"] .hb-za7-sheet { opacity: 0; transform: translateY(12px); }
.hb-za7-body { margin: 0; font-size: 12.5px; line-height: 1.5; }
.hb-za7-cta {
  align-self: flex-start;
  margin: 0;
  padding: 7px 14px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #0a0a0a;
  background: #ededed;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.hb-za7-cta:hover { background: #ffffff; }
.hb-za7-cta:active { transform: scale(0.96); }
.hb-za7-cta:focus-visible { outline: 2px solid var(--hb-za7-c); outline-offset: 2px; }
.hb-za7-x {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  animation: hb-za7-fade 0.3s ease 0.2s backwards;
}
.hb-za7-x:hover { background: rgba(0, 0, 0, 0.55); }
.hb-za7-x:active { transform: scale(0.92); }
.hb-za7-x:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
.hb-za7-shell[data-closing="true"] .hb-za7-x { opacity: 0; }
.hb-za7-x svg { width: 12px; height: 12px; }
@keyframes hb-za7-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-za7-sheet { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-za7-card, .hb-za7-scrim, .hb-za7-sheet, .hb-za7-x, .hb-za7-cta { transition: none; animation: none; }
}
`;

const easing = "cubic-bezier(0.22, 0.9, 0.24, 1)";
const INSET = 10;

export function ModalSharedLayout({
  cards,
  value,
  defaultValue = null,
  onChange,
  height = 200,
  autoDemo = 0,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ModalSharedLayoutProps) {
  const items = cards && cards.length ? cards : defaults;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string | null>(defaultValue);
  const active = controlled ? value : inner;
  const [shown, setShown] = React.useState<string | null>(active);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const shellRef = React.useRef<HTMLDivElement>(null);
  const scrimRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const cardRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const opened = React.useRef<string | null>(null);
  const closingRef = React.useRef(false);
  const [busy, setBusy] = React.useState(false);
  const latest = React.useRef(onChange);

  React.useEffect(() => {
    latest.current = onChange;
  }, [onChange]);

  if (active !== null && shown !== active) setShown(active);

  const setActive = React.useCallback(
    (id: string | null) => {
      if (!controlled) setInner(id);
      latest.current?.(id);
    },
    [controlled],
  );

  function rectOf(el: HTMLElement) {
    const frame = frameRef.current as HTMLDivElement;
    const f = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      left: r.left - f.left - frame.clientLeft,
      top: r.top - f.top - frame.clientTop,
      width: r.width,
      height: r.height,
    };
  }

  React.useLayoutEffect(() => {
    const frame = frameRef.current;
    const shell = shellRef.current;
    if (!frame || !shell || !shown) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = cardRefs.current.get(shown);
    const finalRect = {
      left: INSET,
      top: INSET,
      width: frame.clientWidth - INSET * 2,
      height: frame.clientHeight - INSET * 2,
    };
    if (active === shown && opened.current !== shown) {
      opened.current = shown;
      closeRef.current?.focus({ preventScroll: true });
      if (!card || reduce) return;
      const from = rectOf(card);
      shell.animate(
        [
          { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`, borderRadius: "14px" },
          { left: `${finalRect.left}px`, top: `${finalRect.top}px`, width: `${finalRect.width}px`, height: `${finalRect.height}px`, borderRadius: "16px" },
        ],
        { duration: 520, easing },
      );
    } else if (active === null && !closingRef.current) {
      closingRef.current = true;
      shell.dataset.closing = "true";
      if (scrimRef.current) scrimRef.current.dataset.closing = "true";
      const done = () => {
        opened.current = null;
        closingRef.current = false;
        setShown(null);
        cardRefs.current.get(shown)?.focus({ preventScroll: true });
      };
      if (!card || reduce) {
        done();
        return;
      }
      const to = rectOf(card);
      const anim = shell.animate(
        [
          { left: `${finalRect.left}px`, top: `${finalRect.top}px`, width: `${finalRect.width}px`, height: `${finalRect.height}px`, borderRadius: "16px" },
          { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`, borderRadius: "14px" },
        ],
        { duration: 420, easing, fill: "forwards", delay: 60 },
      );
      anim.onfinish = done;
    }
  }, [shown, active]);

  const firstId = items[0].id;

  React.useEffect(() => {
    if (!autoDemo || busy || controlled) return;
    let id = 0;
    let demoOpen = false;
    function opening() {
      id = window.setTimeout(() => {
        demoOpen = true;
        setActive(firstId);
        id = window.setTimeout(() => {
          demoOpen = false;
          setActive(null);
          opening();
        }, 2600);
      }, autoDemo);
    }
    opening();
    return () => {
      window.clearTimeout(id);
      if (demoOpen) setActive(null);
    };
  }, [autoDemo, busy, controlled, firstId, setActive]);

  const current = items.find((c) => c.id === shown) ?? null;
  const open = current !== null;

  const vars = {
    "--hb-za7-c": accent,
    "--hb-za7-h": `${height}px`,
    "--hb-za7-n": items.length,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={frameRef}
      className={`hb-za7 ${className}`}
      style={vars}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setBusy(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setBusy(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setBusy(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setBusy(false);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!open) return;
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          setActive(null);
        } else if (e.key === "Tab") {
          const nodes = shellRef.current?.querySelectorAll<HTMLElement>("button");
          if (!nodes || !nodes.length) return;
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }}
      {...rest}
    >
      <style href="hb-modal-shared-layout" precedence="default">{css}</style>
      <div className="hb-za7-grid" inert={open}>
        {items.map((card) => (
          <button
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current.set(card.id, el);
              else cardRefs.current.delete(card.id);
            }}
            type="button"
            className="hb-za7-card"
            data-hidden={shown === card.id}
            aria-haspopup="dialog"
            style={{ "--from": card.from ?? "#2f7bff", "--to": card.to ?? "#101a33" } as React.CSSProperties}
            onClick={() => setActive(card.id)}
          >
            <span>
              {card.eyebrow ? <span className="hb-za7-eyebrow">{card.eyebrow}</span> : null}
              <span className="hb-za7-title">{card.title}</span>
            </span>
            <span className="hb-za7-more">
              Read
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" />
              </svg>
            </span>
          </button>
        ))}
      </div>
      {current ? (
        <>
          <div ref={scrimRef} className="hb-za7-scrim" onClick={() => setActive(null)} />
          <div
            ref={shellRef}
            className="hb-za7-shell"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            style={{ "--from": current.from ?? "#2f7bff", "--to": current.to ?? "#101a33" } as React.CSSProperties}
          >
            <div className="hb-za7-head">
              {current.eyebrow ? <span className="hb-za7-eyebrow">{current.eyebrow}</span> : null}
              <span className="hb-za7-title">{current.title}</span>
            </div>
            <button ref={closeRef} type="button" className="hb-za7-x" aria-label="Close" onClick={() => setActive(null)}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="m2.5 2.5 7 7M9.5 2.5l-7 7" />
              </svg>
            </button>
            <div className="hb-za7-sheet">
              {typeof current.body === "string" ? <p className="hb-za7-body">{current.body}</p> : current.body}
              {current.action ? (
                <button type="button" className="hb-za7-cta" onClick={() => setActive(null)}>
                  {current.action}
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

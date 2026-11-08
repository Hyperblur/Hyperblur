"use client";

import * as React from "react";

export interface HandCard {
  title: string;
  subtitle: string;
  colors?: [string, string, string];
}

export interface CardHandFanProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  cards?: HandCard[];
  cardWidth?: number;
  spread?: number;
  defaultOpen?: boolean;
  accent?: string;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (index: number | null) => void;
}

const defaultCards: HandCard[] = [
  { title: "Desert Modern", subtitle: "42 pins", colors: ["#c8754a", "#efd2b0", "#3b2a22"] },
  { title: "Nordic Cabin", subtitle: "36 pins", colors: ["#5d7a73", "#d9e3dd", "#1f2b28"] },
  { title: "Tokyo Night", subtitle: "58 pins", colors: ["#6b5bff", "#ff6fae", "#14122b"] },
  { title: "Riviera", subtitle: "27 pins", colors: ["#2f7bff", "#f4e6c8", "#0f2140"] },
  { title: "Brutal Print", subtitle: "19 pins", colors: ["#e8e3d6", "#ff4b2b", "#161616"] },
];

function hash(n: number) {
  let x = Math.imul(n ^ 0x2c1b3c6d, 0x297a2d39) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

const css = `
.hb-vl11 {
  position: relative;
  width: 100%;
  height: calc(var(--hb-vl11-w) * 1.333 * 1.45);
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl11 *, .hb-vl11 *::before, .hb-vl11 *::after { box-sizing: border-box; }
.hb-vl11-c {
  position: absolute;
  left: 50%;
  bottom: 4%;
  width: var(--hb-vl11-w);
  aspect-ratio: 3 / 4;
  margin: 0 0 0 calc(var(--hb-vl11-w) * -0.5);
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: calc(var(--hb-vl11-w) * 0.09);
  background: #141416;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transform-origin: 50% 190%;
  transform: translate(var(--hb-vl11-tx), var(--hb-vl11-ty)) rotate(var(--hb-vl11-r)) scale(var(--hb-vl11-s));
  opacity: var(--hb-vl11-o);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 30px -14px rgba(0, 0, 0, 0.85);
  transition:
    transform 0.7s cubic-bezier(0.34, 1.28, 0.64, 1) var(--hb-vl11-d),
    opacity 0.4s ease,
    box-shadow 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-vl11-c:focus-visible { outline: 2px solid var(--hb-vl11-a); outline-offset: 3px; }
.hb-vl11-c[data-picked="true"] { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 30px 50px -18px rgba(0, 0, 0, 0.95), 0 0 0 1px color-mix(in srgb, var(--hb-vl11-a) 50%, transparent); }
.hb-vl11-art {
  position: absolute;
  inset: 0 0 34% 0;
  overflow: hidden;
  background: linear-gradient(160deg, var(--hb-vl11-c0), var(--hb-vl11-c2));
}
.hb-vl11-art::before {
  content: "";
  position: absolute;
  left: 14%;
  top: 18%;
  width: 52%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--hb-vl11-c1);
  opacity: 0.9;
}
.hb-vl11-art::after {
  content: "";
  position: absolute;
  right: -10%;
  bottom: -20%;
  width: 70%;
  height: 70%;
  border-radius: 40% 40% 0 0;
  background: color-mix(in srgb, var(--hb-vl11-c2) 80%, #000000);
  transform: rotate(-12deg);
}
.hb-vl11-art[data-v="1"]::before { border-radius: 30% 70% 50% 50%; left: 40%; top: 10%; }
.hb-vl11-art[data-v="2"]::before { border-radius: 8%; transform: rotate(18deg); left: 28%; }
.hb-vl11-art[data-v="2"]::after { border-radius: 50%; right: 30%; }
.hb-vl11-art[data-v="3"]::after { border-radius: 0; transform: rotate(0deg); height: 28%; right: 0; width: 100%; bottom: 0; }
.hb-vl11-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--hb-vl11-w) * 0.02);
  height: 34%;
  padding: calc(var(--hb-vl11-w) * 0.07);
  background: linear-gradient(180deg, #19191c, #121214);
}
.hb-vl11-t { overflow: hidden; font-size: calc(var(--hb-vl11-w) * 0.095); font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl11-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.hb-vl11-sub { font-size: calc(var(--hb-vl11-w) * 0.072); color: #8f8f8f; white-space: nowrap; }
.hb-vl11-sw { display: flex; }
.hb-vl11-sw span {
  width: calc(var(--hb-vl11-w) * 0.085);
  height: calc(var(--hb-vl11-w) * 0.085);
  margin-left: calc(var(--hb-vl11-w) * -0.02);
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px #141416;
}
.hb-vl11-hint {
  position: absolute;
  left: 50%;
  top: 0;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: #8f8f8f;
  white-space: nowrap;
  transform: translateX(-50%);
  pointer-events: none;
  transition: opacity 0.3s ease;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl11-c { transition: opacity 0.2s ease; }
}
`;

export function CardHandFan({
  cards = defaultCards,
  cardWidth = 150,
  spread = 11,
  defaultOpen = false,
  accent = "#2f7bff",
  onOpenChange,
  onSelect,
  className,
  style,
  ...rest
}: CardHandFanProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState<number | null>(null);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const n = cards.length;
  const mid = (n - 1) / 2;

  const setOpenState = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  const pick = (index: number | null) => {
    setPicked(index);
    onSelect?.(index);
  };

  const press = (i: number) => {
    if (!open) {
      setOpenState(true);
      return;
    }
    if (picked === null) pick(i);
    else if (picked === i) pick(null);
    else pick(i);
  };

  const layout = (i: number) => {
    const w = cardWidth;
    if (!open) {
      const jitter = (hash(i + 3) - 0.5) * 7;
      return { tx: (i - mid) * 2, ty: -i * 2.5, r: jitter, s: 1, o: 1, z: i, d: 0 };
    }
    if (picked !== null) {
      if (i === picked) return { tx: 0, ty: -w * 0.06, r: 0, s: 1.06, o: 1, z: n + 2, d: 0 };
      const side = i < picked ? -1 : 1;
      return { tx: side * w * 0.08, ty: w * 0.05, r: side * 4 + (i - mid) * 2, s: 0.86, o: 0.35, z: i, d: 0 };
    }
    let r = (i - mid) * spread;
    let ty = 0;
    if (hover !== null) {
      if (i === hover) ty = -w * 0.16;
      else r += i < hover ? -2.5 : 2.5;
    }
    return { tx: 0, ty, r, s: 1, o: 1, z: i === hover ? n + 1 : i, d: open ? Math.abs(i - mid) * 0.03 : 0 };
  };

  const onKey = (event: React.KeyboardEvent, i: number) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (picked !== null) pick(null);
      else if (open) setOpenState(false);
      return;
    }
    if (!open) return;
    let next = -1;
    if (event.key === "ArrowRight") next = Math.min(n - 1, i + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, i - 1);
    if (next < 0) return;
    event.preventDefault();
    refs.current[next]?.focus();
    if (picked !== null) pick(next);
  };

  const hint = !open ? "Click to fan out" : picked === null ? "Pick a board" : `${cards[picked]?.title} selected`;

  return (
    <div
      className={["hb-vl11", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl11-a": accent, "--hb-vl11-w": `${cardWidth}px`, ...style } as React.CSSProperties}
      role="group"
      aria-label="Boards"
      onPointerLeave={() => setHover(null)}
      {...rest}
    >
      <style href="hb-card-hand-fan" precedence="default">{css}</style>
      <span className="hb-vl11-hint" aria-live="polite">
        {hint}
      </span>
      {cards.map((card, i) => {
        const l = layout(i);
        const [c0, c1, c2] = card.colors ?? ["#c8754a", "#efd2b0", "#3b2a22"];
        return (
          <button
            key={card.title + i}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            className="hb-vl11-c"
            data-picked={picked === i ? "true" : "false"}
            aria-pressed={picked === i}
            aria-label={`${card.title}, ${card.subtitle}`}
            tabIndex={!open ? (i === n - 1 ? 0 : -1) : 0}
            style={
              {
                "--hb-vl11-tx": `${l.tx.toFixed(1)}px`,
                "--hb-vl11-ty": `${l.ty.toFixed(1)}px`,
                "--hb-vl11-r": `${l.r.toFixed(2)}deg`,
                "--hb-vl11-s": l.s,
                "--hb-vl11-o": l.o,
                "--hb-vl11-d": `${l.d.toFixed(2)}s`,
                "--hb-vl11-c0": c0,
                "--hb-vl11-c1": c1,
                "--hb-vl11-c2": c2,
                zIndex: l.z,
              } as React.CSSProperties
            }
            onPointerEnter={() => open && picked === null && setHover(i)}
            onFocus={() => open && picked === null && setHover(i)}
            onBlur={() => setHover(null)}
            onClick={() => press(i)}
            onKeyDown={(event) => onKey(event, i)}
          >
            <span className="hb-vl11-art" data-v={i % 4} />
            <span className="hb-vl11-meta">
              <span className="hb-vl11-t">{card.title}</span>
              <span className="hb-vl11-row">
                <span className="hb-vl11-sub">{card.subtitle}</span>
                <span className="hb-vl11-sw" aria-hidden="true">
                  <span style={{ background: c0 }} />
                  <span style={{ background: c1 }} />
                  <span style={{ background: c2 }} />
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

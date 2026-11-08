"use client";

import * as React from "react";

export interface HoverDirectionCaptionItem {
  title: string;
  kicker: string;
  detail: string;
  background: string;
  href?: string;
}

export interface HoverDirectionCaptionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: HoverDirectionCaptionItem[];
  columns?: number;
  ratio?: number;
  tint?: string;
  accent?: string;
  autoPlay?: boolean;
}

type Edge = "top" | "right" | "bottom" | "left";

const defaults: HoverDirectionCaptionItem[] = [
  { title: "Tidewater House", kicker: "Residential", detail: "Lisbon · 2025", background: "linear-gradient(180deg, transparent 62%, #20303a 62%), linear-gradient(90deg, transparent 18%, #e9e3d6 18% 58%, transparent 58%), linear-gradient(180deg, #9ec3d8 0%, #d8e6ee 100%)" },
  { title: "Copper Pavilion", kicker: "Cultural", detail: "Oslo · 2024", background: "radial-gradient(70% 50% at 50% 100%, #3b1d12 0%, transparent 70%), linear-gradient(160deg, transparent 50%, #b8673a 50% 72%, transparent 72%), linear-gradient(180deg, #f2c79a 0%, #d98a5a 100%)" },
  { title: "Fernhall Studio", kicker: "Workplace", detail: "Kyoto · 2023", background: "repeating-linear-gradient(90deg, rgba(20,40,25,.5) 0 3px, transparent 3px 18px), radial-gradient(circle at 70% 30%, #d9f2c2 0 12%, transparent 13%), linear-gradient(180deg, #6f9a62 0%, #1d3522 100%)" },
];

const css = `
.hb-wg11 { --hb-wg11-accent: #2f7bff; --hb-wg11-tint: rgba(10,10,10,.72); box-sizing: border-box; width: 100%; display: grid; grid-template-columns: repeat(var(--hb-wg11-cols), minmax(0, 1fr)); gap: 8px; font-family: inherit; color: #ededed; }
.hb-wg11 *, .hb-wg11 *::before, .hb-wg11 *::after { box-sizing: border-box; }
.hb-wg11-card { position: relative; display: block; aspect-ratio: var(--hb-wg11-ratio); border-radius: 12px; overflow: hidden; color: inherit; text-decoration: none; outline: none; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), 0 14px 26px -18px rgba(0,0,0,.95); -webkit-tap-highlight-color: transparent; cursor: pointer; }
.hb-wg11-card:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg11-accent); }
.hb-wg11-img { position: absolute; inset: -6%; background: var(--hb-wg11-bg); background-size: cover; transition: transform .8s cubic-bezier(.16,1,.3,1); }
.hb-wg11-card[data-open="true"] .hb-wg11-img { transform: scale(1.06) translate(var(--hb-wg11-ix, 0px), var(--hb-wg11-iy, 0px)); }
.hb-wg11-over { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 3px; padding: 10px; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wg11-tint) 55%, transparent), var(--hb-wg11-tint)); backdrop-filter: blur(3px) saturate(1.2); -webkit-backdrop-filter: blur(3px) saturate(1.2); transform: translate(0, 101%); will-change: transform; }
.hb-wg11-line { display: block; overflow: hidden; }
.hb-wg11-line > span { display: block; transform: translateY(110%); transition: transform .5s cubic-bezier(.2,.9,.25,1); }
.hb-wg11-card[data-open="true"] .hb-wg11-line > span { transform: none; }
.hb-wg11-card[data-open="true"] .hb-wg11-line:nth-child(2) > span { transition-delay: .06s; }
.hb-wg11-card[data-open="true"] .hb-wg11-line:nth-child(3) > span { transition-delay: .12s; }
.hb-wg11-kicker { font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; color: color-mix(in srgb, var(--hb-wg11-accent) 55%, #fff); }
.hb-wg11-title { font-size: 12.5px; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; }
.hb-wg11-detail { display: flex; align-items: center; justify-content: space-between; font-size: 9.5px; color: rgba(237,237,237,.7); }
.hb-wg11-arrow { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg11-img, .hb-wg11-line > span { transition: none; }
}
`;

const offset: Record<Edge, string> = {
  top: "translate(0, -101%)",
  right: "translate(101%, 0)",
  bottom: "translate(0, 101%)",
  left: "translate(-101%, 0)",
};

function edgeOf(el: HTMLElement, cx: number, cy: number): Edge {
  const r = el.getBoundingClientRect();
  const x = (cx - r.left) / (r.width || 1) - 0.5;
  const y = (cy - r.top) / (r.height || 1) - 0.5;
  const ratio = (r.width || 1) / (r.height || 1);
  if (Math.abs(x) * ratio > Math.abs(y)) return x > 0 ? "right" : "left";
  return y > 0 ? "bottom" : "top";
}

export function HoverDirectionCaption({
  items = defaults,
  columns = 3,
  ratio = 0.78,
  tint = "rgba(10,10,10,.72)",
  accent = "#2f7bff",
  autoPlay = true,
  className = "",
  style,
  ...rest
}: HoverDirectionCaptionProps) {
  const overRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const anims = React.useRef<(Animation | null)[]>([]);
  const [open, setOpen] = React.useState<boolean[]>(() => items.map(() => false));
  const [engaged, setEngaged] = React.useState(false);
  const lastPointer = React.useRef("mouse");
  const n = items.length;

  const move = React.useCallback((i: number, from: string, to: string, into: boolean) => {
    const el = overRefs.current[i];
    const card = cardRefs.current[i];
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anims.current[i]?.cancel();
    const shift = into ? from : to;
    const m = /translate\((-?[\d.]+)%, (-?[\d.]+)%\)/.exec(shift);
    const ix = m ? -parseFloat(m[1]) * 0.04 : 0;
    const iy = m ? -parseFloat(m[2]) * 0.04 : 0;
    card.style.setProperty("--hb-wg11-ix", `${ix.toFixed(2)}px`);
    card.style.setProperty("--hb-wg11-iy", `${iy.toFixed(2)}px`);
    anims.current[i] = el.animate([{ transform: from }, { transform: to }], {
      duration: reduce ? 0 : into ? 520 : 420,
      easing: into ? "cubic-bezier(.2,.9,.25,1)" : "cubic-bezier(.5,0,.75,0)",
      fill: "forwards",
    });
  }, []);

  const set = React.useCallback((i: number, v: boolean) => {
    setOpen((prev) => {
      if (prev[i] === v) return prev;
      const next = prev.slice();
      next[i] = v;
      return next;
    });
  }, []);

  const enter = React.useCallback(
    (i: number, edge: Edge) => {
      move(i, offset[edge], "translate(0, 0)", true);
      set(i, true);
    },
    [move, set],
  );
  const leave = React.useCallback(
    (i: number, edge: Edge) => {
      move(i, "translate(0, 0)", offset[edge], false);
      set(i, false);
    },
    [move, set],
  );

  React.useEffect(() => {
    if (!autoPlay || engaged || n === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let shown = -1;
    const id = window.setInterval(() => {
      if (shown >= 0) leave(shown, "right");
      shown = i;
      enter(i, "left");
      i = (i + 1) % n;
    }, 1300);
    return () => {
      window.clearInterval(id);
    };
  }, [autoPlay, engaged, n, enter, leave]);

  React.useEffect(() => {
    const list = anims.current;
    return () => list.forEach((a) => a?.cancel());
  }, []);

  return (
    <div
      className={`hb-wg11 ${className}`}
      style={{ "--hb-wg11-accent": accent, "--hb-wg11-tint": tint, "--hb-wg11-cols": Math.max(1, columns), "--hb-wg11-ratio": String(ratio), ...style } as React.CSSProperties}
      role="list"
      {...rest}
    >
      <style href="hb-hover-direction-caption" precedence="default">{css}</style>
      {items.map((item, i) => (
        <div role="listitem" key={`${item.title}-${i}`} style={{ display: "contents" }}>
          <a
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            href={item.href ?? "#"}
            className="hb-wg11-card"
            data-open={open[i] ? "true" : "false"}
            aria-label={`${item.title}, ${item.kicker}, ${item.detail}`}
            style={{ "--hb-wg11-bg": item.background } as React.CSSProperties}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              if (!engaged) {
                setEngaged(true);
                items.forEach((_, j) => {
                  if (j !== i && open[j]) leave(j, "bottom");
                });
              }
              enter(i, edgeOf(e.currentTarget, e.clientX, e.clientY));
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              leave(i, edgeOf(e.currentTarget, e.clientX, e.clientY));
            }}
            onFocus={() => {
              if (!engaged) setEngaged(true);
              if (!open[i]) enter(i, "bottom");
            }}
            onBlur={() => {
              if (lastPointer.current !== "mouse") return;
              if (open[i] && !(cardRefs.current[i]?.matches(":hover") ?? false)) leave(i, "bottom");
            }}
            onClick={(e) => {
              if (lastPointer.current === "mouse") {
                if (!item.href) e.preventDefault();
                return;
              }
              if (!open[i]) {
                e.preventDefault();
                setEngaged(true);
                items.forEach((_, j) => {
                  if (j !== i && open[j]) leave(j, "bottom");
                });
                enter(i, "bottom");
              } else if (!item.href) e.preventDefault();
            }}
          >
            <span className="hb-wg11-img" aria-hidden="true" />
            <span
              ref={(el) => {
                overRefs.current[i] = el;
              }}
              className="hb-wg11-over"
              aria-hidden="true"
            >
              <span className="hb-wg11-line">
                <span className="hb-wg11-kicker">{item.kicker}</span>
              </span>
              <span className="hb-wg11-line">
                <span className="hb-wg11-title">{item.title}</span>
              </span>
              <span className="hb-wg11-line">
                <span className="hb-wg11-detail">
                  {item.detail}
                  <svg className="hb-wg11-arrow" viewBox="0 0 14 14">
                    <path d="M3.5 10.5l7-7M5 3.5h5.5V9" />
                  </svg>
                </span>
              </span>
            </span>
          </a>
        </div>
      ))}
    </div>
  );
}

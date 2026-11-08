"use client";

import * as React from "react";

export interface HoverSpotlightListItem {
  title: string;
  detail: string;
  status?: string;
  tone?: string;
}

export interface HoverSpotlightListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: HoverSpotlightListItem[];
  accent?: string;
  radius?: number;
  autoPlay?: boolean;
  onSelect?: (index: number, item: HoverSpotlightListItem) => void;
}

const defaults: HoverSpotlightListItem[] = [
  { title: "Payments webhook", detail: "POST /v2/events · 41ms p95", status: "Healthy", tone: "#4ade80" },
  { title: "Search indexer", detail: "Queue 1,284 jobs · 3 workers", status: "Busy", tone: "#fbbf24" },
  { title: "Image resizer", detail: "Edge · 12 regions", status: "Healthy", tone: "#4ade80" },
  { title: "Email digest", detail: "Next run 18:00 UTC", status: "Paused", tone: "#8f8f8f" },
];

const css = `
.hb-wg4 { --hb-wg4-accent: #2f7bff; --hb-wg4-r: 110px; --hb-wg4-x: -999px; --hb-wg4-y: -999px; --hb-wg4-o: 0; position: relative; box-sizing: border-box; width: 100%; display: grid; gap: 6px; font-family: inherit; color: #ededed; isolation: isolate; }
.hb-wg4 *, .hb-wg4 *::before, .hb-wg4 *::after { box-sizing: border-box; }
.hb-wg4-glide { position: absolute; left: 0; right: 0; top: 0; z-index: 0; border-radius: 11px; background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015)); box-shadow: inset 0 1px 0 rgba(255,255,255,.05); opacity: 0; transform: translateY(var(--hb-wg4-gy, 0px)); height: var(--hb-wg4-gh, 0px); transition: transform .42s cubic-bezier(.2,.9,.25,1), height .42s cubic-bezier(.2,.9,.25,1), opacity .3s ease; pointer-events: none; }
.hb-wg4[data-glide="true"] .hb-wg4-glide { opacity: 1; }
.hb-wg4-row { appearance: none; margin: 0; font: inherit; color: inherit; text-align: left; cursor: pointer; position: relative; z-index: 1; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 10px; width: 100%; padding: 9px 11px; border: 0; border-radius: 11px; background: rgba(17,17,17,.7); outline: none; -webkit-tap-highlight-color: transparent; }
.hb-wg4-row::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: radial-gradient(var(--hb-wg4-r) circle at calc(var(--hb-wg4-x) - var(--hb-wg4-ox, 0px)) calc(var(--hb-wg4-y) - var(--hb-wg4-oy, 0px)), color-mix(in srgb, var(--hb-wg4-accent) 95%, #fff 5%), color-mix(in srgb, var(--hb-wg4-accent) 30%, transparent) 45%, transparent 75%), #232323; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); pointer-events: none; }
.hb-wg4-row::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(calc(var(--hb-wg4-r) * .9) circle at calc(var(--hb-wg4-x) - var(--hb-wg4-ox, 0px)) calc(var(--hb-wg4-y) - var(--hb-wg4-oy, 0px)), color-mix(in srgb, var(--hb-wg4-accent) 9%, transparent), transparent 70%); opacity: var(--hb-wg4-o); pointer-events: none; transition: opacity .3s ease; }
.hb-wg4-row:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg4-accent); }
.hb-wg4-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wg4-tone); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wg4-tone) 18%, transparent); }
.hb-wg4-main { min-width: 0; display: grid; gap: 2px; }
.hb-wg4-title { font-size: 12.5px; font-weight: 600; letter-spacing: -.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wg4-detail { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wg4-status { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; color: #a1a1a1; }
.hb-wg4-chev { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .35; transform: translateX(-3px); transition: transform .35s cubic-bezier(.2,.9,.25,1), opacity .3s ease; }
.hb-wg4-row[data-hot="true"] .hb-wg4-chev, .hb-wg4-row:focus-visible .hb-wg4-chev { opacity: 1; transform: none; color: #ededed; }
.hb-wg4-row[aria-current="true"] .hb-wg4-title::after { content: ""; display: inline-block; width: 5px; height: 5px; margin-left: 7px; vertical-align: middle; border-radius: 50%; background: var(--hb-wg4-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-wg4-glide, .hb-wg4-chev, .hb-wg4-row::after { transition: none; }
}
`;

export function HoverSpotlightList({
  items = defaults,
  accent = "#2f7bff",
  radius = 110,
  autoPlay = true,
  onSelect,
  className = "",
  style,
  ...rest
}: HoverSpotlightListProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = React.useState(-1);
  const n = items.length;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = () => rowRefs.current.slice(0, n).filter((r): r is HTMLButtonElement => !!r);
    let inside = false;
    let px = 0;
    let py = 0;
    let cx = root.offsetWidth * 0.3;
    let cy = 0;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let hot = -1;
    let glow = 0;

    const setHot = (i: number) => {
      if (i === hot) return;
      const list = rows();
      if (hot >= 0 && list[hot]) list[hot].dataset.hot = "false";
      hot = i;
      if (i >= 0 && list[i]) {
        list[i].dataset.hot = "true";
        root.style.setProperty("--hb-wg4-gy", `${list[i].offsetTop}px`);
        root.style.setProperty("--hb-wg4-gh", `${list[i].offsetHeight}px`);
        root.dataset.glide = "true";
      } else {
        root.dataset.glide = "false";
      }
    };

    const paint = () => {
      root.style.setProperty("--hb-wg4-x", `${cx.toFixed(1)}px`);
      root.style.setProperty("--hb-wg4-y", `${cy.toFixed(1)}px`);
      root.style.setProperty("--hb-wg4-o", glow.toFixed(3));
      rows().forEach((r) => {
        r.style.setProperty("--hb-wg4-ox", `${r.offsetLeft}px`);
        r.style.setProperty("--hb-wg4-oy", `${r.offsetTop}px`);
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      const phase = (Math.sin(t * 0.55) + 1) / 2;
      const ax = w * (0.18 + 0.64 * ((Math.sin(t * 0.9) + 1) / 2));
      const ay = h * (0.08 + 0.84 * phase);
      const tx = inside ? px : autoPlay ? ax : cx;
      const ty = inside ? py : autoPlay ? ay : cy;
      const k = 1 - Math.exp(-dt * (inside ? 18 : 4));
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      glow += ((inside || autoPlay ? 1 : 0) - glow) * (1 - Math.exp(-dt * 6));
      if (!inside) {
        if (autoPlay) {
          const list = rows();
          let idx = -1;
          list.forEach((r, i) => {
            if (cy >= r.offsetTop && cy <= r.offsetTop + r.offsetHeight) idx = i;
          });
          if (idx >= 0) setHot(idx);
        } else setHot(-1);
      }
      paint();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? root.offsetWidth / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      inside = true;
      let idx = -1;
      rows().forEach((row, i) => {
        if (py >= row.offsetTop && py <= row.offsetTop + row.offsetHeight) idx = i;
      });
      setHot(idx);
      if (reduce) {
        cx = px;
        cy = py;
        glow = 1;
        paint();
      }
    };
    const onLeave = () => {
      inside = false;
      if (reduce || !autoPlay) setHot(-1);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 1400);
    };
    const onFocusIn = (e: FocusEvent) => {
      const i = rows().indexOf(e.target as HTMLButtonElement);
      if (i < 0) return;
      const row = rows()[i];
      inside = true;
      px = row.offsetLeft + row.offsetWidth * 0.5;
      py = row.offsetTop + row.offsetHeight * 0.5;
      setHot(i);
      if (reduce) {
        cx = px;
        cy = py;
        glow = 1;
        paint();
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) onLeave();
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    if (reduce) paint();
    start();
    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [n, autoPlay]);

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      rowRefs.current[next]?.focus();
    }
  };

  const vars = { "--hb-wg4-accent": accent, "--hb-wg4-r": `${radius}px` } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-wg4 ${className}`} style={{ ...vars, ...style }} data-glide="false" role="list" {...rest}>
      <style href="hb-hover-spotlight-list" precedence="default">{css}</style>
      <span className="hb-wg4-glide" aria-hidden="true" />
      {items.map((item, i) => (
        <div role="listitem" key={`${item.title}-${i}`} style={{ display: "contents" }}>
          <button
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            type="button"
            className="hb-wg4-row"
            data-hot="false"
            aria-current={current === i ? "true" : undefined}
            onKeyDown={(e) => onKey(e, i)}
            onClick={() => {
              setCurrent(i);
              onSelect?.(i, item);
            }}
            style={{ "--hb-wg4-tone": item.tone ?? accent } as React.CSSProperties}
          >
            <span className="hb-wg4-dot" aria-hidden="true" />
            <span className="hb-wg4-main">
              <span className="hb-wg4-title">{item.title}</span>
              <span className="hb-wg4-detail">{item.detail}</span>
            </span>
            <span className="hb-wg4-status">
              {item.status}
              <svg className="hb-wg4-chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M4.5 2.5L8 6l-3.5 3.5" />
              </svg>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

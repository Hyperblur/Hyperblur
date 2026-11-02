"use client";

import * as React from "react";

export interface Candle {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CandlestickChartProps extends React.HTMLAttributes<HTMLDivElement> {
  candles?: Candle[];
  height?: number;
  colors?: { up?: string; down?: string };
  showVolume?: boolean;
  priceFormatter?: (n: number) => string;
  volumeFormatter?: (n: number) => string;
  animate?: boolean;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const css = `
.hb-cdl { position: relative; display: block; width: 100%; min-width: 0; box-sizing: border-box; color: #ededed; font-family: inherit; touch-action: pan-y; }
.hb-cdl *, .hb-cdl *::before, .hb-cdl *::after { box-sizing: border-box; }
.hb-cdl-svg { display: block; width: 100%; overflow: visible; outline: none; cursor: crosshair; }
.hb-cdl-svg:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 4px; border-radius: 4px; }
.hb-cdl-grid { stroke: #262626; stroke-width: 1; stroke-dasharray: 3 5; }
.hb-cdl-base { stroke: #262626; stroke-width: 1; }
.hb-cdl-tick {
  fill: #8f8f8f;
  font-size: 10.5px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-cdl-xl { fill: #8f8f8f; font-size: 10.5px; font-family: inherit; transition: fill .15s ease; }
.hb-cdl-xl[data-on="true"] { fill: #ededed; }
.hb-cdl-c {
  animation: hb-cdl-in .55s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-cdl-i, 0) * 12ms);
  transition: opacity .15s ease;
}
.hb-cdl-c[data-dim="true"] { opacity: .45; }
.hb-cdl-v {
  animation: hb-cdl-vol .55s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-cdl-i, 0) * 12ms);
  transition: opacity .15s ease;
}
.hb-cdl-v[data-dim="true"] { opacity: .35; }
.hb-cdl-cross { stroke: #5a5a5a; stroke-width: 1; stroke-dasharray: 3 4; pointer-events: none; }
.hb-cdl-tagbg { fill: #ededed; }
.hb-cdl-tagtx {
  fill: #0a0a0a;
  font-size: 10.5px;
  font-weight: 600;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-cdl-tip {
  position: absolute;
  z-index: 2;
  min-width: 132px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #171717;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .8);
  font-size: 11px;
  line-height: 1.45;
  white-space: nowrap;
  pointer-events: none;
}
.hb-cdl-tip-h { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 2px; color: #8f8f8f; }
.hb-cdl-tip-h b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-cdl-tip-r { display: flex; justify-content: space-between; gap: 14px; color: #8f8f8f; }
.hb-cdl-tip-r b {
  color: #ededed;
  font-weight: 500;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-cdl[data-animate="false"] .hb-cdl-c, .hb-cdl[data-animate="false"] .hb-cdl-v { animation: none; }
@keyframes hb-cdl-in {
  from { opacity: 0; transform: scaleY(0); }
}
@keyframes hb-cdl-vol {
  from { opacity: 0; transform: scaleY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-cdl-c, .hb-cdl-v { animation: none !important; }
  .hb-cdl-c, .hb-cdl-v, .hb-cdl-xl { transition: none !important; }
}
`;

function f(n: number) {
  return n.toFixed(2);
}

function hash(n: number) {
  let x = (n + 0x9e3779b9) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

export function sampleCandles(count = 48, base = 100, seed = 0): Candle[] {
  const out: Candle[] = [];
  const total = Math.max(1, Math.round(count));
  let prev = Math.round(base * 100);
  const start = Date.UTC(2026, 8, 1);
  const salt = Math.round(seed) * 7919;
  for (let i = 0; i < total; i++) {
    const open = prev;
    const drift = (hash(Math.floor(i / 7) + 313 + salt) % 5) - 2;
    const step = Math.max(1, Math.round(open * 0.006));
    const move = ((hash(i * 3 + 1 + salt) % 2001) - 1000) / 1000;
    const delta = Math.round(move * step * 3) + drift * Math.round(step / 2);
    const close = Math.max(100, open + delta);
    const body = Math.max(open, close);
    const floor = Math.min(open, close);
    const high = body + 1 + (hash(i * 5 + 2 + salt) % (step * 2));
    const low = Math.max(50, floor - 1 - (hash(i * 7 + 3 + salt) % (step * 2)));
    const volume = 900 + (hash(i * 11 + 4 + salt) % 1800) + Math.abs(delta) * Math.round(400 / step);
    const d = new Date(start + i * 86400000);
    out.push({
      label: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`,
      open: open / 100,
      high: high / 100,
      low: low / 100,
      close: close / 100,
      volume,
    });
    prev = close;
  }
  return out;
}

function niceStep(raw: number) {
  if (!(raw > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / exp;
  const nice = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return nice * exp;
}

function useWidth(fallback: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const priceNf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const volNf = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

const DEFAULT_CANDLES = sampleCandles(48, 100);

export function CandlestickChart({
  candles = DEFAULT_CANDLES,
  height = 240,
  colors,
  showVolume = true,
  priceFormatter,
  volumeFormatter,
  animate = true,
  className = "",
  ...rest
}: CandlestickChartProps) {
  const [ref, width] = useWidth(360);
  const [cross, setCross] = React.useState<{ i: number; y: number | null } | null>(null);

  const up = colors?.up ?? "#34d399";
  const down = colors?.down ?? "#fb7185";
  const price = priceFormatter ?? ((n: number) => priceNf.format(n));
  const vol = volumeFormatter ?? ((n: number) => volNf.format(n));

  const n = candles.length;
  const hi = n ? Math.max(...candles.map((c) => c.high)) : 1;
  const lo = n ? Math.min(...candles.map((c) => c.low)) : 0;
  const rawSpan = Math.max(hi - lo, Math.abs(hi) * 0.01, 0.01);
  const step = niceStep(rawSpan / 4);
  const yMin = Math.floor((lo - rawSpan * 0.04) / step) * step;
  let yMax = Math.ceil((hi + rawSpan * 0.04) / step) * step;
  if (yMax <= yMin) yMax = yMin + step;
  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + step / 1000 && ticks.length < 10; v += step) ticks.push(v);

  const padL = 4;
  const padR = Math.max(40, ...ticks.map((t) => price(t).length * 6.4 + 12));
  const padT = 8;
  const padB = 20;
  const volH = showVolume ? Math.max(26, Math.round(height * 0.2)) : 0;
  const vGap = showVolume ? 8 : 0;
  const panelH = Math.max(20, height - padT - padB - volH - vGap);
  const innerW = Math.max(1, width - padL - padR);
  const slot = innerW / Math.max(1, n);
  const bodyW = Math.max(1.5, Math.min(slot * 0.62, 14));
  const yOf = (v: number) => padT + panelH - ((v - yMin) / (yMax - yMin)) * panelH;
  const xOf = (i: number) => padL + slot * (i + 0.5);
  const volTop = padT + panelH + vGap;
  const maxVol = Math.max(1, ...candles.map((c) => c.volume ?? 0));
  const every = Math.max(1, Math.ceil(52 / slot));

  const locate = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = width / Math.max(1, rect.width);
    const vx = (e.clientX - rect.left) * sx;
    const vy = (e.clientY - rect.top) * (height / Math.max(1, rect.height));
    const i = Math.min(n - 1, Math.max(0, Math.floor((vx - padL) / slot)));
    setCross({ i, y: vy >= padT && vy <= padT + panelH ? vy : null });
  };

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const cur = cross?.i ?? n - 1;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = Math.max(0, cur - 1);
    else if (e.key === "ArrowRight") next = Math.min(n - 1, cur + 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "Escape") {
      setCross(null);
      return;
    }
    if (next !== null && n > 0) {
      e.preventDefault();
      setCross({ i: next, y: yOf(candles[next].close) });
    }
  };

  const first = candles[0];
  const last = candles[n - 1];
  const summary = n
    ? `Candlestick chart with ${n} candles from ${first.label} to ${last.label}. Opened at ${price(first.open)}, closed at ${price(last.close)}, high ${price(hi)}, low ${price(lo)}.`
    : "Candlestick chart with no data";

  const act = cross && n ? candles[cross.i] : null;
  let tip: React.ReactNode = null;
  if (act && cross) {
    const x = xOf(cross.i);
    const flip = x > width * 0.55;
    const change = act.open ? ((act.close - act.open) / act.open) * 100 : 0;
    tip = (
      <div
        className="hb-cdl-tip"
        aria-hidden="true"
        style={{
          left: x,
          top: padT + 4,
          transform: flip ? "translateX(calc(-100% - 14px))" : "translateX(14px)",
        }}
      >
        <div className="hb-cdl-tip-h">
          <span>{act.label}</span>
          <b style={{ color: act.close >= act.open ? up : down }}>
            {`${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}
          </b>
        </div>
        <div className="hb-cdl-tip-r">
          Open <b>{price(act.open)}</b>
        </div>
        <div className="hb-cdl-tip-r">
          High <b>{price(act.high)}</b>
        </div>
        <div className="hb-cdl-tip-r">
          Low <b>{price(act.low)}</b>
        </div>
        <div className="hb-cdl-tip-r">
          Close <b>{price(act.close)}</b>
        </div>
        {typeof act.volume === "number" ? (
          <div className="hb-cdl-tip-r">
            Volume <b>{vol(act.volume)}</b>
          </div>
        ) : null}
      </div>
    );
  }

  const tagY = cross && cross.y !== null ? cross.y : null;
  const tagPrice = tagY !== null ? yMax - ((tagY - padT) / panelH) * (yMax - yMin) : 0;
  const tagLabel = tagY !== null ? price(tagPrice) : "";
  const tagW = padR - 2;

  return (
    <div
      ref={ref}
      className={`hb-cdl ${className}`}
      data-animate={animate ? "true" : "false"}
      {...rest}
    >
      <style href="hb-candlestick-chart" precedence="default">{css}</style>
      <div style={{ position: "relative" }} onPointerLeave={() => setCross(null)}>
        <svg
          className="hb-cdl-svg"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={summary}
          tabIndex={0}
          onPointerMove={locate}
          onPointerDown={locate}
          onKeyDown={onKeyDown}
          onFocus={(e) => {
            if (!cross && n > 0 && e.currentTarget.matches(":focus-visible")) {
              setCross({ i: n - 1, y: yOf(candles[n - 1].close) });
            }
          }}
          onBlur={() => setCross(null)}
        >
          {ticks.map((t, i) => (
            <g key={i}>
              <line
                className={i === 0 ? "hb-cdl-base" : "hb-cdl-grid"}
                x1={padL}
                x2={width - padR}
                y1={f(yOf(t))}
                y2={f(yOf(t))}
              />
              <text className="hb-cdl-tick" x={width - padR + 8} y={f(yOf(t))} dominantBaseline="middle">
                {price(t)}
              </text>
            </g>
          ))}
          {candles.map((c, i) => {
            const isUp = c.close >= c.open;
            const color = isUp ? up : down;
            const x = xOf(i);
            const yTop = yOf(Math.max(c.open, c.close));
            const yBot = yOf(Math.min(c.open, c.close));
            const bh = Math.max(1, yBot - yTop);
            const mid = (yTop + yBot) / 2;
            const dim = cross !== null && cross.i !== i;
            const vh = showVolume ? ((c.volume ?? 0) / maxVol) * volH : 0;
            return (
              <g key={i}>
                <g
                  className="hb-cdl-c"
                  data-dim={dim ? "true" : "false"}
                  style={{
                    transformOrigin: `${f(x)}px ${f(mid)}px`,
                    ["--hb-cdl-i" as string]: i,
                  }}
                >
                  <line x1={f(x)} x2={f(x)} y1={f(yOf(c.high))} y2={f(yOf(c.low))} stroke={color} strokeWidth={1.25} />
                  <rect
                    x={f(x - bodyW / 2)}
                    y={f(yTop)}
                    width={f(bodyW)}
                    height={f(bh)}
                    rx={Math.min(1.5, bodyW / 4).toFixed(2)}
                    fill={color}
                  />
                </g>
                {showVolume && vh > 0 ? (
                  <rect
                    className="hb-cdl-v"
                    data-dim={dim ? "true" : "false"}
                    x={f(x - bodyW / 2)}
                    y={f(volTop + volH - vh)}
                    width={f(bodyW)}
                    height={f(vh)}
                    fill={color}
                    fillOpacity={0.45}
                    style={{
                      transformOrigin: `${f(x)}px ${f(volTop + volH)}px`,
                      ["--hb-cdl-i" as string]: i,
                    }}
                  />
                ) : null}
              </g>
            );
          })}
          {Array.from({ length: n }, (_, i) =>
            i % every === 0 ? (
              <text
                key={i}
                className="hb-cdl-xl"
                data-on={cross && cross.i === i ? "true" : "false"}
                x={f(xOf(i))}
                y={height - 5}
                textAnchor="middle"
              >
                {candles[i].label}
              </text>
            ) : null
          )}
          {cross && n ? (
            <g>
              <line
                className="hb-cdl-cross"
                x1={f(xOf(cross.i))}
                x2={f(xOf(cross.i))}
                y1={padT}
                y2={volTop + volH}
              />
              {tagY !== null ? (
                <>
                  <line className="hb-cdl-cross" x1={padL} x2={width - padR} y1={f(tagY)} y2={f(tagY)} />
                  <rect
                    className="hb-cdl-tagbg"
                    x={width - padR + 2}
                    y={f(tagY - 9)}
                    width={f(tagW)}
                    height={18}
                    rx={4}
                  />
                  <text
                    className="hb-cdl-tagtx"
                    x={f(width - padR + 2 + tagW / 2)}
                    y={f(tagY)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {tagLabel}
                  </text>
                </>
              ) : null}
            </g>
          ) : null}
        </svg>
        {tip}
      </div>
    </div>
  );
}

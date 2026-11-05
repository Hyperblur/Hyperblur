"use client";

import * as React from "react";

export interface MapRouteStatsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  title?: string;
  date?: string;
  distanceKm?: number;
  movingTimeSec?: number;
  elevationGain?: number;
  seed?: number;
  accent?: string;
  paceColor?: string;
  onScrub?: (fraction: number, km: number) => void;
}

const N = 160;
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function mix32(n: number) {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function rnd(seed: number, a: number) {
  return mix32(seed * 374761393 + a * 668265263 + 1013904223);
}

function clock(sec: number) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${r}` : `${m}:${r}`;
}

function buildData(seed: number, gain: number, avgPace: number) {
  const p1 = rnd(seed, 1) * 6;
  const p2 = rnd(seed, 2) * 6;
  const a1 = 0.18 + rnd(seed, 3) * 0.12;
  const a2 = 0.06 + rnd(seed, 4) * 0.08;
  const raw: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * Math.PI * 2;
    const r = 1 + a1 * Math.sin(3 * t + p1) + a2 * Math.sin(5 * t + p2);
    raw.push([Math.cos(t) * r * 1.25, Math.sin(t) * r]);
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y] of raw) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const sc = 80 / Math.max(maxX - minX, maxY - minY);
  const route = raw.map(([x, y]) => [50 + (x - (minX + maxX) / 2) * sc, 50 + (y - (minY + maxY) / 2) * sc] as [number, number]);
  const q1 = rnd(seed, 5) * 6;
  const q2 = rnd(seed, 6) * 6;
  const elev: number[] = [];
  for (let i = 0; i < N; i++) {
    const f = i / (N - 1);
    elev.push(Math.sin(f * Math.PI * 2 + q1) * 0.55 + Math.sin(f * Math.PI * 5 + q2) * 0.3 + Math.sin(f * Math.PI * 11 + q1) * 0.12);
  }
  const lo = Math.min(...elev);
  const hi = Math.max(...elev);
  const span = Math.max(20, gain * 0.42);
  const base = 12 + Math.round(rnd(seed, 7) * 20);
  const meters = elev.map((e) => base + ((e - lo) / (hi - lo || 1)) * span);
  const pace = meters.map((m, i) => {
    const prev = meters[Math.max(0, i - 3)];
    const grade = (m - prev) / 3;
    return avgPace + grade * 9 + Math.sin(i * 0.37 + q2) * 6;
  });
  return { route, meters, pace, lo: base, hi: base + span };
}

function subscribeMotion(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

const css = `
.hb-ub6 {
  --hb-ub6-a: #ff4d4d;
  --hb-ub6-pc: #7fb3ff;
  box-sizing: border-box;
  display: grid;
  gap: 8px;
  width: 100%;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #262626;
  background: #111111;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-ub6 *, .hb-ub6 *::before, .hb-ub6 *::after { box-sizing: border-box; }
.hb-ub6-hd { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; min-width: 0; padding: 0 2px; }
.hb-ub6-tt { font-size: 13px; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub6-mono { font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8f8f8f; white-space: nowrap; }
.hb-ub6-mid { display: grid; grid-template-columns: minmax(0, 34%) minmax(0, 1fr); gap: 8px; min-width: 0; }
.hb-ub6-map {
  position: relative;
  min-height: 76px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #222;
  background: #0b0d12;
}
.hb-ub6-map svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-ub6-path { fill: none; stroke: var(--hb-ub6-a); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-ub6-draw 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards; }
.hb-ub6-glow { fill: none; stroke: var(--hb-ub6-a); stroke-width: 6; stroke-opacity: 0.16; stroke-linecap: round; }
.hb-ub6-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; min-width: 0; }
.hb-ub6-st {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  padding: 6px 8px;
  border-radius: 9px;
  background: #161616;
  border: 1px solid #1f1f1f;
  opacity: 0;
  animation: hb-ub6-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.hb-ub6-st b { font-size: 14px; font-weight: 600; line-height: 1.1; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ub6-st b small { margin-left: 2px; font-size: 10px; font-weight: 500; color: #8f8f8f; }
.hb-ub6-ch {
  position: relative;
  height: 50px;
  border-radius: 9px;
  background: linear-gradient(#141414, #111111);
  border: 1px solid #1f1f1f;
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
  outline: none;
}
.hb-ub6-ch:focus-visible { box-shadow: 0 0 0 2px var(--hb-ub6-a); }
.hb-ub6-ch svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub6-area { transform-box: fill-box; transform-origin: 50% 100%; animation: hb-ub6-grow 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both; }
.hb-ub6-cur { position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: rgba(255, 255, 255, 0.5); pointer-events: none; }
.hb-ub6-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 9px;
  height: 9px;
  margin: -4.5px 0 0 -4.5px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--hb-ub6-a);
  box-shadow: 0 0 10px var(--hb-ub6-a);
  pointer-events: none;
}
.hb-ub6-rd {
  position: absolute;
  top: 4px;
  left: 5px;
  display: flex;
  gap: 8px;
  padding: 3px 6px;
  border-radius: 6px;
  background: rgba(10, 10, 12, 0.78);
  pointer-events: none;
  color: #a1a1a1;
}
.hb-ub6-rd em { font-style: normal; color: #ededed; }
.hb-ub6-rd .hb-ub6-rp, .hb-ub6-rd .hb-ub6-rp em { font-style: normal; color: var(--hb-ub6-pc); }
@container (min-width: 520px) {
  .hb-ub6 { padding: 14px; gap: 12px; }
  .hb-ub6-tt { font-size: 15px; }
  .hb-ub6-mid { grid-template-columns: minmax(0, 40%) minmax(0, 1fr); gap: 12px; }
  .hb-ub6-map { min-height: 150px; }
  .hb-ub6-stats { gap: 10px; }
  .hb-ub6-st { padding: 12px 14px; gap: 6px; }
  .hb-ub6-st b { font-size: 22px; }
  .hb-ub6-ch { height: 96px; }
}
@container (max-width: 290px) {
  .hb-ub6-mid { grid-template-columns: minmax(0, 1fr); }
  .hb-ub6-map { min-height: 96px; }
}
@keyframes hb-ub6-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-ub6-up { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@keyframes hb-ub6-grow { from { opacity: 0; transform: scaleY(0.2); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ub6-path { animation: none; stroke-dashoffset: 0; }
  .hb-ub6-st { animation: none; opacity: 1; }
  .hb-ub6-area { animation: none; }
}
`;

export function MapRouteStats({
  title = "Riverside loop",
  date = "Sat, Nov 1 · 07:12",
  distanceKm = 10.42,
  movingTimeSec = 3138,
  elevationGain = 186,
  seed = 5,
  accent = "#ff4d4d",
  paceColor = "#7fb3ff",
  onScrub,
  className = "",
  style,
  ...rest
}: MapRouteStatsProps) {
  const avgPace = movingTimeSec / Math.max(0.1, distanceKm);
  const data = React.useMemo(() => buildData(seed, elevationGain, avgPace), [seed, elevationGain, avgPace]);
  const reduced = React.useSyncExternalStore(subscribeMotion, () => window.matchMedia(RM_QUERY).matches, () => false);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const chartRef = React.useRef<HTMLDivElement>(null);
  const curRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const mapDot = React.useRef<SVGCircleElement>(null);
  const mapHalo = React.useRef<SVGCircleElement>(null);
  const kmRef = React.useRef<HTMLElement>(null);
  const elRef = React.useRef<HTMLElement>(null);
  const paceRef = React.useRef<HTMLElement>(null);
  const cb = React.useRef(onScrub);

  React.useEffect(() => {
    cb.current = onScrub;
  }, [onScrub]);

  const ys = React.useMemo(() => data.meters.map((m) => 54 - ((m - data.lo) / (data.hi - data.lo || 1)) * 42), [data]);
  const paceY = React.useMemo(() => {
    const lo = Math.min(...data.pace);
    const hi = Math.max(...data.pace);
    return data.pace.map((p) => 12 + ((p - lo) / (hi - lo || 1)) * 40);
  }, [data]);
  const line = ys.map((y, i) => `${i ? "L" : "M"}${((i / (N - 1)) * 300).toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${line} L300 60 L0 60 Z`;
  const paceLine = paceY.map((y, i) => `${i ? "L" : "M"}${((i / (N - 1)) * 300).toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const routeD = `${data.route.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ")} Z`;

  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    let f = reduced ? 0.62 : 0;
    let raf = 0;
    let last = 0;
    let active = false;
    let dragging = false;
    let idleAt = 0;
    let visible = true;

    const apply = (v: number, notify: boolean) => {
      f = Math.min(1, Math.max(0, v));
      const x = f * (N - 1);
      const i = Math.min(N - 2, Math.floor(x));
      const t = x - i;
      const lerp = (a: number, b: number) => a + (b - a) * t;
      const rx = lerp(data.route[i][0], data.route[i + 1][0]);
      const ry = lerp(data.route[i][1], data.route[i + 1][1]);
      const y = lerp(ys[i], ys[i + 1]);
      const m = lerp(data.meters[i], data.meters[i + 1]);
      const p = lerp(data.pace[i], data.pace[i + 1]);
      const km = f * distanceKm;
      mapDot.current?.setAttribute("cx", rx.toFixed(2));
      mapDot.current?.setAttribute("cy", ry.toFixed(2));
      mapHalo.current?.setAttribute("cx", rx.toFixed(2));
      mapHalo.current?.setAttribute("cy", ry.toFixed(2));
      if (curRef.current) curRef.current.style.left = `${(f * 100).toFixed(2)}%`;
      if (dotRef.current) {
        dotRef.current.style.left = `${(f * 100).toFixed(2)}%`;
        dotRef.current.style.top = `${((y / 60) * 100).toFixed(2)}%`;
      }
      if (kmRef.current) kmRef.current.textContent = km.toFixed(1);
      if (elRef.current) elRef.current.textContent = String(Math.round(m));
      if (paceRef.current) paceRef.current.textContent = clock(p);
      chart.setAttribute("aria-valuenow", String(Math.round(f * 100)));
      chart.setAttribute("aria-valuetext", `${km.toFixed(1)} km, ${Math.round(m)} m elevation, pace ${clock(p)} per km`);
      if (notify) cb.current?.(f, km);
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      if (!active && !dragging && t - idleAt > 1400) apply((f + dt / 16) % 1, false);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const kick = () => {
      if (!raf && visible && !reduced) raf = requestAnimationFrame(frame);
    };

    const fromEvent = (e: PointerEvent) => {
      const r = chart.getBoundingClientRect();
      return (e.clientX - r.left) / Math.max(1, r.width);
    };
    const enter = () => {
      active = true;
    };
    const move = (e: PointerEvent) => {
      active = true;
      apply(fromEvent(e), true);
    };
    const down = (e: PointerEvent) => {
      dragging = true;
      chart.setPointerCapture(e.pointerId);
      apply(fromEvent(e), true);
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (chart.hasPointerCapture(e.pointerId)) chart.releasePointerCapture(e.pointerId);
      idleAt = performance.now();
      if (e.pointerType !== "mouse") active = false;
    };
    const leave = () => {
      if (dragging) return;
      active = false;
      idleAt = performance.now();
    };
    const key = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 0.1 : 0.01;
      let next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") next = f + step;
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = f - step;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = 1;
      if (next < -0.5) return;
      e.preventDefault();
      active = true;
      apply(next, true);
    };
    const blur = () => {
      active = false;
      idleAt = performance.now();
    };

    chart.addEventListener("pointerenter", enter);
    chart.addEventListener("pointermove", move);
    chart.addEventListener("pointerdown", down);
    chart.addEventListener("pointerup", up);
    chart.addEventListener("pointercancel", up);
    chart.addEventListener("pointerleave", leave);
    chart.addEventListener("keydown", key);
    chart.addEventListener("blur", blur);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(chart);
    apply(f, false);
    kick();
    return () => {
      chart.removeEventListener("pointerenter", enter);
      chart.removeEventListener("pointermove", move);
      chart.removeEventListener("pointerdown", down);
      chart.removeEventListener("pointerup", up);
      chart.removeEventListener("pointercancel", up);
      chart.removeEventListener("pointerleave", leave);
      chart.removeEventListener("keydown", key);
      chart.removeEventListener("blur", blur);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [data, ys, distanceKm, reduced]);

  const gradId = `hb-ub6-g${uid}`;
  const stats: { k: string; v: string; u: string }[] = [
    { k: "Distance", v: distanceKm.toFixed(2), u: "km" },
    { k: "Time", v: clock(movingTimeSec), u: "" },
    { k: "Avg pace", v: clock(avgPace), u: "/km" },
    { k: "Elevation", v: `+${Math.round(elevationGain)}`, u: "m" },
  ];

  return (
    <div className={`hb-ub6 ${className}`.trim()} style={{ "--hb-ub6-a": accent, "--hb-ub6-pc": paceColor, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-map-route-stats" precedence="default">
        {css}
      </style>
      <div className="hb-ub6-hd">
        <span className="hb-ub6-tt">{title}</span>
        <span className="hb-ub6-mono">{date}</span>
      </div>
      <div className="hb-ub6-mid">
        <div className="hb-ub6-map">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g stroke="#1a1f29" strokeWidth="0.8">
              {[14, 31, 47, 66, 83].map((v) => (
                <path key={`v${v}`} d={`M${v} -20 V120`} />
              ))}
              {[18, 36, 58, 77].map((v) => (
                <path key={`h${v}`} d={`M-20 ${v} H120`} />
              ))}
            </g>
            <path d="M-20 88 C 20 80, 50 96, 120 82" fill="none" stroke="#11284a" strokeWidth="7" />
            <path className="hb-ub6-glow" d={routeD} />
            <path className="hb-ub6-path" d={routeD} pathLength={1} />
            <circle cx={data.route[0][0].toFixed(2)} cy={data.route[0][1].toFixed(2)} r="2.6" fill="#0b0d12" stroke="#ededed" strokeWidth="1.2" />
            <circle ref={mapHalo} cx={data.route[0][0].toFixed(2)} cy={data.route[0][1].toFixed(2)} r="6" fill="var(--hb-ub6-a)" fillOpacity="0.25" />
            <circle ref={mapDot} cx={data.route[0][0].toFixed(2)} cy={data.route[0][1].toFixed(2)} r="3" fill="#fff" stroke="var(--hb-ub6-a)" strokeWidth="1.6" />
          </svg>
        </div>
        <div className="hb-ub6-stats">
          {stats.map((s, i) => (
            <div key={s.k} className="hb-ub6-st" style={{ animationDelay: `${(0.15 + i * 0.07).toFixed(2)}s` }}>
              <span className="hb-ub6-mono">{s.k}</span>
              <b>
                {s.v}
                {s.u ? <small>{s.u}</small> : null}
              </b>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={chartRef}
        className="hb-ub6-ch"
        role="slider"
        tabIndex={0}
        aria-label="Position along the route"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--hb-ub6-a)" stopOpacity="0.38" />
              <stop offset="1" stopColor="var(--hb-ub6-a)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="hb-ub6-area">
            <path d={area} fill={`url(#${gradId})`} />
            <path d={line} fill="none" stroke="var(--hb-ub6-a)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </g>
          <path d={paceLine} fill="none" stroke="var(--hb-ub6-pc)" strokeWidth="1" strokeOpacity="0.75" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        </svg>
        <div ref={curRef} className="hb-ub6-cur" />
        <div ref={dotRef} className="hb-ub6-dot" />
        <div className="hb-ub6-rd hb-ub6-mono">
          <span>
            KM <em ref={kmRef}>0.0</em>
          </span>
          <span>
            <em ref={elRef}>0</em> M
          </span>
          <span className="hb-ub6-rp">
            <em ref={paceRef}>0:00</em>/KM
          </span>
        </div>
      </div>
    </div>
  );
}

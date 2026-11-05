"use client";

import * as React from "react";

export interface ShopTrackingEvent {
  label: string;
  detail: string;
  time: string;
}

export interface ShopTrackingItem {
  name: string;
  variant: string;
  qty: number;
  color?: string;
}

export interface ShopOrderTrackingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  orderId?: string;
  title?: string;
  eta?: string;
  etaNote?: string;
  events?: ShopTrackingEvent[];
  currentStep?: number;
  courier?: { name: string; vehicle: string; rating: string };
  items?: ShopTrackingItem[];
  address?: string;
  duration?: number;
  accent?: string;
  onContactCourier?: (channel: "call" | "message") => void;
}

const defaultEvents: ShopTrackingEvent[] = [
  { label: "Order placed", detail: "Payment confirmed", time: "Mon, 9:14 am" },
  { label: "Packed", detail: "Rotterdam fulfilment centre", time: "Mon, 4:52 pm" },
  { label: "Shipped", detail: "Handed to Veloce Express", time: "Tue, 7:30 am" },
  { label: "Out for delivery", detail: "6 stops before yours", time: "Today, 11:05 am" },
  { label: "Delivered", detail: "Leave at the front door", time: "Expected 2:40 pm" },
];

const defaultItems: ShopTrackingItem[] = [
  { name: "Arc Ceramic Pour-over", variant: "Sand", qty: 1, color: "#d6b48a" },
  { name: "Linen Tea Towels", variant: "Set of 3 · Olive", qty: 2, color: "#7d8b5a" },
];

const ROUTE = "M 46 214 L 46 168 Q 46 150 64 150 L 168 150 Q 186 150 186 132 L 186 92 Q 186 74 204 74 L 300 74 Q 318 74 318 56 L 318 40";

const css = `
.hb-yjb {
  --hb-yjb-accent: #38bdf8;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yjb *, .hb-yjb *::before, .hb-yjb *::after { box-sizing: border-box; }
.hb-yjb::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(45% 50% at 30% 30%, color-mix(in srgb, var(--hb-yjb-accent) 10%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-yjb-inner { max-width: 1120px; margin: 0 auto; padding: 64px 20px; }
@container (min-width: 820px) { .hb-yjb-inner { padding: 88px 32px; } }
.hb-yjb-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 32px; margin-bottom: 28px; }
.hb-yjb-order { margin: 0 0 10px; color: #8f8f8f; font: 500 12.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; }
.hb-yjb-title { margin: 0; font-size: clamp(28px, 4.2cqw, 42px); line-height: 1.06; letter-spacing: -.03em; font-weight: 650; }
.hb-yjb-eta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 1px solid color-mix(in srgb, var(--hb-yjb-accent) 30%, transparent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--hb-yjb-accent) 8%, #0d0d0d);
}
.hb-yjb-eta small { display: block; color: #8f8f8f; font-size: 12px; }
.hb-yjb-eta b { display: block; font-size: 18px; font-weight: 640; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-yjb-clock { position: relative; width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--hb-yjb-accent); }
.hb-yjb-clock::before, .hb-yjb-clock::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 2px;
  margin-left: -1px;
  border-radius: 2px;
  background: var(--hb-yjb-accent);
  transform-origin: bottom;
}
.hb-yjb-clock::before { height: 11px; animation: hb-yjb-hand 4s linear infinite; }
.hb-yjb-clock::after { height: 7px; transform: rotate(90deg); }
.hb-yjb-grid { display: grid; gap: 14px; }
@container (min-width: 820px) { .hb-yjb-grid { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 16px; } }
.hb-yjb-card {
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  overflow: hidden;
}
.hb-yjb-map { position: relative; background: #0c0f12; }
.hb-yjb-map svg { display: block; width: 100%; height: auto; }
.hb-yjb-road { fill: none; stroke: #1b2229; stroke-width: 10; stroke-linecap: round; }
.hb-yjb-road-thin { fill: none; stroke: #151b21; stroke-width: 5; }
.hb-yjb-route-bg { fill: none; stroke: color-mix(in srgb, var(--hb-yjb-accent) 25%, transparent); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.hb-yjb-route {
  fill: none;
  stroke: var(--hb-yjb-accent);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1 12;
  animation: hb-yjb-march 1s linear infinite;
}
.hb-yjb-pin-pulse { transform-origin: center; transform-box: fill-box; animation: hb-yjb-ping 2s ease-out infinite; }
.hb-yjb-courier {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 14px;
  background: rgba(14, 14, 14, .82);
  backdrop-filter: blur(10px);
}
.hb-yjb-cav {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #b45309);
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
}
.hb-yjb-cname { min-width: 0; flex: 1; font-size: 14px; font-weight: 600; }
.hb-yjb-cname span { display: block; color: #8f8f8f; font-size: 12px; font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yjb-ibtn {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 50%;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease;
}
.hb-yjb-ibtn:hover { background: rgba(255, 255, 255, .1); }
.hb-yjb-ibtn:focus-visible { outline: 2px solid var(--hb-yjb-accent); outline-offset: 2px; }
.hb-yjb-ibtn-primary { background: var(--hb-yjb-accent); border-color: var(--hb-yjb-accent); color: #04121a; }
.hb-yjb-ibtn-primary:hover { background: color-mix(in srgb, var(--hb-yjb-accent) 85%, #fff); }
.hb-yjb-side { padding: 22px; }
.hb-yjb-progress { height: 4px; margin-bottom: 20px; border-radius: 4px; background: rgba(255, 255, 255, .06); overflow: hidden; }
.hb-yjb-progress i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-yjb-accent) 50%, transparent), var(--hb-yjb-accent)); transform-origin: left; animation: hb-yjb-grow 1.2s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yjb-steps { position: relative; margin: 0; padding: 0; list-style: none; }
.hb-yjb-step { position: relative; display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; gap: 2px 14px; padding-bottom: 18px; }
.hb-yjb-step:last-child { padding-bottom: 0; }
.hb-yjb-step::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 22px;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, .08);
}
.hb-yjb-step:last-child::before { display: none; }
.hb-yjb-step-done::before { background: var(--hb-yjb-accent); }
.hb-yjb-dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, .14);
  background: #0e0e0e;
  color: #04121a;
}
.hb-yjb-step-done .hb-yjb-dot { border-color: var(--hb-yjb-accent); background: var(--hb-yjb-accent); }
.hb-yjb-step-now .hb-yjb-dot { border-color: var(--hb-yjb-accent); }
.hb-yjb-step-now .hb-yjb-dot::after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hb-yjb-accent);
  box-shadow: 0 0 0 0 var(--hb-yjb-accent);
  animation: hb-yjb-beat 1.6s ease-out infinite;
}
.hb-yjb-sl { font-size: 14.5px; font-weight: 600; color: #8f8f8f; }
.hb-yjb-step-done .hb-yjb-sl, .hb-yjb-step-now .hb-yjb-sl { color: #ededed; }
.hb-yjb-sd { grid-column: 2; color: #6b6b6b; font-size: 12.5px; }
.hb-yjb-st { grid-column: 3; grid-row: 1; color: #6b6b6b; font-size: 12px; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-yjb-step-now .hb-yjb-st { color: var(--hb-yjb-accent); }
.hb-yjb-items { margin-top: 20px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, .06); display: grid; gap: 10px; }
.hb-yjb-item { display: flex; align-items: center; gap: 12px; font-size: 13.5px; }
.hb-yjb-sw { flex: none; width: 38px; height: 38px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .1); }
.hb-yjb-item span:nth-child(2) { min-width: 0; flex: 1; }
.hb-yjb-item small { display: block; color: #6b6b6b; font-size: 12px; }
.hb-yjb-qty { color: #8f8f8f; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-yjb-addr { display: flex; gap: 8px; align-items: flex-start; margin-top: 16px; color: #8f8f8f; font-size: 12.5px; line-height: 1.5; }
@keyframes hb-yjb-march { to { stroke-dashoffset: -13; } }
@keyframes hb-yjb-ping { 0% { opacity: .7; transform: scale(.6); } 100% { opacity: 0; transform: scale(2.2); } }
@keyframes hb-yjb-beat { 70% { box-shadow: 0 0 0 7px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
@keyframes hb-yjb-grow { from { transform: scaleX(0); } }
@keyframes hb-yjb-hand { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yjb *, .hb-yjb *::before, .hb-yjb *::after { animation: none !important; transition: none !important; }
  .hb-yjb-mover { display: none; }
}
`;

function blocks() {
  const out: { x: number; y: number; w: number; h: number; o: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const h = Math.imul(r * 31 + c * 7 + 3, 2654435761) >>> 0;
      out.push({ x: 8 + c * 66, y: 8 + r * 66, w: 50 + (h % 6), h: 50 + ((h >>> 4) % 6), o: 0.5 + ((h >>> 8) % 40) / 100 });
    }
  }
  return out;
}

const cityBlocks = blocks();

export function ShopOrderTracking({
  orderId = "Order #HB-48213",
  title = "Your order is on its way",
  eta = "2:40 – 3:10 pm",
  etaNote = "Arriving today",
  events = defaultEvents,
  currentStep = 3,
  courier = { name: "Diego Ramos", vehicle: "Electric van · NL-482-K", rating: "4.98" },
  items = defaultItems,
  address = "Keizersgracht 214, 1016 DZ Amsterdam",
  duration = 14,
  accent = "#38bdf8",
  onContactCourier,
  className,
  style,
  ...rest
}: ShopOrderTrackingProps) {
  const rawId = React.useId();
  const routeId = `hb-yjb-r${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const pct = events.length > 1 ? (Math.min(currentStep, events.length - 1) / (events.length - 1)) * 100 : 100;
  const dur = `${Math.max(3, duration)}s`;
  const initials = courier.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      className={["hb-yjb", className].filter(Boolean).join(" ")}
      style={{ "--hb-yjb-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-order-tracking" precedence="default">{css}</style>
      <div className="hb-yjb-inner">
        <div className="hb-yjb-head">
          <div>
            <p className="hb-yjb-order">{orderId}</p>
            <h2 className="hb-yjb-title">{title}</h2>
          </div>
          <div className="hb-yjb-eta">
            <span className="hb-yjb-clock" aria-hidden="true" />
            <span>
              <small>{etaNote}</small>
              <b>{eta}</b>
            </span>
          </div>
        </div>
        <div className="hb-yjb-grid">
          <div className="hb-yjb-card hb-yjb-map">
            <svg viewBox="0 0 400 270" aria-label={`Map showing the courier route to ${address}`} role="img">
              <rect width="400" height="270" fill="#0c0f12" />
              {cityBlocks.map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="6" fill="#12171c" opacity={b.o.toFixed(2)} />
              ))}
              <path className="hb-yjb-road" d="M0 150 H400 M0 74 H400 M186 0 V270 M46 0 V270 M318 0 V270" />
              <path className="hb-yjb-road-thin" d="M0 214 H400 M0 12 H400 M252 0 V270 M120 0 V270" />
              <path d="M330 170 q30 10 70 0 V270 H300 q10 -60 30 -100Z" fill="#0f2a33" opacity=".8" />
              <path id={routeId} className="hb-yjb-route-bg" d={ROUTE} />
              <path className="hb-yjb-route" d={ROUTE} />
              <g transform="translate(46 214)">
                <circle r="7" fill="#0c0f12" stroke="#8f8f8f" strokeWidth="2" />
                <circle r="2.5" fill="#8f8f8f" />
              </g>
              <g transform="translate(318 40)">
                <circle className="hb-yjb-pin-pulse" r="12" fill={accent} opacity=".5" />
                <path d="M0 4c-6-7-9-11-9-15a9 9 0 0 1 18 0c0 4-3 8-9 15Z" fill={accent} transform="translate(0 -4)" />
                <circle cy="-15" r="3.2" fill="#04121a" />
              </g>
              <g className="hb-yjb-mover">
                <animateMotion dur={dur} repeatCount="indefinite" rotate="auto" keyPoints="0;0.72;0.72" keyTimes="0;0.85;1" calcMode="linear">
                  <mpath href={`#${routeId}`} />
                </animateMotion>
                <circle r="13" fill={accent} opacity=".2" />
                <rect x="-9" y="-6" width="18" height="12" rx="3.5" fill="#ededed" />
                <rect x="3" y="-4.5" width="4.5" height="9" rx="1.5" fill={accent} />
              </g>
            </svg>
            <div className="hb-yjb-courier">
              <span className="hb-yjb-cav">{initials}</span>
              <span className="hb-yjb-cname">
                {courier.name} · ★ {courier.rating}
                <span>{courier.vehicle}</span>
              </span>
              <button type="button" className="hb-yjb-ibtn" aria-label={`Message ${courier.name}`} onClick={() => onContactCourier?.("message")}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h8A1.5 1.5 0 0 1 13.5 4v6A1.5 1.5 0 0 1 12 11.5H6.5L3.5 14v-2.5H4A1.5 1.5 0 0 1 2.5 10V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="hb-yjb-ibtn hb-yjb-ibtn-primary" aria-label={`Call ${courier.name}`} onClick={() => onContactCourier?.("call")}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 2.5h2.5l1.2 3-1.6 1a8 8 0 0 0 4.4 4.4l1-1.6 3 1.2V13a1 1 0 0 1-1 1A11 11 0 0 1 2 3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hb-yjb-card hb-yjb-side">
            <div className="hb-yjb-progress" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Delivery progress">
              <i style={{ width: `${pct.toFixed(1)}%` }} />
            </div>
            <ol className="hb-yjb-steps">
              {events.map((e, i) => {
                const cls = i < currentStep ? "hb-yjb-step hb-yjb-step-done" : i === currentStep ? "hb-yjb-step hb-yjb-step-now" : "hb-yjb-step";
                return (
                  <li key={e.label + i} className={cls} aria-current={i === currentStep ? "step" : undefined}>
                    <span className="hb-yjb-dot" aria-hidden="true">
                      {i < currentStep ? (
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="m3.5 8.3 3 3 6-6.3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="hb-yjb-sl">{e.label}</span>
                    <span className="hb-yjb-st">{e.time}</span>
                    <span className="hb-yjb-sd">{e.detail}</span>
                  </li>
                );
              })}
            </ol>
            {items.length ? (
              <div className="hb-yjb-items">
                {items.map((it) => (
                  <div className="hb-yjb-item" key={it.name}>
                    <span className="hb-yjb-sw" style={{ background: `linear-gradient(135deg, ${it.color ?? accent}, #1a1a1a)` }} />
                    <span>
                      {it.name}
                      <small>{it.variant}</small>
                    </span>
                    <span className="hb-yjb-qty">× {it.qty}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="hb-yjb-addr">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
                <path d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="8" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              {address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

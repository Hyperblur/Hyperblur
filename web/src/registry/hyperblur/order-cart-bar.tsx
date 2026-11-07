"use client";

import * as React from "react";

export interface OrderCartBarLabels {
  view: string;
  itemsOne: string;
  itemsMany: string;
  freeDeliveryLeft: string;
  freeDeliveryUnlocked: string;
}

export interface OrderCartBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  count?: number;
  total?: number;
  currency?: string;
  locale?: string;
  freeDeliveryThreshold?: number;
  position?: "fixed" | "sticky" | "static";
  offset?: number;
  hideWhenEmpty?: boolean;
  theme?: "dark" | "light";
  accent?: string;
  labels?: Partial<OrderCartBarLabels>;
  onOpen?: () => void;
}

const defaultLabels: OrderCartBarLabels = {
  view: "View order",
  itemsOne: "{count} item",
  itemsMany: "{count} items",
  freeDeliveryLeft: "Add {amount} for free delivery",
  freeDeliveryUnlocked: "Free delivery unlocked",
};

const css = `
.hb-ob1 {
  --hb-ob1-bg: #111111;
  --hb-ob1-line: #262626;
  --hb-ob1-text: #ededed;
  --hb-ob1-muted: #a1a1a1;
  --hb-ob1-track: #262626;
  box-sizing: border-box;
  z-index: 40;
  font-family: inherit;
  pointer-events: none;
}
.hb-ob1 *, .hb-ob1 *::before, .hb-ob1 *::after { box-sizing: border-box; }
.hb-ob1[data-theme="light"] {
  --hb-ob1-bg: #ffffff;
  --hb-ob1-line: #e6e3dc;
  --hb-ob1-text: #141414;
  --hb-ob1-muted: #6b6b6b;
  --hb-ob1-track: #ece9e2;
}
.hb-ob1[data-position="fixed"] {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--hb-ob1-offset) + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: center;
  padding: 0 12px;
}
.hb-ob1[data-position="sticky"] {
  position: sticky;
  bottom: var(--hb-ob1-offset);
  width: 100%;
}
.hb-ob1[data-position="static"] { position: relative; width: 100%; }
.hb-ob1-btn {
  pointer-events: auto;
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 9px 9px 9px 10px;
  border: 1px solid var(--hb-ob1-line);
  border-radius: 18px;
  background: var(--hb-ob1-bg);
  color: var(--hb-ob1-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.18);
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.42s cubic-bezier(0.2, 0.9, 0.25, 1.1), opacity 0.3s ease, border-color 0.2s ease;
  animation: hb-ob1-rise 0.5s cubic-bezier(0.2, 0.9, 0.25, 1.1) both;
  -webkit-tap-highlight-color: transparent;
}
.hb-ob1-btn:hover { border-color: color-mix(in srgb, var(--hb-ob1-accent) 45%, var(--hb-ob1-line)); }
.hb-ob1-btn:active { transform: scale(0.985); }
.hb-ob1-btn:focus-visible { outline: 2px solid var(--hb-ob1-accent); outline-offset: 3px; }
.hb-ob1[data-visible="false"] .hb-ob1-btn {
  transform: translateY(calc(100% + 32px));
  opacity: 0;
  pointer-events: none;
  animation: none;
}
.hb-ob1-bag {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-ob1-accent) 16%, transparent);
  color: var(--hb-ob1-accent);
}
.hb-ob1-bag svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-ob1-count {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 2px solid var(--hb-ob1-bg);
  border-radius: 999px;
  background: var(--hb-ob1-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  animation: hb-ob1-bump 0.45s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}
.hb-ob1-mid { display: flex; min-width: 0; flex-direction: column; gap: 5px; }
.hb-ob1-title { display: flex; align-items: baseline; gap: 6px; min-width: 0; font-size: 14px; font-weight: 600; line-height: 1.2; white-space: nowrap; }
.hb-ob1-items { color: var(--hb-ob1-muted); font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
.hb-ob1-goal { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hb-ob1-track { position: relative; flex: 0 0 56px; height: 4px; overflow: hidden; border-radius: 999px; background: var(--hb-ob1-track); }
.hb-ob1-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-ob1-accent);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-ob1-goaltext { min-width: 0; overflow: hidden; color: var(--hb-ob1-muted); font-size: 11.5px; line-height: 1.2; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob1-goal[data-done="true"] .hb-ob1-goaltext { color: color-mix(in srgb, var(--hb-ob1-accent) 80%, var(--hb-ob1-text)); }
.hb-ob1-total {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  background: var(--hb-ob1-accent);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-ob1-total span { display: inline-block; animation: hb-ob1-tick 0.4s ease both; }
.hb-ob1-total svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.2s ease; }
.hb-ob1-btn:hover .hb-ob1-total svg { transform: translateX(2px); }
@container (max-width: 340px) {
  .hb-ob1-track { flex-basis: 36px; }
  .hb-ob1-total { padding: 0 11px; }
}
@keyframes hb-ob1-rise { from { transform: translateY(calc(100% + 32px)); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes hb-ob1-bump { 0% { transform: scale(0.6); } 55% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes hb-ob1-tick { from { transform: translateY(40%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ob1-btn, .hb-ob1-count, .hb-ob1-total span, .hb-ob1-fill, .hb-ob1-total svg { animation: none; transition: none; }
}
`;

function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? values[k] : m));
}

export function OrderCartBar({
  count = 3,
  total = 54,
  currency = "USD",
  locale = "en-US",
  freeDeliveryThreshold = 60,
  position = "fixed",
  offset = 16,
  hideWhenEmpty = true,
  theme = "dark",
  accent = "#2f7bff",
  labels,
  onOpen,
  className,
  style,
  ...rest
}: OrderCartBarProps) {
  const l = { ...defaultLabels, ...labels };
  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const visible = !hideWhenEmpty || count > 0;
  const goal = freeDeliveryThreshold > 0;
  const ratio = goal ? Math.min(1, Math.max(0, total / freeDeliveryThreshold)) : 0;
  const done = goal && total >= freeDeliveryThreshold;
  const itemsText = fill(count === 1 ? l.itemsOne : l.itemsMany, { count: String(count) });
  const goalText = done ? l.freeDeliveryUnlocked : fill(l.freeDeliveryLeft, { amount: money.format(freeDeliveryThreshold - total) });

  return (
    <div
      className={["hb-ob1", className].filter(Boolean).join(" ")}
      data-position={position}
      data-theme={theme}
      data-visible={visible ? "true" : "false"}
      style={{ "--hb-ob1-accent": accent, "--hb-ob1-offset": `${offset}px`, containerType: "inline-size", ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-order-cart-bar" precedence="default">{css}</style>
      <button
        type="button"
        className="hb-ob1-btn"
        onClick={onOpen}
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : true}
        aria-label={`${l.view}, ${itemsText}, ${money.format(total)}`}
      >
        <span className="hb-ob1-bag" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
            <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
          </svg>
          {count > 0 ? (
            <span key={count} className="hb-ob1-count">
              {count}
            </span>
          ) : null}
        </span>
        <span className="hb-ob1-mid" aria-hidden="true">
          <span className="hb-ob1-title">
            {l.view}
            <span className="hb-ob1-items">{itemsText}</span>
          </span>
          {goal ? (
            <span className="hb-ob1-goal" data-done={done ? "true" : "false"}>
              <span className="hb-ob1-track">
                <span className="hb-ob1-fill" style={{ transform: `scaleX(${ratio.toFixed(4)})` }} />
              </span>
              <span className="hb-ob1-goaltext">{goalText}</span>
            </span>
          ) : null}
        </span>
        <span className="hb-ob1-total" aria-hidden="true">
          <span key={total.toFixed(2)}>{money.format(total)}</span>
          <svg viewBox="0 0 24 24">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}

"use client";

import * as React from "react";

export interface PayOrderItem {
  id: string;
  name: string;
  detail?: string;
  price: number;
  quantity?: number;
  swatch?: string;
}

export interface PayOrderSummaryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  items?: PayOrderItem[];
  quantities?: Record<string, number>;
  onQuantityChange?: (id: string, quantity: number) => void;
  currency?: string;
  discount?: number;
  discountLabel?: string;
  taxRate?: number;
  shipping?: number;
  title?: string;
  defaultOpen?: boolean;
  accent?: string;
}

const defaultItems: PayOrderItem[] = [
  { id: "ceramic-mug", name: "Ceramic mug", detail: "Matte sand", price: 1800, quantity: 2, swatch: "#d9b98c" },
  { id: "linen-apron", name: "Linen apron", detail: "Olive, one size", price: 4200, quantity: 1, swatch: "#6f8a5b" },
  { id: "drip-kettle", name: "Drip kettle", detail: "0.9 L, black", price: 6400, quantity: 1, swatch: "#3b3f4a" },
];

const css = `
.hb-qf7 {
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}
.hb-qf7 *, .hb-qf7 *::before, .hb-qf7 *::after { box-sizing: border-box; }
.hb-qf7-card { padding: 14px; background: #111111; border: 1px solid #262626; border-radius: 14px; }
.hb-qf7-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  background: none;
  border: 0;
}
button.hb-qf7-hd { cursor: pointer; border-radius: 8px; }
button.hb-qf7-hd:focus-visible { outline: 2px solid var(--hb-qf7-x); outline-offset: 4px; }
.hb-qf7-ttl { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.hb-qf7-ttl b { font-size: 13.5px; font-weight: 600; }
.hb-qf7-ttl span { color: #8f8f8f; font-size: 12px; }
.hb-qf7-peek { display: flex; align-items: center; gap: 8px; font-weight: 600; font-variant-numeric: tabular-nums; transition: opacity 0.25s ease; }
.hb-qf7[data-open="true"] .hb-qf7-peek { opacity: 0; }
.hb-qf7-chev { width: 14px; height: 14px; fill: none; stroke: #8f8f8f; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.3s ease; }
.hb-qf7[data-open="true"] .hb-qf7-chev { transform: rotate(180deg); }
.hb-qf7-fold { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-qf7[data-open="true"] .hb-qf7-fold { grid-template-rows: 1fr; }
.hb-qf7-fold > div { min-height: 0; overflow: hidden; }
.hb-qf7-list { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 10px 0 0; list-style: none; }
.hb-qf7-it { display: flex; align-items: center; gap: 10px; min-height: 32px; }
.hb-qf7-sw { flex: none; width: 28px; height: 28px; border-radius: 8px; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset; }
.hb-qf7-nm { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.hb-qf7-nm b { overflow: hidden; font-size: 13px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-qf7-nm span { overflow: hidden; color: #8f8f8f; font-size: 11.5px; text-overflow: ellipsis; white-space: nowrap; }
.hb-qf7-qty { display: inline-flex; flex: none; align-items: center; height: 24px; background: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 999px; }
.hb-qf7-qb {
  display: grid;
  place-items: center;
  width: 24px;
  height: 22px;
  margin: 0;
  padding: 0;
  color: #a1a1a1;
  background: none;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}
.hb-qf7-qb:hover:not(:disabled) { color: #fff; background: #1f1f1f; }
.hb-qf7-qb:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-qf7-qb:focus-visible { outline: 2px solid var(--hb-qf7-x); outline-offset: 1px; }
.hb-qf7-qb svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
.hb-qf7-qn { min-width: 16px; font-size: 12px; font-variant-numeric: tabular-nums; text-align: center; }
.hb-qf7-px { flex: none; min-width: 56px; font-weight: 500; text-align: right; }
.hb-qf7-lines { margin: 10px 0 0; padding: 10px 0 0; border-top: 1px solid #262626; }
.hb-qf7-ln { display: flex; align-items: center; justify-content: space-between; min-height: 18px; margin: 0; color: #a1a1a1; font-size: 12.5px; }
.hb-qf7-ln dd { margin: 0; color: #ededed; }
.hb-qf7-ln[data-kind="discount"] dd { color: #3ddc97; }
.hb-qf7-tt { display: flex; align-items: baseline; justify-content: space-between; margin: 8px 0 0; padding: 8px 0 0; border-top: 1px dashed #333333; }
.hb-qf7-tt dt { font-size: 13.5px; font-weight: 600; }
.hb-qf7-tt dd { margin: 0; font-size: 20px; font-weight: 650; letter-spacing: -0.02em; }
.hb-qf7-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-qf7-roll { position: relative; display: inline-flex; align-items: flex-start; height: calc(var(--hb-qf7-lh) * 1em); font-variant-numeric: tabular-nums; line-height: var(--hb-qf7-lh); white-space: pre; --hb-qf7-lh: 1.25; }
.hb-qf7-d { display: inline-block; height: calc(var(--hb-qf7-lh) * 1em); overflow: hidden; }
.hb-qf7-dc { display: flex; flex-direction: column; transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-qf7-dc > span { display: block; height: calc(var(--hb-qf7-lh) * 1em); }
@container (min-width: 400px) {
  .hb-qf7-fold { grid-template-rows: 1fr; }
  .hb-qf7-peek, .hb-qf7-chev { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qf7-fold, .hb-qf7-chev, .hb-qf7-peek, .hb-qf7-dc, .hb-qf7-qb { transition: none; }
}
`;

function money(cents: number, currency: string) {
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const frac = (abs % 100).toString().padStart(2, "0");
  return `${cents < 0 ? "-" : ""}${currency}${whole}.${frac}`;
}

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="hb-qf7-roll">
      <span className="hb-qf7-sr">{text}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (ch < "0" || ch > "9") {
          return (
            <span key={key} aria-hidden="true">
              {ch}
            </span>
          );
        }
        return (
          <span key={key} className="hb-qf7-d" aria-hidden="true">
            <span className="hb-qf7-dc" style={{ transform: `translateY(calc(${Number(ch)} * var(--hb-qf7-lh) * -1em))` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function PayOrderSummary({
  items = defaultItems,
  quantities,
  onQuantityChange,
  currency = "$",
  discount = 0,
  discountLabel = "Discount",
  taxRate = 0.08,
  shipping,
  title = "Order summary",
  defaultOpen = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayOrderSummaryProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();
  const [open, setOpen] = React.useState(defaultOpen);
  const [inner, setInner] = React.useState<Record<string, number>>({});
  const [wide, setWide] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setWide(entry.contentRect.width >= 400));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const qty = (item: PayOrderItem) => quantities?.[item.id] ?? inner[item.id] ?? item.quantity ?? 1;

  function change(item: PayOrderItem, next: number) {
    const clamped = Math.min(99, Math.max(1, next));
    if (clamped === qty(item)) return;
    if (quantities === undefined) setInner((s) => ({ ...s, [item.id]: clamped }));
    onQuantityChange?.(item.id, clamped);
  }

  const count = items.reduce((n, item) => n + qty(item), 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * qty(item), 0);
  const off = Math.min(subtotal, Math.max(0, discount));
  const tax = Math.round((subtotal - off) * Math.max(0, taxRate));
  const ship = shipping ?? 0;
  const total = subtotal - off + tax + ship;
  const vars = { "--hb-qf7-x": accent, ...style } as React.CSSProperties;

  const head = (
    <>
      <span className="hb-qf7-ttl">
        <b>{title}</b>
        <span>
          {count} {count === 1 ? "item" : "items"}
        </span>
      </span>
      <span className="hb-qf7-peek">
        <Roll text={money(total, currency)} />
        <svg className="hb-qf7-chev" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 6l4.5 4.5L12.5 6" />
        </svg>
      </span>
    </>
  );

  return (
    <div ref={rootRef} className={`hb-qf7 ${className}`} style={vars} data-open={open} {...rest}>
      <style href="hb-pay-order-summary" precedence="default">{css}</style>
      <div className="hb-qf7-card">
        {wide ? (
          <div className="hb-qf7-hd">{head}</div>
        ) : (
          <button type="button" className="hb-qf7-hd" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((v) => !v)}>
            {head}
          </button>
        )}
        <div className="hb-qf7-fold">
          <div id={listId}>
            <ul className="hb-qf7-list">
              {items.map((item, i) => (
                <li key={item.id} className="hb-qf7-it">
                  <span
                    className="hb-qf7-sw"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, ${item.swatch ?? ["#7fb3ff", "#c58fff", "#ffb36b"][i % 3]}, color-mix(in srgb, ${item.swatch ?? "#2f7bff"} 55%, #000))`,
                    }}
                  />
                  <span className="hb-qf7-nm">
                    <b>{item.name}</b>
                    {item.detail && <span>{item.detail}</span>}
                  </span>
                  <span className="hb-qf7-qty" role="group" aria-label={`Quantity of ${item.name}`}>
                    <button type="button" className="hb-qf7-qb" aria-label={`Decrease ${item.name}`} disabled={qty(item) <= 1} onClick={() => change(item, qty(item) - 1)}>
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 6h7" />
                      </svg>
                    </button>
                    <span className="hb-qf7-qn" aria-live="polite">
                      {qty(item)}
                    </span>
                    <button type="button" className="hb-qf7-qb" aria-label={`Increase ${item.name}`} disabled={qty(item) >= 99} onClick={() => change(item, qty(item) + 1)}>
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 6h7M6 2.5v7" />
                      </svg>
                    </button>
                  </span>
                  <span className="hb-qf7-px">
                    <Roll text={money(item.price * qty(item), currency)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="hb-qf7-lines">
          <div className="hb-qf7-ln">
            <dt>Subtotal</dt>
            <dd>
              <Roll text={money(subtotal, currency)} />
            </dd>
          </div>
          {off > 0 && (
            <div className="hb-qf7-ln" data-kind="discount">
              <dt>{discountLabel}</dt>
              <dd>
                <Roll text={money(-off, currency)} />
              </dd>
            </div>
          )}
          {shipping !== undefined && (
            <div className="hb-qf7-ln">
              <dt>Shipping</dt>
              <dd>{ship === 0 ? "Free" : <Roll text={money(ship, currency)} />}</dd>
            </div>
          )}
          {taxRate > 0 && (
            <div className="hb-qf7-ln">
              <dt>Tax ({String(+(taxRate * 100).toFixed(2))}%)</dt>
              <dd>
                <Roll text={money(tax, currency)} />
              </dd>
            </div>
          )}
          <div className="hb-qf7-tt">
            <dt>Total</dt>
            <dd>
              <Roll text={money(total, currency)} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
